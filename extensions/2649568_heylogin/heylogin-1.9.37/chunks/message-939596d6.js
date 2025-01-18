var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", {
    value: true
  });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var browserPolyfill = { exports: {} };
(function(module2, exports) {
  (function(global2, factory) {
    {
      factory(module2);
    }
  })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module3) {
    if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
      throw new Error("This script should only be loaded in a browser extension.");
    }
    if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
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
        let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
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
                } else if (hasOwnProperty(metadata, prop)) {
                  let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                  value = wrapMethod(target, target[prop], wrapper);
                } else {
                  value = value.bind(target);
                }
              } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                value = wrapObject(value, wrappers[prop], metadata[prop]);
              } else if (hasOwnProperty(metadata, "*")) {
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
            const wrappedReq = wrapObject(req, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
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
      module3.exports = wrapAPIs(chrome);
    } else {
      module3.exports = globalThis.browser;
    }
  });
})(browserPolyfill);
var browserPolyfillExports = browserPolyfill.exports;
const browser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}
const FLOAT32_MAX = 34028234663852886e22, FLOAT32_MIN = -34028234663852886e22, UINT32_MAX = 4294967295, INT32_MAX = 2147483647, INT32_MIN = -2147483648;
function assertInt32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid int 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
    throw new Error("invalid int 32: " + arg);
}
function assertUInt32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid uint 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
    throw new Error("invalid uint 32: " + arg);
}
function assertFloat32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid float 32: " + typeof arg);
  if (!Number.isFinite(arg))
    return;
  if (arg > FLOAT32_MAX || arg < FLOAT32_MIN)
    throw new Error("invalid float 32: " + arg);
}
const enumTypeSymbol = Symbol("@bufbuild/protobuf/enum-type");
function getEnumType(enumObject) {
  const t = enumObject[enumTypeSymbol];
  assert(t, "missing enum type on enum object");
  return t;
}
function setEnumType(enumObject, typeName, values, opt) {
  enumObject[enumTypeSymbol] = makeEnumType(typeName, values.map((v) => ({
    no: v.no,
    name: v.name,
    localName: enumObject[v.no]
  })));
}
function makeEnumType(typeName, values, _opt) {
  const names = /* @__PURE__ */ Object.create(null);
  const numbers = /* @__PURE__ */ Object.create(null);
  const normalValues = [];
  for (const value of values) {
    const n = normalizeEnumValue(value);
    normalValues.push(n);
    names[value.name] = n;
    numbers[value.no] = n;
  }
  return {
    typeName,
    values: normalValues,
    // We do not surface options at this time
    // options: opt?.options ?? Object.create(null),
    findName(name) {
      return names[name];
    },
    findNumber(no) {
      return numbers[no];
    }
  };
}
function makeEnum(typeName, values, opt) {
  const enumObject = {};
  for (const value of values) {
    const n = normalizeEnumValue(value);
    enumObject[n.localName] = n.no;
    enumObject[n.no] = n.localName;
  }
  setEnumType(enumObject, typeName, values);
  return enumObject;
}
function normalizeEnumValue(value) {
  if ("localName" in value) {
    return value;
  }
  return Object.assign(Object.assign({}, value), { localName: value.name });
}
class Message {
  /**
   * Compare with a message of the same type.
   * Note that this function disregards extensions and unknown fields.
   */
  equals(other) {
    return this.getType().runtime.util.equals(this.getType(), this, other);
  }
  /**
   * Create a deep copy.
   */
  clone() {
    return this.getType().runtime.util.clone(this);
  }
  /**
   * Parse from binary data, merging fields.
   *
   * Repeated fields are appended. Map entries are added, overwriting
   * existing keys.
   *
   * If a message field is already present, it will be merged with the
   * new data.
   */
  fromBinary(bytes, options) {
    const type = this.getType(), format = type.runtime.bin, opt = format.makeReadOptions(options);
    format.readMessage(this, opt.readerFactory(bytes), bytes.byteLength, opt);
    return this;
  }
  /**
   * Parse a message from a JSON value.
   */
  fromJson(jsonValue, options) {
    const type = this.getType(), format = type.runtime.json, opt = format.makeReadOptions(options);
    format.readMessage(type, jsonValue, opt, this);
    return this;
  }
  /**
   * Parse a message from a JSON string.
   */
  fromJsonString(jsonString, options) {
    let json;
    try {
      json = JSON.parse(jsonString);
    } catch (e) {
      throw new Error(`cannot decode ${this.getType().typeName} from JSON: ${e instanceof Error ? e.message : String(e)}`);
    }
    return this.fromJson(json, options);
  }
  /**
   * Serialize the message to binary data.
   */
  toBinary(options) {
    const type = this.getType(), bin = type.runtime.bin, opt = bin.makeWriteOptions(options), writer = opt.writerFactory();
    bin.writeMessage(this, writer, opt);
    return writer.finish();
  }
  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(options) {
    const type = this.getType(), json = type.runtime.json, opt = json.makeWriteOptions(options);
    return json.writeMessage(this, opt);
  }
  /**
   * Serialize the message to a JSON string.
   */
  toJsonString(options) {
    var _a;
    const value = this.toJson(options);
    return JSON.stringify(value, null, (_a = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a !== void 0 ? _a : 0);
  }
  /**
   * Override for serialization behavior. This will be invoked when calling
   * JSON.stringify on this message (i.e. JSON.stringify(msg)).
   *
   * Note that this will not serialize google.protobuf.Any with a packed
   * message because the protobuf JSON format specifies that it needs to be
   * unpacked, and this is only possible with a type registry to look up the
   * message type.  As a result, attempting to serialize a message with this
   * type will throw an Error.
   *
   * This method is protected because you should not need to invoke it
   * directly -- instead use JSON.stringify or toJsonString for
   * stringified JSON.  Alternatively, if actual JSON is desired, you should
   * use toJson.
   */
  toJSON() {
    return this.toJson({
      emitDefaultValues: true
    });
  }
  /**
   * Retrieve the MessageType of this message - a singleton that represents
   * the protobuf message declaration and provides metadata for reflection-
   * based operations.
   */
  getType() {
    return Object.getPrototypeOf(this).constructor;
  }
}
function makeMessageType(runtime, typeName, fields, opt) {
  var _a;
  const localName = (_a = opt === null || opt === void 0 ? void 0 : opt.localName) !== null && _a !== void 0 ? _a : typeName.substring(typeName.lastIndexOf(".") + 1);
  const type = {
    [localName]: function(data) {
      runtime.util.initFields(this);
      runtime.util.initPartial(data, this);
    }
  }[localName];
  Object.setPrototypeOf(type.prototype, new Message());
  Object.assign(type, {
    runtime,
    typeName,
    fields: runtime.util.newFieldList(fields),
    fromBinary(bytes, options) {
      return new type().fromBinary(bytes, options);
    },
    fromJson(jsonValue, options) {
      return new type().fromJson(jsonValue, options);
    },
    fromJsonString(jsonString, options) {
      return new type().fromJsonString(jsonString, options);
    },
    equals(a, b) {
      return runtime.util.equals(type, a, b);
    }
  });
  return type;
}
function varint64read() {
  let lowBits = 0;
  let highBits = 0;
  for (let shift = 0; shift < 28; shift += 7) {
    let b = this.buf[this.pos++];
    lowBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  let middleByte = this.buf[this.pos++];
  lowBits |= (middleByte & 15) << 28;
  highBits = (middleByte & 112) >> 4;
  if ((middleByte & 128) == 0) {
    this.assertBounds();
    return [lowBits, highBits];
  }
  for (let shift = 3; shift <= 31; shift += 7) {
    let b = this.buf[this.pos++];
    highBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  throw new Error("invalid varint");
}
function varint64write(lo, hi, bytes) {
  for (let i = 0; i < 28; i = i + 7) {
    const shift = lo >>> i;
    const hasNext = !(shift >>> 7 == 0 && hi == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
  const hasMoreBits = !(hi >> 3 == 0);
  bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
  if (!hasMoreBits) {
    return;
  }
  for (let i = 3; i < 31; i = i + 7) {
    const shift = hi >>> i;
    const hasNext = !(shift >>> 7 == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  bytes.push(hi >>> 31 & 1);
}
const TWO_PWR_32_DBL = 4294967296;
function int64FromString(dec) {
  const minus = dec[0] === "-";
  if (minus) {
    dec = dec.slice(1);
  }
  const base = 1e6;
  let lowBits = 0;
  let highBits = 0;
  function add1e6digit(begin, end) {
    const digit1e6 = Number(dec.slice(begin, end));
    highBits *= base;
    lowBits = lowBits * base + digit1e6;
    if (lowBits >= TWO_PWR_32_DBL) {
      highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
      lowBits = lowBits % TWO_PWR_32_DBL;
    }
  }
  add1e6digit(-24, -18);
  add1e6digit(-18, -12);
  add1e6digit(-12, -6);
  add1e6digit(-6);
  return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
function int64ToString(lo, hi) {
  let bits = newBits(lo, hi);
  const negative = bits.hi & 2147483648;
  if (negative) {
    bits = negate(bits.lo, bits.hi);
  }
  const result = uInt64ToString(bits.lo, bits.hi);
  return negative ? "-" + result : result;
}
function uInt64ToString(lo, hi) {
  ({ lo, hi } = toUnsigned(lo, hi));
  if (hi <= 2097151) {
    return String(TWO_PWR_32_DBL * hi + lo);
  }
  const low = lo & 16777215;
  const mid = (lo >>> 24 | hi << 8) & 16777215;
  const high = hi >> 16 & 65535;
  let digitA = low + mid * 6777216 + high * 6710656;
  let digitB = mid + high * 8147497;
  let digitC = high * 2;
  const base = 1e7;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }
  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }
  return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
  return { lo: lo >>> 0, hi: hi >>> 0 };
}
function newBits(lo, hi) {
  return { lo: lo | 0, hi: hi | 0 };
}
function negate(lowBits, highBits) {
  highBits = ~highBits;
  if (lowBits) {
    lowBits = ~lowBits + 1;
  } else {
    highBits += 1;
  }
  return newBits(lowBits, highBits);
}
const decimalFrom1e7WithLeadingZeros = (digit1e7) => {
  const partial = String(digit1e7);
  return "0000000".slice(partial.length) + partial;
};
function varint32write(value, bytes) {
  if (value >= 0) {
    while (value > 127) {
      bytes.push(value & 127 | 128);
      value = value >>> 7;
    }
    bytes.push(value);
  } else {
    for (let i = 0; i < 9; i++) {
      bytes.push(value & 127 | 128);
      value = value >> 7;
    }
    bytes.push(1);
  }
}
function varint32read() {
  let b = this.buf[this.pos++];
  let result = b & 127;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 7;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 14;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 21;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 15) << 28;
  for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++)
    b = this.buf[this.pos++];
  if ((b & 128) != 0)
    throw new Error("invalid varint");
  this.assertBounds();
  return result >>> 0;
}
function makeInt64Support() {
  const dv = new DataView(new ArrayBuffer(8));
  const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (typeof process != "object" || typeof process.env != "object" || {}.BUF_BIGINT_DISABLE !== "1");
  if (ok) {
    const MIN = BigInt("-9223372036854775808"), MAX = BigInt("9223372036854775807"), UMIN = BigInt("0"), UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > MAX || bi < MIN) {
          throw new Error(`int64 invalid: ${value}`);
        }
        return bi;
      },
      uParse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > UMAX || bi < UMIN) {
          throw new Error(`uint64 invalid: ${value}`);
        }
        return bi;
      },
      enc(value) {
        dv.setBigInt64(0, this.parse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      uEnc(value) {
        dv.setBigInt64(0, this.uParse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      dec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigInt64(0, true);
      },
      uDec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigUint64(0, true);
      }
    };
  }
  const assertInt64String = (value) => assert(/^-?[0-9]+$/.test(value), `int64 invalid: ${value}`);
  const assertUInt64String = (value) => assert(/^[0-9]+$/.test(value), `uint64 invalid: ${value}`);
  return {
    zero: "0",
    supported: false,
    parse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return value;
    },
    uParse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return value;
    },
    enc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return int64FromString(value);
    },
    uEnc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return int64FromString(value);
    },
    dec(lo, hi) {
      return int64ToString(lo, hi);
    },
    uDec(lo, hi) {
      return uInt64ToString(lo, hi);
    }
  };
}
const protoInt64 = makeInt64Support();
var ScalarType;
(function(ScalarType2) {
  ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
  ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
  ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
  ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
  ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
  ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
  ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
  ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
  ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
  ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
  ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
  ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
  ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
  ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
  ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));
var LongType;
(function(LongType2) {
  LongType2[LongType2["BIGINT"] = 0] = "BIGINT";
  LongType2[LongType2["STRING"] = 1] = "STRING";
})(LongType || (LongType = {}));
function scalarEquals(type, a, b) {
  if (a === b) {
    return true;
  }
  if (type == ScalarType.BYTES) {
    if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  switch (type) {
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return a == b;
  }
  return false;
}
function scalarZeroValue(type, longType) {
  switch (type) {
    case ScalarType.BOOL:
      return false;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return longType == 0 ? protoInt64.zero : "0";
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0;
    case ScalarType.BYTES:
      return new Uint8Array(0);
    case ScalarType.STRING:
      return "";
    default:
      return 0;
  }
}
function isScalarZeroValue(type, value) {
  switch (type) {
    case ScalarType.BOOL:
      return value === false;
    case ScalarType.STRING:
      return value === "";
    case ScalarType.BYTES:
      return value instanceof Uint8Array && !value.byteLength;
    default:
      return value == 0;
  }
}
var WireType;
(function(WireType2) {
  WireType2[WireType2["Varint"] = 0] = "Varint";
  WireType2[WireType2["Bit64"] = 1] = "Bit64";
  WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
  WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
  WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
  WireType2[WireType2["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
class BinaryWriter {
  constructor(textEncoder) {
    this.stack = [];
    this.textEncoder = textEncoder !== null && textEncoder !== void 0 ? textEncoder : new TextEncoder();
    this.chunks = [];
    this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.chunks.push(new Uint8Array(this.buf));
    let len = 0;
    for (let i = 0; i < this.chunks.length; i++)
      len += this.chunks[i].length;
    let bytes = new Uint8Array(len);
    let offset = 0;
    for (let i = 0; i < this.chunks.length; i++) {
      bytes.set(this.chunks[i], offset);
      offset += this.chunks[i].length;
    }
    this.chunks = [];
    return bytes;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    this.stack.push({ chunks: this.chunks, buf: this.buf });
    this.chunks = [];
    this.buf = [];
    return this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let chunk = this.finish();
    let prev = this.stack.pop();
    if (!prev)
      throw new Error("invalid state, fork stack empty");
    this.chunks = prev.chunks;
    this.buf = prev.buf;
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo, type) {
    return this.uint32((fieldNo << 3 | type) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk) {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    this.chunks.push(chunk);
    return this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value) {
    assertUInt32(value);
    while (value > 127) {
      this.buf.push(value & 127 | 128);
      value = value >>> 7;
    }
    this.buf.push(value);
    return this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value) {
    assertInt32(value);
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(value) {
    this.buf.push(value ? 1 : 0);
    return this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value) {
    this.uint32(value.byteLength);
    return this.raw(value);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value) {
    let chunk = this.textEncoder.encode(value);
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value) {
    assertFloat32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setFloat32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value) {
    let chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setFloat64(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value) {
    assertUInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setUint32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value) {
    assertInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setInt32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value) {
    assertInt32(value);
    value = (value << 1 ^ value >> 31) >>> 0;
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.enc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.uEnc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value) {
    let tc = protoInt64.enc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value) {
    let tc = protoInt64.enc(value), sign = tc.hi >> 31, lo = tc.lo << 1 ^ sign, hi = (tc.hi << 1 | tc.lo >>> 31) ^ sign;
    varint64write(lo, hi, this.buf);
    return this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value) {
    let tc = protoInt64.uEnc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
}
class BinaryReader {
  constructor(buf, textDecoder) {
    this.varint64 = varint64read;
    this.uint32 = varint32read;
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    this.textDecoder = textDecoder !== null && textDecoder !== void 0 ? textDecoder : new TextDecoder();
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5)
      throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
    return [fieldNo, wireType];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(wireType, fieldNo) {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 128) {
        }
        break;
      case WireType.Bit64:
        this.pos += 4;
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        for (; ; ) {
          const [fn, wt] = this.tag();
          if (wt === WireType.EndGroup) {
            if (fieldNo !== void 0 && fn !== fieldNo) {
              throw new Error("invalid end group tag");
            }
            break;
          }
          this.skip(wt, fn);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let zze = this.uint32();
    return zze >>> 1 ^ -(zze & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return protoInt64.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return protoInt64.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [lo, hi] = this.varint64();
    let s = -(lo & 1);
    lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
    hi = hi >>> 1 ^ s;
    return protoInt64.dec(lo, hi);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [lo, hi] = this.varint64();
    return lo !== 0 || hi !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let len = this.uint32(), start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.textDecoder.decode(this.bytes());
  }
}
function makeExtension(runtime, typeName, extendee, field) {
  let fi;
  return {
    typeName,
    extendee,
    get field() {
      if (!fi) {
        const i = typeof field == "function" ? field() : field;
        i.name = typeName.split(".").pop();
        i.jsonName = `[${typeName}]`;
        fi = runtime.util.newFieldList([i]).list()[0];
      }
      return fi;
    },
    runtime
  };
}
function createExtensionContainer(extension) {
  const localName = extension.field.localName;
  const container = /* @__PURE__ */ Object.create(null);
  container[localName] = initExtensionField(extension);
  return [container, () => container[localName]];
}
function initExtensionField(ext) {
  const field = ext.field;
  if (field.repeated) {
    return [];
  }
  if (field.default !== void 0) {
    return field.default;
  }
  switch (field.kind) {
    case "enum":
      return field.T.values[0].no;
    case "scalar":
      return scalarZeroValue(field.T, field.L);
    case "message":
      const T = field.T, value = new T();
      return T.fieldWrapper ? T.fieldWrapper.unwrapField(value) : value;
    case "map":
      throw "map fields are not allowed to be extensions";
  }
}
function filterUnknownFields(unknownFields, field) {
  if (!field.repeated && (field.kind == "enum" || field.kind == "scalar")) {
    for (let i = unknownFields.length - 1; i >= 0; --i) {
      if (unknownFields[i].no == field.no) {
        return [unknownFields[i]];
      }
    }
    return [];
  }
  return unknownFields.filter((uf) => uf.no === field.no);
}
let encTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
let decTable = [];
for (let i = 0; i < encTable.length; i++)
  decTable[encTable[i].charCodeAt(0)] = i;
decTable["-".charCodeAt(0)] = encTable.indexOf("+");
decTable["_".charCodeAt(0)] = encTable.indexOf("/");
const protoBase64 = {
  /**
   * Decodes a base64 string to a byte array.
   *
   * - ignores white-space, including line breaks and tabs
   * - allows inner padding (can decode concatenated base64 strings)
   * - does not require padding
   * - understands base64url encoding:
   *   "-" instead of "+",
   *   "_" instead of "/",
   *   no padding
   */
  dec(base64Str) {
    let es = base64Str.length * 3 / 4;
    if (base64Str[base64Str.length - 2] == "=")
      es -= 2;
    else if (base64Str[base64Str.length - 1] == "=")
      es -= 1;
    let bytes = new Uint8Array(es), bytePos = 0, groupPos = 0, b, p = 0;
    for (let i = 0; i < base64Str.length; i++) {
      b = decTable[base64Str.charCodeAt(i)];
      if (b === void 0) {
        switch (base64Str[i]) {
          case "=":
            groupPos = 0;
          case "\n":
          case "\r":
          case "	":
          case " ":
            continue;
          default:
            throw Error("invalid base64 string.");
        }
      }
      switch (groupPos) {
        case 0:
          p = b;
          groupPos = 1;
          break;
        case 1:
          bytes[bytePos++] = p << 2 | (b & 48) >> 4;
          p = b;
          groupPos = 2;
          break;
        case 2:
          bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
          p = b;
          groupPos = 3;
          break;
        case 3:
          bytes[bytePos++] = (p & 3) << 6 | b;
          groupPos = 0;
          break;
      }
    }
    if (groupPos == 1)
      throw Error("invalid base64 string.");
    return bytes.subarray(0, bytePos);
  },
  /**
   * Encode a byte array to a base64 string.
   */
  enc(bytes) {
    let base64 = "", groupPos = 0, b, p = 0;
    for (let i = 0; i < bytes.length; i++) {
      b = bytes[i];
      switch (groupPos) {
        case 0:
          base64 += encTable[b >> 2];
          p = (b & 3) << 4;
          groupPos = 1;
          break;
        case 1:
          base64 += encTable[p | b >> 4];
          p = (b & 15) << 2;
          groupPos = 2;
          break;
        case 2:
          base64 += encTable[p | b >> 6];
          base64 += encTable[b & 63];
          groupPos = 0;
          break;
      }
    }
    if (groupPos) {
      base64 += encTable[p];
      base64 += "=";
      if (groupPos == 1)
        base64 += "=";
    }
    return base64;
  }
};
function getExtension(message, extension, options) {
  assertExtendee(extension, message);
  const opt = extension.runtime.bin.makeReadOptions(options);
  const ufs = filterUnknownFields(message.getType().runtime.bin.listUnknownFields(message), extension.field);
  const [container, get] = createExtensionContainer(extension);
  for (const uf of ufs) {
    extension.runtime.bin.readField(container, opt.readerFactory(uf.data), extension.field, uf.wireType, opt);
  }
  return get();
}
function setExtension(message, extension, value, options) {
  assertExtendee(extension, message);
  const readOpt = extension.runtime.bin.makeReadOptions(options);
  const writeOpt = extension.runtime.bin.makeWriteOptions(options);
  if (hasExtension(message, extension)) {
    const ufs = message.getType().runtime.bin.listUnknownFields(message).filter((uf) => uf.no != extension.field.no);
    message.getType().runtime.bin.discardUnknownFields(message);
    for (const uf of ufs) {
      message.getType().runtime.bin.onUnknownField(message, uf.no, uf.wireType, uf.data);
    }
  }
  const writer = writeOpt.writerFactory();
  let f = extension.field;
  if (!f.opt && !f.repeated && (f.kind == "enum" || f.kind == "scalar")) {
    f = Object.assign(Object.assign({}, extension.field), { opt: true });
  }
  extension.runtime.bin.writeField(f, value, writer, writeOpt);
  const reader = readOpt.readerFactory(writer.finish());
  while (reader.pos < reader.len) {
    const [no, wireType] = reader.tag();
    const data = reader.skip(wireType, no);
    message.getType().runtime.bin.onUnknownField(message, no, wireType, data);
  }
}
function hasExtension(message, extension) {
  const messageType = message.getType();
  return extension.extendee.typeName === messageType.typeName && !!messageType.runtime.bin.listUnknownFields(message).find((uf) => uf.no == extension.field.no);
}
function assertExtendee(extension, message) {
  assert(extension.extendee.typeName == message.getType().typeName, `extension ${extension.typeName} can only be applied to message ${extension.extendee.typeName}`);
}
function isFieldSet(field, target) {
  const localName = field.localName;
  if (field.repeated) {
    return target[localName].length > 0;
  }
  if (field.oneof) {
    return target[field.oneof.localName].case === localName;
  }
  switch (field.kind) {
    case "enum":
    case "scalar":
      if (field.opt || field.req) {
        return target[localName] !== void 0;
      }
      if (field.kind == "enum") {
        return target[localName] !== field.T.values[0].no;
      }
      return !isScalarZeroValue(field.T, target[localName]);
    case "message":
      return target[localName] !== void 0;
    case "map":
      return Object.keys(target[localName]).length > 0;
  }
}
function clearField(field, target) {
  const localName = field.localName;
  const implicitPresence = !field.opt && !field.req;
  if (field.repeated) {
    target[localName] = [];
  } else if (field.oneof) {
    target[field.oneof.localName] = { case: void 0 };
  } else {
    switch (field.kind) {
      case "map":
        target[localName] = {};
        break;
      case "enum":
        target[localName] = implicitPresence ? field.T.values[0].no : void 0;
        break;
      case "scalar":
        target[localName] = implicitPresence ? scalarZeroValue(field.T, field.L) : void 0;
        break;
      case "message":
        target[localName] = void 0;
        break;
    }
  }
}
function isMessage(arg, type) {
  if (arg === null || typeof arg != "object") {
    return false;
  }
  if (!Object.getOwnPropertyNames(Message.prototype).every((m) => m in arg && typeof arg[m] == "function")) {
    return false;
  }
  const actualType = arg.getType();
  if (actualType === null || typeof actualType != "function" || !("typeName" in actualType) || typeof actualType.typeName != "string") {
    return false;
  }
  return type === void 0 ? true : actualType.typeName == type.typeName;
}
function wrapField(type, value) {
  if (isMessage(value) || !type.fieldWrapper) {
    return value;
  }
  return type.fieldWrapper.wrapField(value);
}
({
  "google.protobuf.DoubleValue": ScalarType.DOUBLE,
  "google.protobuf.FloatValue": ScalarType.FLOAT,
  "google.protobuf.Int64Value": ScalarType.INT64,
  "google.protobuf.UInt64Value": ScalarType.UINT64,
  "google.protobuf.Int32Value": ScalarType.INT32,
  "google.protobuf.UInt32Value": ScalarType.UINT32,
  "google.protobuf.BoolValue": ScalarType.BOOL,
  "google.protobuf.StringValue": ScalarType.STRING,
  "google.protobuf.BytesValue": ScalarType.BYTES
});
const jsonReadDefaults = {
  ignoreUnknownFields: false
};
const jsonWriteDefaults = {
  emitDefaultValues: false,
  enumAsInteger: false,
  useProtoFieldName: false,
  prettySpaces: 0
};
function makeReadOptions$1(options) {
  return options ? Object.assign(Object.assign({}, jsonReadDefaults), options) : jsonReadDefaults;
}
function makeWriteOptions$1(options) {
  return options ? Object.assign(Object.assign({}, jsonWriteDefaults), options) : jsonWriteDefaults;
}
const tokenNull = Symbol();
const tokenIgnoredUnknownEnum = Symbol();
function makeJsonFormat() {
  return {
    makeReadOptions: makeReadOptions$1,
    makeWriteOptions: makeWriteOptions$1,
    readMessage(type, json, options, message) {
      if (json == null || Array.isArray(json) || typeof json != "object") {
        throw new Error(`cannot decode message ${type.typeName} from JSON: ${debugJsonValue(json)}`);
      }
      message = message !== null && message !== void 0 ? message : new type();
      const oneofSeen = /* @__PURE__ */ new Map();
      const registry = options.typeRegistry;
      for (const [jsonKey, jsonValue] of Object.entries(json)) {
        const field = type.fields.findJsonName(jsonKey);
        if (field) {
          if (field.oneof) {
            if (jsonValue === null && field.kind == "scalar") {
              continue;
            }
            const seen = oneofSeen.get(field.oneof);
            if (seen !== void 0) {
              throw new Error(`cannot decode message ${type.typeName} from JSON: multiple keys for oneof "${field.oneof.name}" present: "${seen}", "${jsonKey}"`);
            }
            oneofSeen.set(field.oneof, jsonKey);
          }
          readField$1(message, jsonValue, field, options, type);
        } else {
          let found = false;
          if ((registry === null || registry === void 0 ? void 0 : registry.findExtension) && jsonKey.startsWith("[") && jsonKey.endsWith("]")) {
            const ext = registry.findExtension(jsonKey.substring(1, jsonKey.length - 1));
            if (ext && ext.extendee.typeName == type.typeName) {
              found = true;
              const [container, get] = createExtensionContainer(ext);
              readField$1(container, jsonValue, ext.field, options, ext);
              setExtension(message, ext, get(), options);
            }
          }
          if (!found && !options.ignoreUnknownFields) {
            throw new Error(`cannot decode message ${type.typeName} from JSON: key "${jsonKey}" is unknown`);
          }
        }
      }
      return message;
    },
    writeMessage(message, options) {
      const type = message.getType();
      const json = {};
      let field;
      try {
        for (field of type.fields.byNumber()) {
          if (!isFieldSet(field, message)) {
            if (field.req) {
              throw `required field not set`;
            }
            if (!options.emitDefaultValues) {
              continue;
            }
            if (!canEmitFieldDefaultValue(field)) {
              continue;
            }
          }
          const value = field.oneof ? message[field.oneof.localName].value : message[field.localName];
          const jsonValue = writeField$1(field, value, options);
          if (jsonValue !== void 0) {
            json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
          }
        }
        const registry = options.typeRegistry;
        if (registry === null || registry === void 0 ? void 0 : registry.findExtensionFor) {
          for (const uf of type.runtime.bin.listUnknownFields(message)) {
            const ext = registry.findExtensionFor(type.typeName, uf.no);
            if (ext && hasExtension(message, ext)) {
              const value = getExtension(message, ext, options);
              const jsonValue = writeField$1(ext.field, value, options);
              if (jsonValue !== void 0) {
                json[ext.field.jsonName] = jsonValue;
              }
            }
          }
        }
      } catch (e) {
        const m = field ? `cannot encode field ${type.typeName}.${field.name} to JSON` : `cannot encode message ${type.typeName} to JSON`;
        const r = e instanceof Error ? e.message : String(e);
        throw new Error(m + (r.length > 0 ? `: ${r}` : ""));
      }
      return json;
    },
    readScalar(type, json, longType) {
      return readScalar$1(type, json, longType !== null && longType !== void 0 ? longType : LongType.BIGINT, true);
    },
    writeScalar(type, value, emitDefaultValues) {
      if (value === void 0) {
        return void 0;
      }
      if (emitDefaultValues || isScalarZeroValue(type, value)) {
        return writeScalar$1(type, value);
      }
      return void 0;
    },
    debug: debugJsonValue
  };
}
function debugJsonValue(json) {
  if (json === null) {
    return "null";
  }
  switch (typeof json) {
    case "object":
      return Array.isArray(json) ? "array" : "object";
    case "string":
      return json.length > 100 ? "string" : `"${json.split('"').join('\\"')}"`;
    default:
      return String(json);
  }
}
function readField$1(target, jsonValue, field, options, parentType) {
  let localName = field.localName;
  if (field.repeated) {
    assert(field.kind != "map");
    if (jsonValue === null) {
      return;
    }
    if (!Array.isArray(jsonValue)) {
      throw new Error(`cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`);
    }
    const targetArray = target[localName];
    for (const jsonItem of jsonValue) {
      if (jsonItem === null) {
        throw new Error(`cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonItem)}`);
      }
      switch (field.kind) {
        case "message":
          targetArray.push(field.T.fromJson(jsonItem, options));
          break;
        case "enum":
          const enumValue = readEnum(field.T, jsonItem, options.ignoreUnknownFields, true);
          if (enumValue !== tokenIgnoredUnknownEnum) {
            targetArray.push(enumValue);
          }
          break;
        case "scalar":
          try {
            targetArray.push(readScalar$1(field.T, jsonItem, field.L, true));
          } catch (e) {
            let m = `cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonItem)}`;
            if (e instanceof Error && e.message.length > 0) {
              m += `: ${e.message}`;
            }
            throw new Error(m);
          }
          break;
      }
    }
  } else if (field.kind == "map") {
    if (jsonValue === null) {
      return;
    }
    if (typeof jsonValue != "object" || Array.isArray(jsonValue)) {
      throw new Error(`cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`);
    }
    const targetMap = target[localName];
    for (const [jsonMapKey, jsonMapValue] of Object.entries(jsonValue)) {
      if (jsonMapValue === null) {
        throw new Error(`cannot decode field ${parentType.typeName}.${field.name} from JSON: map value null`);
      }
      let key;
      try {
        key = readMapKey(field.K, jsonMapKey);
      } catch (e) {
        let m = `cannot decode map key for field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`;
        if (e instanceof Error && e.message.length > 0) {
          m += `: ${e.message}`;
        }
        throw new Error(m);
      }
      switch (field.V.kind) {
        case "message":
          targetMap[key] = field.V.T.fromJson(jsonMapValue, options);
          break;
        case "enum":
          const enumValue = readEnum(field.V.T, jsonMapValue, options.ignoreUnknownFields, true);
          if (enumValue !== tokenIgnoredUnknownEnum) {
            targetMap[key] = enumValue;
          }
          break;
        case "scalar":
          try {
            targetMap[key] = readScalar$1(field.V.T, jsonMapValue, LongType.BIGINT, true);
          } catch (e) {
            let m = `cannot decode map value for field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`;
            if (e instanceof Error && e.message.length > 0) {
              m += `: ${e.message}`;
            }
            throw new Error(m);
          }
          break;
      }
    }
  } else {
    if (field.oneof) {
      target = target[field.oneof.localName] = { case: localName };
      localName = "value";
    }
    switch (field.kind) {
      case "message":
        const messageType = field.T;
        if (jsonValue === null && messageType.typeName != "google.protobuf.Value") {
          return;
        }
        let currentValue = target[localName];
        if (isMessage(currentValue)) {
          currentValue.fromJson(jsonValue, options);
        } else {
          target[localName] = currentValue = messageType.fromJson(jsonValue, options);
          if (messageType.fieldWrapper && !field.oneof) {
            target[localName] = messageType.fieldWrapper.unwrapField(currentValue);
          }
        }
        break;
      case "enum":
        const enumValue = readEnum(field.T, jsonValue, options.ignoreUnknownFields, false);
        switch (enumValue) {
          case tokenNull:
            clearField(field, target);
            break;
          case tokenIgnoredUnknownEnum:
            break;
          default:
            target[localName] = enumValue;
            break;
        }
        break;
      case "scalar":
        try {
          const scalarValue = readScalar$1(field.T, jsonValue, field.L, false);
          switch (scalarValue) {
            case tokenNull:
              clearField(field, target);
              break;
            default:
              target[localName] = scalarValue;
              break;
          }
        } catch (e) {
          let m = `cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`;
          if (e instanceof Error && e.message.length > 0) {
            m += `: ${e.message}`;
          }
          throw new Error(m);
        }
        break;
    }
  }
}
function readMapKey(type, json) {
  if (type === ScalarType.BOOL) {
    switch (json) {
      case "true":
        json = true;
        break;
      case "false":
        json = false;
        break;
    }
  }
  return readScalar$1(type, json, LongType.BIGINT, true).toString();
}
function readScalar$1(type, json, longType, nullAsZeroValue) {
  if (json === null) {
    if (nullAsZeroValue) {
      return scalarZeroValue(type, longType);
    }
    return tokenNull;
  }
  switch (type) {
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === "NaN")
        return Number.NaN;
      if (json === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (json === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (json === "") {
        break;
      }
      if (typeof json == "string" && json.trim().length !== json.length) {
        break;
      }
      if (typeof json != "string" && typeof json != "number") {
        break;
      }
      const float = Number(json);
      if (Number.isNaN(float)) {
        break;
      }
      if (!Number.isFinite(float)) {
        break;
      }
      if (type == ScalarType.FLOAT)
        assertFloat32(float);
      return float;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      let int32;
      if (typeof json == "number")
        int32 = json;
      else if (typeof json == "string" && json.length > 0) {
        if (json.trim().length === json.length)
          int32 = Number(json);
      }
      if (int32 === void 0)
        break;
      if (type == ScalarType.UINT32 || type == ScalarType.FIXED32)
        assertUInt32(int32);
      else
        assertInt32(int32);
      return int32;
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (typeof json != "number" && typeof json != "string")
        break;
      const long = protoInt64.parse(json);
      return longType ? long.toString() : long;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (typeof json != "number" && typeof json != "string")
        break;
      const uLong = protoInt64.uParse(json);
      return longType ? uLong.toString() : uLong;
    case ScalarType.BOOL:
      if (typeof json !== "boolean")
        break;
      return json;
    case ScalarType.STRING:
      if (typeof json !== "string") {
        break;
      }
      try {
        encodeURIComponent(json);
      } catch (e) {
        throw new Error("invalid UTF8");
      }
      return json;
    case ScalarType.BYTES:
      if (json === "")
        return new Uint8Array(0);
      if (typeof json !== "string")
        break;
      return protoBase64.dec(json);
  }
  throw new Error();
}
function readEnum(type, json, ignoreUnknownFields, nullAsZeroValue) {
  if (json === null) {
    if (type.typeName == "google.protobuf.NullValue") {
      return 0;
    }
    return nullAsZeroValue ? type.values[0].no : tokenNull;
  }
  switch (typeof json) {
    case "number":
      if (Number.isInteger(json)) {
        return json;
      }
      break;
    case "string":
      const value = type.findName(json);
      if (value !== void 0) {
        return value.no;
      }
      if (ignoreUnknownFields) {
        return tokenIgnoredUnknownEnum;
      }
      break;
  }
  throw new Error(`cannot decode enum ${type.typeName} from JSON: ${debugJsonValue(json)}`);
}
function canEmitFieldDefaultValue(field) {
  if (field.repeated || field.kind == "map") {
    return true;
  }
  if (field.oneof) {
    return false;
  }
  if (field.kind == "message") {
    return false;
  }
  if (field.opt || field.req) {
    return false;
  }
  return true;
}
function writeField$1(field, value, options) {
  if (field.kind == "map") {
    assert(typeof value == "object" && value != null);
    const jsonObj = {};
    const entries = Object.entries(value);
    switch (field.V.kind) {
      case "scalar":
        for (const [entryKey, entryValue] of entries) {
          jsonObj[entryKey.toString()] = writeScalar$1(field.V.T, entryValue);
        }
        break;
      case "message":
        for (const [entryKey, entryValue] of entries) {
          jsonObj[entryKey.toString()] = entryValue.toJson(options);
        }
        break;
      case "enum":
        const enumType = field.V.T;
        for (const [entryKey, entryValue] of entries) {
          jsonObj[entryKey.toString()] = writeEnum(enumType, entryValue, options.enumAsInteger);
        }
        break;
    }
    return options.emitDefaultValues || entries.length > 0 ? jsonObj : void 0;
  }
  if (field.repeated) {
    assert(Array.isArray(value));
    const jsonArr = [];
    switch (field.kind) {
      case "scalar":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(writeScalar$1(field.T, value[i]));
        }
        break;
      case "enum":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(writeEnum(field.T, value[i], options.enumAsInteger));
        }
        break;
      case "message":
        for (let i = 0; i < value.length; i++) {
          jsonArr.push(value[i].toJson(options));
        }
        break;
    }
    return options.emitDefaultValues || jsonArr.length > 0 ? jsonArr : void 0;
  }
  switch (field.kind) {
    case "scalar":
      return writeScalar$1(field.T, value);
    case "enum":
      return writeEnum(field.T, value, options.enumAsInteger);
    case "message":
      return wrapField(field.T, value).toJson(options);
  }
}
function writeEnum(type, value, enumAsInteger) {
  var _a;
  assert(typeof value == "number");
  if (type.typeName == "google.protobuf.NullValue") {
    return null;
  }
  if (enumAsInteger) {
    return value;
  }
  const val = type.findNumber(value);
  return (_a = val === null || val === void 0 ? void 0 : val.name) !== null && _a !== void 0 ? _a : value;
}
function writeScalar$1(type, value) {
  switch (type) {
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      assert(typeof value == "number");
      return value;
    case ScalarType.FLOAT:
    case ScalarType.DOUBLE:
      assert(typeof value == "number");
      if (Number.isNaN(value))
        return "NaN";
      if (value === Number.POSITIVE_INFINITY)
        return "Infinity";
      if (value === Number.NEGATIVE_INFINITY)
        return "-Infinity";
      return value;
    case ScalarType.STRING:
      assert(typeof value == "string");
      return value;
    case ScalarType.BOOL:
      assert(typeof value == "boolean");
      return value;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      assert(typeof value == "bigint" || typeof value == "string" || typeof value == "number");
      return value.toString();
    case ScalarType.BYTES:
      assert(value instanceof Uint8Array);
      return protoBase64.enc(value);
  }
}
const unknownFieldsSymbol = Symbol("@bufbuild/protobuf/unknown-fields");
const readDefaults = {
  readUnknownFields: true,
  readerFactory: (bytes) => new BinaryReader(bytes)
};
const writeDefaults = {
  writeUnknownFields: true,
  writerFactory: () => new BinaryWriter()
};
function makeReadOptions(options) {
  return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
}
function makeWriteOptions(options) {
  return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function makeBinaryFormat() {
  return {
    makeReadOptions,
    makeWriteOptions,
    listUnknownFields(message) {
      var _a;
      return (_a = message[unknownFieldsSymbol]) !== null && _a !== void 0 ? _a : [];
    },
    discardUnknownFields(message) {
      delete message[unknownFieldsSymbol];
    },
    writeUnknownFields(message, writer) {
      const m = message;
      const c = m[unknownFieldsSymbol];
      if (c) {
        for (const f of c) {
          writer.tag(f.no, f.wireType).raw(f.data);
        }
      }
    },
    onUnknownField(message, no, wireType, data) {
      const m = message;
      if (!Array.isArray(m[unknownFieldsSymbol])) {
        m[unknownFieldsSymbol] = [];
      }
      m[unknownFieldsSymbol].push({ no, wireType, data });
    },
    readMessage(message, reader, lengthOrEndTagFieldNo, options, delimitedMessageEncoding) {
      const type = message.getType();
      const end = delimitedMessageEncoding ? reader.len : reader.pos + lengthOrEndTagFieldNo;
      let fieldNo, wireType;
      while (reader.pos < end) {
        [fieldNo, wireType] = reader.tag();
        if (delimitedMessageEncoding === true && wireType == WireType.EndGroup) {
          break;
        }
        const field = type.fields.find(fieldNo);
        if (!field) {
          const data = reader.skip(wireType, fieldNo);
          if (options.readUnknownFields) {
            this.onUnknownField(message, fieldNo, wireType, data);
          }
          continue;
        }
        readField(message, reader, field, wireType, options);
      }
      if (delimitedMessageEncoding && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      (wireType != WireType.EndGroup || fieldNo !== lengthOrEndTagFieldNo)) {
        throw new Error(`invalid end group tag`);
      }
    },
    readField,
    writeMessage(message, writer, options) {
      const type = message.getType();
      for (const field of type.fields.byNumber()) {
        if (!isFieldSet(field, message)) {
          if (field.req) {
            throw new Error(`cannot encode field ${type.typeName}.${field.name} to binary: required field not set`);
          }
          continue;
        }
        const value = field.oneof ? message[field.oneof.localName].value : message[field.localName];
        writeField(field, value, writer, options);
      }
      if (options.writeUnknownFields) {
        this.writeUnknownFields(message, writer);
      }
      return writer;
    },
    writeField(field, value, writer, options) {
      if (value === void 0) {
        return void 0;
      }
      writeField(field, value, writer, options);
    }
  };
}
function readField(target, reader, field, wireType, options) {
  let { repeated, localName } = field;
  if (field.oneof) {
    target = target[field.oneof.localName];
    if (target.case != localName) {
      delete target.value;
    }
    target.case = localName;
    localName = "value";
  }
  switch (field.kind) {
    case "scalar":
    case "enum":
      const scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
      let read = readScalar;
      if (field.kind == "scalar" && field.L > 0) {
        read = readScalarLTString;
      }
      if (repeated) {
        let arr = target[localName];
        const isPacked = wireType == WireType.LengthDelimited && scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES;
        if (isPacked) {
          let e = reader.uint32() + reader.pos;
          while (reader.pos < e) {
            arr.push(read(reader, scalarType));
          }
        } else {
          arr.push(read(reader, scalarType));
        }
      } else {
        target[localName] = read(reader, scalarType);
      }
      break;
    case "message":
      const messageType = field.T;
      if (repeated) {
        target[localName].push(readMessageField(reader, new messageType(), options, field));
      } else {
        if (isMessage(target[localName])) {
          readMessageField(reader, target[localName], options, field);
        } else {
          target[localName] = readMessageField(reader, new messageType(), options, field);
          if (messageType.fieldWrapper && !field.oneof && !field.repeated) {
            target[localName] = messageType.fieldWrapper.unwrapField(target[localName]);
          }
        }
      }
      break;
    case "map":
      let [mapKey, mapVal] = readMapEntry(field, reader, options);
      target[localName][mapKey] = mapVal;
      break;
  }
}
function readMessageField(reader, message, options, field) {
  const format = message.getType().runtime.bin;
  const delimited = field === null || field === void 0 ? void 0 : field.delimited;
  format.readMessage(
    message,
    reader,
    delimited ? field.no : reader.uint32(),
    // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    options,
    delimited
  );
  return message;
}
function readMapEntry(field, reader, options) {
  const length = reader.uint32(), end = reader.pos + length;
  let key, val;
  while (reader.pos < end) {
    const [fieldNo] = reader.tag();
    switch (fieldNo) {
      case 1:
        key = readScalar(reader, field.K);
        break;
      case 2:
        switch (field.V.kind) {
          case "scalar":
            val = readScalar(reader, field.V.T);
            break;
          case "enum":
            val = reader.int32();
            break;
          case "message":
            val = readMessageField(reader, new field.V.T(), options, void 0);
            break;
        }
        break;
    }
  }
  if (key === void 0) {
    key = scalarZeroValue(field.K, LongType.BIGINT);
  }
  if (typeof key != "string" && typeof key != "number") {
    key = key.toString();
  }
  if (val === void 0) {
    switch (field.V.kind) {
      case "scalar":
        val = scalarZeroValue(field.V.T, LongType.BIGINT);
        break;
      case "enum":
        val = field.V.T.values[0].no;
        break;
      case "message":
        val = new field.V.T();
        break;
    }
  }
  return [key, val];
}
function readScalarLTString(reader, type) {
  const v = readScalar(reader, type);
  return typeof v == "bigint" ? v.toString() : v;
}
function readScalar(reader, type) {
  switch (type) {
    case ScalarType.STRING:
      return reader.string();
    case ScalarType.BOOL:
      return reader.bool();
    case ScalarType.DOUBLE:
      return reader.double();
    case ScalarType.FLOAT:
      return reader.float();
    case ScalarType.INT32:
      return reader.int32();
    case ScalarType.INT64:
      return reader.int64();
    case ScalarType.UINT64:
      return reader.uint64();
    case ScalarType.FIXED64:
      return reader.fixed64();
    case ScalarType.BYTES:
      return reader.bytes();
    case ScalarType.FIXED32:
      return reader.fixed32();
    case ScalarType.SFIXED32:
      return reader.sfixed32();
    case ScalarType.SFIXED64:
      return reader.sfixed64();
    case ScalarType.SINT64:
      return reader.sint64();
    case ScalarType.UINT32:
      return reader.uint32();
    case ScalarType.SINT32:
      return reader.sint32();
  }
}
function writeField(field, value, writer, options) {
  assert(value !== void 0);
  const repeated = field.repeated;
  switch (field.kind) {
    case "scalar":
    case "enum":
      let scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
      if (repeated) {
        assert(Array.isArray(value));
        if (field.packed) {
          writePacked(writer, scalarType, field.no, value);
        } else {
          for (const item of value) {
            writeScalar(writer, scalarType, field.no, item);
          }
        }
      } else {
        writeScalar(writer, scalarType, field.no, value);
      }
      break;
    case "message":
      if (repeated) {
        assert(Array.isArray(value));
        for (const item of value) {
          writeMessageField(writer, options, field, item);
        }
      } else {
        writeMessageField(writer, options, field, value);
      }
      break;
    case "map":
      assert(typeof value == "object" && value != null);
      for (const [key, val] of Object.entries(value)) {
        writeMapEntry(writer, options, field, key, val);
      }
      break;
  }
}
function writeMapEntry(writer, options, field, key, value) {
  writer.tag(field.no, WireType.LengthDelimited);
  writer.fork();
  let keyValue = key;
  switch (field.K) {
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      keyValue = Number.parseInt(key);
      break;
    case ScalarType.BOOL:
      assert(key == "true" || key == "false");
      keyValue = key == "true";
      break;
  }
  writeScalar(writer, field.K, 1, keyValue);
  switch (field.V.kind) {
    case "scalar":
      writeScalar(writer, field.V.T, 2, value);
      break;
    case "enum":
      writeScalar(writer, ScalarType.INT32, 2, value);
      break;
    case "message":
      assert(value !== void 0);
      writer.tag(2, WireType.LengthDelimited).bytes(value.toBinary(options));
      break;
  }
  writer.join();
}
function writeMessageField(writer, options, field, value) {
  const message = wrapField(field.T, value);
  if (field.delimited)
    writer.tag(field.no, WireType.StartGroup).raw(message.toBinary(options)).tag(field.no, WireType.EndGroup);
  else
    writer.tag(field.no, WireType.LengthDelimited).bytes(message.toBinary(options));
}
function writeScalar(writer, type, fieldNo, value) {
  assert(value !== void 0);
  let [wireType, method] = scalarTypeInfo(type);
  writer.tag(fieldNo, wireType)[method](value);
}
function writePacked(writer, type, fieldNo, value) {
  if (!value.length) {
    return;
  }
  writer.tag(fieldNo, WireType.LengthDelimited).fork();
  let [, method] = scalarTypeInfo(type);
  for (let i = 0; i < value.length; i++) {
    writer[method](value[i]);
  }
  writer.join();
}
function scalarTypeInfo(type) {
  let wireType = WireType.Varint;
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      wireType = WireType.LengthDelimited;
      break;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      wireType = WireType.Bit64;
      break;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      wireType = WireType.Bit32;
      break;
  }
  const method = ScalarType[type].toLowerCase();
  return [wireType, method];
}
function makeUtilCommon() {
  return {
    setEnumType,
    initPartial(source, target) {
      if (source === void 0) {
        return;
      }
      const type = target.getType();
      for (const member of type.fields.byMember()) {
        const localName = member.localName, t = target, s = source;
        if (s[localName] == null) {
          continue;
        }
        switch (member.kind) {
          case "oneof":
            const sk = s[localName].case;
            if (sk === void 0) {
              continue;
            }
            const sourceField = member.findField(sk);
            let val = s[localName].value;
            if (sourceField && sourceField.kind == "message" && !isMessage(val, sourceField.T)) {
              val = new sourceField.T(val);
            } else if (sourceField && sourceField.kind === "scalar" && sourceField.T === ScalarType.BYTES) {
              val = toU8Arr(val);
            }
            t[localName] = { case: sk, value: val };
            break;
          case "scalar":
          case "enum":
            let copy = s[localName];
            if (member.T === ScalarType.BYTES) {
              copy = member.repeated ? copy.map(toU8Arr) : toU8Arr(copy);
            }
            t[localName] = copy;
            break;
          case "map":
            switch (member.V.kind) {
              case "scalar":
              case "enum":
                if (member.V.T === ScalarType.BYTES) {
                  for (const [k, v] of Object.entries(s[localName])) {
                    t[localName][k] = toU8Arr(v);
                  }
                } else {
                  Object.assign(t[localName], s[localName]);
                }
                break;
              case "message":
                const messageType = member.V.T;
                for (const k of Object.keys(s[localName])) {
                  let val2 = s[localName][k];
                  if (!messageType.fieldWrapper) {
                    val2 = new messageType(val2);
                  }
                  t[localName][k] = val2;
                }
                break;
            }
            break;
          case "message":
            const mt = member.T;
            if (member.repeated) {
              t[localName] = s[localName].map((val2) => isMessage(val2, mt) ? val2 : new mt(val2));
            } else {
              const val2 = s[localName];
              if (mt.fieldWrapper) {
                if (
                  // We can't use BytesValue.typeName as that will create a circular import
                  mt.typeName === "google.protobuf.BytesValue"
                ) {
                  t[localName] = toU8Arr(val2);
                } else {
                  t[localName] = val2;
                }
              } else {
                t[localName] = isMessage(val2, mt) ? val2 : new mt(val2);
              }
            }
            break;
        }
      }
    },
    // TODO use isFieldSet() here to support future field presence
    equals(type, a, b) {
      if (a === b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      return type.fields.byMember().every((m) => {
        const va = a[m.localName];
        const vb = b[m.localName];
        if (m.repeated) {
          if (va.length !== vb.length) {
            return false;
          }
          switch (m.kind) {
            case "message":
              return va.every((a2, i) => m.T.equals(a2, vb[i]));
            case "scalar":
              return va.every((a2, i) => scalarEquals(m.T, a2, vb[i]));
            case "enum":
              return va.every((a2, i) => scalarEquals(ScalarType.INT32, a2, vb[i]));
          }
          throw new Error(`repeated cannot contain ${m.kind}`);
        }
        switch (m.kind) {
          case "message":
            return m.T.equals(va, vb);
          case "enum":
            return scalarEquals(ScalarType.INT32, va, vb);
          case "scalar":
            return scalarEquals(m.T, va, vb);
          case "oneof":
            if (va.case !== vb.case) {
              return false;
            }
            const s = m.findField(va.case);
            if (s === void 0) {
              return true;
            }
            switch (s.kind) {
              case "message":
                return s.T.equals(va.value, vb.value);
              case "enum":
                return scalarEquals(ScalarType.INT32, va.value, vb.value);
              case "scalar":
                return scalarEquals(s.T, va.value, vb.value);
            }
            throw new Error(`oneof cannot contain ${s.kind}`);
          case "map":
            const keys = Object.keys(va).concat(Object.keys(vb));
            switch (m.V.kind) {
              case "message":
                const messageType = m.V.T;
                return keys.every((k) => messageType.equals(va[k], vb[k]));
              case "enum":
                return keys.every((k) => scalarEquals(ScalarType.INT32, va[k], vb[k]));
              case "scalar":
                const scalarType = m.V.T;
                return keys.every((k) => scalarEquals(scalarType, va[k], vb[k]));
            }
            break;
        }
      });
    },
    // TODO use isFieldSet() here to support future field presence
    clone(message) {
      const type = message.getType(), target = new type(), any = target;
      for (const member of type.fields.byMember()) {
        const source = message[member.localName];
        let copy;
        if (member.repeated) {
          copy = source.map(cloneSingularField);
        } else if (member.kind == "map") {
          copy = any[member.localName];
          for (const [key, v] of Object.entries(source)) {
            copy[key] = cloneSingularField(v);
          }
        } else if (member.kind == "oneof") {
          const f = member.findField(source.case);
          copy = f ? { case: source.case, value: cloneSingularField(source.value) } : { case: void 0 };
        } else {
          copy = cloneSingularField(source);
        }
        any[member.localName] = copy;
      }
      for (const uf of type.runtime.bin.listUnknownFields(message)) {
        type.runtime.bin.onUnknownField(any, uf.no, uf.wireType, uf.data);
      }
      return target;
    }
  };
}
function cloneSingularField(value) {
  if (value === void 0) {
    return value;
  }
  if (isMessage(value)) {
    return value.clone();
  }
  if (value instanceof Uint8Array) {
    const c = new Uint8Array(value.byteLength);
    c.set(value);
    return c;
  }
  return value;
}
function toU8Arr(input) {
  return input instanceof Uint8Array ? input : new Uint8Array(input);
}
function makeProtoRuntime(syntax, newFieldList, initFields) {
  return {
    syntax,
    json: makeJsonFormat(),
    bin: makeBinaryFormat(),
    util: Object.assign(Object.assign({}, makeUtilCommon()), {
      newFieldList,
      initFields
    }),
    makeMessageType(typeName, fields, opt) {
      return makeMessageType(this, typeName, fields, opt);
    },
    makeEnum,
    makeEnumType,
    getEnumType,
    makeExtension(typeName, extendee, field) {
      return makeExtension(this, typeName, extendee, field);
    }
  };
}
class InternalFieldList {
  constructor(fields, normalizer) {
    this._fields = fields;
    this._normalizer = normalizer;
  }
  findJsonName(jsonName) {
    if (!this.jsonNames) {
      const t = {};
      for (const f of this.list()) {
        t[f.jsonName] = t[f.name] = f;
      }
      this.jsonNames = t;
    }
    return this.jsonNames[jsonName];
  }
  find(fieldNo) {
    if (!this.numbers) {
      const t = {};
      for (const f of this.list()) {
        t[f.no] = f;
      }
      this.numbers = t;
    }
    return this.numbers[fieldNo];
  }
  list() {
    if (!this.all) {
      this.all = this._normalizer(this._fields);
    }
    return this.all;
  }
  byNumber() {
    if (!this.numbersAsc) {
      this.numbersAsc = this.list().concat().sort((a, b) => a.no - b.no);
    }
    return this.numbersAsc;
  }
  byMember() {
    if (!this.members) {
      this.members = [];
      const a = this.members;
      let o;
      for (const f of this.list()) {
        if (f.oneof) {
          if (f.oneof !== o) {
            o = f.oneof;
            a.push(o);
          }
        } else {
          a.push(f);
        }
      }
    }
    return this.members;
  }
}
function localFieldName(protoName, inOneof) {
  const name = protoCamelCase(protoName);
  if (inOneof) {
    return name;
  }
  return safeObjectProperty(safeMessageProperty(name));
}
function localOneofName(protoName) {
  return localFieldName(protoName, false);
}
const fieldJsonName = protoCamelCase;
function protoCamelCase(snakeCase) {
  let capNext = false;
  const b = [];
  for (let i = 0; i < snakeCase.length; i++) {
    let c = snakeCase.charAt(i);
    switch (c) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        b.push(c);
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c = c.toUpperCase();
        }
        b.push(c);
        break;
    }
  }
  return b.join("");
}
const reservedObjectProperties = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
const reservedMessageProperties = /* @__PURE__ */ new Set([
  // names reserved by the runtime
  "getType",
  "clone",
  "equals",
  "fromBinary",
  "fromJson",
  "fromJsonString",
  "toBinary",
  "toJson",
  "toJsonString",
  // names reserved by the runtime for the future
  "toObject"
]);
const fallback = (name) => `${name}$`;
const safeMessageProperty = (name) => {
  if (reservedMessageProperties.has(name)) {
    return fallback(name);
  }
  return name;
};
const safeObjectProperty = (name) => {
  if (reservedObjectProperties.has(name)) {
    return fallback(name);
  }
  return name;
};
class InternalOneofInfo {
  constructor(name) {
    this.kind = "oneof";
    this.repeated = false;
    this.packed = false;
    this.opt = false;
    this.req = false;
    this.default = void 0;
    this.fields = [];
    this.name = name;
    this.localName = localOneofName(name);
  }
  addField(field) {
    assert(field.oneof === this, `field ${field.name} not one of ${this.name}`);
    this.fields.push(field);
  }
  findField(localName) {
    if (!this._lookup) {
      this._lookup = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < this.fields.length; i++) {
        this._lookup[this.fields[i].localName] = this.fields[i];
      }
    }
    return this._lookup[localName];
  }
}
function normalizeFieldInfos(fieldInfos, packedByDefault) {
  var _a, _b, _c, _d, _e, _f;
  const r = [];
  let o;
  for (const field of typeof fieldInfos == "function" ? fieldInfos() : fieldInfos) {
    const f = field;
    f.localName = localFieldName(field.name, field.oneof !== void 0);
    f.jsonName = (_a = field.jsonName) !== null && _a !== void 0 ? _a : fieldJsonName(field.name);
    f.repeated = (_b = field.repeated) !== null && _b !== void 0 ? _b : false;
    if (field.kind == "scalar") {
      f.L = (_c = field.L) !== null && _c !== void 0 ? _c : LongType.BIGINT;
    }
    f.delimited = (_d = field.delimited) !== null && _d !== void 0 ? _d : false;
    f.req = (_e = field.req) !== null && _e !== void 0 ? _e : false;
    f.opt = (_f = field.opt) !== null && _f !== void 0 ? _f : false;
    if (field.packed === void 0) {
      if (packedByDefault) {
        f.packed = field.kind == "enum" || field.kind == "scalar" && field.T != ScalarType.BYTES && field.T != ScalarType.STRING;
      } else {
        f.packed = false;
      }
    }
    if (field.oneof !== void 0) {
      const ooname = typeof field.oneof == "string" ? field.oneof : field.oneof.name;
      if (!o || o.name != ooname) {
        o = new InternalOneofInfo(ooname);
      }
      f.oneof = o;
      o.addField(f);
    }
    r.push(f);
  }
  return r;
}
const proto3 = makeProtoRuntime(
  "proto3",
  (fields) => {
    return new InternalFieldList(fields, (source) => normalizeFieldInfos(source, true));
  },
  // TODO merge with proto2 and initExtensionField, also see initPartial, equals, clone
  (target) => {
    for (const member of target.getType().fields.byMember()) {
      if (member.opt) {
        continue;
      }
      const name = member.localName, t = target;
      if (member.repeated) {
        t[name] = [];
        continue;
      }
      switch (member.kind) {
        case "oneof":
          t[name] = { case: void 0 };
          break;
        case "enum":
          t[name] = 0;
          break;
        case "map":
          t[name] = {};
          break;
        case "scalar":
          t[name] = scalarZeroValue(member.T, member.L);
          break;
      }
    }
  }
);
var MethodKind;
(function(MethodKind2) {
  MethodKind2[MethodKind2["Unary"] = 0] = "Unary";
  MethodKind2[MethodKind2["ServerStreaming"] = 1] = "ServerStreaming";
  MethodKind2[MethodKind2["ClientStreaming"] = 2] = "ClientStreaming";
  MethodKind2[MethodKind2["BiDiStreaming"] = 3] = "BiDiStreaming";
})(MethodKind || (MethodKind = {}));
var MethodIdempotency;
(function(MethodIdempotency2) {
  MethodIdempotency2[MethodIdempotency2["NoSideEffects"] = 1] = "NoSideEffects";
  MethodIdempotency2[MethodIdempotency2["Idempotent"] = 2] = "Idempotent";
})(MethodIdempotency || (MethodIdempotency = {}));
class Timestamp extends Message {
  constructor(data) {
    super();
    this.seconds = protoInt64.zero;
    this.nanos = 0;
    proto3.util.initPartial(data, this);
  }
  fromJson(json, options) {
    if (typeof json !== "string") {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: ${proto3.json.debug(json)}`);
    }
    const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
    if (!matches) {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string`);
    }
    const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
    if (Number.isNaN(ms)) {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string`);
    }
    if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
      throw new Error(`cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
    }
    this.seconds = protoInt64.parse(ms / 1e3);
    this.nanos = 0;
    if (matches[7]) {
      this.nanos = parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1e9;
    }
    return this;
  }
  toJson(options) {
    const ms = Number(this.seconds) * 1e3;
    if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
      throw new Error(`cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
    }
    if (this.nanos < 0) {
      throw new Error(`cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative`);
    }
    let z = "Z";
    if (this.nanos > 0) {
      const nanosStr = (this.nanos + 1e9).toString().substring(1);
      if (nanosStr.substring(3) === "000000") {
        z = "." + nanosStr.substring(0, 3) + "Z";
      } else if (nanosStr.substring(6) === "000") {
        z = "." + nanosStr.substring(0, 6) + "Z";
      } else {
        z = "." + nanosStr + "Z";
      }
    }
    return new Date(ms).toISOString().replace(".000Z", z);
  }
  toDate() {
    return new Date(Number(this.seconds) * 1e3 + Math.ceil(this.nanos / 1e6));
  }
  static now() {
    return Timestamp.fromDate(/* @__PURE__ */ new Date());
  }
  static fromDate(date) {
    const ms = date.getTime();
    return new Timestamp({
      seconds: protoInt64.parse(Math.floor(ms / 1e3)),
      nanos: ms % 1e3 * 1e6
    });
  }
  static fromBinary(bytes, options) {
    return new Timestamp().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Timestamp().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Timestamp().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Timestamp, a, b);
  }
}
Timestamp.runtime = proto3;
Timestamp.typeName = "google.protobuf.Timestamp";
Timestamp.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "seconds",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 2,
    name: "nanos",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class Any extends Message {
  constructor(data) {
    super();
    this.typeUrl = "";
    this.value = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    var _a;
    if (this.typeUrl === "") {
      return {};
    }
    const typeName = this.typeUrlToName(this.typeUrl);
    const messageType = (_a = options === null || options === void 0 ? void 0 : options.typeRegistry) === null || _a === void 0 ? void 0 : _a.findMessage(typeName);
    if (!messageType) {
      throw new Error(`cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`);
    }
    const message = messageType.fromBinary(this.value);
    let json = message.toJson(options);
    if (typeName.startsWith("google.protobuf.") || (json === null || Array.isArray(json) || typeof json !== "object")) {
      json = { value: json };
    }
    json["@type"] = this.typeUrl;
    return json;
  }
  fromJson(json, options) {
    var _a;
    if (json === null || Array.isArray(json) || typeof json != "object") {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: expected object but got ${json === null ? "null" : Array.isArray(json) ? "array" : typeof json}`);
    }
    if (Object.keys(json).length == 0) {
      return this;
    }
    const typeUrl = json["@type"];
    if (typeof typeUrl != "string" || typeUrl == "") {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: "@type" is empty`);
    }
    const typeName = this.typeUrlToName(typeUrl), messageType = (_a = options === null || options === void 0 ? void 0 : options.typeRegistry) === null || _a === void 0 ? void 0 : _a.findMessage(typeName);
    if (!messageType) {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: ${typeUrl} is not in the type registry`);
    }
    let message;
    if (typeName.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(json, "value")) {
      message = messageType.fromJson(json["value"], options);
    } else {
      const copy = Object.assign({}, json);
      delete copy["@type"];
      message = messageType.fromJson(copy, options);
    }
    this.packFrom(message);
    return this;
  }
  packFrom(message) {
    this.value = message.toBinary();
    this.typeUrl = this.typeNameToUrl(message.getType().typeName);
  }
  unpackTo(target) {
    if (!this.is(target.getType())) {
      return false;
    }
    target.fromBinary(this.value);
    return true;
  }
  unpack(registry) {
    if (this.typeUrl === "") {
      return void 0;
    }
    const messageType = registry.findMessage(this.typeUrlToName(this.typeUrl));
    if (!messageType) {
      return void 0;
    }
    return messageType.fromBinary(this.value);
  }
  is(type) {
    if (this.typeUrl === "") {
      return false;
    }
    const name = this.typeUrlToName(this.typeUrl);
    let typeName = "";
    if (typeof type === "string") {
      typeName = type;
    } else {
      typeName = type.typeName;
    }
    return name === typeName;
  }
  typeNameToUrl(name) {
    return `type.googleapis.com/${name}`;
  }
  typeUrlToName(url) {
    if (!url.length) {
      throw new Error(`invalid type url: ${url}`);
    }
    const slash = url.lastIndexOf("/");
    const name = slash >= 0 ? url.substring(slash + 1) : url;
    if (!name.length) {
      throw new Error(`invalid type url: ${url}`);
    }
    return name;
  }
  static pack(message) {
    const any = new Any();
    any.packFrom(message);
    return any;
  }
  static fromBinary(bytes, options) {
    return new Any().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Any().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Any().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Any, a, b);
  }
}
Any.runtime = proto3;
Any.typeName = "google.protobuf.Any";
Any.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "type_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "value",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class DoubleValue extends Message {
  constructor(data) {
    super();
    this.value = 0;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.DOUBLE, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.DOUBLE, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.DoubleValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new DoubleValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DoubleValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DoubleValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DoubleValue, a, b);
  }
}
DoubleValue.runtime = proto3;
DoubleValue.typeName = "google.protobuf.DoubleValue";
DoubleValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  }
]);
DoubleValue.fieldWrapper = {
  wrapField(value) {
    return new DoubleValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class FloatValue extends Message {
  constructor(data) {
    super();
    this.value = 0;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.FLOAT, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.FLOAT, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.FloatValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new FloatValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new FloatValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new FloatValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(FloatValue, a, b);
  }
}
FloatValue.runtime = proto3;
FloatValue.typeName = "google.protobuf.FloatValue";
FloatValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]);
FloatValue.fieldWrapper = {
  wrapField(value) {
    return new FloatValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class Int64Value extends Message {
  constructor(data) {
    super();
    this.value = protoInt64.zero;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.INT64, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.INT64, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.Int64Value from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new Int64Value().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Int64Value().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Int64Value().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Int64Value, a, b);
  }
}
Int64Value.runtime = proto3;
Int64Value.typeName = "google.protobuf.Int64Value";
Int64Value.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }
]);
Int64Value.fieldWrapper = {
  wrapField(value) {
    return new Int64Value({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class UInt64Value extends Message {
  constructor(data) {
    super();
    this.value = protoInt64.zero;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.UINT64, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.UINT64, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.UInt64Value from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new UInt64Value().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UInt64Value().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UInt64Value().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UInt64Value, a, b);
  }
}
UInt64Value.runtime = proto3;
UInt64Value.typeName = "google.protobuf.UInt64Value";
UInt64Value.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  }
]);
UInt64Value.fieldWrapper = {
  wrapField(value) {
    return new UInt64Value({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class Int32Value extends Message {
  constructor(data) {
    super();
    this.value = 0;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.INT32, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.INT32, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.Int32Value from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new Int32Value().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Int32Value().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Int32Value().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Int32Value, a, b);
  }
}
Int32Value.runtime = proto3;
Int32Value.typeName = "google.protobuf.Int32Value";
Int32Value.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
Int32Value.fieldWrapper = {
  wrapField(value) {
    return new Int32Value({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class UInt32Value extends Message {
  constructor(data) {
    super();
    this.value = 0;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.UINT32, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.UINT32, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.UInt32Value from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new UInt32Value().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UInt32Value().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UInt32Value().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UInt32Value, a, b);
  }
}
UInt32Value.runtime = proto3;
UInt32Value.typeName = "google.protobuf.UInt32Value";
UInt32Value.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]);
UInt32Value.fieldWrapper = {
  wrapField(value) {
    return new UInt32Value({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class BoolValue extends Message {
  constructor(data) {
    super();
    this.value = false;
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.BOOL, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.BOOL, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.BoolValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new BoolValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new BoolValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new BoolValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(BoolValue, a, b);
  }
}
BoolValue.runtime = proto3;
BoolValue.typeName = "google.protobuf.BoolValue";
BoolValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
BoolValue.fieldWrapper = {
  wrapField(value) {
    return new BoolValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class StringValue extends Message {
  constructor(data) {
    super();
    this.value = "";
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.STRING, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.STRING, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.StringValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new StringValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new StringValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new StringValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(StringValue, a, b);
  }
}
StringValue.runtime = proto3;
StringValue.typeName = "google.protobuf.StringValue";
StringValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
StringValue.fieldWrapper = {
  wrapField(value) {
    return new StringValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
class BytesValue extends Message {
  constructor(data) {
    super();
    this.value = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  toJson(options) {
    return proto3.json.writeScalar(ScalarType.BYTES, this.value, true);
  }
  fromJson(json, options) {
    try {
      this.value = proto3.json.readScalar(ScalarType.BYTES, json);
    } catch (e) {
      let m = `cannot decode message google.protobuf.BytesValue from JSON"`;
      if (e instanceof Error && e.message.length > 0) {
        m += `: ${e.message}`;
      }
      throw new Error(m);
    }
    return this;
  }
  static fromBinary(bytes, options) {
    return new BytesValue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new BytesValue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new BytesValue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(BytesValue, a, b);
  }
}
BytesValue.runtime = proto3;
BytesValue.typeName = "google.protobuf.BytesValue";
BytesValue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "value",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
BytesValue.fieldWrapper = {
  wrapField(value) {
    return new BytesValue({ value });
  },
  unwrapField(value) {
    return value.value;
  }
};
var RegistrationInfoStatus;
(function(RegistrationInfoStatus2) {
  RegistrationInfoStatus2[RegistrationInfoStatus2["UNKNOWN"] = 0] = "UNKNOWN";
  RegistrationInfoStatus2[RegistrationInfoStatus2["AVAILABLE_FREE"] = 1] = "AVAILABLE_FREE";
  RegistrationInfoStatus2[RegistrationInfoStatus2["AVAILABLE_START_CODE_REQUIRED"] = 2] = "AVAILABLE_START_CODE_REQUIRED";
  RegistrationInfoStatus2[RegistrationInfoStatus2["UNAVAILABLE_RESERVED_VERIFIED_DOMAIN"] = 3] = "UNAVAILABLE_RESERVED_VERIFIED_DOMAIN";
  RegistrationInfoStatus2[RegistrationInfoStatus2["UNAVAILABLE_RECOVER_VIA_BACKUP_CODE"] = 4] = "UNAVAILABLE_RECOVER_VIA_BACKUP_CODE";
  RegistrationInfoStatus2[RegistrationInfoStatus2["UNAVAILABLE_RECOVER_VIA_ADMIN"] = 5] = "UNAVAILABLE_RECOVER_VIA_ADMIN";
  RegistrationInfoStatus2[RegistrationInfoStatus2["UNAVAILABLE_RECOVER_VIA_BACKUP_CODE_OR_ADMIN"] = 6] = "UNAVAILABLE_RECOVER_VIA_BACKUP_CODE_OR_ADMIN";
  RegistrationInfoStatus2[RegistrationInfoStatus2["UNAVAILABLE_ADMIN_ACTION_REQUIRED"] = 7] = "UNAVAILABLE_ADMIN_ACTION_REQUIRED";
  RegistrationInfoStatus2[RegistrationInfoStatus2["UNAVAILABLE_NOT_RECOVERABLE"] = 8] = "UNAVAILABLE_NOT_RECOVERABLE";
})(RegistrationInfoStatus || (RegistrationInfoStatus = {}));
proto3.util.setEnumType(RegistrationInfoStatus, "domain.RegistrationInfoStatus", [
  { no: 0, name: "REGISTRATION_INFO_STATUS_UNKNOWN" },
  { no: 1, name: "REGISTRATION_INFO_STATUS_AVAILABLE_FREE" },
  { no: 2, name: "REGISTRATION_INFO_STATUS_AVAILABLE_START_CODE_REQUIRED" },
  { no: 3, name: "REGISTRATION_INFO_STATUS_UNAVAILABLE_RESERVED_VERIFIED_DOMAIN" },
  { no: 4, name: "REGISTRATION_INFO_STATUS_UNAVAILABLE_RECOVER_VIA_BACKUP_CODE" },
  { no: 5, name: "REGISTRATION_INFO_STATUS_UNAVAILABLE_RECOVER_VIA_ADMIN" },
  { no: 6, name: "REGISTRATION_INFO_STATUS_UNAVAILABLE_RECOVER_VIA_BACKUP_CODE_OR_ADMIN" },
  { no: 7, name: "REGISTRATION_INFO_STATUS_UNAVAILABLE_ADMIN_ACTION_REQUIRED" },
  { no: 8, name: "REGISTRATION_INFO_STATUS_UNAVAILABLE_NOT_RECOVERABLE" }
]);
const errorGroupFactor = 1e6;
const pleaseUpdate = "We are investigating. In the meantime, make sure you are using the latest version of our software then try again.";
var ErrorGroup$1;
(function(ErrorGroup2) {
  ErrorGroup2[ErrorGroup2["Backend"] = 0] = "Backend";
  ErrorGroup2[ErrorGroup2["BackendClient"] = 1e6] = "BackendClient";
  ErrorGroup2[ErrorGroup2["ClientCore"] = 2e6] = "ClientCore";
  ErrorGroup2[ErrorGroup2["LibVaultCrypto"] = 3e6] = "LibVaultCrypto";
  ErrorGroup2[ErrorGroup2["ClientNodeBridge"] = 4e6] = "ClientNodeBridge";
  ErrorGroup2[ErrorGroup2["ClientWebSdk"] = 5e6] = "ClientWebSdk";
  ErrorGroup2[ErrorGroup2["Heymerge"] = 6e6] = "Heymerge";
})(ErrorGroup$1 || (ErrorGroup$1 = {}));
let DomainError$1 = class DomainError extends Error {
  constructor(code, short, userTitle, userDetail) {
    super(short);
    this.code = code;
    this.short = short;
    this.userTitle = userTitle;
    this.userDetail = userDetail;
    this.name = "DomainError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
  codeGroup() {
    return this.code - this.code % errorGroupFactor;
  }
  isClientError() {
    return this.codeGroup() === ErrorGroup$1.ClientCore;
  }
  isBackendError() {
    return this.codeGroup() === ErrorGroup$1.Backend;
  }
  isLibVaultCryptoError() {
    return this.codeGroup() === ErrorGroup$1.LibVaultCrypto;
  }
  isClientWebSdkError() {
    return this.codeGroup() === ErrorGroup$1.ClientWebSdk;
  }
  isHeymergeError() {
    return this.codeGroup() === ErrorGroup$1.Heymerge;
  }
};
var BackendClientErrorCode;
(function(BackendClientErrorCode2) {
  BackendClientErrorCode2[BackendClientErrorCode2["NoResponse"] = 1000400] = "NoResponse";
  BackendClientErrorCode2[BackendClientErrorCode2["InvalidChannelMessage"] = 1000410] = "InvalidChannelMessage";
  BackendClientErrorCode2[BackendClientErrorCode2["InvalidGrpcResponse"] = 1000420] = "InvalidGrpcResponse";
  BackendClientErrorCode2[BackendClientErrorCode2["RequiredFieldMissing"] = 1000430] = "RequiredFieldMissing";
})(BackendClientErrorCode || (BackendClientErrorCode = {}));
class BackendClientDomainError extends DomainError$1 {
  constructor(code, short, userTitle, userDetail) {
    super(code, short, userTitle !== null && userTitle !== void 0 ? userTitle : short, userDetail !== null && userDetail !== void 0 ? userDetail : pleaseUpdate);
  }
}
class NoResponseError extends BackendClientDomainError {
  constructor() {
    super(BackendClientErrorCode.NoResponse, "no response", "No response", `Our server did not respond to the client's request. ${pleaseUpdate}`);
  }
}
class InvalidGrpcResponseError extends BackendClientDomainError {
  constructor(grpcStatusCode) {
    super(BackendClientErrorCode.InvalidGrpcResponse, `invalid response (${grpcStatusCode})`, "invalid response", `Received an unexpected reply from the server. ${pleaseUpdate}`);
    this.grpcStatusCode = grpcStatusCode;
  }
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function __read$1(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread$1() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read$1(arguments[i]));
  return ar;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __values$1(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function isBrowserBundle() {
  return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
}
function isNodeEnv() {
  return !isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}
function dynamicRequire(mod, request) {
  return mod.require(request);
}
var fallbackGlobalObject = {};
function getGlobalObject() {
  return isNodeEnv() ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : fallbackGlobalObject;
}
function getGlobalSingleton(name, creator, obj) {
  var global2 = obj || getGlobalObject();
  var __SENTRY__ = global2.__SENTRY__ = global2.__SENTRY__ || {};
  var singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
  return singleton;
}
var objectToString = Object.prototype.toString;
function isBuiltin(wat, ty) {
  return objectToString.call(wat) === "[object " + ty + "]";
}
function isPlainObject(wat) {
  return isBuiltin(wat, "Object");
}
function isThenable(wat) {
  return Boolean(wat && wat.then && typeof wat.then === "function");
}
var IS_DEBUG_BUILD$1 = typeof __SENTRY_DEBUG__ === "undefined" ? true : __SENTRY_DEBUG__;
var global$1 = getGlobalObject();
var PREFIX = "Sentry Logger ";
var CONSOLE_LEVELS = ["debug", "info", "warn", "error", "log", "assert"];
function consoleSandbox(callback) {
  var global2 = getGlobalObject();
  if (!("console" in global2)) {
    return callback();
  }
  var originalConsole = global2.console;
  var wrappedLevels = {};
  CONSOLE_LEVELS.forEach(function(level) {
    var originalWrappedFunc = originalConsole[level] && originalConsole[level].__sentry_original__;
    if (level in global2.console && originalWrappedFunc) {
      wrappedLevels[level] = originalConsole[level];
      originalConsole[level] = originalWrappedFunc;
    }
  });
  try {
    return callback();
  } finally {
    Object.keys(wrappedLevels).forEach(function(level) {
      originalConsole[level] = wrappedLevels[level];
    });
  }
}
function makeLogger() {
  var enabled = false;
  var logger2 = {
    enable: function() {
      enabled = true;
    },
    disable: function() {
      enabled = false;
    }
  };
  if (IS_DEBUG_BUILD$1) {
    CONSOLE_LEVELS.forEach(function(name) {
      logger2[name] = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (enabled) {
          consoleSandbox(function() {
            var _a;
            (_a = global$1.console)[name].apply(_a, __spread([PREFIX + "[" + name + "]:"], args));
          });
        }
      };
    });
  } else {
    CONSOLE_LEVELS.forEach(function(name) {
      logger2[name] = function() {
        return void 0;
      };
    });
  }
  return logger2;
}
var logger;
if (IS_DEBUG_BUILD$1) {
  logger = getGlobalSingleton("logger", makeLogger);
} else {
  logger = makeLogger();
}
function dropUndefinedKeys(val) {
  var e_1, _a;
  if (isPlainObject(val)) {
    var rv = {};
    try {
      for (var _b = __values$1(Object.keys(val)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;
        if (typeof val[key] !== "undefined") {
          rv[key] = dropUndefinedKeys(val[key]);
        }
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
    return rv;
  }
  if (Array.isArray(val)) {
    return val.map(dropUndefinedKeys);
  }
  return val;
}
function uuid4() {
  var global2 = getGlobalObject();
  var crypto = global2.crypto || global2.msCrypto;
  if (!(crypto === void 0) && crypto.getRandomValues) {
    var arr = new Uint16Array(8);
    crypto.getRandomValues(arr);
    arr[3] = arr[3] & 4095 | 16384;
    arr[4] = arr[4] & 16383 | 32768;
    var pad = function(num) {
      var v = num.toString(16);
      while (v.length < 4) {
        v = "0" + v;
      }
      return v;
    };
    return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
  }
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
var SyncPromise = (
  /** @class */
  function() {
    function SyncPromise2(executor) {
      var _this = this;
      this._state = 0;
      this._handlers = [];
      this._resolve = function(value) {
        _this._setResult(1, value);
      };
      this._reject = function(reason) {
        _this._setResult(2, reason);
      };
      this._setResult = function(state, value) {
        if (_this._state !== 0) {
          return;
        }
        if (isThenable(value)) {
          void value.then(_this._resolve, _this._reject);
          return;
        }
        _this._state = state;
        _this._value = value;
        _this._executeHandlers();
      };
      this._executeHandlers = function() {
        if (_this._state === 0) {
          return;
        }
        var cachedHandlers = _this._handlers.slice();
        _this._handlers = [];
        cachedHandlers.forEach(function(handler) {
          if (handler[0]) {
            return;
          }
          if (_this._state === 1) {
            handler[1](_this._value);
          }
          if (_this._state === 2) {
            handler[2](_this._value);
          }
          handler[0] = true;
        });
      };
      try {
        executor(this._resolve, this._reject);
      } catch (e) {
        this._reject(e);
      }
    }
    SyncPromise2.prototype.then = function(onfulfilled, onrejected) {
      var _this = this;
      return new SyncPromise2(function(resolve, reject) {
        _this._handlers.push([
          false,
          function(result) {
            if (!onfulfilled) {
              resolve(result);
            } else {
              try {
                resolve(onfulfilled(result));
              } catch (e) {
                reject(e);
              }
            }
          },
          function(reason) {
            if (!onrejected) {
              reject(reason);
            } else {
              try {
                resolve(onrejected(reason));
              } catch (e) {
                reject(e);
              }
            }
          }
        ]);
        _this._executeHandlers();
      });
    };
    SyncPromise2.prototype.catch = function(onrejected) {
      return this.then(function(val) {
        return val;
      }, onrejected);
    };
    SyncPromise2.prototype.finally = function(onfinally) {
      var _this = this;
      return new SyncPromise2(function(resolve, reject) {
        var val;
        var isRejected;
        return _this.then(function(value) {
          isRejected = false;
          val = value;
          if (onfinally) {
            onfinally();
          }
        }, function(reason) {
          isRejected = true;
          val = reason;
          if (onfinally) {
            onfinally();
          }
        }).then(function() {
          if (isRejected) {
            reject(val);
            return;
          }
          resolve(val);
        });
      });
    };
    return SyncPromise2;
  }()
);
var dateTimestampSource = {
  nowSeconds: function() {
    return Date.now() / 1e3;
  }
};
function getBrowserPerformance() {
  var performance = getGlobalObject().performance;
  if (!performance || !performance.now) {
    return void 0;
  }
  var timeOrigin = Date.now() - performance.now();
  return {
    now: function() {
      return performance.now();
    },
    timeOrigin
  };
}
function getNodePerformance() {
  try {
    var perfHooks = dynamicRequire(module, "perf_hooks");
    return perfHooks.performance;
  } catch (_) {
    return void 0;
  }
}
var platformPerformance = isNodeEnv() ? getNodePerformance() : getBrowserPerformance();
var timestampSource = platformPerformance === void 0 ? dateTimestampSource : {
  nowSeconds: function() {
    return (platformPerformance.timeOrigin + platformPerformance.now()) / 1e3;
  }
};
var dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource);
var timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);
(function() {
  var performance = getGlobalObject().performance;
  if (!performance || !performance.now) {
    return void 0;
  }
  var threshold = 3600 * 1e3;
  var performanceNow = performance.now();
  var dateNow = Date.now();
  var timeOriginDelta = performance.timeOrigin ? Math.abs(performance.timeOrigin + performanceNow - dateNow) : threshold;
  var timeOriginIsReliable = timeOriginDelta < threshold;
  var navigationStart = performance.timing && performance.timing.navigationStart;
  var hasNavigationStart = typeof navigationStart === "number";
  var navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
  var navigationStartIsReliable = navigationStartDelta < threshold;
  if (timeOriginIsReliable || navigationStartIsReliable) {
    if (timeOriginDelta <= navigationStartDelta) {
      return performance.timeOrigin;
    } else {
      return navigationStart;
    }
  }
  return dateNow;
})();
var MAX_BREADCRUMBS = 100;
var Scope = (
  /** @class */
  function() {
    function Scope2() {
      this._notifyingListeners = false;
      this._scopeListeners = [];
      this._eventProcessors = [];
      this._breadcrumbs = [];
      this._user = {};
      this._tags = {};
      this._extra = {};
      this._contexts = {};
      this._sdkProcessingMetadata = {};
    }
    Scope2.clone = function(scope) {
      var newScope = new Scope2();
      if (scope) {
        newScope._breadcrumbs = __spread(scope._breadcrumbs);
        newScope._tags = __assign({}, scope._tags);
        newScope._extra = __assign({}, scope._extra);
        newScope._contexts = __assign({}, scope._contexts);
        newScope._user = scope._user;
        newScope._level = scope._level;
        newScope._span = scope._span;
        newScope._session = scope._session;
        newScope._transactionName = scope._transactionName;
        newScope._fingerprint = scope._fingerprint;
        newScope._eventProcessors = __spread(scope._eventProcessors);
        newScope._requestSession = scope._requestSession;
      }
      return newScope;
    };
    Scope2.prototype.addScopeListener = function(callback) {
      this._scopeListeners.push(callback);
    };
    Scope2.prototype.addEventProcessor = function(callback) {
      this._eventProcessors.push(callback);
      return this;
    };
    Scope2.prototype.setUser = function(user) {
      this._user = user || {};
      if (this._session) {
        this._session.update({ user });
      }
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.getUser = function() {
      return this._user;
    };
    Scope2.prototype.getRequestSession = function() {
      return this._requestSession;
    };
    Scope2.prototype.setRequestSession = function(requestSession) {
      this._requestSession = requestSession;
      return this;
    };
    Scope2.prototype.setTags = function(tags) {
      this._tags = __assign(__assign({}, this._tags), tags);
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setTag = function(key, value) {
      var _a;
      this._tags = __assign(__assign({}, this._tags), (_a = {}, _a[key] = value, _a));
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setExtras = function(extras) {
      this._extra = __assign(__assign({}, this._extra), extras);
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setExtra = function(key, extra) {
      var _a;
      this._extra = __assign(__assign({}, this._extra), (_a = {}, _a[key] = extra, _a));
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setFingerprint = function(fingerprint) {
      this._fingerprint = fingerprint;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setLevel = function(level) {
      this._level = level;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setTransactionName = function(name) {
      this._transactionName = name;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setTransaction = function(name) {
      return this.setTransactionName(name);
    };
    Scope2.prototype.setContext = function(key, context) {
      var _a;
      if (context === null) {
        delete this._contexts[key];
      } else {
        this._contexts = __assign(__assign({}, this._contexts), (_a = {}, _a[key] = context, _a));
      }
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.setSpan = function(span) {
      this._span = span;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.getSpan = function() {
      return this._span;
    };
    Scope2.prototype.getTransaction = function() {
      var span = this.getSpan();
      return span && span.transaction;
    };
    Scope2.prototype.setSession = function(session) {
      if (!session) {
        delete this._session;
      } else {
        this._session = session;
      }
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.getSession = function() {
      return this._session;
    };
    Scope2.prototype.update = function(captureContext) {
      if (!captureContext) {
        return this;
      }
      if (typeof captureContext === "function") {
        var updatedScope = captureContext(this);
        return updatedScope instanceof Scope2 ? updatedScope : this;
      }
      if (captureContext instanceof Scope2) {
        this._tags = __assign(__assign({}, this._tags), captureContext._tags);
        this._extra = __assign(__assign({}, this._extra), captureContext._extra);
        this._contexts = __assign(__assign({}, this._contexts), captureContext._contexts);
        if (captureContext._user && Object.keys(captureContext._user).length) {
          this._user = captureContext._user;
        }
        if (captureContext._level) {
          this._level = captureContext._level;
        }
        if (captureContext._fingerprint) {
          this._fingerprint = captureContext._fingerprint;
        }
        if (captureContext._requestSession) {
          this._requestSession = captureContext._requestSession;
        }
      } else if (isPlainObject(captureContext)) {
        captureContext = captureContext;
        this._tags = __assign(__assign({}, this._tags), captureContext.tags);
        this._extra = __assign(__assign({}, this._extra), captureContext.extra);
        this._contexts = __assign(__assign({}, this._contexts), captureContext.contexts);
        if (captureContext.user) {
          this._user = captureContext.user;
        }
        if (captureContext.level) {
          this._level = captureContext.level;
        }
        if (captureContext.fingerprint) {
          this._fingerprint = captureContext.fingerprint;
        }
        if (captureContext.requestSession) {
          this._requestSession = captureContext.requestSession;
        }
      }
      return this;
    };
    Scope2.prototype.clear = function() {
      this._breadcrumbs = [];
      this._tags = {};
      this._extra = {};
      this._user = {};
      this._contexts = {};
      this._level = void 0;
      this._transactionName = void 0;
      this._fingerprint = void 0;
      this._requestSession = void 0;
      this._span = void 0;
      this._session = void 0;
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.addBreadcrumb = function(breadcrumb, maxBreadcrumbs) {
      var maxCrumbs = typeof maxBreadcrumbs === "number" ? Math.min(maxBreadcrumbs, MAX_BREADCRUMBS) : MAX_BREADCRUMBS;
      if (maxCrumbs <= 0) {
        return this;
      }
      var mergedBreadcrumb = __assign({ timestamp: dateTimestampInSeconds() }, breadcrumb);
      this._breadcrumbs = __spread(this._breadcrumbs, [mergedBreadcrumb]).slice(-maxCrumbs);
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.clearBreadcrumbs = function() {
      this._breadcrumbs = [];
      this._notifyScopeListeners();
      return this;
    };
    Scope2.prototype.applyToEvent = function(event, hint) {
      if (this._extra && Object.keys(this._extra).length) {
        event.extra = __assign(__assign({}, this._extra), event.extra);
      }
      if (this._tags && Object.keys(this._tags).length) {
        event.tags = __assign(__assign({}, this._tags), event.tags);
      }
      if (this._user && Object.keys(this._user).length) {
        event.user = __assign(__assign({}, this._user), event.user);
      }
      if (this._contexts && Object.keys(this._contexts).length) {
        event.contexts = __assign(__assign({}, this._contexts), event.contexts);
      }
      if (this._level) {
        event.level = this._level;
      }
      if (this._transactionName) {
        event.transaction = this._transactionName;
      }
      if (this._span) {
        event.contexts = __assign({ trace: this._span.getTraceContext() }, event.contexts);
        var transactionName = this._span.transaction && this._span.transaction.name;
        if (transactionName) {
          event.tags = __assign({ transaction: transactionName }, event.tags);
        }
      }
      this._applyFingerprint(event);
      event.breadcrumbs = __spread(event.breadcrumbs || [], this._breadcrumbs);
      event.breadcrumbs = event.breadcrumbs.length > 0 ? event.breadcrumbs : void 0;
      event.sdkProcessingMetadata = this._sdkProcessingMetadata;
      return this._notifyEventProcessors(__spread(getGlobalEventProcessors(), this._eventProcessors), event, hint);
    };
    Scope2.prototype.setSDKProcessingMetadata = function(newData) {
      this._sdkProcessingMetadata = __assign(__assign({}, this._sdkProcessingMetadata), newData);
      return this;
    };
    Scope2.prototype._notifyEventProcessors = function(processors, event, hint, index) {
      var _this = this;
      if (index === void 0) {
        index = 0;
      }
      return new SyncPromise(function(resolve, reject) {
        var processor = processors[index];
        if (event === null || typeof processor !== "function") {
          resolve(event);
        } else {
          var result = processor(__assign({}, event), hint);
          if (isThenable(result)) {
            void result.then(function(final) {
              return _this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve);
            }).then(null, reject);
          } else {
            void _this._notifyEventProcessors(processors, result, hint, index + 1).then(resolve).then(null, reject);
          }
        }
      });
    };
    Scope2.prototype._notifyScopeListeners = function() {
      var _this = this;
      if (!this._notifyingListeners) {
        this._notifyingListeners = true;
        this._scopeListeners.forEach(function(callback) {
          callback(_this);
        });
        this._notifyingListeners = false;
      }
    };
    Scope2.prototype._applyFingerprint = function(event) {
      event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [event.fingerprint] : [];
      if (this._fingerprint) {
        event.fingerprint = event.fingerprint.concat(this._fingerprint);
      }
      if (event.fingerprint && !event.fingerprint.length) {
        delete event.fingerprint;
      }
    };
    return Scope2;
  }()
);
function getGlobalEventProcessors() {
  return getGlobalSingleton("globalEventProcessors", function() {
    return [];
  });
}
var Session = (
  /** @class */
  function() {
    function Session2(context) {
      this.errors = 0;
      this.sid = uuid4();
      this.duration = 0;
      this.status = "ok";
      this.init = true;
      this.ignoreDuration = false;
      var startingTime = timestampInSeconds();
      this.timestamp = startingTime;
      this.started = startingTime;
      if (context) {
        this.update(context);
      }
    }
    Session2.prototype.update = function(context) {
      if (context === void 0) {
        context = {};
      }
      if (context.user) {
        if (!this.ipAddress && context.user.ip_address) {
          this.ipAddress = context.user.ip_address;
        }
        if (!this.did && !context.did) {
          this.did = context.user.id || context.user.email || context.user.username;
        }
      }
      this.timestamp = context.timestamp || timestampInSeconds();
      if (context.ignoreDuration) {
        this.ignoreDuration = context.ignoreDuration;
      }
      if (context.sid) {
        this.sid = context.sid.length === 32 ? context.sid : uuid4();
      }
      if (context.init !== void 0) {
        this.init = context.init;
      }
      if (!this.did && context.did) {
        this.did = "" + context.did;
      }
      if (typeof context.started === "number") {
        this.started = context.started;
      }
      if (this.ignoreDuration) {
        this.duration = void 0;
      } else if (typeof context.duration === "number") {
        this.duration = context.duration;
      } else {
        var duration = this.timestamp - this.started;
        this.duration = duration >= 0 ? duration : 0;
      }
      if (context.release) {
        this.release = context.release;
      }
      if (context.environment) {
        this.environment = context.environment;
      }
      if (!this.ipAddress && context.ipAddress) {
        this.ipAddress = context.ipAddress;
      }
      if (!this.userAgent && context.userAgent) {
        this.userAgent = context.userAgent;
      }
      if (typeof context.errors === "number") {
        this.errors = context.errors;
      }
      if (context.status) {
        this.status = context.status;
      }
    };
    Session2.prototype.close = function(status) {
      if (status) {
        this.update({ status });
      } else if (this.status === "ok") {
        this.update({ status: "exited" });
      } else {
        this.update();
      }
    };
    Session2.prototype.toJSON = function() {
      return dropUndefinedKeys({
        sid: "" + this.sid,
        init: this.init,
        // Make sure that sec is converted to ms for date constructor
        started: new Date(this.started * 1e3).toISOString(),
        timestamp: new Date(this.timestamp * 1e3).toISOString(),
        status: this.status,
        errors: this.errors,
        did: typeof this.did === "number" || typeof this.did === "string" ? "" + this.did : void 0,
        duration: this.duration,
        attrs: {
          release: this.release,
          environment: this.environment,
          ip_address: this.ipAddress,
          user_agent: this.userAgent
        }
      });
    };
    return Session2;
  }()
);
var IS_DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" ? true : __SENTRY_DEBUG__;
var API_VERSION = 4;
var DEFAULT_BREADCRUMBS = 100;
var Hub = (
  /** @class */
  function() {
    function Hub2(client, scope, _version) {
      if (scope === void 0) {
        scope = new Scope();
      }
      if (_version === void 0) {
        _version = API_VERSION;
      }
      this._version = _version;
      this._stack = [{}];
      this.getStackTop().scope = scope;
      if (client) {
        this.bindClient(client);
      }
    }
    Hub2.prototype.isOlderThan = function(version) {
      return this._version < version;
    };
    Hub2.prototype.bindClient = function(client) {
      var top = this.getStackTop();
      top.client = client;
      if (client && client.setupIntegrations) {
        client.setupIntegrations();
      }
    };
    Hub2.prototype.pushScope = function() {
      var scope = Scope.clone(this.getScope());
      this.getStack().push({
        client: this.getClient(),
        scope
      });
      return scope;
    };
    Hub2.prototype.popScope = function() {
      if (this.getStack().length <= 1)
        return false;
      return !!this.getStack().pop();
    };
    Hub2.prototype.withScope = function(callback) {
      var scope = this.pushScope();
      try {
        callback(scope);
      } finally {
        this.popScope();
      }
    };
    Hub2.prototype.getClient = function() {
      return this.getStackTop().client;
    };
    Hub2.prototype.getScope = function() {
      return this.getStackTop().scope;
    };
    Hub2.prototype.getStack = function() {
      return this._stack;
    };
    Hub2.prototype.getStackTop = function() {
      return this._stack[this._stack.length - 1];
    };
    Hub2.prototype.captureException = function(exception, hint) {
      var eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4();
      var finalHint = hint;
      if (!hint) {
        var syntheticException = void 0;
        try {
          throw new Error("Sentry syntheticException");
        } catch (exception2) {
          syntheticException = exception2;
        }
        finalHint = {
          originalException: exception,
          syntheticException
        };
      }
      this._invokeClient("captureException", exception, __assign(__assign({}, finalHint), { event_id: eventId }));
      return eventId;
    };
    Hub2.prototype.captureMessage = function(message, level, hint) {
      var eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4();
      var finalHint = hint;
      if (!hint) {
        var syntheticException = void 0;
        try {
          throw new Error(message);
        } catch (exception) {
          syntheticException = exception;
        }
        finalHint = {
          originalException: message,
          syntheticException
        };
      }
      this._invokeClient("captureMessage", message, level, __assign(__assign({}, finalHint), { event_id: eventId }));
      return eventId;
    };
    Hub2.prototype.captureEvent = function(event, hint) {
      var eventId = hint && hint.event_id ? hint.event_id : uuid4();
      if (event.type !== "transaction") {
        this._lastEventId = eventId;
      }
      this._invokeClient("captureEvent", event, __assign(__assign({}, hint), { event_id: eventId }));
      return eventId;
    };
    Hub2.prototype.lastEventId = function() {
      return this._lastEventId;
    };
    Hub2.prototype.addBreadcrumb = function(breadcrumb, hint) {
      var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
      if (!scope || !client)
        return;
      var _b = client.getOptions && client.getOptions() || {}, _c = _b.beforeBreadcrumb, beforeBreadcrumb = _c === void 0 ? null : _c, _d = _b.maxBreadcrumbs, maxBreadcrumbs = _d === void 0 ? DEFAULT_BREADCRUMBS : _d;
      if (maxBreadcrumbs <= 0)
        return;
      var timestamp = dateTimestampInSeconds();
      var mergedBreadcrumb = __assign({ timestamp }, breadcrumb);
      var finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(function() {
        return beforeBreadcrumb(mergedBreadcrumb, hint);
      }) : mergedBreadcrumb;
      if (finalBreadcrumb === null)
        return;
      scope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
    };
    Hub2.prototype.setUser = function(user) {
      var scope = this.getScope();
      if (scope)
        scope.setUser(user);
    };
    Hub2.prototype.setTags = function(tags) {
      var scope = this.getScope();
      if (scope)
        scope.setTags(tags);
    };
    Hub2.prototype.setExtras = function(extras) {
      var scope = this.getScope();
      if (scope)
        scope.setExtras(extras);
    };
    Hub2.prototype.setTag = function(key, value) {
      var scope = this.getScope();
      if (scope)
        scope.setTag(key, value);
    };
    Hub2.prototype.setExtra = function(key, extra) {
      var scope = this.getScope();
      if (scope)
        scope.setExtra(key, extra);
    };
    Hub2.prototype.setContext = function(name, context) {
      var scope = this.getScope();
      if (scope)
        scope.setContext(name, context);
    };
    Hub2.prototype.configureScope = function(callback) {
      var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
      if (scope && client) {
        callback(scope);
      }
    };
    Hub2.prototype.run = function(callback) {
      var oldHub = makeMain(this);
      try {
        callback(this);
      } finally {
        makeMain(oldHub);
      }
    };
    Hub2.prototype.getIntegration = function(integration) {
      var client = this.getClient();
      if (!client)
        return null;
      try {
        return client.getIntegration(integration);
      } catch (_oO) {
        IS_DEBUG_BUILD && logger.warn("Cannot retrieve integration " + integration.id + " from the current Hub");
        return null;
      }
    };
    Hub2.prototype.startSpan = function(context) {
      return this._callExtensionMethod("startSpan", context);
    };
    Hub2.prototype.startTransaction = function(context, customSamplingContext) {
      return this._callExtensionMethod("startTransaction", context, customSamplingContext);
    };
    Hub2.prototype.traceHeaders = function() {
      return this._callExtensionMethod("traceHeaders");
    };
    Hub2.prototype.captureSession = function(endSession) {
      if (endSession === void 0) {
        endSession = false;
      }
      if (endSession) {
        return this.endSession();
      }
      this._sendSessionUpdate();
    };
    Hub2.prototype.endSession = function() {
      var layer = this.getStackTop();
      var scope = layer && layer.scope;
      var session = scope && scope.getSession();
      if (session) {
        session.close();
      }
      this._sendSessionUpdate();
      if (scope) {
        scope.setSession();
      }
    };
    Hub2.prototype.startSession = function(context) {
      var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
      var _b = client && client.getOptions() || {}, release = _b.release, environment = _b.environment;
      var global2 = getGlobalObject();
      var userAgent = (global2.navigator || {}).userAgent;
      var session = new Session(__assign(__assign(__assign({
        release,
        environment
      }, scope && { user: scope.getUser() }), userAgent && { userAgent }), context));
      if (scope) {
        var currentSession = scope.getSession && scope.getSession();
        if (currentSession && currentSession.status === "ok") {
          currentSession.update({ status: "exited" });
        }
        this.endSession();
        scope.setSession(session);
      }
      return session;
    };
    Hub2.prototype._sendSessionUpdate = function() {
      var _a = this.getStackTop(), scope = _a.scope, client = _a.client;
      if (!scope)
        return;
      var session = scope.getSession && scope.getSession();
      if (session) {
        if (client && client.captureSession) {
          client.captureSession(session);
        }
      }
    };
    Hub2.prototype._invokeClient = function(method) {
      var _a;
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var _b = this.getStackTop(), scope = _b.scope, client = _b.client;
      if (client && client[method]) {
        (_a = client)[method].apply(_a, __spread(args, [scope]));
      }
    };
    Hub2.prototype._callExtensionMethod = function(method) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var carrier = getMainCarrier();
      var sentry = carrier.__SENTRY__;
      if (sentry && sentry.extensions && typeof sentry.extensions[method] === "function") {
        return sentry.extensions[method].apply(this, args);
      }
      IS_DEBUG_BUILD && logger.warn("Extension method " + method + " couldn't be found, doing nothing.");
    };
    return Hub2;
  }()
);
function getMainCarrier() {
  var carrier = getGlobalObject();
  carrier.__SENTRY__ = carrier.__SENTRY__ || {
    extensions: {},
    hub: void 0
  };
  return carrier;
}
function makeMain(hub) {
  var registry = getMainCarrier();
  var oldHub = getHubFromCarrier(registry);
  setHubOnCarrier(registry, hub);
  return oldHub;
}
function getCurrentHub() {
  var registry = getMainCarrier();
  if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
    setHubOnCarrier(registry, new Hub());
  }
  if (isNodeEnv()) {
    return getHubFromActiveDomain(registry);
  }
  return getHubFromCarrier(registry);
}
function getHubFromActiveDomain(registry) {
  try {
    var sentry = getMainCarrier().__SENTRY__;
    var activeDomain = sentry && sentry.extensions && sentry.extensions.domain && sentry.extensions.domain.active;
    if (!activeDomain) {
      return getHubFromCarrier(registry);
    }
    if (!hasHubOnCarrier(activeDomain) || getHubFromCarrier(activeDomain).isOlderThan(API_VERSION)) {
      var registryHubTopStack = getHubFromCarrier(registry).getStackTop();
      setHubOnCarrier(activeDomain, new Hub(registryHubTopStack.client, Scope.clone(registryHubTopStack.scope)));
    }
    return getHubFromCarrier(activeDomain);
  } catch (_Oo) {
    return getHubFromCarrier(registry);
  }
}
function hasHubOnCarrier(carrier) {
  return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
}
function getHubFromCarrier(carrier) {
  return getGlobalSingleton("hub", function() {
    return new Hub();
  }, carrier);
}
function setHubOnCarrier(carrier, hub) {
  if (!carrier)
    return false;
  var __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
  __SENTRY__.hub = hub;
  return true;
}
function callOnHub(method) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  var hub = getCurrentHub();
  if (hub && hub[method]) {
    return hub[method].apply(hub, __spread$1(args));
  }
  throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
}
function captureException(exception, captureContext) {
  var syntheticException = new Error("Sentry syntheticException");
  return callOnHub("captureException", exception, {
    captureContext,
    originalException: exception,
    syntheticException
  });
}
function addBreadcrumb(breadcrumb) {
  callOnHub("addBreadcrumb", breadcrumb);
}
function withScope(callback) {
  callOnHub("withScope", callback);
}
const anyMap = /* @__PURE__ */ new WeakMap();
const eventsMap = /* @__PURE__ */ new WeakMap();
const producersMap = /* @__PURE__ */ new WeakMap();
const anyProducer = Symbol("anyProducer");
const resolvedPromise = Promise.resolve();
const listenerAdded = Symbol("listenerAdded");
const listenerRemoved = Symbol("listenerRemoved");
function assertEventName(eventName) {
  if (typeof eventName !== "string" && typeof eventName !== "symbol") {
    throw new TypeError("eventName must be a string or a symbol");
  }
}
function assertListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError("listener must be a function");
  }
}
function getListeners(instance, eventName) {
  const events = eventsMap.get(instance);
  if (!events.has(eventName)) {
    events.set(eventName, /* @__PURE__ */ new Set());
  }
  return events.get(eventName);
}
function getEventProducers(instance, eventName) {
  const key = typeof eventName === "string" ? eventName : anyProducer;
  const producers = producersMap.get(instance);
  if (!producers.has(key)) {
    producers.set(key, /* @__PURE__ */ new Set());
  }
  return producers.get(key);
}
function enqueueProducers(instance, eventName, eventData) {
  const producers = producersMap.get(instance);
  if (producers.has(eventName)) {
    for (const producer of producers.get(eventName)) {
      producer.enqueue(eventData);
    }
  }
  if (producers.has(anyProducer)) {
    const item = Promise.all([eventName, eventData]);
    for (const producer of producers.get(anyProducer)) {
      producer.enqueue(item);
    }
  }
}
function iterator(instance, eventNames) {
  eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
  let isFinished = false;
  let flush = () => {
  };
  let queue = [];
  const producer = {
    enqueue(item) {
      queue.push(item);
      flush();
    },
    finish() {
      isFinished = true;
      flush();
    }
  };
  for (const eventName of eventNames) {
    getEventProducers(instance, eventName).add(producer);
  }
  return {
    async next() {
      if (!queue) {
        return { done: true };
      }
      if (queue.length === 0) {
        if (isFinished) {
          queue = void 0;
          return this.next();
        }
        await new Promise((resolve) => {
          flush = resolve;
        });
        return this.next();
      }
      return {
        done: false,
        value: await queue.shift()
      };
    },
    async return(value) {
      queue = void 0;
      for (const eventName of eventNames) {
        getEventProducers(instance, eventName).delete(producer);
      }
      flush();
      return arguments.length > 0 ? { done: true, value: await value } : { done: true };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function defaultMethodNamesOrAssert(methodNames) {
  if (methodNames === void 0) {
    return allEmitteryMethods;
  }
  if (!Array.isArray(methodNames)) {
    throw new TypeError("`methodNames` must be an array of strings");
  }
  for (const methodName of methodNames) {
    if (!allEmitteryMethods.includes(methodName)) {
      if (typeof methodName !== "string") {
        throw new TypeError("`methodNames` element must be a string");
      }
      throw new Error(`${methodName} is not Emittery method`);
    }
  }
  return methodNames;
}
const isListenerSymbol = (symbol) => symbol === listenerAdded || symbol === listenerRemoved;
class Emittery {
  static mixin(emitteryPropertyName, methodNames) {
    methodNames = defaultMethodNamesOrAssert(methodNames);
    return (target) => {
      if (typeof target !== "function") {
        throw new TypeError("`target` must be function");
      }
      for (const methodName of methodNames) {
        if (target.prototype[methodName] !== void 0) {
          throw new Error(`The property \`${methodName}\` already exists on \`target\``);
        }
      }
      function getEmitteryProperty() {
        Object.defineProperty(this, emitteryPropertyName, {
          enumerable: false,
          value: new Emittery()
        });
        return this[emitteryPropertyName];
      }
      Object.defineProperty(target.prototype, emitteryPropertyName, {
        enumerable: false,
        get: getEmitteryProperty
      });
      const emitteryMethodCaller = (methodName) => function(...args) {
        return this[emitteryPropertyName][methodName](...args);
      };
      for (const methodName of methodNames) {
        Object.defineProperty(target.prototype, methodName, {
          enumerable: false,
          value: emitteryMethodCaller(methodName)
        });
      }
      return target;
    };
  }
  constructor() {
    anyMap.set(this, /* @__PURE__ */ new Set());
    eventsMap.set(this, /* @__PURE__ */ new Map());
    producersMap.set(this, /* @__PURE__ */ new Map());
  }
  on(eventNames, listener) {
    assertListener(listener);
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
      getListeners(this, eventName).add(listener);
      if (!isListenerSymbol(eventName)) {
        this.emit(listenerAdded, { eventName, listener });
      }
    }
    return this.off.bind(this, eventNames, listener);
  }
  off(eventNames, listener) {
    assertListener(listener);
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
      getListeners(this, eventName).delete(listener);
      if (!isListenerSymbol(eventName)) {
        this.emit(listenerRemoved, { eventName, listener });
      }
    }
  }
  once(eventNames) {
    return new Promise((resolve) => {
      const off = this.on(eventNames, (data) => {
        off();
        resolve(data);
      });
    });
  }
  events(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      assertEventName(eventName);
    }
    return iterator(this, eventNames);
  }
  async emit(eventName, eventData) {
    assertEventName(eventName);
    enqueueProducers(this, eventName, eventData);
    const listeners = getListeners(this, eventName);
    const anyListeners = anyMap.get(this);
    const staticListeners = [...listeners];
    const staticAnyListeners = isListenerSymbol(eventName) ? [] : [...anyListeners];
    await resolvedPromise;
    await Promise.all([
      ...staticListeners.map(async (listener) => {
        if (listeners.has(listener)) {
          return listener(eventData);
        }
      }),
      ...staticAnyListeners.map(async (listener) => {
        if (anyListeners.has(listener)) {
          return listener(eventName, eventData);
        }
      })
    ]);
  }
  async emitSerial(eventName, eventData) {
    assertEventName(eventName);
    const listeners = getListeners(this, eventName);
    const anyListeners = anyMap.get(this);
    const staticListeners = [...listeners];
    const staticAnyListeners = [...anyListeners];
    await resolvedPromise;
    for (const listener of staticListeners) {
      if (listeners.has(listener)) {
        await listener(eventData);
      }
    }
    for (const listener of staticAnyListeners) {
      if (anyListeners.has(listener)) {
        await listener(eventName, eventData);
      }
    }
  }
  onAny(listener) {
    assertListener(listener);
    anyMap.get(this).add(listener);
    this.emit(listenerAdded, { listener });
    return this.offAny.bind(this, listener);
  }
  anyEvent() {
    return iterator(this);
  }
  offAny(listener) {
    assertListener(listener);
    this.emit(listenerRemoved, { listener });
    anyMap.get(this).delete(listener);
  }
  clearListeners(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    for (const eventName of eventNames) {
      if (typeof eventName === "string") {
        getListeners(this, eventName).clear();
        const producers = getEventProducers(this, eventName);
        for (const producer of producers) {
          producer.finish();
        }
        producers.clear();
      } else {
        anyMap.get(this).clear();
        for (const listeners of eventsMap.get(this).values()) {
          listeners.clear();
        }
        for (const producers of producersMap.get(this).values()) {
          for (const producer of producers) {
            producer.finish();
          }
          producers.clear();
        }
      }
    }
  }
  listenerCount(eventNames) {
    eventNames = Array.isArray(eventNames) ? eventNames : [eventNames];
    let count = 0;
    for (const eventName of eventNames) {
      if (typeof eventName === "string") {
        count += anyMap.get(this).size + getListeners(this, eventName).size + getEventProducers(this, eventName).size + getEventProducers(this).size;
        continue;
      }
      if (typeof eventName !== "undefined") {
        assertEventName(eventName);
      }
      count += anyMap.get(this).size;
      for (const value of eventsMap.get(this).values()) {
        count += value.size;
      }
      for (const value of producersMap.get(this).values()) {
        count += value.size;
      }
    }
    return count;
  }
  bindMethods(target, methodNames) {
    if (typeof target !== "object" || target === null) {
      throw new TypeError("`target` must be an object");
    }
    methodNames = defaultMethodNamesOrAssert(methodNames);
    for (const methodName of methodNames) {
      if (target[methodName] !== void 0) {
        throw new Error(`The property \`${methodName}\` already exists on \`target\``);
      }
      Object.defineProperty(target, methodName, {
        enumerable: false,
        value: this[methodName].bind(this)
      });
    }
  }
}
const allEmitteryMethods = Object.getOwnPropertyNames(Emittery.prototype).filter((v) => v !== "constructor");
Emittery.Typed = class extends Emittery {
};
Object.defineProperty(Emittery.Typed, "Typed", {
  enumerable: false,
  value: void 0
});
Object.defineProperty(Emittery, "listenerAdded", {
  value: listenerAdded,
  writable: false,
  enumerable: true,
  configurable: false
});
Object.defineProperty(Emittery, "listenerRemoved", {
  value: listenerRemoved,
  writable: false,
  enumerable: true,
  configurable: false
});
var emittery = Emittery;
const Emittery$1 = /* @__PURE__ */ getDefaultExportFromCjs(emittery);
const SHOW_DEBUG_MESSAGES_PROP = "showDebugMessages";
function createProxiedConsole() {
  let showDebugMessages = false;
  const proxyHandler = {
    get(target, prop, receiver) {
      if (prop === SHOW_DEBUG_MESSAGES_PROP) {
        return showDebugMessages;
      }
      if (!showDebugMessages) {
        return () => {
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(obj, prop, value) {
      if (prop === SHOW_DEBUG_MESSAGES_PROP) {
        showDebugMessages = value;
        return true;
      }
      return Reflect.set(obj, prop, value);
    }
  };
  return new Proxy(console, proxyHandler);
}
const debugConsole = createProxiedConsole();
var AuthenticatorType;
(function(AuthenticatorType2) {
  AuthenticatorType2[AuthenticatorType2["UNKNOWN"] = 0] = "UNKNOWN";
  AuthenticatorType2[AuthenticatorType2["PUSH"] = 1] = "PUSH";
  AuthenticatorType2[AuthenticatorType2["BACKUP_CODE"] = 2] = "BACKUP_CODE";
  AuthenticatorType2[AuthenticatorType2["BACKUP_OS"] = 3] = "BACKUP_OS";
  AuthenticatorType2[AuthenticatorType2["DUMMY"] = 4] = "DUMMY";
  AuthenticatorType2[AuthenticatorType2["ORGANIZATION_ADMIN"] = 5] = "ORGANIZATION_ADMIN";
  AuthenticatorType2[AuthenticatorType2["SESSION_UNLOCK"] = 6] = "SESSION_UNLOCK";
  AuthenticatorType2[AuthenticatorType2["WEBAUTHN"] = 7] = "WEBAUTHN";
  AuthenticatorType2[AuthenticatorType2["ORGANIZATION_SERVICE"] = 8] = "ORGANIZATION_SERVICE";
})(AuthenticatorType || (AuthenticatorType = {}));
proto3.util.setEnumType(AuthenticatorType, "domain.AuthenticatorType", [
  { no: 0, name: "AUTHENTICATOR_TYPE_UNKNOWN" },
  { no: 1, name: "AUTHENTICATOR_TYPE_PUSH" },
  { no: 2, name: "AUTHENTICATOR_TYPE_BACKUP_CODE" },
  { no: 3, name: "AUTHENTICATOR_TYPE_BACKUP_OS" },
  { no: 4, name: "AUTHENTICATOR_TYPE_DUMMY" },
  { no: 5, name: "AUTHENTICATOR_TYPE_ORGANIZATION_ADMIN" },
  { no: 6, name: "AUTHENTICATOR_TYPE_SESSION_UNLOCK" },
  { no: 7, name: "AUTHENTICATOR_TYPE_WEBAUTHN" },
  { no: 8, name: "AUTHENTICATOR_TYPE_ORGANIZATION_SERVICE" }
]);
var CredentialType;
(function(CredentialType2) {
  CredentialType2[CredentialType2["UNKNOWN"] = 0] = "UNKNOWN";
  CredentialType2[CredentialType2["SECURITY_KEY"] = 1] = "SECURITY_KEY";
  CredentialType2[CredentialType2["PASSKEY"] = 2] = "PASSKEY";
})(CredentialType || (CredentialType = {}));
proto3.util.setEnumType(CredentialType, "domain.CredentialType", [
  { no: 0, name: "CREDENTIAL_TYPE_UNKNOWN" },
  { no: 1, name: "CREDENTIAL_TYPE_SECURITY_KEY" },
  { no: 2, name: "CREDENTIAL_TYPE_PASSKEY" }
]);
var SessionType;
(function(SessionType2) {
  SessionType2[SessionType2["UNKNOWN"] = 0] = "UNKNOWN";
  SessionType2[SessionType2["SELF_UNLOCKING_PRIMARY"] = 1] = "SELF_UNLOCKING_PRIMARY";
  SessionType2[SessionType2["SELF_UNLOCKING_SECONDARY"] = 2] = "SELF_UNLOCKING_SECONDARY";
  SessionType2[SessionType2["BACKUP_OS"] = 3] = "BACKUP_OS";
  SessionType2[SessionType2["BACKUP_CODE"] = 4] = "BACKUP_CODE";
  SessionType2[SessionType2["CONNECTED"] = 5] = "CONNECTED";
})(SessionType || (SessionType = {}));
proto3.util.setEnumType(SessionType, "domain.SessionType", [
  { no: 0, name: "SESSION_TYPE_UNKNOWN" },
  { no: 1, name: "SESSION_TYPE_SELF_UNLOCKING_PRIMARY" },
  { no: 2, name: "SESSION_TYPE_SELF_UNLOCKING_SECONDARY" },
  { no: 3, name: "SESSION_TYPE_BACKUP_OS" },
  { no: 4, name: "SESSION_TYPE_BACKUP_CODE" },
  { no: 5, name: "SESSION_TYPE_CONNECTED" }
]);
var Achievement;
(function(Achievement2) {
  Achievement2[Achievement2["UNKNOWN"] = 0] = "UNKNOWN";
  Achievement2[Achievement2["BAE_REGISTER_ANDROID"] = 1] = "BAE_REGISTER_ANDROID";
  Achievement2[Achievement2["BAE_REGISTER_IOS"] = 2] = "BAE_REGISTER_IOS";
  Achievement2[Achievement2["BAE_REGISTER_WEB"] = 11] = "BAE_REGISTER_WEB";
  Achievement2[Achievement2["BAE_REGISTER_BAK"] = 12] = "BAE_REGISTER_BAK";
  Achievement2[Achievement2["BAE_INACTIVE_MARKED_FOR_DELETION"] = 3] = "BAE_INACTIVE_MARKED_FOR_DELETION";
  Achievement2[Achievement2["BAE_REACTIVATED"] = 4] = "BAE_REACTIVATED";
  Achievement2[Achievement2["BAE_ORG_ICON_FOUND"] = 5] = "BAE_ORG_ICON_FOUND";
  Achievement2[Achievement2["BAE_LOGIN_RECOVERY"] = 6] = "BAE_LOGIN_RECOVERY";
  Achievement2[Achievement2["BAE_LOGIN_BACKUP"] = 7] = "BAE_LOGIN_BACKUP";
  Achievement2[Achievement2["BAE_PRIVATE_PROFILE_DELETE"] = 8] = "BAE_PRIVATE_PROFILE_DELETE";
  Achievement2[Achievement2["BAE_LOGIN_INBOX_CREATE"] = 9] = "BAE_LOGIN_INBOX_CREATE";
  Achievement2[Achievement2["BAE_LOGIN_INBOX_MESSAGE"] = 10] = "BAE_LOGIN_INBOX_MESSAGE";
  Achievement2[Achievement2["AND_AUTOFILL_SETUP"] = 1e6] = "AND_AUTOFILL_SETUP";
  Achievement2[Achievement2["AND_AUTOFILL_ENABLE"] = 1000001] = "AND_AUTOFILL_ENABLE";
  Achievement2[Achievement2["AND_AUTOFILL_INSERT"] = 1000002] = "AND_AUTOFILL_INSERT";
  Achievement2[Achievement2["AND_AUTOFILL_UPDATE"] = 1000003] = "AND_AUTOFILL_UPDATE";
  Achievement2[Achievement2["AND_BACKUP_REGULAR"] = 1000100] = "AND_BACKUP_REGULAR";
  Achievement2[Achievement2["AND_BACKUP_E2E"] = 1000101] = "AND_BACKUP_E2E";
  Achievement2[Achievement2["AND_BACKUP_TRANSFER"] = 1000102] = "AND_BACKUP_TRANSFER";
  Achievement2[Achievement2["AND_REVIEW_CONDITIONS_FULFILLED"] = 1000200] = "AND_REVIEW_CONDITIONS_FULFILLED";
  Achievement2[Achievement2["AND_REVIEW_SHOWN"] = 1000201] = "AND_REVIEW_SHOWN";
  Achievement2[Achievement2["AND_REVIEW_STAYED_3_SECONDS"] = 1000202] = "AND_REVIEW_STAYED_3_SECONDS";
  Achievement2[Achievement2["AND_SCAN_CAMERA_REQUESTED"] = 1000300] = "AND_SCAN_CAMERA_REQUESTED";
  Achievement2[Achievement2["AND_SCAN_CAMERA_GRANTED"] = 1000301] = "AND_SCAN_CAMERA_GRANTED";
  Achievement2[Achievement2["AND_SCAN_SCANNED"] = 1000302] = "AND_SCAN_SCANNED";
  Achievement2[Achievement2["AND_SCAN_FROM_EXTERNAL"] = 1000303] = "AND_SCAN_FROM_EXTERNAL";
  Achievement2[Achievement2["AND_KEYSTORE_LOST_SHOWN_NO_BACKUP"] = 1000400] = "AND_KEYSTORE_LOST_SHOWN_NO_BACKUP";
  Achievement2[Achievement2["AND_KEYSTORE_LOST_SHOWN_BACKUP_AVAILABLE"] = 1000401] = "AND_KEYSTORE_LOST_SHOWN_BACKUP_AVAILABLE";
  Achievement2[Achievement2["AND_SECOND_FACTOR_ENFORCEMENT_GRANDFATHERED"] = 1000500] = "AND_SECOND_FACTOR_ENFORCEMENT_GRANDFATHERED";
  Achievement2[Achievement2["WEB_SESSION_CREATE"] = 2e6] = "WEB_SESSION_CREATE";
  Achievement2[Achievement2["WEB_SESSION_UNLOCK"] = 2000001] = "WEB_SESSION_UNLOCK";
  Achievement2[Achievement2["WEB_SESSION_PHONE"] = 2000010] = "WEB_SESSION_PHONE";
  Achievement2[Achievement2["WEB_SESSION_TABLET"] = 2000011] = "WEB_SESSION_TABLET";
  Achievement2[Achievement2["WEB_IMPORT_HEYLOGIN"] = 2000100] = "WEB_IMPORT_HEYLOGIN";
  Achievement2[Achievement2["WEB_IMPORT_BITWARDEN"] = 2000101] = "WEB_IMPORT_BITWARDEN";
  Achievement2[Achievement2["WEB_IMPORT_LASTPASS"] = 2000102] = "WEB_IMPORT_LASTPASS";
  Achievement2[Achievement2["WEB_IMPORT_CHROME"] = 2000103] = "WEB_IMPORT_CHROME";
  Achievement2[Achievement2["WEB_IMPORT_FIREFOX"] = 2000104] = "WEB_IMPORT_FIREFOX";
  Achievement2[Achievement2["WEB_IMPORT_DASHLANE"] = 2000105] = "WEB_IMPORT_DASHLANE";
  Achievement2[Achievement2["WEB_IMPORT_ONEPASSWORD"] = 2000106] = "WEB_IMPORT_ONEPASSWORD";
  Achievement2[Achievement2["WEB_IMPORT_KEEPASS"] = 2000107] = "WEB_IMPORT_KEEPASS";
  Achievement2[Achievement2["WEB_IMPORT_SAFARI"] = 2000108] = "WEB_IMPORT_SAFARI";
  Achievement2[Achievement2["WEB_IMPORT_NORDPASS"] = 2000109] = "WEB_IMPORT_NORDPASS";
  Achievement2[Achievement2["WEB_IMPORT_STICKYPASSWORD"] = 2000110] = "WEB_IMPORT_STICKYPASSWORD";
  Achievement2[Achievement2["WEB_IMPORT_CSV"] = 2000111] = "WEB_IMPORT_CSV";
  Achievement2[Achievement2["WEB_IMPORT_EXCEL"] = 2000112] = "WEB_IMPORT_EXCEL";
  Achievement2[Achievement2["WEB_IMPORT_ENPASS"] = 2000113] = "WEB_IMPORT_ENPASS";
  Achievement2[Achievement2["WEB_EXPORT"] = 2000200] = "WEB_EXPORT";
  Achievement2[Achievement2["WEB_LOGIN_ADD"] = 2000300] = "WEB_LOGIN_ADD";
  Achievement2[Achievement2["WEB_LOGIN_ADD_FIRST_MANUAL"] = 2000301] = "WEB_LOGIN_ADD_FIRST_MANUAL";
  Achievement2[Achievement2["WEB_USE_SEARCH_SHORTCUT"] = 2000302] = "WEB_USE_SEARCH_SHORTCUT";
  Achievement2[Achievement2["WEB_LOGIN_CREATE_SHARE_LINK"] = 2000303] = "WEB_LOGIN_CREATE_SHARE_LINK";
  Achievement2[Achievement2["WEB_PADDLE_SUBSCRIBE_OPENED"] = 2000400] = "WEB_PADDLE_SUBSCRIBE_OPENED";
  Achievement2[Achievement2["WEB_PADDLE_SUBSCRIBE_CLOSED"] = 2000401] = "WEB_PADDLE_SUBSCRIBE_CLOSED";
  Achievement2[Achievement2["WEB_PADDLE_SUBSCRIBE_COMPLETED"] = 2000402] = "WEB_PADDLE_SUBSCRIBE_COMPLETED";
  Achievement2[Achievement2["WEB_PADDLE_MANAGE_OPENED"] = 2000420] = "WEB_PADDLE_MANAGE_OPENED";
  Achievement2[Achievement2["WEB_PADDLE_MANAGE_CLOSED"] = 2000421] = "WEB_PADDLE_MANAGE_CLOSED";
  Achievement2[Achievement2["WEB_PADDLE_MANAGE_COMPLETED"] = 2000422] = "WEB_PADDLE_MANAGE_COMPLETED";
  Achievement2[Achievement2["WEB_ORGANIZATION_CREATE"] = 2000500] = "WEB_ORGANIZATION_CREATE";
  Achievement2[Achievement2["WEB_ORGANIZATION_JOIN"] = 2000501] = "WEB_ORGANIZATION_JOIN";
  Achievement2[Achievement2["WEB_ORGANIZATION_ADMIN_ACCESS_PERSONAL"] = 2000502] = "WEB_ORGANIZATION_ADMIN_ACCESS_PERSONAL";
  Achievement2[Achievement2["WEB_ORGANIZATION_USER_ADD_EXISTING"] = 2000510] = "WEB_ORGANIZATION_USER_ADD_EXISTING";
  Achievement2[Achievement2["WEB_ORGANIZATION_USER_REMOVE_EXISTING"] = 2000511] = "WEB_ORGANIZATION_USER_REMOVE_EXISTING";
  Achievement2[Achievement2["WEB_ORGANIZATION_USER_ADD_NEW"] = 2000512] = "WEB_ORGANIZATION_USER_ADD_NEW";
  Achievement2[Achievement2["WEB_ORGANIZATION_USER_REMOVE_NEW"] = 2000513] = "WEB_ORGANIZATION_USER_REMOVE_NEW";
  Achievement2[Achievement2["WEB_ORGANIZATION_USER_CHANGE_ACCESS_LEVEL"] = 2000514] = "WEB_ORGANIZATION_USER_CHANGE_ACCESS_LEVEL";
  Achievement2[Achievement2["WEB_ORGANIZATION_TEAM_CREATE"] = 2000520] = "WEB_ORGANIZATION_TEAM_CREATE";
  Achievement2[Achievement2["EXT_INSTALL"] = 3e6] = "EXT_INSTALL";
  Achievement2[Achievement2["EXT_DISABLE_FOR_PAGE"] = 3000001] = "EXT_DISABLE_FOR_PAGE";
  Achievement2[Achievement2["EXT_REPORT_PAGE"] = 3000002] = "EXT_REPORT_PAGE";
  Achievement2[Achievement2["EXT_LOGIN_INSERT"] = 3000100] = "EXT_LOGIN_INSERT";
  Achievement2[Achievement2["EXT_LOGIN_UPDATE"] = 3000101] = "EXT_LOGIN_UPDATE";
  Achievement2[Achievement2["EXT_AUTOSNATCH_FROM_LOGIN"] = 3000110] = "EXT_AUTOSNATCH_FROM_LOGIN";
  Achievement2[Achievement2["EXT_AUTOSNATCH_FROM_REGISTRATION"] = 3000111] = "EXT_AUTOSNATCH_FROM_REGISTRATION";
  Achievement2[Achievement2["EXT_OVERLAY_LOGIN"] = 3000200] = "EXT_OVERLAY_LOGIN";
  Achievement2[Achievement2["EXT_OVERLAY_UNLOCK"] = 3000201] = "EXT_OVERLAY_UNLOCK";
  Achievement2[Achievement2["EXT_OVERLAY_UPDATE_GENERATED_PASSWORD"] = 3000204] = "EXT_OVERLAY_UPDATE_GENERATED_PASSWORD";
  Achievement2[Achievement2["EXT_OVERLAY_DISABLE_AUTOSNATCH"] = 3000004] = "EXT_OVERLAY_DISABLE_AUTOSNATCH";
  Achievement2[Achievement2["EXT_OVERLAY_SAW_NAG_SCREEN"] = 3000005] = "EXT_OVERLAY_SAW_NAG_SCREEN";
  Achievement2[Achievement2["EXT_POPUP_OPEN"] = 3000300] = "EXT_POPUP_OPEN";
  Achievement2[Achievement2["EXT_POPUP_UNLOCK"] = 3000301] = "EXT_POPUP_UNLOCK";
  Achievement2[Achievement2["EXT_POPUP_DISABLE_AUTOSNATCH"] = 3000003] = "EXT_POPUP_DISABLE_AUTOSNATCH";
  Achievement2[Achievement2["EXT_OMNIBOX_INPUT_CHANGED"] = 3000400] = "EXT_OMNIBOX_INPUT_CHANGED";
  Achievement2[Achievement2["EXT_OMNIBOX_INPUT_ENTERED"] = 3000401] = "EXT_OMNIBOX_INPUT_ENTERED";
  Achievement2[Achievement2["EXT_CONTEXT_MENU_HEYLOGIN_ENABLED"] = 3000500] = "EXT_CONTEXT_MENU_HEYLOGIN_ENABLED";
  Achievement2[Achievement2["EXT_CONTEXT_MENU_USERNAME_FILLED"] = 3000510] = "EXT_CONTEXT_MENU_USERNAME_FILLED";
  Achievement2[Achievement2["EXT_CONTEXT_MENU_PASSWORD_FILLED"] = 3000511] = "EXT_CONTEXT_MENU_PASSWORD_FILLED";
  Achievement2[Achievement2["EXT_CONTEXT_MENU_CUSTOM_TOTP_FILLED"] = 3000512] = "EXT_CONTEXT_MENU_CUSTOM_TOTP_FILLED";
  Achievement2[Achievement2["EXT_CONTEXT_MENU_CUSTOM_PLAIN_FILLED"] = 3000513] = "EXT_CONTEXT_MENU_CUSTOM_PLAIN_FILLED";
  Achievement2[Achievement2["EXT_CONTEXT_MENU_CUSTOM_PROTECTED_FILLED"] = 3000514] = "EXT_CONTEXT_MENU_CUSTOM_PROTECTED_FILLED";
  Achievement2[Achievement2["EXT_GLOBAL_SEARCH_OPEN"] = 3000600] = "EXT_GLOBAL_SEARCH_OPEN";
  Achievement2[Achievement2["EXT_GLOBAL_SEARCH_UNLOCK"] = 3000601] = "EXT_GLOBAL_SEARCH_UNLOCK";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_1"] = 4e6] = "COR_LOGINS_TOTAL_1";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_2"] = 4000001] = "COR_LOGINS_TOTAL_2";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_4"] = 4000002] = "COR_LOGINS_TOTAL_4";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_8"] = 4000003] = "COR_LOGINS_TOTAL_8";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_16"] = 4000004] = "COR_LOGINS_TOTAL_16";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_32"] = 4000005] = "COR_LOGINS_TOTAL_32";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_64"] = 4000006] = "COR_LOGINS_TOTAL_64";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_128"] = 4000007] = "COR_LOGINS_TOTAL_128";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_256"] = 4000008] = "COR_LOGINS_TOTAL_256";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_512"] = 4000009] = "COR_LOGINS_TOTAL_512";
  Achievement2[Achievement2["COR_LOGINS_TOTAL_1024"] = 4000010] = "COR_LOGINS_TOTAL_1024";
  Achievement2[Achievement2["COR_STORE_BACKUP_CODE_META_VAULT"] = 4000011] = "COR_STORE_BACKUP_CODE_META_VAULT";
  Achievement2[Achievement2["COR_LINKED_LOGIN_CREATE_PERSONAL"] = 4000012] = "COR_LINKED_LOGIN_CREATE_PERSONAL";
  Achievement2[Achievement2["COR_LINKED_LOGIN_CREATE_TEAM"] = 4000013] = "COR_LINKED_LOGIN_CREATE_TEAM";
  Achievement2[Achievement2["IOS_AUTOFILL_GUIDE_SETUP"] = 5e6] = "IOS_AUTOFILL_GUIDE_SETUP";
  Achievement2[Achievement2["IOS_AUTOFILL_ENABLE"] = 5000001] = "IOS_AUTOFILL_ENABLE";
  Achievement2[Achievement2["IOS_SECOND_FACTOR_ENFORCEMENT_GRANDFATHERED"] = 5000100] = "IOS_SECOND_FACTOR_ENFORCEMENT_GRANDFATHERED";
})(Achievement || (Achievement = {}));
proto3.util.setEnumType(Achievement, "domain.Achievement", [
  { no: 0, name: "UNKNOWN" },
  { no: 1, name: "BAE_REGISTER_ANDROID" },
  { no: 2, name: "BAE_REGISTER_IOS" },
  { no: 11, name: "BAE_REGISTER_WEB" },
  { no: 12, name: "BAE_REGISTER_BAK" },
  { no: 3, name: "BAE_INACTIVE_MARKED_FOR_DELETION" },
  { no: 4, name: "BAE_REACTIVATED" },
  { no: 5, name: "BAE_ORG_ICON_FOUND" },
  { no: 6, name: "BAE_LOGIN_RECOVERY" },
  { no: 7, name: "BAE_LOGIN_BACKUP" },
  { no: 8, name: "BAE_PRIVATE_PROFILE_DELETE" },
  { no: 9, name: "BAE_LOGIN_INBOX_CREATE" },
  { no: 10, name: "BAE_LOGIN_INBOX_MESSAGE" },
  { no: 1e6, name: "AND_AUTOFILL_SETUP" },
  { no: 1000001, name: "AND_AUTOFILL_ENABLE" },
  { no: 1000002, name: "AND_AUTOFILL_INSERT" },
  { no: 1000003, name: "AND_AUTOFILL_UPDATE" },
  { no: 1000100, name: "AND_BACKUP_REGULAR" },
  { no: 1000101, name: "AND_BACKUP_E2E" },
  { no: 1000102, name: "AND_BACKUP_TRANSFER" },
  { no: 1000200, name: "AND_REVIEW_CONDITIONS_FULFILLED" },
  { no: 1000201, name: "AND_REVIEW_SHOWN" },
  { no: 1000202, name: "AND_REVIEW_STAYED_3_SECONDS" },
  { no: 1000300, name: "AND_SCAN_CAMERA_REQUESTED" },
  { no: 1000301, name: "AND_SCAN_CAMERA_GRANTED" },
  { no: 1000302, name: "AND_SCAN_SCANNED" },
  { no: 1000303, name: "AND_SCAN_FROM_EXTERNAL" },
  { no: 1000400, name: "AND_KEYSTORE_LOST_SHOWN_NO_BACKUP" },
  { no: 1000401, name: "AND_KEYSTORE_LOST_SHOWN_BACKUP_AVAILABLE" },
  { no: 1000500, name: "AND_SECOND_FACTOR_ENFORCEMENT_GRANDFATHERED" },
  { no: 2e6, name: "WEB_SESSION_CREATE" },
  { no: 2000001, name: "WEB_SESSION_UNLOCK" },
  { no: 2000010, name: "WEB_SESSION_PHONE" },
  { no: 2000011, name: "WEB_SESSION_TABLET" },
  { no: 2000100, name: "WEB_IMPORT_HEYLOGIN" },
  { no: 2000101, name: "WEB_IMPORT_BITWARDEN" },
  { no: 2000102, name: "WEB_IMPORT_LASTPASS" },
  { no: 2000103, name: "WEB_IMPORT_CHROME" },
  { no: 2000104, name: "WEB_IMPORT_FIREFOX" },
  { no: 2000105, name: "WEB_IMPORT_DASHLANE" },
  { no: 2000106, name: "WEB_IMPORT_ONEPASSWORD" },
  { no: 2000107, name: "WEB_IMPORT_KEEPASS" },
  { no: 2000108, name: "WEB_IMPORT_SAFARI" },
  { no: 2000109, name: "WEB_IMPORT_NORDPASS" },
  { no: 2000110, name: "WEB_IMPORT_STICKYPASSWORD" },
  { no: 2000111, name: "WEB_IMPORT_CSV" },
  { no: 2000112, name: "WEB_IMPORT_EXCEL" },
  { no: 2000113, name: "WEB_IMPORT_ENPASS" },
  { no: 2000200, name: "WEB_EXPORT" },
  { no: 2000300, name: "WEB_LOGIN_ADD" },
  { no: 2000301, name: "WEB_LOGIN_ADD_FIRST_MANUAL" },
  { no: 2000302, name: "WEB_USE_SEARCH_SHORTCUT" },
  { no: 2000303, name: "WEB_LOGIN_CREATE_SHARE_LINK" },
  { no: 2000400, name: "WEB_PADDLE_SUBSCRIBE_OPENED" },
  { no: 2000401, name: "WEB_PADDLE_SUBSCRIBE_CLOSED" },
  { no: 2000402, name: "WEB_PADDLE_SUBSCRIBE_COMPLETED" },
  { no: 2000420, name: "WEB_PADDLE_MANAGE_OPENED" },
  { no: 2000421, name: "WEB_PADDLE_MANAGE_CLOSED" },
  { no: 2000422, name: "WEB_PADDLE_MANAGE_COMPLETED" },
  { no: 2000500, name: "WEB_ORGANIZATION_CREATE" },
  { no: 2000501, name: "WEB_ORGANIZATION_JOIN" },
  { no: 2000502, name: "WEB_ORGANIZATION_ADMIN_ACCESS_PERSONAL" },
  { no: 2000510, name: "WEB_ORGANIZATION_USER_ADD_EXISTING" },
  { no: 2000511, name: "WEB_ORGANIZATION_USER_REMOVE_EXISTING" },
  { no: 2000512, name: "WEB_ORGANIZATION_USER_ADD_NEW" },
  { no: 2000513, name: "WEB_ORGANIZATION_USER_REMOVE_NEW" },
  { no: 2000514, name: "WEB_ORGANIZATION_USER_CHANGE_ACCESS_LEVEL" },
  { no: 2000520, name: "WEB_ORGANIZATION_TEAM_CREATE" },
  { no: 3e6, name: "EXT_INSTALL" },
  { no: 3000001, name: "EXT_DISABLE_FOR_PAGE" },
  { no: 3000002, name: "EXT_REPORT_PAGE" },
  { no: 3000100, name: "EXT_LOGIN_INSERT" },
  { no: 3000101, name: "EXT_LOGIN_UPDATE" },
  { no: 3000110, name: "EXT_AUTOSNATCH_FROM_LOGIN" },
  { no: 3000111, name: "EXT_AUTOSNATCH_FROM_REGISTRATION" },
  { no: 3000200, name: "EXT_OVERLAY_LOGIN" },
  { no: 3000201, name: "EXT_OVERLAY_UNLOCK" },
  { no: 3000204, name: "EXT_OVERLAY_UPDATE_GENERATED_PASSWORD" },
  { no: 3000004, name: "EXT_OVERLAY_DISABLE_AUTOSNATCH" },
  { no: 3000005, name: "EXT_OVERLAY_SAW_NAG_SCREEN" },
  { no: 3000300, name: "EXT_POPUP_OPEN" },
  { no: 3000301, name: "EXT_POPUP_UNLOCK" },
  { no: 3000003, name: "EXT_POPUP_DISABLE_AUTOSNATCH" },
  { no: 3000400, name: "EXT_OMNIBOX_INPUT_CHANGED" },
  { no: 3000401, name: "EXT_OMNIBOX_INPUT_ENTERED" },
  { no: 3000500, name: "EXT_CONTEXT_MENU_HEYLOGIN_ENABLED" },
  { no: 3000510, name: "EXT_CONTEXT_MENU_USERNAME_FILLED" },
  { no: 3000511, name: "EXT_CONTEXT_MENU_PASSWORD_FILLED" },
  { no: 3000512, name: "EXT_CONTEXT_MENU_CUSTOM_TOTP_FILLED" },
  { no: 3000513, name: "EXT_CONTEXT_MENU_CUSTOM_PLAIN_FILLED" },
  { no: 3000514, name: "EXT_CONTEXT_MENU_CUSTOM_PROTECTED_FILLED" },
  { no: 3000600, name: "EXT_GLOBAL_SEARCH_OPEN" },
  { no: 3000601, name: "EXT_GLOBAL_SEARCH_UNLOCK" },
  { no: 4e6, name: "COR_LOGINS_TOTAL_1" },
  { no: 4000001, name: "COR_LOGINS_TOTAL_2" },
  { no: 4000002, name: "COR_LOGINS_TOTAL_4" },
  { no: 4000003, name: "COR_LOGINS_TOTAL_8" },
  { no: 4000004, name: "COR_LOGINS_TOTAL_16" },
  { no: 4000005, name: "COR_LOGINS_TOTAL_32" },
  { no: 4000006, name: "COR_LOGINS_TOTAL_64" },
  { no: 4000007, name: "COR_LOGINS_TOTAL_128" },
  { no: 4000008, name: "COR_LOGINS_TOTAL_256" },
  { no: 4000009, name: "COR_LOGINS_TOTAL_512" },
  { no: 4000010, name: "COR_LOGINS_TOTAL_1024" },
  { no: 4000011, name: "COR_STORE_BACKUP_CODE_META_VAULT" },
  { no: 4000012, name: "COR_LINKED_LOGIN_CREATE_PERSONAL" },
  { no: 4000013, name: "COR_LINKED_LOGIN_CREATE_TEAM" },
  { no: 5e6, name: "IOS_AUTOFILL_GUIDE_SETUP" },
  { no: 5000001, name: "IOS_AUTOFILL_ENABLE" },
  { no: 5000100, name: "IOS_SECOND_FACTOR_ENFORCEMENT_GRANDFATHERED" }
]);
class UnlockTimeLimit extends Message {
  constructor(data) {
    super();
    this.enabled = false;
    this.minutes = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UnlockTimeLimit().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UnlockTimeLimit().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UnlockTimeLimit().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UnlockTimeLimit, a, b);
  }
}
UnlockTimeLimit.runtime = proto3;
UnlockTimeLimit.typeName = "domain.UnlockTimeLimit";
UnlockTimeLimit.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "minutes",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]);
var VaultType;
(function(VaultType2) {
  VaultType2[VaultType2["UNKNOWN"] = 0] = "UNKNOWN";
  VaultType2[VaultType2["META"] = 1] = "META";
  VaultType2[VaultType2["PRIVATE"] = 2] = "PRIVATE";
  VaultType2[VaultType2["TEAM"] = 3] = "TEAM";
  VaultType2[VaultType2["TEAM_META"] = 4] = "TEAM_META";
  VaultType2[VaultType2["LEGACY_ORGANIZATION_ADMIN"] = 5] = "LEGACY_ORGANIZATION_ADMIN";
  VaultType2[VaultType2["ORGANIZATION_PERSONAL"] = 6] = "ORGANIZATION_PERSONAL";
  VaultType2[VaultType2["INBOX"] = 7] = "INBOX";
  VaultType2[VaultType2["INBOX_META"] = 8] = "INBOX_META";
  VaultType2[VaultType2["ORGANIZATION_ADMIN"] = 9] = "ORGANIZATION_ADMIN";
})(VaultType || (VaultType = {}));
proto3.util.setEnumType(VaultType, "domain.VaultType", [
  { no: 0, name: "VAULT_TYPE_UNKNOWN" },
  { no: 1, name: "VAULT_TYPE_META" },
  { no: 2, name: "VAULT_TYPE_PRIVATE" },
  { no: 3, name: "VAULT_TYPE_TEAM" },
  { no: 4, name: "VAULT_TYPE_TEAM_META" },
  { no: 5, name: "VAULT_TYPE_LEGACY_ORGANIZATION_ADMIN" },
  { no: 6, name: "VAULT_TYPE_ORGANIZATION_PERSONAL" },
  { no: 7, name: "VAULT_TYPE_INBOX" },
  { no: 8, name: "VAULT_TYPE_INBOX_META" },
  { no: 9, name: "VAULT_TYPE_ORGANIZATION_ADMIN" }
]);
var WebauthnPrfSupportStatus;
(function(WebauthnPrfSupportStatus2) {
  WebauthnPrfSupportStatus2[WebauthnPrfSupportStatus2["UNKNOWN"] = 0] = "UNKNOWN";
  WebauthnPrfSupportStatus2[WebauthnPrfSupportStatus2["UNAVAILABLE"] = 1] = "UNAVAILABLE";
  WebauthnPrfSupportStatus2[WebauthnPrfSupportStatus2["AVAILABLE"] = 2] = "AVAILABLE";
})(WebauthnPrfSupportStatus || (WebauthnPrfSupportStatus = {}));
proto3.util.setEnumType(WebauthnPrfSupportStatus, "domain.WebauthnPrfSupportStatus", [
  { no: 0, name: "WEBAUTHN_PRF_SUPPORT_STATUS_UNKNOWN" },
  { no: 1, name: "WEBAUTHN_PRF_SUPPORT_STATUS_UNAVAILABLE" },
  { no: 2, name: "WEBAUTHN_PRF_SUPPORT_STATUS_AVAILABLE" }
]);
var OrganizationType;
(function(OrganizationType2) {
  OrganizationType2[OrganizationType2["UNKNOWN"] = 0] = "UNKNOWN";
  OrganizationType2[OrganizationType2["COMPANY"] = 1] = "COMPANY";
})(OrganizationType || (OrganizationType = {}));
proto3.util.setEnumType(OrganizationType, "domain.OrganizationType", [
  { no: 0, name: "ORGANIZATION_TYPE_UNKNOWN" },
  { no: 1, name: "ORGANIZATION_TYPE_COMPANY" }
]);
class VaultAuthenticatorLock extends Message {
  constructor(data) {
    super();
    this.authenticatorId = "";
    this.encryptedStorableVaultKey = new Uint8Array(0);
    this.encryptedHighSecurityVaultKey = new Uint8Array(0);
    this.encryptedVaultMessagePrivateKey = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VaultAuthenticatorLock().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VaultAuthenticatorLock().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VaultAuthenticatorLock().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VaultAuthenticatorLock, a, b);
  }
}
VaultAuthenticatorLock.runtime = proto3;
VaultAuthenticatorLock.typeName = "domain.VaultAuthenticatorLock";
VaultAuthenticatorLock.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "encrypted_storable_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 3,
    name: "encrypted_high_security_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "encrypted_vault_message_private_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class VaultProfileLock extends Message {
  constructor(data) {
    super();
    this.lockingProfileId = "";
    this.lockingProfileKeyGenerationId = "";
    this.encryptedStorableVaultKey = new Uint8Array(0);
    this.encryptedHighSecurityVaultKey = new Uint8Array(0);
    this.encryptedVaultMessagePrivateKey = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VaultProfileLock().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VaultProfileLock().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VaultProfileLock().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VaultProfileLock, a, b);
  }
}
VaultProfileLock.runtime = proto3;
VaultProfileLock.typeName = "domain.VaultProfileLock";
VaultProfileLock.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "locking_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "locking_profile_key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "encrypted_storable_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "encrypted_high_security_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 5,
    name: "encrypted_vault_message_private_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ProfileAuthenticatorLock extends Message {
  constructor(data) {
    super();
    this.authenticatorId = "";
    this.encryptedHighSecurityProfileSeed = new Uint8Array(0);
    this.encryptedStorableProfileSeed = new Uint8Array(0);
    this.profileId = "";
    this.profileKeyGenerationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ProfileAuthenticatorLock().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ProfileAuthenticatorLock().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ProfileAuthenticatorLock().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ProfileAuthenticatorLock, a, b);
  }
}
ProfileAuthenticatorLock.runtime = proto3;
ProfileAuthenticatorLock.typeName = "domain.ProfileAuthenticatorLock";
ProfileAuthenticatorLock.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "encrypted_high_security_profile_seed",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 3,
    name: "encrypted_storable_profile_seed",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "profile_key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class VaultLockCreationData extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.generationId = "";
    this.associatedVaultId = "";
    this.associatedGenerationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VaultLockCreationData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VaultLockCreationData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VaultLockCreationData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VaultLockCreationData, a, b);
  }
}
VaultLockCreationData.runtime = proto3;
VaultLockCreationData.typeName = "domain.VaultLockCreationData";
VaultLockCreationData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "lock", kind: "message", T: VaultProfileLock },
  {
    no: 4,
    name: "associated_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "associated_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 6, name: "associated_lock", kind: "message", T: VaultProfileLock }
]);
class ProfileProfileLock extends Message {
  constructor(data) {
    super();
    this.lockingProfileId = "";
    this.lockingProfileKeyGenerationId = "";
    this.encryptedHighSecurityProfileSeed = new Uint8Array(0);
    this.encryptedStorableProfileSeed = new Uint8Array(0);
    this.profileId = "";
    this.profileKeyGenerationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ProfileProfileLock().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ProfileProfileLock().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ProfileProfileLock().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ProfileProfileLock, a, b);
  }
}
ProfileProfileLock.runtime = proto3;
ProfileProfileLock.typeName = "domain.ProfileProfileLock";
ProfileProfileLock.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "locking_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "locking_profile_key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "encrypted_high_security_profile_seed",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "encrypted_storable_profile_seed",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 5,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "profile_key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class AuthenticatorData extends Message {
  constructor(data) {
    super();
    this.authenticatorType = AuthenticatorType.UNKNOWN;
    this.highSecurityLoginSigPubKey = new Uint8Array(0);
    this.highSecurityIdentitySigPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.storableSigPubKey = new Uint8Array(0);
    this.storableSigPubKeySignature = new Uint8Array(0);
    this.storableVaultKeyEncPubKey = new Uint8Array(0);
    this.storableVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.secretInfo = "";
    this.secretSalt = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AuthenticatorData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AuthenticatorData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AuthenticatorData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AuthenticatorData, a, b);
  }
}
AuthenticatorData.runtime = proto3;
AuthenticatorData.typeName = "domain.AuthenticatorData";
AuthenticatorData.fields = proto3.util.newFieldList(() => [
  { no: 12, name: "authenticator_type", kind: "enum", T: proto3.getEnumType(AuthenticatorType) },
  {
    no: 2,
    name: "high_security_login_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 3,
    name: "high_security_identity_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "high_security_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 5,
    name: "high_security_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 6,
    name: "storable_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 7,
    name: "storable_sig_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 8,
    name: "storable_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 9,
    name: "storable_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 10,
    name: "secret_info",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 11,
    name: "secret_salt",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 13, name: "webauthn", kind: "message", T: AuthenticatorData_Webauthn }
]);
class AuthenticatorData_Webauthn extends Message {
  constructor(data) {
    super();
    this.webauthnId = "";
    this.prfSalt = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AuthenticatorData_Webauthn().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AuthenticatorData_Webauthn().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AuthenticatorData_Webauthn().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AuthenticatorData_Webauthn, a, b);
  }
}
AuthenticatorData_Webauthn.runtime = proto3;
AuthenticatorData_Webauthn.typeName = "domain.AuthenticatorData.Webauthn";
AuthenticatorData_Webauthn.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "webauthn_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "prf_salt",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class AuthenticatorCreationData extends Message {
  constructor(data) {
    super();
    this.profileLocks = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AuthenticatorCreationData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AuthenticatorCreationData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AuthenticatorCreationData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AuthenticatorCreationData, a, b);
  }
}
AuthenticatorCreationData.runtime = proto3;
AuthenticatorCreationData.typeName = "domain.AuthenticatorCreationData";
AuthenticatorCreationData.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "data", kind: "message", T: AuthenticatorData },
  { no: 2, name: "profile_locks", kind: "message", T: ProfileAuthenticatorLock, repeated: true },
  { no: 3, name: "webauthn", kind: "message", T: AuthenticatorCreationData_WebauthnAuthenticatorCreationData }
]);
class AuthenticatorCreationData_WebauthnAuthenticatorCreationData extends Message {
  constructor(data) {
    super();
    this.webauthnId = "";
    this.prfSalt = new Uint8Array(0);
    this.prfSupportStatus = WebauthnPrfSupportStatus.UNKNOWN;
    this.registerRequestId = "";
    this.responseJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AuthenticatorCreationData_WebauthnAuthenticatorCreationData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AuthenticatorCreationData_WebauthnAuthenticatorCreationData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AuthenticatorCreationData_WebauthnAuthenticatorCreationData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AuthenticatorCreationData_WebauthnAuthenticatorCreationData, a, b);
  }
}
AuthenticatorCreationData_WebauthnAuthenticatorCreationData.runtime = proto3;
AuthenticatorCreationData_WebauthnAuthenticatorCreationData.typeName = "domain.AuthenticatorCreationData.WebauthnAuthenticatorCreationData";
AuthenticatorCreationData_WebauthnAuthenticatorCreationData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "webauthn_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "prf_salt",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 3, name: "prf_support_status", kind: "enum", T: proto3.getEnumType(WebauthnPrfSupportStatus) },
  {
    no: 4,
    name: "register_request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "response_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class Authenticator extends Message {
  constructor(data) {
    super();
    this.id = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new Authenticator().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Authenticator().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Authenticator().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Authenticator, a, b);
  }
}
Authenticator.runtime = proto3;
Authenticator.typeName = "domain.Authenticator";
Authenticator.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "data", kind: "message", T: AuthenticatorData }
]);
class AuthenticatorBlock extends Message {
  constructor(data) {
    super();
    this.blob = new Uint8Array(0);
    this.signature = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AuthenticatorBlock().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AuthenticatorBlock().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AuthenticatorBlock().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AuthenticatorBlock, a, b);
  }
}
AuthenticatorBlock.runtime = proto3;
AuthenticatorBlock.typeName = "domain.AuthenticatorBlock";
AuthenticatorBlock.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "blob",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 2,
    name: "signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
var LicenseType;
(function(LicenseType2) {
  LicenseType2[LicenseType2["UNKNOWN"] = 0] = "UNKNOWN";
  LicenseType2[LicenseType2["NONE"] = 1] = "NONE";
  LicenseType2[LicenseType2["COUPON"] = 2] = "COUPON";
  LicenseType2[LicenseType2["PADDLE"] = 3] = "PADDLE";
  LicenseType2[LicenseType2["NONPROFIT"] = 4] = "NONPROFIT";
  LicenseType2[LicenseType2["CONTRACT"] = 5] = "CONTRACT";
  LicenseType2[LicenseType2["CUSTOM"] = 6] = "CUSTOM";
  LicenseType2[LicenseType2["MSP"] = 7] = "MSP";
  LicenseType2[LicenseType2["EXAMPLE"] = 8] = "EXAMPLE";
})(LicenseType || (LicenseType = {}));
proto3.util.setEnumType(LicenseType, "domain.LicenseType", [
  { no: 0, name: "LICENSE_TYPE_UNKNOWN" },
  { no: 1, name: "LICENSE_TYPE_NONE" },
  { no: 2, name: "LICENSE_TYPE_COUPON" },
  { no: 3, name: "LICENSE_TYPE_PADDLE" },
  { no: 4, name: "LICENSE_TYPE_NONPROFIT" },
  { no: 5, name: "LICENSE_TYPE_CONTRACT" },
  { no: 6, name: "LICENSE_TYPE_CUSTOM" },
  { no: 7, name: "LICENSE_TYPE_MSP" },
  { no: 8, name: "LICENSE_TYPE_EXAMPLE" }
]);
var PrimaryLoginDevice;
(function(PrimaryLoginDevice2) {
  PrimaryLoginDevice2[PrimaryLoginDevice2["UNKNOWN"] = 0] = "UNKNOWN";
  PrimaryLoginDevice2[PrimaryLoginDevice2["NONE"] = 1] = "NONE";
  PrimaryLoginDevice2[PrimaryLoginDevice2["PHONE"] = 2] = "PHONE";
  PrimaryLoginDevice2[PrimaryLoginDevice2["SECURITY_KEY"] = 3] = "SECURITY_KEY";
  PrimaryLoginDevice2[PrimaryLoginDevice2["SERVICE"] = 4] = "SERVICE";
})(PrimaryLoginDevice || (PrimaryLoginDevice = {}));
proto3.util.setEnumType(PrimaryLoginDevice, "domain.PrimaryLoginDevice", [
  { no: 0, name: "PRIMARY_LOGIN_DEVICE_UNKNOWN" },
  { no: 1, name: "PRIMARY_LOGIN_DEVICE_NONE" },
  { no: 2, name: "PRIMARY_LOGIN_DEVICE_PHONE" },
  { no: 3, name: "PRIMARY_LOGIN_DEVICE_SECURITY_KEY" },
  { no: 4, name: "PRIMARY_LOGIN_DEVICE_SERVICE" }
]);
var ProfileType;
(function(ProfileType2) {
  ProfileType2[ProfileType2["UNKNOWN"] = 0] = "UNKNOWN";
  ProfileType2[ProfileType2["PREFERENCES"] = 1] = "PREFERENCES";
  ProfileType2[ProfileType2["INBOX"] = 2] = "INBOX";
  ProfileType2[ProfileType2["PRIVATE"] = 3] = "PRIVATE";
  ProfileType2[ProfileType2["ORGANIZATION"] = 4] = "ORGANIZATION";
  ProfileType2[ProfileType2["ORGANIZATION_ADMIN"] = 5] = "ORGANIZATION_ADMIN";
  ProfileType2[ProfileType2["ORGANIZATION_SERVICE"] = 6] = "ORGANIZATION_SERVICE";
})(ProfileType || (ProfileType = {}));
proto3.util.setEnumType(ProfileType, "domain.ProfileType", [
  { no: 0, name: "PROFILE_TYPE_UNKNOWN" },
  { no: 1, name: "PROFILE_TYPE_PREFERENCES" },
  { no: 2, name: "PROFILE_TYPE_INBOX" },
  { no: 3, name: "PROFILE_TYPE_PRIVATE" },
  { no: 4, name: "PROFILE_TYPE_ORGANIZATION" },
  { no: 5, name: "PROFILE_TYPE_ORGANIZATION_ADMIN" },
  { no: 6, name: "PROFILE_TYPE_ORGANIZATION_SERVICE" }
]);
var MaintenanceTask;
(function(MaintenanceTask2) {
  MaintenanceTask2[MaintenanceTask2["UNKNOWN"] = 0] = "UNKNOWN";
  MaintenanceTask2[MaintenanceTask2["TEAM_SYNC_ORGANIZATION_MEMBERS_V2"] = 9] = "TEAM_SYNC_ORGANIZATION_MEMBERS_V2";
  MaintenanceTask2[MaintenanceTask2["ORGANIZATION_PRELIMINARY_PROFILES_V3"] = 12] = "ORGANIZATION_PRELIMINARY_PROFILES_V3";
  MaintenanceTask2[MaintenanceTask2["ORGANIZATION_MIGRATE_TO_ADMIN_PROFILE_V2"] = 15] = "ORGANIZATION_MIGRATE_TO_ADMIN_PROFILE_V2";
  MaintenanceTask2[MaintenanceTask2["PROCESS_VAULT_MESSAGES_V2"] = 11] = "PROCESS_VAULT_MESSAGES_V2";
  MaintenanceTask2[MaintenanceTask2["MIGRATE_TO_PROFILES_V1"] = 7] = "MIGRATE_TO_PROFILES_V1";
  MaintenanceTask2[MaintenanceTask2["ENABLE_PRF_OPPORTUNISTICALLY_V1"] = 14] = "ENABLE_PRF_OPPORTUNISTICALLY_V1";
})(MaintenanceTask || (MaintenanceTask = {}));
proto3.util.setEnumType(MaintenanceTask, "domain.MaintenanceTask", [
  { no: 0, name: "MAINTENANCE_TASK_UNKNOWN" },
  { no: 9, name: "MAINTENANCE_TASK_TEAM_SYNC_ORGANIZATION_MEMBERS_V2" },
  { no: 12, name: "MAINTENANCE_TASK_ORGANIZATION_PRELIMINARY_PROFILES_V3" },
  { no: 15, name: "MAINTENANCE_TASK_ORGANIZATION_MIGRATE_TO_ADMIN_PROFILE_V2" },
  { no: 11, name: "MAINTENANCE_TASK_PROCESS_VAULT_MESSAGES_V2" },
  { no: 7, name: "MAINTENANCE_TASK_MIGRATE_TO_PROFILES_V1" },
  { no: 14, name: "MAINTENANCE_TASK_ENABLE_PRF_OPPORTUNISTICALLY_V1" }
]);
var SyncUpdateField;
(function(SyncUpdateField2) {
  SyncUpdateField2[SyncUpdateField2["SU_UNKNOWN"] = 0] = "SU_UNKNOWN";
  SyncUpdateField2[SyncUpdateField2["SU_USER"] = 1] = "SU_USER";
  SyncUpdateField2[SyncUpdateField2["SU_SESSIONS"] = 2] = "SU_SESSIONS";
  SyncUpdateField2[SyncUpdateField2["SU_VAULTS"] = 3] = "SU_VAULTS";
  SyncUpdateField2[SyncUpdateField2["SU_ACHIEVEMENTS"] = 4] = "SU_ACHIEVEMENTS";
  SyncUpdateField2[SyncUpdateField2["SU_CHANNELS"] = 5] = "SU_CHANNELS";
  SyncUpdateField2[SyncUpdateField2["SU_ORGANIZATIONS"] = 6] = "SU_ORGANIZATIONS";
  SyncUpdateField2[SyncUpdateField2["SU_RELATED_PROFILES"] = 7] = "SU_RELATED_PROFILES";
  SyncUpdateField2[SyncUpdateField2["SU_PROFILES"] = 8] = "SU_PROFILES";
  SyncUpdateField2[SyncUpdateField2["SU_MAINTENANCE_SETTINGS"] = 9] = "SU_MAINTENANCE_SETTINGS";
})(SyncUpdateField || (SyncUpdateField = {}));
proto3.util.setEnumType(SyncUpdateField, "domain.SyncUpdateField", [
  { no: 0, name: "SU_UNKNOWN" },
  { no: 1, name: "SU_USER" },
  { no: 2, name: "SU_SESSIONS" },
  { no: 3, name: "SU_VAULTS" },
  { no: 4, name: "SU_ACHIEVEMENTS" },
  { no: 5, name: "SU_CHANNELS" },
  { no: 6, name: "SU_ORGANIZATIONS" },
  { no: 7, name: "SU_RELATED_PROFILES" },
  { no: 8, name: "SU_PROFILES" },
  { no: 9, name: "SU_MAINTENANCE_SETTINGS" }
]);
var SubscriptionError;
(function(SubscriptionError2) {
  SubscriptionError2[SubscriptionError2["OK"] = 0] = "OK";
  SubscriptionError2[SubscriptionError2["TRIAL_EXCEEDED"] = 1] = "TRIAL_EXCEEDED";
  SubscriptionError2[SubscriptionError2["PADDLE_PAUSED"] = 2] = "PADDLE_PAUSED";
})(SubscriptionError || (SubscriptionError = {}));
proto3.util.setEnumType(SubscriptionError, "domain.SubscriptionError", [
  { no: 0, name: "SUBSCRIPTION_ERROR_OK" },
  { no: 1, name: "SUBSCRIPTION_ERROR_TRIAL_EXCEEDED" },
  { no: 2, name: "SUBSCRIPTION_ERROR_PADDLE_PAUSED" }
]);
class SyncUpdate extends Message {
  constructor(data) {
    super();
    this.syncVersion = protoInt64.zero;
    this.tokenRefreshNeeded = false;
    this.clientOutdated = false;
    this.updatedFields = [];
    this.sessions = [];
    this.vaults = [];
    this.achievements = [];
    this.channels = [];
    this.organizations = [];
    this.relatedProfiles = [];
    this.profiles = [];
    this.preliminaryProfiles = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate, a, b);
  }
}
SyncUpdate.runtime = proto3;
SyncUpdate.typeName = "domain.SyncUpdate";
SyncUpdate.fields = proto3.util.newFieldList(() => [
  { no: 7, name: "server_time", kind: "message", T: Timestamp },
  {
    no: 15,
    name: "sync_version",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 21,
    name: "token_refresh_needed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 22,
    name: "client_outdated",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 11, name: "updated_fields", kind: "enum", T: proto3.getEnumType(SyncUpdateField), repeated: true },
  { no: 4, name: "session_unlock", kind: "message", T: SyncUpdate_SessionUnlock },
  { no: 8, name: "user", kind: "message", T: SyncUpdate_User },
  { no: 1, name: "sessions", kind: "message", T: SyncUpdate_Session, repeated: true },
  { no: 2, name: "vaults", kind: "message", T: SyncUpdate_Vault, repeated: true },
  { no: 6, name: "achievements", kind: "enum", T: proto3.getEnumType(Achievement), repeated: true },
  { no: 3, name: "channels", kind: "message", T: SyncUpdate_Channel, repeated: true },
  { no: 13, name: "organizations", kind: "message", T: SyncUpdate_Organization, repeated: true },
  { no: 18, name: "related_profiles", kind: "message", T: SyncUpdate_RelatedProfile, repeated: true },
  { no: 17, name: "profiles", kind: "message", T: SyncUpdate_Profile, repeated: true },
  { no: 19, name: "maintenance_settings", kind: "message", T: SyncUpdate_MaintenanceSettings },
  { no: 20, name: "preliminary_profiles", kind: "message", T: SyncUpdate_PreliminaryProfile, repeated: true }
]);
class SyncUpdate_Session extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.sessionType = SessionType.UNKNOWN;
    this.clientSettings = "";
    this.enabledProfileIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Session().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Session().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Session().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Session, a, b);
  }
}
SyncUpdate_Session.runtime = proto3;
SyncUpdate_Session.typeName = "domain.SyncUpdate.Session";
SyncUpdate_Session.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "last_used_at", kind: "message", T: Timestamp },
  { no: 4, name: "unlocked_at", kind: "message", T: Timestamp },
  { no: 5, name: "unlocked_until", kind: "message", T: Timestamp },
  { no: 6, name: "unlock_requested_at", kind: "message", T: Timestamp },
  { no: 12, name: "unlock_extend_at", kind: "message", T: Timestamp },
  { no: 7, name: "created_at", kind: "message", T: Timestamp },
  { no: 9, name: "session_type", kind: "enum", T: proto3.getEnumType(SessionType) },
  {
    no: 8,
    name: "client_settings",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 10, name: "enabled_profile_ids", kind: "scalar", T: 9, repeated: true },
  { no: 11, name: "unlock_time_limit", kind: "message", T: UnlockTimeLimit }
]);
class SyncUpdate_Vault extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.commitId = "";
    this.generationId = "";
    this.associatedVaultId = "";
    this.organizationId = "";
    this.users = [];
    this.profiles = [];
    this.vaultType = VaultType.UNKNOWN;
    this.dirty = false;
    this.profileKeyGenerationId = "";
    this.adminProfileKeyGenerationId = "";
    this.messagePublicKey = new Uint8Array(0);
    this.hasMessagesQueued = false;
    this.inboxSlug = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Vault().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Vault().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Vault().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Vault, a, b);
  }
}
SyncUpdate_Vault.runtime = proto3;
SyncUpdate_Vault.typeName = "domain.SyncUpdate.Vault";
SyncUpdate_Vault.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "commit_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "associated_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 8,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 4, name: "users", kind: "message", T: SyncUpdate_Vault_User, repeated: true },
  { no: 11, name: "profiles", kind: "message", T: SyncUpdate_Vault_Profile, repeated: true },
  { no: 5, name: "vault_type", kind: "enum", T: proto3.getEnumType(VaultType) },
  {
    no: 19,
    name: "dirty",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 12,
    name: "profile_key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 18,
    name: "admin_profile_key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 15,
    name: "message_public_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 16,
    name: "has_messages_queued",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 17,
    name: "inbox_slug",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_Vault_User extends Message {
  constructor(data) {
    super();
    this.id = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Vault_User().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Vault_User().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Vault_User().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Vault_User, a, b);
  }
}
SyncUpdate_Vault_User.runtime = proto3;
SyncUpdate_Vault_User.typeName = "domain.SyncUpdate.Vault.User";
SyncUpdate_Vault_User.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_Vault_Profile extends Message {
  constructor(data) {
    super();
    this.id = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Vault_Profile().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Vault_Profile().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Vault_Profile().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Vault_Profile, a, b);
  }
}
SyncUpdate_Vault_Profile.runtime = proto3;
SyncUpdate_Vault_Profile.typeName = "domain.SyncUpdate.Vault.Profile";
SyncUpdate_Vault_Profile.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_Channel extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.channelType = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Channel().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Channel().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Channel().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Channel, a, b);
  }
}
SyncUpdate_Channel.runtime = proto3;
SyncUpdate_Channel.typeName = "domain.SyncUpdate.Channel";
SyncUpdate_Channel.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "channel_type",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_SessionUnlock extends Message {
  constructor(data) {
    super();
    this.encryptedSecret = new Uint8Array(0);
    this.authenticatorId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_SessionUnlock().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_SessionUnlock().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_SessionUnlock().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_SessionUnlock, a, b);
  }
}
SyncUpdate_SessionUnlock.runtime = proto3;
SyncUpdate_SessionUnlock.typeName = "domain.SyncUpdate.SessionUnlock";
SyncUpdate_SessionUnlock.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "encrypted_secret",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 2,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_Authenticator extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.authenticatorType = AuthenticatorType.UNKNOWN;
    this.highSecurityLoginSigPubKey = new Uint8Array(0);
    this.highSecurityIdentitySigPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.storableSigPubKey = new Uint8Array(0);
    this.storableSigPubKeySignature = new Uint8Array(0);
    this.storableVaultKeyEncPubKey = new Uint8Array(0);
    this.storableVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.secretInfo = "";
    this.secretSalt = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Authenticator().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Authenticator().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Authenticator().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Authenticator, a, b);
  }
}
SyncUpdate_Authenticator.runtime = proto3;
SyncUpdate_Authenticator.typeName = "domain.SyncUpdate.Authenticator";
SyncUpdate_Authenticator.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 13, name: "authenticator_type", kind: "enum", T: proto3.getEnumType(AuthenticatorType) },
  {
    no: 3,
    name: "high_security_login_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "high_security_identity_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 5,
    name: "high_security_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 6,
    name: "high_security_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 7,
    name: "storable_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 8,
    name: "storable_sig_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 9,
    name: "storable_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 10,
    name: "storable_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 11,
    name: "secret_info",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 12,
    name: "secret_salt",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class SyncUpdate_User extends Message {
  constructor(data) {
    super();
    this.serverSideSettings = "";
    this.authenticatorBlockHash = new Uint8Array(0);
    this.preferredLocale = "";
    this.emails = [];
    this.preliminaryEmail = "";
    this.webauthnCredentials = [];
    this.userClientSettings = "";
    this.openUserConfirmationIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_User().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_User().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_User().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_User, a, b);
  }
}
SyncUpdate_User.runtime = proto3;
SyncUpdate_User.typeName = "domain.SyncUpdate.User";
SyncUpdate_User.fields = proto3.util.newFieldList(() => [
  {
    no: 3,
    name: "server_side_settings",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "authenticator_block_hash",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 6,
    name: "preferred_locale",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 7, name: "emails", kind: "message", T: SyncUpdate_User_Email, repeated: true },
  {
    no: 8,
    name: "preliminary_email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 9, name: "webauthn_credentials", kind: "message", T: SyncUpdate_User_WebauthnCredential, repeated: true },
  {
    no: 10,
    name: "user_client_settings",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 11, name: "open_user_confirmation_ids", kind: "scalar", T: 9, repeated: true }
]);
class SyncUpdate_User_Email extends Message {
  constructor(data) {
    super();
    this.email = "";
    this.verificationPending = false;
    this.primary = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_User_Email().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_User_Email().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_User_Email().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_User_Email, a, b);
  }
}
SyncUpdate_User_Email.runtime = proto3;
SyncUpdate_User_Email.typeName = "domain.SyncUpdate.User.Email";
SyncUpdate_User_Email.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "verification_pending",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 3,
    name: "primary",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class SyncUpdate_User_WebauthnCredential extends Message {
  constructor(data) {
    super();
    this.webauthnId = "";
    this.aaguid = "";
    this.credentialType = CredentialType.UNKNOWN;
    this.sessionId = "";
    this.prfSupportStatus = WebauthnPrfSupportStatus.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_User_WebauthnCredential().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_User_WebauthnCredential().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_User_WebauthnCredential().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_User_WebauthnCredential, a, b);
  }
}
SyncUpdate_User_WebauthnCredential.runtime = proto3;
SyncUpdate_User_WebauthnCredential.typeName = "domain.SyncUpdate.User.WebauthnCredential";
SyncUpdate_User_WebauthnCredential.fields = proto3.util.newFieldList(() => [
  {
    no: 7,
    name: "webauthn_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "aaguid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "created_at", kind: "message", T: Timestamp },
  { no: 4, name: "last_used_at", kind: "message", T: Timestamp },
  { no: 5, name: "credential_type", kind: "enum", T: proto3.getEnumType(CredentialType) },
  {
    no: 6,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 8, name: "prf_support_status", kind: "enum", T: proto3.getEnumType(WebauthnPrfSupportStatus) }
]);
class SyncUpdate_Organization extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.organizationType = OrganizationType.UNKNOWN;
    this.profiles = [];
    this.name = "";
    this.icon = "";
    this.restrictCreateTeam = false;
    this.restrictPersonalLogins = false;
    this.auditlogEnable = false;
    this.childOrganizationManagementEnable = false;
    this.passwordPolicy = "";
    this.isPreliminary = false;
    this.isAdmin = false;
    this.isManager = false;
    this.superUserId = "";
    this.adminProfileId = "";
    this.subscriptionError = SubscriptionError.OK;
    this.verifiedDomain = "";
    this.clientSettings = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Organization().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Organization().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Organization().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Organization, a, b);
  }
}
SyncUpdate_Organization.runtime = proto3;
SyncUpdate_Organization.typeName = "domain.SyncUpdate.Organization";
SyncUpdate_Organization.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 20, name: "organization_type", kind: "enum", T: proto3.getEnumType(OrganizationType) },
  { no: 10, name: "profiles", kind: "message", T: SyncUpdate_OrganizationProfile, repeated: true },
  {
    no: 3,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "icon",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 12,
    name: "restrict_create_team",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 19,
    name: "restrict_personal_logins",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 14,
    name: "auditlog_enable",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 21,
    name: "child_organization_management_enable",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 23,
    name: "password_policy",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 26, name: "unlock_time_limit", kind: "message", T: UnlockTimeLimit },
  {
    no: 13,
    name: "is_preliminary",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "is_admin",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 24,
    name: "is_manager",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 7,
    name: "super_user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 16,
    name: "admin_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 15, name: "admin_info", kind: "message", T: SyncUpdate_Organization_AdminInfo },
  { no: 11, name: "subscription_error", kind: "enum", T: proto3.getEnumType(SubscriptionError) },
  {
    no: 17,
    name: "verified_domain",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 25,
    name: "client_settings",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 27, name: "parent_organization_info", kind: "message", T: SyncUpdate_Organization_ParentOrganizationInfo }
]);
class SyncUpdate_Organization_AdminInfo extends Message {
  constructor(data) {
    super();
    this.legacyAdminVaultId = "";
    this.entraTenantId = "";
    this.csvIntegrationActive = false;
    this.googleWorkspaceIntegrationActive = false;
    this.licenseType = LicenseType.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Organization_AdminInfo().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Organization_AdminInfo().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Organization_AdminInfo().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Organization_AdminInfo, a, b);
  }
}
SyncUpdate_Organization_AdminInfo.runtime = proto3;
SyncUpdate_Organization_AdminInfo.typeName = "domain.SyncUpdate.Organization.AdminInfo";
SyncUpdate_Organization_AdminInfo.fields = proto3.util.newFieldList(() => [
  {
    no: 2,
    name: "legacy_admin_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "authenticator", kind: "message", T: Authenticator },
  { no: 9, name: "admin_profile", kind: "message", T: SyncUpdate_Profile },
  {
    no: 6,
    name: "entra_tenant_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 7,
    name: "csv_integration_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 8,
    name: "google_workspace_integration_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 10, name: "trial_end_date", kind: "message", T: Timestamp },
  { no: 11, name: "license_type", kind: "enum", T: proto3.getEnumType(LicenseType) }
]);
class SyncUpdate_Organization_ParentOrganizationInfo extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.name = "";
    this.icon = "";
    this.metadata = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Organization_ParentOrganizationInfo().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Organization_ParentOrganizationInfo().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Organization_ParentOrganizationInfo().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Organization_ParentOrganizationInfo, a, b);
  }
}
SyncUpdate_Organization_ParentOrganizationInfo.runtime = proto3;
SyncUpdate_Organization_ParentOrganizationInfo.typeName = "domain.SyncUpdate.Organization.ParentOrganizationInfo";
SyncUpdate_Organization_ParentOrganizationInfo.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "icon",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_OrganizationProfile extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    this.isAdmin = false;
    this.isNotConnected = false;
    this.isManager = false;
    this.isService = false;
    this.personalVaultId = "";
    this.preliminaryUserId = "";
    this.startCode = "";
    this.primaryLoginDevice = PrimaryLoginDevice.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_OrganizationProfile().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_OrganizationProfile().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_OrganizationProfile().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_OrganizationProfile, a, b);
  }
}
SyncUpdate_OrganizationProfile.runtime = proto3;
SyncUpdate_OrganizationProfile.typeName = "domain.SyncUpdate.OrganizationProfile";
SyncUpdate_OrganizationProfile.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "is_admin",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "is_not_connected",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 14,
    name: "is_manager",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 15,
    name: "is_service",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 8,
    name: "personal_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "preliminary_user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 9,
    name: "start_code",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 10, name: "start_code_generated_at", kind: "message", T: Timestamp },
  { no: 11, name: "start_code_email_sent_at", kind: "message", T: Timestamp },
  { no: 12, name: "primary_login_device", kind: "enum", T: proto3.getEnumType(PrimaryLoginDevice) },
  { no: 13, name: "last_active_at", kind: "message", T: Timestamp }
]);
class SyncUpdate_RelatedProfile extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_RelatedProfile().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_RelatedProfile().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_RelatedProfile().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_RelatedProfile, a, b);
  }
}
SyncUpdate_RelatedProfile.runtime = proto3;
SyncUpdate_RelatedProfile.typeName = "domain.SyncUpdate.RelatedProfile";
SyncUpdate_RelatedProfile.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_Profile extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.profileType = ProfileType.UNKNOWN;
    this.keyGenerationId = "";
    this.organizationId = "";
    this.highSecurityIdentitySigPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.highSecurityProfileSeedEncPubKey = new Uint8Array(0);
    this.highSecurityProfileSeedEncPubKeySignature = new Uint8Array(0);
    this.storableSigPubKey = new Uint8Array(0);
    this.storableSigPubKeySignature = new Uint8Array(0);
    this.storableVaultKeyEncPubKey = new Uint8Array(0);
    this.storableVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.storableProfileSeedEncPubKey = new Uint8Array(0);
    this.storableProfileSeedEncPubKeySignature = new Uint8Array(0);
    this.authenticatorLocks = [];
    this.email = "";
    this.unverifiedEmail = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_Profile().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_Profile().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_Profile().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_Profile, a, b);
  }
}
SyncUpdate_Profile.runtime = proto3;
SyncUpdate_Profile.typeName = "domain.SyncUpdate.Profile";
SyncUpdate_Profile.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "profile_type", kind: "enum", T: proto3.getEnumType(ProfileType) },
  {
    no: 3,
    name: "key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "high_security_identity_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 6,
    name: "high_security_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 7,
    name: "high_security_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 8,
    name: "high_security_profile_seed_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 9,
    name: "high_security_profile_seed_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 10,
    name: "storable_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 11,
    name: "storable_sig_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 12,
    name: "storable_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 13,
    name: "storable_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 14,
    name: "storable_profile_seed_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 15,
    name: "storable_profile_seed_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 16, name: "authenticator_locks", kind: "message", T: ProfileAuthenticatorLock, repeated: true },
  { no: 19, name: "profile_lock", kind: "message", T: ProfileProfileLock },
  {
    no: 17,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 18,
    name: "unverified_email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_PreliminaryProfile extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.email = "";
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_PreliminaryProfile().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_PreliminaryProfile().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_PreliminaryProfile().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_PreliminaryProfile, a, b);
  }
}
SyncUpdate_PreliminaryProfile.runtime = proto3;
SyncUpdate_PreliminaryProfile.typeName = "domain.SyncUpdate.PreliminaryProfile";
SyncUpdate_PreliminaryProfile.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncUpdate_MaintenanceSettings extends Message {
  constructor(data) {
    super();
    this.allowedTasks = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncUpdate_MaintenanceSettings().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncUpdate_MaintenanceSettings().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncUpdate_MaintenanceSettings().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncUpdate_MaintenanceSettings, a, b);
  }
}
SyncUpdate_MaintenanceSettings.runtime = proto3;
SyncUpdate_MaintenanceSettings.typeName = "domain.SyncUpdate.MaintenanceSettings";
SyncUpdate_MaintenanceSettings.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "allowed_tasks", kind: "enum", T: proto3.getEnumType(MaintenanceTask), repeated: true }
]);
const trackErrorEmitterInternal = new Emittery$1.Typed();
function trackError(errorObject) {
  let error;
  trackErrorEmitterInternal.emit("error", errorObject).catch(suppressError);
  if (typeof errorObject === "object" && errorObject != null && "stack" in errorObject && errorObject.stack) {
    error = errorObject;
    debugConsole.error(error);
  } else if (typeof errorObject === "object" && errorObject !== null) {
    const keys = Object.keys(errorObject).join(", ");
    if (hasMessage(errorObject)) {
      const message = errorObject.message;
      error = new Error(`Non-error object captured with message "${message}" and keys: ${keys}`);
    } else {
      error = new Error(`Non-error object captured with keys: ${keys}`);
    }
    debugConsole.error(error, errorObject);
  } else {
    error = new Error(`Non-error captured`);
    debugConsole.error(error, errorObject);
  }
  withScope((localScope) => {
    localScope.setExtra("__serialized__", errorObject);
    captureException(error);
  });
}
function hasMessage(obj) {
  return "message" in obj;
}
function suppressError(_e) {
}
var ChannelRecipient;
(function(ChannelRecipient2) {
  ChannelRecipient2[ChannelRecipient2["UNSPECIFIED"] = 0] = "UNSPECIFIED";
  ChannelRecipient2[ChannelRecipient2["CLIENT"] = 1] = "CLIENT";
  ChannelRecipient2[ChannelRecipient2["AUTHENTICATOR"] = 2] = "AUTHENTICATOR";
})(ChannelRecipient || (ChannelRecipient = {}));
proto3.util.setEnumType(ChannelRecipient, "domain.ChannelRecipient", [
  { no: 0, name: "CHANNEL_RECIPIENT_UNSPECIFIED" },
  { no: 1, name: "CHANNEL_RECIPIENT_CLIENT" },
  { no: 2, name: "CHANNEL_RECIPIENT_AUTHENTICATOR" }
]);
class CreateChannelRequest extends Message {
  constructor(data) {
    super();
    this.userId = "";
    this.data = new Uint8Array(0);
    this.exposed = false;
    this.channelType = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateChannelRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateChannelRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateChannelRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateChannelRequest, a, b);
  }
}
CreateChannelRequest.runtime = proto3;
CreateChannelRequest.typeName = "domain.CreateChannelRequest";
CreateChannelRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 3,
    name: "exposed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "channel_type",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateChannelResponse extends Message {
  constructor(data) {
    super();
    this.channelId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateChannelResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateChannelResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateChannelResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateChannelResponse, a, b);
  }
}
CreateChannelResponse.runtime = proto3;
CreateChannelResponse.typeName = "domain.CreateChannelResponse";
CreateChannelResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "channel_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ClaimChannelRequest extends Message {
  constructor(data) {
    super();
    this.channelId = "";
    this.authenticatorId = "";
    this.data = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ClaimChannelRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ClaimChannelRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ClaimChannelRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ClaimChannelRequest, a, b);
  }
}
ClaimChannelRequest.runtime = proto3;
ClaimChannelRequest.typeName = "domain.ClaimChannelRequest";
ClaimChannelRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "channel_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ClaimChannelResponse extends Message {
  constructor(data) {
    super();
    this.data = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ClaimChannelResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ClaimChannelResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ClaimChannelResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ClaimChannelResponse, a, b);
  }
}
ClaimChannelResponse.runtime = proto3;
ClaimChannelResponse.typeName = "domain.ClaimChannelResponse";
ClaimChannelResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ReadChannelRequest extends Message {
  constructor(data) {
    super();
    this.channelId = "";
    this.recipient = ChannelRecipient.UNSPECIFIED;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ReadChannelRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ReadChannelRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ReadChannelRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ReadChannelRequest, a, b);
  }
}
ReadChannelRequest.runtime = proto3;
ReadChannelRequest.typeName = "domain.ReadChannelRequest";
ReadChannelRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "channel_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "recipient", kind: "enum", T: proto3.getEnumType(ChannelRecipient) }
]);
class ReadChannelResponse extends Message {
  constructor(data) {
    super();
    this.data = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ReadChannelResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ReadChannelResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ReadChannelResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ReadChannelResponse, a, b);
  }
}
ReadChannelResponse.runtime = proto3;
ReadChannelResponse.typeName = "domain.ReadChannelResponse";
ReadChannelResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class WriteChannelRequest extends Message {
  constructor(data) {
    super();
    this.channelId = "";
    this.recipient = ChannelRecipient.UNSPECIFIED;
    this.data = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new WriteChannelRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new WriteChannelRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new WriteChannelRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(WriteChannelRequest, a, b);
  }
}
WriteChannelRequest.runtime = proto3;
WriteChannelRequest.typeName = "domain.WriteChannelRequest";
WriteChannelRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "channel_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "recipient", kind: "enum", T: proto3.getEnumType(ChannelRecipient) },
  {
    no: 3,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class WriteChannelResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new WriteChannelResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new WriteChannelResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new WriteChannelResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(WriteChannelResponse, a, b);
  }
}
WriteChannelResponse.runtime = proto3;
WriteChannelResponse.typeName = "domain.WriteChannelResponse";
WriteChannelResponse.fields = proto3.util.newFieldList(() => []);
class DeleteChannelRequest extends Message {
  constructor(data) {
    super();
    this.channelId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteChannelRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteChannelRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteChannelRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteChannelRequest, a, b);
  }
}
DeleteChannelRequest.runtime = proto3;
DeleteChannelRequest.typeName = "domain.DeleteChannelRequest";
DeleteChannelRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "channel_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class DeleteChannelResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteChannelResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteChannelResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteChannelResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteChannelResponse, a, b);
  }
}
DeleteChannelResponse.runtime = proto3;
DeleteChannelResponse.typeName = "domain.DeleteChannelResponse";
DeleteChannelResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class ProfileData extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.keyGenerationId = "";
    this.highSecurityIdentitySigPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.highSecurityProfileSeedEncPubKey = new Uint8Array(0);
    this.highSecurityProfileSeedEncPubKeySignature = new Uint8Array(0);
    this.storableSigPubKey = new Uint8Array(0);
    this.storableSigPubKeySignature = new Uint8Array(0);
    this.storableVaultKeyEncPubKey = new Uint8Array(0);
    this.storableVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.storableProfileSeedEncPubKey = new Uint8Array(0);
    this.storableProfileSeedEncPubKeySignature = new Uint8Array(0);
    this.authenticatorLocks = [];
    this.upstreamProfileLocks = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ProfileData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ProfileData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ProfileData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ProfileData, a, b);
  }
}
ProfileData.runtime = proto3;
ProfileData.typeName = "domain.ProfileData";
ProfileData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "high_security_identity_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "high_security_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 5,
    name: "high_security_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 6,
    name: "high_security_profile_seed_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 7,
    name: "high_security_profile_seed_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 8,
    name: "storable_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 9,
    name: "storable_sig_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 10,
    name: "storable_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 11,
    name: "storable_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 12,
    name: "storable_profile_seed_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 13,
    name: "storable_profile_seed_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 14, name: "authenticator_locks", kind: "message", T: ProfileAuthenticatorLock, repeated: true },
  { no: 16, name: "upstream_profile_locks", kind: "message", T: ProfileProfileLock, repeated: true }
]);
class ForeignProfile extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.keyGenerationId = "";
    this.profileType = ProfileType.UNKNOWN;
    this.organizationId = "";
    this.highSecurityIdentitySigPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.highSecurityProfileSeedEncPubKey = new Uint8Array(0);
    this.highSecurityProfileSeedEncPubKeySignature = new Uint8Array(0);
    this.storableSigPubKey = new Uint8Array(0);
    this.storableSigPubKeySignature = new Uint8Array(0);
    this.storableVaultKeyEncPubKey = new Uint8Array(0);
    this.storableVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.storableProfileSeedEncPubKey = new Uint8Array(0);
    this.storableProfileSeedEncPubKeySignature = new Uint8Array(0);
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ForeignProfile().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ForeignProfile().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ForeignProfile().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ForeignProfile, a, b);
  }
}
ForeignProfile.runtime = proto3;
ForeignProfile.typeName = "domain.ForeignProfile";
ForeignProfile.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "profile_type", kind: "enum", T: proto3.getEnumType(ProfileType) },
  {
    no: 4,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "high_security_identity_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 6,
    name: "high_security_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 7,
    name: "high_security_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 8,
    name: "high_security_profile_seed_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 9,
    name: "high_security_profile_seed_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 10,
    name: "storable_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 11,
    name: "storable_sig_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 12,
    name: "storable_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 13,
    name: "storable_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 14,
    name: "storable_profile_seed_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 15,
    name: "storable_profile_seed_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 16,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ProfileRegenerateData extends Message {
  constructor(data) {
    super();
    this.vaultLocks = [];
    this.downstreamProfileLocks = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ProfileRegenerateData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ProfileRegenerateData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ProfileRegenerateData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ProfileRegenerateData, a, b);
  }
}
ProfileRegenerateData.runtime = proto3;
ProfileRegenerateData.typeName = "domain.ProfileRegenerateData";
ProfileRegenerateData.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "profile", kind: "message", T: ProfileData },
  { no: 2, name: "vault_locks", kind: "message", T: VaultLockCreationData, repeated: true },
  { no: 3, name: "downstream_profile_locks", kind: "message", T: ProfileProfileLock, repeated: true }
]);
var AuditlogEventTypeGroup;
(function(AuditlogEventTypeGroup2) {
  AuditlogEventTypeGroup2[AuditlogEventTypeGroup2["UNKNOWN"] = 0] = "UNKNOWN";
  AuditlogEventTypeGroup2[AuditlogEventTypeGroup2["LOGIN_MIN"] = 1] = "LOGIN_MIN";
  AuditlogEventTypeGroup2[AuditlogEventTypeGroup2["LOGIN_MAX"] = 29999] = "LOGIN_MAX";
  AuditlogEventTypeGroup2[AuditlogEventTypeGroup2["PROFILE_MIN"] = 30001] = "PROFILE_MIN";
  AuditlogEventTypeGroup2[AuditlogEventTypeGroup2["PROFILE_MAX"] = 39999] = "PROFILE_MAX";
})(AuditlogEventTypeGroup || (AuditlogEventTypeGroup = {}));
proto3.util.setEnumType(AuditlogEventTypeGroup, "domain.AuditlogEventTypeGroup", [
  { no: 0, name: "AUDITLOG_EVENT_TYPE_GROUP_UNKNOWN" },
  { no: 1, name: "AUDITLOG_EVENT_TYPE_GROUP_LOGIN_MIN" },
  { no: 29999, name: "AUDITLOG_EVENT_TYPE_GROUP_LOGIN_MAX" },
  { no: 30001, name: "AUDITLOG_EVENT_TYPE_GROUP_PROFILE_MIN" },
  { no: 39999, name: "AUDITLOG_EVENT_TYPE_GROUP_PROFILE_MAX" }
]);
var AuditlogEventType;
(function(AuditlogEventType2) {
  AuditlogEventType2[AuditlogEventType2["UNKNOWN"] = 0] = "UNKNOWN";
  AuditlogEventType2[AuditlogEventType2["LOGIN_R_AUTOFILL"] = 1] = "LOGIN_R_AUTOFILL";
  AuditlogEventType2[AuditlogEventType2["LOGIN_R_PASSWORD_SHOW"] = 100] = "LOGIN_R_PASSWORD_SHOW";
  AuditlogEventType2[AuditlogEventType2["LOGIN_R_PASSWORD_COPY"] = 101] = "LOGIN_R_PASSWORD_COPY";
  AuditlogEventType2[AuditlogEventType2["LOGIN_R_PASSWORD_INSERT_CONTEXT_MENU"] = 102] = "LOGIN_R_PASSWORD_INSERT_CONTEXT_MENU";
  AuditlogEventType2[AuditlogEventType2["LOGIN_R_CUSTOM_FIELD_SHOW"] = 200] = "LOGIN_R_CUSTOM_FIELD_SHOW";
  AuditlogEventType2[AuditlogEventType2["LOGIN_R_CUSTOM_FIELD_COPY"] = 201] = "LOGIN_R_CUSTOM_FIELD_COPY";
  AuditlogEventType2[AuditlogEventType2["LOGIN_R_CUSTOM_FIELD_INSERT_CONTEXT_MENU"] = 202] = "LOGIN_R_CUSTOM_FIELD_INSERT_CONTEXT_MENU";
  AuditlogEventType2[AuditlogEventType2["LOGIN_R_TOTP_SECRET_SHOW"] = 300] = "LOGIN_R_TOTP_SECRET_SHOW";
  AuditlogEventType2[AuditlogEventType2["CREDIT_CARD_R_SECURITY_CODE_SHOW"] = 400] = "CREDIT_CARD_R_SECURITY_CODE_SHOW";
  AuditlogEventType2[AuditlogEventType2["CREDIT_CARD_R_SECURITY_CODE_COPY"] = 401] = "CREDIT_CARD_R_SECURITY_CODE_COPY";
  AuditlogEventType2[AuditlogEventType2["CREDIT_CARD_R_PIN_SHOW"] = 402] = "CREDIT_CARD_R_PIN_SHOW";
  AuditlogEventType2[AuditlogEventType2["CREDIT_CARD_R_PIN_COPY"] = 403] = "CREDIT_CARD_R_PIN_COPY";
  AuditlogEventType2[AuditlogEventType2["WIFI_R_QR_SHOW"] = 500] = "WIFI_R_QR_SHOW";
  AuditlogEventType2[AuditlogEventType2["LOGIN_W_CREATE"] = 10001] = "LOGIN_W_CREATE";
  AuditlogEventType2[AuditlogEventType2["LOGIN_W_CHANGE"] = 10002] = "LOGIN_W_CHANGE";
  AuditlogEventType2[AuditlogEventType2["LOGIN_W_DELETE"] = 10003] = "LOGIN_W_DELETE";
  AuditlogEventType2[AuditlogEventType2["LOGIN_W_ARCHIVE"] = 10004] = "LOGIN_W_ARCHIVE";
  AuditlogEventType2[AuditlogEventType2["LOGIN_W_RESTORE_FROM_ARCHIVE"] = 10005] = "LOGIN_W_RESTORE_FROM_ARCHIVE";
  AuditlogEventType2[AuditlogEventType2["LOGIN_SHARE_LINK_CREATE"] = 20001] = "LOGIN_SHARE_LINK_CREATE";
  AuditlogEventType2[AuditlogEventType2["PROFILE_CREATE"] = 30001] = "PROFILE_CREATE";
  AuditlogEventType2[AuditlogEventType2["PROFILE_DELETE"] = 30002] = "PROFILE_DELETE";
  AuditlogEventType2[AuditlogEventType2["PROFILE_CLAIM_WITH_START_CODE"] = 30003] = "PROFILE_CLAIM_WITH_START_CODE";
  AuditlogEventType2[AuditlogEventType2["PROFILE_DISCONNECT"] = 30004] = "PROFILE_DISCONNECT";
  AuditlogEventType2[AuditlogEventType2["PROFILE_PROMOTE_TO_ADMIN"] = 30005] = "PROFILE_PROMOTE_TO_ADMIN";
  AuditlogEventType2[AuditlogEventType2["PROFILE_DEMOTE_ADMIN"] = 30006] = "PROFILE_DEMOTE_ADMIN";
})(AuditlogEventType || (AuditlogEventType = {}));
proto3.util.setEnumType(AuditlogEventType, "domain.AuditlogEventType", [
  { no: 0, name: "AUDITLOG_EVENT_TYPE_UNKNOWN" },
  { no: 1, name: "AUDITLOG_EVENT_TYPE_LOGIN_R_AUTOFILL" },
  { no: 100, name: "AUDITLOG_EVENT_TYPE_LOGIN_R_PASSWORD_SHOW" },
  { no: 101, name: "AUDITLOG_EVENT_TYPE_LOGIN_R_PASSWORD_COPY" },
  { no: 102, name: "AUDITLOG_EVENT_TYPE_LOGIN_R_PASSWORD_INSERT_CONTEXT_MENU" },
  { no: 200, name: "AUDITLOG_EVENT_TYPE_LOGIN_R_CUSTOM_FIELD_SHOW" },
  { no: 201, name: "AUDITLOG_EVENT_TYPE_LOGIN_R_CUSTOM_FIELD_COPY" },
  { no: 202, name: "AUDITLOG_EVENT_TYPE_LOGIN_R_CUSTOM_FIELD_INSERT_CONTEXT_MENU" },
  { no: 300, name: "AUDITLOG_EVENT_TYPE_LOGIN_R_TOTP_SECRET_SHOW" },
  { no: 400, name: "AUDITLOG_EVENT_TYPE_CREDIT_CARD_R_SECURITY_CODE_SHOW" },
  { no: 401, name: "AUDITLOG_EVENT_TYPE_CREDIT_CARD_R_SECURITY_CODE_COPY" },
  { no: 402, name: "AUDITLOG_EVENT_TYPE_CREDIT_CARD_R_PIN_SHOW" },
  { no: 403, name: "AUDITLOG_EVENT_TYPE_CREDIT_CARD_R_PIN_COPY" },
  { no: 500, name: "AUDITLOG_EVENT_TYPE_WIFI_R_QR_SHOW" },
  { no: 10001, name: "AUDITLOG_EVENT_TYPE_LOGIN_W_CREATE" },
  { no: 10002, name: "AUDITLOG_EVENT_TYPE_LOGIN_W_CHANGE" },
  { no: 10003, name: "AUDITLOG_EVENT_TYPE_LOGIN_W_DELETE" },
  { no: 10004, name: "AUDITLOG_EVENT_TYPE_LOGIN_W_ARCHIVE" },
  { no: 10005, name: "AUDITLOG_EVENT_TYPE_LOGIN_W_RESTORE_FROM_ARCHIVE" },
  { no: 20001, name: "AUDITLOG_EVENT_TYPE_LOGIN_SHARE_LINK_CREATE" },
  { no: 30001, name: "AUDITLOG_EVENT_TYPE_PROFILE_CREATE" },
  { no: 30002, name: "AUDITLOG_EVENT_TYPE_PROFILE_DELETE" },
  { no: 30003, name: "AUDITLOG_EVENT_TYPE_PROFILE_CLAIM_WITH_START_CODE" },
  { no: 30004, name: "AUDITLOG_EVENT_TYPE_PROFILE_DISCONNECT" },
  { no: 30005, name: "AUDITLOG_EVENT_TYPE_PROFILE_PROMOTE_TO_ADMIN" },
  { no: 30006, name: "AUDITLOG_EVENT_TYPE_PROFILE_DEMOTE_ADMIN" }
]);
var ErrorGroup;
(function(ErrorGroup2) {
  ErrorGroup2[ErrorGroup2["EG_UNDEFINED"] = 0] = "EG_UNDEFINED";
  ErrorGroup2[ErrorGroup2["EG_UNSPECIFIC"] = 1e4] = "EG_UNSPECIFIC";
  ErrorGroup2[ErrorGroup2["EG_ACCOUNT"] = 2e4] = "EG_ACCOUNT";
  ErrorGroup2[ErrorGroup2["EG_CREDENTIAL"] = 3e4] = "EG_CREDENTIAL";
  ErrorGroup2[ErrorGroup2["EG_AUTHENTICATOR"] = 4e4] = "EG_AUTHENTICATOR";
  ErrorGroup2[ErrorGroup2["EG_VAULT"] = 5e4] = "EG_VAULT";
  ErrorGroup2[ErrorGroup2["EG_ORGANIZATION"] = 6e4] = "EG_ORGANIZATION";
  ErrorGroup2[ErrorGroup2["EG_PROFILE"] = 7e4] = "EG_PROFILE";
  ErrorGroup2[ErrorGroup2["EG_INTEGRATION"] = 8e4] = "EG_INTEGRATION";
  ErrorGroup2[ErrorGroup2["EG_AUDITLOG"] = 9e4] = "EG_AUDITLOG";
  ErrorGroup2[ErrorGroup2["EG_WEBAUTHN"] = 1e5] = "EG_WEBAUTHN";
  ErrorGroup2[ErrorGroup2["EG_SHARELINK"] = 11e4] = "EG_SHARELINK";
  ErrorGroup2[ErrorGroup2["EG_USER_CONFIRMATION"] = 12e4] = "EG_USER_CONFIRMATION";
})(ErrorGroup || (ErrorGroup = {}));
proto3.util.setEnumType(ErrorGroup, "domainerr.ErrorGroup", [
  { no: 0, name: "EG_UNDEFINED" },
  { no: 1e4, name: "EG_UNSPECIFIC" },
  { no: 2e4, name: "EG_ACCOUNT" },
  { no: 3e4, name: "EG_CREDENTIAL" },
  { no: 4e4, name: "EG_AUTHENTICATOR" },
  { no: 5e4, name: "EG_VAULT" },
  { no: 6e4, name: "EG_ORGANIZATION" },
  { no: 7e4, name: "EG_PROFILE" },
  { no: 8e4, name: "EG_INTEGRATION" },
  { no: 9e4, name: "EG_AUDITLOG" },
  { no: 1e5, name: "EG_WEBAUTHN" },
  { no: 11e4, name: "EG_SHARELINK" },
  { no: 12e4, name: "EG_USER_CONFIRMATION" }
]);
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2[ErrorCode2["UNDEFINED"] = 0] = "UNDEFINED";
  ErrorCode2[ErrorCode2["PERMISSION_DENIED"] = 10100] = "PERMISSION_DENIED";
  ErrorCode2[ErrorCode2["TIMEOUT"] = 10200] = "TIMEOUT";
  ErrorCode2[ErrorCode2["CANCELED"] = 10300] = "CANCELED";
  ErrorCode2[ErrorCode2["BAD_REQUEST"] = 10400] = "BAD_REQUEST";
  ErrorCode2[ErrorCode2["CLIENT_OUTDATED"] = 10426] = "CLIENT_OUTDATED";
  ErrorCode2[ErrorCode2["INTERNAL"] = 10500] = "INTERNAL";
  ErrorCode2[ErrorCode2["EMAIL_TAKEN"] = 20100] = "EMAIL_TAKEN";
  ErrorCode2[ErrorCode2["INVALID_EMAIL"] = 20101] = "INVALID_EMAIL";
  ErrorCode2[ErrorCode2["EMAIL_ALREADY_VERIFIED"] = 20102] = "EMAIL_ALREADY_VERIFIED";
  ErrorCode2[ErrorCode2["EMAIL_REQUIRED"] = 20103] = "EMAIL_REQUIRED";
  ErrorCode2[ErrorCode2["INVALID_LOCALE"] = 20105] = "INVALID_LOCALE";
  ErrorCode2[ErrorCode2["EMAIL_INVITE_NOT_ACTIVE"] = 20106] = "EMAIL_INVITE_NOT_ACTIVE";
  ErrorCode2[ErrorCode2["EMAIL_TAKEN_NOT_RECOVERABLE"] = 20107] = "EMAIL_TAKEN_NOT_RECOVERABLE";
  ErrorCode2[ErrorCode2["MALFORMED_USER_SETTINGS"] = 20108] = "MALFORMED_USER_SETTINGS";
  ErrorCode2[ErrorCode2["EMAIL_TAKEN_VERIFIED_DOMAIN"] = 20109] = "EMAIL_TAKEN_VERIFIED_DOMAIN";
  ErrorCode2[ErrorCode2["EMAIL_TAKEN_ORG_ADMIN_RECOVERABLE"] = 20110] = "EMAIL_TAKEN_ORG_ADMIN_RECOVERABLE";
  ErrorCode2[ErrorCode2["USER_NOT_FOUND"] = 20400] = "USER_NOT_FOUND";
  ErrorCode2[ErrorCode2["SESSION_NOT_FOUND"] = 20410] = "SESSION_NOT_FOUND";
  ErrorCode2[ErrorCode2["INVALID_TIMEOUT"] = 20420] = "INVALID_TIMEOUT";
  ErrorCode2[ErrorCode2["SESSION_ALREADY_UNLOCKED"] = 20430] = "SESSION_ALREADY_UNLOCKED";
  ErrorCode2[ErrorCode2["SESSION_NOT_UNLOCKED"] = 20431] = "SESSION_NOT_UNLOCKED";
  ErrorCode2[ErrorCode2["INVITATION_NOT_FOUND"] = 20450] = "INVITATION_NOT_FOUND";
  ErrorCode2[ErrorCode2["INVALID_VERIFICATION_TOKEN"] = 20460] = "INVALID_VERIFICATION_TOKEN";
  ErrorCode2[ErrorCode2["NOT_ALLOWED_FOR_USER_TYPE"] = 20470] = "NOT_ALLOWED_FOR_USER_TYPE";
  ErrorCode2[ErrorCode2["MALFORMED_CLIENT_SETTINGS"] = 20480] = "MALFORMED_CLIENT_SETTINGS";
  ErrorCode2[ErrorCode2["REGISTER_USE_LEGACY"] = 20500] = "REGISTER_USE_LEGACY";
  ErrorCode2[ErrorCode2["MISSING_CREDENTIALS"] = 30100] = "MISSING_CREDENTIALS";
  ErrorCode2[ErrorCode2["INVALID_SIGNATURE"] = 30400] = "INVALID_SIGNATURE";
  ErrorCode2[ErrorCode2["INVALID_CHALLENGE"] = 30410] = "INVALID_CHALLENGE";
  ErrorCode2[ErrorCode2["INVALID_CREDENTIALS"] = 30420] = "INVALID_CREDENTIALS";
  ErrorCode2[ErrorCode2["CHALLENGE_USER_MISMATCH"] = 30430] = "CHALLENGE_USER_MISMATCH";
  ErrorCode2[ErrorCode2["LONG_POLL_CHANNEL_NOT_FOUND"] = 30440] = "LONG_POLL_CHANNEL_NOT_FOUND";
  ErrorCode2[ErrorCode2["LONG_POLL_CHANNEL_ALREADY_EXISTS"] = 30441] = "LONG_POLL_CHANNEL_ALREADY_EXISTS";
  ErrorCode2[ErrorCode2["INVALID_USER_SWITCH"] = 30450] = "INVALID_USER_SWITCH";
  ErrorCode2[ErrorCode2["INVALID_SESSION_TYPE"] = 30460] = "INVALID_SESSION_TYPE";
  ErrorCode2[ErrorCode2["AUTHENTICATOR_BLOCK_OUT_OF_SYNC"] = 40100] = "AUTHENTICATOR_BLOCK_OUT_OF_SYNC";
  ErrorCode2[ErrorCode2["AUTHENTICATOR_NOT_FOUND"] = 40400] = "AUTHENTICATOR_NOT_FOUND";
  ErrorCode2[ErrorCode2["AUTHENTICATOR_CHANNEL_NOT_FOUND"] = 40410] = "AUTHENTICATOR_CHANNEL_NOT_FOUND";
  ErrorCode2[ErrorCode2["AUTHENTICATOR_CHANNEL_ALREADY_CLAIMED"] = 40411] = "AUTHENTICATOR_CHANNEL_ALREADY_CLAIMED";
  ErrorCode2[ErrorCode2["NO_AUTHENTICATOR_OPERATION"] = 40420] = "NO_AUTHENTICATOR_OPERATION";
  ErrorCode2[ErrorCode2["MISSING_AUTHENTICATOR_BLOCK"] = 40430] = "MISSING_AUTHENTICATOR_BLOCK";
  ErrorCode2[ErrorCode2["AUTHENTICATOR_BLOCK_NOT_FOUND"] = 40440] = "AUTHENTICATOR_BLOCK_NOT_FOUND";
  ErrorCode2[ErrorCode2["AUTHENTICATOR_BLOCK_EXISTS"] = 40450] = "AUTHENTICATOR_BLOCK_EXISTS";
  ErrorCode2[ErrorCode2["INVALID_AUTHENTICATOR_TYPE"] = 40460] = "INVALID_AUTHENTICATOR_TYPE";
  ErrorCode2[ErrorCode2["INVALID_RECIPIENT"] = 40500] = "INVALID_RECIPIENT";
  ErrorCode2[ErrorCode2["VAULT_OUT_OF_SYNC"] = 50100] = "VAULT_OUT_OF_SYNC";
  ErrorCode2[ErrorCode2["NOT_ALLOWED_FOR_VAULT"] = 50110] = "NOT_ALLOWED_FOR_VAULT";
  ErrorCode2[ErrorCode2["VAULT_INSUFFICIENT_ACCESS"] = 50120] = "VAULT_INSUFFICIENT_ACCESS";
  ErrorCode2[ErrorCode2["EMPTY_COMMIT"] = 50200] = "EMPTY_COMMIT";
  ErrorCode2[ErrorCode2["VAULT_NOT_FOUND"] = 50400] = "VAULT_NOT_FOUND";
  ErrorCode2[ErrorCode2["MISSING_VAULT_AUTHENTICATOR_LOCK"] = 50410] = "MISSING_VAULT_AUTHENTICATOR_LOCK";
  ErrorCode2[ErrorCode2["MISSING_VAULT_PROFILE_LOCK"] = 50411] = "MISSING_VAULT_PROFILE_LOCK";
  ErrorCode2[ErrorCode2["MISSING_VAULT"] = 50420] = "MISSING_VAULT";
  ErrorCode2[ErrorCode2["INVALID_UPDATE_TIME"] = 50430] = "INVALID_UPDATE_TIME";
  ErrorCode2[ErrorCode2["INVALID_VAULT_TYPE"] = 50431] = "INVALID_VAULT_TYPE";
  ErrorCode2[ErrorCode2["MISSING_VAULT_ADMIN"] = 50440] = "MISSING_VAULT_ADMIN";
  ErrorCode2[ErrorCode2["VAULT_DIRTY"] = 50450] = "VAULT_DIRTY";
  ErrorCode2[ErrorCode2["MISSING_ENCRYPTED_VAULT_MESSAGE_PRIVATE_KEY"] = 50460] = "MISSING_ENCRYPTED_VAULT_MESSAGE_PRIVATE_KEY";
  ErrorCode2[ErrorCode2["MISSING_VAULT_MESSAGE_PUBLIC_KEY"] = 50461] = "MISSING_VAULT_MESSAGE_PUBLIC_KEY";
  ErrorCode2[ErrorCode2["UNHANDLED_VAULT_MESSAGE"] = 50462] = "UNHANDLED_VAULT_MESSAGE";
  ErrorCode2[ErrorCode2["INVALID_VAULT_MESSAGE_TYPE"] = 50463] = "INVALID_VAULT_MESSAGE_TYPE";
  ErrorCode2[ErrorCode2["VAULT_MESSAGE_NOT_FOUND"] = 50464] = "VAULT_MESSAGE_NOT_FOUND";
  ErrorCode2[ErrorCode2["VAULT_INBOX_SLUG_INVALID"] = 50470] = "VAULT_INBOX_SLUG_INVALID";
  ErrorCode2[ErrorCode2["VAULT_INBOX_SLUG_TAKEN"] = 50471] = "VAULT_INBOX_SLUG_TAKEN";
  ErrorCode2[ErrorCode2["ORGANIZATION_INSUEFFICIENT_ACCESS"] = 60100] = "ORGANIZATION_INSUEFFICIENT_ACCESS";
  ErrorCode2[ErrorCode2["NOT_ALLOWED_FOR_ORGANIZATION"] = 60101] = "NOT_ALLOWED_FOR_ORGANIZATION";
  ErrorCode2[ErrorCode2["ORGANIZATION_NOT_FOUND"] = 60400] = "ORGANIZATION_NOT_FOUND";
  ErrorCode2[ErrorCode2["USER_ALREADY_IN_ORGANIZATION"] = 60401] = "USER_ALREADY_IN_ORGANIZATION";
  ErrorCode2[ErrorCode2["ORGANIZATION_MISSING_ADMIN"] = 60410] = "ORGANIZATION_MISSING_ADMIN";
  ErrorCode2[ErrorCode2["INVALID_ORGANIZATION_NAME"] = 60430] = "INVALID_ORGANIZATION_NAME";
  ErrorCode2[ErrorCode2["ORGANIZATION_INVALID_CONTACT"] = 60431] = "ORGANIZATION_INVALID_CONTACT";
  ErrorCode2[ErrorCode2["COUPON_INVALID"] = 60440] = "COUPON_INVALID";
  ErrorCode2[ErrorCode2["COUPON_ALREADY_REDEEMED"] = 60441] = "COUPON_ALREADY_REDEEMED";
  ErrorCode2[ErrorCode2["OTHER_PROFILE_EMAIL_CONFLICTS"] = 60450] = "OTHER_PROFILE_EMAIL_CONFLICTS";
  ErrorCode2[ErrorCode2["INVALID_ORGANIZATION_DELETION_TOKEN"] = 60460] = "INVALID_ORGANIZATION_DELETION_TOKEN";
  ErrorCode2[ErrorCode2["MALFORMED_PASSWORD_POLICY"] = 60470] = "MALFORMED_PASSWORD_POLICY";
  ErrorCode2[ErrorCode2["MALFORMED_PARENT_ORGANIZATION_METADATA"] = 60471] = "MALFORMED_PARENT_ORGANIZATION_METADATA";
  ErrorCode2[ErrorCode2["PROFILE_NOT_FOUND"] = 70400] = "PROFILE_NOT_FOUND";
  ErrorCode2[ErrorCode2["PROFILE_ALREADY_ENABLED"] = 70401] = "PROFILE_ALREADY_ENABLED";
  ErrorCode2[ErrorCode2["PROFILE_ALREADY_CONNECTED"] = 70402] = "PROFILE_ALREADY_CONNECTED";
  ErrorCode2[ErrorCode2["PROFILE_STARTCODE_INACTIVE"] = 70403] = "PROFILE_STARTCODE_INACTIVE";
  ErrorCode2[ErrorCode2["MISSING_PROFILE_AUTHENTICATOR_LOCK"] = 70410] = "MISSING_PROFILE_AUTHENTICATOR_LOCK";
  ErrorCode2[ErrorCode2["PROFILE_OUT_OF_SYNC"] = 70411] = "PROFILE_OUT_OF_SYNC";
  ErrorCode2[ErrorCode2["MISSING_PROFILE_PROFILE_LOCK"] = 70412] = "MISSING_PROFILE_PROFILE_LOCK";
  ErrorCode2[ErrorCode2["START_CODE_INVALID"] = 70430] = "START_CODE_INVALID";
  ErrorCode2[ErrorCode2["START_CODE_BLOCKED"] = 70431] = "START_CODE_BLOCKED";
  ErrorCode2[ErrorCode2["START_CODE_MISSING"] = 70432] = "START_CODE_MISSING";
  ErrorCode2[ErrorCode2["NOT_ALLOWED_FOR_PROFILE"] = 70433] = "NOT_ALLOWED_FOR_PROFILE";
  ErrorCode2[ErrorCode2["INTEGRATION_NOT_INITIALIZED"] = 80400] = "INTEGRATION_NOT_INITIALIZED";
  ErrorCode2[ErrorCode2["INTEGRATION_UNAUTHORIZED"] = 80401] = "INTEGRATION_UNAUTHORIZED";
  ErrorCode2[ErrorCode2["INTEGRATION_INTERNAL"] = 80500] = "INTEGRATION_INTERNAL";
  ErrorCode2[ErrorCode2["AUDITLOG_MALFORMED_EVENT"] = 90400] = "AUDITLOG_MALFORMED_EVENT";
  ErrorCode2[ErrorCode2["AUDITLOG_ADMIN_INVALID_CREDENTIALS"] = 90420] = "AUDITLOG_ADMIN_INVALID_CREDENTIALS";
  ErrorCode2[ErrorCode2["AUDITLOG_WRITE_INVALID_CREDENTIALS"] = 90421] = "AUDITLOG_WRITE_INVALID_CREDENTIALS";
  ErrorCode2[ErrorCode2["AUDITLOG_SUBMISSION_ERROR"] = 90500] = "AUDITLOG_SUBMISSION_ERROR";
  ErrorCode2[ErrorCode2["WEBAUTHN_VALIDATE_ERROR"] = 100400] = "WEBAUTHN_VALIDATE_ERROR";
  ErrorCode2[ErrorCode2["WEBAUTHN_DATA_ERROR"] = 100401] = "WEBAUTHN_DATA_ERROR";
  ErrorCode2[ErrorCode2["WEBAUTHN_REQUEST_NOT_FOUND"] = 100402] = "WEBAUTHN_REQUEST_NOT_FOUND";
  ErrorCode2[ErrorCode2["WEBAUTHN_INVALID_TRANSPORT"] = 100403] = "WEBAUTHN_INVALID_TRANSPORT";
  ErrorCode2[ErrorCode2["MISSING_WEBAUTHN_CREDENTIAL"] = 100404] = "MISSING_WEBAUTHN_CREDENTIAL";
  ErrorCode2[ErrorCode2["MISSING_WEBAUTHN_RESPONSE"] = 100405] = "MISSING_WEBAUTHN_RESPONSE";
  ErrorCode2[ErrorCode2["WEBAUTHN_MISSING_USER_VERIFICATION"] = 100406] = "WEBAUTHN_MISSING_USER_VERIFICATION";
  ErrorCode2[ErrorCode2["SHARE_LINK_NOT_FOUND"] = 110400] = "SHARE_LINK_NOT_FOUND";
  ErrorCode2[ErrorCode2["USER_CONFIRMATION_NOT_FOUND"] = 120400] = "USER_CONFIRMATION_NOT_FOUND";
})(ErrorCode || (ErrorCode = {}));
proto3.util.setEnumType(ErrorCode, "domainerr.ErrorCode", [
  { no: 0, name: "UNDEFINED" },
  { no: 10100, name: "PERMISSION_DENIED" },
  { no: 10200, name: "TIMEOUT" },
  { no: 10300, name: "CANCELED" },
  { no: 10400, name: "BAD_REQUEST" },
  { no: 10426, name: "CLIENT_OUTDATED" },
  { no: 10500, name: "INTERNAL" },
  { no: 20100, name: "EMAIL_TAKEN" },
  { no: 20101, name: "INVALID_EMAIL" },
  { no: 20102, name: "EMAIL_ALREADY_VERIFIED" },
  { no: 20103, name: "EMAIL_REQUIRED" },
  { no: 20105, name: "INVALID_LOCALE" },
  { no: 20106, name: "EMAIL_INVITE_NOT_ACTIVE" },
  { no: 20107, name: "EMAIL_TAKEN_NOT_RECOVERABLE" },
  { no: 20108, name: "MALFORMED_USER_SETTINGS" },
  { no: 20109, name: "EMAIL_TAKEN_VERIFIED_DOMAIN" },
  { no: 20110, name: "EMAIL_TAKEN_ORG_ADMIN_RECOVERABLE" },
  { no: 20400, name: "USER_NOT_FOUND" },
  { no: 20410, name: "SESSION_NOT_FOUND" },
  { no: 20420, name: "INVALID_TIMEOUT" },
  { no: 20430, name: "SESSION_ALREADY_UNLOCKED" },
  { no: 20431, name: "SESSION_NOT_UNLOCKED" },
  { no: 20450, name: "INVITATION_NOT_FOUND" },
  { no: 20460, name: "INVALID_VERIFICATION_TOKEN" },
  { no: 20470, name: "NOT_ALLOWED_FOR_USER_TYPE" },
  { no: 20480, name: "MALFORMED_CLIENT_SETTINGS" },
  { no: 20500, name: "REGISTER_USE_LEGACY" },
  { no: 30100, name: "MISSING_CREDENTIALS" },
  { no: 30400, name: "INVALID_SIGNATURE" },
  { no: 30410, name: "INVALID_CHALLENGE" },
  { no: 30420, name: "INVALID_CREDENTIALS" },
  { no: 30430, name: "CHALLENGE_USER_MISMATCH" },
  { no: 30440, name: "LONG_POLL_CHANNEL_NOT_FOUND" },
  { no: 30441, name: "LONG_POLL_CHANNEL_ALREADY_EXISTS" },
  { no: 30450, name: "INVALID_USER_SWITCH" },
  { no: 30460, name: "INVALID_SESSION_TYPE" },
  { no: 40100, name: "AUTHENTICATOR_BLOCK_OUT_OF_SYNC" },
  { no: 40400, name: "AUTHENTICATOR_NOT_FOUND" },
  { no: 40410, name: "AUTHENTICATOR_CHANNEL_NOT_FOUND" },
  { no: 40411, name: "AUTHENTICATOR_CHANNEL_ALREADY_CLAIMED" },
  { no: 40420, name: "NO_AUTHENTICATOR_OPERATION" },
  { no: 40430, name: "MISSING_AUTHENTICATOR_BLOCK" },
  { no: 40440, name: "AUTHENTICATOR_BLOCK_NOT_FOUND" },
  { no: 40450, name: "AUTHENTICATOR_BLOCK_EXISTS" },
  { no: 40460, name: "INVALID_AUTHENTICATOR_TYPE" },
  { no: 40500, name: "INVALID_RECIPIENT" },
  { no: 50100, name: "VAULT_OUT_OF_SYNC" },
  { no: 50110, name: "NOT_ALLOWED_FOR_VAULT" },
  { no: 50120, name: "VAULT_INSUFFICIENT_ACCESS" },
  { no: 50200, name: "EMPTY_COMMIT" },
  { no: 50400, name: "VAULT_NOT_FOUND" },
  { no: 50410, name: "MISSING_VAULT_AUTHENTICATOR_LOCK" },
  { no: 50411, name: "MISSING_VAULT_PROFILE_LOCK" },
  { no: 50420, name: "MISSING_VAULT" },
  { no: 50430, name: "INVALID_UPDATE_TIME" },
  { no: 50431, name: "INVALID_VAULT_TYPE" },
  { no: 50440, name: "MISSING_VAULT_ADMIN" },
  { no: 50450, name: "VAULT_DIRTY" },
  { no: 50460, name: "MISSING_ENCRYPTED_VAULT_MESSAGE_PRIVATE_KEY" },
  { no: 50461, name: "MISSING_VAULT_MESSAGE_PUBLIC_KEY" },
  { no: 50462, name: "UNHANDLED_VAULT_MESSAGE" },
  { no: 50463, name: "INVALID_VAULT_MESSAGE_TYPE" },
  { no: 50464, name: "VAULT_MESSAGE_NOT_FOUND" },
  { no: 50470, name: "VAULT_INBOX_SLUG_INVALID" },
  { no: 50471, name: "VAULT_INBOX_SLUG_TAKEN" },
  { no: 60100, name: "ORGANIZATION_INSUEFFICIENT_ACCESS" },
  { no: 60101, name: "NOT_ALLOWED_FOR_ORGANIZATION" },
  { no: 60400, name: "ORGANIZATION_NOT_FOUND" },
  { no: 60401, name: "USER_ALREADY_IN_ORGANIZATION" },
  { no: 60410, name: "ORGANIZATION_MISSING_ADMIN" },
  { no: 60430, name: "INVALID_ORGANIZATION_NAME" },
  { no: 60431, name: "ORGANIZATION_INVALID_CONTACT" },
  { no: 60440, name: "COUPON_INVALID" },
  { no: 60441, name: "COUPON_ALREADY_REDEEMED" },
  { no: 60450, name: "OTHER_PROFILE_EMAIL_CONFLICTS" },
  { no: 60460, name: "INVALID_ORGANIZATION_DELETION_TOKEN" },
  { no: 60470, name: "MALFORMED_PASSWORD_POLICY" },
  { no: 60471, name: "MALFORMED_PARENT_ORGANIZATION_METADATA" },
  { no: 70400, name: "PROFILE_NOT_FOUND" },
  { no: 70401, name: "PROFILE_ALREADY_ENABLED" },
  { no: 70402, name: "PROFILE_ALREADY_CONNECTED" },
  { no: 70403, name: "PROFILE_STARTCODE_INACTIVE" },
  { no: 70410, name: "MISSING_PROFILE_AUTHENTICATOR_LOCK" },
  { no: 70411, name: "PROFILE_OUT_OF_SYNC" },
  { no: 70412, name: "MISSING_PROFILE_PROFILE_LOCK" },
  { no: 70430, name: "START_CODE_INVALID" },
  { no: 70431, name: "START_CODE_BLOCKED" },
  { no: 70432, name: "START_CODE_MISSING" },
  { no: 70433, name: "NOT_ALLOWED_FOR_PROFILE" },
  { no: 80400, name: "INTEGRATION_NOT_INITIALIZED" },
  { no: 80401, name: "INTEGRATION_UNAUTHORIZED" },
  { no: 80500, name: "INTEGRATION_INTERNAL" },
  { no: 90400, name: "AUDITLOG_MALFORMED_EVENT" },
  { no: 90420, name: "AUDITLOG_ADMIN_INVALID_CREDENTIALS" },
  { no: 90421, name: "AUDITLOG_WRITE_INVALID_CREDENTIALS" },
  { no: 90500, name: "AUDITLOG_SUBMISSION_ERROR" },
  { no: 100400, name: "WEBAUTHN_VALIDATE_ERROR" },
  { no: 100401, name: "WEBAUTHN_DATA_ERROR" },
  { no: 100402, name: "WEBAUTHN_REQUEST_NOT_FOUND" },
  { no: 100403, name: "WEBAUTHN_INVALID_TRANSPORT" },
  { no: 100404, name: "MISSING_WEBAUTHN_CREDENTIAL" },
  { no: 100405, name: "MISSING_WEBAUTHN_RESPONSE" },
  { no: 100406, name: "WEBAUTHN_MISSING_USER_VERIFICATION" },
  { no: 110400, name: "SHARE_LINK_NOT_FOUND" },
  { no: 120400, name: "USER_CONFIRMATION_NOT_FOUND" }
]);
var ReportPageProblem;
(function(ReportPageProblem2) {
  ReportPageProblem2[ReportPageProblem2["UNKNOWN"] = 0] = "UNKNOWN";
  ReportPageProblem2[ReportPageProblem2["OTHER"] = 1] = "OTHER";
  ReportPageProblem2[ReportPageProblem2["DETECTION"] = 2] = "DETECTION";
  ReportPageProblem2[ReportPageProblem2["POSITION"] = 3] = "POSITION";
  ReportPageProblem2[ReportPageProblem2["SUBMISSION"] = 4] = "SUBMISSION";
  ReportPageProblem2[ReportPageProblem2["AUTOFILL"] = 5] = "AUTOFILL";
  ReportPageProblem2[ReportPageProblem2["FORM"] = 6] = "FORM";
})(ReportPageProblem || (ReportPageProblem = {}));
proto3.util.setEnumType(ReportPageProblem, "domain.ReportPageProblem", [
  { no: 0, name: "REPORT_PAGE_PROBLEM_UNKNOWN" },
  { no: 1, name: "REPORT_PAGE_PROBLEM_OTHER" },
  { no: 2, name: "REPORT_PAGE_PROBLEM_DETECTION" },
  { no: 3, name: "REPORT_PAGE_PROBLEM_POSITION" },
  { no: 4, name: "REPORT_PAGE_PROBLEM_SUBMISSION" },
  { no: 5, name: "REPORT_PAGE_PROBLEM_AUTOFILL" },
  { no: 6, name: "REPORT_PAGE_PROBLEM_FORM" }
]);
class SendMessageRequest extends Message {
  constructor(data) {
    super();
    this.subject = "";
    this.message = "";
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendMessageRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendMessageRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendMessageRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendMessageRequest, a, b);
  }
}
SendMessageRequest.runtime = proto3;
SendMessageRequest.typeName = "domain.SendMessageRequest";
SendMessageRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "subject",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "message",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SendMessageResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendMessageResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendMessageResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendMessageResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendMessageResponse, a, b);
  }
}
SendMessageResponse.runtime = proto3;
SendMessageResponse.typeName = "domain.SendMessageResponse";
SendMessageResponse.fields = proto3.util.newFieldList(() => []);
class ReportPageRequest extends Message {
  constructor(data) {
    super();
    this.url = "";
    this.problem = ReportPageProblem.UNKNOWN;
    this.comment = "";
    this.screenshot = "";
    this.hasLogin = false;
    this.hasHideSecretsLogin = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ReportPageRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ReportPageRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ReportPageRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ReportPageRequest, a, b);
  }
}
ReportPageRequest.runtime = proto3;
ReportPageRequest.typeName = "domain.ReportPageRequest";
ReportPageRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "problem", kind: "enum", T: proto3.getEnumType(ReportPageProblem) },
  {
    no: 3,
    name: "comment",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "screenshot",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "has_login",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "has_hide_secrets_login",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class ReportPageResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ReportPageResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ReportPageResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ReportPageResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ReportPageResponse, a, b);
  }
}
ReportPageResponse.runtime = proto3;
ReportPageResponse.typeName = "domain.ReportPageResponse";
ReportPageResponse.fields = proto3.util.newFieldList(() => []);
var SubscriptionPlan;
(function(SubscriptionPlan2) {
  SubscriptionPlan2[SubscriptionPlan2["UNKNOWN"] = 0] = "UNKNOWN";
  SubscriptionPlan2[SubscriptionPlan2["MONTHLY"] = 1] = "MONTHLY";
  SubscriptionPlan2[SubscriptionPlan2["YEARLY"] = 2] = "YEARLY";
})(SubscriptionPlan || (SubscriptionPlan = {}));
proto3.util.setEnumType(SubscriptionPlan, "domain.SubscriptionPlan", [
  { no: 0, name: "SUBSCRIPTION_PLAN_UNKNOWN" },
  { no: 1, name: "SUBSCRIPTION_PLAN_MONTHLY" },
  { no: 2, name: "SUBSCRIPTION_PLAN_YEARLY" }
]);
var UserConfirmationResultType;
(function(UserConfirmationResultType2) {
  UserConfirmationResultType2[UserConfirmationResultType2["OPEN"] = 0] = "OPEN";
  UserConfirmationResultType2[UserConfirmationResultType2["ACCEPTED"] = 1] = "ACCEPTED";
  UserConfirmationResultType2[UserConfirmationResultType2["REJECTED"] = 2] = "REJECTED";
})(UserConfirmationResultType || (UserConfirmationResultType = {}));
proto3.util.setEnumType(UserConfirmationResultType, "domain.UserConfirmationResultType", [
  { no: 0, name: "USER_CONFIRMATION_RESULT_TYPE_OPEN" },
  { no: 1, name: "USER_CONFIRMATION_RESULT_TYPE_ACCEPTED" },
  { no: 2, name: "USER_CONFIRMATION_RESULT_TYPE_REJECTED" }
]);
var UserConfirmationType;
(function(UserConfirmationType2) {
  UserConfirmationType2[UserConfirmationType2["UNKNOWN"] = 0] = "UNKNOWN";
  UserConfirmationType2[UserConfirmationType2["DEBUG"] = 1] = "DEBUG";
  UserConfirmationType2[UserConfirmationType2["USER_EXPORT_VAULT"] = 10001] = "USER_EXPORT_VAULT";
  UserConfirmationType2[UserConfirmationType2["USER_EXPORT_ALL"] = 10002] = "USER_EXPORT_ALL";
  UserConfirmationType2[UserConfirmationType2["ORG_ADMIN_DELETE_ORG"] = 3e4] = "ORG_ADMIN_DELETE_ORG";
})(UserConfirmationType || (UserConfirmationType = {}));
proto3.util.setEnumType(UserConfirmationType, "domain.UserConfirmationType", [
  { no: 0, name: "USER_CONFIRMATION_TYPE_UNKNOWN" },
  { no: 1, name: "USER_CONFIRMATION_TYPE_DEBUG" },
  { no: 10001, name: "USER_CONFIRMATION_TYPE_USER_EXPORT_VAULT" },
  { no: 10002, name: "USER_CONFIRMATION_TYPE_USER_EXPORT_ALL" },
  { no: 3e4, name: "USER_CONFIRMATION_TYPE_ORG_ADMIN_DELETE_ORG" }
]);
var UserType;
(function(UserType2) {
  UserType2[UserType2["DEFAULT"] = 0] = "DEFAULT";
  UserType2[UserType2["ORGANIZATION_SUPER"] = 1] = "ORGANIZATION_SUPER";
  UserType2[UserType2["ORGANIZATION_SERVICE"] = 2] = "ORGANIZATION_SERVICE";
})(UserType || (UserType = {}));
proto3.util.setEnumType(UserType, "domain.UserType", [
  { no: 0, name: "USER_TYPE_DEFAULT" },
  { no: 1, name: "USER_TYPE_ORGANIZATION_SUPER" },
  { no: 2, name: "USER_TYPE_ORGANIZATION_SERVICE" }
]);
var VaultMessageType;
(function(VaultMessageType2) {
  VaultMessageType2[VaultMessageType2["UNKNOWN"] = 0] = "UNKNOWN";
  VaultMessageType2[VaultMessageType2["LOGIN_INBOX_V1"] = 1] = "LOGIN_INBOX_V1";
  VaultMessageType2[VaultMessageType2["LINKED_VAULT_DELETED_V1"] = 3] = "LINKED_VAULT_DELETED_V1";
  VaultMessageType2[VaultMessageType2["SHARE_LINK_OPENED_V1"] = 4] = "SHARE_LINK_OPENED_V1";
  VaultMessageType2[VaultMessageType2["LINKED_LOGIN_UPDATE_V1"] = 2] = "LINKED_LOGIN_UPDATE_V1";
  VaultMessageType2[VaultMessageType2["DEBUG"] = 999999] = "DEBUG";
})(VaultMessageType || (VaultMessageType = {}));
proto3.util.setEnumType(VaultMessageType, "domain.VaultMessageType", [
  { no: 0, name: "VAULT_MESSAGE_TYPE_UNKNOWN" },
  { no: 1, name: "VAULT_MESSAGE_TYPE_LOGIN_INBOX_V1" },
  { no: 3, name: "VAULT_MESSAGE_TYPE_LINKED_VAULT_DELETED_V1" },
  { no: 4, name: "VAULT_MESSAGE_TYPE_SHARE_LINK_OPENED_V1" },
  { no: 2, name: "VAULT_MESSAGE_TYPE_LINKED_LOGIN_UPDATE_V1" },
  { no: 999999, name: "VAULT_MESSAGE_TYPE_DEBUG" }
]);
var ClientType;
(function(ClientType2) {
  ClientType2[ClientType2["UNKNOWN"] = 0] = "UNKNOWN";
  ClientType2[ClientType2["TEST"] = 1] = "TEST";
  ClientType2[ClientType2["WEB"] = 100] = "WEB";
  ClientType2[ClientType2["AND"] = 200] = "AND";
  ClientType2[ClientType2["IOS"] = 210] = "IOS";
  ClientType2[ClientType2["EXT"] = 300] = "EXT";
  ClientType2[ClientType2["EXT_IOS"] = 301] = "EXT_IOS";
  ClientType2[ClientType2["CLI"] = 400] = "CLI";
  ClientType2[ClientType2["BAK"] = 401] = "BAK";
  ClientType2[ClientType2["BAE_AUDITLOG"] = 500] = "BAE_AUDITLOG";
})(ClientType || (ClientType = {}));
proto3.util.setEnumType(ClientType, "domain.ClientType", [
  { no: 0, name: "CLIENT_TYPE_UNKNOWN" },
  { no: 1, name: "CLIENT_TYPE_TEST" },
  { no: 100, name: "CLIENT_TYPE_WEB" },
  { no: 200, name: "CLIENT_TYPE_AND" },
  { no: 210, name: "CLIENT_TYPE_IOS" },
  { no: 300, name: "CLIENT_TYPE_EXT" },
  { no: 301, name: "CLIENT_TYPE_EXT_IOS" },
  { no: 400, name: "CLIENT_TYPE_CLI" },
  { no: 401, name: "CLIENT_TYPE_BAK" },
  { no: 500, name: "CLIENT_TYPE_BAE_AUDITLOG" }
]);
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__asyncValues || function(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
class LinkedLoginUpdateMessage extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.generationId = "";
    this.type = VaultMessageType.UNKNOWN;
    this.encryptedData = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new LinkedLoginUpdateMessage().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new LinkedLoginUpdateMessage().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new LinkedLoginUpdateMessage().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(LinkedLoginUpdateMessage, a, b);
  }
}
LinkedLoginUpdateMessage.runtime = proto3;
LinkedLoginUpdateMessage.typeName = "domain.LinkedLoginUpdateMessage";
LinkedLoginUpdateMessage.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "type", kind: "enum", T: proto3.getEnumType(VaultMessageType) },
  {
    no: 4,
    name: "encrypted_data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class VaultRegenerateData extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.latestCommitId = "";
    this.newAuthenticatorEncryptedStorableVaultKeys = [];
    this.newAuthenticatorEncryptedHighSecurityVaultKeys = [];
    this.newAuthenticatorEncryptedVaultMessagePrivateKeys = [];
    this.authenticatorLocks = [];
    this.profileLocks = [];
    this.squashedCommits = new Uint8Array(0);
    this.messagePublicKey = new Uint8Array(0);
    this.deleteMessageIds = [];
    this.regeneratedMessages = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VaultRegenerateData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VaultRegenerateData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VaultRegenerateData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VaultRegenerateData, a, b);
  }
}
VaultRegenerateData.runtime = proto3;
VaultRegenerateData.typeName = "domain.VaultRegenerateData";
VaultRegenerateData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "latest_commit_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "new_authenticator_encrypted_storable_vault_keys", kind: "scalar", T: 12, repeated: true },
  { no: 4, name: "new_authenticator_encrypted_high_security_vault_keys", kind: "scalar", T: 12, repeated: true },
  { no: 10, name: "new_authenticator_encrypted_vault_message_private_keys", kind: "scalar", T: 12, repeated: true },
  { no: 6, name: "authenticator_locks", kind: "message", T: VaultAuthenticatorLock, repeated: true },
  { no: 7, name: "profile_locks", kind: "message", T: VaultProfileLock, repeated: true },
  {
    no: 5,
    name: "squashed_commits",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 8,
    name: "message_public_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 9, name: "delete_message_ids", kind: "scalar", T: 9, repeated: true },
  { no: 11, name: "regenerated_messages", kind: "message", T: VaultRegenerateData_RegeneratedMessage, repeated: true }
]);
class VaultRegenerateData_RegeneratedMessage extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.encryptedData = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VaultRegenerateData_RegeneratedMessage().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VaultRegenerateData_RegeneratedMessage().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VaultRegenerateData_RegeneratedMessage().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VaultRegenerateData_RegeneratedMessage, a, b);
  }
}
VaultRegenerateData_RegeneratedMessage.runtime = proto3;
VaultRegenerateData_RegeneratedMessage.typeName = "domain.VaultRegenerateData.RegeneratedMessage";
VaultRegenerateData_RegeneratedMessage.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "encrypted_data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class VaultCreationData extends Message {
  constructor(data) {
    super();
    this.firstCommitBlob = new Uint8Array(0);
    this.authenticatorLocks = [];
    this.organizationId = "";
    this.messagePublicKey = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VaultCreationData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VaultCreationData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VaultCreationData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VaultCreationData, a, b);
  }
}
VaultCreationData.runtime = proto3;
VaultCreationData.typeName = "domain.VaultCreationData";
VaultCreationData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "first_commit_blob",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 2, name: "authenticator_locks", kind: "message", T: VaultAuthenticatorLock, repeated: true },
  { no: 4, name: "profile_lock", kind: "message", T: VaultProfileLock },
  {
    no: 3,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "message_public_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 6, name: "admin_profile_lock", kind: "message", T: VaultProfileLock }
]);
class VaultPairCreationData extends Message {
  constructor(data) {
    super();
    this.firstCommitBlob = new Uint8Array(0);
    this.authenticatorLocks = [];
    this.messagePublicKey = new Uint8Array(0);
    this.associatedFirstCommitBlob = new Uint8Array(0);
    this.associatedAuthenticatorLocks = [];
    this.associatedMessagePublicKey = new Uint8Array(0);
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VaultPairCreationData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VaultPairCreationData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VaultPairCreationData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VaultPairCreationData, a, b);
  }
}
VaultPairCreationData.runtime = proto3;
VaultPairCreationData.typeName = "domain.VaultPairCreationData";
VaultPairCreationData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "first_commit_blob",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 2, name: "authenticator_locks", kind: "message", T: VaultAuthenticatorLock, repeated: true },
  { no: 7, name: "profile_lock", kind: "message", T: VaultProfileLock },
  {
    no: 9,
    name: "message_public_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 11, name: "admin_profile_lock", kind: "message", T: VaultProfileLock },
  {
    no: 4,
    name: "associated_first_commit_blob",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 5, name: "associated_authenticator_locks", kind: "message", T: VaultAuthenticatorLock, repeated: true },
  { no: 8, name: "associated_profile_lock", kind: "message", T: VaultProfileLock },
  {
    no: 10,
    name: "associated_message_public_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 12, name: "associated_admin_profile_lock", kind: "message", T: VaultProfileLock },
  {
    no: 6,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ShareLinkUpdate extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.encryptedPayload = new Uint8Array(0);
    this.encryptedProtectedSecret = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ShareLinkUpdate().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ShareLinkUpdate().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ShareLinkUpdate().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ShareLinkUpdate, a, b);
  }
}
ShareLinkUpdate.runtime = proto3;
ShareLinkUpdate.typeName = "domain.ShareLinkUpdate";
ShareLinkUpdate.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "encrypted_payload",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 3,
    name: "encrypted_protected_secret",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ShareLinksDelete extends Message {
  constructor(data) {
    super();
    this.keepShareLinkIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ShareLinksDelete().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ShareLinksDelete().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ShareLinksDelete().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ShareLinksDelete, a, b);
  }
}
ShareLinksDelete.runtime = proto3;
ShareLinksDelete.typeName = "domain.ShareLinksDelete";
ShareLinksDelete.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "keep_share_link_ids", kind: "scalar", T: 9, repeated: true }
]);
class CreateCommitRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.latestCommitId = "";
    this.newCommitBlob = new Uint8Array(0);
    this.deleteMessageIds = [];
    this.linkedUpdateMessages = [];
    this.shareLinkUpdates = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateCommitRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateCommitRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateCommitRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateCommitRequest, a, b);
  }
}
CreateCommitRequest.runtime = proto3;
CreateCommitRequest.typeName = "domain.CreateCommitRequest";
CreateCommitRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "latest_commit_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "new_commit_blob",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 4, name: "update_time", kind: "message", T: Timestamp },
  { no: 7, name: "delete_message_ids", kind: "scalar", T: 9, repeated: true },
  { no: 8, name: "linked_update_messages", kind: "message", T: LinkedLoginUpdateMessage, repeated: true },
  { no: 9, name: "share_link_updates", kind: "message", T: ShareLinkUpdate, repeated: true },
  { no: 10, name: "delete_share_links", kind: "message", T: ShareLinksDelete }
]);
class CreateCommitResponse extends Message {
  constructor(data) {
    super();
    this.commitId = "";
    this.linkedUpdateMessageIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateCommitResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateCommitResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateCommitResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateCommitResponse, a, b);
  }
}
CreateCommitResponse.runtime = proto3;
CreateCommitResponse.typeName = "domain.CreateCommitResponse";
CreateCommitResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "commit_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "linked_update_message_ids", kind: "scalar", T: 9, repeated: true }
]);
class CreateGenerationRequest extends Message {
  constructor(data) {
    super();
    this.linkedUpdateMessages = [];
    this.shareLinkUpdates = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateGenerationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateGenerationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateGenerationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateGenerationRequest, a, b);
  }
}
CreateGenerationRequest.runtime = proto3;
CreateGenerationRequest.typeName = "domain.CreateGenerationRequest";
CreateGenerationRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "vault", kind: "message", T: VaultRegenerateData },
  { no: 2, name: "linked_update_messages", kind: "message", T: LinkedLoginUpdateMessage, repeated: true },
  { no: 3, name: "delete_share_links", kind: "message", T: ShareLinksDelete },
  { no: 4, name: "share_link_updates", kind: "message", T: ShareLinkUpdate, repeated: true }
]);
class CreateGenerationResponse extends Message {
  constructor(data) {
    super();
    this.commitId = "";
    this.generationId = "";
    this.linkedUpdateMessageIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateGenerationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateGenerationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateGenerationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateGenerationResponse, a, b);
  }
}
CreateGenerationResponse.runtime = proto3;
CreateGenerationResponse.typeName = "domain.CreateGenerationResponse";
CreateGenerationResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "commit_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "sync_update", kind: "message", T: SyncUpdate },
  { no: 4, name: "linked_update_message_ids", kind: "scalar", T: 9, repeated: true }
]);
class ListCommitsRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.forceLocks = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListCommitsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListCommitsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListCommitsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListCommitsRequest, a, b);
  }
}
ListCommitsRequest.runtime = proto3;
ListCommitsRequest.typeName = "domain.ListCommitsRequest";
ListCommitsRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "latest_commit_id", kind: "message", T: StringValue },
  { no: 4, name: "latest_first_commit_id", kind: "message", T: StringValue },
  {
    no: 3,
    name: "force_locks",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class ListCommitsResponse extends Message {
  constructor(data) {
    super();
    this.currentGenerationId = "";
    this.newerCommits = [];
    this.authenticatorLocks = [];
    this.firstCommitId = "";
    this.messages = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListCommitsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListCommitsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListCommitsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListCommitsResponse, a, b);
  }
}
ListCommitsResponse.runtime = proto3;
ListCommitsResponse.typeName = "domain.ListCommitsResponse";
ListCommitsResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "current_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "newer_commits", kind: "message", T: ListCommitsResponse_Commit, repeated: true },
  { no: 3, name: "authenticator_locks", kind: "message", T: ListCommitsResponse_AuthenticatorLock, repeated: true },
  { no: 6, name: "profile_lock", kind: "message", T: VaultProfileLock },
  { no: 8, name: "admin_profile_lock", kind: "message", T: VaultProfileLock },
  { no: 4, name: "server_time", kind: "message", T: Timestamp },
  {
    no: 5,
    name: "first_commit_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 7, name: "messages", kind: "message", T: ListCommitsResponse_Message, repeated: true }
]);
class ListCommitsResponse_Commit extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.blob = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListCommitsResponse_Commit().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListCommitsResponse_Commit().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListCommitsResponse_Commit().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListCommitsResponse_Commit, a, b);
  }
}
ListCommitsResponse_Commit.runtime = proto3;
ListCommitsResponse_Commit.typeName = "domain.ListCommitsResponse.Commit";
ListCommitsResponse_Commit.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "blob",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ListCommitsResponse_AuthenticatorLock extends Message {
  constructor(data) {
    super();
    this.authenticatorId = "";
    this.encryptedStorableVaultKey = new Uint8Array(0);
    this.encryptedHighSecurityVaultKey = new Uint8Array(0);
    this.encryptedVaultMessagePrivateKey = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListCommitsResponse_AuthenticatorLock().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListCommitsResponse_AuthenticatorLock().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListCommitsResponse_AuthenticatorLock().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListCommitsResponse_AuthenticatorLock, a, b);
  }
}
ListCommitsResponse_AuthenticatorLock.runtime = proto3;
ListCommitsResponse_AuthenticatorLock.typeName = "domain.ListCommitsResponse.AuthenticatorLock";
ListCommitsResponse_AuthenticatorLock.fields = proto3.util.newFieldList(() => [
  {
    no: 2,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "encrypted_storable_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "encrypted_high_security_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 5,
    name: "encrypted_vault_message_private_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ListCommitsResponse_Message extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.type = VaultMessageType.UNKNOWN;
    this.encryptedData = new Uint8Array(0);
    this.senderVaultId = "";
    this.backendMessage = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListCommitsResponse_Message().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListCommitsResponse_Message().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListCommitsResponse_Message().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListCommitsResponse_Message, a, b);
  }
}
ListCommitsResponse_Message.runtime = proto3;
ListCommitsResponse_Message.typeName = "domain.ListCommitsResponse.Message";
ListCommitsResponse_Message.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "type", kind: "enum", T: proto3.getEnumType(VaultMessageType) },
  {
    no: 3,
    name: "encrypted_data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "sender_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "backend_message",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class CreateTeamRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateTeamRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateTeamRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateTeamRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateTeamRequest, a, b);
  }
}
CreateTeamRequest.runtime = proto3;
CreateTeamRequest.typeName = "domain.CreateTeamRequest";
CreateTeamRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "creation_data", kind: "message", T: VaultPairCreationData }
]);
class CreateTeamResponse extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.associatedVaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateTeamResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateTeamResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateTeamResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateTeamResponse, a, b);
  }
}
CreateTeamResponse.runtime = proto3;
CreateTeamResponse.typeName = "domain.CreateTeamResponse";
CreateTeamResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "associated_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class DeleteTeamRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteTeamRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteTeamRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteTeamRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteTeamRequest, a, b);
  }
}
DeleteTeamRequest.runtime = proto3;
DeleteTeamRequest.typeName = "domain.DeleteTeamRequest";
DeleteTeamRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class DeleteTeamResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteTeamResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteTeamResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteTeamResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteTeamResponse, a, b);
  }
}
DeleteTeamResponse.runtime = proto3;
DeleteTeamResponse.typeName = "domain.DeleteTeamResponse";
DeleteTeamResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class ModifyTeamUsersRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.addProfileOps = [];
    this.removeProfileIds = [];
    this.assocLatestCommitId = "";
    this.assocNewCommitBlob = new Uint8Array(0);
    this.generationId = "";
    this.assocGenerationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyTeamUsersRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyTeamUsersRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyTeamUsersRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyTeamUsersRequest, a, b);
  }
}
ModifyTeamUsersRequest.runtime = proto3;
ModifyTeamUsersRequest.typeName = "domain.ModifyTeamUsersRequest";
ModifyTeamUsersRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 11, name: "add_profile_ops", kind: "message", T: ModifyTeamUsersRequest_AddProfileOperation, repeated: true },
  { no: 12, name: "remove_profile_ids", kind: "scalar", T: 9, repeated: true },
  { no: 4, name: "regenerate_data", kind: "message", T: VaultRegenerateData },
  { no: 5, name: "associated_regenerate_data", kind: "message", T: VaultRegenerateData },
  { no: 6, name: "update_time", kind: "message", T: Timestamp },
  {
    no: 7,
    name: "assoc_latest_commit_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 8,
    name: "assoc_new_commit_blob",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 9,
    name: "generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 10,
    name: "assoc_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ModifyTeamUsersRequest_AddProfileOperation extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyTeamUsersRequest_AddProfileOperation().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyTeamUsersRequest_AddProfileOperation().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyTeamUsersRequest_AddProfileOperation().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyTeamUsersRequest_AddProfileOperation, a, b);
  }
}
ModifyTeamUsersRequest_AddProfileOperation.runtime = proto3;
ModifyTeamUsersRequest_AddProfileOperation.typeName = "domain.ModifyTeamUsersRequest.AddProfileOperation";
ModifyTeamUsersRequest_AddProfileOperation.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "lock", kind: "message", T: VaultProfileLock },
  { no: 3, name: "associated_lock", kind: "message", T: VaultProfileLock }
]);
class ModifyTeamUsersResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyTeamUsersResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyTeamUsersResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyTeamUsersResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyTeamUsersResponse, a, b);
  }
}
ModifyTeamUsersResponse.runtime = proto3;
ModifyTeamUsersResponse.typeName = "domain.ModifyTeamUsersResponse";
ModifyTeamUsersResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class CreateInboxVaultRequest extends Message {
  constructor(data) {
    super();
    this.slug = "";
    this.metadata = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateInboxVaultRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateInboxVaultRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateInboxVaultRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateInboxVaultRequest, a, b);
  }
}
CreateInboxVaultRequest.runtime = proto3;
CreateInboxVaultRequest.typeName = "domain.CreateInboxVaultRequest";
CreateInboxVaultRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "creation_data", kind: "message", T: VaultPairCreationData },
  {
    no: 2,
    name: "slug",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateInboxVaultResponse extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.associatedVaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateInboxVaultResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateInboxVaultResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateInboxVaultResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateInboxVaultResponse, a, b);
  }
}
CreateInboxVaultResponse.runtime = proto3;
CreateInboxVaultResponse.typeName = "domain.CreateInboxVaultResponse";
CreateInboxVaultResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "associated_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class UpdateInboxRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateInboxRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateInboxRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateInboxRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateInboxRequest, a, b);
  }
}
UpdateInboxRequest.runtime = proto3;
UpdateInboxRequest.typeName = "domain.UpdateInboxRequest";
UpdateInboxRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "slug", kind: "message", T: StringValue },
  { no: 3, name: "metadata", kind: "message", T: StringValue }
]);
class UpdateInboxResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateInboxResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateInboxResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateInboxResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateInboxResponse, a, b);
  }
}
UpdateInboxResponse.runtime = proto3;
UpdateInboxResponse.typeName = "domain.UpdateInboxResponse";
UpdateInboxResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class DeleteInboxVaultRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteInboxVaultRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteInboxVaultRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteInboxVaultRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteInboxVaultRequest, a, b);
  }
}
DeleteInboxVaultRequest.runtime = proto3;
DeleteInboxVaultRequest.typeName = "domain.DeleteInboxVaultRequest";
DeleteInboxVaultRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class DeleteInboxVaultResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteInboxVaultResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteInboxVaultResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteInboxVaultResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteInboxVaultResponse, a, b);
  }
}
DeleteInboxVaultResponse.runtime = proto3;
DeleteInboxVaultResponse.typeName = "domain.DeleteInboxVaultResponse";
DeleteInboxVaultResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class ListMessagePublicKeysRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.vaultIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListMessagePublicKeysRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListMessagePublicKeysRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListMessagePublicKeysRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListMessagePublicKeysRequest, a, b);
  }
}
ListMessagePublicKeysRequest.runtime = proto3;
ListMessagePublicKeysRequest.typeName = "domain.ListMessagePublicKeysRequest";
ListMessagePublicKeysRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "vault_ids", kind: "scalar", T: 9, repeated: true }
]);
class ListMessagePublicKeysResponse extends Message {
  constructor(data) {
    super();
    this.messagePublicKeys = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListMessagePublicKeysResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListMessagePublicKeysResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListMessagePublicKeysResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListMessagePublicKeysResponse, a, b);
  }
}
ListMessagePublicKeysResponse.runtime = proto3;
ListMessagePublicKeysResponse.typeName = "domain.ListMessagePublicKeysResponse";
ListMessagePublicKeysResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "message_public_keys", kind: "message", T: ListMessagePublicKeysResponse_MessagePublicKey, repeated: true }
]);
class ListMessagePublicKeysResponse_MessagePublicKey extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.generationId = "";
    this.key = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListMessagePublicKeysResponse_MessagePublicKey().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListMessagePublicKeysResponse_MessagePublicKey().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListMessagePublicKeysResponse_MessagePublicKey().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListMessagePublicKeysResponse_MessagePublicKey, a, b);
  }
}
ListMessagePublicKeysResponse_MessagePublicKey.runtime = proto3;
ListMessagePublicKeysResponse_MessagePublicKey.typeName = "domain.ListMessagePublicKeysResponse.MessagePublicKey";
ListMessagePublicKeysResponse_MessagePublicKey.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class WriteEventsRequest extends Message {
  constructor(data) {
    super();
    this.events = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new WriteEventsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new WriteEventsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new WriteEventsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(WriteEventsRequest, a, b);
  }
}
WriteEventsRequest.runtime = proto3;
WriteEventsRequest.typeName = "domain.WriteEventsRequest";
WriteEventsRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "events", kind: "message", T: WriteEventsRequest_Event, repeated: true }
]);
class WriteEventsRequest_Event extends Message {
  constructor(data) {
    super();
    this.eventJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new WriteEventsRequest_Event().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new WriteEventsRequest_Event().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new WriteEventsRequest_Event().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(WriteEventsRequest_Event, a, b);
  }
}
WriteEventsRequest_Event.runtime = proto3;
WriteEventsRequest_Event.typeName = "domain.WriteEventsRequest.Event";
WriteEventsRequest_Event.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "event_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "client_time", kind: "message", T: Timestamp },
  { no: 3, name: "last_known_server_time", kind: "message", T: Timestamp }
]);
class WriteEventsResponse extends Message {
  constructor(data) {
    super();
    this.eventIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new WriteEventsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new WriteEventsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new WriteEventsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(WriteEventsResponse, a, b);
  }
}
WriteEventsResponse.runtime = proto3;
WriteEventsResponse.typeName = "domain.WriteEventsResponse";
WriteEventsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "event_ids", kind: "scalar", T: 9, repeated: true }
]);
class ListEventsRequest extends Message {
  constructor(data) {
    super();
    this.page = 0;
    this.eventTypes = [];
    this.filterProfileIds = [];
    this.filterTargetProfileIds = [];
    this.filterVaultIds = [];
    this.filterLoginIds = [];
    this.filterIpPrefix = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListEventsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListEventsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListEventsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListEventsRequest, a, b);
  }
}
ListEventsRequest.runtime = proto3;
ListEventsRequest.typeName = "domain.ListEventsRequest";
ListEventsRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "time_anchor", kind: "message", T: Timestamp },
  {
    no: 2,
    name: "page",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 3, name: "from_time", kind: "message", T: Timestamp },
  { no: 4, name: "to_time", kind: "message", T: Timestamp },
  { no: 5, name: "event_types", kind: "enum", T: proto3.getEnumType(AuditlogEventType), repeated: true },
  { no: 6, name: "filter_profile_ids", kind: "scalar", T: 9, repeated: true },
  { no: 11, name: "filter_target_profile_ids", kind: "scalar", T: 9, repeated: true },
  { no: 7, name: "filter_vault_ids", kind: "scalar", T: 9, repeated: true },
  { no: 8, name: "filter_login_ids", kind: "scalar", T: 9, repeated: true },
  {
    no: 10,
    name: "filter_ip_prefix",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 9, name: "additional_filter", kind: "message", T: ListEventsRequest_MatchAnyFilter }
]);
class ListEventsRequest_MatchAnyFilter extends Message {
  constructor(data) {
    super();
    this.profileIds = [];
    this.targetProfileIds = [];
    this.vaultIds = [];
    this.loginIds = [];
    this.filterIpPrefix = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListEventsRequest_MatchAnyFilter().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListEventsRequest_MatchAnyFilter().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListEventsRequest_MatchAnyFilter().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListEventsRequest_MatchAnyFilter, a, b);
  }
}
ListEventsRequest_MatchAnyFilter.runtime = proto3;
ListEventsRequest_MatchAnyFilter.typeName = "domain.ListEventsRequest.MatchAnyFilter";
ListEventsRequest_MatchAnyFilter.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "profile_ids", kind: "scalar", T: 9, repeated: true },
  { no: 5, name: "target_profile_ids", kind: "scalar", T: 9, repeated: true },
  { no: 2, name: "vault_ids", kind: "scalar", T: 9, repeated: true },
  { no: 3, name: "login_ids", kind: "scalar", T: 9, repeated: true },
  {
    no: 4,
    name: "filter_ip_prefix",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ListEventsResponse extends Message {
  constructor(data) {
    super();
    this.envelopedEventJson = [];
    this.totalCount = protoInt64.zero;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListEventsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListEventsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListEventsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListEventsResponse, a, b);
  }
}
ListEventsResponse.runtime = proto3;
ListEventsResponse.typeName = "domain.ListEventsResponse";
ListEventsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "enveloped_event_json", kind: "scalar", T: 9, repeated: true },
  {
    no: 2,
    name: "total_count",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  { no: 3, name: "time_anchor", kind: "message", T: Timestamp }
]);
({
  typeName: "domain.AuditlogService",
  methods: {
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - AuditlogMalformedEvent (90500)
     * - Internal (10500)
     *
     * @generated from rpc domain.AuditlogService.WriteEvents
     */
    writeEvents: {
      name: "WriteEvents",
      I: WriteEventsRequest,
      O: WriteEventsResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - Internal (10500)
     *
     * @generated from rpc domain.AuditlogService.ListEvents
     */
    listEvents: {
      name: "ListEvents",
      I: ListEventsRequest,
      O: ListEventsResponse,
      kind: MethodKind.Unary
    }
  }
});
class DomainError2 extends Message {
  constructor(data) {
    super();
    this.code = 0;
    this.userTitle = "";
    this.userDetail = "";
    this.requestId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DomainError2().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DomainError2().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DomainError2().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DomainError2, a, b);
  }
}
DomainError2.runtime = proto3;
DomainError2.typeName = "domain.DomainError";
DomainError2.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "code",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "user_title",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "user_detail",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class Status extends Message {
  constructor(data) {
    super();
    this.code = 0;
    this.message = "";
    this.details = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new Status().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Status().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Status().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Status, a, b);
  }
}
Status.runtime = proto3;
Status.typeName = "domain.Status";
Status.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "code",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 2,
    name: "message",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "details", kind: "message", T: Any, repeated: true }
]);
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__asyncValues || function(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var __await = globalThis && globalThis.__await || function(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
};
globalThis && globalThis.__asyncGenerator || function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class LoginClientPubKeyBody extends Message {
  constructor(data) {
    super();
    this.clientPubKey = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new LoginClientPubKeyBody().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new LoginClientPubKeyBody().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new LoginClientPubKeyBody().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(LoginClientPubKeyBody, a, b);
  }
}
LoginClientPubKeyBody.runtime = proto3;
LoginClientPubKeyBody.typeName = "domain.LoginClientPubKeyBody";
LoginClientPubKeyBody.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "client_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class LoginAuthenticatorPubKeyBody extends Message {
  constructor(data) {
    super();
    this.authenticatorPubKey = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new LoginAuthenticatorPubKeyBody().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new LoginAuthenticatorPubKeyBody().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new LoginAuthenticatorPubKeyBody().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(LoginAuthenticatorPubKeyBody, a, b);
  }
}
LoginAuthenticatorPubKeyBody.runtime = proto3;
LoginAuthenticatorPubKeyBody.typeName = "domain.LoginAuthenticatorPubKeyBody";
LoginAuthenticatorPubKeyBody.fields = proto3.util.newFieldList(() => [
  {
    no: 2,
    name: "authenticator_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class LoginHashCommitmentBody extends Message {
  constructor(data) {
    super();
    this.hashCommitment = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new LoginHashCommitmentBody().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new LoginHashCommitmentBody().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new LoginHashCommitmentBody().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(LoginHashCommitmentBody, a, b);
  }
}
LoginHashCommitmentBody.runtime = proto3;
LoginHashCommitmentBody.typeName = "domain.LoginHashCommitmentBody";
LoginHashCommitmentBody.fields = proto3.util.newFieldList(() => [
  {
    no: 3,
    name: "hash_commitment",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class LoginEncryptedSecretBody extends Message {
  constructor(data) {
    super();
    this.encryptedSecret = new Uint8Array(0);
    this.authenticatorId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new LoginEncryptedSecretBody().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new LoginEncryptedSecretBody().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new LoginEncryptedSecretBody().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(LoginEncryptedSecretBody, a, b);
  }
}
LoginEncryptedSecretBody.runtime = proto3;
LoginEncryptedSecretBody.typeName = "domain.LoginEncryptedSecretBody";
LoginEncryptedSecretBody.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "encrypted_secret",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 2,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class Token extends Message {
  constructor(data) {
    super();
    this.token = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new Token().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new Token().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new Token().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(Token, a, b);
  }
}
Token.runtime = proto3;
Token.typeName = "domain.Token";
Token.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "expires_at", kind: "message", T: Timestamp }
]);
class CreateChallengeRequest extends Message {
  constructor(data) {
    super();
    this.email = "";
    this.backupAuthenticatorId = "";
    this.userId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateChallengeRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateChallengeRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateChallengeRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateChallengeRequest, a, b);
  }
}
CreateChallengeRequest.runtime = proto3;
CreateChallengeRequest.typeName = "domain.CreateChallengeRequest";
CreateChallengeRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "backup_authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateChallengeResponse extends Message {
  constructor(data) {
    super();
    this.userId = "";
    this.challenge = "";
    this.authenticators = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateChallengeResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateChallengeResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateChallengeResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateChallengeResponse, a, b);
  }
}
CreateChallengeResponse.runtime = proto3;
CreateChallengeResponse.typeName = "domain.CreateChallengeResponse";
CreateChallengeResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "challenge",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "authenticators", kind: "message", T: CreateChallengeResponse_Authenticator, repeated: true }
]);
class CreateChallengeResponse_Authenticator extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.authenticatorType = AuthenticatorType.UNKNOWN;
    this.secretInfo = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateChallengeResponse_Authenticator().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateChallengeResponse_Authenticator().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateChallengeResponse_Authenticator().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateChallengeResponse_Authenticator, a, b);
  }
}
CreateChallengeResponse_Authenticator.runtime = proto3;
CreateChallengeResponse_Authenticator.typeName = "domain.CreateChallengeResponse.Authenticator";
CreateChallengeResponse_Authenticator.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 4, name: "authenticator_type", kind: "enum", T: proto3.getEnumType(AuthenticatorType) },
  {
    no: 3,
    name: "secret_info",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 5, name: "webauthn", kind: "message", T: CreateChallengeResponse_Authenticator_Webauthn }
]);
class CreateChallengeResponse_Authenticator_Webauthn extends Message {
  constructor(data) {
    super();
    this.webauthnId = "";
    this.prfSalt = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateChallengeResponse_Authenticator_Webauthn().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateChallengeResponse_Authenticator_Webauthn().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateChallengeResponse_Authenticator_Webauthn().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateChallengeResponse_Authenticator_Webauthn, a, b);
  }
}
CreateChallengeResponse_Authenticator_Webauthn.runtime = proto3;
CreateChallengeResponse_Authenticator_Webauthn.typeName = "domain.CreateChallengeResponse.Authenticator.Webauthn";
CreateChallengeResponse_Authenticator_Webauthn.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "webauthn_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "prf_salt",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class CreateLongPollChannelChallengeRequest extends Message {
  constructor(data) {
    super();
    this.publicKeyHash = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateLongPollChannelChallengeRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateLongPollChannelChallengeRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateLongPollChannelChallengeRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateLongPollChannelChallengeRequest, a, b);
  }
}
CreateLongPollChannelChallengeRequest.runtime = proto3;
CreateLongPollChannelChallengeRequest.typeName = "domain.CreateLongPollChannelChallengeRequest";
CreateLongPollChannelChallengeRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "public_key_hash",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateLongPollChannelChallengeResponse extends Message {
  constructor(data) {
    super();
    this.userId = "";
    this.challenge = "";
    this.authenticatorReply = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateLongPollChannelChallengeResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateLongPollChannelChallengeResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateLongPollChannelChallengeResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateLongPollChannelChallengeResponse, a, b);
  }
}
CreateLongPollChannelChallengeResponse.runtime = proto3;
CreateLongPollChannelChallengeResponse.typeName = "domain.CreateLongPollChannelChallengeResponse";
CreateLongPollChannelChallengeResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "challenge",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "authenticator", kind: "message", T: CreateLongPollChannelChallengeResponse_Authenticator },
  {
    no: 4,
    name: "authenticator_reply",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class CreateLongPollChannelChallengeResponse_Authenticator extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.authenticatorType = AuthenticatorType.UNKNOWN;
    this.secretInfo = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateLongPollChannelChallengeResponse_Authenticator().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateLongPollChannelChallengeResponse_Authenticator().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateLongPollChannelChallengeResponse_Authenticator().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateLongPollChannelChallengeResponse_Authenticator, a, b);
  }
}
CreateLongPollChannelChallengeResponse_Authenticator.runtime = proto3;
CreateLongPollChannelChallengeResponse_Authenticator.typeName = "domain.CreateLongPollChannelChallengeResponse.Authenticator";
CreateLongPollChannelChallengeResponse_Authenticator.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 4, name: "authenticator_type", kind: "enum", T: proto3.getEnumType(AuthenticatorType) },
  {
    no: 3,
    name: "secret_info",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CompleteLongPollChannelRequest extends Message {
  constructor(data) {
    super();
    this.publicKeyHash = "";
    this.authenticatorId = "";
    this.authenticatorReply = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CompleteLongPollChannelRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CompleteLongPollChannelRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CompleteLongPollChannelRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CompleteLongPollChannelRequest, a, b);
  }
}
CompleteLongPollChannelRequest.runtime = proto3;
CompleteLongPollChannelRequest.typeName = "domain.CompleteLongPollChannelRequest";
CompleteLongPollChannelRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "public_key_hash",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "authenticator_reply",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class CompleteLongPollChannelResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CompleteLongPollChannelResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CompleteLongPollChannelResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CompleteLongPollChannelResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CompleteLongPollChannelResponse, a, b);
  }
}
CompleteLongPollChannelResponse.runtime = proto3;
CompleteLongPollChannelResponse.typeName = "domain.CompleteLongPollChannelResponse";
CompleteLongPollChannelResponse.fields = proto3.util.newFieldList(() => []);
class CreateTokensRequest extends Message {
  constructor(data) {
    super();
    this.authenticatorId = "";
    this.challenge = "";
    this.response = new Uint8Array(0);
    this.sessionType = SessionType.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateTokensRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateTokensRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateTokensRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateTokensRequest, a, b);
  }
}
CreateTokensRequest.runtime = proto3;
CreateTokensRequest.typeName = "domain.CreateTokensRequest";
CreateTokensRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 2,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "challenge",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "response",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 5, name: "session_unlock", kind: "message", T: CreateTokensRequest_SessionUnlock },
  { no: 6, name: "session_type", kind: "enum", T: proto3.getEnumType(SessionType) }
]);
class CreateTokensRequest_SessionUnlock extends Message {
  constructor(data) {
    super();
    this.encryptedSecret = new Uint8Array(0);
    this.singleUse = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateTokensRequest_SessionUnlock().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateTokensRequest_SessionUnlock().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateTokensRequest_SessionUnlock().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateTokensRequest_SessionUnlock, a, b);
  }
}
CreateTokensRequest_SessionUnlock.runtime = proto3;
CreateTokensRequest_SessionUnlock.typeName = "domain.CreateTokensRequest.SessionUnlock";
CreateTokensRequest_SessionUnlock.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "encrypted_secret",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 3, name: "expires_at", kind: "message", T: Timestamp },
  {
    no: 5,
    name: "single_use",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class CreateTokensResponse extends Message {
  constructor(data) {
    super();
    this.sessionId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateTokensResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateTokensResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateTokensResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateTokensResponse, a, b);
  }
}
CreateTokensResponse.runtime = proto3;
CreateTokensResponse.typeName = "domain.CreateTokensResponse";
CreateTokensResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "access_token", kind: "message", T: Token },
  {
    no: 2,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 4, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class CreateAuditlogWriteTokenRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateAuditlogWriteTokenRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateAuditlogWriteTokenRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateAuditlogWriteTokenRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateAuditlogWriteTokenRequest, a, b);
  }
}
CreateAuditlogWriteTokenRequest.runtime = proto3;
CreateAuditlogWriteTokenRequest.typeName = "domain.CreateAuditlogWriteTokenRequest";
CreateAuditlogWriteTokenRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateAuditlogWriteTokenResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateAuditlogWriteTokenResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateAuditlogWriteTokenResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateAuditlogWriteTokenResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateAuditlogWriteTokenResponse, a, b);
  }
}
CreateAuditlogWriteTokenResponse.runtime = proto3;
CreateAuditlogWriteTokenResponse.typeName = "domain.CreateAuditlogWriteTokenResponse";
CreateAuditlogWriteTokenResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "token", kind: "message", T: Token }
]);
class CreateAuditlogAdminTokenRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateAuditlogAdminTokenRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateAuditlogAdminTokenRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateAuditlogAdminTokenRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateAuditlogAdminTokenRequest, a, b);
  }
}
CreateAuditlogAdminTokenRequest.runtime = proto3;
CreateAuditlogAdminTokenRequest.typeName = "domain.CreateAuditlogAdminTokenRequest";
CreateAuditlogAdminTokenRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateAuditlogAdminTokenResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateAuditlogAdminTokenResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateAuditlogAdminTokenResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateAuditlogAdminTokenResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateAuditlogAdminTokenResponse, a, b);
  }
}
CreateAuditlogAdminTokenResponse.runtime = proto3;
CreateAuditlogAdminTokenResponse.typeName = "domain.CreateAuditlogAdminTokenResponse";
CreateAuditlogAdminTokenResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "token", kind: "message", T: Token }
]);
class CreateLFDOverridesAdminTokenRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateLFDOverridesAdminTokenRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateLFDOverridesAdminTokenRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateLFDOverridesAdminTokenRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateLFDOverridesAdminTokenRequest, a, b);
  }
}
CreateLFDOverridesAdminTokenRequest.runtime = proto3;
CreateLFDOverridesAdminTokenRequest.typeName = "domain.CreateLFDOverridesAdminTokenRequest";
CreateLFDOverridesAdminTokenRequest.fields = proto3.util.newFieldList(() => []);
class CreateLFDOverridesAdminTokenResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateLFDOverridesAdminTokenResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateLFDOverridesAdminTokenResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateLFDOverridesAdminTokenResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateLFDOverridesAdminTokenResponse, a, b);
  }
}
CreateLFDOverridesAdminTokenResponse.runtime = proto3;
CreateLFDOverridesAdminTokenResponse.typeName = "domain.CreateLFDOverridesAdminTokenResponse";
CreateLFDOverridesAdminTokenResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "token", kind: "message", T: Token }
]);
class RefreshTokenRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RefreshTokenRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RefreshTokenRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RefreshTokenRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RefreshTokenRequest, a, b);
  }
}
RefreshTokenRequest.runtime = proto3;
RefreshTokenRequest.typeName = "domain.RefreshTokenRequest";
RefreshTokenRequest.fields = proto3.util.newFieldList(() => []);
class RefreshTokenResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RefreshTokenResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RefreshTokenResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RefreshTokenResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RefreshTokenResponse, a, b);
  }
}
RefreshTokenResponse.runtime = proto3;
RefreshTokenResponse.typeName = "domain.RefreshTokenResponse";
RefreshTokenResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "new_access_token", kind: "message", T: Token }
]);
class GetRegistrationInfoRequest extends Message {
  constructor(data) {
    super();
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetRegistrationInfoRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetRegistrationInfoRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetRegistrationInfoRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetRegistrationInfoRequest, a, b);
  }
}
GetRegistrationInfoRequest.runtime = proto3;
GetRegistrationInfoRequest.typeName = "domain.GetRegistrationInfoRequest";
GetRegistrationInfoRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetRegistrationInfoResponse extends Message {
  constructor(data) {
    super();
    this.status = RegistrationInfoStatus.UNKNOWN;
    this.webauthnAllowed = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetRegistrationInfoResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetRegistrationInfoResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetRegistrationInfoResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetRegistrationInfoResponse, a, b);
  }
}
GetRegistrationInfoResponse.runtime = proto3;
GetRegistrationInfoResponse.typeName = "domain.GetRegistrationInfoResponse";
GetRegistrationInfoResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "status", kind: "enum", T: proto3.getEnumType(RegistrationInfoStatus) },
  { no: 2, name: "organization", kind: "message", T: GetRegistrationInfoResponse_Organization },
  {
    no: 3,
    name: "webauthn_allowed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class GetRegistrationInfoResponse_Organization extends Message {
  constructor(data) {
    super();
    this.name = "";
    this.icon = "";
    this.id = "";
    this.profileId = "";
    this.startCodePrefix = "";
    this.organizationType = OrganizationType.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetRegistrationInfoResponse_Organization().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetRegistrationInfoResponse_Organization().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetRegistrationInfoResponse_Organization().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetRegistrationInfoResponse_Organization, a, b);
  }
}
GetRegistrationInfoResponse_Organization.runtime = proto3;
GetRegistrationInfoResponse_Organization.typeName = "domain.GetRegistrationInfoResponse.Organization";
GetRegistrationInfoResponse_Organization.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "icon",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "start_code_prefix",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 6, name: "organization_type", kind: "enum", T: proto3.getEnumType(OrganizationType) }
]);
class CreateAccountWithProfileRequest extends Message {
  constructor(data) {
    super();
    this.authenticators = [];
    this.referrerId = "";
    this.authenticatorBlock = new Uint8Array(0);
    this.authenticatorBlockSignature = new Uint8Array(0);
    this.preliminaryEmail = "";
    this.startCode = "";
    this.startCodeProfileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateAccountWithProfileRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateAccountWithProfileRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateAccountWithProfileRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateAccountWithProfileRequest, a, b);
  }
}
CreateAccountWithProfileRequest.runtime = proto3;
CreateAccountWithProfileRequest.typeName = "domain.CreateAccountWithProfileRequest";
CreateAccountWithProfileRequest.fields = proto3.util.newFieldList(() => [
  { no: 14, name: "authenticators", kind: "message", T: AuthenticatorCreationData, repeated: true },
  { no: 2, name: "preferences_profile", kind: "message", T: ProfileData },
  { no: 3, name: "inbox_profile", kind: "message", T: ProfileData },
  { no: 4, name: "meta_vault", kind: "message", T: VaultCreationData },
  {
    no: 5,
    name: "referrer_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "authenticator_block",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 7,
    name: "authenticator_block_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 10,
    name: "preliminary_email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 13,
    name: "start_code",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 15, name: "session_unlock_data", kind: "message", T: CreateAccountWithProfileRequest_SessionUnlockData },
  { no: 16, name: "webauthn_credential_data", kind: "message", T: CreateAccountWithProfileRequest_WebauthnCredentialData },
  {
    no: 17,
    name: "start_code_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateAccountWithProfileRequest_WebauthnCredentialData extends Message {
  constructor(data) {
    super();
    this.requestId = "";
    this.responseJson = "";
    this.prfSupportStatus = WebauthnPrfSupportStatus.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateAccountWithProfileRequest_WebauthnCredentialData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateAccountWithProfileRequest_WebauthnCredentialData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateAccountWithProfileRequest_WebauthnCredentialData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateAccountWithProfileRequest_WebauthnCredentialData, a, b);
  }
}
CreateAccountWithProfileRequest_WebauthnCredentialData.runtime = proto3;
CreateAccountWithProfileRequest_WebauthnCredentialData.typeName = "domain.CreateAccountWithProfileRequest.WebauthnCredentialData";
CreateAccountWithProfileRequest_WebauthnCredentialData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "response_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "prf_support_status", kind: "enum", T: proto3.getEnumType(WebauthnPrfSupportStatus) }
]);
class CreateAccountWithProfileRequest_SessionUnlockData extends Message {
  constructor(data) {
    super();
    this.encryptedSecret = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateAccountWithProfileRequest_SessionUnlockData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateAccountWithProfileRequest_SessionUnlockData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateAccountWithProfileRequest_SessionUnlockData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateAccountWithProfileRequest_SessionUnlockData, a, b);
  }
}
CreateAccountWithProfileRequest_SessionUnlockData.runtime = proto3;
CreateAccountWithProfileRequest_SessionUnlockData.typeName = "domain.CreateAccountWithProfileRequest.SessionUnlockData";
CreateAccountWithProfileRequest_SessionUnlockData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "encrypted_secret",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 2, name: "unlock_max_expires_at", kind: "message", T: Timestamp }
]);
class CreateAccountWithProfileResponse extends Message {
  constructor(data) {
    super();
    this.userId = "";
    this.sessionId = "";
    this.authenticatorIds = [];
    this.preferencesProfileId = "";
    this.metaVaultId = "";
    this.inboxProfileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateAccountWithProfileResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateAccountWithProfileResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateAccountWithProfileResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateAccountWithProfileResponse, a, b);
  }
}
CreateAccountWithProfileResponse.runtime = proto3;
CreateAccountWithProfileResponse.typeName = "domain.CreateAccountWithProfileResponse";
CreateAccountWithProfileResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "access_token", kind: "message", T: Token },
  {
    no: 3,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 4, name: "authenticator_ids", kind: "scalar", T: 9, repeated: true },
  {
    no: 5,
    name: "preferences_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 7,
    name: "meta_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "inbox_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class UpdateAccountRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateAccountRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateAccountRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateAccountRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateAccountRequest, a, b);
  }
}
UpdateAccountRequest.runtime = proto3;
UpdateAccountRequest.typeName = "domain.UpdateAccountRequest";
UpdateAccountRequest.fields = proto3.util.newFieldList(() => [
  { no: 2, name: "preferred_locale", kind: "message", T: StringValue },
  { no: 3, name: "user_client_settings", kind: "message", T: StringValue }
]);
class UpdateAccountResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateAccountResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateAccountResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateAccountResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateAccountResponse, a, b);
  }
}
UpdateAccountResponse.runtime = proto3;
UpdateAccountResponse.typeName = "domain.UpdateAccountResponse";
UpdateAccountResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class CreateReferrerRequest extends Message {
  constructor(data) {
    super();
    this.referrer = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateReferrerRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateReferrerRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateReferrerRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateReferrerRequest, a, b);
  }
}
CreateReferrerRequest.runtime = proto3;
CreateReferrerRequest.typeName = "domain.CreateReferrerRequest";
CreateReferrerRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "referrer",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateReferrerResponse extends Message {
  constructor(data) {
    super();
    this.referrerId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateReferrerResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateReferrerResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateReferrerResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateReferrerResponse, a, b);
  }
}
CreateReferrerResponse.runtime = proto3;
CreateReferrerResponse.typeName = "domain.CreateReferrerResponse";
CreateReferrerResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "referrer_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class AddAchievementsRequest extends Message {
  constructor(data) {
    super();
    this.achievements = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AddAchievementsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AddAchievementsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AddAchievementsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AddAchievementsRequest, a, b);
  }
}
AddAchievementsRequest.runtime = proto3;
AddAchievementsRequest.typeName = "domain.AddAchievementsRequest";
AddAchievementsRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "achievements", kind: "enum", T: proto3.getEnumType(Achievement), repeated: true }
]);
class AddAchievementsResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AddAchievementsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AddAchievementsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AddAchievementsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AddAchievementsResponse, a, b);
  }
}
AddAchievementsResponse.runtime = proto3;
AddAchievementsResponse.typeName = "domain.AddAchievementsResponse";
AddAchievementsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class ListAccountsRequest extends Message {
  constructor(data) {
    super();
    this.users = [];
    this.emails = [];
    this.profileIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListAccountsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListAccountsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListAccountsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListAccountsRequest, a, b);
  }
}
ListAccountsRequest.runtime = proto3;
ListAccountsRequest.typeName = "domain.ListAccountsRequest";
ListAccountsRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "users", kind: "message", T: ListAccountsRequest_User, repeated: true },
  { no: 2, name: "emails", kind: "scalar", T: 9, repeated: true },
  { no: 3, name: "profile_ids", kind: "scalar", T: 9, repeated: true }
]);
class ListAccountsRequest_User extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.authenticatorBlockHash = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListAccountsRequest_User().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListAccountsRequest_User().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListAccountsRequest_User().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListAccountsRequest_User, a, b);
  }
}
ListAccountsRequest_User.runtime = proto3;
ListAccountsRequest_User.typeName = "domain.ListAccountsRequest.User";
ListAccountsRequest_User.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "authenticator_block_hash",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ListAccountsResponse extends Message {
  constructor(data) {
    super();
    this.users = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListAccountsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListAccountsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListAccountsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListAccountsResponse, a, b);
  }
}
ListAccountsResponse.runtime = proto3;
ListAccountsResponse.typeName = "domain.ListAccountsResponse";
ListAccountsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "users", kind: "message", T: ListAccountsResponse_User, repeated: true }
]);
class ListAccountsResponse_User extends Message {
  constructor(data) {
    super();
    this.userId = "";
    this.email = "";
    this.authenticators = [];
    this.authenticatorBlocks = [];
    this.isProfilesEnabled = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListAccountsResponse_User().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListAccountsResponse_User().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListAccountsResponse_User().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListAccountsResponse_User, a, b);
  }
}
ListAccountsResponse_User.runtime = proto3;
ListAccountsResponse_User.typeName = "domain.ListAccountsResponse.User";
ListAccountsResponse_User.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "authenticators", kind: "message", T: ListAccountsResponse_User_ForeignAuthenticator, repeated: true },
  { no: 4, name: "authenticator_blocks", kind: "message", T: AuthenticatorBlock, repeated: true },
  {
    no: 5,
    name: "is_profiles_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class ListAccountsResponse_User_ForeignAuthenticator extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.highSecurityIdentitySigPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKey = new Uint8Array(0);
    this.highSecurityVaultKeyEncPubKeySignature = new Uint8Array(0);
    this.storableSigPubKey = new Uint8Array(0);
    this.storableSigPubKeySignature = new Uint8Array(0);
    this.storableVaultKeyEncPubKey = new Uint8Array(0);
    this.storableVaultKeyEncPubKeySignature = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListAccountsResponse_User_ForeignAuthenticator().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListAccountsResponse_User_ForeignAuthenticator().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListAccountsResponse_User_ForeignAuthenticator().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListAccountsResponse_User_ForeignAuthenticator, a, b);
  }
}
ListAccountsResponse_User_ForeignAuthenticator.runtime = proto3;
ListAccountsResponse_User_ForeignAuthenticator.typeName = "domain.ListAccountsResponse.User.ForeignAuthenticator";
ListAccountsResponse_User_ForeignAuthenticator.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "high_security_identity_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "high_security_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 5,
    name: "high_security_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 6,
    name: "storable_sig_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 7,
    name: "storable_sig_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 8,
    name: "storable_vault_key_enc_pub_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 9,
    name: "storable_vault_key_enc_pub_key_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ResolveEmailsRequest extends Message {
  constructor(data) {
    super();
    this.emails = [];
    this.failFast = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ResolveEmailsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ResolveEmailsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ResolveEmailsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ResolveEmailsRequest, a, b);
  }
}
ResolveEmailsRequest.runtime = proto3;
ResolveEmailsRequest.typeName = "domain.ResolveEmailsRequest";
ResolveEmailsRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "emails", kind: "scalar", T: 9, repeated: true },
  {
    no: 2,
    name: "fail_fast",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class ResolveEmailsResponse extends Message {
  constructor(data) {
    super();
    this.emails = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ResolveEmailsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ResolveEmailsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ResolveEmailsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ResolveEmailsResponse, a, b);
  }
}
ResolveEmailsResponse.runtime = proto3;
ResolveEmailsResponse.typeName = "domain.ResolveEmailsResponse";
ResolveEmailsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "emails", kind: "message", T: ResolveEmailsResponse_ResolvedEmail, repeated: true }
]);
class ResolveEmailsResponse_ResolvedProfile extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.organizationId = "";
    this.profileType = ProfileType.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ResolveEmailsResponse_ResolvedProfile().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ResolveEmailsResponse_ResolvedProfile().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ResolveEmailsResponse_ResolvedProfile().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ResolveEmailsResponse_ResolvedProfile, a, b);
  }
}
ResolveEmailsResponse_ResolvedProfile.runtime = proto3;
ResolveEmailsResponse_ResolvedProfile.typeName = "domain.ResolveEmailsResponse.ResolvedProfile";
ResolveEmailsResponse_ResolvedProfile.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "profile_type", kind: "enum", T: proto3.getEnumType(ProfileType) }
]);
class ResolveEmailsResponse_ResolvedEmail extends Message {
  constructor(data) {
    super();
    this.email = "";
    this.emailInvalid = false;
    this.profiles = [];
    this.userId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ResolveEmailsResponse_ResolvedEmail().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ResolveEmailsResponse_ResolvedEmail().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ResolveEmailsResponse_ResolvedEmail().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ResolveEmailsResponse_ResolvedEmail, a, b);
  }
}
ResolveEmailsResponse_ResolvedEmail.runtime = proto3;
ResolveEmailsResponse_ResolvedEmail.typeName = "domain.ResolveEmailsResponse.ResolvedEmail";
ResolveEmailsResponse_ResolvedEmail.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "email_invalid",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 2, name: "profiles", kind: "message", T: ResolveEmailsResponse_ResolvedProfile, repeated: true },
  {
    no: 3,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetPaddleConfigRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetPaddleConfigRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetPaddleConfigRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetPaddleConfigRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetPaddleConfigRequest, a, b);
  }
}
GetPaddleConfigRequest.runtime = proto3;
GetPaddleConfigRequest.typeName = "domain.GetPaddleConfigRequest";
GetPaddleConfigRequest.fields = proto3.util.newFieldList(() => []);
class GetPaddleConfigResponse extends Message {
  constructor(data) {
    super();
    this.isSandbox = false;
    this.wrapperHost = "";
    this.vendorId = protoInt64.zero;
    this.productIdMonthly = protoInt64.zero;
    this.productIdYearly = protoInt64.zero;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetPaddleConfigResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetPaddleConfigResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetPaddleConfigResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetPaddleConfigResponse, a, b);
  }
}
GetPaddleConfigResponse.runtime = proto3;
GetPaddleConfigResponse.typeName = "domain.GetPaddleConfigResponse";
GetPaddleConfigResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_sandbox",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "wrapper_host",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "vendor_id",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 4,
    name: "product_id_monthly",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 5,
    name: "product_id_yearly",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }
]);
class DeleteAccountRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteAccountRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteAccountRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteAccountRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteAccountRequest, a, b);
  }
}
DeleteAccountRequest.runtime = proto3;
DeleteAccountRequest.typeName = "domain.DeleteAccountRequest";
DeleteAccountRequest.fields = proto3.util.newFieldList(() => []);
class DeleteAccountResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteAccountResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteAccountResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteAccountResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteAccountResponse, a, b);
  }
}
DeleteAccountResponse.runtime = proto3;
DeleteAccountResponse.typeName = "domain.DeleteAccountResponse";
DeleteAccountResponse.fields = proto3.util.newFieldList(() => []);
class CreatePrivateProfileRequest extends Message {
  constructor(data) {
    super();
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreatePrivateProfileRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreatePrivateProfileRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreatePrivateProfileRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreatePrivateProfileRequest, a, b);
  }
}
CreatePrivateProfileRequest.runtime = proto3;
CreatePrivateProfileRequest.typeName = "domain.CreatePrivateProfileRequest";
CreatePrivateProfileRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "private_profile", kind: "message", T: ProfileData },
  { no: 3, name: "private_vault", kind: "message", T: VaultCreationData }
]);
class CreatePrivateProfileResponse extends Message {
  constructor(data) {
    super();
    this.privateProfileId = "";
    this.privateVaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreatePrivateProfileResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreatePrivateProfileResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreatePrivateProfileResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreatePrivateProfileResponse, a, b);
  }
}
CreatePrivateProfileResponse.runtime = proto3;
CreatePrivateProfileResponse.typeName = "domain.CreatePrivateProfileResponse";
CreatePrivateProfileResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "private_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "private_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class DeletePrivateProfileRequest extends Message {
  constructor(data) {
    super();
    this.privateProfileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeletePrivateProfileRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeletePrivateProfileRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeletePrivateProfileRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeletePrivateProfileRequest, a, b);
  }
}
DeletePrivateProfileRequest.runtime = proto3;
DeletePrivateProfileRequest.typeName = "domain.DeletePrivateProfileRequest";
DeletePrivateProfileRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "private_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class DeletePrivateProfileResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeletePrivateProfileResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeletePrivateProfileResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeletePrivateProfileResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeletePrivateProfileResponse, a, b);
  }
}
DeletePrivateProfileResponse.runtime = proto3;
DeletePrivateProfileResponse.typeName = "domain.DeletePrivateProfileResponse";
DeletePrivateProfileResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class RegenerateProfilesRequest extends Message {
  constructor(data) {
    super();
    this.profiles = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegenerateProfilesRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegenerateProfilesRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegenerateProfilesRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegenerateProfilesRequest, a, b);
  }
}
RegenerateProfilesRequest.runtime = proto3;
RegenerateProfilesRequest.typeName = "domain.RegenerateProfilesRequest";
RegenerateProfilesRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "profiles", kind: "message", T: ProfileRegenerateData, repeated: true }
]);
class RegenerateProfilesResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegenerateProfilesResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegenerateProfilesResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegenerateProfilesResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegenerateProfilesResponse, a, b);
  }
}
RegenerateProfilesResponse.runtime = proto3;
RegenerateProfilesResponse.typeName = "domain.RegenerateProfilesResponse";
RegenerateProfilesResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class ListProfilesRequest extends Message {
  constructor(data) {
    super();
    this.profileIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListProfilesRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListProfilesRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListProfilesRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListProfilesRequest, a, b);
  }
}
ListProfilesRequest.runtime = proto3;
ListProfilesRequest.typeName = "domain.ListProfilesRequest";
ListProfilesRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "profile_ids", kind: "scalar", T: 9, repeated: true }
]);
class ListProfilesResponse extends Message {
  constructor(data) {
    super();
    this.profiles = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListProfilesResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListProfilesResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListProfilesResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListProfilesResponse, a, b);
  }
}
ListProfilesResponse.runtime = proto3;
ListProfilesResponse.typeName = "domain.ListProfilesResponse";
ListProfilesResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "profiles", kind: "message", T: ForeignProfile, repeated: true }
]);
class ProfileRequestEmailChangeRequest extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ProfileRequestEmailChangeRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ProfileRequestEmailChangeRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ProfileRequestEmailChangeRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ProfileRequestEmailChangeRequest, a, b);
  }
}
ProfileRequestEmailChangeRequest.runtime = proto3;
ProfileRequestEmailChangeRequest.typeName = "domain.ProfileRequestEmailChangeRequest";
ProfileRequestEmailChangeRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ProfileRequestEmailChangeResponse extends Message {
  constructor(data) {
    super();
    this.verificationEmailSent = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ProfileRequestEmailChangeResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ProfileRequestEmailChangeResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ProfileRequestEmailChangeResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ProfileRequestEmailChangeResponse, a, b);
  }
}
ProfileRequestEmailChangeResponse.runtime = proto3;
ProfileRequestEmailChangeResponse.typeName = "domain.ProfileRequestEmailChangeResponse";
ProfileRequestEmailChangeResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "verification_email_sent",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class ProfileCancelEmailChangeRequest extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ProfileCancelEmailChangeRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ProfileCancelEmailChangeRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ProfileCancelEmailChangeRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ProfileCancelEmailChangeRequest, a, b);
  }
}
ProfileCancelEmailChangeRequest.runtime = proto3;
ProfileCancelEmailChangeRequest.typeName = "domain.ProfileCancelEmailChangeRequest";
ProfileCancelEmailChangeRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ProfileCancelEmailChangeResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ProfileCancelEmailChangeResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ProfileCancelEmailChangeResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ProfileCancelEmailChangeResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ProfileCancelEmailChangeResponse, a, b);
  }
}
ProfileCancelEmailChangeResponse.runtime = proto3;
ProfileCancelEmailChangeResponse.typeName = "domain.ProfileCancelEmailChangeResponse";
ProfileCancelEmailChangeResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class VerifyEmailAddressRequest extends Message {
  constructor(data) {
    super();
    this.token = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VerifyEmailAddressRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VerifyEmailAddressRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VerifyEmailAddressRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VerifyEmailAddressRequest, a, b);
  }
}
VerifyEmailAddressRequest.runtime = proto3;
VerifyEmailAddressRequest.typeName = "domain.VerifyEmailAddressRequest";
VerifyEmailAddressRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class VerifyEmailAddressResponse extends Message {
  constructor(data) {
    super();
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new VerifyEmailAddressResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new VerifyEmailAddressResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new VerifyEmailAddressResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(VerifyEmailAddressResponse, a, b);
  }
}
VerifyEmailAddressResponse.runtime = proto3;
VerifyEmailAddressResponse.typeName = "domain.VerifyEmailAddressResponse";
VerifyEmailAddressResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ClaimWithStartCodeRequest extends Message {
  constructor(data) {
    super();
    this.startCode = "";
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ClaimWithStartCodeRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ClaimWithStartCodeRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ClaimWithStartCodeRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ClaimWithStartCodeRequest, a, b);
  }
}
ClaimWithStartCodeRequest.runtime = proto3;
ClaimWithStartCodeRequest.typeName = "domain.ClaimWithStartCodeRequest";
ClaimWithStartCodeRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 2,
    name: "start_code",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ClaimWithStartCodeResponse extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ClaimWithStartCodeResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ClaimWithStartCodeResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ClaimWithStartCodeResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ClaimWithStartCodeResponse, a, b);
  }
}
ClaimWithStartCodeResponse.runtime = proto3;
ClaimWithStartCodeResponse.typeName = "domain.ClaimWithStartCodeResponse";
ClaimWithStartCodeResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetProfileInfoRequest extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetProfileInfoRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetProfileInfoRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetProfileInfoRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetProfileInfoRequest, a, b);
  }
}
GetProfileInfoRequest.runtime = proto3;
GetProfileInfoRequest.typeName = "domain.GetProfileInfoRequest";
GetProfileInfoRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetProfileInfoResponse extends Message {
  constructor(data) {
    super();
    this.email = "";
    this.organizationId = "";
    this.organizationName = "";
    this.organizationIcon = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetProfileInfoResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetProfileInfoResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetProfileInfoResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetProfileInfoResponse, a, b);
  }
}
GetProfileInfoResponse.runtime = proto3;
GetProfileInfoResponse.typeName = "domain.GetProfileInfoResponse";
GetProfileInfoResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "organization_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "organization_icon",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CheckProfileStartCodeRequest extends Message {
  constructor(data) {
    super();
    this.email = "";
    this.startCode = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CheckProfileStartCodeRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CheckProfileStartCodeRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CheckProfileStartCodeRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CheckProfileStartCodeRequest, a, b);
  }
}
CheckProfileStartCodeRequest.runtime = proto3;
CheckProfileStartCodeRequest.typeName = "domain.CheckProfileStartCodeRequest";
CheckProfileStartCodeRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "start_code",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CheckProfileStartCodeResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CheckProfileStartCodeResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CheckProfileStartCodeResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CheckProfileStartCodeResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CheckProfileStartCodeResponse, a, b);
  }
}
CheckProfileStartCodeResponse.runtime = proto3;
CheckProfileStartCodeResponse.typeName = "domain.CheckProfileStartCodeResponse";
CheckProfileStartCodeResponse.fields = proto3.util.newFieldList(() => []);
({
  typeName: "domain.AccountService",
  methods: {
    /**
     * - InvalidEmail (20101)
     * - Internal (10500)
     *
     * @generated from rpc domain.AccountService.GetRegistrationInfo
     */
    getRegistrationInfo: {
      name: "GetRegistrationInfo",
      I: GetRegistrationInfoRequest,
      O: GetRegistrationInfoResponse,
      kind: MethodKind.Unary
    },
    /**
     * - EmailTaken (20100): email address taken, backup code is available
     * - InvalidEmail (20101): invalid email address
     * - EmailInviteNotActive (20106): email belongs to an org profile that has no active email invite
     * - EmailTakenNotRecoverable (20107): email address taken, no backup code available
     * - ProfileNotFound (70400): profile not found, or is not an organization profile
     * - MissingProfileAuthenticatorLock (70410)
     * - InvalidProfileSignature (70420)
     * - NotAllowedForProfile (70433): service profile must be registered as service user
     * - WebathnDataError (1000401): there is a parsing error with the webauthn response
     * - WebauthnRequestNotFound (1000402)
     * - WebauthnValidateError (1000400): there is a cryptographic error with the webauthn response
     * - WebauthnInvalidTransport (1000403): tried to register with passkey
     * - StartCodeInvalid (70430)
     * - StartCodeBlocked (70431)
     * - StartCodeMissing (70432)
     * - Internal (10500): internal server error
     * - BadRequest (10400): no authenticators sent
     *
     * @generated from rpc domain.AccountService.CreateWithProfile
     */
    createWithProfile: {
      name: "CreateWithProfile",
      I: CreateAccountWithProfileRequest,
      O: CreateAccountWithProfileResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - InvalidLocale (20105): invalid locale
     * - MalformedUserClientSettings (20108): user settings are not valid json
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AccountService.Update
     */
    update: {
      name: "Update",
      I: UpdateAccountRequest,
      O: UpdateAccountResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AccountService.CreateReferrer
     */
    createReferrer: {
      name: "CreateReferrer",
      I: CreateReferrerRequest,
      O: CreateReferrerResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AccountService.AddAchievements
     */
    addAchievements: {
      name: "AddAchievements",
      I: AddAchievementsRequest,
      O: AddAchievementsResponse,
      kind: MethodKind.Unary
    },
    /**
     * Deprecated, use ProfileService.VerifyEmailAddress instead
     * TODO: remove this (min client version 2024-08-05)
     * errors:
     * - PermissionDenied (10100): the credentials provided didn't match the verification token
     * - UserNotFound (20400): no user with that email address found
     * - InvalidVerificationToken (20460): the verification token provided is invalid or outdated or the email has been verified for another account
     * - Internal (10500): internal server error
     * This endpoint can be called with or without credentials. If credentials are given, they must
     * match with the verification token.
     *
     * @generated from rpc domain.AccountService.VerifyEmailAddress
     */
    verifyEmailAddress: {
      name: "VerifyEmailAddress",
      I: VerifyEmailAddressRequest,
      O: VerifyEmailAddressResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - InvalidEmail (20101): invalid email address
     * - UserNotFound (20400): user not found
     * - ProfileNotFound (70400): profile not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AccountService.List
     */
    list: {
      name: "List",
      I: ListAccountsRequest,
      O: ListAccountsResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - InvalidEmail (20101): invalid email address (only if fail_fast is set)
     * - UserNotFound (20400): user not found (only if fail_fast is set)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AccountService.ResolveEmails
     */
    resolveEmails: {
      name: "ResolveEmails",
      I: ResolveEmailsRequest,
      O: ResolveEmailsResponse,
      kind: MethodKind.Unary
    },
    /**
     * no errors, this is a static endpoint
     *
     * @generated from rpc domain.AccountService.GetPaddleConfig
     */
    getPaddleConfig: {
      name: "GetPaddleConfig",
      I: GetPaddleConfigRequest,
      O: GetPaddleConfigResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - OrganizationMissingAdmin (60410): user is last admin in an organization with other users
     * - UserNotFound (20400): user not found (this should never happen)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AccountService.Delete
     */
    delete: {
      name: "Delete",
      I: DeleteAccountRequest,
      O: DeleteAccountResponse,
      kind: MethodKind.Unary
    }
  }
});
class ModifyAuthenticatorsRequest extends Message {
  constructor(data) {
    super();
    this.createAuthenticatorOps = [];
    this.deleteAuthenticatorIds = [];
    this.authenticatorBlock = new Uint8Array(0);
    this.authenticatorBlockSignature = new Uint8Array(0);
    this.profiles = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyAuthenticatorsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyAuthenticatorsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyAuthenticatorsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyAuthenticatorsRequest, a, b);
  }
}
ModifyAuthenticatorsRequest.runtime = proto3;
ModifyAuthenticatorsRequest.typeName = "domain.ModifyAuthenticatorsRequest";
ModifyAuthenticatorsRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "create_authenticator_ops", kind: "message", T: AuthenticatorCreationData, repeated: true },
  { no: 2, name: "delete_authenticator_ids", kind: "scalar", T: 9, repeated: true },
  {
    no: 3,
    name: "authenticator_block",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "authenticator_block_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 5, name: "profiles", kind: "message", T: ProfileRegenerateData, repeated: true }
]);
class ModifyAuthenticatorsResponse extends Message {
  constructor(data) {
    super();
    this.authenticatorIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyAuthenticatorsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyAuthenticatorsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyAuthenticatorsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyAuthenticatorsResponse, a, b);
  }
}
ModifyAuthenticatorsResponse.runtime = proto3;
ModifyAuthenticatorsResponse.typeName = "domain.ModifyAuthenticatorsResponse";
ModifyAuthenticatorsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  { no: 2, name: "authenticator_ids", kind: "scalar", T: 9, repeated: true }
]);
class SetDeviceTokenRequest extends Message {
  constructor(data) {
    super();
    this.fcmDeviceToken = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SetDeviceTokenRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SetDeviceTokenRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SetDeviceTokenRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SetDeviceTokenRequest, a, b);
  }
}
SetDeviceTokenRequest.runtime = proto3;
SetDeviceTokenRequest.typeName = "domain.SetDeviceTokenRequest";
SetDeviceTokenRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 3,
    name: "fcm_device_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SetDeviceTokenResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SetDeviceTokenResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SetDeviceTokenResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SetDeviceTokenResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SetDeviceTokenResponse, a, b);
  }
}
SetDeviceTokenResponse.runtime = proto3;
SetDeviceTokenResponse.typeName = "domain.SetDeviceTokenResponse";
SetDeviceTokenResponse.fields = proto3.util.newFieldList(() => []);
class ListAuthenticatorsRequest extends Message {
  constructor(data) {
    super();
    this.latestAuthenticatorBlockHash = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListAuthenticatorsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListAuthenticatorsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListAuthenticatorsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListAuthenticatorsRequest, a, b);
  }
}
ListAuthenticatorsRequest.runtime = proto3;
ListAuthenticatorsRequest.typeName = "domain.ListAuthenticatorsRequest";
ListAuthenticatorsRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "latest_authenticator_block_hash",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class ListAuthenticatorsResponse extends Message {
  constructor(data) {
    super();
    this.authenticators = [];
    this.authenticatorBlocks = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListAuthenticatorsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListAuthenticatorsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListAuthenticatorsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListAuthenticatorsResponse, a, b);
  }
}
ListAuthenticatorsResponse.runtime = proto3;
ListAuthenticatorsResponse.typeName = "domain.ListAuthenticatorsResponse";
ListAuthenticatorsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "authenticators", kind: "message", T: Authenticator, repeated: true },
  { no: 2, name: "authenticator_blocks", kind: "message", T: AuthenticatorBlock, repeated: true }
]);
class CreateInitialAuthenticatorBlockRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateInitialAuthenticatorBlockRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateInitialAuthenticatorBlockRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateInitialAuthenticatorBlockRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateInitialAuthenticatorBlockRequest, a, b);
  }
}
CreateInitialAuthenticatorBlockRequest.runtime = proto3;
CreateInitialAuthenticatorBlockRequest.typeName = "domain.CreateInitialAuthenticatorBlockRequest";
CreateInitialAuthenticatorBlockRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "authenticator_block", kind: "message", T: AuthenticatorBlock }
]);
class CreateInitialAuthenticatorBlockResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateInitialAuthenticatorBlockResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateInitialAuthenticatorBlockResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateInitialAuthenticatorBlockResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateInitialAuthenticatorBlockResponse, a, b);
  }
}
CreateInitialAuthenticatorBlockResponse.runtime = proto3;
CreateInitialAuthenticatorBlockResponse.typeName = "domain.CreateInitialAuthenticatorBlockResponse";
CreateInitialAuthenticatorBlockResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
({
  typeName: "domain.AuthenticatorService",
  methods: {
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - AuthenticatorBlockOutOfSync (40100): the authenticator blocks parent hash does not match the latest authenticator block
     * - AuthenticatorNotFound (40400): authenticator not found
     * - MissingAuthenticatorBlock (40430): the request is lacking a follow-up authenticator block
     * - VaultNotFound (50400): vault not found
     * - VaultOutOfSync (50100): latest_commit_id does not match
     * - EmptyCommit (50200): commit blob is empty
     * - MissingLock (50410): a lock is missing for regneration or no keks were provided for a new authenticator
     * - MissingVault (50420): VaultRegenerateData is missing for a vault
     * - WebauthnValidateError (80400)
     * - WebauthnDataError (80401)
     * - WebauthnRequestNotFound (80402)
     * - MissingWebauthnCredential (80404)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AuthenticatorService.Modify
     */
    modify: {
      name: "Modify",
      I: ModifyAuthenticatorsRequest,
      O: ModifyAuthenticatorsResponse,
      kind: MethodKind.Unary
    },
    /**
     * DEPRECATED
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - AuthenticatorNotFound (40400): combination of authenticator and user not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AuthenticatorService.SetDeviceToken
     */
    setDeviceToken: {
      name: "SetDeviceToken",
      I: SetDeviceTokenRequest,
      O: SetDeviceTokenResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - AuthenticatorBlockNotFound (40440): the authenticator block with given hash was not found or belongs to another user
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AuthenticatorService.List
     */
    list: {
      name: "List",
      I: ListAuthenticatorsRequest,
      O: ListAuthenticatorsResponse,
      kind: MethodKind.Unary
    },
    /**
     * TODO: deprecate and later remove this endpoint once migration to authenticator blocks is completed
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - AuthenticatorBlockExists (40450): the account already has an authenticator block
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.AuthenticatorService.CreateInitialAuthenticatorBlock
     */
    createInitialAuthenticatorBlock: {
      name: "CreateInitialAuthenticatorBlock",
      I: CreateInitialAuthenticatorBlockRequest,
      O: CreateInitialAuthenticatorBlockResponse,
      kind: MethodKind.Unary
    }
  }
});
({
  typeName: "domain.ChannelService",
  methods: {
    /**
     * errors:
     * - MissingCredentials (30100): exposed == false and credentials are missing
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - PermissionDenied (10100): exposed == false and user_id does not match token
     * - UserNotFound (20400): user not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ChannelService.Create
     */
    create: {
      name: "Create",
      I: CreateChannelRequest,
      O: CreateChannelResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): credentials are missing
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - AuthenticatorNotFound (40400): authenticator not found
     * - AuthenticatorChannelNotFound (40410): channel not found
     * - AuthenticatorChannelAlreadyClaimed (40411): channel was already claimed
     * - PermissionDenied (10100): channel does not belong to user
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ChannelService.Claim
     */
    claim: {
      name: "Claim",
      I: ClaimChannelRequest,
      O: ClaimChannelResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): channel is not exposed and no valid credentials were provided
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - PermissionDenied (10100): channel does not belong to user
     * - InvalidRecipient (40500): invalid recipient
     * - Timeout (10200): timeout, client might retry
     * - AuthenticatorChannelNotFound (40410): channel not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ChannelService.Read
     */
    read: {
      name: "Read",
      I: ReadChannelRequest,
      O: ReadChannelResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): channel is not exposed and no valid credentials were provided
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - PermissionDenied (10100): channel does not belong to user
     * - InvalidRecipient (40500): invalid recipient
     * - AuthenticatorChannelNotFound (40410): channel not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ChannelService.Write
     */
    write: {
      name: "Write",
      I: WriteChannelRequest,
      O: WriteChannelResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): channel is not exposed and no valid credentials were provided
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - PermissionDenied (10100): channel does not belong to user
     * - AuthenticatorChannelNotFound (40410): channel not found
     * - Internal (10500)(10500): internal server error
     *
     * @generated from rpc domain.ChannelService.Delete
     */
    delete: {
      name: "Delete",
      I: DeleteChannelRequest,
      O: DeleteChannelResponse,
      kind: MethodKind.Unary
    }
  }
});
class ListChildOrganizationsRequest extends Message {
  constructor(data) {
    super();
    this.parentOrganizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListChildOrganizationsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListChildOrganizationsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListChildOrganizationsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListChildOrganizationsRequest, a, b);
  }
}
ListChildOrganizationsRequest.runtime = proto3;
ListChildOrganizationsRequest.typeName = "domain.ListChildOrganizationsRequest";
ListChildOrganizationsRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "parent_organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ListChildOrganizationsResponse extends Message {
  constructor(data) {
    super();
    this.childOrganizations = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListChildOrganizationsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListChildOrganizationsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListChildOrganizationsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListChildOrganizationsResponse, a, b);
  }
}
ListChildOrganizationsResponse.runtime = proto3;
ListChildOrganizationsResponse.typeName = "domain.ListChildOrganizationsResponse";
ListChildOrganizationsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "child_organizations", kind: "message", T: ListChildOrganizationsResponse_ChildOrganization, repeated: true }
]);
class ListChildOrganizationsResponse_ChildOrganization extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.name = "";
    this.licenseCount = 0;
    this.users = [];
    this.managers = [];
    this.parentOrganizationMetadata = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListChildOrganizationsResponse_ChildOrganization().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListChildOrganizationsResponse_ChildOrganization().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListChildOrganizationsResponse_ChildOrganization().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListChildOrganizationsResponse_ChildOrganization, a, b);
  }
}
ListChildOrganizationsResponse_ChildOrganization.runtime = proto3;
ListChildOrganizationsResponse_ChildOrganization.typeName = "domain.ListChildOrganizationsResponse.ChildOrganization";
ListChildOrganizationsResponse_ChildOrganization.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "license_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 4, name: "users", kind: "message", T: ListChildOrganizationsResponse_ChildOrganization_User, repeated: true },
  { no: 5, name: "managers", kind: "message", T: ListChildOrganizationsResponse_ChildOrganization_Manager, repeated: true },
  { no: 6, name: "created_at", kind: "message", T: Timestamp },
  {
    no: 7,
    name: "parent_organization_metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ListChildOrganizationsResponse_ChildOrganization_User extends Message {
  constructor(data) {
    super();
    this.isAdmin = false;
    this.isNotConnected = false;
    this.hasStartCode = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListChildOrganizationsResponse_ChildOrganization_User().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListChildOrganizationsResponse_ChildOrganization_User().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListChildOrganizationsResponse_ChildOrganization_User().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListChildOrganizationsResponse_ChildOrganization_User, a, b);
  }
}
ListChildOrganizationsResponse_ChildOrganization_User.runtime = proto3;
ListChildOrganizationsResponse_ChildOrganization_User.typeName = "domain.ListChildOrganizationsResponse.ChildOrganization.User";
ListChildOrganizationsResponse_ChildOrganization_User.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_admin",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "is_not_connected",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 3,
    name: "has_start_code",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 4, name: "last_active_at", kind: "message", T: Timestamp }
]);
class ListChildOrganizationsResponse_ChildOrganization_Manager extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    this.parentOrganizationProfileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListChildOrganizationsResponse_ChildOrganization_Manager().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListChildOrganizationsResponse_ChildOrganization_Manager().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListChildOrganizationsResponse_ChildOrganization_Manager().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListChildOrganizationsResponse_ChildOrganization_Manager, a, b);
  }
}
ListChildOrganizationsResponse_ChildOrganization_Manager.runtime = proto3;
ListChildOrganizationsResponse_ChildOrganization_Manager.typeName = "domain.ListChildOrganizationsResponse.ChildOrganization.Manager";
ListChildOrganizationsResponse_ChildOrganization_Manager.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "parent_organization_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class AddManagerRequest extends Message {
  constructor(data) {
    super();
    this.childOrganizationId = "";
    this.parentOrganizationProfileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AddManagerRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AddManagerRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AddManagerRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AddManagerRequest, a, b);
  }
}
AddManagerRequest.runtime = proto3;
AddManagerRequest.typeName = "domain.AddManagerRequest";
AddManagerRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "child_organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "parent_organization_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "profile", kind: "message", T: ProfileData },
  { no: 4, name: "personal_vault_data", kind: "message", T: VaultCreationData },
  { no: 5, name: "admin_profile_lock", kind: "message", T: ProfileProfileLock },
  { no: 6, name: "legacy_admin_vault_lock", kind: "message", T: VaultLockCreationData }
]);
class AddManagerResponse extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AddManagerResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AddManagerResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AddManagerResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AddManagerResponse, a, b);
  }
}
AddManagerResponse.runtime = proto3;
AddManagerResponse.typeName = "domain.AddManagerResponse";
AddManagerResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class UpdateChildOrganizationRequest extends Message {
  constructor(data) {
    super();
    this.childOrganizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateChildOrganizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateChildOrganizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateChildOrganizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateChildOrganizationRequest, a, b);
  }
}
UpdateChildOrganizationRequest.runtime = proto3;
UpdateChildOrganizationRequest.typeName = "domain.UpdateChildOrganizationRequest";
UpdateChildOrganizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "child_organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 9, name: "parent_organization_metadata", kind: "message", T: StringValue }
]);
class UpdateChildOrganizationResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateChildOrganizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateChildOrganizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateChildOrganizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateChildOrganizationResponse, a, b);
  }
}
UpdateChildOrganizationResponse.runtime = proto3;
UpdateChildOrganizationResponse.typeName = "domain.UpdateChildOrganizationResponse";
UpdateChildOrganizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
({
  typeName: "domain.ChildOrganizationService",
  methods: {
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationNotFound (60400): not member of the given parent organization
     * - Internal (10500)
     *
     * @generated from rpc domain.ChildOrganizationService.List
     */
    list: {
      name: "List",
      I: ListChildOrganizationsRequest,
      O: ListChildOrganizationsResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - ProfileNotFound (70400): profile in parent organization not found
     * - UserNotFound (20400): profile in parent organization is free
     * - UserAlreadyInOrganization(60401)
     * - EmailTaken(20100): A disconnected profile with the same email already exists in the child organization
     * - OrganizationNotFound (60400): not member of the parent or child organization or organization is no child organization
     * - OrganizationInsufficientAccess (60100): not admin of the child organization
     * - BadRequest (10400)
     * - ProfileOutOfSync (70411)
     * - MissingProfileProfileLock (70412): missing admin profile lock (for admin-profile-enabled orgs)
     * - AuthenticatorNotFound (40400): additional authenticator lock provided
     * - MissingProfileAuthenticatorLock (70410)
     * - VaultOutOfSync (50100)
     * - VaultNotFound (50400)
     * - MissingVault (50420): Missing personal vault data
     * - MissingVaultProfileLock (50411): missing personal vault lock or admin vault lock
     * - Internal (10500): Internal server error
     *
     * @generated from rpc domain.ChildOrganizationService.AddManager
     */
    addManager: {
      name: "AddManager",
      I: AddManagerRequest,
      O: AddManagerResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - OrganizationInsufficientAccess (60100): not manager of the given organzation
     * - OrganizationNotFound (60400): not member of the given organization
     * - Internal (10500):
     *
     * @generated from rpc domain.ChildOrganizationService.Update
     */
    update: {
      name: "Update",
      I: UpdateChildOrganizationRequest,
      O: UpdateChildOrganizationResponse,
      kind: MethodKind.Unary
    }
  }
});
({
  typeName: "domain.CredentialService",
  methods: {
    /**
     * errors:
     * - UserNotFound (20400): email does not belong to a user
     * - AuthenticatorNotFound (40400): backup authenticator was not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.CredentialService.CreateChallenge
     */
    createChallenge: {
      name: "CreateChallenge",
      I: CreateChallengeRequest,
      O: CreateChallengeResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.CredentialService.CreateLongPollChannelChallenge
     */
    createLongPollChannelChallenge: {
      name: "CreateLongPollChannelChallenge",
      I: CreateLongPollChannelChallengeRequest,
      O: CreateLongPollChannelChallengeResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.CredentialService.CompleteLongPollChannel
     */
    completeLongPollChannel: {
      name: "CompleteLongPollChannel",
      I: CompleteLongPollChannelRequest,
      O: CompleteLongPollChannelResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - InvalidTimeout (20420): expires_at of given session_unlock ist already expired
     * - AuthenticatorNotFound (40400): invalid combination of user_id and authenticator_id
     * - InvalidChallenge (30410): invalid challenge
     * - InvalidSignature (30400): invalid response fo the hcallenge
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.CredentialService.CreateTokens
     */
    createTokens: {
      name: "CreateTokens",
      I: CreateTokensRequest,
      O: CreateTokensResponse,
      kind: MethodKind.Unary
    },
    /**
     * - MissingCredentials (30100)
     * - OrganizationNotFound (60400): not member of the given organization, or auditlog not enabled
     * - Internal (10500)
     *
     * @generated from rpc domain.CredentialService.CreateAuditlogWriteToken
     */
    createAuditlogWriteToken: {
      name: "CreateAuditlogWriteToken",
      I: CreateAuditlogWriteTokenRequest,
      O: CreateAuditlogWriteTokenResponse,
      kind: MethodKind.Unary
    },
    /**
     * - MissingCredentials (30100)
     * - OrganizationNotFound (60400): not member of the given organization, or auditlog not enabled
     * - OrganizationInsufficientAccess (60100)
     * - Internal (10500)
     *
     * @generated from rpc domain.CredentialService.CreateAuditlogAdminToken
     */
    createAuditlogAdminToken: {
      name: "CreateAuditlogAdminToken",
      I: CreateAuditlogAdminTokenRequest,
      O: CreateAuditlogAdminTokenResponse,
      kind: MethodKind.Unary
    },
    /**
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - PermissionDenied (10100)
     * - Internal (10500)
     *
     * @generated from rpc domain.CredentialService.CreateLFDOverridesAdminToken
     */
    createLFDOverridesAdminToken: {
      name: "CreateLFDOverridesAdminToken",
      I: CreateLFDOverridesAdminTokenRequest,
      O: CreateLFDOverridesAdminTokenResponse,
      kind: MethodKind.Unary
    },
    /**
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - Internal (10500)
     *
     * @generated from rpc domain.CredentialService.RefreshToken
     */
    refreshToken: {
      name: "RefreshToken",
      I: RefreshTokenRequest,
      O: RefreshTokenResponse,
      kind: MethodKind.Unary
    }
  }
});
class PingRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new PingRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new PingRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new PingRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(PingRequest, a, b);
  }
}
PingRequest.runtime = proto3;
PingRequest.typeName = "domain.PingRequest";
PingRequest.fields = proto3.util.newFieldList(() => []);
class PingResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new PingResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new PingResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new PingResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(PingResponse, a, b);
  }
}
PingResponse.runtime = proto3;
PingResponse.typeName = "domain.PingResponse";
PingResponse.fields = proto3.util.newFieldList(() => []);
({
  typeName: "domain.HealthService",
  methods: {
    /**
     * @generated from rpc domain.HealthService.Ping
     */
    ping: {
      name: "Ping",
      I: PingRequest,
      O: PingResponse,
      kind: MethodKind.Unary
    }
  }
});
class EntraGetAuthorizeUriRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.redirectUri = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraGetAuthorizeUriRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraGetAuthorizeUriRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraGetAuthorizeUriRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraGetAuthorizeUriRequest, a, b);
  }
}
EntraGetAuthorizeUriRequest.runtime = proto3;
EntraGetAuthorizeUriRequest.typeName = "domain.EntraGetAuthorizeUriRequest";
EntraGetAuthorizeUriRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "redirect_uri",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class EntraGetAuthorizeUriResponse extends Message {
  constructor(data) {
    super();
    this.uri = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraGetAuthorizeUriResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraGetAuthorizeUriResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraGetAuthorizeUriResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraGetAuthorizeUriResponse, a, b);
  }
}
EntraGetAuthorizeUriResponse.runtime = proto3;
EntraGetAuthorizeUriResponse.typeName = "domain.EntraGetAuthorizeUriResponse";
EntraGetAuthorizeUriResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "uri",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class EntraFinishAuthorizationRequest extends Message {
  constructor(data) {
    super();
    this.resultQueryString = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraFinishAuthorizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraFinishAuthorizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraFinishAuthorizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraFinishAuthorizationRequest, a, b);
  }
}
EntraFinishAuthorizationRequest.runtime = proto3;
EntraFinishAuthorizationRequest.typeName = "domain.EntraFinishAuthorizationRequest";
EntraFinishAuthorizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "result_query_string",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class EntraFinishAuthorizationResponse extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraFinishAuthorizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraFinishAuthorizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraFinishAuthorizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraFinishAuthorizationResponse, a, b);
  }
}
EntraFinishAuthorizationResponse.runtime = proto3;
EntraFinishAuthorizationResponse.typeName = "domain.EntraFinishAuthorizationResponse";
EntraFinishAuthorizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class EntraGetTenantRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.forceRefresh = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraGetTenantRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraGetTenantRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraGetTenantRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraGetTenantRequest, a, b);
  }
}
EntraGetTenantRequest.runtime = proto3;
EntraGetTenantRequest.typeName = "domain.EntraGetTenantRequest";
EntraGetTenantRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "force_refresh",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class EntraGetTenantResponse extends Message {
  constructor(data) {
    super();
    this.users = [];
    this.groups = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraGetTenantResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraGetTenantResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraGetTenantResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraGetTenantResponse, a, b);
  }
}
EntraGetTenantResponse.runtime = proto3;
EntraGetTenantResponse.typeName = "domain.EntraGetTenantResponse";
EntraGetTenantResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "updated_at", kind: "message", T: Timestamp },
  { no: 2, name: "users", kind: "message", T: EntraGetTenantResponse_User, repeated: true },
  { no: 3, name: "groups", kind: "message", T: EntraGetTenantResponse_Group, repeated: true }
]);
class EntraGetTenantResponse_User extends Message {
  constructor(data) {
    super();
    this.entraUserId = "";
    this.email = "";
    this.memberOf = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraGetTenantResponse_User().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraGetTenantResponse_User().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraGetTenantResponse_User().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraGetTenantResponse_User, a, b);
  }
}
EntraGetTenantResponse_User.runtime = proto3;
EntraGetTenantResponse_User.typeName = "domain.EntraGetTenantResponse.User";
EntraGetTenantResponse_User.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "entra_user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "member_of", kind: "scalar", T: 9, repeated: true }
]);
class EntraGetTenantResponse_Group extends Message {
  constructor(data) {
    super();
    this.entraGroupId = "";
    this.name = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraGetTenantResponse_Group().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraGetTenantResponse_Group().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraGetTenantResponse_Group().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraGetTenantResponse_Group, a, b);
  }
}
EntraGetTenantResponse_Group.runtime = proto3;
EntraGetTenantResponse_Group.typeName = "domain.EntraGetTenantResponse.Group";
EntraGetTenantResponse_Group.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "entra_group_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class EntraClearAuthorizationRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraClearAuthorizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraClearAuthorizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraClearAuthorizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraClearAuthorizationRequest, a, b);
  }
}
EntraClearAuthorizationRequest.runtime = proto3;
EntraClearAuthorizationRequest.typeName = "domain.EntraClearAuthorizationRequest";
EntraClearAuthorizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class EntraClearAuthorizationResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EntraClearAuthorizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EntraClearAuthorizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EntraClearAuthorizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EntraClearAuthorizationResponse, a, b);
  }
}
EntraClearAuthorizationResponse.runtime = proto3;
EntraClearAuthorizationResponse.typeName = "domain.EntraClearAuthorizationResponse";
EntraClearAuthorizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class CsvSetIntegrationDataRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.dataJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CsvSetIntegrationDataRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CsvSetIntegrationDataRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CsvSetIntegrationDataRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CsvSetIntegrationDataRequest, a, b);
  }
}
CsvSetIntegrationDataRequest.runtime = proto3;
CsvSetIntegrationDataRequest.typeName = "domain.CsvSetIntegrationDataRequest";
CsvSetIntegrationDataRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "data_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CsvSetIntegrationDataResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CsvSetIntegrationDataResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CsvSetIntegrationDataResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CsvSetIntegrationDataResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CsvSetIntegrationDataResponse, a, b);
  }
}
CsvSetIntegrationDataResponse.runtime = proto3;
CsvSetIntegrationDataResponse.typeName = "domain.CsvSetIntegrationDataResponse";
CsvSetIntegrationDataResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class CsvGetIntegrationDataRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CsvGetIntegrationDataRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CsvGetIntegrationDataRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CsvGetIntegrationDataRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CsvGetIntegrationDataRequest, a, b);
  }
}
CsvGetIntegrationDataRequest.runtime = proto3;
CsvGetIntegrationDataRequest.typeName = "domain.CsvGetIntegrationDataRequest";
CsvGetIntegrationDataRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CsvGetIntegrationDataResponse extends Message {
  constructor(data) {
    super();
    this.dataJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CsvGetIntegrationDataResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CsvGetIntegrationDataResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CsvGetIntegrationDataResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CsvGetIntegrationDataResponse, a, b);
  }
}
CsvGetIntegrationDataResponse.runtime = proto3;
CsvGetIntegrationDataResponse.typeName = "domain.CsvGetIntegrationDataResponse";
CsvGetIntegrationDataResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "data_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GWorkspaceGetAuthorizeUriRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.redirectUri = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceGetAuthorizeUriRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceGetAuthorizeUriRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceGetAuthorizeUriRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceGetAuthorizeUriRequest, a, b);
  }
}
GWorkspaceGetAuthorizeUriRequest.runtime = proto3;
GWorkspaceGetAuthorizeUriRequest.typeName = "domain.GWorkspaceGetAuthorizeUriRequest";
GWorkspaceGetAuthorizeUriRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "redirect_uri",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GWorkspaceGetAuthorizeUriResponse extends Message {
  constructor(data) {
    super();
    this.uri = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceGetAuthorizeUriResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceGetAuthorizeUriResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceGetAuthorizeUriResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceGetAuthorizeUriResponse, a, b);
  }
}
GWorkspaceGetAuthorizeUriResponse.runtime = proto3;
GWorkspaceGetAuthorizeUriResponse.typeName = "domain.GWorkspaceGetAuthorizeUriResponse";
GWorkspaceGetAuthorizeUriResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "uri",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GWorkspaceFinishAuthorizationRequest extends Message {
  constructor(data) {
    super();
    this.resultQueryString = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceFinishAuthorizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceFinishAuthorizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceFinishAuthorizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceFinishAuthorizationRequest, a, b);
  }
}
GWorkspaceFinishAuthorizationRequest.runtime = proto3;
GWorkspaceFinishAuthorizationRequest.typeName = "domain.GWorkspaceFinishAuthorizationRequest";
GWorkspaceFinishAuthorizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "result_query_string",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GWorkspaceFinishAuthorizationResponse extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceFinishAuthorizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceFinishAuthorizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceFinishAuthorizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceFinishAuthorizationResponse, a, b);
  }
}
GWorkspaceFinishAuthorizationResponse.runtime = proto3;
GWorkspaceFinishAuthorizationResponse.typeName = "domain.GWorkspaceFinishAuthorizationResponse";
GWorkspaceFinishAuthorizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GWorkspaceClearAuthorizationRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceClearAuthorizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceClearAuthorizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceClearAuthorizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceClearAuthorizationRequest, a, b);
  }
}
GWorkspaceClearAuthorizationRequest.runtime = proto3;
GWorkspaceClearAuthorizationRequest.typeName = "domain.GWorkspaceClearAuthorizationRequest";
GWorkspaceClearAuthorizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GWorkspaceClearAuthorizationResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceClearAuthorizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceClearAuthorizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceClearAuthorizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceClearAuthorizationResponse, a, b);
  }
}
GWorkspaceClearAuthorizationResponse.runtime = proto3;
GWorkspaceClearAuthorizationResponse.typeName = "domain.GWorkspaceClearAuthorizationResponse";
GWorkspaceClearAuthorizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class GWorkspaceListRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.forceRefresh = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceListRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceListRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceListRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceListRequest, a, b);
  }
}
GWorkspaceListRequest.runtime = proto3;
GWorkspaceListRequest.typeName = "domain.GWorkspaceListRequest";
GWorkspaceListRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "force_refresh",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class GWorkspaceListResponse extends Message {
  constructor(data) {
    super();
    this.users = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceListResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceListResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceListResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceListResponse, a, b);
  }
}
GWorkspaceListResponse.runtime = proto3;
GWorkspaceListResponse.typeName = "domain.GWorkspaceListResponse";
GWorkspaceListResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "updated_at", kind: "message", T: Timestamp },
  { no: 2, name: "users", kind: "message", T: GWorkspaceListResponse_User, repeated: true }
]);
class GWorkspaceListResponse_User extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GWorkspaceListResponse_User().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GWorkspaceListResponse_User().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GWorkspaceListResponse_User().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GWorkspaceListResponse_User, a, b);
  }
}
GWorkspaceListResponse_User.runtime = proto3;
GWorkspaceListResponse_User.typeName = "domain.GWorkspaceListResponse.User";
GWorkspaceListResponse_User.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
({
  typeName: "domain.IntegrationsService",
  methods: {
    /**
     * no errors
     *
     * @generated from rpc domain.IntegrationsService.EntraGetAuthorizeUri
     */
    entraGetAuthorizeUri: {
      name: "EntraGetAuthorizeUri",
      I: EntraGetAuthorizeUriRequest,
      O: EntraGetAuthorizeUriResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - BadRequest (10400): result_query_string failed to parse
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationNotFound (60400)
     * - OrganizationInsufficientAccess (60100)
     * - IntegrationUnauthorized (80401): if authorization failed for unknown reasons
     * - IntegrationNotInitialized (80400): the user canceled the authorization flow
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.EntraFinishAuthorization
     */
    entraFinishAuthorization: {
      name: "EntraFinishAuthorization",
      I: EntraFinishAuthorizationRequest,
      O: EntraFinishAuthorizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationNotFound (60400)
     * - OrganizationInsufficientAccess (60100)
     * - IntegrationNotInitialized (80400)
     * - IntegrationUnauthorized (80401)
     * - IntegrationInternal (80500)
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.EntraGetTenant
     */
    entraGetTenant: {
      name: "EntraGetTenant",
      I: EntraGetTenantRequest,
      O: EntraGetTenantResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationNotFound (60400)
     * - OrganizationInsufficientAccess (60100)
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.EntraClearAuthorization
     */
    entraClearAuthorization: {
      name: "EntraClearAuthorization",
      I: EntraClearAuthorizationRequest,
      O: EntraClearAuthorizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationInsufficientAccess (60100)
     * - OrganizationNotFound (60400)
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.CsvSetIntegrationData
     */
    csvSetIntegrationData: {
      name: "CsvSetIntegrationData",
      I: CsvSetIntegrationDataRequest,
      O: CsvSetIntegrationDataResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationInsufficientAccess (60100)
     * - OrganizationNotFound (60400)
     * - IntegrationNotInitialized (80400)
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.CsvGetIntegrationData
     */
    csvGetIntegrationData: {
      name: "CsvGetIntegrationData",
      I: CsvGetIntegrationDataRequest,
      O: CsvGetIntegrationDataResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationInsufficientAccess (60100)
     * - IntegrationUnauthorized (80401): if authorization initialization failed for unknown reasons
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.GWorkspaceGetAuthorizeUri
     */
    gWorkspaceGetAuthorizeUri: {
      name: "GWorkspaceGetAuthorizeUri",
      I: GWorkspaceGetAuthorizeUriRequest,
      O: GWorkspaceGetAuthorizeUriResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationNotFound (60400)
     * - OrganizationInsufficientAccess (60100)
     * - IntegrationUnauthorized (80401): if authorization failed for unknown reasons
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.GWorkspaceFinishAuthorization
     */
    gWorkspaceFinishAuthorization: {
      name: "GWorkspaceFinishAuthorization",
      I: GWorkspaceFinishAuthorizationRequest,
      O: GWorkspaceFinishAuthorizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationNotFound (60400)
     * - OrganizationInsufficientAccess (60100)
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.GWorkspaceClearAuthorization
     */
    gWorkspaceClearAuthorization: {
      name: "GWorkspaceClearAuthorization",
      I: GWorkspaceClearAuthorizationRequest,
      O: GWorkspaceClearAuthorizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationNotFound (60400)
     * - OrganizationInsufficientAccess (60100)
     * - IntegrationNotInitialized (80400)
     * - IntegrationUnauthorized (80401)
     * - IntegrationInternal (80500)
     * - Internal (10500)
     *
     * @generated from rpc domain.IntegrationsService.GWorkspaceList
     */
    gWorkspaceList: {
      name: "GWorkspaceList",
      I: GWorkspaceListRequest,
      O: GWorkspaceListResponse,
      kind: MethodKind.Unary
    }
  }
});
class ReplaceLFDOverridesRequest extends Message {
  constructor(data) {
    super();
    this.overrideJson = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ReplaceLFDOverridesRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ReplaceLFDOverridesRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ReplaceLFDOverridesRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ReplaceLFDOverridesRequest, a, b);
  }
}
ReplaceLFDOverridesRequest.runtime = proto3;
ReplaceLFDOverridesRequest.typeName = "domain.ReplaceLFDOverridesRequest";
ReplaceLFDOverridesRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "override_json", kind: "scalar", T: 9, repeated: true }
]);
class ReplaceLFDOverridesResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ReplaceLFDOverridesResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ReplaceLFDOverridesResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ReplaceLFDOverridesResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ReplaceLFDOverridesResponse, a, b);
  }
}
ReplaceLFDOverridesResponse.runtime = proto3;
ReplaceLFDOverridesResponse.typeName = "domain.ReplaceLFDOverridesResponse";
ReplaceLFDOverridesResponse.fields = proto3.util.newFieldList(() => []);
class DeleteLFDOverridesRequest extends Message {
  constructor(data) {
    super();
    this.overrideIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteLFDOverridesRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteLFDOverridesRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteLFDOverridesRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteLFDOverridesRequest, a, b);
  }
}
DeleteLFDOverridesRequest.runtime = proto3;
DeleteLFDOverridesRequest.typeName = "domain.DeleteLFDOverridesRequest";
DeleteLFDOverridesRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "override_ids", kind: "scalar", T: 9, repeated: true }
]);
class DeleteLFDOverridesResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteLFDOverridesResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteLFDOverridesResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteLFDOverridesResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteLFDOverridesResponse, a, b);
  }
}
DeleteLFDOverridesResponse.runtime = proto3;
DeleteLFDOverridesResponse.typeName = "domain.DeleteLFDOverridesResponse";
DeleteLFDOverridesResponse.fields = proto3.util.newFieldList(() => []);
class ListLFDOverridesRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListLFDOverridesRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListLFDOverridesRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListLFDOverridesRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListLFDOverridesRequest, a, b);
  }
}
ListLFDOverridesRequest.runtime = proto3;
ListLFDOverridesRequest.typeName = "domain.ListLFDOverridesRequest";
ListLFDOverridesRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "last_known_overrides_update_time", kind: "message", T: Timestamp }
]);
class ListLFDOverridesResponse extends Message {
  constructor(data) {
    super();
    this.overridesJson = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ListLFDOverridesResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ListLFDOverridesResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ListLFDOverridesResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ListLFDOverridesResponse, a, b);
  }
}
ListLFDOverridesResponse.runtime = proto3;
ListLFDOverridesResponse.typeName = "domain.ListLFDOverridesResponse";
ListLFDOverridesResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "overrides_update_time", kind: "message", T: Timestamp },
  { no: 2, name: "overrides_json", kind: "scalar", T: 9, repeated: true }
]);
({
  typeName: "domain.LFDOverridesService",
  methods: {
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - BadRequest (10400): if json is malformed or missing required attributes
     * - Internal (10500)
     *
     * @generated from rpc domain.LFDOverridesService.Replace
     */
    replace: {
      name: "Replace",
      I: ReplaceLFDOverridesRequest,
      O: ReplaceLFDOverridesResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - Internal (10500)
     *
     * @generated from rpc domain.LFDOverridesService.Delete
     */
    delete: {
      name: "Delete",
      I: DeleteLFDOverridesRequest,
      O: DeleteLFDOverridesResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500)
     *
     * @generated from rpc domain.LFDOverridesService.List
     */
    list: {
      name: "List",
      I: ListLFDOverridesRequest,
      O: ListLFDOverridesResponse,
      kind: MethodKind.Unary
    }
  }
});
class ShowInboxRequest extends Message {
  constructor(data) {
    super();
    this.slug = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ShowInboxRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ShowInboxRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ShowInboxRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ShowInboxRequest, a, b);
  }
}
ShowInboxRequest.runtime = proto3;
ShowInboxRequest.typeName = "domain.ShowInboxRequest";
ShowInboxRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "slug",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ShowInboxResponse extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.generationId = "";
    this.publicKey = new Uint8Array(0);
    this.metadata = "";
    this.url = "";
    this.baseUrl = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ShowInboxResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ShowInboxResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ShowInboxResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ShowInboxResponse, a, b);
  }
}
ShowInboxResponse.runtime = proto3;
ShowInboxResponse.typeName = "domain.ShowInboxResponse";
ShowInboxResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "public_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 4,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 5, name: "organization_data", kind: "message", T: ShowInboxResponse_OrganizationData },
  {
    no: 6,
    name: "url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 7,
    name: "base_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ShowInboxResponse_OrganizationData extends Message {
  constructor(data) {
    super();
    this.name = "";
    this.icon = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ShowInboxResponse_OrganizationData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ShowInboxResponse_OrganizationData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ShowInboxResponse_OrganizationData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ShowInboxResponse_OrganizationData, a, b);
  }
}
ShowInboxResponse_OrganizationData.runtime = proto3;
ShowInboxResponse_OrganizationData.typeName = "domain.ShowInboxResponse.OrganizationData";
ShowInboxResponse_OrganizationData.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "icon",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateLoginInboxMessageRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.generationId = "";
    this.type = VaultMessageType.UNKNOWN;
    this.encryptedData = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateLoginInboxMessageRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateLoginInboxMessageRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateLoginInboxMessageRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateLoginInboxMessageRequest, a, b);
  }
}
CreateLoginInboxMessageRequest.runtime = proto3;
CreateLoginInboxMessageRequest.typeName = "domain.CreateLoginInboxMessageRequest";
CreateLoginInboxMessageRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "type", kind: "enum", T: proto3.getEnumType(VaultMessageType) },
  {
    no: 4,
    name: "encrypted_data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class CreateLoginInboxMessageResponse extends Message {
  constructor(data) {
    super();
    this.inboxMessageId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateLoginInboxMessageResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateLoginInboxMessageResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateLoginInboxMessageResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateLoginInboxMessageResponse, a, b);
  }
}
CreateLoginInboxMessageResponse.runtime = proto3;
CreateLoginInboxMessageResponse.typeName = "domain.CreateLoginInboxMessageResponse";
CreateLoginInboxMessageResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "inbox_message_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
({
  typeName: "domain.LoginInboxService",
  methods: {
    /**
     * errors:
     * - VaultNotFound (50400): no vault for this slug
     * - VaultInboxSlugInvalid (50470)
     * - Internal (10500)
     *
     * @generated from rpc domain.LoginInboxService.Show
     */
    show: {
      name: "Show",
      I: ShowInboxRequest,
      O: ShowInboxResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - VaultNotFound (50400)
     * - InvalidVaultMessageType (50463): vault message type not allowed for this endpoint
     * - VaultOutOfSync (50100)
     * - Internal (10500)
     *
     * @generated from rpc domain.LoginInboxService.CreateMessage
     */
    createMessage: {
      name: "CreateMessage",
      I: CreateLoginInboxMessageRequest,
      O: CreateLoginInboxMessageResponse,
      kind: MethodKind.Unary
    }
  }
});
class SubscriptionStatus extends Message {
  constructor(data) {
    super();
    this.status = { case: void 0 };
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus, a, b);
  }
}
SubscriptionStatus.runtime = proto3;
SubscriptionStatus.typeName = "domain.SubscriptionStatus";
SubscriptionStatus.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "status_paddle_active", kind: "message", T: SubscriptionStatus_PaddleActive, oneof: "status" },
  { no: 2, name: "status_paddle_past_due", kind: "message", T: SubscriptionStatus_PaddlePastDue, oneof: "status" },
  { no: 3, name: "status_paddle_paused_delinquent", kind: "message", T: SubscriptionStatus_PaddlePausedDelinquent, oneof: "status" },
  { no: 4, name: "status_paddle_paused_voluntary", kind: "message", T: SubscriptionStatus_PaddlePausedVoluntary, oneof: "status" },
  { no: 5, name: "status_paddle_deleted", kind: "message", T: SubscriptionStatus_PaddleDeleted, oneof: "status" },
  { no: 6, name: "status_trial", kind: "message", T: SubscriptionStatus_Trial, oneof: "status" },
  { no: 7, name: "status_custom", kind: "message", T: SubscriptionStatus_Custom, oneof: "status" },
  { no: 8, name: "status_active_free", kind: "message", T: SubscriptionStatus_ActiveFree, oneof: "status" },
  { no: 9, name: "status_example", kind: "message", T: SubscriptionStatus_Example, oneof: "status" }
]);
class SubscriptionStatus_PaddleActive extends Message {
  constructor(data) {
    super();
    this.baseUrl = "";
    this.freeMembers = 0;
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_PaddleActive().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_PaddleActive().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_PaddleActive().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_PaddleActive, a, b);
  }
}
SubscriptionStatus_PaddleActive.runtime = proto3;
SubscriptionStatus_PaddleActive.typeName = "domain.SubscriptionStatus.PaddleActive";
SubscriptionStatus_PaddleActive.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "base_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "next_bill_date", kind: "message", T: Timestamp },
  {
    no: 3,
    name: "free_members",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SubscriptionStatus_PaddlePastDue extends Message {
  constructor(data) {
    super();
    this.baseUrl = "";
    this.freeMembers = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_PaddlePastDue().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_PaddlePastDue().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_PaddlePastDue().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_PaddlePastDue, a, b);
  }
}
SubscriptionStatus_PaddlePastDue.runtime = proto3;
SubscriptionStatus_PaddlePastDue.typeName = "domain.SubscriptionStatus.PaddlePastDue";
SubscriptionStatus_PaddlePastDue.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "base_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "next_bill_date", kind: "message", T: Timestamp },
  {
    no: 3,
    name: "free_members",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class SubscriptionStatus_PaddlePausedDelinquent extends Message {
  constructor(data) {
    super();
    this.baseUrl = "";
    this.freeMembers = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_PaddlePausedDelinquent().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_PaddlePausedDelinquent().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_PaddlePausedDelinquent().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_PaddlePausedDelinquent, a, b);
  }
}
SubscriptionStatus_PaddlePausedDelinquent.runtime = proto3;
SubscriptionStatus_PaddlePausedDelinquent.typeName = "domain.SubscriptionStatus.PaddlePausedDelinquent";
SubscriptionStatus_PaddlePausedDelinquent.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "base_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "paused_at", kind: "message", T: Timestamp },
  { no: 3, name: "paused_from", kind: "message", T: Timestamp },
  {
    no: 4,
    name: "free_members",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class SubscriptionStatus_PaddlePausedVoluntary extends Message {
  constructor(data) {
    super();
    this.baseUrl = "";
    this.freeMembers = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_PaddlePausedVoluntary().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_PaddlePausedVoluntary().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_PaddlePausedVoluntary().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_PaddlePausedVoluntary, a, b);
  }
}
SubscriptionStatus_PaddlePausedVoluntary.runtime = proto3;
SubscriptionStatus_PaddlePausedVoluntary.typeName = "domain.SubscriptionStatus.PaddlePausedVoluntary";
SubscriptionStatus_PaddlePausedVoluntary.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "base_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "paused_at", kind: "message", T: Timestamp },
  { no: 3, name: "paused_from", kind: "message", T: Timestamp },
  {
    no: 4,
    name: "free_members",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class SubscriptionStatus_PaddleDeleted extends Message {
  constructor(data) {
    super();
    this.freeMembers = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_PaddleDeleted().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_PaddleDeleted().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_PaddleDeleted().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_PaddleDeleted, a, b);
  }
}
SubscriptionStatus_PaddleDeleted.runtime = proto3;
SubscriptionStatus_PaddleDeleted.typeName = "domain.SubscriptionStatus.PaddleDeleted";
SubscriptionStatus_PaddleDeleted.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "cancellation_effective_date", kind: "message", T: Timestamp },
  {
    no: 2,
    name: "free_members",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class SubscriptionStatus_Trial extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_Trial().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_Trial().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_Trial().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_Trial, a, b);
  }
}
SubscriptionStatus_Trial.runtime = proto3;
SubscriptionStatus_Trial.typeName = "domain.SubscriptionStatus.Trial";
SubscriptionStatus_Trial.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "trial_end_date", kind: "message", T: Timestamp }
]);
class SubscriptionStatus_ActiveFree extends Message {
  constructor(data) {
    super();
    this.freeMembers = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_ActiveFree().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_ActiveFree().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_ActiveFree().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_ActiveFree, a, b);
  }
}
SubscriptionStatus_ActiveFree.runtime = proto3;
SubscriptionStatus_ActiveFree.typeName = "domain.SubscriptionStatus.ActiveFree";
SubscriptionStatus_ActiveFree.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "free_members",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class SubscriptionStatus_Custom extends Message {
  constructor(data) {
    super();
    this.left = "";
    this.right = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_Custom().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_Custom().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_Custom().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_Custom, a, b);
  }
}
SubscriptionStatus_Custom.runtime = proto3;
SubscriptionStatus_Custom.typeName = "domain.SubscriptionStatus.Custom";
SubscriptionStatus_Custom.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "left",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "right",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SubscriptionStatus_Example extends Message {
  constructor(data) {
    super();
    this.left = "";
    this.right = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SubscriptionStatus_Example().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SubscriptionStatus_Example().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SubscriptionStatus_Example().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SubscriptionStatus_Example, a, b);
  }
}
SubscriptionStatus_Example.runtime = proto3;
SubscriptionStatus_Example.typeName = "domain.SubscriptionStatus.Example";
SubscriptionStatus_Example.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "left",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "right",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateOrganizationRequest extends Message {
  constructor(data) {
    super();
    this.name = "";
    this.icon = "";
    this.email = "";
    this.authenticatorBlock = new Uint8Array(0);
    this.authenticatorBlockSignature = new Uint8Array(0);
    this.personalVaultSuperuserEncryptedStorableVaultKey = new Uint8Array(0);
    this.personalVaultSuperuserEncryptedHighSecurityVaultKey = new Uint8Array(0);
    this.personalVaultSuperuserEncryptedVaultMessagePrivateKey = new Uint8Array(0);
    this.teamVaultSuperuserEncryptedStorableVaultKey = new Uint8Array(0);
    this.teamVaultSuperuserEncryptedHighSecurityVaultKey = new Uint8Array(0);
    this.teamVaultSuperuserEncryptedVaultMessagePrivateKey = new Uint8Array(0);
    this.teamAssociatedVaultSuperuserEncryptedStorableVaultKey = new Uint8Array(0);
    this.teamAssociatedVaultSuperuserEncryptedHighSecurityVaultKey = new Uint8Array(0);
    this.teamAssociatedVaultSuperuserEncryptedVaultMessagePrivateKey = new Uint8Array(0);
    this.contactJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateOrganizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateOrganizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateOrganizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateOrganizationRequest, a, b);
  }
}
CreateOrganizationRequest.runtime = proto3;
CreateOrganizationRequest.typeName = "domain.CreateOrganizationRequest";
CreateOrganizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "icon",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 17,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 16, name: "user_profile", kind: "message", T: ProfileData },
  { no: 21, name: "admin_profile", kind: "message", T: ProfileData },
  { no: 3, name: "authenticator", kind: "message", T: AuthenticatorData },
  { no: 4, name: "legacy_admin_vault_data", kind: "message", T: VaultCreationData },
  {
    no: 5,
    name: "authenticator_block",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 6,
    name: "authenticator_block_signature",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 23, name: "admin_vault_data", kind: "message", T: VaultCreationData },
  { no: 7, name: "personal_vault_data", kind: "message", T: VaultCreationData },
  {
    no: 8,
    name: "personal_vault_superuser_encrypted_storable_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 9,
    name: "personal_vault_superuser_encrypted_high_security_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 18,
    name: "personal_vault_superuser_encrypted_vault_message_private_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  { no: 10, name: "team_vault_data", kind: "message", T: VaultPairCreationData },
  {
    no: 11,
    name: "team_vault_superuser_encrypted_storable_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 12,
    name: "team_vault_superuser_encrypted_high_security_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 19,
    name: "team_vault_superuser_encrypted_vault_message_private_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 13,
    name: "team_associated_vault_superuser_encrypted_storable_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 14,
    name: "team_associated_vault_superuser_encrypted_high_security_vault_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 20,
    name: "team_associated_vault_superuser_encrypted_vault_message_private_key",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 15,
    name: "contact_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 22, name: "parent_organization_info", kind: "message", T: CreateOrganizationRequest_ParentOrganizationInfo }
]);
class CreateOrganizationRequest_ParentOrganizationInfo extends Message {
  constructor(data) {
    super();
    this.id = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateOrganizationRequest_ParentOrganizationInfo().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateOrganizationRequest_ParentOrganizationInfo().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateOrganizationRequest_ParentOrganizationInfo().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateOrganizationRequest_ParentOrganizationInfo, a, b);
  }
}
CreateOrganizationRequest_ParentOrganizationInfo.runtime = proto3;
CreateOrganizationRequest_ParentOrganizationInfo.typeName = "domain.CreateOrganizationRequest.ParentOrganizationInfo";
CreateOrganizationRequest_ParentOrganizationInfo.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateOrganizationResponse extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.superUserId = "";
    this.authenticatorId = "";
    this.legacyAdminVaultId = "";
    this.personalVaultId = "";
    this.teamVaultId = "";
    this.teamAssociatedVaultId = "";
    this.profileId = "";
    this.adminProfileId = "";
    this.adminVaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateOrganizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateOrganizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateOrganizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateOrganizationResponse, a, b);
  }
}
CreateOrganizationResponse.runtime = proto3;
CreateOrganizationResponse.typeName = "domain.CreateOrganizationResponse";
CreateOrganizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "super_user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "legacy_admin_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "personal_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 7,
    name: "team_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 8,
    name: "team_associated_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 9,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 10,
    name: "admin_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 11,
    name: "admin_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class UpdateOrganizationRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateOrganizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateOrganizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateOrganizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateOrganizationRequest, a, b);
  }
}
UpdateOrganizationRequest.runtime = proto3;
UpdateOrganizationRequest.typeName = "domain.UpdateOrganizationRequest";
UpdateOrganizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "name", kind: "message", T: StringValue },
  { no: 3, name: "icon", kind: "message", T: StringValue },
  { no: 4, name: "restrict_create_team", kind: "message", T: BoolValue },
  { no: 5, name: "auditlog_enable", kind: "message", T: BoolValue },
  { no: 11, name: "child_organization_management_enable", kind: "message", T: BoolValue },
  { no: 8, name: "restrict_personal_logins", kind: "message", T: BoolValue },
  { no: 7, name: "monitored_domains", kind: "message", T: UpdateOrganizationRequest_StringArray },
  { no: 9, name: "password_policy", kind: "message", T: StringValue },
  { no: 10, name: "unlock_time_limit", kind: "message", T: UnlockTimeLimit },
  { no: 12, name: "client_settings", kind: "message", T: StringValue }
]);
class UpdateOrganizationRequest_StringArray extends Message {
  constructor(data) {
    super();
    this.value = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateOrganizationRequest_StringArray().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateOrganizationRequest_StringArray().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateOrganizationRequest_StringArray().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateOrganizationRequest_StringArray, a, b);
  }
}
UpdateOrganizationRequest_StringArray.runtime = proto3;
UpdateOrganizationRequest_StringArray.typeName = "domain.UpdateOrganizationRequest.StringArray";
UpdateOrganizationRequest_StringArray.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "value", kind: "scalar", T: 9, repeated: true }
]);
class UpdateOrganizationResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateOrganizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateOrganizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateOrganizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateOrganizationResponse, a, b);
  }
}
UpdateOrganizationResponse.runtime = proto3;
UpdateOrganizationResponse.typeName = "domain.UpdateOrganizationResponse";
UpdateOrganizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class ModifyMembersRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.createProfileOps = [];
    this.updateProfileOps = [];
    this.deleteProfileIds = [];
    this.legacyAdminVaultGenerationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyMembersRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyMembersRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyMembersRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyMembersRequest, a, b);
  }
}
ModifyMembersRequest.runtime = proto3;
ModifyMembersRequest.typeName = "domain.ModifyMembersRequest";
ModifyMembersRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 7, name: "create_profile_ops", kind: "message", T: ModifyMembersRequest_CreateProfileOperation, repeated: true },
  { no: 8, name: "update_profile_ops", kind: "message", T: ModifyMembersRequest_UpdateProfileOperation, repeated: true },
  { no: 9, name: "delete_profile_ids", kind: "scalar", T: 9, repeated: true },
  { no: 5, name: "legacy_admin_vault_regenerate_data", kind: "message", T: VaultRegenerateData },
  {
    no: 10,
    name: "legacy_admin_vault_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ModifyMembersRequest_CreateProfileOperation extends Message {
  constructor(data) {
    super();
    this.isAdmin = false;
    this.email = "";
    this.createStartCodeAndSendMail = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyMembersRequest_CreateProfileOperation().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyMembersRequest_CreateProfileOperation().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyMembersRequest_CreateProfileOperation().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyMembersRequest_CreateProfileOperation, a, b);
  }
}
ModifyMembersRequest_CreateProfileOperation.runtime = proto3;
ModifyMembersRequest_CreateProfileOperation.typeName = "domain.ModifyMembersRequest.CreateProfileOperation";
ModifyMembersRequest_CreateProfileOperation.fields = proto3.util.newFieldList(() => [
  {
    no: 2,
    name: "is_admin",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 3, name: "personal_vault_data", kind: "message", T: VaultCreationData },
  { no: 4, name: "profile", kind: "message", T: ProfileData },
  { no: 5, name: "legacy_admin_vault_lock", kind: "message", T: VaultProfileLock },
  { no: 9, name: "admin_profile_lock", kind: "message", T: ProfileProfileLock },
  {
    no: 6,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 8,
    name: "create_start_code_and_send_mail",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class ModifyMembersRequest_UpdateProfileOperation extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyMembersRequest_UpdateProfileOperation().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyMembersRequest_UpdateProfileOperation().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyMembersRequest_UpdateProfileOperation().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyMembersRequest_UpdateProfileOperation, a, b);
  }
}
ModifyMembersRequest_UpdateProfileOperation.runtime = proto3;
ModifyMembersRequest_UpdateProfileOperation.typeName = "domain.ModifyMembersRequest.UpdateProfileOperation";
ModifyMembersRequest_UpdateProfileOperation.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "is_admin", kind: "message", T: BoolValue },
  { no: 4, name: "admin_profile_lock", kind: "message", T: ProfileProfileLock }
]);
class ModifyMembersResponse extends Message {
  constructor(data) {
    super();
    this.personalVaultIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ModifyMembersResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ModifyMembersResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ModifyMembersResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ModifyMembersResponse, a, b);
  }
}
ModifyMembersResponse.runtime = proto3;
ModifyMembersResponse.typeName = "domain.ModifyMembersResponse";
ModifyMembersResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  { no: 2, name: "personal_vault_ids", kind: "scalar", T: 9, repeated: true }
]);
class CreateServiceProfileRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateServiceProfileRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateServiceProfileRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateServiceProfileRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateServiceProfileRequest, a, b);
  }
}
CreateServiceProfileRequest.runtime = proto3;
CreateServiceProfileRequest.typeName = "domain.CreateServiceProfileRequest";
CreateServiceProfileRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "profile", kind: "message", T: ProfileData },
  { no: 3, name: "downstream_admin_profile_lock", kind: "message", T: ProfileProfileLock }
]);
class CreateServiceProfileResponse extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateServiceProfileResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateServiceProfileResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateServiceProfileResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateServiceProfileResponse, a, b);
  }
}
CreateServiceProfileResponse.runtime = proto3;
CreateServiceProfileResponse.typeName = "domain.CreateServiceProfileResponse";
CreateServiceProfileResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class LeaveOrganizationRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new LeaveOrganizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new LeaveOrganizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new LeaveOrganizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(LeaveOrganizationRequest, a, b);
  }
}
LeaveOrganizationRequest.runtime = proto3;
LeaveOrganizationRequest.typeName = "domain.LeaveOrganizationRequest";
LeaveOrganizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class LeaveOrganizationResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new LeaveOrganizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new LeaveOrganizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new LeaveOrganizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(LeaveOrganizationResponse, a, b);
  }
}
LeaveOrganizationResponse.runtime = proto3;
LeaveOrganizationResponse.typeName = "domain.LeaveOrganizationResponse";
LeaveOrganizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class AcceptInviteRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AcceptInviteRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AcceptInviteRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AcceptInviteRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AcceptInviteRequest, a, b);
  }
}
AcceptInviteRequest.runtime = proto3;
AcceptInviteRequest.typeName = "domain.AcceptInviteRequest";
AcceptInviteRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class AcceptInviteResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AcceptInviteResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AcceptInviteResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AcceptInviteResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AcceptInviteResponse, a, b);
  }
}
AcceptInviteResponse.runtime = proto3;
AcceptInviteResponse.typeName = "domain.AcceptInviteResponse";
AcceptInviteResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class RedeemCouponRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.couponText = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RedeemCouponRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RedeemCouponRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RedeemCouponRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RedeemCouponRequest, a, b);
  }
}
RedeemCouponRequest.runtime = proto3;
RedeemCouponRequest.typeName = "domain.RedeemCouponRequest";
RedeemCouponRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "coupon_text",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class RedeemCouponResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RedeemCouponResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RedeemCouponResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RedeemCouponResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RedeemCouponResponse, a, b);
  }
}
RedeemCouponResponse.runtime = proto3;
RedeemCouponResponse.typeName = "domain.RedeemCouponResponse";
RedeemCouponResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class DeleteOrganizationRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteOrganizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteOrganizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteOrganizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteOrganizationRequest, a, b);
  }
}
DeleteOrganizationRequest.runtime = proto3;
DeleteOrganizationRequest.typeName = "domain.DeleteOrganizationRequest";
DeleteOrganizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class DeleteOrganizationResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteOrganizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteOrganizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteOrganizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteOrganizationResponse, a, b);
  }
}
DeleteOrganizationResponse.runtime = proto3;
DeleteOrganizationResponse.typeName = "domain.DeleteOrganizationResponse";
DeleteOrganizationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class GetSubscriptionDetailsRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetSubscriptionDetailsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetSubscriptionDetailsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetSubscriptionDetailsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetSubscriptionDetailsRequest, a, b);
  }
}
GetSubscriptionDetailsRequest.runtime = proto3;
GetSubscriptionDetailsRequest.typeName = "domain.GetSubscriptionDetailsRequest";
GetSubscriptionDetailsRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetSubscriptionDetailsResponse extends Message {
  constructor(data) {
    super();
    this.payments = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetSubscriptionDetailsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetSubscriptionDetailsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetSubscriptionDetailsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetSubscriptionDetailsResponse, a, b);
  }
}
GetSubscriptionDetailsResponse.runtime = proto3;
GetSubscriptionDetailsResponse.typeName = "domain.GetSubscriptionDetailsResponse";
GetSubscriptionDetailsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "payments", kind: "message", T: GetSubscriptionDetailsResponse_Payment, repeated: true },
  { no: 4, name: "paddle_subscription", kind: "message", T: GetSubscriptionDetailsResponse_PaddleSubscription },
  { no: 5, name: "status", kind: "message", T: SubscriptionStatus }
]);
class GetSubscriptionDetailsResponse_Payment extends Message {
  constructor(data) {
    super();
    this.receiptUrl = "";
    this.saleGrossCents = protoInt64.zero;
    this.paymentTaxCents = protoInt64.zero;
    this.currency = "";
    this.orderId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetSubscriptionDetailsResponse_Payment().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetSubscriptionDetailsResponse_Payment().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetSubscriptionDetailsResponse_Payment().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetSubscriptionDetailsResponse_Payment, a, b);
  }
}
GetSubscriptionDetailsResponse_Payment.runtime = proto3;
GetSubscriptionDetailsResponse_Payment.typeName = "domain.GetSubscriptionDetailsResponse.Payment";
GetSubscriptionDetailsResponse_Payment.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "event_time", kind: "message", T: Timestamp },
  {
    no: 2,
    name: "receipt_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "sale_gross_cents",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 4,
    name: "payment_tax_cents",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 5,
    name: "currency",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "order_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetSubscriptionDetailsResponse_PaddleSubscription extends Message {
  constructor(data) {
    super();
    this.plan = SubscriptionPlan.UNKNOWN;
    this.quantity = 0;
    this.unitPriceCents = 0;
    this.totalPriceCents = 0;
    this.currency = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetSubscriptionDetailsResponse_PaddleSubscription().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetSubscriptionDetailsResponse_PaddleSubscription().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetSubscriptionDetailsResponse_PaddleSubscription().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetSubscriptionDetailsResponse_PaddleSubscription, a, b);
  }
}
GetSubscriptionDetailsResponse_PaddleSubscription.runtime = proto3;
GetSubscriptionDetailsResponse_PaddleSubscription.typeName = "domain.GetSubscriptionDetailsResponse.PaddleSubscription";
GetSubscriptionDetailsResponse_PaddleSubscription.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "plan", kind: "enum", T: proto3.getEnumType(SubscriptionPlan) },
  {
    no: 2,
    name: "quantity",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "unit_price_cents",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "total_price_cents",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "currency",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 6, name: "next_bill_date", kind: "message", T: Timestamp }
]);
class RegenerateOrganizationProfileRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.userId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegenerateOrganizationProfileRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegenerateOrganizationProfileRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegenerateOrganizationProfileRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegenerateOrganizationProfileRequest, a, b);
  }
}
RegenerateOrganizationProfileRequest.runtime = proto3;
RegenerateOrganizationProfileRequest.typeName = "domain.RegenerateOrganizationProfileRequest";
RegenerateOrganizationProfileRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "profile", kind: "message", T: ProfileRegenerateData },
  {
    no: 3,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class RegenerateOrganizationProfileResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegenerateOrganizationProfileResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegenerateOrganizationProfileResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegenerateOrganizationProfileResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegenerateOrganizationProfileResponse, a, b);
  }
}
RegenerateOrganizationProfileResponse.runtime = proto3;
RegenerateOrganizationProfileResponse.typeName = "domain.RegenerateOrganizationProfileResponse";
RegenerateOrganizationProfileResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class ClaimPreliminaryProfileRequest extends Message {
  constructor(data) {
    super();
    this.profileId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ClaimPreliminaryProfileRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ClaimPreliminaryProfileRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ClaimPreliminaryProfileRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ClaimPreliminaryProfileRequest, a, b);
  }
}
ClaimPreliminaryProfileRequest.runtime = proto3;
ClaimPreliminaryProfileRequest.typeName = "domain.ClaimPreliminaryProfileRequest";
ClaimPreliminaryProfileRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ClaimPreliminaryProfileResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ClaimPreliminaryProfileResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ClaimPreliminaryProfileResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ClaimPreliminaryProfileResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ClaimPreliminaryProfileResponse, a, b);
  }
}
ClaimPreliminaryProfileResponse.runtime = proto3;
ClaimPreliminaryProfileResponse.typeName = "domain.ClaimPreliminaryProfileResponse";
ClaimPreliminaryProfileResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class RegenerateAdminProfileRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegenerateAdminProfileRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegenerateAdminProfileRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegenerateAdminProfileRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegenerateAdminProfileRequest, a, b);
  }
}
RegenerateAdminProfileRequest.runtime = proto3;
RegenerateAdminProfileRequest.typeName = "domain.RegenerateAdminProfileRequest";
RegenerateAdminProfileRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "profile", kind: "message", T: ProfileRegenerateData },
  { no: 3, name: "admin_vault_data", kind: "message", T: VaultCreationData }
]);
class RegenerateAdminProfileResponse extends Message {
  constructor(data) {
    super();
    this.adminProfileId = "";
    this.adminProfileKeyGenerationId = "";
    this.adminVaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegenerateAdminProfileResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegenerateAdminProfileResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegenerateAdminProfileResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegenerateAdminProfileResponse, a, b);
  }
}
RegenerateAdminProfileResponse.runtime = proto3;
RegenerateAdminProfileResponse.typeName = "domain.RegenerateAdminProfileResponse";
RegenerateAdminProfileResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "admin_profile_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "admin_profile_key_generation_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "admin_vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class RenewProfileStartCodeRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.profileIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RenewProfileStartCodeRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RenewProfileStartCodeRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RenewProfileStartCodeRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RenewProfileStartCodeRequest, a, b);
  }
}
RenewProfileStartCodeRequest.runtime = proto3;
RenewProfileStartCodeRequest.typeName = "domain.RenewProfileStartCodeRequest";
RenewProfileStartCodeRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "profile_ids", kind: "scalar", T: 9, repeated: true }
]);
class RenewProfileStartCodeResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RenewProfileStartCodeResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RenewProfileStartCodeResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RenewProfileStartCodeResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RenewProfileStartCodeResponse, a, b);
  }
}
RenewProfileStartCodeResponse.runtime = proto3;
RenewProfileStartCodeResponse.typeName = "domain.RenewProfileStartCodeResponse";
RenewProfileStartCodeResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class SendStartCodeEmailRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.profileIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendStartCodeEmailRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendStartCodeEmailRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendStartCodeEmailRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendStartCodeEmailRequest, a, b);
  }
}
SendStartCodeEmailRequest.runtime = proto3;
SendStartCodeEmailRequest.typeName = "domain.SendStartCodeEmailRequest";
SendStartCodeEmailRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "profile_ids", kind: "scalar", T: 9, repeated: true }
]);
class SendStartCodeEmailResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendStartCodeEmailResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendStartCodeEmailResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendStartCodeEmailResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendStartCodeEmailResponse, a, b);
  }
}
SendStartCodeEmailResponse.runtime = proto3;
SendStartCodeEmailResponse.typeName = "domain.SendStartCodeEmailResponse";
SendStartCodeEmailResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class RevokeProfileStartCodeRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.profileIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RevokeProfileStartCodeRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RevokeProfileStartCodeRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RevokeProfileStartCodeRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RevokeProfileStartCodeRequest, a, b);
  }
}
RevokeProfileStartCodeRequest.runtime = proto3;
RevokeProfileStartCodeRequest.typeName = "domain.RevokeProfileStartCodeRequest";
RevokeProfileStartCodeRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "profile_ids", kind: "scalar", T: 9, repeated: true }
]);
class RevokeProfileStartCodeResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RevokeProfileStartCodeResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RevokeProfileStartCodeResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RevokeProfileStartCodeResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RevokeProfileStartCodeResponse, a, b);
  }
}
RevokeProfileStartCodeResponse.runtime = proto3;
RevokeProfileStartCodeResponse.typeName = "domain.RevokeProfileStartCodeResponse";
RevokeProfileStartCodeResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class GetOrganizationDeletionInfoRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.token = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetOrganizationDeletionInfoRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetOrganizationDeletionInfoRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetOrganizationDeletionInfoRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetOrganizationDeletionInfoRequest, a, b);
  }
}
GetOrganizationDeletionInfoRequest.runtime = proto3;
GetOrganizationDeletionInfoRequest.typeName = "domain.GetOrganizationDeletionInfoRequest";
GetOrganizationDeletionInfoRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetOrganizationDeletionInfoResponse extends Message {
  constructor(data) {
    super();
    this.organizationName = "";
    this.requestedByEmail = "";
    this.userCount = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetOrganizationDeletionInfoResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetOrganizationDeletionInfoResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetOrganizationDeletionInfoResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetOrganizationDeletionInfoResponse, a, b);
  }
}
GetOrganizationDeletionInfoResponse.runtime = proto3;
GetOrganizationDeletionInfoResponse.typeName = "domain.GetOrganizationDeletionInfoResponse";
GetOrganizationDeletionInfoResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "requested_by_email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "user_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 4, name: "requested_at", kind: "message", T: Timestamp }
]);
class DeleteOrganizationWithTokenRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.token = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteOrganizationWithTokenRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteOrganizationWithTokenRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteOrganizationWithTokenRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteOrganizationWithTokenRequest, a, b);
  }
}
DeleteOrganizationWithTokenRequest.runtime = proto3;
DeleteOrganizationWithTokenRequest.typeName = "domain.DeleteOrganizationWithTokenRequest";
DeleteOrganizationWithTokenRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class DeleteOrganizationWithTokenResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteOrganizationWithTokenResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteOrganizationWithTokenResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteOrganizationWithTokenResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteOrganizationWithTokenResponse, a, b);
  }
}
DeleteOrganizationWithTokenResponse.runtime = proto3;
DeleteOrganizationWithTokenResponse.typeName = "domain.DeleteOrganizationWithTokenResponse";
DeleteOrganizationWithTokenResponse.fields = proto3.util.newFieldList(() => []);
class RemoveOrganizationDeletionTokenRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.token = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RemoveOrganizationDeletionTokenRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RemoveOrganizationDeletionTokenRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RemoveOrganizationDeletionTokenRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RemoveOrganizationDeletionTokenRequest, a, b);
  }
}
RemoveOrganizationDeletionTokenRequest.runtime = proto3;
RemoveOrganizationDeletionTokenRequest.typeName = "domain.RemoveOrganizationDeletionTokenRequest";
RemoveOrganizationDeletionTokenRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class RemoveOrganizationDeletionTokenResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RemoveOrganizationDeletionTokenResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RemoveOrganizationDeletionTokenResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RemoveOrganizationDeletionTokenResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RemoveOrganizationDeletionTokenResponse, a, b);
  }
}
RemoveOrganizationDeletionTokenResponse.runtime = proto3;
RemoveOrganizationDeletionTokenResponse.typeName = "domain.RemoveOrganizationDeletionTokenResponse";
RemoveOrganizationDeletionTokenResponse.fields = proto3.util.newFieldList(() => []);
class GetBreachDataRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetBreachDataRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetBreachDataRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetBreachDataRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetBreachDataRequest, a, b);
  }
}
GetBreachDataRequest.runtime = proto3;
GetBreachDataRequest.typeName = "domain.GetBreachDataRequest";
GetBreachDataRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetBreachDataResponse extends Message {
  constructor(data) {
    super();
    this.domains = [];
    this.totalPwnCountBillions = 0;
    this.totalBreachCount = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetBreachDataResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetBreachDataResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetBreachDataResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetBreachDataResponse, a, b);
  }
}
GetBreachDataResponse.runtime = proto3;
GetBreachDataResponse.typeName = "domain.GetBreachDataResponse";
GetBreachDataResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "domains", kind: "message", T: GetBreachDataResponse_MonitoredDomain, repeated: true },
  { no: 2, name: "last_check_date", kind: "message", T: Timestamp },
  {
    no: 3,
    name: "total_pwn_count_billions",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "total_breach_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class GetBreachDataResponse_BreachModel extends Message {
  constructor(data) {
    super();
    this.name = "";
    this.title = "";
    this.dataClasses = [];
    this.logoPath = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetBreachDataResponse_BreachModel().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetBreachDataResponse_BreachModel().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetBreachDataResponse_BreachModel().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetBreachDataResponse_BreachModel, a, b);
  }
}
GetBreachDataResponse_BreachModel.runtime = proto3;
GetBreachDataResponse_BreachModel.typeName = "domain.GetBreachDataResponse.BreachModel";
GetBreachDataResponse_BreachModel.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "title",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "breach_date", kind: "message", T: Timestamp },
  { no: 4, name: "added_date", kind: "message", T: Timestamp },
  { no: 5, name: "data_classes", kind: "scalar", T: 9, repeated: true },
  {
    no: 6,
    name: "logo_path",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetBreachDataResponse_Breach extends Message {
  constructor(data) {
    super();
    this.aliases = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetBreachDataResponse_Breach().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetBreachDataResponse_Breach().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetBreachDataResponse_Breach().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetBreachDataResponse_Breach, a, b);
  }
}
GetBreachDataResponse_Breach.runtime = proto3;
GetBreachDataResponse_Breach.typeName = "domain.GetBreachDataResponse.Breach";
GetBreachDataResponse_Breach.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "model", kind: "message", T: GetBreachDataResponse_BreachModel },
  { no: 2, name: "aliases", kind: "scalar", T: 9, repeated: true }
]);
class GetBreachDataResponse_MonitoredDomain extends Message {
  constructor(data) {
    super();
    this.domain = "";
    this.breaches = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetBreachDataResponse_MonitoredDomain().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetBreachDataResponse_MonitoredDomain().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetBreachDataResponse_MonitoredDomain().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetBreachDataResponse_MonitoredDomain, a, b);
  }
}
GetBreachDataResponse_MonitoredDomain.runtime = proto3;
GetBreachDataResponse_MonitoredDomain.typeName = "domain.GetBreachDataResponse.MonitoredDomain";
GetBreachDataResponse_MonitoredDomain.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "domain",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "breaches", kind: "message", T: GetBreachDataResponse_Breach, repeated: true }
]);
({
  typeName: "domain.OrganizationService",
  methods: {
    /**
     * errors:
     * - EmailTaken (20100): email address taken
     * - InvalidEmail (20101): invalid email address
     * - NotAllowedForUserType (20470)
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - UserNotFound (20400): no account matching credentials
     * - MissingAuthenticatorBlock (40430): the request is lacking a follow-up authenticator block
     * - InvalidAuthenticatorType (40460): The given authenticator is no organization authenticator
     * - InvalidOrganizationName (60430): name is empty or contains unprintable characters
     * - OrganizationInvalidContact (60431): contact is not json-formatted
     * - ProfileNotFound (70400): tried to create with profile when account is not profile enabled
     * - ProfileAlreadyEnabled (70401): tried to create without profile when account is profile enabled
     * - ClientOutdated (10426): tried to create admin profile org with legacy admin vault
     * - Internal (10500): Internal server error
     *
     * @generated from rpc domain.OrganizationService.Create
     */
    create: {
      name: "Create",
      I: CreateOrganizationRequest,
      O: CreateOrganizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - OrganizationInsufficientAccess (60100): not admin of the given organzation
     * - OrganizationNotFound (60400): not member of the given organization
     * - InvalidOrganizationName (60430): name is empty or contains unprintable characters
     * - Internal (10500):
     *
     * @generated from rpc domain.OrganizationService.Update
     */
    update: {
      name: "Update",
      I: UpdateOrganizationRequest,
      O: UpdateOrganizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - EmailTaken (20100): email address taken
     * - InvalidEmail (20101): invalid email address
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - UserNotFound (20400): A user added to the organization was not found
     * - UserAlreadyInOrganization (60401): A user added to the organization is already in it
     * - OrganizationInsufficientAccess (60100): Tried to manipulate other members without admin access
     * - OrganizationMissingAdmin (60410): after the call there would be no admin left
     * - NotAllowedForUserType (20470): Tried to manipulate a non-default user
     * - VaultOutOfSync (50100)
     * - MissingVault (50420): Tried to add admin without admin vault regenerate data
     * - NotAllowedForProfile (70433): tried to demote an organization manager
     * - AuditlogSubmissionError (90500)
     * - Internal (10500):
     *
     * @generated from rpc domain.OrganizationService.ModifyMembers
     */
    modifyMembers: {
      name: "ModifyMembers",
      I: ModifyMembersRequest,
      O: ModifyMembersResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - BadRequest (10400): called on an org without admin profiles
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - NotAllowedForOrganization (60101): organization must have admin profiles enabled
     * - OrganizationNotFound (60400): not member of the given organization
     * - UserAlreadyInOrganization (60401): A service user already exists in this organization
     * - OrganizationInsufficientAccess (60100)
     * - MissingProfileProfileLock (70412)
     * - AuditlogSubmissionError (90500)
     * - Internal (10500)
     *
     * @generated from rpc domain.OrganizationService.CreateServiceProfile
     */
    createServiceProfile: {
      name: "CreateServiceProfile",
      I: CreateServiceProfileRequest,
      O: CreateServiceProfileResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - OrganizationNotFound (60400): not member of the given organization
     * - OrganizationMissingAdmin (60410): after the call there would be no admin left
     * - Internal (10500):
     *
     * @generated from rpc domain.OrganizationService.Leave
     */
    leave: {
      name: "Leave",
      I: LeaveOrganizationRequest,
      O: LeaveOrganizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - OrganizationNotFound (60400): not member of the given organization
     * - Internal (10500):
     *
     * @generated from rpc domain.OrganizationService.AcceptInvite
     */
    acceptInvite: {
      name: "AcceptInvite",
      I: AcceptInviteRequest,
      O: AcceptInviteResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - OrganizationInsufficientAccess (60100): not admin of the given organzation
     * - OrganizationNotFound (60400): not member of the given organization
     * - CouponInvalid (60440)
     * - CouponAlreadyRedeemed (60441)
     * - Internal (10500):
     *
     * @generated from rpc domain.OrganizationService.RedeemCoupon
     */
    redeemCoupon: {
      name: "RedeemCoupon",
      I: RedeemCouponRequest,
      O: RedeemCouponResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): not logged in
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - OrganizationInsufficientAccess (60100): not admin of the given organzation
     * - OrganizationNotFound (60400): not member of the given organization
     * - Internal (10500):
     *
     * @generated from rpc domain.OrganizationService.Delete
     */
    delete: {
      name: "Delete",
      I: DeleteOrganizationRequest,
      O: DeleteOrganizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * - MissingCredentials (30100): not logged in
     * - UserNotFound (20400): no account matching credentials
     * - OrganizationInsufficientAccess (60100): not admin of the given organzation
     * - OrganizationNotFound (60400): not member of the given organization
     * - Internal (10500):
     *
     * @generated from rpc domain.OrganizationService.GetSubscriptionDetails
     */
    getSubscriptionDetails: {
      name: "GetSubscriptionDetails",
      I: GetSubscriptionDetailsRequest,
      O: GetSubscriptionDetailsResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - UserNotFound (20400): user to assign profile was not found
     * - OrganizationInsufficientAccess (60100): not admin of the given organzation
     * - UserAlreadyInOrganization (60401): user to assign profile is already in organization
     * - OtherProfileEmailConflicts (60450): another profile with this email address exists
     * - ProfileNotFound (70400): if profile not found, or is user's own profile
     * - ProfileOutOfSync (70400): if KeyGenerationId is not the null uuid, or authenticator locks are not empty
     * - MissingProfileAuthenticatorLock (70410)
     * - AuditlogSubmissionError (90500)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.OrganizationService.RegenerateOrganizationProfile
     */
    regenerateOrganizationProfile: {
      name: "RegenerateOrganizationProfile",
      I: RegenerateOrganizationProfileRequest,
      O: RegenerateOrganizationProfileResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - BadRequest (10400): if authenticator locks are not empty and org is admin profile enabled
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - VaultOutOfSync (50100)
     * - EmptyCommit (50200)
     * - MissingVault (50420): admin vault creation data is missing
     * - VaultOutOfSync (50100): admin vault already exists, but creation data was provided
     * - MissingVaultProfileLock (50411): if vault profile locks do not match all organization vaults
     * - OrganizationInsufficientAccess (60100)
     * - ProfileOutOfSync (70400): if KeyGenerationId does not match / is the null uuid for creation
     * - Internal (10500)
     *
     * @generated from rpc domain.OrganizationService.RegenerateAdminProfile
     */
    regenerateAdminProfile: {
      name: "RegenerateAdminProfile",
      I: RegenerateAdminProfileRequest,
      O: RegenerateAdminProfileResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationInsufficientAccess (60100): not admin of the given organzation
     * - ProfileNotFound (70400): if profile not found or is not free
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.OrganizationService.RenewProfileStartCode
     */
    renewProfileStartCode: {
      name: "RenewProfileStartCode",
      I: RenewProfileStartCodeRequest,
      O: RenewProfileStartCodeResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationInsufficientAccess (60100): not admin of the given organzation
     * - ProfileNotFound (70400): if profile not found, is not free or has no start code
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.OrganizationService.SendStartCodeEmail
     */
    sendStartCodeEmail: {
      name: "SendStartCodeEmail",
      I: SendStartCodeEmailRequest,
      O: SendStartCodeEmailResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationInsufficientAccess (60100): not admin of the given organzation
     * - ProfileNotFound (70400): if profile not found or is not free
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.OrganizationService.RevokeProfileStartCode
     */
    revokeProfileStartCode: {
      name: "RevokeProfileStartCode",
      I: RevokeProfileStartCodeRequest,
      O: RevokeProfileStartCodeResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - OrganizationNotFound (60400)
     * - InvalidOrganizationDeletionToken (60460)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.OrganizationService.GetDeletionInfo
     */
    getDeletionInfo: {
      name: "GetDeletionInfo",
      I: GetOrganizationDeletionInfoRequest,
      O: GetOrganizationDeletionInfoResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - OrganizationNotFound (60400)
     * - InvalidOrganizationDeletionToken (60460)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.OrganizationService.DeleteWithToken
     */
    deleteWithToken: {
      name: "DeleteWithToken",
      I: DeleteOrganizationWithTokenRequest,
      O: DeleteOrganizationWithTokenResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - OrganizationNotFound (60400)
     * - InvalidOrganizationDeletionToken (60460)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.OrganizationService.RemoveDeletionToken
     */
    removeDeletionToken: {
      name: "RemoveDeletionToken",
      I: RemoveOrganizationDeletionTokenRequest,
      O: RemoveOrganizationDeletionTokenResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - OrganizationNotFound (60400)
     *
     * @generated from rpc domain.OrganizationService.GetBreachData
     */
    getBreachData: {
      name: "GetBreachData",
      I: GetBreachDataRequest,
      O: GetBreachDataResponse,
      kind: MethodKind.Unary
    }
  }
});
({
  typeName: "domain.ProfileService",
  methods: {
    /**
     * errors:
     * - EmailTaken (20100): email address taken
     * - InvalidEmail (20101): invalid email address
     * - NotAllowedForUserType (20470)
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - ProfileNotFound (70400): account is not profile enabled
     * - ProfileAlreadyEnabled (70401): private profile already exists
     * - MissingProfileAuthenticatorLock (70410): a profile lock is missing for an authenticator
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ProfileService.CreatePrivate
     */
    createPrivate: {
      name: "CreatePrivate",
      I: CreatePrivateProfileRequest,
      O: CreatePrivateProfileResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - ProfileNotFound (70400): profile could not be found by id
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ProfileService.DeletePrivate
     */
    deletePrivate: {
      name: "DeletePrivate",
      I: DeletePrivateProfileRequest,
      O: DeletePrivateProfileResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - VaultOutOfSync (50100): generation_id does not match for some vault
     * - VaultNotFound (50400): some vault profile lock had an unknown vault_id
     * - MissingLock (70510): missing locks for one or more authenticators
     * - ProfileNotFound (70400): some profile could not be found by id
     * - MissingProfileLock (70410): missing profile locks for one or more authenticators
     * - ProfileOutOfSync (70411): key_generation_id does not match for some profile
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ProfileService.Regenerate
     */
    regenerate: {
      name: "Regenerate",
      I: RegenerateProfilesRequest,
      O: RegenerateProfilesResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - ProfileNotFound (70400): if any profile id could not be found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ProfileService.List
     */
    list: {
      name: "List",
      I: ListProfilesRequest,
      O: ListProfilesResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - InvalidEmail (20101)
     * - EmailTaken (20100)
     * - ProfileNotFound (70400): profile doesn't exist or can't have an email address
     * - Internal (10500)
     *
     * @generated from rpc domain.ProfileService.RequestEmailChange
     */
    requestEmailChange: {
      name: "RequestEmailChange",
      I: ProfileRequestEmailChangeRequest,
      O: ProfileRequestEmailChangeResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - PermissionDenied (10100): email change may not be cancelled (in semi-verified state)
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - ProfileNotFound (70400): profile doesn't exist or can't have an email address
     * - Internal (10500)
     *
     * @generated from rpc domain.ProfileService.CancelEmailChange
     */
    cancelEmailChange: {
      name: "CancelEmailChange",
      I: ProfileCancelEmailChangeRequest,
      O: ProfileCancelEmailChangeResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - PermissionDenied (10100): the credentials provided didn't match the verification token
     * - InvalidVerificationToken (20460): the verification token provided is invalid or outdated or the email has been verified for another account
     * - Internal (10500): internal server error
     * This endpoint can be called with or without credentials. If credentials are given, they must
     * match with the verification token.
     *
     * @generated from rpc domain.ProfileService.VerifyEmailAddress
     */
    verifyEmailAddress: {
      name: "VerifyEmailAddress",
      I: VerifyEmailAddressRequest,
      O: VerifyEmailAddressResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - ProfileNotFound (70400): profile not found, or is not an organization profile
     * - ProfileAlreadyConnected (70402)
     * - ProfileStartCodeInactive (70403)
     * - UserAlreadyInOrganization (60401)
     * - StartCodeInvalid (70430)
     * - StartCodeBlocked (70431)
     * - EmailTaken (20100)
     * - AuditlogSubmissionError (90500)
     * - Internal (10500)
     *
     * @generated from rpc domain.ProfileService.ClaimWithStartCode
     */
    claimWithStartCode: {
      name: "ClaimWithStartCode",
      I: ClaimWithStartCodeRequest,
      O: ClaimWithStartCodeResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - ProfileNotFound (70400)
     * - Internal (10500)
     *
     * @generated from rpc domain.ProfileService.GetProfileInfo
     */
    getProfileInfo: {
      name: "GetProfileInfo",
      I: GetProfileInfoRequest,
      O: GetProfileInfoResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - InvalidEmail (20101)
     * - EmailInviteNotActive (20106)
     * - ProfileNotFound (70400)
     * - StartCodeInvalid (70430)
     * - StartCodeBlocked (70431)
     * - EmailInviteNotActive (20106)
     *
     * @generated from rpc domain.ProfileService.CheckStartCode
     */
    checkStartCode: {
      name: "CheckStartCode",
      I: CheckProfileStartCodeRequest,
      O: CheckProfileStartCodeResponse,
      kind: MethodKind.Unary
    }
  }
});
class DeleteSessionRequest extends Message {
  constructor(data) {
    super();
    this.sessionId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteSessionRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteSessionRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteSessionRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteSessionRequest, a, b);
  }
}
DeleteSessionRequest.runtime = proto3;
DeleteSessionRequest.typeName = "domain.DeleteSessionRequest";
DeleteSessionRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class DeleteSessionResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteSessionResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteSessionResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteSessionResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteSessionResponse, a, b);
  }
}
DeleteSessionResponse.runtime = proto3;
DeleteSessionResponse.typeName = "domain.DeleteSessionResponse";
DeleteSessionResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class CreateSessionUnlockRequest extends Message {
  constructor(data) {
    super();
    this.sessionId = "";
    this.encryptedSecret = new Uint8Array(0);
    this.authenticatorId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateSessionUnlockRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateSessionUnlockRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateSessionUnlockRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateSessionUnlockRequest, a, b);
  }
}
CreateSessionUnlockRequest.runtime = proto3;
CreateSessionUnlockRequest.typeName = "domain.CreateSessionUnlockRequest";
CreateSessionUnlockRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "encrypted_secret",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 3,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 4, name: "max_expires_at", kind: "message", T: Timestamp }
]);
class CreateSessionUnlockResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateSessionUnlockResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateSessionUnlockResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateSessionUnlockResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateSessionUnlockResponse, a, b);
  }
}
CreateSessionUnlockResponse.runtime = proto3;
CreateSessionUnlockResponse.typeName = "domain.CreateSessionUnlockResponse";
CreateSessionUnlockResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class DeleteSessionUnlockRequest extends Message {
  constructor(data) {
    super();
    this.sessionId = "";
    this.onlyPendingRequest = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteSessionUnlockRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteSessionUnlockRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteSessionUnlockRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteSessionUnlockRequest, a, b);
  }
}
DeleteSessionUnlockRequest.runtime = proto3;
DeleteSessionUnlockRequest.typeName = "domain.DeleteSessionUnlockRequest";
DeleteSessionUnlockRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "only_pending_request",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class DeleteSessionUnlockResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteSessionUnlockResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteSessionUnlockResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteSessionUnlockResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteSessionUnlockResponse, a, b);
  }
}
DeleteSessionUnlockResponse.runtime = proto3;
DeleteSessionUnlockResponse.typeName = "domain.DeleteSessionUnlockResponse";
DeleteSessionUnlockResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class RequestSessionUnlockRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RequestSessionUnlockRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RequestSessionUnlockRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RequestSessionUnlockRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RequestSessionUnlockRequest, a, b);
  }
}
RequestSessionUnlockRequest.runtime = proto3;
RequestSessionUnlockRequest.typeName = "domain.RequestSessionUnlockRequest";
RequestSessionUnlockRequest.fields = proto3.util.newFieldList(() => []);
class RequestSessionUnlockResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RequestSessionUnlockResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RequestSessionUnlockResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RequestSessionUnlockResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RequestSessionUnlockResponse, a, b);
  }
}
RequestSessionUnlockResponse.runtime = proto3;
RequestSessionUnlockResponse.typeName = "domain.RequestSessionUnlockResponse";
RequestSessionUnlockResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class ExtendSessionUnlockRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ExtendSessionUnlockRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ExtendSessionUnlockRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ExtendSessionUnlockRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ExtendSessionUnlockRequest, a, b);
  }
}
ExtendSessionUnlockRequest.runtime = proto3;
ExtendSessionUnlockRequest.typeName = "domain.ExtendSessionUnlockRequest";
ExtendSessionUnlockRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "last_user_activity", kind: "message", T: Timestamp }
]);
class ExtendSessionUnlockResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ExtendSessionUnlockResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ExtendSessionUnlockResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ExtendSessionUnlockResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ExtendSessionUnlockResponse, a, b);
  }
}
ExtendSessionUnlockResponse.runtime = proto3;
ExtendSessionUnlockResponse.typeName = "domain.ExtendSessionUnlockResponse";
ExtendSessionUnlockResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class SendSessionMessageRequest extends Message {
  constructor(data) {
    super();
    this.messages = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendSessionMessageRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendSessionMessageRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendSessionMessageRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendSessionMessageRequest, a, b);
  }
}
SendSessionMessageRequest.runtime = proto3;
SendSessionMessageRequest.typeName = "domain.SendSessionMessageRequest";
SendSessionMessageRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "messages", kind: "message", T: SendSessionMessageRequest_Message, repeated: true }
]);
class SendSessionMessageRequest_Message extends Message {
  constructor(data) {
    super();
    this.sessionId = "";
    this.payload = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendSessionMessageRequest_Message().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendSessionMessageRequest_Message().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendSessionMessageRequest_Message().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendSessionMessageRequest_Message, a, b);
  }
}
SendSessionMessageRequest_Message.runtime = proto3;
SendSessionMessageRequest_Message.typeName = "domain.SendSessionMessageRequest.Message";
SendSessionMessageRequest_Message.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "payload",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class SendSessionMessageResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendSessionMessageResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendSessionMessageResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendSessionMessageResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendSessionMessageResponse, a, b);
  }
}
SendSessionMessageResponse.runtime = proto3;
SendSessionMessageResponse.typeName = "domain.SendSessionMessageResponse";
SendSessionMessageResponse.fields = proto3.util.newFieldList(() => []);
class UpdateSessionRequest extends Message {
  constructor(data) {
    super();
    this.sessionId = "";
    this.fieldsToUpdate = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateSessionRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateSessionRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateSessionRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateSessionRequest, a, b);
  }
}
UpdateSessionRequest.runtime = proto3;
UpdateSessionRequest.typeName = "domain.UpdateSessionRequest";
UpdateSessionRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "fields_to_update", kind: "enum", T: proto3.getEnumType(SyncUpdateField), repeated: true },
  { no: 3, name: "client_settings", kind: "message", T: StringValue },
  { no: 4, name: "enabled_profiles", kind: "message", T: UpdateSessionRequest_EnabledProfiles },
  { no: 5, name: "unlock_time_limit", kind: "message", T: UnlockTimeLimit },
  { no: 6, name: "fcm_device_token", kind: "message", T: StringValue }
]);
class UpdateSessionRequest_EnabledProfiles extends Message {
  constructor(data) {
    super();
    this.profileIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateSessionRequest_EnabledProfiles().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateSessionRequest_EnabledProfiles().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateSessionRequest_EnabledProfiles().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateSessionRequest_EnabledProfiles, a, b);
  }
}
UpdateSessionRequest_EnabledProfiles.runtime = proto3;
UpdateSessionRequest_EnabledProfiles.typeName = "domain.UpdateSessionRequest.EnabledProfiles";
UpdateSessionRequest_EnabledProfiles.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "profile_ids", kind: "scalar", T: 9, repeated: true }
]);
class UpdateSessionResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UpdateSessionResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UpdateSessionResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UpdateSessionResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UpdateSessionResponse, a, b);
  }
}
UpdateSessionResponse.runtime = proto3;
UpdateSessionResponse.typeName = "domain.UpdateSessionResponse";
UpdateSessionResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class SetClientSettingsRequest extends Message {
  constructor(data) {
    super();
    this.sessionId = "";
    this.clientSettings = "";
    this.fieldsToUpdate = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SetClientSettingsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SetClientSettingsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SetClientSettingsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SetClientSettingsRequest, a, b);
  }
}
SetClientSettingsRequest.runtime = proto3;
SetClientSettingsRequest.typeName = "domain.SetClientSettingsRequest";
SetClientSettingsRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "client_settings",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "fields_to_update", kind: "enum", T: proto3.getEnumType(SyncUpdateField), repeated: true }
]);
class SetClientSettingsResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SetClientSettingsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SetClientSettingsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SetClientSettingsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SetClientSettingsResponse, a, b);
  }
}
SetClientSettingsResponse.runtime = proto3;
SetClientSettingsResponse.typeName = "domain.SetClientSettingsResponse";
SetClientSettingsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
({
  typeName: "domain.SessionService",
  methods: {
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - SessionNotFound (20410): session_id not in database
     * - PermissionDenied (10100) : session does not belong to user
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SessionService.DeleteSession
     */
    deleteSession: {
      name: "DeleteSession",
      I: DeleteSessionRequest,
      O: DeleteSessionResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - InvalidTimeout (20420): expires_at ist already expired
     * - AuthenticatorNotFound (40400): authenticator does not belong to user
     * - SessionNotFound (20410): session does not belong to user
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SessionService.CreateSessionUnlock
     */
    createSessionUnlock: {
      name: "CreateSessionUnlock",
      I: CreateSessionUnlockRequest,
      O: CreateSessionUnlockResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - SessionNotFound (20410): session not in database or does not belong to user
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SessionService.DeleteSessionUnlock
     */
    deleteSessionUnlock: {
      name: "DeleteSessionUnlock",
      I: DeleteSessionUnlockRequest,
      O: DeleteSessionUnlockResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - SessionNotFound (20410): session not in database or does not belong to user
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SessionService.RequestSessionUnlock
     */
    requestSessionUnlock: {
      name: "RequestSessionUnlock",
      I: RequestSessionUnlockRequest,
      O: RequestSessionUnlockResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - SessionNotFound (20410)
     * - SessionNotUnlocked (20431)
     * - Internal (10500)
     *
     * @generated from rpc domain.SessionService.ExtendSessionUnlock
     */
    extendSessionUnlock: {
      name: "ExtendSessionUnlock",
      I: ExtendSessionUnlockRequest,
      O: ExtendSessionUnlockResponse,
      kind: MethodKind.Unary
    },
    /**
     * TODO Note: currently only sends FCM messages, thus only works for authenticator sessions
     * Note: This call does not throw an error even if no messages was actually sent.
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SessionService.SendSessionMessage
     */
    sendSessionMessage: {
      name: "SendSessionMessage",
      I: SendSessionMessageRequest,
      O: SendSessionMessageResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - SessionNotFound (20410): session not in database or does not belong to user
     * - MalformedClientSettings (20480): the client settings are not valid JSON
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SessionService.Update
     */
    update: {
      name: "Update",
      I: UpdateSessionRequest,
      O: UpdateSessionResponse,
      kind: MethodKind.Unary
    },
    /**
     * deprecated, use UpdateSession endpoint
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - SessionNotFound (20410): session not in database or does not belong to user
     * - MalformedClientSettings (20480): the client settings are not valid JSON
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SessionService.SetClientSettings
     */
    setClientSettings: {
      name: "SetClientSettings",
      I: SetClientSettingsRequest,
      O: SetClientSettingsResponse,
      kind: MethodKind.Unary
    }
  }
});
class PreviewShareLinkRequest extends Message {
  constructor(data) {
    super();
    this.shareLinkId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new PreviewShareLinkRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new PreviewShareLinkRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new PreviewShareLinkRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(PreviewShareLinkRequest, a, b);
  }
}
PreviewShareLinkRequest.runtime = proto3;
PreviewShareLinkRequest.typeName = "domain.PreviewShareLinkRequest";
PreviewShareLinkRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "share_link_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class PreviewShareLinkResponse extends Message {
  constructor(data) {
    super();
    this.encryptedPayload = new Uint8Array(0);
    this.senderEmail = "";
    this.organizationName = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new PreviewShareLinkResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new PreviewShareLinkResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new PreviewShareLinkResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(PreviewShareLinkResponse, a, b);
  }
}
PreviewShareLinkResponse.runtime = proto3;
PreviewShareLinkResponse.typeName = "domain.PreviewShareLinkResponse";
PreviewShareLinkResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "encrypted_payload",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 2,
    name: "sender_email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "organization_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ShowShareLinkRequest extends Message {
  constructor(data) {
    super();
    this.shareLinkId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ShowShareLinkRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ShowShareLinkRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ShowShareLinkRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ShowShareLinkRequest, a, b);
  }
}
ShowShareLinkRequest.runtime = proto3;
ShowShareLinkRequest.typeName = "domain.ShowShareLinkRequest";
ShowShareLinkRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "share_link_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class ShowShareLinkResponse extends Message {
  constructor(data) {
    super();
    this.encryptedPayload = new Uint8Array(0);
    this.encryptedProtectedSecret = new Uint8Array(0);
    this.senderEmail = "";
    this.organizationName = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new ShowShareLinkResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new ShowShareLinkResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new ShowShareLinkResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(ShowShareLinkResponse, a, b);
  }
}
ShowShareLinkResponse.runtime = proto3;
ShowShareLinkResponse.typeName = "domain.ShowShareLinkResponse";
ShowShareLinkResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "encrypted_payload",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 2,
    name: "encrypted_protected_secret",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 3,
    name: "sender_email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "organization_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
({
  typeName: "domain.ShareLinkService",
  methods: {
    /**
     * errors:
     * - ShareLinkNotFound (110400): share link not found or already used
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ShareLinkService.Preview
     */
    preview: {
      name: "Preview",
      I: PreviewShareLinkRequest,
      O: PreviewShareLinkResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - ShareLinkNotFound (110400): share link not found or already used
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.ShareLinkService.Show
     */
    show: {
      name: "Show",
      I: ShowShareLinkRequest,
      O: ShowShareLinkResponse,
      kind: MethodKind.Unary
    }
  }
});
({
  typeName: "domain.SupportService",
  methods: {
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - OrganizationNotFound (60400): not member of the given organization
     * - ProfileNotFound (): not a profile of this user
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SupportService.SendMessage
     */
    sendMessage: {
      name: "SendMessage",
      I: SendMessageRequest,
      O: SendMessageResponse,
      kind: MethodKind.Unary
    },
    /**
     * @generated from rpc domain.SupportService.ReportPage
     */
    reportPage: {
      name: "ReportPage",
      I: ReportPageRequest,
      O: ReportPageResponse,
      kind: MethodKind.Unary
    }
  }
});
class StreamingSyncRequest extends Message {
  constructor(data) {
    super();
    this.resetAndRequestSessionUnlock = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new StreamingSyncRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new StreamingSyncRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new StreamingSyncRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(StreamingSyncRequest, a, b);
  }
}
StreamingSyncRequest.runtime = proto3;
StreamingSyncRequest.typeName = "domain.StreamingSyncRequest";
StreamingSyncRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "reset_and_request_session_unlock",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class LongPollSyncRequest extends Message {
  constructor(data) {
    super();
    this.resetAndRequestSessionUnlock = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new LongPollSyncRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new LongPollSyncRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new LongPollSyncRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(LongPollSyncRequest, a, b);
  }
}
LongPollSyncRequest.runtime = proto3;
LongPollSyncRequest.typeName = "domain.LongPollSyncRequest";
LongPollSyncRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "reset_and_request_session_unlock",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class SyncRequest extends Message {
  constructor(data) {
    super();
    this.fcmMessageId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncRequest, a, b);
  }
}
SyncRequest.runtime = proto3;
SyncRequest.typeName = "domain.SyncRequest";
SyncRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "fcm_message_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SyncResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SyncResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SyncResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SyncResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SyncResponse, a, b);
  }
}
SyncResponse.runtime = proto3;
SyncResponse.typeName = "domain.SyncResponse";
SyncResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
({
  typeName: "domain.SyncService",
  methods: {
    /**
     * The StreamingSync call is an event stream that will send a SyncResponse to the client whenever
     * updates are available. This only includes updates that originate from a different client-id
     * than the StreamingSync call.
     *
     * This call takes an optional request_session_unlock parameter, which requests the session to be
     * unlocked if set. This allows clients to refresh their StreamingSync connection at the same time
     * as requesting an unlock, which is a typical initiation point for user interaction.
     *
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - SessionNotFound (20410): session not in database or does not belong to user
     * - Timeout (10200): timed out
     *
     * @generated from rpc domain.SyncService.StreamingSync
     */
    streamingSync: {
      name: "StreamingSync",
      I: StreamingSyncRequest,
      O: SyncResponse,
      kind: MethodKind.ServerStreaming
    },
    /**
     * The Sync call is a single unary request for a SyncResponse, but returns only once the user
     * syncVersion is bigger than the client-specified one.
     *
     * This call takes an optional request_session_unlock parameter, as above.
     *
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - SessionNotFound (20410): session not in database or does not belong to user
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SyncService.LongPollSync
     */
    longPollSync: {
      name: "LongPollSync",
      I: LongPollSyncRequest,
      O: SyncResponse,
      kind: MethodKind.Unary
    },
    /**
     * The Sync call is a single unary request for a SyncResponse.
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.SyncService.Sync
     */
    sync: {
      name: "Sync",
      I: SyncRequest,
      O: SyncResponse,
      kind: MethodKind.Unary
    }
  }
});
class UserConfirmationData extends Message {
  constructor(data) {
    super();
    this.type = UserConfirmationType.UNKNOWN;
    this.vaultId = "";
    this.loginId = "";
    this.profileId = "";
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UserConfirmationData().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UserConfirmationData().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UserConfirmationData().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UserConfirmationData, a, b);
  }
}
UserConfirmationData.runtime = proto3;
UserConfirmationData.typeName = "domain.UserConfirmationData";
UserConfirmationData.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "type", kind: "enum", T: proto3.getEnumType(UserConfirmationType) },
  {
    no: 2,
    name: "vaultId",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "loginId",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "profileId",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "organizationId",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CreateUserConfirmationRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateUserConfirmationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateUserConfirmationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateUserConfirmationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateUserConfirmationRequest, a, b);
  }
}
CreateUserConfirmationRequest.runtime = proto3;
CreateUserConfirmationRequest.typeName = "domain.CreateUserConfirmationRequest";
CreateUserConfirmationRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "data", kind: "message", T: UserConfirmationData }
]);
class CreateUserConfirmationResponse extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.webauthnOptionsJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateUserConfirmationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateUserConfirmationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateUserConfirmationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateUserConfirmationResponse, a, b);
  }
}
CreateUserConfirmationResponse.runtime = proto3;
CreateUserConfirmationResponse.typeName = "domain.CreateUserConfirmationResponse";
CreateUserConfirmationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate },
  {
    no: 2,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "webauthn_options_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetUserConfirmationRequest extends Message {
  constructor(data) {
    super();
    this.id = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetUserConfirmationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetUserConfirmationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetUserConfirmationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetUserConfirmationRequest, a, b);
  }
}
GetUserConfirmationRequest.runtime = proto3;
GetUserConfirmationRequest.typeName = "domain.GetUserConfirmationRequest";
GetUserConfirmationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class GetUserConfirmationResponse extends Message {
  constructor(data) {
    super();
    this.requestingSessionId = "";
    this.fallbackString = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new GetUserConfirmationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new GetUserConfirmationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new GetUserConfirmationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(GetUserConfirmationResponse, a, b);
  }
}
GetUserConfirmationResponse.runtime = proto3;
GetUserConfirmationResponse.typeName = "domain.GetUserConfirmationResponse";
GetUserConfirmationResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "requesting_session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "data", kind: "message", T: UserConfirmationData },
  {
    no: 3,
    name: "fallback_string",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SendUserConfirmationResultRequest extends Message {
  constructor(data) {
    super();
    this.id = "";
    this.type = UserConfirmationResultType.OPEN;
    this.webauthnResponseJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendUserConfirmationResultRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendUserConfirmationResultRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendUserConfirmationResultRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendUserConfirmationResultRequest, a, b);
  }
}
SendUserConfirmationResultRequest.runtime = proto3;
SendUserConfirmationResultRequest.typeName = "domain.SendUserConfirmationResultRequest";
SendUserConfirmationResultRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "type", kind: "enum", T: proto3.getEnumType(UserConfirmationResultType) },
  {
    no: 3,
    name: "webauthn_response_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class SendUserConfirmationResultResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new SendUserConfirmationResultResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new SendUserConfirmationResultResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new SendUserConfirmationResultResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(SendUserConfirmationResultResponse, a, b);
  }
}
SendUserConfirmationResultResponse.runtime = proto3;
SendUserConfirmationResultResponse.typeName = "domain.SendUserConfirmationResultResponse";
SendUserConfirmationResultResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class RetrieveUserConfirmationResultRequest extends Message {
  constructor(data) {
    super();
    this.id = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RetrieveUserConfirmationResultRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RetrieveUserConfirmationResultRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RetrieveUserConfirmationResultRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RetrieveUserConfirmationResultRequest, a, b);
  }
}
RetrieveUserConfirmationResultRequest.runtime = proto3;
RetrieveUserConfirmationResultRequest.typeName = "domain.RetrieveUserConfirmationResultRequest";
RetrieveUserConfirmationResultRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class RetrieveUserConfirmationResultResponse extends Message {
  constructor(data) {
    super();
    this.resultType = UserConfirmationResultType.OPEN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RetrieveUserConfirmationResultResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RetrieveUserConfirmationResultResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RetrieveUserConfirmationResultResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RetrieveUserConfirmationResultResponse, a, b);
  }
}
RetrieveUserConfirmationResultResponse.runtime = proto3;
RetrieveUserConfirmationResultResponse.typeName = "domain.RetrieveUserConfirmationResultResponse";
RetrieveUserConfirmationResultResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "result_type", kind: "enum", T: proto3.getEnumType(UserConfirmationResultType) }
]);
class CancelUserConfirmationRequest extends Message {
  constructor(data) {
    super();
    this.id = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CancelUserConfirmationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CancelUserConfirmationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CancelUserConfirmationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CancelUserConfirmationRequest, a, b);
  }
}
CancelUserConfirmationRequest.runtime = proto3;
CancelUserConfirmationRequest.typeName = "domain.CancelUserConfirmationRequest";
CancelUserConfirmationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class CancelUserConfirmationResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CancelUserConfirmationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CancelUserConfirmationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CancelUserConfirmationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CancelUserConfirmationResponse, a, b);
  }
}
CancelUserConfirmationResponse.runtime = proto3;
CancelUserConfirmationResponse.typeName = "domain.CancelUserConfirmationResponse";
CancelUserConfirmationResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
({
  typeName: "domain.UserConfirmationService",
  methods: {
    /**
     * errors:
     * - BadRequest (10400): user confirmation data is invalid
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - Internal (10500)
     *
     * @generated from rpc domain.UserConfirmationService.Create
     */
    create: {
      name: "Create",
      I: CreateUserConfirmationRequest,
      O: CreateUserConfirmationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - UserConfirmationNotFound (120400)
     * - Internal (10500)
     *
     * @generated from rpc domain.UserConfirmationService.Get
     */
    get: {
      name: "Get",
      I: GetUserConfirmationRequest,
      O: GetUserConfirmationResponse,
      kind: MethodKind.Unary
    },
    /**
     * Restricted to authenticator sessions, unless called with webauthn_credential_data filled.
     * errors:
     * - BadRequest (10400): invalid result type was sent, or by session that is not self unlocking
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - UserConfirmationNotFound (120400)
     * - Internal (10500)
     *
     * @generated from rpc domain.UserConfirmationService.SendResult
     */
    sendResult: {
      name: "SendResult",
      I: SendUserConfirmationResultRequest,
      O: SendUserConfirmationResultResponse,
      kind: MethodKind.Unary
    },
    /**
     * Restricted to session which created the UserConfirmation. Calling this endpoint clears the
     * UserConfirmation on the backend as well.
     * errors:
     * - BadRequest (10400): user confirmation did not have a result yet, or did not belong to session
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - UserConfirmationNotFound (120400)
     * - Internal (10500)
     *
     * @generated from rpc domain.UserConfirmationService.RetrieveResult
     */
    retrieveResult: {
      name: "RetrieveResult",
      I: RetrieveUserConfirmationResultRequest,
      O: RetrieveUserConfirmationResultResponse,
      kind: MethodKind.Unary
    },
    /**
     * Restricted to session which created the UserConfirmation. This endpoint is idempotent, and
     * returns success if a confirmation was already cancelled or resolved.
     * errors:
     * - BadRequest (10400): user confirmation did not belong to session
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - Internal (10500)
     *
     * @generated from rpc domain.UserConfirmationService.Cancel
     */
    cancel: {
      name: "Cancel",
      I: CancelUserConfirmationRequest,
      O: CancelUserConfirmationResponse,
      kind: MethodKind.Unary
    }
  }
});
({
  typeName: "domain.VaultService",
  methods: {
    /**
     * errors:
     * - BadRequest (10400): trying to update share link from another vault
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - VaultNotFound (50400)
     * - InvalidUpdateTime (50430): invalid update time
     * - VaultDirty (50450): vault needs to be regenerated before commit can be made (is flagged dirty)
     * - EmptyCommit (50200): commit blob is empty
     * - PermissionDenied (10100): insufficient permissions
     * - VaultOutOfSync (50100): latest_commit_id does not match, or generation_id of message does not match
     * - NotAllowedForVault (50110): target vault of vault message not valid
     * - MissingVaultMessagePublicKey (50461): the vault has no message public key, but it is required for the operation
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.VaultService.CreateCommit
     */
    createCommit: {
      name: "CreateCommit",
      I: CreateCommitRequest,
      O: CreateCommitResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - VaultNotFound (50400): vault not found
     * - EmptyCommit (50200): commit blob is empty
     * - PermissionDenied (10100): insufficient permissions
     * - VaultOutOfSync (50100): latest_commit_id does not match, or generation_id of message does not match
     * - NotAllowedForVault (50110): target vault of vault message not valid
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.VaultService.CreateGeneration
     */
    createGeneration: {
      name: "CreateGeneration",
      I: CreateGenerationRequest,
      O: CreateGenerationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - VaultNotFound (50400): vault not found
     * - PermissionDenied (10100): insufficient permissions
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.VaultService.ListCommits
     */
    listCommits: {
      name: "ListCommits",
      I: ListCommitsRequest,
      O: ListCommitsResponse,
      kind: MethodKind.Unary
    },
    /**
     * Create creates a new vault for the authenticated user.
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - UserNotFound (20400): user not found
     * - InvalidVaultType (50431): given vault types are not allowed
     * - OrganizationInsufficientAccess (60100): user may not create team in specified organization
     * - OrganizationNotFound (60400): organization does not exist or user is not a member
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.VaultService.CreateTeam
     */
    createTeam: {
      name: "CreateTeam",
      I: CreateTeamRequest,
      O: CreateTeamResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - VaultNotFound (50400): vault not found
     * - PermissionDenied (10100): insufficient permissions
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.VaultService.DeleteTeam
     */
    deleteTeam: {
      name: "DeleteTeam",
      I: DeleteTeamRequest,
      O: DeleteTeamResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - UserNotFound (20400): one of the users to add was not found
     * - NotAllowedForUserType (20470): tried to add/remove an organization user
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - NotAllowedForVault (50110): tried to change users on a personal vault
     * - VaultNotFound (50400): vault not found or associated vault id does not match
     * - EmptyCommit (50200): commit blob is empty
     * - InvalidUpdateTime (50430): invalid update time
     * - VaultOutOfSync (50100): latest_commit_id, generation_id or assoc_generation_id does not match
     * - MissingLock (50410): a lock is missing for regneration or no keks were provided for a new authenticator
     * - MissingVault (50420): missing associated regenerate data
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.VaultService.ModifyTeamUsers
     */
    modifyTeamUsers: {
      name: "ModifyTeamUsers",
      I: ModifyTeamUsersRequest,
      O: ModifyTeamUsersResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100): missing credentials
     * - InvalidCredentials (30420): the credentials provided are invalid (e.g. session was deleted)
     * - MissingVaultAuthenticatorLock (50410): a vault authenticator lock is missing
     * - MissingVault (50420): missing VaultPairCreationData
     * - MissingEncryptedVaultMessagePrivateKey (50460): a lock is missing the encrypted private key
     * - MissingVaultMessagePublicKey (50461): no message public key was provided
     * - VaultInboxSlugInvalid (50470): the inbox slug is invalid
     * - VaultInboxSlugTaken (50471): the inbox slug is already in use
     * - OrganizationInsufficientAccess (60100): not allowed to create vaults in organization
     * - OrganizationNotFound (60400): organization not found or no access
     * - ProfileNotFound (70400): the profile was not found for the user
     * - ProfileAlreadyEnabled (70401): got authenticatelocks for profile-enabled user
     * - ProfileOutOfSync (70411): ProfileLock does not have curren KeyGenerationId
     * - Internal (10500)
     *
     * @generated from rpc domain.VaultService.CreateInboxVault
     */
    createInboxVault: {
      name: "CreateInboxVault",
      I: CreateInboxVaultRequest,
      O: CreateInboxVaultResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - PermissionDenied (10100): no access to the vault
     * - NotAllowedForVault (50110): specified vault is not an inbox Vault
     * - VaultInboxSlugInvalid (50470)
     * - VaultInboxSlugTaken (50471)
     * - Internal (10500)
     *
     * @generated from rpc domain.VaultService.UpdateInbox
     */
    updateInbox: {
      name: "UpdateInbox",
      I: UpdateInboxRequest,
      O: UpdateInboxResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - VaultNotFound (50400)
     * - NotAllowedForVault (50110): specified vault is not an inbox Vault
     * - PermissionDenied (10100): no access to the vault
     * - Internal (10500)
     *
     * @generated from rpc domain.VaultService.DeleteInboxVault
     */
    deleteInboxVault: {
      name: "DeleteInboxVault",
      I: DeleteInboxVaultRequest,
      O: DeleteInboxVaultResponse,
      kind: MethodKind.Unary
    },
    /**
     * Note this method does not throw VaultNotFound.
     * Missing vaults will just be missing from the result.
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - OrganizationNotFound (60400)
     * - Internal (10500)
     *
     * @generated from rpc domain.VaultService.ListMessagePublicKeys
     */
    listMessagePublicKeys: {
      name: "ListMessagePublicKeys",
      I: ListMessagePublicKeysRequest,
      O: ListMessagePublicKeysResponse,
      kind: MethodKind.Unary
    }
  }
});
class RegisterCredentialInitRequest extends Message {
  constructor(data) {
    super();
    this.credentialType = CredentialType.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegisterCredentialInitRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegisterCredentialInitRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegisterCredentialInitRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegisterCredentialInitRequest, a, b);
  }
}
RegisterCredentialInitRequest.runtime = proto3;
RegisterCredentialInitRequest.typeName = "domain.RegisterCredentialInitRequest";
RegisterCredentialInitRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "credential_type", kind: "enum", T: proto3.getEnumType(CredentialType) }
]);
class RegisterCredentialInitResponse extends Message {
  constructor(data) {
    super();
    this.requestId = "";
    this.optionsJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegisterCredentialInitResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegisterCredentialInitResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegisterCredentialInitResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegisterCredentialInitResponse, a, b);
  }
}
RegisterCredentialInitResponse.runtime = proto3;
RegisterCredentialInitResponse.typeName = "domain.RegisterCredentialInitResponse";
RegisterCredentialInitResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "options_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class RegisterCredentialForAccountCreationInitRequest extends Message {
  constructor(data) {
    super();
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegisterCredentialForAccountCreationInitRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegisterCredentialForAccountCreationInitRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegisterCredentialForAccountCreationInitRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegisterCredentialForAccountCreationInitRequest, a, b);
  }
}
RegisterCredentialForAccountCreationInitRequest.runtime = proto3;
RegisterCredentialForAccountCreationInitRequest.typeName = "domain.RegisterCredentialForAccountCreationInitRequest";
RegisterCredentialForAccountCreationInitRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class RegisterCredentialForAccountCreationInitResponse extends Message {
  constructor(data) {
    super();
    this.requestId = "";
    this.optionsJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegisterCredentialForAccountCreationInitResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegisterCredentialForAccountCreationInitResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegisterCredentialForAccountCreationInitResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegisterCredentialForAccountCreationInitResponse, a, b);
  }
}
RegisterCredentialForAccountCreationInitResponse.runtime = proto3;
RegisterCredentialForAccountCreationInitResponse.typeName = "domain.RegisterCredentialForAccountCreationInitResponse";
RegisterCredentialForAccountCreationInitResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "options_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class RegisterCredentialFinishRequest extends Message {
  constructor(data) {
    super();
    this.requestId = "";
    this.responseJson = "";
    this.prfSupportStatus = WebauthnPrfSupportStatus.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegisterCredentialFinishRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegisterCredentialFinishRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegisterCredentialFinishRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegisterCredentialFinishRequest, a, b);
  }
}
RegisterCredentialFinishRequest.runtime = proto3;
RegisterCredentialFinishRequest.typeName = "domain.RegisterCredentialFinishRequest";
RegisterCredentialFinishRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "response_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "prf_support_status", kind: "enum", T: proto3.getEnumType(WebauthnPrfSupportStatus) }
]);
class RegisterCredentialFinishResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new RegisterCredentialFinishResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new RegisterCredentialFinishResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new RegisterCredentialFinishResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(RegisterCredentialFinishResponse, a, b);
  }
}
RegisterCredentialFinishResponse.runtime = proto3;
RegisterCredentialFinishResponse.typeName = "domain.RegisterCredentialFinishResponse";
RegisterCredentialFinishResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class UnlockSessionInitRequest extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UnlockSessionInitRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UnlockSessionInitRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UnlockSessionInitRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UnlockSessionInitRequest, a, b);
  }
}
UnlockSessionInitRequest.runtime = proto3;
UnlockSessionInitRequest.typeName = "domain.UnlockSessionInitRequest";
UnlockSessionInitRequest.fields = proto3.util.newFieldList(() => []);
class UnlockSessionInitResponse extends Message {
  constructor(data) {
    super();
    this.requestId = "";
    this.optionsJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UnlockSessionInitResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UnlockSessionInitResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UnlockSessionInitResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UnlockSessionInitResponse, a, b);
  }
}
UnlockSessionInitResponse.runtime = proto3;
UnlockSessionInitResponse.typeName = "domain.UnlockSessionInitResponse";
UnlockSessionInitResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "options_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class UnlockSessionFinishRequest extends Message {
  constructor(data) {
    super();
    this.requestId = "";
    this.responseJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UnlockSessionFinishRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UnlockSessionFinishRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UnlockSessionFinishRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UnlockSessionFinishRequest, a, b);
  }
}
UnlockSessionFinishRequest.runtime = proto3;
UnlockSessionFinishRequest.typeName = "domain.UnlockSessionFinishRequest";
UnlockSessionFinishRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "response_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "max_expires_at", kind: "message", T: Timestamp }
]);
class UnlockSessionFinishResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new UnlockSessionFinishResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new UnlockSessionFinishResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new UnlockSessionFinishResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(UnlockSessionFinishResponse, a, b);
  }
}
UnlockSessionFinishResponse.runtime = proto3;
UnlockSessionFinishResponse.typeName = "domain.UnlockSessionFinishResponse";
UnlockSessionFinishResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
class DeleteCredentialsRequest extends Message {
  constructor(data) {
    super();
    this.webauthnIds = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteCredentialsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteCredentialsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteCredentialsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteCredentialsRequest, a, b);
  }
}
DeleteCredentialsRequest.runtime = proto3;
DeleteCredentialsRequest.typeName = "domain.DeleteCredentialsRequest";
DeleteCredentialsRequest.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "webauthn_ids", kind: "scalar", T: 9, repeated: true }
]);
class DeleteCredentialsResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new DeleteCredentialsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new DeleteCredentialsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new DeleteCredentialsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(DeleteCredentialsResponse, a, b);
  }
}
DeleteCredentialsResponse.runtime = proto3;
DeleteCredentialsResponse.typeName = "domain.DeleteCredentialsResponse";
DeleteCredentialsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "sync_update", kind: "message", T: SyncUpdate }
]);
({
  typeName: "domain.WebauthnService",
  methods: {
    /**
     * errors:
     * - BadRequest (10400): if an unknown credential type is given
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - SessionNotUnlocked (20431)
     * - Internal (10500)
     *
     * @generated from rpc domain.WebauthnService.RegisterCredentialInit
     */
    registerCredentialInit: {
      name: "RegisterCredentialInit",
      I: RegisterCredentialInitRequest,
      O: RegisterCredentialInitResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - InvalidEmail (20101)
     * - Internal (10500)
     *
     * @generated from rpc domain.WebauthnService.RegisterCredentialForAccountCreationInit
     */
    registerCredentialForAccountCreationInit: {
      name: "RegisterCredentialForAccountCreationInit",
      I: RegisterCredentialForAccountCreationInitRequest,
      O: RegisterCredentialForAccountCreationInitResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - SessionNotUnlocked (20431)
     * - WebauthnValidateError (80400): there is a cryptographic error with the response
     * - WebauthnDataError (80401): there is a parsing error with the response
     * - WebauthnInvalidTransport (80403): credential had an invalid transport (for its type)
     * - WebauthnRequestNotFound (80402): the request_id was not found, or timed out
     * - Internal (10500)
     *
     * @generated from rpc domain.WebauthnService.RegisterCredentialFinish
     */
    registerCredentialFinish: {
      name: "RegisterCredentialFinish",
      I: RegisterCredentialFinishRequest,
      O: RegisterCredentialFinishResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - SessionNotUnlocked (20431): session can't be unlocked due to missing encrypted_session_unlock
     * - MissingWebauthnCredential (80404): if no webauthn credentials are registered
     * - Internal (10500)
     *
     * @generated from rpc domain.WebauthnService.UnlockSessionInit
     */
    unlockSessionInit: {
      name: "UnlockSessionInit",
      I: UnlockSessionInitRequest,
      O: UnlockSessionInitResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - InvalidTimeout (20420): expires_at is already expired
     * - WebauthnValidateError (80400): there is a cryptographic error with the response
     * - WebauthnDataError (80401): there is a parsing error with the response
     * - WebauthnRequestNotFound (80402): the request_id was not found, or timed out
     * - Internal (10500)
     *
     * @generated from rpc domain.WebauthnService.UnlockSessionFinish
     */
    unlockSessionFinish: {
      name: "UnlockSessionFinish",
      I: UnlockSessionFinishRequest,
      O: UnlockSessionFinishResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - MissingCredentials (30100)
     * - InvalidCredentials (30420)
     * - Internal (10500)
     *
     * @generated from rpc domain.WebauthnService.DeleteCredentials
     */
    deleteCredentials: {
      name: "DeleteCredentials",
      I: DeleteCredentialsRequest,
      O: DeleteCredentialsResponse,
      kind: MethodKind.Unary
    }
  }
});
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class CancelToken {
  constructor() {
    this.isCancelled = false;
    this.emitter = new Emittery$1.Typed();
  }
  static create() {
    return new CancelToken();
  }
  cancel() {
    this.performCancel().catch(trackError);
  }
  onCancel(cancelHandler) {
    if (this.isCancelled) {
      cancelHandler();
    } else {
      this.emitter.on("cancel", cancelHandler);
    }
  }
  offCancel(cancelHandler) {
    this.emitter.off("cancel", cancelHandler);
  }
  get signal() {
    if (!this.abortController) {
      this.abortController = new AbortController();
      if (this.isCancelled) {
        this.abortController.abort();
      }
    }
    return this.abortController.signal;
  }
  performCancel() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.isCancelled) {
        this.isCancelled = true;
        yield this.emitter.emit("cancel");
        this.emitter.clearListeners("cancel");
        (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
      }
    });
  }
}
class AuthenticatorReply extends Message {
  constructor(data) {
    super();
    this.replyOneof = { case: void 0 };
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new AuthenticatorReply().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new AuthenticatorReply().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new AuthenticatorReply().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(AuthenticatorReply, a, b);
  }
}
AuthenticatorReply.runtime = proto3;
AuthenticatorReply.typeName = "domain.AuthenticatorReply";
AuthenticatorReply.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "encrypted_secret_reply", kind: "message", T: EncryptedSecretAuthenticatorReply, oneof: "reply_oneof" }
]);
class EncryptedSecretAuthenticatorReply extends Message {
  constructor(data) {
    super();
    this.encryptedSecret = new Uint8Array(0);
    this.registration = false;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new EncryptedSecretAuthenticatorReply().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new EncryptedSecretAuthenticatorReply().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new EncryptedSecretAuthenticatorReply().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(EncryptedSecretAuthenticatorReply, a, b);
  }
}
EncryptedSecretAuthenticatorReply.runtime = proto3;
EncryptedSecretAuthenticatorReply.typeName = "domain.EncryptedSecretAuthenticatorReply";
EncryptedSecretAuthenticatorReply.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "encrypted_secret",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  },
  {
    no: 2,
    name: "registration",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]);
class TestingDropLatestCommitRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDropLatestCommitRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDropLatestCommitRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDropLatestCommitRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDropLatestCommitRequest, a, b);
  }
}
TestingDropLatestCommitRequest.runtime = proto3;
TestingDropLatestCommitRequest.typeName = "domain.TestingDropLatestCommitRequest";
TestingDropLatestCommitRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingDropLatestCommitResponse extends Message {
  constructor(data) {
    super();
    this.latestCommitId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDropLatestCommitResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDropLatestCommitResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDropLatestCommitResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDropLatestCommitResponse, a, b);
  }
}
TestingDropLatestCommitResponse.runtime = proto3;
TestingDropLatestCommitResponse.typeName = "domain.TestingDropLatestCommitResponse";
TestingDropLatestCommitResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "latest_commit_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingListEmailsRequest extends Message {
  constructor(data) {
    super();
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingListEmailsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingListEmailsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingListEmailsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingListEmailsRequest, a, b);
  }
}
TestingListEmailsRequest.runtime = proto3;
TestingListEmailsRequest.typeName = "domain.TestingListEmailsRequest";
TestingListEmailsRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingListEmailsResponse extends Message {
  constructor(data) {
    super();
    this.emails = [];
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingListEmailsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingListEmailsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingListEmailsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingListEmailsResponse, a, b);
  }
}
TestingListEmailsResponse.runtime = proto3;
TestingListEmailsResponse.typeName = "domain.TestingListEmailsResponse";
TestingListEmailsResponse.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "emails", kind: "message", T: TestingListEmailsResponse_Email, repeated: true }
]);
class TestingListEmailsResponse_Email extends Message {
  constructor(data) {
    super();
    this.to = "";
    this.template = "";
    this.data = {};
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingListEmailsResponse_Email().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingListEmailsResponse_Email().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingListEmailsResponse_Email().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingListEmailsResponse_Email, a, b);
  }
}
TestingListEmailsResponse_Email.runtime = proto3;
TestingListEmailsResponse_Email.typeName = "domain.TestingListEmailsResponse.Email";
TestingListEmailsResponse_Email.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "to",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "template",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "data", kind: "map", K: 9, V: {
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  } }
]);
class TestingSetServerSideSettingsRequest extends Message {
  constructor(data) {
    super();
    this.userId = "";
    this.serverSideSettings = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingSetServerSideSettingsRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingSetServerSideSettingsRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingSetServerSideSettingsRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingSetServerSideSettingsRequest, a, b);
  }
}
TestingSetServerSideSettingsRequest.runtime = proto3;
TestingSetServerSideSettingsRequest.typeName = "domain.TestingSetServerSideSettingsRequest";
TestingSetServerSideSettingsRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "server_side_settings",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingSetServerSideSettingsResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingSetServerSideSettingsResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingSetServerSideSettingsResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingSetServerSideSettingsResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingSetServerSideSettingsResponse, a, b);
  }
}
TestingSetServerSideSettingsResponse.runtime = proto3;
TestingSetServerSideSettingsResponse.typeName = "domain.TestingSetServerSideSettingsResponse";
TestingSetServerSideSettingsResponse.fields = proto3.util.newFieldList(() => []);
class TestingDeleteUserRequest extends Message {
  constructor(data) {
    super();
    this.userId = "";
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDeleteUserRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDeleteUserRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDeleteUserRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDeleteUserRequest, a, b);
  }
}
TestingDeleteUserRequest.runtime = proto3;
TestingDeleteUserRequest.typeName = "domain.TestingDeleteUserRequest";
TestingDeleteUserRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingDeleteUserResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDeleteUserResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDeleteUserResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDeleteUserResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDeleteUserResponse, a, b);
  }
}
TestingDeleteUserResponse.runtime = proto3;
TestingDeleteUserResponse.typeName = "domain.TestingDeleteUserResponse";
TestingDeleteUserResponse.fields = proto3.util.newFieldList(() => []);
class TestingAddAuthenticatorRequest extends Message {
  constructor(data) {
    super();
    this.userId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingAddAuthenticatorRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingAddAuthenticatorRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingAddAuthenticatorRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingAddAuthenticatorRequest, a, b);
  }
}
TestingAddAuthenticatorRequest.runtime = proto3;
TestingAddAuthenticatorRequest.typeName = "domain.TestingAddAuthenticatorRequest";
TestingAddAuthenticatorRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "authenticator", kind: "message", T: AuthenticatorData },
  { no: 3, name: "block", kind: "message", T: AuthenticatorBlock }
]);
class TestingAddAuthenticatorResponse extends Message {
  constructor(data) {
    super();
    this.authenticatorId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingAddAuthenticatorResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingAddAuthenticatorResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingAddAuthenticatorResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingAddAuthenticatorResponse, a, b);
  }
}
TestingAddAuthenticatorResponse.runtime = proto3;
TestingAddAuthenticatorResponse.typeName = "domain.TestingAddAuthenticatorResponse";
TestingAddAuthenticatorResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingDeleteAuthenticatorRequest extends Message {
  constructor(data) {
    super();
    this.authenticatorId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDeleteAuthenticatorRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDeleteAuthenticatorRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDeleteAuthenticatorRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDeleteAuthenticatorRequest, a, b);
  }
}
TestingDeleteAuthenticatorRequest.runtime = proto3;
TestingDeleteAuthenticatorRequest.typeName = "domain.TestingDeleteAuthenticatorRequest";
TestingDeleteAuthenticatorRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingDeleteAuthenticatorResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDeleteAuthenticatorResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDeleteAuthenticatorResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDeleteAuthenticatorResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDeleteAuthenticatorResponse, a, b);
  }
}
TestingDeleteAuthenticatorResponse.runtime = proto3;
TestingDeleteAuthenticatorResponse.typeName = "domain.TestingDeleteAuthenticatorResponse";
TestingDeleteAuthenticatorResponse.fields = proto3.util.newFieldList(() => []);
class TestingEditAuthenticatorRequest extends Message {
  constructor(data) {
    super();
    this.authenticatorId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingEditAuthenticatorRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingEditAuthenticatorRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingEditAuthenticatorRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingEditAuthenticatorRequest, a, b);
  }
}
TestingEditAuthenticatorRequest.runtime = proto3;
TestingEditAuthenticatorRequest.typeName = "domain.TestingEditAuthenticatorRequest";
TestingEditAuthenticatorRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "authenticator_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "data", kind: "message", T: AuthenticatorData }
]);
class TestingEditAuthenticatorResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingEditAuthenticatorResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingEditAuthenticatorResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingEditAuthenticatorResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingEditAuthenticatorResponse, a, b);
  }
}
TestingEditAuthenticatorResponse.runtime = proto3;
TestingEditAuthenticatorResponse.typeName = "domain.TestingEditAuthenticatorResponse";
TestingEditAuthenticatorResponse.fields = proto3.util.newFieldList(() => []);
class TestingDeleteAuthenticatorBlockRequest extends Message {
  constructor(data) {
    super();
    this.hash = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDeleteAuthenticatorBlockRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDeleteAuthenticatorBlockRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDeleteAuthenticatorBlockRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDeleteAuthenticatorBlockRequest, a, b);
  }
}
TestingDeleteAuthenticatorBlockRequest.runtime = proto3;
TestingDeleteAuthenticatorBlockRequest.typeName = "domain.TestingDeleteAuthenticatorBlockRequest";
TestingDeleteAuthenticatorBlockRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "hash",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class TestingDeleteAuthenticatorBlockResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDeleteAuthenticatorBlockResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDeleteAuthenticatorBlockResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDeleteAuthenticatorBlockResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDeleteAuthenticatorBlockResponse, a, b);
  }
}
TestingDeleteAuthenticatorBlockResponse.runtime = proto3;
TestingDeleteAuthenticatorBlockResponse.typeName = "domain.TestingDeleteAuthenticatorBlockResponse";
TestingDeleteAuthenticatorBlockResponse.fields = proto3.util.newFieldList(() => []);
class TestingDeleteVaultRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDeleteVaultRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDeleteVaultRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDeleteVaultRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDeleteVaultRequest, a, b);
  }
}
TestingDeleteVaultRequest.runtime = proto3;
TestingDeleteVaultRequest.typeName = "domain.TestingDeleteVaultRequest";
TestingDeleteVaultRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingDeleteVaultResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingDeleteVaultResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingDeleteVaultResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingDeleteVaultResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingDeleteVaultResponse, a, b);
  }
}
TestingDeleteVaultResponse.runtime = proto3;
TestingDeleteVaultResponse.typeName = "domain.TestingDeleteVaultResponse";
TestingDeleteVaultResponse.fields = proto3.util.newFieldList(() => []);
class TestingInjectPaddleWebhookRequest extends Message {
  constructor(data) {
    super();
    this.dataJson = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingInjectPaddleWebhookRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingInjectPaddleWebhookRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingInjectPaddleWebhookRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingInjectPaddleWebhookRequest, a, b);
  }
}
TestingInjectPaddleWebhookRequest.runtime = proto3;
TestingInjectPaddleWebhookRequest.typeName = "domain.TestingInjectPaddleWebhookRequest";
TestingInjectPaddleWebhookRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "data_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingInjectPaddleWebhookResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingInjectPaddleWebhookResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingInjectPaddleWebhookResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingInjectPaddleWebhookResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingInjectPaddleWebhookResponse, a, b);
  }
}
TestingInjectPaddleWebhookResponse.runtime = proto3;
TestingInjectPaddleWebhookResponse.typeName = "domain.TestingInjectPaddleWebhookResponse";
TestingInjectPaddleWebhookResponse.fields = proto3.util.newFieldList(() => []);
class TestingUpdatePaddleRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingUpdatePaddleRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingUpdatePaddleRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingUpdatePaddleRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingUpdatePaddleRequest, a, b);
  }
}
TestingUpdatePaddleRequest.runtime = proto3;
TestingUpdatePaddleRequest.typeName = "domain.TestingUpdatePaddleRequest";
TestingUpdatePaddleRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingUpdatePaddleResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingUpdatePaddleResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingUpdatePaddleResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingUpdatePaddleResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingUpdatePaddleResponse, a, b);
  }
}
TestingUpdatePaddleResponse.runtime = proto3;
TestingUpdatePaddleResponse.typeName = "domain.TestingUpdatePaddleResponse";
TestingUpdatePaddleResponse.fields = proto3.util.newFieldList(() => []);
class TestingCreateCouponRequest extends Message {
  constructor(data) {
    super();
    this.couponText = "";
    this.freeMembers = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingCreateCouponRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingCreateCouponRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingCreateCouponRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingCreateCouponRequest, a, b);
  }
}
TestingCreateCouponRequest.runtime = proto3;
TestingCreateCouponRequest.typeName = "domain.TestingCreateCouponRequest";
TestingCreateCouponRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "coupon_text",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "free_members",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
class TestingCreateCouponResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingCreateCouponResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingCreateCouponResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingCreateCouponResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingCreateCouponResponse, a, b);
  }
}
TestingCreateCouponResponse.runtime = proto3;
TestingCreateCouponResponse.typeName = "domain.TestingCreateCouponResponse";
TestingCreateCouponResponse.fields = proto3.util.newFieldList(() => []);
class TestingUpdateOrganizationRequest extends Message {
  constructor(data) {
    super();
    this.organizationId = "";
    this.licenseType = LicenseType.UNKNOWN;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingUpdateOrganizationRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingUpdateOrganizationRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingUpdateOrganizationRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingUpdateOrganizationRequest, a, b);
  }
}
TestingUpdateOrganizationRequest.runtime = proto3;
TestingUpdateOrganizationRequest.typeName = "domain.TestingUpdateOrganizationRequest";
TestingUpdateOrganizationRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "organization_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "created_at", kind: "message", T: Timestamp },
  { no: 3, name: "license_type", kind: "enum", T: proto3.getEnumType(LicenseType) }
]);
class TestingUpdateOrganizationResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingUpdateOrganizationResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingUpdateOrganizationResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingUpdateOrganizationResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingUpdateOrganizationResponse, a, b);
  }
}
TestingUpdateOrganizationResponse.runtime = proto3;
TestingUpdateOrganizationResponse.typeName = "domain.TestingUpdateOrganizationResponse";
TestingUpdateOrganizationResponse.fields = proto3.util.newFieldList(() => []);
class CreateVaultMessageRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    this.type = VaultMessageType.UNKNOWN;
    this.data = new Uint8Array(0);
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateVaultMessageRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateVaultMessageRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateVaultMessageRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateVaultMessageRequest, a, b);
  }
}
CreateVaultMessageRequest.runtime = proto3;
CreateVaultMessageRequest.typeName = "domain.CreateVaultMessageRequest";
CreateVaultMessageRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "type", kind: "enum", T: proto3.getEnumType(VaultMessageType) },
  {
    no: 3,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);
class CreateVaultMessageResponse extends Message {
  constructor(data) {
    super();
    this.messageId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new CreateVaultMessageResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new CreateVaultMessageResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new CreateVaultMessageResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(CreateVaultMessageResponse, a, b);
  }
}
CreateVaultMessageResponse.runtime = proto3;
CreateVaultMessageResponse.typeName = "domain.CreateVaultMessageResponse";
CreateVaultMessageResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "message_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingWebauthnCreateCredentialRequest extends Message {
  constructor(data) {
    super();
    this.userId = "";
    this.credentialType = CredentialType.UNKNOWN;
    this.credentialJson = "";
    this.sessionId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingWebauthnCreateCredentialRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingWebauthnCreateCredentialRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingWebauthnCreateCredentialRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingWebauthnCreateCredentialRequest, a, b);
  }
}
TestingWebauthnCreateCredentialRequest.runtime = proto3;
TestingWebauthnCreateCredentialRequest.typeName = "domain.TestingWebauthnCreateCredentialRequest";
TestingWebauthnCreateCredentialRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "credential_type", kind: "enum", T: proto3.getEnumType(CredentialType) },
  {
    no: 3,
    name: "credential_json",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "session_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingWebauthnCreateCredentialResponse extends Message {
  constructor(data) {
    super();
    this.webauthnId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingWebauthnCreateCredentialResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingWebauthnCreateCredentialResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingWebauthnCreateCredentialResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingWebauthnCreateCredentialResponse, a, b);
  }
}
TestingWebauthnCreateCredentialResponse.runtime = proto3;
TestingWebauthnCreateCredentialResponse.typeName = "domain.TestingWebauthnCreateCredentialResponse";
TestingWebauthnCreateCredentialResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "webauthn_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingManipulateVaultRequest extends Message {
  constructor(data) {
    super();
    this.vaultId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingManipulateVaultRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingManipulateVaultRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingManipulateVaultRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingManipulateVaultRequest, a, b);
  }
}
TestingManipulateVaultRequest.runtime = proto3;
TestingManipulateVaultRequest.typeName = "domain.TestingManipulateVaultRequest";
TestingManipulateVaultRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "vault_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "dirty", kind: "scalar", T: 8, opt: true },
  { no: 3, name: "message_public_key", kind: "scalar", T: 12, opt: true }
]);
class TestingManipulateVaultResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingManipulateVaultResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingManipulateVaultResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingManipulateVaultResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingManipulateVaultResponse, a, b);
  }
}
TestingManipulateVaultResponse.runtime = proto3;
TestingManipulateVaultResponse.typeName = "domain.TestingManipulateVaultResponse";
TestingManipulateVaultResponse.fields = proto3.util.newFieldList(() => []);
class TestingCancelUserStreamingRequest extends Message {
  constructor(data) {
    super();
    this.userId = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingCancelUserStreamingRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingCancelUserStreamingRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingCancelUserStreamingRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingCancelUserStreamingRequest, a, b);
  }
}
TestingCancelUserStreamingRequest.runtime = proto3;
TestingCancelUserStreamingRequest.typeName = "domain.TestingCancelUserStreamingRequest";
TestingCancelUserStreamingRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "user_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingCancelUserStreamingResponse extends Message {
  constructor(data) {
    super();
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingCancelUserStreamingResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingCancelUserStreamingResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingCancelUserStreamingResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingCancelUserStreamingResponse, a, b);
  }
}
TestingCancelUserStreamingResponse.runtime = proto3;
TestingCancelUserStreamingResponse.typeName = "domain.TestingCancelUserStreamingResponse";
TestingCancelUserStreamingResponse.fields = proto3.util.newFieldList(() => []);
class TestingGetEmailStateRequest extends Message {
  constructor(data) {
    super();
    this.email = "";
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingGetEmailStateRequest().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingGetEmailStateRequest().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingGetEmailStateRequest().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingGetEmailStateRequest, a, b);
  }
}
TestingGetEmailStateRequest.runtime = proto3;
TestingGetEmailStateRequest.typeName = "domain.TestingGetEmailStateRequest";
TestingGetEmailStateRequest.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "email",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]);
class TestingGetEmailStateResponse extends Message {
  constructor(data) {
    super();
    this.privateProfileExists = false;
    this.freeOrgProfileCount = 0;
    this.connectedOrgProfileCount = 0;
    proto3.util.initPartial(data, this);
  }
  static fromBinary(bytes, options) {
    return new TestingGetEmailStateResponse().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new TestingGetEmailStateResponse().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new TestingGetEmailStateResponse().fromJsonString(jsonString, options);
  }
  static equals(a, b) {
    return proto3.util.equals(TestingGetEmailStateResponse, a, b);
  }
}
TestingGetEmailStateResponse.runtime = proto3;
TestingGetEmailStateResponse.typeName = "domain.TestingGetEmailStateResponse";
TestingGetEmailStateResponse.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "private_profile_exists",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "free_org_profile_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "connected_org_profile_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);
({
  typeName: "domain.TestingService",
  methods: {
    /**
     * errors:
     * - VaultNotFound (50400): vault not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.TestingService.TestingDropLatestCommit
     */
    testingDropLatestCommit: {
      name: "TestingDropLatestCommit",
      I: TestingDropLatestCommitRequest,
      O: TestingDropLatestCommitResponse,
      kind: MethodKind.Unary
    },
    /**
     * no errors
     *
     * @generated from rpc domain.TestingService.TestingListEmails
     */
    testingListEmails: {
      name: "TestingListEmails",
      I: TestingListEmailsRequest,
      O: TestingListEmailsResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.TestingService.TestingSetServerSideSettings
     */
    testingSetServerSideSettings: {
      name: "TestingSetServerSideSettings",
      I: TestingSetServerSideSettingsRequest,
      O: TestingSetServerSideSettingsResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - UserNotFound (20400): user not found
     * - Internal (10500): internal server error
     * NOTE: this endpoint is mapped to the corresponding admin interface endpoint
     *
     * @generated from rpc domain.TestingService.TestingDeleteUser
     */
    testingDeleteUser: {
      name: "TestingDeleteUser",
      I: TestingDeleteUserRequest,
      O: TestingDeleteUserResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - UserNotFound (20400): user not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.TestingService.TestingAddAuthenticator
     */
    testingAddAuthenticator: {
      name: "TestingAddAuthenticator",
      I: TestingAddAuthenticatorRequest,
      O: TestingAddAuthenticatorResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - AuthenticatorNotFound (40400): authenticator not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.TestingService.TestingDeleteAuthenticator
     */
    testingDeleteAuthenticator: {
      name: "TestingDeleteAuthenticator",
      I: TestingDeleteAuthenticatorRequest,
      O: TestingDeleteAuthenticatorResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - AuthenticatorNotFound (40400): authenticator not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.TestingService.TestingEditAuthenticator
     */
    testingEditAuthenticator: {
      name: "TestingEditAuthenticator",
      I: TestingEditAuthenticatorRequest,
      O: TestingEditAuthenticatorResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - AuthenticatorBlockNotFound (40440): the authenticator block with given hash was not found
     * - Internal (10500): internal server error
     *
     * @generated from rpc domain.TestingService.TestingDeleteAuthenticatorBlock
     */
    testingDeleteAuthenticatorBlock: {
      name: "TestingDeleteAuthenticatorBlock",
      I: TestingDeleteAuthenticatorBlockRequest,
      O: TestingDeleteAuthenticatorBlockResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - VaultNotFound (50400)
     * - Internal (10500)
     *
     * @generated from rpc domain.TestingService.TestingDeleteVault
     */
    testingDeleteVault: {
      name: "TestingDeleteVault",
      I: TestingDeleteVaultRequest,
      O: TestingDeleteVaultResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500)
     * - OrganizationNotFound (60400)
     *
     * @generated from rpc domain.TestingService.TestingInjectPaddleWebhook
     */
    testingInjectPaddleWebhook: {
      name: "TestingInjectPaddleWebhook",
      I: TestingInjectPaddleWebhookRequest,
      O: TestingInjectPaddleWebhookResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500)
     *
     * @generated from rpc domain.TestingService.TestingUpdatePaddle
     */
    testingUpdatePaddle: {
      name: "TestingUpdatePaddle",
      I: TestingUpdatePaddleRequest,
      O: TestingUpdatePaddleResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500)
     *
     * @generated from rpc domain.TestingService.TestingCreateCoupon
     */
    testingCreateCoupon: {
      name: "TestingCreateCoupon",
      I: TestingCreateCouponRequest,
      O: TestingCreateCouponResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500)
     * - OrganizationNotFound (60400)
     *
     * @generated from rpc domain.TestingService.TestingUpdateOrganization
     */
    testingUpdateOrganization: {
      name: "TestingUpdateOrganization",
      I: TestingUpdateOrganizationRequest,
      O: TestingUpdateOrganizationResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - VaultNotFound (50400)
     * - InvalidVaultMessageType (50463): The message provided has invalid type
     * - Internal (10500)
     *
     * @generated from rpc domain.TestingService.CreateVaultMessage
     */
    createVaultMessage: {
      name: "CreateVaultMessage",
      I: CreateVaultMessageRequest,
      O: CreateVaultMessageResponse,
      kind: MethodKind.Unary
    },
    /**
     * errors:
     * - Internal (10500)
     *
     * @generated from rpc domain.TestingService.TestingWebauthnCreateCredential
     */
    testingWebauthnCreateCredential: {
      name: "TestingWebauthnCreateCredential",
      I: TestingWebauthnCreateCredentialRequest,
      O: TestingWebauthnCreateCredentialResponse,
      kind: MethodKind.Unary
    },
    /**
     * this endpoint can be used to manipulate vaults in a couple of ways
     * errors:
     * - VaultNotFound (50400)
     * - Internal (10500)
     *
     * @generated from rpc domain.TestingService.TestingManipulateVault
     */
    testingManipulateVault: {
      name: "TestingManipulateVault",
      I: TestingManipulateVaultRequest,
      O: TestingManipulateVaultResponse,
      kind: MethodKind.Unary
    },
    /**
     * this endpoint cancels all active streaming sync
     * no errors
     *
     * @generated from rpc domain.TestingService.TestingCancelUserStreaming
     */
    testingCancelUserStreaming: {
      name: "TestingCancelUserStreaming",
      I: TestingCancelUserStreamingRequest,
      O: TestingCancelUserStreamingResponse,
      kind: MethodKind.Unary
    },
    /**
     * this endpoint give information of how and where an email address is used
     * - Internal (10500)
     *
     * @generated from rpc domain.TestingService.TestingGetEmailState
     */
    testingGetEmailState: {
      name: "TestingGetEmailState",
      I: TestingGetEmailStateRequest,
      O: TestingGetEmailStateResponse,
      kind: MethodKind.Unary
    }
  }
});
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function isWebExtError(obj, ...errorTypes) {
  const message = getMessage(obj);
  if (message === void 0) {
    return false;
  }
  return errorTypes.some((errorType) => {
    const matcher = ERRORS[errorType];
    return typeof matcher === "string" ? matcher === message : matcher.test(message);
  });
}
function hasMessageProperty(obj) {
  return typeof obj === "object" && obj !== null && "message" in obj && typeof obj.message === "string";
}
function getMessage(obj) {
  if (typeof obj === "string") {
    return obj;
  }
  if (hasMessageProperty(obj)) {
    return obj.message;
  }
  return void 0;
}
const ERRORS = {
  // Happens in content scripts on sending messages, after the extension has been unloaded (e.g.
  // during update or uninstall).
  CONTEXT_INVALIDATED: "Extension context invalidated.",
  TAB_DRAG_IN_PROGRESS: "Tabs cannot be edited right now (user may be dragging a tab).",
  COULD_NOT_ESTABLISH_CONNECTION: "Could not establish connection. Receiving end does not exist.",
  MISSING_HOST_PERMISSION_FOR_TAB: "Missing host permission for the tab",
  TAB_CLOSED: "The tab was closed.",
  NO_TAB_WITH_ID: /^No tab with id: \d+\.$/,
  // Chrome
  INVALID_TAB_ID: /^Invalid tab ID: \d+$/,
  // Firefox
  ACTIVE_TAB_PERMISSION_NOT_IN_EFFECT: "The 'activeTab' permission is not in effect because this extension has not been in invoked.",
  CAPTURE_TAB_IMAGE_READBACK_FAILED: "Failed to capture tab: image readback failed",
  CANNOT_ACCESS_CONTENTS_OF_URL: 'Cannot access contents of url "". Extension manifest must request permission to access this host.',
  ALL_URLS_OR_ACTIVE_TAB_PERMISSION_REQUIRED: "Either the '<all_urls>' or 'activeTab' permission is required.",
  UNEXPECTED_ERROR: "An unexpected error occurred",
  ERROR_CAPTURING_VISIBLE_TAB: "Error capturing visible tab.",
  INVALID_VALUE_FOR_BOUNDS: "Invalid value for bounds. Bounds must be at least 50% within visible screen space.",
  CLOSED_BEFORE_RESPONSE_RECEIVED: "A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received",
  PERMISSION_ERROR: "Invalid call to tabs.captureVisibleTab(). Either the 'activeTab' permission or granted host permissions for the current website are required."
};
function isMessageResponseEnvelope(response) {
  return typeof response === "object" && response !== null;
}
const messageError = Symbol("messageError");
async function sendMessage(m) {
  return doSendMessage(() => browser.runtime.sendMessage(m));
}
async function sendMessageToTab(tabId, m, frameId) {
  return doSendMessage(() => browser.tabs.sendMessage(tabId, m, {
    frameId
  }));
}
async function doSendMessage(send) {
  try {
    const response = await send();
    if (response === null || response === void 0) {
      return messageError;
    }
    if (isMessageResponseEnvelope(response)) {
      return response.value;
    }
    trackError(new Error(`Received unexpected response sending message: ${JSON.stringify(response)}`));
    return messageError;
  } catch (e) {
    reportMessageError(e);
    return messageError;
  }
}
function makeMessageListener(handlers) {
  return (msg, sender) => {
    const handler = handlers[msg.type];
    if (handler) {
      try {
        return (async () => {
          const value = await handler(msg, sender);
          return {
            value
          };
        })();
      } catch (e) {
        reportMessageError(e);
      }
    }
    return void 0;
  };
}
const IGNORED_ERROR_MESSAGES = [
  // happens when the other side goes away unexpectedly (e.g. tab close)
  "COULD_NOT_ESTABLISH_CONNECTION",
  // for urls on which extensions are never allowed to run (e.g. chrome://*, some about:* pages)
  "MISSING_HOST_PERMISSION_FOR_TAB",
  // Sending message to tab that was closed in the meantime
  "TAB_CLOSED",
  "NO_TAB_WITH_ID",
  // Chrome
  "INVALID_TAB_ID",
  // Firefox
  // Should be handled by polyfill, but isn't - https://github.com/mozilla/webextension-polyfill/issues/384
  "CLOSED_BEFORE_RESPONSE_RECEIVED",
  // Seems to happen in Firefox for some messages: https://sentry.heylogin.dev/organizations/heylogin/issues/755
  "UNEXPECTED_ERROR",
  // No need to report this one.
  // FIXME: When this error comes up, the content script is no longer in a functional state and we
  // might as well unload it entirely. This happens e.g. with lingering content scripts after the
  // extension is unloaded/reloaded.
  "CONTEXT_INVALIDATED"
];
function reportMessageError(e) {
  if (isWebExtError(e, ...IGNORED_ERROR_MESSAGES)) {
    return;
  }
  trackError(new Error("Failed to send message", {
    cause: e
  }));
}
export {
  AuditlogEventType as A,
  BackendClientErrorCode as B,
  CredentialType as C,
  DomainError$1 as D,
  ErrorCode as E,
  InvalidGrpcResponseError as I,
  LicenseType as L,
  MaintenanceTask as M,
  NoResponseError as N,
  OrganizationType as O,
  ProfileType as P,
  ReportPageProblem as R,
  SubscriptionError as S,
  VaultType as V,
  WebauthnPrfSupportStatus as W,
  Achievement as a,
  browser as b,
  messageError as c,
  debugConsole as d,
  sendMessageToTab as e,
  AuthenticatorReply as f,
  getDefaultExportFromCjs as g,
  getAugmentedNamespace as h,
  isWebExtError as i,
  commonjsGlobal as j,
  AuthenticatorType as k,
  SessionType as l,
  makeMessageListener as m,
  PrimaryLoginDevice as n,
  VaultMessageType as o,
  addBreadcrumb as p,
  CancelToken as q,
  ErrorGroup$1 as r,
  sendMessage as s,
  trackError as t,
  pleaseUpdate as u,
  Emittery$1 as v
};
//# sourceMappingURL=message-939596d6.js.map
