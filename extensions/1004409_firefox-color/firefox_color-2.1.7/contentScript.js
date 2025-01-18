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
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANNEL_NAME; });
/* unused harmony export DOWNLOAD_FIREFOX_URL */
/* unused harmony export CUSTOM_BACKGROUND_MAXIMUM_LENGTH */
/* unused harmony export CUSTOM_BACKGROUND_MAXIMUM_SIZE */
/* unused harmony export CUSTOM_BACKGROUND_ALLOWED_TYPES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CUSTOM_BACKGROUND_DEFAULT_ALIGNMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return colorLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return advancedColorLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return fallbackColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return colorsWithoutAlpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return alphaEqualityTolerance; });
/* unused harmony export ESC */
/* unused harmony export loaderQuotes */
var CHANNEL_NAME = "FirefoxColor";
var DOWNLOAD_FIREFOX_URL = "https://www.mozilla.org/firefox/new/?utm_campaign=firefoxcolor-acquisition&utm_medium=referral&utm_source=".concat("color.firefox.com");
var CUSTOM_BACKGROUND_MAXIMUM_LENGTH = 3;
var CUSTOM_BACKGROUND_MAXIMUM_SIZE = 1000000; // Note: SVGs cannot be passed as base64.
// Bugzilla bug passed here https://bugzilla.mozilla.org/show_bug.cgi?id=1491790
// gifs also seem to break the background

var CUSTOM_BACKGROUND_ALLOWED_TYPES = ["image/jpeg", "image/png" // "image/gif",
// "image/bmp"
// "image/svg+xml"
];
var CUSTOM_BACKGROUND_DEFAULT_ALIGNMENT = "right top";
var colorLabels = {
  toolbar: "Toolbar Color",
  toolbar_text: "Toolbar Icons and Text",
  frame: "Background Color",
  tab_background_text: "Background Tab Text Color",
  toolbar_field: "Search Bar Color",
  toolbar_field_text: "Search Text",
  tab_line: "Tab Highlight Color",
  popup: "Popup Background",
  popup_text: "Popup Text"
};
var advancedColorLabels = {
  button_background_active: "Button Background Active",
  button_background_hover: "Button Background Hover",
  frame_inactive: "Frame Inactive",
  icons_attention: "Icons Attention",
  icons: "Icons",
  ntp_background: "New Tab Background Color",
  ntp_text: "New Tab Text",
  popup_border: "Popup Border",
  popup_highlight_text: "Popup Highlight Text",
  popup_highlight: "Popup Highlight",
  sidebar_border: "Sidebar Border",
  sidebar_highlight_text: "Sidebar Highlight Text",
  sidebar_highlight: "Sidebar Highlight",
  sidebar_text: "Sidebar Text",
  sidebar: "Sidebar",
  tab_background_separator: "Tab Background Separator",
  tab_loading: "Tab Loading",
  tab_selected: "Tab Selected",
  tab_text: "Tab Text",
  toolbar_bottom_separator: "Toolbar Bottom Separator",
  toolbar_field_border_focus: "Toolbar Field Border Focus",
  toolbar_field_border: "Toolbar Field Border",
  toolbar_field_focus: "Toolbar Field Focus",
  toolbar_field_highlight_text: "Toolbar Field Highlight Text",
  toolbar_field_highlight: "Toolbar Field Highlight",
  toolbar_field_separator: "Toolbar Field Separator",
  toolbar_field_text_focus: "Toolbar Field Text Focus",
  toolbar_top_separator: "Toolbar Top Separator",
  toolbar_vertical_separator: "Toolbar Vertical Separator"
};
var fallbackColors = {
  frame: "accentcolor",
  // "popup" falls back to "frame" if "popup" is void.
  // If "frame" is somehow void, then "toolbar" is used instead.
  // This is for no particular reason, besides backwards-compatibility.
  // Similarly for "popup_text".
  popup: ["frame", "toolbar"],
  popup_text: ["toolbar_text", "tab_background_text", "textcolor"],
  tab_background_text: "textcolor"
};
var colorsWithoutAlpha = ["tab_background_text", "frame", "sidebar"];
var alphaEqualityTolerance = 0.02;
var ESC = 27;
var loaderQuotes = [{
  quote: "Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.",
  attribution: "Oscar Wilde"
}, {
  quote: "The purest and most thoughtful minds are those which love color the most.",
  attribution: "John Ruskin"
}, {
  quote: "I found I could say things with color and shapes that I couldn't say any other way — things I had no words for.",
  attribution: "Georgia O'Keeffe"
}, {
  quote: "Colours and colours and colours of colours",
  attribution: "Hot Chip"
}];

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // Relay backend port messages to content

var port;

function connect() {
  port = browser.runtime.connect({
    name: _lib_constants__WEBPACK_IMPORTED_MODULE_0__[/* CHANNEL_NAME */ "a"]
  });
  port.onDisconnect.addListener(function () {
    port = null;
    reconnect();
  });
  port.onMessage.addListener(function (message) {
    window.postMessage(_objectSpread({}, message, {
      channel: "".concat(_lib_constants__WEBPACK_IMPORTED_MODULE_0__[/* CHANNEL_NAME */ "a"], "-web")
    }), "*");
  });
} // HACK: try reconnecting when reloaded from about:debugging


function reconnect() {
  setTimeout(function () {
    if (port) {
      return;
    }

    connect();
    reconnect();
  }, 1000);
} // Relay content messages to backend port if the channel name matches
// (Not a security feature so much as a noise filter)


window.addEventListener("message", function (event) {
  if (port && event.source === window && event.data && event.data.channel === "".concat(_lib_constants__WEBPACK_IMPORTED_MODULE_0__[/* CHANNEL_NAME */ "a"], "-extension")) {
    port.postMessage(_objectSpread({}, event.data, {
      location: window.location.href
    }));
  }
});
connect();

/***/ })

/******/ });
//# sourceMappingURL=contentScript.js.map