/*
Default settings. If there is nothing in storage, use these values.
*/
(function() {
    var timeout = NaN;
    var _iconAnimation = new IconAnimation();
    _iconAnimation.updated.add(function() {
        chrome.browserAction.setIcon({
            'imageData': {
                '19': _iconAnimation.getImageData(),
                '38': _iconAnimation.getRetinaImageData()
            }
        });
    });
    var defaultSettings = {
        since: "hour",
        dataTypes: ["history", "downloads"]
    };

    /*
    Generic error logger.
    */
    function onError(e) {
        console.error(e);
    }

    /*
    On startup, check whether we have stored settings.
    If we don't, then store the default settings.
    */
    function checkStoredSettings(storedSettings) {
        if (!storedSettings.since || !storedSettings.dataTypes) {
            chrome.storage.local.set(defaultSettings);
        }
    }

    chrome.storage.local.get(defaultSettings, checkStoredSettings);

    /*
    Forget browsing data, according to the settings passed in as storedSettings
    or, if this is empty, according to the default settings.
    */
    function forget(storedSettings) {

        /*
        Convert from a string to a time.
        The string is one of: "hour", "day", "week", "month", "forever".
        The time is given in milliseconds since the epoch.
        */
        function getSince(selectedSince) {
            if (selectedSince === "forever") {
                return 0;
            }

            const times = {
                hour: () => {
                    return 1000 * 60 * 60
                },
                day: () => {
                    return 1000 * 60 * 60 * 24
                },
                week: () => {
                    return 1000 * 60 * 60 * 24 * 7
                },
                month: () => {
                    return 1000 * 60 * 60 * 24 * 7 * 4
                }
            }

            const sinceMilliseconds = times[selectedSince].call();
            return Date.now() - sinceMilliseconds;
        }

        /*
        Convert from an array of strings, representing data types,
        to an object suitable for passing into browsingData.remove().
        */
        function getTypes(selectedTypes) {
            let dataTypes = {};
            for (let item of selectedTypes) {
                dataTypes[item] = true;
            }
            return dataTypes;
        }

        const since = getSince(storedSettings.since);
        const dataTypes = getTypes(storedSettings.dataTypes);

        function notify() {
            _iconAnimation.fadeIn();
            let dataTypesString = Object.keys(dataTypes).join(", ");
            let sinceString = new Date(since).toLocaleString();
            startTimeout(function() {
                chrome.browserAction.setBadgeText({
                    text: ""
                });
                chrome.browserAction.setPopup({
                    popup: ""
                });
                _iconAnimation.fadeOut();
            }, 500);
        }

        chrome.browsingData.remove({
            since
        }, dataTypes, function() {
            _iconAnimation.fadeIn();
            let dataTypesString = Object.keys(dataTypes).join(", ");
            let sinceString = new Date(since).toLocaleString();
            startTimeout(function() {
                chrome.browserAction.setBadgeText({
                    text: ""
                });
                chrome.browserAction.setPopup({
                    popup: ""
                });
                _iconAnimation.fadeOut();
            }, 500);
        });
    }

    function startTimeout(handler, delay) {
        stopTimeout();
        timeout = setTimeout(handler, delay);
    }

    function stopTimeout() {
        if (!isNaN(timeout)) {
            return;
        }
        clearTimeout(timeout);
    }
    chrome.runtime.onInstalled.addListener((details) => {
        if (["install", "update"].indexOf(details.reason) > -1) {
            var optionsPage = chrome.runtime.getURL("options/options.html");
            chrome.tabs.create({
                url: optionsPage + "?" + details.reason + "=true"
            });
        }
    });
    /*
    On click, fetch stored settings and forget browsing data.
    */
    chrome.browserAction.onClicked.addListener(() => {
        chrome.storage.local.get(defaultSettings, forget);
    });

})();
