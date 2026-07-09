document.addEventListener("DOMContentLoaded", () => {

    const loginSection = document.getElementById("login");
    const registroSection = document.getElementById("registro");

    const btnLogin = document.getElementById("btn-login");
    const btnRegistro = document.getElementById("btn-registro");
    const btnLogin2 = document.getElementById("btn-login-2");
    const btnRegistro2 = document.getElementById("btn-registro-2");

    const PASSWORD_DEMO = "Demo0123456@";

    function irARegistro() {
        loginSection.classList.remove("activa");
        registroSection.classList.add("activa");

        btnLogin.classList.remove("activo");
        btnRegistro.classList.add("activo");
    }

    function irALogin() {
        registroSection.classList.remove("activa");
        loginSection.classList.add("activa");

        btnRegistro.classList.remove("activo");
        btnLogin.classList.add("activo");
    }

    btnRegistro.addEventListener("click", irARegistro);
    btnLogin.addEventListener("click", irALogin);
    btnRegistro2.addEventListener("click", irARegistro);
    btnLogin2.addEventListener("click", irALogin);


    /* =========================
       REGISTRO
    ========================= */

    const btnCrear = document.getElementById("btn-crear");
    const correoReg = document.getElementById("registro-correo");
    const passReg = document.getElementById("registro-pass");

    btnCrear.addEventListener("click", () => {

        const email = correoReg.value.trim().toLowerCase();
        const pass = passReg.value.trim();
        const errorPass = document.getElementById("error-pass");

        errorPass.textContent = "";

        if (email === "" || pass === "") {
            alert("Completa todos los campos.");
            return;
        }

        if (pass.length < 12) {
            errorPass.textContent =
                "Mínimo 12 caracteres para una contraseña segura.";
            return;
        }

        if (pass !== PASSWORD_DEMO) {
            alert("Contraseña incorrecta. Usa la demo: Demo1234567!");
            return;
        }

        if (email === "estudiante@posturecheck.com") {
            window.location.href =
                "/estudiantes/dashboard/dashboard.html";
            return;
        }

        if (email === "trabajador@posturecheck.com") {
            window.location.href =
                "/trabajadores/dashboard/dashboard.html";
            return;
        }

        if (email === "gamer@posturecheck.com") {
            window.location.href =
                "/gamers/dashboard/dashboard.html";
            return;
        }

        alert("Usuario de Posture-Check no válido.");
    });


    /* =========================
       INICIO DE SESIÓN
    ========================= */

    const btnIngresar = document.getElementById("btn-ingresar");
    const correoLog = document.getElementById("login-correo");
    const passLog = document.getElementById("login-pass");

    btnIngresar.addEventListener("click", () => {

        const email = correoLog.value.trim().toLowerCase();
        const pass = passLog.value.trim();

        if (email === "" || pass === "") {
            alert("Completa todos los campos.");
            return;
        }

        if (pass !== PASSWORD_DEMO) {
            alert("Contraseña incorrecta. Usa la demo: Demo1234567!");
            return;
        }

        if (email === "estudiante@posturecheck.com") {
            window.location.href =
                "/estudiantes/dashboard/dashboard.html";
            return;
        }

        if (email === "trabajador@posturecheck.com") {
            window.location.href =
                "/trabajadores/dashboard/dashboard.html";
            return;
        }

        if (email === "gamer@posturecheck.com") {
            window.location.href =
                "/gamers/dashboard/dashboard.html";
            return;
        }

        alert("Usuario de Posture-Check no válido.");
    });

});
