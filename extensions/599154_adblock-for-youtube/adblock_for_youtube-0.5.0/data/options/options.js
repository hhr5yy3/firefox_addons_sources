var background = (function () {
  let tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-options") {
          if (request.method === id) {
            tmp[id](request.data);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {
      tmp[id] = callback;
    },
    "send": function (id, data) {
      chrome.runtime.sendMessage({
        "method": id, 
        "data": data,
        "path": "options-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "element": {
    "badge": null,
    "annotations": null
  },
  "render": function (e) {
    config.element.badge.checked = e.badge;
    config.element.annotations.checked = e.annotations;
  },
  "load": function () {
    config.element.badge = document.getElementById("badge");
    config.element.annotations = document.getElementById("annotations");
    /*  */
    badge.addEventListener("change", function (e) {
      background.send("badge", e.target.checked);
    }, false);    
    /*  */
    annotations.addEventListener("change", function (e) {
      background.send("annotations", e.target.checked);
    }, false);
    /*  */
    background.send("storage");
    window.removeEventListener("load", config.load, false);
  }
};

background.receive("render", config.render);
window.addEventListener("load", config.load, false);
