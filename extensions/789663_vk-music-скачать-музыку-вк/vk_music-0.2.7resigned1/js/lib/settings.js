!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "exports" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.settings = mod.exports;
    }
}(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.sett = function sett(name, val) {
        return void 0 === val ? Settings[name] : Settings[name] === val;
    };
    var Settings = {
        button_position: "left",
        button_progress: !0,
        reload_audio_interval: 500,
        batch_download: !1,
        id3_fill: "auto"
    };
    exports.default = Settings;
});