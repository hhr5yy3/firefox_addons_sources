var hostName = "sctp_lib";
var ports = {};

function Worker(port, handler) {
    this.port = port;
    this.handler = handler;
    this.messagesQueue = [];
}

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var message = JSON.parse(request);
        var rc = "";
        var error = false;
        var tabId = tabs[0].id;
        console.log("TabId:", tabId);
        console.log("Message Type:", message.type);
        if (message.type == "connect") {
            if (tabId in ports) {
                console.log("tabid in ports");
                rc = { rc: "ALREADY_CONNECT", callbackId: message.eventId };
                sendResponse(JSON.stringify(rc));
            } else {
                console.log("connectNative");
                var port = browser.runtime.connectNative(hostName);
                rc = { rc: "CONNECT", callbackId: message.eventId };

                setTimeout(function() {
                    try {
                        console.log("postMessage");
                        port.postMessage(message);
                    } catch (err) {
                        console.log("ERROR postMessage");
                        error = true;
                        sendResponse(JSON.stringify({ rc: "ERROR-CONNECT", callbackId: message.eventId }));
                    }
                    if (!error) {
                        port.onMessage.addListener(onNativeMessage);
                        port.onDisconnect.addListener(onDisconnected);
                        ports[tabId] = new Worker(port, sendResponse);
                        sendResponse(JSON.stringify(rc));

                    }

                }, 500);

            }
        } else {
            sendNativeMessage(request);
        }
        if (tabId in ports) {
            ports[tabId].handler = sendResponse;
        }
        //onNativeMessage(rc);
    });

    return true;

});


function sendNativeMessage(request) {
    try {
        browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var worker = ports[tabs[0].id];
            worker.port.postMessage(JSON.parse(request));
        });

    } catch (err) {
        alert("sendNativeMessage Error:" + err.message);
    }
}

function onNativeMessage(response) {
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var worker = ports[tabs[0].id];
        var result = "";
        if (response.index == (response.size - 1)) {
            for (var element in worker.messagesQueue[response.callbackId]) {
                result += worker.messagesQueue[response.callbackId][element].result;
            }
            result += response.result;
            response.result = result;
            delete worker.messagesQueue[response.callbackId];
            worker.handler(JSON.stringify(response));
        } else if (response.result.error != undefined) {
            worker.handler(JSON.stringify(response));
        } else {
            if (!worker.messagesQueue[response.callbackId])
                worker.messagesQueue[response.callbackId] = [];
            worker.messagesQueue[response.callbackId][response.index] = response;
        }
    })
}

function onDisconnected() {
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        delete ports[tabs[0].id];
    });
}
