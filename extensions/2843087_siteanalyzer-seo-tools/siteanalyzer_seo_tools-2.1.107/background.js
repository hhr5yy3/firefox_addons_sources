const seoExtensionAPI = typeof browser !== "undefined" ? browser : chrome;

seoExtensionAPI.runtime.onInstalled.addListener(() => {
  seoExtensionAPI.storage.local.set({
    updated: true,
  });
});

seoExtensionAPI.runtime.onMessage.addListener(messageReceived);
function messageReceived(request, sender, sendResponse) {
  if (request?.action === "getSource") {
    seoExtensionAPI.tabs.query({ active: true }, function (tabs) {
      const currTab = tabs[0];
      if (currTab) {
        const url = seoExtensionAPI.runtime.getURL("source.html#" + currTab.id);
        seoExtensionAPI.tabs.create({ url: url });
      }
    });
  }
}

seoExtensionAPI.runtime.onConnect.addListener(function(port) {
  if (port.name === "popup") {
    port.onDisconnect.addListener(function() {
      const api = typeof browser !== "undefined" ? browser : chrome;
      api.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
      });
    });
  }
});

seoExtensionAPI.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "openGraph") {
      seoExtensionAPI.tabs.create(
        {
          url: seoExtensionAPI.runtime.getURL("graph.html"),
        },
        (tab) => {
          seoExtensionAPI.tabs.onUpdated.addListener(function listener(
            tabId,
            changeInfo
          ) {
            if (tabId === tab.id && changeInfo.status === "complete") {
              chrome.tabs.onUpdated.removeListener(listener);
              chrome.tabs.sendMessage(tabId, {
                message: "renderGraph",
                tree: request.tree,
                locale: request.locale,
                hostname: request.hostname,
              });
            }
          });
        }
      );
    }
  }
);
