'use strict';

//hash a string
function hash(str) {
    let hash = 0, i, chr;
    if (!str) {return hash;}
    if (str.length === 0) {return hash;}
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

//checks every element of strArray if is included inside str
//returns true if exists at least one element, else returns false
function arrayMatchString(str, strArray) { 
    for (let j=0; j < strArray.length; j++) {
        if (str.indexOf(strArray[j]) >= 0) {
            return true;
        }
    }
    return false;
}


//URLs that are always permitted and not filtered
const permittedUrlParts = ["chrome://"
                        ,"chrome-extension://"
                        ,"about:"
                        ,"moz-extension://"
                        ,"edge://"
                        ,"://sp.cwfservice.net"
                        ,"://www.extendbrowser.com"
                        ,"://extendbrowser.com"
                        ,"://googleads."
];
                        // ,"://www.google."
                        // ,"://google."


//on extension's icon click, open configuration page
chrome.action.onClicked.addListener(function(activeTab) {
    chrome.tabs.create(
        {url:chrome.runtime.getURL("configure.html")}
    );
});


//insert histObj ({"datetime": Date.now(), "url": detailsObj.url, "category_name": detailsObj.category_name, "blocked": detailsObj.blocked}) to 1st element o histArray and saves histArray to local storage
//input histObj: histArray and history record to be inserted to histArray
//output: true if localstorage is update otherwise false
function updateHist(histObj,detailsObj) {
    if (detailsObj.frameId !== 0) {
        return false;
    }
    
    if (globalHistoryArray.length > 0 && globalHistoryArray[0].url === histObj.url) {
        return false;
    }
    
    globalHistoryArray.unshift(histObj);
    if (globalHistoryArray.length > 200) {globalHistoryArray.length = 200;}
    chrome.storage.local.set({"hist": globalHistoryArray}, function() {
        return true;
    });
}

// Initialize global Vars
var globalForbidAll = false;
var globalStatus = "on";
var globalStcinfo = Date.now();
var globalHistoryArray = [];
var globalFilters = [];
var globalBlacklist = [];
var globalWhitelist = [];

function initVars(details) {
    chrome.storage.local.get(["hist","whitelist","blacklist","filters","forbidAll", "status", "stcinfo"], function(result) {
    
        if (typeof result.hist !== 'undefined') {
            globalHistoryArray = [...result.hist];
            globalBlacklist = [...result.blacklist];
            globalWhitelist = [...result.whitelist];
            globalFilters = [...result.filters];
            globalForbidAll = result.forbidAll;
            globalStatus = result.status;
            globalStcinfo = result.stcinfo;
        }
        
        return true;
    });
}

initVars();
    

// input details object of new opening tab (e.g. details.url = www.google.com),
// outputs false if site doesn't need to be filtered else true
function initFilter(details) {
    //console.log('initFilter');


    if (globalStatus=="off") {
        return false;
    }
    
    if ( arrayMatchString(details.url, permittedUrlParts) ) {
        return false;    
    } 
    
    const url = new URL(details.url);
        
    if (url.host == ''
        || url.host == 'undefined'
        || details.frameId !== 0) { // if commented then filters searches all frames of page
            return false;
    }

    filterDomain(details);
    return true;

}

// filterDomain: filter website category and if must be filtered redirect tab to message page
// input tab details object (e.g. details.url = www.google.com) to check,
// outputs true if site redirected and false if open
function filterDomain(details) {
    const url = new URL(details.url);
    const ipPartsArray = url.host.split('.');

    //days since installation or update of extension
    var urlParamDaysPassed = 0;
    if (typeof globalStcinfo !== 'undefined') {
        urlParamDaysPassed = Math.floor((Date.now() - globalStcinfo)/(1000*60*60*24));
    }

    let redirectUrl;

    if (arrayMatchString(url.host, globalBlacklist.filter(Boolean))) {
        redirectUrl = "https://www.extendbrowser.com/safeweb.php?url="+url.host+"&cats=Blacklisted site&iudp="+urlParamDaysPassed;
        chrome.tabs.update(details.tabId, {url: redirectUrl})
        .then( tabObj => updateHist({"datetime": Date.now(), "url": details.url, "category_name": "Blacklisted", "blocked": true},details));
        return true;
    } else if ( arrayMatchString(url.host,["google.","bing.com","yandex.com","duckduckgo.com","msn.com"])
                && [13,16].some(item => globalFilters.includes(item)) ) {
        safeSearch(details);
        return false; 
    } else if (url.host=="localhost"
        || ipPartsArray[0]=="10"
        || (ipPartsArray[0]=="172" && /^\d+$/.test(ipPartsArray[1]) && parseInt(ipPartsArray[1],10)>15 && parseInt(ipPartsArray[1],10)<32)
        || ipPartsArray[0]+"."+ipPartsArray[1] == "192.168") {
            updateHist({"datetime": Date.now(), "url": details.url, "category_name": "Private IP address", "blocked": false},details);
            return false;
    } else if ( arrayMatchString(details.url, globalWhitelist) ) {
        updateHist({"datetime": Date.now(), "url": details.url, "category_name": "Whitelisted website", "blocked": false},details);
        return false;    
    } else if (globalForbidAll) {
        redirectUrl = "https://www.extendbrowser.com/safeweb.php?url="+url.host+"&cats=Forbidden site&iudp="+urlParamDaysPassed;
        chrome.tabs.update(details.tabId, {url: redirectUrl})
        .then( tabObj => updateHist({"datetime": Date.now(), "url": details.url, "category_name": "Forbidden", "blocked": true},details));
        return true;
    } else {
        // get category from websafe
        const csString = "https://www.extendbrowser.com/kidssafeweb/scripts/checkSiteff.php?hostname=" + url.host;
        fetch(csString)
        .then(response => response.json())
        .then(data => {
            //console.log('safeweb data: ' + JSON.stringify(data));
            //filter domain
            
            var resultCategoryArray = [];
            var resultCategoryName = "";
            
            // 99 means no db record or too old record
            if (data.category[0] == 99) {
                resultCategoryArray[0] = 0;
                resultCategoryName = "Uncategorized";
            } else {
                resultCategoryArray = data['category'];
                resultCategoryName = data['category_name'].join(', ');
            }
            
            if ( resultCategoryArray.some(item => item == 48) && [13,16].some(item => globalFilters.includes(item)) ) {
                //updateHist({"datetime": Date.now(), "url": details.url, "category_name": "Search engine (forced to safe mode)", "blocked": false},details);
                safeSearch(details);
                return false;
            }
            var resultCategoryNameStr = resultCategoryName.replace(/,\s*$/, "");

            var checkSite = resultCategoryArray.some(item => globalFilters.includes(item));
            if (checkSite) {
                redirectUrl = "https://www.extendbrowser.com/safeweb.php?url=" + url.host + "&cats=" + resultCategoryNameStr.replace("&","%26") + "&iudp="+urlParamDaysPassed;
                chrome.tabs.update(details.tabId, {url: redirectUrl})
                .then( tabObj => updateHist({"datetime": Date.now(), "url": details.url, "category_name": resultCategoryNameStr, "blocked": true},details));
                
                return true;
            } else {
                updateHist({"datetime": Date.now(), "url": details.url, "category_name": resultCategoryNameStr, "blocked": false},details);
                return false;
            }
        });
    }

    return false;
}

//redirect search engines safe search abillity
function safeSearch(detailsObj) {
    const url = detailsObj.url;
    let urlPart0, urlPart1, domainName;
    if (url.indexOf("?") > 0) {
        const splittedUrl = url.split("?");
        urlPart0 = splittedUrl[0];
        urlPart1 = "&"+splittedUrl[1];
    } else {
        urlPart0 = url;
        urlPart1 = "";
    }
    domainName = urlPart0.replace("https://","").replace("http://","").split("/")[0];
    if (domainName.indexOf("www.") == 0) {domainName = domainName.substring(4);}

    let safeSearchLink;
        
    if ( domainName.indexOf("google.") == 0 && urlPart0.indexOf("/search") > 0 && urlPart0.indexOf("maps/search") < 0 && urlPart1.indexOf("safe=strict") < 0 ) { //google
        safeSearchLink = urlPart0+"?safe=strict"+urlPart1.replace("safe=off","").replace("safe=moderate","");
        chrome.tabs.update(detailsObj.tabId, {url: safeSearchLink})
        .then( tabObj => updateHist({"datetime": Date.now(), "url": detailsObj.url, "category_name": "Search engine (enforced to safe mode)", "blocked": false},detailsObj));
    } else if ( domainName.indexOf("bing.com") == 0 && urlPart0.indexOf("/search") > 0 && urlPart1.indexOf("adlt=strict") < 0 ) { //bing
        safeSearchLink = urlPart0+"?adlt=strict&safe=strict"+urlPart1.replace("adlt=off","").replace("adlt=moderate","").replace("safe=off","").replace("safe=moderate","");
        chrome.tabs.update(detailsObj.tabId, {url: safeSearchLink})
        .then( tabObj => updateHist({"datetime": Date.now(), "url": detailsObj.url, "category_name": "Search engine (enforced to safe mode)", "blocked": false},detailsObj));
/*    } else if ( domainName.indexOf("yahoo.") >= 0 && urlPart1.indexOf("vm=strict") < 0 ) { //yahoo
        safeSearchLink = urlPart0+"?vm=strict"+urlPart1.replace("vm=off","").replace("vm=moderate","");
        //console.log("safeSearchLink="+safeSearchLink+"---\n du="+url);
        chrome.tabs.update(detailsObj.tabId, {url: safeSearchLink})
        .then( tabObj => updateHist({"datetime": Date.now(), "url": detailsObj.url, "category_name": "Search engine (enforced to safe mode)", "blocked": true},detailsObj));*/
    } else if ( domainName == "duckduckgo.com" && url.indexOf("kp=1") < 0 ) { //duckduckgo
        safeSearchLink = urlPart0+"?kp=1"+urlPart1.replace("kp=-1","").replace("kp=-2","");
        chrome.tabs.update(detailsObj.tabId, {url: safeSearchLink})
        .then( tabObj => updateHist({"datetime": Date.now(), "url": detailsObj.url, "category_name": "Search engine (enforced to safe mode)", "blocked": false},detailsObj));
    } else if ( domainName.indexOf("yandex.") == 0 && url.indexOf("family=yes") < 0 ) { //yandex
        safeSearchLink = urlPart0+"?family=yes&safe=strict"+urlPart1.replace("family=no","").replace("strict=off","").replace("strict=moderate","");
        chrome.tabs.update(detailsObj.tabId, {url: safeSearchLink})
        .then( tabObj => updateHist({"datetime": Date.now(), "url": detailsObj.url, "category_name": "Search engine (enforced to safe mode)", "blocked": false},detailsObj));
    } else if (!arrayMatchString(urlPart0,["google.","bing.com","yandex.com","duckduckgo.com","msn.com"])) {
        chrome.tabs.update(detailsObj.tabId, {url: "https://www.google.com/?safe=strict"})
        .then( tabObj => updateHist({"datetime": Date.now(), "url": detailsObj.url, "category_name": "Search engine (enforced to safe mode)", "blocked": false},detailsObj));
    }
}

//input: "stealthOn","stealthOffStatusOn","stealthOffStatusOff"
function setExtIcon(extMode) {
    if (extMode == "stealthOn") {
        chrome.action.setIcon({path: 'puzzle48.png'},function() {
            chrome.action.setBadgeBackgroundColor({color: '#fbfbfb'});
            chrome.action.setBadgeText({text: ''});
            chrome.action.setTitle({title: 'Clear browsing data'});
            chrome.action.setPopup({popup: 'popup.html'});
        });
    } else if (extMode == "stealthOffStatusOn") {
        chrome.action.setIcon({path: 'safeWeb48.png'},function() {
            chrome.action.setBadgeBackgroundColor({color: '#34a853'});
            chrome.action.setBadgeText({text: 'On'});
            chrome.action.setTitle({title: 'Safe Web'});
            chrome.action.setPopup({popup: 'popup.html'});
        });
    } else if (extMode == "stealthOffStatusOff") {
        chrome.action.setIcon({path: 'safeWeb48.png'},function() {
            chrome.action.setBadgeBackgroundColor({color: '#d10000'});
            chrome.action.setBadgeText({text: 'Off'});
            chrome.action.setTitle({title: 'Safe Web'});
            chrome.action.setPopup({popup: 'popup.html'});
        });
    } else {
        return false;
    }
}


//init variables
const filter = {urls: ["<all_urls>"]};

//initialization of extension's icon concerning it's status and stealth mode
function initIcon() {
    chrome.storage.local.get(['status','stealthMode'], function(result) {
        if (result.stealthMode == "off") {
            if (result.status == "on") {
                setExtIcon("stealthOffStatusOn");
            } else if (result.status == "off") {
                setExtIcon("stealthOffStatusOff");
            }
        } else {
            setExtIcon("stealthOn");
        }
        return true;
    });
    return false;
}

initIcon();

//cache landing page for forbidden sites >>>>
fetch("https://www.google.com/search?safe=strict",{mode: "no-cors"});
fetch("https://www.extendbrowser.com/kidssafeweb/scripts/message.php",{mode: "no-cors"});
fetch("https://www.extendbrowser.com/safeweb.php",{mode: "no-cors"});

//get message from configure.js
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
    if (request.extMode !== undefined) {
        setExtIcon(request.extMode);
    }
    
    if (request.configChanged) {
        initVars();
    }
});

//LISTENERS
chrome.webNavigation.onBeforeNavigate.addListener(initFilter);
chrome.webNavigation.onHistoryStateUpdated.addListener(initFilter);

chrome.runtime.onInstalled.addListener(function(details){
    let thisVersion = chrome.runtime.getManifest().version;

    if(details.reason == "install"){
        //console.log("Install " + thisVersion + " version!");

        //on install set default values (disabled checkboxes and porn)
        chrome.storage.local.set({"status": "on", "stcinfo": Date.now(), "stealthMode": "off", "password": null, "blacklist": [], "whitelist": [], "hist": [{"datetime": Date.now(), "url": "Safe Web Installed", "category_name": "", "blocked": false}], "filters": [65,19,31,12,3,4,66,9,0,13,15,16,11], "forbidAll": false}, function() {
            initVars();
            initIcon();
        });

    } else if (details.reason == "update" && details.previousVersion.startsWith("1.") ) {
        //on update from version 1 to version 2, set default values plus blocked categories from version 1
        //console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");

        chrome.storage.local.get(["stcinfo", "filters",  "status","stealthMode","password","blacklist", "whitelist","forbidAll"], function(result) {

            //console.log("update from 1. old filters="+JSON.stringify(result.filters));

            var newFilters = [65,19,31,12,3,4,66,9];
            if (result.filters.includes('90') || result.filters.includes(90)) {newFilters.push(0);}
            if ((result.filters.includes('25') || result.filters.includes(25)) && !newFilters.includes(6)) {newFilters.push(6);}
            if ((result.filters.includes('121') || result.filters.includes(121)) && !newFilters.includes(6)) {newFilters.push(6);}
            if (result.filters.includes('7') || result.filters.includes(7)) {newFilters.push(7);}
            if (result.filters.includes('9') || result.filters.includes(9)) {newFilters.push(8);}
            if (result.filters.includes('14') || result.filters.includes(14)) {newFilters.push(10);}
            if (result.filters.includes('86') || result.filters.includes(86)) {newFilters.push(11);}
            if ((result.filters.includes('1') || result.filters.includes(1)) && !newFilters.includes(13)) {newFilters.push(13);}
            if ((result.filters.includes('50') || result.filters.includes(50)) && !newFilters.includes(13)) {newFilters.push(13);}
            if ((result.filters.includes('6') || result.filters.includes(6)) && !newFilters.includes(13)) {newFilters.push(13);}
            if (result.filters.includes('23') || result.filters.includes(23)) {newFilters.push(14);}
            if (result.filters.includes('47') || result.filters.includes(47)) {newFilters.push(15);}
            if (result.filters.includes('3') || result.filters.includes(3)) {newFilters.push(16);}
            if (result.filters.includes('22') || result.filters.includes(22)) {newFilters.push(17); newFilters.push(47);}
            if (result.filters.includes('11') || result.filters.includes(11)) {newFilters.push(18);}
            if (result.filters.includes('51') || result.filters.includes(51)) {newFilters.push(26);}
            if (result.filters.includes('33') || result.filters.includes(33)) {newFilters.push(28);}
            if (result.filters.includes('55') || result.filters.includes(55)) {newFilters.push(29);}
            if (result.filters.includes('15') || result.filters.includes(15)) {newFilters.push(42);}

            //console.log("update from 1. new filters="+JSON.stringify(newFilters));

            let stcinfoYear = result.stcinfo.substring(6, 10);
            let stcinfoMonth = result.stcinfo.substring(3, 5);
            let stcinfoday = result.stcinfo.substring(0, 2);
            let stcinfoHour = result.stcinfo.substring(13, 15);
            let stcinfoMinute = result.stcinfo.substring(16, 18);
            let stcinfoJSformat = stcinfoMonth+' '+stcinfoday+' '+stcinfoYear+' '+stcinfoHour+':'+stcinfoMinute+':00 GMT';
            let newStcinfo = Date.parse(stcinfoJSformat);
        
            chrome.storage.local.set({"stcinfo": newStcinfo,"filters": newFilters, "hist": [{"datetime": Date.now(), "url": "Safe Web Updated", "category_name": "", "blocked": false}], "status": result.status, "stealthMode": result.stealthMode, "password": result.password, "blacklist": result.blacklist, "whitelist": result.whitelist, "forbidAll": result.forbidAll}, function() {
                initVars();
            });

            //initIcon();
        });
    }
});

/*
function checkHist() {
    chrome.storage.local.get(["hist"], function(result) {
        for (var j=0; j<result.hist.length; j++) {
            console.log(j+' - '+JSON.stringify(result.hist[j]));
        }
    });
}
*/
