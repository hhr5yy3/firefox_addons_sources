/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP: () => (/* binding */ APP),
/* harmony export */   DELAY_BETWEEN_RETRIES: () => (/* binding */ DELAY_BETWEEN_RETRIES),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   defaultSettings: () => (/* binding */ defaultSettings)
/* harmony export */ });
// Constants.js
var pkg = __webpack_require__(11),
  osFileManagerName = (__webpack_require__(12).getFileManagerDisplayName);
var APP = {
  name: pkg.name,
  title: pkg.title,
  version: pkg.version
};
var MESSAGES = {
  FILEMANAGER: osFileManagerName(),
  USERMESSAGES: {
    tooltips: {
      openFolder: browser.i18n.getMessage('TOOLTIP_OPEN_FOLDER'),
      //'Open folder', // _('TOOLTIP_OPEN_FOLDER'),
      linkText: browser.i18n.getMessage('TOOLTIP_OPEN_LINK') //'Open link' // _('TOOLTIP_OPEN_LINK')
    }
  }
};

var defaultSettings = {
  whitelist: '*',
  enableExecutables: false,
  revealOpenOption: 'O',
  // default = open link
  enableLinkIcons: true,
  retriesOnFailure: 1 // default = one retry, error indication delayed by one retry is OK
};

var DELAY_BETWEEN_RETRIES = 100; // ms delay between retries

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = JSON.parse('{"title":"Local Filesystem Links","name":"alien-local-filesystem-links","version":"0.101.0","description":"Scans pages for file:/// links and makes it possible to open them with the system\'s file browser.","main":"index.js","author":"austrALIENsun","scripts":{"start":"npm run dev","start:web-ext":"wait-on dist/ && web-ext run -s dist/","start:web-ext_profile":"wait-on dist/ && web-ext run -s dist/ -p \\"firefox_addon\\" --keep-profile-changes","web-ext":"web-ext run -s dist/","bundle":"web-ext build -s dist/ --overwrite-dest","sign":"sh ./sign-bundle.sh","clean":"rimraf dist","dev":"npm-run-all clean --parallel watch start:web-ext","watch":"webpack-cli --watch","prebuild":"npm run clean","build":"cross-env NODE_ENV=production webpack-cli --progress","lint":"eslint ./src/**/*.js","lint:web-ext":"web-ext lint","pretty":"prettier ./src/**/*.js --write"},"husky":{"hooks":{"pre-commit":"pretty-quick --staged"}},"lint-staged":{"*.js":["npm run lint","git add"]},"engines":{"firefox":">=38.0a1","fennec":">=38.0a1"},"license":"MPL 1.1/GPL 3.0","id":"jid1-JAzC7z53jemo5Q@jetpack","permissions":{"multiprocess":true},"dependencies":{"lodash.debounce":"^4.0.8","match-pattern":"0.0.2","vue":"^2.5.16","webextension-polyfill":"^0.2.1"},"devDependencies":{"@babel/core":"^7.21.8","@babel/preset-env":"^7.21.5","ajv":"^8.6.0","babel-eslint":"^9.0.0","babel-loader":"^8.0.0-beta.6","babel-preset-env":"^1.7.0","copy-webpack-plugin":"^11.0.0","cross-env":"^5.1.5","css-loader":"^3.1.0","eslint":"^8.41.0","eslint-config-prettier":"^6.0.0","eslint-plugin-prettier":"^3.1.0","file-loader":"^1.1.11","friendly-errors-webpack-plugin":"^1.7.0","html-webpack-plugin":"^5.5.1","husky":"^3.0.2","node-process":"^1.0.1","npm-run-all":"^4.1.5","prettier":"^1.16.4","pretty-quick":"^1.11.1","request":"^2.88.2","rimraf":"^2.6.2","style-loader":"^0.21.0","vue-template-compiler":"^2.5.16","vue-template-loader":"^1.1.0","wait-on":"^7.0.1","web-ext":"^7.6.2","webpack":"^5.84.1","webpack-cli":"^5.1.1","write-file-webpack-plugin":"^4.3.2"}}');

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {

/*
 * License: www.mozilla.org/MPL/
 * Created by https://github.com/feinstaub/firefox_addon_local_filesystem_links
 */


// var {Cc, Ci} = chrome; //require('chrome');
var getOsStringTag = function getOsStringTag() {
  // https://developer.mozilla.org/en/nsIXULRuntime
  // var xulRuntime = Cc['@mozilla.org/xre/app-info;1'].
  //     getService(Ci.nsIXULRuntime);

  // see https://developer.mozilla.org/en/OS_TARGET
  return browser.runtime.getPlatformInfo(function (info) {
    // Display host OS in the console
    // console.log(info.os);
    return info.os;
  }); // xulRuntime.OS;
};

var retrieveIsWindowsOs = function retrieveIsWindowsOs() {
  var osStringTag = getOsStringTag();
  return osStringTag === 'win';
};
var constIsWindowsOs = retrieveIsWindowsOs();
var isWindowsOs = function isWindowsOs() {
  // console.log('isWindowsOs', constIsWindowsOs);
  return constIsWindowsOs;
};
exports.isWindowsOs = isWindowsOs;
exports.getFileManagerDisplayName = function () {
  if (isWindowsOs()) {
    return 'Windows Explorer';
  } else {
    return 'default file manager';
  }
};

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showInstallationTab: () => (/* binding */ showInstallationTab)
/* harmony export */ });
/* harmony import */ var _notify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


/** Show installation guid tab
 * @returns {undefined}
 */
function showInstallationTab() {
  var query = browser.tabs.query({
    currentWindow: true,
    url: 'moz-extension://*/installed.html'
  });
  query.then(function (tabs) {
    if (tabs.length > 0) {
      browser.tabs.update(tabs[0].id, {
        active: true
      });
    } else {
      browser.tabs.create({
        active: true,
        url: '/installed.html'
      });
    }
  });
}
/** Check if this is the first run of the extension & show install guide
 * @param {object} details info to the current installation reason
 * @returns {undefined}
 */
function checkInstallation(details) {
  // notify('in func', 'installed');
  if (details.reason == 'install') {
    // console.log('This is a first install!');
    // show installation guide
    // notify('test', 'first install');
    showInstallationTab();
  } else if (details.reason == 'update') {
    // nothing special todo here at the moment.
    var thisVersion = browser.runtime.getManifest().version;

    // notify('version', thisVersion);
    // console.log('Updated from ' + details.previousVersion + ' to ' +
    //   thisVersion + '!');
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkInstallation);

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var notifyCount = 0;
var CAKE_INTERVAL = 0.1;
var cakeNotification = 'webextension-local-filesystem-links-notification';
function notify(title, message) {
  notifyCount++;
  var id = "".concat(cakeNotification, "-").concat(notifyCount);

  // console.log('notify', id, browser.notifications);
  browser.notifications.create(id, {
    type: 'basic',
    iconUrl: browser.extension.getURL('img/active_icon_64.png'),
    title: title || browser.runtime.getManifest().name,
    message: message
  }).then(function () {
    // console.log('cake created', arguments);
    setTimeout(function () {
      // console.log('cake cleared');
      browser.notifications.clear(id);
    }, 2000);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notify);

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateAddonbarIcon: () => (/* binding */ updateAddonbarIcon)
/* harmony export */ });
/** Updates the addonbar icon (active/inactive)
 * @param {boolean} status True, extension active for current tab else inactive
 * @returns {undefined}
 */
function updateAddonbarIcon(status) {
  var filePrefix = status ? 'active' : 'inactive';
  var i18nKey = 'LABEL_ADDONBAR_HOVER_STATE_' + filePrefix;
  var statusText = browser.i18n.getMessage(i18nKey);

  // update title
  browser.browserAction.setTitle({
    title: browser.i18n.getMessage('LABEL_ADDONBAR_ICON_HOVER', statusText)
  });

  // update icon
  browser.browserAction.setIcon({
    path: {
      '16': 'img/' + filePrefix + '_icon_16.png',
      '32': 'img/' + filePrefix + '_icon_32.png'
    }
  });
}

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExtensionEventHandlers: () => (/* binding */ ExtensionEventHandlers)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _checkInstallation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _notify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _helpers_whitelist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var defaultSettings = _constants__WEBPACK_IMPORTED_MODULE_0__.defaultSettings,
  DELAY_BETWEEN_RETRIES = _constants__WEBPACK_IMPORTED_MODULE_0__.DELAY_BETWEEN_RETRIES;

/** Event handler methods of the extension */
var ExtensionEventHandlers = /*#__PURE__*/function () {
  /** Initialize EventHandler
   * @param {object} settings reference to app settings.
   */
  function ExtensionEventHandlers(settings) {
    _classCallCheck(this, ExtensionEventHandlers);
    this.settings = settings;
    this.retriesOnFailure = 0;
  }

  /** Global Error handler
   *  @param {object} err error object
   *  @returns {undefined}
   */
  _createClass(ExtensionEventHandlers, [{
    key: "onMessage",
    value:
    /**
     * Handler for content script messages
     * @param {object} request information about the request (e.g. action)
     * @param {object} sender sender info
     * @param {callback} sendResponse sends response to content script.
     * @returns {undefined}
     */
    function onMessage(request, sender, sendResponse) {
      switch (request.action) {
        case 'showInstallInfoTab':
          (0,_checkInstallation__WEBPACK_IMPORTED_MODULE_1__.showInstallationTab)();
          break;
        case 'open':
          var uri = request.url;
          console.log('opening', uri);
          if (request.directOpen) {
            // setting commented at the moment --> re-add later
            browser.tabs.create({
              active: true,
              url: window.decodeURI(uri) // illegal URL --> not priveleged to add file:// - fix later
            });
          } else {
            this.retriesOnFailure = 0; // reset failure count
            ExtensionEventHandlers.sendNativeMessage(request, uri, this);
          }
          break;
        default:
      }
    }

    /** Handler for app settingss loaded
     * @param {object} settings reference to settings of extension
     * @param {function} callback do somehing with the loaded settings
     * @returns {undefined}
     */
  }, {
    key: "onSettingsLoaded",
    value: function onSettingsLoaded(settings, callback) {
      var loadedSettings = Object.assign({}, defaultSettings, settings);
      var whitelist = loadedSettings.whitelist.trim() ? (0,_helpers_whitelist__WEBPACK_IMPORTED_MODULE_3__.prepareWhitelist)(loadedSettings.whitelist.trim()) : [];
      // const whitelist = ['*']; //['http://127.0.0.1:3000/*', '*://*.localhost/*', '*://*.google.de/*', '*://*.trello.com/*'];

      callback(loadedSettings, whitelist);
    }
  }], [{
    key: "onError",
    value: function onError(err) {
      // console.log('error handler:', err.name, err.message, err.stack,
      // err.lineNumber); // todo - check that really the connection to the native app isn't open
      var nativeAppNotInstalled = err.message.includes('disconnected port') ? ' Please check that you have installed the native app. ' + 'See installation guide in addon-bar ' + 'menu.' : '';

      // console.log('error', err);
      (0,_notify__WEBPACK_IMPORTED_MODULE_2__["default"])(err.name, err.message + '.' + nativeAppNotInstalled);
    }

    /**
     * Send native message with retries
     * @param {object} request
     * @param {string} uri
     */
  }, {
    key: "sendNativeMessage",
    value: function sendNativeMessage(request, uri, handler) {
      browser.runtime.sendNativeMessage(
      // direct sending --> opens port to native app
      'webextension_local_filesystem_links', {
        url: uri,
        reveal: request.reveal,
        exeAllowed: handler.settings.enableExecutables
      }).then(function (response) {
        // console.log('received response', response);
        if (response && response.error) {
          if (handler.retriesOnFailure >= handler.settings.retriesOnFailure) {
            var msg = browser.i18n.getMessage(response.error, window.decodeURI(response.url));
            (0,_notify__WEBPACK_IMPORTED_MODULE_2__["default"])('Error', msg); // only NotFound error at the moment
          } else {
            setTimeout(function () {
              ExtensionEventHandlers.sendNativeMessage(request, uri, handler);
              handler.retriesOnFailure++;
            }, DELAY_BETWEEN_RETRIES);
          }
        }
      })["catch"](function (err) {
        var nativeAppNotInstalled = err.message.includes('disconnected port') ? ' Please check that you have installed ' + 'the native app. ' + 'See installation guide in addon-bar ' + 'menu.' : '';

        // console.log('error', err);
        (0,_notify__WEBPACK_IMPORTED_MODULE_2__["default"])(err.name, err.message + '.' + nativeAppNotInstalled);
      }); //ExtensionEventHandlers.onError(err));
    }
  }]);
  return ExtensionEventHandlers;
}();

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prepareWhitelist: () => (/* binding */ prepareWhitelist)
/* harmony export */ });
var prepareWhitelist = function prepareWhitelist(whitelist) {
  return whitelist && whitelist.split(' ') // spacing char --> later add , and ;
  .map(function (url) {
    // remap * to all urls
    return url === '*' ? '<all_urls>' : url;
  });
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _checkInstallation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _addonbarIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _EventHandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





/** Main background script class of the extension */
var LocalFileSystemExtension = /*#__PURE__*/function () {
  /** Initialize the extension
   */
  function LocalFileSystemExtension() {
    var _this = this;
    _classCallCheck(this, LocalFileSystemExtension);
    this.settings = {};
    this.injectedTabs = {};
    this.eventHandlers = new _EventHandlers__WEBPACK_IMPORTED_MODULE_3__.ExtensionEventHandlers(this.settings);
    this.addListeners();
    browser.storage.local.get('injectedTabs').then(function (_ref) {
      var injectedTabs = _ref.injectedTabs;
      // console.log("loaded tabs from local storage", injectedTabs);
      _this.injectedTabs = injectedTabs || {};
    });
  }

  /** Add eventlisteners of the extension
   * @returns {undefined}
   */
  _createClass(LocalFileSystemExtension, [{
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;
      // add message handling
      browser.runtime.onMessage.addListener(this.eventHandlers.onMessage.bind(this));
      var checkPage = function checkPage() {
        (0,_addonbarIcon__WEBPACK_IMPORTED_MODULE_2__.updateAddonbarIcon)(false); // always toggle to inactive
        _this2.checkUrls();
      };
      browser.windows.onCreated.addListener(checkPage); // initial load of firefox
      browser.tabs.onActivated.addListener(checkPage); // switched between tabs
      browser.windows.onFocusChanged.addListener(checkPage); // switched from other window

      browser.tabs.onRemoved.addListener(function (tabId, removeInfo) {
        //console.log('remove', tabId, removeInfo);
        _this2.removeTabFromInjectedTabs(tabId);
      });
      var updateHandler = function updateHandler(tabId, changeInfo, tab) {
        if (tab.active) {
          if (changeInfo.status && changeInfo.status === 'loading') {
            // console.log('loading', tabId, tab.active);
            _this2.removeTabFromInjectedTabs(tabId); // url changed and loading a new page - remove tabId as we need to inject the content script
          }

          // console.log('change info: ', changeInfo);
          // console.log(this.injectedTabs);

          if (changeInfo.status && changeInfo.status === 'complete') {
            // check if content script is not connected
            browser.tabs.sendMessage(tabId, {
              action: 'ping'
            })["catch"](function (e) {
              // console.log(e);
              // console.log('no content script');
              _this2.removeTabFromInjectedTabs(tabId);
            })["finally"](function () {
              // check if we have to load the extension for the active tab
              // -> always runs as last action
              // console.log('check urls in complete');
              _this2.checkUrls();
            });
          }
        }
      };
      browser.tabs.onUpdated.addListener(updateHandler);
      var browserHistoryHandler = function browserHistoryHandler(details) {
        if (details.transitionQualifiers.includes('forward_back')) {
          // console.log("using cached page");
          _this2.injectedTabs[details.tabId] = true; // Add tabId to keep track of cached injection.
          browser.storage.local.set({
            injectedTabs: _this2.injectedTabs
          });
        }
      };
      browser.webNavigation.onCommitted.addListener(browserHistoryHandler);

      // check if first installation or update
      browser.runtime.onInstalled.addListener(_checkInstallation__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    /**
     * Remove tab from injectedTabs array (if exists)
     * @param {integer} windowId id of current window
     * @param {integer} tabId id of tab to remove
     */
  }, {
    key: "removeTabFromInjectedTabs",
    value: function removeTabFromInjectedTabs(id) {
      if (this.injectedTabs[id]) {
        // console.log('remove id', id);
        delete this.injectedTabs[id];
        browser.storage.local.set({
          injectedTabs: this.injectedTabs
        });
      }
    }
    /** Check the urls (if active tab is whitelisted)
     * @returns {undefined}
     */
  }, {
    key: "checkUrls",
    value: function checkUrls() {
      var _this3 = this;
      // load settings from local storage
      browser.storage.local.get().then(function (settings) {
        return _this3.eventHandlers.onSettingsLoaded(settings, _this3.loadExtension.bind(_this3));
      });
    }

    /** Insert CSS into page
     * @returns {undefined}
     */
  }, {
    key: "injectCSS",
    value: function injectCSS() {
      browser.tabs.insertCSS(null, {
        allFrames: true,
        file: 'css/self-hosted-materialize.css'
      });
      browser.tabs.insertCSS(null, {
        allFrames: true,
        file: 'css/style.css'
      });
    }

    /** Insert JavaScript into page
     * @param {object} activeTab the currently active tab
     * @returns {undefined}
     */
  }, {
    key: "injectScripts",
    value: function injectScripts(activeTab) {
      var _this4 = this;
      // inject scripts
      // --> defaults to activetab
      var execute = browser.tabs.executeScript; // short-hand

      execute(null, {
        allFrames: true,
        file: 'js/jquery-3.3.1.min.js'
      }).then(function () {
        return execute(null, {
          allFrames: true,
          file: './content.js',
          runAt: 'document_end'
        });
      }).then(function () {
        // jquery & content script loaded --> now we can send init data
        var settings = _this4.settings;
        // console.log("sending init to content script!!");
        browser.tabs.sendMessage(activeTab.id, {
          action: 'init',
          data: {
            options: {
              enableLinkIcons: settings.enableLinkIcons,
              revealOpenOption: settings.revealOpenOption
            },
            constants: JSON.parse(JSON.stringify(_constants__WEBPACK_IMPORTED_MODULE_0__)) // Parse / stringify needed in FF 54 --> otherwise constants.MESSAGES were undefined
          }
        });
      });
    }

    /** Load the extension if query matches whitelist
     * @param {object} settings loaded app settings
     * @param {array} whitelist contains urls that are whitelisted
     * @returns {undefined}
     */
  }, {
    key: "loadExtension",
    value: function loadExtension(settings, whitelist) {
      var _this5 = this;
      var excludeFileExtensions = ['.xml'];

      // set settings
      this.settings = settings;
      var queryCallback = function queryCallback(tabs) {
        if (!tabs) {
          return; // no match
        }

        var activeTab = tabs.filter(function (tab) {
          return tab.active;
        })[0];
        if (!activeTab) {
          // console.log('no active tab');
          // needed if tab is newly removed from the whitelist --> stop active content script
          // --> removed below as it was causing an issue with multiple events. Removing means a whitelist change requires a page reload. Acceptable behaviour.
          // Note: Also an unfocused window will also trigger this case
          return; // no tab active --> e.g. about:addons
        }

        if (excludeFileExtensions.some(function (val) {
          return activeTab.url.indexOf(val) !== -1;
        })) {
          // don't enhance xml files = don't affect xml viewer
          // array so it's easily possible to add more excludes
          return;
        }

        // show enhancement at addon bar icon
        (0,_addonbarIcon__WEBPACK_IMPORTED_MODULE_2__.updateAddonbarIcon)(true);

        // console.log("check injected tabs", this.injectedTabs, activeTab.id)
        if (!_this5.injectedTabs[activeTab.id]) {
          // add scripts & css to the page (only once per tab)
          // console.log('inject', activeTab.id);
          _this5.injectCSS();
          _this5.injectScripts(activeTab);
          _this5.injectedTabs[activeTab.id] = true; // add id to keep track of injection.
          browser.storage.local.set({
            injectedTabs: _this5.injectedTabs
          });
        }
      };

      // execute query
      browser.tabs.query({
        active: true,
        lastFocusedWindow: true,
        url: whitelist
      }).then(function (tabs) {
        return queryCallback(tabs);
      })["catch"](_EventHandlers__WEBPACK_IMPORTED_MODULE_3__.ExtensionEventHandlers.onError);
    }
  }]);
  return LocalFileSystemExtension;
}(); // start extension's background script
var extension = new LocalFileSystemExtension();
})();

/******/ })()
;
//# sourceMappingURL=background.js.map