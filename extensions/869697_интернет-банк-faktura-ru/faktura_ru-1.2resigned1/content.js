console.log("sksjContent: start");

var sksjBackgroundPort = chrome.runtime.connect({name:"sksjContent"});
sksjBackgroundPort.onMessage.addListener(function(message) {
  window.postMessage(message, "*");
});

window.addEventListener("message", function(event) {
  if (event.source == window && event.data.type && event.data.type == "SKSJ_REQUEST") {
    sksjBackgroundPort.postMessage(event.data);
  }
}, false);

console.log("sksjContent: initialized");
