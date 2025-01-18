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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageCache = void 0;
exports.initStorage = initStorage;
exports.initCache = initCache;
exports.setToStorage = setToStorage;

var _pageHelpers = __webpack_require__(1);

var storageCache = exports.storageCache = void 0;

function initStorage(callback) {
  // for background.js
  browser.storage.local.get(function (storageData) {
    if (Object.keys(storageData).length !== 0) {
      exports.storageCache = storageCache = storageData;
      callback();
      return;
    }

    var storageDefaultSettings = {
      isFirstRun: true,
      // social settings
      vkCheck: true,
      fbCheck: true,
      // page settings
      blockLevel: 2,
      adsEnabled: false,
      flashEnabled: true,
      //exceptions
      flashExceptions: [],
      adsExceptions: [],
      blockParts: [],
      // database information
      database: {
        updateTime: null,
        version: null
      },
      //database data
      names: [],
      patterns: [],
      socialBlocksClasses: [],
      socialBlocksIds: [],
      socialURLs: [],
      types: [],
      //hash of all database data
      blockHash: []
    };
    setToStorage(storageDefaultSettings);
    exports.storageCache = storageCache = storageDefaultSettings;
    callback();
  });
  browser.storage.onChanged.addListener(function (changes) {
    var hasActualChanges = false;

    for (var key in changes) {
      var _ref = [JSON.stringify(changes[key].oldValue), JSON.stringify(changes[key].newValue)],
          oldValue = _ref[0],
          newValue = _ref[1];

      if (oldValue !== newValue) {
        hasActualChanges = true;
        break;
      }
    }

    if (!hasActualChanges) {
      return;
    }

    for (var change in changes) {
      if (changes.hasOwnProperty(change)) {
        checkStorageChanges(changes, change);
      }
    }
  });
}

function initCache(callback) {
  //for popup.js ,options.js and wizard.js
  browser.storage.local.get(function (storageData) {
    exports.storageCache = storageCache = storageData;
    browser.storage.onChanged.addListener(function (changes) {
      for (var change in changes) {
        if (changes.hasOwnProperty(change)) {
          var element = changes[change];
          storageCache[change] = element.newValue;
        }
      }
    });
    callback();
  });
}

function setToStorage(elementsToSet) {
  browser.storage.local.set(elementsToSet);
}

function checkStorageChanges(changes, change) {
  var element = changes[change];
  storageCache[change] = element.newValue;

  switch (change) {
    case 'adsEnabled':
    case 'flashEnabled':
      {
        browser.tabs.query({}, function (tabs) {
          tabs.forEach(function (tab) {
            var isSystemPage = (0, _pageHelpers.checkIsPageSystem)(tab.url);

            if (isSystemPage) {
              return;
            }

            browser.tabs.sendMessage(tab.id, {
              action: 'showRefreshInformer'
            });
          });
        });
        break;
      }
  }
}

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDomain = getDomain;
exports.getBaseURL = getBaseURL;
exports.escape = escape;
var domainReg = /^(https?:\/\/[^\/]+)/i;
var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;'
};

function getDomain(urlString) {
  var parseDomain = domainReg.exec(urlString);
  return Array.isArray(parseDomain) && parseDomain[1];
}

function getBaseURL(url) {
  return url ? url.split('/')[2] : '';
}

function escape(string) {
  return string.replace(/[<>&"']/g, function (match) {
    return escapeMap[match];
  });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specSocialBlocks = exports.tabURL = exports.tabId = void 0;
exports.getOptions = getOptions;
exports.checkUrl = checkUrl;
exports.init = init;
exports.getActiveTab = getActiveTab;
exports.setBadgeState = setBadgeState;

var _$global = __webpack_require__(2);

var $global = _interopRequireWildcard(_$global);

var _trackList = __webpack_require__(4);

var TrackList = _interopRequireWildcard(_trackList);

var _exceptionService = __webpack_require__(6);

var ExceptionsService = _interopRequireWildcard(_exceptionService);

var _databaseModule = __webpack_require__(7);

var DatabaseModule = _interopRequireWildcard(_databaseModule);

var _storageModule = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var tabId = exports.tabId = void 0;
var tabURL = exports.tabURL = void 0;
var specSocialBlocks = exports.specSocialBlocks = [];

function getOptions(sendResponse) {
  getActiveTab(function (tab) {
    exports.tabId = tabId = tab.id;
    exports.tabURL = tabURL = tab.url;
    sendResponse({
      update: false,
      blockLevel: _storageModule.storageCache.blockLevel,
      adsException: ExceptionsService.getException('ads'),
      tabURL: tabURL,
      blockedItems: _storageModule.storageCache.blockParts,
      specSocialBlocks: specSocialBlocks,
      counterPatterns: getPatternsByType('Tracking')
    });
  });
} //check url safety


function checkUrl(request, sendResponse) {
  if (!request.url) {
    sendResponse({
      response: ''
    });
    return;
  }

  function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
      var timeout = setTimeout(function () {
        reject(new Error("timeout"));
      }, ms);
      promise.then(function (response) {
        clearTimeout(timeout);
        resolve(response);
      }, function (error) {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }

  timeout(11000, fetch("https://online.drweb.com/result/?snp=".concat(request.sitename, "&url=").concat(request.url, "&r=xml"), {
    method: 'get'
  })).then(function (response) {
    return response.text();
  }).then(function (data) {
    sendResponse({
      response: data,
      url: request.url,
      timelabel: request.timelabel
    });
  }).catch(function () {
    sendResponse({
      response: '<?xml version="1.0" encoding="UTF-8"?><dwonline><status>serverUnavailable</status><dwreport></dwreport></dwonline>',
      url: request.checkURL,
      timelabel: request.timelabel
    });
  });
}

function init() {
  getActiveTab(function (tab) {
    exports.tabId = tabId = tab.id;
    exports.tabURL = tabURL = tab.url;
  }); // @TODO: change Bundge on change event off activeTab.id

  browser.tabs.onActivated.addListener(function () {
    setTabsParameters();
    setBadgeState(tabId, tabURL);
  });
  browser.tabs.onUpdated.addListener(function () {
    setTabsParameters();
  });
  browser.tabs.onRemoved.addListener(function () {
    setTabsParameters();
  });
  browser.windows.onFocusChanged.addListener(function () {
    setTabsParameters();
    DatabaseModule.checkForUpdateDB();
  });
} // @param {Function} cb


function getActiveTab(callback) {
  browser.tabs.query({
    'active': true,
    windowType: 'normal',
    'currentWindow': true // ??? at dev window

  }, function (tabs) {
    tabs.length && callback(tabs[0]);
  });
}

function setTabsParameters() {
  getActiveTab(function (tab) {
    exports.tabId = tabId = tab.id;
    exports.tabURL = tabURL = tab.url; // setBadgeState(tabId, tabURL);
  });
}

function setBadgeState(tabId) {
  if (tabId < 0 || !TrackList.tabs[tabId]) {
    // inconsistent tab
    return;
  }

  var tabDomain = $global.getBaseURL(tabURL || '');
  var tracks = TrackList.getTracksForPopup(tabId, tabDomain) || [];
  var text = tracks.length > 0 ? tracks.length + '' : '';
  text && browser.browserAction.setBadgeBackgroundColor({
    color: [0, 0, 0, 220],
    tabId: tabId
  });
  browser.browserAction.setBadgeText({
    text: text,
    tabId: tabId
  });
}

function getPatternsByType(type) {
  var patterns = [];
  DatabaseModule.settings && DatabaseModule.settings.forEach(function (setting) {
    if (setting.type === type) {
      patterns.push(setting.pattern);
    }
  });
  return patterns;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabs = void 0;
exports.appendTrack = appendTrack;
exports.removeTab = removeTab;
exports.createNewTab = createNewTab;
exports.getTabDomain = getTabDomain;
exports.getTracksForPopup = getTracksForPopup;
exports.getAllTracks = getAllTracks;

var _tab = __webpack_require__(15);

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create abstract Hash Collection. base of:
// * TrackList (without LocalStorage Support)
// * ExceptionList (with LocalStorage support)
var tabs = exports.tabs = {}; // @param {Int} tabId
// @param {Object} trackData

function appendTrack(tabId, trackData, resType) {
  if (!tabs[tabId]) {
    tabs[tabId] = new _tab2.default(trackData.url);
  }

  tabs[tabId].addTrack(trackData);
} // @memberOf TrackList


function removeTab(tabId) {
  // if (tabs[tabId]) {
  //   tabs[tabId].tracks.length = 0;
  // }
  // // don't use `delete`
  // tabs[tabId] = null;

  /* trying use delete */
  if (tabs[tabId]) {
    delete tabs[tabId];
  }
} // @memberOf TrackList - when request begin loading


function createNewTab(tabId, tabURL) {
  tabs[tabId] = new _tab2.default(tabURL);
  return tabs[tabId].baseURL;
} // @memberOf TRackList getTabDomain


function getTabDomain(tabId) {
  return tabs[tabId] && tabs[tabId].baseURL;
} // @memberOf {TrackList}


function getTracksForPopup(tabId, tabURL) {
  var tab = tabs[tabId];

  if (!tab) {
    return;
  }

  var tabTracks = [];
  tab.tracks.forEach(function (track) {
    if (track.url === tabURL.split('#')[0] && track.type !== 'Ads' && track.type !== 'Tracking' && !track.isCopy) {
      tabTracks.push(track);
    }
  });
  return tabTracks;
}

function getAllTracks(tabId) {
  return tabs[tabId] ? tabs[tabId].tracks : undefined;
}

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addException = addException;
exports.getException = getException;
exports.removeException = removeException;

var _$global = __webpack_require__(2);

var $global = _interopRequireWildcard(_$global);

var _settingsService = __webpack_require__(3);

var SettingsService = _interopRequireWildcard(_settingsService);

var _storageModule = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// TODO core of exception API
//adding site exception
function addException(type, allow) {
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    var currentTab = tabs[0];
    var tabUrl = currentTab.url;
    var id = ('uni' + Math.random()).replace('.', '');
    var baseURL = $global.getBaseURL(tabUrl).replace('www.', '');
    var flashExceptions = _storageModule.storageCache.flashExceptions;
    var adsExceptions = _storageModule.storageCache.adsExceptions;

    if (type == 'flash') {
      var index = exceptionExist(flashExceptions, baseURL);

      if (index == null) {
        flashExceptions.push({
          id: id,
          baseURL: baseURL,
          allow: allow
        });
      } else {
        flashExceptions[index].allow = allow;
      }

      (0, _storageModule.setToStorage)({
        flashExceptions: flashExceptions
      });
    } else if (type == 'ads') {
      var _index = exceptionExist(adsExceptions, baseURL);

      if (_index == null) {
        adsExceptions.push({
          id: id,
          baseURL: baseURL,
          allow: allow
        });
      } else {
        adsExceptions[_index].allow = allow;
      }

      (0, _storageModule.setToStorage)({
        adsExceptions: adsExceptions
      }); //if allow - remove all blocked parts
      // if (allow == true) {
      //   let i = storageCache.blockParts.length;
      //   while (i--) {
      //     storageCache.blockParts[i].baseURL == baseURL && storageCache.blockParts.splice(i, 1);
      //   }
      //   setToStorage({
      //     blockParts
      //   })
      // }
    }
  });
} //getting exception for current tab


function getException(type) {
  // CHECK SYSTEMS URLS, SUCH A about:debugging#addons
  if (!$global.getBaseURL(SettingsService.tabURL)) {
    return;
  }

  var baseURL = $global.getBaseURL(SettingsService.tabURL).replace('www.', '');

  if (type == 'flash') {
    if (_storageModule.storageCache.flashExceptions != null && _storageModule.storageCache.flashExceptions != undefined && _storageModule.storageCache.flashExceptions != '[]') {
      var index = exceptionExist(_storageModule.storageCache.flashExceptions, baseURL);
      if (index != null) return _storageModule.storageCache.flashExceptions[index];
    }
  } else if (type == 'ads') {
    if (_storageModule.storageCache.adsExceptions != null && _storageModule.storageCache.adsExceptions != undefined && _storageModule.storageCache.adsExceptions != '[]') {
      var adsExceptions = _storageModule.storageCache.adsExceptions;

      var _index2 = exceptionExist(adsExceptions, baseURL);

      if (_index2 != null) {
        return adsExceptions[_index2];
      }
    }
  }

  return null;
} // @TODO похоже здесь пытаются определить домен верхнего уровня
//check if exception exist


function exceptionExist(storage, baseURL) {
  var indexOfException = null;
  storage.forEach(function (storageElement, index) {
    var actualURL = '';
    var storageURL = '';

    if (storageElement.baseURL) {
      storageURL = storageElement.baseURL.replace('www.', '');
    }

    if (baseURL) {
      actualURL = baseURL.replace('www.', '');
    }

    var urlArray = storageURL.split('.');
    var urlLength = urlArray.length;

    if (urlLength <= 2) {
      var urlActualArray = actualURL.split('.');
      var urlActualLevel = urlActualArray.length;

      if (urlActualLevel > 2) {
        actualURL = urlActualArray[urlActualLevel - 2] + '.' + urlActualArray[urlActualLevel - 1];
      }

      if (storageURL == actualURL && actualURL != '') indexOfException = index;
    } else {
      if (storageURL == actualURL && actualURL != '') {
        indexOfException = index;
      }
    }
  });
  return indexOfException;
}

function removeException(type) {
  var baseURL = $global.getBaseURL(SettingsService.tabURL).replace('www.', '');
  var adsExceptions = _storageModule.storageCache.adsExceptions;
  var flashExceptions = _storageModule.storageCache.flashExceptions;

  if (type == "flash") {
    var index = exceptionExist(flashExceptions, baseURL);

    if (index != null) {
      flashExceptions.splice(index, 1);
      (0, _storageModule.setToStorage)({
        flashExceptions: flashExceptions
      });
    }
  }

  if (type == "ads") {
    var _index3 = exceptionExist(adsExceptions, baseURL);

    if (_index3 != null) {
      adsExceptions.splice(_index3, 1);
      (0, _storageModule.setToStorage)({
        adsExceptions: adsExceptions
      });
    }
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = void 0;
exports.updateSettings = updateSettings;
exports.checkForUpdateDB = checkForUpdateDB;

var _database = __webpack_require__(16);

var _storageModule = __webpack_require__(0);

var _settingsService = __webpack_require__(3);

var settings = exports.settings = null;

function updateSettings() {
  return checkDatabase().then(function (data) {
    var patterns = data.patterns.split('@');
    var names = data.names.split('@');
    var types = data.types.split('@'); //special blocks in social networks

    var socialURLs = data.socialURLs.split('@');
    var socialBlocksIds = data.socialBlocksIds.split('@');
    var socialBlocksClasses = data.socialBlocksClasses.split('@'); // TODO refactor code:

    var options = [];
    patterns.forEach(function (pattern, index) {
      options.push({
        id: index + 1,
        name: getString(names[index]),
        type: getString(types[index]),
        pattern: pattern
      });
    });
    var blockHash = getBlockBase(names, types, patterns);
    (0, _storageModule.setToStorage)({
      blockHash: blockHash
    });

    for (var i = 0, len = socialURLs.length; i < len; i++) {
      _settingsService.specSocialBlocks.push({
        baseURL: socialURLs[i],
        id: socialBlocksIds[i],
        className: socialBlocksClasses[i]
      });
    }

    exports.settings = settings = options;
  });
}

function checkDatabase() {
  var version = null;
  return getVersion().then(function (receivedVersion) {
    var outputData = null;
    version = receivedVersion;

    if (!version) {
      outputData = setLocalDataBase();
    } else if (_storageModule.storageCache.database.version == version) {
      outputData = _storageModule.storageCache;
    }

    return outputData;
  }).then(getDatabase).then(function (data) {
    var outputData = null;

    if (!data) {
      outputData = setLocalDataBase();
    }

    (0, _storageModule.setToStorage)(data);
    (0, _storageModule.setToStorage)({
      database: {
        updateTime: Date.now(),
        version: version
      }
    });
    outputData = data;
    return outputData;
  });
}

function getVersion() {
  return fetch('https://download.geo.drweb.com/pub/drweb/linkchecker/Bases/.version.json?' + Math.random(), {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return data.version.message;
  }).catch(function (error) {
    console.warn(error);
    return null;
  });
}

function getDatabase(data) {
  if (data) {
    return data;
  }

  return fetch('https://download.geo.drweb.com/pub/drweb/linkchecker/Bases/.db.json?' + Math.random(), {
    method: 'get'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    var outputData = {};

    for (var element in data) {
      outputData[element] = data[element].message;
    }

    return outputData;
  }).catch(function (error) {
    console.warn(error);
    return null;
  });
}

function setLocalDataBase() {
  (0, _storageModule.setToStorage)({
    database: {
      updateTime: Date.now(),
      version: _database.localDataBase.version
    }
  });
  (0, _storageModule.setToStorage)(_database.localDataBase.data);
  return _database.localDataBase.data;
} // @memeberOf SettingsService - Check if it is a time for update


function checkForUpdateDB() {
  var prevUpdateTime = _storageModule.storageCache.database.updateTime;

  if (prevUpdateTime) {
    var delta = Date.now() - prevUpdateTime;

    if (delta > 14400000) {
      // 4 hours
      updateSettings();
    }
  } else {
    // never be updated
    updateSettings();
  }
}

function getBlockBase(nameList, typeList, patternList) {
  var hash = {};
  var type = void 0;
  var pattern = void 0;

  for (var i = 0, len = patternList.length; i < len; i++) {
    type = getString(typeList[i]);

    if (!Array.isArray(hash[type])) {
      hash[type] = [];
    }

    pattern = getString(patternList[i]);
    hash[type].push({
      id: i + 1,
      name: getString(nameList[i]),
      type: type,
      pattern: pattern
    });
  }

  ;
  return hash;
}

function getString(stringOfNumbers) {
  /* stringOfNumbers = '112-52-68-49-68' */
  if (!stringOfNumbers || !stringOfNumbers.length) {
    return null;
  }

  var arrayOfStringNumbers = stringOfNumbers.split('-');
  var outputString = '';
  arrayOfStringNumbers.forEach(function (stringElement) {
    if (stringElement) {
      outputString += String.fromCharCode(parseInt(stringElement));
    }
  });
  return outputString;
}

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _requestService = __webpack_require__(13);

var RequestService = _interopRequireWildcard(_requestService);

var _settingsService = __webpack_require__(3);

var SettingsService = _interopRequireWildcard(_settingsService);

var _messageListenerModule = __webpack_require__(17);

var MessageListener = _interopRequireWildcard(_messageListenerModule);

var _databaseModule = __webpack_require__(7);

var DatabaseModule = _interopRequireWildcard(_databaseModule);

var _storageModule = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*--------------------------------------------------*/
(0, _storageModule.initStorage)(initExtension);

function initExtension() {
  DatabaseModule.updateSettings();
  SettingsService.init();
  MessageListener.init();
  RequestService.start();
  browser.contextMenus.create({
    title: browser.i18n.getMessage('contextMenuSelectionSearch'),
    contexts: ['selection', 'link'],
    onclick: function onclick(link, tab) {
      var textLink = void 0;
      var isLink = false;

      if (link.linkUrl) {
        textLink = link.linkUrl;
        isLink = true;
      } else {
        textLink = link.selectionText;
      }

      browser.tabs.sendMessage(tab.id, {
        action: 'checkLink',
        selectionText: textLink,
        isLink: isLink
      });
    }
  });
  openWizardPage();
}

function openWizardPage() {
  if (_storageModule.storageCache.isFirstRun === true) {
    (0, _storageModule.setToStorage)({
      isFirstRun: false
    });
    var url = browser.runtime.getURL('content/wizard.html');
    browser.tabs.query({}, function (tabs) {
      /* 
      FIND OPENED WIZARD PAGE 
      IF FIND -> SELECT IT
      */
      var found = false;
      tabs.forEach(function (tab) {
        if (tab.url != url) {
          return;
        }

        browser.tabs.update(tab.id, {
          active: true
        });
        found = true;
      });
      /* IF NOT FOUND -> OPEN NEW */

      if (found) {
        return;
      }

      browser.tabs.query({
        url: url
      }, function (_) {
        browser.tabs.create({
          url: url
        });
      });
    });
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _$global = __webpack_require__(2);

var $global = _interopRequireWildcard(_$global);

var _requestValidationModel = __webpack_require__(14);

var ReqValidationModel = _interopRequireWildcard(_requestValidationModel);

var _trackList = __webpack_require__(4);

var TrackList = _interopRequireWildcard(_trackList);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// TODO сделать обработку очереди для метода отправки сообщений 
// + позволит улучшить производительность
// прослойка для обработки запросов
// Collect loaded resources
function onResourceBeforeRequest(event) {
  var refDomain = '';

  if (event.tabId <= 0) {
    return;
  }

  if (event.type === 'main_frame') {
    refDomain = TrackList.createNewTab(event.tabId, event.url);
  } else {
    refDomain = TrackList.getTabDomain(event.tabId);

    if (!refDomain) {
      // tab can exist before extension was restarted. So we don't have collection of proceeded tabs
      browser.tabs.get(event.tabId, function (data) {
        // check is tab exist 
        if (!browser.runtime.lastError) {
          if (data) {
            refDomain = $global.getDomain(data.url);
          }
        }
      });
    }
  }

  var validationRes = ReqValidationModel.validate(refDomain || '', event);

  if (validationRes) {
    return validationRes;
  }
}

function onTabClose(tabId) {
  TrackList.removeTab(tabId);
}

function start() {
  var urlPatterns = ["http://*/*", "https://*/*"];
  browser.webRequest.onBeforeRequest.addListener(onResourceBeforeRequest, {
    urls: urlPatterns
  }, [// extra arguments
  "blocking", "requestBody"]);
  browser.tabs.onRemoved.addListener(onTabClose);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;

var _$global = __webpack_require__(2);

var $global = _interopRequireWildcard(_$global);

var _exceptionService = __webpack_require__(6);

var ExceptionService = _interopRequireWildcard(_exceptionService);

var _settingsService = __webpack_require__(3);

var SettingsService = _interopRequireWildcard(_settingsService);

var _trackList = __webpack_require__(4);

var TrackList = _interopRequireWildcard(_trackList);

var _storageModule = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// Прослойка для валидации запроса.
var framePlug = {
  redirectUrl: 'data:text/html;charset=utf-8,<html style="background:transparent;"></html>'
}; // @memberOf ReqValidationModel - get reirect object
// @param {String} blockURL - url of blocked page
// @param {String} reason - type of blocked content (not using now)
// @param {Int} tabId - original tab

function generateBlockPage(blockURL, reason, tabId) {
  var link = $global.escape(blockURL);
  var page = browser.runtime.getURL("/content/block.html");
  return {
    redirectUrl: page + '#' + tabId + ';' + link
  };
} // Validate by settings Hash
// @param {String} currentTabUrl - tab url
// @param {Object} requestEvent, eventObject
// @return {Bool} - true if unvalid


function validate(currentTabUrl, requestEvent) {
  var requestUrl = requestEvent.url;
  var currentTabId = requestEvent.tabId;
  var swfReg = /\.swf(\?|#|$)/i;

  if ((requestEvent.type == 'other' || requestEvent.type == 'object') && swfReg.test(requestUrl)) {
    /* FLASH FILES */
    var flashValidationResult = validateFlash();

    if (flashValidationResult) {
      return flashValidationResult;
    }
  }

  var adsBlockList = _storageModule.storageCache.blockHash['Ads'] || [];

  if (adsBlockList.length) {
    var adsValidationResult = validateAds();

    if (adsValidationResult) {
      return adsValidationResult;
    }
  }

  switch (_storageModule.storageCache.blockLevel) {
    case 3:
      var socialValidationResult = validateSocial();

      if (socialValidationResult) {
        return socialValidationResult;
      }

    case 2:
      var analyticsValidationResult = validateAnalytics();

      if (analyticsValidationResult) {
        return analyticsValidationResult;
      }

    case 1:
      var trackingValidationResult = validateTracking();

      if (trackingValidationResult) {
        return trackingValidationResult;
      }

      break;

    default:
      return false;
  }

  return false;

  function validateFlash() {
    var validationResult = false;
    var siteFlashException = ExceptionService.getException('flash');

    if (siteFlashException) {
      if (!siteFlashException.allow) {
        validationResult = {
          cancel: true
        };
      }
    } else if (!_storageModule.storageCache.flashEnabled) {
      validationResult = {
        cancel: true
      };
    }

    return validationResult;
  }

  function validateAds() {
    var validationResult = false;
    var blockObject = {
      cancel: true
    };
    var siteAdsException = ExceptionService.getException('ads'); // Ads that was manualy blocke by user

    if (requestEvent.type == 'main_frame') {
      // for usual page redirect to Block page
      blockObject = generateBlockPage(requestUrl, 'Ads', requestEvent.tabId);
    } else if (requestEvent.type == 'sub_frame') {
      blockObject = framePlug;
    }

    if (siteAdsException) {
      if (siteAdsException.allow) {
        return validationResult;
      }

      adsBlockList.forEach(function (adsBlockItem) {
        var reg = new RegExp(adsBlockItem.pattern);

        if (!reg.test(requestUrl) || adsBlockItem.pattern == 'https://vk.com/widget_comments.php') {
          return;
        }

        TrackList.appendTrack(currentTabId, {
          requestURL: requestUrl,
          url: currentTabUrl,
          type: adsBlockItem.type,
          name: adsBlockItem.name,
          patt: adsBlockItem.pattern
        });
        validationResult = blockObject;
      });
    } else if (!_storageModule.storageCache.adsEnabled) {
      adsBlockList.forEach(function (adsBlockItem) {
        var reg = new RegExp(adsBlockItem.pattern);

        if (!reg.test(requestUrl) || adsBlockItem.pattern == "https://vk.com/widget_comments.php") {
          return;
        }

        TrackList.appendTrack(currentTabId, {
          requestURL: requestUrl,
          url: currentTabUrl,
          type: adsBlockItem.type,
          name: adsBlockItem.name,
          patt: adsBlockItem.pattern
        });
        validationResult = blockObject;
      });
    }

    return validationResult;
  }

  function validateTracking() {
    var validationResult = false;
    var trackingBlockList = _storageModule.storageCache.blockHash['Tracking'] || [];

    if (trackingBlockList.length) {
      trackingBlockList.forEach(function (trackingBlockItem) {
        var reg = new RegExp(trackingBlockItem.pattern);

        if (!reg.test(requestUrl)) {
          return;
        } // TODO что то недобавляет в список....


        TrackList.appendTrack(currentTabId, {
          requestURL: requestUrl,
          url: currentTabUrl,
          type: trackingBlockItem.type,
          name: trackingBlockItem.name,
          patt: trackingBlockItem.pattern
        });
        SettingsService.setBadgeState(currentTabId, currentTabUrl);
        validationResult = {
          cancel: true
        };
      });
    }

    return validationResult;
  }

  function validateAnalytics() {
    var validationResult = false;
    var blockObject = {
      cancel: true
    };
    var analyticsBlockList = _storageModule.storageCache.blockHash['Web Analytics'] || [];

    if (analyticsBlockList.length) {
      if (requestEvent.type == 'main_frame') {
        // for usual page redirect to Block page
        blockObject = generateBlockPage(requestUrl, 'Web Analytics', requestEvent.tabId);
      } else if (requestEvent.type == 'sub_frame') {
        blockObject = framePlug;
      }

      analyticsBlockList.forEach(function (analitycsBlockItem) {
        var reg = new RegExp(analitycsBlockItem.pattern);

        if (!reg.test(requestUrl)) {
          return;
        }

        TrackList.appendTrack(currentTabId, {
          requestURL: requestUrl,
          url: currentTabUrl,
          type: analitycsBlockItem.type,
          name: analitycsBlockItem.name,
          patt: analitycsBlockItem.pattern
        });
        SettingsService.setBadgeState(currentTabId, currentTabUrl);
        validationResult = blockObject;
      });
    }

    return validationResult;
  }

  function validateSocial() {
    var socialUrls = ['vk.com', 'vkontakte.ru', 'facebook.com'];
    var isCurrentSiteSocial = socialUrls.some(function (socialUrl) {
      return currentTabUrl.indexOf(socialUrl) !== -1;
    });
    var validationResult = false;
    var socialBlockList = _storageModule.storageCache.blockHash['Social Buttons'] || [];

    if (socialBlockList.length && !isCurrentSiteSocial) {
      socialBlockList.forEach(function (socialBlockItem) {
        var reg = new RegExp(socialBlockItem.pattern);

        if (!reg.test(requestUrl) || socialBlockItem.pattern == "https://vk.com/widget_comments.php") {
          return;
        }

        TrackList.appendTrack(currentTabId, {
          requestURL: requestUrl,
          url: currentTabUrl,
          type: socialBlockItem.type,
          name: socialBlockItem.name,
          patt: socialBlockItem.pattern
        });

        if (currentTabId > -1) {
          SettingsService.setBadgeState(currentTabId, currentTabUrl);
        }

        validationResult = {
          cancel: true
        };
      });
    }

    return validationResult;
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// @param {String} refUrl - url of main_frame request (also contains in `referer` header)
var Tab = function Tab(refUrl) {
  this.baseURL = this._getBaseURL(refUrl);
  this.tracks = [];
};

Tab.prototype = {
  _getBaseURL: function _getBaseURL(url) {
    return url.split('/')[2] || '';
  },
  addTrack: function addTrack(trackData) {
    if (this.isTrackExist(trackData)) {
      trackData.isCopy = true;
    } else {
      trackData.isCopy = false;
    }

    this.tracks.push(trackData);
  },
  // @return {Bool}
  isTrackExist: function isTrackExist(trackData) {
    var isExist = false;
    this.tracks.forEach(function (curTrack) {
      if (curTrack.requestURL === trackData.requestURL || curTrack.name === trackData.name && curTrack.type !== 'Ads') {
        isExist = true;
      }
    });
    return isExist;
  }
};
exports.default = Tab;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var localDataBase = exports.localDataBase = {
  version: "1.0",
  data: {
    patterns: ["46-117-99-111-122-46-114-117-47-109-97-105-110-47-63-97-", "46-121-97-110-100-101-120-46-114-117-47-105-110-102-111-114-109-101-114-", "115-112-121-108-111-103-46-99-111-109-47-99-110-116-63-", "116-111-112-49-48-48-45-105-109-97-103-101-115-46-114-97-109-98-108-101-114-46-114-117-47-116-111-112-49-48-48-47-", "121-97-110-100-101-120-46-114-117-47-99-121-", "46-114-97-109-98-108-101-114-46-114-117-47-99-103-105-45-98-105-110-", "119-119-119-46-97-100-115-104-111-115-116-50-46-99-111-109-47-106-115-47-", "104-105-116-49-56-46-104-111-116-108-111-103-46-114-117-47-99-103-105-45-98-105-110-47-104-111-116-108-111-103-47-99-111-117-110-116-", "99-111-117-110-116-101-114-46-121-97-100-114-111-46-114-117-47-104-105-116-63-", "98-115-46-121-97-110-100-101-120-46-114-117-47-105-110-102-111-114-109-101-114-47-", "118-107-46-99-111-109-47-115-104-97-114-101-46-112-104-112-", "118-107-111-110-116-97-107-116-101-46-114-117-47-115-104-97-114-101-46-112-104-112-", "102-97-99-101-98-111-111-107-92-46-99-111-109-92-47-99-111-110-110-101-99-116-", "99-111-110-110-101-99-116-92-46-102-97-99-101-98-111-111-107-92-46-110-101-116-", "115-116-97-116-105-99-92-46-97-107-92-46-99-111-110-110-101-99-116-92-46-102-97-99-101-98-111-111-107-92-46-99-111-109-92-47-46-42-92-46-106-115-92-46-112-104-112-", "92-47-102-98-99-111-110-110-101-99-116-92-46-106-115-", "119-119-119-92-46-103-111-111-103-108-101-92-46-99-111-109-92-47-102-114-105-101-110-100-99-111-110-110-101-99-116-92-47-115-99-114-105-112-116-92-47-102-114-105-101-110-100-99-111-110-110-101-99-116-92-46-106-115-", "115-116-103-92-46-111-100-110-111-107-108-97-115-115-110-105-107-105-92-46-114-117-92-47-115-104-97-114-101-92-47-111-100-107-108-95-115-104-97-114-101-92-46-106-115-", "100-105-103-103-92-46-99-111-109-92-47-116-111-111-108-115-92-47-119-105-100-103-101-116-106-115-", "99-111-110-110-101-99-116-92-46-109-97-105-108-92-46-114-117-92-47-40-106-115-92-47-108-111-97-100-101-114-92-46-106-115-124-115-104-97-114-101-41-", "112-108-97-116-102-111-114-109-92-46-116-117-109-98-108-114-92-46-99-111-109-92-47-118-49-92-47-40-115-104-97-114-101-92-46-106-115-124-102-111-108-108-111-119-95-98-117-116-116-111-110-92-46-104-116-109-108-41-", "119-105-100-103-101-116-115-92-46-116-119-105-109-103-92-46-99-111-109-92-47-106-92-47-", "40-116-119-101-101-116-109-101-109-101-92-46-99-111-109-92-47-105-92-47-115-99-114-105-112-116-115-92-47-98-117-116-116-111-110-92-46-106-115-124-122-117-108-117-92-46-116-119-101-101-116-109-101-109-101-92-46-99-111-109-92-47-98-117-116-116-111-110-95-97-106-97-120-92-46-106-115-41-", "92-46-114-101-100-100-105-116-92-46-99-111-109-92-47-40-115-116-97-116-105-99-92-47-115-112-114-101-100-100-105-116-124-115-116-97-116-105-99-92-47-98-117-116-116-111-110-124-98-117-116-116-111-110-108-105-116-101-92-46-106-115-124-92-46-101-109-98-101-100-41-", "92-46-117-115-101-114-118-111-105-99-101-92-46-99-111-109-92-47-106-97-118-97-115-99-114-105-112-116-115-92-47-119-105-100-103-101-116-", "119-105-100-103-101-116-115-92-46-100-105-103-103-92-46-99-111-109-", "115-101-114-118-101-114-92-46-105-97-100-92-46-108-105-118-101-112-101-114-115-111-110-92-46-110-101-116-", "119-119-119-92-46-116-117-109-98-108-114-92-46-99-111-109-92-47-100-97-115-104-98-111-97-114-100-92-47-105-102-114-97-109-101-", "100-105-103-103-92-46-99-111-109-92-47-91-48-45-57-97-45-122-65-45-90-93-42-92-47-100-105-103-103-116-104-105-115-92-46-106-115-", "99-111-117-110-116-101-114-92-46-121-97-100-114-111-92-46-114-117-92-47-", "116-119-101-101-116-98-111-97-114-100-92-46-99-111-109-92-47-116-98-92-46-106-115-", "121-97-110-100-101-120-92-46-115-116-92-47-115-104-97-114-101-92-47-", "40-115-104-111-116-115-92-46-115-110-97-112-92-46-99-111-109-92-47-115-110-97-112-95-115-104-111-116-115-92-46-106-115-124-115-112-97-92-46-115-110-97-112-92-46-99-111-109-92-47-115-110-97-112-95-112-114-101-118-105-101-119-95-97-110-121-119-104-101-114-101-92-46-106-115-41-", "117-115-101-114-97-112-105-92-46-99-111-109-92-46-106-115-92-97-112-105-92-111-112-101-110-97-112-105-92-106-115-", "118-107-46-99-111-109-47-119-105-100-103-101-116-95-108-105-107-101-46-112-104-112-", "118-107-46-99-111-109-47-119-105-100-103-101-116-95-99-111-109-109-117-110-105-116-121-", "102-97-99-101-98-111-111-107-92-46-99-111-109-92-47-40-112-108-117-103-105-110-115-124-119-105-100-103-101-116-115-41-92-47-46-42-92-46-112-104-112-", "98-97-100-103-101-92-46-102-97-99-101-98-111-111-107-92-46-99-111-109-", "102-98-99-100-110-92-46-110-101-116-92-47-99-111-110-110-101-99-116-92-46-112-104-112-92-47-106-115-92-47-102-98-92-46-115-104-97-114-101-", "97-112-105-115-92-46-103-111-111-103-108-101-92-46-99-111-109-92-47-106-115-92-47-112-108-117-115-111-110-101-92-46-106-115-", "119-119-119-92-46-108-105-110-107-101-100-105-110-92-46-99-111-109-92-47-99-111-117-110-116-115-101-114-118-92-47-99-111-117-110-116-92-47-115-104-97-114-101-", "112-108-97-116-102-111-114-109-92-100-63-92-46-116-119-105-116-116-101-114-92-46-99-111-109-92-47-119-105-100-103-101-116-115-", "116-119-105-116-116-101-114-46-99-111-109-47-115-104-97-114-101-", "115-117-114-102-105-110-103-98-105-114-100-46-114-117-47-98-117-116-116-111-110-63-", "104-116-116-112-58-47-47-116-111-111-108-115-46-103-111-111-103-108-101-46-99-111-109-47-100-108-112-97-103-101-47-103-97-111-112-116-111-117-116-63-104-108-61-101-110-", "103-111-111-103-108-101-45-97-110-97-108-121-116-105-99-115-46-99-111-109-47-40-117-114-99-104-105-110-46-106-115-124-103-97-46-106-115-41-", "92-46-121-97-110-100-101-120-92-46-114-117-92-47-40-114-101-115-111-117-114-99-101-124-109-101-116-114-105-107-97-41-92-47-119-97-116-99-104-", "119-119-119-92-46-108-105-110-107-101-100-105-110-92-46-99-111-109-92-47-97-110-97-108-121-116-105-99-115-92-40-46-42-92-41-119-105-100-103-101-116-106-115-116-114-97-99-107-105-110-103-", "40-92-46-97-110-97-108-121-116-105-99-115-92-46-121-97-104-111-111-92-46-99-111-109-92-47-105-110-100-101-120-116-111-111-108-115-92-46-106-115-124-121-115-116-97-116-92-46-106-115-124-92-46-121-105-109-103-92-46-99-111-109-92-47-46-42-92-47-121-119-97-92-46-106-115-124-92-46-118-105-115-117-97-108-114-101-118-101-110-117-101-92-46-99-111-109-92-47-41-", "40-92-46-97-110-97-108-121-116-105-99-115-92-46-121-97-104-111-111-92-46-99-111-109-92-47-124-105-110-100-101-120-116-111-111-108-115-92-46-106-115-124-121-115-116-97-116-92-46-106-115-124-92-46-121-105-109-103-92-46-46-42-92-47-121-119-97-92-46-106-115-41-", "92-46-119-51-99-111-117-110-116-101-114-92-46-99-111-109-", "40-115-116-97-116-115-92-46-119-111-114-100-112-114-101-115-115-92-46-99-111-109-92-47-124-115-92-46-115-116-97-116-115-92-46-119-111-114-100-112-114-101-115-115-92-46-99-111-109-92-47-119-92-46-106-115-41-", "92-46-115-116-97-116-99-111-117-110-116-101-114-92-46-99-111-109-92-47-99-111-117-110-116-101-114-92-47-40-99-111-117-110-116-101-114-91-48-45-57-97-45-122-65-45-90-95-93-42-124-102-114-97-109-101-115-41-92-46-106-115-", "92-46-111-98-115-101-114-118-101-114-97-112-112-92-46-99-111-109-92-47-114-101-99-111-114-100-", "40-92-47-115-97-108-111-103-92-46-106-115-92-46-97-115-112-120-124-106-115-92-46-104-117-98-115-112-111-116-92-46-99-111-109-92-47-97-110-97-108-121-116-105-99-115-92-47-41-", "100-92-46-121-105-109-103-92-46-99-111-109-92-47-100-115-92-47-98-97-100-103-101-92-46-106-115-", "116-119-105-116-116-101-114-99-111-117-110-116-101-114-92-46-99-111-109-", "115-116-111-114-97-103-101-92-46-116-114-97-102-105-99-92-46-114-111-92-47-106-115-92-47-116-114-97-102-105-99-92-46-106-115-", "92-46-40-115-99-111-114-101-114-101-115-101-97-114-99-104-124-115-101-99-117-114-101-115-116-117-100-105-101-115-124-115-99-111-114-101-99-97-114-100-114-101-115-101-97-114-99-104-41-92-46-99-111-109-92-47-", "111-112-101-110-115-116-97-116-92-46-110-101-116-92-47-99-110-116-92-46-106-115-", "92-46-119-97-92-46-109-97-114-107-101-116-105-110-103-115-111-108-117-116-105-111-110-115-92-46-121-97-104-111-111-92-46-99-111-109-92-47-115-99-114-105-112-116-92-47-115-99-114-105-112-116-115-101-114-118-108-101-116-", "104-111-116-108-111-103-92-46-114-117-92-47-99-103-105-45-98-105-110-92-47-104-111-116-108-111-103-", "97-110-97-108-121-116-105-99-115-92-46-108-105-118-101-92-46-99-111-109-", "97-100-46-114-97-109-98-108-101-114-46-114-117-47-", "97-100-102-111-120-46-114-117-47-", "116-111-112-46-50-52-115-109-105-46-111-114-103-47-", "112-97-103-101-97-100-50-46-103-111-111-103-108-101-115-121-110-100-105-99-97-116-105-111-110-46-99-111-109-47-", "97-100-45-101-109-101-97-46-", "111-120-110-46-103-101-114-107-111-110-", "97-100-46-109-97-105-108-46-114-117-", "97-100-46-97-100-114-105-118-101-114-46-114-117-", "109-103-46-100-116-48-48-46-110-101-116-", "109-97-114-107-101-116-103-105-100-46-99-111-109-", "112-111-115-116-46-114-109-98-110-46-114-117-", "40-97-110-124-98-115-41-92-46-121-97-110-100-101-120-92-46-114-117-92-47-99-111-100-101-92-47-", "97-110-92-46-121-97-110-100-101-120-92-46-114-117-92-47-40-115-121-115-116-101-109-124-114-101-115-111-117-114-99-101-41-92-47-99-111-110-116-101-120-116-92-46-106-115-", "98-50-98-118-105-100-101-111-92-46-114-117-92-47-", "92-46-97-100-104-97-110-100-115-92-46-114-117-92-47-", "92-46-103-111-111-100-97-100-118-101-114-116-92-46-114-117-92-47-", "103-111-111-103-108-101-92-46-99-111-109-92-47-97-102-115-111-110-108-105-110-101-92-47-115-104-111-119-95-97-102-115-95-97-100-115-92-46-106-115-", "92-46-108-105-115-116-92-46-114-117-92-47-99-111-117-110-116-101-114-", "40-119-105-100-103-101-116-92-46-113-117-97-110-116-99-97-115-116-92-46-99-111-109-124-92-46-113-117-97-110-116-115-101-114-118-101-92-46-99-111-109-92-47-124-92-47-113-117-97-110-116-92-46-106-115-41-", "92-46-116-98-110-92-46-114-117-92-47-", "110-92-46-40-97-100-111-110-119-101-98-124-97-99-116-105-111-110-112-97-121-41-92-46-114-117-92-47-", "99-111-117-110-116-101-114-46-114-97-109-98-108-101-114-46-114-117-", "40-97-100-124-97-100-50-41-46-114-97-109-98-108-101-114-46-114-117-", "40-112-117-98-92-46-108-111-111-107-101-114-121-92-46-99-111-109-92-47-106-115-92-47-124-108-111-111-107-101-114-121-92-46-99-111-109-92-47-108-111-111-107-92-46-106-115-124-92-47-106-92-47-112-117-98-92-47-108-111-111-107-92-46-106-115-41-", "119-119-119-92-46-108-105-106-105-116-92-46-99-111-109-92-47-105-110-102-111-114-109-101-114-115-92-47-119-105-106-105-116-115-", "92-46-103-97-109-101-45-97-100-118-101-114-116-105-115-105-110-103-45-111-110-108-105-110-101-92-46-99-111-109-", "92-46-103-101-116-105-116-111-110-92-46-99-111-109-", "92-46-110-111-115-116-114-105-110-103-115-97-116-116-97-99-104-101-100-92-46-99-111-109-", "92-46-108-105-106-105-116-92-46-99-111-109-92-47-100-101-108-105-118-101-114-121-", "92-46-110-117-103-103-97-100-92-46-110-101-116-", "92-46-102-109-112-117-98-92-46-110-101-116-", "92-46-111-112-101-110-120-101-110-116-101-114-112-114-105-115-101-92-46-99-111-109-", "92-46-111-112-101-110-120-92-46-40-111-114-103-124-110-101-116-41-", "92-47-40-97-100-103-124-97-100-120-124-102-108-41-92-46-106-115-", "92-47-40-97-102-114-124-97-106-115-124-97-118-119-124-115-112-99-106-115-124-108-103-124-97-103-41-92-46-112-104-112-", "92-46-97-115-115-111-99-45-97-109-97-122-111-110-92-46-40-99-111-109-124-99-97-124-99-111-92-46-117-107-124-100-101-124-102-114-124-106-112-41-92-47-40-101-92-47-105-114-124-115-92-47-40-97-100-115-92-46-106-115-124-97-115-119-92-46-106-115-124-108-105-110-107-45-101-110-104-97-110-99-101-114-124-105-109-112-114-101-115-115-105-111-110-45-99-111-117-110-116-101-114-41-41-", "114-99-109-45-99-97-92-46-97-109-97-122-111-110-92-46-99-97-92-47-101-92-47-99-109-", "114-99-109-45-117-107-92-46-97-109-97-122-111-110-92-46-99-111-92-46-117-107-92-47-101-92-47-99-109-", "114-99-109-45-100-101-92-46-97-109-97-122-111-110-92-46-100-101-92-47-101-92-47-99-109-", "114-99-109-45-114-117-92-46-97-109-97-122-111-110-92-46-114-117-92-47-101-92-47-99-109-", "119-109-115-92-46-97-115-115-111-99-45-97-109-97-122-111-110-92-46-99-111-109-", "92-46-97-109-97-122-111-110-92-45-97-100-115-121-115-116-101-109-92-46-99-111-109-", "40-92-46-102-101-101-100-98-117-114-110-101-114-92-46-99-111-109-92-47-126-102-124-102-101-101-100-112-114-111-120-121-92-46-103-111-111-103-108-101-92-46-99-111-109-92-47-126-102-99-92-47-41-", "40-92-46-103-111-111-103-108-101-115-121-110-100-105-99-97-116-105-111-110-92-46-99-111-109-92-47-112-97-103-101-97-100-92-47-124-103-111-111-103-108-101-116-97-103-115-101-114-118-105-99-101-115-92-46-99-111-109-92-47-116-97-103-92-47-106-115-92-47-103-112-116-92-46-106-115-124-112-97-114-116-110-101-114-92-46-103-111-111-103-108-101-97-100-115-101-114-118-105-99-101-115-92-46-99-111-109-92-47-103-97-109-112-97-100-92-47-124-102-101-101-100-97-100-115-92-46-103-92-46-100-111-117-98-108-101-99-108-105-99-107-92-46-110-101-116-92-47-126-97-116-41-", "92-46-109-97-105-108-92-46-114-117-92-47-99-111-117-110-116-101-114-", "103-111-111-103-108-101-92-46-99-111-109-92-47-97-100-115-101-110-115-101-92-47-115-101-97-114-99-104-92-47-97-100-115-92-46-106-115-", "92-46-97-100-109-117-108-116-105-92-46-99-111-109-", "92-46-109-97-120-108-97-98-92-46-114-117-92-47-", "92-46-103-111-111-103-108-101-115-121-110-100-105-99-97-116-105-111-110-92-46-99-111-109-92-47-97-112-112-115-92-47-100-111-109-97-105-110-112-97-114-107-92-47-", "97-100-92-46-100-111-117-98-108-101-99-108-105-99-107-92-46-110-101-116-", "100-101-115-116-105-110-97-116-105-111-110-117-114-108-92-46-99-111-109-", "92-46-100-111-117-98-108-101-99-108-105-99-107-92-46-110-101-116-92-47-112-97-103-101-97-100-92-47-", "97-100-45-103-92-46-100-111-117-98-108-101-99-108-105-99-107-92-46-110-101-116-", "92-46-97-100-114-105-118-101-114-92-46-114-117-92-47-", "40-116-97-99-111-100-97-95-97-109-115-95-100-100-99-95-104-101-97-100-101-114-92-46-106-115-124-92-46-116-97-99-111-100-97-92-46-110-101-116-41-", "40-114-109-92-46-121-105-101-108-100-109-97-110-97-103-101-114-92-46-99-111-109-92-47-124-97-100-92-46-121-105-101-108-100-109-97-110-97-103-101-114-92-46-99-111-109-92-47-124-111-112-116-105-109-105-122-101-100-98-121-92-46-114-109-120-97-100-115-92-46-99-111-109-124-101-92-46-121-105-101-108-100-109-97-110-97-103-101-114-92-46-110-101-116-92-47-115-99-114-105-112-116-92-46-106-115-41-", "97-100-92-46-121-105-101-108-100-109-97-110-97-103-101-114-92-46-99-111-109-92-47-112-105-120-101-108-", "92-46-116-104-101-119-104-101-101-108-111-102-92-46-99-111-109-", "99-111-110-116-101-110-116-92-46-121-105-101-108-100-109-97-110-97-103-101-114-92-46-99-111-109-92-47-40-114-109-116-97-103-51-124-114-109-105-41-92-46-106-115-", "97-100-92-46-121-105-101-108-100-109-97-110-97-103-101-114-92-46-110-101-116-", "92-46-121-108-100-109-103-114-105-109-103-92-46-110-101-116-", "92-46-112-111-105-110-116-114-111-108-108-92-46-99-111-109-", "40-112-105-120-101-108-124-111-112-116-105-109-105-122-101-100-45-98-121-124-116-97-112-45-99-100-110-41-92-46-114-117-98-105-99-111-110-112-114-111-106-101-99-116-92-46-99-111-109-92-47-", "40-103-97-109-101-108-101-97-100-115-92-46-114-117-92-47-124-99-105-116-121-97-100-115-92-46-114-117-92-47-41-", "92-46-40-115-112-104-101-114-101-124-115-117-114-112-104-97-99-101-41-92-46-99-111-109-92-47-119-105-100-103-101-116-115-92-47-115-112-104-101-114-101-105-116-92-47-106-115-", "92-46-99-114-105-116-101-111-92-46-99-111-109-", "92-46-115-104-97-114-101-116-104-92-46-114-117-92-47-", "40-97-100-115-124-97-100-115-49-41-92-46-109-115-110-92-46-99-111-109-92-47-108-105-98-114-97-114-121-92-47-100-97-112-92-46-106-115-", "92-46-97-100-101-97-115-121-92-46-114-117-92-47-", "97-100-115-121-110-100-105-99-97-116-105-111-110-92-46-109-115-110-92-46-99-111-109-92-47-100-101-108-105-118-101-114-121-92-47-103-101-116-97-100-115-92-46-106-115-", "92-46-97-100-98-114-105-116-101-92-46-99-111-109-", "97-100-115-92-46-98-108-111-103-104-101-114-97-100-115-92-46-99-111-109-92-47-", "111-92-46-97-111-108-99-100-110-92-46-99-111-109-92-47-40-97-100-115-92-47-97-100-115-119-114-97-112-112-101-114-124-111-115-92-47-97-111-108-92-47-98-101-97-99-111-110-92-46-109-105-110-92-46-106-115-41-", "92-46-97-100-109-97-115-116-101-114-92-46-110-101-116-", "40-92-46-99-111-110-116-101-110-116-92-46-114-117-52-92-46-99-111-109-92-47-105-109-97-103-101-115-92-47-124-92-46-101-100-103-101-92-46-114-117-52-92-46-99-111-109-92-47-115-109-97-114-116-115-101-114-118-101-92-47-124-92-46-120-112-49-92-46-114-117-52-92-46-99-111-109-92-47-124-97-100-92-46-120-112-108-117-115-111-110-101-92-46-99-111-109-92-47-124-92-47-120-112-108-117-115-49-92-47-120-112-49-92-46-106-115-41-", "111-92-46-97-111-108-99-100-110-92-46-99-111-109-92-47-106-115-92-47-109-103-50-92-46-106-115-", "40-114-49-92-46-97-99-101-124-97-99-101-45-116-97-103-124-115-101-114-118-101-100-98-121-124-117-97-99-41-92-46-97-100-118-101-114-116-105-115-105-110-103-92-46-99-111-109-", "92-46-97-116-119-111-108-97-92-46-99-111-109-92-47-", "92-46-98-108-111-103-97-100-115-92-46-99-111-109-", "92-46-99-112-120-105-110-116-101-114-97-99-116-105-118-101-92-46-99-111-109-", "97-100-115-101-114-118-105-110-103-92-46-99-112-120-97-100-114-111-105-116-92-46-99-111-109-", "40-92-46-109-101-100-105-97-112-108-101-120-92-46-99-111-109-124-92-46-102-97-115-116-99-108-105-99-107-92-46-110-101-116-41-92-47-", "117-116-97-114-103-101-116-92-46-114-117-92-47-106-115-99-108-99-107-", "40-92-46-98-117-114-115-116-98-101-97-99-111-110-92-46-99-111-109-92-47-124-92-46-98-117-114-115-116-110-101-116-92-46-99-111-109-92-47-41-", "40-92-46-97-100-114-101-118-111-108-118-101-114-92-46-99-111-109-124-97-100-115-92-46-98-108-117-101-108-105-116-104-105-117-109-92-46-99-111-109-41-92-47-", "92-46-101-120-101-108-97-116-111-114-92-46-99-111-109-92-47-", "40-92-46-114-101-97-108-109-101-100-105-97-100-105-103-105-116-97-108-92-46-99-111-109-124-92-46-114-101-97-108-109-101-100-105-97-92-46-99-111-109-92-47-124-92-46-50-52-55-114-101-97-108-109-101-100-105-97-92-46-99-111-109-124-114-101-97-108-109-101-100-105-97-92-47-97-100-115-92-47-41-", "114-101-99-114-101-97-116-105-118-92-46-114-117-92-47-", "92-47-115-99-114-105-112-116-115-92-47-111-97-115-95-97-110-97-108-121-116-105-99-115-92-46-106-115-", "92-46-115-112-101-99-105-102-105-99-99-108-105-99-107-92-46-110-101-116-92-47-", "92-46-114-109-98-110-92-46-114-117-92-47-", "92-46-99-111-108-108-101-99-116-105-118-101-45-109-101-100-105-97-92-46-110-101-116-92-47-", "114-111-118-101-114-92-46-101-98-97-121-92-46-99-111-109-92-47-", "92-46-98-101-103-117-110-92-46-114-117-92-47-", "92-46-118-105-115-117-97-108-100-110-97-92-46-99-111-109-", "92-47-40-104-116-109-108-124-105-109-97-103-101-124-106-115-41-92-46-110-103-92-47-", "116-114-97-99-107-92-46-114-111-105-115-101-114-118-105-99-101-92-46-99-111-109-92-47-116-114-97-99-107-92-47-", "92-46-114-92-46-109-115-110-92-46-99-111-109-92-47-115-99-114-105-112-116-115-92-47-109-105-99-114-111-115-111-102-116-95-97-100-99-101-110-116-101-114-99-111-110-118-101-114-115-105-111-110-92-46-106-115-", "92-46-104-105-116-92-46-117-97-92-47-", "92-46-117-110-100-101-114-99-108-105-99-107-92-46-114-117-92-47-", "92-46-115-109-97-114-116-98-110-92-46-114-117-92-47-", "92-46-114-111-108-108-97-100-92-46-114-117-92-47-", "108-111-118-101-97-100-118-101-114-116-92-46-114-117-92-47-", "98-50-98-99-111-110-116-101-120-116-92-46-114-117-92-47-", "92-46-109-97-103-110-97-92-46-114-117-92-47-", "92-46-97-100-109-105-116-97-100-92-46-99-111-109-", "92-46-105-112-114-111-109-111-116-101-92-46-99-111-109-", "92-46-112-111-119-101-114-108-105-110-107-115-92-46-99-111-109-", "92-46-106-117-115-116-114-101-108-101-118-97-110-116-92-46-99-111-109-", "92-46-117-110-114-117-108-121-109-101-100-105-97-92-46-99-111-109-", "92-46-121-97-115-104-105-92-46-99-111-109-", "92-46-97-100-52-109-97-116-92-46-40-97-114-124-97-116-124-98-101-124-98-103-124-98-114-124-99-104-124-99-111-92-46-117-107-124-99-122-124-100-101-124-100-107-124-101-115-124-102-105-124-102-114-124-103-114-124-104-117-124-105-116-124-109-120-124-110-101-116-124-110-108-124-110-111-124-112-108-124-114-111-124-114-117-124-115-101-124-116-114-41-92-47-", "92-46-109-101-100-105-97-108-97-110-100-92-46-114-117-92-47-", "97-109-49-48-92-46-114-117-92-47-99-111-100-101-", "92-46-109-101-100-105-97-103-114-97-92-46-99-111-109-", "92-46-97-100-103-111-116-111-92-46-99-111-109-", "97-100-101-100-121-92-46-99-111-109-92-47-99-114-101-97-116-105-118-101-115-", "92-46-100-105-114-101-99-116-97-100-118-101-114-116-92-46-114-117-92-47-", "40-108-117-120-117-112-92-46-114-117-92-47-124-92-46-97-100-108-97-98-115-92-46-114-117-92-47-41-", "92-46-107-97-118-97-110-103-97-92-46-114-117-92-47-", "97-112-105-92-46-116-111-112-116-101-110-114-101-118-105-101-119-115-92-46-99-111-109-", "97-100-115-92-46-97-100-112-118-92-46-99-111-109-", "92-46-115-109-97-114-116-52-97-100-115-92-46-99-111-109-92-47-115-109-97-114-116-52-97-100-115-", "92-46-97-100-109-101-100-105-97-92-46-99-111-109-", "92-46-118-105-100-105-103-105-116-97-108-92-46-114-117-92-47-", "92-46-40-97-100-102-111-120-124-97-100-119-111-108-102-41-92-46-114-117-92-47-", "92-46-97-100-117-108-116-102-114-105-101-110-100-102-105-110-100-101-114-92-46-99-111-109-", "97-100-115-101-114-118-101-114-92-46-97-100-118-101-114-116-105-115-101-115-112-97-99-101-92-46-99-111-109-", "107-111-110-97-92-46-107-111-110-116-101-114-97-92-46-99-111-109-92-47-106-97-118-97-115-99-114-105-112-116-92-47-", "97-100-115-92-46-97-100-118-101-114-116-105-115-101-115-112-97-99-101-92-46-99-111-109-", "100-105-110-99-108-105-110-120-92-46-99-111-109-", "92-46-40-118-105-100-101-111-99-108-105-99-107-124-118-105-100-101-111-99-108-105-107-41-92-46-114-117-92-47-", "119-119-119-92-46-103-111-111-103-108-101-97-100-115-101-114-118-105-99-101-115-92-46-99-111-109-92-47-112-97-103-101-97-100-92-47-99-111-110-118-101-114-115-105-111-110", "104-116-116-112-58-47-47-118-107-46-99-111-109-47-119-105-100-103-101-116-95-99-111-109-109-101-110-116-115-46-112-104-112-", "118-107-46-99-111-109-47-119-105-100-103-101-116-95-99-111-109-109-117-110-105-116-121-46-112-104-112-", "102-97-99-101-98-111-111-107-46-99-111-109-47-112-108-117-103-105-110-115-47-99-111-109-109-101-110-116-115-46-112-104-112-"],
    names: ["84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "65-100-32-115-101-114-118-105-99-101-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "65-100-32-115-101-114-118-105-99-101-", "86-107-111-110-116-97-107-116-101-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "86-107-111-110-116-97-107-116-101-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "70-97-99-101-98-111-111-107-32-67-111-110-110-101-99-116-", "70-97-99-101-98-111-111-107-32-67-111-110-110-101-99-116-", "70-97-99-101-98-111-111-107-32-67-111-110-110-101-99-116-", "70-97-99-101-98-111-111-107-32-67-111-110-110-101-99-116-", "71-111-111-103-108-101-32-70-114-105-101-110-100-67-111-110-110-101-99-116-", "79-100-110-111-107-108-97-115-115-110-105-107-105-32-87-105-100-103-101-116-", "68-105-103-103-32-87-105-100-103-101-116-", "77-97-105-108-46-114-117-32-119-105-100-103-101-116-", "84-117-109-98-108-114-32-66-117-116-116-111-110-115-", "84-119-105-116-116-101-114-32-66-97-100-103-101-", "84-119-101-101-116-77-101-109-101-", "82-101-100-100-105-116-", "85-115-101-114-86-111-105-99-101-", "68-105-103-103-32-87-105-100-103-101-116-", "76-105-118-101-80-101-114-115-111-110-", "84-117-109-98-108-114-32-68-97-115-104-98-111-97-114-100-", "68-105-103-103-84-104-105-115-", "76-105-118-101-73-110-116-101-114-110-101-116-", "84-119-101-101-116-98-111-97-114-100-", "89-97-110-100-101-120-46-65-80-73-", "83-110-97-112-", "86-107-111-110-116-97-107-116-101-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "86-107-111-110-116-97-107-116-101-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "86-107-111-110-116-97-107-116-101-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "70-97-99-101-98-111-111-107-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "70-97-99-101-98-111-111-107-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "70-97-99-101-98-111-111-107-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "71-111-111-103-108-101-32-43-49-", "76-105-110-107-101-100-73-110-32-66-117-116-116-111-110-", "84-119-105-116-116-101-114-32-66-117-116-116-111-110-", "84-119-105-116-116-101-114-32-66-117-116-116-111-110-", "83-117-114-102-32-66-117-116-116-111-110-", "71-111-111-103-108-101-32-65-110-97-108-121-116-105-99-115-", "71-111-111-103-108-101-32-65-110-97-108-121-116-105-99-115-", "89-97-110-100-101-120-32-77-101-116-114-105-107-97-", "76-105-110-107-101-100-73-110-", "89-97-104-111-111-32-65-110-97-108-121-116-105-99-115-", "89-97-104-111-111-32-65-110-97-108-121-116-105-99-115-", "87-51-67-111-117-110-116-101-114-", "87-111-114-100-112-114-101-115-115-32-83-116-97-116-115-", "83-116-97-116-99-111-117-110-116-101-114-", "79-98-115-101-114-118-101-114-", "72-117-98-83-112-111-116-", "89-97-104-111-111-33-32-66-117-122-122-", "84-119-105-116-116-101-114-67-111-117-110-116-101-114-", "84-114-97-102-105-99-", "83-99-111-114-101-67-97-114-100-32-82-101-115-101-97-114-99-104-32", "79-112-101-110-115-116-97-116-", "89-97-104-111-111-32-83-101-97-114-99-104-32-77-97-114-107-101-116-105-110-103-32-65-110-97-108-121-116-105-99-115-", "72-111-116-76-111-103-", "77-105-99-114-111-115-111-102-116-32-65-110-97-108-121-116-105-99-115-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "84-114-97-99-107-105-110-103-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "84-114-97-99-107-105-110-103-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "84-114-97-99-107-105-110-103-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "65-100-32-115-101-114-118-105-99-101-", "86-107-111-110-116-97-107-116-101-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "86-107-111-110-116-97-107-116-101-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-", "86-107-111-110-116-97-107-116-101-32-83-111-99-105-97-108-32-80-108-117-103-105-110-115-"],
    types: ["84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "65-100-115-", "84-114-97-99-107-105-110-103-", "84-114-97-99-107-105-110-103-", "65-100-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "87-101-98-32-65-110-97-108-121-116-105-99-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "84-114-97-99-107-105-110-103-", "65-100-115-", "65-100-115-", "65-100-115-", "84-114-97-99-107-105-110-103-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "84-114-97-99-107-105-110-103-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "65-100-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-", "83-111-99-105-97-108-32-66-117-116-116-111-110-115-"],
    socialURLs: ["vkontakte.ru", "vk.com", "facebook.com", "fb.com"],
    socialBlocksIds: ["left_ads%", "left_ads%", "", "", ""],
    socialBlocksClasses: ["", "", "ego_column%ego_section%ego_unit ego_unit_no_top_border", "ego_column%ego_section%ego_unit ego_unit_no_top_border", ""]
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

var _$global = __webpack_require__(2);

var $global = _interopRequireWildcard(_$global);

var _settingsService = __webpack_require__(3);

var SettingService = _interopRequireWildcard(_settingsService);

var _blockedNodesModule = __webpack_require__(18);

var BlockedNodesModule = _interopRequireWildcard(_blockedNodesModule);

var _trackList = __webpack_require__(4);

var TrackList = _interopRequireWildcard(_trackList);

var _exceptionService = __webpack_require__(6);

var ExceptionsService = _interopRequireWildcard(_exceptionService);

var _databaseModule = __webpack_require__(7);

var DatabaseModule = _interopRequireWildcard(_databaseModule);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function init() {
  browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.action) {
      case 'updateBadge':
        SettingService.getActiveTab(function (tab) {
          SettingService.tabURL = tab.url;
          SettingService.tabId = tab.id; // Schit code, need to normalize domain name!

          var normalizeURL = $global.getDomain(SettingService.tabURL); // http://www.site.com/ => http://www.site.com

          SettingService.setBadgeState(SettingService.tabId, normalizeURL);
        });
        break;

      case 'getOptions':
        SettingService.getOptions(sendResponse);
        break;

      case 'checkUrl':
        SettingService.checkUrl(request, sendResponse);
        break;

      case 'saveBlocks':
        BlockedNodesModule.saveBlocks(request);
        break;

      case 'clearBlocks':
        BlockedNodesModule.clearBlocks(request);
        break;

      case 'clearBlockRule':
        BlockedNodesModule.clearBlockRule(request);
        break;

      case 'getBlocked':
        // передача элементов, которые были заблокированы в текущем табе
        var blockedItems = TrackList.getAllTracks(SettingService.tabId);
        sendResponse(blockedItems);
        break;

      case 'refreshSpecial':
        // used add popup (when change at drop down)
        var urls = request.listOfUrls || [$global.getBaseURL(SettingService.tabURL)];
        browser.tabs.query({}, function (tabs) {
          for (var i = 0; i < tabs.length; i++) {
            browser.tabs.sendMessage(tabs[i].id, {
              action: 'refreshSpecial',
              urls: JSON.stringify(urls)
            });
          }
        });
        break;

      case 'updateDatabase':
        DatabaseModule.updateSettings().then(function () {
          sendResponse({});
        });
        break;

      case 'getInformationForPopup':
        var tabDomain = $global.getBaseURL(SettingService.tabURL || '');
        var tracks = TrackList.getTracksForPopup(SettingService.tabId, tabDomain);
        var flashException = ExceptionsService.getException('flash');
        var adsException = ExceptionsService.getException('ads');
        sendResponse({
          tracks: tracks,
          flashException: flashException,
          adsException: adsException
        });
        break;

      case 'removeException':
        ExceptionsService.removeException(request.type);
        break;

      case 'addException':
        ExceptionsService.addException(request.type, request.allow);
        break;
    }

    return true;
  });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveBlocks = saveBlocks;
exports.clearBlocks = clearBlocks;
exports.clearBlockRule = clearBlockRule;

var _storageModule = __webpack_require__(0);

//saveBlocks
function saveBlocks(request) {
  var blockParts = [];

  if (_storageModule.storageCache.blockParts) {
    blockParts = _storageModule.storageCache.blockParts;
  }

  if (request.blocks) {
    request.blocks.forEach(function (blockedItem) {
      blockParts.push({
        baseURL: blockedItem.baseURL,
        searchString: blockedItem.searchString,
        DOMstring: blockedItem.DOMstring
      });
    });
  }

  var urls = [];

  for (var i = 0; i < blockParts.length; i++) {
    var exist = false;

    for (var j = 0; j < urls.length; j++) {
      if (urls[j] == blockParts[i].baseURL) {
        exist = true;
        break;
      }
    }

    if (!exist) {
      urls.push(blockParts[i].baseURL);
    }
  }

  (0, _storageModule.setToStorage)({
    blockParts: blockParts
  });
  var siteUrl = request.siteUrl;
  browser.tabs.query({}, function (tabs) {
    for (var _i = 0; _i < tabs.length; _i++) {
      if (!tabs[_i].active) {
        browser.tabs.sendMessage(tabs[_i].id, {
          action: 'refreshSpecial',
          siteUrl: siteUrl
        });
      }
    }
  });
}

function clearBlocks(request) {
  var blockParts = void 0;
  var removedDomain = request.siteUrl || '';

  if (_storageModule.storageCache.blockParts && _storageModule.storageCache.blockParts != 'null') {
    blockParts = _storageModule.storageCache.blockParts;
  } else {
    blockParts = [];
  }

  if (Array.isArray(blockParts) && removedDomain) {
    var list = blockParts.filter(function (obj) {
      return obj.baseURL != removedDomain;
    });
    (0, _storageModule.setToStorage)({
      blockParts: list
    });
    var siteUrl = request.siteUrl;
    browser.tabs.query({}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        if (!tabs[i].active) {
          browser.tabs.sendMessage(tabs[i].id, {
            action: 'refreshSpecial',
            siteUrl: siteUrl
          });
        }
      }
    });
  }
} // clear single rule


function clearBlockRule(request) {
  var blockParts = void 0;

  if (_storageModule.storageCache.blockParts && _storageModule.storageCache.blockParts != 'null') {
    blockParts = _storageModule.storageCache.blockParts;
  } else {
    blockParts = [];
  }

  if (Array.isArray(blockParts) && request.siteUrl) {
    var list = blockParts.filter(function (obj) {
      return obj.baseURL != request.siteUrl || obj.DOMstring != request.domString;
    });
    (0, _storageModule.setToStorage)({
      blockParts: list
    });
  }

  var siteUrl = request.siteUrl;
  browser.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (!tabs[i].active) {
        browser.tabs.sendMessage(tabs[i].id, {
          action: 'refreshSpecial',
          siteUrl: siteUrl
        });
      }
    }
  });
}

/***/ })
/******/ ]);