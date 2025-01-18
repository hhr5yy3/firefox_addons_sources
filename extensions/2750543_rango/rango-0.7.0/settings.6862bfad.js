function e(e, t, n, r) {
  Object.defineProperty(e, t, {
    get: n,
    set: r,
    enumerable: !0,
    configurable: !0
  });
}

function t(e) {
  return e && e.__esModule ? e.default : e;
}

var n = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}, r = {}, a = {}, i = n.parcelRequire94c2;

null == i && ((i = function(e) {
  if (e in r) return r[e].exports;
  if (e in a) {
    var t = a[e];
    delete a[e];
    var n = {
      id: e,
      exports: {}
    };
    return r[e] = n, t.call(n.exports, n, n.exports), n.exports;
  }
  var i = new Error("Cannot find module '" + e + "'");
  throw i.code = "MODULE_NOT_FOUND", i;
}).register = function(e, t) {
  a[e] = t;
}, n.parcelRequire94c2 = i), i.register("fomGM", (function(t, n) {
  var r, a;
  e(t.exports, "register", (() => r), (e => r = e)), e(t.exports, "resolve", (() => a), (e => a = e));
  var i = {};
  r = function(e) {
    for (var t = Object.keys(e), n = 0; n < t.length; n++) i[t[n]] = e[t[n]];
  }, a = function(e) {
    var t = i[e];
    if (null == t) throw new Error("Could not resolve bundle with id " + e);
    return t;
  };
})), i.register("iRrGu", (function(t, n) {
  /**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
  var r, a, o;
  e(t.exports, "Fragment", (() => r), (e => r = e)), e(t.exports, "jsx", (() => a), (e => a = e)), 
  e(t.exports, "jsxs", (() => o), (e => o = e));
  var s = i("djNrI"), l = Symbol.for("react.element"), u = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, d = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
  function p(e, t, n) {
    var r, a = {}, i = null, o = null;
    for (r in void 0 !== n && (i = "" + n), void 0 !== t.key && (i = "" + t.key), void 0 !== t.ref && (o = t.ref), 
    t) c.call(t, r) && !f.hasOwnProperty(r) && (a[r] = t[r]);
    if (e && e.defaultProps) for (r in t = e.defaultProps) void 0 === a[r] && (a[r] = t[r]);
    return {
      $$typeof: l,
      type: e,
      key: i,
      ref: o,
      props: a,
      _owner: d.current
    };
  }
  r = u, a = p, o = p;
})), i.register("djNrI", (function(e, t) {
  e.exports = i("efL4j");
})), i.register("efL4j", (function(t, n) {
  /**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
  var r, a, i, o, s, l, u, c, d, f, p, m, h, g, v, b, y, x, k, w, _, S, C, A, E, j, N, P, T, O, z, M, L, R, I;
  e(t.exports, "Children", (() => r), (e => r = e)), e(t.exports, "Component", (() => a), (e => a = e)), 
  e(t.exports, "Fragment", (() => i), (e => i = e)), e(t.exports, "Profiler", (() => o), (e => o = e)), 
  e(t.exports, "PureComponent", (() => s), (e => s = e)), e(t.exports, "StrictMode", (() => l), (e => l = e)), 
  e(t.exports, "Suspense", (() => u), (e => u = e)), e(t.exports, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", (() => c), (e => c = e)), 
  e(t.exports, "cloneElement", (() => d), (e => d = e)), e(t.exports, "createContext", (() => f), (e => f = e)), 
  e(t.exports, "createElement", (() => p), (e => p = e)), e(t.exports, "createFactory", (() => m), (e => m = e)), 
  e(t.exports, "createRef", (() => h), (e => h = e)), e(t.exports, "forwardRef", (() => g), (e => g = e)), 
  e(t.exports, "isValidElement", (() => v), (e => v = e)), e(t.exports, "lazy", (() => b), (e => b = e)), 
  e(t.exports, "memo", (() => y), (e => y = e)), e(t.exports, "startTransition", (() => x), (e => x = e)), 
  e(t.exports, "unstable_act", (() => k), (e => k = e)), e(t.exports, "useCallback", (() => w), (e => w = e)), 
  e(t.exports, "useContext", (() => _), (e => _ = e)), e(t.exports, "useDebugValue", (() => S), (e => S = e)), 
  e(t.exports, "useDeferredValue", (() => C), (e => C = e)), e(t.exports, "useEffect", (() => A), (e => A = e)), 
  e(t.exports, "useId", (() => E), (e => E = e)), e(t.exports, "useImperativeHandle", (() => j), (e => j = e)), 
  e(t.exports, "useInsertionEffect", (() => N), (e => N = e)), e(t.exports, "useLayoutEffect", (() => P), (e => P = e)), 
  e(t.exports, "useMemo", (() => T), (e => T = e)), e(t.exports, "useReducer", (() => O), (e => O = e)), 
  e(t.exports, "useRef", (() => z), (e => z = e)), e(t.exports, "useState", (() => M), (e => M = e)), 
  e(t.exports, "useSyncExternalStore", (() => L), (e => L = e)), e(t.exports, "useTransition", (() => R), (e => R = e)), 
  e(t.exports, "version", (() => I), (e => I = e));
  var F = Symbol.for("react.element"), D = Symbol.for("react.portal"), U = Symbol.for("react.fragment"), Z = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), V = Symbol.for("react.provider"), $ = Symbol.for("react.context"), W = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), q = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), Y = Symbol.iterator;
  var Q = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
  }, G = Object.assign, X = {};
  function J(e, t, n) {
    this.props = e, this.context = t, this.refs = X, this.updater = n || Q;
  }
  function ee() {}
  function te(e, t, n) {
    this.props = e, this.context = t, this.refs = X, this.updater = n || Q;
  }
  J.prototype.isReactComponent = {}, J.prototype.setState = function(e, t) {
    if ("object" != typeof e && "function" != typeof e && null != e) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState");
  }, J.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  }, ee.prototype = J.prototype;
  var ne = te.prototype = new ee;
  ne.constructor = te, G(ne, J.prototype), ne.isPureReactComponent = !0;
  var re = Array.isArray, ae = Object.prototype.hasOwnProperty, ie = {
    current: null
  }, oe = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
  function se(e, t, n) {
    var r, a = {}, i = null, o = null;
    if (null != t) for (r in void 0 !== t.ref && (o = t.ref), void 0 !== t.key && (i = "" + t.key), 
    t) ae.call(t, r) && !oe.hasOwnProperty(r) && (a[r] = t[r]);
    var s = arguments.length - 2;
    if (1 === s) a.children = n; else if (1 < s) {
      for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
      a.children = l;
    }
    if (e && e.defaultProps) for (r in s = e.defaultProps) void 0 === a[r] && (a[r] = s[r]);
    return {
      $$typeof: F,
      type: e,
      key: i,
      ref: o,
      props: a,
      _owner: ie.current
    };
  }
  function le(e) {
    return "object" == typeof e && null !== e && e.$$typeof === F;
  }
  var ue = /\/+/g;
  function ce(e, t) {
    return "object" == typeof e && null !== e && null != e.key ? function(e) {
      var t = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + e.replace(/[=:]/g, (function(e) {
        return t[e];
      }));
    }("" + e.key) : t.toString(36);
  }
  function de(e, t, n, r, a) {
    var i = typeof e;
    "undefined" !== i && "boolean" !== i || (e = null);
    var o = !1;
    if (null === e) o = !0; else switch (i) {
     case "string":
     case "number":
      o = !0;
      break;

     case "object":
      switch (e.$$typeof) {
       case F:
       case D:
        o = !0;
      }
    }
    if (o) return a = a(o = e), e = "" === r ? "." + ce(o, 0) : r, re(a) ? (n = "", 
    null != e && (n = e.replace(ue, "$&/") + "/"), de(a, t, n, "", (function(e) {
      return e;
    }))) : null != a && (le(a) && (a = function(e, t) {
      return {
        $$typeof: F,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
      };
    }(a, n + (!a.key || o && o.key === a.key ? "" : ("" + a.key).replace(ue, "$&/") + "/") + e)), 
    t.push(a)), 1;
    if (o = 0, r = "" === r ? "." : r + ":", re(e)) for (var s = 0; s < e.length; s++) {
      var l = r + ce(i = e[s], s);
      o += de(i, t, n, l, a);
    } else if (l = function(e) {
      return null === e || "object" != typeof e ? null : "function" == typeof (e = Y && e[Y] || e["@@iterator"]) ? e : null;
    }(e), "function" == typeof l) for (e = l.call(e), s = 0; !(i = e.next()).done; ) o += de(i = i.value, t, n, l = r + ce(i, s++), a); else if ("object" === i) throw t = String(e), 
    Error("Objects are not valid as a React child (found: " + ("[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return o;
  }
  function fe(e, t, n) {
    if (null == e) return e;
    var r = [], a = 0;
    return de(e, r, "", "", (function(e) {
      return t.call(n, e, a++);
    })), r;
  }
  function pe(e) {
    if (-1 === e._status) {
      var t = e._result;
      (t = t()).then((function(t) {
        0 !== e._status && -1 !== e._status || (e._status = 1, e._result = t);
      }), (function(t) {
        0 !== e._status && -1 !== e._status || (e._status = 2, e._result = t);
      })), -1 === e._status && (e._status = 0, e._result = t);
    }
    if (1 === e._status) return e._result.default;
    throw e._result;
  }
  var me = {
    current: null
  }, he = {
    transition: null
  };
  r = {
    map: fe,
    forEach: function(e, t, n) {
      fe(e, (function() {
        t.apply(this, arguments);
      }), n);
    },
    count: function(e) {
      var t = 0;
      return fe(e, (function() {
        t++;
      })), t;
    },
    toArray: function(e) {
      return fe(e, (function(e) {
        return e;
      })) || [];
    },
    only: function(e) {
      if (!le(e)) throw Error("React.Children.only expected to receive a single React element child.");
      return e;
    }
  }, a = J, i = U, o = B, s = te, l = Z, u = H, c = {
    ReactCurrentDispatcher: me,
    ReactCurrentBatchConfig: he,
    ReactCurrentOwner: ie
  }, d = function(e, t, n) {
    if (null == e) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = G({}, e.props), a = e.key, i = e.ref, o = e._owner;
    if (null != t) {
      if (void 0 !== t.ref && (i = t.ref, o = ie.current), void 0 !== t.key && (a = "" + t.key), 
      e.type && e.type.defaultProps) var s = e.type.defaultProps;
      for (l in t) ae.call(t, l) && !oe.hasOwnProperty(l) && (r[l] = void 0 === t[l] && void 0 !== s ? s[l] : t[l]);
    }
    var l = arguments.length - 2;
    if (1 === l) r.children = n; else if (1 < l) {
      s = Array(l);
      for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
      r.children = s;
    }
    return {
      $$typeof: F,
      type: e.type,
      key: a,
      ref: i,
      props: r,
      _owner: o
    };
  }, f = function(e) {
    return (e = {
      $$typeof: $,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null
    }).Provider = {
      $$typeof: V,
      _context: e
    }, e.Consumer = e;
  }, p = se, m = function(e) {
    var t = se.bind(null, e);
    return t.type = e, t;
  }, h = function() {
    return {
      current: null
    };
  }, g = function(e) {
    return {
      $$typeof: W,
      render: e
    };
  }, v = le, b = function(e) {
    return {
      $$typeof: K,
      _payload: {
        _status: -1,
        _result: e
      },
      _init: pe
    };
  }, y = function(e, t) {
    return {
      $$typeof: q,
      type: e,
      compare: void 0 === t ? null : t
    };
  }, x = function(e) {
    var t = he.transition;
    he.transition = {};
    try {
      e();
    } finally {
      he.transition = t;
    }
  }, k = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, w = function(e, t) {
    return me.current.useCallback(e, t);
  }, _ = function(e) {
    return me.current.useContext(e);
  }, S = function() {}, C = function(e) {
    return me.current.useDeferredValue(e);
  }, A = function(e, t) {
    return me.current.useEffect(e, t);
  }, E = function() {
    return me.current.useId();
  }, j = function(e, t, n) {
    return me.current.useImperativeHandle(e, t, n);
  }, N = function(e, t) {
    return me.current.useInsertionEffect(e, t);
  }, P = function(e, t) {
    return me.current.useLayoutEffect(e, t);
  }, T = function(e, t) {
    return me.current.useMemo(e, t);
  }, O = function(e, t, n) {
    return me.current.useReducer(e, t, n);
  }, z = function(e) {
    return me.current.useRef(e);
  }, M = function(e) {
    return me.current.useState(e);
  }, L = function(e, t, n) {
    return me.current.useSyncExternalStore(e, t, n);
  }, R = function() {
    return me.current.useTransition();
  }, I = "18.2.0";
})), i.register("7p9c6", (function(t, n) {
  /**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
  var r, a, o, s, l, u, c, d, f, p, m, h;
  e(t.exports, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", (() => r), (e => r = e)), 
  e(t.exports, "createPortal", (() => a), (e => a = e)), e(t.exports, "createRoot", (() => o), (e => o = e)), 
  e(t.exports, "findDOMNode", (() => s), (e => s = e)), e(t.exports, "flushSync", (() => l), (e => l = e)), 
  e(t.exports, "hydrate", (() => u), (e => u = e)), e(t.exports, "hydrateRoot", (() => c), (e => c = e)), 
  e(t.exports, "render", (() => d), (e => d = e)), e(t.exports, "unmountComponentAtNode", (() => f), (e => f = e)), 
  e(t.exports, "unstable_batchedUpdates", (() => p), (e => p = e)), e(t.exports, "unstable_renderSubtreeIntoContainer", (() => m), (e => m = e)), 
  e(t.exports, "version", (() => h), (e => h = e));
  var g = i("djNrI"), v = i("3dKuD");
  function b(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var y = new Set, x = {};
  function k(e, t) {
    w(e, t), w(e + "Capture", t);
  }
  function w(e, t) {
    for (x[e] = t, e = 0; e < t.length; e++) y.add(t[e]);
  }
  var _ = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement), S = Object.prototype.hasOwnProperty, C = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, A = {}, E = {};
  function j(e, t, n, r, a, i, o) {
    this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = a, 
    this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, 
    this.removeEmptyString = o;
  }
  var N = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e) {
    N[e] = new j(e, 0, !1, e, null, !1, !1);
  })), [ [ "acceptCharset", "accept-charset" ], [ "className", "class" ], [ "htmlFor", "for" ], [ "httpEquiv", "http-equiv" ] ].forEach((function(e) {
    var t = e[0];
    N[t] = new j(t, 1, !1, e[1], null, !1, !1);
  })), [ "contentEditable", "draggable", "spellCheck", "value" ].forEach((function(e) {
    N[e] = new j(e, 2, !1, e.toLowerCase(), null, !1, !1);
  })), [ "autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha" ].forEach((function(e) {
    N[e] = new j(e, 2, !1, e, null, !1, !1);
  })), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e) {
    N[e] = new j(e, 3, !1, e.toLowerCase(), null, !1, !1);
  })), [ "checked", "multiple", "muted", "selected" ].forEach((function(e) {
    N[e] = new j(e, 3, !0, e, null, !1, !1);
  })), [ "capture", "download" ].forEach((function(e) {
    N[e] = new j(e, 4, !1, e, null, !1, !1);
  })), [ "cols", "rows", "size", "span" ].forEach((function(e) {
    N[e] = new j(e, 6, !1, e, null, !1, !1);
  })), [ "rowSpan", "start" ].forEach((function(e) {
    N[e] = new j(e, 5, !1, e.toLowerCase(), null, !1, !1);
  }));
  var P = /[\-:]([a-z])/g;
  function T(e) {
    return e[1].toUpperCase();
  }
  function O(e, t, n, r) {
    var a = N.hasOwnProperty(t) ? N[t] : null;
    (null !== a ? 0 !== a.type : r || !(2 < t.length) || "o" !== t[0] && "O" !== t[0] || "n" !== t[1] && "N" !== t[1]) && (function(e, t, n, r) {
      if (null == t || function(e, t, n, r) {
        if (null !== n && 0 === n.type) return !1;
        switch (typeof t) {
         case "function":
         case "symbol":
          return !0;

         case "boolean":
          return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);

         default:
          return !1;
        }
      }(e, t, n, r)) return !0;
      if (r) return !1;
      if (null !== n) switch (n.type) {
       case 3:
        return !t;

       case 4:
        return !1 === t;

       case 5:
        return isNaN(t);

       case 6:
        return isNaN(t) || 1 > t;
      }
      return !1;
    }(t, n, a, r) && (n = null), r || null === a ? function(e) {
      return !!S.call(E, e) || !S.call(A, e) && (C.test(e) ? E[e] = !0 : (A[e] = !0, !1));
    }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = null === n ? 3 !== a.type && "" : n : (t = a.attributeName, 
    r = a.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (a = a.type) || 4 === a && !0 === n ? "" : "" + n, 
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e) {
    var t = e.replace(P, T);
    N[t] = new j(t, 1, !1, e, null, !1, !1);
  })), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e) {
    var t = e.replace(P, T);
    N[t] = new j(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  })), [ "xml:base", "xml:lang", "xml:space" ].forEach((function(e) {
    var t = e.replace(P, T);
    N[t] = new j(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  })), [ "tabIndex", "crossOrigin" ].forEach((function(e) {
    N[e] = new j(e, 1, !1, e.toLowerCase(), null, !1, !1);
  })), N.xlinkHref = new j("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), 
  [ "src", "href", "action", "formAction" ].forEach((function(e) {
    N[e] = new j(e, 1, !1, e.toLowerCase(), null, !0, !0);
  }));
  var z = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, M = Symbol.for("react.element"), L = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), F = Symbol.for("react.profiler"), D = Symbol.for("react.provider"), U = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), W = Symbol.for("react.lazy");
  Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
  var H = Symbol.for("react.offscreen");
  Symbol.for("react.legacy_hidden"), Symbol.for("react.cache"), Symbol.for("react.tracing_marker");
  var q = Symbol.iterator;
  function K(e) {
    return null === e || "object" != typeof e ? null : "function" == typeof (e = q && e[q] || e["@@iterator"]) ? e : null;
  }
  var Y, Q = Object.assign;
  function G(e) {
    if (void 0 === Y) try {
      throw Error();
    } catch (e) {
      var t = e.stack.trim().match(/\n( *(at )?)/);
      Y = t && t[1] || "";
    }
    return "\n" + Y + e;
  }
  var X = !1;
  function J(e, t) {
    if (!e || X) return "";
    X = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", {
        set: function() {
          throw Error();
        }
      }), "object" == typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (e) {
          var r = e;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (e) {
          r = e;
        }
        e.call(t.prototype);
      } else {
        try {
          throw Error();
        } catch (e) {
          r = e;
        }
        e();
      }
    } catch (t) {
      if (t && r && "string" == typeof t.stack) {
        for (var a = t.stack.split("\n"), i = r.stack.split("\n"), o = a.length - 1, s = i.length - 1; 1 <= o && 0 <= s && a[o] !== i[s]; ) s--;
        for (;1 <= o && 0 <= s; o--, s--) if (a[o] !== i[s]) {
          if (1 !== o || 1 !== s) do {
            if (o--, 0 > --s || a[o] !== i[s]) {
              var l = "\n" + a[o].replace(" at new ", " at ");
              return e.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", e.displayName)), 
              l;
            }
          } while (1 <= o && 0 <= s);
          break;
        }
      }
    } finally {
      X = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? G(e) : "";
  }
  function ee(e) {
    switch (e.tag) {
     case 5:
      return G(e.type);

     case 16:
      return G("Lazy");

     case 13:
      return G("Suspense");

     case 19:
      return G("SuspenseList");

     case 0:
     case 2:
     case 15:
      return e = J(e.type, !1);

     case 11:
      return e = J(e.type.render, !1);

     case 1:
      return e = J(e.type, !0);

     default:
      return "";
    }
  }
  function te(e) {
    if (null == e) return null;
    if ("function" == typeof e) return e.displayName || e.name || null;
    if ("string" == typeof e) return e;
    switch (e) {
     case R:
      return "Fragment";

     case L:
      return "Portal";

     case F:
      return "Profiler";

     case I:
      return "StrictMode";

     case B:
      return "Suspense";

     case V:
      return "SuspenseList";
    }
    if ("object" == typeof e) switch (e.$$typeof) {
     case U:
      return (e.displayName || "Context") + ".Consumer";

     case D:
      return (e._context.displayName || "Context") + ".Provider";

     case Z:
      var t = e.render;
      return (e = e.displayName) || (e = "" !== (e = t.displayName || t.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), 
      e;

     case $:
      return null !== (t = e.displayName || null) ? t : te(e.type) || "Memo";

     case W:
      t = e._payload, e = e._init;
      try {
        return te(e(t));
      } catch (e) {}
    }
    return null;
  }
  function ne(e) {
    var t = e.type;
    switch (e.tag) {
     case 24:
      return "Cache";

     case 9:
      return (t.displayName || "Context") + ".Consumer";

     case 10:
      return (t._context.displayName || "Context") + ".Provider";

     case 18:
      return "DehydratedFragment";

     case 11:
      return e = (e = t.render).displayName || e.name || "", t.displayName || ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef");

     case 7:
      return "Fragment";

     case 5:
      return t;

     case 4:
      return "Portal";

     case 3:
      return "Root";

     case 6:
      return "Text";

     case 16:
      return te(t);

     case 8:
      return t === I ? "StrictMode" : "Mode";

     case 22:
      return "Offscreen";

     case 12:
      return "Profiler";

     case 21:
      return "Scope";

     case 13:
      return "Suspense";

     case 19:
      return "SuspenseList";

     case 25:
      return "TracingMarker";

     case 1:
     case 0:
     case 17:
     case 2:
     case 14:
     case 15:
      if ("function" == typeof t) return t.displayName || t.name || null;
      if ("string" == typeof t) return t;
    }
    return null;
  }
  function re(e) {
    switch (typeof e) {
     case "boolean":
     case "number":
     case "string":
     case "undefined":
     case "object":
      return e;

     default:
      return "";
    }
  }
  function ae(e) {
    var t = e.type;
    return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t);
  }
  function ie(e) {
    e._valueTracker || (e._valueTracker = function(e) {
      var t = ae(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
      if (!e.hasOwnProperty(t) && void 0 !== n && "function" == typeof n.get && "function" == typeof n.set) {
        var a = n.get, i = n.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return a.call(this);
          },
          set: function(e) {
            r = "" + e, i.call(this, e);
          }
        }), Object.defineProperty(e, t, {
          enumerable: n.enumerable
        }), {
          getValue: function() {
            return r;
          },
          setValue: function(e) {
            r = "" + e;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }(e));
  }
  function oe(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = ae(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), 
    !0);
  }
  function se(e) {
    if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;
    try {
      return e.activeElement || e.body;
    } catch (t) {
      return e.body;
    }
  }
  function le(e, t) {
    var n = t.checked;
    return Q({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: null != n ? n : e._wrapperState.initialChecked
    });
  }
  function ue(e, t) {
    var n = null == t.defaultValue ? "" : t.defaultValue, r = null != t.checked ? t.checked : t.defaultChecked;
    n = re(null != t.value ? t.value : n), e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
    };
  }
  function ce(e, t) {
    null != (t = t.checked) && O(e, "checked", t, !1);
  }
  function de(e, t) {
    ce(e, t);
    var n = re(t.value), r = t.type;
    if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n); else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
    t.hasOwnProperty("value") ? pe(e, t.type, n) : t.hasOwnProperty("defaultValue") && pe(e, t.type, re(t.defaultValue)), 
    null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked);
  }
  function fe(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    "" !== (n = e.name) && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, 
    "" !== n && (e.name = n);
  }
  function pe(e, t, n) {
    "number" === t && se(e.ownerDocument) === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var me = Array.isArray;
  function he(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
      for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), 
      a && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + re(n), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === n) return e[a].selected = !0, void (r && (e[a].defaultSelected = !0));
        null !== t || e[a].disabled || (t = e[a]);
      }
      null !== t && (t.selected = !0);
    }
  }
  function ge(e, t) {
    if (null != t.dangerouslySetInnerHTML) throw Error(b(91));
    return Q({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue
    });
  }
  function ve(e, t) {
    var n = t.value;
    if (null == n) {
      if (n = t.children, t = t.defaultValue, null != n) {
        if (null != t) throw Error(b(92));
        if (me(n)) {
          if (1 < n.length) throw Error(b(93));
          n = n[0];
        }
        t = n;
      }
      null == t && (t = ""), n = t;
    }
    e._wrapperState = {
      initialValue: re(n)
    };
  }
  function be(e, t) {
    var n = re(t.value), r = re(t.defaultValue);
    null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), 
    null != r && (e.defaultValue = "" + r);
  }
  function ye(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t);
  }
  function xe(e) {
    switch (e) {
     case "svg":
      return "http://www.w3.org/2000/svg";

     case "math":
      return "http://www.w3.org/1998/Math/MathML";

     default:
      return "http://www.w3.org/1999/xhtml";
    }
  }
  function ke(e, t) {
    return null == e || "http://www.w3.org/1999/xhtml" === e ? xe(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e;
  }
  var we, _e, Se = (_e = function(e, t) {
    if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e) e.innerHTML = t; else {
      for ((we = we || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", 
      t = we.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (;t.firstChild; ) e.appendChild(t.firstChild);
    }
  }, "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(e, t, n, r) {
    MSApp.execUnsafeLocalFunction((function() {
      return _e(e, t);
    }));
  } : _e);
  function Ce(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
    }
    e.textContent = t;
  }
  var Ae = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Ee = [ "Webkit", "ms", "Moz", "O" ];
  function je(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t ? "" : n || "number" != typeof t || 0 === t || Ae.hasOwnProperty(e) && Ae[e] ? ("" + t).trim() : t + "px";
  }
  function Ne(e, t) {
    for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
      var r = 0 === n.indexOf("--"), a = je(n, t[n], r);
      "float" === n && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a;
    }
  }
  Object.keys(Ae).forEach((function(e) {
    Ee.forEach((function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Ae[t] = Ae[e];
    }));
  }));
  var Pe = Q({
    menuitem: !0
  }, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  });
  function Te(e, t) {
    if (t) {
      if (Pe[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(b(137, e));
      if (null != t.dangerouslySetInnerHTML) {
        if (null != t.children) throw Error(b(60));
        if ("object" != typeof t.dangerouslySetInnerHTML || !("__html" in t.dangerouslySetInnerHTML)) throw Error(b(61));
      }
      if (null != t.style && "object" != typeof t.style) throw Error(b(62));
    }
  }
  function Oe(e, t) {
    if (-1 === e.indexOf("-")) return "string" == typeof t.is;
    switch (e) {
     case "annotation-xml":
     case "color-profile":
     case "font-face":
     case "font-face-src":
     case "font-face-uri":
     case "font-face-format":
     case "font-face-name":
     case "missing-glyph":
      return !1;

     default:
      return !0;
    }
  }
  var ze = null;
  function Me(e) {
    return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 
    3 === e.nodeType ? e.parentNode : e;
  }
  var Le = null, Re = null, Ie = null;
  function Fe(e) {
    if (e = Oa(e)) {
      if ("function" != typeof Le) throw Error(b(280));
      var t = e.stateNode;
      t && (t = Ma(t), Le(e.stateNode, e.type, t));
    }
  }
  function De(e) {
    Re ? Ie ? Ie.push(e) : Ie = [ e ] : Re = e;
  }
  function Ue() {
    if (Re) {
      var e = Re, t = Ie;
      if (Ie = Re = null, Fe(e), t) for (e = 0; e < t.length; e++) Fe(t[e]);
    }
  }
  function Ze(e, t) {
    return e(t);
  }
  function Be() {}
  var Ve = !1;
  function $e(e, t, n) {
    if (Ve) return e(t, n);
    Ve = !0;
    try {
      return Ze(e, t, n);
    } finally {
      Ve = !1, (null !== Re || null !== Ie) && (Be(), Ue());
    }
  }
  function We(e, t) {
    var n = e.stateNode;
    if (null === n) return null;
    var r = Ma(n);
    if (null === r) return null;
    n = r[t];
    e: switch (t) {
     case "onClick":
     case "onClickCapture":
     case "onDoubleClick":
     case "onDoubleClickCapture":
     case "onMouseDown":
     case "onMouseDownCapture":
     case "onMouseMove":
     case "onMouseMoveCapture":
     case "onMouseUp":
     case "onMouseUpCapture":
     case "onMouseEnter":
      (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), 
      e = !r;
      break e;

     default:
      e = !1;
    }
    if (e) return null;
    if (n && "function" != typeof n) throw Error(b(231, t, typeof n));
    return n;
  }
  var He = !1;
  if (_) try {
    var qe = {};
    Object.defineProperty(qe, "passive", {
      get: function() {
        He = !0;
      }
    }), window.addEventListener("test", qe, qe), window.removeEventListener("test", qe, qe);
  } catch (_e) {
    He = !1;
  }
  function Ke(e, t, n, r, a, i, o, s, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (e) {
      this.onError(e);
    }
  }
  var Ye = !1, Qe = null, Ge = !1, Xe = null, Je = {
    onError: function(e) {
      Ye = !0, Qe = e;
    }
  };
  function et(e, t, n, r, a, i, o, s, l) {
    Ye = !1, Qe = null, Ke.apply(Je, arguments);
  }
  function tt(e) {
    var t = e, n = e;
    if (e.alternate) for (;t.return; ) t = t.return; else {
      e = t;
      do {
        0 != (4098 & (t = e).flags) && (n = t.return), e = t.return;
      } while (e);
    }
    return 3 === t.tag ? n : null;
  }
  function nt(e) {
    if (13 === e.tag) {
      var t = e.memoizedState;
      if (null === t && (null !== (e = e.alternate) && (t = e.memoizedState)), null !== t) return t.dehydrated;
    }
    return null;
  }
  function rt(e) {
    if (tt(e) !== e) throw Error(b(188));
  }
  function at(e) {
    return null !== (e = function(e) {
      var t = e.alternate;
      if (!t) {
        if (null === (t = tt(e))) throw Error(b(188));
        return t !== e ? null : e;
      }
      for (var n = e, r = t; ;) {
        var a = n.return;
        if (null === a) break;
        var i = a.alternate;
        if (null === i) {
          if (null !== (r = a.return)) {
            n = r;
            continue;
          }
          break;
        }
        if (a.child === i.child) {
          for (i = a.child; i; ) {
            if (i === n) return rt(a), e;
            if (i === r) return rt(a), t;
            i = i.sibling;
          }
          throw Error(b(188));
        }
        if (n.return !== r.return) n = a, r = i; else {
          for (var o = !1, s = a.child; s; ) {
            if (s === n) {
              o = !0, n = a, r = i;
              break;
            }
            if (s === r) {
              o = !0, r = a, n = i;
              break;
            }
            s = s.sibling;
          }
          if (!o) {
            for (s = i.child; s; ) {
              if (s === n) {
                o = !0, n = i, r = a;
                break;
              }
              if (s === r) {
                o = !0, r = i, n = a;
                break;
              }
              s = s.sibling;
            }
            if (!o) throw Error(b(189));
          }
        }
        if (n.alternate !== r) throw Error(b(190));
      }
      if (3 !== n.tag) throw Error(b(188));
      return n.stateNode.current === n ? e : t;
    }(e)) ? it(e) : null;
  }
  function it(e) {
    if (5 === e.tag || 6 === e.tag) return e;
    for (e = e.child; null !== e; ) {
      var t = it(e);
      if (null !== t) return t;
      e = e.sibling;
    }
    return null;
  }
  var ot = v.unstable_scheduleCallback, st = v.unstable_cancelCallback, lt = v.unstable_shouldYield, ut = v.unstable_requestPaint, ct = v.unstable_now, dt = v.unstable_getCurrentPriorityLevel, ft = v.unstable_ImmediatePriority, pt = v.unstable_UserBlockingPriority, mt = v.unstable_NormalPriority, ht = v.unstable_LowPriority, gt = v.unstable_IdlePriority, vt = null, bt = null;
  var yt = Math.clz32 ? Math.clz32 : function(e) {
    return e >>>= 0, 0 === e ? 32 : 31 - (xt(e) / kt | 0) | 0;
  }, xt = Math.log, kt = Math.LN2;
  var wt = 64, _t = 4194304;
  function St(e) {
    switch (e & -e) {
     case 1:
      return 1;

     case 2:
      return 2;

     case 4:
      return 4;

     case 8:
      return 8;

     case 16:
      return 16;

     case 32:
      return 32;

     case 64:
     case 128:
     case 256:
     case 512:
     case 1024:
     case 2048:
     case 4096:
     case 8192:
     case 16384:
     case 32768:
     case 65536:
     case 131072:
     case 262144:
     case 524288:
     case 1048576:
     case 2097152:
      return 4194240 & e;

     case 4194304:
     case 8388608:
     case 16777216:
     case 33554432:
     case 67108864:
      return 130023424 & e;

     case 134217728:
      return 134217728;

     case 268435456:
      return 268435456;

     case 536870912:
      return 536870912;

     case 1073741824:
      return 1073741824;

     default:
      return e;
    }
  }
  function Ct(e, t) {
    var n = e.pendingLanes;
    if (0 === n) return 0;
    var r = 0, a = e.suspendedLanes, i = e.pingedLanes, o = 268435455 & n;
    if (0 !== o) {
      var s = o & ~a;
      0 !== s ? r = St(s) : 0 !== (i &= o) && (r = St(i));
    } else 0 !== (o = n & ~a) ? r = St(o) : 0 !== i && (r = St(i));
    if (0 === r) return 0;
    if (0 !== t && t !== r && 0 == (t & a) && ((a = r & -r) >= (i = t & -t) || 16 === a && 0 != (4194240 & i))) return t;
    if (0 != (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)) for (e = e.entanglements, 
    t &= r; 0 < t; ) a = 1 << (n = 31 - yt(t)), r |= e[n], t &= ~a;
    return r;
  }
  function At(e, t) {
    switch (e) {
     case 1:
     case 2:
     case 4:
      return t + 250;

     case 8:
     case 16:
     case 32:
     case 64:
     case 128:
     case 256:
     case 512:
     case 1024:
     case 2048:
     case 4096:
     case 8192:
     case 16384:
     case 32768:
     case 65536:
     case 131072:
     case 262144:
     case 524288:
     case 1048576:
     case 2097152:
      return t + 5e3;

     default:
      return -1;
    }
  }
  function Et(e) {
    return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0;
  }
  function jt() {
    var e = wt;
    return 0 == (4194240 & (wt <<= 1)) && (wt = 64), e;
  }
  function Nt(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Pt(e, t, n) {
    e.pendingLanes |= t, 536870912 !== t && (e.suspendedLanes = 0, e.pingedLanes = 0), 
    (e = e.eventTimes)[t = 31 - yt(t)] = n;
  }
  function Tt(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - yt(n), a = 1 << r;
      a & t | e[r] & t && (e[r] |= t), n &= ~a;
    }
  }
  var Ot = 0;
  function zt(e) {
    return 1 < (e &= -e) ? 4 < e ? 0 != (268435455 & e) ? 16 : 536870912 : 4 : 1;
  }
  var Mt, Lt, Rt, It, Ft, Dt = !1, Ut = [], Zt = null, Bt = null, Vt = null, $t = new Map, Wt = new Map, Ht = [], qt = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Kt(e, t) {
    switch (e) {
     case "focusin":
     case "focusout":
      Zt = null;
      break;

     case "dragenter":
     case "dragleave":
      Bt = null;
      break;

     case "mouseover":
     case "mouseout":
      Vt = null;
      break;

     case "pointerover":
     case "pointerout":
      $t.delete(t.pointerId);
      break;

     case "gotpointercapture":
     case "lostpointercapture":
      Wt.delete(t.pointerId);
    }
  }
  function Yt(e, t, n, r, a, i) {
    return null === e || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: r,
      nativeEvent: i,
      targetContainers: [ a ]
    }, null !== t && (null !== (t = Oa(t)) && Lt(t)), e) : (e.eventSystemFlags |= r, 
    t = e.targetContainers, null !== a && -1 === t.indexOf(a) && t.push(a), e);
  }
  function Qt(e) {
    var t = Ta(e.target);
    if (null !== t) {
      var n = tt(t);
      if (null !== n) if (13 === (t = n.tag)) {
        if (null !== (t = nt(n))) return e.blockedOn = t, void Ft(e.priority, (function() {
          Rt(n);
        }));
      } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated) return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
    }
    e.blockedOn = null;
  }
  function Gt(e) {
    if (null !== e.blockedOn) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = un(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (null !== n) return null !== (t = Oa(n)) && Lt(t), e.blockedOn = n, !1;
      var r = new (n = e.nativeEvent).constructor(n.type, n);
      ze = r, n.target.dispatchEvent(r), ze = null, t.shift();
    }
    return !0;
  }
  function Xt(e, t, n) {
    Gt(e) && n.delete(t);
  }
  function Jt() {
    Dt = !1, null !== Zt && Gt(Zt) && (Zt = null), null !== Bt && Gt(Bt) && (Bt = null), 
    null !== Vt && Gt(Vt) && (Vt = null), $t.forEach(Xt), Wt.forEach(Xt);
  }
  function en(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Dt || (Dt = !0, v.unstable_scheduleCallback(v.unstable_NormalPriority, Jt)));
  }
  function tn(e) {
    function t(t) {
      return en(t, e);
    }
    if (0 < Ut.length) {
      en(Ut[0], e);
      for (var n = 1; n < Ut.length; n++) {
        var r = Ut[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (null !== Zt && en(Zt, e), null !== Bt && en(Bt, e), null !== Vt && en(Vt, e), 
    $t.forEach(t), Wt.forEach(t), n = 0; n < Ht.length; n++) (r = Ht[n]).blockedOn === e && (r.blockedOn = null);
    for (;0 < Ht.length && null === (n = Ht[0]).blockedOn; ) Qt(n), null === n.blockedOn && Ht.shift();
  }
  var nn = z.ReactCurrentBatchConfig, rn = !0;
  function an(e, t, n, r) {
    var a = Ot, i = nn.transition;
    nn.transition = null;
    try {
      Ot = 1, sn(e, t, n, r);
    } finally {
      Ot = a, nn.transition = i;
    }
  }
  function on(e, t, n, r) {
    var a = Ot, i = nn.transition;
    nn.transition = null;
    try {
      Ot = 4, sn(e, t, n, r);
    } finally {
      Ot = a, nn.transition = i;
    }
  }
  function sn(e, t, n, r) {
    if (rn) {
      var a = un(e, t, n, r);
      if (null === a) ra(e, t, r, ln, n), Kt(e, r); else if (function(e, t, n, r, a) {
        switch (t) {
         case "focusin":
          return Zt = Yt(Zt, e, t, n, r, a), !0;

         case "dragenter":
          return Bt = Yt(Bt, e, t, n, r, a), !0;

         case "mouseover":
          return Vt = Yt(Vt, e, t, n, r, a), !0;

         case "pointerover":
          var i = a.pointerId;
          return $t.set(i, Yt($t.get(i) || null, e, t, n, r, a)), !0;

         case "gotpointercapture":
          return i = a.pointerId, Wt.set(i, Yt(Wt.get(i) || null, e, t, n, r, a)), !0;
        }
        return !1;
      }(a, e, t, n, r)) r.stopPropagation(); else if (Kt(e, r), 4 & t && -1 < qt.indexOf(e)) {
        for (;null !== a; ) {
          var i = Oa(a);
          if (null !== i && Mt(i), null === (i = un(e, t, n, r)) && ra(e, t, r, ln, n), i === a) break;
          a = i;
        }
        null !== a && r.stopPropagation();
      } else ra(e, t, r, null, n);
    }
  }
  var ln = null;
  function un(e, t, n, r) {
    if (ln = null, null !== (e = Ta(e = Me(r)))) if (null === (t = tt(e))) e = null; else if (13 === (n = t.tag)) {
      if (null !== (e = nt(t))) return e;
      e = null;
    } else if (3 === n) {
      if (t.stateNode.current.memoizedState.isDehydrated) return 3 === t.tag ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return ln = e, null;
  }
  function cn(e) {
    switch (e) {
     case "cancel":
     case "click":
     case "close":
     case "contextmenu":
     case "copy":
     case "cut":
     case "auxclick":
     case "dblclick":
     case "dragend":
     case "dragstart":
     case "drop":
     case "focusin":
     case "focusout":
     case "input":
     case "invalid":
     case "keydown":
     case "keypress":
     case "keyup":
     case "mousedown":
     case "mouseup":
     case "paste":
     case "pause":
     case "play":
     case "pointercancel":
     case "pointerdown":
     case "pointerup":
     case "ratechange":
     case "reset":
     case "resize":
     case "seeked":
     case "submit":
     case "touchcancel":
     case "touchend":
     case "touchstart":
     case "volumechange":
     case "change":
     case "selectionchange":
     case "textInput":
     case "compositionstart":
     case "compositionend":
     case "compositionupdate":
     case "beforeblur":
     case "afterblur":
     case "beforeinput":
     case "blur":
     case "fullscreenchange":
     case "focus":
     case "hashchange":
     case "popstate":
     case "select":
     case "selectstart":
      return 1;

     case "drag":
     case "dragenter":
     case "dragexit":
     case "dragleave":
     case "dragover":
     case "mousemove":
     case "mouseout":
     case "mouseover":
     case "pointermove":
     case "pointerout":
     case "pointerover":
     case "scroll":
     case "toggle":
     case "touchmove":
     case "wheel":
     case "mouseenter":
     case "mouseleave":
     case "pointerenter":
     case "pointerleave":
      return 4;

     case "message":
      switch (dt()) {
       case ft:
        return 1;

       case pt:
        return 4;

       case mt:
       case ht:
        return 16;

       case gt:
        return 536870912;

       default:
        return 16;
      }

     default:
      return 16;
    }
  }
  var dn = null, fn = null, pn = null;
  function mn() {
    if (pn) return pn;
    var e, t, n = fn, r = n.length, a = "value" in dn ? dn.value : dn.textContent, i = a.length;
    for (e = 0; e < r && n[e] === a[e]; e++) ;
    var o = r - e;
    for (t = 1; t <= o && n[r - t] === a[i - t]; t++) ;
    return pn = a.slice(e, 1 < t ? 1 - t : void 0);
  }
  function hn(e) {
    var t = e.keyCode;
    return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 
    10 === e && (e = 13), 32 <= e || 13 === e ? e : 0;
  }
  function gn() {
    return !0;
  }
  function vn() {
    return !1;
  }
  function bn(e) {
    function t(t, n, r, a, i) {
      for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = a, 
      this.target = i, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], 
      this[o] = t ? t(a) : a[o]);
      return this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue) ? gn : vn, 
      this.isPropagationStopped = vn, this;
    }
    return Q(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), 
        this.isDefaultPrevented = gn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), 
        this.isPropagationStopped = gn);
      },
      persist: function() {},
      isPersistent: gn
    }), t;
  }
  var yn, xn, kn, wn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, _n = bn(wn), Sn = Q({}, wn, {
    view: 0,
    detail: 0
  }), Cn = bn(Sn), An = Q({}, Sn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Fn,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== kn && (kn && "mousemove" === e.type ? (yn = e.screenX - kn.screenX, 
      xn = e.screenY - kn.screenY) : xn = yn = 0, kn = e), yn);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : xn;
    }
  }), En = bn(An), jn = bn(Q({}, An, {
    dataTransfer: 0
  })), Nn = bn(Q({}, Sn, {
    relatedTarget: 0
  })), Pn = bn(Q({}, wn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  })), Tn = Q({}, wn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), On = bn(Tn), zn = bn(Q({}, wn, {
    data: 0
  })), Mn = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Ln = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Rn = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function In(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : !!(e = Rn[e]) && !!t[e];
  }
  function Fn() {
    return In;
  }
  var Dn = Q({}, Sn, {
    key: function(e) {
      if (e.key) {
        var t = Mn[e.key] || e.key;
        if ("Unidentified" !== t) return t;
      }
      return "keypress" === e.type ? 13 === (e = hn(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? Ln[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fn,
    charCode: function(e) {
      return "keypress" === e.type ? hn(e) : 0;
    },
    keyCode: function(e) {
      return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
    },
    which: function(e) {
      return "keypress" === e.type ? hn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
    }
  }), Un = bn(Dn), Zn = bn(Q({}, An, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  })), Bn = bn(Q({}, Sn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fn
  })), Vn = bn(Q({}, wn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  })), $n = Q({}, An, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Wn = bn($n), Hn = [ 9, 13, 27, 32 ], qn = _ && "CompositionEvent" in window, Kn = null;
  _ && "documentMode" in document && (Kn = document.documentMode);
  var Yn = _ && "TextEvent" in window && !Kn, Qn = _ && (!qn || Kn && 8 < Kn && 11 >= Kn), Gn = String.fromCharCode(32), Xn = !1;
  function Jn(e, t) {
    switch (e) {
     case "keyup":
      return -1 !== Hn.indexOf(t.keyCode);

     case "keydown":
      return 229 !== t.keyCode;

     case "keypress":
     case "mousedown":
     case "focusout":
      return !0;

     default:
      return !1;
    }
  }
  function er(e) {
    return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
  }
  var tr = !1;
  var nr = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function rr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === t ? !!nr[e.type] : "textarea" === t;
  }
  function ar(e, t, n, r) {
    De(r), 0 < (t = ia(t, "onChange")).length && (n = new _n("onChange", "change", null, n, r), 
    e.push({
      event: n,
      listeners: t
    }));
  }
  var ir = null, or = null;
  function sr(e) {
    Gr(e, 0);
  }
  function lr(e) {
    if (oe(za(e))) return e;
  }
  function ur(e, t) {
    if ("change" === e) return t;
  }
  var cr = !1;
  if (_) {
    var dr;
    if (_) {
      var fr = "oninput" in document;
      if (!fr) {
        var pr = document.createElement("div");
        pr.setAttribute("oninput", "return;"), fr = "function" == typeof pr.oninput;
      }
      dr = fr;
    } else dr = !1;
    cr = dr && (!document.documentMode || 9 < document.documentMode);
  }
  function mr() {
    ir && (ir.detachEvent("onpropertychange", hr), or = ir = null);
  }
  function hr(e) {
    if ("value" === e.propertyName && lr(or)) {
      var t = [];
      ar(t, or, e, Me(e)), $e(sr, t);
    }
  }
  function gr(e, t, n) {
    "focusin" === e ? (mr(), or = n, (ir = t).attachEvent("onpropertychange", hr)) : "focusout" === e && mr();
  }
  function vr(e) {
    if ("selectionchange" === e || "keyup" === e || "keydown" === e) return lr(or);
  }
  function br(e, t) {
    if ("click" === e) return lr(t);
  }
  function yr(e, t) {
    if ("input" === e || "change" === e) return lr(t);
  }
  var xr = "function" == typeof Object.is ? Object.is : function(e, t) {
    return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t;
  };
  function kr(e, t) {
    if (xr(e, t)) return !0;
    if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var a = n[r];
      if (!S.call(t, a) || !xr(e[a], t[a])) return !1;
    }
    return !0;
  }
  function wr(e) {
    for (;e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function _r(e, t) {
    var n, r = wr(e);
    for (e = 0; r; ) {
      if (3 === r.nodeType) {
        if (n = e + r.textContent.length, e <= t && n >= t) return {
          node: r,
          offset: t - e
        };
        e = n;
      }
      e: {
        for (;r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = wr(r);
    }
  }
  function Sr(e, t) {
    return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? Sr(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))));
  }
  function Cr() {
    for (var e = window, t = se(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = "string" == typeof t.contentWindow.location.href;
      } catch (e) {
        n = !1;
      }
      if (!n) break;
      t = se((e = t.contentWindow).document);
    }
    return t;
  }
  function Ar(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable);
  }
  function Er(e) {
    var t = Cr(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Sr(n.ownerDocument.documentElement, n)) {
      if (null !== r && Ar(n)) if (t = r.start, void 0 === (e = r.end) && (e = t), "selectionStart" in n) n.selectionStart = t, 
      n.selectionEnd = Math.min(e, n.value.length); else if ((e = (t = n.ownerDocument || document) && t.defaultView || window).getSelection) {
        e = e.getSelection();
        var a = n.textContent.length, i = Math.min(r.start, a);
        r = void 0 === r.end ? i : Math.min(r.end, a), !e.extend && i > r && (a = r, r = i, 
        i = a), a = _r(n, i);
        var o = _r(n, r);
        a && o && (1 !== e.rangeCount || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && ((t = t.createRange()).setStart(a.node, a.offset), 
        e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), 
        e.addRange(t)));
      }
      for (t = [], e = n; e = e.parentNode; ) 1 === e.nodeType && t.push({
        element: e,
        left: e.scrollLeft,
        top: e.scrollTop
      });
      for ("function" == typeof n.focus && n.focus(), n = 0; n < t.length; n++) (e = t[n]).element.scrollLeft = e.left, 
      e.element.scrollTop = e.top;
    }
  }
  var jr = _ && "documentMode" in document && 11 >= document.documentMode, Nr = null, Pr = null, Tr = null, Or = !1;
  function zr(e, t, n) {
    var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
    Or || null == Nr || Nr !== se(r) || ("selectionStart" in (r = Nr) && Ar(r) ? r = {
      start: r.selectionStart,
      end: r.selectionEnd
    } : r = {
      anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }, Tr && kr(Tr, r) || (Tr = r, 0 < (r = ia(Pr, "onSelect")).length && (t = new _n("onSelect", "select", null, t, n), 
    e.push({
      event: t,
      listeners: r
    }), t.target = Nr)));
  }
  function Mr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, 
    n;
  }
  var Lr = {
    animationend: Mr("Animation", "AnimationEnd"),
    animationiteration: Mr("Animation", "AnimationIteration"),
    animationstart: Mr("Animation", "AnimationStart"),
    transitionend: Mr("Transition", "TransitionEnd")
  }, Rr = {}, Ir = {};
  function Fr(e) {
    if (Rr[e]) return Rr[e];
    if (!Lr[e]) return e;
    var t, n = Lr[e];
    for (t in n) if (n.hasOwnProperty(t) && t in Ir) return Rr[e] = n[t];
    return e;
  }
  _ && (Ir = document.createElement("div").style, "AnimationEvent" in window || (delete Lr.animationend.animation, 
  delete Lr.animationiteration.animation, delete Lr.animationstart.animation), "TransitionEvent" in window || delete Lr.transitionend.transition);
  var Dr = Fr("animationend"), Ur = Fr("animationiteration"), Zr = Fr("animationstart"), Br = Fr("transitionend"), Vr = new Map, $r = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Wr(e, t) {
    Vr.set(e, t), k(t, [ e ]);
  }
  for (var Hr = 0; Hr < $r.length; Hr++) {
    var qr = $r[Hr];
    Wr(qr.toLowerCase(), "on" + (qr[0].toUpperCase() + qr.slice(1)));
  }
  Wr(Dr, "onAnimationEnd"), Wr(Ur, "onAnimationIteration"), Wr(Zr, "onAnimationStart"), 
  Wr("dblclick", "onDoubleClick"), Wr("focusin", "onFocus"), Wr("focusout", "onBlur"), 
  Wr(Br, "onTransitionEnd"), w("onMouseEnter", [ "mouseout", "mouseover" ]), w("onMouseLeave", [ "mouseout", "mouseover" ]), 
  w("onPointerEnter", [ "pointerout", "pointerover" ]), w("onPointerLeave", [ "pointerout", "pointerover" ]), 
  k("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), 
  k("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), 
  k("onBeforeInput", [ "compositionend", "keypress", "textInput", "paste" ]), k("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), 
  k("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), 
  k("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Kr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Yr = new Set("cancel close invalid load scroll toggle".split(" ").concat(Kr));
  function Qr(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, function(e, t, n, r, a, i, o, s, l) {
      if (et.apply(this, arguments), Ye) {
        if (!Ye) throw Error(b(198));
        var u = Qe;
        Ye = !1, Qe = null, Ge || (Ge = !0, Xe = u);
      }
    }(r, t, void 0, e), e.currentTarget = null;
  }
  function Gr(e, t) {
    t = 0 != (4 & t);
    for (var n = 0; n < e.length; n++) {
      var r = e[n], a = r.event;
      r = r.listeners;
      e: {
        var i = void 0;
        if (t) for (var o = r.length - 1; 0 <= o; o--) {
          var s = r[o], l = s.instance, u = s.currentTarget;
          if (s = s.listener, l !== i && a.isPropagationStopped()) break e;
          Qr(a, s, u), i = l;
        } else for (o = 0; o < r.length; o++) {
          if (l = (s = r[o]).instance, u = s.currentTarget, s = s.listener, l !== i && a.isPropagationStopped()) break e;
          Qr(a, s, u), i = l;
        }
      }
    }
    if (Ge) throw e = Xe, Ge = !1, Xe = null, e;
  }
  function Xr(e, t) {
    var n = t[ja];
    void 0 === n && (n = t[ja] = new Set);
    var r = e + "__bubble";
    n.has(r) || (na(t, e, 2, !1), n.add(r));
  }
  function Jr(e, t, n) {
    var r = 0;
    t && (r |= 4), na(n, e, r, t);
  }
  var ea = "_reactListening" + Math.random().toString(36).slice(2);
  function ta(e) {
    if (!e[ea]) {
      e[ea] = !0, y.forEach((function(t) {
        "selectionchange" !== t && (Yr.has(t) || Jr(t, !1, e), Jr(t, !0, e));
      }));
      var t = 9 === e.nodeType ? e : e.ownerDocument;
      null === t || t[ea] || (t[ea] = !0, Jr("selectionchange", !1, t));
    }
  }
  function na(e, t, n, r) {
    switch (cn(t)) {
     case 1:
      var a = an;
      break;

     case 4:
      a = on;
      break;

     default:
      a = sn;
    }
    n = a.bind(null, t, n, e), a = void 0, !He || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (a = !0), 
    r ? void 0 !== a ? e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }) : e.addEventListener(t, n, !0) : void 0 !== a ? e.addEventListener(t, n, {
      passive: a
    }) : e.addEventListener(t, n, !1);
  }
  function ra(e, t, n, r, a) {
    var i = r;
    if (0 == (1 & t) && 0 == (2 & t) && null !== r) e: for (;;) {
      if (null === r) return;
      var o = r.tag;
      if (3 === o || 4 === o) {
        var s = r.stateNode.containerInfo;
        if (s === a || 8 === s.nodeType && s.parentNode === a) break;
        if (4 === o) for (o = r.return; null !== o; ) {
          var l = o.tag;
          if ((3 === l || 4 === l) && ((l = o.stateNode.containerInfo) === a || 8 === l.nodeType && l.parentNode === a)) return;
          o = o.return;
        }
        for (;null !== s; ) {
          if (null === (o = Ta(s))) return;
          if (5 === (l = o.tag) || 6 === l) {
            r = i = o;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
    $e((function() {
      var r = i, a = Me(n), o = [];
      e: {
        var s = Vr.get(e);
        if (void 0 !== s) {
          var l = _n, u = e;
          switch (e) {
           case "keypress":
            if (0 === hn(n)) break e;

           case "keydown":
           case "keyup":
            l = Un;
            break;

           case "focusin":
            u = "focus", l = Nn;
            break;

           case "focusout":
            u = "blur", l = Nn;
            break;

           case "beforeblur":
           case "afterblur":
            l = Nn;
            break;

           case "click":
            if (2 === n.button) break e;

           case "auxclick":
           case "dblclick":
           case "mousedown":
           case "mousemove":
           case "mouseup":
           case "mouseout":
           case "mouseover":
           case "contextmenu":
            l = En;
            break;

           case "drag":
           case "dragend":
           case "dragenter":
           case "dragexit":
           case "dragleave":
           case "dragover":
           case "dragstart":
           case "drop":
            l = jn;
            break;

           case "touchcancel":
           case "touchend":
           case "touchmove":
           case "touchstart":
            l = Bn;
            break;

           case Dr:
           case Ur:
           case Zr:
            l = Pn;
            break;

           case Br:
            l = Vn;
            break;

           case "scroll":
            l = Cn;
            break;

           case "wheel":
            l = Wn;
            break;

           case "copy":
           case "cut":
           case "paste":
            l = On;
            break;

           case "gotpointercapture":
           case "lostpointercapture":
           case "pointercancel":
           case "pointerdown":
           case "pointermove":
           case "pointerout":
           case "pointerover":
           case "pointerup":
            l = Zn;
          }
          var c = 0 != (4 & t), d = !c && "scroll" === e, f = c ? null !== s ? s + "Capture" : null : s;
          c = [];
          for (var p, m = r; null !== m; ) {
            var h = (p = m).stateNode;
            if (5 === p.tag && null !== h && (p = h, null !== f && (null != (h = We(m, f)) && c.push(aa(m, h, p)))), 
            d) break;
            m = m.return;
          }
          0 < c.length && (s = new l(s, u, null, n, a), o.push({
            event: s,
            listeners: c
          }));
        }
      }
      if (0 == (7 & t)) {
        if (l = "mouseout" === e || "pointerout" === e, (!(s = "mouseover" === e || "pointerover" === e) || n === ze || !(u = n.relatedTarget || n.fromElement) || !Ta(u) && !u[Ea]) && (l || s) && (s = a.window === a ? a : (s = a.ownerDocument) ? s.defaultView || s.parentWindow : window, 
        l ? (l = r, null !== (u = (u = n.relatedTarget || n.toElement) ? Ta(u) : null) && (u !== (d = tt(u)) || 5 !== u.tag && 6 !== u.tag) && (u = null)) : (l = null, 
        u = r), l !== u)) {
          if (c = En, h = "onMouseLeave", f = "onMouseEnter", m = "mouse", "pointerout" !== e && "pointerover" !== e || (c = Zn, 
          h = "onPointerLeave", f = "onPointerEnter", m = "pointer"), d = null == l ? s : za(l), 
          p = null == u ? s : za(u), (s = new c(h, m + "leave", l, n, a)).target = d, s.relatedTarget = p, 
          h = null, Ta(a) === r && ((c = new c(f, m + "enter", u, n, a)).target = p, c.relatedTarget = d, 
          h = c), d = h, l && u) e: {
            for (f = u, m = 0, p = c = l; p; p = oa(p)) m++;
            for (p = 0, h = f; h; h = oa(h)) p++;
            for (;0 < m - p; ) c = oa(c), m--;
            for (;0 < p - m; ) f = oa(f), p--;
            for (;m--; ) {
              if (c === f || null !== f && c === f.alternate) break e;
              c = oa(c), f = oa(f);
            }
            c = null;
          } else c = null;
          null !== l && sa(o, s, l, c, !1), null !== u && null !== d && sa(o, d, u, c, !0);
        }
        if ("select" === (l = (s = r ? za(r) : window).nodeName && s.nodeName.toLowerCase()) || "input" === l && "file" === s.type) var g = ur; else if (rr(s)) if (cr) g = yr; else {
          g = vr;
          var v = gr;
        } else (l = s.nodeName) && "input" === l.toLowerCase() && ("checkbox" === s.type || "radio" === s.type) && (g = br);
        switch (g && (g = g(e, r)) ? ar(o, g, n, a) : (v && v(e, s, r), "focusout" === e && (v = s._wrapperState) && v.controlled && "number" === s.type && pe(s, "number", s.value)), 
        v = r ? za(r) : window, e) {
         case "focusin":
          (rr(v) || "true" === v.contentEditable) && (Nr = v, Pr = r, Tr = null);
          break;

         case "focusout":
          Tr = Pr = Nr = null;
          break;

         case "mousedown":
          Or = !0;
          break;

         case "contextmenu":
         case "mouseup":
         case "dragend":
          Or = !1, zr(o, n, a);
          break;

         case "selectionchange":
          if (jr) break;

         case "keydown":
         case "keyup":
          zr(o, n, a);
        }
        var b;
        if (qn) e: {
          switch (e) {
           case "compositionstart":
            var y = "onCompositionStart";
            break e;

           case "compositionend":
            y = "onCompositionEnd";
            break e;

           case "compositionupdate":
            y = "onCompositionUpdate";
            break e;
          }
          y = void 0;
        } else tr ? Jn(e, n) && (y = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (y = "onCompositionStart");
        y && (Qn && "ko" !== n.locale && (tr || "onCompositionStart" !== y ? "onCompositionEnd" === y && tr && (b = mn()) : (fn = "value" in (dn = a) ? dn.value : dn.textContent, 
        tr = !0)), 0 < (v = ia(r, y)).length && (y = new zn(y, e, null, n, a), o.push({
          event: y,
          listeners: v
        }), b ? y.data = b : null !== (b = er(n)) && (y.data = b))), (b = Yn ? function(e, t) {
          switch (e) {
           case "compositionend":
            return er(t);

           case "keypress":
            return 32 !== t.which ? null : (Xn = !0, Gn);

           case "textInput":
            return (e = t.data) === Gn && Xn ? null : e;

           default:
            return null;
          }
        }(e, n) : function(e, t) {
          if (tr) return "compositionend" === e || !qn && Jn(e, t) ? (e = mn(), pn = fn = dn = null, 
          tr = !1, e) : null;
          switch (e) {
           case "paste":
           default:
            return null;

           case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
              if (t.char && 1 < t.char.length) return t.char;
              if (t.which) return String.fromCharCode(t.which);
            }
            return null;

           case "compositionend":
            return Qn && "ko" !== t.locale ? null : t.data;
          }
        }(e, n)) && (0 < (r = ia(r, "onBeforeInput")).length && (a = new zn("onBeforeInput", "beforeinput", null, n, a), 
        o.push({
          event: a,
          listeners: r
        }), a.data = b));
      }
      Gr(o, t);
    }));
  }
  function aa(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function ia(e, t) {
    for (var n = t + "Capture", r = []; null !== e; ) {
      var a = e, i = a.stateNode;
      5 === a.tag && null !== i && (a = i, null != (i = We(e, n)) && r.unshift(aa(e, i, a)), 
      null != (i = We(e, t)) && r.push(aa(e, i, a))), e = e.return;
    }
    return r;
  }
  function oa(e) {
    if (null === e) return null;
    do {
      e = e.return;
    } while (e && 5 !== e.tag);
    return e || null;
  }
  function sa(e, t, n, r, a) {
    for (var i = t._reactName, o = []; null !== n && n !== r; ) {
      var s = n, l = s.alternate, u = s.stateNode;
      if (null !== l && l === r) break;
      5 === s.tag && null !== u && (s = u, a ? null != (l = We(n, i)) && o.unshift(aa(n, l, s)) : a || null != (l = We(n, i)) && o.push(aa(n, l, s))), 
      n = n.return;
    }
    0 !== o.length && e.push({
      event: t,
      listeners: o
    });
  }
  var la = /\r\n?/g, ua = /\u0000|\uFFFD/g;
  function ca(e) {
    return ("string" == typeof e ? e : "" + e).replace(la, "\n").replace(ua, "");
  }
  function da(e, t, n) {
    if (t = ca(t), ca(e) !== t && n) throw Error(b(425));
  }
  function fa() {}
  var pa = null, ma = null;
  function ha(e, t) {
    return "textarea" === e || "noscript" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html;
  }
  var ga = "function" == typeof setTimeout ? setTimeout : void 0, va = "function" == typeof clearTimeout ? clearTimeout : void 0, ba = "function" == typeof Promise ? Promise : void 0, ya = "function" == typeof queueMicrotask ? queueMicrotask : void 0 !== ba ? function(e) {
    return ba.resolve(null).then(e).catch(xa);
  } : ga;
  function xa(e) {
    setTimeout((function() {
      throw e;
    }));
  }
  function ka(e, t) {
    var n = t, r = 0;
    do {
      var a = n.nextSibling;
      if (e.removeChild(n), a && 8 === a.nodeType) if ("/$" === (n = a.data)) {
        if (0 === r) return e.removeChild(a), void tn(t);
        r--;
      } else "$" !== n && "$?" !== n && "$!" !== n || r++;
      n = a;
    } while (n);
    tn(t);
  }
  function wa(e) {
    for (;null != e; e = e.nextSibling) {
      var t = e.nodeType;
      if (1 === t || 3 === t) break;
      if (8 === t) {
        if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
        if ("/$" === t) return null;
      }
    }
    return e;
  }
  function _a(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (8 === e.nodeType) {
        var n = e.data;
        if ("$" === n || "$!" === n || "$?" === n) {
          if (0 === t) return e;
          t--;
        } else "/$" === n && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Sa = Math.random().toString(36).slice(2), Ca = "__reactFiber$" + Sa, Aa = "__reactProps$" + Sa, Ea = "__reactContainer$" + Sa, ja = "__reactEvents$" + Sa, Na = "__reactListeners$" + Sa, Pa = "__reactHandles$" + Sa;
  function Ta(e) {
    var t = e[Ca];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Ea] || n[Ca]) {
        if (n = t.alternate, null !== t.child || null !== n && null !== n.child) for (e = _a(e); null !== e; ) {
          if (n = e[Ca]) return n;
          e = _a(e);
        }
        return t;
      }
      n = (e = n).parentNode;
    }
    return null;
  }
  function Oa(e) {
    return !(e = e[Ca] || e[Ea]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e;
  }
  function za(e) {
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw Error(b(33));
  }
  function Ma(e) {
    return e[Aa] || null;
  }
  var La = [], Ra = -1;
  function Ia(e) {
    return {
      current: e
    };
  }
  function Fa(e) {
    0 > Ra || (e.current = La[Ra], La[Ra] = null, Ra--);
  }
  function Da(e, t) {
    Ra++, La[Ra] = e.current, e.current = t;
  }
  var Ua = {}, Za = Ia(Ua), Ba = Ia(!1), Va = Ua;
  function $a(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Ua;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var a, i = {};
    for (a in n) i[a] = t[a];
    return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, 
    e.__reactInternalMemoizedMaskedChildContext = i), i;
  }
  function Wa(e) {
    return null != (e = e.childContextTypes);
  }
  function Ha() {
    Fa(Ba), Fa(Za);
  }
  function qa(e, t, n) {
    if (Za.current !== Ua) throw Error(b(168));
    Da(Za, t), Da(Ba, n);
  }
  function Ka(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, "function" != typeof r.getChildContext) return n;
    for (var a in r = r.getChildContext()) if (!(a in t)) throw Error(b(108, ne(e) || "Unknown", a));
    return Q({}, n, r);
  }
  function Ya(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ua, 
    Va = Za.current, Da(Za, e), Da(Ba, Ba.current), !0;
  }
  function Qa(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(b(169));
    n ? (e = Ka(e, t, Va), r.__reactInternalMemoizedMergedChildContext = e, Fa(Ba), 
    Fa(Za), Da(Za, e)) : Fa(Ba), Da(Ba, n);
  }
  var Ga = null, Xa = !1, Ja = !1;
  function ei(e) {
    null === Ga ? Ga = [ e ] : Ga.push(e);
  }
  function ti() {
    if (!Ja && null !== Ga) {
      Ja = !0;
      var e = 0, t = Ot;
      try {
        var n = Ga;
        for (Ot = 1; e < n.length; e++) {
          var r = n[e];
          do {
            r = r(!0);
          } while (null !== r);
        }
        Ga = null, Xa = !1;
      } catch (t) {
        throw null !== Ga && (Ga = Ga.slice(e + 1)), ot(ft, ti), t;
      } finally {
        Ot = t, Ja = !1;
      }
    }
    return null;
  }
  var ni = [], ri = 0, ai = null, ii = 0, oi = [], si = 0, li = null, ui = 1, ci = "";
  function di(e, t) {
    ni[ri++] = ii, ni[ri++] = ai, ai = e, ii = t;
  }
  function fi(e, t, n) {
    oi[si++] = ui, oi[si++] = ci, oi[si++] = li, li = e;
    var r = ui;
    e = ci;
    var a = 32 - yt(r) - 1;
    r &= ~(1 << a), n += 1;
    var i = 32 - yt(t) + a;
    if (30 < i) {
      var o = a - a % 5;
      i = (r & (1 << o) - 1).toString(32), r >>= o, a -= o, ui = 1 << 32 - yt(t) + a | n << a | r, 
      ci = i + e;
    } else ui = 1 << i | n << a | r, ci = e;
  }
  function pi(e) {
    null !== e.return && (di(e, 1), fi(e, 1, 0));
  }
  function mi(e) {
    for (;e === ai; ) ai = ni[--ri], ni[ri] = null, ii = ni[--ri], ni[ri] = null;
    for (;e === li; ) li = oi[--si], oi[si] = null, ci = oi[--si], oi[si] = null, ui = oi[--si], 
    oi[si] = null;
  }
  var hi = null, gi = null, vi = !1, bi = null;
  function yi(e, t) {
    var n = $u(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, null === (t = e.deletions) ? (e.deletions = [ n ], 
    e.flags |= 16) : t.push(n);
  }
  function xi(e, t) {
    switch (e.tag) {
     case 5:
      var n = e.type;
      return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, 
      hi = e, gi = wa(t.firstChild), !0);

     case 6:
      return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, 
      hi = e, gi = null, !0);

     case 13:
      return null !== (t = 8 !== t.nodeType ? null : t) && (n = null !== li ? {
        id: ui,
        overflow: ci
      } : null, e.memoizedState = {
        dehydrated: t,
        treeContext: n,
        retryLane: 1073741824
      }, (n = $u(18, null, null, 0)).stateNode = t, n.return = e, e.child = n, hi = e, 
      gi = null, !0);

     default:
      return !1;
    }
  }
  function ki(e) {
    return 0 != (1 & e.mode) && 0 == (128 & e.flags);
  }
  function wi(e) {
    if (vi) {
      var t = gi;
      if (t) {
        var n = t;
        if (!xi(e, t)) {
          if (ki(e)) throw Error(b(418));
          t = wa(n.nextSibling);
          var r = hi;
          t && xi(e, t) ? yi(r, n) : (e.flags = -4097 & e.flags | 2, vi = !1, hi = e);
        }
      } else {
        if (ki(e)) throw Error(b(418));
        e.flags = -4097 & e.flags | 2, vi = !1, hi = e;
      }
    }
  }
  function _i(e) {
    for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag; ) e = e.return;
    hi = e;
  }
  function Si(e) {
    if (e !== hi) return !1;
    if (!vi) return _i(e), vi = !0, !1;
    var t;
    if ((t = 3 !== e.tag) && !(t = 5 !== e.tag) && (t = "head" !== (t = e.type) && "body" !== t && !ha(e.type, e.memoizedProps)), 
    t && (t = gi)) {
      if (ki(e)) throw Ci(), Error(b(418));
      for (;t; ) yi(e, t), t = wa(t.nextSibling);
    }
    if (_i(e), 13 === e.tag) {
      if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(b(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (8 === e.nodeType) {
            var n = e.data;
            if ("/$" === n) {
              if (0 === t) {
                gi = wa(e.nextSibling);
                break e;
              }
              t--;
            } else "$" !== n && "$!" !== n && "$?" !== n || t++;
          }
          e = e.nextSibling;
        }
        gi = null;
      }
    } else gi = hi ? wa(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ci() {
    for (var e = gi; e; ) e = wa(e.nextSibling);
  }
  function Ai() {
    gi = hi = null, vi = !1;
  }
  function Ei(e) {
    null === bi ? bi = [ e ] : bi.push(e);
  }
  var ji = z.ReactCurrentBatchConfig;
  function Ni(e, t) {
    if (e && e.defaultProps) {
      for (var n in t = Q({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  var Pi = Ia(null), Ti = null, Oi = null, zi = null;
  function Mi() {
    zi = Oi = Ti = null;
  }
  function Li(e) {
    var t = Pi.current;
    Fa(Pi), e._currentValue = t;
  }
  function Ri(e, t, n) {
    for (;null !== e; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, null !== r && (r.childLanes |= t)) : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t), 
      e === n) break;
      e = e.return;
    }
  }
  function Ii(e, t) {
    Ti = e, zi = Oi = null, null !== (e = e.dependencies) && null !== e.firstContext && (0 != (e.lanes & t) && (zs = !0), 
    e.firstContext = null);
  }
  function Fi(e) {
    var t = e._currentValue;
    if (zi !== e) if (e = {
      context: e,
      memoizedValue: t,
      next: null
    }, null === Oi) {
      if (null === Ti) throw Error(b(308));
      Oi = e, Ti.dependencies = {
        lanes: 0,
        firstContext: e
      };
    } else Oi = Oi.next = e;
    return t;
  }
  var Di = null;
  function Ui(e) {
    null === Di ? Di = [ e ] : Di.push(e);
  }
  function Zi(e, t, n, r) {
    var a = t.interleaved;
    return null === a ? (n.next = n, Ui(t)) : (n.next = a.next, a.next = n), t.interleaved = n, 
    Bi(e, r);
  }
  function Bi(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; ) e.childLanes |= t, 
    null !== (n = e.alternate) && (n.childLanes |= t), n = e, e = e.return;
    return 3 === n.tag ? n.stateNode : null;
  }
  var Vi = !1;
  function $i(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: 0
      },
      effects: null
    };
  }
  function Wi(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      effects: e.effects
    });
  }
  function Hi(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function qi(e, t, n) {
    var r = e.updateQueue;
    if (null === r) return null;
    if (r = r.shared, 0 != (2 & Zl)) {
      var a = r.pending;
      return null === a ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, Bi(e, n);
    }
    return null === (a = r.interleaved) ? (t.next = t, Ui(r)) : (t.next = a.next, a.next = t), 
    r.interleaved = t, Bi(e, n);
  }
  function Ki(e, t, n) {
    if (null !== (t = t.updateQueue) && (t = t.shared, 0 != (4194240 & n))) {
      var r = t.lanes;
      n |= r &= e.pendingLanes, t.lanes = n, Tt(e, n);
    }
  }
  function Yi(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (null !== r && n === (r = r.updateQueue)) {
      var a = null, i = null;
      if (null !== (n = n.firstBaseUpdate)) {
        do {
          var o = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null
          };
          null === i ? a = i = o : i = i.next = o, n = n.next;
        } while (null !== n);
        null === i ? a = i = t : i = i.next = t;
      } else a = i = t;
      return n = {
        baseState: r.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: i,
        shared: r.shared,
        effects: r.effects
      }, void (e.updateQueue = n);
    }
    null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Qi(e, t, n, r) {
    var a = e.updateQueue;
    Vi = !1;
    var i = a.firstBaseUpdate, o = a.lastBaseUpdate, s = a.shared.pending;
    if (null !== s) {
      a.shared.pending = null;
      var l = s, u = l.next;
      l.next = null, null === o ? i = u : o.next = u, o = l;
      var c = e.alternate;
      null !== c && ((s = (c = c.updateQueue).lastBaseUpdate) !== o && (null === s ? c.firstBaseUpdate = u : s.next = u, 
      c.lastBaseUpdate = l));
    }
    if (null !== i) {
      var d = a.baseState;
      for (o = 0, c = u = l = null, s = i; ;) {
        var f = s.lane, p = s.eventTime;
        if ((r & f) === f) {
          null !== c && (c = c.next = {
            eventTime: p,
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          });
          e: {
            var m = e, h = s;
            switch (f = t, p = n, h.tag) {
             case 1:
              if ("function" == typeof (m = h.payload)) {
                d = m.call(p, d, f);
                break e;
              }
              d = m;
              break e;

             case 3:
              m.flags = -65537 & m.flags | 128;

             case 0:
              if (null == (f = "function" == typeof (m = h.payload) ? m.call(p, d, f) : m)) break e;
              d = Q({}, d, f);
              break e;

             case 2:
              Vi = !0;
            }
          }
          null !== s.callback && 0 !== s.lane && (e.flags |= 64, null === (f = a.effects) ? a.effects = [ s ] : f.push(s));
        } else p = {
          eventTime: p,
          lane: f,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        }, null === c ? (u = c = p, l = d) : c = c.next = p, o |= f;
        if (null === (s = s.next)) {
          if (null === (s = a.shared.pending)) break;
          s = (f = s).next, f.next = null, a.lastBaseUpdate = f, a.shared.pending = null;
        }
      }
      if (null === c && (l = d), a.baseState = l, a.firstBaseUpdate = u, a.lastBaseUpdate = c, 
      null !== (t = a.shared.interleaved)) {
        a = t;
        do {
          o |= a.lane, a = a.next;
        } while (a !== t);
      } else null === i && (a.shared.lanes = 0);
      Yl |= o, e.lanes = o, e.memoizedState = d;
    }
  }
  function Gi(e, t, n) {
    if (e = t.effects, t.effects = null, null !== e) for (t = 0; t < e.length; t++) {
      var r = e[t], a = r.callback;
      if (null !== a) {
        if (r.callback = null, r = n, "function" != typeof a) throw Error(b(191, a));
        a.call(r);
      }
    }
  }
  var Xi = (new g.Component).refs;
  function Ji(e, t, n, r) {
    n = null == (n = n(r, t = e.memoizedState)) ? t : Q({}, t, n), e.memoizedState = n, 
    0 === e.lanes && (e.updateQueue.baseState = n);
  }
  var eo = {
    isMounted: function(e) {
      return !!(e = e._reactInternals) && tt(e) === e;
    },
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var r = pu(), a = mu(e), i = Hi(r, a);
      i.payload = t, null != n && (i.callback = n), null !== (t = qi(e, i, a)) && (hu(t, e, a, r), 
      Ki(t, e, a));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var r = pu(), a = mu(e), i = Hi(r, a);
      i.tag = 1, i.payload = t, null != n && (i.callback = n), null !== (t = qi(e, i, a)) && (hu(t, e, a, r), 
      Ki(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = pu(), r = mu(e), a = Hi(n, r);
      a.tag = 2, null != t && (a.callback = t), null !== (t = qi(e, a, r)) && (hu(t, e, r, n), 
      Ki(t, e, r));
    }
  };
  function to(e, t, n, r, a, i, o) {
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, i, o) : !t.prototype || !t.prototype.isPureReactComponent || (!kr(n, r) || !kr(a, i));
  }
  function no(e, t, n) {
    var r = !1, a = Ua, i = t.contextType;
    return "object" == typeof i && null !== i ? i = Fi(i) : (a = Wa(t) ? Va : Za.current, 
    i = (r = null != (r = t.contextTypes)) ? $a(e, a) : Ua), t = new t(n, i), e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null, 
    t.updater = eo, e.stateNode = t, t._reactInternals = e, r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a, 
    e.__reactInternalMemoizedMaskedChildContext = i), t;
  }
  function ro(e, t, n, r) {
    e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), 
    "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), 
    t.state !== e && eo.enqueueReplaceState(t, t.state, null);
  }
  function ao(e, t, n, r) {
    var a = e.stateNode;
    a.props = n, a.state = e.memoizedState, a.refs = Xi, $i(e);
    var i = t.contextType;
    "object" == typeof i && null !== i ? a.context = Fi(i) : (i = Wa(t) ? Va : Za.current, 
    a.context = $a(e, i)), a.state = e.memoizedState, "function" == typeof (i = t.getDerivedStateFromProps) && (Ji(e, t, i, n), 
    a.state = e.memoizedState), "function" == typeof t.getDerivedStateFromProps || "function" == typeof a.getSnapshotBeforeUpdate || "function" != typeof a.UNSAFE_componentWillMount && "function" != typeof a.componentWillMount || (t = a.state, 
    "function" == typeof a.componentWillMount && a.componentWillMount(), "function" == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), 
    t !== a.state && eo.enqueueReplaceState(a, a.state, null), Qi(e, n, a, r), a.state = e.memoizedState), 
    "function" == typeof a.componentDidMount && (e.flags |= 4194308);
  }
  function io(e, t, n) {
    if (null !== (e = n.ref) && "function" != typeof e && "object" != typeof e) {
      if (n._owner) {
        if (n = n._owner) {
          if (1 !== n.tag) throw Error(b(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(b(147, e));
        var a = r, i = "" + e;
        return null !== t && null !== t.ref && "function" == typeof t.ref && t.ref._stringRef === i ? t.ref : (t = function(e) {
          var t = a.refs;
          t === Xi && (t = a.refs = {}), null === e ? delete t[i] : t[i] = e;
        }, t._stringRef = i, t);
      }
      if ("string" != typeof e) throw Error(b(284));
      if (!n._owner) throw Error(b(290, e));
    }
    return e;
  }
  function oo(e, t) {
    throw e = Object.prototype.toString.call(t), Error(b(31, "[object Object]" === e ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function so(e) {
    return (0, e._init)(e._payload);
  }
  function lo(e) {
    function t(t, n) {
      if (e) {
        var r = t.deletions;
        null === r ? (t.deletions = [ n ], t.flags |= 16) : r.push(n);
      }
    }
    function n(n, r) {
      if (!e) return null;
      for (;null !== r; ) t(n, r), r = r.sibling;
      return null;
    }
    function r(e, t) {
      for (e = new Map; null !== t; ) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), 
      t = t.sibling;
      return e;
    }
    function a(e, t) {
      return (e = Hu(e, t)).index = 0, e.sibling = null, e;
    }
    function i(t, n, r) {
      return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags |= 2, 
      n) : r : (t.flags |= 2, n) : (t.flags |= 1048576, n);
    }
    function o(t) {
      return e && null === t.alternate && (t.flags |= 2), t;
    }
    function s(e, t, n, r) {
      return null === t || 6 !== t.tag ? ((t = Qu(n, e.mode, r)).return = e, t) : ((t = a(t, n)).return = e, 
      t);
    }
    function l(e, t, n, r) {
      var i = n.type;
      return i === R ? c(e, t, n.props.children, r, n.key) : null !== t && (t.elementType === i || "object" == typeof i && null !== i && i.$$typeof === W && so(i) === t.type) ? ((r = a(t, n.props)).ref = io(e, t, n), 
      r.return = e, r) : ((r = qu(n.type, n.key, n.props, null, e.mode, r)).ref = io(e, t, n), 
      r.return = e, r);
    }
    function u(e, t, n, r) {
      return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Gu(n, e.mode, r)).return = e, 
      t) : ((t = a(t, n.children || [])).return = e, t);
    }
    function c(e, t, n, r, i) {
      return null === t || 7 !== t.tag ? ((t = Ku(n, e.mode, r, i)).return = e, t) : ((t = a(t, n)).return = e, 
      t);
    }
    function d(e, t, n) {
      if ("string" == typeof t && "" !== t || "number" == typeof t) return (t = Qu("" + t, e.mode, n)).return = e, 
      t;
      if ("object" == typeof t && null !== t) {
        switch (t.$$typeof) {
         case M:
          return (n = qu(t.type, t.key, t.props, null, e.mode, n)).ref = io(e, null, t), n.return = e, 
          n;

         case L:
          return (t = Gu(t, e.mode, n)).return = e, t;

         case W:
          return d(e, (0, t._init)(t._payload), n);
        }
        if (me(t) || K(t)) return (t = Ku(t, e.mode, n, null)).return = e, t;
        oo(e, t);
      }
      return null;
    }
    function f(e, t, n, r) {
      var a = null !== t ? t.key : null;
      if ("string" == typeof n && "" !== n || "number" == typeof n) return null !== a ? null : s(e, t, "" + n, r);
      if ("object" == typeof n && null !== n) {
        switch (n.$$typeof) {
         case M:
          return n.key === a ? l(e, t, n, r) : null;

         case L:
          return n.key === a ? u(e, t, n, r) : null;

         case W:
          return f(e, t, (a = n._init)(n._payload), r);
        }
        if (me(n) || K(n)) return null !== a ? null : c(e, t, n, r, null);
        oo(e, n);
      }
      return null;
    }
    function p(e, t, n, r, a) {
      if ("string" == typeof r && "" !== r || "number" == typeof r) return s(t, e = e.get(n) || null, "" + r, a);
      if ("object" == typeof r && null !== r) {
        switch (r.$$typeof) {
         case M:
          return l(t, e = e.get(null === r.key ? n : r.key) || null, r, a);

         case L:
          return u(t, e = e.get(null === r.key ? n : r.key) || null, r, a);

         case W:
          return p(e, t, n, (0, r._init)(r._payload), a);
        }
        if (me(r) || K(r)) return c(t, e = e.get(n) || null, r, a, null);
        oo(t, r);
      }
      return null;
    }
    function m(a, o, s, l) {
      for (var u = null, c = null, m = o, h = o = 0, g = null; null !== m && h < s.length; h++) {
        m.index > h ? (g = m, m = null) : g = m.sibling;
        var v = f(a, m, s[h], l);
        if (null === v) {
          null === m && (m = g);
          break;
        }
        e && m && null === v.alternate && t(a, m), o = i(v, o, h), null === c ? u = v : c.sibling = v, 
        c = v, m = g;
      }
      if (h === s.length) return n(a, m), vi && di(a, h), u;
      if (null === m) {
        for (;h < s.length; h++) null !== (m = d(a, s[h], l)) && (o = i(m, o, h), null === c ? u = m : c.sibling = m, 
        c = m);
        return vi && di(a, h), u;
      }
      for (m = r(a, m); h < s.length; h++) null !== (g = p(m, a, h, s[h], l)) && (e && null !== g.alternate && m.delete(null === g.key ? h : g.key), 
      o = i(g, o, h), null === c ? u = g : c.sibling = g, c = g);
      return e && m.forEach((function(e) {
        return t(a, e);
      })), vi && di(a, h), u;
    }
    function h(a, o, s, l) {
      var u = K(s);
      if ("function" != typeof u) throw Error(b(150));
      if (null == (s = u.call(s))) throw Error(b(151));
      for (var c = u = null, m = o, h = o = 0, g = null, v = s.next(); null !== m && !v.done; h++, 
      v = s.next()) {
        m.index > h ? (g = m, m = null) : g = m.sibling;
        var y = f(a, m, v.value, l);
        if (null === y) {
          null === m && (m = g);
          break;
        }
        e && m && null === y.alternate && t(a, m), o = i(y, o, h), null === c ? u = y : c.sibling = y, 
        c = y, m = g;
      }
      if (v.done) return n(a, m), vi && di(a, h), u;
      if (null === m) {
        for (;!v.done; h++, v = s.next()) null !== (v = d(a, v.value, l)) && (o = i(v, o, h), 
        null === c ? u = v : c.sibling = v, c = v);
        return vi && di(a, h), u;
      }
      for (m = r(a, m); !v.done; h++, v = s.next()) null !== (v = p(m, a, h, v.value, l)) && (e && null !== v.alternate && m.delete(null === v.key ? h : v.key), 
      o = i(v, o, h), null === c ? u = v : c.sibling = v, c = v);
      return e && m.forEach((function(e) {
        return t(a, e);
      })), vi && di(a, h), u;
    }
    return function e(r, i, s, l) {
      if ("object" == typeof s && null !== s && s.type === R && null === s.key && (s = s.props.children), 
      "object" == typeof s && null !== s) {
        switch (s.$$typeof) {
         case M:
          e: {
            for (var u = s.key, c = i; null !== c; ) {
              if (c.key === u) {
                if ((u = s.type) === R) {
                  if (7 === c.tag) {
                    n(r, c.sibling), (i = a(c, s.props.children)).return = r, r = i;
                    break e;
                  }
                } else if (c.elementType === u || "object" == typeof u && null !== u && u.$$typeof === W && so(u) === c.type) {
                  n(r, c.sibling), (i = a(c, s.props)).ref = io(r, c, s), i.return = r, r = i;
                  break e;
                }
                n(r, c);
                break;
              }
              t(r, c), c = c.sibling;
            }
            s.type === R ? ((i = Ku(s.props.children, r.mode, l, s.key)).return = r, r = i) : ((l = qu(s.type, s.key, s.props, null, r.mode, l)).ref = io(r, i, s), 
            l.return = r, r = l);
          }
          return o(r);

         case L:
          e: {
            for (c = s.key; null !== i; ) {
              if (i.key === c) {
                if (4 === i.tag && i.stateNode.containerInfo === s.containerInfo && i.stateNode.implementation === s.implementation) {
                  n(r, i.sibling), (i = a(i, s.children || [])).return = r, r = i;
                  break e;
                }
                n(r, i);
                break;
              }
              t(r, i), i = i.sibling;
            }
            (i = Gu(s, r.mode, l)).return = r, r = i;
          }
          return o(r);

         case W:
          return e(r, i, (c = s._init)(s._payload), l);
        }
        if (me(s)) return m(r, i, s, l);
        if (K(s)) return h(r, i, s, l);
        oo(r, s);
      }
      return "string" == typeof s && "" !== s || "number" == typeof s ? (s = "" + s, null !== i && 6 === i.tag ? (n(r, i.sibling), 
      (i = a(i, s)).return = r, r = i) : (n(r, i), (i = Qu(s, r.mode, l)).return = r, 
      r = i), o(r)) : n(r, i);
    };
  }
  var uo = lo(!0), co = lo(!1), fo = {}, po = Ia(fo), mo = Ia(fo), ho = Ia(fo);
  function go(e) {
    if (e === fo) throw Error(b(174));
    return e;
  }
  function vo(e, t) {
    switch (Da(ho, t), Da(mo, e), Da(po, fo), e = t.nodeType) {
     case 9:
     case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ke(null, "");
      break;

     default:
      t = ke(t = (e = 8 === e ? t.parentNode : t).namespaceURI || null, e = e.tagName);
    }
    Fa(po), Da(po, t);
  }
  function bo() {
    Fa(po), Fa(mo), Fa(ho);
  }
  function yo(e) {
    go(ho.current);
    var t = go(po.current), n = ke(t, e.type);
    t !== n && (Da(mo, e), Da(po, n));
  }
  function xo(e) {
    mo.current === e && (Fa(po), Fa(mo));
  }
  var ko = Ia(0);
  function wo(e) {
    for (var t = e; null !== t; ) {
      if (13 === t.tag) {
        var n = t.memoizedState;
        if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t;
      } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
        if (0 != (128 & t.flags)) return t;
      } else if (null !== t.child) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (;null === t.sibling; ) {
        if (null === t.return || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var _o = [];
  function So() {
    for (var e = 0; e < _o.length; e++) _o[e]._workInProgressVersionPrimary = null;
    _o.length = 0;
  }
  var Co = z.ReactCurrentDispatcher, Ao = z.ReactCurrentBatchConfig, Eo = 0, jo = null, No = null, Po = null, To = !1, Oo = !1, zo = 0, Mo = 0;
  function Lo() {
    throw Error(b(321));
  }
  function Ro(e, t) {
    if (null === t) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!xr(e[n], t[n])) return !1;
    return !0;
  }
  function Io(e, t, n, r, a, i) {
    if (Eo = i, jo = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Co.current = null === e || null === e.memoizedState ? xs : ks, 
    e = n(r, a), Oo) {
      i = 0;
      do {
        if (Oo = !1, zo = 0, 25 <= i) throw Error(b(301));
        i += 1, Po = No = null, t.updateQueue = null, Co.current = ws, e = n(r, a);
      } while (Oo);
    }
    if (Co.current = ys, t = null !== No && null !== No.next, Eo = 0, Po = No = jo = null, 
    To = !1, t) throw Error(b(300));
    return e;
  }
  function Fo() {
    var e = 0 !== zo;
    return zo = 0, e;
  }
  function Do() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return null === Po ? jo.memoizedState = Po = e : Po = Po.next = e, Po;
  }
  function Uo() {
    if (null === No) {
      var e = jo.alternate;
      e = null !== e ? e.memoizedState : null;
    } else e = No.next;
    var t = null === Po ? jo.memoizedState : Po.next;
    if (null !== t) Po = t, No = e; else {
      if (null === e) throw Error(b(310));
      e = {
        memoizedState: (No = e).memoizedState,
        baseState: No.baseState,
        baseQueue: No.baseQueue,
        queue: No.queue,
        next: null
      }, null === Po ? jo.memoizedState = Po = e : Po = Po.next = e;
    }
    return Po;
  }
  function Zo(e, t) {
    return "function" == typeof t ? t(e) : t;
  }
  function Bo(e) {
    var t = Uo(), n = t.queue;
    if (null === n) throw Error(b(311));
    n.lastRenderedReducer = e;
    var r = No, a = r.baseQueue, i = n.pending;
    if (null !== i) {
      if (null !== a) {
        var o = a.next;
        a.next = i.next, i.next = o;
      }
      r.baseQueue = a = i, n.pending = null;
    }
    if (null !== a) {
      i = a.next, r = r.baseState;
      var s = o = null, l = null, u = i;
      do {
        var c = u.lane;
        if ((Eo & c) === c) null !== l && (l = l.next = {
          lane: 0,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        }), r = u.hasEagerState ? u.eagerState : e(r, u.action); else {
          var d = {
            lane: c,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null
          };
          null === l ? (s = l = d, o = r) : l = l.next = d, jo.lanes |= c, Yl |= c;
        }
        u = u.next;
      } while (null !== u && u !== i);
      null === l ? o = r : l.next = s, xr(r, t.memoizedState) || (zs = !0), t.memoizedState = r, 
      t.baseState = o, t.baseQueue = l, n.lastRenderedState = r;
    }
    if (null !== (e = n.interleaved)) {
      a = e;
      do {
        i = a.lane, jo.lanes |= i, Yl |= i, a = a.next;
      } while (a !== e);
    } else null === a && (n.lanes = 0);
    return [ t.memoizedState, n.dispatch ];
  }
  function Vo(e) {
    var t = Uo(), n = t.queue;
    if (null === n) throw Error(b(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, a = n.pending, i = t.memoizedState;
    if (null !== a) {
      n.pending = null;
      var o = a = a.next;
      do {
        i = e(i, o.action), o = o.next;
      } while (o !== a);
      xr(i, t.memoizedState) || (zs = !0), t.memoizedState = i, null === t.baseQueue && (t.baseState = i), 
      n.lastRenderedState = i;
    }
    return [ i, r ];
  }
  function $o() {}
  function Wo(e, t) {
    var n = jo, r = Uo(), a = t(), i = !xr(r.memoizedState, a);
    if (i && (r.memoizedState = a, zs = !0), r = r.queue, rs(Ko.bind(null, n, r, e), [ e ]), 
    r.getSnapshot !== t || i || null !== Po && 1 & Po.memoizedState.tag) {
      if (n.flags |= 2048, Xo(9, qo.bind(null, n, r, a, t), void 0, null), null === Bl) throw Error(b(349));
      0 != (30 & Eo) || Ho(n, t, a);
    }
    return a;
  }
  function Ho(e, t, n) {
    e.flags |= 16384, e = {
      getSnapshot: t,
      value: n
    }, null === (t = jo.updateQueue) ? (t = {
      lastEffect: null,
      stores: null
    }, jo.updateQueue = t, t.stores = [ e ]) : null === (n = t.stores) ? t.stores = [ e ] : n.push(e);
  }
  function qo(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Yo(t) && Qo(e);
  }
  function Ko(e, t, n) {
    return n((function() {
      Yo(t) && Qo(e);
    }));
  }
  function Yo(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !xr(e, n);
    } catch (e) {
      return !0;
    }
  }
  function Qo(e) {
    var t = Bi(e, 1);
    null !== t && hu(t, e, 1, -1);
  }
  function Go(e) {
    var t = Do();
    return "function" == typeof e && (e = e()), t.memoizedState = t.baseState = e, e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Zo,
      lastRenderedState: e
    }, t.queue = e, e = e.dispatch = hs.bind(null, jo, e), [ t.memoizedState, e ];
  }
  function Xo(e, t, n, r) {
    return e = {
      tag: e,
      create: t,
      destroy: n,
      deps: r,
      next: null
    }, null === (t = jo.updateQueue) ? (t = {
      lastEffect: null,
      stores: null
    }, jo.updateQueue = t, t.lastEffect = e.next = e) : null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next, 
    n.next = e, e.next = r, t.lastEffect = e), e;
  }
  function Jo() {
    return Uo().memoizedState;
  }
  function es(e, t, n, r) {
    var a = Do();
    jo.flags |= e, a.memoizedState = Xo(1 | t, n, void 0, void 0 === r ? null : r);
  }
  function ts(e, t, n, r) {
    var a = Uo();
    r = void 0 === r ? null : r;
    var i = void 0;
    if (null !== No) {
      var o = No.memoizedState;
      if (i = o.destroy, null !== r && Ro(r, o.deps)) return void (a.memoizedState = Xo(t, n, i, r));
    }
    jo.flags |= e, a.memoizedState = Xo(1 | t, n, i, r);
  }
  function ns(e, t) {
    return es(8390656, 8, e, t);
  }
  function rs(e, t) {
    return ts(2048, 8, e, t);
  }
  function as(e, t) {
    return ts(4, 2, e, t);
  }
  function is(e, t) {
    return ts(4, 4, e, t);
  }
  function os(e, t) {
    return "function" == typeof t ? (e = e(), t(e), function() {
      t(null);
    }) : null != t ? (e = e(), t.current = e, function() {
      t.current = null;
    }) : void 0;
  }
  function ss(e, t, n) {
    return n = null != n ? n.concat([ e ]) : null, ts(4, 4, os.bind(null, t, e), n);
  }
  function ls() {}
  function us(e, t) {
    var n = Uo();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && Ro(t, r[1]) ? r[0] : (n.memoizedState = [ e, t ], 
    e);
  }
  function cs(e, t) {
    var n = Uo();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && Ro(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [ e, t ], 
    e);
  }
  function ds(e, t, n) {
    return 0 == (21 & Eo) ? (e.baseState && (e.baseState = !1, zs = !0), e.memoizedState = n) : (xr(n, t) || (n = jt(), 
    jo.lanes |= n, Yl |= n, e.baseState = !0), t);
  }
  function fs(e, t) {
    var n = Ot;
    Ot = 0 !== n && 4 > n ? n : 4, e(!0);
    var r = Ao.transition;
    Ao.transition = {};
    try {
      e(!1), t();
    } finally {
      Ot = n, Ao.transition = r;
    }
  }
  function ps() {
    return Uo().memoizedState;
  }
  function ms(e, t, n) {
    var r = mu(e);
    if (n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, gs(e)) vs(t, n); else if (null !== (n = Zi(e, t, n, r))) {
      hu(n, e, r, pu()), bs(n, t, r);
    }
  }
  function hs(e, t, n) {
    var r = mu(e), a = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (gs(e)) vs(t, a); else {
      var i = e.alternate;
      if (0 === e.lanes && (null === i || 0 === i.lanes) && null !== (i = t.lastRenderedReducer)) try {
        var o = t.lastRenderedState, s = i(o, n);
        if (a.hasEagerState = !0, a.eagerState = s, xr(s, o)) {
          var l = t.interleaved;
          return null === l ? (a.next = a, Ui(t)) : (a.next = l.next, l.next = a), void (t.interleaved = a);
        }
      } catch (e) {}
      null !== (n = Zi(e, t, a, r)) && (hu(n, e, r, a = pu()), bs(n, t, r));
    }
  }
  function gs(e) {
    var t = e.alternate;
    return e === jo || null !== t && t === jo;
  }
  function vs(e, t) {
    Oo = To = !0;
    var n = e.pending;
    null === n ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function bs(e, t, n) {
    if (0 != (4194240 & n)) {
      var r = t.lanes;
      n |= r &= e.pendingLanes, t.lanes = n, Tt(e, n);
    }
  }
  var ys = {
    readContext: Fi,
    useCallback: Lo,
    useContext: Lo,
    useEffect: Lo,
    useImperativeHandle: Lo,
    useInsertionEffect: Lo,
    useLayoutEffect: Lo,
    useMemo: Lo,
    useReducer: Lo,
    useRef: Lo,
    useState: Lo,
    useDebugValue: Lo,
    useDeferredValue: Lo,
    useTransition: Lo,
    useMutableSource: Lo,
    useSyncExternalStore: Lo,
    useId: Lo,
    unstable_isNewReconciler: !1
  }, xs = {
    readContext: Fi,
    useCallback: function(e, t) {
      return Do().memoizedState = [ e, void 0 === t ? null : t ], e;
    },
    useContext: Fi,
    useEffect: ns,
    useImperativeHandle: function(e, t, n) {
      return n = null != n ? n.concat([ e ]) : null, es(4194308, 4, os.bind(null, t, e), n);
    },
    useLayoutEffect: function(e, t) {
      return es(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      return es(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = Do();
      return t = void 0 === t ? null : t, e = e(), n.memoizedState = [ e, t ], e;
    },
    useReducer: function(e, t, n) {
      var r = Do();
      return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: t
      }, r.queue = e, e = e.dispatch = ms.bind(null, jo, e), [ r.memoizedState, e ];
    },
    useRef: function(e) {
      return e = {
        current: e
      }, Do().memoizedState = e;
    },
    useState: Go,
    useDebugValue: ls,
    useDeferredValue: function(e) {
      return Do().memoizedState = e;
    },
    useTransition: function() {
      var e = Go(!1), t = e[0];
      return e = fs.bind(null, e[1]), Do().memoizedState = e, [ t, e ];
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
      var r = jo, a = Do();
      if (vi) {
        if (void 0 === n) throw Error(b(407));
        n = n();
      } else {
        if (n = t(), null === Bl) throw Error(b(349));
        0 != (30 & Eo) || Ho(r, t, n);
      }
      a.memoizedState = n;
      var i = {
        value: n,
        getSnapshot: t
      };
      return a.queue = i, ns(Ko.bind(null, r, i, e), [ e ]), r.flags |= 2048, Xo(9, qo.bind(null, r, i, n, t), void 0, null), 
      n;
    },
    useId: function() {
      var e = Do(), t = Bl.identifierPrefix;
      if (vi) {
        var n = ci;
        t = ":" + t + "R" + (n = (ui & ~(1 << 32 - yt(ui) - 1)).toString(32) + n), 0 < (n = zo++) && (t += "H" + n.toString(32)), 
        t += ":";
      } else t = ":" + t + "r" + (n = Mo++).toString(32) + ":";
      return e.memoizedState = t;
    },
    unstable_isNewReconciler: !1
  }, ks = {
    readContext: Fi,
    useCallback: us,
    useContext: Fi,
    useEffect: rs,
    useImperativeHandle: ss,
    useInsertionEffect: as,
    useLayoutEffect: is,
    useMemo: cs,
    useReducer: Bo,
    useRef: Jo,
    useState: function() {
      return Bo(Zo);
    },
    useDebugValue: ls,
    useDeferredValue: function(e) {
      return ds(Uo(), No.memoizedState, e);
    },
    useTransition: function() {
      return [ Bo(Zo)[0], Uo().memoizedState ];
    },
    useMutableSource: $o,
    useSyncExternalStore: Wo,
    useId: ps,
    unstable_isNewReconciler: !1
  }, ws = {
    readContext: Fi,
    useCallback: us,
    useContext: Fi,
    useEffect: rs,
    useImperativeHandle: ss,
    useInsertionEffect: as,
    useLayoutEffect: is,
    useMemo: cs,
    useReducer: Vo,
    useRef: Jo,
    useState: function() {
      return Vo(Zo);
    },
    useDebugValue: ls,
    useDeferredValue: function(e) {
      var t = Uo();
      return null === No ? t.memoizedState = e : ds(t, No.memoizedState, e);
    },
    useTransition: function() {
      return [ Vo(Zo)[0], Uo().memoizedState ];
    },
    useMutableSource: $o,
    useSyncExternalStore: Wo,
    useId: ps,
    unstable_isNewReconciler: !1
  };
  function _s(e, t) {
    try {
      var n = "", r = t;
      do {
        n += ee(r), r = r.return;
      } while (r);
      var a = n;
    } catch (e) {
      a = "\nError generating stack: " + e.message + "\n" + e.stack;
    }
    return {
      value: e,
      source: t,
      stack: a,
      digest: null
    };
  }
  function Ss(e, t, n) {
    return {
      value: e,
      source: null,
      stack: null != n ? n : null,
      digest: null != t ? t : null
    };
  }
  function Cs(e, t) {
    try {
      console.error(t.value);
    } catch (e) {
      setTimeout((function() {
        throw e;
      }));
    }
  }
  var As = "function" == typeof WeakMap ? WeakMap : Map;
  function Es(e, t, n) {
    (n = Hi(-1, n)).tag = 3, n.payload = {
      element: null
    };
    var r = t.value;
    return n.callback = function() {
      ru || (ru = !0, au = r), Cs(0, t);
    }, n;
  }
  function js(e, t, n) {
    (n = Hi(-1, n)).tag = 3;
    var r = e.type.getDerivedStateFromError;
    if ("function" == typeof r) {
      var a = t.value;
      n.payload = function() {
        return r(a);
      }, n.callback = function() {
        Cs(0, t);
      };
    }
    var i = e.stateNode;
    return null !== i && "function" == typeof i.componentDidCatch && (n.callback = function() {
      Cs(0, t), "function" != typeof r && (null === iu ? iu = new Set([ this ]) : iu.add(this));
      var e = t.stack;
      this.componentDidCatch(t.value, {
        componentStack: null !== e ? e : ""
      });
    }), n;
  }
  function Ns(e, t, n) {
    var r = e.pingCache;
    if (null === r) {
      r = e.pingCache = new As;
      var a = new Set;
      r.set(t, a);
    } else void 0 === (a = r.get(t)) && (a = new Set, r.set(t, a));
    a.has(n) || (a.add(n), e = Fu.bind(null, e, t, n), t.then(e, e));
  }
  function Ps(e) {
    do {
      var t;
      if ((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated), 
      t) return e;
      e = e.return;
    } while (null !== e);
    return null;
  }
  function Ts(e, t, n, r, a) {
    return 0 == (1 & e.mode) ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, 
    n.flags &= -52805, 1 === n.tag && (null === n.alternate ? n.tag = 17 : ((t = Hi(-1, 1)).tag = 2, 
    qi(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = a, e);
  }
  var Os = z.ReactCurrentOwner, zs = !1;
  function Ms(e, t, n, r) {
    t.child = null === e ? co(t, null, n, r) : uo(t, e.child, n, r);
  }
  function Ls(e, t, n, r, a) {
    n = n.render;
    var i = t.ref;
    return Ii(t, a), r = Io(e, t, n, r, i, a), n = Fo(), null === e || zs ? (vi && n && pi(t), 
    t.flags |= 1, Ms(e, t, r, a), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, 
    e.lanes &= ~a, rl(e, t, a));
  }
  function Rs(e, t, n, r, a) {
    if (null === e) {
      var i = n.type;
      return "function" != typeof i || Wu(i) || void 0 !== i.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = qu(n.type, null, r, t, t.mode, a)).ref = t.ref, 
      e.return = t, t.child = e) : (t.tag = 15, t.type = i, Is(e, t, i, r, a));
    }
    if (i = e.child, 0 == (e.lanes & a)) {
      var o = i.memoizedProps;
      if ((n = null !== (n = n.compare) ? n : kr)(o, r) && e.ref === t.ref) return rl(e, t, a);
    }
    return t.flags |= 1, (e = Hu(i, r)).ref = t.ref, e.return = t, t.child = e;
  }
  function Is(e, t, n, r, a) {
    if (null !== e) {
      var i = e.memoizedProps;
      if (kr(i, r) && e.ref === t.ref) {
        if (zs = !1, t.pendingProps = r = i, 0 == (e.lanes & a)) return t.lanes = e.lanes, 
        rl(e, t, a);
        0 != (131072 & e.flags) && (zs = !0);
      }
    }
    return Us(e, t, n, r, a);
  }
  function Fs(e, t, n) {
    var r = t.pendingProps, a = r.children, i = null !== e ? e.memoizedState : null;
    if ("hidden" === r.mode) if (0 == (1 & t.mode)) t.memoizedState = {
      baseLanes: 0,
      cachePool: null,
      transitions: null
    }, Da(Hl, Wl), Wl |= n; else {
      if (0 == (1073741824 & n)) return e = null !== i ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, 
      t.memoizedState = {
        baseLanes: e,
        cachePool: null,
        transitions: null
      }, t.updateQueue = null, Da(Hl, Wl), Wl |= e, null;
      t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      }, r = null !== i ? i.baseLanes : n, Da(Hl, Wl), Wl |= r;
    } else null !== i ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, Da(Hl, Wl), 
    Wl |= r;
    return Ms(e, t, a, n), t.child;
  }
  function Ds(e, t) {
    var n = t.ref;
    (null === e && null !== n || null !== e && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function Us(e, t, n, r, a) {
    var i = Wa(n) ? Va : Za.current;
    return i = $a(t, i), Ii(t, a), n = Io(e, t, n, r, i, a), r = Fo(), null === e || zs ? (vi && r && pi(t), 
    t.flags |= 1, Ms(e, t, n, a), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, 
    e.lanes &= ~a, rl(e, t, a));
  }
  function Zs(e, t, n, r, a) {
    if (Wa(n)) {
      var i = !0;
      Ya(t);
    } else i = !1;
    if (Ii(t, a), null === t.stateNode) nl(e, t), no(t, n, r), ao(t, n, r, a), r = !0; else if (null === e) {
      var o = t.stateNode, s = t.memoizedProps;
      o.props = s;
      var l = o.context, u = n.contextType;
      "object" == typeof u && null !== u ? u = Fi(u) : u = $a(t, u = Wa(n) ? Va : Za.current);
      var c = n.getDerivedStateFromProps, d = "function" == typeof c || "function" == typeof o.getSnapshotBeforeUpdate;
      d || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (s !== r || l !== u) && ro(t, o, r, u), 
      Vi = !1;
      var f = t.memoizedState;
      o.state = f, Qi(t, r, o, a), l = t.memoizedState, s !== r || f !== l || Ba.current || Vi ? ("function" == typeof c && (Ji(t, n, c, r), 
      l = t.memoizedState), (s = Vi || to(t, n, s, r, f, l, u)) ? (d || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || ("function" == typeof o.componentWillMount && o.componentWillMount(), 
      "function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount()), 
      "function" == typeof o.componentDidMount && (t.flags |= 4194308)) : ("function" == typeof o.componentDidMount && (t.flags |= 4194308), 
      t.memoizedProps = r, t.memoizedState = l), o.props = r, o.state = l, o.context = u, 
      r = s) : ("function" == typeof o.componentDidMount && (t.flags |= 4194308), r = !1);
    } else {
      o = t.stateNode, Wi(e, t), s = t.memoizedProps, u = t.type === t.elementType ? s : Ni(t.type, s), 
      o.props = u, d = t.pendingProps, f = o.context, "object" == typeof (l = n.contextType) && null !== l ? l = Fi(l) : l = $a(t, l = Wa(n) ? Va : Za.current);
      var p = n.getDerivedStateFromProps;
      (c = "function" == typeof p || "function" == typeof o.getSnapshotBeforeUpdate) || "function" != typeof o.UNSAFE_componentWillReceiveProps && "function" != typeof o.componentWillReceiveProps || (s !== d || f !== l) && ro(t, o, r, l), 
      Vi = !1, f = t.memoizedState, o.state = f, Qi(t, r, o, a);
      var m = t.memoizedState;
      s !== d || f !== m || Ba.current || Vi ? ("function" == typeof p && (Ji(t, n, p, r), 
      m = t.memoizedState), (u = Vi || to(t, n, u, r, f, m, l) || !1) ? (c || "function" != typeof o.UNSAFE_componentWillUpdate && "function" != typeof o.componentWillUpdate || ("function" == typeof o.componentWillUpdate && o.componentWillUpdate(r, m, l), 
      "function" == typeof o.UNSAFE_componentWillUpdate && o.UNSAFE_componentWillUpdate(r, m, l)), 
      "function" == typeof o.componentDidUpdate && (t.flags |= 4), "function" == typeof o.getSnapshotBeforeUpdate && (t.flags |= 1024)) : ("function" != typeof o.componentDidUpdate || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), 
      "function" != typeof o.getSnapshotBeforeUpdate || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), 
      t.memoizedProps = r, t.memoizedState = m), o.props = r, o.state = m, o.context = l, 
      r = u) : ("function" != typeof o.componentDidUpdate || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), 
      "function" != typeof o.getSnapshotBeforeUpdate || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), 
      r = !1);
    }
    return Bs(e, t, n, r, i, a);
  }
  function Bs(e, t, n, r, a, i) {
    Ds(e, t);
    var o = 0 != (128 & t.flags);
    if (!r && !o) return a && Qa(t, n, !1), rl(e, t, i);
    r = t.stateNode, Os.current = t;
    var s = o && "function" != typeof n.getDerivedStateFromError ? null : r.render();
    return t.flags |= 1, null !== e && o ? (t.child = uo(t, e.child, null, i), t.child = uo(t, null, s, i)) : Ms(e, t, s, i), 
    t.memoizedState = r.state, a && Qa(t, n, !0), t.child;
  }
  function Vs(e) {
    var t = e.stateNode;
    t.pendingContext ? qa(0, t.pendingContext, t.pendingContext !== t.context) : t.context && qa(0, t.context, !1), 
    vo(e, t.containerInfo);
  }
  function $s(e, t, n, r, a) {
    return Ai(), Ei(a), t.flags |= 256, Ms(e, t, n, r), t.child;
  }
  var Ws, Hs, qs, Ks = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
  };
  function Ys(e) {
    return {
      baseLanes: e,
      cachePool: null,
      transitions: null
    };
  }
  function Qs(e, t, n) {
    var r, a = t.pendingProps, i = ko.current, o = !1, s = 0 != (128 & t.flags);
    if ((r = s) || (r = (null === e || null !== e.memoizedState) && 0 != (2 & i)), r ? (o = !0, 
    t.flags &= -129) : null !== e && null === e.memoizedState || (i |= 1), Da(ko, 1 & i), 
    null === e) return wi(t), null !== (e = t.memoizedState) && null !== (e = e.dehydrated) ? (0 == (1 & t.mode) ? t.lanes = 1 : "$!" === e.data ? t.lanes = 8 : t.lanes = 1073741824, 
    null) : (s = a.children, e = a.fallback, o ? (a = t.mode, o = t.child, s = {
      mode: "hidden",
      children: s
    }, 0 == (1 & a) && null !== o ? (o.childLanes = 0, o.pendingProps = s) : o = Yu(s, a, 0, null), 
    e = Ku(e, a, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ys(n), 
    t.memoizedState = Ks, e) : Gs(t, s));
    if (null !== (i = e.memoizedState) && null !== (r = i.dehydrated)) return function(e, t, n, r, a, i, o) {
      if (n) return 256 & t.flags ? (t.flags &= -257, Xs(e, t, o, r = Ss(Error(b(422))))) : null !== t.memoizedState ? (t.child = e.child, 
      t.flags |= 128, null) : (i = r.fallback, a = t.mode, r = Yu({
        mode: "visible",
        children: r.children
      }, a, 0, null), (i = Ku(i, a, o, null)).flags |= 2, r.return = t, i.return = t, 
      r.sibling = i, t.child = r, 0 != (1 & t.mode) && uo(t, e.child, null, o), t.child.memoizedState = Ys(o), 
      t.memoizedState = Ks, i);
      if (0 == (1 & t.mode)) return Xs(e, t, o, null);
      if ("$!" === a.data) {
        if (r = a.nextSibling && a.nextSibling.dataset) var s = r.dgst;
        return r = s, Xs(e, t, o, r = Ss(i = Error(b(419)), r, void 0));
      }
      if (s = 0 != (o & e.childLanes), zs || s) {
        if (null !== (r = Bl)) {
          switch (o & -o) {
           case 4:
            a = 2;
            break;

           case 16:
            a = 8;
            break;

           case 64:
           case 128:
           case 256:
           case 512:
           case 1024:
           case 2048:
           case 4096:
           case 8192:
           case 16384:
           case 32768:
           case 65536:
           case 131072:
           case 262144:
           case 524288:
           case 1048576:
           case 2097152:
           case 4194304:
           case 8388608:
           case 16777216:
           case 33554432:
           case 67108864:
            a = 32;
            break;

           case 536870912:
            a = 268435456;
            break;

           default:
            a = 0;
          }
          0 !== (a = 0 != (a & (r.suspendedLanes | o)) ? 0 : a) && a !== i.retryLane && (i.retryLane = a, 
          Bi(e, a), hu(r, e, a, -1));
        }
        return ju(), Xs(e, t, o, r = Ss(Error(b(421))));
      }
      return "$?" === a.data ? (t.flags |= 128, t.child = e.child, t = Uu.bind(null, e), 
      a._reactRetry = t, null) : (e = i.treeContext, gi = wa(a.nextSibling), hi = t, vi = !0, 
      bi = null, null !== e && (oi[si++] = ui, oi[si++] = ci, oi[si++] = li, ui = e.id, 
      ci = e.overflow, li = t), t = Gs(t, r.children), t.flags |= 4096, t);
    }(e, t, s, a, r, i, n);
    if (o) {
      o = a.fallback, s = t.mode, r = (i = e.child).sibling;
      var l = {
        mode: "hidden",
        children: a.children
      };
      return 0 == (1 & s) && t.child !== i ? ((a = t.child).childLanes = 0, a.pendingProps = l, 
      t.deletions = null) : (a = Hu(i, l)).subtreeFlags = 14680064 & i.subtreeFlags, null !== r ? o = Hu(r, o) : (o = Ku(o, s, n, null)).flags |= 2, 
      o.return = t, a.return = t, a.sibling = o, t.child = a, a = o, o = t.child, s = null === (s = e.child.memoizedState) ? Ys(n) : {
        baseLanes: s.baseLanes | n,
        cachePool: null,
        transitions: s.transitions
      }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = Ks, 
      a;
    }
    return e = (o = e.child).sibling, a = Hu(o, {
      mode: "visible",
      children: a.children
    }), 0 == (1 & t.mode) && (a.lanes = n), a.return = t, a.sibling = null, null !== e && (null === (n = t.deletions) ? (t.deletions = [ e ], 
    t.flags |= 16) : n.push(e)), t.child = a, t.memoizedState = null, a;
  }
  function Gs(e, t) {
    return (t = Yu({
      mode: "visible",
      children: t
    }, e.mode, 0, null)).return = e, e.child = t;
  }
  function Xs(e, t, n, r) {
    return null !== r && Ei(r), uo(t, e.child, null, n), (e = Gs(t, t.pendingProps.children)).flags |= 2, 
    t.memoizedState = null, e;
  }
  function Js(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    null !== r && (r.lanes |= t), Ri(e.return, t, n);
  }
  function el(e, t, n, r, a) {
    var i = e.memoizedState;
    null === i ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: n,
      tailMode: a
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, 
    i.tail = n, i.tailMode = a);
  }
  function tl(e, t, n) {
    var r = t.pendingProps, a = r.revealOrder, i = r.tail;
    if (Ms(e, t, r.children, n), 0 != (2 & (r = ko.current))) r = 1 & r | 2, t.flags |= 128; else {
      if (null !== e && 0 != (128 & e.flags)) e: for (e = t.child; null !== e; ) {
        if (13 === e.tag) null !== e.memoizedState && Js(e, n, t); else if (19 === e.tag) Js(e, n, t); else if (null !== e.child) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (;null === e.sibling; ) {
          if (null === e.return || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      r &= 1;
    }
    if (Da(ko, r), 0 == (1 & t.mode)) t.memoizedState = null; else switch (a) {
     case "forwards":
      for (n = t.child, a = null; null !== n; ) null !== (e = n.alternate) && null === wo(e) && (a = n), 
      n = n.sibling;
      null === (n = a) ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), 
      el(t, !1, a, n, i);
      break;

     case "backwards":
      for (n = null, a = t.child, t.child = null; null !== a; ) {
        if (null !== (e = a.alternate) && null === wo(e)) {
          t.child = a;
          break;
        }
        e = a.sibling, a.sibling = n, n = a, a = e;
      }
      el(t, !0, n, null, i);
      break;

     case "together":
      el(t, !1, null, null, void 0);
      break;

     default:
      t.memoizedState = null;
    }
    return t.child;
  }
  function nl(e, t) {
    0 == (1 & t.mode) && null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function rl(e, t, n) {
    if (null !== e && (t.dependencies = e.dependencies), Yl |= t.lanes, 0 == (n & t.childLanes)) return null;
    if (null !== e && t.child !== e.child) throw Error(b(153));
    if (null !== t.child) {
      for (n = Hu(e = t.child, e.pendingProps), t.child = n, n.return = t; null !== e.sibling; ) e = e.sibling, 
      (n = n.sibling = Hu(e, e.pendingProps)).return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function al(e, t) {
    if (!vi) switch (e.tailMode) {
     case "hidden":
      t = e.tail;
      for (var n = null; null !== t; ) null !== t.alternate && (n = t), t = t.sibling;
      null === n ? e.tail = null : n.sibling = null;
      break;

     case "collapsed":
      n = e.tail;
      for (var r = null; null !== n; ) null !== n.alternate && (r = n), n = n.sibling;
      null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }
  function il(e) {
    var t = null !== e.alternate && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var a = e.child; null !== a; ) n |= a.lanes | a.childLanes, r |= 14680064 & a.subtreeFlags, 
    r |= 14680064 & a.flags, a.return = e, a = a.sibling; else for (a = e.child; null !== a; ) n |= a.lanes | a.childLanes, 
    r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function ol(e, t, n) {
    var r = t.pendingProps;
    switch (mi(t), t.tag) {
     case 2:
     case 16:
     case 15:
     case 0:
     case 11:
     case 7:
     case 8:
     case 12:
     case 9:
     case 14:
      return il(t), null;

     case 1:
     case 17:
      return Wa(t.type) && Ha(), il(t), null;

     case 3:
      return r = t.stateNode, bo(), Fa(Ba), Fa(Za), So(), r.pendingContext && (r.context = r.pendingContext, 
      r.pendingContext = null), null !== e && null !== e.child || (Si(t) ? t.flags |= 4 : null === e || e.memoizedState.isDehydrated && 0 == (256 & t.flags) || (t.flags |= 1024, 
      null !== bi && (yu(bi), bi = null))), il(t), null;

     case 5:
      xo(t);
      var a = go(ho.current);
      if (n = t.type, null !== e && null != t.stateNode) Hs(e, t, n, r), e.ref !== t.ref && (t.flags |= 512, 
      t.flags |= 2097152); else {
        if (!r) {
          if (null === t.stateNode) throw Error(b(166));
          return il(t), null;
        }
        if (e = go(po.current), Si(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ca] = t, r[Aa] = i, e = 0 != (1 & t.mode), n) {
           case "dialog":
            Xr("cancel", r), Xr("close", r);
            break;

           case "iframe":
           case "object":
           case "embed":
            Xr("load", r);
            break;

           case "video":
           case "audio":
            for (a = 0; a < Kr.length; a++) Xr(Kr[a], r);
            break;

           case "source":
            Xr("error", r);
            break;

           case "img":
           case "image":
           case "link":
            Xr("error", r), Xr("load", r);
            break;

           case "details":
            Xr("toggle", r);
            break;

           case "input":
            ue(r, i), Xr("invalid", r);
            break;

           case "select":
            r._wrapperState = {
              wasMultiple: !!i.multiple
            }, Xr("invalid", r);
            break;

           case "textarea":
            ve(r, i), Xr("invalid", r);
          }
          for (var o in Te(n, i), a = null, i) if (i.hasOwnProperty(o)) {
            var s = i[o];
            "children" === o ? "string" == typeof s ? r.textContent !== s && (!0 !== i.suppressHydrationWarning && da(r.textContent, s, e), 
            a = [ "children", s ]) : "number" == typeof s && r.textContent !== "" + s && (!0 !== i.suppressHydrationWarning && da(r.textContent, s, e), 
            a = [ "children", "" + s ]) : x.hasOwnProperty(o) && null != s && "onScroll" === o && Xr("scroll", r);
          }
          switch (n) {
           case "input":
            ie(r), fe(r, i, !0);
            break;

           case "textarea":
            ie(r), ye(r);
            break;

           case "select":
           case "option":
            break;

           default:
            "function" == typeof i.onClick && (r.onclick = fa);
          }
          r = a, t.updateQueue = r, null !== r && (t.flags |= 4);
        } else {
          o = 9 === a.nodeType ? a : a.ownerDocument, "http://www.w3.org/1999/xhtml" === e && (e = xe(n)), 
          "http://www.w3.org/1999/xhtml" === e ? "script" === n ? ((e = o.createElement("div")).innerHTML = "<script><\/script>", 
          e = e.removeChild(e.firstChild)) : "string" == typeof r.is ? e = o.createElement(n, {
            is: r.is
          }) : (e = o.createElement(n), "select" === n && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), 
          e[Ca] = t, e[Aa] = r, Ws(e, t), t.stateNode = e;
          e: {
            switch (o = Oe(n, r), n) {
             case "dialog":
              Xr("cancel", e), Xr("close", e), a = r;
              break;

             case "iframe":
             case "object":
             case "embed":
              Xr("load", e), a = r;
              break;

             case "video":
             case "audio":
              for (a = 0; a < Kr.length; a++) Xr(Kr[a], e);
              a = r;
              break;

             case "source":
              Xr("error", e), a = r;
              break;

             case "img":
             case "image":
             case "link":
              Xr("error", e), Xr("load", e), a = r;
              break;

             case "details":
              Xr("toggle", e), a = r;
              break;

             case "input":
              ue(e, r), a = le(e, r), Xr("invalid", e);
              break;

             case "option":
             default:
              a = r;
              break;

             case "select":
              e._wrapperState = {
                wasMultiple: !!r.multiple
              }, a = Q({}, r, {
                value: void 0
              }), Xr("invalid", e);
              break;

             case "textarea":
              ve(e, r), a = ge(e, r), Xr("invalid", e);
            }
            for (i in Te(n, a), s = a) if (s.hasOwnProperty(i)) {
              var l = s[i];
              "style" === i ? Ne(e, l) : "dangerouslySetInnerHTML" === i ? null != (l = l ? l.__html : void 0) && Se(e, l) : "children" === i ? "string" == typeof l ? ("textarea" !== n || "" !== l) && Ce(e, l) : "number" == typeof l && Ce(e, "" + l) : "suppressContentEditableWarning" !== i && "suppressHydrationWarning" !== i && "autoFocus" !== i && (x.hasOwnProperty(i) ? null != l && "onScroll" === i && Xr("scroll", e) : null != l && O(e, i, l, o));
            }
            switch (n) {
             case "input":
              ie(e), fe(e, r, !1);
              break;

             case "textarea":
              ie(e), ye(e);
              break;

             case "option":
              null != r.value && e.setAttribute("value", "" + re(r.value));
              break;

             case "select":
              e.multiple = !!r.multiple, null != (i = r.value) ? he(e, !!r.multiple, i, !1) : null != r.defaultValue && he(e, !!r.multiple, r.defaultValue, !0);
              break;

             default:
              "function" == typeof a.onClick && (e.onclick = fa);
            }
            switch (n) {
             case "button":
             case "input":
             case "select":
             case "textarea":
              r = !!r.autoFocus;
              break e;

             case "img":
              r = !0;
              break e;

             default:
              r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        null !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      }
      return il(t), null;

     case 6:
      if (e && null != t.stateNode) qs(0, t, e.memoizedProps, r); else {
        if ("string" != typeof r && null === t.stateNode) throw Error(b(166));
        if (n = go(ho.current), go(po.current), Si(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ca] = t, (i = r.nodeValue !== n) && null !== (e = hi)) switch (e.tag) {
           case 3:
            da(r.nodeValue, n, 0 != (1 & e.mode));
            break;

           case 5:
            !0 !== e.memoizedProps.suppressHydrationWarning && da(r.nodeValue, n, 0 != (1 & e.mode));
          }
          i && (t.flags |= 4);
        } else (r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[Ca] = t, 
        t.stateNode = r;
      }
      return il(t), null;

     case 13:
      if (Fa(ko), r = t.memoizedState, null === e || null !== e.memoizedState && null !== e.memoizedState.dehydrated) {
        if (vi && null !== gi && 0 != (1 & t.mode) && 0 == (128 & t.flags)) Ci(), Ai(), 
        t.flags |= 98560, i = !1; else if (i = Si(t), null !== r && null !== r.dehydrated) {
          if (null === e) {
            if (!i) throw Error(b(318));
            if (!(i = null !== (i = t.memoizedState) ? i.dehydrated : null)) throw Error(b(317));
            i[Ca] = t;
          } else Ai(), 0 == (128 & t.flags) && (t.memoizedState = null), t.flags |= 4;
          il(t), i = !1;
        } else null !== bi && (yu(bi), bi = null), i = !0;
        if (!i) return 65536 & t.flags ? t : null;
      }
      return 0 != (128 & t.flags) ? (t.lanes = n, t) : ((r = null !== r) !== (null !== e && null !== e.memoizedState) && r && (t.child.flags |= 8192, 
      0 != (1 & t.mode) && (null === e || 0 != (1 & ko.current) ? 0 === ql && (ql = 3) : ju())), 
      null !== t.updateQueue && (t.flags |= 4), il(t), null);

     case 4:
      return bo(), null === e && ta(t.stateNode.containerInfo), il(t), null;

     case 10:
      return Li(t.type._context), il(t), null;

     case 19:
      if (Fa(ko), null === (i = t.memoizedState)) return il(t), null;
      if (r = 0 != (128 & t.flags), null === (o = i.rendering)) if (r) al(i, !1); else {
        if (0 !== ql || null !== e && 0 != (128 & e.flags)) for (e = t.child; null !== e; ) {
          if (null !== (o = wo(e))) {
            for (t.flags |= 128, al(i, !1), null !== (r = o.updateQueue) && (t.updateQueue = r, 
            t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; null !== n; ) e = r, (i = n).flags &= 14680066, 
            null === (o = i.alternate) ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, 
            i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, 
            i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, 
            i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, 
            i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = null === e ? null : {
              lanes: e.lanes,
              firstContext: e.firstContext
            }), n = n.sibling;
            return Da(ko, 1 & ko.current | 2), t.child;
          }
          e = e.sibling;
        }
        null !== i.tail && ct() > tu && (t.flags |= 128, r = !0, al(i, !1), t.lanes = 4194304);
      } else {
        if (!r) if (null !== (e = wo(o))) {
          if (t.flags |= 128, r = !0, null !== (n = e.updateQueue) && (t.updateQueue = n, 
          t.flags |= 4), al(i, !0), null === i.tail && "hidden" === i.tailMode && !o.alternate && !vi) return il(t), 
          null;
        } else 2 * ct() - i.renderingStartTime > tu && 1073741824 !== n && (t.flags |= 128, 
        r = !0, al(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (null !== (n = i.last) ? n.sibling = o : t.child = o, 
        i.last = o);
      }
      return null !== i.tail ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = ct(), 
      t.sibling = null, n = ko.current, Da(ko, r ? 1 & n | 2 : 1 & n), t) : (il(t), null);

     case 22:
     case 23:
      return Su(), r = null !== t.memoizedState, null !== e && null !== e.memoizedState !== r && (t.flags |= 8192), 
      r && 0 != (1 & t.mode) ? 0 != (1073741824 & Wl) && (il(t), 6 & t.subtreeFlags && (t.flags |= 8192)) : il(t), 
      null;

     case 24:
     case 25:
      return null;
    }
    throw Error(b(156, t.tag));
  }
  function sl(e, t) {
    switch (mi(t), t.tag) {
     case 1:
      return Wa(t.type) && Ha(), 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, 
      t) : null;

     case 3:
      return bo(), Fa(Ba), Fa(Za), So(), 0 != (65536 & (e = t.flags)) && 0 == (128 & e) ? (t.flags = -65537 & e | 128, 
      t) : null;

     case 5:
      return xo(t), null;

     case 13:
      if (Fa(ko), null !== (e = t.memoizedState) && null !== e.dehydrated) {
        if (null === t.alternate) throw Error(b(340));
        Ai();
      }
      return 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;

     case 19:
      return Fa(ko), null;

     case 4:
      return bo(), null;

     case 10:
      return Li(t.type._context), null;

     case 22:
     case 23:
      return Su(), null;

     default:
      return null;
    }
  }
  Ws = function(e, t) {
    for (var n = t.child; null !== n; ) {
      if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode); else if (4 !== n.tag && null !== n.child) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (;null === n.sibling; ) {
        if (null === n.return || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, Hs = function(e, t, n, r) {
    var a = e.memoizedProps;
    if (a !== r) {
      e = t.stateNode, go(po.current);
      var i, o = null;
      switch (n) {
       case "input":
        a = le(e, a), r = le(e, r), o = [];
        break;

       case "select":
        a = Q({}, a, {
          value: void 0
        }), r = Q({}, r, {
          value: void 0
        }), o = [];
        break;

       case "textarea":
        a = ge(e, a), r = ge(e, r), o = [];
        break;

       default:
        "function" != typeof a.onClick && "function" == typeof r.onClick && (e.onclick = fa);
      }
      for (u in Te(n, r), n = null, a) if (!r.hasOwnProperty(u) && a.hasOwnProperty(u) && null != a[u]) if ("style" === u) {
        var s = a[u];
        for (i in s) s.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
      } else "dangerouslySetInnerHTML" !== u && "children" !== u && "suppressContentEditableWarning" !== u && "suppressHydrationWarning" !== u && "autoFocus" !== u && (x.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
      for (u in r) {
        var l = r[u];
        if (s = null != a ? a[u] : void 0, r.hasOwnProperty(u) && l !== s && (null != l || null != s)) if ("style" === u) if (s) {
          for (i in s) !s.hasOwnProperty(i) || l && l.hasOwnProperty(i) || (n || (n = {}), 
          n[i] = "");
          for (i in l) l.hasOwnProperty(i) && s[i] !== l[i] && (n || (n = {}), n[i] = l[i]);
        } else n || (o || (o = []), o.push(u, n)), n = l; else "dangerouslySetInnerHTML" === u ? (l = l ? l.__html : void 0, 
        s = s ? s.__html : void 0, null != l && s !== l && (o = o || []).push(u, l)) : "children" === u ? "string" != typeof l && "number" != typeof l || (o = o || []).push(u, "" + l) : "suppressContentEditableWarning" !== u && "suppressHydrationWarning" !== u && (x.hasOwnProperty(u) ? (null != l && "onScroll" === u && Xr("scroll", e), 
        o || s === l || (o = [])) : (o = o || []).push(u, l));
      }
      n && (o = o || []).push("style", n);
      var u = o;
      (t.updateQueue = u) && (t.flags |= 4);
    }
  }, qs = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  var ll = !1, ul = !1, cl = "function" == typeof WeakSet ? WeakSet : Set, dl = null;
  function fl(e, t) {
    var n = e.ref;
    if (null !== n) if ("function" == typeof n) try {
      n(null);
    } catch (n) {
      Iu(e, t, n);
    } else n.current = null;
  }
  function pl(e, t, n) {
    try {
      n();
    } catch (n) {
      Iu(e, t, n);
    }
  }
  var ml = !1;
  function hl(e, t, n) {
    var r = t.updateQueue;
    if (null !== (r = null !== r ? r.lastEffect : null)) {
      var a = r = r.next;
      do {
        if ((a.tag & e) === e) {
          var i = a.destroy;
          a.destroy = void 0, void 0 !== i && pl(t, n, i);
        }
        a = a.next;
      } while (a !== r);
    }
  }
  function gl(e, t) {
    if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function vl(e) {
    var t = e.ref;
    if (null !== t) {
      var n = e.stateNode;
      e.tag, e = n, "function" == typeof t ? t(e) : t.current = e;
    }
  }
  function bl(e) {
    var t = e.alternate;
    null !== t && (e.alternate = null, bl(t)), e.child = null, e.deletions = null, e.sibling = null, 
    5 === e.tag && (null !== (t = e.stateNode) && (delete t[Ca], delete t[Aa], delete t[ja], 
    delete t[Na], delete t[Pa])), e.stateNode = null, e.return = null, e.dependencies = null, 
    e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, 
    e.updateQueue = null;
  }
  function yl(e) {
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }
  function xl(e) {
    e: for (;;) {
      for (;null === e.sibling; ) {
        if (null === e.return || yl(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag; ) {
        if (2 & e.flags) continue e;
        if (null === e.child || 4 === e.tag) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(2 & e.flags)) return e.stateNode;
    }
  }
  function kl(e, t, n) {
    var r = e.tag;
    if (5 === r || 6 === r) e = e.stateNode, t ? 8 === n.nodeType ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e), 
    null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = fa)); else if (4 !== r && null !== (e = e.child)) for (kl(e, t, n), 
    e = e.sibling; null !== e; ) kl(e, t, n), e = e.sibling;
  }
  function wl(e, t, n) {
    var r = e.tag;
    if (5 === r || 6 === r) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e); else if (4 !== r && null !== (e = e.child)) for (wl(e, t, n), 
    e = e.sibling; null !== e; ) wl(e, t, n), e = e.sibling;
  }
  var _l = null, Sl = !1;
  function Cl(e, t, n) {
    for (n = n.child; null !== n; ) Al(e, t, n), n = n.sibling;
  }
  function Al(e, t, n) {
    if (bt && "function" == typeof bt.onCommitFiberUnmount) try {
      bt.onCommitFiberUnmount(vt, n);
    } catch (e) {}
    switch (n.tag) {
     case 5:
      ul || fl(n, t);

     case 6:
      var r = _l, a = Sl;
      _l = null, Cl(e, t, n), Sl = a, null !== (_l = r) && (Sl ? (e = _l, n = n.stateNode, 
      8 === e.nodeType ? e.parentNode.removeChild(n) : e.removeChild(n)) : _l.removeChild(n.stateNode));
      break;

     case 18:
      null !== _l && (Sl ? (e = _l, n = n.stateNode, 8 === e.nodeType ? ka(e.parentNode, n) : 1 === e.nodeType && ka(e, n), 
      tn(e)) : ka(_l, n.stateNode));
      break;

     case 4:
      r = _l, a = Sl, _l = n.stateNode.containerInfo, Sl = !0, Cl(e, t, n), _l = r, Sl = a;
      break;

     case 0:
     case 11:
     case 14:
     case 15:
      if (!ul && (null !== (r = n.updateQueue) && null !== (r = r.lastEffect))) {
        a = r = r.next;
        do {
          var i = a, o = i.destroy;
          i = i.tag, void 0 !== o && (0 != (2 & i) || 0 != (4 & i)) && pl(n, t, o), a = a.next;
        } while (a !== r);
      }
      Cl(e, t, n);
      break;

     case 1:
      if (!ul && (fl(n, t), "function" == typeof (r = n.stateNode).componentWillUnmount)) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (e) {
        Iu(n, t, e);
      }
      Cl(e, t, n);
      break;

     case 21:
      Cl(e, t, n);
      break;

     case 22:
      1 & n.mode ? (ul = (r = ul) || null !== n.memoizedState, Cl(e, t, n), ul = r) : Cl(e, t, n);
      break;

     default:
      Cl(e, t, n);
    }
  }
  function El(e) {
    var t = e.updateQueue;
    if (null !== t) {
      e.updateQueue = null;
      var n = e.stateNode;
      null === n && (n = e.stateNode = new cl), t.forEach((function(t) {
        var r = Zu.bind(null, e, t);
        n.has(t) || (n.add(t), t.then(r, r));
      }));
    }
  }
  function jl(e, t) {
    var n = t.deletions;
    if (null !== n) for (var r = 0; r < n.length; r++) {
      var a = n[r];
      try {
        var i = e, o = t, s = o;
        e: for (;null !== s; ) {
          switch (s.tag) {
           case 5:
            _l = s.stateNode, Sl = !1;
            break e;

           case 3:
           case 4:
            _l = s.stateNode.containerInfo, Sl = !0;
            break e;
          }
          s = s.return;
        }
        if (null === _l) throw Error(b(160));
        Al(i, o, a), _l = null, Sl = !1;
        var l = a.alternate;
        null !== l && (l.return = null), a.return = null;
      } catch (e) {
        Iu(a, t, e);
      }
    }
    if (12854 & t.subtreeFlags) for (t = t.child; null !== t; ) Nl(t, e), t = t.sibling;
  }
  function Nl(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
     case 0:
     case 11:
     case 14:
     case 15:
      if (jl(t, e), Pl(e), 4 & r) {
        try {
          hl(3, e, e.return), gl(3, e);
        } catch (t) {
          Iu(e, e.return, t);
        }
        try {
          hl(5, e, e.return);
        } catch (t) {
          Iu(e, e.return, t);
        }
      }
      break;

     case 1:
      jl(t, e), Pl(e), 512 & r && null !== n && fl(n, n.return);
      break;

     case 5:
      if (jl(t, e), Pl(e), 512 & r && null !== n && fl(n, n.return), 32 & e.flags) {
        var a = e.stateNode;
        try {
          Ce(a, "");
        } catch (t) {
          Iu(e, e.return, t);
        }
      }
      if (4 & r && null != (a = e.stateNode)) {
        var i = e.memoizedProps, o = null !== n ? n.memoizedProps : i, s = e.type, l = e.updateQueue;
        if (e.updateQueue = null, null !== l) try {
          "input" === s && "radio" === i.type && null != i.name && ce(a, i), Oe(s, o);
          var u = Oe(s, i);
          for (o = 0; o < l.length; o += 2) {
            var c = l[o], d = l[o + 1];
            "style" === c ? Ne(a, d) : "dangerouslySetInnerHTML" === c ? Se(a, d) : "children" === c ? Ce(a, d) : O(a, c, d, u);
          }
          switch (s) {
           case "input":
            de(a, i);
            break;

           case "textarea":
            be(a, i);
            break;

           case "select":
            var f = a._wrapperState.wasMultiple;
            a._wrapperState.wasMultiple = !!i.multiple;
            var p = i.value;
            null != p ? he(a, !!i.multiple, p, !1) : f !== !!i.multiple && (null != i.defaultValue ? he(a, !!i.multiple, i.defaultValue, !0) : he(a, !!i.multiple, i.multiple ? [] : "", !1));
          }
          a[Aa] = i;
        } catch (t) {
          Iu(e, e.return, t);
        }
      }
      break;

     case 6:
      if (jl(t, e), Pl(e), 4 & r) {
        if (null === e.stateNode) throw Error(b(162));
        a = e.stateNode, i = e.memoizedProps;
        try {
          a.nodeValue = i;
        } catch (t) {
          Iu(e, e.return, t);
        }
      }
      break;

     case 3:
      if (jl(t, e), Pl(e), 4 & r && null !== n && n.memoizedState.isDehydrated) try {
        tn(t.containerInfo);
      } catch (t) {
        Iu(e, e.return, t);
      }
      break;

     case 4:
     default:
      jl(t, e), Pl(e);
      break;

     case 13:
      jl(t, e), Pl(e), 8192 & (a = e.child).flags && (i = null !== a.memoizedState, a.stateNode.isHidden = i, 
      !i || null !== a.alternate && null !== a.alternate.memoizedState || (eu = ct())), 
      4 & r && El(e);
      break;

     case 22:
      if (c = null !== n && null !== n.memoizedState, 1 & e.mode ? (ul = (u = ul) || c, 
      jl(t, e), ul = u) : jl(t, e), Pl(e), 8192 & r) {
        if (u = null !== e.memoizedState, (e.stateNode.isHidden = u) && !c && 0 != (1 & e.mode)) for (dl = e, 
        c = e.child; null !== c; ) {
          for (d = dl = c; null !== dl; ) {
            switch (p = (f = dl).child, f.tag) {
             case 0:
             case 11:
             case 14:
             case 15:
              hl(4, f, f.return);
              break;

             case 1:
              fl(f, f.return);
              var m = f.stateNode;
              if ("function" == typeof m.componentWillUnmount) {
                r = f, n = f.return;
                try {
                  t = r, m.props = t.memoizedProps, m.state = t.memoizedState, m.componentWillUnmount();
                } catch (e) {
                  Iu(r, n, e);
                }
              }
              break;

             case 5:
              fl(f, f.return);
              break;

             case 22:
              if (null !== f.memoizedState) {
                Ml(d);
                continue;
              }
            }
            null !== p ? (p.return = f, dl = p) : Ml(d);
          }
          c = c.sibling;
        }
        e: for (c = null, d = e; ;) {
          if (5 === d.tag) {
            if (null === c) {
              c = d;
              try {
                a = d.stateNode, u ? "function" == typeof (i = a.style).setProperty ? i.setProperty("display", "none", "important") : i.display = "none" : (s = d.stateNode, 
                o = null != (l = d.memoizedProps.style) && l.hasOwnProperty("display") ? l.display : null, 
                s.style.display = je("display", o));
              } catch (t) {
                Iu(e, e.return, t);
              }
            }
          } else if (6 === d.tag) {
            if (null === c) try {
              d.stateNode.nodeValue = u ? "" : d.memoizedProps;
            } catch (t) {
              Iu(e, e.return, t);
            }
          } else if ((22 !== d.tag && 23 !== d.tag || null === d.memoizedState || d === e) && null !== d.child) {
            d.child.return = d, d = d.child;
            continue;
          }
          if (d === e) break e;
          for (;null === d.sibling; ) {
            if (null === d.return || d.return === e) break e;
            c === d && (c = null), d = d.return;
          }
          c === d && (c = null), d.sibling.return = d.return, d = d.sibling;
        }
      }
      break;

     case 19:
      jl(t, e), Pl(e), 4 & r && El(e);

     case 21:
    }
  }
  function Pl(e) {
    var t = e.flags;
    if (2 & t) {
      try {
        e: {
          for (var n = e.return; null !== n; ) {
            if (yl(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(b(160));
        }
        switch (r.tag) {
         case 5:
          var a = r.stateNode;
          32 & r.flags && (Ce(a, ""), r.flags &= -33), wl(e, xl(e), a);
          break;

         case 3:
         case 4:
          var i = r.stateNode.containerInfo;
          kl(e, xl(e), i);
          break;

         default:
          throw Error(b(161));
        }
      } catch (t) {
        Iu(e, e.return, t);
      }
      e.flags &= -3;
    }
    4096 & t && (e.flags &= -4097);
  }
  function Tl(e, t, n) {
    dl = e, Ol(e, t, n);
  }
  function Ol(e, t, n) {
    for (var r = 0 != (1 & e.mode); null !== dl; ) {
      var a = dl, i = a.child;
      if (22 === a.tag && r) {
        var o = null !== a.memoizedState || ll;
        if (!o) {
          var s = a.alternate, l = null !== s && null !== s.memoizedState || ul;
          s = ll;
          var u = ul;
          if (ll = o, (ul = l) && !u) for (dl = a; null !== dl; ) l = (o = dl).child, 22 === o.tag && null !== o.memoizedState ? Ll(a) : null !== l ? (l.return = o, 
          dl = l) : Ll(a);
          for (;null !== i; ) dl = i, Ol(i, t, n), i = i.sibling;
          dl = a, ll = s, ul = u;
        }
        zl(e);
      } else 0 != (8772 & a.subtreeFlags) && null !== i ? (i.return = a, dl = i) : zl(e);
    }
  }
  function zl(e) {
    for (;null !== dl; ) {
      var t = dl;
      if (0 != (8772 & t.flags)) {
        var n = t.alternate;
        try {
          if (0 != (8772 & t.flags)) switch (t.tag) {
           case 0:
           case 11:
           case 15:
            ul || gl(5, t);
            break;

           case 1:
            var r = t.stateNode;
            if (4 & t.flags && !ul) if (null === n) r.componentDidMount(); else {
              var a = t.elementType === t.type ? n.memoizedProps : Ni(t.type, n.memoizedProps);
              r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            null !== i && Gi(t, i, r);
            break;

           case 3:
            var o = t.updateQueue;
            if (null !== o) {
              if (n = null, null !== t.child) switch (t.child.tag) {
               case 5:
               case 1:
                n = t.child.stateNode;
              }
              Gi(t, o, n);
            }
            break;

           case 5:
            var s = t.stateNode;
            if (null === n && 4 & t.flags) {
              n = s;
              var l = t.memoizedProps;
              switch (t.type) {
               case "button":
               case "input":
               case "select":
               case "textarea":
                l.autoFocus && n.focus();
                break;

               case "img":
                l.src && (n.src = l.src);
              }
            }
            break;

           case 6:
           case 4:
           case 12:
           case 19:
           case 17:
           case 21:
           case 22:
           case 23:
           case 25:
            break;

           case 13:
            if (null === t.memoizedState) {
              var u = t.alternate;
              if (null !== u) {
                var c = u.memoizedState;
                if (null !== c) {
                  var d = c.dehydrated;
                  null !== d && tn(d);
                }
              }
            }
            break;

           default:
            throw Error(b(163));
          }
          ul || 512 & t.flags && vl(t);
        } catch (e) {
          Iu(t, t.return, e);
        }
      }
      if (t === e) {
        dl = null;
        break;
      }
      if (null !== (n = t.sibling)) {
        n.return = t.return, dl = n;
        break;
      }
      dl = t.return;
    }
  }
  function Ml(e) {
    for (;null !== dl; ) {
      var t = dl;
      if (t === e) {
        dl = null;
        break;
      }
      var n = t.sibling;
      if (null !== n) {
        n.return = t.return, dl = n;
        break;
      }
      dl = t.return;
    }
  }
  function Ll(e) {
    for (;null !== dl; ) {
      var t = dl;
      try {
        switch (t.tag) {
         case 0:
         case 11:
         case 15:
          var n = t.return;
          try {
            gl(4, t);
          } catch (e) {
            Iu(t, n, e);
          }
          break;

         case 1:
          var r = t.stateNode;
          if ("function" == typeof r.componentDidMount) {
            var a = t.return;
            try {
              r.componentDidMount();
            } catch (e) {
              Iu(t, a, e);
            }
          }
          var i = t.return;
          try {
            vl(t);
          } catch (e) {
            Iu(t, i, e);
          }
          break;

         case 5:
          var o = t.return;
          try {
            vl(t);
          } catch (e) {
            Iu(t, o, e);
          }
        }
      } catch (e) {
        Iu(t, t.return, e);
      }
      if (t === e) {
        dl = null;
        break;
      }
      var s = t.sibling;
      if (null !== s) {
        s.return = t.return, dl = s;
        break;
      }
      dl = t.return;
    }
  }
  var Rl, Il = Math.ceil, Fl = z.ReactCurrentDispatcher, Dl = z.ReactCurrentOwner, Ul = z.ReactCurrentBatchConfig, Zl = 0, Bl = null, Vl = null, $l = 0, Wl = 0, Hl = Ia(0), ql = 0, Kl = null, Yl = 0, Ql = 0, Gl = 0, Xl = null, Jl = null, eu = 0, tu = 1 / 0, nu = null, ru = !1, au = null, iu = null, ou = !1, su = null, lu = 0, uu = 0, cu = null, du = -1, fu = 0;
  function pu() {
    return 0 != (6 & Zl) ? ct() : -1 !== du ? du : du = ct();
  }
  function mu(e) {
    return 0 == (1 & e.mode) ? 1 : 0 != (2 & Zl) && 0 !== $l ? $l & -$l : null !== ji.transition ? (0 === fu && (fu = jt()), 
    fu) : 0 !== (e = Ot) ? e : e = void 0 === (e = window.event) ? 16 : cn(e.type);
  }
  function hu(e, t, n, r) {
    if (50 < uu) throw uu = 0, cu = null, Error(b(185));
    Pt(e, n, r), 0 != (2 & Zl) && e === Bl || (e === Bl && (0 == (2 & Zl) && (Ql |= n), 
    4 === ql && xu(e, $l)), gu(e, r), 1 === n && 0 === Zl && 0 == (1 & t.mode) && (tu = ct() + 500, 
    Xa && ti()));
  }
  function gu(e, t) {
    var n = e.callbackNode;
    !function(e, t) {
      for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
        var o = 31 - yt(i), s = 1 << o, l = a[o];
        -1 === l ? 0 != (s & n) && 0 == (s & r) || (a[o] = At(s, t)) : l <= t && (e.expiredLanes |= s), 
        i &= ~s;
      }
    }(e, t);
    var r = Ct(e, e === Bl ? $l : 0);
    if (0 === r) null !== n && st(n), e.callbackNode = null, e.callbackPriority = 0; else if (t = r & -r, 
    e.callbackPriority !== t) {
      if (null != n && st(n), 1 === t) 0 === e.tag ? function(e) {
        Xa = !0, ei(e);
      }(ku.bind(null, e)) : ei(ku.bind(null, e)), ya((function() {
        0 == (6 & Zl) && ti();
      })), n = null; else {
        switch (zt(r)) {
         case 1:
          n = ft;
          break;

         case 4:
          n = pt;
          break;

         case 16:
         default:
          n = mt;
          break;

         case 536870912:
          n = gt;
        }
        n = Bu(n, vu.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function vu(e, t) {
    if (du = -1, fu = 0, 0 != (6 & Zl)) throw Error(b(327));
    var n = e.callbackNode;
    if (Lu() && e.callbackNode !== n) return null;
    var r = Ct(e, e === Bl ? $l : 0);
    if (0 === r) return null;
    if (0 != (30 & r) || 0 != (r & e.expiredLanes) || t) t = Nu(e, r); else {
      t = r;
      var a = Zl;
      Zl |= 2;
      var i = Eu();
      for (Bl === e && $l === t || (nu = null, tu = ct() + 500, Cu(e, t)); ;) try {
        Tu();
        break;
      } catch (t) {
        Au(e, t);
      }
      Mi(), Fl.current = i, Zl = a, null !== Vl ? t = 0 : (Bl = null, $l = 0, t = ql);
    }
    if (0 !== t) {
      if (2 === t && (0 !== (a = Et(e)) && (r = a, t = bu(e, a))), 1 === t) throw n = Kl, 
      Cu(e, 0), xu(e, r), gu(e, ct()), n;
      if (6 === t) xu(e, r); else {
        if (a = e.current.alternate, 0 == (30 & r) && !function(e) {
          for (var t = e; ;) {
            if (16384 & t.flags) {
              var n = t.updateQueue;
              if (null !== n && null !== (n = n.stores)) for (var r = 0; r < n.length; r++) {
                var a = n[r], i = a.getSnapshot;
                a = a.value;
                try {
                  if (!xr(i(), a)) return !1;
                } catch (e) {
                  return !1;
                }
              }
            }
            if (n = t.child, 16384 & t.subtreeFlags && null !== n) n.return = t, t = n; else {
              if (t === e) break;
              for (;null === t.sibling; ) {
                if (null === t.return || t.return === e) return !0;
                t = t.return;
              }
              t.sibling.return = t.return, t = t.sibling;
            }
          }
          return !0;
        }(a) && (2 === (t = Nu(e, r)) && (0 !== (i = Et(e)) && (r = i, t = bu(e, i))), 1 === t)) throw n = Kl, 
        Cu(e, 0), xu(e, r), gu(e, ct()), n;
        switch (e.finishedWork = a, e.finishedLanes = r, t) {
         case 0:
         case 1:
          throw Error(b(345));

         case 2:
         case 5:
          Mu(e, Jl, nu);
          break;

         case 3:
          if (xu(e, r), (130023424 & r) === r && 10 < (t = eu + 500 - ct())) {
            if (0 !== Ct(e, 0)) break;
            if (((a = e.suspendedLanes) & r) !== r) {
              pu(), e.pingedLanes |= e.suspendedLanes & a;
              break;
            }
            e.timeoutHandle = ga(Mu.bind(null, e, Jl, nu), t);
            break;
          }
          Mu(e, Jl, nu);
          break;

         case 4:
          if (xu(e, r), (4194240 & r) === r) break;
          for (t = e.eventTimes, a = -1; 0 < r; ) {
            var o = 31 - yt(r);
            i = 1 << o, (o = t[o]) > a && (a = o), r &= ~i;
          }
          if (r = a, 10 < (r = (120 > (r = ct() - r) ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Il(r / 1960)) - r)) {
            e.timeoutHandle = ga(Mu.bind(null, e, Jl, nu), r);
            break;
          }
          Mu(e, Jl, nu);
          break;

         default:
          throw Error(b(329));
        }
      }
    }
    return gu(e, ct()), e.callbackNode === n ? vu.bind(null, e) : null;
  }
  function bu(e, t) {
    var n = Xl;
    return e.current.memoizedState.isDehydrated && (Cu(e, t).flags |= 256), 2 !== (e = Nu(e, t)) && (t = Jl, 
    Jl = n, null !== t && yu(t)), e;
  }
  function yu(e) {
    null === Jl ? Jl = e : Jl.push.apply(Jl, e);
  }
  function xu(e, t) {
    for (t &= ~Gl, t &= ~Ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - yt(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function ku(e) {
    if (0 != (6 & Zl)) throw Error(b(327));
    Lu();
    var t = Ct(e, 0);
    if (0 == (1 & t)) return gu(e, ct()), null;
    var n = Nu(e, t);
    if (0 !== e.tag && 2 === n) {
      var r = Et(e);
      0 !== r && (t = r, n = bu(e, r));
    }
    if (1 === n) throw n = Kl, Cu(e, 0), xu(e, t), gu(e, ct()), n;
    if (6 === n) throw Error(b(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Mu(e, Jl, nu), 
    gu(e, ct()), null;
  }
  function wu(e, t) {
    var n = Zl;
    Zl |= 1;
    try {
      return e(t);
    } finally {
      0 === (Zl = n) && (tu = ct() + 500, Xa && ti());
    }
  }
  function _u(e) {
    null !== su && 0 === su.tag && 0 == (6 & Zl) && Lu();
    var t = Zl;
    Zl |= 1;
    var n = Ul.transition, r = Ot;
    try {
      if (Ul.transition = null, Ot = 1, e) return e();
    } finally {
      Ot = r, Ul.transition = n, 0 == (6 & (Zl = t)) && ti();
    }
  }
  function Su() {
    Wl = Hl.current, Fa(Hl);
  }
  function Cu(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (-1 !== n && (e.timeoutHandle = -1, va(n)), null !== Vl) for (n = Vl.return; null !== n; ) {
      var r = n;
      switch (mi(r), r.tag) {
       case 1:
        null != (r = r.type.childContextTypes) && Ha();
        break;

       case 3:
        bo(), Fa(Ba), Fa(Za), So();
        break;

       case 5:
        xo(r);
        break;

       case 4:
        bo();
        break;

       case 13:
       case 19:
        Fa(ko);
        break;

       case 10:
        Li(r.type._context);
        break;

       case 22:
       case 23:
        Su();
      }
      n = n.return;
    }
    if (Bl = e, Vl = e = Hu(e.current, null), $l = Wl = t, ql = 0, Kl = null, Gl = Ql = Yl = 0, 
    Jl = Xl = null, null !== Di) {
      for (t = 0; t < Di.length; t++) if (null !== (r = (n = Di[t]).interleaved)) {
        n.interleaved = null;
        var a = r.next, i = n.pending;
        if (null !== i) {
          var o = i.next;
          i.next = a, r.next = o;
        }
        n.pending = r;
      }
      Di = null;
    }
    return e;
  }
  function Au(e, t) {
    for (;;) {
      var n = Vl;
      try {
        if (Mi(), Co.current = ys, To) {
          for (var r = jo.memoizedState; null !== r; ) {
            var a = r.queue;
            null !== a && (a.pending = null), r = r.next;
          }
          To = !1;
        }
        if (Eo = 0, Po = No = jo = null, Oo = !1, zo = 0, Dl.current = null, null === n || null === n.return) {
          ql = 1, Kl = t, Vl = null;
          break;
        }
        e: {
          var i = e, o = n.return, s = n, l = t;
          if (t = $l, s.flags |= 32768, null !== l && "object" == typeof l && "function" == typeof l.then) {
            var u = l, c = s, d = c.tag;
            if (0 == (1 & c.mode) && (0 === d || 11 === d || 15 === d)) {
              var f = c.alternate;
              f ? (c.updateQueue = f.updateQueue, c.memoizedState = f.memoizedState, c.lanes = f.lanes) : (c.updateQueue = null, 
              c.memoizedState = null);
            }
            var p = Ps(o);
            if (null !== p) {
              p.flags &= -257, Ts(p, o, s, 0, t), 1 & p.mode && Ns(i, u, t), l = u;
              var m = (t = p).updateQueue;
              if (null === m) {
                var h = new Set;
                h.add(l), t.updateQueue = h;
              } else m.add(l);
              break e;
            }
            if (0 == (1 & t)) {
              Ns(i, u, t), ju();
              break e;
            }
            l = Error(b(426));
          } else if (vi && 1 & s.mode) {
            var g = Ps(o);
            if (null !== g) {
              0 == (65536 & g.flags) && (g.flags |= 256), Ts(g, o, s, 0, t), Ei(_s(l, s));
              break e;
            }
          }
          i = l = _s(l, s), 4 !== ql && (ql = 2), null === Xl ? Xl = [ i ] : Xl.push(i), i = o;
          do {
            switch (i.tag) {
             case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t, Yi(i, Es(0, l, t));
              break e;

             case 1:
              s = l;
              var v = i.type, y = i.stateNode;
              if (0 == (128 & i.flags) && ("function" == typeof v.getDerivedStateFromError || null !== y && "function" == typeof y.componentDidCatch && (null === iu || !iu.has(y)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t, Yi(i, js(i, s, t));
                break e;
              }
            }
            i = i.return;
          } while (null !== i);
        }
        zu(n);
      } catch (e) {
        t = e, Vl === n && null !== n && (Vl = n = n.return);
        continue;
      }
      break;
    }
  }
  function Eu() {
    var e = Fl.current;
    return Fl.current = ys, null === e ? ys : e;
  }
  function ju() {
    0 !== ql && 3 !== ql && 2 !== ql || (ql = 4), null === Bl || 0 == (268435455 & Yl) && 0 == (268435455 & Ql) || xu(Bl, $l);
  }
  function Nu(e, t) {
    var n = Zl;
    Zl |= 2;
    var r = Eu();
    for (Bl === e && $l === t || (nu = null, Cu(e, t)); ;) try {
      Pu();
      break;
    } catch (t) {
      Au(e, t);
    }
    if (Mi(), Zl = n, Fl.current = r, null !== Vl) throw Error(b(261));
    return Bl = null, $l = 0, ql;
  }
  function Pu() {
    for (;null !== Vl; ) Ou(Vl);
  }
  function Tu() {
    for (;null !== Vl && !lt(); ) Ou(Vl);
  }
  function Ou(e) {
    var t = Rl(e.alternate, e, Wl);
    e.memoizedProps = e.pendingProps, null === t ? zu(e) : Vl = t, Dl.current = null;
  }
  function zu(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, 0 == (32768 & t.flags)) {
        if (null !== (n = ol(n, t, Wl))) return void (Vl = n);
      } else {
        if (null !== (n = sl(n, t))) return n.flags &= 32767, void (Vl = n);
        if (null === e) return ql = 6, void (Vl = null);
        e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      }
      if (null !== (t = t.sibling)) return void (Vl = t);
      Vl = t = e;
    } while (null !== t);
    0 === ql && (ql = 5);
  }
  function Mu(e, t, n) {
    var r = Ot, a = Ul.transition;
    try {
      Ul.transition = null, Ot = 1, function(e, t, n, r) {
        do {
          Lu();
        } while (null !== su);
        if (0 != (6 & Zl)) throw Error(b(327));
        n = e.finishedWork;
        var a = e.finishedLanes;
        if (null === n) return null;
        if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(b(177));
        e.callbackNode = null, e.callbackPriority = 0;
        var i = n.lanes | n.childLanes;
        if (function(e, t) {
          var n = e.pendingLanes & ~t;
          e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, 
          e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
          var r = e.eventTimes;
          for (e = e.expirationTimes; 0 < n; ) {
            var a = 31 - yt(n), i = 1 << a;
            t[a] = 0, r[a] = -1, e[a] = -1, n &= ~i;
          }
        }(e, i), e === Bl && (Vl = Bl = null, $l = 0), 0 == (2064 & n.subtreeFlags) && 0 == (2064 & n.flags) || ou || (ou = !0, 
        Bu(mt, (function() {
          return Lu(), null;
        }))), i = 0 != (15990 & n.flags), 0 != (15990 & n.subtreeFlags) || i) {
          i = Ul.transition, Ul.transition = null;
          var o = Ot;
          Ot = 1;
          var s = Zl;
          Zl |= 4, Dl.current = null, function(e, t) {
            if (pa = rn, Ar(e = Cr())) {
              if ("selectionStart" in e) var n = {
                start: e.selectionStart,
                end: e.selectionEnd
              }; else e: {
                var r = (n = (n = e.ownerDocument) && n.defaultView || window).getSelection && n.getSelection();
                if (r && 0 !== r.rangeCount) {
                  n = r.anchorNode;
                  var a = r.anchorOffset, i = r.focusNode;
                  r = r.focusOffset;
                  try {
                    n.nodeType, i.nodeType;
                  } catch (e) {
                    n = null;
                    break e;
                  }
                  var o = 0, s = -1, l = -1, u = 0, c = 0, d = e, f = null;
                  t: for (;;) {
                    for (var p; d !== n || 0 !== a && 3 !== d.nodeType || (s = o + a), d !== i || 0 !== r && 3 !== d.nodeType || (l = o + r), 
                    3 === d.nodeType && (o += d.nodeValue.length), null !== (p = d.firstChild); ) f = d, 
                    d = p;
                    for (;;) {
                      if (d === e) break t;
                      if (f === n && ++u === a && (s = o), f === i && ++c === r && (l = o), null !== (p = d.nextSibling)) break;
                      f = (d = f).parentNode;
                    }
                    d = p;
                  }
                  n = -1 === s || -1 === l ? null : {
                    start: s,
                    end: l
                  };
                } else n = null;
              }
              n = n || {
                start: 0,
                end: 0
              };
            } else n = null;
            for (ma = {
              focusedElem: e,
              selectionRange: n
            }, rn = !1, dl = t; null !== dl; ) if (e = (t = dl).child, 0 != (1028 & t.subtreeFlags) && null !== e) e.return = t, 
            dl = e; else for (;null !== dl; ) {
              t = dl;
              try {
                var m = t.alternate;
                if (0 != (1024 & t.flags)) switch (t.tag) {
                 case 0:
                 case 11:
                 case 15:
                 case 5:
                 case 6:
                 case 4:
                 case 17:
                  break;

                 case 1:
                  if (null !== m) {
                    var h = m.memoizedProps, g = m.memoizedState, v = t.stateNode, y = v.getSnapshotBeforeUpdate(t.elementType === t.type ? h : Ni(t.type, h), g);
                    v.__reactInternalSnapshotBeforeUpdate = y;
                  }
                  break;

                 case 3:
                  var x = t.stateNode.containerInfo;
                  1 === x.nodeType ? x.textContent = "" : 9 === x.nodeType && x.documentElement && x.removeChild(x.documentElement);
                  break;

                 default:
                  throw Error(b(163));
                }
              } catch (e) {
                Iu(t, t.return, e);
              }
              if (null !== (e = t.sibling)) {
                e.return = t.return, dl = e;
                break;
              }
              dl = t.return;
            }
            m = ml, ml = !1;
          }(e, n), Nl(n, e), Er(ma), rn = !!pa, ma = pa = null, e.current = n, Tl(n, e, a), 
          ut(), Zl = s, Ot = o, Ul.transition = i;
        } else e.current = n;
        if (ou && (ou = !1, su = e, lu = a), i = e.pendingLanes, 0 === i && (iu = null), 
        function(e) {
          if (bt && "function" == typeof bt.onCommitFiberRoot) try {
            bt.onCommitFiberRoot(vt, e, void 0, 128 == (128 & e.current.flags));
          } catch (e) {}
        }(n.stateNode), gu(e, ct()), null !== t) for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], 
        r(a.value, {
          componentStack: a.stack,
          digest: a.digest
        });
        if (ru) throw ru = !1, e = au, au = null, e;
        0 != (1 & lu) && 0 !== e.tag && Lu(), i = e.pendingLanes, 0 != (1 & i) ? e === cu ? uu++ : (uu = 0, 
        cu = e) : uu = 0, ti();
      }(e, t, n, r);
    } finally {
      Ul.transition = a, Ot = r;
    }
    return null;
  }
  function Lu() {
    if (null !== su) {
      var e = zt(lu), t = Ul.transition, n = Ot;
      try {
        if (Ul.transition = null, Ot = 16 > e ? 16 : e, null === su) var r = !1; else {
          if (e = su, su = null, lu = 0, 0 != (6 & Zl)) throw Error(b(331));
          var a = Zl;
          for (Zl |= 4, dl = e.current; null !== dl; ) {
            var i = dl, o = i.child;
            if (0 != (16 & dl.flags)) {
              var s = i.deletions;
              if (null !== s) {
                for (var l = 0; l < s.length; l++) {
                  var u = s[l];
                  for (dl = u; null !== dl; ) {
                    var c = dl;
                    switch (c.tag) {
                     case 0:
                     case 11:
                     case 15:
                      hl(8, c, i);
                    }
                    var d = c.child;
                    if (null !== d) d.return = c, dl = d; else for (;null !== dl; ) {
                      var f = (c = dl).sibling, p = c.return;
                      if (bl(c), c === u) {
                        dl = null;
                        break;
                      }
                      if (null !== f) {
                        f.return = p, dl = f;
                        break;
                      }
                      dl = p;
                    }
                  }
                }
                var m = i.alternate;
                if (null !== m) {
                  var h = m.child;
                  if (null !== h) {
                    m.child = null;
                    do {
                      var g = h.sibling;
                      h.sibling = null, h = g;
                    } while (null !== h);
                  }
                }
                dl = i;
              }
            }
            if (0 != (2064 & i.subtreeFlags) && null !== o) o.return = i, dl = o; else e: for (;null !== dl; ) {
              if (0 != (2048 & (i = dl).flags)) switch (i.tag) {
               case 0:
               case 11:
               case 15:
                hl(9, i, i.return);
              }
              var v = i.sibling;
              if (null !== v) {
                v.return = i.return, dl = v;
                break e;
              }
              dl = i.return;
            }
          }
          var y = e.current;
          for (dl = y; null !== dl; ) {
            var x = (o = dl).child;
            if (0 != (2064 & o.subtreeFlags) && null !== x) x.return = o, dl = x; else e: for (o = y; null !== dl; ) {
              if (0 != (2048 & (s = dl).flags)) try {
                switch (s.tag) {
                 case 0:
                 case 11:
                 case 15:
                  gl(9, s);
                }
              } catch (e) {
                Iu(s, s.return, e);
              }
              if (s === o) {
                dl = null;
                break e;
              }
              var k = s.sibling;
              if (null !== k) {
                k.return = s.return, dl = k;
                break e;
              }
              dl = s.return;
            }
          }
          if (Zl = a, ti(), bt && "function" == typeof bt.onPostCommitFiberRoot) try {
            bt.onPostCommitFiberRoot(vt, e);
          } catch (e) {}
          r = !0;
        }
        return r;
      } finally {
        Ot = n, Ul.transition = t;
      }
    }
    return !1;
  }
  function Ru(e, t, n) {
    e = qi(e, t = Es(0, t = _s(n, t), 1), 1), t = pu(), null !== e && (Pt(e, 1, t), 
    gu(e, t));
  }
  function Iu(e, t, n) {
    if (3 === e.tag) Ru(e, e, n); else for (;null !== t; ) {
      if (3 === t.tag) {
        Ru(t, e, n);
        break;
      }
      if (1 === t.tag) {
        var r = t.stateNode;
        if ("function" == typeof t.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === iu || !iu.has(r))) {
          t = qi(t, e = js(t, e = _s(n, e), 1), 1), e = pu(), null !== t && (Pt(t, 1, e), 
          gu(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Fu(e, t, n) {
    var r = e.pingCache;
    null !== r && r.delete(t), t = pu(), e.pingedLanes |= e.suspendedLanes & n, Bl === e && ($l & n) === n && (4 === ql || 3 === ql && (130023424 & $l) === $l && 500 > ct() - eu ? Cu(e, 0) : Gl |= n), 
    gu(e, t);
  }
  function Du(e, t) {
    0 === t && (0 == (1 & e.mode) ? t = 1 : (t = _t, 0 == (130023424 & (_t <<= 1)) && (_t = 4194304)));
    var n = pu();
    null !== (e = Bi(e, t)) && (Pt(e, t, n), gu(e, n));
  }
  function Uu(e) {
    var t = e.memoizedState, n = 0;
    null !== t && (n = t.retryLane), Du(e, n);
  }
  function Zu(e, t) {
    var n = 0;
    switch (e.tag) {
     case 13:
      var r = e.stateNode, a = e.memoizedState;
      null !== a && (n = a.retryLane);
      break;

     case 19:
      r = e.stateNode;
      break;

     default:
      throw Error(b(314));
    }
    null !== r && r.delete(t), Du(e, n);
  }
  function Bu(e, t) {
    return ot(e, t);
  }
  function Vu(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, 
    this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, 
    this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, 
    this.alternate = null;
  }
  function $u(e, t, n, r) {
    return new Vu(e, t, n, r);
  }
  function Wu(e) {
    return !(!(e = e.prototype) || !e.isReactComponent);
  }
  function Hu(e, t) {
    var n = e.alternate;
    return null === n ? ((n = $u(e.tag, t, e.key, e.mode)).elementType = e.elementType, 
    n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, 
    n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = 14680064 & e.flags, 
    n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, 
    n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, 
    n.dependencies = null === t ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function qu(e, t, n, r, a, i) {
    var o = 2;
    if (r = e, "function" == typeof e) Wu(e) && (o = 1); else if ("string" == typeof e) o = 5; else e: switch (e) {
     case R:
      return Ku(n.children, a, i, t);

     case I:
      o = 8, a |= 8;
      break;

     case F:
      return (e = $u(12, n, t, 2 | a)).elementType = F, e.lanes = i, e;

     case B:
      return (e = $u(13, n, t, a)).elementType = B, e.lanes = i, e;

     case V:
      return (e = $u(19, n, t, a)).elementType = V, e.lanes = i, e;

     case H:
      return Yu(n, a, i, t);

     default:
      if ("object" == typeof e && null !== e) switch (e.$$typeof) {
       case D:
        o = 10;
        break e;

       case U:
        o = 9;
        break e;

       case Z:
        o = 11;
        break e;

       case $:
        o = 14;
        break e;

       case W:
        o = 16, r = null;
        break e;
      }
      throw Error(b(130, null == e ? e : typeof e, ""));
    }
    return (t = $u(o, n, t, a)).elementType = e, t.type = r, t.lanes = i, t;
  }
  function Ku(e, t, n, r) {
    return (e = $u(7, e, r, t)).lanes = n, e;
  }
  function Yu(e, t, n, r) {
    return (e = $u(22, e, r, t)).elementType = H, e.lanes = n, e.stateNode = {
      isHidden: !1
    }, e;
  }
  function Qu(e, t, n) {
    return (e = $u(6, e, null, t)).lanes = n, e;
  }
  function Gu(e, t, n) {
    return (t = $u(4, null !== e.children ? e.children : [], e.key, t)).lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  function Xu(e, t, n, r, a) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, 
    this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, 
    this.callbackPriority = 0, this.eventTimes = Nt(0), this.expirationTimes = Nt(-1), 
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, 
    this.entanglements = Nt(0), this.identifierPrefix = r, this.onRecoverableError = a, 
    this.mutableSourceEagerHydrationData = null;
  }
  function Ju(e, t, n, r, a, i, o, s, l) {
    return e = new Xu(e, t, n, s, l), 1 === t ? (t = 1, !0 === i && (t |= 8)) : t = 0, 
    i = $u(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null
    }, $i(i), e;
  }
  function ec(e, t, n) {
    var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: L,
      key: null == r ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  function tc(e) {
    if (!e) return Ua;
    e: {
      if (tt(e = e._reactInternals) !== e || 1 !== e.tag) throw Error(b(170));
      var t = e;
      do {
        switch (t.tag) {
         case 3:
          t = t.stateNode.context;
          break e;

         case 1:
          if (Wa(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
        }
        t = t.return;
      } while (null !== t);
      throw Error(b(171));
    }
    if (1 === e.tag) {
      var n = e.type;
      if (Wa(n)) return Ka(e, n, t);
    }
    return t;
  }
  function nc(e, t, n, r, a, i, o, s, l) {
    return (e = Ju(n, r, !0, e, 0, i, 0, s, l)).context = tc(null), n = e.current, (i = Hi(r = pu(), a = mu(n))).callback = null != t ? t : null, 
    qi(n, i, a), e.current.lanes = a, Pt(e, a, r), gu(e, r), e;
  }
  function rc(e, t, n, r) {
    var a = t.current, i = pu(), o = mu(a);
    return n = tc(n), null === t.context ? t.context = n : t.pendingContext = n, (t = Hi(i, o)).payload = {
      element: e
    }, null !== (r = void 0 === r ? null : r) && (t.callback = r), null !== (e = qi(a, t, o)) && (hu(e, a, o, i), 
    Ki(e, a, o)), o;
  }
  function ac(e) {
    return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null;
  }
  function ic(e, t) {
    if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
      var n = e.retryLane;
      e.retryLane = 0 !== n && n < t ? n : t;
    }
  }
  function oc(e, t) {
    ic(e, t), (e = e.alternate) && ic(e, t);
  }
  Rl = function(e, t, n) {
    if (null !== e) if (e.memoizedProps !== t.pendingProps || Ba.current) zs = !0; else {
      if (0 == (e.lanes & n) && 0 == (128 & t.flags)) return zs = !1, function(e, t, n) {
        switch (t.tag) {
         case 3:
          Vs(t), Ai();
          break;

         case 5:
          yo(t);
          break;

         case 1:
          Wa(t.type) && Ya(t);
          break;

         case 4:
          vo(t, t.stateNode.containerInfo);
          break;

         case 10:
          var r = t.type._context, a = t.memoizedProps.value;
          Da(Pi, r._currentValue), r._currentValue = a;
          break;

         case 13:
          if (null !== (r = t.memoizedState)) return null !== r.dehydrated ? (Da(ko, 1 & ko.current), 
          t.flags |= 128, null) : 0 != (n & t.child.childLanes) ? Qs(e, t, n) : (Da(ko, 1 & ko.current), 
          null !== (e = rl(e, t, n)) ? e.sibling : null);
          Da(ko, 1 & ko.current);
          break;

         case 19:
          if (r = 0 != (n & t.childLanes), 0 != (128 & e.flags)) {
            if (r) return tl(e, t, n);
            t.flags |= 128;
          }
          if (null !== (a = t.memoizedState) && (a.rendering = null, a.tail = null, a.lastEffect = null), 
          Da(ko, ko.current), r) break;
          return null;

         case 22:
         case 23:
          return t.lanes = 0, Fs(e, t, n);
        }
        return rl(e, t, n);
      }(e, t, n);
      zs = 0 != (131072 & e.flags);
    } else zs = !1, vi && 0 != (1048576 & t.flags) && fi(t, ii, t.index);
    switch (t.lanes = 0, t.tag) {
     case 2:
      var r = t.type;
      nl(e, t), e = t.pendingProps;
      var a = $a(t, Za.current);
      Ii(t, n), a = Io(null, t, r, e, a, n);
      var i = Fo();
      return t.flags |= 1, "object" == typeof a && null !== a && "function" == typeof a.render && void 0 === a.$$typeof ? (t.tag = 1, 
      t.memoizedState = null, t.updateQueue = null, Wa(r) ? (i = !0, Ya(t)) : i = !1, 
      t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null, $i(t), 
      a.updater = eo, t.stateNode = a, a._reactInternals = t, ao(t, r, e, n), t = Bs(null, t, r, !0, i, n)) : (t.tag = 0, 
      vi && i && pi(t), Ms(null, t, a, n), t = t.child), t;

     case 16:
      r = t.elementType;
      e: {
        switch (nl(e, t), e = t.pendingProps, r = (a = r._init)(r._payload), t.type = r, 
        a = t.tag = function(e) {
          if ("function" == typeof e) return Wu(e) ? 1 : 0;
          if (null != e) {
            if ((e = e.$$typeof) === Z) return 11;
            if (e === $) return 14;
          }
          return 2;
        }(r), e = Ni(r, e), a) {
         case 0:
          t = Us(null, t, r, e, n);
          break e;

         case 1:
          t = Zs(null, t, r, e, n);
          break e;

         case 11:
          t = Ls(null, t, r, e, n);
          break e;

         case 14:
          t = Rs(null, t, r, Ni(r.type, e), n);
          break e;
        }
        throw Error(b(306, r, ""));
      }
      return t;

     case 0:
      return r = t.type, a = t.pendingProps, Us(e, t, r, a = t.elementType === r ? a : Ni(r, a), n);

     case 1:
      return r = t.type, a = t.pendingProps, Zs(e, t, r, a = t.elementType === r ? a : Ni(r, a), n);

     case 3:
      e: {
        if (Vs(t), null === e) throw Error(b(387));
        r = t.pendingProps, a = (i = t.memoizedState).element, Wi(e, t), Qi(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) {
          if (i = {
            element: r,
            isDehydrated: !1,
            cache: o.cache,
            pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
            transitions: o.transitions
          }, t.updateQueue.baseState = i, t.memoizedState = i, 256 & t.flags) {
            t = $s(e, t, r, n, a = _s(Error(b(423)), t));
            break e;
          }
          if (r !== a) {
            t = $s(e, t, r, n, a = _s(Error(b(424)), t));
            break e;
          }
          for (gi = wa(t.stateNode.containerInfo.firstChild), hi = t, vi = !0, bi = null, 
          n = co(t, null, r, n), t.child = n; n; ) n.flags = -3 & n.flags | 4096, n = n.sibling;
        } else {
          if (Ai(), r === a) {
            t = rl(e, t, n);
            break e;
          }
          Ms(e, t, r, n);
        }
        t = t.child;
      }
      return t;

     case 5:
      return yo(t), null === e && wi(t), r = t.type, a = t.pendingProps, i = null !== e ? e.memoizedProps : null, 
      o = a.children, ha(r, a) ? o = null : null !== i && ha(r, i) && (t.flags |= 32), 
      Ds(e, t), Ms(e, t, o, n), t.child;

     case 6:
      return null === e && wi(t), null;

     case 13:
      return Qs(e, t, n);

     case 4:
      return vo(t, t.stateNode.containerInfo), r = t.pendingProps, null === e ? t.child = uo(t, null, r, n) : Ms(e, t, r, n), 
      t.child;

     case 11:
      return r = t.type, a = t.pendingProps, Ls(e, t, r, a = t.elementType === r ? a : Ni(r, a), n);

     case 7:
      return Ms(e, t, t.pendingProps, n), t.child;

     case 8:
     case 12:
      return Ms(e, t, t.pendingProps.children, n), t.child;

     case 10:
      e: {
        if (r = t.type._context, a = t.pendingProps, i = t.memoizedProps, o = a.value, Da(Pi, r._currentValue), 
        r._currentValue = o, null !== i) if (xr(i.value, o)) {
          if (i.children === a.children && !Ba.current) {
            t = rl(e, t, n);
            break e;
          }
        } else for (null !== (i = t.child) && (i.return = t); null !== i; ) {
          var s = i.dependencies;
          if (null !== s) {
            o = i.child;
            for (var l = s.firstContext; null !== l; ) {
              if (l.context === r) {
                if (1 === i.tag) {
                  (l = Hi(-1, n & -n)).tag = 2;
                  var u = i.updateQueue;
                  if (null !== u) {
                    var c = (u = u.shared).pending;
                    null === c ? l.next = l : (l.next = c.next, c.next = l), u.pending = l;
                  }
                }
                i.lanes |= n, null !== (l = i.alternate) && (l.lanes |= n), Ri(i.return, n, t), 
                s.lanes |= n;
                break;
              }
              l = l.next;
            }
          } else if (10 === i.tag) o = i.type === t.type ? null : i.child; else if (18 === i.tag) {
            if (null === (o = i.return)) throw Error(b(341));
            o.lanes |= n, null !== (s = o.alternate) && (s.lanes |= n), Ri(o, n, t), o = i.sibling;
          } else o = i.child;
          if (null !== o) o.return = i; else for (o = i; null !== o; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (null !== (i = o.sibling)) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        Ms(e, t, a.children, n), t = t.child;
      }
      return t;

     case 9:
      return a = t.type, r = t.pendingProps.children, Ii(t, n), r = r(a = Fi(a)), t.flags |= 1, 
      Ms(e, t, r, n), t.child;

     case 14:
      return a = Ni(r = t.type, t.pendingProps), Rs(e, t, r, a = Ni(r.type, a), n);

     case 15:
      return Is(e, t, t.type, t.pendingProps, n);

     case 17:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Ni(r, a), nl(e, t), 
      t.tag = 1, Wa(r) ? (e = !0, Ya(t)) : e = !1, Ii(t, n), no(t, r, a), ao(t, r, a, n), 
      Bs(null, t, r, !0, e, n);

     case 19:
      return tl(e, t, n);

     case 22:
      return Fs(e, t, n);
    }
    throw Error(b(156, t.tag));
  };
  var sc = "function" == typeof reportError ? reportError : function(e) {
    console.error(e);
  };
  function lc(e) {
    this._internalRoot = e;
  }
  function uc(e) {
    this._internalRoot = e;
  }
  function cc(e) {
    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType);
  }
  function dc(e) {
    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue));
  }
  function fc() {}
  function pc(e, t, n, r, a) {
    var i = n._reactRootContainer;
    if (i) {
      var o = i;
      if ("function" == typeof a) {
        var s = a;
        a = function() {
          var e = ac(o);
          s.call(e);
        };
      }
      rc(t, o, e, a);
    } else o = function(e, t, n, r, a) {
      if (a) {
        if ("function" == typeof r) {
          var i = r;
          r = function() {
            var e = ac(o);
            i.call(e);
          };
        }
        var o = nc(t, r, e, 0, null, !1, 0, "", fc);
        return e._reactRootContainer = o, e[Ea] = o.current, ta(8 === e.nodeType ? e.parentNode : e), 
        _u(), o;
      }
      for (;a = e.lastChild; ) e.removeChild(a);
      if ("function" == typeof r) {
        var s = r;
        r = function() {
          var e = ac(l);
          s.call(e);
        };
      }
      var l = Ju(e, 0, !1, null, 0, !1, 0, "", fc);
      return e._reactRootContainer = l, e[Ea] = l.current, ta(8 === e.nodeType ? e.parentNode : e), 
      _u((function() {
        rc(t, l, n, r);
      })), l;
    }(n, t, e, a, r);
    return ac(o);
  }
  uc.prototype.render = lc.prototype.render = function(e) {
    var t = this._internalRoot;
    if (null === t) throw Error(b(409));
    rc(e, t, null, null);
  }, uc.prototype.unmount = lc.prototype.unmount = function() {
    var e = this._internalRoot;
    if (null !== e) {
      this._internalRoot = null;
      var t = e.containerInfo;
      _u((function() {
        rc(null, e, null, null);
      })), t[Ea] = null;
    }
  }, uc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = It();
      e = {
        blockedOn: null,
        target: e,
        priority: t
      };
      for (var n = 0; n < Ht.length && 0 !== t && t < Ht[n].priority; n++) ;
      Ht.splice(n, 0, e), 0 === n && Qt(e);
    }
  }, Mt = function(e) {
    switch (e.tag) {
     case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = St(t.pendingLanes);
        0 !== n && (Tt(t, 1 | n), gu(t, ct()), 0 == (6 & Zl) && (tu = ct() + 500, ti()));
      }
      break;

     case 13:
      _u((function() {
        var t = Bi(e, 1);
        if (null !== t) {
          var n = pu();
          hu(t, e, 1, n);
        }
      })), oc(e, 1);
    }
  }, Lt = function(e) {
    if (13 === e.tag) {
      var t = Bi(e, 134217728);
      if (null !== t) hu(t, e, 134217728, pu());
      oc(e, 134217728);
    }
  }, Rt = function(e) {
    if (13 === e.tag) {
      var t = mu(e), n = Bi(e, t);
      if (null !== n) hu(n, e, t, pu());
      oc(e, t);
    }
  }, It = function() {
    return Ot;
  }, Ft = function(e, t) {
    var n = Ot;
    try {
      return Ot = e, t();
    } finally {
      Ot = n;
    }
  }, Le = function(e, t, n) {
    switch (t) {
     case "input":
      if (de(e, n), t = n.name, "radio" === n.type && null != t) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), 
        t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var a = Ma(r);
            if (!a) throw Error(b(90));
            oe(r), de(r, a);
          }
        }
      }
      break;

     case "textarea":
      be(e, n);
      break;

     case "select":
      null != (t = n.value) && he(e, !!n.multiple, t, !1);
    }
  }, Ze = wu, Be = _u;
  var mc = {
    usingClientEntryPoint: !1,
    Events: [ Oa, za, Ma, De, Ue, wu ]
  }, hc = {
    findFiberByHostInstance: Ta,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom"
  }, gc = {
    bundleType: hc.bundleType,
    version: hc.version,
    rendererPackageName: hc.rendererPackageName,
    rendererConfig: hc.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: z.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
      return null === (e = at(e)) ? null : e.stateNode;
    },
    findFiberByHostInstance: hc.findFiberByHostInstance || function() {
      return null;
    },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
  };
  if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vc.isDisabled && vc.supportsFiber) try {
      vt = vc.inject(gc), bt = vc;
    } catch (_e) {}
  }
  r = mc, a = function(e, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!cc(t)) throw Error(b(200));
    return ec(e, t, null, n);
  }, o = function(e, t) {
    if (!cc(e)) throw Error(b(299));
    var n = !1, r = "", a = sc;
    return null != t && (!0 === t.unstable_strictMode && (n = !0), void 0 !== t.identifierPrefix && (r = t.identifierPrefix), 
    void 0 !== t.onRecoverableError && (a = t.onRecoverableError)), t = Ju(e, 1, !1, null, 0, n, 0, r, a), 
    e[Ea] = t.current, ta(8 === e.nodeType ? e.parentNode : e), new lc(t);
  }, s = function(e) {
    if (null == e) return null;
    if (1 === e.nodeType) return e;
    var t = e._reactInternals;
    if (void 0 === t) {
      if ("function" == typeof e.render) throw Error(b(188));
      throw e = Object.keys(e).join(","), Error(b(268, e));
    }
    return e = null === (e = at(t)) ? null : e.stateNode;
  }, l = function(e) {
    return _u(e);
  }, u = function(e, t, n) {
    if (!dc(t)) throw Error(b(200));
    return pc(null, e, t, !0, n);
  }, c = function(e, t, n) {
    if (!cc(e)) throw Error(b(405));
    var r = null != n && n.hydratedSources || null, a = !1, i = "", o = sc;
    if (null != n && (!0 === n.unstable_strictMode && (a = !0), void 0 !== n.identifierPrefix && (i = n.identifierPrefix), 
    void 0 !== n.onRecoverableError && (o = n.onRecoverableError)), t = nc(t, null, e, 1, null != n ? n : null, a, 0, i, o), 
    e[Ea] = t.current, ta(e), r) for (e = 0; e < r.length; e++) a = (a = (n = r[e])._getVersion)(n._source), 
    null == t.mutableSourceEagerHydrationData ? t.mutableSourceEagerHydrationData = [ n, a ] : t.mutableSourceEagerHydrationData.push(n, a);
    return new uc(t);
  }, d = function(e, t, n) {
    if (!dc(t)) throw Error(b(200));
    return pc(null, e, t, !1, n);
  }, f = function(e) {
    if (!dc(e)) throw Error(b(40));
    return !!e._reactRootContainer && (_u((function() {
      pc(null, null, e, !1, (function() {
        e._reactRootContainer = null, e[Ea] = null;
      }));
    })), !0);
  }, p = wu, m = function(e, t, n, r) {
    if (!dc(n)) throw Error(b(200));
    if (null == e || void 0 === e._reactInternals) throw Error(b(38));
    return pc(e, t, n, !1, r);
  }, h = "18.2.0-next-9e3b772b8-20220608";
})), i.register("3dKuD", (function(e, t) {
  e.exports = i("4PVjy");
})), i.register("4PVjy", (function(t, n) {
  /**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
  var r, a, i, o, s, l, u, c, d, f, p, m, h, g, v, b, y, x, k;
  function w(e, t) {
    var n = e.length;
    e.push(t);
    e: for (;0 < n; ) {
      var r = n - 1 >>> 1, a = e[r];
      if (!(0 < C(a, t))) break e;
      e[r] = t, e[n] = a, n = r;
    }
  }
  function _(e) {
    return 0 === e.length ? null : e[0];
  }
  function S(e) {
    if (0 === e.length) return null;
    var t = e[0], n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var r = 0, a = e.length, i = a >>> 1; r < i; ) {
        var o = 2 * (r + 1) - 1, s = e[o], l = o + 1, u = e[l];
        if (0 > C(s, n)) l < a && 0 > C(u, s) ? (e[r] = u, e[l] = n, r = l) : (e[r] = s, 
        e[o] = n, r = o); else {
          if (!(l < a && 0 > C(u, n))) break e;
          e[r] = u, e[l] = n, r = l;
        }
      }
    }
    return t;
  }
  function C(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return 0 !== n ? n : e.id - t.id;
  }
  if (e(t.exports, "unstable_now", (() => r), (e => r = e)), e(t.exports, "unstable_IdlePriority", (() => a), (e => a = e)), 
  e(t.exports, "unstable_ImmediatePriority", (() => i), (e => i = e)), e(t.exports, "unstable_LowPriority", (() => o), (e => o = e)), 
  e(t.exports, "unstable_NormalPriority", (() => s), (e => s = e)), e(t.exports, "unstable_Profiling", (() => l), (e => l = e)), 
  e(t.exports, "unstable_UserBlockingPriority", (() => u), (e => u = e)), e(t.exports, "unstable_cancelCallback", (() => c), (e => c = e)), 
  e(t.exports, "unstable_continueExecution", (() => d), (e => d = e)), e(t.exports, "unstable_forceFrameRate", (() => f), (e => f = e)), 
  e(t.exports, "unstable_getCurrentPriorityLevel", (() => p), (e => p = e)), e(t.exports, "unstable_getFirstCallbackNode", (() => m), (e => m = e)), 
  e(t.exports, "unstable_next", (() => h), (e => h = e)), e(t.exports, "unstable_pauseExecution", (() => g), (e => g = e)), 
  e(t.exports, "unstable_requestPaint", (() => v), (e => v = e)), e(t.exports, "unstable_runWithPriority", (() => b), (e => b = e)), 
  e(t.exports, "unstable_scheduleCallback", (() => y), (e => y = e)), e(t.exports, "unstable_shouldYield", (() => x), (e => x = e)), 
  e(t.exports, "unstable_wrapCallback", (() => k), (e => k = e)), "object" == typeof performance && "function" == typeof performance.now) {
    var A = performance;
    r = function() {
      return A.now();
    };
  } else {
    var E = Date, j = E.now();
    r = function() {
      return E.now() - j;
    };
  }
  var N = [], P = [], T = 1, O = null, z = 3, M = !1, L = !1, R = !1, I = "function" == typeof setTimeout ? setTimeout : null, F = "function" == typeof clearTimeout ? clearTimeout : null, D = "undefined" != typeof setImmediate ? setImmediate : null;
  function U(e) {
    for (var t = _(P); null !== t; ) {
      if (null === t.callback) S(P); else {
        if (!(t.startTime <= e)) break;
        S(P), t.sortIndex = t.expirationTime, w(N, t);
      }
      t = _(P);
    }
  }
  function Z(e) {
    if (R = !1, U(e), !L) if (null !== _(N)) L = !0, J(B); else {
      var t = _(P);
      null !== t && ee(Z, t.startTime - e);
    }
  }
  function B(e, t) {
    L = !1, R && (R = !1, F(H), H = -1), M = !0;
    var n = z;
    try {
      for (U(t), O = _(N); null !== O && (!(O.expirationTime > t) || e && !Y()); ) {
        var a = O.callback;
        if ("function" == typeof a) {
          O.callback = null, z = O.priorityLevel;
          var i = a(O.expirationTime <= t);
          t = r(), "function" == typeof i ? O.callback = i : O === _(N) && S(N), U(t);
        } else S(N);
        O = _(N);
      }
      if (null !== O) var o = !0; else {
        var s = _(P);
        null !== s && ee(Z, s.startTime - t), o = !1;
      }
      return o;
    } finally {
      O = null, z = n, M = !1;
    }
  }
  "undefined" != typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  var V, $ = !1, W = null, H = -1, q = 5, K = -1;
  function Y() {
    return !(r() - K < q);
  }
  function Q() {
    if (null !== W) {
      var e = r();
      K = e;
      var t = !0;
      try {
        t = W(!0, e);
      } finally {
        t ? V() : ($ = !1, W = null);
      }
    } else $ = !1;
  }
  if ("function" == typeof D) V = function() {
    D(Q);
  }; else if ("undefined" != typeof MessageChannel) {
    var G = new MessageChannel, X = G.port2;
    G.port1.onmessage = Q, V = function() {
      X.postMessage(null);
    };
  } else V = function() {
    I(Q, 0);
  };
  function J(e) {
    W = e, $ || ($ = !0, V());
  }
  function ee(e, t) {
    H = I((function() {
      e(r());
    }), t);
  }
  a = 5, i = 1, o = 4, s = 3, l = null, u = 2, c = function(e) {
    e.callback = null;
  }, d = function() {
    L || M || (L = !0, J(B));
  }, f = function(e) {
    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : q = 0 < e ? Math.floor(1e3 / e) : 5;
  }, p = function() {
    return z;
  }, m = function() {
    return _(N);
  }, h = function(e) {
    switch (z) {
     case 1:
     case 2:
     case 3:
      var t = 3;
      break;

     default:
      t = z;
    }
    var n = z;
    z = t;
    try {
      return e();
    } finally {
      z = n;
    }
  }, g = function() {}, v = function() {}, b = function(e, t) {
    switch (e) {
     case 1:
     case 2:
     case 3:
     case 4:
     case 5:
      break;

     default:
      e = 3;
    }
    var n = z;
    z = e;
    try {
      return t();
    } finally {
      z = n;
    }
  }, y = function(e, t, n) {
    var a = r();
    switch ("object" == typeof n && null !== n ? n = "number" == typeof (n = n.delay) && 0 < n ? a + n : a : n = a, 
    e) {
     case 1:
      var i = -1;
      break;

     case 2:
      i = 250;
      break;

     case 5:
      i = 1073741823;
      break;

     case 4:
      i = 1e4;
      break;

     default:
      i = 5e3;
    }
    return e = {
      id: T++,
      callback: t,
      priorityLevel: e,
      startTime: n,
      expirationTime: i = n + i,
      sortIndex: -1
    }, n > a ? (e.sortIndex = n, w(P, e), null === _(N) && e === _(P) && (R ? (F(H), 
    H = -1) : R = !0, ee(Z, n - a))) : (e.sortIndex = i, w(N, e), L || M || (L = !0, 
    J(B))), e;
  }, x = Y, k = function(e) {
    var t = z;
    return function() {
      var n = z;
      z = t;
      try {
        return e.apply(this, arguments);
      } finally {
        z = n;
      }
    };
  };
})), i.register("38yC4", (function(e, t) {
  var n;
  "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self, 
  n = function(e) {
    if ("undefined" == typeof browser || Object.getPrototypeOf(browser) !== Object.prototype) {
      const t = "The message port closed before a response was received.", n = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)", r = e => {
        const r = {
          alarms: {
            clear: {
              minArgs: 0,
              maxArgs: 1
            },
            clearAll: {
              minArgs: 0,
              maxArgs: 0
            },
            get: {
              minArgs: 0,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          bookmarks: {
            create: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getChildren: {
              minArgs: 1,
              maxArgs: 1
            },
            getRecent: {
              minArgs: 1,
              maxArgs: 1
            },
            getSubTree: {
              minArgs: 1,
              maxArgs: 1
            },
            getTree: {
              minArgs: 0,
              maxArgs: 0
            },
            move: {
              minArgs: 2,
              maxArgs: 2
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeTree: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          browserAction: {
            disable: {
              minArgs: 0,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            enable: {
              minArgs: 0,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            getBadgeBackgroundColor: {
              minArgs: 1,
              maxArgs: 1
            },
            getBadgeText: {
              minArgs: 1,
              maxArgs: 1
            },
            getPopup: {
              minArgs: 1,
              maxArgs: 1
            },
            getTitle: {
              minArgs: 1,
              maxArgs: 1
            },
            openPopup: {
              minArgs: 0,
              maxArgs: 0
            },
            setBadgeBackgroundColor: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setBadgeText: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setIcon: {
              minArgs: 1,
              maxArgs: 1
            },
            setPopup: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setTitle: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          browsingData: {
            remove: {
              minArgs: 2,
              maxArgs: 2
            },
            removeCache: {
              minArgs: 1,
              maxArgs: 1
            },
            removeCookies: {
              minArgs: 1,
              maxArgs: 1
            },
            removeDownloads: {
              minArgs: 1,
              maxArgs: 1
            },
            removeFormData: {
              minArgs: 1,
              maxArgs: 1
            },
            removeHistory: {
              minArgs: 1,
              maxArgs: 1
            },
            removeLocalStorage: {
              minArgs: 1,
              maxArgs: 1
            },
            removePasswords: {
              minArgs: 1,
              maxArgs: 1
            },
            removePluginData: {
              minArgs: 1,
              maxArgs: 1
            },
            settings: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          commands: {
            getAll: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          contextMenus: {
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeAll: {
              minArgs: 0,
              maxArgs: 0
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          cookies: {
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 1,
              maxArgs: 1
            },
            getAllCookieStores: {
              minArgs: 0,
              maxArgs: 0
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          devtools: {
            inspectedWindow: {
              eval: {
                minArgs: 1,
                maxArgs: 2,
                singleCallbackArg: !1
              }
            },
            panels: {
              create: {
                minArgs: 3,
                maxArgs: 3,
                singleCallbackArg: !0
              },
              elements: {
                createSidebarPane: {
                  minArgs: 1,
                  maxArgs: 1
                }
              }
            }
          },
          downloads: {
            cancel: {
              minArgs: 1,
              maxArgs: 1
            },
            download: {
              minArgs: 1,
              maxArgs: 1
            },
            erase: {
              minArgs: 1,
              maxArgs: 1
            },
            getFileIcon: {
              minArgs: 1,
              maxArgs: 2
            },
            open: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            pause: {
              minArgs: 1,
              maxArgs: 1
            },
            removeFile: {
              minArgs: 1,
              maxArgs: 1
            },
            resume: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            },
            show: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          extension: {
            isAllowedFileSchemeAccess: {
              minArgs: 0,
              maxArgs: 0
            },
            isAllowedIncognitoAccess: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          history: {
            addUrl: {
              minArgs: 1,
              maxArgs: 1
            },
            deleteAll: {
              minArgs: 0,
              maxArgs: 0
            },
            deleteRange: {
              minArgs: 1,
              maxArgs: 1
            },
            deleteUrl: {
              minArgs: 1,
              maxArgs: 1
            },
            getVisits: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          i18n: {
            detectLanguage: {
              minArgs: 1,
              maxArgs: 1
            },
            getAcceptLanguages: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          identity: {
            launchWebAuthFlow: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          idle: {
            queryState: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          management: {
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            getSelf: {
              minArgs: 0,
              maxArgs: 0
            },
            setEnabled: {
              minArgs: 2,
              maxArgs: 2
            },
            uninstallSelf: {
              minArgs: 0,
              maxArgs: 1
            }
          },
          notifications: {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            create: {
              minArgs: 1,
              maxArgs: 2
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            getPermissionLevel: {
              minArgs: 0,
              maxArgs: 0
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          pageAction: {
            getPopup: {
              minArgs: 1,
              maxArgs: 1
            },
            getTitle: {
              minArgs: 1,
              maxArgs: 1
            },
            hide: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setIcon: {
              minArgs: 1,
              maxArgs: 1
            },
            setPopup: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setTitle: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            show: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          permissions: {
            contains: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            request: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          runtime: {
            getBackgroundPage: {
              minArgs: 0,
              maxArgs: 0
            },
            getPlatformInfo: {
              minArgs: 0,
              maxArgs: 0
            },
            openOptionsPage: {
              minArgs: 0,
              maxArgs: 0
            },
            requestUpdateCheck: {
              minArgs: 0,
              maxArgs: 0
            },
            sendMessage: {
              minArgs: 1,
              maxArgs: 3
            },
            sendNativeMessage: {
              minArgs: 2,
              maxArgs: 2
            },
            setUninstallURL: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          sessions: {
            getDevices: {
              minArgs: 0,
              maxArgs: 1
            },
            getRecentlyClosed: {
              minArgs: 0,
              maxArgs: 1
            },
            restore: {
              minArgs: 0,
              maxArgs: 1
            }
          },
          storage: {
            local: {
              clear: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            managed: {
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            sync: {
              clear: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            }
          },
          tabs: {
            captureVisibleTab: {
              minArgs: 0,
              maxArgs: 2
            },
            create: {
              minArgs: 1,
              maxArgs: 1
            },
            detectLanguage: {
              minArgs: 0,
              maxArgs: 1
            },
            discard: {
              minArgs: 0,
              maxArgs: 1
            },
            duplicate: {
              minArgs: 1,
              maxArgs: 1
            },
            executeScript: {
              minArgs: 1,
              maxArgs: 2
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getCurrent: {
              minArgs: 0,
              maxArgs: 0
            },
            getZoom: {
              minArgs: 0,
              maxArgs: 1
            },
            getZoomSettings: {
              minArgs: 0,
              maxArgs: 1
            },
            goBack: {
              minArgs: 0,
              maxArgs: 1
            },
            goForward: {
              minArgs: 0,
              maxArgs: 1
            },
            highlight: {
              minArgs: 1,
              maxArgs: 1
            },
            insertCSS: {
              minArgs: 1,
              maxArgs: 2
            },
            move: {
              minArgs: 2,
              maxArgs: 2
            },
            query: {
              minArgs: 1,
              maxArgs: 1
            },
            reload: {
              minArgs: 0,
              maxArgs: 2
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeCSS: {
              minArgs: 1,
              maxArgs: 2
            },
            sendMessage: {
              minArgs: 2,
              maxArgs: 3
            },
            setZoom: {
              minArgs: 1,
              maxArgs: 2
            },
            setZoomSettings: {
              minArgs: 1,
              maxArgs: 2
            },
            update: {
              minArgs: 1,
              maxArgs: 2
            }
          },
          topSites: {
            get: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          webNavigation: {
            getAllFrames: {
              minArgs: 1,
              maxArgs: 1
            },
            getFrame: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          webRequest: {
            handlerBehaviorChanged: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          windows: {
            create: {
              minArgs: 0,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 2
            },
            getAll: {
              minArgs: 0,
              maxArgs: 1
            },
            getCurrent: {
              minArgs: 0,
              maxArgs: 1
            },
            getLastFocused: {
              minArgs: 0,
              maxArgs: 1
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          }
        };
        if (0 === Object.keys(r).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
        class a extends WeakMap {
          constructor(e, t) {
            super(t), this.createItem = e;
          }
          get(e) {
            return this.has(e) || this.set(e, this.createItem(e)), super.get(e);
          }
        }
        const i = (t, n) => (...r) => {
          e.runtime.lastError ? t.reject(new Error(e.runtime.lastError.message)) : n.singleCallbackArg || r.length <= 1 && !1 !== n.singleCallbackArg ? t.resolve(r[0]) : t.resolve(r);
        }, o = e => 1 == e ? "argument" : "arguments", s = (e, t, n) => new Proxy(t, {
          apply: (t, r, a) => n.call(r, e, ...a)
        });
        let l = Function.call.bind(Object.prototype.hasOwnProperty);
        const u = (e, t = {}, n = {}) => {
          let r = Object.create(null), a = {
            has: (t, n) => n in e || n in r,
            get(a, c, d) {
              if (c in r) return r[c];
              if (!(c in e)) return;
              let f = e[c];
              if ("function" == typeof f) if ("function" == typeof t[c]) f = s(e, e[c], t[c]); else if (l(n, c)) {
                let t = ((e, t) => function(n, ...r) {
                  if (r.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${o(t.minArgs)} for ${e}(), got ${r.length}`);
                  if (r.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${o(t.maxArgs)} for ${e}(), got ${r.length}`);
                  return new Promise(((a, o) => {
                    if (t.fallbackToNoCallback) try {
                      n[e](...r, i({
                        resolve: a,
                        reject: o
                      }, t));
                    } catch (i) {
                      console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, i), 
                      n[e](...r), t.fallbackToNoCallback = !1, t.noCallback = !0, a();
                    } else t.noCallback ? (n[e](...r), a()) : n[e](...r, i({
                      resolve: a,
                      reject: o
                    }, t));
                  }));
                })(c, n[c]);
                f = s(e, e[c], t);
              } else f = f.bind(e); else if ("object" == typeof f && null !== f && (l(t, c) || l(n, c))) f = u(f, t[c], n[c]); else {
                if (!l(n, "*")) return Object.defineProperty(r, c, {
                  configurable: !0,
                  enumerable: !0,
                  get: () => e[c],
                  set(t) {
                    e[c] = t;
                  }
                }), f;
                f = u(f, t[c], n["*"]);
              }
              return r[c] = f, f;
            },
            set: (t, n, a, i) => (n in r ? r[n] = a : e[n] = a, !0),
            defineProperty: (e, t, n) => Reflect.defineProperty(r, t, n),
            deleteProperty: (e, t) => Reflect.deleteProperty(r, t)
          }, c = Object.create(e);
          return new Proxy(c, a);
        }, c = e => ({
          addListener(t, n, ...r) {
            t.addListener(e.get(n), ...r);
          },
          hasListener: (t, n) => t.hasListener(e.get(n)),
          removeListener(t, n) {
            t.removeListener(e.get(n));
          }
        }), d = new a((e => "function" != typeof e ? e : function(t) {
          const n = u(t, {}, {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          e(n);
        }));
        let f = !1;
        const p = new a((e => "function" != typeof e ? e : function(t, r, a) {
          let i, o, s = !1, l = new Promise((e => {
            i = function(t) {
              f || (console.warn(n, (new Error).stack), f = !0), s = !0, e(t);
            };
          }));
          try {
            o = e(t, r, i);
          } catch (e) {
            o = Promise.reject(e);
          }
          const u = !0 !== o && (c = o) && "object" == typeof c && "function" == typeof c.then;
          var c;
          if (!0 !== o && !u && !s) return !1;
          const d = e => {
            e.then((e => {
              a(e);
            }), (e => {
              let t;
              t = e && (e instanceof Error || "string" == typeof e.message) ? e.message : "An unexpected error occurred", 
              a({
                __mozWebExtensionPolyfillReject__: !0,
                message: t
              });
            })).catch((e => {
              console.error("Failed to send onMessage rejected reply", e);
            }));
          };
          return d(u ? o : l), !0;
        })), m = ({reject: n, resolve: r}, a) => {
          e.runtime.lastError ? e.runtime.lastError.message === t ? r() : n(new Error(e.runtime.lastError.message)) : a && a.__mozWebExtensionPolyfillReject__ ? n(new Error(a.message)) : r(a);
        }, h = (e, t, n, ...r) => {
          if (r.length < t.minArgs) throw new Error(`Expected at least ${t.minArgs} ${o(t.minArgs)} for ${e}(), got ${r.length}`);
          if (r.length > t.maxArgs) throw new Error(`Expected at most ${t.maxArgs} ${o(t.maxArgs)} for ${e}(), got ${r.length}`);
          return new Promise(((e, t) => {
            const a = m.bind(null, {
              resolve: e,
              reject: t
            });
            r.push(a), n.sendMessage(...r);
          }));
        }, g = {
          devtools: {
            network: {
              onRequestFinished: c(d)
            }
          },
          runtime: {
            onMessage: c(p),
            onMessageExternal: c(p),
            sendMessage: h.bind(null, "sendMessage", {
              minArgs: 1,
              maxArgs: 3
            })
          },
          tabs: {
            sendMessage: h.bind(null, "sendMessage", {
              minArgs: 2,
              maxArgs: 3
            })
          }
        }, v = {
          clear: {
            minArgs: 1,
            maxArgs: 1
          },
          get: {
            minArgs: 1,
            maxArgs: 1
          },
          set: {
            minArgs: 1,
            maxArgs: 1
          }
        };
        return r.privacy = {
          network: {
            "*": v
          },
          services: {
            "*": v
          },
          websites: {
            "*": v
          }
        }, u(e, g, r);
      };
      if ("object" != typeof chrome || !chrome || !chrome.runtime || !chrome.runtime.id) throw new Error("This script should only be loaded in a browser extension.");
      e.exports = r(chrome);
    } else e.exports = browser;
  }, "function" == typeof define && define.amd ? define("webextension-polyfill", [ "module" ], n) : n(e);
})), i.register("fyeBw", (function(e, t) {
  var n = i("7fJCq");
  function r() {}
  function a() {}
  a.resetWarningCache = r, e.exports = function() {
    function e(e, t, r, a, i, o) {
      if (o !== n) {
        var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw s.name = "Invariant Violation", s;
      }
    }
    function t() {
      return e;
    }
    e.isRequired = e;
    var i = {
      array: e,
      bigint: e,
      bool: e,
      func: e,
      number: e,
      object: e,
      string: e,
      symbol: e,
      any: e,
      arrayOf: t,
      element: e,
      elementType: e,
      instanceOf: t,
      node: e,
      objectOf: t,
      oneOf: t,
      oneOfType: t,
      shape: t,
      exact: t,
      checkPropTypes: a,
      resetWarningCache: r
    };
    return i.PropTypes = i, i;
  };
})), i.register("7fJCq", (function(e, t) {
  e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
})), i("fomGM").register(JSON.parse('{"5AhZT":"settings.6862bfad.js","iWWbt":"icon.d9988ad5.svg","fs0r1":"settings.f63aacbe.css"}'));

var o, s;

o = i("iRrGu");

var l;

!function e() {
  if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
  } catch (e) {
    console.error(e);
  }
}(), s = (l = i("7p9c6")).createRoot, l.hydrateRoot;

function u(e, t, n, r) {
  return new (n || (n = Promise))((function(a, i) {
    function o(e) {
      try {
        l(r.next(e));
      } catch (e) {
        i(e);
      }
    }
    function s(e) {
      try {
        l(r.throw(e));
      } catch (e) {
        i(e);
      }
    }
    function l(e) {
      var t;
      e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
        e(t);
      }))).then(o, s);
    }
    l((r = r.apply(e, t || [])).next());
  }));
}

function c(e, t) {
  var n, r, a, i, o = {
    label: 0,
    sent: function() {
      if (1 & a[0]) throw a[1];
      return a[1];
    },
    trys: [],
    ops: []
  };
  return i = {
    next: s(0),
    throw: s(1),
    return: s(2)
  }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
    return this;
  }), i;
  function s(s) {
    return function(l) {
      return function(s) {
        if (n) throw new TypeError("Generator is already executing.");
        for (;i && (i = 0, s[0] && (o = 0)), o; ) try {
          if (n = 1, r && (a = 2 & s[0] ? r.return : s[0] ? r.throw || ((a = r.return) && a.call(r), 
          0) : r.next) && !(a = a.call(r, s[1])).done) return a;
          switch (r = 0, a && (s = [ 2 & s[0], a.value ]), s[0]) {
           case 0:
           case 1:
            a = s;
            break;

           case 4:
            return o.label++, {
              value: s[1],
              done: !1
            };

           case 5:
            o.label++, r = s[1], s = [ 0 ];
            continue;

           case 7:
            s = o.ops.pop(), o.trys.pop();
            continue;

           default:
            if (!(a = o.trys, (a = a.length > 0 && a[a.length - 1]) || 6 !== s[0] && 2 !== s[0])) {
              o = 0;
              continue;
            }
            if (3 === s[0] && (!a || s[1] > a[0] && s[1] < a[3])) {
              o.label = s[1];
              break;
            }
            if (6 === s[0] && o.label < a[1]) {
              o.label = a[1], a = s;
              break;
            }
            if (a && o.label < a[2]) {
              o.label = a[2], o.ops.push(s);
              break;
            }
            a[2] && o.ops.pop(), o.trys.pop();
            continue;
          }
          s = t.call(e, o);
        } catch (e) {
          s = [ 6, e ], r = 0;
        } finally {
          n = a = 0;
        }
        if (5 & s[0]) throw s[1];
        return {
          value: s[0] ? s[1] : void 0,
          done: !0
        };
      }([ s, l ]);
    };
  }
}

Object.create;

Object.create;

new Error("timeout while waiting for mutex to become available"), new Error("mutex already locked");

var d = new Error("request for lock canceled"), f = function() {
  function e(e, t) {
    if (void 0 === t && (t = d), this._maxConcurrency = e, this._cancelError = t, this._queue = [], 
    this._waiters = [], e <= 0) throw new Error("semaphore must be initialized to a positive value");
    this._value = e;
  }
  return e.prototype.acquire = function() {
    var e = this, t = this.isLocked(), n = new Promise((function(t, n) {
      return e._queue.push({
        resolve: t,
        reject: n
      });
    }));
    return t || this._dispatch(), n;
  }, e.prototype.runExclusive = function(e) {
    return u(this, void 0, void 0, (function() {
      var t, n, r;
      return c(this, (function(a) {
        switch (a.label) {
         case 0:
          return [ 4, this.acquire() ];

         case 1:
          t = a.sent(), n = t[0], r = t[1], a.label = 2;

         case 2:
          return a.trys.push([ 2, , 4, 5 ]), [ 4, e(n) ];

         case 3:
          return [ 2, a.sent() ];

         case 4:
          return r(), [ 7 ];

         case 5:
          return [ 2 ];
        }
      }));
    }));
  }, e.prototype.waitForUnlock = function() {
    return u(this, void 0, void 0, (function() {
      var e = this;
      return c(this, (function(t) {
        return this.isLocked() ? [ 2, new Promise((function(t) {
          return e._waiters.push({
            resolve: t
          });
        })) ] : [ 2, Promise.resolve() ];
      }));
    }));
  }, e.prototype.isLocked = function() {
    return this._value <= 0;
  }, e.prototype.release = function() {
    if (this._maxConcurrency > 1) throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");
    if (this._currentReleaser) {
      var e = this._currentReleaser;
      this._currentReleaser = void 0, e();
    }
  }, e.prototype.cancel = function() {
    var e = this;
    this._queue.forEach((function(t) {
      return t.reject(e._cancelError);
    })), this._queue = [];
  }, e.prototype._dispatch = function() {
    var e = this, t = this._queue.shift();
    if (t) {
      var n = !1;
      this._currentReleaser = function() {
        n || (n = !0, e._value++, e._resolveWaiters(), e._dispatch());
      }, t.resolve([ this._value--, this._currentReleaser ]);
    }
  }, e.prototype._resolveWaiters = function() {
    this._waiters.forEach((function(e) {
      return e.resolve();
    })), this._waiters = [];
  }, e;
}(), p = function() {
  function e(e) {
    this._semaphore = new f(1, e);
  }
  return e.prototype.acquire = function() {
    return u(this, void 0, void 0, (function() {
      var e;
      return c(this, (function(t) {
        switch (t.label) {
         case 0:
          return [ 4, this._semaphore.acquire() ];

         case 1:
          return e = t.sent(), [ 2, e[1] ];
        }
      }));
    }));
  }, e.prototype.runExclusive = function(e) {
    return this._semaphore.runExclusive((function() {
      return e();
    }));
  }, e.prototype.isLocked = function() {
    return this._semaphore.isLocked();
  }, e.prototype.waitForUnlock = function() {
    return this._semaphore.waitForUnlock();
  }, e.prototype.release = function() {
    this._semaphore.release();
  }, e.prototype.cancel = function() {
    return this._semaphore.cancel();
  }, e;
}();

var m, h, g, v = i("38yC4");

(h = m || (m = {})).assertEqual = e => e, h.assertIs = function(e) {}, h.assertNever = function(e) {
  throw new Error;
}, h.arrayToEnum = e => {
  const t = {};
  for (const n of e) t[n] = n;
  return t;
}, h.getValidEnumValues = e => {
  const t = h.objectKeys(e).filter((t => "number" != typeof e[e[t]])), n = {};
  for (const r of t) n[r] = e[r];
  return h.objectValues(n);
}, h.objectValues = e => h.objectKeys(e).map((function(t) {
  return e[t];
})), h.objectKeys = "function" == typeof Object.keys ? e => Object.keys(e) : e => {
  const t = [];
  for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
  return t;
}, h.find = (e, t) => {
  for (const n of e) if (t(n)) return n;
}, h.isInteger = "function" == typeof Number.isInteger ? e => Number.isInteger(e) : e => "number" == typeof e && isFinite(e) && Math.floor(e) === e, 
h.joinValues = function(e, t = " | ") {
  return e.map((e => "string" == typeof e ? `'${e}'` : e)).join(t);
}, h.jsonStringifyReplacer = (e, t) => "bigint" == typeof t ? t.toString() : t, 
(g || (g = {})).mergeShapes = (e, t) => ({
  ...e,
  ...t
});

const b = m.arrayToEnum([ "string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set" ]), y = e => {
  switch (typeof e) {
   case "undefined":
    return b.undefined;

   case "string":
    return b.string;

   case "number":
    return isNaN(e) ? b.nan : b.number;

   case "boolean":
    return b.boolean;

   case "function":
    return b.function;

   case "bigint":
    return b.bigint;

   case "symbol":
    return b.symbol;

   case "object":
    return Array.isArray(e) ? b.array : null === e ? b.null : e.then && "function" == typeof e.then && e.catch && "function" == typeof e.catch ? b.promise : "undefined" != typeof Map && e instanceof Map ? b.map : "undefined" != typeof Set && e instanceof Set ? b.set : "undefined" != typeof Date && e instanceof Date ? b.date : b.object;

   default:
    return b.unknown;
  }
}, x = m.arrayToEnum([ "invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite" ]);

class k extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = e => {
      this.issues = [ ...this.issues, e ];
    }, this.addIssues = (e = []) => {
      this.issues = [ ...this.issues, ...e ];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", 
    this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t = e || function(e) {
      return e.message;
    }, n = {
      _errors: []
    }, r = e => {
      for (const a of e.issues) if ("invalid_union" === a.code) a.unionErrors.map(r); else if ("invalid_return_type" === a.code) r(a.returnTypeError); else if ("invalid_arguments" === a.code) r(a.argumentsError); else if (0 === a.path.length) n._errors.push(t(a)); else {
        let e = n, r = 0;
        for (;r < a.path.length; ) {
          const n = a.path[r];
          r === a.path.length - 1 ? (e[n] = e[n] || {
            _errors: []
          }, e[n]._errors.push(t(a))) : e[n] = e[n] || {
            _errors: []
          }, e = e[n], r++;
        }
      }
    };
    return r(this), n;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, m.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return 0 === this.issues.length;
  }
  flatten(e = (e => e.message)) {
    const t = {}, n = [];
    for (const r of this.issues) r.path.length > 0 ? (t[r.path[0]] = t[r.path[0]] || [], 
    t[r.path[0]].push(e(r))) : n.push(e(r));
    return {
      formErrors: n,
      fieldErrors: t
    };
  }
  get formErrors() {
    return this.flatten();
  }
}

k.create = e => new k(e);

const w = (e, t) => {
  let n;
  switch (e.code) {
   case x.invalid_type:
    n = e.received === b.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
    break;

   case x.invalid_literal:
    n = `Invalid literal value, expected ${JSON.stringify(e.expected, m.jsonStringifyReplacer)}`;
    break;

   case x.unrecognized_keys:
    n = `Unrecognized key(s) in object: ${m.joinValues(e.keys, ", ")}`;
    break;

   case x.invalid_union:
    n = "Invalid input";
    break;

   case x.invalid_union_discriminator:
    n = `Invalid discriminator value. Expected ${m.joinValues(e.options)}`;
    break;

   case x.invalid_enum_value:
    n = `Invalid enum value. Expected ${m.joinValues(e.options)}, received '${e.received}'`;
    break;

   case x.invalid_arguments:
    n = "Invalid function arguments";
    break;

   case x.invalid_return_type:
    n = "Invalid function return type";
    break;

   case x.invalid_date:
    n = "Invalid date";
    break;

   case x.invalid_string:
    "object" == typeof e.validation ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, 
    "number" == typeof e.validation.position && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : m.assertNever(e.validation) : n = "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid";
    break;

   case x.too_small:
    n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
    break;

   case x.too_big:
    n = "array" === e.type ? `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : "string" === e.type ? `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : "number" === e.type ? `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "bigint" === e.type ? `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : "date" === e.type ? `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
    break;

   case x.custom:
    n = "Invalid input";
    break;

   case x.invalid_intersection_types:
    n = "Intersection results could not be merged";
    break;

   case x.not_multiple_of:
    n = `Number must be a multiple of ${e.multipleOf}`;
    break;

   case x.not_finite:
    n = "Number must be finite";
    break;

   default:
    n = t.defaultError, m.assertNever(e);
  }
  return {
    message: n
  };
};

let _ = w;

function S() {
  return _;
}

const C = e => {
  const {data: t, path: n, errorMaps: r, issueData: a} = e, i = [ ...n, ...a.path || [] ], o = {
    ...a,
    path: i
  };
  let s = "";
  const l = r.filter((e => !!e)).slice().reverse();
  for (const e of l) s = e(o, {
    data: t,
    defaultError: s
  }).message;
  return {
    ...a,
    path: i,
    message: a.message || s
  };
};

function A(e, t) {
  const n = C({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [ e.common.contextualErrorMap, e.schemaErrorMap, S(), w ].filter((e => !!e))
  });
  e.common.issues.push(n);
}

class E {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    "valid" === this.value && (this.value = "dirty");
  }
  abort() {
    "aborted" !== this.value && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const n = [];
    for (const r of t) {
      if ("aborted" === r.status) return j;
      "dirty" === r.status && e.dirty(), n.push(r.value);
    }
    return {
      status: e.value,
      value: n
    };
  }
  static async mergeObjectAsync(e, t) {
    const n = [];
    for (const e of t) n.push({
      key: await e.key,
      value: await e.value
    });
    return E.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, t) {
    const n = {};
    for (const r of t) {
      const {key: t, value: a} = r;
      if ("aborted" === t.status) return j;
      if ("aborted" === a.status) return j;
      "dirty" === t.status && e.dirty(), "dirty" === a.status && e.dirty(), "__proto__" === t.value || void 0 === a.value && !r.alwaysSet || (n[t.value] = a.value);
    }
    return {
      status: e.value,
      value: n
    };
  }
}

const j = Object.freeze({
  status: "aborted"
}), N = e => ({
  status: "dirty",
  value: e
}), P = e => ({
  status: "valid",
  value: e
}), T = e => "aborted" === e.status, O = e => "dirty" === e.status, z = e => "valid" === e.status, M = e => "undefined" != typeof Promise && e instanceof Promise;

var L, R;

(R = L || (L = {})).errToObj = e => "string" == typeof e ? {
  message: e
} : e || {}, R.toString = e => "string" == typeof e ? e : null == e ? void 0 : e.message;

class I {
  constructor(e, t, n, r) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = n, this._key = r;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), 
    this._cachedPath;
  }
}

const F = (e, t) => {
  if (z(t)) return {
    success: !0,
    data: t.value
  };
  if (!e.common.issues.length) throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const t = new k(e.common.issues);
      return this._error = t, this._error;
    }
  };
};

function D(e) {
  if (!e) return {};
  const {errorMap: t, invalid_type_error: n, required_error: r, description: a} = e;
  if (t && (n || r)) throw new Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');
  if (t) return {
    errorMap: t,
    description: a
  };
  return {
    errorMap: (e, t) => "invalid_type" !== e.code ? {
      message: t.defaultError
    } : void 0 === t.data ? {
      message: null != r ? r : t.defaultError
    } : {
      message: null != n ? n : t.defaultError
    },
    description: a
  };
}

class U {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), 
    this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), 
    this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), 
    this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), 
    this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), 
    this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), 
    this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), 
    this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), 
    this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), 
    this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), 
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return y(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: y(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new E,
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: y(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (M(t)) throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const n = this.safeParse(e, t);
    if (n.success) return n.data;
    throw n.error;
  }
  safeParse(e, t) {
    var n;
    const r = {
      common: {
        issues: [],
        async: null !== (n = null == t ? void 0 : t.async) && void 0 !== n && n,
        contextualErrorMap: null == t ? void 0 : t.errorMap
      },
      path: (null == t ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: y(e)
    }, a = this._parseSync({
      data: e,
      path: r.path,
      parent: r
    });
    return F(r, a);
  }
  async parseAsync(e, t) {
    const n = await this.safeParseAsync(e, t);
    if (n.success) return n.data;
    throw n.error;
  }
  async safeParseAsync(e, t) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: null == t ? void 0 : t.errorMap,
        async: !0
      },
      path: (null == t ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: y(e)
    }, r = this._parse({
      data: e,
      path: n.path,
      parent: n
    }), a = await (M(r) ? r : Promise.resolve(r));
    return F(n, a);
  }
  refine(e, t) {
    const n = e => "string" == typeof t || void 0 === t ? {
      message: t
    } : "function" == typeof t ? t(e) : t;
    return this._refinement(((t, r) => {
      const a = e(t), i = () => r.addIssue({
        code: x.custom,
        ...n(t)
      });
      return "undefined" != typeof Promise && a instanceof Promise ? a.then((e => !!e || (i(), 
      !1))) : !!a || (i(), !1);
    }));
  }
  refinement(e, t) {
    return this._refinement(((n, r) => !!e(n) || (r.addIssue("function" == typeof t ? t(n, r) : t), 
    !1)));
  }
  _refinement(e) {
    return new Ee({
      schema: this,
      typeName: De.ZodEffects,
      effect: {
        type: "refinement",
        refinement: e
      }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return je.create(this, this._def);
  }
  nullable() {
    return Ne.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return le.create(this, this._def);
  }
  promise() {
    return Ae.create(this, this._def);
  }
  or(e) {
    return de.create([ this, e ], this._def);
  }
  and(e) {
    return he.create(this, e, this._def);
  }
  transform(e) {
    return new Ee({
      ...D(this._def),
      schema: this,
      typeName: De.ZodEffects,
      effect: {
        type: "transform",
        transform: e
      }
    });
  }
  default(e) {
    const t = "function" == typeof e ? e : () => e;
    return new Pe({
      ...D(this._def),
      innerType: this,
      defaultValue: t,
      typeName: De.ZodDefault
    });
  }
  brand() {
    return new Me({
      typeName: De.ZodBranded,
      type: this,
      ...D(this._def)
    });
  }
  catch(e) {
    const t = "function" == typeof e ? e : () => e;
    return new Te({
      ...D(this._def),
      innerType: this,
      catchValue: t,
      typeName: De.ZodCatch
    });
  }
  describe(e) {
    return new (0, this.constructor)({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Le.create(this, e);
  }
  readonly() {
    return Re.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}

const Z = /^c[^\s-]{8,}$/i, B = /^[a-z][a-z0-9]*$/, V = /^[0-9A-HJKMNP-TV-Z]{26}$/, $ = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, W = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

let H;

const q = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, K = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;

class Y extends U {
  _parse(e) {
    this._def.coerce && (e.data = String(e.data));
    if (this._getType(e) !== b.string) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.string,
        received: t.parsedType
      }), j;
    }
    const t = new E;
    let n;
    for (const o of this._def.checks) if ("min" === o.kind) e.data.length < o.value && (n = this._getOrReturnCtx(e, n), 
    A(n, {
      code: x.too_small,
      minimum: o.value,
      type: "string",
      inclusive: !0,
      exact: !1,
      message: o.message
    }), t.dirty()); else if ("max" === o.kind) e.data.length > o.value && (n = this._getOrReturnCtx(e, n), 
    A(n, {
      code: x.too_big,
      maximum: o.value,
      type: "string",
      inclusive: !0,
      exact: !1,
      message: o.message
    }), t.dirty()); else if ("length" === o.kind) {
      const r = e.data.length > o.value, a = e.data.length < o.value;
      (r || a) && (n = this._getOrReturnCtx(e, n), r ? A(n, {
        code: x.too_big,
        maximum: o.value,
        type: "string",
        inclusive: !0,
        exact: !0,
        message: o.message
      }) : a && A(n, {
        code: x.too_small,
        minimum: o.value,
        type: "string",
        inclusive: !0,
        exact: !0,
        message: o.message
      }), t.dirty());
    } else if ("email" === o.kind) W.test(e.data) || (n = this._getOrReturnCtx(e, n), 
    A(n, {
      validation: "email",
      code: x.invalid_string,
      message: o.message
    }), t.dirty()); else if ("emoji" === o.kind) H || (H = new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), 
    H.test(e.data) || (n = this._getOrReturnCtx(e, n), A(n, {
      validation: "emoji",
      code: x.invalid_string,
      message: o.message
    }), t.dirty()); else if ("uuid" === o.kind) $.test(e.data) || (n = this._getOrReturnCtx(e, n), 
    A(n, {
      validation: "uuid",
      code: x.invalid_string,
      message: o.message
    }), t.dirty()); else if ("cuid" === o.kind) Z.test(e.data) || (n = this._getOrReturnCtx(e, n), 
    A(n, {
      validation: "cuid",
      code: x.invalid_string,
      message: o.message
    }), t.dirty()); else if ("cuid2" === o.kind) B.test(e.data) || (n = this._getOrReturnCtx(e, n), 
    A(n, {
      validation: "cuid2",
      code: x.invalid_string,
      message: o.message
    }), t.dirty()); else if ("ulid" === o.kind) V.test(e.data) || (n = this._getOrReturnCtx(e, n), 
    A(n, {
      validation: "ulid",
      code: x.invalid_string,
      message: o.message
    }), t.dirty()); else if ("url" === o.kind) try {
      new URL(e.data);
    } catch (r) {
      n = this._getOrReturnCtx(e, n), A(n, {
        validation: "url",
        code: x.invalid_string,
        message: o.message
      }), t.dirty();
    } else if ("regex" === o.kind) {
      o.regex.lastIndex = 0;
      o.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), A(n, {
        validation: "regex",
        code: x.invalid_string,
        message: o.message
      }), t.dirty());
    } else if ("trim" === o.kind) e.data = e.data.trim(); else if ("includes" === o.kind) e.data.includes(o.value, o.position) || (n = this._getOrReturnCtx(e, n), 
    A(n, {
      code: x.invalid_string,
      validation: {
        includes: o.value,
        position: o.position
      },
      message: o.message
    }), t.dirty()); else if ("toLowerCase" === o.kind) e.data = e.data.toLowerCase(); else if ("toUpperCase" === o.kind) e.data = e.data.toUpperCase(); else if ("startsWith" === o.kind) e.data.startsWith(o.value) || (n = this._getOrReturnCtx(e, n), 
    A(n, {
      code: x.invalid_string,
      validation: {
        startsWith: o.value
      },
      message: o.message
    }), t.dirty()); else if ("endsWith" === o.kind) e.data.endsWith(o.value) || (n = this._getOrReturnCtx(e, n), 
    A(n, {
      code: x.invalid_string,
      validation: {
        endsWith: o.value
      },
      message: o.message
    }), t.dirty()); else if ("datetime" === o.kind) {
      ((i = o).precision ? i.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${i.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${i.precision}}Z$`) : 0 === i.precision ? i.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : i.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$")).test(e.data) || (n = this._getOrReturnCtx(e, n), 
      A(n, {
        code: x.invalid_string,
        validation: "datetime",
        message: o.message
      }), t.dirty());
    } else "ip" === o.kind ? (r = e.data, ("v4" !== (a = o.version) && a || !q.test(r)) && ("v6" !== a && a || !K.test(r)) && (n = this._getOrReturnCtx(e, n), 
    A(n, {
      validation: "ip",
      code: x.invalid_string,
      message: o.message
    }), t.dirty())) : m.assertNever(o);
    var r, a, i;
    return {
      status: t.value,
      value: e.data
    };
  }
  _regex(e, t, n) {
    return this.refinement((t => e.test(t)), {
      validation: t,
      code: x.invalid_string,
      ...L.errToObj(n)
    });
  }
  _addCheck(e) {
    return new Y({
      ...this._def,
      checks: [ ...this._def.checks, e ]
    });
  }
  email(e) {
    return this._addCheck({
      kind: "email",
      ...L.errToObj(e)
    });
  }
  url(e) {
    return this._addCheck({
      kind: "url",
      ...L.errToObj(e)
    });
  }
  emoji(e) {
    return this._addCheck({
      kind: "emoji",
      ...L.errToObj(e)
    });
  }
  uuid(e) {
    return this._addCheck({
      kind: "uuid",
      ...L.errToObj(e)
    });
  }
  cuid(e) {
    return this._addCheck({
      kind: "cuid",
      ...L.errToObj(e)
    });
  }
  cuid2(e) {
    return this._addCheck({
      kind: "cuid2",
      ...L.errToObj(e)
    });
  }
  ulid(e) {
    return this._addCheck({
      kind: "ulid",
      ...L.errToObj(e)
    });
  }
  ip(e) {
    return this._addCheck({
      kind: "ip",
      ...L.errToObj(e)
    });
  }
  datetime(e) {
    var t;
    return "string" == typeof e ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
      offset: null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
      ...L.errToObj(null == e ? void 0 : e.message)
    });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...L.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: null == t ? void 0 : t.position,
      ...L.errToObj(null == t ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...L.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...L.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...L.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...L.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...L.errToObj(t)
    });
  }
  nonempty(e) {
    return this.min(1, L.errToObj(e));
  }
  trim() {
    return new Y({
      ...this._def,
      checks: [ ...this._def.checks, {
        kind: "trim"
      } ]
    });
  }
  toLowerCase() {
    return new Y({
      ...this._def,
      checks: [ ...this._def.checks, {
        kind: "toLowerCase"
      } ]
    });
  }
  toUpperCase() {
    return new Y({
      ...this._def,
      checks: [ ...this._def.checks, {
        kind: "toUpperCase"
      } ]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e => "datetime" === e.kind));
  }
  get isEmail() {
    return !!this._def.checks.find((e => "email" === e.kind));
  }
  get isURL() {
    return !!this._def.checks.find((e => "url" === e.kind));
  }
  get isEmoji() {
    return !!this._def.checks.find((e => "emoji" === e.kind));
  }
  get isUUID() {
    return !!this._def.checks.find((e => "uuid" === e.kind));
  }
  get isCUID() {
    return !!this._def.checks.find((e => "cuid" === e.kind));
  }
  get isCUID2() {
    return !!this._def.checks.find((e => "cuid2" === e.kind));
  }
  get isULID() {
    return !!this._def.checks.find((e => "ulid" === e.kind));
  }
  get isIP() {
    return !!this._def.checks.find((e => "ip" === e.kind));
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
}

function Q(e, t) {
  const n = (e.toString().split(".")[1] || "").length, r = (t.toString().split(".")[1] || "").length, a = n > r ? n : r;
  return parseInt(e.toFixed(a).replace(".", "")) % parseInt(t.toFixed(a).replace(".", "")) / Math.pow(10, a);
}

Y.create = e => {
  var t;
  return new Y({
    checks: [],
    typeName: De.ZodString,
    coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
    ...D(e)
  });
};

class G extends U {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    this._def.coerce && (e.data = Number(e.data));
    if (this._getType(e) !== b.number) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.number,
        received: t.parsedType
      }), j;
    }
    let t;
    const n = new E;
    for (const r of this._def.checks) if ("int" === r.kind) m.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), 
    A(t, {
      code: x.invalid_type,
      expected: "integer",
      received: "float",
      message: r.message
    }), n.dirty()); else if ("min" === r.kind) {
      (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), 
      A(t, {
        code: x.too_small,
        minimum: r.value,
        type: "number",
        inclusive: r.inclusive,
        exact: !1,
        message: r.message
      }), n.dirty());
    } else if ("max" === r.kind) {
      (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), 
      A(t, {
        code: x.too_big,
        maximum: r.value,
        type: "number",
        inclusive: r.inclusive,
        exact: !1,
        message: r.message
      }), n.dirty());
    } else "multipleOf" === r.kind ? 0 !== Q(e.data, r.value) && (t = this._getOrReturnCtx(e, t), 
    A(t, {
      code: x.not_multiple_of,
      multipleOf: r.value,
      message: r.message
    }), n.dirty()) : "finite" === r.kind ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), 
    A(t, {
      code: x.not_finite,
      message: r.message
    }), n.dirty()) : m.assertNever(r);
    return {
      status: n.value,
      value: e.data
    };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, L.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, L.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, L.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, L.toString(t));
  }
  setLimit(e, t, n, r) {
    return new G({
      ...this._def,
      checks: [ ...this._def.checks, {
        kind: e,
        value: t,
        inclusive: n,
        message: L.toString(r)
      } ]
    });
  }
  _addCheck(e) {
    return new G({
      ...this._def,
      checks: [ ...this._def.checks, e ]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: L.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: L.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: L.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: L.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: L.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: L.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: L.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: L.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: L.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e => "int" === e.kind || "multipleOf" === e.kind && m.isInteger(e.value)));
  }
  get isFinite() {
    let e = null, t = null;
    for (const n of this._def.checks) {
      if ("finite" === n.kind || "int" === n.kind || "multipleOf" === n.kind) return !0;
      "min" === n.kind ? (null === t || n.value > t) && (t = n.value) : "max" === n.kind && (null === e || n.value < e) && (e = n.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}

G.create = e => new G({
  checks: [],
  typeName: De.ZodNumber,
  coerce: (null == e ? void 0 : e.coerce) || !1,
  ...D(e)
});

class X extends U {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    this._def.coerce && (e.data = BigInt(e.data));
    if (this._getType(e) !== b.bigint) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.bigint,
        received: t.parsedType
      }), j;
    }
    let t;
    const n = new E;
    for (const r of this._def.checks) if ("min" === r.kind) {
      (r.inclusive ? e.data < r.value : e.data <= r.value) && (t = this._getOrReturnCtx(e, t), 
      A(t, {
        code: x.too_small,
        type: "bigint",
        minimum: r.value,
        inclusive: r.inclusive,
        message: r.message
      }), n.dirty());
    } else if ("max" === r.kind) {
      (r.inclusive ? e.data > r.value : e.data >= r.value) && (t = this._getOrReturnCtx(e, t), 
      A(t, {
        code: x.too_big,
        type: "bigint",
        maximum: r.value,
        inclusive: r.inclusive,
        message: r.message
      }), n.dirty());
    } else "multipleOf" === r.kind ? e.data % r.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), 
    A(t, {
      code: x.not_multiple_of,
      multipleOf: r.value,
      message: r.message
    }), n.dirty()) : m.assertNever(r);
    return {
      status: n.value,
      value: e.data
    };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, L.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, L.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, L.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, L.toString(t));
  }
  setLimit(e, t, n, r) {
    return new X({
      ...this._def,
      checks: [ ...this._def.checks, {
        kind: e,
        value: t,
        inclusive: n,
        message: L.toString(r)
      } ]
    });
  }
  _addCheck(e) {
    return new X({
      ...this._def,
      checks: [ ...this._def.checks, e ]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: L.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: L.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: L.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: L.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: L.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
}

X.create = e => {
  var t;
  return new X({
    checks: [],
    typeName: De.ZodBigInt,
    coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
    ...D(e)
  });
};

class J extends U {
  _parse(e) {
    this._def.coerce && (e.data = Boolean(e.data));
    if (this._getType(e) !== b.boolean) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.boolean,
        received: t.parsedType
      }), j;
    }
    return P(e.data);
  }
}

J.create = e => new J({
  typeName: De.ZodBoolean,
  coerce: (null == e ? void 0 : e.coerce) || !1,
  ...D(e)
});

class ee extends U {
  _parse(e) {
    this._def.coerce && (e.data = new Date(e.data));
    if (this._getType(e) !== b.date) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.date,
        received: t.parsedType
      }), j;
    }
    if (isNaN(e.data.getTime())) {
      return A(this._getOrReturnCtx(e), {
        code: x.invalid_date
      }), j;
    }
    const t = new E;
    let n;
    for (const r of this._def.checks) "min" === r.kind ? e.data.getTime() < r.value && (n = this._getOrReturnCtx(e, n), 
    A(n, {
      code: x.too_small,
      message: r.message,
      inclusive: !0,
      exact: !1,
      minimum: r.value,
      type: "date"
    }), t.dirty()) : "max" === r.kind ? e.data.getTime() > r.value && (n = this._getOrReturnCtx(e, n), 
    A(n, {
      code: x.too_big,
      message: r.message,
      inclusive: !0,
      exact: !1,
      maximum: r.value,
      type: "date"
    }), t.dirty()) : m.assertNever(r);
    return {
      status: t.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new ee({
      ...this._def,
      checks: [ ...this._def.checks, e ]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: L.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: L.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
    return null != e ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
    return null != e ? new Date(e) : null;
  }
}

ee.create = e => new ee({
  checks: [],
  coerce: (null == e ? void 0 : e.coerce) || !1,
  typeName: De.ZodDate,
  ...D(e)
});

class te extends U {
  _parse(e) {
    if (this._getType(e) !== b.symbol) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.symbol,
        received: t.parsedType
      }), j;
    }
    return P(e.data);
  }
}

te.create = e => new te({
  typeName: De.ZodSymbol,
  ...D(e)
});

class ne extends U {
  _parse(e) {
    if (this._getType(e) !== b.undefined) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.undefined,
        received: t.parsedType
      }), j;
    }
    return P(e.data);
  }
}

ne.create = e => new ne({
  typeName: De.ZodUndefined,
  ...D(e)
});

class re extends U {
  _parse(e) {
    if (this._getType(e) !== b.null) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.null,
        received: t.parsedType
      }), j;
    }
    return P(e.data);
  }
}

re.create = e => new re({
  typeName: De.ZodNull,
  ...D(e)
});

class ae extends U {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return P(e.data);
  }
}

ae.create = e => new ae({
  typeName: De.ZodAny,
  ...D(e)
});

class ie extends U {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return P(e.data);
  }
}

ie.create = e => new ie({
  typeName: De.ZodUnknown,
  ...D(e)
});

class oe extends U {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return A(t, {
      code: x.invalid_type,
      expected: b.never,
      received: t.parsedType
    }), j;
  }
}

oe.create = e => new oe({
  typeName: De.ZodNever,
  ...D(e)
});

class se extends U {
  _parse(e) {
    if (this._getType(e) !== b.undefined) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.void,
        received: t.parsedType
      }), j;
    }
    return P(e.data);
  }
}

se.create = e => new se({
  typeName: De.ZodVoid,
  ...D(e)
});

class le extends U {
  _parse(e) {
    const {ctx: t, status: n} = this._processInputParams(e), r = this._def;
    if (t.parsedType !== b.array) return A(t, {
      code: x.invalid_type,
      expected: b.array,
      received: t.parsedType
    }), j;
    if (null !== r.exactLength) {
      const e = t.data.length > r.exactLength.value, a = t.data.length < r.exactLength.value;
      (e || a) && (A(t, {
        code: e ? x.too_big : x.too_small,
        minimum: a ? r.exactLength.value : void 0,
        maximum: e ? r.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: r.exactLength.message
      }), n.dirty());
    }
    if (null !== r.minLength && t.data.length < r.minLength.value && (A(t, {
      code: x.too_small,
      minimum: r.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.minLength.message
    }), n.dirty()), null !== r.maxLength && t.data.length > r.maxLength.value && (A(t, {
      code: x.too_big,
      maximum: r.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.maxLength.message
    }), n.dirty()), t.common.async) return Promise.all([ ...t.data ].map(((e, n) => r.type._parseAsync(new I(t, e, t.path, n))))).then((e => E.mergeArray(n, e)));
    const a = [ ...t.data ].map(((e, n) => r.type._parseSync(new I(t, e, t.path, n))));
    return E.mergeArray(n, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new le({
      ...this._def,
      minLength: {
        value: e,
        message: L.toString(t)
      }
    });
  }
  max(e, t) {
    return new le({
      ...this._def,
      maxLength: {
        value: e,
        message: L.toString(t)
      }
    });
  }
  length(e, t) {
    return new le({
      ...this._def,
      exactLength: {
        value: e,
        message: L.toString(t)
      }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}

function ue(e) {
  if (e instanceof ce) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = je.create(ue(r));
    }
    return new ce({
      ...e._def,
      shape: () => t
    });
  }
  return e instanceof le ? new le({
    ...e._def,
    type: ue(e.element)
  }) : e instanceof je ? je.create(ue(e.unwrap())) : e instanceof Ne ? Ne.create(ue(e.unwrap())) : e instanceof ge ? ge.create(e.items.map((e => ue(e)))) : e;
}

le.create = (e, t) => new le({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: De.ZodArray,
  ...D(t)
});

class ce extends U {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (null !== this._cached) return this._cached;
    const e = this._def.shape(), t = m.objectKeys(e);
    return this._cached = {
      shape: e,
      keys: t
    };
  }
  _parse(e) {
    if (this._getType(e) !== b.object) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.object,
        received: t.parsedType
      }), j;
    }
    const {status: t, ctx: n} = this._processInputParams(e), {shape: r, keys: a} = this._getCached(), i = [];
    if (!(this._def.catchall instanceof oe && "strip" === this._def.unknownKeys)) for (const e in n.data) a.includes(e) || i.push(e);
    const o = [];
    for (const e of a) {
      const t = r[e], a = n.data[e];
      o.push({
        key: {
          status: "valid",
          value: e
        },
        value: t._parse(new I(n, a, n.path, e)),
        alwaysSet: e in n.data
      });
    }
    if (this._def.catchall instanceof oe) {
      const e = this._def.unknownKeys;
      if ("passthrough" === e) for (const e of i) o.push({
        key: {
          status: "valid",
          value: e
        },
        value: {
          status: "valid",
          value: n.data[e]
        }
      }); else if ("strict" === e) i.length > 0 && (A(n, {
        code: x.unrecognized_keys,
        keys: i
      }), t.dirty()); else if ("strip" !== e) throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const e = this._def.catchall;
      for (const t of i) {
        const r = n.data[t];
        o.push({
          key: {
            status: "valid",
            value: t
          },
          value: e._parse(new I(n, r, n.path, t)),
          alwaysSet: t in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then((async () => {
      const e = [];
      for (const t of o) {
        const n = await t.key;
        e.push({
          key: n,
          value: await t.value,
          alwaysSet: t.alwaysSet
        });
      }
      return e;
    })).then((e => E.mergeObjectSync(t, e))) : E.mergeObjectSync(t, o);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return L.errToObj, new ce({
      ...this._def,
      unknownKeys: "strict",
      ...void 0 !== e ? {
        errorMap: (t, n) => {
          var r, a, i, o;
          const s = null !== (i = null === (a = (r = this._def).errorMap) || void 0 === a ? void 0 : a.call(r, t, n).message) && void 0 !== i ? i : n.defaultError;
          return "unrecognized_keys" === t.code ? {
            message: null !== (o = L.errToObj(e).message) && void 0 !== o ? o : s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new ce({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ce({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(e) {
    return new ce({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  merge(e) {
    return new ce({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: De.ZodObject
    });
  }
  setKey(e, t) {
    return this.augment({
      [e]: t
    });
  }
  catchall(e) {
    return new ce({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return m.objectKeys(e).forEach((n => {
      e[n] && this.shape[n] && (t[n] = this.shape[n]);
    })), new ce({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return m.objectKeys(this.shape).forEach((n => {
      e[n] || (t[n] = this.shape[n]);
    })), new ce({
      ...this._def,
      shape: () => t
    });
  }
  deepPartial() {
    return ue(this);
  }
  partial(e) {
    const t = {};
    return m.objectKeys(this.shape).forEach((n => {
      const r = this.shape[n];
      e && !e[n] ? t[n] = r : t[n] = r.optional();
    })), new ce({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return m.objectKeys(this.shape).forEach((n => {
      if (e && !e[n]) t[n] = this.shape[n]; else {
        let e = this.shape[n];
        for (;e instanceof je; ) e = e._def.innerType;
        t[n] = e;
      }
    })), new ce({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return _e(m.objectKeys(this.shape));
  }
}

ce.create = (e, t) => new ce({
  shape: () => e,
  unknownKeys: "strip",
  catchall: oe.create(),
  typeName: De.ZodObject,
  ...D(t)
}), ce.strictCreate = (e, t) => new ce({
  shape: () => e,
  unknownKeys: "strict",
  catchall: oe.create(),
  typeName: De.ZodObject,
  ...D(t)
}), ce.lazycreate = (e, t) => new ce({
  shape: e,
  unknownKeys: "strip",
  catchall: oe.create(),
  typeName: De.ZodObject,
  ...D(t)
});

class de extends U {
  _parse(e) {
    const {ctx: t} = this._processInputParams(e), n = this._def.options;
    if (t.common.async) return Promise.all(n.map((async e => {
      const n = {
        ...t,
        common: {
          ...t.common,
          issues: []
        },
        parent: null
      };
      return {
        result: await e._parseAsync({
          data: t.data,
          path: t.path,
          parent: n
        }),
        ctx: n
      };
    }))).then((function(e) {
      for (const t of e) if ("valid" === t.result.status) return t.result;
      for (const n of e) if ("dirty" === n.result.status) return t.common.issues.push(...n.ctx.common.issues), 
      n.result;
      const n = e.map((e => new k(e.ctx.common.issues)));
      return A(t, {
        code: x.invalid_union,
        unionErrors: n
      }), j;
    }));
    {
      let e;
      const r = [];
      for (const a of n) {
        const n = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, i = a._parseSync({
          data: t.data,
          path: t.path,
          parent: n
        });
        if ("valid" === i.status) return i;
        "dirty" !== i.status || e || (e = {
          result: i,
          ctx: n
        }), n.common.issues.length && r.push(n.common.issues);
      }
      if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
      const a = r.map((e => new k(e)));
      return A(t, {
        code: x.invalid_union,
        unionErrors: a
      }), j;
    }
  }
  get options() {
    return this._def.options;
  }
}

de.create = (e, t) => new de({
  options: e,
  typeName: De.ZodUnion,
  ...D(t)
});

const fe = e => e instanceof ke ? fe(e.schema) : e instanceof Ee ? fe(e.innerType()) : e instanceof we ? [ e.value ] : e instanceof Se ? e.options : e instanceof Ce ? Object.keys(e.enum) : e instanceof Pe ? fe(e._def.innerType) : e instanceof ne ? [ void 0 ] : e instanceof re ? [ null ] : null;

class pe extends U {
  _parse(e) {
    const {ctx: t} = this._processInputParams(e);
    if (t.parsedType !== b.object) return A(t, {
      code: x.invalid_type,
      expected: b.object,
      received: t.parsedType
    }), j;
    const n = this.discriminator, r = t.data[n], a = this.optionsMap.get(r);
    return a ? t.common.async ? a._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : a._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (A(t, {
      code: x.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [ n ]
    }), j);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(e, t, n) {
    const r = new Map;
    for (const n of t) {
      const t = fe(n.shape[e]);
      if (!t) throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const a of t) {
        if (r.has(a)) throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);
        r.set(a, n);
      }
    }
    return new pe({
      typeName: De.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: r,
      ...D(n)
    });
  }
}

function me(e, t) {
  const n = y(e), r = y(t);
  if (e === t) return {
    valid: !0,
    data: e
  };
  if (n === b.object && r === b.object) {
    const n = m.objectKeys(t), r = m.objectKeys(e).filter((e => -1 !== n.indexOf(e))), a = {
      ...e,
      ...t
    };
    for (const n of r) {
      const r = me(e[n], t[n]);
      if (!r.valid) return {
        valid: !1
      };
      a[n] = r.data;
    }
    return {
      valid: !0,
      data: a
    };
  }
  if (n === b.array && r === b.array) {
    if (e.length !== t.length) return {
      valid: !1
    };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const a = me(e[r], t[r]);
      if (!a.valid) return {
        valid: !1
      };
      n.push(a.data);
    }
    return {
      valid: !0,
      data: n
    };
  }
  return n === b.date && r === b.date && +e == +t ? {
    valid: !0,
    data: e
  } : {
    valid: !1
  };
}

class he extends U {
  _parse(e) {
    const {status: t, ctx: n} = this._processInputParams(e), r = (e, r) => {
      if (T(e) || T(r)) return j;
      const a = me(e.value, r.value);
      return a.valid ? ((O(e) || O(r)) && t.dirty(), {
        status: t.value,
        value: a.data
      }) : (A(n, {
        code: x.invalid_intersection_types
      }), j);
    };
    return n.common.async ? Promise.all([ this._def.left._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }) ]).then((([e, t]) => r(e, t))) : r(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}

he.create = (e, t, n) => new he({
  left: e,
  right: t,
  typeName: De.ZodIntersection,
  ...D(n)
});

class ge extends U {
  _parse(e) {
    const {status: t, ctx: n} = this._processInputParams(e);
    if (n.parsedType !== b.array) return A(n, {
      code: x.invalid_type,
      expected: b.array,
      received: n.parsedType
    }), j;
    if (n.data.length < this._def.items.length) return A(n, {
      code: x.too_small,
      minimum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), j;
    !this._def.rest && n.data.length > this._def.items.length && (A(n, {
      code: x.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const r = [ ...n.data ].map(((e, t) => {
      const r = this._def.items[t] || this._def.rest;
      return r ? r._parse(new I(n, e, n.path, t)) : null;
    })).filter((e => !!e));
    return n.common.async ? Promise.all(r).then((e => E.mergeArray(t, e))) : E.mergeArray(t, r);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new ge({
      ...this._def,
      rest: e
    });
  }
}

ge.create = (e, t) => {
  if (!Array.isArray(e)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ge({
    items: e,
    typeName: De.ZodTuple,
    rest: null,
    ...D(t)
  });
};

class ve extends U {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const {status: t, ctx: n} = this._processInputParams(e);
    if (n.parsedType !== b.object) return A(n, {
      code: x.invalid_type,
      expected: b.object,
      received: n.parsedType
    }), j;
    const r = [], a = this._def.keyType, i = this._def.valueType;
    for (const e in n.data) r.push({
      key: a._parse(new I(n, e, n.path, e)),
      value: i._parse(new I(n, n.data[e], n.path, e))
    });
    return n.common.async ? E.mergeObjectAsync(t, r) : E.mergeObjectSync(t, r);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, n) {
    return new ve(t instanceof U ? {
      keyType: e,
      valueType: t,
      typeName: De.ZodRecord,
      ...D(n)
    } : {
      keyType: Y.create(),
      valueType: e,
      typeName: De.ZodRecord,
      ...D(t)
    });
  }
}

class be extends U {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const {status: t, ctx: n} = this._processInputParams(e);
    if (n.parsedType !== b.map) return A(n, {
      code: x.invalid_type,
      expected: b.map,
      received: n.parsedType
    }), j;
    const r = this._def.keyType, a = this._def.valueType, i = [ ...n.data.entries() ].map((([e, t], i) => ({
      key: r._parse(new I(n, e, n.path, [ i, "key" ])),
      value: a._parse(new I(n, t, n.path, [ i, "value" ]))
    })));
    if (n.common.async) {
      const e = new Map;
      return Promise.resolve().then((async () => {
        for (const n of i) {
          const r = await n.key, a = await n.value;
          if ("aborted" === r.status || "aborted" === a.status) return j;
          "dirty" !== r.status && "dirty" !== a.status || t.dirty(), e.set(r.value, a.value);
        }
        return {
          status: t.value,
          value: e
        };
      }));
    }
    {
      const e = new Map;
      for (const n of i) {
        const r = n.key, a = n.value;
        if ("aborted" === r.status || "aborted" === a.status) return j;
        "dirty" !== r.status && "dirty" !== a.status || t.dirty(), e.set(r.value, a.value);
      }
      return {
        status: t.value,
        value: e
      };
    }
  }
}

be.create = (e, t, n) => new be({
  valueType: t,
  keyType: e,
  typeName: De.ZodMap,
  ...D(n)
});

class ye extends U {
  _parse(e) {
    const {status: t, ctx: n} = this._processInputParams(e);
    if (n.parsedType !== b.set) return A(n, {
      code: x.invalid_type,
      expected: b.set,
      received: n.parsedType
    }), j;
    const r = this._def;
    null !== r.minSize && n.data.size < r.minSize.value && (A(n, {
      code: x.too_small,
      minimum: r.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.minSize.message
    }), t.dirty()), null !== r.maxSize && n.data.size > r.maxSize.value && (A(n, {
      code: x.too_big,
      maximum: r.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function i(e) {
      const n = new Set;
      for (const r of e) {
        if ("aborted" === r.status) return j;
        "dirty" === r.status && t.dirty(), n.add(r.value);
      }
      return {
        status: t.value,
        value: n
      };
    }
    const o = [ ...n.data.values() ].map(((e, t) => a._parse(new I(n, e, n.path, t))));
    return n.common.async ? Promise.all(o).then((e => i(e))) : i(o);
  }
  min(e, t) {
    return new ye({
      ...this._def,
      minSize: {
        value: e,
        message: L.toString(t)
      }
    });
  }
  max(e, t) {
    return new ye({
      ...this._def,
      maxSize: {
        value: e,
        message: L.toString(t)
      }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}

ye.create = (e, t) => new ye({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: De.ZodSet,
  ...D(t)
});

class xe extends U {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const {ctx: t} = this._processInputParams(e);
    if (t.parsedType !== b.function) return A(t, {
      code: x.invalid_type,
      expected: b.function,
      received: t.parsedType
    }), j;
    function n(e, n) {
      return C({
        data: e,
        path: t.path,
        errorMaps: [ t.common.contextualErrorMap, t.schemaErrorMap, S(), w ].filter((e => !!e)),
        issueData: {
          code: x.invalid_arguments,
          argumentsError: n
        }
      });
    }
    function r(e, n) {
      return C({
        data: e,
        path: t.path,
        errorMaps: [ t.common.contextualErrorMap, t.schemaErrorMap, S(), w ].filter((e => !!e)),
        issueData: {
          code: x.invalid_return_type,
          returnTypeError: n
        }
      });
    }
    const a = {
      errorMap: t.common.contextualErrorMap
    }, i = t.data;
    if (this._def.returns instanceof Ae) {
      const e = this;
      return P((async function(...t) {
        const o = new k([]), s = await e._def.args.parseAsync(t, a).catch((e => {
          throw o.addIssue(n(t, e)), o;
        })), l = await Reflect.apply(i, this, s);
        return await e._def.returns._def.type.parseAsync(l, a).catch((e => {
          throw o.addIssue(r(l, e)), o;
        }));
      }));
    }
    {
      const e = this;
      return P((function(...t) {
        const o = e._def.args.safeParse(t, a);
        if (!o.success) throw new k([ n(t, o.error) ]);
        const s = Reflect.apply(i, this, o.data), l = e._def.returns.safeParse(s, a);
        if (!l.success) throw new k([ r(s, l.error) ]);
        return l.data;
      }));
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new xe({
      ...this._def,
      args: ge.create(e).rest(ie.create())
    });
  }
  returns(e) {
    return new xe({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, n) {
    return new xe({
      args: e || ge.create([]).rest(ie.create()),
      returns: t || ie.create(),
      typeName: De.ZodFunction,
      ...D(n)
    });
  }
}

class ke extends U {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const {ctx: t} = this._processInputParams(e);
    return this._def.getter()._parse({
      data: t.data,
      path: t.path,
      parent: t
    });
  }
}

ke.create = (e, t) => new ke({
  getter: e,
  typeName: De.ZodLazy,
  ...D(t)
});

class we extends U {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        received: t.data,
        code: x.invalid_literal,
        expected: this._def.value
      }), j;
    }
    return {
      status: "valid",
      value: e.data
    };
  }
  get value() {
    return this._def.value;
  }
}

function _e(e, t) {
  return new Se({
    values: e,
    typeName: De.ZodEnum,
    ...D(t)
  });
}

we.create = (e, t) => new we({
  value: e,
  typeName: De.ZodLiteral,
  ...D(t)
});

class Se extends U {
  _parse(e) {
    if ("string" != typeof e.data) {
      const t = this._getOrReturnCtx(e), n = this._def.values;
      return A(t, {
        expected: m.joinValues(n),
        received: t.parsedType,
        code: x.invalid_type
      }), j;
    }
    if (-1 === this._def.values.indexOf(e.data)) {
      const t = this._getOrReturnCtx(e), n = this._def.values;
      return A(t, {
        received: t.data,
        code: x.invalid_enum_value,
        options: n
      }), j;
    }
    return P(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  extract(e) {
    return Se.create(e);
  }
  exclude(e) {
    return Se.create(this.options.filter((t => !e.includes(t))));
  }
}

Se.create = _e;

class Ce extends U {
  _parse(e) {
    const t = m.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== b.string && n.parsedType !== b.number) {
      const e = m.objectValues(t);
      return A(n, {
        expected: m.joinValues(e),
        received: n.parsedType,
        code: x.invalid_type
      }), j;
    }
    if (-1 === t.indexOf(e.data)) {
      const e = m.objectValues(t);
      return A(n, {
        received: n.data,
        code: x.invalid_enum_value,
        options: e
      }), j;
    }
    return P(e.data);
  }
  get enum() {
    return this._def.values;
  }
}

Ce.create = (e, t) => new Ce({
  values: e,
  typeName: De.ZodNativeEnum,
  ...D(t)
});

class Ae extends U {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const {ctx: t} = this._processInputParams(e);
    if (t.parsedType !== b.promise && !1 === t.common.async) return A(t, {
      code: x.invalid_type,
      expected: b.promise,
      received: t.parsedType
    }), j;
    const n = t.parsedType === b.promise ? t.data : Promise.resolve(t.data);
    return P(n.then((e => this._def.type.parseAsync(e, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    }))));
  }
}

Ae.create = (e, t) => new Ae({
  type: e,
  typeName: De.ZodPromise,
  ...D(t)
});

class Ee extends U {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === De.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const {status: t, ctx: n} = this._processInputParams(e), r = this._def.effect || null, a = {
      addIssue: e => {
        A(n, e), e.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), "preprocess" === r.type) {
      const e = r.transform(n.data, a);
      return n.common.issues.length ? {
        status: "dirty",
        value: n.data
      } : n.common.async ? Promise.resolve(e).then((e => this._def.schema._parseAsync({
        data: e,
        path: n.path,
        parent: n
      }))) : this._def.schema._parseSync({
        data: e,
        path: n.path,
        parent: n
      });
    }
    if ("refinement" === r.type) {
      const e = e => {
        const t = r.refinement(e, a);
        if (n.common.async) return Promise.resolve(t);
        if (t instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return e;
      };
      if (!1 === n.common.async) {
        const r = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return "aborted" === r.status ? j : ("dirty" === r.status && t.dirty(), e(r.value), 
        {
          status: t.value,
          value: r.value
        });
      }
      return this._def.schema._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }).then((n => "aborted" === n.status ? j : ("dirty" === n.status && t.dirty(), e(n.value).then((() => ({
        status: t.value,
        value: n.value
      }))))));
    }
    if ("transform" === r.type) {
      if (!1 === n.common.async) {
        const e = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!z(e)) return e;
        const i = r.transform(e.value, a);
        if (i instanceof Promise) throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return {
          status: t.value,
          value: i
        };
      }
      return this._def.schema._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }).then((e => z(e) ? Promise.resolve(r.transform(e.value, a)).then((e => ({
        status: t.value,
        value: e
      }))) : e));
    }
    m.assertNever(r);
  }
}

Ee.create = (e, t, n) => new Ee({
  schema: e,
  typeName: De.ZodEffects,
  effect: t,
  ...D(n)
}), Ee.createWithPreprocess = (e, t, n) => new Ee({
  schema: t,
  effect: {
    type: "preprocess",
    transform: e
  },
  typeName: De.ZodEffects,
  ...D(n)
});

class je extends U {
  _parse(e) {
    return this._getType(e) === b.undefined ? P(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}

je.create = (e, t) => new je({
  innerType: e,
  typeName: De.ZodOptional,
  ...D(t)
});

class Ne extends U {
  _parse(e) {
    return this._getType(e) === b.null ? P(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}

Ne.create = (e, t) => new Ne({
  innerType: e,
  typeName: De.ZodNullable,
  ...D(t)
});

class Pe extends U {
  _parse(e) {
    const {ctx: t} = this._processInputParams(e);
    let n = t.data;
    return t.parsedType === b.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}

Pe.create = (e, t) => new Pe({
  innerType: e,
  typeName: De.ZodDefault,
  defaultValue: "function" == typeof t.default ? t.default : () => t.default,
  ...D(t)
});

class Te extends U {
  _parse(e) {
    const {ctx: t} = this._processInputParams(e), n = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, r = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return M(r) ? r.then((e => ({
      status: "valid",
      value: "valid" === e.status ? e.value : this._def.catchValue({
        get error() {
          return new k(n.common.issues);
        },
        input: n.data
      })
    }))) : {
      status: "valid",
      value: "valid" === r.status ? r.value : this._def.catchValue({
        get error() {
          return new k(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}

Te.create = (e, t) => new Te({
  innerType: e,
  typeName: De.ZodCatch,
  catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
  ...D(t)
});

class Oe extends U {
  _parse(e) {
    if (this._getType(e) !== b.nan) {
      const t = this._getOrReturnCtx(e);
      return A(t, {
        code: x.invalid_type,
        expected: b.nan,
        received: t.parsedType
      }), j;
    }
    return {
      status: "valid",
      value: e.data
    };
  }
}

Oe.create = e => new Oe({
  typeName: De.ZodNaN,
  ...D(e)
});

const ze = Symbol("zod_brand");

class Me extends U {
  _parse(e) {
    const {ctx: t} = this._processInputParams(e), n = t.data;
    return this._def.type._parse({
      data: n,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}

class Le extends U {
  _parse(e) {
    const {status: t, ctx: n} = this._processInputParams(e);
    if (n.common.async) {
      return (async () => {
        const e = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return "aborted" === e.status ? j : "dirty" === e.status ? (t.dirty(), N(e.value)) : this._def.out._parseAsync({
          data: e.value,
          path: n.path,
          parent: n
        });
      })();
    }
    {
      const e = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return "aborted" === e.status ? j : "dirty" === e.status ? (t.dirty(), {
        status: "dirty",
        value: e.value
      }) : this._def.out._parseSync({
        data: e.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(e, t) {
    return new Le({
      in: e,
      out: t,
      typeName: De.ZodPipeline
    });
  }
}

class Re extends U {
  _parse(e) {
    const t = this._def.innerType._parse(e);
    return z(t) && (t.value = Object.freeze(t.value)), t;
  }
}

Re.create = (e, t) => new Re({
  innerType: e,
  typeName: De.ZodReadonly,
  ...D(t)
});

const Ie = (e, t = {}, n) => e ? ae.create().superRefine(((r, a) => {
  var i, o;
  if (!e(r)) {
    const e = "function" == typeof t ? t(r) : "string" == typeof t ? {
      message: t
    } : t, s = null === (o = null !== (i = e.fatal) && void 0 !== i ? i : n) || void 0 === o || o, l = "string" == typeof e ? {
      message: e
    } : e;
    a.addIssue({
      code: "custom",
      ...l,
      fatal: s
    });
  }
})) : ae.create(), Fe = {
  object: ce.lazycreate
};

var De, Ue;

(Ue = De || (De = {})).ZodString = "ZodString", Ue.ZodNumber = "ZodNumber", Ue.ZodNaN = "ZodNaN", 
Ue.ZodBigInt = "ZodBigInt", Ue.ZodBoolean = "ZodBoolean", Ue.ZodDate = "ZodDate", 
Ue.ZodSymbol = "ZodSymbol", Ue.ZodUndefined = "ZodUndefined", Ue.ZodNull = "ZodNull", 
Ue.ZodAny = "ZodAny", Ue.ZodUnknown = "ZodUnknown", Ue.ZodNever = "ZodNever", Ue.ZodVoid = "ZodVoid", 
Ue.ZodArray = "ZodArray", Ue.ZodObject = "ZodObject", Ue.ZodUnion = "ZodUnion", 
Ue.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", Ue.ZodIntersection = "ZodIntersection", 
Ue.ZodTuple = "ZodTuple", Ue.ZodRecord = "ZodRecord", Ue.ZodMap = "ZodMap", Ue.ZodSet = "ZodSet", 
Ue.ZodFunction = "ZodFunction", Ue.ZodLazy = "ZodLazy", Ue.ZodLiteral = "ZodLiteral", 
Ue.ZodEnum = "ZodEnum", Ue.ZodEffects = "ZodEffects", Ue.ZodNativeEnum = "ZodNativeEnum", 
Ue.ZodOptional = "ZodOptional", Ue.ZodNullable = "ZodNullable", Ue.ZodDefault = "ZodDefault", 
Ue.ZodCatch = "ZodCatch", Ue.ZodPromise = "ZodPromise", Ue.ZodBranded = "ZodBranded", 
Ue.ZodPipeline = "ZodPipeline", Ue.ZodReadonly = "ZodReadonly";

const Ze = Y.create, Be = G.create, Ve = Oe.create, $e = X.create, We = J.create, He = ee.create, qe = te.create, Ke = ne.create, Ye = re.create, Qe = ae.create, Ge = ie.create, Xe = oe.create, Je = se.create, et = le.create, tt = ce.create, nt = ce.strictCreate, rt = de.create, at = pe.create, it = he.create, ot = ge.create, st = ve.create, lt = be.create, ut = ye.create, ct = xe.create, dt = ke.create, ft = we.create, pt = Se.create, mt = Ce.create, ht = Ae.create, gt = Ee.create, vt = je.create, bt = Ne.create, yt = Ee.createWithPreprocess, xt = Le.create, kt = {
  string: e => Y.create({
    ...e,
    coerce: !0
  }),
  number: e => G.create({
    ...e,
    coerce: !0
  }),
  boolean: e => J.create({
    ...e,
    coerce: !0
  }),
  bigint: e => X.create({
    ...e,
    coerce: !0
  }),
  date: e => ee.create({
    ...e,
    coerce: !0
  })
}, wt = j;

var _t = Object.freeze({
  __proto__: null,
  defaultErrorMap: w,
  setErrorMap: function(e) {
    _ = e;
  },
  getErrorMap: S,
  makeIssue: C,
  EMPTY_PATH: [],
  addIssueToContext: A,
  ParseStatus: E,
  INVALID: j,
  DIRTY: N,
  OK: P,
  isAborted: T,
  isDirty: O,
  isValid: z,
  isAsync: M,
  get util() {
    return m;
  },
  get objectUtil() {
    return g;
  },
  ZodParsedType: b,
  getParsedType: y,
  ZodType: U,
  ZodString: Y,
  ZodNumber: G,
  ZodBigInt: X,
  ZodBoolean: J,
  ZodDate: ee,
  ZodSymbol: te,
  ZodUndefined: ne,
  ZodNull: re,
  ZodAny: ae,
  ZodUnknown: ie,
  ZodNever: oe,
  ZodVoid: se,
  ZodArray: le,
  ZodObject: ce,
  ZodUnion: de,
  ZodDiscriminatedUnion: pe,
  ZodIntersection: he,
  ZodTuple: ge,
  ZodRecord: ve,
  ZodMap: be,
  ZodSet: ye,
  ZodFunction: xe,
  ZodLazy: ke,
  ZodLiteral: we,
  ZodEnum: Se,
  ZodNativeEnum: Ce,
  ZodPromise: Ae,
  ZodEffects: Ee,
  ZodTransformer: Ee,
  ZodOptional: je,
  ZodNullable: Ne,
  ZodDefault: Pe,
  ZodCatch: Te,
  ZodNaN: Oe,
  BRAND: ze,
  ZodBranded: Me,
  ZodPipeline: Le,
  ZodReadonly: Re,
  custom: Ie,
  Schema: U,
  ZodSchema: U,
  late: Fe,
  get ZodFirstPartyTypeKind() {
    return De;
  },
  coerce: kt,
  any: Qe,
  array: et,
  bigint: $e,
  boolean: We,
  date: He,
  discriminatedUnion: at,
  effect: gt,
  enum: pt,
  function: ct,
  instanceof: (e, t = {
    message: `Input not instance of ${e.name}`
  }) => Ie((t => t instanceof e), t),
  intersection: it,
  lazy: dt,
  literal: ft,
  map: lt,
  nan: Ve,
  nativeEnum: mt,
  never: Xe,
  null: Ye,
  nullable: bt,
  number: Be,
  object: tt,
  oboolean: () => We().optional(),
  onumber: () => Be().optional(),
  optional: vt,
  ostring: () => Ze().optional(),
  pipeline: xt,
  preprocess: yt,
  promise: ht,
  record: st,
  set: ut,
  strictObject: nt,
  string: Ze,
  symbol: qe,
  transformer: gt,
  tuple: ot,
  undefined: Ke,
  union: rt,
  unknown: Ge,
  void: Je,
  NEVER: wt,
  ZodIssueCode: x,
  quotelessJson: e => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:"),
  ZodError: k
});

const St = _t.object({
  pattern: _t.string(),
  type: _t.enum([ "include", "exclude" ]),
  selector: _t.string()
}), Ct = _t.object({
  free: _t.array(_t.string()),
  assigned: _t.map(_t.string(), _t.number())
}), At = _t.object({
  free: _t.array(_t.string()),
  tabIdsToMarkers: _t.map(_t.number(), _t.string()),
  markersToTabIds: _t.map(_t.string(), _t.number())
}), Et = _t.object({
  hintUppercaseLetters: _t.boolean(),
  hintFontFamily: _t.string(),
  hintFontSize: _t.number(),
  hintWeight: _t.enum([ "auto", "normal", "bold" ]),
  hintBackgroundColor: _t.string(),
  hintBackgroundOpacity: _t.number(),
  hintFontColor: _t.string(),
  hintMinimumContrastRatio: _t.number(),
  hintBorderWidth: _t.number(),
  hintBorderRadius: _t.number(),
  includeSingleLetterHints: _t.boolean(),
  useNumberHints: _t.boolean(),
  hintsToExclude: _t.string(),
  viewportMargin: _t.number(),
  scrollBehavior: _t.enum([ "auto", "smooth", "instant" ]),
  hintsToggleGlobal: _t.boolean(),
  hintsToggleHosts: _t.map(_t.string(), _t.boolean()),
  hintsTogglePaths: _t.map(_t.string(), _t.boolean()),
  hintsToggleTabs: _t.map(_t.number(), _t.boolean()),
  alwaysComputeHintables: _t.boolean(),
  enableNotifications: _t.boolean(),
  notifyWhenTogglingHints: _t.boolean(),
  toastPosition: _t.enum([ "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left" ]),
  toastTransition: _t.enum([ "slide", "flip", "zoom", "bounce" ]),
  toastDuration: _t.number(),
  urlInTitle: _t.boolean(),
  includeTabMarkers: _t.boolean(),
  hideTabMarkersWithGlobalHintsOff: _t.boolean(),
  uppercaseTabMarkers: _t.boolean(),
  keyboardClicking: _t.boolean(),
  keysToExclude: _t.array(_t.tuple([ _t.string(), _t.string() ])),
  customSelectors: _t.array(St),
  customScrollPositions: _t.map(_t.string(), _t.map(_t.string(), _t.number())),
  references: _t.map(_t.string(), _t.map(_t.string(), _t.string())),
  showWhatsNewPageOnUpdate: _t.boolean(),
  newTabPosition: _t.enum([ "relatedAfterCurrent", "afterCurrent", "atEnd" ]),
  hasSeenSettingsPage: _t.boolean(),
  directClickWithNoFocusedDocument: _t.boolean(),
  directClickWhenEditing: _t.boolean(),
  tabsByRecency: _t.map(_t.number(), _t.array(_t.number())),
  hintsStacks: _t.map(_t.number(), Ct),
  tabMarkers: At
}), jt = [];

for (let e = 999; e > 0; e--) jt.push(e.toString());

var Nt, Pt, Tt = {};

Pt = {
  aliceblue: [ 240, 248, 255 ],
  antiquewhite: [ 250, 235, 215 ],
  aqua: [ 0, 255, 255 ],
  aquamarine: [ 127, 255, 212 ],
  azure: [ 240, 255, 255 ],
  beige: [ 245, 245, 220 ],
  bisque: [ 255, 228, 196 ],
  black: [ 0, 0, 0 ],
  blanchedalmond: [ 255, 235, 205 ],
  blue: [ 0, 0, 255 ],
  blueviolet: [ 138, 43, 226 ],
  brown: [ 165, 42, 42 ],
  burlywood: [ 222, 184, 135 ],
  cadetblue: [ 95, 158, 160 ],
  chartreuse: [ 127, 255, 0 ],
  chocolate: [ 210, 105, 30 ],
  coral: [ 255, 127, 80 ],
  cornflowerblue: [ 100, 149, 237 ],
  cornsilk: [ 255, 248, 220 ],
  crimson: [ 220, 20, 60 ],
  cyan: [ 0, 255, 255 ],
  darkblue: [ 0, 0, 139 ],
  darkcyan: [ 0, 139, 139 ],
  darkgoldenrod: [ 184, 134, 11 ],
  darkgray: [ 169, 169, 169 ],
  darkgreen: [ 0, 100, 0 ],
  darkgrey: [ 169, 169, 169 ],
  darkkhaki: [ 189, 183, 107 ],
  darkmagenta: [ 139, 0, 139 ],
  darkolivegreen: [ 85, 107, 47 ],
  darkorange: [ 255, 140, 0 ],
  darkorchid: [ 153, 50, 204 ],
  darkred: [ 139, 0, 0 ],
  darksalmon: [ 233, 150, 122 ],
  darkseagreen: [ 143, 188, 143 ],
  darkslateblue: [ 72, 61, 139 ],
  darkslategray: [ 47, 79, 79 ],
  darkslategrey: [ 47, 79, 79 ],
  darkturquoise: [ 0, 206, 209 ],
  darkviolet: [ 148, 0, 211 ],
  deeppink: [ 255, 20, 147 ],
  deepskyblue: [ 0, 191, 255 ],
  dimgray: [ 105, 105, 105 ],
  dimgrey: [ 105, 105, 105 ],
  dodgerblue: [ 30, 144, 255 ],
  firebrick: [ 178, 34, 34 ],
  floralwhite: [ 255, 250, 240 ],
  forestgreen: [ 34, 139, 34 ],
  fuchsia: [ 255, 0, 255 ],
  gainsboro: [ 220, 220, 220 ],
  ghostwhite: [ 248, 248, 255 ],
  gold: [ 255, 215, 0 ],
  goldenrod: [ 218, 165, 32 ],
  gray: [ 128, 128, 128 ],
  green: [ 0, 128, 0 ],
  greenyellow: [ 173, 255, 47 ],
  grey: [ 128, 128, 128 ],
  honeydew: [ 240, 255, 240 ],
  hotpink: [ 255, 105, 180 ],
  indianred: [ 205, 92, 92 ],
  indigo: [ 75, 0, 130 ],
  ivory: [ 255, 255, 240 ],
  khaki: [ 240, 230, 140 ],
  lavender: [ 230, 230, 250 ],
  lavenderblush: [ 255, 240, 245 ],
  lawngreen: [ 124, 252, 0 ],
  lemonchiffon: [ 255, 250, 205 ],
  lightblue: [ 173, 216, 230 ],
  lightcoral: [ 240, 128, 128 ],
  lightcyan: [ 224, 255, 255 ],
  lightgoldenrodyellow: [ 250, 250, 210 ],
  lightgray: [ 211, 211, 211 ],
  lightgreen: [ 144, 238, 144 ],
  lightgrey: [ 211, 211, 211 ],
  lightpink: [ 255, 182, 193 ],
  lightsalmon: [ 255, 160, 122 ],
  lightseagreen: [ 32, 178, 170 ],
  lightskyblue: [ 135, 206, 250 ],
  lightslategray: [ 119, 136, 153 ],
  lightslategrey: [ 119, 136, 153 ],
  lightsteelblue: [ 176, 196, 222 ],
  lightyellow: [ 255, 255, 224 ],
  lime: [ 0, 255, 0 ],
  limegreen: [ 50, 205, 50 ],
  linen: [ 250, 240, 230 ],
  magenta: [ 255, 0, 255 ],
  maroon: [ 128, 0, 0 ],
  mediumaquamarine: [ 102, 205, 170 ],
  mediumblue: [ 0, 0, 205 ],
  mediumorchid: [ 186, 85, 211 ],
  mediumpurple: [ 147, 112, 219 ],
  mediumseagreen: [ 60, 179, 113 ],
  mediumslateblue: [ 123, 104, 238 ],
  mediumspringgreen: [ 0, 250, 154 ],
  mediumturquoise: [ 72, 209, 204 ],
  mediumvioletred: [ 199, 21, 133 ],
  midnightblue: [ 25, 25, 112 ],
  mintcream: [ 245, 255, 250 ],
  mistyrose: [ 255, 228, 225 ],
  moccasin: [ 255, 228, 181 ],
  navajowhite: [ 255, 222, 173 ],
  navy: [ 0, 0, 128 ],
  oldlace: [ 253, 245, 230 ],
  olive: [ 128, 128, 0 ],
  olivedrab: [ 107, 142, 35 ],
  orange: [ 255, 165, 0 ],
  orangered: [ 255, 69, 0 ],
  orchid: [ 218, 112, 214 ],
  palegoldenrod: [ 238, 232, 170 ],
  palegreen: [ 152, 251, 152 ],
  paleturquoise: [ 175, 238, 238 ],
  palevioletred: [ 219, 112, 147 ],
  papayawhip: [ 255, 239, 213 ],
  peachpuff: [ 255, 218, 185 ],
  peru: [ 205, 133, 63 ],
  pink: [ 255, 192, 203 ],
  plum: [ 221, 160, 221 ],
  powderblue: [ 176, 224, 230 ],
  purple: [ 128, 0, 128 ],
  rebeccapurple: [ 102, 51, 153 ],
  red: [ 255, 0, 0 ],
  rosybrown: [ 188, 143, 143 ],
  royalblue: [ 65, 105, 225 ],
  saddlebrown: [ 139, 69, 19 ],
  salmon: [ 250, 128, 114 ],
  sandybrown: [ 244, 164, 96 ],
  seagreen: [ 46, 139, 87 ],
  seashell: [ 255, 245, 238 ],
  sienna: [ 160, 82, 45 ],
  silver: [ 192, 192, 192 ],
  skyblue: [ 135, 206, 235 ],
  slateblue: [ 106, 90, 205 ],
  slategray: [ 112, 128, 144 ],
  slategrey: [ 112, 128, 144 ],
  snow: [ 255, 250, 250 ],
  springgreen: [ 0, 255, 127 ],
  steelblue: [ 70, 130, 180 ],
  tan: [ 210, 180, 140 ],
  teal: [ 0, 128, 128 ],
  thistle: [ 216, 191, 216 ],
  tomato: [ 255, 99, 71 ],
  turquoise: [ 64, 224, 208 ],
  violet: [ 238, 130, 238 ],
  wheat: [ 245, 222, 179 ],
  white: [ 255, 255, 255 ],
  whitesmoke: [ 245, 245, 245 ],
  yellow: [ 255, 255, 0 ],
  yellowgreen: [ 154, 205, 50 ]
};

var Ot, zt;

zt = function(e) {
  return !(!e || "string" == typeof e) && (e instanceof Array || Array.isArray(e) || e.length >= 0 && (e.splice instanceof Function || Object.getOwnPropertyDescriptor(e, e.length - 1) && "String" !== e.constructor.name));
};

var Mt = Array.prototype.concat, Lt = Array.prototype.slice, Rt = Ot = function(e) {
  for (var t = [], n = 0, r = e.length; n < r; n++) {
    var a = e[n];
    zt(a) ? t = Mt.call(t, Lt.call(a)) : t.push(a);
  }
  return t;
};

Rt.wrap = function(e) {
  return function() {
    return e(Rt(arguments));
  };
};

var It = Object.hasOwnProperty, Ft = Object.create(null);

for (var Dt in Pt) It.call(Pt, Dt) && (Ft[Pt[Dt]] = Dt);

var Ut = Tt = {
  to: {},
  get: {}
};

function Zt(e, t, n) {
  return Math.min(Math.max(t, e), n);
}

function Bt(e) {
  var t = Math.round(e).toString(16).toUpperCase();
  return t.length < 2 ? "0" + t : t;
}

Ut.get = function(e) {
  var t, n;
  switch (e.substring(0, 3).toLowerCase()) {
   case "hsl":
    t = Ut.get.hsl(e), n = "hsl";
    break;

   case "hwb":
    t = Ut.get.hwb(e), n = "hwb";
    break;

   default:
    t = Ut.get.rgb(e), n = "rgb";
  }
  return t ? {
    model: n,
    value: t
  } : null;
}, Ut.get.rgb = function(e) {
  if (!e) return null;
  var t, n, r, a = [ 0, 0, 0, 1 ];
  if (t = e.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)) {
    for (r = t[2], t = t[1], n = 0; n < 3; n++) {
      var i = 2 * n;
      a[n] = parseInt(t.slice(i, i + 2), 16);
    }
    r && (a[3] = parseInt(r, 16) / 255);
  } else if (t = e.match(/^#([a-f0-9]{3,4})$/i)) {
    for (r = (t = t[1])[3], n = 0; n < 3; n++) a[n] = parseInt(t[n] + t[n], 16);
    r && (a[3] = parseInt(r + r, 16) / 255);
  } else if (t = e.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)) {
    for (n = 0; n < 3; n++) a[n] = parseInt(t[n + 1], 0);
    t[4] && (t[5] ? a[3] = .01 * parseFloat(t[4]) : a[3] = parseFloat(t[4]));
  } else {
    if (!(t = e.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/))) return (t = e.match(/^(\w+)$/)) ? "transparent" === t[1] ? [ 0, 0, 0, 0 ] : It.call(Pt, t[1]) ? ((a = Pt[t[1]])[3] = 1, 
    a) : null : null;
    for (n = 0; n < 3; n++) a[n] = Math.round(2.55 * parseFloat(t[n + 1]));
    t[4] && (t[5] ? a[3] = .01 * parseFloat(t[4]) : a[3] = parseFloat(t[4]));
  }
  for (n = 0; n < 3; n++) a[n] = Zt(a[n], 0, 255);
  return a[3] = Zt(a[3], 0, 1), a;
}, Ut.get.hsl = function(e) {
  if (!e) return null;
  var t = e.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
  if (t) {
    var n = parseFloat(t[4]);
    return [ (parseFloat(t[1]) % 360 + 360) % 360, Zt(parseFloat(t[2]), 0, 100), Zt(parseFloat(t[3]), 0, 100), Zt(isNaN(n) ? 1 : n, 0, 1) ];
  }
  return null;
}, Ut.get.hwb = function(e) {
  if (!e) return null;
  var t = e.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);
  if (t) {
    var n = parseFloat(t[4]);
    return [ (parseFloat(t[1]) % 360 + 360) % 360, Zt(parseFloat(t[2]), 0, 100), Zt(parseFloat(t[3]), 0, 100), Zt(isNaN(n) ? 1 : n, 0, 1) ];
  }
  return null;
}, Ut.to.hex = function() {
  var e = Ot(arguments);
  return "#" + Bt(e[0]) + Bt(e[1]) + Bt(e[2]) + (e[3] < 1 ? Bt(Math.round(255 * e[3])) : "");
}, Ut.to.rgb = function() {
  var e = Ot(arguments);
  return e.length < 4 || 1 === e[3] ? "rgb(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ")" : "rgba(" + Math.round(e[0]) + ", " + Math.round(e[1]) + ", " + Math.round(e[2]) + ", " + e[3] + ")";
}, Ut.to.rgb.percent = function() {
  var e = Ot(arguments), t = Math.round(e[0] / 255 * 100), n = Math.round(e[1] / 255 * 100), r = Math.round(e[2] / 255 * 100);
  return e.length < 4 || 1 === e[3] ? "rgb(" + t + "%, " + n + "%, " + r + "%)" : "rgba(" + t + "%, " + n + "%, " + r + "%, " + e[3] + ")";
}, Ut.to.hsl = function() {
  var e = Ot(arguments);
  return e.length < 4 || 1 === e[3] ? "hsl(" + e[0] + ", " + e[1] + "%, " + e[2] + "%)" : "hsla(" + e[0] + ", " + e[1] + "%, " + e[2] + "%, " + e[3] + ")";
}, Ut.to.hwb = function() {
  var e = Ot(arguments), t = "";
  return e.length >= 4 && 1 !== e[3] && (t = ", " + e[3]), "hwb(" + e[0] + ", " + e[1] + "%, " + e[2] + "%" + t + ")";
}, Ut.to.keyword = function(e) {
  return Ft[e.slice(0, 3)];
};

var Vt, $t = {};

const Wt = {};

for (const e of Object.keys(Pt)) Wt[Pt[e]] = e;

const Ht = {
  rgb: {
    channels: 3,
    labels: "rgb"
  },
  hsl: {
    channels: 3,
    labels: "hsl"
  },
  hsv: {
    channels: 3,
    labels: "hsv"
  },
  hwb: {
    channels: 3,
    labels: "hwb"
  },
  cmyk: {
    channels: 4,
    labels: "cmyk"
  },
  xyz: {
    channels: 3,
    labels: "xyz"
  },
  lab: {
    channels: 3,
    labels: "lab"
  },
  lch: {
    channels: 3,
    labels: "lch"
  },
  hex: {
    channels: 1,
    labels: [ "hex" ]
  },
  keyword: {
    channels: 1,
    labels: [ "keyword" ]
  },
  ansi16: {
    channels: 1,
    labels: [ "ansi16" ]
  },
  ansi256: {
    channels: 1,
    labels: [ "ansi256" ]
  },
  hcg: {
    channels: 3,
    labels: [ "h", "c", "g" ]
  },
  apple: {
    channels: 3,
    labels: [ "r16", "g16", "b16" ]
  },
  gray: {
    channels: 1,
    labels: [ "gray" ]
  }
};

Vt = Ht;

for (const e of Object.keys(Ht)) {
  if (!("channels" in Ht[e])) throw new Error("missing channels property: " + e);
  if (!("labels" in Ht[e])) throw new Error("missing channel labels property: " + e);
  if (Ht[e].labels.length !== Ht[e].channels) throw new Error("channel and label counts mismatch: " + e);
  const {channels: t, labels: n} = Ht[e];
  delete Ht[e].channels, delete Ht[e].labels, Object.defineProperty(Ht[e], "channels", {
    value: t
  }), Object.defineProperty(Ht[e], "labels", {
    value: n
  });
}

Ht.rgb.hsl = function(e) {
  const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.min(t, n, r), i = Math.max(t, n, r), o = i - a;
  let s, l;
  i === a ? s = 0 : t === i ? s = (n - r) / o : n === i ? s = 2 + (r - t) / o : r === i && (s = 4 + (t - n) / o), 
  s = Math.min(60 * s, 360), s < 0 && (s += 360);
  const u = (a + i) / 2;
  return l = i === a ? 0 : u <= .5 ? o / (i + a) : o / (2 - i - a), [ s, 100 * l, 100 * u ];
}, Ht.rgb.hsv = function(e) {
  let t, n, r, a, i;
  const o = e[0] / 255, s = e[1] / 255, l = e[2] / 255, u = Math.max(o, s, l), c = u - Math.min(o, s, l), d = function(e) {
    return (u - e) / 6 / c + .5;
  };
  return 0 === c ? (a = 0, i = 0) : (i = c / u, t = d(o), n = d(s), r = d(l), o === u ? a = r - n : s === u ? a = 1 / 3 + t - r : l === u && (a = 2 / 3 + n - t), 
  a < 0 ? a += 1 : a > 1 && (a -= 1)), [ 360 * a, 100 * i, 100 * u ];
}, Ht.rgb.hwb = function(e) {
  const t = e[0], n = e[1];
  let r = e[2];
  const a = Ht.rgb.hsl(e)[0], i = 1 / 255 * Math.min(t, Math.min(n, r));
  return r = 1 - 1 / 255 * Math.max(t, Math.max(n, r)), [ a, 100 * i, 100 * r ];
}, Ht.rgb.cmyk = function(e) {
  const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.min(1 - t, 1 - n, 1 - r);
  return [ 100 * ((1 - t - a) / (1 - a) || 0), 100 * ((1 - n - a) / (1 - a) || 0), 100 * ((1 - r - a) / (1 - a) || 0), 100 * a ];
}, Ht.rgb.keyword = function(e) {
  const t = Wt[e];
  if (t) return t;
  let n, r = 1 / 0;
  for (const t of Object.keys(Pt)) {
    const o = (i = Pt[t], ((a = e)[0] - i[0]) ** 2 + (a[1] - i[1]) ** 2 + (a[2] - i[2]) ** 2);
    o < r && (r = o, n = t);
  }
  var a, i;
  return n;
}, Ht.keyword.rgb = function(e) {
  return Pt[e];
}, Ht.rgb.xyz = function(e) {
  let t = e[0] / 255, n = e[1] / 255, r = e[2] / 255;
  t = t > .04045 ? ((t + .055) / 1.055) ** 2.4 : t / 12.92, n = n > .04045 ? ((n + .055) / 1.055) ** 2.4 : n / 12.92, 
  r = r > .04045 ? ((r + .055) / 1.055) ** 2.4 : r / 12.92;
  return [ 100 * (.4124 * t + .3576 * n + .1805 * r), 100 * (.2126 * t + .7152 * n + .0722 * r), 100 * (.0193 * t + .1192 * n + .9505 * r) ];
}, Ht.rgb.lab = function(e) {
  const t = Ht.rgb.xyz(e);
  let n = t[0], r = t[1], a = t[2];
  n /= 95.047, r /= 100, a /= 108.883, n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116, 
  r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116, a = a > .008856 ? a ** (1 / 3) : 7.787 * a + 16 / 116;
  return [ 116 * r - 16, 500 * (n - r), 200 * (r - a) ];
}, Ht.hsl.rgb = function(e) {
  const t = e[0] / 360, n = e[1] / 100, r = e[2] / 100;
  let a, i, o;
  if (0 === n) return o = 255 * r, [ o, o, o ];
  a = r < .5 ? r * (1 + n) : r + n - r * n;
  const s = 2 * r - a, l = [ 0, 0, 0 ];
  for (let e = 0; e < 3; e++) i = t + 1 / 3 * -(e - 1), i < 0 && i++, i > 1 && i--, 
  o = 6 * i < 1 ? s + 6 * (a - s) * i : 2 * i < 1 ? a : 3 * i < 2 ? s + (a - s) * (2 / 3 - i) * 6 : s, 
  l[e] = 255 * o;
  return l;
}, Ht.hsl.hsv = function(e) {
  const t = e[0];
  let n = e[1] / 100, r = e[2] / 100, a = n;
  const i = Math.max(r, .01);
  r *= 2, n *= r <= 1 ? r : 2 - r, a *= i <= 1 ? i : 2 - i;
  return [ t, 100 * (0 === r ? 2 * a / (i + a) : 2 * n / (r + n)), 100 * ((r + n) / 2) ];
}, Ht.hsv.rgb = function(e) {
  const t = e[0] / 60, n = e[1] / 100;
  let r = e[2] / 100;
  const a = Math.floor(t) % 6, i = t - Math.floor(t), o = 255 * r * (1 - n), s = 255 * r * (1 - n * i), l = 255 * r * (1 - n * (1 - i));
  switch (r *= 255, a) {
   case 0:
    return [ r, l, o ];

   case 1:
    return [ s, r, o ];

   case 2:
    return [ o, r, l ];

   case 3:
    return [ o, s, r ];

   case 4:
    return [ l, o, r ];

   case 5:
    return [ r, o, s ];
  }
}, Ht.hsv.hsl = function(e) {
  const t = e[0], n = e[1] / 100, r = e[2] / 100, a = Math.max(r, .01);
  let i, o;
  o = (2 - n) * r;
  const s = (2 - n) * a;
  return i = n * a, i /= s <= 1 ? s : 2 - s, i = i || 0, o /= 2, [ t, 100 * i, 100 * o ];
}, Ht.hwb.rgb = function(e) {
  const t = e[0] / 360;
  let n = e[1] / 100, r = e[2] / 100;
  const a = n + r;
  let i;
  a > 1 && (n /= a, r /= a);
  const o = Math.floor(6 * t), s = 1 - r;
  i = 6 * t - o, 0 != (1 & o) && (i = 1 - i);
  const l = n + i * (s - n);
  let u, c, d;
  switch (o) {
   default:
   case 6:
   case 0:
    u = s, c = l, d = n;
    break;

   case 1:
    u = l, c = s, d = n;
    break;

   case 2:
    u = n, c = s, d = l;
    break;

   case 3:
    u = n, c = l, d = s;
    break;

   case 4:
    u = l, c = n, d = s;
    break;

   case 5:
    u = s, c = n, d = l;
  }
  return [ 255 * u, 255 * c, 255 * d ];
}, Ht.cmyk.rgb = function(e) {
  const t = e[0] / 100, n = e[1] / 100, r = e[2] / 100, a = e[3] / 100;
  return [ 255 * (1 - Math.min(1, t * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a)), 255 * (1 - Math.min(1, r * (1 - a) + a)) ];
}, Ht.xyz.rgb = function(e) {
  const t = e[0] / 100, n = e[1] / 100, r = e[2] / 100;
  let a, i, o;
  return a = 3.2406 * t + -1.5372 * n + -.4986 * r, i = -.9689 * t + 1.8758 * n + .0415 * r, 
  o = .0557 * t + -.204 * n + 1.057 * r, a = a > .0031308 ? 1.055 * a ** (1 / 2.4) - .055 : 12.92 * a, 
  i = i > .0031308 ? 1.055 * i ** (1 / 2.4) - .055 : 12.92 * i, o = o > .0031308 ? 1.055 * o ** (1 / 2.4) - .055 : 12.92 * o, 
  a = Math.min(Math.max(0, a), 1), i = Math.min(Math.max(0, i), 1), o = Math.min(Math.max(0, o), 1), 
  [ 255 * a, 255 * i, 255 * o ];
}, Ht.xyz.lab = function(e) {
  let t = e[0], n = e[1], r = e[2];
  t /= 95.047, n /= 100, r /= 108.883, t = t > .008856 ? t ** (1 / 3) : 7.787 * t + 16 / 116, 
  n = n > .008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116, r = r > .008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116;
  return [ 116 * n - 16, 500 * (t - n), 200 * (n - r) ];
}, Ht.lab.xyz = function(e) {
  let t, n, r;
  n = (e[0] + 16) / 116, t = e[1] / 500 + n, r = n - e[2] / 200;
  const a = n ** 3, i = t ** 3, o = r ** 3;
  return n = a > .008856 ? a : (n - 16 / 116) / 7.787, t = i > .008856 ? i : (t - 16 / 116) / 7.787, 
  r = o > .008856 ? o : (r - 16 / 116) / 7.787, t *= 95.047, n *= 100, r *= 108.883, 
  [ t, n, r ];
}, Ht.lab.lch = function(e) {
  const t = e[0], n = e[1], r = e[2];
  let a;
  a = 360 * Math.atan2(r, n) / 2 / Math.PI, a < 0 && (a += 360);
  return [ t, Math.sqrt(n * n + r * r), a ];
}, Ht.lch.lab = function(e) {
  const t = e[0], n = e[1], r = e[2] / 360 * 2 * Math.PI;
  return [ t, n * Math.cos(r), n * Math.sin(r) ];
}, Ht.rgb.ansi16 = function(e, t = null) {
  const [n, r, a] = e;
  let i = null === t ? Ht.rgb.hsv(e)[2] : t;
  if (i = Math.round(i / 50), 0 === i) return 30;
  let o = 30 + (Math.round(a / 255) << 2 | Math.round(r / 255) << 1 | Math.round(n / 255));
  return 2 === i && (o += 60), o;
}, Ht.hsv.ansi16 = function(e) {
  return Ht.rgb.ansi16(Ht.hsv.rgb(e), e[2]);
}, Ht.rgb.ansi256 = function(e) {
  const t = e[0], n = e[1], r = e[2];
  if (t === n && n === r) return t < 8 ? 16 : t > 248 ? 231 : Math.round((t - 8) / 247 * 24) + 232;
  return 16 + 36 * Math.round(t / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(r / 255 * 5);
}, Ht.ansi16.rgb = function(e) {
  let t = e % 10;
  if (0 === t || 7 === t) return e > 50 && (t += 3.5), t = t / 10.5 * 255, [ t, t, t ];
  const n = .5 * (1 + ~~(e > 50));
  return [ (1 & t) * n * 255, (t >> 1 & 1) * n * 255, (t >> 2 & 1) * n * 255 ];
}, Ht.ansi256.rgb = function(e) {
  if (e >= 232) {
    const t = 10 * (e - 232) + 8;
    return [ t, t, t ];
  }
  let t;
  e -= 16;
  return [ Math.floor(e / 36) / 5 * 255, Math.floor((t = e % 36) / 6) / 5 * 255, t % 6 / 5 * 255 ];
}, Ht.rgb.hex = function(e) {
  const t = (((255 & Math.round(e[0])) << 16) + ((255 & Math.round(e[1])) << 8) + (255 & Math.round(e[2]))).toString(16).toUpperCase();
  return "000000".substring(t.length) + t;
}, Ht.hex.rgb = function(e) {
  const t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!t) return [ 0, 0, 0 ];
  let n = t[0];
  3 === t[0].length && (n = n.split("").map((e => e + e)).join(""));
  const r = parseInt(n, 16);
  return [ r >> 16 & 255, r >> 8 & 255, 255 & r ];
}, Ht.rgb.hcg = function(e) {
  const t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, a = Math.max(Math.max(t, n), r), i = Math.min(Math.min(t, n), r), o = a - i;
  let s, l;
  return s = o < 1 ? i / (1 - o) : 0, l = o <= 0 ? 0 : a === t ? (n - r) / o % 6 : a === n ? 2 + (r - t) / o : 4 + (t - n) / o, 
  l /= 6, l %= 1, [ 360 * l, 100 * o, 100 * s ];
}, Ht.hsl.hcg = function(e) {
  const t = e[1] / 100, n = e[2] / 100, r = n < .5 ? 2 * t * n : 2 * t * (1 - n);
  let a = 0;
  return r < 1 && (a = (n - .5 * r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
}, Ht.hsv.hcg = function(e) {
  const t = e[1] / 100, n = e[2] / 100, r = t * n;
  let a = 0;
  return r < 1 && (a = (n - r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
}, Ht.hcg.rgb = function(e) {
  const t = e[0] / 360, n = e[1] / 100, r = e[2] / 100;
  if (0 === n) return [ 255 * r, 255 * r, 255 * r ];
  const a = [ 0, 0, 0 ], i = t % 1 * 6, o = i % 1, s = 1 - o;
  let l = 0;
  switch (Math.floor(i)) {
   case 0:
    a[0] = 1, a[1] = o, a[2] = 0;
    break;

   case 1:
    a[0] = s, a[1] = 1, a[2] = 0;
    break;

   case 2:
    a[0] = 0, a[1] = 1, a[2] = o;
    break;

   case 3:
    a[0] = 0, a[1] = s, a[2] = 1;
    break;

   case 4:
    a[0] = o, a[1] = 0, a[2] = 1;
    break;

   default:
    a[0] = 1, a[1] = 0, a[2] = s;
  }
  return l = (1 - n) * r, [ 255 * (n * a[0] + l), 255 * (n * a[1] + l), 255 * (n * a[2] + l) ];
}, Ht.hcg.hsv = function(e) {
  const t = e[1] / 100, n = t + e[2] / 100 * (1 - t);
  let r = 0;
  return n > 0 && (r = t / n), [ e[0], 100 * r, 100 * n ];
}, Ht.hcg.hsl = function(e) {
  const t = e[1] / 100, n = e[2] / 100 * (1 - t) + .5 * t;
  let r = 0;
  return n > 0 && n < .5 ? r = t / (2 * n) : n >= .5 && n < 1 && (r = t / (2 * (1 - n))), 
  [ e[0], 100 * r, 100 * n ];
}, Ht.hcg.hwb = function(e) {
  const t = e[1] / 100, n = t + e[2] / 100 * (1 - t);
  return [ e[0], 100 * (n - t), 100 * (1 - n) ];
}, Ht.hwb.hcg = function(e) {
  const t = e[1] / 100, n = 1 - e[2] / 100, r = n - t;
  let a = 0;
  return r < 1 && (a = (n - r) / (1 - r)), [ e[0], 100 * r, 100 * a ];
}, Ht.apple.rgb = function(e) {
  return [ e[0] / 65535 * 255, e[1] / 65535 * 255, e[2] / 65535 * 255 ];
}, Ht.rgb.apple = function(e) {
  return [ e[0] / 255 * 65535, e[1] / 255 * 65535, e[2] / 255 * 65535 ];
}, Ht.gray.rgb = function(e) {
  return [ e[0] / 100 * 255, e[0] / 100 * 255, e[0] / 100 * 255 ];
}, Ht.gray.hsl = function(e) {
  return [ 0, 0, e[0] ];
}, Ht.gray.hsv = Ht.gray.hsl, Ht.gray.hwb = function(e) {
  return [ 0, 100, e[0] ];
}, Ht.gray.cmyk = function(e) {
  return [ 0, 0, 0, e[0] ];
}, Ht.gray.lab = function(e) {
  return [ e[0], 0, 0 ];
}, Ht.gray.hex = function(e) {
  const t = 255 & Math.round(e[0] / 100 * 255), n = ((t << 16) + (t << 8) + t).toString(16).toUpperCase();
  return "000000".substring(n.length) + n;
}, Ht.rgb.gray = function(e) {
  return [ (e[0] + e[1] + e[2]) / 3 / 255 * 100 ];
};

var qt;

function Kt(e) {
  const t = function() {
    const e = {}, t = Object.keys(Vt);
    for (let n = t.length, r = 0; r < n; r++) e[t[r]] = {
      distance: -1,
      parent: null
    };
    return e;
  }(), n = [ e ];
  for (t[e].distance = 0; n.length; ) {
    const e = n.pop(), r = Object.keys(Vt[e]);
    for (let a = r.length, i = 0; i < a; i++) {
      const a = r[i], o = t[a];
      -1 === o.distance && (o.distance = t[e].distance + 1, o.parent = e, n.unshift(a));
    }
  }
  return t;
}

function Yt(e, t) {
  return function(n) {
    return t(e(n));
  };
}

function Qt(e, t) {
  const n = [ t[e].parent, e ];
  let r = Vt[t[e].parent][e], a = t[e].parent;
  for (;t[a].parent; ) n.unshift(t[a].parent), r = Yt(Vt[t[a].parent][a], r), a = t[a].parent;
  return r.conversion = n, r;
}

qt = function(e) {
  const t = Kt(e), n = {}, r = Object.keys(t);
  for (let e = r.length, a = 0; a < e; a++) {
    const e = r[a];
    null !== t[e].parent && (n[e] = Qt(e, t));
  }
  return n;
};

const Gt = {};

Object.keys(Vt).forEach((e => {
  Gt[e] = {}, Object.defineProperty(Gt[e], "channels", {
    value: Vt[e].channels
  }), Object.defineProperty(Gt[e], "labels", {
    value: Vt[e].labels
  });
  const t = qt(e);
  Object.keys(t).forEach((n => {
    const r = t[n];
    Gt[e][n] = function(e) {
      const t = function(...t) {
        const n = t[0];
        if (null == n) return n;
        n.length > 1 && (t = n);
        const r = e(t);
        if ("object" == typeof r) for (let e = r.length, t = 0; t < e; t++) r[t] = Math.round(r[t]);
        return r;
      };
      return "conversion" in e && (t.conversion = e.conversion), t;
    }(r), Gt[e][n].raw = function(e) {
      const t = function(...t) {
        const n = t[0];
        return null == n ? n : (n.length > 1 && (t = n), e(t));
      };
      return "conversion" in e && (t.conversion = e.conversion), t;
    }(r);
  }));
})), $t = Gt;

const Xt = [ "keyword", "gray", "hex" ], Jt = {};

for (const e of Object.keys($t)) Jt[[ ...$t[e].labels ].sort().join("")] = e;

const en = {};

function tn(e, t) {
  if (!(this instanceof tn)) return new tn(e, t);
  if (t && t in Xt && (t = null), t && !(t in $t)) throw new Error("Unknown model: " + t);
  let n, r;
  if (null == e) this.model = "rgb", this.color = [ 0, 0, 0 ], this.valpha = 1; else if (e instanceof tn) this.model = e.model, 
  this.color = [ ...e.color ], this.valpha = e.valpha; else if ("string" == typeof e) {
    const t = Tt.get(e);
    if (null === t) throw new Error("Unable to parse color from string: " + e);
    this.model = t.model, r = $t[this.model].channels, this.color = t.value.slice(0, r), 
    this.valpha = "number" == typeof t.value[r] ? t.value[r] : 1;
  } else if (e.length > 0) {
    this.model = t || "rgb", r = $t[this.model].channels;
    const n = Array.prototype.slice.call(e, 0, r);
    this.color = on(n, r), this.valpha = "number" == typeof e[r] ? e[r] : 1;
  } else if ("number" == typeof e) this.model = "rgb", this.color = [ e >> 16 & 255, e >> 8 & 255, 255 & e ], 
  this.valpha = 1; else {
    this.valpha = 1;
    const t = Object.keys(e);
    "alpha" in e && (t.splice(t.indexOf("alpha"), 1), this.valpha = "number" == typeof e.alpha ? e.alpha : 0);
    const r = t.sort().join("");
    if (!(r in Jt)) throw new Error("Unable to parse color from object: " + JSON.stringify(e));
    this.model = Jt[r];
    const {labels: a} = $t[this.model], i = [];
    for (n = 0; n < a.length; n++) i.push(e[a[n]]);
    this.color = on(i);
  }
  if (en[this.model]) for (r = $t[this.model].channels, n = 0; n < r; n++) {
    const e = en[this.model][n];
    e && (this.color[n] = e(this.color[n]));
  }
  this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze && Object.freeze(this);
}

tn.prototype = {
  toString() {
    return this.string();
  },
  toJSON() {
    return this[this.model]();
  },
  string(e) {
    let t = this.model in Tt.to ? this : this.rgb();
    t = t.round("number" == typeof e ? e : 1);
    const n = 1 === t.valpha ? t.color : [ ...t.color, this.valpha ];
    return Tt.to[t.model](n);
  },
  percentString(e) {
    const t = this.rgb().round("number" == typeof e ? e : 1), n = 1 === t.valpha ? t.color : [ ...t.color, this.valpha ];
    return Tt.to.rgb.percent(n);
  },
  array() {
    return 1 === this.valpha ? [ ...this.color ] : [ ...this.color, this.valpha ];
  },
  object() {
    const e = {}, {channels: t} = $t[this.model], {labels: n} = $t[this.model];
    for (let r = 0; r < t; r++) e[n[r]] = this.color[r];
    return 1 !== this.valpha && (e.alpha = this.valpha), e;
  },
  unitArray() {
    const e = this.rgb().color;
    return e[0] /= 255, e[1] /= 255, e[2] /= 255, 1 !== this.valpha && e.push(this.valpha), 
    e;
  },
  unitObject() {
    const e = this.rgb().object();
    return e.r /= 255, e.g /= 255, e.b /= 255, 1 !== this.valpha && (e.alpha = this.valpha), 
    e;
  },
  round(e) {
    return e = Math.max(e || 0, 0), new tn([ ...this.color.map(nn(e)), this.valpha ], this.model);
  },
  alpha(e) {
    return void 0 !== e ? new tn([ ...this.color, Math.max(0, Math.min(1, e)) ], this.model) : this.valpha;
  },
  red: rn("rgb", 0, an(255)),
  green: rn("rgb", 1, an(255)),
  blue: rn("rgb", 2, an(255)),
  hue: rn([ "hsl", "hsv", "hsl", "hwb", "hcg" ], 0, (e => (e % 360 + 360) % 360)),
  saturationl: rn("hsl", 1, an(100)),
  lightness: rn("hsl", 2, an(100)),
  saturationv: rn("hsv", 1, an(100)),
  value: rn("hsv", 2, an(100)),
  chroma: rn("hcg", 1, an(100)),
  gray: rn("hcg", 2, an(100)),
  white: rn("hwb", 1, an(100)),
  wblack: rn("hwb", 2, an(100)),
  cyan: rn("cmyk", 0, an(100)),
  magenta: rn("cmyk", 1, an(100)),
  yellow: rn("cmyk", 2, an(100)),
  black: rn("cmyk", 3, an(100)),
  x: rn("xyz", 0, an(95.047)),
  y: rn("xyz", 1, an(100)),
  z: rn("xyz", 2, an(108.833)),
  l: rn("lab", 0, an(100)),
  a: rn("lab", 1),
  b: rn("lab", 2),
  keyword(e) {
    return void 0 !== e ? new tn(e) : $t[this.model].keyword(this.color);
  },
  hex(e) {
    return void 0 !== e ? new tn(e) : Tt.to.hex(this.rgb().round().color);
  },
  hexa(e) {
    if (void 0 !== e) return new tn(e);
    const t = this.rgb().round().color;
    let n = Math.round(255 * this.valpha).toString(16).toUpperCase();
    return 1 === n.length && (n = "0" + n), Tt.to.hex(t) + n;
  },
  rgbNumber() {
    const e = this.rgb().color;
    return (255 & e[0]) << 16 | (255 & e[1]) << 8 | 255 & e[2];
  },
  luminosity() {
    const e = this.rgb().color, t = [];
    for (const [n, r] of e.entries()) {
      const e = r / 255;
      t[n] = e <= .04045 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;
    }
    return .2126 * t[0] + .7152 * t[1] + .0722 * t[2];
  },
  contrast(e) {
    const t = this.luminosity(), n = e.luminosity();
    return t > n ? (t + .05) / (n + .05) : (n + .05) / (t + .05);
  },
  level(e) {
    const t = this.contrast(e);
    return t >= 7 ? "AAA" : t >= 4.5 ? "AA" : "";
  },
  isDark() {
    const e = this.rgb().color;
    return (2126 * e[0] + 7152 * e[1] + 722 * e[2]) / 1e4 < 128;
  },
  isLight() {
    return !this.isDark();
  },
  negate() {
    const e = this.rgb();
    for (let t = 0; t < 3; t++) e.color[t] = 255 - e.color[t];
    return e;
  },
  lighten(e) {
    const t = this.hsl();
    return t.color[2] += t.color[2] * e, t;
  },
  darken(e) {
    const t = this.hsl();
    return t.color[2] -= t.color[2] * e, t;
  },
  saturate(e) {
    const t = this.hsl();
    return t.color[1] += t.color[1] * e, t;
  },
  desaturate(e) {
    const t = this.hsl();
    return t.color[1] -= t.color[1] * e, t;
  },
  whiten(e) {
    const t = this.hwb();
    return t.color[1] += t.color[1] * e, t;
  },
  blacken(e) {
    const t = this.hwb();
    return t.color[2] += t.color[2] * e, t;
  },
  grayscale() {
    const e = this.rgb().color, t = .3 * e[0] + .59 * e[1] + .11 * e[2];
    return tn.rgb(t, t, t);
  },
  fade(e) {
    return this.alpha(this.valpha - this.valpha * e);
  },
  opaquer(e) {
    return this.alpha(this.valpha + this.valpha * e);
  },
  rotate(e) {
    const t = this.hsl();
    let n = t.color[0];
    return n = (n + e) % 360, n = n < 0 ? 360 + n : n, t.color[0] = n, t;
  },
  mix(e, t) {
    if (!e || !e.rgb) throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof e);
    const n = e.rgb(), r = this.rgb(), a = void 0 === t ? .5 : t, i = 2 * a - 1, o = n.alpha() - r.alpha(), s = ((i * o == -1 ? i : (i + o) / (1 + i * o)) + 1) / 2, l = 1 - s;
    return tn.rgb(s * n.red() + l * r.red(), s * n.green() + l * r.green(), s * n.blue() + l * r.blue(), n.alpha() * a + r.alpha() * (1 - a));
  }
};

for (const e of Object.keys($t)) {
  if (Xt.includes(e)) continue;
  const {channels: t} = $t[e];
  tn.prototype[e] = function(...t) {
    return this.model === e ? new tn(this) : t.length > 0 ? new tn(t, e) : new tn([ ...(n = $t[this.model][e].raw(this.color), 
    Array.isArray(n) ? n : [ n ]), this.valpha ], e);
    var n;
  }, tn[e] = function(...n) {
    let r = n[0];
    return "number" == typeof r && (r = on(n, t)), new tn(r, e);
  };
}

function nn(e) {
  return function(t) {
    return function(e, t) {
      return Number(e.toFixed(t));
    }(t, e);
  };
}

function rn(e, t, n) {
  e = Array.isArray(e) ? e : [ e ];
  for (const r of e) (en[r] || (en[r] = []))[t] = n;
  return e = e[0], function(r) {
    let a;
    return void 0 !== r ? (n && (r = n(r)), a = this[e](), a.color[t] = r, a) : (a = this[e]().color[t], 
    n && (a = n(a)), a);
  };
}

function an(e) {
  return function(t) {
    return Math.max(0, Math.min(e, t));
  };
}

function on(e, t) {
  for (let n = 0; n < t; n++) "number" != typeof e[n] && (e[n] = 0);
  return e;
}

Nt = tn;

const sn = {
  hintUppercaseLetters: !1,
  hintFontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
  hintFontSize: 10,
  hintWeight: "auto",
  hintBackgroundColor: "",
  hintBackgroundOpacity: 1,
  hintFontColor: "",
  hintBorderWidth: 1,
  hintBorderRadius: 3,
  hintMinimumContrastRatio: 4,
  scrollBehavior: "auto",
  hintsToggleGlobal: !0,
  hintsToggleHosts: new Map,
  hintsTogglePaths: new Map,
  hintsToggleTabs: new Map,
  alwaysComputeHintables: !1,
  enableNotifications: !0,
  notifyWhenTogglingHints: !1,
  toastPosition: "top-center",
  toastTransition: "bounce",
  toastDuration: 5e3,
  includeSingleLetterHints: !0,
  useNumberHints: !1,
  hintsToExclude: "",
  viewportMargin: 1e3,
  urlInTitle: !0,
  includeTabMarkers: !0,
  hideTabMarkersWithGlobalHintsOff: !1,
  uppercaseTabMarkers: !0,
  keyboardClicking: !1,
  keysToExclude: new Array,
  customSelectors: new Array,
  customScrollPositions: new Map,
  references: new Map,
  showWhatsNewPageOnUpdate: !0,
  newTabPosition: "relatedAfterCurrent",
  hasSeenSettingsPage: !1,
  directClickWithNoFocusedDocument: !1,
  directClickWhenEditing: !0
}, ln = {
  ...sn
};

function un(e) {
  if (!e) return !0;
  try {
    new (t(Nt))(e);
  } catch {
    return !1;
  }
  return !0;
}

function cn(e, t, n) {
  return e >= t && e <= n;
}

const dn = {
  hintBackgroundColor: un,
  hintFontColor: un,
  hintFontSize: e => cn(e, 1, 72),
  hintBorderRadius: e => cn(e, 0, 72),
  hintBorderWidth: e => cn(e, 0, 72),
  hintBackgroundOpacity: e => "" !== e && cn(e, 0, 1),
  hintMinimumContrastRatio: e => cn(e, 2.5, 21),
  viewportMargin: e => cn(e, 0, 2e3)
};

function fn(e) {
  return e in sn;
}

function pn(e, t) {
  if (!fn(e)) return !1;
  const n = dn[e];
  return void 0 === n || n(t);
}

const mn = {
  ...sn,
  tabsByRecency: new Map,
  hintsStacks: new Map,
  tabMarkers: {
    free: [ "zz", "zy", "zx", "zw", "zv", "zu", "zt", "zs", "zr", "zq", "zp", "zo", "zn", "zm", "zl", "zk", "zj", "zi", "zh", "zg", "zf", "ze", "zd", "zc", "zb", "za", "yz", "yy", "yx", "yw", "yv", "yu", "yt", "ys", "yr", "yq", "yp", "yo", "yn", "ym", "yl", "yk", "yj", "yi", "yh", "yg", "yf", "ye", "yd", "yc", "yb", "ya", "xz", "xy", "xx", "xw", "xv", "xu", "xt", "xs", "xr", "xq", "xp", "xo", "xn", "xm", "xl", "xk", "xj", "xi", "xh", "xg", "xf", "xe", "xd", "xc", "xb", "xa", "wz", "wy", "wx", "ww", "wv", "wu", "wt", "ws", "wr", "wq", "wp", "wo", "wn", "wm", "wl", "wk", "wj", "wi", "wh", "wg", "wf", "we", "wd", "wc", "wb", "wa", "vz", "vy", "vx", "vw", "vv", "vu", "vt", "vs", "vr", "vq", "vp", "vo", "vn", "vm", "vl", "vk", "vj", "vi", "vh", "vg", "vf", "ve", "vd", "vc", "vb", "va", "uz", "uy", "ux", "uw", "uv", "uu", "ut", "us", "ur", "uq", "up", "uo", "un", "um", "ul", "uk", "uj", "ui", "uh", "ug", "uf", "ue", "ud", "uc", "ub", "ua", "tz", "ty", "tx", "tw", "tv", "tu", "tt", "ts", "tr", "tq", "tp", "to", "tn", "tm", "tl", "tk", "tj", "ti", "th", "tg", "tf", "te", "td", "tc", "tb", "ta", "sz", "sy", "sx", "sw", "sv", "su", "st", "ss", "sr", "sq", "sp", "so", "sn", "sm", "sl", "sk", "sj", "si", "sh", "sg", "sf", "se", "sd", "sc", "sb", "sa", "rz", "ry", "rx", "rw", "rv", "ru", "rt", "rs", "rr", "rq", "rp", "ro", "rn", "rm", "rl", "rk", "rj", "ri", "rh", "rg", "rf", "re", "rd", "rc", "rb", "ra", "qz", "qy", "qx", "qw", "qv", "qu", "qt", "qs", "qr", "qq", "qp", "qo", "qn", "qm", "ql", "qk", "qj", "qi", "qh", "qg", "qf", "qe", "qd", "qc", "qb", "qa", "pz", "py", "px", "pw", "pv", "pu", "pt", "ps", "pr", "pq", "pp", "po", "pn", "pm", "pl", "pk", "pj", "pi", "ph", "pg", "pf", "pe", "pd", "pc", "pb", "pa", "oz", "oy", "ox", "ow", "ov", "ou", "ot", "os", "or", "oq", "op", "oo", "on", "om", "ol", "ok", "oj", "oi", "oh", "og", "of", "oe", "od", "oc", "ob", "oa", "nz", "ny", "nx", "nw", "nv", "nu", "nt", "ns", "nr", "nq", "np", "no", "nn", "nm", "nl", "nk", "nj", "ni", "nh", "ng", "nf", "ne", "nd", "nc", "nb", "na", "mz", "my", "mx", "mw", "mv", "mu", "mt", "ms", "mr", "mq", "mp", "mo", "mn", "mm", "ml", "mk", "mj", "mi", "mh", "mg", "mf", "me", "md", "mc", "mb", "ma", "lz", "ly", "lx", "lw", "lv", "lu", "lt", "ls", "lr", "lq", "lp", "lo", "ln", "lm", "ll", "lk", "lj", "li", "lh", "lg", "lf", "le", "ld", "lc", "lb", "la", "kz", "ky", "kx", "kw", "kv", "ku", "kt", "ks", "kr", "kq", "kp", "ko", "kn", "km", "kl", "kk", "kj", "ki", "kh", "kg", "kf", "ke", "kd", "kc", "kb", "ka", "jz", "jy", "jx", "jw", "jv", "ju", "jt", "js", "jr", "jq", "jp", "jo", "jn", "jm", "jl", "jk", "jj", "ji", "jh", "jg", "jf", "je", "jd", "jc", "jb", "ja", "iz", "iy", "ix", "iw", "iv", "iu", "it", "is", "ir", "iq", "ip", "io", "in", "im", "il", "ik", "ij", "ii", "ih", "ig", "if", "ie", "id", "ic", "ib", "ia", "hz", "hy", "hx", "hw", "hv", "hu", "ht", "hs", "hr", "hq", "hp", "ho", "hn", "hm", "hl", "hk", "hj", "hi", "hh", "hg", "hf", "he", "hd", "hc", "hb", "ha", "gz", "gy", "gx", "gw", "gv", "gu", "gt", "gs", "gr", "gq", "gp", "go", "gn", "gm", "gl", "gk", "gj", "gi", "gh", "gg", "gf", "ge", "gd", "gc", "gb", "ga", "fz", "fy", "fx", "fw", "fv", "fu", "ft", "fs", "fr", "fq", "fp", "fo", "fn", "fm", "fl", "fk", "fj", "fi", "fh", "fg", "ff", "fe", "fd", "fc", "fb", "fa", "ez", "ey", "ex", "ew", "ev", "eu", "et", "es", "er", "eq", "ep", "eo", "en", "em", "el", "ek", "ej", "ei", "eh", "eg", "ef", "ee", "ed", "ec", "eb", "ea", "dz", "dy", "dx", "dw", "dv", "du", "dt", "ds", "dr", "dq", "dp", "do", "dn", "dm", "dl", "dk", "dj", "di", "dh", "dg", "df", "de", "dd", "dc", "db", "da", "cz", "cy", "cx", "cw", "cv", "cu", "ct", "cs", "cr", "cq", "cp", "co", "cn", "cm", "cl", "ck", "cj", "ci", "ch", "cg", "cf", "ce", "cd", "cc", "cb", "ca", "bz", "by", "bx", "bw", "bv", "bu", "bt", "bs", "br", "bq", "bp", "bo", "bn", "bm", "bl", "bk", "bj", "bi", "bh", "bg", "bf", "be", "bd", "bc", "bb", "ba", "az", "ay", "ax", "aw", "av", "au", "at", "as", "ar", "aq", "ap", "ao", "an", "am", "al", "ak", "aj", "ai", "ah", "ag", "af", "ae", "ad", "ac", "ab", "aa", "z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a" ],
    tabIdsToMarkers: new Map,
    markersToTabIds: new Map
  }
};

function hn(e) {
  try {
    document.querySelector(e);
  } catch (e) {
    if (e instanceof DOMException) return !1;
  }
  return !0;
}

function gn(e) {
  try {
    return new RegExp(e), !0;
  } catch {
    return !1;
  }
}

function vn(e) {
  let t;
  const n = _t.record(_t.string(), _t.object({
    include: _t.array(_t.string()),
    exclude: _t.array(_t.string())
  })).safeParse(e), r = _t.map(_t.string(), _t.object({
    include: _t.array(_t.string()),
    exclude: _t.array(_t.string())
  })).safeParse(e);
  if (r.success && (t = r.data.entries()), n.success && (t = Object.entries(n.data)), 
  !t) return e;
  const a = new Array;
  for (const [e, {include: n, exclude: r}] of t) {
    for (const t of n) a.push({
      pattern: e,
      type: "include",
      selector: t
    });
    for (const t of r) a.push({
      pattern: e,
      type: "exclude",
      selector: t
    });
  }
  return a;
}

function bn(e, t) {
  switch (e) {
   case "customSelectors":
    return t.filter((({pattern: e, selector: t}) => gn(e) && hn(t))).sort(((e, t) => e.pattern.localeCompare(t.pattern) || ("include" === e.type ? -1 : 1)));

   case "keysToExclude":
    return t.filter((([e]) => e));

   default:
    return t;
  }
}

const yn = new Set([ "hintsToggleTabs", "tabsByRecency", "hintsStacks", "tabMarkers" ]);

function xn(e, t) {
  return t instanceof Map ? {
    dataType: "Map",
    value: Array.from(t.entries())
  } : t;
}

function kn(e, t) {
  return "object" == typeof t && null !== t && "Map" === t.dataType && t.value ? new Map(t.value) : t;
}

async function wn(e, n) {
  if (fn(e) && !pn(e, n)) return An(e);
  const r = bn(e, n), a = JSON.stringify(Et.shape[e].parse(r), xn);
  return await (yn.has(e) ? t(v).storage.local.set({
    [e]: a
  }) : t(v).storage.sync.set({
    [e]: a
  })), r;
}

async function _n(e) {
  const n = yn.has(e) ? await t(v).storage.local.get(e) : await t(v).storage.sync.get(e);
  try {
    const [e] = Object.values(n);
    if (void 0 === e) return;
    return JSON.parse(e, kn);
  } catch {
    return console.warn(`Invalid JSON in storage item "${e}". Resetting to default.`), 
    wn(e, mn[e]);
  }
}

async function Sn(e) {
  const t = await _n(e);
  if ("customSelectors" === e) try {
    const n = vn(t), r = Et.shape[e].parse(n);
    return await wn(e, r);
  } catch {
    return wn(e, mn[e]);
  }
  return wn(e, mn[e]);
}

const Cn = new p;

async function An(e) {
  const t = await _n(e), n = Et.shape[e].safeParse(t);
  return n.success ? n.data : Cn.runExclusive((async () => {
    const t = await _n(e);
    try {
      return Et.shape[e].parse(t);
    } catch {
      return Sn(e);
    }
  }));
}

async function En() {
  const e = {};
  let t;
  for (t in sn) Object.prototype.hasOwnProperty.call(sn, t) && (e[t] = await An(t));
  return e;
}

v = i("38yC4");

var jn = i("djNrI");

function Nn(e, t) {
  const n = Array.isArray(e) ? Object.values(e) : Object.keys(e), r = Object.keys(t);
  return n.some((e => r.includes(e)));
}

function Pn({label: e, children: t}) {
  return (0, o.jsxs)("div", {
    className: "SettingsGroup",
    children: [ (0, o.jsx)("h2", {
      children: e
    }), t ]
  });
}

function Tn({label: e, isPressed: t, isDisabled: n, children: r, onClick: a}) {
  return (0, o.jsxs)("div", {
    className: "Toggle " + (n ? "disabled" : ""),
    children: [ (0, o.jsxs)("label", {
      children: [ e, (0, o.jsx)("button", {
        type: "button",
        disabled: n,
        "aria-pressed": t,
        onClick: a
      }) ]
    }), r ]
  });
}

jn = i("djNrI");

var On = {
  prefix: "fas",
  iconName: "toggle-off",
  icon: [ 576, 512, [], "f204", "M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128H192c-70.7 0-128-57.3-128-128s57.3-128 128-128H384zM576 256c0-106-86-192-192-192H192C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" ]
}, zn = {
  prefix: "fas",
  iconName: "circle-exclamation",
  icon: [ 512, 512, [ "exclamation-circle" ], "f06a", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" ]
}, Mn = {
  prefix: "fas",
  iconName: "ban",
  icon: [ 512, 512, [ 128683, "cancel" ], "f05e", "M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" ]
}, Ln = {
  prefix: "fas",
  iconName: "toggle-on",
  icon: [ 576, 512, [], "f205", "M192 64C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192s-86-192-192-192H192zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" ]
}, Rn = {
  prefix: "fas",
  iconName: "circle-check",
  icon: [ 512, 512, [ 61533, "check-circle" ], "f058", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" ]
}, In = {
  prefix: "fas",
  iconName: "trash",
  icon: [ 448, 512, [], "f1f8", "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" ]
}, Fn = {
  prefix: "fas",
  iconName: "circle-info",
  icon: [ 512, 512, [ "info-circle" ], "f05a", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" ]
}, Dn = {
  prefix: "fas",
  iconName: "minus",
  icon: [ 448, 512, [ 8211, 8722, 10134, "subtract" ], "f068", "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" ]
}, Un = {
  prefix: "fas",
  iconName: "plus",
  icon: [ 448, 512, [ 10133, 61543, "add" ], "2b", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" ]
}, Zn = {
  prefix: "fas",
  iconName: "triangle-exclamation",
  icon: [ 512, 512, [ 9888, "exclamation-triangle", "warning" ], "f071", "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" ]
};

function Bn(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter((function(t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    }))), n.push.apply(n, r);
  }
  return n;
}

function Vn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? Bn(Object(n), !0).forEach((function(t) {
      Hn(e, t, n[t]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Bn(Object(n)).forEach((function(t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    }));
  }
  return e;
}

function $n(e) {
  return $n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
  } : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, $n(e);
}

function Wn(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
    Object.defineProperty(e, r.key, r);
  }
}

function Hn(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}

function qn(e, t) {
  return function(e) {
    if (Array.isArray(e)) return e;
  }(e) || function(e, t) {
    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (null == n) return;
    var r, a, i = [], o = !0, s = !1;
    try {
      for (n = n.call(e); !(o = (r = n.next()).done) && (i.push(r.value), !t || i.length !== t); o = !0) ;
    } catch (e) {
      s = !0, a = e;
    } finally {
      try {
        o || null == n.return || n.return();
      } finally {
        if (s) throw a;
      }
    }
    return i;
  }(e, t) || Yn(e, t) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}

function Kn(e) {
  return function(e) {
    if (Array.isArray(e)) return Qn(e);
  }(e) || function(e) {
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
  }(e) || Yn(e) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}

function Yn(e, t) {
  if (e) {
    if ("string" == typeof e) return Qn(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Qn(e, t) : void 0;
  }
}

function Qn(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}

var Gn = function() {}, Xn = {}, Jn = {}, er = null, tr = {
  mark: Gn,
  measure: Gn
};

try {
  "undefined" != typeof window && (Xn = window), "undefined" != typeof document && (Jn = document), 
  "undefined" != typeof MutationObserver && (er = MutationObserver), "undefined" != typeof performance && (tr = performance);
} catch (e) {}

var nr, rr, ar, ir, or, sr = (Xn.navigator || {}).userAgent, lr = void 0 === sr ? "" : sr, ur = Xn, cr = Jn, dr = er, fr = tr, pr = (ur.document, 
!!cr.documentElement && !!cr.head && "function" == typeof cr.addEventListener && "function" == typeof cr.createElement), mr = ~lr.indexOf("MSIE") || ~lr.indexOf("Trident/"), hr = "___FONT_AWESOME___", gr = "svg-inline--fa", vr = "data-fa-i2svg", br = "data-fa-pseudo-element", yr = "data-prefix", xr = "data-icon", kr = "fontawesome-i2svg", wr = [ "HTML", "HEAD", "STYLE", "SCRIPT" ], _r = function() {
  try {
    return !0;
  } catch (e) {
    return !1;
  }
}(), Sr = "classic", Cr = "sharp", Ar = [ Sr, Cr ];

function Er(e) {
  return new Proxy(e, {
    get: function(e, t) {
      return t in e ? e[t] : e[Sr];
    }
  });
}

var jr = Er((Hn(nr = {}, Sr, {
  fa: "solid",
  fas: "solid",
  "fa-solid": "solid",
  far: "regular",
  "fa-regular": "regular",
  fal: "light",
  "fa-light": "light",
  fat: "thin",
  "fa-thin": "thin",
  fad: "duotone",
  "fa-duotone": "duotone",
  fab: "brands",
  "fa-brands": "brands",
  fak: "kit",
  "fa-kit": "kit"
}), Hn(nr, Cr, {
  fa: "solid",
  fass: "solid",
  "fa-solid": "solid",
  fasr: "regular",
  "fa-regular": "regular",
  fasl: "light",
  "fa-light": "light"
}), nr)), Nr = Er((Hn(rr = {}, Sr, {
  solid: "fas",
  regular: "far",
  light: "fal",
  thin: "fat",
  duotone: "fad",
  brands: "fab",
  kit: "fak"
}), Hn(rr, Cr, {
  solid: "fass",
  regular: "fasr",
  light: "fasl"
}), rr)), Pr = Er((Hn(ar = {}, Sr, {
  fab: "fa-brands",
  fad: "fa-duotone",
  fak: "fa-kit",
  fal: "fa-light",
  far: "fa-regular",
  fas: "fa-solid",
  fat: "fa-thin"
}), Hn(ar, Cr, {
  fass: "fa-solid",
  fasr: "fa-regular",
  fasl: "fa-light"
}), ar)), Tr = Er((Hn(ir = {}, Sr, {
  "fa-brands": "fab",
  "fa-duotone": "fad",
  "fa-kit": "fak",
  "fa-light": "fal",
  "fa-regular": "far",
  "fa-solid": "fas",
  "fa-thin": "fat"
}), Hn(ir, Cr, {
  "fa-solid": "fass",
  "fa-regular": "fasr",
  "fa-light": "fasl"
}), ir)), Or = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/, zr = "fa-layers-text", Mr = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, Lr = Er((Hn(or = {}, Sr, {
  900: "fas",
  400: "far",
  normal: "far",
  300: "fal",
  100: "fat"
}), Hn(or, Cr, {
  900: "fass",
  400: "fasr",
  300: "fasl"
}), or)), Rr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], Ir = Rr.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), Fr = [ "class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask" ], Dr = "duotone-group", Ur = "swap-opacity", Zr = "primary", Br = "secondary", Vr = new Set;

Object.keys(Nr[Sr]).map(Vr.add.bind(Vr)), Object.keys(Nr[Cr]).map(Vr.add.bind(Vr));

var $r = [].concat(Ar, Kn(Vr), [ "2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Dr, Ur, Zr, Br ]).concat(Rr.map((function(e) {
  return "".concat(e, "x");
}))).concat(Ir.map((function(e) {
  return "w-".concat(e);
}))), Wr = ur.FontAwesomeConfig || {};

if (cr && "function" == typeof cr.querySelector) {
  [ [ "data-family-prefix", "familyPrefix" ], [ "data-css-prefix", "cssPrefix" ], [ "data-family-default", "familyDefault" ], [ "data-style-default", "styleDefault" ], [ "data-replacement-class", "replacementClass" ], [ "data-auto-replace-svg", "autoReplaceSvg" ], [ "data-auto-add-css", "autoAddCss" ], [ "data-auto-a11y", "autoA11y" ], [ "data-search-pseudo-elements", "searchPseudoElements" ], [ "data-observe-mutations", "observeMutations" ], [ "data-mutate-approach", "mutateApproach" ], [ "data-keep-original-source", "keepOriginalSource" ], [ "data-measure-performance", "measurePerformance" ], [ "data-show-missing-icons", "showMissingIcons" ] ].forEach((function(e) {
    var t = qn(e, 2), n = t[0], r = t[1], a = function(e) {
      return "" === e || "false" !== e && ("true" === e || e);
    }(function(e) {
      var t = cr.querySelector("script[" + e + "]");
      if (t) return t.getAttribute(e);
    }(n));
    null != a && (Wr[r] = a);
  }));
}

var Hr = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: "fa",
  replacementClass: gr,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
};

Wr.familyPrefix && (Wr.cssPrefix = Wr.familyPrefix);

var qr = Vn(Vn({}, Hr), Wr);

qr.autoReplaceSvg || (qr.observeMutations = !1);

var Kr = {};

Object.keys(Hr).forEach((function(e) {
  Object.defineProperty(Kr, e, {
    enumerable: !0,
    set: function(t) {
      qr[e] = t, Yr.forEach((function(e) {
        return e(Kr);
      }));
    },
    get: function() {
      return qr[e];
    }
  });
})), Object.defineProperty(Kr, "familyPrefix", {
  enumerable: !0,
  set: function(e) {
    qr.cssPrefix = e, Yr.forEach((function(e) {
      return e(Kr);
    }));
  },
  get: function() {
    return qr.cssPrefix;
  }
}), ur.FontAwesomeConfig = Kr;

var Yr = [];

var Qr = 16, Gr = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};

function Xr() {
  for (var e = 12, t = ""; e-- > 0; ) t += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[62 * Math.random() | 0];
  return t;
}

function Jr(e) {
  for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
  return t;
}

function ea(e) {
  return e.classList ? Jr(e.classList) : (e.getAttribute("class") || "").split(" ").filter((function(e) {
    return e;
  }));
}

function ta(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function na(e) {
  return Object.keys(e || {}).reduce((function(t, n) {
    return t + "".concat(n, ": ").concat(e[n].trim(), ";");
  }), "");
}

function ra(e) {
  return e.size !== Gr.size || e.x !== Gr.x || e.y !== Gr.y || e.rotate !== Gr.rotate || e.flipX || e.flipY;
}

function aa() {
  var e = "fa", t = gr, n = Kr.cssPrefix, r = Kr.replacementClass, a = ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    -webkit-transition-delay: 0s;\n            transition-delay: 0s;\n    -webkit-transition-duration: 0s;\n            transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
  if (n !== e || r !== t) {
    var i = new RegExp("\\.".concat(e, "\\-"), "g"), o = new RegExp("\\--".concat(e, "\\-"), "g"), s = new RegExp("\\.".concat(t), "g");
    a = a.replace(i, ".".concat(n, "-")).replace(o, "--".concat(n, "-")).replace(s, ".".concat(r));
  }
  return a;
}

var ia = !1;

function oa() {
  Kr.autoAddCss && !ia && (!function(e) {
    if (e && pr) {
      var t = cr.createElement("style");
      t.setAttribute("type", "text/css"), t.innerHTML = e;
      for (var n = cr.head.childNodes, r = null, a = n.length - 1; a > -1; a--) {
        var i = n[a], o = (i.tagName || "").toUpperCase();
        [ "STYLE", "LINK" ].indexOf(o) > -1 && (r = i);
      }
      cr.head.insertBefore(t, r);
    }
  }(aa()), ia = !0);
}

var sa = {
  mixout: function() {
    return {
      dom: {
        css: aa,
        insertCss: oa
      }
    };
  },
  hooks: function() {
    return {
      beforeDOMElementCreation: function() {
        oa();
      },
      beforeI2svg: function() {
        oa();
      }
    };
  }
}, la = ur || {};

la[hr] || (la[hr] = {}), la[hr].styles || (la[hr].styles = {}), la[hr].hooks || (la[hr].hooks = {}), 
la[hr].shims || (la[hr].shims = []);

var ua = la[hr], ca = [], da = !1;

function fa(e) {
  pr && (da ? setTimeout(e, 0) : ca.push(e));
}

function pa(e) {
  var t = e.tag, n = e.attributes, r = void 0 === n ? {} : n, a = e.children, i = void 0 === a ? [] : a;
  return "string" == typeof e ? ta(e) : "<".concat(t, " ").concat(function(e) {
    return Object.keys(e || {}).reduce((function(t, n) {
      return t + "".concat(n, '="').concat(ta(e[n]), '" ');
    }), "").trim();
  }(r), ">").concat(i.map(pa).join(""), "</").concat(t, ">");
}

function ma(e, t, n) {
  if (e && e[t] && e[t][n]) return {
    prefix: t,
    iconName: n,
    icon: e[t][n]
  };
}

pr && ((da = (cr.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(cr.readyState)) || cr.addEventListener("DOMContentLoaded", (function e() {
  cr.removeEventListener("DOMContentLoaded", e), da = 1, ca.map((function(e) {
    return e();
  }));
})));

var ha = function(e, t, n, r) {
  var a, i, o, s = Object.keys(e), l = s.length, u = void 0 !== r ? function(e, t) {
    return function(n, r, a, i) {
      return e.call(t, n, r, a, i);
    };
  }(t, r) : t;
  for (void 0 === n ? (a = 1, o = e[s[0]]) : (a = 0, o = n); a < l; a++) o = u(o, e[i = s[a]], i, e);
  return o;
};

function ga(e) {
  var t = function(e) {
    for (var t = [], n = 0, r = e.length; n < r; ) {
      var a = e.charCodeAt(n++);
      if (a >= 55296 && a <= 56319 && n < r) {
        var i = e.charCodeAt(n++);
        56320 == (64512 & i) ? t.push(((1023 & a) << 10) + (1023 & i) + 65536) : (t.push(a), 
        n--);
      } else t.push(a);
    }
    return t;
  }(e);
  return 1 === t.length ? t[0].toString(16) : null;
}

function va(e) {
  return Object.keys(e).reduce((function(t, n) {
    var r = e[n];
    return !!r.icon ? t[r.iconName] = r.icon : t[n] = r, t;
  }), {});
}

function ba(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = n.skipHooks, a = void 0 !== r && r, i = va(t);
  "function" != typeof ua.hooks.addPack || a ? ua.styles[e] = Vn(Vn({}, ua.styles[e] || {}), i) : ua.hooks.addPack(e, va(t)), 
  "fas" === e && ba("fa", t);
}

var ya, xa, ka, wa = ua.styles, _a = ua.shims, Sa = (Hn(ya = {}, Sr, Object.values(Pr[Sr])), 
Hn(ya, Cr, Object.values(Pr[Cr])), ya), Ca = null, Aa = {}, Ea = {}, ja = {}, Na = {}, Pa = {}, Ta = (Hn(xa = {}, Sr, Object.keys(jr[Sr])), 
Hn(xa, Cr, Object.keys(jr[Cr])), xa);

function Oa(e, t) {
  var n, r = t.split("-"), a = r[0], i = r.slice(1).join("-");
  return a !== e || "" === i || (n = i, ~$r.indexOf(n)) ? null : i;
}

var za, Ma = function() {
  var e = function(e) {
    return ha(wa, (function(t, n, r) {
      return t[r] = ha(n, e, {}), t;
    }), {});
  };
  Aa = e((function(e, t, n) {
    (t[3] && (e[t[3]] = n), t[2]) && t[2].filter((function(e) {
      return "number" == typeof e;
    })).forEach((function(t) {
      e[t.toString(16)] = n;
    }));
    return e;
  })), Ea = e((function(e, t, n) {
    (e[n] = n, t[2]) && t[2].filter((function(e) {
      return "string" == typeof e;
    })).forEach((function(t) {
      e[t] = n;
    }));
    return e;
  })), Pa = e((function(e, t, n) {
    var r = t[2];
    return e[n] = n, r.forEach((function(t) {
      e[t] = n;
    })), e;
  }));
  var t = "far" in wa || Kr.autoFetchSvg, n = ha(_a, (function(e, n) {
    var r = n[0], a = n[1], i = n[2];
    return "far" !== a || t || (a = "fas"), "string" == typeof r && (e.names[r] = {
      prefix: a,
      iconName: i
    }), "number" == typeof r && (e.unicodes[r.toString(16)] = {
      prefix: a,
      iconName: i
    }), e;
  }), {
    names: {},
    unicodes: {}
  });
  ja = n.names, Na = n.unicodes, Ca = Da(Kr.styleDefault, {
    family: Kr.familyDefault
  });
};

function La(e, t) {
  return (Aa[e] || {})[t];
}

function Ra(e, t) {
  return (Pa[e] || {})[t];
}

function Ia(e) {
  return ja[e] || {
    prefix: null,
    iconName: null
  };
}

function Fa() {
  return Ca;
}

za = function(e) {
  Ca = Da(e.styleDefault, {
    family: Kr.familyDefault
  });
}, Yr.push(za), Ma();

function Da(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.family, r = void 0 === n ? Sr : n, a = jr[r][e], i = Nr[r][e] || Nr[r][a], o = e in ua.styles ? e : null;
  return i || o || null;
}

var Ua = (Hn(ka = {}, Sr, Object.keys(Pr[Sr])), Hn(ka, Cr, Object.keys(Pr[Cr])), 
ka);

function Za(e) {
  var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = n.skipLookups, a = void 0 !== r && r, i = (Hn(t = {}, Sr, "".concat(Kr.cssPrefix, "-").concat(Sr)), 
  Hn(t, Cr, "".concat(Kr.cssPrefix, "-").concat(Cr)), t), o = null, s = Sr;
  (e.includes(i[Sr]) || e.some((function(e) {
    return Ua[Sr].includes(e);
  }))) && (s = Sr), (e.includes(i[Cr]) || e.some((function(e) {
    return Ua[Cr].includes(e);
  }))) && (s = Cr);
  var l = e.reduce((function(e, t) {
    var n = Oa(Kr.cssPrefix, t);
    if (wa[t] ? (t = Sa[s].includes(t) ? Tr[s][t] : t, o = t, e.prefix = t) : Ta[s].indexOf(t) > -1 ? (o = t, 
    e.prefix = Da(t, {
      family: s
    })) : n ? e.iconName = n : t !== Kr.replacementClass && t !== i[Sr] && t !== i[Cr] && e.rest.push(t), 
    !a && e.prefix && e.iconName) {
      var r = "fa" === o ? Ia(e.iconName) : {}, l = Ra(e.prefix, e.iconName);
      r.prefix && (o = null), e.iconName = r.iconName || l || e.iconName, e.prefix = r.prefix || e.prefix, 
      "far" !== e.prefix || wa.far || !wa.fas || Kr.autoFetchSvg || (e.prefix = "fas");
    }
    return e;
  }), {
    prefix: null,
    iconName: null,
    rest: []
  });
  return (e.includes("fa-brands") || e.includes("fab")) && (l.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (l.prefix = "fad"), 
  l.prefix || s !== Cr || !wa.fass && !Kr.autoFetchSvg || (l.prefix = "fass", l.iconName = Ra(l.prefix, l.iconName) || l.iconName), 
  "fa" !== l.prefix && "fa" !== o || (l.prefix = Fa() || "fas"), l;
}

var Ba = function() {
  function e() {
    !function(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }(this, e), this.definitions = {};
  }
  var t, n, r;
  return t = e, n = [ {
    key: "add",
    value: function() {
      for (var e = this, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
      var a = n.reduce(this._pullDefinitions, {});
      Object.keys(a).forEach((function(t) {
        e.definitions[t] = Vn(Vn({}, e.definitions[t] || {}), a[t]), ba(t, a[t]);
        var n = Pr[Sr][t];
        n && ba(n, a[t]), Ma();
      }));
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(e, t) {
      var n = t.prefix && t.iconName && t.icon ? {
        0: t
      } : t;
      return Object.keys(n).map((function(t) {
        var r = n[t], a = r.prefix, i = r.iconName, o = r.icon, s = o[2];
        e[a] || (e[a] = {}), s.length > 0 && s.forEach((function(t) {
          "string" == typeof t && (e[a][t] = o);
        })), e[a][i] = o;
      })), e;
    }
  } ], n && Wn(t.prototype, n), r && Wn(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e;
}(), Va = [], $a = {}, Wa = {}, Ha = Object.keys(Wa);

function qa(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) r[a - 2] = arguments[a];
  var i = $a[e] || [];
  return i.forEach((function(e) {
    t = e.apply(null, [ t ].concat(r));
  })), t;
}

function Ka(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  var a = $a[e] || [];
  a.forEach((function(e) {
    e.apply(null, n);
  }));
}

function Ya() {
  var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return Wa[e] ? Wa[e].apply(null, t) : void 0;
}

function Qa(e) {
  "fa" === e.prefix && (e.prefix = "fas");
  var t = e.iconName, n = e.prefix || Fa();
  if (t) return t = Ra(n, t) || t, ma(Ga.definitions, n, t) || ma(ua.styles, n, t);
}

var Ga = new Ba, Xa = {
  i2svg: function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return pr ? (Ka("beforeI2svg", e), Ya("pseudoElements2svg", e), Ya("i2svg", e)) : Promise.reject("Operation requires a DOM of some kind.");
  },
  watch: function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.autoReplaceSvgRoot;
    !1 === Kr.autoReplaceSvg && (Kr.autoReplaceSvg = !0), Kr.observeMutations = !0, 
    fa((function() {
      ei({
        autoReplaceSvgRoot: t
      }), Ka("watch", e);
    }));
  }
}, Ja = {
  noAuto: function() {
    Kr.autoReplaceSvg = !1, Kr.observeMutations = !1, Ka("noAuto");
  },
  config: Kr,
  dom: Xa,
  parse: {
    icon: function(e) {
      if (null === e) return null;
      if ("object" === $n(e) && e.prefix && e.iconName) return {
        prefix: e.prefix,
        iconName: Ra(e.prefix, e.iconName) || e.iconName
      };
      if (Array.isArray(e) && 2 === e.length) {
        var t = 0 === e[1].indexOf("fa-") ? e[1].slice(3) : e[1], n = Da(e[0]);
        return {
          prefix: n,
          iconName: Ra(n, t) || t
        };
      }
      if ("string" == typeof e && (e.indexOf("".concat(Kr.cssPrefix, "-")) > -1 || e.match(Or))) {
        var r = Za(e.split(" "), {
          skipLookups: !0
        });
        return {
          prefix: r.prefix || Fa(),
          iconName: Ra(r.prefix, r.iconName) || r.iconName
        };
      }
      if ("string" == typeof e) {
        var a = Fa();
        return {
          prefix: a,
          iconName: Ra(a, e) || e
        };
      }
    }
  },
  library: Ga,
  findIconDefinition: Qa,
  toHtml: pa
}, ei = function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.autoReplaceSvgRoot, n = void 0 === t ? cr : t;
  (Object.keys(ua.styles).length > 0 || Kr.autoFetchSvg) && pr && Kr.autoReplaceSvg && Ja.dom.i2svg({
    node: n
  });
};

function ti(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map((function(e) {
        return pa(e);
      }));
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (pr) {
        var t = cr.createElement("div");
        return t.innerHTML = e.html, t.children;
      }
    }
  }), e;
}

function ni(e) {
  var t = e.icons, n = t.main, r = t.mask, a = e.prefix, i = e.iconName, o = e.transform, s = e.symbol, l = e.title, u = e.maskId, c = e.titleId, d = e.extra, f = e.watchable, p = void 0 !== f && f, m = r.found ? r : n, h = m.width, g = m.height, v = "fak" === a, b = [ Kr.replacementClass, i ? "".concat(Kr.cssPrefix, "-").concat(i) : "" ].filter((function(e) {
    return -1 === d.classes.indexOf(e);
  })).filter((function(e) {
    return "" !== e || !!e;
  })).concat(d.classes).join(" "), y = {
    children: [],
    attributes: Vn(Vn({}, d.attributes), {}, {
      "data-prefix": a,
      "data-icon": i,
      class: b,
      role: d.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(h, " ").concat(g)
    })
  }, x = v && !~d.classes.indexOf("fa-fw") ? {
    width: "".concat(h / g * 1, "em")
  } : {};
  p && (y.attributes[vr] = ""), l && (y.children.push({
    tag: "title",
    attributes: {
      id: y.attributes["aria-labelledby"] || "title-".concat(c || Xr())
    },
    children: [ l ]
  }), delete y.attributes.title);
  var k = Vn(Vn({}, y), {}, {
    prefix: a,
    iconName: i,
    main: n,
    mask: r,
    maskId: u,
    transform: o,
    symbol: s,
    styles: Vn(Vn({}, x), d.styles)
  }), w = r.found && n.found ? Ya("generateAbstractMask", k) || {
    children: [],
    attributes: {}
  } : Ya("generateAbstractIcon", k) || {
    children: [],
    attributes: {}
  }, _ = w.children, S = w.attributes;
  return k.children = _, k.attributes = S, s ? function(e) {
    var t = e.prefix, n = e.iconName, r = e.children, a = e.attributes, i = e.symbol, o = !0 === i ? "".concat(t, "-").concat(Kr.cssPrefix, "-").concat(n) : i;
    return [ {
      tag: "svg",
      attributes: {
        style: "display: none;"
      },
      children: [ {
        tag: "symbol",
        attributes: Vn(Vn({}, a), {}, {
          id: o
        }),
        children: r
      } ]
    } ];
  }(k) : function(e) {
    var t = e.children, n = e.main, r = e.mask, a = e.attributes, i = e.styles, o = e.transform;
    if (ra(o) && n.found && !r.found) {
      var s = {
        x: n.width / n.height / 2,
        y: .5
      };
      a.style = na(Vn(Vn({}, i), {}, {
        "transform-origin": "".concat(s.x + o.x / 16, "em ").concat(s.y + o.y / 16, "em")
      }));
    }
    return [ {
      tag: "svg",
      attributes: a,
      children: t
    } ];
  }(k);
}

function ri(e) {
  var t = e.content, n = e.width, r = e.height, a = e.transform, i = e.title, o = e.extra, s = e.watchable, l = void 0 !== s && s, u = Vn(Vn(Vn({}, o.attributes), i ? {
    title: i
  } : {}), {}, {
    class: o.classes.join(" ")
  });
  l && (u[vr] = "");
  var c = Vn({}, o.styles);
  ra(a) && (c.transform = function(e) {
    var t = e.transform, n = e.width, r = void 0 === n ? 16 : n, a = e.height, i = void 0 === a ? 16 : a, o = e.startCentered, s = void 0 !== o && o, l = "";
    return l += s && mr ? "translate(".concat(t.x / Qr - r / 2, "em, ").concat(t.y / Qr - i / 2, "em) ") : s ? "translate(calc(-50% + ".concat(t.x / Qr, "em), calc(-50% + ").concat(t.y / Qr, "em)) ") : "translate(".concat(t.x / Qr, "em, ").concat(t.y / Qr, "em) "), 
    l += "scale(".concat(t.size / Qr * (t.flipX ? -1 : 1), ", ").concat(t.size / Qr * (t.flipY ? -1 : 1), ") "), 
    l + "rotate(".concat(t.rotate, "deg) ");
  }({
    transform: a,
    startCentered: !0,
    width: n,
    height: r
  }), c["-webkit-transform"] = c.transform);
  var d = na(c);
  d.length > 0 && (u.style = d);
  var f = [];
  return f.push({
    tag: "span",
    attributes: u,
    children: [ t ]
  }), i && f.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [ i ]
  }), f;
}

function ai(e) {
  var t = e.content, n = e.title, r = e.extra, a = Vn(Vn(Vn({}, r.attributes), n ? {
    title: n
  } : {}), {}, {
    class: r.classes.join(" ")
  }), i = na(r.styles);
  i.length > 0 && (a.style = i);
  var o = [];
  return o.push({
    tag: "span",
    attributes: a,
    children: [ t ]
  }), n && o.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [ n ]
  }), o;
}

var ii = ua.styles;

function oi(e) {
  var t = e[0], n = e[1], r = qn(e.slice(4), 1)[0];
  return {
    found: !0,
    width: t,
    height: n,
    icon: Array.isArray(r) ? {
      tag: "g",
      attributes: {
        class: "".concat(Kr.cssPrefix, "-").concat(Dr)
      },
      children: [ {
        tag: "path",
        attributes: {
          class: "".concat(Kr.cssPrefix, "-").concat(Br),
          fill: "currentColor",
          d: r[0]
        }
      }, {
        tag: "path",
        attributes: {
          class: "".concat(Kr.cssPrefix, "-").concat(Zr),
          fill: "currentColor",
          d: r[1]
        }
      } ]
    } : {
      tag: "path",
      attributes: {
        fill: "currentColor",
        d: r
      }
    }
  };
}

var si = {
  found: !1,
  width: 512,
  height: 512
};

function li(e, t) {
  var n = t;
  return "fa" === t && null !== Kr.styleDefault && (t = Fa()), new Promise((function(r, a) {
    Ya("missingIconAbstract");
    if ("fa" === n) {
      var i = Ia(e) || {};
      e = i.iconName || e, t = i.prefix || t;
    }
    if (e && t && ii[t] && ii[t][e]) return r(oi(ii[t][e]));
    !function(e, t) {
      _r || Kr.showMissingIcons || !e || console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
    }(e, t), r(Vn(Vn({}, si), {}, {
      icon: Kr.showMissingIcons && e && Ya("missingIconAbstract") || {}
    }));
  }));
}

var ui = function() {}, ci = Kr.measurePerformance && fr && fr.mark && fr.measure ? fr : {
  mark: ui,
  measure: ui
}, di = 'FA "6.4.0"', fi = function(e) {
  ci.mark("".concat(di, " ").concat(e, " ends")), ci.measure("".concat(di, " ").concat(e), "".concat(di, " ").concat(e, " begins"), "".concat(di, " ").concat(e, " ends"));
}, pi = function(e) {
  return ci.mark("".concat(di, " ").concat(e, " begins")), function() {
    return fi(e);
  };
}, mi = function() {};

function hi(e) {
  return "string" == typeof (e.getAttribute ? e.getAttribute(vr) : null);
}

function gi(e) {
  return cr.createElementNS("http://www.w3.org/2000/svg", e);
}

function vi(e) {
  return cr.createElement(e);
}

function bi(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.ceFn, r = void 0 === n ? "svg" === e.tag ? gi : vi : n;
  if ("string" == typeof e) return cr.createTextNode(e);
  var a = r(e.tag);
  Object.keys(e.attributes || []).forEach((function(t) {
    a.setAttribute(t, e.attributes[t]);
  }));
  var i = e.children || [];
  return i.forEach((function(e) {
    a.appendChild(bi(e, {
      ceFn: r
    }));
  })), a;
}

var yi = {
  replace: function(e) {
    var t = e[0];
    if (t.parentNode) if (e[1].forEach((function(e) {
      t.parentNode.insertBefore(bi(e), t);
    })), null === t.getAttribute(vr) && Kr.keepOriginalSource) {
      var n = cr.createComment(function(e) {
        var t = " ".concat(e.outerHTML, " ");
        return "".concat(t, "Font Awesome fontawesome.com ");
      }(t));
      t.parentNode.replaceChild(n, t);
    } else t.remove();
  },
  nest: function(e) {
    var t = e[0], n = e[1];
    if (~ea(t).indexOf(Kr.replacementClass)) return yi.replace(e);
    var r = new RegExp("".concat(Kr.cssPrefix, "-.*"));
    if (delete n[0].attributes.id, n[0].attributes.class) {
      var a = n[0].attributes.class.split(" ").reduce((function(e, t) {
        return t === Kr.replacementClass || t.match(r) ? e.toSvg.push(t) : e.toNode.push(t), 
        e;
      }), {
        toNode: [],
        toSvg: []
      });
      n[0].attributes.class = a.toSvg.join(" "), 0 === a.toNode.length ? t.removeAttribute("class") : t.setAttribute("class", a.toNode.join(" "));
    }
    var i = n.map((function(e) {
      return pa(e);
    })).join("\n");
    t.setAttribute(vr, ""), t.innerHTML = i;
  }
};

function xi(e) {
  e();
}

function ki(e, t) {
  var n = "function" == typeof t ? t : mi;
  if (0 === e.length) n(); else {
    var r = xi;
    "async" === Kr.mutateApproach && (r = ur.requestAnimationFrame || xi), r((function() {
      var t = !0 === Kr.autoReplaceSvg ? yi.replace : yi[Kr.autoReplaceSvg] || yi.replace, r = pi("mutate");
      e.map(t), r(), n();
    }));
  }
}

var wi = !1;

function _i() {
  wi = !0;
}

function Si() {
  wi = !1;
}

var Ci = null;

function Ai(e) {
  if (dr && Kr.observeMutations) {
    var t = e.treeCallback, n = void 0 === t ? mi : t, r = e.nodeCallback, a = void 0 === r ? mi : r, i = e.pseudoElementsCallback, o = void 0 === i ? mi : i, s = e.observeMutationsRoot, l = void 0 === s ? cr : s;
    Ci = new dr((function(e) {
      if (!wi) {
        var t = Fa();
        Jr(e).forEach((function(e) {
          if ("childList" === e.type && e.addedNodes.length > 0 && !hi(e.addedNodes[0]) && (Kr.searchPseudoElements && o(e.target), 
          n(e.target)), "attributes" === e.type && e.target.parentNode && Kr.searchPseudoElements && o(e.target.parentNode), 
          "attributes" === e.type && hi(e.target) && ~Fr.indexOf(e.attributeName)) if ("class" === e.attributeName && function(e) {
            var t = e.getAttribute ? e.getAttribute(yr) : null, n = e.getAttribute ? e.getAttribute(xr) : null;
            return t && n;
          }(e.target)) {
            var r = Za(ea(e.target)), i = r.prefix, s = r.iconName;
            e.target.setAttribute(yr, i || t), s && e.target.setAttribute(xr, s);
          } else (l = e.target) && l.classList && l.classList.contains && l.classList.contains(Kr.replacementClass) && a(e.target);
          var l;
        }));
      }
    })), pr && Ci.observe(l, {
      childList: !0,
      attributes: !0,
      characterData: !0,
      subtree: !0
    });
  }
}

function Ei(e) {
  var t = e.getAttribute("style"), n = [];
  return t && (n = t.split(";").reduce((function(e, t) {
    var n = t.split(":"), r = n[0], a = n.slice(1);
    return r && a.length > 0 && (e[r] = a.join(":").trim()), e;
  }), {})), n;
}

function ji(e) {
  var t, n, r = e.getAttribute("data-prefix"), a = e.getAttribute("data-icon"), i = void 0 !== e.innerText ? e.innerText.trim() : "", o = Za(ea(e));
  return o.prefix || (o.prefix = Fa()), r && a && (o.prefix = r, o.iconName = a), 
  o.iconName && o.prefix || (o.prefix && i.length > 0 && (o.iconName = (t = o.prefix, 
  n = e.innerText, (Ea[t] || {})[n] || La(o.prefix, ga(e.innerText)))), !o.iconName && Kr.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (o.iconName = e.firstChild.data)), 
  o;
}

function Ni(e) {
  var t = Jr(e.attributes).reduce((function(e, t) {
    return "class" !== e.name && "style" !== e.name && (e[t.name] = t.value), e;
  }), {}), n = e.getAttribute("title"), r = e.getAttribute("data-fa-title-id");
  return Kr.autoA11y && (n ? t["aria-labelledby"] = "".concat(Kr.replacementClass, "-title-").concat(r || Xr()) : (t["aria-hidden"] = "true", 
  t.focusable = "false")), t;
}

function Pi(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
    styleParser: !0
  }, n = ji(e), r = n.iconName, a = n.prefix, i = n.rest, o = Ni(e), s = qa("parseNodeAttributes", {}, e), l = t.styleParser ? Ei(e) : [];
  return Vn({
    iconName: r,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: a,
    transform: Gr,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: i,
      styles: l,
      attributes: o
    }
  }, s);
}

var Ti = ua.styles;

function Oi(e) {
  var t = "nest" === Kr.autoReplaceSvg ? Pi(e, {
    styleParser: !1
  }) : Pi(e);
  return ~t.extra.classes.indexOf(zr) ? Ya("generateLayersText", e, t) : Ya("generateSvgReplacementMutation", e, t);
}

var zi = new Set;

function Mi(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
  if (!pr) return Promise.resolve();
  var n = cr.documentElement.classList, r = function(e) {
    return n.add("".concat(kr, "-").concat(e));
  }, a = function(e) {
    return n.remove("".concat(kr, "-").concat(e));
  }, i = Kr.autoFetchSvg ? zi : Ar.map((function(e) {
    return "fa-".concat(e);
  })).concat(Object.keys(Ti));
  i.includes("fa") || i.push("fa");
  var o = [ ".".concat(zr, ":not([").concat(vr, "])") ].concat(i.map((function(e) {
    return ".".concat(e, ":not([").concat(vr, "])");
  }))).join(", ");
  if (0 === o.length) return Promise.resolve();
  var s = [];
  try {
    s = Jr(e.querySelectorAll(o));
  } catch (e) {}
  if (!(s.length > 0)) return Promise.resolve();
  r("pending"), a("complete");
  var l = pi("onTree"), u = s.reduce((function(e, t) {
    try {
      var n = Oi(t);
      n && e.push(n);
    } catch (e) {
      _r || "MissingIcon" === e.name && console.error(e);
    }
    return e;
  }), []);
  return new Promise((function(e, n) {
    Promise.all(u).then((function(n) {
      ki(n, (function() {
        r("active"), r("complete"), a("pending"), "function" == typeof t && t(), l(), e();
      }));
    })).catch((function(e) {
      l(), n(e);
    }));
  }));
}

function Li(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
  Oi(e).then((function(e) {
    e && ki([ e ], t);
  }));
}

Ar.map((function(e) {
  zi.add("fa-".concat(e));
})), Object.keys(jr[Sr]).map(zi.add.bind(zi)), Object.keys(jr[Cr]).map(zi.add.bind(zi)), 
zi = Kn(zi);

var Ri = function(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.transform, r = void 0 === n ? Gr : n, a = t.symbol, i = void 0 !== a && a, o = t.mask, s = void 0 === o ? null : o, l = t.maskId, u = void 0 === l ? null : l, c = t.title, d = void 0 === c ? null : c, f = t.titleId, p = void 0 === f ? null : f, m = t.classes, h = void 0 === m ? [] : m, g = t.attributes, v = void 0 === g ? {} : g, b = t.styles, y = void 0 === b ? {} : b;
  if (e) {
    var x = e.prefix, k = e.iconName, w = e.icon;
    return ti(Vn({
      type: "icon"
    }, e), (function() {
      return Ka("beforeDOMElementCreation", {
        iconDefinition: e,
        params: t
      }), Kr.autoA11y && (d ? v["aria-labelledby"] = "".concat(Kr.replacementClass, "-title-").concat(p || Xr()) : (v["aria-hidden"] = "true", 
      v.focusable = "false")), ni({
        icons: {
          main: oi(w),
          mask: s ? oi(s.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: x,
        iconName: k,
        transform: Vn(Vn({}, Gr), r),
        symbol: i,
        title: d,
        maskId: u,
        titleId: p,
        extra: {
          attributes: v,
          styles: y,
          classes: h
        }
      });
    }));
  }
}, Ii = {
  mixout: function() {
    return {
      icon: (e = Ri, function(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = (t || {}).icon ? t : Qa(t || {}), a = n.mask;
        return a && (a = (a || {}).icon ? a : Qa(a || {})), e(r, Vn(Vn({}, n), {}, {
          mask: a
        }));
      })
    };
    var e;
  },
  hooks: function() {
    return {
      mutationObserverCallbacks: function(e) {
        return e.treeCallback = Mi, e.nodeCallback = Li, e;
      }
    };
  },
  provides: function(e) {
    e.i2svg = function(e) {
      var t = e.node, n = void 0 === t ? cr : t, r = e.callback;
      return Mi(n, void 0 === r ? function() {} : r);
    }, e.generateSvgReplacementMutation = function(e, t) {
      var n = t.iconName, r = t.title, a = t.titleId, i = t.prefix, o = t.transform, s = t.symbol, l = t.mask, u = t.maskId, c = t.extra;
      return new Promise((function(t, d) {
        Promise.all([ li(n, i), l.iconName ? li(l.iconName, l.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        }) ]).then((function(l) {
          var d = qn(l, 2), f = d[0], p = d[1];
          t([ e, ni({
            icons: {
              main: f,
              mask: p
            },
            prefix: i,
            iconName: n,
            transform: o,
            symbol: s,
            maskId: u,
            title: r,
            titleId: a,
            extra: c,
            watchable: !0
          }) ]);
        })).catch(d);
      }));
    }, e.generateAbstractIcon = function(e) {
      var t, n = e.children, r = e.attributes, a = e.main, i = e.transform, o = na(e.styles);
      return o.length > 0 && (r.style = o), ra(i) && (t = Ya("generateAbstractTransformGrouping", {
        main: a,
        transform: i,
        containerWidth: a.width,
        iconWidth: a.width
      })), n.push(t || a.icon), {
        children: n,
        attributes: r
      };
    };
  }
}, Fi = {
  mixout: function() {
    return {
      layer: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.classes, r = void 0 === n ? [] : n;
        return ti({
          type: "layer"
        }, (function() {
          Ka("beforeDOMElementCreation", {
            assembler: e,
            params: t
          });
          var n = [];
          return e((function(e) {
            Array.isArray(e) ? e.map((function(e) {
              n = n.concat(e.abstract);
            })) : n = n.concat(e.abstract);
          })), [ {
            tag: "span",
            attributes: {
              class: [ "".concat(Kr.cssPrefix, "-layers") ].concat(Kn(r)).join(" ")
            },
            children: n
          } ];
        }));
      }
    };
  }
}, Di = {
  mixout: function() {
    return {
      counter: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.title, r = void 0 === n ? null : n, a = t.classes, i = void 0 === a ? [] : a, o = t.attributes, s = void 0 === o ? {} : o, l = t.styles, u = void 0 === l ? {} : l;
        return ti({
          type: "counter",
          content: e
        }, (function() {
          return Ka("beforeDOMElementCreation", {
            content: e,
            params: t
          }), ai({
            content: e.toString(),
            title: r,
            extra: {
              attributes: s,
              styles: u,
              classes: [ "".concat(Kr.cssPrefix, "-layers-counter") ].concat(Kn(i))
            }
          });
        }));
      }
    };
  }
}, Ui = {
  mixout: function() {
    return {
      text: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.transform, r = void 0 === n ? Gr : n, a = t.title, i = void 0 === a ? null : a, o = t.classes, s = void 0 === o ? [] : o, l = t.attributes, u = void 0 === l ? {} : l, c = t.styles, d = void 0 === c ? {} : c;
        return ti({
          type: "text",
          content: e
        }, (function() {
          return Ka("beforeDOMElementCreation", {
            content: e,
            params: t
          }), ri({
            content: e,
            transform: Vn(Vn({}, Gr), r),
            title: i,
            extra: {
              attributes: u,
              styles: d,
              classes: [ "".concat(Kr.cssPrefix, "-layers-text") ].concat(Kn(s))
            }
          });
        }));
      }
    };
  },
  provides: function(e) {
    e.generateLayersText = function(e, t) {
      var n = t.title, r = t.transform, a = t.extra, i = null, o = null;
      if (mr) {
        var s = parseInt(getComputedStyle(e).fontSize, 10), l = e.getBoundingClientRect();
        i = l.width / s, o = l.height / s;
      }
      return Kr.autoA11y && !n && (a.attributes["aria-hidden"] = "true"), Promise.resolve([ e, ri({
        content: e.innerHTML,
        width: i,
        height: o,
        transform: r,
        title: n,
        extra: a,
        watchable: !0
      }) ]);
    };
  }
}, Zi = new RegExp('"', "ug"), Bi = [ 1105920, 1112319 ];

function Vi(e, t) {
  var n = "".concat("data-fa-pseudo-element-pending").concat(t.replace(":", "-"));
  return new Promise((function(r, a) {
    if (null !== e.getAttribute(n)) return r();
    var i, o, s, l = Jr(e.children).filter((function(e) {
      return e.getAttribute(br) === t;
    }))[0], u = ur.getComputedStyle(e, t), c = u.getPropertyValue("font-family").match(Mr), d = u.getPropertyValue("font-weight"), f = u.getPropertyValue("content");
    if (l && !c) return e.removeChild(l), r();
    if (c && "none" !== f && "" !== f) {
      var p = u.getPropertyValue("content"), m = ~[ "Sharp" ].indexOf(c[2]) ? Cr : Sr, h = ~[ "Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit" ].indexOf(c[2]) ? Nr[m][c[2].toLowerCase()] : Lr[m][d], g = function(e) {
        var t, n, r, a, i, o = e.replace(Zi, ""), s = (n = 0, a = (t = o).length, (i = t.charCodeAt(n)) >= 55296 && i <= 56319 && a > n + 1 && (r = t.charCodeAt(n + 1)) >= 56320 && r <= 57343 ? 1024 * (i - 55296) + r - 56320 + 65536 : i), l = s >= Bi[0] && s <= Bi[1], u = 2 === o.length && o[0] === o[1];
        return {
          value: ga(u ? o[0] : o),
          isSecondary: l || u
        };
      }(p), v = g.value, b = g.isSecondary, y = c[0].startsWith("FontAwesome"), x = La(h, v), k = x;
      if (y) {
        var w = (o = Na[i = v], s = La("fas", i), o || (s ? {
          prefix: "fas",
          iconName: s
        } : null) || {
          prefix: null,
          iconName: null
        });
        w.iconName && w.prefix && (x = w.iconName, h = w.prefix);
      }
      if (!x || b || l && l.getAttribute(yr) === h && l.getAttribute(xr) === k) r(); else {
        e.setAttribute(n, k), l && e.removeChild(l);
        var _ = {
          iconName: null,
          title: null,
          titleId: null,
          prefix: null,
          transform: Gr,
          symbol: !1,
          mask: {
            iconName: null,
            prefix: null,
            rest: []
          },
          maskId: null,
          extra: {
            classes: [],
            styles: {},
            attributes: {}
          }
        }, S = _.extra;
        S.attributes[br] = t, li(x, h).then((function(a) {
          var i = ni(Vn(Vn({}, _), {}, {
            icons: {
              main: a,
              mask: {
                prefix: null,
                iconName: null,
                rest: []
              }
            },
            prefix: h,
            iconName: k,
            extra: S,
            watchable: !0
          })), o = cr.createElement("svg");
          "::before" === t ? e.insertBefore(o, e.firstChild) : e.appendChild(o), o.outerHTML = i.map((function(e) {
            return pa(e);
          })).join("\n"), e.removeAttribute(n), r();
        })).catch(a);
      }
    } else r();
  }));
}

function $i(e) {
  return Promise.all([ Vi(e, "::before"), Vi(e, "::after") ]);
}

function Wi(e) {
  return !(e.parentNode === document.head || ~wr.indexOf(e.tagName.toUpperCase()) || e.getAttribute(br) || e.parentNode && "svg" === e.parentNode.tagName);
}

function Hi(e) {
  if (pr) return new Promise((function(t, n) {
    var r = Jr(e.querySelectorAll("*")).filter(Wi).map($i), a = pi("searchPseudoElements");
    _i(), Promise.all(r).then((function() {
      a(), Si(), t();
    })).catch((function() {
      a(), Si(), n();
    }));
  }));
}

var qi = !1, Ki = function(e) {
  return e.toLowerCase().split(" ").reduce((function(e, t) {
    var n = t.toLowerCase().split("-"), r = n[0], a = n.slice(1).join("-");
    if (r && "h" === a) return e.flipX = !0, e;
    if (r && "v" === a) return e.flipY = !0, e;
    if (a = parseFloat(a), isNaN(a)) return e;
    switch (r) {
     case "grow":
      e.size = e.size + a;
      break;

     case "shrink":
      e.size = e.size - a;
      break;

     case "left":
      e.x = e.x - a;
      break;

     case "right":
      e.x = e.x + a;
      break;

     case "up":
      e.y = e.y - a;
      break;

     case "down":
      e.y = e.y + a;
      break;

     case "rotate":
      e.rotate = e.rotate + a;
    }
    return e;
  }), {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  });
}, Yi = {
  mixout: function() {
    return {
      parse: {
        transform: function(e) {
          return Ki(e);
        }
      }
    };
  },
  hooks: function() {
    return {
      parseNodeAttributes: function(e, t) {
        var n = t.getAttribute("data-fa-transform");
        return n && (e.transform = Ki(n)), e;
      }
    };
  },
  provides: function(e) {
    e.generateAbstractTransformGrouping = function(e) {
      var t = e.main, n = e.transform, r = e.containerWidth, a = e.iconWidth, i = {
        transform: "translate(".concat(r / 2, " 256)")
      }, o = "translate(".concat(32 * n.x, ", ").concat(32 * n.y, ") "), s = "scale(".concat(n.size / 16 * (n.flipX ? -1 : 1), ", ").concat(n.size / 16 * (n.flipY ? -1 : 1), ") "), l = "rotate(".concat(n.rotate, " 0 0)"), u = {
        outer: i,
        inner: {
          transform: "".concat(o, " ").concat(s, " ").concat(l)
        },
        path: {
          transform: "translate(".concat(a / 2 * -1, " -256)")
        }
      };
      return {
        tag: "g",
        attributes: Vn({}, u.outer),
        children: [ {
          tag: "g",
          attributes: Vn({}, u.inner),
          children: [ {
            tag: t.icon.tag,
            children: t.icon.children,
            attributes: Vn(Vn({}, t.icon.attributes), u.path)
          } ]
        } ]
      };
    };
  }
}, Qi = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};

function Gi(e) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), 
  e;
}

var Xi, Ji = {
  hooks: function() {
    return {
      parseNodeAttributes: function(e, t) {
        var n = t.getAttribute("data-fa-mask"), r = n ? Za(n.split(" ").map((function(e) {
          return e.trim();
        }))) : {
          prefix: null,
          iconName: null,
          rest: []
        };
        return r.prefix || (r.prefix = Fa()), e.mask = r, e.maskId = t.getAttribute("data-fa-mask-id"), 
        e;
      }
    };
  },
  provides: function(e) {
    e.generateAbstractMask = function(e) {
      var t, n = e.children, r = e.attributes, a = e.main, i = e.mask, o = e.maskId, s = e.transform, l = a.width, u = a.icon, c = i.width, d = i.icon, f = function(e) {
        var t = e.transform, n = e.containerWidth, r = e.iconWidth, a = {
          transform: "translate(".concat(n / 2, " 256)")
        }, i = "translate(".concat(32 * t.x, ", ").concat(32 * t.y, ") "), o = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), s = "rotate(".concat(t.rotate, " 0 0)");
        return {
          outer: a,
          inner: {
            transform: "".concat(i, " ").concat(o, " ").concat(s)
          },
          path: {
            transform: "translate(".concat(r / 2 * -1, " -256)")
          }
        };
      }({
        transform: s,
        containerWidth: c,
        iconWidth: l
      }), p = {
        tag: "rect",
        attributes: Vn(Vn({}, Qi), {}, {
          fill: "white"
        })
      }, m = u.children ? {
        children: u.children.map(Gi)
      } : {}, h = {
        tag: "g",
        attributes: Vn({}, f.inner),
        children: [ Gi(Vn({
          tag: u.tag,
          attributes: Vn(Vn({}, u.attributes), f.path)
        }, m)) ]
      }, g = {
        tag: "g",
        attributes: Vn({}, f.outer),
        children: [ h ]
      }, v = "mask-".concat(o || Xr()), b = "clip-".concat(o || Xr()), y = {
        tag: "mask",
        attributes: Vn(Vn({}, Qi), {}, {
          id: v,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [ p, g ]
      }, x = {
        tag: "defs",
        children: [ {
          tag: "clipPath",
          attributes: {
            id: b
          },
          children: (t = d, "g" === t.tag ? t.children : [ t ])
        }, y ]
      };
      return n.push(x, {
        tag: "rect",
        attributes: Vn({
          fill: "currentColor",
          "clip-path": "url(#".concat(b, ")"),
          mask: "url(#".concat(v, ")")
        }, Qi)
      }), {
        children: n,
        attributes: r
      };
    };
  }
};

Xi = {
  mixoutsTo: Ja
}.mixoutsTo, Va = [ sa, Ii, Fi, Di, Ui, {
  hooks: function() {
    return {
      mutationObserverCallbacks: function(e) {
        return e.pseudoElementsCallback = Hi, e;
      }
    };
  },
  provides: function(e) {
    e.pseudoElements2svg = function(e) {
      var t = e.node, n = void 0 === t ? cr : t;
      Kr.searchPseudoElements && Hi(n);
    };
  }
}, {
  mixout: function() {
    return {
      dom: {
        unwatch: function() {
          _i(), qi = !0;
        }
      }
    };
  },
  hooks: function() {
    return {
      bootstrap: function() {
        Ai(qa("mutationObserverCallbacks", {}));
      },
      noAuto: function() {
        Ci && Ci.disconnect();
      },
      watch: function(e) {
        var t = e.observeMutationsRoot;
        qi ? Si() : Ai(qa("mutationObserverCallbacks", {
          observeMutationsRoot: t
        }));
      }
    };
  }
}, Yi, Ji, {
  provides: function(e) {
    var t = !1;
    ur.matchMedia && (t = ur.matchMedia("(prefers-reduced-motion: reduce)").matches), 
    e.missingIconAbstract = function() {
      var e = [], n = {
        fill: "currentColor"
      }, r = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      e.push({
        tag: "path",
        attributes: Vn(Vn({}, n), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      var a = Vn(Vn({}, r), {}, {
        attributeName: "opacity"
      }), i = {
        tag: "circle",
        attributes: Vn(Vn({}, n), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      return t || i.children.push({
        tag: "animate",
        attributes: Vn(Vn({}, r), {}, {
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        })
      }, {
        tag: "animate",
        attributes: Vn(Vn({}, a), {}, {
          values: "1;0;1;1;0;1;"
        })
      }), e.push(i), e.push({
        tag: "path",
        attributes: Vn(Vn({}, n), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: t ? [] : [ {
          tag: "animate",
          attributes: Vn(Vn({}, a), {}, {
            values: "1;0;0;0;0;1;"
          })
        } ]
      }), t || e.push({
        tag: "path",
        attributes: Vn(Vn({}, n), {}, {
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }),
        children: [ {
          tag: "animate",
          attributes: Vn(Vn({}, a), {}, {
            values: "0;0;1;1;0;0;"
          })
        } ]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: e
      };
    };
  }
}, {
  hooks: function() {
    return {
      parseNodeAttributes: function(e, t) {
        var n = t.getAttribute("data-fa-symbol"), r = null !== n && ("" === n || n);
        return e.symbol = r, e;
      }
    };
  }
} ], $a = {}, Object.keys(Wa).forEach((function(e) {
  -1 === Ha.indexOf(e) && delete Wa[e];
})), Va.forEach((function(e) {
  var t = e.mixout ? e.mixout() : {};
  if (Object.keys(t).forEach((function(e) {
    "function" == typeof t[e] && (Xi[e] = t[e]), "object" === $n(t[e]) && Object.keys(t[e]).forEach((function(n) {
      Xi[e] || (Xi[e] = {}), Xi[e][n] = t[e][n];
    }));
  })), e.hooks) {
    var n = e.hooks();
    Object.keys(n).forEach((function(e) {
      $a[e] || ($a[e] = []), $a[e].push(n[e]);
    }));
  }
  e.provides && e.provides(Wa);
}));

var eo, to = Ja.parse, no = Ja.icon;

eo = i("fyeBw")();

jn = i("djNrI");

function ro(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter((function(t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    }))), n.push.apply(n, r);
  }
  return n;
}

function ao(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ro(Object(n), !0).forEach((function(t) {
      oo(e, t, n[t]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ro(Object(n)).forEach((function(t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    }));
  }
  return e;
}

function io(e) {
  return io = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
  } : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, io(e);
}

function oo(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}

function so(e, t) {
  if (null == e) return {};
  var n, r, a = function(e, t) {
    if (null == e) return {};
    var n, r, a = {}, i = Object.keys(e);
    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
    return a;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]);
  }
  return a;
}

function lo(e) {
  return function(e) {
    if (Array.isArray(e)) return uo(e);
  }(e) || function(e) {
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e);
  }(e) || function(e, t) {
    if (!e) return;
    if ("string" == typeof e) return uo(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    "Object" === n && e.constructor && (n = e.constructor.name);
    if ("Map" === n || "Set" === n) return Array.from(e);
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return uo(e, t);
  }(e) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}

function uo(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}

function co(e) {
  return function(e) {
    return (e -= 0) == e;
  }(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, (function(e, t) {
    return t ? t.toUpperCase() : "";
  }))).substr(0, 1).toLowerCase() + e.substr(1);
}

var fo = [ "style" ];

function po(e) {
  return e.split(";").map((function(e) {
    return e.trim();
  })).filter((function(e) {
    return e;
  })).reduce((function(e, t) {
    var n, r = t.indexOf(":"), a = co(t.slice(0, r)), i = t.slice(r + 1).trim();
    return a.startsWith("webkit") ? e[(n = a, n.charAt(0).toUpperCase() + n.slice(1))] = i : e[a] = i, 
    e;
  }), {});
}

var mo = !1;

try {
  mo = !0;
} catch (e) {}

function ho(e) {
  return e && "object" === io(e) && e.prefix && e.iconName && e.icon ? e : to.icon ? to.icon(e) : null === e ? null : e && "object" === io(e) && e.prefix && e.iconName ? e : Array.isArray(e) && 2 === e.length ? {
    prefix: e[0],
    iconName: e[1]
  } : "string" == typeof e ? {
    prefix: "fas",
    iconName: e
  } : void 0;
}

function go(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? oo({}, e, t) : {};
}

var vo = t(jn).forwardRef((function(e, t) {
  var n = e.icon, r = e.mask, a = e.symbol, i = e.className, o = e.title, s = e.titleId, l = e.maskId, u = ho(n), c = go("classes", [].concat(lo(function(e) {
    var t, n = e.beat, r = e.fade, a = e.beatFade, i = e.bounce, o = e.shake, s = e.flash, l = e.spin, u = e.spinPulse, c = e.spinReverse, d = e.pulse, f = e.fixedWidth, p = e.inverse, m = e.border, h = e.listItem, g = e.flip, v = e.size, b = e.rotation, y = e.pull, x = (oo(t = {
      "fa-beat": n,
      "fa-fade": r,
      "fa-beat-fade": a,
      "fa-bounce": i,
      "fa-shake": o,
      "fa-flash": s,
      "fa-spin": l,
      "fa-spin-reverse": c,
      "fa-spin-pulse": u,
      "fa-pulse": d,
      "fa-fw": f,
      "fa-inverse": p,
      "fa-border": m,
      "fa-li": h,
      "fa-flip": !0 === g,
      "fa-flip-horizontal": "horizontal" === g || "both" === g,
      "fa-flip-vertical": "vertical" === g || "both" === g
    }, "fa-".concat(v), null != v), oo(t, "fa-rotate-".concat(b), null != b && 0 !== b), 
    oo(t, "fa-pull-".concat(y), null != y), oo(t, "fa-swap-opacity", e.swapOpacity), 
    t);
    return Object.keys(x).map((function(e) {
      return x[e] ? e : null;
    })).filter((function(e) {
      return e;
    }));
  }(e)), lo(i.split(" ")))), d = go("transform", "string" == typeof e.transform ? to.transform(e.transform) : e.transform), f = go("mask", ho(r)), p = no(u, ao(ao(ao(ao({}, c), d), f), {}, {
    symbol: a,
    title: o,
    titleId: s,
    maskId: l
  }));
  if (!p) return function() {
    var e;
    !mo && console && "function" == typeof console.error && (e = console).error.apply(e, arguments);
  }("Could not find icon", u), null;
  var m = p.abstract, h = {
    ref: t
  };
  return Object.keys(e).forEach((function(t) {
    vo.defaultProps.hasOwnProperty(t) || (h[t] = e[t]);
  })), bo(m[0], h);
}));

vo.displayName = "FontAwesomeIcon", vo.propTypes = {
  beat: t(eo).bool,
  border: t(eo).bool,
  beatFade: t(eo).bool,
  bounce: t(eo).bool,
  className: t(eo).string,
  fade: t(eo).bool,
  flash: t(eo).bool,
  mask: t(eo).oneOfType([ t(eo).object, t(eo).array, t(eo).string ]),
  maskId: t(eo).string,
  fixedWidth: t(eo).bool,
  inverse: t(eo).bool,
  flip: t(eo).oneOf([ !0, !1, "horizontal", "vertical", "both" ]),
  icon: t(eo).oneOfType([ t(eo).object, t(eo).array, t(eo).string ]),
  listItem: t(eo).bool,
  pull: t(eo).oneOf([ "right", "left" ]),
  pulse: t(eo).bool,
  rotation: t(eo).oneOf([ 0, 90, 180, 270 ]),
  shake: t(eo).bool,
  size: t(eo).oneOf([ "2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x" ]),
  spin: t(eo).bool,
  spinPulse: t(eo).bool,
  spinReverse: t(eo).bool,
  symbol: t(eo).oneOfType([ t(eo).bool, t(eo).string ]),
  title: t(eo).string,
  titleId: t(eo).string,
  transform: t(eo).oneOfType([ t(eo).string, t(eo).object ]),
  swapOpacity: t(eo).bool
}, vo.defaultProps = {
  border: !1,
  className: "",
  mask: null,
  maskId: null,
  fixedWidth: !1,
  inverse: !1,
  flip: !1,
  icon: null,
  listItem: !1,
  pull: null,
  pulse: !1,
  rotation: null,
  size: null,
  spin: !1,
  spinPulse: !1,
  spinReverse: !1,
  beat: !1,
  fade: !1,
  beatFade: !1,
  bounce: !1,
  shake: !1,
  symbol: !1,
  title: "",
  titleId: null,
  transform: null,
  swapOpacity: !1
};

var bo = function e(t, n) {
  var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  if ("string" == typeof n) return n;
  var a = (n.children || []).map((function(n) {
    return e(t, n);
  })), i = Object.keys(n.attributes || {}).reduce((function(e, t) {
    var r = n.attributes[t];
    switch (t) {
     case "class":
      e.attrs.className = r, delete n.attributes.class;
      break;

     case "style":
      e.attrs.style = po(r);
      break;

     default:
      0 === t.indexOf("aria-") || 0 === t.indexOf("data-") ? e.attrs[t.toLowerCase()] = r : e.attrs[co(t)] = r;
    }
    return e;
  }), {
    attrs: {}
  }), o = r.style, s = void 0 === o ? {} : o, l = so(r, fo);
  return i.attrs.style = ao(ao({}, i.attrs.style), s), t.apply(void 0, [ n.tag, ao(ao({}, i.attrs), l) ].concat(lo(a)));
}.bind(null, t(jn).createElement);

const yo = {
  info: Fn,
  warning: Zn,
  success: Rn,
  error: zn,
  unset: Dn,
  enabled: Ln,
  disabled: On
};

function xo({type: e, children: t}) {
  const n = yo[e];
  return (0, o.jsxs)("div", {
    className: `Alert ${e}`,
    children: [ (0, o.jsx)(vo, {
      className: "icon",
      icon: n
    }), (0, o.jsx)("p", {
      children: t
    }) ]
  });
}

function ko({label: e, defaultValue: t, step: n = 1, min: r, max: a, isDisabled: i, isValid: s, onChange: l, onBlur: u, children: c}) {
  const d = (0, jn.useId)();
  return (0, o.jsxs)("div", {
    className: "Input",
    children: [ (0, o.jsx)("label", {
      htmlFor: d,
      children: e
    }), (0, o.jsxs)("div", {
      children: [ (0, o.jsx)("input", {
        value: t,
        id: d,
        type: "number",
        step: n,
        max: a,
        min: r,
        disabled: i,
        "data-is-valid": s,
        onChange: e => {
          const t = "" === (n = e.target.value) ? Number.NaN : Number(n);
          var n;
          l(t);
        },
        onBlur: () => {
          u();
        }
      }), !s && (0, o.jsxs)(xo, {
        type: "error",
        children: [ "Select a value between ", r, " and ", a ]
      }), c ]
    }) ]
  });
}

const wo = (0, (jn = i("djNrI")).createContext)({
  name: "",
  selectedValue: "",
  isDisabled: !1,
  onChange() {}
});

function _o({value: e, children: t}) {
  const {name: n, selectedValue: r, isDisabled: a, onChange: i} = (0, jn.useContext)(wo);
  return (0, o.jsxs)("label", {
    className: "Radio",
    htmlFor: `${n}-${e}`,
    children: [ (0, o.jsx)("input", {
      type: "radio",
      name: n,
      id: `${n}-${e}`,
      value: e,
      disabled: a,
      checked: e === r,
      onChange: () => {
        i(e);
      }
    }), (0, o.jsx)("div", {
      className: "body",
      children: t
    }) ]
  });
}

function So({label: e, name: t, defaultValue: n, isDisabled: r, onChange: a, children: i}) {
  const s = (0, jn.useMemo)((() => ({
    name: t,
    selectedValue: n,
    isDisabled: r,
    onChange: a
  })), [ t, n, r, a ]);
  return (0, o.jsx)(wo.Provider, {
    value: s,
    children: (0, o.jsxs)("div", {
      className: "RadioGroup " + (r ? "disabled" : ""),
      children: [ e, (0, o.jsx)("div", {
        className: "options",
        children: i
      }) ]
    })
  });
}

function Co({children: e}) {
  return (0, o.jsx)("div", {
    className: "SettingRow",
    children: e
  });
}

jn = i("djNrI");

function Ao({label: e, defaultValue: t, isValid: n, onChange: r, onBlur: a, children: i}) {
  const s = (0, jn.useId)();
  return (0, o.jsxs)("div", {
    className: "Input",
    children: [ (0, o.jsx)("label", {
      htmlFor: s,
      children: e
    }), (0, o.jsxs)("div", {
      children: [ (0, o.jsx)("input", {
        value: t,
        id: s,
        type: "text",
        "data-is-valid": n,
        onChange: e => {
          r(e.target.value);
        },
        onBlur: e => {
          e.target.classList.remove("valid", "invalid"), a && a();
        }
      }), i ]
    }) ]
  });
}

function Eo({value: e, children: t}) {
  return (0, o.jsx)("option", {
    value: e,
    children: t
  });
}

function jo({label: e, defaultValue: t, isDisabled: n, onChange: r, children: a}) {
  return (0, o.jsxs)("div", {
    className: "Select " + (n ? "disabled" : ""),
    children: [ e, (0, o.jsx)("select", {
      value: t,
      disabled: n,
      onChange: e => {
        r(e.target.value);
      },
      children: a
    }) ]
  });
}

function No({value: e, onChange: t}) {
  function n(n, r) {
    const a = e.map(((e, t) => t === r ? "pattern" === n.target.name ? [ n.target.value, e[1] ] : [ e[0], n.target.value ] : e));
    t(a);
  }
  return (0, o.jsxs)("div", {
    className: "ExcludeKeysSetting",
    children: [ (0, o.jsx)("p", {
      children: "Exclude keys"
    }), e.length > 0 && (0, o.jsxs)("div", {
      className: "row header",
      children: [ (0, o.jsx)("p", {
        children: "Pattern"
      }), (0, o.jsx)("p", {
        children: "Keys to exclude"
      }) ]
    }), e.map(((r, a) => (0, o.jsxs)("div", {
      className: "row",
      children: [ (0, o.jsx)("input", {
        autoFocus: a === e.length - 1 && !r[0] && !r[1],
        type: "text",
        name: "pattern",
        "aria-label": "pattern",
        value: r[0],
        onChange: e => {
          n(e, a);
        }
      }), (0, o.jsx)("input", {
        type: "text",
        name: "keys",
        "aria-label": "keys to exclude",
        value: r[1],
        onChange: e => {
          n(e, a);
        }
      }), (0, o.jsx)("button", {
        type: "button",
        "aria-label": "delete",
        onClick: () => {
          !function(n) {
            t(e.filter(((e, t) => t !== n)));
          }(a);
        },
        children: (0, o.jsx)(vo, {
          icon: In,
          style: {
            color: "#ef4444"
          }
        })
      }) ]
    }, a))), (0, o.jsxs)("button", {
      className: "button-add",
      type: "button",
      onClick: () => {
        e.push([ "", "" ]), t(e);
      },
      children: [ (0, o.jsx)(vo, {
        icon: Un,
        size: "lg",
        style: {
          color: "#22c55e",
          marginRight: "0.25em"
        }
      }), "Add" ]
    }), (0, o.jsxs)("p", {
      className: "explanation",
      children: [ "Exclude keys for certain patterns. Patterns are regular expression that will be used to match against the URL of the page. You can easily add a pattern for the current URL by right clicking on the extension icon and selecting ", (0, 
      o.jsx)("code", {
        children: "Add Keys to Exclude"
      }) ]
    }) ]
  });
}

function Po({value: e, onChange: t}) {
  function n(n, r, a) {
    const i = e.map(((e, t) => t === a ? {
      ...e,
      [r]: n.target.value
    } : e));
    t(i);
  }
  function r(n) {
    const r = {
      type: n,
      pattern: "",
      selector: ""
    };
    t([ ...e, r ]);
  }
  return (0, o.jsxs)("div", {
    className: "CustomHintsSetting",
    children: [ e.length > 0 && (0, o.jsxs)("div", {
      className: "row header",
      children: [ (0, o.jsx)("p", {
        children: "Pattern"
      }), (0, o.jsx)("p", {
        children: "Selector"
      }) ]
    }), e.map((({type: r, pattern: a, selector: i}, s) => (0, o.jsxs)("div", {
      className: "row",
      children: [ "include" === r ? (0, o.jsx)(vo, {
        icon: Un,
        size: "lg",
        style: {
          color: "#22c55e",
          marginRight: "0.25em"
        }
      }) : (0, o.jsx)(vo, {
        icon: Mn,
        style: {
          color: "#ef4444"
        }
      }), (0, o.jsx)("input", {
        autoFocus: s === e.length - 1 && "" === a && "" === i,
        type: "text",
        name: "pattern",
        "aria-label": "pattern",
        value: a,
        "data-is-valid": gn(a),
        onChange: e => {
          n(e, "pattern", s);
        }
      }), (0, o.jsx)("input", {
        type: "text",
        name: "selector",
        "aria-label": "selector",
        value: i,
        "data-is-valid": i && hn(i),
        onChange: e => {
          n(e, "selector", s);
        }
      }), (0, o.jsx)("button", {
        type: "button",
        "aria-label": "delete",
        onClick: () => {
          !function(n) {
            const r = e.filter(((e, t) => t !== n));
            t(r);
          }(s);
        },
        children: (0, o.jsx)(vo, {
          icon: In,
          style: {
            color: "#ef4444"
          }
        })
      }) ]
    }, s))), (0, o.jsxs)("div", {
      className: "row",
      children: [ (0, o.jsxs)("button", {
        className: "button-add",
        type: "button",
        onClick: () => {
          r("include");
        },
        children: [ (0, o.jsx)(vo, {
          icon: Un,
          size: "lg",
          style: {
            color: "#22c55e",
            marginRight: "0.25em"
          }
        }), "Add selector to include" ]
      }), (0, o.jsxs)("button", {
        className: "button-add",
        type: "button",
        onClick: () => {
          r("exclude");
        },
        children: [ (0, o.jsx)(vo, {
          icon: Mn,
          size: "lg",
          style: {
            color: "#ef4444",
            marginRight: "0.25em"
          }
        }), "Add selector to exclude" ]
      }) ]
    }) ]
  });
}

let To = !1;

function Oo() {
  const [e, n] = (0, jn.useState)(ln), [r, a] = (0, jn.useState)(ln), [i, s] = (0, 
  jn.useState)(!0);
  (0, jn.useEffect)((() => {
    En().then((e => {
      n(e), a(e), s(!1);
    })), t(v).storage.onChanged.addListener((e => {
      Nn(ln, e) && !To && En().then((e => {
        n(e), a(e);
      }));
    }));
  }), []);
  const l = (e, t) => {
    a((n => ({
      ...n,
      [e]: t
    }))), pn(e, t) && (n((n => ({
      ...n,
      [e]: t
    }))), To = !0, setTimeout((() => {
      To = !1;
    }), 1e3), wn(e, t));
  }, u = () => {
    a(e);
  };
  return i ? (0, o.jsx)("div", {}) : (0, o.jsxs)("div", {
    className: "Settings",
    children: [ (0, o.jsxs)(Pn, {
      label: "General",
      children: [ (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Always compute hintable elements",
          isPressed: r.alwaysComputeHintables,
          onClick: () => {
            l("alwaysComputeHintables", !r.alwaysComputeHintables);
          },
          children: (0, o.jsx)("p", {
            className: "explanation",
            children: "Always compute what elements should be hinted even if the hints are toggled off. This makes switching hints on quicker."
          })
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Show What's New page after updating",
          isPressed: r.showWhatsNewPageOnUpdate,
          onClick: () => {
            l("showWhatsNewPageOnUpdate", !r.showWhatsNewPageOnUpdate);
          }
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsxs)(So, {
          label: "New tab position",
          name: "newTabPosition",
          defaultValue: r.newTabPosition,
          onChange: e => {
            l("newTabPosition", e);
          },
          children: [ (0, o.jsxs)(_o, {
            value: "relatedAfterCurrent",
            children: [ "Related after current", (0, o.jsx)("p", {
              className: "small",
              children: "Open new tabs next to the last tab that was opened from the current tab or next to the current tab if no previous tab was opened from the current tab."
            }) ]
          }), (0, o.jsxs)(_o, {
            value: "afterCurrent",
            children: [ "After current", (0, o.jsx)("p", {
              className: "small",
              children: "Open new tabs next to the current tab."
            }) ]
          }), (0, o.jsxs)(_o, {
            value: "atEnd",
            children: [ "At end", (0, o.jsx)("p", {
              className: "small",
              children: "Open all tabs at the end of the tabstrip."
            }) ]
          }) ]
        })
      }) ]
    }), (0, o.jsxs)(Pn, {
      label: "Direct clicking",
      children: [ (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Direct clicking available with no focused document",
          isPressed: r.directClickWithNoFocusedDocument,
          onClick: () => {
            l("directClickWithNoFocusedDocument", !r.directClickWithNoFocusedDocument);
          },
          children: (0, o.jsx)("p", {
            className: "explanation",
            children: "Direct clicking will be available even when the page is not in focus, for example, when focused in the address bar or the devtools."
          })
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Direct clicking available when editing text",
          isPressed: r.directClickWhenEditing,
          onClick: () => {
            l("directClickWhenEditing", !r.directClickWhenEditing);
          },
          children: (0, o.jsx)("p", {
            className: "explanation",
            children: "Direct clicking will be available even when the focus is in an input field, textarea or similar."
          })
        })
      }) ]
    }), (0, o.jsxs)(Pn, {
      label: "Keyboard clicking",
      children: [ (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Keyboard clicking",
          isPressed: r.keyboardClicking,
          onClick: () => {
            l("keyboardClicking", !r.keyboardClicking);
          },
          children: (0, o.jsx)("p", {
            className: "explanation",
            children: "Be able to click elements by typing the hint letters."
          })
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(No, {
          value: r.keysToExclude,
          onChange: e => {
            l("keysToExclude", e);
          }
        })
      }) ]
    }), (0, o.jsxs)(Pn, {
      label: "Title decorators",
      children: [ (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Include URL in title",
          isPressed: r.urlInTitle,
          onClick: () => {
            l("urlInTitle", !r.urlInTitle);
          }
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Include tab marker in title",
          isPressed: r.includeTabMarkers,
          onClick: () => {
            l("includeTabMarkers", !r.includeTabMarkers);
          }
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Hide tab markers with global hints toggle off",
          isPressed: r.hideTabMarkersWithGlobalHintsOff,
          onClick: () => {
            l("hideTabMarkersWithGlobalHintsOff", !r.hideTabMarkersWithGlobalHintsOff);
          }
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Use uppercase tab markers",
          isPressed: r.uppercaseTabMarkers,
          isDisabled: !r.includeTabMarkers,
          onClick: () => {
            l("uppercaseTabMarkers", !r.uppercaseTabMarkers);
          }
        })
      }) ]
    }), (0, o.jsxs)(Pn, {
      label: "Hints appearance",
      children: [ (0, o.jsx)(Co, {
        children: (0, o.jsx)(Ao, {
          label: "Hints to exclude",
          defaultValue: r.hintsToExclude,
          onChange: e => {
            l("hintsToExclude", e);
          },
          onBlur: u
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Use numbers for hints",
          isPressed: r.useNumberHints,
          isDisabled: r.keyboardClicking,
          onClick: () => {
            l("useNumberHints", !r.useNumberHints);
          },
          children: r.keyboardClicking && (0, o.jsx)("p", {
            className: "explanation",
            children: "This setting is disabled while keyboard clicking is enabled."
          })
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsxs)(Tn, {
          label: "Include single letter hints",
          isPressed: r.includeSingleLetterHints,
          isDisabled: r.keyboardClicking || r.useNumberHints,
          onClick: () => {
            l("includeSingleLetterHints", !r.includeSingleLetterHints);
          },
          children: [ r.keyboardClicking && (0, o.jsx)("p", {
            className: "explanation",
            children: "This setting is disabled while keyboard clicking is enabled. Hints must consist of two letters so all are keyboard reachable."
          }), r.useNumberHints && !r.keyboardClicking && (0, o.jsx)("p", {
            className: "explanation",
            children: "This setting is disabled when using numbered hints."
          }) ]
        })
      }), (0, o.jsxs)(Co, {
        children: [ (0, o.jsx)(Tn, {
          label: "Use uppercase letters",
          isPressed: r.hintUppercaseLetters,
          isDisabled: r.useNumberHints && !r.keyboardClicking,
          onClick: () => {
            l("hintUppercaseLetters", !r.hintUppercaseLetters);
          }
        }), r.useNumberHints && !r.keyboardClicking && (0, o.jsx)("p", {
          className: "explanation",
          children: "This setting is disabled when using numbered hints."
        }) ]
      }), (0, o.jsxs)(Co, {
        children: [ (0, o.jsx)(ko, {
          label: "Viewport margin (px)",
          defaultValue: r.viewportMargin,
          min: 0,
          max: 2e3,
          isValid: pn("viewportMargin", r.viewportMargin),
          onChange: e => {
            l("viewportMargin", e);
          },
          onBlur: u
        }), (0, o.jsx)("p", {
          className: "explanation",
          children: "Determines the area outside of the viewport where hints will be drawn. A large number provides a better experience when scrolling while a small number will make it more likely to show high priority hints (single letters or low numbers)."
        }) ]
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Ao, {
          label: "Font family",
          defaultValue: r.hintFontFamily,
          onChange: e => {
            l("hintFontFamily", e);
          },
          onBlur: u
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(ko, {
          label: "Font size (px)",
          defaultValue: r.hintFontSize,
          min: 1,
          max: 72,
          isValid: pn("hintFontSize", r.hintFontSize),
          onChange: e => {
            l("hintFontSize", e);
          },
          onBlur: u
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsxs)(So, {
          label: "Font weight",
          name: "hintWeight",
          defaultValue: r.hintWeight,
          onChange: e => {
            l("hintWeight", e);
          },
          children: [ (0, o.jsxs)(_o, {
            value: "auto",
            children: [ "auto", (0, o.jsx)("p", {
              className: "small",
              children: "The font weight is automatically selected for each hint depending on contrast and font size"
            }) ]
          }), (0, o.jsx)(_o, {
            value: "normal",
            children: "normal"
          }), (0, o.jsx)(_o, {
            value: "bold",
            children: "bold"
          }) ]
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(ko, {
          label: "Minimum contrast ratio",
          defaultValue: r.hintMinimumContrastRatio,
          min: 2.5,
          max: 21,
          step: .5,
          isValid: pn("hintMinimumContrastRatio", r.hintMinimumContrastRatio),
          onChange: e => {
            l("hintMinimumContrastRatio", e);
          },
          onBlur: u,
          children: (0, o.jsx)("p", {
            className: "small show-on-focus",
            children: "Value between 2.5 and 21. Lower values will make hints match the style of the page better while higher values provide improved legibility."
          })
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Ao, {
          label: "Background color",
          defaultValue: r.hintBackgroundColor,
          isValid: pn("hintBackgroundColor", r.hintBackgroundColor),
          onChange: e => {
            l("hintBackgroundColor", e);
          },
          onBlur: u,
          children: (0, o.jsxs)("p", {
            className: "small show-on-focus",
            children: [ "Use a", " ", (0, o.jsx)("a", {
              href: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value",
              target: "_blank",
              rel: "noreferrer",
              children: "CSS color string"
            }), ". Newer color formats like LCH might not be supported. Leaving the field blank lets the color be determined based on the element being hinted." ]
          })
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsxs)(Ao, {
          label: "Font/border color",
          defaultValue: r.hintFontColor,
          isValid: pn("hintFontColor", r.hintFontColor),
          onChange: e => {
            l("hintFontColor", e);
          },
          onBlur: u,
          children: [ !e.hintBackgroundColor && r.hintFontColor && (0, o.jsx)(xo, {
            type: "warning",
            children: "No background color set. This value will be ignored."
          }), (0, o.jsxs)("p", {
            className: "small show-on-focus",
            children: [ "Use a", " ", (0, o.jsx)("a", {
              href: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value",
              target: "_blank",
              rel: "noreferrer",
              children: "CSS color string"
            }), ". Newer color formats like LCH might not be supported. Leaving the field blank lets the color be determined based on the element being hinted and the background color." ]
          }) ]
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsxs)(ko, {
          label: "Background opacity",
          defaultValue: r.hintBackgroundOpacity,
          min: 0,
          max: 1,
          step: .05,
          isValid: pn("hintBackgroundOpacity", r.hintBackgroundOpacity),
          isDisabled: Boolean(e.hintBackgroundColor) && 1 !== new (t(Nt))(e.hintBackgroundColor).alpha(),
          onChange: e => {
            l("hintBackgroundOpacity", e);
          },
          onBlur: u,
          children: [ (0, o.jsx)("p", {
            className: "small show-on-focus",
            children: "Choose a value between 0 (fully transparent) and 1 (fully opaque)."
          }), e.hintBackgroundColor && 1 !== new (t(Nt))(e.hintBackgroundColor).alpha() && (0, 
          o.jsx)("p", {
            className: "small",
            children: "The chosen background color already has an alpha channel. This value will be ignored."
          }) ]
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(ko, {
          label: "Border width (px)",
          defaultValue: r.hintBorderWidth,
          min: 0,
          max: 72,
          isValid: pn("hintBorderWidth", r.hintBorderWidth),
          onChange: e => {
            l("hintBorderWidth", e);
          },
          onBlur: u
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(ko, {
          label: "Border radius (px)",
          defaultValue: r.hintBorderRadius,
          min: 0,
          max: 72,
          isValid: pn("hintBorderRadius", r.hintBorderRadius),
          onChange: e => {
            l("hintBorderRadius", e);
          },
          onBlur: u
        })
      }) ]
    }), (0, o.jsxs)(Pn, {
      label: "Custom Hints",
      children: [ (0, o.jsx)("p", {
        className: "explanation",
        children: "Include or exclude CSS selectors for the corresponding pattern. Patterns are regular expression that will be used to match against the URL of the page."
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Po, {
          value: r.customSelectors,
          onChange: e => {
            l("customSelectors", e);
          }
        })
      }) ]
    }), (0, o.jsx)(Pn, {
      label: "Scroll",
      children: (0, o.jsx)(Co, {
        children: (0, o.jsxs)(So, {
          label: "Scroll behavior",
          name: "scrollBehavior",
          defaultValue: r.scrollBehavior,
          onChange: e => {
            l("scrollBehavior", e);
          },
          children: [ (0, o.jsxs)(_o, {
            value: "auto",
            children: [ "auto", (0, o.jsxs)("p", {
              className: "small",
              children: [ "Follows the", " ", (0, o.jsx)("a", {
                href: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences",
                target: "_blank",
                rel: "noreferrer",
                children: "OS setting for reduced motion."
              }), " " ]
            }) ]
          }), (0, o.jsx)(_o, {
            value: "smooth",
            children: "smooth"
          }), (0, o.jsx)(_o, {
            value: "instant",
            children: "instant"
          }) ]
        })
      })
    }), (0, o.jsxs)(Pn, {
      label: "Notifications",
      children: [ (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Enable notifications",
          isPressed: r.enableNotifications,
          onClick: () => {
            l("enableNotifications", !r.enableNotifications);
          }
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(Tn, {
          label: "Show notification when toggling hints",
          isPressed: r.notifyWhenTogglingHints,
          isDisabled: !r.enableNotifications,
          onClick: () => {
            l("notifyWhenTogglingHints", !r.notifyWhenTogglingHints);
          }
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsxs)(jo, {
          label: "Position",
          defaultValue: r.toastPosition,
          isDisabled: !r.enableNotifications,
          onChange: e => {
            l("toastPosition", e);
          },
          children: [ (0, o.jsx)(Eo, {
            value: "top-left",
            children: "top-left"
          }), (0, o.jsx)(Eo, {
            value: "top-center",
            children: "top-center"
          }), (0, o.jsx)(Eo, {
            value: "top-right",
            children: "top-right"
          }), (0, o.jsx)(Eo, {
            value: "bottom-left",
            children: "bottom-left"
          }), (0, o.jsx)(Eo, {
            value: "bottom-center",
            children: "bottom-center"
          }), (0, o.jsx)(Eo, {
            value: "bottom-right",
            children: "bottom-right"
          }) ]
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsx)(ko, {
          label: "Duration (ms)",
          defaultValue: r.toastDuration,
          isValid: pn("toastDuration", r.toastDuration),
          onChange: e => {
            l("toastDuration", e);
          },
          onBlur: u
        })
      }), (0, o.jsx)(Co, {
        children: (0, o.jsxs)(So, {
          label: "Transition",
          name: "toastTransition",
          defaultValue: r.toastTransition,
          isDisabled: !r.enableNotifications,
          onChange: e => {
            l("toastTransition", e);
          },
          children: [ (0, o.jsx)(_o, {
            value: "bounce",
            children: "bounce"
          }), (0, o.jsx)(_o, {
            value: "slide",
            children: "slide"
          }), (0, o.jsx)(_o, {
            value: "flip",
            children: "flip"
          }), (0, o.jsx)(_o, {
            value: "zoom",
            children: "zoom"
          }) ]
        })
      }) ]
    }) ]
  });
}

var zo;

zo = new URL(i("fomGM").resolve("iWWbt"), import.meta.url).toString();

const Mo = new URL(zo);

function Lo({hasSeenSettingsPage: e}) {
  return (0, o.jsxs)("div", {
    className: "App",
    children: [ (0, o.jsxs)("h1", {
      children: [ (0, o.jsx)("img", {
        className: "rango-logo",
        src: Mo.href,
        alt: ""
      }), "Rango Settings" ]
    }), !e && (0, o.jsxs)(xo, {
      type: "info",
      children: [ "On this page we are unable to display hints. You can use ", (0, o.jsx)("b", {
        children: "tab"
      }), " to navigate through the settings. Use ", (0, o.jsx)("b", {
        children: "space"
      }), " or ", (0, o.jsx)("b", {
        children: "enter"
      }), " to toggle a setting and ", (0, o.jsx)("b", {
        children: "up"
      }), " or ", (0, o.jsx)("b", {
        children: "down"
      }), " to select a different option." ]
    }), (0, o.jsx)(Oo, {}) ]
  });
}

const Ro = s(document.querySelector("#app"));

(async () => {
  const e = await An("hasSeenSettingsPage");
  Ro.render((0, o.jsx)(Lo, {
    hasSeenSettingsPage: e
  })), await wn("hasSeenSettingsPage", !0);
})();