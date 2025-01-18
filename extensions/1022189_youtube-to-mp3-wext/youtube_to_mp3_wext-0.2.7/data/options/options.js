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

const load = function () {
  background.send("load");
  window.removeEventListener("load", load, false);
};

const render = function (e) {
  const fastmethod = document.getElementById("fastmethod");
  const radio = document.querySelectorAll("input[type=radio]");
  /*  */
  fastmethod.checked = e.fastmethod;
  document.querySelector("input[value='" + e.bitrate + "']").checked = true;
  /*  */
  fastmethod.addEventListener("change", function (e) {
    background.send("store", {
      "fastmethod": e.target.checked
    });
  });
  /*  */
  for (let i = 0; i < radio.length; i++) {
    radio[i].addEventListener("click", function (e) {
      background.send("store", {
        "bitrate": e.target.value,
      });
    });
  }
};

background.receive("load", render);
window.addEventListener("load", load, false);
