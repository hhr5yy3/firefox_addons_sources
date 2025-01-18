var portNative = null;
var portWeb = null;

function onNativeMessage(message) {
    console.log("Received message from native");
    sendWebMsg(message);
}

function onNativeDisconnect() {
    console.log("Native host disconnected");
    quitWeb();
    portNative = null;
}

function startNative() {
    console.log("starting native host");
    var nativeHostName = "com.pl.enigma.pemwebclient";
    quitNative();
    portNative = chrome.runtime.connectNative(nativeHostName);
    portNative.onDisconnect.addListener(onNativeDisconnect);
    portNative.onMessage.addListener(onNativeMessage);
}

function quitNative() {
    if (portNative != null) {
        var quitMsg = { "operation": "quit" };
        sendNativeMsg(quitMsg);
        portNative.disconnect();
        portNative = null;
    }
}

function sendNativeMsg(message) {
    console.log("Sending message to native");
    if (portNative == null) {
        console.log("Native host is not running.");
        var msg = { "error": true, "message": "Native application is not running" };
        sendWebMsg(msg);
    } else {
        portNative.postMessage(message);
    }
}

function quitWeb() {
    if (portWeb != null) {
        portWeb.disconnect();
        portWeb = null;
    }
}

function onWebMessage(message) {
    console.log("Received message from web");
    sendNativeMsg(message);
}

function onWebDisconnect() {
    console.log("Web page disconnected");
    quitNative();
    portWeb = null;
}

function sendWebMsg(message) {
    console.log("sending message to web");
    portWeb.postMessage(message);
}


function onWebConnect(port) {
    console.log("Attempt to make connection");
    quitWeb();
    portWeb = port;
    portWeb.onMessage.addListener(onWebMessage);
    portWeb.onDisconnect.addListener(onWebDisconnect);
    startNative();
}

chrome.runtime.onConnect.addListener(onWebConnect);
