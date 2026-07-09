"use strict";

(() => {
  const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
  const path = window.location.pathname.toLowerCase();
  const segment = path.includes("/estudiantes/") ? "estudiantes" : path.includes("/trabajadores/") ? "trabajadores" : path.includes("/gamers/") ? "gamers" : null;
  const page = path.includes("/dashboard/") ? "dashboard" : path.includes("/monitoreo/") ? "monitoreo" : path.includes("/perfil/") ? "perfil" : null;

  function app() { return window.PostureApp; }
  function t(es, en) { return app()?.t(es, en) ?? es; }
  function segmentPath(targetPage) { return `/${segment}/${targetPage}/${targetPage}.html`; }

  function buttonByText(pattern) {
    return [...document.querySelectorAll("button, a, [role=button]")].find((element) => pattern.test(normalize(element.textContent)));
  }

  function allByText(pattern) {
    return [...document.querySelectorAll("button, a, [role=button], .btn-detalle")].filter((element) => pattern.test(normalize(element.textContent)));
  }

  function saveJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function loadJson(key, fallback = null) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } }

  function showSessionDetails(title, subtitle = "") {
    app().showDialog({
      title,
      html: `<p>${subtitle}</p><ul><li>${t("Postura correcta: 82%", "Correct posture: 82%")}</li><li>${t("Alertas preventivas: 3", "Preventive alerts: 3")}</li><li>${t("Pausas activas: 2", "Active breaks: 2")}</li></ul><p>${t("Recomendación: mantén la pantalla a la altura de los ojos y apoya la zona lumbar.", "Recommendation: keep the screen at eye level and support your lower back.")}</p>`
    });
  }

  function startBreak(durationSeconds = 30) {
    let remaining = durationSeconds;
    const overlay = document.createElement("div");
    overlay.className = "app-break-overlay";
    overlay.innerHTML = `<div class="app-break-card"><i class="fa-solid fa-person-walking" style="font-size:3rem" aria-hidden="true"></i><h2>${t("Pausa activa guiada", "Guided active break")}</h2><p>${t("Relaja los hombros, gira suavemente el cuello y respira profundamente.", "Relax your shoulders, gently turn your neck, and breathe deeply.")}</p><div class="app-break-countdown">${remaining}</div><button type="button">${t("Finalizar pausa", "End break")}</button></div>`;
    const count = overlay.querySelector(".app-break-countdown");
    const close = () => { clearInterval(timer); overlay.remove(); app().showToast(t("Pausa activa completada.", "Active break completed."), "success"); };
    overlay.querySelector("button").addEventListener("click", close);
    document.body.append(overlay);
    const timer = setInterval(() => {
      remaining -= 1;
      count.textContent = remaining;
      if (remaining <= 0) close();
    }, 1000);
  }

  function showAlerts() {
    app().showDialog({
      title: t("Alertas recientes", "Recent alerts"),
      html: `<ul><li>${t("Hoy 10:42 — inclinación del cuello detectada.", "Today 10:42 — neck tilt detected.")}</li><li>${t("Hoy 11:20 — pausa activa recomendada.", "Today 11:20 — active break recommended.")}</li><li>${t("Ayer 17:05 — espalda encorvada durante 35 segundos.", "Yesterday 17:05 — rounded back for 35 seconds.")}</li></ul>`
    });
  }

  function showRecommendation() {
    app().showDialog({
      title: t("Recomendación personalizada", "Personalized recommendation"),
      html: `<p>${t("Ajusta la parte superior de la pantalla a la altura de tus ojos, mantén los codos cerca de 90° y realiza una pausa breve cada 30 minutos.", "Place the top of the screen at eye level, keep your elbows close to 90°, and take a short break every 30 minutes.")}</p><div class="app-inline-actions"><button type="button" data-break>${t("Iniciar pausa de 30 s", "Start 30-second break")}</button></div>`
    });
    document.querySelector(".app-dialog-backdrop:last-of-type [data-break]")?.addEventListener("click", () => startBreak(30));
  }

  function applySessionIdentity() {
    try {
      const session = JSON.parse(localStorage.getItem("postureCheck.session") || "null");
      if (!session) return;
      const roleMatches = (segment === "estudiantes" && session.role === "estudiante") || (segment === "trabajadores" && session.role === "trabajador") || (segment === "gamers" && session.role === "gamer");
      if (!roleMatches) return;
      if (page === "perfil") {
        const hasSavedProfile = localStorage.getItem(`postureCheck.${segment}.profile`);
        if (!hasSavedProfile) {
          const target = document.getElementById("nombreMostrado") || document.querySelector(".contenedor-info h1");
          if (target) target.textContent = session.name;
        }
      }
    } catch (_) { /* no active session */ }
  }

  function hydrateDashboardFromHistory() {
    let history = [];
    try { history = JSON.parse(localStorage.getItem(`postureCheck.${segment}.sessions`)) || []; } catch (_) { history = []; }
    if (!history.length || document.getElementById("latestStoredSession")) return;
    const latest = history[0];
    const host = document.querySelector("main .resumen-jornada, main .resumen, main .panel-estadisticas, main");
    if (!host) return;
    const widget = document.createElement("section");
    widget.id = "latestStoredSession";
    widget.className = "app-session-widget";
    widget.innerHTML = `<h3>${t("Última sesión guardada", "Latest saved session")}</h3><div class="app-session-metrics"><div class="app-session-metric"><strong>${latest.time || (latest.seconds ? `${latest.seconds}s` : "00:00:00")}</strong><span>${t("Tiempo", "Time")}</span></div><div class="app-session-metric"><strong>${latest.posture || "0%"}</strong><span>${t("Postura", "Posture")}</span></div><div class="app-session-metric"><strong>${latest.alerts ?? 0}</strong><span>${t("Alertas", "Alerts")}</span></div><div class="app-session-metric"><strong>${latest.breaks ?? 0}</strong><span>${t("Pausas", "Breaks")}</span></div></div>`;
    host.insertAdjacentElement("afterend", widget);
    app().translate();
  }

  function setupDashboard() {
    [document.getElementById("iniciarMonitoreo"), document.getElementById("verProgreso"), document.getElementById("editarPerfil"), document.getElementById("studentAlertsShortcut"), document.getElementById("studentBreaksShortcut")].filter(Boolean).forEach((item) => { item.setAttribute("role", "button"); item.setAttribute("tabindex", "0"); });
    hydrateDashboardFromHistory();
    const startButtons = [
      document.getElementById("btnMonitoreo"),
      document.getElementById("btnIniciarMonitoreo"),
      document.getElementById("iniciarMonitoreo"),
      buttonByText(/Iniciar monitoreo|Start monitoring/i)
    ].filter(Boolean);
    [...new Set(startButtons)].forEach((button) => button.addEventListener("click", (event) => {
      event.preventDefault?.();
      app().navigate(segmentPath("monitoreo"));
    }));

    document.getElementById("verProgreso")?.addEventListener("click", (event) => {
      event.preventDefault?.();
      document.querySelector(".panel-estadisticas, .progreso-postural, #msgProgreso")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.getElementById("editarPerfil")?.addEventListener("click", (event) => {
      event.preventDefault?.();
      app().navigate(segmentPath("perfil"));
    });

    allByText(/Ver detalle|View details/i).forEach((button) => button.addEventListener("click", (event) => {
      const card = event.currentTarget.closest('[class*="card"], [class*="tarjeta"], article, li') || event.currentTarget.parentElement;
      const title = card?.querySelector("h2, h3")?.textContent || t("Detalle de sesión", "Session details");
      showSessionDetails(title, card?.querySelector("p")?.textContent || "");
    }));

    allByText(/Ver ejercicios|View exercises/i).forEach((button) => button.addEventListener("click", () => startBreak(30)));
    allByText(/Ver recomendación|Ver consejo|View recommendation|View tip/i).forEach((button) => button.addEventListener("click", showRecommendation));

    const alertsShortcut = document.getElementById("studentAlertsShortcut") || buttonByText(/Mis alertas|My alerts/i);
    const breaksShortcut = document.getElementById("studentBreaksShortcut") || buttonByText(/^Pausas activas$|^Active breaks$/i);
    const bindAccessibleAction = (element, action) => {
      if (!element) return;
      element.addEventListener("click", action);
      element.addEventListener("keydown", (event) => {
        if (["Enter", " "].includes(event.key)) { event.preventDefault(); action(); }
      });
    };
    bindAccessibleAction(alertsShortcut, showAlerts);
    buttonByText(/Editar perfil|Edit profile/i)?.addEventListener("click", () => app().navigate(segmentPath("perfil")));
    bindAccessibleAction(breaksShortcut, () => startBreak(30));

    document.querySelectorAll('a[href="#"]').forEach((anchor) => {
      const label = normalize(anchor.textContent);
      if (/^Monitoreo postural$|^Posture monitoring$/i.test(label)) {
        anchor.addEventListener("click", (event) => { event.preventDefault(); app().navigate(segmentPath("monitoreo")); });
      }
      if (/^Progreso$|^Progress$/i.test(label)) {
        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          document.querySelector(".panel-estadisticas, .progreso-postural, #msgProgreso")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      if (/^Pausas activas$|^Active breaks$/i.test(label)) {
        anchor.addEventListener("click", (event) => { event.preventDefault(); startBreak(30); });
      }
    });

    document.getElementById("guardarConfiguracion")?.addEventListener("click", () => {
      const configuration = {
        duration: document.getElementById("duracionJornada")?.value,
        frequency: document.getElementById("frecuenciaAlertas")?.value,
        alertType: document.getElementById("tipoAlerta")?.value,
        goal: document.getElementById("objetivoPostural")?.value
      };
      saveJson(`postureCheck.${segment}.dashboardSettings`, configuration);
      app().showToast(t("Configuración guardada correctamente.", "Settings saved successfully."), "success");
    });

    document.getElementById("btnGuardarConfiguracion")?.addEventListener("click", () => {
      const configuration = {
        duration: document.getElementById("duracion")?.value,
        frequency: document.getElementById("frecuencia")?.value
      };
      saveJson(`postureCheck.${segment}.dashboardSettings`, configuration);
      app().showToast(t("Configuración gamer guardada.", "Gamer settings saved."), "success");
    });

    document.getElementById("btnVerTodas")?.addEventListener("click", (event) => {
      const container = event.currentTarget.closest("section") || event.currentTarget.parentElement?.parentElement;
      if (!container || container.querySelector(".app-extra-session")) {
        container?.querySelectorAll(".app-extra-session").forEach((node) => node.remove());
        event.currentTarget.textContent = t("Ver todas", "View all");
        return;
      }
      const extra = document.createElement("div");
      extra.className = "app-extra-session app-session-widget";
      extra.innerHTML = `<h3>${t("Entrenamiento nocturno", "Night training")}</h3><p>${t("1 hora 40 minutos · Postura correcta: 77% · 3 alertas", "1 hour 40 minutes · Correct posture: 77% · 3 alerts")}</p>`;
      container.append(extra);
      event.currentTarget.textContent = t("Mostrar menos", "Show less");
      app().translate();
    });
  }

  function createStudentSessionWidget() {
    const main = document.querySelector("main");
    const actionArea = document.querySelector(".contenedor-botones, .botones, .acciones") || main;
    if (!main || document.getElementById("studentSessionWidget")) return null;
    const widget = document.createElement("section");
    widget.id = "studentSessionWidget";
    widget.className = "app-session-widget";
    widget.hidden = true;
    widget.innerHTML = `<h3>${t("Estado del monitoreo", "Monitoring status")}</h3><div class="app-session-metrics"><div class="app-session-metric"><strong id="studentTime">00:00:00</strong><span>${t("Tiempo", "Time")}</span></div><div class="app-session-metric"><strong id="studentPosture">100%</strong><span>${t("Postura", "Posture")}</span></div><div class="app-session-metric"><strong id="studentAlerts">0</strong><span>${t("Alertas", "Alerts")}</span></div><div class="app-session-metric"><strong id="studentBreaks">0</strong><span>${t("Pausas", "Breaks")}</span></div></div><p class="app-session-status" id="studentStatus">${t("Listo para iniciar", "Ready to start")}</p><div class="app-inline-actions"><button type="button" id="studentPause">${t("Pausa activa", "Active break")}</button><button type="button" id="studentFinish">${t("Finalizar sesión", "End session")}</button></div>`;
    actionArea?.insertAdjacentElement("afterend", widget);
    app().translate();
    return widget;
  }

  function setupStudentMonitoring() {
    const cameraButton = document.getElementById("btnCamara");
    const startButton = document.getElementById("btnIniciar");
    const cancelButton = document.getElementById("btnCancelar");
    const activity = document.getElementById("actividad");
    let cameraActive = false;
    let active = false;
    let seconds = 0;
    let alerts = 0;
    let breaks = 0;
    let timer = null;
    let simulation = null;
    const widget = createStudentSessionWidget();
    document.querySelectorAll(".chip.sugerida").forEach((chip) => {
      chip.setAttribute("role", "button");
      chip.setAttribute("tabindex", "0");
      const toggle = () => chip.classList.toggle("seleccionada");
      chip.addEventListener("click", toggle);
      chip.addEventListener("keydown", (event) => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); toggle(); } });
    });

    const updateTime = () => {
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      document.getElementById("studentTime").textContent = `${h}:${m}:${s}`;
    };
    const finish = () => {
      if (!active) return;
      active = false; clearInterval(timer); clearInterval(simulation);
      document.getElementById("studentStatus").textContent = t("Sesión finalizada", "Session completed");
      const result = { seconds, alerts, breaks, posture: document.getElementById("studentPosture").textContent, date: new Date().toISOString() };
      const history = loadJson("postureCheck.estudiantes.sessions", []); history.unshift(result); saveJson("postureCheck.estudiantes.sessions", history.slice(0, 10));
      app().showToast(t("Sesión guardada en tu historial.", "Session saved to your history."), "success");
    };

    cameraButton?.addEventListener("click", () => {
      cameraActive = !cameraActive;
      cameraButton.innerHTML = cameraActive ? `<i class="fa-solid fa-video-slash"></i> ${t("Desactivar cámara", "Turn off camera")}` : `<i class="fa-solid fa-video"></i> ${t("Activar cámara", "Turn on camera")}`;
      app().showToast(cameraActive ? t("Cámara activada en modo demostración.", "Camera enabled in demo mode.") : t("Cámara desactivada.", "Camera disabled."), "success");
    });
    startButton?.addEventListener("click", () => {
      if (!activity?.value) { app().showToast(t("Selecciona una actividad.", "Select an activity."), "warning"); activity?.focus(); return; }
      if (!cameraActive) { app().showToast(t("Primero activa la cámara.", "Turn on the camera first."), "warning"); return; }
      if (active) return;
      active = true; widget.hidden = false; seconds = alerts = breaks = 0; updateTime();
      document.getElementById("studentStatus").textContent = t("Analizando postura...", "Analyzing posture...");
      timer = setInterval(() => { seconds += 1; updateTime(); if (seconds % 30 === 0) { breaks += 1; document.getElementById("studentBreaks").textContent = breaks; } }, 1000);
      simulation = setInterval(() => {
        const correct = Math.random() > .28;
        if (!correct) alerts += 1;
        document.getElementById("studentAlerts").textContent = alerts;
        document.getElementById("studentPosture").textContent = `${Math.max(65, 96 - alerts * 3 + Math.floor(Math.random() * 5))}%`;
        document.getElementById("studentStatus").textContent = correct ? t("Postura correcta", "Correct posture") : t("Ajusta cuello y hombros", "Adjust your neck and shoulders");
      }, 4500);
      app().showToast(t("Monitoreo iniciado.", "Monitoring started."), "success");
    });
    cancelButton?.addEventListener("click", () => { if (active) finish(); else app().navigate(segmentPath("dashboard")); });
    widget?.querySelector("#studentFinish")?.addEventListener("click", finish);
    widget?.querySelector("#studentPause")?.addEventListener("click", () => { breaks += 1; document.getElementById("studentBreaks").textContent = breaks; startBreak(30); });
  }

  function setupMonitoringStorage() {
    const finishButton = document.getElementById("btnFinalizarSesion");
    finishButton?.addEventListener("click", () => {
      window.setTimeout(() => {
        const result = {
          time: document.getElementById("tiempoSesion")?.textContent || "00:00:00",
          posture: document.getElementById("porcentajePostura")?.textContent || "0%",
          alerts: document.getElementById("cantidadAlertas")?.textContent || "0",
          breaks: document.getElementById("cantidadPausas")?.textContent || "0",
          date: new Date().toISOString()
        };
        const history = loadJson(`postureCheck.${segment}.sessions`, []); history.unshift(result); saveJson(`postureCheck.${segment}.sessions`, history.slice(0, 10));
      }, 50);
    });
  }

  function setupStudentProfile() {
    const edit = document.getElementById("editar-perfil");
    const progress = document.getElementById("ver-progreso");
    const alerts = document.getElementById("configurar-alertas");
    edit?.setAttribute("role", "button"); edit?.setAttribute("tabindex", "0");
    progress?.setAttribute("role", "button"); progress?.setAttribute("tabindex", "0");
    alerts?.setAttribute("role", "button"); alerts?.setAttribute("tabindex", "0");

    const openEdit = () => {
      const saved = loadJson("postureCheck.estudiantes.profile", { name: "María García", location: "Lima, Perú" });
      const dialog = app().showDialog({
        title: t("Editar perfil", "Edit profile"),
        html: `<label>${t("Nombre completo", "Full name")}<input id="studentProfileName" type="text" value="${saved.name}"></label><br><label>${t("Ubicación", "Location")}<input id="studentProfileLocation" type="text" value="${saved.location}"></label>`,
        actions: [{ label: t("Guardar cambios", "Save changes"), onClick: (modal) => {
          const name = modal.querySelector("#studentProfileName").value.trim(); const location = modal.querySelector("#studentProfileLocation").value.trim();
          if (!name || !location) { app().showToast(t("Completa todos los campos.", "Complete all fields."), "warning"); return false; }
          saveJson("postureCheck.estudiantes.profile", { name, location });
          const heading = document.querySelector(".contenedor-info h1"); if (heading) heading.textContent = name;
          const locationText = document.querySelector(".ubi-cal .info-item p"); if (locationText) locationText.textContent = location;
          app().showToast(t("Perfil actualizado.", "Profile updated."), "success");
        } }, { label: t("Cancelar", "Cancel"), secondary: true }]
      });
    };
    edit?.addEventListener("click", openEdit);
    edit?.addEventListener("keydown", (event) => { if (["Enter", " "].includes(event.key)) openEdit(); });
    progress?.addEventListener("click", () => document.getElementById("btn-reseñas")?.click());
    alerts?.addEventListener("click", () => app().showDialog({
      title: t("Configurar alertas", "Configure alerts"),
      html: `<label><input type="checkbox" id="studentVisual" checked> ${t("Alertas visuales", "Visual alerts")}</label><br><label><input type="checkbox" id="studentSound"> ${t("Alertas sonoras", "Sound alerts")}</label><br><label>${t("Frecuencia de alertas", "Alert frequency")}<select id="studentFrequency"><option>15</option><option selected>30</option><option>45</option></select></label>`,
      actions: [{ label: t("Guardar preferencias", "Save preferences"), onClick: (modal) => {
        saveJson("postureCheck.estudiantes.alertSettings", { visual: modal.querySelector("#studentVisual").checked, sound: modal.querySelector("#studentSound").checked, frequency: modal.querySelector("#studentFrequency").value });
        app().showToast(t("Preferencias guardadas.", "Preferences saved."), "success");
      }}]
    }));
    allByText(/Ver detalle|View details/i).forEach((item) => item.addEventListener("click", () => showSessionDetails(item.closest(".card")?.querySelector("h2")?.textContent || t("Sesión", "Session"))));
  }

  function setupProfile() {
    if (segment === "estudiantes") setupStudentProfile();
  }

  function initialize() {
    if (!segment || !page || !app()) return;
    applySessionIdentity();
    if (page === "dashboard") setupDashboard();
    if (page === "monitoreo" && segment === "estudiantes" && !document.getElementById("videoCamara")) setupStudentMonitoring();
    if (page === "perfil") setupProfile();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
