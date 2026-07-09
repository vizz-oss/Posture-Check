"use strict";

(() => {
  const KEYS = Object.freeze({
    language: "postureCheck.language",
    theme: "postureCheck.theme",
    textScale: "postureCheck.textScale",
    highContrast: "postureCheck.highContrast",
    reducedMotion: "postureCheck.reducedMotion",
    session: "postureCheck.session"
  });

  const ES_TO_EN = {
    "Última sesión guardada": "Latest saved session",
    "Tiempo": "Time",
    "Postura": "Posture",
    "Pausas": "Breaks",
    "Listo para iniciar": "Ready to start",
    "Estado del monitoreo": "Monitoring status",
    "Pausa activa": "Active break",
    "Pausa activa guiada": "Guided active break",
    "Finalizar pausa": "End break",
    "Alertas recientes": "Recent alerts",
    "Recomendación personalizada": "Personalized recommendation",
    "Iniciar pausa de 30 s": "Start 30-second break",
    "Mostrar menos": "Show less",
    "Desactivar cámara": "Turn off camera",
    "Cámara activa (demo)": "Camera active (demo)",
    "Es momento de una pausa breve.": "It is time for a short break.",
    "Sesión guardada en tu historial.": "Session saved to your history.",
    "Monitoreo iniciado.": "Monitoring started.",
    "Configuración guardada correctamente.": "Settings saved successfully.",
    "Preferencias guardadas correctamente.": "Preferences saved successfully.",
    "Perfil actualizado correctamente.": "Profile updated successfully.",
    "Posture-Check | Acceso": "Posture-Check | Access",
    "Dashboard del trabajador remoto | Posture-Check": "Remote worker dashboard | Posture-Check",
    "Monitoreo del trabajador | Posture-Check": "Remote worker monitoring | Posture-Check",
    "Perfil del trabajador | Posture-Check": "Remote worker profile | Posture-Check",
    "Dashboard Gamer | Posture-Check": "Gamer dashboard | Posture-Check",
    "Monitoreo Gamer | Posture-Check": "Gamer monitoring | Posture-Check",
    "Perfil Gamer | Posture-Check": "Gamer profile | Posture-Check",
    "Panel del estudiante | Posture-Check": "Student dashboard | Posture-Check",
    "Monitoreo postural | Posture-Check": "Posture monitoring | Posture-Check",
    "Perfil del estudiante | Posture-Check": "Student profile | Posture-Check",
    "Progreso postural": "Posture progress",
    "Monitoreo postural": "Posture monitoring",
    "Acceso a la cámara": "Camera access",
    "Duración aproximada *": "Approximate duration *",
    "Configura tu sesión y permite que Posture-Check analice tu postura.": "Configure your session and allow Posture-Check to analyze your posture.",
    "La cámara se utilizará únicamente para detectar tu postura en tiempo real.": "The camera is used only to detect your posture in real time.",
    "Posture-Check solo utiliza la cámara durante la sesión de monitoreo. Puedes detenerla en cualquier momento desde este panel.": "Posture-Check only uses the camera during the monitoring session. You can stop it at any time from this panel.",
    "Personaliza el monitoreo según la actividad que realizarás.": "Customize monitoring according to the activity you will perform.",
    "La cámara se utiliza únicamente durante la sesión y Posture-Check no almacena tus imágenes.": "The camera is used only during the session, and Posture-Check does not store your images.",
    "Personaliza el monitoreo según tu jornada de trabajo remoto.": "Customize monitoring according to your remote workday.",
    "Monitorea tu postura y crea hábitos más saludables durante tus jornadas de trabajo remoto.": "Monitor your posture and build healthier habits during your remote workdays.",
    "La cámara se usa únicamente durante el monitoreo. Posture-Check no guarda tus imágenes.": "The camera is used only during monitoring. Posture-Check does not save your images.",
    "Los datos se actualizarán mientras la sesión esté activa.": "Data will update while the session is active.",
    "Monitorea tu postura y crea hábitos más saludables durante tus sesiones de juego.": "Monitor your posture and build healthier habits during your gaming sessions.",
    "Mejorar la postura general": "Improve overall posture",
    "Reducir tensión en el cuello": "Reduce neck tension",
    "Evitar encorvar la espalda": "Avoid rounding the back",
    "Mejorar la posición de hombros": "Improve shoulder position",
    "Mantén una distancia aproximada de un brazo entre tus ojos y la pantalla.": "Keep approximately one arm's length between your eyes and the screen.",
    "Mantén la zona lumbar apoyada y los pies completamente sobre el suelo.": "Keep your lower back supported and both feet flat on the floor.",
    "Recomendada después de dos horas continuas de trabajo": "Recommended after two continuous hours of work",
    "Ajusta tu distancia": "Adjust your distance",
    "Te acercaste demasiado a la pantalla en tres sesiones": "You moved too close to the screen in three sessions",
    "Una solución inteligente que ayuda a estudiantes, trabajadores remotos y gamers a mejorar sus hábitos posturales.": "A smart solution that helps students, remote workers, and gamers improve their posture habits.",
    "Ajusta la silla, apoya la espalda y mantén los pies firmes para jugar con mayor comodidad.": "Adjust your chair, support your back, and keep your feet stable for more comfortable gaming.",
    "Ver perfil": "View profile",
    "Ayudamos a gamers a mantener hábitos posturales saludables durante sus sesiones de juego.": "We help gamers maintain healthy posture habits during gaming sessions.",
    "Compara tu rendimiento postural con tus metas gamer.": "Compare your posture performance with your gaming goals.",
    "Crea hábitos más saludables durante tus sesiones de juego.": "Build healthier habits during your gaming sessions.",
    "Crea hábitos posturales más saludables durante tus jornadas de trabajo.": "Build healthier posture habits during your workdays.",
    "Tus últimas sesiones de monitoreo": "Your latest monitoring sessions",
    "78% del tiempo monitoreado": "78% of monitored time",
    "Has mejorado la posición del cuello durante tus sesiones de estudio. Continúa manteniendo la pantalla a la altura de los ojos.": "Your neck position has improved during study sessions. Continue keeping the screen at eye level.",
    "La postura de tu espalda ha mejorado, pero todavía debes evitar inclinarte hacia adelante durante tareas largas.": "Your back posture has improved, but you should still avoid leaning forward during long tasks.",
    "Estudiante universitaria que utiliza Posture-Check para cuidar su postura durante clases virtuales, tareas y largas sesiones frente a la computadora. Su objetivo es reducir molestias en el cuello y la espalda y mantener hábitos saludables mientras estudia.": "A university student who uses Posture-Check to care for her posture during online classes, assignments, and long computer sessions. Her goal is to reduce neck and back discomfort and maintain healthy habits while studying.",
    "Volver al inicio": "Back to home",
    "Bienvenido a Posture-Check": "Welcome to Posture-Check",
    "Accede a tu cuenta y continúa mejorando tus hábitos posturales": "Sign in and continue improving your posture habits",
    "Iniciar sesión": "Sign in",
    "Registrarse": "Register",
    "Inicia sesión": "Sign in",
    "Accede a tu cuenta para continuar": "Access your account to continue",
    "Correo electrónico": "Email address",
    "Contraseña": "Password",
    "¿Olvidaste tu contraseña?": "Forgot your password?",
    "O continúa con": "Or continue with",
    "Únete a Posture-Check": "Join Posture-Check",
    "Crea tu cuenta y empieza a cuidar tu postura diariamente": "Create your account and start taking care of your posture every day",
    "Crear cuenta": "Create account",
    "Forma parte de la comunidad de Posture-Check": "Become part of the Posture-Check community",
    "Nombre completo": "Full name",
    "Tipo de usuario": "User type",
    "Selecciona tu tipo de usuario": "Select your user type",
    "Estudiante universitario": "University student",
    "Estudiante universitaria": "University student",
    "Trabajador remoto": "Remote worker",
    "Confirmar contraseña": "Confirm password",
    "Al registrarte, aceptas nuestros": "By registering, you accept our",
    "términos y condiciones": "terms and conditions",
    "Dashboard": "Dashboard",
    "Monitoreo": "Monitoring",
    "Mi perfil": "My profile",
    "Configuración": "Settings",
    "Cerrar sesión": "Sign out",
    "Mejorando tu postura, mejorando tu bienestar": "Improving your posture, improving your well-being",
    "Mejorando tu postura": "Improving your posture",
    "Panel estudiante": "Student dashboard",
    "Panel trabajador remoto": "Remote worker dashboard",
    "Panel gamer": "Gamer dashboard",
    "Cuida tu postura mientras estudias": "Take care of your posture while studying",
    "Cuida tu postura durante tu jornada": "Take care of your posture during your workday",
    "Juega mejor mientras cuidas tu postura": "Play better while taking care of your posture",
    "Iniciar monitoreo": "Start monitoring",
    "Tiempo monitoreado": "Monitored time",
    "Tiempo de juego hoy": "Gaming time today",
    "Postura correcta": "Correct posture",
    "Alertas recibidas": "Alerts received",
    "Pausas activas": "Active breaks",
    "Pausas completadas": "Completed breaks",
    "Meta diaria completada": "Daily goal completed",
    "Durante la jornada de hoy": "During today's workday",
    "Configuración rápida": "Quick settings",
    "Configuración gamer": "Gamer settings",
    "Duración de la jornada": "Workday duration",
    "Duración estimada": "Estimated duration",
    "Frecuencia de alertas": "Alert frequency",
    "Tipo de alerta": "Alert type",
    "Objetivo postural": "Posture goal",
    "Guardar configuración": "Save settings",
    "Guardar preferencias": "Save preferences",
    "Guardar cambios": "Save changes",
    "Resumen": "Summary",
    "Progreso": "Progress",
    "Recomendaciones": "Recommendations",
    "Restablecer datos de demostración": "Reset demo data",
    "Resumen de tu jornada": "Your workday summary",
    "Resumen de la jornada": "Workday summary",
    "Resumen de la partida": "Game session summary",
    "Información basada en tus sesiones de trabajo recientes": "Information based on your recent work sessions",
    "Reunión virtual": "Virtual meeting",
    "Trabajo concentrado": "Focused work",
    "Gestión de correos": "Email management",
    "Elaboración de informe": "Report writing",
    "Ver detalle": "View details",
    "Ver recomendación": "View recommendation",
    "Ver ejercicios": "View exercises",
    "Ver consejo": "View tip",
    "Ver todas": "View all",
    "Consejos para tu jornada": "Tips for your workday",
    "Acciones rápidas para trabajar con mayor comodidad": "Quick actions to work more comfortably",
    "Ajusta la pantalla": "Adjust the screen",
    "Colócala a la altura de tus ojos": "Place it at eye level",
    "Apoya la espalda": "Support your back",
    "Utiliza correctamente el respaldo": "Use the backrest correctly",
    "Progreso semanal": "Weekly progress",
    "Compara tus resultados de los últimos siete días": "Compare your results from the last seven days",
    "Compara tus resultados con las metas configuradas.": "Compare your results with your configured goals.",
    "Tu evolución durante los últimos siete días.": "Your progress over the last seven days.",
    "Meta semanal": "Weekly goal",
    "Recomendaciones personalizadas": "Personalized recommendations",
    "Sugerencias basadas en tus alertas posturales": "Suggestions based on your posture alerts",
    "Pausa activa de cinco minutos": "Five-minute active break",
    "Prioridad alta": "High priority",
    "Prioridad media": "Medium priority",
    "Jornada laboral saludable": "Healthy workday",
    "Sesión gamer saludable": "Healthy gaming session",
    "Monitorea tu postura mientras trabajas": "Monitor your posture while working",
    "Monitorea tu postura mientras juegas": "Monitor your posture while gaming",
    "Iniciar monitoreo postural": "Start posture monitoring",
    "Cámara desactivada": "Camera off",
    "Activa la cámara para comenzar el monitoreo postural.": "Turn on the camera to start posture monitoring.",
    "Activa la cámara para iniciar el análisis postural.": "Turn on the camera to start posture analysis.",
    "Presiona el botón para permitir el acceso a la cámara.": "Press the button to allow camera access.",
    "Las imágenes se procesarán de manera local y no serán almacenadas.": "Images are processed locally and are not stored.",
    "Esperando inicio": "Waiting to start",
    "Activar cámara": "Turn on camera",
    "Detener cámara": "Turn off camera",
    "Cámara activa": "Camera active",
    "Privacidad protegida": "Privacy protected",
    "Privacidad y seguridad": "Privacy and security",
    "Tu privacidad está protegida": "Your privacy is protected",
    "Configura tu jornada": "Configure your workday",
    "Configura tu partida": "Configure your game session",
    "Configuración de la sesión": "Session settings",
    "Actividad principal": "Main activity",
    "Tipo de actividad *": "Activity type *",
    "Tipo de juego": "Game type",
    "Selecciona una actividad": "Select an activity",
    "Selecciona una categoría": "Select a category",
    "Programación": "Programming",
    "Elaboración de documentos": "Document writing",
    "Diseño o edición": "Design or editing",
    "Otra actividad": "Other activity",
    "Sesión de estudio": "Study session",
    "Clase virtual": "Online class",
    "Trabajo académico": "Academic work",
    "Lectura": "Reading",
    "Reunión grupal": "Group meeting",
    "Competitivo": "Competitive",
    "Casual": "Casual",
    "Estrategia": "Strategy",
    "Aventura": "Adventure",
    "Simulación": "Simulation",
    "Otro": "Other",
    "Visual": "Visual",
    "Sonora": "Sound",
    "Visual y sonora": "Visual and sound",
    "Alerta visual": "Visual alert",
    "Alerta sonora": "Sound alert",
    "Zonas a supervisar": "Areas to monitor",
    "Zonas que deseas cuidar": "Areas you want to care for",
    "Selecciona las partes del cuerpo que requieren mayor atención.": "Select the body areas that need the most attention.",
    "Cuello": "Neck",
    "Espalda": "Back",
    "Hombros": "Shoulders",
    "Brazos": "Arms",
    "Muñecas": "Wrists",
    "Distancia a la pantalla": "Distance from the screen",
    "Posición de pantalla": "Screen position",
    "Objetivo de la jornada": "Workday goal",
    "Objetivo de la partida": "Game session goal",
    "Objetivo de la sesión": "Session goal",
    "Notas adicionales": "Additional notes",
    "Cancelar": "Cancel",
    "Finalizar sesión": "End session",
    "Tiempo transcurrido": "Elapsed time",
    "Alertas": "Alerts",
    "Analizando postura...": "Analyzing posture...",
    "Corrige tu postura": "Correct your posture",
    "Sesión finalizada": "Session completed",
    "Partida finalizada": "Game session completed",
    "Perfil del trabajador remoto": "Remote worker profile",
    "Perfil de trabajador remoto": "Remote worker profile",
    "Perfil gamer": "Gamer profile",
    "Perfil del estudiante": "Student profile",
    "Editar perfil": "Edit profile",
    "Editar perfil gamer": "Edit gamer profile",
    "Resumen de bienestar": "Well-being summary",
    "Resumen gamer": "Gamer summary",
    "Resultados acumulados de tus sesiones laborales.": "Accumulated results from your work sessions.",
    "Resultados acumulados de tus partidas y sesiones monitoreadas.": "Accumulated results from your monitored games and sessions.",
    "Actividad reciente": "Recent activity",
    "Tus últimas sesiones registradas.": "Your latest recorded sessions.",
    "Tus últimas partidas registradas con Posture-Check.": "Your latest games recorded with Posture-Check.",
    "Buen resultado": "Good result",
    "Debes mejorar": "Needs improvement",
    "Revisar postura": "Review posture",
    "Información personal": "Personal information",
    "Información gamer": "Gamer information",
    "Nombre": "Name",
    "Nombre de usuario": "Username",
    "Cargo o actividad": "Role or activity",
    "Modalidad": "Work mode",
    "Trabajo remoto": "Remote work",
    "Trabajo híbrido": "Hybrid work",
    "Trabajo presencial": "On-site work",
    "Ubicación": "Location",
    "Meta diaria": "Daily goal",
    "Preferencias": "Preferences",
    "Alertas visuales": "Visual alerts",
    "Alertas sonoras": "Sound alerts",
    "Recordar pausas": "Break reminders",
    "Mostrar avisos durante la sesión": "Show notices during the session",
    "Mostrar avisos mientras juegas": "Show notices while gaming",
    "Reproducir sonido al detectar mala postura": "Play a sound when poor posture is detected",
    "Reproducir sonidos al detectar una postura inadecuada": "Play sounds when poor posture is detected",
    "Avisar cuando corresponda descansar": "Notify me when it is time to rest",
    "Accesos rápidos": "Quick actions",
    "Ir al dashboard": "Go to dashboard",
    "Estilo de juego": "Gaming style",
    "Plataforma": "Platform",
    "Plataforma principal": "Main platform",
    "Consola": "Console",
    "PC y consola": "PC and console",
    "Dispositivo móvil": "Mobile device",
    "Cooperativo": "Cooperative",
    "Actividad": "Activity",
    "Sobre mí": "About me",
    "Miembro desde 2026": "Member since 2026",
    "Clases virtuales": "Online classes",
    "Sesiones de estudio": "Study sessions",
    "Bienestar postural": "Posture well-being",
    "de postura correcta": "correct posture",
    "monitoreadas": "monitored",
    "de racha activa": "active streak",
    "Ver progreso": "View progress",
    "Configurar alertas": "Configure alerts",
    "Postura de cuello": "Neck posture",
    "Postura de espalda": "Back posture",
    "Última revisión: hoy": "Last review: today",
    "Última revisión: ayer": "Last review: yesterday",
    "Última revisión: esta semana": "Last review: this week",
    "Acerca de mi rutina": "About my routine",
    "Objetivos personales": "Personal goals",
    "Reducir dolor de espalda": "Reduce back pain",
    "Mejorar postura": "Improve posture",
    "Realizar pausas activas": "Take active breaks",
    "Estudiar cómodamente": "Study comfortably",
    "Rutina habitual": "Usual routine",
    "Lecturas académicas": "Academic reading",
    "Trabajos frente a la computadora": "Computer-based assignments",
    "Sesiones de estudio prolongadas": "Long study sessions",
    "Preferencias de monitoreo": "Monitoring preferences",
    "Avisos cada 30 minutos": "Notices every 30 minutes",
    "Pausas activas de 5 minutos": "Five-minute active breaks",
    "Resumen semanal de progreso": "Weekly progress summary",
    "Resumen de la sesión": "Session summary",
    "Los datos se actualizan durante el monitoreo.": "Data updates during monitoring.",
    "Preparando análisis postural...": "Preparing posture analysis...",
    "Calibrando postura... mantente sentado de forma natural.": "Calibrating posture... sit naturally.",
    "Modelo postural listo.": "Posture model ready.",
    "Ubícate frente a la cámara": "Position yourself in front of the camera",
    "Eleva la cabeza y alinea el cuello": "Raise your head and align your neck",
    "Nivela los hombros": "Level your shoulders",
    "Endereza la espalda": "Straighten your back",
    "Aléjate un poco de la pantalla": "Move slightly away from the screen",
    "Análisis postural no disponible": "Posture analysis unavailable",
    "Análisis postural activo": "Posture analysis active",
    "La estimación visual es orientativa y no reemplaza una evaluación profesional.": "The visual estimate is for guidance and does not replace a professional assessment.",
    "Los datos se procesan en el navegador y no se almacenan imágenes.": "Data is processed in the browser and images are not stored.",
    "No se pudo cargar el análisis postural. La cámara seguirá funcionando.": "Posture analysis could not be loaded. The camera will keep working.",
    "Mis alertas": "My alerts",
    "Perfil postural": "Posture profile",
    "completado": "completed",
    "Tipo de usuario:": "User type:",
    "Objetivo:": "Goal:",
    "Racha activa:": "Active streak:",
    "Objetivos de la semana": "Weekly goals",
    "Distribución de alertas": "Alert distribution",
    "Zonas corporales que requieren mayor atención": "Body areas that need the most attention",
    "Próxima recomendación": "Next recommendation",
    "Realiza una pausa activa de cinco minutos.": "Take a five-minute active break.",
    "Hoy, después de tu próxima sesión de estudio.": "Today, after your next study session.",
    "Partidas recientes": "Recent games",
    "Resumen de tus últimas partidas con monitoreo postural.": "Summary of your latest games with posture monitoring.",
    "Partida competitiva": "Competitive match",
    "Sesión casual": "Casual session",
    "Torneo online": "Online tournament",
    "Juego cooperativo": "Cooperative game",
    "Consejo gamer del día": "Gamer tip of the day",
    "Optimiza tu setup": "Optimize your setup",
    "Juega mejor, cuida tu postura": "Play better, take care of your posture",
    "Estudiantes": "Students",
    "Trabajadores remotos": "Remote workers",
    "Gamers": "Gamers",
    "Cómo funciona": "How it works",
    "Beneficios": "Benefits",
    "Preguntas frecuentes": "Frequently asked questions",
    "Soporte": "Support",
    "Contacto": "Contact"
  };

  Object.assign(ES_TO_EN, {
    "Panel": "Dashboard",
    "Jugadores": "Gamers",
    "Jugador": "Gamer",
    "Panel del jugador": "Panel gamer",
    "Panel del jugador | Posture-Check": "Dashboard Gamer | Posture-Check",
    "Monitoreo del jugador | Posture-Check": "Monitoreo Gamer | Posture-Check",
    "Perfil del jugador | Posture-Check": "Perfil Gamer | Posture-Check",
    "Configuración del jugador": "Configuración gamer",
    "Jugador competitivo · PC, consola y partidas en línea": "Gamer competitivo · PC, consola y partidas online",
    "Consejo del día para jugadores": "Consejo gamer del día",
    "Sesión saludable de juego": "Sesión gamer saludable",
    "Revisa tus sesiones, recibe alertas discretas y mejora tus hábitos durante clases virtuales, lecturas y trabajos académicos.": "Review your sessions, receive discreet alerts, and improve your habits during online classes, reading, and academic work.",
    "↑ 3 h más esta semana": "↑ 3 more hours this week",
    "↓ 6 menos esta semana": "↓ 6 fewer this week",
    "↑ 4 más este mes": "↑ 4 more this month",
    "Resumen de tu rendimiento durante los últimos días": "Summary of your performance over the last few days",
    "18.5 de 25 horas completadas": "18.5 of 25 hours completed",
    "6 días": "6 days",
    "Tiempo monitoreado (18.5 h / 25 h)": "Monitored time (18.5 h / 25 h)",
    "Postura correcta (78% / 85%)": "Correct posture (78% / 85%)",
    "Cuello:": "Neck:",
    "Espalda:": "Back:",
    "Hombros:": "Shoulders:",
    "© 2026 Posture-Check. Todos los derechos reservados.": "© 2026 Posture-Check. All rights reserved.",
    "Logo de Posture-Check": "Posture-Check logo",
    "Frecuencia de alertas *": "Alert frequency *",
    "Tipo de alerta *": "Alert type *",
    "Ejemplo: mantener la espalda recta": "Example: keep your back straight",
    "Agrega una observación para esta sesión": "Add a note for this session",
    "Lima, Perú": "Lima, Peru",
    "Duración: 2 horas": "Duration: 2 hours",
    "Duración: 1 hora 30 minutos": "Duration: 1 hour 30 minutes",
    "Duración: 3 horas": "Duration: 3 hours",
    "Duración: 1 hora": "Duration: 1 hour",
    "Completaste la mayoría de tus pausas activas. Te faltan tres para alcanzar tu objetivo semanal.": "You completed most of your active breaks. You need three more to reach your weekly goal.",
    "Paso varias horas al día estudiando frente a una computadora, participando en clases virtuales y desarrollando trabajos académicos. Utilizo Posture-Check para mantener una posición adecuada, recibir alertas y hacer pausas activas.": "I spend several hours a day studying at a computer, attending online classes, and completing academic work. I use Posture-Check to maintain proper posture, receive alerts, and take active breaks.",
    "Foto del estudiante": "Student profile photo",
    "Revisa tus partidas, controla tus alertas posturales y mejora tus hábitos durante cada sesión de juego.": "Review your games, manage posture alerts, and improve your habits during every gaming session.",
    "5% mejor que ayer": "5% better than yesterday",
    "Principalmente por espalda": "Mainly due to back posture",
    "2 horas · Postura correcta: 82%": "2 hours · Correct posture: 82%",
    "1 hora 15 minutos · Postura correcta: 74%": "1 hour 15 minutes · Correct posture: 74%",
    "2 horas 30 minutos · Postura correcta: 80%": "2 hours 30 minutes · Correct posture: 80%",
    "Activa la cámara, configura tus alertas y recibe avisos durante tus partidas para mantener una postura más saludable.": "Turn on the camera, configure your alerts, and receive notifications during your games to maintain healthier posture.",
    "Personaliza las alertas según el tipo y duración de tu sesión de juego.": "Customize alerts according to the type and duration of your gaming session.",
    "Ejemplo: mantener una postura estable durante la partida": "Example: maintain stable posture during the game",
    "Foto de perfil del jugador": "Gamer profile photo",
    "2 horas · Postura correcta: 83%": "2 hours · Correct posture: 83%",
    "1 hora 20 minutos · Postura correcta: 72%": "1 hour 20 minutes · Correct posture: 72%",
    "2 horas 30 minutos · Postura correcta: 81%": "2 hours 30 minutes · Correct posture: 81%",
    "Revisa tus sesiones, controla tus alertas y mejora tus hábitos durante reuniones, programación y trabajo desde casa.": "Review your sessions, manage alerts, and improve your habits during meetings, programming, and working from home.",
    "↑ 6% frente a la semana pasada": "↑ 6% compared with last week",
    "3 menos que ayer": "3 fewer than yesterday",
    "Duración: 1 hora 15 minutos": "Duration: 1 hour 15 minutes",
    "Postura correcta: 84%": "Correct posture: 84%",
    "Postura correcta: 78%": "Correct posture: 78%",
    "Duración: 45 minutos": "Duration: 45 minutes",
    "Postura correcta: 88%": "Correct posture: 88%",
    "1 alerta": "1 alert",
    "Postura correcta: 80%": "Correct posture: 80%",
    "Activa la cámara, configura tus alertas y recibe avisos durante tu jornada para mantener una postura adecuada mientras trabajas.": "Turn on the camera, configure your alerts, and receive notifications during your workday to maintain proper posture while working.",
    "Ejemplo: mantener la espalda apoyada": "Example: keep your back supported",
    "Trabajador remoto · Desarrollo y gestión de proyectos": "Remote worker · Development and project management",
    "Desarrollo y gestión de proyectos": "Development and project management",
    "2 horas · Postura correcta: 84%": "2 hours · Correct posture: 84%",
    "1 hora 20 minutos · Postura correcta: 76%": "1 hour 20 minutes · Correct posture: 76%",
    "1 hora 40 minutos · Postura correcta: 88%": "1 hour 40 minutes · Correct posture: 88%",
    "8 horas de monitoreo": "8 hours of monitoring",
    "4 horas de monitoreo": "4 hours of monitoring",
    "6 horas de monitoreo": "6 hours of monitoring",
    "10 horas de monitoreo": "10 hours of monitoring",
    "Foto de perfil del trabajador remoto": "Remote worker profile photo",
    "Tu nombre": "Your name",
    "Nombre de ejemplo": "Sample name",
    "Cerrar": "Close",
    "Listo": "Done",
    "Reducir movimiento": "Reduce motion",
    "Restablecer accesibilidad": "Reset accessibility",
    "El idioma, el tema y la accesibilidad se guardan automáticamente para todas las pantallas.": "Language, theme, and accessibility settings are automatically saved across all screens.",
    "Cambiar tamaño de texto": "Change text size",
    "Activar alto contraste": "Enable high contrast",
    "Desactivar alto contraste": "Disable high contrast",
    "Idioma": "Language",
    "Tema": "Theme",
    "Opciones de visualización": "Display options",
    "Español": "Spanish",
    "Inglés": "English",
    "En línea": "Online",
    "Partidas en línea": "Online matches",
    "Retroalimentación": "Feedback"
  });

  Object.assign(ES_TO_EN, {
    "Estudiante": "Student",
    "Pausas activas (12 / 15)": "Active breaks (12 / 15)",
    "Gamer competitivo · PC, consola y partidas online": "Competitive gamer · PC, console, and online matches",
    "Jugador competitivo · PC, consola y partidas en línea": "Gamer competitivo · PC, consola y partidas online",
    "Foto de perfil del gamer": "Gamer profile photo",
    "Foto de perfil del jugador": "Foto de perfil del gamer",
    "Perfil gamer": "Gamer profile",
    "Perfil del jugador": "Perfil gamer",
    "Resumen gamer": "Gamer summary",
    "Resumen del jugador": "Resumen gamer",
    "Ir al dashboard": "Go to dashboard",
    "Ir al panel": "Ir al dashboard",
    "Editar perfil gamer": "Edit gamer profile",
    "Editar perfil del jugador": "Editar perfil gamer",
    "Torneo en línea": "Torneo online",
    "Una solución inteligente que ayuda a estudiantes, trabajadores remotos y jugadores a mejorar sus hábitos posturales.": "Una solución inteligente que ayuda a estudiantes, trabajadores remotos y gamers a mejorar sus hábitos posturales.",
    "Ayudamos a jugadores a mantener hábitos posturales saludables durante sus sesiones de juego.": "Ayudamos a gamers a mantener hábitos posturales saludables durante sus sesiones de juego."
  });

  Object.assign(ES_TO_EN, {
    "Panel del jugador": "Gamer dashboard",
    "Panel del jugador | Posture-Check": "Gamer dashboard | Posture-Check",
    "Panel del trabajador remoto | Posture-Check": "Remote worker dashboard | Posture-Check",
    "Monitoreo del jugador | Posture-Check": "Gamer monitoring | Posture-Check",
    "Perfil del jugador | Posture-Check": "Gamer profile | Posture-Check",
    "Configuración del jugador": "Gamer settings",
    "Jugador competitivo · PC, consola y partidas en línea": "Competitive gamer · PC, console, and online matches",
    "Consejo del día para jugadores": "Gamer tip of the day",
    "Sesión saludable de juego": "Healthy gaming session",
    "Perfil del jugador": "Gamer profile",
    "Resumen del jugador": "Gamer summary",
    "Compara tu rendimiento postural con tus metas de juego.": "Compare your posture performance with your gaming goals.",
    "Información del jugador": "Gamer information",
    "Editar perfil del jugador": "Edit gamer profile",
    "Ir al panel": "Go to dashboard",
    "Torneo en línea": "Online tournament",
    "Foto de perfil del jugador": "Gamer profile photo",
    "Una solución inteligente que ayuda a estudiantes, trabajadores remotos y jugadores a mejorar sus hábitos posturales.": "A smart solution that helps students, remote workers, and gamers improve their posture habits.",
    "Ayudamos a jugadores a mantener hábitos posturales saludables durante sus sesiones de juego.": "We help gamers maintain healthy posture habits during gaming sessions."
  });

  const EN_TO_ES = Object.fromEntries(Object.entries(ES_TO_EN).map(([es, en]) => [en, es]));
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let language = "es";
  let theme = "light";
  let mutationTimer = null;

  const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

  function currentProjectRoot() {
    const path = window.location.pathname.toLowerCase();
    const nested = ["/estudiantes/", "/trabajadores/", "/gamers/"];
    if (nested.some((token) => path.includes(token))) return new URL("../../", window.location.href);
    if (path.includes("/landing/") || path.includes("/registro/")) return new URL("../", window.location.href);
    return new URL("./", window.location.href);
  }

  function readSettings() {
    const params = new URLSearchParams(window.location.search);
    const requestedLanguage = params.get("lang");
    const requestedTheme = params.get("theme");
    language = ["es", "en"].includes(requestedLanguage)
      ? requestedLanguage
      : (localStorage.getItem(KEYS.language) || "es");
    theme = ["light", "dark"].includes(requestedTheme)
      ? requestedTheme
      : (localStorage.getItem(KEYS.theme) || "light");
    localStorage.setItem(KEYS.language, language);
    localStorage.setItem(KEYS.theme, theme);
  }

  function syncCurrentUrl() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", language);
      url.searchParams.set("theme", theme);
      window.history.replaceState({}, "", url.href);
    } catch (_) { /* file URLs may restrict history updates */ }
  }

  function translatePattern(text, targetLanguage) {
    if (targetLanguage === "es") {
      return text
        .replace(/Every (\d+) minutes/gi, "Cada $1 minutos")
        .replace(/(\d+) hours?/gi, (_, n) => `${n} ${n === "1" ? "hora" : "horas"}`)
        .replace(/(\d+) minutes?/gi, (_, n) => `${n} ${n === "1" ? "minuto" : "minutos"}`)
        .replace(/Duration:\s*/gi, "Duración: ")
        .replace(/Correct posture:\s*/gi, "Postura correcta: ")
        .replace(/\balertasas+\b/gi, (m) => m[0] === "A" ? "Alertas" : "alertas")
        .replace(/\balerts?\b/gi, (m) => m[0] === "A" ? "Alertas" : "alertas")
        .replace(/breaks?/gi, (m) => m[0] === "B" ? "Pausas" : "pausas")
        .replace(/days?/gi, (m) => m[0] === "D" ? "Días" : "días")
        .replace(/this week/gi, "esta semana")
        .replace(/this month/gi, "este mes")
        .replace(/than yesterday/gi, "que ayer")
        .replace(/compared with last week/gi, "frente a la semana pasada");
    }
    return text
      .replace(/Cada (\d+) minutos/gi, "Every $1 minutes")
      .replace(/(\d+) horas?/gi, (_, n) => `${n} ${n === "1" ? "hour" : "hours"}`)
      .replace(/(\d+) minutos?/gi, (_, n) => `${n} ${n === "1" ? "minute" : "minutes"}`)
      .replace(/Duración:\s*/gi, "Duration: ")
      .replace(/Postura correcta:\s*/gi, "Correct posture: ")
      .replace(/\balertasas+\b/gi, (m) => m[0] === "A" ? "Alerts" : "alerts")
      .replace(/\balertas?\b/gi, (m) => m[0] === "A" ? "Alerts" : "alerts")
      .replace(/pausas?/gi, (m) => m[0] === "P" ? "Breaks" : "breaks")
      .replace(/días?/gi, (m) => m[0] === "D" ? "Days" : "days")
      .replace(/esta semana/gi, "this week")
      .replace(/este mes/gi, "this month")
      .replace(/que ayer/gi, "than yesterday")
      .replace(/frente a la semana pasada/gi, "compared with last week");
  }

  function translateValue(value, targetLanguage) {
    const compact = normalize(value);
    if (!compact) return value;
    const leading = String(value).match(/^\s*/)?.[0] || "";
    const trailing = String(value).match(/\s*$/)?.[0] || "";
    const map = targetLanguage === "en" ? ES_TO_EN : EN_TO_ES;
    const exact = map[compact];
    if (exact) return `${leading}${exact}${trailing}`;
    const patterned = translatePattern(compact, targetLanguage);
    return patterned !== compact ? `${leading}${patterned}${trailing}` : value;
  }

  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.parentElement || node.parentElement.closest("script, style, code, pre")) return;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const base = originalText.get(node);
      node.nodeValue = language === "es" ? translateValue(base, "es") : translateValue(base, "en");
      return;
    }
    if (!(node instanceof Element)) return;
    ["placeholder", "title", "aria-label", "alt"].forEach((attribute) => {
      if (!node.hasAttribute(attribute)) return;
      let attrs = originalAttributes.get(node);
      if (!attrs) { attrs = {}; originalAttributes.set(node, attrs); }
      if (!(attribute in attrs)) attrs[attribute] = node.getAttribute(attribute);
      const base = attrs[attribute];
      node.setAttribute(attribute, language === "es" ? translateValue(base, "es") : translateValue(base, "en"));
    });
    node.childNodes.forEach(translateNode);
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "es";
    localStorage.setItem(KEYS.language, language);
    document.documentElement.lang = language;
    if (!document.documentElement.dataset.originalTitle) document.documentElement.dataset.originalTitle = document.title;
    document.title = language === "en" ? translateValue(document.documentElement.dataset.originalTitle, "en") : document.documentElement.dataset.originalTitle;
    translateNode(document.body);
    updateDock();
    rewriteLinks();
    syncCurrentUrl();
    document.dispatchEvent(new CustomEvent("posturecheck:languagechange", { detail: { language } }));
  }

  function syncThemeClasses() {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    if (document.body) {
      // The Landing Page uses .dark-mode, while the segment screens use
      // .modo-oscuro. Keeping both classes synchronized combines the
      // original page-specific palettes with the shared persistent theme.
      document.body.classList.toggle("dark-mode", isDark);
      document.body.classList.toggle("modo-oscuro", isDark);
    }
  }

  function applyTheme(nextTheme) {
    theme = nextTheme === "dark" ? "dark" : "light";
    localStorage.setItem(KEYS.theme, theme);
    syncThemeClasses();
    updateDock();
    rewriteLinks();
    syncCurrentUrl();
    document.dispatchEvent(new CustomEvent("posturecheck:themechange", { detail: { theme } }));
  }

  function applyAccessibility() {
    const scale = Number(localStorage.getItem(KEYS.textScale) || 1);
    document.documentElement.style.fontSize = `${Math.min(1.25, Math.max(.9, scale)) * 100}%`;
    document.documentElement.dataset.highContrast = localStorage.getItem(KEYS.highContrast) === "true" ? "true" : "false";
    document.documentElement.dataset.reducedMotion = localStorage.getItem(KEYS.reducedMotion) === "true" ? "true" : "false";
  }

  function withSettings(input) {
    const url = input instanceof URL ? new URL(input.href) : new URL(input, window.location.href);
    if (["http:", "https:", "file:"].includes(url.protocol)) {
      url.searchParams.set("lang", language);
      url.searchParams.set("theme", theme);
    }
    return url.href;
  }

  function resolveProjectUrl(path) {
    return new URL(String(path).replace(/^\//, ""), currentProjectRoot()).href;
  }

  function repairHref(rawHref) {
    if (!rawHref || rawHref === "#" || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("javascript:")) return rawHref;
    if (/^https?:\/\//i.test(rawHref) && !rawHref.startsWith(window.location.origin)) return rawHref;
    let href = rawHref
      .replace(/landing\/landing\.html/gi, "landing/index.html")
      .replace(/#comoFunciona/gi, "#howItWorks")
      .replace(/#NuestrosBeneficios/gi, "#benefits")
      .replace(/#preguntasFrecuentes/gi, "#faq")
      .replace(/#contacto/gi, "#contact");
    const absoluteProjectPath = href.startsWith("/");
    const url = absoluteProjectPath ? resolveProjectUrl(href) : new URL(href, window.location.href).href;
    return withSettings(url);
  }

  function rewriteLinks() {
    document.querySelectorAll("a[href]").forEach((anchor) => {
      const original = anchor.dataset.originalHref || anchor.getAttribute("href");
      anchor.dataset.originalHref = original;
      const repaired = repairHref(original);
      if (repaired) anchor.href = repaired;
      const originalLabel = normalize(originalText.get([...anchor.childNodes].find((n) => n.nodeType === Node.TEXT_NODE)) || anchor.textContent);
      if (["Cerrar sesión", "Sign out"].includes(originalLabel)) {
        anchor.addEventListener("click", () => localStorage.removeItem(KEYS.session), { once: true });
      }
    });
  }

  function injectDock() {
    if (document.querySelector(".app-settings-dock")) return;
    const skip = document.createElement("a");
    skip.className = "app-skip-link";
    skip.href = "#main-content";
    skip.textContent = language === "en" ? "Skip to main content" : "Saltar al contenido principal";
    document.body.prepend(skip);
    const main = document.querySelector("main");
    if (main && !main.id) main.id = "main-content";

    const dock = document.createElement("div");
    dock.className = "app-settings-dock";
    dock.setAttribute("role", "group");
    dock.setAttribute("aria-label", language === "en" ? "Display options" : "Opciones de visualización");
    dock.innerHTML = `
      <select id="appLanguage" aria-label="Language">
        <option value="es">ES · Español</option>
        <option value="en">EN · English</option>
      </select>
      <button id="appTheme" type="button" aria-label="Theme"><i class="fa-solid fa-moon" aria-hidden="true"></i></button>
      <button id="appTextSize" type="button" aria-label="Text size">A+</button>
      <button id="appContrast" type="button" aria-label="High contrast"><i class="fa-solid fa-circle-half-stroke" aria-hidden="true"></i></button>`;
    document.body.append(dock);

    dock.querySelector("#appLanguage").addEventListener("change", (event) => applyLanguage(event.target.value));
    dock.querySelector("#appTheme").addEventListener("click", () => applyTheme(theme === "dark" ? "light" : "dark"));
    dock.querySelector("#appTextSize").addEventListener("click", () => {
      const current = Number(localStorage.getItem(KEYS.textScale) || 1);
      const next = current >= 1.2 ? 1 : current + .1;
      localStorage.setItem(KEYS.textScale, String(next));
      applyAccessibility();
      showToast(language === "en" ? "Text size updated." : "Tamaño de texto actualizado.", "success");
    });
    dock.querySelector("#appContrast").addEventListener("click", () => {
      const next = localStorage.getItem(KEYS.highContrast) !== "true";
      localStorage.setItem(KEYS.highContrast, String(next));
      applyAccessibility();
      showToast(language === "en" ? "Contrast setting updated." : "Contraste actualizado.", "success");
    });
    updateDock();
  }

  function updateDock() {
    const dock = document.querySelector(".app-settings-dock");
    if (dock) dock.setAttribute("aria-label", language === "en" ? "Display options" : "Opciones de visualización");
    const selector = document.getElementById("appLanguage");
    if (selector) {
      selector.value = language;
      selector.setAttribute("aria-label", language === "en" ? "Language" : "Idioma");
      const esOption = selector.querySelector('option[value="es"]');
      const enOption = selector.querySelector('option[value="en"]');
      if (esOption) esOption.textContent = language === "en" ? "ES · Spanish" : "ES · Español";
      if (enOption) enOption.textContent = language === "en" ? "EN · English" : "EN · Inglés";
    }
    const themeButton = document.getElementById("appTheme");
    if (themeButton) {
      themeButton.innerHTML = theme === "dark"
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
      themeButton.setAttribute("aria-label", language === "en"
        ? (theme === "dark" ? "Enable light mode" : "Enable dark mode")
        : (theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"));
    }
    const textButton = document.getElementById("appTextSize");
    if (textButton) textButton.setAttribute("aria-label", language === "en" ? "Change text size" : "Cambiar tamaño de texto");
    const contrastButton = document.getElementById("appContrast");
    if (contrastButton) {
      const active = document.documentElement.dataset.highContrast === "true";
      contrastButton.setAttribute("aria-label", language === "en"
        ? (active ? "Disable high contrast" : "Enable high contrast")
        : (active ? "Desactivar alto contraste" : "Activar alto contraste"));
    }
    const skip = document.querySelector(".app-skip-link");
    if (skip) skip.textContent = language === "en" ? "Skip to main content" : "Saltar al contenido principal";
  }

  function toastRegion() {
    let region = document.querySelector(".app-toast-region");
    if (!region) {
      region = document.createElement("div");
      region.className = "app-toast-region";
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "false");
      document.body.append(region);
    }
    return region;
  }

  function showToast(message, type = "info", duration = 3600) {
    const toast = document.createElement("div");
    toast.className = "app-toast";
    toast.dataset.type = type;
    const icon = type === "success" ? "circle-check" : type === "error" ? "circle-exclamation" : type === "warning" ? "triangle-exclamation" : "circle-info";
    toast.innerHTML = `<i class="fa-solid fa-${icon}" aria-hidden="true"></i><div>${message}</div><button type="button" aria-label="${language === "en" ? "Close" : "Cerrar"}">×</button>`;
    const remove = () => toast.remove();
    toast.querySelector("button").addEventListener("click", remove);
    toastRegion().append(toast);
    window.setTimeout(remove, duration);
    return toast;
  }

  function showDialog({ title, html, actions = [] }) {
    const previousFocus = document.activeElement;
    const backdrop = document.createElement("div");
    backdrop.className = "app-dialog-backdrop";
    backdrop.innerHTML = `<section class="app-dialog" role="dialog" aria-modal="true" aria-labelledby="appDialogTitle">
      <div class="app-dialog-header"><h2 class="app-dialog-title" id="appDialogTitle"></h2><button class="app-dialog-close" type="button" aria-label="${language === "en" ? "Close" : "Cerrar"}">×</button></div>
      <div class="app-dialog-body"></div><div class="app-dialog-actions"></div></section>`;
    backdrop.querySelector(".app-dialog-title").textContent = title;
    backdrop.querySelector(".app-dialog-body").innerHTML = html;
    const close = () => { backdrop.remove(); previousFocus?.focus?.(); };
    backdrop.querySelector(".app-dialog-close").addEventListener("click", close);
    backdrop.addEventListener("click", (event) => { if (event.target === backdrop) close(); });
    const actionArea = backdrop.querySelector(".app-dialog-actions");
    actions.forEach((action) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = action.label;
      if (action.secondary) button.classList.add("secondary");
      button.addEventListener("click", () => { const result = action.onClick?.(backdrop); if (result !== false) close(); });
      actionArea.append(button);
    });
    if (!actions.length) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = language === "en" ? "Close" : "Cerrar";
      button.addEventListener("click", close);
      actionArea.append(button);
    }
    document.body.append(backdrop);
    backdrop.querySelector(".app-dialog-close").focus();
    const escapeHandler = (event) => { if (event.key === "Escape" && document.body.contains(backdrop)) { close(); document.removeEventListener("keydown", escapeHandler); } };
    document.addEventListener("keydown", escapeHandler);
    return backdrop;
  }

  function navigate(path) {
    window.location.href = withSettings(path.startsWith("/") ? resolveProjectUrl(path) : path);
  }

  function t(es, en) { return language === "en" ? en : es; }

  function setupDropdowns() {
    document.querySelectorAll(".usuario").forEach((container) => {
      const trigger = container.querySelector(".usuario-info");
      const dropdown = container.querySelector(".dropdown");
      if (!trigger || !dropdown) return;
      trigger.tabIndex = 0;
      trigger.setAttribute("role", "button");
      trigger.setAttribute("aria-expanded", "false");
      const toggle = () => {
        const isOpen = dropdown.classList.toggle("app-dropdown-open");
        dropdown.style.display = isOpen ? "block" : "none";
        trigger.setAttribute("aria-expanded", String(isOpen));
      };
      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", (event) => { if (["Enter", " "].includes(event.key)) { event.preventDefault(); toggle(); } });
    });
  }

  function setupLinkActions() {
    document.querySelectorAll('a[href="#"]').forEach((anchor) => {
      const label = normalize(anchor.textContent);
      if (["Configuración", "Settings"].includes(label)) {
        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          showDialog({
            title: t("Configuración", "Settings"),
            html: `<p>${t("El idioma, el tema y la accesibilidad se guardan automáticamente para todas las pantallas.", "Language, theme, and accessibility settings are automatically saved across all screens.")}</p>
              <div class="app-inline-actions"><button type="button" data-action="toggle-motion">${t("Reducir movimiento", "Reduce motion")}</button><button type="button" data-action="reset-accessibility">${t("Restablecer accesibilidad", "Reset accessibility")}</button></div>`,
            actions: [{ label: t("Listo", "Done") }]
          });
          const modal = document.querySelector(".app-dialog-backdrop:last-of-type");
          modal?.querySelector('[data-action="toggle-motion"]')?.addEventListener("click", () => {
            const next = localStorage.getItem(KEYS.reducedMotion) !== "true";
            localStorage.setItem(KEYS.reducedMotion, String(next)); applyAccessibility();
          });
          modal?.querySelector('[data-action="reset-accessibility"]')?.addEventListener("click", () => {
            [KEYS.textScale, KEYS.highContrast, KEYS.reducedMotion].forEach((key) => localStorage.removeItem(key)); applyAccessibility();
          });
        });
      }
    });
  }

  function observeDynamicContent() {
    const observer = new MutationObserver(() => {
      window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(() => {
        translateNode(document.body);
        rewriteLinks();
      }, 30);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function initialize() {
    readSettings();
    syncThemeClasses();
    applyAccessibility();
    injectDock();
    applyLanguage(language);
    rewriteLinks();
    setupDropdowns();
    setupLinkActions();
    observeDynamicContent();
    window.addEventListener("storage", (event) => {
      if (event.key === KEYS.language && event.newValue) applyLanguage(event.newValue);
      if (event.key === KEYS.theme && event.newValue) applyTheme(event.newValue);
    });
  }

  window.PostureApp = {
    keys: KEYS,
    get language() { return language; },
    get theme() { return theme; },
    t,
    applyLanguage,
    applyTheme,
    applyAccessibility,
    withSettings,
    resolveProjectUrl,
    navigate,
    showToast,
    showDialog,
    translate: () => translateNode(document.body),
    rewriteLinks
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
