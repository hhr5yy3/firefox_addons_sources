/**
The storage reader error handler.
@error Object
*/
function onGetSelectorsSuccess(data) {
    var selectors = data.selectors;
    var subtitles = "";
    for (let [key, value] of Object.entries(selectors)) {
        if (value) {
            var subsList = document.querySelectorAll(value);
            if (subsList) {
                // Join all lines for subs
                [].forEach.call(subsList, function(element, index_key) {
                    subtitles += (element.innerText || element.textContent).replace(/\s+/g, " ") + " ";
                });
            }
        }
    }

    return subtitles;
}

/**
The storage reader error handler.
@error Object
*/
function onGetError(error) {
    console.error("Unable to read selectors: ", error);
}

browser.storage.sync.get("selectors").then(onGetSelectorsSuccess, onGetError);