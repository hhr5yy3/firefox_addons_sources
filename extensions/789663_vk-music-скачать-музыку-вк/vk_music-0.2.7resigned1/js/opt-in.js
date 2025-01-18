!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "~lib/messaging", "~lib/settings", "~lib/i18n" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(require("~lib/messaging"), require("~lib/settings"), require("~lib/i18n"));
    } else {
        factory(global.messaging, global.settings, global.i18n);
        global.optIn = {};
    }
}(this, function(_messaging, _settings, _i18n) {
    "use strict";
    var _messaging2 = _interopRequireDefault(_messaging);
    _interopRequireDefault(_settings);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    var Messages = new _messaging2.default({
        name: "ext_opt-in"
    });
    var addClass = function addClass(elem, c) {
        return elem.classList.add(c);
    };
    var removeClass = function removeClass(elem, c) {
        return elem.classList.remove(c);
    };
    setTimeout(_i18n.domI18n, 4);
    setTimeout(function init() {
        var modal = document.getElementById("modal");
        var thanks = document.getElementById("thank-you");
        var openThanks = function openThanks() {
            return function addClassDelay(elem, c) {
                var delay = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
                return setTimeout(addClass.bind(null, elem, c), delay);
            }(thanks, "md-show");
        };
        var userChoise = function userChoise() {
            (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0) && function userAccept() {
                Messages.post({
                    act: "set_analytics",
                    data: !0
                });
            }();
            !function closeModal() {
                removeClass(modal, "md-show");
            }();
            openThanks();
            !function closeWindow() {
                var delay = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3;
                setTimeout(function() {
                    return window.close();
                }, delay);
            }();
        };
        document.querySelector(".success").onclick = function(ev) {
            return userChoise(!0);
        };
        document.querySelector(".cancel").onclick = function(ev) {
            return userChoise();
        };
    }, 1e3);
});