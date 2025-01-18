(() => {
  "use strict";
  class ActionMenu {
    #created=false;
    create(onCheckedChanged) {
      if (this.#created) return;
      this.#created = true;
      chrome.contextMenus.create({
        id: MENU_ITEM_ID,
        type: chrome.contextMenus.ItemType.CHECKBOX,
        title: DEFAULT_TITLE,
        enabled: false,
        checked: false,
        contexts: [ chrome.contextMenus.ContextType.ACTION ],
        documentUrlPatterns: [ "http://*/*", "https://*/*" ]
      });
      chrome.contextMenus.onClicked.addListener(((info, tab) => {
        if (info.menuItemId === MENU_ITEM_ID) onCheckedChanged(info.checked, tab.url);
      }));
    }
    update(updateProperties) {
      if (!this.#created) return;
      return chrome.contextMenus.update(MENU_ITEM_ID, updateProperties);
    }
  }
  const MENU_ITEM_ID = "jetbrains-toolbox-toggle-domain";
  const DEFAULT_TITLE = "Enable on this domain";
  const isHostPermissionGrantedByManifest = url => {
    const domainMatch = getDomainMatch(url);
    const manifest = chrome.runtime.getManifest();
    return manifest.host_permissions.includes(domainMatch);
  };
  const isHostPermissionGrantedByUser = url => {
    const domainMatch = getDomainMatch(url);
    return chrome.permissions.contains({
      origins: [ domainMatch ]
    });
  };
  const requestHostPermission = url => {
    const domainMatch = getDomainMatch(url);
    return chrome.permissions.request({
      origins: [ domainMatch ]
    });
  };
  const revokeHostPermission = url => {
    const domainMatch = getDomainMatch(url);
    return chrome.permissions.remove({
      origins: [ domainMatch ]
    });
  };
  const registerContentScript = url => {
    const domainMatch = getDomainMatch(url);
    const options = {
      id: domainMatch,
      matches: [ domainMatch ],
      js: [ DETECT_PROVIDER_CONTENT_SCRIPT ]
    };
    return chrome.scripting.registerContentScripts([ options ]);
  };
  const unregisterContentScript = url => {
    const domainMatch = getDomainMatch(url);
    return chrome.scripting.unregisterContentScripts({
      ids: [ domainMatch ]
    });
  };
  const getDomain = url => {
    const {protocol, hostname} = new URL(url);
    return `${protocol}//${hostname}`;
  };
  const getDomainMatch = url => `${getDomain(url)}/*`;
  const DETECT_PROVIDER_CONTENT_SCRIPT = "detectProvider.js";
  const PROTOCOLS = {
    HTTPS: "HTTPS",
    SSH: "SSH"
  };
  const getProtocol = () => getFromStorage(STORAGE_ITEMS.PROTOCOL, DEFAULTS.PROTOCOL);
  const saveProtocol = protocol => saveToStorage(STORAGE_ITEMS.PROTOCOL, protocol);
  const getModifyPages = () => getFromStorage(STORAGE_ITEMS.MODIFY_PAGES, DEFAULTS.MODIFY_PAGES);
  const saveModifyPages = allow => saveToStorage(STORAGE_ITEMS.MODIFY_PAGES, allow);
  const saveToStorage = async (key, value) => {
    try {
      await chrome.storage.local.set({
        [key]: value
      });
    } catch (e) {
      console.error("Failed to save %s: %s to storage: %s", key, value, e.message);
    }
  };
  const getFromStorage = async (key, defaultValue) => {
    try {
      const result = await chrome.storage.local.get([ key ]);
      return result[key] ?? defaultValue;
    } catch (e) {
      console.error("Failed to get %s from storage: %s", key, e.message);
      return defaultValue;
    }
  };
  const STORAGE_ITEMS = {
    PROTOCOL: "protocol",
    MODIFY_PAGES: "modify-pages",
    ACTIVE_TAB_ID: "active-tab-id"
  };
  const DEFAULTS = {
    PROTOCOL: PROTOCOLS.HTTPS,
    MODIFY_PAGES: true,
    ACTIVE_TAB_ID: null
  };
  const actionMenu = new ActionMenu;
  const handleInstalled = () => {
    const manifest = chrome.runtime.getManifest();
    void chrome.runtime.setUninstallURL(`https://www.jetbrains.com/toolbox-app/uninstall/extension/?version=${manifest.version}`);
    actionMenu.create(handleMenuCheckedChanged);
  };
  const handleMenuCheckedChanged = async (checked, url) => {
    if (url.startsWith("chrome://") || url.startsWith("chrome-extension://") || url.startsWith("about:") || url.startsWith("view-source:")) {
      actionMenu.update({
        checked: !checked
      });
      return;
    }
    if (checked) try {
      if (await requestHostPermission(url)) {
        await registerContentScript(url);
        await reloadActiveTab();
      } else actionMenu.update({
        checked: false
      });
    } catch (error) {
      console.error(error);
    } else try {
      if (await revokeHostPermission(url)) {
        await unregisterContentScript(url);
        await reloadActiveTab();
      } else actionMenu.update({
        checked: true
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleMessage = (message, sender, sendResponse) => {
    switch (message.type) {
     case "enable-page-action":
      chrome.action.setIcon({
        tabId: sender.tab.id,
        path: {
          128: "icons/icon-128.png"
        }
      });
      const {project, https, ssh} = message;
      const url = encodeURI(`popups/clone.html?project=${project}&https=${https}&ssh=${ssh}`);
      chrome.action.setPopup({
        tabId: sender.tab.id,
        popup: chrome.runtime.getURL(url)
      });
      break;

     case "disable-page-action":
      chrome.action.setIcon({
        tabId: sender.tab.id,
        path: {
          128: "icons/icon-disabled-128.png"
        }
      });
      chrome.action.setPopup({
        tabId: sender.tab.id,
        popup: chrome.runtime.getURL("popups/disabled.html")
      });
      break;

     case "get-protocol":
      getProtocol().then((protocol => {
        sendResponse({
          protocol
        });
      }));
      return true;

     case "save-protocol":
      saveProtocol(message.protocol).then((() => {
        chrome.runtime.sendMessage({
          type: "protocol-changed",
          newValue: message.protocol
        }).catch((() => {}));
        chrome.tabs.query({}, (tabs => {
          tabs.forEach((t => {
            chrome.tabs.sendMessage(t.id, {
              type: "protocol-changed",
              newValue: message.protocol
            }).catch((() => {}));
          }));
        }));
      })).catch((() => {}));
      break;

     case "get-modify-pages":
      getModifyPages().then((allow => {
        sendResponse({
          allow
        });
      }));
      return true;

     case "save-modify-pages":
      saveModifyPages(message.allow).then((() => {
        chrome.tabs.query({}, (tabs => {
          tabs.forEach((t => {
            chrome.tabs.sendMessage(t.id, {
              type: "modify-pages-changed",
              newValue: message.allow
            }).catch((() => {}));
          }));
        }));
      })).catch((() => {}));
      break;
    }
    return;
  };
  const handleTabUpdated = async (tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") await updateActionMenu(tab.url);
  };
  const handleTabActivated = async activeInfo => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    await updateActionMenu(tab.url);
  };
  const updateActionMenu = async url => {
    if (!url) {
      actionMenu.update({
        enabled: true,
        checked: false
      });
      return;
    }
    if (isHostPermissionGrantedByManifest(url)) actionMenu.update({
      enabled: false,
      checked: true
    }); else if (await isHostPermissionGrantedByUser(url)) actionMenu.update({
      enabled: true,
      checked: true
    });
  };
  const reloadActiveTab = async () => {
    const queriedTabs = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });
    const activeTab = queriedTabs.length > 0 ? queriedTabs[0] : null;
    if (activeTab) await chrome.tabs.reload(activeTab.id);
  };
  chrome.runtime.onInstalled.addListener(handleInstalled);
  chrome.runtime.onMessage.addListener(handleMessage);
  chrome.tabs.onUpdated.addListener(handleTabUpdated);
  chrome.tabs.onActivated.addListener(handleTabActivated);
})();