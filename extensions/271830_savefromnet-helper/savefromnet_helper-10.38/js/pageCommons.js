!window.savefromPageWebpackJsonp && (self.savefromPageWebpackJsonp = self.savefromPageWebpackJsonp || []).push([ [ 324 ], {
    99: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => g
        });
        const s = class {
            constructor(e) {
                this.mono = e, this.onChanged = {
                    addListener: e => {
                        browser.storage.onChanged.addListener(e);
                    },
                    hasListener: e => browser.storage.onChanged.hasListener(e),
                    hasListeners: () => browser.storage.onChanged.hasListeners(),
                    removeListener: e => {
                        browser.storage.onChanged.removeListener(e);
                    }
                };
            }
            callback(e, t, r) {
                this.mono.lastError = browser.runtime.lastError, (r || e) && e(t), this.mono.clearLastError();
            }
            get(e, t) {
                browser.storage.local.get(e, (e => this.callback(t, e, !0)));
            }
            set(e, t) {
                browser.storage.local.set(e, (() => this.callback(t)));
            }
            remove(e, t) {
                browser.storage.local.remove(e, (() => this.callback(t)));
            }
            clear(e) {
                browser.storage.local.clear((() => this.callback(e)));
            }
        };
        const n = e => class extends e {
            initI18n() {
                this.i18n = {
                    getMessage: browser.i18n.getMessage.bind(browser.i18n)
                };
            }
            initMessages() {
                this.transport = {
                    sendMessage: (e, t) => {
                        t ? browser.runtime.sendMessage(e, (e => {
                            this.lastError = browser.runtime.lastError, t(e), this.clearLastError();
                        })) : browser.runtime.sendMessage(e);
                    },
                    sendMessageToActiveTab: (e, t) => {
                        browser.tabs.query({
                            active: !0,
                            currentWindow: !0
                        }, (r => {
                            var s = r[0];
                            s && s.id >= 0 ? t ? browser.tabs.sendMessage(s.id, e, (e => {
                                this.lastError = browser.runtime.lastError, t(e), this.clearLastError();
                            })) : browser.tabs.sendMessage(s.id, e) : (this.lastError = new Error("Active tab is not found"), 
                            t && t(), this.clearLastError());
                        }));
                    },
                    addListener: e => {
                        browser.runtime.onMessage.addListener(e);
                    },
                    hasListener: e => browser.runtime.onMessage.hasListener(e),
                    hasListeners: () => browser.runtime.onMessage.hasListeners(),
                    removeListener: e => {
                        browser.runtime.onMessage.removeListener(e);
                    },
                    onBeforeRequest: (e, t, r) => {
                        browser.webRequest.onBeforeRequest.addListener(e, t, r);
                    },
                    removeOnBeforeRequestListener: e => {
                        browser.webRequest.onBeforeRequest.removeListener(e);
                    }
                }, super.initMessages();
            }
            initStorage() {
                this.storage = new s(this);
            }
        };
        const o = class {
            constructor() {
                this.listeners = [];
            }
            addListener(e) {
                -1 === this.listeners.indexOf(e) && this.listeners.push(e);
            }
            dispatch() {
                for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                this.listeners.forEach((e => {
                    e(...t);
                }));
            }
            hasListener(e) {
                return -1 !== this.listeners.indexOf(e);
            }
            hasListeners() {
                return this.listeners.length > 0;
            }
            removeListener(e) {
                var t = this.listeners.indexOf(e);
                -1 !== t && this.listeners.splice(t, 1);
            }
        };
        var i = (e => {
            var t = null;
            return (t = () => {}).t = t.log = t.info = t.warn = t.error = t.debug = t, t;
        })("mono");
        const a = class {
            constructor() {
                this.onDestroy = new o, this._lastErrorFired = !1, this._lastError = null;
            }
            get lastError() {
                return this._lastErrorFired = !0, this._lastError;
            }
            set lastError(e) {
                this._lastErrorFired = !e, this._lastError = e;
            }
            clearLastError() {
                this._lastError && !this._lastErrorFired && i.error("Unhandled mono.lastError error:", this.lastError), 
                this._lastError = null;
            }
            unimplemented() {
                throw new Error("Unimplemented");
            }
            destroy() {
                this.onDestroy.dispatch();
            }
        };
        const c = e => class extends e {
            initMessages() {
                this.sendMessage = this.transport.sendMessage.bind(this.transport), this.sendMessageToActiveTab = this.transport.sendMessageToActiveTab.bind(this.transport), 
                this.onMessage = {
                    addListener: this.transport.addListener.bind(this.transport),
                    hasListener: this.transport.hasListener.bind(this.transport),
                    hasListeners: this.transport.hasListeners.bind(this.transport),
                    removeListener: this.transport.removeListener.bind(this.transport)
                }, this.transport.onBeforeRequest && this.transport.removeOnBeforeRequestListener && (this.onBeforeRequest = this.transport.onBeforeRequest.bind(this.transport), 
                this.removeOnBeforeRequestListener = this.transport.removeOnBeforeRequestListener.bind(this.transport));
            }
        };
        var l = r(875);
        const u = e => class extends e {
            callFn(e, t) {
                return this.waitPromise({
                    action: "callFn",
                    fn: e,
                    args: t
                });
            }
            waitPromise(e) {
                return new Promise(((t, r) => {
                    this.sendMessage(e, (e => {
                        if (e) {
                            if (e.err) {
                                var s = l(e.err);
                                return r(s);
                            }
                            return t(e.result);
                        }
                        var n = this.lastError || new Error("Unexpected response");
                        return r(n);
                    }));
                }));
            }
        };
        const d = e => class extends e {};
        const f = e => class extends(d(e)){};
        class h extends(f(u(c(a)))){}
        const v = h;
        const p = e => class extends e {
            constructor() {
                super(), this.isFirefox = !0;
            }
            get isFirefoxMobile() {
                return /(?:Mobile|Tablet);/.test(navigator.userAgent);
            }
        };
        const b = e => class extends(p(e)){};
        class m extends(b(n(v))){
            constructor() {
                super(), this.initMessages(), this.initStorage(), this.initI18n();
            }
        }
        const g = new m;
    },
    190: (e, t, r) => {
        "use strict";
        r.d(t, {
            A: () => l
        });
        var s = {
            on: function(e, t, r, s) {
                e.addEventListener(t, r, s);
            },
            off: function(e, t, r, s) {
                e.removeEventListener(t, r, s);
            },
            one: function(e, t, r, n) {
                var o = [ "oneFn", t, !!n ].join("_"), i = r[o];
                i || (r[o] = i = function(e) {
                    s.off(this, t, i, n), r.apply(this, arguments);
                }), s.on(e, t, i, n), e = null;
            }
        }, n = "sf-removed-" + Math.floor(1e6 * Math.random()), o = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
        s.onRemoveEventName = n, s.onRemoveClassName = o, s.onRemoveListener = function(e) {
            s.trigger(e, n, {
                cancelable: !0,
                bubbles: !1
            });
        }, s.onRemoveEvent = (e, t) => {
            e.classList.add(o), e.addEventListener(n, t);
        }, s.offRemoveEvent = function(e, t) {
            e.removeEventListener(s.onRemoveEventName, t);
        }, s.trigger = function(e, t, r) {
            void 0 === r && (r = {}), void 0 === r.bubbles && (r.bubbles = !1), void 0 === r.cancelable && (r.cancelable = !1);
            var s = null;
            s = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, r) : new CustomEvent(t, r), 
            e.dispatchEvent(s);
        };
        const i = s;
        var a = {
            create: function(e, t) {
                var r, s;
                for (var n in r = "object" != typeof e ? document.createElement(e) : e, t) {
                    var o = t[n];
                    (s = c[n]) ? s(r, o) : r[n] = o;
                }
                return r;
            }
        }, c = {
            text: function(e, t) {
                e.textContent = t;
            },
            data: function(e, t) {
                for (var r in t) e.dataset[r] = t[r];
            },
            class: function(e, t) {
                if (Array.isArray(t)) for (var r = 0, s = t.length; r < s; r++) e.classList.add(t[r]); else e.setAttribute("class", t);
            },
            style: function(e, t) {
                if ("object" == typeof t) for (var r in t) {
                    var s = r;
                    "float" === s && (s = "cssFloat");
                    var n = t[r];
                    if (Array.isArray(n)) for (var o = 0, i = n.length; o < i; o++) e.style[s] = n[o]; else e.style[s] = n;
                } else e.setAttribute("style", t);
            },
            append: function(e, t) {
                Array.isArray(t) || (t = [ t ]);
                for (var r = 0, s = t.length; r < s; r++) {
                    var n = t[r];
                    (n || 0 === n) && ("object" != typeof n && (n = document.createTextNode(n)), e.appendChild(n));
                }
            },
            on: function(e, t) {
                "object" != typeof t[0] && (t = [ t ]);
                for (var r = 0, s = t.length; r < s; r++) {
                    var n = t[r];
                    Array.isArray(n) && i.on.apply(i, [ e ].concat(n));
                }
            },
            one: function(e, t) {
                "object" != typeof t[0] && (t = [ t ]);
                for (var r = 0, s = t.length; r < s; r++) {
                    var n = t[r];
                    Array.isArray(n) && i.one.apply(i, [ e ].concat(n));
                }
            },
            onCreate: function(e, t) {
                t.call(e, e);
            },
            attr: function(e, t) {
                var r, s;
                for (r in t) s = t[r], e.setAttribute(r, s);
            }
        };
        const l = a;
    },
    314: e => {
        "use strict";
        e.exports = function(e) {
            var t = [];
            return t.toString = function() {
                return this.map((function(t) {
                    var r = "", s = void 0 !== t[5];
                    return t[4] && (r += "@supports (".concat(t[4], ") {")), t[2] && (r += "@media ".concat(t[2], " {")), 
                    s && (r += "@layer".concat(t[5].length > 0 ? " ".concat(t[5]) : "", " {")), r += e(t), 
                    s && (r += "}"), t[2] && (r += "}"), t[4] && (r += "}"), r;
                })).join("");
            }, t.i = function(e, r, s, n, o) {
                "string" == typeof e && (e = [ [ null, e, void 0 ] ]);
                var i = {};
                if (s) for (var a = 0; a < this.length; a++) {
                    var c = this[a][0];
                    null != c && (i[c] = !0);
                }
                for (var l = 0; l < e.length; l++) {
                    var u = [].concat(e[l]);
                    s && i[u[0]] || (void 0 !== o && (void 0 === u[5] || (u[1] = "@layer".concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {").concat(u[1], "}")), 
                    u[5] = o), r && (u[2] ? (u[1] = "@media ".concat(u[2], " {").concat(u[1], "}"), 
                    u[2] = r) : u[2] = r), n && (u[4] ? (u[1] = "@supports (".concat(u[4], ") {").concat(u[1], "}"), 
                    u[4] = n) : u[4] = "".concat(n)), t.push(u));
                }
            }, t;
        };
    },
    601: e => {
        "use strict";
        e.exports = function(e) {
            return e[1];
        };
    },
    875: (e, t, r) => {
        var s = r(59).Ay;
        e.exports = s;
    },
    59: (e, t) => {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
        };
        function s(e) {
            return e && "object" === (void 0 === e ? "undefined" : r(e)) && "string" == typeof e.name && "string" == typeof e.message;
        }
        t.Ay = function(e) {
            return s(e) ? Object.assign(new Error, {
                stack: void 0
            }, e) : e;
        };
    },
    72: (e, t, r) => {
        "use strict";
        var s, n = function() {
            return void 0 === s && (s = Boolean(window && document && document.all && !window.atob)), 
            s;
        }, o = function() {
            var e = {};
            return function(t) {
                if (void 0 === e[t]) {
                    var r = document.querySelector(t);
                    if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement) try {
                        r = r.contentDocument.head;
                    } catch (e) {
                        r = null;
                    }
                    e[t] = r;
                }
                return e[t];
            };
        }(), i = [];
        function a(e) {
            for (var t = -1, r = 0; r < i.length; r++) if (i[r].identifier === e) {
                t = r;
                break;
            }
            return t;
        }
        function c(e, t) {
            for (var r = {}, s = [], n = 0; n < e.length; n++) {
                var o = e[n], c = t.base ? o[0] + t.base : o[0], l = r[c] || 0, u = "".concat(c, " ").concat(l);
                r[c] = l + 1;
                var d = a(u), f = {
                    css: o[1],
                    media: o[2],
                    sourceMap: o[3]
                };
                -1 !== d ? (i[d].references++, i[d].updater(f)) : i.push({
                    identifier: u,
                    updater: b(f, t),
                    references: 1
                }), s.push(u);
            }
            return s;
        }
        function l(e) {
            var t = document.createElement("style"), s = e.attributes || {};
            if (void 0 === s.nonce) {
                var n = r.nc;
                n && (s.nonce = n);
            }
            if (Object.keys(s).forEach((function(e) {
                t.setAttribute(e, s[e]);
            })), "function" == typeof e.insert) e.insert(t); else {
                var i = o(e.insert || "head");
                if (!i) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                i.appendChild(t);
            }
            return t;
        }
        var u, d = (u = [], function(e, t) {
            return u[e] = t, u.filter(Boolean).join("\n");
        });
        function f(e, t, r, s) {
            var n = r ? "" : s.media ? "@media ".concat(s.media, " {").concat(s.css, "}") : s.css;
            if (e.styleSheet) e.styleSheet.cssText = d(t, n); else {
                var o = document.createTextNode(n), i = e.childNodes;
                i[t] && e.removeChild(i[t]), i.length ? e.insertBefore(o, i[t]) : e.appendChild(o);
            }
        }
        function h(e, t, r) {
            var s = r.css, n = r.media, o = r.sourceMap;
            if (n ? e.setAttribute("media", n) : e.removeAttribute("media"), o && "undefined" != typeof btoa && (s += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")), 
            e.styleSheet) e.styleSheet.cssText = s; else {
                for (;e.firstChild; ) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(s));
            }
        }
        var v = null, p = 0;
        function b(e, t) {
            var r, s, n;
            if (t.singleton) {
                var o = p++;
                r = v || (v = l(t)), s = f.bind(null, r, o, !1), n = f.bind(null, r, o, !0);
            } else r = l(t), s = h.bind(null, r, t), n = function() {
                !function(e) {
                    if (null === e.parentNode) return !1;
                    e.parentNode.removeChild(e);
                }(r);
            };
            return s(e), function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    s(e = t);
                } else n();
            };
        }
        e.exports = function(e, t) {
            (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = n());
            var r = c(e = e || [], t);
            return function(e) {
                if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                    for (var s = 0; s < r.length; s++) {
                        var n = a(r[s]);
                        i[n].references--;
                    }
                    for (var o = c(e, t), l = 0; l < r.length; l++) {
                        var u = a(r[l]);
                        0 === i[u].references && (i[u].updater(), i.splice(u, 1));
                    }
                    r = o;
                }
            };
        };
    }
} ]);