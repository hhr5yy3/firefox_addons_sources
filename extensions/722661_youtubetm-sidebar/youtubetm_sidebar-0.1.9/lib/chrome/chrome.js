var app = {};

app.parent = {};
app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};

app.tab = {
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})},
  "openOptions": function () {chrome.runtime.openOptionsPage(function () {})}
};

if (!navigator.webdriver) {
  chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});
  chrome.runtime.onInstalled.addListener(function (e) {
    chrome.management.getSelf(function (result) {
      if (result.installType === "normal") {
        window.setTimeout(function () {
          var previous = e.previousVersion !== undefined && e.previousVersion !== app.version();
          var doupdate = previous && parseInt((Date.now() - config.welcome.lastupdate) / (24 * 3600 * 1000)) > 45;
          if (e.reason === "install" || (e.reason === "update" && doupdate)) {
            var parameter = (e.previousVersion ? "&p=" + e.previousVersion : '') + "&type=" + e.reason;
            app.tab.open(app.homepage() + "?v=" + app.version() + parameter);
            config.welcome.lastupdate = Date.now();
          }
        }, 3000);
      }
    });
  });
}

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

app.sidebar = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "sidebar-to-background") {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"path": "background-to-sidebar", "method": id, "data": data});
    }
  }
})();

app.options = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "options-to-background") {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"path": "background-to-options", "method": id, "data": data});
    }
  }
})();

app.onBeforeRequest = function (callback) {
  var onBeforeRequest = function (e) {
    if (e.tabId > -1) return;
    /*  */
    var id = {}, type = e.type, current = e.url, initiator = e.initiator;
    if (current.indexOf("http") === 0) {
      id.a = e.tabId;
      id.b = e.tabId + '|' + e.frameId;
      if (type === "ping" || type === "main_frame" || type === "sub_frame") {
        app.parent[id.a] = current;
        app.parent[id.b] = current;
      }
      /*  */
      return callback(initiator, app.parent[id.a], app.parent[id.b], current);
    }
  }
  /*  */
  chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {"urls": ["http://*/*", "https://*/*"]}, ["blocking"]);
};

app.onBeforeSendHeaders = function (callback) {
  var onBeforeSendHeaders = function (e) {
    if (e.tabId > -1) return;
    /*  */
    var id = {}, type = e.type, current = e.url, initiator = e.initiator;
    if (current.indexOf("http") === 0) {
      id.a = e.tabId;
      id.b = e.tabId + '|' + e.frameId;
      if (type === "ping" || type === "main_frame" || type === "sub_frame") {
        app.parent[id.a] = current;
        app.parent[id.b] = current;
      }
      /*  */
      return callback(initiator, app.parent[id.a], app.parent[id.b], e.requestHeaders);
    }
  };
  /*  */
  chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, {"urls": ["http://*/*", "https://*/*"]}, ["blocking", "requestHeaders"]);
};

app.onHeadersReceived = function (callback) {
  var onHeadersReceived = function (e) {
    if (e.tabId > -1) return;
    /*  */
    var id = {}, type = e.type, current = e.url, initiator = e.initiator;
    if (current.indexOf("http") === 0) {
      id.a = e.tabId;
      id.b = e.tabId + '|' + e.frameId;
      if (type === "ping" || type === "main_frame" || type === "sub_frame") {
        app.parent[id.a] = current;
        app.parent[id.b] = current;
      }
      /*  */
      return callback(initiator, app.parent[id.a], app.parent[id.b], e.responseHeaders);
    }
  };
  /*  */
  var options = navigator.userAgent.indexOf("Firefox") !== -1 ? ["blocking", "responseHeaders"] : ["blocking", "responseHeaders", "extraHeaders"];
  chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, {"urls": ["http://*/*", "https://*/*"]}, options);
};
