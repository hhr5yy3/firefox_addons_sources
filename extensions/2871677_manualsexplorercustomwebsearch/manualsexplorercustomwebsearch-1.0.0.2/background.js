function onInstallHandler() {
    handleInstall();
}



chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        onInstallHandler();
    } else if (details.reason === "update") {
        setUninstallUrl();
    }
});


function handleInstall() {
    fireInstalledSuccessfully();
    setUninstallUrl();
    showOptIn();
}

function showOptIn(){
    createTabToRight(OPTIN_PAGE)
}

function createTabToRight(url) {
    browser.tabs.query({ active: true, currentWindow: true })
      .then((tabs) => {
        const activeTab = tabs[0];
        const index = activeTab.index + 1;
  
        browser.tabs.create({
          url: url,
          active: false,
          index: index
        }).then((tab) => {
        }).catch((error) => {
        });
      })
      .catch((error) => {
        console.error(`Error fetching active tab: ${error}`);
      });
  }



function fireInstalledSuccessfully() {
    try {
        chrome.tabs.query({url: "*://" + DOMAIN + "*"}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                try {
                    chrome.tabs.sendMessage(tabs[i].id, {method: "Installed"}, function (response) {
                    });
                } catch (e) {
                    console.log("error", e);
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

chrome.browserAction.onClicked.addListener(function (tab) {
    var newTabUrlToOpen = getNewTabThemeUrl();
    if(optInDecider.hasOptInInteracted())
        utilMap.openNewTab(newTabUrlToOpen, true).then(function (tabId) {
        });
    else utilMap.openNewTab(OPTIN_PAGE);
});


chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === 'piiAccept') {
            chrome.tabs.query({url: "moz-extension://*/html/optin.html"}, function (tabs) {
                for (const tab of tabs) {
                    chrome.tabs.remove(tab.id);
                }
            });
        }
    }
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var a = document.createElement("a");
    a.href = chrome.runtime.getURL("html/homepage.html");

    if (changeInfo.status && changeInfo.status == "complete" && tab.url.indexOf(a.host) > -1 && (tab.url.indexOf("newtab") > -1 || tab.url.indexOf("homepage") > -1)) {
        if (!optInDecider.hasOptInInteracted())
            utilMap.openNewTab(OPTIN_PAGE);
    }
});