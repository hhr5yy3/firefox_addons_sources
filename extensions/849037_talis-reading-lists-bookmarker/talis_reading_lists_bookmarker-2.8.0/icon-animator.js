var iconAnimator = function() {
  "use strict";
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
              let result2;
              try {
                result2 = listener(message, sender, wrappedSendResponse);
              } catch (err) {
                result2 = Promise.reject(err);
              }
              const isResultThenable = result2 !== true && isThenable(result2);
              if (result2 !== true && !isResultThenable && !didCallSendResponse) {
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
                sendPromisedResult(result2);
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
  const originalBrowser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
  const browser = originalBrowser;
  function defineUnlistedScript(arg) {
    if (arg == null || typeof arg === "function") return { main: arg };
    return arg;
  }
  const messageListeners = /* @__PURE__ */ new Map();
  const sendMessageToBackground = async (type, data) => {
    return browser.runtime.sendMessage({ type, data });
  };
  const addMessageListener = (type, listener) => {
    const wrappedListener = async (message) => {
      if (message.type === type) {
        const result2 = listener(message.data);
        if (result2 instanceof Promise) {
          return await result2;
        }
        return Promise.resolve(result2);
      }
      return Promise.resolve(void 0);
    };
    messageListeners.set(
      listener,
      wrappedListener
    );
    browser.runtime.onMessage.addListener(wrappedListener);
  };
  const removeMessageListener = (listener) => {
    const wrappedListener = messageListeners.get(listener);
    if (wrappedListener) {
      browser.runtime.onMessage.removeListener(wrappedListener);
      messageListeners.delete(listener);
    }
  };
  iconAnimator;
  var util;
  (function(util2) {
    util2.assertEqual = (val) => val;
    function assertIs(_arg) {
    }
    util2.assertIs = assertIs;
    function assertNever(_x) {
      throw new Error();
    }
    util2.assertNever = assertNever;
    util2.arrayToEnum = (items) => {
      const obj = {};
      for (const item of items) {
        obj[item] = item;
      }
      return obj;
    };
    util2.getValidEnumValues = (obj) => {
      const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
      const filtered = {};
      for (const k of validKeys) {
        filtered[k] = obj[k];
      }
      return util2.objectValues(filtered);
    };
    util2.objectValues = (obj) => {
      return util2.objectKeys(obj).map(function(e) {
        return obj[e];
      });
    };
    util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
      const keys = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          keys.push(key);
        }
      }
      return keys;
    };
    util2.find = (arr, checker) => {
      for (const item of arr) {
        if (checker(item))
          return item;
      }
      return void 0;
    };
    util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
      return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
    }
    util2.joinValues = joinValues;
    util2.jsonStringifyReplacer = (_, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    };
  })(util || (util = {}));
  var objectUtil;
  (function(objectUtil2) {
    objectUtil2.mergeShapes = (first, second) => {
      return {
        ...first,
        ...second
        // second overwrites first
      };
    };
  })(objectUtil || (objectUtil = {}));
  const ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]);
  const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
      case "undefined":
        return ZodParsedType.undefined;
      case "string":
        return ZodParsedType.string;
      case "number":
        return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
      case "boolean":
        return ZodParsedType.boolean;
      case "function":
        return ZodParsedType.function;
      case "bigint":
        return ZodParsedType.bigint;
      case "symbol":
        return ZodParsedType.symbol;
      case "object":
        if (Array.isArray(data)) {
          return ZodParsedType.array;
        }
        if (data === null) {
          return ZodParsedType.null;
        }
        if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
          return ZodParsedType.promise;
        }
        if (typeof Map !== "undefined" && data instanceof Map) {
          return ZodParsedType.map;
        }
        if (typeof Set !== "undefined" && data instanceof Set) {
          return ZodParsedType.set;
        }
        if (typeof Date !== "undefined" && data instanceof Date) {
          return ZodParsedType.date;
        }
        return ZodParsedType.object;
      default:
        return ZodParsedType.unknown;
    }
  };
  const ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
  ]);
  const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
  };
  class ZodError extends Error {
    constructor(issues) {
      super();
      this.issues = [];
      this.addIssue = (sub) => {
        this.issues = [...this.issues, sub];
      };
      this.addIssues = (subs = []) => {
        this.issues = [...this.issues, ...subs];
      };
      const actualProto = new.target.prototype;
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(this, actualProto);
      } else {
        this.__proto__ = actualProto;
      }
      this.name = "ZodError";
      this.issues = issues;
    }
    get errors() {
      return this.issues;
    }
    format(_mapper) {
      const mapper = _mapper || function(issue) {
        return issue.message;
      };
      const fieldErrors = { _errors: [] };
      const processError = (error) => {
        for (const issue of error.issues) {
          if (issue.code === "invalid_union") {
            issue.unionErrors.map(processError);
          } else if (issue.code === "invalid_return_type") {
            processError(issue.returnTypeError);
          } else if (issue.code === "invalid_arguments") {
            processError(issue.argumentsError);
          } else if (issue.path.length === 0) {
            fieldErrors._errors.push(mapper(issue));
          } else {
            let curr = fieldErrors;
            let i = 0;
            while (i < issue.path.length) {
              const el2 = issue.path[i];
              const terminal = i === issue.path.length - 1;
              if (!terminal) {
                curr[el2] = curr[el2] || { _errors: [] };
              } else {
                curr[el2] = curr[el2] || { _errors: [] };
                curr[el2]._errors.push(mapper(issue));
              }
              curr = curr[el2];
              i++;
            }
          }
        }
      };
      processError(this);
      return fieldErrors;
    }
    static assert(value) {
      if (!(value instanceof ZodError)) {
        throw new Error(`Not a ZodError: ${value}`);
      }
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
      const fieldErrors = {};
      const formErrors = [];
      for (const sub of this.issues) {
        if (sub.path.length > 0) {
          fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
          fieldErrors[sub.path[0]].push(mapper(sub));
        } else {
          formErrors.push(mapper(sub));
        }
      }
      return { formErrors, fieldErrors };
    }
    get formErrors() {
      return this.flatten();
    }
  }
  ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
  };
  const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = "Required";
        } else {
          message = `Expected ${issue.expected}, received ${issue.received}`;
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
        break;
      case ZodIssueCode.unrecognized_keys:
        message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
        break;
      case ZodIssueCode.invalid_union:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
        break;
      case ZodIssueCode.invalid_enum_value:
        message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
        break;
      case ZodIssueCode.invalid_arguments:
        message = `Invalid function arguments`;
        break;
      case ZodIssueCode.invalid_return_type:
        message = `Invalid function return type`;
        break;
      case ZodIssueCode.invalid_date:
        message = `Invalid date`;
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === "object") {
          if ("includes" in issue.validation) {
            message = `Invalid input: must include "${issue.validation.includes}"`;
            if (typeof issue.validation.position === "number") {
              message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
            }
          } else if ("startsWith" in issue.validation) {
            message = `Invalid input: must start with "${issue.validation.startsWith}"`;
          } else if ("endsWith" in issue.validation) {
            message = `Invalid input: must end with "${issue.validation.endsWith}"`;
          } else {
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== "regex") {
          message = `Invalid ${issue.validation}`;
        } else {
          message = "Invalid";
        }
        break;
      case ZodIssueCode.too_small:
        if (issue.type === "array")
          message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
        else if (issue.type === "date")
          message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.too_big:
        if (issue.type === "array")
          message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
        else if (issue.type === "bigint")
          message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
        else if (issue.type === "date")
          message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.custom:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = `Intersection results could not be merged`;
        break;
      case ZodIssueCode.not_multiple_of:
        message = `Number must be a multiple of ${issue.multipleOf}`;
        break;
      case ZodIssueCode.not_finite:
        message = "Number must be finite";
        break;
      default:
        message = _ctx.defaultError;
        util.assertNever(issue);
    }
    return { message };
  };
  let overrideErrorMap = errorMap;
  function setErrorMap(map) {
    overrideErrorMap = map;
  }
  function getErrorMap() {
    return overrideErrorMap;
  }
  const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...issueData.path || []];
    const fullIssue = {
      ...issueData,
      path: fullPath
    };
    if (issueData.message !== void 0) {
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message
      };
    }
    let errorMessage = "";
    const maps = errorMaps.filter((m) => !!m).slice().reverse();
    for (const map of maps) {
      errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
      ...issueData,
      path: fullPath,
      message: errorMessage
    };
  };
  const EMPTY_PATH = [];
  function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
      issueData,
      data: ctx.data,
      path: ctx.path,
      errorMaps: [
        ctx.common.contextualErrorMap,
        ctx.schemaErrorMap,
        overrideMap,
        overrideMap === errorMap ? void 0 : errorMap
        // then global default map
      ].filter((x) => !!x)
    });
    ctx.common.issues.push(issue);
  }
  class ParseStatus {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      if (this.value === "valid")
        this.value = "dirty";
    }
    abort() {
      if (this.value !== "aborted")
        this.value = "aborted";
    }
    static mergeArray(status, results) {
      const arrayValue = [];
      for (const s of results) {
        if (s.status === "aborted")
          return INVALID;
        if (s.status === "dirty")
          status.dirty();
        arrayValue.push(s.value);
      }
      return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
      const syncPairs = [];
      for (const pair of pairs) {
        const key = await pair.key;
        const value = await pair.value;
        syncPairs.push({
          key,
          value
        });
      }
      return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
      const finalObject = {};
      for (const pair of pairs) {
        const { key, value } = pair;
        if (key.status === "aborted")
          return INVALID;
        if (value.status === "aborted")
          return INVALID;
        if (key.status === "dirty")
          status.dirty();
        if (value.status === "dirty")
          status.dirty();
        if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
          finalObject[key.value] = value.value;
        }
      }
      return { status: status.value, value: finalObject };
    }
  }
  const INVALID = Object.freeze({
    status: "aborted"
  });
  const DIRTY = (value) => ({ status: "dirty", value });
  const OK = (value) => ({ status: "valid", value });
  const isAborted = (x) => x.status === "aborted";
  const isDirty = (x) => x.status === "dirty";
  const isValid = (x) => x.status === "valid";
  const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
  function __classPrivateFieldGet(receiver, state, kind, f2) {
    if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f2) {
    if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return state.set(receiver, value), value;
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  var errorUtil;
  (function(errorUtil2) {
    errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
  })(errorUtil || (errorUtil = {}));
  var _ZodEnum_cache, _ZodNativeEnum_cache;
  class ParseInputLazyPath {
    constructor(parent, value, path, key) {
      this._cachedPath = [];
      this.parent = parent;
      this.data = value;
      this._path = path;
      this._key = key;
    }
    get path() {
      if (!this._cachedPath.length) {
        if (this._key instanceof Array) {
          this._cachedPath.push(...this._path, ...this._key);
        } else {
          this._cachedPath.push(...this._path, this._key);
        }
      }
      return this._cachedPath;
    }
  }
  const handleResult = (ctx, result2) => {
    if (isValid(result2)) {
      return { success: true, data: result2.value };
    } else {
      if (!ctx.common.issues.length) {
        throw new Error("Validation failed but no issues detected.");
      }
      return {
        success: false,
        get error() {
          if (this._error)
            return this._error;
          const error = new ZodError(ctx.common.issues);
          this._error = error;
          return this._error;
        }
      };
    }
  };
  function processCreateParams(params) {
    if (!params)
      return {};
    const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
    if (errorMap2 && (invalid_type_error || required_error)) {
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap2)
      return { errorMap: errorMap2, description };
    const customMap = (iss, ctx) => {
      var _a, _b;
      const { message } = params;
      if (iss.code === "invalid_enum_value") {
        return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
      }
      if (typeof ctx.data === "undefined") {
        return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
      }
      if (iss.code !== "invalid_type")
        return { message: ctx.defaultError };
      return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
    };
    return { errorMap: customMap, description };
  }
  class ZodType {
    constructor(def) {
      this.spa = this.safeParseAsync;
      this._def = def;
      this.parse = this.parse.bind(this);
      this.safeParse = this.safeParse.bind(this);
      this.parseAsync = this.parseAsync.bind(this);
      this.safeParseAsync = this.safeParseAsync.bind(this);
      this.spa = this.spa.bind(this);
      this.refine = this.refine.bind(this);
      this.refinement = this.refinement.bind(this);
      this.superRefine = this.superRefine.bind(this);
      this.optional = this.optional.bind(this);
      this.nullable = this.nullable.bind(this);
      this.nullish = this.nullish.bind(this);
      this.array = this.array.bind(this);
      this.promise = this.promise.bind(this);
      this.or = this.or.bind(this);
      this.and = this.and.bind(this);
      this.transform = this.transform.bind(this);
      this.brand = this.brand.bind(this);
      this.default = this.default.bind(this);
      this.catch = this.catch.bind(this);
      this.describe = this.describe.bind(this);
      this.pipe = this.pipe.bind(this);
      this.readonly = this.readonly.bind(this);
      this.isNullable = this.isNullable.bind(this);
      this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(input) {
      return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
      return ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      };
    }
    _processInputParams(input) {
      return {
        status: new ParseStatus(),
        ctx: {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        }
      };
    }
    _parseSync(input) {
      const result2 = this._parse(input);
      if (isAsync(result2)) {
        throw new Error("Synchronous parse encountered promise.");
      }
      return result2;
    }
    _parseAsync(input) {
      const result2 = this._parse(input);
      return Promise.resolve(result2);
    }
    parse(data, params) {
      const result2 = this.safeParse(data, params);
      if (result2.success)
        return result2.data;
      throw result2.error;
    }
    safeParse(data, params) {
      var _a;
      const ctx = {
        common: {
          issues: [],
          async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const result2 = this._parseSync({ data, path: ctx.path, parent: ctx });
      return handleResult(ctx, result2);
    }
    async parseAsync(data, params) {
      const result2 = await this.safeParseAsync(data, params);
      if (result2.success)
        return result2.data;
      throw result2.error;
    }
    async safeParseAsync(data, params) {
      const ctx = {
        common: {
          issues: [],
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
          async: true
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
      const result2 = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
      return handleResult(ctx, result2);
    }
    refine(check, message) {
      const getIssueProperties = (val) => {
        if (typeof message === "string" || typeof message === "undefined") {
          return { message };
        } else if (typeof message === "function") {
          return message(val);
        } else {
          return message;
        }
      };
      return this._refinement((val, ctx) => {
        const result2 = check(val);
        const setError = () => ctx.addIssue({
          code: ZodIssueCode.custom,
          ...getIssueProperties(val)
        });
        if (typeof Promise !== "undefined" && result2 instanceof Promise) {
          return result2.then((data) => {
            if (!data) {
              setError();
              return false;
            } else {
              return true;
            }
          });
        }
        if (!result2) {
          setError();
          return false;
        } else {
          return true;
        }
      });
    }
    refinement(check, refinementData) {
      return this._refinement((val, ctx) => {
        if (!check(val)) {
          ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
          return false;
        } else {
          return true;
        }
      });
    }
    _refinement(refinement) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "refinement", refinement }
      });
    }
    superRefine(refinement) {
      return this._refinement(refinement);
    }
    optional() {
      return ZodOptional.create(this, this._def);
    }
    nullable() {
      return ZodNullable.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return ZodArray.create(this, this._def);
    }
    promise() {
      return ZodPromise.create(this, this._def);
    }
    or(option) {
      return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
      return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
      return new ZodEffects({
        ...processCreateParams(this._def),
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "transform", transform }
      });
    }
    default(def) {
      const defaultValueFunc = typeof def === "function" ? def : () => def;
      return new ZodDefault({
        ...processCreateParams(this._def),
        innerType: this,
        defaultValue: defaultValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodDefault
      });
    }
    brand() {
      return new ZodBranded({
        typeName: ZodFirstPartyTypeKind.ZodBranded,
        type: this,
        ...processCreateParams(this._def)
      });
    }
    catch(def) {
      const catchValueFunc = typeof def === "function" ? def : () => def;
      return new ZodCatch({
        ...processCreateParams(this._def),
        innerType: this,
        catchValue: catchValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodCatch
      });
    }
    describe(description) {
      const This = this.constructor;
      return new This({
        ...this._def,
        description
      });
    }
    pipe(target) {
      return ZodPipeline.create(this, target);
    }
    readonly() {
      return ZodReadonly.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  const cuidRegex = /^c[^\s-]{8,}$/i;
  const cuid2Regex = /^[0-9a-z]+$/;
  const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
  const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
  const nanoidRegex = /^[a-z0-9_-]{21}$/i;
  const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
  const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
  const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
  let emojiRegex;
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
  const ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
  const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
  const dateRegex = new RegExp(`^${dateRegexSource}$`);
  function timeRegexSource(args) {
    let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
    if (args.precision) {
      regex = `${regex}\\.\\d{${args.precision}}`;
    } else if (args.precision == null) {
      regex = `${regex}(\\.\\d+)?`;
    }
    return regex;
  }
  function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
  }
  function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
      opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
  }
  function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
      return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
      return true;
    }
    return false;
  }
  class ZodString extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = String(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.string) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.length < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.length > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "length") {
          const tooBig = input.data.length > check.value;
          const tooSmall = input.data.length < check.value;
          if (tooBig || tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            if (tooBig) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            } else if (tooSmall) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: true,
                message: check.message
              });
            }
            status.dirty();
          }
        } else if (check.kind === "email") {
          if (!emailRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "email",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "emoji") {
          if (!emojiRegex) {
            emojiRegex = new RegExp(_emojiRegex, "u");
          }
          if (!emojiRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "emoji",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "uuid") {
          if (!uuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "uuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "nanoid") {
          if (!nanoidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "nanoid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid") {
          if (!cuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid2") {
          if (!cuid2Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid2",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ulid") {
          if (!ulidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ulid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "url") {
          try {
            new URL(input.data);
          } catch (_a) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "regex") {
          check.regex.lastIndex = 0;
          const testResult = check.regex.test(input.data);
          if (!testResult) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "regex",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "trim") {
          input.data = input.data.trim();
        } else if (check.kind === "includes") {
          if (!input.data.includes(check.value, check.position)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { includes: check.value, position: check.position },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "toLowerCase") {
          input.data = input.data.toLowerCase();
        } else if (check.kind === "toUpperCase") {
          input.data = input.data.toUpperCase();
        } else if (check.kind === "startsWith") {
          if (!input.data.startsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { startsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "endsWith") {
          if (!input.data.endsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { endsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "datetime") {
          const regex = datetimeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "datetime",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "date") {
          const regex = dateRegex;
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "date",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "time") {
          const regex = timeRegex(check);
          if (!regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: "time",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "duration") {
          if (!durationRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "duration",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "ip") {
          if (!isValidIP(input.data, check.version)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "ip",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "base64") {
          if (!base64Regex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "base64",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
      return this.refinement((data) => regex.test(data), {
        validation,
        code: ZodIssueCode.invalid_string,
        ...errorUtil.errToObj(message)
      });
    }
    _addCheck(check) {
      return new ZodString({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    email(message) {
      return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
      return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
      return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
      return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
      return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
      return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
      return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
      return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
      return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    ip(options) {
      return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
      var _a, _b;
      if (typeof options === "string") {
        return this._addCheck({
          kind: "datetime",
          precision: null,
          offset: false,
          local: false,
          message: options
        });
      }
      return this._addCheck({
        kind: "datetime",
        precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
        offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
        local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
        ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
      });
    }
    date(message) {
      return this._addCheck({ kind: "date", message });
    }
    time(options) {
      if (typeof options === "string") {
        return this._addCheck({
          kind: "time",
          precision: null,
          message: options
        });
      }
      return this._addCheck({
        kind: "time",
        precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
        ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
      });
    }
    duration(message) {
      return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
      return this._addCheck({
        kind: "regex",
        regex,
        ...errorUtil.errToObj(message)
      });
    }
    includes(value, options) {
      return this._addCheck({
        kind: "includes",
        value,
        position: options === null || options === void 0 ? void 0 : options.position,
        ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
      });
    }
    startsWith(value, message) {
      return this._addCheck({
        kind: "startsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    endsWith(value, message) {
      return this._addCheck({
        kind: "endsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    min(minLength, message) {
      return this._addCheck({
        kind: "min",
        value: minLength,
        ...errorUtil.errToObj(message)
      });
    }
    max(maxLength, message) {
      return this._addCheck({
        kind: "max",
        value: maxLength,
        ...errorUtil.errToObj(message)
      });
    }
    length(len, message) {
      return this._addCheck({
        kind: "length",
        value: len,
        ...errorUtil.errToObj(message)
      });
    }
    /**
     * @deprecated Use z.string().min(1) instead.
     * @see {@link ZodString.min}
     */
    nonempty(message) {
      return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
      return new ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      });
    }
    toLowerCase() {
      return new ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }]
      });
    }
    toUpperCase() {
      return new ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isBase64() {
      return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get minLength() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxLength() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
  }
  ZodString.create = (params) => {
    var _a;
    return new ZodString({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodString,
      coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
      ...processCreateParams(params)
    });
  };
  function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return valInt % stepInt / Math.pow(10, decCount);
  }
  class ZodNumber extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
      this.step = this.multipleOf;
    }
    _parse(input) {
      if (this._def.coerce) {
        input.data = Number(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.number) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.number,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "int") {
          if (!util.isInteger(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_type,
              expected: "integer",
              received: "float",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "number",
              inclusive: check.inclusive,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "number",
              inclusive: check.inclusive,
              exact: false,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (floatSafeRemainder(input.data, check.value) !== 0) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "finite") {
          if (!Number.isFinite(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_finite,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new ZodNumber({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind,
            value,
            inclusive,
            message: errorUtil.toString(message)
          }
        ]
      });
    }
    _addCheck(check) {
      return new ZodNumber({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    int(message) {
      return this._addCheck({
        kind: "int",
        message: errorUtil.toString(message)
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    finite(message) {
      return this._addCheck({
        kind: "finite",
        message: errorUtil.toString(message)
      });
    }
    safe(message) {
      return this._addCheck({
        kind: "min",
        inclusive: true,
        value: Number.MIN_SAFE_INTEGER,
        message: errorUtil.toString(message)
      })._addCheck({
        kind: "max",
        inclusive: true,
        value: Number.MAX_SAFE_INTEGER,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
    get isInt() {
      return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
    }
    get isFinite() {
      let max = null, min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
          return true;
        } else if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        } else if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return Number.isFinite(min) && Number.isFinite(max);
    }
  }
  ZodNumber.create = (params) => {
    return new ZodNumber({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodNumber,
      coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
      ...processCreateParams(params)
    });
  };
  class ZodBigInt extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
    }
    _parse(input) {
      if (this._def.coerce) {
        input.data = BigInt(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.bigint) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              type: "bigint",
              minimum: check.value,
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              type: "bigint",
              maximum: check.value,
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (input.data % check.value !== BigInt(0)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new ZodBigInt({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind,
            value,
            inclusive,
            message: errorUtil.toString(message)
          }
        ]
      });
    }
    _addCheck(check) {
      return new ZodBigInt({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
  }
  ZodBigInt.create = (params) => {
    var _a;
    return new ZodBigInt({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodBigInt,
      coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
      ...processCreateParams(params)
    });
  };
  class ZodBoolean extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = Boolean(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.boolean) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.boolean,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  }
  ZodBoolean.create = (params) => {
    return new ZodBoolean({
      typeName: ZodFirstPartyTypeKind.ZodBoolean,
      coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
      ...processCreateParams(params)
    });
  };
  class ZodDate extends ZodType {
    _parse(input) {
      if (this._def.coerce) {
        input.data = new Date(input.data);
      }
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.date) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.date,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      if (isNaN(input.data.getTime())) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_date
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.getTime() < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              message: check.message,
              inclusive: true,
              exact: false,
              minimum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.getTime() > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              message: check.message,
              inclusive: true,
              exact: false,
              maximum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: new Date(input.data.getTime())
      };
    }
    _addCheck(check) {
      return new ZodDate({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    min(minDate, message) {
      return this._addCheck({
        kind: "min",
        value: minDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    max(maxDate, message) {
      return this._addCheck({
        kind: "max",
        value: maxDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    get minDate() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min != null ? new Date(min) : null;
    }
    get maxDate() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max != null ? new Date(max) : null;
    }
  }
  ZodDate.create = (params) => {
    return new ZodDate({
      checks: [],
      coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
      typeName: ZodFirstPartyTypeKind.ZodDate,
      ...processCreateParams(params)
    });
  };
  class ZodSymbol extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.symbol) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.symbol,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  }
  ZodSymbol.create = (params) => {
    return new ZodSymbol({
      typeName: ZodFirstPartyTypeKind.ZodSymbol,
      ...processCreateParams(params)
    });
  };
  class ZodUndefined extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.undefined,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  }
  ZodUndefined.create = (params) => {
    return new ZodUndefined({
      typeName: ZodFirstPartyTypeKind.ZodUndefined,
      ...processCreateParams(params)
    });
  };
  class ZodNull extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.null) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.null,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  }
  ZodNull.create = (params) => {
    return new ZodNull({
      typeName: ZodFirstPartyTypeKind.ZodNull,
      ...processCreateParams(params)
    });
  };
  class ZodAny extends ZodType {
    constructor() {
      super(...arguments);
      this._any = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  }
  ZodAny.create = (params) => {
    return new ZodAny({
      typeName: ZodFirstPartyTypeKind.ZodAny,
      ...processCreateParams(params)
    });
  };
  class ZodUnknown extends ZodType {
    constructor() {
      super(...arguments);
      this._unknown = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  }
  ZodUnknown.create = (params) => {
    return new ZodUnknown({
      typeName: ZodFirstPartyTypeKind.ZodUnknown,
      ...processCreateParams(params)
    });
  };
  class ZodNever extends ZodType {
    _parse(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.never,
        received: ctx.parsedType
      });
      return INVALID;
    }
  }
  ZodNever.create = (params) => {
    return new ZodNever({
      typeName: ZodFirstPartyTypeKind.ZodNever,
      ...processCreateParams(params)
    });
  };
  class ZodVoid extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.void,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  }
  ZodVoid.create = (params) => {
    return new ZodVoid({
      typeName: ZodFirstPartyTypeKind.ZodVoid,
      ...processCreateParams(params)
    });
  };
  class ZodArray extends ZodType {
    _parse(input) {
      const { ctx, status } = this._processInputParams(input);
      const def = this._def;
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (def.exactLength !== null) {
        const tooBig = ctx.data.length > def.exactLength.value;
        const tooSmall = ctx.data.length < def.exactLength.value;
        if (tooBig || tooSmall) {
          addIssueToContext(ctx, {
            code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
            minimum: tooSmall ? def.exactLength.value : void 0,
            maximum: tooBig ? def.exactLength.value : void 0,
            type: "array",
            inclusive: true,
            exact: true,
            message: def.exactLength.message
          });
          status.dirty();
        }
      }
      if (def.minLength !== null) {
        if (ctx.data.length < def.minLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minLength.value,
            type: "array",
            inclusive: true,
            exact: false,
            message: def.minLength.message
          });
          status.dirty();
        }
      }
      if (def.maxLength !== null) {
        if (ctx.data.length > def.maxLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxLength.value,
            type: "array",
            inclusive: true,
            exact: false,
            message: def.maxLength.message
          });
          status.dirty();
        }
      }
      if (ctx.common.async) {
        return Promise.all([...ctx.data].map((item, i) => {
          return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        })).then((result3) => {
          return ParseStatus.mergeArray(status, result3);
        });
      }
      const result2 = [...ctx.data].map((item, i) => {
        return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      });
      return ParseStatus.mergeArray(status, result2);
    }
    get element() {
      return this._def.type;
    }
    min(minLength, message) {
      return new ZodArray({
        ...this._def,
        minLength: { value: minLength, message: errorUtil.toString(message) }
      });
    }
    max(maxLength, message) {
      return new ZodArray({
        ...this._def,
        maxLength: { value: maxLength, message: errorUtil.toString(message) }
      });
    }
    length(len, message) {
      return new ZodArray({
        ...this._def,
        exactLength: { value: len, message: errorUtil.toString(message) }
      });
    }
    nonempty(message) {
      return this.min(1, message);
    }
  }
  ZodArray.create = (schema, params) => {
    return new ZodArray({
      type: schema,
      minLength: null,
      maxLength: null,
      exactLength: null,
      typeName: ZodFirstPartyTypeKind.ZodArray,
      ...processCreateParams(params)
    });
  };
  function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
      const newShape = {};
      for (const key in schema.shape) {
        const fieldSchema = schema.shape[key];
        newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
      }
      return new ZodObject({
        ...schema._def,
        shape: () => newShape
      });
    } else if (schema instanceof ZodArray) {
      return new ZodArray({
        ...schema._def,
        type: deepPartialify(schema.element)
      });
    } else if (schema instanceof ZodOptional) {
      return ZodOptional.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodNullable) {
      return ZodNullable.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodTuple) {
      return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    } else {
      return schema;
    }
  }
  class ZodObject extends ZodType {
    constructor() {
      super(...arguments);
      this._cached = null;
      this.nonstrict = this.passthrough;
      this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const shape = this._def.shape();
      const keys = util.objectKeys(shape);
      return this._cached = { shape, keys };
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.object) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const { status, ctx } = this._processInputParams(input);
      const { shape, keys: shapeKeys } = this._getCached();
      const extraKeys = [];
      if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
        for (const key in ctx.data) {
          if (!shapeKeys.includes(key)) {
            extraKeys.push(key);
          }
        }
      }
      const pairs = [];
      for (const key of shapeKeys) {
        const keyValidator = shape[key];
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (this._def.catchall instanceof ZodNever) {
        const unknownKeys = this._def.unknownKeys;
        if (unknownKeys === "passthrough") {
          for (const key of extraKeys) {
            pairs.push({
              key: { status: "valid", value: key },
              value: { status: "valid", value: ctx.data[key] }
            });
          }
        } else if (unknownKeys === "strict") {
          if (extraKeys.length > 0) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.unrecognized_keys,
              keys: extraKeys
            });
            status.dirty();
          }
        } else if (unknownKeys === "strip") ;
        else {
          throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
        }
      } else {
        const catchall = this._def.catchall;
        for (const key of extraKeys) {
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: catchall._parse(
              new ParseInputLazyPath(ctx, value, ctx.path, key)
              //, ctx.child(key), value, getParsedType(value)
            ),
            alwaysSet: key in ctx.data
          });
        }
      }
      if (ctx.common.async) {
        return Promise.resolve().then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
              key,
              value,
              alwaysSet: pair.alwaysSet
            });
          }
          return syncPairs;
        }).then((syncPairs) => {
          return ParseStatus.mergeObjectSync(status, syncPairs);
        });
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get shape() {
      return this._def.shape();
    }
    strict(message) {
      errorUtil.errToObj;
      return new ZodObject({
        ...this._def,
        unknownKeys: "strict",
        ...message !== void 0 ? {
          errorMap: (issue, ctx) => {
            var _a, _b, _c, _d2;
            const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
            if (issue.code === "unrecognized_keys")
              return {
                message: (_d2 = errorUtil.errToObj(message).message) !== null && _d2 !== void 0 ? _d2 : defaultError
              };
            return {
              message: defaultError
            };
          }
        } : {}
      });
    }
    strip() {
      return new ZodObject({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new ZodObject({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
      return new ZodObject({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...augmentation
        })
      });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
      const merged = new ZodObject({
        unknownKeys: merging._def.unknownKeys,
        catchall: merging._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...merging._def.shape()
        }),
        typeName: ZodFirstPartyTypeKind.ZodObject
      });
      return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
      return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
      return new ZodObject({
        ...this._def,
        catchall: index
      });
    }
    pick(mask) {
      const shape = {};
      util.objectKeys(mask).forEach((key) => {
        if (mask[key] && this.shape[key]) {
          shape[key] = this.shape[key];
        }
      });
      return new ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    omit(mask) {
      const shape = {};
      util.objectKeys(this.shape).forEach((key) => {
        if (!mask[key]) {
          shape[key] = this.shape[key];
        }
      });
      return new ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    /**
     * @deprecated
     */
    deepPartial() {
      return deepPartialify(this);
    }
    partial(mask) {
      const newShape = {};
      util.objectKeys(this.shape).forEach((key) => {
        const fieldSchema = this.shape[key];
        if (mask && !mask[key]) {
          newShape[key] = fieldSchema;
        } else {
          newShape[key] = fieldSchema.optional();
        }
      });
      return new ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    required(mask) {
      const newShape = {};
      util.objectKeys(this.shape).forEach((key) => {
        if (mask && !mask[key]) {
          newShape[key] = this.shape[key];
        } else {
          const fieldSchema = this.shape[key];
          let newField = fieldSchema;
          while (newField instanceof ZodOptional) {
            newField = newField._def.innerType;
          }
          newShape[key] = newField;
        }
      });
      return new ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    keyof() {
      return createZodEnum(util.objectKeys(this.shape));
    }
  }
  ZodObject.create = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strict",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
      shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  class ZodUnion extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const options = this._def.options;
      function handleResults(results) {
        for (const result2 of results) {
          if (result2.result.status === "valid") {
            return result2.result;
          }
        }
        for (const result2 of results) {
          if (result2.result.status === "dirty") {
            ctx.common.issues.push(...result2.ctx.common.issues);
            return result2.result;
          }
        }
        const unionErrors = results.map((result2) => new ZodError(result2.ctx.common.issues));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return Promise.all(options.map(async (option) => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            }),
            ctx: childCtx
          };
        })).then(handleResults);
      } else {
        let dirty = void 0;
        const issues = [];
        for (const option of options) {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          const result2 = option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          });
          if (result2.status === "valid") {
            return result2;
          } else if (result2.status === "dirty" && !dirty) {
            dirty = { result: result2, ctx: childCtx };
          }
          if (childCtx.common.issues.length) {
            issues.push(childCtx.common.issues);
          }
        }
        if (dirty) {
          ctx.common.issues.push(...dirty.ctx.common.issues);
          return dirty.result;
        }
        const unionErrors = issues.map((issues2) => new ZodError(issues2));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  }
  ZodUnion.create = (types, params) => {
    return new ZodUnion({
      options: types,
      typeName: ZodFirstPartyTypeKind.ZodUnion,
      ...processCreateParams(params)
    });
  };
  const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
      return getDiscriminator(type.schema);
    } else if (type instanceof ZodEffects) {
      return getDiscriminator(type.innerType());
    } else if (type instanceof ZodLiteral) {
      return [type.value];
    } else if (type instanceof ZodEnum) {
      return type.options;
    } else if (type instanceof ZodNativeEnum) {
      return util.objectValues(type.enum);
    } else if (type instanceof ZodDefault) {
      return getDiscriminator(type._def.innerType);
    } else if (type instanceof ZodUndefined) {
      return [void 0];
    } else if (type instanceof ZodNull) {
      return [null];
    } else if (type instanceof ZodOptional) {
      return [void 0, ...getDiscriminator(type.unwrap())];
    } else if (type instanceof ZodNullable) {
      return [null, ...getDiscriminator(type.unwrap())];
    } else if (type instanceof ZodBranded) {
      return getDiscriminator(type.unwrap());
    } else if (type instanceof ZodReadonly) {
      return getDiscriminator(type.unwrap());
    } else if (type instanceof ZodCatch) {
      return getDiscriminator(type._def.innerType);
    } else {
      return [];
    }
  };
  class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const discriminator = this.discriminator;
      const discriminatorValue = ctx.data[discriminator];
      const option = this.optionsMap.get(discriminatorValue);
      if (!option) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [discriminator]
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return option._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      } else {
        return option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      }
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
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
      const optionsMap = /* @__PURE__ */ new Map();
      for (const type of options) {
        const discriminatorValues = getDiscriminator(type.shape[discriminator]);
        if (!discriminatorValues.length) {
          throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
        }
        for (const value of discriminatorValues) {
          if (optionsMap.has(value)) {
            throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
          }
          optionsMap.set(value, type);
        }
      }
      return new ZodDiscriminatedUnion({
        typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
        discriminator,
        options,
        optionsMap,
        ...processCreateParams(params)
      });
    }
  }
  function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
      return { valid: true, data: a };
    } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
      const bKeys = util.objectKeys(b);
      const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
      const newObj = { ...a, ...b };
      for (const key of sharedKeys) {
        const sharedValue = mergeValues(a[key], b[key]);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newObj[key] = sharedValue.data;
      }
      return { valid: true, data: newObj };
    } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
      if (a.length !== b.length) {
        return { valid: false };
      }
      const newArray = [];
      for (let index = 0; index < a.length; index++) {
        const itemA = a[index];
        const itemB = b[index];
        const sharedValue = mergeValues(itemA, itemB);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newArray.push(sharedValue.data);
      }
      return { valid: true, data: newArray };
    } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
      return { valid: true, data: a };
    } else {
      return { valid: false };
    }
  }
  class ZodIntersection extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const handleParsed = (parsedLeft, parsedRight) => {
        if (isAborted(parsedLeft) || isAborted(parsedRight)) {
          return INVALID;
        }
        const merged = mergeValues(parsedLeft.value, parsedRight.value);
        if (!merged.valid) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_intersection_types
          });
          return INVALID;
        }
        if (isDirty(parsedLeft) || isDirty(parsedRight)) {
          status.dirty();
        }
        return { status: status.value, value: merged.data };
      };
      if (ctx.common.async) {
        return Promise.all([
          this._def.left._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }),
          this._def.right._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          })
        ]).then(([left, right]) => handleParsed(left, right));
      } else {
        return handleParsed(this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }), this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }));
      }
    }
  }
  ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
      left,
      right,
      typeName: ZodFirstPartyTypeKind.ZodIntersection,
      ...processCreateParams(params)
    });
  };
  class ZodTuple extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (ctx.data.length < this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        return INVALID;
      }
      const rest = this._def.rest;
      if (!rest && ctx.data.length > this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        });
        status.dirty();
      }
      const items = [...ctx.data].map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema)
          return null;
        return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
      }).filter((x) => !!x);
      if (ctx.common.async) {
        return Promise.all(items).then((results) => {
          return ParseStatus.mergeArray(status, results);
        });
      } else {
        return ParseStatus.mergeArray(status, items);
      }
    }
    get items() {
      return this._def.items;
    }
    rest(rest) {
      return new ZodTuple({
        ...this._def,
        rest
      });
    }
  }
  ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
      items: schemas,
      typeName: ZodFirstPartyTypeKind.ZodTuple,
      rest: null,
      ...processCreateParams(params)
    });
  };
  class ZodRecord extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const pairs = [];
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      for (const key in ctx.data) {
        pairs.push({
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
          value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (ctx.common.async) {
        return ParseStatus.mergeObjectAsync(status, pairs);
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get element() {
      return this._def.valueType;
    }
    static create(first, second, third) {
      if (second instanceof ZodType) {
        return new ZodRecord({
          keyType: first,
          valueType: second,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(third)
        });
      }
      return new ZodRecord({
        keyType: ZodString.create(),
        valueType: first,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(second)
      });
    }
  }
  class ZodMap extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.map) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.map,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      const pairs = [...ctx.data.entries()].map(([key, value], index) => {
        return {
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
          value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
        };
      });
      if (ctx.common.async) {
        const finalMap = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        });
      } else {
        const finalMap = /* @__PURE__ */ new Map();
        for (const pair of pairs) {
          const key = pair.key;
          const value = pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      }
    }
  }
  ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
      valueType,
      keyType,
      typeName: ZodFirstPartyTypeKind.ZodMap,
      ...processCreateParams(params)
    });
  };
  class ZodSet extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.set) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.set,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const def = this._def;
      if (def.minSize !== null) {
        if (ctx.data.size < def.minSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minSize.value,
            type: "set",
            inclusive: true,
            exact: false,
            message: def.minSize.message
          });
          status.dirty();
        }
      }
      if (def.maxSize !== null) {
        if (ctx.data.size > def.maxSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxSize.value,
            type: "set",
            inclusive: true,
            exact: false,
            message: def.maxSize.message
          });
          status.dirty();
        }
      }
      const valueType = this._def.valueType;
      function finalizeSet(elements2) {
        const parsedSet = /* @__PURE__ */ new Set();
        for (const element of elements2) {
          if (element.status === "aborted")
            return INVALID;
          if (element.status === "dirty")
            status.dirty();
          parsedSet.add(element.value);
        }
        return { status: status.value, value: parsedSet };
      }
      const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
      if (ctx.common.async) {
        return Promise.all(elements).then((elements2) => finalizeSet(elements2));
      } else {
        return finalizeSet(elements);
      }
    }
    min(minSize, message) {
      return new ZodSet({
        ...this._def,
        minSize: { value: minSize, message: errorUtil.toString(message) }
      });
    }
    max(maxSize, message) {
      return new ZodSet({
        ...this._def,
        maxSize: { value: maxSize, message: errorUtil.toString(message) }
      });
    }
    size(size, message) {
      return this.min(size, message).max(size, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  }
  ZodSet.create = (valueType, params) => {
    return new ZodSet({
      valueType,
      minSize: null,
      maxSize: null,
      typeName: ZodFirstPartyTypeKind.ZodSet,
      ...processCreateParams(params)
    });
  };
  class ZodFunction extends ZodType {
    constructor() {
      super(...arguments);
      this.validate = this.implement;
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.function) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.function,
          received: ctx.parsedType
        });
        return INVALID;
      }
      function makeArgsIssue(args, error) {
        return makeIssue({
          data: args,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            getErrorMap(),
            errorMap
          ].filter((x) => !!x),
          issueData: {
            code: ZodIssueCode.invalid_arguments,
            argumentsError: error
          }
        });
      }
      function makeReturnsIssue(returns, error) {
        return makeIssue({
          data: returns,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            getErrorMap(),
            errorMap
          ].filter((x) => !!x),
          issueData: {
            code: ZodIssueCode.invalid_return_type,
            returnTypeError: error
          }
        });
      }
      const params = { errorMap: ctx.common.contextualErrorMap };
      const fn2 = ctx.data;
      if (this._def.returns instanceof ZodPromise) {
        const me = this;
        return OK(async function(...args) {
          const error = new ZodError([]);
          const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
            error.addIssue(makeArgsIssue(args, e));
            throw error;
          });
          const result2 = await Reflect.apply(fn2, this, parsedArgs);
          const parsedReturns = await me._def.returns._def.type.parseAsync(result2, params).catch((e) => {
            error.addIssue(makeReturnsIssue(result2, e));
            throw error;
          });
          return parsedReturns;
        });
      } else {
        const me = this;
        return OK(function(...args) {
          const parsedArgs = me._def.args.safeParse(args, params);
          if (!parsedArgs.success) {
            throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
          }
          const result2 = Reflect.apply(fn2, this, parsedArgs.data);
          const parsedReturns = me._def.returns.safeParse(result2, params);
          if (!parsedReturns.success) {
            throw new ZodError([makeReturnsIssue(result2, parsedReturns.error)]);
          }
          return parsedReturns.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...items) {
      return new ZodFunction({
        ...this._def,
        args: ZodTuple.create(items).rest(ZodUnknown.create())
      });
    }
    returns(returnType) {
      return new ZodFunction({
        ...this._def,
        returns: returnType
      });
    }
    implement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    strictImplement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    static create(args, returns, params) {
      return new ZodFunction({
        args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
        returns: returns || ZodUnknown.create(),
        typeName: ZodFirstPartyTypeKind.ZodFunction,
        ...processCreateParams(params)
      });
    }
  }
  class ZodLazy extends ZodType {
    get schema() {
      return this._def.getter();
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const lazySchema = this._def.getter();
      return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
  }
  ZodLazy.create = (getter, params) => {
    return new ZodLazy({
      getter,
      typeName: ZodFirstPartyTypeKind.ZodLazy,
      ...processCreateParams(params)
    });
  };
  class ZodLiteral extends ZodType {
    _parse(input) {
      if (input.data !== this._def.value) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_literal,
          expected: this._def.value
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
    get value() {
      return this._def.value;
    }
  }
  ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
      value,
      typeName: ZodFirstPartyTypeKind.ZodLiteral,
      ...processCreateParams(params)
    });
  };
  function createZodEnum(values, params) {
    return new ZodEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodEnum,
      ...processCreateParams(params)
    });
  }
  class ZodEnum extends ZodType {
    constructor() {
      super(...arguments);
      _ZodEnum_cache.set(this, void 0);
    }
    _parse(input) {
      if (typeof input.data !== "string") {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (!__classPrivateFieldGet(this, _ZodEnum_cache)) {
        __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values));
      }
      if (!__classPrivateFieldGet(this, _ZodEnum_cache).has(input.data)) {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Values() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    extract(values, newDef = this._def) {
      return ZodEnum.create(values, {
        ...this._def,
        ...newDef
      });
    }
    exclude(values, newDef = this._def) {
      return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
        ...this._def,
        ...newDef
      });
    }
  }
  _ZodEnum_cache = /* @__PURE__ */ new WeakMap();
  ZodEnum.create = createZodEnum;
  class ZodNativeEnum extends ZodType {
    constructor() {
      super(...arguments);
      _ZodNativeEnum_cache.set(this, void 0);
    }
    _parse(input) {
      const nativeEnumValues = util.getValidEnumValues(this._def.values);
      const ctx = this._getOrReturnCtx(input);
      if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache)) {
        __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)));
      }
      if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache).has(input.data)) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  _ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
  ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
      ...processCreateParams(params)
    });
  };
  class ZodPromise extends ZodType {
    unwrap() {
      return this._def.type;
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.promise,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
      return OK(promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap
        });
      }));
    }
  }
  ZodPromise.create = (schema, params) => {
    return new ZodPromise({
      type: schema,
      typeName: ZodFirstPartyTypeKind.ZodPromise,
      ...processCreateParams(params)
    });
  };
  class ZodEffects extends ZodType {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const effect = this._def.effect || null;
      const checkCtx = {
        addIssue: (arg) => {
          addIssueToContext(ctx, arg);
          if (arg.fatal) {
            status.abort();
          } else {
            status.dirty();
          }
        },
        get path() {
          return ctx.path;
        }
      };
      checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
      if (effect.type === "preprocess") {
        const processed = effect.transform(ctx.data, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(processed).then(async (processed2) => {
            if (status.value === "aborted")
              return INVALID;
            const result2 = await this._def.schema._parseAsync({
              data: processed2,
              path: ctx.path,
              parent: ctx
            });
            if (result2.status === "aborted")
              return INVALID;
            if (result2.status === "dirty")
              return DIRTY(result2.value);
            if (status.value === "dirty")
              return DIRTY(result2.value);
            return result2;
          });
        } else {
          if (status.value === "aborted")
            return INVALID;
          const result2 = this._def.schema._parseSync({
            data: processed,
            path: ctx.path,
            parent: ctx
          });
          if (result2.status === "aborted")
            return INVALID;
          if (result2.status === "dirty")
            return DIRTY(result2.value);
          if (status.value === "dirty")
            return DIRTY(result2.value);
          return result2;
        }
      }
      if (effect.type === "refinement") {
        const executeRefinement = (acc) => {
          const result2 = effect.refinement(acc, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(result2);
          }
          if (result2 instanceof Promise) {
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          }
          return acc;
        };
        if (ctx.common.async === false) {
          const inner = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          executeRefinement(inner.value);
          return { status: status.value, value: inner.value };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            return executeRefinement(inner.value).then(() => {
              return { status: status.value, value: inner.value };
            });
          });
        }
      }
      if (effect.type === "transform") {
        if (ctx.common.async === false) {
          const base = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (!isValid(base))
            return base;
          const result2 = effect.transform(base.value, checkCtx);
          if (result2 instanceof Promise) {
            throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
          }
          return { status: status.value, value: result2 };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
            if (!isValid(base))
              return base;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result2) => ({ status: status.value, value: result2 }));
          });
        }
      }
      util.assertNever(effect);
    }
  }
  ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
      schema,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect,
      ...processCreateParams(params)
    });
  };
  ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
      schema,
      effect: { type: "preprocess", transform: preprocess },
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      ...processCreateParams(params)
    });
  };
  class ZodOptional extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.undefined) {
        return OK(void 0);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  ZodOptional.create = (type, params) => {
    return new ZodOptional({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodOptional,
      ...processCreateParams(params)
    });
  };
  class ZodNullable extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.null) {
        return OK(null);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  ZodNullable.create = (type, params) => {
    return new ZodNullable({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodNullable,
      ...processCreateParams(params)
    });
  };
  class ZodDefault extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      let data = ctx.data;
      if (ctx.parsedType === ZodParsedType.undefined) {
        data = this._def.defaultValue();
      }
      return this._def.innerType._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  ZodDefault.create = (type, params) => {
    return new ZodDefault({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodDefault,
      defaultValue: typeof params.default === "function" ? params.default : () => params.default,
      ...processCreateParams(params)
    });
  };
  class ZodCatch extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const newCtx = {
        ...ctx,
        common: {
          ...ctx.common,
          issues: []
        }
      };
      const result2 = this._def.innerType._parse({
        data: newCtx.data,
        path: newCtx.path,
        parent: {
          ...newCtx
        }
      });
      if (isAsync(result2)) {
        return result2.then((result3) => {
          return {
            status: "valid",
            value: result3.status === "valid" ? result3.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        });
      } else {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      }
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  ZodCatch.create = (type, params) => {
    return new ZodCatch({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodCatch,
      catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
      ...processCreateParams(params)
    });
  };
  class ZodNaN extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.nan) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.nan,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
  }
  ZodNaN.create = (params) => {
    return new ZodNaN({
      typeName: ZodFirstPartyTypeKind.ZodNaN,
      ...processCreateParams(params)
    });
  };
  const BRAND = Symbol("zod_brand");
  class ZodBranded extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const data = ctx.data;
      return this._def.type._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    unwrap() {
      return this._def.type;
    }
  }
  class ZodPipeline extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.common.async) {
        const handleAsync = async () => {
          const inResult = await this._def.in._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return DIRTY(inResult.value);
          } else {
            return this._def.out._parseAsync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        };
        return handleAsync();
      } else {
        const inResult = this._def.in._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return {
            status: "dirty",
            value: inResult.value
          };
        } else {
          return this._def.out._parseSync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      }
    }
    static create(a, b) {
      return new ZodPipeline({
        in: a,
        out: b,
        typeName: ZodFirstPartyTypeKind.ZodPipeline
      });
    }
  }
  class ZodReadonly extends ZodType {
    _parse(input) {
      const result2 = this._def.innerType._parse(input);
      const freeze = (data) => {
        if (isValid(data)) {
          data.value = Object.freeze(data.value);
        }
        return data;
      };
      return isAsync(result2) ? result2.then((data) => freeze(data)) : freeze(result2);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodReadonly,
      ...processCreateParams(params)
    });
  };
  function custom(check, params = {}, fatal) {
    if (check)
      return ZodAny.create().superRefine((data, ctx) => {
        var _a, _b;
        if (!check(data)) {
          const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
          const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
          const p2 = typeof p === "string" ? { message: p } : p;
          ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
        }
      });
    return ZodAny.create();
  }
  const late = {
    object: ZodObject.lazycreate
  };
  var ZodFirstPartyTypeKind;
  (function(ZodFirstPartyTypeKind2) {
    ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
  })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
  const instanceOfType = (cls, params = {
    message: `Input not instance of ${cls.name}`
  }) => custom((data) => data instanceof cls, params);
  const stringType = ZodString.create;
  const numberType = ZodNumber.create;
  const nanType = ZodNaN.create;
  const bigIntType = ZodBigInt.create;
  const booleanType = ZodBoolean.create;
  const dateType = ZodDate.create;
  const symbolType = ZodSymbol.create;
  const undefinedType = ZodUndefined.create;
  const nullType = ZodNull.create;
  const anyType = ZodAny.create;
  const unknownType = ZodUnknown.create;
  const neverType = ZodNever.create;
  const voidType = ZodVoid.create;
  const arrayType = ZodArray.create;
  const objectType = ZodObject.create;
  const strictObjectType = ZodObject.strictCreate;
  const unionType = ZodUnion.create;
  const discriminatedUnionType = ZodDiscriminatedUnion.create;
  const intersectionType = ZodIntersection.create;
  const tupleType = ZodTuple.create;
  const recordType = ZodRecord.create;
  const mapType = ZodMap.create;
  const setType = ZodSet.create;
  const functionType = ZodFunction.create;
  const lazyType = ZodLazy.create;
  const literalType = ZodLiteral.create;
  const enumType = ZodEnum.create;
  const nativeEnumType = ZodNativeEnum.create;
  const promiseType = ZodPromise.create;
  const effectsType = ZodEffects.create;
  const optionalType = ZodOptional.create;
  const nullableType = ZodNullable.create;
  const preprocessType = ZodEffects.createWithPreprocess;
  const pipelineType = ZodPipeline.create;
  const ostring = () => stringType().optional();
  const onumber = () => numberType().optional();
  const oboolean = () => booleanType().optional();
  const coerce = {
    string: (arg) => ZodString.create({ ...arg, coerce: true }),
    number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
    boolean: (arg) => ZodBoolean.create({
      ...arg,
      coerce: true
    }),
    bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
    date: (arg) => ZodDate.create({ ...arg, coerce: true })
  };
  const NEVER = INVALID;
  var z$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    defaultErrorMap: errorMap,
    setErrorMap,
    getErrorMap,
    makeIssue,
    EMPTY_PATH,
    addIssueToContext,
    ParseStatus,
    INVALID,
    DIRTY,
    OK,
    isAborted,
    isDirty,
    isValid,
    isAsync,
    get util() {
      return util;
    },
    get objectUtil() {
      return objectUtil;
    },
    ZodParsedType,
    getParsedType,
    ZodType,
    datetimeRegex,
    ZodString,
    ZodNumber,
    ZodBigInt,
    ZodBoolean,
    ZodDate,
    ZodSymbol,
    ZodUndefined,
    ZodNull,
    ZodAny,
    ZodUnknown,
    ZodNever,
    ZodVoid,
    ZodArray,
    ZodObject,
    ZodUnion,
    ZodDiscriminatedUnion,
    ZodIntersection,
    ZodTuple,
    ZodRecord,
    ZodMap,
    ZodSet,
    ZodFunction,
    ZodLazy,
    ZodLiteral,
    ZodEnum,
    ZodNativeEnum,
    ZodPromise,
    ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional,
    ZodNullable,
    ZodDefault,
    ZodCatch,
    ZodNaN,
    BRAND,
    ZodBranded,
    ZodPipeline,
    ZodReadonly,
    custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late,
    get ZodFirstPartyTypeKind() {
      return ZodFirstPartyTypeKind;
    },
    coerce,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    "enum": enumType,
    "function": functionType,
    "instanceof": instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    "null": nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean,
    onumber,
    optional: optionalType,
    ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    "undefined": undefinedType,
    union: unionType,
    unknown: unknownType,
    "void": voidType,
    NEVER,
    ZodIssueCode,
    quotelessJson,
    ZodError
  });
  var j;
  (function(e) {
    e.assertEqual = (n) => n;
    function t(n) {
    }
    e.assertIs = t;
    function r(n) {
      throw new Error();
    }
    e.assertNever = r, e.arrayToEnum = (n) => {
      const i = {};
      for (const a of n)
        i[a] = a;
      return i;
    }, e.getValidEnumValues = (n) => {
      const i = e.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), a = {};
      for (const o of i)
        a[o] = n[o];
      return e.objectValues(a);
    }, e.objectValues = (n) => e.objectKeys(n).map(function(i) {
      return n[i];
    }), e.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
      const i = [];
      for (const a in n)
        Object.prototype.hasOwnProperty.call(n, a) && i.push(a);
      return i;
    }, e.find = (n, i) => {
      for (const a of n)
        if (i(a))
          return a;
    }, e.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
    function s(n, i = " | ") {
      return n.map((a) => typeof a == "string" ? `'${a}'` : a).join(i);
    }
    e.joinValues = s, e.jsonStringifyReplacer = (n, i) => typeof i == "bigint" ? i.toString() : i;
  })(j || (j = {}));
  var Dt;
  (function(e) {
    e.mergeShapes = (t, r) => ({
      ...t,
      ...r
      // second overwrites first
    });
  })(Dt || (Dt = {}));
  const y = j.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]), ye = (e) => {
    switch (typeof e) {
      case "undefined":
        return y.undefined;
      case "string":
        return y.string;
      case "number":
        return isNaN(e) ? y.nan : y.number;
      case "boolean":
        return y.boolean;
      case "function":
        return y.function;
      case "bigint":
        return y.bigint;
      case "symbol":
        return y.symbol;
      case "object":
        return Array.isArray(e) ? y.array : e === null ? y.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? y.promise : typeof Map < "u" && e instanceof Map ? y.map : typeof Set < "u" && e instanceof Set ? y.set : typeof Date < "u" && e instanceof Date ? y.date : y.object;
      default:
        return y.unknown;
    }
  }, f = j.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
  ]), dn = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
  class Y extends Error {
    constructor(t) {
      super(), this.issues = [], this.addIssue = (s) => {
        this.issues = [...this.issues, s];
      }, this.addIssues = (s = []) => {
        this.issues = [...this.issues, ...s];
      };
      const r = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = t;
    }
    get errors() {
      return this.issues;
    }
    format(t) {
      const r = t || function(i) {
        return i.message;
      }, s = { _errors: [] }, n = (i) => {
        for (const a of i.issues)
          if (a.code === "invalid_union")
            a.unionErrors.map(n);
          else if (a.code === "invalid_return_type")
            n(a.returnTypeError);
          else if (a.code === "invalid_arguments")
            n(a.argumentsError);
          else if (a.path.length === 0)
            s._errors.push(r(a));
          else {
            let o = s, l = 0;
            for (; l < a.path.length; ) {
              const u = a.path[l];
              l === a.path.length - 1 ? (o[u] = o[u] || { _errors: [] }, o[u]._errors.push(r(a))) : o[u] = o[u] || { _errors: [] }, o = o[u], l++;
            }
          }
      };
      return n(this), s;
    }
    static assert(t) {
      if (!(t instanceof Y))
        throw new Error(`Not a ZodError: ${t}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, j.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(t = (r) => r.message) {
      const r = {}, s = [];
      for (const n of this.issues)
        n.path.length > 0 ? (r[n.path[0]] = r[n.path[0]] || [], r[n.path[0]].push(t(n))) : s.push(t(n));
      return { formErrors: s, fieldErrors: r };
    }
    get formErrors() {
      return this.flatten();
    }
  }
  Y.create = (e) => new Y(e);
  const je = (e, t) => {
    let r;
    switch (e.code) {
      case f.invalid_type:
        e.received === y.undefined ? r = "Required" : r = `Expected ${e.expected}, received ${e.received}`;
        break;
      case f.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(e.expected, j.jsonStringifyReplacer)}`;
        break;
      case f.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${j.joinValues(e.keys, ", ")}`;
        break;
      case f.invalid_union:
        r = "Invalid input";
        break;
      case f.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${j.joinValues(e.options)}`;
        break;
      case f.invalid_enum_value:
        r = `Invalid enum value. Expected ${j.joinValues(e.options)}, received '${e.received}'`;
        break;
      case f.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case f.invalid_return_type:
        r = "Invalid function return type";
        break;
      case f.invalid_date:
        r = "Invalid date";
        break;
      case f.invalid_string:
        typeof e.validation == "object" ? "includes" in e.validation ? (r = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? r = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? r = `Invalid input: must end with "${e.validation.endsWith}"` : j.assertNever(e.validation) : e.validation !== "regex" ? r = `Invalid ${e.validation}` : r = "Invalid";
        break;
      case f.too_small:
        e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : r = "Invalid input";
        break;
      case f.too_big:
        e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? r = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : r = "Invalid input";
        break;
      case f.custom:
        r = "Invalid input";
        break;
      case f.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case f.not_multiple_of:
        r = `Number must be a multiple of ${e.multipleOf}`;
        break;
      case f.not_finite:
        r = "Number must be finite";
        break;
      default:
        r = t.defaultError, j.assertNever(e);
    }
    return { message: r };
  };
  let Hr = je;
  function hn(e) {
    Hr = e;
  }
  function yt() {
    return Hr;
  }
  const vt = (e) => {
    const { data: t, path: r, errorMaps: s, issueData: n } = e, i = [...r, ...n.path || []], a = {
      ...n,
      path: i
    };
    if (n.message !== void 0)
      return {
        ...n,
        path: i,
        message: n.message
      };
    let o = "";
    const l = s.filter((u) => !!u).slice().reverse();
    for (const u of l)
      o = u(a, { data: t, defaultError: o }).message;
    return {
      ...n,
      path: i,
      message: o
    };
  }, pn = [];
  function g(e, t) {
    const r = yt(), s = vt({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [
        e.common.contextualErrorMap,
        e.schemaErrorMap,
        r,
        r === je ? void 0 : je
        // then global default map
      ].filter((n) => !!n)
    });
    e.common.issues.push(s);
  }
  class W {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(t, r) {
      const s = [];
      for (const n of r) {
        if (n.status === "aborted")
          return C;
        n.status === "dirty" && t.dirty(), s.push(n.value);
      }
      return { status: t.value, value: s };
    }
    static async mergeObjectAsync(t, r) {
      const s = [];
      for (const n of r) {
        const i = await n.key, a = await n.value;
        s.push({
          key: i,
          value: a
        });
      }
      return W.mergeObjectSync(t, s);
    }
    static mergeObjectSync(t, r) {
      const s = {};
      for (const n of r) {
        const { key: i, value: a } = n;
        if (i.status === "aborted" || a.status === "aborted")
          return C;
        i.status === "dirty" && t.dirty(), a.status === "dirty" && t.dirty(), i.value !== "__proto__" && (typeof a.value < "u" || n.alwaysSet) && (s[i.value] = a.value);
      }
      return { status: t.value, value: s };
    }
  }
  const C = Object.freeze({
    status: "aborted"
  }), Pe = (e) => ({ status: "dirty", value: e }), z = (e) => ({ status: "valid", value: e }), Jt = (e) => e.status === "aborted", Wt = (e) => e.status === "dirty", Fe = (e) => e.status === "valid", Ge = (e) => typeof Promise < "u" && e instanceof Promise;
  function _t(e, t, r, s) {
    if (typeof t == "function" ? e !== t || !s : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return t.get(e);
  }
  function Yr(e, t, r, s, n) {
    if (typeof t == "function" ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return t.set(e, r), r;
  }
  var E;
  (function(e) {
    e.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, e.toString = (t) => typeof t == "string" ? t : t == null ? void 0 : t.message;
  })(E || (E = {}));
  var De, Je;
  class le {
    constructor(t, r, s, n) {
      this._cachedPath = [], this.parent = t, this.data = r, this._path = s, this._key = n;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  }
  const vr = (e, t) => {
    if (Fe(t))
      return { success: true, data: t.value };
    if (!e.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const r = new Y(e.common.issues);
        return this._error = r, this._error;
      }
    };
  };
  function N(e) {
    if (!e)
      return {};
    const { errorMap: t, invalid_type_error: r, required_error: s, description: n } = e;
    if (t && (r || s))
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return t ? { errorMap: t, description: n } : { errorMap: (a, o) => {
      var l, u;
      const { message: d } = e;
      return a.code === "invalid_enum_value" ? { message: d ?? o.defaultError } : typeof o.data > "u" ? { message: (l = d ?? s) !== null && l !== void 0 ? l : o.defaultError } : a.code !== "invalid_type" ? { message: o.defaultError } : { message: (u = d ?? r) !== null && u !== void 0 ? u : o.defaultError };
    }, description: n };
  }
  class P {
    constructor(t) {
      this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(t) {
      return ye(t.data);
    }
    _getOrReturnCtx(t, r) {
      return r || {
        common: t.parent.common,
        data: t.data,
        parsedType: ye(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      };
    }
    _processInputParams(t) {
      return {
        status: new W(),
        ctx: {
          common: t.parent.common,
          data: t.data,
          parsedType: ye(t.data),
          schemaErrorMap: this._def.errorMap,
          path: t.path,
          parent: t.parent
        }
      };
    }
    _parseSync(t) {
      const r = this._parse(t);
      if (Ge(r))
        throw new Error("Synchronous parse encountered promise.");
      return r;
    }
    _parseAsync(t) {
      const r = this._parse(t);
      return Promise.resolve(r);
    }
    parse(t, r) {
      const s = this.safeParse(t, r);
      if (s.success)
        return s.data;
      throw s.error;
    }
    safeParse(t, r) {
      var s;
      const n = {
        common: {
          issues: [],
          async: (s = r == null ? void 0 : r.async) !== null && s !== void 0 ? s : false,
          contextualErrorMap: r == null ? void 0 : r.errorMap
        },
        path: (r == null ? void 0 : r.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: ye(t)
      }, i = this._parseSync({ data: t, path: n.path, parent: n });
      return vr(n, i);
    }
    async parseAsync(t, r) {
      const s = await this.safeParseAsync(t, r);
      if (s.success)
        return s.data;
      throw s.error;
    }
    async safeParseAsync(t, r) {
      const s = {
        common: {
          issues: [],
          contextualErrorMap: r == null ? void 0 : r.errorMap,
          async: true
        },
        path: (r == null ? void 0 : r.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: ye(t)
      }, n = this._parse({ data: t, path: s.path, parent: s }), i = await (Ge(n) ? n : Promise.resolve(n));
      return vr(s, i);
    }
    refine(t, r) {
      const s = (n) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(n) : r;
      return this._refinement((n, i) => {
        const a = t(n), o = () => i.addIssue({
          code: f.custom,
          ...s(n)
        });
        return typeof Promise < "u" && a instanceof Promise ? a.then((l) => l ? true : (o(), false)) : a ? true : (o(), false);
      });
    }
    refinement(t, r) {
      return this._refinement((s, n) => t(s) ? true : (n.addIssue(typeof r == "function" ? r(s, n) : r), false));
    }
    _refinement(t) {
      return new se({
        schema: this,
        typeName: A.ZodEffects,
        effect: { type: "refinement", refinement: t }
      });
    }
    superRefine(t) {
      return this._refinement(t);
    }
    optional() {
      return ce.create(this, this._def);
    }
    nullable() {
      return Ee.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return re.create(this, this._def);
    }
    promise() {
      return Ze.create(this, this._def);
    }
    or(t) {
      return Ke.create([this, t], this._def);
    }
    and(t) {
      return Qe.create(this, t, this._def);
    }
    transform(t) {
      return new se({
        ...N(this._def),
        schema: this,
        typeName: A.ZodEffects,
        effect: { type: "transform", transform: t }
      });
    }
    default(t) {
      const r = typeof t == "function" ? t : () => t;
      return new nt({
        ...N(this._def),
        innerType: this,
        defaultValue: r,
        typeName: A.ZodDefault
      });
    }
    brand() {
      return new Xt({
        typeName: A.ZodBranded,
        type: this,
        ...N(this._def)
      });
    }
    catch(t) {
      const r = typeof t == "function" ? t : () => t;
      return new it({
        ...N(this._def),
        innerType: this,
        catchValue: r,
        typeName: A.ZodCatch
      });
    }
    describe(t) {
      const r = this.constructor;
      return new r({
        ...this._def,
        description: t
      });
    }
    pipe(t) {
      return ot.create(this, t);
    }
    readonly() {
      return at.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  const fn = /^c[^\s-]{8,}$/i, mn = /^[0-9a-z]+$/, gn = /^[0-9A-HJKMNP-TV-Z]{26}$/, yn = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, vn = /^[a-z0-9_-]{21}$/i, _n = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, bn = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, En = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
  let Vt;
  const Sn = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, xn = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, $n = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Kr = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", An = new RegExp(`^${Kr}$`);
  function Qr(e) {
    let t = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
    return e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision == null && (t = `${t}(\\.\\d+)?`), t;
  }
  function Rn(e) {
    return new RegExp(`^${Qr(e)}$`);
  }
  function es(e) {
    let t = `${Kr}T${Qr(e)}`;
    const r = [];
    return r.push(e.local ? "Z?" : "Z"), e.offset && r.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${r.join("|")})`, new RegExp(`^${t}$`);
  }
  function wn(e, t) {
    return !!((t === "v4" || !t) && Sn.test(e) || (t === "v6" || !t) && xn.test(e));
  }
  class te extends P {
    _parse(t) {
      if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== y.string) {
        const i = this._getOrReturnCtx(t);
        return g(i, {
          code: f.invalid_type,
          expected: y.string,
          received: i.parsedType
        }), C;
      }
      const s = new W();
      let n;
      for (const i of this._def.checks)
        if (i.kind === "min")
          t.data.length < i.value && (n = this._getOrReturnCtx(t, n), g(n, {
            code: f.too_small,
            minimum: i.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: i.message
          }), s.dirty());
        else if (i.kind === "max")
          t.data.length > i.value && (n = this._getOrReturnCtx(t, n), g(n, {
            code: f.too_big,
            maximum: i.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: i.message
          }), s.dirty());
        else if (i.kind === "length") {
          const a = t.data.length > i.value, o = t.data.length < i.value;
          (a || o) && (n = this._getOrReturnCtx(t, n), a ? g(n, {
            code: f.too_big,
            maximum: i.value,
            type: "string",
            inclusive: true,
            exact: true,
            message: i.message
          }) : o && g(n, {
            code: f.too_small,
            minimum: i.value,
            type: "string",
            inclusive: true,
            exact: true,
            message: i.message
          }), s.dirty());
        } else if (i.kind === "email")
          bn.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
            validation: "email",
            code: f.invalid_string,
            message: i.message
          }), s.dirty());
        else if (i.kind === "emoji")
          Vt || (Vt = new RegExp(En, "u")), Vt.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
            validation: "emoji",
            code: f.invalid_string,
            message: i.message
          }), s.dirty());
        else if (i.kind === "uuid")
          yn.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
            validation: "uuid",
            code: f.invalid_string,
            message: i.message
          }), s.dirty());
        else if (i.kind === "nanoid")
          vn.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
            validation: "nanoid",
            code: f.invalid_string,
            message: i.message
          }), s.dirty());
        else if (i.kind === "cuid")
          fn.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
            validation: "cuid",
            code: f.invalid_string,
            message: i.message
          }), s.dirty());
        else if (i.kind === "cuid2")
          mn.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
            validation: "cuid2",
            code: f.invalid_string,
            message: i.message
          }), s.dirty());
        else if (i.kind === "ulid")
          gn.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
            validation: "ulid",
            code: f.invalid_string,
            message: i.message
          }), s.dirty());
        else if (i.kind === "url")
          try {
            new URL(t.data);
          } catch {
            n = this._getOrReturnCtx(t, n), g(n, {
              validation: "url",
              code: f.invalid_string,
              message: i.message
            }), s.dirty();
          }
        else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
          validation: "regex",
          code: f.invalid_string,
          message: i.message
        }), s.dirty())) : i.kind === "trim" ? t.data = t.data.trim() : i.kind === "includes" ? t.data.includes(i.value, i.position) || (n = this._getOrReturnCtx(t, n), g(n, {
          code: f.invalid_string,
          validation: { includes: i.value, position: i.position },
          message: i.message
        }), s.dirty()) : i.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : i.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : i.kind === "startsWith" ? t.data.startsWith(i.value) || (n = this._getOrReturnCtx(t, n), g(n, {
          code: f.invalid_string,
          validation: { startsWith: i.value },
          message: i.message
        }), s.dirty()) : i.kind === "endsWith" ? t.data.endsWith(i.value) || (n = this._getOrReturnCtx(t, n), g(n, {
          code: f.invalid_string,
          validation: { endsWith: i.value },
          message: i.message
        }), s.dirty()) : i.kind === "datetime" ? es(i).test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
          code: f.invalid_string,
          validation: "datetime",
          message: i.message
        }), s.dirty()) : i.kind === "date" ? An.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
          code: f.invalid_string,
          validation: "date",
          message: i.message
        }), s.dirty()) : i.kind === "time" ? Rn(i).test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
          code: f.invalid_string,
          validation: "time",
          message: i.message
        }), s.dirty()) : i.kind === "duration" ? _n.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
          validation: "duration",
          code: f.invalid_string,
          message: i.message
        }), s.dirty()) : i.kind === "ip" ? wn(t.data, i.version) || (n = this._getOrReturnCtx(t, n), g(n, {
          validation: "ip",
          code: f.invalid_string,
          message: i.message
        }), s.dirty()) : i.kind === "base64" ? $n.test(t.data) || (n = this._getOrReturnCtx(t, n), g(n, {
          validation: "base64",
          code: f.invalid_string,
          message: i.message
        }), s.dirty()) : j.assertNever(i);
      return { status: s.value, value: t.data };
    }
    _regex(t, r, s) {
      return this.refinement((n) => t.test(n), {
        validation: r,
        code: f.invalid_string,
        ...E.errToObj(s)
      });
    }
    _addCheck(t) {
      return new te({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    email(t) {
      return this._addCheck({ kind: "email", ...E.errToObj(t) });
    }
    url(t) {
      return this._addCheck({ kind: "url", ...E.errToObj(t) });
    }
    emoji(t) {
      return this._addCheck({ kind: "emoji", ...E.errToObj(t) });
    }
    uuid(t) {
      return this._addCheck({ kind: "uuid", ...E.errToObj(t) });
    }
    nanoid(t) {
      return this._addCheck({ kind: "nanoid", ...E.errToObj(t) });
    }
    cuid(t) {
      return this._addCheck({ kind: "cuid", ...E.errToObj(t) });
    }
    cuid2(t) {
      return this._addCheck({ kind: "cuid2", ...E.errToObj(t) });
    }
    ulid(t) {
      return this._addCheck({ kind: "ulid", ...E.errToObj(t) });
    }
    base64(t) {
      return this._addCheck({ kind: "base64", ...E.errToObj(t) });
    }
    ip(t) {
      return this._addCheck({ kind: "ip", ...E.errToObj(t) });
    }
    datetime(t) {
      var r, s;
      return typeof t == "string" ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: t
      }) : this._addCheck({
        kind: "datetime",
        precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
        offset: (r = t == null ? void 0 : t.offset) !== null && r !== void 0 ? r : false,
        local: (s = t == null ? void 0 : t.local) !== null && s !== void 0 ? s : false,
        ...E.errToObj(t == null ? void 0 : t.message)
      });
    }
    date(t) {
      return this._addCheck({ kind: "date", message: t });
    }
    time(t) {
      return typeof t == "string" ? this._addCheck({
        kind: "time",
        precision: null,
        message: t
      }) : this._addCheck({
        kind: "time",
        precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
        ...E.errToObj(t == null ? void 0 : t.message)
      });
    }
    duration(t) {
      return this._addCheck({ kind: "duration", ...E.errToObj(t) });
    }
    regex(t, r) {
      return this._addCheck({
        kind: "regex",
        regex: t,
        ...E.errToObj(r)
      });
    }
    includes(t, r) {
      return this._addCheck({
        kind: "includes",
        value: t,
        position: r == null ? void 0 : r.position,
        ...E.errToObj(r == null ? void 0 : r.message)
      });
    }
    startsWith(t, r) {
      return this._addCheck({
        kind: "startsWith",
        value: t,
        ...E.errToObj(r)
      });
    }
    endsWith(t, r) {
      return this._addCheck({
        kind: "endsWith",
        value: t,
        ...E.errToObj(r)
      });
    }
    min(t, r) {
      return this._addCheck({
        kind: "min",
        value: t,
        ...E.errToObj(r)
      });
    }
    max(t, r) {
      return this._addCheck({
        kind: "max",
        value: t,
        ...E.errToObj(r)
      });
    }
    length(t, r) {
      return this._addCheck({
        kind: "length",
        value: t,
        ...E.errToObj(r)
      });
    }
    /**
     * @deprecated Use z.string().min(1) instead.
     * @see {@link ZodString.min}
     */
    nonempty(t) {
      return this.min(1, E.errToObj(t));
    }
    trim() {
      return new te({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      });
    }
    toLowerCase() {
      return new te({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }]
      });
    }
    toUpperCase() {
      return new te({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }]
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((t) => t.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((t) => t.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((t) => t.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((t) => t.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((t) => t.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((t) => t.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((t) => t.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((t) => t.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((t) => t.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((t) => t.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((t) => t.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((t) => t.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((t) => t.kind === "ip");
    }
    get isBase64() {
      return !!this._def.checks.find((t) => t.kind === "base64");
    }
    get minLength() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxLength() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
  }
  te.create = (e) => {
    var t;
    return new te({
      checks: [],
      typeName: A.ZodString,
      coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : false,
      ...N(e)
    });
  };
  function Cn(e, t) {
    const r = (e.toString().split(".")[1] || "").length, s = (t.toString().split(".")[1] || "").length, n = r > s ? r : s, i = parseInt(e.toFixed(n).replace(".", "")), a = parseInt(t.toFixed(n).replace(".", ""));
    return i % a / Math.pow(10, n);
  }
  class ve extends P {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(t) {
      if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== y.number) {
        const i = this._getOrReturnCtx(t);
        return g(i, {
          code: f.invalid_type,
          expected: y.number,
          received: i.parsedType
        }), C;
      }
      let s;
      const n = new W();
      for (const i of this._def.checks)
        i.kind === "int" ? j.isInteger(t.data) || (s = this._getOrReturnCtx(t, s), g(s, {
          code: f.invalid_type,
          expected: "integer",
          received: "float",
          message: i.message
        }), n.dirty()) : i.kind === "min" ? (i.inclusive ? t.data < i.value : t.data <= i.value) && (s = this._getOrReturnCtx(t, s), g(s, {
          code: f.too_small,
          minimum: i.value,
          type: "number",
          inclusive: i.inclusive,
          exact: false,
          message: i.message
        }), n.dirty()) : i.kind === "max" ? (i.inclusive ? t.data > i.value : t.data >= i.value) && (s = this._getOrReturnCtx(t, s), g(s, {
          code: f.too_big,
          maximum: i.value,
          type: "number",
          inclusive: i.inclusive,
          exact: false,
          message: i.message
        }), n.dirty()) : i.kind === "multipleOf" ? Cn(t.data, i.value) !== 0 && (s = this._getOrReturnCtx(t, s), g(s, {
          code: f.not_multiple_of,
          multipleOf: i.value,
          message: i.message
        }), n.dirty()) : i.kind === "finite" ? Number.isFinite(t.data) || (s = this._getOrReturnCtx(t, s), g(s, {
          code: f.not_finite,
          message: i.message
        }), n.dirty()) : j.assertNever(i);
      return { status: n.value, value: t.data };
    }
    gte(t, r) {
      return this.setLimit("min", t, true, E.toString(r));
    }
    gt(t, r) {
      return this.setLimit("min", t, false, E.toString(r));
    }
    lte(t, r) {
      return this.setLimit("max", t, true, E.toString(r));
    }
    lt(t, r) {
      return this.setLimit("max", t, false, E.toString(r));
    }
    setLimit(t, r, s, n) {
      return new ve({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: t,
            value: r,
            inclusive: s,
            message: E.toString(n)
          }
        ]
      });
    }
    _addCheck(t) {
      return new ve({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    int(t) {
      return this._addCheck({
        kind: "int",
        message: E.toString(t)
      });
    }
    positive(t) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: E.toString(t)
      });
    }
    negative(t) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: E.toString(t)
      });
    }
    nonpositive(t) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: E.toString(t)
      });
    }
    nonnegative(t) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: E.toString(t)
      });
    }
    multipleOf(t, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: t,
        message: E.toString(r)
      });
    }
    finite(t) {
      return this._addCheck({
        kind: "finite",
        message: E.toString(t)
      });
    }
    safe(t) {
      return this._addCheck({
        kind: "min",
        inclusive: true,
        value: Number.MIN_SAFE_INTEGER,
        message: E.toString(t)
      })._addCheck({
        kind: "max",
        inclusive: true,
        value: Number.MAX_SAFE_INTEGER,
        message: E.toString(t)
      });
    }
    get minValue() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
    get isInt() {
      return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && j.isInteger(t.value));
    }
    get isFinite() {
      let t = null, r = null;
      for (const s of this._def.checks) {
        if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
          return true;
        s.kind === "min" ? (r === null || s.value > r) && (r = s.value) : s.kind === "max" && (t === null || s.value < t) && (t = s.value);
      }
      return Number.isFinite(r) && Number.isFinite(t);
    }
  }
  ve.create = (e) => new ve({
    checks: [],
    typeName: A.ZodNumber,
    coerce: (e == null ? void 0 : e.coerce) || false,
    ...N(e)
  });
  class _e extends P {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(t) {
      if (this._def.coerce && (t.data = BigInt(t.data)), this._getType(t) !== y.bigint) {
        const i = this._getOrReturnCtx(t);
        return g(i, {
          code: f.invalid_type,
          expected: y.bigint,
          received: i.parsedType
        }), C;
      }
      let s;
      const n = new W();
      for (const i of this._def.checks)
        i.kind === "min" ? (i.inclusive ? t.data < i.value : t.data <= i.value) && (s = this._getOrReturnCtx(t, s), g(s, {
          code: f.too_small,
          type: "bigint",
          minimum: i.value,
          inclusive: i.inclusive,
          message: i.message
        }), n.dirty()) : i.kind === "max" ? (i.inclusive ? t.data > i.value : t.data >= i.value) && (s = this._getOrReturnCtx(t, s), g(s, {
          code: f.too_big,
          type: "bigint",
          maximum: i.value,
          inclusive: i.inclusive,
          message: i.message
        }), n.dirty()) : i.kind === "multipleOf" ? t.data % i.value !== BigInt(0) && (s = this._getOrReturnCtx(t, s), g(s, {
          code: f.not_multiple_of,
          multipleOf: i.value,
          message: i.message
        }), n.dirty()) : j.assertNever(i);
      return { status: n.value, value: t.data };
    }
    gte(t, r) {
      return this.setLimit("min", t, true, E.toString(r));
    }
    gt(t, r) {
      return this.setLimit("min", t, false, E.toString(r));
    }
    lte(t, r) {
      return this.setLimit("max", t, true, E.toString(r));
    }
    lt(t, r) {
      return this.setLimit("max", t, false, E.toString(r));
    }
    setLimit(t, r, s, n) {
      return new _e({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: t,
            value: r,
            inclusive: s,
            message: E.toString(n)
          }
        ]
      });
    }
    _addCheck(t) {
      return new _e({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    positive(t) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: false,
        message: E.toString(t)
      });
    }
    negative(t) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: false,
        message: E.toString(t)
      });
    }
    nonpositive(t) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: true,
        message: E.toString(t)
      });
    }
    nonnegative(t) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: true,
        message: E.toString(t)
      });
    }
    multipleOf(t, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: t,
        message: E.toString(r)
      });
    }
    get minValue() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
  }
  _e.create = (e) => {
    var t;
    return new _e({
      checks: [],
      typeName: A.ZodBigInt,
      coerce: (t = e == null ? void 0 : e.coerce) !== null && t !== void 0 ? t : false,
      ...N(e)
    });
  };
  class Xe extends P {
    _parse(t) {
      if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== y.boolean) {
        const s = this._getOrReturnCtx(t);
        return g(s, {
          code: f.invalid_type,
          expected: y.boolean,
          received: s.parsedType
        }), C;
      }
      return z(t.data);
    }
  }
  Xe.create = (e) => new Xe({
    typeName: A.ZodBoolean,
    coerce: (e == null ? void 0 : e.coerce) || false,
    ...N(e)
  });
  class Ae extends P {
    _parse(t) {
      if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== y.date) {
        const i = this._getOrReturnCtx(t);
        return g(i, {
          code: f.invalid_type,
          expected: y.date,
          received: i.parsedType
        }), C;
      }
      if (isNaN(t.data.getTime())) {
        const i = this._getOrReturnCtx(t);
        return g(i, {
          code: f.invalid_date
        }), C;
      }
      const s = new W();
      let n;
      for (const i of this._def.checks)
        i.kind === "min" ? t.data.getTime() < i.value && (n = this._getOrReturnCtx(t, n), g(n, {
          code: f.too_small,
          message: i.message,
          inclusive: true,
          exact: false,
          minimum: i.value,
          type: "date"
        }), s.dirty()) : i.kind === "max" ? t.data.getTime() > i.value && (n = this._getOrReturnCtx(t, n), g(n, {
          code: f.too_big,
          message: i.message,
          inclusive: true,
          exact: false,
          maximum: i.value,
          type: "date"
        }), s.dirty()) : j.assertNever(i);
      return {
        status: s.value,
        value: new Date(t.data.getTime())
      };
    }
    _addCheck(t) {
      return new Ae({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    min(t, r) {
      return this._addCheck({
        kind: "min",
        value: t.getTime(),
        message: E.toString(r)
      });
    }
    max(t, r) {
      return this._addCheck({
        kind: "max",
        value: t.getTime(),
        message: E.toString(r)
      });
    }
    get minDate() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t != null ? new Date(t) : null;
    }
    get maxDate() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t != null ? new Date(t) : null;
    }
  }
  Ae.create = (e) => new Ae({
    checks: [],
    coerce: (e == null ? void 0 : e.coerce) || false,
    typeName: A.ZodDate,
    ...N(e)
  });
  class bt extends P {
    _parse(t) {
      if (this._getType(t) !== y.symbol) {
        const s = this._getOrReturnCtx(t);
        return g(s, {
          code: f.invalid_type,
          expected: y.symbol,
          received: s.parsedType
        }), C;
      }
      return z(t.data);
    }
  }
  bt.create = (e) => new bt({
    typeName: A.ZodSymbol,
    ...N(e)
  });
  class He extends P {
    _parse(t) {
      if (this._getType(t) !== y.undefined) {
        const s = this._getOrReturnCtx(t);
        return g(s, {
          code: f.invalid_type,
          expected: y.undefined,
          received: s.parsedType
        }), C;
      }
      return z(t.data);
    }
  }
  He.create = (e) => new He({
    typeName: A.ZodUndefined,
    ...N(e)
  });
  class Ye extends P {
    _parse(t) {
      if (this._getType(t) !== y.null) {
        const s = this._getOrReturnCtx(t);
        return g(s, {
          code: f.invalid_type,
          expected: y.null,
          received: s.parsedType
        }), C;
      }
      return z(t.data);
    }
  }
  Ye.create = (e) => new Ye({
    typeName: A.ZodNull,
    ...N(e)
  });
  class Ve extends P {
    constructor() {
      super(...arguments), this._any = true;
    }
    _parse(t) {
      return z(t.data);
    }
  }
  Ve.create = (e) => new Ve({
    typeName: A.ZodAny,
    ...N(e)
  });
  class $e extends P {
    constructor() {
      super(...arguments), this._unknown = true;
    }
    _parse(t) {
      return z(t.data);
    }
  }
  $e.create = (e) => new $e({
    typeName: A.ZodUnknown,
    ...N(e)
  });
  class pe extends P {
    _parse(t) {
      const r = this._getOrReturnCtx(t);
      return g(r, {
        code: f.invalid_type,
        expected: y.never,
        received: r.parsedType
      }), C;
    }
  }
  pe.create = (e) => new pe({
    typeName: A.ZodNever,
    ...N(e)
  });
  class Et extends P {
    _parse(t) {
      if (this._getType(t) !== y.undefined) {
        const s = this._getOrReturnCtx(t);
        return g(s, {
          code: f.invalid_type,
          expected: y.void,
          received: s.parsedType
        }), C;
      }
      return z(t.data);
    }
  }
  Et.create = (e) => new Et({
    typeName: A.ZodVoid,
    ...N(e)
  });
  class re extends P {
    _parse(t) {
      const { ctx: r, status: s } = this._processInputParams(t), n = this._def;
      if (r.parsedType !== y.array)
        return g(r, {
          code: f.invalid_type,
          expected: y.array,
          received: r.parsedType
        }), C;
      if (n.exactLength !== null) {
        const a = r.data.length > n.exactLength.value, o = r.data.length < n.exactLength.value;
        (a || o) && (g(r, {
          code: a ? f.too_big : f.too_small,
          minimum: o ? n.exactLength.value : void 0,
          maximum: a ? n.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: n.exactLength.message
        }), s.dirty());
      }
      if (n.minLength !== null && r.data.length < n.minLength.value && (g(r, {
        code: f.too_small,
        minimum: n.minLength.value,
        type: "array",
        inclusive: true,
        exact: false,
        message: n.minLength.message
      }), s.dirty()), n.maxLength !== null && r.data.length > n.maxLength.value && (g(r, {
        code: f.too_big,
        maximum: n.maxLength.value,
        type: "array",
        inclusive: true,
        exact: false,
        message: n.maxLength.message
      }), s.dirty()), r.common.async)
        return Promise.all([...r.data].map((a, o) => n.type._parseAsync(new le(r, a, r.path, o)))).then((a) => W.mergeArray(s, a));
      const i = [...r.data].map((a, o) => n.type._parseSync(new le(r, a, r.path, o)));
      return W.mergeArray(s, i);
    }
    get element() {
      return this._def.type;
    }
    min(t, r) {
      return new re({
        ...this._def,
        minLength: { value: t, message: E.toString(r) }
      });
    }
    max(t, r) {
      return new re({
        ...this._def,
        maxLength: { value: t, message: E.toString(r) }
      });
    }
    length(t, r) {
      return new re({
        ...this._def,
        exactLength: { value: t, message: E.toString(r) }
      });
    }
    nonempty(t) {
      return this.min(1, t);
    }
  }
  re.create = (e, t) => new re({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: A.ZodArray,
    ...N(t)
  });
  function Te(e) {
    if (e instanceof B) {
      const t = {};
      for (const r in e.shape) {
        const s = e.shape[r];
        t[r] = ce.create(Te(s));
      }
      return new B({
        ...e._def,
        shape: () => t
      });
    } else return e instanceof re ? new re({
      ...e._def,
      type: Te(e.element)
    }) : e instanceof ce ? ce.create(Te(e.unwrap())) : e instanceof Ee ? Ee.create(Te(e.unwrap())) : e instanceof ue ? ue.create(e.items.map((t) => Te(t))) : e;
  }
  class B extends P {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const t = this._def.shape(), r = j.objectKeys(t);
      return this._cached = { shape: t, keys: r };
    }
    _parse(t) {
      if (this._getType(t) !== y.object) {
        const u = this._getOrReturnCtx(t);
        return g(u, {
          code: f.invalid_type,
          expected: y.object,
          received: u.parsedType
        }), C;
      }
      const { status: s, ctx: n } = this._processInputParams(t), { shape: i, keys: a } = this._getCached(), o = [];
      if (!(this._def.catchall instanceof pe && this._def.unknownKeys === "strip"))
        for (const u in n.data)
          a.includes(u) || o.push(u);
      const l = [];
      for (const u of a) {
        const d = i[u], h = n.data[u];
        l.push({
          key: { status: "valid", value: u },
          value: d._parse(new le(n, h, n.path, u)),
          alwaysSet: u in n.data
        });
      }
      if (this._def.catchall instanceof pe) {
        const u = this._def.unknownKeys;
        if (u === "passthrough")
          for (const d of o)
            l.push({
              key: { status: "valid", value: d },
              value: { status: "valid", value: n.data[d] }
            });
        else if (u === "strict")
          o.length > 0 && (g(n, {
            code: f.unrecognized_keys,
            keys: o
          }), s.dirty());
        else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        const u = this._def.catchall;
        for (const d of o) {
          const h = n.data[d];
          l.push({
            key: { status: "valid", value: d },
            value: u._parse(
              new le(n, h, n.path, d)
              //, ctx.child(key), value, getParsedType(value)
            ),
            alwaysSet: d in n.data
          });
        }
      }
      return n.common.async ? Promise.resolve().then(async () => {
        const u = [];
        for (const d of l) {
          const h = await d.key, b = await d.value;
          u.push({
            key: h,
            value: b,
            alwaysSet: d.alwaysSet
          });
        }
        return u;
      }).then((u) => W.mergeObjectSync(s, u)) : W.mergeObjectSync(s, l);
    }
    get shape() {
      return this._def.shape();
    }
    strict(t) {
      return E.errToObj, new B({
        ...this._def,
        unknownKeys: "strict",
        ...t !== void 0 ? {
          errorMap: (r, s) => {
            var n, i, a, o;
            const l = (a = (i = (n = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(n, r, s).message) !== null && a !== void 0 ? a : s.defaultError;
            return r.code === "unrecognized_keys" ? {
              message: (o = E.errToObj(t).message) !== null && o !== void 0 ? o : l
            } : {
              message: l
            };
          }
        } : {}
      });
    }
    strip() {
      return new B({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new B({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(t) {
      return new B({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...t
        })
      });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(t) {
      return new B({
        unknownKeys: t._def.unknownKeys,
        catchall: t._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...t._def.shape()
        }),
        typeName: A.ZodObject
      });
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(t, r) {
      return this.augment({ [t]: r });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(t) {
      return new B({
        ...this._def,
        catchall: t
      });
    }
    pick(t) {
      const r = {};
      return j.objectKeys(t).forEach((s) => {
        t[s] && this.shape[s] && (r[s] = this.shape[s]);
      }), new B({
        ...this._def,
        shape: () => r
      });
    }
    omit(t) {
      const r = {};
      return j.objectKeys(this.shape).forEach((s) => {
        t[s] || (r[s] = this.shape[s]);
      }), new B({
        ...this._def,
        shape: () => r
      });
    }
    /**
     * @deprecated
     */
    deepPartial() {
      return Te(this);
    }
    partial(t) {
      const r = {};
      return j.objectKeys(this.shape).forEach((s) => {
        const n = this.shape[s];
        t && !t[s] ? r[s] = n : r[s] = n.optional();
      }), new B({
        ...this._def,
        shape: () => r
      });
    }
    required(t) {
      const r = {};
      return j.objectKeys(this.shape).forEach((s) => {
        if (t && !t[s])
          r[s] = this.shape[s];
        else {
          let i = this.shape[s];
          for (; i instanceof ce; )
            i = i._def.innerType;
          r[s] = i;
        }
      }), new B({
        ...this._def,
        shape: () => r
      });
    }
    keyof() {
      return ts(j.objectKeys(this.shape));
    }
  }
  B.create = (e, t) => new B({
    shape: () => e,
    unknownKeys: "strip",
    catchall: pe.create(),
    typeName: A.ZodObject,
    ...N(t)
  });
  B.strictCreate = (e, t) => new B({
    shape: () => e,
    unknownKeys: "strict",
    catchall: pe.create(),
    typeName: A.ZodObject,
    ...N(t)
  });
  B.lazycreate = (e, t) => new B({
    shape: e,
    unknownKeys: "strip",
    catchall: pe.create(),
    typeName: A.ZodObject,
    ...N(t)
  });
  class Ke extends P {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t), s = this._def.options;
      function n(i) {
        for (const o of i)
          if (o.result.status === "valid")
            return o.result;
        for (const o of i)
          if (o.result.status === "dirty")
            return r.common.issues.push(...o.ctx.common.issues), o.result;
        const a = i.map((o) => new Y(o.ctx.common.issues));
        return g(r, {
          code: f.invalid_union,
          unionErrors: a
        }), C;
      }
      if (r.common.async)
        return Promise.all(s.map(async (i) => {
          const a = {
            ...r,
            common: {
              ...r.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await i._parseAsync({
              data: r.data,
              path: r.path,
              parent: a
            }),
            ctx: a
          };
        })).then(n);
      {
        let i;
        const a = [];
        for (const l of s) {
          const u = {
            ...r,
            common: {
              ...r.common,
              issues: []
            },
            parent: null
          }, d = l._parseSync({
            data: r.data,
            path: r.path,
            parent: u
          });
          if (d.status === "valid")
            return d;
          d.status === "dirty" && !i && (i = { result: d, ctx: u }), u.common.issues.length && a.push(u.common.issues);
        }
        if (i)
          return r.common.issues.push(...i.ctx.common.issues), i.result;
        const o = a.map((l) => new Y(l));
        return g(r, {
          code: f.invalid_union,
          unionErrors: o
        }), C;
      }
    }
    get options() {
      return this._def.options;
    }
  }
  Ke.create = (e, t) => new Ke({
    options: e,
    typeName: A.ZodUnion,
    ...N(t)
  });
  const de = (e) => e instanceof tt ? de(e.schema) : e instanceof se ? de(e.innerType()) : e instanceof rt ? [e.value] : e instanceof be ? e.options : e instanceof st ? j.objectValues(e.enum) : e instanceof nt ? de(e._def.innerType) : e instanceof He ? [void 0] : e instanceof Ye ? [null] : e instanceof ce ? [void 0, ...de(e.unwrap())] : e instanceof Ee ? [null, ...de(e.unwrap())] : e instanceof Xt || e instanceof at ? de(e.unwrap()) : e instanceof it ? de(e._def.innerType) : [];
  class $t extends P {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== y.object)
        return g(r, {
          code: f.invalid_type,
          expected: y.object,
          received: r.parsedType
        }), C;
      const s = this.discriminator, n = r.data[s], i = this.optionsMap.get(n);
      return i ? r.common.async ? i._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }) : i._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }) : (g(r, {
        code: f.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [s]
      }), C);
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
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(t, r, s) {
      const n = /* @__PURE__ */ new Map();
      for (const i of r) {
        const a = de(i.shape[t]);
        if (!a.length)
          throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
        for (const o of a) {
          if (n.has(o))
            throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(o)}`);
          n.set(o, i);
        }
      }
      return new $t({
        typeName: A.ZodDiscriminatedUnion,
        discriminator: t,
        options: r,
        optionsMap: n,
        ...N(s)
      });
    }
  }
  function zt(e, t) {
    const r = ye(e), s = ye(t);
    if (e === t)
      return { valid: true, data: e };
    if (r === y.object && s === y.object) {
      const n = j.objectKeys(t), i = j.objectKeys(e).filter((o) => n.indexOf(o) !== -1), a = { ...e, ...t };
      for (const o of i) {
        const l = zt(e[o], t[o]);
        if (!l.valid)
          return { valid: false };
        a[o] = l.data;
      }
      return { valid: true, data: a };
    } else if (r === y.array && s === y.array) {
      if (e.length !== t.length)
        return { valid: false };
      const n = [];
      for (let i = 0; i < e.length; i++) {
        const a = e[i], o = t[i], l = zt(a, o);
        if (!l.valid)
          return { valid: false };
        n.push(l.data);
      }
      return { valid: true, data: n };
    } else return r === y.date && s === y.date && +e == +t ? { valid: true, data: e } : { valid: false };
  }
  class Qe extends P {
    _parse(t) {
      const { status: r, ctx: s } = this._processInputParams(t), n = (i, a) => {
        if (Jt(i) || Jt(a))
          return C;
        const o = zt(i.value, a.value);
        return o.valid ? ((Wt(i) || Wt(a)) && r.dirty(), { status: r.value, value: o.data }) : (g(s, {
          code: f.invalid_intersection_types
        }), C);
      };
      return s.common.async ? Promise.all([
        this._def.left._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        }),
        this._def.right._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        })
      ]).then(([i, a]) => n(i, a)) : n(this._def.left._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      }), this._def.right._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      }));
    }
  }
  Qe.create = (e, t, r) => new Qe({
    left: e,
    right: t,
    typeName: A.ZodIntersection,
    ...N(r)
  });
  class ue extends P {
    _parse(t) {
      const { status: r, ctx: s } = this._processInputParams(t);
      if (s.parsedType !== y.array)
        return g(s, {
          code: f.invalid_type,
          expected: y.array,
          received: s.parsedType
        }), C;
      if (s.data.length < this._def.items.length)
        return g(s, {
          code: f.too_small,
          minimum: this._def.items.length,
          inclusive: true,
          exact: false,
          type: "array"
        }), C;
      !this._def.rest && s.data.length > this._def.items.length && (g(s, {
        code: f.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      }), r.dirty());
      const i = [...s.data].map((a, o) => {
        const l = this._def.items[o] || this._def.rest;
        return l ? l._parse(new le(s, a, s.path, o)) : null;
      }).filter((a) => !!a);
      return s.common.async ? Promise.all(i).then((a) => W.mergeArray(r, a)) : W.mergeArray(r, i);
    }
    get items() {
      return this._def.items;
    }
    rest(t) {
      return new ue({
        ...this._def,
        rest: t
      });
    }
  }
  ue.create = (e, t) => {
    if (!Array.isArray(e))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new ue({
      items: e,
      typeName: A.ZodTuple,
      rest: null,
      ...N(t)
    });
  };
  class et extends P {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: r, ctx: s } = this._processInputParams(t);
      if (s.parsedType !== y.object)
        return g(s, {
          code: f.invalid_type,
          expected: y.object,
          received: s.parsedType
        }), C;
      const n = [], i = this._def.keyType, a = this._def.valueType;
      for (const o in s.data)
        n.push({
          key: i._parse(new le(s, o, s.path, o)),
          value: a._parse(new le(s, s.data[o], s.path, o)),
          alwaysSet: o in s.data
        });
      return s.common.async ? W.mergeObjectAsync(r, n) : W.mergeObjectSync(r, n);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t, r, s) {
      return r instanceof P ? new et({
        keyType: t,
        valueType: r,
        typeName: A.ZodRecord,
        ...N(s)
      }) : new et({
        keyType: te.create(),
        valueType: t,
        typeName: A.ZodRecord,
        ...N(r)
      });
    }
  }
  class St extends P {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: r, ctx: s } = this._processInputParams(t);
      if (s.parsedType !== y.map)
        return g(s, {
          code: f.invalid_type,
          expected: y.map,
          received: s.parsedType
        }), C;
      const n = this._def.keyType, i = this._def.valueType, a = [...s.data.entries()].map(([o, l], u) => ({
        key: n._parse(new le(s, o, s.path, [u, "key"])),
        value: i._parse(new le(s, l, s.path, [u, "value"]))
      }));
      if (s.common.async) {
        const o = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const l of a) {
            const u = await l.key, d = await l.value;
            if (u.status === "aborted" || d.status === "aborted")
              return C;
            (u.status === "dirty" || d.status === "dirty") && r.dirty(), o.set(u.value, d.value);
          }
          return { status: r.value, value: o };
        });
      } else {
        const o = /* @__PURE__ */ new Map();
        for (const l of a) {
          const u = l.key, d = l.value;
          if (u.status === "aborted" || d.status === "aborted")
            return C;
          (u.status === "dirty" || d.status === "dirty") && r.dirty(), o.set(u.value, d.value);
        }
        return { status: r.value, value: o };
      }
    }
  }
  St.create = (e, t, r) => new St({
    valueType: t,
    keyType: e,
    typeName: A.ZodMap,
    ...N(r)
  });
  class Re extends P {
    _parse(t) {
      const { status: r, ctx: s } = this._processInputParams(t);
      if (s.parsedType !== y.set)
        return g(s, {
          code: f.invalid_type,
          expected: y.set,
          received: s.parsedType
        }), C;
      const n = this._def;
      n.minSize !== null && s.data.size < n.minSize.value && (g(s, {
        code: f.too_small,
        minimum: n.minSize.value,
        type: "set",
        inclusive: true,
        exact: false,
        message: n.minSize.message
      }), r.dirty()), n.maxSize !== null && s.data.size > n.maxSize.value && (g(s, {
        code: f.too_big,
        maximum: n.maxSize.value,
        type: "set",
        inclusive: true,
        exact: false,
        message: n.maxSize.message
      }), r.dirty());
      const i = this._def.valueType;
      function a(l) {
        const u = /* @__PURE__ */ new Set();
        for (const d of l) {
          if (d.status === "aborted")
            return C;
          d.status === "dirty" && r.dirty(), u.add(d.value);
        }
        return { status: r.value, value: u };
      }
      const o = [...s.data.values()].map((l, u) => i._parse(new le(s, l, s.path, u)));
      return s.common.async ? Promise.all(o).then((l) => a(l)) : a(o);
    }
    min(t, r) {
      return new Re({
        ...this._def,
        minSize: { value: t, message: E.toString(r) }
      });
    }
    max(t, r) {
      return new Re({
        ...this._def,
        maxSize: { value: t, message: E.toString(r) }
      });
    }
    size(t, r) {
      return this.min(t, r).max(t, r);
    }
    nonempty(t) {
      return this.min(1, t);
    }
  }
  Re.create = (e, t) => new Re({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: A.ZodSet,
    ...N(t)
  });
  class Le extends P {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== y.function)
        return g(r, {
          code: f.invalid_type,
          expected: y.function,
          received: r.parsedType
        }), C;
      function s(o, l) {
        return vt({
          data: o,
          path: r.path,
          errorMaps: [
            r.common.contextualErrorMap,
            r.schemaErrorMap,
            yt(),
            je
          ].filter((u) => !!u),
          issueData: {
            code: f.invalid_arguments,
            argumentsError: l
          }
        });
      }
      function n(o, l) {
        return vt({
          data: o,
          path: r.path,
          errorMaps: [
            r.common.contextualErrorMap,
            r.schemaErrorMap,
            yt(),
            je
          ].filter((u) => !!u),
          issueData: {
            code: f.invalid_return_type,
            returnTypeError: l
          }
        });
      }
      const i = { errorMap: r.common.contextualErrorMap }, a = r.data;
      if (this._def.returns instanceof Ze) {
        const o = this;
        return z(async function(...l) {
          const u = new Y([]), d = await o._def.args.parseAsync(l, i).catch((v) => {
            throw u.addIssue(s(l, v)), u;
          }), h = await Reflect.apply(a, this, d);
          return await o._def.returns._def.type.parseAsync(h, i).catch((v) => {
            throw u.addIssue(n(h, v)), u;
          });
        });
      } else {
        const o = this;
        return z(function(...l) {
          const u = o._def.args.safeParse(l, i);
          if (!u.success)
            throw new Y([s(l, u.error)]);
          const d = Reflect.apply(a, this, u.data), h = o._def.returns.safeParse(d, i);
          if (!h.success)
            throw new Y([n(d, h.error)]);
          return h.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...t) {
      return new Le({
        ...this._def,
        args: ue.create(t).rest($e.create())
      });
    }
    returns(t) {
      return new Le({
        ...this._def,
        returns: t
      });
    }
    implement(t) {
      return this.parse(t);
    }
    strictImplement(t) {
      return this.parse(t);
    }
    static create(t, r, s) {
      return new Le({
        args: t || ue.create([]).rest($e.create()),
        returns: r || $e.create(),
        typeName: A.ZodFunction,
        ...N(s)
      });
    }
  }
  class tt extends P {
    get schema() {
      return this._def.getter();
    }
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
    }
  }
  tt.create = (e, t) => new tt({
    getter: e,
    typeName: A.ZodLazy,
    ...N(t)
  });
  class rt extends P {
    _parse(t) {
      if (t.data !== this._def.value) {
        const r = this._getOrReturnCtx(t);
        return g(r, {
          received: r.data,
          code: f.invalid_literal,
          expected: this._def.value
        }), C;
      }
      return { status: "valid", value: t.data };
    }
    get value() {
      return this._def.value;
    }
  }
  rt.create = (e, t) => new rt({
    value: e,
    typeName: A.ZodLiteral,
    ...N(t)
  });
  function ts(e, t) {
    return new be({
      values: e,
      typeName: A.ZodEnum,
      ...N(t)
    });
  }
  class be extends P {
    constructor() {
      super(...arguments), De.set(this, void 0);
    }
    _parse(t) {
      if (typeof t.data != "string") {
        const r = this._getOrReturnCtx(t), s = this._def.values;
        return g(r, {
          expected: j.joinValues(s),
          received: r.parsedType,
          code: f.invalid_type
        }), C;
      }
      if (_t(this, De) || Yr(this, De, new Set(this._def.values)), !_t(this, De).has(t.data)) {
        const r = this._getOrReturnCtx(t), s = this._def.values;
        return g(r, {
          received: r.data,
          code: f.invalid_enum_value,
          options: s
        }), C;
      }
      return z(t.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const t = {};
      for (const r of this._def.values)
        t[r] = r;
      return t;
    }
    get Values() {
      const t = {};
      for (const r of this._def.values)
        t[r] = r;
      return t;
    }
    get Enum() {
      const t = {};
      for (const r of this._def.values)
        t[r] = r;
      return t;
    }
    extract(t, r = this._def) {
      return be.create(t, {
        ...this._def,
        ...r
      });
    }
    exclude(t, r = this._def) {
      return be.create(this.options.filter((s) => !t.includes(s)), {
        ...this._def,
        ...r
      });
    }
  }
  De = /* @__PURE__ */ new WeakMap();
  be.create = ts;
  class st extends P {
    constructor() {
      super(...arguments), Je.set(this, void 0);
    }
    _parse(t) {
      const r = j.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(t);
      if (s.parsedType !== y.string && s.parsedType !== y.number) {
        const n = j.objectValues(r);
        return g(s, {
          expected: j.joinValues(n),
          received: s.parsedType,
          code: f.invalid_type
        }), C;
      }
      if (_t(this, Je) || Yr(this, Je, new Set(j.getValidEnumValues(this._def.values))), !_t(this, Je).has(t.data)) {
        const n = j.objectValues(r);
        return g(s, {
          received: s.data,
          code: f.invalid_enum_value,
          options: n
        }), C;
      }
      return z(t.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  Je = /* @__PURE__ */ new WeakMap();
  st.create = (e, t) => new st({
    values: e,
    typeName: A.ZodNativeEnum,
    ...N(t)
  });
  class Ze extends P {
    unwrap() {
      return this._def.type;
    }
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== y.promise && r.common.async === false)
        return g(r, {
          code: f.invalid_type,
          expected: y.promise,
          received: r.parsedType
        }), C;
      const s = r.parsedType === y.promise ? r.data : Promise.resolve(r.data);
      return z(s.then((n) => this._def.type.parseAsync(n, {
        path: r.path,
        errorMap: r.common.contextualErrorMap
      })));
    }
  }
  Ze.create = (e, t) => new Ze({
    type: e,
    typeName: A.ZodPromise,
    ...N(t)
  });
  class se extends P {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === A.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(t) {
      const { status: r, ctx: s } = this._processInputParams(t), n = this._def.effect || null, i = {
        addIssue: (a) => {
          g(s, a), a.fatal ? r.abort() : r.dirty();
        },
        get path() {
          return s.path;
        }
      };
      if (i.addIssue = i.addIssue.bind(i), n.type === "preprocess") {
        const a = n.transform(s.data, i);
        if (s.common.async)
          return Promise.resolve(a).then(async (o) => {
            if (r.value === "aborted")
              return C;
            const l = await this._def.schema._parseAsync({
              data: o,
              path: s.path,
              parent: s
            });
            return l.status === "aborted" ? C : l.status === "dirty" || r.value === "dirty" ? Pe(l.value) : l;
          });
        {
          if (r.value === "aborted")
            return C;
          const o = this._def.schema._parseSync({
            data: a,
            path: s.path,
            parent: s
          });
          return o.status === "aborted" ? C : o.status === "dirty" || r.value === "dirty" ? Pe(o.value) : o;
        }
      }
      if (n.type === "refinement") {
        const a = (o) => {
          const l = n.refinement(o, i);
          if (s.common.async)
            return Promise.resolve(l);
          if (l instanceof Promise)
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return o;
        };
        if (s.common.async === false) {
          const o = this._def.schema._parseSync({
            data: s.data,
            path: s.path,
            parent: s
          });
          return o.status === "aborted" ? C : (o.status === "dirty" && r.dirty(), a(o.value), { status: r.value, value: o.value });
        } else
          return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? C : (o.status === "dirty" && r.dirty(), a(o.value).then(() => ({ status: r.value, value: o.value }))));
      }
      if (n.type === "transform")
        if (s.common.async === false) {
          const a = this._def.schema._parseSync({
            data: s.data,
            path: s.path,
            parent: s
          });
          if (!Fe(a))
            return a;
          const o = n.transform(a.value, i);
          if (o instanceof Promise)
            throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
          return { status: r.value, value: o };
        } else
          return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((a) => Fe(a) ? Promise.resolve(n.transform(a.value, i)).then((o) => ({ status: r.value, value: o })) : a);
      j.assertNever(n);
    }
  }
  se.create = (e, t, r) => new se({
    schema: e,
    typeName: A.ZodEffects,
    effect: t,
    ...N(r)
  });
  se.createWithPreprocess = (e, t, r) => new se({
    schema: t,
    effect: { type: "preprocess", transform: e },
    typeName: A.ZodEffects,
    ...N(r)
  });
  class ce extends P {
    _parse(t) {
      return this._getType(t) === y.undefined ? z(void 0) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  ce.create = (e, t) => new ce({
    innerType: e,
    typeName: A.ZodOptional,
    ...N(t)
  });
  class Ee extends P {
    _parse(t) {
      return this._getType(t) === y.null ? z(null) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Ee.create = (e, t) => new Ee({
    innerType: e,
    typeName: A.ZodNullable,
    ...N(t)
  });
  class nt extends P {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      let s = r.data;
      return r.parsedType === y.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
        data: s,
        path: r.path,
        parent: r
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  nt.create = (e, t) => new nt({
    innerType: e,
    typeName: A.ZodDefault,
    defaultValue: typeof t.default == "function" ? t.default : () => t.default,
    ...N(t)
  });
  class it extends P {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t), s = {
        ...r,
        common: {
          ...r.common,
          issues: []
        }
      }, n = this._def.innerType._parse({
        data: s.data,
        path: s.path,
        parent: {
          ...s
        }
      });
      return Ge(n) ? n.then((i) => ({
        status: "valid",
        value: i.status === "valid" ? i.value : this._def.catchValue({
          get error() {
            return new Y(s.common.issues);
          },
          input: s.data
        })
      })) : {
        status: "valid",
        value: n.status === "valid" ? n.value : this._def.catchValue({
          get error() {
            return new Y(s.common.issues);
          },
          input: s.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  it.create = (e, t) => new it({
    innerType: e,
    typeName: A.ZodCatch,
    catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
    ...N(t)
  });
  class xt extends P {
    _parse(t) {
      if (this._getType(t) !== y.nan) {
        const s = this._getOrReturnCtx(t);
        return g(s, {
          code: f.invalid_type,
          expected: y.nan,
          received: s.parsedType
        }), C;
      }
      return { status: "valid", value: t.data };
    }
  }
  xt.create = (e) => new xt({
    typeName: A.ZodNaN,
    ...N(e)
  });
  const kn = Symbol("zod_brand");
  class Xt extends P {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t), s = r.data;
      return this._def.type._parse({
        data: s,
        path: r.path,
        parent: r
      });
    }
    unwrap() {
      return this._def.type;
    }
  }
  class ot extends P {
    _parse(t) {
      const { status: r, ctx: s } = this._processInputParams(t);
      if (s.common.async)
        return (async () => {
          const i = await this._def.in._parseAsync({
            data: s.data,
            path: s.path,
            parent: s
          });
          return i.status === "aborted" ? C : i.status === "dirty" ? (r.dirty(), Pe(i.value)) : this._def.out._parseAsync({
            data: i.value,
            path: s.path,
            parent: s
          });
        })();
      {
        const n = this._def.in._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return n.status === "aborted" ? C : n.status === "dirty" ? (r.dirty(), {
          status: "dirty",
          value: n.value
        }) : this._def.out._parseSync({
          data: n.value,
          path: s.path,
          parent: s
        });
      }
    }
    static create(t, r) {
      return new ot({
        in: t,
        out: r,
        typeName: A.ZodPipeline
      });
    }
  }
  class at extends P {
    _parse(t) {
      const r = this._def.innerType._parse(t), s = (n) => (Fe(n) && (n.value = Object.freeze(n.value)), n);
      return Ge(r) ? r.then((n) => s(n)) : s(r);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  at.create = (e, t) => new at({
    innerType: e,
    typeName: A.ZodReadonly,
    ...N(t)
  });
  function rs(e, t = {}, r) {
    return e ? Ve.create().superRefine((s, n) => {
      var i, a;
      if (!e(s)) {
        const o = typeof t == "function" ? t(s) : typeof t == "string" ? { message: t } : t, l = (a = (i = o.fatal) !== null && i !== void 0 ? i : r) !== null && a !== void 0 ? a : true, u = typeof o == "string" ? { message: o } : o;
        n.addIssue({ code: "custom", ...u, fatal: l });
      }
    }) : Ve.create();
  }
  const In = {
    object: B.lazycreate
  };
  var A;
  (function(e) {
    e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
  })(A || (A = {}));
  const Nn = (e, t = {
    message: `Input not instance of ${e.name}`
  }) => rs((r) => r instanceof e, t), ss = te.create, ns = ve.create, On = xt.create, Tn = _e.create, is = Xe.create, Pn = Ae.create, Ln = bt.create, jn = He.create, Vn = Ye.create, Zn = Ve.create, qn = $e.create, Bn = pe.create, Mn = Et.create, Un = re.create, Dn = B.create, Jn = B.strictCreate, Wn = Ke.create, zn = $t.create, Fn = Qe.create, Gn = ue.create, Xn = et.create, Hn = St.create, Yn = Re.create, Kn = Le.create, Qn = tt.create, ei = rt.create, ti = be.create, ri = st.create, si = Ze.create, _r = se.create, ni = ce.create, ii = Ee.create, ai = se.createWithPreprocess, oi = ot.create, ci = () => ss().optional(), li = () => ns().optional(), ui = () => is().optional(), di = {
    string: (e) => te.create({ ...e, coerce: true }),
    number: (e) => ve.create({ ...e, coerce: true }),
    boolean: (e) => Xe.create({
      ...e,
      coerce: true
    }),
    bigint: (e) => _e.create({ ...e, coerce: true }),
    date: (e) => Ae.create({ ...e, coerce: true })
  }, hi = C;
  var c = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    defaultErrorMap: je,
    setErrorMap: hn,
    getErrorMap: yt,
    makeIssue: vt,
    EMPTY_PATH: pn,
    addIssueToContext: g,
    ParseStatus: W,
    INVALID: C,
    DIRTY: Pe,
    OK: z,
    isAborted: Jt,
    isDirty: Wt,
    isValid: Fe,
    isAsync: Ge,
    get util() {
      return j;
    },
    get objectUtil() {
      return Dt;
    },
    ZodParsedType: y,
    getParsedType: ye,
    ZodType: P,
    datetimeRegex: es,
    ZodString: te,
    ZodNumber: ve,
    ZodBigInt: _e,
    ZodBoolean: Xe,
    ZodDate: Ae,
    ZodSymbol: bt,
    ZodUndefined: He,
    ZodNull: Ye,
    ZodAny: Ve,
    ZodUnknown: $e,
    ZodNever: pe,
    ZodVoid: Et,
    ZodArray: re,
    ZodObject: B,
    ZodUnion: Ke,
    ZodDiscriminatedUnion: $t,
    ZodIntersection: Qe,
    ZodTuple: ue,
    ZodRecord: et,
    ZodMap: St,
    ZodSet: Re,
    ZodFunction: Le,
    ZodLazy: tt,
    ZodLiteral: rt,
    ZodEnum: be,
    ZodNativeEnum: st,
    ZodPromise: Ze,
    ZodEffects: se,
    ZodTransformer: se,
    ZodOptional: ce,
    ZodNullable: Ee,
    ZodDefault: nt,
    ZodCatch: it,
    ZodNaN: xt,
    BRAND: kn,
    ZodBranded: Xt,
    ZodPipeline: ot,
    ZodReadonly: at,
    custom: rs,
    Schema: P,
    ZodSchema: P,
    late: In,
    get ZodFirstPartyTypeKind() {
      return A;
    },
    coerce: di,
    any: Zn,
    array: Un,
    bigint: Tn,
    boolean: is,
    date: Pn,
    discriminatedUnion: zn,
    effect: _r,
    enum: ti,
    function: Kn,
    instanceof: Nn,
    intersection: Fn,
    lazy: Qn,
    literal: ei,
    map: Hn,
    nan: On,
    nativeEnum: ri,
    never: Bn,
    null: Vn,
    nullable: ii,
    number: ns,
    object: Dn,
    oboolean: ui,
    onumber: li,
    optional: ni,
    ostring: ci,
    pipeline: oi,
    preprocess: ai,
    promise: si,
    record: Xn,
    set: Yn,
    strictObject: Jn,
    string: ss,
    symbol: Ln,
    transformer: _r,
    tuple: Gn,
    undefined: jn,
    union: Wn,
    unknown: qn,
    void: Mn,
    NEVER: hi,
    ZodIssueCode: f,
    quotelessJson: dn,
    ZodError: Y
  }), I = /* @__PURE__ */ ((e) => (e.Article = "article", e.AudioVisualDocument = "audiovisualdocument", e.Book = "book", e.Bookitem = "bookitem", e.Conference = "conference", e.Document = "document", e.Image = "image", e.Issue = "issue", e.Journal = "journal", e.Preprint = "preprint", e.Proceeding = "proceeding", e.Report = "report", e.Unknown = "unknown", e.Webpage = "webpage", e))(I || {});
  c.union([
    c.literal(
      "book"
      /* Book */
    ),
    c.literal(
      "bookitem"
      /* Bookitem */
    ),
    c.literal(
      "conference"
      /* Conference */
    ),
    c.literal(
      "document"
      /* Document */
    ),
    c.literal(
      "report"
      /* Report */
    ),
    c.literal(
      "proceeding"
      /* Proceeding */
    ),
    c.literal(
      "unknown"
      /* Unknown */
    )
  ]);
  c.union([
    c.literal(
      "article"
      /* Article */
    ),
    c.literal(
      "conference"
      /* Conference */
    ),
    c.literal(
      "issue"
      /* Issue */
    ),
    c.literal(
      "journal"
      /* Journal */
    ),
    c.literal(
      "preprint"
      /* Preprint */
    ),
    c.literal(
      "proceeding"
      /* Proceeding */
    ),
    c.literal(
      "unknown"
      /* Unknown */
    )
  ]);
  const Se = c.object({
    artnum: c.string(),
    atitle: c.string(),
    aufirst: c.string(),
    aulast: c.string(),
    auinit: c.string(),
    auinit1: c.string(),
    auinitm: c.string(),
    ausuffix: c.string(),
    au: c.array(c.string()),
    aucorp: c.string(),
    bici: c.string(),
    btitle: c.string(),
    chron: c.string(),
    coden: c.string(),
    date: c.string(),
    edition: c.string(),
    eissn: c.string(),
    epage: c.string(),
    genre: c.nativeEnum(I),
    id: c.string(),
    isbn: c.string(),
    issn: c.string(),
    issue: c.string(),
    jtitle: c.string(),
    pages: c.string(),
    part: c.string(),
    place: c.string(),
    pub: c.string(),
    quarter: c.string(),
    rft_id: c.array(c.string()),
    series: c.string(),
    sici: c.string(),
    spage: c.string(),
    ssn: c.string(),
    stitle: c.string(),
    title: c.string(),
    tpages: c.string(),
    volume: c.string()
  }).partial(), as = c.object({
    bibid: c.string(),
    doi: c.string(),
    uri: c.string()
  }).partial();
  Se.pick({
    atitle: true,
    aufirst: true,
    aulast: true,
    auinit: true,
    auinit1: true,
    auinitm: true,
    ausuffix: true,
    au: true,
    aucorp: true,
    bici: true,
    btitle: true,
    date: true,
    edition: true,
    epage: true,
    id: true,
    isbn: true,
    issn: true,
    pages: true,
    place: true,
    pub: true,
    rft_id: true,
    title: true,
    tpages: true,
    series: true,
    spage: true
  }).partial();
  Se.pick({
    artnum: true,
    atitle: true,
    aufirst: true,
    aulast: true,
    auinit: true,
    auinit1: true,
    auinitm: true,
    ausuffix: true,
    au: true,
    aucorp: true,
    chron: true,
    coden: true,
    date: true,
    epage: true,
    id: true,
    isbn: true,
    eissn: true,
    issn: true,
    issue: true,
    title: true,
    jtitle: true,
    pages: true,
    part: true,
    pub: true,
    rft_id: true,
    sici: true,
    spage: true,
    stitle: true,
    ssn: true,
    quarter: true,
    volume: true
  }).partial();
  Se.pick({
    au: true,
    date: true,
    isbn: true,
    pub: true,
    title: true
  }).partial();
  Se.pick({
    au: true,
    date: true,
    pub: true,
    title: true
  }).partial();
  Se.pick({
    au: true,
    date: true,
    pub: true,
    title: true,
    spage: true,
    epage: true
  }).partial();
  Se.pick({
    au: true,
    date: true,
    title: true
  }).partial();
  const pi = Se.merge(
    as
  ), cs = (e) => Object.keys(e.shape);
  cs(Se);
  cs(as);
  var we = /* @__PURE__ */ ((e) => (e.CA = "CA", e.EUAPAC = "EUAPAC", e))(we || {});
  const ls = c.object({
    id: c.string(),
    name: c.string(),
    region: c.nativeEnum(we)
  });
  c.object({
    tenants: c.array(ls)
  });
  const Er = 9 * 1024 * 1024;
  c.object({
    url: c.string({
      required_error: 'should have the required string property "url"',
      message: '"url" must be a string'
    }).url({
      message: '"url" is invalid'
    }),
    html: c.string({
      required_error: 'should have the required string property "html"'
    }).max(Er, {
      message: `"html" should be a string with a MAX Length of ${Er}`
    }),
    tenantCode: c.string({
      required_error: 'should have the required string property "tenantCode"'
    }).min(1, {
      message: '"tenantCode" must be a string'
    }),
    region: c.enum([we.EUAPAC, we.CA], {
      required_error: 'should have the required string property "region"',
      message: '"region" must be a string of EUAPAC or CA'
    })
  });
  const us = c.object({
    name: c.string(),
    region: c.nativeEnum(we),
    apps: c.record(c.string(), c.string())
  });
  c.record(c.string(), us);
  const ds = c.object({
    parserType: c.string(),
    parserName: c.string().nullable(),
    uri: c.string(),
    referrer: c.string()
  }), hs = c.object({
    parserType: c.string(),
    parserName: c.string().nullable(),
    referrer: c.string()
  }), ps = c.object({
    bookmarkingWorkflowUrl: c.null(),
    resource: c.null()
  }), fs = c.object({
    bookmarkingWorkflowUrl: c.string(),
    resource: c.null()
  }), ms = c.object({
    bookmarkingWorkflowUrl: c.null(),
    resource: pi
  }), gs = c.object({
    z3988SearchResult: c.literal(true)
  }), Ht = c.union([
    fs,
    ps,
    ms,
    gs
  ]);
  c.object({
    meta: ds
  }).and(Ht);
  const Ni = c.object({
    meta: hs
  }).and(Ht);
  const qe = c.object({
    "@context": c.string()
  }), ra = c.object({
    "@id": c.string(),
    "@type": c.string(),
    author: c.object({
      "@id": c.string()
    }).optional(),
    datePublished: c.string().optional(),
    dateModified: c.string().optional(),
    description: c.string().optional(),
    inLanguage: c.string().optional(),
    isPartOf: c.object({
      "@id": c.string()
    }).optional(),
    name: c.string().optional(),
    url: c.string().optional()
  });
  qe.extend({
    "@graph": c.array(ra)
  });
  qe.extend({
    "@type": c.literal("VideoObject"),
    name: c.string(),
    author: c.string(),
    genre: c.string(),
    description: c.string(),
    uploadDate: c.string(),
    duration: c.string(),
    thumbnailUrl: c.array(c.string())
  });
  var ct = /* @__PURE__ */ ((e) => (e.Book = "Book", e.Journal = "Journal", e.Periodical = "Periodical", e.PublicationVolume = "PublicationVolume", e.ScholarlyArticle = "ScholarlyArticle", e.VideoObject = "VideoObject", e.WebPage = "WebPage", e))(ct || {});
  const Ns = c.object({
    "@type": c.literal(ct.ScholarlyArticle),
    author: c.array(
      c.object({
        "@type": c.string(),
        name: c.string()
      })
    ).optional(),
    editor: c.array(
      c.object({
        "@type": c.string(),
        name: c.string()
      })
    ).optional(),
    datePublished: c.string().optional(),
    headline: c.string().optional(),
    issn: c.array(c.string()).optional(),
    pageStart: c.string().optional(),
    pageEnd: c.string().optional(),
    isPartOf: c.object({
      "@type": c.union([c.string(), c.array(c.string())]),
      name: c.string(),
      issn: c.array(c.string()).optional(),
      volumeNumber: c.string().optional(),
      isbn: c.array(c.string()).optional()
    }),
    publisher: c.object({
      "@type": c.string(),
      name: c.string()
    }).optional()
  });
  qe.extend({
    "@type": c.literal(ct.WebPage),
    mainEntity: Ns
  });
  c.object({
    "@type": c.array(c.string()),
    name: c.string().optional(),
    issn: c.array(c.string()),
    volumeNumber: c.string().optional()
  });
  qe.extend({
    "@type": c.literal(ct.Book),
    copyrightYear: c.string().optional(),
    author: c.array(
      c.object({
        "@type": c.string(),
        name: c.string()
      })
    ).optional(),
    editor: c.array(
      c.object({
        "@type": c.string(),
        name: c.string()
      })
    ).optional(),
    isbn: c.string().optional(),
    name: c.string().optional(),
    numberOfPages: c.number().optional(),
    publisher: c.object({
      "@type": c.string(),
      name: c.string()
    }).optional()
  });
  c.object({
    "@type": c.literal("Periodical"),
    name: c.string(),
    url: c.string(),
    issn: c.array(c.string()),
    editor: c.array(
      c.object({
        givenName: c.string(),
        familyName: c.string()
      })
    ),
    publisher: c.object({
      name: c.string()
    }),
    description: c.string()
  });
  c.object({
    "@type": c.literal(ct.VideoObject),
    name: c.string().optional(),
    description: c.string().optional(),
    thumbnailUrl: c.string().optional(),
    uploadDate: c.string().optional(),
    contentUrl: c.string().optional(),
    duration: c.string().optional()
  });
  const Ar = c.object({
    "@type": c.literal("Organization"),
    name: c.union([c.string(), c.array(c.string())])
  }), Rr = c.object({
    "@type": c.literal("Person"),
    name: c.union([c.string(), c.array(c.string())])
  });
  qe.extend({
    identifier: c.object({
      "@type": c.string(),
      propertyID: c.string(),
      value: c.string()
    }),
    mainEntity: c.object({
      "@type": c.string(),
      "@id": c.string(),
      creator: c.optional(
        c.union([c.string(), Rr, c.array(Rr)])
      ),
      edition: c.optional(c.string()),
      isbn: c.optional(c.string()),
      issn: c.optional(c.array(c.string())),
      issueNumber: c.optional(c.string()),
      pagination: c.optional(c.string()),
      publisher: c.optional(
        c.union([
          c.string(),
          Ar,
          c.array(Ar)
        ])
      ),
      volumeNumber: c.optional(c.string())
    }),
    name: c.string()
  });
  c.object({
    "@content": c.string(),
    datePublished: c.string().optional(),
    mainEntity: c.object({
      type: c.string().optional(),
      name: c.string().optional(),
      author: c.array(
        c.object({
          name: c.string()
        })
      ).optional(),
      publisher: c.object({
        type: c.string(),
        name: c.string()
      }).optional(),
      isbn: c.string().optional()
    })
  });
  var Z = /* @__PURE__ */ ((e) => (e.NoResourceFound = "NoResourceFound", e.Z3988 = "Z3988", e.Z3988SearchResult = "Z3988SearchResult", e.Amazon = "Amazon", e.CupOfJo = "CupOfJo", e.IngentaConnect = "IngentaConnect", e.Jstor = "Jstor", e.Milne = "Milne", e.Primo = "Primo", e.SagePub = "SagePub", e.SageVideo = "SageVideo", e.ScienceDirect = "ScienceDirect", e.Springer = "Springer", e.Youtube = "Youtube", e.TaylorFrancis = "TaylorFrancis", e.Wiley = "Wiley", e.VuFind = "VuFind", e.ClinicalKey = "ClinicalKey", e.DOAJ = "DOAJ", e.Ebscohost = "Ebscohost", e.OpenStax = "OpenStax", e.AhaJournals = "AhaJournals", e))(Z || {});
  const qc = "5.14.0", Us = () => qc, Bc = ["com.au", "com", "ca", "co.uk", "de", "fr", "nl"], Mc = Bc.flatMap((e) => [
    `amazon.${e}`,
    `www.amazon.${e}`
  ]);
  ({
    version: Us(),
    siteRegistrations: [
      {
        matcher: {
          regexp: "^https://[a-z0-9\\-]+\\.on\\.worldcat\\.org/search"
        },
        name: "Worldcat Search Results",
        parsers: [Z.Z3988SearchResult]
      },
      {
        matcher: {
          regexp: "^https://[a-z0-9\\-]+\\.summon\\.serialssolutions\\.com/"
        },
        name: "Summon Search Results",
        parsers: [Z.Z3988SearchResult]
      },
      {
        matcher: { hostnames: ["cupofjo.com"] },
        name: "Cup of Jo",
        parsers: [Z.CupOfJo]
      },
      {
        matcher: { hostnames: ["youtube.com", "www.youtube.com"] },
        name: "Youtube",
        parsers: [Z.Youtube]
      },
      {
        matcher: { hostnames: ["www.sciencedirect.com"] },
        name: "Science Direct",
        parsers: [Z.ScienceDirect]
      },
      {
        matcher: { hostnames: Mc },
        name: "Amazon",
        parsers: [Z.Amazon]
      },
      {
        matcher: {
          hostnames: ["sagepub.com", "www.sagepub.com", "journals.sagepub.com"]
        },
        name: "Sage Publishing",
        parsers: [Z.SagePub]
      },
      {
        matcher: { hostnames: ["www.tandfonline.com"] },
        name: "Taylor & Francis",
        parsers: [Z.TaylorFrancis]
      },
      {
        matcher: {
          hostnames: ["wiley.com", "www.wiley.com", "onlinelibrary.wiley.com"]
        },
        name: "Wiley",
        parsers: [Z.Wiley]
      },
      {
        matcher: {
          regexp: "^https://[a-z0-9\\-]+\\.on\\.worldcat\\.org/"
        },
        name: "Worldcat",
        parsers: [Z.Z3988]
      },
      {
        matcher: { hostnames: ["catalogue.rau.ac.uk"] },
        name: "Royal Agricultural University Library",
        parsers: [Z.Z3988]
      },
      {
        matcher: { hostnames: ["link.springer.com"] },
        name: "Springer",
        parsers: [Z.Springer]
      },
      {
        matcher: { regexp: "^https://sk\\.sagepub\\.com/video/" },
        name: "Sage Video",
        parsers: [Z.SageVideo]
      },
      {
        matcher: {
          regexp: "^https://vufind\\.lboro\\.ac\\.uk/(Record|PrimoRecord)"
        },
        name: "VuFind",
        parsers: [Z.VuFind]
      },
      {
        matcher: { hostnames: ["www.clinicalkey.com", "www.clinicalkey.com.au"] },
        name: "ClinicalKey",
        parsers: [Z.ClinicalKey]
      },
      {
        matcher: {
          hostnames: ["www.jstor.org"]
        },
        name: "JSTOR",
        parsers: [Z.Jstor]
      },
      {
        matcher: { hostnames: ["doaj.org"] },
        name: "DOAJ",
        parsers: [Z.DOAJ]
      },
      {
        matcher: {
          regexp: "/.*ingentaconnect.com/"
        },
        name: "IngentaConnect",
        parsers: [Z.IngentaConnect]
      },
      {
        matcher: {
          hostnames: ["research.ebsco.com"]
        },
        name: "EBSCOHost",
        parsers: [Z.Ebscohost]
      },
      {
        matcher: {
          hostnames: ["openstax.org"]
        },
        name: "OpenStax",
        parsers: [Z.OpenStax]
      },
      {
        matcher: {
          hostnames: ["milneopentextbooks.org"]
        },
        name: "Milne Open Textbooks",
        parsers: [Z.Milne]
      },
      {
        matcher: {
          hostnames: ["www.perlego.com"]
        },
        name: "Perlego",
        parsers: [Z.Z3988]
      },
      {
        matcher: {
          hostnames: ["www.ahajournals.org"]
        },
        name: "AHA Journals",
        parsers: [Z.AhaJournals]
      }
    ]
  });
  const Ds = c.object({
    hostnames: c.array(c.string()).min(1)
  }), Js = c.object({
    regexp: c.string()
  }), Ws = c.union([
    Ds,
    Js
  ]), zs = c.object({
    matcher: Ws,
    name: c.string(),
    parsers: c.array(c.string()),
    libraryVersionRange: c.string().optional()
  }), Uc = c.object({
    siteRegistrations: c.array(zs),
    version: c.string()
  }), Jc = (e) => typeof e == "object" && e !== null;
  c.object({
    url: c.string(),
    document: c.custom(Jc)
  });
  var Gt = { exports: {} };
  const zc = "2.0.0", Fs = 256, Fc = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, Gc = 16, Xc = Fs - 6, Hc = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  var Nt = {
    MAX_LENGTH: Fs,
    MAX_SAFE_COMPONENT_LENGTH: Gc,
    MAX_SAFE_BUILD_LENGTH: Xc,
    MAX_SAFE_INTEGER: Fc,
    RELEASE_TYPES: Hc,
    SEMVER_SPEC_VERSION: zc,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  const Yc = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
  };
  var Ot = Yc;
  (function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: r,
      MAX_SAFE_BUILD_LENGTH: s,
      MAX_LENGTH: n
    } = Nt, i = Ot;
    t = e.exports = {};
    const a = t.re = [], o = t.safeRe = [], l = t.src = [], u = t.t = {};
    let d = 0;
    const h = "[a-zA-Z0-9-]", b = [
      ["\\s", 1],
      ["\\d", n],
      [h, s]
    ], v = (K) => {
      for (const [Q, fe] of b)
        K = K.split(`${Q}*`).join(`${Q}{0,${fe}}`).split(`${Q}+`).join(`${Q}{1,${fe}}`);
      return K;
    }, $ = (K, Q, fe) => {
      const jt = v(Q), D = d++;
      i(K, D, Q), u[K] = D, l[D] = Q, a[D] = new RegExp(Q, fe ? "g" : void 0), o[D] = new RegExp(jt, fe ? "g" : void 0);
    };
    $("NUMERICIDENTIFIER", "0|[1-9]\\d*"), $("NUMERICIDENTIFIERLOOSE", "\\d+"), $("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), $("MAINVERSION", `(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})`), $("MAINVERSIONLOOSE", `(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})`), $("PRERELEASEIDENTIFIER", `(?:${l[u.NUMERICIDENTIFIER]}|${l[u.NONNUMERICIDENTIFIER]})`), $("PRERELEASEIDENTIFIERLOOSE", `(?:${l[u.NUMERICIDENTIFIERLOOSE]}|${l[u.NONNUMERICIDENTIFIER]})`), $("PRERELEASE", `(?:-(${l[u.PRERELEASEIDENTIFIER]}(?:\\.${l[u.PRERELEASEIDENTIFIER]})*))`), $("PRERELEASELOOSE", `(?:-?(${l[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[u.PRERELEASEIDENTIFIERLOOSE]})*))`), $("BUILDIDENTIFIER", `${h}+`), $("BUILD", `(?:\\+(${l[u.BUILDIDENTIFIER]}(?:\\.${l[u.BUILDIDENTIFIER]})*))`), $("FULLPLAIN", `v?${l[u.MAINVERSION]}${l[u.PRERELEASE]}?${l[u.BUILD]}?`), $("FULL", `^${l[u.FULLPLAIN]}$`), $("LOOSEPLAIN", `[v=\\s]*${l[u.MAINVERSIONLOOSE]}${l[u.PRERELEASELOOSE]}?${l[u.BUILD]}?`), $("LOOSE", `^${l[u.LOOSEPLAIN]}$`), $("GTLT", "((?:<|>)?=?)"), $("XRANGEIDENTIFIERLOOSE", `${l[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), $("XRANGEIDENTIFIER", `${l[u.NUMERICIDENTIFIER]}|x|X|\\*`), $("XRANGEPLAIN", `[v=\\s]*(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:${l[u.PRERELEASE]})?${l[u.BUILD]}?)?)?`), $("XRANGEPLAINLOOSE", `[v=\\s]*(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:${l[u.PRERELEASELOOSE]})?${l[u.BUILD]}?)?)?`), $("XRANGE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAIN]}$`), $("XRANGELOOSE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAINLOOSE]}$`), $("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), $("COERCE", `${l[u.COERCEPLAIN]}(?:$|[^\\d])`), $("COERCEFULL", l[u.COERCEPLAIN] + `(?:${l[u.PRERELEASE]})?(?:${l[u.BUILD]})?(?:$|[^\\d])`), $("COERCERTL", l[u.COERCE], true), $("COERCERTLFULL", l[u.COERCEFULL], true), $("LONETILDE", "(?:~>?)"), $("TILDETRIM", `(\\s*)${l[u.LONETILDE]}\\s+`, true), t.tildeTrimReplace = "$1~", $("TILDE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAIN]}$`), $("TILDELOOSE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAINLOOSE]}$`), $("LONECARET", "(?:\\^)"), $("CARETTRIM", `(\\s*)${l[u.LONECARET]}\\s+`, true), t.caretTrimReplace = "$1^", $("CARET", `^${l[u.LONECARET]}${l[u.XRANGEPLAIN]}$`), $("CARETLOOSE", `^${l[u.LONECARET]}${l[u.XRANGEPLAINLOOSE]}$`), $("COMPARATORLOOSE", `^${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]})$|^$`), $("COMPARATOR", `^${l[u.GTLT]}\\s*(${l[u.FULLPLAIN]})$|^$`), $("COMPARATORTRIM", `(\\s*)${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]}|${l[u.XRANGEPLAIN]})`, true), t.comparatorTrimReplace = "$1$2$3", $("HYPHENRANGE", `^\\s*(${l[u.XRANGEPLAIN]})\\s+-\\s+(${l[u.XRANGEPLAIN]})\\s*$`), $("HYPHENRANGELOOSE", `^\\s*(${l[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[u.XRANGEPLAINLOOSE]})\\s*$`), $("STAR", "(<|>)?=?\\s*\\*"), $("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), $("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(Gt, Gt.exports);
  var dt = Gt.exports;
  const Kc = Object.freeze({ loose: true }), Qc = Object.freeze({}), el = (e) => e ? typeof e != "object" ? Kc : e : Qc;
  var ur = el;
  const kr = /^[0-9]+$/, Gs = (e, t) => {
    const r = kr.test(e), s = kr.test(t);
    return r && s && (e = +e, t = +t), e === t ? 0 : r && !s ? -1 : s && !r ? 1 : e < t ? -1 : 1;
  }, tl = (e, t) => Gs(t, e);
  var Xs = {
    compareIdentifiers: Gs,
    rcompareIdentifiers: tl
  };
  const pt = Ot, { MAX_LENGTH: Ir, MAX_SAFE_INTEGER: ft } = Nt, { safeRe: Nr, t: Or } = dt, rl = ur, { compareIdentifiers: Oe } = Xs;
  let sl = class oe {
    constructor(t, r) {
      if (r = rl(r), t instanceof oe) {
        if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
          return t;
        t = t.version;
      } else if (typeof t != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
      if (t.length > Ir)
        throw new TypeError(
          `version is longer than ${Ir} characters`
        );
      pt("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
      const s = t.trim().match(r.loose ? Nr[Or.LOOSE] : Nr[Or.FULL]);
      if (!s)
        throw new TypeError(`Invalid Version: ${t}`);
      if (this.raw = t, this.major = +s[1], this.minor = +s[2], this.patch = +s[3], this.major > ft || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > ft || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > ft || this.patch < 0)
        throw new TypeError("Invalid patch version");
      s[4] ? this.prerelease = s[4].split(".").map((n) => {
        if (/^[0-9]+$/.test(n)) {
          const i = +n;
          if (i >= 0 && i < ft)
            return i;
        }
        return n;
      }) : this.prerelease = [], this.build = s[5] ? s[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(t) {
      if (pt("SemVer.compare", this.version, this.options, t), !(t instanceof oe)) {
        if (typeof t == "string" && t === this.version)
          return 0;
        t = new oe(t, this.options);
      }
      return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
    }
    compareMain(t) {
      return t instanceof oe || (t = new oe(t, this.options)), Oe(this.major, t.major) || Oe(this.minor, t.minor) || Oe(this.patch, t.patch);
    }
    comparePre(t) {
      if (t instanceof oe || (t = new oe(t, this.options)), this.prerelease.length && !t.prerelease.length)
        return -1;
      if (!this.prerelease.length && t.prerelease.length)
        return 1;
      if (!this.prerelease.length && !t.prerelease.length)
        return 0;
      let r = 0;
      do {
        const s = this.prerelease[r], n = t.prerelease[r];
        if (pt("prerelease compare", r, s, n), s === void 0 && n === void 0)
          return 0;
        if (n === void 0)
          return 1;
        if (s === void 0)
          return -1;
        if (s === n)
          continue;
        return Oe(s, n);
      } while (++r);
    }
    compareBuild(t) {
      t instanceof oe || (t = new oe(t, this.options));
      let r = 0;
      do {
        const s = this.build[r], n = t.build[r];
        if (pt("build compare", r, s, n), s === void 0 && n === void 0)
          return 0;
        if (n === void 0)
          return 1;
        if (s === void 0)
          return -1;
        if (s === n)
          continue;
        return Oe(s, n);
      } while (++r);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(t, r, s) {
      switch (t) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, s);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, s);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", r, s), this.inc("pre", r, s);
          break;
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", r, s), this.inc("pre", r, s);
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        case "pre": {
          const n = Number(s) ? 1 : 0;
          if (!r && s === false)
            throw new Error("invalid increment argument: identifier is empty");
          if (this.prerelease.length === 0)
            this.prerelease = [n];
          else {
            let i = this.prerelease.length;
            for (; --i >= 0; )
              typeof this.prerelease[i] == "number" && (this.prerelease[i]++, i = -2);
            if (i === -1) {
              if (r === this.prerelease.join(".") && s === false)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(n);
            }
          }
          if (r) {
            let i = [r, n];
            s === false && (i = [r]), Oe(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = i) : this.prerelease = i;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${t}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  };
  var G = sl;
  const Tr = G, nl = (e, t, r = false) => {
    if (e instanceof Tr)
      return e;
    try {
      return new Tr(e, t);
    } catch (s) {
      if (!r)
        return null;
      throw s;
    }
  };
  var Be = nl;
  const il = Be, al = (e, t) => {
    const r = il(e, t);
    return r ? r.version : null;
  };
  var ol = al;
  const cl = Be, ll = (e, t) => {
    const r = cl(e.trim().replace(/^[=v]+/, ""), t);
    return r ? r.version : null;
  };
  var ul = ll;
  const Pr = G, dl = (e, t, r, s, n) => {
    typeof r == "string" && (n = s, s = r, r = void 0);
    try {
      return new Pr(
        e instanceof Pr ? e.version : e,
        r
      ).inc(t, s, n).version;
    } catch {
      return null;
    }
  };
  var hl = dl;
  const Lr = Be, pl = (e, t) => {
    const r = Lr(e, null, true), s = Lr(t, null, true), n = r.compare(s);
    if (n === 0)
      return null;
    const i = n > 0, a = i ? r : s, o = i ? s : r, l = !!a.prerelease.length;
    if (!!o.prerelease.length && !l)
      return !o.patch && !o.minor ? "major" : a.patch ? "patch" : a.minor ? "minor" : "major";
    const d = l ? "pre" : "";
    return r.major !== s.major ? d + "major" : r.minor !== s.minor ? d + "minor" : r.patch !== s.patch ? d + "patch" : "prerelease";
  };
  var fl = pl;
  const ml = G, gl = (e, t) => new ml(e, t).major;
  var yl = gl;
  const vl = G, _l = (e, t) => new vl(e, t).minor;
  var bl = _l;
  const El = G, Sl = (e, t) => new El(e, t).patch;
  var xl = Sl;
  const $l = Be, Al = (e, t) => {
    const r = $l(e, t);
    return r && r.prerelease.length ? r.prerelease : null;
  };
  var Rl = Al;
  const jr = G, wl = (e, t, r) => new jr(e, r).compare(new jr(t, r));
  var ie = wl;
  const Cl = ie, kl = (e, t, r) => Cl(t, e, r);
  var Il = kl;
  const Nl = ie, Ol = (e, t) => Nl(e, t, true);
  var Tl = Ol;
  const Vr = G, Pl = (e, t, r) => {
    const s = new Vr(e, r), n = new Vr(t, r);
    return s.compare(n) || s.compareBuild(n);
  };
  var dr = Pl;
  const Ll = dr, jl = (e, t) => e.sort((r, s) => Ll(r, s, t));
  var Vl = jl;
  const Zl = dr, ql = (e, t) => e.sort((r, s) => Zl(s, r, t));
  var Bl = ql;
  const Ml = ie, Ul = (e, t, r) => Ml(e, t, r) > 0;
  var Tt = Ul;
  const Dl = ie, Jl = (e, t, r) => Dl(e, t, r) < 0;
  var hr = Jl;
  const Wl = ie, zl = (e, t, r) => Wl(e, t, r) === 0;
  var Hs = zl;
  const Fl = ie, Gl = (e, t, r) => Fl(e, t, r) !== 0;
  var Ys = Gl;
  const Xl = ie, Hl = (e, t, r) => Xl(e, t, r) >= 0;
  var pr = Hl;
  const Yl = ie, Kl = (e, t, r) => Yl(e, t, r) <= 0;
  var fr = Kl;
  const Ql = Hs, eu = Ys, tu = Tt, ru = pr, su = hr, nu = fr, iu = (e, t, r, s) => {
    switch (t) {
      case "===":
        return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
      case "!==":
        return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
      case "":
      case "=":
      case "==":
        return Ql(e, r, s);
      case "!=":
        return eu(e, r, s);
      case ">":
        return tu(e, r, s);
      case ">=":
        return ru(e, r, s);
      case "<":
        return su(e, r, s);
      case "<=":
        return nu(e, r, s);
      default:
        throw new TypeError(`Invalid operator: ${t}`);
    }
  };
  var Ks = iu;
  const au = G, ou = Be, { safeRe: mt, t: gt } = dt, cu = (e, t) => {
    if (e instanceof au)
      return e;
    if (typeof e == "number" && (e = String(e)), typeof e != "string")
      return null;
    t = t || {};
    let r = null;
    if (!t.rtl)
      r = e.match(t.includePrerelease ? mt[gt.COERCEFULL] : mt[gt.COERCE]);
    else {
      const l = t.includePrerelease ? mt[gt.COERCERTLFULL] : mt[gt.COERCERTL];
      let u;
      for (; (u = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
        (!r || u.index + u[0].length !== r.index + r[0].length) && (r = u), l.lastIndex = u.index + u[1].length + u[2].length;
      l.lastIndex = -1;
    }
    if (r === null)
      return null;
    const s = r[2], n = r[3] || "0", i = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", o = t.includePrerelease && r[6] ? `+${r[6]}` : "";
    return ou(`${s}.${n}.${i}${a}${o}`, t);
  };
  var lu = cu;
  class uu {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(t) {
      const r = this.map.get(t);
      if (r !== void 0)
        return this.map.delete(t), this.map.set(t, r), r;
    }
    delete(t) {
      return this.map.delete(t);
    }
    set(t, r) {
      if (!this.delete(t) && r !== void 0) {
        if (this.map.size >= this.max) {
          const n = this.map.keys().next().value;
          this.delete(n);
        }
        this.map.set(t, r);
      }
      return this;
    }
  }
  var du = uu, Zt, Zr;
  function ae() {
    if (Zr) return Zt;
    Zr = 1;
    const e = /\s+/g;
    class t {
      constructor(m, R) {
        if (R = n(R), m instanceof t)
          return m.loose === !!R.loose && m.includePrerelease === !!R.includePrerelease ? m : new t(m.raw, R);
        if (m instanceof i)
          return this.raw = m.value, this.set = [[m]], this.formatted = void 0, this;
        if (this.options = R, this.loose = !!R.loose, this.includePrerelease = !!R.includePrerelease, this.raw = m.trim().replace(e, " "), this.set = this.raw.split("||").map((S) => this.parseRange(S.trim())).filter((S) => S.length), !this.set.length)
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        if (this.set.length > 1) {
          const S = this.set[0];
          if (this.set = this.set.filter((k) => !K(k[0])), this.set.length === 0)
            this.set = [S];
          else if (this.set.length > 1) {
            for (const k of this.set)
              if (k.length === 1 && Q(k[0])) {
                this.set = [k];
                break;
              }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let m = 0; m < this.set.length; m++) {
            m > 0 && (this.formatted += "||");
            const R = this.set[m];
            for (let S = 0; S < R.length; S++)
              S > 0 && (this.formatted += " "), this.formatted += R[S].toString().trim();
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(m) {
        const S = ((this.options.includePrerelease && v) | (this.options.loose && $)) + ":" + m, k = s.get(S);
        if (k)
          return k;
        const x = this.options.loose, O = x ? l[u.HYPHENRANGELOOSE] : l[u.HYPHENRANGE];
        m = m.replace(O, ln(this.options.includePrerelease)), a("hyphen replace", m), m = m.replace(l[u.COMPARATORTRIM], d), a("comparator trim", m), m = m.replace(l[u.TILDETRIM], h), a("tilde trim", m), m = m.replace(l[u.CARETTRIM], b), a("caret trim", m);
        let V = m.split(" ").map((J) => jt(J, this.options)).join(" ").split(/\s+/).map((J) => cn(J, this.options));
        x && (V = V.filter((J) => (a("loose invalid filter", J, this.options), !!J.match(l[u.COMPARATORLOOSE])))), a("range list", V);
        const L = /* @__PURE__ */ new Map(), q = V.map((J) => new i(J, this.options));
        for (const J of q) {
          if (K(J))
            return [J];
          L.set(J.value, J);
        }
        L.size > 1 && L.has("") && L.delete("");
        const H = [...L.values()];
        return s.set(S, H), H;
      }
      intersects(m, R) {
        if (!(m instanceof t))
          throw new TypeError("a Range is required");
        return this.set.some((S) => fe(S, R) && m.set.some((k) => fe(k, R) && S.every((x) => k.every((O) => x.intersects(O, R)))));
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(m) {
        if (!m)
          return false;
        if (typeof m == "string")
          try {
            m = new o(m, this.options);
          } catch {
            return false;
          }
        for (let R = 0; R < this.set.length; R++)
          if (un(this.set[R], m, this.options))
            return true;
        return false;
      }
    }
    Zt = t;
    const r = du, s = new r(), n = ur, i = Pt(), a = Ot, o = G, {
      safeRe: l,
      t: u,
      comparatorTrimReplace: d,
      tildeTrimReplace: h,
      caretTrimReplace: b
    } = dt, { FLAG_INCLUDE_PRERELEASE: v, FLAG_LOOSE: $ } = Nt, K = (_) => _.value === "<0.0.0-0", Q = (_) => _.value === "", fe = (_, m) => {
      let R = true;
      const S = _.slice();
      let k = S.pop();
      for (; R && S.length; )
        R = S.every((x) => k.intersects(x, m)), k = S.pop();
      return R;
    }, jt = (_, m) => (a("comp", _, m), _ = rn(_, m), a("caret", _), _ = en(_, m), a("tildes", _), _ = nn(_, m), a("xrange", _), _ = on(_, m), a("stars", _), _), D = (_) => !_ || _.toLowerCase() === "x" || _ === "*", en = (_, m) => _.trim().split(/\s+/).map((R) => tn(R, m)).join(" "), tn = (_, m) => {
      const R = m.loose ? l[u.TILDELOOSE] : l[u.TILDE];
      return _.replace(R, (S, k, x, O, V) => {
        a("tilde", _, S, k, x, O, V);
        let L;
        return D(k) ? L = "" : D(x) ? L = `>=${k}.0.0 <${+k + 1}.0.0-0` : D(O) ? L = `>=${k}.${x}.0 <${k}.${+x + 1}.0-0` : V ? (a("replaceTilde pr", V), L = `>=${k}.${x}.${O}-${V} <${k}.${+x + 1}.0-0`) : L = `>=${k}.${x}.${O} <${k}.${+x + 1}.0-0`, a("tilde return", L), L;
      });
    }, rn = (_, m) => _.trim().split(/\s+/).map((R) => sn(R, m)).join(" "), sn = (_, m) => {
      a("caret", _, m);
      const R = m.loose ? l[u.CARETLOOSE] : l[u.CARET], S = m.includePrerelease ? "-0" : "";
      return _.replace(R, (k, x, O, V, L) => {
        a("caret", _, k, x, O, V, L);
        let q;
        return D(x) ? q = "" : D(O) ? q = `>=${x}.0.0${S} <${+x + 1}.0.0-0` : D(V) ? x === "0" ? q = `>=${x}.${O}.0${S} <${x}.${+O + 1}.0-0` : q = `>=${x}.${O}.0${S} <${+x + 1}.0.0-0` : L ? (a("replaceCaret pr", L), x === "0" ? O === "0" ? q = `>=${x}.${O}.${V}-${L} <${x}.${O}.${+V + 1}-0` : q = `>=${x}.${O}.${V}-${L} <${x}.${+O + 1}.0-0` : q = `>=${x}.${O}.${V}-${L} <${+x + 1}.0.0-0`) : (a("no pr"), x === "0" ? O === "0" ? q = `>=${x}.${O}.${V}${S} <${x}.${O}.${+V + 1}-0` : q = `>=${x}.${O}.${V}${S} <${x}.${+O + 1}.0-0` : q = `>=${x}.${O}.${V} <${+x + 1}.0.0-0`), a("caret return", q), q;
      });
    }, nn = (_, m) => (a("replaceXRanges", _, m), _.split(/\s+/).map((R) => an(R, m)).join(" ")), an = (_, m) => {
      _ = _.trim();
      const R = m.loose ? l[u.XRANGELOOSE] : l[u.XRANGE];
      return _.replace(R, (S, k, x, O, V, L) => {
        a("xRange", _, S, k, x, O, V, L);
        const q = D(x), H = q || D(O), J = H || D(V), Me = J;
        return k === "=" && Me && (k = ""), L = m.includePrerelease ? "-0" : "", q ? k === ">" || k === "<" ? S = "<0.0.0-0" : S = "*" : k && Me ? (H && (O = 0), V = 0, k === ">" ? (k = ">=", H ? (x = +x + 1, O = 0, V = 0) : (O = +O + 1, V = 0)) : k === "<=" && (k = "<", H ? x = +x + 1 : O = +O + 1), k === "<" && (L = "-0"), S = `${k + x}.${O}.${V}${L}`) : H ? S = `>=${x}.0.0${L} <${+x + 1}.0.0-0` : J && (S = `>=${x}.${O}.0${L} <${x}.${+O + 1}.0-0`), a("xRange return", S), S;
      });
    }, on = (_, m) => (a("replaceStars", _, m), _.trim().replace(l[u.STAR], "")), cn = (_, m) => (a("replaceGTE0", _, m), _.trim().replace(l[m.includePrerelease ? u.GTE0PRE : u.GTE0], "")), ln = (_) => (m, R, S, k, x, O, V, L, q, H, J, Me) => (D(S) ? R = "" : D(k) ? R = `>=${S}.0.0${_ ? "-0" : ""}` : D(x) ? R = `>=${S}.${k}.0${_ ? "-0" : ""}` : O ? R = `>=${R}` : R = `>=${R}${_ ? "-0" : ""}`, D(q) ? L = "" : D(H) ? L = `<${+q + 1}.0.0-0` : D(J) ? L = `<${q}.${+H + 1}.0-0` : Me ? L = `<=${q}.${H}.${J}-${Me}` : _ ? L = `<${q}.${H}.${+J + 1}-0` : L = `<=${L}`, `${R} ${L}`.trim()), un = (_, m, R) => {
      for (let S = 0; S < _.length; S++)
        if (!_[S].test(m))
          return false;
      if (m.prerelease.length && !R.includePrerelease) {
        for (let S = 0; S < _.length; S++)
          if (a(_[S].semver), _[S].semver !== i.ANY && _[S].semver.prerelease.length > 0) {
            const k = _[S].semver;
            if (k.major === m.major && k.minor === m.minor && k.patch === m.patch)
              return true;
          }
        return false;
      }
      return true;
    };
    return Zt;
  }
  var qt, qr;
  function Pt() {
    if (qr) return qt;
    qr = 1;
    const e = Symbol("SemVer ANY");
    class t {
      static get ANY() {
        return e;
      }
      constructor(d, h) {
        if (h = r(h), d instanceof t) {
          if (d.loose === !!h.loose)
            return d;
          d = d.value;
        }
        d = d.trim().split(/\s+/).join(" "), a("comparator", d, h), this.options = h, this.loose = !!h.loose, this.parse(d), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
      }
      parse(d) {
        const h = this.options.loose ? s[n.COMPARATORLOOSE] : s[n.COMPARATOR], b = d.match(h);
        if (!b)
          throw new TypeError(`Invalid comparator: ${d}`);
        this.operator = b[1] !== void 0 ? b[1] : "", this.operator === "=" && (this.operator = ""), b[2] ? this.semver = new o(b[2], this.options.loose) : this.semver = e;
      }
      toString() {
        return this.value;
      }
      test(d) {
        if (a("Comparator.test", d, this.options.loose), this.semver === e || d === e)
          return true;
        if (typeof d == "string")
          try {
            d = new o(d, this.options);
          } catch {
            return false;
          }
        return i(d, this.operator, this.semver, this.options);
      }
      intersects(d, h) {
        if (!(d instanceof t))
          throw new TypeError("a Comparator is required");
        return this.operator === "" ? this.value === "" ? true : new l(d.value, h).test(this.value) : d.operator === "" ? d.value === "" ? true : new l(this.value, h).test(d.semver) : (h = r(h), h.includePrerelease && (this.value === "<0.0.0-0" || d.value === "<0.0.0-0") || !h.includePrerelease && (this.value.startsWith("<0.0.0") || d.value.startsWith("<0.0.0")) ? false : !!(this.operator.startsWith(">") && d.operator.startsWith(">") || this.operator.startsWith("<") && d.operator.startsWith("<") || this.semver.version === d.semver.version && this.operator.includes("=") && d.operator.includes("=") || i(this.semver, "<", d.semver, h) && this.operator.startsWith(">") && d.operator.startsWith("<") || i(this.semver, ">", d.semver, h) && this.operator.startsWith("<") && d.operator.startsWith(">")));
      }
    }
    qt = t;
    const r = ur, { safeRe: s, t: n } = dt, i = Ks, a = Ot, o = G, l = ae();
    return qt;
  }
  const hu = ae(), pu = (e, t, r) => {
    try {
      t = new hu(t, r);
    } catch {
      return false;
    }
    return t.test(e);
  };
  var Lt = pu;
  const fu = ae(), mu = (e, t) => new fu(e, t).set.map((r) => r.map((s) => s.value).join(" ").trim().split(" "));
  var gu = mu;
  const yu = G, vu = ae(), _u = (e, t, r) => {
    let s = null, n = null, i = null;
    try {
      i = new vu(t, r);
    } catch {
      return null;
    }
    return e.forEach((a) => {
      i.test(a) && (!s || n.compare(a) === -1) && (s = a, n = new yu(s, r));
    }), s;
  };
  var bu = _u;
  const Eu = G, Su = ae(), xu = (e, t, r) => {
    let s = null, n = null, i = null;
    try {
      i = new Su(t, r);
    } catch {
      return null;
    }
    return e.forEach((a) => {
      i.test(a) && (!s || n.compare(a) === 1) && (s = a, n = new Eu(s, r));
    }), s;
  };
  var $u = xu;
  const Bt = G, Au = ae(), Br = Tt, Ru = (e, t) => {
    e = new Au(e, t);
    let r = new Bt("0.0.0");
    if (e.test(r) || (r = new Bt("0.0.0-0"), e.test(r)))
      return r;
    r = null;
    for (let s = 0; s < e.set.length; ++s) {
      const n = e.set[s];
      let i = null;
      n.forEach((a) => {
        const o = new Bt(a.semver.version);
        switch (a.operator) {
          case ">":
            o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
          case "":
          case ">=":
            (!i || Br(o, i)) && (i = o);
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error(`Unexpected operation: ${a.operator}`);
        }
      }), i && (!r || Br(r, i)) && (r = i);
    }
    return r && e.test(r) ? r : null;
  };
  var wu = Ru;
  const Cu = ae(), ku = (e, t) => {
    try {
      return new Cu(e, t).range || "*";
    } catch {
      return null;
    }
  };
  var Iu = ku;
  const Nu = G, Qs = Pt(), { ANY: Ou } = Qs, Tu = ae(), Pu = Lt, Mr = Tt, Ur = hr, Lu = fr, ju = pr, Vu = (e, t, r, s) => {
    e = new Nu(e, s), t = new Tu(t, s);
    let n, i, a, o, l;
    switch (r) {
      case ">":
        n = Mr, i = Lu, a = Ur, o = ">", l = ">=";
        break;
      case "<":
        n = Ur, i = ju, a = Mr, o = "<", l = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (Pu(e, t, s))
      return false;
    for (let u = 0; u < t.set.length; ++u) {
      const d = t.set[u];
      let h = null, b = null;
      if (d.forEach((v) => {
        v.semver === Ou && (v = new Qs(">=0.0.0")), h = h || v, b = b || v, n(v.semver, h.semver, s) ? h = v : a(v.semver, b.semver, s) && (b = v);
      }), h.operator === o || h.operator === l || (!b.operator || b.operator === o) && i(e, b.semver))
        return false;
      if (b.operator === l && a(e, b.semver))
        return false;
    }
    return true;
  };
  var mr = Vu;
  const Zu = mr, qu = (e, t, r) => Zu(e, t, ">", r);
  var Bu = qu;
  const Mu = mr, Uu = (e, t, r) => Mu(e, t, "<", r);
  var Du = Uu;
  const Dr = ae(), Ju = (e, t, r) => (e = new Dr(e, r), t = new Dr(t, r), e.intersects(t, r));
  var Wu = Ju;
  const zu = Lt, Fu = ie;
  var Gu = (e, t, r) => {
    const s = [];
    let n = null, i = null;
    const a = e.sort((d, h) => Fu(d, h, r));
    for (const d of a)
      zu(d, t, r) ? (i = d, n || (n = d)) : (i && s.push([n, i]), i = null, n = null);
    n && s.push([n, null]);
    const o = [];
    for (const [d, h] of s)
      d === h ? o.push(d) : !h && d === a[0] ? o.push("*") : h ? d === a[0] ? o.push(`<=${h}`) : o.push(`${d} - ${h}`) : o.push(`>=${d}`);
    const l = o.join(" || "), u = typeof t.raw == "string" ? t.raw : String(t);
    return l.length < u.length ? l : t;
  };
  const Jr = ae(), gr = Pt(), { ANY: Mt } = gr, Ue = Lt, yr = ie, Xu = (e, t, r = {}) => {
    if (e === t)
      return true;
    e = new Jr(e, r), t = new Jr(t, r);
    let s = false;
    e: for (const n of e.set) {
      for (const i of t.set) {
        const a = Yu(n, i, r);
        if (s = s || a !== null, a)
          continue e;
      }
      if (s)
        return false;
    }
    return true;
  }, Hu = [new gr(">=0.0.0-0")], Wr = [new gr(">=0.0.0")], Yu = (e, t, r) => {
    if (e === t)
      return true;
    if (e.length === 1 && e[0].semver === Mt) {
      if (t.length === 1 && t[0].semver === Mt)
        return true;
      r.includePrerelease ? e = Hu : e = Wr;
    }
    if (t.length === 1 && t[0].semver === Mt) {
      if (r.includePrerelease)
        return true;
      t = Wr;
    }
    const s = /* @__PURE__ */ new Set();
    let n, i;
    for (const v of e)
      v.operator === ">" || v.operator === ">=" ? n = zr(n, v, r) : v.operator === "<" || v.operator === "<=" ? i = Fr(i, v, r) : s.add(v.semver);
    if (s.size > 1)
      return null;
    let a;
    if (n && i) {
      if (a = yr(n.semver, i.semver, r), a > 0)
        return null;
      if (a === 0 && (n.operator !== ">=" || i.operator !== "<="))
        return null;
    }
    for (const v of s) {
      if (n && !Ue(v, String(n), r) || i && !Ue(v, String(i), r))
        return null;
      for (const $ of t)
        if (!Ue(v, String($), r))
          return false;
      return true;
    }
    let o, l, u, d, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : false, b = n && !r.includePrerelease && n.semver.prerelease.length ? n.semver : false;
    h && h.prerelease.length === 1 && i.operator === "<" && h.prerelease[0] === 0 && (h = false);
    for (const v of t) {
      if (d = d || v.operator === ">" || v.operator === ">=", u = u || v.operator === "<" || v.operator === "<=", n) {
        if (b && v.semver.prerelease && v.semver.prerelease.length && v.semver.major === b.major && v.semver.minor === b.minor && v.semver.patch === b.patch && (b = false), v.operator === ">" || v.operator === ">=") {
          if (o = zr(n, v, r), o === v && o !== n)
            return false;
        } else if (n.operator === ">=" && !Ue(n.semver, String(v), r))
          return false;
      }
      if (i) {
        if (h && v.semver.prerelease && v.semver.prerelease.length && v.semver.major === h.major && v.semver.minor === h.minor && v.semver.patch === h.patch && (h = false), v.operator === "<" || v.operator === "<=") {
          if (l = Fr(i, v, r), l === v && l !== i)
            return false;
        } else if (i.operator === "<=" && !Ue(i.semver, String(v), r))
          return false;
      }
      if (!v.operator && (i || n) && a !== 0)
        return false;
    }
    return !(n && u && !i && a !== 0 || i && d && !n && a !== 0 || b || h);
  }, zr = (e, t, r) => {
    if (!e)
      return t;
    const s = yr(e.semver, t.semver, r);
    return s > 0 ? e : s < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
  }, Fr = (e, t, r) => {
    if (!e)
      return t;
    const s = yr(e.semver, t.semver, r);
    return s < 0 ? e : s > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
  };
  var Ku = Xu;
  const Ut = dt, Gr = Nt, Qu = G, Xr = Xs, ed = Be, td = ol, rd = ul, sd = hl, nd = fl, id = yl, ad = bl, od = xl, cd = Rl, ld = ie, ud = Il, dd = Tl, hd = dr, pd = Vl, fd = Bl, md = Tt, gd = hr, yd = Hs, vd = Ys, _d = pr, bd = fr, Ed = Ks, Sd = lu, xd = Pt(), $d = ae(), Ad = Lt, Rd = gu, wd = bu, Cd = $u, kd = wu, Id = Iu, Nd = mr, Od = Bu, Td = Du, Pd = Wu, Ld = Gu, jd = Ku;
  ({
    parse: ed,
    valid: td,
    clean: rd,
    inc: sd,
    diff: nd,
    major: id,
    minor: ad,
    patch: od,
    prerelease: cd,
    compare: ld,
    rcompare: ud,
    compareLoose: dd,
    compareBuild: hd,
    sort: pd,
    rsort: fd,
    gt: md,
    lt: gd,
    eq: yd,
    neq: vd,
    gte: _d,
    lte: bd,
    cmp: Ed,
    coerce: Sd,
    Comparator: xd,
    Range: $d,
    satisfies: Ad,
    toComparators: Rd,
    maxSatisfying: wd,
    minSatisfying: Cd,
    minVersion: kd,
    validRange: Id,
    outside: Nd,
    gtr: Od,
    ltr: Td,
    intersects: Pd,
    simplifyRange: Ld,
    subset: jd,
    SemVer: Qu,
    re: Ut.re,
    src: Ut.src,
    tokens: Ut.t,
    SEMVER_SPEC_VERSION: Gr.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: Gr.RELEASE_TYPES,
    compareIdentifiers: Xr.compareIdentifiers,
    rcompareIdentifiers: Xr.rcompareIdentifiers
  });
  const PageExtractionResultSchema = z$1.object({
    url: z$1.string(),
    html: z$1.string()
  });
  z$1.object({
    registry: Uc,
    tenant: ls
  });
  z$1.union([
    PageExtractionResultSchema,
    Ni
  ]);
  var BrowserMessageType = /* @__PURE__ */ ((BrowserMessageType2) => {
    BrowserMessageType2["PageParsingRequest"] = "PageParsingRequest";
    BrowserMessageType2["IconAnimation"] = "IconAnimation";
    return BrowserMessageType2;
  })(BrowserMessageType || {});
  var IconAnimationCommand = /* @__PURE__ */ ((IconAnimationCommand2) => {
    IconAnimationCommand2["StartIconAnimation"] = "StartIconAnimation";
    IconAnimationCommand2["StopIconAnimation"] = "StopIconAnimation";
    IconAnimationCommand2["UpdateIconAngle"] = "UpdateIconAngle";
    return IconAnimationCommand2;
  })(IconAnimationCommand || {});
  iconAnimator;
  let rotationAngle = 0;
  let animationInterval = void 0;
  const startIconAnimation = () => {
    animationInterval = window.setInterval(() => {
      rotationAngle = (rotationAngle + 15) % 360;
      if (browser.runtime.id === void 0) {
        stopIconAnimation();
        return;
      }
      void sendMessageToBackground(BrowserMessageType.IconAnimation, {
        command: IconAnimationCommand.UpdateIconAngle,
        angle: rotationAngle
      });
    }, 50);
  };
  const stopIconAnimation = () => {
    clearInterval(animationInterval);
    rotationAngle = 0;
    animationInterval = void 0;
    removeMessageListener(iconAnimationMessageHandler);
  };
  const iconAnimationMessageHandler = (message) => {
    if (message.command === IconAnimationCommand.StartIconAnimation) {
      startIconAnimation();
    } else if (message.command === IconAnimationCommand.StopIconAnimation) {
      stopIconAnimation();
    }
  };
  const definition = defineUnlistedScript({
    main() {
      addMessageListener(
        BrowserMessageType.IconAnimation,
        iconAnimationMessageHandler
      );
    }
  });
  iconAnimator;
  function initPlugins() {
  }
  function print(method, ...args) {
    return;
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  const result = (async () => {
    try {
      initPlugins();
      return await definition.main();
    } catch (err) {
      logger.error(
        `The unlisted script "${"icon-animator"}" crashed on startup!`,
        err
      );
      throw err;
    }
  })();
  return result;
}();
iconAnimator;
