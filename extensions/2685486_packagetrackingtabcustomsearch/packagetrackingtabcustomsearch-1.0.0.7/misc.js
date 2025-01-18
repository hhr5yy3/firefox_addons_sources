try {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            var res = {};
            switch (request.task) {
                case valueMap.requestKeys.getId: {
                    sendResponse({id: getExtensionId()});
                    break;
                }
            }
        });
} catch (err) {
}


function removeTabsWithURLPattern(urlPattern) {
    browser.tabs.query({ url: urlPattern })
      .then((tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs.remove(tab.id);
        });
      })
      .catch((error) => {
        console.error(`Error removing tabs: ${error}`);
      });
  }

try {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            switch (request.task) {
                case valueMap.requestKeys.loadOptInState : {
                    communicateStateChange(optInKeys.ipAccept, optInStorageUtil.getItem(optInKeys.ipAccept));
                    communicateStateChange(optInKeys.techAccept, optInStorageUtil.getItem(optInKeys.techAccept));
                    break;
                }

                case valueMap.requestKeys.showOptInPage: {
                    utilMap.openNewTab(OPTIN_PAGE);
                    break;
                }

                case valueMap.requestKeys.closeoptinpage: {
                    removeTabsWithURLPattern(sender.tab.url);
                    break;
                }

                case valueMap.requestKeys.optinStateChanged: {
                    communicateStateChange(optInKeys.ipAccept, optInStorageUtil.getItem(optInKeys.ipAccept));
                    communicateStateChange(optInKeys.techAccept, optInStorageUtil.getItem(optInKeys.techAccept));
                    break;
                }
            }
            sendResponse({});
        });
} catch (err) {
}

function sendDataToDomainPages(messageObject) {
    try {
        chrome.tabs.query({url: "*://" + DOMAIN + "*"}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                try {
                    chrome.tabs.sendMessage(tabs[i].id, messageObject, function (response) {});
                } catch (e) {
                    console.log("error in message communication", e);
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

function communicateStateChange(key, value) {
    var messageObject = {task: valueMap.requestKeys.stateCommunicator, optInKey: key, optInStatus: value};
    sendDataToDomainPages(messageObject);
}

