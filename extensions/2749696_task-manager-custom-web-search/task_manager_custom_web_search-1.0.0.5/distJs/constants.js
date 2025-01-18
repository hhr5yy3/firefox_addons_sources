

var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    handleNotification:"handleNotification",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "taskmanagertab.com/",
    UNINSTALL_PAGE = "https://taskmanagertab.com/common/uninstall2_pii.html?appId=13851&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");

valueMap.dimensions = {
    installDate: "install_date",
    optInDate: "optInDate",
    optInStatus: "optInStatus"
};

var NEWTAB_DEFAULT = "";
var NEWTAB_FALLBACK = "";