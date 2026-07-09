"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const app = window.PostureApp;
  const t = (es, en) => app?.t(es, en) ?? es;
  const tabs = [
    [document.getElementById("btnResumen"), document.getElementById("msgResumen")],
    [document.getElementById("btnProgreso"), document.getElementById("msgProgreso")],
    [document.getElementById("btnRecomendaciones"), document.getElementById("msgRecomendaciones")]
  ].filter(([button, panel]) => button && panel);
  const resetButton = document.getElementById("btnRestablecer");

  function showPanel(selectedButton, selectedPanel) {
    tabs.forEach(([button, panel]) => {
      button.classList.toggle("active", button === selectedButton);
      panel.style.display = panel === selectedPanel ? "block" : "none";
      button.setAttribute("aria-selected", String(button === selectedButton));
    });
    if (resetButton) resetButton.style.display = selectedButton?.id === "btnResumen" ? "block" : "none";
  }
  tabs.forEach(([button, panel]) => button.addEventListener("click", () => showPanel(button, panel)));
  if (tabs.length) showPanel(...tabs[0]);

  try {
    const settings = JSON.parse(localStorage.getItem("postureCheck.trabajadores.dashboardSettings") || "null");
    if (settings) {
      if (settings.duration) document.getElementById("duracionJornada").value = settings.duration;
      if (settings.frequency) document.getElementById("frecuenciaAlertas").value = settings.frequency;
      if (settings.alertType) document.getElementById("tipoAlerta").value = settings.alertType;
      if (settings.goal) document.getElementById("objetivoPostural").value = settings.goal;
    }
  } catch (error) { console.warn("Could not load worker settings", error); }

  resetButton?.addEventListener("click", () => {
    app?.showDialog({
      title: t("Restablecer datos", "Reset data"),
      html: `<p>${t("¿Deseas restaurar los datos de demostración del panel?", "Do you want to restore the dashboard demo data?")}</p>`,
      actions: [
        { label: t("Restablecer", "Reset"), onClick: () => {
          localStorage.removeItem("postureCheck.trabajadores.sessions");
          app?.showToast(t("Datos de demostración restablecidos.", "Demo data reset."), "success");
        }},
        { label: t("Cancelar", "Cancel"), secondary: true }
      ]
    });
  });
});
