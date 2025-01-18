var app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});

app.tab = {
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})},
  "openOptions": function () {chrome.runtime.openOptionsPage(function () {})},
};

chrome.runtime.onInstalled.addListener(function (e) {
  window.setTimeout(function () {
    if (e.reason === "install" || e.reason === "update") {
      if (e.previousVersion !== app.version()) {
        var parameter = (e.previousVersion ? "&p=" + e.previousVersion : '') + "&type=" + e.reason;
        app.tab.open(app.homepage() + "?v=" + app.version() + parameter);
      }
    }
  }, 3000);
});

app.context_menu = {
  "create": function (title, callback) {
    chrome.contextMenus.create({
      "title": title,
      "contexts": ["page"],
      "onclick": function (o) {callback(o.pageUrl)}
    });
  }
};

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      objs[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

(function () {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (sender.tab) return;
    /*  */
    if (request.path === 'page-to-background') {
      if (request.method === "load") sendResponse("load");
    }
  });
})();

app.popup = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === 'popup-to-background') {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data) {
      chrome.runtime.sendMessage({"path": 'background-to-popup', "method": id, "data": data});
    }
  }
})();

app.options = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === 'options-to-background') {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"path": 'background-to-options', "method": id, "data": data});
    }
  }
})();

var URLS = ["*://*.gstatic.com/*", "*://gstatic.com/*", "*://translate.google.com/*", "*://*.translate.google.com/*"];
var UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1";

chrome.webRequest.onBeforeSendHeaders.addListener(function (info) {
  if (info.tabId > -1) return;
  /*  */
  var headers = info.requestHeaders;
  for (var i = 0; i < headers.length; i++) {
    var name = headers[i].name.toLowerCase();
    if (name === "user-agent") {
      headers[i].value = UA;
      return {"requestHeaders": headers};
    }
  }
}, {"urls": URLS}, ["blocking", "requestHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(function (info) {
  if (info.tabId > -1) return;
  /*  */
  for (var i = 0; i < info.responseHeaders.length; ++i) {
    var name = info.responseHeaders[i].name.toLowerCase();
    if (name === "x-frame-options" || name === "frame-options") {
      info.responseHeaders.splice(i, 1);
      return {"responseHeaders": info.responseHeaders};
    }
  }
}, {"urls": URLS}, ["blocking", "responseHeaders"]);
