// background.js

let options = { enableBackground: false, enableFont: false, cursorColor: '#FFA500', enableCursor: false };

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updateOptions') {
    options = { ...options, ...request.options };
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'updateOptions', options: options });
      });
    });
  } else if (request.action === 'getOptions') {
    sendResponse(options);
  }
});

// Retrieve options when the extension is loaded
chrome.runtime.onInstalled.addListener(function () {
  chrome.runtime.sendMessage({ action: 'getOptions' }, function (response) {
    options = response || options;
  });
});

