"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const app = window.PostureApp;
  const t = (es, en) => app?.t(es, en) ?? es;

  const loginSection = document.getElementById("login");
  const registerSection = document.getElementById("registro");
  const loginTabs = [document.getElementById("btn-login"), document.getElementById("btn-login-2")].filter(Boolean);
  const registerTabs = [document.getElementById("btn-registro"), document.getElementById("btn-registro-2")].filter(Boolean);

  const demoUsers = [
    { name: "María García", email: "estudiante@posturecheck.com", password: "Demo1234567!", role: "estudiante" },
    { name: "Diego De la Cruz", email: "trabajador@posturecheck.com", password: "Demo1234567!", role: "trabajador" },
    { name: "Luis Veléz", email: "gamer@posturecheck.com", password: "Demo1234567!", role: "gamer" }
  ];

  function showRegister() {
    loginSection?.classList.remove("activa");
    registerSection?.classList.add("activa");
    loginTabs.forEach((button) => button.classList.remove("activo"));
    registerTabs.forEach((button) => button.classList.add("activo"));
    if (window.location.hash !== "#registro") history.replaceState({}, "", `${window.location.pathname}${window.location.search}#registro`);
  }

  function showLogin() {
    registerSection?.classList.remove("activa");
    loginSection?.classList.add("activa");
    registerTabs.forEach((button) => button.classList.remove("activo"));
    loginTabs.forEach((button) => button.classList.add("activo"));
    if (window.location.hash) history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
  }

  loginTabs.forEach((button) => button.addEventListener("click", showLogin));
  registerTabs.forEach((button) => button.addEventListener("click", showRegister));
  if (window.location.hash === "#registro") showRegister();

  function readUsers() {
    try { return JSON.parse(localStorage.getItem("postureCheck.users")) || []; }
    catch (_) { return []; }
  }

  function saveUsers(users) {
    localStorage.setItem("postureCheck.users", JSON.stringify(users));
  }

  function routeForRole(role) {
    const routes = {
      estudiante: "/estudiantes/dashboard/dashboard.html",
      trabajador: "/trabajadores/dashboard/dashboard.html",
      gamer: "/gamers/dashboard/dashboard.html"
    };
    return routes[role] || routes.estudiante;
  }

  function beginSession(user) {
    localStorage.setItem("postureCheck.session", JSON.stringify({
      name: user.name,
      email: user.email,
      role: user.role,
      signedInAt: new Date().toISOString()
    }));
    app?.showToast(t("Acceso correcto. Abriendo tu panel...", "Signed in successfully. Opening your dashboard..."), "success", 1400);
    window.setTimeout(() => app?.navigate(routeForRole(user.role)), 450);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  document.getElementById("btn-crear")?.addEventListener("click", () => {
    const name = document.getElementById("registro-nombre")?.value.trim() || "";
    const email = document.getElementById("registro-correo")?.value.trim().toLowerCase() || "";
    const role = document.getElementById("registro-rol")?.value || "";
    const password = document.getElementById("registro-pass")?.value || "";
    const confirmation = document.getElementById("registro-pass2")?.value || "";
    const error = document.getElementById("error-pass");
    if (error) error.textContent = "";

    if (!name || !email || !role || !password || !confirmation) {
      app?.showToast(t("Completa todos los campos.", "Complete all fields."), "warning");
      return;
    }
    if (!validateEmail(email)) {
      app?.showToast(t("Ingresa un correo electrónico válido.", "Enter a valid email address."), "warning");
      return;
    }
    if (password.length < 12) {
      if (error) error.textContent = t("La contraseña debe tener al menos 12 caracteres.", "The password must contain at least 12 characters.");
      document.getElementById("registro-pass")?.focus();
      return;
    }
    if (password !== confirmation) {
      if (error) error.textContent = t("Las contraseñas no coinciden.", "Passwords do not match.");
      document.getElementById("registro-pass2")?.focus();
      return;
    }

    const users = readUsers();
    if ([...users, ...demoUsers].some((user) => user.email === email)) {
      app?.showToast(t("Ese correo ya está registrado.", "That email address is already registered."), "warning");
      return;
    }

    const user = { name, email, role, password };
    users.push(user);
    saveUsers(users);
    beginSession(user);
  });

  document.getElementById("btn-ingresar")?.addEventListener("click", () => {
    const email = document.getElementById("login-correo")?.value.trim().toLowerCase() || "";
    const password = document.getElementById("login-pass")?.value || "";
    if (!email || !password) {
      app?.showToast(t("Completa el correo y la contraseña.", "Enter your email and password."), "warning");
      return;
    }
    const user = [...demoUsers, ...readUsers()].find((candidate) => candidate.email === email && candidate.password === password);
    if (!user) {
      app?.showToast(t("Correo o contraseña incorrectos. Para la demo usa Demo1234567!", "Incorrect email or password. For the demo use Demo1234567!"), "error", 5200);
      return;
    }
    beginSession(user);
  });

  document.querySelectorAll('.contraseña a[href="#"]').forEach((link) => {
    if (!/Olvidaste|Forgot/i.test(link.textContent)) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      app?.showDialog({
        title: t("Recuperar contraseña", "Reset password"),
        html: `<p>${t("Ingresa tu correo. En esta demostración mostraremos una confirmación sin enviar mensajes reales.", "Enter your email. This demo displays a confirmation without sending a real message.")}</p><label>${t("Correo electrónico", "Email address")}<input id="recoveryEmail" type="email" placeholder="name@example.com"></label>`,
        actions: [{
          label: t("Enviar instrucciones", "Send instructions"),
          onClick: (modal) => {
            const email = modal.querySelector("#recoveryEmail")?.value.trim();
            if (!validateEmail(email || "")) {
              app?.showToast(t("Ingresa un correo válido.", "Enter a valid email address."), "warning");
              return false;
            }
            app?.showToast(t("Instrucciones de recuperación simuladas enviadas.", "Simulated recovery instructions sent."), "success");
          }
        }]
      });
    });
  });

  function showDemoChoice() {
    const dialog = app?.showDialog({
      title: t("Acceso rápido de demostración", "Quick demo access"),
      html: `<p>${t("Selecciona el segmento que deseas explorar.", "Select the segment you want to explore.")}</p><div class="app-inline-actions"><button data-role="estudiante">${t("Estudiante", "Student")}</button><button data-role="trabajador">${t("Trabajador remoto", "Remote worker")}</button><button data-role="gamer">${t("Jugador", "Gamer")}</button></div>`
    });
    dialog?.querySelectorAll("[data-role]").forEach((button) => button.addEventListener("click", () => {
      const user = demoUsers.find((candidate) => candidate.role === button.dataset.role);
      if (user) beginSession(user);
    }));
  }

  document.querySelectorAll(".btn-google").forEach((button) => button.addEventListener("click", showDemoChoice));

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    if (!/términos|terms/i.test(link.textContent)) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      app?.showDialog({
        title: t("Términos y condiciones", "Terms and conditions"),
        html: `<p>${t("Esta es una demostración académica. Los datos ingresados se almacenan únicamente en el navegador para simular la experiencia y pueden eliminarse al borrar el almacenamiento local.", "This is an academic demo. Entered data is stored only in the browser to simulate the experience and can be removed by clearing local storage.")}</p><p>${t("Posture-Check no ofrece diagnóstico médico y sus recomendaciones son preventivas.", "Posture-Check does not provide medical diagnosis, and its recommendations are preventive.")}</p>`
      });
    });
  });

  ["login-correo", "login-pass"].forEach((id) => document.getElementById(id)?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") document.getElementById("btn-ingresar")?.click();
  }));
  ["registro-nombre", "registro-correo", "registro-rol", "registro-pass", "registro-pass2"].forEach((id) => document.getElementById(id)?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") document.getElementById("btn-crear")?.click();
  }));
});
