if (typeof browser === 'undefined') {
	browser = chrome;
}

var LiloTab = {
	topSites: null,

	getTopSites: function(){
		var result = new Array();
		var hostsInResult = new Array();
		for (let topSite of LiloTab.topSites) {
			let url = new URL(topSite.url);
			if(hostsInResult.indexOf(url.hostname) == -1){
				hostsInResult.push(url.hostname);
				result.push(topSite);
			}
		}
		return result;
	}
};

if (browser && browser.topSites) {
    browser.topSites.get(function (topSitesArray) {
        LiloTab.topSites = topSitesArray;
    });
}

/**
 * Load ukey from local storage
 **/
User.getUserKey(function(){});

/**
 * Setup message listener
 */
browser.runtime.onMessage.addListener(function(request, sender, sendResponse){
	log("Message received from "+ sender.url);

	/* Sanity check */
	if(request.message!="callLiloTabExt"){
		log("msgListener isn't concerned by this message");
		return;
	}

	/* Get function */
	var func=request.method;
	var args=request.params;
	log("Methode to call: "+ func);
	if(!window[func]){
		throw new Error("Method "+func+" not found");
	}
	if(!window[func+"_export"]){
		throw new Error(func+" is not an authorized methode for external call");
	}
	const source = new URL(sender.url);
	if(!Config.trustedSource.test(source.hostname) && !window[func+"_export"].other){
		log("Sender "+ source.hostname +" isn't trusted and can't call this function");
		return;
	}else if(Config.trustedSource.test(source.hostname) && !window[func+"_export"].trusted){
		log("Sender "+ source.hostname +" is trusted but have no access to this function");
		return;
	}

	/* Call function */
	var res=window[func].apply(this,args);

	/* Answering */
	sendResponse(res);
	log(func + " > "+ res);
});

function log(msg){
	console.log("[LiloTab] "+ msg);
}

/**
 * Aliases
 */

var getWebExtensionVersion_export = {trusted:true,other:false};
function getWebExtensionVersion(){
	return browser.runtime.getManifest().version;
}
var setUserkey_export = {trusted:true,other:false};
function setUserkey(args){
	User.setUserKey(args);
	return true;
}

var getUserkey_export = {trusted:true,other:false};
function getUserkey(){
	return User.userkey;
}

var getLiloTabFav_export = {trusted:true,other:false};
function getLiloTabFav(){
	return LiloTab.getTopSites();
}

var disableWelcomeFlow_export = {trusted:true,other:false};
function disableWelcomeFlow(){
	Config.welcomeFlowEnable = false;
	return true;
}
