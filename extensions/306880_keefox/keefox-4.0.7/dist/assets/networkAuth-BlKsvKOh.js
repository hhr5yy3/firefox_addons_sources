import { c as $STRF, a as $STR } from "./DollarPolyfills-DiqWGOUq.js";
import { c as configManager, K as KeeLog } from "./ConfigManager-DadTRJhU.js";
import { a as Entry } from "./Entry-B0M4TtnG.js";
import { s as setup } from "./i18n-CWi2JcO5.js";
class NetworkAuth {
  setupPage(entries, realm, url, isProxy) {
    const instructions = isProxy ? $STRF("network_auth_proxy_description", [url]) : $STRF("network_auth_http_auth_description", [url, realm]);
    document.getElementById("network_auth_instructions").textContent = instructions;
    this.createNearNode(document.getElementById("network_auth_choose"), entries);
  }
  async supplyNetworkAuth(entryIndex) {
    const tab = await chrome.tabs.getCurrent();
    await chrome.runtime.sendMessage({
      action: "NetworkAuth_ok",
      selectedEntryIndex: entryIndex
    });
    await chrome.tabs.remove(tab.id);
  }
  createNearNode(node, entries) {
    const container = document.createElement("div");
    container.id = "Kee-MatchedLoginsList";
    const list = document.createElement("ul");
    this.setLogins(entries, list);
    container.appendChild(list);
    node.parentNode.insertBefore(container, node.nextSibling);
    list.firstChild.focus();
  }
  setLogins(entries, container) {
    KeeLog.debug("setting " + entries.length + " matched entries");
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      let usernameDisplayValue = "[" + $STR("noUsername_partial_tip") + "]";
      const displayGroupPath = entry.database.name + "/" + entry.parentGroup.path;
      const usernameField = Entry.getUsernameField(entry);
      if (usernameField && usernameField.value) {
        usernameDisplayValue = usernameField.value;
      }
      const loginItem = document.createElement("li");
      loginItem.className = "";
      loginItem.style.backgroundImage = "url(data:image/png;base64," + entry.icon.iconImageData + ")";
      loginItem.dataset.filename = entry.database.fileName;
      loginItem.dataset.formIndex = entry.formIndex != null ? entry.formIndex.toString() : "";
      loginItem.dataset.entryIndex = i.toString();
      loginItem.dataset.uuid = entry.uuid;
      loginItem.title = $STRF("matchedLogin_tip", [
        entry.title,
        displayGroupPath,
        usernameDisplayValue
      ]);
      loginItem.tabIndex = i == 0 ? 0 : -1;
      loginItem.textContent = $STRF("matchedLogin_label", [
        usernameDisplayValue,
        entry.title
      ]);
      loginItem.addEventListener("keydown", this.keyboardNavHandler, false);
      loginItem.addEventListener(
        "click",
        function(event) {
          event.stopPropagation();
          if (event.button == 0 || event.button == 1) {
            this.dispatchEvent(new Event("keeCommand"));
          }
        },
        false
      );
      loginItem.addEventListener(
        "keeCommand",
        function() {
          networkAuth.supplyNetworkAuth(parseInt(this.dataset.entryIndex));
        },
        false
      );
      container.appendChild(loginItem);
    }
  }
  keyboardNavHandler(event) {
    const target = event.target;
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        event.stopPropagation();
        target.dispatchEvent(new Event("keeCommand"));
        break;
      case 40:
        event.preventDefault();
        event.stopPropagation();
        if (target.nextElementSibling) {
          target.nextElementSibling.focus();
        }
        break;
      case 38:
        event.preventDefault();
        event.stopPropagation();
        if (target.previousElementSibling) {
          target.previousElementSibling.focus();
        }
        break;
      case 27:
        event.preventDefault();
        event.stopPropagation();
        window.close();
        break;
    }
  }
}
let networkAuth;
async function setupNetworkAuthDialog() {
  await configManager.load();
  KeeLog.attachConfig(configManager.current);
  networkAuth = new NetworkAuth();
  chrome.runtime.onMessage.addListener((message) => {
    if (message && message.action && message.action === "NetworkAuth_matchedEntries") {
      networkAuth.setupPage(message.entries, message.realm, message.url, message.isProxy);
    }
  });
  chrome.runtime.sendMessage({ action: "NetworkAuth_load" });
  document.getElementById("i18n_root").style.display = "block";
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", async () => await setupNetworkAuthDialog());
} else {
  (async () => {
    await setupNetworkAuthDialog();
  })();
}
setup();
//# sourceMappingURL=networkAuth-BlKsvKOh.js.map
