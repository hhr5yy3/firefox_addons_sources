(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator;
},{}],2:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault;
},{}],3:[function(require,module,exports){
var runtime = (function (exports) {
  "use strict";
  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; 
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);
    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }
  exports.wrap = wrap;
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }
  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    IteratorPrototype = NativeIteratorPrototype;
  }
  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }
  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };
  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };
  exports.awrap = function(arg) {
    return { __await: arg };
  };
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }
        return PromiseImpl.resolve(value).then(function(unwrapped) {
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
    }
    var previousPromise;
    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise =
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }
    this._invoke = enqueue;
  }
  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );
    return exports.isGeneratorFunction(outerFn)
      ? iter 
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };
  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }
      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }
        return doneResult();
      }
      context.method = method;
      context.arg = arg;
      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if (context.method === "next") {
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }
          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }
        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;
          if (record.arg === ContinueSentinel) {
            continue;
          }
          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      context.delegate = null;
      if (context.method === "throw") {
        if (delegate.iterator["return"]) {
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);
          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }
        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }
    var info = record.arg;
    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }
    if (info.done) {
      context[delegate.resultName] = info.value;
      context.next = delegate.nextLoc;
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      return info;
    }
    context.delegate = null;
    return ContinueSentinel;
  }
  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator");
  Gp[iteratorSymbol] = function() {
    return this;
  };
  Gp.toString = function() {
    return "[object Generator]";
  };
  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };
    if (1 in locs) {
      entry.catchLoc = locs[1];
    }
    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }
    this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }
  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }
      next.done = true;
      return next;
    };
  };
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }
      if (typeof iterable.next === "function") {
        return iterable;
      }
      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }
          next.value = undefined;
          next.done = true;
          return next;
        };
        return next.next = next;
      }
    }
    return { next: doneResult };
  }
  exports.values = values;
  function doneResult() {
    return { value: undefined, done: true };
  }
  Context.prototype = {
    constructor: Context,
    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);
      if (!skipTempReset) {
        for (var name in this) {
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }
      return this.rval;
    },
    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }
      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        if (caught) {
          context.method = "next";
          context.arg = undefined;
        }
        return !! caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;
        if (entry.tryLoc === "root") {
          return handle("end");
        }
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        finallyEntry = null;
      }
      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;
      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }
      return this.complete(record);
    },
    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }
      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
      return ContinueSentinel;
    },
    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };
      if (this.method === "next") {
        this.arg = undefined;
      }
      return ContinueSentinel;
    }
  };
  return exports;
}(
  typeof module === "object" ? module.exports : {}
));
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  Function("r", "regeneratorRuntime = r")(runtime);
}
},{}],4:[function(require,module,exports){
module.exports = require("regenerator-runtime");
},{"regenerator-runtime":3}],5:[function(require,module,exports){
module.exports =
 (function(modules) { 
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		module.l = true;
 		return module.exports;
 	}
 	__webpack_require__.m = modules;
 	__webpack_require__.c = installedModules;
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
 	__webpack_require__.p = "";
 	return __webpack_require__(__webpack_require__.s = 0);
 })
 ([
 (function(module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
var postMessageBus_namespaceObject = {};
__webpack_require__.r(postMessageBus_namespaceObject);
__webpack_require__.d(postMessageBus_namespaceObject, "init", function() { return init; });
var window_namespaceObject = {};
__webpack_require__.r(window_namespaceObject);
__webpack_require__.d(window_namespaceObject, "create", function() { return create; });
var runtime_namespaceObject = {};
__webpack_require__.r(runtime_namespaceObject);
__webpack_require__.d(runtime_namespaceObject, "create", function() { return runtime_create; });
function generateRandomId() {
  return Date.now() + '_' + Math.floor(1000000000 * Math.random());
}
function makeTimeoutError(message) {
  const error = new Error(message);
  error.type = 'TIMEOUT';
  return error;
}
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function init({
  actorName,
  driver,
  packetTimeout = 1000,
  debug = false
}) {
  if (!actorName) {
    throw new Error('actorName required');
  }
  if (!driver) {
    throw new Error('driver required');
  }
  const SELF_UUID = generateRandomId();
  const MAX_PACKET_FAILURES = 1;
  const pendingPackets = [];
  const packetListeners = [];
  const failedPackets = [];
  driver.init();
  const removePacketFromPending = function (packetId) {
    for (const packet in pendingPackets) {
      if (packet.id === packetId) {
        pendingPackets.splice(pendingPackets.indexOf(packet), 1);
      }
    }
  };
  const removePacketFromFailed = function (packetId) {
    for (const packet in failedPackets) {
      if (packet.id === packetId) {
        failedPackets.splice(failedPackets.indexOf(packet), 1);
      }
    }
  };
  const registerPacketFailure = function (packetId) {
    let exists = false;
    for (const packet of failedPackets) {
      if (packet.id === packetId) {
        packet.failures += 1;
        exists = true;
      }
    }
    if (!exists) {
      failedPackets.push({
        id: packetId,
        failures: 1
      });
    }
  };
  const shouldRetryPacket = function (packetId) {
    for (const packet of failedPackets) {
      if (packet.id === packetId) {
        if (packet.failures === MAX_PACKET_FAILURES) {
          return false;
        } else {
          return true;
        }
      }
    }
    return true;
  };
  function onMessage(message, targetInfo) {
    const {
      source,
      action,
      packetId,
      destination
    } = message;
    if (source === actorName) {
      return; 
    }
    if (destination !== actorName) {
      return; 
    }
    if (!action) {
      return; 
    }
    if (debug) {
      console.log('postMessageBus:' + actorName + ':' + SELF_UUID, action, packetId);
    }
    if (action === 'ACKNOWLEDGE') {
      for (const packet of pendingPackets) {
        if (packet.id === packetId) {
          packet.resolve();
          removePacketFromPending(packetId);
        }
      }
    } else if (action === 'PUSH') {
      driver.post({
        action: 'ACKNOWLEDGE',
        packetId,
        source: actorName,
        destination: source
      }, targetInfo); 
      for (const listener of packetListeners) {
        listener(message.data, _objectSpread({
          source
        }, targetInfo));
      }
    }
  }
  driver.onMessage(onMessage);
  const pushMessagePacket = function ({
    destination,
    data
  }, targetInfo) {
    if (!destination) {
      throw new Error('"destination" required');
    }
    const packetId = generateRandomId();
    const pushPromise = new Promise((resolve, reject) => {
      try {
        pendingPackets.push({
          id: packetId,
          resolve
        });
        const packet = {
          packetId: packetId,
          action: 'PUSH',
          data,
          source: actorName,
          destination
        };
        if (debug) {
          console.log('Pushing', packet);
        }
        driver.post(packet, targetInfo);
      } catch (err) {
        reject(err);
      }
    }); 
    const timeoutPromise = new Promise((__, reject) => {
      setTimeout(() => {
        reject(makeTimeoutError('Message could not be passed (timeout)'));
      }, packetTimeout);
    });
    return Promise.race([pushPromise, timeoutPromise]).then(function () {
      removePacketFromPending(packetId);
      removePacketFromFailed(packetId);
    }).catch(async function (err) {
      registerPacketFailure(packetId);
      if (shouldRetryPacket(packetId)) {
        removePacketFromPending(packetId);
        return pushMessagePacket(data, packetId);
      } else {
        if (debug) {
          console.warn(actorName + ' ~> ' + destination + ' : Packet ' + packetId + ' could not be passed', data, err);
        }
        throw err;
      }
    });
  };
  const addPacketListener = function (listener) {
    packetListeners.push(listener);
  };
  const dispose = () => {
    driver.dispose();
    while (packetListeners.length > 0) {
      packetListeners.pop();
    }
  };
  return {
    actorName,
    pushMessagePacket,
    addPacketListener,
    dispose
  };
}
function create({
  targetWindow = window,
  originVerifier = () => true,
  debug = false
} = {}) {
  if (debug) {
    console.log('Driver is in debug mode');
  }
  return {
    _listeners: [],
    _attachedMessageHandler: null,
    init() {
      if (debug) {
        console.log('Driver initialized');
      }
      this._attachedMessageHandler = event => {
        if (debug) {
          console.log('Message received %d listeners', this._listeners.length, event.data);
        }
        const allowedToRun = originVerifier(event.origin);
        if (allowedToRun) {
          for (const listener of this._listeners) {
            listener(event.data || {}, {
              sourceWindow: event.source
            });
          }
        }
      };
      window.addEventListener('message', this._attachedMessageHandler, true);
    },
    dispose() {
      window.removeEventListener('message', this._attachedMessageHandler, true);
      this._listeners = null;
    },
    post(message) {
      if (debug) {
        console.log('Post message', message);
      }
      targetWindow.postMessage(message, '*');
    },
    onMessage(listener) {
      this._listeners.push(listener);
    }
  };
}
function getBrowserApi() {
  let browserApi;
  const isChrome = !!window.chrome && !navigator.userAgent.includes('Edge'); 
  if (isChrome) {
    browserApi = chrome;
  } else {
    if (typeof browser === 'undefined') {
      browserApi = chrome; 
    } else {
      browserApi = browser;
    }
  }
  return browserApi;
}
function runtime_create({
  debug = false
}) {
  return {
    _initialized: false,
    _listeners: [],
    _attachedMessageHandler: null,
    _browserApi: null,
    init() {
      if (this._initialized) {
        return;
      }
      this._browserApi = getBrowserApi();
      this._attachedMessageHandler = (message, sender, respond) => {
        for (const listener of this._listeners) {
          listener(message, {
            tabId: sender.tab && sender.tab.id
          });
        }
        respond('OK'); 
      };
      this._browserApi.runtime.onMessage.addListener(this._attachedMessageHandler);
    },
    dispose() {
      this._browserApi.runtime.onMessage.removeListener(this._attachedMessageHandler);
      this._listeners = null;
    },
    post(message, {
      tabId
    } = {}) {
      if (tabId) {
        return new Promise((resolve, reject) => {
          this._browserApi.tabs.sendMessage(tabId, message, () => {
            const lastError = this._browserApi.runtime.lastError;
            if (lastError) {
              const error = new Error('Message not delivered');
              error.message = message;
              error.tabId = tabId;
              error.sourceError = lastError;
              reject(error);
            } else {
              resolve();
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          this._browserApi.runtime.sendMessage(message, () => {
            const lastError = this._browserApi.runtime.lastError;
            if (lastError) {
              reject(lastError);
              if (debug) {
                console.info('Message not delivered: ' + lastError.message, {
                  error: lastError,
                  message
                });
              }
            } else {
              resolve(message);
            }
          });
        });
      }
    },
    onMessage(listener) {
      this._listeners.push(listener);
    }
  };
}
 var drivers = ({
  window: window_namespaceObject,
  runtime: runtime_namespaceObject
});
function errorToObject(error) {
  return JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));
}
;
class rpc_CallStack {
  constructor() {
    this.stack = [];
  }
  async createCall() {
    const callId = generateRandomId();
    return {
      callId,
      promise: new Promise((resolve, reject) => {
        this.stack.push({
          callId,
          resolve,
          reject
        });
      })
    };
  }
  resolve(callId, result) {
    const call = this._findCall(callId);
    if (call) {
      call.resolve(result);
      this._removeCall(callId);
    }
  }
  reject(callId, error) {
    const call = this._findCall(callId);
    if (call) {
      call.reject(error);
      this._removeCall(callId);
    }
  }
  _findCall(callId) {
    return this.stack.find(call => call.callId === callId);
  }
  _removeCall(callId) {
    this.stack = this.stack.filter(call => call.callId !== callId);
  }
  exists(callId) {
    return !!this._findCall(callId);
  }
  getPromise(callId) {
    const call = this._findCall(callId);
    return call;
  }
  dispose() {
    this.stack = null;
  }
}
class rpc_RPC {
  constructor({
    debug = false,
    logs = {
      calls: true,
      com: false
    }
  } = {}) {
    this.targets = [];
    this.methods = [];
    this.debug = debug;
    this.logs = logs;
  }
  static makeCallRequest({
    callId,
    method,
    args
  }) {
    return {
      type: 'CallRequest',
      data: {
        callId,
        method,
        args
      }
    };
  }
  static makeCallResponse({
    callId,
    result,
    error
  }) {
    if (error) {
      return {
        type: 'CallResponse',
        data: {
          callId,
          error: errorToObject(error)
        }
      };
    } else {
      return {
        type: 'CallResponse',
        data: {
          callId,
          result: result || null
        }
      };
    }
  }
  getAllMethodNames() {
    return this.methods.map(({
      name
    }) => name);
  }
  async _handleCallReponse({
    messageBus,
    name,
    callStack
  }, data) {
    const {
      callId,
      result,
      error
    } = data;
    if (this.debug && this.logs.com) {
      console.log(`%c RECEIVED ${data.error ? 'ERROR' : 'OK'} FROM ${name} ON ${messageBus.actorName} %c ${callId} `, 'color: white; background: #3b5bdb; font-weight: bold;', 'color: white; background: #5c7cfa; font-weight: bold;', data.result || data.error);
    }
    if (error) {
      callStack.reject(callId, error);
    } else {
      callStack.resolve(callId, result);
    }
  }
  async _handleCallRequest({
    name,
    messageBus
  }, data, targetInfo) {
    const {
      callId,
      method,
      args
    } = data;
    if (this.debug && this.logs.calls) {
      console.log(`%c RUNNING LOCAL CALL ON ${messageBus.actorName} : ${method}() %c ${callId} `, 'color: white; background: #364fc7; font-weight: bold;', 'color: white; background: #3b5bdb; font-weight: bold;', args);
    }
    const methodDefinition = this.methods.find(({
      name
    }) => name === method);
    let result, error;
    if (methodDefinition) {
      const {
        handler
      } = methodDefinition;
      try {
        result = await handler(args, targetInfo);
      } catch (_error) {
        error = _error;
      }
    } else {
      error = new Error('No such method ' + method + ', did you make a typo? Available methods: ' + this.getAllMethodNames().join(', '));
    }
    if (this.debug && this.logs.com) {
      console.log(`%c RESPONDING ${error ? 'ERROR' : 'OK'} ${messageBus.actorName} TO ${name} %c ${callId} `, 'color: white; background: #364fc7; font-weight: bold;', 'color: white; background: #3b5bdb; font-weight: bold;', result || error);
    }
    messageBus.pushMessagePacket({
      destination: name,
      data: rpc_RPC.makeCallResponse({
        callId,
        result,
        error
      })
    }, targetInfo);
  }
  registerTarget(targetName, messageBus) {
    if (!targetName) {
      throw new Error('targetName required');
    }
    if (!messageBus) {
      throw new Error('messageBus required');
    }
    const callStack = new rpc_CallStack();
    const target = {
      name: targetName,
      messageBus,
      callStack
    };
    messageBus.addPacketListener(async ({
      type,
      data
    } = {}, targetInfo) => {
      if (!type || !data) {
        return; 
      }
      if (targetInfo.source !== targetName) {
        return; 
      }
      if (type === 'CallResponse') {
        this._handleCallReponse(target, data, targetInfo);
      } else if (type === 'CallRequest') {
        await this._handleCallRequest(target, data, targetInfo);
      } else {
        throw new Error('Unknown type ' + type);
      }
    });
    this.targets.push(target);
  }
  exposeMethod(name, handler) {
    this.methods.push({
      name,
      handler
    });
  }
  async call(targetName, method, args = {}, targetInfo, timeout = 5000) {
    const target = this.targets.find(({
      name
    }) => name === targetName);
    if (!target) {
      throw new Error('No such target ' + targetName + ', did you register it?');
    }
    const {
      callId,
      promise
    } = await target.callStack.createCall();
    if (this.debug && this.logs.calls) {
      console.info(`%c CALL ${target.messageBus.actorName} ~> ${targetName} : ${method}() %c ${callId} `, 'color: white; background: #5f3dc4; font-weight: bold;', 'color: white; background: #7950f2; font-weight: bold;', args);
    }
    target.messageBus.pushMessagePacket({
      destination: targetName,
      data: rpc_RPC.makeCallRequest({
        callId,
        method,
        args
      })
    }, targetInfo).catch(err => target.callStack.reject(callId, err));
    return Promise.race([promise, new Promise((__, reject) => {
      setTimeout(() => {
        reject(makeTimeoutError('Call timed out ' + targetName + '.' + method));
      }, timeout);
    })]).then(result => {
      if (this.debug && this.logs.calls) {
        console.info(`%c COMPLETED ${target.messageBus.actorName} ~> ${targetName}.${method}() %c ${callId} `, 'color: white; background: #087f5b; font-weight: bold;', 'color: white; background: #0ca678; font-weight: bold;', result);
      }
      return result;
    }).catch(err => {
      if (this.debug && this.logs.calls) {
        console.info(`%c FAILED ${target.messageBus.actorName} ~> ${targetName}.${method}() %c ${callId} `, 'color: white; background: #c92a2a; font-weight: bold;', 'color: white; background: #e03131; font-weight: bold;', err);
      }
      throw err;
    });
  }
  dispose() {
    for (const {
      messageBus,
      callStack
    } of this.targets) {
      messageBus.dispose();
      callStack.dispose();
    }
    this.targets = null;
    this.methods = null;
  }
}
function src_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function src_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { src_ownKeys(Object(source), true).forEach(function (key) { src_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { src_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
 var src = __webpack_exports__["default"] = (src_objectSpread(src_objectSpread({}, postMessageBus_namespaceObject), {}, {
  RPC: rpc_RPC,
  drivers: drivers
}));
 })
 ]);
},{}],6:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dataURItoBlob;
function dataURItoBlob(dataURI) {
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);else byteString = unescape(dataURI.split(',')[1]); 
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; 
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {
    type: mimeString
  });
}
},{}],7:[function(require,module,exports){
'use strict';
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dataURItoBlob = _interopRequireDefault(require("./functions/dataURItoBlob"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var _default = {
  injectCapture: function injectCapture(_ref) {
    var edgeJsUrl = _ref.edgeJsUrl;
    var script = document.createElement('script');
    script.src = edgeJsUrl + '/standalone.js';
    document.body.appendChild(script);
    return 1;
  },
  removeCaptureFrame: function removeCaptureFrame() {
    var element = document.getElementById('marker-iframe');
    if (element) {
      element.remove();
    }
    return 1;
  },
  getWindowInfo: function getWindowInfo() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      zoomFactor: +(window.outerWidth / window.innerWidth).toFixed(2)
    };
  },
  getScreenInfo: function getScreenInfo() {
    return {
      screenSize: {
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio
      }
    };
  },
  getWindowDimensions: function getWindowDimensions() {
    var scrollHeight = document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    var hasVerticalScrollbar = scrollHeight > clientHeight;
    return {
      width: window.outerWidth,
      height: window.outerHeight,
      zoom: window.outerWidth / window.innerWidth,
      isScrolled: hasVerticalScrollbar
    };
  },
  repositionFixedElements: function repositionFixedElements() {
    var elements = document.querySelectorAll('*');
    var _iterator = _createForOfIteratorHelper(elements),
        _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var element = _step.value;
        var style = window.getComputedStyle(element, null);
        if (style === null) {
          return;
        }
        var currentPosition = style.getPropertyValue('position');
        if (currentPosition === 'fixed' || currentPosition === 'sticky' || currentPosition === '-webkit-sticky') {
          element.style.position = 'absolute';
          element.setAttribute('data-restore-original-position', currentPosition);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  restoreFixedElementsPosition: function restoreFixedElementsPosition() {
    var elements = document.querySelectorAll('*');
    var _iterator2 = _createForOfIteratorHelper(elements),
        _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var element = _step2.value;
        if (element.getAttribute('data-restore-original-position')) {
          element.style.position = element.getAttribute('data-restore-original-position');
          element.removeAttribute('data-restore-fixed-position');
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  },
  startEntirePageCapture: function startEntirePageCapture() {
    var originalOverflowValue = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    var tabCaptureInfo = {
      frameWidth: window.innerWidth,
      frameHeight: window.innerHeight,
      totalWidth: document.body.scrollWidth,
      totalHeight: document.body.scrollHeight,
      initialScrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      initialScrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      originalOverflowValue: originalOverflowValue
    };
    window.scrollTo(tabCaptureInfo.totalWidth, tabCaptureInfo.totalHeight);
    tabCaptureInfo.maxScrollX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    tabCaptureInfo.maxScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    return tabCaptureInfo;
  },
  scrollToNextFrame: function scrollToNextFrame(args) {
    window.scrollTo(args.scrollX, args.scrollY);
  },
  endEntirePageCapture: function endEntirePageCapture(args) {
    document.documentElement.style.overflow = args.originalOverflowValue;
    window.scrollTo(args.initialScrollX, args.initialScrollY);
  },
  downloadScreenshot: function downloadScreenshot(args) {
    var imageBase64 = args.imageBase64;
    var filename = args.filename;
    var blob = (0, _dataURItoBlob["default"])(imageBase64);
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  },
  getScreenCapture: function getScreenCapture(_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return navigator.mediaDevices.getUserMedia({
      video: {
        mediaSource: 'screen'
      }
    }).then(function (stream) {
      return new Promise(function (resolve) {
        var video = document.createElement('video');
        video.width = width;
        video.height = height;
        video.onloadeddata = function () {
          var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(video, 0, 0); 
          stream.getTracks().forEach(function (track) {
            return track.stop();
          });
          video.pause();
          video.srcObject = null;
          video.load();
          resolve({
            width: width,
            height: height,
            base64: canvas.toDataURL('base64'),
            pixelRatio: window.devicePixelRatio
          });
        };
        video.srcObject = stream;
        video.play();
      });
    });
  }
};
exports["default"] = _default;
},{"./functions/dataURItoBlob":6,"@babel/runtime/helpers/interopRequireDefault":2}],8:[function(require,module,exports){
'use strict';
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _postMessageBus = _interopRequireDefault(require("@marker.io/post-message-bus"));
var _inpageScripts = _interopRequireDefault(require("./lib/inpageScripts"));
var runtimeDriver = _postMessageBus["default"].drivers.runtime.create({});
var windowDriver = _postMessageBus["default"].drivers.window.create(); 
var isRecognizedMessage = function isRecognizedMessage(message) {
  return message && message.packetId && message.destination && message.source;
}; 
runtimeDriver.onMessage(function (message) {
  if (!isRecognizedMessage(message)) {
    return;
  }
  windowDriver.post(message);
});
windowDriver.onMessage(function (message, _ref) {
  var sourceWindow = _ref.sourceWindow;
  if (!isRecognizedMessage(message)) {
    return;
  }
  if (sourceWindow !== window) {
    return;
  }
  if (message.destination === 'backgroundScript') {
    runtimeDriver.post(message);
  }
});
var runtimeBus = _postMessageBus["default"].init({
  actorName: 'pageScript',
  driver: runtimeDriver
});
var windowBus = _postMessageBus["default"].init({
  actorName: 'pageScript',
  driver: windowDriver
});
var rpc = new _postMessageBus["default"].RPC({
  debug: false
});
rpc.registerTarget('snippetCode', windowBus);
rpc.registerTarget('website', windowBus);
rpc.registerTarget('browserStack', windowBus);
if (window === window.top) {
  rpc.registerTarget('backgroundScript', runtimeBus); 
  var bootstrap = function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( _regenerator["default"].mark(function _callee() {
      var snippetCode, script;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!window.location.host.includes('marker.io')) {
                _context.next = 3;
                break;
              }
              _context.next = 3;
              return rpc.call('backgroundScript', 'checkSession');
            case 3:
              _context.next = 5;
              return rpc.call('backgroundScript', 'getSnippetCodeForDomain', {
                currentDomain: window.location.host
              });
            case 5:
              snippetCode = _context.sent;
              if (snippetCode) {
                script = document.createElement('script');
                script.innerHTML = snippetCode;
                (document.head || document.body).appendChild(script);
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function bootstrap() {
      return _ref2.apply(this, arguments);
    };
  }();
  if (['complete', 'loaded'].includes(document.readyState)) {
    bootstrap();
  } else {
    document.addEventListener('DOMContentLoaded', bootstrap);
  }
  rpc.exposeMethod('handleSessionChange', (0, _asyncToGenerator2["default"])( _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            rpc.call('snippetCode', 'sdk.reload');
            rpc.call('backgroundScript', 'checkSession');
          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
}
rpc.exposeMethod('isPresent', (0, _asyncToGenerator2["default"])( _regenerator["default"].mark(function _callee3() {
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", true);
        case 1:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
document.addEventListener('platformAuthorized', function () {
  if (window.opener) {
    window.close();
  } else {
    window.location.replace('/editor');
  }
});
if (window.self === window.top) {
  rpc.exposeMethod('executeScript', function (params) {
    var method = params.method;
    var args = params.args;
    if (_inpageScripts["default"][method]) {
      return _inpageScripts["default"][method](args);
    } else {
      throw new Error('No such method defined in-page scripts: ' + method);
    }
  });
  rpc.exposeMethod('triggerEvent', function (params) {
    var eventName = params.eventName;
    var detail = params.detail;
    var event = new CustomEvent(eventName, {
      detail: detail
    });
    window.dispatchEvent(event);
  });
}
},{"./lib/inpageScripts":7,"@babel/runtime/helpers/asyncToGenerator":1,"@babel/runtime/helpers/interopRequireDefault":2,"@babel/runtime/regenerator":4,"@marker.io/post-message-bus":5}]},{},[8]);
