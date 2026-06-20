document.addEventListener("DOMContentLoaded", () => {

    const btnEditarPerfil = document.getElementById("btnEditarPerfil");
    const modalEditar = document.getElementById("modalEditar");
    const cerrarModal = document.getElementById("cerrarModal");
    const formEditarPerfil = document.getElementById("formEditarPerfil");

    const btnGuardarPreferencias =
        document.getElementById("btnGuardarPreferencias");

    const nombreMostrado = document.getElementById("nombreMostrado");
    const descripcionMostrada = document.getElementById("descripcionMostrada");
    const ubicacionMostrada = document.getElementById("ubicacionMostrada");

    const datoNombre = document.getElementById("datoNombre");
    const datoEstilo = document.getElementById("datoEstilo");
    const datoPlataforma = document.getElementById("datoPlataforma");
    const datoUbicacion = document.getElementById("datoUbicacion");
    const datoMeta = document.getElementById("datoMeta");

    const inputNombre = document.getElementById("nombre");
    const inputEstilo = document.getElementById("estilo");
    const inputPlataforma = document.getElementById("plataforma");
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
        const estilo = inputEstilo.value;
        const plataforma = inputPlataforma.value;
        const ubicacion = inputUbicacion.value.trim();
        const meta = inputMeta.value;

        if (nombre === "" || ubicacion === "") {
            alert("Completa todos los campos obligatorios.");
            return;
        }

        nombreMostrado.textContent = nombre;
        descripcionMostrada.textContent = `${estilo} · ${plataforma}`;
        ubicacionMostrada.textContent = ubicacion;

        datoNombre.textContent = nombre;
        datoEstilo.textContent = estilo;
        datoPlataforma.textContent = plataforma;
        datoUbicacion.textContent = ubicacion;
        datoMeta.textContent = meta;

        const perfil = {
            nombre,
            estilo,
            plataforma,
            ubicacion,
            meta
        };

        localStorage.setItem(
            "perfilGamer",
            JSON.stringify(perfil)
        );

        cerrarVentanaModal();
        alert("Perfil gamer actualizado correctamente.");
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
            "preferenciasGamer",
            JSON.stringify(preferencias)
        );

        alert("Preferencias guardadas correctamente.");
    });

    function cargarPerfil() {
        const perfilGuardado =
            localStorage.getItem("perfilGamer");

        if (!perfilGuardado) {
            return;
        }

        try {
            const perfil = JSON.parse(perfilGuardado);

            inputNombre.value = perfil.nombre || "Player One";
            inputEstilo.value = perfil.estilo || "Competitivo";
            inputPlataforma.value = perfil.plataforma || "PC y consola";
            inputUbicacion.value = perfil.ubicacion || "Lima, Perú";
            inputMeta.value = perfil.meta || "4 horas monitoreadas";

            nombreMostrado.textContent = inputNombre.value;
            descripcionMostrada.textContent =
                `${inputEstilo.value} · ${inputPlataforma.value}`;

            ubicacionMostrada.textContent = inputUbicacion.value;

            datoNombre.textContent = inputNombre.value;
            datoEstilo.textContent = inputEstilo.value;
            datoPlataforma.textContent = inputPlataforma.value;
            datoUbicacion.textContent = inputUbicacion.value;
            datoMeta.textContent = inputMeta.value;

        } catch (error) {
            console.error("No se pudo cargar el perfil gamer:", error);
        }
    }

    function cargarPreferencias() {
        const preferenciasGuardadas =
            localStorage.getItem("preferenciasGamer");

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
                "No se pudieron cargar las preferencias gamer:",
                error
            );
        }
    }

    cargarPerfil();
    cargarPreferencias();

});
