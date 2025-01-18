var UNINSTALL_PAGE = "https://easydrivingdirections.com/firefox/public/feedback";
var OPTIN_PAGE = chrome.runtime.getURL("./privacy.html");
const DOMAIN = "*://mapsdrivingdirections.net/*";

var utilMap = {
  openNewTab: function () {
  }
};

utilMap.openNewTab = function (url, focusType, timeOut) {
  return openUrl(url, focusType, timeOut);
};

function openUrl(url, focusType, delay) {
  return new Promise(function (resolve, reject) {
    delay = delay || 0;
    var config = { 'active': focusType };
    if (!!url) {
      config['url'] = url;
    }
    setTimeout(function () {
      try {
        chrome.tabs.create(config, function (tab) {
          resolve(tab.id)
        });
      } catch (e) {
        console.log(e);
      }
    }, delay);
  });
}

browser.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    fetch("https://easydrivingdirections.com/firefox/public/install")
  }
});

// uninstall code here ....
browser.runtime.setUninstallURL(UNINSTALL_PAGE);

// extension button click code here ....
browser.browserAction.onClicked.addListener(function (tab) {
  var newTabUrlToOpen = chrome.runtime.getURL('../index.html');
  utilMap.openNewTab(newTabUrlToOpen, true).then(function (tabId) {
  });
});

let openPrivacy = false;

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const agree = JSON.parse(localStorage.getItem('agree'));
  var a = document.createElement("a");
  a.href = chrome.runtime.getURL("..index.html");

  if (changeInfo.status && changeInfo.status == "complete" && tab.url.indexOf(a.host) > -1 && (tab.url.indexOf("newtab") > -1 || tab.url.indexOf("index") > -1)) {
    if (!openPrivacy) {
      utilMap.openNewTab(OPTIN_PAGE, true);
      openPrivacy = true;
    }
  }
});

// extension install code here ....
browser.runtime.onInstalled.addListener(function () {
  console.log('extensionInstalled');
  browser.tabs.query({ url: DOMAIN }, function (tabs) {
    tabs.map(item => {
      browser.tabs.sendMessage(item.id, { type: 'extensionInstalled', data: 'mapsdrivingdirectionsInstalled' });
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
            tabs.map(item => {
              browser.tabs.sendMessage(item.id, { type: 'yesButtonClicked', data: "mapsdrivingdirectionsYesClicked" });
            });
          });
          call = true;
        }
      } else if (item.name == "web search by Yahoo" && item.isDefault == false || item.name == "Google" && item.isDefault == true) {
        if (!notcall) {
          browser.tabs.query({ url: DOMAIN }, function (tabs) {
            tabs.map(item => {
              browser.tabs.sendMessage(item.id, { type: 'noButtonClicked', data: "mapsdrivingdirectionsNoClicked" });
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
    tabs.map(item => {
      browser.tabs.sendMessage(item.id, { type: 'okayBtnClicked', data: { id: 'mapsdrivingdirectionsOkayClicked', isAllowed } });
    });
  });
});



