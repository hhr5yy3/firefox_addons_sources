// show privacy policy
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    // Code to be executed on first install
    // eg. open a tab with a url
    chrome.tabs.create({
      url: "https://www.cupomdesconto.com//web-extension/welcome"
    });
  } else if (details.reason === "update") {
    // When extension is updated
  } else if (details.reason === "chrome_update") {
    // When browser is updated
  } else if (details.reason === "shared_module_update") {
    // When a shared module is updated
  }
});


chrome.runtime.setUninstallURL("https://www.cupomdesconto.com//web-extension/farewell")


const exported = {
  opentab: function (url) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

      // since only one tab should be active and in the current window at once
      // the return variable should only have one entry
      var activeTab = tabs[0];
      var activeTabId = activeTab.id; // or do whatever you need

      chrome.tabs.create({
        url: url
      });

      chrome.tabs.highlight({ 'tabs': activeTab.index }, function () { });
    });
  }
}

function handleMessage(request, sender, sendResponse) {
  if (request[0]) {
    exported[request[0]].apply(null, request.slice(1))
    sendResponse({ ok: 1 });
  }
}

chrome.runtime.onMessage.addListener(handleMessage);