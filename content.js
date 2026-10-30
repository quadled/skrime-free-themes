// =====================================================================
// SKRIME THEMES v3
// Aufbau: 1. Themes  2. Basis-CSS (+ Landingpage)  3. Theme-Spezial-CSS  4. Effekte
//         5. Theme laden  6. Auswahl-Modal (überall)  7. Sidebar-Button "Themes verwalten"
//         8. Credit unter dem Logo
// =====================================================================

// 1. Built-In Themes (Fallback-Themes, falls offline oder GitHub nicht erreichbar)
const builtInThemes = {
    "dracula": {
        name: "Dracula Theme",
        icon: "fa-ghost",
        effect: null,
        vars: "--ext-bg-main: #1e1f29; --ext-bg-card: #282a36; --ext-border: #44475a; --ext-text: #f8f8f2; --ext-text-muted: #9aa7d6; --ext-accent: #ff79c6; --ext-accent-text: #1e1f29; --ext-accent2: #bd93f9; --ext-accent3: #8be9fd; --ext-glow: rgba(189, 147, 249, 0.4);",
        preview: { bg1: "#282a36", bg2: "#1e1f29", accent: "#ff79c6", accent2: "#bd93f9", text: "#f8f8f2" }
    },
    "matrix": {
        name: "Matrix Theme",
        icon: "fa-bug",
        effect: "matrix",
        vars: "--ext-bg-main: #010603; --ext-bg-card: #031208; --ext-border: #0f5a1f; --ext-text: #8dffa8; --ext-text-muted: #2fa24f; --ext-accent: #00ff41; --ext-accent-text: #001a07; --ext-glow: rgba(0, 255, 65, 0.35);",
        preview: { bg1: "#031208", bg2: "#000000", accent: "#00ff41", accent2: "#008f11", text: "#8dffa8" }
    },
    "cyberpunk": {
        name: "Cyberpunk",
        icon: "fa-bolt",
        effect: null,
        vars: "--ext-bg-main: #0a0a14; --ext-bg-card: #12121f; --ext-border: #5b2a86; --ext-text: #e8f9ff; --ext-text-muted: #8ea0ff; --ext-accent: #ff2bd6; --ext-accent-text: #ffffff; --ext-accent2: #00f0ff; --ext-accent3: #fcee0a; --ext-glow: rgba(255, 43, 214, 0.45);",
        preview: { bg1: "#1a0f2e", bg2: "#0a0a14", accent: "#ff2bd6", accent2: "#00f0ff", text: "#e8f9ff" }
    },
    "christmas": {
        name: "Winter Theme",
        icon: "fa-snowflake",
        effect: "snow",
        vars: "--ext-bg-main: #07111f; --ext-bg-card: #0f2238; --ext-border: #2b5c88; --ext-text: #eaf6ff; --ext-text-muted: #8fb8d6; --ext-accent: #7fd4ff; --ext-accent-text: #05172a; --ext-glow: rgba(127, 212, 255, 0.35);",
        preview: { bg1: "#16365a", bg2: "#07111f", accent: "#7fd4ff", accent2: "#eaf6ff", text: "#eaf6ff" }
    },
    "silvester": {
        name: "Silvester Theme",
        icon: "fa-champagne-glasses",
        effect: "fireworks",
        vars: "--ext-bg-main: #070a16; --ext-bg-card: #0f1428; --ext-border: #6b5a2a; --ext-text: #fff6dc; --ext-text-muted: #b9ae8c; --ext-accent: #ffd54a; --ext-accent-text: #1a1300; --ext-accent2: #ff4fa3; --ext-accent3: #00e5ff; --ext-glow: rgba(255, 213, 74, 0.4);",
        preview: { bg1: "#1a1633", bg2: "#070a16", accent: "#ffd54a", accent2: "#ff4fa3", text: "#fff6dc" }
    },
    "halloween": {
        name: "Halloween Theme",
        icon: "fa-pumpkin",
        effect: "halloween",
        vars: "--ext-bg-main: #0d0a12; --ext-bg-card: #1a1220; --ext-border: #5a3414; --ext-text: #ffe9d2; --ext-text-muted: #b79a86; --ext-accent: #ff7a1a; --ext-accent-text: #1a0a00; --ext-accent2: #9b5de5; --ext-accent3: #7cff4d; --ext-glow: rgba(255, 122, 26, 0.4);",
        preview: { bg1: "#2a1238", bg2: "#0d0a12", accent: "#ff7a1a", accent2: "#9b5de5", text: "#ffe9d2" }
    },
    "aprilscherz": {
        name: "April, April!",
        icon: "fa-face-grin-wink",
        effect: "aprilfools",
        vars: "--ext-bg-main: #39ff14; --ext-bg-card: #ff69b4; --ext-border: #ff8800; --ext-text: #ffff00; --ext-text-muted: #ff00ff; --ext-accent: #00ffff; --ext-accent-text: #ff0000; --ext-accent2: #ff0000; --ext-accent3: #0000ff; --ext-glow: rgba(255, 0, 255, 0.7);",
        preview: { bg1: "#39ff14", bg2: "#ff69b4", accent: "#00ffff", accent2: "#ff00ff", text: "#ffff00" }
    },
    "kartoffel": {
        name: "Kartoffel Theme",
        icon: "fa-seedling",
        effect: "potato",
        vars: "--ext-bg-main: #1a120a; --ext-bg-card: #2a1d11; --ext-border: #6b4a2b; --ext-text: #fff1d0; --ext-text-muted: #c2a77a; --ext-accent: #d9a441; --ext-accent-text: #2a1a05; --ext-accent2: #8b5a2b; --ext-accent3: #f0d56a; --ext-glow: rgba(217, 164, 65, 0.4);",
        preview: { bg1: "#3a2814", bg2: "#1a120a", accent: "#d9a441", accent2: "#8b5a2b", text: "#fff1d0" }
    },
    "minimal-purple": {
        name: "Minimal Purple",
        icon: "fa-palette",
        effect: null,
        vars: "--ext-bg-main: #121212; --ext-bg-card: #1e1e1e; --ext-border: #333333; --ext-text: #e0e0e0; --ext-text-muted: #9aa7d6; --ext-accent: #bb86fc; --ext-accent-text: #121212; --ext-accent2: #3700b3; --ext-glow: rgba(187, 134, 252, 0.4);",
        preview: { bg1: "#1e1e1e", bg2: "#121212", accent: "#bb86fc", accent2: "#3700b3", text: "#e0e0e0" }
    },
    "default": {
        name: "Skrime Standard",
        icon: "fa-xmark",
        effect: null,
        vars: "",
        preview: { bg1: "#1e1e1e", bg2: "#15171C", accent: "#6c757d", accent2: "#ffffff", text: "#ffffff" }
    }
};

// Dynamische Theme-Sammlung (wird mit GitHub-Themes aus storage erweitert)
let customThemes = Object.assign({}, builtInThemes);

// 2. Basis-CSS: wendet die Variablen auf die Skrime-Elemente an
const baseCSS = `
/* Wir wenden das Design nur an, wenn ein Theme aktiv ist */
body.ext-theme-active, 
body.ext-theme-active .page-content, 
body.ext-theme-active .bg-light,
body.ext-theme-active main { 
    background-color: var(--ext-bg-main) !important; 
    color: var(--ext-text) !important; 
}

/* Karten, Sidebar, Header und Modals anpassen */
body.ext-theme-active .card:not([style*="background-image"]), 
body.ext-theme-active .features:not([style*="background-image"]), 
body.ext-theme-active .sidebar-wrapper, 
body.ext-theme-active .header-bar, 
body.ext-theme-active .top-header,
body.ext-theme-active .dropdown-menu,
body.ext-theme-active .list-group-item:not([style*="background-image"]),
body.ext-theme-active .modal-content,
body.ext-theme-active .modal-header { 
    background-color: var(--ext-bg-card) !important; 
    border-color: var(--ext-border) !important; 
    background-image: none !important; 
}

/* BILDER (Domains & Banner) IN THEME-FARBE EINFÄRBEN */
body.ext-theme-active div[style*="background-image"] {
    background-color: var(--ext-accent) !important;
    background-blend-mode: multiply !important; 
    border-color: var(--ext-border) !important;
}

/* Weiße Texte (z.B. Discord Banner) schützen */
body.ext-theme-active .text-white { color: #ffffff !important; }
body.ext-theme-active .text-white-50 { color: rgba(255, 255, 255, 0.6) !important; }
body.ext-theme-active h1.text-white { color: #ffffff !important; }

/* Texte, Überschriften und Links */
body.ext-theme-active h1, body.ext-theme-active h2, body.ext-theme-active h3, 
body.ext-theme-active h4, body.ext-theme-active h5, body.ext-theme-active h6,
body.ext-theme-active .list-group-item span,
body.ext-theme-active .modal-title { 
    color: var(--ext-text) !important; 
}

body.ext-theme-active a { color: var(--ext-accent) !important; }
body.ext-theme-active .text-muted { color: var(--ext-text-muted) !important; }

/* Tabs (inaktiv) */
body.ext-theme-active .nav-pills .nav-link { 
    background-color: var(--ext-bg-card) !important; 
    border: 1px solid var(--ext-border) !important; 
}
body.ext-theme-active .nav-pills .nav-link h6 {
    color: var(--ext-text) !important;
}

/* Tabs (aktiv) */
body.ext-theme-active .nav-pills .nav-link.active { 
    background-color: var(--ext-accent) !important; 
    border-color: var(--ext-accent) !important; 
}
body.ext-theme-active .nav-pills .nav-link.active h6,
body.ext-theme-active .nav-pills .nav-link.active i,
body.ext-theme-active .nav-pills .nav-link.active span { 
    color: var(--ext-accent-text) !important; 
    --fa-primary-color: var(--ext-accent-text) !important;
    --fa-secondary-color: var(--ext-accent-text) !important;
}

/* Alle Buttons: Grundregel weißer Text */
body.ext-theme-active .btn {
    color: #ffffff !important;
}

/* Akzent-Buttons */
body.ext-theme-active .btn-primary,
body.ext-theme-active .btn-success,
body.ext-theme-active .btn-info { 
    background-color: var(--ext-accent) !important; 
    border-color: var(--ext-accent) !important; 
    color: var(--ext-accent-text) !important; 
}

/* Danger & Warning bleiben rot/gelb mit weißem Text */
body.ext-theme-active .btn-danger,
body.ext-theme-active .btn-warning {
    color: #ffffff !important;
}
body.ext-theme-active .btn-danger *,
body.ext-theme-active .btn-warning * {
    color: #ffffff !important;
    --fa-primary-color: #ffffff !important;
    --fa-secondary-color: #ffffff !important;
    --fa-secondary-opacity: 0.8 !important;
}

/* Sidebar Icons und aktiver Menüpunkt */
body.ext-theme-active .sidebar-menu li.active > a, 
body.ext-theme-active .sidebar-menu i { 
    color: var(--ext-accent) !important; 
}

/* Alle FontAwesome Icons in Theme-Farbe */
body.ext-theme-active i[class*="fa-"] {
    color: var(--ext-accent) !important;
    --fa-primary-color: var(--ext-accent) !important;
    --fa-secondary-color: var(--ext-text) !important;
    --fa-secondary-opacity: 0.4 !important;
}

/* Icons in Buttons passen sich dem Button-Text an */
body.ext-theme-active .btn i[class*="fa-"] {
    color: inherit !important;
    --fa-primary-color: inherit !important;
    --fa-secondary-color: inherit !important;
    --fa-secondary-opacity: 0.9 !important;
}

/* Burger Menu Button und Modal Schließen (X) */
body.ext-theme-active #close-sidebar i,
body.ext-theme-active .btn-icon i,
body.ext-theme-active .btn-close i {
     color: var(--ext-accent) !important;
     --fa-primary-color: var(--ext-accent) !important;
     --fa-secondary-color: var(--ext-accent) !important;
     --fa-secondary-opacity: 1 !important;
}

/* Icons in umgefärbten Buttons müssen dunkel/kontrastreich sein */
body.ext-theme-active .btn-primary i[class*="fa-"],
body.ext-theme-active .btn-success i[class*="fa-"],
body.ext-theme-active .btn-info i[class*="fa-"],
body.ext-theme-active .nav-pills .nav-link.active i[class*="fa-"] {
    color: var(--ext-accent-text) !important;
    --fa-primary-color: var(--ext-accent-text) !important;
    --fa-secondary-color: var(--ext-accent-text) !important;
    --fa-secondary-opacity: 0.7 !important;
}

/* Logo-Färbung mit Drop-Shadow-Trick */
body.ext-theme-active .sidebar-brand a,
body.ext-theme-active .logo-icon {
    overflow: hidden !important; 
    display: flex !important;
    align-items: center;
}

body.ext-theme-active .sidebar-brand img,
body.ext-theme-active .logo-icon img {
    opacity: 1 !important; 
    transform: translateX(-500px) !important; 
    filter: drop-shadow(500px 0 0 var(--ext-accent)) !important; 
}

body.ext-theme-active .sidebar-brand a::after,
body.ext-theme-active .logo-icon::after {
    display: none !important;
}
`;

// 2b. Landingpage (Startseite skrime.eu): Header, Hero, Sektionen, Footer, Cookie-Popup.
// Nutzt nur die Theme-Variablen, passt sich also jedem Theme automatisch an.
const landingCSS = `
/* Sektionen durchsichtig, damit der Theme-Hintergrund (Verläufe, Raster) durchscheint */
body.ext-theme-active .section:not(.bg-light),
body.ext-theme-active .bg-home,
body.ext-theme-active .bg-soft-primary {
    background-color: transparent !important;
}
body.ext-theme-active .section.bg-light {
    background-color: color-mix(in srgb, var(--ext-bg-card) 45%, transparent) !important;
    border-top: 1px solid color-mix(in srgb, var(--ext-border) 55%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--ext-border) 55%, transparent);
}

/* Hero: Farbschimmer in Akzentfarbe statt Standard-Verlauf, schwebende Quadrate eingefärbt */
body.ext-theme-active .bg-overlay {
    background-color: transparent !important;
    background-image: radial-gradient(ellipse 70% 60% at 20% 30%, color-mix(in srgb, var(--ext-accent) 28%, transparent), transparent 70%) !important;
    opacity: 1 !important;
}
body.ext-theme-active .circles li {
    background: color-mix(in srgb, var(--ext-accent) 18%, transparent) !important;
}

/* Texte */
body.ext-theme-active .text-dark { color: var(--ext-text) !important; }
body.ext-theme-active .text-primary { color: var(--ext-accent) !important; }
body.ext-theme-active .text-foot { color: var(--ext-text-muted) !important; }

/* Header / Navigation */
body.ext-theme-active #topnav,
body.ext-theme-active #topnav.nav-sticky,
body.ext-theme-active #topnav.sticky {
    background-color: color-mix(in srgb, var(--ext-bg-main) 88%, transparent) !important;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--ext-border);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25) !important;
}
body.ext-theme-active #topnav .navigation-menu > li > a,
body.ext-theme-active #topnav .navigation-menu .submenu li a {
    color: var(--ext-text) !important;
}
body.ext-theme-active #topnav .navigation-menu > li:hover > a,
body.ext-theme-active #topnav .navigation-menu > li.active > a,
body.ext-theme-active #topnav .navigation-menu .submenu li a:hover {
    color: var(--ext-accent) !important;
}
body.ext-theme-active #topnav .navigation-menu .submenu {
    background-color: var(--ext-bg-card) !important;
    border: 1px solid var(--ext-border);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
}
body.ext-theme-active #topnav .menu-arrow,
body.ext-theme-active #topnav .submenu-arrow {
    border-color: var(--ext-text-muted) !important;
}
body.ext-theme-active #topnav .navbar-toggle .lines span {
    background-color: var(--ext-accent) !important;
}
@media (max-width: 991px) {
    body.ext-theme-active #navigation { background-color: var(--ext-bg-card) !important; }
}

/* Feature-Kacheln: Icon-Blasen in Akzentfarbe */
body.ext-theme-active .features .icon,
body.ext-theme-active .features .icons {
    background-color: color-mix(in srgb, var(--ext-accent) 16%, transparent) !important;
    border: 1px solid color-mix(in srgb, var(--ext-accent) 40%, transparent);
}

/* Outline-Buttons (z.B. "Ablehnen" im Cookie-Popup) */
body.ext-theme-active .btn-outline-primary {
    background-color: transparent !important;
    border: 1px solid var(--ext-accent) !important;
    color: var(--ext-accent) !important;
}
body.ext-theme-active .btn-outline-primary:hover {
    background-color: var(--ext-accent) !important;
    color: var(--ext-accent-text) !important;
}

/* Cookie-Popup und Cookie-Button unten rechts */
body.ext-theme-active .cookie-popup { box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); }
body.ext-theme-active .cookie-popup .card-footer {
    background: transparent !important;
    border-top: 1px solid var(--ext-border) !important;
}
body.ext-theme-active .form-check-input:checked {
    background-color: var(--ext-accent) !important;
    border-color: var(--ext-accent) !important;
}
body.ext-theme-active .back-to-top {
    background-color: var(--ext-accent) !important;
    border-color: var(--ext-accent) !important;
}
body.ext-theme-active .back-to-top i[class*="fa-"] {
    color: var(--ext-accent-text) !important;
    --fa-primary-color: var(--ext-accent-text) !important;
    --fa-secondary-color: var(--ext-accent-text) !important;
    filter: none !important;
}

/* Footer */
body.ext-theme-active .footer,
body.ext-theme-active .footer-border {
    background-color: color-mix(in srgb, var(--ext-bg-main) 75%, #000) !important;
    border-color: var(--ext-border) !important;
}
body.ext-theme-active .footer { border-top: 1px solid var(--ext-border) !important; }
body.ext-theme-active .footer p,
body.ext-theme-active .footer .fw-bold { color: var(--ext-text) !important; }
body.ext-theme-active .footer a { color: var(--ext-text-muted) !important; }
body.ext-theme-active .footer a:hover { color: var(--ext-accent) !important; }
`;

// 3. Spezial-CSS pro Theme (kommt NACH baseCSS und überschreibt es gezielt)
const builtInThemeCSS = {

// ---------------------------------------------------------------------
// DRACULA: Pink/Lila-Verlauf, dunkle Karten mit Lila-Kante, Cyan-Icons
// ---------------------------------------------------------------------
dracula: `
body.ext-theme-dracula,
body.ext-theme-dracula main,
body.ext-theme-dracula .page-content {
    background-image:
        radial-gradient(ellipse 60% 40% at 0% 0%, rgba(189, 147, 249, 0.16), transparent 70%),
        radial-gradient(ellipse 50% 40% at 100% 100%, rgba(255, 121, 198, 0.12), transparent 70%) !important;
    background-attachment: fixed !important;
}

body.ext-theme-active.ext-theme-dracula .card:not([style*="background-image"]),
body.ext-theme-active.ext-theme-dracula .features:not([style*="background-image"]),
body.ext-theme-active.ext-theme-dracula .list-group-item:not([style*="background-image"]),
body.ext-theme-active.ext-theme-dracula .dropdown-menu,
body.ext-theme-active.ext-theme-dracula .modal-content {
    border: 1px solid #44475a !important;
    box-shadow: inset 0 2px 0 rgba(189, 147, 249, 0.55), 0 6px 22px rgba(0, 0, 0, 0.35);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
body.ext-theme-active.ext-theme-dracula .card:not([style*="background-image"]):hover {
    border-color: #bd93f9 !important;
    box-shadow: inset 0 2px 0 #ff79c6, 0 0 20px var(--ext-glow), 0 6px 22px rgba(0, 0, 0, 0.35);
}

body.ext-theme-active.ext-theme-dracula .sidebar-wrapper {
    background-color: #191a21 !important;
    border-right: 1px solid #44475a !important;
}
body.ext-theme-active.ext-theme-dracula .header-bar,
body.ext-theme-active.ext-theme-dracula .top-header {
    background-color: rgba(25, 26, 33, 0.9) !important;
    border-bottom: 1px solid #44475a !important;
}
body.ext-theme-active.ext-theme-dracula .sidebar-menu li.active > a {
    background: linear-gradient(90deg, rgba(255, 121, 198, 0.18), transparent) !important;
    box-shadow: inset 3px 0 0 #ff79c6;
}

body.ext-theme-active.ext-theme-dracula .btn-primary,
body.ext-theme-active.ext-theme-dracula .btn-success,
body.ext-theme-active.ext-theme-dracula .btn-info,
body.ext-theme-active.ext-theme-dracula .nav-pills .nav-link.active {
    background-image: linear-gradient(135deg, #ff79c6 0%, #bd93f9 100%) !important;
    border: none !important;
    transition: box-shadow 0.2s ease, filter 0.2s ease;
}
body.ext-theme-active.ext-theme-dracula .btn-primary:hover,
body.ext-theme-active.ext-theme-dracula .btn-success:hover,
body.ext-theme-active.ext-theme-dracula .btn-info:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 18px var(--ext-glow);
}

body.ext-theme-active.ext-theme-dracula a:hover { color: #8be9fd !important; }

/* Duotone-Icons: Pink + Cyan */
body.ext-theme-active.ext-theme-dracula i[class*="fa-"]:not(.btn i) {
    --fa-secondary-color: #8be9fd !important;
    --fa-secondary-opacity: 0.85 !important;
}

body.ext-theme-dracula ::-webkit-scrollbar { width: 10px; }
body.ext-theme-dracula ::-webkit-scrollbar-track { background: #191a21; }
body.ext-theme-dracula ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #ff79c6, #bd93f9); border-radius: 6px; }
body.ext-theme-dracula ::selection { background: rgba(189, 147, 249, 0.45); color: #fff; }
`,

// ---------------------------------------------------------------------
// MATRIX: Terminal-Look, Monospace, Neon-Grün, CRT-Scanlines, Code-Regen
// ---------------------------------------------------------------------
matrix: `
body.ext-theme-matrix :is(body, p, h1, h2, h3, h4, h5, h6, a, span, small, label, td, th, li, input, button, textarea, select, .btn) {
    font-family: "Cascadia Mono", "Fira Code", Consolas, "Courier New", monospace !important;
}

body.ext-theme-matrix h1, body.ext-theme-matrix h2, body.ext-theme-matrix h3,
body.ext-theme-matrix h4, body.ext-theme-matrix h5, body.ext-theme-matrix h6,
body.ext-theme-active.ext-theme-matrix a {
    text-shadow: 0 0 8px rgba(0, 255, 65, 0.5);
}

body.ext-theme-active.ext-theme-matrix .card:not([style*="background-image"]),
body.ext-theme-active.ext-theme-matrix .features:not([style*="background-image"]),
body.ext-theme-active.ext-theme-matrix .list-group-item:not([style*="background-image"]),
body.ext-theme-active.ext-theme-matrix .dropdown-menu,
body.ext-theme-active.ext-theme-matrix .modal-content {
    background-color: rgba(2, 14, 6, 0.8) !important;
    border: 1px solid #0f5a1f !important;
    border-radius: 2px !important;
    box-shadow: 0 0 12px rgba(0, 255, 65, 0.12), inset 0 0 24px rgba(0, 255, 65, 0.04);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
body.ext-theme-active.ext-theme-matrix .card:not([style*="background-image"]):hover {
    border-color: #00ff41 !important;
    box-shadow: 0 0 20px var(--ext-glow), inset 0 0 24px rgba(0, 255, 65, 0.08);
}

body.ext-theme-active.ext-theme-matrix .sidebar-wrapper {
    background-color: #000000 !important;
    border-right: 1px solid #0f5a1f !important;
}
body.ext-theme-active.ext-theme-matrix .header-bar,
body.ext-theme-active.ext-theme-matrix .top-header {
    background-color: rgba(0, 0, 0, 0.9) !important;
    border-bottom: 1px solid #0f5a1f !important;
}
body.ext-theme-active.ext-theme-matrix .sidebar-menu li.active > a {
    background: rgba(0, 255, 65, 0.1) !important;
    box-shadow: inset 3px 0 0 #00ff41;
    text-shadow: 0 0 8px #00ff41;
}

/* Buttons: Umriss, beim Hover gefüllt (wie ein Terminal-Prompt) */
body.ext-theme-active.ext-theme-matrix .btn-primary,
body.ext-theme-active.ext-theme-matrix .btn-success,
body.ext-theme-active.ext-theme-matrix .btn-info {
    background-color: transparent !important;
    border: 1px solid #00ff41 !important;
    color: #00ff41 !important;
    border-radius: 2px !important;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.25), inset 0 0 10px rgba(0, 255, 65, 0.1);
    transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}
body.ext-theme-active.ext-theme-matrix .btn-primary:hover,
body.ext-theme-active.ext-theme-matrix .btn-success:hover,
body.ext-theme-active.ext-theme-matrix .btn-info:hover {
    background-color: #00ff41 !important;
    color: #001a07 !important;
    box-shadow: 0 0 22px rgba(0, 255, 65, 0.6);
}
body.ext-theme-active.ext-theme-matrix .btn-primary i[class*="fa-"],
body.ext-theme-active.ext-theme-matrix .btn-success i[class*="fa-"],
body.ext-theme-active.ext-theme-matrix .btn-info i[class*="fa-"] {
    color: inherit !important;
    --fa-primary-color: currentColor !important;
    --fa-secondary-color: currentColor !important;
}

body.ext-theme-active.ext-theme-matrix .nav-pills .nav-link { border-radius: 2px !important; }
body.ext-theme-active.ext-theme-matrix .nav-pills .nav-link.active { box-shadow: 0 0 14px var(--ext-glow); }

body.ext-theme-active.ext-theme-matrix i[class*="fa-"]:not(.btn i) {
    filter: drop-shadow(0 0 4px rgba(0, 255, 65, 0.6));
}

/* CRT: feine Scanlines + dunkle Ränder */
body.ext-theme-matrix::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    background:
        repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.16) 0, rgba(0, 0, 0, 0.16) 1px, transparent 1px, transparent 3px),
        radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.55) 100%);
}

#ext-matrix-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9997;
    opacity: 0.3;
}

body.ext-theme-matrix ::-webkit-scrollbar { width: 10px; }
body.ext-theme-matrix ::-webkit-scrollbar-track { background: #000; }
body.ext-theme-matrix ::-webkit-scrollbar-thumb { background: #0f5a1f; border: 1px solid #00ff41; }
body.ext-theme-matrix ::selection { background: #00ff41; color: #001a07; }
`,

// ---------------------------------------------------------------------
// CYBERPUNK: Neon-Grid, Magenta + Cyan, abgeschnittene Ecken, Chromatic-Text
// ---------------------------------------------------------------------
cyberpunk: `
body.ext-theme-cyberpunk,
body.ext-theme-cyberpunk main,
body.ext-theme-cyberpunk .page-content {
    background-image:
        linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px),
        radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255, 43, 214, 0.2), transparent 70%),
        radial-gradient(ellipse 70% 40% at 50% 100%, rgba(0, 240, 255, 0.14), transparent 70%) !important;
    background-size: 44px 44px, 44px 44px, 100% 100%, 100% 100% !important;
    background-attachment: fixed !important;
}

body.ext-theme-active.ext-theme-cyberpunk .card:not([style*="background-image"]),
body.ext-theme-active.ext-theme-cyberpunk .features:not([style*="background-image"]),
body.ext-theme-active.ext-theme-cyberpunk .list-group-item:not([style*="background-image"]),
body.ext-theme-active.ext-theme-cyberpunk .dropdown-menu,
body.ext-theme-active.ext-theme-cyberpunk .modal-content {
    background-color: rgba(18, 18, 31, 0.92) !important;
    border: 1px solid rgba(255, 43, 214, 0.35) !important;
    border-left: 3px solid #00f0ff !important;
    border-radius: 0 !important;
    box-shadow: 0 0 18px rgba(255, 43, 214, 0.12);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
body.ext-theme-active.ext-theme-cyberpunk .card:not([style*="background-image"]):hover {
    border-color: #ff2bd6 !important;
    border-left-color: #00f0ff !important;
    box-shadow: 0 0 24px var(--ext-glow), 0 0 40px rgba(0, 240, 255, 0.12);
}

body.ext-theme-active.ext-theme-cyberpunk .sidebar-wrapper {
    background-color: #07070f !important;
    border-right: 1px solid rgba(255, 43, 214, 0.45) !important;
}
body.ext-theme-active.ext-theme-cyberpunk .header-bar,
body.ext-theme-active.ext-theme-cyberpunk .top-header {
    background-color: rgba(7, 7, 15, 0.9) !important;
    border-bottom: 1px solid rgba(0, 240, 255, 0.4) !important;
}
body.ext-theme-active.ext-theme-cyberpunk .sidebar-menu li.active > a {
    color: #00f0ff !important;
    background: linear-gradient(90deg, rgba(0, 240, 255, 0.15), transparent) !important;
    box-shadow: inset 3px 0 0 #00f0ff;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
}

/* Überschriften: leichter Chromatic-Aberration-Effekt */
body.ext-theme-active.ext-theme-cyberpunk h1,
body.ext-theme-active.ext-theme-cyberpunk h2 {
    text-shadow: 2px 0 rgba(0, 240, 255, 0.65), -2px 0 rgba(255, 43, 214, 0.65);
    letter-spacing: 0.02em;
}

body.ext-theme-active.ext-theme-cyberpunk a { color: #00f0ff !important; }
body.ext-theme-active.ext-theme-cyberpunk a:hover { color: #fcee0a !important; }

/* Buttons und aktive Tabs: abgeschnittene Ecken + Magenta-Verlauf */
body.ext-theme-active.ext-theme-cyberpunk .btn-primary,
body.ext-theme-active.ext-theme-cyberpunk .btn-success,
body.ext-theme-active.ext-theme-cyberpunk .btn-info,
body.ext-theme-active.ext-theme-cyberpunk .nav-pills .nav-link.active {
    background-image: linear-gradient(135deg, #ff2bd6 0%, #7b2cff 100%) !important;
    border: none !important;
    border-radius: 0 !important;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    letter-spacing: 0.04em;
    transition: filter 0.15s ease;
}
body.ext-theme-active.ext-theme-cyberpunk .btn-primary:hover,
body.ext-theme-active.ext-theme-cyberpunk .btn-success:hover,
body.ext-theme-active.ext-theme-cyberpunk .btn-info:hover {
    filter: brightness(1.2) saturate(1.2);
}
body.ext-theme-active.ext-theme-cyberpunk .nav-pills .nav-link { border-radius: 0 !important; }

/* Duotone-Icons: Magenta + Cyan */
body.ext-theme-active.ext-theme-cyberpunk i[class*="fa-"]:not(.btn i) {
    --fa-secondary-color: #00f0ff !important;
    --fa-secondary-opacity: 0.9 !important;
    filter: drop-shadow(0 0 4px rgba(255, 43, 214, 0.55));
}

/* Feine Cyan-Scanlines */
body.ext-theme-cyberpunk::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    background: repeating-linear-gradient(0deg, rgba(0, 240, 255, 0.035) 0, rgba(0, 240, 255, 0.035) 1px, transparent 1px, transparent 4px);
}

body.ext-theme-cyberpunk ::-webkit-scrollbar { width: 10px; }
body.ext-theme-cyberpunk ::-webkit-scrollbar-track { background: #07070f; }
body.ext-theme-cyberpunk ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #ff2bd6, #00f0ff); }
body.ext-theme-cyberpunk ::selection { background: #ff2bd6; color: #fff; }
`,

// ---------------------------------------------------------------------
// WINTER: Eisblau, Frostglas-Karten, sanfter Schneefall
// ---------------------------------------------------------------------
christmas: `
body.ext-theme-christmas,
body.ext-theme-christmas main,
body.ext-theme-christmas .page-content {
    background-image:
        radial-gradient(ellipse 80% 45% at 50% -10%, rgba(127, 212, 255, 0.18), transparent 70%),
        radial-gradient(ellipse 60% 40% at 100% 100%, rgba(80, 140, 220, 0.12), transparent 70%),
        linear-gradient(180deg, #0a1a2e 0%, #07111f 60%) !important;
    background-attachment: fixed !important;
}

body.ext-theme-active.ext-theme-christmas .card:not([style*="background-image"]),
body.ext-theme-active.ext-theme-christmas .features:not([style*="background-image"]),
body.ext-theme-active.ext-theme-christmas .list-group-item:not([style*="background-image"]),
body.ext-theme-active.ext-theme-christmas .dropdown-menu,
body.ext-theme-active.ext-theme-christmas .modal-content {
    background-color: rgba(15, 34, 56, 0.62) !important;
    -webkit-backdrop-filter: blur(10px) saturate(130%);
    backdrop-filter: blur(10px) saturate(130%);
    border: 1px solid rgba(127, 212, 255, 0.22) !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 8px 24px rgba(0, 0, 0, 0.35);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
body.ext-theme-active.ext-theme-christmas .card:not([style*="background-image"]):hover {
    border-color: rgba(127, 212, 255, 0.55) !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 18px var(--ext-glow), 0 8px 24px rgba(0, 0, 0, 0.35);
}

body.ext-theme-active.ext-theme-christmas .sidebar-wrapper {
    background-color: rgba(6, 15, 28, 0.88) !important;
    border-right: 1px solid rgba(127, 212, 255, 0.2) !important;
}
body.ext-theme-active.ext-theme-christmas .header-bar,
body.ext-theme-active.ext-theme-christmas .top-header {
    background-color: rgba(6, 15, 28, 0.8) !important;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(127, 212, 255, 0.2) !important;
}
body.ext-theme-active.ext-theme-christmas .sidebar-menu li.active > a {
    background: linear-gradient(90deg, rgba(127, 212, 255, 0.16), transparent) !important;
    box-shadow: inset 3px 0 0 #7fd4ff;
}

body.ext-theme-active.ext-theme-christmas .btn-primary,
body.ext-theme-active.ext-theme-christmas .btn-success,
body.ext-theme-active.ext-theme-christmas .btn-info,
body.ext-theme-active.ext-theme-christmas .nav-pills .nav-link.active {
    background-image: linear-gradient(135deg, #b9ecff 0%, #7fd4ff 50%, #4aa8e8 100%) !important;
    border: none !important;
    box-shadow: 0 0 14px var(--ext-glow);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}
body.ext-theme-active.ext-theme-christmas .btn-primary:hover,
body.ext-theme-active.ext-theme-christmas .btn-success:hover,
body.ext-theme-active.ext-theme-christmas .btn-info:hover {
    box-shadow: 0 0 24px rgba(127, 212, 255, 0.6);
    transform: translateY(-1px);
}

body.ext-theme-active.ext-theme-christmas h1,
body.ext-theme-active.ext-theme-christmas h2 {
    text-shadow: 0 0 18px rgba(127, 212, 255, 0.3);
}

body.ext-theme-active.ext-theme-christmas i[class*="fa-"]:not(.btn i) {
    filter: drop-shadow(0 0 4px rgba(127, 212, 255, 0.45));
}

body.ext-theme-christmas ::-webkit-scrollbar { width: 10px; }
body.ext-theme-christmas ::-webkit-scrollbar-track { background: #07111f; }
body.ext-theme-christmas ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #4aa8e8, #2b5c88); border-radius: 6px; }
body.ext-theme-christmas ::selection { background: rgba(127, 212, 255, 0.35); color: #fff; }

#ext-snow-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9999;
}
`,

// ---------------------------------------------------------------------
// SILVESTER: Mitternachtsblau, Gold-Glanz, Pink/Cyan-Funken, Feuerwerk
// ---------------------------------------------------------------------
silvester: `
body.ext-theme-silvester,
body.ext-theme-silvester main,
body.ext-theme-silvester .page-content {
    background-image:
        radial-gradient(ellipse 70% 40% at 50% 110%, rgba(255, 213, 74, 0.22), transparent 70%),
        radial-gradient(ellipse 50% 40% at 0% 0%, rgba(255, 79, 163, 0.14), transparent 70%),
        radial-gradient(ellipse 50% 40% at 100% 0%, rgba(0, 229, 255, 0.10), transparent 70%),
        linear-gradient(180deg, #0b0f24 0%, #070a16 70%) !important;
    background-attachment: fixed !important;
}

body.ext-theme-active.ext-theme-silvester .card:not([style*="background-image"]),
body.ext-theme-active.ext-theme-silvester .features:not([style*="background-image"]),
body.ext-theme-active.ext-theme-silvester .list-group-item:not([style*="background-image"]),
body.ext-theme-active.ext-theme-silvester .dropdown-menu,
body.ext-theme-active.ext-theme-silvester .modal-content {
    background-color: rgba(15, 20, 40, 0.85) !important;
    border: 1px solid rgba(255, 213, 74, 0.28) !important;
    box-shadow: inset 0 2px 0 rgba(255, 213, 74, 0.6), 0 8px 24px rgba(0, 0, 0, 0.4);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
body.ext-theme-active.ext-theme-silvester .card:not([style*="background-image"]):hover {
    border-color: #ffd54a !important;
    box-shadow: inset 0 2px 0 #ff4fa3, 0 0 22px var(--ext-glow), 0 8px 24px rgba(0, 0, 0, 0.4);
}

body.ext-theme-active.ext-theme-silvester .sidebar-wrapper {
    background-color: #050711 !important;
    border-right: 1px solid rgba(255, 213, 74, 0.3) !important;
}
body.ext-theme-active.ext-theme-silvester .header-bar,
body.ext-theme-active.ext-theme-silvester .top-header {
    background-color: rgba(5, 7, 17, 0.88) !important;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 213, 74, 0.3) !important;
}
body.ext-theme-active.ext-theme-silvester .sidebar-menu li.active > a {
    background: linear-gradient(90deg, rgba(255, 213, 74, 0.18), transparent) !important;
    box-shadow: inset 3px 0 0 #ffd54a;
}

/* Gold-Glanz-Buttons */
body.ext-theme-active.ext-theme-silvester .btn-primary,
body.ext-theme-active.ext-theme-silvester .btn-success,
body.ext-theme-active.ext-theme-silvester .btn-info,
body.ext-theme-active.ext-theme-silvester .nav-pills .nav-link.active {
    background-image: linear-gradient(135deg, #fff1a8 0%, #ffd54a 45%, #ff9f1c 100%) !important;
    border: none !important;
    box-shadow: 0 0 14px var(--ext-glow);
    transition: box-shadow 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
body.ext-theme-active.ext-theme-silvester .btn-primary:hover,
body.ext-theme-active.ext-theme-silvester .btn-success:hover,
body.ext-theme-active.ext-theme-silvester .btn-info:hover {
    box-shadow: 0 0 26px rgba(255, 213, 74, 0.65), 0 0 40px rgba(255, 79, 163, 0.25);
    transform: translateY(-1px);
    filter: brightness(1.05);
}

/* Überschriften mit goldenem Funkeln */
body.ext-theme-active.ext-theme-silvester h1,
body.ext-theme-active.ext-theme-silvester h2 {
    text-shadow: 0 0 16px rgba(255, 213, 74, 0.45), 0 0 34px rgba(255, 79, 163, 0.2);
    letter-spacing: 0.02em;
}
body.ext-theme-active.ext-theme-silvester a:hover { color: #ff4fa3 !important; }

/* Duotone-Icons: Gold + Pink */
body.ext-theme-active.ext-theme-silvester i[class*="fa-"]:not(.btn i) {
    --fa-secondary-color: #ff4fa3 !important;
    --fa-secondary-opacity: 0.85 !important;
    filter: drop-shadow(0 0 4px rgba(255, 213, 74, 0.5));
}

body.ext-theme-silvester ::-webkit-scrollbar { width: 10px; }
body.ext-theme-silvester ::-webkit-scrollbar-track { background: #050711; }
body.ext-theme-silvester ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #ffd54a, #ff4fa3); border-radius: 6px; }
body.ext-theme-silvester ::selection { background: rgba(255, 213, 74, 0.4); color: #fff; }

#ext-fireworks-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9997;
    opacity: 0.9;
}
`,

// ---------------------------------------------------------------------
// HALLOWEEN: Kürbis-Orange, Spuk-Lila, Spinnennetz, Nebel, fliegende Fledermäuse
// ---------------------------------------------------------------------
halloween: `
body.ext-theme-halloween,
body.ext-theme-halloween main,
body.ext-theme-halloween .page-content {
    background-image:
        radial-gradient(circle 240px at 88% 12%, rgba(255, 233, 210, 0.10), transparent 70%),
        radial-gradient(ellipse 70% 40% at 50% 110%, rgba(255, 122, 26, 0.18), transparent 70%),
        radial-gradient(ellipse 60% 45% at 0% 100%, rgba(155, 93, 229, 0.16), transparent 70%),
        linear-gradient(180deg, #140c1c 0%, #0d0a12 65%) !important;
    background-attachment: fixed !important;
}

body.ext-theme-active.ext-theme-halloween .card:not([style*="background-image"]),
body.ext-theme-active.ext-theme-halloween .features:not([style*="background-image"]),
body.ext-theme-active.ext-theme-halloween .list-group-item:not([style*="background-image"]),
body.ext-theme-active.ext-theme-halloween .dropdown-menu,
body.ext-theme-active.ext-theme-halloween .modal-content {
    background-color: rgba(26, 18, 32, 0.9) !important;
    border: 1px solid rgba(255, 122, 26, 0.28) !important;
    border-radius: 10px !important;
    box-shadow: inset 0 2px 0 rgba(255, 122, 26, 0.65), 0 8px 24px rgba(0, 0, 0, 0.45);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
body.ext-theme-active.ext-theme-halloween .card:not([style*="background-image"]):hover {
    border-color: #ff7a1a !important;
    box-shadow: inset 0 2px 0 #9b5de5, 0 0 22px var(--ext-glow), 0 8px 24px rgba(0, 0, 0, 0.45);
}

body.ext-theme-active.ext-theme-halloween .sidebar-wrapper {
    background-color: #09060e !important;
    border-right: 1px solid rgba(255, 122, 26, 0.3) !important;
}
body.ext-theme-active.ext-theme-halloween .header-bar,
body.ext-theme-active.ext-theme-halloween .top-header {
    background-color: rgba(9, 6, 14, 0.88) !important;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(155, 93, 229, 0.35) !important;
}
body.ext-theme-active.ext-theme-halloween .sidebar-menu li.active > a {
    background: linear-gradient(90deg, rgba(255, 122, 26, 0.2), transparent) !important;
    box-shadow: inset 3px 0 0 #ff7a1a;
}

/* Kürbis-Buttons: Orange mit Lila-Schimmer */
body.ext-theme-active.ext-theme-halloween .btn-primary,
body.ext-theme-active.ext-theme-halloween .btn-success,
body.ext-theme-active.ext-theme-halloween .btn-info,
body.ext-theme-active.ext-theme-halloween .nav-pills .nav-link.active {
    background-image: linear-gradient(135deg, #ffb347 0%, #ff7a1a 55%, #d9480f 100%) !important;
    border: none !important;
    box-shadow: 0 0 14px var(--ext-glow);
    transition: box-shadow 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
body.ext-theme-active.ext-theme-halloween .btn-primary:hover,
body.ext-theme-active.ext-theme-halloween .btn-success:hover,
body.ext-theme-active.ext-theme-halloween .btn-info:hover {
    box-shadow: 0 0 26px rgba(255, 122, 26, 0.65), 0 0 40px rgba(155, 93, 229, 0.3);
    transform: translateY(-1px);
    filter: brightness(1.06);
}

/* Überschriften glimmen wie Kerzenlicht */
body.ext-theme-active.ext-theme-halloween h1,
body.ext-theme-active.ext-theme-halloween h2 {
    text-shadow: 0 0 16px rgba(255, 122, 26, 0.5), 0 0 36px rgba(155, 93, 229, 0.25);
}
@media (prefers-reduced-motion: no-preference) {
    body.ext-theme-active.ext-theme-halloween h1,
    body.ext-theme-active.ext-theme-halloween h2 {
        animation: extCandle 3.2s ease-in-out infinite;
    }
}
@keyframes extCandle {
    0%, 100% { text-shadow: 0 0 16px rgba(255, 122, 26, 0.5), 0 0 36px rgba(155, 93, 229, 0.25); }
    35%      { text-shadow: 0 0 10px rgba(255, 122, 26, 0.35), 0 0 26px rgba(155, 93, 229, 0.2); }
    60%      { text-shadow: 0 0 22px rgba(255, 122, 26, 0.7), 0 0 44px rgba(155, 93, 229, 0.3); }
}

body.ext-theme-active.ext-theme-halloween a:hover { color: #7cff4d !important; }

/* Duotone-Icons: Orange + Lila */
body.ext-theme-active.ext-theme-halloween i[class*="fa-"]:not(.btn i) {
    --fa-secondary-color: #9b5de5 !important;
    --fa-secondary-opacity: 0.9 !important;
    filter: drop-shadow(0 0 4px rgba(255, 122, 26, 0.5));
}

/* Spinnennetz in der linken oberen Ecke */
body.ext-theme-halloween::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 220px;
    pointer-events: none;
    z-index: 9996;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220' fill='none' stroke='%23ffe9d2' stroke-opacity='0.35' stroke-width='1'%3E%3Cpath d='M0 0L220 0M0 0L200 80M0 0L150 150M0 0L80 200M0 0L0 220'/%3E%3Cpath d='M60 0Q50 50 0 60M110 0Q95 95 0 110M160 0Q140 140 0 160M210 0Q185 185 0 210'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
}

/* Nebel am unteren Rand */
body.ext-theme-halloween::after {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 170px;
    pointer-events: none;
    z-index: 9995;
    background: linear-gradient(0deg, rgba(155, 93, 229, 0.14), rgba(155, 93, 229, 0.05) 55%, transparent);
}

#ext-halloween-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9997;
}

body.ext-theme-halloween ::-webkit-scrollbar { width: 10px; }
body.ext-theme-halloween ::-webkit-scrollbar-track { background: #09060e; }
body.ext-theme-halloween ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #ff7a1a, #9b5de5); border-radius: 6px; }
body.ext-theme-halloween ::selection { background: rgba(255, 122, 26, 0.45); color: #fff; }
`,

// ---------------------------------------------------------------------
// APRIL, APRIL!: absichtlich anstrengend. Grelle Farben, Comic Sans, schiefe Karten,
// wackelnde Buttons, fallende Clowns. Sidebar-Button "Themes verwalten" und das
// Auswahl-Modal bleiben ganz normal, damit man jederzeit zurück kann.
// ---------------------------------------------------------------------
aprilscherz: `
body.ext-theme-aprilscherz :is(body, p, h1, h2, h3, h4, h5, h6, a, span, small, label, td, th, li, input, button, textarea, select, .btn, .nav-link) {
    font-family: "Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive !important;
}

body.ext-theme-aprilscherz,
body.ext-theme-aprilscherz main,
body.ext-theme-aprilscherz .page-content {
    background-image:
        repeating-linear-gradient(45deg, rgba(255, 0, 255, 0.35) 0 22px, rgba(0, 255, 255, 0.35) 22px 44px),
        radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.4), transparent 50%) !important;
    background-attachment: fixed !important;
    cursor: progress;
}

/* Karten und Listen: leicht schief, dicke Rahmen */
body.ext-theme-active.ext-theme-aprilscherz .card:not([style*="background-image"]),
body.ext-theme-active.ext-theme-aprilscherz .features:not([style*="background-image"]),
body.ext-theme-active.ext-theme-aprilscherz .list-group-item:not([style*="background-image"]),
body.ext-theme-active.ext-theme-aprilscherz .dropdown-menu {
    border: 4px dashed #0000ff !important;
    border-radius: 24px !important;
    box-shadow: 8px 8px 0 #ff0000;
    transition: transform 0.3s ease;
}
body.ext-theme-aprilscherz .row > div:nth-child(odd) > .card { transform: rotate(-1.4deg); }
body.ext-theme-aprilscherz .row > div:nth-child(even) > .card { transform: rotate(1.8deg); }
body.ext-theme-aprilscherz .card:hover { transform: rotate(0deg) scale(1.03) !important; }

body.ext-theme-active.ext-theme-aprilscherz .sidebar-wrapper {
    background-color: #ffa500 !important;
    border-right: 6px dotted #ff00ff !important;
}
body.ext-theme-active.ext-theme-aprilscherz .header-bar,
body.ext-theme-active.ext-theme-aprilscherz .top-header {
    background-color: #8a2be2 !important;
    border-bottom: 6px double #ffff00 !important;
}
body.ext-theme-aprilscherz .sidebar-menu li:nth-child(odd):not(#ext-theme-menu-item) { transform: translateX(6px) rotate(-1deg); }
body.ext-theme-aprilscherz .sidebar-menu li:nth-child(even):not(#ext-theme-menu-item) { transform: translateX(-4px) rotate(1deg); }
body.ext-theme-active.ext-theme-aprilscherz .sidebar-menu li.active > a {
    background: repeating-linear-gradient(90deg, #ff0000 0 10px, #ffff00 10px 20px) !important;
}

/* Überschriften: wellig unterstrichen und leicht gesperrt */
body.ext-theme-active.ext-theme-aprilscherz h1,
body.ext-theme-active.ext-theme-aprilscherz h2,
body.ext-theme-active.ext-theme-aprilscherz h3 {
    text-decoration: underline wavy #ff0000;
    text-shadow: 3px 3px 0 #0000ff;
    letter-spacing: 0.08em;
}
body.ext-theme-active.ext-theme-aprilscherz a:hover { color: #ff0000 !important; text-decoration: line-through; }

/* Buttons: bunter Verlauf, rot-blaue Schrift */
body.ext-theme-active.ext-theme-aprilscherz .btn-primary,
body.ext-theme-active.ext-theme-aprilscherz .btn-success,
body.ext-theme-active.ext-theme-aprilscherz .btn-info,
body.ext-theme-active.ext-theme-aprilscherz .nav-pills .nav-link.active {
    background-image: linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff) !important;
    border: 3px solid #000 !important;
    border-radius: 40px !important;
    font-weight: 900;
    text-transform: uppercase;
}

/* Icons: Rot + Blau */
body.ext-theme-active.ext-theme-aprilscherz i[class*="fa-"]:not(.btn i) {
    --fa-primary-color: #ff0000 !important;
    --fa-secondary-color: #0000ff !important;
    --fa-secondary-opacity: 1 !important;
}

/* Bewegung nur, wenn der Browser keine reduzierte Bewegung wünscht */
@media (prefers-reduced-motion: no-preference) {
    body.ext-theme-aprilscherz .btn-primary,
    body.ext-theme-aprilscherz .btn-success,
    body.ext-theme-aprilscherz .btn-info {
        animation: extWobble 1.6s ease-in-out infinite;
    }
    body.ext-theme-aprilscherz main,
    body.ext-theme-aprilscherz .page-content {
        animation: extHue 12s linear infinite;
    }
    body.ext-theme-aprilscherz h1,
    body.ext-theme-aprilscherz h2 {
        animation: extBlink 1.2s steps(2, start) infinite;
    }
}
@keyframes extWobble {
    0%, 100% { transform: rotate(-2deg) scale(1); }
    50%      { transform: rotate(2deg) scale(1.05); }
}
@keyframes extHue {
    from { filter: hue-rotate(0deg); }
    to   { filter: hue-rotate(360deg); }
}
@keyframes extBlink {
    0%, 70% { opacity: 1; }
    85%     { opacity: 0.35; }
}

/* Riesige pinke Scrollbar */
body.ext-theme-aprilscherz ::-webkit-scrollbar { width: 26px; }
body.ext-theme-aprilscherz ::-webkit-scrollbar-track { background: repeating-linear-gradient(0deg, #00ffff 0 12px, #ffff00 12px 24px); }
body.ext-theme-aprilscherz ::-webkit-scrollbar-thumb { background: #ff00ff; border: 4px solid #000; border-radius: 14px; }
body.ext-theme-aprilscherz ::selection { background: #ff0000; color: #ffff00; }

/* ESCAPE-LUKE: Sidebar-Button und Auswahl-Modal bleiben immer normal und bedienbar */
body.ext-theme-aprilscherz #ext-theme-menu-item,
body.ext-theme-aprilscherz #ext-theme-menu-item *,
body.ext-theme-aprilscherz #extThemeModal,
body.ext-theme-aprilscherz #extThemeModal * {
    animation: none !important;
    transform: none !important;
    filter: none !important;
    cursor: pointer;
    font-family: "Segoe UI", system-ui, sans-serif !important;
    text-decoration: none !important;
    text-transform: none !important;
}
body.ext-theme-aprilscherz #ext-theme-menu-item { background: #000 !important; border-radius: 8px; }
body.ext-theme-aprilscherz #ext-theme-menu-item a { color: #ffffff !important; }

#ext-april-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9997;
}

#ext-april-banner {
    position: fixed;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    z-index: 10000;
    padding: 10px 18px;
    border-radius: 999px;
    background: #000;
    color: #fff;
    font: 600 14px "Segoe UI", system-ui, sans-serif;
    box-shadow: 0 0 0 3px #ff00ff, 0 8px 24px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    user-select: none;
}
`,

// ---------------------------------------------------------------------
// KARTOFFEL: Erdbraun, Schalen-Gold, Kartoffelaugen im Hintergrund, fallende Kartoffeln
// ---------------------------------------------------------------------
kartoffel: `
body.ext-theme-kartoffel,
body.ext-theme-kartoffel main,
body.ext-theme-kartoffel .page-content {
    background-image:
        radial-gradient(circle at 12px 12px, rgba(217, 164, 65, 0.12) 2px, transparent 3px),
        radial-gradient(circle at 44px 36px, rgba(139, 90, 43, 0.25) 3px, transparent 4px),
        radial-gradient(ellipse 70% 40% at 50% 110%, rgba(217, 164, 65, 0.18), transparent 70%),
        radial-gradient(ellipse 60% 40% at 0% 0%, rgba(139, 90, 43, 0.22), transparent 70%),
        linear-gradient(180deg, #22160c 0%, #1a120a 70%) !important;
    background-size: 64px 64px, 64px 64px, 100% 100%, 100% 100%, 100% 100% !important;
    background-attachment: fixed !important;
}

body.ext-theme-active.ext-theme-kartoffel .card:not([style*="background-image"]),
body.ext-theme-active.ext-theme-kartoffel .features:not([style*="background-image"]),
body.ext-theme-active.ext-theme-kartoffel .list-group-item:not([style*="background-image"]),
body.ext-theme-active.ext-theme-kartoffel .dropdown-menu,
body.ext-theme-active.ext-theme-kartoffel .modal-content {
    background-color: rgba(42, 29, 17, 0.92) !important;
    border: 1px solid rgba(217, 164, 65, 0.3) !important;
    border-radius: 18px 22px 16px 24px / 22px 16px 24px 18px !important; /* leicht "knollig" */
    box-shadow: inset 0 2px 0 rgba(240, 213, 106, 0.4), 0 8px 24px rgba(0, 0, 0, 0.45);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
body.ext-theme-active.ext-theme-kartoffel .card:not([style*="background-image"]):hover {
    border-color: #d9a441 !important;
    box-shadow: inset 0 2px 0 #f0d56a, 0 0 22px var(--ext-glow), 0 8px 24px rgba(0, 0, 0, 0.45);
    transform: translateY(-2px);
}

body.ext-theme-active.ext-theme-kartoffel .sidebar-wrapper {
    background-color: #120c06 !important;
    border-right: 1px solid rgba(217, 164, 65, 0.3) !important;
}
body.ext-theme-active.ext-theme-kartoffel .header-bar,
body.ext-theme-active.ext-theme-kartoffel .top-header {
    background-color: rgba(18, 12, 6, 0.9) !important;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(217, 164, 65, 0.3) !important;
}
body.ext-theme-active.ext-theme-kartoffel .sidebar-menu li.active > a {
    background: linear-gradient(90deg, rgba(217, 164, 65, 0.2), transparent) !important;
    box-shadow: inset 3px 0 0 #d9a441;
}

/* Buttons: Pommes-Gold bis Röstbraun */
body.ext-theme-active.ext-theme-kartoffel .btn-primary,
body.ext-theme-active.ext-theme-kartoffel .btn-success,
body.ext-theme-active.ext-theme-kartoffel .btn-info,
body.ext-theme-active.ext-theme-kartoffel .nav-pills .nav-link.active {
    background-image: linear-gradient(135deg, #f0d56a 0%, #d9a441 50%, #a8692a 100%) !important;
    border: none !important;
    border-radius: 14px !important;
    box-shadow: 0 0 12px var(--ext-glow);
    transition: box-shadow 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}
body.ext-theme-active.ext-theme-kartoffel .btn-primary:hover,
body.ext-theme-active.ext-theme-kartoffel .btn-success:hover,
body.ext-theme-active.ext-theme-kartoffel .btn-info:hover {
    box-shadow: 0 0 24px rgba(217, 164, 65, 0.6);
    transform: translateY(-1px) rotate(-1deg);
    filter: brightness(1.06);
}

body.ext-theme-active.ext-theme-kartoffel h1,
body.ext-theme-active.ext-theme-kartoffel h2 {
    text-shadow: 0 0 14px rgba(217, 164, 65, 0.35), 2px 2px 0 rgba(107, 74, 43, 0.6);
}
body.ext-theme-active.ext-theme-kartoffel a:hover { color: #f0d56a !important; }

/* Duotone-Icons: Gold + Erdbraun */
body.ext-theme-active.ext-theme-kartoffel i[class*="fa-"]:not(.btn i) {
    --fa-secondary-color: #a8692a !important;
    --fa-secondary-opacity: 0.95 !important;
}

body.ext-theme-kartoffel ::-webkit-scrollbar { width: 10px; }
body.ext-theme-kartoffel ::-webkit-scrollbar-track { background: #120c06; }
body.ext-theme-kartoffel ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #d9a441, #8b5a2b); border-radius: 6px; }
body.ext-theme-kartoffel ::selection { background: rgba(217, 164, 65, 0.45); color: #fff; }

#ext-potato-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9997;
    opacity: 0.85;
}
`,

// Minimal Purple Spezial-CSS
"minimal-purple": `
body.ext-theme-minimal-purple,
body.ext-theme-minimal-purple main,
body.ext-theme-minimal-purple .page-content {
    background-color: #121212 !important;
    color: #e0e0e0 !important;
}
body.ext-theme-minimal-purple a { color: #bb86fc !important; }
body.ext-theme-minimal-purple header, body.ext-theme-minimal-purple footer, body.ext-theme-minimal-purple .card:not([style*="background-image"]), body.ext-theme-minimal-purple .panel, body.ext-theme-minimal-purple nav {
    background-color: #1e1e1e !important;
    border: 1px solid #333 !important;
}
body.ext-theme-minimal-purple button.btn-primary, body.ext-theme-minimal-purple .btn-primary {
    background-color: #3700b3 !important;
    border-color: #bb86fc !important;
    color: white !important;
}
`
};

let themeCSS = Object.assign({}, builtInThemeCSS);

// 4. Effekte (Canvas-Animationen). Wer "weniger Bewegung" eingestellt hat, bekommt keine.
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function createOverlayCanvas(id) {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    document.body.appendChild(canvas);
    return canvas;
}

// Schneefall (Winter Theme)
function startSnow() {
    if (prefersReducedMotion() || document.getElementById('ext-snow-canvas')) return;

    const canvas = createOverlayCanvas('ext-snow-canvas');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(90, Math.floor(window.innerWidth / 16));
    const flakes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.2 + 0.6,
        speed: Math.random() * 0.7 + 0.25,
        drift: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.25
    }));

    (function frame() {
        ctx.clearRect(0, 0, w, h);
        for (const f of flakes) {
            f.y += f.speed;
            f.drift += 0.01;
            f.x += Math.sin(f.drift) * 0.4;
            if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
            if (f.x > w + 5) f.x = -5;
            if (f.x < -5) f.x = w + 5;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220, 240, 255, ${f.alpha})`;
            ctx.fill();
        }
        requestAnimationFrame(frame);
    })();
}

// Code-Regen (Matrix Theme)
function startMatrixRain() {
    if (prefersReducedMotion() || document.getElementById('ext-matrix-canvas')) return;

    const canvas = createOverlayCanvas('ext-matrix-canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = 16;
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789";
    let w, h, drops;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        drops = Array.from({ length: Math.ceil(w / fontSize) }, () => Math.random() * -50);
    }
    resize();
    window.addEventListener('resize', resize);

    let last = 0;
    function frame(time) {
        requestAnimationFrame(frame);
        if (time - last < 50) return; // ca. 20 Bilder pro Sekunde reichen
        last = time;

        // Alte Zeichen langsam ausblenden (Schweif), ohne den Hintergrund zu schwärzen
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';

        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillStyle = '#d8ffe0';            // heller Kopf
            ctx.fillText(char, x, y);
            ctx.fillStyle = '#00ff41';            // grüner Schweif direkt dahinter
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);

            if (y > h && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    requestAnimationFrame(frame);
}

// Feuerwerk (Silvester Theme): Raketen steigen auf und explodieren in bunten Funken
function startFireworks() {
    if (prefersReducedMotion() || document.getElementById('ext-fireworks-canvas')) return;

    const canvas = createOverlayCanvas('ext-fireworks-canvas');
    const ctx = canvas.getContext('2d');
    // Gold, Pink, Cyan, Weiß, Orange
    const colors = [[255, 213, 74], [255, 79, 163], [0, 229, 255], [255, 255, 255], [255, 140, 60]];
    const rockets = [];
    const sparks = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function launch() {
        rockets.push({
            x: w * (0.1 + Math.random() * 0.8),
            y: h + 5,
            targetY: h * (0.12 + Math.random() * 0.38),
            vy: -(7 + Math.random() * 3),
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function explode(x, y, color) {
        const count = 45 + Math.floor(Math.random() * 35);
        const power = 2 + Math.random() * 2.5;
        const twoTone = Math.random() < 0.35; // manche Explosionen mit zweiter Farbe
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.15;
            const speed = power * (0.6 + Math.random() * 0.6);
            sparks.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.011 + Math.random() * 0.012,
                color: twoTone && i % 2 ? color2 : color
            });
        }
    }

    launch();
    let last = 0;
    let nextLaunch = 0;
    function frame(time) {
        requestAnimationFrame(frame);
        if (time - last < 33) return; // ca. 30 Bilder pro Sekunde
        last = time;

        // Alte Bilder ausblenden (Schweif), ohne den Hintergrund zu schwärzen
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';

        if (time > nextLaunch && rockets.length < 3) {
            launch();
            nextLaunch = time + 700 + Math.random() * 1400;
        }

        for (let i = rockets.length - 1; i >= 0; i--) {
            const r = rockets[i];
            r.y += r.vy;
            r.vy *= 0.985;
            ctx.beginPath();
            ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r.color[0]}, ${r.color[1]}, ${r.color[2]}, 1)`;
            ctx.fill();
            if (r.y <= r.targetY || r.vy > -1.2) {
                explode(r.x, r.y, r.color);
                rockets.splice(i, 1);
            }
        }

        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.vx *= 0.98;
            s.vy = s.vy * 0.98 + 0.05; // leichte Schwerkraft
            s.x += s.vx;
            s.y += s.vy;
            s.life -= s.decay;
            if (s.life <= 0) { sparks.splice(i, 1); continue; }
            ctx.beginPath();
            ctx.arc(s.x, s.y, 1.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.color[0]}, ${s.color[1]}, ${s.color[2]}, ${s.life})`;
            ctx.fill();
        }
    }
    requestAnimationFrame(frame);
}

// Fledermäuse + aufsteigende Glut (Halloween Theme)
function startHalloween() {
    if (prefersReducedMotion() || document.getElementById('ext-halloween-canvas')) return;

    const canvas = createOverlayCanvas('ext-halloween-canvas');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Glut: kleine orange Funken, die langsam nach oben steigen
    const emberCount = Math.min(40, Math.floor(window.innerWidth / 30));
    const embers = Array.from({ length: emberCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        speed: Math.random() * 0.5 + 0.2,
        sway: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.3
    }));

    const bats = [];
    function spawnBat() {
        const dir = Math.random() < 0.5 ? 1 : -1;
        bats.push({
            x: dir === 1 ? -60 : w + 60,
            baseY: h * (0.08 + Math.random() * 0.5),
            vx: dir * (1.4 + Math.random() * 1.8),
            size: 10 + Math.random() * 12,
            phase: Math.random() * Math.PI * 2,
            wave: Math.random() * Math.PI * 2,
            waveAmp: 15 + Math.random() * 35
        });
    }

    function drawBat(b) {
        const s = b.size;
        const flap = Math.sin(b.phase);
        const y = b.baseY + Math.sin(b.wave) * b.waveAmp;
        ctx.save();
        ctx.translate(b.x, y);
        ctx.fillStyle = '#2a1640';
        ctx.strokeStyle = 'rgba(255, 122, 26, 0.55)';
        ctx.lineWidth = 1;
        for (const d of [-1, 1]) {
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.1);
            ctx.quadraticCurveTo(d * s * 0.7, -s * (0.9 * flap + 0.2), d * s * 1.4, -s * 0.3 * flap);
            ctx.quadraticCurveTo(d * s * 1.0, s * 0.1, d * s * 0.75, s * 0.15);
            ctx.quadraticCurveTo(d * s * 0.5, s * 0.35, d * s * 0.3, s * 0.15);
            ctx.quadraticCurveTo(d * s * 0.15, s * 0.3, 0, s * 0.2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        // Körper, Kopf und Ohren
        ctx.beginPath();
        ctx.ellipse(0, s * 0.05, s * 0.2, s * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, -s * 0.28, s * 0.15, 0, Math.PI * 2);
        ctx.fill();
        for (const d of [-1, 1]) {
            ctx.beginPath();
            ctx.moveTo(d * s * 0.12, -s * 0.4);
            ctx.lineTo(d * s * 0.1, -s * 0.6);
            ctx.lineTo(d * s * 0.02, -s * 0.42);
            ctx.closePath();
            ctx.fill();
        }
        // Leuchtende Augen
        ctx.fillStyle = '#7cff4d';
        ctx.fillRect(-s * 0.08, -s * 0.3, s * 0.05, s * 0.05);
        ctx.fillRect(s * 0.03, -s * 0.3, s * 0.05, s * 0.05);
        ctx.restore();
    }

    spawnBat();
    let nextBat = 0;
    (function frame(time) {
        requestAnimationFrame(frame);
        ctx.clearRect(0, 0, w, h);

        for (const e of embers) {
            e.y -= e.speed;
            e.sway += 0.02;
            e.x += Math.sin(e.sway) * 0.3;
            if (e.y < -5) { e.y = h + 5; e.x = Math.random() * w; }
            const flicker = e.alpha * (0.7 + Math.sin(e.sway * 3) * 0.3);
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 140, 50, ${flicker})`;
            ctx.fill();
        }

        if (time > nextBat && bats.length < 5) {
            spawnBat();
            nextBat = time + 2500 + Math.random() * 4500;
        }
        for (let i = bats.length - 1; i >= 0; i--) {
            const b = bats[i];
            b.x += b.vx;
            b.phase += 0.35;
            b.wave += 0.04;
            drawBat(b);
            if (b.x < -80 || b.x > w + 80) bats.splice(i, 1);
        }
    })(0);
}

// Fallende Clowns und Partyhüte + Hinweis-Banner (April, April! Theme)
function startAprilFools() {
    // Hinweis-Banner: zeigt den Weg zurück, Klick blendet ihn aus
    if (!document.getElementById('ext-april-banner')) {
        const banner = document.createElement('div');
        banner.id = 'ext-april-banner';
        banner.textContent = '🤡 April, April! Zurück zur Normalität: Sidebar → "Themes verwalten" (Klick zum Ausblenden)';
        banner.addEventListener('click', () => banner.remove());
        document.body.appendChild(banner);
    }

    if (prefersReducedMotion() || document.getElementById('ext-april-canvas')) return;

    const canvas = createOverlayCanvas('ext-april-canvas');
    const ctx = canvas.getContext('2d');
    const emojis = ['🤡', '🎉', '🃏', '🎈', '🥳', '🪅', '🤪'];
    let w, h;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(28, Math.floor(window.innerWidth / 45));
    const items = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 18 + Math.random() * 26,
        speed: 0.8 + Math.random() * 2,
        sway: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.12,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    (function frame() {
        ctx.clearRect(0, 0, w, h);
        for (const it of items) {
            it.y += it.speed;
            it.sway += 0.03;
            it.x += Math.sin(it.sway) * 1.2;
            it.rot += it.spin;
            if (it.y > h + 40) { it.y = -40; it.x = Math.random() * w; }
            ctx.save();
            ctx.translate(it.x, it.y);
            ctx.rotate(it.rot);
            ctx.font = it.size + 'px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(it.emoji, 0, 0);
            ctx.restore();
        }
        requestAnimationFrame(frame);
    })();
}

// Fallende Kartoffeln und Pommes (Kartoffel Theme)
function startPotatoes() {
    if (prefersReducedMotion() || document.getElementById('ext-potato-canvas')) return;

    const canvas = createOverlayCanvas('ext-potato-canvas');
    const ctx = canvas.getContext('2d');
    const emojis = ['🥔', '🥔', '🥔', '🍟', '🧑‍🌾', '🌱'];
    let w, h;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(22, Math.floor(window.innerWidth / 60));
    const items = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 16 + Math.random() * 22,
        speed: 0.4 + Math.random() * 1.1,
        sway: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.04,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    (function frame() {
        ctx.clearRect(0, 0, w, h);
        for (const it of items) {
            it.y += it.speed;
            it.sway += 0.02;
            it.x += Math.sin(it.sway) * 0.6;
            it.rot += it.spin;
            if (it.y > h + 40) { it.y = -40; it.x = Math.random() * w; }
            ctx.save();
            ctx.translate(it.x, it.y);
            ctx.rotate(it.rot);
            ctx.font = it.size + 'px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(it.emoji, 0, 0);
            ctx.restore();
        }
        requestAnimationFrame(frame);
    })();
}

const effects = {
    snow: startSnow,
    matrix: startMatrixRain,
    fireworks: startFireworks,
    halloween: startHalloween,
    aprilfools: startAprilFools,
    potato: startPotatoes
};

// 5. Theme laden und auf der Seite anwenden (inkl. Remote-Themes von GitHub)
function applyTheme(activeThemeId, theme) {
    if (activeThemeId === "default" || !theme) return;

    let existingStyle = document.getElementById('ext-theme-style');
    if (existingStyle) existingStyle.remove();

    let style = document.createElement('style');
    style.id = 'ext-theme-style';
    style.innerHTML = `:root { ${theme.vars || ''} }\n` + baseCSS + "\n" + landingCSS + "\n" + (themeCSS[activeThemeId] || theme.css || "");
    (document.head || document.documentElement).appendChild(style);

    const activateBody = () => {
        if (!document.body) return;
        document.body.classList.add('ext-theme-active', 'ext-theme-' + activeThemeId);
        if (theme.effect && effects[theme.effect]) effects[theme.effect]();
    };

    if (document.body) {
        activateBody();
    } else {
        document.addEventListener('DOMContentLoaded', activateBody, { once: true });
    }
}

// Themes aus chrome.storage.local synchronisieren
chrome.storage.local.get(['selectedSkrimeTheme', 'skrime_remote_themes', 'skrime_last_sync'], function(result) {
    const remoteThemes = result.skrime_remote_themes || {};

    // Remote-Themes einbinden
    Object.entries(remoteThemes).forEach(([id, t]) => {
        customThemes[id] = Object.assign({}, t, { isRemote: true });
        if (t.css) {
            themeCSS[id] = t.css;
        }
    });

    let activeThemeId = result.selectedSkrimeTheme || "default";
    let theme = customThemes[activeThemeId];
    if (activeThemeId !== "default" && theme) {
        applyTheme(activeThemeId, theme);
    }

    // Automatische Hintergrund-Prüfung bei Seitenaufruf (wenn letzter Sync > 30 Min her ist)
    const lastSync = result.skrime_last_sync || 0;
    if (Date.now() - lastSync > 30 * 60 * 1000) {
        chrome.runtime.sendMessage({ action: "checkForThemeUpdates" });
    }
});

// Wenn der Service Worker neue Themes heruntergeladen hat
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "themesUpdated") {
        console.log(`[Skrime Addon] ${message.totalCount} Themes aktualisiert (${message.newThemesCount} neu).`);
        chrome.storage.local.get(['skrime_remote_themes'], function(res) {
            const remoteThemes = res.skrime_remote_themes || {};
            Object.entries(remoteThemes).forEach(([id, t]) => {
                customThemes[id] = Object.assign({}, t, { isRemote: true });
                if (t.css) themeCSS[id] = t.css;
            });
            renderThemeCards();
        });
    }
});

// 6. Auswahl-Modal mit integriertem GitHub Updater
function ensureThemeModal() {
    if (document.getElementById('extThemeModal')) return;

    let modalHtml = `
    <div class="modal fade" id="extThemeModal" tabindex="-1" aria-labelledby="extThemeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content" style="background-color: #15171C; border: 1px solid #2a2d35; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);">
                <div class="modal-header border-bottom d-flex align-items-center justify-content-between" style="border-color: #2a2d35 !important; padding: 16px 22px;">
                    <div>
                        <h5 class="modal-title m-0" id="extThemeModalLabel" style="color: white; font-weight: 700; display: flex; align-items: center; gap: 10px;">
                            <i class="fa-duotone fa-palette" style="color: #bb86fc;"></i> Skrime Themes
                        </h5>
                        <small style="color: #8b93a1; font-size: 0.78rem;">
                            GitHub Repository: <a href="https://github.com/quadled/skrime-free-themes" target="_blank" style="color: #bb86fc; text-decoration: underline;">quadled/skrime-free-themes</a>
                        </small>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <button type="button" id="ext-btn-update-themes" class="btn btn-sm" style="background-color: #232733; color: #e0e0e0; border: 1px solid #363d4e; border-radius: 6px; padding: 5px 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 7px; transition: all 0.2s;">
                            <i class="fa-duotone fa-arrows-rotate" id="ext-update-btn-icon"></i>
                            <span id="ext-update-btn-text">Auf Updates prüfen</span>
                        </button>
                        <button type="button" class="btn btn-icon btn-close" data-bs-dismiss="modal" style="margin-left: 8px;">
                            <i class="fa-duotone fa-xmark fa-sm fs-4 text-dark" style="color: white !important;"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body" style="padding: 20px 22px;">
                    <!-- Updater Status Alert -->
                    <div id="ext-updater-alert" style="display: none; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 0.85rem;"></div>

                    <div class="row" id="ext-theme-grid"></div>
                </div>
                <div class="modal-footer border-top d-flex justify-content-between align-items-center" style="border-color: #2a2d35 !important; padding: 12px 22px; background: #12141a;">
                    <span id="ext-last-sync-badge" style="color: #7a8292; font-size: 0.75rem;">
                        <i class="fa-duotone fa-clock"></i> Zuletzt geprüft: Lade...
                    </span>
                    <a href="https://github.com/quadled/skrime-free-themes" target="_blank" class="btn btn-sm btn-link" style="color: #8b93a1; text-decoration: none; font-size: 0.78rem;">
                        <i class="fa-brands fa-github"></i> Eigenes Theme auf GitHub einreichen
                    </a>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Update-Button Event
    const updateBtn = document.getElementById('ext-btn-update-themes');
    const updateIcon = document.getElementById('ext-update-btn-icon');
    const updateText = document.getElementById('ext-update-btn-text');
    const alertBox = document.getElementById('ext-updater-alert');

    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            updateBtn.disabled = true;
            updateIcon.classList.add('fa-spin');
            updateText.textContent = "Prüfe GitHub...";
            alertBox.style.display = 'none';

            chrome.runtime.sendMessage({ action: "checkForThemeUpdates" }, (response) => {
                updateBtn.disabled = false;
                updateIcon.classList.remove('fa-spin');
                updateText.textContent = "Auf Updates prüfen";

                if (response && response.success) {
                    alertBox.style.display = 'block';
                    alertBox.style.backgroundColor = 'rgba(46, 213, 115, 0.15)';
                    alertBox.style.border = '1px solid rgba(46, 213, 115, 0.35)';
                    alertBox.style.color = '#2ed573';
                    const newCount = response.newThemesCount || 0;
                    alertBox.innerHTML = newCount > 0 
                        ? `<i class="fa-duotone fa-circle-check"></i> <b>${newCount} neue(s) Theme(s) von GitHub geladen!</b> Insgesamt sind jetzt ${response.totalCount} Themes verfügbar.`
                        : `<i class="fa-duotone fa-circle-check"></i> Alle Themes sind aktuell (${response.totalCount} Themes aus GitHub geladen).`;

                    chrome.storage.local.get(['skrime_remote_themes', 'skrime_last_sync'], (res) => {
                        const rem = res.skrime_remote_themes || {};
                        Object.entries(rem).forEach(([id, t]) => {
                            customThemes[id] = Object.assign({}, t, { isRemote: true });
                            if (t.css) themeCSS[id] = t.css;
                        });
                        renderThemeCards();
                    });
                } else {
                    alertBox.style.display = 'block';
                    alertBox.style.backgroundColor = 'rgba(255, 71, 87, 0.15)';
                    alertBox.style.border = '1px solid rgba(255, 71, 87, 0.35)';
                    alertBox.style.color = '#ff6b81';
                    alertBox.innerHTML = `<i class="fa-duotone fa-triangle-exclamation"></i> Hinweis: ${response && response.error ? response.error : 'Konnte nicht mit GitHub verbinden'}. Lokale Fallback-Themes bleiben aktiv.`;
                }
            });
        });
    }

    renderThemeCards();
}

function renderThemeCards() {
    let grid = document.getElementById('ext-theme-grid');
    if (!grid) return;

    chrome.storage.local.get(['selectedSkrimeTheme', 'skrime_last_sync'], function(result) {
        let currentTheme = result.selectedSkrimeTheme || "default";
        const selectedShadow = (accent) => `0 0 0 2px #ffffff, 0 0 18px ${accent}`;

        // Sync Time Badge im Footer aktualisieren
        const lastSyncBadge = document.getElementById('ext-last-sync-badge');
        if (lastSyncBadge) {
            const time = result.skrime_last_sync;
            if (!time) {
                lastSyncBadge.innerHTML = `<i class="fa-duotone fa-cloud"></i> GitHub-Sync bereit`;
            } else {
                const diffMin = Math.floor((Date.now() - time) / 60000);
                const timeStr = diffMin < 1 ? "gerade eben" : `vor ${diffMin} Min.`;
                lastSyncBadge.innerHTML = `<i class="fa-duotone fa-cloud-check"></i> Zuletzt synchronisiert: ${timeStr}`;
            }
        }

        grid.innerHTML = "";

        Object.keys(customThemes).forEach(themeId => {
            let theme = customThemes[themeId];
            let p = theme.preview || { bg1: "#1e1e1e", bg2: "#15171C", accent: "#bb86fc", accent2: "#3700b3", text: "#ffffff" };
            let isChecked = currentTheme === themeId ? 'checked' : '';
            let shadowStyle = currentTheme === themeId ? `box-shadow: ${selectedShadow(p.accent)};` : '';
            let cloudBadge = theme.isRemote 
                ? `<span style="position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0.45); border: 1px solid ${p.accent}; color: ${p.accent}; font-size: 0.65rem; border-radius: 4px; padding: 2px 6px; font-weight: 600;"><i class="fa-brands fa-github"></i> Cloud</span>`
                : '';
            let authorText = theme.author ? `<small style="color: ${p.accent2 || p.text}; opacity: 0.8; font-size: 0.72rem; margin-top: 3px;">von ${theme.author}</small>` : '';

            // Jede Karte zeigt die Farben ihres Themes. !important, damit das aktive Theme sie nicht überfärbt.
            let cardHtml = `
                <div class="col-md-4 mt-2">
                    <label style="width: 100%; cursor: pointer;">
                        <input type="radio" name="ext_theme_selection" value="${themeId}" style="display: none;" ${isChecked}>
                        <div class="card card-body ext-theme-card" data-accent="${p.accent}" style="background: linear-gradient(135deg, ${p.bg1}, ${p.bg2}) !important; border: 1px solid ${p.accent} !important; min-height: 180px; position: relative; ${shadowStyle} transition: 0.2s; border-radius: 10px;">
                            ${cloudBadge}
                            <div class="mt-4" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
                                <div style="font-size: 2.8rem;">
                                    <i class="fa-duotone ${theme.icon || 'fa-palette'}" style="color: ${p.accent} !important; --fa-primary-color: ${p.accent} !important; --fa-secondary-color: ${p.accent2 || p.accent} !important; --fa-secondary-opacity: 0.85 !important;"></i>
                                </div>
                                <span style="color: ${p.text}; font-weight: bold; margin-top: 12px; font-size: 1.05rem; text-align: center;">${theme.name}</span>
                                ${authorText}
                            </div>
                        </div>
                    </label>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Event-Listener für Radio Buttons
        grid.querySelectorAll('input[name="ext_theme_selection"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    document.querySelectorAll('.ext-theme-card').forEach(card => {
                        card.style.boxShadow = '';
                    });
                    let selectedCard = this.parentElement.querySelector('.ext-theme-card');
                    selectedCard.style.boxShadow = selectedShadow(selectedCard.dataset.accent);

                    // Speichern & Neuladen
                    chrome.storage.local.set({selectedSkrimeTheme: this.value}, function() {
                        window.location.reload();
                    });
                }
            });
        });
    });
}

// Modal anlegen, sobald DOM verfügbar ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureThemeModal);
} else {
    ensureThemeModal();
}

// Karte "Extension Design" in den Einstellungen (nur auf /settings)
if (window.location.pathname.includes('/settings')) {
    setTimeout(() => {
        let preferencesRow = document.querySelector('#preferences .row');

        if (preferencesRow && !document.getElementById('ext-theme-settings-card')) {
            let customCard = document.createElement('div');
            customCard.id = 'ext-theme-settings-card';
            customCard.className = 'col-md-4 mt-3';
            customCard.innerHTML = `
                <div class="card card-body h-100 d-flex flex-column">
                    <h5>Extension Design</h5>
                    <small class="text-muted mb-4">Passe das Erscheinungsbild deines Dashboards mit eigenen Community-Themes an.</small>
                    <button type="button" class="btn btn-primary w-100 mt-auto" data-bs-toggle="modal" data-bs-target="#extThemeModal">
                        <i class="fa-duotone fa-palette"></i> Ext Theme ändern
                    </button>
                </div>
            `;
            preferencesRow.appendChild(customCard);
        }
    }, 800);
}

// 7. Sidebar-Button "Themes verwalten" direkt unter "Partner werden"
// Der Eintrag wird vom "Partner werden"-Punkt kopiert, sieht also exakt wie die anderen Menüpunkte aus.
function insertThemeMenuItem() {
    if (document.getElementById('ext-theme-menu-item')) return true;

    const links = document.querySelectorAll('.sidebar-menu a');
    let anchorLink = null;
    for (const a of links) {
        if (a.textContent.trim().toLowerCase().startsWith('partner werden')) {
            anchorLink = a;
            break;
        }
    }
    if (!anchorLink) return false;

    const anchorLi = anchorLink.closest('li');
    if (!anchorLi) return false;

    const clone = anchorLi.cloneNode(true);

    // Untermenüs, aktive Markierung und IDs aus der Kopie entfernen
    clone.querySelectorAll('ul, .sidebar-submenu, .sidebar-dropdown-menu, .badge').forEach(el => el.remove());
    clone.classList.remove('active', 'sidebar-dropdown', 'open', 'show');
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    clone.id = 'ext-theme-menu-item';

    const link = clone.querySelector('a');
    if (!link) return false;

    // Link so umbauen, dass er nur unser Modal öffnet
    Array.from(link.attributes).forEach(attr => {
        if (attr.name.startsWith('data-') || attr.name.startsWith('aria-')) link.removeAttribute(attr.name);
    });
    link.setAttribute('href', '#');
    link.removeAttribute('target');
    link.setAttribute('data-bs-toggle', 'modal');
    link.setAttribute('data-bs-target', '#extThemeModal');

    // Icon austauschen (Stil- und Größenklassen bleiben, nur das Symbol wird ersetzt)
    const keep = /^fa-(duotone|solid|regular|light|thin|brands|sharp|fw|lg|sm|xs|[0-9]+x)$/;
    const icon = clone.querySelector('i[class*="fa-"]');
    if (icon) {
        const kept = Array.from(icon.classList).filter(c => !c.startsWith('fa-') || keep.test(c));
        icon.className = kept.join(' ') + ' fa-palette';
    }

    // Text austauschen
    const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
        if (node.nodeValue.trim().length > 0) {
            node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), 'Themes verwalten');
            break;
        }
    }

    anchorLi.insertAdjacentElement('afterend', clone);
    return true;
}

// 8. Credit unter dem Logo: "Themes made by QuadLed"
function insertThemeCredit() {
    if (document.getElementById('ext-theme-credit')) return true;
    const brand = document.querySelector('.sidebar-brand');
    if (!brand) return false;

    if (!document.getElementById('ext-theme-credit-style')) {
        const creditStyle = document.createElement('style');
        creditStyle.id = 'ext-theme-credit-style';
        creditStyle.innerHTML = `
            #ext-theme-credit {
                display: block;
                margin: -6px 0 10px 0;
                padding: 0 20px;
                font-size: 0.62rem;
                line-height: 1;
                letter-spacing: 0.04em;
                opacity: 0.55;
                color: var(--ext-text-muted, #8b93a1);
                pointer-events: none;
                user-select: none;
                white-space: nowrap;
            }
            #ext-theme-credit b {
                font-weight: 600;
                color: var(--ext-accent, #ffffff);
            }
        `;
        document.head.appendChild(creditStyle);
    }

    const credit = document.createElement('small');
    credit.id = 'ext-theme-credit';
    credit.innerHTML = 'Themes made by <b>QuadLed</b>';
    brand.insertAdjacentElement('afterend', credit);
    return true;
}

// Sidebar kann etwas später geladen werden, daher kurz mehrfach versuchen
(function initSidebarAdditions() {
    let tries = 0;
    const timer = setInterval(() => {
        const menuDone = insertThemeMenuItem();
        const creditDone = insertThemeCredit();
        if ((menuDone && creditDone) || ++tries > 30) clearInterval(timer);
    }, 250);
})();