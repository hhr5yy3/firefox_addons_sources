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
        global.cache = mod.exports;
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
    var Cache = function() {
        function Cache() {
            var prefix = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "cache-";
            var store = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : sessionStorage;
            var serialize = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }(this, Cache);
            this.store = store;
            this.prefix = prefix;
            this.serialize = serialize;
        }
        _createClass(Cache, [ {
            key: "set",
            value: function set(key, val) {
                var serialized = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
                return this.store.setItem("" + this.prefix + key, !serialized && this.serialize ? btoa(val) : val), 
                val;
            }
        }, {
            key: "get",
            value: function get(key) {
                var val = this.store.getItem("" + this.prefix + key);
                return this.serialize ? atob(val) : val;
            }
        }, {
            key: "remove",
            value: function remove(key) {
                var result = this.get(key);
                this.store.removeItem("" + this.prefix + key);
                return result;
            }
        } ]);
        return Cache;
    }();
    exports.default = Cache;
});