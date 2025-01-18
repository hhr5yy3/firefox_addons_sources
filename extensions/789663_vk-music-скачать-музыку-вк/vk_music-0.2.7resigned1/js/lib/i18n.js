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
        global.i18n = mod.exports;
    }
}(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var __ = exports.__ = function __(key) {
        return chrome.i18n.getMessage(key) || chrome.runtime.getManifest()[key];
    };
    exports.domI18n = function domI18n() {
        var key = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "data-i18n";
        document.querySelectorAll("[" + key + "]").forEach(function(node) {
            var t = __(node.getAttribute(key));
            t && (node.innerText = t);
        });
    };
    exports.default = __;
});