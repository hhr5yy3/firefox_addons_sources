if (typeof browser === 'undefined') {
	browser = chrome;
}

/**
 * Get information from background script
 * @param callback
 * @returns
 */
function getTopSites(callback){
	browser.runtime.sendMessage({"method": "getLiloTabFav","params":null,"message":"callLiloTabExt"}, callback);
}

/**
 * Inject script to the page
 */
function injectScript(code) {
	var script = document.createElement('script');
	script.textContent = code;
	(document.head||document.documentElement).appendChild(script);
}

/* Start */
getTopSites(function(topSites){
	var getLiloTabFavorites = "window.getLiloTabFav = function(callback){callback("+ JSON.stringify(topSites) +");}";
	injectScript(getLiloTabFavorites);
});