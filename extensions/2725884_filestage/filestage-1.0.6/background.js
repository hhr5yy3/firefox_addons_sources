const FSTGAppTabIds = {};
const onHeadersReceivedListenerFilters = { urls: ["<all_urls>"] };
const onHeadersReceivedExtraInfoSpec = [
  chrome.webRequest.OnHeadersReceivedOptions.BLOCKING,
  chrome.webRequest.OnHeadersReceivedOptions.RESPONSE_HEADERS ||
    chrome.webRequest.OnHeadersReceivedOptions.RESPONSEHEADERS,
  chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS,
].filter(Boolean);
const headersBlacklist = [
  "x-frame-options",
  "feature-policy",
  "content-security-policy",
  "content-security-policy-report-only",
];

const isRequestFromFilestageApp = (tabId, frameId) =>
  FSTGAppTabIds[tabId] && frameId !== 0;
const shouldSelectHeader = (header) =>
  !headersBlacklist.includes(header.name.toLowerCase());

function onHeadersReceived(event) {
  if (isRequestFromFilestageApp(event.tabId, event.frameId)) {
    event.responseHeaders.forEach((header) => {
      if (header.name.toLowerCase() === "set-cookie") {
        header.value = header.value + "; SameSite=None; Secure";
      }
    });
    return {
      responseHeaders: [
        ...event.responseHeaders.filter(shouldSelectHeader),
        { name: "FilestageProxy", value: "true" },
      ],
    };
  }
}

function captureScreenshotEventHandler(message, sender, sendResponse) {
  chrome.tabs.captureVisibleTab(
    null,
    {
      format: "png",
    },
    (screenshotDataURI) => {
      const iFrameBoundingRect = message.iFrameBoundingRect;
      const devicePixelRatio = message.devicePixelRatio;

      const canvas = document.createElement("canvas");
      canvas.width = iFrameBoundingRect.width * devicePixelRatio;
      canvas.height = iFrameBoundingRect.height * devicePixelRatio;

      const context = canvas.getContext("2d");
      context.scale(devicePixelRatio, devicePixelRatio);

      canvas.style.width = iFrameBoundingRect.width + "px";
      canvas.style.height = iFrameBoundingRect.height + "px";

      const screenshotImage = new Image();
      screenshotImage.onload = function () {
        context.drawImage(
          screenshotImage,
          iFrameBoundingRect.x * devicePixelRatio,
          iFrameBoundingRect.y * devicePixelRatio,
          iFrameBoundingRect.width * devicePixelRatio,
          iFrameBoundingRect.height * devicePixelRatio,
          0,
          0,
          iFrameBoundingRect.width,
          iFrameBoundingRect.height
        );
        sendResponse({
          type: "filestage-screenshot-response",
          screenshotURI: canvas.toDataURL(),
        });
      };
      screenshotImage.src = screenshotDataURI;
    }
  );
}

function viewerDetectedEventHandler(message, sender) {
  FSTGAppTabIds[sender.tab.id] = true;
}

function onMessageReceived(message, sender, sendResponse) {
  switch (message.type) {
    case "filestage-viewer-detected":
      viewerDetectedEventHandler(message, sender);
      return;
    case "filestage-capture-screenshot":
      captureScreenshotEventHandler(message, sender, sendResponse);
      // Function should return true in order to wait for the asynchronous event
      // Ref: https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
      return true;
    default:
      return;
  }
}

function init() {
  chrome.runtime.onMessage.addListener(onMessageReceived);
  chrome.webRequest?.onHeadersReceived.addListener(
    onHeadersReceived,
    onHeadersReceivedListenerFilters,
    onHeadersReceivedExtraInfoSpec
  );
  chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "filestage-extension-switch-tab",
      });
    });
  });
}

init();
