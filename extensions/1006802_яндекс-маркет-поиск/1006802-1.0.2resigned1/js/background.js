/** 
 * Search Yandex Market for selected text
 */
function doSearch(info, tab) {
  if (!info.selectionText || info.selectionText.length == 0)
    return;

  chrome.tabs.create(
    {
      "url": "http://market.yandex.ru/search.xml?text=" + encodeURIComponent(info.selectionText),
      "selected": false
    }
  );
}

// Create context menu item
var id = chrome.contextMenus.create({"title": chrome.i18n.getMessage("contextMenuItem"), 
		       "contexts": ["selection"], 
		       "onclick": doSearch});

// Update menu item title on request
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

    if (request.action == "updateContextMenu") {

      var text = request.text.length < 43 ? request.text : request.text.slice(0, 40) + "...";
      text = ' "' + text + '"';

      chrome.contextMenus.update(id, {"title": chrome.i18n.getMessage("contextMenuItem") + text});
    }

    sendResponse({});
  });

// Clear menu item when selected tab has changed
chrome.tabs.onSelectionChanged.addListener(
  function(tab) {
    chrome.contextMenus.update(id, {"title": chrome.i18n.getMessage("contextMenuItem")});
  });

