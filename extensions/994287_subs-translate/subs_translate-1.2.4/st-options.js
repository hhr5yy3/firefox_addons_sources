/**
 * Handles the form submit event.
 * @param {Object} event
 */
function onSubmit(event) {
    event.preventDefault();
    // Save the options to the local storage
    browser.storage.sync.set({
        selectors: {
            netflixSelector: document.querySelector("#netflixSelector").value,
            hboSelector: document.querySelector("#hboSelector").value,
            amazonSelector: document.querySelector("#amazonSelector").value,
            youtubeSelector: document.querySelector("#youtubeSelector").value,
            customSelector: document.querySelector("#customSelector").value
        },
        serviceUrl: document.querySelector("#serviceUrl").value,
        lowerCase: document.querySelector("#lowerCase").checked
    });
}

/**
 * Handles the "Default" button click.
 * @param {Object} event
 */
function onResetButtonClick(event) {
    event.preventDefault();
    var c = confirm("Are you sure you want to reset to the default values?");
    if (c) {
        browser.storage.sync.clear();
        browser.storage.sync.set(def_options).then(
            () => {
                document.querySelector("#netflixSelector").value = def_options.selectors.netflixSelector;
                document.querySelector("#hboSelector").value = def_options.selectors.hboSelector;
                document.querySelector("#amazonSelector").value = def_options.selectors.amazonSelector;
                document.querySelector("#youtubeSelector").value = def_options.selectors.youtubeSelector;
                document.querySelector("#customSelector").value = def_options.selectors.customSelector;
                document.querySelector("#serviceUrl").value = def_options.serviceUrl;
                document.querySelector("#lowerCase").checked = def_options.lowerCase;
            }    
        );
        alert("Default values have been restored.");
    }
}

/**
 * The options param reader success handler.
 * @param {Object} data
 */
function onGetSuccess(data) {
    var options = validateOptions(data);
    document.querySelector("#netflixSelector").value = options.selectors.netflixSelector;
    document.querySelector("#hboSelector").value = options.selectors.hboSelector;
    document.querySelector("#amazonSelector").value = options.selectors.amazonSelector;
    document.querySelector("#youtubeSelector").value = options.selectors.youtubeSelector;
    document.querySelector("#customSelector").value = options.selectors.customSelector;
    document.querySelector("#serviceUrl").value = options.serviceUrl;
    document.querySelector("#lowerCase").checked = options.lowerCase;
}

/**
 *The storage reader error handler.
 *@param {Object} error
 */
function onGetError(error) {
    console.error("Unable to get options data: ", error);
}

/**
 * Reads options from the local storage.
 */
function readOptions() {
    browser.storage.sync.get().then(onGetSuccess, onGetError);
}

/**
 *The DOMContentLoaded event handler.
 */
function onDOMContentLoaded() {
    // Read the options
    readOptions();
}

// Add listeners
document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
document.querySelector("form").addEventListener("submit", onSubmit);
document.getElementById("#reset").addEventListener("click", onResetButtonClick);