/**
 * Default FBrowserChrome ctor.
 * Creates instance of FBrowserChrome class that contains ALL Chrome browser-specific implementation  
 *         of the core browser functionality required for the rest of the code.
 *
 * @param {String} siteDomain The domain name of the site.
 */
function FBrowserChrome() {
	this.initFBrowserChrome();
}
	
FBrowserChrome.prototype = FExtension.extend(FBrowser.prototype, FBrowserChrome);

FBrowserChrome.prototype.inlinerPort = null;

FBrowserChrome.prototype.getBrowserName = function(){
    return 'firefox';
}

FBrowserChrome.prototype.isLocalStoragePreset = function() {
	return true;
}

FBrowserChrome.prototype.inlinerPortListener = function(port, callback) {
	this.inlinerPort = port;
	console.assert(port.name == "iminliner");
	port.onMessage.addListener(callback);
}

FBrowserChrome.prototype.sendMessageTabs = function(obj, callback) {
    browser.runtime.sendMessage(obj, callback);
}

FBrowserChrome.prototype.inlinerPostMessage = function(data) {
	this.inlinerPort.postMessage(data);
}

FBrowserChrome.prototype.openNewTab = function(url) {
	browser.tabs.create({"url": url});
}

FBrowserChrome.prototype.addOnRequestListener = function(onRequestListener) {
//	browser.runtime.onRequest.addListener(onRequestListener);
}

FBrowserChrome.prototype.getVersion = function(callback) {
	var manifest = browser.runtime.getManifest();
	var version = manifest.version;
	if (callback) {
		callback(version);
	}
	return version;
}

FBrowserChrome.prototype.createContextMenus = function(title, callback, selection) {
	var obj = {};
	obj.title = title;
	obj.onclick = callback;
	if(selection){
		obj.contexts = ["selection"];
	}
	return browser.contextMenus.create(obj);
}

FBrowserChrome.prototype.removeContextMenus = function(menu) {
	try{ if(menu) browser.contextMenus.remove(menu);} catch(ex){}
}

FBrowserChrome.prototype.updateContextMenus = function(menu, title) {
	browser.contextMenus.update(menu, {"title": title});
}

FBrowserChrome.prototype.addOnMessageListener = function(onMessageListener) {
	browser.runtime.onMessage.addListener(onMessageListener);
}

FBrowserChrome.prototype.executeForSelectedTab = function(windowId, tabFunction) {
//	browser.tabs.getSelected(null, tabFunction);
}

FBrowserChrome.prototype.portOnConnectListener = function(onConnectListener) {
	browser.runtime.onConnect.addListener(onConnectListener);
}

FBrowserChrome.prototype.executeScript = function(info, tab, callback) {
	browser.tabs.executeScript(tab.id,{code:callback, allFrames:true});
}

FBrowserChrome.prototype.tabsSendMessage = function(tabID, msg) {
	browser.tabs.sendMessage(tabID, msg);
}

FBrowserChrome.prototype.getPopUpURL = function(filePath, opt) {
	if(opt){
		return browser.runtime.getURL("content/html/options/" + filePath);
	}else{
		return browser.runtime.getURL("content/html/popup/" + filePath);
	}
}

FBrowserChrome.prototype.openPopUpByURL = function(file, s) {
	if(s!="undefined"){
//		s=s.replace(/%/g,"");
		var location = FExtension.browser.getPopUpURL(file, false) + "?text="+encodeURIComponent(s);
	} else
		var location = FExtension.browser.getPopUpURL(file, false);

	var winWidth = 480 ;
	var winHeight = 645 ;
	var posLeft = ( screen.width - winWidth ) / 2 ;
	var posTop = ( screen.height - winHeight ) / 2 ;
	var win = null;
	try{
	    win =  window.open( location,'ImTranslator','width=' + winWidth + ',height=' + winHeight +',top=' + posTop + ',left=' +
			posLeft +  ',resizable=yes,scrollbars=yes,toolbar=no,titlebar=no,' + 'location=no,directories=no,status=no,menubar=no,copyhistory=no');
	}catch(e){
		//alert(e);
		console.log(e);
	}
	return win;
}

FBrowserChrome.prototype.getCurrentUrl = function(tab){
	try{
		return tab.url;
	}catch(e){
		return '';
	}
}

FBrowserChrome.prototype.getSelectionText = function() {
	var selection = "";
	return selection;
}

FBrowserChrome.prototype.initFBrowserChrome = function() {
	// Call parent class implementation first
	this.initFBrowser();
}

FBrowserChrome.prototype.refreshSettings = function() {
    ImTranslator_inliner.refreshInlineSettings()
}

FExtension.browser = new FBrowserChrome();

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(info) {
		var G_headers = info.requestHeaders;
		var if_t_g = false;
		var G_referer = '';
		var new_header = null;
		var new_G_headers = [];
		if (/^https?\:\/\/translate\.google/.test(info.url)) {
			if_t_g = true;
			G_referer = "https://translate.google.com/";
		}
		while (new_header = G_headers.shift()) {
			if (if_t_g && /^X\-/.test(new_header.name)) {
			}else if (if_t_g && /DNT/.test(new_header.name)) {
			}else if (new_header.name === 'x-referer') G_referer = new_header.value;
			else new_G_headers.push(new_header);
		}
		G_headers = new_G_headers;
		if (G_referer) {
			var is_it_true = false;
			for (var i = 0; i < G_headers.length; i++) {
				if (G_headers[i].name.toLowerCase() == 'referer') { 
					G_headers[i].value = G_referer;
					is_it_true = true;
					break;
				}
			}
			if (! is_it_true) G_headers.push({ 'name' : 'Referer', 'value' : G_referer });
		}
	
		return { requestHeaders: G_headers };
	},
	{urls: ["*://*/*", "*://*.*.*/*"]},
	["blocking", "requestHeaders"]

);
