// =====================================================================
// CUSTOM THEMES - POPUP CONTROLLER
// Unterstützt skrime.eu und 24fire.de mit dynamischen GitHub-Themes
// =====================================================================

function formatRelativeTime(timestamp) {
  if (!timestamp) return "Noch nie geprüft";
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return "Gerade eben";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `Vor ${diffMin} Min.`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `Vor ${diffHours} Std.`;
  return new Date(timestamp).toLocaleDateString("de-DE");
}

document.addEventListener("DOMContentLoaded", async () => {
  const siteSelect = document.getElementById("site-select");
  const themeSelect = document.getElementById("theme-select");
  const activeNameEl = document.getElementById("active-theme-name");
  const colorDotEl = document.getElementById("theme-color-dot");
  const themeCountBadge = document.getElementById("theme-count-badge");
  const lastSyncTimeEl = document.getElementById("last-sync-time");
  const btnCheckUpdates = document.getElementById("btn-check-updates");
  const updateSpinner = document.getElementById("update-spinner");
  const updateBtnText = document.getElementById("update-btn-text");
  const statusMsgEl = document.getElementById("update-status-msg");
  const siteLabel = document.getElementById("current-theme-site-label");

  let allThemes = {};
  let currentSite = "skrime.eu";

  // 1. Automatisch aktive Seite anhand des aktuellen Tabs erkennen
  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab && activeTab.url) {
      if (activeTab.url.includes("24fire.de")) {
        currentSite = "24fire.de";
        siteSelect.value = "24fire.de";
      } else if (activeTab.url.includes("skrime.eu")) {
        currentSite = "skrime.eu";
        siteSelect.value = "skrime.eu";
      }
    }
  } catch (e) {}

  function getStorageKeyForSite(site) {
    return site === "24fire.de" ? "selected_theme_24fire" : "selectedSkrimeTheme";
  }

  async function loadState() {
    const data = await chrome.storage.local.get([
      "selectedSkrimeTheme",
      "selected_theme_24fire",
      "skrime_remote_themes",
      "skrime_last_sync"
    ]);

    let remote = data.skrime_remote_themes || {};

    // Wenn noch gar keine Themes im Cache sind: automatisch einmal GitHub prüfen
    if (Object.keys(remote).length === 0) {
      themeSelect.innerHTML = "<option>Lade Themes von GitHub...</option>";
      chrome.runtime.sendMessage({ action: "checkForThemeUpdates" }, (res) => {
        if (res && res.success) {
          loadState();
        }
      });
      return;
    }

    allThemes = remote;

    const totalCount = Object.keys(allThemes).length;
    themeCountBadge.textContent = `${totalCount} Themes`;
    lastSyncTimeEl.textContent = formatRelativeTime(data.skrime_last_sync);

    renderSiteThemes();
  }

  async function renderSiteThemes() {
    const storageKey = getStorageKeyForSite(currentSite);
    const data = await chrome.storage.local.get([storageKey]);
    const currentThemeId = data[storageKey] || (currentSite === "24fire.de" ? "default-24fire" : "default");

    siteLabel.textContent = `Aktives Theme (${currentSite}):`;

    // Themes nach ausgewählter Webseite filtern
    const siteThemes = {};
    for (const [id, t] of Object.entries(allThemes)) {
      const themeSite = t.site || "skrime.eu";
      if (themeSite === currentSite) {
        siteThemes[id] = t;
      }
    }

    // Aktive Theme-Vorschau
    const active = siteThemes[currentThemeId] || allThemes[currentThemeId] || { name: "Standard", preview: { accent: "#6c757d" } };
    activeNameEl.textContent = active.name || currentThemeId;
    colorDotEl.style.backgroundColor = (active.preview && active.preview.accent) || "#6c757d";

    // Dropdown füllen
    themeSelect.innerHTML = "";
    const siteThemeIds = Object.keys(siteThemes);

    if (siteThemeIds.length === 0) {
      const opt = document.createElement("option");
      opt.textContent = `Keine Themes für ${currentSite} gefunden`;
      themeSelect.appendChild(opt);
      return;
    }

    for (const [id, t] of Object.entries(siteThemes)) {
      const opt = document.createElement("option");
      opt.value = id;
      opt.textContent = t.name;
      if (id === currentThemeId) opt.selected = true;
      themeSelect.appendChild(opt);
    }
  }

  // Webseite im Dropdown gewechselt
  siteSelect.addEventListener("change", (e) => {
    currentSite = e.target.value;
    renderSiteThemes();
  });

  // Theme wechseln
  themeSelect.addEventListener("change", async (e) => {
    const newThemeId = e.target.value;
    if (!newThemeId) return;

    const storageKey = getStorageKeyForSite(currentSite);
    await chrome.storage.local.set({ [storageKey]: newThemeId });

    const theme = allThemes[newThemeId] || { name: newThemeId, preview: { accent: "#6c757d" } };
    activeNameEl.textContent = theme.name;
    colorDotEl.style.backgroundColor = (theme.preview && theme.preview.accent) || "#6c757d";

    // Relevante Tabs neu laden
    const urlPattern = currentSite === "24fire.de" ? "*://*.24fire.de/*" : "*://*.skrime.eu/*";
    const tabs = await chrome.tabs.query({ url: [urlPattern] });
    for (const tab of tabs) {
      chrome.tabs.reload(tab.id);
    }
  });

  // Auf Updates prüfen
  btnCheckUpdates.addEventListener("click", () => {
    btnCheckUpdates.disabled = true;
    updateSpinner.classList.add("spin");
    updateBtnText.textContent = "Prüfe GitHub...";
    statusMsgEl.style.display = "none";

    chrome.runtime.sendMessage({ action: "checkForThemeUpdates" }, (response) => {
      btnCheckUpdates.disabled = false;
      updateSpinner.classList.remove("spin");
      updateBtnText.textContent = "Auf Updates prüfen";

      if (response && response.success) {
        statusMsgEl.className = "status-msg success";
        statusMsgEl.style.display = "block";
        const newCount = response.newThemesCount || 0;
        statusMsgEl.textContent = newCount > 0 
          ? `🎉 ${newCount} neue(s) Theme(s) geladen!` 
          : `✅ Themes sind aktuell (${response.totalCount} bereit)`;
        loadState();
      } else {
        statusMsgEl.className = "status-msg error";
        statusMsgEl.style.display = "block";
        statusMsgEl.textContent = response && response.error 
          ? `Fehler: ${response.error}` 
          : "GitHub nicht erreichbar.";
      }
    });
  });

  await loadState();
});
