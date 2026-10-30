// =====================================================================
// CUSTOM THEMES v3.2
// Multi-Site: Unterstützt skrime.eu und 24fire.de
// Dynamische Themes via GitHub Updater (quadled/skrime-free-themes)
// =====================================================================

const CURRENT_HOST = window.location.hostname;
const IS_24FIRE = CURRENT_HOST.includes('24fire.de');
const IS_SKRIME = CURRENT_HOST.includes('skrime.eu');
const CURRENT_SITE = IS_24FIRE ? '24fire.de' : 'skrime.eu';
const STORAGE_KEY = IS_24FIRE ? 'selected_theme_24fire' : 'selectedSkrimeTheme';
const DEFAULT_THEME_ID = IS_24FIRE ? 'default-24fire' : 'default';

// 1. Initiales Standard-Theme für die aktuelle Webseite
const defaultThemes = {
    [DEFAULT_THEME_ID]: {
        name: IS_24FIRE ? "24Fire Standard" : "Skrime Standard",
        icon: "fa-xmark",
        effect: null,
        site: CURRENT_SITE,
        vars: "",
        preview: IS_24FIRE 
            ? { bg1: "#ffffff", bg2: "#f4f6f9", accent: "#d9534f", accent2: "#333333", text: "#333333" }
            : { bg1: "#1e1e1e", bg2: "#15171C", accent: "#6c757d", accent2: "#ffffff", text: "#ffffff" }
    }
};

let customThemes = Object.assign({}, defaultThemes);
let themeCSS = {};

// 2. Basis-CSS (wird für Skrime.eu angewendet)
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

// 3. Spezial-CSS pro Theme
// Alle Theme-CSS-Dateien werden dynamisch von GitHub (themes/*.css) geladen

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
    if (!activeThemeId || activeThemeId === 'default' || activeThemeId === DEFAULT_THEME_ID || !theme) return;

    let existingStyle = document.getElementById('ext-theme-style');
    if (existingStyle) existingStyle.remove();

    let style = document.createElement('style');
    style.id = 'ext-theme-style';

    // Basis-CSS nur auf Skrime.eu anwenden
    let siteBaseCSS = IS_SKRIME ? (baseCSS + "\n" + landingCSS) : "";
    style.innerHTML = `:root { ${theme.vars || ''} }\n` + siteBaseCSS + "\n" + (themeCSS[activeThemeId] || theme.css || "");
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
function loadThemesFromData(remoteThemes, activeThemeId) {
    customThemes = Object.assign({}, defaultThemes);
    themeCSS = {};

    Object.entries(remoteThemes).forEach(([id, t]) => {
        const themeSite = t.site || 'skrime.eu';
        // Nur Themes für die aktuelle Seite laden!
        if (themeSite === CURRENT_SITE) {
            customThemes[id] = Object.assign({}, t, { isRemote: true });
            if (t.css) {
                themeCSS[id] = t.css;
            }
        }
    });

    let theme = customThemes[activeThemeId];
    if (activeThemeId !== 'default' && activeThemeId !== DEFAULT_THEME_ID && theme) {
        applyTheme(activeThemeId, theme);
    }
    renderThemeCards();
}

chrome.storage.local.get([STORAGE_KEY, 'selectedSkrimeTheme', 'skrime_remote_themes', 'skrime_last_sync'], function(result) {
    const remoteThemes = result.skrime_remote_themes || {};
    // Kompatibilität: Auf Skrime 'selectedSkrimeTheme' oder STORAGE_KEY nutzen
    let activeThemeId = result[STORAGE_KEY] || (IS_SKRIME ? result.selectedSkrimeTheme : null) || DEFAULT_THEME_ID;

    if (Object.keys(remoteThemes).length === 0) {
        // Noch keine Themes im Cache: sofort vom GitHub-Updater holen
        chrome.runtime.sendMessage({ action: "checkForThemeUpdates" }, (response) => {
            if (response && response.success) {
                chrome.storage.local.get(['skrime_remote_themes'], (res) => {
                    loadThemesFromData(res.skrime_remote_themes || {}, activeThemeId);
                });
            } else {
                loadThemesFromData({}, activeThemeId);
            }
        });
    } else {
        loadThemesFromData(remoteThemes, activeThemeId);
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
        console.log(`[Custom Themes] ${message.totalCount} Themes aktualisiert (${message.newThemesCount} neu).`);
        chrome.storage.local.get(['skrime_remote_themes', STORAGE_KEY], function(res) {
            const activeId = res[STORAGE_KEY] || DEFAULT_THEME_ID;
            loadThemesFromData(res.skrime_remote_themes || {}, activeId);
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
                            <i class="fa-duotone fa-palette" style="color: #bb86fc;"></i> ${IS_24FIRE ? "24Fire" : "Skrime"} Themes
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
        let currentTheme = result[STORAGE_KEY] || DEFAULT_THEME_ID;
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
                    chrome.storage.local.set({[STORAGE_KEY]: this.value}, function() {
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
// Schwebender Button für 24fire.de
function insert24FireButton() {
    if (document.getElementById('ext-24fire-theme-btn')) return;
    const btn = document.createElement('div');
    btn.id = 'ext-24fire-theme-btn';
    btn.innerHTML = `
        <button type="button" style="position: fixed; bottom: 22px; right: 22px; z-index: 999999; background: #e74c3c; color: #ffffff; border: 2px solid #ffffff; border-radius: 30px; padding: 10px 18px; font-weight: 700; font-size: 13px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); cursor: pointer; display: flex; align-items: center; gap: 8px;">
            🎨 24Fire Themes
        </button>
    `;
    document.body.appendChild(btn);
    btn.querySelector('button').addEventListener('click', () => {
        ensureThemeModal();
        const modal = document.getElementById('extThemeModal');
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('show');
            document.body.classList.add('modal-open');
        }
    });
}

// 7. Seiten-spezifische UI-Elemente
if (IS_SKRIME) {
    if (window.location.pathname.includes('/settings')) {
        setTimeout(() => {
            let preferencesRow = document.querySelector('#preferences .row');
            if (preferencesRow && !document.getElementById('ext-theme-settings-card')) {
                let customCard = document.createElement('div');
                customCard.id = 'ext-theme-settings-card';
                customCard.className = 'col-md-4 mt-3';
                customCard.innerHTML = `
                    <div class="card card-body h-100 d-flex flex-column">
                        <h5>Custom Themes</h5>
                        <small class="text-muted mb-4">Passe das Erscheinungsbild mit Community-Themes an.</small>
                        <button type="button" class="btn btn-primary w-100 mt-auto" data-bs-toggle="modal" data-bs-target="#extThemeModal">
                            <i class="fa-duotone fa-palette"></i> Theme ändern
                        </button>
                    </div>
                `;
                preferencesRow.appendChild(customCard);
            }
        }, 800);
    }

    (function initSidebarAdditions() {
        let tries = 0;
        const timer = setInterval(() => {
            const menuDone = insertThemeMenuItem();
            const creditDone = insertThemeCredit();
            if ((menuDone && creditDone) || ++tries > 30) clearInterval(timer);
        }, 250);
    })();
} else if (IS_24FIRE) {
    (function init24FireAdditions() {
        let tries = 0;
        const timer = setInterval(() => {
            if (document.body) {
                insert24FireButton();
                clearInterval(timer);
            }
            if (++tries > 30) clearInterval(timer);
        }, 250);
    })();
}
