var optInKeys = {
    ipAccept: "piiAccept",
    techAccept: "techAccept",
    featureAccept: "featureAccept",
    infoAccept: "infoAccept"
};

var optInDecider = {
    hasOptInInteracted: function () {
        var ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        return !!ipAcceptState;
    }
};

var infoDecider = {
    hasOptInInteracted: function () {
        var infoAcceptState = optInStorageUtil.getItem(optInKeys.infoAccept);
        return !!infoAcceptState && infoAcceptState !== -1;
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

function getInstallDate() {
    let timeStamp = storageReplacer.getLocalStorageItem(eventDimensions.installDate);
    if (!timeStamp) {
        timeStamp = new Date().getTime();
        storageReplacer.setLocalStorageItem(eventDimensions.installDate, timeStamp);
    }
    let installDate = new Date(timeStamp);
    let year = installDate.getFullYear();
    let month = formatDate(installDate.getMonth() + 1);
    let date = formatDate(installDate.getDate());
    return "" + year + "-" + month + "-" + date;
}

function formatDate(val) {
    if (val < 10)
        return "0" + val;
    return val;
}