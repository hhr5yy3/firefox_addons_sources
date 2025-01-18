var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c;
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var browserPolyfill = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    {
      factory(module);
    }
  })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module2) {
    var _a2, _b2;
    if (!((_b2 = (_a2 = globalThis.chrome) == null ? void 0 : _a2.runtime) == null ? void 0 : _b2.id)) {
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
        const isThenable = (value) => {
          return value && typeof value === "object" && typeof value.then === "function";
        };
        const makeCallback = (promise, metadata) => {
          return (...callbackArgs) => {
            if (extensionAPIs.runtime.lastError) {
              promise.reject(new Error(extensionAPIs.runtime.lastError.message));
            } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
              promise.resolve(callbackArgs[0]);
            } else {
              promise.resolve(callbackArgs);
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
            const isResultThenable = result !== true && isThenable(result);
            if (result !== true && !isResultThenable && !didCallSendResponse) {
              return false;
            }
            const sendPromisedResult = (promise) => {
              promise.then((msg) => {
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
const browser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
/**
* @vue/shared v3.5.10
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const NOOP = () => {
};
const extend = Object.assign;
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
/**
* @vue/reactivity v3.5.10
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= ~64;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= ~2;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= ~1;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
function batch(sub) {
  sub.flags |= 8;
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    let next;
    while (e) {
      if (!(e.flags & 1)) {
        e.flags &= ~8;
      }
      e = e.next;
    }
    e = batchedSub;
    batchedSub = void 0;
    while (e) {
      next = e.next;
      e.next = void 0;
      e.flags &= ~8;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= ~16;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  const dep = computed2.dep;
  computed2.flags |= 2;
  if (dep.version > 0 && !computed2.isSSR && computed2.deps && !isDirty(computed2)) {
    computed2.flags &= ~2;
    return;
  }
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= ~2;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
  }
  if (!dep.subs && dep.computed) {
    dep.computed.flags &= ~4;
    for (let l = dep.computed.deps; l; l = l.nextDep) {
      removeSub(l, true);
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.target = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = Symbol(
  ""
);
const ARRAY_ITERATE_KEY = Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.target = target;
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, toReactive);
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toReactive(value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
  },
  find(fn, thisArg) {
    return apply(this, "find", fn, thisArg, toReactive, arguments);
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(this, "findLast", fn, thisArg, toReactive, arguments);
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", toReactive);
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (result.value) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toReactive(item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toReactive(item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap2 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap2(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap2(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value, _isShallow = false) {
  if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
    value = toRaw(value);
  }
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value, _isShallow = false) {
  if (!_isShallow && !isShallow(value) && !isReadonly(value)) {
    value = toRaw(value);
  }
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap2 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap2(value), wrap2(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap2 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap2(value[0]), wrap2(value[1])] : wrap2(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add(value) {
      return add.call(this, value, true);
    },
    set(key, value) {
      return set.call(this, key, value, true);
    },
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const watchHandle = () => {
    effect2.stop();
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
          oldValue = newValue;
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  depth--;
  if (isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}
/**
* @vue/runtime-core v3.5.10
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError$1(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError$1(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick$1(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = isFlushing ? flushIndex + 1 : 0;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= ~1;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= ~1;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= ~1;
      }
    }
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentApp = null;
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!cb || immediate) {
      baseWatchOptions.once = true;
    } else {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (ssrCleanup) ssrCleanup.push(watchHandle);
  return watchHandle;
}
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
let currentInstance = null;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set2) => set2(v));
      else setters[0](v);
    };
  };
  registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
let isInSSRComponentSetup = false;
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
const tracers = {};
const flags = {};
globalThis.trace = flags;
function trace_fn(tag, ...context) {
  if (tracers[tag]) return tracers[tag];
  flags[tag] = false;
  const log_tag = `[${tag}]`;
  const f = context.length > 0 ? (...args) => {
    if (!flags[tag]) return;
    console.log(log_tag, ...context, ...args);
    if (flags[tag] === "stack") {
      try {
        throw new Error("stack trace");
      } catch (e) {
        console.log(e);
      }
    }
  } : (...args) => {
    if (!flags[tag]) return;
    console.log(log_tag, ...args);
    if (flags[tag] === "stack") {
      try {
        throw new Error("stack trace");
      } catch (e) {
        console.log(e);
      }
    }
  };
  f.tag = tag;
  return f;
}
const ERROR_LOG_SIZE = 10;
const errorLog = shallowReactive([]);
globalThis.error_log = errorLog;
async function logErrorsFrom(f) {
  try {
    return await f();
  } catch (e) {
    logError(e);
    throw e;
  }
}
function logError(error) {
  console.error(error);
  if (error instanceof Error) {
    errorLog.push({
      error,
      summary: error.message,
      details: error.stack || error.message
    });
  } else if (typeof error === "object") {
    const obj = error;
    errorLog.push({
      error,
      summary: String(error),
      details: "stack" in obj && typeof obj.stack === "string" ? obj.stack : String(error)
    });
  } else {
    errorLog.push({ error, summary: String(error), details: String(error) });
  }
  while (errorLog.length > ERROR_LOG_SIZE) errorLog.shift();
}
class UserError extends Error {
}
const REDIR_PAGE = browser.runtime.getURL("restore.html");
browser.runtime.getPlatformInfo().then((x) => {
});
function expect(value, err) {
  if (value !== void 0) return value;
  throw new Error(err());
}
function urlToOpen(urlstr) {
  try {
    const url = new URL(urlstr);
    switch (url.protocol) {
      case "about:":
        switch (url.pathname) {
          case "blank":
          case "logo":
            break;
          case "reader":
            const res = url.searchParams.get("url");
            if (res) return res + url.hash;
          default:
            return redirUrl(urlstr);
        }
        break;
      case "chrome:":
        if (!browser.runtime.getBrowserInfo) break;
        return redirUrl(urlstr);
      case "javascript:":
      case "file:":
      case "data:":
        return redirUrl(urlstr);
    }
    return urlstr;
  } catch (e) {
    return redirUrl(urlstr);
  }
}
function urlToStash(url) {
  if (url.startsWith(REDIR_PAGE + "?")) {
    const redirUrl2 = new URL(url);
    const origUrl = redirUrl2.searchParams.get("url");
    if (origUrl) return origUrl;
  }
  return url;
}
function redirUrl(url) {
  return `${REDIR_PAGE}?url=${encodeURIComponent(url)}`;
}
function asyncEvent(async_fn) {
  return function(...args) {
    return async_fn.apply(this, args).catch(console.error);
  };
}
async function resolveNamed(promises) {
  const objects = {};
  for (const k of Object.getOwnPropertyNames(promises)) {
    const p = promises[k];
    objects[k] = p instanceof Promise ? await p : p;
  }
  return objects;
}
const later = globalThis.setImmediate ?? globalThis.setTimeout;
async function nextTick() {
  await new Promise((resolve) => later(resolve));
  await nextTick$1.apply(void 0);
}
async function shortPoll(fn, ms = 10) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      return fn();
    } catch (e) {
      if (e !== TRY_AGAIN) throw e;
    }
    await nextTick();
  }
  throw new TimedOutError();
}
const TRY_AGAIN = Symbol("TRY_AGAIN");
function tryAgain() {
  throw TRY_AGAIN;
}
class TimedOutError extends Error {
  constructor() {
    super("Timed out");
  }
}
class AsyncTaskQueue {
  constructor() {
    __publicField(this, "_queue", []);
  }
  /** Returns the length of the queue.  The first element in the queue is always
   * the element that is currently running. */
  get length() {
    return this._queue.length;
  }
  run(fn) {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this._queue.push({
      fn,
      resolve,
      reject,
      promise: promise.then()
    });
    if (this._queue.length === 1) this._run();
    return promise;
  }
  drain() {
    if (this._queue.length === 0) return Promise.resolve();
    return this._queue[this._queue.length - 1].promise;
  }
  _run() {
    const next = this._queue[0];
    if (!next) return;
    logErrorsFrom(async () => {
      try {
        const r = await next.fn();
        next.resolve(r);
      } catch (e) {
        next.reject(e);
        throw e;
      } finally {
        this._queue.shift();
        this._run();
      }
    });
  }
}
function nonReentrant(fn) {
  const q = new AsyncTaskQueue();
  return () => {
    if (q.length < 2) q.run(fn);
    return q.drain();
  };
}
const backingOffDefaults = ((_a = globalThis.mock) == null ? void 0 : _a.events) ? {
  max_delay_ms: 2,
  first_delay_ms: 1,
  exponent: 0,
  reset_after_idle_ms: 2
} : {
  max_delay_ms: 6e4,
  first_delay_ms: 50,
  exponent: 0.8,
  reset_after_idle_ms: 3e5
};
function backingOff(fn, options = backingOffDefaults) {
  let last_finished = Date.now();
  let retry_count = 0;
  return nonReentrant(async () => {
    const now = Date.now();
    const elapsed = now - last_finished;
    if (options.reset_after_idle_ms !== void 0 && elapsed > options.reset_after_idle_ms) {
      retry_count = 0;
    }
    const delay = Math.min(
      options.max_delay_ms,
      options.first_delay_ms * retry_count ** options.exponent
    );
    if (elapsed < delay) {
      await new Promise((r) => setTimeout(r, delay - elapsed));
    }
    try {
      return await fn();
    } finally {
      ++retry_count;
      last_finished = Date.now();
    }
  });
}
function filterMap(array, map) {
  const res = [];
  for (const i of array) {
    const m = map(i);
    if (m !== void 0) res.push(m);
  }
  return res;
}
function batchesOf(size2, iter) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const value = [];
      while (value.length < size2) {
        const r = iter.next();
        if (r.done) break;
        value.push(r.value);
      }
      return { done: value.length === 0, value };
    }
  };
}
function textMatcher(query) {
  if (query === "") return (txt) => true;
  try {
    const re = new RegExp(query, "iu");
    return (txt) => re.test(txt);
  } catch (e) {
    const lower = query.normalize().toLocaleLowerCase();
    return (txt) => txt.normalize().toLocaleLowerCase().includes(lower);
  }
}
const CUR_WINDOW_MD_ID = "";
let Model$8 = class Model {
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
const trace$3 = trace_fn("bookmarks");
const STASH_ROOT = "Tab Stash";
const ROOT_FOLDER_HELP = "https://github.com/josh-berry/tab-stash/wiki/Problems-Locating-the-Tab-Stash-Bookmark-Folder";
let Model$7 = class Model2 {
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
    var _a2, _b2;
    const state = (n) => {
      var _a3, _b3, _c2;
      if (n === void 0) return null;
      return {
        id: n.id,
        title: n.title,
        parentId: (_b3 = (_a3 = n.position) == null ? void 0 : _a3.parent) == null ? void 0 : _b3.id,
        index: (_c2 = n.position) == null ? void 0 : _c2.index,
        ...isBookmark$1(n) ? { url: n.url } : {},
        ...isFolder$1(n) ? { children: n.children.map(state) } : {}
      };
    };
    return {
      root: (_a2 = this.root) == null ? void 0 : _a2.id,
      stash_root: (_b2 = this.stash_root.value) == null ? void 0 : _b2.id,
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
    trace$3("loading", folder.id);
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
    trace$3("creating new stash root");
    await browser.bookmarks.create({ title: this.stash_root_name });
    const start = Date.now();
    let delay = 20;
    let candidates = await this._findRoots();
    while (Date.now() - start < delay) {
      if (candidates.length > 1) {
        trace$3(
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
    trace$3("converged on stash root = ", candidates[0].id);
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
    trace$3("whenBookmarkCreated", new_bm);
    if (id !== new_bm.id) throw new Error(`Bookmark IDs don't match`);
    this._upsertNode(new_bm, "shift-if-new");
  }
  whenBookmarkChanged(id, info) {
    trace$3("whenBookmarkChanged", id, info);
    const node = this.node(id);
    if (!node) {
      if (info.title === this.stash_root_name) this._maybeUpdateStashRoot();
      return;
    }
    this._updateNode(node, info);
  }
  whenBookmarkMoved(id, info) {
    trace$3("whenBookmarkMoved", id, info);
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
    trace$3("whenBookmarkRemoved", id);
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
    trace$3("_findRoots", searched.length, "folders named", this.stash_root_name);
    let to_fetch = new Set(searched.map((c) => c.parentId));
    let to_upsert = Array.from(searched);
    while (to_fetch.size > 0) {
      trace$3("_findRoots fetching", to_fetch);
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
        trace$3("_findRoots", "set stash_root to", candidates[0].id);
      }
    } else if (this.stash_root.value !== void 0) {
      trace$3("_findRoots", "cleared stash_root");
      this.stash_root.value = void 0;
    }
    if (candidates.length > 1) {
      trace$3("_findRoots", "found multiple stash_root candidates");
      this.stash_root_warning.value = {
        text: `You have multiple "${this.stash_root_name}" bookmark folders, and Tab Stash isn't sure which one to use.  Click here to find out how to resolve the issue.`,
        /* istanbul ignore next */
        help: () => browser.tabs.create({ active: true, url: ROOT_FOLDER_HELP })
      };
    } else if (this.stash_root_warning.value !== void 0) {
      trace$3("_findRoots", "found single stash_root candidate");
      this.stash_root_warning.value = void 0;
    }
    return candidates;
  }
  /** Update or create a model node, populating it with information from the
   * browser. The model node is returned. */
  _upsertNode(btn, shiftIfNew) {
    var _a2, _b2;
    const nodeId = btn.id;
    let node = this.by_id.get(nodeId);
    const parent = btn.parentId !== void 0 && this.folder(btn.parentId);
    trace$3("_upsertNode", nodeId, btn.parentId, btn.index, btn.title);
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
      if (parent !== ((_a2 = node.position) == null ? void 0 : _a2.parent) || pos.index !== ((_b2 = node.position) == null ? void 0 : _b2.index)) {
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
    trace$3("_updateNode", node.id, btn.url, urlChanged, btn.title, titleChanged);
    if (titleChanged) node.title = btn.title;
    if (urlChanged) {
      this._remove_url(node);
      node.url = btn.url;
      this._add_url(node);
    }
    if (isFolder$1(node)) {
      if (node.title === this.stash_root_name) this._stash_root_watch.add(node);
      if (titleChanged && this._stash_root_watch.has(node)) {
        trace$3("_updateNode", "triggering stash root check");
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
let Model$6 = class Model3 {
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
let Model$5 = class Model4 {
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
    var _a2, _b2, _c2, _d, _e, _f, _g;
    const supports_containers = [
      typeof ((_a2 = browser.contextualIdentities) == null ? void 0 : _a2.query),
      typeof ((_c2 = (_b2 = browser.contextualIdentities) == null ? void 0 : _b2.onCreated) == null ? void 0 : _c2.addListener),
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
function makeRandomString(bytes) {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return btoa(String.fromCharCode(...a)).replace(/=+$/, "");
}
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
let Model$4 = class Model5 {
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
let Model$3 = class Model6 {
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
    var _a2, _b2;
    return ((_a2 = this.get(url).value) == null ? void 0 : _a2.favIconUrl) ?? ((_b2 = this.getForDomain(url).value) == null ? void 0 : _b2.favIconUrl) ?? void 0;
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
let eventClass;
if ((_b = globalThis.mock) == null ? void 0 : _b.events) {
  eventClass = globalThis.MockEvent;
} else {
  eventClass = class Event {
    constructor() {
      __publicField(this, "_listeners", /* @__PURE__ */ new Set());
    }
    addListener(l) {
      this._listeners.add(l);
    }
    removeListener(l) {
      this._listeners.delete(l);
    }
    hasListener(l) {
      return this._listeners.has(l);
    }
    hasListeners() {
      return this._listeners.size > 0;
    }
    send(...args) {
      Promise.resolve().then(() => this.sendSync(...args));
    }
    sendSync(...args) {
      for (const fn of this._listeners) {
        try {
          fn(...args);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
}
function event(name, instance) {
  return new eventClass(name, instance);
}
function aBoolean(value, fallback) {
  switch (typeof value) {
    case "undefined":
      return fallback;
    case "boolean":
      return value;
    case "number":
      if (value === 0) return false;
      return true;
    case "string":
      switch (value.toLowerCase()) {
        case "false":
        case "no":
          return false;
        case "true":
        case "yes":
          return true;
        default:
          return fallback;
      }
    default:
      switch (value) {
        case null:
          return false;
        default:
          return fallback;
      }
  }
}
function aNumber(value, fallback) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "string":
      const res = Number(value);
      if (Number.isNaN(res)) return fallback;
      return res;
    default:
      return fallback;
  }
}
function aString(value, fallback) {
  switch (typeof value) {
    case "undefined":
      return fallback;
    case "boolean":
    case "number":
      return value.toString();
    case "string":
      return value;
    default:
      return fallback;
  }
}
function maybeUndef(converter) {
  return (value, fallback) => {
    switch (value) {
      case void 0:
      case null:
        return void 0;
      default:
        return converter(value, fallback);
    }
  };
}
const anEnum = (...cases) => (value, fallback) => {
  if (cases.includes(value)) return value;
  return fallback;
};
function get(store, key, def) {
  return _FACTORY.get(store, key, def);
}
class _StoredObjectFactory {
  constructor() {
    /** A simple set of maps which hold StoredObjects so we can keep them up to
     * date. */
    __publicField(this, "_live", { sync: /* @__PURE__ */ new Map(), local: /* @__PURE__ */ new Map() });
    /** The set of objects we are currently trying to load.  We keep track of
     * this set because objects can be loaded in one of two ways--either through
     * _factory(), which queries browser.storage explicitly, or by receiving an
     * event saying the object has been changed or deleted.
     *
     * In the latter case, the event has more up-to-date information than
     * _factory() will, so we populate the object from the event and remove it
     * from `_loading`.  Then, when browser.storage.*.get() returns inside
     * _factory(), we check to see if the object has already been loaded by an
     * event, by looking to see if it's still in this set. */
    __publicField(this, "_loading", /* @__PURE__ */ new Set());
    browser.storage.onChanged.addListener((changes, area) => {
      if (area !== "sync" && area !== "local") return;
      const area_live = this._live[area];
      for (const key in changes) {
        const obj = area_live.get(key);
        if (!obj) continue;
        if ("newValue" in changes[key]) {
          obj._changed(changes[key].newValue);
        } else {
          obj._changed({});
        }
        this._loading.delete(obj);
      }
    });
  }
  async get(store, key, def) {
    let object = this._live[store].get(key);
    if (object) {
      if (object._def !== def) {
        throw new TypeError(`Tried to load '${key}' with a conflicting def`);
      }
      return object;
    }
    object = new StoredObjectImpl(this, store, key, def);
    this._loading.add(object);
    const data = await browser.storage[store].get(key);
    if (this._loading.has(object)) {
      object._load(data[key]);
      this._loading.delete(object);
    }
    return object;
  }
  add(o) {
    if (this._live[o._store].has(o._key)) {
      throw new Error(`Created multiple StoredObjects for key ${o._key}`);
    }
    this._live[o._store].set(o._key, o);
  }
}
const _FACTORY = new _StoredObjectFactory();
class StoredObjectImpl {
  constructor(factory, store, key, def) {
    // Read-only data properties as defined in your schema (named `state` to
    // follow Vue model conventions).
    __publicField(this, "state");
    // Event listener which is notified whenever the StoredObject changes or
    // is deleted.
    __publicField(this, "onChanged");
    __publicField(this, "_factory");
    __publicField(this, "_store");
    __publicField(this, "_key");
    __publicField(this, "_def");
    const state = {};
    for (const k in def) state[k] = def[k].default;
    this.state = reactive(state);
    this.onChanged = event("StoredObject.onChanged", `${store}/${key}`);
    this._factory = factory;
    this._store = store;
    this._key = key;
    this._def = def;
    this._factory.add(this);
  }
  async set(values) {
    const data = {};
    for (const k in this._def) {
      if (!(k in values)) {
        if (this.state[k] !== this._def[k].default) {
          data[k] = this.state[k];
        }
        continue;
      }
      const v = this._def[k].is(values[k], this._def[k].default);
      if (v === this._def[k].default) continue;
      data[k] = v;
    }
    return await browser.storage[this._store].set({ [this._key]: data });
  }
  async delete() {
    this._changed({});
    return browser.storage[this._store].remove(this._key);
  }
  _changed(values) {
    this._load(values);
    this.onChanged.send(this);
  }
  _load(values) {
    for (const k in this._def) this.state[k] = this._def[k].default;
    if (typeof values === "object") {
      for (const k in values) {
        if (k in this._def) {
          this.state[k] = this._def[k].is(
            values[k],
            this._def[k].default
          );
        }
      }
    }
  }
}
const SHOW_WHAT_OPT = anEnum("sidebar", "tab", "popup", "none");
const STASH_WHAT_OPT = anEnum("all", "single", "none");
const SYNC_DEF = {
  // Should we show advanced settings to the user?
  meta_show_advanced: { default: false, is: aBoolean },
  // When the user stashes from the context menu or address bar button, do we
  // show the "sidebar", "tab", or "none" (of the above)?
  open_stash_in: {
    default: void 0,
    is: maybeUndef(SHOW_WHAT_OPT)
  },
  // When the user clicks the browser toolbar button, what tabs do we stash?
  browser_action_stash: {
    default: void 0,
    is: maybeUndef(STASH_WHAT_OPT)
  },
  // When the user clicks the browser toolbar button, what UI do we show?
  browser_action_show: {
    default: void 0,
    is: maybeUndef(SHOW_WHAT_OPT)
  },
  // In the stash list, show all open tabs at the top instead of just the
  // unstashed tabs.
  show_open_tabs: {
    default: "unstashed",
    is: anEnum("unstashed", "all")
  },
  // How are new folders of tabs shown, expanded or collapsed?
  show_new_folders: {
    default: "expanded",
    is: anEnum("expanded", "collapsed")
  },
  // How big should the spacing/fonts be?
  ui_metrics: {
    default: "normal",
    is: anEnum("normal", "compact")
  },
  // What color scheme should the UI use?
  ui_theme: {
    default: "system",
    is: anEnum("system", "light", "dark")
  },
  // If we're stashing to a "recent" unnamed folder, how recent is "recent"?
  // If the most recent unnamed folder is older than <X> minutes ago, we will
  // create a new folder instead of appending to the existing one.
  new_folder_timeout_min: { default: 5, is: aNumber },
  // How long should we keep deleted items for?
  deleted_items_expiration_days: { default: 180, is: aNumber }
};
const LOCAL_DEF = {
  // What's the last version number at which we showed the user an update
  // notification?  "undefined" = either a new install, or an upgrade from
  // an older version which didn't have this option.
  last_notified_version: {
    default: void 0,
    is: maybeUndef(aString)
  },
  // What should we do with a tab once it's been stashed?  'hide' it,
  // 'hide_discard' it or 'close' it?
  after_stashing_tab: {
    default: "hide",
    is: anEnum("hide", "hide_discard", "close")
  },
  // If we 'hide' stashed tabs, should we discard() them if they haven't
  // been used in a while?
  autodiscard_hidden_tabs: { default: true, is: aBoolean },
  // Parameters that dictate how aggressive autodiscard_hidden_tabs is.
  autodiscard_interval_min: { default: 2, is: aNumber },
  autodiscard_min_keep_tabs: { default: 10, is: aNumber },
  autodiscard_target_tab_count: { default: 50, is: aNumber },
  autodiscard_target_age_min: { default: 10, is: aNumber },
  /** Whether or not to load restored tabs immediately or wait for the user to
   * click on them.  (That is, should newly-opened tabs be discarded or not?) */
  load_tabs_on_restore: {
    default: "immediately",
    is: anEnum("immediately", "lazily")
  },
  /** Confirm whether to close lots of open tabs or not. */
  confirm_close_open_tabs: { default: true, is: aBoolean },
  /** Disable crash reports for a certain amount of time. */
  hide_crash_reports_until: { default: void 0, is: maybeUndef(aNumber) },
  // Feature flags
  /** Re-open a recently-closed tab if one can't be found.  Disabled by
   * default because of bugs in Firefox.  See #188. */
  ff_restore_closed_tabs: { default: false, is: aBoolean },
  /** Container color indicators. Related issue: #125 */
  // ff_container_indicators: {default: false, is: aBoolean},
  // Migration flags
  /** Tracks whether we have marked hidden tabs in the session store as
   * belonging to Tab Stash. */
  migrated_tab_markers_applied: { default: false, is: aBoolean }
};
let Model$2 = class Model7 {
  constructor(src) {
    __publicField(this, "sync");
    __publicField(this, "local");
    /** Do we need to show a crash-report notification to the user? */
    __publicField(this, "showCrashReport", computed(() => {
      const until = this.local.state.hide_crash_reports_until || 0;
      if (this._now.value < until) {
        setTimeout(
          () => {
            this._now.value = Date.now();
          },
          until - this._now.value + 1
        );
        return false;
      }
      return errorLog.length > 0 && !!errorLog.find((e) => !(e.error instanceof UserError));
    }));
    __publicField(this, "_now", ref(Date.now()));
    this.sync = src.sync;
    this.local = src.local;
  }
  static async live() {
    return new Model7(
      await resolveNamed({
        sync: get("sync", "options", SYNC_DEF),
        local: get("local", "options", LOCAL_DEF)
      })
    );
  }
  /** Is the Firefox sidebar supported? */
  hasSidebar() {
    return !!browser.sidebarAction;
  }
  /** Based on the current settings, what can the toolbar stash? */
  canBrowserActionStash(what) {
    const browserActionShow = this.sync.state.browser_action_show;
    switch (what) {
      case "none":
        return browserActionShow !== "none";
      default:
        return browserActionShow !== "popup";
    }
  }
  /** Based on the current settings, what UIs can the browser show? */
  canBrowserActionShow(what) {
    if (what === "sidebar" && !browser.sidebarAction) return false;
    const browserActionStash = this.sync.state.browser_action_stash;
    switch (what) {
      case "none":
        return browserActionStash !== "none";
      case "popup":
        return browserActionStash === "none";
      default:
        return true;
    }
  }
};
const trace$2 = trace_fn("tabs");
const SK_HIDDEN_BY_TAB_STASH = "hidden_by_tab_stash";
const MAX_LOADING_TABS = navigator.hardwareConcurrency ?? 4;
let Model$1 = class Model8 {
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
        trace$2("(Re-)loading the model");
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
        trace$2(
          "Model (re-)load finished; seen events since load started =",
          this._event_since_load
        );
      }
    }));
    this.initialWindow.value = initial_window;
    trace$2("Wiring events");
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
    const model = new Model8(win == null ? void 0 : win.id);
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
  activeTab(window2) {
    if (window2 === void 0) window2 = this.targetWindow.value;
    if (window2 === void 0) return void 0;
    return window2.children.filter((t) => t.active)[0];
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
        trace$2("creating tab", create_tab);
        const t2 = await browser.tabs.create(create_tab);
        return await shortPoll(
          () => this.tabs.get(t2.id) || tryAgain()
        );
      });
    }
    create_tab.discarded = true;
    trace$2("creating tab", create_tab);
    const t = await browser.tabs.create(create_tab);
    const m = await shortPoll(() => this.tabs.get(t.id) || tryAgain());
    if (!tab.discarded) {
      this._loading_queue.run(async () => {
        await this._safe_to_load_another_tab();
        if (this.tabs.get(m.id) !== m) return;
        if (!m.discarded) return;
        trace$2("loading tab after creation", create_tab);
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
    trace$2("moving tab", tab, { toWindow, toIndex });
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
      trace$2("hiding tabs", tabs);
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
    trace$2("removing tabs", tids);
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
          var _a2, _b2;
          return ((_a2 = t.position) == null ? void 0 : _a2.parent) === ((_b2 = active_tab.position) == null ? void 0 : _b2.parent);
        }
      );
      if (closing_tabs_in_window.length >= visible_tabs.length) {
        trace$2("creating new empty tab in window", win.id);
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
          trace$2("switching focus to tab", focus_tab.id);
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
    let window2 = this.windows.get(wid);
    if (!window2) {
      window2 = reactive({
        id: wid,
        position: void 0,
        children: [],
        isLoaded: true
      });
      this.windows.set(wid, window2);
    }
    trace$2("event windowCreated", win.id, win);
    if (win.tabs !== void 0) {
      for (const t of win.tabs) this.whenTabCreated(t);
    }
    if (window2.id === this.initialWindow.value) {
      this.initialWindow.value = window2;
    }
    if (window2.id === this.focusedWindow.value) {
      this.focusedWindow.value = window2;
    }
    return window2;
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
    trace$2("event windowRemoved", winId, win);
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
    trace$2(
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
    trace$2("event tabUpdated", id, info.url, info);
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
    trace$2("event tabMoved", tabId, info);
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
    trace$2("event tabReplaced", oldId, "=>", newId);
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
    trace$2("event tabActivated", info.tabId, info);
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
    trace$2("event tabsHighlighted", info);
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
    trace$2("event tabRemoved", tabId);
    const t = this.tabs.get(tabId);
    if (!t) return;
    const pos = t.position;
    if (pos) removeNode(pos);
    trace$2("event ...tabRemoved", tabId, pos);
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
const trace$1 = trace_fn("model");
const isModelParent = (item) => "children" in item;
const isModelItem = (item) => "id" in item;
const isWindow = (item) => "id" in item && typeof item.id === "number" && "children" in item;
const isTab = (item) => "id" in item && typeof item.id === "number" && !("children" in item);
const isNode = (item) => "id" in item && typeof item.id === "string";
const isBookmark = (item) => isNode(item) && isBookmark$1(item);
const isFolder = (item) => isNode(item) && isFolder$1(item);
const isNewItem = (item) => !("id" in item);
class Model9 {
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
      trace$1("[pre-reload] dump of tab state", this.tabs.dumpState());
      trace$1("[pre-reload] dump of bookmark state", this.bookmarks.dumpState());
      await Promise.all([
        this.tabs.reload(),
        this.containers.reload(),
        this.bookmarks.reload(),
        this.browser_settings.reload()
      ]);
      trace$1("[post-reload] dump of tab state", this.tabs.dumpState());
      trace$1("[post-reload] dump of bookmark state", this.bookmarks.dumpState());
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
      var _a2, _b2;
      if (isTab(item)) {
        if (item.pinned || item.hidden) return false;
        if (this.options.sync.state.show_open_tabs === "unstashed" && this.bookmarks.isURLLoadedInStash(item.url)) {
          return false;
        }
      }
      if (this.filter.info(item).isMatching) return true;
      const parent = (_a2 = item.position) == null ? void 0 : _a2.parent;
      if (parent && ((_b2 = this.showFilteredChildren.get(parent)) == null ? void 0 : _b2.value)) return true;
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
  stashableTabsInWindow(window2) {
    const tabs = window2.children.filter((t) => !t.hidden);
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
  async stashAllTabsInWindow(window2, options) {
    const tabs = this.stashableTabsInWindow(window2);
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
    var _a2, _b2, _c2;
    const parent = (_a2 = bm.position) == null ? void 0 : _a2.parent;
    await this.deleted_items.add(
      {
        title: bm.title ?? "<no title>",
        url: bm.url ?? "about:blank",
        favIconUrl: ((_c2 = (_b2 = this.favicons.get(urlToOpen(bm.url))) == null ? void 0 : _b2.value) == null ? void 0 : _c2.favIconUrl) || void 0
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
let listener_count = 0;
const trace = trace_fn("nano_port", (_c = globalThis == null ? void 0 : globalThis.location) == null ? void 0 : _c.pathname);
class SvcRegistry {
  constructor() {
    __publicField(this, "services", /* @__PURE__ */ new Map());
    __publicField(this, "listener", (port) => {
      const svc = this.services.get(port.name);
      if (!svc) {
        trace(`[listener] ignored connection for ${port.name}`);
        return;
      }
      ++listener_count;
      const nport = new Port(`${port.name}<${listener_count}`, port);
      nport.onDisconnect = () => {
        if (svc.onDisconnect) svc.onDisconnect(nport);
      };
      nport.onRequest = (msg) => {
        if (svc.onRequest) return svc.onRequest(nport, msg);
        return not_implemented();
      };
      nport.onNotify = (msg) => {
        if (svc.onNotify) svc.onNotify(nport, msg);
        else if (svc.onRequest) svc.onRequest(nport, msg);
      };
      trace(`[listener] Accepted connection for ${port.name} as ${nport.name}`);
      if (svc.onConnect) svc.onConnect(nport);
    });
  }
  reset_testonly() {
    this.services.clear();
    browser.runtime.onConnect.removeListener(this.listener);
  }
  register(name, svc) {
    if (this.services.has(name)) {
      throw new Error(`Service ${name} is already launched`);
    }
    trace("[listener] listening for service", name);
    this.services.set(name, svc);
    if (this.services.size == 1) {
      browser.runtime.onConnect.addListener(this.listener);
    }
  }
}
const registry = new SvcRegistry();
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
    this.port.onMessage.addListener((msg) => {
      this._trace("recv", msg);
      if (typeof msg !== "object") return;
      if ("tag" in msg) {
        if ("request" in msg) {
          logErrorsFrom(() => this._handleRequest(msg));
        } else if ("response" in msg || "error" in msg) {
          this._handleResponse(msg);
        }
      } else if ("notify" in msg) {
        if (this.onNotify) this.onNotify(msg.notify);
        else {
          if (this.onRequest) this.onRequest(msg.notify);
        }
      }
    });
    this._trace("create");
  }
  static connect(name) {
    trace("connect", name);
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
  async _handleRequest(msg) {
    let res;
    try {
      if (!this.onRequest) await not_implemented();
      res = { response: await this.onRequest(msg.request) };
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
    const resmsg = { tag: msg.tag, ...res };
    try {
      this._trace("send", resmsg);
      this.port.postMessage(resmsg);
    } catch (e) {
      this._trace("dropped reply to request:", msg, "error:", e);
    }
  }
  _handleResponse(msg) {
    const handler = this.pending.get(msg.tag);
    if (!handler) return;
    clearTimeout(handler.timeout_id);
    if ("response" in msg) {
      handler.resolve(msg.response);
    } else {
      handler.reject(new RemoteNanoError(msg.error));
    }
  }
  _trace(...args) {
    trace(`[${this.name}]`, ...args);
  }
}
function not_implemented() {
  const e = new Error("No request handler defined");
  e.name = "NotImplemented";
  return Promise.reject(e);
}
function listen(name, svc) {
  registry.register(name, svc);
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
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event2) => {
      upgrade(wrap(request.result), event2.oldVersion, event2.newVersion, wrap(request.transaction), event2);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event2) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event2.oldVersion,
      event2.newVersion,
      event2
    ));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event2) => blocking(event2.oldVersion, event2.newVersion, event2));
    }
  }).catch(() => {
  });
  return openPromise;
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
class Service {
  constructor(db, store_name) {
    /* c8 ignore stop */
    __publicField(this, "name");
    __publicField(this, "onSet");
    __publicField(this, "onSyncLost");
    __publicField(this, "_db");
    __publicField(this, "_clients", /* @__PURE__ */ new Set());
    /** We queue all write operations to the DB to avoid weirdnesses that seem to
     * happen with IndexedDB and concurrent transactions. */
    __publicField(this, "_write_queue", new AsyncTaskQueue());
    this.name = store_name;
    this.onSet = event("KVS.Service.onSet", this.name);
    this.onSyncLost = event("KVS.Service.onSyncLost", this.name);
    this._db = db;
  }
  /* c8 ignore start -- opens a live IndexedDB, usable only in prod */
  static async open(db_name, store_name) {
    if (!await navigator.storage.persisted()) {
      await navigator.storage.persist();
    }
    return new Service(
      await openDB(db_name, 1, {
        upgrade(db, oldVersion, newVersion, txn) {
          db.createObjectStore(store_name);
        }
      }),
      store_name
    );
  }
  //
  // KeyValueStore implementation
  //
  async get(keys) {
    const txn = this._db.transaction(this.name);
    const res = [];
    for (const key of keys) {
      const value = await txn.store.get(key);
      if (value) res.push({ key, value });
    }
    return res;
  }
  async getStartingFrom(bound, limit) {
    const b = bound !== void 0 ? IDBKeyRange.lowerBound(bound, true) : void 0;
    const txn = this._db.transaction(this.name);
    let cursor = await txn.store.openCursor(b);
    const res = [];
    while (cursor && limit > 0) {
      res.push({ key: cursor.primaryKey, value: cursor.value });
      --limit;
      cursor = await cursor.continue();
    }
    await txn.done;
    return res;
  }
  async getEndingAt(bound, limit) {
    const b = bound !== void 0 ? IDBKeyRange.upperBound(bound, true) : void 0;
    const txn = this._db.transaction(this.name);
    let cursor = await txn.store.openCursor(b, "prev");
    const res = [];
    while (cursor && limit > 0) {
      res.push({ key: cursor.primaryKey, value: cursor.value });
      --limit;
      cursor = await cursor.continue();
    }
    await txn.done;
    return res;
  }
  list() {
    return genericList((bound, limit) => this.getStartingFrom(bound, limit));
  }
  listReverse() {
    return genericList((bound, limit) => this.getEndingAt(bound, limit));
  }
  set(entries) {
    return this._write_queue.run(async () => {
      if (entries.length === 0) return;
      const txn = this._db.transaction(this.name, "readwrite");
      for (const { key, value } of entries) {
        if (value !== void 0) await txn.store.put(value, key);
        else await txn.store.delete(key);
      }
      await txn.done;
      this._broadcast({ $type: "set", entries });
      this.onSet.send(entries);
    });
  }
  async deleteAll() {
    while (true) {
      const deletes = [];
      await this._write_queue.run(async () => {
        const txn = this._db.transaction(this.name, "readwrite");
        let cursor = await txn.store.openCursor();
        while (cursor) {
          deletes.push({ key: cursor.primaryKey });
          cursor.delete();
          cursor = await cursor.continue();
          if (deletes.length > 100) break;
        }
        await txn.done;
      });
      if (deletes.length > 0) {
        this._broadcast({ $type: "set", entries: deletes });
        this.onSet.send(deletes);
      } else {
        break;
      }
    }
  }
  //
  // NanoService implementation (for remote KVS service)
  //
  onConnect(port) {
    this._clients.add(port);
  }
  onDisconnect(port) {
    this._clients.delete(port);
  }
  async onRequest(port, msg) {
    switch (msg == null ? void 0 : msg.$type) {
      case "get":
        return {
          $type: "entries",
          entries: await this.get(msg.keys)
        };
      case "getStartingFrom":
        return {
          $type: "entries",
          entries: await this.getStartingFrom(msg.bound, msg.limit)
        };
      case "getEndingAt":
        return {
          $type: "entries",
          entries: await this.getEndingAt(msg.bound, msg.limit)
        };
      case "set":
        await this.set(msg.entries);
        return null;
      case "deleteAll":
        await this.deleteAll();
        return null;
      default:
        return null;
    }
  }
  _broadcast(msg) {
    for (const c of this._clients) c.notify(msg);
  }
}
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
    for (const batch2 of batchesOf(25, map.keys())) {
      const entries = await this.kvs.get(batch2);
      for (const e of entries) this._update(e.key, e.value);
    }
  }
  async _flush() {
    const map = this._needs_flush;
    this._needs_flush = /* @__PURE__ */ new Map();
    for (const batch2 of batchesOf(25, map.values())) {
      const dirty = JSON.parse(JSON.stringify(batch2));
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
async function service_model() {
  const kvs = await resolveNamed({
    deleted_items: Service.open(
      "deleted_items",
      "deleted_items"
    ),
    favicons: Service.open(
      "favicons",
      "favicons"
    ),
    bookmark_metadata: Service.open("bookmark-metadata", "bookmark-metadata")
  });
  const sources = await resolveNamed({
    browser_settings: Model$6.live(),
    options: Model$2.live(),
    tabs: Model$1.from_browser("background"),
    containers: Model$5.from_browser(),
    bookmarks: Model$7.from_browser(),
    deleted_items: new Model$4(kvs.deleted_items)
  });
  listen("deleted_items", kvs.deleted_items);
  listen("favicons", kvs.favicons);
  listen("bookmark-metadata", kvs.bookmark_metadata);
  const model = new Model9({
    ...sources,
    favicons: new Model$3(new KVSCache(kvs.favicons)),
    bookmark_metadata: new Model$8(
      new KVSCache(kvs.bookmark_metadata)
    )
  });
  globalThis.model = model;
  return model;
}
logErrorsFrom(async () => {
  const model = await service_model();
  globalThis.model = model;
  indexedDB.deleteDatabase("cache:favicons");
  indexedDB.deleteDatabase("cache:bookmarks");
  if (!model.options.local.state.migrated_tab_markers_applied) {
    logErrorsFrom(async () => {
      if (!!browser.tabs.hide && model.bookmarks.stash_root.value) {
        const tabs = await browser.tabs.query({ hidden: true });
        await model.bookmarks.loadedStash();
        const stashed_hidden_tabs = tabs.filter(
          (t) => model.bookmarks.isURLLoadedInStash(t.url)
        );
        await model.tabs.hide(
          filterMap(stashed_hidden_tabs, (t) => model.tabs.tab(t.id))
        );
      }
      await model.options.local.set({ migrated_tab_markers_applied: true });
    });
  }
  function menu(idprefix, contexts, def) {
    const allowed_ctxs = Object.values(browser.contextMenus.ContextType);
    contexts = contexts.filter((x) => allowed_ctxs.includes(x));
    for (let [id, title] of def) {
      if (id) {
        browser.contextMenus.create({ contexts, title, id: idprefix + id });
      } else {
        browser.contextMenus.create({
          contexts,
          type: "separator",
          enabled: false
        });
      }
    }
  }
  const SHOW_TAB_NAME = browser.sidebarAction ? "Show Stashed Tabs in a Tab" : "Show Stashed Tabs";
  menu(
    "1:",
    ["tab", "page", "tools_menu"],
    [
      ["show_tab", SHOW_TAB_NAME],
      ...browser.sidebarAction ? [["show_sidebar_or_tab", "Show Stashed Tabs in Sidebar"]] : [],
      ["", ""],
      ["stash_all", "Stash Tabs"],
      ["stash_one", "Stash This Tab"],
      ["stash_one_newgroup", "Stash This Tab to a New Group"],
      ["", ""],
      ["copy_all", "Copy Tabs to Stash"],
      ["copy_one", "Copy This Tab to Stash"],
      ["", ""],
      ["options", "Options..."]
    ]
  );
  menu(
    "2:",
    ["browser_action"],
    [
      ["show_tab", SHOW_TAB_NAME],
      ...browser.sidebarAction ? [["show_sidebar_or_tab", "Show Stashed Tabs in Sidebar"]] : [],
      ["", ""],
      ["stash_all", "Stash Tabs"],
      ["copy_all", "Copy Tabs to Stash"]
    ]
  );
  menu(
    "3:",
    ["page_action"],
    [
      ["show_tab", SHOW_TAB_NAME],
      ...browser.sidebarAction ? [["show_sidebar_or_tab", "Show Stashed Tabs in Sidebar"]] : [],
      ["", ""],
      ["stash_one", "Stash This Tab"],
      ["stash_one_newgroup", "Stash This Tab to a New Group"],
      ["copy_one", "Copy This Tab to Stash"]
    ]
  );
  const commands = {
    // NOTE: Several of these commands open the sidebar.  We have to open the
    // sidebar before the first "await" call, otherwise we won't actually have
    // permission to do so per Firefox's API rules.
    //
    // Also note that some browsers don't support the sidebar at all; in these
    // cases, we open the tab instead.
    show_sidebar_or_tab: () => browser.sidebarAction ? browser.sidebarAction.open().catch(console.log) : commands.show_tab(),
    async show_popup() {
      try {
        await browser.browserAction.setPopup({
          popup: "stash-list.html?view=popup"
        });
        await browser.browserAction.openPopup();
      } finally {
        await browser.browserAction.setPopup({ popup: "" });
      }
    },
    async show_tab() {
      await model.restoreTabs(
        [
          {
            title: "Tab Stash",
            url: browser.runtime.getURL("stash-list.html")
          }
        ],
        {}
      );
    },
    async stash_all(tab) {
      show_something(model.options.sync.state.open_stash_in);
      await stash_something({ what: "all", copy: false, tab });
    },
    async stash_one(tab) {
      show_something(model.options.sync.state.open_stash_in);
      await stash_something({ what: "single", copy: false, tab });
    },
    async stash_one_newgroup(tab) {
      show_something(model.options.sync.state.open_stash_in);
      if (!tab) return;
      await model.putItemsInFolder({
        items: [tab],
        toFolder: await model.bookmarks.createStashFolder()
      });
    },
    async copy_all(tab) {
      show_something(model.options.sync.state.open_stash_in);
      await stash_something({ what: "all", copy: true, tab });
    },
    async copy_one(tab) {
      show_something(model.options.sync.state.open_stash_in);
      await stash_something({ what: "single", copy: true, tab });
    },
    async options() {
      await browser.runtime.openOptionsPage();
    }
  };
  function show_something(show_what) {
    switch (show_what) {
      case "none":
        break;
      case "tab":
        model.attempt(commands.show_tab);
        break;
      case "popup":
        model.attempt(commands.show_popup);
      case "sidebar":
        model.attempt(commands.show_sidebar_or_tab);
        break;
      default:
        show_setup_page();
        break;
    }
  }
  async function stash_something(options) {
    if (!options.tab || options.tab.position === void 0) return;
    switch (options.what) {
      case "all":
        await model.stashAllTabsInWindow(options.tab.position.parent, {
          copy: !!options.copy
        });
        break;
      case "single":
        await model.putItemsInFolder({
          items: copyIf(!!options.copy, [options.tab]),
          toFolder: await model.ensureRecentUnnamedFolder()
        });
        break;
      case "none":
      default:
        break;
    }
  }
  function show_setup_page() {
    model.attempt(
      () => model.restoreTabs(
        [
          {
            title: "Tab Stash - Setup",
            url: browser.runtime.getURL("setup.html")
          }
        ],
        {}
      )
    );
  }
  browser.contextMenus.onClicked.addListener((info, tab) => {
    const cmd = info.menuItemId.replace(/^[^:]*:/, "");
    console.assert(!!commands[cmd]);
    const t = (tab == null ? void 0 : tab.id) ? model.tabs.tab(tab == null ? void 0 : tab.id) : void 0;
    commands[cmd](t).catch(console.log);
  });
  if (browser.browserAction) {
    let setupPopup = function() {
      model.attempt(async () => {
        if (model.options.sync.state.browser_action_show === "popup") {
          await browser.browserAction.setPopup({
            popup: "stash-list.html?view=popup"
          });
        } else {
          await browser.browserAction.setPopup({ popup: "" });
        }
      });
    };
    setupPopup();
    model.options.sync.onChanged.addListener(setupPopup);
    browser.browserAction.onClicked.addListener(
      asyncEvent(async (tab) => {
        const opts = model.options.sync.state;
        if (!opts.browser_action_show || !opts.browser_action_stash) {
          show_setup_page();
          return;
        }
        show_something(opts.browser_action_show);
        await stash_something({
          what: opts.browser_action_stash,
          tab: model.tabs.tab(tab.id)
        });
      })
    );
  }
  if (browser.pageAction) {
    browser.pageAction.onClicked.addListener(
      asyncEvent(async (tab) => {
        if (!model.options.sync.state.open_stash_in) {
          show_setup_page();
          return;
        }
        commands.stash_one(model.tabs.tab(tab.id));
      })
    );
  }
  if (model.options.local.state.last_notified_version === void 0) {
    model.attempt(
      async () => model.options.local.set({
        last_notified_version: (await browser.management.getSelf()).version
      })
    );
  }
  model.options.sync.onChanged.addListener(
    (opts) => model.attempt(async () => {
      function getTitle(stash) {
        switch (stash) {
          case "all":
            return "Stash all (or selected) tabs";
          case "single":
            return "Stash this tab";
          case "none":
            return "Show stashed tabs";
          default:
            return "Set up Tab Stash";
        }
      }
      if (browser.browserAction) {
        await browser.browserAction.setTitle({
          title: getTitle(opts.state.browser_action_stash)
        });
      }
    })
  );
  logErrorsFrom(async () => {
    let managed_urls = await model.bookmarks.urlsInStash();
    const close_removed_bookmarks = backingOff(
      () => model.attempt(async () => {
        const new_urls = await model.bookmarks.urlsInStash();
        let removed_urls = /* @__PURE__ */ new Set();
        for (let url of managed_urls) {
          if (!new_urls.has(url)) removed_urls.add(url);
        }
        await model.tabs.remove(
          model.tabs.allTabs().filter((t) => t.hidden && removed_urls.has(urlToOpen(t.url)))
        );
        managed_urls = new_urls;
      })
    );
    browser.bookmarks.onChanged.addListener(close_removed_bookmarks);
    browser.bookmarks.onMoved.addListener(close_removed_bookmarks);
    browser.bookmarks.onRemoved.addListener(close_removed_bookmarks);
  });
  const discard_old_hidden_tabs = nonReentrant(async function() {
    setTimeout(
      discard_old_hidden_tabs,
      model.options.local.state.autodiscard_interval_min * 60 * 1e3
    );
    if (!model.options.local.state.autodiscard_hidden_tabs) return;
    let now = Date.now();
    let tabs = await browser.tabs.query({ discarded: false });
    let tab_count = tabs.length;
    let candidate_tabs = tabs.filter((t) => t.hidden && t.id !== void 0).filter((t) => {
      var _a2;
      return !t.audible || ((_a2 = t.mutedInfo) == null ? void 0 : _a2.muted);
    }).sort((a, b) => (a.lastAccessed ?? 0) - (b.lastAccessed ?? 0));
    const min_keep_tabs = model.options.local.state.autodiscard_min_keep_tabs;
    const target_tab_count = model.options.local.state.autodiscard_target_tab_count;
    const target_age_ms = model.options.local.state.autodiscard_target_age_min * 60 * 1e3;
    while (tab_count > min_keep_tabs) {
      let age_cutoff = (target_tab_count - min_keep_tabs) * target_age_ms / (tab_count - min_keep_tabs);
      let oldest_tab = candidate_tabs.pop();
      if (!oldest_tab) break;
      const age = now - (oldest_tab.lastAccessed ?? 0);
      if (age > age_cutoff) {
        --tab_count;
        await browser.tabs.discard([oldest_tab.id]);
      } else {
        break;
      }
    }
  });
  setTimeout(
    discard_old_hidden_tabs,
    model.options.local.state.autodiscard_interval_min * 60 * 1e3
  );
  const gc = nonReentrant(
    () => model.attempt(async () => {
      setTimeout(gc, 24 * 60 * 60 * 1e3);
      await model.gc();
    })
  );
  gc();
});
