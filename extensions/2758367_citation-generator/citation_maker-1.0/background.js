//Open the sidebar when the browserAction button is clicked.
browser.browserAction.onClicked.addListener(() => {
  browser.sidebarAction.open();
});
var application_id = 5;