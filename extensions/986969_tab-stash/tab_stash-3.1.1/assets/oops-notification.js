var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
import { C as trace_fn, u as browser, a2 as logErrorsFrom, B as reactive, a5 as later, a6 as batchesOf, a7 as event, a8 as logError, r as ref, a9 as watchEffect, aa as backingOff, O as urlToOpen, ab as shortPoll, ac as expect, ad as nonReentrant, l as filterMap, c as computed, ae as tryAgain, af as resolveNamed, ag as AsyncTaskQueue, v as watch, ah as UserError, k as textMatcher, ai as urlToStash, M as Model$8, d as defineComponent, m as createBlock, w as withCtx, x as unref, o as openBlock, e as createBaseVNode, n as normalizeClass, i as withModifiers, s as createTextVNode, t as toDisplayString, b as createElementBlock, g as renderList, aj as errorLog, F as Fragment, ak as clearErrorLog } from "./launch-vue.js";
import { N as Notification } from "./notification.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.js";
function makeRandomString(bytes) {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return btoa(String.fromCharCode(...a)).replace(/=+$/, "");
}
const trace$3 = trace_fn("nano_port", (_a = globalThis == null ? void 0 : globalThis.location) == null ? void 0 : _a.pathname);
class Port {
  constructor(name, port) {
    __publicField(this, "name");
    __publicField(this, "defaultTimeoutMS", 3e4);
    __publicField(this, "onDisconnect");
    __publicField(this, "onRequest");
    __publicField(this, "onNotify");
    __publicField(this, "port");
    __publicField(this, "pending", /* @__PURE__ */ new Map());
    this.name = name;
    this.port = port;
    this.port.onDisconnect.addListener(() => {
      this._trace("disconnected");
      this._flushPendingOnDisconnect();
      if (this.onDisconnect) this.onDisconnect(this);
    });
    this.port.onMessage.addListener((msg2) => {
      this._trace("recv", msg2);
      if (typeof msg2 !== "object") return;
      if ("tag" in msg2) {
        if ("request" in msg2) {
          logErrorsFrom(() => this._handleRequest(msg2));
        } else if ("response" in msg2 || "error" in msg2) {
          this._handleResponse(msg2);
        }
      } else if ("notify" in msg2) {
        if (this.onNotify) this.onNotify(msg2.notify);
        else {
          if (this.onRequest) this.onRequest(msg2.notify);
        }
      }
    });
    this._trace("create");
  }
  static connect(name) {
    trace$3("connect", name);
    return new Port(name, browser.runtime.connect(void 0, { name }));
  }
  disconnect() {
    this._trace("disconnect");
    this.port.disconnect();
    this._flushPendingOnDisconnect();
    if (this.onDisconnect) this.onDisconnect(this);
  }
  request(request, options) {
    return new Promise((resolve, reject) => {
      let tag = makeRandomString(4);
      while (this.pending.has(tag)) tag = makeRandomString(4);
      this._trace("send", { tag, request });
      try {
        this.port.postMessage({ tag, request });
      } catch (e) {
        this.disconnect();
        throw e;
      }
      this.pending.set(tag, {
        resolve,
        reject,
        timeout_id: setTimeout(() => {
          this.pending.delete(tag);
          reject(new NanoTimeoutError(this.name, request, tag));
        }, (options == null ? void 0 : options.timeout_ms) ?? this.defaultTimeoutMS)
      });
    });
  }
  notify(notify) {
    try {
      this._trace("send", { notify });
      this.port.postMessage({ notify });
    } catch (e) {
      this.disconnect();
    }
  }
  _flushPendingOnDisconnect() {
    for (const [tag, pending] of this.pending) {
      this._trace("flush on disconnect", tag);
      pending.reject(new NanoDisconnectedError(this.name, tag));
      clearTimeout(pending.timeout_id);
    }
    this.pending.clear();
  }
  async _handleRequest(msg2) {
    let res;
    try {
      if (!this.onRequest) await not_implemented();
      res = { response: await this.onRequest(msg2.request) };
    } catch (e) {
      let data;
      try {
        data = JSON.parse(JSON.stringify(e));
      } catch (ee) {
        data = `${e}`;
      }
      if (e instanceof Error) {
        res = {
          error: {
            name: e.name,
            message: e.message,
            stack: e.stack,
            data
          }
        };
      } else if (e instanceof Object) {
        res = { error: { name: e.constructor.name, data } };
      } else {
        res = { error: { name: "", data } };
      }
    }
    const resmsg = { tag: msg2.tag, ...res };
    try {
      this._trace("send", resmsg);
      this.port.postMessage(resmsg);
    } catch (e) {
      this._trace("dropped reply to request:", msg2, "error:", e);
    }
  }
  _handleResponse(msg2) {
    const handler = this.pending.get(msg2.tag);
    if (!handler) return;
    clearTimeout(handler.timeout_id);
    if ("response" in msg2) {
      handler.resolve(msg2.response);
    } else {
      handler.reject(new RemoteNanoError(msg2.error));
    }
  }
  _trace(...args) {
    trace$3(`[${this.name}]`, ...args);
  }
}
function not_implemented() {
  const e = new Error("No request handler defined");
  e.name = "NotImplemented";
  return Promise.reject(e);
}
function connect(name) {
  return Port.connect(name);
}
class RemoteNanoError extends Error {
  constructor(remote) {
    super(remote.message);
    __publicField(this, "remote");
    this.remote = remote;
  }
  get name() {
    return this.remote.name;
  }
  get stack() {
    return `[remote stack] ${this.remote.stack}`;
  }
  get data() {
    return this.remote.data;
  }
}
class NanoPortError extends Error {
}
class NanoTimeoutError extends NanoPortError {
  constructor(portName, request, tag) {
    super(`${portName}: Request timed out`);
    __publicField(this, "portName");
    __publicField(this, "request");
    __publicField(this, "tag");
    this.portName = portName;
    this.name = "NanoTimeoutError";
    this.request = request;
    this.tag = tag;
  }
}
class NanoDisconnectedError extends NanoPortError {
  constructor(portName, tag) {
    super(`${portName}: Port was disconnected while waiting for response`);
    __publicField(this, "portName");
    __publicField(this, "tag");
    this.portName = portName;
    this.name = "NanoDisconnectedError";
    this.tag = tag;
  }
}
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
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
const transactionDoneMap = /* @__PURE__ */ new WeakMap();
const transformCache = /* @__PURE__ */ new WeakMap();
const reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
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
  reverseTransformCache.set(promise, request);
  return promise;
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
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(this.request);
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
const advanceMethodProps = ["continue", "continuePrimaryKey", "advance"];
const methodMap = {};
const advanceResults = /* @__PURE__ */ new WeakMap();
const ittrProxiedCursorToOriginalProxy = /* @__PURE__ */ new WeakMap();
const cursorIteratorTraps = {
  get(target, prop) {
    if (!advanceMethodProps.includes(prop))
      return target[prop];
    let cachedFunc = methodMap[prop];
    if (!cachedFunc) {
      cachedFunc = methodMap[prop] = function(...args) {
        advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
      };
    }
    return cachedFunc;
  }
};
async function* iterate(...args) {
  let cursor = this;
  if (!(cursor instanceof IDBCursor)) {
    cursor = await cursor.openCursor(...args);
  }
  if (!cursor)
    return;
  cursor = cursor;
  const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
  ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
  reverseTransformCache.set(proxiedCursor, unwrap(cursor));
  while (cursor) {
    yield proxiedCursor;
    cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
    advanceResults.delete(proxiedCursor);
  }
}
function isIteratorProp(target, prop) {
  return prop === Symbol.asyncIterator && instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor]) || prop === "iterate" && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get(target, prop, receiver) {
    if (isIteratorProp(target, prop))
      return iterate;
    return oldTraps.get(target, prop, receiver);
  },
  has(target, prop) {
    return isIteratorProp(target, prop) || oldTraps.has(target, prop);
  }
}));
class KVSCache {
  constructor(kvs) {
    /** The underlying KVS which is backing the KVSCache.  If is perfectly fine
     * to do calls directly against ths KVS if you need to do something not
     * supported by the KVSCache, however some inconsistency with the cache may
     * result. */
    __publicField(this, "kvs");
    __publicField(this, "_entries", /* @__PURE__ */ new Map());
    __publicField(this, "_needs_flush", /* @__PURE__ */ new Map());
    __publicField(this, "_needs_fetch", /* @__PURE__ */ new Map());
    __publicField(this, "_pending_io", null);
    __publicField(this, "_crash_count", 0);
    this.kvs = kvs;
    this.kvs.onSet.addListener((entries) => {
      for (const e of entries) this._update(e.key, e.value);
    });
    this.kvs.onSyncLost.addListener(() => {
      for (const [k, v] of this._entries) {
        v.value = void 0;
        this._needs_fetch.set(k, v);
      }
      this._io();
    });
  }
  /** Returns an entry from the KVS.  If the entry isn't in cache yet (or
   * isn't in the KVS at all), the entry's value will be `null` and the entry
   * will be fetched in the background.  The returned entry is reactive, so it
   * will be updated once the value is available. */
  get(key) {
    let e = this._entries.get(key);
    if (!e) {
      e = reactive({ key, value: void 0 });
      this._entries.set(key, e);
      this._needs_fetch.set(key, e);
      this._io();
    }
    return e;
  }
  /** Returns an entry from the KVS, but only if it already
   * exists in the store. */
  getIfExists(key) {
    return this._entries.get(key);
  }
  /** Updates an entry in the KVS.  The cache is updated immediately, but
   * entries will be flushed in the background. */
  set(key, value) {
    const ent = this.get(key);
    ent.value = value;
    this._needs_flush.set(key, ent);
    this._needs_fetch.delete(key);
    this._io();
    return ent;
  }
  /** Merges an entry in the KVS by fetching the item if it's not present in
   * the cache already, calling merge() with the old value, and setting the
   * result back into the cache.
   *
   * Note that the returned cache entry may be stale--if the entry wasn't
   * present in the cache previously, it will be fetched and merged in the
   * background.
   *
   * Also note that no attempt is made to ensure any kind of consistency--in
   * particular, merge() itself may still be called with stale data, there
   * could be multiple pending merges for the same entry, etc.  In general,
   * this should not be a problem IF merge() is idempotent--eventually the
   * cache should converge on the "right" value. */
  merge(key, merge) {
    const ent = this.get(key);
    const doMerge = () => {
      ent.value = merge(ent.value);
      this._needs_flush.set(key, ent);
      this._needs_fetch.delete(key);
      this._io();
    };
    if (ent.value !== void 0) {
      doMerge();
    } else {
      this._needs_fetch.set(key, ent);
      this._io().then(doMerge);
    }
    return ent;
  }
  /** If `key` is not present in the KVS, adds `key` with `value`.  But if key
   * is already present, does nothing--that is, the `value` provided here will
   * not override any pre-existing value.
   *
   * If the value isn't loaded yet, the returned entry may momentarily appear
   * to have the provided value.
   *
   * Note that this is inherently racy; it's possible that in some situations,
   * maybeInsert() will still overwrite another recently-written value. */
  maybeInsert(key, value) {
    const ent = this.get(key);
    if (ent.value !== void 0) return ent;
    ent.value = value;
    this._needs_fetch.set(key, ent);
    this._needs_flush.set(key, ent);
    this._io();
    return ent;
  }
  /** Returns a promise that resolves once the cache has performed all pending
   * I/O to/from its underlying KVS. */
  sync() {
    if (this._pending_io) return this._pending_io;
    return Promise.resolve();
  }
  /** Apply an update to an entry that was received from the service (which
   * always overrides any pending flush for that entry). */
  _update(key, value) {
    const ent = this._entries.get(key);
    if (!ent) return;
    ent.value = value;
    this._needs_fetch.delete(key);
    this._needs_flush.delete(key);
  }
  _io() {
    if (this._pending_io) return this._pending_io;
    if (this._crash_count >= 3) return Promise.resolve();
    this._pending_io = new Promise(
      (resolve) => later(
        () => logErrorsFrom(async () => {
          while (this._needs_fetch.size > 0 || this._needs_flush.size > 0) {
            await this._fetch();
            await this._flush();
          }
        }).catch((e) => {
          ++this._crash_count;
          if (this._crash_count >= 3) {
            console.warn(
              `KVC[${this.kvs.name}]: Crashed too many times during I/O; stopping.`
            );
          }
          throw e;
        }).finally(() => {
          this._pending_io = null;
          resolve();
        })
      )
    );
    return this._pending_io;
  }
  async _fetch() {
    const map = this._needs_fetch;
    this._needs_fetch = /* @__PURE__ */ new Map();
    for (const batch of batchesOf(25, map.keys())) {
      const entries = await this.kvs.get(batch);
      for (const e of entries) this._update(e.key, e.value);
    }
  }
  async _flush() {
    const map = this._needs_flush;
    this._needs_flush = /* @__PURE__ */ new Map();
    for (const batch of batchesOf(25, map.values())) {
      const dirty = JSON.parse(JSON.stringify(batch));
      await this.kvs.set(dirty);
    }
  }
}
async function* genericList(getChunk) {
  let bound;
  while (true) {
    const res = await getChunk(bound, 100);
    if (res.length == 0) break;
    yield* res;
    bound = res[res.length - 1].key;
  }
}
class Client {
  constructor(service_name, connector) {
    __publicField(this, "name");
    __publicField(this, "connect");
    __publicField(this, "onSet");
    __publicField(this, "onSyncLost");
    __publicField(this, "_port");
    this.name = service_name;
    this.connect = connector ?? connect;
    this.onSet = event("KVS.Client.onSet", this.name);
    this.onSyncLost = event("KVS.Client.onSyncLost", this.name);
    this._port = void 0;
    this._reconnect();
  }
  async get(keys) {
    const resp = await this._request_with_retry({ $type: "get", keys });
    if ((resp == null ? void 0 : resp.$type) !== "entries") return [];
    return resp.entries;
  }
  async getStartingFrom(bound, limit) {
    const resp = await this._request_with_retry({
      $type: "getStartingFrom",
      bound,
      limit
    });
    if ((resp == null ? void 0 : resp.$type) !== "entries") return [];
    return resp.entries;
  }
  async getEndingAt(bound, limit) {
    const resp = await this._request_with_retry({
      $type: "getEndingAt",
      bound,
      limit
    });
    if ((resp == null ? void 0 : resp.$type) !== "entries") return [];
    return resp.entries;
  }
  list() {
    return genericList((bound, limit) => this.getStartingFrom(bound, limit));
  }
  listReverse() {
    return genericList((bound, limit) => this.getEndingAt(bound, limit));
  }
  async set(entries) {
    await this._request_with_retry({ $type: "set", entries });
  }
  async deleteAll() {
    await this._request_with_retry({ $type: "deleteAll" });
  }
  _reconnect() {
    this._port = this.connect(this.name);
    this._port.onNotify = (msg2) => {
      if (!msg2) return;
      switch (msg2.$type) {
        case "set":
          this.onSet.send(msg2.entries);
          break;
      }
    };
    this._port.onDisconnect = () => {
      this._reconnect();
      this.onSyncLost.send();
    };
  }
  async _request_with_retry(msg2) {
    let retries = 10;
    while (true) {
      try {
        return await this._port.request(msg2);
      } catch (e) {
        if (!(e instanceof NanoPortError)) throw e;
        if (retries <= 0) throw e;
        await new Promise((r) => setTimeout(r, (10 - retries) * 100));
        --retries;
      }
    }
  }
}
const CUR_WINDOW_MD_ID = "";
let Model$7 = class Model {
  constructor(kvc) {
    __publicField(this, "_kvc");
    this._kvc = kvc;
  }
  get(id) {
    return this._kvc.get(id);
  }
  set(id, metadata) {
    return this._kvc.set(id, metadata);
  }
  setCollapsed(id, collapsed) {
    this.set(id, { ...this.get(id).value || {}, collapsed });
  }
  /** Remove metadata for bookmarks for whom `keep(id)` returns false. */
  async gc(keep) {
    const toDelete = [];
    for await (const ent of this._kvc.kvs.list()) {
      if (keep(ent.key)) continue;
      toDelete.push({ key: ent.key });
    }
    await this._kvc.kvs.set(toDelete);
  }
};
class EventWiring {
  constructor(model, options) {
    __publicField(this, "model");
    __publicField(this, "options");
    this.model = model;
    this.options = options;
  }
  listen(ev, fn) {
    const f = fn.bind(this.model);
    const handler = (...args) => {
      try {
        this.options.onFired();
        return f(...args);
      } catch (e) {
        logError(e);
        this.options.onError(e);
        throw e;
      }
    };
    ev.addListener(handler);
    return handler;
  }
}
function isChildInParent(node, parent) {
  var _a2;
  let item = node;
  while (item) {
    if (item === parent) return true;
    item = (_a2 = item.position) == null ? void 0 : _a2.parent;
  }
  return false;
}
function pathTo(node) {
  const path = [];
  while (true) {
    const pos = node.position;
    if (!pos) break;
    path.push(pos);
    node = pos.parent;
  }
  path.reverse();
  return path;
}
function placeNode(node, newPosition) {
  const newChildren = newPosition.parent.children;
  if (node.position) throw new Error(`Can't add node that's already in a tree`);
  if (newPosition.index < 0) {
    throw new Error(`Index ${newPosition.index} out of bounds`);
  }
  if (newPosition.index > newChildren.length && newPosition.parent.isLoaded) {
    throw new Error(
      `Index ${newPosition.index} is past the end of a fully-loaded parent`
    );
  }
  if (newChildren[newPosition.index] !== void 0) {
    throw new Error(`Node already exists at index ${newPosition.index}`);
  }
  while (newPosition.index >= newChildren.length) newChildren.push(void 0);
  newChildren[newPosition.index] = node;
  node.position = newPosition;
}
function insertNode(node, newPosition) {
  const newChildren = newPosition.parent.children;
  if (node && node.position) {
    throw new Error(`Can't add node that's already in a tree`);
  }
  if (newPosition.index < 0) {
    throw new Error(`Index ${newPosition.index} out of bounds`);
  }
  if (newPosition.index > newChildren.length) {
    if (newPosition.parent.isLoaded) {
      throw new Error(
        `Index ${newPosition.index} is past the end of a fully-loaded parent`
      );
    }
    while (newPosition.index > newChildren.length) newChildren.push(void 0);
  }
  newChildren.splice(newPosition.index, 0, node);
  for (let i = newPosition.index + 1; i < newChildren.length; ++i) {
    const nc = newChildren[i];
    if (nc) nc.position.index = i;
  }
  if (node) node.position = newPosition;
}
function removeNode(position) {
  const node = position.parent.children[position.index];
  const oldChildren = position.parent.children;
  oldChildren.splice(position.index, 1);
  for (let i = position.index; i < oldChildren.length; ++i) {
    const oc = oldChildren[i];
    if (oc) oc.position.index = i;
  }
  if (node) node.position = void 0;
}
function forEachNodeInSubtree(subtree, isParent, f) {
  f(subtree);
  if (!isParent(subtree)) return;
  for (const c of subtree.children) if (c) forEachNodeInSubtree(c, isParent, f);
}
function isBookmark$1(node) {
  return "url" in node;
}
function isFolder$1(node) {
  return "children" in node;
}
const trace$2 = trace_fn("bookmarks");
const STASH_ROOT = "Tab Stash";
const ROOT_FOLDER_HELP = "https://github.com/josh-berry/tab-stash/wiki/Problems-Locating-the-Tab-Stash-Bookmark-Folder";
let Model$6 = class Model2 {
  constructor(stash_root_name) {
    __publicField(this, "by_id", /* @__PURE__ */ new Map());
    __publicField(this, "by_url", /* @__PURE__ */ new Map());
    /** The root node of the bookmark tree. Contains all other bookmarks, in and
     * out of the stash. (You probably want `stash_root` instead.) The bookmark
     * tree is, in general, loaded lazily; it's possible that folders with
     * unloaded elements will have `undefined` children. See the Folder and
     * LoadedFolder types for more details. */
    __publicField(this, "root");
    /** The title to look for to locate the stash root. */
    __publicField(this, "stash_root_name");
    /** A Vue ref to the root folder for Tab Stash's saved tabs. This is updated
     * lazily as the model detects events that might cause the stash root to
     * change. An update can also be triggered by calling findStashRoot().
     *
     * Whenever `stash_root` changes, the model will load the entire sub-tree
     * under the new `stash_root` in the background.  There is generally no need
     * to trigger loading manually. */
    __publicField(this, "stash_root", ref());
    /** If set, there is more than one candidate stash root, and it's not clear
     * which one to use.  The contents of the warning are an error to show the
     * user and a function to direct them to more information. */
    __publicField(this, "stash_root_warning", ref());
    /** Tracks nodes which are candidates to be the stash root, and their parents
     * (up to the root).  Any changes to these nodes will trigger recomputation of
     * the stash root in the background. */
    __publicField(this, "_stash_root_watch", /* @__PURE__ */ new Set());
    /** Folders which we are in the middle of loading. */
    __publicField(this, "_loading", /* @__PURE__ */ new Map());
    /* c8 ignore stop */
    /** Reload all bookmark data we know about from the browser.  This can help in
     * crash-recovery or inconsistency situations where something has gone wrong
     * and we don't know why. */
    __publicField(this, "reload", backingOff(async () => {
      for (const node of this.by_id.values()) {
        let btn;
        try {
          btn = await browser.bookmarks.get(node.id);
        } catch (e) {
          btn = [];
        }
        if (btn.length === 1) {
          this._updateNode(node, btn[0]);
        } else {
          this.whenBookmarkRemoved(node.id);
        }
      }
      for (const node of this.by_id.values()) {
        if (!isFolder$1(node)) continue;
        node.isLoaded = false;
        await this.loaded(node);
      }
    }));
    /** Updates the stash root, if appropriate. */
    __publicField(this, "_maybeUpdateStashRoot", nonReentrant(async () => {
      await this._findRoots();
    }));
    this.stash_root_name = stash_root_name;
    const wiring = new EventWiring(this, {
      onFired: () => {
      },
      /* c8 ignore next 3 -- safety net for recovering from bugs */
      onError: () => {
        logErrorsFrom(() => this.reload());
      }
    });
    wiring.listen(browser.bookmarks.onCreated, this.whenBookmarkCreated);
    wiring.listen(browser.bookmarks.onChanged, this.whenBookmarkChanged);
    wiring.listen(browser.bookmarks.onMoved, this.whenBookmarkMoved);
    wiring.listen(browser.bookmarks.onRemoved, this.whenBookmarkRemoved);
  }
  //
  // Loading data and wiring up events
  //
  /** Construct a model by loading bookmarks from the browser bookmark store.
   * It will listen for bookmark events to keep itself updated.
   *
   * To start, we eagerly load the root of the bookmark tree and its children
   * (e.g.  the bookmarks toolbar and menu).  We also load just enough to find
   * the stash root, but we do not eagerly load anything else (not even the
   * stash root).  A background load of the stash root is triggered
   * automatically, but likely will not finish by the time from_browser()
   * returns. */
  static async from_browser(stash_root_name_test_only) {
    if (!stash_root_name_test_only) stash_root_name_test_only = STASH_ROOT;
    const model = new Model2(stash_root_name_test_only);
    await model._findRoots();
    watchEffect(() => {
      if (!model.stash_root.value) return;
      if (model.stash_root.value.$recursiveStats.isLoaded) return;
      logErrorsFrom(() => model.loadedStash());
    });
    return model;
  }
  /* c8 ignore start -- for manual debugging only */
  dumpState() {
    var _a2, _b;
    const state = (n) => {
      var _a3, _b2, _c;
      if (n === void 0) return null;
      return {
        id: n.id,
        title: n.title,
        parentId: (_b2 = (_a3 = n.position) == null ? void 0 : _a3.parent) == null ? void 0 : _b2.id,
        index: (_c = n.position) == null ? void 0 : _c.index,
        ...isBookmark$1(n) ? { url: n.url } : {},
        ...isFolder$1(n) ? { children: n.children.map(state) } : {}
      };
    };
    return {
      root: (_a2 = this.root) == null ? void 0 : _a2.id,
      stash_root: (_b = this.stash_root.value) == null ? void 0 : _b.id,
      bookmarks: state(this.root)
    };
  }
  //
  // Accessors
  //
  /** Retrieves the node with the specified ID (if it exists). */
  node(id) {
    return this.by_id.get(id);
  }
  /** Retrieves the bookmark with the specified ID.  Returns `undefined` if it
   * does not exist or is not a bookmark. */
  bookmark(id) {
    const node = this.node(id);
    if (node && isBookmark$1(node)) return node;
    return void 0;
  }
  /** Retrieves the folder with the specified ID.  Returns `undefined` if it
   * does not exist or is not a folder. Note that the folder may not be
   * fully-loaded (that is, not all its children may be available). If you want
   * a LoadedFolder, combine this with `loaded()`. */
  folder(id) {
    const node = this.node(id);
    if (node && isFolder$1(node)) return node;
    return void 0;
  }
  /** Ensures the passed-in folder is fully-loaded, and returns it. Note that
   * this is NOT recursive, that is, child folders may still not be
   * fully-loaded. */
  loaded(folder) {
    if (folder.isLoaded) return Promise.resolve(folder);
    return this._run_loader(folder, async () => {
      const children = await browser.bookmarks.getChildren(folder.id);
      for (const c of children) this._upsertNode(c);
      folder.isLoaded = true;
      return folder;
    });
  }
  /** Ensures the entire subtree underneath _folder_ is fully-loaded. */
  loadedSubtree(folder) {
    if (folder.$recursiveStats.isLoaded) {
      return Promise.resolve(folder);
    }
    if (folder.children.length > 0) {
      return (async () => {
        const lf = await this.loaded(folder);
        for (const f of lf.children) {
          if (isFolder$1(f)) await this.loadedSubtree(f);
        }
        return lf;
      })();
    }
    let start = Date.now();
    return this._run_loader(folder, async () => {
      const f = await browser.bookmarks.getSubTree(folder.id);
      const upsertAsync = async (parent, children) => {
        const child_ps = [];
        if (Date.now() - start >= 25) {
          await new Promise((r) => setTimeout(r));
          start = Date.now();
        }
        for (const n of children) {
          const f2 = this._upsertNode(n);
          const c = n.children;
          if (!c) continue;
          child_ps.push(this._run_loader(f2, () => upsertAsync(f2, c)));
        }
        parent.isLoaded = true;
        await Promise.all(child_ps);
        return parent;
      };
      if (f[0].children) await upsertAsync(folder, f[0].children);
      return folder;
    });
  }
  /** Ensures the entire stash is loaded, if it exists, and returns the root of
   * the stash. */
  async loadedStash() {
    if (!this.stash_root.value) return;
    await this.loaded(this.stash_root.value);
    return await this.loadedSubtree(this.stash_root.value);
  }
  _run_loader(folder, loader) {
    let p = this._loading.get(folder);
    if (p) return p;
    trace$2("loading", folder.id);
    p = loader();
    this._loading.set(folder, p);
    return p.finally(() => {
      this._loading.delete(folder);
    });
  }
  /** Returns a (reactive) set of bookmarks with the specified URL that are
   * currently loaded in the model. */
  loadedBookmarksWithURL(url) {
    let index = this.by_url.get(urlToOpen(url));
    if (!index) {
      index = reactive(/* @__PURE__ */ new Set());
      this.by_url.set(urlToOpen(url), index);
    }
    return index;
  }
  /** Check if `node` is contained, directly or indirectly, by the stash root.
   * If there is no stash root, always returns `false`. */
  isNodeInStashRoot(node) {
    if (!this.stash_root.value) return false;
    return isChildInParent(node, this.stash_root.value);
  }
  /** Returns true if a particular URL is present in the stash in a bookmark
   * that is currently loaded in the model. */
  isURLLoadedInStash(url) {
    const stash_root = this.stash_root.value;
    if (!stash_root) return false;
    for (const bm of this.loadedBookmarksWithURL(url)) {
      if (this.isNodeInStashRoot(bm)) return true;
    }
    return false;
  }
  /** Given a URL, find and return all the currently-loaded folders under the
   * stash root which contain bookmarks with that URL.  (This is used by the UI
   * to show "Stashed in ..." tooltips on tabs.) */
  loadedFoldersInStashWithURL(url) {
    var _a2;
    const stash_root = this.stash_root.value;
    if (!stash_root) return [];
    const ret = [];
    for (const bm of this.loadedBookmarksWithURL(url)) {
      const parent = (_a2 = bm.position) == null ? void 0 : _a2.parent;
      if (!parent) continue;
      if (!isChildInParent(parent, stash_root)) continue;
      ret.push(parent);
    }
    return ret;
  }
  /** Return all the URLs present in the stash root. */
  async urlsInStash() {
    const urls = /* @__PURE__ */ new Set();
    const urlsInChildren = (folder) => {
      for (const c of folder.children) {
        if (!c) {
          throw new Error(`BUG: Some children are missing from ${folder.id}`);
        }
        if (isBookmark$1(c)) urls.add(c.url);
        else if (isFolder$1(c)) urlsInChildren(c);
      }
    };
    const stash = await this.loadedStash();
    if (stash) urlsInChildren(stash);
    return urls;
  }
  //
  // Mutators
  //
  /** Creates a bookmark and waits for the model to reflect the creation.
   * Returns the bookmark node in the model. */
  async create(bm) {
    const ret = await browser.bookmarks.create(bm);
    return await shortPoll(() => {
      const bm2 = this.by_id.get(ret.id);
      if (!bm2) tryAgain();
      return bm2;
    });
  }
  /** Creates a bookmark folder and waits for the model to see it. */
  createFolder(opts) {
    return this.create({
      title: opts.title,
      parentId: opts.parent.id,
      index: opts.index
    });
  }
  /** Updates a bookmark's title and waits for the model to reflect the
   * update. */
  async rename(bm, title) {
    await browser.bookmarks.update(bm.id, { title });
    await shortPoll(() => {
      if (bm.title !== title) tryAgain();
    });
  }
  /** Deletes a bookmark and waits for the model to reflect the deletion.
   *
   * If the node is part of the stash and belongs to an unnamed folder which
   * is now empty, cleanup that folder as well.
   */
  async remove(node) {
    const pos = node.position;
    await browser.bookmarks.remove(node.id);
    await shortPoll(() => {
      if (this.by_id.has(node.id)) tryAgain();
    });
    if (pos) await this.maybeCleanupEmptyFolder(pos.parent);
  }
  /** Deletes an entire tree of bookmarks and waits for the model to reflect
   * the deletion. */
  async removeTree(node) {
    await browser.bookmarks.removeTree(node.id);
    await shortPoll(() => {
      if (this.by_id.has(node.id)) tryAgain();
    });
  }
  /** Moves a bookmark such that it precedes the item with index `toIndex` in
   * the destination folder.  (You can pass an index `>=` the length of the
   * bookmark folder's children to move the item to the end of the folder.)
   *
   * Use this instead of `browser.bookmarks.move()`, which behaves differently
   * in Chrome and Firefox... */
  async move(node, toParent, toIndex) {
    const position = expect(
      node.position,
      () => `Unable to locate node ${node.id} in its parent`
    );
    toIndex = Math.min(toParent.children.length, Math.max(0, toIndex));
    if (!!browser.runtime.getBrowserInfo) {
      if (position.parent === toParent) {
        if (toIndex > position.index) toIndex--;
      }
    }
    await browser.bookmarks.move(node.id, {
      parentId: toParent.id,
      index: toIndex
    });
    await shortPoll(() => {
      const pos = node.position;
      if (!pos) tryAgain();
      if (pos.parent !== toParent || pos.index !== toIndex) tryAgain();
    });
    await this.maybeCleanupEmptyFolder(position.parent);
  }
  /** Find and return the stash root, or create one if it doesn't exist. */
  async ensureStashRoot() {
    if (this.stash_root.value) return this.stash_root.value;
    trace$2("creating new stash root");
    await browser.bookmarks.create({ title: this.stash_root_name });
    const start = Date.now();
    let delay = 20;
    let candidates = await this._findRoots();
    while (Date.now() - start < delay) {
      if (candidates.length > 1) {
        trace$2(
          "race detected; winner = ",
          candidates[0].id,
          "loser = ",
          candidates[1].id
        );
        await this.remove(candidates[1]).catch(() => {
        });
        delay += 10;
      }
      await new Promise((r) => setTimeout(r, 5 * Math.random()));
      candidates = await this._findRoots();
    }
    trace$2("converged on stash root = ", candidates[0].id);
    return candidates[0];
  }
  /** Create a new folder at the top of the stash root (creating the stash
   * root itself if it does not exist).  If the name is not specified, a
   * default name will be assigned based on the folder's creation time. */
  async createStashFolder(name, parent, position) {
    const stash_root = await this.ensureStashRoot();
    parent ?? (parent = stash_root);
    position ?? (position = "top");
    const bm = await this.create({
      parentId: parent.id,
      title: name ?? genDefaultFolderName(/* @__PURE__ */ new Date()),
      // !-cast: this.create() will check the existence of the parent for us
      index: position === "top" ? 0 : parent.children.length
    });
    return bm;
  }
  /** Removes the folder if it is empty, unnamed and within the stash root. */
  async maybeCleanupEmptyFolder(folder) {
    if (getDefaultFolderNameISODate(folder.title) === null) return;
    if (folder.children.length > 0) return;
    if (!this.stash_root.value) return;
    if (!isChildInParent(folder, this.stash_root.value)) return;
    await this.remove(folder);
  }
  //
  // Events which are detected automatically by this model; these can be
  // called for testing purposes but otherwise you can ignore them.
  //
  // (In contrast to onFoo-style things, they are event listeners, not event
  // senders.)
  //
  whenBookmarkCreated(id, new_bm) {
    trace$2("whenBookmarkCreated", new_bm);
    if (id !== new_bm.id) throw new Error(`Bookmark IDs don't match`);
    this._upsertNode(new_bm, "shift-if-new");
  }
  whenBookmarkChanged(id, info) {
    trace$2("whenBookmarkChanged", id, info);
    const node = this.node(id);
    if (!node) {
      if (info.title === this.stash_root_name) this._maybeUpdateStashRoot();
      return;
    }
    this._updateNode(node, info);
  }
  whenBookmarkMoved(id, info) {
    trace$2("whenBookmarkMoved", id, info);
    const node = this.node(id);
    const parent = this.folder(info.parentId);
    if (node) {
      if (node.position) removeNode(node.position);
      if (parent) insertNode(node, { parent, index: info.index });
      if (this._stash_root_watch.has(node)) this._maybeUpdateStashRoot();
    } else if (parent) {
      insertNode(void 0, { parent, index: info.index });
      parent.isLoaded = false;
    }
  }
  whenBookmarkRemoved(id) {
    trace$2("whenBookmarkRemoved", id);
    const node = this.by_id.get(id);
    if (!node) return;
    if (isFolder$1(node)) {
      for (const c of Array.from(node.children)) {
        if (c) this.whenBookmarkRemoved(c.id);
      }
    }
    if (node.position) removeNode(node.position);
    this.by_id.delete(node.id);
    if (isBookmark$1(node)) this._remove_url(node);
    if (this._stash_root_watch.has(node)) {
      this._stash_root_watch.delete(node);
      this._maybeUpdateStashRoot();
    }
  }
  /** Finds the bookmark root and stash root, updates `this.root` and
   * `this.stash_root`, and returns a sorted list of candidate folders that
   * could have been used for the stash root.
   *
   * A folder is used for the stash root if it has the right name, and is the
   * closest folder to the root with that name. Ties are broken in favor of the
   * oldest folder, or folders are the same age, the folder with the lowest ID.
   *
   * This function is quite expensive, since it calls out to the browser
   * multiple times, so it should be used quite sparingly.  Unless you need the
   * candidates for some reason, you probably want `_maybeUpdateStashRoot()`
   * instead. */
  async _findRoots() {
    const searched = (await browser.bookmarks.search(this.stash_root_name)).filter((c) => isBrowserBTNFolder(c) && c.title === this.stash_root_name);
    trace$2("_findRoots", searched.length, "folders named", this.stash_root_name);
    let to_fetch = new Set(searched.map((c) => c.parentId));
    let to_upsert = Array.from(searched);
    while (to_fetch.size > 0) {
      trace$2("_findRoots fetching", to_fetch);
      const bms = await browser.bookmarks.get(Array.from(to_fetch));
      to_fetch = /* @__PURE__ */ new Set();
      for (const b of bms) {
        if (b.parentId !== void 0) to_fetch.add(b.parentId);
        to_upsert.push(b);
      }
    }
    this._stash_root_watch = /* @__PURE__ */ new Set();
    to_upsert.reverse();
    for (const b of to_upsert) {
      const node = this._upsertNode(b);
      if (b.parentId === void 0) this.root = node;
      this._stash_root_watch.add(node);
    }
    let candidates = filterMap(searched, (s) => this.folder(s.id));
    const paths = filterMap(candidates, (c) => ({
      folder: c,
      path: pathTo(c)
    }));
    const depth = Math.min(...paths.map((p) => p.path.length));
    candidates = paths.filter((p) => p.path.length <= depth).map((p) => p.folder).sort((a, b) => {
      const byDate = (a.dateAdded ?? 0) - (b.dateAdded ?? 0);
      if (byDate !== 0) return byDate;
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    if (candidates.length > 0) {
      if (this.stash_root.value !== candidates[0]) {
        this.stash_root.value = candidates[0];
        trace$2("_findRoots", "set stash_root to", candidates[0].id);
      }
    } else if (this.stash_root.value !== void 0) {
      trace$2("_findRoots", "cleared stash_root");
      this.stash_root.value = void 0;
    }
    if (candidates.length > 1) {
      trace$2("_findRoots", "found multiple stash_root candidates");
      this.stash_root_warning.value = {
        text: `You have multiple "${this.stash_root_name}" bookmark folders, and Tab Stash isn't sure which one to use.  Click here to find out how to resolve the issue.`,
        /* istanbul ignore next */
        help: () => browser.tabs.create({ active: true, url: ROOT_FOLDER_HELP })
      };
    } else if (this.stash_root_warning.value !== void 0) {
      trace$2("_findRoots", "found single stash_root candidate");
      this.stash_root_warning.value = void 0;
    }
    return candidates;
  }
  /** Update or create a model node, populating it with information from the
   * browser. The model node is returned. */
  _upsertNode(btn, shiftIfNew) {
    var _a2, _b;
    const nodeId = btn.id;
    let node = this.by_id.get(nodeId);
    const parent = btn.parentId !== void 0 && this.folder(btn.parentId);
    trace$2("_upsertNode", nodeId, btn.parentId, btn.index, btn.title);
    if (!node) {
      if (isBrowserBTNFolder(btn)) {
        node = makeFolder(btn.id);
      } else if (btn.type === "separator") {
        node = makeSeparator(btn.id);
      } else {
        node = makeBookmark(btn.id);
      }
      node.dateAdded = btn.dateAdded;
      this.by_id.set(nodeId, node);
    }
    if (parent && btn.index !== void 0) {
      const pos = { parent, index: btn.index };
      if (parent !== ((_a2 = node.position) == null ? void 0 : _a2.parent) || pos.index !== ((_b = node.position) == null ? void 0 : _b.index)) {
        if (node.position) {
          removeNode(node.position);
          insertNode(node, pos);
        } else {
          (shiftIfNew ? insertNode : placeNode)(node, pos);
        }
      }
    }
    this._updateNode(node, btn);
    return node;
  }
  /** Update an existing node with new information from the browser. */
  _updateNode(node, btn) {
    const titleChanged = btn.title !== void 0 && node.title !== btn.title;
    const urlChanged = btn.url !== void 0 && isBookmark$1(node) && node.url !== btn.url;
    trace$2("_updateNode", node.id, btn.url, urlChanged, btn.title, titleChanged);
    if (titleChanged) node.title = btn.title;
    if (urlChanged) {
      this._remove_url(node);
      node.url = btn.url;
      this._add_url(node);
    }
    if (isFolder$1(node)) {
      if (node.title === this.stash_root_name) this._stash_root_watch.add(node);
      if (titleChanged && this._stash_root_watch.has(node)) {
        trace$2("_updateNode", "triggering stash root check");
        this._maybeUpdateStashRoot();
      }
    }
  }
  _add_url(bm) {
    if (!bm.url) return;
    this.loadedBookmarksWithURL(bm.url).add(bm);
  }
  _remove_url(bm) {
    if (!bm.url) return;
    const index = this.by_url.get(urlToOpen(bm.url));
    if (!index) return;
    index.delete(bm);
  }
  /* c8 ignore start -- for manual debugging */
  /** Create a bunch of fake(-ish) tabs for benchmarking purposes. This is
   * private because no actual code should call this, but we want it accessible
   * at runtime. */
  async createTabsForBenchmarks_testonly(options) {
    const bench_folder = await this.createStashFolder(
      options.name ?? "Fake Tabs"
    );
    const populate_folder = async (parent, levels, path) => {
      if (levels > 0) {
        for (let i = 0; i < options.folder_count; ++i) {
          const f = await this.createStashFolder(void 0, parent);
          await populate_folder(f, levels - 1, `${path}-${i}`);
        }
      } else {
        for (let i = 0; i < options.tabs_per_folder; ++i) {
          await this.create({
            title: `Fake Tab #${i}`,
            url: `http://localhost/#${path}-${i}`,
            parentId: parent.id,
            index: i
          });
        }
      }
    };
    await populate_folder(bench_folder, options.folder_levels, "root");
  }
  /* c8 ignore stop */
};
function getDefaultFolderNameISODate(n) {
  let m = n.match(/saved-([-0-9:.T]+Z)/);
  return m ? m[1] : null;
}
function genDefaultFolderName(date) {
  return `saved-${date.toISOString()}`;
}
function friendlyFolderName(name) {
  const folderDate = getDefaultFolderNameISODate(name);
  if (folderDate) return `Saved ${new Date(folderDate).toLocaleString()}`;
  return name;
}
function makeFolder(nodeId) {
  const folder = reactive({
    id: nodeId,
    position: void 0,
    dateAdded: 0,
    title: "",
    isLoaded: false,
    children: [],
    $stats: computed(() => {
      let bookmarkCount = 0;
      let folderCount = 0;
      for (const c of folder.children) {
        if (!c) continue;
        if (isFolder$1(c)) ++folderCount;
        if (isBookmark$1(c)) ++bookmarkCount;
      }
      return { bookmarkCount, folderCount, isLoaded: folder.isLoaded };
    }),
    $recursiveStats: computed(() => {
      let bookmarkCount = folder.$stats.bookmarkCount;
      let folderCount = folder.$stats.folderCount;
      let isLoaded = folder.isLoaded;
      for (const c of folder.children) {
        if (!c || !isFolder$1(c)) continue;
        const stats = c.$recursiveStats;
        bookmarkCount += stats.bookmarkCount;
        folderCount += stats.folderCount;
        isLoaded && (isLoaded = stats.isLoaded);
      }
      return { bookmarkCount, folderCount, isLoaded };
    })
  });
  return folder;
}
function makeSeparator(nodeId) {
  return reactive({
    id: nodeId,
    position: void 0,
    dateAdded: 0,
    type: "separator",
    title: ""
  });
}
function makeBookmark(nodeId) {
  return reactive({
    id: nodeId,
    position: void 0,
    dateAdded: 0,
    title: "",
    url: ""
  });
}
function isBrowserBTNFolder(bm) {
  if (bm.type === "folder") return true;
  if (bm.children) return true;
  if (!("type" in bm) && !("url" in bm)) return true;
  return false;
}
let Model$5 = class Model3 {
  constructor() {
    __publicField(this, "state");
    /** Did we receive an event since the last (re)load of the model? */
    __publicField(this, "_event_since_load", false);
    __publicField(this, "reload", backingOff(async () => {
      if (!browser.browserSettings) return;
      this._event_since_load = true;
      while (this._event_since_load) {
        this._event_since_load = false;
        const state = await resolveNamed({
          newtab_url: browser.browserSettings.newTabPageOverride.get({}).then((s) => s.value),
          home_url: browser.browserSettings.homepageOverride.get({}).then((s) => s.value)
        });
        this.state.newtab_url = state.newtab_url;
        this.state.home_url = state.home_url;
      }
    }));
    this.state = reactive({
      newtab_url: "about:newtab",
      home_url: "about:blank"
    });
    if (!browser.browserSettings) return;
    const wiring = new EventWiring(this, {
      onFired: () => {
        this._event_since_load = true;
      },
      onError: () => {
        logErrorsFrom(() => this.reload());
      }
    });
    wiring.listen(
      browser.browserSettings.newTabPageOverride.onChange,
      this.whenNewTabPageChanged
    );
    wiring.listen(
      browser.browserSettings.homepageOverride.onChange,
      this.whenHomepageChanged
    );
  }
  static async live() {
    const model = new Model3();
    await model.reload();
    return model;
  }
  //
  // Accessors
  //
  /** Determine if the URL provided is a new-tab URL or homepage URL (i.e.
   * something the user would consider as "empty"). */
  isNewTabURL(url) {
    switch (url) {
      case this.state.newtab_url:
      case this.state.home_url:
      case "about:blank":
      case "about:newtab":
      case "chrome://newtab/":
      case "edge://newtab/":
        return true;
      default:
        if (url.startsWith("chrome://vivaldi-webui/startpage")) return true;
        return false;
    }
  }
  //
  // Events from the browser
  //
  whenNewTabPageChanged(setting) {
    this.state.newtab_url = setting.value;
  }
  whenHomepageChanged(setting) {
    this.state.home_url = setting.value;
  }
};
let Model$4 = class Model4 {
  constructor() {
    __publicField(this, "containers", /* @__PURE__ */ new Map());
    __publicField(this, "enabled");
    // Did we receive an event since the last (re)load of the model?
    __publicField(this, "_event_since_load", false);
    // Fetch containers from the browser again and update the model's
    // understanding of the world with the browser's data.  Use this if it looks
    // like the model has gotten out of sync with the browser (e.g. for crash
    // recovery).
    __publicField(this, "reload", backingOff(async () => {
      if (!this.enabled) return;
      let loaded_containers;
      this._event_since_load = true;
      while (this._event_since_load) {
        this._event_since_load = false;
        try {
          loaded_containers = await browser.contextualIdentities.query({});
        } catch (e) {
          this.enabled = false;
          loaded_containers = [];
          break;
        }
      }
      this.containers = new Map(
        loaded_containers.filter((c) => c == null ? void 0 : c.cookieStoreId).map((c) => [c.cookieStoreId, this.makeContainerReactive(c)])
      );
    }));
    var _a2, _b, _c, _d, _e, _f, _g;
    const supports_containers = [
      typeof ((_a2 = browser.contextualIdentities) == null ? void 0 : _a2.query),
      typeof ((_c = (_b = browser.contextualIdentities) == null ? void 0 : _b.onCreated) == null ? void 0 : _c.addListener),
      typeof ((_e = (_d = browser.contextualIdentities) == null ? void 0 : _d.onUpdated) == null ? void 0 : _e.addListener),
      typeof ((_g = (_f = browser.contextualIdentities) == null ? void 0 : _f.onRemoved) == null ? void 0 : _g.addListener)
    ].every((v) => v === "function");
    if (!supports_containers) {
      this.enabled = false;
      return;
    }
    this.enabled = true;
    const wiring = new EventWiring(this, {
      onFired: () => {
        this._event_since_load = true;
      },
      /* c8 ignore next -- safety net; reload the model in the event */
      // of an unexpected exception.
      onError: () => {
        logErrorsFrom(() => this.reload());
      }
    });
    wiring.listen(browser.contextualIdentities.onCreated, this.whenChanged);
    wiring.listen(browser.contextualIdentities.onUpdated, this.whenChanged);
    wiring.listen(browser.contextualIdentities.onRemoved, this.whenRemoved);
  }
  static async from_browser() {
    const model = new Model4();
    await model.reload();
    return model;
  }
  makeContainerReactive(c) {
    return reactive({
      name: c.name,
      icon: c.icon,
      iconUrl: c.iconUrl,
      color: c.color,
      colorCode: c.colorCode,
      cookieStoreId: c.cookieStoreId
    });
  }
  // Accessors
  container(key) {
    return this.containers.get(key);
  }
  // Event handlers
  whenChanged(evt) {
    const container = evt.contextualIdentity;
    const key = container.cookieStoreId;
    let c = this.containers.get(key);
    if (!c) {
      this.containers.set(key, this.makeContainerReactive(container));
      return;
    }
    c.name = container.name;
    c.icon = container.icon;
    c.iconUrl = container.iconUrl;
    c.color = container.color;
    c.colorCode = container.colorCode;
    c.cookieStoreId = container.cookieStoreId;
  }
  whenRemoved(evt) {
    const key = evt.contextualIdentity.cookieStoreId;
    this.containers.delete(key);
  }
};
function entryHasValue(e) {
  return e.value !== void 0;
}
function src2state(e) {
  return reactive({
    key: e.key,
    deleted_at: new Date(e.value.deleted_at),
    deleted_from: e.value.deleted_from ? { ...e.value.deleted_from } : void 0,
    item: e.value.item
  });
}
function findChildItem(item, path) {
  if (!path || path.length == 0) return { child: item };
  let parent = item;
  for (const index2 of path.slice(0, path.length - 1)) {
    if (!("children" in parent)) {
      throw new Error(`[${path}]: Invalid path in deleted item`);
    }
    parent = parent.children[index2];
  }
  const index = path[path.length - 1];
  if (!("children" in parent) || !parent.children[index]) {
    throw new Error(`[${path}]: Invalid path in deleted item`);
  }
  return { parent, index, child: parent.children[index] };
}
const RECENT_DELETION_TIMEOUT = 8e3;
let Model$3 = class Model5 {
  constructor(kvs) {
    // TODO make this transitively read-only (once I figure out the TypeScript
    // typing issues)
    __publicField(this, "state", reactive({
      fullyLoaded: false,
      entries: [],
      recentlyDeleted: 0
    }));
    __publicField(this, "_kvs");
    __publicField(this, "_entry_cache", /* @__PURE__ */ new Map());
    __publicField(this, "_filter");
    __publicField(this, "_clear_recently_deleted_timeout");
    __publicField(this, "loadMore", nonReentrant(async () => {
      const starting_filter = this._filter;
      const starting_count = this.state.entries.length;
      let bound = this.state.entries.length > 0 ? this.state.entries[this.state.entries.length - 1].key : void 0;
      while (starting_count === this.state.entries.length) {
        if (starting_filter !== this._filter) break;
        const block = await this._kvs.getEndingAt(bound, 10);
        for (const rec of block) {
          if (this._filter && !this._filter(rec.value.item)) continue;
          if (!this._update(rec)) this._insert(rec);
        }
        if (block.length === 0) {
          this.state.fullyLoaded = true;
          break;
        }
        bound = block[block.length - 1].key;
      }
    }));
    this._kvs = kvs;
    kvs.onSet.addListener((records) => this.onSet(records));
    kvs.onSyncLost.addListener(() => this.onSyncLost());
  }
  onSet(records) {
    const deleted = /* @__PURE__ */ new Set();
    for (const r of records) {
      if (!entryHasValue(r)) {
        this._entry_cache.delete(r.key);
        deleted.add(r.key);
        continue;
      }
      if (this._update(r)) continue;
      if (this._filter && !this._filter(r.value.item)) continue;
      const deleted_at = new Date(r.value.deleted_at);
      const oldest = this.state.entries.length > 0 ? this.state.entries[this.state.entries.length - 1] : void 0;
      if (!oldest || deleted_at.valueOf() < oldest.deleted_at.valueOf()) {
        this.state.fullyLoaded = false;
        continue;
      }
      this._insert(r);
    }
    if (deleted.size > 0) {
      this.state.entries = this.state.entries.filter(
        ({ key }) => !deleted.has(key)
      );
      if (typeof this.state.recentlyDeleted === "object" && deleted.has(this.state.recentlyDeleted.key)) {
        this.state.recentlyDeleted = 0;
      }
    }
  }
  onSyncLost() {
    this.state.entries = [];
    this.state.fullyLoaded = false;
  }
  filter(predicate) {
    this.state.fullyLoaded = false;
    this.state.entries = [];
    this._entry_cache = /* @__PURE__ */ new Map();
    this._filter = predicate;
  }
  async add(item, deleted_from, deleted_at) {
    if (!deleted_at) deleted_at = /* @__PURE__ */ new Date();
    const entry = {
      key: genKey(deleted_at),
      value: {
        deleted_at: deleted_at.toISOString(),
        deleted_from,
        // Get rid of reactivity (if any)
        item: JSON.parse(JSON.stringify(item))
      }
    };
    await this._kvs.set([entry]);
    if (this.state.recentlyDeleted === 0) {
      this.state.recentlyDeleted = src2state(entry);
    } else if (typeof this.state.recentlyDeleted === "object") {
      this.state.recentlyDeleted = 2;
    } else {
      ++this.state.recentlyDeleted;
    }
    if (this._clear_recently_deleted_timeout) {
      clearTimeout(this._clear_recently_deleted_timeout);
    }
    this._clear_recently_deleted_timeout = setTimeout(() => {
      this.state.recentlyDeleted = 0;
      this._clear_recently_deleted_timeout = void 0;
    }, RECENT_DELETION_TIMEOUT);
    return entry;
  }
  /** Remove a deleted item (or part of a deleted item) from the deleted-items
   * database.
   *
   * Note that after a partial deletion, the path indexes after the removed item
   * will decrement---that is, this is equivalent to doing an
   * `Array.splice(index, 1)`.
   *
   * @param key The specific deletion to remove.
   *
   * @param path If specified and `path.length > 0`, remove only part of the
   * specified deletion.  This is the path of array indexes to follow to the
   * item to remove.
   */
  async drop(key, path) {
    if (!path || path.length == 0) {
      return await this._kvs.set([{ key }]);
    }
    const entry = this._entry_cache.get(key);
    if (!entry) throw new Error(`${key}: Record not loaded or doesn't exist`);
    const item = JSON.parse(JSON.stringify(entry.item));
    const { parent, index } = findChildItem(item, path);
    parent.children.splice(index, 1);
    await this._kvs.set([
      {
        key,
        value: {
          deleted_at: entry.deleted_at.toISOString(),
          item
        }
      }
    ]);
  }
  // Cleanup deleted items which are older than the specified date.
  //
  // We go directly to the KVS regardless of what's loaded into the model
  // because that way we are guaranteed to see everything, and we don't want
  // to pollute the model with stuff we're about to delete.
  async dropOlderThan(timestamp) {
    while (true) {
      const to_delete = [];
      for (const rec of await this._kvs.getStartingFrom(void 0, 50)) {
        if (Date.parse(rec.value.deleted_at) < timestamp) {
          to_delete.push({ key: rec.key });
        }
      }
      if (to_delete.length > 0) await this._kvs.set(to_delete);
      else break;
    }
  }
  clearRecentlyDeletedItems() {
    if (this._clear_recently_deleted_timeout) {
      clearTimeout(this._clear_recently_deleted_timeout);
    }
    this.state.recentlyDeleted = 0;
    this._clear_recently_deleted_timeout = void 0;
  }
  /** Insert and return a reactive entry in the model state.  This could be a
   * completely new item we just got an event for, or it could be called as
   * part of loading additional items on demand. */
  _insert(rec) {
    var _a2;
    const ent = src2state(rec);
    this._entry_cache.set(rec.key, ent);
    if (ent.deleted_at > ((_a2 = this.state.entries[0]) == null ? void 0 : _a2.deleted_at)) {
      this.state.entries.unshift(ent);
    } else {
      this.state.entries.push(ent);
      this.state.entries.sort(
        (a, b) => b.deleted_at.valueOf() - a.deleted_at.valueOf()
      );
    }
    return ent;
  }
  /** Update an entry in the model state, if it already exists.  If the entry
   * is found, it is returned.  Otherwise `undefined` is returned, and the
   * caller is expected to `_insert()` the entry if desired. */
  _update(rec) {
    const cached = this._entry_cache.get(rec.key);
    if (cached) {
      cached.deleted_at = new Date(rec.value.deleted_at);
      cached.item = rec.value.item;
      return cached;
    }
    return void 0;
  }
  /** **FOR TEST ONLY:** Generate a lot of garbage/fake deleted items for
   * (manual) performance and scale testing, and real-world testing of the
   * UI's lazy-loading behavior.
   *
   * The `batch_size` is the number of entries to insert at once, while
   * `count` is the total number of fake entries to generate.  A random
   * combination of individual items and folders is generated. */
  async makeFakeData_testonly(count, batch_size = 1) {
    let ts = Date.now();
    const icons = [
      "back.svg",
      "cancel.svg",
      "collapse-closed.svg",
      "delete.svg",
      "logo.svg",
      "mainmenu.svg",
      "new-empty-group.svg",
      "restore-del.svg",
      "stash-one.svg",
      "stash.svg"
    ];
    const words = [
      "deleted",
      "internal",
      "cat",
      "nonsense",
      "wakka",
      "yakko",
      "dot",
      "gazebo",
      "meow",
      "mew",
      "bark",
      "widget",
      "boat",
      "car",
      "rental",
      "code",
      "monad",
      "block",
      "function",
      "trivia",
      "noise",
      "signal"
    ];
    const choose = (a) => a[Math.floor(Math.random() * a.length)];
    const genTitle = () => `${choose(words)} ${choose(words)} ${choose(words)}`;
    const genUrl = () => `https://${choose(words)}.internet/${choose(words)}/${choose(
      words
    )}/${choose(words)}.html`;
    const genIcon = () => `icons/light/${choose(icons)}`;
    let items = [];
    for (let i = 0; i < count; ++i) {
      const deleted_at = new Date(ts);
      const key = genKey(deleted_at);
      ts -= Math.floor(Math.random() * 6 * 60 * 60 * 1e3);
      if (Math.random() < 0.5) {
        items.push({
          key,
          value: {
            deleted_at: deleted_at.toISOString(),
            item: {
              title: genTitle(),
              children: (() => {
                const res = [];
                for (let i2 = 0; i2 < Math.random() * 10 + 1; ++i2) {
                  res.push({
                    title: genTitle(),
                    url: genUrl(),
                    favIconUrl: genIcon()
                  });
                }
                return res;
              })()
            }
          }
        });
      } else {
        items.push({
          key,
          value: {
            deleted_at: deleted_at.toISOString(),
            deleted_from: {
              folder_id: choose(words),
              title: genTitle()
            },
            item: {
              title: genTitle(),
              url: genUrl(),
              favIconUrl: genIcon()
            }
          }
        });
      }
      if (items.length >= batch_size) {
        await this._kvs.set(items);
        items = [];
      }
    }
    if (items.length > 0) await this._kvs.set(items);
  }
};
let key_seq_no = 0;
let last_key_date = Date.now();
function genKey(deleted_at) {
  if (deleted_at.valueOf() !== last_key_date) {
    key_seq_no = 0;
    last_key_date = deleted_at.valueOf();
  }
  key_seq_no++;
  return `${deleted_at.toISOString()}-${(1e6 - key_seq_no).toString().padStart(6, "0")}-${makeRandomString(4)}`;
}
let Model$2 = class Model6 {
  constructor(kvc) {
    __publicField(this, "_kvc");
    this._kvc = kvc;
    browser.tabs.onCreated.addListener((tab) => this._updateFavicon(tab));
    browser.tabs.onUpdated.addListener(
      (_id, _info, tab) => this._updateFavicon(tab)
    );
    logErrorsFrom(async () => {
      for (const tab of await browser.tabs.query({})) {
        this._updateFavicon(tab);
      }
    });
  }
  sync() {
    return this._kvc.sync();
  }
  /** Removes favicons for whom `keep(url)` returns false. */
  async gc(keep) {
    const toDelete = [];
    for await (const entry of this._kvc.kvs.list()) {
      if (keep(entry.key)) continue;
      toDelete.push({ key: entry.key });
    }
    await this._kvc.kvs.set(toDelete);
  }
  /** Retrieves the favicon URL to display given a URL. Returns a page-specific
   * icon, if available, or a domain-specific icon if not, or failing that,
   * undefined. */
  getFavIconUrl(url) {
    var _a2, _b;
    return ((_a2 = this.get(url).value) == null ? void 0 : _a2.favIconUrl) ?? ((_b = this.getForDomain(url).value) == null ? void 0 : _b.favIconUrl) ?? void 0;
  }
  /** Retrieve a favicon from the cache for the specified URL.
   *
   * This always returns an object, but the object's .value property might not
   * be filled in if we don't know what icon to use (yet).  Once the icon is
   * known, the returned object will be filled in (and the change will be
   * visible to Vue's reactivity system).
   */
  get(url) {
    return this._kvc.get(url);
  }
  /** Retrieve a favicon from the cache for the specified domain. Works just
   * like get(); see get() for more details. */
  getForDomain(url) {
    return this._kvc.get(domainForUrl(url));
  }
  /** Update the icon and page title for a URL in the cache. */
  set(url, updates) {
    if (!updates.favIconUrl && !updates.title) {
      return this._kvc.get(url);
    }
    this._kvc.merge(url, (old) => merge_apply(old, updates));
    this._kvc.merge(
      domainForUrl(url),
      (old) => merge_apply_if_unset(old, updates)
    );
  }
  /** Set the icon and page title for a URL in the cache, but only if the
   * title/icon aren't set already. */
  maybeSet(url, updates) {
    if (!updates.favIconUrl && !updates.title) {
      return this._kvc.get(url);
    }
    this._kvc.merge(url, (old) => merge_apply_if_unset(old, updates));
    this._kvc.merge(
      domainForUrl(url),
      (old) => merge_apply_if_unset(old, updates)
    );
  }
  _updateFavicon(tab) {
    if (tab.url && tab.status === "complete") this.set(urlToOpen(tab.url), tab);
  }
};
function domainForUrl(url) {
  return new URL(url).hostname;
}
function merge_apply(old, updates) {
  if (!old) old = { favIconUrl: null, title: void 0 };
  if (updates.favIconUrl) old.favIconUrl = updates.favIconUrl;
  if (updates.title) old.title = updates.title;
  return old;
}
function merge_apply_if_unset(old, updates) {
  if (!old) old = { favIconUrl: null, title: void 0 };
  if (!old.favIconUrl && updates.favIconUrl) {
    old.favIconUrl = updates.favIconUrl;
  }
  if (!old.title && updates.title) old.title = updates.title;
  return old;
}
const trace$1 = trace_fn("tabs");
const SK_HIDDEN_BY_TAB_STASH = "hidden_by_tab_stash";
const MAX_LOADING_TABS = navigator.hardwareConcurrency ?? 4;
let Model$1 = class Model7 {
  constructor(initial_window) {
    __publicField(this, "windows", /* @__PURE__ */ new Map());
    __publicField(this, "tabs", /* @__PURE__ */ new Map());
    __publicField(this, "tabs_by_url", /* @__PURE__ */ new Map());
    /** The initial window that this model was opened with (if it still exists). */
    __publicField(this, "initialWindow", ref());
    /** The window that currently has the focus (if any). */
    __publicField(this, "focusedWindow", ref());
    /** The "target" window that this model should be for.  Controls for things
     * like which window is shown in the UI, tab selection, etc.  This isn't
     * precisely the same as `focusedWindow`, because it accounts for the fact
     * that the user could tear off the Tab Stash tab into a new window, and yet
     * still want to manage the window that the tab was originally opened in. */
    __publicField(this, "targetWindow", computed(() => {
      if (typeof this.initialWindow.value === "object") {
        return this.initialWindow.value;
      }
      if (typeof this.focusedWindow.value === "object") {
        return this.focusedWindow.value;
      }
      return void 0;
    }));
    /** The number of tabs being loaded. */
    __publicField(this, "loadingCount", ref(0));
    /** A queue of tabs to load.  We only want to allow so many tabs to load at
     * once (to avoid overwhelming the user's machine), so every single call that
     * could cause a tab to be loaded must go through here. */
    __publicField(this, "_loading_queue", new AsyncTaskQueue());
    /** Did we receive an event since the last (re)load of the model? */
    __publicField(this, "_event_since_load", false);
    /* c8 ignore stop */
    /** Fetch tabs/windows from the browser again and update the model's
     * understanding of the world with the browser's data.  Use this if it looks
     * like the model has gotten out of sync with the browser (e.g. for crash
     * recovery). */
    __publicField(this, "reload", backingOff(async () => {
      this._event_since_load = true;
      while (this._event_since_load) {
        this._event_since_load = false;
        trace$1("(Re-)loading the model");
        const cur_win = await browser.windows.getCurrent();
        this.focusedWindow.value = cur_win.id;
        let tabs = await browser.tabs.query({});
        tabs = tabs.sort((a, b) => a.index - b.index);
        for (const t of tabs) this.whenTabCreated(t);
        const old_tabs = new Set(this.tabs.keys());
        const old_windows = new Set(this.windows.keys());
        for (const t of tabs) {
          old_tabs.delete(t.id);
          old_windows.delete(t.windowId);
        }
        for (const t of old_tabs) this.whenTabRemoved(t);
        for (const w of old_windows) this.whenWindowRemoved(w);
        trace$1(
          "Model (re-)load finished; seen events since load started =",
          this._event_since_load
        );
      }
    }));
    this.initialWindow.value = initial_window;
    trace$1("Wiring events");
    const wiring = new EventWiring(this, {
      onFired: () => {
        this._event_since_load = true;
      },
      /* c8 ignore next 3 -- safety net triggered only on a bug */
      onError: () => {
        logErrorsFrom(() => this.reload());
      }
    });
    wiring.listen(browser.windows.onCreated, this.whenWindowCreated);
    wiring.listen(browser.windows.onFocusChanged, this.whenWindowFocusChanged);
    wiring.listen(browser.windows.onRemoved, this.whenWindowRemoved);
    wiring.listen(browser.tabs.onCreated, this.whenTabCreated);
    wiring.listen(browser.tabs.onUpdated, this.whenTabUpdated);
    wiring.listen(browser.tabs.onAttached, this.whenTabAttached);
    wiring.listen(browser.tabs.onMoved, this.whenTabMoved);
    wiring.listen(browser.tabs.onReplaced, this.whenTabReplaced);
    wiring.listen(browser.tabs.onActivated, this.whenTabActivated);
    wiring.listen(browser.tabs.onHighlighted, this.whenTabsHighlighted);
    wiring.listen(browser.tabs.onRemoved, this.whenTabRemoved);
  }
  //
  // Loading data and wiring up events
  //
  /** Construct a model by loading tabs from the browser.  The model will keep
   * itself updated by listening to browser events. */
  static async from_browser(bg) {
    const win = bg ? void 0 : await browser.windows.getCurrent();
    const model = new Model7(win == null ? void 0 : win.id);
    await model.reload();
    return model;
  }
  /* c8 ignore start -- for manual debugging only */
  dumpState() {
    const windows = Array.from(this.windows.entries()).map(([id, w]) => ({
      id,
      children: w.children.map((t) => ({
        id: t.id,
        status: t.status,
        title: t.title,
        url: t.url,
        cookieStoreId: t.cookieStoreId,
        pinned: t.pinned,
        hidden: t.hidden,
        active: t.active,
        highlighted: t.highlighted,
        discarded: t.discarded
      }))
    }));
    const tabs = windows.flatMap((w) => w.children);
    return { windows, tabs };
  }
  //
  // Accessors
  //
  allWindows() {
    return Array.from(this.windows.values());
  }
  allTabs() {
    return this.allWindows().flatMap((w) => w.children);
  }
  window(id) {
    return this.windows.get(id);
  }
  tab(id) {
    return this.tabs.get(id);
  }
  /** Returns the active tab in the specified window (or in
   * `this.current_window`, if no window is specified). */
  activeTab(window) {
    if (window === void 0) window = this.targetWindow.value;
    if (window === void 0) return void 0;
    return window.children.filter((t) => t.active)[0];
  }
  /** Returns a reactive set of tabs with the specified URL. */
  tabsWithURL(url) {
    let index = this.tabs_by_url.get(urlToOpen(url));
    if (!index) {
      index = reactive(/* @__PURE__ */ new Set());
      this.tabs_by_url.set(urlToOpen(url), index);
    }
    return index;
  }
  /** Checks if the tab was hidden by us or by some other extension. */
  async wasTabHiddenByUs(tab) {
    const res = await browser.sessions.getTabValue(
      tab.id,
      SK_HIDDEN_BY_TAB_STASH
    );
    return res ?? false;
  }
  //
  // User-level operations on tabs
  //
  /** Creates a new tab and waits for the model to reflect its existence.
   *
   * Note that creation of non-discarded is rate-limited, to avoid
   * overwhelming the user's system with a lot of loading tabs. */
  async create(tab) {
    const create_tab = Object.assign({}, tab);
    if (!browser.tabs.hide || !tab.url || tab.url.startsWith("about:")) {
      delete create_tab.discarded;
      delete create_tab.title;
      return await this._loading_queue.run(async () => {
        await this._safe_to_load_another_tab();
        trace$1("creating tab", create_tab);
        const t2 = await browser.tabs.create(create_tab);
        return await shortPoll(
          () => this.tabs.get(t2.id) || tryAgain()
        );
      });
    }
    create_tab.discarded = true;
    trace$1("creating tab", create_tab);
    const t = await browser.tabs.create(create_tab);
    const m = await shortPoll(() => this.tabs.get(t.id) || tryAgain());
    if (!tab.discarded) {
      this._loading_queue.run(async () => {
        await this._safe_to_load_another_tab();
        if (this.tabs.get(m.id) !== m) return;
        if (!m.discarded) return;
        trace$1("loading tab after creation", create_tab);
        await browser.tabs.update(m.id, { url: m.url });
        await shortPoll(
          () => this.tabs.get(m.id) !== m || !m.discarded || tryAgain()
        );
      });
    }
    return m;
  }
  /** Moves a tab such that it precedes the item with index `toIndex` in
   * the destination window.  (You can pass an index `>=` the length of the
   * windows's tab list to move the item to the end of the window.) */
  async move(tab, toWindow, toIndex) {
    const pos = tab.position;
    if ((pos == null ? void 0 : pos.parent) === toWindow && toIndex > pos.index) toIndex--;
    trace$1("moving tab", tab, { toWindow, toIndex });
    await browser.tabs.move(tab.id, { windowId: toWindow.id, index: toIndex });
    await shortPoll(() => {
      const pos2 = tab.position;
      if (!pos2) tryAgain();
      if (pos2.parent !== toWindow || pos2.index !== toIndex) tryAgain();
    });
  }
  /** Shows a tab that was previously hidden. */
  async show(tab) {
    await browser.tabs.show(tab.id);
  }
  /** Hides the specified tabs, optionally discarding them (to free up memory).
   * If the browser does not support hiding tabs, closes them instead. */
  async hide(tabs, discard) {
    if (!!browser.tabs.hide) {
      const tids = tabs.map((t) => t.id);
      trace$1("hiding tabs", tabs);
      await this.refocusAwayFromTabs(tabs);
      await browser.tabs.hide(tids);
      if (discard) await browser.tabs.discard(tids);
      for (const t of tabs) {
        await browser.sessions.setTabValue(t.id, SK_HIDDEN_BY_TAB_STASH, true);
      }
    } else {
      await this.remove(tabs);
    }
  }
  /** Close the specified tabs, but leave the browser window open (and create
   * a new tab if necessary to keep it open). */
  async remove(tabs) {
    const tids = tabs.map((t) => t.id);
    trace$1("removing tabs", tids);
    await this.refocusAwayFromTabs(tabs);
    await browser.tabs.remove(tids);
    await shortPoll(() => {
      if (tids.find((tid) => this.tabs.has(tid)) !== void 0) tryAgain();
    });
  }
  /** Closes the specified browser windows. */
  async removeWindows(windows) {
    await Promise.all(windows.map((win) => browser.windows.remove(win.id)));
    await shortPoll(() => {
      if (windows.find((w) => this.windows.has(w.id)) !== void 0) tryAgain();
    });
  }
  /** If any of the provided tabIds are the active tab, change to a different
   * active tab.  If the tabIds include all open tabs in a window, create a
   * fresh new tab to activate.
   *
   * The intention here is to prep the browser window(s) so that it stays open
   * even if we close every tab in the window(s), and to move away from any
   * active tabs which we are about to close (so the browser doesn't stop us
   * from closing them).
   */
  async refocusAwayFromTabs(tabs) {
    const active_tabs = tabs.filter((t) => t.active);
    for (const active_tab of active_tabs) {
      const pos = expect(
        active_tab.position,
        () => `Couldn't find position of active tab ${active_tab.id}`
      );
      const win = pos.parent;
      const visible_tabs = win.children.filter((t) => !t.hidden && !t.pinned);
      const closing_tabs_in_window = tabs.filter(
        (t) => {
          var _a2, _b;
          return ((_a2 = t.position) == null ? void 0 : _a2.parent) === ((_b = active_tab.position) == null ? void 0 : _b.parent);
        }
      );
      if (closing_tabs_in_window.length >= visible_tabs.length) {
        trace$1("creating new empty tab in window", win.id);
        await browser.tabs.create({ active: true, windowId: win.id });
      } else {
        let candidates = win.children.slice(pos.index + 1);
        let focus_tab = candidates.find(
          (c) => c.id !== void 0 && !c.hidden && !c.pinned && !tabs.includes(c)
        );
        if (!focus_tab) {
          candidates = win.children.slice(0, pos.index).reverse();
          focus_tab = candidates.find(
            (c) => c.id !== void 0 && !c.hidden && !c.pinned && !tabs.includes(c)
          );
        }
        console.assert(!!focus_tab);
        if (focus_tab) {
          trace$1("switching focus to tab", focus_tab.id);
          await browser.tabs.update(focus_tab.id, { active: true });
        }
      }
    }
  }
  //
  // Events which are detected automatically by this model; these can be
  // called for testing purposes but otherwise you can ignore them.
  //
  // (In contrast to onFoo-style things, they are event listeners, not event
  // senders.)
  //
  whenWindowCreated(win) {
    const wid = win.id;
    let window = this.windows.get(wid);
    if (!window) {
      window = reactive({
        id: wid,
        position: void 0,
        children: [],
        isLoaded: true
      });
      this.windows.set(wid, window);
    }
    trace$1("event windowCreated", win.id, win);
    if (win.tabs !== void 0) {
      for (const t of win.tabs) this.whenTabCreated(t);
    }
    if (window.id === this.initialWindow.value) {
      this.initialWindow.value = window;
    }
    if (window.id === this.focusedWindow.value) {
      this.focusedWindow.value = window;
    }
    return window;
  }
  whenWindowFocusChanged(winId) {
    if (winId === browser.windows.WINDOW_ID_NONE) {
      this.focusedWindow.value = void 0;
      return;
    }
    const win = this.window(winId);
    this.focusedWindow.value = win ?? winId;
  }
  whenWindowRemoved(winId) {
    const win = this.windows.get(winId);
    trace$1("event windowRemoved", winId, win);
    if (!win) return;
    if (this.initialWindow.value === winId) {
      this.initialWindow.value = void 0;
    }
    if (this.focusedWindow.value === winId) {
      this.focusedWindow.value = void 0;
    }
    for (const t of Array.from(win.children)) this.whenTabRemoved(t.id);
    this.windows.delete(winId);
  }
  whenTabCreated(tab) {
    trace$1(
      "event tabCreated",
      "window",
      tab.windowId,
      "tab",
      tab.id,
      tab.url,
      tab
    );
    let t = this.tabs.get(tab.id);
    if (!t) {
      t = reactive({
        position: void 0,
        id: tab.id,
        status: tab.status ?? "loading",
        title: tab.title ?? "",
        url: tab.url ?? "",
        favIconUrl: tab.favIconUrl ?? "",
        cookieStoreId: tab.cookieStoreId,
        pinned: tab.pinned,
        hidden: tab.hidden ?? false,
        active: tab.active,
        highlighted: tab.highlighted,
        discarded: tab.discarded ?? false
      });
      this.tabs.set(tab.id, t);
    } else {
      this._remove_url(t);
      if (t.status === "loading") --this.loadingCount.value;
      t.status = tab.status ?? "loading";
      t.title = tab.title ?? "";
      t.url = tab.url ?? "";
      t.favIconUrl = tab.favIconUrl ?? "";
      t.cookieStoreId = tab.cookieStoreId;
      t.pinned = tab.pinned;
      t.hidden = tab.hidden ?? false;
      t.active = tab.active;
      t.highlighted = tab.highlighted;
      t.discarded = tab.discarded ?? false;
    }
    const wid = tab.windowId;
    let win = this.windows.get(wid);
    if (!win) {
      win = this.whenWindowCreated({
        id: tab.windowId,
        focused: false,
        incognito: false,
        alwaysOnTop: false
      });
    }
    if (win.isLoaded) tab.index = Math.min(tab.index, win.children.length);
    if (t.position) removeNode(t.position);
    insertNode(t, { parent: win, index: tab.index });
    this._add_url(t);
    if (t.status === "loading") ++this.loadingCount.value;
  }
  whenTabUpdated(id, info) {
    trace$1("event tabUpdated", id, info.url, info);
    const t = this.tab(id);
    if (!t) {
      console.warn(
        `Got onUpdated event for an unknown tab ${id}; ignoring it.`
      );
      return;
    }
    if (info.status !== void 0) {
      if (t.status === "loading") --this.loadingCount.value;
      t.status = info.status;
      if (t.status === "loading") ++this.loadingCount.value;
    }
    if (info.title !== void 0) t.title = info.title;
    if (info.url !== void 0) {
      this._remove_url(t);
      t.url = info.url;
      this._add_url(t);
    }
    if (info.favIconUrl !== void 0) t.favIconUrl = info.favIconUrl;
    if (info.pinned !== void 0) t.pinned = info.pinned;
    if (info.hidden !== void 0) {
      if (t.hidden !== info.hidden && !info.hidden) {
        logErrorsFrom(
          () => browser.sessions.removeTabValue(t.id, SK_HIDDEN_BY_TAB_STASH)
        );
      }
      t.hidden = info.hidden;
    }
    if (info.discarded !== void 0) t.discarded = info.discarded;
  }
  whenTabAttached(id, info) {
    this.whenTabMoved(id, {
      windowId: info.newWindowId,
      toIndex: info.newPosition
    });
  }
  whenTabMoved(tabId, info) {
    trace$1("event tabMoved", tabId, info);
    const t = this.tab(tabId);
    if (!t) {
      console.warn(`Got move event for unknown tab ${tabId}`);
      return;
    }
    let newWindow = this.window(info.windowId);
    if (!newWindow) {
      newWindow = this.whenWindowCreated({
        id: info.windowId,
        focused: false,
        incognito: false,
        alwaysOnTop: false
      });
    }
    if (t.position) removeNode(t.position);
    insertNode(t, { parent: newWindow, index: info.toIndex });
  }
  whenTabReplaced(newId, oldId) {
    trace$1("event tabReplaced", oldId, "=>", newId);
    const t = this.tab(oldId);
    if (!t) {
      console.warn(`Got replace event for unknown tab ${oldId} (-> ${newId})`);
      return;
    }
    t.id = newId;
    this.tabs.delete(oldId);
    this.tabs.set(t.id, t);
  }
  whenTabActivated(info) {
    trace$1("event tabActivated", info.tabId, info);
    const tab = this.tab(info.tabId);
    if (!tab) {
      console.warn(`Got activated event for unknown tab ${info.tabId}`);
      return;
    }
    const win = this.window(info.windowId);
    if (win) for (const t of win.children) t.active = false;
    tab.active = true;
  }
  whenTabsHighlighted(info) {
    trace$1("event tabsHighlighted", info);
    const win = this.window(info.windowId);
    if (!win) {
      console.log(`Got highlighted event for unknown window ${info.windowId}`);
      return;
    }
    for (const t of win.children) {
      t.highlighted = info.tabIds.findIndex((id) => id === t.id) !== -1;
    }
  }
  whenTabRemoved(tabId) {
    trace$1("event tabRemoved", tabId);
    const t = this.tabs.get(tabId);
    if (!t) return;
    const pos = t.position;
    if (pos) removeNode(pos);
    trace$1("event ...tabRemoved", tabId, pos);
    this.tabs.delete(t.id);
    this._remove_url(t);
    if (t.status === "loading") --this.loadingCount.value;
  }
  _add_url(t) {
    this.tabsWithURL(t.url).add(t);
  }
  _remove_url(t) {
    const index = this.tabs_by_url.get(urlToOpen(t.url));
    if (!index) return;
    index.delete(t);
  }
  /** Wait until the number of tabs being loaded concurrently drops below a
   * reasonable threshold.  This prevents us from opening so many tabs at once
   * that we lock up the user's whole machine. :/ */
  _safe_to_load_another_tab() {
    return new Promise((resolve) => {
      const check = () => {
        if (this.loadingCount.value >= MAX_LOADING_TABS) return;
        resolve();
        cancel();
      };
      const cancel = watch(this.loadingCount, check);
      check();
    });
  }
};
class TreeFilter {
  constructor(isParent, predicate) {
    /** Check if a particular node is a parent node or not. */
    __publicField(this, "isParent");
    /** The predicate function used to determine whether a node `isMatching` or
     * not.  Updating this ref will update the `.isMatching` property on every
     * node. */
    __publicField(this, "predicate");
    __publicField(this, "nodes", /* @__PURE__ */ new WeakMap());
    this.isParent = isParent;
    this.predicate = predicate;
  }
  /** Returns a FilterInfo object describing whether this node (and/or its
   * sub-tree) matches the predicate or not. */
  info(node) {
    const n = this.nodes.get(node);
    if (n) return n;
    const isParent = this.isParent(node);
    const isMatching = computed(() => this.predicate.value(node));
    const hasMatchInSubtree = isParent ? computed(() => {
      if (isMatching.value) return true;
      for (const c of node.children) {
        if (!c) continue;
        if (this.info(c).hasMatchInSubtree) return true;
      }
      return false;
    }) : isMatching;
    const nonMatchingCount = isParent ? computed(() => {
      let count = 0;
      for (const c of node.children) {
        if (!c) continue;
        if (!this.info(c).hasMatchInSubtree) ++count;
      }
      return count;
    }) : 0;
    const i = reactive({
      isMatching,
      hasMatchInSubtree,
      nonMatchingCount
    });
    this.nodes.set(node, i);
    return i;
  }
}
class TreeSelection {
  constructor(isParent, roots) {
    __publicField(this, "isParent");
    /** The roots of the tree, mainly used to calculate the count of selected
     * nodes. */
    __publicField(this, "roots");
    /** An optional predicate function used to filter items from range selections. */
    __publicField(this, "rangeSelectPredicate");
    /** How many nodes are selected in `this.roots` and their subtrees? */
    __publicField(this, "selectedCount");
    /** The last selection that was done. */
    __publicField(this, "lastSelected");
    __publicField(this, "nodes", /* @__PURE__ */ new WeakMap());
    this.isParent = isParent;
    this.roots = roots;
    this.selectedCount = computed(
      () => this.roots.value.reduce(
        (sum, root) => sum + this.info(root).selectedCount,
        0
      )
    );
  }
  info(node) {
    const n = this.nodes.get(node);
    if (n) return n;
    const isParent = this.isParent(node);
    const isSelected = ref(false);
    const selectedCount = isParent ? computed(() => {
      let count = isSelected.value ? 1 : 0;
      for (const c of node.children) {
        if (!c) continue;
        const info = this.info(c);
        count += info.selectedCount;
      }
      return count;
    }) : computed(() => isSelected.value ? 1 : 0);
    const hasSelectionInSubtree = isParent ? computed(() => selectedCount.value !== 0) : isSelected;
    const i = reactive({
      isSelected,
      selectedCount,
      hasSelectionInSubtree
    });
    this.nodes.set(node, i);
    return i;
  }
  *selectedItems() {
    for (const n of this.roots.value) yield* this.selectedItemsInSubtree(n);
  }
  *selectedItemsInSubtree(node) {
    if (this.info(node).isSelected) yield node;
    if (!this.isParent(node)) return;
    for (const c of node.children) if (c) yield* this.selectedItemsInSubtree(c);
  }
  /** Check if the provided node or any of its parents is selected.  Useful for
   * precluding things like moving a node into a child of itself. */
  isSelfOrParentSelected(node) {
    var _a2;
    while (node) {
      const si = this.info(node);
      if (si.isSelected) return true;
      node = (_a2 = node.position) == null ? void 0 : _a2.parent;
    }
    return false;
  }
  /** Set all `node.isSelected` properties to false within `this.roots`. */
  clearSelection() {
    this.lastSelected = void 0;
    for (const r of this.roots.value) {
      forEachNodeInSubtree(r, this.isParent, (n) => {
        this.info(n).isSelected = false;
      });
    }
  }
  /** Trigger a selection action based on a DOM event. */
  toggleSelectFromEvent(ev, node) {
    if (ev.shiftKey) return this.toggleSelectRange(node);
    if (ev.ctrlKey || ev.metaKey) return this.toggleSelectOne(node);
    return this.toggleSelectScattered(node);
  }
  /** Analogous to a regular click--select a single item.  If any other items
   * were selected before, de-select them.  If only `item` is selected,
   * de-select it. */
  toggleSelectOne(node) {
    const ni = this.info(node);
    const wasSelected = ni.isSelected;
    const selectCount = this.selectedCount.value;
    this.clearSelection();
    if (selectCount == 1 && wasSelected) return;
    ni.isSelected = true;
    this.lastSelected = { node };
  }
  /** Toggle selection on a single item, regardless of what else is selected.
   * Analogous to a Ctrl+Click or Cmd+Click. */
  toggleSelectScattered(node) {
    const ni = this.info(node);
    ni.isSelected = !ni.isSelected;
    this.lastSelected = { node };
  }
  /** Select a range of items (if possible), analogous to Shift+Click.  All
   * items between lastSelected and the passed-in item will be toggled. */
  toggleSelectRange(node) {
    if (!this.lastSelected) {
      return this.toggleSelectScattered(node);
    }
    let range = this.itemsInRange(this.lastSelected.node, node);
    if (!range) {
      return this.toggleSelectScattered(node);
    }
    range = range.filter(this.rangeSelectPredicate || ((_) => true));
    const selected = this.info(this.lastSelected.node).isSelected;
    if (this.lastSelected.range) {
      const deselect = new Set(this.lastSelected.range);
      for (const i of range) deselect.delete(i);
      for (const n of deselect) this.info(n).isSelected = !selected;
    }
    const select = new Set(range);
    if (this.lastSelected.range) {
      for (const i of this.lastSelected.range) select.delete(i);
    }
    this.lastSelected.range = range;
    for (const n of select) if (n) this.info(n).isSelected = selected;
  }
  // TODO Move me into tree.ts and find common parents
  itemsInRange(start, end) {
    let startPos = start.position;
    let endPos = end.position;
    if (!startPos || !endPos) return void 0;
    if (startPos.parent !== endPos.parent) return void 0;
    if (endPos.index < startPos.index) {
      const tmp = endPos;
      endPos = startPos;
      startPos = tmp;
    }
    return startPos.parent.children.slice(startPos.index, endPos.index + 1).filter((i) => i !== void 0);
  }
}
const trace = trace_fn("model");
const isModelParent = (item) => "children" in item;
const isModelItem = (item) => "id" in item;
const isWindow = (item) => "id" in item && typeof item.id === "number" && "children" in item;
const isTab = (item) => "id" in item && typeof item.id === "number" && !("children" in item);
const isNode = (item) => "id" in item && typeof item.id === "string";
const isBookmark = (item) => isNode(item) && isBookmark$1(item);
const isFolder = (item) => isNode(item) && isFolder$1(item);
const isNewItem = (item) => !("id" in item);
class Model8 {
  constructor(src) {
    __publicField(this, "browser_settings");
    __publicField(this, "options");
    __publicField(this, "tabs");
    __publicField(this, "containers");
    __publicField(this, "bookmarks");
    __publicField(this, "deleted_items");
    __publicField(this, "favicons");
    __publicField(this, "bookmark_metadata");
    __publicField(this, "searchText", ref(""));
    __publicField(this, "filter");
    /** This is a bit of volatile metadata that tracks whether children that don't
     * match the filter should be shown in the UI or not.  We need it here because
     * the selection model depends on it for knowing which items in a range are
     * visible when doing a multi-select. */
    __publicField(this, "showFilteredChildren", /* @__PURE__ */ new WeakMap());
    __publicField(this, "selection");
    /** Reload model data (where possible) in the event of an unexpected issue.
     * This should be used sparingly as it's quite expensive. */
    __publicField(this, "reload", backingOff(async () => {
      trace("[pre-reload] dump of tab state", this.tabs.dumpState());
      trace("[pre-reload] dump of bookmark state", this.bookmarks.dumpState());
      await Promise.all([
        this.tabs.reload(),
        this.containers.reload(),
        this.bookmarks.reload(),
        this.browser_settings.reload()
      ]);
      trace("[post-reload] dump of tab state", this.tabs.dumpState());
      trace("[post-reload] dump of bookmark state", this.bookmarks.dumpState());
    }));
    this.browser_settings = src.browser_settings;
    this.options = src.options;
    this.tabs = src.tabs;
    this.containers = src.containers;
    this.bookmarks = src.bookmarks;
    this.deleted_items = src.deleted_items;
    this.favicons = src.favicons;
    this.bookmark_metadata = src.bookmark_metadata;
    this.filter = new TreeFilter(
      isModelParent,
      computed(() => {
        const searchText = this.searchText.value;
        if (!searchText) return (_) => true;
        const matcher = textMatcher(searchText);
        return (node) => "title" in node && matcher(node.title) || "url" in node && matcher(node.url);
      })
    );
    this.selection = new TreeSelection(
      isModelParent,
      computed(
        () => filterMap(
          [this.tabs.targetWindow.value, this.bookmarks.stash_root.value],
          (i) => i
        )
      )
    );
    this.selection.rangeSelectPredicate = (item) => {
      var _a2, _b;
      if (isTab(item)) {
        if (item.pinned || item.hidden) return false;
        if (this.options.sync.state.show_open_tabs === "unstashed" && this.bookmarks.isURLLoadedInStash(item.url)) {
          return false;
        }
      }
      if (this.filter.info(item).isMatching) return true;
      const parent = (_a2 = item.position) == null ? void 0 : _a2.parent;
      if (parent && ((_b = this.showFilteredChildren.get(parent)) == null ? void 0 : _b.value)) return true;
      return false;
    };
  }
  /** Run an async function.  If it throws, reload the model (to try to
   * eliminate any inconsistencies) and log the error for further study. */
  async attempt(fn) {
    try {
      return await fn();
    } catch (e) {
      logError(e);
      logErrorsFrom(async () => this.reload());
      throw e;
    }
  }
  //
  // Accessors
  //
  /** Fetch and return an item, regardless of whether it's a bookmark or tab. */
  item(id) {
    if (typeof id === "string")
      return this.bookmarks.node(id);
    else if (typeof id === "number") return this.tabs.tab(id);
    else throw new Error(`Invalid model ID: ${id}`);
  }
  /** Is the passed-in URL one we want to include in the stash?  Excludes
   * things like new-tab pages and Tab Stash pages (so we don't stash
   * ourselves). */
  isURLStashable(url_str) {
    if (!url_str) return false;
    if (this.browser_settings.isNewTabURL(url_str)) return false;
    try {
      new URL(url_str);
    } catch (e) {
      return false;
    }
    return !url_str.startsWith(browser.runtime.getURL("stash-list.html"));
  }
  /** If the topmost folder in the stash root is an unnamed folder which was
   * created recently, return its ID.  Otherwise return `undefined`.  Used to
   * determine where to place single bookmarks we are trying to stash, if we
   * don't already know where they should go. */
  mostRecentUnnamedFolder() {
    const root = this.bookmarks.stash_root.value;
    if (!root) return void 0;
    const topmost = root.children[0];
    if (!topmost || !isFolder(topmost)) return void 0;
    if (!getDefaultFolderNameISODate(topmost.title)) return void 0;
    const age_cutoff = Date.now() - this.options.sync.state.new_folder_timeout_min * 60 * 1e3;
    if (topmost.dateAdded < age_cutoff) {
      return void 0;
    }
    return topmost;
  }
  /** Returns a list of tabs in a given window which should be stashed.
   *
   * This will exclude things like pinned and hidden tabs, or tabs with
   * privileged URLs.  If a window has multiple selected tabs (i.e. the user
   * has made an explicit choice about what to stash), only the selected tabs
   * will be returned.
   */
  stashableTabsInWindow(window) {
    const tabs = window.children.filter((t) => !t.hidden);
    let selected = tabs.filter((t) => t.highlighted);
    if (selected.length <= 1) {
      selected = tabs.filter((t) => this.isURLStashable(t.url));
    }
    return selected.filter((t) => !t.pinned);
  }
  //
  // Mutators
  //
  /** Garbage-collect various caches and deleted items. */
  async gc() {
    const deleted_exp = Date.now() - this.options.sync.state.deleted_items_expiration_days * 24 * 60 * 60 * 1e3;
    await this.bookmarks.loadedStash();
    const urls = await this.bookmarks.urlsInStash();
    const domains_to_keep = /* @__PURE__ */ new Set();
    for (const u of urls) {
      domains_to_keep.add(domainForUrl(urlToOpen(u)));
    }
    await this.deleted_items.dropOlderThan(deleted_exp);
    await this.favicons.gc(
      (url) => this.bookmarks.loadedBookmarksWithURL(url).size > 0 || this.tabs.tabsWithURL(url).size > 0 || domains_to_keep.has(url)
    );
    await this.bookmark_metadata.gc(
      (id) => id === CUR_WINDOW_MD_ID || !!this.bookmarks.node(id)
    );
    await this.closeOrphanedHiddenTabs();
  }
  /** Stashes all eligible tabs in the specified window, leaving the existing
   * tabs open if `copy` is true. */
  async stashAllTabsInWindow(window, options) {
    const tabs = this.stashableTabsInWindow(window);
    if (tabs.length === 0) return;
    await this.putItemsInFolder({
      items: copyIf(!!options.copy, tabs),
      toFolder: await this.bookmarks.createStashFolder(
        void 0,
        options.parent,
        options.position
      )
    });
  }
  /** Put the set of currently-selected items in the specified folder
   * when the toFolderId option is set, otherwise the current window.
   *
   * Note: When copying is disabled, the source items will be deselected. */
  async putSelectedIn(options) {
    const from_items = Array.from(this.selection.selectedItems());
    const items = copyIf((options == null ? void 0 : options.copy) === true, from_items);
    let affected_items;
    if ((options == null ? void 0 : options.toFolder) === void 0) {
      affected_items = await this.putItemsInWindow({ items });
    } else {
      affected_items = await this.putItemsInFolder({
        items,
        toFolder: options.toFolder,
        allowDuplicates: (options == null ? void 0 : options.copy) === true
      });
    }
    if (!(options == null ? void 0 : options.copy)) {
      for (const i of affected_items) {
        if (isModelItem(i)) this.selection.info(i).isSelected = false;
      }
    }
  }
  /** Put the set of currently-selected items in the current window. */
  async putSelectedInWindow(options) {
    await this.putSelectedIn(options);
  }
  /** Put the set of currently-selected items in the specified folder. */
  async putSelectedInFolder(options) {
    await this.putSelectedIn(options);
  }
  /** Hide/discard/close the specified tabs, according to the user's settings
   * for what to do with stashed tabs.  Creates a new tab if necessary to keep
   * the browser window(s) open. */
  async hideOrCloseStashedTabs(tabs) {
    await Promise.all(
      tabs.map((t) => browser.tabs.update(t.id, { highlighted: false }))
    );
    for (const t of tabs) this.selection.info(t).isSelected = false;
    switch (this.options.local.state.after_stashing_tab) {
      case "hide_discard":
        await this.tabs.hide(tabs, "discard");
        break;
      case "close":
        await this.tabs.remove(tabs);
        break;
      case "hide":
      default:
        await this.tabs.hide(tabs);
        break;
    }
  }
  /** Restores the specified URLs as new tabs in the current window.  Returns
   * the IDs of the restored tabs.
   *
   * Note that if a tab is already open and not hidden, we will do nothing,
   * since we don't want to open duplicate tabs.  Such tabs will not be
   * included in the returned list.
   *
   * After restoring tabs, if the previously-active tab was a blank tab, it will
   * be closed.  Note that this tab may be the Tab Stash tab itself (e.g. if Tab
   * Stash is the homepage or the new-tab page).  In that situation, this
   * function may not return (since the tab running it will be closed). */
  async restoreTabs(items, options) {
    const toWindow = this.tabs.targetWindow.value;
    if (toWindow === void 0) {
      throw new Error(`No target window; not sure where to restore tabs`);
    }
    if (!options.background && items.length === 1 && items[0].url) {
      const t = Array.from(this.tabs.tabsWithURL(items[0].url)).find(
        (t2) => {
          var _a2;
          return !t2.hidden && ((_a2 = t2.position) == null ? void 0 : _a2.parent) === toWindow;
        }
      );
      if (t) {
        await browser.tabs.update(t.id, { active: true });
        return [t];
      }
    }
    const win_tabs = toWindow.children;
    const active_tab = win_tabs.filter((t) => t.active)[0];
    const tabs = await this.putItemsInWindow({ items: copying(items), toWindow });
    if (options.beforeClosing) await options.beforeClosing(tabs);
    if (!options.background) {
      if (tabs.length > 0) {
        await browser.tabs.update(tabs[tabs.length - 1].id, { active: true });
      }
      if (active_tab && tabs.length > 0 && this.browser_settings.isNewTabURL(active_tab.url ?? "") && active_tab.status === "complete") {
        browser.tabs.remove([active_tab.id]).catch(console.log);
      }
    }
    return tabs;
  }
  /** Returns the ID of an unnamed folder at the top of the stash, creating a
   * new one if necessary. */
  async ensureRecentUnnamedFolder() {
    const folder = this.mostRecentUnnamedFolder();
    if (folder !== void 0) return folder;
    return await this.bookmarks.createStashFolder();
  }
  /** Moves or copies items (bookmarks, tabs, and/or external items) to a
   * particular location in a particular bookmark folder.
   *
   * If the source item contains an ID and is a bookmark, it will be moved
   * directly (so the ID remains the same).  If it contains an ID and is a
   * tab, the tab will be closed once the bookmark is created.  Items without
   * an ID will always be created as new bookmarks.
   *
   * If a bookmark with the same title/URL already exists in the folder, it
   * will be moved into place instead of creating a new bookmark, so as to
   * avoid creating duplicates. */
  async putItemsInFolder(options) {
    const to_folder = await this.bookmarks.loaded(options.toFolder);
    const items = options.items;
    const cyclic_sources = pathTo(
      to_folder
    ).map((p) => p.parent.id);
    cyclic_sources.push(to_folder.id);
    for (const i of items) {
      if (!isFolder(i)) continue;
      if (cyclic_sources.includes(i.id)) {
        throw new UserError(`Cannot move a group into itself`);
      }
    }
    if (options.task) options.task.max = options.items.length;
    const dont_steal_bms = new Set(
      filterMap(items, (i) => isNode(i) ? i.id : void 0)
    );
    const moved_items = [];
    const close_tabs = [];
    for (let i = 0, to_index = options.toIndex ?? to_folder.children.length; i < items.length; ++i, ++to_index, options.task && ++options.task.value) {
      const item = items[i];
      const model_item = isModelItem(item) ? this.item(item.id) : void 0;
      if (model_item && isNode(model_item)) {
        const pos = model_item.position;
        await this.bookmarks.move(model_item, to_folder, to_index);
        moved_items.push(model_item);
        dont_steal_bms.add(model_item.id);
        if (pos && pos.parent === to_folder && pos.index < to_index) {
          --to_index;
        }
        continue;
      }
      if (isTab(item)) close_tabs.push(item);
      let node;
      const already_there = "url" in item && !options.allowDuplicates ? to_folder.children.filter(
        (bm) => !dont_steal_bms.has(bm.id) && "url" in bm && bm.url === item.url && (item.title ? item.title === bm.title : true)
      ) : [];
      if (already_there.length > 0) {
        node = already_there[0];
        const pos = node.position;
        await this.bookmarks.move(node, to_folder, to_index);
        if (pos && pos.parent === to_folder && pos.index < to_index) --to_index;
      } else {
        const createTree = async (item2, parentId, index) => {
          const node2 = "url" in item2 ? await this.bookmarks.create({
            title: item2.title || item2.url,
            url: urlToStash(item2.url),
            parentId,
            index
          }) : await this.bookmarks.create({
            title: "title" in item2 && item2.title || genDefaultFolderName(/* @__PURE__ */ new Date()),
            parentId,
            index
          });
          if ("children" in item2) {
            let idx = 0;
            for (const c of item2.children) {
              if (typeof c === "string") {
                await this.bookmarks.move(c, node2, idx);
              } else {
                await createTree(c, node2.id, idx);
              }
              ++idx;
            }
          }
          return node2;
        };
        node = await createTree(item, to_folder.id, to_index);
      }
      moved_items.push(node);
      dont_steal_bms.add(node.id);
      this.selection.info(node).isSelected = isModelItem(item) && this.selection.info(item).isSelected;
    }
    await this.hideOrCloseStashedTabs(close_tabs);
    return moved_items;
  }
  /** Move or copy items (bookmarks, tabs, and/or external items) to a
   * particular location in a particular window.  Tabs which are
   * moved/created/restored will NOT be active (i.e. they will always be in
   * the background).
   *
   * If the source item contains an ID and is a tab, it will be moved directly
   * (so the ID remains the same).  If it contains an ID and is a bookmark, a
   * tab will be put into the right place (see below), and the bookmark will
   * be deleted.  External items (without an ID) will simply have tabs put
   * into the right place.
   *
   * A tab is "put into the right place" either by moving an existing tab (and
   * restoring it if it's a hidden tab), or creating a new tab, so as to avoid
   * opening duplicate tabs. */
  async putItemsInWindow(options) {
    var _a2;
    const win = options.toWindow ?? this.tabs.targetWindow.value;
    if (win === void 0) {
      throw new Error(`No target window available`);
    }
    const items = options.items;
    const closed_tabs = !!((_a2 = browser.sessions) == null ? void 0 : _a2.getRecentlyClosed) && this.options.local.state.ff_restore_closed_tabs ? await browser.sessions.getRecentlyClosed() : [];
    if (options.task) options.task.max = items.length + 1;
    const dont_steal_tabs = new Set(
      filterMap(items, (i) => {
        if (!isTab(i)) return void 0;
        return i.id;
      })
    );
    const moved_items = [];
    const delete_bm_ids = [];
    for (let i = 0, to_index = options.toIndex ?? win.children.length; i < items.length; ++i, ++to_index, options.task && ++options.task.value) {
      const item = items[i];
      const model_item = "id" in item ? this.item(item.id) : void 0;
      if (model_item && isTab(model_item)) {
        const pos = model_item.position;
        await this.tabs.move(model_item, win, to_index);
        moved_items.push(model_item);
        dont_steal_tabs.add(model_item.id);
        if (pos && pos.parent === win && pos.index < to_index) {
          --to_index;
        }
        continue;
      }
      if (model_item && isBookmark(model_item)) delete_bm_ids.push(model_item);
      if (!("url" in item)) {
        --to_index;
        continue;
      }
      const url = item.url;
      const already_open = Array.from(this.tabs.tabsWithURL(url)).filter(
        (t) => {
          var _a3;
          return !dont_steal_tabs.has(t.id) && !t.pinned && (t.hidden || ((_a3 = t.position) == null ? void 0 : _a3.parent) === win);
        }
      ).sort((a, b) => -a.hidden - -b.hidden);
      if (already_open.length > 0) {
        const t = already_open[0];
        const pos = t.position;
        await this.tabs.move(t, win, to_index);
        if (t.hidden && !!browser.tabs.show) await this.tabs.show(t);
        if (pos && pos.parent === win && pos.index < to_index) --to_index;
        moved_items.push(t);
        dont_steal_tabs.add(t.id);
        this.selection.info(t).isSelected = isModelItem(item) && this.selection.info(item).isSelected;
        continue;
      }
      const closed = filterMap(closed_tabs, (s) => s.tab).find(
        tabLookingAtP(url)
      );
      if (closed) {
        console.log(`Restoring recently-closed tab for URL: ${url}`, closed);
        const active_tab = win.children.find((t2) => t2.active);
        const t = (await browser.sessions.restore(closed.sessionId)).tab;
        await browser.tabs.move(t.id, { windowId: win.id, index: to_index });
        if (active_tab) {
          await browser.tabs.update(active_tab.id, { active: true });
        }
        const tab2 = await shortPoll(
          () => this.tabs.tab(t.id) || tryAgain()
        );
        moved_items.push(tab2);
        dont_steal_tabs.add(tab2.id);
        this.selection.info(tab2).isSelected = isModelItem(item) && this.selection.info(item).isSelected;
        continue;
      }
      const tab = await this.tabs.create({
        active: false,
        discarded: this.options.local.state.load_tabs_on_restore === "lazily",
        title: item.title,
        url: urlToOpen(url),
        windowId: win.id,
        index: to_index
      });
      moved_items.push(tab);
      dont_steal_tabs.add(tab.id);
      this.selection.info(tab).isSelected = isModelItem(item) && this.selection.info(item).isSelected;
    }
    const now = /* @__PURE__ */ new Date();
    await Promise.all(delete_bm_ids.map((bm) => this.deleteBookmark(bm, now)));
    if (options.task) ++options.task.value;
    return moved_items;
  }
  /** Deletes the specified items (bookmark nodes or tabs), saving any deleted
   * bookmarks to the deleted-items model. */
  async deleteItems(items) {
    const now = /* @__PURE__ */ new Date();
    const tabs = [];
    const windows = [];
    for (const i of items) {
      if (isNode(i)) {
        if (isFolder(i)) {
          await this.deleteBookmarkTree(i, now);
        } else if (isBookmark(i)) {
          await this.deleteBookmark(i, now);
        } else {
          await this.bookmarks.remove(i);
        }
      } else if (isTab(i)) {
        tabs.push(i);
      } else {
        windows.push(i);
      }
    }
    await this.tabs.remove(tabs);
    await this.tabs.removeWindows(windows);
  }
  /** Deletes the specified bookmark subtree, saving it to deleted items.  You
   * should use {@link deleteBookmark()} for individual bookmarks, because it
   * will cleanup the parent folder if the parent folder has a "default" name
   * and would be empty. */
  async deleteBookmarkTree(node, deleted_at) {
    const toDelItem = async (item) => {
      var _a2;
      if (isFolder(item)) {
        const lf = await this.bookmarks.loaded(item);
        return {
          title: item.title,
          children: await Promise.all(lf.children.map((i) => toDelItem(i)))
        };
      }
      if (isBookmark(item)) {
        return {
          title: item.title,
          url: item.url,
          favIconUrl: ((_a2 = this.favicons.get(urlToOpen(item.url)).value) == null ? void 0 : _a2.favIconUrl) || void 0
        };
      }
      return { title: "", url: "" };
    };
    if (isFolder(node)) await this.bookmarks.loadedSubtree(node);
    await this.deleted_items.add(await toDelItem(node), void 0, deleted_at);
    await this.bookmarks.removeTree(node);
  }
  /** Deletes the specified bookmark, saving it to deleted items.  If it was
   * the last bookmark in its parent folder, AND the parent folder has a
   * "default" name, removes the parent folder as well. */
  async deleteBookmark(bm, deleted_at) {
    var _a2, _b, _c;
    const parent = (_a2 = bm.position) == null ? void 0 : _a2.parent;
    await this.deleted_items.add(
      {
        title: bm.title ?? "<no title>",
        url: bm.url ?? "about:blank",
        favIconUrl: ((_c = (_b = this.favicons.get(urlToOpen(bm.url))) == null ? void 0 : _b.value) == null ? void 0 : _c.favIconUrl) || void 0
      },
      parent ? {
        folder_id: parent.id,
        title: parent.title
      } : void 0,
      deleted_at
    );
    await this.bookmarks.remove(bm);
  }
  /** Un-delete a deleted item, or part of a deleted item if `path' is
   * specified.  Removes it from deleted_items and adds it back to bookmarks,
   * hopefully in approximately the same place it was in before. */
  async undelete(deletion, path) {
    const di = this.deleted_items;
    if (typeof di.state.recentlyDeleted === "object" && di.state.recentlyDeleted.key === deletion.key) {
      di.state.recentlyDeleted = 0;
    }
    const item = findChildItem(deletion.item, path).child;
    const stash_root = await this.bookmarks.ensureStashRoot();
    let toFolder;
    let toIndex;
    if (deletion.deleted_from && (!path || path.length == 0)) {
      const from = deletion.deleted_from;
      const folder = this.bookmarks.folder(from.folder_id);
      if (folder) {
        toFolder = folder;
      } else {
        const loaded_root = await this.bookmarks.loaded(stash_root);
        const child = loaded_root.children.find(
          (c) => isFolder(c) && c.title === from.title
        );
        if (child && isFolder(child)) toFolder = child;
      }
    }
    if (!toFolder) {
      if (!("children" in item)) {
        toFolder = await this.ensureRecentUnnamedFolder();
      } else {
        toFolder = stash_root;
        toIndex = 0;
      }
    }
    await this.putItemsInFolder({ items: [item], toFolder, toIndex });
    const restoreFavicons = (item2) => {
      if ("url" in item2 && "favIconUrl" in item2) {
        this.favicons.maybeSet(urlToOpen(item2.url), item2);
      }
      if ("children" in item2) {
        for (const c of item2.children) restoreFavicons(c);
      }
    };
    restoreFavicons(item);
    await di.drop(deletion.key, path);
  }
  /** Closes any hidden tabs that were originally hidden by Tab Stash, but are
   * no longer present as bookmarks in the stash. */
  async closeOrphanedHiddenTabs() {
    const now = Date.now();
    const tabs = await browser.tabs.query({ hidden: true });
    await this.bookmarks.loadedStash();
    const our_hidden_tabs = await Promise.allSettled(
      tabs.map(async (bt) => {
        const mt = this.tabs.tab(bt.id);
        const hidden_by_us = await this.tabs.wasTabHiddenByUs(mt);
        return { tab: mt, atime: bt.lastAccessed, hidden_by_us };
      })
    );
    const tab_ids_to_close = filterMap(our_hidden_tabs, (res) => {
      if (res.status !== "fulfilled") return void 0;
      if (res.value.tab.id === void 0) return void 0;
      if (!res.value.hidden_by_us) return void 0;
      if (res.value.atime && res.value.atime > now - 2e3) {
        return void 0;
      }
      if (this.bookmarks.isURLLoadedInStash(res.value.tab.url)) {
        return void 0;
      }
      return res.value.tab.id;
    });
    await browser.tabs.remove(tab_ids_to_close);
  }
}
function copyIf(predicate, items) {
  if (predicate) return copying(items);
  return items;
}
function copying(items) {
  return filterMap(items, (item) => {
    if (isNewItem(item)) return item;
    if (isWindow(item)) {
      return { title: "", children: copying(item.children) };
    }
    if (isTab(item)) return { title: item.title, url: item.url };
    if (isNode(item)) {
      if (isBookmark$1(item)) {
        return { title: item.title, url: item.url };
      }
      if (isFolder(item)) {
        return {
          title: item.title,
          children: copying(item.children.filter((c) => c !== void 0))
        };
      }
    }
  });
}
function tabLookingAtP(url) {
  const open_url = urlToOpen(url);
  return (t) => {
    if (!t || !t.url) return false;
    const to_url = urlToOpen(t.url);
    return t.url === url || t.url === open_url || to_url === url || to_url === open_url;
  };
}
const the = {
  /** The version number of Tab Stash. */
  version: void 0,
  /** The main model, describing open windows, saved bookmarks, and any other
   * persistent data kept by Tab Stash. */
  model: void 0
};
globalThis.the = the;
async function init() {
  performance.mark("PAGE LOAD START");
  const sources = await resolveNamed({
    browser_settings: Model$5.live(),
    options: Model$8.live(),
    tabs: Model$1.from_browser(),
    // TODO load from cache
    containers: Model$4.from_browser(),
    bookmarks: Model$6.from_browser(),
    // TODO load from cache
    deleted_items: new Model$3(
      new Client("deleted_items")
    )
  });
  the.version = (await browser.management.getSelf()).version;
  the.model = new Model8({
    ...sources,
    favicons: new Model$2(
      new KVSCache(new Client("favicons"))
    ),
    bookmark_metadata: new Model$7(
      new KVSCache(
        new Client("bookmark-metadata")
      )
    )
  });
  const loc = new URL(document.location.href);
  const winId = loc.searchParams.get("window");
  if (winId !== null) {
    const win = the.model.tabs.window(Number.parseInt(winId));
    if (win) the.model.tabs.initialWindow.value = win;
  }
}
const _hoisted_1 = ["disabled", "title"];
const TROUBLESHOOTING_URL = "https://josh-berry.github.io/tab-stash/support.html";
const aboutBrowser = ref("<Unknown Browser>");
if (browser.runtime.getBrowserInfo) {
  browser.runtime.getBrowserInfo().then((info) => {
    aboutBrowser.value = `${info.vendor} ${info.name} ${info.version} ${info.buildID}`;
  });
}
const aboutPlatform = ref("<Unknown Platform>");
if (browser.runtime.getPlatformInfo) {
  browser.runtime.getPlatformInfo().then((info) => {
    aboutPlatform.value = `${info.os} ${info.arch}`;
  });
}
const aboutExtension = ref("<Unknown Extension>");
if (browser.management.getSelf) {
  browser.management.getSelf().then((info) => {
    aboutExtension.value = `${info.name} ${info.version} (${info.installType})`;
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "oops-notification",
  setup(__props) {
    const err_log_el = ref(null);
    const searchedForCrashes = ref(false);
    const showTroubleshooting = () => logErrorsFrom(() => browser.tabs.create({ url: TROUBLESHOOTING_URL }));
    const searchGitHub = () => {
      const terms = errorLog[0].summary.replace(/[0-9]+/g, "").replace(/:\s+\S+$/, "").replace(/\S+:\S+/g, "").replace(/\S+\.\S+/g, "").replace(/"[^"]*"/g, "").replace(/`[^`]*`/g, "").replace(/\S+\@\S+/g, "");
      const url = `https://github.com/josh-berry/tab-stash/issues?q=is%3Aissue+${encodeURIComponent(
        terms
      )}`;
      searchedForCrashes.value = true;
      logErrorsFrom(() => browser.tabs.create({ url }));
    };
    const reportCrash = () => {
      const el = err_log_el.value;
      const crashText = el.innerText;
      const summary = errorLog[0].summary;
      logErrorsFrom(
        () => browser.tabs.create({
          url: `https://github.com/josh-berry/tab-stash/issues/new?assignees=&labels=&projects=&template=1-crash-report.yml&crash-details=${encodeURIComponent(
            crashText
          )}&title=${encodeURIComponent(`[Crash] ${summary}`)}`
        })
      );
    };
    const hideCrashReports = (ms) => logErrorsFrom(async () => {
      await the.model.options.local.set({
        hide_crash_reports_until: Date.now() + ms
      });
      clearErrorLog();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Notification, {
        inactive: "",
        onDismiss: unref(clearErrorLog)
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.msg)
          }, " Oops! Something went wrong. Tab Stash will try to recover automatically. ", 2),
          createBaseVNode("details", {
            class: normalizeClass(_ctx.$style.details),
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }, [
            _cache[8] || (_cache[8] = createBaseVNode("summary", null, "Get Help With This Crash", -1)),
            _cache[9] || (_cache[9] = createBaseVNode("p", null, " Here are a few options that might help. Crash details are shown below for easy reference—they will be cleared once you close this notification. ", -1)),
            createBaseVNode("p", null, [
              createBaseVNode("button", {
                onClick: withModifiers(showTroubleshooting, ["stop"])
              }, " Show Troubleshooting Guide "),
              createBaseVNode("button", {
                onClick: withModifiers(searchGitHub, ["stop"])
              }, "Search for Similar Issues"),
              createBaseVNode("button", {
                disabled: !searchedForCrashes.value,
                title: !searchedForCrashes.value ? `Please search for similar issues before reporting a crash, to be sure you're not about to report a duplicate.` : "",
                onClick: withModifiers(reportCrash, ["stop"])
              }, " Report Crash ", 8, _hoisted_1)
            ]),
            createBaseVNode("p", null, [
              createBaseVNode("output", {
                ref_key: "err_log_el",
                ref: err_log_el,
                class: normalizeClass(_ctx.$style.err_details_list)
              }, [
                createBaseVNode("p", {
                  class: normalizeClass(_ctx.$style.environment)
                }, [
                  createTextVNode(" Browser: " + toDisplayString(aboutBrowser.value) + " (" + toDisplayString(aboutPlatform.value) + ")", 1),
                  _cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
                  createTextVNode(" Extension: " + toDisplayString(aboutExtension.value), 1)
                ], 2),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(errorLog), (err) => {
                  return openBlock(), createElementBlock("p", null, [
                    createBaseVNode("span", {
                      class: normalizeClass(_ctx.$style.err_summary)
                    }, toDisplayString(err.summary), 3),
                    _cache[7] || (_cache[7] = createBaseVNode("br", null, null, -1)),
                    createBaseVNode("span", {
                      class: normalizeClass(_ctx.$style.err_details)
                    }, toDisplayString(err.details), 3)
                  ]);
                }), 256))
              ], 2)
            ])
          ], 2),
          createBaseVNode("details", {
            class: normalizeClass(_ctx.$style.details),
            onClick: _cache[5] || (_cache[5] = withModifiers(() => {
            }, ["stop"]))
          }, [
            _cache[10] || (_cache[10] = createBaseVNode("summary", null, "Hide Crash Reports", -1)),
            _cache[11] || (_cache[11] = createBaseVNode("p", null, " If you're seeing too many crash reports, you can temporarily hide them: ", -1)),
            createBaseVNode("p", null, [
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = withModifiers(($event) => hideCrashReports(5 * 60 * 1e3), ["stop"]))
              }, " for 5 minutes "),
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => hideCrashReports(60 * 60 * 1e3), ["stop"]))
              }, " for 1 hour "),
              createBaseVNode("button", {
                onClick: _cache[3] || (_cache[3] = withModifiers(($event) => hideCrashReports(24 * 60 * 60 * 1e3), ["stop"]))
              }, " for 1 day "),
              createBaseVNode("button", {
                onClick: _cache[4] || (_cache[4] = withModifiers(($event) => hideCrashReports(7 * 24 * 60 * 60 * 1e3), ["stop"]))
              }, " for 1 week ")
            ]),
            _cache[12] || (_cache[12] = createBaseVNode("p", null, "Crash reports can be turned on again in settings.", -1))
          ], 2)
        ]),
        _: 1
      }, 8, ["onDismiss"]);
    };
  }
});
const msg = "_msg_1vyi3_2";
const details = "_details_1vyi3_6";
const err_details_list = "_err_details_list_1vyi3_22";
const error_log = "_error_log_1vyi3_27";
const environment = "_environment_1vyi3_34";
const err_summary = "_err_summary_1vyi3_37";
const err_details = "_err_details_1vyi3_22";
const style0 = {
  msg,
  details,
  err_details_list,
  error_log,
  environment,
  err_summary,
  err_details
};
const cssModules = {
  "$style": style0
};
const OopsNotification = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  CUR_WINDOW_MD_ID as C,
  OopsNotification as O,
  TreeFilter as T,
  friendlyFolderName as a,
  isBookmark$1 as b,
  isFolder$1 as c,
  isNode as d,
  isTab as e,
  findChildItem as f,
  isWindow as g,
  copying as h,
  init as i,
  getDefaultFolderNameISODate as j,
  copyIf as k,
  genDefaultFolderName as l,
  domainForUrl as m,
  pathTo as p,
  the as t
};
