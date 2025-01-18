app.webrequest = {
  "on": {
    "before": {
      "send": {
        "headers": {
          "listener": null,
          "callback": function (callback) {
            app.webrequest.on.before.send.headers.listener = callback;
          },
          "remove": function () {
            if (chrome.webRequest) {
              chrome.webRequest.onBeforeSendHeaders.removeListener(app.webrequest.on.before.send.headers.listener);
            }
          },
          "add": function (e) {
            var filter = e ? e : {"urls": ["*://*/*"]};
            var options = ["blocking", "requestHeaders"];
            /*  */
            if (chrome.webRequest) {
              chrome.webRequest.onBeforeSendHeaders.removeListener(app.webrequest.on.before.send.headers.listener);
              chrome.webRequest.onBeforeSendHeaders.addListener(app.webrequest.on.before.send.headers.listener, filter, options);
            }
          }
        }
      }
    }
  }
};