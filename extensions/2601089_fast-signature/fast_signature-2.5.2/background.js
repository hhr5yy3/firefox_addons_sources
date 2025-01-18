let browser = (function () {
    return chrome;
})();
let hostName = 'fast.sign.web.extension';
let port = null;


browser.runtime.onMessage.addListener(
function (request) {
        if (request.action === 'CONNECT') {
            connect();
        } else if (request.action === 'DISCONNECT') {
            onDisconnect();
        } else if (request.action === 'SEND_NATIVE_MESSAGE') {
            try {
                /*if (request.data.action.indexOf("FAST_sign") > -1
                    && request.data.action.indexOf("Certificate") == -1) {
                //if (request.data.action.indexOf("FAST_sign") > -1 ) {
                    port.disconnect();
                    port = null;
                    connect();
                } */
                browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    var i;
                    console.log('nb: ' + tabs.length);
                    for (i = 0; i < tabs.length; i++) {
                        //normalement , il n'y en a qu'un
                        console.log('--id: ' + tabs[i].id);
                        let tabID = tabs[i].id;
                        let windowID = tabs[i].windowId;
                        request.data.tabID = tabID;
                        request.data.WindowID = windowID;
                        port.postMessage(request.data);
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    });

/*
function setNeedToShowPopupInFront() {
    console.log("time elapsed, next signature will need password");
    needToShowPopupInFront = true;
}*/

// Native Messaging
function connect() {
    if (port == null) {
        port = browser.runtime.connectNative(hostName);
        port.onMessage.addListener(onNativeMessage);
        port.onDisconnect.addListener(onDisconnect);
        console.log('Connect to message native with host : ' + hostName);
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var i;
            for (i = 0; i < tabs.length; i++) {
                let tabID = tabs[i].id;
                browser.tabs.sendMessage(tabID, {
                    action: 'CONNECTION_SUCCESSFUL',
                    data: true
                });
            }
        })
    }
}

function onNativeMessage(message) {
    console.log('Received message : ' + message);
    let messageObj;
    if (typeof message === 'string' || message instanceof String) {
        messageObj = JSON.parse(message);
    } else {
        messageObj = message;
    }
    /*if (messageObj.Type.indexOf("FAST_getSign") > -1
        && messageObj.Type.indexOf("Certificate") == -1
        && needToShowPopupInFront
        && messageObj.Message.RetourCODE == "0x0"
        && messageObj.Message.RetourComment.indexOf("annul") == -1) {
        needToShowPopupInFront = false;
        setTimeout(setNeedToShowPopupInFront, 300000);
    } */
    //refacto: DocumentID devra etre mis dans  messageObj.Message dans FastSignWebExtensionHost
    if (messageObj.DocumentID != null) messageObj.Message.DocumentID = messageObj.DocumentID;
    let windowID = messageObj.Message.TabID;
    let theTabID = messageObj.Message.WindowID;
    console.log("tabs for window " + windowID);
    /*if (windowID != null && theTabID != null) {
        browser.tabs.query({ windowId: parseInt(windowID) }, function (tabs) {
            console.log("-------- " + tabs.length);
            var i;
            for (i = 0; i < tabs.length; i++) {
                let tabID = tabs[i].id;
                if (tabID == theTabID) { }
                console.log("using tab: " + tabID);
                console.log("sending MESSAGE");
                browser.tabs.sendMessage(tabID, {
                    action: 'RECEIVED_NATIVE_MESSAGE',
                    type: messageObj.Type,
                    data: messageObj.Message,
                });
            }
        });
    }
    else {*/

        //TODOBro alternative ici
        browser.tabs.query({ url: "*://*/parapheur/*" }, function (tabs) {

            var i;
            for (i = 0; i < tabs.length; i++) {
                let tabID = tabs[i].id;
                console.log("using tab: " + tabID);
                console.log("sending MESSAGE");
                browser.tabs.sendMessage(tabID, {
                    action: 'RECEIVED_NATIVE_MESSAGE',
                    type: messageObj.Type,
                    data: messageObj.Message,
                });
            }
        });
    //}
}

function onDisconnect() {
    //var querying = browser.tabs.query({ url: "*://*/parapheur/*" }, function (tabs) {
    var querying = browser.tabs.query({ url: "*://*/parapheur/*" }, function (tabs) {
        console.log('nbtabs : ' + tabs.length);
        var i;
        for (i = 0; i < tabs.length; i++) {
            console.log('--id: ' + tabs[i].id);
        }
        if (tabs.length < 1) {
            console.log('Disconnect to message native with host : ' + hostName);
            port.disconnect();
            port = null;
        }
    });
   
}