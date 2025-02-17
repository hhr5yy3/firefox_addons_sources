var app = {};

app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
app.tab = {"open": function (url) {chrome.tabs.create({"url": url, "active": true})}};

if (!navigator.webdriver) {
  chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});
  chrome.runtime.onInstalled.addListener(function (e) {
    chrome.management.getSelf(function (result) {
      if (result.installType === "normal") {
        var previous = config.welcome.open && e.previousVersion !== undefined && e.previousVersion !== app.version();
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

app.addon = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method === "crossorigin") {
      fetch(request.data.href, {"method": "GET"}).then(r => r.text()).then(sendResponse);
    } else {
      for (var id in tmp) {
        if (tmp[id] && (typeof tmp[id] === "function")) {
          if (request.method === id) {
            var a = request.data || {};
            if (sender.tab) a["tabId"] = sender.tab.id;
            tmp[id](a);
          }
        }
      }
    }
    /*  */
    return true;
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"method": id, "data": data});
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (!tabId || (tabId && tab.id === tabId)) {
            var a = data || {};
            a["tabId"] = tab.id;
            chrome.tabs.sendMessage(tab.id, {"method": id, "data": a});
          }
        });
      });
    }
  }
})();