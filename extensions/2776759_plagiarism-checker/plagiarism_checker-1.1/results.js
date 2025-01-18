(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _ext = require("./utils/ext");

var _ext2 = _interopRequireDefault(_ext);

var _storage = require("./utils/storage");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function rmLocalStorageValue(key) {
    let c = new Promise(() => {
        try { _storage2.default.remove(key); } catch (ex) { reject(ex); }});
    let val = await c;
}

const loadSavedData = () => {
  let key = "results";

return new Promise((resolve, reject) => {
    _storage2.default.get([key], (result) => {
    if(_ext2.default.runtime.lastError) {
	return reject(_ext2.default.runtime.lastError);
    }
      resolve(result[key]);
    });
});
};

async function getStorageResults()
{
    let results = await loadSavedData();
    let cleanHTML = DOMPurify.sanitize(results);

    let output = document.getElementById("main");
    output.innerHTML = cleanHTML;

//    try { await rmLocalStorageValue("results"); } catch (e) { }
}

getStorageResults();

},{"./utils/ext":2,"./utils/storage":3}],2:[function(require,module,exports){
'use strict';

var apis = ['alarms', 'bookmarks', 'browserAction', 'commands', 'contextMenus', 'cookies', 'downloads', 'events', 'extension', 'extensionTypes', 'history', 'i18n', 'idle', 'notifications', 'pageAction', 'runtime', 'storage', 'tabs', 'webNavigation', 'webRequest', 'windows'];

function Extension() {
  var _this = this;

  apis.forEach(function (api) {

    _this[api] = null;

    try {
      if (chrome[api]) {
        _this[api] = chrome[api];
      }
    } catch (e) {}

    try {
      if (window[api]) {
        _this[api] = window[api];
      }
    } catch (e) {}

    try {
      if (browser[api]) {
        _this[api] = browser[api];
      }
    } catch (e) {}
    try {
      _this.api = browser.extension[api];
    } catch (e) {}
  });

  try {
    if (browser && browser.runtime) {
      this.runtime = browser.runtime;
    }
  } catch (e) {}

  try {
    if (browser && browser.browserAction) {
      this.browserAction = browser.browserAction;
    }
  } catch (e) {}
}

module.exports = new Extension();

},{}],3:[function(require,module,exports){
"use strict";

var _ext = require("./ext");

var _ext2 = _interopRequireDefault(_ext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _ext2.default.storage.local; //_ext2.default.storage.sync ? _ext2.default.storage.sync : _ext2.default.storage.local;

},{"./ext":2}]},{},[1])
