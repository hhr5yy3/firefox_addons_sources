

var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "dailytopcoupons.com/",
    UNINSTALL_PAGE = "https://dailytopcoupons.com/common/uninstall2_pii.html?appId=13815&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
