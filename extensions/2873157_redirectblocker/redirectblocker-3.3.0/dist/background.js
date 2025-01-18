let allTabsModeIsOn = false;
const extensionTabs = [];
const disabledTabs = [];
let keepAlive;
const builtInURLs = [
  "https://google.com/",
  "about:",
  "moz-extension://",
  "chrome://",
  "chrome-extension://egmgebeelgaakhaoodlmnimbfemfgdah",
  "https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values",
  "https://github.com/Tyson3101/",
  "https://addons.mozilla.org/en-US/firefox/addon/redirect-blocker/",
  "https://chrome.google.com/webstore/detail/redirect-blocker/egmgebeelgaakhaoodlmnimbfemfgdah",
  "https://tyson3101.com",
];
let allowedURLs = [...builtInURLs];
const initialSettings = {
  tabExclusive: false,
  preventSameTabRedirects: false,
  savedURLs: ["https://soap2day.day/", "https://vipleague.im/"],
  allowedURLs: ["https://youtube.com/@Tyson3101"],
  shortCutToggleSingleKeys: ["alt", "shift", "s"],
  shortCutToggleAllKeys: ["alt", "shift", "a"],
  onStartup: false,
};
let settings = initialSettings;
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

browserAPI.runtime.onStartup.addListener(() => {
  browserAPI.storage.sync.get("settings", (res) => {
    const startUpSetting = (res?.settings).onStartup;
    if (startUpSetting) {
      browserAPI.tabs.query({}).then((allTabs) => {
        const tabs = allTabs.filter((t) => t.id);
        extensionTabs.splice(0, extensionTabs.length, ...tabs);
        allTabsModeIsOn = true;
        browserAPI.storage.local.set({ allTabsModeIsOn: true });
        saveExtTabs();
      });
    }
  });
});
browserAPI.tabs.onCreated.addListener(async (tab) => {
  const extTab = extensionTabs.find(
    (t) => t.active && t.windowId === tab.windowId
  );
  if (!extTab && !allTabsModeIsOn) return;
  let createdTabActive = tab.active;
  if (!extTab || extTab.windowId === tab.windowId) {
    if (extTab)
      await browserAPI.tabs
        .update(extTab.id, { active: true })
        .catch(() => null);
    let intMs = 0;
    let urlPropertiesInterval = setInterval(async () => {
      const updatedTab = await browserAPI.tabs.get(tab.id).catch(() => null);
      if (!updatedTab) return clearInterval(urlPropertiesInterval);
      intMs += 20;
      if (updatedTab.url || updatedTab.pendingUrl) {
        checkRedirect(updatedTab, extTab).catch(() => null);
        clearInterval(urlPropertiesInterval);
      } else if (intMs >= 1000) {
        return clearInterval(urlPropertiesInterval);
      }
    }, 20);
  }
  async function checkRedirect(tab, extTab) {
    if (extTab) {
      const combinedURLs = [
        ...allowedURLs,
        ...settings.savedURLs,
        new URL(extTab.url).origin,
      ];
      if (isURLMatch(combinedURLs, tab.pendingUrl || tab.url)) {
        if (createdTabActive) {
          await browserAPI.tabs
            .update(tab.id, { active: true })
            .catch(() => null);
        }
        if (allTabsModeIsOn) {
          await updateExtensionTab(tab, true);
        }
        return;
      } else await browserAPI.tabs.remove(tab.id).catch(() => null);
    } else if (allTabsModeIsOn) {
      await updateExtensionTab(tab, true);
    }
  }
});
browserAPI.tabs.onUpdated.addListener(async (tabId, _changeInfo, tab) => {
  const disabledTab = disabledTabs.find((t) => t.id === tabId);
  if (disabledTab) {
    if (new URL(disabledTab.url).hostname === new URL(tab.url).hostname) return;
    else removeDisabledTab(disabledTab);
  }
  let extTab = extensionTabs.find((t) => t.id === tabId);
  if (isURLMatch(settings.savedURLs, tab.url)) {
    if (!extTab) return (extTab = await updateExtensionTab(tab, true));
  }
  if (isURLMatch([...settings.savedURLs, ...allowedURLs], tab.url)) {
    if (extTab) {
      if (new URL(extTab.url).origin !== new URL(tab.url).origin) {
        if (!settings.tabExclusive && !allTabsModeIsOn)
          return removeExtensionTab(extTab, true);
      }
      return updateExtensionTab(tab);
    }
  }
  if (extTab) updateExtensionTab(tab);
});
browserAPI.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await browserAPI.tabs.get(activeInfo.tabId).catch(() => null);
  if (!tab) return;
  for (let extTab of extensionTabs) {
    if (extTab.id === tab.id) {
      updateExtensionTab(tab);
      continue;
    }
    if (extTab.active && extTab.windowId === tab.windowId) {
      const extChromeTab = await browserAPI.tabs
        .get(extTab.id)
        .catch(() => null);
      if (!extChromeTab) return removeExtensionTab(extTab);
      updateExtensionTab(extChromeTab);
      continue;
    }
  }
});
browserAPI.windows.onCreated.addListener(async (window) => {
  const extTab = extensionTabs.find((t) => t.active && t.windowActive);
  if (!extTab) return;
  const popupTab = (
    await browserAPI.tabs.query({ windowId: window.id }).catch(() => null)
  )?.[0];
  if (window.type === "popup" && popupTab) {
    const combinedURLs = [
      ...allowedURLs,
      ...settings.savedURLs,
      new URL(extTab.url).origin,
    ];
    if (!isURLMatch(combinedURLs, popupTab.pendingUrl || popupTab.url)) {
      browserAPI.windows.remove(window.id).catch(() => null);
    }
  }
});
browserAPI.tabs.onRemoved.addListener((tabId) => {
  const extTab = extensionTabs.find((t) => t.id === tabId);
  if (!extTab) return;
  removeExtensionTab(extTab);
  checkTabs();
});
async function onTabMoved(tabId) {
  const extTab = extensionTabs.find((t) => t.id === tabId);
  if (!extTab) return;
  const tab = await browserAPI.tabs.get(tabId).catch(() => null);
  updateExtensionTab(tab);
}
browserAPI.tabs.onAttached.addListener(onTabMoved);
browserAPI.tabs.onDetached.addListener(onTabMoved);
browserAPI.storage.onChanged.addListener((changes) => {
  const newSettings = changes.settings?.newValue;
  if (newSettings) {
    allowedURLs = [...newSettings.allowedURLs, ...builtInURLs];
    settings = changes.settings.newValue;
  }
  if (changes.extensionTabs?.newValue) {
    setExtensionTabs(changes.extensionTabs.newValue);
  }
  if (changes.allTabsModeIsOn?.newValue) {
    allTabsModeIsOn = changes.allTabsModeIsOn.newValue;
  }
  if (changes.disabledTabs?.newValue) {
    const newDisabledTabs = changes.disabledTabs.newValue;
    disabledTabs.splice(0, disabledTabs.length, ...newDisabledTabs);
    checkDisabledTabs();
  }
});
browserAPI.runtime.onMessage.addListener(async (message) => {
  if (message.toggleSingle === true) {
    const tab = (
      await browserAPI.tabs.query({ active: true, currentWindow: true })
    )?.[0];
    if (!tab) return;
    const extTab = extensionTabs.find((t) => t.id === tab.id);
    if (extTab) {
      removeExtensionTab(extTab, true);
    } else {
      updateExtensionTab(tab, true);
    }
  } else if (message.toggleAll === true) {
    if (allTabsModeIsOn) {
      extensionTabs.splice(0, extensionTabs.length);
      allTabsModeIsOn = false;
    } else {
      const tabs = await browserAPI.tabs.query({}).catch(() => []);
      extensionTabs.splice(0, extensionTabs.length, ...tabs);
      allTabsModeIsOn = true;
    }
    saveExtTabs();
    browserAPI.storage.local.set({ allTabsModeIsOn: allTabsModeIsOn });
  }
});
async function setExtensionTabs(newExtensionTabs) {
  extensionTabs.splice(0, extensionTabs.length, ...newExtensionTabs);
  saveExtTabs();
}
async function updateExtensionTab(tab, instantSave = false) {
  if (!tab) return;
  let extTabIndex = extensionTabs.findIndex((t) => t.id === tab.id);
  const updatedTabData = {
    id: tab.id,
    url: tab.url,
    active: tab.active,
    windowId: tab.windowId,
    windowActive: tab.windowId === (await getCurrentWindowId()),
    savedURL: isURLMatch(settings.savedURLs, tab.url),
  };
  if (extTabIndex >= 0) {
    extensionTabs[extTabIndex] = updatedTabData;
  } else {
    extensionTabs.push(updatedTabData);
  }
  sendToggledStateToContentScript(tab.id, true);
  if (instantSave) saveExtTabs();
  else debouncedSaveExtTabs();
  return updatedTabData;
}
function removeExtensionTab(extTab, instantSave = false) {
  const extTabIndex = extensionTabs.findIndex((t) => t.id === extTab.id);
  if (extTabIndex < 0) return;
  extensionTabs.splice(extTabIndex, 1);
  sendToggledStateToContentScript(extTab.id, false);
  if (instantSave) saveExtTabs();
  else debouncedSaveExtTabs();
}
function removeDisabledTab(disabledTab) {
  const disabledTabIndex = disabledTabs.findIndex(
    (t) => t.id === disabledTab.id
  );
  if (disabledTabIndex < 0) return;
  disabledTabs.splice(disabledTabIndex, 1);
  checkDisabledTabs();
}
function saveExtTabs() {
  const extTabsSet = [...new Set(extensionTabs.map((t) => t.id))].map((id) =>
    extensionTabs.find((t) => t.id === id)
  );
  extensionTabs.splice(0, extensionTabs.length, ...extTabsSet);
  console.log("extTabs", extensionTabs);
  browserAPI.storage.local.set({ extensionTabs: extensionTabs });
  if (!extensionTabs.length) {
    allTabsModeIsOn = false;
    browserAPI.storage.local.set({ allTabsModeIsOn: false });
  }
}
let debouncedSaveExtTabs = debounce(() => {
  saveExtTabs();
  if (!extensionTabs.length) {
    if (keepAlive) clearInterval(keepAlive);
    keepAlive = null;
    allTabsModeIsOn = false;
    return;
  }
  if (!keepAlive) persistServiceWorker();
}, 5000);
function sendToggledStateToContentScript(tabId, isToggledOn) {
  browserAPI.tabs.sendMessage(tabId, { action: "toggleTab", isToggledOn });
}
function persistServiceWorker() {
  if (keepAlive) clearInterval(keepAlive);
  keepAlive = setInterval(() => {
    checkTabs();
  }, 1000 * 25);
}
function checkTabs() {
  browserAPI.tabs.query({}).then((tabs) => {
    for (let i = extensionTabs.length - 1; i >= 0; i--) {
      if (!tabs.find((t) => t.id === extensionTabs[i].id)) {
        extensionTabs.splice(i, 1);
        console.log("Found non-existant tab");
      }
    }
    debouncedSaveExtTabs();
  });
}
function checkDisabledTabs() {
  browserAPI.tabs.query({}).then((tabs) => {
    for (let i = disabledTabs.length - 1; i >= 0; i--) {
      if (!tabs.find((t) => t.id === disabledTabs[i].id)) {
        disabledTabs.splice(i, 1);
        console.log("Found non-existant disabled tab");
      }
    }
    browserAPI.storage.local.set({ disabledTabs });
  });
}
browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTabId") {
    sendResponse({ tabId: sender.tab.id });
  }
  if (message.action === "getTabToggledState") {
    const tabToggledState = extensionTabs.find((t) => t.id === sender.tab.id);
    sendResponse({ tabToggledState: !!tabToggledState });
  }
});
function isURLMatch(urls, url) {
  if (!url) return false;
  const normalizeUrl = (url) =>
    url
      .replace(/^https?:\/\/(www\.)?(ww\d+\.)?/, "https://")
      .replace(/\/([^?]+).*$/, "/$1")
      .replace(/\/$/, "")
      .toLowerCase();
  const normalizedUrl = normalizeUrl(url);
  for (const currentUrl of urls) {
    const normalizedCurrentUrl = normalizeUrl(currentUrl);
    if (
      normalizedUrl === normalizedCurrentUrl ||
      normalizedUrl.startsWith(normalizedCurrentUrl + "/")
    ) {
      return true;
    }
  }
  return false;
}
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
async function getCurrentWindowId() {
  const window = await browserAPI.windows.getCurrent();
  return window.id;
}
(function initializeExtension() {
  browserAPI.storage.sync.get("settings", (res) => {
    let savedSettings = res?.settings;
    if (!savedSettings) {
      savedSettings = initialSettings;
      browserAPI.storage.sync.set({ settings: initialSettings });
    }
    allowedURLs = [...savedSettings.allowedURLs, ...builtInURLs];
    settings = savedSettings;
  });
  browserAPI.storage.local.get(
    ["extensionTabs", "disabledTabs"],
    async (res) => {
      if (!res?.extensionTabs) {
        browserAPI.storage.local.set({
          extensionTabs: [],
          allTabsModeIsOn: false,
        });
      } else {
        setExtensionTabs(res.extensionTabs);
      }
      if (extensionTabs.length) {
        persistServiceWorker();
        checkTabs();
      }
      if (!res?.disabledTabs) {
        browserAPI.storage.local.set({ disabledTabs: [] });
      } else {
        const disabledTabs = res.disabledTabs;
        disabledTabs.splice(0, disabledTabs.length, ...disabledTabs);
        checkDisabledTabs();
      }
    }
  );
})();
browserAPI.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    browserAPI.tabs.create({ url: "dist/popup/install.html" });
  }
});
