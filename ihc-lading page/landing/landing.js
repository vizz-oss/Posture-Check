
document.addEventListener("DOMContentLoaded", () => {
    const botonModoOscuro = document.getElementById("btnModoOscuro");
    const iconoModo = document.getElementById("iconoModo");

    function obtenerTema() {
        const tema = localStorage.getItem("tema");

        if (tema === "oscuro" || tema === "claro") {
            return tema;
        }

        return localStorage.getItem("modoOscuro") === "activado"
            ? "oscuro"
            : "claro";
    }

    function aplicarTema(tema) {
        const oscuro = tema === "oscuro";

        document.body.classList.toggle("modo-oscuro", oscuro);

        if (iconoModo) {
            iconoModo.classList.toggle("fa-sun", oscuro);
            iconoModo.classList.toggle("fa-moon", !oscuro);
        }

        if (botonModoOscuro) {
            botonModoOscuro.setAttribute(
                "aria-label",
                oscuro ? "Activar modo claro" : "Activar modo oscuro"
            );
        }
    }

    aplicarTema(obtenerTema());

    if (botonModoOscuro) {
        botonModoOscuro.addEventListener("click", () => {
            const nuevoTema = document.body.classList.contains("modo-oscuro")
                ? "claro"
                : "oscuro";

            localStorage.setItem("tema", nuevoTema);
            localStorage.setItem(
                "modoOscuro",
                nuevoTema === "oscuro" ? "activado" : "desactivado"
            );

            aplicarTema(nuevoTema);
        });
    }

    const btnLogin = document.getElementById("btnLogin");
    const btnUnete = document.getElementById("btnUnete");
    const btnProbarAhora = document.getElementById("btnProbarAhora");

    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            window.location.href = "/registro/registro.html";
        });
    }

    if (btnUnete) {
        btnUnete.addEventListener("click", () => {
            window.location.href = "/registro/registro.html#registro";
        });
    }

    if (btnProbarAhora) {
        btnProbarAhora.addEventListener("click", () => {
            window.location.href = "/registro/registro.html#registro";
        });
    }
});
