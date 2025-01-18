(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _ext = require("./utils/ext");

var _ext2 = _interopRequireDefault(_ext);

var _storage = require("./utils/storage");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = false;
var email = "";
var uid = "";
var cid = "";
var data = "";

const getStorageValue = (key) => {
  return new Promise((resolve, reject) => {
    _storage2.default.get([key], (result) => {
    if(_ext2.default.runtime.lastError) {
	return reject(_ext2.default.runtime.lastError);
    }
      resolve(result[key]);
    });
  });
};

async function processRequest() 
{
    let key1 = await getStorageValue("auth");
    let key2 = await getStorageValue("email");
    let key3 = await getStorageValue("uid");
    let key4 = await getStorageValue("cid");

    auth = (typeof key1 === 'undefined') ? false : key1;
    email = (typeof key2 === 'undefined') ? false : key2;
    uid = (typeof key3 === 'undefined') ? false : key3;
    cid = (typeof key4 === 'undefined') ? false : key4;

    if(!auth) {
	renderMessage(_ext2.default.i18n.getMessage("AppAuthorize"));
    } else {
	_ext2.default.runtime.sendMessage({ action: "perform-check", data: data, email: email, uid: uid, cid: cid });
    } 
}

var popup = document.getElementById("app");
popup.style.backgroundColor = "beige";

document.querySelectorAll('[data-locale]').forEach(elem => {
    elem.innerText = _ext2.default.i18n.getMessage(elem.dataset.locale);
});

var template = function template(data)
{
    if(!data.text) {
	return "\n  <div class=\"site-description h3\">\n " + _ext2.default.i18n.getMessage("AppSelect") + "\n </div>\n  <div align=\"center\" class=\"action-container\">\n    <button disabled=\"true\" id=\"save-btn\" class=\"btn-disabled\">" + _ext2.default.i18n.getMessage("AppCheck") + "</button>\n  </div>\n  ";
    } else {
	return "\n  <div class=\"site-description\">\n <p class=\"description\">" + data.text.slice(0,400) + "..." + "</p>\n </div>\n  <div align=\"center\" class=\"action-container\">\n    <button data-bookmark='" + data.text + "' id=\"save-btn\" class=\"btn\">" + _ext2.default.i18n.getMessage("AppCheck") + "</button>\n  </div>\n  ";
    }
};

var renderMessage = function renderMessage(message)
{
    let tmpl = "<p class='message'>" + message + "</p>";
    let cleanHTML = DOMPurify.sanitize(tmpl);

    let displayContainer = document.getElementById("display-container");
    displayContainer.innerHTML = cleanHTML;
};

_ext2.default.tabs.query({ active: true, currentWindow: true }, function (tabs)
{
    var activeTab = tabs[0];
    _ext2.default.tabs.sendMessage(activeTab.id, { action: 'process-page' }, function(response) {

    if(_ext2.default.runtime.lastError) { /* console.log(_ext2.default.runtime.lastError); */ }

    let displayContainer = document.getElementById("display-container");

    if(response)
    {
	let tmpl = template(response);
	let cleanHTML = DOMPurify.sanitize(tmpl);
	displayContainer.innerHTML = cleanHTML;

    } else {
	renderMessage(_ext2.default.i18n.getMessage("AppSkip"));
    }
    });
    return true;
});

popup.addEventListener("click", function (e)
{
	if(e.target && e.target.matches("#save-btn"))
	{
		e.preventDefault();
		data = e.target.getAttribute("data-bookmark");

		_ext2.default.runtime.sendMessage({ action: "perform-save", data: data }, function (response)
		{
			switch(response.action) {

			case "auth":
	        		renderMessage(_ext2.default.i18n.getMessage("AppAuthorize"));
				break;
			case "less":
	        		renderMessage(_ext2.default.i18n.getMessage("AppChars"));
				break;
			case "failed":
	        		renderMessage(_ext2.default.i18n.getMessage("AppFail"));
				break;
			case "saved":
	        		renderMessage(_ext2.default.i18n.getMessage("AppProcess"));
				processRequest();
				break;
			default:
	        		renderMessage(_ext2.default.i18n.getMessage("AppError"));
				break;
			}
		});
	}
});

var optionsLink = document.querySelector(".js-options");

optionsLink.addEventListener("click", function (e)
{
    e.preventDefault();
    _ext2.default.tabs.create({ 'url': _ext2.default.runtime.getURL('options.html') });
});

},{"./utils/ext":2,"./utils/storage":3}],2:[function(require,module,exports) {
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
