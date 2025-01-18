browser.browserAction.onClicked.addListener(function (tab) {
  browser.tabs.create({
    url: "https://youtube01.com/get.php?url=" + tab.url,
  });
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    changeInfo.url &&
    // changeInfo.status == "complete" &&
    changeInfo.url.includes("youtube.com/watch?v=")
  ) {
    browser.tabs.sendMessage(
      tabId,
      {
        message: "insert_button",
      },
      function () {
        browser.runtime.lastError;
      }
    );
  }
});
