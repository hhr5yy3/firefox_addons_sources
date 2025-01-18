browser.contextMenus.create({
  id: "hard-refresh",
  title: "Hard refresh",
  contexts: ["all"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "hard-refresh") {
    browser.tabs.reload({bypassCache: true});
  }
});