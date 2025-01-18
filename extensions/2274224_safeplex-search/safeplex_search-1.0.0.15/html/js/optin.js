var storageUtil = {
    setItem: function (name, value) {
        if (value !== undefined && value !== null)
            storageReplacer.setLocalStorageItem(name, JSON.stringify(value));
    },

    setItemVal: function (name, value) {
        if (value !== undefined && value !== null)
            storageReplacer.setLocalStorageItem(name, value);
    },

    getItem: function (name) {
        var data = storageReplacer.getLocalStorageItem(name);
        try {
            return JSON.parse(data);
        } catch (err) {
        }
        return data;
    }
};

var optInStorageUtil = {
    setItem: function (name, value) {
        storageUtil.setItem(name, value);
    },

    getItem: function (name) {
        return storageUtil.getItem(name);
    }
};

var extSpecFeatureStorageUtil = {
    setItem: function (name, value) {
        if (optInDecider.hasExtSpecFeatureOptIn())
            storageUtil.setItem(name, value);
    },

    getItem: function (name) {
        if (optInDecider.hasExtSpecFeatureOptIn())
            return storageUtil.getItem(name);
    }
};


var htmlUtil = {
    onPageLoad: function (callback) {
        document.addEventListener("DOMContentLoaded", callback)
    },

    getElementById: function (id) {
        return document.getElementById(id);
    }
};

var optInKeys = {
    ipAccept: "piiAccept",
    techAccept: "techAccept",
    featureAccept: "featureAccept"
};
var buttonData = {
    IP_BUTTON: {
        storageKey: optInKeys.ipAccept,
        id: "ip_btn",
    },
    TECH_BUTTON: {
        storageKey: optInKeys.techAccept,
        id: "tech_btn"
    }
};
var CONFIRM_BUTTON = "confirmBtn";
var AGREE_BUTTON = "agreebtn";
var DISAGREE_BUTTON = "disagreebtn";

var messageCommunicator = {
    closeoptinpage: "closeoptinpage",
    optinStateChanged: "optinStateChanged"
};

function storeAllStates(state) {
    var buttons = Object.keys(buttonData);
    for (var i = 0; i < buttons.length; i++) {
        optInStorageUtil.setItem(buttonData[buttons[i]].storageKey, state);
    }

    chrome.runtime.sendMessage({task: messageCommunicator.optinStateChanged}, function (response) {
    });
}

function closeCurrentPage() {
    chrome.runtime.sendMessage({task: messageCommunicator.closeoptinpage}, function (response) {
    });
}

const BtnEventsListeners = {

    agreeButtonClick: function (e) {
        storeAllStates(1);
        closeCurrentPage();
    },

    disagreeButtonClick: function (e) {
        storeAllStates(-1);
        closeCurrentPage();
    }
};

function loadInitStatus() {
}


htmlUtil.onPageLoad(function (event) {
    loadInitStatus();

    htmlUtil.getElementById(AGREE_BUTTON).addEventListener("click", BtnEventsListeners.agreeButtonClick);
    htmlUtil.getElementById(DISAGREE_BUTTON).addEventListener("click", BtnEventsListeners.disagreeButtonClick);


});

buttonData["FEATURE_BUTTON"] = {
    storageKey: optInKeys.featureAccept,
    id: "feature_btn"
};

