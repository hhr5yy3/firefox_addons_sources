window.contentScriptsPaths = {
    "tourvisor": ["data/operators/tourvisor/tourvisor-ta.js", "data/operators/tourvisor/tourvisor.js", "data/operators/tourvisor/anti-hide-tools/original.js","data/operators/util.js", "data/operators/agency-website.js", "data/operators/entry-point.js"],
    "sletat_5":  ["data/operators/sletat/sletat-module-5.js", "data/operators/util.js", "data/operators/agency-website.js", "data/operators/entry-point.js"],
    "sletat_6":  ["data/operators/sletat/sletat-module-6.js", "data/operators/util.js", "data/operators/agency-website.js", "data/operators/entry-point.js"],
    "uon": ["data/operators/util.js", "data/operators/uon/uon.js"]
};
console.log("load find module");
var curentBrowser = getBrowser();
var browserApiLiteral = typeof safari === "undefined" ? "web-extensions" : "safari";

var browserSpecificMethods = {
    "web-extensions": {
        "getBrowserRuntime": () => curentBrowser.runtime,
        "sendMessageToAddon": (type, payload) => curentBrowser.runtime.sendMessage({
            "type": type,
            "data": payload
        }, rs=>null),
        "startMessageListener": () => curentBrowser.runtime.onMessage.addListener((request, sender, sendResponse) => {onAddonMessage(request); sendResponse(undefined);})
    },
    "safari": {
        "getBrowserRuntime": () => {
            const safariRuntime = curentBrowser.extension;
            safariRuntime.getURL = (url) => safariRuntime.baseURI + url;
            return safariRuntime;
        },
        "sendMessageToAddon": (type, payload) => {
            const data =  typeof payload !== "object" || Array.isArray(payload) ? {"data": payload} : payload;
            curentBrowser.extension.dispatchMessage(type, data)},
        "startMessageListener": () => curentBrowser.self.addEventListener("message", request => onAddonMessage(request), false)
    }
};

function getBrowser() {
    if ( typeof browser !== "undefined" ) {
        return browser;
    }
    if ( typeof chrome !== "undefined" ) {
        return chrome;
    }
    if ( typeof safari !== "undefined" ) {
        return safari;
    }
}

var getBrowserRuntime = browserSpecificMethods[browserApiLiteral].getBrowserRuntime;
var sendMessageToAddon = browserSpecificMethods[browserApiLiteral].sendMessageToAddon;

function findModule() {
    function* generateNodeSearchResult() {
        yield document.querySelector(".tv-search-form") && !window.location.href.match(/tourvisor\.ru/) ? "tourvisor" : null;
        yield document.querySelector("#module5-iframe, #module-5-0") ? "sletat_5" : null;
        yield document.querySelector(".SLT-module6") ? "sletat_6" : null;
        yield document.querySelector(".qq-client-copy, .quick-reservation") ? "uon" : null;
    }

    const searchResult = generateNodeSearchResult();
    for ( let result of searchResult ) {
        if ( result ) {
            sendMessageToAddon("inject found module", {js: contentScriptsPaths[result]});
            return;
        }
    }
}

if ( window === window.top ) {
    findModule()
}
