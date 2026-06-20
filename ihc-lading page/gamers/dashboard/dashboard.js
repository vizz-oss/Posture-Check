document.addEventListener("DOMContentLoaded", () => {

    const btnIniciarMonitoreo =
        document.getElementById("btnIniciarMonitoreo");

    const btnVerTodas =
        document.getElementById("btnVerTodas");

    const btnVerRecomendacion =
        document.getElementById("btnVerRecomendacion");

    const btnGuardarConfiguracion =
        document.getElementById("btnGuardarConfiguracion");

    const duracion =
        document.getElementById("duracion");

    const frecuencia =
        document.getElementById("frecuencia");

    btnIniciarMonitoreo.addEventListener("click", () => {
        window.location.href = "/gamers/monitoreo/monitoreo.html";
    });

    btnVerTodas.addEventListener("click", () => {
        alert(
            "Aquí se mostrarán todas las sesiones del gamer."
        );
    });

    btnVerRecomendacion.addEventListener("click", () => {
        alert(
            "Mantén la espalda apoyada, la pantalla a la altura de los ojos y realiza pausas frecuentes."
        );
    });

    btnGuardarConfiguracion.addEventListener("click", () => {

        const configuracion = {
            duracion: duracion.value,
            frecuencia: frecuencia.value
        };

        localStorage.setItem(
            "configuracionGamer",
            JSON.stringify(configuracion)
        );

        alert("Configuración guardada correctamente.");
    });

    function cargarConfiguracion() {

        const configuracionGuardada =
            localStorage.getItem("configuracionGamer");

        if (!configuracionGuardada) {
            return;
        }

        try {
            const configuracion =
                JSON.parse(configuracionGuardada);

            if (configuracion.duracion) {
                duracion.value = configuracion.duracion;
            }

            if (configuracion.frecuencia) {
                frecuencia.value = configuracion.frecuencia;
            }

        } catch (error) {
            console.error(
                "No se pudo cargar la configuración gamer:",
                error
            );
        }
    }

    cargarConfiguracion();

});
