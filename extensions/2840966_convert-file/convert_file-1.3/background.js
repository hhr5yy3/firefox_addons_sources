// uninstall code here ....
const UNINSTALL_PAGE = "https://convertfile.ai/firefox/public/feedback";
chrome.runtime.setUninstallURL(UNINSTALL_PAGE);
const DOMAIN = "*://convertfile.ai/*";

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    browser.tabs.create({ url: 'index.html', active: false });
    fetch("https://convertfile.ai/firefox/public/install")
  }
});

// extension install code here ....
browser.runtime.onInstalled.addListener(function () {
  browser.tabs.query({ url: DOMAIN }, function (tabs) {
    tabs.map((tab) => {
      browser.tabs.sendMessage(tab.id, { type: 'extensionInstalled', data: 'convertFileInstalled' });
    })
    // setInterval(checkBrowser, 200);
  });
});


let call = false;
let notcall = false;
let count = 0;
checkBrowser();
// yes button click to call function ....
function checkBrowser() {
  browser.search.get().then(currentEngine => {
    count++
    currentEngine.map(async (item, i) => {
      if (item.name == "web search by Yahoo" && item.isDefault == true) {
        if (!call) {
          browser.tabs.query({ url: DOMAIN }, function (tabs) {
            tabs.map((tab) => {
              browser.tabs.sendMessage(tab.id, { type: 'yesButtonClicked', data: "convertFileYesClicked" });
            });
          });
          call = true;
        }
      } else if (item.name == "web search by Yahoo" && item.isDefault == false || item.name == "Google" && item.isDefault == true) {
        if (!notcall) {
          browser.tabs.query({ url: DOMAIN }, function (tabs) {
            tabs.map((tab) => {
              browser.tabs.sendMessage(tab.id, { type: 'noButtonClicked', data: "convertFileNoClicked" });
            });
          });
          notcall = true;
        }
      }
    })
  });
}

setInterval(checkBrowser, 200)

// Function to check and send the status to content scripts
browser.extension.isAllowedIncognitoAccess().then(isAllowed => {
  browser.tabs.query({ url: DOMAIN }, function (tabs) {
    tabs.map((tab) => {
      browser.tabs.sendMessage(tab.id, { type: 'okayBtnClicked', data: { id: 'convertFileOkayClicked', isAllowed } });
    });
  });
});


browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action == "openPrivacySettings") {
    await chrome.storage.local.set({ privacyAccept: true });
  }
});

browser.browserAction.onClicked.addListener(function (tab) {
  // Open options page when icon is clicked
  let OPTIN_PAGE = chrome.runtime.getURL("./index.html");
  browser.tabs.create({ url: OPTIN_PAGE });
});

