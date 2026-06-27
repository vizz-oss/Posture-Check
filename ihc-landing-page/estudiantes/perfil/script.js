
document.addEventListener("DOMContentLoaded", () => {

    /* BOTONES DE LAS PESTAÑAS */
    const btnActividad = document.getElementById("btn-galería");
    const btnProgreso = document.getElementById("btn-reseñas");
    const btnSobreMi = document.getElementById("btn-sobremi");

    /* SECCIONES DEL PERFIL */
    const seccionActividad = document.getElementById("seccion-galeria");
    const seccionProgreso = document.getElementById("seccion-reseñas");
    const seccionSobreMi = document.getElementById("seccion-sobremi");

    /* OCULTAR TODAS LAS SECCIONES */
    function ocultarSecciones() {
        seccionActividad.style.display = "none";
        seccionProgreso.style.display = "none";
        seccionSobreMi.style.display = "none";
    }

    /* QUITAR EL ESTADO ACTIVO DE LOS BOTONES */
    function desactivarBotones() {
        btnActividad.classList.remove("activo");
        btnProgreso.classList.remove("activo");
        btnSobreMi.classList.remove("activo");
    }

    /* MOSTRAR ACTIVIDAD */
    btnActividad.addEventListener("click", () => {
        ocultarSecciones();
        desactivarBotones();

        seccionActividad.style.display = "grid";
        btnActividad.classList.add("activo");
    });

    /* MOSTRAR PROGRESO */
    btnProgreso.addEventListener("click", () => {
        ocultarSecciones();
        desactivarBotones();

        seccionProgreso.style.display = "block";
        btnProgreso.classList.add("activo");
    });

    /* MOSTRAR INFORMACIÓN PERSONAL */
    btnSobreMi.addEventListener("click", () => {
        ocultarSecciones();
        desactivarBotones();

        seccionSobreMi.style.display = "block";
        btnSobreMi.classList.add("activo");
    });

});
