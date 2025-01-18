import { K as KeeLog } from "./ConfigManager-DadTRJhU.js";
import { a as Entry } from "./Entry-B0M4TtnG.js";
class ContentPortManager {
  // public mixin = {
  //     methods: {
  //         postMessage: msg => {
  //             this.port.postMessage(msg);
  //         }
  //     }
  // };
  postMessage(msg) {
    try {
      this.port.postMessage(msg);
    } catch (e) {
      if (KeeLog && KeeLog.warn)
        KeeLog.warn("Failed to post a message. If the addon has just auto-updated this is expected.");
    }
  }
  startup(name) {
    this.port = chrome.runtime.connect({ name });
  }
  shutdown() {
    this.port = null;
  }
  get raw() {
    return this.port;
  }
}
const Port = new ContentPortManager();
class SaveState {
  constructor() {
    this.newEntry = new Entry({});
  }
}
const defaults = {
  latestConnectionError: "",
  lastKeePassRPCRefresh: 0,
  ActiveKeePassDatabaseIndex: -1,
  KeePassDatabases: [],
  PasswordProfiles: [],
  notifications: [],
  connected: false,
  connectedWebsocket: false,
  currentSearchTerm: null,
  loginsFound: false,
  searchResults: null,
  saveState: new SaveState(),
  generatedPassword: "",
  saveEntryResult: {
    result: null,
    receivedAt: /* @__PURE__ */ new Date(),
    fileName: null,
    uuid: null
  },
  entryUpdateStartedAtTimestamp: 0
};
class Mutation {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}
const updateActiveKeePassDatabaseIndex = "updateActiveKeePassDatabaseIndex";
const updateConnected = "updateConnected";
const updateConnectedWebsocket = "updateConnectedWebsocket";
const updateCurrentSearchTerm = "updateCurrentSearchTerm";
const updateLatestConnectionError = "updateLatestConnectionError";
const updateLastKeePassRPCRefresh = "updateLastKeePassRPCRefresh";
const updateKeePassDatabases = "updateKeePassDatabases";
const updatePasswordProfiles = "updatePasswordProfiles";
const updateGeneratedPassword = "updateGeneratedPassword";
const updateNotifications = "updateNotifications";
const updateSubmittedData = "updateSubmittedData";
const updateLoginsFound = "updateLoginsFound";
const updateSearchResultWithFullDetails = "updateSearchResultWithFullDetails";
const updateSearchResults = "updateSearchResults";
const addNotification = "addNotification";
const updateSaveState = "updateSaveState";
const updateSaveEntryResult = "updateSaveEntryResult";
const removeFieldFromActiveEntry = "removeFieldFromActiveEntry";
const updateEntryUpdateStartedAtTimestamp = "updateEntryUpdateStartedAtTimestamp";
export {
  Mutation as M,
  Port as P,
  SaveState as S,
  addNotification as a,
  updateConnected as b,
  updateConnectedWebsocket as c,
  defaults as d,
  updateCurrentSearchTerm as e,
  updateEntryUpdateStartedAtTimestamp as f,
  updateGeneratedPassword as g,
  updateKeePassDatabases as h,
  updateLastKeePassRPCRefresh as i,
  updateLatestConnectionError as j,
  updateLoginsFound as k,
  updateNotifications as l,
  updatePasswordProfiles as m,
  updateSaveEntryResult as n,
  updateSaveState as o,
  updateSearchResultWithFullDetails as p,
  updateSearchResults as q,
  removeFieldFromActiveEntry as r,
  updateSubmittedData as s,
  updateActiveKeePassDatabaseIndex as u
};
//# sourceMappingURL=mutation-types-BIvNkZ3d.js.map
