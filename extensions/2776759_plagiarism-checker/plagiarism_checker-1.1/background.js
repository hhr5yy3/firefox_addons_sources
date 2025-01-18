(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _ext = require("./utils/ext");

var _ext2 = _interopRequireDefault(_ext);

var _storage = require("./utils/storage");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_ext2.default.runtime.onMessage.addListener(function (request, sender, sendResponse) {

if(request.action === "perform-save")
{
    if(request.data.length < 30) {
	sendResponse({ action: 'less' });
    } else {
	sendResponse({ action: "saved" });
    }
}
if(request.action === "perform-check")
{
  const cid = request.cid;

  const encodedParams = new URLSearchParams();
  encodedParams.append("email", encodeURI(request.email)); 
  encodedParams.append("uid", request.uid); 
  encodedParams.append("code", "yahoo"); 
  encodedParams.append("query", encodeURI(request.data)); 

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: encodedParams,
  };

  fetch("https://plagiarisma.net/extension.php", options)
    .then((response) => response.text())
    .then((response) => {
      if(response.error) {
	sendResponse({ action: 'failed' });
      } else {
//        console.log(response);
	_storage2.default.set({ results: response }, function() { 

	MPGA4("page_view", cid, "results");

	_ext2.default.tabs.create({url : _ext2.default.runtime.getURL('results.html?'+Date.now()), active: true});
	});
      }
    })
    .catch((err) => console.error(err)); 
}
    return true;
});

_ext2.default.runtime.onInstalled.addListener(async () => {
    _ext2.default.contextMenus.create({
    id: 'essay',
    title: 'Essay Writing Service 24/7',
    type: 'normal',
    contexts: ['all']
    });

var injectIntoTab = function (tab) {
    var scripts = _ext2.default.runtime.getManifest().content_scripts[0].js;
    var i = 0, s = scripts.length;
    for( ; i < s; i++ ) {
        chrome.tabs.executeScript(tab.id, {
            file: scripts[i]
        });
    }
}

_ext2.default.windows.getAll({
    populate: true
}, function (windows) {
    var i = 0, w = windows.length, currentWindow;
    for( ; i < w; i++ ) {
        currentWindow = windows[i];
        var j = 0, t = currentWindow.tabs.length, currentTab;
        for( ; j < t; j++ ) {
            currentTab = currentWindow.tabs[j];
            if( ! currentTab.url.match(/(chrome):\/\//gi) ) {
                injectIntoTab(currentTab);
            }
        }
    }
}); 

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}

function generateId() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 9)).join('');
}

    let key = await getStorageValue("cid");

    var cid = (typeof key === 'undefined') ? false : key;

    if(!cid) {
	const cid = generateId()+"."+generateId();

	_storage2.default.set({ cid: cid }, function() { MPGA4geo(cid); });
    }
    else {
	MPGA4("page_view", cid, "background");
    }
});

function MPGA4(ename, cid, page)
{
    fetch("https://www.google-analytics.com/mp/collect?firebase_app_id=1:17204499294:web:3c04f1a984b4f18df0f5cf&api_secret=xEHbhLQcTHCFGk2g7MzgUg&measurement_id=G-8FX9HLB4Y5", {
    method: "POST",
    body: JSON.stringify({
	client_id: cid,
	events: [{
	name: ename,
	params: { 
	"page_title": page,
	"engagement_time_msec": 100
	},
    }],
    })
    }).then((response) => { /* console.log(response); */ });
}

function MPGA4geo(cid)
{
//    const uagent = window.navigator.userAgent;
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
	name: "page_view",
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
    })
}

_ext2.default.contextMenus.onClicked.addListener(() => {
	_ext2.default.tabs.create({
	url: 'https://plagiarisma.net/paperhelp.php'
	});
});

},{"./utils/ext":2,"./utils/storage":3}],2:[function(require,module,exports){
'use strict';

var apis = ['alarms', 'bookmarks', 'browserAction', 'commands', 'contextMenus', 'cookies', 'downloads', 'events', 'extension', 'extensionTypes', 'history', 'i18n', 'idle', 'notifications', 'pageAction', 'runtime', 'scripting', 'storage', 'tabs', 'webNavigation', 'webRequest', 'windows'];

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
