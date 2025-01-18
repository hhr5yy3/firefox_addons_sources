var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator : "stateCommunicator",
    loadOptInState : "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

let DOMAIN = "safeplexsearch.com/";
let UNINSTALL_PAGE = "https://safeplexsearch.com/common/uninstall2_pii.html?appId=12933&redirect=1&";
let OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");