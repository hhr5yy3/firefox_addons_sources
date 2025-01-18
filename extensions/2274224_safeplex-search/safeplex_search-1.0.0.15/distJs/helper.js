var optInKeys = {
    ipAccept: "piiAccept",
    techAccept: "techAccept",
    featureAccept: "featureAccept"
};

var optInDecider = {
    //from here
    hasTechOptIn: function () {
        var techAcceptState = optInStorageUtil.getItem(optInKeys.techAccept);
        return (techAcceptState == 1);
    },

    hasIpOptIn: function () {
        var ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        return (ipAcceptState == 1);
    },

    hasFeatureOptIn: function () {
        var featureAcceptState = optInStorageUtil.getItem(optInKeys.featureAccept);
        return (featureAcceptState == 1);
    },
    //to here
    hasOptInInteracted: function () {
        var ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        var techAcceptState = optInStorageUtil.getItem(optInKeys.techAccept);
        return ipAcceptState || techAcceptState;
    },
    // from here
    hasExtSpecFeatureOptInInteracted: function () {
        var ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        var featureAcceptState = optInStorageUtil.getItem(optInKeys.featureAccept);
        return ipAcceptState || featureAcceptState;
    },

    hasExtSpecFeatureOptIn: function () {
        return (this.hasIpOptIn() && this.hasFeatureOptIn());
    },

    stateStorageEnabled: function () {
        return this.hasIpOptIn() && this.hasTechOptIn();
    }

};


function getExtensionId() {
    var extensionId = "";
    try {
        extensionId = chrome.runtime.id;
    }
    catch (err) {
        console.log("error while getting chromestore id");
    }
    return extensionId;
}





