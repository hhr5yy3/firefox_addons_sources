var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator: "stateCommunicator",
    loadOptInState: "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged",
    openHomepage: "openHomepage"
};

var DOMAIN = "manualsexplorer.co/",
    UNINSTALL_PAGE = "https://manualsexplorer.co/common/uninstall2_pii.html?appId=15142&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
