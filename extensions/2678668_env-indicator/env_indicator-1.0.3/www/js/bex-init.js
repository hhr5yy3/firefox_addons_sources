/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1a7c");


/***/ }),

/***/ "1a7c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/objectSpread2.js
var objectSpread2 = __webpack_require__("ded3");
var objectSpread2_default = /*#__PURE__*/__webpack_require__.n(objectSpread2);

// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__("faa1");

// EXTERNAL MODULE: ./node_modules/quasar/src/utils/uid.js
var uid = __webpack_require__("1732");

// CONCATENATED MODULE: ./.quasar/bex/bridge.js






/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 **/

;

const typeSizes = {
  'undefined': () => 0,
  'boolean': () => 4,
  'number': () => 8,
  'string': item => 2 * item.length,
  'object': item => !item ? 0 : Object.keys(item).reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
},
      sizeOf = value => typeSizes[typeof value](value);

class bridge_Bridge extends events["EventEmitter"] {
  constructor(wall) {
    super();
    this.setMaxListeners(Infinity);
    this.wall = wall;
    wall.listen(messages => {
      if (Array.isArray(messages)) {
        messages.forEach(message => this._emit(message));
      } else {
        this._emit(messages);
      }
    });
    this._sendingQueue = [];
    this._sending = false;
    this._maxMessageSize = 32 * 1024 * 1024; // 32mb
  }
  /**
   * Send an event.
   *
   * @param event
   * @param payload
   * @returns Promise<>
   */


  send(event, payload) {
    return this._send([{
      event,
      payload
    }]);
  }
  /**
   * Return all registered events
   * @returns {*}
   */


  getEvents() {
    return this._events;
  }

  _emit(message) {
    if (typeof message === 'string') {
      this.emit(message);
    } else {
      this.emit(message.event, message.payload);
    }
  }

  _send(messages) {
    this._sendingQueue.push(messages);

    return this._nextSend();
  }

  _nextSend() {
    if (!this._sendingQueue.length || this._sending) return Promise.resolve();
    this._sending = true;

    const messages = this._sendingQueue.shift(),
          currentMessage = messages[0],
          eventListenerKey = `${currentMessage.event}.${Object(uid["a" /* default */])()}`,
          eventResponseKey = eventListenerKey + '.result';

    return new Promise((resolve, reject) => {
      let allChunks = [];

      const fn = r => {
        // If this is a split message then keep listening for the chunks and build a list to resolve
        if (r !== void 0 && r._chunkSplit) {
          const chunkData = r._chunkSplit;
          allChunks = [...allChunks, ...r.data]; // Last chunk received so resolve the promise.

          if (chunkData.lastChunk) {
            this.off(eventResponseKey, fn);
            resolve(allChunks);
          }
        } else {
          this.off(eventResponseKey, fn);
          resolve(r);
        }
      };

      this.on(eventResponseKey, fn);

      try {
        // Add an event response key to the payload we're sending so the message knows which channel to respond on.
        const messagesToSend = messages.map(m => {
          return objectSpread2_default()(objectSpread2_default()({}, m), {
            payload: {
              data: m.payload,
              eventResponseKey
            }
          });
        });
        this.wall.send(messagesToSend);
      } catch (err) {
        const errorMessage = 'Message length exceeded maximum allowed length.';

        if (err.message === errorMessage) {
          // If the payload is an array and too big then split it into chunks and send to the clients bridge
          // the client bridge will then resolve the promise.
          if (!Array.isArray(currentMessage.payload)) {
            if (false) {}
          } else {
            const objectSize = sizeOf(currentMessage);

            if (objectSize > this._maxMessageSize) {
              const chunksRequired = Math.ceil(objectSize / this._maxMessageSize),
                    arrayItemCount = Math.ceil(currentMessage.payload.length / chunksRequired);
              let data = currentMessage.payload;

              for (let i = 0; i < chunksRequired; i++) {
                let take = Math.min(data.length, arrayItemCount);
                this.wall.send([{
                  event: currentMessage.event,
                  payload: {
                    _chunkSplit: {
                      count: chunksRequired,
                      lastChunk: i === chunksRequired - 1
                    },
                    data: data.splice(0, take)
                  }
                }]);
              }
            }
          }
        }
      }

      this._sending = false;
      requestAnimationFrame(() => {
        return this._nextSend();
      });
    });
  }

}
// CONCATENATED MODULE: ./.quasar/bex/init/connect.js
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 **/

/* global chrome */

;
function connect() {
  const buildConnection = (id, cb) => {
    const port = chrome.runtime.connect({
      name: 'app:' + id
    });
    let disconnected = false;
    port.onDisconnect.addListener(() => {
      disconnected = true;
    });
    let bridge = new bridge_Bridge({
      listen(fn) {
        port.onMessage.addListener(fn);
      },

      send(data) {
        if (!disconnected) {
          port.postMessage(data);
        }
      }

    });
    cb(bridge);
  };

  const fallbackConnection = cb => {
    // If we're not in a proper web browser tab, generate an id so we have a unique connection to whatever it is.
    // this could be the popup window or the options window (As they don't have tab ids)
    // If dev tools is available, it means we're on it. Use that for the id.
    const tabId = chrome.devtools ? chrome.devtools.inspectedWindow.tabId : Object(uid["a" /* default */])();
    buildConnection(tabId, cb);
  };

  window.QBexInit({
    connect(cb) {
      if (chrome.tabs && !chrome.devtools) {
        // If we're on a web browser tab, use the current tab id to connect to the app.
        chrome.tabs.getCurrent(tab => {
          if (tab && tab.id) {
            buildConnection(tab.id, cb);
          } else {
            fallbackConnection(cb);
          }
        });
      } else {
        fallbackConnection(cb);
      }
    },

    onReload(reloadFn) {
      window.addEventListener('beforeunload', reloadFn);
    }

  });
}
// CONCATENATED MODULE: ./.quasar/bex/init/index.js
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 **/

/* global chrome */


if (chrome.runtime.id) {
  // Chrome ~73 introduced a change which requires the background connection to be
  // active before the client this makes sure the connection has had time before progressing.
  // Could also implement a ping pattern and connect when a valid response is received
  // but this way seems less overhead.
  setTimeout(() => {
    connect();
  }, 300);
}

/***/ })

/******/ });