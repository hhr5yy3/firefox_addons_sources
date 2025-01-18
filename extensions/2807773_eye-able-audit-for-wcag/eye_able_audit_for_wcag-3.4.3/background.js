/**
 * The Background handles messages and mainly opens the popup-window
 */

//check if a license was created yet, else open license menu
chrome.action.onClicked.addListener(function () {
    chrome.storage.local.get(['eyeAble_Settings'], function (result) {
        if (result.eyeAble_Settings && result.eyeAble_Settings.apiKey && navigator.userAgent.indexOf("Firefox") === -1) {
            chrome.windows.create({
                'url': 'popup.html',
                'type': 'popup',
                'width': 1144,
                'height': 860
            }, function (window) {
            });
        } else {
            chrome.windows.create({
                'url': 'licensing.html',
                'type': 'popup',
                'width': 800,
                'height': 860
            }, function (window) {
            });
        }
    });
});

//receive messages from onsite js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === "openPopUp") {
        let targetUrl = "";
        if (request.targetUrl) {
            targetUrl = "?test=" + request.targetUrl;
        }
        chrome.windows.create({
            'url': 'popup.html' + targetUrl,
            'type': 'popup',
            'width': 1144,
            'height': 860
        }, function (window) {
            // console.log(window);
            // setTimeout(function () {
            //     chrome.tabs.sendMessage(window.tabId,
            //         {
            //             "url": "test.de"
            //         });
            // },1000);
        });
    } else if (request.greeting === "openLicensing") {
        chrome.windows.create({'url': 'licensing.html', 'type': 'popup', 'width': 800, 'height':860}, function (window) {
            });
        }
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "eyeAbleAudit",
        title: chrome.i18n.getMessage("contextMenuText"),
        contexts: ["all"],  // ContextType
    });

    //check if settings exists already, if so the plugin is already installed
    chrome.storage.local.get(['eyeAble_Settings'], function (result) {
        if (!result.eyeAble_Settings) {
            //open a info page of the functions on install
            chrome.tabs.create({url: "https://dashboard.eye-able.com/audit"}, function () {
            })
        }
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    chrome.tabs.sendMessage(tab.id, {"greeting": "openDashboard"});
});






