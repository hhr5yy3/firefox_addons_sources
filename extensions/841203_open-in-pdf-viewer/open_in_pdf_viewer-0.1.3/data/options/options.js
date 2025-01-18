var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === 'background-to-options') {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": 'options-to-background', "method": id, "data": data})}
  }
})();

background.receive("storageData", function (data) {
  if (data) {
    var path = document.getElementById("path");
    if (path) {
      path.value = data.path;
      path.addEventListener("change", function (e) {
        background.send("path", e.target.value);
      }, false);
    }
    /*  */
    var args = document.getElementById("args");
    if (args) {
      args.value = data.args.join(',');
      args.addEventListener("change", function (e) {
        background.send("args", e.target.value.split(','));
      }, false);
    }
    /*  */
    var clear = document.getElementById("clear");
    if (clear) {
      clear.checked = data.clear;
      clear.addEventListener("click", function (e) {
        background.send("clear", e.target.checked);
      }, false);
    }
  }
});

var load = function () {
  background.send("storageData");
  window.removeEventListener("load", load, false);
};

window.addEventListener("load", load, false);
