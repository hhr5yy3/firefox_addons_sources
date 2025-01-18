

var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "weatherauthority.co/",
    UNINSTALL_PAGE = "https://weatherauthority.co/common/uninstall2_pii.html?appId=13855&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
