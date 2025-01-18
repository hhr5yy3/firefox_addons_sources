

var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "ezyphototab.com/",
    UNINSTALL_PAGE = "https://ezyphototab.com/common/uninstall2_pii.html?appId=13818&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
