/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var isBrowser = typeof window['browser'] !== 'undefined' && window['browser'] !== null; //don't use it in background script

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [{
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return sendMessage(args, _constants_js__WEBPACK_IMPORTED_MODULE_0__[/* MSG */ "b"].logg_log);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return sendMessage(args, _constants_js__WEBPACK_IMPORTED_MODULE_0__[/* MSG */ "b"].logg_warn);
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return sendMessage(args, _constants_js__WEBPACK_IMPORTED_MODULE_0__[/* MSG */ "b"].logg_error);
    }
  }]);

  return Logger;
}();

function sendMessage(msg, type) {
  return new Promise(function (resolve) {
    if (isBrowser) {
      browser.runtime.sendMessage({
        type: type,
        data: msg
      }).then(resolve, resolve);
    } else {
      chrome.runtime.sendMessage({
        type: type,
        data: msg
      }, resolve);
    }
  });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KEYs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MSG; });
var KEYs = {
  rtcDis: 'rtc-disabled',
  rtcPolicy: 'rtc-policy',
  installed: 'first-load',
  icon: 'action-icon'
};
var MSG = {
  logg_log: 'logg-log',
  logg_warn: 'logg-warn',
  logg_error: 'logg-error'
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return runtime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return i18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return network; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return browserAction; });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var isBrowser = typeof window['browser'] !== 'undefined' && window['browser'] !== null;
var storage = {
  get: function get(key) {
    return new Promise(function (resolve, reject) {
      if (key) {
        if (isBrowser) {
          browser.storage.local.get(key).then(function (res) {
            resolve(res[key]);
          }, function (err) {
            _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.get', err).then(reject);
          });
        } else {
          chrome.storage.local.get([key], function (data) {
            if (chrome.runtime.lastError) {
              _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.get', chrome.runtime.lastError).then(reject);
            } else {
              resolve(data[key]);
            }
          });
        }
      } else {
        _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.get', 'key required').then(reject);
      }
    });
  },
  getMulti: function getMulti(keys) {
    return new Promise(function (resolve, reject) {
      if (keys) {
        if (isBrowser) {
          browser.storage.local.get(keys).then(function (data) {
            if (data && Object.keys(data).length > 0) resolve(data);else resolve(null);
          }, function (err) {
            _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.getMulti', err).then(reject);
          });
        } else {
          chrome.storage.local.get(keys, function (data) {
            if (chrome.runtime.lastError) {
              _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.getMulti', chrome.runtime.lastError).then(reject);
            } else {
              if (data && Object.keys(data).length > 0) resolve(data);else resolve(null);
            }
          });
        }
      } else {
        _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.getMulti', 'keys required').then(reject);
      }
    });
  },
  set: function set(key, data) {
    return new Promise(function (resolve, reject) {
      if (key) {
        if (isBrowser) {
          browser.storage.local.set(_defineProperty({}, key, data)).then(resolve, function (err) {
            _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.set', err).then(reject);
          });
        } else {
          chrome.storage.local.set(_defineProperty({}, key, data), function () {
            if (chrome.runtime.lastError) {
              _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.set', chrome.runtime.lastError).then(reject);
            } else resolve();
          });
        }
      } else {
        _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.set', 'key required').then(reject);
      }
    });
  },
  setMulti: function setMulti(objects) {
    return new Promise(function (resolve, reject) {
      if (objects) {
        var setObj = {};
        objects.forEach(function (kv) {
          setObj[kv.key] = kv.value;
        });

        if (isBrowser) {
          browser.storage.local.set(setObj).then(resolve, function (err) {
            _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.setMulti', err).then(reject);
          });
        } else {
          chrome.storage.local.set(setObj, function () {
            if (chrome.runtime.lastError) {
              _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.setMulti', chrome.runtime.lastError).then(reject);
            } else resolve();
          });
        }
      } else {
        _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('storage.setMulti', 'objects required').then(reject);
      }
    });
  }
};
var runtime = {
  onMessage: function onMessage(callback) {
    if (isBrowser) browser.runtime.onMessage.addListener(callback);else chrome.runtime.onMessage.addListener(callback);
  },
  sendMessage: function sendMessage(message) {
    if (message) {
      return new Promise(function (resolve) {
        if (isBrowser) {
          browser.runtime.sendMessage(message).then(resolve, function (err) {
            _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('runtime.sendMessage', err).then(resolve);
          });
        } else {
          chrome.runtime.sendMessage(message, function (res) {
            if (chrome.runtime.lastError) _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('runtime.sendMessage', chrome.runtime.lastError).then(resolve);else resolve();
          });
        }
      });
    } else {
      return _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('runtime.sendMessage', 'message required');
    }
  },
  version: isBrowser ? browser.runtime.getManifest().version : chrome.runtime.getManifest().version,
  setUninstallURL: function setUninstallURL(url) {
    if (url) {
      if (isBrowser) {
        browser.runtime.setUninstallURL(url).then(function () {}, function (err) {
          _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('runtime.setUninstallURL', err);
        });
      } else {
        chrome.runtime.setUninstallURL(url, function () {
          if (chrome.runtime.lastError) _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('runtime.setUninstallURL', chrome.runtime.lastError);
        });
      }
    } else {
      _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('runtime.setUninstallURL', 'message required');
    }
  },
  lastError: isBrowser ? browser.runtime.lastError : chrome.runtime.lastError
};
var i18n = {
  getMessage: function getMessage(key) {
    if (key) {
      if (isBrowser) return browser.i18n.getMessage(key);else return chrome.i18n.getMessage(key);
    } else {
      _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('i18n.getMessage', 'key required');
      return '';
    }
  }
};
var network = {
  webRTC: {
    get: function get() {
      return new Promise(function (resolve) {
        if (isBrowser) {
          browser.privacy.network.webRTCIPHandlingPolicy.get({}).then(function (details) {
            return resolve(details.value);
          }, function (err) {
            _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('network.webRTC.get', err).then(resolve);
          });
        } else {
          chrome.privacy.network.webRTCIPHandlingPolicy.get({}, function (details) {
            if (chrome.runtime.lastError) _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('network.webRTC.get', chrome.runtime.lastError).then(resolve);else resolve(details.value);
          });
        }
      });
    },
    set: function set(policy) {
      return new Promise(function (resolve) {
        if (isBrowser) {
          browser.privacy.network.webRTCIPHandlingPolicy.set({
            value: policy
          }).then(resolve, function (err) {
            _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('network.webRTC.set', err).then(resolve);
          });
        } else {
          chrome.privacy.network.webRTCIPHandlingPolicy.set({
            value: policy
          }, function () {
            if (chrome.runtime.lastError) _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('network.webRTC.set', chrome.runtime.lastError).then(resolve);else resolve();
          });
        }
      });
    }
  }
};
var browserAction = {
  setIcon: function setIcon(url) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (url) {
      if (isBrowser) browser.browserAction.setIcon({
        path: url
      }, callback);else chrome.browserAction.setIcon({
        path: url
      }, callback);
    } else {
      _logger_js__WEBPACK_IMPORTED_MODULE_0__[/* Logger */ "a"].error('browserAction.setIcon', 'url required').then(callback);
    }
  }
};

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _util_browser_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


 //runtime.setUninstallURL('');

_util_browser_api_js__WEBPACK_IMPORTED_MODULE_1__[/* storage */ "e"].getMulti([_util_constants_js__WEBPACK_IMPORTED_MODULE_0__[/* KEYs */ "a"].icon, _util_constants_js__WEBPACK_IMPORTED_MODULE_0__[/* KEYs */ "a"].installed]).then(function (k_v) {
  if (!k_v) k_v = {};
  var icon = k_v[_util_constants_js__WEBPACK_IMPORTED_MODULE_0__[/* KEYs */ "a"].icon];

  if (!k_v[_util_constants_js__WEBPACK_IMPORTED_MODULE_0__[/* KEYs */ "a"].installed]) {
    _util_browser_api_js__WEBPACK_IMPORTED_MODULE_1__[/* storage */ "e"].set(_util_constants_js__WEBPACK_IMPORTED_MODULE_0__[/* KEYs */ "a"].installed, true);
    _util_browser_api_js__WEBPACK_IMPORTED_MODULE_1__[/* storage */ "e"].set(_util_constants_js__WEBPACK_IMPORTED_MODULE_0__[/* KEYs */ "a"].rtcDis, true);
    _util_browser_api_js__WEBPACK_IMPORTED_MODULE_1__[/* browserAction */ "a"].setIcon('/img/icon/16-r.png');
  }

  if (icon) _util_browser_api_js__WEBPACK_IMPORTED_MODULE_1__[/* browserAction */ "a"].setIcon(icon);
});
_util_browser_api_js__WEBPACK_IMPORTED_MODULE_1__[/* runtime */ "d"].onMessage(function (req, sender, send) {
  if (req.type === _util_constants_js__WEBPACK_IMPORTED_MODULE_0__[/* MSG */ "b"].logg_error) {
    console.log(req);
  }

  send();
});

/***/ })
/******/ ]);