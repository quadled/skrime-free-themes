// =====================================================================
// SKRIME THEMES - POPUP CONTROLLER
// =====================================================================

const DEFAULT_THEMES = {
  "default": { name: "Skrime Standard", accent: "#6c757d" },
  "dracula": { name: "Dracula Theme", accent: "#ff79c6" },
  "matrix": { name: "Matrix Theme", accent: "#00ff41" },
  "cyberpunk": { name: "Cyberpunk", accent: "#ff2bd6" },
  "christmas": { name: "Winter Theme", accent: "#7fd4ff" },
  "silvester": { name: "Silvester Theme", accent: "#ffd54a" },
  "halloween": { name: "Halloween Theme", accent: "#ff7a1a" },
  "aprilscherz": { name: "April, April!", accent: "#00ffff" },
  "kartoffel": { name: "Kartoffel Theme", accent: "#d9a441" },
  "minimal-purple": { name: "Minimal Purple", accent: "#bb86fc" }
};

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
  const themeSelect = document.getElementById("theme-select");
  const activeNameEl = document.getElementById("active-theme-name");
  const colorDotEl = document.getElementById("theme-color-dot");
  const themeCountBadge = document.getElementById("theme-count-badge");
  const lastSyncTimeEl = document.getElementById("last-sync-time");
  const btnCheckUpdates = document.getElementById("btn-check-updates");
  const updateSpinner = document.getElementById("update-spinner");
  const updateBtnText = document.getElementById("update-btn-text");
  const statusMsgEl = document.getElementById("update-status-msg");

  let allThemes = {};

  async function loadState() {
    const data = await chrome.storage.local.get([
      "selectedSkrimeTheme",
      "skrime_remote_themes",
      "skrime_last_sync",
      "skrime_sync_status"
    ]);

    const remote = data.skrime_remote_themes || {};
    allThemes = Object.assign({}, DEFAULT_THEMES);

    // Merge remote themes
    for (const [id, t] of Object.entries(remote)) {
      allThemes[id] = {
        name: t.name || id,
        accent: (t.preview && t.preview.accent) || "#bb86fc",
        isRemote: true
      };
    }

    const currentThemeId = data.selectedSkrimeTheme || "default";
    const totalCount = Object.keys(allThemes).length;
    themeCountBadge.textContent = `${totalCount} Themes`;
    lastSyncTimeEl.textContent = formatRelativeTime(data.skrime_last_sync);

    // Update active card
    const active = allThemes[currentThemeId] || { name: currentThemeId, accent: "#6c757d" };
    activeNameEl.textContent = active.name;
    colorDotEl.style.backgroundColor = active.accent;

    // Populate dropdown
    themeSelect.innerHTML = "";
    for (const [id, t] of Object.entries(allThemes)) {
      const opt = document.createElement("option");
      opt.value = id;
      opt.textContent = t.isRemote ? `${t.name} (GitHub)` : t.name;
      if (id === currentThemeId) opt.selected = true;
      themeSelect.appendChild(opt);
    }
  }

  // Theme Wechseln
  themeSelect.addEventListener("change", async (e) => {
    const newThemeId = e.target.value;
    await chrome.storage.local.set({ selectedSkrimeTheme: newThemeId });
    const theme = allThemes[newThemeId] || { name: newThemeId, accent: "#6c757d" };
    activeNameEl.textContent = theme.name;
    colorDotEl.style.backgroundColor = theme.accent;

    // Versuche aktuelle Skrime-Tabs zu reloaden
    const tabs = await chrome.tabs.query({ url: ["*://*.skrime.eu/*", "*://skrime.eu/*"] });
    for (const tab of tabs) {
      chrome.tabs.reload(tab.id);
    }
  });

  // Auf Updates prüfen Button
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
