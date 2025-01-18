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
}({
  "4v6Gb": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "extensionFeedbackUrl", (() => extensionFeedbackUrl)), 
    parcelHelpers.export(exports, "abuseReportingPlatformUrl", (() => abuseReportingPlatformUrl)), 
    parcelHelpers.export(exports, "surveyUrl", (() => surveyUrl)), parcelHelpers.export(exports, "reminderSurveyUrl", (() => reminderSurveyUrl)), 
    parcelHelpers.export(exports, "privacyNoticeUrl", (() => privacyNoticeUrl)), parcelHelpers.export(exports, "experimentGroupsUrl", (() => experimentGroupsUrl)), 
    parcelHelpers.export(exports, "onboardingUrl", (() => onboardingUrl)), parcelHelpers.export(exports, "studyResultsUrl", (() => studyResultsUrl));
    var _webextensionPolyfillTs = require("webextension-polyfill-ts");
    const extensionFeedbackUrl = "https://qsurvey.mozilla.com/s3/regrets-reporter-product-feedback", abuseReportingPlatformUrl = "https://support.google.com/youtube/answer/2802027", surveyUrl = "https://mozillafoundation.typeform.com/ytusersurvey", reminderSurveyUrl = "https://mozillafoundation.typeform.com/to/b1PiAfWP", privacyNoticeUrl = "https://foundation.mozilla.org/youtube/regretsreporter/privacy-notice/", experimentGroupsUrl = "https://github.com/mozilla-extensions/regrets-reporter/blob/main/experimentinfo.md", onboardingUrl = _webextensionPolyfillTs.browser.runtime.getURL("get-started/index.html"), studyResultsUrl = "https://foundation.mozilla.org/youtube/user-controls/";
  }, {
    "webextension-polyfill-ts": "g4Zvj",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ]
}, []);