
var bDisableCookies = true;
var bAllowThirdPartyCookies = false;
var bAllowThirdPartyCookiesFromVisitedOnly = false;

// options are :
//	reject_all
//	reject_third_party
//  allow_visited
//  allow_all

function updateIcon(){
	browser.browserAction.setIcon({
		path: bDisableCookies ? {
		  16: "icons/off-16.png",
		  32: "icons/off-32.png"
		} : {
		  16: "icons/on-16.png",
		  32: "icons/on-32.png"
		}
  });
}

function updateState() {
	if(bDisableCookies){
		browser.privacy.websites.cookieConfig.set({ value: { behavior: "reject_all" } });
	} else {
		if(bAllowThirdPartyCookies == false){
			browser.privacy.websites.cookieConfig.set({ value: { behavior: "reject_third_party" } });
		} else {
			if(bAllowThirdPartyCookiesFromVisitedOnly == true) {
				browser.privacy.websites.cookieConfig.set({ value: { behavior: "allow_visited" } });
			} else {
				browser.privacy.websites.cookieConfig.set({ value: { behavior: "allow_all" } });
			}
		}
	}
  
	updateIcon(); 
}

function disableCookies() {
	bDisableCookies = true;
	updateState();
}

function allow1stPartyCookiesOnly() {
	bDisableCookies = false;
	bAllowThirdPartyCookies = false;
	updateState();
}

function allow3rdPartyCookiesFromVisitedOnly() {
	bDisableCookies = false;
	bAllowThirdPartyCookies = true;
	bAllowThirdPartyCookiesFromVisitedOnly = true;
	updateState();
}

function allowAllCookies() {
	bDisableCookies = false;
	bAllowThirdPartyCookies = true;
	bAllowThirdPartyCookiesFromVisitedOnly = false;
	updateState();
}

function clearAllCookies () {
	browser.browsingData.removeCookies({}); // needs permision: "browsingData"
}

function toggleMode() {
	browser.browserAction.setPopup({popup: "popup/choose_mode.html"});
	bDisableCookies = (bDisableCookies == true) ? false : true;
	updateState();
	browser.browserAction.openPopup();
	browser.browserAction.setPopup({popup: ""}); 
}

bDisableCookies = true;
updateState();

// TODO: it gets an error :  "TypeError: browser.privacy.websites.cookieConfig.onChange is undefined"
// I think this cuz it need some permision.(todo : which permision)
/*browser.privacy.websites.cookieConfig.onChange.addListener((details)=>{
		if (details.value == "reject_all"){
			bDisableCookies = true;
		} else{
			bDisableCookies = false;
			if(details.value == "reject_third_party"){
				bAllowThirdPartyCookies = false;
			} else {
				bAllowThirdPartyCookies = true;
				bAllowThirdPartyCookiesFromVisitedOnly = (details.value == "allow_visited");
			}
		}
		updateIcon();
	});
*/

// for the following to work u should remove "default_popup": " "popup/choose_mode.html" from the json file. (u can't run these two features at the same time)
// so instead, I declare the popup inside toggleMode(), then disable it after the popup window open.
// in more simple words, first enable browserAction.onClicked, after click detected do what u want then enable popup, open popup, then disable it again so we can detect click again.
browser.browserAction.onClicked.addListener(toggleMode);

