/*! For license information please see background.js.LICENSE.txt */
(() => {
    var e = {
        301: (e, t, r) => {
            "use strict";
            r.d(t, {
                A: () => n
            });
            const n = e => {
                e.errorCatch = {
                    onError: function(t) {
                        var r = t.filename, n = t.message;
                        r && n && (r = (r = String(r).match(/\/([^\/]+)$/)) && r[1]) && (t.lineno && (r += ":" + t.lineno), 
                        "_generated_background_page.html:1" !== r && e.actionList.trackError({
                            desc: [ r, n ].join(" ")
                        }));
                    },
                    enable: function() {
                        window.addEventListener && window.addEventListener("error", this.onError);
                    },
                    disable: function() {
                        window.removeEventListener && window.removeEventListener("error", this.onError);
                    }
                }, e.errorCatch.enable();
            };
        },
        59: e => {
            function t(e) {
                e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, 
                this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
            }
            e.exports = t, t.prototype.duration = function() {
                var e = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var t = Math.random(), r = Math.floor(t * this.jitter * e);
                    e = 1 & Math.floor(10 * t) ? e + r : e - r;
                }
                return 0 | Math.min(e, this.max);
            }, t.prototype.reset = function() {
                this.attempts = 0;
            }, t.prototype.setMin = function(e) {
                this.ms = e;
            }, t.prototype.setMax = function(e) {
                this.max = e;
            }, t.prototype.setJitter = function(e) {
                this.jitter = e;
            };
        },
        75: (e, t, r) => {
            "use strict";
            var n = r(453), o = r(487), i = o(n("String.prototype.indexOf"));
            e.exports = function(e, t) {
                var r = n(e, !!t);
                return "function" == typeof r && i(e, ".prototype.") > -1 ? o(r) : r;
            };
        },
        487: (e, t, r) => {
            "use strict";
            var n = r(743), o = r(453), i = r(897), a = r(675), s = o("%Function.prototype.apply%"), u = o("%Function.prototype.call%"), c = o("%Reflect.apply%", !0) || n.call(u, s), l = r(655), f = o("%Math.max%");
            e.exports = function(e) {
                if ("function" != typeof e) throw new a("a function is required");
                var t = c(n, u, arguments);
                return i(t, 1 + f(0, e.length - (arguments.length - 1)), !0);
            };
            var p = function() {
                return c(n, s, arguments);
            };
            l ? l(e.exports, "apply", {
                value: p
            }) : e.exports.apply = p;
        },
        710: (e, t, r) => {
            var n = r(937).Buffer, o = r(894), i = r(737);
            const a = "https://example.org/";
            var s;
            s = "function" == typeof n ? function(e) {
                return n.from(e).toString("base64");
            } : window.btoa.bind(window), e.exports = y;
            var u = {
                Accept: "application/json, application/x-www-form-urlencoded",
                "Content-Type": "application/x-www-form-urlencoded"
            }, c = {
                invalid_request: [ "The request is missing a required parameter, includes an", "invalid parameter value, includes a parameter more than", "once, or is otherwise malformed." ].join(" "),
                invalid_client: [ "Client authentication failed (e.g., unknown client, no", "client authentication included, or unsupported", "authentication method)." ].join(" "),
                invalid_grant: [ "The provided authorization grant (e.g., authorization", "code, resource owner credentials) or refresh token is", "invalid, expired, revoked, does not match the redirection", "URI used in the authorization request, or was issued to", "another client." ].join(" "),
                unauthorized_client: [ "The client is not authorized to request an authorization", "code using this method." ].join(" "),
                unsupported_grant_type: [ "The authorization grant type is not supported by the", "authorization server." ].join(" "),
                access_denied: [ "The resource owner or authorization server denied the request." ].join(" "),
                unsupported_response_type: [ "The authorization server does not support obtaining", "an authorization code using this method." ].join(" "),
                invalid_scope: [ "The requested scope is invalid, unknown, or malformed." ].join(" "),
                server_error: [ "The authorization server encountered an unexpected", "condition that prevented it from fulfilling the request.", "(This error code is needed because a 500 Internal Server", "Error HTTP status code cannot be returned to the client", "via an HTTP redirect.)" ].join(" "),
                temporarily_unavailable: [ "The authorization server is currently unable to handle", "the request due to a temporary overloading or maintenance", "of the server." ].join(" ")
            };
            function l(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    if (null == e[r]) throw new TypeError('Expected "' + r + '" to exist');
                }
            }
            function f(e) {
                var t = c[e.error] || e.error_description || e.error;
                if (t) {
                    var r = new Error(t);
                    return r.body = e, r.code = "EAUTH", r;
                }
            }
            function p(e) {
                return Array.isArray(e) ? e.join(" ") : m(e);
            }
            function d(e, t) {
                l(e, "clientId", "authorizationUri");
                const r = {
                    client_id: e.clientId,
                    redirect_uri: e.redirectUri,
                    response_type: t,
                    state: e.state
                };
                void 0 !== e.scopes && (r.scope = p(e.scopes));
                const n = e.authorizationUri.includes("?") ? "&" : "?";
                return e.authorizationUri + n + o.stringify(Object.assign(r, e.query));
            }
            function h(e, t) {
                return "Basic " + s(m(e) + ":" + m(t));
            }
            function m(e) {
                return null == e ? "" : String(e);
            }
            function g(e, t) {
                return {
                    url: e.url,
                    method: e.method,
                    body: Object.assign({}, e.body, t.body),
                    query: Object.assign({}, e.query, t.query),
                    headers: Object.assign({}, e.headers, t.headers)
                };
            }
            function y(e, t) {
                this.options = e, this.request = t || i, this.code = new k(this), this.token = new w(this), 
                this.owner = new b(this), this.credentials = new x(this), this.jwt = new O(this);
            }
            function v(e, t) {
                this.client = e, this.data = t, this.tokenType = t.token_type && t.token_type.toLowerCase(), 
                this.accessToken = t.access_token, this.refreshToken = t.refresh_token, this.expiresIn(Number(t.expires_in));
            }
            function b(e) {
                this.client = e;
            }
            function w(e) {
                this.client = e;
            }
            function x(e) {
                this.client = e;
            }
            function k(e) {
                this.client = e;
            }
            function O(e) {
                this.client = e;
            }
            y.Token = v, y.prototype.createToken = function(e, t, r, n) {
                var o = Object.assign({}, n, "string" == typeof e ? {
                    access_token: e
                } : e, "string" == typeof t ? {
                    refresh_token: t
                } : t, "string" == typeof r ? {
                    token_type: r
                } : r);
                return new y.Token(this, o);
            }, y.prototype._request = function(e) {
                var t = e.url, r = o.stringify(e.body), n = o.stringify(e.query);
                return n && (t += (-1 === t.indexOf("?") ? "?" : "&") + n), this.request(e.method, t, r, e.headers).then((function(e) {
                    var t = function(e) {
                        try {
                            return JSON.parse(e);
                        } catch (t) {
                            return o.parse(e);
                        }
                    }(e.body), r = f(t);
                    if (r) return Promise.reject(r);
                    if (e.status < 200 || e.status >= 399) {
                        var n = new Error("HTTP status " + e.status);
                        return n.status = e.status, n.body = e.body, n.code = "ESTATUS", Promise.reject(n);
                    }
                    return t;
                }));
            }, v.prototype.expiresIn = function(e) {
                if ("number" == typeof e) this.expires = new Date, this.expires.setSeconds(this.expires.getSeconds() + e); else {
                    if (!(e instanceof Date)) throw new TypeError("Unknown duration: " + e);
                    this.expires = new Date(e.getTime());
                }
                return this.expires;
            }, v.prototype.sign = function(e) {
                if (!this.accessToken) throw new Error("Unable to sign without access token");
                if (e.headers = e.headers || {}, "bearer" === this.tokenType) e.headers.Authorization = "Bearer " + this.accessToken; else {
                    var t = e.url.split("#"), r = "access_token=" + this.accessToken, n = t[0].replace(/[?&]access_token=[^&#]/, ""), o = t[1] ? "#" + t[1] : "";
                    e.url = n + (n.indexOf("?") > -1 ? "&" : "?") + r + o, e.headers.Pragma = "no-store", 
                    e.headers["Cache-Control"] = "no-store";
                }
                return e;
            }, v.prototype.refresh = function(e) {
                var t = this, r = Object.assign({}, this.client.options, e);
                return this.refreshToken ? this.client._request(g({
                    url: r.accessTokenUri,
                    method: "POST",
                    headers: Object.assign({}, u, {
                        Authorization: h(r.clientId, r.clientSecret)
                    }),
                    body: {
                        refresh_token: this.refreshToken,
                        grant_type: "refresh_token"
                    }
                }, r)).then((function(e) {
                    return t.client.createToken(Object.assign({}, t.data, e));
                })) : Promise.reject(new Error("No refresh token"));
            }, v.prototype.expired = function() {
                return Date.now() > this.expires.getTime();
            }, b.prototype.getToken = function(e, t, r) {
                var n = this, o = Object.assign({}, this.client.options, r);
                const i = {
                    username: e,
                    password: t,
                    grant_type: "password"
                };
                return void 0 !== o.scopes && (i.scope = p(o.scopes)), this.client._request(g({
                    url: o.accessTokenUri,
                    method: "POST",
                    headers: Object.assign({}, u, {
                        Authorization: h(o.clientId, o.clientSecret)
                    }),
                    body: i
                }, o)).then((function(e) {
                    return n.client.createToken(e);
                }));
            }, w.prototype.getUri = function(e) {
                return d(Object.assign({}, this.client.options, e), "token");
            }, w.prototype.getToken = function(e, t) {
                var r = Object.assign({}, this.client.options, t), n = "object" == typeof e ? e : new URL(e, a), i = new URL(r.redirectUri, a);
                if ("string" == typeof n.pathname && n.pathname !== i.pathname) return Promise.reject(new TypeError("Redirected path should match configured path, but got: " + n.pathname));
                if (!n.hash && !n.search) return Promise.reject(new TypeError("Unable to process uri: " + e));
                var s = Object.assign({}, "string" == typeof n.search ? o.parse(n.search.substr(1)) : n.search || {}, "string" == typeof n.hash ? o.parse(n.hash.substr(1)) : n.hash || {}), u = f(s);
                return u ? Promise.reject(u) : null != r.state && s.state !== r.state ? Promise.reject(new TypeError("Invalid state: " + s.state)) : Promise.resolve(this.client.createToken(s));
            }, x.prototype.getToken = function(e) {
                var t = this, r = Object.assign({}, this.client.options, e);
                l(r, "clientId", "clientSecret", "accessTokenUri");
                const n = {
                    grant_type: "client_credentials"
                };
                return void 0 !== r.scopes && (n.scope = p(r.scopes)), this.client._request(g({
                    url: r.accessTokenUri,
                    method: "POST",
                    headers: Object.assign({}, u, {
                        Authorization: h(r.clientId, r.clientSecret)
                    }),
                    body: n
                }, r)).then((function(e) {
                    return t.client.createToken(e);
                }));
            }, k.prototype.getUri = function(e) {
                return d(Object.assign({}, this.client.options, e), "code");
            }, k.prototype.getToken = function(e, t) {
                var r = this, n = Object.assign({}, this.client.options, t);
                l(n, "clientId", "accessTokenUri");
                var i = "object" == typeof e ? e : new URL(e, a);
                if ("string" == typeof n.redirectUri && "string" == typeof i.pathname && i.pathname !== new URL(n.redirectUri, a).pathname) return Promise.reject(new TypeError("Redirected path should match configured path, but got: " + i.pathname));
                if (!i.search || !i.search.substr(1)) return Promise.reject(new TypeError("Unable to process uri: " + e));
                var s = "string" == typeof i.search ? o.parse(i.search.substr(1)) : i.search || {}, c = f(s);
                if (c) return Promise.reject(c);
                if (null != n.state && s.state !== n.state) return Promise.reject(new TypeError("Invalid state: " + s.state));
                if (!s.code) return Promise.reject(new TypeError("Missing code, unable to request token"));
                var p = Object.assign({}, u), d = {
                    code: s.code,
                    grant_type: "authorization_code",
                    redirect_uri: n.redirectUri
                };
                return n.clientSecret ? p.Authorization = h(n.clientId, n.clientSecret) : d.client_id = n.clientId, 
                this.client._request(g({
                    url: n.accessTokenUri,
                    method: "POST",
                    headers: p,
                    body: d
                }, n)).then((function(e) {
                    return r.client.createToken(e);
                }));
            }, O.prototype.getToken = function(e, t) {
                var r = this, n = Object.assign({}, this.client.options, t), o = Object.assign({}, u);
                l(n, "accessTokenUri"), n.clientId && (o.Authorization = h(n.clientId, n.clientSecret));
                const i = {
                    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                    assertion: e
                };
                return void 0 !== n.scopes && (i.scope = p(n.scopes)), this.client._request(g({
                    url: n.accessTokenUri,
                    method: "POST",
                    headers: o,
                    body: i
                }, n)).then((function(e) {
                    return r.client.createToken(e);
                }));
            };
        },
        737: e => {
            e.exports = function(e, t, r, n) {
                return new Promise((function(o, i) {
                    var a = new window.XMLHttpRequest;
                    a.open(e, t), a.onload = function() {
                        return o({
                            status: a.status,
                            body: a.responseText
                        });
                    }, a.onerror = a.onabort = function() {
                        return i(new Error(a.statusText || "XHR aborted: " + t));
                    }, Object.keys(n).forEach((function(e) {
                        a.setRequestHeader(e, n[e]);
                    })), a.send(r);
                }));
            };
        },
        41: (e, t, r) => {
            "use strict";
            var n = r(655), o = r(68), i = r(675), a = r(795);
            e.exports = function(e, t, r) {
                if (!e || "object" != typeof e && "function" != typeof e) throw new i("`obj` must be an object or a function`");
                if ("string" != typeof t && "symbol" != typeof t) throw new i("`property` must be a string or a symbol`");
                if (arguments.length > 3 && "boolean" != typeof arguments[3] && null !== arguments[3]) throw new i("`nonEnumerable`, if provided, must be a boolean or null");
                if (arguments.length > 4 && "boolean" != typeof arguments[4] && null !== arguments[4]) throw new i("`nonWritable`, if provided, must be a boolean or null");
                if (arguments.length > 5 && "boolean" != typeof arguments[5] && null !== arguments[5]) throw new i("`nonConfigurable`, if provided, must be a boolean or null");
                if (arguments.length > 6 && "boolean" != typeof arguments[6]) throw new i("`loose`, if provided, must be a boolean");
                var s = arguments.length > 3 ? arguments[3] : null, u = arguments.length > 4 ? arguments[4] : null, c = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 && arguments[6], f = !!a && a(e, t);
                if (n) n(e, t, {
                    configurable: null === c && f ? f.configurable : !c,
                    enumerable: null === s && f ? f.enumerable : !s,
                    value: r,
                    writable: null === u && f ? f.writable : !u
                }); else {
                    if (!l && (s || u || c)) throw new o("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
                    e[t] = r;
                }
            };
        },
        655: (e, t, r) => {
            "use strict";
            var n = r(453)("%Object.defineProperty%", !0) || !1;
            if (n) try {
                n({}, "a", {
                    value: 1
                });
            } catch (e) {
                n = !1;
            }
            e.exports = n;
        },
        237: e => {
            "use strict";
            e.exports = EvalError;
        },
        383: e => {
            "use strict";
            e.exports = Error;
        },
        290: e => {
            "use strict";
            e.exports = RangeError;
        },
        538: e => {
            "use strict";
            e.exports = ReferenceError;
        },
        68: e => {
            "use strict";
            e.exports = SyntaxError;
        },
        675: e => {
            "use strict";
            e.exports = TypeError;
        },
        345: e => {
            "use strict";
            e.exports = URIError;
        },
        834: e => {
            "use strict";
            var t = /[|\\{}()[\]^$+*?.]/g;
            e.exports = function(e) {
                if ("string" != typeof e) throw new TypeError("Expected a string");
                return e.replace(t, "\\$&");
            };
        },
        353: e => {
            "use strict";
            var t = Object.prototype.toString, r = Math.max, n = function(e, t) {
                for (var r = [], n = 0; n < e.length; n += 1) r[n] = e[n];
                for (var o = 0; o < t.length; o += 1) r[o + e.length] = t[o];
                return r;
            };
            e.exports = function(e) {
                var o = this;
                if ("function" != typeof o || "[object Function]" !== t.apply(o)) throw new TypeError("Function.prototype.bind called on incompatible " + o);
                for (var i, a = function(e, t) {
                    for (var r = [], n = t || 0, o = 0; n < e.length; n += 1, o += 1) r[o] = e[n];
                    return r;
                }(arguments, 1), s = r(0, o.length - a.length), u = [], c = 0; c < s; c++) u[c] = "$" + c;
                if (i = Function("binder", "return function (" + function(e, t) {
                    for (var r = "", n = 0; n < e.length; n += 1) r += e[n], n + 1 < e.length && (r += t);
                    return r;
                }(u, ",") + "){ return binder.apply(this,arguments); }")((function() {
                    if (this instanceof i) {
                        var t = o.apply(this, n(a, arguments));
                        return Object(t) === t ? t : this;
                    }
                    return o.apply(e, n(a, arguments));
                })), o.prototype) {
                    var l = function() {};
                    l.prototype = o.prototype, i.prototype = new l, l.prototype = null;
                }
                return i;
            };
        },
        743: (e, t, r) => {
            "use strict";
            var n = r(353);
            e.exports = Function.prototype.bind || n;
        },
        453: (e, t, r) => {
            "use strict";
            var n, o = r(383), i = r(237), a = r(290), s = r(538), u = r(68), c = r(675), l = r(345), f = Function, p = function(e) {
                try {
                    return f('"use strict"; return (' + e + ").constructor;")();
                } catch (e) {}
            }, d = Object.getOwnPropertyDescriptor;
            if (d) try {
                d({}, "");
            } catch (e) {
                d = null;
            }
            var h = function() {
                throw new c;
            }, m = d ? function() {
                try {
                    return h;
                } catch (e) {
                    try {
                        return d(arguments, "callee").get;
                    } catch (e) {
                        return h;
                    }
                }
            }() : h, g = r(39)(), y = r(24)(), v = Object.getPrototypeOf || (y ? function(e) {
                return e.__proto__;
            } : null), b = {}, w = "undefined" != typeof Uint8Array && v ? v(Uint8Array) : n, x = {
                __proto__: null,
                "%AggregateError%": "undefined" == typeof AggregateError ? n : AggregateError,
                "%Array%": Array,
                "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? n : ArrayBuffer,
                "%ArrayIteratorPrototype%": g && v ? v([][Symbol.iterator]()) : n,
                "%AsyncFromSyncIteratorPrototype%": n,
                "%AsyncFunction%": b,
                "%AsyncGenerator%": b,
                "%AsyncGeneratorFunction%": b,
                "%AsyncIteratorPrototype%": b,
                "%Atomics%": "undefined" == typeof Atomics ? n : Atomics,
                "%BigInt%": "undefined" == typeof BigInt ? n : BigInt,
                "%BigInt64Array%": "undefined" == typeof BigInt64Array ? n : BigInt64Array,
                "%BigUint64Array%": "undefined" == typeof BigUint64Array ? n : BigUint64Array,
                "%Boolean%": Boolean,
                "%DataView%": "undefined" == typeof DataView ? n : DataView,
                "%Date%": Date,
                "%decodeURI%": decodeURI,
                "%decodeURIComponent%": decodeURIComponent,
                "%encodeURI%": encodeURI,
                "%encodeURIComponent%": encodeURIComponent,
                "%Error%": o,
                "%eval%": eval,
                "%EvalError%": i,
                "%Float32Array%": "undefined" == typeof Float32Array ? n : Float32Array,
                "%Float64Array%": "undefined" == typeof Float64Array ? n : Float64Array,
                "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? n : FinalizationRegistry,
                "%Function%": f,
                "%GeneratorFunction%": b,
                "%Int8Array%": "undefined" == typeof Int8Array ? n : Int8Array,
                "%Int16Array%": "undefined" == typeof Int16Array ? n : Int16Array,
                "%Int32Array%": "undefined" == typeof Int32Array ? n : Int32Array,
                "%isFinite%": isFinite,
                "%isNaN%": isNaN,
                "%IteratorPrototype%": g && v ? v(v([][Symbol.iterator]())) : n,
                "%JSON%": "object" == typeof JSON ? JSON : n,
                "%Map%": "undefined" == typeof Map ? n : Map,
                "%MapIteratorPrototype%": "undefined" != typeof Map && g && v ? v((new Map)[Symbol.iterator]()) : n,
                "%Math%": Math,
                "%Number%": Number,
                "%Object%": Object,
                "%parseFloat%": parseFloat,
                "%parseInt%": parseInt,
                "%Promise%": "undefined" == typeof Promise ? n : Promise,
                "%Proxy%": "undefined" == typeof Proxy ? n : Proxy,
                "%RangeError%": a,
                "%ReferenceError%": s,
                "%Reflect%": "undefined" == typeof Reflect ? n : Reflect,
                "%RegExp%": RegExp,
                "%Set%": "undefined" == typeof Set ? n : Set,
                "%SetIteratorPrototype%": "undefined" != typeof Set && g && v ? v((new Set)[Symbol.iterator]()) : n,
                "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? n : SharedArrayBuffer,
                "%String%": String,
                "%StringIteratorPrototype%": g && v ? v(""[Symbol.iterator]()) : n,
                "%Symbol%": g ? Symbol : n,
                "%SyntaxError%": u,
                "%ThrowTypeError%": m,
                "%TypedArray%": w,
                "%TypeError%": c,
                "%Uint8Array%": "undefined" == typeof Uint8Array ? n : Uint8Array,
                "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? n : Uint8ClampedArray,
                "%Uint16Array%": "undefined" == typeof Uint16Array ? n : Uint16Array,
                "%Uint32Array%": "undefined" == typeof Uint32Array ? n : Uint32Array,
                "%URIError%": l,
                "%WeakMap%": "undefined" == typeof WeakMap ? n : WeakMap,
                "%WeakRef%": "undefined" == typeof WeakRef ? n : WeakRef,
                "%WeakSet%": "undefined" == typeof WeakSet ? n : WeakSet
            };
            if (v) try {
                null.error;
            } catch (e) {
                var k = v(v(e));
                x["%Error.prototype%"] = k;
            }
            var O = function e(t) {
                var r;
                if ("%AsyncFunction%" === t) r = p("async function () {}"); else if ("%GeneratorFunction%" === t) r = p("function* () {}"); else if ("%AsyncGeneratorFunction%" === t) r = p("async function* () {}"); else if ("%AsyncGenerator%" === t) {
                    var n = e("%AsyncGeneratorFunction%");
                    n && (r = n.prototype);
                } else if ("%AsyncIteratorPrototype%" === t) {
                    var o = e("%AsyncGenerator%");
                    o && v && (r = v(o.prototype));
                }
                return x[t] = r, r;
            }, E = {
                __proto__: null,
                "%ArrayBufferPrototype%": [ "ArrayBuffer", "prototype" ],
                "%ArrayPrototype%": [ "Array", "prototype" ],
                "%ArrayProto_entries%": [ "Array", "prototype", "entries" ],
                "%ArrayProto_forEach%": [ "Array", "prototype", "forEach" ],
                "%ArrayProto_keys%": [ "Array", "prototype", "keys" ],
                "%ArrayProto_values%": [ "Array", "prototype", "values" ],
                "%AsyncFunctionPrototype%": [ "AsyncFunction", "prototype" ],
                "%AsyncGenerator%": [ "AsyncGeneratorFunction", "prototype" ],
                "%AsyncGeneratorPrototype%": [ "AsyncGeneratorFunction", "prototype", "prototype" ],
                "%BooleanPrototype%": [ "Boolean", "prototype" ],
                "%DataViewPrototype%": [ "DataView", "prototype" ],
                "%DatePrototype%": [ "Date", "prototype" ],
                "%ErrorPrototype%": [ "Error", "prototype" ],
                "%EvalErrorPrototype%": [ "EvalError", "prototype" ],
                "%Float32ArrayPrototype%": [ "Float32Array", "prototype" ],
                "%Float64ArrayPrototype%": [ "Float64Array", "prototype" ],
                "%FunctionPrototype%": [ "Function", "prototype" ],
                "%Generator%": [ "GeneratorFunction", "prototype" ],
                "%GeneratorPrototype%": [ "GeneratorFunction", "prototype", "prototype" ],
                "%Int8ArrayPrototype%": [ "Int8Array", "prototype" ],
                "%Int16ArrayPrototype%": [ "Int16Array", "prototype" ],
                "%Int32ArrayPrototype%": [ "Int32Array", "prototype" ],
                "%JSONParse%": [ "JSON", "parse" ],
                "%JSONStringify%": [ "JSON", "stringify" ],
                "%MapPrototype%": [ "Map", "prototype" ],
                "%NumberPrototype%": [ "Number", "prototype" ],
                "%ObjectPrototype%": [ "Object", "prototype" ],
                "%ObjProto_toString%": [ "Object", "prototype", "toString" ],
                "%ObjProto_valueOf%": [ "Object", "prototype", "valueOf" ],
                "%PromisePrototype%": [ "Promise", "prototype" ],
                "%PromiseProto_then%": [ "Promise", "prototype", "then" ],
                "%Promise_all%": [ "Promise", "all" ],
                "%Promise_reject%": [ "Promise", "reject" ],
                "%Promise_resolve%": [ "Promise", "resolve" ],
                "%RangeErrorPrototype%": [ "RangeError", "prototype" ],
                "%ReferenceErrorPrototype%": [ "ReferenceError", "prototype" ],
                "%RegExpPrototype%": [ "RegExp", "prototype" ],
                "%SetPrototype%": [ "Set", "prototype" ],
                "%SharedArrayBufferPrototype%": [ "SharedArrayBuffer", "prototype" ],
                "%StringPrototype%": [ "String", "prototype" ],
                "%SymbolPrototype%": [ "Symbol", "prototype" ],
                "%SyntaxErrorPrototype%": [ "SyntaxError", "prototype" ],
                "%TypedArrayPrototype%": [ "TypedArray", "prototype" ],
                "%TypeErrorPrototype%": [ "TypeError", "prototype" ],
                "%Uint8ArrayPrototype%": [ "Uint8Array", "prototype" ],
                "%Uint8ClampedArrayPrototype%": [ "Uint8ClampedArray", "prototype" ],
                "%Uint16ArrayPrototype%": [ "Uint16Array", "prototype" ],
                "%Uint32ArrayPrototype%": [ "Uint32Array", "prototype" ],
                "%URIErrorPrototype%": [ "URIError", "prototype" ],
                "%WeakMapPrototype%": [ "WeakMap", "prototype" ],
                "%WeakSetPrototype%": [ "WeakSet", "prototype" ]
            }, S = r(743), _ = r(957), T = S.call(Function.call, Array.prototype.concat), I = S.call(Function.apply, Array.prototype.splice), L = S.call(Function.call, String.prototype.replace), A = S.call(Function.call, String.prototype.slice), R = S.call(Function.call, RegExp.prototype.exec), P = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, C = /\\(\\)?/g, j = function(e, t) {
                var r, n = e;
                if (_(E, n) && (n = "%" + (r = E[n])[0] + "%"), _(x, n)) {
                    var o = x[n];
                    if (o === b && (o = O(n)), void 0 === o && !t) throw new c("intrinsic " + e + " exists, but is not available. Please file an issue!");
                    return {
                        alias: r,
                        name: n,
                        value: o
                    };
                }
                throw new u("intrinsic " + e + " does not exist!");
            };
            e.exports = function(e, t) {
                if ("string" != typeof e || 0 === e.length) throw new c("intrinsic name must be a non-empty string");
                if (arguments.length > 1 && "boolean" != typeof t) throw new c('"allowMissing" argument must be a boolean');
                if (null === R(/^%?[^%]*%?$/, e)) throw new u("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
                var r = function(e) {
                    var t = A(e, 0, 1), r = A(e, -1);
                    if ("%" === t && "%" !== r) throw new u("invalid intrinsic syntax, expected closing `%`");
                    if ("%" === r && "%" !== t) throw new u("invalid intrinsic syntax, expected opening `%`");
                    var n = [];
                    return L(e, P, (function(e, t, r, o) {
                        n[n.length] = r ? L(o, C, "$1") : t || e;
                    })), n;
                }(e), n = r.length > 0 ? r[0] : "", o = j("%" + n + "%", t), i = o.name, a = o.value, s = !1, l = o.alias;
                l && (n = l[0], I(r, T([ 0, 1 ], l)));
                for (var f = 1, p = !0; f < r.length; f += 1) {
                    var h = r[f], m = A(h, 0, 1), g = A(h, -1);
                    if (('"' === m || "'" === m || "`" === m || '"' === g || "'" === g || "`" === g) && m !== g) throw new u("property names with quotes must have matching quotes");
                    if ("constructor" !== h && p || (s = !0), _(x, i = "%" + (n += "." + h) + "%")) a = x[i]; else if (null != a) {
                        if (!(h in a)) {
                            if (!t) throw new c("base intrinsic for " + e + " exists, but the property is not available.");
                            return;
                        }
                        if (d && f + 1 >= r.length) {
                            var y = d(a, h);
                            a = (p = !!y) && "get" in y && !("originalValue" in y.get) ? y.get : a[h];
                        } else p = _(a, h), a = a[h];
                        p && !s && (x[i] = a);
                    }
                }
                return a;
            };
        },
        795: (e, t, r) => {
            "use strict";
            var n = r(453)("%Object.getOwnPropertyDescriptor%", !0);
            if (n) try {
                n([], "length");
            } catch (e) {
                n = null;
            }
            e.exports = n;
        },
        592: (e, t, r) => {
            "use strict";
            var n = r(655), o = function() {
                return !!n;
            };
            o.hasArrayLengthDefineBug = function() {
                if (!n) return null;
                try {
                    return 1 !== n([], "length", {
                        value: 1
                    }).length;
                } catch (e) {
                    return !0;
                }
            }, e.exports = o;
        },
        24: e => {
            "use strict";
            var t = {
                __proto__: null,
                foo: {}
            }, r = Object;
            e.exports = function() {
                return {
                    __proto__: t
                }.foo === t.foo && !(t instanceof r);
            };
        },
        39: (e, t, r) => {
            "use strict";
            var n = "undefined" != typeof Symbol && Symbol, o = r(333);
            e.exports = function() {
                return "function" == typeof n && ("function" == typeof Symbol && ("symbol" == typeof n("foo") && ("symbol" == typeof Symbol("bar") && o())));
            };
        },
        333: e => {
            "use strict";
            e.exports = function() {
                if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
                if ("symbol" == typeof Symbol.iterator) return !0;
                var e = {}, t = Symbol("test"), r = Object(t);
                if ("string" == typeof t) return !1;
                if ("[object Symbol]" !== Object.prototype.toString.call(t)) return !1;
                if ("[object Symbol]" !== Object.prototype.toString.call(r)) return !1;
                for (t in e[t] = 42, e) return !1;
                if ("function" == typeof Object.keys && 0 !== Object.keys(e).length) return !1;
                if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length) return !1;
                var n = Object.getOwnPropertySymbols(e);
                if (1 !== n.length || n[0] !== t) return !1;
                if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
                if ("function" == typeof Object.getOwnPropertyDescriptor) {
                    var o = Object.getOwnPropertyDescriptor(e, t);
                    if (42 !== o.value || !0 !== o.enumerable) return !1;
                }
                return !0;
            };
        },
        957: (e, t, r) => {
            "use strict";
            var n = Function.prototype.call, o = Object.prototype.hasOwnProperty, i = r(743);
            e.exports = i.call(n, o);
        },
        859: (e, t, r) => {
            var n = "function" == typeof Map && Map.prototype, o = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, i = n && o && "function" == typeof o.get ? o.get : null, a = n && Map.prototype.forEach, s = "function" == typeof Set && Set.prototype, u = Object.getOwnPropertyDescriptor && s ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, c = s && u && "function" == typeof u.get ? u.get : null, l = s && Set.prototype.forEach, f = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null, p = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null, d = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null, h = Boolean.prototype.valueOf, m = Object.prototype.toString, g = Function.prototype.toString, y = String.prototype.match, v = String.prototype.slice, b = String.prototype.replace, w = String.prototype.toUpperCase, x = String.prototype.toLowerCase, k = RegExp.prototype.test, O = Array.prototype.concat, E = Array.prototype.join, S = Array.prototype.slice, _ = Math.floor, T = "function" == typeof BigInt ? BigInt.prototype.valueOf : null, I = Object.getOwnPropertySymbols, L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null, A = "function" == typeof Symbol && "object" == typeof Symbol.iterator, R = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === A || "symbol") ? Symbol.toStringTag : null, P = Object.prototype.propertyIsEnumerable, C = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
                return e.__proto__;
            } : null);
            function j(e, t) {
                if (e === 1 / 0 || e === -1 / 0 || e != e || e && e > -1e3 && e < 1e3 || k.call(/e/, t)) return t;
                var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
                if ("number" == typeof e) {
                    var n = e < 0 ? -_(-e) : _(e);
                    if (n !== e) {
                        var o = String(n), i = v.call(t, o.length + 1);
                        return b.call(o, r, "$&_") + "." + b.call(b.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
                    }
                }
                return b.call(t, r, "$&_");
            }
            var N = r(634), U = N.custom, M = $(U) ? U : null;
            function D(e, t, r) {
                var n = "double" === (r.quoteStyle || t) ? '"' : "'";
                return n + e + n;
            }
            function F(e) {
                return b.call(String(e), /"/g, "&quot;");
            }
            function V(e) {
                return !("[object Array]" !== G(e) || R && "object" == typeof e && R in e);
            }
            function q(e) {
                return !("[object RegExp]" !== G(e) || R && "object" == typeof e && R in e);
            }
            function $(e) {
                if (A) return e && "object" == typeof e && e instanceof Symbol;
                if ("symbol" == typeof e) return !0;
                if (!e || "object" != typeof e || !L) return !1;
                try {
                    return L.call(e), !0;
                } catch (e) {}
                return !1;
            }
            e.exports = function e(t, n, o, s) {
                var u = n || {};
                if (H(u, "quoteStyle") && "single" !== u.quoteStyle && "double" !== u.quoteStyle) throw new TypeError('option "quoteStyle" must be "single" or "double"');
                if (H(u, "maxStringLength") && ("number" == typeof u.maxStringLength ? u.maxStringLength < 0 && u.maxStringLength !== 1 / 0 : null !== u.maxStringLength)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
                var m = !H(u, "customInspect") || u.customInspect;
                if ("boolean" != typeof m && "symbol" !== m) throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
                if (H(u, "indent") && null !== u.indent && "\t" !== u.indent && !(parseInt(u.indent, 10) === u.indent && u.indent > 0)) throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
                if (H(u, "numericSeparator") && "boolean" != typeof u.numericSeparator) throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
                var w = u.numericSeparator;
                if (void 0 === t) return "undefined";
                if (null === t) return "null";
                if ("boolean" == typeof t) return t ? "true" : "false";
                if ("string" == typeof t) return W(t, u);
                if ("number" == typeof t) {
                    if (0 === t) return 1 / 0 / t > 0 ? "0" : "-0";
                    var k = String(t);
                    return w ? j(t, k) : k;
                }
                if ("bigint" == typeof t) {
                    var _ = String(t) + "n";
                    return w ? j(t, _) : _;
                }
                var I = void 0 === u.depth ? 5 : u.depth;
                if (void 0 === o && (o = 0), o >= I && I > 0 && "object" == typeof t) return V(t) ? "[Array]" : "[Object]";
                var U = function(e, t) {
                    var r;
                    if ("\t" === e.indent) r = "\t"; else {
                        if (!("number" == typeof e.indent && e.indent > 0)) return null;
                        r = E.call(Array(e.indent + 1), " ");
                    }
                    return {
                        base: r,
                        prev: E.call(Array(t + 1), r)
                    };
                }(u, o);
                if (void 0 === s) s = []; else if (z(s, t) >= 0) return "[Circular]";
                function B(t, r, n) {
                    if (r && (s = S.call(s)).push(r), n) {
                        var i = {
                            depth: u.depth
                        };
                        return H(u, "quoteStyle") && (i.quoteStyle = u.quoteStyle), e(t, i, o + 1, s);
                    }
                    return e(t, u, o + 1, s);
                }
                if ("function" == typeof t && !q(t)) {
                    var Y = function(e) {
                        if (e.name) return e.name;
                        var t = y.call(g.call(e), /^function\s*([\w$]+)/);
                        if (t) return t[1];
                        return null;
                    }(t), ee = Z(t, B);
                    return "[Function" + (Y ? ": " + Y : " (anonymous)") + "]" + (ee.length > 0 ? " { " + E.call(ee, ", ") + " }" : "");
                }
                if ($(t)) {
                    var te = A ? b.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : L.call(t);
                    return "object" != typeof t || A ? te : Q(te);
                }
                if (function(e) {
                    if (!e || "object" != typeof e) return !1;
                    if ("undefined" != typeof HTMLElement && e instanceof HTMLElement) return !0;
                    return "string" == typeof e.nodeName && "function" == typeof e.getAttribute;
                }(t)) {
                    for (var re = "<" + x.call(String(t.nodeName)), ne = t.attributes || [], oe = 0; oe < ne.length; oe++) re += " " + ne[oe].name + "=" + D(F(ne[oe].value), "double", u);
                    return re += ">", t.childNodes && t.childNodes.length && (re += "..."), re += "</" + x.call(String(t.nodeName)) + ">";
                }
                if (V(t)) {
                    if (0 === t.length) return "[]";
                    var ie = Z(t, B);
                    return U && !function(e) {
                        for (var t = 0; t < e.length; t++) if (z(e[t], "\n") >= 0) return !1;
                        return !0;
                    }(ie) ? "[" + X(ie, U) + "]" : "[ " + E.call(ie, ", ") + " ]";
                }
                if (function(e) {
                    return !("[object Error]" !== G(e) || R && "object" == typeof e && R in e);
                }(t)) {
                    var ae = Z(t, B);
                    return "cause" in Error.prototype || !("cause" in t) || P.call(t, "cause") ? 0 === ae.length ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + E.call(ae, ", ") + " }" : "{ [" + String(t) + "] " + E.call(O.call("[cause]: " + B(t.cause), ae), ", ") + " }";
                }
                if ("object" == typeof t && m) {
                    if (M && "function" == typeof t[M] && N) return N(t, {
                        depth: I - o
                    });
                    if ("symbol" !== m && "function" == typeof t.inspect) return t.inspect();
                }
                if (function(e) {
                    if (!i || !e || "object" != typeof e) return !1;
                    try {
                        i.call(e);
                        try {
                            c.call(e);
                        } catch (e) {
                            return !0;
                        }
                        return e instanceof Map;
                    } catch (e) {}
                    return !1;
                }(t)) {
                    var se = [];
                    return a && a.call(t, (function(e, r) {
                        se.push(B(r, t, !0) + " => " + B(e, t));
                    })), J("Map", i.call(t), se, U);
                }
                if (function(e) {
                    if (!c || !e || "object" != typeof e) return !1;
                    try {
                        c.call(e);
                        try {
                            i.call(e);
                        } catch (e) {
                            return !0;
                        }
                        return e instanceof Set;
                    } catch (e) {}
                    return !1;
                }(t)) {
                    var ue = [];
                    return l && l.call(t, (function(e) {
                        ue.push(B(e, t));
                    })), J("Set", c.call(t), ue, U);
                }
                if (function(e) {
                    if (!f || !e || "object" != typeof e) return !1;
                    try {
                        f.call(e, f);
                        try {
                            p.call(e, p);
                        } catch (e) {
                            return !0;
                        }
                        return e instanceof WeakMap;
                    } catch (e) {}
                    return !1;
                }(t)) return K("WeakMap");
                if (function(e) {
                    if (!p || !e || "object" != typeof e) return !1;
                    try {
                        p.call(e, p);
                        try {
                            f.call(e, f);
                        } catch (e) {
                            return !0;
                        }
                        return e instanceof WeakSet;
                    } catch (e) {}
                    return !1;
                }(t)) return K("WeakSet");
                if (function(e) {
                    if (!d || !e || "object" != typeof e) return !1;
                    try {
                        return d.call(e), !0;
                    } catch (e) {}
                    return !1;
                }(t)) return K("WeakRef");
                if (function(e) {
                    return !("[object Number]" !== G(e) || R && "object" == typeof e && R in e);
                }(t)) return Q(B(Number(t)));
                if (function(e) {
                    if (!e || "object" != typeof e || !T) return !1;
                    try {
                        return T.call(e), !0;
                    } catch (e) {}
                    return !1;
                }(t)) return Q(B(T.call(t)));
                if (function(e) {
                    return !("[object Boolean]" !== G(e) || R && "object" == typeof e && R in e);
                }(t)) return Q(h.call(t));
                if (function(e) {
                    return !("[object String]" !== G(e) || R && "object" == typeof e && R in e);
                }(t)) return Q(B(String(t)));
                if ("undefined" != typeof window && t === window) return "{ [object Window] }";
                if (t === r.g) return "{ [object globalThis] }";
                if (!function(e) {
                    return !("[object Date]" !== G(e) || R && "object" == typeof e && R in e);
                }(t) && !q(t)) {
                    var ce = Z(t, B), le = C ? C(t) === Object.prototype : t instanceof Object || t.constructor === Object, fe = t instanceof Object ? "" : "null prototype", pe = !le && R && Object(t) === t && R in t ? v.call(G(t), 8, -1) : fe ? "Object" : "", de = (le || "function" != typeof t.constructor ? "" : t.constructor.name ? t.constructor.name + " " : "") + (pe || fe ? "[" + E.call(O.call([], pe || [], fe || []), ": ") + "] " : "");
                    return 0 === ce.length ? de + "{}" : U ? de + "{" + X(ce, U) + "}" : de + "{ " + E.call(ce, ", ") + " }";
                }
                return String(t);
            };
            var B = Object.prototype.hasOwnProperty || function(e) {
                return e in this;
            };
            function H(e, t) {
                return B.call(e, t);
            }
            function G(e) {
                return m.call(e);
            }
            function z(e, t) {
                if (e.indexOf) return e.indexOf(t);
                for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
                return -1;
            }
            function W(e, t) {
                if (e.length > t.maxStringLength) {
                    var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
                    return W(v.call(e, 0, t.maxStringLength), t) + n;
                }
                return D(b.call(b.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Y), "single", t);
            }
            function Y(e) {
                var t = e.charCodeAt(0), r = {
                    8: "b",
                    9: "t",
                    10: "n",
                    12: "f",
                    13: "r"
                }[t];
                return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + w.call(t.toString(16));
            }
            function Q(e) {
                return "Object(" + e + ")";
            }
            function K(e) {
                return e + " { ? }";
            }
            function J(e, t, r, n) {
                return e + " (" + t + ") {" + (n ? X(r, n) : E.call(r, ", ")) + "}";
            }
            function X(e, t) {
                if (0 === e.length) return "";
                var r = "\n" + t.prev + t.base;
                return r + E.call(e, "," + r) + "\n" + t.prev;
            }
            function Z(e, t) {
                var r = V(e), n = [];
                if (r) {
                    n.length = e.length;
                    for (var o = 0; o < e.length; o++) n[o] = H(e, o) ? t(e[o], e) : "";
                }
                var i, a = "function" == typeof I ? I(e) : [];
                if (A) {
                    i = {};
                    for (var s = 0; s < a.length; s++) i["$" + a[s]] = a[s];
                }
                for (var u in e) H(e, u) && (r && String(Number(u)) === u && u < e.length || A && i["$" + u] instanceof Symbol || (k.call(/[^\w$]/, u) ? n.push(t(u, e) + ": " + t(e[u], e)) : n.push(u + ": " + t(e[u], e))));
                if ("function" == typeof I) for (var c = 0; c < a.length; c++) P.call(e, a[c]) && n.push("[" + t(a[c]) + "]: " + t(e[a[c]], e));
                return n;
            }
        },
        765: e => {
            "use strict";
            var t = String.prototype.replace, r = /%20/g, n = "RFC1738", o = "RFC3986";
            e.exports = {
                default: o,
                formatters: {
                    RFC1738: function(e) {
                        return t.call(e, r, "+");
                    },
                    RFC3986: function(e) {
                        return String(e);
                    }
                },
                RFC1738: n,
                RFC3986: o
            };
        },
        373: (e, t, r) => {
            "use strict";
            var n = r(636), o = r(642), i = r(765);
            e.exports = {
                formats: i,
                parse: o,
                stringify: n
            };
        },
        642: (e, t, r) => {
            "use strict";
            var n = r(720), o = Object.prototype.hasOwnProperty, i = Array.isArray, a = {
                allowDots: !1,
                allowEmptyArrays: !1,
                allowPrototypes: !1,
                allowSparse: !1,
                arrayLimit: 20,
                charset: "utf-8",
                charsetSentinel: !1,
                comma: !1,
                decodeDotInKeys: !0,
                decoder: n.decode,
                delimiter: "&",
                depth: 5,
                duplicates: "combine",
                ignoreQueryPrefix: !1,
                interpretNumericEntities: !1,
                parameterLimit: 1e3,
                parseArrays: !0,
                plainObjects: !1,
                strictNullHandling: !1
            }, s = function(e) {
                return e.replace(/&#(\d+);/g, (function(e, t) {
                    return String.fromCharCode(parseInt(t, 10));
                }));
            }, u = function(e, t) {
                return e && "string" == typeof e && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
            }, c = function(e, t, r, n) {
                if (e) {
                    var i = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, a = /(\[[^[\]]*])/g, s = r.depth > 0 && /(\[[^[\]]*])/.exec(i), c = s ? i.slice(0, s.index) : i, l = [];
                    if (c) {
                        if (!r.plainObjects && o.call(Object.prototype, c) && !r.allowPrototypes) return;
                        l.push(c);
                    }
                    for (var f = 0; r.depth > 0 && null !== (s = a.exec(i)) && f < r.depth; ) {
                        if (f += 1, !r.plainObjects && o.call(Object.prototype, s[1].slice(1, -1)) && !r.allowPrototypes) return;
                        l.push(s[1]);
                    }
                    return s && l.push("[" + i.slice(s.index) + "]"), function(e, t, r, n) {
                        for (var o = n ? t : u(t, r), i = e.length - 1; i >= 0; --i) {
                            var a, s = e[i];
                            if ("[]" === s && r.parseArrays) a = r.allowEmptyArrays && "" === o ? [] : [].concat(o); else {
                                a = r.plainObjects ? Object.create(null) : {};
                                var c = "[" === s.charAt(0) && "]" === s.charAt(s.length - 1) ? s.slice(1, -1) : s, l = r.decodeDotInKeys ? c.replace(/%2E/g, ".") : c, f = parseInt(l, 10);
                                r.parseArrays || "" !== l ? !isNaN(f) && s !== l && String(f) === l && f >= 0 && r.parseArrays && f <= r.arrayLimit ? (a = [])[f] = o : "__proto__" !== l && (a[l] = o) : a = {
                                    0: o
                                };
                            }
                            o = a;
                        }
                        return o;
                    }(l, t, r, n);
                }
            };
            e.exports = function(e, t) {
                var r = function(e) {
                    if (!e) return a;
                    if (void 0 !== e.allowEmptyArrays && "boolean" != typeof e.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
                    if (void 0 !== e.decodeDotInKeys && "boolean" != typeof e.decodeDotInKeys) throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
                    if (null !== e.decoder && void 0 !== e.decoder && "function" != typeof e.decoder) throw new TypeError("Decoder has to be a function.");
                    if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
                    var t = void 0 === e.charset ? a.charset : e.charset, r = void 0 === e.duplicates ? a.duplicates : e.duplicates;
                    if ("combine" !== r && "first" !== r && "last" !== r) throw new TypeError("The duplicates option must be either combine, first, or last");
                    return {
                        allowDots: void 0 === e.allowDots ? !0 === e.decodeDotInKeys || a.allowDots : !!e.allowDots,
                        allowEmptyArrays: "boolean" == typeof e.allowEmptyArrays ? !!e.allowEmptyArrays : a.allowEmptyArrays,
                        allowPrototypes: "boolean" == typeof e.allowPrototypes ? e.allowPrototypes : a.allowPrototypes,
                        allowSparse: "boolean" == typeof e.allowSparse ? e.allowSparse : a.allowSparse,
                        arrayLimit: "number" == typeof e.arrayLimit ? e.arrayLimit : a.arrayLimit,
                        charset: t,
                        charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : a.charsetSentinel,
                        comma: "boolean" == typeof e.comma ? e.comma : a.comma,
                        decodeDotInKeys: "boolean" == typeof e.decodeDotInKeys ? e.decodeDotInKeys : a.decodeDotInKeys,
                        decoder: "function" == typeof e.decoder ? e.decoder : a.decoder,
                        delimiter: "string" == typeof e.delimiter || n.isRegExp(e.delimiter) ? e.delimiter : a.delimiter,
                        depth: "number" == typeof e.depth || !1 === e.depth ? +e.depth : a.depth,
                        duplicates: r,
                        ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
                        interpretNumericEntities: "boolean" == typeof e.interpretNumericEntities ? e.interpretNumericEntities : a.interpretNumericEntities,
                        parameterLimit: "number" == typeof e.parameterLimit ? e.parameterLimit : a.parameterLimit,
                        parseArrays: !1 !== e.parseArrays,
                        plainObjects: "boolean" == typeof e.plainObjects ? e.plainObjects : a.plainObjects,
                        strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : a.strictNullHandling
                    };
                }(t);
                if ("" === e || null == e) return r.plainObjects ? Object.create(null) : {};
                for (var l = "string" == typeof e ? function(e, t) {
                    var r, c = {
                        __proto__: null
                    }, l = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, f = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, p = l.split(t.delimiter, f), d = -1, h = t.charset;
                    if (t.charsetSentinel) for (r = 0; r < p.length; ++r) 0 === p[r].indexOf("utf8=") && ("utf8=%E2%9C%93" === p[r] ? h = "utf-8" : "utf8=%26%2310003%3B" === p[r] && (h = "iso-8859-1"), 
                    d = r, r = p.length);
                    for (r = 0; r < p.length; ++r) if (r !== d) {
                        var m, g, y = p[r], v = y.indexOf("]="), b = -1 === v ? y.indexOf("=") : v + 1;
                        -1 === b ? (m = t.decoder(y, a.decoder, h, "key"), g = t.strictNullHandling ? null : "") : (m = t.decoder(y.slice(0, b), a.decoder, h, "key"), 
                        g = n.maybeMap(u(y.slice(b + 1), t), (function(e) {
                            return t.decoder(e, a.decoder, h, "value");
                        }))), g && t.interpretNumericEntities && "iso-8859-1" === h && (g = s(g)), y.indexOf("[]=") > -1 && (g = i(g) ? [ g ] : g);
                        var w = o.call(c, m);
                        w && "combine" === t.duplicates ? c[m] = n.combine(c[m], g) : w && "last" !== t.duplicates || (c[m] = g);
                    }
                    return c;
                }(e, r) : e, f = r.plainObjects ? Object.create(null) : {}, p = Object.keys(l), d = 0; d < p.length; ++d) {
                    var h = p[d], m = c(h, l[h], r, "string" == typeof e);
                    f = n.merge(f, m, r);
                }
                return !0 === r.allowSparse ? f : n.compact(f);
            };
        },
        636: (e, t, r) => {
            "use strict";
            var n = r(920), o = r(720), i = r(765), a = Object.prototype.hasOwnProperty, s = {
                brackets: function(e) {
                    return e + "[]";
                },
                comma: "comma",
                indices: function(e, t) {
                    return e + "[" + t + "]";
                },
                repeat: function(e) {
                    return e;
                }
            }, u = Array.isArray, c = Array.prototype.push, l = function(e, t) {
                c.apply(e, u(t) ? t : [ t ]);
            }, f = Date.prototype.toISOString, p = i.default, d = {
                addQueryPrefix: !1,
                allowDots: !1,
                allowEmptyArrays: !1,
                arrayFormat: "indices",
                charset: "utf-8",
                charsetSentinel: !1,
                delimiter: "&",
                encode: !0,
                encodeDotInKeys: !1,
                encoder: o.encode,
                encodeValuesOnly: !1,
                format: p,
                formatter: i.formatters[p],
                indices: !1,
                serializeDate: function(e) {
                    return f.call(e);
                },
                skipNulls: !1,
                strictNullHandling: !1
            }, h = {}, m = function e(t, r, i, a, s, c, f, p, m, g, y, v, b, w, x, k, O, E) {
                for (var S, _ = t, T = E, I = 0, L = !1; void 0 !== (T = T.get(h)) && !L; ) {
                    var A = T.get(t);
                    if (I += 1, void 0 !== A) {
                        if (A === I) throw new RangeError("Cyclic object value");
                        L = !0;
                    }
                    void 0 === T.get(h) && (I = 0);
                }
                if ("function" == typeof g ? _ = g(r, _) : _ instanceof Date ? _ = b(_) : "comma" === i && u(_) && (_ = o.maybeMap(_, (function(e) {
                    return e instanceof Date ? b(e) : e;
                }))), null === _) {
                    if (c) return m && !k ? m(r, d.encoder, O, "key", w) : r;
                    _ = "";
                }
                if ("string" == typeof (S = _) || "number" == typeof S || "boolean" == typeof S || "symbol" == typeof S || "bigint" == typeof S || o.isBuffer(_)) return m ? [ x(k ? r : m(r, d.encoder, O, "key", w)) + "=" + x(m(_, d.encoder, O, "value", w)) ] : [ x(r) + "=" + x(String(_)) ];
                var R, P = [];
                if (void 0 === _) return P;
                if ("comma" === i && u(_)) k && m && (_ = o.maybeMap(_, m)), R = [ {
                    value: _.length > 0 ? _.join(",") || null : void 0
                } ]; else if (u(g)) R = g; else {
                    var C = Object.keys(_);
                    R = y ? C.sort(y) : C;
                }
                var j = p ? r.replace(/\./g, "%2E") : r, N = a && u(_) && 1 === _.length ? j + "[]" : j;
                if (s && u(_) && 0 === _.length) return N + "[]";
                for (var U = 0; U < R.length; ++U) {
                    var M = R[U], D = "object" == typeof M && void 0 !== M.value ? M.value : _[M];
                    if (!f || null !== D) {
                        var F = v && p ? M.replace(/\./g, "%2E") : M, V = u(_) ? "function" == typeof i ? i(N, F) : N : N + (v ? "." + F : "[" + F + "]");
                        E.set(t, I);
                        var q = n();
                        q.set(h, E), l(P, e(D, V, i, a, s, c, f, p, "comma" === i && k && u(_) ? null : m, g, y, v, b, w, x, k, O, q));
                    }
                }
                return P;
            };
            e.exports = function(e, t) {
                var r, o = e, c = function(e) {
                    if (!e) return d;
                    if (void 0 !== e.allowEmptyArrays && "boolean" != typeof e.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
                    if (void 0 !== e.encodeDotInKeys && "boolean" != typeof e.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
                    if (null !== e.encoder && void 0 !== e.encoder && "function" != typeof e.encoder) throw new TypeError("Encoder has to be a function.");
                    var t = e.charset || d.charset;
                    if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
                    var r = i.default;
                    if (void 0 !== e.format) {
                        if (!a.call(i.formatters, e.format)) throw new TypeError("Unknown format option provided.");
                        r = e.format;
                    }
                    var n, o = i.formatters[r], c = d.filter;
                    if (("function" == typeof e.filter || u(e.filter)) && (c = e.filter), n = e.arrayFormat in s ? e.arrayFormat : "indices" in e ? e.indices ? "indices" : "repeat" : d.arrayFormat, 
                    "commaRoundTrip" in e && "boolean" != typeof e.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
                    var l = void 0 === e.allowDots ? !0 === e.encodeDotInKeys || d.allowDots : !!e.allowDots;
                    return {
                        addQueryPrefix: "boolean" == typeof e.addQueryPrefix ? e.addQueryPrefix : d.addQueryPrefix,
                        allowDots: l,
                        allowEmptyArrays: "boolean" == typeof e.allowEmptyArrays ? !!e.allowEmptyArrays : d.allowEmptyArrays,
                        arrayFormat: n,
                        charset: t,
                        charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : d.charsetSentinel,
                        commaRoundTrip: e.commaRoundTrip,
                        delimiter: void 0 === e.delimiter ? d.delimiter : e.delimiter,
                        encode: "boolean" == typeof e.encode ? e.encode : d.encode,
                        encodeDotInKeys: "boolean" == typeof e.encodeDotInKeys ? e.encodeDotInKeys : d.encodeDotInKeys,
                        encoder: "function" == typeof e.encoder ? e.encoder : d.encoder,
                        encodeValuesOnly: "boolean" == typeof e.encodeValuesOnly ? e.encodeValuesOnly : d.encodeValuesOnly,
                        filter: c,
                        format: r,
                        formatter: o,
                        serializeDate: "function" == typeof e.serializeDate ? e.serializeDate : d.serializeDate,
                        skipNulls: "boolean" == typeof e.skipNulls ? e.skipNulls : d.skipNulls,
                        sort: "function" == typeof e.sort ? e.sort : null,
                        strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : d.strictNullHandling
                    };
                }(t);
                "function" == typeof c.filter ? o = (0, c.filter)("", o) : u(c.filter) && (r = c.filter);
                var f = [];
                if ("object" != typeof o || null === o) return "";
                var p = s[c.arrayFormat], h = "comma" === p && c.commaRoundTrip;
                r || (r = Object.keys(o)), c.sort && r.sort(c.sort);
                for (var g = n(), y = 0; y < r.length; ++y) {
                    var v = r[y];
                    c.skipNulls && null === o[v] || l(f, m(o[v], v, p, h, c.allowEmptyArrays, c.strictNullHandling, c.skipNulls, c.encodeDotInKeys, c.encode ? c.encoder : null, c.filter, c.sort, c.allowDots, c.serializeDate, c.format, c.formatter, c.encodeValuesOnly, c.charset, g));
                }
                var b = f.join(c.delimiter), w = !0 === c.addQueryPrefix ? "?" : "";
                return c.charsetSentinel && ("iso-8859-1" === c.charset ? w += "utf8=%26%2310003%3B&" : w += "utf8=%E2%9C%93&"), 
                b.length > 0 ? w + b : "";
            };
        },
        720: (e, t, r) => {
            "use strict";
            var n = r(765), o = Object.prototype.hasOwnProperty, i = Array.isArray, a = function() {
                for (var e = [], t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
                return e;
            }(), s = function(e, t) {
                for (var r = t && t.plainObjects ? Object.create(null) : {}, n = 0; n < e.length; ++n) void 0 !== e[n] && (r[n] = e[n]);
                return r;
            };
            e.exports = {
                arrayToObject: s,
                assign: function(e, t) {
                    return Object.keys(t).reduce((function(e, r) {
                        return e[r] = t[r], e;
                    }), e);
                },
                combine: function(e, t) {
                    return [].concat(e, t);
                },
                compact: function(e) {
                    for (var t = [ {
                        obj: {
                            o: e
                        },
                        prop: "o"
                    } ], r = [], n = 0; n < t.length; ++n) for (var o = t[n], a = o.obj[o.prop], s = Object.keys(a), u = 0; u < s.length; ++u) {
                        var c = s[u], l = a[c];
                        "object" == typeof l && null !== l && -1 === r.indexOf(l) && (t.push({
                            obj: a,
                            prop: c
                        }), r.push(l));
                    }
                    return function(e) {
                        for (;e.length > 1; ) {
                            var t = e.pop(), r = t.obj[t.prop];
                            if (i(r)) {
                                for (var n = [], o = 0; o < r.length; ++o) void 0 !== r[o] && n.push(r[o]);
                                t.obj[t.prop] = n;
                            }
                        }
                    }(t), e;
                },
                decode: function(e, t, r) {
                    var n = e.replace(/\+/g, " ");
                    if ("iso-8859-1" === r) return n.replace(/%[0-9a-f]{2}/gi, unescape);
                    try {
                        return decodeURIComponent(n);
                    } catch (e) {
                        return n;
                    }
                },
                encode: function(e, t, r, o, i) {
                    if (0 === e.length) return e;
                    var s = e;
                    if ("symbol" == typeof e ? s = Symbol.prototype.toString.call(e) : "string" != typeof e && (s = String(e)), 
                    "iso-8859-1" === r) return escape(s).replace(/%u[0-9a-f]{4}/gi, (function(e) {
                        return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
                    }));
                    for (var u = "", c = 0; c < s.length; ++c) {
                        var l = s.charCodeAt(c);
                        45 === l || 46 === l || 95 === l || 126 === l || l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122 || i === n.RFC1738 && (40 === l || 41 === l) ? u += s.charAt(c) : l < 128 ? u += a[l] : l < 2048 ? u += a[192 | l >> 6] + a[128 | 63 & l] : l < 55296 || l >= 57344 ? u += a[224 | l >> 12] + a[128 | l >> 6 & 63] + a[128 | 63 & l] : (c += 1, 
                        l = 65536 + ((1023 & l) << 10 | 1023 & s.charCodeAt(c)), u += a[240 | l >> 18] + a[128 | l >> 12 & 63] + a[128 | l >> 6 & 63] + a[128 | 63 & l]);
                    }
                    return u;
                },
                isBuffer: function(e) {
                    return !(!e || "object" != typeof e) && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
                },
                isRegExp: function(e) {
                    return "[object RegExp]" === Object.prototype.toString.call(e);
                },
                maybeMap: function(e, t) {
                    if (i(e)) {
                        for (var r = [], n = 0; n < e.length; n += 1) r.push(t(e[n]));
                        return r;
                    }
                    return t(e);
                },
                merge: function e(t, r, n) {
                    if (!r) return t;
                    if ("object" != typeof r) {
                        if (i(t)) t.push(r); else {
                            if (!t || "object" != typeof t) return [ t, r ];
                            (n && (n.plainObjects || n.allowPrototypes) || !o.call(Object.prototype, r)) && (t[r] = !0);
                        }
                        return t;
                    }
                    if (!t || "object" != typeof t) return [ t ].concat(r);
                    var a = t;
                    return i(t) && !i(r) && (a = s(t, n)), i(t) && i(r) ? (r.forEach((function(r, i) {
                        if (o.call(t, i)) {
                            var a = t[i];
                            a && "object" == typeof a && r && "object" == typeof r ? t[i] = e(a, r, n) : t.push(r);
                        } else t[i] = r;
                    })), t) : Object.keys(r).reduce((function(t, i) {
                        var a = r[i];
                        return o.call(t, i) ? t[i] = e(t[i], a, n) : t[i] = a, t;
                    }), a);
                }
            };
        },
        930: e => {
            "use strict";
            function t(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }
            e.exports = function(e, n, o, i) {
                n = n || "&", o = o || "=";
                var a = {};
                if ("string" != typeof e || 0 === e.length) return a;
                var s = /\+/g;
                e = e.split(n);
                var u = 1e3;
                i && "number" == typeof i.maxKeys && (u = i.maxKeys);
                var c = e.length;
                u > 0 && c > u && (c = u);
                for (var l = 0; l < c; ++l) {
                    var f, p, d, h, m = e[l].replace(s, "%20"), g = m.indexOf(o);
                    g >= 0 ? (f = m.substr(0, g), p = m.substr(g + 1)) : (f = m, p = ""), d = decodeURIComponent(f), 
                    h = decodeURIComponent(p), t(a, d) ? r(a[d]) ? a[d].push(h) : a[d] = [ a[d], h ] : a[d] = h;
                }
                return a;
            };
            var r = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            };
        },
        590: e => {
            "use strict";
            var t = function(e) {
                switch (typeof e) {
                  case "string":
                    return e;

                  case "boolean":
                    return e ? "true" : "false";

                  case "number":
                    return isFinite(e) ? e : "";

                  default:
                    return "";
                }
            };
            e.exports = function(e, i, a, s) {
                return i = i || "&", a = a || "=", null === e && (e = void 0), "object" == typeof e ? n(o(e), (function(o) {
                    var s = encodeURIComponent(t(o)) + a;
                    return r(e[o]) ? n(e[o], (function(e) {
                        return s + encodeURIComponent(t(e));
                    })).join(i) : s + encodeURIComponent(t(e[o]));
                })).join(i) : s ? encodeURIComponent(t(s)) + a + encodeURIComponent(t(e)) : "";
            };
            var r = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            };
            function n(e, t) {
                if (e.map) return e.map(t);
                for (var r = [], n = 0; n < e.length; n++) r.push(t(e[n], n));
                return r;
            }
            var o = Object.keys || function(e) {
                var t = [];
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
                return t;
            };
        },
        894: (e, t, r) => {
            "use strict";
            t.decode = t.parse = r(930), t.encode = t.stringify = r(590);
        },
        334: e => {
            "use strict";
            function t(e, r) {
                var n;
                return n = Array.isArray(e) ? [] : {}, r.push(e), Object.keys(e).forEach((function(o) {
                    var i = e[o];
                    "function" != typeof i && (i && "object" == typeof i ? -1 !== r.indexOf(e[o]) ? n[o] = "[Circular]" : n[o] = t(e[o], r.slice(0)) : n[o] = i);
                })), "string" == typeof e.name && (n.name = e.name), "string" == typeof e.message && (n.message = e.message), 
                "string" == typeof e.stack && (n.stack = e.stack), n;
            }
            e.exports = function(e) {
                return "object" == typeof e ? t(e, []) : "function" == typeof e ? "[Function: " + (e.name || "anonymous") + "]" : e;
            };
        },
        897: (e, t, r) => {
            "use strict";
            var n = r(453), o = r(41), i = r(592)(), a = r(795), s = r(675), u = n("%Math.floor%");
            e.exports = function(e, t) {
                if ("function" != typeof e) throw new s("`fn` is not a function");
                if ("number" != typeof t || t < 0 || t > 4294967295 || u(t) !== t) throw new s("`length` must be a positive 32-bit integer");
                var r = arguments.length > 2 && !!arguments[2], n = !0, c = !0;
                if ("length" in e && a) {
                    var l = a(e, "length");
                    l && !l.configurable && (n = !1), l && !l.writable && (c = !1);
                }
                return (n || c || !r) && (i ? o(e, "length", t, !0, !0) : o(e, "length", t)), e;
            };
        },
        920: (e, t, r) => {
            "use strict";
            var n = r(453), o = r(75), i = r(859), a = r(675), s = n("%WeakMap%", !0), u = n("%Map%", !0), c = o("WeakMap.prototype.get", !0), l = o("WeakMap.prototype.set", !0), f = o("WeakMap.prototype.has", !0), p = o("Map.prototype.get", !0), d = o("Map.prototype.set", !0), h = o("Map.prototype.has", !0), m = function(e, t) {
                for (var r, n = e; null !== (r = n.next); n = r) if (r.key === t) return n.next = r.next, 
                r.next = e.next, e.next = r, r;
            };
            e.exports = function() {
                var e, t, r, n = {
                    assert: function(e) {
                        if (!n.has(e)) throw new a("Side channel does not contain " + i(e));
                    },
                    get: function(n) {
                        if (s && n && ("object" == typeof n || "function" == typeof n)) {
                            if (e) return c(e, n);
                        } else if (u) {
                            if (t) return p(t, n);
                        } else if (r) return function(e, t) {
                            var r = m(e, t);
                            return r && r.value;
                        }(r, n);
                    },
                    has: function(n) {
                        if (s && n && ("object" == typeof n || "function" == typeof n)) {
                            if (e) return f(e, n);
                        } else if (u) {
                            if (t) return h(t, n);
                        } else if (r) return function(e, t) {
                            return !!m(e, t);
                        }(r, n);
                        return !1;
                    },
                    set: function(n, o) {
                        s && n && ("object" == typeof n || "function" == typeof n) ? (e || (e = new s), 
                        l(e, n, o)) : u ? (t || (t = new u), d(t, n, o)) : (r || (r = {
                            key: {},
                            next: null
                        }), function(e, t, r) {
                            var n = m(e, t);
                            n ? n.value = r : e.next = {
                                key: t,
                                next: e.next,
                                value: r
                            };
                        }(r, n, o));
                    }
                };
                return n;
            };
        },
        270: function(e, t, r) {
            var n;
            e = r.nmd(e), function(o) {
                t && t.nodeType, e && e.nodeType;
                var i = "object" == typeof r.g && r.g;
                i.global !== i && i.window !== i && i.self;
                var a, s = 2147483647, u = 36, c = 1, l = 26, f = 38, p = 700, d = 72, h = 128, m = "-", g = /^xn--/, y = /[^\x20-\x7E]/, v = /[\x2E\u3002\uFF0E\uFF61]/g, b = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, w = u - c, x = Math.floor, k = String.fromCharCode;
                function O(e) {
                    throw new RangeError(b[e]);
                }
                function E(e, t) {
                    for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
                    return n;
                }
                function S(e, t) {
                    var r = e.split("@"), n = "";
                    return r.length > 1 && (n = r[0] + "@", e = r[1]), n + E((e = e.replace(v, ".")).split("."), t).join(".");
                }
                function _(e) {
                    for (var t, r, n = [], o = 0, i = e.length; o < i; ) (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i ? 56320 == (64512 & (r = e.charCodeAt(o++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), 
                    o--) : n.push(t);
                    return n;
                }
                function T(e) {
                    return E(e, (function(e) {
                        var t = "";
                        return e > 65535 && (t += k((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), 
                        t += k(e);
                    })).join("");
                }
                function I(e, t) {
                    return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
                }
                function L(e, t, r) {
                    var n = 0;
                    for (e = r ? x(e / p) : e >> 1, e += x(e / t); e > w * l >> 1; n += u) e = x(e / w);
                    return x(n + (w + 1) * e / (e + f));
                }
                function A(e) {
                    var t, r, n, o, i, a, f, p, g, y, v, b = [], w = e.length, k = 0, E = h, S = d;
                    for ((r = e.lastIndexOf(m)) < 0 && (r = 0), n = 0; n < r; ++n) e.charCodeAt(n) >= 128 && O("not-basic"), 
                    b.push(e.charCodeAt(n));
                    for (o = r > 0 ? r + 1 : 0; o < w; ) {
                        for (i = k, a = 1, f = u; o >= w && O("invalid-input"), ((p = (v = e.charCodeAt(o++)) - 48 < 10 ? v - 22 : v - 65 < 26 ? v - 65 : v - 97 < 26 ? v - 97 : u) >= u || p > x((s - k) / a)) && O("overflow"), 
                        k += p * a, !(p < (g = f <= S ? c : f >= S + l ? l : f - S)); f += u) a > x(s / (y = u - g)) && O("overflow"), 
                        a *= y;
                        S = L(k - i, t = b.length + 1, 0 == i), x(k / t) > s - E && O("overflow"), E += x(k / t), 
                        k %= t, b.splice(k++, 0, E);
                    }
                    return T(b);
                }
                function R(e) {
                    var t, r, n, o, i, a, f, p, g, y, v, b, w, E, S, T = [];
                    for (b = (e = _(e)).length, t = h, r = 0, i = d, a = 0; a < b; ++a) (v = e[a]) < 128 && T.push(k(v));
                    for (n = o = T.length, o && T.push(m); n < b; ) {
                        for (f = s, a = 0; a < b; ++a) (v = e[a]) >= t && v < f && (f = v);
                        for (f - t > x((s - r) / (w = n + 1)) && O("overflow"), r += (f - t) * w, t = f, 
                        a = 0; a < b; ++a) if ((v = e[a]) < t && ++r > s && O("overflow"), v == t) {
                            for (p = r, g = u; !(p < (y = g <= i ? c : g >= i + l ? l : g - i)); g += u) S = p - y, 
                            E = u - y, T.push(k(I(y + S % E, 0))), p = x(S / E);
                            T.push(k(I(p, 0))), i = L(r, w, n == o), r = 0, ++n;
                        }
                        ++r, ++t;
                    }
                    return T.join("");
                }
                a = {
                    version: "1.4.1",
                    ucs2: {
                        decode: _,
                        encode: T
                    },
                    decode: A,
                    encode: R,
                    toASCII: function(e) {
                        return S(e, (function(e) {
                            return y.test(e) ? "xn--" + R(e) : e;
                        }));
                    },
                    toUnicode: function(e) {
                        return S(e, (function(e) {
                            return g.test(e) ? A(e.slice(4).toLowerCase()) : e;
                        }));
                    }
                }, void 0 === (n = function() {
                    return a;
                }.call(t, r, t, e)) || (e.exports = n);
            }();
        },
        835: (e, t, r) => {
            "use strict";
            var n = r(270);
            function o() {
                this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, 
                this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, 
                this.path = null, this.href = null;
            }
            var i = /^([a-z0-9.+-]+:)/i, a = /:[0-9]*$/, s = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, u = [ "{", "}", "|", "\\", "^", "`" ].concat([ "<", ">", '"', "`", " ", "\r", "\n", "\t" ]), c = [ "'" ].concat(u), l = [ "%", "/", "?", ";", "#" ].concat(c), f = [ "/", "?", "#" ], p = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, h = {
                javascript: !0,
                "javascript:": !0
            }, m = {
                javascript: !0,
                "javascript:": !0
            }, g = {
                http: !0,
                https: !0,
                ftp: !0,
                gopher: !0,
                file: !0,
                "http:": !0,
                "https:": !0,
                "ftp:": !0,
                "gopher:": !0,
                "file:": !0
            }, y = r(373);
            function v(e, t, r) {
                if (e && "object" == typeof e && e instanceof o) return e;
                var n = new o;
                return n.parse(e, t, r), n;
            }
            o.prototype.parse = function(e, t, r) {
                if ("string" != typeof e) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
                var o = e.indexOf("?"), a = -1 !== o && o < e.indexOf("#") ? "?" : "#", u = e.split(a);
                u[0] = u[0].replace(/\\/g, "/");
                var v = e = u.join(a);
                if (v = v.trim(), !r && 1 === e.split("#").length) {
                    var b = s.exec(v);
                    if (b) return this.path = v, this.href = v, this.pathname = b[1], b[2] ? (this.search = b[2], 
                    this.query = t ? y.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", 
                    this.query = {}), this;
                }
                var w = i.exec(v);
                if (w) {
                    var x = (w = w[0]).toLowerCase();
                    this.protocol = x, v = v.substr(w.length);
                }
                if (r || w || v.match(/^\/\/[^@/]+@[^@/]+/)) {
                    var k = "//" === v.substr(0, 2);
                    !k || w && m[w] || (v = v.substr(2), this.slashes = !0);
                }
                if (!m[w] && (k || w && !g[w])) {
                    for (var O, E, S = -1, _ = 0; _ < f.length; _++) {
                        -1 !== (T = v.indexOf(f[_])) && (-1 === S || T < S) && (S = T);
                    }
                    -1 !== (E = -1 === S ? v.lastIndexOf("@") : v.lastIndexOf("@", S)) && (O = v.slice(0, E), 
                    v = v.slice(E + 1), this.auth = decodeURIComponent(O)), S = -1;
                    for (_ = 0; _ < l.length; _++) {
                        var T;
                        -1 !== (T = v.indexOf(l[_])) && (-1 === S || T < S) && (S = T);
                    }
                    -1 === S && (S = v.length), this.host = v.slice(0, S), v = v.slice(S), this.parseHost(), 
                    this.hostname = this.hostname || "";
                    var I = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!I) for (var L = this.hostname.split(/\./), A = (_ = 0, L.length); _ < A; _++) {
                        var R = L[_];
                        if (R && !R.match(p)) {
                            for (var P = "", C = 0, j = R.length; C < j; C++) R.charCodeAt(C) > 127 ? P += "x" : P += R[C];
                            if (!P.match(p)) {
                                var N = L.slice(0, _), U = L.slice(_ + 1), M = R.match(d);
                                M && (N.push(M[1]), U.unshift(M[2])), U.length && (v = "/" + U.join(".") + v), this.hostname = N.join(".");
                                break;
                            }
                        }
                    }
                    this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), 
                    I || (this.hostname = n.toASCII(this.hostname));
                    var D = this.port ? ":" + this.port : "", F = this.hostname || "";
                    this.host = F + D, this.href += this.host, I && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), 
                    "/" !== v[0] && (v = "/" + v));
                }
                if (!h[x]) for (_ = 0, A = c.length; _ < A; _++) {
                    var V = c[_];
                    if (-1 !== v.indexOf(V)) {
                        var q = encodeURIComponent(V);
                        q === V && (q = escape(V)), v = v.split(V).join(q);
                    }
                }
                var $ = v.indexOf("#");
                -1 !== $ && (this.hash = v.substr($), v = v.slice(0, $));
                var B = v.indexOf("?");
                if (-1 !== B ? (this.search = v.substr(B), this.query = v.substr(B + 1), t && (this.query = y.parse(this.query)), 
                v = v.slice(0, B)) : t && (this.search = "", this.query = {}), v && (this.pathname = v), 
                g[x] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                    D = this.pathname || "";
                    var H = this.search || "";
                    this.path = D + H;
                }
                return this.href = this.format(), this;
            }, o.prototype.format = function() {
                var e = this.auth || "";
                e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
                var t = this.protocol || "", r = this.pathname || "", n = this.hash || "", o = !1, i = "";
                this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), 
                this.port && (o += ":" + this.port)), this.query && "object" == typeof this.query && Object.keys(this.query).length && (i = y.stringify(this.query, {
                    arrayFormat: "repeat",
                    addQueryPrefix: !1
                }));
                var a = this.search || i && "?" + i || "";
                return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || g[t]) && !1 !== o ? (o = "//" + (o || ""), 
                r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), 
                a && "?" !== a.charAt(0) && (a = "?" + a), t + o + (r = r.replace(/[?#]/g, (function(e) {
                    return encodeURIComponent(e);
                }))) + (a = a.replace("#", "%23")) + n;
            }, o.prototype.resolve = function(e) {
                return this.resolveObject(v(e, !1, !0)).format();
            }, o.prototype.resolveObject = function(e) {
                if ("string" == typeof e) {
                    var t = new o;
                    t.parse(e, !1, !0), e = t;
                }
                for (var r = new o, n = Object.keys(this), i = 0; i < n.length; i++) {
                    var a = n[i];
                    r[a] = this[a];
                }
                if (r.hash = e.hash, "" === e.href) return r.href = r.format(), r;
                if (e.slashes && !e.protocol) {
                    for (var s = Object.keys(e), u = 0; u < s.length; u++) {
                        var c = s[u];
                        "protocol" !== c && (r[c] = e[c]);
                    }
                    return g[r.protocol] && r.hostname && !r.pathname && (r.pathname = "/", r.path = r.pathname), 
                    r.href = r.format(), r;
                }
                if (e.protocol && e.protocol !== r.protocol) {
                    if (!g[e.protocol]) {
                        for (var l = Object.keys(e), f = 0; f < l.length; f++) {
                            var p = l[f];
                            r[p] = e[p];
                        }
                        return r.href = r.format(), r;
                    }
                    if (r.protocol = e.protocol, e.host || m[e.protocol]) r.pathname = e.pathname; else {
                        for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift()); ) ;
                        e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== d[0] && d.unshift(""), 
                        d.length < 2 && d.unshift(""), r.pathname = d.join("/");
                    }
                    if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, 
                    r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
                        var h = r.pathname || "", y = r.search || "";
                        r.path = h + y;
                    }
                    return r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
                }
                var v = r.pathname && "/" === r.pathname.charAt(0), b = e.host || e.pathname && "/" === e.pathname.charAt(0), w = b || v || r.host && e.pathname, x = w, k = r.pathname && r.pathname.split("/") || [], O = (d = e.pathname && e.pathname.split("/") || [], 
                r.protocol && !g[r.protocol]);
                if (O && (r.hostname = "", r.port = null, r.host && ("" === k[0] ? k[0] = r.host : k.unshift(r.host)), 
                r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), 
                e.host = null), w = w && ("" === d[0] || "" === k[0])), b) r.host = e.host || "" === e.host ? e.host : r.host, 
                r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, 
                r.query = e.query, k = d; else if (d.length) k || (k = []), k.pop(), k = k.concat(d), 
                r.search = e.search, r.query = e.query; else if (null != e.search) {
                    if (O) r.host = k.shift(), r.hostname = r.host, (I = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = I.shift(), 
                    r.hostname = I.shift(), r.host = r.hostname);
                    return r.search = e.search, r.query = e.query, null === r.pathname && null === r.search || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), 
                    r.href = r.format(), r;
                }
                if (!k.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, 
                r.href = r.format(), r;
                for (var E = k.slice(-1)[0], S = (r.host || e.host || k.length > 1) && ("." === E || ".." === E) || "" === E, _ = 0, T = k.length; T >= 0; T--) "." === (E = k[T]) ? k.splice(T, 1) : ".." === E ? (k.splice(T, 1), 
                _++) : _ && (k.splice(T, 1), _--);
                if (!w && !x) for (;_--; _) k.unshift("..");
                !w || "" === k[0] || k[0] && "/" === k[0].charAt(0) || k.unshift(""), S && "/" !== k.join("/").substr(-1) && k.push("");
                var I, L = "" === k[0] || k[0] && "/" === k[0].charAt(0);
                O && (r.hostname = L ? "" : k.length ? k.shift() : "", r.host = r.hostname, (I = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = I.shift(), 
                r.hostname = I.shift(), r.host = r.hostname));
                return (w = w || r.host && k.length) && !L && k.unshift(""), k.length > 0 ? r.pathname = k.join("/") : (r.pathname = null, 
                r.path = null), null === r.pathname && null === r.search || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), 
                r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), 
                r;
            }, o.prototype.parseHost = function() {
                var e = this.host, t = a.exec(e);
                t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), 
                e && (this.hostname = e);
            }, t.parse = v, t.resolve = function(e, t) {
                return v(e, !1, !0).resolve(t);
            }, t.resolveObject = function(e, t) {
                return e ? v(e, !1, !0).resolveObject(t) : t;
            }, t.format = function(e) {
                return "string" == typeof e && (e = v(e)), e instanceof o ? e.format() : o.prototype.format.call(e);
            }, t.Url = o;
        },
        937: () => {},
        634: () => {},
        633: (e, t, r) => {
            var n = r(738).default;
            function o() {
                "use strict";
                e.exports = o = function() {
                    return r;
                }, e.exports.__esModule = !0, e.exports.default = e.exports;
                var t, r = {}, i = Object.prototype, a = i.hasOwnProperty, s = Object.defineProperty || function(e, t, r) {
                    e[t] = r.value;
                }, u = "function" == typeof Symbol ? Symbol : {}, c = u.iterator || "@@iterator", l = u.asyncIterator || "@@asyncIterator", f = u.toStringTag || "@@toStringTag";
                function p(e, t, r) {
                    return Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), e[t];
                }
                try {
                    p({}, "");
                } catch (t) {
                    p = function(e, t, r) {
                        return e[t] = r;
                    };
                }
                function d(e, t, r, n) {
                    var o = t && t.prototype instanceof w ? t : w, i = Object.create(o.prototype), a = new C(n || []);
                    return s(i, "_invoke", {
                        value: L(e, r, a)
                    }), i;
                }
                function h(e, t, r) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, r)
                        };
                    } catch (e) {
                        return {
                            type: "throw",
                            arg: e
                        };
                    }
                }
                r.wrap = d;
                var m = "suspendedStart", g = "suspendedYield", y = "executing", v = "completed", b = {};
                function w() {}
                function x() {}
                function k() {}
                var O = {};
                p(O, c, (function() {
                    return this;
                }));
                var E = Object.getPrototypeOf, S = E && E(E(j([])));
                S && S !== i && a.call(S, c) && (O = S);
                var _ = k.prototype = w.prototype = Object.create(O);
                function T(e) {
                    [ "next", "throw", "return" ].forEach((function(t) {
                        p(e, t, (function(e) {
                            return this._invoke(t, e);
                        }));
                    }));
                }
                function I(e, t) {
                    function r(o, i, s, u) {
                        var c = h(e[o], e, i);
                        if ("throw" !== c.type) {
                            var l = c.arg, f = l.value;
                            return f && "object" == n(f) && a.call(f, "__await") ? t.resolve(f.__await).then((function(e) {
                                r("next", e, s, u);
                            }), (function(e) {
                                r("throw", e, s, u);
                            })) : t.resolve(f).then((function(e) {
                                l.value = e, s(l);
                            }), (function(e) {
                                return r("throw", e, s, u);
                            }));
                        }
                        u(c.arg);
                    }
                    var o;
                    s(this, "_invoke", {
                        value: function(e, n) {
                            function i() {
                                return new t((function(t, o) {
                                    r(e, n, t, o);
                                }));
                            }
                            return o = o ? o.then(i, i) : i();
                        }
                    });
                }
                function L(e, r, n) {
                    var o = m;
                    return function(i, a) {
                        if (o === y) throw Error("Generator is already running");
                        if (o === v) {
                            if ("throw" === i) throw a;
                            return {
                                value: t,
                                done: !0
                            };
                        }
                        for (n.method = i, n.arg = a; ;) {
                            var s = n.delegate;
                            if (s) {
                                var u = A(s, n);
                                if (u) {
                                    if (u === b) continue;
                                    return u;
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                                if (o === m) throw o = v, n.arg;
                                n.dispatchException(n.arg);
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            o = y;
                            var c = h(e, r, n);
                            if ("normal" === c.type) {
                                if (o = n.done ? v : g, c.arg === b) continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                };
                            }
                            "throw" === c.type && (o = v, n.method = "throw", n.arg = c.arg);
                        }
                    };
                }
                function A(e, r) {
                    var n = r.method, o = e.iterator[n];
                    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", 
                    r.arg = t, A(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", 
                    r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), b;
                    var i = h(o, e.iterator, r.arg);
                    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, 
                    b;
                    var a = i.arg;
                    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", 
                    r.arg = t), r.delegate = null, b) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), 
                    r.delegate = null, b);
                }
                function R(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), 
                    this.tryEntries.push(t);
                }
                function P(e) {
                    var t = e.completion || {};
                    t.type = "normal", delete t.arg, e.completion = t;
                }
                function C(e) {
                    this.tryEntries = [ {
                        tryLoc: "root"
                    } ], e.forEach(R, this), this.reset(!0);
                }
                function j(e) {
                    if (e || "" === e) {
                        var r = e[c];
                        if (r) return r.call(e);
                        if ("function" == typeof e.next) return e;
                        if (!isNaN(e.length)) {
                            var o = -1, i = function r() {
                                for (;++o < e.length; ) if (a.call(e, o)) return r.value = e[o], r.done = !1, r;
                                return r.value = t, r.done = !0, r;
                            };
                            return i.next = i;
                        }
                    }
                    throw new TypeError(n(e) + " is not iterable");
                }
                return x.prototype = k, s(_, "constructor", {
                    value: k,
                    configurable: !0
                }), s(k, "constructor", {
                    value: x,
                    configurable: !0
                }), x.displayName = p(k, f, "GeneratorFunction"), r.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === x || "GeneratorFunction" === (t.displayName || t.name));
                }, r.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, k) : (e.__proto__ = k, p(e, f, "GeneratorFunction")), 
                    e.prototype = Object.create(_), e;
                }, r.awrap = function(e) {
                    return {
                        __await: e
                    };
                }, T(I.prototype), p(I.prototype, l, (function() {
                    return this;
                })), r.AsyncIterator = I, r.async = function(e, t, n, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new I(d(e, t, n, o), i);
                    return r.isGeneratorFunction(t) ? a : a.next().then((function(e) {
                        return e.done ? e.value : a.next();
                    }));
                }, T(_), p(_, f, "Generator"), p(_, c, (function() {
                    return this;
                })), p(_, "toString", (function() {
                    return "[object Generator]";
                })), r.keys = function(e) {
                    var t = Object(e), r = [];
                    for (var n in t) r.push(n);
                    return r.reverse(), function e() {
                        for (;r.length; ) {
                            var n = r.pop();
                            if (n in t) return e.value = n, e.done = !1, e;
                        }
                        return e.done = !0, e;
                    };
                }, r.values = j, C.prototype = {
                    constructor: C,
                    reset: function(e) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, 
                        this.method = "next", this.arg = t, this.tryEntries.forEach(P), !e) for (var r in this) "t" === r.charAt(0) && a.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval;
                    },
                    dispatchException: function(e) {
                        if (this.done) throw e;
                        var r = this;
                        function n(n, o) {
                            return s.type = "throw", s.arg = e, r.next = n, o && (r.method = "next", r.arg = t), 
                            !!o;
                        }
                        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                            var i = this.tryEntries[o], s = i.completion;
                            if ("root" === i.tryLoc) return n("end");
                            if (i.tryLoc <= this.prev) {
                                var u = a.call(i, "catchLoc"), c = a.call(i, "finallyLoc");
                                if (u && c) {
                                    if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                                    if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                                } else if (u) {
                                    if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                                } else {
                                    if (!c) throw Error("try statement without catch or finally");
                                    if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var n = this.tryEntries[r];
                            if (n.tryLoc <= this.prev && a.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                var o = n;
                                break;
                            }
                        }
                        o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                        var i = o ? o.completion : {};
                        return i.type = e, i.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, 
                        b) : this.complete(i);
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, 
                        this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), 
                        b;
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), P(r), b;
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.tryLoc === e) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    P(r);
                                }
                                return o;
                            }
                        }
                        throw Error("illegal catch attempt");
                    },
                    delegateYield: function(e, r, n) {
                        return this.delegate = {
                            iterator: j(e),
                            resultName: r,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = t), b;
                    }
                }, r;
            }
            e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        738: e => {
            function t(r) {
                return e.exports = t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                }, e.exports.__esModule = !0, e.exports.default = e.exports, t(r);
            }
            e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
        },
        756: (e, t, r) => {
            var n = r(633)();
            e.exports = n;
            try {
                regeneratorRuntime = n;
            } catch (e) {
                "object" == typeof globalThis ? globalThis.regeneratorRuntime = n : Function("r", "regeneratorRuntime = r")(n);
            }
        }
    }, t = {};
    function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = t[n] = {
            id: n,
            loaded: !1,
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, r), i.loaded = !0, i.exports;
    }
    r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t;
    }, r.d = (e, t) => {
        for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        });
    }, r.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    }(), r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.nmd = e => (e.paths = [], 
    e.children || (e.children = []), e), (() => {
        "use strict";
        function e(e, t) {
            if (null == e) return {};
            var r, n, o = function(e, t) {
                if (null == e) return {};
                var r, n, o = {}, i = Object.keys(e);
                for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                return o;
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
            }
            return o;
        }
        function t(e, t, r, n, o, i, a) {
            try {
                var s = e[i](a), u = s.value;
            } catch (e) {
                return void r(e);
            }
            s.done ? t(u) : Promise.resolve(u).then(n, o);
        }
        function n(e) {
            return function() {
                var r = this, n = arguments;
                return new Promise((function(o, i) {
                    var a = e.apply(r, n);
                    function s(e) {
                        t(a, o, i, s, u, "next", e);
                    }
                    function u(e) {
                        t(a, o, i, s, u, "throw", e);
                    }
                    s(void 0);
                }));
            };
        }
        var o = r(756), i = r.n(o);
        const a = class {
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
        const s = e => class extends e {
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
                            var n = r[0];
                            n && n.id >= 0 ? t ? browser.tabs.sendMessage(n.id, e, (e => {
                                this.lastError = browser.runtime.lastError, t(e), this.clearLastError();
                            })) : browser.tabs.sendMessage(n.id, e) : (this.lastError = new Error("Active tab is not found"), 
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
                this.storage = new a(this);
            }
        };
        const u = class {
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
        const c = e => {
            var t = null;
            return (t = () => {}).t = t.log = t.info = t.warn = t.error = t.debug = t, t;
        };
        var l = c("mono");
        const f = class {
            constructor() {
                this.onDestroy = new u, this._lastErrorFired = !1, this._lastError = null;
            }
            get lastError() {
                return this._lastErrorFired = !0, this._lastError;
            }
            set lastError(e) {
                this._lastErrorFired = !e, this._lastError = e;
            }
            clearLastError() {
                this._lastError && !this._lastErrorFired && l.error("Unhandled mono.lastError error:", this.lastError), 
                this._lastError = null;
            }
            unimplemented() {
                throw new Error("Unimplemented");
            }
            destroy() {
                this.onDestroy.dispatch();
            }
        };
        const p = e => class extends e {
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
        const d = (e, t) => {
            for (var r = t.split("."), n = r.pop(); r.length; ) e = e[r.shift()];
            return {
                scope: e,
                endPoint: n
            };
        };
        var h = r(334), m = c("mono:callFnListener");
        const g = e => class extends e {
            constructor() {
                super(), this.remote = {
                    mono: this
                }, this.callFnListener = this.callFnListener.bind(this);
            }
            initMessages() {
                super.initMessages(), this.onMessage.addListener(this.callFnListener);
            }
            responseFn(e, t) {
                var r = Promise.resolve().then((() => {
                    var t = d(this.remote, e.fn), r = t.scope, n = t.endPoint, o = e.args || [];
                    return r[n].apply(r, o);
                }));
                return this.responsePromise(r, t);
            }
            responsePromise(e, t) {
                return e.then((e => {
                    t({
                        result: e
                    });
                }), (e => {
                    t({
                        err: h(e)
                    });
                })).catch((function(e) {
                    m.error("responsePromise error", e);
                })), !0;
            }
            callFnListener(e, t, r) {
                if ("callFn" === (e && e.action)) return this.responseFn(e, r), !0;
            }
            destroy() {
                this.onMessage.removeListener(this.callFnListener), super.destroy();
            }
        };
        const y = e => class extends e {};
        const v = e => class extends(y(e)){
            openTab(e, t) {
                this.unimplemented();
            }
        };
        class b extends(v(g(p(f)))){}
        const w = b;
        const x = e => class extends e {
            constructor() {
                super(), this.isFirefox = !0;
            }
            get isFirefoxMobile() {
                return /(?:Mobile|Tablet);/.test(navigator.userAgent);
            }
        };
        const k = e => class extends(x(e)){
            openTab(e, t) {
                t = void 0 === t || !!t, browser.tabs.create({
                    url: e,
                    active: t
                });
            }
            executeScript(e, t) {
                browser.tabs.executeScript(e.id, t);
            }
            getActiveTab(e) {
                browser.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, (t => e(t[0])));
            }
        };
        class O extends(k(s(w))){
            constructor() {
                super(), this.initMessages(), this.initStorage(), this.initI18n();
            }
        }
        const E = new O;
        var S = c("webRequest"), _ = function() {
            var e = /^sf-\d+_/, t = {
                urls: [ "<all_urls>" ],
                types: [ "xmlhttprequest" ]
            }, r = !1, n = {}, o = {}, i = function(e) {
                for (var t in e) return !1;
                return !0;
            }, a = function(e) {
                delete o[e.requestId], i(n) && i(o) && c();
            }, s = function(t) {
                var r = o[t.requestId], a = t.requestHeaders || [], s = [], u = [], c = [];
                if (r) u = r.changes, s = r.filtered; else if (!i(n)) for (var l, f, p, d = 0; p = a[d]; d++) l = p.name, 
                e.test(l) && (f = n[l]) && (p.name = f.name, p.value = f.value, u.push(p), s.push(f.name.toLowerCase()), 
                s.push(l.toLowerCase()), /cookie/i.test(p.name) && c.push("set-cookie"), clearTimeout(f.timer), 
                delete n[l]);
                if (u.length) {
                    r || (o[t.requestId] = {
                        changes: u,
                        filtered: s,
                        filterResponseHeaders: c
                    });
                    var h = a.filter((function(e) {
                        return -1 === s.indexOf(e.name.toLowerCase());
                    })).concat(u);
                    return {
                        requestHeaders: h
                    };
                }
            }, u = function(e) {
                var t = o[e.requestId], r = e.responseHeaders;
                if (t && r) {
                    var n = t.filterResponseHeaders;
                    return {
                        responseHeaders: r.filter((function(e) {
                            return -1 === n.indexOf(e.name.toLowerCase());
                        }))
                    };
                }
            }, c = function() {
                r && (r = !1, chrome.webRequest.onBeforeSendHeaders.removeListener(s, t, [ "blocking", "requestHeaders" ]), 
                chrome.webRequest.onHeadersReceived.removeListener(u, t, [ "blocking", "responseHeaders" ]), 
                chrome.webRequest.onResponseStarted.removeListener(a, t), chrome.webRequest.onErrorOccurred.removeListener(a, t), 
                S.debug("webRequest", "rm listener"));
            }, l = 10, f = !1, p = null, d = function(e) {
                return (null === p || e) && (p = !!(chrome.webRequest && chrome.webRequest.onBeforeSendHeaders && chrome.webRequest.onResponseStarted && chrome.webRequest.onErrorOccurred)), 
                p;
            }, h = /^user-agent$|^origin$|^cookie$/i;
            return {
                wrapHeaderKey: function(e, o) {
                    if (d()) {
                        for (var i, c = 100; c-- > 0 && (i = "sf-" + parseInt(1e5 * Math.random()) + "_" + e, 
                        n[i]); ) ;
                        return n[i] = {
                            name: e,
                            value: o,
                            timer: setTimeout((function() {
                                delete n[i];
                            }), 3e3)
                        }, r || (r = !0, chrome.webRequest.onBeforeSendHeaders.addListener(s, t, [ "blocking", "requestHeaders" ]), 
                        chrome.webRequest.onHeadersReceived.addListener(u, t, [ "blocking", "responseHeaders" ]), 
                        chrome.webRequest.onResponseStarted.addListener(a, t), chrome.webRequest.onErrorOccurred.addListener(a, t), 
                        S.debug("webRequest", "add listener")), i;
                    }
                    return e;
                },
                isSpecialHeader: function(e) {
                    return h.test(e);
                },
                requestPermission: function(e) {
                    d() || f ? e(p) : chrome.permissions && chrome.permissions.request ? chrome.permissions.request({
                        permissions: [ "webRequest", "webRequestBlocking" ]
                    }, (function(t) {
                        (t || l-- <= 0) && (f = !0), t && d(!0), e(p);
                    })) : (f = !0, e(p));
                }
            };
        }();
        const T = _;
        var I = r(894), L = function(e) {
            e = e.split(/\r?\n/);
            var t = {};
            return e.forEach((function(e) {
                var r = e.indexOf(":");
                if (-1 !== r) {
                    var n = e.substr(0, r).trim().toLowerCase(), o = e.substr(r + 1).trim();
                    t[n] = o;
                }
            })), t;
        };
        const A = function(e, t) {
            var r = {}, n = function(e, r) {
                n = null, c.timeoutTimer && clearTimeout(c.timeoutTimer);
                var i = null;
                e && (i = String(e.message || e) || "ERROR"), t && t(i, o(r), r);
            }, o = function(e) {
                var t = {};
                t.statusCode = f.status, t.statusText = f.statusText;
                var r = null, n = f.getAllResponseHeaders();
                return "string" == typeof n && (r = L(n)), t.headers = r || {}, t.body = e, t.responseURL = f.responseURL, 
                t;
            };
            "object" != typeof e && (e = {
                url: e
            });
            var i = e.url, a = e.method || e.type || "GET";
            a = a.toUpperCase();
            var s = e.data;
            if ("string" != typeof s && (s = I.stringify(s)), s && "GET" === a && (i += (/\?/.test(i) ? "&" : "?") + s, 
            s = void 0), !1 === e.cache && -1 !== [ "GET", "HEAD" ].indexOf(a) && (i += (/\?/.test(i) ? "&" : "?") + "_=" + Date.now()), 
            !/^https?:\/\//.test(i)) {
                var u = document.createElement("a");
                u.href = i, i = u.href, u = null;
            }
            e.headers = e.headers || {}, s && (e.headers["Content-Type"] = e.contentType || e.headers["Content-Type"] || "application/x-www-form-urlencoded; charset=UTF-8");
            var c = {};
            c.url = i, c.method = a, s && (c.data = s), e.json && (c.json = !0), e.xml && (c.xml = !0), 
            e.timeout && (c.timeout = e.timeout), e.mimeType && (c.mimeType = e.mimeType), e.withCredentials && (c.withCredentials = !0), 
            Object.keys(e.headers).length && (c.headers = e.headers), c.timeout > 0 && (c.timeoutTimer = setTimeout((function() {
                n && n(new Error("ETIMEDOUT")), f.abort();
            }), c.timeout));
            var l = {
                0: 200,
                1223: 204
            }, f = (e.localXHR, new XMLHttpRequest);
            f.open(c.method, c.url, !0), c.mimeType && f.overrideMimeType(c.mimeType), c.withCredentials && (f.withCredentials = !0);
            var p = [];
            for (var d in c.headers) T && T.isSpecialHeader(d) && p.push({
                key: d,
                value: c.headers[d]
            }), f.setRequestHeader(d, c.headers[d]);
            f.onload = function() {
                var e = l[f.status] || f.status;
                try {
                    if (e >= 200 && e < 300 || 304 === e) {
                        var t = f.responseText;
                        if (c.json) t = JSON.parse(t); else if (c.xml) t = (new DOMParser).parseFromString(t, "text/xml"); else if ("string" != typeof t) throw console.error("Response is not string!", t), 
                        new Error("Response is not string!");
                        return n && n(null, t);
                    }
                    throw new Error(f.status + " " + f.statusText);
                } catch (e) {
                    return n && n(e);
                }
            };
            var h = f.onerror = function() {
                n && n(new Error(f.status + " " + f.statusText));
            }, m = null;
            void 0 !== f.onabort ? f.onabort = h : m = function() {
                4 === f.readyState && n && setTimeout((function() {
                    return h();
                }));
            }, m && (f.onreadystatechange = m);
            var g = function() {
                try {
                    f.send(c.data || null);
                } catch (e) {
                    setTimeout((function() {
                        n && n(e);
                    }));
                }
            };
            if (T && p.length) {
                T.requestPermission((function(e) {
                    e && function() {
                        for (var e, t = 0; e = p[t]; t++) f.setRequestHeader(T.wrapHeaderKey(e.key, e.value), e.value);
                    }(), n && g();
                }));
            } else g();
            return r.abort = function() {
                n = null, f.abort();
            }, r;
        };
        const R = e => new Promise(((t, r) => {
            A(e, ((e, n) => {
                e ? r(e) : t(n);
            }));
        }));
        var P = r(894), C = c("amplitude");
        const j = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bc3c8ed7b305f692ec048b0425b002df";
            return C.debug("send", e), R({
                url: "https://api.amplitude.com/httpapi",
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                data: P.stringify({
                    api_key: t,
                    event: JSON.stringify(e)
                })
            }).catch((e => {
                C.error("amplitude error", e);
            }));
        };
        const N = function(e, t) {
            var r = null;
            return function() {
                var n = this, o = arguments;
                clearTimeout(r), r = setTimeout((function() {
                    e.apply(n, o);
                }), t);
            };
        };
        var U = {
            on: function(e, t, r, n) {
                e.addEventListener(t, r, n);
            },
            off: function(e, t, r, n) {
                e.removeEventListener(t, r, n);
            },
            one: function(e, t, r, n) {
                var o = [ "oneFn", t, !!n ].join("_"), i = r[o];
                i || (r[o] = i = function(e) {
                    U.off(this, t, i, n), r.apply(this, arguments);
                }), U.on(e, t, i, n), e = null;
            }
        }, M = "sf-removed-" + Math.floor(1e6 * Math.random()), D = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
        U.onRemoveEventName = M, U.onRemoveClassName = D, U.onRemoveListener = function(e) {
            U.trigger(e, M, {
                cancelable: !0,
                bubbles: !1
            });
        }, U.onRemoveEvent = (e, t) => {
            e.classList.add(D), e.addEventListener(M, t);
        }, U.offRemoveEvent = function(e, t) {
            e.removeEventListener(U.onRemoveEventName, t);
        }, U.trigger = function(e, t, r) {
            void 0 === r && (r = {}), void 0 === r.bubbles && (r.bubbles = !1), void 0 === r.cancelable && (r.cancelable = !1);
            var n = null;
            n = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, r) : new CustomEvent(t, r), 
            e.dispatchEvent(n);
        };
        const F = U;
        var V = {
            create: function(e, t) {
                var r, n;
                for (var o in r = "object" != typeof e ? document.createElement(e) : e, t) {
                    var i = t[o];
                    (n = q[o]) ? n(r, i) : r[o] = i;
                }
                return r;
            }
        }, q = {
            text: function(e, t) {
                e.textContent = t;
            },
            data: function(e, t) {
                for (var r in t) e.dataset[r] = t[r];
            },
            class: function(e, t) {
                if (Array.isArray(t)) for (var r = 0, n = t.length; r < n; r++) e.classList.add(t[r]); else e.setAttribute("class", t);
            },
            style: function(e, t) {
                if ("object" == typeof t) for (var r in t) {
                    var n = r;
                    "float" === n && (n = "cssFloat");
                    var o = t[r];
                    if (Array.isArray(o)) for (var i = 0, a = o.length; i < a; i++) e.style[n] = o[i]; else e.style[n] = o;
                } else e.setAttribute("style", t);
            },
            append: function(e, t) {
                Array.isArray(t) || (t = [ t ]);
                for (var r = 0, n = t.length; r < n; r++) {
                    var o = t[r];
                    (o || 0 === o) && ("object" != typeof o && (o = document.createTextNode(o)), e.appendChild(o));
                }
            },
            on: function(e, t) {
                "object" != typeof t[0] && (t = [ t ]);
                for (var r = 0, n = t.length; r < n; r++) {
                    var o = t[r];
                    Array.isArray(o) && F.on.apply(F, [ e ].concat(o));
                }
            },
            one: function(e, t) {
                "object" != typeof t[0] && (t = [ t ]);
                for (var r = 0, n = t.length; r < n; r++) {
                    var o = t[r];
                    Array.isArray(o) && F.one.apply(F, [ e ].concat(o));
                }
            },
            onCreate: function(e, t) {
                t.call(e, e);
            },
            attr: function(e, t) {
                var r, n;
                for (r in t) n = t[r], e.setAttribute(r, n);
            }
        };
        const $ = V;
        const B = e => new Promise((t => E.storage.set(e, t)));
        const H = e => new Promise((t => E.storage.get(e, t)));
        class G {
            get(e) {
                return H(e);
            }
            first(e) {
                return H(e).then((t => t[e]));
            }
            set(e) {
                return B(e);
            }
        }
        function z(e) {
            return z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            }, z(e);
        }
        function W(e) {
            var t = function(e, t) {
                if ("object" != z(e) || !e) return e;
                var r = e[Symbol.toPrimitive];
                if (void 0 !== r) {
                    var n = r.call(e, t || "default");
                    if ("object" != z(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t ? String : Number)(e);
            }(e, "string");
            return "symbol" == z(t) ? t : t + "";
        }
        function Y(e, t, r) {
            return (t = W(t)) in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e;
        }
        function Q(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function K(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Q(Object(r), !0).forEach((function(t) {
                    Y(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Q(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var J = {
            enabled: !1,
            percent: 10,
            countries: [ "all" ],
            browsers: [ "all" ],
            languages: [ "all" ],
            platforms: [ "all" ]
        }, X = [ "az", "am", "by", "kg", "kz", "md", "ru", "tj", "ua", "uz" ], Z = {
            presetOnlyCIS: e => X.includes(e),
            presetNotAllowCIS: e => !X.includes(e)
        };
        function ee(e, t) {
            var r, n = K(K({}, J), e), o = n.browsers, i = void 0 === o ? [] : o, a = n.countries, s = void 0 === a ? [] : a, u = n.languages, c = void 0 === u ? [] : u, l = n.platforms, f = void 0 === l ? [] : l, p = n.percent, d = e => e.toLowerCase(), h = i.map(d).includes(t.browser) || i.includes("all");
            if (s.every((e => Object.keys(Z).includes(e)))) {
                var m = s[0];
                r = Z[m](t.country);
            } else r = s.map(d).includes(t.country) || s.includes("all");
            var g = c.map(d).find((e => -1 !== t.getLanguage().indexOf(e))) || c.includes("all"), y = f.map(d).includes(t.getPlatform().toLowerCase()) || f.includes("all");
            return !!(n.enabled && h && r && g && y) && function(e) {
                return 100 * Math.random() <= e;
            }(p);
        }
        var te = c("experiments"), re = {
            experiments: "experiments.main",
            config: "experiments.config"
        };
        class ne {
            constructor(e) {
                this.retryCount = 0, this.storage = new G, this.config = {
                    payload: {},
                    lastUpdated: null
                }, this.user = void 0, this.user = e;
            }
            init() {
                var e = this;
                return n(i().mark((function t() {
                    var r;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.prev = 0, te.info("ExperimentLoader init"), t.next = 4, e._initPayload();

                          case 4:
                            t.next = 13;
                            break;

                          case 12:
                            return t.abrupt("return", {});

                          case 13:
                            return t.next = 15, e.checkUpdate();

                          case 15:
                            if (!t.sent) {
                                t.next = 26;
                                break;
                            }
                            return te.info("Experiments updating"), t.next = 20, e.requestRemoteConfig();

                          case 20:
                            return r = t.sent, e.config = {
                                payload: r,
                                lastUpdated: Date.now()
                            }, e.experiments = {}, Object.keys(e.config.payload).forEach((t => e.experiments[t] = e.refreshExperiment(t))), 
                            t.next = 26, e.storage.set({
                                [re.config]: e.config,
                                [re.experiments]: e.experiments
                            });

                          case 26:
                            return te.info("list:", e.experiments, "config:", e.config), t.abrupt("return", e.experiments);

                          case 30:
                            t.prev = 30, t.t0 = t.catch(0), e.clearAll().then((() => e.retry())), te.error(t.t0);

                          case 34:
                            return t.abrupt("return", {});

                          case 35:
                          case "end":
                            return t.stop();
                        }
                    }), t, null, [ [ 0, 30 ] ]);
                })))();
            }
            retry() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2;
                this.retryCount >= e || (this.retryCount++, te.info("Retry loader"), this.init());
            }
            _initPayload() {
                var e = this;
                return n(i().mark((function t() {
                    var r, n;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return r = Object.keys(re).map((e => re[e])), t.next = 3, e.storage.get(r);

                          case 3:
                            n = t.sent, e.experiments = n[re.experiments] || {}, e.config = n[re.config] || e.config;

                          case 6:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            checkUpdate() {
                var e = this;
                return n(i().mark((function t() {
                    var r, n;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return r = e.config.lastUpdated + 216e5 < (new Date).getTime(), n = 0 === Object.keys(e.config.payload).length, 
                            t.abrupt("return", r || n);

                          case 3:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            requestRemoteConfig() {
                var e = `https://sf-helper.com/static/helper-config/experiments.config.json?ts=${Date.now()}`;
                return R({
                    url: e,
                    json: !0
                }).then((e => e.body));
            }
            refreshExperiment(e) {
                var t = this.config.payload[e] || {};
                return t.name = e, {
                    name: e,
                    config: t,
                    allowed: ee(t, this.user),
                    payload: t.payload
                };
            }
            clearAll() {
                return this.storage.set({
                    [re.config]: null,
                    [re.experiments]: null
                });
            }
        }
        var oe = (e, t) => !!se({
            preferences: e,
            user: t,
            config: e.generalConfig.forcedFirstRun.config
        }), ie = (e, t) => !!se({
            preferences: e,
            user: t,
            config: e.generalConfig.forcedCacheRemove.config
        }), ae = (e, t) => {
            var r = se({
                preferences: e,
                user: t,
                config: e.generalConfig.landingPage.config
            });
            return r ? {
                url: r.url,
                cooldownInSeconds: r.cooldownInSeconds,
                clicksBeforeOpen: r.clicksBeforeOpen
            } : null;
        }, se = e => {
            for (var t = e.preferences, r = e.user, n = e.config.filter((e => e.enabled && (e.countries.includes(t.country) || e.countries.includes("all")) && (e.languages.includes(r.getLanguage()) || e.languages.includes("all")) && (e.browsers.includes(r.browser) || e.browsers.includes("all")) && (e.platforms.includes(r.getPlatform()) || e.platforms.includes("all")))), o = 0; o < n.length; o++) if (n[o].sample > Math.random()) return n[o];
            return null;
        };
        const ue = function(e, t) {
            var r = /:\/\/(?:[^\/?#]*@)?([^:\/?#]+)/.exec(e);
            return (r = r && r[1]) && t && (r = r.replace(/^www\./, "")), r;
        };
        const ce = function() {
            return parseInt(Date.now() / 1e3, 10);
        };
        var le = "_expire_", fe = {
            getExpire: function(e, t) {
                var r = ce(), n = e + le;
                return E.storage.get([ e, n ], (function(o) {
                    var i = void 0 === o[n] || o[n] < r, a = {};
                    return a[e] = o[e], t(a, i);
                }));
            },
            setExpire: function(e, t, r) {
                var n = ce(), o = {};
                for (var i in e) o[i] = e[i], o[i + le] = n + t;
                return E.storage.set(o, (function() {
                    return r && r();
                }));
            }
        };
        const pe = fe;
        var de = function() {
            var e = n(i().mark((function e() {
                var t;
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = null, e.abrupt("return", new Promise((e => {
                            pe.getExpire("generalConfig", function() {
                                var r = n(i().mark((function r(n, o) {
                                    return i().wrap((function(r) {
                                        for (;;) switch (r.prev = r.next) {
                                          case 0:
                                            if (!o && n.generalConfig) {
                                                r.next = 5;
                                                break;
                                            }
                                            return r.next = 3, he();

                                          case 3:
                                            return t = r.sent, r.abrupt("return", e(t));

                                          case 5:
                                            e(n.generalConfig);

                                          case 6:
                                          case "end":
                                            return r.stop();
                                        }
                                    }), r);
                                })));
                                return function(e, t) {
                                    return r.apply(this, arguments);
                                };
                            }());
                        })));

                      case 2:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })));
            return function() {
                return e.apply(this, arguments);
            };
        }(), he = function() {
            var e = n(i().mark((function e() {
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", R({
                            url: "https://sf-helper.com/static/helper-config/general_config.json"
                        }).then((e => {
                            var t = JSON.parse(e.body);
                            if (t.ttl) return pe.setExpire({
                                generalConfig: t
                            }, t.ttl, (() => {})), t;
                        })));

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })));
            return function() {
                return e.apply(this, arguments);
            };
        }();
        const me = de;
        const ge = e => t => e.some((e => ((e, t) => {
            var r = e.matches.test(t);
            return r && e.exclude_matches && (r = !e.exclude_matches.test(t)), r && e.include_globs && (r = e.include_globs.test(t)), 
            r && e.exclude_globs && (r = !e.exclude_globs.test(t)), r;
        })(e, t)));
        var ye = function() {
            var e = n(i().mark((function e() {
                var t;
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = null, e.abrupt("return", new Promise((e => {
                            pe.getExpire("selectorConfig", function() {
                                var r = n(i().mark((function r(n, o) {
                                    return i().wrap((function(r) {
                                        for (;;) switch (r.prev = r.next) {
                                          case 0:
                                            if (!o && n.selectorConfig) {
                                                r.next = 5;
                                                break;
                                            }
                                            return r.next = 3, ve();

                                          case 3:
                                            t = r.sent, e(t);

                                          case 5:
                                            e(n.selectorConfig);

                                          case 6:
                                          case "end":
                                            return r.stop();
                                        }
                                    }), r);
                                })));
                                return function(e, t) {
                                    return r.apply(this, arguments);
                                };
                            }());
                        })));

                      case 2:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })));
            return function() {
                return e.apply(this, arguments);
            };
        }(), ve = function() {
            var e = n(i().mark((function e() {
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", R({
                            url: "https://sf-helper.com/static/helper-config/selector_config.json"
                        }).then((e => {
                            var t = JSON.parse(e.body);
                            if (t.ttl) return pe.setExpire({
                                selectorConfig: t.selectors
                            }, t.ttl, (() => {})), t.selectors;
                        })));

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })));
            return function() {
                return e.apply(this, arguments);
            };
        }();
        const be = ye;
        var we = c("ShareDistributor");
        class xe {
            constructor(e) {
                this.name = e, this.storage = new G, this.storageKey = "share_distributor." + this.name;
            }
            onCreated(e) {}
            onUpdated(e) {}
            createShare(e) {
                var t = arguments, r = this;
                return n(i().mark((function n() {
                    var o, a, s, u, c, l;
                    return i().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            return o = t.length > 1 && void 0 !== t[1] && t[1], n.next = 3, r.storage.first(r.storageKey);

                          case 3:
                            if (a = n.sent, s = !a || a.percent !== e, !o || !a || void 0 === a.isShared || s) {
                                n.next = 8;
                                break;
                            }
                            return we.debug(`${r.storageKey} from cache ${e}% : ${a.isShared}`), n.abrupt("return", a.isShared);

                          case 8:
                            if (u = r.getRandomInt(1, 100), c = u <= e, we.debug(`${r.storageKey} created ${e}% : ${c}`), 
                            !o) {
                                n.next = 17;
                                break;
                            }
                            return n.next = 14, r.storage.set({
                                [r.storageKey]: {
                                    isShared: c,
                                    percent: e
                                }
                            });

                          case 14:
                            l = {
                                name: r.name,
                                storageKey: r.storageKey,
                                isShared: c,
                                rndNumber: u,
                                percent: e,
                                toCache: o
                            }, a && a.percent !== e ? r.onUpdated(l) : r.onCreated(l);

                          case 17:
                            return n.abrupt("return", c);

                          case 18:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            getRandomInt(e, t) {
                return e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e + 1)) + e;
            }
        }
        var ke = 1624376875e3, Oe = [ "az", "be", "hy", "kk", "ky", "mo", "ru", "tj", "uz", "uk" ], Ee = "helper_pro_force", Se = "exp_helper_pro4", _e = c("helper-pro-exp");
        function Te(e) {
            return Ie.apply(this, arguments);
        }
        function Ie() {
            return Ie = n(i().mark((function e(t) {
                var r, n, o, a, s;
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", !1);

                      case 2:
                        return e.next = 4, H([ "userInfo" ]).then((e => e.userInfo && e.userInfo.isPremium));

                      case 4:
                        return r = e.sent, e.next = 7, H([ Ee ]).then((e => e[Ee]));

                      case 7:
                        if (n = e.sent, !r) {
                            e.next = 14;
                            break;
                        }
                        return _e.log("has account"), !n && B({
                            [Ee]: !0
                        }), e.abrupt("return", !0);

                      case 14:
                        if (!n) {
                            e.next = 17;
                            break;
                        }
                        return _e.log("flag helper force"), e.abrupt("return", !0);

                      case 17:
                        if (i = t.preferences.country, o = Oe.includes(i), a = Date.now() > ke, _e.log("available country / exp is over date", o, a), 
                        !a && o) {
                            e.next = 22;
                            break;
                        }
                        return e.abrupt("return", !1);

                      case 22:
                        return (s = new xe(Se)).onCreated = Le(t), e.abrupt("return", s.createShare(25, !0));

                      case 25:
                      case "end":
                        return e.stop();
                    }
                    var i;
                }), e);
            }))), Ie.apply(this, arguments);
        }
        function Le(e) {
            var t = {
                t: "event",
                tid: "UA-181742122-2",
                ec: "helper_pro_share",
                el: "helper_pro_share",
                ea: null
            };
            return r => {
                var n = r.isShared ? "on" : "off";
                t.ea = "helper-pro-" + n, e.track(t);
            };
        }
        const Ae = () => window.top !== window.self;
        const Re = function(e, t) {
            var r = /^[\d.]+$/;
            if (!r.test(e) || !r.test(t)) throw new Error("Incorrect version");
            for (var n = function(e, t) {
                for (;e.length < t; ) e = "0" + e;
                return e;
            }, o = e.split("."), i = t.split("."), a = 0; a < i.length; a++) {
                var s = o[a] || "", u = i[a] || "", c = Math.max(s.length, u.length);
                if (s = parseInt(n(s, c)), (u = parseInt(n(u, c))) !== s) return u > s;
            }
            return !1;
        };
        const Pe = () => H({
            country: null
        }).then((e => {
            if (null === e.country) return new Promise((e => {
                E.storage.onChanged.addListener((function t(r, n) {
                    "local" === n && r.country && (E.storage.onChanged.removeListener(t), e());
                }));
            }));
        }));
        const Ce = {
            youtube: "moduleYoutube",
            dailymotion: "moduleDailymotion",
            vimeo: "moduleVimeo",
            facebook: "moduleFacebook",
            soundcloud: "moduleSoundcloud",
            vk: "moduleVkontakte",
            odnoklassniki: "moduleOdnoklassniki",
            mailru: "moduleMailru",
            instagram: "moduleInstagram",
            rutube: "moduleRutube",
            tiktok: "moduleTiktok",
            yandexMusic: "moduleYandexMusic",
            matchTv: "moduleMatchTv"
        };
        class je extends Error {
            constructor(e, t) {
                super(e), this.code = t;
            }
        }
        const Ne = je;
        const Ue = e => new Promise((t => setTimeout(t, e)));
        var Me = c("televzrRemoteFn"), De = "http://127.0.0.1:34138";
        const Fe = function(e) {
            return {
                infoRequest: function() {
                    return R({
                        url: De + "/info",
                        json: !0,
                        timeout: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0
                    }).then((e => {
                        if (e.body.error) throw new Ne(e.body.error.message, e.body.error.code);
                        return e.body.result;
                    }));
                },
                openUrl: e => R({
                    url: De + "/open-url",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        url: e
                    }),
                    json: !0
                }).then((e => {
                    if (e.body.error) throw new Ne(e.body.error.message, e.body.error.code);
                    return e.body.result;
                })),
                startDownloadRequest: (e, t, r) => {
                    var n = {
                        url: De + "/download",
                        method: "POST",
                        json: !0,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({
                            url: e,
                            type: t,
                            height: r
                        })
                    };
                    return R(n).then((e => {
                        var t = e.body.error;
                        if (t) throw new Ne(t.message, t.code);
                        return e.body.result;
                    }), (e => {
                        throw Me.error("Download Request error", e), e;
                    }));
                },
                appAuth() {
                    return e.authService.getQuickCodeRequest().then((e => this.sendQuickCodeRequest(e))).then((() => Ue(1e3))).then((() => {
                        Me.log("Televzr is authorized");
                    }));
                },
                sendQuickCodeRequest: e => R({
                    url: De + "/auth/quick-code",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    json: !0,
                    data: JSON.stringify({
                        code: e
                    })
                }).catch((e => {
                    throw Me.error("sendQuickCodeRequest", e), e;
                }))
            };
        };
        var Ve = r(834);
        const qe = function(e) {
            if ("<all_urls>" === e) return "^https?:\\/\\/.+$";
            var t = e.match(/(\*|http|https|file|ftp):\/\/([^\/]+)(?:\/(.*))?/);
            if (!t) throw new Error("Invalid url-pattern");
            var r = t[1];
            "*" === r && (r = "https?");
            var n = t[2], o = [ "^", r, ":\\/\\/", n = "*" === n ? ".+" : (n = (n = Ve(n)).replace(/^\\\*\\\./, "(?:[^/]+\\.)?")).replace(/\\\.\\\*$/g, "\\.[a-z\\.]{2,}") ], i = t[3];
            return i ? "*" === i ? (i = "(?:|/.*)", o.push(i), o.push("$")) : i && (i = (i = Ve(i = "/" + i)).replace(/\\\*/g, ".*"), 
            o.push(i), o.push("$")) : o.push("$"), o.join("");
        };
        class $e {
            constructor(e, t) {
                if (this.browser = e.toLowerCase(), !(t = "")) {
                    var r = navigator.language;
                    t = r.indexOf("-") ? r.split("-").shift() : r;
                }
                this.country = t.toLowerCase(), this.platform = navigator ? navigator.platform.toLowerCase() : null;
            }
            getLanguage() {
                return window.navigator.language;
            }
            getPlatform() {
                var e = window.navigator.userAgent, t = window.navigator.platform;
                return -1 !== [ "Macintosh", "MacIntel", "MacPPC", "Mac68K" ].indexOf(t) ? "Mac OS" : -1 !== [ "iPhone", "iPad", "iPod" ].indexOf(t) ? "iOS" : -1 !== [ "Win32", "Win64", "Windows", "WinCE" ].indexOf(t) ? "Windows" : /Android/.test(e) ? "Android" : /Linux/.test(t) ? "Linux" : void 0;
            }
        }
        function Be(e) {
            return window.navigator.userAgent.indexOf("OPR") > -1 || window.navigator.userAgent.indexOf("Opera") > -1 ? "opera" : e.isGM ? "userjs" : e.isFirefox ? "firefox" : e.isChrome ? "chrome" : void 0;
        }
        var He = r(710), Ge = r.n(He);
        c("retryFn");
        c("focusSwitcher");
        c("televzrBridge");
        var ze = "code_not_authorized";
        var We;
        function Ye(e) {
            return B({
                credentials: (t = {
                    access_token: e.accessToken,
                    refresh_token: e.refreshToken,
                    token_type: e.tokenType,
                    expiry_date: e.expires.getTime()
                }, btoa(encodeURIComponent(JSON.stringify(t))))
            });
            var t;
        }
        function Qe() {
            return H([ "credentials" ]).then((e => {
                if (!e || !e.credentials) throw new Ne("Credentials not found", ze);
                return t = e.credentials, JSON.parse(decodeURIComponent(atob(t)));
                var t;
            }));
        }
        var Ke = new Uint8Array(16);
        function Je() {
            if (!We && !(We = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return We(Ke);
        }
        const Xe = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        const Ze = function(e) {
            return "string" == typeof e && Xe.test(e);
        };
        for (var et = [], tt = 0; tt < 256; ++tt) et.push((tt + 256).toString(16).substr(1));
        const rt = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = (et[e[t + 0]] + et[e[t + 1]] + et[e[t + 2]] + et[e[t + 3]] + "-" + et[e[t + 4]] + et[e[t + 5]] + "-" + et[e[t + 6]] + et[e[t + 7]] + "-" + et[e[t + 8]] + et[e[t + 9]] + "-" + et[e[t + 10]] + et[e[t + 11]] + et[e[t + 12]] + et[e[t + 13]] + et[e[t + 14]] + et[e[t + 15]]).toLowerCase();
            if (!Ze(r)) throw TypeError("Stringified UUID is invalid");
            return r;
        };
        const nt = function(e, t, r) {
            var n = (e = e || {}).random || (e.rng || Je)();
            if (n[6] = 15 & n[6] | 64, n[8] = 63 & n[8] | 128, t) {
                r = r || 0;
                for (var o = 0; o < 16; ++o) t[r + o] = n[o];
                return t;
            }
            return rt(n);
        };
        const ot = e => new Promise((t => E.storage.remove(e, t)));
        const it = e => new Promise((t => t(e())));
        const at = e => [ t => it(e).then((() => t)), t => it(e).then((() => {
            throw t;
        })) ];
        function st(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function ut(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? st(Object(r), !0).forEach((function(t) {
                    Y(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : st(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var ct = r(894), lt = c("AuthService"), ft = "https://oauth2.televzr.com";
        Error;
        var pt = [ "responseStatus", "responseOk", "responseType", "requestPrefix" ];
        const dt = (t, r) => {
            var n = r || {}, o = (n.responseStatus, n.responseOk, n.responseType), i = void 0 === o ? "text" : o, a = n.requestPrefix, s = void 0 === a ? "" : a, u = e(n, pt), c = null, l = () => c && c(), f = (e => E.callFn("createRequest", [ e ]))(s);
            f.then((e => {
                c = () => E.callFn("clearRequest", [ e ]);
            }));
            var p = f.then((e => E.callFn("sendRequest", [ {
                id: e,
                url: t,
                fetchOptions: u
            } ]))).then((e => {
                for (var t = e.id, r = e.numChunks, n = e.response, o = [], a = 0; a < r; a += 1) o.push(E.callFn("readRequestBodyChunk", [ {
                    id: t,
                    chunkIndex: a
                } ]));
                return Promise.all(o).then((e => function(e, t) {
                    var r = e.join("");
                    if ("json" === t) return JSON.parse(r);
                    if ("arrayBuffer" === t) {
                        for (var n = r.length, o = new Uint8Array(n), i = 0; i < n; i += 1) o[i] = r.charCodeAt(i);
                        return "blob" === t ? new Blob([ o ]) : o.buffer;
                    }
                    return r;
                }(e, i))).then((e => ({
                    response: n,
                    body: e
                })));
            })).then((e => (l(), e))).catch((e => {
                throw l(), e;
            }));
            return p.abort = () => l(), p;
        };
        var ht = r(59);
        const mt = function(e, t) {
            var r = new ht({
                min: 1e3,
                max: 6e4,
                jitter: .5
            }), n = 0, o = () => e().catch((e => {
                if (++n < t) {
                    var i = r.duration();
                    return new Promise((e => setTimeout(e, i))).then(o);
                }
                throw e;
            }));
            return o();
        };
        const gt = class {
            constructor(e) {
                this.track = e, this.fetchData = dt, this.CONFIG_URL = "https://sf-helper.com/static/helper-config/clickunder_config.json", 
                this.evalString = null, this.options = {
                    sites: [],
                    clickunder: null,
                    sample: 0
                };
            }
            init() {
                return this.loadOptions().then((() => this.loadConfig().then((e => (this.options.sample || this.setOptions({
                    sample: parseInt(100 * Math.random(), 10)
                }), !(Number.isFinite(e.sample) && this.options.sample > e.sample) && (this.evalString = this.setEvalString(e), 
                !0))), (e => (console.error("Load config error: %O", e), !1))))).then((e => {
                    e && E.isGM && this.setRedirects();
                }));
            }
            setOptions(e) {
                Object.assign(this.options, e), E.storage.set({
                    clickunder: this.options
                });
            }
            loadOptions() {
                return new Promise((e => E.storage.get({
                    clickunder: null
                }, e))).then((e => {
                    Object.assign(this.options, e.clickunder);
                }));
            }
            loadConfig() {
                return it((() => this.options.config && this.options.configExpireAt > ce() ? this.options.config : mt((() => this.fetchData(this.CONFIG_URL, {
                    responseType: "json"
                })), 3).then((e => {
                    var t = e.body;
                    return this.setOptions({
                        config: t,
                        configExpireAt: ce() + 864e5
                    }), t;
                })))).then((e => Object.assign({
                    sites: [],
                    clickunder: null,
                    sample: 0
                }, e)));
            }
            setRedirects() {
                "function" == typeof GM_evalFunction && (this.track({
                    t: "event",
                    ec: "cu",
                    el: this.options.sample,
                    ea: "activate",
                    tid: "UA-7055055-79"
                }), GM_evalFunction({
                    url: window.location.href
                }, this.evalString));
            }
            setEvalString(e) {
                var t = "";
                return e.sites.forEach((e => {
                    t += `"${e}", `;
                })), `\n        chrome.webRequest.onBeforeRequest.addListener((details) => {\n            const urls = [${t = t.slice(0, -2)}]\n            const isPopunder = urls.some(item => \n              {\n                const url = new URL(details.url);\n                const hostname = url.hostname;\n                return hostname.includes(item);\n              }\n            );\n            if ( isPopunder && details.url  !== "${e.clickunder}") {\n                return {redirectUrl: "${e.clickunder}"};\n            }\n        },\n        { \n            urls: ['<all_urls>'] \n        },\n            ['blocking']\n        );\n      `;
            }
        };
        function yt(e, t) {
            return yt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t, e;
            }, yt(e, t);
        }
        function vt(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && yt(e, t);
        }
        var bt = e => {
            if ("string" != typeof e) {
                var t = new Error("Value is not String");
                throw t.value = e, t;
            }
            return e;
        }, wt = e => {
            if (!Number.isFinite(e)) {
                var t = new Error("Value is not Finite Number");
                throw t.value = e, t;
            }
            return e;
        };
        function xt(e, t) {
            for (var r, n = []; null !== (r = t.exec(e)); ) r.index === t.lastIndex && t.lastIndex++, 
            n.push(r);
            return n;
        }
        function kt(e, t) {
            var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!r) {
                if (Array.isArray(e) || (r = function(e, t) {
                    if (!e) return;
                    if ("string" == typeof e) return Ot(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === r && e.constructor && (r = e.constructor.name);
                    if ("Map" === r || "Set" === r) return Array.from(e);
                    if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Ot(e, t);
                }(e)) || t && e && "number" == typeof e.length) {
                    r && (e = r);
                    var n = 0, o = function() {};
                    return {
                        s: o,
                        n: function() {
                            return n >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[n++]
                            };
                        },
                        e: function(e) {
                            throw e;
                        },
                        f: o
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var i, a = !0, s = !1;
            return {
                s: function() {
                    r = r.call(e);
                },
                n: function() {
                    var e = r.next();
                    return a = e.done, e;
                },
                e: function(e) {
                    s = !0, i = e;
                },
                f: function() {
                    try {
                        a || null == r.return || r.return();
                    } finally {
                        if (s) throw i;
                    }
                }
            };
        }
        function Ot(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n;
        }
        function Et() {
            Et = function(e, t) {
                return new r(e, void 0, t);
            };
            var e = RegExp.prototype, t = new WeakMap;
            function r(e, n, o) {
                var i = RegExp(e, n);
                return t.set(i, o || t.get(e)), yt(i, r.prototype);
            }
            function n(e, r) {
                var n = t.get(r);
                return Object.keys(n).reduce((function(t, r) {
                    var o = n[r];
                    if ("number" == typeof o) t[r] = e[o]; else {
                        for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length; ) i++;
                        t[r] = e[o[i]];
                    }
                    return t;
                }), Object.create(null));
            }
            return vt(r, RegExp), r.prototype.exec = function(t) {
                var r = e.exec.call(this, t);
                if (r) {
                    r.groups = n(r, this);
                    var o = r.indices;
                    o && (o.groups = n(o, this));
                }
                return r;
            }, r.prototype[Symbol.replace] = function(r, o) {
                if ("string" == typeof o) {
                    var i = t.get(this);
                    return e[Symbol.replace].call(this, r, o.replace(/\$<([^>]+)>/g, (function(e, t) {
                        var r = i[t];
                        return "$" + (Array.isArray(r) ? r.join("$") : r);
                    })));
                }
                if ("function" == typeof o) {
                    var a = this;
                    return e[Symbol.replace].call(this, r, (function() {
                        var e = arguments;
                        return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(n(e, a)), 
                        o.apply(this, e);
                    }));
                }
                return e[Symbol.replace].call(this, r, o);
            }, Et.apply(this, arguments);
        }
        var St = c("DailymotionComEmbed");
        const _t = class {
            constructor(e) {
                this.engine = e;
            }
            getDailymotionLinks(e, t) {
                return this.getEmbedVideoInfo(e.extVideoId, e.metadata, (r => {
                    r || (r = {}), this.addUmmyLinks(r.links, e.extVideoId);
                    var n = {
                        action: e.action,
                        extVideoId: e.extVideoId,
                        links: r.links,
                        title: r.title,
                        duration: r.duration
                    };
                    t(n);
                })), !0;
            }
            addUmmyLinks(e, t) {}
            getMetadata(e) {
                return R({
                    url: `https://www.dailymotion.com/player/metadata/video/${encodeURIComponent(e)}`,
                    json: !0
                }).then((e => e.body));
            }
            getInfoFromMetadata(e) {
                var t = {
                    title: bt(e.title),
                    duration: wt(e.duration),
                    links: []
                };
                if (e.qualities && e.qualities.auto && e.qualities.auto.length) {
                    var r = e.qualities.auto.pop();
                    if ("application/x-mpegURL" === r.type) return R({
                        url: r.url
                    }).then((e => {
                        var r, n = Et(/CODECS="(.*?)",RESOLUTION=(.*?),NAME="(.*?)",PROGRESSIVE\x2DURI="(.*?)"/gm, {
                            codecs: 1,
                            resolution: 2,
                            quality: 3,
                            url: 4
                        }), o = kt(xt(e.body, n));
                        try {
                            var i = function() {
                                var e = r.value.groups, n = e.quality, o = e.codecs, i = e.resolution, a = e.url, s = i, u = /\.(.{0,7})#cell/.exec(a);
                                if (u[1] && (s = u[1]), t.links.find((e => e.height === parseInt(n)))) return 1;
                                t.links.push({
                                    name: `${o}-${i}`,
                                    ext: s,
                                    height: parseInt(n),
                                    url: bt(a)
                                });
                            };
                            for (o.s(); !(r = o.n()).done; ) i();
                        } catch (e) {
                            o.e(e);
                        } finally {
                            o.f();
                        }
                        return t.links.sort(((e, t) => e.height > t.height ? -1 : 1)), t;
                    }));
                }
                return Promise.resolve(t);
            }
            getEmbedVideoInfo(e, t, r) {
                return Promise.resolve().then((() => t || this.getMetadata(e))).then((e => this.getInfoFromMetadata(e))).then((e => {
                    r(e);
                }), (t => {
                    St.error("getEmbedVideoInfo error", e, t), r();
                }));
            }
        };
        const Tt = function(e, t) {
            t && !Array.isArray(t) && (t = [ t ]);
            var r = [];
            return e.replace(/<script(?:\s*|\s[^>]+[^\/])>/g, (function(n, o) {
                o += n.length;
                var i = e.indexOf("<\/script>", o);
                if (-1 !== i) {
                    var a = e.substr(o, i - o);
                    t ? t.every((function(e) {
                        return e.test(a);
                    })) && r.push(a) : r.push(a);
                }
            })), r;
        };
        const It = function(e) {
            var t = function(e) {
                for (var t = e[0], r = 0; ;) {
                    if (-1 === (r = e.indexOf(t, r + 1))) {
                        r = e.length;
                        break;
                    }
                    if ("\\" !== e[r - 1]) break;
                }
                var n = "";
                try {
                    n = '"' === t ? JSON.parse('"' + e.substr(1, r - 1) + '"') : JSON.parse('"' + e.substr(1, r - 1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');
                } catch (e) {}
                return {
                    data: n,
                    i: r
                };
            }, r = {
                "[": function(e) {
                    var t, n, o, i, a, s = [], u = "";
                    for (i = 1; o = e[i]; i++) if (n = r[o]) t = n(e.substr(i)), u = JSON.stringify(t.data), 
                    i += t.i; else {
                        if ("]" === o) break;
                        "," === o ? (u && s.push(u), u = "") : u += o;
                    }
                    u && s.push(u);
                    try {
                        a = JSON.parse("[" + s.join(",") + "]");
                    } catch (e) {}
                    return {
                        data: a || [],
                        i
                    };
                },
                "{": function(e) {
                    var t, n, o, i, a, s = [], u = [ "", "" ], c = 0;
                    for (i = 1; o = e[i]; i++) if (n = r[o]) t = n(e.substr(i)), u[c] = 0 === c ? t.data : JSON.stringify(t.data), 
                    i += t.i; else {
                        if ("}" === o) break;
                        ":" === o ? c = 1 : "," === o ? (s.push(JSON.stringify(u[0]) + ":" + u[1]), u = [ "", "" ], 
                        c = 0) : u[c] = (u[c] + o).trim();
                    }
                    u[1] && s.push(JSON.stringify(u[0]) + ":" + u[1]);
                    try {
                        a = JSON.parse("{" + s.join(",") + "}");
                    } catch (e) {}
                    return {
                        data: a || {},
                        i
                    };
                },
                '"': t,
                "'": t
            };
            return {
                some: function(t) {
                    return function(e, t) {
                        for (var n, o, i = 0; o = e[i]; i++) if (("[" === o || "{" === o) && (i += (n = r[o](e.substr(i))).i, 
                        t(n.data))) return !0;
                    }(e, t);
                }
            };
        };
        const Lt = class {
            constructor(e) {
                this.engine = e;
            }
            getFacebookLinks(e, t) {
                return this._getFacebookLinks(e.extVideoId, (function(r, n, o, i) {
                    var a = {
                        action: e.action,
                        extVideoId: e.extVideoId,
                        links: r || null,
                        title: n || "",
                        thumb: o || "",
                        duration: i || ""
                    };
                    t(a);
                })), !0;
            }
            getFacebookLinksFromData(e, t) {
                var r = e.data, n = e.extVideoId;
                return this.getLinksFromData2(r, n, !0, (function(r, n, o, i) {
                    var a = {
                        action: "getFacebookLinksFromData",
                        extVideoId: e.extVideoId,
                        links: r || null,
                        title: n || "",
                        thumb: o || "",
                        duration: i || ""
                    };
                    t(a);
                }));
            }
            _getFacebookLinks(e, t) {
                A({
                    type: "GET",
                    url: "https://www.facebook.com/video.php?v=" + e,
                    headers: {
                        Cookie: ""
                    }
                }, ((r, n, o) => {
                    if (r || !o) return t();
                    this.getLinksFromData(o, e, t);
                }));
            }
            getLinksFromData(e, t, r) {
                var n = e.match(/\["params","([^"]*)"\]/im);
                if (!n) return this.getLinksFromData2(e, t, !1, r);
                var o = null;
                try {
                    if ((o = JSON.parse(decodeURIComponent(JSON.parse('"' + n[1] + '"'))).video_data).progressive && (o = o.progressive), 
                    !o) return r();
                } catch (e) {
                    return r();
                }
                var i = null, a = null, s = [], u = {
                    sd_src: "SD",
                    hd_src: "HD"
                };
                Array.isArray(o) || (o = [ o ]);
                for (var c, l = 0; c = o[l]; l++) [ "sd_src", "hd_src" ].forEach((e => {
                    if (c.thumbnail_src && (i = c.thumbnail_src), c.video_duration && (a = c.video_duration), 
                    c[e]) {
                        var t = this.getFileExtension(c[e], "mp4");
                        s.push({
                            url: c[e],
                            name: u[e],
                            type: t,
                            ext: t.toUpperCase()
                        });
                    }
                }));
                r(s, "", i, a);
            }
            getLinksFromData2(e, t, r, n) {
                var o = null, i = function(e) {
                    return e.split(/"?videoData"?:\[/).some((function(e) {
                        return It(e).some((function(e) {
                            if ((e.sd_src || e.hd_src) && String(e.video_id) === String(t)) return o = e, !0;
                        }));
                    }));
                };
                if (r ? i(e) : Tt(e, [ /"?videoData"?:\[/ ]).some(i), !o) return n();
                var a, s = [];
                return o.sd_src && (a = this.getFileExtension(o.sd_src, "mp4"), s.push({
                    url: o.sd_src,
                    name: "SD",
                    type: a,
                    ext: a.toUpperCase()
                })), o.hd_src && (a = this.getFileExtension(o.hd_src, "mp4"), s.push({
                    url: o.hd_src,
                    name: "HD",
                    type: a,
                    ext: a.toUpperCase()
                })), n(s, "", o.thumbnail_src, o.video_duration);
            }
            getFileExtension(e, t) {
                var r = e.match(/\.([a-z0-9]{3,4})(\?|$)/i);
                return r ? (r = r[1]).toLowerCase() : t || "";
            }
            getFacebookPhotoUrl(e, t) {
                return e.fbid ? (A({
                    url: "https://www.facebook.com/photo.php?fbid=" + e.fbid
                }, (function(e, r, n) {
                    if (e || !n) return t();
                    if (i = n.match(/<a[^>]+fbPhotosPhotoActionsItem[^>]+href="([^">]+dl=1)"[^>]+>/i)) {
                        var o = i[1].replace(/&amp;/g, "&");
                        return t([ o ]);
                    }
                    var i, a = [], s = {};
                    return (i = n.match(/(<a[^>]+rel="theater"[^>]+>)/gi)) && i.forEach((function(e) {
                        var t = e.match(/data-pl[os]i="[^"]+"/gi);
                        t && t.forEach((function(e) {
                            var t = e.indexOf("=");
                            if (-1 !== t) {
                                var r = e.substr(0, t), n = e.substr(t + 1);
                                n = n.substr(1, n.length - 2).replace(/&amp;/g, "&"), s[r] = n, a.push(n);
                            }
                        }));
                    })), s["data-ploi"] ? t([ s["data-ploi"] ]) : t(a);
                })), !0) : t();
            }
        };
        const At = class {
            constructor(e) {
                this.engine = e;
            }
            ffInstagramDownloadMedia(e) {
                var t = this;
                return n(i().mark((function r() {
                    var n, o, a, s, u;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return n = e.downloadFileUrl, o = e.filename, r.next = 3, fetch(n, {
                                headers: {
                                    "User-Agent": "curl/7.64.1"
                                }
                            });

                          case 3:
                            return a = r.sent, r.next = 6, a.blob();

                          case 6:
                            s = r.sent, u = URL.createObjectURL(s), t.engine.utils.downloadFile({
                                options: {
                                    filename: o,
                                    url: u
                                }
                            });

                          case 9:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        };
        const Rt = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            t && !Array.isArray(t) && (t = [ t ]);
            for (var r, n = [], o = {
                "{": 0,
                "[": 0
            }, i = {
                "}": "{",
                "]": "["
            }, a = /[{}\]\[":0-9.,-]/, s = /[\r\n\s\t]/, u = "", c = 0; r = e[c]; c++) if ('"' !== r) a.test(r) ? (u += r, 
            "{" === r || "[" === r ? (o["{"] || o["["] || (u = r), o[r]++) : "}" !== r && "]" !== r || (o[i[r]]--, 
            o["{"] || o["["] || n.push(u))) : "t" === r && "true" === e.substr(c, 4) ? (u += "true", 
            c += 3) : "f" === r && "false" === e.substr(c, 5) ? (u += "false", c += 4) : "n" === r && "null" === e.substr(c, 4) ? (u += "null", 
            c += 3) : s.test(r) || (o["{"] = 0, o["["] = 0, u = ""); else {
                for (var l = c; -1 !== l && (l === c || "\\" === e[l - 1]); ) l = e.indexOf('"', l + 1);
                -1 === l && (l = e.length - 1), u += e.substr(c, l - c + 1), c = l, o["{"] || o["["] || n.push(u);
            }
            for (var f = [], p = function() {
                var e = n[d];
                if ("{}" === e || "[]" === e) return 1;
                try {
                    t.every((function(t) {
                        return t.test(e);
                    })) && f.push(JSON.parse(e));
                } catch (e) {}
            }, d = 0, h = n.length; d < h; d++) p();
            return f;
        };
        const Pt = class {
            constructor(e) {
                this.engine = e;
            }
            getMailruLinks(e, t) {
                return this._getMailruLinks(e.extVideoId, (function(r, n, o, i, a) {
                    var s = {
                        action: e.action,
                        extVideoId: i || e.extVideoId,
                        links: r,
                        title: n,
                        thumb: o,
                        duration: a
                    };
                    t(s);
                })), !0;
            }
            _getMailruLinks(e, t) {
                var r, n = e, o = e.match(/\/([^\/]+)\/([^\/]+)\/video\/(.+).html/);
                if (o || (o = e.match(/embed\/([^\/]+)\/([^\/]+)\/(.+).html/)), o && (r = "http://api.video.mail.ru/videos/" + o[1] + "/" + o[2] + "/" + o[3] + ".json", 
                n = o[1] + "/" + o[2] + "/video/" + o[3] + ".html"), r) return this.onGetMailruMetadataUrl(r, n, t);
                A({
                    url: "http://my.mail.ru/" + e
                }, ((e, o, i) => {
                    if (e || !i) return t();
                    var a = /"metaUrl":/, s = null;
                    if (Tt(i, a).some((function(e) {
                        return Rt(e, a).some((function(e) {
                            if (e.metaUrl) return s = e, !0;
                        }));
                    })), s) return r = s.metaUrl, void this.onGetMailruMetadataUrl(r, n, t);
                    if (!(i = i.match(/<meta\s+content="[^"]+(videoapi\.my\.mail[^&]+)&[^"]+"[^>]+\/>/))) return t();
                    var u = (i = decodeURIComponent(i[1])).substr(i.lastIndexOf("/") + 1);
                    r = "http://videoapi.my.mail.ru/videos/" + u + ".json", this.onGetMailruMetadataUrl(r, n, t);
                }));
            }
            onGetMailruMetadataUrl(e, t, r) {
                this.getMailruMetadata(e, (e => {
                    if (!e || "string" == typeof e) return r();
                    this.readMailruMetadata(e, ((e, n, o, i) => {
                        r(this.prepMailruLinks(e), n, o, t, i);
                    }));
                }));
            }
            prepMailruLinks(e) {
                if (e) {
                    for (var t, r = [], n = 0; t = e[n]; n++) {
                        var o = t.url, i = "FLV";
                        -1 !== o.indexOf(".mp4") && (i = "MP4"), -1 !== o.indexOf(".mov") && (i = "MOV"), 
                        -1 !== o.indexOf(".mpg") && (i = "MPG"), t.quality || (t.quality = "-?-");
                        var a = t.quality.toUpperCase(), s = [ "1080P", "720P", "480P", "360P", "272P" ].indexOf(a);
                        -1 !== s && (a = [ "1080", "720", "480", "360", "272" ][s]);
                        var u = i.toLowerCase();
                        r.push({
                            url: o,
                            subname: a,
                            name: i,
                            ext: u
                        });
                    }
                    return r.sort((function(e, t) {
                        return "HD" === e.subname ? 1 : e.subname > t.subname;
                    })), r;
                }
            }
            getMailruMetadata(e, t) {
                if (!e) return t();
                A({
                    url: e,
                    json: !0
                }, (function(e, r, n) {
                    if (e || !n) return t();
                    t(n);
                }));
            }
            readMailruMetadata(e, t) {
                var r, n = [], o = void 0, i = void 0;
                if (e.meta && (i = e.meta.poster, o = e.meta.duration), "UPLOADED" === e.provider) {
                    if (r = e.movie ? e.movie.title : void 0, !e.videos) return t();
                    e.videos.forEach((function(e) {
                        n.push({
                            quality: e.name,
                            url: e.url,
                            title: r
                        });
                    }));
                } else if ("ugc" === e.provider) {
                    if (r = e.meta ? e.meta.title : void 0, !e.videos) return t();
                    e.videos.forEach((function(e) {
                        n.push({
                            quality: e.key,
                            url: e.url,
                            title: r
                        });
                    }));
                } else if ("pladform" === e.provider) {
                    return r = e.meta ? e.meta.title : void 0, void this.engine.modules.odnoklassniki.getPladformVideo({
                        extVideoId: {
                            playerId: e.meta.playerId,
                            videoId: e.meta.videoId
                        }
                    }, (function(e) {
                        if (!e) return t();
                        "getRutubeLinks" === e.action && (e.links = null);
                        var n = e.links;
                        if (!n) return t();
                        n.forEach((function(e) {
                            void 0 === e.title && (e.title = r);
                        })), t(n, r, i, o);
                    }));
                }
                return 0 === n.length ? t() : t(n, r, i, o);
            }
        };
        var Ct = c("match_tv_embed");
        const jt = function(e, t) {
            var r = null;
            r = !(t = t || {}).params && /\?/.test(e) ? e.match(/[^?]*\?(.*)/)[1] : e;
            for (var n = t.sep || "&", o = r.split(n), i = {}, a = 0, s = o.length; a < s; a++) {
                var u = o[a].split("="), c = u[0], l = u[1] || "";
                if (t.noDecode) i[c] = l; else {
                    try {
                        c = decodeURIComponent(c);
                    } catch (e) {
                        c = unescape(c);
                    }
                    try {
                        i[c] = decodeURIComponent(l);
                    } catch (e) {
                        i[c] = unescape(l);
                    }
                }
            }
            return i;
        };
        var Nt = /\\(\\u[0-9a-f]{4})/g;
        const Ut = function(e) {
            try {
                return JSON.parse(JSON.stringify(e).replace(Nt, "$1"));
            } catch (t) {
                return e;
            }
        };
        const Mt = {
            maxLength: 80,
            rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            illegalRe: /[\/?<>\\:*|"~\u202B]/g,
            controlRe: /[\x00-\x1f\x80-\x9f]/g,
            zeroWidthJoinerRe: /\u200D/g,
            reservedRe: /^\.+/,
            trim: function(e) {
                return e.replace(this.rtrim, "");
            },
            partsRe: /^(.+)\.([a-z0-9]{1,4})$/i,
            getParts: function(e) {
                return e.match(this.partsRe);
            },
            specialChars: "nbsp,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,times,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,divide,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml".split(","),
            specialCharsList: [ [ "amp", "quot", "lt", "gt" ], [ 38, 34, 60, 62 ] ],
            specialCharsRe: /&([^;]{2,6});/g,
            decodeSpecialChars: function(e) {
                var t = this;
                return e.replace(this.specialCharsRe, (function(e, r) {
                    var n = null;
                    if ("#" === r[0]) return n = parseInt(r.substr(1)), isNaN(n) ? "" : String.fromCharCode(n);
                    var o = t.specialCharsList[0].indexOf(r);
                    return -1 !== o ? (n = t.specialCharsList[1][o], String.fromCharCode(n)) : -1 !== (o = t.specialChars.indexOf(r)) ? (n = o + 160, 
                    String.fromCharCode(n)) : "";
                }));
            },
            decodeHexChars: function(e) {
                return e.replace(/(\\x[a-zA-Z0-9]{2})/g, (function(e, t) {
                    var r = t;
                    try {
                        r = String.fromCharCode(parseInt("0x" + r.substr(2), 16));
                    } catch (e) {}
                    return r;
                }));
            },
            rnRe: /\r?\n/g,
            re1: /[*?"]/g,
            re2: /</g,
            re3: />/g,
            spaceRe: /[\s\t\uFEFF\xA0]+/g,
            dblRe: /(\.|!|\?|_|,|-|:|\+){2,}/g,
            re4: /[.,:;\/\-_+=']$/g,
            modify: function(e) {
                if (!e) return "";
                e = Ut(e);
                try {
                    e = decodeURIComponent(e);
                } catch (t) {
                    e = unescape(e);
                }
                if (e = (e = this.decodeSpecialChars(e)).replace(this.rnRe, " "), (e = (e = this.trim(e)).replace(this.zeroWidthJoinerRe, "").replace(this.re1, "").replace(this.re2, "(").replace(this.re2, "(").replace(this.re3, ")").replace(this.spaceRe, " ").replace(this.dblRe, "$1").replace(this.illegalRe, "_").replace(this.controlRe, "").replace(this.reservedRe, "").replace(this.re4, "")).length > this.maxLength) {
                    var t = this.getParts(e);
                    t && 3 == t.length && (t[1] = t[1].substr(0, this.maxLength), e = t[1] + "." + t[2]);
                }
                return this.trim(e);
            }
        };
        const Dt = () => "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
        var Ft = r(894);
        const Vt = class {
            constructor(e) {
                this.engine = e;
            }
            getOkVideoUrlFromMobile(e) {
                return n(i().mark((function t() {
                    var r, n, o, a, s, u, c;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return r = e.videoUrl, n = e.videoId, r = r.replace("/ok.ru", "/m.ok.ru"), t.next = 4, 
                            R(r);

                          case 4:
                            if (o = t.sent, a = o.body, s = a.match(/data-video=".*?"/g), Array.isArray(s)) {
                                t.next = 9;
                                break;
                            }
                            return t.abrupt("return");

                          case 9:
                            return u = s.map((e => {
                                try {
                                    var t = e.replace(/data-video="(.*?)"/, "$1").replace(/&quot;/g, '"');
                                    return JSON.parse(t);
                                } catch (e) {
                                    return !1;
                                }
                            })).filter(Boolean), c = u.find((e => parseInt(e.movieId) === parseInt(n))), t.abrupt("return", c && c.videoSrc);

                          case 12:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            getOdnoklassnikiLinks(e, t) {
                return this._getOdnoklassnikiLinks(e.extVideoId, (function(r) {
                    var n = {
                        action: e.action,
                        extVideoId: e.extVideoId,
                        links: r,
                        title: e.title
                    };
                    t(n);
                })), !0;
            }
            getOdnoklassnikiAudioLinks(e, t) {
                return this._getOdnoklassnikiAudioLinks(e.url, e.trackId, e.jsessionId, (function(r) {
                    var n = {
                        action: e.action,
                        trackId: e.trackId,
                        jsessionId: e.jsessionId,
                        data: r
                    };
                    t(n);
                })), !0;
            }
            _getOdnoklassnikiLinks(e, t) {
                e ? A({
                    url: "http://in.video.mail.ru/cgi-bin/video/oklite?eid=" + e
                }, (function(r, n, o) {
                    if (r || !o) return t(null);
                    var i = "http://www.okcontent.video.mail.ru/media/", a = o.match(/\$vcontentHost=([^\s"'<>]+)/i);
                    a && a.length > 1 && (i = "http://" + a[1] + "/media/"), i += e;
                    var s = [], u = "", c = o.match(/\$height=([0-9]+)/);
                    c && c.length > 1 && (u = c[1]), s.push({
                        url: i + "-v.mp4",
                        name: "SD",
                        ext: "FLV",
                        subname: u
                    }), o.search(/\$HDexist=1/i) > -1 && (u = "", (c = o.match(/\$HDheight=([0-9]+)/)) && c.length > 1 && (u = c[1]), 
                    s.push({
                        url: i + "-hv.mp4",
                        name: "HD",
                        ext: "MP4",
                        subname: u
                    })), s && t(s);
                })) : t(null);
            }
            _getOdnoklassnikiAudioLinks(e, t, r, n) {
                if (!t || !r) return n(null);
                A({
                    url: "http://wmf1.ok.ru/play;jsessionid=" + r + "?tid=" + t,
                    json: !0
                }, (function(e, t, r) {
                    if (e || !r) return n(null);
                    n(r);
                }));
            }
            getOkAudioListLinks(e, t) {
                var r = [], n = e.trackIdArr, o = e.jsessionId;
                if (!Array.isArray(n) || "string" != typeof o || !n.length) return t(r);
                for (var i, a = n.length, s = 0, u = function(e) {
                    e && r.push(e), function() {
                        if (++s === a) t(r);
                    }();
                }, c = 0; i = n[c]; c++) this._getOdnoklassnikiAudioLinks(void 0, i, o, u);
                return !0;
            }
            getClipyouLinks(e, t, r, n, o) {
                A({
                    url: "http://media.clipyou.ru/api/player/secure_link?record_id=" + e + "&type=mp4&resource_hash=" + t,
                    json: !0
                }, (function(e, t, i) {
                    if (e || !i || !Array.isArray(i.data) || !i.data.length) return o();
                    var a = [];
                    i.data.forEach((function(e) {
                        a.push({
                            quality: r,
                            url: e,
                            title: n
                        });
                    })), o(a);
                }));
            }
            getClipyouHash(e, t) {
                A({
                    url: "http://media.clipyou.ru/api/player_data.json?id=" + e
                }, (function(e, r, n) {
                    if (e || !n) return t();
                    if (!(n = n.match('resource_hash".?:.?"([^"]*)"')) || n.length < 2) return t();
                    var o = n[1];
                    t(o);
                }));
            }
            getPladformVideo(e, t) {
                var r = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: [],
                    title: e.title
                }, n = function() {
                    t(r);
                }, o = e.extVideoId.playerId, i = e.extVideoId.videoId;
                return A({
                    url: "http://out.pladform.ru/getVideo?pl=" + o + "&videoid=" + i,
                    xml: !0
                }, ((e, t, o) => {
                    if (e || !o) return n();
                    var i = o.querySelectorAll("src");
                    if (0 === i.length) return n();
                    var a = o.querySelector("cover") || void 0;
                    a && (a = a.textContent) && "//" === a.substr(0, 2) && (a = "http:" + a);
                    var s = o.querySelector("time") || void 0;
                    s = s && s.textContent;
                    var u = o.querySelector("title");
                    (u = u && u.textContent) && (r.title = u);
                    var c = i[0], l = c.getAttribute("type"), f = c.textContent || "", p = c.getAttribute("quality");
                    if (c) {
                        if ("clipyou" === l) return this.getClipyouHash(f, (e => {
                            if (!e) return n();
                            this.getClipyouLinks(f, e, p, u, (function(e) {
                                r.links = e, n();
                            }));
                        }));
                        if ("rutube" === l) {
                            var d = o.querySelector("external_embed");
                            return (d = d && d.textContent) && (r.action = "getRutubeLinks", r.links = [ d ]), 
                            n();
                        }
                    }
                    for (var h, m = [ "ld", "sd" ], g = [ "360", "720" ], y = 0; h = i[y]; y++) {
                        f = h.textContent || "", p = h.getAttribute("quality"), /^\d+p$/.test(p) && (p = p.match(/^(\d+)p$/)[1]);
                        var v = m.indexOf(p);
                        -1 !== v && (p = g[v]), "video" === (l = h.getAttribute("type")) && r.links.push({
                            url: f,
                            quality: p,
                            title: u,
                            cover: a,
                            duration: s
                        });
                    }
                    return n();
                })), !0;
            }
            getOkMetadata(e, t) {
                var r = e.url;
                return r ? (A({
                    method: "POST",
                    url: r,
                    json: !0
                }, (function(e, r, n) {
                    if (e || !n) return t();
                    t(n);
                })), !0) : t();
            }
            getOkViaMobile(e, t) {
                var r = e.metadata, n = {
                    "st.cmd": "movieLayer",
                    "st.mvId": e.mvId
                }, o = "http://m.ok.ru/dk?" + Ft.stringify(n), i = {
                    action: e.action,
                    links: null,
                    title: r.movie.title
                };
                return A({
                    url: o
                }, (function(n, o, a) {
                    if (n || !a) return t();
                    var s = new RegExp('href="([^"]+st\\.cmd=moviePlaybackRedirect[^"]+st\\.mvid=' + e.mvId + '[^"]+)"'), u = a.match(s);
                    if (!(u = u && u[1])) return t();
                    if (u = Mt.decodeSpecialChars(u), i.links = [ {
                        url: u
                    } ], !/st.mq=\d+/.test(u)) return t(i);
                    var c = r.videos;
                    if (!c || !c.length) return t(i);
                    c.forEach((function(e) {
                        if (e.url) {
                            var t = jt(e.url);
                            t.type && (e.url = u.replace(/(st.mq=)\d+/, "$1" + t.type));
                        }
                    })), i.links = c, t(i);
                })), !0;
            }
            okDirectOrMobile(e, t) {
                var r = e.metadata, n = null;
                r.videos && r.videos.some((function(e) {
                    if (e.url) return n = e.url, !0;
                }));
                var o = () => {
                    e.action = "getOkViaMobile", this.getOkViaMobile(e, t);
                };
                return n ? (A({
                    url: n,
                    type: "HEAD"
                }, (function(n) {
                    return n ? o() : (e.action = "getOkViaMobileNoWrap", e.links = r.videos, t(e));
                })), !0) : (o(), !0);
            }
            okRequestVideoPage(e) {
                var t = e.videoId;
                return R({
                    url: `https://ok.ru/video/${t}`,
                    headers: {
                        "user-agent": Dt()
                    }
                }).then((e => e.body));
            }
        };
        const qt = function(e) {
            e = e ? e + "_" : "";
            var t = Date.now();
            return e + Math.floor(1e12 * (t - Math.floor(t))).toString(36) + Math.floor(1e12 * Math.random()).toString(36);
        };
        var $t = 16e6, Bt = new Map;
        function Ht(e) {
            var t = qt(e);
            return Bt.set(t, {
                id: t,
                xhr: new XMLHttpRequest
            }), t;
        }
        function Gt(e) {
            return new Promise((function(t, r) {
                var n = Bt.get(e.id), o = e.fetchOptions, i = n.xhr;
                for (var a in i.onload = () => {
                    t({
                        id: n.id,
                        numChunks: Math.ceil(i.response.byteLength / $t) || 1,
                        response: {
                            ok: i.status >= 200 && i.status < 300,
                            status: i.status,
                            statusText: i.statusText,
                            headers: Qt(i.getAllResponseHeaders() || ""),
                            url: i.responseURL
                        }
                    });
                }, i.onerror = i.ontimeout = () => {
                    r(new TypeError("Network request failed"));
                }, i.onabort = () => {
                    r(new DOMException("Aborted", "AbortError"));
                }, i.responseType = "arraybuffer", i.open(o.method || "GET", e.url, !0), o.headers) i.setRequestHeader(a, o.headers[a]);
                i.send();
            }));
        }
        function zt(e) {
            return function(e) {
                for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e99, n = 8192, o = [], i = Math.min(e.byteLength, t + r); t < i; t += n) o.push(String.fromCharCode.apply(null, new Uint8Array(e, t, Math.min(n, i - t))));
                return o.join("");
            }(Bt.get(e.id).xhr.response, e.chunkIndex * $t, $t);
        }
        function Wt(e) {
            Array.from(Bt.keys()).filter((t => -1 !== t.indexOf(e))).map((e => Yt(e)));
        }
        function Yt(e) {
            var t = Bt.get(e);
            t && (t.xhr && t.xhr.abort(), Bt.delete(e));
        }
        function Qt(e) {
            var t = e.split(/\r?\n/), r = [];
            return t.forEach((e => {
                var t = e.indexOf(":");
                if (-1 !== t) {
                    var n = e.substr(0, t).trim(), o = e.substr(t + 1).trim();
                    r.push([ n, o ]);
                }
            })), r;
        }
        const Kt = function(e, t) {
            var r = (new DOMParser).parseFromString("<html><body>" + e + "</body></html>", "text/html");
            if (t) {
                var n = r.head.querySelector("base");
                n || ((n = r.createElement("base")).href = t, r.head.appendChild(n));
            }
            return r;
        };
        function Jt(e, t) {
            var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!r) {
                if (Array.isArray(e) || (r = function(e, t) {
                    if (!e) return;
                    if ("string" == typeof e) return Xt(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === r && e.constructor && (r = e.constructor.name);
                    if ("Map" === r || "Set" === r) return Array.from(e);
                    if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Xt(e, t);
                }(e)) || t && e && "number" == typeof e.length) {
                    r && (e = r);
                    var n = 0, o = function() {};
                    return {
                        s: o,
                        n: function() {
                            return n >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[n++]
                            };
                        },
                        e: function(e) {
                            throw e;
                        },
                        f: o
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var i, a = !0, s = !1;
            return {
                s: function() {
                    r = r.call(e);
                },
                n: function() {
                    var e = r.next();
                    return a = e.done, e;
                },
                e: function(e) {
                    s = !0, i = e;
                },
                f: function() {
                    try {
                        a || null == r.return || r.return();
                    } finally {
                        if (s) throw i;
                    }
                }
            };
        }
        function Xt(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n;
        }
        function Zt() {
            Zt = function(e, t) {
                return new r(e, void 0, t);
            };
            var e = RegExp.prototype, t = new WeakMap;
            function r(e, n, o) {
                var i = RegExp(e, n);
                return t.set(i, o || t.get(e)), yt(i, r.prototype);
            }
            function n(e, r) {
                var n = t.get(r);
                return Object.keys(n).reduce((function(t, r) {
                    var o = n[r];
                    if ("number" == typeof o) t[r] = e[o]; else {
                        for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length; ) i++;
                        t[r] = e[o[i]];
                    }
                    return t;
                }), Object.create(null));
            }
            return vt(r, RegExp), r.prototype.exec = function(t) {
                var r = e.exec.call(this, t);
                if (r) {
                    r.groups = n(r, this);
                    var o = r.indices;
                    o && (o.groups = n(o, this));
                }
                return r;
            }, r.prototype[Symbol.replace] = function(r, o) {
                if ("string" == typeof o) {
                    var i = t.get(this);
                    return e[Symbol.replace].call(this, r, o.replace(/\$<([^>]+)>/g, (function(e, t) {
                        var r = i[t];
                        return "$" + (Array.isArray(r) ? r.join("$") : r);
                    })));
                }
                if ("function" == typeof o) {
                    var a = this;
                    return e[Symbol.replace].call(this, r, (function() {
                        var e = arguments;
                        return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(n(e, a)), 
                        o.apply(this, e);
                    }));
                }
                return e[Symbol.replace].call(this, r, o);
            }, Zt.apply(this, arguments);
        }
        class er {
            constructor(e) {
                var t = xt(e, Zt(/#EXTINF:[\s\S]*?,\n([\s\S]*?)$/gm, {
                    url: 1
                }));
                this.urls = [];
                var r, n = Jt(t);
                try {
                    for (n.s(); !(r = n.n()).done; ) {
                        var o = r.value;
                        o.groups && o.groups.url ? this.urls.push(o.groups.url) : o[1] && this.urls.push(o[1]);
                    }
                } catch (e) {
                    n.e(e);
                } finally {
                    n.f();
                }
            }
            static createFromURL(e) {
                return R(e).then((e => new er(e.body)));
            }
            changeURLs(e) {
                this.urls = this.urls.map(e);
            }
            _downloadTask(e) {
                return fetch(e).then((e => {
                    if (e.ok) return e.blob();
                    throw new Error("bad response");
                }));
            }
            download() {
                var e = this.urls.map((e => this._downloadTask(e)));
                return Promise.all(e).then((e => {
                    var t = new Blob(e, {
                        type: e[0].type
                    });
                    return URL.createObjectURL(t);
                }));
            }
            fetchMimeType() {
                return fetch(this.urls[0], {
                    method: "head"
                }).then((e => e.headers.get("Content-Type")));
            }
            _emit(e, t) {
                var r = new CustomEvent("hlsDownloader." + e, {
                    detail: t
                });
                document.dispatchEvent(r);
            }
        }
        const tr = er;
        var rr = r(894), nr = c("soundcloud_com_embed");
        const or = class {
            constructor(e) {
                this.engine = e;
            }
            ffTiktokDownloadMedia(e) {
                var t = this;
                return n(i().mark((function r() {
                    var n, o, a, s, u;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return n = e.downloadFileUrl, o = e.filename, r.next = 3, fetch(n, {
                                headers: {
                                    "User-Agent": "curl/7.64.1"
                                }
                            });

                          case 3:
                            return a = r.sent, r.next = 6, a.blob();

                          case 6:
                            s = r.sent, u = URL.createObjectURL(s), t.engine.utils.downloadFile({
                                options: {
                                    filename: o,
                                    url: u
                                }
                            });

                          case 9:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        };
        function ir(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        var ar = c("utils"), sr = null, ur = {
            getFileSize: function(e, t) {
                var r = e.url, n = e.requestOptions, o = {
                    fileSize: 0,
                    fileType: "",
                    status: 0,
                    error: !1
                };
                return A(function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? ir(Object(r), !0).forEach((function(t) {
                            Y(e, t, r[t]);
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ir(Object(r)).forEach((function(t) {
                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                        }));
                    }
                    return e;
                }({
                    url: r,
                    type: "HEAD"
                }, void 0 === n ? {} : n), (function(e, r) {
                    if (e) return o.error = !0, t(o);
                    o.status = r.statusCode, o.fileSize = parseInt(r.headers["content-length"]) || 0;
                    var n = r.headers["content-type"];
                    n && (o.fileType = n), t(o);
                })), !0;
            },
            ChromeDl: function() {
                var e = {}, t = !1, r = function(r) {
                    e[r] && delete e[r], 0 === Object.keys(e).length && (t = !1, chrome.downloads.onChanged.removeListener(n));
                }, n = function(t) {
                    var n = e[t.id];
                    if (n) {
                        var o = !1;
                        n.fixNetworkFiled && (o = function(e, t) {
                            var r = parseInt(Date.now() / 1e3), n = !1;
                            e.lastFix || (e.lastFix = 0), e.lastFix + 5 < r && (e.lastFix = r, n = !0);
                            var o = t.state && "interrupted" === t.state.current, i = t.error && "NETWORK_FAILED" === t.error.current, a = t.canResume && t.canResume.current;
                            return o && i && a || (n = !1), n;
                        }(n, t)), o ? chrome.downloads.resume(t.id) : t.state && -1 !== [ "interrupted", "complete" ].indexOf(t.state.current) && r(t.id);
                    }
                };
                this.download = function(r) {
                    var o = r.url, i = r.filename;
                    r.fixNetworkFiled = /(vk\.me|userapi\.com)\/.+\.mp4/i.test(o);
                    var a = {
                        url: o,
                        filename: i
                    }, s = sr.preferences || sr.storage || {};
                    E.isFirefox && s.saveAsDialog && (a.saveAs = !0), chrome.downloads.download(a, (function(o) {
                        r.fixNetworkFiled && (!function(t, r) {
                            e[t] || (e[t] = r);
                        }(o, r), t || (t = !0, chrome.downloads.onChanged.addListener(n)));
                    }));
                };
            },
            chromeDownload: null,
            downloadFile: function(e) {
                var t = sr.preferences.sortDownloads;
                if ("object" == typeof e.options.url && E.isFirefox && (e.options.url = URL.createObjectURL(e.options.url)), 
                t && t.isEnabled) {
                    var r = e.options.filename.slice(e.options.filename.lastIndexOf(".") + 1), n = t.groups.find((e => e.formats.some((e => -1 !== e.indexOf(r)))));
                    n && n.dir && (e.options.filename = `${n.dir}/${e.options.filename}`);
                }
                var o = ur;
                if (E.isChrome || E.isFirefox) {
                    o.chromeDownload || (o.chromeDownload = new o.ChromeDl);
                    var i = function() {
                        return o.chromeDownload.download(e.options);
                    };
                    if (chrome.downloads && chrome.downloads.download) return i();
                    chrome.permissions && chrome.permissions.request ? chrome.permissions.request({
                        permissions: [ "downloads" ]
                    }, (function(e) {
                        if (e) return i();
                        ar.error("Permissions not granted!");
                    })) : ar.error("Method in not supported!");
                } else E.isGM && GM_download(e.options.url, e.options.filename);
            },
            chromeListDownload: function(e, t) {
                var r = null;
                e = e.map((function(e) {
                    return {
                        url: e.url,
                        filename: t + e.filename
                    };
                }));
                var n = function(e) {
                    if (e.id === r && e.state) return -1 !== [ "interrupted", "complete" ].indexOf(e.state.current) ? (r = null, 
                    i()) : void 0;
                };
                chrome.downloads.onChanged.addListener(n);
                var o = -1, i = function() {
                    o++;
                    var t = e[o];
                    if (t) return chrome.downloads.download({
                        url: t.url,
                        filename: t.filename
                    }, (function(e) {
                        r = e;
                    }));
                    chrome.downloads.onChanged.removeListener(n);
                };
                return i();
            },
            downloadList: function(e) {
                var t = this, r = e.fileList, n = e.folder;
                (E.isChrome || E.isFirefox) && chrome.downloads && chrome.downloads.download ? t.chromeListDownload(r, n) : r.forEach((function(e) {
                    t.downloadFile({
                        options: {
                            url: e.url,
                            filename: n + e.filename
                        }
                    });
                }));
            },
            getUmmyIcon: function(e, t) {
                t("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB90lEQVQ4EcVSy2oUURCtqm7HcYgmYDTiYxEEERdZGP0B0UVwEcSv8LHIb4gbQcjGlVtB40YhfkAWuhs0uFOIgjJomiEzztzue4+n7rTgH6SaoqpPnao6fW+LHLapC9hdPHMbKT1UTcsQWxDBnAAdFkuvQ6QR1cD0QAUVoF+0kKdXBoO32j959maK8V1LVDaBDXkwm9q32atz/hmRpIZb5STqPaDIjP/oFAS5Xu1l/MPCBZhxt09uSRykCn1QhmQr1MiSQ3TPGYdIMtwfZPh3MjkhlvOWOcuTrJQB5VJeR0g5HlzjMSSVpp7mtQGFBJjXwJp69AlqtlTW0bpQ6nNLbTdjSCIxNhkOqUBwBconZYWZr1G6RgXcRoI782k0rO681vVq15o6SGyCrFefbHVnS6eNkmcSyMlOvr48ernimjlf5WcUuP1zr7C7W090/twiMcjw+y95dWcjXRr7Sn6Ba8mmB1RQ/MwqOK2mg356FPFi4xGm4z8I40nOT434OanElDdWM2aH/eAtHOlz98XZRBch0uPnHPu4J9uPn+dNzNGTLho/Kj+D1gza12fl1RuEtlmaaWPiGkOK8k0mecB5Nnes8DZvdiwPgRVrmbAp19aI8Fe2ZSDN86aOk9OpkfiHqfKoap9JfMTWfcavvNXN+/H9G596uPYX83AWUVC6/FsAAAAASUVORK5CYII=");
            },
            getWarningIcon: function(e, t) {
                var r, n = e.color || "#c2c2c2";
                r = "audio" === e.type ? '<svg width="21px" height="24px" viewBox="0 0 21 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21,2.76923077 L21,17.6487288 C21,17.6487288 21,17.6487288 21,17.6487288 L21,18.4615385 L20.9068729,18.4615385 C20.723595,19.2712249 20.2716013,20.0865791 19.5669296,20.7680198 C17.9203537,22.360313 15.5176896,22.6184747 14.2004289,21.3446402 C12.8831682,20.0708056 13.1501309,17.7473503 14.7967068,16.1550571 C16.0602516,14.9331676 17.7690324,14.4969051 19.0909091,14.9356816 L19.0909091,14.9356816 L19.0909091,4.15384615 L7.63636364,6.92307692 L7.63636364,19.4948826 C7.63636364,19.4948826 7.63636364,19.4948826 7.63636364,19.4948826 L7.63636364,20.3076923 L7.5432365,20.3076923 C7.35995859,21.1173788 6.90796493,21.9327329 6.20329323,22.6141737 C4.55671732,24.2064669 2.15405328,24.4646286 0.836792552,23.190794 C-0.480468173,21.9169595 -0.213505501,19.5935041 1.43307041,18.0012109 C2.69661523,16.7793214 4.40539601,16.343059 5.72727273,16.7818354 L5.72727273,16.7818354 L5.72727273,6.46153846 L5.72727273,3.69230769 L21,0 L21,2.76923077 Z" fill="' + n + '"></path></svg>' : "playlist" === e.type ? '<svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M0,0 L0,3.6 L3.42857143,3.6 L3.42857143,0 L0,0 Z M0,7.2 L0,10.8 L3.42857143,10.8 L3.42857143,7.2 L0,7.2 Z M5.14285714,0 L5.14285714,3.6 L24,3.6 L24,0 L5.14285714,0 Z M5.14285714,7.2 L5.14285714,10.8 L20.5714286,10.8 L20.5714286,7.2 L5.14285714,7.2 Z M0,14.4 L0,18 L3.42857143,18 L3.42857143,14.4 L0,14.4 Z M5.14285714,14.4 L5.14285714,18 L22.2857143,18 L22.2857143,14.4 L5.14285714,14.4 Z" fill="' + n + '"></path></svg>' : '<svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M19.5,3 L21.0089096,3 C22.6582294,3 24,4.34288718 24,5.99942248 L24,15.0005775 C24,16.6556493 22.6608432,18 21.0089096,18 L2.99109042,18 C1.34177063,18 0,16.6571128 0,15.0005775 L0,5.99942248 C0,4.34435073 1.33915679,3 2.99109042,3 L7.5,3 C7.5,1.34651712 8.84187067,0 10.497152,0 L16.502848,0 C18.1583772,0 19.5,1.34314575 19.5,3 L19.5,3 Z M13.5,16.5 C16.8137087,16.5 19.5,13.8137087 19.5,10.5 C19.5,7.18629134 16.8137087,4.5 13.5,4.5 C10.1862913,4.5 7.5,7.18629134 7.5,10.5 C7.5,13.8137087 10.1862913,16.5 13.5,16.5 Z M13.5,15 C15.9852815,15 18,12.9852815 18,10.5 C18,8.0147185 15.9852815,6 13.5,6 C11.0147185,6 9,8.0147185 9,10.5 C9,12.9852815 11.0147185,15 13.5,15 Z" fill="' + n + '"></path></svg>', 
                t("data:image/svg+xml;utf8," + encodeURIComponent(r));
            },
            checkUrlsOfOpenTabs: function(e, t) {
                (E.isGM ? function(e) {
                    e([ location.href ]);
                } : E.isChrome ? function(e) {
                    var t = [];
                    chrome.tabs.query({}, (function(r) {
                        r.forEach((function(e) {
                            t.push(e.url);
                        })), e(t);
                    }));
                } : E.isFirefox ? function(e) {
                    var t = [];
                    if (E.isFirefoxMobile) return e(t);
                    chrome.tabs.query({}, (function(r) {
                        r.forEach((function(e) {
                            t.push(e.url);
                        })), e(t);
                    }));
                } : E.isSafari ? function(e) {
                    var t = [];
                    safari.application && safari.application.activeBrowserWindow && safari.application.activeBrowserWindow.tabs && safari.application.activeBrowserWindow.tabs.forEach((function(e) {
                        if (!e.url) return 1;
                        t.push(e.url);
                    })), e(t);
                } : function(e) {
                    e([]);
                })((function(r) {
                    var n = [];
                    r.forEach((function(t) {
                        e.forEach((function(e) {
                            -1 !== t.search(e) && n.push(t);
                        }));
                    })), t(n);
                }));
            },
            getData: function(e, t) {
                var r = e.url;
                return r ? (A({
                    url: r
                }, (function(e, r, n) {
                    if (e) return t();
                    t(n);
                })), !0) : t();
            }
        };
        const cr = e => (sr = e, ur);
        var lr = c("VimeoComEmbed");
        const fr = class {
            constructor(e) {
                this.engine = e;
            }
            getVimeoLinks(e, t) {
                return this._getVimeoLinks(e.extVideoId, e.url, (function(r, n, o) {
                    var i = {
                        action: e.action,
                        extVideoId: e.extVideoId,
                        links: r,
                        title: n,
                        thumb: o
                    };
                    t(i);
                })), !0;
            }
            _getVimeoLinks(e, t, r) {
                this.getVimeoNoEmbedLinks(e, t, ((t, n, o) => {
                    if (t) return r(t, n, o);
                    this.getVimeoEmbedLinks(e, r);
                }));
            }
            getVimeoVideoData(e, t) {
                A({
                    url: `https://vimeo.com/api/oembed.json?url=${e}`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }, ((e, r, n) => {
                    if (e || !n) return console.error("Error fetching Vimeo video data:", e), t(null);
                    try {
                        var o = JSON.parse(n);
                        return o && o.video_id ? t(o.video_id) : t(null);
                    } catch (e) {
                        return console.error("Error parsing Vimeo video data:", e), t(null);
                    }
                }));
            }
            getVimeoEmbedLinks(e, t) {
                var r = function() {
                    return t(null, "", "");
                };
                if (!e) return r();
                var n, o, i = e;
                i.toLowerCase().includes("https") ? (i = (o = (n = e).match(/(https:\/\/[^\s"}]+)/g)) && o.length > 0 ? o[0] : n, 
                this.getVimeoVideoData(i, (function(e) {
                    if (!e) return r();
                    this.fetchEmbedLinks(e, r, t);
                }))) : this.fetchEmbedLinks(e, r, t);
            }
            fetchEmbedLinks(e, t, r) {
                A({
                    url: "https://player.vimeo.com/video/" + e
                }, ((e, n, o) => {
                    if (e || !o) return t();
                    var i = Rt(o, [ /"files":/ ]), a = null;
                    return i.some((function(e) {
                        return e.video && e.request && e.request.files ? (a = e, !0) : null;
                    })), (o = this.getLinksFromConfig(a)) ? r(o.links, o.title, o.thumb) : t();
                }));
            }
            getVimeoConfig(e, t) {
                var r = function() {
                    return t(null, "", "");
                };
                A({
                    url: e
                }, ((e, n, o) => e || !o ? r() : (o = this.getVimeoDataFromConfig(o)) ? t(o.links, o.title, o.thumb) : r()));
            }
            getVimeoLinksFromConfigAction(e, t) {
                return new Promise(((t, r) => {
                    var n = this.getLinksFromConfig(e.config);
                    n ? t(n) : r(new Error("Get links from config error"));
                })).then(t, (e => {
                    lr.error("getVimeoLinksFromConfigAction error", e), t(null);
                })), !0;
            }
            getClipPageConfig(e, t) {
                var r = null;
                return Tt(e, /['"]config_url['"]\s*:\s*/).some((function(e) {
                    return Rt(e, /['"]config_url['"]\s*:\s*/).some((function(e) {
                        if (e.player && (r = e.player.config_url)) return !0;
                    }));
                })), r ? this.getVimeoConfig(r, t) : t(null, "", "");
            }
            getVimeoNoEmbedLinks(e, t, r) {
                if (e && t) {
                    var n = /vimeo\.com\/[^\/]+\/review\/\d+/i.test(t), o = /vimeo\.com\/\d+\/\w+/i.test(t);
                    n || o || (t = null);
                }
                A({
                    url: t || "https://vimeo.com/" + e
                }, ((e, t, n) => {
                    if (e || !n) return r(null, "", "");
                    var o = n.match(/data-config-url=["']([^\s"'<>]+)/i);
                    return (o = o && o[1].replace(/&amp;/gi, "&")) ? this.getVimeoConfig(o, r) : this.getClipPageConfig(n, r);
                }));
            }
            getVimeoLinksFromConfig(e, t) {
                var r = this.getLinksFromConfig(e.config);
                return t(r || null);
            }
            getLinksFromConfig(e) {
                if (!(e && e.video && e.request && e.request.files)) return null;
                var t = e.video, r = e.request.files;
                if (!e && !e.request && !e.request.files) return null;
                var n = {};
                n.title = t.title || "";
                var o = null;
                for (var i in t.thumbs) (null === o || o < i) && (o = i, n.thumb = t.thumbs[i]);
                for (var a in n.links = [], r) if ("hls" === a) {
                    var s = r[a].cdns[r[a].default_cdn];
                    n.links.push({
                        cdn: s,
                        url: s.url,
                        type: "hls",
                        separate_av: r[a].separate_av
                    });
                } else {
                    if (!Array.isArray(r[a])) continue;
                    r[a].forEach((function(e) {
                        if (e && e.url && e.mime) {
                            var t = e.mime.split("/")[1];
                            t || (t = (t = e.url.match(/\.(\w{2,4})(?:\?|#|$)/i)) && t[1] || "mp4");
                            var r = t.toUpperCase(), o = e.quality;
                            /^\d+p$/.test(o) && (o = o.replace(/p$/, ""));
                            var i = r + " " + o;
                            n.links.push({
                                url: e.url,
                                name: i,
                                height: o,
                                type: r,
                                format: r,
                                ext: t
                            });
                        }
                    }));
                }
                return n.links.length || (n = null), n;
            }
            getVimeoDataFromConfig(e) {
                e = e.replace(/(\{|,)\s*(\w+)\s*:/gi, '$1"$2":').replace(/(:\s+)\'/g, '$1"').replace(/\'([,\]\}])/g, '"$1');
                try {
                    e = JSON.parse(e);
                } catch (e) {
                    return null;
                }
                return this.getLinksFromConfig(e);
            }
        };
        const pr = function(e, t) {
            t && !Array.isArray(t) && (t = [ t ]);
            var r = [], n = -1, o = -1;
            do {
                if (-1 !== (o = e.indexOf('"', o + 1))) {
                    if ("\\" === e[o - 1]) continue;
                    -1 !== n ? (r.push(e.substr(n, o + 1 - n)), n = -1) : n = o;
                } else n = o;
            } while (-1 !== o);
            for (var i, a = [], s = function(e) {
                if ('""' === e) return 1;
                try {
                    t ? t.every((function(t) {
                        return t.test(e);
                    })) && a.push(JSON.parse(e)) : a.push(JSON.parse(e));
                } catch (e) {}
            }, u = 0; i = r[u]; u++) s(i);
            return a;
        };
        const dr = function(e, t, r) {
            r = r || [], Array.isArray(r) || (r = [ r ]);
            for (var n = [], o = new RegExp("(<" + e + "[^>]*>)", "i"), i = new RegExp("(</" + e + ">)", "i"), a = null, s = "", u = "", c = "", l = -1; (a = o.exec(t)) && (s = a[1], 
            -1 !== (l = t.indexOf(s))); ) t = t.substr(l + s.length), (a = i.exec(t)) && (u = a[1], 
            c = t.substr(0, t.indexOf(u)), n.push(s + c + u));
            return n.filter((function(e) {
                return r.every((function(t) {
                    return t.test(e);
                }));
            }));
        };
        const hr = class {
            constructor(e) {
                this.engine = e;
            }
            getVKLinks(e, t) {
                var r = this;
                return this._getVKLinks(e.extVideoId, ((n, o, i, a, s, u, c) => {
                    if (c) return c.origRequest = e, void r.engine.onMessage(c, {}, t);
                    var l = {
                        action: e.action,
                        extVideoId: n || e.extVideoId,
                        links: o,
                        title: i,
                        duration: a,
                        thumb: s,
                        data: u,
                        checkLinks: null
                    };
                    e.checkLinks && o && o.length > 0 ? this.checkVkLinks(o, (function(e, r) {
                        l.checkLinks = r, t(l);
                    })) : t(l);
                })), !0;
            }
            preparePladformLinks(e) {
                var t, r = {
                    links: t = []
                };
                return e.forEach((function(e) {
                    r.title = e.title, r.duration = e.duration, r.thumb = e.cover;
                    var n = e.url.match(/[\w]+\.(mp4|flv)(?:\?|$)/i);
                    n = n ? n[1] : "flv", t.push({
                        url: e.url,
                        name: n.toUpperCase(),
                        subname: e.quality.toUpperCase(),
                        type: n.toLowerCase()
                    });
                })), r;
            }
            _getVKLinks(e, t) {
                var r = this, n = [], o = e, i = null, a = null, s = "", u = "", c = e, l = null, f = null, p = null, d = /^video(-?\d+)_(\d+)/i;
                if (d.test(c)) l = c.match(d), f = parseInt(l[1]), p = parseInt(l[2]); else {
                    l = c.match(/(?:^|&)oid=(-?\d+)/i), f = l && parseInt(l[1]), l = c.match(/(?:^|&)id=(-?\d+)/i), 
                    p = l && parseInt(l[1]), c = "", f && p && (c = "video" + f + "_" + p);
                }
                return c ? (o = c, A({
                    url: "https://vk.com/" + c
                }, ((e, l, d) => {
                    if (e || !d) return t(c, n, o, u, s, i, a);
                    var h = null;
                    if (Rt(d, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                        var t = e && e[4] && e[4].player && e[4].player.params && e[4].player.params[0];
                        if (t && t.vid === p && t.oid === f) return h = t, !0;
                    })), h) {
                        var m = this.getVkLinksFromJson(h);
                        if (n = m.links, o = m.title, s = m.thumb, u = m.duration, n.length) return t(c, n, o, u, s, h, a);
                    }
                    var g = null;
                    Rt(d, [ /"player"/ ]).some((function(e) {
                        var t = e && e[4] && e[4].player && e[4].player.params && e[4].player.params[0];
                        if ("string" == typeof t) return g = t, !0;
                    }));
                    var y, v = !1;
                    g && ((y = /dailymotion.com\/(?:swf\/)?video\/([\w\d]+)/i.exec(g)) && (a = {
                        action: "getDailymotionLinks",
                        extVideoId: y[1]
                    }, v = !0));
                    if (v) return t(c, n, o, u, s, i, a);
                    var b = !1;
                    return pr(d, /video_box_wrap/).some((e => {
                        var l = null, f = /<iframe([^>]+)>/i.exec(e);
                        if (f) {
                            var p = f[1];
                            if (l = /youtube.com\\?\/embed\\?\/([\w\-]+)/i.exec(p)) return a = {
                                action: "getYoutubeLinks",
                                extVideoId: l[1]
                            }, !0;
                            if (l = /vimeo.com\\?\/video\\?\/(\d+)/i.exec(p)) return a = {
                                action: "getVimeoLinks",
                                extVideoId: l[1]
                            }, !0;
                            if (l = /src="([^"]*pladform\.ru[^"]+)"/i.exec(p)) {
                                b = !0;
                                var h = jt(l[1]);
                                return r.engine.modules.odnoklassniki.getPladformVideo({
                                    extVideoId: {
                                        playerId: h.pl,
                                        videoId: h.videoid
                                    }
                                }, (e => {
                                    e && "getRutubeLinks" === e.action && (e.links = null);
                                    var r = e && e.links;
                                    if (!Array.isArray(r)) return t(c, n, o, u, s, i, a);
                                    var l = this.preparePladformLinks(r);
                                    return t(c, l.links, l.title, l.duration, l.thumb, i, a);
                                })), !0;
                            }
                        }
                        var m = dr("video", e).some((function(e) {
                            var t = Kt(e, "https://vk.com/"), r = !1;
                            return [].slice.call(t.querySelectorAll("source")).forEach((function(e) {
                                var t = !1, i = e.src;
                                t || /^(.*cdninstagram\.com.+mp4)/i.exec(i) && (t = !0, r = !0, n.push({
                                    url: i,
                                    subname: "SD",
                                    name: "MP4",
                                    type: "mp4"
                                }));
                                if (!t) {
                                    var a = /\.(\d+)\.mp4(?:$|\?)/.exec(i);
                                    if (a) {
                                        t = !0, r = !0;
                                        var s = i, u = a[1], c = s.indexOf("?");
                                        -1 !== c && (s = s.substr(0, c)), pr(d, /mv_title/).some((function(e) {
                                            var t = /id="mv_title"[^>]*>([^<]+)/.exec(e);
                                            if (t) return o = Mt.decodeSpecialChars(Ut(t[1])), !0;
                                        })), n.push({
                                            url: s,
                                            subname: u,
                                            name: "MP4",
                                            type: "mp4"
                                        });
                                    }
                                }
                            })), r;
                        }));
                        return !!m || (/var\sopts\s*=\s*/.test(e) && (l = /url:\s*'(?:[^']+)dailymotion.com\/(?:swf\/)?video\/([\w\d]+)/.exec(e)) ? (a = {
                            action: "getDailymotionLinks",
                            extVideoId: l[1]
                        }, !0) : void 0);
                    })), !b && t(c, n, o, u, s, i, a);
                }))) : t(c, n, o);
            }
            checkVkLinks(e, t) {
                var r = "";
                e && e.length > 0 && (r = "mp4" == e[0].type ? e[0].url : e.length > 1 ? e[1].url : e[0].url), 
                r ? A({
                    url: r,
                    type: "HEAD"
                }, (function(e, n) {
                    t(r, !e);
                })) : t();
            }
            getVkLinksFromJsonMsg(e, t) {
                return t(this.getVkLinksFromJson(e.json));
            }
            getVkLinksFromJson(e) {
                var t = [], r = e.vid, n = e.md_title || e.vid, o = "";
                e.thumb ? o = e.thumb : e.jpg && (o = e.jpg);
                var i = /\.flv(\?|$)]/, a = /url([0-9]+)/;
                Object.keys(e).forEach((function(r) {
                    var n = "", o = "mp4", s = null;
                    "extra_data" === r && "99" === e.extra ? (n = "", e.live_mp4 ? n = e.live_mp4 : e.postlive_mp4 && (n = e.postlive_mp4), 
                    n && (s = e.hd ? "HD" : "SD", t.push({
                        url: n,
                        subname: s,
                        name: o.toUpperCase(),
                        type: o
                    }))) : "extra_data" === r && "52" === e.extra ? (s = e.hd ? "HD" : "SD", n = e.extra_data, 
                    i.test(n) && (o = "flv"), t.push({
                        url: n,
                        subname: s,
                        name: o.toUpperCase(),
                        type: o
                    })) : null !== (s = (s = r.match(a)) && s[1]) && (n = e[r], i.test(n) && (o = "flv"), 
                    t.push({
                        url: n,
                        subname: s,
                        name: o.toUpperCase(),
                        type: o
                    }));
                }));
                var s = e.duration;
                return {
                    action: "getVKLinks",
                    extVideoId: r,
                    links: t,
                    title: n,
                    duration: s,
                    thumb: o,
                    data: e,
                    checkLinks: null
                };
            }
            getVkLinksFromData(e, t) {
                var r = e.data, n = null;
                return Rt(r, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                    if (e = e.player && e.player.params && e.player.params[0]) return n = e, !0;
                })), n ? t(this.getVkLinksFromJson(n)) : t();
            }
            downloadVkStory(e) {
                var t = this;
                return n(i().mark((function r() {
                    var n, o, a, s, u;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return n = e.downloadFileUrl, o = e.filename, r.next = 3, fetch(n, {
                                headers: {
                                    "User-Agent": "curl/7.64.1"
                                }
                            });

                          case 3:
                            return a = r.sent, r.next = 6, a.blob();

                          case 6:
                            s = r.sent, u = URL.createObjectURL(s), t.engine.utils.downloadFile({
                                options: {
                                    filename: o,
                                    url: u
                                }
                            });

                          case 9:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        };
        function mr(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function gr(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? mr(Object(r), !0).forEach((function(t) {
                    Y(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mr(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var yr = (e, t, r) => `https://${e}/api/v2.1/handlers/track/${t}:${r}/web-home_new-chart-track-saved/download/m?hq=0&external-domain=music.yandex.ru&overembed=no&__t=${Date.now()}`, vr = (e, t, r, n, o) => `https://${e}/get-mp3/${t}/${r}/${n}?track-id=${o}&play=false`;
        function br(e, t) {
            for (var r, n = {
                "{": 0
            }, o = !1, i = "", a = !1, s = !1, u = 0, c = !1, l = /[,;=(\[\-+/*%&|]/, f = /[\s\r\n]/, p = {
                "}": "{"
            }, d = "", h = t; r = e[h]; h++) if (d += r, o || s || !c && !a || "/" !== r || u % 2 != 0 ? a || '"' !== r && "'" !== r || i && i !== r || u % 2 != 0 || (i = (o = !o) ? r : "") : a = !a, 
            a) "\\" === r ? u++ : (u % 2 == 0 && ("[" === r ? s = !0 : "]" === r && (s = !1)), 
            u = 0); else if (o) "\\" === r ? u++ : u = 0; else if (u = 0, l.test(r) ? c = !0 : f.test(r) || (c = !1), 
            "{" === r) n[r]++; else if ("}" === r && (n[p[r]]--, !n["{"])) return d;
            return "";
        }
        var wr = c("app:ThrottleSigDecipher").t;
        new Map, new Map;
        function xr(e) {
            return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
        }
        const kr = class {
            getSignatureFnCodeSafe(e) {
                try {
                    return this.getSignatureFnCode(e);
                } catch (e) {
                    wr("getSignatureFnCodeSafe error: %o", e);
                }
            }
            getSignatureFnCode(e) {
                var t;
                if (!(t = /[=(,&]([$\w]+)\(\w+\),\w+\.set\("\w+",/.exec(e))) {
                    if (!(t = /[=(,&]([$\w]+)\[(\d+)\]\(\w+\),\w+\.set\("\w+",/.exec(e))) throw new Error("Function variable name is not found");
                    var r = t[1], n = parseInt(t[2]);
                    wr("var name: %s", r), wr("index: %d", n);
                    var o = new RegExp("[ ,.]" + xr(r) + "=\\[([\\w\\$,]+)\\]").exec(e);
                    if (!o) throw new Error("Function variable name is not found");
                    wr("array values: %s", o[1]), (t = [])[1] = o[1].split(",")[n] || "";
                }
                var i = t[1];
                if (!(t = new RegExp("\n" + xr(i) + "=(function\\(([^)]*)\\){[^{]+)").exec(e))) throw new Error("Function scope start fragment is not found");
                var a = t[2].split(",")[0];
                wr("functionFirstArgName: %s", a);
                var s = e.indexOf(t[1]);
                if (-1 === s) throw new Error("First line pos is not found");
                var u = br(e, s);
                return this.fixupSignatureFnCode(u, a);
            }
            fixupSignatureFnCode(e, t) {
                var r = new RegExp(`if\\s*\\([^)]+\\)\\s*return ${t};`, "i");
                return wr("re: %s", r.toString()), e.replace(r, ";");
            }
            isArgumentAsFunctionCall(e) {
                return /\]\(\)/.test(e);
            }
            buildEvalSignatureFn(e) {
                var t = new Function("sig", `return (${e})(sig);`);
                return e => {
                    var r = t(e);
                    if ("string" != typeof r) throw new Error("Unexpected result");
                    return r;
                };
            }
        };
        const Or = class {
            constructor() {
                this.throttleSigDecipher = new kr;
            }
            applyActions(e, t) {
                for (var r, n = {
                    slice: (e, t) => {
                        e.slice(t);
                    },
                    splice: (e, t) => {
                        e.splice(0, t);
                    },
                    reverse: e => {
                        e.reverse();
                    },
                    swap: (e, t) => {
                        var r = e[0];
                        e[0] = e[t % e.length], e[t] = r;
                    }
                }, o = t.split(""), i = 0; r = e[i]; i++) n[r[0]](o, r[1]);
                return o.join("");
            }
            getNewChip(e) {
                var t, r = t => {
                    var r = /([\w$]+)(?:\.([\w$]+)|\[("[\w$]+")\])\([\w$]+,?([\w$]+)?\)/.exec(t);
                    if (!r) throw new Error("readAction");
                    var n = r[1], o = r[2] || r[3], i = r[4], a = ((t, r) => {
                        t = t.replace(/\$/g, "\\$");
                        var n = new RegExp("(?:var |,|\n)" + t + "={"), o = e.search(n);
                        if (-1 === o) throw new Error("Place is not found");
                        var i = e.substr(o, 300);
                        r = r.replace(/\$/g, "\\$");
                        var a = new RegExp(r + ":function\\(([$\\w,]+)\\){([^}]+)}"), s = i.match(a);
                        if (!s) throw new Error("Place function is not found!");
                        return {
                            args: s[1],
                            statement: s[2]
                        };
                    })(n, o);
                    if (/\.reverse/.test(a.statement)) return [ "reverse", null ];
                    if (!/^[\d]+$/.test(i)) throw new Error("Arg is not number");
                    return /\.splice/.test(a.statement) ? [ "splice", parseInt(i) ] : /\.slice/.test(a.statement) ? [ "slice", parseInt(i) ] : [ "swap", parseInt(i) ];
                }, n = (() => {
                    var t = null, r = /,sts:(\d+)/.exec(e);
                    if (r && (t = r[1]), !t) {
                        var n = /\.signatureTimestamp=(\d+)/.exec(e);
                        n && (t = n[1]);
                    }
                    if (!t) {
                        var o = /,signatureTimestamp:(\d+)/.exec(e);
                        o && (t = o[1]);
                    }
                    if (!t) {
                        var i = /,sts:([\w$]+)/.exec(e);
                        if (i) {
                            var a = e.indexOf(`,sts:${i[1]}`);
                            t = ((e, t) => {
                                t = t.replace(/\$/g, "\\$");
                                var r = new RegExp("(?:var |,|;\n?)" + t + "=(\\d+)[;,]").exec(e);
                                if (!r) throw new Error("Sts variable is not found");
                                return r[1];
                            })(((e, t) => {
                                for (var r = e.substr(0, t), n = void 0; -1 !== n; ) {
                                    "number" == typeof n && (n -= 1);
                                    var o = br(e, n = r.lastIndexOf("function", n));
                                    if (n < t && n + o.length > t) return o;
                                }
                                throw new Error("Parent function is not found");
                            })(e, a), i[1]);
                        }
                    }
                    if (!t) throw new Error("Sts is not found");
                    return parseInt(t, 10);
                })(), o = /[$_a-zA-Z0-9]+\.set\((?:[$_a-zA-Z0-9]+\.[$_a-zA-Z0-9]+\|\|)?"signature",([$_a-zA-Z0-9]+)\(/.exec(e);
                if (o && (t = o[1]), !t) {
                    var i = /(?:function ([$_a-zA-Z0-9]+)|(?:var |,|;\n)([$_a-zA-Z0-9]+)=function)\(([\w$]+)\){\3=\3\.split\([^}]+;return \3\.join\([^}]+}[;,]/.exec(e);
                    i && (t = i[1] || i[2]);
                }
                if (!t) throw new Error("Decode function name is not found!");
                var a = (t => {
                    t = t.replace(/\$/g, "\\$");
                    var n = new RegExp("(?:function " + t + "|(?:var |,|;\n)" + t + "=function)\\(([\\w$]+)\\){([^}]*)}[;,]").exec(e);
                    if (!n) throw new Error("findConvertFn");
                    return ((e, t) => {
                        e = e.replace(/\$/g, "\\$");
                        var n = new RegExp('[\\w$]+(?:\\.[\\w$]+|\\["[\\w$]+"\\])\\(' + e + "[^)]*\\)", "g"), o = t.match(n);
                        if (!o) throw new Error("readScope");
                        return o.map((e => r(e)));
                    })(n[1], n[2]);
                })(t);
                if (!a.length) throw new Error("actionList is empty");
                return {
                    actionList: a,
                    sts: n
                };
            }
            dechip(e, t) {
                var r = this.getNewChip(t);
                return {
                    sts: r.sts,
                    actionList: r.actionList,
                    playerUrl: e,
                    nSigCode: this.throttleSigDecipher.getSignatureFnCodeSafe(t),
                    expiresAt: ce() + 43200,
                    helperVersion: "10.38"
                };
            }
        };
        function Er(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e;
        }
        function Sr(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function _r(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Sr(Object(r), !0).forEach((function(t) {
                    Er(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sr(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        function Tr(e, t) {
            if (null == e) return {};
            var r, n, o = function(e, t) {
                if (null == e) return {};
                var r, n, o = {}, i = Object.keys(e);
                for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
                return o;
            }(e, t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
            }
            return o;
        }
        function* Ir(e, t) {
            !0 === e || (!1 === e ? yield t.fail() : yield* e);
        }
        function Lr(e) {
            const {done: t, value: r} = e.next();
            return t ? void 0 : r;
        }
        class Ar {
            constructor(e) {
                const {type: t, schema: r, coercer: n = (e => e), validator: o = (() => []), refiner: i = (() => [])} = e;
                this.type = t, this.schema = r, this.coercer = n, this.validator = o, this.refiner = i;
            }
        }
        class Rr extends TypeError {
            constructor(e, t) {
                const {path: r, value: n, type: o, branch: i} = e, a = Tr(e, [ "path", "value", "type", "branch" ]);
                let s;
                super(`Expected a value of type \`${o}\`${r.length ? ` for \`${r.join(".")}\`` : ""} but received \`${JSON.stringify(n)}\`.`), 
                this.value = n, Object.assign(this, a), this.type = o, this.path = r, this.branch = i, 
                this.failures = function() {
                    return s || (s = [ e, ...t ]), s;
                }, this.stack = (new Error).stack, this.__proto__ = Rr.prototype;
            }
        }
        function Pr(e, t) {
            const r = jr(e, t);
            if (r[0]) throw r[0];
        }
        function Cr(e, t) {
            const r = t.coercer(e);
            return Pr(r, t), r;
        }
        function jr(e, t, r = !1) {
            r && (e = t.coercer(e));
            const n = Nr(e, t), o = Lr(n);
            if (o) {
                return [ new Rr(o, n), void 0 ];
            }
            return [ void 0, e ];
        }
        function* Nr(e, t, r = [], n = []) {
            const {type: o} = t, i = {
                value: e,
                type: o,
                branch: n,
                path: r,
                fail: (t = {}) => _r({
                    value: e,
                    type: o,
                    path: r,
                    branch: [ ...n, e ]
                }, t),
                check: (e, t, o, i) => Nr(e, t, void 0 !== o ? [ ...r, i ] : r, void 0 !== o ? [ ...n, o ] : n)
            }, a = Ir(t.validator(e, i), i), s = Lr(a);
            s ? (yield s, yield* a) : yield* Ir(t.refiner(e, i), i);
        }
        function Ur(e) {
            return new Ar({
                type: `Array<${e ? e.type : "unknown"}>`,
                schema: e,
                coercer: t => e && Array.isArray(t) ? t.map((t => Cr(t, e))) : t,
                * validator(t, r) {
                    if (Array.isArray(t)) {
                        if (e) for (const [n, o] of t.entries()) yield* r.check(o, e, t, n);
                    } else yield r.fail();
                }
            });
        }
        function Mr() {
            return Hr("boolean", (e => "boolean" == typeof e));
        }
        function Dr() {
            return Hr("never", (() => !1));
        }
        function Fr() {
            return Hr("number", (e => "number" == typeof e && !isNaN(e)));
        }
        function Vr(e) {
            const t = e ? Object.keys(e) : [], r = Dr();
            return new Ar({
                type: e ? `Object<{${t.join(",")}}>` : "Object",
                schema: e || null,
                coercer: e ? Gr(e) : e => e,
                * validator(n, o) {
                    if ("object" == typeof n && null != n) {
                        if (e) {
                            const i = new Set(Object.keys(n));
                            for (const r of t) {
                                i.delete(r);
                                const t = e[r], a = n[r];
                                yield* o.check(a, t, n, r);
                            }
                            for (const e of i) {
                                const t = n[e];
                                yield* o.check(t, r, n, e);
                            }
                        }
                    } else yield o.fail();
                }
            });
        }
        function qr(e) {
            return new Ar({
                type: `${e.type}?`,
                schema: e.schema,
                validator: (t, r) => void 0 === t || r.check(t, e)
            });
        }
        function $r(e) {
            e instanceof Ar && (e = e.schema);
            const t = Object.keys(e), r = Dr();
            return new Ar({
                type: `Partial<{${t.join(",")}}>`,
                schema: e,
                coercer: Gr(e),
                * validator(n, o) {
                    if ("object" != typeof n || null == n) return void (yield o.fail());
                    const i = new Set(Object.keys(n));
                    for (const r of t) {
                        if (i.delete(r), !(r in n)) continue;
                        const t = e[r], a = n[r];
                        yield* o.check(a, t, n, r);
                    }
                    for (const e of i) {
                        const t = n[e];
                        yield* o.check(t, r, n, e);
                    }
                }
            });
        }
        function Br() {
            return Hr("string", (e => "string" == typeof e));
        }
        function Hr(e, t) {
            return new Ar({
                type: e,
                validator: t,
                schema: null
            });
        }
        function Gr(e) {
            const t = Object.keys(e);
            return r => {
                if ("object" != typeof r || null == r) return r;
                const n = {}, o = new Set(Object.keys(r));
                for (const i of t) {
                    o.delete(i);
                    const t = e[i], a = r[i];
                    n[i] = Cr(a, t);
                }
                for (const e of o) n[e] = r[e];
                return n;
            };
        }
        const zr = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            Array.isArray(t) || (t = [ t ]);
            var r = (new DOMParser).parseFromString(e, "text/html");
            return [].slice.call(r.querySelectorAll("script")).map((e => e.textContent)).filter((e => t.every((t => t.test(e)))));
        };
        function Wr(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n;
        }
        function Yr(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e;
            }(e) || function(e, t) {
                var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (null != r) {
                    var n, o, i, a, s = [], u = !0, c = !1;
                    try {
                        if (i = (r = r.call(e)).next, 0 === t) {
                            if (Object(r) !== r) return;
                            u = !1;
                        } else for (;!(u = (n = i.call(r)).done) && (s.push(n.value), s.length !== t); u = !0) ;
                    } catch (e) {
                        c = !0, o = e;
                    } finally {
                        try {
                            if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return;
                        } finally {
                            if (c) throw o;
                        }
                    }
                    return s;
                }
            }(e, t) || function(e, t) {
                if (e) {
                    if ("string" == typeof e) return Wr(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Wr(e, t) : void 0;
                }
            }(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }();
        }
        const Qr = class {
            constructor(e, t) {
                this.finishQueue = () => {
                    if (this.activeCount--, this.queue.length > 0) {
                        var e = Yr(this.queue.shift(), 2), t = e[0], r = e[1];
                        this.runQueue(t, r);
                    }
                }, this.limit = e, this.maxQueue = t, this.queue = [], this.activeCount = 0;
            }
            add(e) {
                var t = null, r = new Promise((e => {
                    t = e;
                }));
                if (this.activeCount < this.limit) this.runQueue(e, t); else {
                    var n = [ e, t ], o = this.queue.push(n);
                    this.maxQueue && o > this.maxQueue && this.queue.splice(0, o - this.maxQueue);
                }
                return r;
            }
            runQueue(e, t) {
                this.activeCount++;
                var r = it(e);
                t(r), r.then(this.finishQueue, this.finishQueue);
            }
        };
        const Kr = (e, t) => {
            var r = new Qr(e, t);
            return e => r.add(e);
        };
        const Jr = function(e) {
            E.sendMessage({
                action: "sendMonitoring",
                obj: {
                    category: e.category,
                    event: e.event,
                    subcategory: e.subcategory
                }
            });
        };
        function Xr(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function Zr(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Xr(Object(r), !0).forEach((function(t) {
                    Y(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xr(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var en = {
            web: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB",
                        clientVersion: "2.20240726.00.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 1,
                REQUIRE_PO_TOKEN: !0,
                SUPPORTS_COOKIES: !0
            },
            web_safari: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB",
                        clientVersion: "2.20240726.00.00",
                        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15,gzip(gfe)"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 1,
                REQUIRE_PO_TOKEN: !0,
                SUPPORTS_COOKIES: !0
            },
            web_embedded: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB_EMBEDDED_PLAYER",
                        clientVersion: "1.20240723.01.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 56,
                SUPPORTS_COOKIES: !0
            },
            web_music: {
                INNERTUBE_HOST: "music.youtube.com",
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB_REMIX",
                        clientVersion: "1.20240724.00.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 67,
                SUPPORTS_COOKIES: !0
            },
            web_creator: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "WEB_CREATOR",
                        clientVersion: "1.20240723.03.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 62,
                REQUIRE_AUTH: !0,
                SUPPORTS_COOKIES: !0
            },
            android: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "ANDROID",
                        clientVersion: "19.44.38",
                        androidSdkVersion: 30,
                        userAgent: "com.google.android.youtube/19.44.38 (Linux; U; Android 11) gzip",
                        osName: "Android",
                        osVersion: "11"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 3,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_PO_TOKEN: !0
            },
            android_music: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "ANDROID_MUSIC",
                        clientVersion: "7.27.52",
                        androidSdkVersion: 30,
                        userAgent: "com.google.android.apps.youtube.music/7.27.52 (Linux; U; Android 11) gzip",
                        osName: "Android",
                        osVersion: "11"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 21,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_PO_TOKEN: !0,
                REQUIRE_AUTH: !0,
                SUPPORTS_COOKIES: !0
            },
            android_creator: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "ANDROID_CREATOR",
                        clientVersion: "24.45.100",
                        androidSdkVersion: 30,
                        userAgent: "com.google.android.apps.youtube.creator/24.45.100 (Linux; U; Android 11) gzip",
                        osName: "Android",
                        osVersion: "11"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 14,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_PO_TOKEN: !0,
                REQUIRE_AUTH: !0
            },
            android_vr: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "ANDROID_VR",
                        clientVersion: "1.60.19",
                        deviceMake: "Oculus",
                        deviceModel: "Quest 3",
                        androidSdkVersion: 32,
                        userAgent: "com.google.android.apps.youtube.vr.oculus/1.60.19 (Linux; U; Android 12L; eureka-user Build/SQ3A.220605.009.A1) gzip",
                        osName: "Android",
                        osVersion: "12L"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 28,
                REQUIRE_JS_PLAYER: !1,
                SUPPORTS_COOKIES: !0
            },
            ios: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "IOS",
                        clientVersion: "19.45.4",
                        deviceMake: "Apple",
                        deviceModel: "iPhone16,2",
                        userAgent: "com.google.ios.youtube/19.45.4 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                        osName: "iPhone",
                        osVersion: "18.1.0.22B83"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 5,
                REQUIRE_JS_PLAYER: !1
            },
            ios_music: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "IOS_MUSIC",
                        clientVersion: "7.27.0",
                        deviceMake: "Apple",
                        deviceModel: "iPhone16,2",
                        userAgent: "com.google.ios.youtubemusic/7.27.0 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                        osName: "iPhone",
                        osVersion: "18.1.0.22B83"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 26,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_AUTH: !0,
                SUPPORTS_COOKIES: !0
            },
            ios_creator: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "IOS_CREATOR",
                        clientVersion: "24.45.100",
                        deviceMake: "Apple",
                        deviceModel: "iPhone16,2",
                        userAgent: "com.google.ios.ytcreator/24.45.100 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                        osName: "iPhone",
                        osVersion: "18.1.0.22B83"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 15,
                REQUIRE_JS_PLAYER: !1,
                REQUIRE_AUTH: !0
            },
            mweb: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "MWEB",
                        clientVersion: "2.20240726.01.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 2,
                SUPPORTS_COOKIES: !0
            },
            tv: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "TVHTML5",
                        clientVersion: "7.20240724.13.00"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 7,
                SUPPORTS_COOKIES: !0
            },
            tv_embedded: {
                INNERTUBE_CONTEXT: {
                    client: {
                        clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
                        clientVersion: "2.0"
                    }
                },
                INNERTUBE_CONTEXT_CLIENT_NAME: 85,
                REQUIRE_AUTH: !0,
                SUPPORTS_COOKIES: !0
            }
        };
        class tn {
            constructor() {
                this.INNERTUBE_CLIENTS = en, this.visitorData = null;
            }
            fetchClientRequest() {
                var e = arguments, t = this;
                return n(i().mark((function r() {
                    var n, o, a, s;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return n = e.length > 0 && void 0 !== e[0] ? e[0] : "android_vr", a = (o = e.length > 1 ? e[1] : void 0).videoId, 
                            s = o.url, r.abrupt("return", t.getVisitorData(s).then((e => {
                                t.visitorData = e;
                                var r = {
                                    prettyPrint: !1
                                }, o = en[n], i = {
                                    playbackContext: {
                                        contentPlaybackContext: {
                                            html5Preference: "HTML5_PREF_WANTS"
                                        }
                                    },
                                    contentCheckOk: !0,
                                    racyCheckOk: !0,
                                    videoId: a,
                                    context: {
                                        client: Zr({
                                            hl: "en",
                                            timeZone: "UTC",
                                            utcOffsetMinutes: 0
                                        }, o.INNERTUBE_CONTEXT.client)
                                    }
                                }, s = {
                                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                                    "accept-encoding": "gzip, deflate, br",
                                    "accept-language": "en-us,en;q=0.5",
                                    connection: "keep-alive",
                                    "content-type": "application/json",
                                    host: "www.youtube.com",
                                    origin: "https://www.youtube.com",
                                    "sec-fetch-mode": "navigate",
                                    "x-youtube-client-name": o.INNERTUBE_CONTEXT_CLIENT_NAME,
                                    "x-youtube-client-version": o.INNERTUBE_CONTEXT.client.clientVersion,
                                    "x-goog-visitor-id": t.visitorData
                                };
                                return o.INNERTUBE_CONTEXT.client.userAgent && (s["user-agent"] = o.INNERTUBE_CONTEXT.client.userAgent), 
                                t.syncYoutubeCookies().then((() => fetch(`https://www.youtube.com/youtubei/v1/player?${rr.stringify(r)}`, {
                                    method: "POST",
                                    body: JSON.stringify(i),
                                    headers: s
                                })));
                            })));

                          case 3:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            syncYoutubeCookies() {
                return new Promise(((e, t) => {
                    try {
                        chrome && chrome.cookies ? chrome.cookies.getAll({
                            domain: "youtube.com"
                        }, (t => {
                            t.forEach((e => {
                                Object.hasOwn(e, "hostOnly") || chrome.cookies.set(Zr({
                                    url: "https://youtube.com"
                                }, e));
                            })), e();
                        })) : e();
                    } catch (e) {
                        t(e);
                    }
                }));
            }
            getVisitorData(e) {
                return fetch(e).then((e => e.text().then((e => /"VISITOR_DATA":\s*"([^"]+)"/.exec(e)[1]))));
            }
        }
        var rn = r(835), nn = r(894), on = rn.URL, an = c("YtMetadata").t, sn = Hr("FiniteNumber", (e => isFinite(Number(e))));
        function un(e) {
            var t = Ar;
            e instanceof t && (e = e.schema);
            var r = Object.keys(e);
            return new t({
                type: `Partial<{${r.join(",")}}>`,
                schema: e,
                coercer: $r(e).coercer,
                validator: (t, n) => i().mark((function o() {
                    var a, s, u, c, l;
                    return i().wrap((function(o) {
                        for (;;) switch (o.prev = o.next) {
                          case 0:
                            if ("object" == typeof t && null != t) {
                                o.next = 4;
                                break;
                            }
                            return o.next = 3, n.fail();

                          case 3:
                            return o.abrupt("return");

                          case 4:
                            a = 0, s = r;

                          case 5:
                            if (!(a < s.length)) {
                                o.next = 13;
                                break;
                            }
                            return u = s[a], c = e[u], l = t[u], o.delegateYield(n.check(l, c, t, u), "t0", 10);

                          case 10:
                            a++, o.next = 5;
                            break;

                          case 13:
                          case "end":
                            return o.stop();
                        }
                    }), o);
                }))()
            });
        }
        var cn, ln = Vr({
            itag: Fr(),
            url: qr(Br()),
            type: qr(Br()),
            cipher: qr(Br()),
            signatureCipher: qr(Br()),
            mimeType: Br(),
            bitrate: qr(Fr()),
            width: Fr(),
            height: Fr(),
            initRange: qr(Vr({
                start: sn,
                end: sn
            })),
            indexRange: qr(Vr({
                start: sn,
                end: sn
            })),
            lastModified: sn,
            contentLength: qr(sn),
            encryption: qr(Br()),
            drmFamilies: qr(Ur(Br())),
            quality: Br(),
            fps: Fr(),
            qualityLabel: Br(),
            projectionType: Br(),
            averageBitrate: qr(Fr()),
            colorInfo: qr(Vr({
                primaries: qr(Br()),
                transferCharacteristics: Br(),
                matrixCoefficients: qr(Br())
            })),
            approxDurationMs: qr(sn),
            highReplication: qr(Mr()),
            xtags: qr(Br()),
            targetDurationSec: qr(Fr()),
            maxDvrDurationSec: qr(Fr()),
            loudnessDb: qr(Fr())
        }), fn = Vr({
            itag: Fr(),
            url: qr(Br()),
            cipher: qr(Br()),
            signatureCipher: qr(Br()),
            mimeType: Br(),
            bitrate: qr(Fr()),
            initRange: qr(Vr({
                start: sn,
                end: sn
            })),
            indexRange: qr(Vr({
                start: sn,
                end: sn
            })),
            lastModified: sn,
            contentLength: qr(sn),
            quality: Br(),
            encryption: qr(Br()),
            drmFamilies: qr(Ur(Br())),
            projectionType: Br(),
            averageBitrate: qr(Fr()),
            highReplication: qr(Mr()),
            audioQuality: Br(),
            approxDurationMs: qr(sn),
            audioSampleRate: sn,
            audioChannels: Fr(),
            targetDurationSec: qr(Fr()),
            maxDvrDurationSec: qr(Fr()),
            loudnessDb: qr(Fr())
        }), pn = (Vr({
            probeUrl: qr(Br()),
            dashManifestUrl: qr(Br()),
            hlsManifestUrl: qr(Br()),
            expiresInSeconds: sn,
            formats: qr(Ur(Vr({
                itag: Fr(),
                url: qr(Br()),
                cipher: qr(Br()),
                signatureCipher: qr(Br()),
                mimeType: Br(),
                bitrate: qr(Fr()),
                fps: qr(Fr()),
                width: Fr(),
                height: Fr(),
                lastModified: sn,
                contentLength: qr(sn),
                quality: Br(),
                qualityLabel: Br(),
                projectionType: Br(),
                averageBitrate: qr(Fr()),
                audioQuality: Br(),
                approxDurationMs: qr(sn),
                audioSampleRate: qr(sn),
                audioChannels: qr(Fr())
            }))),
            adaptiveFormats: Ur((cn = (e, t) => e && /^video/.test(e.mimeType) ? ln : fn, Hr("Dynamic<...>", ((e, t) => t.check(e, cn(e, t)))))),
            licenseInfos: qr(Ur(Vr({
                drmFamily: Br(),
                url: Br(),
                drmParams: Br()
            }))),
            drmParams: qr(Br())
        }), un({
            itag: Fr(),
            url: qr(Br()),
            cipher: qr(Br()),
            signatureCipher: qr(Br()),
            mimeType: Br(),
            fps: qr(Fr()),
            width: qr(Fr()),
            height: qr(Fr()),
            bitrate: qr(Fr()),
            contentLength: qr(sn)
        })), dn = un({
            formats: qr(Ur(pn)),
            adaptiveFormats: qr(Ur(pn))
        }), hn = un({
            playabilityStatus: Vr(),
            streamingData: qr(Vr()),
            videoDetails: qr(un({
                videoId: Br(),
                title: Br(),
                lengthSeconds: sn,
                channelId: Br(),
                shortDescription: Br(),
                thumbnail: un({
                    thumbnails: Ur(un({
                        url: Br(),
                        width: Fr(),
                        height: Fr()
                    }))
                }),
                useCipher: qr(Mr()),
                author: Br()
            }))
        });
        function mn(e) {
            return new Promise(((t, r) => {
                A(e, ((e, n, o) => {
                    e && "string" == typeof e && (e = new Error(e)), e ? r(e) : t(o);
                }));
            })).catch((e => {
                var t = /^(\d+)\s+(.*)/.exec(e.message);
                throw t && (e.status = parseInt(t[1], 10), e.statusText = t[2]), e;
            }));
        }
        function gn(e) {
            var t = e.playabilityStatus, r = e.videoDetails;
            if ("OK" !== t.status) {
                var n = "UNKNOWN_PLAYABILITY_STATUS";
                return "LOGIN_REQUIRED" === t.status || "UNPLAYABLE" === t.status ? n = t.status : "ERROR" === t.status && (n = "YT_ERROR"), 
                new Ne(`${t.status}: ${t.reason}`, n);
            }
            if (!r) return new Ne("Video details is empty", "VIDEO_DETAILS_IS_EMPTY");
        }
        function yn(e) {
            var t = null;
            if ([ "url_encoded_fmt_stream_map", "adaptive_fmts", "fmt_url_map" ].some((r => {
                var n = e[r];
                if (n) return n.some((e => {
                    if (e.s && e.url) return t = e, !0;
                }));
            })), !t) {
                var r = e.player_response;
                if (r.streamingData) {
                    function n(e) {
                        var r = e.signatureCipher || e.cipher;
                        if (r) {
                            var n = nn.parse(r), o = n.sp, i = n.s, a = n.url;
                            return t = {
                                url: a,
                                sp: o,
                                s: i
                            }, !0;
                        }
                    }
                    r.streamingData.formats && r.streamingData.formats.some(n), !t && r.streamingData.adaptiveFormats && r.streamingData.adaptiveFormats.some(n);
                }
            }
            return t;
        }
        function vn(e, t, r) {
            return r && (e[t] = r), e;
        }
        var bn = /(\/s\/([^\/]+))/;
        function wn(e) {
            var t = bn.exec(e);
            if (t) return {
                fragment: t[1],
                signature: t[2]
            };
        }
        var xn = /\/sp\/([^\/]+)/;
        function kn(e) {
            var t = xn.exec(e);
            if (t) return t[1];
        }
        function On(e) {
            var t = null;
            if (/\.googlevideo\.com/.test(e)) {
                var r = new on(e);
                r.host = "redirector.googlevideo.com", t = rn.format(r);
            } else if (/r[1-9].*\.c\.youtube\.com/.test(e)) {
                var n = new on(e);
                n.host = "www.youtube.com", t = rn.format(n);
            }
            return t;
        }
        const En = class {
            constructor() {
                this.lastSignatureInited = !1, this.oneLimitGetSignature = Kr(1), this.lastSignature = null, 
                this.html5SigDecipher = new Or, this.getDashUrlSignature = wn, this.dashMpdSignatureParamR = kn, 
                this.getAltUrl = On, this.getData = mn, this.innertubeClient = new tn, (E.isChromeMobile || E.isFirefoxMobile) && (this.ua = Dt());
            }
            getMetadata(e, t) {
                return this.innertubeClient.fetchClientRequest("android_vr", {
                    videoId: e,
                    url: t
                }).then((e => e.json())).then((t => {
                    if (t && t.playabilityStatus && "This video is unavailable" === t.playabilityStatus.reason) throw new Error("TRY_IOS");
                    if (t && t.videoDetails && t.videoDetails.videoId !== e) throw new Error("TRY_IOS");
                    if (t && t.playabilityStatus && "LOGIN_REQUIRED" === t.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                    var r = {
                        player_response: t
                    };
                    return Jr({
                        category: "meta",
                        subcategory: "101",
                        event: "main"
                    }), {
                        videoInfo: r,
                        signature: null
                    };
                })).catch((r => (an.error("getMetadata error: %O", r), "TRY_IOS" === r.code ? this.getMetadataIos(e, t) : this.getVideoInfoAsPage(e).catch((e => {
                    throw an.error("getVideoInfoAsPage error: %O", e), Jr({
                        category: "meta",
                        subcategory: "101",
                        event: "fail"
                    }), e;
                })).then((e => {
                    var t = e.videoInfo, r = e.signature;
                    return Jr({
                        category: "meta",
                        subcategory: "101",
                        event: "fallback"
                    }), this.testSignature(t, r).then((() => ({
                        videoInfo: t,
                        signature: r
                    })));
                })))));
            }
            getMetadataIos(e, t) {
                return this.innertubeClient.fetchClientRequest("ios", {
                    videoId: e,
                    url: t
                }).then((e => e.json())).then((e => {
                    if (e && e.playabilityStatus && "LOGIN_REQUIRED" === e.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                    var t = {
                        player_response: e
                    };
                    return Jr({
                        category: "meta",
                        subcategory: "101",
                        event: "main"
                    }), {
                        videoInfo: t,
                        signature: null
                    };
                })).catch((t => (an.error("getMetadata error: %O", t), this.getVideoInfoAsPage(e).catch((e => {
                    throw an.error("getVideoInfoAsPage error: %O", e), Jr({
                        category: "meta",
                        subcategory: "101",
                        event: "fail"
                    }), e;
                })).then((e => {
                    var t = e.videoInfo, r = e.signature;
                    return Jr({
                        category: "meta",
                        subcategory: "101",
                        event: "fallback"
                    }), this.testSignature(t, r).then((() => ({
                        videoInfo: t,
                        signature: r
                    })));
                })))));
            }
            testSignature(e, t) {
                var r = this;
                return n(i().mark((function n() {
                    var o, a, s, u;
                    return i().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            if (o = yn(e)) {
                                n.next = 3;
                                break;
                            }
                            return n.abrupt("return");

                          case 3:
                            return an.debug("Found chiped item", e.player_response.videoDetails.videoId), a = r.html5SigDecipher.applyActions(t.actionList, o.s), 
                            s = null, o.getUrl ? s = o.getUrl(a) : (u = o.sp || "signature", s = o.url + `&${u}=` + a), 
                            n.abrupt("return", mn({
                                method: "HEAD",
                                url: s
                            }).catch((e => {
                                var t = On(s);
                                if ("net::ERR_NAME_NOT_RESOLVED" === e.message && t) return mn({
                                    method: "HEAD",
                                    url: t
                                });
                                throw e;
                            })).catch((e => {
                                if (403 === e.status) throw e;
                            })));

                          case 8:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            getVideoInfo(e, t, r, o) {
                var a = this;
                return n(i().mark((function n() {
                    var s;
                    return i().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            return null, n.next = 3, a.getSignature();

                          case 3:
                            return s = n.sent, n.abrupt("return", mn({
                                url: `https://${e}/get_video_info?` + nn.stringify({
                                    video_id: t,
                                    eurl: o,
                                    el: r,
                                    html5: 1,
                                    sts: s.sts
                                }),
                                headers: vn({}, "User-Agent", a.ua)
                            }).then((e => {
                                e, e = nn.parse(e), a.parseParams(e);
                                var t = parseInt(e.errorcode, 10);
                                if (t > 0) {
                                    var r = "VIDEO_INFO_ERROR";
                                    throw 2 === t ? r = "INVALID_REQUEST" : 150 === t && (r = "UNAVAILABLE"), new Ne(`Error (${t}): ${e.reason}`, r);
                                }
                                if (!e.player_response) throw new Ne("Player response is not found", "PLAYER_RESPONSE_NOT_FOUND");
                                var n = gn(e.player_response);
                                if (n) throw n;
                                return {
                                    videoInfo: e,
                                    signature: s
                                };
                            })));

                          case 5:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            getVideoInfoAsJsonPage(e) {
                var t = this;
                return mn({
                    url: "https://www.youtube.com/watch?" + nn.stringify({
                        v: e,
                        pbj: 1
                    }),
                    headers: vn({
                        "x-youtube-client-name": "1",
                        "x-youtube-client-version": "2.20200812.02.01"
                    }, "User-Agent", this.ua)
                }).then(function() {
                    var e = n(i().mark((function e(r) {
                        var n, o;
                        return i().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (r = JSON.parse(r), Array.isArray(r)) {
                                    e.next = 3;
                                    break;
                                }
                                throw new Ne("Unexpected response", "UNEXPECTED_RESPONSE");

                              case 3:
                                if (n = null, o = null, r.some((e => {
                                    if (e.playerResponse ? n = e.playerResponse : e.player && e.player.assets && e.player.assets.js && (o = e.player.assets.js), 
                                    n && o) return !0;
                                })), n) {
                                    e.next = 8;
                                    break;
                                }
                                throw new Ne("playerResponse is not found!", "PLAYER_RESPONSE_IS_NOT_FOUND");

                              case 8:
                                return e.abrupt("return", t.getVideoInfoFromPlayerResponse(n, o));

                              case 9:
                              case "end":
                                return e.stop();
                            }
                        }), e);
                    })));
                    return function(t) {
                        return e.apply(this, arguments);
                    };
                }());
            }
            getVideoInfoAsPage(e) {
                var t = this;
                return mn({
                    url: "https://www.youtube.com/watch?" + nn.stringify({
                        v: e,
                        has_verified: 1
                    }),
                    headers: vn({}, "User-Agent", this.ua)
                }).then(function() {
                    var e = n(i().mark((function e(r) {
                        var n, o, a, s, u, c;
                        return i().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                r;
                                try {
                                    a = t.getYtInitialPlayerResponseFromHtmlPage(r), s = a.playerResponse, u = a.playerUrl, 
                                    n = {
                                        player_response: s
                                    }, o = u;
                                } catch (e) {
                                    an.warn("getYtInitialPlayerResponseFromHtmlPage error: %O", e), c = t.getSwfCfgFromHtmlPage(r), 
                                    n = t.parseParams(c.args), o = c.assets && c.assets.js;
                                }
                                return e.abrupt("return", t.getVideoInfoFromPlayerResponse(n.player_response, o));

                              case 3:
                              case "end":
                                return e.stop();
                            }
                        }), e);
                    })));
                    return function(t) {
                        return e.apply(this, arguments);
                    };
                }());
            }
            getSwfCfgFromHtmlPage(e) {
                var t = null;
                if (zr(e, [ /"responseContext"/ ]).some((e => Rt(e, [ /"playabilityStatus":/ ]).some((e => {
                    if (e && e.playabilityStatus) return t = e, !0;
                })))), t) {
                    var r = gn(t);
                    if (r) throw r;
                }
                var n = null;
                if (zr(e, [ /ytplayer\.config\s+=\s+/ ]).some((e => Rt(e, [ /"player_response":/ ]).some((e => {
                    if (e.args && "object" == typeof e.args) return n = e, !0;
                })))), !n) throw new Ne("swfcfg is not found!", "SWFCFG_IS_NOT_FOUND");
                return n;
            }
            getYtInitialPlayerResponseFromHtmlPage(e) {
                var t = null;
                if (zr(e, [ /ytInitialPlayerResponse/ ]).some((e => Rt(e, [ /"playabilityStatus":/ ]).some((e => {
                    if (e && e.playabilityStatus) return t = e;
                })))), !t) throw new Ne("ytInitialPlayerResponse in not found", "PLAYER_RESPONSE_NOT_FOUND");
                var r = null;
                return zr(e, [ /ytplayer\.web_player_context_config\s+=\s+/ ]).some((e => Rt(e, [ /"jsUrl":/ ]).some((e => {
                    if (e.jsUrl) return r = e.jsUrl;
                })))), !r && zr(e, [ /window\.ytplayer={};/ ]).some((e => Rt(e, [ /("jsUrl"|"PLAYER_JS_URL"):/ ]).some((e => e.PLAYER_JS_URL ? r = e.PLAYER_JS_URL : e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH && e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH.jsUrl ? r = e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH.jsUrl : void 0)))), 
                {
                    playerResponse: t,
                    playerUrl: r
                };
            }
            getVideoInfoFromPlayerResponse(e, t) {
                var r = this;
                return n(i().mark((function n() {
                    var o, a, s;
                    return i().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            if (r.validatePlayerResponse(e), !(o = gn(e))) {
                                n.next = 4;
                                break;
                            }
                            throw o;

                          case 4:
                            if (a = {
                                player_response: e
                            }, t) {
                                n.next = 7;
                                break;
                            }
                            throw new Ne("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");

                          case 7:
                            return n.next = 9, r.getSignatureFormPlayerUrl(t);

                          case 9:
                            return s = n.sent, n.abrupt("return", {
                                videoInfo: a,
                                signature: s
                            });

                          case 11:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            getInfoFromVideoInfo(e, t) {
                var r = this;
                return n(i().mark((function n() {
                    var o, a;
                    return i().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            if (e.player_response) {
                                n.next = 2;
                                break;
                            }
                            throw new Ne("Player response is not found", "PLAYER_RESPONSE_NOT_FOUND");

                          case 2:
                            if (e.player_response = Cr(e.player_response, hn), !(o = gn(e.player_response))) {
                                n.next = 6;
                                break;
                            }
                            throw o;

                          case 6:
                            if (t) {
                                n.next = 8;
                                break;
                            }
                            throw new Ne("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");

                          case 8:
                            return n.next = 10, r.getSignatureFormPlayerUrl(t);

                          case 10:
                            return a = n.sent, n.abrupt("return", {
                                videoInfo: e,
                                signature: a
                            });

                          case 12:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })))();
            }
            parseParams(e) {
                return [ "url_encoded_fmt_stream_map", "adaptive_fmts", "fmt_url_map" ].forEach((t => {
                    e[t] && (e[t] = e[t].split(",").map((e => nn.parse(e))));
                })), e.player_response && (e.player_response = JSON.parse(e.player_response), this.validatePlayerResponse(e.player_response)), 
                e;
            }
            validatePlayerResponse(e) {
                Cr(e, hn), e.streamingData && Pr(e.streamingData, dn);
            }
            initLastSignature() {
                return it((() => {
                    if (!this.lastSignatureInited) return this.lastSignatureInited = !0, new Promise((e => E.storage.get({
                        ytLastSignature: null
                    }, (t => e(t.ytLastSignature))))).then((e => {
                        e && e.throttleSigCode && (e = null), this.lastSignature = e;
                    }));
                }));
            }
            getSignature() {
                var e = this;
                return this.oneLimitGetSignature(n(i().mark((function t() {
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.next = 2, e.initLastSignature();

                          case 2:
                            if (e.lastSignature && !(e.lastSignature.expiresAt < ce())) {
                                t.next = 7;
                                break;
                            }
                            return null, t.next = 6, mn({
                                url: "https://www.youtube.com/",
                                headers: vn({}, "User-Agent", e.ua)
                            }).then((t => {
                                t;
                                var r = null;
                                try {
                                    r = e.getPlayerUrlFromHtml(t);
                                } catch (n) {
                                    r = e.getPlayerUrlFromAuthHtml(t);
                                }
                                return e.getSignatureFormPlayerUrl(r);
                            }));

                          case 6:
                            e.lastSignature = t.sent;

                          case 7:
                            return t.abrupt("return", e.lastSignature);

                          case 8:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                }))));
            }
            getSignatureFormPlayerUrl(e) {
                return /^\/\//.test(e) ? e = "https:" + e : /^\//.test(e) && (e = "https://www.youtube.com" + e), 
                this.initLastSignature().then((() => this.lastSignature && this.lastSignature.expiresAt > ce() && this.lastSignature.playerUrl === e && "10.38" === this.lastSignature.helperVersion ? this.lastSignature : mn({
                    url: e,
                    headers: vn({}, "User-Agent", this.ua)
                }).then((t => this.html5SigDecipher.dechip(e, t))).then((e => new Promise((t => E.storage.set({
                    ytLastSignature: e
                }, t))).catch((e => {
                    an.warn("Unable save signature, cause: %O", e);
                })).then((() => this.lastSignature = e))))));
            }
            getPlayerUrlFromHtml(e) {
                var t = null;
                if (zr(e, [ /window\.ytplayer\s*=\s*/ ]).some((e => Rt(e, [ /"PLAYER_JS_URL":/ ]).some((e => {
                    if (e.PLAYER_JS_URL) return t = e.PLAYER_JS_URL, !0;
                })))), !t) throw new Ne("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
                return t;
            }
            getPlayerUrlFromAuthHtml(e) {
                var t = null;
                if (zr(e, [ /ytplayer\.config\s+=\s+/ ]).some((e => Rt(e, [ /"assets":/ ]).some((e => {
                    if (e.assets && e.assets.js) return t = e.assets.js, !0;
                })))), !t) throw new Ne("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
                return t;
            }
            getThrottleSigFn(e) {
                if (E.isFirefox) return !1;
                var t = e.throttleSigFn;
                if ("function" != typeof t && e.nSigCode) {
                    var r = this.html5SigDecipher.throttleSigDecipher.buildEvalSignatureFn(e.nSigCode);
                    t = e => {
                        try {
                            return r(e);
                        } catch (e) {
                            an.error("Use throttle signature error: %o", e);
                        }
                        return null;
                    }, e.throttleSigFn = t;
                }
                return t;
            }
        };
        function Sn(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function _n(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? Sn(Object(r), !0).forEach((function(t) {
                    Y(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sn(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        var Tn = c("youtube_embed").t, In = r(894);
        function Ln(e, t) {
            var r, n = {
                144: 144,
                240: 240,
                360: 360,
                480: 480,
                720: 720,
                1080: 1080,
                1440: 1440,
                "4K": 2160,
                "5K": 2880,
                "8K": 4320
            }, o = Math.max(e, t);
            for (var i in e = Math.min(e, t), n) {
                var a = n[i];
                if (!(o >= Math.floor(16 * a / 9) || e >= a)) return r;
                r = i;
            }
            return r;
        }
        function An(e) {
            return /ratebypass/.test(e) || (/\?/.test(e) ? e += "&ratebypass=yes" : (/\/$/.test(e) || (e += "/"), 
            e += "ratebypass/yes/")), e;
        }
        var Rn = /(\/s\/([^\/]+))/;
        var Pn = /\/sp\/([^\/]+)/;
        const Cn = class {
            constructor(e) {
                this._lastSignature = null, this.html5SigDecipher = new Or, this.ytMetadata = new En, 
                this.innertubeClient = new tn, this.engine = e;
            }
            getYoutubeLinks(e, t) {
                var r = this;
                function n(n, o, i, a) {
                    r.addMuxerLinks(n, o), r.addProLinks(n, e.extVideoId), r.addTelevzrLinks(n, e.extVideoId);
                    var s = {
                        action: e.action,
                        extVideoId: e.extVideoId,
                        links: n,
                        title: o,
                        subtitles: i,
                        duration: a,
                        checkLinks: null
                    };
                    return e.checkLinks && n ? r.checkYoutubeLinks(n, (function(e, r) {
                        return s.checkLinks = r, t(s);
                    })) : t(s);
                }
                return r._getYoutubeLinks(e.url, e.extVideoId, e.checkSubtitles, e.noDash).then((function(e) {
                    n(e.links, e.title, e.subtitles, e.duration);
                }), (function(e) {
                    Tn.error("_getYoutubeLinks error: %O", e), n(null, "", null, "");
                })), !0;
            }
            _getYoutubeLinks(e, t, r, n) {
                var o = this;
                return this.ytMetadata.getMetadata(t, e).then((function(e) {
                    var i = e.videoInfo, a = e.signature;
                    return o.onGetConfig(t, r, n, i, a);
                }));
            }
            readFmt(e, t, r, n) {
                var o = this, i = e.meta;
                t.forEach((function(t) {
                    if (t.stream) i.hasStream = 1; else {
                        var a = t.url;
                        if (a) {
                            if (!/([?&])s(ig(nature)?)?=/i.test(a)) if (t.sig) a += "&sig=" + t.sig; else if (t.signature) a += "&signature=" + t.signature; else if (t.s) {
                                a += `&${t.sp || "signature"}=` + o.html5SigDecipher.applyActions(r.actionList, t.s);
                            }
                            a = a.replace(/\\u0026/gi, "&");
                            var s = t.itag;
                            if (!s) {
                                var u = /(?:[?&])itag=(\d+)/i.exec(a);
                                u && (s = u[1]);
                            }
                            if (s && !e[s]) {
                                /[?&]itag=/i.test(a) || (a += "&itag=" + s), a = An(a);
                                var c = i[s];
                                if (c || (c = i[s] = {}), t.fps && (c.fps = t.fps), t.size && /^\d+x\d+$/.test(t.size)) {
                                    var l = t.size.split("x");
                                    c.quality = Ln(l[0], l[1]);
                                }
                                if (t.bitrate && (c.bitrate = parseInt(t.bitrate)), t.type) {
                                    c.type = t.type;
                                    var f = t.type.match(/codecs="([^"]+)"/);
                                    f && (c.codecs = f[1]);
                                }
                                t.projection_type && (c.projectionType = parseInt(t.projection_type)), e[s] || (e[s] = a + n);
                            }
                        }
                    }
                }));
            }
            _readPlayerResponse(e, t, r) {
                var n = e => {
                    e.type && /audio\/mp4/.test(e.type) && (t.multiLang || (t.multiLang = {
                        audioDefault: null,
                        variants: {}
                    }), e.audioTrack && (t.multiLang.variants[e.audioTrack.id] = e, e.audioTrack.audioIsDefault && (t.multiLang.audioDefault = e))), 
                    t[e.itag] || (t[e.itag] = e.url, t.meta[e.itag] = e);
                };
                e.streamingData && (Array.isArray(e.streamingData.formats) && e.streamingData.formats.forEach((t => {
                    var o = this._readPlayerResponseFormat(t, r, e, "streamingData.formats");
                    o && n(o);
                })), Array.isArray(e.streamingData.adaptiveFormats) && e.streamingData.adaptiveFormats.forEach((t => {
                    var o = this._readPlayerResponseFormat(t, r, e, "streamingData.adaptiveFormats");
                    o && n(o);
                }))), t && t.multiLang && t.multiLang.variants && 0 === Object.keys(t.multiLang.variants).length && (t.multiLang = null);
            }
            _readPlayerResponseFormat(e, t, r, n) {
                if (e.cipher || e.signatureCipher) {
                    var o = In.parse(e.cipher || e.signatureCipher), i = o.sp, a = o.s, s = o.url, u = this.html5SigDecipher.applyActions(t.actionList, a);
                    e.url = s + (/\?/.test(s) ? "&" : "?") + `${i}=` + encodeURIComponent(u);
                }
                var c = /[?&]n=([^&]+)/i.exec(e.url);
                if (c) {
                    var l = c[1], f = decodeURIComponent(l), p = this.ytMetadata.getThrottleSigFn(t);
                    if (p) {
                        var d = p(f);
                        d && (e.url = e.url.replace(`n=${l}`, `n=${encodeURIComponent(d)}`));
                    }
                }
                var h = {
                    source: n
                }, m = "" + e.itag;
                h.itag = m, h.url = e.url, e.audioTrack && (h.audioTrack = e.audioTrack), e.fps ? h.fps = parseFloat(e.fps) : h.noFps = !0, 
                e.width && e.height ? (h.quality = Ln(e.width, e.height), h.width = e.width, h.height = e.height) : h.noWidthHeight = !0, 
                h.bitrate = e.bitrate, h.type = e.mimeType;
                var g = /codecs="([^"]+)"/.exec(e.mimeType);
                if (g) {
                    var y = g[1].split(/,\s*/), v = y.some((e => /^mp4a/.test(e))), b = y.some((e => /^avc/.test(e)));
                    h.isBundle = v && b;
                }
                return h.acodec && !h.vcodec && (delete h.noWidthHeight, delete h.noFps), e.contentLength && (h.contentLength = parseInt(e.contentLength, 10)), 
                h;
            }
            ytPrepareVideoInfo(e) {
                return this.onGetConfig(e.videoId, e.checkSubtitles, e.noDash, e.config, e.signature).then((t => {
                    Jr({
                        category: "links",
                        subcategory: "101",
                        event: "fallback"
                    });
                    var r = t.links, n = t.title;
                    return r && this.addProLinks(r, e.videoId), r && this.addTelevzrLinks(r, e.videoId), 
                    this.addMuxerLinks(r, n), {
                        links: r,
                        title: n,
                        multiLang: r.multiLang
                    };
                }));
            }
            onGetConfig(e, t, r, n, o) {
                var i = this, a = n.player_response, s = a.videoDetails, u = void 0 === s ? {} : s, c = a.playabilityStatus, l = void 0 === c ? {} : c, f = {
                    meta: {}
                }, p = "", d = null, h = "", m = null;
                return it((function() {
                    h = u.lengthSeconds || n.length_seconds || "";
                    var e = "";
                    (p = u.title || n.title || "") && (p = p.replace(/\+/g, " "), e = "&title=" + encodeURIComponent(Mt.modify(p)));
                    var t = n.fmt_url_map || n.url_encoded_fmt_stream_map || [], r = n.adaptive_fmts || [], a = l.liveStreamability;
                    (a && a.liveStreamabilityRenderer && !a.liveStreamabilityRenderer.displayEndscreen || n.livestream || n.live_playback) && (f.meta.hasStream = 1), 
                    i._readPlayerResponse(n.player_response, f, o), t && i.readFmt(f, t, o, e), r && i.readFmt(f, r, o, e), 
                    (m = n.dashmpd || "") && -1 !== m.indexOf("yt_live_broadcast") && (m = null);
                })).then((function() {
                    var n = Promise.resolve();
                    return t && (n = n.then((function() {
                        return new Promise((function(t) {
                            i.getYoutubeSubtitles({
                                extVideoId: e
                            }, (function(e) {
                                d = e || null, t();
                            }));
                        })).catch((function(e) {
                            Tn.error("Get subtitles error: %O", e);
                        }));
                    }))), !r && m && (n = n.then((function() {
                        var e = m, t = function(e) {
                            var t = Pn.exec(e);
                            if (t) return t[1];
                        }(m) || "signature", r = function(e) {
                            var t = Rn.exec(e);
                            if (t) return {
                                fragment: t[1],
                                signature: t[2]
                            };
                        }(m);
                        if (r) {
                            var n = i.html5SigDecipher.applyActions(o.actionList, r.signature);
                            e = m.replace(r.fragment, `/${t}/` + n);
                        }
                        return e = e.replace("/sig/", "/signature/"), i.getYouTubeDashLinks(f, e).catch((function(e) {
                            Tn.error("Get dash error: %O", e);
                        }));
                    }))), n;
                })).then((function() {
                    var e = Object.keys(f).length;
                    return f.meta && !f.meta.hasStream && e--, e || (f = null), {
                        links: f,
                        title: p,
                        subtitles: d,
                        duration: h
                    };
                }));
            }
            addProLinks(e, t) {
                if (e && e.meta && this.engine.preferences && this.engine.preferences.proEnabled) {
                    var r = [ "1080", "2160", "4K" ];
                    Object.keys(e.meta).forEach((n => {
                        var o = e.meta[n];
                        if ("string" != typeof o && r.includes(o.quality)) {
                            var i = String(o.quality).toUpperCase();
                            "4K" === o.quality && (i = o.height);
                            var a = "pro" + o.quality;
                            e.meta[a] = {
                                quality: i,
                                height: o.height,
                                itag: "pro",
                                format: "MP4",
                                type: "video",
                                url: "https://www.youtube.com/watch?v=" + encodeURIComponent(t)
                            };
                        }
                    })), e.meta.proMp3 = {
                        quality: "mp3",
                        itag: "pro",
                        noVideo: !0,
                        format: "Audio",
                        type: "audio",
                        url: "https://www.youtube.com/watch?v=" + encodeURIComponent(t)
                    };
                }
            }
            addTelevzrLinks(e, t) {
                var r = this.engine.preferences && this.engine.preferences.proEnabled;
                !e || e.meta && e.meta.hasStream || r || (e.televzr = "televzr://www.youtube.com/watch?v=" + t);
            }
            addMuxerLinks(e, t) {
                if (e && e.meta && !e.meta.hasStream && this.engine.preferences.ffmpegEnabled) {
                    var r = null, n = null, o = null;
                    Object.keys(e.meta).forEach((t => {
                        var i = e.meta[t];
                        i && (i.isBundle ? (!r || i.height > r) && (r = i.height) : /audio\/mp4/.test(i.type) ? (!o || i.bitrate > o.bitrate) && (o = i, 
                        i.isAudioLink = !0) : /video\/mp4/.test(i.type) && i.height > 360 && i.height <= 720 && (!n || i.height > n.height || i.bitrate > n.bitrate || i.fps > n.fps) && (n = i));
                    })), n && o && (e.meta.muxer = {
                        quality: n.quality,
                        width: n.width,
                        height: n.height,
                        fps: n.fps,
                        format: "MP4",
                        mmProps: {
                            sources: [ {
                                url: n.url,
                                format: "mp4"
                            }, {
                                url: o.url,
                                format: "m4a"
                            } ],
                            filename: t + ".mp4",
                            format: "mp4"
                        }
                    }), Object.keys(e.meta).forEach((t => {
                        var r = e.meta[t];
                        /video\/mp4/.test(r.type) && (r.isVideoLink = !0);
                    }));
                }
            }
            checkYoutubeLinks(e, t) {
                for (var r = [ "18", "34", "35" ], n = "", o = 0; o < r.length; o++) if (e[r[o]]) {
                    n = e[r[o]];
                    break;
                }
                n ? A({
                    type: "HEAD",
                    url: n
                }, (function(e, r) {
                    t(n, !e);
                })) : t();
            }
            convertVtt2Srt(e, t) {
                A({
                    url: e.url
                }, (function(r, n, o) {
                    if (r || !o) return Tn.error("Request error!", r), t();
                    var i = /(\d{2}:\d{2}:\d{2})\.(\d{3})/g, a = /^\d{2}:\d{2}:\d{2}\.\d{3}/, s = o.split("\n\n");
                    a.test(s[0]) || s.shift(), a.test(s[s.length - 1]) || s.pop();
                    var u = !1, c = s.filter((function(e) {
                        var t = a.test(e);
                        return t || (u = !0), t;
                    })).map((function(e, t) {
                        return t + 1 + "\n" + (e = e.replace(i, "$1,$2"));
                    }));
                    if (c = c.join("\n\n"), u) return t();
                    e.srt = c, e.preprocess = "srt2url", t();
                }));
            }
            getYoutubeSubtitles(e, t) {
                var r = this, n = e.extVideoId, o = "http://video.google.com/timedtext";
                A({
                    url: o + "?hl=" + E.i18n.getMessage("lang") + "&v=" + n + "&type=list&tlangs=1",
                    xml: !0
                }, (function(e, i, a) {
                    if (e || !a) return t();
                    for (var s, u, c, l = a.querySelectorAll("track"), f = a.querySelectorAll("target"), p = [], d = {}, h = {}, m = void 0, g = 0; c = l[g]; g++) u = {
                        lang: s = c.getAttribute("lang_code"),
                        v: n,
                        fmt: "vtt",
                        name: c.getAttribute("name") || void 0
                    }, d[s] = {
                        lang: c.getAttribute("lang_translated"),
                        langCode: s,
                        url: o + "?" + In.stringify(u),
                        name: u.name
                    }, p.push(d[s]), !m && c.getAttribute("cantran") && (m = u);
                    if (m) for (var y, v = 0; y = f[v]; v++) s = y.getAttribute("lang_code"), u = {
                        lang: m.lang,
                        v: n,
                        tlang: s,
                        fmt: "vtt",
                        name: m.name
                    }, h[s] = {
                        lang: y.getAttribute("lang_translated"),
                        langCode: s,
                        url: o + "?" + In.stringify(u),
                        isAuto: !0
                    };
                    0 === (s = navigator.language.toLowerCase()).indexOf("zh-hant") ? s = "zh-Hant" : 0 === s.indexOf("zh-hans") && (s = "zh-Hans");
                    var b = [ s ];
                    "uk" === b[0] && b.push("ru");
                    for (var w, x = 0; w = b[x]; x++) !d[w] && h[w] && p.push(h[w]);
                    var k = 0, O = 0, E = function() {
                        if (O++, k === O) return t(p);
                    };
                    k++, p.forEach((function(e) {
                        k++, r.convertVtt2Srt(e, E);
                    })), E();
                }));
            }
            getYouTubeDashLinks(e, t) {
                var r, n = this, o = {};
                return (E.isChromeMobile || E.isFirefoxMobile) && (o["User-Agent"] = Dt()), (r = {
                    url: t,
                    headers: o,
                    xml: !0
                }, new Promise(((e, t) => {
                    A(r, ((r, n, o) => {
                        r && "string" == typeof r && (r = new Error(r)), r ? t(r) : e(o);
                    }));
                }))).then((function(t) {
                    n.parseDash(t, e);
                }));
            }
            parseDash(e, t) {
                for (var r, n = e.querySelectorAll("Representation"), o = t.meta = t.meta || {}, i = 0; r = n[i]; i++) {
                    var a = r.querySelector("BaseURL"), s = a.textContent;
                    if (s) {
                        var u = a.parentNode.querySelector("SegmentURL"), c = u && u.getAttribute("media");
                        if (!c || 0 !== c.indexOf("sq/")) {
                            var l = r.getAttribute("id"), f = o[l];
                            f || (f = o[l] = {}), s = An(s);
                            var p = r.getAttribute("frameRate");
                            p && (f.fps = p);
                            var d = r.getAttribute("width"), h = r.getAttribute("height");
                            d && h && (f.quality = Ln(d, h));
                            var m = r.getAttribute("codecs");
                            if (m) {
                                f.codecs = m;
                                var g = s.match(/mime=([^&]+)/);
                                (g = g && g[1]) && (f.type = g);
                            }
                            t[l] || (t[l] = s);
                        }
                    }
                }
            }
            getYoutubeIdListFromPlaylist(e, t) {
                return this.getIdListFromList(e.baseUrl || "https://www.youtube.com", e.listId, t), 
                !0;
            }
            getIdListFromList(e, t, r) {
                var n = function e(t, r, n, i) {
                    n || (n = []), A({
                        url: t + r,
                        json: !0
                    }, (function(r, a, s) {
                        if (r || !s) return i(n);
                        n.push(s.content_html);
                        var u = o(s.load_more_widget_html);
                        if (void 0 === u) return i(n);
                        e(t, u, n, i);
                    }));
                }, o = function(e) {
                    if (e) {
                        var t = e.match(/data-uix-load-more-href="([^"]+)"/);
                        return t && (t = t[1]), t || void 0;
                    }
                }, i = function(e, t, r) {
                    for (var n = function(e) {
                        var t = e.match(/<h1[^>]+>([^<]+)<\/h1>/);
                        if (t) return t[1].replace(/\r?\n/g, " ").trim();
                    }(t[0]), o = {}, i = [], a = /href="\/watch\?([^"]+)"/g, s = 0, u = 0, c = t.length; u < c; u++) {
                        t[u].replace(a, (function(t, r) {
                            var n = jt(r, {
                                params: !0,
                                sep: "&amp;"
                            });
                            n.list === e && (n.index = parseInt(n.index), o[n.index] = n.v, n.index > s && (s = n.index));
                        }));
                    }
                    for (var l = 0; l <= s; l++) void 0 !== o[l] && -1 === i.indexOf(o[l]) && i.push(o[l]);
                    r({
                        idList: i,
                        title: n
                    });
                }, a = function(e) {
                    var t = null, r = e.match(/"nextContinuationData":({[^}]+})/);
                    if (r) try {
                        var n = JSON.parse(r[1]);
                        t = "/browse_ajax?" + In.stringify({
                            ctoken: n.continuation,
                            itct: n.clickTrackingParams
                        });
                    } catch (e) {
                        Tn.debug("getNewNextPageUrl error: %O", e);
                    }
                    return t;
                }, s = function(e, t) {
                    var r = function(e) {
                        Array.isArray(e) && e.forEach((function(e) {
                            var r = e.playlistVideoRenderer, n = r && r.videoId;
                            n && t.push(n);
                        }));
                    }, n = e.indexOf('{"playlistVideoListRenderer":{');
                    -1 !== n ? (e = e.substr(n), Rt(e).forEach((function(e) {
                        var t = e.playlistVideoListRenderer, n = t && t.contents;
                        r(n);
                    }))) : -1 !== (n = e.indexOf('{"playlistVideoListContinuation":{')) && (e = e.substr(n), 
                    Rt(e).forEach((function(e) {
                        var t = e.playlistVideoListContinuation, n = t && t.contents;
                        r(n);
                    })));
                }, u = function e(t, r, n, o, i) {
                    A({
                        url: t + r,
                        headers: n,
                        json: !0
                    }, (function(r, u, c) {
                        if (r) return Tn.error("YT next page request error! %O", r), i();
                        var l = JSON.stringify(c), f = a(l);
                        s(l, o), f ? e(t, f, n, o, i) : i();
                    }));
                };
                return A({
                    url: e + "/playlist?list=" + t
                }, (function(c, l, f) {
                    if (c) return r();
                    var p = null;
                    if (/"playlistVideoListRenderer"/.test(f)) {
                        var d = function(e) {
                            var t = {}, r = null, n = /ytcfg\.set\(({.+)/.exec(e);
                            return n && It(n[1]).some((function(e) {
                                if (e.INNERTUBE_CONTEXT_CLIENT_NAME) return r = e, !0;
                            })), r && (t["x-youtube-client-name"] = r.INNERTUBE_CONTEXT_CLIENT_NAME, t["x-youtube-client-version"] = r.INNERTUBE_CONTEXT_CLIENT_VERSION, 
                            r.ID_TOKEN && (t["x-youtube-identity-token"] = r.ID_TOKEN)), t;
                        }(f), h = function(e) {
                            var t = "unknown", r = null, n = e.match(/"playlistSidebarPrimaryInfoRenderer":({.+)/);
                            if (n && It(n[1]).some((function(e) {
                                if (e.title && e.title.runs) return r = e, !0;
                            })), !t || "unknown" === t) {
                                var o = e.match(/"titleForm":({.+)/);
                                o && It(o[1]).some((e => {
                                    if (e.inlineFormRenderer && e.inlineFormRenderer.textDisplayed && e.inlineFormRenderer.textDisplayed.simpleText) return t = e.inlineFormRenderer.textDisplayed.simpleText, 
                                    !0;
                                }));
                            }
                            if (r) try {
                                r.title.runs.some((function(e) {
                                    if (e.text) return t = e.text;
                                }));
                            } catch (e) {
                                Tn.debug("getNewTitle error: %O", e);
                            }
                            return t;
                        }(f), m = [];
                        s(f, m), (p = a(f)) ? u(e, p, d, m, (function() {
                            r({
                                idList: m,
                                title: h
                            });
                        })) : r({
                            idList: m,
                            title: h
                        });
                    } else (p = o(f)) ? n(e, p, [ f ], (function(e) {
                        i(t, e, r);
                    })) : i(t, [ f ], r);
                }));
            }
            getYoutubeLinksFromConfig(e, t) {
                var r = e.url, n = this;
                return it((() => {
                    var o = e.config, i = o.args.video_id;
                    if (!o || !o.args) throw new Error("jsonList args is not found!");
                    return this.innertubeClient.fetchClientRequest("android_vr", {
                        videoId: i,
                        url: r
                    }).then((e => {
                        if (403 === e.status) throw new Error("Forbidden");
                        return e.json();
                    })).then((r => {
                        if (r && r.playabilityStatus && "This video is unavailable" === r.playabilityStatus.reason) throw new Error("video unavailable");
                        if (r && r.videoDetails && r.videoDetails.videoId !== i) throw new Error("TRY_IOS");
                        if (r && r.playabilityStatus && "LOGIN_REQUIRED" === r.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                        var o = {
                            player_response: r
                        };
                        return n.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, null).then((r => {
                            Jr({
                                category: "links",
                                subcategory: "101",
                                event: "main"
                            });
                            var o = r.title, i = r.links;
                            i && n.addProLinks(i, e.extVideoId), i && n.addTelevzrLinks(i, e.extVideoId), n.addMuxerLinks(i, o), 
                            t({
                                links: i,
                                title: o
                            });
                        }));
                    })).catch((r => {
                        if ("TRY_IOS" === r.message || "LOGIN_REQUIRED" === r.message) return n.getYoutubeLinksFromConfigIos(e, t);
                        var i = o.args, a = o.playerUrl;
                        return this.ytMetadata.getInfoFromVideoInfo(_n(_n({}, i), {}, {
                            visitorData: this.visitorData
                        }), a).then((r => {
                            var o = r.videoInfo, i = r.signature;
                            return n.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, i).then((r => {
                                Jr({
                                    category: "links",
                                    subcategory: "101",
                                    event: "fallback"
                                });
                                var o = r.links, i = r.title;
                                o && n.addProLinks(o, e.extVideoId), o && n.addTelevzrLinks(o, e.extVideoId), n.addMuxerLinks(o, i), 
                                t({
                                    links: o,
                                    title: i,
                                    multiLang: o.multiLang
                                });
                            }));
                        })).catch((r => (Tn.warn("Skip getYoutubeLinksFromConfig, cause %O", r), Jr({
                            category: "links",
                            subcategory: "101",
                            event: "fail"
                        }), n.getYoutubeLinks(e, t))));
                    }));
                })), !0;
            }
            getYoutubeLinksFromConfigIos(e, t) {
                var r = this, n = e.url;
                return it((() => {
                    var o = e.config, i = o.args.video_id;
                    if (!o || !o.args) throw new Error("jsonList args is not found!");
                    return this.innertubeClient.fetchClientRequest("ios", {
                        videoId: i,
                        url: n
                    }).then((e => {
                        if (403 === e.status) throw new Error("Forbidden");
                        return e.json();
                    })).then((n => {
                        if (n && n.playabilityStatus && "LOGIN_REQUIRED" === n.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                        var o = {
                            player_response: n
                        };
                        return r.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, null).then((n => {
                            Jr({
                                category: "links",
                                subcategory: "101",
                                event: "main"
                            });
                            var o = n.title, i = n.links;
                            i && r.addProLinks(i, e.extVideoId), i && r.addTelevzrLinks(i, e.extVideoId), r.addMuxerLinks(i, o), 
                            t({
                                links: i,
                                title: o
                            });
                        }));
                    })).catch((n => {
                        var i = o.args, a = o.playerUrl;
                        return this.ytMetadata.getInfoFromVideoInfo(i, a).then((n => {
                            var o = n.videoInfo, i = n.signature;
                            return r.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, i).then((n => {
                                Jr({
                                    category: "links",
                                    subcategory: "101",
                                    event: "fallback"
                                });
                                var o = n.links, i = n.title;
                                o && r.addProLinks(o, e.extVideoId), o && r.addTelevzrLinks(o, e.extVideoId), r.addMuxerLinks(o, i), 
                                t({
                                    links: o,
                                    title: i,
                                    multiLang: o.multiLang
                                });
                            }));
                        })).catch((n => (Tn.warn("Skip getYoutubeLinksFromConfig, cause %O", n), Jr({
                            category: "links",
                            subcategory: "101",
                            event: "fail"
                        }), r.getYoutubeLinks(e, t))));
                    }));
                })), !0;
            }
        };
        var jn, Nn, Un, Mn, Dn, Fn, Vn, qn, $n, Bn, Hn, Gn, zn, Wn, Yn, Qn = [ "type" ], Kn = r(894), Jn = c("background"), Xn = {};
        Xn.isReady = !1, Xn.readyHandler = null, Xn.readyPromise = new Promise((e => Xn.readyHandler = e)).then((() => Xn.isReady = !0)), 
        Xn.authService = new class {
            constructor() {
                this.credentionalsToken = null, this.refreshTimeout = null, this.init();
            }
            init() {
                this.client = new (Ge())({
                    clientId: atob("aGVscGVyLnBybw"),
                    clientSecret: atob("RTkyRkQ2RTM5RTM1RDUzQUQ5NkMwNzVDQjBFQzFCMEU4NkI0M0UwQzY3OTAzRDhBNjk5NDVCQkY1QUU0RjkxMA"),
                    accessTokenUri: ft + "/token",
                    authorizationUri: ft + "/auth",
                    redirectUri: "https://sf-helper.net/callback.php",
                    scopes: [ "profile" ]
                }, ((e, t, r, n) => R({
                    url: t,
                    method: e,
                    data: r,
                    headers: n
                }).then((e => ({
                    status: e.statusCode,
                    body: e.body
                }))))), this.loadTokenFromStorage().then((e => {
                    this.credentionalsToken = e, this.initRefreshTimeout();
                })).catch((e => {
                    lt.info("Get token from storage error", e);
                }));
            }
            initRefreshTimeout() {
                if (this.credentionalsToken) {
                    clearTimeout(this.refreshTimeout);
                    var e = 1e3 * this.credentionalsToken.data.expires_in;
                    this.refreshTimeout = setTimeout((() => {
                        lt.log("Refresh token"), this.refresh(this.credentionalsToken).then((e => {
                            this.credentionalsToken = e, this.initRefreshTimeout();
                        }), (e => (lt.error("refreshTimeout error", e), this.logout())));
                    }), e);
                }
            }
            loadTokenFromStorage() {
                return lt.log("loadTokenFromStorage call"), Qe().then((e => {
                    var t = Math.trunc((e.expiry_date - (new Date).getTime()) / 1e3);
                    return this.client.createToken(ut(ut({}, e), {}, {
                        expires_in: t
                    }));
                }));
            }
            handleAuthCallback(e) {
                return this.client.code.getToken(e).then((e => (this.credentionalsToken = e, Ye(e)))).then((() => this.userInfoRequest(this.credentionalsToken))).then((e => B({
                    userInfo: e
                }))).then((() => this.initRefreshTimeout())).catch((e => {
                    lt.error("Auth error", e);
                }));
            }
            revokeToken() {
                return it((() => {
                    var e = ft + "/revoke", t = this.credentionalsToken;
                    if (t && t.refreshToken) {
                        var r = e + "?" + ct.stringify({
                            token: t.refreshToken
                        });
                        return R(r);
                    }
                })).then((() => {
                    this.credentionalsToken = null;
                })).catch((e => {
                    "CREDENTIALS_IS_EMPTY" === e.code || lt.error("revokeToken error", e);
                }));
            }
            refresh(e) {
                return n(i().mark((function t() {
                    var r;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return t.next = 2, e.refresh();

                          case 2:
                            return r = t.sent, t.next = 5, Ye(r);

                          case 5:
                            return t.abrupt("return", r);

                          case 6:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            getQuickCodeRequest() {
                return lt.log("quickCodeRequest call"), it((() => this.credentionalsToken && this.credentionalsToken.data ? this.credentionalsToken : this.loadTokenFromStorage())).then((e => R({
                    url: "https://oauth2.televzr.com/v1/quickCode?" + ct.stringify({
                        access_token: e.data.access_token
                    }),
                    json: !0
                }).then((e => {
                    if (!e.body.ok) throw new Error("Failed to get quick code");
                    return e.body.result;
                }))), (e => {
                    throw lt.error("loadToken error", e), e;
                }));
            }
            userInfoRequest(e) {
                var t = e.sign({
                    url: ft + "/v1/userinfo",
                    headers: void 0
                }), r = t.url, n = t.headers;
                return R({
                    url: r,
                    headers: n,
                    json: !0
                }).then((e => {
                    if (e.body.error) throw new Error(e.body.error);
                    if (e.body && e.body.result) return e.body.result;
                }));
            }
            refreshUserInfo() {
                if (!this.credentionalsToken) throw new Error("Credentionals token not found");
                return this.userInfoRequest(this.credentionalsToken).then((e => B({
                    userInfo: e
                })));
            }
            logout() {
                return ot([ "credentials", "userInfo" ]).then((() => this.revokeToken())).then(...at((() => R({
                    url: "https://oauth2.televzr.com/logout",
                    method: "POST"
                }))));
            }
            isAuth() {
                return H([ "userInfo", "credentials" ]).then((e => Boolean(e.userInfo) && Boolean(e.credentials)));
            }
            getLoginUrl() {
                return this.client.code.getUri({
                    state: ct.stringify({
                        sessionId: nt()
                    })
                });
            }
            bindRemoteFunctions() {
                return {
                    handleAuthCallback: this.handleAuthCallback.bind(this),
                    logout: this.logout.bind(this),
                    getLoginUrl: this.getLoginUrl.bind(this),
                    isAuth: this.isAuth.bind(this),
                    refreshUserInfo: this.refreshUserInfo.bind(this)
                };
            }
        }, Xn.utils = cr(Xn), Xn.modules = {}, Xn.modules.vimeo = new fr(Xn), Xn.modules.dailymotion = new _t(Xn), 
        Xn.modules.youtube = new Cn(Xn), Xn.modules.soundcloud = new class {
            constructor(e) {
                this.engine = e;
            }
            soundcloudFetchPageInfo(e) {
                var t = this;
                return n(i().mark((function r() {
                    var n, o, a, s, u, c;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return n = e.clientId, o = e.songEndpoint, a = e.retry, s = void 0 === a ? 3 : a, 
                            r.prev = 1, u = "https://api-widget.soundcloud.com/resolve?" + rr.stringify({
                                client_id: n,
                                url: o,
                                format: "json"
                            }), r.next = 5, R({
                                url: u,
                                json: !0
                            });

                          case 5:
                            return c = r.sent, r.abrupt("return", c.body);

                          case 9:
                            if (r.prev = 9, r.t0 = r.catch(1), nr.error("FetchPageInfoError", r.t0), !s) {
                                r.next = 15;
                                break;
                            }
                            return s--, r.abrupt("return", t.soundcloudFetchPageInfo({
                                clientId: n,
                                songEndpoint: o,
                                retry: s
                            }));

                          case 15:
                            throw r.t0;

                          case 16:
                          case "end":
                            return r.stop();
                        }
                    }), r, null, [ [ 1, 9 ] ]);
                })))();
            }
            soundcloudFetchSongsOfPlaylist(e) {
                return n(i().mark((function t() {
                    var r, n, o, a, s, u, c, l, f, p, d;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (r = e.clientID, n = e.playlist, o = n.tracks.map((e => e.id)), a = [], s = [], 
                            30, o.length >= 30) for (u = 0; u < o.length; u += 30) a.push(o.slice(u, u + 30)); else a.push(o);
                            c = 0, l = a;

                          case 7:
                            if (!(c < l.length)) {
                                t.next = 17;
                                break;
                            }
                            return f = l[c], p = `https://api-v2.soundcloud.com/tracks?ids=${f.join(",")}&client_id=${r}`, 
                            t.next = 12, R({
                                url: p,
                                json: !0
                            });

                          case 12:
                            d = t.sent, s.push(...d.body);

                          case 14:
                            c++, t.next = 7;
                            break;

                          case 17:
                            return t.abrupt("return", s);

                          case 18:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
            soundcloudSearchBestDownloadURL(e) {
                var t = this;
                return n(i().mark((function r() {
                    var n, o, a, s;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = e.song, o = e.clientID, n.media && n.media.transcodings && n.media.transcodings.length) {
                                r.next = 3;
                                break;
                            }
                            return r.abrupt("return");

                          case 3:
                            return a = n.media.transcodings, r.next = 6, t._searchProgressiveTranscoding(o, a);

                          case 6:
                            if (!(s = r.sent)) {
                                r.next = 9;
                                break;
                            }
                            return r.abrupt("return", s);

                          case 9:
                            return r.abrupt("return", t._searchHlsTranscoding(o, a));

                          case 10:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            _searchProgressiveTranscoding(e, t) {
                return n(i().mark((function r() {
                    var n, o;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (n = t.find((e => "progressive" === e.format.protocol))) {
                                r.next = 3;
                                break;
                            }
                            return r.abrupt("return");

                          case 3:
                            return r.next = 5, R({
                                url: n.url + "?client_id=" + e,
                                json: !0
                            });

                          case 5:
                            return o = r.sent, r.abrupt("return", o.body.url);

                          case 7:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
            _searchHlsTranscoding(e, t) {
                return n(i().mark((function r() {
                    var n, o, a, s, u;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return n = t.find((e => "hls" === e.format.protocol)), r.next = 3, R({
                                url: n.url + "?client_id=" + e,
                                json: !0
                            });

                          case 3:
                            return o = r.sent, r.next = 6, R(o.body.url);

                          case 6:
                            return a = r.sent, s = a.body, u = new tr(s), r.abrupt("return", u.download());

                          case 10:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })))();
            }
        }(Xn), Xn.modules.matchTv = new class {
            constructor(e) {
                this.engine = e;
            }
            matchTvFetchVideoSources(e) {
                return n(i().mark((function t() {
                    var r, n, o, a, s, u, c, l, f, p, d;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (r = e.iframeVideoURL, t.prev = 1, n = r.match(/\d+/), o = n && n[0]) {
                                t.next = 6;
                                break;
                            }
                            return t.abrupt("return", []);

                          case 6:
                            return a = `https://matchtv.ru/vdl/playlist/${encodeURIComponent(o)}/1.json`, t.next = 9, 
                            R({
                                url: a,
                                json: !0
                            });

                          case 9:
                            s = t.sent, u = s.body, c = [], l = 0;

                          case 13:
                            if (!(l < u.length)) {
                                t.next = 23;
                                break;
                            }
                            return f = u[l], t.next = 17, R(f.src);

                          case 17:
                            p = t.sent, (d = p.body.match(/^http.*?$/m)) && c.push({
                                endpoint: d[0],
                                title: f.label
                            });

                          case 20:
                            l++, t.next = 13;
                            break;

                          case 23:
                            return t.abrupt("return", c);

                          case 26:
                            return t.prev = 26, t.t0 = t.catch(1), Ct.error("get videos error", t.t0), t.abrupt("return", []);

                          case 30:
                          case "end":
                            return t.stop();
                        }
                    }), t, null, [ [ 1, 26 ] ]);
                })))();
            }
        }(Xn), Xn.modules.vkontakte = new hr(Xn), Xn.modules.odnoklassniki = new Vt(Xn), 
        Xn.modules.facebook = new Lt(Xn), Xn.modules.instagram = new At(Xn), Xn.modules.mail_ru = new Pt(Xn), 
        Xn.modules.showjet = new class {
            constructor(e) {
                this.engine = e;
            }
            showjetFetchMovie(e) {
                return n(i().mark((function t() {
                    var r, n, o, a, s, u, c, l;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return r = e.iframeVideoURL, t.next = 3, R(r);

                          case 3:
                            if (n = t.sent, o = Kt(n.body), It(n.body).some((e => {
                                if (e.hls) return a = e.hls, !0;
                            })), a) {
                                t.next = 8;
                                break;
                            }
                            return t.abrupt("return", []);

                          case 8:
                            return t.next = 10, R(a);

                          case 10:
                            return s = t.sent, u = s.body, c = a.split("/").slice(0, -1).join("/"), l = (l = xt(u, /RESOLUTION=(.*?),.*\n(.*?\.m3u8$)/gm)).map((e => ({
                                filename: o.title,
                                title: e[1],
                                endpoint: c + "/" + e[2]
                            }))), t.abrupt("return", l);

                          case 16:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
        }(Xn), Xn.modules.yandex_music = new class {
            constructor(e) {}
            yandexGetTrack(e) {
                return n(i().mark((function t() {
                    var r, n, o, a, s, u, c, l, f, p, d, h, m, g, y, v, b, w;
                    return i().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return r = e.album, n = e.trackId, o = e.uid, a = e.currentPage, a = new URL(a), 
                            s = {
                                headers: {
                                    accept: "application/json",
                                    "X-Current-UID": o,
                                    "X-Retpath-Y": a.toString()
                                },
                                json: !0,
                                withCredentials: !0
                            }, t.next = 5, R(gr({
                                url: yr(a.host, n, r)
                            }, s));

                          case 5:
                            return u = t.sent, c = u.body, l = c.src, f = c.codec, p = c.bitrate, d = -1 === l.indexOf("https:") ? "https:" + l : l, 
                            h = new URL(d), [ [ "track_id", n ], [ "format", "json" ] ].forEach((e => h.searchParams.append(...e))), 
                            t.next = 12, R(gr({
                                url: h.toString()
                            }, s));

                          case 12:
                            return m = t.sent, g = m.body, y = g.host, v = g.ts, b = g.path, w = g.s, t.abrupt("return", {
                                bitrate: p,
                                codec: f,
                                downloadURL: vr(y, w, v, b, n)
                            });

                          case 15:
                          case "end":
                            return t.stop();
                        }
                    }), t);
                })))();
            }
        }(Xn), Xn.modules.tiktok = new or(Xn), E.remote = Object.assign(E.remote, {
            createRequest: Ht,
            sendRequest: Gt,
            readRequestBodyChunk: zt,
            clearRequest: Yt,
            clearRequestByPrefix: Wt
        }, {
            televzr: Fe(Xn),
            auth: Xn.authService.bindRemoteFunctions()
        }), E.remote.getPreferences = () => Xn.readyPromise.then((() => (setTimeout((() => {
            Xn.userTrack(), Xn.sendInGa.pull();
        }), 1), Xn.preferences))), E.remote.downloadInFolder = e => {
            var t = e.url, r = e.filename;
            return chrome.downloads.download({
                url: t,
                filename: r
            });
        }, Xn.varCache = {
            helperName: "",
            currentVersion: "10.38",
            isFirstrun: !1,
            isUpgrade: !1,
            uuid: ""
        }, Xn.extra = {}, Xn.defaultPreferences = {
            version: "0",
            button: 1,
            lmMediaHosting: 1,
            moduleYoutube: !0,
            moduleYandexMusic: 1,
            moduleDailymotion: 1,
            moduleVimeo: 1,
            moduleFacebook: 1,
            moduleMatchTv: 1,
            moduleSoundcloud: 1,
            moduleVkontakte: 1,
            moduleOdnoklassniki: 1,
            moduleMailru: 1,
            moduleInstagram: 1,
            moduleRutube: 1,
            moduleTiktok: 1,
            moduleTwitch: 1,
            moduleShowDownloadInfo: 1,
            ytHideFLV: 0,
            ytHideMP4: 0,
            ytHideWebM: 1,
            ytHide3GP: 1,
            ytHide3D: 1,
            ytHideMP4NoAudio: 1,
            ytHideAudio_MP4: 1,
            vkShowBitrate: 0,
            showUmmyInfo: 1,
            showUmmyBtn: 1,
            gmNativeDownload: 0,
            advPreShow: 0,
            statEnabled: 1,
            ffmpegEnabled: 1,
            showUmmyLanding: 0,
            onceShowYtTutorial: 0,
            onceShowYtTooltip: 0,
            saveAsDialog: 0,
            sortDownloads: {
                isEnabled: !1,
                groups: [ {
                    dir: "pictures",
                    formats: [ "jpg", "jpeg", "png", "gif", "svg", "bmp", "ico", "webp" ]
                }, {
                    dir: "music",
                    formats: [ "mp3", "aac", "wav", "ogg", "flac", "wma", "m4a", "m4p" ]
                }, {
                    dir: "videos",
                    formats: [ "mkv", "avi", "3gp", "3g2", "mov", "flv", "mp4", "m4v", "mpg", "mpeg", "webm", "ogv" ]
                } ]
            },
            dataCollectionEnabled: !0
        }, Xn.preferences = {
            aviaBarEnabled: !1,
            sfHelperName: "",
            country: "",
            downloads: void 0,
            ummyDetected: void 0,
            showUmmyItem: void 0,
            experiments: [],
            sendExporterEvent: void 0
        }, Xn.preferenceMap = Ce, E.isGM || chrome.runtime.onInstalled.addListener(function() {
            var e = n(i().mark((function e(t) {
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        "update" === t.reason && Xn.checkAndOpenProLanding(!0);

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })));
            return function(t) {
                return e.apply(this, arguments);
            };
        }()), Xn.loader = (Un = function() {
            jn.slice(0).forEach((function(e) {
                if (e.nameList.every((function(e) {
                    return -1 !== Nn.indexOf(e);
                }))) {
                    var t = jn.indexOf(e);
                    if (-1 !== t) {
                        jn.splice(t, 1);
                        try {
                            e.fn();
                        } catch (e) {
                            Jn.error("Run error!", e);
                        }
                    }
                }
            }));
        }, {
            waitList: jn = [],
            readyList: Nn = [],
            ready: function(e) {
                Nn.push(e), Un();
            },
            when: function(e, t) {
                Array.isArray(e) || (e = [ e ]), jn.push({
                    nameList: e,
                    fn: t
                }), Un();
            }
        }), Xn.events = (Dn = [].slice, Fn = function(e, t) {
            var r = Mn[e];
            Mn[e] || (r = Mn[e] = []), -1 === r.indexOf(t) && r.push(t);
        }, {
            listeners: Mn = {},
            emit: function(e, t) {
                var r = Dn.call(arguments).slice(1);
                (Mn[e] || []).slice(0).forEach((function(e) {
                    try {
                        e.apply(null, r);
                    } catch (e) {
                        Jn.error("Emit error!", e);
                    }
                }));
            },
            on: Fn,
            off: Vn = function(e, t) {
                var r = Mn[e] || [], n = r.indexOf(t);
                -1 !== n && r.splice(n, 1);
            },
            once: function(e, t) {
                Fn(e, (function() {
                    Vn(e, t), t.apply(null, arguments);
                }));
            }
        }), Xn.getHelperName = function() {
            var e = function() {
                var e = "", t = navigator.userAgent;
                return -1 !== t.indexOf("YaBrowser/") ? e = "yabrowser" : -1 !== t.indexOf("Maxthon/") ? e = "maxthon" : -1 !== t.indexOf("OPR/") ? e = "opera-chromium" : -1 !== t.indexOf("Opera/") ? e = "opera" : -1 !== t.indexOf("Firefox/") ? e = "firefox" : -1 !== t.indexOf("Chrome/") ? e = "chrome" : -1 !== t.indexOf("Safari/") && (e = "safari"), 
                e;
            }, t = "unknown";
            return E.isChrome ? (t = e() || "chrome", /sandbox.html#bg/.test(location.href) && (t = "chameleon"), 
            Xn.chromeNoStore && (t += "-sf")) : E.isFirefox ? (t = "firefox", E.isFirefoxMobile && (t += "-mobile"), 
            Xn.firefoxNoStore && (t += "-sf")) : E.isSafari ? t = "safari" : E.isGM ? t = "userjs-" + (t = e() || t) : E.isEdge && (t = "edge"), 
            t;
        }, Xn.getSfHelperName = function() {
            var e = Xn.varCache.helperName;
            return /^firefox/.test(e) && (e = e.replace("firefox", "ff")), e;
        }, Xn.dblTrackCheck = function(e) {
            if (!E.isGM) return e();
            Ae() || E.storage.get({
                dblTrack: null
            }, (t => {
                var r = Date.now();
                if (t.dblTrack && t.dblTrack.time > r) ; else {
                    var n = Xn.generateUuid();
                    E.storage.set({
                        dblTrack: {
                            uuid: n,
                            time: r + 6e4
                        }
                    }, (() => {
                        setTimeout((() => {
                            E.storage.get({
                                dblTrack: null
                            }, (t => {
                                t.dblTrack && t.dblTrack.uuid === n && e();
                            }));
                        }), 5e3);
                    }));
                }
            }));
        }, Xn.getUuid = function() {
            var e = Xn.varCache;
            if (e.uuid) return e.uuid;
            var t = Xn.generateUuid();
            return e.uuid = t, E.storage.set({
                uuid: t
            }), t;
        }, Xn.generateUuid = function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                var t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16);
            }));
        }, Xn.getNavLanguage = function() {
            var e = "", t = navigator.language;
            return /^\w{2}-|^\w{2}$/.test(t) && (e = t), e;
        }, Xn.gmShowButton = function(e) {
            e ? E.bundle.showButton() : E.bundle.hideButton();
        }, Xn.tabListener = (qn = !1, $n = Xn.preferences, Bn = ge([ {
            matches: /^(?:https?|file|ftp):\/\/[^\\/]*\.vimeo\.com\/.*$|^(?:https?|file|ftp):\/\/vimeo\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.youtube\.com\/.*$|^(?:https?|file|ftp):\/\/youtube\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.soundcloud\.com\/.*$|^(?:https?|file|ftp):\/\/soundcloud\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.vk\.com\/.*$|^(?:https?|file|ftp):\/\/vk\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.vkontakte\.ru\/.*$|^(?:https?|file|ftp):\/\/vkontakte\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.ok\.ru\/.*$|^(?:https?|file|ftp):\/\/ok\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.odnoklassniki\.ru\/.*$|^(?:https?|file|ftp):\/\/odnoklassniki\.ru\/.*$|^(?:https?|file|ftp):\/\/my\.mail\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.facebook\.com\/.*$|^(?:https?|file|ftp):\/\/facebook\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.savefrom\.net\/.*$|^(?:https?|file|ftp):\/\/savefrom\.net\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.instagram\.com\/.*$|^(?:https?|file|ftp):\/\/instagram\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.rutube\.ru\/.*$|^(?:https?|file|ftp):\/\/rutube\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.tiktok\.com\/.*$|^(?:https?|file|ftp):\/\/tiktok\.com\/.*$/i
        }, {
            matches: /^(?:https?|file|ftp):\/\/[^\\/]*\/.*$/i,
            include_globs: /^[^:]*:\/\/dailymotion\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.dailymotion\.[^\\/]*\/.*$/i
        } ]), Gn = function() {
            qn = !1, Jn.debug("tabListener", qn);
        }, {
            extendJsList: Hn = {},
            enable: function() {
                E.isFirefoxMobile || qn || (qn = !0, Jn.debug("tabListener", qn));
            },
            disable: function() {
                E.isFirefoxMobile || Gn();
            },
            injectLmInActiveTab: function() {
                var e = [ "includes/commons.js", "includes/link_modifier.js" ];
                E.getActiveTab((t => {
                    t && /^http/.test(t.url) && !Bn(t.url) && e.forEach((e => {
                        E.executeScript(t, {
                            file: e
                        });
                    }));
                }));
            },
            openPage: e => {
                qn && function(e, t) {
                    var r = Bn(t), n = [], o = $n.lmMediaHosting;
                    r || o && (n.push("includes/commons.js"), n.push("includes/link_modifier.js"));
                    var i = !0;
                    function a() {
                        for (var a in Hn) {
                            i = !1;
                            var s = Hn[a];
                            if (!r || s.noBlackList) {
                                var u = s.getScriptList(t) || [];
                                n.push(...u);
                            }
                        }
                        if (n.length) {
                            var c = n.filter(((e, t, r) => r.indexOf(e) === t));
                            Jn.debug("Inject", t, c), c.forEach((t => {
                                E.executeScript(e, {
                                    file: t
                                });
                            }));
                        } else !o && i && Gn();
                    }
                    E.isGM ? setTimeout(a, 3e3) : a();
                }(e.tab, e.url);
            }
        }), Xn.getCountry = function() {
            var e, t = Xn.preferences, r = e => new Promise((t => E.storage.set(e, t)));
            return (e = {
                countryExpiresAt: 0
            }, new Promise((t => E.storage.get(e, t)))).then((e => {
                if (ce() > e.countryExpiresAt) return r({
                    countryExpiresAt: ce() + 300
                }).then((() => {
                    var e = t.sfHelperName + " " + Xn.varCache.currentVersion;
                    return R({
                        type: "POST",
                        url: "https://sf-helper.com/geoip/country.php",
                        data: {
                            sig: e.length
                        },
                        headers: {
                            "X-Helper": e
                        }
                    });
                })).then((e => {
                    var n = e.body.toLowerCase().trim();
                    return Jn.debug("set country", n), t.country = n, r({
                        country: n,
                        countryExpiresAt: ce() + 259200
                    });
                }));
            })).catch((e => {
                Jn("getCountry error", e);
            }));
        }, Xn.getGASecret = function(e) {
            switch (e) {
              case "G-94HR5L4844":
                return "ZPd0mCdUTQWsCfEOo_bNYw";

              case "G-4WQE4RFM8F":
                return "soxH6EA-QCSQ1olyMW5t2g";

              case "G-L0GP1RQSBJ":
                return "_YBbwjArRHKjmZ8krhXbjQ";

              case "G-W8NGMXEEVX":
                return "3RVIBWlMTdyVl5WGkFLnEA";

              case "G-RC3SZG21LJ":
                return "ULosryHqTXKmj04eeI55cA";

              case "G-WQ82ZWDBEJ":
                return "mRZqbXE2TxyAR0TyXo-xqw";

              case "G-H6T68Y53FG":
                return "52IwVJ_2Tt-my3iq2OEYXQ";

              case "G-NSBD0T1C43":
                return "271YoEcSQXiAJ4FdGcjaXw";

              default:
                return null;
            }
        }, Xn.loader.when("prepare", (function() {
            var e = Promise.resolve();
            if (Xn.liteStorage.get("fromId", 0)) return e;
            if (E.isGM && Ae()) return e;
            return e = e.then((function() {
                return Xn.liteStorage.isTimeout("fromIdTimeout") ? Jn.debug("Request fromId timeout") : (Xn.liteStorage.setTimeout("fromIdTimeout", 21600), 
                R({
                    url: "http://savefrom.net/tools/get_vid.php"
                }).then((function(e) {
                    var t = e.body, r = -1;
                    /^\d+$/.test(t) && (r = parseInt(t)), Jn.debug("fromId", r), Xn.liteStorage.set("fromId", r);
                })).catch((function(e) {
                    return Jn.error("Request fromId error!", e);
                })));
            })).catch((function(e) {
                Jn.error("Request fromId error", e);
            }));
        })), Xn.onOptionChange = {
            button: function(e) {
                E.isGM && Xn.gmShowButton(e);
            },
            lmMediaHosting: function(e) {
                e && Xn.tabListener.enable();
            },
            gmNativeDownload: function(e) {
                E.isGM && (Xn.preferences.downloads = !!e, E.sendMessageToActiveTab({
                    action: "updatePreferences",
                    preferences: Xn.preferences
                }));
            }
        }, Xn.sendInGa = (Wn = !1, Yn = function e() {
            if (!Wn && zn.length) {
                Wn = !0;
                var t = Date.now(), r = zn.slice(0, 20);
                return r.map((function(e) {
                    var r = e.time, n = JSON.parse(JSON.stringify(e.params)), o = t - r;
                    o >= 144e5 && (o = 144e5 - 1e3 * (zn.length + 1)), n.qt = o;
                    var i = n.tid, a = Xn.getGASecret(n.tid), s = Xn.varCache.uuid, u = "screenview" === n.t ? "screenview" : n.ec;
                    return n.engagement_time_msec = 1, delete n.tid, n.country = Xn.preferences.country, 
                    {
                        params: n,
                        measurementId: i,
                        secret: a,
                        userId: s,
                        eventName: u
                    };
                })).forEach((t => {
                    if (!t.measurementId) throw new Error("measurementId is not defined");
                    if (!t.secret) throw new Error("secret is not defined");
                    return A({
                        url: `https://www.google-analytics.com/mp/collect?measurement_id=${t.measurementId}&api_secret=${t.secret}`,
                        type: "POST",
                        data: JSON.stringify({
                            client_id: t.userId,
                            events: [ {
                                name: t.eventName,
                                params: t.params
                            } ]
                        }),
                        timeout: 6e4
                    }, (function(t) {
                        Wn = !1, t || (r.forEach((function(e) {
                            var t = e.details, r = zn.indexOf(e);
                            -1 !== r && zn.splice(r, 1);
                            try {
                                t.onSuccess && t.onSuccess();
                            } catch (e) {
                                Jn.error("sendInGa", "onSuccess", e);
                            }
                        })), e());
                    }));
                }));
            }
        }, {
            stack: zn = [],
            push: function(e, t) {
                var r = !1;
                (t = t || {}).id && (r = zn.some((function(e) {
                    if (e.details.id === t.id) return !0;
                }))), r || (zn.unshift({
                    time: Date.now(),
                    params: e,
                    details: t
                }), zn.splice(100), setTimeout((function() {
                    Yn();
                }), 50));
            },
            pull: function() {
                zn.length && (Xn.liteStorage.isTimeout("sendInGaTimeout") || (Xn.liteStorage.setTimeout("sendInGaTimeout", 3600), 
                Yn()));
            }
        }), Xn.actionList = {
            getMenuDetails: function(e, t) {
                var r = {
                    preferences: Xn.preferences,
                    version: Xn.varCache.currentVersion,
                    lastVersion: function() {
                        var e = "", t = Xn.varCache.currentVersion, r = Xn.liteStorage.get("lastVersion", "");
                        if (!t || !r) return e;
                        try {
                            Re(t, r) && (e = r);
                        } catch (e) {
                            Jn.debug("isNewVersion", e);
                        }
                        return e;
                    }(),
                    helperName: Xn.varCache.helperName
                };
                return H([ "userInfo" ]).then((e => ({
                    userInfo: e.userInfo,
                    loginUrl: E.remote.auth.getLoginUrl()
                }))).then((e => t(Object.assign(r, e)))), !0;
            },
            updateOption: function(e) {
                var t = e.key, r = e.value, n = Xn.preferences[t];
                Xn.preferences[t] = r;
                var o = {};
                o[t] = r, E.storage.set(o), Xn.onOptionChange[t] && Xn.onOptionChange[t](r, n);
            },
            downloadFromCurrentPage: function() {
                E.getActiveTab((function(e) {
                    var t = e && e.url || "", r = Kn.stringify({
                        url: t,
                        utm_source: Xn.preferences.sfHelperName,
                        utm_medium: "extensions",
                        utm_campaign: "bookmarklet"
                    });
                    E.openTab("http://savefrom.net/?" + r, !0);
                }));
            },
            openPoll: function() {
                if (-1 !== [ "en", "uk", "ru" ].indexOf(E.i18n.getMessage("lang"))) {
                    var e = "http://" + E.i18n.getMessage("lang") + ".savefrom.net/helper-form.php";
                    E.getActiveTab((function(t) {
                        var r = t && t.url || "", n = ue(r) || "", o = "?" + Kn.stringify({
                            version: Xn.varCache.currentVersion,
                            helper: Xn.preferences.sfHelperName,
                            url: n
                        });
                        E.openTab(e + o, !0);
                    }));
                }
            },
            viaMenu_updateLinks: function() {
                E.sendMessageToActiveTab({
                    action: "updateLinks"
                });
            },
            viaMenu_downloadMP3Files: function() {
                E.sendMessageToActiveTab({
                    action: "downloadMP3Files"
                });
            },
            viaMenu_downloadPlaylist: function() {
                E.sendMessageToActiveTab({
                    action: "downloadPlaylist"
                });
            },
            viaMenu_downloadPhotos: function() {
                E.sendMessageToActiveTab({
                    action: "downloadPhotos"
                });
            },
            viaMenu_changeState: function(e) {
                if (Xn.actionList.updateOption({
                    key: e.prefKey,
                    value: e.state
                }), e.state && "lm" === e.moduleName && e.needInclude) return Xn.tabListener.injectLmInActiveTab();
                E.sendMessageToActiveTab({
                    action: "changeState",
                    moduleName: e.moduleName,
                    state: e.state
                });
            },
            showOptions: function() {
                if (E.isGM) E.bundle.showOptions(); else {
                    var e = "options.html";
                    E.isSafari && (e = safari.extension.baseURI + e), E.openTab(e, !0);
                }
            },
            getActiveTabModuleInfo: function(e, t) {
                return E.sendMessageToActiveTab({
                    action: "getModuleInfo",
                    url: e.url
                }, (function(e) {
                    t(e);
                })), !0;
            },
            getActiveTabUrl: function(e, t) {
                return E.getActiveTab((function(e) {
                    var r = e && e.url || "";
                    return t(r);
                })), !0;
            },
            getActiveTabInfo: function(e, t) {
                var r = Xn.preferences;
                return E.getActiveTab((function(e) {
                    var n = e && e.url || "";
                    if (0 !== n.indexOf("http")) return t();
                    var o = {
                        dailymotion: [ "*://*.dailymotion.*/*" ],
                        facebook: [ "*://*.facebook.com/*" ],
                        mailru: [ "*://my.mail.ru/*" ],
                        odnoklassniki: [ "*://*.ok.ru/*", "*://*.odnoklassniki.ru/*" ],
                        savefrom: [ "*://*.savefrom.net/*" ],
                        soundcloud: [ "*://*.soundcloud.com/*" ],
                        vimeo: [ "*://*.vimeo.com/*" ],
                        vk: [ "*://*.vk.com/*", "*://*.vkontakte.ru/*" ],
                        youtube: [ "*://*.youtube.com/*" ],
                        instagram: [ "*://*.instagram.com/*" ],
                        rutube: [ "*://*.rutube.ru/*" ],
                        tiktok: [ "*://*.tiktok.com/*" ],
                        yandexMusic: [ "*://music.yandex.ru/*" ],
                        matchTv: [ "*://matchtv.ru/*" ]
                    }, i = "lm", a = "lmMediaHosting", s = r.lmMediaHosting;
                    for (var u in o) {
                        var c = o[u].map((function(e) {
                            return qe(e);
                        })).join("|");
                        if ((c = new RegExp(c)).test(n)) {
                            i = u, a = Xn.preferenceMap[i], s = r[a];
                            break;
                        }
                    }
                    return t({
                        moduleName: i,
                        prefKey: a,
                        url: n,
                        state: s
                    });
                })), !0;
            },
            hideDownloadWarning: function(e, t) {
                return void 0 !== e.set ? E.storage.set({
                    hideDownloadWarning: e.set
                }) : (E.storage.get({
                    hideDownloadWarning: !1
                }, (function(e) {
                    t(e.hideDownloadWarning);
                })), !0);
            },
            track: function(e) {
                Xn.readyPromise.then((() => {
                    delete e.action, Xn.track(e);
                }));
            },
            sendMonitoring: function(e) {
                Xn.preferences.sendExporterEvent && Xn.readyPromise.then((() => {
                    delete e.action, Xn.sendMonitoring(e);
                }));
            },
            sendAlternativeMonitoring: function(e) {
                Xn.preferences.sendExporterEvent && Xn.readyPromise.then((() => {
                    delete e.action, Xn.sendAlternativeMonitoring(e);
                }));
            },
            addToClipboard: function(e) {
                if (E.isChrome || E.isFirefox) {
                    var t, r = e.text;
                    document.body.appendChild(t = $.create("textarea", {
                        text: r
                    })), t.select(), setTimeout((function() {
                        document.execCommand("copy", !1, null), t.parentNode.removeChild(t);
                    }));
                }
            },
            setIconBadge: function(e) {
                var t = String(e.text);
                (E.isChrome || E.isFirefox) && chrome.browserAction && chrome.browserAction.setBadgeText({
                    text: t
                });
            },
            trackError: function(e) {
                try {
                    var t = Xn.actionList.trackError;
                    t.dDbl || (t.dDbl = {});
                    var r = e.desc;
                    if (e.error) {
                        var n = e.error;
                        r = r ? r + " " : "", n instanceof Error ? (r += String(n.message || n) || "ERROR", 
                        n.stack && (r += " " + e.error.stack)) : r += n;
                    }
                    var o = r.substr(0, 150);
                    if (t.dDbl[o]) return;
                    t.dDbl[o] = !0;
                    var i = {
                        t: "exception",
                        exd: o,
                        tid: "UA-7055055-9"
                    };
                    Xn.sendStatsInfo(i);
                } catch (e) {}
            },
            openTab: function(e) {
                E.openTab(e.url);
            },
            checkAndOpenProLanding: function() {
                Xn.checkAndOpenProLanding();
            }
        }, Xn.onMessage = function(e, t, r) {
            if (e && "object" == typeof e) {
                if ("openPage" !== e.action) {
                    var n = e.action, o = Xn.actionList[n];
                    if (o) return o.call(Xn.actionList, e, r);
                    var i = (t, n) => {
                        var o = n.call(t, e, r);
                        return o instanceof Promise ? (o.then(r), !0) : o;
                    };
                    for (var a in Xn.modules) {
                        var s = Xn.modules[a];
                        if (o = s[n]) return i(s, o);
                    }
                    return (o = Xn.utils[n]) ? o.call(Xn.utils, e, r) : void 0;
                }
                Xn.isReady ? Xn.tabListener.openPage(t) : this.readyPromise.then((() => {
                    Xn.tabListener.openPage(t);
                }));
            } else Jn.debug("Skip message", e);
        }, Xn.loadSettings = function(e) {
            var t = Xn.varCache, r = Xn.preferences, o = Xn.defaultPreferences;
            E.isGM && (o.button = 0, o.showUmmyBtn = 0);
            var a = {
                ummyDetected: function(e) {
                    e || 0 === e || (e = r.showUmmyInfo ? 0 : 1, E.storage.set({
                        ummyDetected: e
                    })), r.ummyDetected = e;
                }
            }, s = Object.keys(o), u = Object.keys(a);
            return E.storage.get(s.concat(u), function() {
                var c = n(i().mark((function n(c) {
                    var l, f, p;
                    return i().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            return s.forEach((function(e) {
                                var t = o[e], n = c[e];
                                void 0 === n && (n = t), r[e] = n;
                            })), u.forEach((function(e) {
                                a[e](c[e]);
                            })), t.isFirstrun && (l = {
                                showUmmyLanding: r.showUmmyLanding = 1,
                                onceShowYtTooltip: r.onceShowYtTooltip = 1,
                                onceShowYtTutorial: r.onceShowYtTutorial = 1
                            }, E.storage.set(l)), r.onceShowYtTutorial && (r.onceShowYtTutorial = 0), E.isChrome && (chrome.downloads && chrome.downloads.download || chrome.permissions && chrome.permissions.request) && (r.downloads = !0), 
                            E.isGM && (r.downloads = !1, f = "undefined" != typeof GM_download, p = !1, f && "undefined" != typeof GM_info && (p = "browser" === GM_info.downloadMode), 
                            f && (r.gmNativeDownload || p) && (r.gmNativeDownload = 1, r.downloads = !0)), E.isFirefox && (r.downloads = !0), 
                            r.downloads && (r.moduleShowDownloadInfo = 0), n.abrupt("return", e());

                          case 9:
                          case "end":
                            return n.stop();
                        }
                    }), n);
                })));
                return function(e) {
                    return c.apply(this, arguments);
                };
            }());
        }, Xn.prepare = function() {
            var e = n(i().mark((function e(t) {
                var r;
                return i().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return r = Xn.varCache, Xn.loader.when("loadSettings", (function() {
                            r.isUpgrade = !r.isFirstrun && Xn.preferences.version !== r.currentVersion, t();
                        })), e.next = 4, be();

                      case 4:
                        Xn.preferences.selectorsConfig = e.sent, Xn.loadSettings((function() {
                            Xn.loader.ready("loadSettings");
                        }));

                      case 6:
                      case "end":
                        return e.stop();
                    }
                }), e);
            })));
            return function(t) {
                return e.apply(this, arguments);
            };
        }(), Xn.initMessageListener = function() {
            Xn.initMessageListener.fired || (Xn.initMessageListener.fired = !0, E.onMessage.addListener((function(e, t, r) {
                return Xn.onMessage(e, t, r);
            })));
        }, Xn.init = function() {
            Xn.initMessageListener(), Xn.preferences.sendExporterEvent = Math.floor(100 * Math.random()) < 1;
            var e = Xn.varCache, t = Xn.preferences;
            return ao().then((() => E.storage.get({
                uuid: "",
                version: "",
                country: "",
                lc: null,
                generalConfigVersion: {
                    overall: 0,
                    forcedCacheRemove: 0,
                    forcedFirstRun: 0,
                    landingPage: 0
                },
                [Xn.liteStorage.getStorageKey()]: {}
            }, function() {
                var r = n(i().mark((function r(n) {
                    var o, a, s, u, c;
                    return i().wrap((function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return Xn.liteStorage.setStorage(n), null === n.lc && (n.lc = Math.random() < .05, 
                            E.storage.set({
                                lc: n.lc
                            })), t.lc = n.lc, Xn.varCache.helperName = Xn.getHelperName(), t.sfHelperName = Xn.getSfHelperName(), 
                            "string" == typeof n.uuid && 36 === n.uuid.length && (e.uuid = n.uuid), n.country && (t.country = n.country), 
                            r.next = 9, Xn.getCountry();

                          case 9:
                            return o = new $e(Be(E), t.country), a = !1, r.next = 13, me();

                          case 13:
                            return Xn.preferences.generalConfig = r.sent, n.generalConfigVersion.overall < Xn.preferences.generalConfig.version && ((s = n.generalConfigVersion.forcedCacheRemove < Xn.preferences.generalConfig.forcedCacheRemove.version) && ie(t, o) && E.storage.clear((() => {
                                E.storage.set({
                                    uuid: n.uuid,
                                    version: n.version,
                                    country: t.country,
                                    lc: n.lc,
                                    [Xn.liteStorage.getStorageKey()]: n[Xn.liteStorage.getStorageKey()]
                                });
                            })), n.generalConfigVersion.forcedFirstRun < Xn.preferences.generalConfig.forcedFirstRun.version && (a = oe(t, o)), 
                            (s || n.generalConfigVersion.landingPage < Xn.preferences.generalConfig.landingPage.version) && (u = ae(t, o)) && (E.storage.set({
                                landingPageConfig: u
                            }), t.landingPageConfig = u), E.storage.set({
                                generalConfigVersion: {
                                    overall: Xn.preferences.generalConfig.version,
                                    forcedCacheRemove: Xn.preferences.generalConfig.forcedCacheRemove.version,
                                    forcedFirstRun: Xn.preferences.generalConfig.forcedFirstRun.version,
                                    landingPage: Xn.preferences.generalConfig.landingPage.version
                                }
                            })), n.version && !a || (n.version || Xn.track({
                                t: "event",
                                ec: "first_run",
                                ea: "first_run",
                                tid: "G-94HR5L4844"
                            }), e.isFirstrun = !0), r.next = 18, Te(Xn);

                          case 18:
                            return Xn.preferences.proEnabled = r.sent, c = new ne(o), r.next = 23, c.init();

                          case 23:
                            Xn.preferences.experiments = r.sent, t.showUmmyItem = /^Win|^Mac/.test(navigator.platform) ? 1 : 0, 
                            Xn.loader.ready("init"), Xn.loader.when("prepare", (function() {
                                Xn.checkVersion();
                            })), Xn.events.on("sendScreenView", (() => {
                                if (t.lc) {
                                    var e = {
                                        t: "screenview",
                                        cd: "init",
                                        cd4: "true",
                                        tid: "G-94HR5L4844"
                                    };
                                    Xn.wrapBaseStatInfo(e), Xn.quickTrack(e), j([ {
                                        user_id: Xn.varCache.uuid,
                                        event_type: "init",
                                        user_properties: {
                                            Cohort: "Clear"
                                        }
                                    } ]).catch((() => {
                                        chrome && "tabs" in chrome && "webNavigation" in chrome && chrome.tabs.query({
                                            currentWindow: !0,
                                            active: !0
                                        }, (e => {
                                            0 !== e.length && chrome.webNavigation.getAllFrames({
                                                tabId: e[0].id
                                            }, (e => {
                                                Jn.debug("Error in amplitude: ", e);
                                            }));
                                        }));
                                    }));
                                }
                            })), Xn.prepare((function() {
                                Xn.loader.ready("prepare"), Xn.readyHandler();
                            }));

                          case 25:
                          case "end":
                            return r.stop();
                        }
                    }), r);
                })));
                return function(e) {
                    return r.apply(this, arguments);
                };
            }())));
        };
        var Zn, eo, to, ro, no, oo, io, ao = () => Promise.resolve().then((() => {
            if (E.isChrome) return new Promise((e => E.storage.get({
                migrated3: !1
            }, (t => e(t.migrated3))))).then((e => {
                if (!e) {
                    var t = {
                        migrated3: !0
                    };
                    return Object.keys(localStorage).forEach((e => {
                        var r = localStorage.getItem(e);
                        try {
                            /^{(?:"w":.+|)}$/.test(r) && (t[e] = JSON.parse(r).w);
                        } catch (t) {
                            Jn.error("Parse value error", e, t);
                        }
                    })), new Promise((e => E.storage.set(t, e)));
                }
            })).catch((e => {
                Jn.error("migrate error", e), E.storage.set({
                    migrated3: !0
                });
            }));
        }));
        (Xn.userTrack = function() {
            if (!Xn.liteStorage.isTimeout("trackTimeout")) {
                Xn.liteStorage.setTimeout("trackTimeout", 300);
                var e = {
                    t: "screenview",
                    cd: "init",
                    tid: "G-94HR5L4844"
                };
                return Xn.dblTrackCheck((function() {
                    Xn.track(e, {
                        id: "init",
                        onSuccess: function() {
                            Xn.liteStorage.setTimeout("trackTimeout", 43200), Xn.events.emit("sendScreenView"), 
                            Pe().then((() => {
                                if ("de" === Xn.preferences.country) {
                                    var t = Object.assign({}, e, {
                                        tid: "UA-119781451-36"
                                    });
                                    Xn.quickTrack(t);
                                }
                            }));
                        }
                    });
                }));
            }
        }, Xn.trackValidate = function(e) {
            var t = function(e) {
                return !(!e && 0 !== e && !1 !== e) && -1 === [ "object", "function" ].indexOf(typeof e);
            };
            if (!e.tid) return !1;
            if (!e.cid) return !1;
            if (1 !== parseInt(e.v)) return !1;
            if (!e.t) return !1;
            if ("event" === e.t) {
                if (!t(e.ec) || !t(e.ea)) return !1;
            } else if ("screenview" === e.t) {
                if (!t(e.cd)) return !1;
            } else if (!("social" !== e.t || t(e.st) && t(e.sa) && t(e.sn))) return !1;
            return !0;
        }, Xn.track = function(e, t) {
            if (!!Xn.preferences.dataCollectionEnabled) return Xn.sendStatsInfo(e, t);
        }, Xn.sendMonitoring = function(e) {
            if (!!Xn.preferences.dataCollectionEnabled) {
                var t = `category=${e.obj.category}&subcategory=${e.obj.subcategory}&event=${e.obj.event}&duration=3.14`;
                return A({
                    url: "https://monitoring-exporter.sf-helper.com/event",
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    data: t,
                    timeout: 6e4
                }, (function(e, t) {
                    e && console.log(e);
                }));
            }
        }, Xn.sendAlternativeMonitoring = function(t) {
            if (!!Xn.preferences.dataCollectionEnabled) {
                var r = t.params, n = r.type, o = e(r, Qn);
                fetch(`https://monitoring-exporter.sf-helper.com/api/v3/${n}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(o)
                }).catch((e => {
                    console.error(e);
                }));
            }
        }, E.isGM) && new gt(Xn.track).init();
        Xn.quickTrack = function(e, t) {
            !Xn.preferences.dataCollectionEnabled || (Xn.trackValidate(e) ? (Jn.debug("Track", e), 
            Xn.sendInGa.push(e, t)) : Jn.error("Invalid track params!", e));
        }, Xn.wrapBaseStatInfo = function(e) {
            var t = Xn.varCache, r = {
                v: 1,
                ul: navigator.language,
                tid: "UA-67738130-2",
                cid: Xn.getUuid(),
                an: "helper",
                aid: t.helperName,
                av: t.currentVersion
            };
            for (var n in r) e.hasOwnProperty(n) || (e[n] = r[n]);
            for (var o in e) "&clientID" === e[o] && (e[o] = e.cid);
            return e;
        }, Xn.sendStatsInfo = function(e, t) {
            if (!!Xn.preferences.dataCollectionEnabled) {
                var r = Xn.preferences;
                Xn.wrapBaseStatInfo(e), e.hasOwnProperty("lang") || (e.lang = E.i18n.getMessage("lang"));
                var n = Xn.liteStorage.get("fromId", 0);
                n > 0 && (e.vid = n), r.hasSovetnik && (e.metabar = r.sovetnikEnabled ? "true" : "false"), 
                e.ummy = r.ummyDetected ? "true" : r.showUmmyItem ? "false" : "none", r.aviaBarEnabled && (e.aviaBar = r.aviaBarEnabled), 
                Xn.quickTrack(e, t);
            }
        }, Xn.checkVersion = function() {
            var e = Xn.varCache, t = !1;
            e.isFirstrun ? (Xn.loader.ready("firstrun"), t = !0) : e.isUpgrade && (Xn.loader.ready("upgrade"), 
            t = !0), t && Xn.actionList.updateOption({
                key: "version",
                value: e.currentVersion
            });
        }, Xn.checkAndOpenProLanding = function(e) {
            Xn.preferences.checkAndOpenProLandingLocked || (Xn.preferences.checkAndOpenProLandingLocked = !0, 
            E.storage.get({
                openProLanding: null,
                buttonClickCountSinceProLanding: 0,
                landingPageConfig: null
            }, (t => {
                t.openProLanding || (t.openProLanding = {
                    lastOpen: 0
                }, E.storage.set({
                    openProLanding: t.openProLanding
                })), !t.landingPageConfig || Date.now() <= t.openProLanding.lastOpen + 1e3 * t.landingPageConfig.cooldownInSeconds || (e || ++t.buttonClickCountSinceProLanding >= t.landingPageConfig.clicksBeforeOpen ? (E.openTab(t.landingPageConfig.url), 
                E.storage.set({
                    openProLanding: {
                        lastOpen: Date.now()
                    },
                    buttonClickCountSinceProLanding: 0
                })) : E.storage.set({
                    buttonClickCountSinceProLanding: t.buttonClickCountSinceProLanding
                })), Xn.preferences.checkAndOpenProLandingLocked = !1;
            })));
        }, Xn.loader.when("firstrun", (function() {
            if (Xn.checkAndOpenProLanding(!0), !E.isGM) {
                var e = "http://savefrom.net/user.php?helper=" + Xn.preferences.sfHelperName + ";firstrun";
                E.isFirefox && (Xn.actionList.updateOption({
                    key: "dataCollectionEnabled",
                    value: !1
                }), e = chrome.runtime.getURL("eula.html")), Xn.utils.checkUrlsOfOpenTabs([ /https?:\/\/([\w\-]+\.)?savefrom\.net\/(update-helper|userjs-setup)\.php/i ], (function(t) {
                    t.length > 0 || Xn.utils.checkUrlsOfOpenTabs([ /https?:\/\/legal\.yandex\.(ru|com\.tr)\//i ], (function(t) {
                        var r = 0 === t.length;
                        return E.openTab(e, r);
                    }));
                }));
            }
        })), Xn.loader.when("prepare", (function() {
            var e = Xn.preferences;
            e.onceShowYtTutorial && Xn.actionList.setIconBadge({
                text: "?"
            }), e.showUmmyLanding && E.storage.get({
                onceUmmyLandingHide: 0
            }, (function(t) {
                t.onceUmmyLandingHide > 2 && E.storage.set({
                    showUmmyLanding: e.showUmmyLanding = 0
                });
            }));
        })), Xn.loader.when("prepare", (function() {
            Xn.tabListener.enable();
        })), Xn.loader.when("init", (function() {
            if ((E.isChrome || E.isFirefox) && chrome.runtime.setUninstallURL) {
                Xn.varCache, Xn.preferences;
                var e = function() {
                    chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/16VCCHbeIZTkmymBzyCaIf50yT9DSKPIUe7qnwjvIKfQ/edit");
                };
                e(), Xn.loader.when("prepare", (function() {
                    e();
                })), E.storage.onChanged.addListener(((t, r) => {
                    "local" === r && t.country && e();
                }));
            }
        })), Xn.liteStorage = (Zn = "liteStorage", eo = {}, to = function(e) {
            var t = {};
            return t[Zn] = eo, E.storage.set(t, e);
        }, ro = function() {
            Jn.error("liteStorage is not set!");
        }, io = function(e, t) {
            return no(e, ce() + t);
        }, {
            getStorageKey: function() {
                return Zn;
            },
            setStorage: function(e) {
                eo = e[Zn] || {}, ro = N(to, 100);
            },
            set: no = function(e, t) {
                eo[e] !== t && (eo[e] = t, ro());
            },
            get: oo = function(e, t) {
                var r = eo[e];
                return void 0 === r && (r = t), function(e) {
                    return JSON.parse(JSON.stringify({
                        w: e
                    })).w;
                }(r);
            },
            isTimeout: function(e) {
                return oo(e, 0) > ce();
            },
            setTimeout: io,
            isExpire: function(e) {
                return oo(e, 0) < ce();
            },
            setExpire: io
        }), (0, r(301).A)(Xn), Xn.init().then(n(i().mark((function e() {
            return i().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                  case "end":
                    return e.stop();
                }
            }), e);
        }))));
    })();
})();