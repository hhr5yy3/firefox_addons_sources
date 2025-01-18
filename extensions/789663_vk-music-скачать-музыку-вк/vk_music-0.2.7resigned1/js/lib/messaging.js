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
        global.messaging = mod.exports;
    }
}(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1;
                descriptor.configurable = !0;
                if ("value" in descriptor) {
                    descriptor.writable = !0;
                }
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) {
                defineProperties(Constructor.prototype, protoProps);
            }
            if (staticProps) {
                defineProperties(Constructor, staticProps);
            }
            return Constructor;
        };
    }();
    var Messaging = function() {
        function Messaging(options) {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }(this, Messaging);
            this.transport = null;
            this.connect(options);
        }
        _createClass(Messaging, [ {
            key: "connect",
            value: function connect(options) {
                this.transport = chrome.runtime.connect(options);
            }
        }, {
            key: "post",
            value: function post() {
                try {
                    var _transport;
                    (_transport = this.transport).postMessage.apply(_transport, arguments);
                } catch (e) {}
            }
        }, {
            key: "onMessage",
            value: function onMessage(handler) {
                this.transport.onMessage.addListener(handler);
            }
        } ]);
        return Messaging;
    }();
    exports.default = Messaging;
});