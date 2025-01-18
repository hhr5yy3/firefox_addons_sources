(function () {

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;

var $2wZwj = parcelRequire("2wZwj");

var $fO6JP = parcelRequire("fO6JP");
let $3ddd7a410457c0d9$var$updateSlider = true, $3ddd7a410457c0d9$var$updateTimeout, $3ddd7a410457c0d9$var$mouseState = "in";
let $3ddd7a410457c0d9$var$controls = {
    systemstate: "searching",
    state: "pause",
    sliderval: 0,
    timeval: 0,
    durationval: 0,
    time: "00:00",
    duration: "00:00",
    autoHide: false,
    toggleHide: function() {
        this.autoHide = !this.autoHide;
    },
    togglePlay: function() {
        $3ddd7a410457c0d9$var$_sendMsg({
            "ui_toggle": true
        });
    },
    sliderChange: function() {
        $3ddd7a410457c0d9$var$_sendMsg({
            "ui_seek": $3ddd7a410457c0d9$var$controls.sliderval / 1000 * $3ddd7a410457c0d9$var$controls.durationval
        });
        clearTimeout($3ddd7a410457c0d9$var$updateTimeout);
        $3ddd7a410457c0d9$var$updateTimeout = setTimeout(function() {
            $3ddd7a410457c0d9$var$updateSlider = true;
        }, 2000);
    },
    sliderInput: function() {
        clearTimeout($3ddd7a410457c0d9$var$updateTimeout);
        $3ddd7a410457c0d9$var$updateSlider = false;
        if ($3ddd7a410457c0d9$var$controls.durationval) $3ddd7a410457c0d9$var$controls.time = $3ddd7a410457c0d9$var$_toTimeCode($3ddd7a410457c0d9$var$controls.sliderval / 1000 * $3ddd7a410457c0d9$var$controls.durationval);
    },
    setNew: function() {
        $3ddd7a410457c0d9$var$_sendMsg({
            newurl: true
        });
    },
    reSync: function() {
        $3ddd7a410457c0d9$var$_sendMsg({
            resync: true
        });
    }
};
window.addEventListener("message", function(msg) {
    var m = msg.data.ui_update || msg.data;
    if (m.play) $3ddd7a410457c0d9$var$controls.state = "play";
    else if (m.pause) $3ddd7a410457c0d9$var$controls.state = "pause";
    else if (typeof m.durationchange !== "undefined") {
        $3ddd7a410457c0d9$var$controls.durationval = m.durationchange;
        $3ddd7a410457c0d9$var$controls.duration = $3ddd7a410457c0d9$var$_toTimeCode(m.durationchange);
    } else if (typeof m.timeupdate !== "undefined") {
        $3ddd7a410457c0d9$var$controls.timeval = m.timeupdate;
        $3ddd7a410457c0d9$var$controls.time = $3ddd7a410457c0d9$var$_toTimeCode(m.timeupdate);
        if ($3ddd7a410457c0d9$var$controls.durationval && $3ddd7a410457c0d9$var$updateSlider) $3ddd7a410457c0d9$var$controls.sliderval = Math.round($3ddd7a410457c0d9$var$controls.timeval / $3ddd7a410457c0d9$var$controls.durationval * 1000);
    } else if (m.videofound) $3ddd7a410457c0d9$var$controls.systemstate = "videofound";
    else if (m.resync) $3ddd7a410457c0d9$var$controls.systemstate = "resync";
});
$3ddd7a410457c0d9$var$controls = new (0, $2wZwj.W2gDataObject)($3ddd7a410457c0d9$var$controls);
new (0, $fO6JP.W2gBind)($3ddd7a410457c0d9$var$controls, ".w2g-controls");
$3ddd7a410457c0d9$var$controls._addHandler("autoHide", function(p, v) {
    if (v === true) setTimeout(function() {
        $3ddd7a410457c0d9$var$_sendMsg({
            "show_ui": false
        });
    }, 500);
});
document.querySelector("body").addEventListener("mouseenter", function() {
    $3ddd7a410457c0d9$var$mouseState = "in";
    $3ddd7a410457c0d9$var$_sendMsg({
        "show_ui": true
    });
});
document.querySelector("body").addEventListener("mouseleave", function() {
    $3ddd7a410457c0d9$var$mouseState = "out";
    if ($3ddd7a410457c0d9$var$controls.autoHide === true) setTimeout(function() {
        if ($3ddd7a410457c0d9$var$mouseState === "out") $3ddd7a410457c0d9$var$_sendMsg({
            "show_ui": false
        });
    }, 1000);
});
function $3ddd7a410457c0d9$var$_sendMsg(msg) {
    window.top.postMessage(msg, "*");
}
function $3ddd7a410457c0d9$var$_toTimeCode(seconds) {
    seconds = isNaN(seconds) ? 0 : seconds;
    var hours, minutes, retval;
    seconds = Math.round(seconds);
    hours = ("00" + Math.floor(seconds / 3600)).slice(-2);
    seconds = seconds % 3600;
    minutes = ("00" + Math.floor(seconds / 60)).slice(-2);
    seconds = ("00" + seconds % 60).slice(-2);
    retval = hours + ":" + minutes + ":" + seconds;
    return retval;
}

})();
