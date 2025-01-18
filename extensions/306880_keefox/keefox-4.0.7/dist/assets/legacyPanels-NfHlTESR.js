import { a as $STR, c as $STRF } from "./DollarPolyfills-DiqWGOUq.js";
import { c as copyStringToClipboard } from "./copyStringToClipboard-BshAkhz6.js";
import { K as KeeLog, c as configManager } from "./ConfigManager-DadTRJhU.js";
import { A as Action } from "./Action-nSgaiNub.js";
import { a as Entry, F as Field } from "./Entry-B0M4TtnG.js";
import { s as setup } from "./i18n-CWi2JcO5.js";
import { d as defaults, a as addNotification, r as removeFieldFromActiveEntry, u as updateActiveKeePassDatabaseIndex, b as updateConnected, c as updateConnectedWebsocket, e as updateCurrentSearchTerm, f as updateEntryUpdateStartedAtTimestamp, g as updateGeneratedPassword, h as updateKeePassDatabases, i as updateLastKeePassRPCRefresh, j as updateLatestConnectionError, k as updateLoginsFound, l as updateNotifications, m as updatePasswordProfiles, n as updateSaveEntryResult, o as updateSaveState, p as updateSearchResultWithFullDetails, q as updateSearchResults, s as updateSubmittedData, M as Mutation, S as SaveState, P as Port } from "./mutation-types-BIvNkZ3d.js";
import "./index-D6ogrY8Q.js";
class MatchedLoginsPanel {
  constructor(myPort, closePanel2, parentFrameId2) {
    this.myPort = myPort;
    this.closePanel = closePanel2;
    this.parentFrameId = parentFrameId2;
  }
  createNearNode(node, entries) {
    const container = document.createElement("div");
    container.id = "Kee-MatchedLoginsList";
    const list = document.createElement("ul");
    this.setLogins(entries, list);
    container.appendChild(list);
    node.parentNode.insertBefore(container, node.nextSibling);
    return container;
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
      loginItem.dataset.formIndex = entry.formIndex.toString();
      loginItem.dataset.entryIndex = entry.entryIndex.toString();
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
      const loginContextActions = this.createContextActions(entry);
      loginItem.appendChild(loginContextActions);
      loginItem.addEventListener("keydown", (e) => this.keyboardNavHandler(e), false);
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
        "contextmenu",
        (event) => {
          event.stopPropagation();
          event.preventDefault();
          this.showContextActions(loginContextActions);
        },
        false
      );
      loginItem.addEventListener(
        "keeCommand",
        (event) => {
          this.myPort.postMessage({
            action: Action.ManualFill,
            selectedEntryIndex: event.currentTarget.dataset.entryIndex,
            frameId: this.parentFrameId
          });
        },
        false
      );
      loginItem.addEventListener("mouseenter", (e) => this.onMouseEnterLogin(e), false);
      loginItem.addEventListener("mouseleave", (e) => this.onMouseLeaveLogin(e), false);
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
        this.closePanel();
        break;
      case 93:
        event.preventDefault();
        event.stopPropagation();
        target.dispatchEvent(new Event("contextmenu"));
        break;
    }
  }
  showContextActions(element) {
    element.classList.remove("disabled");
    element.classList.add("enabled");
  }
  createContextActions(entry) {
    const loginContextActions = document.createElement("div");
    loginContextActions.classList.add("disabled");
    const editButton = document.createElement("button");
    editButton.textContent = $STR("Logins_Context_Edit_Login_label");
    editButton.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.myPort.postMessage({
          loginEditor: {
            uuid: entry.uuid,
            DBfilename: entry.database.fileName
          }
        });
        this.myPort.postMessage({
          action: Action.CloseAllPanels
        });
      },
      false
    );
    editButton.addEventListener("keydown", (event) => {
      if (event.keyCode === 13)
        editButton.click();
    });
    loginContextActions.appendChild(editButton);
    const otherFieldCount = entry.fields.filter((f) => f.type !== "password").length ?? 0;
    const usernameField = Entry.getUsernameField(entry);
    const passwordFieldCount = entry.fields.filter((f) => f.type === "password").length ?? 0;
    const passwordField = Entry.getPasswordField(entry);
    if (usernameField != null) {
      const button = document.createElement("button");
      button.textContent = $STR("copy_username_label");
      button.addEventListener(
        "click",
        async (event) => {
          event.stopPropagation();
          event.preventDefault();
          await copyStringToClipboard(usernameField.value);
          this.myPort.postMessage({
            action: Action.CloseAllPanels
          });
        },
        false
      );
      button.addEventListener("keydown", (event) => {
        if (event.keyCode === 13)
          button.click();
      });
      loginContextActions.appendChild(button);
    }
    if (passwordField != null) {
      const button = document.createElement("button");
      button.textContent = $STR("copy_password_label");
      button.addEventListener(
        "click",
        async (event) => {
          event.stopPropagation();
          event.preventDefault();
          await copyStringToClipboard(passwordField.value);
          this.myPort.postMessage({
            action: Action.CloseAllPanels
          });
        },
        false
      );
      button.addEventListener("keydown", (event) => {
        if (event.keyCode === 13)
          button.click();
      });
      loginContextActions.appendChild(button);
    }
    if (otherFieldCount > 1) {
      entry.fields.filter((f) => f.type !== "password").forEach((o, i) => {
        if (i != 0 && o.locators[0].type != "checkbox") {
          const button = document.createElement("button");
          button.textContent = $STR("copy") + " " + o.name + " (" + o.locators[0].id + ")";
          button.addEventListener(
            "click",
            async (event) => {
              event.stopPropagation();
              event.preventDefault();
              await copyStringToClipboard(o.value);
              this.myPort.postMessage({
                action: Action.CloseAllPanels
              });
            },
            false
          );
          button.addEventListener("keydown", (event) => {
            if (event.keyCode === 13)
              button.click();
          });
          loginContextActions.appendChild(button);
        }
      });
    }
    if (passwordFieldCount > 1) {
      entry.fields.filter((f) => f.type === "password").forEach((p, i) => {
        if (i != 0) {
          const button = document.createElement("button");
          button.textContent = $STR("copy") + " " + p.name + " (" + p.locators[0].id + ")";
          button.addEventListener(
            "click",
            async (event) => {
              event.stopPropagation();
              event.preventDefault();
              await copyStringToClipboard(p.value);
              this.myPort.postMessage({
                action: Action.CloseAllPanels
              });
            },
            false
          );
          button.addEventListener("keydown", (event) => {
            if (event.keyCode === 13)
              button.click();
          });
          loginContextActions.appendChild(button);
        }
      });
    }
    return loginContextActions;
  }
  onMouseEnterLogin(event) {
    const optionsMenuTrigger = document.createElement("div");
    optionsMenuTrigger.addEventListener(
      "click",
      (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        this.showContextActions(
          evt.currentTarget.parentElement.getElementsByTagName("div")[0]
        );
      },
      false
    );
    optionsMenuTrigger.setAttribute("id", "Kee-optionsMenuTrigger");
    event.target.appendChild(optionsMenuTrigger);
  }
  onMouseLeaveLogin(event) {
    const optionsMenuTrigger = document.getElementById("Kee-optionsMenuTrigger");
    event.target.removeChild(optionsMenuTrigger);
  }
}
setup();
function undefAbort(payload) {
  if (payload === void 0) {
    throw new Error(
      "FATAL! undefined value sent to commit that must never set an undefined value. No-one knows what will happen now but Kee is probably broken in some way until a browser restart."
    );
  }
}
class NonReactiveStore {
  constructor(distributeAction) {
    this.distributeAction = distributeAction;
    this._state = defaults;
  }
  get state() {
    return this._state;
  }
  onRemoteMessage(sourcePort, mutation) {
    if (mutation.type === addNotification) {
      this.addNotification(mutation.payload, false);
    } else if (mutation.type === removeFieldFromActiveEntry) {
      this.removeFieldFromActiveEntry(mutation.payload, false);
    } else if (mutation.type === updateActiveKeePassDatabaseIndex) {
      this.updateActiveKeePassDatabaseIndex(mutation.payload, false);
    } else if (mutation.type === updateConnected) {
      this.updateConnected(mutation.payload, false);
    } else if (mutation.type === updateConnectedWebsocket) {
      this.updateConnectedWebsocket(mutation.payload, false);
    } else if (mutation.type === updateCurrentSearchTerm) {
      this.updateCurrentSearchTerm(mutation.payload, false);
    } else if (mutation.type === updateEntryUpdateStartedAtTimestamp) {
      this.updateEntryUpdateStartedAtTimestamp(mutation.payload, false);
    } else if (mutation.type === updateGeneratedPassword) {
      this.updateGeneratedPassword(mutation.payload, false);
    } else if (mutation.type === updateKeePassDatabases) {
      this.updateKeePassDatabases(mutation.payload, false);
    } else if (mutation.type === updateLastKeePassRPCRefresh) {
      this.updateLastKeePassRPCRefresh(mutation.payload, false);
    } else if (mutation.type === updateLatestConnectionError) {
      this.updateLatestConnectionError(mutation.payload, false);
    } else if (mutation.type === updateLoginsFound) {
      this.updateLoginsFound(mutation.payload, false);
    } else if (mutation.type === updateNotifications) {
      this.updateNotifications(mutation.payload, false);
    } else if (mutation.type === updatePasswordProfiles) {
      this.updatePasswordProfiles(mutation.payload, false);
    } else if (mutation.type === updateSaveEntryResult) {
      this.updateSaveEntryResult(mutation.payload, false);
    } else if (mutation.type === updateSaveState) {
      this.updateSaveState(mutation.payload, false);
    } else if (mutation.type === updateSearchResultWithFullDetails) {
      this.updateSearchResultWithFullDetails(mutation.payload, false);
    } else if (mutation.type === updateSearchResults) {
      this.updateSearchResults(mutation.payload, false);
    } else if (mutation.type === updateSubmittedData) {
      this.updateSubmittedData(mutation.payload, false);
    }
  }
  resetTo(s) {
    this._state = s;
  }
  updateActiveKeePassDatabaseIndex(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.ActiveKeePassDatabaseIndex = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateActiveKeePassDatabaseIndex, payload));
  }
  updateConnected(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.connected = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateConnected, payload));
  }
  updateConnectedWebsocket(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.connectedWebsocket = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateConnectedWebsocket, payload));
  }
  updateCurrentSearchTerm(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.currentSearchTerm = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateCurrentSearchTerm, payload));
  }
  updateKeePassDatabases(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.KeePassDatabases = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateKeePassDatabases, payload));
  }
  updateLastKeePassRPCRefresh(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.lastKeePassRPCRefresh = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateLastKeePassRPCRefresh, payload));
  }
  updateLatestConnectionError(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.latestConnectionError = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateLatestConnectionError, payload));
  }
  updateLoginsFound(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.loginsFound = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateLoginsFound, payload));
  }
  updateNotifications(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.notifications = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateNotifications, payload));
  }
  updatePasswordProfiles(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.PasswordProfiles = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updatePasswordProfiles, payload));
  }
  updateGeneratedPassword(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.generatedPassword = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateGeneratedPassword, payload));
  }
  updateSubmittedData(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    if (!this.state.saveState) {
      this.state.saveState = new SaveState();
    }
    this.state.saveState.submittedData = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateSubmittedData, payload));
  }
  updateSaveState(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.saveState = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateSaveState, payload));
  }
  updateSearchResults(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.searchResults = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateSearchResults, payload));
  }
  updateSearchResultWithFullDetails(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    const id = payload.uuid;
    for (const s of this.state.searchResults) {
      if (s.uuid === id) {
        s.fullDetails = payload;
        break;
      }
    }
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateSearchResultWithFullDetails, payload));
  }
  addNotification(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.notifications.push(payload);
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(addNotification, payload));
  }
  updateSaveEntryResult(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.saveEntryResult = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateSaveEntryResult, payload));
  }
  removeFieldFromActiveEntry(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    const firstTextFieldIndex = this.state.saveState.newEntry.fields.findIndex(
      (f) => f.type === "text"
    );
    const firstPasswordFieldIndex = this.state.saveState.newEntry.fields.findIndex(
      (f) => f.type === "password"
    );
    const originalFieldIndex = this.state.saveState.newEntry.fields.findIndex(
      (f) => f.uuid === payload
    );
    this.state.saveState.newEntry.fields.splice(originalFieldIndex, 1);
    if (originalFieldIndex === firstTextFieldIndex) {
      const newUsernameIndex = this.state.saveState.newEntry.fields.findIndex(
        (f) => f.type === "text"
      );
      if (newUsernameIndex >= 0) {
        const newUsername = this.state.saveState.newEntry.fields.splice(newUsernameIndex, 1)[0];
        this.state.saveState.newEntry.fields.splice(
          originalFieldIndex,
          0,
          new Field({ ...newUsername, name: "KeePass username" })
        );
      }
    } else if (originalFieldIndex === firstPasswordFieldIndex) {
      const newPasswordIndex = this.state.saveState.newEntry.fields.findIndex(
        (f) => f.type === "password"
      );
      if (newPasswordIndex >= 0) {
        const newPassword = this.state.saveState.newEntry.fields.splice(newPasswordIndex, 1)[0];
        this.state.saveState.newEntry.fields.splice(
          originalFieldIndex,
          0,
          new Field({ ...newPassword, name: "KeePass password" })
        );
      }
    }
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(removeFieldFromActiveEntry, payload));
  }
  updateEntryUpdateStartedAtTimestamp(payload, distribute = true) {
    var _a;
    undefAbort(payload);
    this.state.entryUpdateStartedAtTimestamp = payload;
    if (distribute)
      (_a = this.distributeAction) == null ? void 0 : _a.call(this, new Mutation(updateEntryUpdateStartedAtTimestamp, payload));
  }
}
let frameState;
function updateFrameState(newState) {
  frameState = newState;
}
function closePanel() {
  Port.postMessage({ action: Action.CloseAllPanels });
}
let store;
async function start() {
  var _a;
  await configManager.load();
  KeeLog.debug("iframe page starting");
  KeeLog.attachConfig(configManager.current);
  Port.startup("iframe_" + parentFrameId);
  let cancelAutoClose;
  (_a = params["panel"]) == null ? void 0 : _a.endsWith("Legacy");
  switch (params["panel"]) {
    case "matchedLoginsLegacy":
      matchedLoginsPanel = new MatchedLoginsPanel(Port.raw, closePanel, parentFrameId);
      store = new NonReactiveStore((mutationPayload, _excludedPort) => {
        KeeLog.debug("New legacy panel mutation being distributed.");
        Port.postMessage({ mutation: mutationPayload });
      });
      document.getElementById("header").innerText = $STR("matched_logins_label");
      Port.raw.onMessage.addListener(function(m) {
        KeeLog.debug("In iframe script, received message from background script");
        if (m.initialState) {
          store.resetTo(m.initialState);
        }
        if (m.mutation) {
          store.onRemoteMessage(Port.raw, m.mutation);
          return;
        }
        if (m.frameState)
          updateFrameState(m.frameState);
        const mainPanel = matchedLoginsPanel.createNearNode(
          document.getElementById("header"),
          frameState.entries
        );
        window.focus();
        document.getElementById("Kee-MatchedLoginsList").firstChild.firstChild.focus();
        if (cancelAutoClose)
          mainPanel.addEventListener("click", cancelAutoClose);
      });
      break;
  }
  const closeButton = document.createElement("button");
  closeButton.textContent = $STR("close");
  closeButton.addEventListener("click", () => {
    closePanel();
  });
  document.getElementById("closeContainer").appendChild(closeButton);
  if (params["autoCloseTime"]) {
    const autoCloseTime = parseInt(params["autoCloseTime"]);
    if (!Number.isNaN(autoCloseTime) && autoCloseTime > 0) {
      cancelAutoClose = () => {
        clearInterval(autoCloseInterval);
        autoCloseSetting.style.display = "none";
        autoCloseLabel.textContent = $STR("autoclose_cancelled");
      };
      const autoCloseTimerEnd = Date.now() + autoCloseTime * 1e3;
      const autoCloseInterval = window.setInterval(() => {
        const now = Date.now();
        if (now >= autoCloseTimerEnd) {
          clearInterval(autoCloseInterval);
          closePanel();
        }
        const secondsRemaining = Math.ceil((autoCloseTimerEnd - now) / 1e3);
        document.getElementById("autoCloseLabel").textContent = $STRF(
          "autoclose_countdown",
          secondsRemaining.toString()
        );
      }, 1e3);
      const autoClose = document.createElement("div");
      autoClose.id = "autoClose";
      const autoCloseSetting = document.createElement("input");
      autoCloseSetting.id = "autoCloseCheckbox";
      autoCloseSetting.type = "checkbox";
      autoCloseSetting.checked = true;
      autoCloseSetting.addEventListener("change", cancelAutoClose);
      const autoCloseLabel = document.createElement("label");
      autoCloseLabel.textContent = $STRF("autoclose_countdown", autoCloseTime.toString());
      autoCloseLabel.htmlFor = "autoCloseCheckbox";
      autoCloseLabel.id = "autoCloseLabel";
      autoClose.appendChild(autoCloseSetting);
      autoClose.appendChild(autoCloseLabel);
      document.getElementById("closeContainer").appendChild(autoClose);
      document.getElementById("optionsContainer").addEventListener("click", cancelAutoClose);
    }
  }
  KeeLog.info("iframe page ready");
}
let matchedLoginsPanel;
const params = {};
document.location.search.substr(1).split("&").forEach((pair) => {
  const [key, value] = pair.split("=");
  params[key] = value;
});
const parentFrameId = parseInt(params["parentFrameId"]);
(async () => {
  await start();
})();
setup();
//# sourceMappingURL=legacyPanels-NfHlTESR.js.map
