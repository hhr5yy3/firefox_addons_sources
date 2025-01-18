

var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "quickrecipehub.com/",
    UNINSTALL_PAGE = "https://quickrecipehub.com/common/uninstall2_pii.html?appId=13852&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");

valueMap.dimensions = {
    installDate: "install_date",
    optInDate: "optInDate",
    optInStatus: "optInStatus"
};

