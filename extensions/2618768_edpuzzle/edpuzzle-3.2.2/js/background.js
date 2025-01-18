// Add a listener so background knows when a tab has changed.
// You need 'tabs' permission, that's why we added it to manifest file.

if (chrome && chrome.tabs) {
  // Should work for both Chrome an Firefox
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (
      tab.url.indexOf("youtube.com/watch") > -1 &&
      changeInfo &&
      changeInfo.status == "complete"
    ) {
      chrome.tabs.executeScript(tabId, {
        file: "js/edit_with_edpuzzle_button.js",
        runAt: "document_end",
        allFrames: false
      });

      chrome.pageAction.show(tabId);
    } else if (
      (tab.url.indexOf("edpuzzle.com") > -1 ||
        tab.url.indexOf("localhost") > -1) &&
      changeInfo &&
      changeInfo.status == "complete"
    ) {
      chrome.tabs.executeScript(tabId, {
        file: "js/edpuzzle_extension_detection_helper.js",
        runAt: "document_end",
        allFrames: false
      });

      chrome.pageAction.show(tabId);
    }
  });
} else {
  // For old Firefox versions that do not have chrome.*
  browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (
      tab.url.indexOf("youtube.com/watch") > -1 &&
      changeInfo &&
      changeInfo.status == "complete"
    ) {
      browser.tabs.executeScript(tabId, {
        file: "js/edit_with_edpuzzle_button.js",
        runAt: "document_end",
        allFrames: false
      });

      browser.pageAction.show(tabId);
    } else if (
      tab.url.indexOf("edpuzzle.com") > -1 &&
      changeInfo &&
      changeInfo.status == "complete"
    ) {
      browser.tabs.executeScript(tabId, {
        file: "js/edpuzzle_extension_detection_helper.js",
        runAt: "document_end",
        allFrames: false
      });

      browser.pageAction.show(tabId);
    }
  });
}
