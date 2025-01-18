let storageUtil = {
    setItem: function (name, value) {
        if (value !== undefined && value !== null)
            storageReplacer.setLocalStorageItem(name, JSON.stringify(value));
    },

    setItemVal: function (name, value) {
        if (value !== undefined && value !== null)
            storageReplacer.setLocalStorageItem(name, value);
    },

    getItem: function (name) {
        let data = storageReplacer.getLocalStorageItem(name);
        try {
            return JSON.parse(data);
        } catch (err) {
        }
        return data;
    }
};

let optInStorageUtil = {
    setItem: function (name, value) {
        storageUtil.setItem(name, value);
    },

    getItem: function (name) {
        return storageUtil.getItem(name);
    }
};

let extSpecFeatureStorageUtil = {
    setItem: function (name, value) {
        if (optInDecider.hasExtSpecFeatureOptIn())
            storageUtil.setItem(name, value);
    },

    getItem: function (name) {
        if (optInDecider.hasExtSpecFeatureOptIn())
            return storageUtil.getItem(name);
    }
};


let optInKeys = {
    ipAccept: "piiAccept",
    techAccept: "techAccept",
    featureAccept: "featureAccept"
};

let optInDecider = {
    hasTechOptIn: function () {
        let techAcceptState = optInStorageUtil.getItem(optInKeys.techAccept);
        return (techAcceptState == 1);
    },

    hasIpOptIn: function () {
        let ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        return (ipAcceptState == 1);
    },

    hasFeatureOptIn: function () {
        let featureAcceptState = optInStorageUtil.getItem(optInKeys.featureAccept);
        return (featureAcceptState == 1);
    },

    hasOptInInteracted: function () {
        let ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        let techAcceptState = optInStorageUtil.getItem(optInKeys.techAccept);
        return ipAcceptState || techAcceptState;
    },

    hasExtSpecFeatureOptInInteracted: function () {
        let ipAcceptState = optInStorageUtil.getItem(optInKeys.ipAccept);
        let featureAcceptState = optInStorageUtil.getItem(optInKeys.featureAccept);
        return ipAcceptState || featureAcceptState;
    },

    hasExtSpecFeatureOptIn: function () {
        return (this.hasIpOptIn() && this.hasFeatureOptIn());
    },

    stateStorageEnabled: function () {
        return this.hasIpOptIn() && this.hasTechOptIn();
    }

};

let showOptInPage = "showOptInPage";


let viewPermissionDiv = document.getElementsByClassName("pop-up-wrap")[0];
let safeWrapper = document.getElementsByClassName("safe_wrapper")[0];
let unsafeWrapper = document.getElementsByClassName("unsafe_wrapper")[0];
let showBtn = document.getElementById("acceptTerms");
let cancelBtn = document.getElementById("denytTerms");
let unsafeWrapperText = document.getElementsByClassName("unsafe_title")[0];
let unsafeWrapperHeader = document.getElementsByClassName("unsafe_header")[0];

showBtn.onclick = function () {
    chrome.runtime.sendMessage({task: showOptInPage}, function (response) {
    });
    window.close();
};

cancelBtn.onclick = function () {
    window.close();
};

let PIIQueryParams = ["postcode", "zip", "zipcode", "firstname", "tel", "email", "pass", "password", "name", "familyname", "secondname"];

function extractDomain(url) {
    let element = document.createElement("a");
    element.href = url;
    return element.host;
}

function PIIRemoval(url) {
    function removeHashParams(url) {
        return url.split("#")[0];
    }

    function removePIIParams(url) {
        let sourceUrl = url.split("?")[0];
        let queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";
        if (!queryString)
            return sourceUrl;
        let params_arr = queryString.split("&");
        for (let i = params_arr.length - 1; i >= 0; i -= 1) {
            let param = params_arr[i].split("=")[0];
            if (PIIQueryParams.indexOf(param.toLowerCase()) > -1) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length > 0)
            return sourceUrl + "?" + params_arr.join("&");
        return sourceUrl;
    }

    url = removeHashParams(url);
    return removePIIParams(url);
}

function showSecureStatusPopUp(secureStatus, threatTypeStatus) {
    if (secureStatus.typeId === "safe")
        safeWrapper.classList.remove("d-none");
    else
        unsafeWrapper.classList.remove("d-none");
    for (const [key, value] of Object.entries(threatTypeStatus)) {
        document.getElementById(secureStatus.typeId + "_" + key).textContent = '' + value;
    }
}

function getCurrentUrlStatusFromStorage() {
    return extSpecFeatureStorageUtil.getItem("currentUrlStatus");
}

let checkIfActiveTabSecure = function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let link = extractDomain(PIIRemoval(tabs[0].url));
        let response = getCurrentUrlStatusFromStorage();
        let linkMapRes = getLinkMapRes(response);
        if (link in linkMapRes) {
            displayStatusTemp(link, response);
        } else {
            chrome.runtime.sendMessage({
                detail: "verifyCurrentUrl",
                links: [link]
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', function () {
    storageReplacer.init().then(function () {
        if (optInDecider.hasExtSpecFeatureOptIn()) {
            viewPermissionDiv.style.display = 'none';
            checkIfActiveTabSecure();
        } else {
            viewPermissionDiv.style.display = 'block';
        }
    });
});

chrome.runtime.onMessage.addListener(function (message) {
    if (message.detail == "displayStatusIcons") {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            displayStatusTemp(extractDomain(PIIRemoval(tabs[0].url)), message.response);
        });
    }
});

function displayStatusTemp(link, response) {
    let linkMapRes = getLinkMapRes(response);
    if (link in linkMapRes) {
        let secureStatus = classifyStatus(linkMapRes[link]["@attributes"]['sr'], linkMapRes[link]["@attributes"]['br']);
        let threatTypeStatus = getThreatTypeStatus(linkMapRes[link]["@attributes"]["threat"]);
        showSecureStatusPopUp(secureStatus, threatTypeStatus);
    }
}