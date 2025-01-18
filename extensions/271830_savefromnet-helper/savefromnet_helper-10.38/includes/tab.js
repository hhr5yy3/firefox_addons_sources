(() => {
    var s = {
        2875: (s, r, e) => {
            var t = e(6059).Ay;
            s.exports = t;
        },
        6059: (s, r) => {
            "use strict";
            var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(s) {
                return typeof s;
            } : function(s) {
                return s && "function" == typeof Symbol && s.constructor === Symbol ? "symbol" : typeof s;
            };
            function t(s) {
                return s && "object" === (void 0 === s ? "undefined" : e(s)) && "string" == typeof s.name && "string" == typeof s.message;
            }
            r.Ay = function(s) {
                return t(s) ? Object.assign(new Error, {
                    stack: void 0
                }, s) : s;
            };
        }
    }, r = {};
    function e(t) {
        var n = r[t];
        if (void 0 !== n) return n.exports;
        var o = r[t] = {
            exports: {}
        };
        return s[t](o, o.exports, e), o.exports;
    }
    (() => {
        "use strict";
        const s = class {
            constructor() {
                this.listeners = [];
            }
            addListener(s) {
                -1 === this.listeners.indexOf(s) && this.listeners.push(s);
            }
            dispatch() {
                for (var s = arguments.length, r = new Array(s), e = 0; e < s; e++) r[e] = arguments[e];
                this.listeners.forEach((s => {
                    s(...r);
                }));
            }
            hasListener(s) {
                return -1 !== this.listeners.indexOf(s);
            }
            hasListeners() {
                return this.listeners.length > 0;
            }
            removeListener(s) {
                var r = this.listeners.indexOf(s);
                -1 !== r && this.listeners.splice(r, 1);
            }
        };
        var r = (s => {
            var r = null;
            return (r = () => {}).t = r.log = r.info = r.warn = r.error = r.debug = r, r;
        })("mono");
        const t = class {
            constructor() {
                this.onDestroy = new s, this._lastErrorFired = !1, this._lastError = null;
            }
            get lastError() {
                return this._lastErrorFired = !0, this._lastError;
            }
            set lastError(s) {
                this._lastErrorFired = !s, this._lastError = s;
            }
            clearLastError() {
                this._lastError && !this._lastErrorFired && r.error("Unhandled mono.lastError error:", this.lastError), 
                this._lastError = null;
            }
            unimplemented() {
                throw new Error("Unimplemented");
            }
            destroy() {
                this.onDestroy.dispatch();
            }
        };
        var n = e(2875);
        const o = s => class extends s {
            callFn(s, r) {
                return this.waitPromise({
                    action: "callFn",
                    fn: s,
                    args: r
                });
            }
            waitPromise(s) {
                return new Promise(((r, e) => {
                    this.sendMessage(s, (s => {
                        if (s) {
                            if (s.err) {
                                var t = n(s.err);
                                return e(t);
                            }
                            return r(s.result);
                        }
                        var o = this.lastError || new Error("Unexpected response");
                        return e(o);
                    }));
                }));
            }
        };
        const i = s => class extends s {};
        const a = s => class extends(i(s)){};
        class l extends(a(o(t))){
            initMessages() {
                this.sendMessage = this.transport.sendMessage.bind(this.transport), this.onMessage = {
                    addListener: this.transport.addListener.bind(this.transport),
                    hasListener: this.transport.hasListener.bind(this.transport),
                    hasListeners: this.transport.hasListeners.bind(this.transport),
                    removeListener: this.transport.removeListener.bind(this.transport)
                };
            }
        }
        const h = l;
        const c = class {
            constructor(s) {
                this.mono = s, this.onChanged = {
                    addListener: s => {
                        browser.storage.onChanged.addListener(s);
                    },
                    hasListener: s => browser.storage.onChanged.hasListener(s),
                    hasListeners: () => browser.storage.onChanged.hasListeners(),
                    removeListener: s => {
                        browser.storage.onChanged.removeListener(s);
                    }
                };
            }
            callback(s, r, e) {
                this.mono.lastError = browser.runtime.lastError, (e || s) && s(r), this.mono.clearLastError();
            }
            get(s, r) {
                browser.storage.local.get(s, (s => this.callback(r, s, !0)));
            }
            set(s, r) {
                browser.storage.local.set(s, (() => this.callback(r)));
            }
            remove(s, r) {
                browser.storage.local.remove(s, (() => this.callback(r)));
            }
            clear(s) {
                browser.storage.local.clear((() => this.callback(s)));
            }
        };
        const d = s => class extends s {
            constructor() {
                super(), this.isFirefox = !0;
            }
            get isFirefoxMobile() {
                return /(?:Mobile|Tablet);/.test(navigator.userAgent);
            }
        };
        const g = s => class extends(d(s)){};
        class u extends(g(h)){
            constructor() {
                super(), this.initMessages(), this.initStorage(), this.initI18n();
            }
            initI18n() {
                this.i18n = {
                    getMessage: browser.i18n.getMessage.bind(browser.i18n)
                };
            }
            initMessages() {
                this.transport = {
                    sendMessage: (s, r) => {
                        r ? browser.runtime.sendMessage(s, (s => {
                            this.lastError = browser.runtime.lastError, r(s), this.clearLastError();
                        })) : browser.runtime.sendMessage(s);
                    },
                    addListener: s => {
                        browser.runtime.onMessage.addListener(s);
                    },
                    hasListener: s => browser.runtime.onMessage.hasListener(s),
                    hasListeners: () => browser.runtime.onMessage.hasListeners(),
                    removeListener: s => {
                        browser.runtime.onMessage.removeListener(s);
                    }
                }, super.initMessages();
            }
            initStorage() {
                this.storage = new c(this);
            }
        }
        const b = new u;
        var m = [], p = (s, r, e) => Promise.resolve().then((() => !e || e())).then((e => {
            e && (-1 === m.indexOf(s) && m.push(s), r());
        }));
        p("tab", (() => {
            b.sendMessage({
                action: "openPage"
            });
        }));
    })();
})();