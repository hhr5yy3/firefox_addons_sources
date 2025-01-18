var inuse = false;
var K_EXTENSION_ID = "firefoxextension@porezna-uprava.hr";

// Forward the message from page.js to background.js
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source !== window || event.data.extensionId != K_EXTENSION_ID) {
        writeToLog("Extension id:" + JSON.stringify(event.data));       
        return;
    }

    if (event.data.src && (event.data.src === "Signing.js")) {
        
        var sending = browser.runtime.sendMessage(event.data);
        sending.then(
            function (message) {
                //writeToLog("Message from the background script:  ", JSON.stringify(message));
            },
            function (error) {
                //writeToLog("Error: ${error}");
            }
        )
        
        return;
    }

    // and forward to extension
    if (event.data.src && (event.data.src === "page.js")) {
        event.data["origin"] = location.origin;
        chrome.runtime.sendMessage(event.data, function(response) {});

        // Only add unload handler if extension has been used
        if (!inuse) {
            // close the native component if page unloads
            window.addEventListener("beforeunload", function(event) {
                chrome.runtime.sendMessage({src: 'page.js', type: 'DONE'});
            }, false);
            inuse = true;
        }
    }
}, false);


// post messages from extension to page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    writeToLog("content.js - From bckg : " + JSON.stringify(request));
    window.postMessage(request, '*');
});

// inject page.js to the DOM of every page
// FIXME: maybe not ?
var s = document.createElement('script');
s.src = browser.extension.getURL('page.js');

// remove script tag after script itself has loaded
s.onload = function() {this.parentNode.removeChild(this);};
(document.head || document.documentElement).appendChild(s);


var isWriteToLogEnabled = false;

function writeToLog(message) {
    if (isWriteToLogEnabled) {
        console.log(K_EXTENSION_ID + ":  " + message);
    }
}