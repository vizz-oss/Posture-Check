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
      name: profile.name || "Luis Veléz",
      style: profile.style || t("Competitivo", "Competitive"),
      platform: profile.platform || t("PC y consola", "PC and console"),
      location: profile.location || t("Lima, Perú", "Lima, Peru"),
      goal: profile.goal || t("4 horas monitoreadas", "4 monitored hours")
    };
    document.getElementById("nombre").value = values.name;
    document.getElementById("estilo").value = values.style;
    document.getElementById("plataforma").value = values.platform;
    document.getElementById("ubicacion").value = values.location;
    document.getElementById("meta").value = values.goal;
    document.getElementById("nombreMostrado").textContent = values.name;
    document.getElementById("descripcionMostrada").textContent = `${values.style} · ${values.platform}`;
    document.getElementById("ubicacionMostrada").textContent = values.location;
    document.getElementById("datoNombre").textContent = values.name;
    document.getElementById("datoEstilo").textContent = values.style;
    document.getElementById("datoPlataforma").textContent = values.platform;
    document.getElementById("datoUbicacion").textContent = values.location;
    document.getElementById("datoMeta").textContent = values.goal;
  }

  try { applyProfile(JSON.parse(localStorage.getItem("postureCheck.gamers.profile")) || {}); }
  catch (_) { applyProfile({}); }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const profile = {
      name: document.getElementById("nombre").value.trim(),
      style: document.getElementById("estilo").value,
      platform: document.getElementById("plataforma").value,
      location: document.getElementById("ubicacion").value.trim(),
      goal: document.getElementById("meta").value
    };
    if (!profile.name || !profile.location) {
      app?.showToast(t("Completa todos los campos obligatorios.", "Complete all required fields."), "warning");
      return;
    }
    localStorage.setItem("postureCheck.gamers.profile", JSON.stringify(profile));
    applyProfile(profile); closeModal();
    app?.showToast(t("Perfil del jugador actualizado correctamente.", "Gamer profile updated successfully."), "success");
  });

  document.addEventListener("posturecheck:languagechange", () => applyProfile(currentProfile));

  const preferenceIds = ["alertasVisuales", "alertasSonoras", "recordarPausas"];
  try {
    const preferences = JSON.parse(localStorage.getItem("postureCheck.gamers.preferences")) || {};
    preferenceIds.forEach((id) => { if (id in preferences) document.getElementById(id).checked = Boolean(preferences[id]); });
  } catch (_) { /* defaults */ }
  document.getElementById("btnGuardarPreferencias")?.addEventListener("click", () => {
    const preferences = Object.fromEntries(preferenceIds.map((id) => [id, document.getElementById(id).checked]));
    localStorage.setItem("postureCheck.gamers.preferences", JSON.stringify(preferences));
    app?.showToast(t("Preferencias guardadas correctamente.", "Preferences saved successfully."), "success");
  });
});
