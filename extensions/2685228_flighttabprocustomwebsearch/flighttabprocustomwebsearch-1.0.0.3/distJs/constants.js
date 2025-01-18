

var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "flighttabpro.com/",
    UNINSTALL_PAGE = "https://flighttabpro.com/common/uninstall2_pii.html?appId=13800&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
