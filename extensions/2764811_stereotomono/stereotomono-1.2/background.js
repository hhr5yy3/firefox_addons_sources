"use strict";
if (chrome.runtime.getManifest().manifest_version === 2) {
  var chrome = browser;
  chrome.action = chrome.browserAction;
}

chrome.runtime.onInstalled.addListener(() => {
  if (chrome.runtime.getManifest().manifest_version === 2) {
    var contextsValue = ["browser_action"];
  } else {
    var contextsValue = ["action"];
  }
  chrome.contextMenus.create({
    title: "🔊 Keep Mono Preference 🔊",
    contexts: contextsValue,
    type: "checkbox",
    id: "permanentMono",
    checked: setMenuCheckbox("permanentMono") || false,
  });
  chrome.contextMenus.create({
    title: "☕ $upport development ☕",
    contexts: contextsValue,
    type: "normal",
    id: "supportAuthor"
  });
});

chrome.action.onClicked.addListener(function (tabs) {
  chrome.tabs.sendMessage(tabs.id, { command: "extensionButtonClicked" },
    function (response) { handleResponseToSetIconBadge(response, tabs.id); })
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "supportAuthor") {
    chrome.tabs.create({ url: "https://www.paypal.com/donate/?hosted_button_id=MQEHVQSXDDMAG" });
  }
  if (info.menuItemId === "permanentMono") {
    chrome.storage.session.set({ "permanentMono": info.checked }, function (setResult) {
      chrome.storage.session.get("permanentMono", function (getResult) {
        // setIconBadgeTextFromValue(tab.id, getResult ? "mono" : "stereo");
        chrome.tabs.sendMessage(tab.id,
          { command: "extensionButtonClicked", isPermanentMono: getResult.permanentMono },
          function (response) { handleResponseToSetIconBadge(response, tab.id); })
      });
    });
  }
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    chrome.storage.session.get("permanentMono", function (result) {
      if (result.permanentMono === true) {
        chrome.tabs.sendMessage(tabId, { command: "onUpdatedComplete", isPermanentMono: result.permanentMono }, function (response) {
          { handleResponseToSetIconBadge(response, tab.id); };
        });
      }
    });
  }
});

chrome.tabs.onActivated.addListener(function () {
  setMenuCheckbox("permanentMono");
});

//UTILITY FUNCTIONS
function setMenuCheckbox(menuKey) {
  chrome.storage.session.get(menuKey, function (result) {
    chrome.contextMenus.update(menuKey, { checked: result.permanentMono });
  });
}

function allowedAddresses(p) {
  if (typeof p !== "undefined") {
    return p.substr(0, 4) === "http" || p.substr(0, 4) === "file";
  }
}

function setIconBadgeTextFromValue(tabId, badgeText) {
  chrome.action.setBadgeText({
    text: badgeText,
    tabId: tabId
  });
}

function whenUrlIsAllowedExecuteFunction(functionToExecute) {
  if (typeof functionToExecute !== "function") { return; }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    if (typeof tab[0].url === "undefined") {
      return;
    } else if (tab[0].url.substr(0, 4) === "http" || tab[0].url.substr(0, 4) === "file") {
      functionToExecute();
    }
  });
}

function handleResponseToSetIconBadge(response, id) {
  if (response) {
    if (response.isNoSourceFound === true) {
      setIconBadgeTextFromValue(id, "n/a");
    } else if (response.isMono) {
      setIconBadgeTextFromValue(id, "mono");
    } else if (!response.isMono) {
      setIconBadgeTextFromValue(id, "stereo");
    }
  }
}