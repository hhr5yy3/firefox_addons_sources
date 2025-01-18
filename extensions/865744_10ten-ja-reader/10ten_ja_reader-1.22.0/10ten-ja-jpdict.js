(() => {
  // webpackBootstrap
  "use strict";
  var __webpack_modules__ = {
    364: function(__unused_webpack_module, exports) {
      0;
      exports.jsonEqualish = void 0;
      function jsonEqualish(actual, expected) {
        if (Object.is(actual, expected)) return true;
        // For non-objects, use Object.is. This will cause 'undefined' and 'null' to
        // be different, as desired.
                if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") 
        // Except for numbers, since we want '-0' and '+0' to be equivalent
        // (We should really just use JSON.stringify here. Might be slower but would
        // it matter?)
        return typeof actual === "number" ? actual === expected : Object.is(actual, expected);
        return objEquiv(actual, expected);
      }
      exports.jsonEqualish = jsonEqualish;
      function objEquiv(a, b) {
        if (typeof a !== typeof b) return false;
        if (a instanceof Date) return b instanceof Date && a.getTime() == b.getTime();
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        // We only deal with POD at the moment.
                if (a.constructor && a.constructor !== Object && a.constructor !== Array || b.constructor && b.constructor !== Object && b.constructor !== Array) throw new Error("Trying to compare something fancy");
        const aKeys = definedKeys(a);
        const bKeys = definedKeys(b);
        if (aKeys.length !== bKeys.length) return false;
        aKeys.sort();
        bKeys.sort();
        // Compare keys first
                for (let i = 0; i < aKeys.length; ++i) if (aKeys[i] != bKeys[i]) return false;
        // Compare values
                for (const key of aKeys) if (!jsonEqualish(a[key], b[key])) return false;
        return true;
      }
      function definedKeys(a) {
        return Object.keys(a).filter((key => typeof a[key] !== "undefined"));
      }
      0;
    }
  };
  /************************************************************************/
  // The module cache
    var __webpack_module_cache__ = {};
  // The require function
    function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== void 0) return cachedModule.exports;
    // Create a new module (and put it into the cache)
        var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    // Execute the module function
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    // Return the exports of the module
        return module.exports;
  }
  /************************************************************************/
  // webpack/runtime/rspack_version
    (() => {
    __webpack_require__.rv = function() {
      return "1.0.10";
    };
  })();
  // webpack/runtime/rspack_unique_id
    (() => {
    __webpack_require__.ruid = "bundler=rspack@1.0.10";
  })();
  /************************************************************************/  
  // EXTERNAL MODULE: ./node_modules/.pnpm/@birchill+json-equalish@1.1.2/node_modules/@birchill/json-equalish/dist/index.js
  var dist = __webpack_require__("364");
  // CONCATENATED MODULE: ./node_modules/.pnpm/superstruct@2.0.2/node_modules/superstruct/dist/index.mjs
  /**
 * A `StructFailure` represents a single specific failure in validation.
 */
  /**
 * `StructError` objects are thrown (or returned) when validation fails.
 *
 * Validation logic is design to exit early for maximum performance. The error
 * represents the first error encountered during validation. For more detail,
 * the `error.failures` property is a generator function that can be run to
 * continue validation and receive all the failures in the data.
 */
  class StructError extends TypeError {
    constructor(failure, failures) {
      let cached;
      const {message, explanation, ...rest} = failure;
      const {path} = failure;
      const msg = path.length === 0 ? message : `At path: ${path.join(".")} -- ${message}`;
      super(explanation ?? msg);
      if (explanation != null) this.cause = msg;
      Object.assign(this, rest);
      this.name = this.constructor.name;
      this.failures = () => cached ?? (cached = [ failure, ...failures() ]);
    }
  }
  /**
 * Check if a value is an iterator.
 */  function isIterable(x) {
    return isObject(x) && typeof x[Symbol.iterator] === "function";
  }
  /**
 * Check if a value is a plain object.
 */  function isObject(x) {
    return typeof x === "object" && x != null;
  }
  /**
 * Check if a value is a non-array object.
 */  function isNonArrayObject(x) {
    return isObject(x) && !Array.isArray(x);
  }
  /**
 * Check if a value is a plain object.
 */  
  /**
 * Return a value as a printable string.
 */
  function print(value) {
    if (typeof value === "symbol") return value.toString();
    return typeof value === "string" ? JSON.stringify(value) : `${value}`;
  }
  /**
 * Shifts (removes and returns) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 */  function shiftIterator(input) {
    const {done, value} = input.next();
    return done ? void 0 : value;
  }
  /**
 * Convert a single validation result to a failure.
 */  function toFailure(result, context, struct, value) {
    if (result === true) return; else if (result === false) result = {}; else if (typeof result === "string") result = {
      message: result
    };
    const {path, branch} = context;
    const {type} = struct;
    const {refinement, message = `Expected a value of type \`${type}\`${refinement ? ` with refinement \`${refinement}\`` : ""}, but received: \`${print(value)}\``} = result;
    return {
      value,
      type,
      refinement,
      key: path[path.length - 1],
      path,
      branch,
      ...result,
      message
    };
  }
  /**
 * Convert a validation result to an iterable of failures.
 */  function* toFailures(result, context, struct, value) {
    if (!isIterable(result)) result = [ result ];
    for (const r of result) {
      const failure = toFailure(r, context, struct, value);
      if (failure) yield failure;
    }
  }
  /**
 * Check a value against a struct, traversing deeply into nested values, and
 * returning an iterator of failures or success.
 */  function* run(value, struct, options = {}) {
    const {path = [], branch = [ value ], coerce = false, mask = false} = options;
    const ctx = {
      path,
      branch,
      mask
    };
    if (coerce) value = struct.coercer(value, ctx);
    let status = "valid";
    for (const failure of struct.validator(value, ctx)) {
      failure.explanation = options.message;
      status = "not_valid";
      yield [ failure, void 0 ];
    }
    for (let [k, v, s] of struct.entries(value, ctx)) {
      const ts = run(v, s, {
        path: k === void 0 ? path : [ ...path, k ],
        branch: k === void 0 ? branch : [ ...branch, v ],
        coerce,
        mask,
        message: options.message
      });
      for (const t of ts) if (t[0]) {
        status = t[0].refinement != null ? "not_refined" : "not_valid";
        yield [ t[0], void 0 ];
      } else if (coerce) {
        v = t[1];
        if (k === void 0) value = v; else if (value instanceof Map) value.set(k, v); else if (value instanceof Set) value.add(v); else if (isObject(value)) if (v !== void 0 || k in value) value[k] = v;
      }
    }
    if (status !== "not_valid") for (const failure of struct.refiner(value, ctx)) {
      failure.explanation = options.message;
      status = "not_refined";
      yield [ failure, void 0 ];
    }
    if (status === "valid") yield [ void 0, value ];
  }
  /**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */  class Struct {
    constructor(props) {
      const {type, schema, validator, refiner, coercer = value => value, entries = function*() {}} = props;
      this.type = type;
      this.schema = schema;
      this.entries = entries;
      this.coercer = coercer;
      if (validator) this.validator = (value, context) => {
        const result = validator(value, context);
        return toFailures(result, context, this, value);
      }; else this.validator = () => [];
      if (refiner) this.refiner = (value, context) => {
        const result = refiner(value, context);
        return toFailures(result, context, this, value);
      }; else this.refiner = () => [];
    }
    /**
     * Assert that a value passes the struct's validation, throwing if it doesn't.
     */    assert(value, message) {
      return assert(value, this, message);
    }
    /**
     * Create a value with the struct's coercion logic, then validate it.
     */    create(value, message) {
      return create(value, this, message);
    }
    /**
     * Check if a value passes the struct's validation.
     */    is(value) {
      return is(value, this);
    }
    /**
     * Mask a value, coercing and validating it, but returning only the subset of
     * properties defined by the struct's schema. Masking applies recursively to
     * props of `object` structs only.
     */    mask(value, message) {
      return dist_mask(value, this, message);
    }
    /**
     * Validate a value with the struct's validation logic, returning a tuple
     * representing the result.
     *
     * You may optionally pass `true` for the `coerce` argument to coerce
     * the value before attempting to validate it. If you do, the result will
     * contain the coerced result when successful. Also, `mask` will turn on
     * masking of the unknown `object` props recursively if passed.
     */    validate(value, options = {}) {
      return validate(value, this, options);
    }
  }
  /**
 * Assert that a value passes a struct, throwing if it doesn't.
 */  function assert(value, struct, message) {
    const result = validate(value, struct, {
      message
    });
    if (result[0]) throw result[0];
  }
  /**
 * Create a value with the coercion logic of struct and validate it.
 */  function create(value, struct, message) {
    const result = validate(value, struct, {
      coerce: true,
      message
    });
    if (result[0]) throw result[0]; else return result[1];
  }
  /**
 * Mask a value, returning only the subset of properties defined by a struct.
 */  function dist_mask(value, struct, message) {
    const result = validate(value, struct, {
      coerce: true,
      mask: true,
      message
    });
    if (result[0]) throw result[0]; else return result[1];
  }
  /**
 * Check if a value passes a struct.
 */  function is(value, struct) {
    const result = validate(value, struct);
    return !result[0];
  }
  /**
 * Validate a value against a struct, returning an error if invalid, or the
 * value (with potential coercion) if valid.
 */  function validate(value, struct, options = {}) {
    const tuples = run(value, struct, options);
    const tuple = shiftIterator(tuples);
    if (tuple[0]) {
      const error = new StructError(tuple[0], (function*() {
        for (const t of tuples) if (t[0]) yield t[0];
      }));
      return [ error, void 0 ];
    } else {
      const v = tuple[1];
      return [ void 0, v ];
    }
  }
  /**
 * Define a new struct type with a custom validation function.
 */
  function dist_define(name, validator) {
    return new Struct({
      type: name,
      schema: null,
      validator
    });
  }
  /**
 * Create a new struct based on an existing struct, but the value is allowed to
 * be `undefined`. `log` will be called if the value is not `undefined`.
 */  function array(Element) {
    return new Struct({
      type: "array",
      schema: Element,
      * entries(value) {
        if (Element && Array.isArray(value)) for (const [i, v] of value.entries()) yield [ i, v, Element ];
      },
      coercer(value) {
        return Array.isArray(value) ? value.slice() : value;
      },
      validator(value) {
        return Array.isArray(value) || `Expected an array value, but received: ${print(value)}`;
      }
    });
  }
  /**
 * Ensure that a value is a bigint.
 */  function enums(values) {
    const schema = {};
    const description = values.map((v => print(v))).join();
    for (const key of values) schema[key] = key;
    return new Struct({
      type: "enums",
      schema,
      validator(value) {
        return values.includes(value) || `Expected one of \`${description}\`, but received: ${print(value)}`;
      }
    });
  }
  /**
 * Ensure that a value is a function.
 */  
  /**
 * Ensure that a value is an integer.
 */
  function integer() {
    return dist_define("integer", (value => typeof value === "number" && !isNaN(value) && Number.isInteger(value) || `Expected an integer, but received: ${print(value)}`));
  }
  /**
 * Ensure that a value matches all of a set of types.
 */  function literal(constant) {
    const description = print(constant);
    const t = typeof constant;
    return new Struct({
      type: "literal",
      schema: t === "string" || t === "number" || t === "boolean" ? constant : null,
      validator(value) {
        return value === constant || `Expected the literal \`${description}\`, but received: ${print(value)}`;
      }
    });
  }
  /**
 * Ensure that a value is a number.
 */
  function number() {
    return dist_define("number", (value => typeof value === "number" && !isNaN(value) || `Expected a number, but received: ${print(value)}`));
  }
  /**
 * Augment a struct to allow `undefined` values.
 */
  function optional(struct) {
    return new Struct({
      ...struct,
      validator: (value, ctx) => value === void 0 || struct.validator(value, ctx),
      refiner: (value, ctx) => value === void 0 || struct.refiner(value, ctx)
    });
  }
  /**
 * Ensure that a value is an object with keys and values of specific types, but
 * without ensuring any specific shape of properties.
 *
 * Like TypeScript's `Record` utility.
 */  function record(Key, Value) {
    return new Struct({
      type: "record",
      schema: null,
      * entries(value) {
        if (isObject(value)) for (const k in value) {
          const v = value[k];
          yield [ k, k, Key ];
          yield [ k, v, Value ];
        }
      },
      validator(value) {
        return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
      },
      coercer(value) {
        return isNonArrayObject(value) ? {
          ...value
        } : value;
      }
    });
  }
  /**
 * Ensure that a value is a `RegExp`.
 *
 * Note: this does not test the value against the regular expression! For that
 * you need to use the `pattern()` refinement.
 */  
  /**
 * Ensure that a value is a string.
 */
  function string() {
    return dist_define("string", (value => typeof value === "string" || `Expected a string, but received: ${print(value)}`));
  }
  /**
 * Ensure that a value is a tuple of a specific length, and that each of its
 * elements is of a specific type.
 */  
  /**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 */
  function dist_type(schema) {
    const keys = Object.keys(schema);
    return new Struct({
      type: "type",
      schema,
      * entries(value) {
        if (isObject(value)) for (const k of keys) yield [ k, value[k], schema[k] ];
      },
      validator(value) {
        return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
      },
      coercer(value) {
        return isNonArrayObject(value) ? {
          ...value
        } : value;
      }
    });
  }
  /**
 * Ensure that a value matches one of a set of types.
 */  function union(Structs) {
    const description = Structs.map((s => s.type)).join(" | ");
    return new Struct({
      type: "union",
      schema: null,
      coercer(value, ctx) {
        for (const S of Structs) {
          const [error, coerced] = S.validate(value, {
            coerce: true,
            mask: ctx.mask
          });
          if (!error) return coerced;
        }
        return value;
      },
      validator(value, ctx) {
        const failures = [];
        for (const S of Structs) {
          const [...tuples] = run(value, S, ctx);
          const [first] = tuples;
          if (!first[0]) return []; else for (const [failure] of tuples) if (failure) failures.push(failure);
        }
        return [ `Expected the value to satisfy a union of \`${description}\`, but received: ${print(value)}`, ...failures ];
      }
    });
  }
  /**
 * Ensure that any value passes validation, without widening its type to `any`.
 */  function getSize(value) {
    if (value instanceof Map || value instanceof Set) return value.size; else return value.length;
  }
  /**
 * Ensure that a number or date is below a threshold.
 */  
  /**
 * Ensure that a number or date is above a threshold.
 */
  function dist_min(struct, threshold, options = {}) {
    const {exclusive} = options;
    return refine(struct, "min", (value => exclusive ? value > threshold : value >= threshold || `Expected a ${struct.type} greater than ${exclusive ? "" : "or equal to "}${threshold} but received \`${value}\``));
  }
  /**
 * Ensure that a string, array, map or set is not empty.
 */  function nonempty(struct) {
    return refine(struct, "nonempty", (value => {
      const size = getSize(value);
      return size > 0 || `Expected a nonempty ${struct.type} but received an empty one`;
    }));
  }
  /**
 * Ensure that a string matches a regular expression.
 */  
  /**
 * Augment a `Struct` to add an additional refinement to the validation.
 *
 * The refiner function is guaranteed to receive a value of the struct's type,
 * because the struct's existing validation will already have passed. This
 * allows you to layer additional validation on top of existing structs.
 */
  function refine(struct, name, refiner) {
    return new Struct({
      ...struct,
      * refiner(value, ctx) {
        yield* struct.refiner(value, ctx);
        const result = refiner(value, ctx);
        const failures = toFailures(result, ctx, struct, value);
        for (const failure of failures) yield {
          ...failure,
          refinement: name
        };
      }
    });
  }
  // CONCATENATED MODULE: ./node_modules/.pnpm/idb@8.0.0/node_modules/idb/build/index.js
  const instanceOfAny = (object, constructors) => constructors.some((c => object instanceof c));
  let idbProxyableTypes;
  let cursorAdvanceMethods;
  // This is a function to prevent it throwing up in node environments.
    function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [ IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction ]);
  }
  // This is a function to prevent it throwing up in node environments.
    function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [ IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey ]);
  }
  const transactionDoneMap = new WeakMap;
  const transformCache = new WeakMap;
  const reverseTransformCache = new WeakMap;
  function promisifyRequest(request) {
    const promise = new Promise(((resolve, reject) => {
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
    }));
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
        reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx)) return;
    const done = new Promise(((resolve, reject) => {
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
    }));
    // Cache it for later retrieval.
        transactionDoneMap.set(tx, done);
  }
  let idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        // Special handling for transaction.done.
        if (prop === "done") return transactionDoneMap.get(target);
        // Make tx.store return the only store in the transaction, or undefined if there are many.
                if (prop === "store") return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
      // Else transform whatever we get back.
            return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) return true;
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) return function(...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(this.request);
    };
    return function(...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function") return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
        if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
        return value;
  }
  function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest) return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
        if (transformCache.has(value)) return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
        if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  const unwrap = value => reverseTransformCache.get(value)
  /**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */;
  function openDB(name, version, {blocked, upgrade, blocking, terminated} = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) request.addEventListener("upgradeneeded", (event => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    }));
    if (blocked) request.addEventListener("blocked", (event => blocked(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    event.oldVersion, event.newVersion, event)));
    openPromise.then((db => {
      if (terminated) db.addEventListener("close", (() => terminated()));
      if (blocking) db.addEventListener("versionchange", (event => blocking(event.oldVersion, event.newVersion, event)));
    })).catch((() => {}));
    return openPromise;
  }
  /**
 * Delete a database.
 *
 * @param name Name of the database.
 */  function deleteDB(name, {blocked} = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) request.addEventListener("blocked", (event => blocked(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    event.oldVersion, event)));
    return wrap(request).then((() => {}));
  }
  const readMethods = [ "get", "getKey", "getAll", "getAllKeys", "count" ];
  const writeMethods = [ "put", "add", "delete", "clear" ];
  const cachedMethods = new Map;
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) return;
    if (cachedMethods.get(prop)) return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) return;
    const method = async function(storeName, ...args) {
      // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
      const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target = tx.store;
      if (useIndex) target = target.index(args.shift());
      // Must reject if op rejects.
      // If it's a write operation, must reject if tx.done rejects.
      // Must reject with op rejection first.
      // Must resolve with op value.
      // Must handle both promises (no unhandled rejections)
            return (await Promise.all([ target[targetFuncName](...args), isWrite && tx.done ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  })));
  const advanceMethodProps = [ "continue", "continuePrimaryKey", "advance" ];
  const methodMap = {};
  const advanceResults = new WeakMap;
  const ittrProxiedCursorToOriginalProxy = new WeakMap;
  const cursorIteratorTraps = {
    get(target, prop) {
      if (!advanceMethodProps.includes(prop)) return target[prop];
      let cachedFunc = methodMap[prop];
      if (!cachedFunc) cachedFunc = methodMap[prop] = function(...args) {
        advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
      };
      return cachedFunc;
    }
  };
  async function* iterate(...args) {
    // tslint:disable-next-line:no-this-assignment
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) cursor = await cursor.openCursor(...args);
    if (!cursor) return;
    cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    // Map this double-proxy back to the original, so other cursor methods work.
        reverseTransformCache.set(proxiedCursor, unwrap(cursor));
    while (cursor) {
      yield proxiedCursor;
      // If one of the advancing methods was not called, call continue().
            cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
      advanceResults.delete(proxiedCursor);
    }
  }
  function isIteratorProp(target, prop) {
    return prop === Symbol.asyncIterator && instanceOfAny(target, [ IDBIndex, IDBObjectStore, IDBCursor ]) || prop === "iterate" && instanceOfAny(target, [ IDBIndex, IDBObjectStore ]);
  }
  replaceTraps((oldTraps => ({
    ...oldTraps,
    get(target, prop, receiver) {
      if (isIteratorProp(target, prop)) return iterate;
      return oldTraps.get(target, prop, receiver);
    },
    has(target, prop) {
      return isIteratorProp(target, prop) || oldTraps.has(target, prop);
    }
  })));
  // src/kana-to-hiragana.ts
  function kanaToHiragana(input) {
    let result = "";
    for (const char of input) {
      let c = char.codePointAt(0);
      if (c >= 12449 && c <= 12534 || c === 12541 || c === 12542) c -= 96;
      result += String.fromCodePoint(c);
    }
    return result;
  }
  // src/kyuujitai.ts
     new Map([ [ 12358, 12436 ], [ 12363, 12364 ], [ 12365, 12366 ], [ 12367, 12368 ], [ 12369, 12370 ], [ 12371, 12372 ], [ 12373, 12374 ], [ 12375, 12376 ], [ 12377, 12378 ], [ 12379, 12380 ], [ 12381, 12382 ], [ 12383, 12384 ], [ 12385, 12386 ], [ 12388, 12389 ], [ 12390, 12391 ], [ 12392, 12393 ], [ 12399, 12400 ], [ 12402, 12403 ], [ 12405, 12406 ], [ 12408, 12409 ], [ 12411, 12412 ], [ 12445, 12446 ], [ 12459, 12460 ], [ 12461, 12462 ], [ 12454, 12532 ], [ 12463, 12464 ], [ 12465, 12466 ], [ 12467, 12468 ], [ 12469, 12470 ], [ 12471, 12472 ], [ 12473, 12474 ], [ 12475, 12476 ], [ 12477, 12478 ], [ 12479, 12480 ], [ 12481, 12482 ], [ 12484, 12485 ], [ 12486, 12487 ], [ 12488, 12489 ], [ 12495, 12496 ], [ 12498, 12499 ], [ 12501, 12502 ], [ 12504, 12505 ], [ 12507, 12508 ], [ 12527, 12535 ], [ 12528, 12536 ], [ 12529, 12537 ], [ 12530, 12538 ], [ 12541, 12542 ] ]);
   new Map([ [ 12399, 12401 ], [ 12402, 12404 ], [ 12405, 12407 ], [ 12408, 12410 ], [ 12411, 12413 ], [ 12495, 12497 ], [ 12498, 12500 ], [ 12501, 12503 ], [ 12504, 12506 ], [ 12507, 12509 ] ]);
  // CONCATENATED MODULE: ./node_modules/.pnpm/@birchill+jpdict-idb@2.6.1/node_modules/@birchill/jpdict-idb/dist/index.js
  // src/abort-error.ts
  var AbortError = class _AbortError extends Error {
    constructor(...params) {
      super(...params);
      Object.setPrototypeOf(this, _AbortError.prototype);
      if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, _AbortError);
      this.name = "AbortError";
    }
  };
  // src/data-series.ts
    var allDataSeries = [ "words", "kanji", "radicals", "names" ];
  var allMajorDataSeries = [ "words", "kanji", "names" ];
  // src/database.ts
  // src/download.ts
  // src/download-error.ts
  var DownloadError = class _DownloadError extends Error {
    constructor({code, url}, ...params) {
      super(...params);
      Object.setPrototypeOf(this, _DownloadError.prototype);
      if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, _DownloadError);
      this.name = "DownloadError";
      this.code = code;
      this.url = url;
    }
  };
  // src/download-version-info.ts
  // src/is-object.ts
    function dist_isObject(a) {
    return typeof a === "object" && a !== null && !Array.isArray(a);
  }
  // src/error-parsing.ts
    function isAbortError(e) {
    return dist_isObject(e) && "name" in e && e.name === "AbortError";
  }
  function isDownloadError(e) {
    return dist_isObject(e) && "name" in e && e.name === "DownloadError";
  }
  function getErrorMessage(e) {
    return dist_isObject(e) && typeof e.message === "string" ? e.message : String(e);
  }
  // src/fetch.ts
    async function fetchWithTimeout(resource, options) {
    var _a, _b;
    const controller = new AbortController;
    const onAbort = () => controller.abort();
    (_a = options == null ? void 0 : options.signal) == null ? void 0 : _a.addEventListener("abort", onAbort);
    const {timeout} = options;
    let didTimeout = false;
    let timeoutId;
    if (timeout && timeout !== 1 / 0) timeoutId = setTimeout((() => {
      didTimeout = true;
      controller.abort();
    }), timeout);
    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });
      if (timeoutId) clearTimeout(timeoutId);
      return response;
    } catch (e) {
      if (didTimeout && isAbortError(e)) throw new DownloadError({
        code: "Timeout",
        url: typeof resource === "string" ? resource : resource.url
      }, `Download timed out after ${timeout / 1e3} second(s).`);
      throw e;
    } finally {
      (_b = options == null ? void 0 : options.signal) == null ? void 0 : _b.removeEventListener("abort", onAbort);
    }
  }
  // src/validation-helpers.ts
    var safeInteger = () => refine(integer(), "safeInteger", (value => Number.isSafeInteger(value)))
  // src/download-version-info.ts
  ;
  async function getVersionInfo({baseUrl, series, lang, majorVersion, timeout, signal}) {
    const versionInfoFile = await getVersionInfoFile({
      baseUrl,
      lang,
      timeout,
      signal
    });
    const dbVersionInfo = getCurrentVersionInfo(versionInfoFile, series, majorVersion);
    if (!dbVersionInfo) throw new DownloadError({
      code: "VersionFileInvalid"
    }, `Invalid version object: the requested series, ${series} was not available in this language ('${lang}')`);
    return dbVersionInfo;
  }
  function clearCachedVersionInfo() {
    cachedVersionInfo = void 0;
  }
  var CACHE_TIMEOUT = 3e3 * 60;
  var cachedVersionInfo;
  async function getVersionInfoFile({baseUrl, lang, timeout, signal}) {
    if ((cachedVersionInfo == null ? void 0 : cachedVersionInfo.lang) === lang && cachedVersionInfo.accessTime > Date.now() - CACHE_TIMEOUT) return cachedVersionInfo.versionInfoFile;
    cachedVersionInfo = void 0;
    const accessTime = Date.now();
    let rawVersionInfoFile;
    const url = `${baseUrl}jpdict/reader/version-${lang}.json`;
    let response;
    try {
      response = await fetchWithTimeout(url, {
        signal,
        timeout
      });
    } catch (e) {
      if (isAbortError(e) || isDownloadError(e)) throw e;
      throw new DownloadError({
        code: "VersionFileNotAccessible",
        url
      }, `Version file ${url} not accessible (${getErrorMessage(e)})`);
    }
    if (!response.ok) {
      const code = response.status === 404 ? "VersionFileNotFound" : "VersionFileNotAccessible";
      throw new DownloadError({
        code,
        url
      }, `Version file ${url} not accessible (status: ${response.status})`);
    }
    try {
      rawVersionInfoFile = await response.json();
    } catch (e) {
      throw new DownloadError({
        code: "VersionFileInvalid",
        url
      }, `Invalid version object: ${getErrorMessage(e) || "(No detailed error message)"}`);
    }
    if (signal == null ? void 0 : signal.aborted) throw new AbortError;
    const versionInfoFile = parseVersionInfoFile(rawVersionInfoFile);
    cachedVersionInfo = {
      lang,
      versionInfoFile,
      accessTime
    };
    return versionInfoFile;
  }
  var VersionInfoStruct = dist_type({
    major: dist_min(safeInteger(), 1),
    minor: dist_min(safeInteger(), 0),
    patch: dist_min(safeInteger(), 0),
    parts: optional(dist_min(safeInteger(), 1)),
    databaseVersion: optional(string()),
    dateOfCreation: nonempty(string())
  });
  var VersionInfoFileStruct = record(string(), record(string(), VersionInfoStruct));
  function parseVersionInfoFile(rawVersionInfoFile) {
    if (!rawVersionInfoFile) throw new DownloadError({
      code: "VersionFileInvalid"
    }, "Empty version info file");
    const [error, versionInfoFile] = validate(rawVersionInfoFile, VersionInfoFileStruct);
    if (error) throw new DownloadError({
      code: "VersionFileInvalid"
    }, `Version file was invalid: ${error}`);
    return versionInfoFile;
  }
  function getCurrentVersionInfo(versionInfoFile, series, majorVersion) {
    if (!(series in versionInfoFile)) return null;
    if (!(majorVersion in versionInfoFile[series])) throw new DownloadError({
      code: "MajorVersionNotFound"
    }, `No ${majorVersion}.x version information for ${series} data`);
    return versionInfoFile[series][majorVersion];
  }
  // src/ljson-stream.ts
    async function* ljsonStreamIterator({stream, signal, timeout, url}) {
    const reader = stream.getReader();
    const lineEnd = /\n|\r|\r\n/m;
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    const parseLine = line => {
      try {
        return JSON.parse(line);
      } catch {
        try {
          reader.releaseLock();
        } catch {}
        throw new DownloadError({
          code: "DatabaseFileInvalidJSON",
          url
        }, `Could not parse JSON in database file: ${line}`);
      }
    };
    while (true) {
      let readResult;
      try {
        readResult = await waitWithTimeout({
          promise: reader.read(),
          timeout,
          url
        });
      } catch (e) {
        try {
          reader.releaseLock();
        } catch {}
        if (isAbortError(e) || isDownloadError(e)) throw e;
        throw new DownloadError({
          code: "DatabaseFileNotAccessible",
          url
        }, `Could not read database file (${getErrorMessage(e)})`);
      }
      const {done, value} = readResult;
      if (done) {
        buffer += decoder.decode();
        if (buffer) {
          yield parseLine(buffer);
          buffer = "";
        }
        return;
      }
      buffer += decoder.decode(value, {
        stream: true
      });
      const lines = buffer.split(lineEnd);
      buffer = lines.length ? lines.splice(lines.length - 1, 1)[0] : "";
      for (const line of lines) {
        if (signal.aborted) throw new AbortError;
        if (!line) continue;
        yield parseLine(line);
      }
    }
  }
  function waitWithTimeout({promise, timeout, url}) {
    let timeoutId;
    const timeoutPromise = new Promise(((_, reject) => {
      timeoutId = self.setTimeout((() => {
        clearTimeout(timeoutId);
        reject(new DownloadError({
          code: "Timeout",
          url
        }, `Download timed out after ${timeout / 1e3} seconds.`));
      }), timeout);
    }));
    return Promise.race([ promise, timeoutPromise ]).then((val => {
      clearTimeout(timeoutId);
      return val;
    }));
  }
  // src/utils.ts
    function stripFields(o, fields) {
    const result = {
      ...o
    };
    for (const field of fields) delete result[field];
    return result;
  }
  // src/version-number.ts
    function compareVersions(a, b) {
    if (a.major < b.major) return -1;
    if (a.major > b.major) return 1;
    if (a.minor < b.minor) return -1;
    if (a.minor > b.minor) return 1;
    if (a.patch < b.patch) return -1;
    if (a.patch > b.patch) return 1;
    return 0;
  }
  // src/download.ts
    var BASE_URL = "https://data.10ten.life/";
  var DOWNLOAD_TIMEOUT = 2e4;
  async function hasLanguage({series, majorVersion, lang, signal}) {
    try {
      const result = await getVersionInfo({
        baseUrl: BASE_URL,
        series,
        lang,
        majorVersion,
        timeout: DOWNLOAD_TIMEOUT,
        signal
      });
      return !!result;
    } catch {
      return false;
    }
  }
  async function* download({series, majorVersion, currentVersion, lang, signal}) {
    const versionInfo = await getVersionInfo({
      baseUrl: BASE_URL,
      series,
      lang,
      majorVersion,
      timeout: DOWNLOAD_TIMEOUT,
      signal
    });
    const {files, type: type4} = getDownloadList({
      currentVersion,
      latestVersion: versionInfo
    });
    if (type4 === "reset" && currentVersion) yield {
      type: "reset"
    };
    yield {
      type: "downloadstart",
      files: files.length
    };
    for (const file of files) yield* getEvents({
      baseUrl: BASE_URL,
      series,
      lang,
      version: file.version,
      signal,
      format: file.format,
      partInfo: file.partInfo
    });
    yield {
      type: "downloadend"
    };
  }
  function getDownloadList({currentVersion, latestVersion}) {
    if (currentVersion && compareVersions(currentVersion, latestVersion) > 0) {
      const versionToString = ({major, minor, patch}) => `${major}.${minor}.${patch}`;
      throw new DownloadError({
        code: "DatabaseTooOld"
      }, `Database version (${versionToString(latestVersion)}) is older than the current version (${versionToString(currentVersion)})`);
    }
    let downloadType = !currentVersion || compareVersions(currentVersion, {
      ...latestVersion,
      patch: 0
    }) < 0 ? "reset" : "update";
    if (downloadType === "update" && (currentVersion == null ? void 0 : currentVersion.partInfo) && latestVersion.patch - currentVersion.patch > 10) downloadType = "reset";
    if (downloadType === "reset" && latestVersion.parts) {
      const files2 = [];
      let nextPart = 1;
      while (nextPart <= latestVersion.parts) {
        files2.push({
          format: "full",
          version: {
            major: latestVersion.major,
            minor: latestVersion.minor,
            patch: latestVersion.patch
          },
          partInfo: {
            part: nextPart,
            parts: latestVersion.parts
          }
        });
        nextPart++;
      }
      return {
        type: downloadType,
        files: files2
      };
    }
    if (downloadType === "reset") return {
      type: downloadType,
      files: [ {
        format: "full",
        version: {
          major: latestVersion.major,
          minor: latestVersion.minor,
          patch: latestVersion.patch
        }
      } ]
    };
    if (!currentVersion) throw new Error("We should have already dealt with the initial download case");
    const files = [];
    if (currentVersion.partInfo) {
      let nextPart = currentVersion.partInfo.part + 1;
      while (nextPart <= currentVersion.partInfo.parts) {
        files.push({
          format: "full",
          version: {
            major: currentVersion.major,
            minor: currentVersion.minor,
            patch: currentVersion.patch
          },
          partInfo: {
            part: nextPart,
            parts: currentVersion.partInfo.parts
          }
        });
        nextPart++;
      }
    }
    let nextPatch = currentVersion.patch + 1;
    while (nextPatch <= latestVersion.patch) {
      files.push({
        format: "patch",
        version: {
          major: latestVersion.major,
          minor: latestVersion.minor,
          patch: nextPatch
        }
      });
      nextPatch++;
    }
    return {
      type: downloadType,
      files
    };
  }
  var HeaderLineStruct = dist_type({
    type: literal("header"),
    version: dist_type({
      major: dist_min(safeInteger(), 1),
      minor: dist_min(safeInteger(), 0),
      patch: dist_min(safeInteger(), 0),
      databaseVersion: optional(string()),
      dateOfCreation: nonempty(string())
    }),
    records: dist_min(safeInteger(), 0),
    part: optional(dist_min(safeInteger(), 0)),
    format: enums([ "patch", "full" ])
  });
  var PatchLineStruct = dist_type({
    _: enums([ "+", "-", "~" ])
  });
  async function* getEvents({baseUrl, series, lang, version, signal, format, partInfo}) {
    const dottedVersion = `${version.major}.${version.minor}.${version.patch}`;
    const commonUrlStart = `${baseUrl}jpdict/reader/${series}/${lang}/${dottedVersion}`;
    const url = format === "patch" ? `${commonUrlStart}-patch.jsonl` : partInfo ? `${commonUrlStart}-${partInfo.part}.jsonl` : `${commonUrlStart}.jsonl`;
    let response;
    try {
      response = await fetchWithTimeout(url, {
        signal,
        timeout: DOWNLOAD_TIMEOUT
      });
    } catch (e) {
      if (isAbortError(e) || isDownloadError(e)) throw e;
      throw new DownloadError({
        code: "DatabaseFileNotFound",
        url
      }, `Database file ${url} not accessible (${getErrorMessage(e)})`);
    }
    if (!response.ok) {
      const code = response.status === 404 ? "DatabaseFileNotFound" : "DatabaseFileNotAccessible";
      throw new DownloadError({
        code,
        url
      }, `Database file ${url} not accessible (status: ${response.status})`);
    }
    if (response.body === null) throw new DownloadError({
      code: "DatabaseFileNotAccessible",
      url
    }, "Body is null");
    let headerRead = false;
    for await (const line of ljsonStreamIterator({
      stream: response.body,
      signal,
      timeout: DOWNLOAD_TIMEOUT,
      url
    })) if (is(line, HeaderLineStruct)) {
      if (headerRead) throw new DownloadError({
        code: "DatabaseFileHeaderDuplicate",
        url
      }, `Got duplicate database header: ${JSON.stringify(line)}`);
      if (compareVersions(line.version, version) !== 0) throw new DownloadError({
        code: "DatabaseFileVersionMismatch",
        url
      }, `Got mismatched database versions (Expected: ${JSON.stringify(version)} got: ${JSON.stringify(line.version)})`);
      if (line.part !== (partInfo == null ? void 0 : partInfo.part)) throw new DownloadError({
        code: "DatabaseFileVersionMismatch",
        url
      }, `Got mismatched database part number (Expected: ${partInfo == null ? void 0 : partInfo.part}, got: ${line.part})`);
      if (line.format !== format) throw new DownloadError({
        code: "DatabaseFileVersionMismatch",
        url
      }, `Expected to get a data file in ${format} format but got '${line.format}' format instead`);
      let fileStartEvent;
      if (line.part !== void 0) fileStartEvent = {
        type: "filestart",
        totalRecords: line.records,
        version: {
          ...line.version,
          partInfo: {
            part: line.part,
            parts: partInfo.parts
          },
          lang
        }
      }; else fileStartEvent = {
        type: "filestart",
        totalRecords: line.records,
        version: {
          ...line.version,
          lang
        }
      };
      yield fileStartEvent;
      headerRead = true;
    } else if (format === "patch" && is(line, PatchLineStruct)) {
      if (!headerRead) throw new DownloadError({
        code: "DatabaseFileHeaderMissing",
        url
      }, `Expected database version but got ${JSON.stringify(line)}`);
      const mode = line._ === "+" ? "add" : line._ === "-" ? "delete" : "change";
      yield {
        type: "record",
        mode,
        record: stripFields(line, [ "_" ])
      };
    } else if (format === "full" && dist_isObject(line)) {
      if (!headerRead) throw new DownloadError({
        code: "DatabaseFileHeaderMissing",
        url
      }, `Expected database version but got ${JSON.stringify(line)}`);
      if ("_" in line) throw new DownloadError({
        code: "DatabaseFileInvalidRecord",
        url
      }, `Got patch-like '_' field in non-patch record: ${JSON.stringify(line)}`);
      yield {
        type: "record",
        mode: "add",
        record: line
      };
    } else throw new DownloadError({
      code: "DatabaseFileInvalidRecord",
      url
    }, `Got unexpected record: ${JSON.stringify(line)}`);
    yield {
      type: "fileend"
    };
  }
  // src/store.ts
  // src/quota-exceeded-error.ts
    var QuotaExceededError = class _QuotaExceededError extends Error {
    constructor(...params) {
      super(...params);
      Object.setPrototypeOf(this, _QuotaExceededError.prototype);
      if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, _QuotaExceededError);
      this.name = "QuotaExceededError";
      this.message = "The current transaction exceeded its quota limitations.";
    }
  };
  // src/store-types.ts
  // src/japanese.ts
    function hasHiragana(str) {
    return [ ...str ].map((c => c.codePointAt(0))).some((c => c >= 12353 && c <= 12447));
  }
  // src/store-types.ts
    function toWordStoreRecord(record3) {
    const result = {
      ...record3,
      rm: record3.rm ? record3.rm.map((elem => elem === 0 ? null : elem)) : void 0,
      km: record3.km ? record3.km.map((elem => elem === 0 ? null : elem)) : void 0,
      h: keysToHiragana([ ...record3.k || [], ...record3.r ]),
      kc: [],
      gt_en: [],
      gt_l: []
    };
    if (!result.rm) delete result.rm;
    if (!result.km) delete result.km;
    return result;
  }
  function getStoreIdForWordRecord(record3) {
    return record3.id;
  }
  function toNameStoreRecord(entry) {
    return {
      ...entry,
      h: keysToHiragana([ ...entry.k || [], ...entry.r ])
    };
  }
  function getStoreIdForNameRecord(record3) {
    return record3.id;
  }
  function toKanjiStoreRecord(record3) {
    return {
      ...record3,
      c: record3.c.codePointAt(0)
    };
  }
  function getStoreIdForKanjiRecord(record3) {
    return record3.c.codePointAt(0);
  }
  function toRadicalStoreRecord(record3) {
    return record3;
  }
  function getStoreIdForRadicalRecord(record3) {
    return record3.id;
  }
  function keysToHiragana(values) {
    return Array.from(new Set(values.map((value => kanaToHiragana(value))).filter(hasHiragana)));
  }
  // src/store.ts
    function getVersionKey(series) {
    switch (series) {
     case "words":
      return 4;

     case "kanji":
      return 1;

     case "radicals":
      return 2;

     case "names":
      return 3;
    }
  }
  var JpdictStore = class {
    constructor() {
      this.state = "idle";
      this.toStoreRecord = {
        words: toWordStoreRecord,
        names: toNameStoreRecord,
        kanji: toKanjiStoreRecord,
        radicals: toRadicalStoreRecord
      };
      this.getStoreId = {
        words: getStoreIdForWordRecord,
        names: getStoreIdForNameRecord,
        kanji: getStoreIdForKanjiRecord,
        radicals: getStoreIdForRadicalRecord
      };
    }
    async open() {
      if (this.state === "open") return this.db;
      if (this.state === "opening") return this.openPromise;
      if (this.state === "deleting") await this.deletePromise;
      this.state = "opening";
      const self2 = this;
      this.openPromise = openDB("jpdict", 4, {
        upgrade(db, oldVersion, _newVersion, transaction) {
          if (oldVersion < 1) {
            const kanjiTable = db.createObjectStore("kanji", {
              keyPath: "c"
            });
            kanjiTable.createIndex("r.on", "r.on", {
              multiEntry: true
            });
            kanjiTable.createIndex("r.kun", "r.kun", {
              multiEntry: true
            });
            kanjiTable.createIndex("r.na", "r.na", {
              multiEntry: true
            });
            const radicalsTable = db.createObjectStore("radicals", {
              keyPath: "id"
            });
            radicalsTable.createIndex("r", "r");
            radicalsTable.createIndex("b", "b");
            radicalsTable.createIndex("k", "k");
            db.createObjectStore("version", {
              keyPath: "id"
            });
          }
          if (oldVersion < 2) {
            const namesTable = db.createObjectStore("names", {
              keyPath: "id"
            });
            namesTable.createIndex("k", "k", {
              multiEntry: true
            });
            namesTable.createIndex("r", "r", {
              multiEntry: true
            });
          }
          if (oldVersion < 3) {
            const namesTable = transaction.objectStore("names");
            namesTable.createIndex("h", "h", {
              multiEntry: true
            });
          }
          if (oldVersion < 4) {
            const wordsTable = db.createObjectStore("words", {
              keyPath: "id"
            });
            wordsTable.createIndex("k", "k", {
              multiEntry: true
            });
            wordsTable.createIndex("r", "r", {
              multiEntry: true
            });
            wordsTable.createIndex("h", "h", {
              multiEntry: true
            });
            wordsTable.createIndex("kc", "kc", {
              multiEntry: true
            });
            wordsTable.createIndex("gt_en", "gt_en", {
              multiEntry: true
            });
            wordsTable.createIndex("gt_l", "gt_l", {
              multiEntry: true
            });
          }
        },
        blocked() {
          console.log("Opening blocked");
        },
        blocking() {
          if (self2.db) {
            try {
              self2.db.close();
            } catch {}
            self2.db = void 0;
            self2.state = "idle";
          }
        }
      }).then((db => {
        self2.db = db;
        self2.state = "open";
        return db;
      }));
      try {
        await this.openPromise;
      } catch (e) {
        this.state = "error";
        throw e;
      } finally {
        this.openPromise = void 0;
      }
      deleteDB("KanjiStore").catch((() => {}));
      return this.db;
    }
    async close() {
      var _a;
      if (this.state === "idle") return;
      if (this.state === "deleting") return this.deletePromise;
      if (this.state === "opening") await this.openPromise;
      (_a = this.db) == null ? void 0 : _a.close();
      this.db = void 0;
      this.state = "idle";
    }
    async destroy() {
      if (this.state !== "idle") await this.close();
      this.state = "deleting";
      this.deletePromise = deleteDB("jpdict", {
        blocked() {
          console.log("Deletion blocked");
        }
      });
      await this.deletePromise;
      this.deletePromise = void 0;
      this.state = "idle";
    }
    async clearSeries(series) {
      const db = await this.open();
      const tx = db.transaction([ series, "version" ], "readwrite");
      try {
        const targetTable = tx.objectStore(series);
        await targetTable.clear();
        const versionTable = tx.objectStore("version");
        const id = getVersionKey(series);
        void versionTable.delete(id);
      } catch (e) {
        console.error(`Error deleting data series '${series}'`, e);
        tx.done.catch((() => {}));
        try {
          tx.abort();
        } catch {}
        throw e;
      }
      await tx.done;
    }
    async getDataVersion(series) {
      await this.open();
      const key = getVersionKey(series);
      const versionDoc = await this.db.get("version", key);
      if (!versionDoc) return null;
      return stripFields(versionDoc, [ "id" ]);
    }
    async updateDataVersion({series, version}) {
      await this.open();
      try {
        const id = getVersionKey(series);
        await this.db.put("version", {
          ...version,
          id
        });
      } catch (e) {
        console.error(`Error updating version of '${series}' to ${JSON.stringify(version)}`, e);
        throw e;
      }
    }
    async updateSeries({series, updates}) {
      await this.open();
      const tx = this.db.transaction(series, "readwrite", {
        durability: "relaxed"
      });
      const table = tx.store;
      try {
        for (const update2 of updates) if (update2.mode === "delete") void table.delete(this.getStoreId[series](update2.record)); else void table.put(this.toStoreRecord[series](update2.record));
        await tx.done;
      } catch (e) {
        console.error(`Error updating series ${series}`, e);
        tx.done.catch((() => {}));
        try {
          tx.abort();
        } catch {}
        if (isVeryGenericError(e) && await atOrNearQuota()) {
          console.info("Detected generic error masking a quota exceeded situation");
          throw new QuotaExceededError;
        }
        throw e;
      }
    }
    // Test API
    async _getKanji(kanji) {
      await this.open();
      const result = [];
      {
        const tx = this.db.transaction("kanji");
        for (const c of kanji) {
          const record3 = await tx.store.get(c);
          if (record3) result.push(record3);
        }
      }
      return result;
    }
  };
  function isVeryGenericError(e) {
    if (typeof e === "undefined") return true;
    return e instanceof Error && !(e == null ? void 0 : e.name) || (e == null ? void 0 : e.name) === "Error" && !(e == null ? void 0 : e.message);
  }
  async function atOrNearQuota() {
    try {
      const estimate = await self.navigator.storage.estimate();
      return typeof estimate.usage !== "undefined" && typeof estimate.quota !== "undefined" && estimate.usage / estimate.quota > 0.9;
    } catch {
      return false;
    }
  }
  // src/update-state-reducer.ts
    function reducer(state, action) {
    switch (action.type) {
     case "start":
      return {
        type: "checking",
        series: action.series,
        lastCheck: state.lastCheck
      };

     case "end":
      return {
        type: "idle",
        lastCheck: action.checkDate
      };

     case "error":
      return {
        type: "idle",
        lastCheck: action.checkDate || state.lastCheck
      };

     case "updatestart":
     case "updateend":
      return state;

     case "filestart":
      if (state.type === "idle") {
        console.error("Should not get filestart event in the idle state");
        return state;
      }
      return {
        type: "updating",
        series: state.series,
        version: action.version,
        fileProgress: 0,
        totalProgress: state.type === "updating" ? state.totalProgress : 0,
        lastCheck: state.lastCheck
      };

     case "fileend":
      return state;

     case "progress":
      if (state.type !== "updating") {
        console.error(`Should not get progress event in '${state.type}' state`);
        return state;
      }
      return {
        ...state,
        fileProgress: action.fileProgress,
        totalProgress: action.totalProgress
      };

     case "parseerror":
      return state;
    }
  }
  // src/download-types.ts
    var KanjiMetaSchema = dist_type({
    i: optional(array(string())),
    p: optional(array(string())),
    bv: optional(string()),
    bg: optional(string())
  });
  var AccentSchema = dist_type({
    i: dist_min(safeInteger(), 0),
    pos: optional(array(string()))
  });
  var ReadingMetaSchema = dist_type({
    i: optional(array(string())),
    p: optional(array(string())),
    app: optional(dist_min(safeInteger(), 0)),
    a: optional(union([ dist_min(safeInteger(), 0), array(AccentSchema) ])),
    bv: optional(string()),
    bg: optional(string())
  });
  var CrossReferenceSchema = union([ dist_type({
    k: nonempty(string()),
    sense: optional(dist_min(safeInteger(), 0))
  }), dist_type({
    r: nonempty(string()),
    sense: optional(dist_min(safeInteger(), 0))
  }), dist_type({
    k: nonempty(string()),
    r: string(),
    sense: optional(dist_min(safeInteger(), 0))
  }) ]);
  var LangSourceSchema = dist_type({
    lang: optional(nonempty(string())),
    src: optional(string()),
    // The following should be:
    //   part: s.optional(s.literal(true)),
    //   wasei: s.optional(s.literal(true)),
    // But Describe doesn't seem to handle optional boolean literals so we try
    // this way for now.
    part: union([ literal(true), literal(void 0) ]),
    wasei: union([ literal(true), literal(void 0) ])
  });
  var WordSenseSchema = dist_type({
    g: nonempty(array(nonempty(string()))),
    gt: optional(dist_min(safeInteger(), 1)),
    lang: optional(nonempty(string())),
    kapp: optional(dist_min(safeInteger(), 0)),
    rapp: optional(dist_min(safeInteger(), 0)),
    pos: optional(array(string())),
    field: optional(array(string())),
    misc: optional(array(string())),
    dial: optional(array(string())),
    inf: optional(nonempty(string())),
    xref: optional(nonempty(array(CrossReferenceSchema))),
    ant: optional(nonempty(array(CrossReferenceSchema))),
    lsrc: optional(nonempty(array(LangSourceSchema)))
  });
  var WordIdSchema = dist_min(safeInteger(), 1);
  var WordDownloadRecordSchema = dist_type({
    id: WordIdSchema,
    k: optional(nonempty(array(string()))),
    km: optional(nonempty(array(union([ literal(0), KanjiMetaSchema ])))),
    r: array(nonempty(nonempty(string()))),
    rm: optional(nonempty(array(union([ literal(0), ReadingMetaSchema ])))),
    s: array(WordSenseSchema)
  });
  function validateWordDownloadRecord(record3) {
    return validate(record3, WordDownloadRecordSchema);
  }
  var WordDownloadDeleteRecordSchema = dist_type({
    id: WordIdSchema
  });
  function validateWordDownloadDeleteRecord(record3) {
    return validate(record3, WordDownloadDeleteRecordSchema);
  }
  var NameTranslationSchema = dist_type({
    type: optional(array(string())),
    det: array(nonempty(string())),
    cf: optional(array(nonempty(string())))
  });
  var NameIdSchema = dist_min(safeInteger(), 1);
  var NameDownloadRecordSchema = dist_type({
    id: NameIdSchema,
    k: optional(array(nonempty(string()))),
    r: nonempty(array(nonempty(string()))),
    tr: array(NameTranslationSchema)
  });
  function validateNameDownloadRecord(record3) {
    return validate(record3, NameDownloadRecordSchema);
  }
  var NameDownloadDeleteRecordSchema = dist_type({
    id: NameIdSchema
  });
  function validateNameDownloadDeleteRecord(record3) {
    return validate(record3, NameDownloadDeleteRecordSchema);
  }
  var ReadingsStruct = dist_type({
    on: optional(array(string())),
    kun: optional(array(string())),
    na: optional(array(string())),
    py: optional(array(string()))
  });
  var RadicalStruct = dist_type({
    x: dist_min(safeInteger(), 0),
    nelson: optional(dist_min(safeInteger(), 0)),
    name: optional(array(string())),
    var: optional(string())
  });
  var MiscSchema = dist_type({
    gr: optional(safeInteger()),
    sc: dist_min(safeInteger(), 1),
    freq: optional(dist_min(safeInteger(), 0)),
    // The following three items should really have a minimum value of 1, but in
    // the interests of being (a bit) forgiving in what we accept, we allow 0 too.
    jlpt: optional(dist_min(safeInteger(), 0)),
    jlptn: optional(dist_min(safeInteger(), 0)),
    kk: optional(dist_min(safeInteger(), 0)),
    // As with jlpt(n), we allow 0 here even though we expect WaniKani levels to
    // be between 1 and 60.
    wk: optional(dist_min(safeInteger(), 0)),
    meta: optional(array(string()))
  });
  var KanjiIdSchema = nonempty(string());
  var KanjiDownloadRecordSchema = dist_type({
    c: KanjiIdSchema,
    r: ReadingsStruct,
    m: array(string()),
    m_lang: optional(string()),
    rad: RadicalStruct,
    refs: record(string(), union([ string(), number() ])),
    misc: MiscSchema,
    st: optional(string()),
    comp: optional(string()),
    var: optional(array(string())),
    cf: optional(union([ string(), array(string()) ]))
  });
  function validateKanjiDownloadRecord(record3) {
    return validate(record3, KanjiDownloadRecordSchema);
  }
  var KanjiDownloadDeleteRecordSchema = dist_type({
    c: KanjiIdSchema
  });
  function validateKanjiDownloadDeleteRecord(record3) {
    return validate(record3, KanjiDownloadDeleteRecordSchema);
  }
  var RadicalIdSchema = nonempty(string());
  var RadicalDownloadRecordSchema = dist_type({
    id: RadicalIdSchema,
    r: dist_min(safeInteger(), 1),
    b: optional(nonempty(string())),
    k: optional(nonempty(string())),
    pua: optional(safeInteger()),
    s: safeInteger(),
    na: array(nonempty(string())),
    posn: optional(nonempty(string())),
    m: array(nonempty(string())),
    m_lang: optional(nonempty(string()))
  });
  function validateRadicalDownloadRecord(record3) {
    return validate(record3, RadicalDownloadRecordSchema);
  }
  var RadicalDownloadDeleteRecordSchema = dist_type({
    id: RadicalIdSchema
  });
  function validateRadicalDownloadDeleteRecord(record3) {
    return validate(record3, RadicalDownloadDeleteRecordSchema);
  }
  var validateDownloadRecordMapping = {
    words: validateWordDownloadRecord,
    names: validateNameDownloadRecord,
    kanji: validateKanjiDownloadRecord,
    radicals: validateRadicalDownloadRecord
  };
  function validateDownloadRecord({series, record: record3}) {
    return validateDownloadRecordMapping[series](record3);
  }
  var validateDownloadDeleteRecordMapping = {
    words: validateWordDownloadDeleteRecord,
    names: validateNameDownloadDeleteRecord,
    kanji: validateKanjiDownloadDeleteRecord,
    radicals: validateRadicalDownloadDeleteRecord
  };
  function validateDownloadDeleteRecord({series, record: record3}) {
    return validateDownloadDeleteRecordMapping[series](record3);
  }
  // src/update.ts
    var BATCH_SIZE = 4e3;
  var MAX_PROGRESS_RESOLUTION = 0.01;
  async function update({callback, currentVersion, lang, majorVersion, series, signal, store}) {
    return doUpdate({
      callback,
      currentVersion,
      lang,
      majorVersion,
      series,
      signal,
      store
    });
  }
  async function doUpdate({callback, currentVersion, lang, majorVersion, series, signal, store}) {
    if (!currentVersion) await store.clearSeries(series);
    let currentFile = 0;
    let currentFileVersion;
    let totalFiles = 0;
    let currentRecord = 0;
    let totalRecords = 0;
    let updates = [];
    let lastReportedTotalProgress;
    for await (const event of download({
      series,
      majorVersion,
      currentVersion,
      lang,
      signal
    })) {
      if (signal.aborted) throw new AbortError;
      switch (event.type) {
       case "reset":
        await store.clearSeries(series);
        break;

       case "downloadstart":
        totalFiles = event.files;
        callback({
          type: "updatestart"
        });
        break;

       case "downloadend":
        callback({
          type: "updateend"
        });
        break;

       case "filestart":
        currentFile++;
        currentRecord = 0;
        totalRecords = event.totalRecords;
        currentFileVersion = event.version;
        callback({
          type: "filestart",
          version: event.version
        });
        if (currentFile === 1) {
          callback({
            type: "progress",
            fileProgress: 0,
            totalProgress: 0
          });
          lastReportedTotalProgress = 0;
        }
        break;

       case "fileend":
        {
          if (updates.length) {
            await store.updateSeries({
              series,
              updates
            });
            updates = [];
          }
          const versionToWrite = currentFileVersion;
          if (versionToWrite.partInfo && versionToWrite.partInfo.part === versionToWrite.partInfo.parts) delete versionToWrite.partInfo;
          await store.updateDataVersion({
            series,
            version: versionToWrite
          });
          const totalProgress = currentFile / totalFiles;
          callback({
            type: "progress",
            fileProgress: 1,
            totalProgress
          });
          lastReportedTotalProgress = totalProgress;
          callback({
            type: "fileend",
            version: versionToWrite
          });
        }
        break;

       case "record":
        {
          const [error, update2] = parseRecordEvent({
            series,
            event
          });
          if (error) callback({
            type: "parseerror",
            message: error.message,
            record: event.record
          }); else {
            updates.push(update2);
            if (updates.length >= BATCH_SIZE) {
              await store.updateSeries({
                series,
                updates
              });
              updates = [];
            }
          }
          currentRecord++;
          const fileProgress = currentRecord / totalRecords;
          const totalProgress = (currentFile - 1 + fileProgress) / totalFiles;
          if (
          // Don't dispatch a 100% file progress event until after we've
          // updated the version database (as part of processing the 'fileend'
          // event.)
          fileProgress < 1 && (lastReportedTotalProgress === void 0 || totalProgress - lastReportedTotalProgress > MAX_PROGRESS_RESOLUTION)) {
            callback({
              type: "progress",
              fileProgress,
              totalProgress
            });
            lastReportedTotalProgress = totalProgress;
          }
        }
        break;
      }
    }
  }
  function parseRecordEvent({series, event}) {
    const {mode, record: unvalidatedRecord} = event;
    if (mode === "delete") {
      const [err2, record4] = validateDownloadDeleteRecord({
        series,
        record: unvalidatedRecord
      });
      return err2 ? [ err2, void 0 ] : [ void 0, {
        mode,
        record: record4
      } ];
    }
    const [err, record3] = validateDownloadRecord({
      series,
      record: unvalidatedRecord
    });
    return err ? [ err, void 0 ] : [ void 0, {
      mode,
      record: record3
    } ];
  }
  // src/database.ts
    var MAJOR_VERSION = {
    kanji: 4,
    radicals: 4,
    names: 3,
    words: 2
  };
  var JpdictIdb = class {
    // -------------------------------------------------------------------------
    // Initialization
    // -------------------------------------------------------------------------
    constructor({verbose = false} = {}) {
      this.kanji = {
        state: "init",
        version: null,
        updateState: {
          type: "idle",
          lastCheck: null
        }
      };
      this.radicals = {
        state: "init",
        version: null,
        updateState: {
          type: "idle",
          lastCheck: null
        }
      };
      this.names = {
        state: "init",
        version: null,
        updateState: {
          type: "idle",
          lastCheck: null
        }
      };
      this.words = {
        state: "init",
        version: null,
        updateState: {
          type: "idle",
          lastCheck: null
        }
      };
      this.verbose = false;
      this.changeListeners = [];
      this.inProgressUpdates = {
        words: void 0,
        kanji: void 0,
        names: void 0
      };
      this.store = new JpdictStore;
      this.verbose = verbose;
      this.readyPromise = (async () => {
        try {
          for (const series of allDataSeries) {
            const dataVersion = await this.store.getDataVersion(series);
            this.updateDataVersion(series, dataVersion);
          }
        } catch (e) {
          console.error("Failed to open IndexedDB");
          console.error(e);
          for (const series of allDataSeries) this[series] = {
            ...this[series],
            state: "unavailable",
            version: null
          };
          throw e;
        } finally {
          this.notifyChanged("stateupdated");
        }
      })();
    }
    get ready() {
      return this.readyPromise;
    }
    // -------------------------------------------------------------------------
    // Destruction
    // -------------------------------------------------------------------------
    async destroy() {
      try {
        await this.ready;
      } catch {}
      const hasData = allDataSeries.some((key => this[key].state !== "unavailable"));
      if (hasData) await this.store.destroy();
      const hasInProgressUpdate = allMajorDataSeries.some((s5 => typeof this.inProgressUpdates[s5] !== "undefined"));
      if (this.verbose && hasInProgressUpdate) console.info("Destroying database while there is an in-progress update");
      this.store = new JpdictStore;
      for (const series of allDataSeries) this[series] = {
        state: "empty",
        version: null,
        updateState: {
          type: "idle",
          lastCheck: null
        }
      };
      this.notifyChanged("deleted");
    }
    async deleteSeries(series) {
      if (this.inProgressUpdates[series]) this.cancelUpdate(series);
      await this.store.clearSeries(series);
      this.updateDataVersion(series, null);
      if (series === "kanji") {
        await this.store.clearSeries("radicals");
        this.updateDataVersion("radicals", null);
      }
    }
    // -------------------------------------------------------------------------
    // Change listeners
    // -------------------------------------------------------------------------
    addChangeListener(callback) {
      if (this.changeListeners.indexOf(callback) !== -1) return;
      this.changeListeners.push(callback);
    }
    removeChangeListener(callback) {
      const index = this.changeListeners.indexOf(callback);
      if (index === -1) return;
      this.changeListeners.splice(index, 1);
    }
    notifyChanged(topic) {
      const changeListeners = this.changeListeners.slice();
      for (const callback of changeListeners) callback(topic);
    }
    // -------------------------------------------------------------------------
    // Updating
    // -------------------------------------------------------------------------
    async update({series, lang}) {
      const existingUpdate = this.inProgressUpdates[series];
      if (existingUpdate && existingUpdate.lang === lang) {
        if (this.verbose) console.info(`Detected overlapping update for '${series}' series. Re-using existing update.`);
        return existingUpdate.promise;
      }
      if (existingUpdate) {
        if (this.verbose) console.info(`Cancelling existing update for '${series}' series since the requested language (${lang}) doesn't match that of the existing update(${existingUpdate.lang})`);
        this.cancelUpdate(series);
      }
      const controller = new AbortController;
      const signal = controller.signal;
      const updatePromise = (async () => {
        await this.ready;
        if (signal.aborted) throw new AbortError;
        switch (series) {
         case "words":
          await this.doUpdate({
            series: "words",
            signal,
            lang
          });
          break;

         case "kanji":
          await this.doUpdate({
            series: "kanji",
            signal,
            lang
          });
          if (signal.aborted) throw new AbortError;
          await this.doUpdate({
            series: "radicals",
            signal,
            lang
          });
          break;

         case "names":
          await this.doUpdate({
            series: "names",
            signal,
            lang
          });
          break;
        }
        if (signal.aborted) throw new AbortError;
      })();
      this.inProgressUpdates[series] = {
        lang,
        controller,
        promise: updatePromise.catch((() => {})).finally((() => {
          if (this.inProgressUpdates[series] && this.inProgressUpdates[series].lang === lang) this.inProgressUpdates[series] = void 0;
          this.notifyChanged("stateupdated");
        }))
      };
      return updatePromise;
    }
    async doUpdate({series, signal, lang: requestedLang}) {
      var _a;
      let wroteSomething = false;
      const reducer2 = action => {
        this[series].updateState = reducer(this[series].updateState, action);
        if (action.type === "fileend") {
          wroteSomething = true;
          this.updateDataVersion(series, action.version);
        }
        if (action.type === "parseerror" && this.verbose) console.warn("Encountered parse error", action.message, action.record);
        this.notifyChanged("stateupdated");
      };
      if (signal.aborted) {
        reducer2({
          type: "error",
          checkDate: null
        });
        throw new AbortError;
      }
      const checkDate =  new Date;
      try {
        reducer2({
          type: "start",
          series
        });
        const lang = requestedLang !== "en" && await hasLanguage({
          series,
          lang: requestedLang,
          majorVersion: MAJOR_VERSION[series],
          signal
        }) ? requestedLang : "en";
        const currentLang = this[series].state === "ok" ? (_a = this[series].version) == null ? void 0 : _a.lang : void 0;
        if (currentLang && currentLang !== lang) {
          if (this.verbose) console.info(`Clobbering '${series}' data to change lang to '${lang}'`);
          await this.store.clearSeries(series);
          this.updateDataVersion(series, null);
        }
        if (signal.aborted) throw new AbortError;
        if (this.verbose) console.info(`Requesting download for '${series}' series with current version ${JSON.stringify(this[series].version || void 0)}`);
        await update({
          callback: reducer2,
          currentVersion: this[series].version || void 0,
          lang,
          majorVersion: MAJOR_VERSION[series],
          signal,
          series,
          store: this.store
        });
        if (signal.aborted) throw new AbortError;
        reducer2({
          type: "end",
          checkDate
        });
      } catch (e) {
        reducer2({
          type: "error",
          checkDate: wroteSomething ? checkDate : null
        });
        throw e;
      }
    }
    updateDataVersion(series, version) {
      if (this[series].state !== "init" && this[series].state !== "unavailable" && (0, 
      dist.jsonEqualish)(this[series].version, version)) return;
      this[series].version = version;
      this[series].state = version ? "ok" : "empty";
      this.notifyChanged("stateupdated");
    }
    cancelUpdate(series) {
      const inProgressUpdate = this.inProgressUpdates[series];
      if (!inProgressUpdate) return false;
      inProgressUpdate.controller.abort();
      return true;
    }
    // -------------------------------------------------------------------------
    // Misc
    // -------------------------------------------------------------------------
    get isVerbose() {
      return this.verbose;
    }
  };
  // src/tokenizer.ts
    // src/offline-error.ts
  var OfflineError = class _OfflineError extends Error {
    constructor(...params) {
      super(...params);
      Object.setPrototypeOf(this, _OfflineError.prototype);
      if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(this, _OfflineError);
      this.name = "OfflineError";
    }
  };
  // src/query.ts
  // src/to-word-result.ts
  // src/words.ts
    var GlossTypes = [ "none", "expl", "lit", "fig", "tm" ];
  var GLOSS_TYPE_MAX = GlossTypes.length;
  /* unused pure expression or super */ null && Math.floor(Math.log2(GLOSS_TYPE_MAX));
   new Map([ [ "i1", 50 ], 
  // Top 10,000 words minus i2 (from 1998) (P)
  [ "i2", 20 ], [ "n1", 40 ], 
  // Top 12,000 words in newspapers (from 2003?) (P)
  [ "n2", 20 ], 
  // Next 12,000
  [ "s1", 32 ], 
  // "Speculative" annotations? Seem pretty common to me. (P)
  [ "s2", 20 ], 
  // (P)
  [ "g1", 30 ], 
  // (P)
  [ "g2", 15 ] ]);
  // src/update-error-state.ts
  function toUpdateErrorState({error, nextRetry, retryCount}) {
    return {
      name: error.name,
      message: error.message,
      code: error instanceof DownloadError ? error.code : void 0,
      url: error instanceof DownloadError ? error.url : void 0,
      nextRetry,
      retryCount
    };
  }
  // src/request-idle-callback.ts
    var requestIdleCallback;
  var cancelIdleCallback;
  if (typeof self === "object" && typeof self.requestIdleCallback === "function" && typeof self.cancelIdleCallback === "function") {
    requestIdleCallback = self.requestIdleCallback;
    cancelIdleCallback = self.cancelIdleCallback;
  } else {
    requestIdleCallback = (callback, options) => {
      const timeout = options ? options.timeout / 2 : 0;
      return self.setTimeout((() => {
        callback({
          timeRemaining: () => 0,
          didTimeout: true
        });
      }), timeout);
    };
    cancelIdleCallback = handle => {
      clearTimeout(handle);
    };
  }
  // src/uuid.ts
    function uuid() {
    return (1e7.toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)));
  }
  // src/update-key.ts
    var dbToUuid =  new Map;
  function getUpdateKey(obj, series) {
    if (!dbToUuid.has(obj)) dbToUuid.set(obj, uuid());
    const baseId = dbToUuid.get(obj);
    return `${baseId}-${series}`;
  }
  // src/update-with-retry.ts
    function updateWithRetry({db, lang, series, onUpdateComplete, onUpdateError, setTimeout: setTimeout2 = self.setTimeout, updateNow = false}) {
    startUpdate({
      db,
      lang,
      series,
      setTimeout: setTimeout2,
      onUpdateComplete,
      onUpdateError,
      updateNow
    });
  }
  function runUpdate({db, lang, series, setTimeout: setTimeout2, onUpdateComplete, onUpdateError}) {
    if (!navigator.onLine) {
      const onlineCallback = async () => {
        runUpdate({
          db,
          lang,
          series,
          setTimeout: setTimeout2,
          onUpdateComplete,
          onUpdateError
        });
      };
      addEventListener("online", onlineCallback, {
        once: true
      });
      goOffline({
        db,
        series,
        lang,
        onlineCallback
      });
      onUpdateError == null ? void 0 : onUpdateError({
        error: new OfflineError
      });
      return;
    }
    beginUpdating({
      db,
      series,
      lang
    });
    void (async () => {
      try {
        await db.update({
          series,
          lang
        });
        resetUpdate({
          db,
          series
        });
        if (db.isVerbose) console.log("Successfully completed update.");
        onUpdateComplete == null ? void 0 : onUpdateComplete();
      } catch (e) {
        if (db.isVerbose) console.error("Got error while updating", e);
        let retryCount;
        let nextRetry;
        let suppressError = false;
        const isNetworkError = e instanceof DownloadError;
        if (isNetworkError) {
          const scheduleResult = maybeScheduleRetry({
            db,
            lang,
            series,
            setTimeout: setTimeout2,
            onUpdateComplete,
            onUpdateError
          });
          if (scheduleResult) ({nextRetry, retryCount} = scheduleResult);
        } else if (e && e instanceof Error && e.name === "ConstraintError") {
          const scheduleResult = maybeScheduleIdleRetry({
            db,
            lang,
            series,
            setTimeout: setTimeout2,
            onUpdateComplete,
            onUpdateError
          });
          if (scheduleResult) ({retryCount} = scheduleResult);
          suppressError = !!scheduleResult;
        } else resetUpdate({
          db,
          series
        });
        if (!suppressError && onUpdateError) {
          const error = e instanceof Error ? e : new Error(String(e));
          onUpdateError({
            error,
            nextRetry,
            retryCount
          });
        }
      }
    })();
  }
  function onDatabaseChange({db, series, topic}) {
    if (topic === "deleted") {
      resetUpdate({
        db,
        series
      });
      return;
    }
    const seriesHasProgress = series2 => db[series2].updateState.type === "updating" && db[series2].updateState.fileProgress > 0;
    const downloadedSomething = series === "kanji" ? seriesHasProgress("kanji") || seriesHasProgress("radicals") : seriesHasProgress(series);
    if (downloadedSomething) clearRetryInterval({
      db,
      series
    });
  }
  function cancelUpdateWithRetry({db, series}) {
    resetUpdate({
      db,
      series
    });
  }
  var inProgressUpdates =  new Map;
  function startUpdate({db, lang, series, setTimeout: setTimeout2, onUpdateComplete, onUpdateError, updateNow}) {
    const updateKey = getUpdateKey(db, series);
    let retryState = inProgressUpdates.get(updateKey);
    if (retryState && retryState.lang !== lang) {
      if (db.isVerbose) console.info("Canceling existing call to updateWithRetry because the requested language has changed.");
      resetUpdate({
        db,
        series
      });
    }
    retryState = inProgressUpdates.get(updateKey);
    if (retryState) {
      if (!updateNow) {
        if (db.isVerbose) console.info("Overlapping calls to updateWithRetry. Re-using existing invocation. This could be problematic if different callback functions were passed on each invocation.");
        return;
      }
      if (retryState.type === "offline") {
        if (db.isVerbose) console.info("Deferring forced update. Currently offline.");
        return;
      }
      if (retryState.type === "updating") {
        if (db.isVerbose) console.info("Skipping forced update. Already updating presently.");
        return;
      }
      if (db.isVerbose) console.log("Canceling existing queued retry.");
      resetUpdate({
        db,
        series
      });
    }
    retryState = inProgressUpdates.get(updateKey);
    if (retryState) {
      if (db.isVerbose) console.log("Skipping overlapping auto-retry request.");
      return;
    }
    runUpdate({
      db,
      lang,
      series,
      setTimeout: setTimeout2,
      onUpdateComplete,
      onUpdateError
    });
  }
  function resetUpdate({db, series}) {
    const updateKey = getUpdateKey(db, series);
    const retryState = inProgressUpdates.get(updateKey);
    if (!retryState) return;
    switch (retryState.type) {
     case "offline":
      removeEventListener("online", retryState.onlineCallback);
      break;

     case "waiting-for-timeout":
      clearTimeout(retryState.setTimeoutHandle);
      break;

     case "waiting-for-idle":
      cancelIdleCallback(retryState.requestIdleCallbackHandle);
      break;
    }
    db.removeChangeListener(retryState.changeCallback);
    inProgressUpdates.delete(updateKey);
    db.cancelUpdate(series);
  }
  function goOffline({db, lang, onlineCallback, series}) {
    const updateKey = getUpdateKey(db, series);
    const retryState = inProgressUpdates.get(updateKey);
    if (retryState) resetUpdate({
      db,
      series
    });
    inProgressUpdates.set(updateKey, {
      type: "offline",
      lang,
      onlineCallback,
      changeCallback: getOrRegisterChangeCallback({
        db,
        series
      })
    });
  }
  function beginUpdating({db, lang, series}) {
    const updateKey = getUpdateKey(db, series);
    const retryState = inProgressUpdates.get(updateKey);
    inProgressUpdates.set(updateKey, {
      type: "updating",
      lang,
      changeCallback: getOrRegisterChangeCallback({
        db,
        series
      }),
      retryCount: getRetryCount(retryState),
      retryIntervalMs: getRetryIntervalMs(retryState)
    });
  }
  function maybeScheduleRetry({db, lang, series, setTimeout: setTimeout2, onUpdateComplete, onUpdateError}) {
    const updateKey = getUpdateKey(db, series);
    const retryState = inProgressUpdates.get(updateKey);
    if ((retryState == null ? void 0 : retryState.type) !== "updating") return;
    let retryIntervalMs = retryState.retryIntervalMs;
    if (retryIntervalMs) retryIntervalMs = Math.min(retryIntervalMs * 2, 12 * 60 * 60 * 1e3); else retryIntervalMs = 3e3 + Math.random() * 3e3;
    let retryCount = retryState.retryCount;
    retryCount = typeof retryCount === "number" ? retryCount + 1 : 0;
    if (db.isVerbose) console.log(`Scheduling retry of update in ${retryIntervalMs}ms`);
    const setTimeoutHandle = setTimeout2((() => {
      if (db.isVerbose) console.log("Running automatic retry of update...");
      runUpdate({
        db,
        lang,
        series,
        setTimeout: setTimeout2,
        onUpdateComplete,
        onUpdateError
      });
    }), retryIntervalMs);
    const nextRetry = new Date(Date.now() + retryIntervalMs);
    inProgressUpdates.set(updateKey, {
      type: "waiting-for-timeout",
      lang,
      changeCallback: getOrRegisterChangeCallback({
        db,
        series
      }),
      retryCount,
      retryIntervalMs,
      setTimeoutHandle
    });
    return {
      nextRetry,
      retryCount
    };
  }
  function clearRetryInterval({db, series}) {
    const updateKey = getUpdateKey(db, series);
    const retryState = inProgressUpdates.get(updateKey);
    if ((retryState == null ? void 0 : retryState.type) !== "updating" || !retryState.retryIntervalMs) return;
    inProgressUpdates.set(updateKey, {
      ...retryState,
      retryIntervalMs: void 0,
      retryCount: void 0
    });
  }
  function maybeScheduleIdleRetry({db, lang, series, setTimeout: setTimeout2, onUpdateComplete, onUpdateError}) {
    const updateKey = getUpdateKey(db, series);
    const retryState = inProgressUpdates.get(updateKey);
    if ((retryState == null ? void 0 : retryState.type) !== "updating") return;
    let retryCount = retryState.retryCount;
    if (retryCount && retryCount >= 2) return;
    retryCount = typeof retryCount === "number" ? retryCount + 1 : 0;
    if (db.isVerbose) console.log("Retrying update momentarily");
    const requestIdleCallbackHandle = requestIdleCallback((() => {
      if (db.isVerbose) console.log("Running automatic retry of update...");
      runUpdate({
        db,
        lang,
        series,
        setTimeout: setTimeout2,
        onUpdateComplete,
        onUpdateError
      });
    }), {
      timeout: 2e3
    });
    inProgressUpdates.set(updateKey, {
      type: "waiting-for-idle",
      lang,
      changeCallback: getOrRegisterChangeCallback({
        db,
        series
      }),
      requestIdleCallbackHandle,
      retryCount
    });
    return {
      retryCount
    };
  }
  function getOrRegisterChangeCallback({db, series}) {
    const updateKey = getUpdateKey(db, series);
    const retryState = inProgressUpdates.get(updateKey);
    if (retryState) return retryState.changeCallback;
    const changeCallback = topic => onDatabaseChange({
      db,
      series,
      topic
    });
    db.addChangeListener(changeCallback);
    return changeCallback;
  }
  function getRetryCount(retryState) {
    return (retryState == null ? void 0 : retryState.type) !== "offline" ? retryState == null ? void 0 : retryState.retryCount : void 0;
  }
  function getRetryIntervalMs(retryState) {
    return (retryState == null ? void 0 : retryState.type) === "waiting-for-timeout" || (retryState == null ? void 0 : retryState.type) === "updating" ? retryState == null ? void 0 : retryState.retryIntervalMs : void 0;
  }
  // CONCATENATED MODULE: ./src/utils/request-idle-callback.ts
  // This is in part:
  // - Missing typings for requestIdleCallback
  // - Polyfill for browsers that don't support requestIdleCallback
  // - Polyfill for non-Window contexts (e.g. workers)
  /** @public */ let request_idle_callback_requestIdleCallback;
  /** @public */  let request_idle_callback_cancelIdleCallback;
  if (self.requestIdleCallback && self.cancelIdleCallback) {
    request_idle_callback_requestIdleCallback = self.requestIdleCallback.bind(self);
    request_idle_callback_cancelIdleCallback = self.cancelIdleCallback.bind(self);
  } else {
    request_idle_callback_requestIdleCallback = (callback, options) => {
      // Use half the specified timeout since it probably represents a worst-case
      // scenario.
      const timeout = options ? options.timeout / 2 : 0;
      return self.setTimeout((() => {
        callback({
          timeRemaining: () => 0,
          didTimeout: true
        });
      }), timeout);
    };
    request_idle_callback_cancelIdleCallback = handle => {
      self.clearTimeout(handle);
    };
  }
  /** @public */  function requestIdleCallbackPromise(options) {
    return new Promise((resolve => request_idle_callback_requestIdleCallback((() => {
      resolve();
    }), options)));
  }
  // CONCATENATED MODULE: ./src/utils/serialize-error.ts
  // Convert an error into a form that able to sent with postMessage and that
  // is also compatible with Bugsnag's NotifiableError type.
  function serializeError(error) {
    let name;
    // Occasionally we get an undefined error object. We saw this at least once
    // on Firefox 68. Note sure where it's coming from.
        if (!error) {
      // Generate a stack in the hope of getting some clue where this is coming
      // from.
      let stack;
      try {
        throw new Error("(Unknown error)");
      } catch (e) {
        stack = e.stack;
      }
      return {
        name: "(Unknown error)",
        message: stack || ""
      };
    }
    // We need to be careful not to read the 'code' field unless it's a string
    // because DOMExceptions, for example, have a code field that is a number
    // but what we really want from them is their 'name' field.
        if (typeof error.code === "string") name = error.code; else name = error.name || error.message;
    // Also, if we get a generic "Error" with a more specific message field, we
    // should use that.
        if (name === "Error" && typeof error.message === "string" && error.message.length) name = error.message;
    // Common conversions to more specific/useful error classes.
        if (error instanceof TypeError && error.message.startsWith("NetworkError")) name = "NetworkError";
    if (name === "NetworkError" && !self.navigator.onLine) name = "OfflineError";
    // Set the message to the message field, unless we're already using that as
    // the name.
        let message = error.message || "";
    if (message === name) message = "";
    return {
      name,
      message
    };
  }
  const notifyDbStateUpdated = state => ({
    type: "dbstateupdated",
    state
  });
  const notifyDbUpdateComplete = lastCheck => ({
    type: "dbupdatecomplete",
    lastCheck
  });
  const leaveBreadcrumb = ({message}) => ({
    type: "breadcrumb",
    message
  });
  const notifyError = ({error, severity = "error"}) => ({
    type: "error",
    severity,
    ...serializeError(error),
    stack: error.stack
  });
  // CONCATENATED MODULE: ./src/background/jpdict-backend.ts
  function _define_property(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    }); else obj[key] = value;
    return obj;
  }
  class JpdictLocalBackend {
    addEventListener(listener) {
      if (!this.listeners.includes(listener)) this.listeners.push(listener);
    }
    removeEventListener(listener) {
      this.listeners = this.listeners.filter((l => l !== listener));
    }
    async updateDb({lang, force}) {
      try {
        await this.updateAllSeries({
          lang,
          forceUpdate: force
        });
      } catch (error) {
        this.notifyListeners(notifyError({
          error
        }));
      }
    }
    cancelUpdateDb() {
      if (!this.currentUpdate) return;
      cancelUpdateWithRetry({
        db: this.db,
        series: this.currentUpdate.series
      });
      this.currentUpdate = void 0;
    }
    async deleteDb() {
      if (this.db) try {
        await this.db.destroy();
      } catch (error) {
        this.notifyListeners(notifyError({
          error
        }));
      }
    }
    async queryState() {
      if (await this.dbIsInitialized) this.doDbStateNotification();
    }
    // Implementation helpers
    async initDb() {
      let retryCount = 0;
      while (true) {
        if (this.db) try {
          await this.db.destroy();
        } catch {
          console.log("Failed to destroy previous database");
        }
        try {
          this.db = new JpdictIdb({
            verbose: true
          });
          this.db.addChangeListener(this.doDbStateNotification);
          await this.db.ready;
          return this.db;
        } catch (e) {
          if (retryCount >= 3) {
            console.log("Giving up opening database. Likely in permanent private browsing mode.");
            throw e;
          }
          retryCount++;
          console.log(`Failed to open database. Retrying shortly (attempt: ${retryCount})...`);
          await requestIdleCallbackPromise({
            timeout: 1000
          });
        }
      }
    }
    async updateAllSeries({lang, forceUpdate}) {
      if (!await this.dbIsInitialized) return;
      // Check for a current update
            let wasForcedUpdate = false;
      if (this.currentUpdate) {
        // If the language matches and we're not (newly) forcing an update, then
        // just let the current update run.
        if (this.currentUpdate.lang === lang && (this.currentUpdate.forceUpdate || !forceUpdate)) return;
        // Otherwise, cancel the current update but make sure to propagate the
        // forced flag if we were forced.
                wasForcedUpdate = this.currentUpdate.forceUpdate;
        this.cancelUpdateDb();
        this.currentUpdate = void 0;
      }
      // Firefox 112+ (and presumably Thunderbird 112+) has an unfortunate bug
      // where, when we try to clear an objectStore, it just hangs:
      
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1860486
      
      // Until that bug is fixed (or we replace our database storage entirely), we
      // need to detect when we are likely to want to clear an object store and
      // simply blow away the whole database and replace it.
      
      // That's quite unfortunate because it means we'll need to download all the
      // names data again which is massive but it's better than having the user be
      // stuck.
            if (hasBuggyObjectStoreClear()) {
        // Check if we need to replace the data, i.e. if running an update is
        // likely to try and clear a data series' object store.
        // There are basically two cases where this happens:
        // 1. We are changing the language
        // 2. The major/minor version of a data series has changed
        // Working out if the language is changed is hard. Not all series have all
        // languages so a mismatch between the passed-in `lang` and the series'
        // language doesn't necessarily mean that the language has changed.
        // Instead, if there are _no_ series that match the language we can assume
        // it has changed.
        const langChanged = this.db && this.db.kanji.state === "ok" && this.db.kanji.version?.lang !== lang && this.db.radicals.state === "ok" && this.db.radicals.version?.lang !== lang && this.db.words.state === "ok" && this.db.words.version?.lang !== lang;
        // Working out if the major/minor version has changed is impossible
        // without either:
        
        // 1. Duplicating the logic to download the version info metadata here and
        //    comparing it, or
        
        // 2. Passing some sort of flag into `updateWithRetry` to indicate that
        //    if the version has changed we should replace the database.
        
        // Both are very invasive so we'll just have to commit to not updating the
        // major/minor version until either the bug is fixed in Firefox or we
        // replace our database storage.
                if (langChanged) try {
          this.notifyListeners(leaveBreadcrumb({
            message: "Detected language change on buggy version of Firefox. Replacing database."
          }));
          await this.initDb();
        } catch (error) {
          this.notifyListeners(notifyError({
            error
          }));
        }
      }
      const onUpdateError = series => params => {
        const {error, nextRetry, retryCount} = params;
        if (nextRetry) {
          const diffInMs = nextRetry.getTime() - Date.now();
          this.notifyListeners(leaveBreadcrumb({
            message: `Encountered ${error.name} error updating ${series} database. Retrying in ${diffInMs}ms.`
          }));
          // We don't want to report all download errors since the auto-retry
          // behavior will mean we get too many. Also, we don't care about
          // intermittent failures for users on flaky network connections.
          
          // However, if a lot of clients are failing multiple times to fetch
          // a particular resource, we want to know.
                    if (retryCount === 5) this.notifyListeners(notifyError({
            error,
            severity: "warning"
          }));
        } else if (error.name !== "AbortError" && error.name !== "OfflineError") this.notifyListeners(notifyError({
          error
        })); else this.notifyListeners(leaveBreadcrumb({
          message: `Database update for ${series} database encountered ${error.name} error`
        }));
        this.lastUpdateError = toUpdateErrorState(params);
        this.doDbStateNotification();
      };
      const runNextUpdate = () => {
        // Check if we successfully updated a series
        if (this.currentUpdate) {
          this.lastUpdateError = void 0;
          this.notifyListeners(leaveBreadcrumb({
            message: `Successfully updated ${this.currentUpdate.series} database`
          }));
          this.doDbStateNotification();
        }
        // Cycle through data series
        
        // We use the following order:
        
        // 1. Kanji
        // 2. Names
        // 3. Words
        
        // Although the words dictionary is the most important one, we already have
        // the flat-file version available for words so, if we're going to run out
        // of disk space, it would be good to try and get as much of the other data
        // in first.
                if (!this.currentUpdate) this.currentUpdate = {
          lang,
          series: "kanji",
          forceUpdate: forceUpdate || wasForcedUpdate
        }; else if (this.currentUpdate.series === "kanji") this.currentUpdate.series = "names"; else if (this.currentUpdate.series === "names") this.currentUpdate.series = "words"; else {
          this.currentUpdate = void 0;
          this.notifyListeners(notifyDbUpdateComplete(getLatestCheckTime(this.db)));
          return;
        }
        if (forceUpdate || wasForcedUpdate) clearCachedVersionInfo();
        void updateWithRetry({
          db: this.db,
          series: this.currentUpdate.series,
          lang,
          onUpdateComplete: runNextUpdate,
          onUpdateError: onUpdateError(this.currentUpdate.series)
        });
      };
      runNextUpdate();
    }
    doDbStateNotification() {
      // Wait until we have finished resolving the database versions before
      // reporting anything.
      if (!this.db || this.db.words.state === "init" || this.db.kanji.state === "init" || this.db.radicals.state === "init" || this.db.names.state === "init") return;
      // Merge update states to show the current / latest update
            const lastCheck = getLatestCheckTime(this.db);
      const updateState = this.currentUpdate ? this.db[this.currentUpdate.series].updateState : {
        type: "idle",
        lastCheck
      };
      const state = {
        words: {
          state: this.db.words.state,
          version: this.db.words.version
        },
        kanji: {
          state: this.db.kanji.state,
          version: this.db.kanji.version
        },
        radicals: {
          state: this.db.radicals.state,
          version: this.db.radicals.version
        },
        names: {
          state: this.db.names.state,
          version: this.db.names.version
        },
        updateState,
        updateError: this.lastUpdateError
      };
      this.notifyListeners(notifyDbStateUpdated(state));
    }
    notifyListeners(message) {
      const listenersCopy = this.listeners.slice();
      for (const listener of listenersCopy) listener(message);
    }
    constructor() {
      _define_property(this, "db", void 0);
      _define_property(this, "dbIsInitialized", void 0);
      _define_property(this, "currentUpdate", void 0);
      _define_property(this, "lastUpdateError", void 0);
      _define_property(this, "listeners", []);
      this.doDbStateNotification = this.doDbStateNotification.bind(this);
      this.dbIsInitialized = this.initDb().then((() => true)).catch((() => false));
    }
  }
  function getLatestCheckTime(db) {
    const latestCheckAsNumber = Math.max.apply(null, allMajorDataSeries.map((series => db[series].updateState.lastCheck)));
    return latestCheckAsNumber !== 0 ? new Date(latestCheckAsNumber) : null;
  }
  function hasBuggyObjectStoreClear() {
    const userAgent = navigator.userAgent;
    const firefoxOrThunderbird = /(Firefox|Thunderbird)\/(\d+)/.exec(userAgent);
    if (firefoxOrThunderbird && firefoxOrThunderbird[2]) {
      const version = parseInt(firefoxOrThunderbird[2], 10);
      // The bug has been fixed in Firefox 123.
            return version >= 112 && (firefoxOrThunderbird[1] !== "Firefox" || version < 123);
    }
    return false;
  }
  // CONCATENATED MODULE: ./src/worker/jpdict-worker.ts
  const backend = new JpdictLocalBackend;
  backend.addEventListener((event => {
    try {
      self.postMessage(event);
    } catch (e) {
      console.log("Error posting message");
      console.log(e);
    }
  }));
  self.onmessage = async event => {
    // We seem to get random events here occasionally. Not sure where they come
    // from.
    if (!event.data) return;
    switch (event.data.type) {
     case "querystate":
      void backend.queryState();
      break;

     case "update":
      void backend.updateDb({
        lang: event.data.lang,
        force: event.data.force
      });
      break;

     case "cancelupdate":
      void backend.cancelUpdateDb();
      break;

     case "delete":
      void backend.deleteDb();
      break;
    }
  };
  self.onerror = e => {
    self.postMessage(notifyError({
      error: e.error || e
    }));
  };
})();
//# sourceMappingURL=10ten-ja-jpdict.js.map