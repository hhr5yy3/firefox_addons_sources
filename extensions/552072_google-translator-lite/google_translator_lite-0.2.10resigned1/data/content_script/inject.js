var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === 'background-to-popup') {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'popup-to-background', "method": id, "data": data})}
  }
})();

var listener = function (e) {
  background.send("open-page", {
    "href": document.location.href,
    "type": e.target.getAttribute("type")
  });
};

var contentloaded = function () {
  document.removeEventListener("DOMContentLoaded", contentloaded, false);
  /*  */
  chrome.runtime.sendMessage({"path": 'page-to-background', "method": "load"}, function (action) {
    if (action === "load") {
      var link = document.createElement("link");
      link.setAttribute("type", "text/css");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", chrome.runtime.getURL("data/content_script/inject.css"));
      document.head.appendChild(link);
      /*  */
      var buttons = [...document.querySelectorAll("div[type*='GTL-button-']")];
      buttons.map(function (e) {e.parentNode.removeChild(e)});
      {
        var settings = document.createElement("div");
        settings.setAttribute("type", "GTL-button-settings");
        settings.setAttribute("class", "ft-icon-txt");
        settings.textContent = "Open Settings Page";
        settings.addEventListener("click", listener);
        document.body.appendChild(settings);
      }
      {
        var support = document.createElement("div");
        support.setAttribute("type", "GTL-button-support");
        support.setAttribute("class", "ft-icon-txt");
        support.textContent = "Open Support Page";
        support.addEventListener("click", listener);
        document.body.appendChild(support);
      }
      {
        var home = document.createElement("div");
        home.setAttribute("type", "GTL-button-home");
        home.textContent = "Open Google Translate";
        home.setAttribute("class", "ft-icon-txt");
        home.addEventListener("click", listener);
        document.body.appendChild(home);
      }
      /*  */
      var input = document.getElementById("input-wrap");
      if (input) {
        var textarea = input.getElementsByTagName("textarea")[0];
        if (textarea) {
          textarea.focus();
          textarea.setAttribute("placeholder", "Click to type");
          textarea.addEventListener("keyup", function (e) {
            if (e.target.value) background.send("input-word", e.target.value);
          });
        }
      }
      /*  */
      var sourcelang = [...document.querySelectorAll("[onClick*='sl_list_']")];
      if (sourcelang && sourcelang.length) {
        sourcelang.map(function (e) {
          e.addEventListener("click", function () {
            var cls = this.getAttribute("class");
            if (cls) {
              cls = cls.replace(/language\_list\_item\_wrapper/g, '').replace(/detect\_language/, '').replace(/ -/g, '').trim();
              if (cls) background.send("source-language", cls);
            }
          });
        });
      }
      /*  */
      var targetlang = [...document.querySelectorAll("[onClick*='tl_list_']")];
      if (targetlang && targetlang.length) {
        targetlang.map(function (e) {
          e.addEventListener("click", function () {
            var cls = this.getAttribute("class");
            if (cls) {
              cls = cls.replace(/language\_list\_item\_wrapper/g, '').replace(/detect\_language/, '').replace(/ -/g, '').trim();
              if (cls) background.send("target-language", cls);
            }
          });
        });
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", contentloaded, false);
