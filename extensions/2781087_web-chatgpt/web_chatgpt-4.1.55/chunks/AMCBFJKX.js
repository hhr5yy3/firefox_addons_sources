import {
  fetchAdapter,
  require_dist
} from "./4GUJBY7U.js";
import {
  BaseLanguageModel,
  CallbackManager,
  calculateMaxTokens,
  getBufferString,
  isNode
} from "./BNXUMZ5F.js";
import {
  AIChatMessage,
  BaseCache,
  RUN_KEY
} from "./UK6YILTB.js";
import {
  __commonJS,
  __require,
  __toESM
} from "./ERZ5UWI7.js";

// node_modules/.pnpm/object-hash@3.0.0/node_modules/object-hash/dist/object_hash.js
var require_object_hash = __commonJS({
  "node_modules/.pnpm/object-hash@3.0.0/node_modules/object-hash/dist/object_hash.js"(exports, module) {
    !function(e) {
      var t;
      "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : ("undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.objectHash = e());
    }(function() {
      return function r(o, i, u) {
        function s(n, e2) {
          if (!i[n]) {
            if (!o[n]) {
              var t = "function" == typeof __require && __require;
              if (!e2 && t)
                return t(n, true);
              if (a)
                return a(n, true);
              throw new Error("Cannot find module '" + n + "'");
            }
            e2 = i[n] = { exports: {} };
            o[n][0].call(e2.exports, function(e3) {
              var t2 = o[n][1][e3];
              return s(t2 || e3);
            }, e2, e2.exports, r, o, i, u);
          }
          return i[n].exports;
        }
        for (var a = "function" == typeof __require && __require, e = 0; e < u.length; e++)
          s(u[e]);
        return s;
      }({ 1: [function(w, b, m) {
        !function(e, n, s, c, d, h, p, g, y) {
          "use strict";
          var r = w("crypto");
          function t(e2, t2) {
            t2 = u(e2, t2);
            var n2;
            return void 0 === (n2 = "passthrough" !== t2.algorithm ? r.createHash(t2.algorithm) : new l()).write && (n2.write = n2.update, n2.end = n2.update), f(t2, n2).dispatch(e2), n2.update || n2.end(""), n2.digest ? n2.digest("buffer" === t2.encoding ? void 0 : t2.encoding) : (e2 = n2.read(), "buffer" !== t2.encoding ? e2.toString(t2.encoding) : e2);
          }
          (m = b.exports = t).sha1 = function(e2) {
            return t(e2);
          }, m.keys = function(e2) {
            return t(e2, { excludeValues: true, algorithm: "sha1", encoding: "hex" });
          }, m.MD5 = function(e2) {
            return t(e2, { algorithm: "md5", encoding: "hex" });
          }, m.keysMD5 = function(e2) {
            return t(e2, { algorithm: "md5", encoding: "hex", excludeValues: true });
          };
          var o = r.getHashes ? r.getHashes().slice() : ["sha1", "md5"], i = (o.push("passthrough"), ["buffer", "hex", "binary", "base64"]);
          function u(e2, t2) {
            var n2 = {};
            if (n2.algorithm = (t2 = t2 || {}).algorithm || "sha1", n2.encoding = t2.encoding || "hex", n2.excludeValues = !!t2.excludeValues, n2.algorithm = n2.algorithm.toLowerCase(), n2.encoding = n2.encoding.toLowerCase(), n2.ignoreUnknown = true === t2.ignoreUnknown, n2.respectType = false !== t2.respectType, n2.respectFunctionNames = false !== t2.respectFunctionNames, n2.respectFunctionProperties = false !== t2.respectFunctionProperties, n2.unorderedArrays = true === t2.unorderedArrays, n2.unorderedSets = false !== t2.unorderedSets, n2.unorderedObjects = false !== t2.unorderedObjects, n2.replacer = t2.replacer || void 0, n2.excludeKeys = t2.excludeKeys || void 0, void 0 === e2)
              throw new Error("Object argument required.");
            for (var r2 = 0; r2 < o.length; ++r2)
              o[r2].toLowerCase() === n2.algorithm.toLowerCase() && (n2.algorithm = o[r2]);
            if (-1 === o.indexOf(n2.algorithm))
              throw new Error('Algorithm "' + n2.algorithm + '"  not supported. supported values: ' + o.join(", "));
            if (-1 === i.indexOf(n2.encoding) && "passthrough" !== n2.algorithm)
              throw new Error('Encoding "' + n2.encoding + '"  not supported. supported values: ' + i.join(", "));
            return n2;
          }
          function a(e2) {
            if ("function" == typeof e2)
              return null != /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e2));
          }
          function f(o2, t2, i2) {
            i2 = i2 || [];
            function u2(e2) {
              return t2.update ? t2.update(e2, "utf8") : t2.write(e2, "utf8");
            }
            return { dispatch: function(e2) {
              return this["_" + (null === (e2 = o2.replacer ? o2.replacer(e2) : e2) ? "null" : typeof e2)](e2);
            }, _object: function(t3) {
              var n2, e2 = Object.prototype.toString.call(t3), r2 = /\[object (.*)\]/i.exec(e2);
              r2 = (r2 = r2 ? r2[1] : "unknown:[" + e2 + "]").toLowerCase();
              if (0 <= (e2 = i2.indexOf(t3)))
                return this.dispatch("[CIRCULAR:" + e2 + "]");
              if (i2.push(t3), void 0 !== s && s.isBuffer && s.isBuffer(t3))
                return u2("buffer:"), u2(t3);
              if ("object" === r2 || "function" === r2 || "asyncfunction" === r2)
                return e2 = Object.keys(t3), o2.unorderedObjects && (e2 = e2.sort()), false === o2.respectType || a(t3) || e2.splice(0, 0, "prototype", "__proto__", "constructor"), o2.excludeKeys && (e2 = e2.filter(function(e3) {
                  return !o2.excludeKeys(e3);
                })), u2("object:" + e2.length + ":"), n2 = this, e2.forEach(function(e3) {
                  n2.dispatch(e3), u2(":"), o2.excludeValues || n2.dispatch(t3[e3]), u2(",");
                });
              if (!this["_" + r2]) {
                if (o2.ignoreUnknown)
                  return u2("[" + r2 + "]");
                throw new Error('Unknown object type "' + r2 + '"');
              }
              this["_" + r2](t3);
            }, _array: function(e2, t3) {
              t3 = void 0 !== t3 ? t3 : false !== o2.unorderedArrays;
              var n2 = this;
              if (u2("array:" + e2.length + ":"), !t3 || e2.length <= 1)
                return e2.forEach(function(e3) {
                  return n2.dispatch(e3);
                });
              var r2 = [], t3 = e2.map(function(e3) {
                var t4 = new l(), n3 = i2.slice();
                return f(o2, t4, n3).dispatch(e3), r2 = r2.concat(n3.slice(i2.length)), t4.read().toString();
              });
              return i2 = i2.concat(r2), t3.sort(), this._array(t3, false);
            }, _date: function(e2) {
              return u2("date:" + e2.toJSON());
            }, _symbol: function(e2) {
              return u2("symbol:" + e2.toString());
            }, _error: function(e2) {
              return u2("error:" + e2.toString());
            }, _boolean: function(e2) {
              return u2("bool:" + e2.toString());
            }, _string: function(e2) {
              u2("string:" + e2.length + ":"), u2(e2.toString());
            }, _function: function(e2) {
              u2("fn:"), a(e2) ? this.dispatch("[native]") : this.dispatch(e2.toString()), false !== o2.respectFunctionNames && this.dispatch("function-name:" + String(e2.name)), o2.respectFunctionProperties && this._object(e2);
            }, _number: function(e2) {
              return u2("number:" + e2.toString());
            }, _xml: function(e2) {
              return u2("xml:" + e2.toString());
            }, _null: function() {
              return u2("Null");
            }, _undefined: function() {
              return u2("Undefined");
            }, _regexp: function(e2) {
              return u2("regex:" + e2.toString());
            }, _uint8array: function(e2) {
              return u2("uint8array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _uint8clampedarray: function(e2) {
              return u2("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _int8array: function(e2) {
              return u2("int8array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _uint16array: function(e2) {
              return u2("uint16array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _int16array: function(e2) {
              return u2("int16array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _uint32array: function(e2) {
              return u2("uint32array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _int32array: function(e2) {
              return u2("int32array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _float32array: function(e2) {
              return u2("float32array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _float64array: function(e2) {
              return u2("float64array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _arraybuffer: function(e2) {
              return u2("arraybuffer:"), this.dispatch(new Uint8Array(e2));
            }, _url: function(e2) {
              return u2("url:" + e2.toString());
            }, _map: function(e2) {
              u2("map:");
              e2 = Array.from(e2);
              return this._array(e2, false !== o2.unorderedSets);
            }, _set: function(e2) {
              u2("set:");
              e2 = Array.from(e2);
              return this._array(e2, false !== o2.unorderedSets);
            }, _file: function(e2) {
              return u2("file:"), this.dispatch([e2.name, e2.size, e2.type, e2.lastModfied]);
            }, _blob: function() {
              if (o2.ignoreUnknown)
                return u2("[blob]");
              throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n');
            }, _domwindow: function() {
              return u2("domwindow");
            }, _bigint: function(e2) {
              return u2("bigint:" + e2.toString());
            }, _process: function() {
              return u2("process");
            }, _timer: function() {
              return u2("timer");
            }, _pipe: function() {
              return u2("pipe");
            }, _tcp: function() {
              return u2("tcp");
            }, _udp: function() {
              return u2("udp");
            }, _tty: function() {
              return u2("tty");
            }, _statwatcher: function() {
              return u2("statwatcher");
            }, _securecontext: function() {
              return u2("securecontext");
            }, _connection: function() {
              return u2("connection");
            }, _zlib: function() {
              return u2("zlib");
            }, _context: function() {
              return u2("context");
            }, _nodescript: function() {
              return u2("nodescript");
            }, _httpparser: function() {
              return u2("httpparser");
            }, _dataview: function() {
              return u2("dataview");
            }, _signal: function() {
              return u2("signal");
            }, _fsevent: function() {
              return u2("fsevent");
            }, _tlswrap: function() {
              return u2("tlswrap");
            } };
          }
          function l() {
            return { buf: "", write: function(e2) {
              this.buf += e2;
            }, end: function(e2) {
              this.buf += e2;
            }, read: function() {
              return this.buf;
            } };
          }
          m.writeToStream = function(e2, t2, n2) {
            return void 0 === n2 && (n2 = t2, t2 = {}), f(t2 = u(e2, t2), n2).dispatch(e2);
          };
        }.call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
      }, { buffer: 3, crypto: 5, lYpoI2: 11 }], 2: [function(e, t, f) {
        !function(e2, t2, n, r, o, i, u, s, a) {
          !function(e3) {
            "use strict";
            var a2 = "undefined" != typeof Uint8Array ? Uint8Array : Array, t3 = "+".charCodeAt(0), n2 = "/".charCodeAt(0), r2 = "0".charCodeAt(0), o2 = "a".charCodeAt(0), i2 = "A".charCodeAt(0), u2 = "-".charCodeAt(0), s2 = "_".charCodeAt(0);
            function f2(e4) {
              e4 = e4.charCodeAt(0);
              return e4 === t3 || e4 === u2 ? 62 : e4 === n2 || e4 === s2 ? 63 : e4 < r2 ? -1 : e4 < r2 + 10 ? e4 - r2 + 26 + 26 : e4 < i2 + 26 ? e4 - i2 : e4 < o2 + 26 ? e4 - o2 + 26 : void 0;
            }
            e3.toByteArray = function(e4) {
              var t4, n3;
              if (0 < e4.length % 4)
                throw new Error("Invalid string. Length must be a multiple of 4");
              var r3 = e4.length, r3 = "=" === e4.charAt(r3 - 2) ? 2 : "=" === e4.charAt(r3 - 1) ? 1 : 0, o3 = new a2(3 * e4.length / 4 - r3), i3 = 0 < r3 ? e4.length - 4 : e4.length, u3 = 0;
              function s3(e5) {
                o3[u3++] = e5;
              }
              for (t4 = 0; t4 < i3; t4 += 4, 0)
                s3((16711680 & (n3 = f2(e4.charAt(t4)) << 18 | f2(e4.charAt(t4 + 1)) << 12 | f2(e4.charAt(t4 + 2)) << 6 | f2(e4.charAt(t4 + 3)))) >> 16), s3((65280 & n3) >> 8), s3(255 & n3);
              return 2 == r3 ? s3(255 & (n3 = f2(e4.charAt(t4)) << 2 | f2(e4.charAt(t4 + 1)) >> 4)) : 1 == r3 && (s3((n3 = f2(e4.charAt(t4)) << 10 | f2(e4.charAt(t4 + 1)) << 4 | f2(e4.charAt(t4 + 2)) >> 2) >> 8 & 255), s3(255 & n3)), o3;
            }, e3.fromByteArray = function(e4) {
              var t4, n3, r3, o3, i3 = e4.length % 3, u3 = "";
              function s3(e5) {
                return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e5);
              }
              for (t4 = 0, r3 = e4.length - i3; t4 < r3; t4 += 3)
                n3 = (e4[t4] << 16) + (e4[t4 + 1] << 8) + e4[t4 + 2], u3 += s3((o3 = n3) >> 18 & 63) + s3(o3 >> 12 & 63) + s3(o3 >> 6 & 63) + s3(63 & o3);
              switch (i3) {
                case 1:
                  u3 = (u3 += s3((n3 = e4[e4.length - 1]) >> 2)) + s3(n3 << 4 & 63) + "==";
                  break;
                case 2:
                  u3 = (u3 = (u3 += s3((n3 = (e4[e4.length - 2] << 8) + e4[e4.length - 1]) >> 10)) + s3(n3 >> 4 & 63)) + s3(n3 << 2 & 63) + "=";
              }
              return u3;
            };
          }(void 0 === f ? this.base64js = {} : f);
        }.call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
      }, { buffer: 3, lYpoI2: 11 }], 3: [function(O, e, H) {
        !function(e2, n, f, r, h, p, g, y, w) {
          var a = O("base64-js"), i = O("ieee754");
          function f(e3, t2, n2) {
            if (!(this instanceof f))
              return new f(e3, t2, n2);
            var r2, o2, i2, u2, s2 = typeof e3;
            if ("base64" === t2 && "string" == s2)
              for (e3 = (u2 = e3).trim ? u2.trim() : u2.replace(/^\s+|\s+$/g, ""); e3.length % 4 != 0; )
                e3 += "=";
            if ("number" == s2)
              r2 = j(e3);
            else if ("string" == s2)
              r2 = f.byteLength(e3, t2);
            else {
              if ("object" != s2)
                throw new Error("First argument needs to be a number, array or string.");
              r2 = j(e3.length);
            }
            if (f._useTypedArrays ? o2 = f._augment(new Uint8Array(r2)) : ((o2 = this).length = r2, o2._isBuffer = true), f._useTypedArrays && "number" == typeof e3.byteLength)
              o2._set(e3);
            else if (C(u2 = e3) || f.isBuffer(u2) || u2 && "object" == typeof u2 && "number" == typeof u2.length)
              for (i2 = 0; i2 < r2; i2++)
                f.isBuffer(e3) ? o2[i2] = e3.readUInt8(i2) : o2[i2] = e3[i2];
            else if ("string" == s2)
              o2.write(e3, 0, t2);
            else if ("number" == s2 && !f._useTypedArrays && !n2)
              for (i2 = 0; i2 < r2; i2++)
                o2[i2] = 0;
            return o2;
          }
          function b(e3, t2, n2, r2) {
            return f._charsWritten = c(function(e4) {
              for (var t3 = [], n3 = 0; n3 < e4.length; n3++)
                t3.push(255 & e4.charCodeAt(n3));
              return t3;
            }(t2), e3, n2, r2);
          }
          function m(e3, t2, n2, r2) {
            return f._charsWritten = c(function(e4) {
              for (var t3, n3, r3 = [], o2 = 0; o2 < e4.length; o2++)
                n3 = e4.charCodeAt(o2), t3 = n3 >> 8, n3 = n3 % 256, r3.push(n3), r3.push(t3);
              return r3;
            }(t2), e3, n2, r2);
          }
          function v(e3, t2, n2) {
            var r2 = "";
            n2 = Math.min(e3.length, n2);
            for (var o2 = t2; o2 < n2; o2++)
              r2 += String.fromCharCode(e3[o2]);
            return r2;
          }
          function o(e3, t2, n2, r2) {
            r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 1 < e3.length, "Trying to read beyond buffer length"));
            var o2, r2 = e3.length;
            if (!(r2 <= t2))
              return n2 ? (o2 = e3[t2], t2 + 1 < r2 && (o2 |= e3[t2 + 1] << 8)) : (o2 = e3[t2] << 8, t2 + 1 < r2 && (o2 |= e3[t2 + 1])), o2;
          }
          function u(e3, t2, n2, r2) {
            r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length"));
            var o2, r2 = e3.length;
            if (!(r2 <= t2))
              return n2 ? (t2 + 2 < r2 && (o2 = e3[t2 + 2] << 16), t2 + 1 < r2 && (o2 |= e3[t2 + 1] << 8), o2 |= e3[t2], t2 + 3 < r2 && (o2 += e3[t2 + 3] << 24 >>> 0)) : (t2 + 1 < r2 && (o2 = e3[t2 + 1] << 16), t2 + 2 < r2 && (o2 |= e3[t2 + 2] << 8), t2 + 3 < r2 && (o2 |= e3[t2 + 3]), o2 += e3[t2] << 24 >>> 0), o2;
          }
          function _(e3, t2, n2, r2) {
            if (r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 1 < e3.length, "Trying to read beyond buffer length")), !(e3.length <= t2))
              return r2 = o(e3, t2, n2, true), 32768 & r2 ? -1 * (65535 - r2 + 1) : r2;
          }
          function E(e3, t2, n2, r2) {
            if (r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length")), !(e3.length <= t2))
              return r2 = u(e3, t2, n2, true), 2147483648 & r2 ? -1 * (4294967295 - r2 + 1) : r2;
          }
          function I(e3, t2, n2, r2) {
            return r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length")), i.read(e3, t2, n2, 23, 4);
          }
          function A(e3, t2, n2, r2) {
            return r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(t2 + 7 < e3.length, "Trying to read beyond buffer length")), i.read(e3, t2, n2, 52, 8);
          }
          function s(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 1 < e3.length, "trying to write beyond buffer length"), Y(t2, 65535));
            o2 = e3.length;
            if (!(o2 <= n2))
              for (var i2 = 0, u2 = Math.min(o2 - n2, 2); i2 < u2; i2++)
                e3[n2 + i2] = (t2 & 255 << 8 * (r2 ? i2 : 1 - i2)) >>> 8 * (r2 ? i2 : 1 - i2);
          }
          function l(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "trying to write beyond buffer length"), Y(t2, 4294967295));
            o2 = e3.length;
            if (!(o2 <= n2))
              for (var i2 = 0, u2 = Math.min(o2 - n2, 4); i2 < u2; i2++)
                e3[n2 + i2] = t2 >>> 8 * (r2 ? i2 : 3 - i2) & 255;
          }
          function B(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 1 < e3.length, "Trying to write beyond buffer length"), F(t2, 32767, -32768)), e3.length <= n2 || s(e3, 0 <= t2 ? t2 : 65535 + t2 + 1, n2, r2, o2);
          }
          function L(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "Trying to write beyond buffer length"), F(t2, 2147483647, -2147483648)), e3.length <= n2 || l(e3, 0 <= t2 ? t2 : 4294967295 + t2 + 1, n2, r2, o2);
          }
          function U(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "Trying to write beyond buffer length"), D(t2, 34028234663852886e22, -34028234663852886e22)), e3.length <= n2 || i.write(e3, t2, n2, r2, 23, 4);
          }
          function x(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 7 < e3.length, "Trying to write beyond buffer length"), D(t2, 17976931348623157e292, -17976931348623157e292)), e3.length <= n2 || i.write(e3, t2, n2, r2, 52, 8);
          }
          H.Buffer = f, H.SlowBuffer = f, H.INSPECT_MAX_BYTES = 50, f.poolSize = 8192, f._useTypedArrays = function() {
            try {
              var e3 = new ArrayBuffer(0), t2 = new Uint8Array(e3);
              return t2.foo = function() {
                return 42;
              }, 42 === t2.foo() && "function" == typeof t2.subarray;
            } catch (e4) {
              return false;
            }
          }(), f.isEncoding = function(e3) {
            switch (String(e3).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "raw":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          }, f.isBuffer = function(e3) {
            return !(null == e3 || !e3._isBuffer);
          }, f.byteLength = function(e3, t2) {
            var n2;
            switch (e3 += "", t2 || "utf8") {
              case "hex":
                n2 = e3.length / 2;
                break;
              case "utf8":
              case "utf-8":
                n2 = T(e3).length;
                break;
              case "ascii":
              case "binary":
              case "raw":
                n2 = e3.length;
                break;
              case "base64":
                n2 = M(e3).length;
                break;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                n2 = 2 * e3.length;
                break;
              default:
                throw new Error("Unknown encoding");
            }
            return n2;
          }, f.concat = function(e3, t2) {
            if (d(C(e3), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e3.length)
              return new f(0);
            if (1 === e3.length)
              return e3[0];
            if ("number" != typeof t2)
              for (o2 = t2 = 0; o2 < e3.length; o2++)
                t2 += e3[o2].length;
            for (var n2 = new f(t2), r2 = 0, o2 = 0; o2 < e3.length; o2++) {
              var i2 = e3[o2];
              i2.copy(n2, r2), r2 += i2.length;
            }
            return n2;
          }, f.prototype.write = function(e3, t2, n2, r2) {
            isFinite(t2) ? isFinite(n2) || (r2 = n2, n2 = void 0) : (a2 = r2, r2 = t2, t2 = n2, n2 = a2), t2 = Number(t2) || 0;
            var o2, i2, u2, s2, a2 = this.length - t2;
            switch ((!n2 || a2 < (n2 = Number(n2))) && (n2 = a2), r2 = String(r2 || "utf8").toLowerCase()) {
              case "hex":
                o2 = function(e4, t3, n3, r3) {
                  n3 = Number(n3) || 0;
                  var o3 = e4.length - n3;
                  (!r3 || o3 < (r3 = Number(r3))) && (r3 = o3), d((o3 = t3.length) % 2 == 0, "Invalid hex string"), o3 / 2 < r3 && (r3 = o3 / 2);
                  for (var i3 = 0; i3 < r3; i3++) {
                    var u3 = parseInt(t3.substr(2 * i3, 2), 16);
                    d(!isNaN(u3), "Invalid hex string"), e4[n3 + i3] = u3;
                  }
                  return f._charsWritten = 2 * i3, i3;
                }(this, e3, t2, n2);
                break;
              case "utf8":
              case "utf-8":
                i2 = this, u2 = t2, s2 = n2, o2 = f._charsWritten = c(T(e3), i2, u2, s2);
                break;
              case "ascii":
              case "binary":
                o2 = b(this, e3, t2, n2);
                break;
              case "base64":
                i2 = this, u2 = t2, s2 = n2, o2 = f._charsWritten = c(M(e3), i2, u2, s2);
                break;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                o2 = m(this, e3, t2, n2);
                break;
              default:
                throw new Error("Unknown encoding");
            }
            return o2;
          }, f.prototype.toString = function(e3, t2, n2) {
            var r2, o2, i2, u2, s2 = this;
            if (e3 = String(e3 || "utf8").toLowerCase(), t2 = Number(t2) || 0, (n2 = void 0 !== n2 ? Number(n2) : s2.length) === t2)
              return "";
            switch (e3) {
              case "hex":
                r2 = function(e4, t3, n3) {
                  var r3 = e4.length;
                  (!t3 || t3 < 0) && (t3 = 0);
                  (!n3 || n3 < 0 || r3 < n3) && (n3 = r3);
                  for (var o3 = "", i3 = t3; i3 < n3; i3++)
                    o3 += k(e4[i3]);
                  return o3;
                }(s2, t2, n2);
                break;
              case "utf8":
              case "utf-8":
                r2 = function(e4, t3, n3) {
                  var r3 = "", o3 = "";
                  n3 = Math.min(e4.length, n3);
                  for (var i3 = t3; i3 < n3; i3++)
                    e4[i3] <= 127 ? (r3 += N(o3) + String.fromCharCode(e4[i3]), o3 = "") : o3 += "%" + e4[i3].toString(16);
                  return r3 + N(o3);
                }(s2, t2, n2);
                break;
              case "ascii":
              case "binary":
                r2 = v(s2, t2, n2);
                break;
              case "base64":
                o2 = s2, u2 = n2, r2 = 0 === (i2 = t2) && u2 === o2.length ? a.fromByteArray(o2) : a.fromByteArray(o2.slice(i2, u2));
                break;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                r2 = function(e4, t3, n3) {
                  for (var r3 = e4.slice(t3, n3), o3 = "", i3 = 0; i3 < r3.length; i3 += 2)
                    o3 += String.fromCharCode(r3[i3] + 256 * r3[i3 + 1]);
                  return o3;
                }(s2, t2, n2);
                break;
              default:
                throw new Error("Unknown encoding");
            }
            return r2;
          }, f.prototype.toJSON = function() {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          }, f.prototype.copy = function(e3, t2, n2, r2) {
            if (t2 = t2 || 0, (r2 = r2 || 0 === r2 ? r2 : this.length) !== (n2 = n2 || 0) && 0 !== e3.length && 0 !== this.length) {
              d(n2 <= r2, "sourceEnd < sourceStart"), d(0 <= t2 && t2 < e3.length, "targetStart out of bounds"), d(0 <= n2 && n2 < this.length, "sourceStart out of bounds"), d(0 <= r2 && r2 <= this.length, "sourceEnd out of bounds"), r2 > this.length && (r2 = this.length);
              var o2 = (r2 = e3.length - t2 < r2 - n2 ? e3.length - t2 + n2 : r2) - n2;
              if (o2 < 100 || !f._useTypedArrays)
                for (var i2 = 0; i2 < o2; i2++)
                  e3[i2 + t2] = this[i2 + n2];
              else
                e3._set(this.subarray(n2, n2 + o2), t2);
            }
          }, f.prototype.slice = function(e3, t2) {
            var n2 = this.length;
            if (e3 = S(e3, n2, 0), t2 = S(t2, n2, n2), f._useTypedArrays)
              return f._augment(this.subarray(e3, t2));
            for (var r2 = t2 - e3, o2 = new f(r2, void 0, true), i2 = 0; i2 < r2; i2++)
              o2[i2] = this[i2 + e3];
            return o2;
          }, f.prototype.get = function(e3) {
            return void 0, this.readUInt8(e3);
          }, f.prototype.set = function(e3, t2) {
            return void 0, this.writeUInt8(e3, t2);
          }, f.prototype.readUInt8 = function(e3, t2) {
            if (t2 || (d(null != e3, "missing offset"), d(e3 < this.length, "Trying to read beyond buffer length")), !(e3 >= this.length))
              return this[e3];
          }, f.prototype.readUInt16LE = function(e3, t2) {
            return o(this, e3, true, t2);
          }, f.prototype.readUInt16BE = function(e3, t2) {
            return o(this, e3, false, t2);
          }, f.prototype.readUInt32LE = function(e3, t2) {
            return u(this, e3, true, t2);
          }, f.prototype.readUInt32BE = function(e3, t2) {
            return u(this, e3, false, t2);
          }, f.prototype.readInt8 = function(e3, t2) {
            if (t2 || (d(null != e3, "missing offset"), d(e3 < this.length, "Trying to read beyond buffer length")), !(e3 >= this.length))
              return 128 & this[e3] ? -1 * (255 - this[e3] + 1) : this[e3];
          }, f.prototype.readInt16LE = function(e3, t2) {
            return _(this, e3, true, t2);
          }, f.prototype.readInt16BE = function(e3, t2) {
            return _(this, e3, false, t2);
          }, f.prototype.readInt32LE = function(e3, t2) {
            return E(this, e3, true, t2);
          }, f.prototype.readInt32BE = function(e3, t2) {
            return E(this, e3, false, t2);
          }, f.prototype.readFloatLE = function(e3, t2) {
            return I(this, e3, true, t2);
          }, f.prototype.readFloatBE = function(e3, t2) {
            return I(this, e3, false, t2);
          }, f.prototype.readDoubleLE = function(e3, t2) {
            return A(this, e3, true, t2);
          }, f.prototype.readDoubleBE = function(e3, t2) {
            return A(this, e3, false, t2);
          }, f.prototype.writeUInt8 = function(e3, t2, n2) {
            n2 || (d(null != e3, "missing value"), d(null != t2, "missing offset"), d(t2 < this.length, "trying to write beyond buffer length"), Y(e3, 255)), t2 >= this.length || (this[t2] = e3);
          }, f.prototype.writeUInt16LE = function(e3, t2, n2) {
            s(this, e3, t2, true, n2);
          }, f.prototype.writeUInt16BE = function(e3, t2, n2) {
            s(this, e3, t2, false, n2);
          }, f.prototype.writeUInt32LE = function(e3, t2, n2) {
            l(this, e3, t2, true, n2);
          }, f.prototype.writeUInt32BE = function(e3, t2, n2) {
            l(this, e3, t2, false, n2);
          }, f.prototype.writeInt8 = function(e3, t2, n2) {
            n2 || (d(null != e3, "missing value"), d(null != t2, "missing offset"), d(t2 < this.length, "Trying to write beyond buffer length"), F(e3, 127, -128)), t2 >= this.length || (0 <= e3 ? this.writeUInt8(e3, t2, n2) : this.writeUInt8(255 + e3 + 1, t2, n2));
          }, f.prototype.writeInt16LE = function(e3, t2, n2) {
            B(this, e3, t2, true, n2);
          }, f.prototype.writeInt16BE = function(e3, t2, n2) {
            B(this, e3, t2, false, n2);
          }, f.prototype.writeInt32LE = function(e3, t2, n2) {
            L(this, e3, t2, true, n2);
          }, f.prototype.writeInt32BE = function(e3, t2, n2) {
            L(this, e3, t2, false, n2);
          }, f.prototype.writeFloatLE = function(e3, t2, n2) {
            U(this, e3, t2, true, n2);
          }, f.prototype.writeFloatBE = function(e3, t2, n2) {
            U(this, e3, t2, false, n2);
          }, f.prototype.writeDoubleLE = function(e3, t2, n2) {
            x(this, e3, t2, true, n2);
          }, f.prototype.writeDoubleBE = function(e3, t2, n2) {
            x(this, e3, t2, false, n2);
          }, f.prototype.fill = function(e3, t2, n2) {
            if (t2 = t2 || 0, n2 = n2 || this.length, d("number" == typeof (e3 = "string" == typeof (e3 = e3 || 0) ? e3.charCodeAt(0) : e3) && !isNaN(e3), "value is not a number"), d(t2 <= n2, "end < start"), n2 !== t2 && 0 !== this.length) {
              d(0 <= t2 && t2 < this.length, "start out of bounds"), d(0 <= n2 && n2 <= this.length, "end out of bounds");
              for (var r2 = t2; r2 < n2; r2++)
                this[r2] = e3;
            }
          }, f.prototype.inspect = function() {
            for (var e3 = [], t2 = this.length, n2 = 0; n2 < t2; n2++)
              if (e3[n2] = k(this[n2]), n2 === H.INSPECT_MAX_BYTES) {
                e3[n2 + 1] = "...";
                break;
              }
            return "<Buffer " + e3.join(" ") + ">";
          }, f.prototype.toArrayBuffer = function() {
            if ("undefined" == typeof Uint8Array)
              throw new Error("Buffer.toArrayBuffer not supported in this browser");
            if (f._useTypedArrays)
              return new f(this).buffer;
            for (var e3 = new Uint8Array(this.length), t2 = 0, n2 = e3.length; t2 < n2; t2 += 1)
              e3[t2] = this[t2];
            return e3.buffer;
          };
          var t = f.prototype;
          function S(e3, t2, n2) {
            return "number" != typeof e3 ? n2 : t2 <= (e3 = ~~e3) ? t2 : 0 <= e3 || 0 <= (e3 += t2) ? e3 : 0;
          }
          function j(e3) {
            return (e3 = ~~Math.ceil(+e3)) < 0 ? 0 : e3;
          }
          function C(e3) {
            return (Array.isArray || function(e4) {
              return "[object Array]" === Object.prototype.toString.call(e4);
            })(e3);
          }
          function k(e3) {
            return e3 < 16 ? "0" + e3.toString(16) : e3.toString(16);
          }
          function T(e3) {
            for (var t2 = [], n2 = 0; n2 < e3.length; n2++) {
              var r2 = e3.charCodeAt(n2);
              if (r2 <= 127)
                t2.push(e3.charCodeAt(n2));
              else
                for (var o2 = n2, i2 = (55296 <= r2 && r2 <= 57343 && n2++, encodeURIComponent(e3.slice(o2, n2 + 1)).substr(1).split("%")), u2 = 0; u2 < i2.length; u2++)
                  t2.push(parseInt(i2[u2], 16));
            }
            return t2;
          }
          function M(e3) {
            return a.toByteArray(e3);
          }
          function c(e3, t2, n2, r2) {
            for (var o2 = 0; o2 < r2 && !(o2 + n2 >= t2.length || o2 >= e3.length); o2++)
              t2[o2 + n2] = e3[o2];
            return o2;
          }
          function N(e3) {
            try {
              return decodeURIComponent(e3);
            } catch (e4) {
              return String.fromCharCode(65533);
            }
          }
          function Y(e3, t2) {
            d("number" == typeof e3, "cannot write a non-number as a number"), d(0 <= e3, "specified a negative value for writing an unsigned value"), d(e3 <= t2, "value is larger than maximum value for type"), d(Math.floor(e3) === e3, "value has a fractional component");
          }
          function F(e3, t2, n2) {
            d("number" == typeof e3, "cannot write a non-number as a number"), d(e3 <= t2, "value larger than maximum allowed value"), d(n2 <= e3, "value smaller than minimum allowed value"), d(Math.floor(e3) === e3, "value has a fractional component");
          }
          function D(e3, t2, n2) {
            d("number" == typeof e3, "cannot write a non-number as a number"), d(e3 <= t2, "value larger than maximum allowed value"), d(n2 <= e3, "value smaller than minimum allowed value");
          }
          function d(e3, t2) {
            if (!e3)
              throw new Error(t2 || "Failed assertion");
          }
          f._augment = function(e3) {
            return e3._isBuffer = true, e3._get = e3.get, e3._set = e3.set, e3.get = t.get, e3.set = t.set, e3.write = t.write, e3.toString = t.toString, e3.toLocaleString = t.toString, e3.toJSON = t.toJSON, e3.copy = t.copy, e3.slice = t.slice, e3.readUInt8 = t.readUInt8, e3.readUInt16LE = t.readUInt16LE, e3.readUInt16BE = t.readUInt16BE, e3.readUInt32LE = t.readUInt32LE, e3.readUInt32BE = t.readUInt32BE, e3.readInt8 = t.readInt8, e3.readInt16LE = t.readInt16LE, e3.readInt16BE = t.readInt16BE, e3.readInt32LE = t.readInt32LE, e3.readInt32BE = t.readInt32BE, e3.readFloatLE = t.readFloatLE, e3.readFloatBE = t.readFloatBE, e3.readDoubleLE = t.readDoubleLE, e3.readDoubleBE = t.readDoubleBE, e3.writeUInt8 = t.writeUInt8, e3.writeUInt16LE = t.writeUInt16LE, e3.writeUInt16BE = t.writeUInt16BE, e3.writeUInt32LE = t.writeUInt32LE, e3.writeUInt32BE = t.writeUInt32BE, e3.writeInt8 = t.writeInt8, e3.writeInt16LE = t.writeInt16LE, e3.writeInt16BE = t.writeInt16BE, e3.writeInt32LE = t.writeInt32LE, e3.writeInt32BE = t.writeInt32BE, e3.writeFloatLE = t.writeFloatLE, e3.writeFloatBE = t.writeFloatBE, e3.writeDoubleLE = t.writeDoubleLE, e3.writeDoubleBE = t.writeDoubleBE, e3.fill = t.fill, e3.inspect = t.inspect, e3.toArrayBuffer = t.toArrayBuffer, e3;
          };
        }.call(this, O("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, O("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
      }, { "base64-js": 2, buffer: 3, ieee754: 10, lYpoI2: 11 }], 4: [function(c, d, e) {
        !function(e2, t, a, n, r, o, i, u, s) {
          var a = c("buffer").Buffer, f = 4, l = new a(f);
          l.fill(0);
          d.exports = { hash: function(e3, t2, n2, r2) {
            for (var o2 = t2(function(e4, t3) {
              e4.length % f != 0 && (n3 = e4.length + (f - e4.length % f), e4 = a.concat([e4, l], n3));
              for (var n3, r3 = [], o3 = t3 ? e4.readInt32BE : e4.readInt32LE, i3 = 0; i3 < e4.length; i3 += f)
                r3.push(o3.call(e4, i3));
              return r3;
            }(e3 = a.isBuffer(e3) ? e3 : new a(e3), r2), 8 * e3.length), t2 = r2, i2 = new a(n2), u2 = t2 ? i2.writeInt32BE : i2.writeInt32LE, s2 = 0; s2 < o2.length; s2++)
              u2.call(i2, o2[s2], 4 * s2, true);
            return i2;
          } };
        }.call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { buffer: 3, lYpoI2: 11 }], 5: [function(v, e, _) {
        !function(l, c, u, d, h, p, g, y, w) {
          var u = v("buffer").Buffer, e2 = v("./sha"), t = v("./sha256"), n = v("./rng"), b = { sha1: e2, sha256: t, md5: v("./md5") }, s = 64, a = new u(s);
          function r(e3, n2) {
            var r2 = b[e3 = e3 || "sha1"], o2 = [];
            return r2 || i("algorithm:", e3, "is not yet supported"), { update: function(e4) {
              return u.isBuffer(e4) || (e4 = new u(e4)), o2.push(e4), e4.length, this;
            }, digest: function(e4) {
              var t2 = u.concat(o2), t2 = n2 ? function(e5, t3, n3) {
                u.isBuffer(t3) || (t3 = new u(t3)), u.isBuffer(n3) || (n3 = new u(n3)), t3.length > s ? t3 = e5(t3) : t3.length < s && (t3 = u.concat([t3, a], s));
                for (var r3 = new u(s), o3 = new u(s), i2 = 0; i2 < s; i2++)
                  r3[i2] = 54 ^ t3[i2], o3[i2] = 92 ^ t3[i2];
                return n3 = e5(u.concat([r3, n3])), e5(u.concat([o3, n3]));
              }(r2, n2, t2) : r2(t2);
              return o2 = null, e4 ? t2.toString(e4) : t2;
            } };
          }
          function i() {
            var e3 = [].slice.call(arguments).join(" ");
            throw new Error([e3, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join("\n"));
          }
          a.fill(0), _.createHash = function(e3) {
            return r(e3);
          }, _.createHmac = r, _.randomBytes = function(e3, t2) {
            if (!t2 || !t2.call)
              return new u(n(e3));
            try {
              t2.call(this, void 0, new u(n(e3)));
            } catch (e4) {
              t2(e4);
            }
          };
          var o, f = ["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], m = function(e3) {
            _[e3] = function() {
              i("sorry,", e3, "is not implemented yet");
            };
          };
          for (o in f)
            m(f[o], o);
        }.call(this, v("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, v("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 11 }], 6: [function(w, b, e) {
        !function(e2, r, o, i, u, a, f, l, y) {
          var t = w("./helpers");
          function n(e3, t2) {
            e3[t2 >> 5] |= 128 << t2 % 32, e3[14 + (t2 + 64 >>> 9 << 4)] = t2;
            for (var n2 = 1732584193, r2 = -271733879, o2 = -1732584194, i2 = 271733878, u2 = 0; u2 < e3.length; u2 += 16) {
              var s2 = n2, a2 = r2, f2 = o2, l2 = i2, n2 = c(n2, r2, o2, i2, e3[u2 + 0], 7, -680876936), i2 = c(i2, n2, r2, o2, e3[u2 + 1], 12, -389564586), o2 = c(o2, i2, n2, r2, e3[u2 + 2], 17, 606105819), r2 = c(r2, o2, i2, n2, e3[u2 + 3], 22, -1044525330);
              n2 = c(n2, r2, o2, i2, e3[u2 + 4], 7, -176418897), i2 = c(i2, n2, r2, o2, e3[u2 + 5], 12, 1200080426), o2 = c(o2, i2, n2, r2, e3[u2 + 6], 17, -1473231341), r2 = c(r2, o2, i2, n2, e3[u2 + 7], 22, -45705983), n2 = c(n2, r2, o2, i2, e3[u2 + 8], 7, 1770035416), i2 = c(i2, n2, r2, o2, e3[u2 + 9], 12, -1958414417), o2 = c(o2, i2, n2, r2, e3[u2 + 10], 17, -42063), r2 = c(r2, o2, i2, n2, e3[u2 + 11], 22, -1990404162), n2 = c(n2, r2, o2, i2, e3[u2 + 12], 7, 1804603682), i2 = c(i2, n2, r2, o2, e3[u2 + 13], 12, -40341101), o2 = c(o2, i2, n2, r2, e3[u2 + 14], 17, -1502002290), n2 = d(n2, r2 = c(r2, o2, i2, n2, e3[u2 + 15], 22, 1236535329), o2, i2, e3[u2 + 1], 5, -165796510), i2 = d(i2, n2, r2, o2, e3[u2 + 6], 9, -1069501632), o2 = d(o2, i2, n2, r2, e3[u2 + 11], 14, 643717713), r2 = d(r2, o2, i2, n2, e3[u2 + 0], 20, -373897302), n2 = d(n2, r2, o2, i2, e3[u2 + 5], 5, -701558691), i2 = d(i2, n2, r2, o2, e3[u2 + 10], 9, 38016083), o2 = d(o2, i2, n2, r2, e3[u2 + 15], 14, -660478335), r2 = d(r2, o2, i2, n2, e3[u2 + 4], 20, -405537848), n2 = d(n2, r2, o2, i2, e3[u2 + 9], 5, 568446438), i2 = d(i2, n2, r2, o2, e3[u2 + 14], 9, -1019803690), o2 = d(o2, i2, n2, r2, e3[u2 + 3], 14, -187363961), r2 = d(r2, o2, i2, n2, e3[u2 + 8], 20, 1163531501), n2 = d(n2, r2, o2, i2, e3[u2 + 13], 5, -1444681467), i2 = d(i2, n2, r2, o2, e3[u2 + 2], 9, -51403784), o2 = d(o2, i2, n2, r2, e3[u2 + 7], 14, 1735328473), n2 = h(n2, r2 = d(r2, o2, i2, n2, e3[u2 + 12], 20, -1926607734), o2, i2, e3[u2 + 5], 4, -378558), i2 = h(i2, n2, r2, o2, e3[u2 + 8], 11, -2022574463), o2 = h(o2, i2, n2, r2, e3[u2 + 11], 16, 1839030562), r2 = h(r2, o2, i2, n2, e3[u2 + 14], 23, -35309556), n2 = h(n2, r2, o2, i2, e3[u2 + 1], 4, -1530992060), i2 = h(i2, n2, r2, o2, e3[u2 + 4], 11, 1272893353), o2 = h(o2, i2, n2, r2, e3[u2 + 7], 16, -155497632), r2 = h(r2, o2, i2, n2, e3[u2 + 10], 23, -1094730640), n2 = h(n2, r2, o2, i2, e3[u2 + 13], 4, 681279174), i2 = h(i2, n2, r2, o2, e3[u2 + 0], 11, -358537222), o2 = h(o2, i2, n2, r2, e3[u2 + 3], 16, -722521979), r2 = h(r2, o2, i2, n2, e3[u2 + 6], 23, 76029189), n2 = h(n2, r2, o2, i2, e3[u2 + 9], 4, -640364487), i2 = h(i2, n2, r2, o2, e3[u2 + 12], 11, -421815835), o2 = h(o2, i2, n2, r2, e3[u2 + 15], 16, 530742520), n2 = p(n2, r2 = h(r2, o2, i2, n2, e3[u2 + 2], 23, -995338651), o2, i2, e3[u2 + 0], 6, -198630844), i2 = p(i2, n2, r2, o2, e3[u2 + 7], 10, 1126891415), o2 = p(o2, i2, n2, r2, e3[u2 + 14], 15, -1416354905), r2 = p(r2, o2, i2, n2, e3[u2 + 5], 21, -57434055), n2 = p(n2, r2, o2, i2, e3[u2 + 12], 6, 1700485571), i2 = p(i2, n2, r2, o2, e3[u2 + 3], 10, -1894986606), o2 = p(o2, i2, n2, r2, e3[u2 + 10], 15, -1051523), r2 = p(r2, o2, i2, n2, e3[u2 + 1], 21, -2054922799), n2 = p(n2, r2, o2, i2, e3[u2 + 8], 6, 1873313359), i2 = p(i2, n2, r2, o2, e3[u2 + 15], 10, -30611744), o2 = p(o2, i2, n2, r2, e3[u2 + 6], 15, -1560198380), r2 = p(r2, o2, i2, n2, e3[u2 + 13], 21, 1309151649), n2 = p(n2, r2, o2, i2, e3[u2 + 4], 6, -145523070), i2 = p(i2, n2, r2, o2, e3[u2 + 11], 10, -1120210379), o2 = p(o2, i2, n2, r2, e3[u2 + 2], 15, 718787259), r2 = p(r2, o2, i2, n2, e3[u2 + 9], 21, -343485551), n2 = g(n2, s2), r2 = g(r2, a2), o2 = g(o2, f2), i2 = g(i2, l2);
            }
            return Array(n2, r2, o2, i2);
          }
          function s(e3, t2, n2, r2, o2, i2) {
            return g((t2 = g(g(t2, e3), g(r2, i2))) << o2 | t2 >>> 32 - o2, n2);
          }
          function c(e3, t2, n2, r2, o2, i2, u2) {
            return s(t2 & n2 | ~t2 & r2, e3, t2, o2, i2, u2);
          }
          function d(e3, t2, n2, r2, o2, i2, u2) {
            return s(t2 & r2 | n2 & ~r2, e3, t2, o2, i2, u2);
          }
          function h(e3, t2, n2, r2, o2, i2, u2) {
            return s(t2 ^ n2 ^ r2, e3, t2, o2, i2, u2);
          }
          function p(e3, t2, n2, r2, o2, i2, u2) {
            return s(n2 ^ (t2 | ~r2), e3, t2, o2, i2, u2);
          }
          function g(e3, t2) {
            var n2 = (65535 & e3) + (65535 & t2);
            return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
          }
          b.exports = function(e3) {
            return t.hash(e3, n, 16);
          };
        }.call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 7: [function(e, l, t) {
        !function(e2, t2, n, r, o, i, u, s, f) {
          var a;
          l.exports = a || function(e3) {
            for (var t3, n2 = new Array(e3), r2 = 0; r2 < e3; r2++)
              0 == (3 & r2) && (t3 = 4294967296 * Math.random()), n2[r2] = t3 >>> ((3 & r2) << 3) & 255;
            return n2;
          };
        }.call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { buffer: 3, lYpoI2: 11 }], 8: [function(c, d, e) {
        !function(e2, t, n, r, o, s, a, f, l) {
          var i = c("./helpers");
          function u(l2, c2) {
            l2[c2 >> 5] |= 128 << 24 - c2 % 32, l2[15 + (c2 + 64 >> 9 << 4)] = c2;
            for (var e3, t2, n2, r2 = Array(80), o2 = 1732584193, i2 = -271733879, u2 = -1732584194, s2 = 271733878, d2 = -1009589776, h = 0; h < l2.length; h += 16) {
              for (var p = o2, g = i2, y = u2, w = s2, b = d2, a2 = 0; a2 < 80; a2++) {
                r2[a2] = a2 < 16 ? l2[h + a2] : v(r2[a2 - 3] ^ r2[a2 - 8] ^ r2[a2 - 14] ^ r2[a2 - 16], 1);
                var f2 = m(m(v(o2, 5), (f2 = i2, t2 = u2, n2 = s2, (e3 = a2) < 20 ? f2 & t2 | ~f2 & n2 : !(e3 < 40) && e3 < 60 ? f2 & t2 | f2 & n2 | t2 & n2 : f2 ^ t2 ^ n2)), m(m(d2, r2[a2]), (e3 = a2) < 20 ? 1518500249 : e3 < 40 ? 1859775393 : e3 < 60 ? -1894007588 : -899497514)), d2 = s2, s2 = u2, u2 = v(i2, 30), i2 = o2, o2 = f2;
              }
              o2 = m(o2, p), i2 = m(i2, g), u2 = m(u2, y), s2 = m(s2, w), d2 = m(d2, b);
            }
            return Array(o2, i2, u2, s2, d2);
          }
          function m(e3, t2) {
            var n2 = (65535 & e3) + (65535 & t2);
            return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
          }
          function v(e3, t2) {
            return e3 << t2 | e3 >>> 32 - t2;
          }
          d.exports = function(e3) {
            return i.hash(e3, u, 20, true);
          };
        }.call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 9: [function(c, d, e) {
        !function(e2, t, n, r, u, s, a, f, l) {
          function b(e3, t2) {
            var n2 = (65535 & e3) + (65535 & t2);
            return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
          }
          function o(e3, l2) {
            var c2, d2 = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), t2 = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), n2 = new Array(64);
            e3[l2 >> 5] |= 128 << 24 - l2 % 32, e3[15 + (l2 + 64 >> 9 << 4)] = l2;
            for (var r2, o2, h = 0; h < e3.length; h += 16) {
              for (var i2 = t2[0], u2 = t2[1], s2 = t2[2], p = t2[3], a2 = t2[4], g = t2[5], y = t2[6], w = t2[7], f2 = 0; f2 < 64; f2++)
                n2[f2] = f2 < 16 ? e3[f2 + h] : b(b(b((o2 = n2[f2 - 2], m(o2, 17) ^ m(o2, 19) ^ v(o2, 10)), n2[f2 - 7]), (o2 = n2[f2 - 15], m(o2, 7) ^ m(o2, 18) ^ v(o2, 3))), n2[f2 - 16]), c2 = b(b(b(b(w, m(o2 = a2, 6) ^ m(o2, 11) ^ m(o2, 25)), a2 & g ^ ~a2 & y), d2[f2]), n2[f2]), r2 = b(m(r2 = i2, 2) ^ m(r2, 13) ^ m(r2, 22), i2 & u2 ^ i2 & s2 ^ u2 & s2), w = y, y = g, g = a2, a2 = b(p, c2), p = s2, s2 = u2, u2 = i2, i2 = b(c2, r2);
              t2[0] = b(i2, t2[0]), t2[1] = b(u2, t2[1]), t2[2] = b(s2, t2[2]), t2[3] = b(p, t2[3]), t2[4] = b(a2, t2[4]), t2[5] = b(g, t2[5]), t2[6] = b(y, t2[6]), t2[7] = b(w, t2[7]);
            }
            return t2;
          }
          var i = c("./helpers"), m = function(e3, t2) {
            return e3 >>> t2 | e3 << 32 - t2;
          }, v = function(e3, t2) {
            return e3 >>> t2;
          };
          d.exports = function(e3) {
            return i.hash(e3, o, 32, true);
          };
        }.call(this, c("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 10: [function(e, t, f) {
        !function(e2, t2, n, r, o, i, u, s, a) {
          f.read = function(e3, t3, n2, r2, o2) {
            var i2, u2, l = 8 * o2 - r2 - 1, c = (1 << l) - 1, d = c >> 1, s2 = -7, a2 = n2 ? o2 - 1 : 0, f2 = n2 ? -1 : 1, o2 = e3[t3 + a2];
            for (a2 += f2, i2 = o2 & (1 << -s2) - 1, o2 >>= -s2, s2 += l; 0 < s2; i2 = 256 * i2 + e3[t3 + a2], a2 += f2, s2 -= 8)
              ;
            for (u2 = i2 & (1 << -s2) - 1, i2 >>= -s2, s2 += r2; 0 < s2; u2 = 256 * u2 + e3[t3 + a2], a2 += f2, s2 -= 8)
              ;
            if (0 === i2)
              i2 = 1 - d;
            else {
              if (i2 === c)
                return u2 ? NaN : 1 / 0 * (o2 ? -1 : 1);
              u2 += Math.pow(2, r2), i2 -= d;
            }
            return (o2 ? -1 : 1) * u2 * Math.pow(2, i2 - r2);
          }, f.write = function(e3, t3, l, n2, r2, c) {
            var o2, i2, u2 = 8 * c - r2 - 1, s2 = (1 << u2) - 1, a2 = s2 >> 1, d = 23 === r2 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f2 = n2 ? 0 : c - 1, h = n2 ? 1 : -1, c = t3 < 0 || 0 === t3 && 1 / t3 < 0 ? 1 : 0;
            for (t3 = Math.abs(t3), isNaN(t3) || t3 === 1 / 0 ? (i2 = isNaN(t3) ? 1 : 0, o2 = s2) : (o2 = Math.floor(Math.log(t3) / Math.LN2), t3 * (n2 = Math.pow(2, -o2)) < 1 && (o2--, n2 *= 2), 2 <= (t3 += 1 <= o2 + a2 ? d / n2 : d * Math.pow(2, 1 - a2)) * n2 && (o2++, n2 /= 2), s2 <= o2 + a2 ? (i2 = 0, o2 = s2) : 1 <= o2 + a2 ? (i2 = (t3 * n2 - 1) * Math.pow(2, r2), o2 += a2) : (i2 = t3 * Math.pow(2, a2 - 1) * Math.pow(2, r2), o2 = 0)); 8 <= r2; e3[l + f2] = 255 & i2, f2 += h, i2 /= 256, r2 -= 8)
              ;
            for (o2 = o2 << r2 | i2, u2 += r2; 0 < u2; e3[l + f2] = 255 & o2, f2 += h, o2 /= 256, u2 -= 8)
              ;
            e3[l + f2 - h] |= 128 * c;
          };
        }.call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
      }, { buffer: 3, lYpoI2: 11 }], 11: [function(e, h, t) {
        !function(e2, t2, n, r, o, f, l, c, d) {
          var i, u, s;
          function a() {
          }
          (e2 = h.exports = {}).nextTick = (u = "undefined" != typeof window && window.setImmediate, s = "undefined" != typeof window && window.postMessage && window.addEventListener, u ? function(e3) {
            return window.setImmediate(e3);
          } : s ? (i = [], window.addEventListener("message", function(e3) {
            var t3 = e3.source;
            t3 !== window && null !== t3 || "process-tick" !== e3.data || (e3.stopPropagation(), 0 < i.length && i.shift()());
          }, true), function(e3) {
            i.push(e3), window.postMessage("process-tick", "*");
          }) : function(e3) {
            setTimeout(e3, 0);
          }), e2.title = "browser", e2.browser = true, e2.env = {}, e2.argv = [], e2.on = a, e2.addListener = a, e2.once = a, e2.off = a, e2.removeListener = a, e2.removeAllListeners = a, e2.emit = a, e2.binding = function(e3) {
            throw new Error("process.binding is not supported");
          }, e2.cwd = function() {
            return "/";
          }, e2.chdir = function(e3) {
            throw new Error("process.chdir is not supported");
          };
        }.call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
      }, { buffer: 3, lYpoI2: 11 }] }, {}, [1])(1);
    });
  }
});

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/llms/openai.js
var import_openai2 = __toESM(require_dist(), 1);

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/util/chunk.js
var chunkArray = (arr, chunkSize) => arr.reduce((chunks, elem, index) => {
  const chunkIndex = Math.floor(index / chunkSize);
  const chunk = chunks[chunkIndex] || [];
  chunks[chunkIndex] = chunk.concat([elem]);
  return chunks;
}, []);

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/cache/base.js
var import_object_hash = __toESM(require_object_hash(), 1);
var getCacheKey = (...strings) => (0, import_object_hash.default)(strings.join("_"));

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/cache/index.js
var GLOBAL_MAP = /* @__PURE__ */ new Map();
var InMemoryCache = class extends BaseCache {
  constructor(map) {
    super();
    Object.defineProperty(this, "cache", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cache = map != null ? map : /* @__PURE__ */ new Map();
  }
  lookup(prompt, llmKey) {
    var _a;
    return Promise.resolve((_a = this.cache.get(getCacheKey(prompt, llmKey))) != null ? _a : null);
  }
  async update(prompt, llmKey, value) {
    this.cache.set(getCacheKey(prompt, llmKey), value);
  }
  static global() {
    return new InMemoryCache(GLOBAL_MAP);
  }
};

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/llms/base.js
var BaseLLM = class extends BaseLanguageModel {
  constructor({ cache, concurrency, ...rest }) {
    super(concurrency ? { maxConcurrency: concurrency, ...rest } : rest);
    Object.defineProperty(this, "cache", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    if (typeof cache === "object") {
      this.cache = cache;
    } else if (cache) {
      this.cache = InMemoryCache.global();
    } else {
      this.cache = void 0;
    }
  }
  async generatePrompt(promptValues, options, callbacks) {
    const prompts = promptValues.map((promptValue) => promptValue.toString());
    return this.generate(prompts, options, callbacks);
  }
  /**
   * Get the parameters used to invoke the model
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invocationParams() {
    return {};
  }
  /** @ignore */
  async _generateUncached(prompts, options, callbacks) {
    const callbackManager_ = await CallbackManager.configure(callbacks, this.callbacks, { verbose: this.verbose });
    const invocationParams = { invocation_params: this == null ? void 0 : this.invocationParams() };
    const runManager = await (callbackManager_ == null ? void 0 : callbackManager_.handleLLMStart({ name: this._llmType() }, prompts, void 0, void 0, invocationParams));
    let output;
    try {
      output = await this._generate(prompts, options, runManager);
    } catch (err) {
      await (runManager == null ? void 0 : runManager.handleLLMError(err));
      throw err;
    }
    await (runManager == null ? void 0 : runManager.handleLLMEnd(output));
    Object.defineProperty(output, RUN_KEY, {
      value: runManager ? { runId: runManager == null ? void 0 : runManager.runId } : void 0,
      configurable: true
    });
    return output;
  }
  /**
   * Run the LLM on the given propmts an input, handling caching.
   */
  async generate(prompts, options, callbacks) {
    var _a, _b;
    if (!Array.isArray(prompts)) {
      throw new Error("Argument 'prompts' is expected to be a string[]");
    }
    let parsedOptions;
    if (Array.isArray(options)) {
      parsedOptions = { stop: options };
    } else if ((options == null ? void 0 : options.timeout) && !options.signal) {
      parsedOptions = {
        ...options,
        signal: AbortSignal.timeout(options.timeout)
      };
    } else {
      parsedOptions = options != null ? options : {};
    }
    if (!this.cache) {
      return this._generateUncached(prompts, parsedOptions, callbacks);
    }
    const { cache } = this;
    const params = this.serialize();
    params.stop = (_a = parsedOptions.stop) != null ? _a : params.stop;
    const llmStringKey = `${Object.entries(params).sort()}`;
    const missingPromptIndices = [];
    const generations = await Promise.all(prompts.map(async (prompt, index) => {
      const result = await cache.lookup(prompt, llmStringKey);
      if (!result) {
        missingPromptIndices.push(index);
      }
      return result;
    }));
    let llmOutput = {};
    if (missingPromptIndices.length > 0) {
      const results = await this._generateUncached(missingPromptIndices.map((i) => prompts[i]), parsedOptions, callbacks);
      await Promise.all(results.generations.map(async (generation, index) => {
        const promptIndex = missingPromptIndices[index];
        generations[promptIndex] = generation;
        return cache.update(prompts[promptIndex], llmStringKey, generation);
      }));
      llmOutput = (_b = results.llmOutput) != null ? _b : {};
    }
    return { generations, llmOutput };
  }
  /**
   * Convenience wrapper for {@link generate} that takes in a single string prompt and returns a single string output.
   */
  async call(prompt, options, callbacks) {
    const { generations } = await this.generate([prompt], options != null ? options : {}, callbacks);
    return generations[0][0].text;
  }
  async predict(text, options, callbacks) {
    return this.call(text, options, callbacks);
  }
  async predictMessages(messages, options, callbacks) {
    const text = getBufferString(messages);
    const prediction = await this.call(text, options, callbacks);
    return new AIChatMessage(prediction);
  }
  /**
   * Get the identifying parameters of the LLM.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _identifyingParams() {
    return {};
  }
  /**
   * Return a json-like object representing this LLM.
   */
  serialize() {
    return {
      ...this._identifyingParams(),
      _type: this._llmType(),
      _model: this._modelType()
    };
  }
  _modelType() {
    return "base_llm";
  }
  /**
   * Load an LLM from a json-like object describing it.
   */
  static async deserialize(data) {
    const { _type, _model, ...rest } = data;
    if (_model && _model !== "base_llm") {
      throw new Error(`Cannot load LLM with model ${_model}`);
    }
    const Cls = {
      openai: (await import("./GONS7MA6.js")).OpenAI
    }[_type];
    if (Cls === void 0) {
      throw new Error(`Cannot load  LLM with type ${_type}`);
    }
    return new Cls(rest);
  }
};
var LLM = class extends BaseLLM {
  async _generate(prompts, options, runManager) {
    const generations = await Promise.all(prompts.map((prompt) => this._call(prompt, options, runManager).then((text) => [{ text }])));
    return { generations };
  }
};

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/llms/openai-chat.js
var import_openai = __toESM(require_dist(), 1);
var OpenAIChat = class extends LLM {
  get callKeys() {
    return ["stop", "signal", "timeout", "options"];
  }
  constructor(fields, configuration) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
    super(fields != null ? fields : {});
    Object.defineProperty(this, "temperature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "topP", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "frequencyPenalty", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "presencePenalty", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "n", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "logitBias", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "maxTokens", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "modelName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "gpt-3.5-turbo"
    });
    Object.defineProperty(this, "prefixMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "modelKwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "timeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "stop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "streaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "azureOpenAIApiVersion", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiInstanceName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "clientConfig", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    const apiKey = (_b = fields == null ? void 0 : fields.openAIApiKey) != null ? _b : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_a = process.env) == null ? void 0 : _a.OPENAI_API_KEY
    ) : void 0;
    const azureApiKey = (_d = fields == null ? void 0 : fields.azureOpenAIApiKey) != null ? _d : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_c = process.env) == null ? void 0 : _c.AZURE_OPENAI_API_KEY
    ) : void 0;
    if (!azureApiKey && !apiKey) {
      throw new Error("(Azure) OpenAI API key not found");
    }
    const azureApiInstanceName = (_f = fields == null ? void 0 : fields.azureOpenAIApiInstanceName) != null ? _f : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_e = process.env) == null ? void 0 : _e.AZURE_OPENAI_API_INSTANCE_NAME
    ) : void 0;
    const azureApiDeploymentName = (_h = fields == null ? void 0 : fields.azureOpenAIApiDeploymentName) != null ? _h : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_g = process.env) == null ? void 0 : _g.AZURE_OPENAI_API_DEPLOYMENT_NAME
    ) : void 0;
    const azureApiVersion = (_j = fields == null ? void 0 : fields.azureOpenAIApiVersion) != null ? _j : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_i = process.env) == null ? void 0 : _i.AZURE_OPENAI_API_VERSION
    ) : void 0;
    this.modelName = (_k = fields == null ? void 0 : fields.modelName) != null ? _k : this.modelName;
    this.prefixMessages = (_l = fields == null ? void 0 : fields.prefixMessages) != null ? _l : this.prefixMessages;
    this.modelKwargs = (_m = fields == null ? void 0 : fields.modelKwargs) != null ? _m : {};
    this.timeout = fields == null ? void 0 : fields.timeout;
    this.temperature = (_n = fields == null ? void 0 : fields.temperature) != null ? _n : this.temperature;
    this.topP = (_o = fields == null ? void 0 : fields.topP) != null ? _o : this.topP;
    this.frequencyPenalty = (_p = fields == null ? void 0 : fields.frequencyPenalty) != null ? _p : this.frequencyPenalty;
    this.presencePenalty = (_q = fields == null ? void 0 : fields.presencePenalty) != null ? _q : this.presencePenalty;
    this.n = (_r = fields == null ? void 0 : fields.n) != null ? _r : this.n;
    this.logitBias = fields == null ? void 0 : fields.logitBias;
    this.maxTokens = fields == null ? void 0 : fields.maxTokens;
    this.stop = fields == null ? void 0 : fields.stop;
    this.streaming = (_s = fields == null ? void 0 : fields.streaming) != null ? _s : false;
    this.azureOpenAIApiVersion = azureApiVersion;
    this.azureOpenAIApiKey = azureApiKey;
    this.azureOpenAIApiInstanceName = azureApiInstanceName;
    this.azureOpenAIApiDeploymentName = azureApiDeploymentName;
    if (this.streaming && this.n > 1) {
      throw new Error("Cannot stream results when n > 1");
    }
    if (this.azureOpenAIApiKey) {
      if (!this.azureOpenAIApiInstanceName) {
        throw new Error("Azure OpenAI API instance name not found");
      }
      if (!this.azureOpenAIApiDeploymentName) {
        throw new Error("Azure OpenAI API deployment name not found");
      }
      if (!this.azureOpenAIApiVersion) {
        throw new Error("Azure OpenAI API version not found");
      }
    }
    this.clientConfig = {
      apiKey,
      ...configuration
    };
  }
  /**
   * Get the parameters used to invoke the model
   */
  invocationParams() {
    return {
      model: this.modelName,
      temperature: this.temperature,
      top_p: this.topP,
      frequency_penalty: this.frequencyPenalty,
      presence_penalty: this.presencePenalty,
      n: this.n,
      logit_bias: this.logitBias,
      max_tokens: this.maxTokens === -1 ? void 0 : this.maxTokens,
      stop: this.stop,
      stream: this.streaming,
      ...this.modelKwargs
    };
  }
  /** @ignore */
  _identifyingParams() {
    return {
      model_name: this.modelName,
      ...this.invocationParams(),
      ...this.clientConfig
    };
  }
  /**
   * Get the identifying parameters for the model
   */
  identifyingParams() {
    return {
      model_name: this.modelName,
      ...this.invocationParams(),
      ...this.clientConfig
    };
  }
  formatMessages(prompt) {
    const message = {
      role: "user",
      content: prompt
    };
    return this.prefixMessages ? [...this.prefixMessages, message] : [message];
  }
  /** @ignore */
  async _call(prompt, options, runManager) {
    var _a, _b;
    const { stop } = options;
    const params = this.invocationParams();
    params.stop = stop != null ? stop : params.stop;
    const data = params.stream ? await new Promise((resolve, reject) => {
      let response;
      let rejected = false;
      let resolved = false;
      this.completionWithRetry({
        ...params,
        messages: this.formatMessages(prompt)
      }, {
        signal: options.signal,
        ...options.options,
        adapter: fetchAdapter,
        responseType: "stream",
        onmessage: (event) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
          if (((_b2 = (_a2 = event.data) == null ? void 0 : _a2.trim) == null ? void 0 : _b2.call(_a2)) === "[DONE]") {
            if (resolved) {
              return;
            }
            resolved = true;
            resolve(response);
          } else {
            const message = JSON.parse(event.data);
            if (!response) {
              response = {
                id: message.id,
                object: message.object,
                created: message.created,
                model: message.model,
                choices: []
              };
            }
            for (const part of message.choices) {
              if (part != null) {
                let choice = response.choices.find((c) => c.index === part.index);
                if (!choice) {
                  choice = {
                    index: part.index,
                    finish_reason: (_c = part.finish_reason) != null ? _c : void 0
                  };
                  response.choices.push(choice);
                }
                if (!choice.message) {
                  choice.message = {
                    role: (_d = part.delta) == null ? void 0 : _d.role,
                    content: (_f = (_e = part.delta) == null ? void 0 : _e.content) != null ? _f : ""
                  };
                }
                choice.message.content += (_h = (_g = part.delta) == null ? void 0 : _g.content) != null ? _h : "";
                void (runManager == null ? void 0 : runManager.handleLLMNewToken((_j = (_i = part.delta) == null ? void 0 : _i.content) != null ? _j : ""));
              }
            }
            if (!resolved && message.choices.every((c) => c.finish_reason != null)) {
              resolved = true;
              resolve(response);
            }
          }
        }
      }).catch((error) => {
        if (!rejected) {
          rejected = true;
          reject(error);
        }
      });
    }) : await this.completionWithRetry({
      ...params,
      messages: this.formatMessages(prompt)
    }, {
      signal: options.signal,
      ...options.options
    });
    return (_b = (_a = data.choices[0].message) == null ? void 0 : _a.content) != null ? _b : "";
  }
  /** @ignore */
  async completionWithRetry(request, options) {
    if (!this.client) {
      const endpoint = this.azureOpenAIApiKey ? `https://${this.azureOpenAIApiInstanceName}.openai.azure.com/openai/deployments/${this.azureOpenAIApiDeploymentName}` : this.clientConfig.basePath;
      const clientConfig = new import_openai.Configuration({
        ...this.clientConfig,
        basePath: endpoint,
        baseOptions: {
          timeout: this.timeout,
          ...this.clientConfig.baseOptions
        }
      });
      this.client = new import_openai.OpenAIApi(clientConfig);
    }
    const axiosOptions = {
      adapter: isNode() ? void 0 : fetchAdapter,
      ...this.clientConfig.baseOptions,
      ...options
    };
    if (this.azureOpenAIApiKey) {
      axiosOptions.headers = {
        "api-key": this.azureOpenAIApiKey,
        ...axiosOptions.headers
      };
      axiosOptions.params = {
        "api-version": this.azureOpenAIApiVersion,
        ...axiosOptions.params
      };
    }
    return this.caller.call(this.client.createChatCompletion.bind(this.client), request, axiosOptions).then((res) => res.data);
  }
  _llmType() {
    return "openai";
  }
};
var PromptLayerOpenAIChat = class extends OpenAIChat {
  constructor(fields) {
    var _a, _b, _c;
    super(fields);
    Object.defineProperty(this, "promptLayerApiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "plTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.plTags = (_a = fields == null ? void 0 : fields.plTags) != null ? _a : [];
    this.promptLayerApiKey = (_c = fields == null ? void 0 : fields.promptLayerApiKey) != null ? _c : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_b = process.env) == null ? void 0 : _b.PROMPTLAYER_API_KEY
    ) : void 0;
    if (!this.promptLayerApiKey) {
      throw new Error("Missing PromptLayer API key");
    }
  }
  async completionWithRetry(request, options) {
    var _a;
    if (request.stream) {
      return super.completionWithRetry(request, options);
    }
    const requestStartTime = Date.now();
    const response = await super.completionWithRetry(request);
    const requestEndTime = Date.now();
    await this.caller.call(fetch, "https://api.promptlayer.com/track-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        function_name: "openai.ChatCompletion.create",
        args: [],
        kwargs: { engine: request.model, messages: request.messages },
        tags: (_a = this.plTags) != null ? _a : [],
        request_response: response,
        request_start_time: Math.floor(requestStartTime / 1e3),
        request_end_time: Math.floor(requestEndTime / 1e3),
        api_key: this.promptLayerApiKey
      })
    });
    return response;
  }
};

// node_modules/.pnpm/langchain@0.0.81_axios@1.3.3_cheerio@1.0.0-rc.12_ignore@5.3.2/node_modules/langchain/dist/llms/openai.js
var OpenAI = class extends BaseLLM {
  get callKeys() {
    return ["stop", "signal", "timeout", "options"];
  }
  constructor(fields, configuration) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
    if (((_a = fields == null ? void 0 : fields.modelName) == null ? void 0 : _a.startsWith("gpt-3.5-turbo")) || ((_b = fields == null ? void 0 : fields.modelName) == null ? void 0 : _b.startsWith("gpt-4")) || ((_c = fields == null ? void 0 : fields.modelName) == null ? void 0 : _c.startsWith("gpt-4-32k"))) {
      return new OpenAIChat(fields, configuration);
    }
    super(fields != null ? fields : {});
    Object.defineProperty(this, "temperature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0.7
    });
    Object.defineProperty(this, "maxTokens", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 256
    });
    Object.defineProperty(this, "topP", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "frequencyPenalty", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "presencePenalty", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "n", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "bestOf", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "logitBias", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "modelName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "text-davinci-003"
    });
    Object.defineProperty(this, "modelKwargs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "batchSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 20
    });
    Object.defineProperty(this, "timeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "stop", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "streaming", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "azureOpenAIApiVersion", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiInstanceName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "client", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "clientConfig", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    const apiKey = (_e = fields == null ? void 0 : fields.openAIApiKey) != null ? _e : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_d = process.env) == null ? void 0 : _d.OPENAI_API_KEY
    ) : void 0;
    const azureApiKey = (_g = fields == null ? void 0 : fields.azureOpenAIApiKey) != null ? _g : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_f = process.env) == null ? void 0 : _f.AZURE_OPENAI_API_KEY
    ) : void 0;
    if (!azureApiKey && !apiKey) {
      throw new Error("(Azure) OpenAI API key not found");
    }
    const azureApiInstanceName = (_i = fields == null ? void 0 : fields.azureOpenAIApiInstanceName) != null ? _i : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_h = process.env) == null ? void 0 : _h.AZURE_OPENAI_API_INSTANCE_NAME
    ) : void 0;
    const azureApiDeploymentName = (_l = (fields == null ? void 0 : fields.azureOpenAIApiCompletionsDeploymentName) || (fields == null ? void 0 : fields.azureOpenAIApiDeploymentName)) != null ? _l : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      ((_j = process.env) == null ? void 0 : _j.AZURE_OPENAI_API_COMPLETIONS_DEPLOYMENT_NAME) || // eslint-disable-next-line no-process-env
      ((_k = process.env) == null ? void 0 : _k.AZURE_OPENAI_API_DEPLOYMENT_NAME)
    ) : void 0;
    const azureApiVersion = (_n = fields == null ? void 0 : fields.azureOpenAIApiVersion) != null ? _n : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_m = process.env) == null ? void 0 : _m.AZURE_OPENAI_API_VERSION
    ) : void 0;
    this.modelName = (_o = fields == null ? void 0 : fields.modelName) != null ? _o : this.modelName;
    this.modelKwargs = (_p = fields == null ? void 0 : fields.modelKwargs) != null ? _p : {};
    this.batchSize = (_q = fields == null ? void 0 : fields.batchSize) != null ? _q : this.batchSize;
    this.timeout = fields == null ? void 0 : fields.timeout;
    this.temperature = (_r = fields == null ? void 0 : fields.temperature) != null ? _r : this.temperature;
    this.maxTokens = (_s = fields == null ? void 0 : fields.maxTokens) != null ? _s : this.maxTokens;
    this.topP = (_t = fields == null ? void 0 : fields.topP) != null ? _t : this.topP;
    this.frequencyPenalty = (_u = fields == null ? void 0 : fields.frequencyPenalty) != null ? _u : this.frequencyPenalty;
    this.presencePenalty = (_v = fields == null ? void 0 : fields.presencePenalty) != null ? _v : this.presencePenalty;
    this.n = (_w = fields == null ? void 0 : fields.n) != null ? _w : this.n;
    this.bestOf = (_x = fields == null ? void 0 : fields.bestOf) != null ? _x : this.bestOf;
    this.logitBias = fields == null ? void 0 : fields.logitBias;
    this.stop = fields == null ? void 0 : fields.stop;
    this.streaming = (_y = fields == null ? void 0 : fields.streaming) != null ? _y : false;
    this.azureOpenAIApiVersion = azureApiVersion;
    this.azureOpenAIApiKey = azureApiKey;
    this.azureOpenAIApiInstanceName = azureApiInstanceName;
    this.azureOpenAIApiDeploymentName = azureApiDeploymentName;
    if (this.streaming && this.n > 1) {
      throw new Error("Cannot stream results when n > 1");
    }
    if (this.streaming && this.bestOf > 1) {
      throw new Error("Cannot stream results when bestOf > 1");
    }
    if (this.azureOpenAIApiKey) {
      if (!this.azureOpenAIApiInstanceName) {
        throw new Error("Azure OpenAI API instance name not found");
      }
      if (!this.azureOpenAIApiDeploymentName) {
        throw new Error("Azure OpenAI API deployment name not found");
      }
      if (!this.azureOpenAIApiVersion) {
        throw new Error("Azure OpenAI API version not found");
      }
    }
    this.clientConfig = {
      apiKey,
      ...configuration
    };
  }
  /**
   * Get the parameters used to invoke the model
   */
  invocationParams() {
    return {
      model: this.modelName,
      temperature: this.temperature,
      max_tokens: this.maxTokens,
      top_p: this.topP,
      frequency_penalty: this.frequencyPenalty,
      presence_penalty: this.presencePenalty,
      n: this.n,
      best_of: this.bestOf,
      logit_bias: this.logitBias,
      stop: this.stop,
      stream: this.streaming,
      ...this.modelKwargs
    };
  }
  _identifyingParams() {
    return {
      model_name: this.modelName,
      ...this.invocationParams(),
      ...this.clientConfig
    };
  }
  /**
   * Get the identifying parameters for the model
   */
  identifyingParams() {
    return this._identifyingParams();
  }
  /**
   * Call out to OpenAI's endpoint with k unique prompts
   *
   * @param [prompts] - The prompts to pass into the model.
   * @param [options] - Optional list of stop words to use when generating.
   * @param [runManager] - Optional callback manager to use when generating.
   *
   * @returns The full LLM output.
   *
   * @example
   * ```ts
   * import { OpenAI } from "langchain/llms/openai";
   * const openai = new OpenAI();
   * const response = await openai.generate(["Tell me a joke."]);
   * ```
   */
  async _generate(prompts, options, runManager) {
    var _a, _b, _c, _d;
    const { stop } = options;
    const subPrompts = chunkArray(prompts, this.batchSize);
    const choices = [];
    const tokenUsage = {};
    if (this.stop && stop) {
      throw new Error("Stop found in input and default params");
    }
    const params = this.invocationParams();
    params.stop = stop != null ? stop : params.stop;
    if (params.max_tokens === -1) {
      if (prompts.length !== 1) {
        throw new Error("max_tokens set to -1 not supported for multiple inputs");
      }
      params.max_tokens = await calculateMaxTokens({
        prompt: prompts[0],
        // Cast here to allow for other models that may not fit the union
        modelName: this.modelName
      });
    }
    for (let i = 0; i < subPrompts.length; i += 1) {
      const data = params.stream ? await new Promise((resolve, reject) => {
        const choices2 = [];
        let response;
        let rejected = false;
        let resolved = false;
        this.completionWithRetry({
          ...params,
          prompt: subPrompts[i]
        }, {
          signal: options.signal,
          ...options.options,
          adapter: fetchAdapter,
          responseType: "stream",
          onmessage: (event) => {
            var _a2, _b2, _c2, _d2, _e;
            if (((_b2 = (_a2 = event.data) == null ? void 0 : _a2.trim) == null ? void 0 : _b2.call(_a2)) === "[DONE]") {
              if (resolved) {
                return;
              }
              resolved = true;
              resolve({
                ...response,
                choices: choices2
              });
            } else {
              const message = JSON.parse(event.data);
              if (!response) {
                response = {
                  id: message.id,
                  object: message.object,
                  created: message.created,
                  model: message.model
                };
              }
              for (const part of message.choices) {
                if (part != null && part.index != null) {
                  if (!choices2[part.index])
                    choices2[part.index] = {};
                  const choice = choices2[part.index];
                  choice.text = ((_c2 = choice.text) != null ? _c2 : "") + ((_d2 = part.text) != null ? _d2 : "");
                  choice.finish_reason = part.finish_reason;
                  choice.logprobs = part.logprobs;
                  void (runManager == null ? void 0 : runManager.handleLLMNewToken((_e = part.text) != null ? _e : ""));
                }
              }
              if (!resolved && choices2.every((c) => c.finish_reason != null)) {
                resolved = true;
                resolve({
                  ...response,
                  choices: choices2
                });
              }
            }
          }
        }).catch((error) => {
          if (!rejected) {
            rejected = true;
            reject(error);
          }
        });
      }) : await this.completionWithRetry({
        ...params,
        prompt: subPrompts[i]
      }, {
        signal: options.signal,
        ...options.options
      });
      choices.push(...data.choices);
      const { completion_tokens: completionTokens, prompt_tokens: promptTokens, total_tokens: totalTokens } = (_a = data.usage) != null ? _a : {};
      if (completionTokens) {
        tokenUsage.completionTokens = ((_b = tokenUsage.completionTokens) != null ? _b : 0) + completionTokens;
      }
      if (promptTokens) {
        tokenUsage.promptTokens = ((_c = tokenUsage.promptTokens) != null ? _c : 0) + promptTokens;
      }
      if (totalTokens) {
        tokenUsage.totalTokens = ((_d = tokenUsage.totalTokens) != null ? _d : 0) + totalTokens;
      }
    }
    const generations = chunkArray(choices, this.n).map((promptChoices) => promptChoices.map((choice) => {
      var _a2;
      return {
        text: (_a2 = choice.text) != null ? _a2 : "",
        generationInfo: {
          finishReason: choice.finish_reason,
          logprobs: choice.logprobs
        }
      };
    }));
    return {
      generations,
      llmOutput: { tokenUsage }
    };
  }
  /** @ignore */
  async completionWithRetry(request, options) {
    if (!this.client) {
      const endpoint = this.azureOpenAIApiKey ? `https://${this.azureOpenAIApiInstanceName}.openai.azure.com/openai/deployments/${this.azureOpenAIApiDeploymentName}` : this.clientConfig.basePath;
      const clientConfig = new import_openai2.Configuration({
        ...this.clientConfig,
        basePath: endpoint,
        baseOptions: {
          timeout: this.timeout,
          ...this.clientConfig.baseOptions
        }
      });
      this.client = new import_openai2.OpenAIApi(clientConfig);
    }
    const axiosOptions = {
      adapter: isNode() ? void 0 : fetchAdapter,
      ...this.clientConfig.baseOptions,
      ...options
    };
    if (this.azureOpenAIApiKey) {
      axiosOptions.headers = {
        "api-key": this.azureOpenAIApiKey,
        ...axiosOptions.headers
      };
      axiosOptions.params = {
        "api-version": this.azureOpenAIApiVersion,
        ...axiosOptions.params
      };
    }
    return this.caller.call(this.client.createCompletion.bind(this.client), request, axiosOptions).then((res) => res.data);
  }
  _llmType() {
    return "openai";
  }
};
var PromptLayerOpenAI = class extends OpenAI {
  constructor(fields) {
    var _a, _b, _c;
    super(fields);
    Object.defineProperty(this, "promptLayerApiKey", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "plTags", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.plTags = (_a = fields == null ? void 0 : fields.plTags) != null ? _a : [];
    this.promptLayerApiKey = (_c = fields == null ? void 0 : fields.promptLayerApiKey) != null ? _c : typeof process !== "undefined" ? (
      // eslint-disable-next-line no-process-env
      (_b = process.env) == null ? void 0 : _b.PROMPTLAYER_API_KEY
    ) : void 0;
    if (!this.promptLayerApiKey) {
      throw new Error("Missing PromptLayer API key");
    }
  }
  async completionWithRetry(request, options) {
    var _a;
    if (request.stream) {
      return super.completionWithRetry(request, options);
    }
    const requestStartTime = Date.now();
    const response = await super.completionWithRetry(request);
    const requestEndTime = Date.now();
    await this.caller.call(fetch, "https://api.promptlayer.com/track-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        function_name: "openai.Completion.create",
        args: [],
        kwargs: { engine: request.model, prompt: request.prompt },
        tags: (_a = this.plTags) != null ? _a : [],
        request_response: response,
        request_start_time: Math.floor(requestStartTime / 1e3),
        request_end_time: Math.floor(requestEndTime / 1e3),
        api_key: this.promptLayerApiKey
      })
    });
    return response;
  }
};

export {
  OpenAIChat,
  PromptLayerOpenAIChat,
  OpenAI,
  PromptLayerOpenAI
};
