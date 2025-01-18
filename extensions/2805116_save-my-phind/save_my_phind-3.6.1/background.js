"use strict";
(() => {
  // src/views/browser/bg/icon/iconAction.ts
  function listenIconClick() {
    chrome.action.onClicked.addListener(async (tab) => {
      console.info("Icon clicked");
      await launchIconClickAction(tab);
    });
  }
  async function launchIconClickAction(tab) {
    var _a;
    if (!tab || ((_a = tab.url) == null ? void 0 : _a.startsWith("chrome://"))) {
      console.info(`Tab ${(tab == null ? void 0 : tab.id) || ""} is not injectable`);
      return;
    }
    try {
      console.info("Injecting script");
      await chrome.storage.local.set({ isInjecting: true });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id || 0 },
        files: ["tab.js"]
      });
    } catch (error) {
      console.error("Error executing script: ", error);
    }
  }

  // src/utils/bg/managePopups.ts
  function createWindow(url, type = "popup", width = 450, height = 600) {
    chrome.windows.create({
      url: chrome.runtime.getURL(url),
      type,
      width,
      height
    });
  }

  // src/data/infos.json
  var infos_default = {
    APP_NAME: "Save my Chatbot",
    APP_SNAME: "SaveMyChatbot",
    APP_LNAME: "Save my Chatbot - AI Conversation Exporter",
    APP_ID: "savemyphind@hugocollin.com",
    APP_MODE: "",
    URLS: {
      REPOSITORY: "https://github.com/Hugo-COLLIN/SaveMyPhind-conversation-exporter",
      WEBSITE: "https://save.hugocollin.com",
      SUPPORT: "https://save.hugocollin.com/support",
      FEEDBACK: "https://save.hugocollin.com/feedback?utm_medium=extension&utm_campaign=feedback",
      DISCUSSIONS: "https://save.hugocollin.com/discussion",
      TUTORIALS: "https://save.hugocollin.com/tutorial",
      STORES: {
        CHROME: "https://chromewebstore.google.com/u/1/detail/agklnagmfeooogcppjccdnoallkhgkod",
        FIREFOX: "https://addons.mozilla.org/firefox/addon/save-my-phind"
      },
      REPORT: "https://save.hugocollin.com/issue"
    },
    CONTACT_EMAIL: "hcollin.dev@gmail.com",
    COPY_MODE: "tab"
  };

  // src/utils/defineStoreLink.ts
  function defineStoreLink() {
    const manifest = chrome.runtime.getManifest();
    if (manifest.browser_specific_settings !== void 0 && manifest.browser_specific_settings.gecko !== void 0) {
      return { url: infos_default.URLS.STORES.FIREFOX + "/reviews", name: "Firefox Add-ons Store" };
    } else {
      return { url: infos_default.URLS.STORES.CHROME + "/reviews", name: "Chrome Web Store" };
    }
  }

  // src/utils/isEmojiSupported.ts
  function isEmojiSupported() {
    const alpha = String.fromCodePoint(127481, 127481);
    const beta = String.fromCodePoint(9874);
    function areEmojisEqual(emoji1, emoji2) {
      return emoji1.normalize() === emoji2.normalize();
    }
    return !areEmojisEqual(alpha, beta);
  }

  // src/views/browser/bg/contextMenu/buildContextMenu.ts
  function buildContextMenu() {
    const emojiSupported = isEmojiSupported();
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: "openOptions",
        title: (emojiSupported ? "\u2699\uFE0F " : "") + "Export Options",
        contexts: ["action"]
      });
      chrome.contextMenus.create({
        id: "tutorial",
        title: (emojiSupported ? "\u2753 " : "") + "User's Guide",
        contexts: ["action"]
      });
      chrome.contextMenus.create({
        id: "separator",
        type: "separator",
        contexts: ["action"]
      });
      chrome.contextMenus.create({
        id: "feedback",
        title: (emojiSupported ? "\u{1F929} " : "") + "Share your feedback on the store",
        contexts: ["action"]
      });
      chrome.contextMenus.create({
        id: "bugReport",
        title: (emojiSupported ? "\u{1F680} " : "") + "Report a bug or suggest a feature",
        contexts: ["action"]
      });
      chrome.contextMenus.create({
        id: "donation",
        title: (emojiSupported ? "\u2764\uFE0F " : "") + "Support the project",
        contexts: ["action"]
      });
      chrome.contextMenus.create({
        id: "exportPage",
        title: "Export this page",
        contexts: ["page"]
      });
    });
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      switch (info.menuItemId) {
        case "openOptions":
          createWindow("options.html");
          break;
        case "feedback":
          await chrome.tabs.create({ url: defineStoreLink().url });
          break;
        case "donation":
          await chrome.tabs.create({ url: infos_default.URLS.SUPPORT });
          break;
        case "tutorial":
          await chrome.windows.create({ url: infos_default.URLS.TUTORIALS, type: "popup", width: 500, height: 600 });
          break;
        case "exportPage":
          await launchIconClickAction(tab);
          break;
        case "bugReport":
          await chrome.tabs.create({ url: infos_default.URLS.REPORT });
          break;
      }
    });
  }

  // src/services/checker/domainChecker.ts
  function domainChecker(allowedDomains, hostAndPath) {
    for (let domainName in allowedDomains) {
      const url = allowedDomains[domainName];
      if (hostAndPath == null ? void 0 : hostAndPath.startsWith(url)) {
        return { name: domainName, url };
      }
    }
    return null;
  }

  // src/services/checker/allowedDomains.json
  var LOAD_DOMAINS = {
    Phind: "www.phind.com",
    Perplexity: "www.perplexity.ai",
    MaxAIGoogle: "www.google.com",
    ChatGPT: "chatgpt.com",
    Claude: "claude.ai"
  };

  // src/utils/chromeStorage.ts
  async function getTabData(tabId) {
    return await new Promise((resolve, reject) => {
      if (!tabId)
        reject("No tabId" + tabId + " found");
      else
        chrome.tabs.get(tabId, (tab) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          } else {
            resolve(tab);
          }
        });
    });
  }

  // src/views/browser/bg/icon/defineIcon.ts
  function listenTabsToUpdateIcon() {
    chrome.tabs.onUpdated.addListener(
      (tabId, changeInfo, tab) => defineIcon(tabId)
    );
    chrome.tabs.onActivated.addListener(
      (activeInfo) => defineIcon(activeInfo.tabId)
    );
    chrome.windows.onFocusChanged.addListener((windowId) => {
      focusDependingSetIcon(windowId);
    });
  }
  function focusDependingSetIcon(windowId) {
    if (windowId === chrome.windows.WINDOW_ID_NONE) return;
    chrome.tabs.query(
      { active: true, windowId },
      (tabs) => {
        if (tabs[0]) defineIcon(tabs[0].id);
      }
    );
  }
  async function defineIcon(tabId) {
    const { url } = await getTabData(tabId);
    if (!url) return;
    const domain = domainChecker(LOAD_DOMAINS, url.split("https://")[1]);
    switch (domain == null ? void 0 : domain.name.toLowerCase()) {
      case "phind":
        chrome.action.setIcon({ path: { "48": "../files/icons/icon_phind-48.png" }, tabId });
        break;
      case "perplexity":
        chrome.action.setIcon({ path: { "48": "../files/icons/icon_perplexity-48.png" }, tabId });
        break;
      case "maxaigoogle":
        chrome.storage.local.get("isMaxAI", (result) => {
          console.log(result.isMaxAI);
          result.isMaxAI ? chrome.action.setIcon({
            path: { "48": "../files/icons/icon_googleMaxAI-48.png" },
            tabId
          }) : "";
        });
        break;
      default:
        if (url.startsWith("http://") || url.startsWith("https://"))
          await chrome.action.setIcon({ path: { "48": "../files/icons/icon_web-48.png" }, tabId });
    }
  }

  // src/views/browser/bg/icon/clickCount.ts
  var clickCounts = [14, 25, 40, 40];
  function initClickCount() {
    chrome.runtime.onInstalled.addListener(
      (details) => {
        initClickIconCount(details);
      }
    );
  }
  function initClickIconCount(details) {
    if (details.reason === "install" || details.reason === "update") {
      chrome.storage.sync.set({ "clickIconCount": clickCounts[0], "modalIndex": 0 });
    }
  }

  // src/views/components/modals/bg/manageModals.ts
  function initModalOnInstall() {
    chrome.runtime.onInstalled.addListener(
      (details) => {
        defineDisplayModalOnInstall(details);
      }
    );
  }
  function defineDisplayModalOnInstall(details) {
    switch (details.reason) {
      case "install":
        chrome.storage.sync.set(
          { displayModalWelcome: true },
          () => console.log("Welcome modal will be displayed")
        );
        break;
      case "update":
        chrome.storage.sync.set(
          { displayModalUpdate: true },
          () => console.log("Last update modal will be displayed")
        );
        break;
    }
  }

  // src/views/browser/bg/setUninstalledRedirect.ts
  function setUninstalledRedirect() {
    chrome.runtime.setUninstallURL(
      "https://save.hugocollin.com/uninstalled",
      () => console.log("Uninstall survey URL set")
    );
  }

  // src/entrypoints/background.ts
  background();
  function background() {
    console.log("Background script running");
    buildContextMenu();
    listenIconClick();
    listenTabsToUpdateIcon();
    initClickCount();
    initModalOnInstall();
    setUninstalledRedirect();
    chrome.runtime.onInstalled.addListener(async (details) => {
      const displayModalWelcome = await chrome.storage.sync.get("displayModalWelcome");
      if (displayModalWelcome["displayModalWelcome"]) {
        await chrome.tabs.create({ url: infos_default.URLS.TUTORIALS, active: true });
        await chrome.storage.sync.set({ displayModalWelcome: false });
      }
    });
    chrome.runtime.onInstalled.addListener(async (details) => {
      const filenameTemplate = await chrome.storage.sync.get("filenameTemplate");
      if (!filenameTemplate["filenameTemplate"]) {
        chrome.storage.sync.set({ filenameTemplate: "%Y-%M-%D_%h-%m-%s_%W_%T" });
      }
    });
  }
})();
