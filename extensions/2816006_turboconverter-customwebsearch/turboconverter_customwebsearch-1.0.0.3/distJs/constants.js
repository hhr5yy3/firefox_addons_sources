var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator: "stateCommunicator",
    loadOptInState: "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "turboconverter.co/",
    UNINSTALL_PAGE = "https://turboconverter.co/common/uninstall2_pii.html?appId=15110&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");


