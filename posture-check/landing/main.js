"use strict";

const translations = {
  "es": {
    "meta.title": "Posture-Check | Cuida tu postura",
    "a11y.skip": "Saltar al contenido principal",
    "brand.tagline": "Mejorando tu postura, mejorando tu bienestar",
    "brand.taglinePeriod": "Mejorando tu postura, mejorando tu bienestar.",
    "nav.how": "Cómo funciona",
    "nav.benefits": "Beneficios",
    "nav.metrics": "Métricas",
    "nav.audience": "Para quién es",
    "nav.testimonials": "Testimonios",
    "nav.faq": "Preguntas frecuentes",
    "nav.contact": "Contacto",
    "actions.login": "Iniciar sesión",
    "actions.start": "Comenzar ahora",
    "actions.demo": "Ver demostración",
    "actions.metrics": "Ver métricas",
    "hero.description": "Detecta posturas inadecuadas, recibe alertas discretas y revisa tu progreso desde una experiencia simple.",
    "hero.realtime": "Tiempo real",
    "hero.discreetAlerts": "Alertas discretas",
    "hero.localProcessing": "Procesamiento local",
    "status.correctPosture": "Postura correcta",
    "status.activeMonitoring": "Monitoreo activo",
    "how.kicker": "Tres pasos",
    "how.title": "¿Cómo funciona?",
    "how.description": "Activa el monitoreo, recibe retroalimentación y reconoce tu progreso sin procesos complicados.",
    "how.step1.title": "Activa el monitoreo",
    "how.step1.description": "Autoriza la cámara y calibra tu posición en pocos segundos.",
    "how.step2.title": "Recibe alertas discretas",
    "how.step2.description": "Corrige tu postura sin perder la concentración en tu actividad.",
    "how.step3.title": "Revisa tu progreso",
    "how.step3.description": "Consulta métricas, historial y pausas realizadas durante la semana.",
    "benefits.kicker": "Valor inmediato",
    "benefits.title": "Lo esencial, fácil de reconocer",
    "benefits.description": "Información breve, visual y organizada para comprender la propuesta en la primera visita.",
    "benefits.detection.title": "Detección inteligente",
    "benefits.detection.description": "Identifica desviaciones de cuello, hombros y espalda.",
    "benefits.alerts.title": "Alertas configurables",
    "benefits.alerts.description": "Elige frecuencia, sonido, vibración o aviso visual.",
    "benefits.progress.title": "Progreso visible",
    "benefits.progress.description": "Reconoce tendencias mediante porcentajes y gráficos simples.",
    "benefits.privacy.title": "Privacidad local",
    "benefits.privacy.description": "Analiza la postura sin almacenar imágenes ni videos.",
    "metrics.kicker": "Estado del sistema",
    "metrics.title": "Tu postura, de un vistazo",
    "metrics.description": "Vista demostrativa de cómo Posture-Check transforma el monitoreo en retroalimentación comprensible.",
    "metrics.todaySummary": "Resumen de hoy",
    "metrics.posturalProgress": "Tu progreso postural",
    "metrics.demoView": "Vista de ejemplo",
    "metrics.currentStatus": "Estado actual",
    "metrics.keepPosition": "Mantén esta posición.",
    "metrics.monitoredTime": "Tiempo monitoreado",
    "metrics.alertsReceived": "Alertas recibidas",
    "metrics.breaksCompleted": "Pausas completadas",
    "metrics.lastSevenDays": "Últimos 7 días",
    "feedback.title": "Reconoce tu estado",
    "feedback.description": "Los íconos y textos acompañan al color para facilitar la comprensión.",
    "feedback.correct": "Correcta",
    "feedback.keepGoing": "Continúa así",
    "feedback.attention": "Atención",
    "feedback.adjust": "Ajusta cuello y hombros",
    "feedback.correction": "Corrección",
    "feedback.changePosition": "Cambia de posición",
    "history.title": "Historial reciente",
    "history.today": "Hoy",
    "history.preventiveAlert": "Alerta preventiva",
    "history.neckTilt": "10:42 · Cuello inclinado",
    "history.corrected": "Postura corregida",
    "history.improvement": "10:43 · Mejora detectada",
    "history.breakCompleted": "Pausa completada",
    "history.twoMinutes": "11:20 · 2 minutos",
    "audience.kicker": "Experiencia personalizada",
    "audience.title": "Una solución para tu rutina",
    "audience.description": "Elige el contexto que más se parece a ti.",
    "audience.study": "Estudio",
    "audience.students": "Estudiantes",
    "audience.studentsDescription": "Alertas sutiles durante clases, tareas y sesiones de estudio.",
    "audience.work": "Trabajo",
    "audience.remoteWorkers": "Trabajadores remotos",
    "audience.workDescription": "Seguimiento durante reuniones y jornadas de concentración.",
    "audience.gaming": "Juego",
    "audience.gamers": "Jugadores",
    "audience.gamingDescription": "Avisos configurables que respetan los momentos importantes.",
    "testimonials.title": "Lo que dicen nuestros usuarios",
    "testimonials.description": "Experiencias reales de personas que mejoraron su bienestar con Posture-Check.",
    "testimonials.studentQuote": "“Posture-Check me ayudó a darme cuenta de cuánto tiempo pasaba encorvada mientras estudiaba. Ahora tengo mejores hábitos y menos dolor de espalda.”",
    "testimonials.studentRole": "Estudiante universitaria",
    "testimonials.workerQuote": "“Trabajo muchas horas frente a la computadora y las alertas me ayudan a corregirme a tiempo. La app es simple y muy útil.”",
    "testimonials.workerRole": "Programador remoto",
    "testimonials.gamerQuote": "“Antes terminaba mis sesiones de juego con tensión en el cuello. Ahora hago pausas activas y siento una gran diferencia.”",
    "testimonials.gamerRole": "Jugador frecuente",
    "faq.kicker": "Ayuda rápida",
    "faq.title": "Preguntas frecuentes",
    "faq.description": "Respuestas breves para reconocer cómo funciona la plataforma.",
    "faq.q1": "¿Cómo funciona el monitoreo postural?",
    "faq.a1": "La cámara analiza puntos de referencia de tu postura y muestra un estado visual. Si una posición inadecuada se mantiene, recibes una alerta discreta.",
    "faq.q2": "¿La aplicación guarda mis imágenes o videos?",
    "faq.a2": "No. El procesamiento se realiza localmente y las imágenes no se almacenan ni se comparten.",
    "faq.q3": "¿Puedo personalizar las alertas?",
    "faq.a3": "Sí. Puedes ajustar la frecuencia y elegir avisos visuales, sonoros o por vibración.",
    "faq.q4": "¿Qué información aparece en mi progreso?",
    "faq.a4": "Tiempo monitoreado, porcentaje de postura correcta, alertas, pausas e historial semanal.",
    "faq.q5": "¿A quién está dirigida la aplicación?",
    "faq.a5": "A estudiantes universitarios, trabajadores remotos y jugadores que pasan varias horas frente a una pantalla.",
    "contact.title": "¿Necesitas ayuda?",
    "contact.description": "Completa el formulario y recibe una confirmación inmediata.",
    "contact.name": "Nombre completo",
    "contact.email": "Correo electrónico",
    "contact.message": "Mensaje",
    "contact.submit": "Enviar mensaje",
    "cta.kicker": "Empieza hoy",
    "cta.title": "¿Listo para mejorar tu postura?",
    "cta.description": "Construye hábitos más saludables mientras estudias, trabajas o juegas.",
    "footer.description": "Monitoreo preventivo con retroalimentación visual, alertas discretas y privacidad local.",
    "footer.product": "Producto",
    "footer.users": "Usuarios",
    "footer.help": "Ayuda",
    "footer.support": "Soporte",
    "footer.social": "Redes sociales",
    "footer.copyright": "© 2026 Posture-Check. Todos los derechos reservados.",
    "contact.success": "Tu mensaje fue enviado correctamente.",
    "hero.title": "Corrige tu postura <span class=\"hero-title-accent\">sin interrumpir tu rutina</span>",
    "days.mon": "L",
    "days.tue": "M",
    "days.wed": "M",
    "days.thu": "J",
    "days.fri": "V",
    "days.sat": "S",
    "days.sun": "D",
    "meta.description": "Posture-Check monitorea tu postura, envía alertas discretas y muestra tu progreso sin almacenar imágenes.",
    "a11y.home": "Ir al inicio de Posture-Check",
    "a11y.openMenu": "Abrir menú de navegación",
    "a11y.closeMenu": "Cerrar menú de navegación",
    "a11y.mainNavigation": "Navegación principal",
    "a11y.darkMode": "Activar modo oscuro",
    "a11y.lightMode": "Activar modo claro",
    "a11y.mainFeatures": "Características principales",
    "a11y.exampleStatus": "Estado postural de ejemplo",
    "a11y.metricsPanel": "Panel de métricas de ejemplo",
    "a11y.progress82": "82 por ciento de postura correcta",
    "a11y.weeklyChart": "Gráfico semanal de postura correcta con tendencia ascendente",
    "a11y.feedbackPanel": "Estados e historial de ejemplo",
    "a11y.backToTop": "Volver al inicio",
    "a11y.openPanel": "Abrir opciones de accesibilidad",
    "a11y.closePanel": "Cerrar opciones de accesibilidad",
    "a11y.panel": "Opciones de accesibilidad",
    "a11y.title": "Accesibilidad",
    "a11y.decrease": "Reducir tamaño de texto",
    "a11y.increase": "Aumentar tamaño de texto",
    "a11y.contrast": "Alto contraste",
    "a11y.motion": "Reducir movimiento",
    "a11y.reset": "Restablecer",
    "language.label": "Idioma",
    "language.aria": "Seleccionar idioma",
    "images.heroAlt": "Persona usando Posture-Check frente a una computadora",
    "images.studentAlt": "Estudiante universitario frente a una computadora",
    "images.workerAlt": "Trabajadora remota usando una computadora portátil",
    "images.gamerAlt": "Jugador durante una partida",
    "contact.namePlaceholder": "Tu nombre",
    "contact.emailPlaceholder": "nombre@correo.com",
    "contact.messagePlaceholder": "Cuéntanos cómo podemos ayudarte...",
    "form.nameError": "Ingresa un nombre de al menos 2 caracteres.",
    "form.emailError": "Ingresa un correo electrónico válido.",
    "form.messageError": "Escribe un mensaje de al menos 10 caracteres.",
    "form.reviewErrors": "Revisa los campos señalados antes de enviar.",
    "form.sending": "Enviando...",
    "form.sent": "Mensaje enviado correctamente."
  },
  "en": {
    "meta.title": "Posture-Check | Take care of your posture",
    "a11y.skip": "Skip to main content",
    "brand.tagline": "Improving your posture, improving your well-being",
    "brand.taglinePeriod": "Improving your posture, improving your well-being.",
    "nav.how": "How it works",
    "nav.benefits": "Benefits",
    "nav.metrics": "Metrics",
    "nav.audience": "Who it is for",
    "nav.testimonials": "Testimonials",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "actions.login": "Sign in",
    "actions.start": "Get started",
    "actions.demo": "View demo",
    "actions.metrics": "View metrics",
    "hero.description": "Detect poor posture, receive discreet alerts, and review your progress through a simple experience.",
    "hero.realtime": "Real time",
    "hero.discreetAlerts": "Discreet alerts",
    "hero.localProcessing": "Local processing",
    "status.correctPosture": "Correct posture",
    "status.activeMonitoring": "Monitoring active",
    "how.kicker": "Three steps",
    "how.title": "How does it work?",
    "how.description": "Activate monitoring, receive feedback, and recognize your progress without complicated steps.",
    "how.step1.title": "Activate monitoring",
    "how.step1.description": "Allow camera access and calibrate your position in a few seconds.",
    "how.step2.title": "Receive discreet alerts",
    "how.step2.description": "Correct your posture without losing focus on your activity.",
    "how.step3.title": "Review your progress",
    "how.step3.description": "Review metrics, history, and breaks completed during the week.",
    "benefits.kicker": "Immediate value",
    "benefits.title": "The essentials, easy to recognize",
    "benefits.description": "Brief, visual, and organized information to understand the value proposition on the first visit.",
    "benefits.detection.title": "Smart detection",
    "benefits.detection.description": "Identifies deviations in the neck, shoulders, and back.",
    "benefits.alerts.title": "Configurable alerts",
    "benefits.alerts.description": "Choose frequency, sound, vibration, or visual notification.",
    "benefits.progress.title": "Visible progress",
    "benefits.progress.description": "Recognize trends through percentages and simple charts.",
    "benefits.privacy.title": "Local privacy",
    "benefits.privacy.description": "Analyzes posture without storing images or videos.",
    "metrics.kicker": "System status",
    "metrics.title": "Your posture at a glance",
    "metrics.description": "A demo view of how Posture-Check turns monitoring into understandable feedback.",
    "metrics.todaySummary": "Today’s summary",
    "metrics.posturalProgress": "Your posture progress",
    "metrics.demoView": "Demo view",
    "metrics.currentStatus": "Current status",
    "metrics.keepPosition": "Keep this position.",
    "metrics.monitoredTime": "Monitored time",
    "metrics.alertsReceived": "Alerts received",
    "metrics.breaksCompleted": "Breaks completed",
    "metrics.lastSevenDays": "Last 7 days",
    "feedback.title": "Recognize your status",
    "feedback.description": "Icons and text support color to make the information easier to understand.",
    "feedback.correct": "Correct",
    "feedback.keepGoing": "Keep it up",
    "feedback.attention": "Attention",
    "feedback.adjust": "Adjust your neck and shoulders",
    "feedback.correction": "Correction",
    "feedback.changePosition": "Change position",
    "history.title": "Recent history",
    "history.today": "Today",
    "history.preventiveAlert": "Preventive alert",
    "history.neckTilt": "10:42 · Neck tilted",
    "history.corrected": "Posture corrected",
    "history.improvement": "10:43 · Improvement detected",
    "history.breakCompleted": "Break completed",
    "history.twoMinutes": "11:20 · 2 minutes",
    "audience.kicker": "Personalized experience",
    "audience.title": "A solution for your routine",
    "audience.description": "Choose the context that best matches you.",
    "audience.study": "Study",
    "audience.students": "Students",
    "audience.studentsDescription": "Subtle alerts during classes, assignments, and study sessions.",
    "audience.work": "Work",
    "audience.remoteWorkers": "Remote workers",
    "audience.workDescription": "Monitoring during meetings and focused work sessions.",
    "audience.gaming": "Gaming",
    "audience.gamers": "Gamers",
    "audience.gamingDescription": "Configurable alerts that respect important moments.",
    "testimonials.title": "What our users say",
    "testimonials.description": "Real experiences from people who improved their well-being with Posture-Check.",
    "testimonials.studentQuote": "“Posture-Check helped me notice how long I stayed hunched over while studying. I now have better habits and less back pain.”",
    "testimonials.studentRole": "University student",
    "testimonials.workerQuote": "“I work many hours at the computer, and the alerts help me correct my posture in time. The app is simple and very useful.”",
    "testimonials.workerRole": "Remote programmer",
    "testimonials.gamerQuote": "“I used to finish gaming sessions with neck tension. Now I take active breaks and feel a major difference.”",
    "testimonials.gamerRole": "Frequent gamer",
    "faq.kicker": "Quick help",
    "faq.title": "Frequently asked questions",
    "faq.description": "Short answers to quickly understand how the platform works.",
    "faq.q1": "How does posture monitoring work?",
    "faq.a1": "The camera analyzes posture reference points and displays a visual status. If an incorrect position is maintained, you receive a discreet alert.",
    "faq.q2": "Does the application store my images or videos?",
    "faq.a2": "No. Processing is performed locally, and images are neither stored nor shared.",
    "faq.q3": "Can I customize the alerts?",
    "faq.a3": "Yes. You can adjust the frequency and choose visual, sound, or vibration alerts.",
    "faq.q4": "What information appears in my progress?",
    "faq.a4": "Monitored time, correct-posture percentage, alerts, breaks, and weekly history.",
    "faq.q5": "Who is the application for?",
    "faq.a5": "University students, remote workers, and gamers who spend several hours in front of a screen.",
    "contact.title": "Need help?",
    "contact.description": "Complete the form and receive immediate confirmation.",
    "contact.name": "Full name",
    "contact.email": "Email address",
    "contact.message": "Message",
    "contact.submit": "Send message",
    "cta.kicker": "Start today",
    "cta.title": "Ready to improve your posture?",
    "cta.description": "Build healthier habits while you study, work, or play.",
    "footer.description": "Preventive monitoring with visual feedback, discreet alerts, and local privacy.",
    "footer.product": "Product",
    "footer.users": "Users",
    "footer.help": "Help",
    "footer.support": "Support",
    "footer.social": "Social media",
    "footer.copyright": "© 2026 Posture-Check. All rights reserved.",
    "contact.success": "Your message was sent successfully.",
    "hero.title": "Correct your posture <span class=\"hero-title-accent\">without interrupting your routine</span>",
    "days.mon": "M",
    "days.tue": "T",
    "days.wed": "W",
    "days.thu": "T",
    "days.fri": "F",
    "days.sat": "S",
    "days.sun": "S",
    "meta.description": "Posture-Check monitors your posture, sends discreet alerts, and shows your progress without storing images.",
    "a11y.home": "Go to the Posture-Check home section",
    "a11y.openMenu": "Open navigation menu",
    "a11y.closeMenu": "Close navigation menu",
    "a11y.mainNavigation": "Main navigation",
    "a11y.darkMode": "Enable dark mode",
    "a11y.lightMode": "Enable light mode",
    "a11y.mainFeatures": "Main features",
    "a11y.exampleStatus": "Example posture status",
    "a11y.metricsPanel": "Example metrics dashboard",
    "a11y.progress82": "82 percent correct posture",
    "a11y.weeklyChart": "Weekly correct-posture chart with an upward trend",
    "a11y.feedbackPanel": "Example statuses and history",
    "a11y.backToTop": "Back to top",
    "a11y.openPanel": "Open accessibility options",
    "a11y.closePanel": "Close accessibility options",
    "a11y.panel": "Accessibility options",
    "a11y.title": "Accessibility",
    "a11y.decrease": "Decrease text size",
    "a11y.increase": "Increase text size",
    "a11y.contrast": "High contrast",
    "a11y.motion": "Reduce motion",
    "a11y.reset": "Reset",
    "language.label": "Language",
    "language.aria": "Select language",
    "images.heroAlt": "Person using Posture-Check in front of a computer",
    "images.studentAlt": "University student in front of a computer",
    "images.workerAlt": "Remote worker using a laptop",
    "images.gamerAlt": "Gamer during a gaming session",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "name@email.com",
    "contact.messagePlaceholder": "Tell us how we can help you...",
    "form.nameError": "Enter a name with at least 2 characters.",
    "form.emailError": "Enter a valid email address.",
    "form.messageError": "Write a message with at least 10 characters.",
    "form.reviewErrors": "Review the highlighted fields before submitting.",
    "form.sending": "Sending...",
    "form.sent": "Message sent successfully."
  }
};

const storageKeys = {
    language: "postureCheck.language",
    theme: "postureCheck.theme",
    textScale: "postureCheck.textScale",
    highContrast: "postureCheck.highContrast",
    reducedMotion: "postureCheck.reducedMotion"
};

let currentLanguage = "es";

function translate(key) {
    return translations[currentLanguage]?.[key] ?? translations.es[key] ?? key;
}

function applyLanguage(language) {
    currentLanguage = translations[language] ? language : "es";
    document.documentElement.lang = currentLanguage;
    localStorage.setItem(storageKeys.language, currentLanguage);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const value = translate(element.dataset.i18n);
        if (value !== undefined) element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
        const value = translate(element.dataset.i18nHtml);
        if (value !== undefined) element.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const value = translate(element.dataset.i18nPlaceholder);
        if (value !== undefined) element.placeholder = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        const value = translate(element.dataset.i18nAria);
        if (value !== undefined) element.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const value = translate(element.dataset.i18nAlt);
        if (value !== undefined) element.alt = value;
    });

    document.querySelectorAll("[data-i18n-content]").forEach((element) => {
        const value = translate(element.dataset.i18nContent);
        if (value !== undefined) element.setAttribute("content", value);
    });

    const languageSelector = document.getElementById("languageSelector");
    if (languageSelector) languageSelector.value = currentLanguage;

    updateThemeControl();
    updateNavigationControl();
    updateAccessibilityControl();
    syncLandingUrl();
}

function getInitialLanguage() {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    if (translations[queryLanguage]) return queryLanguage;
    const savedLanguage = localStorage.getItem(storageKeys.language);
    if (translations[savedLanguage]) return savedLanguage;
    return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
}

function syncLandingUrl() {
    try {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", currentLanguage);
        url.searchParams.set("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        window.history.replaceState({}, "", url.href);
    } catch (_) { /* Ignore environments that restrict History API. */ }
}

function createAuthUrl(showRegistration = false) {
    const url = new URL("../registro/registro.html", window.location.href);
    url.searchParams.set("lang", currentLanguage);
    url.searchParams.set("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    if (showRegistration) url.hash = "registro";
    return url.href;
}

function scrollToSection(selector) {
    const reduced = localStorage.getItem(storageKeys.reducedMotion) === "true";
    document.querySelector(selector)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

function updateNavigationControl() {
    const navigationToggle = document.getElementById("navigationToggle");
    if (!navigationToggle) return;
    const isOpen = navigationToggle.getAttribute("aria-expanded") === "true";
    navigationToggle.setAttribute("aria-label", translate(isOpen ? "a11y.closeMenu" : "a11y.openMenu"));
}

function closeNavigation() {
    const navigation = document.getElementById("mainNavigation");
    const navigationToggle = document.getElementById("navigationToggle");
    navigation?.classList.remove("is-open");
    navigationToggle?.setAttribute("aria-expanded", "false");
    const icon = navigationToggle?.querySelector("i");
    icon?.classList.remove("fa-xmark");
    icon?.classList.add("fa-bars");
    updateNavigationControl();
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem(storageKeys.theme, theme);
    const icon = document.getElementById("themeIcon");
    icon?.classList.toggle("fa-sun", isDark);
    icon?.classList.toggle("fa-moon", !isDark);
    updateThemeControl();
    syncLandingUrl();
}

function updateThemeControl() {
    const button = document.getElementById("themeToggle");
    if (!button) return;
    const isDark = document.body.classList.contains("dark-mode");
    button.setAttribute("aria-label", translate(isDark ? "a11y.lightMode" : "a11y.darkMode"));
    button.title = translate(isDark ? "a11y.lightMode" : "a11y.darkMode");
}

function applyAccessibilityPreferences() {
    const savedScale = Number(localStorage.getItem(storageKeys.textScale) || 1);
    const scale = Math.min(1.2, Math.max(0.9, savedScale));
    document.documentElement.style.setProperty("--user-font-scale", String(scale));

    const highContrast = localStorage.getItem(storageKeys.highContrast) === "true";
    const reducedMotion = localStorage.getItem(storageKeys.reducedMotion) === "true";
    document.body.classList.toggle("high-contrast", highContrast);
    document.body.classList.toggle("reduce-motion", reducedMotion);

    document.getElementById("contrastToggle")?.setAttribute("aria-pressed", String(highContrast));
    document.getElementById("motionToggle")?.setAttribute("aria-pressed", String(reducedMotion));
}

function updateAccessibilityControl() {
    const toggle = document.getElementById("accessibilityToggle");
    if (!toggle) return;
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-label", translate(isOpen ? "a11y.closePanel" : "a11y.openPanel"));
}

function closeAccessibilityPanel() {
    const panel = document.getElementById("accessibilityPanel");
    const toggle = document.getElementById("accessibilityToggle");
    if (panel) panel.hidden = true;
    toggle?.setAttribute("aria-expanded", "false");
    updateAccessibilityControl();
}

function announceAccessibility(esMessage, enMessage) {
    const message = currentLanguage === "en" ? enMessage : esMessage;
    let region = document.getElementById("accessibilityStatus");
    if (!region) {
        region = document.createElement("div");
        region.id = "accessibilityStatus";
        region.className = "accessibility-status";
        region.setAttribute("role", "status");
        region.setAttribute("aria-live", "polite");
        document.body.append(region);
    }
    region.textContent = message;
    region.classList.add("show");
    window.clearTimeout(announceAccessibility.timeoutId);
    announceAccessibility.timeoutId = window.setTimeout(() => region.classList.remove("show"), 2400);
}

function validateName(field) {
    const value = field.input.value.trim();
    return setFieldError(field, value.length < 2 ? translate("form.nameError") : "");
}

function validateEmail(field) {
    const value = field.input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return setFieldError(field, isValid ? "" : translate("form.emailError"));
}

function validateMessage(field) {
    const value = field.input.value.trim();
    return setFieldError(field, value.length < 10 ? translate("form.messageError") : "");
}

function setFieldError(field, message) {
    field.error.textContent = message;
    field.input.classList.toggle("input-error", Boolean(message));
    field.input.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
}

document.addEventListener("DOMContentLoaded", () => {
    const initialLanguage = getInitialLanguage();
    currentLanguage = initialLanguage;
    document.getElementById("loginButton")?.addEventListener("click", () => { window.location.href = createAuthUrl(false); });
    ["headerPrimaryCta", "heroPrimaryCta", "finalPrimaryCta"].forEach((id) => {
        document.getElementById(id)?.addEventListener("click", () => { window.location.href = createAuthUrl(true); });
    });
    document.getElementById("demoButton")?.addEventListener("click", () => scrollToSection("#metrics"));
    document.getElementById("finalMetricsButton")?.addEventListener("click", () => scrollToSection("#metrics"));

    const languageSelector = document.getElementById("languageSelector");
    languageSelector?.addEventListener("change", (event) => applyLanguage(event.target.value));

    const navigationToggle = document.getElementById("navigationToggle");
    const navigation = document.getElementById("mainNavigation");
    navigationToggle?.addEventListener("click", () => {
        const isOpen = navigation?.classList.toggle("is-open") ?? false;
        navigationToggle.setAttribute("aria-expanded", String(isOpen));
        const icon = navigationToggle.querySelector("i");
        icon?.classList.toggle("fa-bars", !isOpen);
        icon?.classList.toggle("fa-xmark", isOpen);
        updateNavigationControl();
    });
    navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));

    const navigationLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
    const sections = navigationLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const sectionObserver = new IntersectionObserver((entries) => {
        const visibleSection = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleSection) return;
        navigationLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${visibleSection.target.id}`;
            link.classList.toggle("active", isActive);
            if (isActive) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }, { rootMargin: "-30% 0px -55%", threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => sectionObserver.observe(section));

    const queryTheme = new URLSearchParams(window.location.search).get("theme");
    const savedTheme = ["light", "dark"].includes(queryTheme) ? queryTheme : (localStorage.getItem(storageKeys.theme) || "light");
    applyTheme(savedTheme);
    document.getElementById("themeToggle")?.addEventListener("click", () => {
        applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
    });

    const accessibilityToggle = document.getElementById("accessibilityToggle");
    const accessibilityPanel = document.getElementById("accessibilityPanel");
    accessibilityToggle?.addEventListener("click", () => {
        const isOpen = accessibilityToggle.getAttribute("aria-expanded") !== "true";
        accessibilityToggle.setAttribute("aria-expanded", String(isOpen));
        if (accessibilityPanel) accessibilityPanel.hidden = !isOpen;
        updateAccessibilityControl();
    });

    document.getElementById("increaseText")?.addEventListener("click", () => {
        const current = Number(localStorage.getItem(storageKeys.textScale) || 1);
        localStorage.setItem(storageKeys.textScale, String(Math.min(1.2, current + 0.1)));
        applyAccessibilityPreferences();
    });
    document.getElementById("decreaseText")?.addEventListener("click", () => {
        const current = Number(localStorage.getItem(storageKeys.textScale) || 1);
        localStorage.setItem(storageKeys.textScale, String(Math.max(0.9, current - 0.1)));
        applyAccessibilityPreferences();
    });
    document.getElementById("contrastToggle")?.addEventListener("click", () => {
        const nextValue = !document.body.classList.contains("high-contrast");
        localStorage.setItem(storageKeys.highContrast, String(nextValue));
        applyAccessibilityPreferences();
    });
    document.getElementById("motionToggle")?.addEventListener("click", () => {
        const nextValue = !document.body.classList.contains("reduce-motion");
        localStorage.setItem(storageKeys.reducedMotion, String(nextValue));
        applyAccessibilityPreferences();
        announceAccessibility(
            nextValue ? "Movimiento reducido activado." : "Movimiento reducido desactivado.",
            nextValue ? "Reduced motion enabled." : "Reduced motion disabled."
        );
    });
    document.getElementById("resetAccessibility")?.addEventListener("click", () => {
        localStorage.removeItem(storageKeys.textScale);
        localStorage.removeItem(storageKeys.highContrast);
        localStorage.removeItem(storageKeys.reducedMotion);
        document.documentElement.style.setProperty("--user-font-scale", "1");
        applyAccessibilityPreferences();
        announceAccessibility("Opciones de accesibilidad restablecidas.", "Accessibility options reset.");
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".accessibility-wrapper")) closeAccessibilityPanel();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigation();
            closeAccessibilityPanel();
        }
    });

    const contactForm = document.getElementById("contactForm");
    const fields = {
        name: { input: document.getElementById("fullName"), error: document.getElementById("nameError") },
        email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
        message: { input: document.getElementById("message"), error: document.getElementById("messageError") }
    };
    const messageCounter = document.getElementById("messageCounter");
    const formStatus = document.getElementById("formStatus");
    const toast = document.getElementById("toast");

    fields.name.input?.addEventListener("blur", () => validateName(fields.name));
    fields.email.input?.addEventListener("blur", () => validateEmail(fields.email));
    fields.message.input?.addEventListener("blur", () => validateMessage(fields.message));
    fields.message.input?.addEventListener("input", () => {
        messageCounter.textContent = `${fields.message.input.value.length}/500`;
    });

    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        formStatus.textContent = "";
        const isValid = [validateName(fields.name), validateEmail(fields.email), validateMessage(fields.message)].every(Boolean);
        if (!isValid) {
            formStatus.textContent = translate("form.reviewErrors");
            contactForm.querySelector(".input-error")?.focus();
            return;
        }

        const submitButton = document.getElementById("submitContact");
        const submitLabel = submitButton.querySelector("span");
        submitButton.disabled = true;
        submitButton.classList.add("is-loading");
        submitLabel.textContent = translate("form.sending");

        window.setTimeout(() => {
            contactForm.reset();
            messageCounter.textContent = "0/500";
            formStatus.textContent = translate("form.sent");
            submitButton.disabled = false;
            submitButton.classList.remove("is-loading");
            submitLabel.textContent = translate("contact.submit");
            toast.classList.add("show");
            window.setTimeout(() => toast.classList.remove("show"), 3500);
        }, 700);
    });

    document.querySelectorAll(".faq-container details").forEach((detail) => {
        detail.addEventListener("toggle", () => {
            if (!detail.open) return;
            document.querySelectorAll(".faq-container details").forEach((other) => {
                if (other !== detail) other.open = false;
            });
        });
    });

    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => backToTop?.classList.toggle("show", window.scrollY > 600), { passive: true });
    backToTop?.addEventListener("click", () => window.scrollTo({
        top: 0,
        behavior: localStorage.getItem(storageKeys.reducedMotion) === "true" ? "auto" : "smooth"
    }));

    applyAccessibilityPreferences();
    applyLanguage(initialLanguage);
});
