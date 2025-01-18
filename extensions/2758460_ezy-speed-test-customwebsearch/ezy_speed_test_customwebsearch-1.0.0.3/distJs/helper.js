var optInKeys = {
    ipAccept: "piiAccept",
    techAccept: "techAccept",
    featureAccept: "featureAccept"
};

var optInDecider = {
    hasOptInInteracted: function () {
        var ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        var techAcceptState = optInStorageUtil.getItem(optInKeys.techAccept);
        return ipAcceptState || techAcceptState;
    }
};

function getExtensionId() {
    var extensionId = "";
    try {
        extensionId = chrome.runtime.id;
    } catch (err) {
        console.log("error while getting chromestore id");
    }
    return extensionId;
}


function getNewTabThemeUrl() {
    return chrome.runtime.getURL('html/homepage.html');
}