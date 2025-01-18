
const navigationFilter = {
    url:
        [
            { hostSuffix: "youtube.com" },
            { hostContains: ".pinterest" },
            { hostSuffix: "twitter.com" },
            { hostSuffix: "reddit.com" },
            { hostSuffix: "soundcloud.com" },
            { hostSuffix: "twitch.tv" },
            { hostSuffix: "imdb.com" },
            { urlPrefix: "https://vimeo.com" },
            { hostSuffix: "tiktok.com" }
            /*
            { hostSuffix: "facebook.com" },
            
            */
        ]
}
// Pinterest WTF https://medium.com/pinterest-engineering/how-switching-our-domain-structure-unlocked-international-growth-e00c8184d5dd
const requestFilter = {
    urls:
        [
             "*://*.twimg.com/*",     // twitter
             "https://*/resource/*",  // pinterest
             "*://*.youtube.com/*",
             "*://v.redd.it/*",
             "*://*.soundcloud.com/*",
             "*://gql.twitch.tv/*",
             "*://*.imdb.com/*",
             "*://*.akamaized.net/*",  // vimeo
             "*://*.byteoversea.com/*", //tiktok
             "*://*.tiktokv.com/*",
             "*://*.tiktokcdn.com/*"    
        ]
}

/**
 * Belki hiç gerek yoktur webNavigation'a. Düğmeyi çiz komutunu requeste göre veriyoruz.
 * webNavigation sadece güncel adresi veriyor bize. 
 * Buna gerek var mı ki?
 * Content Script kendisi de location.href vs yapıp adresi bulamaz mı?
 * BULAMADI
 *  */
browser.webNavigation.onHistoryStateUpdated.addListener(newPage, navigationFilter);

browser.webNavigation.onCompleted.addListener(newPage, navigationFilter);

browser.webRequest.onCompleted.addListener(logResponse, requestFilter);

browser.runtime.onInstalled.addListener(function(details){
	if(details.reason == "install" || details.reason == "update"){
	  	browser.storage.local.set({ t: new Date().getTime() });
    }
});

function newPage(details) {
    // console.log("Tab ID: " + details.tabId + " onCompleted || onHistoryStateUpdated " + details.url);
    browser.tabs.sendMessage(details.tabId, { mesaj: "onCompleted || onHistoryStateUpdated", adres: details.url });
}

function logResponse(details) {
    // console.log(details.url);
    // console.log(details.statusCode);
    if (details.tabId != -1) {
        browser.tabs.sendMessage(details.tabId, { mesaj: "RequestCompleted", adres: details.url });
    }
}



