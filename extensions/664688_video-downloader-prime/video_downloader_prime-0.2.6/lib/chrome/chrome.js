var app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};

app.button = {
  set icon (e) {chrome.browserAction.setIcon(e)},
  set label (e) {chrome.browserAction.setTitle({"title": e})},
  set badge (e) {chrome.browserAction.setBadgeText({"text": (e ? e : '') + ''})}
};

app.download = {
  "start": function (ext, filename, url) {
    chrome.downloads.download({
      "url": url, 
      "filename": filename
    });
  }
};

app.addon = (function () {
  var callbacks = {};
  return {
    "send": function (id, data) {(callbacks[id] || []).forEach(function (c) {c(data)})},
    "receive": function (id, callback) {
      callbacks[id] = callbacks[id] || [];
      callbacks[id].push(callback);
    }
  }
})();

app.webrequest = function (callback) {
  chrome.webRequest.onHeadersReceived.addListener(function (info) {
    var id = info.tabId;
    if (id > -1) {
      if (info.type === "main_frame") config.top[id] = info.url;
      if (config.top[id]) {
        return callback(config.top[id], info);
      }
    }
  }, {"urls" : ["*://*/*"]}, ["responseHeaders"]);
};

if (!navigator.webdriver) {
  chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});
  chrome.runtime.onInstalled.addListener(function (e) {
    chrome.management.getSelf(function (result) {
      if (result.installType === "normal") {
        window.setTimeout(function () {
          var previous = config.welcome.open && e.previousVersion !== undefined && e.previousVersion !== app.version();
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
    "write": function (id, data, callback) {
      var tmp = {};
      tmp[id] = data;
      objs[id] = data;
      chrome.storage.local.set(tmp, callback);
    }
  }
})();

app.popup = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "popup-to-background") {
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
        "path": "background-to-popup"
      }, function () {
        return chrome.runtime.lastError;
      });
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

app.request = {
  "body": function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {callback(e.target.responseText)};
    xhr.open("GET", url, true);
    xhr.send();
  },
  "head": function (url, callback) {
    var xhr = new XMLHttpRequest();
    /*  */
    xhr.onload = function (e) {
      var size, type, time, title, ext;
      try {time = e.target.getResponseHeader("X-Timestamp")} catch (e) {}
      try {type = e.target.getResponseHeader("Content-Type")} catch (e) {}
      try {size = e.target.getResponseHeader("Content-Length")} catch (e) {}
      try {title = e.target.getResponseHeader("Content-Disposition")} catch (e) {}
      /*  */
      if (size) {
        if (parseInt(size) > config.url.get.video.max.size) {
          var ext = config.url.get.video.ext(url, type);
          var size = config.url.get.video.size(size) || '?';
          var duration = config.url.get.video.duration(time);
          /*  */
          callback({
            "url": url, 
            "ext": ext,
            "size": size, 
            "title": title, 
            "duration": duration
          });
        } else callback(null);
      } else callback(null);
    };
    /*  */
    xhr.open("HEAD", url, true);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    /*  */
    xhr.send();
  }
};

app.tab = {
  "options": chrome.runtime.openOptionsPage,
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})},
  "removed": function (callback) {chrome.tabs.onRemoved.addListener(callback)},
  "active": function (callback) {
    chrome.tabs.query({"active": true}, function (tabs) {
      app.tab.checkURL(tabs[0], function (tab) {
        config.top[tab.id] = tab.url;
        callback(tab);
      });
    });
  },
  "updated": function (callback) {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (tab.status === "complete") {
        app.tab.checkURL(tab, function (tab) {
          config.top[tab.id] = tab.url;
          callback(tab);
        })
      }
    });
  },
  "activated": function (callback) {
    chrome.tabs.onActivated.addListener(function (activeInfo) {
      chrome.tabs.get(activeInfo.tabId, function (tab) {
        app.tab.checkURL(tab, function (tab) {
          config.top[tab.id] = tab.url;
          callback(tab);
        });
      });
    });
  },
  "checkURL": function (tab, callback) {
    if (tab.url) callback(tab);
    else {
      chrome.tabs.executeScript(tab.id, {
        "runAt": "document_start",
        "code": "document.location.href"
      }, function (result) {
        var error = chrome.runtime.lastError;
        if (result && result.length) {
          tab.url = result[0];
        }
        /*  */
        callback(tab);
      });
    }
  },
  "title": function (tabId, callback) {
    chrome.tabs.get(tabId, function (tab) {
      var lastError = chrome.runtime.lastError;
      if (tab.title) callback(tab.title);
      else {
        chrome.tabs.executeScript(tab.id, {
          "runAt": "document_start",
          "code": "document.title"
        }, function (result) {
          var error = chrome.runtime.lastError;
          if (result && result.length) {
            tab.title = result[0];
          }
          /*  */
          callback(tab.title);
        });
      }
    });
  }
};