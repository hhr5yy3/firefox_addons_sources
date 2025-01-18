

var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

var DOMAIN = "packagetrackingtab.com/",
    UNINSTALL_PAGE = "https://packagetrackingtab.com/common/uninstall2_pii.html?appId=13802&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
