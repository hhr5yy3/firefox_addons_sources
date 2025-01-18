import { a as $STR } from "./DollarPolyfills-DiqWGOUq.js";
import { c as configManager, K as KeeLog } from "./ConfigManager-DadTRJhU.js";
import { s as setup } from "./i18n-CWi2JcO5.js";
class SrpDialog {
  setupPage() {
    document.getElementById(
      "pref_sl_server"
    ).value = configManager.current.connSLServerMin.toString();
    document.getElementById("pref_sl_client_high").checked = configManager.current.connSLClient === 3 ? true : null;
    document.getElementById("password").addEventListener("keyup", () => {
      this.updateButtonState();
    });
    document.getElementById("pref_sl_server").addEventListener(
      "change",
      () => {
        this.updateButtonState();
      }
    );
    document.getElementById("pref_sl_client_high").addEventListener(
      "change",
      () => {
        this.updateButtonState();
      }
    );
    document.getElementById("ok").addEventListener("click", this.primaryButtonClicked.bind(this));
    document.getElementById("form").addEventListener(
      "submit",
      ((event) => {
        event.preventDefault();
        this.primaryButtonClicked();
      }).bind(this)
    );
    window.addEventListener(
      "beforeunload",
      () => chrome.runtime.sendMessage({ action: "SRP_ok", password: "" })
    );
  }
  updateButtonState() {
    const passwordSet = document.getElementById("password").value.length > 0;
    const settingsChanged = this.settingsChanged();
    if (passwordSet && settingsChanged) {
      document.getElementById("ok").textContent = $STR("srp_save_connect");
      document.getElementById("ok").disabled = null;
    } else if (passwordSet && !settingsChanged) {
      document.getElementById("ok").textContent = $STR("srp_connect");
      document.getElementById("ok").disabled = null;
    } else if (!passwordSet && settingsChanged) {
      document.getElementById("ok").textContent = $STR("save");
      document.getElementById("ok").disabled = null;
    } else {
      document.getElementById("ok").textContent = $STR("srp_connect");
      document.getElementById("ok").disabled = true;
    }
  }
  primaryButtonClicked() {
    const password = document.getElementById("password");
    if (this.settingsChanged()) {
      const clientHigh = document.getElementById("pref_sl_client_high");
      const serverSL = document.getElementById("pref_sl_server");
      configManager.current.connSLClient = clientHigh.checked ? 3 : 2;
      configManager.current.connSLServerMin = parseInt(serverSL.value);
      configManager.save().then(this.continueSRP.bind(this, password.value));
    } else {
      this.continueSRP(password.value);
    }
  }
  settingsChanged() {
    const clientHigh = document.getElementById("pref_sl_client_high");
    const serverSL = document.getElementById("pref_sl_server");
    const clientHighPrevious = configManager.current.connSLClient === 3;
    return clientHigh.checked !== clientHighPrevious || serverSL.value !== configManager.current.connSLServerMin.toString();
  }
  async continueSRP(password) {
    const tab = await chrome.tabs.getCurrent();
    chrome.runtime.sendMessage({
      action: "SRP_ok",
      password
    });
    await chrome.tabs.remove(tab.id);
  }
}
let srp;
async function setupPage() {
  await configManager.load();
  KeeLog.attachConfig(configManager.current);
  srp = new SrpDialog();
  srp.setupPage();
  document.getElementById("i18n_root").style.display = "block";
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", async () => await setupPage());
} else {
  (async () => {
    await setupPage();
  })();
}
setup();
//# sourceMappingURL=srp-DBzuObQH.js.map
