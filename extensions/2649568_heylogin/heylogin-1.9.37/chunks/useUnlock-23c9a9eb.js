import { aw as getRelatedDomains, r as reactExports, a3 as newUuid, e as getFrontendServerUrl, a2 as assertExhaustive } from "./ExtDebugVisibleContext-6460380f.js";
import { s as sendMessage, t as trackError, c as messageError, b as browser, i as isWebExtError, d as debugConsole, m as makeMessageListener } from "./message-939596d6.js";
function searchPredicate(login, searchString) {
  return getSearchTerms(searchString).every((part) => searchWordPredicate(login, part));
}
function searchWordPredicate(login, searchTerm) {
  var _a, _b, _c, _d, _e, _f;
  return login.title.toLowerCase().includes(searchTerm) || login.username.toLowerCase().includes(searchTerm) || login.note.toLowerCase().includes(searchTerm) || ((_a = login.creditCard) === null || _a === void 0 ? void 0 : _a.cardHolder.toLowerCase().includes(searchTerm)) || ((_b = login.creditCard) === null || _b === void 0 ? void 0 : _b.displayType.toLowerCase().includes(searchTerm)) || // Number is stored normalized with spaces for grouping. Remove to allow searching without. Note;
  // that searchTerm never contains spaces, so no need to also include number with spaces.
  ((_c = login.creditCard) === null || _c === void 0 ? void 0 : _c.number.replace(/ /g, "").toLowerCase().includes(searchTerm)) || ((_d = login.wifiSsid) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(searchTerm)) || login.customFields.filter((cf) => !cf.protected).some((cf) => cf.value.toLowerCase().includes(searchTerm)) || searchWordPredicateWebsite(login, searchTerm) || ((_e = login.androidApps) === null || _e === void 0 ? void 0 : _e.some((a) => a.displayName.toLowerCase().includes(searchTerm))) || ((_f = login.tags) === null || _f === void 0 ? void 0 : _f.some((t) => t.toLowerCase().includes(searchTerm)));
}
function searchWordPredicateWebsite({ websites }, searchTerm) {
  const match = /^www\.(.+)$/.exec(searchTerm);
  const strippedSearchTerm = match ? match[1] : searchTerm;
  if (websites.some((w) => w.toLowerCase().includes(strippedSearchTerm))) {
    return true;
  }
  return getRelatedDomainsForWebsites(websites).some((w) => w.includes(strippedSearchTerm));
}
function getSearchTerms(searchString) {
  return searchString.toLowerCase().trim().split(/\s+/).map((part) => {
    if (part.startsWith("#")) {
      return part.replace(/^#+/, "");
    } else {
      return part;
    }
  });
}
function compareLoginsByChangeTime(l, r) {
  var _a, _b;
  const lTime = (_a = l.changeTime) !== null && _a !== void 0 ? _a : l.editTime;
  const rTime = (_b = r.changeTime) !== null && _b !== void 0 ? _b : r.editTime;
  return rTime.localeCompare(lTime);
}
function filterLogins(logins, searchString) {
  const filtered = !searchString ? [...logins] : logins.filter((l) => searchPredicate(l, searchString));
  filtered.sort(compareLoginsByChangeTime);
  return filtered;
}
function getRelatedDomainsForWebsites(websites) {
  const domains = websites.flatMap((website) => {
    try {
      return new URL(`https://${website}`).hostname;
    } catch (e) {
      return [];
    }
  });
  const domainsWithPslApproximation = domains.flatMap((hostname) => {
    const splitHostname = hostname.split(".").reverse();
    const result = [];
    let [current, ...rest] = splitHostname;
    for (const part of rest) {
      current = `${part}.${current}`;
      result.push(current);
    }
    return result;
  });
  return domainsWithPslApproximation.flatMap((domain) => {
    var _a;
    return (_a = getRelatedDomains(domain)) !== null && _a !== void 0 ? _a : [];
  });
}
function throttle(delay, noTrailing, callback, debounceMode) {
  var timeoutID;
  var cancelled = false;
  var lastExec = 0;
  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }
  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  }
  if (typeof noTrailing !== "boolean") {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = void 0;
  }
  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }
    var self = this;
    var elapsed = Date.now() - lastExec;
    if (cancelled) {
      return;
    }
    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    function clear() {
      timeoutID = void 0;
    }
    if (debounceMode && !timeoutID) {
      exec();
    }
    clearExistingTimeout();
    if (debounceMode === void 0 && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
    }
  }
  wrapper.cancel = cancel;
  return wrapper;
}
function debounce(delay, atBegin, callback) {
  return callback === void 0 ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}
function addAchievement(...achievements) {
  sendMessage({
    type: "AddAchievements",
    achievements
  }).catch(trackError);
}
async function copyToClipboard(value) {
  try {
    if (window.ClipboardItem && navigator.clipboard.write) {
      const filteredValue = typeof value === "string" ? value : value.then((v) => v ?? "");
      const text = new ClipboardItem({
        "text/plain": filteredValue
      });
      await navigator.clipboard.write([text]);
      return await filteredValue;
    } else {
      const text = await value;
      if (text !== void 0) {
        await navigator.clipboard.writeText(text);
      }
      return text;
    }
  } catch (e) {
    const text = await value;
    if (text !== void 0) {
      fallbackCopyTextToClipboard(text);
    }
    return text;
  }
}
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("unable to copy!");
    }
  } finally {
    document.body.removeChild(textArea);
  }
}
async function copyToClipboardWithClear(value, clearAfterTimeout) {
  const copiedText = await copyToClipboard(value);
  if (copiedText === void 0) {
    return;
  }
  sendMessage({
    type: "SetClearValueFromClipboardAfterTimeout",
    clearAfterTimeout: !!clearAfterTimeout,
    value: copiedText
  }).catch(trackError);
  return copiedText;
}
async function getUnprotectedValueForContentLogin(l, value) {
  var _a;
  return (_a = await getUnprotectedValueForContentLoginWithContentId(l, value)) == null ? void 0 : _a.unencrypted;
}
async function getUnprotectedValueForContentLoginWithContentId(l, value) {
  if (!l.vaultMetadata) {
    return void 0;
  }
  return getUnprotectedValueForVaultWithContentId(l.vaultMetadata.id, value);
}
async function getUnprotectedValueForVaultWithContentId(vaultId, value) {
  if ("unencrypted" in value) {
    return value;
  }
  const response = await sendMessage({
    type: "GetUnprotectedValue",
    vaultId,
    value
  });
  if (response === messageError) {
    return void 0;
  }
  return response;
}
function useCopyToClipboard(copyToClipboardWithClear2) {
  const [copied, setCopied] = reactExports.useState(false);
  const resetCopiedTimerRef = reactExports.useRef();
  const copy = reactExports.useCallback((value, clearAfterTimeout) => {
    (async () => {
      const copiedText = await copyToClipboardWithClear2(value, clearAfterTimeout);
      if (!copiedText) {
        return;
      }
      setCopied(true);
      window.clearTimeout(resetCopiedTimerRef.current);
      resetCopiedTimerRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1e3);
    })().catch(trackError);
  }, [copyToClipboardWithClear2]);
  return [copied, copy];
}
function openConnection(name, connectionId) {
  const portName = makePortName(name, connectionId);
  let port;
  let retries = 0;
  while (!port && retries < 3) {
    try {
      port = browser.runtime.connect(void 0, {
        name: portName
      });
    } catch (e) {
      if (!isWebExtError(e, "UNEXPECTED_ERROR")) {
        throw e;
      }
    }
    retries++;
  }
  if (!port) {
    throw new Error("Failed to open connection after retries");
  }
  return port;
}
function makePortName(name, connectionId) {
  if (!connectionId) {
    return name;
  }
  return `${name},${connectionId}`;
}
function useUnlock({
  unlockOnInitialRender,
  achievement,
  skipWebauthnUnlock
}) {
  const [isUnlocked, setIsUnlocked] = reactExports.useState();
  const [unlockState, setUnlockState] = reactExports.useState(unlockOnInitialRender && !skipWebauthnUnlock ? "unlocking" : void 0);
  const [webauthnOnlyUnlockSkipped, setWebauthnOnlyUnlockSkipped] = reactExports.useState(false);
  const [unlockDeviceType, setUnlockDeviceType] = reactExports.useState();
  const disconnectPortRef = reactExports.useRef();
  const cancelWebauthnRef = reactExports.useRef();
  const triggerUnlock = reactExports.useCallback((initialMessage, onStateChange) => {
    const unlockPort = openConnection("Unlock");
    disconnectPortRef.current = () => {
      unlockPort.disconnect();
    };
    function onDisconnect() {
      unlockPort.onMessage.removeListener(onMessage);
      unlockPort.onDisconnect.removeListener(onDisconnect);
    }
    function onMessage(message) {
      var _a, _b, _c;
      if (message.type === "StateUpdate") {
        debugConsole.log(message);
        const {
          state
        } = message;
        setUnlockState(state);
        if (state === "unlocking") {
          addAchievement(achievement);
        }
        if (state === "unlocked") {
          setIsUnlocked(true);
          unlockPort.disconnect();
          (_a = cancelWebauthnRef.current) == null ? void 0 : _a.call(cancelWebauthnRef);
        } else {
          setIsUnlocked(false);
        }
        if (state === "error") {
          (_b = cancelWebauthnRef.current) == null ? void 0 : _b.call(cancelWebauthnRef);
        }
        onStateChange == null ? void 0 : onStateChange(state);
      } else if (message.type === "TriggerWebauthnUnlock") {
        (_c = cancelWebauthnRef.current) == null ? void 0 : _c.call(cancelWebauthnRef);
        const webauthnIframe = document.createElement("iframe");
        Object.assign(webauthnIframe.style, {
          position: "absolute",
          top: "-99px",
          left: "-999px",
          width: 0,
          height: 0,
          border: "none"
        });
        const webauthnUnlockId = newUuid();
        webauthnIframe.allow = "publickey-credentials-get *";
        webauthnIframe.src = `${getFrontendServerUrl()}/blank.html?webauthnUnlockId=${webauthnUnlockId}`;
        webauthnIframe.addEventListener("load", () => {
          unlockPort.postMessage({
            type: "WebauthnUnlockIframeSetUp",
            webauthnUnlockId
          });
        });
        document.documentElement.appendChild(webauthnIframe);
        cancelWebauthnRef.current = () => webauthnIframe == null ? void 0 : webauthnIframe.remove();
      } else if (message.type === "WebauthnOnlyUnlockSkipped") {
        setIsUnlocked(false);
        setUnlockState(void 0);
        setWebauthnOnlyUnlockSkipped(true);
      } else {
        assertExhaustive();
      }
    }
    unlockPort.onMessage.addListener(onMessage);
    unlockPort.onDisconnect.addListener(onDisconnect);
    window.setTimeout(() => {
      unlockPort.postMessage(initialMessage);
    }, 100);
  }, [achievement]);
  const performLogin = reactExports.useCallback((loginId, options) => {
    triggerUnlock({
      type: "RequestFormFill",
      loginId,
      confirmLogin: options == null ? void 0 : options.confirmLogin,
      skipWebauthnUnlock
    });
  }, [skipWebauthnUnlock, triggerUnlock]);
  const requestUnlock = reactExports.useCallback(() => {
    triggerUnlock({
      type: "RequestUnlock",
      skipWebauthnUnlock
    }, (state) => {
      if (state === "unlocked") {
        setUnlockState(void 0);
      }
    });
  }, [skipWebauthnUnlock, triggerUnlock]);
  const addTotpParametersToLogin = reactExports.useCallback((loginId, vaultId, totpParameters) => {
    triggerUnlock({
      type: "AddTotpParametersToLogin",
      loginId,
      vaultId,
      totpParameters,
      skipWebauthnUnlock
    });
  }, [skipWebauthnUnlock, triggerUnlock]);
  const cancelLogin = reactExports.useCallback(() => {
    var _a;
    setUnlockState(void 0);
    (_a = disconnectPortRef.current) == null ? void 0 : _a.call(disconnectPortRef);
  }, [setUnlockState]);
  reactExports.useEffect(() => {
    const messageListener = makeMessageListener({
      UnlockStateUpdate: (msg) => setIsUnlocked(msg.isUnlocked)
    });
    browser.runtime.onMessage.addListener(messageListener);
    return () => browser.runtime.onMessage.removeListener(messageListener);
  }, []);
  const initialRenderRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (unlockOnInitialRender && initialRenderRef.current) {
      requestUnlock();
    }
    initialRenderRef.current = false;
  }, [requestUnlock, unlockOnInitialRender]);
  reactExports.useEffect(() => {
    if (unlockDeviceType) {
      return;
    }
    (async () => {
      const result = await sendMessage({
        type: "GetUnlockDeviceType"
      });
      if (result !== messageError) {
        setUnlockDeviceType((udt) => udt ?? result);
      }
    })().catch(trackError);
  }, [unlockDeviceType]);
  return {
    unlockState,
    isUnlocked,
    pushState: unlockState ? unlockStateToPushState(unlockState) : null,
    // populate a reasonable default here in case the unlock happens before the request can go
    // through
    unlockDeviceType: unlockDeviceType ?? "phone",
    performLogin,
    cancelLogin,
    requestUnlock,
    addTotpParametersToLogin,
    webauthnOnlyUnlockSkipped
  };
}
function unlockStateToPushState(state) {
  if (state === "unlocking") {
    return "connecting";
  }
  if (state === "unlocked") {
    return "confirmed";
  }
  if (state === "warning") {
    return "warning";
  }
  return "error";
}
export {
  addAchievement as a,
  useCopyToClipboard as b,
  copyToClipboardWithClear as c,
  debounce as d,
  getUnprotectedValueForVaultWithContentId as e,
  filterLogins as f,
  getUnprotectedValueForContentLogin as g,
  getUnprotectedValueForContentLoginWithContentId as h,
  openConnection as o,
  searchPredicate as s,
  useUnlock as u
};
//# sourceMappingURL=useUnlock-23c9a9eb.js.map
