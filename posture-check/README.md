# Posture-Check

Static academic prototype implemented with HTML, CSS, and basic JavaScript.

## Run locally

Open `index.html` or serve the project with a local web server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Demo accounts

All demo accounts use the password `Demo1234567!`.

- Student: `estudiante@posturecheck.com`
- Remote worker: `trabajador@posturecheck.com`
- Gamer: `gamer@posturecheck.com`

The registration form also creates local demo accounts and routes users to the selected segment.

## Shared preferences

The following settings persist across the Landing Page, authentication screen, dashboards, monitoring screens, and profiles:

- Spanish / English language
- Light / dark theme
- Text size
- High contrast
- Reduced motion

Preferences are stored in `localStorage` and are also propagated through URL parameters as a fallback when navigating between pages.

## Functional demo flows

Each segment includes:

- Registration and sign-in
- Dashboard shortcuts and saved configuration
- Monitoring simulation with camera access or demo fallback
- Session timer, posture percentage, alerts, active breaks, and history
- Profile editing and persistent preferences
- Accessible dialogs, feedback toasts, keyboard focus, and responsive layouts

## Visibility update
- The decorative step numbers 01, 02 and 03 have stronger visibility in light mode.
- The combination of dark mode and high contrast now uses a dedicated dark palette with white text, visible borders and distinct state colors.
- Existing icons and the original visual composition were preserved.

## Cámara y análisis postural

Para probar la cámara, abra el proyecto mediante GitHub Pages, HTTPS o un servidor local como Live Server. El monitoreo utiliza la cámara del navegador y MediaPipe Pose Landmarker para estimar la alineación de cabeza, hombros y torso. La estimación es orientativa y no reemplaza una evaluación profesional.
