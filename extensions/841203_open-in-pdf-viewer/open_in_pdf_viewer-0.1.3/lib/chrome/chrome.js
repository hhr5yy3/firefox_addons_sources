var app = {};

app.name = function () {return chrome.runtime.getManifest().name};
app.version = function () {return chrome.runtime.getManifest().version};
app.short_name = function () {return chrome.runtime.getManifest().short_name};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
app.tab = {"open": function (url) {chrome.tabs.create({"url": url, "active": true})}};

app.downloads = {
  "clear": function (e, callback) {chrome.downloads.erase(e, callback)},
  "search": function (e, callback) {chrome.downloads.search(e, callback)},
  "download": function (e, callback) {chrome.downloads.download(e, callback)},
  "changed": function (callback) {chrome.downloads.onChanged.addListener(callback)}
};

if (!navigator.webdriver) {
  chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall");
  chrome.runtime.onInstalled.addListener(function (e) {
    chrome.management.getSelf(function (result) {
      if (result.installType === "normal") {
        if (e.reason === "install" || e.reason === "update") {
          var parameter = (e.previousVersion ? "&p=" + e.previousVersion : '') + "&type=" + e.reason;
          app.tab.open(app.homepage() + "?v=" + app.version() + parameter);
        }
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
      /*  */
      chrome.runtime.getPlatformInfo(function (e) {
        config.browser.default = config.platform[e.os];
        config.browser.args = config.browser.args || config.args[e.os];
      });
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      objs[id] = data;
      chrome.storage.local.set(tmp);
    }
  }
})();

app.notifications = (function () {
  chrome.notifications.onClicked.addListener(function () {app.tab.open(app.homepage() + "#faq")});
  /*  */
  return {
    "create": function (message) {
      chrome.notifications.create({
        "type": "basic",
        "message": message,
        "title": app.name(),
        "iconUrl": chrome.runtime.getURL("data/icons/64.png")
      }, function () {});
    }
  }
})();

app.context_menu = {
  "create": function (title, contexts, callback) {
    chrome.contextMenus.create({
      "title": title,
      "contexts": contexts,
      "id": app.short_name() + "_id",
      "onclick": function (e) {
        callback(e.linkUrl || e.pageUrl || e.srcUrl || null);
      }
    });
  }
};

app.nativeClient = {
  "postMessage": function (args, callback) {
    chrome.runtime.sendNativeMessage('com.mybrowseraddon.node', {
      "args": args,
      "permissions": ['child_process'],
      "script": `
        var stdout = '', stderr = '';
        var app = require('child_process').spawn(args[0], args.slice(1), {detached: true});
        app.stdout.on('data', function (data) {stdout += data});
        app.stderr.on('data', function (data) {stderr += data});
        app.on('close', function (code) {
          push({code, stdout, stderr});
          close();
        });
      `
    }, callback);
  }
};

app.options = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
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
    "send": function (id, data) {
      chrome.runtime.sendMessage({"path": 'background-to-options', "method": id, "data": data});
    }
  }
})();
