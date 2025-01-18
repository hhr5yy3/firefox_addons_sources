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

var DOMAIN = "convertersuite.com/",
    UNINSTALL_PAGE = "https://convertersuite.com/common/uninstall2_pii.html?appId=13163&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
var brVersion;

browser.runtime.getBrowserInfo().then(info=>{
    brVersion= info.version;
});
