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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(33);


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pageHelpers = __webpack_require__(1);

var _storageModule = __webpack_require__(0);

window.addEventListener('DOMContentLoaded', function () {
  (0, _storageModule.initCache)(getTraksInformation);
  checkIsDOMContentLoaded();
});

function getTraksInformation() {
  browser.runtime.sendMessage({
    action: 'getInformationForPopup'
  }, function (request) {
    optionsInit(request.tracks, request.flashException, request.adsException);
  });
}

function checkIsDOMContentLoaded() {
  try {
    browser.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var isSystemPage = (0, _pageHelpers.checkIsPageSystem)(tabs[0].url);

      if (isSystemPage) {
        return;
      }

      browser.tabs.sendMessage(tabs[0].id, {
        action: 'checkIsDOMContentLoaded'
      }, function (data) {
        if (data && data.isDOMContentLoaded) {
          setControlsDisabledState(false);
        } else {
          setTimeout(checkIsDOMContentLoaded, 100);
        }
      });
    });
  } catch (error) {
    setTimeout(checkIsDOMContentLoaded, 100);
  }
}

function setControlsDisabledState(state) {
  (0, _pageHelpers.findElementById)('flashsettings').disabled = state;
  (0, _pageHelpers.findElementById)('adssettings').disabled = state;
  (0, _pageHelpers.findElementById)('switchMode').disabled = state;
}

function optionsInit(tracks, flashException, adsException) {
  (0, _pageHelpers.localize)();
  var analyticsblock = (0, _pageHelpers.findElementById)('analyticsblock');
  var analyticscountblock = (0, _pageHelpers.findElementById)('analyticscount');
  var analyticslistblock = (0, _pageHelpers.findElementById)('analyticslist');
  var analyticscount = 0;
  var socialblock = (0, _pageHelpers.findElementById)('socialblock');
  var socialcountblock = (0, _pageHelpers.findElementById)('socialcount');
  var sociallistblock = (0, _pageHelpers.findElementById)('sociallist');
  var socialcount = 0;
  var trackblock = (0, _pageHelpers.findElementById)('trackblock');
  var trackcountblock = (0, _pageHelpers.findElementById)('trackcount');
  var tracklistblock = (0, _pageHelpers.findElementById)('tracklist');
  var trackcount = 0;
  var flashSelect = (0, _pageHelpers.findElementById)('flashsettings');
  var adsSelect = (0, _pageHelpers.findElementById)('adssettings');
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    var tabUrl = tabs[0].url;
    var isCurrentSystem = (0, _pageHelpers.checkIsPageSystem)(tabUrl);

    if (isCurrentSystem) {
      flashSelect.disabled = true;
      adsSelect.disabled = true;
      (0, _pageHelpers.findElementById)('switchMode').disabled = true;
    }
  });
  (0, _pageHelpers.findElementById)('analyticsheader').addEventListener('click', function () {
    toggleList(analyticsblock);
  }, true);
  (0, _pageHelpers.findElementById)('socialheader').addEventListener('click', function () {
    toggleList(socialblock);
  }, true);
  (0, _pageHelpers.findElementById)('trackheader').addEventListener('click', function () {
    toggleList(trackblock);
  }, true);
  (0, _pageHelpers.findElementById)('settingsButton').addEventListener('click', function () {
    browser.runtime.openOptionsPage();
    window.close();
  }, true);
  (0, _pageHelpers.findElementById)('switchMode').addEventListener('click', function () {
    browser.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var currentTab = tabs[0];
      browser.tabs.sendMessage(currentTab.id, {
        action: 'blockMode'
      }, function () {
        window.close();
      });
    });
  }, true);

  if (tracks) {
    tracks.forEach(function (track) {
      if (track.type == 'Web Analytics') {
        analyticscount++;
        createItem(analyticscount, analyticsblock, analyticscountblock, analyticslistblock, track.name);
      } else if (track.type == 'Social Buttons') {
        socialcount++;
        createItem(socialcount, socialblock, socialcountblock, sociallistblock, track.name);
      } else if (track.type == 'Tracking') {
        trackcount++;
        createItem(trackcount, trackblock, trackcountblock, tracklistblock, track.name);
      }
    });
  }

  if (analyticscount == 0) {
    analyticsblock.style.opacity = '0.7';
    analyticsblock.setAttribute('notexist', 'true');
  }

  if (socialcount == 0) {
    socialblock.style.opacity = '0.7';
    socialblock.setAttribute('notexist', 'true');
  } // TODO change option list by enabled property!


  if (_storageModule.storageCache.flashEnabled) {
    flashSelect.value = 'defaultAllow';
    document.querySelector('#flashsettings option[value=defaultDeny]').remove();
  } else {
    flashSelect.value = 'defaultDeny';
    document.querySelector('#flashsettings option[value=defaultAllow]').remove();
  }

  if (flashException != null) {
    if (flashException.allow) {
      flashSelect.value = 'allowHere';
    } else {
      flashSelect.value = 'denyHere';
    }
  }

  if (_storageModule.storageCache.adsEnabled) {
    adsSelect.value = 'defaultAllow';
    document.querySelector('#adssettings option[value=defaultDeny]').remove();
  } else {
    adsSelect.value = 'defaultDeny';
    document.querySelector('#adssettings option[value=defaultAllow]').remove();
  }

  if (adsException != null) {
    if (adsException.allow) {
      adsSelect.value = 'allowHere';
    } else {
      adsSelect.value = 'denyHere';
    }
  }

  document.querySelector('select[name="flashsettings"]').addEventListener('change', function (event) {
    var target = event.target;

    if (target.value == 'defaultAllow') {
      (0, _storageModule.setToStorage)({
        flashEnabled: true
      });
      browser.runtime.sendMessage({
        action: 'removeException',
        type: 'flash'
      });
    } else if (target.value == 'defaultDeny') {
      (0, _storageModule.setToStorage)({
        flashEnabled: false
      });
      browser.runtime.sendMessage({
        action: 'removeException',
        type: 'flash'
      });
    } else if (target.value == 'allowHere') {
      browser.runtime.sendMessage({
        action: 'addException',
        type: 'flash',
        allow: true
      });
    } else if (target.value == 'denyHere') {
      browser.runtime.sendMessage({
        action: 'addException',
        type: 'flash',
        allow: false
      });
    }

    browser.runtime.sendMessage({
      action: 'refreshSpecial'
    });
    reloadOptionPage();
  });
  document.querySelector('select[name="adssettings"]').addEventListener('change', function (event) {
    var target = event.target;

    if (target.value == 'defaultAllow') {
      browser.runtime.sendMessage({
        action: 'removeException',
        type: 'ads'
      });
    } else if (target.value == 'defaultDeny') {
      browser.runtime.sendMessage({
        action: 'removeException',
        type: 'ads'
      });
    } else if (target.value == 'allowHere') {
      browser.runtime.sendMessage({
        action: 'addException',
        type: 'ads',
        allow: true
      });
    } else if (target.value == 'denyHere') {
      browser.runtime.sendMessage({
        action: 'addException',
        type: 'ads',
        allow: false
      });
    }

    browser.runtime.sendMessage({
      action: 'refreshSpecial'
    });
    reloadOptionPage();
  });
  var sw = (0, _pageHelpers.findElementById)('switchMode');
  sw.parentNode.className = 'switchitem';
  sw.innerHTML = browser.i18n.getMessage('switchOn');
  var menu = document.querySelector('.lc_menu_wrap');

  menu.onclick = function (event) {
    var target = event.target;

    if (!target.dataset.id) {
      target = target.parentNode;
    }

    switch (target.dataset.id) {
      case 'ads':
        var clist = target.classList;

        if (!clist.contains('lc_menu_process') && !clist.contains('lc_menu_completed')) {
          clist.add('lc_menu_process');
          setTimeout(function () {
            clist.add('lc_menu_completed');
            clist.remove('lc_menu_process'); // Thank you! Your message has been sent

            target.textContent = browser.i18n.getMessage('messageSend');
          }, 1000);
        }

        break;

      case 'settings':
        browser.runtime.openOptionsPage();
        window.close();
        break;

      case 'site':
        browser.tabs.create({
          url: 'https://drweb.com'
        });
        break;
    }
  };
}

function createItem(count, block, countblock, listblock, itemname) {
  countblock.innerText = count;
  listblock.appendChild(createItemBlock(itemname));
}

function createItemBlock(name) {
  var item = document.createElement('div');
  item.innerText = name;
  item.setAttribute('class', 'item');
  return item;
}

function toggleList(list) {
  if (list.getAttribute('expanded') == 'false') list.setAttribute('expanded', 'true');else list.setAttribute('expanded', 'false');
}

function reloadOptionPage() {
  browser.tabs.query({
    url: browser.runtime.getURL('/content/options.html')
  }, function (tabs) {
    var tabIndex = tabs.length;

    while (tabIndex--) {
      tabs[tabIndex].id && browser.tabs.reload(tabs[tabIndex].id);
    }
  });
}

/***/ })

/******/ });