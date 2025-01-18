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
        global.ua = mod.exports;
    }
}(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.getBrowser = function getBrowser() {
        return (isFF() ? "firefox" : isOP() && "opera") || isYA() && "yabrowser" || "chrome";
    };
    var getUA = exports.getUA = function getUA() {
        return navigator.userAgent.toLowerCase();
    };
    var isFF = exports.isFF = function isFF() {
        return testUA(/firefox/);
    };
    var isOP = exports.isOP = function isOP() {
        return testUA(/opr/);
    };
    var isYA = exports.isYA = function isYA() {
        return testUA(/yabrowser/);
    };
    var testUA = exports.testUA = function testUA(regex) {
        return regex.test(getUA());
    };
    exports.default = getUA();
});