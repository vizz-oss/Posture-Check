(function () {
    function obtenerTema() {
        const tema = localStorage.getItem("tema");

        if (tema === "oscuro" || tema === "claro") {
            return tema;
        }

        return localStorage.getItem("modoOscuro") === "activado"
            ? "oscuro"
            : "claro";
    }

    function actualizarIcono(oscuro) {
        const icono = document.getElementById("iconoModo");
        const boton = document.getElementById("btnModoOscuro");

        if (icono) {
            icono.classList.remove("fa-moon", "fa-sun");
            icono.classList.add(oscuro ? "fa-sun" : "fa-moon");
        }

        if (boton) {
            boton.setAttribute(
                "aria-label",
                oscuro
                    ? "Activar modo claro"
                    : "Activar modo oscuro"
            );

            boton.title = oscuro
                ? "Modo claro"
                : "Modo oscuro";
        }
    }

    function aplicarTema(tema) {
        const oscuro = tema === "oscuro";

        document.body.classList.toggle(
            "modo-oscuro",
            oscuro
        );

        actualizarIcono(oscuro);
    }

    function alternarTema() {
        const oscuroActual =
            document.body.classList.contains("modo-oscuro");

        const nuevoTema = oscuroActual
            ? "claro"
            : "oscuro";

        localStorage.setItem("tema", nuevoTema);

        localStorage.setItem(
            "modoOscuro",
            nuevoTema === "oscuro"
                ? "activado"
                : "desactivado"
        );

        aplicarTema(nuevoTema);
    }

    function iniciar() {
        aplicarTema(obtenerTema());

        document.addEventListener("click", function (evento) {
            const boton = evento.target.closest(
                "#btnModoOscuro"
            );

            if (!boton) {
                return;
            }

            evento.preventDefault();
            alternarTema();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            iniciar
        );
    } else {
        iniciar();
    }

    window.addEventListener("storage", function () {
        aplicarTema(obtenerTema());
    });
})();