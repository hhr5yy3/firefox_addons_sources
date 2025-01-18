browser.runtime.onMessage.addListener((req, sender, res) => {
  if (req.cd === "showSomething") {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs.length > 0) {
        browser.pageAction.show(tabs[0].id);
      }
    }).catch((error) => {
      console.error("Error querying tabs: ", error);
    });
  }
});