(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _ext = require("./utils/ext");

var _ext2 = _interopRequireDefault(_ext);

var _storage = require("./utils/storage");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.querySelectorAll('[data-locale]').forEach(elem => {
    elem.innerHTML = _ext2.default.i18n.getMessage(elem.dataset.locale);
});

var info = document.getElementById("info");
var email = document.getElementById("email");
var uid = document.getElementById("uid");
var submit = document.getElementById("submit");
var cid = null;

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

function generateId() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 9)).join('');
}

async function initLoginData() 
{
    let key1 = await getStorageValue("auth");
    let key2 = await getStorageValue("email");
    let key3 = await getStorageValue("uid");
    let key4 = await getStorageValue("cid");

    var auth = (typeof key1 === 'undefined') ? false : key1;

    if(auth) {
	email.disabled = true;
	uid.disabled = true;
	submit.disabled = true;
    }

    cid = (typeof key4 === 'undefined') ? false : key4;

    if(!cid) {
	cid = generateId()+"."+generateId();
    }

    email.value = (typeof key2 === 'undefined') ? 'your email' : key2;
    uid.value = (typeof key3 === 'undefined') ? 'api key' : key3;
}

initLoginData();

submit.addEventListener("click", function (e) {

    if(email.value.length > 0 && uid.value.length == 32)
    {
	const encodedParams = new URLSearchParams();
	encodedParams.append("email", encodeURI(email.value)); 
	encodedParams.append("uid", uid.value); 

	const options = {
	method: "POST",
	headers: {
	"content-type":"application/x-www-form-urlencoded",
	},
	body: encodedParams,
    };

    fetch("https://plagiarisma.net/extension.php", options)
    .then((response) => response.json())
    .then((response) => {
	if(response.error) {
	    sendResponse({ action: 'failed' });
	} else {
//        console.log(response);
	if(response === uid.value)
	{
	    _storage2.default.set({ auth: true, email: email.value, uid: uid.value, cid: cid }, function() {
	    info.innerHTML = _ext2.default.i18n.getMessage("AppUpdated");

//	    const uagent = navigator.userAgent;
	    const nlang = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;

	    var userCity;
	    var userCountry;
	    var userRegion;

	    fetch("countries.json").then((response) => response.json()).then((response) => {

	    if(Intl)
	    {
		var userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		var tzArr = userTimeZone.split("/");
		userRegion = tzArr[0];
		userCity = tzArr[tzArr.length - 1];
		userCountry = response[userCity];
	    }

	    fetch("https://www.google-analytics.com/mp/collect?firebase_app_id=1:17204499294:web:3c04f1a984b4f18df0f5cf&api_secret=xEHbhLQcTHCFGk2g7MzgUg&measurement_id=G-8FX9HLB4Y5", {
	    method: "POST",
	    body: JSON.stringify({
	    client_id: cid,
	    events: [{
		name: 'login',
		params: { 
		"language": nlang,
		"region": userRegion,
		"city": userCity,
		"country": userCountry,
		"browser": "Firefox",
		"engagement_time_msec": 100
		},
	    }],
	    })
	    }).then((response) => { /* console.log(response); */ });
    });
	}); 
	} else {
            info.innerHTML = _ext2.default.i18n.getMessage("AppFailed");
	}
    }
    }).catch((err) => console.error(err)); 
    }
    else {
	info.innerHTML = _ext2.default.i18n.getMessage("AppInvalid");
    }

});

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
