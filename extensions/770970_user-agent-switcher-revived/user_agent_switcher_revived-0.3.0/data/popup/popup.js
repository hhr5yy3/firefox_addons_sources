var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-popup") {
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
        "path": "popup-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "status": {
    "text": ''
  },
  "clean": {
    "table": function (table) {
      var tds = [...table.getElementsByTagName("td")];
      if (tds && tds.length) {
        for (var i = 0; i < tds.length; i++) {
          tds[i].removeAttribute("type");
        }
      }
    }
  },
  "useragent": {
    "key": [],
    "string": '',
    "url": "all_urls",
    "sanitize": function (e) {
      e = e ? e.replace(/[^a-z0-9 áéíóúñü\(\)\.\,\_\-\;\:\/]/gim, '') : '';
      return e.trim();
    }
  },
  "information": {
    "reset": function () {
      document.getElementById("status-td").textContent = config.status.text;
    },
    "update": function (e) {
      var title = e.target.getAttribute("title");
      document.getElementById("status-td").textContent = title || config.status.text;
    },
    "listener": function () {
      var tds = [...document.querySelectorAll("td")];
      if (tds && tds.length) {
        for (var i = 0; i < tds.length; i++) {
          tds[i].addEventListener("mouseleave", config.information.reset, false);
          tds[i].addEventListener("mouseenter", config.information.update, false);
        }
      }
    }
  },
  "load": function () {
    document.getElementById("mobile-browsers").addEventListener("click", config.handle.click, false);
    document.getElementById("desktop-browsers").addEventListener("click", config.handle.click, false);
    document.getElementById("operating-systems").addEventListener("click", config.handle.click, false);
    /*  */
    document.getElementById("faq").addEventListener("click", function () {background.send("faq")}, false);
    document.getElementById("bug").addEventListener("click", function () {background.send("bug")}, false);
    document.getElementById("check").addEventListener("click", function () {background.send("check")}, false);
    document.getElementById("reload").addEventListener("click", function () {background.send("reload")}, false);
    document.getElementById("donation").addEventListener("click", function () {background.send("donation")}, false);
    /*  */
    document.getElementById("default").addEventListener("click", function (e) {
      //var action = window.confirm("Are you sure you want to switch to the default useragent?");
      config.handle.click(e);
    }, false);
    /*  */
    document.getElementById("url").addEventListener("change", function (e) {
      config.useragent.url = e.target.value || "all_urls";
      background.send("useragent-url", config.useragent.url);
      e.target.value = config.useragent.url;
    }, false);
    /*  */
    document.getElementById("copy").addEventListener("click", function () {
      var oldua = config.useragent.string;
      var newua = window.prompt("Edit this useragent string or copy the string to the clipboard (Ctrl+C+Enter)", config.useragent.string);
      /*  */
      if (newua && newua !== oldua) {
        var sanitized = config.useragent.sanitize(newua);
        /*  */
        background.send("update-useragent-string", {
          "UA": sanitized, 
          "key": config.useragent.key
        });
      }
    }, false);
    /*  */
    background.send("load");
    config.information.listener();
    window.removeEventListener("load", config.load, false);
  },
  "handle": {
    "click": function (e) {
      if (e) {
        if (e.target) {
          var current = {};
          /*  */
          current.ua = [];
          current.target = e.target;
          current.id = current.target.getAttribute("id");
          current.table = current.target.closest("table");
          current.category = current.table.getAttribute("id");
          current.tds = [...document.getElementsByTagName("td")];
          /*  */
          var mobilebrowsers = document.getElementById("mobile-browsers");
          var desktopbrowsers = document.getElementById("desktop-browsers");
          var operatingsystems = document.getElementById("operating-systems");
          /*  */
          if (current.table) {
            config.clean.table(current.table);
            /*  */
            if (current.category === "mobile-browsers") {
              config.clean.table(desktopbrowsers);
              config.clean.table(operatingsystems);
            } else {
              config.clean.table(mobilebrowsers);
            }
            /*  */
            if (current.id) {
              if (current.id === "default") {
                current.ua = ['', '', "default"];
                /*  */
                config.clean.table(mobilebrowsers);
                config.clean.table(desktopbrowsers);
                config.clean.table(operatingsystems);
              } else {
                current.target.setAttribute("type", "selected");
              }
            }
            /*  */
            if (current.tds && current.tds.length) {
              for (var i = 0; i < current.tds.length; i++) {
                var type = current.tds[i].getAttribute("type");
                if (type) {
                  if (type === "selected") {
                    var id = current.tds[i].getAttribute("id");
                    if (id) current.ua.push(id);
                  }
                }
              }
            }
            /*  */
            if (current.ua.length === 1) {
              if (current.category === "desktop-browsers") {
                current.ua.push("windowsd"); /* add windows as a default OS */
                document.getElementById("windowsd").setAttribute("type", "selected");
              }
              if (current.category === "operating-systems") {
                current.ua.unshift("chrome"); /* add chrome as a default browser */
                document.getElementById("chrome").setAttribute("type", "selected");
              }
            }
          }
          /*  */
          if (current.ua.length) {
            config.interface.update(current.ua);
          }
        }
      }
    }
  },
  "interface": {
    "init": function (e) {
      if (e.key[2] && e.key[2] === "default") {
        config.interface.render(e, "UserAgent: Default", false);
      } else if (e.string) {
        config.useragent.key = e.key;
        config.useragent.string = e.string;
        /*  */
        config.interface.render(e, e.text, true);
      } else {
        config.interface.render(e, "UserAgent: Not Available", false);
      }
    },
    "update": function (e) {
      if (e.length === 2) {
        var title_1 = document.getElementById(e[0]).getAttribute("title") || "N/A";
        var title_2 = document.getElementById(e[1]).getAttribute("title") || "N/A";
        config.status.text = "UserAgent: " + title_1 + " on " + title_2;
      }
      /*  */
      if (e.length === 1) {
        config.status.text = "UserAgent: " + document.getElementById(e[0]).getAttribute("title");
      } else if (e[3] === "default") {
        config.status.text = "UserAgent: Default";
      }
      /*  */
      document.getElementById("status-td").textContent = config.status.text;
      /*  */
      background.send("status-td-text", config.status.text);
      background.send("useragent-id", {
        "id": e, 
        "url": config.useragent.url
      });
    },
    "render": function (e, txt, flag) {
      config.status.text = txt;
      /*  */
      var mobilebrowsers = document.getElementById("mobile-browsers");
      var desktopbrowsers = document.getElementById("desktop-browsers");
      var operatingsystems = document.getElementById("operating-systems");
      /*  */
      config.clean.table(mobilebrowsers);
      config.clean.table(desktopbrowsers);
      config.clean.table(operatingsystems);
      /*  */
      if (e.key[0]) {
        var elm1 = document.getElementById(e.key[0]);
        if (flag && elm1) {
          elm1.setAttribute("type", "selected");
        } else if (elm1) {
          elm1.removeAttribute("type");
        }
      }
      /*  */
      if (e.key[1]) {
        var elm2 = document.getElementById(e.key[1]);
        if (flag && elm2) {
          elm2.setAttribute("type", "selected");
        } else if (elm2) {
          elm2.removeAttribute("type");
        }
      }
      /*  */
      config.useragent.url = e.url;
      document.getElementById("url").value = e.url;
      document.getElementById("status-td").textContent = config.status.text;
    }
  }
};

window.addEventListener("load", config.load, false);
background.receive("storage", config.interface.init);