/** @format */

let manifest = chrome.runtime.getManifest();

if (manifest.description.includes('Chrome')) {
  chrome.tabs.getCurrent(function (tab) {
    chrome.tabs.update(tab.id, {
      url: `chrome://extensions/?id=${chrome.runtime.id}`,
    });
  });
} else {
  chrome.tabs.getCurrent(function (tab) {
    chrome.tabs.update(tab.id, {
      url: `edge://extensions/?id=${chrome.runtime.id}`,
    });
  });
}
