var app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};

app.Hotkey = function (callback) {
  chrome.commands.onCommand.addListener(function (e) {
    if (e === "toggle-default-mode") {
      callback("_mode");
    }
  });
};

app.tab = {
  "update": function (tabId, url) {chrome.tabs.update(tabId, {"url": url})},
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})},
  "reload": function (tabId) {
    chrome.tabs.reload(tabId, {
      "bypassCache": config.bypass.cache
    });
  },
  "active": function (callback) {
    chrome.tabs.query({"currentWindow": true, "active": true}, function (tabs) {
      if (tabs && tabs.length) {
        app.tab.checkURL(tabs[0], function (tab) {
          if (tab && tab.url) {
            callback(tab);
          }
        });
      }
    });
  },
  "checkURL": function (tab, callback) {
    if (tab.url) callback(tab);
    else {
      chrome.tabs.executeScript(tab.id, {"code": "document.location.href"}, function (result) {
        var error = chrome.runtime.lastError;
        if (result && result.length) {
          tab.url = result[0];
        }
        /*  */
        callback(tab);
      });
    }
  }
};

if (!navigator.webdriver) {
  chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});
  chrome.runtime.onInstalled.addListener(function (e) {
    chrome.management.getSelf(function (result) {
      if (result.installType === "normal") {
        var previous = e.previousVersion !== undefined && e.previousVersion !== app.version();
        var doupdate = previous && parseInt((Date.now() - config.welcome.lastupdate) / (24 * 3600 * 1000)) > 45;
        if (e.reason === "install" || (e.reason === "update" && doupdate)) {
          var parameter = (e.previousVersion ? "&p=" + e.previousVersion : '') + "&type=" + e.reason;
          app.tab.open(app.homepage() + "?v=" + app.version() + parameter);
          config.welcome.lastupdate = Date.now();
        }
      }
    });
  });
}

app.webrequest = function (callback) {
  var listener = function (info) {return callback(info.requestHeaders)};
  chrome.webRequest.onBeforeSendHeaders.addListener(listener, {
    "urls": ["*://*/*"]
  }, ["blocking", "requestHeaders"]);
};

app.button = {
  "click": function (callback) {chrome.browserAction.onClicked.addListener(callback)},
  "badge": function (state) {
    chrome.browserAction.setIcon({
      "path": {
        "16": "../../data/icons" + (state ? "/" + state : '') + "/16.png",
        "32": "../../data/icons" + (state ? "/" + state : '') + "/32.png",
        "48": "../../data/icons" + (state ? "/" + state : '') + "/48.png",
        "64": "../../data/icons" + (state ? "/" + state : '') + "/64.png"
      }
    });
  }
};

app.contextmenu = (function () {
  var clicked;
  chrome.contextMenus.onClicked.addListener(function (e) {if (clicked) clicked(e)});
  /*  */
  return {
    "clicked": function (e) {clicked = e},
    "create": function () {
      chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create({
          "title": "What is my UserAgent?",
          "contexts": ["browser_action"]
        });
      });
    }
  };
})();

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 0);
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

app.options = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
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
    "send": function (id, data) {
      chrome.runtime.sendMessage({
        "method": id, 
        "data": data,
        "path": "background-to-options"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

app.content_script = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "page-to-background") {
          if (request.method === id) {
            var a = request.data || {};
            if (sender.tab) {
              a["tabId"] = sender.tab.id;
            }
            tmp[id](a);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (!tabId || (tabId && tab.id === tabId)) {
            var a = data || {};
            a["tabId"] = tab.id;
            chrome.tabs.sendMessage(tab.id, {
              "data": a,
              "method": id, 
              "path": "background-to-page"
            }, function () {
              return chrome.runtime.lastError;
            });
          }
        });
      });
    }
  }
})();