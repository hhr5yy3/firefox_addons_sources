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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background-for-requests.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background-for-requests.js":
/*!****************************************!*\
  !*** ./src/background-for-requests.js ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable flowtype/no-types-missing-file-annotation */
// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  ;

  (async () => {
    const {
      repoUrl,
      token
    } = request;
    let url;

    if (request.name === 'getRepo') {
      url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}`;
    } else if (request.name === 'getBranches') {
      url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/refs/branches`;
    } else if (request.name === 'getPullrequests') {
      url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests`;
    } else if (request.name === 'getPullrequest') {
      const {
        id
      } = request;
      url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}`;
    } else if (request.name === 'getPullrequestActivity') {
      const {
        id
      } = request;
      url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/activity?pagelen=50`;
    } else if (request.name === 'getPullrequestCommits') {
      const {
        id
      } = request;
      url = `https://api.bitbucket.org/2.0/repositories/${repoUrl}/pullrequests/${id}/commits`;
    } else if (request.name === 'getPullrequestFiles') {
      const {
        id,
        hash1,
        hash2
      } = request;
      url = `https://bitbucket.org/!api/2.0/repositories/${repoUrl}/diffstat/${repoUrl}:${hash1}%0D${hash2}?from_pullrequest_id=${id}&pagelen=1000`;
    } else {
      exhaustiveCheck(request.name);
    }

    const result = await get(url, token);
    sendResponse(result);
  })();

  return true;
});

// eslint-disable-next-line flowtype/no-weak-types
async function get(url, token) {
  const response = await fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  });

  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function exhaustiveCheck(value) {
  throw new Error(`Unhandled value: ${value}`);
}

/***/ })

/******/ });
//# sourceMappingURL=background-for-requests.js.map