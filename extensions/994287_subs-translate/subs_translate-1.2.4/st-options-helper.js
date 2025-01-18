var def_options = {
    selectors: {
        netflixSelector: ".player-timedtext .player-timedtext-text-container span",
        hboSelector: ".__player-cc-root div p",
        amazonSelector: ".persistentPanel",
        youtubeSelector: ".captions-text span.caption-visual-line",
        customSelector: ""
    },
    serviceUrl: "https://translate.google.com/?sl=en&tl=ru&op=translate&text=",
    lowerCase: false
}

/**
 * Checks selector settings and rewrites by default values if absent.
 * @param {Object} data
 * @return Object
 */
function validateSelectorsOptions(data) {
    var selectors = def_options.selectors;
    var save = !data.selectors;
    if (data.selectors) {
        selectors = data.selectors;
        for (let [key, value] of Object.entries(def_options.selectors)) {
            if (!selectors[key]) {
                selectors[key] = def_options.selectors[key];
                save = true;
            }
        }
    }
    if (save) {
        browser.storage.sync.set({
            selectors: selectors
        });
    }
    return selectors;
}

/**
 * Checks translator URL settings and rewrites by default values if absent.
 * @param {Object} data
 * @return String
 */
function validateServiceUrlOptions(data) {
    var serviceUrl = def_options.serviceUrl;
    if (data.serviceUrl) {
        serviceUrl = data.serviceUrl;
    } else {
        browser.storage.sync.set({
            serviceUrl: serviceUrl
        });
    }
    return serviceUrl;
}

/**
 * Checks lowerCase settings and rewrites by default values if absent.
 * @param {Object} data
 * @return Boolean
 */
function validateLowerCaseOptions(data) {
    var lowerCase = def_options.lowerCase;
    if (data.lowerCase) {
        lowerCase = data.lowerCase;
    } else {
        browser.storage.sync.set({
            lowerCase: lowerCase
        });
    }
    return lowerCase;
}

/**
 * Checks options and rewrites by default values if absent.
 * @param {Object} data
 * @return Object
 */
function validateOptions(data) {
    return {
        selectors: validateSelectorsOptions(data),
        serviceUrl: validateServiceUrlOptions(data),
        lowerCase: validateLowerCaseOptions(data)
    };
}