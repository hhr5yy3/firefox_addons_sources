var oldId;
function onCreated(tab) {
  browser.tabs.remove(oldId);
}
function onError(error) {
  //console.log(`Error: ${error}`);
}
browser.browserAction.onClicked.addListener((tab) => {
  oldId = tab.id;
  var creating = browser.tabs.create({openInReaderMode: true, url: tab.url, index: tab.index, openerTabId: oldId});
  creating.then(onCreated, onError);
});
