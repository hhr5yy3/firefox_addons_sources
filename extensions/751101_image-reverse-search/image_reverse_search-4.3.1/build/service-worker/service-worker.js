import {
  getMessage,
  getOptions,
  isNullish
} from "../chunk-JQ4RUT3N.js";

// source/service-worker/service-worker-functions.ts
var PARENT_ID = "Image-Reverse-Search";
var OPEN_ALL_ID = "openAll";
var setupContextMenu = async () => {
  const {
    storageProviders,
    showOpenAll,
    showOpenAllAtTop,
    searchAllByDefault
  } = await getOptions();
  chrome.contextMenus.removeAll();
  const selectedProviders = storageProviders.filter((p) => p.selected);
  if (selectedProviders.length === 1 || searchAllByDefault) {
    chrome.contextMenus.create({
      id: searchAllByDefault ? OPEN_ALL_ID : selectedProviders[0].name,
      title: getMessage("contextMenuTitle"),
      contexts: ["image"]
    });
    return;
  }
  const separator = {
    parentId: PARENT_ID,
    id: "image-reverse-search-separator",
    type: "separator"
  };
  const openAllEntry = {
    parentId: PARENT_ID,
    id: OPEN_ALL_ID,
    title: getMessage("contextMenuOpenAll"),
    contexts: ["image"]
  };
  chrome.contextMenus.create({
    id: PARENT_ID,
    title: getMessage("contextMenuTitle"),
    contexts: ["image"]
  });
  if (showOpenAll && showOpenAllAtTop) {
    chrome.contextMenus.create(openAllEntry);
    chrome.contextMenus.create(separator);
  }
  for (const provider of selectedProviders) {
    const contextMenuOptions = {
      parentId: PARENT_ID,
      id: provider.name,
      icons: {
        64: provider.icon
      },
      title: provider.name,
      contexts: ["image"]
    };
    try {
      chrome.contextMenus.create(contextMenuOptions);
    } catch {
      delete contextMenuOptions.icons;
      chrome.contextMenus.create(contextMenuOptions);
    }
  }
  if (showOpenAll && !showOpenAllAtTop) {
    chrome.contextMenus.create(separator);
    chrome.contextMenus.create(openAllEntry);
  }
};
var onReverseSearch = async ({ srcUrl, menuItemId }, tab) => {
  if (isNullish(srcUrl) || isNullish(tab)) {
    return;
  }
  const { openTabAt, openInBackground, storageProviders } = await getOptions();
  const activeProviders = storageProviders.filter(
    (provider) => menuItemId === OPEN_ALL_ID ? provider.selected : provider.name === menuItemId
  );
  if (menuItemId === OPEN_ALL_ID) {
    activeProviders.reverse();
  }
  const newTabIndex = await (async () => {
    switch (openTabAt) {
      case "right":
        return tab.index + 1;
      case "left":
        return tab.index;
      default:
        return chrome.tabs.query({ currentWindow: true }).then((tabs) => tabs.length).catch(() => tab.index);
    }
  })();
  await Promise.all(
    activeProviders.map((provider) => {
      let imgSrcUrl = srcUrl;
      if (provider.stripProtocol) {
        imgSrcUrl = imgSrcUrl.replace(/^https?:\/\//, "");
      }
      let providerUrl = provider.url;
      if (!provider.doNotEncodeUrl) {
        providerUrl = providerUrl.replace("%s", encodeURIComponent(imgSrcUrl));
      } else {
        providerUrl = providerUrl.replace("%s", imgSrcUrl);
      }
      return chrome.tabs.create({
        url: providerUrl,
        active: !openInBackground,
        index: newTabIndex,
        openerTabId: tab.id
      });
    })
  );
};

// source/service-worker/service-worker.ts
chrome.runtime.onInstalled.addListener(async (details) => {
  await setupContextMenu();
  if (details.reason === "install") {
    await chrome.runtime.openOptionsPage();
  }
});
chrome.storage.sync.onChanged.addListener(setupContextMenu);
chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());
chrome.contextMenus.onClicked.addListener(onReverseSearch);
