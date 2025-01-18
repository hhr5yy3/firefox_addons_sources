browser.browserAction.onClicked.addListener((tab) => {
  if (tab && tab.url) {
    const newUrl = `https://removepaywalls.com/${tab.url}`;
    browser.tabs.update(tab.id, { url: newUrl });
  }
});