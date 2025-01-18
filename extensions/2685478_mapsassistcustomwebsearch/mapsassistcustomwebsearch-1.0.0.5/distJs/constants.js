

var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "mapsassist.com/",
    UNINSTALL_PAGE = "https://mapsassist.com/common/uninstall2_pii.html?appId=13801&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
