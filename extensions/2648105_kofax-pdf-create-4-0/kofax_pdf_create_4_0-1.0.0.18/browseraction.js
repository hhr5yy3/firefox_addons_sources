
function enableBrowserAction(tabid) {
    chrome.browserAction.setIcon({ path: "skin/action_19x19.png", tabId: tabid });
    chrome.browserAction.setTitle({ title: chrome.i18n.getMessage("web2pdfBrowserActionToolTip"), tabId: tabid });
    chrome.browserAction.setPopup({ popup: "popup.html", tabId: tabid });
}

function disableBrowserAction(tabid) {
    chrome.browserAction.setIcon({ path: "skin/action_disabled_19x19.png", tabId: tabid });
    chrome.browserAction.setTitle({ title: chrome.i18n.getMessage("web2pdfBrowserActionDisabledToolTip"), tabId: tabid });
    chrome.browserAction.setPopup({ popup: "", tabId: tabid });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "InvokeEnableBrowserActionButton") {
        enableBrowserAction(sender.tab.id);
        sendResponse({ state: "enabled" });
    }
});
