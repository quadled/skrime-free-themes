# 🎨 Custom Themes – Browser Addon & GitHub Themes Hub

Ein modernes Browser-Addon für **[Skrime.eu](https://skrime.eu)**, **[24Fire.de](https://24fire.de)** und weitere Webseiten mit integriertem **automatischem GitHub-Updater**.

Alle Themes werden **nicht im Addon fest einprogrammiert**, sondern dynamisch aus diesem GitHub-Repository (`quadled/skrime-free-themes`) geladen. Sobald du hier ein neues Theme veröffentlichst, erhalten es alle Addon-Nutzer automatisch!

---

## 🚀 Features

- 🌐 **Multi-Site Support:**
  - **Skrime.eu:** Dracula, Matrix, Cyberpunk, Winter, Silvester, Halloween, Minimal Purple, Neon Sunset, Kartoffel, April April.
  - **24Fire.de:** 24Fire Dark Red (spezieller Dark Mode für Einsatzleitzentrale & Sidebar).
  - Erkennt automatisch, auf welcher Seite du bist, und zeigt nur die passenden Themes an!
- 🔄 **Dynamischer GitHub-Updater:**
  - Keine Themes im Addon gebündelt – 100 % Cloud-Synchronisation über GitHub.
  - Aktualisiert Themes im Hintergrund alle 30 Minuten.
  - Manueller *"Auf Updates prüfen"*-Button direkt im Theme-Modal und im Toolbar-Popup.
- 🎨 **Eigene CSS-Dateien & Effekte:**
  - Jedes Theme besitzt eine eigene Datei in `themes/*.css` und eigene Farbvariablen in `themes.json`.
- ⚡ **Zero-Flash Injektion:**
  - Themes werden direkt beim Laden der Seite angewendet, ohne dass die Standardfarben kurz aufblitzen.
- 📱 **Toolbar Popup:**
  - Schneller Wechsel zwischen Webseiten (`skrime.eu` & `24fire.de`), Theme-Auswahl und Update-Status.

---

## 📥 Installation des Browser-Addons

### Google Chrome / Microsoft Edge / Brave / Opera

1. Öffne in deinem Browser:
   - **Chrome:** `chrome://extensions`
   - **Edge:** `edge://extensions`
   - **Brave:** `brave://extensions`
2. Aktiviere oben rechts den **„Entwicklermodus“** (Developer Mode).
3. Klicke auf **„Entpackte Erweiterung laden“** (Load unpacked).
4. Wähle diesen Ordner (`skrime.themes`) aus.
5. Öffne [Skrime.eu](https://skrime.eu) oder [24Fire.de](https://24fire.de)!

---

## 🛠️ Wie füge ich ein neues Theme hinzu?

Themes werden einfach auf GitHub gepusht – das Addon verteilt sie automatisch an alle Nutzer!

### 1. Neue CSS-Datei in `themes/` anlegen
Beispiel: `themes/24fire-blue.css` oder `themes/skrime-emerald.css`:
```css
body.ext-theme-24fire-blue .navbar {
    background-color: #1e3a8a !important;
}
```

### 2. In `themes.json` eintragen
Öffne `themes.json` und füge dein Theme hinzu. Gib mit `"site"` an, für welche Webseite das Theme gedacht ist (`"skrime.eu"` oder `"24fire.de"`):
```json
"24fire-blue": {
  "name": "24Fire Blue Light",
  "author": "QuadLed",
  "site": "24fire.de",
  "icon": "fa-truck-medical",
  "vars": "--ext-bg-main: #0f172a; --ext-accent: #3b82f6;",
  "preview": {
    "bg1": "#1e293b",
    "bg2": "#0f172a",
    "accent": "#3b82f6",
    "accent2": "#60a5fa",
    "text": "#f8fafc"
  },
  "cssFile": "themes/24fire-blue.css"
}
```

### 3. Auf GitHub pushen
```bash
git add .
git commit -m "Neues Theme fuer 24fire hinzugefuegt"
git push
```
Sobald der Commit auf GitHub ist, haben alle Nutzer beim nächsten Start oder beim Klick auf „Auf Updates prüfen“ das neue Theme!

---

## 📂 Repository-Struktur

```
skrime.themes/
├── manifest.json            # Manifest V3 (Custom Themes)
├── background.js            # Background Updater (GitHub Raw Synchronisation)
├── content.js               # Multi-Site Theme Engine (Skrime & 24Fire)
├── popup.html / .css / .js  # Browser-Toolbar Popup
├── themes.json              # Master-Theme-Liste auf GitHub (mit "site"-Zuordnung)
├── themes/                  # Einzelne CSS-Dateien pro Theme
│   ├── 24fire-dark.css      # Theme für 24fire.de
│   ├── minimal-purple.css   # Original theme.css für skrime.eu
│   ├── dracula.css          # Dracula für skrime.eu
│   ├── matrix.css           # Matrix für skrime.eu
│   └── ...                  # Cyberpunk, Winter, Halloween, Silvester, etc.
└── icons/                   # Addon-Icons
```

---

## 🌐 Auf GitHub hochladen

```bash
cd c:\Users\richt\Desktop\skrime.themes
git add .
git commit -m "Custom Themes: Multi-Site fuer skrime.eu und 24fire.de"
git push -u origin main
```
