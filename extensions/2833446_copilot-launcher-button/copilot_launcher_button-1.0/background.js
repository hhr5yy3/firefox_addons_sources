browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: "https://copilot.microsoft.com"});
});
