(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ 577:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(118);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(94);
/* harmony import */ var sp_privacy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(443);
/* harmony import */ var react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(474);
/* harmony import */ var react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_perfect_scrollbar_dist_css_styles_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(475);
/* harmony import */ var react_perfect_scrollbar_dist_css_styles_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_perfect_scrollbar_dist_css_styles_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_localization__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(19);
/* harmony import */ var _selectors_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(163);
/* harmony import */ var _Common_TrackerSettings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(476);



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
  name: "ysslze-titleCss",
  styles: "border-bottom:1px solid #ebecf7;font-weight:600;font-size:22px;padding:16px;;label:titleCss;"
} : undefined;
var _ref2 =  true ? {
  name: "gc75tx-ManageTrackers",
  styles: "padding:0 8px 16px;;label:ManageTrackers;"
} : undefined;
var _ref3 =  true ? {
  name: "gc75tx-ManageTrackers",
  styles: "padding:0 8px 16px;;label:ManageTrackers;"
} : undefined;
var ManageTrackers = () => {
  var {
    trackers
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__[/* useSelector */ "c"])(_selectors_index__WEBPACK_IMPORTED_MODULE_10__[/* tabDataSelector */ "d"]);
  var majorTrackers = {};
  Object.entries(trackers).forEach(_ref4 => {
    var [host, info] = _ref4;
    if (info.type === 'major' && !['allow', 'dnt'].includes(info.action)) {
      majorTrackers[host] = info;
    }
  });
  var minorTrackers = {};
  Object.entries(trackers).forEach(_ref5 => {
    var [host, info] = _ref5;
    if (info.type === 'minor' && !['allow', 'dnt'].includes(info.action)) {
      minorTrackers[host] = info;
    }
  });
  var titleCss = _ref;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])("div", {
    css: /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* css */ "b"])(react_perfect_scrollbar_dist_css_styles_css__WEBPACK_IMPORTED_MODULE_8___default.a, ";label:ManageTrackers;" + ( true ? "" : undefined))
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])(react_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_7___default.a, {
    style: {
      height: '444px'
    }
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])("div", {
    css: titleCss
  }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_9__[/* getMessage */ "b"])('popupManageTrackersTitle')), Object.entries(majorTrackers).length > 0 && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])(_Common_TrackerSettings__WEBPACK_IMPORTED_MODULE_11__[/* TrackerSettings */ "a"], {
    title: Object(_utils_localization__WEBPACK_IMPORTED_MODULE_9__[/* getMessage */ "b"])('popupManageTrackersMajorTitle'),
    labelBgColor: "#fbfbfd",
    labelFontSize: "11px",
    trackers: majorTrackers,
    lColWidthPercent: 46.34,
    rColWidthPercent: 56.35,
    cssOverrides: _ref2,
    onActionChange: (host, action) => {
      Object(sp_privacy__WEBPACK_IMPORTED_MODULE_6__[/* savePopupToggle */ "b"])(host, action).then(() => {
        browser.runtime.sendMessage({
          message: 'getPrivacyData'
        });
      });
    },
    onRevert: () => {
      browser.tabs.reload().then(() => {
        window.close();
      });
    },
    onConfirmSiteBreak: () => {
      browser.runtime.sendMessage({
        message: 'getPrivacyData'
      });
    }
  }), Object.entries(minorTrackers).length > 0 && Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__[/* jsx */ "c"])(_Common_TrackerSettings__WEBPACK_IMPORTED_MODULE_11__[/* TrackerSettings */ "a"], {
    title: Object(_utils_localization__WEBPACK_IMPORTED_MODULE_9__[/* getMessage */ "b"])('popupManageTrackersMinorTitle'),
    labelBgColor: "#fbfbfd",
    labelFontSize: "11px",
    trackers: minorTrackers,
    lColWidthPercent: 46.34,
    rColWidthPercent: 56.35,
    cssOverrides: _ref3,
    alternateRowColors: true,
    onActionChange: (host, action) => {
      Object(sp_privacy__WEBPACK_IMPORTED_MODULE_6__[/* savePopupToggle */ "b"])(host, action).then(() => {
        browser.runtime.sendMessage({
          message: 'getPrivacyData'
        });
      });
    },
    onRevert: () => {
      browser.tabs.reload().then(() => {
        window.close();
      });
    },
    onConfirmSiteBreak: () => {
      browser.runtime.sendMessage({
        message: 'getPrivacyData'
      });
    }
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (ManageTrackers);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9Qb3B1cC9NYW5hZ2VUcmFja2Vycy50c3giXSwibmFtZXMiOlsiX3JlZiIsInByb2Nlc3MiLCJuYW1lIiwic3R5bGVzIiwiX3JlZjIiLCJfcmVmMyIsIk1hbmFnZVRyYWNrZXJzIiwidHJhY2tlcnMiLCJ1c2VTZWxlY3RvciIsInRhYkRhdGFTZWxlY3RvciIsIm1ham9yVHJhY2tlcnMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsIl9yZWY0IiwiaG9zdCIsImluZm8iLCJ0eXBlIiwiaW5jbHVkZXMiLCJhY3Rpb24iLCJtaW5vclRyYWNrZXJzIiwiX3JlZjUiLCJ0aXRsZUNzcyIsIl9fX0Vtb3Rpb25KU1giLCJjc3MiLCJzY3JvbGxiYXJTdHlsZSIsIlBlcmZlY3RTY3JvbGxiYXIiLCJzdHlsZSIsImhlaWdodCIsImdldE1lc3NhZ2UiLCJsZW5ndGgiLCJUcmFja2VyU2V0dGluZ3MiLCJ0aXRsZSIsImxhYmVsQmdDb2xvciIsImxhYmVsRm9udFNpemUiLCJsQ29sV2lkdGhQZXJjZW50IiwickNvbFdpZHRoUGVyY2VudCIsImNzc092ZXJyaWRlcyIsIm9uQWN0aW9uQ2hhbmdlIiwic2F2ZVBvcHVwVG9nZ2xlIiwidGhlbiIsImJyb3dzZXIiLCJydW50aW1lIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwib25SZXZlcnQiLCJ0YWJzIiwicmVsb2FkIiwid2luZG93IiwiY2xvc2UiLCJvbkNvbmZpcm1TaXRlQnJlYWsiLCJhbHRlcm5hdGVSb3dDb2xvcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWdDO0FBQ0U7QUFDTTtBQUNHO0FBQ1k7QUFDa0I7QUFFckI7QUFDRTtBQUVJO0FBQUE7QUFB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MjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBSZWFjdCwge0ZDfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQge3VzZVNlbGVjdG9yfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3NhdmVQb3B1cFRvZ2dsZX0gZnJvbSAnc3AtcHJpdmFjeSc7XG5pbXBvcnQgUGVyZmVjdFNjcm9sbGJhciBmcm9tICdyZWFjdC1wZXJmZWN0LXNjcm9sbGJhcic7XG5pbXBvcnQgc2Nyb2xsYmFyU3R5bGUgZnJvbSAncmVhY3QtcGVyZmVjdC1zY3JvbGxiYXIvZGlzdC9jc3Mvc3R5bGVzLmNzcyc7XG5cbmltcG9ydCB7Z2V0TWVzc2FnZX0gZnJvbSAnLi4vLi4vdXRpbHMvbG9jYWxpemF0aW9uJztcbmltcG9ydCB7dGFiRGF0YVNlbGVjdG9yfSBmcm9tICcuLi8uLi9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHtUcmFja2Vyc30gZnJvbSAnLi4vLi4vcHJpdmFjeSB0b29scy90cmFja2Vycyc7XG5pbXBvcnQge1RyYWNrZXJTZXR0aW5nc30gZnJvbSAnLi4vQ29tbW9uL1RyYWNrZXJTZXR0aW5ncyc7XG5cbmNvbnN0IE1hbmFnZVRyYWNrZXJzOiBGQyA9ICgpID0+IHtcbiAgICBjb25zdCB7dHJhY2tlcnN9ID0gdXNlU2VsZWN0b3IodGFiRGF0YVNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG1ham9yVHJhY2tlcnM6IFRyYWNrZXJzID0ge307XG4gICAgT2JqZWN0LmVudHJpZXModHJhY2tlcnMpLmZvckVhY2goKFtob3N0LCBpbmZvXSkgPT4ge1xuICAgICAgICBpZiAoaW5mby50eXBlID09PSAnbWFqb3InICYmICFbJ2FsbG93JywgJ2RudCddLmluY2x1ZGVzKGluZm8uYWN0aW9uKSkge1xuICAgICAgICAgICAgbWFqb3JUcmFja2Vyc1tob3N0XSA9IGluZm87XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1pbm9yVHJhY2tlcnM6IFRyYWNrZXJzID0ge307XG4gICAgT2JqZWN0LmVudHJpZXModHJhY2tlcnMpLmZvckVhY2goKFtob3N0LCBpbmZvXSkgPT4ge1xuICAgICAgICBpZiAoaW5mby50eXBlID09PSAnbWlub3InICYmICFbJ2FsbG93JywgJ2RudCddLmluY2x1ZGVzKGluZm8uYWN0aW9uKSkge1xuICAgICAgICAgICAgbWlub3JUcmFja2Vyc1tob3N0XSA9IGluZm87XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRpdGxlQ3NzID0gY3NzYFxuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ViZWNmNztcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgICBwYWRkaW5nOiAxNnB4O1xuICAgIGA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAke3Njcm9sbGJhclN0eWxlfVxuICAgICAgICAgICAgYH1cbiAgICAgICAgPlxuICAgICAgICAgICAgPFBlcmZlY3RTY3JvbGxiYXIgc3R5bGU9e3toZWlnaHQ6ICc0NDRweCd9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNzcz17dGl0bGVDc3N9PntnZXRNZXNzYWdlKCdwb3B1cE1hbmFnZVRyYWNrZXJzVGl0bGUnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMobWFqb3JUcmFja2VycykubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxUcmFja2VyU2V0dGluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtnZXRNZXNzYWdlKCdwb3B1cE1hbmFnZVRyYWNrZXJzTWFqb3JUaXRsZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxCZ0NvbG9yPVwiI2ZiZmJmZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbEZvbnRTaXplPVwiMTFweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFja2Vycz17bWFqb3JUcmFja2Vyc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxDb2xXaWR0aFBlcmNlbnQ9ezQ2LjM0fVxuICAgICAgICAgICAgICAgICAgICAgICAgckNvbFdpZHRoUGVyY2VudD17NTYuMzV9XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NPdmVycmlkZXM9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwIDhweCAxNnB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQWN0aW9uQ2hhbmdlPXsoaG9zdCwgYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZVBvcHVwVG9nZ2xlKGhvc3QsIGFjdGlvbikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7bWVzc2FnZTogJ2dldFByaXZhY3lEYXRhJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmV2ZXJ0PXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci50YWJzLnJlbG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbmZpcm1TaXRlQnJlYWs9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe21lc3NhZ2U6ICdnZXRQcml2YWN5RGF0YSd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMobWlub3JUcmFja2VycykubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxUcmFja2VyU2V0dGluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtnZXRNZXNzYWdlKCdwb3B1cE1hbmFnZVRyYWNrZXJzTWlub3JUaXRsZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxCZ0NvbG9yPVwiI2ZiZmJmZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbEZvbnRTaXplPVwiMTFweFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFja2Vycz17bWlub3JUcmFja2Vyc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGxDb2xXaWR0aFBlcmNlbnQ9ezQ2LjM0fVxuICAgICAgICAgICAgICAgICAgICAgICAgckNvbFdpZHRoUGVyY2VudD17NTYuMzV9XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3NPdmVycmlkZXM9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwIDhweCAxNnB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdGVybmF0ZVJvd0NvbG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgb25BY3Rpb25DaGFuZ2U9eyhob3N0LCBhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlUG9wdXBUb2dnbGUoaG9zdCwgYWN0aW9uKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHttZXNzYWdlOiAnZ2V0UHJpdmFjeURhdGEnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25SZXZlcnQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyLnRhYnMucmVsb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybVNpdGVCcmVhaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7bWVzc2FnZTogJ2dldFByaXZhY3lEYXRhJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9QZXJmZWN0U2Nyb2xsYmFyPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlVHJhY2tlcnM7XG4iXSwic291cmNlUm9vdCI6IiJ9