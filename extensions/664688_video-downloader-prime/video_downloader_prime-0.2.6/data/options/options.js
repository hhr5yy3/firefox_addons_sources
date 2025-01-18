var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
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

var storage = {"global": {}};

var storetable = function () {
  filltable(storage.global);
  background.send("store", storage.global);
};

var additem = function () {
  var input = document.getElementById("input-field");
  var ext = input.children[0].children[0];
  var description = input.children[1].children[0];
  for (var i = 0; i < storage.global.ext.length; i++) {if (storage.global.ext[i] === ext.value) return}
  if (!ext.value) return;
  if (!description.value) return;
  storage.global.ext.push(ext.value);
  storage.global.state.push("active");
  storage.global.description.push(description.value);
  storetable();
};

var filltable = function (o) {
  var count = 1;
  storage.global = o;
  var tbody = document.getElementById('ext-value-tbody');
  tbody.textContent = '';
  /*  */
  for (var i = o.ext.length - 1; i >= 0; i--) {
    var ext = document.createElement('td');
    var close = document.createElement('td');
    var number = document.createElement('td');
    var toggle = document.createElement('td');
    var extItem = document.createElement('tr');
    var description = document.createElement('td');
    /*  */
    ext.setAttribute('type', 'ext');
    close.setAttribute('type', 'close');
    number.setAttribute('type', 'number');
    toggle.setAttribute('type', 'toggle');
    description.setAttribute('type', 'description');
    /*  */
    close.textContent = '✕';
    number.textContent = count;
    ext.textContent = o.ext[i];
    toggle.textContent = o.state[i];
    toggle.setAttribute('state', o.state[i]);
    extItem.setAttribute('state', o.state[i]);
    description.textContent = o.description[i];
    /*  */
    extItem.appendChild(number);
    extItem.appendChild(ext);
    extItem.appendChild(description);
    extItem.appendChild(toggle);
    extItem.appendChild(close);
    tbody.appendChild(extItem);
    count++;
  }
  /*  */
  var support = document.getElementById("open-wpage");
  var size = document.getElementById("video-max-size");
  var resolution = document.getElementById("show-resolution");
  var captured = document.getElementById("captured-list-use-url");
  /*  */
  size.value = o.maxVideoSize;
  support.checked = "openWPage" in o ? o.openWPage : true;
  resolution.checked = "showResolution" in o ? o.showResolution : false;
  captured.checked = "capturedListUseURL" in o ? o.capturedListUseURL : true;
};

var load = function () {
  var support = document.getElementById("open-wpage");
  var field = document.getElementById('input-field');
  var add = document.getElementById('input-field-add');
  var size = document.getElementById("video-max-size");
  var table = document.getElementById('ext-value-table');
  var resolution = document.getElementById("show-resolution");
  var captured = document.getElementById("captured-list-use-url");
  /*  */
  table.addEventListener("click", function (e) {
    var a = e.target.tagName.toLowerCase() === 'td';
    var b = e.target.nodeName.toLowerCase() === 'td';
    /*  */
    if (a || b) {
      var ext, description, state;
      var tr = e.target.parentNode;
      for (var i = 0; i < tr.children.length; i++) {
        var td = tr.children[i];
        var type = td.getAttribute("type");
        if (type == "ext") ext = tr.children[i].textContent;
        if (type == "description") description = tr.children[i].textContent;
      }
      /*  */
      if (e.target.getAttribute('type') === 'close') {
        var index;
        if (storage.global.ext.length < 2) return;
        for (var i = 0; i < storage.global.ext.length; i++) {if (storage.global.ext[i] === ext) {index = i; break}}
        storage.global.ext.splice(index, 1);
        storage.global.state.splice(index, 1);
        storage.global.description.splice(index, 1);
      }
      /*  */
      if (e.target.getAttribute('type') === 'toggle') {
        for (var k = 0; k < storage.global.state.length; k++) {
          var e = storage.global.ext[k];
          var s = storage.global.state[k];
          var d = storage.global.description[k];
          if (e === ext && d === description) {
            if (e.target.getAttribute('state') === 'active') {
              e.target.setAttribute('state', 'inactive');
              storage.global.state[k] = 'inactive';
            } else {
              e.target.setAttribute('state', 'active');
              storage.global.state[k] = 'active';
            }
            break;
          }
        }
      }
      /*  */
      storetable();
    }
  });
  /*  */
  size.addEventListener("change", function (e) {
    var m = e.target.value;
    if (parseInt(m) > 0) {
      storage.global.maxVideoSize = m;
      storetable();
    } else e.target.value = '';
  });
  /*  */
  resolution.addEventListener("change", function (e) {
    storage.global.showResolution = e.target.checked;
    storetable();
  });
  /*  */
  support.addEventListener("change", function (e) {
    storage.global.openWPage = e.target.checked;
    storetable();
  });
  /*  */
  captured.addEventListener("change", function (e) {
    storage.global.capturedListUseURL = e.target.checked;
    storetable();
  });
  /*  */
  background.send("load");
  add.addEventListener("click", additem);
  window.removeEventListener("load", load, false);
  field.addEventListener('keypress', function (e) {if ((e.which || e.keyCode) === 13) additem()});
}

background.receive("storage", filltable);
window.addEventListener("load", load, false);
