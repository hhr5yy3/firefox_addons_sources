var valueMap = {};

valueMap.requestKeys = {
    getId: "getId",
    showOptInPage: "showOptInPage",
    stateCommunicator: "stateCommunicator",
    loadOptInState: "loadOptInState",
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged",
    openOptinNewPage: "openOptinNewPage",
    closeOptinInfoPage: "closeOptinInfoPage",
    optinInfoStateChanged: "optinInfoStateChanged"
};

var eventDomain = "passwordgeneratorpro.co";
var DOMAIN = "passwordgeneratorpro.co/",
    UNINSTALL_PAGE = "https://passwordgeneratorpro.co/common/uninstall2_pii.html?appId=15104&redirect=true";

var OPTIN_PAGE = chrome.runtime.getURL("html/optin.html");
var OPTIN_NEW_PAGE = chrome.runtime.getURL("html/optinInfo.html");

let eventDimensions = {
    eventName: "event_name",
    installDate: "install_date",
    consentState: "consent_state",
    domain: "domain"
};

const loggingUrl = "https://logstashpro-a.akamaihd.net/log?";

