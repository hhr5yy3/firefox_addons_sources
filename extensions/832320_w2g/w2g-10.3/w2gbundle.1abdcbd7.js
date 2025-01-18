
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

var $kizeT = parcelRequire("kizeT");

var $2Zlaa = parcelRequire("2Zlaa");
let $1b5e50a7b05cc7e6$var$updateSlider = true, $1b5e50a7b05cc7e6$var$updateTimeout, $1b5e50a7b05cc7e6$var$mouseState = "in";
let $1b5e50a7b05cc7e6$var$controls = {
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
        $1b5e50a7b05cc7e6$var$_sendMsg({
            "ui_toggle": true
        });
    },
    sliderChange: function() {
        $1b5e50a7b05cc7e6$var$_sendMsg({
            "ui_seek": $1b5e50a7b05cc7e6$var$controls.sliderval / 1000 * $1b5e50a7b05cc7e6$var$controls.durationval
        });
        clearTimeout($1b5e50a7b05cc7e6$var$updateTimeout);
        $1b5e50a7b05cc7e6$var$updateTimeout = setTimeout(function() {
            $1b5e50a7b05cc7e6$var$updateSlider = true;
        }, 2000);
    },
    sliderInput: function() {
        clearTimeout($1b5e50a7b05cc7e6$var$updateTimeout);
        $1b5e50a7b05cc7e6$var$updateSlider = false;
        if ($1b5e50a7b05cc7e6$var$controls.durationval) $1b5e50a7b05cc7e6$var$controls.time = $1b5e50a7b05cc7e6$var$_toTimeCode($1b5e50a7b05cc7e6$var$controls.sliderval / 1000 * $1b5e50a7b05cc7e6$var$controls.durationval);
    },
    setNew: function() {
        $1b5e50a7b05cc7e6$var$_sendMsg({
            newurl: true
        });
    },
    reSync: function() {
        $1b5e50a7b05cc7e6$var$_sendMsg({
            resync: true
        });
    }
};
window.addEventListener("message", function(msg) {
    var m = msg.data.ui_update || msg.data;
    if (m.play) $1b5e50a7b05cc7e6$var$controls.state = "play";
    else if (m.pause) $1b5e50a7b05cc7e6$var$controls.state = "pause";
    else if (typeof m.durationchange !== "undefined") {
        $1b5e50a7b05cc7e6$var$controls.durationval = m.durationchange;
        $1b5e50a7b05cc7e6$var$controls.duration = $1b5e50a7b05cc7e6$var$_toTimeCode(m.durationchange);
    } else if (typeof m.timeupdate !== "undefined") {
        $1b5e50a7b05cc7e6$var$controls.timeval = m.timeupdate;
        $1b5e50a7b05cc7e6$var$controls.time = $1b5e50a7b05cc7e6$var$_toTimeCode(m.timeupdate);
        if ($1b5e50a7b05cc7e6$var$controls.durationval && $1b5e50a7b05cc7e6$var$updateSlider) $1b5e50a7b05cc7e6$var$controls.sliderval = Math.round($1b5e50a7b05cc7e6$var$controls.timeval / $1b5e50a7b05cc7e6$var$controls.durationval * 1000);
    } else if (m.videofound) $1b5e50a7b05cc7e6$var$controls.systemstate = "videofound";
    else if (m.resync) $1b5e50a7b05cc7e6$var$controls.systemstate = "resync";
});
$1b5e50a7b05cc7e6$var$controls = new (0, $kizeT.W2gDataObject)($1b5e50a7b05cc7e6$var$controls);
new (0, $2Zlaa.W2gBind)($1b5e50a7b05cc7e6$var$controls, ".w2g-controls");
$1b5e50a7b05cc7e6$var$controls._addHandler("autoHide", function(p, v) {
    if (v === true) setTimeout(function() {
        $1b5e50a7b05cc7e6$var$_sendMsg({
            "show_ui": false
        });
    }, 500);
});
document.querySelector("body").addEventListener("mouseenter", function() {
    $1b5e50a7b05cc7e6$var$mouseState = "in";
    $1b5e50a7b05cc7e6$var$_sendMsg({
        "show_ui": true
    });
});
document.querySelector("body").addEventListener("mouseleave", function() {
    $1b5e50a7b05cc7e6$var$mouseState = "out";
    if ($1b5e50a7b05cc7e6$var$controls.autoHide === true) setTimeout(function() {
        if ($1b5e50a7b05cc7e6$var$mouseState === "out") $1b5e50a7b05cc7e6$var$_sendMsg({
            "show_ui": false
        });
    }, 1000);
});
function $1b5e50a7b05cc7e6$var$_sendMsg(msg) {
    window.top.postMessage(msg, "*");
}
function $1b5e50a7b05cc7e6$var$_toTimeCode(seconds) {
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


