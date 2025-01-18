var log = false;
var host = "com.aspera.connect.nativemessagehost";
var outstandingRequests = 0;
// Keep track of all open connections
var openConnections = {};

function spawnHostProcess() {
  var nativeHostPort = chrome.runtime.connectNative(host);
  nativeHostPort.onMessage.addListener(onNativeMessage);
  nativeHostPort.onDisconnect.addListener(onDisconnected);
  return nativeHostPort;
}

// Triggers when native host communication is interrupted
function onDisconnected(port) {
    if (port && port.name) {
        console.log('Native message host disconnected:', port.name);
        var detail = '';
        if (chrome.extension.lastError) // Chrome technique
            detail = chrome.extension.lastError.message;
        if (port.error) // Firefox technique
            detail = port.error.message;
        if (detail != '')
            console.error(detail);
        // Broadcast to all tabs
        chrome.tabs.query({}, function(tabs) {
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, {
                    name: "AsperaConnectDisconnect",
                    detail: detail
                });
            }
        });

      delete openConnections[port.name];
    }
}

// Triggers when tab is unloaded
function onFrameDisconnected(port) {
    if (port && port.name) {
        console.log('Frame disconnected:', port.name);
        var framePort = openConnections[port.name].framePort;
        var nativeHostPort = openConnections[port.name].nativeHostPort;
        // Clean up connections
        framePort.disconnect();
        nativeHostPort.disconnect();
        delete openConnections[port.name];
    }
}

// Triggered when content script calls runtime.connect
chrome.runtime.onConnect.addListener(function(framePort) {
    if (framePort && framePort.name) {
        console.log('Frame connected: ', framePort.name);
        var frameId = framePort.name;
        var nativeHostPort = spawnHostProcess();
        nativeHostPort.name = frameId;
        // Add ports to open communications hash
        openConnections[frameId] = {};
        openConnections[frameId].framePort = framePort;
        openConnections[frameId].nativeHostPort = nativeHostPort;

        framePort.onDisconnect.addListener(onFrameDisconnected);
    }
});

// Requests from content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    message.sender = sender;
    if (log)
        console.log('Sending native message: ' + JSON.stringify(message));
    outstandingRequests++;

    // Work around Apple usability problem with fullscreen apps
    // Ensure browser window is not fullscreen, so user can see prompts from Connect
    if (/Mac/i.test(navigator.platform) && !isBackgroundApi(message.uri_reference)) {
        exitFullscreen();
    }

    if (openConnections[message.frame_id] && openConnections[message.frame_id].nativeHostPort) {
        openConnections[message.frame_id].nativeHostPort.postMessage(message);
    }
});

// Replies from desktop app
function onNativeMessage(message) {
    if (typeof message === 'string') {
        if (message.length == 0)
            return;
        message = JSON.parse(message);
    }
    outstandingRequests--;
    if (!message.hasOwnProperty('sender')) {
        console.log('Invalid message received. sender property missing.');
        return;
    }
    message.name = "AsperaConnectResponse";

    // Include the sender origin so content script can specify the target origin
    if (!message.sender.origin) {
        if (message.sender.url) {
            var url = new URL(message.sender.url);
        } else {
            var url = new URL(openConnections[message.frame_id].framePort.sender.url);
        }
        message.sender.origin = url.origin;
    }

    chrome.tabs.sendMessage(message.sender.tab.id, message);
    if (log) {
        console.log('Receiving native message: ' + JSON.stringify(message));
        console.log('Outstanding requests: ' + outstandingRequests);
    }
}

function isBackgroundApi(uriRef) {
    if (!uriRef)
        return false;
    return (/activity/i.test(uriRef) || /version/i.test(uriRef) || /initialize/i.test(uriRef));
}

function exitFullscreen() {
    chrome.windows.getLastFocused({}, function(wnd) {
        if (!wnd || !wnd.id)
            return;
        if (wnd.state == "fullscreen") {
            console.log("Converting window from fullscreen to maximized");
            chrome.windows.update(wnd.id, { state: "maximized" });
        }
    });
}

// Get content script to load by refreshing tabs
function refreshAsperaTabs() {
    // Edge does not yet support reloading specific tabs or running scripts before content script is injected
    if (/edge/i.test(navigator.userAgent)) {
        chrome.tabs.reload();
        return;
    }
    chrome.tabs.query({ url: ["http://*/*", "https://*/*"] }, function(tabs) {
        if (!tabs)
            return;
        // Check every tab to find which one is expecting Aspera extension
        for (var i=0; i<tabs.length; ++i) {
            var id = tabs[i].id;
            // The last expression is returned to the callback
            var locateHelper = "var tabId; if (document.querySelector('.aspera-connect-ext-locator')) { tabId=" + id + "; } tabId";
            chrome.tabs.executeScript(id,
                { code: locateHelper, allFrames: true },
                function(results) {
                    for (var ix in results) {
                        var tabId = results[ix];
                        if (!tabId) return;
                        chrome.tabs.update(tabId, { active: true });
                        chrome.tabs.executeScript(tabId, { code: 'window.location.reload()' });
                        return;
                    }
                }
            );
        }
    });
}
refreshAsperaTabs();
