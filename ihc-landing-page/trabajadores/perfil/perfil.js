document.addEventListener("DOMContentLoaded", () => {

    const btnEditarPerfil = document.getElementById("btnEditarPerfil");
    const modalEditar = document.getElementById("modalEditar");
    const cerrarModal = document.getElementById("cerrarModal");
    const formEditarPerfil = document.getElementById("formEditarPerfil");

    const btnGuardarPreferencias =
        document.getElementById("btnGuardarPreferencias");

    const nombreMostrado = document.getElementById("nombreMostrado");
    const cargoMostrado = document.getElementById("cargoMostrado");
    const ubicacionMostrada = document.getElementById("ubicacionMostrada");

    const datoNombre = document.getElementById("datoNombre");
    const datoCargo = document.getElementById("datoCargo");
    const datoModalidad = document.getElementById("datoModalidad");
    const datoUbicacion = document.getElementById("datoUbicacion");
    const datoMeta = document.getElementById("datoMeta");

    const inputNombre = document.getElementById("nombre");
    const inputCargo = document.getElementById("cargo");
    const inputModalidad = document.getElementById("modalidad");
    const inputUbicacion = document.getElementById("ubicacion");
    const inputMeta = document.getElementById("meta");

    function abrirModal() {
        modalEditar.classList.add("abierto");
        document.body.style.overflow = "hidden";
    }

    function cerrarVentanaModal() {
        modalEditar.classList.remove("abierto");
        document.body.style.overflow = "";
    }

    btnEditarPerfil.addEventListener("click", abrirModal);
    cerrarModal.addEventListener("click", cerrarVentanaModal);

    modalEditar.addEventListener("click", (evento) => {
        if (evento.target === modalEditar) {
            cerrarVentanaModal();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            cerrarVentanaModal();
        }
    });

    formEditarPerfil.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = inputNombre.value.trim();
        const cargo = inputCargo.value.trim();
        const modalidad = inputModalidad.value;
        const ubicacion = inputUbicacion.value.trim();
        const meta = inputMeta.value;

        if (nombre === "" || cargo === "" || ubicacion === "") {
            alert("Completa todos los campos obligatorios.");
            return;
        }

        nombreMostrado.textContent = nombre;
        cargoMostrado.textContent = `${modalidad} · ${cargo}`;
        ubicacionMostrada.textContent = ubicacion;

        datoNombre.textContent = nombre;
        datoCargo.textContent = cargo;
        datoModalidad.textContent = modalidad;
        datoUbicacion.textContent = ubicacion;
        datoMeta.textContent = meta;

        cerrarVentanaModal();

        alert("Perfil actualizado correctamente.");
    });

    btnGuardarPreferencias.addEventListener("click", () => {
        const preferencias = {
            alertasVisuales:
                document.getElementById("alertasVisuales").checked,

            alertasSonoras:
                document.getElementById("alertasSonoras").checked,

            recordarPausas:
                document.getElementById("recordarPausas").checked
        };

        localStorage.setItem(
            "preferenciasTrabajador",
            JSON.stringify(preferencias)
        );

        alert("Preferencias guardadas correctamente.");
    });

    function cargarPreferencias() {
        const preferenciasGuardadas =
            localStorage.getItem("preferenciasTrabajador");

        if (!preferenciasGuardadas) {
            return;
        }

        try {
            const preferencias = JSON.parse(preferenciasGuardadas);

            document.getElementById("alertasVisuales").checked =
                Boolean(preferencias.alertasVisuales);

            document.getElementById("alertasSonoras").checked =
                Boolean(preferencias.alertasSonoras);

            document.getElementById("recordarPausas").checked =
                Boolean(preferencias.recordarPausas);

        } catch (error) {
            console.error(
                "No fue posible cargar las preferencias:",
                error
            );
        }
    }

    cargarPreferencias();

});
