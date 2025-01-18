var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-options") {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data) {chrome.runtime.sendMessage({"path": "options-to-background", "method": id, "data": data})}
  }
})();

var connect = function (elem, pref) {
  var att = "value";
  if (elem) {
    if (elem.type === "text") att = "value";
    if (elem.type === "checkbox") att = "checked";
    if (elem.localName === "span") att = "textContent";
    if (elem.localName === "select") att = "selectedIndex";
    var pref = elem.getAttribute("data-pref");
    background.send("get", pref);
    elem.addEventListener("change", function () {
      background.send("changed", {"pref": pref, "value": this[att]});
    });
  }
  /*  */
  return {
    get value () {return elem[att]},
    set value (val) {
      if (elem.type === "file") return;
      elem[att] = val;
    }
  }
};

background.receive("set", function (o) {if (window[o.pref]) window[o.pref].value = o.value});

var load = function () {
  var prefs = document.querySelectorAll("*[data-pref]");
  [].forEach.call(prefs, function (elem) {
    var pref = elem.getAttribute("data-pref");
    window[pref] = connect(elem, pref);
  });
  /*  */
  window.removeEventListener("load", load, false);
};

window.addEventListener("load", load, false);