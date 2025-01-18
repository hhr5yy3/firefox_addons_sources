(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getTab */
/* unused harmony export resetData */
/* unused harmony export removeAllData */
/* unused harmony export activateOnSite */
/* unused harmony export deactivateOnSite */
/* unused harmony export getPrivacyData */
/* unused harmony export getPrivacyOptions */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return savePopupToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return revertDomainControl; });
/* unused harmony export updateSettings */
/* unused harmony export updatePrivacyOverride */
/* unused harmony export getManifestFragmentPath */
/* unused harmony export getCopyablesPaths */
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(497);
/* harmony import */ var core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(470);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(541);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(544);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_3__);




/*
 * Copyright (C) 2022 Surfboard Holding B.V. <https://www.startpage.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var getTab = () => __awaiter(void 0, void 0, void 0, function* () {
  var [tab] = yield browser.tabs.query({
    active: true,
    currentWindow: true
  });
  return tab;
});
var sendBadgerMessage = (message, extra) => __awaiter(void 0, void 0, void 0, function* () {
  var {
    id: tabId,
    url: tabUrl
  } = yield getTab();
  return yield browser.runtime.sendMessage(Object.assign({
    type: message,
    tabId,
    tabUrl
  }, extra !== null && extra !== void 0 ? extra : {}));
});
var resetData = () => __awaiter(void 0, void 0, void 0, function* () {
  var {
    id: tabId,
    url: tabUrl
  } = yield getTab();
  return yield browser.runtime.sendMessage({
    type: 'resetData',
    tabId,
    tabUrl
  });
});
var removeAllData = () => __awaiter(void 0, void 0, void 0, function* () {
  var {
    id: tabId,
    url: tabUrl
  } = yield getTab();
  return yield browser.runtime.sendMessage({
    type: 'removeAllData',
    tabId,
    tabUrl
  });
});
var activateOnSite = () => __awaiter(void 0, void 0, void 0, function* () {
  console.log('trying to activate');
  var {
    id: tabId,
    url: tabUrl
  } = yield getTab();
  console.log("".concat(tabId, ", ").concat(tabUrl));
  return yield browser.runtime.sendMessage({
    type: 'activateOnSite',
    tabId,
    tabUrl
  });
});
var deactivateOnSite = () => __awaiter(void 0, void 0, void 0, function* () {
  var {
    id: tabId,
    url: tabUrl
  } = yield getTab();
  return yield browser.runtime.sendMessage({
    type: 'deactivateOnSite',
    tabId,
    tabUrl
  });
});
var getPrivacyData = () => __awaiter(void 0, void 0, void 0, function* () {
  var data = yield sendBadgerMessage('getPopupData');
  return data;
});
var getPrivacyOptions = () => __awaiter(void 0, void 0, void 0, function* () {
  var data = yield sendBadgerMessage('getOptionsData');
  return data;
});
var savePopupToggle = (origin, action) => __awaiter(void 0, void 0, void 0, function* () {
  return yield sendBadgerMessage('savePopupToggle', {
    origin,
    action
  });
});
var revertDomainControl = origin => __awaiter(void 0, void 0, void 0, function* () {
  return yield sendBadgerMessage('revertDomainControl', {
    origin
  });
});
var updateSettings = settings => __awaiter(void 0, void 0, void 0, function* () {
  return yield browser.runtime.sendMessage({
    type: 'updateSettings',
    data: settings
  });
});
var updatePrivacyOverride = settings => __awaiter(void 0, void 0, void 0, function* () {
  yield updateSettings(settings);
  return yield browser.runtime.sendMessage({
    type: 'setPrivacyOverride'
  });
});
var getManifestFragmentPath = () => {
  return "manifest-fragment.json";
};
var getCopyablesPaths = () => {
  var SRC_PATH = 'src';
  var copyables = ["".concat(SRC_PATH, "/data"), "".concat(SRC_PATH, "/js"), "".concat(SRC_PATH, "/lib"), 'sp-js'];
  return copyables;
};

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackerSettings; });
/* unused harmony export TrackerRow */
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(118);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var sp_privacy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(443);
/* harmony import */ var _utils_localization__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(19);




function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/*
 * Copyright (C) 2022 Surfboard Holding B.V. <https://www.startpage.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */






var _ref =  true ? {
  name: "lviczn-titleCss",
  styles: "color:#6573ff;font-family:'Inter',sans-serif;font-size:16px;font-weight:600;line-height:1;padding:12px 8px;;label:titleCss;"
} : undefined;
var _ref2 =  true ? {
  name: "1n2qqnt-optionsLabelCss",
  styles: "white-space:pre-wrap;width:calc(100% / 3);;label:optionsLabelCss;"
} : undefined;
var _ref3 =  true ? {
  name: "m0hm40-TrackerSettings",
  styles: ";label:TrackerSettings;"
} : undefined;
var TrackerSettings = _ref12 => {
  var {
    trackers,
    title,
    height,
    labelBgColor,
    labelFontSize,
    lColWidthPercent,
    rColWidthPercent,
    alternateRowColors,
    cssOverrides,
    onActionChange,
    onRevert,
    onConfirmSiteBreak
  } = _ref12;
  var trackerSettingsCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("border-bottom:1px solid #dee0f7;font-family:'Inter',sans-serif;", height && "height: ".concat(height, "px; overflow-y: auto;"), " &:last-of-type{border-bottom:none;};label:trackerSettingsCss;" + ( true ? "" : undefined));
  var titleCss = _ref;
  var labelRowCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("background:", labelBgColor || 'transparent', ";align-items:center;display:flex;font-size:", labelFontSize || '14px', ";font-weight:500;margin-bottom:6px;padding:8px;position:sticky;z-index:1;top:0;border-radius:4px;background:#f2f3ff;;label:labelRowCss;" + ( true ? "" : undefined));
  var domainColCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:", lColWidthPercent, "%;;label:domainColCss;" + ( true ? "" : undefined));
  var optionsColCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("align-items:center;display:flex;justify-content:space-around;text-align:center;width:", rColWidthPercent, "%;;label:optionsColCss;" + ( true ? "" : undefined));
  var optionsLabelCss = _ref2;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])([trackerSettingsCss, cssOverrides || _ref3], ";label:TrackerSettings;" + ( true ? "" : undefined))
  }, title && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: titleCss
  }, title), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: labelRowCss
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: domainColCss
  }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_6__[/* getMessage */ "b"])('popupManageTrackersDomainLabel')), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: optionsColCss
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: optionsLabelCss
  }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_6__[/* getMessage */ "b"])('popupManageTrackersBlockAllLabel')), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: optionsLabelCss
  }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_6__[/* getMessage */ "b"])('popupManageTrackersBlockCookiesLabel')), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: optionsLabelCss
  }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_6__[/* getMessage */ "b"])('popupManageTrackersAllowAllLabel')))), Object.entries(trackers)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .filter(_ref13 => {
    var [host, info] = _ref13;
    return info.action !== 'noaction';
  }).map((_ref14, i) => {
    var [host, info] = _ref14;
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])(TrackerRow, {
      host: host,
      info: info,
      index: alternateRowColors ? i : undefined,
      lColWidthPercent: lColWidthPercent,
      rColWidthPercent: rColWidthPercent,
      onActionChange: onActionChange,
      onRevert: onRevert,
      onConfirmSiteBreak: onConfirmSiteBreak
    });
  }));
};
var _ref4 =  true ? {
  name: "bc0p8h-optionSelectCss",
  styles: "appearance:none;background:#fbfbfd;border:1px solid #ced1dd;border-radius:50%;height:16px;margin:0;padding:0;width:16px;&:focus{outline:none;};label:optionSelectCss;"
} : undefined;
var _ref5 =  true ? {
  name: "1f5fkwd-TrackerRow",
  styles: "display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;;label:TrackerRow;"
} : undefined;
var _ref6 =  true ? {
  name: "g6ysrs-TrackerRow",
  styles: "display:flex;position:relative;;label:TrackerRow;"
} : undefined;
var _ref7 =  true ? {
  name: "g6ysrs-TrackerRow",
  styles: "display:flex;position:relative;;label:TrackerRow;"
} : undefined;
var _ref8 =  true ? {
  name: "g6ysrs-TrackerRow",
  styles: "display:flex;position:relative;;label:TrackerRow;"
} : undefined;
var _ref9 =  true ? {
  name: "alc60x-TrackerRow",
  styles: "margin-right:auto;width:60%;;label:TrackerRow;"
} : undefined;
var _ref10 =  true ? {
  name: "1j35ba-TrackerRow",
  styles: "background:transparent;border:0;color:#ffffff;cursor:pointer;font-size:14px;font-weight:600;margin-right:24px;padding:0;text-decoration:underline;&:focus{outline:none;};label:TrackerRow;"
} : undefined;
var _ref11 =  true ? {
  name: "6nrdgt-TrackerRow",
  styles: "background:transparent;border:0;color:#ffffff;cursor:pointer;font-size:14px;font-weight:600;padding:0;text-decoration:underline;&:focus{outline:none;};label:TrackerRow;"
} : undefined;
var TrackerRow = _ref15 => {
  var {
    host,
    info,
    index,
    lColWidthPercent,
    rColWidthPercent,
    onActionChange,
    onRevert,
    onConfirmSiteBreak
  } = _ref15;
  var [showWarning, setShowWarning] = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(false);
  var optionSelectCss = _ref4;
  var trackerRowCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("align-items:center;border-radius:4px;display:flex;font-size:14px;margin:1px 0;padding:10px 8px;input[type='radio']{", optionSelectCss, ";};label:trackerRowCss;" + ( true ? "" : undefined));
  var optionsColCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("display:flex;justify-content:space-around;text-align:center;width:", rColWidthPercent, "%;;label:optionsColCss;" + ( true ? "" : undefined));
  var domainColCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("align-items:center;display:flex;min-width:0;width:", lColWidthPercent, "%;;label:domainColCss;" + ( true ? "" : undefined));
  var optionSelectFillCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("background:", showWarning || info.action === 'user_block' && info.cookieBlocklisted ? '#EB5757' : '#6573ff', ";border-radius:50%;height:16px;left:0;position:absolute;top:0;width:16px;;label:optionSelectFillCss;" + ( true ? "" : undefined));
  var revertBtnCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("background:", info.action === 'user_block' && info.cookieBlocklisted ? '#EB5757' : '#6573ff', ";border:none;cursor:pointer;flex-shrink:0;height:16px;margin:0 8px 0 0;mask:url('revert-arrow.svg');padding:0;width:16px;&:focus{outline:none;};label:revertBtnCss;" + ( true ? "" : undefined));
  var isUserSet = ['user_block', 'user_allow', 'user_cookieblock'].includes(info.action);
  var resolveRowBgColor = active => {
    if (active) {
      if (info.action === 'user_block' && info.cookieBlocklisted) {
        return '#FFEDEE';
      }
      return '#F0F1FF';
    }
    if (index !== undefined && index % 2 === 0) {
      return '#fbfbfd';
    }
    return 'transparent';
  };
  var onChange = event => {
    var action = event.target.value;
    if (showWarning) {
      return;
    }
    if (info.cookieBlocklisted && action === 'block') {
      setShowWarning(true);
      return;
    }
    onActionChange(host, action);
  };
  var blockSelected = ['block', 'user_block'].includes(info.action) || showWarning;
  var cookieBlockSelected = ['cookieblock', 'user_cookieblock'].includes(info.action) && !showWarning;
  var allowSelected = ['allow', 'user_allow', 'dnt'].includes(info.action) && !showWarning;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])([trackerRowCss, /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("background:", resolveRowBgColor(isUserSet), ";;label:TrackerRow;" + ( true ? "" : undefined))], ";label:TrackerRow;" + ( true ? "" : undefined))
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: domainColCss
  }, isUserSet && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("button", {
    type: "submit",
    css: revertBtnCss,
    "aria-label": "revert",
    onClick: () => {
      Object(sp_privacy__WEBPACK_IMPORTED_MODULE_5__[/* revertDomainControl */ "a"])(host).then(() => {
        onRevert();
      });
    }
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("span", {
    css: _ref5
  }, host)), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: optionsColCss
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("label", {
    htmlFor: "".concat(host),
    css: _ref6
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("input", {
    type: "radio",
    checked: blockSelected,
    name: host,
    value: "block",
    onChange: onChange,
    css: optionSelectCss
  }), blockSelected && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("span", {
    css: optionSelectFillCss
  })), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("label", {
    htmlFor: "".concat(host),
    css: _ref7
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("input", {
    type: "radio",
    checked: cookieBlockSelected,
    name: host,
    value: "cookieblock",
    onChange: onChange,
    css: optionSelectCss
  }), cookieBlockSelected && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("span", {
    css: optionSelectFillCss
  })), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("label", {
    htmlFor: "".concat(host),
    css: _ref8
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("input", {
    type: "radio",
    checked: allowSelected && !showWarning,
    name: host,
    value: "allow",
    onChange: onChange,
    css: optionSelectCss
  }), allowSelected && !showWarning && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("span", {
    css: optionSelectFillCss
  })))), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])([trackerRowCss, /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* css */ "b"])("background:#eb5757;color:#ffffff;font-weight:600;", !showWarning && 'display: none', ";;label:TrackerRow;" + ( true ? "" : undefined))], ";label:TrackerRow;" + ( true ? "" : undefined))
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("div", {
    css: _ref9
  }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_6__[/* getMessage */ "b"])('popupManageTrackersWarning')), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("button", {
    type: "submit",
    onClick: () => {
      setShowWarning(false);
      Object(sp_privacy__WEBPACK_IMPORTED_MODULE_5__[/* savePopupToggle */ "b"])(host, 'block').then(() => {
        onConfirmSiteBreak();
      });
    },
    css: _ref10
  }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_6__[/* getMessage */ "b"])('popupManageTrackersWarningProceed')), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__[/* jsx */ "c"])("button", {
    type: "submit",
    onClick: () => {
      setShowWarning(false);
    },
    css: _ref11
  }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_6__[/* getMessage */ "b"])('popupManageTrackersWarningCancel'))));
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vcHJpdmFjeWJhZGdlci9zcC1wcml2YWN5L2xpYi9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByaXZhY3ktc2VhcmNoL2NvbXBvbmVudHMvQ29tbW9uL1RyYWNrZXJTZXR0aW5ncy50c3giXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiYWRvcHQiLCJ2YWx1ZSIsInJlc29sdmUiLCJQcm9taXNlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZ2V0VGFiIiwidGFiIiwiYnJvd3NlciIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsImN1cnJlbnRXaW5kb3ciLCJzZW5kQmFkZ2VyTWVzc2FnZSIsIm1lc3NhZ2UiLCJleHRyYSIsImlkIiwidGFiSWQiLCJ1cmwiLCJ0YWJVcmwiLCJydW50aW1lIiwic2VuZE1lc3NhZ2UiLCJPYmplY3QiLCJhc3NpZ24iLCJ0eXBlIiwicmVzZXREYXRhIiwicmVtb3ZlQWxsRGF0YSIsImFjdGl2YXRlT25TaXRlIiwiY29uc29sZSIsImxvZyIsImNvbmNhdCIsImRlYWN0aXZhdGVPblNpdGUiLCJnZXRQcml2YWN5RGF0YSIsImRhdGEiLCJnZXRQcml2YWN5T3B0aW9ucyIsInNhdmVQb3B1cFRvZ2dsZSIsIm9yaWdpbiIsImFjdGlvbiIsInJldmVydERvbWFpbkNvbnRyb2wiLCJ1cGRhdGVTZXR0aW5ncyIsInNldHRpbmdzIiwidXBkYXRlUHJpdmFjeU92ZXJyaWRlIiwiZ2V0TWFuaWZlc3RGcmFnbWVudFBhdGgiLCJnZXRDb3B5YWJsZXNQYXRocyIsIlNSQ19QQVRIIiwiY29weWFibGVzIiwiX3JlZiIsInByb2Nlc3MiLCJuYW1lIiwic3R5bGVzIiwiX3JlZjIiLCJfcmVmMyIsIlRyYWNrZXJTZXR0aW5ncyIsIl9yZWYxMiIsInRyYWNrZXJzIiwidGl0bGUiLCJoZWlnaHQiLCJsYWJlbEJnQ29sb3IiLCJsYWJlbEZvbnRTaXplIiwibENvbFdpZHRoUGVyY2VudCIsInJDb2xXaWR0aFBlcmNlbnQiLCJhbHRlcm5hdGVSb3dDb2xvcnMiLCJjc3NPdmVycmlkZXMiLCJvbkFjdGlvbkNoYW5nZSIsIm9uUmV2ZXJ0Iiwib25Db25maXJtU2l0ZUJyZWFrIiwidHJhY2tlclNldHRpbmdzQ3NzIiwiY3NzIiwidGl0bGVDc3MiLCJsYWJlbFJvd0NzcyIsImRvbWFpbkNvbENzcyIsIm9wdGlvbnNDb2xDc3MiLCJvcHRpb25zTGFiZWxDc3MiLCJfX19FbW90aW9uSlNYIiwiX2NzcyIsImdldE1lc3NhZ2UiLCJlbnRyaWVzIiwiZmlsdGVyIiwiX3JlZjEzIiwiaG9zdCIsImluZm8iLCJtYXAiLCJfcmVmMTQiLCJpIiwiVHJhY2tlclJvdyIsImluZGV4IiwidW5kZWZpbmVkIiwiX3JlZjQiLCJfcmVmNSIsIl9yZWY2IiwiX3JlZjciLCJfcmVmOCIsIl9yZWY5IiwiX3JlZjEwIiwiX3JlZjExIiwiX3JlZjE1Iiwic2hvd1dhcm5pbmciLCJzZXRTaG93V2FybmluZyIsInVzZVN0YXRlIiwib3B0aW9uU2VsZWN0Q3NzIiwidHJhY2tlclJvd0NzcyIsIm9wdGlvblNlbGVjdEZpbGxDc3MiLCJjb29raWVCbG9ja2xpc3RlZCIsInJldmVydEJ0bkNzcyIsImlzVXNlclNldCIsImluY2x1ZGVzIiwicmVzb2x2ZVJvd0JnQ29sb3IiLCJvbkNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwiYmxvY2tTZWxlY3RlZCIsImNvb2tpZUJsb2NrU2VsZWN0ZWQiLCJhbGxvd1NlbGVjdGVkIiwiUmVhY3QiLCJGcmFnbWVudCIsIm9uQ2xpY2siLCJodG1sRm9yIiwiY2hlY2tlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsU0FBUyxHQUFJLFNBQUksSUFBSSxTQUFJLENBQUNBLFNBQVMsSUFBSyxVQUFVQyxPQUFPLEVBQUVDLFVBQVUsRUFBRUMsQ0FBQyxFQUFFQyxTQUFTLEVBQUU7RUFDckYsU0FBU0MsS0FBS0EsQ0FBQ0MsS0FBSyxFQUFFO0lBQUUsT0FBT0EsS0FBSyxZQUFZSCxDQUFDLEdBQUdHLEtBQUssR0FBRyxJQUFJSCxDQUFDLENBQUMsVUFBVUksT0FBTyxFQUFFO01BQUVBLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDO0lBQUUsQ0FBQyxDQUFDO0VBQUU7RUFDM0csT0FBTyxLQUFLSCxDQUFDLEtBQUtBLENBQUMsR0FBR0ssT0FBTyxDQUFDLEVBQUUsVUFBVUQsT0FBTyxFQUFFRSxNQUFNLEVBQUU7SUFDdkQsU0FBU0MsU0FBU0EsQ0FBQ0osS0FBSyxFQUFFO01BQUUsSUFBSTtRQUFFSyxJQUFJLENBQUNQLFNBQVMsQ0FBQ1EsSUFBSSxDQUFDTixLQUFLLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQyxPQUFPTyxDQUFDLEVBQUU7UUFBRUosTUFBTSxDQUFDSSxDQUFDLENBQUM7TUFBRTtJQUFFO0lBQzFGLFNBQVNDLFFBQVFBLENBQUNSLEtBQUssRUFBRTtNQUFFLElBQUk7UUFBRUssSUFBSSxDQUFDUCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUNFLEtBQUssQ0FBQyxDQUFDO01BQUUsQ0FBQyxDQUFDLE9BQU9PLENBQUMsRUFBRTtRQUFFSixNQUFNLENBQUNJLENBQUMsQ0FBQztNQUFFO0lBQUU7SUFDN0YsU0FBU0YsSUFBSUEsQ0FBQ0ksTUFBTSxFQUFFO01BQUVBLE1BQU0sQ0FBQ0MsSUFBSSxHQUFHVCxPQUFPLENBQUNRLE1BQU0sQ0FBQ1QsS0FBSyxDQUFDLEdBQUdELEtBQUssQ0FBQ1UsTUFBTSxDQUFDVCxLQUFLLENBQUMsQ0FBQ1csSUFBSSxDQUFDUCxTQUFTLEVBQUVJLFFBQVEsQ0FBQztJQUFFO0lBQzdHSCxJQUFJLENBQUMsQ0FBQ1AsU0FBUyxHQUFH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TixHQUFHLEVBQUVrQztFQUFvQixFQUFHLENBQ2hFLENBQ04sQ0FDSixFQUNONUIsaUVBQUE7SUFDSU4sR0FBRyxlQUFBTyxpRUFBQSxDQUFFLENBQ0QwQixhQUFhLGVBQ2JqQyxpRUFBRyxzREFJRyxDQUFDNkIsV0FBVyxJQUFJLGVBQWUsMkJBQUFqRCxLQUFBLG9CQUV4QywwQkFBQUEsS0FBQTtFQUFDLEdBRUYwQixpRUFBQTtJQUNJTixHQUFHLEVBQUF5QjtFQUdELEdBRURqQiw4RUFBVSxDQUFDLDRCQUE0QixDQUFDLENBQ3ZDLEVBQ05GLGlFQUFBO0lBQ0lqRCxJQUFJLEVBQUMsUUFBUTtJQUNiMkYsT0FBTyxFQUFFQSxDQUFBLEtBQU07TUFDWGxCLGNBQWMsQ0FBQyxLQUFLLENBQUM7TUFDckI5RCwwRUFBZSxDQUFDNEMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDM0UsSUFBSSxDQUFDLE1BQU07UUFDdEM2RCxrQkFBa0IsRUFBRTtNQUN4QixDQUFDLENBQUM7SUFDTixDQUFFO0lBQ0ZFLEdBQUcsRUFBQTBCO0VBY0QsR0FFRGxCLDhFQUFVLENBQUMsbUNBQW1DLENBQUMsQ0FDM0MsRUFDVEYsaUVBQUE7SUFDSWpELElBQUksRUFBQyxRQUFRO0lBQ2IyRixPQUFPLEVBQUVBLENBQUEsS0FBTTtNQUNYbEIsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFFO0lBQ0Y5QixHQUFHLEVBQUEyQjtFQWFELEdBRURuQiw4RUFBVSxDQUFDLGtDQUFrQyxDQUFDLENBQzFDLENBQ1AsQ0FDUDtBQUVYLENBQUMsQyIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCBnZXRUYWIgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBbdGFiXSA9IHlpZWxkIGJyb3dzZXIudGFicy5xdWVyeSh7XG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgY3VycmVudFdpbmRvdzogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiB0YWI7XG59KTtcbmNvbnN0IHNlbmRCYWRnZXJNZXNzYWdlID0gKG1lc3NhZ2UsIGV4dHJhKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB7IGlkOiB0YWJJZCwgdXJsOiB0YWJVcmwgfSA9IHlpZWxkIGdldFRhYigpO1xuICAgIHJldHVybiB5aWVsZCBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoT2JqZWN0LmFzc2lnbih7IHR5cGU6IG1lc3NhZ2UsIHRhYklkLFxuICAgICAgICB0YWJVcmwgfSwgKGV4dHJhICE9PSBudWxsICYmIGV4dHJhICE9PSB2b2lkIDAgPyBleHRyYSA6IHt9KSkpO1xufSk7XG5leHBvcnQgY29uc3QgcmVzZXREYXRhID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgeyBpZDogdGFiSWQsIHVybDogdGFiVXJsIH0gPSB5aWVsZCBnZXRUYWIoKTtcbiAgICByZXR1cm4geWllbGQgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogJ3Jlc2V0RGF0YScsXG4gICAgICAgIHRhYklkLFxuICAgICAgICB0YWJVcmxcbiAgICB9KTtcbn0pO1xuZXhwb3J0IGNvbnN0IHJlbW92ZUFsbERhdGEgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB7IGlkOiB0YWJJZCwgdXJsOiB0YWJVcmwgfSA9IHlpZWxkIGdldFRhYigpO1xuICAgIHJldHVybiB5aWVsZCBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICB0eXBlOiAncmVtb3ZlQWxsRGF0YScsXG4gICAgICAgIHRhYklkLFxuICAgICAgICB0YWJVcmxcbiAgICB9KTtcbn0pO1xuZXhwb3J0IGNvbnN0IGFjdGl2YXRlT25TaXRlID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc29sZS5sb2coJ3RyeWluZyB0byBhY3RpdmF0ZScpO1xuICAgIGNvbnN0IHsgaWQ6IHRhYklkLCB1cmw6IHRhYlVybCB9ID0geWllbGQgZ2V0VGFiKCk7XG4gICAgY29uc29sZS5sb2coYCR7dGFiSWR9LCAke3RhYlVybH1gKTtcbiAgICByZXR1cm4geWllbGQgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogJ2FjdGl2YXRlT25TaXRlJyxcbiAgICAgICAgdGFiSWQsXG4gICAgICAgIHRhYlVybFxuICAgIH0pO1xufSk7XG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZU9uU2l0ZSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHsgaWQ6IHRhYklkLCB1cmw6IHRhYlVybCB9ID0geWllbGQgZ2V0VGFiKCk7XG4gICAgcmV0dXJuIHlpZWxkIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdkZWFjdGl2YXRlT25TaXRlJyxcbiAgICAgICAgdGFiSWQsXG4gICAgICAgIHRhYlVybFxuICAgIH0pO1xufSk7XG5leHBvcnQgY29uc3QgZ2V0UHJpdmFjeURhdGEgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBkYXRhID0geWllbGQgc2VuZEJhZGdlck1lc3NhZ2UoJ2dldFBvcHVwRGF0YScpO1xuICAgIHJldHVybiBkYXRhO1xufSk7XG5leHBvcnQgY29uc3QgZ2V0UHJpdmFjeU9wdGlvbnMgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBkYXRhID0geWllbGQgc2VuZEJhZGdlck1lc3NhZ2UoJ2dldE9wdGlvbnNEYXRhJyk7XG4gICAgcmV0dXJuIGRhdGE7XG59KTtcbmV4cG9ydCBjb25zdCBzYXZlUG9wdXBUb2dnbGUgPSAob3JpZ2luLCBhY3Rpb24pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBzZW5kQmFkZ2VyTWVzc2FnZSgnc2F2ZVBvcHVwVG9nZ2xlJywge1xuICAgICAgICBvcmlnaW4sXG4gICAgICAgIGFjdGlvblxuICAgIH0pO1xufSk7XG5leHBvcnQgY29uc3QgcmV2ZXJ0RG9tYWluQ29udHJvbCA9IChvcmlnaW4pID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBzZW5kQmFkZ2VyTWVzc2FnZSgncmV2ZXJ0RG9tYWluQ29udHJvbCcsIHsgb3JpZ2luIH0pO1xufSk7XG5leHBvcnQgY29uc3QgdXBkYXRlU2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIHJldHVybiB5aWVsZCBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICB0eXBlOiAndXBkYXRlU2V0dGluZ3MnLFxuICAgICAgICBkYXRhOiBzZXR0aW5nc1xuICAgIH0pO1xufSk7XG5leHBvcnQgY29uc3QgdXBkYXRlUHJpdmFjeU92ZXJyaWRlID0gKHNldHRpbmdzKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICB5aWVsZCB1cGRhdGVTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgcmV0dXJuIHlpZWxkIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdzZXRQcml2YWN5T3ZlcnJpZGUnXG4gICAgfSk7XG59KTtcbmV4cG9ydCBjb25zdCBnZXRNYW5pZmVzdEZyYWdtZW50UGF0aCA9ICgpID0+IHtcbiAgICByZXR1cm4gYG1hbmlmZXN0LWZyYWdtZW50Lmpzb25gO1xufTtcbmV4cG9ydCBjb25zdCBnZXRDb3B5YWJsZXNQYXRocyA9ICgpID0+IHtcbiAgICBjb25zdCBTUkNfUEFUSCA9ICdzcmMnO1xuICAgIGNvbnN0IGNvcHlhYmxlcyA9IFtgJHtTUkNfUEFUSH0vZGF0YWAsIGAke1NSQ19QQVRIfS9qc2AsIGAke1NSQ19QQVRIfS9saWJgLCAnc3AtanMnXTtcbiAgICByZXR1cm4gY29weWFibGVzO1xufTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjIgU3VyZmJvYXJkIEhvbGRpbmcgQi5WLiA8aHR0cHM6Ly93d3cuc3RhcnRwYWdlLmNvbT5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtGQywgQ2hhbmdlRXZlbnQsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2NzcywgU2VyaWFsaXplZFN0eWxlc30gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQge0FjdGlvbnMsIHJldmVydERvbWFpbkNvbnRyb2wsIHNhdmVQb3B1cFRvZ2dsZX0gZnJvbSAnc3AtcHJpdmFjeSc7XG5cbmltcG9ydCB7Z2V0TWVzc2FnZX0gZnJvbSAnLi4vLi4vdXRpbHMvbG9jYWxpemF0aW9uJztcbmltcG9ydCB7VHJhY2tlckluZm8sIFRyYWNrZXJzfSBmcm9tICcuLi8uLi9wcml2YWN5IHRvb2xzL3RyYWNrZXJzJztcblxudHlwZSBUcmFja2VyU2V0dGluZ3NQcm9wcyA9IHtcbiAgICB0aXRsZT86IHN0cmluZztcbiAgICBoZWlnaHQ/OiBudW1iZXI7XG4gICAgdHJhY2tlcnM6IFRyYWNrZXJzO1xuICAgIGxhYmVsQmdDb2xvcj86IHN0cmluZztcbiAgICBsYWJlbEZvbnRTaXplPzogc3RyaW5nO1xuICAgIGxDb2xXaWR0aFBlcmNlbnQ6IG51bWJlcjtcbiAgICByQ29sV2lkdGhQZXJjZW50OiBudW1iZXI7XG4gICAgYWx0ZXJuYXRlUm93Q29sb3JzPzogYm9vbGVhbjtcbiAgICBjc3NPdmVycmlkZXM/OiBTZXJpYWxpemVkU3R5bGVzO1xuICAgIG9uQWN0aW9uQ2hhbmdlOiAoaG9zdDogc3RyaW5nLCBhY3Rpb246IEFjdGlvbnMpID0+IHZvaWQ7XG4gICAgb25SZXZlcnQ6ICgpID0+IHZvaWQ7XG4gICAgb25Db25maXJtU2l0ZUJyZWFrOiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IFRyYWNrZXJTZXR0aW5nczogRkM8VHJhY2tlclNldHRpbmdzUHJvcHM+ID0gKHtcbiAgICB0cmFja2VycyxcbiAgICB0aXRsZSxcbiAgICBoZWlnaHQsXG4gICAgbGFiZWxCZ0NvbG9yLFxuICAgIGxhYmVsRm9udFNpemUsXG4gICAgbENvbFdpZHRoUGVyY2VudCxcbiAgICByQ29sV2lkdGhQZXJjZW50LFxuICAgIGFsdGVybmF0ZVJvd0NvbG9ycyxcbiAgICBjc3NPdmVycmlkZXMsXG4gICAgb25BY3Rpb25DaGFuZ2UsXG4gICAgb25SZXZlcnQsXG4gICAgb25Db25maXJtU2l0ZUJyZWFrXG59KSA9PiB7XG4gICAgY29uc3QgdHJhY2tlclNldHRpbmdzQ3NzID0gY3NzYFxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RlZTBmNztcbiAgICAgICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XG4gICAgICAgICR7aGVpZ2h0ICYmIGBoZWlnaHQ6ICR7aGVpZ2h0fXB4OyBvdmVyZmxvdy15OiBhdXRvO2B9XG5cbiAgICAgICAgJjpsYXN0LW9mLXR5cGUge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICAgICAgfVxuICAgIGA7XG5cbiAgICBjb25zdCB0aXRsZUNzcyA9IGNzc2BcbiAgICAgICAgY29sb3I6ICM2NTczZmY7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgICAgICBwYWRkaW5nOiAxMnB4IDhweDtcbiAgICBgO1xuXG4gICAgY29uc3QgbGFiZWxSb3dDc3MgPSBjc3NgXG4gICAgICAgIGJhY2tncm91bmQ6ICR7bGFiZWxCZ0NvbG9yIHx8ICd0cmFuc3BhcmVudCd9O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmb250LXNpemU6ICR7bGFiZWxGb250U2l6ZSB8fCAnMTRweCd9O1xuICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gICAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgICAgcG9zaXRpb246IHN0aWNreTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmMmYzZmY7XG4gICAgYDtcblxuICAgIGNvbnN0IGRvbWFpbkNvbENzcyA9IGNzc2BcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgd2lkdGg6ICR7bENvbFdpZHRoUGVyY2VudH0lO1xuICAgIGA7XG5cbiAgICBjb25zdCBvcHRpb25zQ29sQ3NzID0gY3NzYFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB3aWR0aDogJHtyQ29sV2lkdGhQZXJjZW50fSU7XG4gICAgYDtcblxuICAgIGNvbnN0IG9wdGlvbnNMYWJlbENzcyA9IGNzc2BcbiAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgICB3aWR0aDogY2FsYygxMDAlIC8gMyk7XG4gICAgYDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXtbdHJhY2tlclNldHRpbmdzQ3NzLCBjc3NPdmVycmlkZXMgfHwgY3NzYGBdfT5cbiAgICAgICAgICAgIHt0aXRsZSAmJiA8ZGl2IGNzcz17dGl0bGVDc3N9Pnt0aXRsZX08L2Rpdj59XG4gICAgICAgICAgICA8ZGl2IGNzcz17bGFiZWxSb3dDc3N9PlxuICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtkb21haW5Db2xDc3N9PntnZXRNZXNzYWdlKCdwb3B1cE1hbmFnZVRyYWNrZXJzRG9tYWluTGFiZWwnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17b3B0aW9uc0NvbENzc30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtvcHRpb25zTGFiZWxDc3N9PntnZXRNZXNzYWdlKCdwb3B1cE1hbmFnZVRyYWNrZXJzQmxvY2tBbGxMYWJlbCcpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNzcz17b3B0aW9uc0xhYmVsQ3NzfT57Z2V0TWVzc2FnZSgncG9wdXBNYW5hZ2VUcmFja2Vyc0Jsb2NrQ29va2llc0xhYmVsJyl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtvcHRpb25zTGFiZWxDc3N9PntnZXRNZXNzYWdlKCdwb3B1cE1hbmFnZVRyYWNrZXJzQWxsb3dBbGxMYWJlbCcpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7T2JqZWN0LmVudHJpZXModHJhY2tlcnMpXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKFtob3N0LCBpbmZvXSkgPT4gaW5mby5hY3Rpb24gIT09ICdub2FjdGlvbicpXG4gICAgICAgICAgICAgICAgLm1hcCgoW2hvc3QsIGluZm9dLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8VHJhY2tlclJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q9e2hvc3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mbz17aW5mb31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleD17YWx0ZXJuYXRlUm93Q29sb3JzID8gaSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsQ29sV2lkdGhQZXJjZW50PXtsQ29sV2lkdGhQZXJjZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJDb2xXaWR0aFBlcmNlbnQ9e3JDb2xXaWR0aFBlcmNlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25BY3Rpb25DaGFuZ2U9e29uQWN0aW9uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmV2ZXJ0PXtvblJldmVydH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm1TaXRlQnJlYWs9e29uQ29uZmlybVNpdGVCcmVha31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG50eXBlIFRyYWNrZXJSb3dQcm9wcyA9IHtcbiAgICBob3N0OiBzdHJpbmc7XG4gICAgaW5mbzogVHJhY2tlckluZm87XG4gICAgbENvbFdpZHRoUGVyY2VudDogbnVtYmVyO1xuICAgIHJDb2xXaWR0aFBlcmNlbnQ6IG51bWJlcjtcbiAgICBvbkFjdGlvbkNoYW5nZTogKGhvc3Q6IHN0cmluZywgYWN0aW9uOiBBY3Rpb25zKSA9PiB2b2lkO1xuICAgIG9uUmV2ZXJ0OiAoKSA9PiB2b2lkO1xuICAgIG9uQ29uZmlybVNpdGVCcmVhazogKCkgPT4gdm9pZDtcbiAgICBpbmRleD86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBUcmFja2VyUm93OiBGQzxUcmFja2VyUm93UHJvcHM+ID0gKHtcbiAgICBob3N0LFxuICAgIGluZm8sXG4gICAgaW5kZXgsXG4gICAgbENvbFdpZHRoUGVyY2VudCxcbiAgICByQ29sV2lkdGhQZXJjZW50LFxuICAgIG9uQWN0aW9uQ2hhbmdlLFxuICAgIG9uUmV2ZXJ0LFxuICAgIG9uQ29uZmlybVNpdGVCcmVha1xufSkgPT4ge1xuICAgIGNvbnN0IFtzaG93V2FybmluZywgc2V0U2hvd1dhcm5pbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgY29uc3Qgb3B0aW9uU2VsZWN0Q3NzID0gY3NzYFxuICAgICAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZmJmYmZkO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2VkMWRkO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB3aWR0aDogMTZweDtcblxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgIH1cbiAgICBgO1xuXG4gICAgY29uc3QgdHJhY2tlclJvd0NzcyA9IGNzc2BcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIG1hcmdpbjogMXB4IDA7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggOHB4O1xuXG4gICAgICAgIC8qIE92ZXJyaWRlIGZpcmVmb3ggcmFkaW8gYnV0dG9uIHN0eWxlcyAqL1xuICAgICAgICBpbnB1dFt0eXBlPSdyYWRpbyddIHtcbiAgICAgICAgICAgICR7b3B0aW9uU2VsZWN0Q3NzfTtcbiAgICAgICAgfVxuICAgIGA7XG5cbiAgICBjb25zdCBvcHRpb25zQ29sQ3NzID0gY3NzYFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB3aWR0aDogJHtyQ29sV2lkdGhQZXJjZW50fSU7XG4gICAgYDtcblxuICAgIGNvbnN0IGRvbWFpbkNvbENzcyA9IGNzc2BcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICB3aWR0aDogJHtsQ29sV2lkdGhQZXJjZW50fSU7XG4gICAgYDtcblxuICAgIGNvbnN0IG9wdGlvblNlbGVjdEZpbGxDc3MgPSBjc3NgXG4gICAgICAgIGJhY2tncm91bmQ6ICR7c2hvd1dhcm5pbmcgfHwgKGluZm8uYWN0aW9uID09PSAndXNlcl9ibG9jaycgJiYgaW5mby5jb29raWVCbG9ja2xpc3RlZCkgPyAnI0VCNTc1NycgOiAnIzY1NzNmZid9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAxNnB4O1xuICAgIGA7XG5cbiAgICBjb25zdCByZXZlcnRCdG5Dc3MgPSBjc3NgXG4gICAgICAgIGJhY2tncm91bmQ6ICR7aW5mby5hY3Rpb24gPT09ICd1c2VyX2Jsb2NrJyAmJiBpbmZvLmNvb2tpZUJsb2NrbGlzdGVkID8gJyNFQjU3NTcnIDogJyM2NTczZmYnfTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgICAgICBoZWlnaHQ6IDE2cHg7XG4gICAgICAgIG1hcmdpbjogMCA4cHggMCAwO1xuICAgICAgICBtYXNrOiB1cmwoJ3JldmVydC1hcnJvdy5zdmcnKTtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgd2lkdGg6IDE2cHg7XG5cbiAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICB9XG4gICAgYDtcblxuICAgIGNvbnN0IGlzVXNlclNldCA9IFsndXNlcl9ibG9jaycsICd1c2VyX2FsbG93JywgJ3VzZXJfY29va2llYmxvY2snXS5pbmNsdWRlcyhpbmZvLmFjdGlvbik7XG5cbiAgICBjb25zdCByZXNvbHZlUm93QmdDb2xvciA9IChhY3RpdmU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKGluZm8uYWN0aW9uID09PSAndXNlcl9ibG9jaycgJiYgaW5mby5jb29raWVCbG9ja2xpc3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnI0ZGRURFRSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJyNGMEYxRkYnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJyNmYmZiZmQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAndHJhbnNwYXJlbnQnO1xuICAgIH07XG5cbiAgICBjb25zdCBvbkNoYW5nZSA9IChldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gZXZlbnQudGFyZ2V0LnZhbHVlIGFzIEFjdGlvbnM7XG5cbiAgICAgICAgaWYgKHNob3dXYXJuaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5mby5jb29raWVCbG9ja2xpc3RlZCAmJiBhY3Rpb24gPT09ICdibG9jaycpIHtcbiAgICAgICAgICAgIHNldFNob3dXYXJuaW5nKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb25BY3Rpb25DaGFuZ2UoaG9zdCwgYWN0aW9uKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYmxvY2tTZWxlY3RlZCA9IFsnYmxvY2snLCAndXNlcl9ibG9jayddLmluY2x1ZGVzKGluZm8uYWN0aW9uKSB8fCBzaG93V2FybmluZztcbiAgICBjb25zdCBjb29raWVCbG9ja1NlbGVjdGVkID0gWydjb29raWVibG9jaycsICd1c2VyX2Nvb2tpZWJsb2NrJ10uaW5jbHVkZXMoaW5mby5hY3Rpb24pICYmICFzaG93V2FybmluZztcbiAgICBjb25zdCBhbGxvd1NlbGVjdGVkID0gWydhbGxvdycsICd1c2VyX2FsbG93JywgJ2RudCddLmluY2x1ZGVzKGluZm8uYWN0aW9uKSAmJiAhc2hvd1dhcm5pbmc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNzcz17W1xuICAgICAgICAgICAgICAgICAgICB0cmFja2VyUm93Q3NzLFxuICAgICAgICAgICAgICAgICAgICBjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAke3Jlc29sdmVSb3dCZ0NvbG9yKGlzVXNlclNldCl9O1xuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17ZG9tYWluQ29sQ3NzfT5cbiAgICAgICAgICAgICAgICAgICAge2lzVXNlclNldCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtyZXZlcnRCdG5Dc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cInJldmVydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnREb21haW5Db250cm9sKGhvc3QpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZXZlcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2hvc3R9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17b3B0aW9uc0NvbENzc30+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj17YCR7aG9zdH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2Jsb2NrU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17aG9zdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cImJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtvcHRpb25TZWxlY3RDc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAge2Jsb2NrU2VsZWN0ZWQgJiYgPHNwYW4gY3NzPXtvcHRpb25TZWxlY3RGaWxsQ3NzfSAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXtgJHtob3N0fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29va2llQmxvY2tTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXtob3N0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiY29va2llYmxvY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e29wdGlvblNlbGVjdENzc31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29va2llQmxvY2tTZWxlY3RlZCAmJiA8c3BhbiBjc3M9e29wdGlvblNlbGVjdEZpbGxDc3N9IC8+fVxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e2Ake2hvc3R9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXthbGxvd1NlbGVjdGVkICYmICFzaG93V2FybmluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXtob3N0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiYWxsb3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e29wdGlvblNlbGVjdENzc31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YWxsb3dTZWxlY3RlZCAmJiAhc2hvd1dhcm5pbmcgJiYgPHNwYW4gY3NzPXtvcHRpb25TZWxlY3RGaWxsQ3NzfSAvPn1cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNzcz17W1xuICAgICAgICAgICAgICAgICAgICB0cmFja2VyUm93Q3NzLFxuICAgICAgICAgICAgICAgICAgICBjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZWI1NzU3O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHshc2hvd1dhcm5pbmcgJiYgJ2Rpc3BsYXk6IG5vbmUnfTtcbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCU7XG4gICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgncG9wdXBNYW5hZ2VUcmFja2Vyc1dhcm5pbmcnKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93V2FybmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlUG9wdXBUb2dnbGUoaG9zdCwgJ2Jsb2NrJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db25maXJtU2l0ZUJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdwb3B1cE1hbmFnZVRyYWNrZXJzV2FybmluZ1Byb2NlZWQnKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93V2FybmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgncG9wdXBNYW5hZ2VUcmFja2Vyc1dhcm5pbmdDYW5jZWwnKX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8Lz5cbiAgICApO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=