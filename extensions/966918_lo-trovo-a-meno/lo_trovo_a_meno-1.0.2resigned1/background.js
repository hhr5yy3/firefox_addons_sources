var STORAGE = {
    DOMAIN: 'testachats',
    KEYS: {
        SERIAL: 'serial',
        AVAILABLE_WEBSITES: 'websites'
    }
};

var MOZILLA_FIREFOX_CODE = 'firefox';
var GOOGLE_CHROME_CODE = 'chrome';
var WORKIT_WEBSITES_URL = 'http://test-achats.workit-software.com/client/sites/';
var WORKIT_PRODUCT_TRACKING_URL = 'http://test-achats.workit-software.com/client/reference/first';

var BANNER_CONFIGURATION_FOR_TESTING = {
    Url: chrome.runtime.getURL('app/iframe/test-banner/index.html'),
    Height: 46
};


function buildStorageKey(key) {
    return STORAGE.DOMAIN + '.' + key;
}

function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf("firefox") != -1;
}

//generate a unique extension serial (per computer)
function gen_extension_serial(){
    var S = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
    var serial = '{';
    for (i = 0; i < 8; i++)
        serial = serial + S[Math.round(Math.random() * 15)];

    serial = serial + '-';
    for (i = 0; i < 4; i++)
        serial = serial + S[Math.round(Math.random() * 15)];

    serial = serial + '-';
    for (i = 0; i < 4; i++)
        serial = serial + S[Math.round(Math.random() * 15)];

    serial = serial + '-';
    for (i = 0; i < 4; i++)
        serial = serial + S[Math.round(Math.random() * 15)];

    serial = serial + '-';
    for (i = 0; i < 12; i++)
        serial = serial + S[Math.round(Math.random() * 15)];
    serial = serial + '}';

    return serial;
}

//get extension serial key
var extensionSerial = null;
(function generateSerial() {
    var storageKey = buildStorageKey(STORAGE.KEYS.SERIAL);
    if(storageKey) {
        chrome.storage.local.get(storageKey, function(storage) {
            if(storage[storageKey]!=null) {
                extensionSerial = storage[storageKey];
            }else{
                extensionSerial = gen_extension_serial();
                var valueToStore = new Object();
                valueToStore[storageKey] = extensionSerial;
                chrome.storage.local.set(valueToStore, function() {});
            }
            onExtensionSerialReady();
        });
    }
})();

var browserCode = isFirefox() ? MOZILLA_FIREFOX_CODE : GOOGLE_CHROME_CODE;

function buildClientExtensionUniqueIdentifier() {
    return browserCode + '-' + extensionSerial;
}


function fetch(url, onSuccess) {
    var xhrObject = new XMLHttpRequest();
    xhrObject.open("GET",url,true);
    xhrObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhrObject.onreadystatechange = function(){
        if(xhrObject.readyState == 4 && xhrObject.status == 200){
            onSuccess(xhrObject.responseText);
        }
    };
    xhrObject.send(null);
}

function fetchJSON(url, onSuccess, onFail) {

    fetch(url, function(responseText) {
        try {
            var data = JSON.parse(responseText);
            onSuccess(data);
        } catch(e) {
            onFail(e);
        }

    });

}

var availableWebsites = [];
function getAvailableWebsitesList() {

    var storageKey = buildStorageKey(STORAGE.KEYS.AVAILABLE_WEBSITES);
    if(storageKey) {
        chrome.storage.local.get(storageKey, function(storage) {

            if(storage[storageKey]!=null) {
                availableWebsites = storage[storageKey];
            }

            fetchJSON(WORKIT_WEBSITES_URL + '?uuid=' + buildClientExtensionUniqueIdentifier(), function(data) {

                availableWebsites = data;
                var valueToStore = new Object();
                valueToStore[storageKey] = data;
                chrome.storage.local.set(valueToStore, function() {});

            }, function(e) {
                //alert(e);
            });


        });
    }
}

var bannerConfiguration;
function getBannerConfiguration() {

    if(LOCAL_MODE) {
        bannerConfiguration = BANNER_CONFIGURATION_FOR_TESTING;
    } else {

        var url = BANNER_CONFIGURATION_URL + '?uuid=' + buildClientExtensionUniqueIdentifier();

        console.log("getBannerConfiguration url", url);

        fetchJSON(url, function(data) {

            bannerConfiguration = data;
            console.log("Test achats bannerConfiguration", bannerConfiguration);

        }, function(e) {
            console.log("Test achats banner configuration not found", e);
        });
    }

}


function getSiteFromUrl(currentURL, availableWebsites) {
    var siteFound = null;
    try{

        availableWebsites.forEach(function(site) {

            try {
                var subUrls = site.siteSubUrl;
                subUrls.forEach(function(subUrl) {
                    if(subUrl) {
                        subUrl = subUrl.trim();
                        if(
                            subUrl.length>2
                            && currentURL.indexOf(subUrl)!=-1
                        ) {

                            var replaceSite = true;
                            //keep the site having the more restrictive sub-url (based on length)
                            if( siteFound && siteFound.subUrlUsed ) {

                                if( subUrl.length == siteFound.subUrlUsed.length ) {
                                    replaceSite = (site.country.toUpperCase() == AFFILIATED_COUNTRY.toUpperCase());
                                } else if( subUrl.length < siteFound.subUrlUsed.length) {
                                    replaceSite = false;
                                }

                            }

                            if(replaceSite) {
                                siteFound = site;
                                siteFound.subUrlUsed = subUrl;
                            }

                        }
                    }
                });
            } catch(e) {}

        });


    } catch(e) {
        console.log("getSiteFromUrl", e);
    }
    return siteFound;
}


function onEpageRequest(request, sender, callback){
    try{
        if (request.action == 'checkWebsiteUrl') {

            var urlImageRegex = new RegExp("(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?");

            var urlImageFound = !!sender.tab.url.match(urlImageRegex);

            if(!urlImageFound) {

                var oSite = getSiteFromUrl(sender.tab.url, availableWebsites);

                if(oSite != null) {
                    oSite.tabid = sender.tab.id;
                    callback(oSite);
                } else {
                    callback({
                        fail: true
                    });
                }
            } else {
                console.log("checkWebsiteUrl can't be done on an image");
            }

        } else if (request.action == 'trackProductUrl') {

            var data = {};

            function buildTrackingUrl(site, url) {
                return WORKIT_PRODUCT_TRACKING_URL + '?uuid=' + buildClientExtensionUniqueIdentifier() + '&siteId=' + site.siteId + '&url=' + encodeURIComponent(decodeURIComponent(url));
            }

            var trackingUrl = buildTrackingUrl(request.site, sender.tab.url);

            console.log('workit tracking url', trackingUrl);

            fetchJSON(trackingUrl, function(data) {

                if(data) {

                    var bannerConfigurationUrl = LOCAL_MODE ? 'local' : BANNER_CONFIGURATION_URL;

                    var result = {
                        product: data,
                        uuid: buildClientExtensionUniqueIdentifier(),
                        bannerConfiguration: bannerConfiguration,
                        site: request.site,
                        bannerConfigurationUrl: bannerConfigurationUrl
                    };

                    callback(result);
                }

            }, function(e) {
                callback({
                    fail: true,
                    trackingUrl: trackingUrl,
                    site: request.site
                });
            });



        }
    }catch(e){
        console.log("onEpageRequest", e);
    }
}

function forwardRequest(request, sender, callback) {
    try{
        request.tabid = sender.tab.id; //id of target tab is added
        browser.tabs.sendMessage(sender.tab.id, request)
            .then(callback);
    } catch(e) {
        //alert("forwardRequest:"+e);
    }
}

function onRequest(request, sender, callback) {
    try{
        if(request.to) { //message to forward directly to another script
            forwardRequest(request, sender, callback)
        } else { //the message is for me
            onEpageRequest(request, sender, callback);
        }
    } catch(e) {
        console.log("onRequest", e);
    }
    return true; // needed by web extension API => Doc: This function becomes invalid when the event listener returns, unless you return true from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until sendResponse is called).
}


/*
(function displayServiceOff() {
	if(chrome.browserAction) {
		chrome.browserAction.setBadgeBackgroundColor({color:[189, 11, 11, 255]});
		chrome.browserAction.setBadgeText({text:"off"});
		chrome.browserAction.setTitle({title: "Server not accessible. check your internet connection or firewall settings then click to try again "});
		chrome.browserAction.onClicked.addListener(retrieveRemoteScript);
	}
})();
*/


function onExtensionSerialReady() {
    getAvailableWebsitesList();
    getBannerConfiguration();
}


// Listen for the content script to send a message to the background page.
chrome.runtime.onMessage.addListener(onRequest);