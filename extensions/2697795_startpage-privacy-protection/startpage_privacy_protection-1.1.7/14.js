(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__(86);
var definePropertyModule = __webpack_require__(17);
var createPropertyDescriptor = __webpack_require__(49);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(15);
var iterate = __webpack_require__(129);
var createProperty = __webpack_require__(238);

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
$({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});


/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@emotion/core/dist/core.browser.esm.js + 10 modules
var core_browser_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.from-entries.js
var es_object_from_entries = __webpack_require__(478);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(164);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Box/Box.js + 12 modules
var Box = __webpack_require__(590);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Typography/Typography.js
var Typography = __webpack_require__(387);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Link/Link.js
var Link = __webpack_require__(578);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/TextField/TextField.js + 1 modules
var TextField = __webpack_require__(595);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/InputAdornment/InputAdornment.js
var InputAdornment = __webpack_require__(583);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Button/Button.js
var Button = __webpack_require__(585);

// EXTERNAL MODULE: ./node_modules/@material-ui/icons/CloseSharp.js
var CloseSharp = __webpack_require__(440);
var CloseSharp_default = /*#__PURE__*/__webpack_require__.n(CloseSharp);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 24 modules
var es = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(118);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(165);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/FormControl/FormControl.js
var FormControl = __webpack_require__(581);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/InputLabel/InputLabel.js + 1 modules
var InputLabel = __webpack_require__(598);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Select/Select.js + 14 modules
var Select = __webpack_require__(589);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js
var MenuItem = __webpack_require__(586);

// EXTERNAL MODULE: ./src/privacy-search/utils/localization.ts
var localization = __webpack_require__(19);

// CONCATENATED MODULE: ./src/privacy-search/components/Options/TrackerDomainsTab/Filters.tsx





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

/* eslint-disable @typescript-eslint/no-unused-vars */





var TypeFilters = {
  UserControlled: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterUserControlled'),
  DNTCompliant: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterDNT')
};
var StatusFilters = {
  Blocked: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterBlocked'),
  CookiesBlocked: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterCookiesBlocked'),
  Allowed: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterAllowed')
};
var CategoryFilters = {
  MajorTrackers: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterMajorTrackers'),
  OtherTrackers: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterMinorTrackers')
};
var getFilteredTrackers = (trackers, activeFilters) => {
  var {
    query,
    type,
    status,
    category
  } = activeFilters;
  var filteredTrackers = trackers;

  // Apply search filter
  filteredTrackers = Object.fromEntries(Object.entries(filteredTrackers).filter(_ref3 => {
    var [host, _] = _ref3;
    return host.includes(query || '');
  }));

  // Apply type filter
  switch (type) {
    case TypeFilters.UserControlled:
      filteredTrackers = Object.fromEntries(Object.entries(filteredTrackers).filter(_ref4 => {
        var [_, info] = _ref4;
        return ['user_block', 'user_cookieblock', 'user_allow'].includes(info.action);
      }));
      break;
    case TypeFilters.DNTCompliant:
      filteredTrackers = Object.fromEntries(Object.entries(filteredTrackers).filter(_ref5 => {
        var [_, info] = _ref5;
        return info.action === 'dnt';
      }));
      break;
    default:
      break;
  }

  // Apply status filter
  switch (status) {
    case StatusFilters.Allowed:
      filteredTrackers = Object.fromEntries(Object.entries(filteredTrackers).filter(_ref6 => {
        var [_, info] = _ref6;
        return ['allow', 'user_allow', 'dnt'].includes(info.action);
      }));
      break;
    case StatusFilters.Blocked:
      filteredTrackers = Object.fromEntries(Object.entries(filteredTrackers).filter(_ref7 => {
        var [_, info] = _ref7;
        return ['block', 'cookieblock', 'user_block', 'user_cookieblock'].includes(info.action);
      }));
      break;
    case StatusFilters.CookiesBlocked:
      filteredTrackers = Object.fromEntries(Object.entries(filteredTrackers).filter(_ref8 => {
        var [_, info] = _ref8;
        return ['cookieblock', 'user_cookieblock'].includes(info.action);
      }));
      break;
    default:
      break;
  }

  // Apply category filter
  switch (category) {
    case CategoryFilters.MajorTrackers:
      filteredTrackers = Object.fromEntries(Object.entries(filteredTrackers).filter(_ref9 => {
        var [_, info] = _ref9;
        return info.type === 'major';
      }));
      break;
    case CategoryFilters.OtherTrackers:
      filteredTrackers = Object.fromEntries(Object.entries(filteredTrackers).filter(_ref10 => {
        var [_, info] = _ref10;
        return info.type === 'minor';
      }));
      break;
    default:
      break;
  }
  return filteredTrackers;
};
var _ref =  true ? {
  name: "1phflsf-Filter",
  styles: "background-color:transparent;&:hover,&:focus{background-color:#ebecf7;};label:Filter;"
} : undefined;
var _ref2 =  true ? {
  name: "1phflsf-Filter",
  styles: "background-color:transparent;&:hover,&:focus{background-color:#ebecf7;};label:Filter;"
} : undefined;
var Filter = _ref11 => {
  var {
    filterName,
    filterLabel,
    filterGroup,
    defaultValue,
    onChange
  } = _ref11;
  return Object(core_browser_esm["c" /* jsx */])(FormControl["a" /* default */], {
    variant: "outlined",
    fullWidth: true,
    size: "small"
  }, Object(core_browser_esm["c" /* jsx */])(InputLabel["a" /* default */], {
    htmlFor: "filter-by-".concat(filterName)
  }, filterLabel), Object(core_browser_esm["c" /* jsx */])(Select["a" /* default */], {
    style: {
      boxShadow: 'none'
    },
    onChange: onChange,
    variant: "outlined",
    labelId: "filter-by-".concat(filterName),
    label: "filter-by-".concat(filterName),
    id: "filter-by-".concat(filterName)
  }, Object(core_browser_esm["c" /* jsx */])(MenuItem["a" /* default */], {
    key: "default",
    value: "",
    css: _ref
  }, defaultValue), Object.entries(filterGroup).map(_ref12 => {
    var [_, filter] = _ref12;
    return Object(core_browser_esm["c" /* jsx */])(MenuItem["a" /* default */], {
      key: filter,
      value: filter,
      css: _ref2
    }, filter);
  })));
};
// EXTERNAL MODULE: ./src/privacy-search/selectors/index.ts
var selectors = __webpack_require__(163);

// EXTERNAL MODULE: ./src/privacy-search/components/Common/TrackerSettings.tsx
var TrackerSettings = __webpack_require__(476);

// CONCATENATED MODULE: ./src/privacy-search/components/Options/TrackerDomainsTab/ManageAllowList.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




function ManageAllowList_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
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

/* eslint-disable @typescript-eslint/no-unused-vars */










var EXT_LANGUAGE_CODE = Object(localization["a" /* getLanguage */])();
var SUPPORT_ARTICLE = EXT_LANGUAGE_CODE === 'de' ? 'https://support.startpage.com/hc/de/articles/4455146591764-Was-ist-ein-Drittanbieter-Third-Party-Tracker-' : 'https://support.startpage.com/hc/en-us/articles/4455146591764-What-is-a-third-party-tracker-';
var ManageAllowList_ref =  true ? {
  name: "g2l5ng-ManageAllowList",
  styles: "border:1px solid #dee0f7;border-radius:4px;padding:24px 12px;;label:ManageAllowList;"
} : undefined;
var ManageAllowList_ref2 =  true ? {
  name: "iiv3o9-ManageAllowList",
  styles: "margin-bottom:16px;margin-left:12px;;label:ManageAllowList;"
} : undefined;
var _ref3 =  true ? {
  name: "1sosuvl-ManageAllowList",
  styles: "margin-bottom:24px;margin-left:12px;;label:ManageAllowList;"
} : undefined;
var _ref4 =  true ? {
  name: "1s2us0b-ManageAllowList",
  styles: "font-weight:400;color:#2e39b3;&:hover{color:#6677fb;};label:ManageAllowList;"
} : undefined;
var _ref5 =  true ? {
  name: "7i60ev-ManageAllowList",
  styles: "margin-bottom:16px;.MuiOutlinedInput-root{box-shadow:none !important;};label:ManageAllowList;"
} : undefined;
var _ref6 =  true ? {
  name: "8pldeo-ManageAllowList",
  styles: "display:flex;margin-bottom:32px;> *{margin-right:16px;&:last-of-type{margin-right:0;}};label:ManageAllowList;"
} : undefined;
var ManageAllowList = () => {
  var [activeFilters, setActiveFilters] = Object(react["useState"])({});
  var options = Object(es["c" /* useSelector */])(selectors["b" /* optionsSelector */]);

  // Get all listable trackers. Ignoring any that are of action: "allow", since they're safe.
  var trackers = Object.fromEntries(Object.entries(options.trackers || {}).filter(_ref7 => {
    var [_, info] = _ref7;
    return info.action !== 'allow';
  }));
  var trackersBlockedCount = Object.values(trackers).filter(info => info.action === 'block' || info.action === 'cookieblock' || info.action === 'user_block' || info.action === 'user_cookieblock').length;
  return Object(core_browser_esm["c" /* jsx */])(Box["a" /* default */], {
    css: ManageAllowList_ref
  }, Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "h3",
    component: "h3",
    css: ManageAllowList_ref2
  }, Object(localization["b" /* getMessage */])('settingsTrackersTabTitle')), Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "body1",
    component: "p",
    css: _ref3
  }, Object(localization["b" /* getMessage */])('settingsTrackersTabBlockedCountLabel'), " ", Object(core_browser_esm["c" /* jsx */])("b", null, trackersBlockedCount), ' ', Object(localization["b" /* getMessage */])('settingsTrackersTabPotential'), ' ', Object(core_browser_esm["c" /* jsx */])(Link["a" /* default */], {
    variant: "body2",
    href: SUPPORT_ARTICLE,
    target: "_blank",
    rel: "noopener noreferrer",
    css: _ref4
  }, Object(localization["b" /* getMessage */])('settingsTrackersTabTrackersLink'), ' '), Object(localization["b" /* getMessage */])('settingsTrackersTabUpdated')), Object(core_browser_esm["c" /* jsx */])(TextField["a" /* default */], {
    onChange: e => {
      setActiveFilters(_objectSpread(_objectSpread({}, activeFilters), {}, {
        query: e.target.value
      }));
    },
    value: (activeFilters === null || activeFilters === void 0 ? void 0 : activeFilters.query) || '',
    name: "allowListUrl",
    label: Object(localization["b" /* getMessage */])('settingsTrackersTabSearchPlaceholder'),
    color: "primary",
    variant: "outlined",
    fullWidth: true,
    size: "small",
    css: _ref5,
    InputProps: {
      endAdornment: Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, (activeFilters === null || activeFilters === void 0 ? void 0 : activeFilters.query) && activeFilters.query !== '' && Object(core_browser_esm["c" /* jsx */])(InputAdornment["a" /* default */], {
        position: "end"
      }, Object(core_browser_esm["c" /* jsx */])(Button["a" /* default */], {
        style: {
          color: '#7F869F',
          backgroundColor: 'transparent',
          padding: '0',
          minWidth: '0'
        },
        variant: "text",
        onClick: () => {
          setActiveFilters(_objectSpread(_objectSpread({}, activeFilters), {}, {
            query: ''
          }));
        },
        disableRipple: true
      }, Object(core_browser_esm["c" /* jsx */])(CloseSharp_default.a, null))))
    }
  }), Object(core_browser_esm["c" /* jsx */])("div", {
    css: _ref6
  }, Object(core_browser_esm["c" /* jsx */])(Filter, {
    filterName: Object(localization["b" /* getMessage */])('settingsTrackersTabTypeFilter'),
    filterLabel: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterBy', Object(localization["b" /* getMessage */])('settingsTrackersTabTypeFilter')),
    filterGroup: TypeFilters,
    defaultValue: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterDefault'),
    onChange: e => {
      var {
        value
      } = e.target;
      var type = Object.values(TypeFilters).filter(t => t === value).pop();
      setActiveFilters(_objectSpread(_objectSpread({}, activeFilters), {}, {
        type
      }));
    }
  }), Object(core_browser_esm["c" /* jsx */])(Filter, {
    filterName: Object(localization["b" /* getMessage */])('settingsTrackersTabStatusFilter'),
    filterLabel: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterBy', Object(localization["b" /* getMessage */])('settingsTrackersTabStatusFilter')),
    filterGroup: StatusFilters,
    defaultValue: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterDefault'),
    onChange: e => {
      var {
        value
      } = e.target;
      var status = Object.values(StatusFilters).filter(t => t === value).pop();
      setActiveFilters(_objectSpread(_objectSpread({}, activeFilters), {}, {
        status
      }));
    }
  }), Object(core_browser_esm["c" /* jsx */])(Filter, {
    filterName: Object(localization["b" /* getMessage */])('settingsTrackersTabCategoryFilter'),
    filterLabel: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterBy', Object(localization["b" /* getMessage */])('settingsTrackersTabCategoryFilter')),
    filterGroup: CategoryFilters,
    defaultValue: Object(localization["b" /* getMessage */])('settingsTrackersTabFilterDefault'),
    onChange: e => {
      var {
        value
      } = e.target;
      var category = Object.values(CategoryFilters).filter(t => t === value).pop();
      setActiveFilters(_objectSpread(_objectSpread({}, activeFilters), {}, {
        category
      }));
    }
  })), Object(core_browser_esm["c" /* jsx */])(TrackerSettings["a" /* TrackerSettings */], {
    trackers: getFilteredTrackers(trackers, activeFilters),
    lColWidthPercent: 36.34,
    rColWidthPercent: 66.35,
    alternateRowColors: true,
    height: 777,
    onActionChange: (host, action) => {
      browser.runtime.sendMessage({
        type: 'saveOptionsToggle',
        action,
        origin: host
      }).then(() => {
        browser.runtime.sendMessage({
          message: 'getOptions'
        });
      });
    },
    onRevert: () => {
      browser.runtime.sendMessage({
        message: 'getOptions'
      });
    },
    onConfirmSiteBreak: () => {
      browser.runtime.sendMessage({
        message: 'getOptions'
      });
    }
  }));
};
/* harmony default export */ var TrackerDomainsTab_ManageAllowList = (ManageAllowList);
// CONCATENATED MODULE: ./src/privacy-search/components/Options/TrackerDomainsTab/index.tsx
function TrackerDomainsTab_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
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





var TrackerDomainsTab_ref =  true ? {
  name: "1ea3ug8-TrackerDomainsTab",
  styles: "padding-bottom:78px;;label:TrackerDomainsTab;"
} : undefined;
var TrackerDomainsTab = () => {
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: TrackerDomainsTab_ref
  }, Object(core_browser_esm["c" /* jsx */])(TrackerDomainsTab_ManageAllowList, null));
};
/* harmony default export */ var Options_TrackerDomainsTab = __webpack_exports__["default"] = (TrackerDomainsTab);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LmZyb20tZW50cmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9PcHRpb25zL1RyYWNrZXJEb21haW5zVGFiL0ZpbHRlcnMudHN4Iiwid2VicGFjazovLy8uL3NyYy9wcml2YWN5LXNlYXJjaC9jb21wb25lbnRzL09wdGlvbnMvVHJhY2tlckRvbWFpbnNUYWIvTWFuYWdlQWxsb3dMaXN0LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9PcHRpb25zL1RyYWNrZXJEb21haW5zVGFiL2luZGV4LnRzeCJdLCJuYW1lcyI6WyJUeXBlRmlsdGVycyIsIlVzZXJDb250cm9sbGVkIiwiZ2V0TWVzc2FnZSIsIkROVENvbXBsaWFudCIsIlN0YXR1c0ZpbHRlcnMiLCJCbG9ja2VkIiwiQ29va2llc0Jsb2NrZWQiLCJBbGxvd2VkIiwiQ2F0ZWdvcnlGaWx0ZXJzIiwiTWFqb3JUcmFja2VycyIsIk90aGVyVHJhY2tlcnMiLCJnZXRGaWx0ZXJlZFRyYWNrZXJzIiwidHJhY2tlcnMiLCJhY3RpdmVGaWx0ZXJzIiwicXVlcnkiLCJ0eXBlIiwic3RhdHVzIiwiY2F0ZWdvcnkiLCJmaWx0ZXJlZFRyYWNrZXJzIiwiT2JqZWN0IiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwiZmlsdGVyIiwiX3JlZjMiLCJob3N0IiwiXyIsImluY2x1ZGVzIiwiX3JlZjQiLCJpbmZvIiwiYWN0aW9uIiwiX3JlZjUiLCJfcmVmNiIsIl9yZWY3IiwiX3JlZjgiLCJfcmVmOSIsIl9yZWYxMCIsIl9yZWYiLCJwcm9jZXNzIiwibmFtZSIsInN0eWxlcyIsIl9yZWYyIiwiRmlsdGVyIiwiX3JlZjExIiwiZmlsdGVyTmFtZSIsImZpbHRlckxhYmVsIiwiZmlsdGVyR3JvdXAiLCJkZWZhdWx0VmFsdWUiLCJvbkNoYW5nZSIsIl9fX0Vtb3Rpb25KU1giLCJGb3JtQ29udHJvbCIsInZhcmlhbnQiLCJmdWxsV2lkdGgiLCJzaXplIiwiSW5wdXRMYWJlbCIsImh0bWxGb3IiLCJjb25jYXQiLCJTZWxlY3QiLCJzdHlsZSIsImJveFNoYWRvdyIsImxhYmVsSWQiLCJsYWJlbCIsImlkIiwiTWVudUl0ZW0iLCJrZXkiLCJ2YWx1ZSIsImNzcyIsIm1hcCIsIl9yZWYxMiIsIkVYVF9MQU5HVUFHRV9DT0RFIiwiZ2V0TGFuZ3VhZ2UiLCJTVVBQT1JUX0FSVElDTEUiLCJNYW5hZ2VBbGxvd0xpc3QiLCJzZXRBY3RpdmVGaWx0ZXJzIiwidXNlU3RhdGUiLCJvcHRpb25zIiwidXNlU2VsZWN0b3IiLCJvcHRpb25zU2VsZWN0b3IiLCJ0cmFja2Vyc0Jsb2NrZWRDb3VudCIsInZhbHVlcyIsImxlbmd0aCIsIkJveCIsIlR5cG9ncmFwaHkiLCJjb21wb25lbnQiLCJMaW5rIiwiaHJlZiIsInRhcmdldCIsInJlbCIsIlRleHRGaWVsZCIsImUiLCJfb2JqZWN0U3ByZWFkIiwiY29sb3IiLCJJbnB1dFByb3BzIiwiZW5kQWRvcm5tZW50IiwiUmVhY3QiLCJGcmFnbWVudCIsIklucHV0QWRvcm5tZW50IiwicG9zaXRpb24iLCJCdXR0b24iLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwibWluV2lkdGgiLCJvbkNsaWNrIiwiZGlzYWJsZVJpcHBsZSIsIkNsb3NlSWNvbiIsInQiLCJwb3AiLCJUcmFja2VyU2V0dGluZ3MiLCJsQ29sV2lkdGhQZXJjZW50IiwickNvbFdpZHRoUGVyY2VudCIsImFsdGVybmF0ZVJvd0NvbG9ycyIsImhlaWdodCIsIm9uQWN0aW9uQ2hhbmdlIiwiYnJvd3NlciIsInJ1bnRpbWUiLCJzZW5kTWVzc2FnZSIsIm9yaWdpbiIsInRoZW4iLCJtZXNzYWdlIiwib25SZXZlcnQiLCJvbkNvbmZpcm1TaXRlQnJlYWsiLCJU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RTtJQUNGQyxRQUFRLEVBQUVBLENBQUEsS0FBTTtNQUNaTixPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsV0FBVyxDQUFDO1FBQUNHLE9BQU8sRUFBRTtNQUFZLENBQUMsQ0FBQztJQUN4RCxDQUFFO0lBQ0ZFLGtCQUFrQixFQUFFQSxDQUFBLEtBQU07TUFDdEJQLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDQyxXQUFXLENBQUM7UUFBQ0csT0FBTyxFQUFFO01BQVksQ0FBQyxDQUFDO0lBQ3hEO0VBQUUsRUFDSixDQUNBO0FBRWQsQ0FBQztBQUVjOUMscUZBQWUsRTs7O0FDaE85QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZ0M7QUFDRTtBQUVjO0FBQUE7QUFBQSxJQUFBbkMscUJBQUEsR0FBQUMsS0FBQTtFQUFBQyxJQUFBO0VBQUFDLE1BQUE7QUFBQTtBQUVoRCxJQUFNaUYsaUJBQXFCLEdBQUdBLENBQUEsS0FBTTtFQUNoQyxPQUNJeEUsdUNBQUE7SUFDSWlCLEdBQUcsRUFBQTdCO0VBRUQsR0FFRlksdUNBQUEsQ0FBQ3VCLGlDQUFlLE9BQUcsQ0FDakI7QUFFZCxDQUFDO0FBRWNpRCxnSEFBaUIsRSIsImZpbGUiOiIxNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUtleSA9IHRvUHJvcGVydHlLZXkoa2V5KTtcbiAgaWYgKHByb3BlcnR5S2V5IGluIG9iamVjdCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIHByb3BlcnR5S2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbcHJvcGVydHlLZXldID0gdmFsdWU7XG59O1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXRlcmF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG5cbi8vIGBPYmplY3QuZnJvbUVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LWZyb20tZW50cmllc1xuJCh7IHRhcmdldDogJ09iamVjdCcsIHN0YXQ6IHRydWUgfSwge1xuICBmcm9tRW50cmllczogZnVuY3Rpb24gZnJvbUVudHJpZXMoaXRlcmFibGUpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgaXRlcmF0ZShpdGVyYWJsZSwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KG9iaiwgaywgdik7XG4gICAgfSwgeyBBU19FTlRSSUVTOiB0cnVlIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH1cbn0pO1xuIiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IFJlYWN0LCB7RkMsIENoYW5nZUV2ZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nzc30gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQge1NlbGVjdCwgRm9ybUNvbnRyb2wsIElucHV0TGFiZWwsIE1lbnVJdGVtfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSc7XG5cbmltcG9ydCB7Z2V0TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbG9jYWxpemF0aW9uJztcbmltcG9ydCB7VHJhY2tlcnN9IGZyb20gJy4uLy4uLy4uL3ByaXZhY3kgdG9vbHMvdHJhY2tlcnMnO1xuXG5leHBvcnQgY29uc3QgVHlwZUZpbHRlcnMgPSB7XG4gICAgVXNlckNvbnRyb2xsZWQ6IGdldE1lc3NhZ2UoJ3NldHRpbmdzVHJhY2tlcnNUYWJGaWx0ZXJVc2VyQ29udHJvbGxlZCcpLFxuICAgIEROVENvbXBsaWFudDogZ2V0TWVzc2FnZSgnc2V0dGluZ3NUcmFja2Vyc1RhYkZpbHRlckROVCcpXG59IGFzIGNvbnN0O1xudHlwZSBUeXBlRmlsdGVycyA9IHR5cGVvZiBUeXBlRmlsdGVyc1trZXlvZiB0eXBlb2YgVHlwZUZpbHRlcnNdO1xuXG5leHBvcnQgY29uc3QgU3RhdHVzRmlsdGVycyA9IHtcbiAgICBCbG9ja2VkOiBnZXRNZXNzYWdlKCdzZXR0aW5nc1RyYWNrZXJzVGFiRmlsdGVyQmxvY2tlZCcpLFxuICAgIENvb2tpZXNCbG9ja2VkOiBnZXRNZXNzYWdlKCdzZXR0aW5nc1RyYWNrZXJzVGFiRmlsdGVyQ29va2llc0Jsb2NrZWQnKSxcbiAgICBBbGxvd2VkOiBnZXRNZXNzYWdlKCdzZXR0aW5nc1RyYWNrZXJzVGFiRmlsdGVyQWxsb3dlZCcpXG59IGFzIGNvbnN0O1xudHlwZSBTdGF0dXNGaWx0ZXJzID0gdHlwZW9mIFN0YXR1c0ZpbHRlcnNba2V5b2YgdHlwZW9mIFN0YXR1c0ZpbHRlcnNdO1xuXG5leHBvcnQgY29uc3QgQ2F0ZWdvcnlGaWx0ZXJzID0ge1xuICAgIE1ham9yVHJhY2tlcnM6IGdldE1lc3NhZ2UoJ3NldHRpbmdzVHJhY2tlcnNUYWJGaWx0ZXJNYWpvclRyYWNrZXJzJyksXG4gICAgT3RoZXJUcmFja2VyczogZ2V0TWVzc2FnZSgnc2V0dGluZ3NUcmFja2Vyc1RhYkZpbHRlck1pbm9yVHJhY2tlcnMnKVxufSBhcyBjb25zdDtcbnR5cGUgQ2F0ZWdvcnlGaWx0ZXJzID0gdHlwZW9mIENhdGVnb3J5RmlsdGVyc1trZXlvZiB0eXBlb2YgQ2F0ZWdvcnlGaWx0ZXJzXTtcblxuZXhwb3J0IHR5cGUgRmlsdGVyc1N0YXRlID0ge1xuICAgIHF1ZXJ5Pzogc3RyaW5nO1xuICAgIHR5cGU/OiBUeXBlRmlsdGVycztcbiAgICBzdGF0dXM/OiBTdGF0dXNGaWx0ZXJzO1xuICAgIGNhdGVnb3J5PzogQ2F0ZWdvcnlGaWx0ZXJzO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEZpbHRlcmVkVHJhY2tlcnMgPSAodHJhY2tlcnM6IFRyYWNrZXJzLCBhY3RpdmVGaWx0ZXJzOiBGaWx0ZXJzU3RhdGUpID0+IHtcbiAgICBjb25zdCB7cXVlcnksIHR5cGUsIHN0YXR1cywgY2F0ZWdvcnl9ID0gYWN0aXZlRmlsdGVycztcblxuICAgIGxldCBmaWx0ZXJlZFRyYWNrZXJzID0gdHJhY2tlcnM7XG5cbiAgICAvLyBBcHBseSBzZWFyY2ggZmlsdGVyXG4gICAgZmlsdGVyZWRUcmFja2VycyA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZmlsdGVyZWRUcmFja2VycykuZmlsdGVyKChbaG9zdCwgX10pID0+IGhvc3QuaW5jbHVkZXMocXVlcnkgfHwgJycpKVxuICAgICk7XG5cbiAgICAvLyBBcHBseSB0eXBlIGZpbHRlclxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFR5cGVGaWx0ZXJzLlVzZXJDb250cm9sbGVkOlxuICAgICAgICAgICAgZmlsdGVyZWRUcmFja2VycyA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhmaWx0ZXJlZFRyYWNrZXJzKS5maWx0ZXIoKFtfLCBpbmZvXSkgPT5cbiAgICAgICAgICAgICAgICAgICAgWyd1c2VyX2Jsb2NrJywgJ3VzZXJfY29va2llYmxvY2snLCAndXNlcl9hbGxvdyddLmluY2x1ZGVzKGluZm8uYWN0aW9uKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBUeXBlRmlsdGVycy5ETlRDb21wbGlhbnQ6XG4gICAgICAgICAgICBmaWx0ZXJlZFRyYWNrZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGZpbHRlcmVkVHJhY2tlcnMpLmZpbHRlcigoW18sIGluZm9dKSA9PiBpbmZvLmFjdGlvbiA9PT0gJ2RudCcpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBBcHBseSBzdGF0dXMgZmlsdGVyXG4gICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgY2FzZSBTdGF0dXNGaWx0ZXJzLkFsbG93ZWQ6XG4gICAgICAgICAgICBmaWx0ZXJlZFRyYWNrZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGZpbHRlcmVkVHJhY2tlcnMpLmZpbHRlcigoW18sIGluZm9dKSA9PlxuICAgICAgICAgICAgICAgICAgICBbJ2FsbG93JywgJ3VzZXJfYWxsb3cnLCAnZG50J10uaW5jbHVkZXMoaW5mby5hY3Rpb24pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFN0YXR1c0ZpbHRlcnMuQmxvY2tlZDpcbiAgICAgICAgICAgIGZpbHRlcmVkVHJhY2tlcnMgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoZmlsdGVyZWRUcmFja2VycykuZmlsdGVyKChbXywgaW5mb10pID0+XG4gICAgICAgICAgICAgICAgICAgIFsnYmxvY2snLCAnY29va2llYmxvY2snLCAndXNlcl9ibG9jaycsICd1c2VyX2Nvb2tpZWJsb2NrJ10uaW5jbHVkZXMoaW5mby5hY3Rpb24pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFN0YXR1c0ZpbHRlcnMuQ29va2llc0Jsb2NrZWQ6XG4gICAgICAgICAgICBmaWx0ZXJlZFRyYWNrZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGZpbHRlcmVkVHJhY2tlcnMpLmZpbHRlcigoW18sIGluZm9dKSA9PlxuICAgICAgICAgICAgICAgICAgICBbJ2Nvb2tpZWJsb2NrJywgJ3VzZXJfY29va2llYmxvY2snXS5pbmNsdWRlcyhpbmZvLmFjdGlvbilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBBcHBseSBjYXRlZ29yeSBmaWx0ZXJcbiAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgICAgIGNhc2UgQ2F0ZWdvcnlGaWx0ZXJzLk1ham9yVHJhY2tlcnM6XG4gICAgICAgICAgICBmaWx0ZXJlZFRyYWNrZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGZpbHRlcmVkVHJhY2tlcnMpLmZpbHRlcigoW18sIGluZm9dKSA9PiBpbmZvLnR5cGUgPT09ICdtYWpvcicpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ2F0ZWdvcnlGaWx0ZXJzLk90aGVyVHJhY2tlcnM6XG4gICAgICAgICAgICBmaWx0ZXJlZFRyYWNrZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGZpbHRlcmVkVHJhY2tlcnMpLmZpbHRlcigoW18sIGluZm9dKSA9PiBpbmZvLnR5cGUgPT09ICdtaW5vcicpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsdGVyZWRUcmFja2Vycztcbn07XG5cbnR5cGUgRmlsdGVyUHJvcHMgPSB7XG4gICAgZmlsdGVyTmFtZTogc3RyaW5nO1xuICAgIGZpbHRlckxhYmVsOiBzdHJpbmc7XG4gICAgZmlsdGVyR3JvdXA6IHR5cGVvZiBUeXBlRmlsdGVycyB8IHR5cGVvZiBDYXRlZ29yeUZpbHRlcnMgfCB0eXBlb2YgU3RhdHVzRmlsdGVycztcbiAgICBkZWZhdWx0VmFsdWU6IHN0cmluZztcbiAgICBvbkNoYW5nZTogKGU6IENoYW5nZUV2ZW50PHt2YWx1ZTogdW5rbm93bn0+KSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IEZpbHRlcjogRkM8RmlsdGVyUHJvcHM+ID0gKHtmaWx0ZXJOYW1lLCBmaWx0ZXJMYWJlbCwgZmlsdGVyR3JvdXAsIGRlZmF1bHRWYWx1ZSwgb25DaGFuZ2V9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEZvcm1Db250cm9sIHZhcmlhbnQ9XCJvdXRsaW5lZFwiIGZ1bGxXaWR0aCBzaXplPVwic21hbGxcIj5cbiAgICAgICAgICAgIDxJbnB1dExhYmVsIGh0bWxGb3I9e2BmaWx0ZXItYnktJHtmaWx0ZXJOYW1lfWB9PntmaWx0ZXJMYWJlbH08L0lucHV0TGFiZWw+XG4gICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tib3hTaGFkb3c6ICdub25lJ319XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXG4gICAgICAgICAgICAgICAgbGFiZWxJZD17YGZpbHRlci1ieS0ke2ZpbHRlck5hbWV9YH1cbiAgICAgICAgICAgICAgICBsYWJlbD17YGZpbHRlci1ieS0ke2ZpbHRlck5hbWV9YH1cbiAgICAgICAgICAgICAgICBpZD17YGZpbHRlci1ieS0ke2ZpbHRlck5hbWV9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAgICAgICAga2V5PVwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICY6aG92ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWJlY2Y3O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRWYWx1ZX1cbiAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhmaWx0ZXJHcm91cCkubWFwKChbXywgZmlsdGVyXSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2ZpbHRlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICY6aG92ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlYmVjZjc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZpbHRlcn1cbiAgICAgICAgICAgICAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICk7XG59O1xuIiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IFJlYWN0LCB7RkMsIENoYW5nZUV2ZW50LCB1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHtUeXBvZ3JhcGh5LCBCb3gsIFRleHRGaWVsZCwgSW5wdXRBZG9ybm1lbnQsIEJ1dHRvbiwgTGlua30gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xuaW1wb3J0IENsb3NlSWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvQ2xvc2VTaGFycCc7XG5pbXBvcnQge3VzZVNlbGVjdG9yfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7RmlsdGVyLCBUeXBlRmlsdGVycywgU3RhdHVzRmlsdGVycywgQ2F0ZWdvcnlGaWx0ZXJzLCBGaWx0ZXJzU3RhdGUsIGdldEZpbHRlcmVkVHJhY2tlcnN9IGZyb20gJy4vRmlsdGVycyc7XG5pbXBvcnQge2dldE1lc3NhZ2UsIGdldExhbmd1YWdlfSBmcm9tICcuLi8uLi8uLi91dGlscy9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHtvcHRpb25zU2VsZWN0b3J9IGZyb20gJy4uLy4uLy4uL3NlbGVjdG9ycy9pbmRleCc7XG5pbXBvcnQge1RyYWNrZXJTZXR0aW5nc30gZnJvbSAnLi4vLi4vQ29tbW9uL1RyYWNrZXJTZXR0aW5ncyc7XG5cbmNvbnN0IEVYVF9MQU5HVUFHRV9DT0RFID0gZ2V0TGFuZ3VhZ2UoKTtcbmNvbnN0IFNVUFBPUlRfQVJUSUNMRSA9XG4gICAgRVhUX0xBTkdVQUdFX0NPREUgPT09ICdkZSdcbiAgICAgICAgPyAnaHR0cHM6Ly9zdXBwb3J0LnN0YXJ0cGFnZS5jb20vaGMvZGUvYXJ0aWNsZXMvNDQ1NTE0NjU5MTc2NC1XYXMtaXN0LWVpbi1Ecml0dGFuYmlldGVyLVRoaXJkLVBhcnR5LVRyYWNrZXItJ1xuICAgICAgICA6ICdodHRwczovL3N1cHBvcnQuc3RhcnRwYWdlLmNvbS9oYy9lbi11cy9hcnRpY2xlcy80NDU1MTQ2NTkxNzY0LVdoYXQtaXMtYS10aGlyZC1wYXJ0eS10cmFja2VyLSc7XG5cbmNvbnN0IE1hbmFnZUFsbG93TGlzdDogRkMgPSAoKSA9PiB7XG4gICAgY29uc3QgW2FjdGl2ZUZpbHRlcnMsIHNldEFjdGl2ZUZpbHRlcnNdID0gdXNlU3RhdGU8RmlsdGVyc1N0YXRlPih7fSk7XG5cbiAgICBjb25zdCBvcHRpb25zID0gdXNlU2VsZWN0b3Iob3B0aW9uc1NlbGVjdG9yKTtcblxuICAgIC8vIEdldCBhbGwgbGlzdGFibGUgdHJhY2tlcnMuIElnbm9yaW5nIGFueSB0aGF0IGFyZSBvZiBhY3Rpb246IFwiYWxsb3dcIiwgc2luY2UgdGhleSdyZSBzYWZlLlxuICAgIGNvbnN0IHRyYWNrZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICBPYmplY3QuZW50cmllcyhvcHRpb25zLnRyYWNrZXJzIHx8IHt9KS5maWx0ZXIoKFtfLCBpbmZvXSkgPT4gaW5mby5hY3Rpb24gIT09ICdhbGxvdycpXG4gICAgKTtcblxuICAgIGNvbnN0IHRyYWNrZXJzQmxvY2tlZENvdW50ID0gT2JqZWN0LnZhbHVlcyh0cmFja2VycykuZmlsdGVyKFxuICAgICAgICAoaW5mbykgPT5cbiAgICAgICAgICAgIGluZm8uYWN0aW9uID09PSAnYmxvY2snIHx8XG4gICAgICAgICAgICBpbmZvLmFjdGlvbiA9PT0gJ2Nvb2tpZWJsb2NrJyB8fFxuICAgICAgICAgICAgaW5mby5hY3Rpb24gPT09ICd1c2VyX2Jsb2NrJyB8fFxuICAgICAgICAgICAgaW5mby5hY3Rpb24gPT09ICd1c2VyX2Nvb2tpZWJsb2NrJ1xuICAgICkubGVuZ3RoO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJveFxuICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RlZTBmNztcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMjRweCAxMnB4O1xuICAgICAgICAgICAgYH1cbiAgICAgICAgPlxuICAgICAgICAgICAgPFR5cG9ncmFwaHlcbiAgICAgICAgICAgICAgICB2YXJpYW50PVwiaDNcIlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudD1cImgzXCJcbiAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDEycHg7XG4gICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgnc2V0dGluZ3NUcmFja2Vyc1RhYlRpdGxlJyl9XG4gICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICA8VHlwb2dyYXBoeVxuICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJib2R5MVwiXG4gICAgICAgICAgICAgICAgY29tcG9uZW50PVwicFwiXG4gICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xuICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzVHJhY2tlcnNUYWJCbG9ja2VkQ291bnRMYWJlbCcpfSA8Yj57dHJhY2tlcnNCbG9ja2VkQ291bnR9PC9iPnsnICd9XG4gICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzVHJhY2tlcnNUYWJQb3RlbnRpYWwnKX17JyAnfVxuICAgICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJib2R5MlwiXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e1NVUFBPUlRfQVJUSUNMRX1cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMmUzOWIzO1xuICAgICAgICAgICAgICAgICAgICAgICAgJjpob3ZlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM2Njc3ZmI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgnc2V0dGluZ3NUcmFja2Vyc1RhYlRyYWNrZXJzTGluaycpfXsnICd9XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc1RyYWNrZXJzVGFiVXBkYXRlZCcpfVxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZTogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlRmlsdGVycyh7Li4uYWN0aXZlRmlsdGVycywgcXVlcnk6IGUudGFyZ2V0LnZhbHVlfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17YWN0aXZlRmlsdGVycz8ucXVlcnkgfHwgJyd9XG4gICAgICAgICAgICAgICAgbmFtZT1cImFsbG93TGlzdFVybFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9e2dldE1lc3NhZ2UoJ3NldHRpbmdzVHJhY2tlcnNUYWJTZWFyY2hQbGFjZWhvbGRlcicpfVxuICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgICAgICAgICAgICAgICAgICAuTXVpT3V0bGluZWRJbnB1dC1yb290IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgSW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBlbmRBZG9ybm1lbnQ6IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZUZpbHRlcnM/LnF1ZXJ5ICYmIGFjdGl2ZUZpbHRlcnMucXVlcnkgIT09ICcnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0QWRvcm5tZW50IHBvc2l0aW9uPVwiZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjN0Y4NjlGJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbldpZHRoOiAnMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZUZpbHRlcnMoey4uLmFjdGl2ZUZpbHRlcnMsIHF1ZXJ5OiAnJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZVJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDbG9zZUljb24gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0QWRvcm5tZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAzMnB4O1xuXG4gICAgICAgICAgICAgICAgICAgID4gKiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE2cHg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICY6bGFzdC1vZi10eXBlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyTmFtZT17Z2V0TWVzc2FnZSgnc2V0dGluZ3NUcmFja2Vyc1RhYlR5cGVGaWx0ZXInKX1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyTGFiZWw9e2dldE1lc3NhZ2UoJ3NldHRpbmdzVHJhY2tlcnNUYWJGaWx0ZXJCeScsIGdldE1lc3NhZ2UoJ3NldHRpbmdzVHJhY2tlcnNUYWJUeXBlRmlsdGVyJykpfVxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJHcm91cD17VHlwZUZpbHRlcnN9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Z2V0TWVzc2FnZSgnc2V0dGluZ3NUcmFja2Vyc1RhYkZpbHRlckRlZmF1bHQnKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBDaGFuZ2VFdmVudDx7dmFsdWU6IHVua25vd259PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IE9iamVjdC52YWx1ZXMoVHlwZUZpbHRlcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigodCkgPT4gdCA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlRmlsdGVycyh7Li4uYWN0aXZlRmlsdGVycywgdHlwZX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZpbHRlclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJOYW1lPXtnZXRNZXNzYWdlKCdzZXR0aW5nc1RyYWNrZXJzVGFiU3RhdHVzRmlsdGVyJyl9XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckxhYmVsPXtnZXRNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NldHRpbmdzVHJhY2tlcnNUYWJGaWx0ZXJCeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRNZXNzYWdlKCdzZXR0aW5nc1RyYWNrZXJzVGFiU3RhdHVzRmlsdGVyJylcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyR3JvdXA9e1N0YXR1c0ZpbHRlcnN9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Z2V0TWVzc2FnZSgnc2V0dGluZ3NUcmFja2Vyc1RhYkZpbHRlckRlZmF1bHQnKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBDaGFuZ2VFdmVudDx7dmFsdWU6IHVua25vd259PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gT2JqZWN0LnZhbHVlcyhTdGF0dXNGaWx0ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHQpID0+IHQgPT09IHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZUZpbHRlcnMoey4uLmFjdGl2ZUZpbHRlcnMsIHN0YXR1c30pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZpbHRlclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJOYW1lPXtnZXRNZXNzYWdlKCdzZXR0aW5nc1RyYWNrZXJzVGFiQ2F0ZWdvcnlGaWx0ZXInKX1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyTGFiZWw9e2dldE1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2V0dGluZ3NUcmFja2Vyc1RhYkZpbHRlckJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldE1lc3NhZ2UoJ3NldHRpbmdzVHJhY2tlcnNUYWJDYXRlZ29yeUZpbHRlcicpXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckdyb3VwPXtDYXRlZ29yeUZpbHRlcnN9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17Z2V0TWVzc2FnZSgnc2V0dGluZ3NUcmFja2Vyc1RhYkZpbHRlckRlZmF1bHQnKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlOiBDaGFuZ2VFdmVudDx7dmFsdWU6IHVua25vd259PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBPYmplY3QudmFsdWVzKENhdGVnb3J5RmlsdGVycylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh0KSA9PiB0ID09PSB2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVGaWx0ZXJzKHsuLi5hY3RpdmVGaWx0ZXJzLCBjYXRlZ29yeX0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPFRyYWNrZXJTZXR0aW5nc1xuICAgICAgICAgICAgICAgIHRyYWNrZXJzPXtnZXRGaWx0ZXJlZFRyYWNrZXJzKHRyYWNrZXJzLCBhY3RpdmVGaWx0ZXJzKX1cbiAgICAgICAgICAgICAgICBsQ29sV2lkdGhQZXJjZW50PXszNi4zNH1cbiAgICAgICAgICAgICAgICByQ29sV2lkdGhQZXJjZW50PXs2Ni4zNX1cbiAgICAgICAgICAgICAgICBhbHRlcm5hdGVSb3dDb2xvcnNcbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezc3N31cbiAgICAgICAgICAgICAgICBvbkFjdGlvbkNoYW5nZT17KGhvc3QsIGFjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe3R5cGU6ICdzYXZlT3B0aW9uc1RvZ2dsZScsIGFjdGlvbiwgb3JpZ2luOiBob3N0fSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe21lc3NhZ2U6ICdnZXRPcHRpb25zJ30pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uUmV2ZXJ0PXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7bWVzc2FnZTogJ2dldE9wdGlvbnMnfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbkNvbmZpcm1TaXRlQnJlYWs9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHttZXNzYWdlOiAnZ2V0T3B0aW9ucyd9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZUFsbG93TGlzdDtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjIgU3VyZmJvYXJkIEhvbGRpbmcgQi5WLiA8aHR0cHM6Ly93d3cuc3RhcnRwYWdlLmNvbT5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtGQ30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuXG5pbXBvcnQgTWFuYWdlQWxsb3dMaXN0IGZyb20gJy4vTWFuYWdlQWxsb3dMaXN0JztcblxuY29uc3QgVHJhY2tlckRvbWFpbnNUYWI6IEZDID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiA3OHB4O1xuICAgICAgICAgICAgYH1cbiAgICAgICAgPlxuICAgICAgICAgICAgPE1hbmFnZUFsbG93TGlzdCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVHJhY2tlckRvbWFpbnNUYWI7XG4iXSwic291cmNlUm9vdCI6IiJ9