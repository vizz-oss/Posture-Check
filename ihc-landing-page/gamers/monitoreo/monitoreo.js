document.addEventListener("DOMContentLoaded", () => {

    const btnActivarCamara = document.getElementById("btnActivarCamara");
    const btnDetenerCamara = document.getElementById("btnDetenerCamara");

    const btnIniciarSesion = document.getElementById("btnIniciarSesion");
    const btnFinalizarSesion = document.getElementById("btnFinalizarSesion");

    const videoCamara = document.getElementById("videoCamara");
    const camaraPlaceholder = document.getElementById("camaraPlaceholder");
    const estadoPostura = document.getElementById("estadoPostura");

    const tipoJuego = document.getElementById("tipoJuego");

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

    let lecturasTotales = 0;
    let lecturasCorrectas = 0;

    let intervaloTiempo = null;
    let intervaloPostura = null;

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chip.classList.toggle("activo");
        });
    });

    async function activarCamara() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Tu navegador no permite acceder a la cámara.");
            return;
        }

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
        if (sesionActiva) {
            finalizarSesion(false);
        }

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

    function actualizarPorcentajePostura() {
        if (lecturasTotales === 0) {
            porcentajePostura.textContent = "0%";
            return;
        }

        const porcentaje = Math.round(
            (lecturasCorrectas / lecturasTotales) * 100
        );

        porcentajePostura.textContent = `${porcentaje}%`;
    }

    function iniciarTemporizador() {
        intervaloTiempo = setInterval(() => {
            segundosTranscurridos++;
            tiempoSesion.textContent = formatearTiempo(segundosTranscurridos);

            if (
                segundosTranscurridos > 0 &&
                segundosTranscurridos % 60 === 0
            ) {
                pausas++;
                cantidadPausas.textContent = pausas;
            }
        }, 1000);
    }

    function iniciarSimulacionPostural() {
        intervaloPostura = setInterval(() => {
            const posturaCorrecta = Math.random() > 0.25;

            lecturasTotales++;

            if (posturaCorrecta) {
                lecturasCorrectas++;

                estadoPostura.textContent = "Postura correcta";
                estadoPostura.className = "estado-postura correcta";
            } else {
                alertas++;

                estadoPostura.textContent = "Corrige tu postura";
                estadoPostura.className = "estado-postura alerta";

                cantidadAlertas.textContent = alertas;
            }

            actualizarPorcentajePostura();
        }, 5000);
    }

    function reiniciarEstadisticas() {
        segundosTranscurridos = 0;
        alertas = 0;
        pausas = 0;

        lecturasTotales = 0;
        lecturasCorrectas = 0;

        tiempoSesion.textContent = "00:00:00";
        porcentajePostura.textContent = "0%";
        cantidadAlertas.textContent = "0";
        cantidadPausas.textContent = "0";
    }

    function iniciarSesion() {
        if (tipoJuego.value === "") {
            alert("Selecciona el tipo de juego antes de iniciar.");
            return;
        }

        if (!streamCamara) {
            alert("Primero debes activar la cámara.");
            return;
        }

        if (sesionActiva) {
            return;
        }

        reiniciarEstadisticas();

        sesionActiva = true;

        btnIniciarSesion.disabled = true;
        btnFinalizarSesion.disabled = false;

        estadoPostura.textContent = "Analizando postura...";
        estadoPostura.className = "estado-postura correcta";

        iniciarTemporizador();
        iniciarSimulacionPostural();
    }

    function finalizarSesion(mostrarMensaje = true) {
        if (!sesionActiva) {
            return;
        }

        sesionActiva = false;

        clearInterval(intervaloTiempo);
        clearInterval(intervaloPostura);

        intervaloTiempo = null;
        intervaloPostura = null;

        btnIniciarSesion.disabled = false;
        btnFinalizarSesion.disabled = true;

        estadoPostura.textContent = "Sesión finalizada";
        estadoPostura.className = "estado-postura";

        if (mostrarMensaje) {
            alert(
                `Partida finalizada. Tiempo monitoreado: ${formatearTiempo(segundosTranscurridos)}`
            );
        }
    }

    btnActivarCamara.addEventListener("click", activarCamara);
    btnDetenerCamara.addEventListener("click", detenerCamara);

    btnIniciarSesion.addEventListener("click", iniciarSesion);
    btnFinalizarSesion.addEventListener("click", () => {
        finalizarSesion(true);
    });

    window.addEventListener("beforeunload", () => {
        clearInterval(intervaloTiempo);
        clearInterval(intervaloPostura);

        if (streamCamara) {
            streamCamara.getTracks().forEach((track) => track.stop());
        }
    });

});
