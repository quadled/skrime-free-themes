// =====================================================================
// SKRIME THEMES - BACKGROUND UPDATER SERVICE WORKER
// Verwaltet automatische Theme-Updates von GitHub (quadled/skrime-free-themes)
// =====================================================================

const GITHUB_USER = "quadled";
const GITHUB_REPO = "skrime-free-themes";
const BRANCHES = ["main", "master"];
const THEMES_JSON_PATH = "themes.json";
const ALARM_NAME = "skrime_theme_update_check";
const UPDATE_INTERVAL_MINUTES = 30; // Alle 30 Minuten im Hintergrund prüfen

// Hilfsfunktion: Datei von GitHub Raw abrufen (mit Branch-Fallback & Cache-Busting)
async function fetchRawFile(filePath) {
    for (const branch of BRANCHES) {
        const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${branch}/${filePath}?_ts=${Date.now()}`;
        try {
            const response = await fetch(url, {
                cache: "no-store",
                headers: { "Accept": "application/json, text/plain, */*" }
            });
            if (response.ok) {
                return await response.text();
            }
        } catch (e) {
            // Nächsten Branch probieren
        }
    }
    throw new Error(`Konnte "${filePath}" weder auf 'main' noch auf 'master' finden.`);
}

// Hauptfunktion: Auf Updates prüfen & neue Themes herunterladen
async function checkForThemeUpdates(isManual = false) {
    console.log(`[Skrime Updater] Suche nach Theme-Updates auf GitHub (${GITHUB_USER}/${GITHUB_REPO})...`);

    try {
        // 1. themes.json von GitHub abrufen
        const rawJsonText = await fetchRawFile(THEMES_JSON_PATH);
        let parsedData;
        try {
            parsedData = JSON.parse(rawJsonText);
        } catch (jsonErr) {
            throw new Error("themes.json auf GitHub enthält ungültiges JSON: " + jsonErr.message);
        }

        const remoteThemes = parsedData.themes || {};
        const remoteVersion = parsedData.version || "1.0.0";
        const themeIds = Object.keys(remoteThemes);

        if (themeIds.length === 0) {
            throw new Error("themes.json enthält keine Themes.");
        }

        // 2. Aktuell gespeicherte Themes abrufen
        const storage = await chrome.storage.local.get(["skrime_remote_themes", "skrime_remote_version"]);
        const existingThemes = storage.skrime_remote_themes || {};

        let newThemesCount = 0;
        let updatedThemesCount = 0;

        // 3. Für jedes Theme prüfen, ob eine externe CSS-Datei geladen werden muss
        for (const [id, themeData] of Object.entries(remoteThemes)) {
            // Wenn eine cssFile angegeben ist und noch kein inline-css vorhanden ist
            if (themeData.cssFile && !themeData.css) {
                try {
                    const cssContent = await fetchRawFile(themeData.cssFile);
                    themeData.css = cssContent;
                } catch (cssErr) {
                    console.warn(`[Skrime Updater] CSS für Theme "${id}" (${themeData.cssFile}) konnte nicht geladen werden:`, cssErr);
                }
            }

            if (!existingThemes[id]) {
                newThemesCount++;
            } else if (JSON.stringify(existingThemes[id]) !== JSON.stringify(themeData)) {
                updatedThemesCount++;
            }
        }

        // 4. In chrome.storage.local speichern
        const now = Date.now();
        await chrome.storage.local.set({
            skrime_remote_themes: remoteThemes,
            skrime_remote_version: remoteVersion,
            skrime_last_sync: now,
            skrime_sync_status: {
                success: true,
                totalCount: themeIds.length,
                newThemesCount: newThemesCount,
                updatedThemesCount: updatedThemesCount,
                lastChecked: now,
                version: remoteVersion,
                error: null
            }
        });

        console.log(`[Skrime Updater] Update erfolgreich! ${themeIds.length} Themes bereit (${newThemesCount} neu, ${updatedThemesCount} aktualisiert).`);

        // 5. Offene Tabs benachrichtigen (Skrime & 24Fire)
        try {
            const tabs = await chrome.tabs.query({ 
                url: [
                    "*://*.skrime.eu/*", 
                    "*://skrime.eu/*",
                    "*://*.24fire.de/*",
                    "*://24fire.de/*"
                ] 
            });
            for (const tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {
                    action: "themesUpdated",
                    totalCount: themeIds.length,
                    newThemesCount: newThemesCount,
                    version: remoteVersion
                }).catch(() => {});
            }
        } catch (e) {
            // Tabs benachrichtigen ist optional
        }

        return {
            success: true,
            totalCount: themeIds.length,
            newThemesCount: newThemesCount,
            updatedThemesCount: updatedThemesCount,
            version: remoteVersion
        };
    } catch (err) {
        console.warn("[Skrime Updater] Fehler bei Update-Prüfung:", err.message);

        const now = Date.now();
        await chrome.storage.local.set({
            skrime_last_sync: now,
            skrime_sync_status: {
                success: false,
                lastChecked: now,
                error: err.message
            }
        });

        return {
            success: false,
            error: err.message
        };
    }
}

// ---------------------------------------------------------------------
// Extension Lifecycle Events
// ---------------------------------------------------------------------

// Bei Installation / Addon-Update: Alarm erstellen & erste Prüfung
chrome.runtime.onInstalled.addListener((details) => {
    console.log("[Skrime Updater] Addon installiert/aktualisiert:", details.reason);

    // Periodischen Alarm anlegen
    chrome.alarms.create(ALARM_NAME, {
        periodInMinutes: UPDATE_INTERVAL_MINUTES
    });

    // Erste Prüfung im Hintergrund
    checkForThemeUpdates(false);
});

// Bei Browser-Start: prüfen, ob letzter Sync > 30 Min her ist
chrome.runtime.onStartup.addListener(async () => {
    const data = await chrome.storage.local.get(["skrime_last_sync"]);
    const lastSync = data.skrime_last_sync || 0;
    if (Date.now() - lastSync > UPDATE_INTERVAL_MINUTES * 60 * 1000) {
        checkForThemeUpdates(false);
    }
});

// Wenn der Alarm feuert
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        checkForThemeUpdates(false);
    }
});

// ---------------------------------------------------------------------
// Message Listener (Kommunikation mit Content Script & Popup)
// ---------------------------------------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkForThemeUpdates") {
        checkForThemeUpdates(true).then(result => {
            sendResponse(result);
        });
        return true; // Wichtig: asynchrone Antwort signalisieren
    }

    if (request.action === "getSyncStatus") {
        chrome.storage.local.get(["skrime_sync_status", "skrime_last_sync", "skrime_remote_themes", "skrime_remote_version"], (data) => {
            sendResponse({
                status: data.skrime_sync_status || null,
                lastSync: data.skrime_last_sync || null,
                themeCount: Object.keys(data.skrime_remote_themes || {}).length,
                version: data.skrime_remote_version || "1.0.0"
            });
        });
        return true;
    }
});
