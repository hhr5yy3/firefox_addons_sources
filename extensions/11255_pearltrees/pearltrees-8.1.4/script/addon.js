
var PEARLTREES_URL = "https://www.pearltrees.com/";

var PEARLTREES_URL_HTTP = "http://www.pearltrees.com/";

var PEARLTREES_URL_BASE = ".pearltrees.com";

var COLLECTOR_URL = PEARLTREES_URL + "s/collectorFirefox/";
var pearlerType = "Firefox";
var pearlerVersion = "8.1.3";;

addGWTLang();

function getMessage(messageName) {
   return chrome.i18n.getMessage(messageName);
}

function getPopupView() {
   var viewUrl = chrome.extension.getURL('popup.html');
   var views = chrome.extension.getViews();
   for (var i = 0; i < views.length; i++) {
       var view = views[i];
       if (view.location.href == viewUrl) {
           return view;
       }
   }
   return null;
}

function addGWTLang() {
	var lang = navigator.language;
	if (lang.indexOf("fr") == 0) {
		lang = "fr";
	}
	else {
		lang = "en";
	}
	
	var metaTag = document.createElement('meta');
	metaTag.id="gwt:property";
	metaTag.name = "gwt:property";
	metaTag.content = "locale=" + lang;
	document.getElementsByTagName('head')[0].appendChild(metaTag);
	
}

function getElementUrl(file) {
	return chrome.extension.getURL(file);
}

function getItemLayout() {
	return null;
}

function getSelectedText() {
	return null;
}

function setButtonIcon(forceGo, startAnim) {
	chrome.extension.getBackgroundPage().setButtonIcon(forceGo, startAnim);
}

function backgroundRefreshTrees(force) {
	chrome.extension.getBackgroundPage().refreshTrees(force);
}

function getUserTreesData() {
	return chrome.extension.getBackgroundPage().getBackgroundUserTreesData();
}

function getTab(onTab) {
	var querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(function(tabs) {
		var tab = tabs[0];
		onTab(tab.url, tab.title);
	});
}
function restoreSize(w , h, onSize) {
    chrome.windows.getCurrent(function(win) {
        onSize(600, 540);
    });
}

function getBackgroundSelectedTreeId() {
   return chrome.extension.getBackgroundPage().getSelectedTreeId();
}

function setBackgroundSelectedTreeId(treeId) {
   chrome.extension.getBackgroundPage().setSelectedTreeId(treeId);
}

function getBackgroundSelectedAssoId() {
   return chrome.extension.getBackgroundPage().getSelectedAssoId();
}

function setBackgroundSelectedAssoId(assoId) {
   chrome.extension.getBackgroundPage().setSelectedAssoId(assoId);
}

function pearlContent(url, title, index, treeId, parentTreeId, newTreeName, isNewTreePrivate, shareOnFb, shareOnTw) {
	chrome.extension.getBackgroundPage().pearlContent(url, title, index, treeId, parentTreeId, newTreeName, isNewTreePrivate, shareOnFb, shareOnTw);
}

function openInNewTab(href) {
	chrome.extension.getBackgroundPage().backgroundOpenInNewTab(href);
}

function reveal(treeId, assoId) {
	chrome.extension.getBackgroundPage().backgroundReveal(treeId, assoId);
}

function onPopupRefresh(login) {
   chrome.extension.getBackgroundPage().onPopupRefresh(login);
}

function openMonitoredPopup(url, width, height) {
   chrome.extension.getBackgroundPage().bgOpenMonitoredPopup(url, width, height);
   window.close();
}

function bgOpenMonitoredPopup(url, width, height) {
   chrome.windows.create({"url":url, "width":width, "height":height, "type":"popup"}, openPopupCallback);
}

var monitoredPopup = null;
var monitoredTabId = null
function openPopupCallback(newWin) {
   if (monitoredPopup) {
      chrome.windows.remove(monitoredPopup.id);
      chrome.tabs.onUpdated.removeListener(onPopupTabUpdated);
   }
   if (newWin && newWin.tabs && newWin.tabs[0]) {
      monitoredPopup = newWin;
      monitoredTabId = monitoredPopup.tabs[0].id;
      chrome.tabs.onUpdated.addListener(onPopupTabUpdated);
   }
}

function onPopupTabUpdated(tabId, changeInfo, tab) {
   if (monitoredPopup && tabId == monitoredTabId && changeInfo && changeInfo.status == "complete") {
      var url = tab.url;
      if (url && (url.indexOf("/s/signin/twitter") != -1 || url.indexOf("/s/authservice/facebook") != -1)) {
         chrome.windows.remove(monitoredPopup.id);
         chrome.tabs.onUpdated.removeListener(onPopupTabUpdated);
         backgroundRefreshTrees(true);
         monitoredPopup = null;
         monitoredTabId = null;
      }
   }
}

function getBackgroundButtonParameters() {
	return chrome.extension.getBackgroundPage().getBackgroundButtonParameters();
}

function storeBackgroundButtonParameters(data) {
	return chrome.extension.getBackgroundPage().storeBackgroundButtonParameters(data);
}

function askPermissionIfNeededInBackground(callback, notFromAd, isNewInstall) {
	return chrome.extension.getBackgroundPage().askPermissionIfNeeded(callback, notFromAd, isNewInstall);
}

function getHasGivenRights() {
	return chrome.extension.getBackgroundPage().getHasGivenRights();
}

function getChromePromoInterval() {
	return chrome.extension.getBackgroundPage().getChromePromoInterval();
}

function getPremiumPromo() {
	return chrome.extension.getBackgroundPage().getCurrentPromo();
}

function getPremiumPromoDisplayInterval() {
	return chrome.extension.getBackgroundPage().getPremiumPromoDisplayInterval();
}

function invalidateCurrentPromo() {
	return chrome.extension.getBackgroundPage().invalidateCurrentPromo();
}

function sendOpenedStatsRequest() {
	return chrome.extension.getBackgroundPage().sendOpenedStatsRequest();
}

function sendPromoStatsRequest() {
	return chrome.extension.getBackgroundPage().sendPromoStatsRequest();
}