// Start the adds-on
browser.browserAction.onClicked.addListener(tab => {
  // Sent message
  browser.tabs.sendMessage(tab.id, { active: true });
});
