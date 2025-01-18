/* On extension load, add listeners for user key commands: Alt+K, Alt+L & send appropriate message to active tab */
browser.commands.onCommand.addListener(function (command) {
  if (command === "reverse_status") {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      browser.tabs.sendMessage(tabs[0].id, { message: "reverse_status" });
    });
  }
  if (command === "toggle_selected") {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      browser.tabs.sendMessage(tabs[0].id, { message: "toggle_selected" });
    });
  }
});
