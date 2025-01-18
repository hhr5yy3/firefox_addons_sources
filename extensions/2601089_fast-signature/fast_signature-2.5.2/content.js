window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

connectNative();

document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);

function fireContentLoadedEvent() {
    //console.log ("DOMContentLoaded");
    if (document.getElementById('WebExtensionDiv')) document.getElementById('WebExtensionDiv').setAttribute('value', browser.runtime.getManifest().version);
}

window.onbeforeunload = disconnectNative;

document.addEventListener('FAST_signPES',
    function (data) {
        console.log("sending message to Host...");
        let message = data.detail
        message['action'] = 'FAST_signPES';
        sendNativeMessage(message);
    }, false);

document.addEventListener('FAST_signCertificate',
    function (data) {
        console.log("received notif");
        let message = data.detail
        message['action'] = 'FAST_signCertificate';
        sendNativeMessage(message);
    }, false);

document.addEventListener('FAST_signPKCS7',
    function (data) {
        let message = data.detail
        message['action'] = 'FAST_signPKCS7';
        sendNativeMessage(message);
    }, false);

document.addEventListener('FAST_signPLACE',
    function (data) {
        console.log("sending message to Host...");
        let message = data.detail
        message['action'] = 'FAST_signPLACE';
        sendNativeMessage(message);
    }, false);

document.addEventListener('FAST_version',
    function () {
        sendNativeMessage({
            'action': 'FAST_version',
            'webExtensionVersion': browser.runtime.getManifest().version
        });
    }, false);

browser.runtime.onMessage.addListener(
    function (request) {
        if (request.action === 'RECEIVED_NATIVE_MESSAGE') {
            if (request.type === 'FAST_getSignPES') {
                dispatchEvent('FAST_getSignPES', request.data);
            } else if (request.type === 'FAST_getSignPKCS7') {
                dispatchEvent('FAST_getSignPKCS7', request.data);
            } else if (request.type === 'FAST_getVersion') {
                dispatchEvent('FAST_getVersion', request.data);
            } else if (request.type === 'FAST_getSignCertificate') {
                dispatchEvent('FAST_getSignCertificate', request.data);
            }
        } else if (request.action === 'CONNECTION_SUCCESSFUL') {
            dispatchEvent('FAST_connectionWebExtensionOK', request.data);
        }
    });

// Native messaging service
function connectNative() {
    browser.runtime.sendMessage({ action: 'CONNECT' });
}

function disconnectNative() {
    try {
        //alert() is not actually supported in Firefox WebExtension background scripts.
        //This forces the Browser Console open.
        //This abuse of a misfeature works in FF49.0b+, not in FF48.
        alert("disconnect");
    } catch (e) {
        //alert() throws an error in Firefox versions below 49.
        console.log('alert() threw an error. Probably Firefox version < 49.');
    }
    browser.runtime.sendMessage({ action: 'DISCONNECT' });
}

function sendNativeMessage(data) {
    let message = {
        action: 'SEND_NATIVE_MESSAGE',
        data: data
    }
    browser.runtime.sendMessage(message); 
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

function dispatchEvent(type, data) {
    let event;
    if (typeof cloneInto === "function") {
        let eventDetail = cloneInto({ detail: data }, document.defaultView);
        event = new document.defaultView.CustomEvent(type, eventDetail);
        document.dispatchEvent(event);
    } else {
        event = new CustomEvent(type, {
            'detail': data
        });
    }
    document.dispatchEvent(event);
}