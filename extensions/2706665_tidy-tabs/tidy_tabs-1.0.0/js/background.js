(() => {
  var __webpack_exports__ = {};
  console.log("background.js");
  browser.tabs.onCreated.addListener((tab => {
    console.log(tab);
    browser.tabs.query({
      currentWindow: true,
      url: tab.url,
      title: tab.title
    }).then((tabs => {
      tabs.map((t => t.id !== tab.id ? browser.tabs.remove(t.id) : null));
    }), (err => {
      console.log(err);
    }));
  }));
  browser.tabs.onUpdated.addListener(((tabId, changeInfo, tabInfo) => {
    if (changeInfo.url) {
      const {hostname} = new URL(changeInfo.url);
      browser.tabs.query({
        currentWindow: true,
        url: `*://${hostname}/*`
      }).then((tabs => {
        tabs.map((t => t.id !== tabId ? browser.tabs.remove(t.id) : null));
      }), (err => {
        console.log(err);
      }));
    }
  }));
})();