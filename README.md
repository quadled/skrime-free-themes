# 🎨 Skrime Free Themes & Browser Addon

Ein modernes Browser-Addon für **[Skrime.eu](https://skrime.eu)** mit integriertem **automatischem GitHub-Updater**.

Alle Themes aus diesem Repository (`quadled/skrime-free-themes`) werden automatisch an alle Benutzer des Addons verteilt. Sobald du ein neues Theme auf GitHub veröffentlichst oder ein bestehendes anpasst, haben es alle Nutzer sofort verfügbar!

---

## 🚀 Features

- 🔄 **Automatischer GitHub-Updater:**
  - Gleicht Themes im Hintergrund alle 30 Minuten mit dem GitHub-Repository ab.
  - Prüft beim Öffnen von Skrime.eu automatisch auf Updates.
  - Manueller *"Auf Updates prüfen"*-Button direkt im Theme-Modal auf Skrime und im Popup.
- 🎨 **Community-Themes:**
  - Jedes Theme kann eigene Farben (CSS-Variablen), eigene CSS-Regeln (`.css`-Dateien) und animierte Canvas-Effekte (z. B. Schneefall, Matrix-Regen) besitzen.
- ⚡ **Zero-Flash Theme Injection:**
  - Lädt Themes direkt beim Seitenaufbau ohne weißes Aufblitzen.
- 🛡️ **Offline & Fallback-Schutz:**
  - Eingebaute Standard-Themes (Dracula, Matrix, Cyberpunk, Winter, Minimal Purple etc.) funktionieren immer, auch wenn GitHub offline ist.
- 📱 **Browser Action Popup:**
  - Schneller Theme-Wechsler und Update-Status direkt in der Browser-Symbolleiste.

---

## 📥 Installation des Browser-Addons

### Google Chrome / Microsoft Edge / Brave / Opera

1. Lade diesen Ordner herunter oder klone das Repository.
2. Öffne in deinem Browser die Erweiterungs-Verwaltung:
   - **Chrome:** `chrome://extensions`
   - **Edge:** `edge://extensions`
   - **Brave:** `brave://extensions`
3. Aktiviere oben rechts den **„Entwicklermodus“** (Developer Mode).
4. Klicke auf **„Entpackte Erweiterung laden“** (Load unpacked).
5. Wähle diesen Ordner (`skrime.themes`) aus.
6. Fertig! Öffne jetzt [Skrime.eu](https://skrime.eu) oder klicke auf das Addon-Icon in deiner Toolbar.

---

## 🛠️ Wie füge ich ein neues Theme hinzu? (Für Entwickler & Ersteller)

Wenn du ein neues Theme erstellst, damit **alle Nutzer es automatisch bekommen**, sind nur **zwei Schritte** nötig:

### 1. CSS-Datei anlegen (optional, falls Spezial-CSS nötig ist)
Erstelle eine neue CSS-Datei im Ordner `themes/`, z. B. `themes/emerald.css`:
```css
/* Spezifische Styles für dein Theme */
body.ext-theme-emerald .card {
    border-color: #00e676 !important;
    box-shadow: 0 0 15px rgba(0, 230, 118, 0.3) !important;
}
```

### 2. Theme in `themes.json` eintragen
Öffne die Datei `themes.json` und füge dein Theme unter `"themes"` hinzu:
```json
"emerald": {
  "name": "Emerald Theme",
  "author": "DeinName",
  "icon": "fa-gem",
  "effect": null,
  "vars": "--ext-bg-main: #06140d; --ext-bg-card: #0c2419; --ext-border: #144d32; --ext-text: #e0f2f1; --ext-text-muted: #80cbc4; --ext-accent: #00e676; --ext-accent-text: #06140d; --ext-accent2: #00b0ff; --ext-glow: rgba(0, 230, 118, 0.4);",
  "preview": {
    "bg1": "#0c2419",
    "bg2": "#06140d",
    "accent": "#00e676",
    "accent2": "#00b0ff",
    "text": "#e0f2f1"
  },
  "cssFile": "themes/emerald.css"
}
```

### 3. Auf GitHub pushen
```bash
git add .
git commit -m "Add Emerald Theme"
git push
```

**Das war's!** 
Jeder Nutzer, der das Addon installiert hat, erhält beim nächsten Öffnen von Skrime.eu oder beim Klick auf *"Auf Updates prüfen"* automatisch das neue Theme!

---

## 📂 Projektstruktur

```
skrime.themes/
├── manifest.json            # Manifest V3 Konfiguration
├── background.js            # Background Service Worker (Automatischer GitHub-Updater)
├── content.js               # Content Script für Skrime.eu (Theme-Injektion & Modal-UI)
├── popup.html / .css / .js  # Browser-Toolbar Popup (Schnellwechsler & Updater)
├── themes.json              # Master-Theme-Verzeichnis für GitHub
├── themes/                  # Modulare CSS-Dateien der Themes
│   ├── minimal-purple.css   # Minimal Purple (Original theme.css)
│   └── neon-sunset.css      # Neon Sunset Theme
├── icons/                   # Addon-Icons (16x16, 48x48, 128x128)
└── README.md                # Dokumentation
```

---

## 🌐 Erstmaliges Hochladen auf GitHub

Falls das Repository `https://github.com/quadled/skrime-free-themes` noch leer ist:

```bash
cd c:\Users\richt\Desktop\skrime.themes
git init
git remote add origin https://github.com/quadled/skrime-free-themes.git
git branch -M main
git add .
git commit -m "Initial commit: Skrime Free Themes mit Auto-Updater"
git push -u origin main
```

---

## 💡 Lizenz & Credits

Erstellt mit ❤️ für die **Skrime-Community** von **QuadLed**.
Website: [Skrime.eu](https://skrime.eu)
Repository: [quadled/skrime-free-themes](https://github.com/quadled/skrime-free-themes)
