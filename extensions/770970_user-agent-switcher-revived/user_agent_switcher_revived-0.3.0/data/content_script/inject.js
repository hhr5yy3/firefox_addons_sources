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
        "data": data,
        "method": id, 
        "path": "page-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "script": {
    "id": "useragent-switcher-helper-script"
  },
  "domain": {
    "extract": function (url) {
      url = url.replace("www.", '').trim();
      /*  */
      var s = url.indexOf("//") + 2;
      if (s > 1) {
        var o = url.indexOf('/', s);
        if (o > 0) return url.substring(s, o);
        else {
          o = url.indexOf('?', s);
          if (o > 0) return url.substring(s, o);
          else return url.substring(s);
        }
      } else return url;
    },
    "is": {
      "valid": function (top, domains) {
        if (!top) return true;
        /*  */
        top = config.domain.extract(top);
        /*  */
        if (domains.indexOf('*') !== -1) return true;
        if (domains.indexOf("all_urls") !== -1) return true;
        /*  */
        for (var i = 0; i < domains.length; i++) {
          var domain = domains[i];
          if (domain === top) {
            return true;
          } else if (top.indexOf(domain) !== -1) {
            return true;
          }
        }
        /*  */
        return false;
      }
    }
  }
};

background.receive("storage", function (e) {
  var top = e.top;
  var useragent = e.useragent;
  var domains = e.url.replace(/\s+/g, '').split(',');
  /*  */
  if (useragent) { 
    if (config.domain.is.valid(top, domains)) {
      var script = document.getElementById(config.script.id);
      /*  */
      if (!script) {
        script = document.createElement("script");
        /*  */
        script.type = "text/javascript";
        script.setAttribute("id", config.script.id);
        script.onload = function () {script.remove()};
        script.textContent = 'navigator.__defineGetter__("userAgent", function () {return "' + useragent + '"})';
        /*  */
        document.documentElement.appendChild(script);
      }
    }
  }
});

var script = document.getElementById(config.script.id);
if (script) script.remove();

background.send("load");