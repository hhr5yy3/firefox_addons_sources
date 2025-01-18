function displayError(error) {

    chrome.runtime.sendMessage({
        action: "onError",
        errorMessage: error
    });

    var message = document.querySelector('#message');
    message.innerText = error;
}

function onWindowLoad() {
    
    chrome.tabs.executeScript(null, {
        file: "injected/getPagesSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
        	var errorMsg = chrome.extension.lastError.message;
        	if (errorMsg == "Missing host permission for the tab")
        		errorMsg = "Saving Firefox addon pages is not supported";
            displayError("Error reading current page: " + errorMsg);
        }
    });
}

window.onload = onWindowLoad;

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "closePopup") {
        window.close();
    }
});