var rqType = 'infosysco-iscc-request';
var rsType = 'infosysco-iscc-response';
let nfType = 'infosysco-iscc-notification';
var isFlag = 'infosysco-iscc-installed';

let ports = {};

function checkCurrentHostName() {
    return true;
}

try {
    if (checkCurrentHostName()) {
        document.addEventListener('DOMContentLoaded', function(event) {
            if (!!document.head) {
                var meta = document.createElement('meta');
                meta.setAttribute(isFlag, 'true');
                document.head.appendChild(meta);
            }
        });
    }
} catch (err) {
}

function onMessage(message) {
    let data = message.requestId ?
        { type: rsType, response: message } :
        { type: nfType, notification: message };

    window.postMessage(data, '*');
}

function onDisconnect(sessionId) {
    delete ports[sessionId];
    let error = chrome.runtime.lastError;
    let message = !!error
        ? (!!error.message ? error.message : error)
        : 'disconnect from background script';
    onMessage({
        sessionId: sessionId,
        error: {
            type: 'connect',
            message: message
        }
    });
}

function send(request) {
    try {
        let sessionId = request.sessionId;
        let port = ports[sessionId];
        if (!port) {
            port = chrome.runtime.connect({name: sessionId});
            ports[sessionId] = port;
            port.onMessage.addListener(onMessage);
            port.onDisconnect.addListener(function() {
                onDisconnect(sessionId);
            });
        }
        port.postMessage(request);
    } catch (err) {
        onMessage({
            sessionId: request.sessionId,
            commandId: request.commandId,
            error: {
                type: 'connect',
                message: err.message || 'failed to send message to background script'
            }
        });
    }
}

window.addEventListener('message', function(ev) {
    let message = ev.data;
    if (message && message.type === rqType && message.sessionId) {
        message.hostUri = window.location.href;
        send(message);
    }
}, false);
