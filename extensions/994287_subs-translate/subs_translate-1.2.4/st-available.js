var available = false;

/**
 * The success result handler for the options reader.
 * Checks if subtitles container exists.
 * @param {Object} data
 * @return Boolean
 */
function onGetSelectorsSuccess(data) {
    var nodePresent = false;
    for (let [key, value] of Object.entries(data.selectors)) {
        if (value) {
            var selector = value.split(" ")[0];
            var nodeList = document.querySelectorAll(selector);
            if (nodeList && nodeList.length > 0) {
                nodePresent = true;
                break;
            }
        }
    }
    if (available != nodePresent) {
        available = nodePresent;
        browser.runtime.sendMessage({
            available: available
        });
    }

    return available;
}

/**
 * The document onClick handler.
 * @param {Object} event
 */
function documentOnClick(event) {
    browser.storage.sync.get("selectors").then(onGetSelectorsSuccess, onGetError);
}

/**
 * The storage reader error handler.
 * @param {Object} error
 */
function onGetError(error) {
    console.error("Unable to read selectors: ", error);
}

// Add listeners
document.onclick = documentOnClick;

// Read the options
browser.storage.sync.get("selectors").then(onGetSelectorsSuccess, onGetError);