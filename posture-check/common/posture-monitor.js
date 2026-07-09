"use strict";

(() => {
  const path = window.location.pathname.toLowerCase();
  const segment = path.includes("/estudiantes/")
    ? "estudiantes"
    : path.includes("/trabajadores/")
      ? "trabajadores"
      : path.includes("/gamers/")
        ? "gamers"
        : null;

  if (!segment || !path.includes("/monitoreo/")) return;

  const MEDIAPIPE_MODULE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs";
  const MEDIAPIPE_WASM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
  const POSE_MODEL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task";

  const POSE_CONNECTIONS = [
    [0, 11], [0, 12], [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
    [11, 23], [12, 24], [23, 24]
  ];

  const state = {
    stream: null,
    cameraActive: false,
    sessionActive: false,
    modelReady: false,
    modelFailed: false,
    poseLandmarker: null,
    animationFrame: 0,
    lastInferenceAt: 0,
    lastVideoTime: -1,
    seconds: 0,
    alerts: 0,
    breaks: 0,
    timer: null,
    calibrationSamples: [],
    baseline: null,
    scoreSamples: [],
    badVotes: [],
    lastAlertAt: 0,
    currentStatus: "cameraOff",
    currentSeverity: "neutral"
  };

  const el = {};

  function app() { return window.PostureApp; }
  function t(es, en) { return app()?.t(es, en) ?? (document.documentElement.lang === "en" ? en : es); }

  function storageKey() {
    return `postureCheck.${segment}.sessions`;
  }

  function activityInputId() {
    return segment === "gamers" ? "tipoJuego" : "actividad";
  }

  function formatTime(value) {
    return [Math.floor(value / 3600), Math.floor((value % 3600) / 60), value % 60]
      .map((number) => String(number).padStart(2, "0"))
      .join(":");
  }

  function setStatus(key, severity = "neutral") {
    state.currentStatus = key;
    state.currentSeverity = severity;
    if (!el.postureStatus) return;

    const labels = {
      cameraOff: ["Cámara desactivada", "Camera off"],
      cameraOn: ["Cámara activa", "Camera active"],
      preparing: ["Preparando análisis postural...", "Preparing posture analysis..."],
      ready: ["Análisis postural activo", "Posture analysis active"],
      calibrating: ["Calibrando postura... mantente sentado de forma natural.", "Calibrating posture... sit naturally."],
      noPose: ["Ubícate frente a la cámara", "Position yourself in front of the camera"],
      correct: ["Postura correcta", "Correct posture"],
      headDrop: ["Eleva la cabeza y alinea el cuello", "Raise your head and align your neck"],
      shoulders: ["Nivela los hombros", "Level your shoulders"],
      back: ["Endereza la espalda", "Straighten your back"],
      distance: ["Aléjate un poco de la pantalla", "Move slightly away from the screen"],
      unavailable: ["Análisis postural no disponible", "Posture analysis unavailable"],
      finished: ["Sesión finalizada", "Session completed"]
    };

    const pair = labels[key] || labels.cameraOff;
    el.postureStatus.textContent = t(pair[0], pair[1]);
    el.postureStatus.classList.remove("correcta", "alerta", "neutral", "calibrando");
    el.postureStatus.classList.add(
      severity === "good" ? "correcta" : severity === "bad" ? "alerta" : severity === "calibrating" ? "calibrando" : "neutral"
    );
  }

  function updateLocalizedStatus() {
    setStatus(state.currentStatus, state.currentSeverity);
  }

  function createOverlay() {
    if (!el.video || el.overlay) return;
    const host = el.video.parentElement;
    if (!host) return;
    host.classList.add("posture-camera-stage");
    const canvas = document.createElement("canvas");
    canvas.id = "postureOverlay";
    canvas.className = "posture-overlay";
    canvas.setAttribute("aria-hidden", "true");
    host.append(canvas);
    el.overlay = canvas;
    el.overlayContext = canvas.getContext("2d");
  }

  function resizeOverlay() {
    if (!el.overlay || !el.video?.videoWidth || !el.video?.videoHeight) return;
    if (el.overlay.width !== el.video.videoWidth || el.overlay.height !== el.video.videoHeight) {
      el.overlay.width = el.video.videoWidth;
      el.overlay.height = el.video.videoHeight;
    }
  }

  function clearOverlay() {
    if (!el.overlayContext || !el.overlay) return;
    el.overlayContext.clearRect(0, 0, el.overlay.width, el.overlay.height);
  }

  function drawPose(landmarks, isBad) {
    if (!el.overlayContext || !el.overlay) return;
    resizeOverlay();
    const ctx = el.overlayContext;
    const width = el.overlay.width;
    const height = el.overlay.height;
    ctx.clearRect(0, 0, width, height);
    const color = isBad ? "#ffb020" : "#53d6bb";

    ctx.lineWidth = Math.max(3, width / 230);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineCap = "round";

    POSE_CONNECTIONS.forEach(([from, to]) => {
      const a = landmarks[from];
      const b = landmarks[to];
      if (!a || !b || (a.visibility ?? 1) < .35 || (b.visibility ?? 1) < .35) return;
      ctx.beginPath();
      ctx.moveTo(a.x * width, a.y * height);
      ctx.lineTo(b.x * width, b.y * height);
      ctx.stroke();
    });

    [0, 11, 12, 23, 24].forEach((index) => {
      const point = landmarks[index];
      if (!point || (point.visibility ?? 1) < .35) return;
      ctx.beginPath();
      ctx.arc(point.x * width, point.y * height, Math.max(5, width / 150), 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.strokeStyle = color;
    });
  }

  function average(samples, key) {
    if (!samples.length) return 0;
    return samples.reduce((sum, sample) => sum + sample[key], 0) / samples.length;
  }

  function poseMetrics(landmarks) {
    const nose = landmarks[0];
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    const required = [nose, leftShoulder, rightShoulder, leftHip, rightHip];
    if (required.some((point) => !point || (point.visibility ?? 1) < .38)) return null;

    const shoulderWidth = Math.hypot(
      rightShoulder.x - leftShoulder.x,
      rightShoulder.y - leftShoulder.y
    );
    if (shoulderWidth < .035) return null;

    const shoulderMid = {
      x: (leftShoulder.x + rightShoulder.x) / 2,
      y: (leftShoulder.y + rightShoulder.y) / 2
    };
    const hipMid = {
      x: (leftHip.x + rightHip.x) / 2,
      y: (leftHip.y + rightHip.y) / 2
    };

    return {
      shoulderWidth,
      headHeight: (shoulderMid.y - nose.y) / shoulderWidth,
      shoulderSlope: Math.abs(rightShoulder.y - leftShoulder.y) / Math.max(.001, Math.abs(rightShoulder.x - leftShoulder.x)),
      trunkLean: Math.abs(shoulderMid.x - hipMid.x) / shoulderWidth,
      headOffset: Math.abs(nose.x - shoulderMid.x) / shoulderWidth
    };
  }

  function buildBaseline() {
    state.baseline = {
      shoulderWidth: average(state.calibrationSamples, "shoulderWidth"),
      headHeight: average(state.calibrationSamples, "headHeight"),
      shoulderSlope: average(state.calibrationSamples, "shoulderSlope"),
      trunkLean: average(state.calibrationSamples, "trunkLean"),
      headOffset: average(state.calibrationSamples, "headOffset")
    };
    state.scoreSamples = [];
    state.badVotes = [];
  }

  function evaluatePosture(metrics) {
    const baseline = state.baseline;
    if (!baseline) return { score: 100, bad: false, reason: "correct" };

    const issues = [];
    const headDrop = baseline.headHeight - metrics.headHeight;

    if (headDrop > Math.max(.10, baseline.headHeight * .17)) issues.push("headDrop");
    if (metrics.shoulderSlope > Math.max(.14, baseline.shoulderSlope + .09)) issues.push("shoulders");
    if (metrics.trunkLean > Math.max(.18, baseline.trunkLean + .11)) issues.push("back");
    if (metrics.headOffset > Math.max(.27, baseline.headOffset + .13)) issues.push("headDrop");
    if (metrics.shoulderWidth > baseline.shoulderWidth * 1.38) issues.push("distance");

    let score = 100;
    score -= Math.min(42, issues.length * 17);
    score -= Math.min(14, Math.max(0, headDrop) * 50);
    score = Math.max(55, Math.round(score));

    state.scoreSamples.push(score);
    if (state.scoreSamples.length > 12) state.scoreSamples.shift();
    const smoothedScore = Math.round(average(state.scoreSamples.map((value) => ({ value })), "value"));

    state.badVotes.push(issues.length > 0);
    if (state.badVotes.length > 6) state.badVotes.shift();
    const sustainedBad = state.badVotes.filter(Boolean).length >= 3;

    return {
      score: smoothedScore,
      bad: sustainedBad,
      reason: sustainedBad ? (issues[0] || "back") : "correct"
    };
  }

  function updateMetrics(score, postureBad, reason) {
    if (el.postureValue) el.postureValue.textContent = `${score}%`;
    setStatus(postureBad ? reason : "correct", postureBad ? "bad" : "good");

    const now = Date.now();
    if (postureBad && now - state.lastAlertAt > 9000) {
      state.alerts += 1;
      state.lastAlertAt = now;
      if (el.alertValue) el.alertValue.textContent = String(state.alerts);
      app()?.showToast(
        t("Se detectó una postura que requiere ajuste.", "A posture adjustment is recommended."),
        "warning",
        4200
      );
    }
  }

  function processPoseResult(result) {
    const landmarks = result?.landmarks?.[0];
    if (!landmarks) {
      clearOverlay();
      if (state.sessionActive) setStatus("noPose", "neutral");
      return;
    }

    const metrics = poseMetrics(landmarks);
    if (!metrics) {
      clearOverlay();
      if (state.sessionActive) setStatus("noPose", "neutral");
      return;
    }

    if (!state.sessionActive) {
      drawPose(landmarks, false);
      setStatus("ready", "good");
      return;
    }

    if (state.calibrationSamples.length < 18) {
      state.calibrationSamples.push(metrics);
      drawPose(landmarks, false);
      setStatus("calibrating", "calibrating");
      if (el.postureValue) el.postureValue.textContent = "—";
      if (state.calibrationSamples.length === 18) {
        buildBaseline();
        if (el.postureValue) el.postureValue.textContent = "100%";
        app()?.showToast(t("Calibración completada.", "Calibration completed."), "success");
      }
      return;
    }

    const evaluation = evaluatePosture(metrics);
    drawPose(landmarks, evaluation.bad);
    updateMetrics(evaluation.score, evaluation.bad, evaluation.reason);
  }

  async function loadPoseModel() {
    if (state.poseLandmarker) return state.poseLandmarker;
    if (window.__posturePosePromise) return window.__posturePosePromise;

    window.__posturePosePromise = (async () => {
      const visionTasks = await import(MEDIAPIPE_MODULE);
      const vision = await visionTasks.FilesetResolver.forVisionTasks(MEDIAPIPE_WASM);
      try {
        return await visionTasks.PoseLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: POSE_MODEL, delegate: "GPU" },
          runningMode: "VIDEO",
          numPoses: 1,
          minPoseDetectionConfidence: .55,
          minPosePresenceConfidence: .55,
          minTrackingConfidence: .55
        });
      } catch (gpuError) {
        console.warn("GPU pose model unavailable; using CPU.", gpuError);
        return visionTasks.PoseLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: POSE_MODEL },
          runningMode: "VIDEO",
          numPoses: 1,
          minPoseDetectionConfidence: .55,
          minPosePresenceConfidence: .55,
          minTrackingConfidence: .55
        });
      }
    })();

    return window.__posturePosePromise;
  }

  function detectionLoop(timestamp) {
    state.animationFrame = window.requestAnimationFrame(detectionLoop);
    if (!state.cameraActive || !state.modelReady || !state.poseLandmarker || !el.video) return;
    if (el.video.readyState < 2 || el.video.currentTime === state.lastVideoTime) return;
    if (timestamp - state.lastInferenceAt < 170) return;

    state.lastInferenceAt = timestamp;
    state.lastVideoTime = el.video.currentTime;
    try {
      const result = state.poseLandmarker.detectForVideo(el.video, performance.now());
      processPoseResult(result);
    } catch (error) {
      console.warn("Pose frame skipped.", error);
    }
  }

  function setCameraView(active) {
    state.cameraActive = active;
    if (el.video) el.video.style.display = active ? "block" : "none";
    if (el.placeholder) el.placeholder.style.display = active ? "none" : "grid";
    if (el.activateButton) el.activateButton.disabled = active;
    if (el.stopButton) el.stopButton.disabled = !active;
    if (!active) {
      clearOverlay();
      setStatus("cameraOff", "neutral");
    }
  }

  async function activateCamera() {
    if (state.cameraActive) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      app()?.showToast(
        t("La cámara requiere HTTPS o un servidor local como Live Server.", "The camera requires HTTPS or a local server such as Live Server."),
        "error",
        6500
      );
      return;
    }

    try {
      state.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      el.video.srcObject = state.stream;
      await el.video.play();
      setCameraView(true);
      setStatus("preparing", "calibrating");
      createOverlay();
      resizeOverlay();
      app()?.showToast(t("Cámara activada.", "Camera enabled."), "success");

      try {
        state.poseLandmarker = await loadPoseModel();
        state.modelReady = true;
        state.modelFailed = false;
        setStatus("ready", "good");
        if (!state.animationFrame) state.animationFrame = window.requestAnimationFrame(detectionLoop);
      } catch (modelError) {
        state.modelFailed = true;
        state.modelReady = false;
        setStatus("unavailable", "neutral");
        app()?.showToast(
          t("No se pudo cargar el análisis postural. La cámara seguirá funcionando.", "Posture analysis could not be loaded. The camera will keep working."),
          "warning",
          7000
        );
        console.error("Pose model failed to load.", modelError);
      }
    } catch (error) {
      stopCamera();
      app()?.showToast(
        t("No se pudo acceder a la cámara. Revisa los permisos del navegador.", "The camera could not be accessed. Check your browser permissions."),
        "error",
        6500
      );
      console.error("Camera access failed.", error);
    }
  }

  function stopCamera() {
    if (state.sessionActive) finishSession(false);
    state.stream?.getTracks().forEach((track) => track.stop());
    state.stream = null;
    state.cameraActive = false;
    state.lastVideoTime = -1;
    if (el.video) el.video.srcObject = null;
    setCameraView(false);
  }

  function resetMetrics() {
    state.seconds = 0;
    state.alerts = 0;
    state.breaks = 0;
    state.calibrationSamples = [];
    state.baseline = null;
    state.scoreSamples = [];
    state.badVotes = [];
    state.lastAlertAt = 0;
    if (el.timeValue) el.timeValue.textContent = "00:00:00";
    if (el.postureValue) el.postureValue.textContent = "0%";
    if (el.alertValue) el.alertValue.textContent = "0";
    if (el.breakValue) el.breakValue.textContent = "0";
  }

  function startSession() {
    if (!el.activityInput?.value) {
      app()?.showToast(
        t(segment === "gamers" ? "Selecciona el tipo de juego." : "Selecciona una actividad.", segment === "gamers" ? "Select a game type." : "Select an activity."),
        "warning"
      );
      el.activityInput?.focus();
      return;
    }
    if (!state.cameraActive) {
      app()?.showToast(t("Primero activa la cámara.", "Turn on the camera first."), "warning");
      return;
    }
    if (!state.modelReady) {
      app()?.showToast(
        t("Espera a que termine de cargar el análisis postural.", "Wait for posture analysis to finish loading."),
        state.modelFailed ? "warning" : "info",
        4800
      );
      return;
    }
    if (state.sessionActive) return;

    resetMetrics();
    state.sessionActive = true;
    if (el.startButton) el.startButton.disabled = true;
    if (el.finishButton) el.finishButton.disabled = false;
    setStatus("calibrating", "calibrating");

    state.timer = window.setInterval(() => {
      state.seconds += 1;
      if (el.timeValue) el.timeValue.textContent = formatTime(state.seconds);
      if (state.seconds > 0 && state.seconds % 30 === 0) {
        state.breaks += 1;
        if (el.breakValue) el.breakValue.textContent = String(state.breaks);
        app()?.showToast(t("Es momento de una pausa breve.", "It is time for a short break."), "info");
      }
    }, 1000);

    app()?.showToast(t("Monitoreo iniciado.", "Monitoring started."), "success");
  }

  function saveSession() {
    const result = {
      activity: el.activityInput?.value || "",
      time: formatTime(state.seconds),
      posture: el.postureValue?.textContent || "0%",
      alerts: state.alerts,
      breaks: state.breaks,
      date: new Date().toISOString(),
      analysis: "MediaPipe Pose Landmarker"
    };
    let history = [];
    try { history = JSON.parse(localStorage.getItem(storageKey())) || []; } catch (_) { history = []; }
    history.unshift(result);
    localStorage.setItem(storageKey(), JSON.stringify(history.slice(0, 12)));
  }

  function finishSession(showMessage = true) {
    if (!state.sessionActive) return;
    state.sessionActive = false;
    window.clearInterval(state.timer);
    state.timer = null;
    if (el.startButton) el.startButton.disabled = false;
    if (el.finishButton) el.finishButton.disabled = true;
    setStatus("finished", "neutral");
    saveSession();
    if (showMessage) {
      app()?.showToast(t("Sesión finalizada y guardada en el historial.", "Session completed and saved to your history."), "success", 5200);
    }
  }

  function cancelSession() {
    if (state.sessionActive) finishSession(false);
    app()?.navigate(`/${segment}/dashboard/dashboard.html`);
  }

  function setupChips() {
    document.querySelectorAll(".chip, .chip.sugerida").forEach((chip) => {
      chip.setAttribute("role", "button");
      chip.setAttribute("tabindex", "0");
      const toggle = () => {
        chip.classList.toggle("activo");
        chip.classList.toggle("seleccionada");
      };
      chip.addEventListener("click", toggle);
      chip.addEventListener("keydown", (event) => {
        if (["Enter", " "].includes(event.key)) {
          event.preventDefault();
          toggle();
        }
      });
    });
  }

  function initialize() {
    Object.assign(el, {
      activityInput: document.getElementById(activityInputId()),
      activateButton: document.getElementById("btnActivarCamara"),
      stopButton: document.getElementById("btnDetenerCamara"),
      startButton: document.getElementById("btnIniciarSesion"),
      finishButton: document.getElementById("btnFinalizarSesion"),
      cancelButton: document.getElementById("btnCancelar"),
      video: document.getElementById("videoCamara"),
      placeholder: document.getElementById("camaraPlaceholder"),
      postureStatus: document.getElementById("estadoPostura"),
      timeValue: document.getElementById("tiempoSesion"),
      postureValue: document.getElementById("porcentajePostura"),
      alertValue: document.getElementById("cantidadAlertas"),
      breakValue: document.getElementById("cantidadPausas")
    });

    if (!el.video || !el.activateButton || !el.startButton) return;
    createOverlay();
    setCameraView(false);
    setupChips();

    el.activateButton.addEventListener("click", activateCamera);
    el.stopButton?.addEventListener("click", stopCamera);
    el.startButton.addEventListener("click", startSession);
    el.finishButton?.addEventListener("click", () => finishSession(true));
    el.cancelButton?.addEventListener("click", cancelSession);
    el.video.addEventListener("loadedmetadata", resizeOverlay);
    window.addEventListener("resize", resizeOverlay, { passive: true });
    document.addEventListener("posturecheck:languagechange", updateLocalizedStatus);
    window.addEventListener("beforeunload", () => {
      window.clearInterval(state.timer);
      state.stream?.getTracks().forEach((track) => track.stop());
      if (state.animationFrame) window.cancelAnimationFrame(state.animationFrame);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
