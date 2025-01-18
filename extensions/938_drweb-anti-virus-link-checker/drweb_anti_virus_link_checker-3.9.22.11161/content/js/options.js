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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(28);


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _punycode = __webpack_require__(29);

var _punycode2 = _interopRequireDefault(_punycode);

var _pageHelpers = __webpack_require__(1);

var _storageModule = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Global = {
  // Some helpers
  _DOMAIN_REG: /^(?:https?:\/\/)?([^\/?:#]*)/i,
  // get Domain 
  getDomain: function getDomain(urlStr) {
    var parseDomain = this._DOMAIN_REG.exec(urlStr);

    return Array.isArray(parseDomain) && parseDomain[1];
  },
  containsNonLatinSymbols: function containsNonLatinSymbols(str) {
    return /[^.\-_a-z\w]/.test(str);
  }
};
var adsExceptions = [];
var flashExceptions = [];
var urlsToRefresh = [];
var PopupService = {
  outer: undefined,
  inner: undefined,
  // @param {HTMLElement} outerNode
  init: function init(outerNode, innerNode) {
    this.outer = outerNode;
    this.inner = innerNode;
  },
  open: function open() {
    this.outer.style.display = '';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    document.body.style.position = 'fixed';
  },
  hide: function hide() {
    this.outer.style.display = 'none';
    document.body.style.height = '';
    document.body.style.width = '';
    document.body.style.position = '';
  }
};
window.addEventListener('DOMContentLoaded', function () {
  (0, _storageModule.initCache)(optionsInit);
}); //initialize

function optionsInit() {
  (0, _pageHelpers.localize)();
  var popupBack = (0, _pageHelpers.findElementById)('popupback');
  PopupService.init(popupBack);
  popupBack.addEventListener('click', function () {
    (0, _pageHelpers.findElementById)('adsExceptionTable').innerHTML = '';
    (0, _pageHelpers.findElementById)('siteURL2').value = '';
    (0, _pageHelpers.findElementById)('adsPopup').style.display = 'none';
    (0, _pageHelpers.findElementById)('flashExceptionTable').innerHTML = '';
    (0, _pageHelpers.findElementById)('siteURL').value = '';
    (0, _pageHelpers.findElementById)('flashPopup').style.display = 'none';
    PopupService.hide();
  });
  (0, _pageHelpers.findElementById)('popupback_column').addEventListener('click', function (event) {
    event.stopPropagation();
  });
  (0, _pageHelpers.findElementById)('popupback_close').addEventListener('click', function () {
    (0, _pageHelpers.findElementById)('adsExceptionTable').innerHTML = '';
    (0, _pageHelpers.findElementById)('siteURL2').value = '';
    (0, _pageHelpers.findElementById)('adsPopup').style.display = 'none';
    (0, _pageHelpers.findElementById)('flashExceptionTable').innerHTML = '';
    (0, _pageHelpers.findElementById)('siteURL').value = '';
    (0, _pageHelpers.findElementById)('flashPopup').style.display = 'none';
    PopupService.hide();
  }); // Открывает попап с flash блокировками 

  (0, _pageHelpers.findElementById)('flashexception').addEventListener('click', function () {
    flashExceptions = _storageModule.storageCache.flashExceptions;
    uploadException(flashExceptions, 'flashExceptionTable', 'flash');
    PopupService.open();
    (0, _pageHelpers.findElementById)('flashPopup').style.display = 'block';
    (0, _pageHelpers.findElementById)('siteURL').focus();
  }); // Открывает попап с Ads блокировками 

  (0, _pageHelpers.findElementById)('adsexception').addEventListener('click', function () {
    if (_storageModule.storageCache.adsExceptions) {
      adsExceptions = _storageModule.storageCache.adsExceptions;
    }

    uploadException(adsExceptions, 'adsExceptionTable', 'ads');
    PopupService.open();
    (0, _pageHelpers.findElementById)('adsPopup').style.display = 'block';
    (0, _pageHelpers.findElementById)('siteURL2').focus();
  });
  (0, _pageHelpers.findElementById)('social-section').addEventListener('click', function (event) {
    event.stopPropagation();
    setBlockLevel(3);
  }, false);
  (0, _pageHelpers.findElementById)('analytics-section').addEventListener('click', function (event) {
    event.stopPropagation();
    setBlockLevel(2);
  }, false);
  (0, _pageHelpers.findElementById)('track-section').addEventListener('click', function (event) {
    event.stopPropagation();
    setBlockLevel(1);
  }, false);
  (0, _pageHelpers.findElementById)('noprotection-section').addEventListener('click', function (event) {
    event.stopPropagation();
    setBlockLevel(0);
  }, false);
  (0, _pageHelpers.findElementById)('vkontakte-check').addEventListener('change', function (event) {
    setSocialItem(event, 'vkontakte-check', 'vkicon');
  });
  (0, _pageHelpers.findElementById)('facebook-check').addEventListener('change', function (event) {
    setSocialItem(event, 'facebook-check', 'facebookicon');
  });
  (0, _pageHelpers.findElementById)('updateDataBase').addEventListener('click', updateDatabase);
  document.querySelector('select[name="defaultFlashValue"]').addEventListener('change', function (event) {
    var value = event.target.value == 'allow';
    (0, _storageModule.setToStorage)({
      flashEnabled: value
    });
  });
  document.querySelector('select[name="defaultAdsValue"]').addEventListener('change', function (event) {
    var value = event.target.value == 'allow';
    (0, _storageModule.setToStorage)({
      adsEnabled: value
    });
  });
  uploadLinkCheckerSettings();
  uploadTrackerSettings();
  uploadContentSettings();

  if (_storageModule.storageCache.database.updateTime != undefined) {
    (0, _pageHelpers.findElementById)('lastUpdateTime').innerHTML = getDateTimeString(_storageModule.storageCache.database.updateTime);
  } else {
    (0, _pageHelpers.findElementById)('lastUpdateTime').innerHTML = '-';
  }

  if (_storageModule.storageCache.database.updateTime != undefined) {
    (0, _pageHelpers.findElementById)('currentVersionNumber').innerHTML = _storageModule.storageCache.database.version;
  } else {
    (0, _pageHelpers.findElementById)('currentVersionNumber').innerHTML = '1.0';
  }
} //save vk check


function setSocialItem(event, checkBoxId, icon) {
  var checkBox = event.target;
  var isChecked = checkBox.checked;

  if (isChecked) {
    (0, _pageHelpers.findElementById)(icon).setAttribute('selected', 'true');
  } else {
    (0, _pageHelpers.findElementById)(icon).setAttribute('selected', 'false');
  }

  switch (checkBoxId) {
    case 'vkontakte-check':
      (0, _storageModule.setToStorage)({
        vkCheck: isChecked
      });
      recheckContent('social-vk');
      break;

    case 'facebook-check':
      (0, _storageModule.setToStorage)({
        fbCheck: isChecked
      });
      recheckContent('social-fb');
      break;
  }

  showStatus();
}

function recheckContent(type, needToRefresh) {
  browser.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      browser.tabs.sendMessage(tab.id, {
        action: 'refresh',
        type: type,
        tabId: tab.id,
        needToRefresh: needToRefresh
      });
    });
  });
} //update database


function updateDatabase() {
  (0, _pageHelpers.findElementById)('updateDataBase').style.display = 'none';
  (0, _pageHelpers.findElementById)('updating').style.display = 'block';
  (0, _pageHelpers.findElementById)('updatingImage').style.display = 'block';
  browser.runtime.sendMessage({
    action: 'updateDatabase'
  }, function () {
    (0, _pageHelpers.findElementById)('updateDataBase').style.display = 'block';
    (0, _pageHelpers.findElementById)('updating').style.display = 'none';
    (0, _pageHelpers.findElementById)('updatingImage').style.display = 'none';
    (0, _pageHelpers.findElementById)('lastUpdateTime').innerHTML = getDateTimeString(Date.now());
    (0, _pageHelpers.findElementById)('currentVersionNumber').innerHTML = _storageModule.storageCache.database.version;
  });
}

function getDateTimeString(date) {
  var currentDate = new Date(date);
  var curDate = currentDate.getDate();
  var curMonth = currentDate.getMonth() + 1;
  var curHour = currentDate.getHours();
  var curMinute = currentDate.getMinutes();
  var curSeconds = currentDate.getSeconds();
  return withZero(curDate) + '.' + withZero(curMonth) + '.' + currentDate.getFullYear() + ' <font style="color: graytext">' + withZero(curHour) + ':' + withZero(curMinute) + ':' + withZero(curSeconds) + '</font>';
}

;

function withZero(num) {
  return (num < 10 ? '0' : '') + num;
} //upload settings for link checker


function uploadLinkCheckerSettings() {
  var inputArray = [];
  var inputs = window.document.getElementById('options-form').getElementsByTagName('input');

  for (var i = 0; i < inputs.length; i++) {
    inputArray.push(inputs[i]);
  }

  inputArray.forEach(function (input) {
    if (input.name === 'vkontakte-check') {
      input.checked = _storageModule.storageCache.vkCheck;
    } else if (input.name === 'facebook-check') {
      input.checked = _storageModule.storageCache.fbCheck;
    }

    if (input.checked) {
      input.parentNode.parentNode.children[0].setAttribute('selected', 'true');
    } else {
      input.parentNode.parentNode.children[0].setAttribute('selected', 'false');
    }
  });
} //upload settings for tracker


function uploadTrackerSettings() {
  setBlockLevel(_storageModule.storageCache.blockLevel);
}

function setCounter(type) {
  if (type == 'flash') {
    if (_storageModule.storageCache.flashExceptions.length && _storageModule.storageCache.flashExceptions != undefined) {
      var _flashExceptions = _storageModule.storageCache.flashExceptions;
      (0, _pageHelpers.findElementById)('flashExcCount').innerHTML = "(".concat(_flashExceptions.length, ")");
    } else (0, _pageHelpers.findElementById)('flashExcCount').innerHTML = '(0)';
  } else {
    if (_storageModule.storageCache.adsExceptions.length && _storageModule.storageCache.adsExceptions != undefined) {
      var _adsExceptions = _storageModule.storageCache.adsExceptions;
      (0, _pageHelpers.findElementById)('adsExcCount').innerHTML = "(".concat(_adsExceptions.length, ")");
    } else (0, _pageHelpers.findElementById)('adsExcCount').innerHTML = '(0)';
  }
}

function uploadContentSettings() {
  if (_storageModule.storageCache.flashEnabled) {
    (0, _pageHelpers.findElementById)('defaultFlashValue').options[0].selected = 'selected';
  } else {
    (0, _pageHelpers.findElementById)('defaultFlashValue').options[1].selected = 'selected';
  }

  if (_storageModule.storageCache.adsEnabled) {
    (0, _pageHelpers.findElementById)('defaultAdsValue').options[0].selected = 'selected';
  } else {
    (0, _pageHelpers.findElementById)('defaultAdsValue').options[1].selected = 'selected';
  }

  setCounter('flash');
  setCounter('ads');
}

function uploadException(exceptions, tableId, type) {
  urlsToRefresh = [];

  if (exceptions) {
    var nationalURL = void 0;
    var baseURL = void 0;

    for (var i = 0; i < exceptions.length; i++) {
      baseURL = exceptions[i].baseURL;
      nationalURL = baseURL;

      if (Global.containsNonLatinSymbols(baseURL)) {
        // maybe national domain
        baseURL = _punycode2.default.toASCII(baseURL);
      } else if (baseURL.indexOf('xn--') > -1) {
        nationalURL = _punycode2.default.toUnicode(baseURL);
      }

      appendExceptionItem(tableId, exceptions[i].allow, exceptions[i].id, baseURL, nationalURL);
    }

    var closeButtons = document.querySelectorAll('.removesite');

    if (closeButtons.length) {
      for (var _i = 0; _i < closeButtons.length; _i++) {
        closeButtons[_i].onclick = function () {
          removeException(this.getAttribute('siteid'), type);
          var elId = this.getAttribute('siteid');
          document.querySelector("#".concat(elId)).remove();
          createTableLines("".concat(type, "ExceptionTable"));
        };
      }
    }

    if (type == 'flash') {
      var objDiv = (0, _pageHelpers.findElementById)('scrollContainer1');

      (0, _pageHelpers.findElementById)('siteURL').onkeypress = function (event) {
        if (event.keyCode == 13) {
          addAddressEvent('flash', 'siteURL', objDiv);
        }
      };

      (0, _pageHelpers.findElementById)('flashAddButton').onclick = function () {
        addAddressEvent('flash', 'siteURL', objDiv);
      };

      (0, _pageHelpers.findElementById)('readyButton').onclick = function () {
        saveItems('flash');
        hideFlashPopup();
      };
    } else {
      var _objDiv = (0, _pageHelpers.findElementById)('scrollContainer2');

      (0, _pageHelpers.findElementById)('readyButton2').onclick = function () {
        saveItems('ads');
        hideAdsPopup();
      };

      (0, _pageHelpers.findElementById)('siteURL2').onkeypress = function (event) {
        if (event.keyCode == 13) {
          addAddressEvent('ads', 'siteURL2', _objDiv);
        }
      };

      (0, _pageHelpers.findElementById)('adsAddButton').onclick = function () {
        addAddressEvent('ads', 'siteURL2', _objDiv);
      };
    }
  }
}

function saveItems(type) {
  addAddressItem(type);

  if (type == 'flash') {
    var selects = (0, _pageHelpers.findElementById)('flashExceptionTable').querySelectorAll('select[name="settings"]');

    for (var i = 0; i < selects.length; i++) {
      if (selects[i].value === 'allow') updateException(selects[i].getAttribute('siteid'), type, true);else updateException(selects[i].getAttribute('siteid'), type, false);
    }

    (0, _storageModule.setToStorage)({
      flashExceptions: flashExceptions
    });
    (0, _pageHelpers.findElementById)('flashExcCount').innerHTML = "(".concat(flashExceptions.length, ")");
  } else if (type == 'ads') {
    var _selects = (0, _pageHelpers.findElementById)('adsExceptionTable').querySelectorAll('select[name="settings"]');

    for (var _i2 = 0; _i2 < _selects.length; _i2++) {
      if (_selects[_i2].value === 'allow') updateException(_selects[_i2].getAttribute('siteid'), type, true);else updateException(_selects[_i2].getAttribute('siteid'), type, false);
    }

    (0, _storageModule.setToStorage)({
      adsExceptions: adsExceptions
    });
  }

  setCounter(type);

  if (urlsToRefresh.length != 0) {
    browser.runtime.sendMessage({
      action: 'refreshSpecial',
      listOfUrls: urlsToRefresh
    });
  }
} //add address event handler


function addAddressEvent(type, input, objDiv) {
  addAddressItem(type);
  (0, _pageHelpers.findElementById)(input).value = '';
  (0, _pageHelpers.findElementById)(input).focus();
} //hide ads popup event handler


function hideFlashPopup() {
  (0, _pageHelpers.findElementById)('flashExceptionTable').innerHTML = '';
  (0, _pageHelpers.findElementById)('popupback').style.display = 'none';
  (0, _pageHelpers.findElementById)('flashPopup').style.display = 'none';
  (0, _pageHelpers.findElementById)('siteURL').value = '';
  document.body.style.height = '';
  document.body.style.width = '';
  document.body.style.position = '';
} //hide flash popup event handler


function hideAdsPopup() {
  (0, _pageHelpers.findElementById)('adsExceptionTable').innerHTML = '';
  (0, _pageHelpers.findElementById)('popupback').style.display = 'none';
  (0, _pageHelpers.findElementById)('adsPopup').style.display = 'none';
  (0, _pageHelpers.findElementById)('siteURL2').value = '';
  document.body.style.height = '';
  document.body.style.width = '';
  document.body.style.position = '';
} //create lines in a table


function createTableLines(tableId) {
  var rows = document.getElementById(tableId).rows;

  for (var i = 0; i < rows.length; i++) {
    if (i % 2 == 0) {
      rows.item(i).style.backgroundColor = '#FFFFFF';
    } else {
      rows.item(i).style.backgroundColor = '#F2f2f2';
    }
  }
} //add address by type


function addAddressItem(type) {
  var node = (0, _pageHelpers.findElementById)(type == 'flash' ? 'siteURL' : 'siteURL2'),
      selectNode = document.querySelector(type == 'flash' ? '[name=addingFlashSiteUrlSelector]' : '[name=addingAdsSiteUrlSelector]');

  if (!node || !node.value) {
    return;
  }

  var url = node.value.replace(/"|'|\s/g, '');

  if (url) {
    var allow = selectNode.value == 'allow';
    addException(url, type, allow);
    node.value = '';
    node.focus();
  }
} //append item to table
// @param {String} nationalURL - url in national representation


function appendExceptionItem(tableId, allow, id, baseURL, nationalURL) {
  // TODO неплохо было бы почистить baseURL от html entities (encryptedString не подходит)
  var html = " \n    <tr class =\"adressItem\" id =\"".concat(id, "\">\n      <td><div class=\"optpage_ribtable_max-column\" title =\"").concat(baseURL, "\"> \n        ").concat(nationalURL || baseURL, "\n      </div></td>\n      <td><div class=\"styled-select\" style=\"padding-right: 6px;\">\n      <select siteId=\"").concat(id, "\" name=\"settings\">\n        <option value=\"allow\"").concat(allow ? 'selected' : '', ">").concat(browser.i18n.getMessage('allowOption'), "</option>\n        <option value=\"deny\"").concat(allow ? '' : 'selected', ">").concat(browser.i18n.getMessage('denyOption'), "&nbsp;</option> \n      </select></div></td>\n      <td><div siteId=\"").concat(id, "\"class=\"removesite\"></div></td>\n    </tr>");
  var tableRow = document.querySelector("#".concat(tableId));
  tableRow.insertAdjacentHTML('afterbegin', html);
  createTableLines(tableId);
} //adding site exception


function addException(url, type, allow) {
  var id = "uni".concat(Math.random()).replace('.', '');
  var baseURL = (Global.getDomain(url) || '').replace(/^www\./, ''),
      nationalURL = void 0;

  if (!baseURL) {
    return;
  }

  nationalURL = baseURL;

  if (Global.containsNonLatinSymbols(baseURL)) {
    // maybe national domain
    baseURL = _punycode2.default.toASCII(baseURL);
  } else if (baseURL.indexOf('xn--') > -1) {
    nationalURL = _punycode2.default.toUnicode(baseURL);
  }

  urlsToRefresh.push(baseURL);
  var tableLinesType = void 0;

  if (type == 'flash') {
    tableLinesType = 'flashExceptionTable';
    var index = getExceptionByURL(flashExceptions, baseURL);

    if (index == null) {
      flashExceptions.push({
        id: id,
        baseURL: baseURL,
        allow: allow,
        content: false
      });
      appendExceptionItem('flashExceptionTable', allow, id, baseURL, nationalURL);
    }
  } else if (type == 'ads') {
    tableLinesType = 'adsExceptionTable';

    var _index = getExceptionByURL(adsExceptions, baseURL);

    if (_index == null) {
      adsExceptions.push({
        id: id,
        baseURL: baseURL,
        allow: allow,
        content: false
      });
      appendExceptionItem('adsExceptionTable', allow, id, baseURL, nationalURL);
    }
  }

  var removeSiteButtons = document.querySelectorAll('.removesite');

  if (removeSiteButtons.length) {
    for (var i = 0; i < removeSiteButtons.length; i++) {
      removeSiteButtons[i].onclick = function () {
        removeException(this.getAttribute('siteid'), type);
        var elId = this.getAttribute('siteid');
        document.querySelector("#".concat(elId)).remove();
        createTableLines(tableLinesType);
      };
    }
  }
} //removeException


function removeException(id, type) {
  if (type == 'flash') {
    var index = getExceptionById(flashExceptions, id);

    if (index != null) {
      urlsToRefresh.push(flashExceptions[index].baseURL);
      flashExceptions.splice(index, 1);
    }
  } else if (type == 'ads') {
    var _index2 = getExceptionById(adsExceptions, id);

    if (_index2 != null) {
      urlsToRefresh.push(adsExceptions[_index2].baseURL);
      adsExceptions.splice(_index2, 1);
    }
  }
} //update exception settings


function updateException(id, type, allow) {
  if (type == 'flash') {
    var index = getExceptionById(flashExceptions, id);

    if (index != null) {
      flashExceptions[index].allow = allow;
      urlsToRefresh.push(flashExceptions[index].baseURL);
    }
  } else if (type == 'ads') {
    var _index3 = getExceptionById(adsExceptions, id);

    if (_index3 != null) {
      adsExceptions[_index3].allow = allow;
      urlsToRefresh.push(adsExceptions[_index3].baseURL);
    }
  }
} //getting exception by id


function getExceptionById(storage, id) {
  for (var i = 0; i < storage.length; i++) {
    if (storage[i].id == id) return i;
  }

  return null;
} //getting exception by id


function getExceptionByURL(storage, url) {
  for (var i = 0; i < storage.length; i++) {
    if (storage[i].baseURL == url) return i;
  }

  return null;
} //set state for social checking


function setBlockLevel(blockLevel) {
  (0, _storageModule.setToStorage)({
    blockLevel: blockLevel
  });
  (0, _pageHelpers.findElementById)('social-section').setAttribute('selected', 'false');
  (0, _pageHelpers.findElementById)('analytics-section').setAttribute('selected', 'false');
  (0, _pageHelpers.findElementById)('track-section').setAttribute('selected', 'false');
  (0, _pageHelpers.findElementById)('noprotection-section').setAttribute('selected', 'false');
  var notFirstTimeOpened = document.querySelector('input[name="trackers-check"]:checked');

  switch (blockLevel) {
    case 3:
      (0, _pageHelpers.findElementById)('social-check').checked = true;
      (0, _pageHelpers.findElementById)('social-section').setAttribute('selected', 'true');
      break;

    case 2:
      (0, _pageHelpers.findElementById)('analytics-check').checked = true;
      (0, _pageHelpers.findElementById)('analytics-section').setAttribute('selected', 'true');
      break;

    case 1:
      (0, _pageHelpers.findElementById)('track-check').checked = true;
      (0, _pageHelpers.findElementById)('track-section').setAttribute('selected', 'true');
      break;

    case 0:
      (0, _pageHelpers.findElementById)('noprotection-check').checked = true;
      (0, _pageHelpers.findElementById)('noprotection-section').setAttribute('selected', 'true');
      break;
  }

  showStatus();

  if (notFirstTimeOpened) {
    recheckContent('tracking', true);
  }
} //show status block


function showStatus() {
  var status = (0, _pageHelpers.findElementById)('status');
  status.style.display = 'block';
  status.style.opacity = 1;
  status.innerHTML = browser.i18n.getMessage('optionsSaved');
  hideStatus(status);
} //hide status block


function hideStatus(element) {
  var step = .1;
  var time = 5000;
  var timedSteps = time * step;
  var opacityInterval = setInterval(function () {
    var opacity = element.style.opacity;

    if (opacity < 0.5) {
      clearInterval(opacityInterval);
      element.innerHTML = '';
      element.style.display = 'none';
      return;
    }

    element.style.opacity -= step;
  }, timedSteps);
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(30)(module), __webpack_require__(31)))

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 31:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });