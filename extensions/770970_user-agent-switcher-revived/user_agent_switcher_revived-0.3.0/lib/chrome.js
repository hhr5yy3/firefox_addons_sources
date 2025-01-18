var app = {};

app.hotkey = {
  "on": {
    "pressed": function (callback) {
      chrome.commands.onCommand.addListener(function (e) {
        if (e) {
          if (callback) {
            callback(e);
          }
        }
      });
    }
  }
};

app.popup = {
  "message": {},
  "receive": function (id, callback) {
    app.popup.message[id] = callback;
  },
  "send": function (id, data) {
    chrome.runtime.sendMessage({
      "data": data,
      "method": id,
      "path": "background-to-popup"
    }, function () {
      return chrome.runtime.lastError;
    });
  }
};

app.button = {
  "icon": function (tabId, path, callback) {
    if (path && typeof path === "object") {
      var options = {"path": path};
      if (tabId) options["tabId"] = tabId;
      chrome.browserAction.setIcon(options, function (e) {
        if (callback) callback(e);
      });
    } else {
      var options = {};
      if (path) {
        options = {
          "path": {
            "16": "../data/popup/icons/16/" + path + ".png",
            "32": "../data/popup/icons/32/" + path + ".png"
          }
        };
      } else {
        options = {
          "path": {
            "16": "../data/icons/16.png",
            "32": "../data/icons/32.png",
            "48": "../data/icons/48.png",
            "64": "../data/icons/64.png"
          }
        };
      }
      /*  */
      if (tabId) options["tabId"] = tabId;
      chrome.browserAction.setIcon(options, function (e) {
        if (callback) callback(e);
      }); 
    }
  }
};

app.page = {
  "message": {},
  "receive": function (id, callback) {
    app.page.message[id] = callback;
  },
  "send": function (id, data, tabId, frameId) {
    chrome.tabs.query({}, function (tabs) {
      var tmp = chrome.runtime.lastError;
      if (tabs && tabs.length) {
        var options = {
          "method": id, 
          "data": data,
          "path": "background-to-page"
        };
        /*  */
        tabs.forEach(function (tab) {
          if (tab) {
            if (tabId !== null) {
              if (tabId === tab.id) {
                if (frameId !== null) {
                  chrome.tabs.sendMessage(tab.id, options, {"frameId": frameId}, function () {
                    return chrome.runtime.lastError;
                  });
                } else {
                  chrome.tabs.sendMessage(tab.id, options, function () {
                    return chrome.runtime.lastError;
                  });
                }
              }
            } else {
              chrome.tabs.sendMessage(tab.id, options, function () {
                return chrome.runtime.lastError;
              });
            }
          }
        });
      }
    });
  }
};

app.on = {
  "management": function (callback) {
    chrome.management.getSelf(callback);
  },
  "uninstalled": function (url) {
    chrome.runtime.setUninstallURL(url, function () {});
  },
  "installed": function (callback) {
    chrome.runtime.onInstalled.addListener(function (e) {
      app.storage.load(function () {
        callback(e);
      });
    });
  },
  "startup": function (callback) {
    chrome.runtime.onStartup.addListener(function (e) {
      app.storage.load(function () {
        callback(e);
      });
    });
  },
  "message": function (callback) {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      app.storage.load(function () {
        callback(request, sender, sendResponse);
      });
      /*  */
      return true;
    });
  }
};

app.storage = (function () {
  chrome.storage.onChanged.addListener(function () {
    chrome.storage.local.get(null, function (e) {
      app.storage.local = e;
      if (app.storage.callback) {
        if (typeof app.storage.callback === "function") {
          app.storage.callback(true);
        }
      }
    });
  });
  /*  */
  return {
    "local": {},
    "callback": null,
    "read": function (id) {
      return app.storage.local[id];
    },
    "clear": function (callback) {
      chrome.storage.local.clear(function () {
        if (callback) {
          callback();
        }
      });
    },
    "on": {
      "changed": function (callback) {
        if (callback) {
          app.storage.callback = callback;
        }
      }
    },
    "write": function (id, data, callback) {
      var tmp = {};
      tmp[id] = data;
      app.storage.local[id] = data;
      chrome.storage.local.set(tmp, function (e) {
        if (callback) callback(e);
      });
    },
    "load": function (callback) {
      var keys = Object.keys(app.storage.local);
      if (keys && keys.length) {
        if (callback) callback("cache");
      } else {
        chrome.storage.local.get(null, function (e) {
          app.storage.local = e;
          if (callback) callback("disk");
        });
      }
    }
  }
})();

app.tab = {
  "reload": function (tab, bypassCache) {
    chrome.tabs.query({"active": true, "currentWindow": true}, function (tabs) {
      var tmp = chrome.runtime.lastError;
      if (tabs && tabs.length) {
        chrome.tabs.reload(tab ? tab.id : tabs[0].id, {
          "bypassCache": bypassCache !== undefined ? bypassCache : false
        }, function () {});
      }
    });
  },
  "open": function (url, index, active, callback) {
    var properties = {
      "url": url, 
      "active": active !== undefined ? active : true
    };
    /*  */
    if (index !== undefined) {
      if (typeof index === "number") {
        properties.index = index + 1;
      }
    }
    /*  */
    chrome.tabs.create(properties, function (tab) {
      if (callback) callback(tab);
    }); 
  },
  "query": {
    "active": function (callback) {
      chrome.tabs.query({"active": true, "currentWindow": true}, function (tabs) {
        var tmp = chrome.runtime.lastError;
        if (tabs && tabs.length) {
          callback(tabs[0]);
        } else callback(undefined);
      });
    },
    "index": function (callback) {
      chrome.tabs.query({"active": true, "currentWindow": true}, function (tabs) {
        var tmp = chrome.runtime.lastError;
        if (tabs && tabs.length) {
          callback(tabs[0].index);
        } else callback(undefined);
      });
    }
  }
};