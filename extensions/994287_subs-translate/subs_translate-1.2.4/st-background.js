var subtitles = "";

/**
 * Enables or disables the browserAction.
 * @param {Boolean} enabled
 */
function setEnabled(enabled) {
    if (enabled) {
        browser.browserAction.enable();
    } else {
        browser.browserAction.disable();
    }
}

/**
 * Injects and runs script to check if subtitles container exists.
 */
function checkIsEnabled() {
    browser.tabs.executeScript({
        file: "st-available.js"
    }).then(result => {
        setEnabled(result && result[0]);
    }).catch(onExecuteError);
}

/**
 * The tabs.onCreated handler.
 * @param {Object} event
 */
function onTabUpdated(event) {
    checkIsEnabled();
}

/**
 * The tabs.onActivated handler.
 * @param {Object} event
 */
function onTabActivated(event) {
    checkIsEnabled();
}

/**
 * The browserAction.onClicked handler.
 */
function onClicked() {
    browser.tabs.executeScript({
        file: "st-content.js"
    }).then(result => {
        if (result && result[0]) {
            subtitles = result[0];
            browser.storage.sync.get(["serviceUrl", "lowerCase"]).then(onGetServiceUrlSuccess, onGetError);
        }
    }).catch(onExecuteError);
}

/**
 * The runtime.onMessage handler for the content script message.
 * @param {Object} data
 */
function onMessage(data) {
    setEnabled(data.available);
}

/**
 * The handler for the options reader.
 * Creates new tab for the translator.
 * @param {Object} data
 */
function onGetServiceUrlSuccess(data) {
    // Translate
    browser.tabs.create({
        url: encodeURI(data.serviceUrl + (data.lowerCase ? subtitles.toLowerCase() : subtitles))
    });
}

/**
 * The local storage reader error handler.
 * @param {Object} error
 */
function onGetError(error) {
    browser.browserAction.disable();
    console.error("Unable to read settings: ", error);
}

/**
 * The script execution error handler.
 * This could happen if the extension is not allowed to run code in
 * the page, for example if the tab is a privileged page.
 * @param {Object} error
 */
function onExecuteError(error) {
    browser.browserAction.disable();
    console.log("Failed to execute script: ", error);
}

browser.browserAction.disable();
// Check the options
browser.storage.sync.get().then(validateOptions, onGetError);
// Add listeners
browser.runtime.onMessage.addListener(onMessage);
browser.tabs.onUpdated.addListener(onTabUpdated);
browser.tabs.onActivated.addListener(onTabActivated)
browser.browserAction.onClicked.addListener(onClicked);