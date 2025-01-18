
dm.load();	


/*
24.3.2016: firefox doesn't support onInstalled(), bypass by local storage
*/
(function() {	
	
	var manifest = chrome.runtime.getManifest();

	dm.install(	 function(id) {		
		
		chrome.storage.local.get("urlInstalled", function(item) {

			if (item && item.urlInstalled) {
				var reason = "update";
				var version = manifest.version.replace(/\./g,'-');				
				var url =  urls.server + chrome.i18n.getMessage("page_thankYou") + '/v:' + version + '/extId:' + id + "/reason:" + reason;

				var updateKey = "urlUpdated_"+version;
				chrome.storage.local.get( updateKey, function(item) {
					if (!item || !item.updateKey) {
						$.get( url );
						chrome.storage.local.set({updateKey: url});
					} 
				});			

			} else {				
				var reason = "install";
				var url = urls.server + chrome.i18n.getMessage("page_thankYou") + '/v:' + manifest.version.replace(/\./g,'-') + '/extId:' + id + "/reason:" + reason;				
				chrome.storage.local.set({"urlInstalled": url});
				chrome.tabs.create( { url: url } );
			}

		});
		
	});	

})();


chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
	debug.info("background.js / onMessage listener");	
	debug.log(message);
	
	if (message.action) {

		debug.log("action = " + message.action);

		if (message.action === "closeBox") {

			var result = dm.closeBox(message.shop);			
			sendResponse(result);

		} else if (message.action === "goShopping") {		
			
			dm.goShopping(message, function(response) {				
				sendResponse(response);
			});

		}

	} else {
		debug.warn("no action");
	}

});

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		debug.info("onUpdated listener: " + tabId);
		dm.tabUpdated(tab);		
	}
});

chrome.tabs.onRemoved.addListener( function(tabId, removeInfo) {
	dm.removeTab(tabId);
});

chrome.tabs.onReplaced.addListener(function (addedTabId, removeTabId) {
	chrome.tabs.get(addedTabId, function(tab) {
		debug.info("onReplaced listener: " + tab.id);
		dm.tabUpdated(tab);
	});
});