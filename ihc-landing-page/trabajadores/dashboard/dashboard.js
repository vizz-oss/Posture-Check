```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* BOTONES DE LAS PESTAÑAS */
    const btnResumen = document.getElementById("btnResumen");
    const btnProgreso = document.getElementById("btnProgreso");
    const btnRecomendaciones = document.getElementById("btnRecomendaciones");

    const btnRestablecer = document.getElementById("btnRestablecer");

    /* SECCIONES */
    const msgResumen = document.getElementById("msgResumen");
    const msgProgreso = document.getElementById("msgProgreso");
    const msgRecomendaciones =
        document.getElementById("msgRecomendaciones");

    function ocultarSecciones() {
        msgResumen.style.display = "none";
        msgProgreso.style.display = "none";
        msgRecomendaciones.style.display = "none";
    }

    function desactivarBotones() {
        btnResumen.classList.remove("active");
        btnProgreso.classList.remove("active");
        btnRecomendaciones.classList.remove("active");
    }

    function mostrarSeccion(seccion, boton) {
        ocultarSecciones();
        desactivarBotones();

        seccion.style.display = "block";
        boton.classList.add("active");
    }

    /* MOSTRAR RESUMEN AL CARGAR */
    mostrarSeccion(msgResumen, btnResumen);
    btnRestablecer.style.display = "block";

    /* PESTAÑA RESUMEN */
    btnResumen.addEventListener("click", () => {
        mostrarSeccion(msgResumen, btnResumen);
        btnRestablecer.style.display = "block";
    });

    /* PESTAÑA PROGRESO */
    btnProgreso.addEventListener("click", () => {
        mostrarSeccion(msgProgreso, btnProgreso);
        btnRestablecer.style.display = "none";
    });

    /* PESTAÑA RECOMENDACIONES */
    btnRecomendaciones.addEventListener("click", () => {
        mostrarSeccion(msgRecomendaciones, btnRecomendaciones);
        btnRestablecer.style.display = "none";
    });

    /* RESTABLECER DATOS DE DEMOSTRACIÓN */
    btnRestablecer.addEventListener("click", () => {
        const confirmar = confirm(
            "¿Deseas restablecer los datos de demostración?"
        );

        if (confirmar) {
            alert("Los datos de demostración fueron restablecidos.");
        }
    });

});
```
