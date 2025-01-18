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

chrome.alarms.onAlarm.addListener(alarm => {

    chrome.windows.create({'url': '/showAlarm/alarmshow.html', 'type': 'popup', width: 390, height:237, 'left': screen.availWidth - 390,
    'top': screen.availHeight - 235 }, function(newWindow) {
    storageReplacer.getLocalStorageItem('currentWindow', result => {
        if (result.currentWindow !== undefined) {
        chrome.windows.get(result.currentWindow, window => {
            if (window !== undefined && window.id === result.currentWindow) {
            chrome.windows.remove(result.currentWindow);
        }
    });
    }
});
    storageReplacer.setLocalStorageItem('currentWindow', newWindow.id);
        if(storageReplacer.getLocalStorageItem('alarmData')!==undefined) {
            var result = JSON.parse(storageReplacer.getLocalStorageItem('alarmData'));
            if (result !== undefined) {
                let alarmName;
                let relatedAlarmIndex;
                if (alarm.name.indexOf('snooze') !== -1) {
                    alarmName = alarm.name.substring(6, alarm.name.length);
                    for(var index=0;index<result.length;index++){
                        if(result[index].id===parseInt(alarmName)){
                            relatedAlarmIndex=index;
                        }
                    }

                }
                else {
                    alarmName = alarm.name;
                    for (let i = 0; i < result.length; i++) {
                        const alarmObj = result[i];
                        alarmObj.alarmList.forEach(function(day){
                            let finalId=alarmObj.id.toString() + day.toString();
                            if(finalId===alarmName){
                                relatedAlarmIndex =i;
                            }
                        })
                    }

                }
                storageReplacer.setLocalStorageItem('currentAlarm', JSON.stringify(result[relatedAlarmIndex]));
                storageReplacer.setLocalStorageItem('alarmData', JSON.stringify(result));
            }

        }
});
});