/* global browser */

browser.tabs.onActivated.addListener(function(activeInfo) {
    browser.tabs.get(activeInfo.tabId).then(function(tabInfo) {
        updateBrowserActionPopup(tabInfo);
    });
});

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tabInfo) {
    updateBrowserActionPopup(tabInfo);
});

browser.tabs.query({currentWindow: true, active: true}).then(function(tabInfo) {
    if (tabInfo.length > 0) {
        updateBrowserActionPopup(tabInfo[0]);
    }
});

function updateBrowserActionPopup(tabInfo) {
    if (tabInfo.title && tabInfo.url) {
        var popupUrl = 'https://share.flipboard.com/bookmarklet/popout?v=2'
                + '&title=' + encodeURIComponent(tabInfo.title)
                + '&url=' + encodeURIComponent(tabInfo.url)
                + '&fromFlipThisAddon=1'
                + '&t=' + Math.round(new Date().getTime()/3600); // invalidate cache once per hour
        browser.browserAction.setPopup({
            popup: popupUrl
        });
    }
}
