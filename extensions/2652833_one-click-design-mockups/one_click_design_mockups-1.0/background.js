const postUrl = 'https://screenshot.rocks/api/setImage'
const postData = (url, data) => {
    browser.tabs.create(
        {url: browser.runtime.getURL("post.html")}, (tab) => {
            const handler = function (tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.status === "complete") {
                    browser.tabs.onUpdated.removeListener(handler);
                    browser.tabs.sendMessage(tabId, {url: url, data: data});
                }
            };

            browser.tabs.onUpdated.addListener(handler);
            browser.tabs.sendMessage(tab.id, {url: url, data: data});
        }
    );
};

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.captureVisibleTab((screenshotUrl) => {
        postData(postUrl, {"image": screenshotUrl});
    });
});