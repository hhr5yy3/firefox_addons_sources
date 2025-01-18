// ---------- Default Preference ---------------------------
export let pref = {
  data: []
};
// ---------- /Default Preference --------------------------

// ---------- App ------------------------------------------
export class App {

  // ---------- User Preference ------------------------------
  static getPref() {
    // update pref with the saved version
    return browser.storage.local.get().then(result => {
      Object.keys(result).forEach(item => pref[item] = result[item]);
    });
  }

  // ---------- Helper functions -----------------------------
  static notify(message, title = browser.i18n.getMessage('extensionName'), id = '') {
    browser.notifications.create(id, {
      type: 'basic',
      iconUrl: '/image/icon48.png',
      title,
      message
    });
  }
}