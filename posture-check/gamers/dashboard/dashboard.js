"use strict";

document.addEventListener("DOMContentLoaded", () => {
  try {
    const settings = JSON.parse(localStorage.getItem("postureCheck.gamers.dashboardSettings") || localStorage.getItem("configuracionGamer") || "null");
    if (!settings) return;
    if (settings.duration || settings.duracion) document.getElementById("duracion").value = settings.duration || settings.duracion;
    if (settings.frequency || settings.frecuencia) document.getElementById("frecuencia").value = settings.frequency || settings.frecuencia;
  } catch (error) { console.warn("Could not load gamer settings", error); }
});
