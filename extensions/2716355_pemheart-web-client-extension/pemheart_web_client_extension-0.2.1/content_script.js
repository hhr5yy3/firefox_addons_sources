var port = null;

window.addEventListener("PassToPemheart", function (evt) {
    if (port == null) {
        startWebClient();
    }
    port.postMessage(evt.detail);
}, false);

function onExtMessage(msg) {
    var str = { detail: JSON.stringify(msg) };
    var event = new CustomEvent("PemheartResponse", str);
    window.dispatchEvent(event);
}

function onExtDisconnect() {
    alert("PemHeart Native Application has exited.");
    port = null;
}

function quitPort() {
    if (port != null) {
        port.disconnect();
        port = null;
    }
}

function startWebClient() {
    quitPort();
    port = chrome.runtime.connect();
    port.onMessage.addListener(onExtMessage);
    port.onDisconnect.addListener(onExtDisconnect);
}

console.log("Content script has been injected.");
