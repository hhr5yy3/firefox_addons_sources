!function(modules, entry, mainEntry, parcelRequireName, globalName) {
  var globalObject = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}, previousRequire = "function" == typeof globalObject.parcelRequire94c2 && globalObject.parcelRequire94c2, cache = previousRequire.cache || {}, nodeRequire = "undefined" != typeof module && "function" == typeof module.require && module.require.bind(module);
  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        var currentRequire = "function" == typeof globalObject.parcelRequire94c2 && globalObject.parcelRequire94c2;
        if (!jumped && currentRequire) return currentRequire(name, !0);
        if (previousRequire) return previousRequire(name, !0);
        if (nodeRequire && "string" == typeof name) return nodeRequire(name);
        var err = new Error("Cannot find module '" + name + "'");
        throw err.code = "MODULE_NOT_FOUND", err;
      }
      localRequire.resolve = function(x) {
        return modules[name][1][x] || x;
      }, localRequire.cache = {};
      var module = cache[name] = new newRequire.Module(name);
      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }
    return cache[name].exports;
    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }
  }
  newRequire.isParcelRequire = !0, newRequire.Module = function(moduleName) {
    this.id = moduleName, this.bundle = newRequire, this.exports = {};
  }, newRequire.modules = modules, newRequire.cache = cache, newRequire.parent = previousRequire, 
  newRequire.register = function(id, exports) {
    modules[id] = [ function(require, module) {
      module.exports = exports;
    }, {} ];
  }, Object.defineProperty(newRequire, "root", {
    get: function() {
      return globalObject.parcelRequire94c2;
    }
  }), globalObject.parcelRequire94c2 = newRequire;
  for (var i = 0; i < entry.length; i++) newRequire(entry[i]);
  var mainExports = newRequire("bcB7J");
  "object" == typeof exports && "undefined" != typeof module ? module.exports = mainExports : "function" == typeof define && define.amd && define((function() {
    return mainExports;
  }));
}({
  bcB7J: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js"), _jsxRuntime = require("react/jsx-runtime"), _react = require("react"), _reactDom = (parcelHelpers.interopDefault(_react), 
    require("react-dom")), _reactDomDefault = parcelHelpers.interopDefault(_reactDom), _indexTsx = require("./index.tsx");
    _reactDomDefault.default.render(_jsxRuntime.jsx(_indexTsx.Main, {}), document.getElementById("root"));
  }, {
    "react/jsx-runtime": "aMvgd",
    react: "8Nzqg",
    "react-dom": "cnO8j",
    "./index.tsx": "g2BuM",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  g2BuM: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Main", (() => Main));
    var _jsxRuntime = require("react/jsx-runtime"), _links = (require("../common/tailwind.css"), 
    require("../common/links")), _common = require("../common/common"), _storage = require("../common/storage"), _react = require("react"), _helpers = require("../common/helpers");
    function Main() {
      _common.installReason.use();
      const [onboardingCompleted] = _storage.useExtensionState(_storage.localStorageKeys.onboardingCompleted, !1), [experimentOptedIn] = _storage.useExtensionState(_storage.localStorageKeys.experimentOptedIn, !1), surveyDate = _common.surveyReminderDate.use(), onSurveyResultClick = (!_common.allSurveysCompleted.use() && surveyDate && Date.now(), 
      _react.useCallback((async () => {
        const installationIdValue = await _common.installationId.acquire(), personalSurveyUrl = `${_links.reminderSurveyUrl}#regretsreporter=${installationIdValue}`, bg = await _helpers.getBackgroundScript();
        await bg.onReminderSurveyClick(), window.open(personalSurveyUrl, "_blank");
      }), []), _react.useCallback((async () => {
        const bg = await _helpers.getBackgroundScript();
        await bg.onStudyResultsClick(), window.open(_links.studyResultsUrl, "_blank");
      }), []));
      return experimentOptedIn ? _jsxRuntime.jsxs("div", {
        className: "m-3 text-sm",
        children: [ "Thanks for your participation!", _jsxRuntime.jsx("br", {}), "We have now analysed the data and our findings are available", " ", _jsxRuntime.jsx("a", {
          onClick: onSurveyResultClick,
          className: "underline text-red-70 cursor-pointer",
          rel: "noreferrer",
          children: "here"
        }), "." ]
      }) : _jsxRuntime.jsxs("div", {
        className: "m-3 text-sm",
        children: [ _jsxRuntime.jsx("p", {
          children: "We understand that you chose not to opt in to our experiment and no data has been collected from this installation."
        }), _jsxRuntime.jsxs("p", {
          children: [ "We have now analysed the data that was contributed and our findings are available", " ", _jsxRuntime.jsx("a", {
            onClick: onSurveyResultClick,
            className: "underline text-red-70 cursor-pointer",
            rel: "noreferrer",
            children: "here"
          }), "." ]
        }) ]
      });
    }
  }, {
    "react/jsx-runtime": "aMvgd",
    "../common/tailwind.css": "4H2Bi",
    "../common/links": "4v6Gb",
    "../common/common": "jKOy4",
    "../common/storage": "4FzrO",
    react: "8Nzqg",
    "../common/helpers": "hce4W",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "4H2Bi": [ function() {}, {} ]
}, [ "bcB7J" ]);