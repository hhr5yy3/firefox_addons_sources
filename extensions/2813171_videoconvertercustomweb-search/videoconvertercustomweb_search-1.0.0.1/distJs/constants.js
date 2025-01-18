var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator: "stateCommunicator",
    loadOptInState: "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};


var DOMAIN = "videoconverterworld.com/",
    UNINSTALL_PAGE = "https://videoconverterworld.com/common/uninstall2_pii.html?appId=15103&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");


