(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
  function n(n2) {
    for (var r2 = arguments.length, t2 = Array(r2 > 1 ? r2 - 1 : 0), e2 = 1; e2 < r2; e2++)
      t2[e2 - 1] = arguments[e2];
    throw Error("[Immer] minified error nr: " + n2 + (t2.length ? " " + t2.map(function(n3) {
      return "'" + n3 + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function r(n2) {
    return !!n2 && !!n2[Q];
  }
  function t(n2) {
    var r2;
    return !!n2 && (function(n3) {
      if (!n3 || "object" != typeof n3)
        return false;
      var r3 = Object.getPrototypeOf(n3);
      if (null === r3)
        return true;
      var t2 = Object.hasOwnProperty.call(r3, "constructor") && r3.constructor;
      return t2 === Object || "function" == typeof t2 && Function.toString.call(t2) === Z;
    }(n2) || Array.isArray(n2) || !!n2[L] || !!(null === (r2 = n2.constructor) || void 0 === r2 ? void 0 : r2[L]) || s(n2) || v(n2));
  }
  function i$1(n2, r2, t2) {
    void 0 === t2 && (t2 = false), 0 === o(n2) ? (t2 ? Object.keys : nn)(n2).forEach(function(e2) {
      t2 && "symbol" == typeof e2 || r2(e2, n2[e2], n2);
    }) : n2.forEach(function(t3, e2) {
      return r2(e2, t3, n2);
    });
  }
  function o(n2) {
    var r2 = n2[Q];
    return r2 ? r2.i > 3 ? r2.i - 4 : r2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
  }
  function u(n2, r2) {
    return 2 === o(n2) ? n2.has(r2) : Object.prototype.hasOwnProperty.call(n2, r2);
  }
  function a(n2, r2) {
    return 2 === o(n2) ? n2.get(r2) : n2[r2];
  }
  function f(n2, r2, t2) {
    var e2 = o(n2);
    2 === e2 ? n2.set(r2, t2) : 3 === e2 ? n2.add(t2) : n2[r2] = t2;
  }
  function c(n2, r2) {
    return n2 === r2 ? 0 !== n2 || 1 / n2 == 1 / r2 : n2 != n2 && r2 != r2;
  }
  function s(n2) {
    return X && n2 instanceof Map;
  }
  function v(n2) {
    return q && n2 instanceof Set;
  }
  function p(n2) {
    return n2.o || n2.t;
  }
  function l(n2) {
    if (Array.isArray(n2))
      return Array.prototype.slice.call(n2);
    var r2 = rn(n2);
    delete r2[Q];
    for (var t2 = nn(r2), e2 = 0; e2 < t2.length; e2++) {
      var i2 = t2[e2], o2 = r2[i2];
      false === o2.writable && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (r2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
    }
    return Object.create(Object.getPrototypeOf(n2), r2);
  }
  function d(n2, e2) {
    return void 0 === e2 && (e2 = false), y(n2) || r(n2) || !t(n2) || (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e2 && i$1(n2, function(n3, r2) {
      return d(r2, true);
    }, true)), n2;
  }
  function h() {
    n(2);
  }
  function y(n2) {
    return null == n2 || "object" != typeof n2 || Object.isFrozen(n2);
  }
  function b(r2) {
    var t2 = tn[r2];
    return t2 || n(18, r2), t2;
  }
  function m(n2, r2) {
    tn[n2] || (tn[n2] = r2);
  }
  function _() {
    return U;
  }
  function j(n2, r2) {
    r2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = r2);
  }
  function g(n2) {
    O(n2), n2.p.forEach(S), n2.p = null;
  }
  function O(n2) {
    n2 === U && (U = n2.l);
  }
  function w(n2) {
    return U = { p: [], l: U, h: n2, m: true, _: 0 };
  }
  function S(n2) {
    var r2 = n2[Q];
    0 === r2.i || 1 === r2.i ? r2.j() : r2.g = true;
  }
  function P(r2, e2) {
    e2._ = e2.p.length;
    var i2 = e2.p[0], o2 = void 0 !== r2 && r2 !== i2;
    return e2.h.O || b("ES5").S(e2, r2, o2), o2 ? (i2[Q].P && (g(e2), n(4)), t(r2) && (r2 = M(e2, r2), e2.l || x(e2, r2)), e2.u && b("Patches").M(i2[Q].t, r2, e2.u, e2.s)) : r2 = M(e2, i2, []), g(e2), e2.u && e2.v(e2.u, e2.s), r2 !== H ? r2 : void 0;
  }
  function M(n2, r2, t2) {
    if (y(r2))
      return r2;
    var e2 = r2[Q];
    if (!e2)
      return i$1(r2, function(i2, o3) {
        return A(n2, e2, r2, i2, o3, t2);
      }, true), r2;
    if (e2.A !== n2)
      return r2;
    if (!e2.P)
      return x(n2, e2.t, true), e2.t;
    if (!e2.I) {
      e2.I = true, e2.A._--;
      var o2 = 4 === e2.i || 5 === e2.i ? e2.o = l(e2.k) : e2.o, u2 = o2, a2 = false;
      3 === e2.i && (u2 = new Set(o2), o2.clear(), a2 = true), i$1(u2, function(r3, i2) {
        return A(n2, e2, o2, r3, i2, t2, a2);
      }), x(n2, o2, false), t2 && n2.u && b("Patches").N(e2, t2, n2.u, n2.s);
    }
    return e2.o;
  }
  function A(e2, i2, o2, a2, c2, s2, v2) {
    if (r(c2)) {
      var p2 = M(e2, c2, s2 && i2 && 3 !== i2.i && !u(i2.R, a2) ? s2.concat(a2) : void 0);
      if (f(o2, a2, p2), !r(p2))
        return;
      e2.m = false;
    } else
      v2 && o2.add(c2);
    if (t(c2) && !y(c2)) {
      if (!e2.h.D && e2._ < 1)
        return;
      M(e2, c2), i2 && i2.A.l || x(e2, c2);
    }
  }
  function x(n2, r2, t2) {
    void 0 === t2 && (t2 = false), !n2.l && n2.h.D && n2.m && d(r2, t2);
  }
  function z(n2, r2) {
    var t2 = n2[Q];
    return (t2 ? p(t2) : n2)[r2];
  }
  function I(n2, r2) {
    if (r2 in n2)
      for (var t2 = Object.getPrototypeOf(n2); t2; ) {
        var e2 = Object.getOwnPropertyDescriptor(t2, r2);
        if (e2)
          return e2;
        t2 = Object.getPrototypeOf(t2);
      }
  }
  function k(n2) {
    n2.P || (n2.P = true, n2.l && k(n2.l));
  }
  function E(n2) {
    n2.o || (n2.o = l(n2.t));
  }
  function N(n2, r2, t2) {
    var e2 = s(r2) ? b("MapSet").F(r2, t2) : v(r2) ? b("MapSet").T(r2, t2) : n2.O ? function(n3, r3) {
      var t3 = Array.isArray(n3), e3 = { i: t3 ? 1 : 0, A: r3 ? r3.A : _(), P: false, I: false, R: {}, l: r3, t: n3, k: null, o: null, j: null, C: false }, i2 = e3, o2 = en;
      t3 && (i2 = [e3], o2 = on);
      var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
      return e3.k = f2, e3.j = a2, f2;
    }(r2, t2) : b("ES5").J(r2, t2);
    return (t2 ? t2.A : _()).p.push(e2), e2;
  }
  function R(e2) {
    return r(e2) || n(22, e2), function n2(r2) {
      if (!t(r2))
        return r2;
      var e3, u2 = r2[Q], c2 = o(r2);
      if (u2) {
        if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
          return u2.t;
        u2.I = true, e3 = D(r2, c2), u2.I = false;
      } else
        e3 = D(r2, c2);
      return i$1(e3, function(r3, t2) {
        u2 && a(u2.t, r3) === t2 || f(e3, r3, n2(t2));
      }), 3 === c2 ? new Set(e3) : e3;
    }(e2);
  }
  function D(n2, r2) {
    switch (r2) {
      case 2:
        return new Map(n2);
      case 3:
        return Array.from(n2);
    }
    return l(n2);
  }
  function F() {
    function t2(n2, r2) {
      var t3 = s2[n2];
      return t3 ? t3.enumerable = r2 : s2[n2] = t3 = { configurable: true, enumerable: r2, get: function() {
        var r3 = this[Q];
        return en.get(r3, n2);
      }, set: function(r3) {
        var t4 = this[Q];
        en.set(t4, n2, r3);
      } }, t3;
    }
    function e2(n2) {
      for (var r2 = n2.length - 1; r2 >= 0; r2--) {
        var t3 = n2[r2][Q];
        if (!t3.P)
          switch (t3.i) {
            case 5:
              a2(t3) && k(t3);
              break;
            case 4:
              o2(t3) && k(t3);
          }
      }
    }
    function o2(n2) {
      for (var r2 = n2.t, t3 = n2.k, e3 = nn(t3), i2 = e3.length - 1; i2 >= 0; i2--) {
        var o3 = e3[i2];
        if (o3 !== Q) {
          var a3 = r2[o3];
          if (void 0 === a3 && !u(r2, o3))
            return true;
          var f3 = t3[o3], s3 = f3 && f3[Q];
          if (s3 ? s3.t !== a3 : !c(f3, a3))
            return true;
        }
      }
      var v2 = !!r2[Q];
      return e3.length !== nn(r2).length + (v2 ? 0 : 1);
    }
    function a2(n2) {
      var r2 = n2.k;
      if (r2.length !== n2.t.length)
        return true;
      var t3 = Object.getOwnPropertyDescriptor(r2, r2.length - 1);
      if (t3 && !t3.get)
        return true;
      for (var e3 = 0; e3 < r2.length; e3++)
        if (!r2.hasOwnProperty(e3))
          return true;
      return false;
    }
    var s2 = {};
    m("ES5", { J: function(n2, r2) {
      var e3 = Array.isArray(n2), i2 = function(n3, r3) {
        if (n3) {
          for (var e4 = Array(r3.length), i3 = 0; i3 < r3.length; i3++)
            Object.defineProperty(e4, "" + i3, t2(i3, true));
          return e4;
        }
        var o4 = rn(r3);
        delete o4[Q];
        for (var u2 = nn(o4), a3 = 0; a3 < u2.length; a3++) {
          var f3 = u2[a3];
          o4[f3] = t2(f3, n3 || !!o4[f3].enumerable);
        }
        return Object.create(Object.getPrototypeOf(r3), o4);
      }(e3, n2), o3 = { i: e3 ? 5 : 4, A: r2 ? r2.A : _(), P: false, I: false, R: {}, l: r2, t: n2, k: i2, o: null, g: false, C: false };
      return Object.defineProperty(i2, Q, { value: o3, writable: true }), i2;
    }, S: function(n2, t3, o3) {
      o3 ? r(t3) && t3[Q].A === n2 && e2(n2.p) : (n2.u && function n3(r2) {
        if (r2 && "object" == typeof r2) {
          var t4 = r2[Q];
          if (t4) {
            var e3 = t4.t, o4 = t4.k, f3 = t4.R, c2 = t4.i;
            if (4 === c2)
              i$1(o4, function(r3) {
                r3 !== Q && (void 0 !== e3[r3] || u(e3, r3) ? f3[r3] || n3(o4[r3]) : (f3[r3] = true, k(t4)));
              }), i$1(e3, function(n4) {
                void 0 !== o4[n4] || u(o4, n4) || (f3[n4] = false, k(t4));
              });
            else if (5 === c2) {
              if (a2(t4) && (k(t4), f3.length = true), o4.length < e3.length)
                for (var s3 = o4.length; s3 < e3.length; s3++)
                  f3[s3] = false;
              else
                for (var v2 = e3.length; v2 < o4.length; v2++)
                  f3[v2] = true;
              for (var p2 = Math.min(o4.length, e3.length), l2 = 0; l2 < p2; l2++)
                o4.hasOwnProperty(l2) || (f3[l2] = true), void 0 === f3[l2] && n3(o4[l2]);
            }
          }
        }
      }(n2.p[0]), e2(n2.p));
    }, K: function(n2) {
      return 4 === n2.i ? o2(n2) : a2(n2);
    } });
  }
  var G, U, W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), X = "undefined" != typeof Map, q = "undefined" != typeof Set, B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G), L = W ? Symbol.for("immer-draftable") : "__$immer_draftable", Q = W ? Symbol.for("immer-state") : "__$immer_state", Z = "" + Object.prototype.constructor, nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n2) {
    return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
  } : Object.getOwnPropertyNames, rn = Object.getOwnPropertyDescriptors || function(n2) {
    var r2 = {};
    return nn(n2).forEach(function(t2) {
      r2[t2] = Object.getOwnPropertyDescriptor(n2, t2);
    }), r2;
  }, tn = {}, en = { get: function(n2, r2) {
    if (r2 === Q)
      return n2;
    var e2 = p(n2);
    if (!u(e2, r2))
      return function(n3, r3, t2) {
        var e3, i3 = I(r3, t2);
        return i3 ? "value" in i3 ? i3.value : null === (e3 = i3.get) || void 0 === e3 ? void 0 : e3.call(n3.k) : void 0;
      }(n2, e2, r2);
    var i2 = e2[r2];
    return n2.I || !t(i2) ? i2 : i2 === z(n2.t, r2) ? (E(n2), n2.o[r2] = N(n2.A.h, i2, n2)) : i2;
  }, has: function(n2, r2) {
    return r2 in p(n2);
  }, ownKeys: function(n2) {
    return Reflect.ownKeys(p(n2));
  }, set: function(n2, r2, t2) {
    var e2 = I(p(n2), r2);
    if (null == e2 ? void 0 : e2.set)
      return e2.set.call(n2.k, t2), true;
    if (!n2.P) {
      var i2 = z(p(n2), r2), o2 = null == i2 ? void 0 : i2[Q];
      if (o2 && o2.t === t2)
        return n2.o[r2] = t2, n2.R[r2] = false, true;
      if (c(t2, i2) && (void 0 !== t2 || u(n2.t, r2)))
        return true;
      E(n2), k(n2);
    }
    return n2.o[r2] === t2 && (void 0 !== t2 || r2 in n2.o) || Number.isNaN(t2) && Number.isNaN(n2.o[r2]) || (n2.o[r2] = t2, n2.R[r2] = true), true;
  }, deleteProperty: function(n2, r2) {
    return void 0 !== z(n2.t, r2) || r2 in n2.t ? (n2.R[r2] = false, E(n2), k(n2)) : delete n2.R[r2], n2.o && delete n2.o[r2], true;
  }, getOwnPropertyDescriptor: function(n2, r2) {
    var t2 = p(n2), e2 = Reflect.getOwnPropertyDescriptor(t2, r2);
    return e2 ? { writable: true, configurable: 1 !== n2.i || "length" !== r2, enumerable: e2.enumerable, value: t2[r2] } : e2;
  }, defineProperty: function() {
    n(11);
  }, getPrototypeOf: function(n2) {
    return Object.getPrototypeOf(n2.t);
  }, setPrototypeOf: function() {
    n(12);
  } }, on = {};
  i$1(en, function(n2, r2) {
    on[n2] = function() {
      return arguments[0] = arguments[0][0], r2.apply(this, arguments);
    };
  }), on.deleteProperty = function(r2, t2) {
    return on.set.call(this, r2, t2, void 0);
  }, on.set = function(r2, t2, e2) {
    return en.set.call(this, r2[0], t2, e2, r2[0]);
  };
  var un = function() {
    function e2(r2) {
      var e3 = this;
      this.O = B, this.D = true, this.produce = function(r3, i3, o2) {
        if ("function" == typeof r3 && "function" != typeof i3) {
          var u2 = i3;
          i3 = r3;
          var a2 = e3;
          return function(n2) {
            var r4 = this;
            void 0 === n2 && (n2 = u2);
            for (var t2 = arguments.length, e4 = Array(t2 > 1 ? t2 - 1 : 0), o3 = 1; o3 < t2; o3++)
              e4[o3 - 1] = arguments[o3];
            return a2.produce(n2, function(n3) {
              var t3;
              return (t3 = i3).call.apply(t3, [r4, n3].concat(e4));
            });
          };
        }
        var f2;
        if ("function" != typeof i3 && n(6), void 0 !== o2 && "function" != typeof o2 && n(7), t(r3)) {
          var c2 = w(e3), s2 = N(e3, r3, void 0), v2 = true;
          try {
            f2 = i3(s2), v2 = false;
          } finally {
            v2 ? g(c2) : O(c2);
          }
          return "undefined" != typeof Promise && f2 instanceof Promise ? f2.then(function(n2) {
            return j(c2, o2), P(n2, c2);
          }, function(n2) {
            throw g(c2), n2;
          }) : (j(c2, o2), P(f2, c2));
        }
        if (!r3 || "object" != typeof r3) {
          if (void 0 === (f2 = i3(r3)) && (f2 = r3), f2 === H && (f2 = void 0), e3.D && d(f2, true), o2) {
            var p2 = [], l2 = [];
            b("Patches").M(r3, f2, p2, l2), o2(p2, l2);
          }
          return f2;
        }
        n(21, r3);
      }, this.produceWithPatches = function(n2, r3) {
        if ("function" == typeof n2)
          return function(r4) {
            for (var t3 = arguments.length, i4 = Array(t3 > 1 ? t3 - 1 : 0), o3 = 1; o3 < t3; o3++)
              i4[o3 - 1] = arguments[o3];
            return e3.produceWithPatches(r4, function(r5) {
              return n2.apply(void 0, [r5].concat(i4));
            });
          };
        var t2, i3, o2 = e3.produce(n2, r3, function(n3, r4) {
          t2 = n3, i3 = r4;
        });
        return "undefined" != typeof Promise && o2 instanceof Promise ? o2.then(function(n3) {
          return [n3, t2, i3];
        }) : [o2, t2, i3];
      }, "boolean" == typeof (null == r2 ? void 0 : r2.useProxies) && this.setUseProxies(r2.useProxies), "boolean" == typeof (null == r2 ? void 0 : r2.autoFreeze) && this.setAutoFreeze(r2.autoFreeze);
    }
    var i2 = e2.prototype;
    return i2.createDraft = function(e3) {
      t(e3) || n(8), r(e3) && (e3 = R(e3));
      var i3 = w(this), o2 = N(this, e3, void 0);
      return o2[Q].C = true, O(i3), o2;
    }, i2.finishDraft = function(r2, t2) {
      var e3 = r2 && r2[Q];
      var i3 = e3.A;
      return j(i3, t2), P(void 0, i3);
    }, i2.setAutoFreeze = function(n2) {
      this.D = n2;
    }, i2.setUseProxies = function(r2) {
      r2 && !B && n(20), this.O = r2;
    }, i2.applyPatches = function(n2, t2) {
      var e3;
      for (e3 = t2.length - 1; e3 >= 0; e3--) {
        var i3 = t2[e3];
        if (0 === i3.path.length && "replace" === i3.op) {
          n2 = i3.value;
          break;
        }
      }
      e3 > -1 && (t2 = t2.slice(e3 + 1));
      var o2 = b("Patches").$;
      return r(n2) ? o2(n2, t2) : this.produce(n2, function(n3) {
        return o2(n3, t2);
      });
    }, e2;
  }(), an = new un(), fn = an.produce;
  an.produceWithPatches.bind(an);
  an.setAutoFreeze.bind(an);
  an.setUseProxies.bind(an);
  an.applyPatches.bind(an);
  an.createDraft.bind(an);
  an.finishDraft.bind(an);
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  function _defineProperty$1(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = null != arguments[i2] ? arguments[i2] : {};
      i2 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty$1(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function formatProdErrorMessage(code) {
    return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or use the non-minified dev environment for full errors. ";
  }
  var $$observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();
  var randomString = function randomString2() {
    return Math.random().toString(36).substring(7).split("").join(".");
  };
  var ActionTypes = {
    INIT: "@@redux/INIT" + randomString(),
    REPLACE: "@@redux/REPLACE" + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
      return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
    }
  };
  function isPlainObject$1(obj) {
    if (typeof obj !== "object" || obj === null)
      return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
  }
  function createStore$1(reducer, preloadedState, enhancer) {
    var _ref2;
    if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
      throw new Error(formatProdErrorMessage(0));
    }
    if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
      enhancer = preloadedState;
      preloadedState = void 0;
    }
    if (typeof enhancer !== "undefined") {
      if (typeof enhancer !== "function") {
        throw new Error(formatProdErrorMessage(1));
      }
      return enhancer(createStore$1)(reducer, preloadedState);
    }
    if (typeof reducer !== "function") {
      throw new Error(formatProdErrorMessage(2));
    }
    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    function getState2() {
      if (isDispatching) {
        throw new Error(formatProdErrorMessage(3));
      }
      return currentState;
    }
    function subscribe(listener) {
      if (typeof listener !== "function") {
        throw new Error(formatProdErrorMessage(4));
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage(5));
      }
      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }
        if (isDispatching) {
          throw new Error(formatProdErrorMessage(6));
        }
        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
        currentListeners = null;
      };
    }
    function dispatch(action) {
      if (!isPlainObject$1(action)) {
        throw new Error(formatProdErrorMessage(7));
      }
      if (typeof action.type === "undefined") {
        throw new Error(formatProdErrorMessage(8));
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage(9));
      }
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
      var listeners = currentListeners = nextListeners;
      for (var i2 = 0; i2 < listeners.length; i2++) {
        var listener = listeners[i2];
        listener();
      }
      return action;
    }
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== "function") {
        throw new Error(formatProdErrorMessage(10));
      }
      currentReducer = nextReducer;
      dispatch({
        type: ActionTypes.REPLACE
      });
    }
    function observable2() {
      var _ref;
      var outerSubscribe = subscribe;
      return _ref = {
        /**
         * The minimal observable subscription method.
         * @param {Object} observer Any object that can be used as an observer.
         * The observer object should have a `next` method.
         * @returns {subscription} An object with an `unsubscribe` method that can
         * be used to unsubscribe the observable from the store, and prevent further
         * emission of values from the observable.
         */
        subscribe: function subscribe2(observer) {
          if (typeof observer !== "object" || observer === null) {
            throw new Error(formatProdErrorMessage(11));
          }
          function observeState() {
            if (observer.next) {
              observer.next(getState2());
            }
          }
          observeState();
          var unsubscribe = outerSubscribe(observeState);
          return {
            unsubscribe
          };
        }
      }, _ref[$$observable] = function() {
        return this;
      }, _ref;
    }
    dispatch({
      type: ActionTypes.INIT
    });
    return _ref2 = {
      dispatch,
      subscribe,
      getState: getState2,
      replaceReducer
    }, _ref2[$$observable] = observable2, _ref2;
  }
  function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function(key) {
      var reducer = reducers[key];
      var initialState = reducer(void 0, {
        type: ActionTypes.INIT
      });
      if (typeof initialState === "undefined") {
        throw new Error(formatProdErrorMessage(12));
      }
      if (typeof reducer(void 0, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION()
      }) === "undefined") {
        throw new Error(formatProdErrorMessage(13));
      }
    });
  }
  function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i2 = 0; i2 < reducerKeys.length; i2++) {
      var key = reducerKeys[i2];
      if (typeof reducers[key] === "function") {
        finalReducers[key] = reducers[key];
      }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    var shapeAssertionError;
    try {
      assertReducerShape(finalReducers);
    } catch (e) {
      shapeAssertionError = e;
    }
    return function combination(state, action) {
      if (state === void 0) {
        state = {};
      }
      if (shapeAssertionError) {
        throw shapeAssertionError;
      }
      var hasChanged = false;
      var nextState = {};
      for (var _i = 0; _i < finalReducerKeys.length; _i++) {
        var _key = finalReducerKeys[_i];
        var reducer = finalReducers[_key];
        var previousStateForKey = state[_key];
        var nextStateForKey = reducer(previousStateForKey, action);
        if (typeof nextStateForKey === "undefined") {
          action && action.type;
          throw new Error(formatProdErrorMessage(14));
        }
        nextState[_key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
      hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state;
    };
  }
  function compose$1() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function(arg) {
        return arg;
      };
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce(function(a2, b2) {
      return function() {
        return a2(b2.apply(void 0, arguments));
      };
    });
  }
  function applyMiddleware$2() {
    for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
    return function(createStore2) {
      return function() {
        var store = createStore2.apply(void 0, arguments);
        var _dispatch = function dispatch() {
          throw new Error(formatProdErrorMessage(15));
        };
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatch() {
            return _dispatch.apply(void 0, arguments);
          }
        };
        var chain = middlewares.map(function(middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = compose$1.apply(void 0, chain)(store.dispatch);
        return _objectSpread2(_objectSpread2({}, store), {}, {
          dispatch: _dispatch
        });
      };
    };
  }
  function createThunkMiddleware(extraArgument) {
    var middleware = function middleware2(_ref) {
      var dispatch = _ref.dispatch, getState2 = _ref.getState;
      return function(next) {
        return function(action) {
          if (typeof action === "function") {
            return action(dispatch, getState2, extraArgument);
          }
          return next(action);
        };
      };
    };
    return middleware;
  }
  var thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  var __extends$1 = /* @__PURE__ */ function() {
    var extendStatics2 = function(d2, b2) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d22, b22) {
        d22.__proto__ = b22;
      } || function(d22, b22) {
        for (var p2 in b22)
          if (Object.prototype.hasOwnProperty.call(b22, p2))
            d22[p2] = b22[p2];
      };
      return extendStatics2(d2, b2);
    };
    return function(d2, b2) {
      if (typeof b2 !== "function" && b2 !== null)
        throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
      extendStatics2(d2, b2);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
    };
  }();
  var __generator$1 = function(thisArg, body) {
    var _2 = { label: 0, sent: function() {
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y2, t2, g2;
    return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
      return this;
    }), g2;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_2)
        try {
          if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
            return t2;
          if (y2 = 0, t2)
            op = [op[0] & 2, t2.value];
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op;
              break;
            case 4:
              _2.label++;
              return { value: op[1], done: false };
            case 5:
              _2.label++;
              y2 = op[1];
              op = [0];
              continue;
            case 7:
              op = _2.ops.pop();
              _2.trys.pop();
              continue;
            default:
              if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0;
                continue;
              }
              if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                _2.label = op[1];
                break;
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1];
                t2 = op;
                break;
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2];
                _2.ops.push(op);
                break;
              }
              if (t2[2])
                _2.ops.pop();
              _2.trys.pop();
              continue;
          }
          op = body.call(thisArg, _2);
        } catch (e) {
          op = [6, e];
          y2 = 0;
        } finally {
          f2 = t2 = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var __spreadArray$1 = function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = function(obj, key, value) {
    return key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  };
  var __spreadValues = function(a2, b2) {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var _i = 0, _c = __getOwnPropSymbols(b2); _i < _c.length; _i++) {
        var prop = _c[_i];
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a2, prop, b2[prop]);
      }
    return a2;
  };
  var __spreadProps = function(a2, b2) {
    return __defProps(a2, __getOwnPropDescs(b2));
  };
  var __async = function(__this, __arguments, generator) {
    return new Promise(function(resolve, reject) {
      var fulfilled = function(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = function(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = function(x2) {
        return x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      };
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length === 0)
      return void 0;
    if (typeof arguments[0] === "object")
      return compose$1;
    return compose$1.apply(null, arguments);
  };
  function isPlainObject(value) {
    if (typeof value !== "object" || value === null)
      return false;
    var proto = Object.getPrototypeOf(value);
    if (proto === null)
      return true;
    var baseProto = proto;
    while (Object.getPrototypeOf(baseProto) !== null) {
      baseProto = Object.getPrototypeOf(baseProto);
    }
    return proto === baseProto;
  }
  var MiddlewareArray = (
    /** @class */
    function(_super) {
      __extends$1(MiddlewareArray2, _super);
      function MiddlewareArray2() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        Object.setPrototypeOf(_this, MiddlewareArray2.prototype);
        return _this;
      }
      Object.defineProperty(MiddlewareArray2, Symbol.species, {
        get: function() {
          return MiddlewareArray2;
        },
        enumerable: false,
        configurable: true
      });
      MiddlewareArray2.prototype.concat = function() {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          arr[_i] = arguments[_i];
        }
        return _super.prototype.concat.apply(this, arr);
      };
      MiddlewareArray2.prototype.prepend = function() {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          arr[_i] = arguments[_i];
        }
        if (arr.length === 1 && Array.isArray(arr[0])) {
          return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray$1([void 0], arr[0].concat(this))))();
        }
        return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray$1([void 0], arr.concat(this))))();
      };
      return MiddlewareArray2;
    }(Array)
  );
  function freezeDraftable(val) {
    return t(val) ? fn(val, function() {
    }) : val;
  }
  function isBoolean(x2) {
    return typeof x2 === "boolean";
  }
  function curryGetDefaultMiddleware() {
    return function curriedGetDefaultMiddleware(options) {
      return getDefaultMiddleware(options);
    };
  }
  function getDefaultMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    var _c = options.thunk, thunk$1 = _c === void 0 ? true : _c;
    options.immutableCheck;
    options.serializableCheck;
    var middlewareArray = new MiddlewareArray();
    if (thunk$1) {
      if (isBoolean(thunk$1)) {
        middlewareArray.push(thunk);
      } else {
        middlewareArray.push(thunk.withExtraArgument(thunk$1.extraArgument));
      }
    }
    return middlewareArray;
  }
  var IS_PRODUCTION = true;
  function configureStore(options) {
    var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
    var _c = options || {}, _d = _c.reducer, reducer = _d === void 0 ? void 0 : _d, _e = _c.middleware, middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e, _f = _c.devTools, devTools = _f === void 0 ? true : _f, _g = _c.preloadedState, preloadedState = _g === void 0 ? void 0 : _g, _h = _c.enhancers, enhancers = _h === void 0 ? void 0 : _h;
    var rootReducer2;
    if (typeof reducer === "function") {
      rootReducer2 = reducer;
    } else if (isPlainObject(reducer)) {
      rootReducer2 = combineReducers(reducer);
    } else {
      throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    }
    var finalMiddleware = middleware;
    if (typeof finalMiddleware === "function") {
      finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
    }
    var middlewareEnhancer = applyMiddleware$2.apply(void 0, finalMiddleware);
    var finalCompose = compose$1;
    if (devTools) {
      finalCompose = composeWithDevTools(__spreadValues({
        trace: !IS_PRODUCTION
      }, typeof devTools === "object" && devTools));
    }
    var storeEnhancers = [middlewareEnhancer];
    if (Array.isArray(enhancers)) {
      storeEnhancers = __spreadArray$1([middlewareEnhancer], enhancers);
    } else if (typeof enhancers === "function") {
      storeEnhancers = enhancers(storeEnhancers);
    }
    var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
    return createStore$1(rootReducer2, preloadedState, composedEnhancer);
  }
  function createAction(type, prepareAction) {
    function actionCreator() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (prepareAction) {
        var prepared = prepareAction.apply(void 0, args);
        if (!prepared) {
          throw new Error("prepareAction did not return an object");
        }
        return __spreadValues(__spreadValues({
          type,
          payload: prepared.payload
        }, "meta" in prepared && { meta: prepared.meta }), "error" in prepared && { error: prepared.error });
      }
      return { type, payload: args[0] };
    }
    actionCreator.toString = function() {
      return "" + type;
    };
    actionCreator.type = type;
    actionCreator.match = function(action) {
      return action.type === type;
    };
    return actionCreator;
  }
  function executeReducerBuilderCallback(builderCallback) {
    var actionsMap = {};
    var actionMatchers = [];
    var defaultCaseReducer;
    var builder = {
      addCase: function(typeOrActionCreator, reducer) {
        var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (type in actionsMap) {
          throw new Error("addCase cannot be called with two reducers for the same action type");
        }
        actionsMap[type] = reducer;
        return builder;
      },
      addMatcher: function(matcher, reducer) {
        actionMatchers.push({ matcher, reducer });
        return builder;
      },
      addDefaultCase: function(reducer) {
        defaultCaseReducer = reducer;
        return builder;
      }
    };
    builderCallback(builder);
    return [actionsMap, actionMatchers, defaultCaseReducer];
  }
  function isStateFunction(x2) {
    return typeof x2 === "function";
  }
  function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
    if (actionMatchers === void 0) {
      actionMatchers = [];
    }
    var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _c[0], finalActionMatchers = _c[1], finalDefaultCaseReducer = _c[2];
    var getInitialState;
    if (isStateFunction(initialState)) {
      getInitialState = function() {
        return freezeDraftable(initialState());
      };
    } else {
      var frozenInitialState_1 = freezeDraftable(initialState);
      getInitialState = function() {
        return frozenInitialState_1;
      };
    }
    function reducer(state, action) {
      if (state === void 0) {
        state = getInitialState();
      }
      var caseReducers = __spreadArray$1([
        actionsMap[action.type]
      ], finalActionMatchers.filter(function(_c2) {
        var matcher = _c2.matcher;
        return matcher(action);
      }).map(function(_c2) {
        var reducer2 = _c2.reducer;
        return reducer2;
      }));
      if (caseReducers.filter(function(cr) {
        return !!cr;
      }).length === 0) {
        caseReducers = [finalDefaultCaseReducer];
      }
      return caseReducers.reduce(function(previousState, caseReducer) {
        if (caseReducer) {
          if (r(previousState)) {
            var draft = previousState;
            var result = caseReducer(draft, action);
            if (result === void 0) {
              return previousState;
            }
            return result;
          } else if (!t(previousState)) {
            var result = caseReducer(previousState, action);
            if (result === void 0) {
              if (previousState === null) {
                return previousState;
              }
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return result;
          } else {
            return fn(previousState, function(draft2) {
              return caseReducer(draft2, action);
            });
          }
        }
        return previousState;
      }, state);
    }
    reducer.getInitialState = getInitialState;
    return reducer;
  }
  function getType2(slice, actionKey) {
    return slice + "/" + actionKey;
  }
  function createSlice(options) {
    var name = options.name;
    if (!name) {
      throw new Error("`name` is a required option for createSlice");
    }
    if (typeof process !== "undefined" && false) {
      if (options.initialState === void 0) {
        console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
      }
    }
    var initialState = typeof options.initialState == "function" ? options.initialState : freezeDraftable(options.initialState);
    var reducers = options.reducers || {};
    var reducerNames = Object.keys(reducers);
    var sliceCaseReducersByName = {};
    var sliceCaseReducersByType = {};
    var actionCreators = {};
    reducerNames.forEach(function(reducerName) {
      var maybeReducerWithPrepare = reducers[reducerName];
      var type = getType2(name, reducerName);
      var caseReducer;
      var prepareCallback;
      if ("reducer" in maybeReducerWithPrepare) {
        caseReducer = maybeReducerWithPrepare.reducer;
        prepareCallback = maybeReducerWithPrepare.prepare;
      } else {
        caseReducer = maybeReducerWithPrepare;
      }
      sliceCaseReducersByName[reducerName] = caseReducer;
      sliceCaseReducersByType[type] = caseReducer;
      actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
    });
    function buildReducer() {
      var _c = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _d = _c[0], extraReducers = _d === void 0 ? {} : _d, _e = _c[1], actionMatchers = _e === void 0 ? [] : _e, _f = _c[2], defaultCaseReducer = _f === void 0 ? void 0 : _f;
      var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);
      return createReducer(initialState, function(builder) {
        for (var key in finalCaseReducers) {
          builder.addCase(key, finalCaseReducers[key]);
        }
        for (var _i = 0, actionMatchers_1 = actionMatchers; _i < actionMatchers_1.length; _i++) {
          var m2 = actionMatchers_1[_i];
          builder.addMatcher(m2.matcher, m2.reducer);
        }
        if (defaultCaseReducer) {
          builder.addDefaultCase(defaultCaseReducer);
        }
      });
    }
    var _reducer;
    return {
      name,
      reducer: function(state, action) {
        if (!_reducer)
          _reducer = buildReducer();
        return _reducer(state, action);
      },
      actions: actionCreators,
      caseReducers: sliceCaseReducersByName,
      getInitialState: function() {
        if (!_reducer)
          _reducer = buildReducer();
        return _reducer.getInitialState();
      }
    };
  }
  var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
  var nanoid = function(size) {
    if (size === void 0) {
      size = 21;
    }
    var id = "";
    var i2 = size;
    while (i2--) {
      id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
  };
  var commonProperties = [
    "name",
    "message",
    "stack",
    "code"
  ];
  var RejectWithValue = (
    /** @class */
    /* @__PURE__ */ function() {
      function RejectWithValue2(payload, meta) {
        this.payload = payload;
        this.meta = meta;
      }
      return RejectWithValue2;
    }()
  );
  var FulfillWithMeta = (
    /** @class */
    /* @__PURE__ */ function() {
      function FulfillWithMeta2(payload, meta) {
        this.payload = payload;
        this.meta = meta;
      }
      return FulfillWithMeta2;
    }()
  );
  var miniSerializeError = function(value) {
    if (typeof value === "object" && value !== null) {
      var simpleError = {};
      for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
        var property = commonProperties_1[_i];
        if (typeof value[property] === "string") {
          simpleError[property] = value[property];
        }
      }
      return simpleError;
    }
    return { message: String(value) };
  };
  (function() {
    function createAsyncThunk2(typePrefix, payloadCreator, options) {
      var fulfilled = createAction(typePrefix + "/fulfilled", function(payload, requestId, arg, meta) {
        return {
          payload,
          meta: __spreadProps(__spreadValues({}, meta || {}), {
            arg,
            requestId,
            requestStatus: "fulfilled"
          })
        };
      });
      var pending = createAction(typePrefix + "/pending", function(requestId, arg, meta) {
        return {
          payload: void 0,
          meta: __spreadProps(__spreadValues({}, meta || {}), {
            arg,
            requestId,
            requestStatus: "pending"
          })
        };
      });
      var rejected = createAction(typePrefix + "/rejected", function(error, requestId, arg, payload, meta) {
        return {
          payload,
          error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
          meta: __spreadProps(__spreadValues({}, meta || {}), {
            arg,
            requestId,
            rejectedWithValue: !!payload,
            requestStatus: "rejected",
            aborted: (error == null ? void 0 : error.name) === "AbortError",
            condition: (error == null ? void 0 : error.name) === "ConditionError"
          })
        };
      });
      var AC = typeof AbortController !== "undefined" ? AbortController : (
        /** @class */
        function() {
          function class_1() {
            this.signal = {
              aborted: false,
              addEventListener: function() {
              },
              dispatchEvent: function() {
                return false;
              },
              onabort: function() {
              },
              removeEventListener: function() {
              },
              reason: void 0,
              throwIfAborted: function() {
              }
            };
          }
          class_1.prototype.abort = function() {
          };
          return class_1;
        }()
      );
      function actionCreator(arg) {
        return function(dispatch, getState2, extra) {
          var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
          var abortController = new AC();
          var abortReason;
          function abort(reason) {
            abortReason = reason;
            abortController.abort();
          }
          var promise2 = function() {
            return __async(this, null, function() {
              var _a, _b, finalAction, conditionResult, abortedPromise, err_1, skipDispatch;
              return __generator$1(this, function(_c) {
                switch (_c.label) {
                  case 0:
                    _c.trys.push([0, 4, , 5]);
                    conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, { getState: getState2, extra });
                    if (!isThenable(conditionResult))
                      return [3, 2];
                    return [4, conditionResult];
                  case 1:
                    conditionResult = _c.sent();
                    _c.label = 2;
                  case 2:
                    if (conditionResult === false || abortController.signal.aborted) {
                      throw {
                        name: "ConditionError",
                        message: "Aborted due to condition callback returning false."
                      };
                    }
                    abortedPromise = new Promise(function(_2, reject) {
                      return abortController.signal.addEventListener("abort", function() {
                        return reject({
                          name: "AbortError",
                          message: abortReason || "Aborted"
                        });
                      });
                    });
                    dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, { requestId, arg }, { getState: getState2, extra })));
                    return [4, Promise.race([
                      abortedPromise,
                      Promise.resolve(payloadCreator(arg, {
                        dispatch,
                        getState: getState2,
                        extra,
                        requestId,
                        signal: abortController.signal,
                        abort,
                        rejectWithValue: function(value, meta) {
                          return new RejectWithValue(value, meta);
                        },
                        fulfillWithValue: function(value, meta) {
                          return new FulfillWithMeta(value, meta);
                        }
                      })).then(function(result) {
                        if (result instanceof RejectWithValue) {
                          throw result;
                        }
                        if (result instanceof FulfillWithMeta) {
                          return fulfilled(result.payload, requestId, arg, result.meta);
                        }
                        return fulfilled(result, requestId, arg);
                      })
                    ])];
                  case 3:
                    finalAction = _c.sent();
                    return [3, 5];
                  case 4:
                    err_1 = _c.sent();
                    finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                    return [3, 5];
                  case 5:
                    skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                    if (!skipDispatch) {
                      dispatch(finalAction);
                    }
                    return [2, finalAction];
                }
              });
            });
          }();
          return Object.assign(promise2, {
            abort,
            requestId,
            arg,
            unwrap: function() {
              return promise2.then(unwrapResult);
            }
          });
        };
      }
      return Object.assign(actionCreator, {
        pending,
        rejected,
        fulfilled,
        typePrefix
      });
    }
    createAsyncThunk2.withTypes = function() {
      return createAsyncThunk2;
    };
    return createAsyncThunk2;
  })();
  function unwrapResult(action) {
    if (action.meta && action.meta.rejectedWithValue) {
      throw action.payload;
    }
    if (action.error) {
      throw action.error;
    }
    return action.payload;
  }
  function isThenable(value) {
    return value !== null && typeof value === "object" && typeof value.then === "function";
  }
  var alm = "listenerMiddleware";
  createAction(alm + "/add");
  createAction(alm + "/removeAll");
  createAction(alm + "/remove");
  var promise;
  typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : globalThis) : function(cb) {
    return (promise || (promise = Promise.resolve())).then(cb).catch(function(err) {
      return setTimeout(function() {
        throw err;
      }, 0);
    });
  };
  F();
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
  
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
  
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  function __extends(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  }
  function __awaiter(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _2 = { label: 0, sent: function() {
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y2, t2, g2;
    return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
      return this;
    }), g2;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_2)
        try {
          if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
            return t2;
          if (y2 = 0, t2)
            op = [op[0] & 2, t2.value];
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op;
              break;
            case 4:
              _2.label++;
              return { value: op[1], done: false };
            case 5:
              _2.label++;
              y2 = op[1];
              op = [0];
              continue;
            case 7:
              op = _2.ops.pop();
              _2.trys.pop();
              continue;
            default:
              if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0;
                continue;
              }
              if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                _2.label = op[1];
                break;
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1];
                t2 = op;
                break;
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2];
                _2.ops.push(op);
                break;
              }
              if (t2[2])
                _2.ops.pop();
              _2.trys.pop();
              continue;
          }
          op = body.call(thisArg, _2);
        } catch (e) {
          op = [6, e];
          y2 = 0;
        } finally {
          f2 = t2 = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m2 = s2 && o2[s2], i2 = 0;
    if (m2)
      return m2.call(o2);
    if (o2 && typeof o2.length === "number")
      return {
        next: function() {
          if (o2 && i2 >= o2.length)
            o2 = void 0;
          return { value: o2 && o2[i2++], done: !o2 };
        }
      };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o2, n2) {
    var m2 = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m2)
      return o2;
    var i2 = m2.call(o2), r2, ar = [], e;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done)
        ar.push(r2.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m2 = i2["return"]))
          m2.call(i2);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  }
  function __await(v2) {
    return this instanceof __await ? (this.v = v2, this) : new __await(v2);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g2 = generator.apply(thisArg, _arguments || []), i2, q2 = [];
    return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
      return this;
    }, i2;
    function verb(n2) {
      if (g2[n2])
        i2[n2] = function(v2) {
          return new Promise(function(a2, b2) {
            q2.push([n2, v2, a2, b2]) > 1 || resume(n2, v2);
          });
        };
    }
    function resume(n2, v2) {
      try {
        step(g2[n2](v2));
      } catch (e) {
        settle(q2[0][3], e);
      }
    }
    function step(r2) {
      r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q2[0][2], r2);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f2, v2) {
      if (f2(v2), q2.shift(), q2.length)
        resume(q2[0][0], q2[0][1]);
    }
  }
  function __asyncValues(o2) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m2 = o2[Symbol.asyncIterator], i2;
    return m2 ? m2.call(o2) : (o2 = typeof __values === "function" ? __values(o2) : o2[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
      return this;
    }, i2);
    function verb(n2) {
      i2[n2] = o2[n2] && function(v2) {
        return new Promise(function(resolve, reject) {
          v2 = o2[n2](v2), settle(resolve, reject, v2.done, v2.value);
        });
      };
    }
    function settle(resolve, reject, d2, v2) {
      Promise.resolve(v2).then(function(v3) {
        resolve({ value: v3, done: d2 });
      }, reject);
    }
  }
  function isFunction$1(value) {
    return typeof value === "function";
  }
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i2) {
        return i2 + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }
  var Subscription = function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction$1(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = function() {
      var empty = new Subscription2();
      empty.closed = true;
      return empty;
    }();
    return Subscription2;
  }();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction$1(value.remove) && isFunction$1(value.add) && isFunction$1(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction$1(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      {
        throw err;
      }
    });
  }
  function noop$1() {
  }
  function errorContext(cb) {
    {
      cb();
    }
  }
  var Subscriber = function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped)
        ;
      else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped)
        ;
      else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped)
        ;
      else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn2, thisArg) {
    return _bind.call(fn2, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction$1(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function handleUnhandledError(error) {
    {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop$1,
    error: defaultErrorHandler,
    complete: noop$1
  };
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();
  function identity(x2) {
    return x2;
  }
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn2) {
        return fn2(prev);
      }, input);
    };
  }
  var Observable = function() {
    function Observable2(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable2.prototype.lift = function(operator) {
      var observable2 = new Observable2();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable2.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable2.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable2.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable2.prototype[observable] = function() {
      return this;
    };
    Observable2.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable2.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x2) {
          return value = x2;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable2.create = function(subscribe) {
      return new Observable2(subscribe);
    };
    return Observable2;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction$1(value.next) && isFunction$1(value.error) && isFunction$1(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }
  function hasLift(source) {
    return isFunction$1(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber2.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber2;
  }(Subscriber);
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });
  var Subject = function(_super) {
    __extends(Subject2, _super);
    function Subject2() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject2.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject2.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject2.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
      });
    };
    Subject2.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject2.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject2.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject2.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject2.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject2.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    };
    Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject2.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject2.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject2;
  }(Observable);
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject2, _super);
    function AnonymousSubject2(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject2.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject2;
  }(Subject);
  var BehaviorSubject = function(_super) {
    __extends(BehaviorSubject2, _super);
    function BehaviorSubject2(_value) {
      var _this = _super.call(this) || this;
      _this._value = _value;
      return _this;
    }
    Object.defineProperty(BehaviorSubject2.prototype, "value", {
      get: function() {
        return this.getValue();
      },
      enumerable: false,
      configurable: true
    });
    BehaviorSubject2.prototype._subscribe = function(subscriber) {
      var subscription = _super.prototype._subscribe.call(this, subscriber);
      !subscription.closed && subscriber.next(this._value);
      return subscription;
    };
    BehaviorSubject2.prototype.getValue = function() {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
      if (hasError) {
        throw thrownError;
      }
      this._throwIfClosed();
      return _value;
    };
    BehaviorSubject2.prototype.next = function(value) {
      _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject2;
  }(Subject);
  var dateTimestampProvider = {
    now: function() {
      return Date.now();
    },
    delegate: void 0
  };
  var Action = function(_super) {
    __extends(Action2, _super);
    function Action2(scheduler, work) {
      return _super.call(this) || this;
    }
    Action2.prototype.schedule = function(state, delay) {
      return this;
    };
    return Action2;
  }(Subscription);
  var intervalProvider = {
    setInterval: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearInterval: function(handle) {
      return clearInterval(handle);
    },
    delegate: void 0
  };
  var AsyncAction = function(_super) {
    __extends(AsyncAction2, _super);
    function AsyncAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      _this.pending = false;
      return _this;
    }
    AsyncAction2.prototype.schedule = function(state, delay) {
      var _a;
      if (delay === void 0) {
        delay = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = state;
      var id = this.id;
      var scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }
      this.pending = true;
      this.delay = delay;
      this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
      return this;
    };
    AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay != null && this.delay === delay && this.pending === false) {
        return id;
      }
      if (id != null) {
        intervalProvider.clearInterval(id);
      }
      return void 0;
    };
    AsyncAction2.prototype.execute = function(state, delay) {
      if (this.closed) {
        return new Error("executing a cancelled action");
      }
      this.pending = false;
      var error = this._execute(state, delay);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    AsyncAction2.prototype._execute = function(state, _delay) {
      var errored = false;
      var errorValue;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = e ? e : new Error("Scheduled action threw falsy error");
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };
    AsyncAction2.prototype.unsubscribe = function() {
      if (!this.closed) {
        var _a = this, id = _a.id, scheduler = _a.scheduler;
        var actions = scheduler.actions;
        this.work = this.state = this.scheduler = null;
        this.pending = false;
        arrRemove(actions, this);
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
        _super.prototype.unsubscribe.call(this);
      }
    };
    return AsyncAction2;
  }(Action);
  var Scheduler = function() {
    function Scheduler2(schedulerActionCtor, now) {
      if (now === void 0) {
        now = Scheduler2.now;
      }
      this.schedulerActionCtor = schedulerActionCtor;
      this.now = now;
    }
    Scheduler2.prototype.schedule = function(work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }
      return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler2.now = dateTimestampProvider.now;
    return Scheduler2;
  }();
  var AsyncScheduler = function(_super) {
    __extends(AsyncScheduler2, _super);
    function AsyncScheduler2(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler.now;
      }
      var _this = _super.call(this, SchedulerAction, now) || this;
      _this.actions = [];
      _this._active = false;
      return _this;
    }
    AsyncScheduler2.prototype.flush = function(action) {
      var actions = this.actions;
      if (this._active) {
        actions.push(action);
        return;
      }
      var error;
      this._active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this._active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsyncScheduler2;
  }(Scheduler);
  var QueueAction = function(_super) {
    __extends(QueueAction2, _super);
    function QueueAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      return _this;
    }
    QueueAction2.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay > 0) {
        return _super.prototype.schedule.call(this, state, delay);
      }
      this.delay = delay;
      this.state = state;
      this.scheduler.flush(this);
      return this;
    };
    QueueAction2.prototype.execute = function(state, delay) {
      return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
    };
    QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay != null && delay > 0 || delay == null && this.delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
      }
      scheduler.flush(this);
      return 0;
    };
    return QueueAction2;
  }(AsyncAction);
  var QueueScheduler = function(_super) {
    __extends(QueueScheduler2, _super);
    function QueueScheduler2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler2;
  }(AsyncScheduler);
  var queueScheduler = new QueueScheduler(QueueAction);
  var EMPTY = new Observable(function(subscriber) {
    return subscriber.complete();
  });
  function isScheduler(value) {
    return value && isFunction$1(value.schedule);
  }
  function last(arr) {
    return arr[arr.length - 1];
  }
  function popScheduler(args) {
    return isScheduler(last(args)) ? args.pop() : void 0;
  }
  function popNumber(args, defaultValue) {
    return typeof last(args) === "number" ? args.pop() : defaultValue;
  }
  var isArrayLike$1 = function(x2) {
    return x2 && typeof x2.length === "number" && typeof x2 !== "function";
  };
  function isPromise(value) {
    return isFunction$1(value === null || value === void 0 ? void 0 : value.then);
  }
  function isInteropObservable(input) {
    return isFunction$1(input[observable]);
  }
  function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction$1(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator = getSymbolIterator();
  function isIterable(input) {
    return isFunction$1(input === null || input === void 0 ? void 0 : input[iterator]);
  }
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            return [4, __await(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike(obj) {
    return isFunction$1(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }
  function innerFrom(input) {
    if (input instanceof Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike$1(input)) {
        return fromArrayLike(input);
      }
      if (isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function fromInteropObservable(obj) {
    return new Observable(function(subscriber) {
      var obs = obj[observable]();
      if (isFunction$1(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike(array) {
    return new Observable(function(subscriber) {
      for (var i2 = 0; i2 < array.length && !subscriber.closed; i2++) {
        subscriber.next(array[i2]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise2) {
    return new Observable(function(subscriber) {
      promise2.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable(function(subscriber) {
      process$1(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process$1(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }
  function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) {
      delay = 0;
    }
    if (repeat === void 0) {
      repeat = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay));
      } else {
        this.unsubscribe();
      }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
      return scheduleSubscription;
    }
  }
  function observeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return operate(function(source, subscriber) {
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.next(value);
        }, delay);
      }, function() {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.complete();
        }, delay);
      }, function(err) {
        return executeSchedule(subscriber, scheduler, function() {
          return subscriber.error(err);
        }, delay);
      }));
    });
  }
  function subscribeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return operate(function(source, subscriber) {
      subscriber.add(scheduler.schedule(function() {
        return source.subscribe(subscriber);
      }, delay));
    });
  }
  function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }
  function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }
  function scheduleArray(input, scheduler) {
    return new Observable(function(subscriber) {
      var i2 = 0;
      return scheduler.schedule(function() {
        if (i2 === input.length) {
          subscriber.complete();
        } else {
          subscriber.next(input[i2++]);
          if (!subscriber.closed) {
            this.schedule();
          }
        }
      });
    });
  }
  function scheduleIterable(input, scheduler) {
    return new Observable(function(subscriber) {
      var iterator$1;
      executeSchedule(subscriber, scheduler, function() {
        iterator$1 = input[iterator]();
        executeSchedule(subscriber, scheduler, function() {
          var _a;
          var value;
          var done;
          try {
            _a = iterator$1.next(), value = _a.value, done = _a.done;
          } catch (err) {
            subscriber.error(err);
            return;
          }
          if (done) {
            subscriber.complete();
          } else {
            subscriber.next(value);
          }
        }, 0, true);
      });
      return function() {
        return isFunction$1(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
      };
    });
  }
  function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
      throw new Error("Iterable cannot be null");
    }
    return new Observable(function(subscriber) {
      executeSchedule(subscriber, scheduler, function() {
        var iterator2 = input[Symbol.asyncIterator]();
        executeSchedule(subscriber, scheduler, function() {
          iterator2.next().then(function(result) {
            if (result.done) {
              subscriber.complete();
            } else {
              subscriber.next(result.value);
            }
          });
        }, 0, true);
      });
    });
  }
  function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
  }
  function scheduled(input, scheduler) {
    if (input != null) {
      if (isInteropObservable(input)) {
        return scheduleObservable(input, scheduler);
      }
      if (isArrayLike$1(input)) {
        return scheduleArray(input, scheduler);
      }
      if (isPromise(input)) {
        return schedulePromise(input, scheduler);
      }
      if (isAsyncIterable(input)) {
        return scheduleAsyncIterable(input, scheduler);
      }
      if (isIterable(input)) {
        return scheduleIterable(input, scheduler);
      }
      if (isReadableStreamLike(input)) {
        return scheduleReadableStreamLike(input, scheduler);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
  }
  function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    return from(args, scheduler);
  }
  function map(project, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
      }));
    });
  }
  function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      if (isComplete && !buffer.length && !active) {
        subscriber.complete();
      }
    };
    var outerNext = function(value) {
      return active < concurrent ? doInnerSub(value) : buffer.push(value);
    };
    var doInnerSub = function(value) {
      active++;
      var innerComplete = false;
      innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
        {
          subscriber.next(innerValue);
        }
      }, function() {
        innerComplete = true;
      }, void 0, function() {
        if (innerComplete) {
          try {
            active--;
            var _loop_1 = function() {
              var bufferedValue = buffer.shift();
              if (innerSubScheduler)
                ;
              else {
                doInnerSub(bufferedValue);
              }
            };
            while (buffer.length && active < concurrent) {
              _loop_1();
            }
            checkComplete();
          } catch (err) {
            subscriber.error(err);
          }
        }
      }));
    };
    source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
    };
  }
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction$1(resultSelector)) {
      return mergeMap(function(a2, i2) {
        return map(function(b2, ii) {
          return resultSelector(a2, b2, i2, ii);
        })(innerFrom(project(a2, i2)));
      }, concurrent);
    } else if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return operate(function(source, subscriber) {
      return mergeInternals(source, subscriber, project, concurrent);
    });
  }
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    return mergeMap(identity, concurrent);
  }
  function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var scheduler = popScheduler(args);
    var concurrent = popNumber(args, Infinity);
    var sources = args;
    return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
  }
  function filter(predicate, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        return predicate.call(thisArg, value, index++) && subscriber.next(value);
      }));
    });
  }
  function takeUntil(notifier) {
    return operate(function(source, subscriber) {
      innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
        return subscriber.complete();
      }, noop$1));
      !subscriber.closed && source.subscribe(subscriber);
    });
  }
  var StateObservable = (
    /** @class */
    function(_super) {
      __extends(StateObservable2, _super);
      function StateObservable2(input$, initialState) {
        var _this = _super.call(this, function(subscriber) {
          var subscription = _this.__notifier.subscribe(subscriber);
          if (subscription && !subscription.closed) {
            subscriber.next(_this.value);
          }
          return subscription;
        }) || this;
        _this.__notifier = new Subject();
        _this.value = initialState;
        input$.subscribe(function(value) {
          if (value !== _this.value) {
            _this.value = value;
            _this.__notifier.next(value);
          }
        });
        return _this;
      }
      return StateObservable2;
    }(Observable)
  );
  function createEpicMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    var QueueScheduler2 = queueScheduler.constructor;
    var uniqueQueueScheduler = new QueueScheduler2(queueScheduler.schedulerActionCtor);
    var epic$ = new Subject();
    var store;
    var epicMiddleware = function(_store) {
      store = _store;
      var actionSubject$ = new Subject();
      var stateSubject$ = new Subject();
      var action$ = actionSubject$.asObservable().pipe(observeOn(uniqueQueueScheduler));
      var state$ = new StateObservable(stateSubject$.pipe(observeOn(uniqueQueueScheduler)), store.getState());
      var result$ = epic$.pipe(map(function(epic) {
        var output$ = epic(action$, state$, options.dependencies);
        if (!output$) {
          throw new TypeError('Your root Epic "' + (epic.name || "<anonymous>") + `" does not return a stream. Double check you're not missing a return statement!`);
        }
        return output$;
      }), mergeMap(function(output$) {
        return from(output$).pipe(subscribeOn(uniqueQueueScheduler), observeOn(uniqueQueueScheduler));
      }));
      result$.subscribe(store.dispatch);
      return function(next) {
        return function(action) {
          var result = next(action);
          stateSubject$.next(store.getState());
          actionSubject$.next(action);
          return result;
        };
      };
    };
    epicMiddleware.run = function(rootEpic) {
      epic$.next(rootEpic);
    };
    return epicMiddleware;
  }
  function combineEpics() {
    var epics2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      epics2[_i] = arguments[_i];
    }
    var merger = function() {
      var args = [];
      for (var _i2 = 0; _i2 < arguments.length; _i2++) {
        args[_i2] = arguments[_i2];
      }
      return merge.apply(void 0, epics2.map(function(epic) {
        var output$ = epic.apply(void 0, args);
        if (!output$) {
          throw new TypeError('combineEpics: one of the provided Epics "' + (epic.name || "<anonymous>") + `" does not return a stream. Double check you're not missing a return statement!`);
        }
        return output$;
      }));
    };
    try {
      Object.defineProperty(merger, "name", {
        value: "combineEpics(" + epics2.map(function(epic) {
          return epic.name || "<anonymous>";
        }).join(", ") + ")"
      });
    } catch (e) {
    }
    return merger;
  }
  var keyHasType = function(type, key) {
    return type === key || typeof key === "function" && type === key.toString();
  };
  function ofType() {
    var types = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      types[_i] = arguments[_i];
    }
    var len = types.length;
    return filter(len === 1 ? function(action) {
      return keyHasType(action.type, types[0]);
    } : function(action) {
      for (var i2 = 0; i2 < len; i2++) {
        if (keyHasType(action.type, types[i2])) {
          return true;
        }
      }
      return false;
    });
  }
  const initialLevelsState = {
    levels: {}
  };
  const levelsSlice = createSlice({
    name: "levels",
    initialState: initialLevelsState,
    reducers: {
      download(_state, _action) {
      },
      add(state, action) {
        const { levels } = action.payload;
        levels.forEach((level) => {
          state.levels[level.id] = level;
        });
      },
      clear(state) {
        state.levels = initialLevelsState.levels;
      },
      removePlaylistLevels(state, action) {
        const { playlistID } = action.payload;
        for (const id in state.levels) {
          if (state.levels.hasOwnProperty(id)) {
            const level = state.levels[id];
            if (level?.playlistID === playlistID) {
              delete state.levels[id];
            }
          }
        }
      }
    }
  });
  const initialPlaylistsState = {
    playlistsStatus: {},
    playlists: {}
  };
  const playlistsSlice = createSlice({
    name: "playlists",
    initialState: initialPlaylistsState,
    reducers: {
      clearPlaylists(state) {
        state.playlists = initialPlaylistsState.playlists;
        state.playlistsStatus = initialPlaylistsState.playlistsStatus;
      },
      addPlaylist(state, action) {
        const playlist = action.payload;
        state.playlistsStatus[playlist.id] = {
          status: "init"
        };
        state.playlists[playlist.id] = playlist;
      },
      removePlaylist(state, action) {
        const playlistID = action.payload.playlistID;
        delete state.playlistsStatus[playlistID];
        delete state.playlists[playlistID];
      },
      fetchPlaylistLevels(state, action) {
        const { playlistID } = action.payload;
        state.playlistsStatus[playlistID].status = "fetching";
      },
      fetchPlaylistLevelsSuccess(state, action) {
        const { playlistID } = action.payload;
        state.playlistsStatus[playlistID].status = "ready";
      },
      fetchPlaylistLevelsFailed(state, action) {
        const { playlistID } = action.payload;
        state.playlistsStatus[playlistID].status = "error";
      }
    }
  });
  const initialConfigState$1 = {
    concurrency: 2,
    saveDialog: false,
    fetchAttempts: 100
  };
  const configSlice = createSlice({
    name: "config",
    initialState: initialConfigState$1,
    reducers: {
      setConcurrency(state, action) {
        state.concurrency = action.payload.concurrency;
      },
      setSaveDialog(state, action) {
        state.saveDialog = action.payload.saveDialog;
      },
      setFetchAttempts(state, action) {
        state.fetchAttempts = action.payload.fetchAttempts;
      }
    }
  });
  const initialConfigState = {
    current: {
      id: -1
    }
  };
  const tabsSlice = createSlice({
    name: "tabs",
    initialState: initialConfigState,
    reducers: {
      setTab(state, action) {
        state.current = action.payload.tab;
      }
    }
  });
  const initialJobsState = {
    jobsStatus: {},
    jobs: {}
  };
  const jobsSlice = createSlice({
    name: "jobs",
    initialState: initialJobsState,
    reducers: {
      download(_state, _action) {
      },
      clear(state) {
        state.jobs = initialJobsState.jobs;
        state.jobsStatus = initialJobsState.jobsStatus;
      },
      add(state, action) {
        const { job } = action.payload;
        state.jobs[job.id] = job;
        state.jobsStatus[job.id] = {
          done: 0,
          total: job.fragments.length,
          status: "downloading"
        };
      },
      cancel(state, action) {
      },
      delete(state, action) {
      },
      deleteSuccess(state, action) {
        const { jobId } = action.payload;
        delete state.jobs[jobId];
        delete state.jobsStatus[jobId];
      },
      finishDownload(state, action) {
        const { jobId } = action.payload;
        const jobStatus = state.jobsStatus[jobId];
        jobStatus.done = jobStatus.total;
        jobStatus.status = "ready";
      },
      incDownloadStatus(state, action) {
        const { jobId } = action.payload;
        const jobStatus = state.jobsStatus[jobId];
        jobStatus.done++;
      },
      saveAs(state, action) {
        const { jobId } = action.payload;
        const jobStatus = state.jobsStatus[jobId];
        jobStatus.status = "saving";
      },
      saveAsSuccess(state, action) {
        const { jobId } = action.payload;
        const job = state.jobs[jobId];
        const jobStatus = state.jobsStatus[jobId];
        job.link = action.payload.link;
        jobStatus.status = "done";
      }
    }
  });
  const createBucketFactory = (fs) => {
    const run = async (bucketID, length) => {
      await fs.createBucket(bucketID, length);
    };
    return run;
  };
  const decryptSingleFragmentFactory = (loader, decryptor) => {
    const run = async (key, data, fetchAttempts) => {
      if (!key.uri || !key.iv) {
        return data;
      }
      const keyArrayBuffer = await loader.fetchArrayBuffer(key.uri, fetchAttempts);
      const decryptedData = await decryptor.decrypt(data, keyArrayBuffer, key.iv);
      return decryptedData;
    };
    return run;
  };
  const downloadSingleFactory = (loader) => {
    const run = async (fragment, fetchAttempts) => {
      const data = await loader.fetchArrayBuffer(fragment.uri, fetchAttempts);
      return data;
    };
    return run;
  };
  const getFragmentsDetailsFactory = (loader, parser) => {
    const run = async (playlist, fetchAttempts) => {
      const levelPlaylistText = await loader.fetchText(playlist.uri, fetchAttempts);
      const fragments = parser.parseLevelPlaylist(levelPlaylistText, playlist.uri);
      return fragments;
    };
    return run;
  };
  const getLevelsFactory = (loader, parser) => {
    const run = async (masterPlaylistURI, fetchAttempts) => {
      try {
        const masterPlaylistText = await loader.fetchText(masterPlaylistURI, fetchAttempts);
        return parser.parseMasterPlaylist(masterPlaylistText, masterPlaylistURI);
      } catch (error) {
        throw Error("LevelManifest");
      }
    };
    return run;
  };
  const getLinkBucketFactory = (fs) => {
    const run = async (bucketID) => {
      const bucket = await fs.getBucket(bucketID);
      return await bucket.getLink();
    };
    return run;
  };
  const writeToBucketFactory = (fs) => {
    const run = async (bucketID, index, data) => {
      const bucket = await fs.getBucket(bucketID);
      await bucket.write(index, data);
    };
    return run;
  };
  const saveAsFactory = (fs) => {
    const run = async (path, link, options) => {
      await fs.saveAs(path, link, options);
    };
    return run;
  };
  const generateFileName = () => {
    const run = (playlist, level) => {
      const path = playlist.uri.split("?")[0];
      const chunks = path.split("/");
      const playlistFilename = chunks[chunks.length - 1];
      const playlistFilenameWithoutExt = playlistFilename.split(".m3u8")[0];
      if (playlist.pageTitle) {
        return `${playlist.pageTitle}-${playlistFilenameWithoutExt}.mp4`;
      }
      return `${playlistFilenameWithoutExt}.mp4`;
    };
    return run;
  };
  const deleteBucketFactory = (fs) => {
    const run = async (bucketID) => {
      await fs.deleteBucket(bucketID);
    };
    return run;
  };
  const fsCleanupFactory = (fs) => {
    const run = async () => {
      await fs.cleanup();
    };
    return run;
  };
  const downloadJobEpic = (action$, store$, { fs, loader, decryptor }) => action$.pipe(filter(jobsSlice.actions.add.match), map((action) => action.payload.job), mergeMap(({ fragments, id }) => from(createBucketFactory(fs)(id, fragments.length).then(() => ({
    fragments,
    id
  })))), mergeMap(({ fragments, id }) => from(fragments).pipe(mergeMap((fragment) => from(downloadSingleFactory(loader)(fragment, store$.value.config.fetchAttempts).then((data) => ({
    fragment,
    data,
    id
  }))), store$.value.config.concurrency), mergeMap(({ data, fragment, id: id2 }) => decryptSingleFragmentFactory(loader, decryptor)(fragment.key, data, store$.value.config.fetchAttempts).then((data2) => ({
    fragment,
    data: data2,
    id: id2
  }))), mergeMap(({ data, id: id2, fragment }) => writeToBucketFactory(fs)(id2, fragment.index, data).then(() => ({
    id: id2
  }))), mergeMap(({ id: id2 }) => of(jobsSlice.actions.incDownloadStatus({
    jobId: id2
  }))), takeUntil(action$.pipe(filter(jobsSlice.actions.cancel.match)).pipe(filter((action) => action.payload.jobId === id))))));
  const addDownloadJobEpic = (action$, store$, { loader, parser }) => action$.pipe(filter(levelsSlice.actions.download.match), map((action) => action.payload.levelID), map((levelID) => store$.value.levels.levels[levelID]), map((level) => level), mergeMap((level) => from(getFragmentsDetailsFactory(loader, parser)(level, store$.value.config.fetchAttempts)), (level, fragments) => ({
    fragments,
    level
  })), map(({ level, fragments }) => ({
    level,
    fragments,
    playlist: store$.value.playlists.playlists[level.playlistID]
  })), map(({ level, fragments, playlist }) => ({
    level,
    filename: generateFileName()(playlist, level),
    fragments
  })), mergeMap(({ fragments, level, filename }) => of(jobsSlice.actions.add({
    job: {
      id: `${filename}/${(/* @__PURE__ */ new Date()).toISOString()}`,
      fragments,
      filename,
      createdAt: Date.now(),
      bitrate: level.bitrate,
      width: level.width,
      height: level.height
    }
  }))));
  const saveAsJobEpic = (action$, store$, { fs }) => action$.pipe(filter(jobsSlice.actions.saveAs.match), map((action) => action.payload.jobId), mergeMap((jobId) => from(getLinkBucketFactory(fs)(jobId)), (jobId, link) => ({ jobId, link })), map(({ jobId, link }) => ({
    job: store$.value.jobs.jobs[jobId],
    dialog: store$.value.config.saveDialog,
    link
  })), mergeMap(({ dialog, link, job }) => from(saveAsFactory(fs)(job.filename, link, {
    dialog
  })), ({ job, link }) => ({ job, link })), mergeMap(({ job, link }) => of(jobsSlice.actions.saveAsSuccess({ jobId: job.id, link }))));
  const incDownloadStatusEpic = (action$, store$) => action$.pipe(filter(jobsSlice.actions.incDownloadStatus.match), map((action) => action.payload.jobId), map((id) => ({ id, status: store$.value.jobs.jobsStatus[id] })), filter(({ status }) => Boolean(status)), filter(({ status }) => status.done === status.total), mergeMap(({ id }) => {
    return of(jobsSlice.actions.finishDownload({
      jobId: id
    }), jobsSlice.actions.saveAs({
      jobId: id
    }));
  }));
  const fetchPlaylistLevelsEpic = (action$, store$, { loader, parser }) => action$.pipe(filter(playlistsSlice.actions.fetchPlaylistLevels.match), map((action) => action.payload.playlistID), map((playlistID) => store$.value.playlists.playlists[playlistID]), mergeMap(({ uri }) => from(getLevelsFactory(loader, parser)(uri, store$.value.config.fetchAttempts)), ({ id }, levels) => ({
    levels,
    playlistID: id
  })), mergeMap(({ playlistID, levels }) => {
    if (levels.length === 0) {
      return of(playlistsSlice.actions.fetchPlaylistLevelsFailed({
        playlistID
      }));
    }
    return of(playlistsSlice.actions.fetchPlaylistLevelsSuccess({
      playlistID
    }), levelsSlice.actions.add({
      levels
    }));
  }));
  const addPlaylistEpic = (action$, state$) => action$.pipe(filter(playlistsSlice.actions.addPlaylist.match), map((action) => action.payload), filter(({ id }) => Boolean(state$.value.playlists.playlists[id])), mergeMap(({ id }) => of(playlistsSlice.actions.fetchPlaylistLevels({
    playlistID: id
  }))));
  const deleteJobEpic = (action$, _store$, { fs }) => action$.pipe(filter(jobsSlice.actions.delete.match), map((action) => {
    return action.payload.jobId;
  }), mergeMap((jobId) => from(deleteBucketFactory(fs)(jobId)), (jobId) => ({ jobId })), mergeMap(({ jobId }) => of(jobsSlice.actions.deleteSuccess({ jobId }))));
  const fsCleanupOnInitEpic = (action$, _store$, { fs }) => action$.pipe(ofType("init/start"), mergeMap(() => from(fsCleanupFactory(fs)())), mergeMap(() => of(createAction("init/done")())));
  const cancelJobdeleteJobEpic = (action$, _store$, { fs }) => action$.pipe(filter(jobsSlice.actions.cancel.match), mergeMap(({ payload: { jobId } }) => of(jobsSlice.actions.delete({ jobId }))));
  const epics = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    addDownloadJobEpic,
    addPlaylistEpic,
    cancelJobdeleteJobEpic,
    deleteJobEpic,
    downloadJobEpic,
    fetchPlaylistLevelsEpic,
    fsCleanupOnInitEpic,
    incDownloadStatusEpic,
    saveAsJobEpic
  }, Symbol.toStringTag, { value: "Module" }));
  function createRootEpic() {
    const epicsArray = Object.values({ ...epics });
    const epic$ = new BehaviorSubject(combineEpics(...epicsArray));
    const rootEpic = (action$, state$, deps) => epic$.pipe(mergeMap((epic) => epic(action$, state$, deps)));
    return rootEpic;
  }
  const rootReducer = combineReducers({
    playlists: playlistsSlice.reducer,
    levels: levelsSlice.reducer,
    config: configSlice.reducer,
    tabs: tabsSlice.reducer,
    jobs: jobsSlice.reducer
  });
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var reduxLogger = { exports: {} };
  (function(module, exports) {
    !function(e, t2) {
      t2(exports);
    }(commonjsGlobal, function(e) {
      function t2(e2, t3) {
        e2.super_ = t3, e2.prototype = Object.create(t3.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } });
      }
      function r2(e2, t3) {
        Object.defineProperty(this, "kind", { value: e2, enumerable: true }), t3 && t3.length && Object.defineProperty(this, "path", { value: t3, enumerable: true });
      }
      function n2(e2, t3, r3) {
        n2.super_.call(this, "E", e2), Object.defineProperty(this, "lhs", { value: t3, enumerable: true }), Object.defineProperty(this, "rhs", { value: r3, enumerable: true });
      }
      function o2(e2, t3) {
        o2.super_.call(this, "N", e2), Object.defineProperty(this, "rhs", { value: t3, enumerable: true });
      }
      function i2(e2, t3) {
        i2.super_.call(this, "D", e2), Object.defineProperty(this, "lhs", { value: t3, enumerable: true });
      }
      function a2(e2, t3, r3) {
        a2.super_.call(this, "A", e2), Object.defineProperty(this, "index", { value: t3, enumerable: true }), Object.defineProperty(this, "item", { value: r3, enumerable: true });
      }
      function f2(e2, t3, r3) {
        var n3 = e2.slice(t3 + 1 || e2.length);
        return e2.length = t3 < 0 ? e2.length + t3 : t3, e2.push.apply(e2, n3), e2;
      }
      function u2(e2) {
        var t3 = "undefined" == typeof e2 ? "undefined" : N2(e2);
        return "object" !== t3 ? t3 : e2 === Math ? "math" : null === e2 ? "null" : Array.isArray(e2) ? "array" : "[object Date]" === Object.prototype.toString.call(e2) ? "date" : "function" == typeof e2.toString && /^\/.*\//.test(e2.toString()) ? "regexp" : "object";
      }
      function l2(e2, t3, r3, c3, s3, d3, p3) {
        s3 = s3 || [], p3 = p3 || [];
        var g3 = s3.slice(0);
        if ("undefined" != typeof d3) {
          if (c3) {
            if ("function" == typeof c3 && c3(g3, d3))
              return;
            if ("object" === ("undefined" == typeof c3 ? "undefined" : N2(c3))) {
              if (c3.prefilter && c3.prefilter(g3, d3))
                return;
              if (c3.normalize) {
                var h3 = c3.normalize(g3, d3, e2, t3);
                h3 && (e2 = h3[0], t3 = h3[1]);
              }
            }
          }
          g3.push(d3);
        }
        "regexp" === u2(e2) && "regexp" === u2(t3) && (e2 = e2.toString(), t3 = t3.toString());
        var y3 = "undefined" == typeof e2 ? "undefined" : N2(e2), v3 = "undefined" == typeof t3 ? "undefined" : N2(t3), b3 = "undefined" !== y3 || p3 && p3[p3.length - 1].lhs && p3[p3.length - 1].lhs.hasOwnProperty(d3), m3 = "undefined" !== v3 || p3 && p3[p3.length - 1].rhs && p3[p3.length - 1].rhs.hasOwnProperty(d3);
        if (!b3 && m3)
          r3(new o2(g3, t3));
        else if (!m3 && b3)
          r3(new i2(g3, e2));
        else if (u2(e2) !== u2(t3))
          r3(new n2(g3, e2, t3));
        else if ("date" === u2(e2) && e2 - t3 !== 0)
          r3(new n2(g3, e2, t3));
        else if ("object" === y3 && null !== e2 && null !== t3)
          if (p3.filter(function(t4) {
            return t4.lhs === e2;
          }).length)
            e2 !== t3 && r3(new n2(g3, e2, t3));
          else {
            if (p3.push({ lhs: e2, rhs: t3 }), Array.isArray(e2)) {
              var w3;
              e2.length;
              for (w3 = 0; w3 < e2.length; w3++)
                w3 >= t3.length ? r3(new a2(g3, w3, new i2(void 0, e2[w3]))) : l2(e2[w3], t3[w3], r3, c3, g3, w3, p3);
              for (; w3 < t3.length; )
                r3(new a2(g3, w3, new o2(void 0, t3[w3++])));
            } else {
              var x3 = Object.keys(e2), S3 = Object.keys(t3);
              x3.forEach(function(n3, o3) {
                var i3 = S3.indexOf(n3);
                i3 >= 0 ? (l2(e2[n3], t3[n3], r3, c3, g3, n3, p3), S3 = f2(S3, i3)) : l2(e2[n3], void 0, r3, c3, g3, n3, p3);
              }), S3.forEach(function(e3) {
                l2(void 0, t3[e3], r3, c3, g3, e3, p3);
              });
            }
            p3.length = p3.length - 1;
          }
        else
          e2 !== t3 && ("number" === y3 && isNaN(e2) && isNaN(t3) || r3(new n2(g3, e2, t3)));
      }
      function c2(e2, t3, r3, n3) {
        return n3 = n3 || [], l2(e2, t3, function(e3) {
          e3 && n3.push(e3);
        }, r3), n3.length ? n3 : void 0;
      }
      function s2(e2, t3, r3) {
        if (r3.path && r3.path.length) {
          var n3, o3 = e2[t3], i3 = r3.path.length - 1;
          for (n3 = 0; n3 < i3; n3++)
            o3 = o3[r3.path[n3]];
          switch (r3.kind) {
            case "A":
              s2(o3[r3.path[n3]], r3.index, r3.item);
              break;
            case "D":
              delete o3[r3.path[n3]];
              break;
            case "E":
            case "N":
              o3[r3.path[n3]] = r3.rhs;
          }
        } else
          switch (r3.kind) {
            case "A":
              s2(e2[t3], r3.index, r3.item);
              break;
            case "D":
              e2 = f2(e2, t3);
              break;
            case "E":
            case "N":
              e2[t3] = r3.rhs;
          }
        return e2;
      }
      function d2(e2, t3, r3) {
        if (e2 && t3 && r3 && r3.kind) {
          for (var n3 = e2, o3 = -1, i3 = r3.path ? r3.path.length - 1 : 0; ++o3 < i3; )
            "undefined" == typeof n3[r3.path[o3]] && (n3[r3.path[o3]] = "number" == typeof r3.path[o3] ? [] : {}), n3 = n3[r3.path[o3]];
          switch (r3.kind) {
            case "A":
              s2(r3.path ? n3[r3.path[o3]] : n3, r3.index, r3.item);
              break;
            case "D":
              delete n3[r3.path[o3]];
              break;
            case "E":
            case "N":
              n3[r3.path[o3]] = r3.rhs;
          }
        }
      }
      function p2(e2, t3, r3) {
        if (r3.path && r3.path.length) {
          var n3, o3 = e2[t3], i3 = r3.path.length - 1;
          for (n3 = 0; n3 < i3; n3++)
            o3 = o3[r3.path[n3]];
          switch (r3.kind) {
            case "A":
              p2(o3[r3.path[n3]], r3.index, r3.item);
              break;
            case "D":
              o3[r3.path[n3]] = r3.lhs;
              break;
            case "E":
              o3[r3.path[n3]] = r3.lhs;
              break;
            case "N":
              delete o3[r3.path[n3]];
          }
        } else
          switch (r3.kind) {
            case "A":
              p2(e2[t3], r3.index, r3.item);
              break;
            case "D":
              e2[t3] = r3.lhs;
              break;
            case "E":
              e2[t3] = r3.lhs;
              break;
            case "N":
              e2 = f2(e2, t3);
          }
        return e2;
      }
      function g2(e2, t3, r3) {
        if (e2 && t3 && r3 && r3.kind) {
          var n3, o3, i3 = e2;
          for (o3 = r3.path.length - 1, n3 = 0; n3 < o3; n3++)
            "undefined" == typeof i3[r3.path[n3]] && (i3[r3.path[n3]] = {}), i3 = i3[r3.path[n3]];
          switch (r3.kind) {
            case "A":
              p2(i3[r3.path[n3]], r3.index, r3.item);
              break;
            case "D":
              i3[r3.path[n3]] = r3.lhs;
              break;
            case "E":
              i3[r3.path[n3]] = r3.lhs;
              break;
            case "N":
              delete i3[r3.path[n3]];
          }
        }
      }
      function h2(e2, t3, r3) {
        if (e2 && t3) {
          var n3 = function(n4) {
            r3 && !r3(e2, t3, n4) || d2(e2, t3, n4);
          };
          l2(e2, t3, n3);
        }
      }
      function y2(e2) {
        return "color: " + F2[e2].color + "; font-weight: bold";
      }
      function v2(e2) {
        var t3 = e2.kind, r3 = e2.path, n3 = e2.lhs, o3 = e2.rhs, i3 = e2.index, a3 = e2.item;
        switch (t3) {
          case "E":
            return [r3.join("."), n3, "→", o3];
          case "N":
            return [r3.join("."), o3];
          case "D":
            return [r3.join(".")];
          case "A":
            return [r3.join(".") + "[" + i3 + "]", a3];
          default:
            return [];
        }
      }
      function b2(e2, t3, r3, n3) {
        var o3 = c2(e2, t3);
        try {
          n3 ? r3.groupCollapsed("diff") : r3.group("diff");
        } catch (e3) {
          r3.log("diff");
        }
        o3 ? o3.forEach(function(e3) {
          var t4 = e3.kind, n4 = v2(e3);
          r3.log.apply(r3, ["%c " + F2[t4].text, y2(t4)].concat(P2(n4)));
        }) : r3.log("—— no diff ——");
        try {
          r3.groupEnd();
        } catch (e3) {
          r3.log("—— diff end —— ");
        }
      }
      function m2(e2, t3, r3, n3) {
        switch ("undefined" == typeof e2 ? "undefined" : N2(e2)) {
          case "object":
            return "function" == typeof e2[n3] ? e2[n3].apply(e2, P2(r3)) : e2[n3];
          case "function":
            return e2(t3);
          default:
            return e2;
        }
      }
      function w2(e2) {
        var t3 = e2.timestamp, r3 = e2.duration;
        return function(e3, n3, o3) {
          var i3 = ["action"];
          return i3.push("%c" + String(e3.type)), t3 && i3.push("%c@ " + n3), r3 && i3.push("%c(in " + o3.toFixed(2) + " ms)"), i3.join(" ");
        };
      }
      function x2(e2, t3) {
        var r3 = t3.logger, n3 = t3.actionTransformer, o3 = t3.titleFormatter, i3 = void 0 === o3 ? w2(t3) : o3, a3 = t3.collapsed, f3 = t3.colors, u3 = t3.level, l3 = t3.diff, c3 = "undefined" == typeof t3.titleFormatter;
        e2.forEach(function(o4, s3) {
          var d3 = o4.started, p3 = o4.startedTime, g3 = o4.action, h3 = o4.prevState, y3 = o4.error, v3 = o4.took, w3 = o4.nextState, x3 = e2[s3 + 1];
          x3 && (w3 = x3.prevState, v3 = x3.started - d3);
          var S3 = n3(g3), k3 = "function" == typeof a3 ? a3(function() {
            return w3;
          }, g3, o4) : a3, j3 = D2(p3), E3 = f3.title ? "color: " + f3.title(S3) + ";" : "", A3 = ["color: gray; font-weight: lighter;"];
          A3.push(E3), t3.timestamp && A3.push("color: gray; font-weight: lighter;"), t3.duration && A3.push("color: gray; font-weight: lighter;");
          var O3 = i3(S3, j3, v3);
          try {
            k3 ? f3.title && c3 ? r3.groupCollapsed.apply(r3, ["%c " + O3].concat(A3)) : r3.groupCollapsed(O3) : f3.title && c3 ? r3.group.apply(r3, ["%c " + O3].concat(A3)) : r3.group(O3);
          } catch (e3) {
            r3.log(O3);
          }
          var N3 = m2(u3, S3, [h3], "prevState"), P3 = m2(u3, S3, [S3], "action"), C2 = m2(u3, S3, [y3, h3], "error"), F3 = m2(u3, S3, [w3], "nextState");
          if (N3)
            if (f3.prevState) {
              var L3 = "color: " + f3.prevState(h3) + "; font-weight: bold";
              r3[N3]("%c prev state", L3, h3);
            } else
              r3[N3]("prev state", h3);
          if (P3)
            if (f3.action) {
              var T2 = "color: " + f3.action(S3) + "; font-weight: bold";
              r3[P3]("%c action    ", T2, S3);
            } else
              r3[P3]("action    ", S3);
          if (y3 && C2)
            if (f3.error) {
              var M2 = "color: " + f3.error(y3, h3) + "; font-weight: bold;";
              r3[C2]("%c error     ", M2, y3);
            } else
              r3[C2]("error     ", y3);
          if (F3)
            if (f3.nextState) {
              var _2 = "color: " + f3.nextState(w3) + "; font-weight: bold";
              r3[F3]("%c next state", _2, w3);
            } else
              r3[F3]("next state", w3);
          l3 && b2(h3, w3, r3, k3);
          try {
            r3.groupEnd();
          } catch (e3) {
            r3.log("—— log end ——");
          }
        });
      }
      function S2() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t3 = Object.assign({}, L2, e2), r3 = t3.logger, n3 = t3.stateTransformer, o3 = t3.errorTransformer, i3 = t3.predicate, a3 = t3.logErrors, f3 = t3.diffPredicate;
        if ("undefined" == typeof r3)
          return function() {
            return function(e3) {
              return function(t4) {
                return e3(t4);
              };
            };
          };
        if (e2.getState && e2.dispatch)
          return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function() {
            return function(e3) {
              return function(t4) {
                return e3(t4);
              };
            };
          };
        var u3 = [];
        return function(e3) {
          var r4 = e3.getState;
          return function(e4) {
            return function(l3) {
              if ("function" == typeof i3 && !i3(r4, l3))
                return e4(l3);
              var c3 = {};
              u3.push(c3), c3.started = O2.now(), c3.startedTime = /* @__PURE__ */ new Date(), c3.prevState = n3(r4()), c3.action = l3;
              var s3 = void 0;
              if (a3)
                try {
                  s3 = e4(l3);
                } catch (e5) {
                  c3.error = o3(e5);
                }
              else
                s3 = e4(l3);
              c3.took = O2.now() - c3.started, c3.nextState = n3(r4());
              var d3 = t3.diff && "function" == typeof f3 ? f3(r4, l3) : t3.diff;
              if (x2(u3, Object.assign({}, t3, { diff: d3 })), u3.length = 0, c3.error)
                throw c3.error;
              return s3;
            };
          };
        };
      }
      var k2, j2, E2 = function(e2, t3) {
        return new Array(t3 + 1).join(e2);
      }, A2 = function(e2, t3) {
        return E2("0", t3 - e2.toString().length) + e2;
      }, D2 = function(e2) {
        return A2(e2.getHours(), 2) + ":" + A2(e2.getMinutes(), 2) + ":" + A2(e2.getSeconds(), 2) + "." + A2(e2.getMilliseconds(), 3);
      }, O2 = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date, N2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e2) {
        return typeof e2;
      } : function(e2) {
        return e2 && "function" == typeof Symbol && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
      }, P2 = function(e2) {
        if (Array.isArray(e2)) {
          for (var t3 = 0, r3 = Array(e2.length); t3 < e2.length; t3++)
            r3[t3] = e2[t3];
          return r3;
        }
        return Array.from(e2);
      }, C = [];
      k2 = "object" === ("undefined" == typeof commonjsGlobal ? "undefined" : N2(commonjsGlobal)) && commonjsGlobal ? commonjsGlobal : "undefined" != typeof window ? window : {}, j2 = k2.DeepDiff, j2 && C.push(function() {
        "undefined" != typeof j2 && k2.DeepDiff === c2 && (k2.DeepDiff = j2, j2 = void 0);
      }), t2(n2, r2), t2(o2, r2), t2(i2, r2), t2(a2, r2), Object.defineProperties(c2, { diff: { value: c2, enumerable: true }, observableDiff: { value: l2, enumerable: true }, applyDiff: { value: h2, enumerable: true }, applyChange: { value: d2, enumerable: true }, revertChange: { value: g2, enumerable: true }, isConflict: { value: function() {
        return "undefined" != typeof j2;
      }, enumerable: true }, noConflict: { value: function() {
        return C && (C.forEach(function(e2) {
          e2();
        }), C = null), c2;
      }, enumerable: true } });
      var F2 = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, L2 = { level: "log", logger: console, logErrors: true, collapsed: void 0, predicate: void 0, duration: false, timestamp: true, stateTransformer: function(e2) {
        return e2;
      }, actionTransformer: function(e2) {
        return e2;
      }, errorTransformer: function(e2) {
        return e2;
      }, colors: { title: function() {
        return "inherit";
      }, prevState: function() {
        return "#9E9E9E";
      }, action: function() {
        return "#03A9F4";
      }, nextState: function() {
        return "#4CAF50";
      }, error: function() {
        return "#F20404";
      } }, diff: false, diffPredicate: void 0, transformer: void 0 }, T = function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t3 = e2.dispatch, r3 = e2.getState;
        return "function" == typeof t3 || "function" == typeof r3 ? S2()({ dispatch: t3, getState: r3 }) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n");
      };
      e.defaults = L2, e.createLogger = S2, e.logger = T, e.default = T, Object.defineProperty(e, "__esModule", { value: true });
    });
  })(reduxLogger, reduxLogger.exports);
  var reduxLoggerExports = reduxLogger.exports;
  const logger = /* @__PURE__ */ getDefaultExportFromCjs(reduxLoggerExports);
  function createStore(dependencies, preloadedState = rootReducer(void 0, { type: "init" })) {
    const epicMiddleware = createEpicMiddleware({ dependencies });
    const rootEpic = createRootEpic();
    const store = configureStore({
      reducer: rootReducer,
      middleware: [logger, epicMiddleware],
      preloadedState
    });
    epicMiddleware.run(rootEpic);
    store.dispatch({
      type: "init/start"
    });
    return store;
  }
  var lib = {};
  var Store$1 = {};
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]";
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function baseTimes(n2, iteratee) {
    var index = -1, result = Array(n2);
    while (++index < n2) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var nativeMax = Math.max;
  function arrayLikeKeys(value, inherited) {
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for (var key in value) {
      if (!(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      object[key] = value;
    }
  }
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  function baseRest(func, start) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }
  function copyObject(source, props, object, customizer) {
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = void 0;
      assignValue(object, key, newValue === void 0 ? source[key] : newValue);
    }
    return object;
  }
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
      return eq(object[index], value);
    }
    return false;
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
  }
  var isArray = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  var assignIn = createAssigner(function(object, source) {
    copyObject(source, keysIn(source), object);
  });
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeysIn(object);
  }
  var lodash_assignin = assignIn;
  var constants$1 = {};
  Object.defineProperty(constants$1, "__esModule", {
    value: true
  });
  constants$1.DEFAULT_PORT_NAME = constants$1.PATCH_STATE_TYPE = constants$1.STATE_TYPE = constants$1.DISPATCH_TYPE = void 0;
  var DISPATCH_TYPE = "chromex.dispatch";
  constants$1.DISPATCH_TYPE = DISPATCH_TYPE;
  var STATE_TYPE = "chromex.state";
  constants$1.STATE_TYPE = STATE_TYPE;
  var PATCH_STATE_TYPE = "chromex.patch_state";
  constants$1.PATCH_STATE_TYPE = PATCH_STATE_TYPE;
  var DEFAULT_PORT_NAME = "chromex.port_name";
  constants$1.DEFAULT_PORT_NAME = DEFAULT_PORT_NAME;
  var serialization = {};
  Object.defineProperty(serialization, "__esModule", {
    value: true
  });
  serialization.withSerializer = serialization.withDeserializer = serialization.noop = void 0;
  function _objectSpread(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? arguments[i2] : {};
      var ownKeys2 = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys2.forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var noop = function noop2(payload) {
    return payload;
  };
  serialization.noop = noop;
  var transformPayload = function transformPayload2(message) {
    var transformer = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
    return _objectSpread({}, message, message.payload ? {
      payload: transformer(message.payload)
    } : {});
  };
  var deserializeListener = function deserializeListener2(listener) {
    var deserializer = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
    var shouldDeserialize = arguments.length > 2 ? arguments[2] : void 0;
    if (shouldDeserialize) {
      return function(message) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        if (shouldDeserialize.apply(void 0, [message].concat(args))) {
          return listener.apply(void 0, [transformPayload(message, deserializer)].concat(args));
        }
        return listener.apply(void 0, [message].concat(args));
      };
    }
    return function(message) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return listener.apply(void 0, [transformPayload(message, deserializer)].concat(args));
    };
  };
  var withDeserializer = function withDeserializer2() {
    var deserializer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
    return function(addListenerFn) {
      return function(listener, shouldDeserialize) {
        return addListenerFn(deserializeListener(listener, deserializer, shouldDeserialize));
      };
    };
  };
  serialization.withDeserializer = withDeserializer;
  var withSerializer = function withSerializer2() {
    var serializer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
    return function(sendMessageFn) {
      var messageArgIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return function() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        if (args.length <= messageArgIndex) {
          throw new Error("Message in request could not be serialized. " + "Expected message in position ".concat(messageArgIndex, " but only received ").concat(args.length, " args."));
        }
        args[messageArgIndex] = transformPayload(args[messageArgIndex], serializer);
        return sendMessageFn.apply(void 0, args);
      };
    };
  };
  serialization.withSerializer = withSerializer;
  var patch = {};
  var constants = {};
  Object.defineProperty(constants, "__esModule", {
    value: true
  });
  constants.DIFF_STATUS_ARRAY_UPDATED = constants.DIFF_STATUS_KEYS_UPDATED = constants.DIFF_STATUS_REMOVED = constants.DIFF_STATUS_UPDATED = void 0;
  var DIFF_STATUS_UPDATED = "updated";
  constants.DIFF_STATUS_UPDATED = DIFF_STATUS_UPDATED;
  var DIFF_STATUS_REMOVED = "removed";
  constants.DIFF_STATUS_REMOVED = DIFF_STATUS_REMOVED;
  var DIFF_STATUS_KEYS_UPDATED = "updated_keys";
  constants.DIFF_STATUS_KEYS_UPDATED = DIFF_STATUS_KEYS_UPDATED;
  var DIFF_STATUS_ARRAY_UPDATED = "updated_array";
  constants.DIFF_STATUS_ARRAY_UPDATED = DIFF_STATUS_ARRAY_UPDATED;
  Object.defineProperty(patch, "__esModule", {
    value: true
  });
  patch.default = _default$3;
  var _constants$3 = constants;
  function _default$3(obj, difference) {
    var newObj = Object.assign({}, obj);
    difference.forEach(function(_ref) {
      var change = _ref.change, key = _ref.key, value = _ref.value;
      switch (change) {
        case _constants$3.DIFF_STATUS_UPDATED:
          newObj[key] = value;
          break;
        case _constants$3.DIFF_STATUS_REMOVED:
          Reflect.deleteProperty(newObj, key);
          break;
      }
    });
    return newObj;
  }
  var util = {};
  Object.defineProperty(util, "__esModule", {
    value: true
  });
  util.getBrowserAPI = getBrowserAPI;
  function getBrowserAPI() {
    var api;
    try {
      api = self.chrome || self.browser || browser;
    } catch (error) {
      api = browser;
    }
    if (!api) {
      throw new Error("Browser API is not present");
    }
    return api;
  }
  Object.defineProperty(Store$1, "__esModule", {
    value: true
  });
  Store$1.default = void 0;
  var _lodash = _interopRequireDefault$1(lodash_assignin);
  var _constants$2 = constants$1;
  var _serialization$1 = serialization;
  var _patch = _interopRequireDefault$1(patch);
  var _util$1 = util;
  function _interopRequireDefault$1(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    return Constructor;
  }
  var backgroundErrPrefix = "\nLooks like there is an error in the background page. You might want to inspect your background page for more details.\n";
  var defaultOpts$1 = {
    portName: _constants$2.DEFAULT_PORT_NAME,
    state: {},
    extensionId: null,
    serializer: _serialization$1.noop,
    deserializer: _serialization$1.noop,
    patchStrategy: _patch.default
  };
  var Store = /* @__PURE__ */ function() {
    function Store2() {
      var _this = this;
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultOpts$1, _ref$portName = _ref.portName, portName = _ref$portName === void 0 ? defaultOpts$1.portName : _ref$portName, _ref$state = _ref.state, state = _ref$state === void 0 ? defaultOpts$1.state : _ref$state, _ref$extensionId = _ref.extensionId, extensionId = _ref$extensionId === void 0 ? defaultOpts$1.extensionId : _ref$extensionId, _ref$serializer = _ref.serializer, serializer = _ref$serializer === void 0 ? defaultOpts$1.serializer : _ref$serializer, _ref$deserializer = _ref.deserializer, deserializer = _ref$deserializer === void 0 ? defaultOpts$1.deserializer : _ref$deserializer, _ref$patchStrategy = _ref.patchStrategy, patchStrategy = _ref$patchStrategy === void 0 ? defaultOpts$1.patchStrategy : _ref$patchStrategy;
      _classCallCheck(this, Store2);
      if (!portName) {
        throw new Error("portName is required in options");
      }
      if (typeof serializer !== "function") {
        throw new Error("serializer must be a function");
      }
      if (typeof deserializer !== "function") {
        throw new Error("deserializer must be a function");
      }
      if (typeof patchStrategy !== "function") {
        throw new Error("patchStrategy must be one of the included patching strategies or a custom patching function");
      }
      this.portName = portName;
      this.readyResolved = false;
      this.readyPromise = new Promise(function(resolve) {
        return _this.readyResolve = resolve;
      });
      this.browserAPI = (0, _util$1.getBrowserAPI)();
      this.extensionId = extensionId;
      this.port = this.browserAPI.runtime.connect(this.extensionId, {
        name: portName
      });
      this.safetyHandler = this.safetyHandler.bind(this);
      if (this.browserAPI.runtime.onMessage) {
        this.safetyMessage = this.browserAPI.runtime.onMessage.addListener(this.safetyHandler);
      }
      this.serializedPortListener = (0, _serialization$1.withDeserializer)(deserializer)(function() {
        var _this$port$onMessage;
        return (_this$port$onMessage = _this.port.onMessage).addListener.apply(_this$port$onMessage, arguments);
      });
      this.serializedMessageSender = (0, _serialization$1.withSerializer)(serializer)(function() {
        var _this$browserAPI$runt;
        return (_this$browserAPI$runt = _this.browserAPI.runtime).sendMessage.apply(_this$browserAPI$runt, arguments);
      }, 1);
      this.listeners = [];
      this.state = state;
      this.patchStrategy = patchStrategy;
      this.serializedPortListener(function(message) {
        switch (message.type) {
          case _constants$2.STATE_TYPE:
            _this.replaceState(message.payload);
            if (!_this.readyResolved) {
              _this.readyResolved = true;
              _this.readyResolve();
            }
            break;
          case _constants$2.PATCH_STATE_TYPE:
            _this.patchState(message.payload);
            break;
        }
      });
      this.dispatch = this.dispatch.bind(this);
    }
    _createClass(Store2, [{
      key: "ready",
      value: function ready() {
        var cb = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if (cb !== null) {
          return this.readyPromise.then(cb);
        }
        return this.readyPromise;
      }
      /**
       * Subscribes a listener function for all state changes
       * @param  {function} listener A listener function to be called when store state changes
       * @return {function}          An unsubscribe function which can be called to remove the listener from state updates
       */
    }, {
      key: "subscribe",
      value: function subscribe(listener) {
        var _this2 = this;
        this.listeners.push(listener);
        return function() {
          _this2.listeners = _this2.listeners.filter(function(l2) {
            return l2 !== listener;
          });
        };
      }
      /**
       * Replaces the state for only the keys in the updated state. Notifies all listeners of state change.
       * @param {object} state the new (partial) redux state
       */
    }, {
      key: "patchState",
      value: function patchState(difference) {
        this.state = this.patchStrategy(this.state, difference);
        this.listeners.forEach(function(l2) {
          return l2();
        });
      }
      /**
       * Replace the current state with a new state. Notifies all listeners of state change.
       * @param  {object} state The new state for the store
       */
    }, {
      key: "replaceState",
      value: function replaceState(state) {
        this.state = state;
        this.listeners.forEach(function(l2) {
          return l2();
        });
      }
      /**
       * Get the current state of the store
       * @return {object} the current store state
       */
    }, {
      key: "getState",
      value: function getState2() {
        return this.state;
      }
      /**
       * Stub function to stay consistent with Redux Store API. No-op.
       */
    }, {
      key: "replaceReducer",
      value: function replaceReducer() {
        return;
      }
      /**
       * Dispatch an action to the background using messaging passing
       * @param  {object} data The action data to dispatch
       * @return {Promise}     Promise that will resolve/reject based on the action response from the background
       */
    }, {
      key: "dispatch",
      value: function dispatch(data) {
        var _this3 = this;
        return new Promise(function(resolve, reject) {
          _this3.serializedMessageSender(_this3.extensionId, {
            type: _constants$2.DISPATCH_TYPE,
            portName: _this3.portName,
            payload: data
          }, null, function(resp) {
            if (!resp) {
              var _error = _this3.browserAPI.runtime.lastError;
              var bgErr = new Error("".concat(backgroundErrPrefix).concat(_error));
              reject((0, _lodash.default)(bgErr, _error));
              return;
            }
            var error = resp.error, value = resp.value;
            if (error) {
              var _bgErr = new Error("".concat(backgroundErrPrefix).concat(error));
              reject((0, _lodash.default)(_bgErr, error));
            } else {
              resolve(value && value.payload);
            }
          });
        });
      }
    }, {
      key: "safetyHandler",
      value: function safetyHandler(message) {
        if (message.action === "storeReady" && message.portName === this.portName) {
          this.browserAPI.runtime.onMessage.removeListener(this.safetyHandler);
          if (!this.readyResolved) {
            this.readyResolved = true;
            this.readyResolve();
          }
        }
      }
    }]);
    return Store2;
  }();
  var _default$2 = Store;
  Store$1.default = _default$2;
  var applyMiddleware$1 = {};
  Object.defineProperty(applyMiddleware$1, "__esModule", {
    value: true
  });
  applyMiddleware$1.default = applyMiddleware;
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
      return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i2 = 0, arr2 = new Array(arr.length); i2 < arr.length; i2++) {
        arr2[i2] = arr[i2];
      }
      return arr2;
    }
  }
  function compose() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function(arg) {
        return arg;
      };
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce(function(a2, b2) {
      return function() {
        return a2(b2.apply(void 0, arguments));
      };
    });
  }
  function applyMiddleware(store) {
    for (var _len2 = arguments.length, middlewares = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      middlewares[_key2 - 1] = arguments[_key2];
    }
    var _dispatch = function dispatch() {
      throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    var middlewareAPI = {
      getState: store.getState.bind(store),
      dispatch: function dispatch() {
        return _dispatch.apply(void 0, arguments);
      }
    };
    middlewares = (middlewares || []).map(function(middleware) {
      return middleware(middlewareAPI);
    });
    _dispatch = compose.apply(void 0, _toConsumableArray(middlewares))(store.dispatch);
    store.dispatch = _dispatch;
    return store;
  }
  var wrapStore = {};
  var diff = {};
  Object.defineProperty(diff, "__esModule", {
    value: true
  });
  diff.default = shallowDiff;
  var _constants$1 = constants;
  function shallowDiff(oldObj, newObj) {
    var difference = [];
    Object.keys(newObj).forEach(function(key) {
      if (oldObj[key] !== newObj[key]) {
        difference.push({
          key,
          value: newObj[key],
          change: _constants$1.DIFF_STATUS_UPDATED
        });
      }
    });
    Object.keys(oldObj).forEach(function(key) {
      if (!newObj.hasOwnProperty(key)) {
        difference.push({
          key,
          change: _constants$1.DIFF_STATUS_REMOVED
        });
      }
    });
    return difference;
  }
  Object.defineProperty(wrapStore, "__esModule", {
    value: true
  });
  wrapStore.default = void 0;
  var _constants = constants$1;
  var _serialization = serialization;
  var _util = util;
  var _diff = _interopRequireDefault(diff);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var promiseResponder = function promiseResponder2(dispatchResult, send) {
    Promise.resolve(dispatchResult).then(function(res) {
      send({
        error: null,
        value: res
      });
    }).catch(function(err) {
      console.error("error dispatching result:", err);
      send({
        error: err.message,
        value: null
      });
    });
  };
  var defaultOpts = {
    portName: _constants.DEFAULT_PORT_NAME,
    dispatchResponder: promiseResponder,
    serializer: _serialization.noop,
    deserializer: _serialization.noop,
    diffStrategy: _diff.default
  };
  var _default$1 = function _default2(store) {
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultOpts, _ref$portName = _ref.portName, portName = _ref$portName === void 0 ? defaultOpts.portName : _ref$portName, _ref$dispatchResponde = _ref.dispatchResponder, dispatchResponder = _ref$dispatchResponde === void 0 ? defaultOpts.dispatchResponder : _ref$dispatchResponde, _ref$serializer = _ref.serializer, serializer = _ref$serializer === void 0 ? defaultOpts.serializer : _ref$serializer, _ref$deserializer = _ref.deserializer, deserializer = _ref$deserializer === void 0 ? defaultOpts.deserializer : _ref$deserializer, _ref$diffStrategy = _ref.diffStrategy, diffStrategy = _ref$diffStrategy === void 0 ? defaultOpts.diffStrategy : _ref$diffStrategy;
    if (!portName) {
      throw new Error("portName is required in options");
    }
    if (typeof serializer !== "function") {
      throw new Error("serializer must be a function");
    }
    if (typeof deserializer !== "function") {
      throw new Error("deserializer must be a function");
    }
    if (typeof diffStrategy !== "function") {
      throw new Error("diffStrategy must be one of the included diffing strategies or a custom diff function");
    }
    var browserAPI = (0, _util.getBrowserAPI)();
    var dispatchResponse = function dispatchResponse2(request, sender, sendResponse) {
      if (request.type === _constants.DISPATCH_TYPE && request.portName === portName) {
        var action = Object.assign({}, request.payload, {
          _sender: sender
        });
        var dispatchResult = null;
        try {
          dispatchResult = store.dispatch(action);
        } catch (e) {
          dispatchResult = Promise.reject(e.message);
          console.error(e);
        }
        dispatchResponder(dispatchResult, sendResponse);
        return true;
      }
    };
    var connectState = function connectState2(port) {
      if (port.name !== portName) {
        return;
      }
      var serializedMessagePoster = (0, _serialization.withSerializer)(serializer)(function() {
        return port.postMessage.apply(port, arguments);
      });
      var prevState = store.getState();
      var patchState = function patchState2() {
        var state = store.getState();
        var diff2 = diffStrategy(prevState, state);
        if (diff2.length) {
          prevState = state;
          serializedMessagePoster({
            type: _constants.PATCH_STATE_TYPE,
            payload: diff2
          });
        }
      };
      var unsubscribe = store.subscribe(patchState);
      port.onDisconnect.addListener(unsubscribe);
      serializedMessagePoster({
        type: _constants.STATE_TYPE,
        payload: prevState
      });
    };
    var withPayloadDeserializer = (0, _serialization.withDeserializer)(deserializer);
    var shouldDeserialize = function shouldDeserialize2(request) {
      return request.type === _constants.DISPATCH_TYPE && request.portName === portName;
    };
    withPayloadDeserializer(function() {
      var _browserAPI$runtime$o;
      return (_browserAPI$runtime$o = browserAPI.runtime.onMessage).addListener.apply(_browserAPI$runtime$o, arguments);
    })(dispatchResponse, shouldDeserialize);
    if (browserAPI.runtime.onMessageExternal) {
      withPayloadDeserializer(function() {
        var _browserAPI$runtime$o2;
        return (_browserAPI$runtime$o2 = browserAPI.runtime.onMessageExternal).addListener.apply(_browserAPI$runtime$o2, arguments);
      })(dispatchResponse, shouldDeserialize);
    } else {
      console.warn("runtime.onMessageExternal is not supported");
    }
    browserAPI.runtime.onConnect.addListener(connectState);
    if (browserAPI.runtime.onConnectExternal) {
      browserAPI.runtime.onConnectExternal.addListener(connectState);
    } else {
      console.warn("runtime.onConnectExternal is not supported");
    }
    browserAPI.tabs.query({}, function(tabs) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = void 0;
      try {
        for (var _iterator = tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tab = _step.value;
          browserAPI.tabs.sendMessage(tab.id, {
            action: "storeReady",
            portName
          }, function() {
            if (chrome.runtime.lastError) {
            }
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  };
  wrapStore.default = _default$1;
  var alias = {};
  Object.defineProperty(alias, "__esModule", {
    value: true
  });
  alias.default = void 0;
  var _default = function _default2(aliases) {
    return function() {
      return function(next) {
        return function(action) {
          var alias2 = aliases[action.type];
          if (alias2) {
            return next(alias2(action));
          }
          return next(action);
        };
      };
    };
  };
  alias.default = _default;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Store", {
      enumerable: true,
      get: function get() {
        return _Store.default;
      }
    });
    Object.defineProperty(exports, "applyMiddleware", {
      enumerable: true,
      get: function get() {
        return _applyMiddleware.default;
      }
    });
    Object.defineProperty(exports, "wrapStore", {
      enumerable: true,
      get: function get() {
        return _wrapStore.default;
      }
    });
    Object.defineProperty(exports, "alias", {
      enumerable: true,
      get: function get() {
        return _alias.default;
      }
    });
    var _Store = _interopRequireDefault2(Store$1);
    var _applyMiddleware = _interopRequireDefault2(applyMiddleware$1);
    var _wrapStore = _interopRequireDefault2(wrapStore);
    var _alias = _interopRequireDefault2(alias);
    function _interopRequireDefault2(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  })(lib);
  var browserPolyfill = { exports: {} };
  (function(module, exports) {
    (function(global2, factory) {
      {
        factory(module);
      }
    })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module2) {
      if (!globalThis.chrome?.runtime?.id) {
        throw new Error("This script should only be loaded in a browser extension.");
      }
      if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
        const wrapAPIs = (extensionAPIs) => {
          const apiMetadata = {
            "alarms": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "clearAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "bookmarks": {
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getChildren": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getRecent": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getSubTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTree": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "browserAction": {
              "disable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "enable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "getBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getBadgeText": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "openPopup": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setBadgeText": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "browsingData": {
              "remove": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "removeCache": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCookies": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeDownloads": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFormData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeHistory": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeLocalStorage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePasswords": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePluginData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "settings": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "commands": {
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "contextMenus": {
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "cookies": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAllCookieStores": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "devtools": {
              "inspectedWindow": {
                "eval": {
                  "minArgs": 1,
                  "maxArgs": 2,
                  "singleCallbackArg": false
                }
              },
              "panels": {
                "create": {
                  "minArgs": 3,
                  "maxArgs": 3,
                  "singleCallbackArg": true
                },
                "elements": {
                  "createSidebarPane": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              }
            },
            "downloads": {
              "cancel": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "download": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "erase": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFileIcon": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "open": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "pause": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFile": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "resume": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "extension": {
              "isAllowedFileSchemeAccess": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "isAllowedIncognitoAccess": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "history": {
              "addUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "deleteRange": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getVisits": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "i18n": {
              "detectLanguage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAcceptLanguages": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "identity": {
              "launchWebAuthFlow": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "idle": {
              "queryState": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "management": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getSelf": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setEnabled": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "uninstallSelf": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "notifications": {
              "clear": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPermissionLevel": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "pageAction": {
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "hide": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "permissions": {
              "contains": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "request": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "runtime": {
              "getBackgroundPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPlatformInfo": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "openOptionsPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "requestUpdateCheck": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "sendMessage": {
                "minArgs": 1,
                "maxArgs": 3
              },
              "sendNativeMessage": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "setUninstallURL": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "sessions": {
              "getDevices": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getRecentlyClosed": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "restore": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "storage": {
              "local": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "managed": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "sync": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              }
            },
            "tabs": {
              "captureVisibleTab": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "detectLanguage": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "discard": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "duplicate": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "executeScript": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getZoom": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getZoomSettings": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goBack": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goForward": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "highlight": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "insertCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "query": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "reload": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "sendMessage": {
                "minArgs": 2,
                "maxArgs": 3
              },
              "setZoom": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "setZoomSettings": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "update": {
                "minArgs": 1,
                "maxArgs": 2
              }
            },
            "topSites": {
              "get": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "webNavigation": {
              "getAllFrames": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFrame": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "webRequest": {
              "handlerBehaviorChanged": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "windows": {
              "create": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getLastFocused": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            }
          };
          if (Object.keys(apiMetadata).length === 0) {
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          }
          class DefaultWeakMap extends WeakMap {
            constructor(createItem, items = void 0) {
              super(items);
              this.createItem = createItem;
            }
            get(key) {
              if (!this.has(key)) {
                this.set(key, this.createItem(key));
              }
              return super.get(key);
            }
          }
          const isThenable2 = (value) => {
            return value && typeof value === "object" && typeof value.then === "function";
          };
          const makeCallback = (promise2, metadata) => {
            return (...callbackArgs) => {
              if (extensionAPIs.runtime.lastError) {
                promise2.reject(new Error(extensionAPIs.runtime.lastError.message));
              } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                promise2.resolve(callbackArgs[0]);
              } else {
                promise2.resolve(callbackArgs);
              }
            };
          };
          const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
          const wrapAsyncFunction = (name, metadata) => {
            return function asyncFunctionWrapper(target, ...args) {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                if (metadata.fallbackToNoCallback) {
                  try {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  } catch (cbError) {
                    console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                    target[name](...args);
                    metadata.fallbackToNoCallback = false;
                    metadata.noCallback = true;
                    resolve();
                  }
                } else if (metadata.noCallback) {
                  target[name](...args);
                  resolve();
                } else {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                }
              });
            };
          };
          const wrapMethod = (target, method, wrapper) => {
            return new Proxy(method, {
              apply(targetMethod, thisObj, args) {
                return wrapper.call(thisObj, target, ...args);
              }
            });
          };
          let hasOwnProperty2 = Function.call.bind(Object.prototype.hasOwnProperty);
          const wrapObject = (target, wrappers = {}, metadata = {}) => {
            let cache = /* @__PURE__ */ Object.create(null);
            let handlers = {
              has(proxyTarget2, prop) {
                return prop in target || prop in cache;
              },
              get(proxyTarget2, prop, receiver) {
                if (prop in cache) {
                  return cache[prop];
                }
                if (!(prop in target)) {
                  return void 0;
                }
                let value = target[prop];
                if (typeof value === "function") {
                  if (typeof wrappers[prop] === "function") {
                    value = wrapMethod(target, target[prop], wrappers[prop]);
                  } else if (hasOwnProperty2(metadata, prop)) {
                    let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                    value = wrapMethod(target, target[prop], wrapper);
                  } else {
                    value = value.bind(target);
                  }
                } else if (typeof value === "object" && value !== null && (hasOwnProperty2(wrappers, prop) || hasOwnProperty2(metadata, prop))) {
                  value = wrapObject(value, wrappers[prop], metadata[prop]);
                } else if (hasOwnProperty2(metadata, "*")) {
                  value = wrapObject(value, wrappers[prop], metadata["*"]);
                } else {
                  Object.defineProperty(cache, prop, {
                    configurable: true,
                    enumerable: true,
                    get() {
                      return target[prop];
                    },
                    set(value2) {
                      target[prop] = value2;
                    }
                  });
                  return value;
                }
                cache[prop] = value;
                return value;
              },
              set(proxyTarget2, prop, value, receiver) {
                if (prop in cache) {
                  cache[prop] = value;
                } else {
                  target[prop] = value;
                }
                return true;
              },
              defineProperty(proxyTarget2, prop, desc) {
                return Reflect.defineProperty(cache, prop, desc);
              },
              deleteProperty(proxyTarget2, prop) {
                return Reflect.deleteProperty(cache, prop);
              }
            };
            let proxyTarget = Object.create(target);
            return new Proxy(proxyTarget, handlers);
          };
          const wrapEvent = (wrapperMap) => ({
            addListener(target, listener, ...args) {
              target.addListener(wrapperMap.get(listener), ...args);
            },
            hasListener(target, listener) {
              return target.hasListener(wrapperMap.get(listener));
            },
            removeListener(target, listener) {
              target.removeListener(wrapperMap.get(listener));
            }
          });
          const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onRequestFinished(req) {
              const wrappedReq = wrapObject(
                req,
                {},
                {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                }
              );
              listener(wrappedReq);
            };
          });
          const onMessageWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onMessage(message, sender, sendResponse) {
              let didCallSendResponse = false;
              let wrappedSendResponse;
              let sendResponsePromise = new Promise((resolve) => {
                wrappedSendResponse = function(response) {
                  didCallSendResponse = true;
                  resolve(response);
                };
              });
              let result;
              try {
                result = listener(message, sender, wrappedSendResponse);
              } catch (err) {
                result = Promise.reject(err);
              }
              const isResultThenable = result !== true && isThenable2(result);
              if (result !== true && !isResultThenable && !didCallSendResponse) {
                return false;
              }
              const sendPromisedResult = (promise2) => {
                promise2.then((msg) => {
                  sendResponse(msg);
                }, (error) => {
                  let message2;
                  if (error && (error instanceof Error || typeof error.message === "string")) {
                    message2 = error.message;
                  } else {
                    message2 = "An unexpected error occurred";
                  }
                  sendResponse({
                    __mozWebExtensionPolyfillReject__: true,
                    message: message2
                  });
                }).catch((err) => {
                  console.error("Failed to send onMessage rejected reply", err);
                });
              };
              if (isResultThenable) {
                sendPromisedResult(result);
              } else {
                sendPromisedResult(sendResponsePromise);
              }
              return true;
            };
          });
          const wrappedSendMessageCallback = ({
            reject,
            resolve
          }, reply) => {
            if (extensionAPIs.runtime.lastError) {
              if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                resolve();
              } else {
                reject(new Error(extensionAPIs.runtime.lastError.message));
              }
            } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
              reject(new Error(reply.message));
            } else {
              resolve(reply);
            }
          };
          const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }
            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }
            return new Promise((resolve, reject) => {
              const wrappedCb = wrappedSendMessageCallback.bind(null, {
                resolve,
                reject
              });
              args.push(wrappedCb);
              apiNamespaceObj.sendMessage(...args);
            });
          };
          const staticWrappers = {
            devtools: {
              network: {
                onRequestFinished: wrapEvent(onRequestFinishedWrappers)
              }
            },
            runtime: {
              onMessage: wrapEvent(onMessageWrappers),
              onMessageExternal: wrapEvent(onMessageWrappers),
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          };
          const settingMetadata = {
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
          apiMetadata.privacy = {
            network: {
              "*": settingMetadata
            },
            services: {
              "*": settingMetadata
            },
            websites: {
              "*": settingMetadata
            }
          };
          return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        };
        module2.exports = wrapAPIs(chrome);
      } else {
        module2.exports = globalThis.browser;
      }
    });
  })(browserPolyfill);
  var browserPolyfillExports = browserPolyfill.exports;
  function addPlaylistListener(store) {
    browserPolyfillExports.webRequest.onResponseStarted.addListener(
      async (details) => {
        if (details.tabId < 0) {
          return;
        }
        const tab = await browserPolyfillExports.tabs.get(details.tabId);
        const action = browserPolyfillExports.browserAction || browserPolyfillExports.action;
        await action.setIcon({
          tabId: tab.id,
          path: {
            "16": "assets/icons/16-new.png",
            "48": "assets/icons/48-new.png",
            "128": "assets/icons/128-new.png",
            "256": "assets/icons/256-new.png"
          }
        });
        store.dispatch(
          playlistsSlice.actions.addPlaylist({
            id: details.url,
            uri: details.url,
            initiator: tab.url,
            pageTitle: tab.title,
            createdAt: Date.now()
          })
        );
      },
      {
        types: ["xmlhttprequest"],
        urls: [
          "http://*/*.m3u8",
          "https://*/*.m3u8",
          "http://*/*.m3u8?*",
          "https://*/*.m3u8?*"
        ]
      }
    );
  }
  function setTabListener(store) {
    browserPolyfillExports.tabs.onActivated.addListener(async (details) => {
      store.dispatch(
        tabsSlice.actions.setTab({
          tab: {
            id: details.tabId
          }
        })
      );
    });
  }
  function subscribeListeners(store) {
    setTabListener(store);
    addPlaylistListener(store);
  }
  async function saveState(state) {
    if (!state) {
      return;
    }
    await browserPolyfillExports.storage.local.set({ state });
  }
  async function getState() {
    const res = await browserPolyfillExports.storage.local.get(["state"]);
    const state = res.state;
    if (!state) {
      return;
    }
    return {
      config: state.config
    };
  }
  async function decrypt(data, keyData, iv) {
    const rawKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      "aes-cbc",
      false,
      ["decrypt"]
    );
    const decryptData = await crypto.subtle.decrypt(
      {
        name: "aes-cbc",
        iv
      },
      rawKey,
      data
    );
    return decryptData;
  }
  const CryptoDecryptor = {
    decrypt
  };
  async function fetchWithRetry(fetchFn, attempts = 1) {
    if (attempts < 1) {
      throw new Error("Attempts less then 1");
    }
    let countdown = attempts;
    let retryTime = 100;
    while (countdown--) {
      try {
        return await fetchFn();
      } catch (e) {
        if (countdown < 1 && countdown < attempts) {
          await new Promise((resolve) => setTimeout(resolve, retryTime));
          retryTime *= 1.15;
        }
      }
    }
    throw new Error("Fetch error");
  }
  async function fetchText(url, attempts = 1) {
    const fetchFn = () => fetch(url).then((res) => res.text());
    return fetchWithRetry(fetchFn, attempts);
  }
  async function fetchArrayBuffer(url, attempts = 1) {
    const fetchFn = () => fetch(url).then((res) => res.arrayBuffer());
    return fetchWithRetry(fetchFn, attempts);
  }
  const FetchLoader = {
    fetchText,
    fetchArrayBuffer
  };
  const instanceOfAny = (object, constructors) => constructors.some((c2) => object instanceof c2);
  let idbProxyableTypes;
  let cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction
    ]);
  }
  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ]);
  }
  const cursorRequestMap = /* @__PURE__ */ new WeakMap();
  const transactionDoneMap = /* @__PURE__ */ new WeakMap();
  const transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
  const transformCache = /* @__PURE__ */ new WeakMap();
  const reverseTransformCache = /* @__PURE__ */ new WeakMap();
  function promisifyRequest(request) {
    const promise2 = new Promise((resolve, reject) => {
      const unlisten = () => {
        request.removeEventListener("success", success);
        request.removeEventListener("error", error);
      };
      const success = () => {
        resolve(wrap(request.result));
        unlisten();
      };
      const error = () => {
        reject(request.error);
        unlisten();
      };
      request.addEventListener("success", success);
      request.addEventListener("error", error);
    });
    promise2.then((value) => {
      if (value instanceof IDBCursor) {
        cursorRequestMap.set(value, request);
      }
    }).catch(() => {
    });
    reverseTransformCache.set(promise2, request);
    return promise2;
  }
  function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx))
      return;
    const done = new Promise((resolve, reject) => {
      const unlisten = () => {
        tx.removeEventListener("complete", complete);
        tx.removeEventListener("error", error);
        tx.removeEventListener("abort", error);
      };
      const complete = () => {
        resolve();
        unlisten();
      };
      const error = () => {
        reject(tx.error || new DOMException("AbortError", "AbortError"));
        unlisten();
      };
      tx.addEventListener("complete", complete);
      tx.addEventListener("error", error);
      tx.addEventListener("abort", error);
    });
    transactionDoneMap.set(tx, done);
  }
  let idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        if (prop === "done")
          return transactionDoneMap.get(target);
        if (prop === "objectStoreNames") {
          return target.objectStoreNames || transactionStoreNamesMap.get(target);
        }
        if (prop === "store") {
          return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
        return true;
      }
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
      return function(storeNames, ...args) {
        const tx = func.call(unwrap(this), storeNames, ...args);
        transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
        return wrap(tx);
      };
    }
    if (getCursorAdvanceMethods().includes(func)) {
      return function(...args) {
        func.apply(unwrap(this), args);
        return wrap(cursorRequestMap.get(this));
      };
    }
    return function(...args) {
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function")
      return wrapFunction(value);
    if (value instanceof IDBTransaction)
      cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest)
      return promisifyRequest(value);
    if (transformCache.has(value))
      return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  const unwrap = (value) => reverseTransformCache.get(value);
  function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
      });
    }
    if (blocked)
      request.addEventListener("blocked", () => blocked());
    openPromise.then((db) => {
      if (terminated)
        db.addEventListener("close", () => terminated());
      if (blocking)
        db.addEventListener("versionchange", () => blocking());
    }).catch(() => {
    });
    return openPromise;
  }
  function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
      request.addEventListener("blocked", () => blocked());
    return wrap(request).then(() => void 0);
  }
  const readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  const writeMethods = ["put", "add", "delete", "clear"];
  const cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
      return;
    }
    if (cachedMethods.get(prop))
      return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
      // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
      !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
    ) {
      return;
    }
    const method = async function(storeName, ...args) {
      const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target2 = tx.store;
      if (useIndex)
        target2 = target2.index(args.shift());
      return (await Promise.all([
        target2[targetFuncName](...args),
        isWrite && tx.done
      ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  }));
  function filenameReservedRegex() {
    return /[<>:"/\\|?*\u0000-\u001F]/g;
  }
  function windowsReservedNameRegex() {
    return /^(con|prn|aux|nul|com\d|lpt\d)$/i;
  }
  const MAX_FILENAME_LENGTH = 100;
  const reRelativePath = /^\.+(\\|\/)|^\.+$/;
  const reTrailingPeriods = /\.+$/;
  function filenamify(string, options = {}) {
    const reControlChars = /[\u0000-\u001F\u0080-\u009F]/g;
    const reRepeatedReservedCharacters = /([<>:"/\\|?*\u0000-\u001F]){2,}/g;
    if (typeof string !== "string") {
      throw new TypeError("Expected a string");
    }
    const replacement = options.replacement === void 0 ? "!" : options.replacement;
    if (filenameReservedRegex().test(replacement) && reControlChars.test(replacement)) {
      throw new Error("Replacement string cannot contain reserved filename characters");
    }
    if (replacement.length > 0) {
      string = string.replace(reRepeatedReservedCharacters, "$1");
    }
    string = string.normalize("NFD");
    string = string.replace(reRelativePath, replacement);
    string = string.replace(filenameReservedRegex(), replacement);
    string = string.replace(reControlChars, replacement);
    string = string.replace(reTrailingPeriods, "");
    if (replacement.length > 0) {
      const startedWithDot = string[0] === ".";
      if (!startedWithDot && string[0] === ".") {
        string = replacement + string;
      }
      if (string[string.length - 1] === ".") {
        string += replacement;
      }
    }
    string = windowsReservedNameRegex().test(string) ? string + replacement : string;
    const allowedLength = typeof options.maxLength === "number" ? options.maxLength : MAX_FILENAME_LENGTH;
    if (string.length > allowedLength) {
      const extensionIndex = string.lastIndexOf(".");
      if (extensionIndex === -1) {
        string = string.slice(0, allowedLength);
      } else {
        const filename = string.slice(0, extensionIndex);
        const extension = string.slice(extensionIndex);
        string = filename.slice(0, Math.max(1, allowedLength - extension.length)) + extension;
      }
    }
    return string;
  }
  var FFMessageType;
  (function(FFMessageType2) {
    FFMessageType2["LOAD"] = "LOAD";
    FFMessageType2["EXEC"] = "EXEC";
    FFMessageType2["WRITE_FILE"] = "WRITE_FILE";
    FFMessageType2["READ_FILE"] = "READ_FILE";
    FFMessageType2["DELETE_FILE"] = "DELETE_FILE";
    FFMessageType2["RENAME"] = "RENAME";
    FFMessageType2["CREATE_DIR"] = "CREATE_DIR";
    FFMessageType2["LIST_DIR"] = "LIST_DIR";
    FFMessageType2["DELETE_DIR"] = "DELETE_DIR";
    FFMessageType2["ERROR"] = "ERROR";
    FFMessageType2["DOWNLOAD"] = "DOWNLOAD";
    FFMessageType2["PROGRESS"] = "PROGRESS";
    FFMessageType2["LOG"] = "LOG";
    FFMessageType2["MOUNT"] = "MOUNT";
    FFMessageType2["UNMOUNT"] = "UNMOUNT";
  })(FFMessageType || (FFMessageType = {}));
  const getMessageID = /* @__PURE__ */ (() => {
    let messageID = 0;
    return () => messageID++;
  })();
  const ERROR_NOT_LOADED = new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first");
  const ERROR_TERMINATED = new Error("called FFmpeg.terminate()");
  class FFmpeg {
    #worker = null;
    /**
     * #resolves and #rejects tracks Promise resolves and rejects to
     * be called when we receive message from web worker.
     */
    #resolves = {};
    #rejects = {};
    #logEventCallbacks = [];
    #progressEventCallbacks = [];
    loaded = false;
    /**
     * register worker message event handlers.
     */
    #registerHandlers = () => {
      if (this.#worker) {
        this.#worker.onmessage = ({ data: { id, type, data } }) => {
          switch (type) {
            case FFMessageType.LOAD:
              this.loaded = true;
              this.#resolves[id](data);
              break;
            case FFMessageType.MOUNT:
            case FFMessageType.UNMOUNT:
            case FFMessageType.EXEC:
            case FFMessageType.WRITE_FILE:
            case FFMessageType.READ_FILE:
            case FFMessageType.DELETE_FILE:
            case FFMessageType.RENAME:
            case FFMessageType.CREATE_DIR:
            case FFMessageType.LIST_DIR:
            case FFMessageType.DELETE_DIR:
              this.#resolves[id](data);
              break;
            case FFMessageType.LOG:
              this.#logEventCallbacks.forEach((f2) => f2(data));
              break;
            case FFMessageType.PROGRESS:
              this.#progressEventCallbacks.forEach((f2) => f2(data));
              break;
            case FFMessageType.ERROR:
              this.#rejects[id](data);
              break;
          }
          delete this.#resolves[id];
          delete this.#rejects[id];
        };
      }
    };
    /**
     * Generic function to send messages to web worker.
     */
    #send = ({ type, data }, trans = [], signal) => {
      if (!this.#worker) {
        return Promise.reject(ERROR_NOT_LOADED);
      }
      return new Promise((resolve, reject) => {
        const id = getMessageID();
        this.#worker && this.#worker.postMessage({ id, type, data }, trans);
        this.#resolves[id] = resolve;
        this.#rejects[id] = reject;
        signal?.addEventListener("abort", () => {
          reject(new DOMException(`Message # ${id} was aborted`, "AbortError"));
        }, { once: true });
      });
    };
    on(event, callback) {
      if (event === "log") {
        this.#logEventCallbacks.push(callback);
      } else if (event === "progress") {
        this.#progressEventCallbacks.push(callback);
      }
    }
    off(event, callback) {
      if (event === "log") {
        this.#logEventCallbacks = this.#logEventCallbacks.filter((f2) => f2 !== callback);
      } else if (event === "progress") {
        this.#progressEventCallbacks = this.#progressEventCallbacks.filter((f2) => f2 !== callback);
      }
    }
    /**
     * Loads ffmpeg-core inside web worker. It is required to call this method first
     * as it initializes WebAssembly and other essential variables.
     *
     * @category FFmpeg
     * @returns `true` if ffmpeg core is loaded for the first time.
     */
    load = ({ classWorkerURL, ...config2 } = {}, { signal } = {}) => {
      if (!this.#worker) {
        this.#worker = classWorkerURL ? new Worker(new URL(classWorkerURL, typeof document === "undefined" && typeof location === "undefined" ? require("url").pathToFileURL(__filename).href : typeof document === "undefined" ? location.href : _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("background.js", document.baseURI).href), {
          type: "module"
        }) : (
          // We need to duplicated the code here to enable webpack
          // to bundle worekr.js here.
          new Worker(new URL("/assets/worker-3nePXDJu.js", typeof document === "undefined" && typeof location === "undefined" ? require("url").pathToFileURL(__filename).href : typeof document === "undefined" ? location.href : _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("background.js", document.baseURI).href), {
            type: "module"
          })
        );
        this.#registerHandlers();
      }
      return this.#send({
        type: FFMessageType.LOAD,
        data: config2
      }, void 0, signal);
    };
    /**
     * Execute ffmpeg command.
     *
     * @remarks
     * To avoid common I/O issues, ["-nostdin", "-y"] are prepended to the args
     * by default.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", ...);
     * // ffmpeg -i video.avi video.mp4
     * await ffmpeg.exec(["-i", "video.avi", "video.mp4"]);
     * const data = ffmpeg.readFile("video.mp4");
     * ```
     *
     * @returns `0` if no error, `!= 0` if timeout (1) or error.
     * @category FFmpeg
     */
    exec = (args, timeout = -1, { signal } = {}) => this.#send({
      type: FFMessageType.EXEC,
      data: { args, timeout }
    }, void 0, signal);
    /**
     * Terminate all ongoing API calls and terminate web worker.
     * `FFmpeg.load()` must be called again before calling any other APIs.
     *
     * @category FFmpeg
     */
    terminate = () => {
      const ids = Object.keys(this.#rejects);
      for (const id of ids) {
        this.#rejects[id](ERROR_TERMINATED);
        delete this.#rejects[id];
        delete this.#resolves[id];
      }
      if (this.#worker) {
        this.#worker.terminate();
        this.#worker = null;
        this.loaded = false;
      }
    };
    /**
     * Write data to ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * await ffmpeg.writeFile("video.avi", await fetchFile("../video.avi"));
     * await ffmpeg.writeFile("text.txt", "hello world");
     * ```
     *
     * @category File System
     */
    writeFile = (path, data, { signal } = {}) => {
      const trans = [];
      if (data instanceof Uint8Array) {
        trans.push(data.buffer);
      }
      return this.#send({
        type: FFMessageType.WRITE_FILE,
        data: { path, data }
      }, trans, signal);
    };
    mount = (fsType, options, mountPoint) => {
      const trans = [];
      return this.#send({
        type: FFMessageType.MOUNT,
        data: { fsType, options, mountPoint }
      }, trans);
    };
    unmount = (mountPoint) => {
      const trans = [];
      return this.#send({
        type: FFMessageType.UNMOUNT,
        data: { mountPoint }
      }, trans);
    };
    /**
     * Read data from ffmpeg.wasm.
     *
     * @example
     * ```ts
     * const ffmpeg = new FFmpeg();
     * await ffmpeg.load();
     * const data = await ffmpeg.readFile("video.mp4");
     * ```
     *
     * @category File System
     */
    readFile = (path, encoding = "binary", { signal } = {}) => this.#send({
      type: FFMessageType.READ_FILE,
      data: { path, encoding }
    }, void 0, signal);
    /**
     * Delete a file.
     *
     * @category File System
     */
    deleteFile = (path, { signal } = {}) => this.#send({
      type: FFMessageType.DELETE_FILE,
      data: { path }
    }, void 0, signal);
    /**
     * Rename a file or directory.
     *
     * @category File System
     */
    rename = (oldPath, newPath, { signal } = {}) => this.#send({
      type: FFMessageType.RENAME,
      data: { oldPath, newPath }
    }, void 0, signal);
    /**
     * Create a directory.
     *
     * @category File System
     */
    createDir = (path, { signal } = {}) => this.#send({
      type: FFMessageType.CREATE_DIR,
      data: { path }
    }, void 0, signal);
    /**
     * List directory contents.
     *
     * @category File System
     */
    listDir = (path, { signal } = {}) => this.#send({
      type: FFMessageType.LIST_DIR,
      data: { path }
    }, void 0, signal);
    /**
     * Delete an empty directory.
     *
     * @category File System
     */
    deleteDir = (path, { signal } = {}) => this.#send({
      type: FFMessageType.DELETE_DIR,
      data: { path }
    }, void 0, signal);
  }
  const readFromBlobOrFile = (blob) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const { result } = fileReader;
      if (result instanceof ArrayBuffer) {
        resolve(new Uint8Array(result));
      } else {
        resolve(new Uint8Array());
      }
    };
    fileReader.onerror = (event) => {
      reject(Error(`File could not be read! Code=${event?.target?.error?.code || -1}`));
    };
    fileReader.readAsArrayBuffer(blob);
  });
  const fetchFile = async (file) => {
    let data;
    if (typeof file === "string") {
      if (/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(file)) {
        data = atob(file.split(",")[1]).split("").map((c2) => c2.charCodeAt(0));
      } else {
        data = await (await fetch(file)).arrayBuffer();
      }
    } else if (file instanceof URL) {
      data = await (await fetch(file)).arrayBuffer();
    } else if (file instanceof File || file instanceof Blob) {
      data = await readFromBlobOrFile(file);
    } else {
      return new Uint8Array();
    }
    return new Uint8Array(data);
  };
  const buckets = {};
  const storageManager = /* @__PURE__ */ function() {
    let storage = {};
    return {
      setItem: function(key, value) {
        storage[key] = JSON.stringify(value);
      },
      getItem: function(key) {
        const value = storage[key];
        return value ? JSON.parse(value) : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      clear: function() {
        storage = {};
      }
    };
  }();
  class IndexedDBBucket {
    constructor(length, id) {
      this.length = length;
      this.id = id;
      this.fileName = "file";
      this.objectStoreName = "chunks";
    }
    async cleanup() {
      await this.deleteDB();
      this.ffmpeg.deleteFile(`${this.fileName}.mp4`);
      return;
    }
    async deleteDB() {
      if (!this.db) {
        throw Error();
      }
      this.db.close();
      await deleteDB(this.id);
      return;
    }
    async openDB() {
      const objectStoreName = this.objectStoreName;
      const db = await openDB(this.id, 1, {
        upgrade(db2) {
          const store = db2.createObjectStore(objectStoreName, {
            keyPath: "index"
          });
          store.createIndex("index", "index", { unique: true });
        }
      });
      const baseURL = "/assets/ffmpeg";
      this.ffmpeg = new FFmpeg();
      await this.ffmpeg.load({
        coreURL: `${baseURL}/ffmpeg-core.js`,
        wasmURL: `${baseURL}/ffmpeg-core.wasm`
      });
      this.db = db;
    }
    async write(index, data) {
      const typedArray = new Uint8Array(data);
      if (!this.db) {
        await this.openDB();
      }
      await this.db.add(this.objectStoreName, {
        data: typedArray,
        index
      });
      return Promise.resolve();
    }
    async stream() {
      if (!this.db) {
        throw Error();
      }
      const store = this.db.transaction(this.objectStoreName).objectStore(this.objectStoreName);
      let cursor = await store.openCursor();
      let first = true;
      return new ReadableStream(
        {
          pull: (controller) => {
            async function push(currentCursor) {
              if (!currentCursor) {
                controller.close();
              } else {
                controller.enqueue(currentCursor.value.data);
                const nextCursor = await currentCursor.continue();
                push(nextCursor);
              }
            }
            if (first) {
              push(cursor);
              first = false;
            }
          }
        },
        {}
      );
    }
    async getLink() {
      if (!this.db) {
        throw Error();
      }
      try {
        const mp4Blob = await this.streamToMp4Blob();
        const url = URL.createObjectURL(mp4Blob);
        return url;
      } catch (error) {
        console.error(error);
        return "";
      }
    }
    async streamToMp4Blob() {
      if (!this.db) {
        throw Error();
      }
      const stream = await this.stream();
      const response = new Response(stream, {
        headers: {
          "Content-Type": "video/mp2t"
        }
      });
      const blob = await response.blob();
      const file = await fetchFile(blob);
      await this.ffmpeg.writeFile(`${this.fileName}.ts`, file);
      await this.ffmpeg.exec([
        "-i",
        `${this.fileName}.ts`,
        "-acodec",
        "copy",
        "-vcodec",
        "copy",
        `${this.fileName}.mp4`
      ]);
      await this.ffmpeg.deleteFile(`${this.fileName}.ts`);
      const data = await this.ffmpeg.readFile(`${this.fileName}.mp4`);
      return new Blob([data], { type: "video/mp4" });
    }
  }
  const cleanup = async function() {
    const dbsString = storageManager.getItem("dbs");
    if (!dbsString) {
      return;
    }
    const dbNames = JSON.parse(dbsString);
    for (const dbName of dbNames) {
      const db = await openDB(dbName, 1);
      db.close();
      await deleteDB(dbName);
    }
  };
  const createBucket = async function(id, length) {
    buckets[id] = new IndexedDBBucket(length, id);
    storageManager.setItem("dbs", JSON.stringify(Object.keys(buckets)));
    return Promise.resolve();
  };
  const deleteBucket = async function(id) {
    await buckets[id].deleteDB();
    delete buckets[id];
    storageManager.setItem("dbs", JSON.stringify(Object.keys(buckets)));
    return Promise.resolve();
  };
  const getBucket = function(id) {
    return Promise.resolve(buckets[id]);
  };
  const saveAs = async function(path, link, { dialog }) {
    if (link === "") {
      return Promise.resolve();
    }
    window.URL = window.URL || window.webkitURL;
    const filename = filenamify(path ?? "stream.mp4");
    await browserPolyfillExports.downloads.download({
      url: link,
      saveAs: dialog,
      conflictAction: "uniquify",
      filename
    });
    return Promise.resolve();
  };
  const IndexedDBFS = {
    getBucket,
    createBucket,
    deleteBucket,
    saveAs,
    cleanup
  };
  var Stream = /* @__PURE__ */ function() {
    function Stream2() {
      this.listeners = {};
    }
    var _proto = Stream2.prototype;
    _proto.on = function on2(type, listener) {
      if (!this.listeners[type]) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(listener);
    };
    _proto.off = function off(type, listener) {
      if (!this.listeners[type]) {
        return false;
      }
      var index = this.listeners[type].indexOf(listener);
      this.listeners[type] = this.listeners[type].slice(0);
      this.listeners[type].splice(index, 1);
      return index > -1;
    };
    _proto.trigger = function trigger(type) {
      var callbacks = this.listeners[type];
      if (!callbacks) {
        return;
      }
      if (arguments.length === 2) {
        var length = callbacks.length;
        for (var i2 = 0; i2 < length; ++i2) {
          callbacks[i2].call(this, arguments[1]);
        }
      } else {
        var args = Array.prototype.slice.call(arguments, 1);
        var _length = callbacks.length;
        for (var _i = 0; _i < _length; ++_i) {
          callbacks[_i].apply(this, args);
        }
      }
    };
    _proto.dispose = function dispose() {
      this.listeners = {};
    };
    _proto.pipe = function pipe(destination) {
      this.on("data", function(data) {
        destination.push(data);
      });
    };
    return Stream2;
  }();
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var win;
  if (typeof window !== "undefined") {
    win = window;
  } else if (typeof commonjsGlobal !== "undefined") {
    win = commonjsGlobal;
  } else if (typeof self !== "undefined") {
    win = self;
  } else {
    win = {};
  }
  var window_1 = win;
  const window$1 = /* @__PURE__ */ getDefaultExportFromCjs(window_1);
  var atob$1 = function atob2(s2) {
    return window$1.atob ? window$1.atob(s2) : Buffer.from(s2, "base64").toString("binary");
  };
  function decodeB64ToUint8Array(b64Text) {
    var decodedString = atob$1(b64Text);
    var array = new Uint8Array(decodedString.length);
    for (var i2 = 0; i2 < decodedString.length; i2++) {
      array[i2] = decodedString.charCodeAt(i2);
    }
    return array;
  }
  /*! @name m3u8-parser @version 6.2.0 @license Apache-2.0 */
  class LineStream extends Stream {
    constructor() {
      super();
      this.buffer = "";
    }
    /**
     * Add new data to be parsed.
     *
     * @param {string} data the text to process
     */
    push(data) {
      let nextNewline;
      this.buffer += data;
      nextNewline = this.buffer.indexOf("\n");
      for (; nextNewline > -1; nextNewline = this.buffer.indexOf("\n")) {
        this.trigger("data", this.buffer.substring(0, nextNewline));
        this.buffer = this.buffer.substring(nextNewline + 1);
      }
    }
  }
  const TAB = String.fromCharCode(9);
  const parseByterange = function(byterangeString) {
    const match = /([0-9.]*)?@?([0-9.]*)?/.exec(byterangeString || "");
    const result = {};
    if (match[1]) {
      result.length = parseInt(match[1], 10);
    }
    if (match[2]) {
      result.offset = parseInt(match[2], 10);
    }
    return result;
  };
  const attributeSeparator = function() {
    const key = "[^=]*";
    const value = '"[^"]*"|[^,]*';
    const keyvalue = "(?:" + key + ")=(?:" + value + ")";
    return new RegExp("(?:^|,)(" + keyvalue + ")");
  };
  const parseAttributes = function(attributes) {
    const result = {};
    if (!attributes) {
      return result;
    }
    const attrs = attributes.split(attributeSeparator());
    let i2 = attrs.length;
    let attr;
    while (i2--) {
      if (attrs[i2] === "") {
        continue;
      }
      attr = /([^=]*)=(.*)/.exec(attrs[i2]).slice(1);
      attr[0] = attr[0].replace(/^\s+|\s+$/g, "");
      attr[1] = attr[1].replace(/^\s+|\s+$/g, "");
      attr[1] = attr[1].replace(/^['"](.*)['"]$/g, "$1");
      result[attr[0]] = attr[1];
    }
    return result;
  };
  class ParseStream extends Stream {
    constructor() {
      super();
      this.customParsers = [];
      this.tagMappers = [];
    }
    /**
     * Parses an additional line of input.
     *
     * @param {string} line a single line of an M3U8 file to parse
     */
    push(line) {
      let match;
      let event;
      line = line.trim();
      if (line.length === 0) {
        return;
      }
      if (line[0] !== "#") {
        this.trigger("data", {
          type: "uri",
          uri: line
        });
        return;
      }
      const newLines = this.tagMappers.reduce((acc, mapper) => {
        const mappedLine = mapper(line);
        if (mappedLine === line) {
          return acc;
        }
        return acc.concat([mappedLine]);
      }, [line]);
      newLines.forEach((newLine) => {
        for (let i2 = 0; i2 < this.customParsers.length; i2++) {
          if (this.customParsers[i2].call(this, newLine)) {
            return;
          }
        }
        if (newLine.indexOf("#EXT") !== 0) {
          this.trigger("data", {
            type: "comment",
            text: newLine.slice(1)
          });
          return;
        }
        newLine = newLine.replace("\r", "");
        match = /^#EXTM3U/.exec(newLine);
        if (match) {
          this.trigger("data", {
            type: "tag",
            tagType: "m3u"
          });
          return;
        }
        match = /^#EXTINF:([0-9\.]*)?,?(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "inf"
          };
          if (match[1]) {
            event.duration = parseFloat(match[1]);
          }
          if (match[2]) {
            event.title = match[2];
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-TARGETDURATION:([0-9.]*)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "targetduration"
          };
          if (match[1]) {
            event.duration = parseInt(match[1], 10);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-VERSION:([0-9.]*)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "version"
          };
          if (match[1]) {
            event.version = parseInt(match[1], 10);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-MEDIA-SEQUENCE:(\-?[0-9.]*)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "media-sequence"
          };
          if (match[1]) {
            event.number = parseInt(match[1], 10);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-DISCONTINUITY-SEQUENCE:(\-?[0-9.]*)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "discontinuity-sequence"
          };
          if (match[1]) {
            event.number = parseInt(match[1], 10);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-PLAYLIST-TYPE:(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "playlist-type"
          };
          if (match[1]) {
            event.playlistType = match[1];
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-BYTERANGE:(.*)?$/.exec(newLine);
        if (match) {
          event = _extends(parseByterange(match[1]), {
            type: "tag",
            tagType: "byterange"
          });
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-ALLOW-CACHE:(YES|NO)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "allow-cache"
          };
          if (match[1]) {
            event.allowed = !/NO/.test(match[1]);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-MAP:(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "map"
          };
          if (match[1]) {
            const attributes = parseAttributes(match[1]);
            if (attributes.URI) {
              event.uri = attributes.URI;
            }
            if (attributes.BYTERANGE) {
              event.byterange = parseByterange(attributes.BYTERANGE);
            }
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-STREAM-INF:(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "stream-inf"
          };
          if (match[1]) {
            event.attributes = parseAttributes(match[1]);
            if (event.attributes.RESOLUTION) {
              const split = event.attributes.RESOLUTION.split("x");
              const resolution = {};
              if (split[0]) {
                resolution.width = parseInt(split[0], 10);
              }
              if (split[1]) {
                resolution.height = parseInt(split[1], 10);
              }
              event.attributes.RESOLUTION = resolution;
            }
            if (event.attributes.BANDWIDTH) {
              event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
            }
            if (event.attributes["FRAME-RATE"]) {
              event.attributes["FRAME-RATE"] = parseFloat(event.attributes["FRAME-RATE"]);
            }
            if (event.attributes["PROGRAM-ID"]) {
              event.attributes["PROGRAM-ID"] = parseInt(event.attributes["PROGRAM-ID"], 10);
            }
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-MEDIA:(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "media"
          };
          if (match[1]) {
            event.attributes = parseAttributes(match[1]);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-ENDLIST/.exec(newLine);
        if (match) {
          this.trigger("data", {
            type: "tag",
            tagType: "endlist"
          });
          return;
        }
        match = /^#EXT-X-DISCONTINUITY/.exec(newLine);
        if (match) {
          this.trigger("data", {
            type: "tag",
            tagType: "discontinuity"
          });
          return;
        }
        match = /^#EXT-X-PROGRAM-DATE-TIME:(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "program-date-time"
          };
          if (match[1]) {
            event.dateTimeString = match[1];
            event.dateTimeObject = new Date(match[1]);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-KEY:(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "key"
          };
          if (match[1]) {
            event.attributes = parseAttributes(match[1]);
            if (event.attributes.IV) {
              if (event.attributes.IV.substring(0, 2).toLowerCase() === "0x") {
                event.attributes.IV = event.attributes.IV.substring(2);
              }
              event.attributes.IV = event.attributes.IV.match(/.{8}/g);
              event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
              event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
              event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
              event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
              event.attributes.IV = new Uint32Array(event.attributes.IV);
            }
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-START:(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "start"
          };
          if (match[1]) {
            event.attributes = parseAttributes(match[1]);
            event.attributes["TIME-OFFSET"] = parseFloat(event.attributes["TIME-OFFSET"]);
            event.attributes.PRECISE = /YES/.test(event.attributes.PRECISE);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-CUE-OUT-CONT:(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "cue-out-cont"
          };
          if (match[1]) {
            event.data = match[1];
          } else {
            event.data = "";
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-CUE-OUT:(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "cue-out"
          };
          if (match[1]) {
            event.data = match[1];
          } else {
            event.data = "";
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-CUE-IN:(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "cue-in"
          };
          if (match[1]) {
            event.data = match[1];
          } else {
            event.data = "";
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-SKIP:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "skip"
          };
          event.attributes = parseAttributes(match[1]);
          if (event.attributes.hasOwnProperty("SKIPPED-SEGMENTS")) {
            event.attributes["SKIPPED-SEGMENTS"] = parseInt(event.attributes["SKIPPED-SEGMENTS"], 10);
          }
          if (event.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")) {
            event.attributes["RECENTLY-REMOVED-DATERANGES"] = event.attributes["RECENTLY-REMOVED-DATERANGES"].split(TAB);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-PART:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "part"
          };
          event.attributes = parseAttributes(match[1]);
          ["DURATION"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseFloat(event.attributes[key]);
            }
          });
          ["INDEPENDENT", "GAP"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = /YES/.test(event.attributes[key]);
            }
          });
          if (event.attributes.hasOwnProperty("BYTERANGE")) {
            event.attributes.byterange = parseByterange(event.attributes.BYTERANGE);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-SERVER-CONTROL:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "server-control"
          };
          event.attributes = parseAttributes(match[1]);
          ["CAN-SKIP-UNTIL", "PART-HOLD-BACK", "HOLD-BACK"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseFloat(event.attributes[key]);
            }
          });
          ["CAN-SKIP-DATERANGES", "CAN-BLOCK-RELOAD"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = /YES/.test(event.attributes[key]);
            }
          });
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-PART-INF:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "part-inf"
          };
          event.attributes = parseAttributes(match[1]);
          ["PART-TARGET"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseFloat(event.attributes[key]);
            }
          });
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-PRELOAD-HINT:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "preload-hint"
          };
          event.attributes = parseAttributes(match[1]);
          ["BYTERANGE-START", "BYTERANGE-LENGTH"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseInt(event.attributes[key], 10);
              const subkey = key === "BYTERANGE-LENGTH" ? "length" : "offset";
              event.attributes.byterange = event.attributes.byterange || {};
              event.attributes.byterange[subkey] = event.attributes[key];
              delete event.attributes[key];
            }
          });
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-RENDITION-REPORT:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "rendition-report"
          };
          event.attributes = parseAttributes(match[1]);
          ["LAST-MSN", "LAST-PART"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseInt(event.attributes[key], 10);
            }
          });
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-DATERANGE:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "daterange"
          };
          event.attributes = parseAttributes(match[1]);
          ["ID", "CLASS"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = String(event.attributes[key]);
            }
          });
          ["START-DATE", "END-DATE"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = new Date(event.attributes[key]);
            }
          });
          ["DURATION", "PLANNED-DURATION"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseFloat(event.attributes[key]);
            }
          });
          ["END-ON-NEXT"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = /YES/i.test(event.attributes[key]);
            }
          });
          ["SCTE35-CMD", " SCTE35-OUT", "SCTE35-IN"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = event.attributes[key].toString(16);
            }
          });
          const clientAttributePattern = /^X-([A-Z]+-)+[A-Z]+$/;
          for (const key in event.attributes) {
            if (!clientAttributePattern.test(key)) {
              continue;
            }
            const isHexaDecimal = /[0-9A-Fa-f]{6}/g.test(event.attributes[key]);
            const isDecimalFloating = /^\d+(\.\d+)?$/.test(event.attributes[key]);
            event.attributes[key] = isHexaDecimal ? event.attributes[key].toString(16) : isDecimalFloating ? parseFloat(event.attributes[key]) : String(event.attributes[key]);
          }
          this.trigger("data", event);
          return;
        }
        match = /^#EXT-X-INDEPENDENT-SEGMENTS/.exec(newLine);
        if (match) {
          this.trigger("data", {
            type: "tag",
            tagType: "independent-segments"
          });
          return;
        }
        this.trigger("data", {
          type: "tag",
          data: newLine.slice(4)
        });
      });
    }
    /**
     * Add a parser for custom headers
     *
     * @param {Object}   options              a map of options for the added parser
     * @param {RegExp}   options.expression   a regular expression to match the custom header
     * @param {string}   options.customType   the custom type to register to the output
     * @param {Function} [options.dataParser] function to parse the line into an object
     * @param {boolean}  [options.segment]    should tag data be attached to the segment object
     */
    addParser({
      expression,
      customType,
      dataParser,
      segment
    }) {
      if (typeof dataParser !== "function") {
        dataParser = (line) => line;
      }
      this.customParsers.push((line) => {
        const match = expression.exec(line);
        if (match) {
          this.trigger("data", {
            type: "custom",
            data: dataParser(line),
            customType,
            segment
          });
          return true;
        }
      });
    }
    /**
     * Add a custom header mapper
     *
     * @param {Object}   options
     * @param {RegExp}   options.expression   a regular expression to match the custom header
     * @param {Function} options.map          function to translate tag into a different tag
     */
    addTagMapper({
      expression,
      map: map2
    }) {
      const mapFn = (line) => {
        if (expression.test(line)) {
          return map2(line);
        }
        return line;
      };
      this.tagMappers.push(mapFn);
    }
  }
  const camelCase = (str) => str.toLowerCase().replace(/-(\w)/g, (a2) => a2[1].toUpperCase());
  const camelCaseKeys = function(attributes) {
    const result = {};
    Object.keys(attributes).forEach(function(key) {
      result[camelCase(key)] = attributes[key];
    });
    return result;
  };
  const setHoldBack = function(manifest) {
    const {
      serverControl,
      targetDuration,
      partTargetDuration
    } = manifest;
    if (!serverControl) {
      return;
    }
    const tag = "#EXT-X-SERVER-CONTROL";
    const hb = "holdBack";
    const phb = "partHoldBack";
    const minTargetDuration = targetDuration && targetDuration * 3;
    const minPartDuration = partTargetDuration && partTargetDuration * 2;
    if (targetDuration && !serverControl.hasOwnProperty(hb)) {
      serverControl[hb] = minTargetDuration;
      this.trigger("info", {
        message: `${tag} defaulting HOLD-BACK to targetDuration * 3 (${minTargetDuration}).`
      });
    }
    if (minTargetDuration && serverControl[hb] < minTargetDuration) {
      this.trigger("warn", {
        message: `${tag} clamping HOLD-BACK (${serverControl[hb]}) to targetDuration * 3 (${minTargetDuration})`
      });
      serverControl[hb] = minTargetDuration;
    }
    if (partTargetDuration && !serverControl.hasOwnProperty(phb)) {
      serverControl[phb] = partTargetDuration * 3;
      this.trigger("info", {
        message: `${tag} defaulting PART-HOLD-BACK to partTargetDuration * 3 (${serverControl[phb]}).`
      });
    }
    if (partTargetDuration && serverControl[phb] < minPartDuration) {
      this.trigger("warn", {
        message: `${tag} clamping PART-HOLD-BACK (${serverControl[phb]}) to partTargetDuration * 2 (${minPartDuration}).`
      });
      serverControl[phb] = minPartDuration;
    }
  };
  class Parser extends Stream {
    constructor() {
      super();
      this.lineStream = new LineStream();
      this.parseStream = new ParseStream();
      this.lineStream.pipe(this.parseStream);
      const self2 = this;
      const uris = [];
      let currentUri = {};
      let currentMap;
      let key;
      let hasParts = false;
      const noop2 = function() {
      };
      const defaultMediaGroups = {
        "AUDIO": {},
        "VIDEO": {},
        "CLOSED-CAPTIONS": {},
        "SUBTITLES": {}
      };
      const widevineUuid = "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";
      let currentTimeline = 0;
      this.manifest = {
        allowCache: true,
        discontinuityStarts: [],
        segments: []
      };
      let lastByterangeEnd = 0;
      let lastPartByterangeEnd = 0;
      const daterangeTags = {};
      this.on("end", () => {
        if (currentUri.uri || !currentUri.parts && !currentUri.preloadHints) {
          return;
        }
        if (!currentUri.map && currentMap) {
          currentUri.map = currentMap;
        }
        if (!currentUri.key && key) {
          currentUri.key = key;
        }
        if (!currentUri.timeline && typeof currentTimeline === "number") {
          currentUri.timeline = currentTimeline;
        }
        this.manifest.preloadSegment = currentUri;
      });
      this.parseStream.on("data", function(entry) {
        let mediaGroup;
        let rendition;
        ({
          tag() {
            ({
              version() {
                if (entry.version) {
                  this.manifest.version = entry.version;
                }
              },
              "allow-cache"() {
                this.manifest.allowCache = entry.allowed;
                if (!("allowed" in entry)) {
                  this.trigger("info", {
                    message: "defaulting allowCache to YES"
                  });
                  this.manifest.allowCache = true;
                }
              },
              byterange() {
                const byterange = {};
                if ("length" in entry) {
                  currentUri.byterange = byterange;
                  byterange.length = entry.length;
                  if (!("offset" in entry)) {
                    entry.offset = lastByterangeEnd;
                  }
                }
                if ("offset" in entry) {
                  currentUri.byterange = byterange;
                  byterange.offset = entry.offset;
                }
                lastByterangeEnd = byterange.offset + byterange.length;
              },
              endlist() {
                this.manifest.endList = true;
              },
              inf() {
                if (!("mediaSequence" in this.manifest)) {
                  this.manifest.mediaSequence = 0;
                  this.trigger("info", {
                    message: "defaulting media sequence to zero"
                  });
                }
                if (!("discontinuitySequence" in this.manifest)) {
                  this.manifest.discontinuitySequence = 0;
                  this.trigger("info", {
                    message: "defaulting discontinuity sequence to zero"
                  });
                }
                if (entry.duration > 0) {
                  currentUri.duration = entry.duration;
                }
                if (entry.duration === 0) {
                  currentUri.duration = 0.01;
                  this.trigger("info", {
                    message: "updating zero segment duration to a small value"
                  });
                }
                this.manifest.segments = uris;
              },
              key() {
                if (!entry.attributes) {
                  this.trigger("warn", {
                    message: "ignoring key declaration without attribute list"
                  });
                  return;
                }
                if (entry.attributes.METHOD === "NONE") {
                  key = null;
                  return;
                }
                if (!entry.attributes.URI) {
                  this.trigger("warn", {
                    message: "ignoring key declaration without URI"
                  });
                  return;
                }
                if (entry.attributes.KEYFORMAT === "com.apple.streamingkeydelivery") {
                  this.manifest.contentProtection = this.manifest.contentProtection || {};
                  this.manifest.contentProtection["com.apple.fps.1_0"] = {
                    attributes: entry.attributes
                  };
                  return;
                }
                if (entry.attributes.KEYFORMAT === "com.microsoft.playready") {
                  this.manifest.contentProtection = this.manifest.contentProtection || {};
                  this.manifest.contentProtection["com.microsoft.playready"] = {
                    uri: entry.attributes.URI
                  };
                  return;
                }
                if (entry.attributes.KEYFORMAT === widevineUuid) {
                  const VALID_METHODS = ["SAMPLE-AES", "SAMPLE-AES-CTR", "SAMPLE-AES-CENC"];
                  if (VALID_METHODS.indexOf(entry.attributes.METHOD) === -1) {
                    this.trigger("warn", {
                      message: "invalid key method provided for Widevine"
                    });
                    return;
                  }
                  if (entry.attributes.METHOD === "SAMPLE-AES-CENC") {
                    this.trigger("warn", {
                      message: "SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"
                    });
                  }
                  if (entry.attributes.URI.substring(0, 23) !== "data:text/plain;base64,") {
                    this.trigger("warn", {
                      message: "invalid key URI provided for Widevine"
                    });
                    return;
                  }
                  if (!(entry.attributes.KEYID && entry.attributes.KEYID.substring(0, 2) === "0x")) {
                    this.trigger("warn", {
                      message: "invalid key ID provided for Widevine"
                    });
                    return;
                  }
                  this.manifest.contentProtection = this.manifest.contentProtection || {};
                  this.manifest.contentProtection["com.widevine.alpha"] = {
                    attributes: {
                      schemeIdUri: entry.attributes.KEYFORMAT,
                      // remove '0x' from the key id string
                      keyId: entry.attributes.KEYID.substring(2)
                    },
                    // decode the base64-encoded PSSH box
                    pssh: decodeB64ToUint8Array(entry.attributes.URI.split(",")[1])
                  };
                  return;
                }
                if (!entry.attributes.METHOD) {
                  this.trigger("warn", {
                    message: "defaulting key method to AES-128"
                  });
                }
                key = {
                  method: entry.attributes.METHOD || "AES-128",
                  uri: entry.attributes.URI
                };
                if (typeof entry.attributes.IV !== "undefined") {
                  key.iv = entry.attributes.IV;
                }
              },
              "media-sequence"() {
                if (!isFinite(entry.number)) {
                  this.trigger("warn", {
                    message: "ignoring invalid media sequence: " + entry.number
                  });
                  return;
                }
                this.manifest.mediaSequence = entry.number;
              },
              "discontinuity-sequence"() {
                if (!isFinite(entry.number)) {
                  this.trigger("warn", {
                    message: "ignoring invalid discontinuity sequence: " + entry.number
                  });
                  return;
                }
                this.manifest.discontinuitySequence = entry.number;
                currentTimeline = entry.number;
              },
              "playlist-type"() {
                if (!/VOD|EVENT/.test(entry.playlistType)) {
                  this.trigger("warn", {
                    message: "ignoring unknown playlist type: " + entry.playlist
                  });
                  return;
                }
                this.manifest.playlistType = entry.playlistType;
              },
              map() {
                currentMap = {};
                if (entry.uri) {
                  currentMap.uri = entry.uri;
                }
                if (entry.byterange) {
                  currentMap.byterange = entry.byterange;
                }
                if (key) {
                  currentMap.key = key;
                }
              },
              "stream-inf"() {
                this.manifest.playlists = uris;
                this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;
                if (!entry.attributes) {
                  this.trigger("warn", {
                    message: "ignoring empty stream-inf attributes"
                  });
                  return;
                }
                if (!currentUri.attributes) {
                  currentUri.attributes = {};
                }
                _extends(currentUri.attributes, entry.attributes);
              },
              media() {
                this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;
                if (!(entry.attributes && entry.attributes.TYPE && entry.attributes["GROUP-ID"] && entry.attributes.NAME)) {
                  this.trigger("warn", {
                    message: "ignoring incomplete or missing media group"
                  });
                  return;
                }
                const mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];
                mediaGroupType[entry.attributes["GROUP-ID"]] = mediaGroupType[entry.attributes["GROUP-ID"]] || {};
                mediaGroup = mediaGroupType[entry.attributes["GROUP-ID"]];
                rendition = {
                  default: /yes/i.test(entry.attributes.DEFAULT)
                };
                if (rendition.default) {
                  rendition.autoselect = true;
                } else {
                  rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
                }
                if (entry.attributes.LANGUAGE) {
                  rendition.language = entry.attributes.LANGUAGE;
                }
                if (entry.attributes.URI) {
                  rendition.uri = entry.attributes.URI;
                }
                if (entry.attributes["INSTREAM-ID"]) {
                  rendition.instreamId = entry.attributes["INSTREAM-ID"];
                }
                if (entry.attributes.CHARACTERISTICS) {
                  rendition.characteristics = entry.attributes.CHARACTERISTICS;
                }
                if (entry.attributes.FORCED) {
                  rendition.forced = /yes/i.test(entry.attributes.FORCED);
                }
                mediaGroup[entry.attributes.NAME] = rendition;
              },
              discontinuity() {
                currentTimeline += 1;
                currentUri.discontinuity = true;
                this.manifest.discontinuityStarts.push(uris.length);
              },
              "program-date-time"() {
                if (typeof this.manifest.dateTimeString === "undefined") {
                  this.manifest.dateTimeString = entry.dateTimeString;
                  this.manifest.dateTimeObject = entry.dateTimeObject;
                }
                currentUri.dateTimeString = entry.dateTimeString;
                currentUri.dateTimeObject = entry.dateTimeObject;
              },
              targetduration() {
                if (!isFinite(entry.duration) || entry.duration < 0) {
                  this.trigger("warn", {
                    message: "ignoring invalid target duration: " + entry.duration
                  });
                  return;
                }
                this.manifest.targetDuration = entry.duration;
                setHoldBack.call(this, this.manifest);
              },
              start() {
                if (!entry.attributes || isNaN(entry.attributes["TIME-OFFSET"])) {
                  this.trigger("warn", {
                    message: "ignoring start declaration without appropriate attribute list"
                  });
                  return;
                }
                this.manifest.start = {
                  timeOffset: entry.attributes["TIME-OFFSET"],
                  precise: entry.attributes.PRECISE
                };
              },
              "cue-out"() {
                currentUri.cueOut = entry.data;
              },
              "cue-out-cont"() {
                currentUri.cueOutCont = entry.data;
              },
              "cue-in"() {
                currentUri.cueIn = entry.data;
              },
              "skip"() {
                this.manifest.skip = camelCaseKeys(entry.attributes);
                this.warnOnMissingAttributes_("#EXT-X-SKIP", entry.attributes, ["SKIPPED-SEGMENTS"]);
              },
              "part"() {
                hasParts = true;
                const segmentIndex = this.manifest.segments.length;
                const part = camelCaseKeys(entry.attributes);
                currentUri.parts = currentUri.parts || [];
                currentUri.parts.push(part);
                if (part.byterange) {
                  if (!part.byterange.hasOwnProperty("offset")) {
                    part.byterange.offset = lastPartByterangeEnd;
                  }
                  lastPartByterangeEnd = part.byterange.offset + part.byterange.length;
                }
                const partIndex = currentUri.parts.length - 1;
                this.warnOnMissingAttributes_(`#EXT-X-PART #${partIndex} for segment #${segmentIndex}`, entry.attributes, ["URI", "DURATION"]);
                if (this.manifest.renditionReports) {
                  this.manifest.renditionReports.forEach((r2, i2) => {
                    if (!r2.hasOwnProperty("lastPart")) {
                      this.trigger("warn", {
                        message: `#EXT-X-RENDITION-REPORT #${i2} lacks required attribute(s): LAST-PART`
                      });
                    }
                  });
                }
              },
              "server-control"() {
                const attrs = this.manifest.serverControl = camelCaseKeys(entry.attributes);
                if (!attrs.hasOwnProperty("canBlockReload")) {
                  attrs.canBlockReload = false;
                  this.trigger("info", {
                    message: "#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"
                  });
                }
                setHoldBack.call(this, this.manifest);
                if (attrs.canSkipDateranges && !attrs.hasOwnProperty("canSkipUntil")) {
                  this.trigger("warn", {
                    message: "#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"
                  });
                }
              },
              "preload-hint"() {
                const segmentIndex = this.manifest.segments.length;
                const hint = camelCaseKeys(entry.attributes);
                const isPart = hint.type && hint.type === "PART";
                currentUri.preloadHints = currentUri.preloadHints || [];
                currentUri.preloadHints.push(hint);
                if (hint.byterange) {
                  if (!hint.byterange.hasOwnProperty("offset")) {
                    hint.byterange.offset = isPart ? lastPartByterangeEnd : 0;
                    if (isPart) {
                      lastPartByterangeEnd = hint.byterange.offset + hint.byterange.length;
                    }
                  }
                }
                const index = currentUri.preloadHints.length - 1;
                this.warnOnMissingAttributes_(`#EXT-X-PRELOAD-HINT #${index} for segment #${segmentIndex}`, entry.attributes, ["TYPE", "URI"]);
                if (!hint.type) {
                  return;
                }
                for (let i2 = 0; i2 < currentUri.preloadHints.length - 1; i2++) {
                  const otherHint = currentUri.preloadHints[i2];
                  if (!otherHint.type) {
                    continue;
                  }
                  if (otherHint.type === hint.type) {
                    this.trigger("warn", {
                      message: `#EXT-X-PRELOAD-HINT #${index} for segment #${segmentIndex} has the same TYPE ${hint.type} as preload hint #${i2}`
                    });
                  }
                }
              },
              "rendition-report"() {
                const report = camelCaseKeys(entry.attributes);
                this.manifest.renditionReports = this.manifest.renditionReports || [];
                this.manifest.renditionReports.push(report);
                const index = this.manifest.renditionReports.length - 1;
                const required = ["LAST-MSN", "URI"];
                if (hasParts) {
                  required.push("LAST-PART");
                }
                this.warnOnMissingAttributes_(`#EXT-X-RENDITION-REPORT #${index}`, entry.attributes, required);
              },
              "part-inf"() {
                this.manifest.partInf = camelCaseKeys(entry.attributes);
                this.warnOnMissingAttributes_("#EXT-X-PART-INF", entry.attributes, ["PART-TARGET"]);
                if (this.manifest.partInf.partTarget) {
                  this.manifest.partTargetDuration = this.manifest.partInf.partTarget;
                }
                setHoldBack.call(this, this.manifest);
              },
              "daterange"() {
                this.manifest.daterange = this.manifest.daterange || [];
                this.manifest.daterange.push(camelCaseKeys(entry.attributes));
                const index = this.manifest.daterange.length - 1;
                this.warnOnMissingAttributes_(`#EXT-X-DATERANGE #${index}`, entry.attributes, ["ID", "START-DATE"]);
                const daterange = this.manifest.daterange[index];
                if (daterange.endDate && daterange.startDate && new Date(daterange.endDate) < new Date(daterange.startDate)) {
                  this.trigger("warn", {
                    message: "EXT-X-DATERANGE END-DATE must be equal to or later than the value of the START-DATE"
                  });
                }
                if (daterange.duration && daterange.duration < 0) {
                  this.trigger("warn", {
                    message: "EXT-X-DATERANGE DURATION must not be negative"
                  });
                }
                if (daterange.plannedDuration && daterange.plannedDuration < 0) {
                  this.trigger("warn", {
                    message: "EXT-X-DATERANGE PLANNED-DURATION must not be negative"
                  });
                }
                const endOnNextYes = !!daterange.endOnNext;
                if (endOnNextYes && !daterange.class) {
                  this.trigger("warn", {
                    message: "EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must have a CLASS attribute"
                  });
                }
                if (endOnNextYes && (daterange.duration || daterange.endDate)) {
                  this.trigger("warn", {
                    message: "EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must not contain DURATION or END-DATE attributes"
                  });
                }
                if (daterange.duration && daterange.endDate) {
                  const startDate = daterange.startDate;
                  const newDateInSeconds = startDate.setSeconds(startDate.getSeconds() + daterange.duration);
                  this.manifest.daterange[index].endDate = new Date(newDateInSeconds);
                }
                if (daterange && !this.manifest.dateTimeString) {
                  this.trigger("warn", {
                    message: "A playlist with EXT-X-DATERANGE tag must contain atleast one EXT-X-PROGRAM-DATE-TIME tag"
                  });
                }
                if (!daterangeTags[daterange.id]) {
                  daterangeTags[daterange.id] = daterange;
                } else {
                  for (const attribute in daterangeTags[daterange.id]) {
                    if (daterangeTags[daterange.id][attribute] !== daterange[attribute]) {
                      this.trigger("warn", {
                        message: "EXT-X-DATERANGE tags with the same ID in a playlist must have the same attributes and same attribute values"
                      });
                      break;
                    }
                  }
                }
              },
              "independent-segments"() {
                this.manifest.independentSegments = true;
              }
            }[entry.tagType] || noop2).call(self2);
          },
          uri() {
            currentUri.uri = entry.uri;
            uris.push(currentUri);
            if (this.manifest.targetDuration && !("duration" in currentUri)) {
              this.trigger("warn", {
                message: "defaulting segment duration to the target duration"
              });
              currentUri.duration = this.manifest.targetDuration;
            }
            if (key) {
              currentUri.key = key;
            }
            currentUri.timeline = currentTimeline;
            if (currentMap) {
              currentUri.map = currentMap;
            }
            lastPartByterangeEnd = 0;
            currentUri = {};
          },
          comment() {
          },
          custom() {
            if (entry.segment) {
              currentUri.custom = currentUri.custom || {};
              currentUri.custom[entry.customType] = entry.data;
            } else {
              this.manifest.custom = this.manifest.custom || {};
              this.manifest.custom[entry.customType] = entry.data;
            }
          }
        })[entry.type].call(self2);
      });
    }
    warnOnMissingAttributes_(identifier, attributes, required) {
      const missing = [];
      required.forEach(function(key) {
        if (!attributes.hasOwnProperty(key)) {
          missing.push(key);
        }
      });
      if (missing.length) {
        this.trigger("warn", {
          message: `${identifier} lacks required attribute(s): ${missing.join(", ")}`
        });
      }
    }
    /**
     * Parse the input string and update the manifest object.
     *
     * @param {string} chunk a potentially incomplete portion of the manifest
     */
    push(chunk) {
      this.lineStream.push(chunk);
    }
    /**
     * Flush any remaining input. This can be handy if the last line of an M3U8
     * manifest did not contain a trailing newline but the file has been
     * completely received.
     */
    end() {
      this.lineStream.push("\n");
      this.trigger("end");
    }
    /**
     * Add an additional parser for non-standard tags
     *
     * @param {Object}   options              a map of options for the added parser
     * @param {RegExp}   options.expression   a regular expression to match the custom header
     * @param {string}   options.type         the type to register to the output
     * @param {Function} [options.dataParser] function to parse the line into an object
     * @param {boolean}  [options.segment]    should tag data be attached to the segment object
     */
    addParser(options) {
      this.parseStream.addParser(options);
    }
    /**
     * Add a custom header mapper
     *
     * @param {Object}   options
     * @param {RegExp}   options.expression   a regular expression to match the custom header
     * @param {Function} options.map          function to translate tag into a different tag
     */
    addTagMapper(options) {
      this.parseStream.addTagMapper(options);
    }
  }
  var urlToolkit = { exports: {} };
  (function(module, exports) {
    (function(root) {
      var URL_REGEX = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/;
      var FIRST_SEGMENT_REGEX = /^(?=([^\/?#]*))\1([^]*)$/;
      var SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g;
      var SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g;
      var URLToolkit = {
        // If opts.alwaysNormalize is true then the path will always be normalized even when it starts with / or //
        // E.g
        // With opts.alwaysNormalize = false (default, spec compliant)
        // http://a.com/b/cd + /e/f/../g => http://a.com/e/f/../g
        // With opts.alwaysNormalize = true (not spec compliant)
        // http://a.com/b/cd + /e/f/../g => http://a.com/e/g
        buildAbsoluteURL: function(baseURL, relativeURL, opts) {
          opts = opts || {};
          baseURL = baseURL.trim();
          relativeURL = relativeURL.trim();
          if (!relativeURL) {
            if (!opts.alwaysNormalize) {
              return baseURL;
            }
            var basePartsForNormalise = URLToolkit.parseURL(baseURL);
            if (!basePartsForNormalise) {
              throw new Error("Error trying to parse base URL.");
            }
            basePartsForNormalise.path = URLToolkit.normalizePath(
              basePartsForNormalise.path
            );
            return URLToolkit.buildURLFromParts(basePartsForNormalise);
          }
          var relativeParts = URLToolkit.parseURL(relativeURL);
          if (!relativeParts) {
            throw new Error("Error trying to parse relative URL.");
          }
          if (relativeParts.scheme) {
            if (!opts.alwaysNormalize) {
              return relativeURL;
            }
            relativeParts.path = URLToolkit.normalizePath(relativeParts.path);
            return URLToolkit.buildURLFromParts(relativeParts);
          }
          var baseParts = URLToolkit.parseURL(baseURL);
          if (!baseParts) {
            throw new Error("Error trying to parse base URL.");
          }
          if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== "/") {
            var pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path);
            baseParts.netLoc = pathParts[1];
            baseParts.path = pathParts[2];
          }
          if (baseParts.netLoc && !baseParts.path) {
            baseParts.path = "/";
          }
          var builtParts = {
            // 2c) Otherwise, the embedded URL inherits the scheme of
            // the base URL.
            scheme: baseParts.scheme,
            netLoc: relativeParts.netLoc,
            path: null,
            params: relativeParts.params,
            query: relativeParts.query,
            fragment: relativeParts.fragment
          };
          if (!relativeParts.netLoc) {
            builtParts.netLoc = baseParts.netLoc;
            if (relativeParts.path[0] !== "/") {
              if (!relativeParts.path) {
                builtParts.path = baseParts.path;
                if (!relativeParts.params) {
                  builtParts.params = baseParts.params;
                  if (!relativeParts.query) {
                    builtParts.query = baseParts.query;
                  }
                }
              } else {
                var baseURLPath = baseParts.path;
                var newPath = baseURLPath.substring(0, baseURLPath.lastIndexOf("/") + 1) + relativeParts.path;
                builtParts.path = URLToolkit.normalizePath(newPath);
              }
            }
          }
          if (builtParts.path === null) {
            builtParts.path = opts.alwaysNormalize ? URLToolkit.normalizePath(relativeParts.path) : relativeParts.path;
          }
          return URLToolkit.buildURLFromParts(builtParts);
        },
        parseURL: function(url) {
          var parts = URL_REGEX.exec(url);
          if (!parts) {
            return null;
          }
          return {
            scheme: parts[1] || "",
            netLoc: parts[2] || "",
            path: parts[3] || "",
            params: parts[4] || "",
            query: parts[5] || "",
            fragment: parts[6] || ""
          };
        },
        normalizePath: function(path) {
          path = path.split("").reverse().join("").replace(SLASH_DOT_REGEX, "");
          while (path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, "")).length) {
          }
          return path.split("").reverse().join("");
        },
        buildURLFromParts: function(parts) {
          return parts.scheme + parts.netLoc + parts.path + parts.params + parts.query + parts.fragment;
        }
      };
      module.exports = URLToolkit;
    })();
  })(urlToolkit);
  var urlToolkitExports = urlToolkit.exports;
  var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    return getRandomValues(rnds8);
  }
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 256).toString(16).substr(1);
  }
  function bytesToUuid(buf, offset) {
    var i2 = 0;
    var bth = byteToHex;
    return [bth[buf[i2++]], bth[buf[i2++]], bth[buf[i2++]], bth[buf[i2++]], "-", bth[buf[i2++]], bth[buf[i2++]], "-", bth[buf[i2++]], bth[buf[i2++]], "-", bth[buf[i2++]], bth[buf[i2++]], "-", bth[buf[i2++]], bth[buf[i2++]], bth[buf[i2++]], bth[buf[i2++]], bth[buf[i2++]], bth[buf[i2++]]].join("");
  }
  function v4(options, buf, offset) {
    var i2 = buf && offset || 0;
    if (typeof options == "string") {
      buf = options === "binary" ? new Array(16) : null;
      options = null;
    }
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i2 + ii] = rnds[ii];
      }
    }
    return buf || bytesToUuid(rnds);
  }
  const M3u8Parser = {
    parseLevelPlaylist(string, baseurl) {
      const parser = new Parser();
      parser.push(string);
      return parser.manifest.segments.map((segment, index) => ({
        index,
        key: segment.key ? {
          iv: segment.key.iv,
          uri: urlToolkitExports.buildAbsoluteURL(baseurl, segment.key.uri)
        } : {
          iv: null,
          uri: null
        },
        uri: urlToolkitExports.buildAbsoluteURL(baseurl, segment.uri)
      }));
    },
    parseMasterPlaylist(string, baseurl) {
      const parser = new Parser();
      parser.push(string);
      const playlists = parser.manifest?.playlists ?? [];
      const audioPlaylists = parser.manifest?.mediaGroups?.AUDIO ?? {};
      const results = playlists.map((playlist) => ({
        type: "stream",
        id: v4(),
        playlistID: baseurl,
        uri: urlToolkitExports.buildAbsoluteURL(baseurl, playlist.uri),
        bitrate: playlist.attributes.BANDWIDTH,
        fps: playlist.attributes["FRAME-RATE"],
        height: playlist.attributes.RESOLUTION?.height,
        width: playlist.attributes.RESOLUTION?.width
      }));
      const audioResults = Object.entries(audioPlaylists).flatMap(
        ([key, entries]) => {
          return Object.entries(entries).map(([label, entry]) => {
            return {
              type: "audio",
              id: `${label}-${key}`,
              playlistID: baseurl,
              uri: urlToolkitExports.buildAbsoluteURL(baseurl, entry.uri),
              bitrate: void 0,
              fps: void 0,
              width: void 0,
              height: void 0
            };
          });
        }
      );
      return results.concat(audioResults);
    }
  };
  (async () => {
    const state = await getState();
    const store = createStore(
      {
        decryptor: CryptoDecryptor,
        fs: IndexedDBFS,
        loader: FetchLoader,
        parser: M3u8Parser
      },
      state
    );
    lib.wrapStore(store);
    store.subscribe(() => {
      saveState(store.getState());
    });
    subscribeListeners(store);
  })();
});
//# sourceMappingURL=background.js.map
