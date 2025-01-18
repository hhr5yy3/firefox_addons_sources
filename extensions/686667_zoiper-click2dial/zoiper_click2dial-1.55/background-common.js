'use strict';

function updateBrowserActionForTab(tab, exceptions) {
  if (canInjectCode(tab.url) && !matchesAnyPattern(tab.url, exceptions)) {
    chrome.browserAction.setIcon({path: ICON_PHONE_DETECTION_ACTIVE});
  } else {
    chrome.browserAction.setIcon({path: ICON_PHONE_DETECTION_INACTIVE});
  }
}

function tryInjectPhoneDetectionScripts(tab, exceptions) {
  if (canInjectCode(tab.url) && !matchesAnyPattern(tab.url, exceptions)) {
    const scripts = [
      'vendor/libphonenumber-max.js',
      'match-pattern.js',
      'helper.js',
      'click2dial.js',
    ];
    scripts.forEach((script) => {
      chrome.tabs.executeScript(tab.id, {file: script});
    });
  }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  getOptions(({exceptions}) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      updateBrowserActionForTab(tab, exceptions);
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  getOptions(({exceptions}) => {
    if (changeInfo.status === 'loading') {
      updateBrowserActionForTab(tab, exceptions);
    } else if (changeInfo.status === 'complete') {
      tryInjectPhoneDetectionScripts(tab, exceptions);
    }
  });
});

chrome.contextMenus.create({
  id: 'click2dial',
  title: `Dial with ${BRANDING_PHONE_NAME}`,
  contexts: ['selection'],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  openURI(tab, BRANDING_SCHEME + info.selectionText);
});
