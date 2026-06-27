document.addEventListener("DOMContentLoaded", () => {

    const btnActivarCamara = document.getElementById("btnActivarCamara");
    const btnDetenerCamara = document.getElementById("btnDetenerCamara");

    const btnIniciarSesion = document.getElementById("btnIniciarSesion");
    const btnFinalizarSesion = document.getElementById("btnFinalizarSesion");

    const videoCamara = document.getElementById("videoCamara");
    const camaraPlaceholder = document.getElementById("camaraPlaceholder");
    const estadoPostura = document.getElementById("estadoPostura");

    const actividad = document.getElementById("actividad");

    const tiempoSesion = document.getElementById("tiempoSesion");
    const porcentajePostura = document.getElementById("porcentajePostura");
    const cantidadAlertas = document.getElementById("cantidadAlertas");
    const cantidadPausas = document.getElementById("cantidadPausas");

    const chips = document.querySelectorAll(".chip");

    let streamCamara = null;
    let sesionActiva = false;
    let segundosTranscurridos = 0;
    let alertas = 0;
    let pausas = 0;
    let intervaloTiempo = null;
    let intervaloSimulacion = null;

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chip.classList.toggle("activo");
        });
    });

    async function activarCamara() {
        try {
            streamCamara = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

            videoCamara.srcObject = streamCamara;
            videoCamara.style.display = "block";
            camaraPlaceholder.style.display = "none";

            btnActivarCamara.disabled = true;
            btnDetenerCamara.disabled = false;

            estadoPostura.textContent = "Cámara activa";
            estadoPostura.className = "estado-postura correcta";

        } catch (error) {
            alert(
                "No fue posible acceder a la cámara. Revisa los permisos del navegador."
            );

            console.error("Error al acceder a la cámara:", error);
        }
    }

    function detenerCamara() {
        if (streamCamara) {
            streamCamara.getTracks().forEach((track) => track.stop());
            streamCamara = null;
        }

        videoCamara.srcObject = null;
        videoCamara.style.display = "none";
        camaraPlaceholder.style.display = "block";

        btnActivarCamara.disabled = false;
        btnDetenerCamara.disabled = true;

        estadoPostura.textContent = "Cámara desactivada";
        estadoPostura.className = "estado-postura";
    }

    function formatearTiempo(segundos) {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segundosRestantes = segundos % 60;

        return [
            horas.toString().padStart(2, "0"),
            minutos.toString().padStart(2, "0"),
            segundosRestantes.toString().padStart(2, "0")
        ].join(":");
    }

    function iniciarTemporizador() {
        intervaloTiempo = setInterval(() => {
            segundosTranscurridos++;
            tiempoSesion.textContent = formatearTiempo(segundosTranscurridos);
        }, 1000);
    }

    function iniciarSimulacionPostural() {
        intervaloSimulacion = setInterval(() => {

            const posturaCorrecta = Math.random() > 0.25;

            if (posturaCorrecta) {
                estadoPostura.textContent = "Postura correcta";
                estadoPostura.className = "estado-postura correcta";
            } else {
                estadoPostura.textContent = "Corrige tu postura";
                estadoPostura.className = "estado-postura alerta";

                alertas++;
                cantidadAlertas.textContent = alertas;
            }

            const porcentaje = Math.max(
                0,
                Math.min(100, 85 - alertas * 2 + Math.floor(Math.random() * 8))
            );

            porcentajePostura.textContent = `${porcentaje}%`;

            if (segundosTranscurridos > 0 && segundosTranscurridos % 60 === 0) {
                pausas++;
                cantidadPausas.textContent = pausas;
            }

        }, 5000);
    }

    function iniciarSesion() {
        if (actividad.value === "") {
            alert("Selecciona una actividad antes de iniciar.");
            return;
        }

        if (!streamCamara) {
            alert("Primero debes activar la cámara.");
            return;
        }

        if (sesionActiva) {
            return;
        }

        sesionActiva = true;

        btnIniciarSesion.disabled = true;
        btnFinalizarSesion.disabled = false;

        estadoPostura.textContent = "Analizando postura...";
        estadoPostura.className = "estado-postura correcta";

        iniciarTemporizador();
        iniciarSimulacionPostural();
    }

    function finalizarSesion() {
        sesionActiva = false;

        clearInterval(intervaloTiempo);
        clearInterval(intervaloSimulacion);

        intervaloTiempo = null;
        intervaloSimulacion = null;

        btnIniciarSesion.disabled = false;
        btnFinalizarSesion.disabled = true;

        estadoPostura.textContent = "Sesión finalizada";
        estadoPostura.className = "estado-postura";

        alert(
            `Sesión finalizada. Tiempo monitoreado: ${formatearTiempo(segundosTranscurridos)}`
        );
    }

    btnActivarCamara.addEventListener("click", activarCamara);
    btnDetenerCamara.addEventListener("click", detenerCamara);

    btnIniciarSesion.addEventListener("click", iniciarSesion);
    btnFinalizarSesion.addEventListener("click", finalizarSesion);

    window.addEventListener("beforeunload", () => {
        detenerCamara();
        clearInterval(intervaloTiempo);
        clearInterval(intervaloSimulacion);
    });

});
