(() => {
  var __webpack_modules__ = {
    7679: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var bind = __webpack_require__(9932);
      var $apply = __webpack_require__(9289);
      var $call = __webpack_require__(7901);
      var $reflectApply = __webpack_require__(1906);
      module.exports = $reflectApply || bind.call($call, $apply);
    },
    9289: module => {
      "use strict";
      module.exports = Function.prototype.apply;
    },
    7901: module => {
      "use strict";
      module.exports = Function.prototype.call;
    },
    5953: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var bind = __webpack_require__(9932);
      var $TypeError = __webpack_require__(4114);
      var $call = __webpack_require__(7901);
      var $actualApply = __webpack_require__(7679);
      module.exports = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== "function") throw new $TypeError("a function is required");
        return $actualApply(bind, $call, args);
      };
    },
    1906: module => {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
    },
    4449: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var GetIntrinsic = __webpack_require__(9718);
      var callBindBasic = __webpack_require__(5953);
      var $indexOf = callBindBasic([ GetIntrinsic("%String.prototype.indexOf%") ]);
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) return callBindBasic([ intrinsic ]);
        return intrinsic;
      };
    },
    9677: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var callBind = __webpack_require__(5953);
      var gOPD = __webpack_require__(7570);
      var hasProtoAccessor;
      try {
        hasProtoAccessor = [].__proto__ === Array.prototype;
      } catch (e) {
        if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
      }
      var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, "__proto__");
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;
      module.exports = desc && typeof desc.get === "function" ? callBind([ desc.get ]) : typeof $getPrototypeOf === "function" ? function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      } : false;
    },
    70: module => {
      "use strict";
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) try {
        $defineProperty({}, "a", {
          value: 1
        });
      } catch (e) {
        $defineProperty = false;
      }
      module.exports = $defineProperty;
    },
    8208: module => {
      "use strict";
      module.exports = EvalError;
    },
    6788: module => {
      "use strict";
      module.exports = Error;
    },
    5785: module => {
      "use strict";
      module.exports = RangeError;
    },
    7369: module => {
      "use strict";
      module.exports = ReferenceError;
    },
    4121: module => {
      "use strict";
      module.exports = SyntaxError;
    },
    4114: module => {
      "use strict";
      module.exports = TypeError;
    },
    9394: module => {
      "use strict";
      module.exports = URIError;
    },
    3095: module => {
      "use strict";
      module.exports = Object;
    },
    5712: module => {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) arr[i] = a[i];
        for (var j = 0; j < b.length; j += 1) arr[j + a.length] = b[j];
        return arr;
      };
      var slicy = function slicy(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) arr[j] = arrLike[i];
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) str += joiner;
        }
        return str;
      };
      module.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(this, concatty(args, arguments));
            if (Object(result) === result) return result;
            return this;
          }
          return target.apply(that, concatty(args, arguments));
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) boundArgs[i] = "$" + i;
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty() {};
          Empty.prototype = target.prototype;
          bound.prototype = new Empty;
          Empty.prototype = null;
        }
        return bound;
      };
    },
    9932: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var implementation = __webpack_require__(5712);
      module.exports = Function.prototype.bind || implementation;
    },
    9718: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var undefined;
      var $Object = __webpack_require__(3095);
      var $Error = __webpack_require__(6788);
      var $EvalError = __webpack_require__(8208);
      var $RangeError = __webpack_require__(5785);
      var $ReferenceError = __webpack_require__(7369);
      var $SyntaxError = __webpack_require__(4121);
      var $TypeError = __webpack_require__(4114);
      var $URIError = __webpack_require__(9394);
      var abs = __webpack_require__(5577);
      var floor = __webpack_require__(2411);
      var max = __webpack_require__(2715);
      var min = __webpack_require__(3289);
      var pow = __webpack_require__(9411);
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {}
      };
      var $gOPD = __webpack_require__(7570);
      var $defineProperty = __webpack_require__(70);
      var throwTypeError = function() {
        throw new $TypeError;
      };
      var ThrowTypeError = $gOPD ? function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = __webpack_require__(1064)();
      var getDunderProto = __webpack_require__(9677);
      var getProto = typeof Reflect === "function" && Reflect.getPrototypeOf || $Object.getPrototypeOf || getDunderProto;
      var $apply = __webpack_require__(9289);
      var $call = __webpack_require__(7901);
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
        "%AsyncFromSyncIteratorPrototype%": undefined,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        "%EvalError%": $EvalError,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
        "%JSON%": typeof JSON === "object" ? JSON : undefined,
        "%Map%": typeof Map === "undefined" ? undefined : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined : getProto((new Map)[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": $Object,
        "%Object.getOwnPropertyDescriptor%": $gOPD,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined : getProto((new Set)[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined,
        "%Symbol%": hasSymbols ? Symbol : undefined,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined : WeakSet,
        "%Function.prototype.call%": $call,
        "%Function.prototype.apply%": $apply,
        "%Object.defineProperty%": $defineProperty,
        "%Math.abs%": abs,
        "%Math.floor%": floor,
        "%Math.max%": max,
        "%Math.min%": min,
        "%Math.pow%": pow
      };
      if (getProto) try {
        null.error;
      } catch (e) {
        var errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
      var doEval = function doEval(name) {
        var value;
        if (name === "%AsyncFunction%") value = getEvalledConstructor("async function () {}"); else if (name === "%GeneratorFunction%") value = getEvalledConstructor("function* () {}"); else if (name === "%AsyncGeneratorFunction%") value = getEvalledConstructor("async function* () {}"); else if (name === "%AsyncGenerator%") {
          var fn = doEval("%AsyncGeneratorFunction%");
          if (fn) value = fn.prototype;
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval("%AsyncGenerator%");
          if (gen && getProto) value = getProto(gen.prototype);
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
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
      };
      var bind = __webpack_require__(9932);
      var hasOwn = __webpack_require__(8396);
      var $concat = bind.call($call, Array.prototype.concat);
      var $spliceApply = bind.call($apply, Array.prototype.splice);
      var $replace = bind.call($call, String.prototype.replace);
      var $strSlice = bind.call($call, String.prototype.slice);
      var $exec = bind.call($call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`"); else if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        var result = [];
        $replace(string, rePropName, (function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        }));
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) value = doEval(intrinsicName);
          if (typeof value === "undefined" && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) throw new $TypeError("intrinsic name must be a non-empty string");
        if (arguments.length > 1 && typeof allowMissing !== "boolean") throw new $TypeError('"allowMissing" argument must be a boolean');
        if ($exec(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([ 0, 1 ], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || last === '"' || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
          if (part === "constructor" || !isOwn) skipFurtherCaching = true;
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName]; else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              return;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) value = desc.get; else value = value[part];
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
          }
        }
        return value;
      };
    },
    1142: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var isUrl = __webpack_require__(4188);
      var laxUrlRegex = /(?:(?:[^:]+:)?[/][/])?(?:.+@)?([^/]+)([/][^?#]+)/;
      module.exports = function(repoUrl, opts) {
        var obj = {};
        opts = opts || {};
        if (!repoUrl) return null;
        if (repoUrl.url) repoUrl = repoUrl.url;
        if (typeof repoUrl !== "string") return null;
        var shorthand = repoUrl.match(/^([\w-_]+)\/([\w-_\.]+)(?:#([\w-_\.]+))?$/);
        var mediumhand = repoUrl.match(/^github:([\w-_]+)\/([\w-_\.]+)(?:#([\w-_\.]+))?$/);
        var antiquated = repoUrl.match(/^git@[\w-_\.]+:([\w-_]+)\/([\w-_\.]+)$/);
        if (shorthand) {
          obj.user = shorthand[1];
          obj.repo = shorthand[2];
          obj.branch = shorthand[3] || "master";
          obj.host = "github.com";
        } else if (mediumhand) {
          obj.user = mediumhand[1];
          obj.repo = mediumhand[2];
          obj.branch = mediumhand[3] || "master";
          obj.host = "github.com";
        } else if (antiquated) {
          obj.user = antiquated[1];
          obj.repo = antiquated[2].replace(/\.git$/i, "");
          obj.branch = "master";
          obj.host = "github.com";
        } else {
          repoUrl = repoUrl.replace(/^git\+/, "");
          if (!isUrl(repoUrl)) return null;
          var ref = repoUrl.match(laxUrlRegex) || [];
          var hostname = ref[1];
          var pathname = ref[2];
          if (!hostname) return null;
          if (hostname !== "github.com" && hostname !== "www.github.com" && !opts.enterprise) return null;
          var parts = pathname.match(/^\/([\w-_]+)\/([\w-_\.]+)(\/tree\/[\%\w-_\.\/]+)?(\/blob\/[\%\w-_\.\/]+)?/);
          if (!parts) return null;
          obj.user = parts[1];
          obj.repo = parts[2].replace(/\.git$/i, "");
          obj.host = hostname || "github.com";
          if (parts[3] && /^\/tree\/master\//.test(parts[3])) {
            obj.branch = "master";
            obj.path = parts[3].replace(/\/$/, "");
          } else if (parts[3]) {
            var branchMatch = parts[3].replace(/^\/tree\//, "").match(/[\%\w-_.]*\/?[\%\w-_]+/);
            obj.branch = branchMatch && branchMatch[0];
          } else if (parts[4]) {
            branchMatch = parts[4].replace(/^\/blob\//, "").match(/[\%\w-_.]*\/?[\%\w-_]+/);
            obj.branch = branchMatch && branchMatch[0];
          } else obj.branch = "master";
        }
        if (obj.host === "github.com") obj.apiHost = "api.github.com"; else obj.apiHost = obj.host + "/api/v3";
        obj.tarball_url = "https://" + obj.apiHost + "/repos/" + obj.user + "/" + obj.repo + "/tarball/" + obj.branch;
        obj.clone_url = "https://" + obj.host + "/" + obj.user + "/" + obj.repo;
        if (obj.branch === "master") {
          obj.https_url = "https://" + obj.host + "/" + obj.user + "/" + obj.repo;
          obj.travis_url = "https://travis-ci.org/" + obj.user + "/" + obj.repo;
          obj.zip_url = "https://" + obj.host + "/" + obj.user + "/" + obj.repo + "/archive/master.zip";
        } else {
          obj.https_url = "https://" + obj.host + "/" + obj.user + "/" + obj.repo + "/blob/" + obj.branch;
          obj.travis_url = "https://travis-ci.org/" + obj.user + "/" + obj.repo + "?branch=" + obj.branch;
          obj.zip_url = "https://" + obj.host + "/" + obj.user + "/" + obj.repo + "/archive/" + obj.branch + ".zip";
        }
        if (obj.path) obj.https_url += obj.path;
        obj.api_url = "https://" + obj.apiHost + "/repos/" + obj.user + "/" + obj.repo;
        return obj;
      };
    },
    278: module => {
      "use strict";
      module.exports = Object.getOwnPropertyDescriptor;
    },
    7570: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var $gOPD = __webpack_require__(278);
      if ($gOPD) try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
      module.exports = $gOPD;
    },
    1064: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = __webpack_require__(2698);
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") return false;
        if (typeof Symbol !== "function") return false;
        if (typeof origSymbol("foo") !== "symbol") return false;
        if (typeof Symbol("bar") !== "symbol") return false;
        return hasSymbolSham();
      };
    },
    2698: module => {
      "use strict";
      module.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") return false;
        if (typeof Symbol.iterator === "symbol") return true;
        var obj = {};
        var sym = Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") return false;
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") return false;
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") return false;
        var symVal = 42;
        obj[sym] = symVal;
        for (var _ in obj) return false;
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) return false;
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) return false;
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) return false;
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
          if (descriptor.value !== symVal || descriptor.enumerable !== true) return false;
        }
        return true;
      };
    },
    8396: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind = __webpack_require__(9932);
      module.exports = bind.call(call, $hasOwn);
    },
    4188: module => {
      module.exports = isUrl;
      var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
      var localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
      var nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
      function isUrl(string) {
        if (typeof string !== "string") return false;
        var match = string.match(protocolAndDomainRE);
        if (!match) return false;
        var everythingAfterProtocol = match[1];
        if (!everythingAfterProtocol) return false;
        if (localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol)) return true;
        return false;
      }
    },
    5577: module => {
      "use strict";
      module.exports = Math.abs;
    },
    2411: module => {
      "use strict";
      module.exports = Math.floor;
    },
    2715: module => {
      "use strict";
      module.exports = Math.max;
    },
    3289: module => {
      "use strict";
      module.exports = Math.min;
    },
    9411: module => {
      "use strict";
      module.exports = Math.pow;
    },
    6410: (module, __unused_webpack_exports, __webpack_require__) => {
      var hasMap = typeof Map === "function" && Map.prototype;
      var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
      var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
      var mapForEach = hasMap && Map.prototype.forEach;
      var hasSet = typeof Set === "function" && Set.prototype;
      var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
      var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
      var setForEach = hasSet && Set.prototype.forEach;
      var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
      var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
      var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
      var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
      var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
      var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
      var booleanValueOf = Boolean.prototype.valueOf;
      var objectToString = Object.prototype.toString;
      var functionToString = Function.prototype.toString;
      var $match = String.prototype.match;
      var $slice = String.prototype.slice;
      var $replace = String.prototype.replace;
      var $toUpperCase = String.prototype.toUpperCase;
      var $toLowerCase = String.prototype.toLowerCase;
      var $test = RegExp.prototype.test;
      var $concat = Array.prototype.concat;
      var $join = Array.prototype.join;
      var $arrSlice = Array.prototype.slice;
      var $floor = Math.floor;
      var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
      var gOPS = Object.getOwnPropertySymbols;
      var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
      var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
      var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
        return O.__proto__;
      } : null);
      function addNumericSeparator(num, str) {
        if (num === 1 / 0 || num === -1 / 0 || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) return str;
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === "number") {
          var int = num < 0 ? -$floor(-num) : $floor(num);
          if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
          }
        }
        return $replace.call(str, sepRegex, "$&_");
      }
      var utilInspect = __webpack_require__(2634);
      var inspectCustom = utilInspect.custom;
      var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
      var quotes = {
        __proto__: null,
        double: '"',
        single: "'"
      };
      var quoteREs = {
        __proto__: null,
        double: /(["\\])/g,
        single: /(['\\])/g
      };
      module.exports = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) throw new TypeError('option "quoteStyle" must be "single" or "double"');
        if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== 1 / 0 : opts.maxStringLength !== null)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
        if (typeof customInspect !== "boolean" && customInspect !== "symbol") throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        if (has(opts, "indent") && opts.indent !== null && opts.indent !== "\t" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === "undefined") return "undefined";
        if (obj === null) return "null";
        if (typeof obj === "boolean") return obj ? "true" : "false";
        if (typeof obj === "string") return inspectString(obj, opts);
        if (typeof obj === "number") {
          if (obj === 0) return 1 / 0 / obj > 0 ? "0" : "-0";
          var str = String(obj);
          return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === "bigint") {
          var bigIntStr = String(obj) + "n";
          return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
        if (typeof depth === "undefined") depth = 0;
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") return isArray(obj) ? "[Array]" : "[Object]";
        var indent = getIndent(opts, depth);
        if (typeof seen === "undefined") seen = []; else if (indexOf(seen, obj) >= 0) return "[Circular]";
        function inspect(value, from, noIndent) {
          if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
          }
          if (noIndent) {
            var newOpts = {
              depth: opts.depth
            };
            if (has(opts, "quoteStyle")) newOpts.quoteStyle = opts.quoteStyle;
            return inspect_(value, newOpts, depth + 1, seen);
          }
          return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === "function" && !isRegExp(obj)) {
          var name = nameOf(obj);
          var keys = arrObjKeys(obj, inspect);
          return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
        }
        if (isSymbol(obj)) {
          var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
          return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
          var s = "<" + $toLowerCase.call(String(obj.nodeName));
          var attrs = obj.attributes || [];
          for (var i = 0; i < attrs.length; i++) s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
          s += ">";
          if (obj.childNodes && obj.childNodes.length) s += "...";
          s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
          return s;
        }
        if (isArray(obj)) {
          if (obj.length === 0) return "[]";
          var xs = arrObjKeys(obj, inspect);
          if (indent && !singleLineValues(xs)) return "[" + indentedJoin(xs, indent) + "]";
          return "[ " + $join.call(xs, ", ") + " ]";
        }
        if (isError(obj)) {
          var parts = arrObjKeys(obj, inspect);
          if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
          if (parts.length === 0) return "[" + String(obj) + "]";
          return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
        }
        if (typeof obj === "object" && customInspect) if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) return utilInspect(obj, {
          depth: maxDepth - depth
        }); else if (customInspect !== "symbol" && typeof obj.inspect === "function") return obj.inspect();
        if (isMap(obj)) {
          var mapParts = [];
          if (mapForEach) mapForEach.call(obj, (function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          }));
          return collectionOf("Map", mapSize.call(obj), mapParts, indent);
        }
        if (isSet(obj)) {
          var setParts = [];
          if (setForEach) setForEach.call(obj, (function(value) {
            setParts.push(inspect(value, obj));
          }));
          return collectionOf("Set", setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) return weakCollectionOf("WeakMap");
        if (isWeakSet(obj)) return weakCollectionOf("WeakSet");
        if (isWeakRef(obj)) return weakCollectionOf("WeakRef");
        if (isNumber(obj)) return markBoxed(inspect(Number(obj)));
        if (isBigInt(obj)) return markBoxed(inspect(bigIntValueOf.call(obj)));
        if (isBoolean(obj)) return markBoxed(booleanValueOf.call(obj));
        if (isString(obj)) return markBoxed(inspect(String(obj)));
        if (typeof window !== "undefined" && obj === window) return "{ [object Window] }";
        if (typeof globalThis !== "undefined" && obj === globalThis || typeof __webpack_require__.g !== "undefined" && obj === __webpack_require__.g) return "{ [object globalThis] }";
        if (!isDate(obj) && !isRegExp(obj)) {
          var ys = arrObjKeys(obj, inspect);
          var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
          var protoTag = obj instanceof Object ? "" : "null prototype";
          var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
          var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
          var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
          if (ys.length === 0) return tag + "{}";
          if (indent) return tag + "{" + indentedJoin(ys, indent) + "}";
          return tag + "{ " + $join.call(ys, ", ") + " }";
        }
        return String(obj);
      };
      function wrapQuotes(s, defaultStyle, opts) {
        var style = opts.quoteStyle || defaultStyle;
        var quoteChar = quotes[style];
        return quoteChar + s + quoteChar;
      }
      function quote(s) {
        return $replace.call(String(s), /"/g, "&quot;");
      }
      function isArray(obj) {
        return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isDate(obj) {
        return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isRegExp(obj) {
        return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isError(obj) {
        return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isString(obj) {
        return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isNumber(obj) {
        return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isBoolean(obj) {
        return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
      }
      function isSymbol(obj) {
        if (hasShammedSymbols) return obj && typeof obj === "object" && obj instanceof Symbol;
        if (typeof obj === "symbol") return true;
        if (!obj || typeof obj !== "object" || !symToString) return false;
        try {
          symToString.call(obj);
          return true;
        } catch (e) {}
        return false;
      }
      function isBigInt(obj) {
        if (!obj || typeof obj !== "object" || !bigIntValueOf) return false;
        try {
          bigIntValueOf.call(obj);
          return true;
        } catch (e) {}
        return false;
      }
      var hasOwn = Object.prototype.hasOwnProperty || function(key) {
        return key in this;
      };
      function has(obj, key) {
        return hasOwn.call(obj, key);
      }
      function toStr(obj) {
        return objectToString.call(obj);
      }
      function nameOf(f) {
        if (f.name) return f.name;
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) return m[1];
        return null;
      }
      function indexOf(xs, x) {
        if (xs.indexOf) return xs.indexOf(x);
        for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
        return -1;
      }
      function isMap(x) {
        if (!mapSize || !x || typeof x !== "object") return false;
        try {
          mapSize.call(x);
          try {
            setSize.call(x);
          } catch (s) {
            return true;
          }
          return x instanceof Map;
        } catch (e) {}
        return false;
      }
      function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== "object") return false;
        try {
          weakMapHas.call(x, weakMapHas);
          try {
            weakSetHas.call(x, weakSetHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakMap;
        } catch (e) {}
        return false;
      }
      function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== "object") return false;
        try {
          weakRefDeref.call(x);
          return true;
        } catch (e) {}
        return false;
      }
      function isSet(x) {
        if (!setSize || !x || typeof x !== "object") return false;
        try {
          setSize.call(x);
          try {
            mapSize.call(x);
          } catch (m) {
            return true;
          }
          return x instanceof Set;
        } catch (e) {}
        return false;
      }
      function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== "object") return false;
        try {
          weakSetHas.call(x, weakSetHas);
          try {
            weakMapHas.call(x, weakMapHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakSet;
        } catch (e) {}
        return false;
      }
      function isElement(x) {
        if (!x || typeof x !== "object") return false;
        if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) return true;
        return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
      }
      function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
          var remaining = str.length - opts.maxStringLength;
          var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
          return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var quoteRE = quoteREs[opts.quoteStyle || "single"];
        quoteRE.lastIndex = 0;
        var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, "single", opts);
      }
      function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        }[n];
        if (x) return "\\" + x;
        return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
      }
      function markBoxed(str) {
        return "Object(" + str + ")";
      }
      function weakCollectionOf(type) {
        return type + " { ? }";
      }
      function collectionOf(type, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
        return type + " (" + size + ") {" + joinedEntries + "}";
      }
      function singleLineValues(xs) {
        for (var i = 0; i < xs.length; i++) if (indexOf(xs[i], "\n") >= 0) return false;
        return true;
      }
      function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === "\t") baseIndent = "\t"; else if (typeof opts.indent === "number" && opts.indent > 0) baseIndent = $join.call(Array(opts.indent + 1), " "); else return null;
        return {
          base: baseIndent,
          prev: $join.call(Array(depth + 1), baseIndent)
        };
      }
      function indentedJoin(xs, indent) {
        if (xs.length === 0) return "";
        var lineJoiner = "\n" + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
      }
      function arrObjKeys(obj, inspect) {
        var isArr = isArray(obj);
        var xs = [];
        if (isArr) {
          xs.length = obj.length;
          for (var i = 0; i < obj.length; i++) xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
        var syms = typeof gOPS === "function" ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
          symMap = {};
          for (var k = 0; k < syms.length; k++) symMap["$" + syms[k]] = syms[k];
        }
        for (var key in obj) {
          if (!has(obj, key)) continue;
          if (isArr && String(Number(key)) === key && key < obj.length) continue;
          if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) continue; else if ($test.call(/[^\w$]/, key)) xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj)); else xs.push(key + ": " + inspect(obj[key], obj));
        }
        if (typeof gOPS === "function") for (var j = 0; j < syms.length; j++) if (isEnumerable.call(obj, syms[j])) xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
        return xs;
      }
    },
    707: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var url = __webpack_require__(900);
      var cache = {};
      module.exports = function parseBitbucketUrl(str) {
        return cache[str] || (cache[str] = parse(str));
      };
      function parse(str) {
        if (typeof str !== "string" || !str.length) return null;
        if (str.indexOf("bitbucket.org/snippets") !== -1 || str.indexOf("bitbucket.com/snippets") !== -1) return null;
        var obj = url.parse(str, true);
        if (typeof obj.path !== "string" || !obj.path.length || typeof obj.pathname !== "string" || !obj.pathname.length) return null;
        obj.path = trimSlash(obj.path);
        obj.pathname = trimSlash(obj.pathname);
        var pathSegments = obj.path.split("/").filter(Boolean);
        var stashDetected = str.indexOf("git@") !== -1 && str.indexOf("git@bitbucket.org") === -1 && str.indexOf("git@bitbucket.com") === -1 || obj.hostname && !(obj.hostname.endsWith("bitbucket.org") || obj.hostname.endsWith("bitbucket.com")) && pathSegments[0] === "projects";
        if (stashDetected) if (str.indexOf("git@") === -1) {
          if (pathSegments.length > 1) obj.owner = owner(pathSegments[1]); else obj.owner = null;
          if (pathSegments.length > 3 && pathSegments[2] === "repos") obj.name = name(pathSegments[3]); else obj.name = null;
        } else if (pathSegments.length === 3) {
          obj.host = pathSegments[0].replace("git@", "");
          obj.owner = owner(pathSegments[1]);
          obj.name = name(pathSegments[2]);
        } else {
          obj.owner = owner(pathSegments[0]);
          obj.name = name(pathSegments[1]);
        } else {
          obj.owner = owner(pathSegments[0]);
          obj.name = name(pathSegments[1]);
        }
        if (pathSegments.length > 1 && obj.owner && obj.name) obj.repo = obj.owner + "/" + obj.name; else {
          var href = obj.href.split(":");
          if (href.length === 2 && obj.href.indexOf("//") === -1) {
            obj.repo = obj.repo || href[href.length - 1];
            var repoSegments = obj.repo.split("/");
            obj.owner = repoSegments[0];
            obj.name = repoSegments[1];
          } else if (obj.hasOwnProperty("owner") === false) {
            var match = obj.href.match(/\/([^\/]*)$/);
            obj.owner = match ? match[1] : null;
            obj.repo = null;
          }
          if (obj.repo && (!obj.owner || !obj.name)) {
            var segs = obj.repo.split("/");
            if (segs.length === 2) {
              obj.owner = segs[0];
              obj.name = segs[1];
            }
          }
        }
        if (pathSegments.length >= 3) switch (pathSegments[2]) {
         case "get":
          var fileName = null;
          if (pathSegments[3].endsWith(".tar.gz")) fileName = pathSegments[3].replace(".tar.gz", "");
          if (pathSegments[3].endsWith(".tar.bz2")) fileName = pathSegments[3].replace(".tar.bz2", "");
          if (pathSegments[3].endsWith(".zip")) fileName = pathSegments[3].replace(".zip", "");
          obj.branch = fileName;
          if (obj.branch === "tip") obj.branch = void 0;
          break;

         case "raw":
         case "src":
          if (pathSegments.length < 5) break;
          var filepath = pathSegments.slice(4);
          if (filepath.length) {
            var file = filepath[filepath.length - 1];
            file = file.split("?")[0];
            filepath[filepath.length - 1] = file;
          }
          obj.filepath = filepath.join("/");
        }
        obj.branch = obj.branch || getBranch(obj, stashDetected);
        var res = {};
        res.host = obj.host || "bitbucket.org";
        res.owner = obj.owner || null;
        res.name = obj.name || null;
        res.repo = obj.repo;
        res.repository = res.repo;
        res.branch = obj.branch;
        res.filepath = obj.filepath || null;
        return res;
      }
      function getBranch(obj, stashMode) {
        var branch;
        var segs = obj.path.split("#");
        if (segs.length !== 1) branch = segs[segs.length - 1];
        if (!branch && obj.hash && obj.hash.charAt(0) === "#") branch = obj.hash.slice(1);
        if (!branch && obj.query && obj.query.at) {
          branch = obj.query.at;
          if (branch && stashMode) branch = branch.replace("refs/heads/", "");
        }
        return branch || "master";
      }
      function trimSlash(path) {
        return path.charAt(0) === "/" ? path.slice(1) : path;
      }
      function name(str) {
        return str ? str.replace(/^\W+|\.git$/g, "") : null;
      }
      function owner(str) {
        if (!str) return null;
        var idx = str.indexOf(":");
        if (idx > -1) return str.slice(idx + 1);
        return str;
      }
    },
    3448: function(module, exports, __webpack_require__) {
      module = __webpack_require__.nmd(module);
      var __WEBPACK_AMD_DEFINE_RESULT__;
      (function() {
        true && exports && exports.nodeType;
        true && module && module.nodeType;
        var freeGlobal = typeof __webpack_require__.g == "object" && __webpack_require__.g;
        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) 0;
        var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
          overflow: "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input"
        }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode;
        function error(type) {
          throw new RangeError(errors[type]);
        }
        function map(array, fn) {
          var length = array.length;
          var result = [];
          while (length--) result[length] = fn(array[length]);
          return result;
        }
        function mapDomain(string, fn) {
          var parts = string.split("@");
          var result = "";
          if (parts.length > 1) {
            result = parts[0] + "@";
            string = parts[1];
          }
          string = string.replace(regexSeparators, ".");
          var labels = string.split(".");
          var encoded = map(labels, fn).join(".");
          return result + encoded;
        }
        function ucs2decode(string) {
          var value, extra, output = [], counter = 0, length = string.length;
          while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 55296 && value <= 56319 && counter < length) {
              extra = string.charCodeAt(counter++);
              if ((extra & 64512) == 56320) output.push(((value & 1023) << 10) + (extra & 1023) + 65536); else {
                output.push(value);
                counter--;
              }
            } else output.push(value);
          }
          return output;
        }
        function ucs2encode(array) {
          return map(array, (function(value) {
            var output = "";
            if (value > 65535) {
              value -= 65536;
              output += stringFromCharCode(value >>> 10 & 1023 | 55296);
              value = 56320 | value & 1023;
            }
            output += stringFromCharCode(value);
            return output;
          })).join("");
        }
        function basicToDigit(codePoint) {
          if (codePoint - 48 < 10) return codePoint - 22;
          if (codePoint - 65 < 26) return codePoint - 65;
          if (codePoint - 97 < 26) return codePoint - 97;
          return base;
        }
        function digitToBasic(digit, flag) {
          return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
        }
        function adapt(delta, numPoints, firstTime) {
          var k = 0;
          delta = firstTime ? floor(delta / damp) : delta >> 1;
          delta += floor(delta / numPoints);
          for (;delta > baseMinusTMin * tMax >> 1; k += base) delta = floor(delta / baseMinusTMin);
          return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
        }
        function decode(input) {
          var out, basic, j, index, oldi, w, k, digit, t, baseMinusT, output = [], inputLength = input.length, i = 0, n = initialN, bias = initialBias;
          basic = input.lastIndexOf(delimiter);
          if (basic < 0) basic = 0;
          for (j = 0; j < basic; ++j) {
            if (input.charCodeAt(j) >= 128) error("not-basic");
            output.push(input.charCodeAt(j));
          }
          for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
            for (oldi = i, w = 1, k = base; ;k += base) {
              if (index >= inputLength) error("invalid-input");
              digit = basicToDigit(input.charCodeAt(index++));
              if (digit >= base || digit > floor((maxInt - i) / w)) error("overflow");
              i += digit * w;
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (digit < t) break;
              baseMinusT = base - t;
              if (w > floor(maxInt / baseMinusT)) error("overflow");
              w *= baseMinusT;
            }
            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);
            if (floor(i / out) > maxInt - n) error("overflow");
            n += floor(i / out);
            i %= out;
            output.splice(i++, 0, n);
          }
          return ucs2encode(output);
        }
        function encode(input) {
          var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, inputLength, handledCPCountPlusOne, baseMinusT, qMinusT, output = [];
          input = ucs2decode(input);
          inputLength = input.length;
          n = initialN;
          delta = 0;
          bias = initialBias;
          for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue < 128) output.push(stringFromCharCode(currentValue));
          }
          handledCPCount = basicLength = output.length;
          if (basicLength) output.push(delimiter);
          while (handledCPCount < inputLength) {
            for (m = maxInt, j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue >= n && currentValue < m) m = currentValue;
            }
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) error("overflow");
            delta += (m - n) * handledCPCountPlusOne;
            n = m;
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < n && ++delta > maxInt) error("overflow");
              if (currentValue == n) {
                for (q = delta, k = base; ;k += base) {
                  t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) break;
                  qMinusT = q - t;
                  baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
            ++delta;
            ++n;
          }
          return output.join("");
        }
        function toUnicode(input) {
          return mapDomain(input, (function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
          }));
        }
        function toASCII(input) {
          return mapDomain(input, (function(string) {
            return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
          }));
        }
        punycode = {
          version: "1.4.1",
          ucs2: {
            decode: ucs2decode,
            encode: ucs2encode
          },
          decode,
          encode,
          toASCII,
          toUnicode
        };
        if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
          return punycode;
        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      })();
    },
    5248: module => {
      "use strict";
      var replace = String.prototype.replace;
      var percentTwenties = /%20/g;
      var Format = {
        RFC1738: "RFC1738",
        RFC3986: "RFC3986"
      };
      module.exports = {
        default: Format.RFC3986,
        formatters: {
          RFC1738: function(value) {
            return replace.call(value, percentTwenties, "+");
          },
          RFC3986: function(value) {
            return String(value);
          }
        },
        RFC1738: Format.RFC1738,
        RFC3986: Format.RFC3986
      };
    },
    1792: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var stringify = __webpack_require__(3725);
      var parse = __webpack_require__(7539);
      var formats = __webpack_require__(5248);
      module.exports = {
        formats,
        parse,
        stringify
      };
    },
    7539: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var utils = __webpack_require__(8905);
      var has = Object.prototype.hasOwnProperty;
      var isArray = Array.isArray;
      var defaults = {
        allowDots: false,
        allowEmptyArrays: false,
        allowPrototypes: false,
        allowSparse: false,
        arrayLimit: 20,
        charset: "utf-8",
        charsetSentinel: false,
        comma: false,
        decodeDotInKeys: false,
        decoder: utils.decode,
        delimiter: "&",
        depth: 5,
        duplicates: "combine",
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1e3,
        parseArrays: true,
        plainObjects: false,
        strictDepth: false,
        strictNullHandling: false
      };
      var interpretNumericEntities = function(str) {
        return str.replace(/&#(\d+);/g, (function($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
        }));
      };
      var parseArrayValue = function(val, options) {
        if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) return val.split(",");
        return val;
      };
      var isoSentinel = "utf8=%26%2310003%3B";
      var charsetSentinel = "utf8=%E2%9C%93";
      var parseValues = function parseQueryStringValues(str, options) {
        var obj = {
          __proto__: null
        };
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
        cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        var limit = options.parameterLimit === 1 / 0 ? void 0 : options.parameterLimit;
        var parts = cleanStr.split(options.delimiter, limit);
        var skipIndex = -1;
        var i;
        var charset = options.charset;
        if (options.charsetSentinel) for (i = 0; i < parts.length; ++i) if (parts[i].indexOf("utf8=") === 0) {
          if (parts[i] === charsetSentinel) charset = "utf-8"; else if (parts[i] === isoSentinel) charset = "iso-8859-1";
          skipIndex = i;
          i = parts.length;
        }
        for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) continue;
          var part = parts[i];
          var bracketEqualsPos = part.indexOf("]=");
          var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
          var key;
          var val;
          if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, "key");
            val = options.strictNullHandling ? null : "";
          } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
            val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), (function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }));
          }
          if (val && options.interpretNumericEntities && charset === "iso-8859-1") val = interpretNumericEntities(String(val));
          if (part.indexOf("[]=") > -1) val = isArray(val) ? [ val ] : val;
          var existing = has.call(obj, key);
          if (existing && options.duplicates === "combine") obj[key] = utils.combine(obj[key], val); else if (!existing || options.duplicates === "last") obj[key] = val;
        }
        return obj;
      };
      var parseObject = function(chain, val, options, valuesParsed) {
        var leaf = valuesParsed ? val : parseArrayValue(val, options);
        for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];
          if (root === "[]" && options.parseArrays) obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : [].concat(leaf); else {
            obj = options.plainObjects ? {
              __proto__: null
            } : {};
            var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
            var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
            var index = parseInt(decodedRoot, 10);
            if (!options.parseArrays && decodedRoot === "") obj = {
              0: leaf
            }; else if (!isNaN(index) && root !== decodedRoot && String(index) === decodedRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
              obj = [];
              obj[index] = leaf;
            } else if (decodedRoot !== "__proto__") obj[decodedRoot] = leaf;
          }
          leaf = obj;
        }
        return leaf;
      };
      var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
        if (!givenKey) return;
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;
        var segment = options.depth > 0 && brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;
        var keys = [];
        if (parent) {
          if (!options.plainObjects && has.call(Object.prototype, parent)) if (!options.allowPrototypes) return;
          keys.push(parent);
        }
        var i = 0;
        while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) if (!options.allowPrototypes) return;
          keys.push(segment[1]);
        }
        if (segment) {
          if (options.strictDepth === true) throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
          keys.push("[" + key.slice(segment.index) + "]");
        }
        return parseObject(keys, val, options, valuesParsed);
      };
      var normalizeParseOptions = function normalizeParseOptions(opts) {
        if (!opts) return defaults;
        if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
        if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") throw new TypeError("Decoder has to be a function.");
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
        var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
        if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") throw new TypeError("The duplicates option must be either combine, first, or last");
        var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
        return {
          allowDots,
          allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
          allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
          allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
          arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
          comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
          decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
          decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
          delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
          depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
          duplicates,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
          strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
        };
      };
      module.exports = function(str, opts) {
        var options = normalizeParseOptions(opts);
        if (str === "" || str === null || typeof str === "undefined") return options.plainObjects ? {
          __proto__: null
        } : {};
        var tempObj = typeof str === "string" ? parseValues(str, options) : str;
        var obj = options.plainObjects ? {
          __proto__: null
        } : {};
        var keys = Object.keys(tempObj);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
          obj = utils.merge(obj, newObj, options);
        }
        if (options.allowSparse === true) return obj;
        return utils.compact(obj);
      };
    },
    3725: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var getSideChannel = __webpack_require__(1233);
      var utils = __webpack_require__(8905);
      var formats = __webpack_require__(5248);
      var has = Object.prototype.hasOwnProperty;
      var arrayPrefixGenerators = {
        brackets: function brackets(prefix) {
          return prefix + "[]";
        },
        comma: "comma",
        indices: function indices(prefix, key) {
          return prefix + "[" + key + "]";
        },
        repeat: function repeat(prefix) {
          return prefix;
        }
      };
      var isArray = Array.isArray;
      var push = Array.prototype.push;
      var pushToArray = function(arr, valueOrArray) {
        push.apply(arr, isArray(valueOrArray) ? valueOrArray : [ valueOrArray ]);
      };
      var toISO = Date.prototype.toISOString;
      var defaultFormat = formats["default"];
      var defaults = {
        addQueryPrefix: false,
        allowDots: false,
        allowEmptyArrays: false,
        arrayFormat: "indices",
        charset: "utf-8",
        charsetSentinel: false,
        commaRoundTrip: false,
        delimiter: "&",
        encode: true,
        encodeDotInKeys: false,
        encoder: utils.encode,
        encodeValuesOnly: false,
        filter: void void 0,
        format: defaultFormat,
        formatter: formats.formatters[defaultFormat],
        indices: false,
        serializeDate: function serializeDate(date) {
          return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
      };
      var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
        return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
      };
      var sentinel = {};
      var stringify = function stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
        var obj = object;
        var tmpSc = sideChannel;
        var step = 0;
        var findFlag = false;
        while ((tmpSc = tmpSc.get(sentinel)) !== void void 0 && !findFlag) {
          var pos = tmpSc.get(object);
          step += 1;
          if (typeof pos !== "undefined") if (pos === step) throw new RangeError("Cyclic object value"); else findFlag = true;
          if (typeof tmpSc.get(sentinel) === "undefined") step = 0;
        }
        if (typeof filter === "function") obj = filter(prefix, obj); else if (obj instanceof Date) obj = serializeDate(obj); else if (generateArrayPrefix === "comma" && isArray(obj)) obj = utils.maybeMap(obj, (function(value) {
          if (value instanceof Date) return serializeDate(value);
          return value;
        }));
        if (obj === null) {
          if (strictNullHandling) return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
          obj = "";
        }
        if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
          if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
            return [ formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format)) ];
          }
          return [ formatter(prefix) + "=" + formatter(String(obj)) ];
        }
        var values = [];
        if (typeof obj === "undefined") return values;
        var objKeys;
        if (generateArrayPrefix === "comma" && isArray(obj)) {
          if (encodeValuesOnly && encoder) obj = utils.maybeMap(obj, encoder);
          objKeys = [ {
            value: obj.length > 0 ? obj.join(",") || null : void void 0
          } ];
        } else if (isArray(filter)) objKeys = filter; else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
        }
        var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
        var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
        if (allowEmptyArrays && isArray(obj) && obj.length === 0) return adjustedPrefix + "[]";
        for (var j = 0; j < objKeys.length; ++j) {
          var key = objKeys[j];
          var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
          if (skipNulls && value === null) continue;
          var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
          var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
          sideChannel.set(object, step);
          var valueSideChannel = getSideChannel();
          valueSideChannel.set(sentinel, sideChannel);
          pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
        }
        return values;
      };
      var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
        if (!opts) return defaults;
        if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") throw new TypeError("Encoder has to be a function.");
        var charset = opts.charset || defaults.charset;
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var format = formats["default"];
        if (typeof opts.format !== "undefined") {
          if (!has.call(formats.formatters, opts.format)) throw new TypeError("Unknown format option provided.");
          format = opts.format;
        }
        var formatter = formats.formatters[format];
        var filter = defaults.filter;
        if (typeof opts.filter === "function" || isArray(opts.filter)) filter = opts.filter;
        var arrayFormat;
        if (opts.arrayFormat in arrayPrefixGenerators) arrayFormat = opts.arrayFormat; else if ("indices" in opts) arrayFormat = opts.indices ? "indices" : "repeat"; else arrayFormat = defaults.arrayFormat;
        if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
        return {
          addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
          allowDots,
          allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
          arrayFormat,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
          commaRoundTrip: !!opts.commaRoundTrip,
          delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
          encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
          encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
          encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
          filter,
          format,
          formatter,
          serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
          skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
          sort: typeof opts.sort === "function" ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
        };
      };
      module.exports = function(object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);
        var objKeys;
        var filter;
        if (typeof options.filter === "function") {
          filter = options.filter;
          obj = filter("", obj);
        } else if (isArray(options.filter)) {
          filter = options.filter;
          objKeys = filter;
        }
        var keys = [];
        if (typeof obj !== "object" || obj === null) return "";
        var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
        var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
        if (!objKeys) objKeys = Object.keys(obj);
        if (options.sort) objKeys.sort(options.sort);
        var sideChannel = getSideChannel();
        for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
          var value = obj[key];
          if (options.skipNulls && value === null) continue;
          pushToArray(keys, stringify(value, key, generateArrayPrefix, commaRoundTrip, options.allowEmptyArrays, options.strictNullHandling, options.skipNulls, options.encodeDotInKeys, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
        }
        var joined = keys.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? "?" : "";
        if (options.charsetSentinel) if (options.charset === "iso-8859-1") prefix += "utf8=%26%2310003%3B&"; else prefix += "utf8=%E2%9C%93&";
        return joined.length > 0 ? prefix + joined : "";
      };
    },
    8905: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var formats = __webpack_require__(5248);
      var has = Object.prototype.hasOwnProperty;
      var isArray = Array.isArray;
      var hexTable = function() {
        var array = [];
        for (var i = 0; i < 256; ++i) array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
        return array;
      }();
      var compactQueue = function compactQueue(queue) {
        while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];
          if (isArray(obj)) {
            var compacted = [];
            for (var j = 0; j < obj.length; ++j) if (typeof obj[j] !== "undefined") compacted.push(obj[j]);
            item.obj[item.prop] = compacted;
          }
        }
      };
      var arrayToObject = function arrayToObject(source, options) {
        var obj = options && options.plainObjects ? {
          __proto__: null
        } : {};
        for (var i = 0; i < source.length; ++i) if (typeof source[i] !== "undefined") obj[i] = source[i];
        return obj;
      };
      var merge = function merge(target, source, options) {
        if (!source) return target;
        if (typeof source !== "object" && typeof source !== "function") {
          if (isArray(target)) target.push(source); else if (target && typeof target === "object") {
            if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) target[source] = true;
          } else return [ target, source ];
          return target;
        }
        if (!target || typeof target !== "object") return [ target ].concat(source);
        var mergeTarget = target;
        if (isArray(target) && !isArray(source)) mergeTarget = arrayToObject(target, options);
        if (isArray(target) && isArray(source)) {
          source.forEach((function(item, i) {
            if (has.call(target, i)) {
              var targetItem = target[i];
              if (targetItem && typeof targetItem === "object" && item && typeof item === "object") target[i] = merge(targetItem, item, options); else target.push(item);
            } else target[i] = item;
          }));
          return target;
        }
        return Object.keys(source).reduce((function(acc, key) {
          var value = source[key];
          if (has.call(acc, key)) acc[key] = merge(acc[key], value, options); else acc[key] = value;
          return acc;
        }), mergeTarget);
      };
      var assign = function assignSingleSource(target, source) {
        return Object.keys(source).reduce((function(acc, key) {
          acc[key] = source[key];
          return acc;
        }), target);
      };
      var decode = function(str, defaultDecoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, " ");
        if (charset === "iso-8859-1") return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      };
      var limit = 1024;
      var encode = function encode(str, defaultEncoder, charset, kind, format) {
        if (str.length === 0) return str;
        var string = str;
        if (typeof str === "symbol") string = Symbol.prototype.toString.call(str); else if (typeof str !== "string") string = String(str);
        if (charset === "iso-8859-1") return escape(string).replace(/%u[0-9a-f]{4}/gi, (function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        }));
        var out = "";
        for (var j = 0; j < string.length; j += limit) {
          var segment = string.length >= limit ? string.slice(j, j + limit) : string;
          var arr = [];
          for (var i = 0; i < segment.length; ++i) {
            var c = segment.charCodeAt(i);
            if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
              arr[arr.length] = segment.charAt(i);
              continue;
            }
            if (c < 128) {
              arr[arr.length] = hexTable[c];
              continue;
            }
            if (c < 2048) {
              arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
              continue;
            }
            if (c < 55296 || c >= 57344) {
              arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
              continue;
            }
            i += 1;
            c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
            arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          }
          out += arr.join("");
        }
        return out;
      };
      var compact = function compact(value) {
        var queue = [ {
          obj: {
            o: value
          },
          prop: "o"
        } ];
        var refs = [];
        for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];
          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
              queue.push({
                obj,
                prop: key
              });
              refs.push(val);
            }
          }
        }
        compactQueue(queue);
        return value;
      };
      var isRegExp = function isRegExp(obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
      };
      var isBuffer = function isBuffer(obj) {
        if (!obj || typeof obj !== "object") return false;
        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
      };
      var combine = function combine(a, b) {
        return [].concat(a, b);
      };
      var maybeMap = function maybeMap(val, fn) {
        if (isArray(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) mapped.push(fn(val[i]));
          return mapped;
        }
        return fn(val);
      };
      module.exports = {
        arrayToObject,
        assign,
        combine,
        compact,
        decode,
        encode,
        isBuffer,
        isRegExp,
        maybeMap,
        merge
      };
    },
    3364: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var inspect = __webpack_require__(6410);
      var $TypeError = __webpack_require__(4114);
      var listGetNode = function(list, key, isDelete) {
        var prev = list;
        var curr;
        for (;(curr = prev.next) != null; prev = curr) if (curr.key === key) {
          prev.next = curr.next;
          if (!isDelete) {
            curr.next = list.next;
            list.next = curr;
          }
          return curr;
        }
      };
      var listGet = function(objects, key) {
        if (!objects) return;
        var node = listGetNode(objects, key);
        return node && node.value;
      };
      var listSet = function(objects, key, value) {
        var node = listGetNode(objects, key);
        if (node) node.value = value; else objects.next = {
          key,
          next: objects.next,
          value
        };
      };
      var listHas = function(objects, key) {
        if (!objects) return false;
        return !!listGetNode(objects, key);
      };
      var listDelete = function(objects, key) {
        if (objects) return listGetNode(objects, key, true);
      };
      module.exports = function getSideChannelList() {
        var $o;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + inspect(key));
          },
          delete: function(key) {
            var root = $o && $o.next;
            var deletedNode = listDelete($o, key);
            if (deletedNode && root && root === deletedNode) $o = void void 0;
            return !!deletedNode;
          },
          get: function(key) {
            return listGet($o, key);
          },
          has: function(key) {
            return listHas($o, key);
          },
          set: function(key, value) {
            if (!$o) $o = {
              next: void void 0
            };
            listSet($o, key, value);
          }
        };
        return channel;
      };
    },
    958: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var GetIntrinsic = __webpack_require__(9718);
      var callBound = __webpack_require__(4449);
      var inspect = __webpack_require__(6410);
      var $TypeError = __webpack_require__(4114);
      var $Map = GetIntrinsic("%Map%", true);
      var $mapGet = callBound("Map.prototype.get", true);
      var $mapSet = callBound("Map.prototype.set", true);
      var $mapHas = callBound("Map.prototype.has", true);
      var $mapDelete = callBound("Map.prototype.delete", true);
      var $mapSize = callBound("Map.prototype.size", true);
      module.exports = !!$Map && function getSideChannelMap() {
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + inspect(key));
          },
          delete: function(key) {
            if ($m) {
              var result = $mapDelete($m, key);
              if ($mapSize($m) === 0) $m = void void 0;
              return result;
            }
            return false;
          },
          get: function(key) {
            if ($m) return $mapGet($m, key);
          },
          has: function(key) {
            if ($m) return $mapHas($m, key);
            return false;
          },
          set: function(key, value) {
            if (!$m) $m = new $Map;
            $mapSet($m, key, value);
          }
        };
        return channel;
      };
    },
    1926: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var GetIntrinsic = __webpack_require__(9718);
      var callBound = __webpack_require__(4449);
      var inspect = __webpack_require__(6410);
      var getSideChannelMap = __webpack_require__(958);
      var $TypeError = __webpack_require__(4114);
      var $WeakMap = GetIntrinsic("%WeakMap%", true);
      var $weakMapGet = callBound("WeakMap.prototype.get", true);
      var $weakMapSet = callBound("WeakMap.prototype.set", true);
      var $weakMapHas = callBound("WeakMap.prototype.has", true);
      var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
      module.exports = $WeakMap ? function getSideChannelWeakMap() {
        var $wm;
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + inspect(key));
          },
          delete: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) return $weakMapDelete($wm, key);
            } else if (getSideChannelMap) if ($m) return $m["delete"](key);
            return false;
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) if ($wm) return $weakMapGet($wm, key);
            return $m && $m.get(key);
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) if ($wm) return $weakMapHas($wm, key);
            return !!$m && $m.has(key);
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) $wm = new $WeakMap;
              $weakMapSet($wm, key, value);
            } else if (getSideChannelMap) {
              if (!$m) $m = getSideChannelMap();
              $m.set(key, value);
            }
          }
        };
        return channel;
      } : getSideChannelMap;
    },
    1233: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var $TypeError = __webpack_require__(4114);
      var inspect = __webpack_require__(6410);
      var getSideChannelList = __webpack_require__(3364);
      var getSideChannelMap = __webpack_require__(958);
      var getSideChannelWeakMap = __webpack_require__(1926);
      var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
      module.exports = function getSideChannel() {
        var $channelData;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) throw new $TypeError("Side channel does not contain " + inspect(key));
          },
          delete: function(key) {
            return !!$channelData && $channelData["delete"](key);
          },
          get: function(key) {
            return $channelData && $channelData.get(key);
          },
          has: function(key) {
            return !!$channelData && $channelData.has(key);
          },
          set: function(key, value) {
            if (!$channelData) $channelData = makeChannel();
            $channelData.set(key, value);
          }
        };
        return channel;
      };
    },
    900: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      var punycode = __webpack_require__(3448);
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
      var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, delims = [ "<", ">", '"', "`", " ", "\r", "\n", "\t" ], unwise = [ "{", "}", "|", "\\", "^", "`" ].concat(delims), autoEscape = [ "'" ].concat(unwise), nonHostChars = [ "%", "/", "?", ";", "#" ].concat(autoEscape), hostEndingChars = [ "/", "?", "#" ], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
        javascript: true,
        "javascript:": true
      }, hostlessProtocol = {
        javascript: true,
        "javascript:": true
      }, slashedProtocol = {
        http: true,
        https: true,
        ftp: true,
        gopher: true,
        file: true,
        "http:": true,
        "https:": true,
        "ftp:": true,
        "gopher:": true,
        "file:": true
      }, querystring = __webpack_require__(1792);
      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && typeof url === "object" && url instanceof Url) return url;
        var u = new Url;
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }
      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (typeof url !== "string") throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, "/");
        url = uSplit.join(splitter);
        var rest = url;
        rest = rest.trim();
        if (!slashesDenoteHost && url.split("#").length === 1) {
          var simplePath = simplePathPattern.exec(rest);
          if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
              this.search = simplePath[2];
              if (parseQueryString) this.query = querystring.parse(this.search.substr(1)); else this.query = this.search.substr(1);
            } else if (parseQueryString) {
              this.search = "";
              this.query = {};
            }
            return this;
          }
        }
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@/]+@[^@/]+/)) {
          var slashes = rest.substr(0, 2) === "//";
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
        if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
          }
          var auth, atSign;
          if (hostEnd === -1) atSign = rest.lastIndexOf("@"); else atSign = rest.lastIndexOf("@", hostEnd);
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
          hostEnd = -1;
          for (i = 0; i < nonHostChars.length; i++) {
            hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
          }
          if (hostEnd === -1) hostEnd = rest.length;
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
          this.parseHost();
          this.hostname = this.hostname || "";
          var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            i = 0;
            for (var l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part) continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = "";
                for (var j = 0, k = part.length; j < k; j++) if (part.charCodeAt(j) > 127) newpart += "x"; else newpart += part[j];
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) rest = "/" + notHost.join(".") + rest;
                  this.hostname = validParts.join(".");
                  break;
                }
              }
            }
          }
          if (this.hostname.length > hostnameMaxLen) this.hostname = ""; else this.hostname = this.hostname.toLowerCase();
          if (!ipv6Hostname) this.hostname = punycode.toASCII(this.hostname);
          var p = this.port ? ":" + this.port : "";
          var h = this.hostname || "";
          this.host = h + p;
          this.href += this.host;
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== "/") rest = "/" + rest;
          }
        }
        if (!unsafeProtocol[lowerProto]) for (i = 0, l = autoEscape.length; i < l; i++) {
          var ae = autoEscape[i];
          if (rest.indexOf(ae) === -1) continue;
          var esc = encodeURIComponent(ae);
          if (esc === ae) esc = escape(ae);
          rest = rest.split(ae).join(esc);
        }
        var hash = rest.indexOf("#");
        if (hash !== -1) {
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf("?");
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) this.query = querystring.parse(this.query);
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        if (rest) this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) this.pathname = "/";
        if (this.pathname || this.search) {
          p = this.pathname || "";
          var s = this.search || "";
          this.path = p + s;
        }
        this.href = this.format();
        return this;
      };
      function urlFormat(obj) {
        if (typeof obj === "string") obj = urlParse(obj);
        if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
        return obj.format();
      }
      Url.prototype.format = function() {
        var auth = this.auth || "";
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ":");
          auth += "@";
        }
        var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
        if (this.host) host = auth + this.host; else if (this.hostname) {
          host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
          if (this.port) host += ":" + this.port;
        }
        if (this.query && typeof this.query === "object" && Object.keys(this.query).length) query = querystring.stringify(this.query, {
          arrayFormat: "repeat",
          addQueryPrefix: false
        });
        var search = this.search || query && "?" + query || "";
        if (protocol && protocol.substr(-1) !== ":") protocol += ":";
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = "//" + (host || "");
          if (pathname && pathname.charAt(0) !== "/") pathname = "/" + pathname;
        } else if (!host) host = "";
        if (hash && hash.charAt(0) !== "#") hash = "#" + hash;
        if (search && search.charAt(0) !== "?") search = "?" + search;
        pathname = pathname.replace(/[?#]/g, (function(match) {
          return encodeURIComponent(match);
        }));
        search = search.replace("#", "%23");
        return protocol + host + pathname + search + hash;
      };
      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
      function urlResolveObject(source, relative) {
        if (!source) return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }
      Url.prototype.resolveObject = function(relative) {
        if (typeof relative === "string") {
          var rel = new Url;
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url;
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
          var tkey = tkeys[tk];
          result[tkey] = this[tkey];
        }
        result.hash = relative.hash;
        if (relative.href === "") {
          result.href = result.format();
          return result;
        }
        if (relative.slashes && !relative.protocol) {
          var rkeys = Object.keys(relative);
          for (var rk = 0; rk < rkeys.length; rk++) {
            var rkey = rkeys[rk];
            if (rkey !== "protocol") result[rkey] = relative[rkey];
          }
          if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
            result.pathname = "/";
            result.path = result.pathname;
          }
          result.href = result.format();
          return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for (var v = 0; v < keys.length; v++) {
              var k = keys[v];
              result[k] = relative[k];
            }
            result.href = result.format();
            return result;
          }
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || "").split("/");
            while (relPath.length && !(relative.host = relPath.shift())) ;
            if (!relative.host) relative.host = "";
            if (!relative.hostname) relative.hostname = "";
            if (relPath[0] !== "") relPath.unshift("");
            if (relPath.length < 2) relPath.unshift("");
            result.pathname = relPath.join("/");
          } else result.pathname = relative.pathname;
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || "";
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          if (result.pathname || result.search) {
            var p = result.pathname || "";
            var s = result.search || "";
            result.path = p + s;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
        var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], psychotic = (relPath = relative.pathname && relative.pathname.split("/") || [], 
        result.protocol && !slashedProtocol[result.protocol]);
        if (psychotic) {
          result.hostname = "";
          result.port = null;
          if (result.host) if (srcPath[0] === "") srcPath[0] = result.host; else srcPath.unshift(result.host);
          result.host = "";
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) if (relPath[0] === "") relPath[0] = relative.host; else relPath.unshift(relative.host);
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
          result.host = relative.host || relative.host === "" ? relative.host : result.host;
          result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else if (relPath.length) {
          if (!srcPath) srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (relative.search != null) {
          if (psychotic) {
            result.host = srcPath.shift();
            result.hostname = result.host;
            var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.hostname = authInHost.shift();
              result.host = result.hostname;
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          if (result.pathname !== null || result.search !== null) result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
          result.href = result.format();
          return result;
        }
        if (!srcPath.length) {
          result.pathname = null;
          if (result.search) result.path = "/" + result.search; else result.path = null;
          result.href = result.format();
          return result;
        }
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last = srcPath[i];
          if (last === ".") srcPath.splice(i, 1); else if (last === "..") {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }
        if (!mustEndAbs && !removeAllDots) for (;up--; up) srcPath.unshift("..");
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) srcPath.unshift("");
        if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") srcPath.push("");
        var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (psychotic) {
          result.hostname = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
          result.host = result.hostname;
          authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.hostname = authInHost.shift();
            result.host = result.hostname;
          }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute) srcPath.unshift("");
        if (srcPath.length > 0) result.pathname = srcPath.join("/"); else {
          result.pathname = null;
          result.path = null;
        }
        if (result.pathname !== null || result.search !== null) result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ":") this.port = port.substr(1);
          host = host.substr(0, host.length - port.length);
        }
        if (host) this.hostname = host;
      };
      exports.parse = urlParse;
      exports.resolve = urlResolve;
      exports.resolveObject = urlResolveObject;
      exports.format = urlFormat;
      exports.Url = Url;
    },
    2634: () => {}
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== void 0) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {}
    };
    __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.loaded = true;
    return module.exports;
  }
  (() => {
    __webpack_require__.g = function() {
      if (typeof globalThis === "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if (typeof window === "object") return window;
      }
    }();
  })();
  (() => {
    __webpack_require__.nmd = module => {
      module.paths = [];
      if (!module.children) module.children = [];
      return module;
    };
  })();
  (() => {
    "use strict";
    var detectProvider_commonjs = __webpack_require__(1142);
    class detectProvider_AbstractMetadata {
      _rawMetadata=null;
      constructor(rawMetadata) {
        if (new.target === detectProvider_AbstractMetadata) throw new Error("Cannot instantiate an abstract class directly.");
        this._rawMetadata = rawMetadata;
      }
      get user() {
        throw new Error("Abstract property 'user' must be implemented in derived class.");
      }
      get repository() {
        throw new Error("Abstract property 'repository' must be implemented in derived class.");
      }
      get branch() {
        throw new Error("Abstract property 'branch' must be implemented in derived class.");
      }
      get projectUrl() {
        throw new Error("Abstract property 'projectUrl' must be implemented in derived class.");
      }
      get languagesUrl() {
        throw new Error("Abstract property 'languagesUrl' must be implemented in derived class.");
      }
      get httpsCloneUrl() {
        throw new Error("Abstract property 'httpsCloneUrl' must be implemented in derived class.");
      }
      get sshCloneUrl() {
        throw new Error("Abstract property 'sshCloneUrl' must be implemented in derived class.");
      }
      get repositoryDisplayName() {
        return `${this.repository} • ${this.branch}`;
      }
    }
    const detectProvider_DEFAULT_LANGUAGE = "java";
    const detectProvider_USAGE_THRESHOLD_PERCENT = 5;
    const detectProvider_HUNDRED_PERCENT = 100;
    class detectProvider_Language {
      #name;
      #percentage;
      constructor(name, percentage) {
        this.#name = name;
        this.#percentage = percentage;
      }
      get name() {
        return this.#name;
      }
      get percentage() {
        return this.#percentage;
      }
      get standardizedName() {
        return this.name.toLowerCase();
      }
      get isRelevant() {
        return this.percentage > detectProvider_USAGE_THRESHOLD_PERCENT;
      }
      static Default=new detectProvider_Language(detectProvider_DEFAULT_LANGUAGE, detectProvider_HUNDRED_PERCENT);
    }
    const detectProvider_SUPPORTED_LANGUAGES = {
      [detectProvider_DEFAULT_LANGUAGE]: [ "idea" ],
      kotlin: [ "idea" ],
      groovy: [ "idea" ],
      scala: [ "idea" ],
      javascript: [ "webstorm", "phpstorm", "idea" ],
      coffeescript: [ "webstorm", "phpstorm", "idea" ],
      typescript: [ "webstorm", "phpstorm", "idea" ],
      dart: [ "webstorm", "phpstorm", "idea" ],
      go: [ "goland", "idea" ],
      css: [ "webstorm", "phpstorm", "idea" ],
      html: [ "webstorm", "phpstorm", "idea" ],
      python: [ "pycharm", "idea" ],
      "jupyter notebook": [ "pycharm", "idea" ],
      php: [ "phpstorm", "idea" ],
      "c#": [ "rider" ],
      "f#": [ "rider" ],
      "c++": [ "clion" ],
      c: [ "clion" ],
      ruby: [ "rubymine", "idea" ],
      rust: [ "rustrover", "clion", "idea" ],
      puppet: [ "rubymine", "idea" ],
      "objective-c": [ "appcode" ],
      swift: [ "appcode" ]
    };
    const detectProvider_intellij_idea_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImludGVsbGlqLWlkZWFfc3ZnX19hIiB4MT0iLS4zOTEiIHgyPSIyNC4zOTIiIHkxPSI3LjY3MSIgeTI9IjYxLjEyNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjEiIHN0b3AtY29sb3I9IiNGQzgwMUQiLz48c3RvcCBvZmZzZXQ9Ii41OSIgc3RvcC1jb2xvcj0iI0ZFMjg1NyIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJpbnRlbGxpai1pZGVhX3N2Z19fYiIgeDE9IjQuMzI1IiB4Mj0iNjIuOTIxIiB5MT0iNTkuOTMyIiB5Mj0iMS4zMzYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4yMSIgc3RvcC1jb2xvcj0iI0ZFMjg1NyIvPjxzdG9wIG9mZnNldD0iLjciIHN0b3AtY29sb3I9IiMwMDdFRkYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSIjRkY4MTAwIiBkPSJNMTYuNDUgNkg0LjE5MWE0LjEyNSA0LjEyNSAwIDAgMC00LjEyNCA0LjE5bC4xNzYgMTEuMDQ0YTQuMTI1IDQuMTI1IDAgMCAwIDEuNDQgMy4wNjZsMzguMTU5IDMyLjcwN2MuNzQ3LjY0IDEuNy45OTMgMi42ODQuOTkzaDExLjM1QTQuMTI1IDQuMTI1IDAgMCAwIDU4IDUzLjg3NVY0Mi44NzJjMC0xLjE5LS41MTQtMi4zMjEtMS40MS0zLjEwNUwxOS4xNjcgNy4wMjFBNC4xMjMgNC4xMjMgMCAwIDAgMTYuNDUgNloiLz48cGF0aCBmaWxsPSJ1cmwoI2ludGVsbGlqLWlkZWFfc3ZnX19hKSIgZD0iTTE0Ljk4OCA2SDQuMTI1QTQuMTI1IDQuMTI1IDAgMCAwIDAgMTAuMTI1djEyLjU2NmMwIC4yLjAxNC40LjA0NC41OThsNS40NDggMzcuMTg1QTQuMTI1IDQuMTI1IDAgMCAwIDkuNTczIDY0aDE1LjM5OGE0LjEyNSA0LjEyNSAwIDAgMCA0LjEyNS00LjEyN0wyOS4wOSA0MS4zN2MwLS40MjYtLjA2Ni0uODQ5LS4xOTUtMS4yNTRsLTkuOTgtMzEuMjQ1QTQuMTI2IDQuMTI2IDAgMCAwIDE0Ljk4OCA2VjZaIi8+PHBhdGggZmlsbD0idXJsKCNpbnRlbGxpai1pZGVhX3N2Z19fYikiIGQ9Ik01OS44NzYgMEgyNS43NDhhNC4xMjUgNC4xMjUgMCAwIDAtMy44IDIuNTJMNi4xNTEgMzkuOTQzYTQuMTE4IDQuMTE4IDAgMCAwLS4zMjUgMS42MzhsLjE1IDE4LjMyOUE0LjEyNSA0LjEyNSAwIDAgMCAxMC4xMDEgNjRoMTcuNjY2Yy44MDYgMCAxLjU5My0uMjM2IDIuMjY2LS42NzhsMzIuMTEtMjEuMTA5QTQuMTIzIDQuMTIzIDAgMCAwIDY0IDM4Ljc2NlY0LjEyNUE0LjEyNSA0LjEyNSAwIDAgMCA1OS44NzYgMFoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNTIgMTJIMTJ2NDBoNDBWMTJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMzIDQ0SDE3djNoMTZ2LTNaTTE3IDI5LjM4M2gyLjk4di05Ljc3NUgxN3YtMi42MTZoOC44NDN2Mi42MTZoLTIuOTh2OS43NzVoMi45OFYzMkgxN3YtMi42MTZaTTI3LjY0MyAyOS4yOThoMi4xNTRhMi4zOCAyLjM4IDAgMCAwIDEuMTYzLS4yNzljLjM0LS4xODYuNjAyLS40NDguNzg4LS43ODguMTg2LS4zNC4yNzktLjcyNy4yNzktMS4xNjNWMTYuOTkyaDIuOTI2djEwLjI4YzAgLjktLjIwNyAxLjcwOS0uNjIyIDIuNDI3YTQuNDUgNC40NSAwIDAgMS0xLjcxNSAxLjY4OGMtLjcyOC40MDgtMS41NDYuNjExLTIuNDU0LjYxMWgtMi41MTl2LTIuN1oiLz48L3N2Zz4=";
    const detectProvider_appcode_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDcwIDcwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImFwcGNvZGVfc3ZnX19hIiB4MT0iMzAuMjIxIiB4Mj0iNjkuNzk2IiB5MT0iNjMuMDc0IiB5Mj0iNjMuMDc0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMTk0IiBzdG9wLWNvbG9yPSIjMDdDM0YyIi8+PHN0b3Agb2Zmc2V0PSIuOTAzIiBzdG9wLWNvbG9yPSIjMDg3Q0ZBIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImFwcGNvZGVfc3ZnX19iIiB4MT0iMS4yNzQiIHgyPSIzOC40MSIgeTE9IjE2LjAzNiIgeTI9IjE2LjAzNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjE5NCIgc3RvcC1jb2xvcj0iIzA3QzNGMiIvPjxzdG9wIG9mZnNldD0iLjkwMyIgc3RvcC1jb2xvcj0iIzA4N0NGQSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJhcHBjb2RlX3N2Z19fYyIgeDE9IjQ1Ljg3NiIgeDI9IjExLjE5NyIgeTE9IjcyLjIyMiIgeTI9IjIzLjgyNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjA5MSIgc3RvcC1jb2xvcj0iIzIxRDc4OSIvPjxzdG9wIG9mZnNldD0iLjQ4NCIgc3RvcC1jb2xvcj0iIzA3QzNGMiIvPjxzdG9wIG9mZnNldD0iLjkwMyIgc3RvcC1jb2xvcj0iIzA4N0NGQSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9IiMwODdDRkEiIGQ9Ik01My41MiA3MCA3MCAyNi4zMjNsLTI4LjQzOC02LjYzNkw1My41MjIgNzBaIi8+PHBhdGggZmlsbD0idXJsKCNhcHBjb2RlX3N2Z19fYSkiIGQ9Ik02OS43ODEgNTYuMTQ2IDUzLjUyMSA3MGwtMjMuMzM0LTUuOThMNDIgNTQuNWwyNy43ODEgMS42NDZaIi8+PHBhdGggZmlsbD0idXJsKCNhcHBjb2RlX3N2Z19fYikiIGQ9Ik04Ljc1IDMyLjA4MyAxLjI0IDEwLjc5MiAzOC40MjcgMCAyOS41IDIxLjUgOC43NSAzMi4wODNaIi8+PHBhdGggZmlsbD0idXJsKCNhcHBjb2RlX3N2Z19fYykiIGQ9Ik02MS4xMDQgNDAuNTQyIDUwLjY3NyAyMi43NWwuMTQ2LS4xNDZMMzguNDI3IDAgMCA0MS40OVY3MGw2OS43ODEtMTMuODU0LTguNjc3LTE1LjYwNFoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNTYgMTRIMTR2NDJoNDJWMTRaIi8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTM0LjQxNyA0OC42NWgtMTUuNzV2Mi42ODNoMTUuNzVWNDguNjVaIi8+PGcgZmlsbD0iI0ZGRiI+PHBhdGggZD0iTTI0LjggMTkuMTNoMy4xMjVsNi42NyAxNS42M0gzMS4wNWwtMS4zODktMy40NzNoLTYuNmwtMS4zODkgMy40NzNIMTguMmw2LjYtMTUuNjNabTMuNTQyIDkuMS0yLjA4NC01LjA3LTIuMDg0IDUuMDdoNC4xNjhaTTM0LjYgMjcuMDY3YzAtNC40MzQgMy4yNjctOC4xNjcgOC4xNjctOC4xNjcgMy4wMzMgMCA0LjY2Ni45MzMgNi4zIDIuMzMzbC0yLjEgMi41NjdDNDUuOCAyMi42MzMgNDQuNjMzIDIxLjkzMyA0MyAyMS45MzNjLTIuNTY3IDAtNC42NjcgMi4xLTQuNjY3IDQuOSAwIDIuOCAxLjg2NyA0LjkgNC42NjcgNC45IDEuODY3IDAgMi44LS43IDQuMi0xLjg2NmwyLjEgMi4zMzNjLTEuODY3IDEuODY3LTMuNzMzIDIuOC02Ljc2NyAyLjgtNC42NjYgMC03LjkzMy0zLjUtNy45MzMtNy45MzNaIi8+PC9nPjwvc3ZnPg==";
    const detectProvider_clion_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNsaW9uX3N2Z19fYSIgeDE9IjQuMDY3IiB4Mj0iNjIuNjY0IiB5MT0iNC4zMjciIHkyPSI2Mi45MjMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iIzAwOUFFNSIvPjxzdG9wIG9mZnNldD0iLjciIHN0b3AtY29sb3I9IiMwMEQ5ODAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xpb25fc3ZnX19iIiB4MT0iNTYuMzI5IiB4Mj0iMi44NzQiIHkxPSItLjM5MSIgeTI9IjI0LjM5MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiNGRjJEOTAiLz48c3RvcCBvZmZzZXQ9Ii41NCIgc3RvcC1jb2xvcj0iIzAwOUFFNSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjY2xpb25fc3ZnX19hKSIgZD0iTTY0IDU5Ljg3OFYyNS43NWE0LjEyNSA0LjEyNSAwIDAgMC0yLjUyLTMuOEwyNC4wNTcgNi4xNTNhNC4xMTggNC4xMTggMCAwIDAtMS42MzgtLjMyNWwtMTguMzI5LjE1QTQuMTI0IDQuMTI0IDAgMCAwIDAgMTAuMTAzdjE3LjY2NWMwIC44MDYuMjM2IDEuNTkzLjY3OCAyLjI2N2wyMS4xMDkgMzIuMTA5YTQuMTI0IDQuMTI0IDAgMCAwIDMuNDQ3IDEuODU5aDM0LjY0MUE0LjEyNSA0LjEyNSAwIDAgMCA2NCA1OS44NzhaIi8+PHBhdGggZmlsbD0idXJsKCNjbGlvbl9zdmdfX2IpIiBkPSJNNTggMTQuOTg4VjQuMTI1QTQuMTI1IDQuMTI1IDAgMCAwIDUzLjg3NSAwSDQxLjMwOWMtLjIgMC0uNC4wMTQtLjU5OC4wNDRMMy41MjcgNS40OTJBNC4xMjUgNC4xMjUgMCAwIDAgMCA5LjU3M3YxNS4zOThhNC4xMjUgNC4xMjUgMCAwIDAgNC4xMjYgNC4xMjVsMTguNTA1LS4wMDVjLjQyNSAwIC44NDgtLjA2NiAxLjI1My0uMTk1bDMxLjI0Ni05Ljk4QTQuMTI2IDQuMTI2IDAgMCAwIDU4IDE0Ljk4OFoiLz48cGF0aCBmaWxsPSIjRkYyRDkwIiBkPSJNNTggMTYuNDUzVjQuMTk0QTQuMTI1IDQuMTI1IDAgMCAwIDUzLjgxLjA3TDQzLjAwMy4wMDhjLTEuMTguMDE5LTIuNTM1Ljc4MS0zLjMwNCAxLjY3OEw2Ljk5MyAzOS44NDRjLS42NC43NDgtLjk5MyAxLjctLjk5MyAyLjY4NHYxMS4zNWE0LjEyNSA0LjEyNSAwIDAgMCA0LjEyNSA0LjEyNWgxMS4wMDNjMS4xOSAwIDIuMzIxLS41MTQgMy4xMDQtMS40MDlMNTYuOTggMTkuMTdBNC4xMjQgNC4xMjQgMCAwIDAgNTggMTYuNDUzWiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik01MiAxMkgxMnY0MGg0MFYxMloiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzMgNDRIMTd2M2gxNnYtM1pNMjAuNzQ3IDMxLjI0MmE3LjI4NyA3LjI4NyAwIDAgMS0yLjc0NC0yLjc4NmMtLjY2NS0xLjE4My0uOTk3LTIuNTAzLS45OTctMy45NjFzLjMzMi0yLjc3OC45OTctMy45NmE3LjI5IDcuMjkgMCAwIDEgMi43NDQtMi43ODdjMS4xNjQtLjY3NSAyLjQ2NS0xLjAxNCAzLjkwMS0xLjAxNCAxLjIxNSAwIDIuMzMuMjI1IDMuMzQ1LjY3NWE2Ljg2MiA2Ljg2MiAwIDAgMSAyLjUzNSAxLjg5MiA2LjQ0MyA2LjQ0MyAwIDAgMSAxLjM1NSAyLjc5M2gtMy4wNjVhNC4wNTQgNC4wNTQgMCAwIDAtLjg5NS0xLjQzMSA0LjAzOCA0LjAzOCAwIDAgMC0xLjQzMS0uOTUgNC44OTUgNC44OTUgMCAwIDAtMS44MjItLjMzMmMtLjg4NyAwLTEuNjg3LjIyMi0yLjQwMi42NjVhNC42MSA0LjYxIDAgMCAwLTEuNjc3IDEuODI3Yy0uNDA0Ljc3Ni0uNjA2IDEuNjQ5LS42MDYgMi42MiAwIC45NzMuMjAyIDEuODQ2LjYwNiAyLjYyMWE0LjYwNSA0LjYwNSAwIDAgMCAxLjY3NyAxLjgyOGMuNzE1LjQ0MyAxLjUxNS42NjQgMi40MDIuNjY0YTQuODggNC44OCAwIDAgMCAxLjgyMi0uMzMyIDQuMDIyIDQuMDIyIDAgMCAwIDIuMzI2LTIuMzhoMy4wNjVhNi40NDQgNi40NDQgMCAwIDEtMS4zNTUgMi43OTIgNi44NjMgNi44NjMgMCAwIDEtMi41MzUgMS44OTJjLTEuMDE1LjQ1LTIuMTMuNjc1LTMuMzQ1LjY3NS0xLjQzNiAwLTIuNzM2LS4zMzctMy45MDEtMS4wMTN2LjAwM1pNMzcuMzMgMTYuOTkydjEyLjM3aDcuMTE3djIuNjM2SDM0LjQxNFYxNi45OTJoMi45MTZaIi8+PC9zdmc+";
    const detectProvider_pycharm_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InB5Y2hhcm1fc3ZnX19hIiB4MT0iNy42NzEiIHgyPSI2MS4xMjYiIHkxPSI2NC4zOTMiIHkyPSIzOS42MDkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4xIiBzdG9wLWNvbG9yPSIjMDBEODg2Ii8+PHN0b3Agb2Zmc2V0PSIuNTkiIHN0b3AtY29sb3I9IiNGMEVCMTgiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icHljaGFybV9zdmdfX2IiIHgxPSI1OS45MzMiIHgyPSIxLjMzNyIgeTE9IjU5LjY3NiIgeTI9IjEuMDgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4zIiBzdG9wLWNvbG9yPSIjRjBFQjE4Ii8+PHN0b3Agb2Zmc2V0PSIuNyIgc3RvcC1jb2xvcj0iIzAwQzRGNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9IiMwMEQ4ODYiIGQ9Ik02IDQ3LjU1djEyLjI1OWE0LjEyNSA0LjEyNSAwIDAgMCA0LjE5IDQuMTI0bDExLjA0NC0uMTc2YTQuMTI1IDQuMTI1IDAgMCAwIDMuMDY2LTEuNDRsMzIuNzA3LTM4LjE1OGMuNjQtLjc0OC45OTMtMS43Ljk5My0yLjY4NVYxMC4xMjVBNC4xMjUgNC4xMjUgMCAwIDAgNTMuODc1IDZINDIuODcyYy0xLjE5IDAtMi4zMjEuNTE0LTMuMTA1IDEuNDA5TDcuMDIxIDQ0LjgzNEE0LjEyMyA0LjEyMyAwIDAgMCA2IDQ3LjU1WiIvPjxwYXRoIGZpbGw9InVybCgjcHljaGFybV9zdmdfX2EpIiBkPSJNNiA0OS4wMTV2MTAuODYyYTQuMTI1IDQuMTI1IDAgMCAwIDQuMTI1IDQuMTI1aDEyLjU2NmMuMiAwIC40LS4wMTQuNTk4LS4wNDRsMzcuMTg1LTUuNDQ4QTQuMTI1IDQuMTI1IDAgMCAwIDY0IDU0LjQyOVYzOS4wM2E0LjEyNSA0LjEyNSAwIDAgMC00LjEyNy00LjEyNWwtMTguNTA0LjAwNWMtLjQyNiAwLS44NDkuMDY2LTEuMjU0LjE5NUw4Ljg3MSA0NS4wODVBNC4xMjYgNC4xMjYgMCAwIDAgNiA0OS4wMTVINloiLz48cGF0aCBmaWxsPSJ1cmwoI3B5Y2hhcm1fc3ZnX19iKSIgZD0iTTAgNC4xMjV2MzQuMTI3YzAgMS42NTkuOTkzIDMuMTU1IDIuNTIgMy44TDM5Ljk0MyA1Ny44NWMuNTE4LjIxOSAxLjA3NS4zMyAxLjYzOC4zMjRsMTguMzI5LS4xNUE0LjEyNSA0LjEyNSAwIDAgMCA2NCA1My45VjM2LjIzNGMwLS44MDYtLjIzNi0xLjU5My0uNjc4LTIuMjY3TDQyLjIxMyAxLjg2QTQuMTI1IDQuMTI1IDAgMCAwIDM4Ljc2NiAwSDQuMTI1QTQuMTI1IDQuMTI1IDAgMCAwIDAgNC4xMjVaIi8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTUyIDEySDEydjQwaDQwVjEyWiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zMyA0NEgxN3YzaDE2di0zWk0xNi45OTMgMTYuOTkyaDYuNDQyYzEuMDU3IDAgMS45ODQuMTkzIDIuNzguNTc5Ljc5OC4zODYgMS40MTIuOTI5IDEuODQ1IDEuNjMuNDMyLjcuNjQ4IDEuNTEuNjQ4IDIuNDMyIDAgLjkyMi0uMjIgMS43NTktLjY1OSAyLjQ2Ni0uNDQuNzA4LTEuMDYzIDEuMjU2LTEuODcgMS42NDYtLjgwOC4zOS0xLjc1MS41ODQtMi44My41ODRoLTMuNDNWMzJoLTIuOTI3VjE2Ljk5M1ptNy41NCA2LjYzYy4zNjktLjE4Mi42NTItLjQ0My44NTItLjc4Mi4yLS4zNC4zLS43MzguMy0xLjE5NXMtLjEtLjg0Mi0uMy0xLjE3NGMtLjItLjMzMy0uNDg0LS41OS0uODUyLS43NzItLjM2OC0uMTgyLS43OTgtLjI3My0xLjI5MS0uMjczaC0zLjMyNHY0LjQ3aDMuMzI0Yy40OTMgMCAuOTIzLS4wOTEgMS4yOTEtLjI3M1pNMzMuNzEzIDMxLjI0MmE3LjI4NyA3LjI4NyAwIDAgMS0yLjc0NC0yLjc4NmMtLjY2NC0xLjE4My0uOTk2LTIuNTAzLS45OTYtMy45NjFzLjMzMi0yLjc3OC45OTYtMy45NmE3LjI5IDcuMjkgMCAwIDEgMi43NDQtMi43ODdjMS4xNjUtLjY3NSAyLjQ2Ni0xLjAxNCAzLjkwMi0xLjAxNCAxLjIxNSAwIDIuMzMuMjI1IDMuMzQ0LjY3NWE2Ljg2MiA2Ljg2MiAwIDAgMSAyLjUzNSAxLjg5MiA2LjQ0MyA2LjQ0MyAwIDAgMSAxLjM1NiAyLjc5M2gtMy4wNjZhNC4wNTQgNC4wNTQgMCAwIDAtLjg5NS0xLjQzMSA0LjAzOCA0LjAzOCAwIDAgMC0xLjQzLS45NSA0Ljg5NiA0Ljg5NiAwIDAgMC0xLjgyMy0uMzMyYy0uODg3IDAtMS42ODcuMjIyLTIuNDAyLjY2NWE0LjYxMSA0LjYxMSAwIDAgMC0xLjY3NyAxLjgyN2MtLjQwNC43NzYtLjYwNiAxLjY0OS0uNjA2IDIuNjIgMCAuOTczLjIwMiAxLjg0Ni42MDYgMi42MjFhNC42MDcgNC42MDcgMCAwIDAgMS42NzcgMS44MjhjLjcxNS40NDMgMS41MTUuNjY0IDIuNDAyLjY2NC42NTcgMCAxLjI2NS0uMTEgMS44MjItLjMzMmE0LjAyMiA0LjAyMiAwIDAgMCAyLjMyNi0yLjM4aDMuMDY2YTYuNDQ0IDYuNDQ0IDAgMCAxLTEuMzU2IDIuNzkyIDYuODYzIDYuODYzIDAgMCAxLTIuNTM1IDEuODkyYy0xLjAxNS40NS0yLjEyOS42NzUtMy4zNDQuNjc1LTEuNDM2IDAtMi43MzctLjMzNy0zLjkwMi0xLjAxM3YuMDAzWiIvPjwvc3ZnPg==";
    const detectProvider_phpstorm_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBocHN0b3JtX3N2Z19fYSIgeDE9IjU2LjMyOSIgeDI9IjIuODc0IiB5MT0iLS4zOTEiIHkyPSIyNC4zOTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4xNiIgc3RvcC1jb2xvcj0iI0QyNDlGQyIvPjxzdG9wIG9mZnNldD0iLjU1IiBzdG9wLWNvbG9yPSIjRkYyRDkwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBocHN0b3JtX3N2Z19fYiIgeDE9IjQuMDY3IiB4Mj0iNjIuNjY0IiB5MT0iNC4zMjYiIHkyPSI2Mi45MjMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4zIiBzdG9wLWNvbG9yPSIjRkYyRDkwIi8+PHN0b3Agb2Zmc2V0PSIuNyIgc3RvcC1jb2xvcj0iIzcyNTZGRiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9IiNEMjQ5RkMiIGQ9Ik01OCAxNi40NDZWNC4xODdBNC4xMjUgNC4xMjUgMCAwIDAgNTMuODEuMDYzTDQyLjc2NS4yMzlBNC4xMjUgNC4xMjUgMCAwIDAgMzkuNyAxLjY4TDYuOTkzIDM5LjgzN2MtLjY0Ljc0OC0uOTkzIDEuNy0uOTkzIDIuNjg1djExLjM1YTQuMTI1IDQuMTI1IDAgMCAwIDQuMTI1IDQuMTI0aDExLjAwM2MxLjE5IDAgMi4zMjEtLjUxNCAzLjEwNC0xLjQwOUw1Ni45OCAxOS4xNjJBNC4xMjQgNC4xMjQgMCAwIDAgNTggMTYuNDQ2WiIvPjxwYXRoIGZpbGw9InVybCgjcGhwc3Rvcm1fc3ZnX19hKSIgZD0iTTU4IDE0Ljk4OFY0LjEyNUE0LjEyNSA0LjEyNSAwIDAgMCA1My44NzUgMEg0MS4zMDljLS4yIDAtLjQuMDE0LS41OTguMDQ0TDMuNTI3IDUuNDkyQTQuMTI1IDQuMTI1IDAgMCAwIDAgOS41NzN2MTUuMzk4YTQuMTI1IDQuMTI1IDAgMCAwIDQuMTI2IDQuMTI1bDE4LjUwNS0uMDA1Yy40MjUgMCAuODQ4LS4wNjYgMS4yNTMtLjE5NWwzMS4yNDYtOS45OEE0LjEyNiA0LjEyNiAwIDAgMCA1OCAxNC45ODhaIi8+PHBhdGggZmlsbD0idXJsKCNwaHBzdG9ybV9zdmdfX2IpIiBkPSJNNjQgNTkuODc4VjI1Ljc1YTQuMTI1IDQuMTI1IDAgMCAwLTIuNTItMy44TDI0LjA1NyA2LjE1M2E0LjExOCA0LjExOCAwIDAgMC0xLjYzOC0uMzI1bC0xOC4zMjkuMTVBNC4xMjQgNC4xMjQgMCAwIDAgMCAxMC4xMDN2MTcuNjY1YzAgLjgwNi4yMzYgMS41OTMuNjc4IDIuMjY3bDIxLjEwOSAzMi4xMDlhNC4xMjQgNC4xMjQgMCAwIDAgMy40NDcgMS44NTloMzQuNjQxQTQuMTI1IDQuMTI1IDAgMCAwIDY0IDU5Ljg3OFoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNTIgMTJIMTJ2NDBoNDBWMTJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMzIDQ0SDE3djNoMTZ2LTNaTTE2Ljk5MyAxNi45OTJoNi40NDJjMS4wNTcgMCAxLjk4NC4xOTMgMi43OC41NzkuNzk4LjM4NiAxLjQxMi45MjkgMS44NDUgMS42My40MzIuNy42NDggMS41MS42NDggMi40MzIgMCAuOTIyLS4yMiAxLjc1OS0uNjU5IDIuNDY2LS40NC43MDgtMS4wNjMgMS4yNTYtMS44NyAxLjY0Ni0uODA4LjM5LTEuNzUxLjU4NC0yLjgzLjU4NGgtMy40M1YzMmgtMi45MjdWMTYuOTkzWm03LjU0IDYuNjNjLjM2OS0uMTgyLjY1Mi0uNDQzLjg1Mi0uNzgyLjItLjM0LjMtLjczOC4zLTEuMTk1cy0uMS0uODQyLS4zLTEuMTc0Yy0uMi0uMzMzLS40ODQtLjU5LS44NTItLjc3Mi0uMzY4LS4xODItLjc5OC0uMjczLTEuMjkxLS4yNzNoLTMuMzIzdjQuNDdoMy4zMjNjLjQ5MyAwIC45MjMtLjA5MSAxLjI5MS0uMjczWk0zMi41NzIgMzEuNjY0Yy0uODQtLjM5My0xLjQ5Ny0uOTQzLTEuOTcyLTEuNjUtLjQ3NS0uNzA4LS43Mi0xLjUyMi0uNzM1LTIuNDQ0aDIuOTM3YzAgLjQzNi4xMTQuODE4LjM0MyAxLjE0Ny4yMjkuMzI5LjU0Ny41ODYuOTU0Ljc3Mi40MDcuMTg1Ljg3NS4yNzggMS40MDQuMjc4LjUzIDAgLjk1Mi0uMDgzIDEuMzM1LS4yNTEuMzgyLS4xNjguNjc4LS40MDIuODktLjcwMnMuMzE1LS42NDMuMzE1LTEuMDI5YzAtLjQ3OS0uMTQ1LS44NzUtLjQzNC0xLjE5LS4yOS0uMzE0LS42ODgtLjUzMi0xLjE5NS0uNjU0bC0yLjY0Ny0uNTljLS43MTUtLjE1Ni0xLjMzNy0uNDI2LTEuODY2LS44MDlhNC4wMTQgNC4wMTQgMCAwIDEtMS4yMzItMS40MmMtLjI5My0uNTY0LS40NC0xLjItLjQ0LTEuOTA4IDAtLjg1Ny4yMjItMS42MjcuNjY1LTIuMzEuNDQzLS42ODIgMS4wNjEtMS4yMTUgMS44NTQtMS41OTcuNzk0LS4zODIgMS42OTQtLjU3MyAyLjcwMi0uNTczczEuOTMzLjE4NiAyLjczMy41NThjLjguMzcyIDEuNDI0Ljg4OCAxLjg3IDEuNTQ5LjQ0Ny42Ni42NzQgMS40Mi42ODEgMi4yNzdoLTIuOTI2YzAtLjM2NC0uMDk2LS42OTEtLjI5LS45OGExLjkwMyAxLjkwMyAwIDAgMC0uODItLjY3NiAyLjkxNSAyLjkxNSAwIDAgMC0xLjIxNi0uMjRjLS40NTggMC0uODYuMDc2LTEuMjA2LjIzYTEuOTAyIDEuOTAyIDAgMCAwLS44MS42NDNjLS4xOTMuMjc1LS4yODkuNTk1LS4yODkuOTYgMCAuNDE0LjEzNC43NTcuNDAyIDEuMDI4LjI2OC4yNzIuNjM0LjQ2NCAxLjA5OS41NzlsMi41NTEuNTU3Yy43MzYuMTUgMS4zOTIuNDM1IDEuOTY3Ljg1MmE0LjQ1IDQuNDUgMCAwIDEgMS4zNDUgMS41NDRjLjMyMS42MTEuNDgyIDEuMjc4LjQ4MiAxLjk5OSAwIC44ODYtLjIzNCAxLjY4MS0uNzAxIDIuMzg1LS40NjkuNzAzLTEuMTI0IDEuMjU1LTEuOTY3IDEuNjU2LS44NDMuNC0xLjgwOC42LTIuODk1LjYtMS4wODYgMC0yLjA1LS4xOTctMi44ODgtLjU5WiIvPjwvc3ZnPg==";
    const detectProvider_rubymine_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InJ1YnltaW5lX3N2Z19fYSIgeDE9IjQuMzI1IiB4Mj0iNjIuOTIxIiB5MT0iNTkuOTMyIiB5Mj0iMS4zMzciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iI0ZGMjM1OCIvPjxzdG9wIG9mZnNldD0iLjc1IiBzdG9wLWNvbG9yPSIjNzI1NkZGIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InJ1YnltaW5lX3N2Z19fYiIgeDE9Ii0uMzkxIiB4Mj0iMjQuMzkzIiB5MT0iNy42NzEiIHkyPSI2MS4xMjUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iI0ZGODEwMCIvPjxzdG9wIG9mZnNldD0iLjU2IiBzdG9wLWNvbG9yPSIjRkYyMzU4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZmlsbD0idXJsKCNydWJ5bWluZV9zdmdfX2EpIiBkPSJNNTkuODc1IDBIMjUuNzQ4YTQuMTI1IDQuMTI1IDAgMCAwLTMuOCAyLjUyTDYuMTUxIDM5Ljk0MmE0LjExOCA0LjExOCAwIDAgMC0uMzI1IDEuNjM5bC4xNSAxOC4zMjhBNC4xMjUgNC4xMjUgMCAwIDAgMTAuMTAxIDY0aDE3LjY2NmMuODA1IDAgMS41OTMtLjIzNSAyLjI2Ni0uNjc4bDMyLjEwOS0yMS4xMDhBNC4xMjMgNC4xMjMgMCAwIDAgNjQgMzguNzY2VjQuMTI1QTQuMTI1IDQuMTI1IDAgMCAwIDU5Ljg3NSAwWiIvPjxwYXRoIGZpbGw9InVybCgjcnVieW1pbmVfc3ZnX19iKSIgZD0iTTE0Ljk4NyA2SDQuMTI2QTQuMTI1IDQuMTI1IDAgMCAwIDAgMTAuMTI1djEyLjU2NmMwIC4yLjAxNC40LjA0NC41OThsNS40NDggMzcuMTg0QTQuMTI1IDQuMTI1IDAgMCAwIDkuNTcyIDY0SDI0Ljk3YTQuMTI1IDQuMTI1IDAgMCAwIDQuMTI1LTQuMTI2bC0uMDA0LTE4LjUwNGMwLS40MjYtLjA2Ny0uODUtLjE5Ni0xLjI1NEwxOC45MTYgOC44N0E0LjEyNiA0LjEyNiAwIDAgMCAxNC45ODcgNlY2WiIvPjxwYXRoIGZpbGw9IiNGRjgxMDAiIGQ9Ik0xNi40NSA2SDQuMTlhNC4xMjUgNC4xMjUgMCAwIDAtNC4xMjQgNC4xOUwwIDIxYy4wMTkgMS4xODEuNzg2IDIuNTMxIDEuNjgzIDMuM2wzOC4xNTggMzIuNzA2Yy43NDguNjQxIDEuNy45OTMgMi42ODQuOTkzaDExLjM1QTQuMTI1IDQuMTI1IDAgMCAwIDU4IDUzLjg3NFY0Mi44NzFjMC0xLjE4OS0uNTE0LTIuMzItMS40MS0zLjEwNEwxOS4xNjcgNy4wMjFBNC4xMjMgNC4xMjMgMCAwIDAgMTYuNDUgNloiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNTIgMTJIMTJ2NDBoNDBWMTJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMzIDQ0SDE3djNoMTZ2LTNaTTE3LjAxMiAxNi45OTJoNi40NDJjMS4wNSAwIDEuOTc1LjE5MyAyLjc3Ni41NzkuOC4zODYgMS40MTYuOTI5IDEuODQ5IDEuNjMuNDMyLjcuNjQ4IDEuNTEuNjQ4IDIuNDMyIDAgLjkyMi0uMjIgMS43NS0uNjYgMi40Ni0uNDM4LjcxMi0xLjA2NCAxLjI2Mi0xLjg3NSAxLjY1MS0uODExLjM5LTEuNzUyLjU4NC0yLjgyNC41ODRoLTMuNDN2NS42N2gtMi45MjZWMTYuOTkyWm03LjU0IDYuNjNjLjM2OC0uMTgzLjY1Mi0uNDQ0Ljg1Mi0uNzgzLjItLjM0LjMtLjczNC4zLTEuMTg0IDAtLjQ1LS4xLS44NTItLjMtMS4xODUtLjItLjMzMi0uNDg0LS41OS0uODUyLS43NzItLjM2OC0uMTgyLS43OTgtLjI3My0xLjI5Mi0uMjczaC0zLjMyM3Y0LjQ3aDMuMzIzYy40OTQgMCAuOTI0LS4wOSAxLjI5Mi0uMjczWm0tMi42MzEgMS43NjNoMy4xOTRMMjkuMDUgMzJoLTMuMzU1bC0zLjc3My02LjYxNFpNMzEuNjMzIDE2Ljk5Mmg0LjA3M2wzLjA4NyA5Ljg1LjI1NyAxLjI4Ny4yMjUtMS4yODYgMi45OC05Ljg1aDQuMTM4djE1LjAwNWgtMi44OTRWMjEuMjlsLjA0My0uNzgyLTMuNDk0IDExLjQ5aC0yLjEyM2wtMy40NTEtMTEuNDE1LjA0My43MDd2MTAuNzA4aC0yLjg4M1YxNi45OTJoLS4wMDFaIi8+PC9zdmc+";
    const detectProvider_webstorm_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9IndlYnN0b3JtX3N2Z19fYSIgeDE9IjcuNjcxIiB4Mj0iNjEuMTI2IiB5MT0iNjQuMzkyIiB5Mj0iMzkuNjA5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMjIiIHN0b3AtY29sb3I9IiNGMEVCMTgiLz48c3RvcCBvZmZzZXQ9Ii41OSIgc3RvcC1jb2xvcj0iIzAwQzRGNCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3ZWJzdG9ybV9zdmdfX2IiIHgxPSI1OS45MzIiIHgyPSIxLjMzNyIgeTE9IjU5LjY3NiIgeTI9IjEuMDc5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMTkiIHN0b3AtY29sb3I9IiMwMEM0RjQiLz48c3RvcCBvZmZzZXQ9Ii44MyIgc3RvcC1jb2xvcj0iIzAwN0RGRSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9IiNGMEVCMTgiIGQ9Ik02IDQ3LjU1djEyLjI1OGE0LjEyNSA0LjEyNSAwIDAgMCA0LjE5IDQuMTI0bDExLjA0NC0uMTc2YTQuMTI0IDQuMTI0IDAgMCAwIDMuMDY2LTEuNDRsMzIuNzA3LTM4LjE1OGMuNjQtLjc0Ny45OTMtMS43Ljk5My0yLjY4NFYxMC4xMjVBNC4xMjUgNC4xMjUgMCAwIDAgNTMuODc1IDZINDIuODcyYy0xLjE5IDAtMi4zMjEuNTE0LTMuMTA1IDEuNDA5TDcuMDIxIDQ0LjgzM0E0LjEyNCA0LjEyNCAwIDAgMCA2IDQ3LjU1WiIvPjxwYXRoIGZpbGw9InVybCgjd2Vic3Rvcm1fc3ZnX19hKSIgZD0iTTYgNDkuMDE1djEwLjg2MmE0LjEyNSA0LjEyNSAwIDAgMCA0LjEyNSA0LjEyNWgxMi41NjZjLjIgMCAuNC0uMDE0LjU5OC0uMDQ0bDM3LjE4NS01LjQ0OEE0LjEyNSA0LjEyNSAwIDAgMCA2NCA1NC40MjlWMzkuMDNhNC4xMjUgNC4xMjUgMCAwIDAtNC4xMjctNC4xMjVsLTE4LjUwNC4wMDVjLS40MjYgMC0uODQ5LjA2Ni0xLjI1NC4xOTVMOC44NzEgNDUuMDg1QTQuMTI2IDQuMTI2IDAgMCAwIDYgNDkuMDE1SDZaIi8+PHBhdGggZmlsbD0idXJsKCN3ZWJzdG9ybV9zdmdfX2IpIiBkPSJNMCA0LjEyNXYzNC4xMjdjMCAxLjY1OS45OTMgMy4xNTUgMi41MiAzLjhMMzkuOTQzIDU3Ljg1Yy41MTguMjE5IDEuMDc1LjMzIDEuNjM4LjMyNGwxOC4zMjktLjE1QTQuMTI1IDQuMTI1IDAgMCAwIDY0IDUzLjlWMzYuMjM0YzAtLjgwNi0uMjM2LTEuNTkzLS42NzgtMi4yNjdMNDIuMjEzIDEuODZBNC4xMjUgNC4xMjUgMCAwIDAgMzguNzY2IDBINC4xMjVBNC4xMjUgNC4xMjUgMCAwIDAgMCA0LjEyNVoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNTIgMTJIMTJ2NDBoNDBWMTJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMzIDQ0SDE3djNoMTZ2LTNaTTE5LjA1MSAxNi45OTJsMi40MjMgMTAuOTU1IDIuNTgzLTEwLjk1NWgyLjk1OGwyLjcwMSAxMC45NTUgMi4zNDgtMTAuOTU1aDIuOTdsLTMuNjQ1IDE1LjAwNmgtMy4zMzRsLTIuNTMtMTAuOS0yLjU2MSAxMC45SDE5LjY0bC0zLjYyMy0xNS4wMDZoMy4wMzNaTTM4LjY2MiAzMS42NjRjLS44NC0uMzkzLTEuNDk3LS45NDMtMS45NzItMS42NS0uNDc1LS43MDgtLjcyLTEuNTIyLS43MzUtMi40NDRoMi45MzdjMCAuNDM2LjExNC44MTguMzQzIDEuMTQ3LjIyOS4zMjkuNTQ3LjU4Ni45NTQuNzcyLjQwNy4xODUuODc1LjI3OCAxLjQwNC4yNzguNTMgMCAuOTUyLS4wODMgMS4zMzUtLjI1MS4zODItLjE2OC42NzgtLjQwMi44ODktLjcwMi4yMS0uMy4zMTYtLjY0My4zMTYtMS4wMjkgMC0uNDc5LS4xNDUtLjg3NS0uNDM0LTEuMTktLjI5LS4zMTQtLjY4OC0uNTMyLTEuMTk1LS42NTRsLTIuNjQ4LS41OWMtLjcxNC0uMTU2LTEuMzM2LS40MjYtMS44NjUtLjgwOWE0LjAxNSA0LjAxNSAwIDAgMS0xLjIzMi0xLjQyYy0uMjkzLS41NjQtLjQ0LTEuMi0uNDQtMS45MDggMC0uODU3LjIyMi0xLjYyNy42NjUtMi4zMS40NDMtLjY4MiAxLjA2MS0xLjIxNSAxLjg1NC0xLjU5Ny43OTMtLjM4MiAxLjY5NC0uNTczIDIuNzAxLS41NzMgMS4wMDggMCAxLjkzNC4xODYgMi43MzQuNTU4LjguMzcyIDEuNDIzLjg4OCAxLjg3IDEuNTQ5LjQ0Ny42Ni42NzMgMS40Mi42OCAyLjI3N2gtMi45MjVjMC0uMzY0LS4wOTctLjY5MS0uMjktLjk4cy0uNDY2LS41MTUtLjgyLS42NzZhMi45MTUgMi45MTUgMCAwIDAtMS4yMTctLjI0Yy0uNDU3IDAtLjg1OS4wNzYtMS4yMDUuMjNhMS45MDMgMS45MDMgMCAwIDAtLjgxLjY0M2MtLjE5My4yNzUtLjI4OS41OTUtLjI4OS45NiAwIC40MTQuMTM0Ljc1Ny40MDIgMS4wMjguMjY4LjI3Mi42MzQuNDY0IDEuMDk5LjU3OWwyLjU1LjU1N2MuNzM3LjE1IDEuMzkyLjQzNSAxLjk2OC44NTJhNC40NSA0LjQ1IDAgMCAxIDEuMzQ1IDEuNTQ0IDQuMjMgNC4yMyAwIDAgMSAuNDgyIDEuOTk5YzAgLjg4Ni0uMjM0IDEuNjgxLS43MDIgMi4zODUtLjQ2OC43MDMtMS4xMjMgMS4yNTUtMS45NjYgMS42NTYtLjg0NC40LTEuODA5LjYtMi44OTQuNi0xLjA4NiAwLTIuMDUtLjE5Ny0yLjg4OS0uNTlaIi8+PC9zdmc+";
    const detectProvider_rider_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InJpZGVyX3N2Z19fYSIgeDE9IjY0LjM5MSIgeDI9IjM5LjYwNyIgeTE9IjU2LjMyOSIgeTI9IjIuODc0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMjEiIHN0b3AtY29sb3I9IiMwMDdERkUiLz48c3RvcCBvZmZzZXQ9Ii41NSIgc3RvcC1jb2xvcj0iI0ZGQjcwMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJyaWRlcl9zdmdfX2IiIHgxPSI1OS42NzYiIHgyPSIxLjA4IiB5MT0iNC4wNjciIHkyPSI2Mi42NjMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii4yMyIgc3RvcC1jb2xvcj0iI0ZGQjcwMCIvPjxzdG9wIG9mZnNldD0iLjczIiBzdG9wLWNvbG9yPSIjRkYwQTY3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZmlsbD0iIzAwN0RGRSIgZD0iTTQ3LjU1IDU4aDEyLjI1OGE0LjEyNSA0LjEyNSAwIDAgMCA0LjEyNC00LjE5bC0uMTc2LTExLjA0NGE0LjEyNCA0LjEyNCAwIDAgMC0xLjQ0LTMuMDY2TDI0LjE1OCA2Ljk5M0E0LjEyNiA0LjEyNiAwIDAgMCAyMS40NzQgNkgxMC4xMjVBNC4xMjUgNC4xMjUgMCAwIDAgNiAxMC4xMjV2MTEuMDAzYzAgMS4xOS41MTQgMi4zMjEgMS40MDkgMy4xMDRMNDQuODM0IDU2Ljk4QTQuMTI0IDQuMTI0IDAgMCAwIDQ3LjU1IDU4WiIvPjxwYXRoIGZpbGw9InVybCgjcmlkZXJfc3ZnX19hKSIgZD0iTTQ5LjAxMyA1OGgxMC44NjJBNC4xMjUgNC4xMjUgMCAwIDAgNjQgNTMuODc1VjQxLjMwOWMwLS4yLS4wMTQtLjQtLjA0NC0uNTk4TDU4LjUwOCAzLjUyN0E0LjEyNSA0LjEyNSAwIDAgMCA1NC40MjcgMEgzOS4wMjlhNC4xMjUgNC4xMjUgMCAwIDAtNC4xMjUgNC4xMjZsLjAwNSAxOC41MDVjMCAuNDI1LjA2Ni44NDguMTk1IDEuMjUzbDkuOTc5IDMxLjI0NmE0LjEyNiA0LjEyNiAwIDAgMCAzLjkzIDIuODdaIi8+PHBhdGggZmlsbD0idXJsKCNyaWRlcl9zdmdfX2IpIiBkPSJNNC4xMjUgNjRoMzQuMTI3YTQuMTI1IDQuMTI1IDAgMCAwIDMuOC0yLjUyTDU3Ljg1IDI0LjA1N2MuMjE5LS41MTguMzMtMS4wNzYuMzI0LTEuNjM4bC0uMTUtMTguMzI5QTQuMTI0IDQuMTI0IDAgMCAwIDUzLjkgMEgzNi4yMzRjLS44MDUgMC0xLjU5My4yMzYtMi4yNjYuNjc4TDEuODYgMjEuNzg3QTQuMTI1IDQuMTI1IDAgMCAwIDAgMjUuMjM0djM0LjY0MUE0LjEyNSA0LjEyNSAwIDAgMCA0LjEyNSA2NFoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNTIgMTJIMTJ2NDBoNDBWMTJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMzIDQ0SDE3djNoMTZ2LTNaTTE2Ljk5MiAxNi45OTJoNi40NDJjMS4wNSAwIDEuOTc2LjE5MyAyLjc3Ni41NzkuOC4zODYgMS40MTcuOTI5IDEuODUgMS42My40MzIuNy42NDggMS41MS42NDggMi40MzIgMCAuOTIyLS4yMiAxLjc1LS42NiAyLjQ2LS40MzkuNzEyLTEuMDY1IDEuMjYyLTEuODc1IDEuNjUxLS44MTEuMzktMS43NTMuNTg0LTIuODI1LjU4NGgtMy40M3Y1LjY3aC0yLjkyNlYxNi45OTJabTcuNTQgNi42M2MuMzY5LS4xODMuNjUzLS40NDQuODUzLS43ODMuMi0uMzQuMy0uNzM0LjMtMS4xODQgMC0uNDUtLjEtLjg1Mi0uMy0xLjE4NS0uMi0uMzMyLS40ODUtLjU5LS44NTItLjc3Mi0uMzY4LS4xODItLjc5OS0uMjczLTEuMjkyLS4yNzNoLTMuMzIzdjQuNDdoMy4zMjNjLjQ5MyAwIC45MjQtLjA5IDEuMjkyLS4yNzNabS0yLjYzIDEuNzYzaDMuMTk0TDI5LjAzIDMyaC0zLjM1NWwtMy43NzMtNi42MTRaTTMxLjYxMyAxNi45OTJoNS43MTNjMS40MjIgMCAyLjY5Ni4zMjEgMy44MjIuOTY1YTYuODgxIDYuODgxIDAgMCAxIDIuNjQxIDIuNjc0Yy42MzYgMS4xNC45NTQgMi40MjcuOTU0IDMuODY0IDAgMS40MzctLjMxOCAyLjcyNS0uOTUzIDMuODY1YTYuODkgNi44OSAwIDAgMS0yLjY0MiAyLjY3NGMtMS4xMjUuNjQzLTIuNC45NjQtMy44MjIuOTY0aC01LjcxM1YxNi45OTJabTguMDI4IDExLjg3NmMuNjcyLS40IDEuMTktLjk3MyAxLjU1NS0xLjcyLjM2NC0uNzQ3LjU0Ny0xLjYzLjU0Ny0yLjY1MyAwLTEuMDIzLS4xODMtMS45MDctLjU0Ny0yLjY1My0uMzY1LS43NDctLjg4My0xLjMyLTEuNTU1LTEuNzIxLS42NzItLjQtMS40NTQtLjYtMi4zNDctLjZoLTIuNzU1djkuOTQ3aDIuNzU1Yy44OTMgMCAxLjY3NS0uMiAyLjM0Ny0uNloiLz48L3N2Zz4=";
    const detectProvider_goland_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdvbGFuZF9zdmdfX2EiIHgxPSI2NC4zOTEiIHgyPSIzOS42MDciIHkxPSI1Ni4zMjkiIHkyPSIyLjg3NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjI0IiBzdG9wLWNvbG9yPSIjMDBEODg2Ii8+PHN0b3Agb2Zmc2V0PSIuNTEiIHN0b3AtY29sb3I9IiMwMDdERkUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZ29sYW5kX3N2Z19fYiIgeDE9IjU5LjY3NiIgeDI9IjEuMDgiIHkxPSI0LjA2NyIgeTI9IjYyLjY2MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjI3IiBzdG9wLWNvbG9yPSIjMDA3REZFIi8+PHN0b3Agb2Zmc2V0PSIuNyIgc3RvcC1jb2xvcj0iI0QyNDlGQyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9IiMwMEQ4ODYiIGQ9Ik00Ny41NSA1OGgxMi4yNTlhNC4xMjUgNC4xMjUgMCAwIDAgNC4xMjQtNC4xOWwtLjE3Ni0xMS4wNDRhNC4xMjUgNC4xMjUgMCAwIDAtMS40NC0zLjA2NkwyNC4xNTkgNi45OTNBNC4xMjYgNC4xMjYgMCAwIDAgMjEuNDc0IDZIMTAuMTI1QTQuMTI1IDQuMTI1IDAgMCAwIDYgMTAuMTI1djExLjAwM2MwIDEuMTkuNTE0IDIuMzIxIDEuNDA5IDMuMTA0TDQ0LjgzNCA1Ni45OEE0LjEyMyA0LjEyMyAwIDAgMCA0Ny41NSA1OFoiLz48cGF0aCBmaWxsPSJ1cmwoI2dvbGFuZF9zdmdfX2EpIiBkPSJNNDkuMDEzIDU4aDEwLjg2MkE0LjEyNSA0LjEyNSAwIDAgMCA2NCA1My44NzVWNDEuMzA5YzAtLjItLjAxNC0uNC0uMDQ0LS41OThMNTguNTA4IDMuNTI3QTQuMTI0IDQuMTI0IDAgMCAwIDU0LjQyNyAwSDM5LjAyOWE0LjEyNSA0LjEyNSAwIDAgMC00LjEyNSA0LjEyNmwuMDA1IDE4LjUwNWMwIC40MjUuMDY2Ljg0OC4xOTUgMS4yNTNsOS45NzkgMzEuMjQ2YTQuMTI2IDQuMTI2IDAgMCAwIDMuOTMgMi44N1oiLz48cGF0aCBmaWxsPSJ1cmwoI2dvbGFuZF9zdmdfX2IpIiBkPSJNNC4xMjUgNjRoMzQuMTI3YTQuMTI1IDQuMTI1IDAgMCAwIDMuOC0yLjUyTDU3Ljg1IDI0LjA1N2MuMjE5LS41MTguMzMtMS4wNzYuMzI0LTEuNjM4bC0uMTUtMTguMzI5QTQuMTI0IDQuMTI0IDAgMCAwIDUzLjkgMEgzNi4yMzRjLS44MDUgMC0xLjU5My4yMzYtMi4yNjYuNjc4TDEuODYgMjEuNzg3QTQuMTI1IDQuMTI1IDAgMCAwIDAgMjUuMjM0djM0LjY0MUE0LjEyNSA0LjEyNSAwIDAgMCA0LjEyNSA2NFoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNTIgMTJIMTJ2NDBoNDBWMTJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE5Ljc0OCAzMS4yNDJhNy4yODYgNy4yODYgMCAwIDEtMi43NDMtMi43ODZjLS42NjUtMS4xODMtLjk5Ny0yLjUwMy0uOTk3LTMuOTYxcy4zMzItMi43NzguOTk3LTMuOTYgMS41OC0yLjExMiAyLjc0My0yLjc4N2MxLjE2NS0uNjc1IDIuNDY1LTEuMDE0IDMuOTAyLTEuMDE0IDEuMTY1IDAgMi4yMzguMjA4IDMuMjIyLjYyMmE2LjkwOCA2LjkwOCAwIDAgMSAyLjQ4NiAxLjc0NyA2LjM2OCA2LjM2OCAwIDAgMSAxLjQyIDIuNTk0aC0zLjEzYTMuOTEzIDMuOTEzIDAgMCAwLS45MjYtMS4yMjhjLS4zOS0uMzQ2LS44NDUtLjYxNC0xLjM2Ny0uODAzcy0xLjA4My0uMjg0LTEuNjgzLS4yODRjLS44ODcgMC0xLjY4Ny4yMjEtMi40MDIuNjY0YTQuNjExIDQuNjExIDAgMCAwLTEuNjc3IDEuODI4Yy0uNDA0Ljc3NS0uNjA2IDEuNjQ5LS42MDYgMi42MnMuMjAyIDEuODQ2LjYwNiAyLjYyMWE0LjYwNiA0LjYwNiAwIDAgMCAxLjY3NyAxLjgyOGMuNzE1LjQ0MyAxLjUxNS42NjQgMi40MDIuNjY0LjgyMSAwIDEuNTY2LS4xNTQgMi4yMzUtLjQ2MS42NjgtLjMwNyAxLjE5OC0uNzMzIDEuNTkxLTEuMjc2YTMuMjk1IDMuMjk1IDAgMCAwIC42MzMtMS44MzNsLjAxLjMxaC0zLjUyNnYtMi4zMDRoNi4zNTd2MS4xOGMwIDEuMzIxLS4zMiAyLjUxNy0uOTYgMy41ODVhNi44ODUgNi44ODUgMCAwIDEtMi42MjYgMi41MjVjLTEuMTExLjYxNC0yLjM1Ni45MjEtMy43MzYuOTIxcy0yLjczNy0uMzM3LTMuOTAyLTEuMDEzdi4wMDJaTTM2LjI3MSAzMS4yNDJhNy4zMiA3LjMyIDAgMCAxLTIuNzU1LTIuNzg2Yy0uNjY4LTEuMTgzLTEuMDAyLTIuNTAzLTEuMDAyLTMuOTYxcy4zMzMtMi43NzggMS4wMDItMy45NmE3LjMxNCA3LjMxNCAwIDAgMSAyLjc1NS0yLjc4N2MxLjE2OC0uNjc1IDIuNDc0LTEuMDE0IDMuOTE4LTEuMDE0IDEuNDQzIDAgMi43MzguMzM4IDMuOTA3IDEuMDEzYTcuMjc5IDcuMjc5IDAgMCAxIDIuNzQ5IDIuNzg3Yy42NjQgMS4xODMuOTk3IDIuNTAzLjk5NyAzLjk2MXMtLjMzMyAyLjc3OC0uOTk3IDMuOTYtMS41ODEgMi4xMTMtMi43NSAyLjc4OGMtMS4xNjguNjc1LTIuNDcgMS4wMTMtMy45MDYgMS4wMTMtMS40MzcgMC0yLjc1LS4zMzgtMy45MTgtMS4wMTNabTYuMzA4LTIuMjI5Yy43MDgtLjQ0NiAxLjI2Mi0xLjA2NSAxLjY2Mi0xLjg1NC40LS43OS42LTEuNjc4LjYtMi42NjQgMC0uOTg2LS4yLTEuODc0LS42LTIuNjY0LS40LS43OS0uOTU0LTEuNDA3LTEuNjYyLTEuODU0LS43MDctLjQ0Ni0xLjUwNC0uNjctMi4zOS0uNjctLjg4NSAwLTEuNjg1LjIyMy0yLjM5NS42N2E0LjYyIDQuNjIgMCAwIDAtMS42NzIgMS44NTRjLS40MDQuNzktLjYwNiAxLjY3OC0uNjA2IDIuNjY0IDAgLjk4Ni4yMDIgMS44NzQuNjA2IDIuNjY0LjQwNC43OS45NjEgMS40MDggMS42NzIgMS44NTQuNzEuNDQ3IDEuNTEuNjcgMi4zOTUuNjcuODg3IDAgMS42ODMtLjIyMyAyLjM5LS42N1pNMzMgNDRIMTd2M2gxNnYtM1oiLz48L3N2Zz4=";
    const detectProvider_rustrover_namespaceObject = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InJ1c3Ryb3Zlcl9zdmdfX2EiIHgxPSI3LjY3MSIgeDI9IjYxLjEyNSIgeTE9IjY0LjM5MyIgeTI9IjM5LjYwOSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjA4IiBzdG9wLWNvbG9yPSIjMDBEODg2Ii8+PHN0b3Agb2Zmc2V0PSIuNDYiIHN0b3AtY29sb3I9IiNGRkFCMDAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icnVzdHJvdmVyX3N2Z19fYiIgeDE9IjU5LjkzMiIgeDI9IjEuMzM2IiB5MT0iNTkuNjc2IiB5Mj0iMS4wOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjE5IiBzdG9wLWNvbG9yPSIjRkZBQjAwIi8+PHN0b3Agb2Zmc2V0PSIuODMiIHN0b3AtY29sb3I9IiNGRjAwNEMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSIjMDBEODg2IiBkPSJNNiA0Ny41NXYxMi4yNThhNC4xMjUgNC4xMjUgMCAwIDAgNC4xOSA0LjEyNGwxMS4wNDQtLjE3NmE0LjEyNCA0LjEyNCAwIDAgMCAzLjA2Ni0xLjQ0bDMyLjcwNy0zOC4xNThjLjY0LS43NDcuOTkzLTEuNy45OTMtMi42ODRWMTAuMTI1QTQuMTI1IDQuMTI1IDAgMCAwIDUzLjg3NSA2SDQyLjg3MmMtMS4xOSAwLTIuMzIxLjUxNC0zLjEwNSAxLjQwOUw3LjAyMSA0NC44MzNBNC4xMjQgNC4xMjQgMCAwIDAgNiA0Ny41NVoiLz48cGF0aCBmaWxsPSJ1cmwoI3J1c3Ryb3Zlcl9zdmdfX2EpIiBkPSJNNiA0OS4wMTV2MTAuODYyYTQuMTI1IDQuMTI1IDAgMCAwIDQuMTI1IDQuMTI1aDEyLjU2NmMuMiAwIC40LS4wMTQuNTk4LS4wNDRsMzcuMTg1LTUuNDQ4QTQuMTI1IDQuMTI1IDAgMCAwIDY0IDU0LjQyOVYzOS4wM2E0LjEyNSA0LjEyNSAwIDAgMC00LjEyNy00LjEyNWwtMTguNTA0LjAwNWMtLjQyNiAwLS44NDkuMDY2LTEuMjU0LjE5NUw4Ljg3MSA0NS4wODVBNC4xMjYgNC4xMjYgMCAwIDAgNiA0OS4wMTVINloiLz48cGF0aCBmaWxsPSJ1cmwoI3J1c3Ryb3Zlcl9zdmdfX2IpIiBkPSJNMCA0LjEyNXYzNC4xMjdjMCAxLjY1OS45OTMgMy4xNTUgMi41MiAzLjhMMzkuOTQzIDU3Ljg1Yy41MTguMjE5IDEuMDc1LjMzIDEuNjM4LjMyNGwxOC4zMjktLjE1QTQuMTI1IDQuMTI1IDAgMCAwIDY0IDUzLjlWMzYuMjM0YzAtLjgwNi0uMjM2LTEuNTkzLS42NzgtMi4yNjdMNDIuMjEzIDEuODZBNC4xMjUgNC4xMjUgMCAwIDAgMzguNzY2IDBINC4xMjVBNC4xMjUgNC4xMjUgMCAwIDAgMCA0LjEyNVoiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNTIgMTJIMTJ2NDBoNDBWMTJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMzIDQ0SDE3djNoMTZ2LTNaTTE2Ljk5MiAxNi45OTJoNi40NDJjMS4wNSAwIDEuOTc2LjE5MyAyLjc3Ni41NzkuOC4zODYgMS40MTcuOTI5IDEuODUgMS42My40MzIuNy42NDggMS41MS42NDggMi40MzIgMCAuOTIyLS4yMiAxLjc1LS42NiAyLjQ2LS40MzkuNzEyLTEuMDY1IDEuMjYyLTEuODc1IDEuNjUxLS44MTEuMzktMS43NTMuNTg0LTIuODI1LjU4NGgtMy40M3Y1LjY3aC0yLjkyNlYxNi45OTJabTcuNTQgNi42M2MuMzY5LS4xODMuNjUzLS40NDQuODUzLS43ODMuMi0uMzQuMy0uNzM0LjMtMS4xODQgMC0uNDUtLjEtLjg1Mi0uMy0xLjE4NS0uMi0uMzMyLS40ODUtLjU5LS44NTItLjc3Mi0uMzY4LS4xODItLjc5OS0uMjczLTEuMjkyLS4yNzNoLTMuMzIzdjQuNDdoMy4zMjNjLjQ5MyAwIC45MjQtLjA5IDEuMjkyLS4yNzNabS0yLjYzIDEuNzYzaDMuMTk0TDI5LjAzIDMyaC0zLjM1NWwtMy43NzMtNi42MTRaTTMxLjYxMyAxNi45OTJoNi40NDJjMS4wNSAwIDEuOTc2LjE5MyAyLjc3Ni41NzkuOC4zODYgMS40MTcuOTI5IDEuODUgMS42My40MzIuNy42NDggMS41MS42NDggMi40MzIgMCAuOTIyLS4yMiAxLjc1LS42NiAyLjQ2LS40MzkuNzEyLTEuMDY0IDEuMjYyLTEuODc1IDEuNjUxLS44MTEuMzktMS43NTMuNTg0LTIuODI0LjU4NGgtMy40M3Y1LjY3aC0yLjkyN1YxNi45OTJabTcuNTQgNi42M2MuMzY5LS4xODMuNjUzLS40NDQuODUzLS43ODMuMi0uMzQuMy0uNzM0LjMtMS4xODQgMC0uNDUtLjEtLjg1Mi0uMy0xLjE4NS0uMi0uMzMyLS40ODUtLjU5LS44NTItLjc3Mi0uMzY4LS4xODItLjc5OS0uMjczLTEuMjkyLS4yNzNoLTMuMzIzdjQuNDdoMy4zMjNjLjQ5MyAwIC45MjQtLjA5IDEuMjkyLS4yNzNabS0yLjYzIDEuNzYzaDMuMTk0TDQzLjY1MSAzMmgtMy4zNTVsLTMuNzczLTYuNjE0WiIvPjwvc3ZnPg==";
    class detectProvider_Tool {
      #name;
      #tag;
      #icon;
      constructor(name, tag, icon) {
        this.#name = name;
        this.#tag = tag;
        this.#icon = icon;
      }
      get name() {
        return this.#name;
      }
      get tag() {
        return this.#tag;
      }
      get icon() {
        return this.#icon;
      }
      toJSON() {
        return {
          name: this.name,
          tag: this.tag,
          icon: this.icon
        };
      }
      static Default=new detectProvider_Tool("IntelliJ IDEA", "idea", detectProvider_intellij_idea_namespaceObject);
    }
    const detectProvider_idea = detectProvider_Tool.Default;
    const detectProvider_appcode = new detectProvider_Tool("AppCode", "appcode", detectProvider_appcode_namespaceObject);
    const detectProvider_clion = new detectProvider_Tool("CLion", "clion", detectProvider_clion_namespaceObject);
    const detectProvider_pycharm = new detectProvider_Tool("PyCharm", "pycharm", detectProvider_pycharm_namespaceObject);
    const detectProvider_phpstorm = new detectProvider_Tool("PhpStorm", "php-storm", detectProvider_phpstorm_namespaceObject);
    const detectProvider_rubymine = new detectProvider_Tool("RubyMine", "rubymine", detectProvider_rubymine_namespaceObject);
    const detectProvider_webstorm = new detectProvider_Tool("WebStorm", "web-storm", detectProvider_webstorm_namespaceObject);
    const detectProvider_rider = new detectProvider_Tool("Rider", "rd", detectProvider_rider_namespaceObject);
    const detectProvider_goland = new detectProvider_Tool("GoLand", "goland", detectProvider_goland_namespaceObject);
    const detectProvider_rustrover = new detectProvider_Tool("RustRover", "rustrover", detectProvider_rustrover_namespaceObject);
    const detectProvider_SUPPORTED_TOOLS = {
      idea: detectProvider_idea,
      appcode: detectProvider_appcode,
      clion: detectProvider_clion,
      pycharm: detectProvider_pycharm,
      phpstorm: detectProvider_phpstorm,
      rubymine: detectProvider_rubymine,
      webstorm: detectProvider_webstorm,
      rider: detectProvider_rider,
      goland: detectProvider_goland,
      rustrover: detectProvider_rustrover
    };
    class detectProvider_GitHubMetadata extends detectProvider_AbstractMetadata {
      constructor(rawMetadata) {
        super(rawMetadata);
      }
      get user() {
        return this._rawMetadata.user;
      }
      get repository() {
        return this._rawMetadata.repo;
      }
      get branch() {
        return this._rawMetadata.branch;
      }
      get projectUrl() {
        return this._rawMetadata.clone_url;
      }
      get languagesUrl() {
        return `${this._rawMetadata.api_url}/languages`;
      }
      get httpsCloneUrl() {
        return `${this.projectUrl}.git`;
      }
      get sshCloneUrl() {
        return `git@${this._rawMetadata.host}:${this.user}/${this.repository}.git`;
      }
    }
    const detectProvider_fetchMetadata = (isEnterprise = false) => {
      const rawMetadata = detectProvider_commonjs(window.location.toString(), {
        enterprise: isEnterprise
      });
      return rawMetadata ? new detectProvider_GitHubMetadata(rawMetadata) : null;
    };
    const detectProvider_getToolsForLanguages = languages => {
      const selectedToolsSet = languages.reduce(((acc, language) => {
        if (language.isRelevant) detectProvider_getToolsByLanguage(language).forEach((tool => {
          acc.add(tool);
        }));
        return acc;
      }), new Set);
      if (selectedToolsSet.size === 0) detectProvider_getToolsByLanguage(detectProvider_Language.Default).forEach((tool => {
        selectedToolsSet.add(tool);
      }));
      return Array.from(selectedToolsSet).sort(((a, b) => a.name.localeCompare(b.name)));
    };
    const detectProvider_getToolsByLanguage = language => detectProvider_TOOLS_BY_LANGUAGE[language.standardizedName] ?? [];
    const detectProvider_TOOLS_BY_LANGUAGE = {
      [detectProvider_DEFAULT_LANGUAGE]: [ detectProvider_SUPPORTED_TOOLS.idea ],
      kotlin: [ detectProvider_SUPPORTED_TOOLS.idea ],
      groovy: [ detectProvider_SUPPORTED_TOOLS.idea ],
      scala: [ detectProvider_SUPPORTED_TOOLS.idea ],
      javascript: [ detectProvider_SUPPORTED_TOOLS.webstorm, detectProvider_SUPPORTED_TOOLS.phpstorm, detectProvider_SUPPORTED_TOOLS.idea ],
      coffeescript: [ detectProvider_SUPPORTED_TOOLS.webstorm, detectProvider_SUPPORTED_TOOLS.phpstorm, detectProvider_SUPPORTED_TOOLS.idea ],
      typescript: [ detectProvider_SUPPORTED_TOOLS.webstorm, detectProvider_SUPPORTED_TOOLS.phpstorm, detectProvider_SUPPORTED_TOOLS.idea ],
      dart: [ detectProvider_SUPPORTED_TOOLS.webstorm, detectProvider_SUPPORTED_TOOLS.phpstorm, detectProvider_SUPPORTED_TOOLS.idea ],
      css: [ detectProvider_SUPPORTED_TOOLS.webstorm, detectProvider_SUPPORTED_TOOLS.phpstorm, detectProvider_SUPPORTED_TOOLS.idea ],
      html: [ detectProvider_SUPPORTED_TOOLS.webstorm, detectProvider_SUPPORTED_TOOLS.phpstorm, detectProvider_SUPPORTED_TOOLS.idea ],
      go: [ detectProvider_SUPPORTED_TOOLS.goland, detectProvider_SUPPORTED_TOOLS.idea ],
      php: [ detectProvider_SUPPORTED_TOOLS.phpstorm, detectProvider_SUPPORTED_TOOLS.idea ],
      python: [ detectProvider_SUPPORTED_TOOLS.pycharm, detectProvider_SUPPORTED_TOOLS.idea ],
      "jupyter notebook": [ detectProvider_SUPPORTED_TOOLS.pycharm, detectProvider_SUPPORTED_TOOLS.idea ],
      "c#": [ detectProvider_SUPPORTED_TOOLS.rider ],
      "f#": [ detectProvider_SUPPORTED_TOOLS.rider ],
      "c++": [ detectProvider_SUPPORTED_TOOLS.clion ],
      c: [ detectProvider_SUPPORTED_TOOLS.clion ],
      ruby: [ detectProvider_SUPPORTED_TOOLS.rubymine, detectProvider_SUPPORTED_TOOLS.idea ],
      rust: [ detectProvider_SUPPORTED_TOOLS.rustrover, detectProvider_SUPPORTED_TOOLS.clion, detectProvider_SUPPORTED_TOOLS.idea ],
      puppet: [ detectProvider_SUPPORTED_TOOLS.rubymine, detectProvider_SUPPORTED_TOOLS.idea ],
      "objective-c": [ detectProvider_SUPPORTED_TOOLS.appcode ],
      swift: [ detectProvider_SUPPORTED_TOOLS.appcode ]
    };
    const detectProvider_convertNumberToIndex = number => {
      const normalizedNumber = Number.isInteger(number) ? number : 1;
      return normalizedNumber - 1;
    };
    const detectProvider_parseLineNumber = lineNumber => {
      const parsedValue = Number.parseInt(lineNumber, 10);
      return isNaN(parsedValue) ? 1 : parsedValue;
    };
    const detectProvider_setPageTestId = () => {
      document.documentElement.setAttribute("data-testid", "toolboxified-page");
    };
    const detectProvider_fetchTools = async metadata => {
      const languages = await detectProvider_fetchLanguages(metadata);
      return detectProvider_getToolsForLanguages(languages);
    };
    const detectProvider_fetchLanguages = async metadata => {
      try {
        const response = await fetch(metadata.languagesUrl);
        if (detectProvider_validateHttpResponse(response)) {
          const languagesObject = await detectProvider_parseHttpResponse(response);
          const totalBytes = Object.values(languagesObject).reduce(((total, bytes) => total + bytes), 0);
          return Object.entries(languagesObject).map((([name, bytes]) => new detectProvider_Language(name, bytes / totalBytes * detectProvider_HUNDRED_PERCENT)));
        } else return detectProvider_extractLanguagesFromPage(metadata);
      } catch (error) {
        return detectProvider_extractLanguagesFromPage(metadata);
      }
    };
    const detectProvider_validateHttpResponse = response => response.status >= detectProvider_MIN_VALID_HTTP_STATUS && response.status <= detectProvider_MAX_VALID_HTTP_STATUS;
    const detectProvider_parseHttpResponse = async response => {
      const result = await response.json();
      if (Object.keys(result).length > 0) return result; else throw new Error("Empty HTTP response");
    };
    const detectProvider_extractLanguagesFromPage = async metadata => {
      const defaultLanguages = [ detectProvider_Language.Default ];
      try {
        const response = await fetch(metadata.projectUrl);
        const htmlString = await response.text();
        const parser = new DOMParser;
        const htmlDocument = parser.parseFromString(htmlString, "text/html");
        const languageElements = htmlDocument.querySelectorAll(".repository-lang-stats-numbers .lang");
        if (languageElements.length === 0) {
          const newLanguageElements = htmlDocument.querySelectorAll('[data-ga-click="Repository, language stats search click, location:repo overview"]');
          if (newLanguageElements.length > 0) {
            const allLanguages = Array.from(newLanguageElements).map((el => {
              const langEl = el.querySelector("span");
              const percentEl = langEl.nextElementSibling;
              return new detectProvider_Language(langEl.textContent.trim(), percentEl ? parseFloat(percentEl.textContent.trim()) : detectProvider_HUNDRED_PERCENT);
            }));
            return allLanguages.length > 0 ? allLanguages : defaultLanguages;
          } else return defaultLanguages;
        } else {
          const allLanguages = Array.from(languageElements).map((el => {
            const percentEl = el.nextElementSibling;
            return new detectProvider_Language(el.textContent.trim(), percentEl ? parseFloat(percentEl.textContent.trim()) : detectProvider_HUNDRED_PERCENT);
          }));
          return allLanguages.length > 0 ? allLanguages : defaultLanguages;
        }
      } catch (error) {
        return defaultLanguages;
      }
    };
    const detectProvider_MIN_VALID_HTTP_STATUS = 200;
    const detectProvider_MAX_VALID_HTTP_STATUS = 299;
    const detectProvider_getToolboxCloneUrl = (toolTag, cloneUrl) => `jetbrains://${toolTag}/checkout/git?checkout.repo=${cloneUrl}&idea.required.plugins.id=Git4Idea`;
    const detectProvider_getToolboxNavigateUrl = (toolTag, project, filePath, lineNumber = null) => {
      const lineIndex = detectProvider_convertNumberToIndex(lineNumber == null ? 1 : lineNumber);
      const columnIndex = detectProvider_convertNumberToIndex(1);
      const encodedToolTag = encodeURIComponent(toolTag);
      const encodedProject = encodeURIComponent(project);
      return `jetbrains://${encodedToolTag}/navigate/reference?project=${encodedProject}&path=${filePath}:${lineIndex}:${columnIndex}`;
    };
    const detectProvider_callToolbox = action => {
      const fakeAction = document.createElement("a");
      fakeAction.style.position = "absolute";
      fakeAction.style.left = "-9999em";
      fakeAction.href = action;
      document.body.appendChild(fakeAction);
      fakeAction.click();
      document.body.removeChild(fakeAction);
    };
    const detectProvider_initAction = async (metadata, tools) => {
      chrome.runtime.onMessage.addListener(((message, sender, sendResponse) => {
        switch (message.type) {
         case "get-tools":
          sendResponse(tools.map((tool => tool.toJSON())));
          return true;

         case "perform-action":
          const toolboxAction = detectProvider_getToolboxCloneUrl(message.toolTag, message.cloneUrl);
          detectProvider_callToolbox(toolboxAction);
          break;
        }
        return;
      }));
      await chrome.runtime.sendMessage({
        type: "enable-page-action",
        project: metadata.repositoryDisplayName,
        https: metadata.httpsCloneUrl,
        ssh: metadata.sshCloneUrl
      });
    };
    function detectProvider_SelectorSet() {
      if (!(this instanceof detectProvider_SelectorSet)) return new detectProvider_SelectorSet;
      this.size = 0;
      this.uid = 0;
      this.selectors = [];
      this.selectorObjects = {};
      this.indexes = Object.create(this.indexes);
      this.activeIndexes = [];
    }
    var detectProvider_docElem = window.document.documentElement;
    var detectProvider_matches = detectProvider_docElem.matches || detectProvider_docElem.webkitMatchesSelector || detectProvider_docElem.mozMatchesSelector || detectProvider_docElem.oMatchesSelector || detectProvider_docElem.msMatchesSelector;
    detectProvider_SelectorSet.prototype.matchesSelector = function(el, selector) {
      return detectProvider_matches.call(el, selector);
    };
    detectProvider_SelectorSet.prototype.querySelectorAll = function(selectors, context) {
      return context.querySelectorAll(selectors);
    };
    detectProvider_SelectorSet.prototype.indexes = [];
    var detectProvider_idRe = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    detectProvider_SelectorSet.prototype.indexes.push({
      name: "ID",
      selector: function matchIdSelector(sel) {
        var m;
        if (m = sel.match(detectProvider_idRe)) return m[0].slice(1);
      },
      element: function getElementId(el) {
        if (el.id) return [ el.id ];
      }
    });
    var detectProvider_classRe = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    detectProvider_SelectorSet.prototype.indexes.push({
      name: "CLASS",
      selector: function matchClassSelector(sel) {
        var m;
        if (m = sel.match(detectProvider_classRe)) return m[0].slice(1);
      },
      element: function getElementClassNames(el) {
        var className = el.className;
        if (className) if (typeof className === "string") return className.split(/\s/); else if (typeof className === "object" && "baseVal" in className) return className.baseVal.split(/\s/);
      }
    });
    var detectProvider_tagRe = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    detectProvider_SelectorSet.prototype.indexes.push({
      name: "TAG",
      selector: function matchTagSelector(sel) {
        var m;
        if (m = sel.match(detectProvider_tagRe)) return m[0].toUpperCase();
      },
      element: function getElementTagName(el) {
        return [ el.nodeName.toUpperCase() ];
      }
    });
    detectProvider_SelectorSet.prototype.indexes["default"] = {
      name: "UNIVERSAL",
      selector: function() {
        return true;
      },
      element: function() {
        return [ true ];
      }
    };
    var detectProvider_Map;
    if (typeof window.Map === "function") detectProvider_Map = window.Map; else detectProvider_Map = function() {
      function Map() {
        this.map = {};
      }
      Map.prototype.get = function(key) {
        return this.map[key + " "];
      };
      Map.prototype.set = function(key, value) {
        this.map[key + " "] = value;
      };
      return Map;
    }();
    var detectProvider_chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
    function detectProvider_parseSelectorIndexes(allIndexes, selector) {
      allIndexes = allIndexes.slice(0).concat(allIndexes["default"]);
      var i, j, m, dup, key, index, allIndexesLen = allIndexes.length, rest = selector, indexes = [];
      do {
        detectProvider_chunker.exec("");
        if (m = detectProvider_chunker.exec(rest)) {
          rest = m[3];
          if (m[2] || !rest) for (i = 0; i < allIndexesLen; i++) {
            index = allIndexes[i];
            if (key = index.selector(m[1])) {
              j = indexes.length;
              dup = false;
              while (j--) if (indexes[j].index === index && indexes[j].key === key) {
                dup = true;
                break;
              }
              if (!dup) indexes.push({
                index,
                key
              });
              break;
            }
          }
        }
      } while (m);
      return indexes;
    }
    function detectProvider_findByPrototype(ary, proto) {
      var i, len, item;
      for (i = 0, len = ary.length; i < len; i++) {
        item = ary[i];
        if (proto.isPrototypeOf(item)) return item;
      }
    }
    detectProvider_SelectorSet.prototype.logDefaultIndexUsed = function() {};
    detectProvider_SelectorSet.prototype.add = function(selector, data) {
      var obj, i, indexProto, key, index, objs, selectorIndexes, selectorIndex, indexes = this.activeIndexes, selectors = this.selectors, selectorObjects = this.selectorObjects;
      if (typeof selector !== "string") return;
      obj = {
        id: this.uid++,
        selector,
        data
      };
      selectorObjects[obj.id] = obj;
      selectorIndexes = detectProvider_parseSelectorIndexes(this.indexes, selector);
      for (i = 0; i < selectorIndexes.length; i++) {
        selectorIndex = selectorIndexes[i];
        key = selectorIndex.key;
        indexProto = selectorIndex.index;
        index = detectProvider_findByPrototype(indexes, indexProto);
        if (!index) {
          index = Object.create(indexProto);
          index.map = new detectProvider_Map;
          indexes.push(index);
        }
        if (indexProto === this.indexes["default"]) this.logDefaultIndexUsed(obj);
        objs = index.map.get(key);
        if (!objs) {
          objs = [];
          index.map.set(key, objs);
        }
        objs.push(obj);
      }
      this.size++;
      selectors.push(selector);
    };
    detectProvider_SelectorSet.prototype.remove = function(selector, data) {
      if (typeof selector !== "string") return;
      var selectorIndexes, selectorIndex, i, j, k, selIndex, objs, obj, indexes = this.activeIndexes, selectors = this.selectors = [], selectorObjects = this.selectorObjects, removedIds = {}, removeAll = arguments.length === 1;
      selectorIndexes = detectProvider_parseSelectorIndexes(this.indexes, selector);
      for (i = 0; i < selectorIndexes.length; i++) {
        selectorIndex = selectorIndexes[i];
        j = indexes.length;
        while (j--) {
          selIndex = indexes[j];
          if (selectorIndex.index.isPrototypeOf(selIndex)) {
            objs = selIndex.map.get(selectorIndex.key);
            if (objs) {
              k = objs.length;
              while (k--) {
                obj = objs[k];
                if (obj.selector === selector && (removeAll || obj.data === data)) {
                  objs.splice(k, 1);
                  removedIds[obj.id] = true;
                }
              }
            }
            break;
          }
        }
      }
      for (i in removedIds) {
        delete selectorObjects[i];
        this.size--;
      }
      for (i in selectorObjects) selectors.push(selectorObjects[i].selector);
    };
    function detectProvider_sortById(a, b) {
      return a.id - b.id;
    }
    detectProvider_SelectorSet.prototype.queryAll = function(context) {
      if (!this.selectors.length) return [];
      var matches = {}, results = [];
      var els = this.querySelectorAll(this.selectors.join(", "), context);
      var i, j, len, len2, el, m, match, obj;
      for (i = 0, len = els.length; i < len; i++) {
        el = els[i];
        m = this.matches(el);
        for (j = 0, len2 = m.length; j < len2; j++) {
          obj = m[j];
          if (!matches[obj.id]) {
            match = {
              id: obj.id,
              selector: obj.selector,
              data: obj.data,
              elements: []
            };
            matches[obj.id] = match;
            results.push(match);
          } else match = matches[obj.id];
          match.elements.push(el);
        }
      }
      return results.sort(detectProvider_sortById);
    };
    detectProvider_SelectorSet.prototype.matches = function(el) {
      if (!el) return [];
      var i, j, k, len, len2, len3, index, keys, objs, obj, id;
      var indexes = this.activeIndexes, matchedIds = {}, matches = [];
      for (i = 0, len = indexes.length; i < len; i++) {
        index = indexes[i];
        keys = index.element(el);
        if (keys) for (j = 0, len2 = keys.length; j < len2; j++) if (objs = index.map.get(keys[j])) for (k = 0, 
        len3 = objs.length; k < len3; k++) {
          obj = objs[k];
          id = obj.id;
          if (!matchedIds[id] && this.matchesSelector(el, obj.selector)) {
            matchedIds[id] = true;
            matches.push(obj);
          }
        }
      }
      return matches.sort(detectProvider_sortById);
    };
    var detectProvider_el = null;
    var detectProvider_observer = null;
    var detectProvider_queue = [];
    function detectProvider_scheduleBatch(document, callback) {
      var calls = [];
      function processBatchQueue() {
        var callsCopy = calls;
        calls = [];
        callback(callsCopy);
      }
      function scheduleBatchQueue() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
        calls.push(args);
        if (calls.length === 1) detectProvider_scheduleMacroTask(document, processBatchQueue);
      }
      return scheduleBatchQueue;
    }
    function detectProvider_scheduleMacroTask(document, callback) {
      if (!detectProvider_observer) detectProvider_observer = new MutationObserver(detectProvider_handleMutations);
      if (!detectProvider_el) {
        detectProvider_el = document.createElement("div");
        detectProvider_observer.observe(detectProvider_el, {
          attributes: true
        });
      }
      detectProvider_queue.push(callback);
      detectProvider_el.setAttribute("data-twiddle", "" + Date.now());
    }
    function detectProvider_handleMutations() {
      var callbacks = detectProvider_queue;
      detectProvider_queue = [];
      for (var i = 0; i < callbacks.length; i++) try {
        callbacks[i]();
      } catch (error) {
        setTimeout((function() {
          throw error;
        }), 0);
      }
    }
    var detectProvider_initMap = new WeakMap;
    var detectProvider_initializerMap = new WeakMap;
    var detectProvider_subscriptionMap = new WeakMap;
    var detectProvider_addMap = new WeakMap;
    function detectProvider_applyChanges(selectorObserver, changes) {
      for (var i = 0; i < changes.length; i++) {
        var change = changes[i];
        var type = change[0];
        var el = change[1];
        var observer = change[2];
        if (type === detectProvider_ADD) {
          detectProvider_runInit(observer, el);
          detectProvider_runAdd(observer, el);
        } else if (type === detectProvider_REMOVE) detectProvider_runRemove(observer, el); else if (type === detectProvider_REMOVE_ALL) detectProvider_runRemoveAll(selectorObserver.observers, el);
      }
    }
    function detectProvider_runInit(observer, el) {
      if (!(el instanceof observer.elementConstructor)) return;
      var initIds = detectProvider_initMap.get(el);
      if (!initIds) {
        initIds = [];
        detectProvider_initMap.set(el, initIds);
      }
      if (initIds.indexOf(observer.id) === -1) {
        var initializer = void 0;
        if (observer.initialize) initializer = observer.initialize.call(void 0, el);
        if (initializer) {
          var initializers = detectProvider_initializerMap.get(el);
          if (!initializers) {
            initializers = {};
            detectProvider_initializerMap.set(el, initializers);
          }
          initializers["" + observer.id] = initializer;
        }
        initIds.push(observer.id);
      }
    }
    function detectProvider_runAdd(observer, el) {
      if (!(el instanceof observer.elementConstructor)) return;
      var addIds = detectProvider_addMap.get(el);
      if (!addIds) {
        addIds = [];
        detectProvider_addMap.set(el, addIds);
      }
      if (addIds.indexOf(observer.id) === -1) {
        observer.elements.push(el);
        var initializers = detectProvider_initializerMap.get(el);
        var initializer = initializers ? initializers["" + observer.id] : null;
        if (initializer && initializer.add) initializer.add.call(void 0, el);
        if (observer.subscribe) {
          var subscription = observer.subscribe.call(void 0, el);
          if (subscription) {
            var subscriptions = detectProvider_subscriptionMap.get(el);
            if (!subscriptions) {
              subscriptions = {};
              detectProvider_subscriptionMap.set(el, subscriptions);
            }
            subscriptions["" + observer.id] = subscription;
          }
        }
        if (observer.add) observer.add.call(void 0, el);
        addIds.push(observer.id);
      }
    }
    function detectProvider_runRemove(observer, el) {
      if (!(el instanceof observer.elementConstructor)) return;
      var addIds = detectProvider_addMap.get(el);
      if (!addIds) return;
      var index = observer.elements.indexOf(el);
      if (index !== -1) observer.elements.splice(index, 1);
      index = addIds.indexOf(observer.id);
      if (index !== -1) {
        var initializers = detectProvider_initializerMap.get(el);
        var initializer = initializers ? initializers["" + observer.id] : null;
        if (initializer) if (initializer.remove) initializer.remove.call(void 0, el);
        if (observer.subscribe) {
          var subscriptions = detectProvider_subscriptionMap.get(el);
          var subscription = subscriptions ? subscriptions["" + observer.id] : null;
          if (subscription && subscription.unsubscribe) subscription.unsubscribe();
        }
        if (observer.remove) observer.remove.call(void 0, el);
        addIds.splice(index, 1);
      }
      if (addIds.length === 0) detectProvider_addMap.delete(el);
    }
    function detectProvider_runRemoveAll(observers, el) {
      var addIds = detectProvider_addMap.get(el);
      if (!addIds) return;
      var ids = addIds.slice(0);
      for (var i = 0; i < ids.length; i++) {
        var observer = observers[ids[i]];
        if (!observer) continue;
        var index = observer.elements.indexOf(el);
        if (index !== -1) observer.elements.splice(index, 1);
        var initializers = detectProvider_initializerMap.get(el);
        var initializer = initializers ? initializers["" + observer.id] : null;
        if (initializer && initializer.remove) initializer.remove.call(void 0, el);
        var subscriptions = detectProvider_subscriptionMap.get(el);
        var subscription = subscriptions ? subscriptions["" + observer.id] : null;
        if (subscription && subscription.unsubscribe) subscription.unsubscribe();
        if (observer.remove) observer.remove.call(void 0, el);
      }
      detectProvider_addMap.delete(el);
    }
    var detectProvider_innerHTMLReplacementIsBuggy = null;
    function detectProvider_detectInnerHTMLReplacementBuggy(document) {
      if (detectProvider_innerHTMLReplacementIsBuggy === null) {
        var a = document.createElement("div");
        var b = document.createElement("div");
        var c = document.createElement("div");
        a.appendChild(b);
        b.appendChild(c);
        a.innerHTML = "";
        detectProvider_innerHTMLReplacementIsBuggy = c.parentNode !== b;
      }
      return detectProvider_innerHTMLReplacementIsBuggy;
    }
    function detectProvider_supportsSelectorMatching(node) {
      return "matches" in node || "webkitMatchesSelector" in node || "mozMatchesSelector" in node || "oMatchesSelector" in node || "msMatchesSelector" in node;
    }
    var detectProvider_ADD = 1;
    var detectProvider_REMOVE = 2;
    var detectProvider_REMOVE_ALL = 3;
    function detectProvider_handleMutations$1(selectorObserver, changes, mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        if (mutation.type === "childList") {
          detectProvider_addNodes(selectorObserver, changes, mutation.addedNodes);
          detectProvider_removeNodes(selectorObserver, changes, mutation.removedNodes);
        } else if (mutation.type === "attributes") detectProvider_revalidateObservers(selectorObserver, changes, mutation.target);
      }
      if (detectProvider_detectInnerHTMLReplacementBuggy(selectorObserver.ownerDocument)) detectProvider_revalidateOrphanedElements(selectorObserver, changes);
    }
    function detectProvider_addNodes(selectorObserver, changes, nodes) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (detectProvider_supportsSelectorMatching(node)) {
          var matches = selectorObserver.selectorSet.matches(node);
          for (var j = 0; j < matches.length; j++) {
            var data = matches[j].data;
            changes.push([ detectProvider_ADD, node, data ]);
          }
        }
        if ("querySelectorAll" in node) {
          var matches2 = selectorObserver.selectorSet.queryAll(node);
          for (var _j = 0; _j < matches2.length; _j++) {
            var _matches2$_j = matches2[_j], _data = _matches2$_j.data, elements = _matches2$_j.elements;
            for (var k = 0; k < elements.length; k++) changes.push([ detectProvider_ADD, elements[k], _data ]);
          }
        }
      }
    }
    function detectProvider_removeNodes(selectorObserver, changes, nodes) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ("querySelectorAll" in node) {
          changes.push([ detectProvider_REMOVE_ALL, node ]);
          var descendants = node.querySelectorAll("*");
          for (var j = 0; j < descendants.length; j++) changes.push([ detectProvider_REMOVE_ALL, descendants[j] ]);
        }
      }
    }
    function detectProvider_revalidateObservers(selectorObserver, changes, node) {
      if (detectProvider_supportsSelectorMatching(node)) {
        var matches = selectorObserver.selectorSet.matches(node);
        for (var i = 0; i < matches.length; i++) {
          var data = matches[i].data;
          changes.push([ detectProvider_ADD, node, data ]);
        }
      }
      if ("querySelectorAll" in node) {
        var ids = detectProvider_addMap.get(node);
        if (ids) for (var _i = 0; _i < ids.length; _i++) {
          var observer = selectorObserver.observers[ids[_i]];
          if (observer) if (!selectorObserver.selectorSet.matchesSelector(node, observer.selector)) changes.push([ detectProvider_REMOVE, node, observer ]);
        }
      }
    }
    function detectProvider_revalidateDescendantObservers(selectorObserver, changes, node) {
      if ("querySelectorAll" in node) {
        detectProvider_revalidateObservers(selectorObserver, changes, node);
        var descendants = node.querySelectorAll("*");
        for (var i = 0; i < descendants.length; i++) detectProvider_revalidateObservers(selectorObserver, changes, descendants[i]);
      }
    }
    function detectProvider_revalidateInputObservers(selectorObserver, changes, inputs) {
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var els = input.form ? input.form.elements : selectorObserver.rootNode.querySelectorAll("input");
        for (var j = 0; j < els.length; j++) detectProvider_revalidateObservers(selectorObserver, changes, els[j]);
      }
    }
    function detectProvider_revalidateOrphanedElements(selectorObserver, changes) {
      for (var i = 0; i < selectorObserver.observers.length; i++) {
        var observer = selectorObserver.observers[i];
        if (observer) {
          var elements = observer.elements;
          for (var j = 0; j < elements.length; j++) {
            var el = elements[j];
            if (!el.parentNode) changes.push([ detectProvider_REMOVE_ALL, el ]);
          }
        }
      }
    }
    function detectProvider_whenReady(document, callback) {
      var readyState = document.readyState;
      if (readyState === "interactive" || readyState === "complete") detectProvider_scheduleMacroTask(document, callback); else document.addEventListener("DOMContentLoaded", detectProvider_scheduleMacroTask(document, callback));
    }
    var detectProvider_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var detectProvider_uid = 0;
    function detectProvider_SelectorObserver(rootNode) {
      this.rootNode = rootNode.nodeType === 9 ? rootNode.documentElement : rootNode;
      this.ownerDocument = rootNode.nodeType === 9 ? rootNode : rootNode.ownerDocument;
      this.observers = [];
      this.selectorSet = new detectProvider_SelectorSet;
      this.mutationObserver = new MutationObserver(detectProvider_handleRootMutations.bind(this, this));
      this._scheduleAddRootNodes = detectProvider_scheduleBatch(this.ownerDocument, detectProvider_addRootNodes.bind(this, this));
      this._handleThrottledChangedTargets = detectProvider_scheduleBatch(this.ownerDocument, detectProvider_handleChangedTargets.bind(this, this));
      this.rootNode.addEventListener("change", detectProvider_handleChangeEvents.bind(this, this), false);
      detectProvider_whenReady(this.ownerDocument, detectProvider_onReady.bind(this, this));
    }
    detectProvider_SelectorObserver.prototype.disconnect = function() {
      this.mutationObserver.disconnect();
    };
    detectProvider_SelectorObserver.prototype.observe = function(a, b) {
      var handlers = void 0;
      if (typeof b === "function") handlers = {
        selector: a,
        initialize: b
      }; else if ((typeof b === "undefined" ? "undefined" : detectProvider_typeof(b)) === "object") {
        handlers = b;
        handlers.selector = a;
      } else handlers = a;
      var self = this;
      var observer = {
        id: detectProvider_uid++,
        selector: handlers.selector,
        initialize: handlers.initialize,
        add: handlers.add,
        remove: handlers.remove,
        subscribe: handlers.subscribe,
        elements: [],
        elementConstructor: handlers.hasOwnProperty("constructor") ? handlers.constructor : this.ownerDocument.defaultView.Element,
        abort: function abort() {
          self._abortObserving(observer);
        }
      };
      this.selectorSet.add(observer.selector, observer);
      this.observers[observer.id] = observer;
      this._scheduleAddRootNodes();
      return observer;
    };
    detectProvider_SelectorObserver.prototype._abortObserving = function(observer) {
      var elements = observer.elements;
      for (var i = 0; i < elements.length; i++) detectProvider_runRemove(observer, elements[i]);
      this.selectorSet.remove(observer.selector, observer);
      delete this.observers[observer.id];
    };
    detectProvider_SelectorObserver.prototype.triggerObservers = function(container) {
      var changes = [];
      detectProvider_revalidateDescendantObservers(this, changes, container);
      detectProvider_applyChanges(this, changes);
    };
    function detectProvider_onReady(selectorObserver) {
      selectorObserver.mutationObserver.observe(selectorObserver.rootNode, {
        childList: true,
        attributes: true,
        subtree: true
      });
      selectorObserver._scheduleAddRootNodes();
    }
    function detectProvider_addRootNodes(selectorObserver) {
      var changes = [];
      detectProvider_addNodes(selectorObserver, changes, [ selectorObserver.rootNode ]);
      detectProvider_applyChanges(selectorObserver, changes);
    }
    function detectProvider_handleRootMutations(selectorObserver, mutations) {
      var changes = [];
      detectProvider_handleMutations$1(selectorObserver, changes, mutations);
      detectProvider_applyChanges(selectorObserver, changes);
    }
    function detectProvider_handleChangeEvents(selectorObserver, event) {
      selectorObserver._handleThrottledChangedTargets(event.target);
    }
    function detectProvider_handleChangedTargets(selectorObserver, inputs) {
      var changes = [];
      detectProvider_revalidateInputObservers(selectorObserver, changes, inputs);
      detectProvider_applyChanges(selectorObserver, changes);
    }
    var detectProvider_documentObserver = void 0;
    function detectProvider_getDocumentObserver() {
      if (!detectProvider_documentObserver) detectProvider_documentObserver = new detectProvider_SelectorObserver(window.document);
      return detectProvider_documentObserver;
    }
    function detectProvider_observe() {
      var _getDocumentObserver;
      return (_getDocumentObserver = detectProvider_getDocumentObserver()).observe.apply(_getDocumentObserver, arguments);
    }
    class detectProvider_DomObserver {
      #selector;
      #observer=null;
      constructor(selector) {
        this.#selector = selector;
      }
      get isObserving() {
        return this.#observer !== null;
      }
      start(onAddElement, onRemoveElement, onInitializeElement) {
        if (this.isObserving) return;
        this.#observer = detectProvider_observe(this.#selector, {
          add: onAddElement,
          remove: onRemoveElement,
          initialize: onInitializeElement
        });
      }
      stop() {
        if (!this.isObserving) return;
        this.#observer.abort();
        this.#observer = null;
      }
    }
    const detectProvider_observeBlobPage = (metadata, tools) => {
      const openWithMenuObserver = new detectProvider_DomObserver("#__primerPortalRoot__ ul[aria-label='Open with...']");
      openWithMenuObserver.start((openWithMenu => {
        const lastMenuItem = openWithMenu.lastChild;
        const openMenuItems = detectProvider_createOpenMenuItems(metadata, tools);
        openMenuItems.forEach((openMenuItem => {
          lastMenuItem.insertAdjacentElement("beforebegin", openMenuItem);
        }));
      }));
      const highlightedLineMenuObserver = new detectProvider_DomObserver("#__primerPortalRoot__ ul[data-testid='highlighted-line-menu']");
      highlightedLineMenuObserver.start((highlightedLineMenu => {
        const viewFileInDifferentBranchMenuItem = highlightedLineMenu.lastElementChild;
        const viewFileInGitHubDevMenuItem = viewFileInDifferentBranchMenuItem.previousElementSibling;
        const targetMenuItem = viewFileInGitHubDevMenuItem.textContent.trim() === "View file in GitHub.dev" ? viewFileInGitHubDevMenuItem : viewFileInDifferentBranchMenuItem;
        const highlightedLineMenuItems = detectProvider_createHighlightedLineMenuItems(metadata, tools);
        highlightedLineMenuItems.forEach((highlightedLineMenuItem => {
          targetMenuItem.insertAdjacentElement("beforebegin", highlightedLineMenuItem);
        }));
      }));
    };
    const detectProvider_createOpenMenuItems = (metadata, tools) => tools.map((tool => detectProvider_createOpenMenuItem(metadata, tool)));
    const detectProvider_createOpenMenuItem = (metadata, tool) => {
      const menuItem = document.createElement("li");
      menuItem.classList.add("open-menu-item");
      menuItem.dataset.testid = "open-menu-item";
      const menuItemLink = document.createElement("a");
      menuItemLink.classList.add("open-menu-item-link");
      menuItemLink.href = "#";
      menuItemLink.addEventListener("click", (event => {
        event.preventDefault();
        const {user, repository, branch} = metadata;
        const normalizedBranch = branch.split("/").shift();
        const filePath = location.pathname.replace(`/${user}/${repository}/blob/${normalizedBranch}/`, "");
        detectProvider_callToolbox(detectProvider_getToolboxNavigateUrl(tool.tag, repository, filePath));
      }));
      const menuItemDiv = document.createElement("div");
      menuItemDiv.classList.add("open-menu-item-div");
      const menuItemSpan = document.createElement("span");
      menuItemSpan.classList.add("open-menu-item-span");
      menuItemSpan.textContent = tool.name;
      menuItemDiv.appendChild(menuItemSpan);
      menuItemLink.appendChild(menuItemDiv);
      menuItem.appendChild(menuItemLink);
      return menuItem;
    };
    const detectProvider_createHighlightedLineMenuItems = (metadata, tools) => tools.map((tool => detectProvider_createHighlightedLineMenuItem(metadata, tool)));
    const detectProvider_createHighlightedLineMenuItem = (metadata, tool) => {
      const menuItem = document.createElement("li");
      menuItem.classList.add("highlighted-line-menu-item");
      menuItem.dataset.testid = "highlighted-line-menu-item";
      const menuItemLink = document.createElement("a");
      menuItemLink.classList.add("highlighted-line-menu-item-link");
      menuItemLink.href = "#";
      menuItemLink.textContent = `View file in ${tool.name}`;
      menuItemLink.addEventListener("click", (event => {
        event.preventDefault();
        const {user, repository, branch} = metadata;
        const normalizedBranch = branch.split("/").shift();
        const filePath = location.pathname.replace(`/${user}/${repository}/blob/${normalizedBranch}/`, "");
        const lineNumber = detectProvider_parseLineNumber(location.hash.replace("#L", ""));
        detectProvider_callToolbox(detectProvider_getToolboxNavigateUrl(tool.tag, repository, filePath, lineNumber));
      }));
      menuItem.appendChild(menuItemLink);
      return menuItem;
    };
    const detectProvider_PROTOCOLS = {
      HTTPS: "HTTPS",
      SSH: "SSH"
    };
    const detectProvider_observeIndexPage = (metadata, tools) => {
      const domObserver = new detectProvider_DomObserver("#clone-with-https, #clone-with-ssh");
      domObserver.start((input => {
        const isSsh = input.id === "clone-with-ssh";
        const grandparent = input.parentElement.parentElement;
        if (grandparent.nextElementSibling?.classList.contains("js-clone-menu")) grandparent.parentElement.removeChild(grandparent.nextElementSibling);
        const cloneMenu = detectProvider_createCloneMenu(metadata, tools, isSsh);
        grandparent.insertAdjacentElement("afterend", cloneMenu);
        chrome.runtime.sendMessage({
          type: "save-protocol",
          protocol: isSsh ? detectProvider_PROTOCOLS.SSH : detectProvider_PROTOCOLS.HTTPS
        });
      }));
    };
    const detectProvider_createCloneMenu = (metadata, tools, isSsh) => {
      const cloneMenu = document.createElement("ul");
      cloneMenu.classList.add("js-clone-menu");
      tools.forEach((tool => {
        const toolItem = detectProvider_createCloneMenuItem(metadata, tool, isSsh);
        cloneMenu.appendChild(toolItem);
      }));
      return cloneMenu;
    };
    const detectProvider_createCloneMenuItem = (metadata, tool, isSsh) => {
      const menuItem = document.createElement("li");
      menuItem.classList.add("clone-menu-item");
      menuItem.dataset.testid = "clone-menu-item";
      const iconContainer = document.createElement("span");
      iconContainer.classList.add("clone-menu-item-icon-container");
      const icon = document.createElement("img");
      icon.setAttribute("alt", tool.name);
      icon.setAttribute("src", tool.icon);
      icon.setAttribute("width", "16");
      icon.setAttribute("height", "16");
      iconContainer.appendChild(icon);
      menuItem.appendChild(iconContainer);
      const textContainer = document.createElement("span");
      textContainer.textContent = `Clone with ${tool.name} via ${isSsh ? "SSH" : "HTTPS"}`;
      menuItem.appendChild(textContainer);
      menuItem.addEventListener("click", (() => {
        const cloneUrl = isSsh ? metadata.sshCloneUrl : metadata.httpsCloneUrl;
        const action = detectProvider_getToolboxCloneUrl(tool.tag, cloneUrl);
        detectProvider_callToolbox(action);
      }));
      return menuItem;
    };
    async function detectProvider_toolboxify(isEnterprise = false) {
      const metadata = detectProvider_fetchMetadata(isEnterprise);
      if (!metadata) throw new Error("Failed to fetch metadata.");
      const tools = await detectProvider_fetchTools(metadata);
      await detectProvider_initAction(metadata, tools);
      detectProvider_observeIndexPage(metadata, tools);
      detectProvider_observeBlobPage(metadata, tools);
      detectProvider_setPageTestId();
    }
    class detectProvider_GitLabMetadata extends detectProvider_AbstractMetadata {
      constructor(rawMetadata) {
        super(rawMetadata);
      }
      get repository() {
        return this._rawMetadata.path;
      }
      get branch() {
        return this._rawMetadata.default_branch;
      }
      get languagesUrl() {
        return `${location.origin}/api/v4/projects/${this._rawMetadata.id}/languages`;
      }
      get httpsCloneUrl() {
        return this._rawMetadata.http_url_to_repo;
      }
      get sshCloneUrl() {
        return this._rawMetadata.ssh_url_to_repo;
      }
    }
    const detectProvider_fetchMetadata_fetchMetadata = async (isEnterprise = false) => {
      const projectId = await detectProvider_getProjectId();
      const response = await fetch(`${location.origin}/api/v4/projects/${projectId}`);
      const rawMetadata = await response.json();
      return new detectProvider_GitLabMetadata(rawMetadata);
    };
    const detectProvider_getProjectId = async () => {
      let projectId = detectProvider_extractProjectIdFromPage(document);
      if (projectId) return projectId;
      const {findFile, project} = document.body.dataset;
      if (findFile && project) {
        const [repoPath] = findFile.split("/-/find_file/");
        const repoUrl = `${location.origin}${repoPath}`;
        const response = await fetch(repoUrl);
        const htmlString = await response.text();
        const parser = new DOMParser;
        const htmlDocument = parser.parseFromString(htmlString, "text/html");
        projectId = detectProvider_extractProjectIdFromPage(htmlDocument);
        if (projectId) return projectId;
      }
      throw new Error("Project ID not found in the page");
    };
    const detectProvider_extractProjectIdFromPage = () => {
      const dataProjectId = document.body.dataset.projectId;
      if (dataProjectId) return dataProjectId;
      const homePanelMetadataElement = document.querySelector(".home-panel-metadata") || {
        children: []
      };
      const projectIdElement = Array.prototype.find.call(homePanelMetadataElement.children, (c => c.textContent.includes("Project ID")));
      return projectIdElement ? projectIdElement.textContent.replace("Project ID:", "").trim() : null;
    };
    const detectProvider_fetchTools_fetchTools = async metadata => {
      const languages = await detectProvider_fetchTools_fetchLanguages(metadata);
      return detectProvider_getToolsForLanguages(languages);
    };
    const detectProvider_fetchTools_fetchLanguages = async metadata => {
      try {
        const response = await fetch(metadata.languagesUrl);
        const languagesObject = await response.json();
        const languages = Object.entries(languagesObject).map((([name, percentage]) => new detectProvider_Language(name, percentage)));
        if (languages.length === 0) languages.push(detectProvider_Language.Default);
        return languages;
      } catch (error) {
        console.error("Failed to fetch languages", error);
        return [ detectProvider_Language.Default ];
      }
    };
    const detectProvider_observeBlobPage_observeBlobPage = (metadata, tools) => {
      const domObserver = new detectProvider_DomObserver("#fileHolder");
      domObserver.start((el => {
        const lastButtonsGroup = el.querySelector(".file-actions > .btn-group:last-child");
        if (lastButtonsGroup) {
          const openButtonsGroup = document.createElement("div");
          openButtonsGroup.classList.add("btn-group");
          openButtonsGroup.dataset.testid = "open-buttons-group";
          openButtonsGroup.setAttribute("role", "group");
          const copyFilePathButton = el.querySelector('.file-header-content button[id^="clipboard-button"]');
          if (copyFilePathButton) try {
            const {text: filePath} = JSON.parse(copyFilePathButton.dataset.clipboardText);
            if (filePath) {
              tools.forEach((tool => {
                const action = detectProvider_createOpenButton(tool, metadata, filePath);
                openButtonsGroup.appendChild(action);
              }));
              lastButtonsGroup.insertAdjacentElement("beforebegin", openButtonsGroup);
            }
          } catch {}
        }
      }));
    };
    const detectProvider_createOpenButton = (tool, metadata, filePath) => {
      const button = document.createElement("button");
      button.setAttribute("class", "btn btn-default btn-md gl-button btn-icon");
      button.setAttribute("type", "button");
      button.setAttribute("aria-label", `Open in ${tool.name}`);
      button.setAttribute("aria-describedby", detectProvider_createTooltip(tool).id);
      button.dataset.testid = "toolbox-open-button";
      button.dataset.filePath = filePath;
      const buttonIcon = document.createElement("img");
      buttonIcon.setAttribute("alt", tool.name);
      buttonIcon.setAttribute("src", tool.icon);
      buttonIcon.setAttribute("class", "gl-button-icon gl-icon s16 gl-fill-current");
      button.appendChild(buttonIcon);
      detectProvider_addClickEventHandler(button, tool, metadata);
      detectProvider_addHoverEventHandler(button);
      return button;
    };
    const detectProvider_createTooltip = tool => {
      const tooltip = document.createElement("div");
      tooltip.id = `toolbox-tooltip-${tool.tag}`;
      tooltip.role = "tooltip";
      tooltip.tabIndex = -1;
      tooltip.dataset.testid = "toolbox-open-button-tooltip";
      tooltip.setAttribute("class", "tooltip b-tooltip bs-tooltip-top gl-tooltip fade");
      tooltip.style.position = "absolute";
      tooltip.style.display = "none";
      tooltip.style.willChange = "transform";
      tooltip.style.top = "0";
      tooltip.style.left = "0";
      tooltip.style.transition = "transition: opacity 0.3s ease";
      const arrow = document.createElement("div");
      arrow.classList.add("arrow");
      arrow.style.left = "50%";
      arrow.style.marginLeft = "0";
      arrow.style.marginRight = "0";
      arrow.style.transform = "translateX(-50%)";
      tooltip.appendChild(arrow);
      const innerTooltip = document.createElement("div");
      innerTooltip.classList.add("tooltip-inner");
      innerTooltip.textContent = `Open in ${tool.name}`;
      tooltip.appendChild(innerTooltip);
      document.body.appendChild(tooltip);
      return tooltip;
    };
    const detectProvider_addClickEventHandler = (button, tool, metadata) => {
      const mrPageHashPartsCount = 3;
      button.addEventListener("click", (e => {
        e.preventDefault();
        const filePath = e.currentTarget.dataset.filePath;
        let lineNumber = "";
        if (document.body.dataset.page === "projects:merge_requests:show") {
          const hashParts = location.hash.split("_");
          if (hashParts.length === mrPageHashPartsCount) lineNumber = hashParts.pop();
        } else lineNumber = location.hash.replace("#L", "");
        const parsedLineNumber = detectProvider_parseLineNumber(lineNumber);
        detectProvider_callToolbox(detectProvider_getToolboxNavigateUrl(tool.tag, metadata.repository, filePath, parsedLineNumber));
      }));
    };
    const detectProvider_addHoverEventHandler = button => {
      button.addEventListener("mouseenter", (event => {
        const tooltipId = event.target.getAttribute("aria-describedby");
        const tooltip = document.getElementById(tooltipId);
        if (tooltip) {
          const buttonRect = event.target.getBoundingClientRect();
          tooltip.style.display = "block";
          const tooltipRect = tooltip.getBoundingClientRect();
          const centerX = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;
          const topY = buttonRect.top - tooltipRect.height;
          tooltip.style.transform = `translate3d(${centerX}px, ${topY}px, 0px)`;
          tooltip.style.transitionDelay = ".4s";
          tooltip.classList.add("show");
        }
      }));
      button.addEventListener("mouseleave", (event => {
        const tooltipId = event.target.getAttribute("aria-describedby");
        const tooltip = document.getElementById(tooltipId);
        if (tooltip) {
          tooltip.style.transitionDelay = "0s";
          tooltip.classList.remove("show");
          tooltip.addEventListener("transitionend", (() => {
            tooltip.style.display = "none";
          }), {
            once: true
          });
        }
      }));
    };
    const detectProvider_observeIndexPage_observeIndexPage = (metadata, tools) => {
      const domObserver = new detectProvider_DomObserver("#copy-http-url-input");
      domObserver.start((el => {
        const parentListItem = el.closest("li").parentElement.closest("li");
        const cloneActionsContainer = parentListItem.nextElementSibling;
        const cloneActionsList = cloneActionsContainer.querySelector("ul");
        let skipIntellijIdea = false;
        cloneActionsList.querySelectorAll("[data-testid='disclosure-dropdown-item']").forEach((el => {
          if (el.textContent.includes(detectProvider_SUPPORTED_TOOLS.idea.name)) {
            el.dataset.testid = "clone-menu-item";
            skipIntellijIdea = true;
          }
        }));
        tools.filter((t => skipIntellijIdea ? t.tag !== detectProvider_SUPPORTED_TOOLS.idea.tag : true)).forEach((tool => {
          const sshItem = detectProvider_observeIndexPage_createCloneMenuItem(metadata, tool, true);
          cloneActionsList.appendChild(sshItem);
          const httpsItem = detectProvider_observeIndexPage_createCloneMenuItem(metadata, tool, false);
          cloneActionsList.appendChild(httpsItem);
        }));
      }));
    };
    const detectProvider_observeIndexPage_createCloneMenuItem = (metadata, tool, isSsh) => {
      const li = document.createElement("li");
      li.classList.add("gl-new-dropdown-item");
      li.dataset.testid = "clone-menu-item";
      li.tabIndex = 0;
      const a = document.createElement("a");
      a.classList.add("gl-new-dropdown-item-content");
      a.tabIndex = -1;
      a.target = "_self";
      a.href = detectProvider_getToolboxCloneUrl(tool.tag, isSsh ? metadata.sshCloneUrl : metadata.httpsCloneUrl);
      li.appendChild(a);
      const span = document.createElement("span");
      span.classList.add("gl-new-dropdown-item-text-wrapper");
      span.textContent = `${tool.name} (${isSsh ? "SSH" : "HTTPS"})`;
      a.appendChild(span);
      return li;
    };
    async function detectProvider_toolboxify_toolboxify(isEnterprise = false) {
      const metadata = await detectProvider_fetchMetadata_fetchMetadata(isEnterprise);
      if (!metadata) throw new Error("Failed to fetch metadata.");
      const tools = await detectProvider_fetchTools_fetchTools(metadata);
      await detectProvider_initAction(metadata, tools);
      detectProvider_observeIndexPage_observeIndexPage(metadata, tools);
      detectProvider_observeBlobPage_observeBlobPage(metadata, tools);
      detectProvider_setPageTestId();
    }
    var detectProvider_parse_bitbucket_url = __webpack_require__(707);
    const detectProvider_CLONE_CONTAINER_JS_CSS_CLASS = "js-toolbox-clone-repo";
    const detectProvider_OPEN_BUTTON_JS_CSS_CLASS = "js-toolbox-open-button";
    const detectProvider_bitbucket_server_fetchMetadata = () => new Promise(((resolve, reject) => {
      const parsedStashUrl = document.querySelector("meta[name=application-name][content=Bitbucket]") && detectProvider_parse_bitbucket_url(window.location.toString());
      if (!parsedStashUrl) {
        reject();
        return;
      }
      const metadata = {
        api_url: `${location.origin}/rest/api/latest/projects/${parsedStashUrl.owner}/repos/${parsedStashUrl.name}`,
        branch: parsedStashUrl.branch,
        repo: parsedStashUrl.name,
        user: parsedStashUrl.owner
      };
      fetch(metadata.api_url).then((response => response.json())).then((parsedResponse => {
        metadata.links = {
          clone: parsedResponse.links.clone
        };
        const httpLink = metadata.links.clone.find((l => l.name === "http"));
        if (httpLink) httpLink.name = "https";
        resolve(metadata);
      })).catch((() => {
        reject();
      }));
    }));
    const detectProvider_bitbucket_server_fetchLanguages = () => new Promise((resolve => {
      resolve(detectProvider_DEFAULT_LANGUAGE);
    }));
    const detectProvider_selectTools = language => new Promise((resolve => {
      const normalizedLanguage = language === "html/css" ? "html" : language;
      const toolIds = normalizedLanguage && detectProvider_SUPPORTED_LANGUAGES[normalizedLanguage.toLowerCase()];
      const normalizedToolIds = toolIds && toolIds.length > 0 ? toolIds : detectProvider_SUPPORTED_LANGUAGES[detectProvider_DEFAULT_LANGUAGE];
      const tools = normalizedToolIds.sort().map((toolId => detectProvider_SUPPORTED_TOOLS[toolId]));
      resolve(tools);
    }));
    const detectProvider_bitbucket_server_fetchTools = bitbucketMetadata => detectProvider_bitbucket_server_fetchLanguages(bitbucketMetadata).then(detectProvider_selectTools);
    const detectProvider_renderPageAction = bitbucketMetadata => new Promise((resolve => {
      chrome.runtime.onMessage.addListener(((message, sender, sendResponse) => {
        switch (message.type) {
         case "get-tools":
          detectProvider_bitbucket_server_fetchTools(bitbucketMetadata).then(sendResponse);
          return true;

         case "perform-action":
          const toolboxAction = detectProvider_getToolboxCloneUrl(message.toolTag, message.cloneUrl);
          detectProvider_callToolbox(toolboxAction);
          break;
        }
        return;
      }));
      resolve();
    }));
    const detectProvider_getCloneUrl = (links, which) => {
      const link = links.clone.find((l => l.name === which));
      return link ? link.href : "";
    };
    const detectProvider_getHttpsCloneUrl = links => detectProvider_getCloneUrl(links, "https");
    const detectProvider_getSshCloneUrl = links => detectProvider_getCloneUrl(links, "ssh");
    const detectProvider_addCloneButtonEventHandler = (btn, bitbucketMetadata) => {
      btn.addEventListener("click", (e => {
        e.preventDefault();
        const {toolTag} = e.currentTarget.dataset;
        chrome.runtime.sendMessage({
          type: "get-protocol"
        }, (({protocol}) => {
          const cloneUrl = protocol === detectProvider_PROTOCOLS.HTTPS ? detectProvider_getHttpsCloneUrl(bitbucketMetadata.links) : detectProvider_getSshCloneUrl(bitbucketMetadata.links);
          const action = detectProvider_getToolboxCloneUrl(toolTag, cloneUrl);
          detectProvider_callToolbox(action);
        }));
      }));
    };
    const detectProvider_createCloneButton = (tool, bitbucketMetadata) => {
      const title = `Clone in ${tool.name}`;
      const button = document.createElement("a");
      button.setAttribute("class", "aui-nav-item");
      button.setAttribute("href", "#");
      button.setAttribute("original-title", title);
      button.dataset.toolTag = tool.tag;
      const buttonIcon = document.createElement("span");
      buttonIcon.setAttribute("class", "aui-icon toolbox-aui-icon");
      buttonIcon.setAttribute("style", `background-image:url(${tool.icon});background-size:contain`);
      const buttonLabel = document.createElement("span");
      buttonLabel.setAttribute("class", "aui-nav-item-label");
      buttonLabel.textContent = title;
      button.appendChild(buttonIcon);
      button.appendChild(buttonLabel);
      detectProvider_addCloneButtonEventHandler(button, bitbucketMetadata);
      return button;
    };
    const detectProvider_renderCloneButtons = bitbucketMetadata => {
      const cloneElement = document.querySelector(".clone-repo");
      if (!cloneElement) return;
      detectProvider_bitbucket_server_fetchTools(bitbucketMetadata).then((tools => {
        tools.forEach((tool => {
          const classEnding = tool.tag.replace("-", "");
          const buttonContainerClass = `${detectProvider_CLONE_CONTAINER_JS_CSS_CLASS} ${detectProvider_CLONE_CONTAINER_JS_CSS_CLASS}-${classEnding}`;
          if (document.getElementsByClassName(buttonContainerClass).length === 0) {
            const buttonContainer = document.createElement("li");
            buttonContainer.setAttribute("class", buttonContainerClass);
            const button = detectProvider_createCloneButton(tool, bitbucketMetadata);
            buttonContainer.appendChild(button);
            cloneElement.insertAdjacentElement("beforebegin", buttonContainer);
          }
        }));
      })).catch((() => {}));
    };
    const detectProvider_removeCloneButtons = () => {
      document.querySelectorAll(`.${detectProvider_CLONE_CONTAINER_JS_CSS_CLASS}`).forEach((buttonContainer => {
        buttonContainer.remove();
      }));
    };
    const detectProvider_addOpenButtonEventHandler = (domElement, tool, bitbucketMetadata) => {
      domElement.addEventListener("click", (e => {
        e.preventDefault();
        const filePathIndex = 6;
        const filePath = location.pathname.split("/").splice(filePathIndex).join("/");
        const lineNumber = detectProvider_parseLineNumber(location.hash.replace("#", ""));
        detectProvider_callToolbox(detectProvider_getToolboxNavigateUrl(tool.tag, bitbucketMetadata.repo, filePath, lineNumber));
      }));
    };
    const detectProvider_bitbucket_server_createOpenButton = (tool, bitbucketMetadata) => {
      const buttonContainer = document.createElement("div");
      buttonContainer.setAttribute("class", `aui-buttons ${detectProvider_OPEN_BUTTON_JS_CSS_CLASS}`);
      const button = document.createElement("button");
      button.setAttribute("class", "aui-button");
      button.setAttribute("original-title", `Open this file in ${tool.name}`);
      const buttonIcon = document.createElement("img");
      buttonIcon.setAttribute("alt", tool.name);
      buttonIcon.setAttribute("src", tool.icon);
      buttonIcon.setAttribute("width", "16");
      buttonIcon.setAttribute("height", "16");
      buttonIcon.setAttribute("style", "vertical-align:text-bottom");
      button.appendChild(buttonIcon);
      buttonContainer.append(button);
      detectProvider_addOpenButtonEventHandler(button, tool, bitbucketMetadata);
      return buttonContainer;
    };
    const detectProvider_setOpenButtonTooltips = () => {
      const tooltipScript = document.createElement("script");
      tooltipScript.textContent = `jQuery('.${detectProvider_OPEN_BUTTON_JS_CSS_CLASS} > .aui-button:first-child').tipsy();`;
      document.body.appendChild(tooltipScript);
    };
    const detectProvider_openButtonsRendered = () => document.getElementsByClassName(detectProvider_OPEN_BUTTON_JS_CSS_CLASS).length > 0;
    const detectProvider_renderOpenButtons = bitbucketMetadata => {
      if (detectProvider_openButtonsRendered()) return;
      const anchorElement = document.querySelector(".file-toolbar > .secondary > .aui-buttons:first-child");
      if (anchorElement) detectProvider_bitbucket_server_fetchTools(bitbucketMetadata).then((tools => {
        tools.forEach((tool => {
          const action = detectProvider_bitbucket_server_createOpenButton(tool, bitbucketMetadata);
          anchorElement.insertAdjacentElement("beforebegin", action);
        }));
        detectProvider_setOpenButtonTooltips();
      })).catch((() => {}));
    };
    const detectProvider_removeOpenButtons = () => {
      document.querySelectorAll(`.${detectProvider_OPEN_BUTTON_JS_CSS_CLASS}`).forEach((button => {
        button.remove();
      }));
    };
    const detectProvider_startTrackingDOMChanges = bitbucketMetadata => detectProvider_observe("#file-content > .file-toolbar > .secondary > .aui-buttons > .file-blame", {
      add() {
        detectProvider_renderOpenButtons(bitbucketMetadata);
      },
      remove() {
        detectProvider_removeOpenButtons();
      }
    });
    const detectProvider_stopTrackingDOMChanges = observer => {
      if (observer) observer.abort();
    };
    const detectProvider_enablePageAction = bitbucketMetadata => {
      chrome.runtime.sendMessage({
        type: "enable-page-action",
        project: bitbucketMetadata.repo,
        https: detectProvider_getHttpsCloneUrl(bitbucketMetadata.links),
        ssh: detectProvider_getSshCloneUrl(bitbucketMetadata.links)
      });
    };
    const detectProvider_disablePageAction = () => {
      chrome.runtime.sendMessage({
        type: "disable-page-action"
      });
    };
    const detectProvider_bitbucket_server_toolboxify = () => {
      detectProvider_bitbucket_server_fetchMetadata().then((metadata => {
        detectProvider_renderPageAction(metadata).then((() => {
          detectProvider_enablePageAction(metadata);
        }));
        chrome.runtime.sendMessage({
          type: "get-modify-pages"
        }, (data => {
          let DOMObserver = null;
          if (data.allow) {
            detectProvider_renderCloneButtons(metadata);
            DOMObserver = detectProvider_startTrackingDOMChanges(metadata);
          }
          chrome.runtime.onMessage.addListener((message => {
            switch (message.type) {
             case "modify-pages-changed":
              if (message.newValue) {
                detectProvider_renderCloneButtons(metadata);
                DOMObserver = detectProvider_startTrackingDOMChanges(metadata);
              } else {
                detectProvider_removeCloneButtons();
                detectProvider_stopTrackingDOMChanges(DOMObserver);
              }
              break;
            }
          }));
        }));
      })).catch((() => {
        detectProvider_disablePageAction();
      }));
    };
    const detectProvider_bitbucket_server = detectProvider_bitbucket_server_toolboxify;
    (function detectEnterprise() {
      const nameMeta = document.querySelector('meta[property="og:site_name"]') || document.querySelector('meta[name="application-name"]');
      if (nameMeta) switch (nameMeta.content) {
       case "GitHub":
        detectProvider_toolboxify(true);
        break;

       case "GitLab":
        detectProvider_toolboxify_toolboxify(true);
        break;

       case "Bitbucket":
        detectProvider_bitbucket_server();
        break;

       case "Gitee":
        break;
      }
    })();
  })();
})();