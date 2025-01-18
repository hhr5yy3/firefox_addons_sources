var core = {};

core.loadReason = "startup";
core.homepage = "http://add0n.com/distraction-free.html";
core.name = function () {return chrome.runtime.getManifest().name};
core.version = function () {return chrome.runtime.getManifest().version};
core.tab = {"open": function (url) {chrome.tabs.create({"url": url, "active": true})}};
if (chrome.runtime.onInstalled) chrome.runtime.onInstalled.addListener(function (e) {core.loadReason = e.reason});
if (chrome.runtime.setUninstallURL) chrome.runtime.setUninstallURL("http://add0n.com/feedback.html?name=" + core.name() + '&version=' + core.version(), function () {});

core.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      document.getElementById("common").src = "../common.js";
    });
  }, 300);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      objs[id] = data;
      tmp[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

core.onBeforeRequest = function (callback) {
  var top = {};
  var beforeRequest = function (info) {
    var url = info.url, type = info.type, tab = info.tabId + '|' + info.frameId;
    if (type === 'main_frame' || type === 'sub_frame') top[tab] = url;
    return callback(top[tab], url);
  };
  /*  */
  chrome.webRequest.onBeforeRequest.addListener(beforeRequest, {"urls" : ["http://*/*", "https://*/*"]}, ["blocking"]);
};