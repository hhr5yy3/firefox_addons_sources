const detectorElement = document.getElementById("filestage-extension-detector");

function init() {
  if (detectorElement) {
    detectorElement.content = "extension-installed";
    detectorElement.setAttribute(
      "version",
      chrome.runtime.getManifest().version
    );

    chrome.runtime.sendMessage({
      type: "filestage-viewer-detected",
    });
    window.addEventListener("message", onWindowMessage);
  }
}

function onWindowMessage(event) {
  if (
    event.source == window &&
    event.data?.type == "filestage-capture-screenshot-request"
  ) {
    chrome.runtime.sendMessage(
      {
        type: "filestage-capture-screenshot",
        iFrameBoundingRect: event.data.iFrameBoundingRect,
        devicePixelRatio: event.data.devicePixelRatio,
      },
      postMessageFromExtension
    );
  }
}

function postMessageFromExtension(message) {
  if (detectorElement) {
    window.postMessage(message, "*");
  }
}

chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
  if (message.type == "filestage-extension-switch-tab") {
    window.postMessage({ type: "filestage-extension-switch-tab" }, "*");
  }
});

init();
