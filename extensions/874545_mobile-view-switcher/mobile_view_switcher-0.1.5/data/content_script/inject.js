var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-page") {
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
        "path": "page-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "remove": {
    "script": function () {
      var script = document.getElementById("mobile-view-switcher");
      if (script) script.parentNode.removeChild(script);
    }
  }
};

background.receive("storage", function (data) {
  if (data.useragent) {
    config.remove.script();
    /*  */
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", "mobile-view-switcher");    
    script.textContent = 'navigator.__defineGetter__("userAgent", function () {return "' + data.useragent + '"})';
    document.documentElement.appendChild(script);
  }
});

config.remove.script();
background.send("load");
