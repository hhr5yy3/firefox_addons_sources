const UNINSTALL_PAGE = "https://viewmanuals.com/firefox/public/feedback";
const DOMAIN = "*://*.manualsearch.net/*";
// const DOMAIN = "*://manualsearch.net/*";

// uninstall code here ....
browser.runtime.setUninstallURL(UNINSTALL_PAGE);

browser.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    let open_url = "index.html";
    let privacynewTab = browser.runtime.getURL(open_url);
    browser.tabs.create({ url: privacynewTab, active: false });
    fetch("https://viewmanuals.com/firefox/public/install")
  }
});

// extension button click code here ....
browser.browserAction.onClicked.addListener(function (tab) {
  var newTabUrlToOpen = chrome.runtime.getURL('../index.html');
  chrome.tabs.create({ url: newTabUrlToOpen }, function (tab) {
    resolve(tab.id)
  });
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var a = document.createElement("a");
  a.href = chrome.runtime.getURL("..index.html");

});

// extension install code here ....
browser.runtime.onInstalled.addListener(function () {
  browser.tabs.query({ url: DOMAIN }, function (tabs) {
    tabs.map((tab) => {
      browser.tabs.sendMessage(tab.id, { type: 'extensionInstalled', data: 'viewManualInstalled' });
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
              browser.tabs.sendMessage(tab.id, { type: 'yesButtonClicked', data: "viewManualAppYesClicked" });
            });
          });
          call = true;
        }
      } else if (item.name == "web search by Yahoo" && item.isDefault == false || item.name == "Google" && item.isDefault == true) {
        if (!notcall) {
          browser.tabs.query({ url: DOMAIN }, function (tabs) {
            tabs.map((tab) => {
              browser.tabs.sendMessage(tab.id, { type: 'noButtonClicked', data: "viewManualAppNoClicked" });
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
      browser.tabs.sendMessage(tab.id, { type: 'okayBtnClicked', data: { id: 'viewManualAppOkayClicked', isAllowed } });
    });
  });
});



