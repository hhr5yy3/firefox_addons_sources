var backgroundConnection = null;

function generateUuid() {
    var date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = ((date + 16) * Math.random()).toFixed() % 16;
        if (c !== 'x') {
            /*jslint bitwise: true */
            r = r & 0x3 | 0x8;
            /*jslint bitwise: false */
        }
        return r.toString(16);
    });
}
var uuid = generateUuid();

document.addEventListener("AsperaConnectCheck", function(event) {
    connect();
    var manifestData = chrome.runtime.getManifest();
    if (!manifestData)
        return;
    window.postMessage({
       'type': 'AsperaConnectCheckResponse',
       'detail': {
            'extension_version': manifestData.version
        }
    }, '*');
});

// For now, we only want to connect when extension strategy is being used.
document.addEventListener("AsperaConnectRequest", function(event) {
    connect();
    if (event && event.detail) {
      var msg = event.detail;
      msg.type = "AsperaConnectRequest";
      msg.frame_id = uuid;
      chrome.runtime.sendMessage(msg);
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
   if (message.name == "AsperaConnectResponse") {
       if (uuid == message.frame_id) {
           // NOTE: Firefox cannot access details field of an event because cross process security
           //document.dispatchEvent(new CustomEvent('AsperaConnectResponse', { 'detail': message }));
           window.postMessage({ 'type': 'AsperaConnectResponse', 'detail': message }, message.sender.origin);
       }
   } else if (message.name == "AsperaConnectDisconnect") {
       backgroundConnection = null;
       document.dispatchEvent(new CustomEvent('AsperaConnectDisconnect', { 'detail': message.detail }));
   }
});

function connect() {
  if (!backgroundConnection) {
    backgroundConnection = chrome.runtime.connect({ name: uuid });
  }
}
