FExtension.bg = browser.extension.getBackgroundPage();

FExtension.store = FExtension.bg.FExtension.store;
/*FExtension.network = FExtension.bg.FExtension.network;
FExtension.actionHandler = FExtension.bg.FExtension.actionHandler;
FExtension.popup = FExtension.bg.FExtension.popup;
FExtension.updateController = FExtension.bg.FExtension.updateController;
FExtension.actionHandler = FExtension.bg.FExtension.actionHandler;
FExtension.tabStateHandler = FExtension.bg.FExtension.tabStateHandler;*/

/**
 * Default FBrowserPopupChrome ctor.
 * Creates instance of FBrowserPopupChrome class that contains ALL Chrome browser-specific implementation  
 *         of the core browser functionality required for the rest of the code.
 *
 * @param {String} siteDomain The domain name of the site.
 */
function FBrowserPopupChrome() {
	this.initFBrowserPopupChrome();
	this.isLocalStoragePreset = (FExtension.bg.FExtension.browser) ? FExtension.bg.FExtension.browser.isLocalStoragePreset : null;
}
	
//$.extend(FBrowserPopupChrome.prototype, FBrowserPopup.prototype);
function extend(destination, source) {   
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
};
extend(FBrowserPopupChrome.prototype, FBrowserPopup.prototype);

FBrowserPopupChrome.prototype.initFBrowserPopupChrome = function() {
	// Call parent class implementation first
	this.initFBrowserPopup();
}

FBrowserPopupChrome.prototype.openNewTab = function(url) {
	browser.tabs.create({url:url});
}

FBrowserPopupChrome.prototype.executeForSelectedTab = function(windowId, tabFunction) {
	//browser.tabs.getSelected(null, tabFunction);
}

FBrowserPopupChrome.prototype.addOnRequestListener = function(onRequestListener) {
//	browser.runtime.onRequest.addListener(onRequestListener);
}

FBrowserPopupChrome.prototype.getVersion = function(callback) {
	var manifest = browser.runtime.getManifest();
	var version = manifest.version;

	if (callback) {
		callback(version);
	}
	return version;
}

FBrowserPopupChrome.prototype.extensionSendRequest = function(data, callback) {
	browser.runtime.sendMessage(data,callback);
}

//FBrowserPopupChrome.prototype.tabSendRequest = function(id, data, callback) {
//	browser.tabs.sendRequest(id, data, callback);
//}

FBrowserPopupChrome.prototype.addOnMessageListener = function(onMessageListener) {
    browser.runtime.onMessage.addListener(onMessageListener);
}

FExtension.browserPopup = new FBrowserPopupChrome();

