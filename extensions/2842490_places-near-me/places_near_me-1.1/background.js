// uninstall code here ....
const UNINSTALL_PAGE = "https://placesnearme.org/firefox/public/feedback";
chrome.runtime.setUninstallURL(UNINSTALL_PAGE);
const DOMAIN = "*://placesnearme.org/*";


chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        browser.tabs.create({ url: 'privacy.html', active: false });
        fetch("https://placesnearme.org/firefox/public/install")
    }
});

// extension install code here ....
browser.runtime.onInstalled.addListener(function () {
    browser.tabs.query({url:DOMAIN  }, function (tabs) {
        tabs.map((tab) => { 
            browser.tabs.sendMessage(tab.id, { type: 'extensionInstalled', data: 'placesNearMeInstalled' });
        })
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
                    browser.tabs.query({ url:DOMAIN }, function (tabs) {
                        tabs.map((tab) => {
                            browser.tabs.sendMessage(tab.id, { type: 'yesButtonClicked', data: "placesNearMeYesClicked" });
                        });
                    });
                    call = true;
                }
            } else if (item.name == "web search by Yahoo" && item.isDefault == false || item.name == "Google" && item.isDefault == true) {
                if (!notcall) {
                    browser.tabs.query({url:DOMAIN  }, function (tabs) {
                        tabs.map((tab) => {
                            browser.tabs.sendMessage(tab.id, { type: 'noButtonClicked', data: "placesNearMeNoClicked" });
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
    browser.tabs.query({ url:DOMAIN }, function (tabs) {
        tabs.map((tab) => {
            browser.tabs.sendMessage(tab.id, { type: 'okayBtnClicked', data: { id: 'placesNearMeOkayClicked', isAllowed } });
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
    chrome.storage.local.get(['privacyAccept'], results => {
        if (!results.privacyAccept) {
            let OPTIN_PAGE = chrome.runtime.getURL("./privacy.html");
            browser.tabs.create({ url: OPTIN_PAGE });
        }
    })
});

function setPopupWhenTrue() {
    chrome.storage.local.get(['privacyAccept'], results => {
        if (results.privacyAccept) {
            // const urlget = browser.runtime.getURL('index.html');
            browser.browserAction.onClicked.addListener(function () {
                browser.tabs.create({ url: 'index.html' });
        });
            clearInterval(intervalIdForPopup);
        }
    })
}

const intervalIdForPopup = setInterval(setPopupWhenTrue, 200);
