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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/scripts/background.ts":
/*!***********************************!*\
  !*** ./app/scripts/background.ts ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interfaces_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces/types */ "./app/scripts/interfaces/types.ts");

var content;
var userId;
chrome.storage.local.clear();
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'Page') {
        var c = message.category.toString();
        switch (c) {
            case 'allUsers':
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        category: 'allUsers',
                        type: 'Background',
                        content: message.content,
                    });
                });
                break;
            case 'Settings':
                content = message.content;
                chrome.tabs.create({
                    url: "/pages/organisationdetails.html",
                });
                break;
            case 'myRoles':
            case 'allFields':
            case 'quickFindFields':
            case 'entityMetadata':
            case 'environment':
                content = message.content;
                chrome.tabs.create({
                    url: "/pages/grid.html",
                });
                break;
            case 'workflows':
                content = message.content;
                chrome.tabs.create({
                    url: "/pages/processes.html",
                });
                break;
            case 'Extension':
                renderBadge();
                if (message.content === 'On') {
                    chrome.browserAction.enable(sender.tab.id);
                }
                else if (message.content === 'Off')
                    chrome.browserAction.disable(sender.tab.id);
                break;
            case 'Load':
                sendResponse(content);
                break;
            case 'allUserRoles':
                content = message.content;
                chrome.tabs.create({
                    url: "/pages/userroles.html",
                });
                break;
            case 'optionsets':
                content = message.content;
                chrome.tabs.create({
                    url: "/pages/optionsets.html",
                });
                break;
            default:
                break;
        }
    }
    else if (message.type === 'Impersonate') {
        var category = message.category;
        var impersonizationMessage = message.content;
        renderBadge();
        switch (category) {
            case 'activation':
                userId = impersonizationMessage.UserId;
                chrome.webRequest.onBeforeSendHeaders.removeListener(headerListener);
                if (impersonizationMessage.IsActive) {
                    chrome.webRequest.onBeforeSendHeaders.addListener(headerListener, {
                        urls: [impersonizationMessage.Url + 'api/*'],
                    }, ['blocking', 'requestHeaders', 'extraHeaders']);
                }
                break;
            case 'changeUser':
                userId = impersonizationMessage.UserId;
                break;
        }
    }
    else if (message.type === 'API') {
        var c_1 = message.category.toString();
        switch (c_1) {
            case 'allUsers':
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function (tabs) {
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: "window.postMessage({ type: '" + c_1 + "', category: '" + message.type + "' }, '*');",
                    });
                });
                break;
        }
    }
    else {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, function (tabs) {
            if (!tabs || tabs.length === 0)
                return;
            chrome.tabs.executeScript(tabs[0].id, {
                code: "window.postMessage({ type: '" + message.type + "', category: '" + message.category + "' }, '*');",
            });
        });
    }
});
function headerListener(details) {
    details.requestHeaders.push({
        name: 'CallerObjectId',
        value: userId,
    });
    return { requestHeaders: details.requestHeaders };
}
function renderBadge() {
    chrome.storage.local.get([_interfaces_types__WEBPACK_IMPORTED_MODULE_0__["LocalStorage"].isImpersonating, _interfaces_types__WEBPACK_IMPORTED_MODULE_0__["LocalStorage"].userName], function (result) {
        if (result.isImpersonating) {
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
            chrome.browserAction.setTitle({ title: "Impersonating " + result.userName });
            chrome.browserAction.setBadgeText({
                text: result.userName
                    .split(' ')
                    .map(function (x) { return x[0]; })
                    .join(''),
            });
        }
        else {
            chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
            chrome.browserAction.setBadgeText({ text: null });
            chrome.browserAction.setTitle({ title: '' });
        }
    });
}


/***/ }),

/***/ "./app/scripts/interfaces/types.ts":
/*!*****************************************!*\
  !*** ./app/scripts/interfaces/types.ts ***!
  \*****************************************/
/*! exports provided: AreaType, LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AreaType", function() { return AreaType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorage", function() { return LocalStorage; });
var AreaType;
(function (AreaType) {
    AreaType[AreaType["Form"] = 0] = "Form";
    AreaType[AreaType["Grid"] = 1] = "Grid";
    AreaType[AreaType["General"] = 2] = "General";
})(AreaType || (AreaType = {}));
var LocalStorage;
(function (LocalStorage) {
    LocalStorage["lastUrl"] = "lastUrl";
    LocalStorage["currentUrl"] = "currentUrl";
    LocalStorage["usersList"] = "usersList";
    LocalStorage["isImpersonating"] = "isImpersonating";
    LocalStorage["userId"] = "userId";
    LocalStorage["userName"] = "userName";
})(LocalStorage || (LocalStorage = {}));


/***/ }),

/***/ 5:
/*!*****************************************!*\
  !*** multi ./app/scripts/background.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspaces/Levelup-for-Dynamics-CRM/app/scripts/background.ts */"./app/scripts/background.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy9pbnRlcmZhY2VzL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG9DQUFvQztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxtREFBbUQsd0RBQXdELE9BQU87QUFDbEgscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMscUVBQXFFLE9BQU87QUFDdkgsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZO0FBQ1o7QUFDQTtBQUNBLDhCQUE4Qiw4REFBWSxrQkFBa0IsOERBQVk7QUFDeEU7QUFDQSwwREFBMEQsMEJBQTBCO0FBQ3BGLDJDQUEyQyw0Q0FBNEM7QUFDdkY7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLGFBQWEsRUFBRTtBQUN0RDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsMERBQTBELHNCQUFzQjtBQUNoRiwrQ0FBK0MsYUFBYTtBQUM1RCwyQ0FBMkMsWUFBWTtBQUN2RDtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQzFJQTtBQUFBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0QkFBNEI7QUFDdEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG4iLCJpbXBvcnQgeyBMb2NhbFN0b3JhZ2UsIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3R5cGVzJztcbnZhciBjb250ZW50O1xudmFyIHVzZXJJZDtcbmNocm9tZS5zdG9yYWdlLmxvY2FsLmNsZWFyKCk7XG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ1BhZ2UnKSB7XG4gICAgICAgIHZhciBjID0gbWVzc2FnZS5jYXRlZ29yeS50b1N0cmluZygpO1xuICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FsbFVzZXJzJzpcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2FsbFVzZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdCYWNrZ3JvdW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2UuY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTZXR0aW5ncyc6XG4gICAgICAgICAgICAgICAgY29udGVudCA9IG1lc3NhZ2UuY29udGVudDtcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3BhZ2VzL29yZ2FuaXNhdGlvbmRldGFpbHMuaHRtbFwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbXlSb2xlcyc6XG4gICAgICAgICAgICBjYXNlICdhbGxGaWVsZHMnOlxuICAgICAgICAgICAgY2FzZSAncXVpY2tGaW5kRmllbGRzJzpcbiAgICAgICAgICAgIGNhc2UgJ2VudGl0eU1ldGFkYXRhJzpcbiAgICAgICAgICAgIGNhc2UgJ2Vudmlyb25tZW50JzpcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gbWVzc2FnZS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvcGFnZXMvZ3JpZC5odG1sXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3b3JrZmxvd3MnOlxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBtZXNzYWdlLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wYWdlcy9wcm9jZXNzZXMuaHRtbFwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRXh0ZW5zaW9uJzpcbiAgICAgICAgICAgICAgICByZW5kZXJCYWRnZSgpO1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbnRlbnQgPT09ICdPbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uZW5hYmxlKHNlbmRlci50YWIuaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtZXNzYWdlLmNvbnRlbnQgPT09ICdPZmYnKVxuICAgICAgICAgICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5kaXNhYmxlKHNlbmRlci50YWIuaWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnTG9hZCc6XG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYWxsVXNlclJvbGVzJzpcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gbWVzc2FnZS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvcGFnZXMvdXNlcnJvbGVzLmh0bWxcIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29wdGlvbnNldHMnOlxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBtZXNzYWdlLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wYWdlcy9vcHRpb25zZXRzLmh0bWxcIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSAnSW1wZXJzb25hdGUnKSB7XG4gICAgICAgIHZhciBjYXRlZ29yeSA9IG1lc3NhZ2UuY2F0ZWdvcnk7XG4gICAgICAgIHZhciBpbXBlcnNvbml6YXRpb25NZXNzYWdlID0gbWVzc2FnZS5jb250ZW50O1xuICAgICAgICByZW5kZXJCYWRnZSgpO1xuICAgICAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICBjYXNlICdhY3RpdmF0aW9uJzpcbiAgICAgICAgICAgICAgICB1c2VySWQgPSBpbXBlcnNvbml6YXRpb25NZXNzYWdlLlVzZXJJZDtcbiAgICAgICAgICAgICAgICBjaHJvbWUud2ViUmVxdWVzdC5vbkJlZm9yZVNlbmRIZWFkZXJzLnJlbW92ZUxpc3RlbmVyKGhlYWRlckxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBpZiAoaW1wZXJzb25pemF0aW9uTWVzc2FnZS5Jc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBjaHJvbWUud2ViUmVxdWVzdC5vbkJlZm9yZVNlbmRIZWFkZXJzLmFkZExpc3RlbmVyKGhlYWRlckxpc3RlbmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmxzOiBbaW1wZXJzb25pemF0aW9uTWVzc2FnZS5VcmwgKyAnYXBpLyonXSxcbiAgICAgICAgICAgICAgICAgICAgfSwgWydibG9ja2luZycsICdyZXF1ZXN0SGVhZGVycycsICdleHRyYUhlYWRlcnMnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2hhbmdlVXNlcic6XG4gICAgICAgICAgICAgICAgdXNlcklkID0gaW1wZXJzb25pemF0aW9uTWVzc2FnZS5Vc2VySWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSAnQVBJJykge1xuICAgICAgICB2YXIgY18xID0gbWVzc2FnZS5jYXRlZ29yeS50b1N0cmluZygpO1xuICAgICAgICBzd2l0Y2ggKGNfMSkge1xuICAgICAgICAgICAgY2FzZSAnYWxsVXNlcnMnOlxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50V2luZG93OiB0cnVlXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJzWzBdLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBcIndpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdcIiArIGNfMSArIFwiJywgY2F0ZWdvcnk6ICdcIiArIG1lc3NhZ2UudHlwZSArIFwiJyB9LCAnKicpO1wiLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZSxcbiAgICAgICAgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgICAgIGlmICghdGFicyB8fCB0YWJzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHRhYnNbMF0uaWQsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBcIndpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdcIiArIG1lc3NhZ2UudHlwZSArIFwiJywgY2F0ZWdvcnk6ICdcIiArIG1lc3NhZ2UuY2F0ZWdvcnkgKyBcIicgfSwgJyonKTtcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbmZ1bmN0aW9uIGhlYWRlckxpc3RlbmVyKGRldGFpbHMpIHtcbiAgICBkZXRhaWxzLnJlcXVlc3RIZWFkZXJzLnB1c2goe1xuICAgICAgICBuYW1lOiAnQ2FsbGVyT2JqZWN0SWQnLFxuICAgICAgICB2YWx1ZTogdXNlcklkLFxuICAgIH0pO1xuICAgIHJldHVybiB7IHJlcXVlc3RIZWFkZXJzOiBkZXRhaWxzLnJlcXVlc3RIZWFkZXJzIH07XG59XG5mdW5jdGlvbiByZW5kZXJCYWRnZSgpIHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW0xvY2FsU3RvcmFnZS5pc0ltcGVyc29uYXRpbmcsIExvY2FsU3RvcmFnZS51c2VyTmFtZV0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5pc0ltcGVyc29uYXRpbmcpIHtcbiAgICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFsyNTUsIDAsIDAsIDI1NV0gfSk7XG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRUaXRsZSh7IHRpdGxlOiBcIkltcGVyc29uYXRpbmcgXCIgKyByZXN1bHQudXNlck5hbWUgfSk7XG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoe1xuICAgICAgICAgICAgICAgIHRleHQ6IHJlc3VsdC51c2VyTmFtZVxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4WzBdOyB9KVxuICAgICAgICAgICAgICAgICAgICAuam9pbignJyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFswLCAwLCAwLCAwXSB9KTtcbiAgICAgICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IG51bGwgfSk7XG4gICAgICAgICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRUaXRsZSh7IHRpdGxlOiAnJyB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiZXhwb3J0IHZhciBBcmVhVHlwZTtcbihmdW5jdGlvbiAoQXJlYVR5cGUpIHtcbiAgICBBcmVhVHlwZVtBcmVhVHlwZVtcIkZvcm1cIl0gPSAwXSA9IFwiRm9ybVwiO1xuICAgIEFyZWFUeXBlW0FyZWFUeXBlW1wiR3JpZFwiXSA9IDFdID0gXCJHcmlkXCI7XG4gICAgQXJlYVR5cGVbQXJlYVR5cGVbXCJHZW5lcmFsXCJdID0gMl0gPSBcIkdlbmVyYWxcIjtcbn0pKEFyZWFUeXBlIHx8IChBcmVhVHlwZSA9IHt9KSk7XG5leHBvcnQgdmFyIExvY2FsU3RvcmFnZTtcbihmdW5jdGlvbiAoTG9jYWxTdG9yYWdlKSB7XG4gICAgTG9jYWxTdG9yYWdlW1wibGFzdFVybFwiXSA9IFwibGFzdFVybFwiO1xuICAgIExvY2FsU3RvcmFnZVtcImN1cnJlbnRVcmxcIl0gPSBcImN1cnJlbnRVcmxcIjtcbiAgICBMb2NhbFN0b3JhZ2VbXCJ1c2Vyc0xpc3RcIl0gPSBcInVzZXJzTGlzdFwiO1xuICAgIExvY2FsU3RvcmFnZVtcImlzSW1wZXJzb25hdGluZ1wiXSA9IFwiaXNJbXBlcnNvbmF0aW5nXCI7XG4gICAgTG9jYWxTdG9yYWdlW1widXNlcklkXCJdID0gXCJ1c2VySWRcIjtcbiAgICBMb2NhbFN0b3JhZ2VbXCJ1c2VyTmFtZVwiXSA9IFwidXNlck5hbWVcIjtcbn0pKExvY2FsU3RvcmFnZSB8fCAoTG9jYWxTdG9yYWdlID0ge30pKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=