"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const app = window.PostureApp;
  const t = (es, en) => app?.t(es, en) ?? es;
  const modal = document.getElementById("modalEditar");
  const form = document.getElementById("formEditarPerfil");
  const openButton = document.getElementById("btnEditarPerfil");
  const closeButton = document.getElementById("cerrarModal");

  function openModal() { modal?.classList.add("abierto"); document.body.style.overflow = "hidden"; document.getElementById("nombre")?.focus(); }
  function closeModal() { modal?.classList.remove("abierto"); document.body.style.overflow = ""; }
  openButton?.addEventListener("click", openModal);
  closeButton?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });

  let currentProfile = {};
  function applyProfile(profile) {
    currentProfile = profile || {};
    const values = {
      nombre: profile.name || "Diego De la Cruz",
      cargo: profile.role || t("Desarrollo y gestión de proyectos", "Development and project management"),
      modalidad: profile.mode || t("Trabajo remoto", "Remote work"),
      ubicacion: profile.location || t("Lima, Perú", "Lima, Peru"),
      meta: profile.goal || t("8 horas de monitoreo", "8 hours of monitoring")
    };
    document.getElementById("nombre").value = values.nombre;
    document.getElementById("cargo").value = values.cargo;
    document.getElementById("modalidad").value = values.modalidad;
    document.getElementById("ubicacion").value = values.ubicacion;
    document.getElementById("meta").value = values.meta;
    document.getElementById("nombreMostrado").textContent = values.nombre;
    document.getElementById("cargoMostrado").textContent = `${values.modalidad} · ${values.cargo}`;
    document.getElementById("ubicacionMostrada").textContent = values.ubicacion;
    document.getElementById("datoNombre").textContent = values.nombre;
    document.getElementById("datoCargo").textContent = values.cargo;
    document.getElementById("datoModalidad").textContent = values.modalidad;
    document.getElementById("datoUbicacion").textContent = values.ubicacion;
    document.getElementById("datoMeta").textContent = values.meta;
  }

  try { applyProfile(JSON.parse(localStorage.getItem("postureCheck.trabajadores.profile")) || {}); }
  catch (_) { applyProfile({}); }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const profile = {
      name: document.getElementById("nombre").value.trim(),
      role: document.getElementById("cargo").value.trim(),
      mode: document.getElementById("modalidad").value,
      location: document.getElementById("ubicacion").value.trim(),
      goal: document.getElementById("meta").value
    };
    if (!profile.name || !profile.role || !profile.location) {
      app?.showToast(t("Completa todos los campos obligatorios.", "Complete all required fields."), "warning");
      return;
    }
    localStorage.setItem("postureCheck.trabajadores.profile", JSON.stringify(profile));
    applyProfile(profile); closeModal();
    app?.showToast(t("Perfil actualizado correctamente.", "Profile updated successfully."), "success");
  });

  document.addEventListener("posturecheck:languagechange", () => applyProfile(currentProfile));

  const preferenceIds = ["alertasVisuales", "alertasSonoras", "recordarPausas"];
  try {
    const preferences = JSON.parse(localStorage.getItem("postureCheck.trabajadores.preferences")) || {};
    preferenceIds.forEach((id) => { if (id in preferences) document.getElementById(id).checked = Boolean(preferences[id]); });
  } catch (_) { /* defaults */ }
  document.getElementById("btnGuardarPreferencias")?.addEventListener("click", () => {
    const preferences = Object.fromEntries(preferenceIds.map((id) => [id, document.getElementById(id).checked]));
    localStorage.setItem("postureCheck.trabajadores.preferences", JSON.stringify(preferences));
    app?.showToast(t("Preferencias guardadas correctamente.", "Preferences saved successfully."), "success");
  });
});
