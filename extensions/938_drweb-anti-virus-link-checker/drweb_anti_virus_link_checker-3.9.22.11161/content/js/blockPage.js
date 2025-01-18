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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localize = localize;
exports.findElementById = findElementById;
exports.checkIsPageSystem = checkIsPageSystem;

function localize() {
  var nodeForTranslateArray = [];
  var nodesForTranslate = document.querySelectorAll('[data-local]');

  for (var i = 0; i < nodesForTranslate.length; i++) {
    nodeForTranslateArray.push(nodesForTranslate[i]);
  }

  nodeForTranslateArray.forEach(function (element) {
    var localizationText = browser.i18n.getMessage(element.dataset.local);

    if (localizationText) {
      element.innerText = localizationText;
    }
  });
}

function findElementById(id) {
  return window.document.getElementById(id);
}

var systemPageUrls = ['chrome://', 'chrome-extensions://', 'chrome://newtab', 'moz-extension://', 'about:'];

function checkIsPageSystem(pageUrl) {
  return systemPageUrls.some(function (systemPageUrl) {
    return pageUrl.indexOf(systemPageUrl) >= 0;
  });
}

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pageHelpers = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', PageInit);

function PageInit() {
  (0, _pageHelpers.localize)();
  var urlHash = window.location.hash;
  var splitPos = urlHash.indexOf(';');
  var url = urlHash.substring(1 + splitPos);
  var incognitoBtn = document.getElementById('open-btn');
  var linkLabel = document.getElementById('link');
  var blockMessage = document.querySelector('#block_mes');
  var buttonNameTemplate = "\n  <span class=\"lbp_dark\">\n    <span>".concat(browser.i18n.getMessage('block_open_incognito'), "</span>\n  </span>\n  ");
  blockMessage.innerHTML = browser.i18n.getMessage('block_mes').replace('{%buttonName%}', buttonNameTemplate);
  linkLabel.textContent = url;
  incognitoBtn.addEventListener('click', function (_) {
    browser.windows.create({
      url: url,
      incognito: true
    });
  });
}

/***/ })

/******/ });