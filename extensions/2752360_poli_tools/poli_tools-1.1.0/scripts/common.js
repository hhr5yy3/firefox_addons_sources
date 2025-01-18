let PoliToolsPort  = chrome.runtime.connect({name: "politools"});
let PoliToolsDebug = false;

// Listen and dispatch messages coming from external (not part of the extension) scripts.
window.addEventListener("message", function(event) {
    // Only allow messages if they are from the same window and contain both destination and data fields.
    if(event.source != window || !event.data.dst || !event.data.data) {
        return;
    }

    switch(event.data.dst) {
        case "background-script":
            PoliToolsPort.postMessage(event.data.data);
            break;
        case "background-log":
            if(event.data.data)
                extensionLog.log(event.data.data);
            else
                extensionLog.log("Received malformed message from page.");
            break;
            case "background-err":
                if(event.data.data)
                    extensionLog.err(event.data.data);
                else
                    extensionLog.log("Received malformed message from page.");
                break;
        default:
            extensionLog.log("Received malformed message from page.");
    }
});

// Listen and dispatch messages coming from the extension's background script.
PoliToolsPort.onMessage.addListener(function(msg) {
    if(!msg.dst) {
        extensionLog.log("Received message from background script but no destination was specified.");
        return;
    }

    switch(msg.dst) {
        case "window":
            window.postMessage(msg.dat);
            break;
        default:
            extensionLog.log("Received message from background script but no destination matches '" + msg.dst + "'.");
    }
});



// Wait for a certain amount of time to pass.
// Can be used both with await and .then()
function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms));
}

// Log a message to the extension's log console
let extensionLog = {
    log: function(msg) {
        if(PoliToolsDebug) {
            PoliToolsPort.postMessage({
                msg: "background-log",
                data: msg
            });
        }
    },
    err:function(msg) {
        if(PoliToolsDebug) {
            PoliToolsPort.postMessage({
                msg: "background-err",
                data: msg
            });
        }
    }
}





// Perform an Ajax request with the specified parameters:
//   - data: What has to be sent.
//   - type: "POST" or "GET" etc.
//   - url : The URL to contact. 
function performRequest(data, type, url) {
    return new Promise(function(resolve, reject) {
        $.ajax({data, type, url}).done(resolve).fail(reject);
    });
}

// Download an arbitrary file with the given filename.
function downloadFile(url, filename) {
    extensionLog.log("Downloading file: " + JSON.stringify({url, filename}));
    PoliToolsPort.postMessage({
        msg: "download-file",
        data: {
            subject: "URL",
            content: url,
            filename: filename
        }
    });
}