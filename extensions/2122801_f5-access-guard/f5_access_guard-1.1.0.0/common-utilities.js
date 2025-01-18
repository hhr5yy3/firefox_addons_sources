'use strict';

let commonUtilities = {
    logTraceMessage: function(message) {
        if((extLogLevel === LOGLEVEL.TRACE) &&
            (typeof message === "string")) {
            chrome.runtime.sendNativeMessage(
                NATIVE_MESSAGING_HOST,
                { log: message }
            );
            let timeStamp = new Date();
            console.log(timeStamp.toUTCString() + ", " + message);
        }
    },
    logConsoleMessage: function(message) {
        try {
            if(extLogLevel === LOGLEVEL.TRACE) {
                let timeStamp = new Date();
                console.log(timeStamp.toUTCString() + " , " + message);
            }
        } catch(e) {
            console.log("Failed to log message, error: " + e.name + ", " + e.message)
        }
    },
    isEqualArrays: function (lhs, rhs) {
        if (!lhs ||
            !rhs ||
            !Array.isArray(lhs) ||
            !Array.isArray(rhs))
            return false;

        if (lhs.length != rhs.length) {
            return false;
        }
        for (let i = 0; i < lhs.length; ++i) {
            if (lhs[i] !== rhs[i]) {
                return false;
            }
        }
        return true;
    },
    toNameValuePairObject: function (nameValuePairString, pairDelimiter, nameValueDelimiter) {
        if ((typeof nameValuePairString !== "string") ||
            (typeof pairDelimiter !== "string") ||
            (typeof nameValueDelimiter !== "string")) {
            return {};
        }
        // Split the string into an object of name value pairs
        let nameValueMap = {};
        let nameValueArray = nameValuePairString.split(pairDelimiter);
        nameValueArray.forEach(function (item) {
            let nameValuePair = item.split(nameValueDelimiter);
            nameValueMap[nameValuePair[0]] = nameValuePair[1];
        });
        return nameValueMap;
    },
    getVersion: function () {
        try {
            var manifestData = chrome.runtime.getManifest();
            return manifestData.version;
        } catch (e) {
            commonUtilities.logTraceMessage("Error: " + e.name + ", " + e.message);
            return "";
        }
    }
}