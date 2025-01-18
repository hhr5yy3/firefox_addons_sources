if (typeof browser === 'undefined') {
	browser = chrome;
}

/**
 * Register uninstall page
 */
if(browser.runtime && browser.runtime.setUninstallURL){
	browser.runtime.setUninstallURL(Config.uninstallURL);
}
	
/**
 *  Register update listener
 */
browser.runtime.onInstalled.addListener(function(details){
	if(details.reason === "install"){
		/* Start install flow only if we are outside a previous install flow 
		 * If we receive imediatly a userkey, we are in an install flow*/
		setTimeout(function(){
			if(Config.welcomeFlowEnable){
				browser.tabs.create({"url": Config.welcomeURL});
			}
		},Config.welcomeDelay)
	}
});
