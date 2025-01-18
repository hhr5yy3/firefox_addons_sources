(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
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




var Toggle = _ref => {
  var {
    id,
    height,
    width,
    hexColor,
    checked = false,
    animate = true,
    onChange: _onChange
  } = _ref;
  var sliderDiameter = height * 0.75;
  var toggleCss = /*#__PURE__*/Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* css */ "b"])(".switch{position:relative;display:inline-block;height:", height, "px;width:", width, "px;}.switch input{opacity:0;width:0;height:0;}.slider{background-color:#ced1dd;border-radius:", height, "px;cursor:pointer;inset:0;position:absolute;", animate && 'transition: 0.4s;', "}input:checked + .slider{background-color:", hexColor, ";}.slider:before{background-color:#ebecf7;border-radius:", sliderDiameter, "px;box-shadow:1px 2px 4px rgba(0,0,0,0.1);content:'';height:", sliderDiameter, "px;margin:calc(", sliderDiameter, "px / 6);position:absolute;width:", sliderDiameter, "px;", animate && 'transition: 0.4s;', "}input:checked + .slider:before{background-color:#ffffff;transform:translateX(", width - height, "px);};label:toggleCss;" + ( true ? "" : undefined));
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("div", {
    css: toggleCss
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("label", {
    className: "switch",
    htmlFor: id
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("input", {
    id: id,
    type: "checkbox",
    checked: checked
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ,
    onChange: event => {
      if (_onChange) {
        _onChange();
      }
    }
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_1__[/* jsx */ "c"])("span", {
    className: "slider"
  })));
};
/* harmony default export */ __webpack_exports__["a"] = (Toggle);

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);
/* harmony import */ var _styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71);







var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 1,
      margin: 0,
      // Reset browser default style.
      border: 'none',
      flexShrink: 0,
      backgroundColor: theme.palette.divider
    },

    /* Styles applied to the root element if `absolute={true}`. */
    absolute: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    },

    /* Styles applied to the root element if `variant="inset"`. */
    inset: {
      marginLeft: 72
    },

    /* Styles applied to the root element if `light={true}`. */
    light: {
      backgroundColor: Object(_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__[/* alpha */ "a"])(theme.palette.divider, 0.08)
    },

    /* Styles applied to the root element if `variant="middle"`. */
    middle: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },

    /* Styles applied to the root element if `orientation="vertical"`. */
    vertical: {
      height: '100%',
      width: 1
    },

    /* Styles applied to the root element if `flexItem={true}`. */
    flexItem: {
      alignSelf: 'stretch',
      height: 'auto'
    }
  };
};
var Divider = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function Divider(props, ref) {
  var _props$absolute = props.absolute,
      absolute = _props$absolute === void 0 ? false : _props$absolute,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'hr' : _props$component,
      _props$flexItem = props.flexItem,
      flexItem = _props$flexItem === void 0 ? false : _props$flexItem,
      _props$light = props.light,
      light = _props$light === void 0 ? false : _props$light,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$role = props.role,
      role = _props$role === void 0 ? Component !== 'hr' ? 'separator' : undefined : _props$role,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'fullWidth' : _props$variant,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["absolute", "classes", "className", "component", "flexItem", "light", "orientation", "role", "variant"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className, variant !== 'fullWidth' && classes[variant], absolute && classes.absolute, flexItem && classes.flexItem, light && classes.light, orientation === 'vertical' && classes.vertical),
    role: role,
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiDivider'
})(Divider));

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(283);

var _interopRequireWildcard = __webpack_require__(284);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(285));

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
}), 'AddSharp');

exports.default = _default;

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);
/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(387);
/* harmony import */ var _List_ListContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(419);








var styles = {
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
    minWidth: 0,
    marginTop: 4,
    marginBottom: 4
  },

  /* Styles applied to the `Typography` components if primary and secondary are set. */
  multiline: {
    marginTop: 6,
    marginBottom: 6
  },

  /* Styles applied to the `Typography` components if dense. */
  dense: {},

  /* Styles applied to the root element if `inset={true}`. */
  inset: {
    paddingLeft: 56
  },

  /* Styles applied to the primary `Typography` component. */
  primary: {},

  /* Styles applied to the secondary `Typography` component. */
  secondary: {}
};
var ListItemText = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function ListItemText(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$disableTypogra = props.disableTypography,
      disableTypography = _props$disableTypogra === void 0 ? false : _props$disableTypogra,
      _props$inset = props.inset,
      inset = _props$inset === void 0 ? false : _props$inset,
      primaryProp = props.primary,
      primaryTypographyProps = props.primaryTypographyProps,
      secondaryProp = props.secondary,
      secondaryTypographyProps = props.secondaryTypographyProps,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["children", "classes", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"]);

  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_2__["useContext"](_List_ListContext__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]),
      dense = _React$useContext.dense;

  var primary = primaryProp != null ? primaryProp : children;

  if (primary != null && primary.type !== _Typography__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"] && !disableTypography) {
    primary = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Typography__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
      variant: dense ? 'body2' : 'body1',
      className: classes.primary,
      component: "span",
      display: "block"
    }, primaryTypographyProps), primary);
  }

  var secondary = secondaryProp;

  if (secondary != null && secondary.type !== _Typography__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"] && !disableTypography) {
    secondary = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Typography__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
      variant: "body2",
      className: classes.secondary,
      color: "textSecondary",
      display: "block"
    }, secondaryTypographyProps), secondary);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className, dense && classes.dense, inset && classes.inset, primary && secondary && classes.multiline),
    ref: ref
  }, other), primary, secondary);
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiListItemText'
})(ListItemText));

/***/ }),

/***/ 560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);






var styles = {
  /* Styles applied to the root element. */
  root: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)'
  }
};
/**
 * Must be used as the last child of ListItem to function properly.
 */

var ListItemSecondaryAction = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function ListItemSecondaryAction(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["classes", "className"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiListItemSecondaryAction'
})(ListItemSecondaryAction));

/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(283);

var _interopRequireWildcard = __webpack_require__(284);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(__webpack_require__(0));

var _createSvgIcon = _interopRequireDefault(__webpack_require__(285));

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement("path", {
  d: "M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
}), 'HighlightOff');

exports.default = _default;

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@emotion/core/dist/core.browser.esm.js + 10 modules
var core_browser_esm = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(166);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(241);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__(167);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(118);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(165);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(164);

// EXTERNAL MODULE: ./node_modules/@material-ui/icons/AddSharp.js
var AddSharp = __webpack_require__(558);
var AddSharp_default = /*#__PURE__*/__webpack_require__.n(AddSharp);

// EXTERNAL MODULE: ./node_modules/@material-ui/icons/CloseSharp.js
var CloseSharp = __webpack_require__(440);
var CloseSharp_default = /*#__PURE__*/__webpack_require__.n(CloseSharp);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/TextField/TextField.js + 1 modules
var TextField = __webpack_require__(595);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Typography/Typography.js
var Typography = __webpack_require__(387);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Box/Box.js + 12 modules
var Box = __webpack_require__(590);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Link/Link.js
var Link = __webpack_require__(578);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Divider/Divider.js
var Divider = __webpack_require__(557);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/InputAdornment/InputAdornment.js
var InputAdornment = __webpack_require__(583);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/List/List.js
var List = __webpack_require__(582);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItemText/ListItemText.js
var ListItemText = __webpack_require__(559);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItem/ListItem.js
var ListItem = __webpack_require__(584);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItemSecondaryAction/ListItemSecondaryAction.js
var ListItemSecondaryAction = __webpack_require__(560);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Button/Button.js
var Button = __webpack_require__(585);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 24 modules
var es = __webpack_require__(94);

// EXTERNAL MODULE: ./src/privacy-search/utils/url.ts
var utils_url = __webpack_require__(70);

// EXTERNAL MODULE: ./src/privacy-search/utils/localization.ts
var localization = __webpack_require__(19);

// EXTERNAL MODULE: ./src/privacy-search/selectors/index.ts
var selectors = __webpack_require__(163);

// EXTERNAL MODULE: ./src/privacy-search/privacy tools/options.ts
var privacy_tools_options = __webpack_require__(158);

// CONCATENATED MODULE: ./src/privacy-search/components/Options/AllowListTab/AllowedSites.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }








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













var EXT_LANGUAGE_CODE = Object(localization["a" /* getLanguage */])();
var SUPPORT_ARTICLE = EXT_LANGUAGE_CODE === 'de' ? 'https://support.startpage.com/hc/de/articles/4455077038100-Kann-ich-bestimmte-Seiten-oder-Widgets-als-vertrauensw%C3%BCrdig-einstufen' : 'https://support.startpage.com/hc/en-us/articles/4455077038100-Can-I-allow-list-sites-or-widgets-I-trust';
var getHostsToAdd = function getHostsToAdd(host) {
  var allowList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var removedWww = host.replace('www.', '');
  var wildcardHost = "*.".concat(removedWww);
  var addedHosts = [removedWww];
  /**
   * sp-privacy supports wildcard hosts.
   * add both the host + *.host domains to the allowlist
   * for users' convenience.
   * */
  if (!host.startsWith('*.') && !allowList.includes(wildcardHost)) {
    addedHosts = [...addedHosts, wildcardHost];
  }
  return addedHosts;
};
var _ref =  true ? {
  name: "1qm1nsb-AllowSites",
  styles: "margin-bottom:41px;;label:AllowSites;"
} : undefined;
var _ref2 =  true ? {
  name: "zv8ru6-AllowSites",
  styles: "border:1px solid #dee0f7;border-radius:4px;padding:24px;;label:AllowSites;"
} : undefined;
var _ref3 =  true ? {
  name: "1smtvda-AllowSites",
  styles: "font-weight:400;color:#2e39b3;&:hover{color:#6677fb;};label:AllowSites;"
} : undefined;
var _ref4 =  true ? {
  name: "1v4lcye-AllowSites",
  styles: "margin-bottom:10;.MuiOutlinedInput-root{box-shadow:none !important;};label:AllowSites;"
} : undefined;
var _ref5 =  true ? {
  name: "1fmc464-endAdornment",
  styles: "font-family:'Inter',sans-serif;background:none;color:#2e39b3;display:flex;align-items:center;font-size:14px;border:none;cursor:pointer;border-radius:4px;svg{transform:scale(0.8);}&:hover{color:#6573ff;background:#f2f3ff;};label:endAdornment;"
} : undefined;
var _ref6 =  true ? {
  name: "elst0b-endAdornment",
  styles: "letter-spacing:normal;margin-right:2px;;label:endAdornment;"
} : undefined;
var AllowSites = () => {
  var options = Object(es["c" /* useSelector */])(selectors["b" /* optionsSelector */]);
  var allowList = options.settings.disabledSites;
  var [allowUrl, setAllowUrl] = Object(react["useState"])({
    url: '',
    error: false,
    errorMsg: ''
  });
  var handleAddToList = () => {
    var {
      url
    } = allowUrl;
    var host;
    try {
      host = Object(utils_url["a" /* getHost */])(url);
    } catch (_unused) {
      setAllowUrl(_objectSpread(_objectSpread({}, allowUrl), {}, {
        error: true,
        errorMsg: Object(localization["b" /* getMessage */])('settingsAllowlistTabURLError')
      }));
      return;
    }
    var addedHosts = getHostsToAdd(host, allowList);
    var allowListIncludesHosts = addedHosts.every(hostStr => {
      return allowList.includes(hostStr);
    });
    // don't add a domain that's already in the allowlist
    if (allowListIncludesHosts) {
      setAllowUrl({
        url: '',
        error: false,
        errorMsg: ''
      });
      return;
    }
    Object(privacy_tools_options["c" /* updateSettings */])(_objectSpread(_objectSpread({}, options.settings), {}, {
      disabledSites: [...allowList, ...addedHosts]
    }));
    setAllowUrl({
      url: '',
      error: false,
      errorMsg: ''
    });
  };
  var handleUrlInputChange = e => {
    setAllowUrl({
      url: e.target.value,
      error: false,
      errorMsg: ''
    });
  };
  var handleRemoveUrl = url => {
    Object(privacy_tools_options["c" /* updateSettings */])(_objectSpread(_objectSpread({}, options.settings), {}, {
      disabledSites: allowList.filter(s => s !== url)
    }));
  };
  return Object(core_browser_esm["c" /* jsx */])("form", {
    className: "allowed-sites",
    css: _ref
  }, Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "h3",
    component: "h3",
    style: {
      color: '#202945',
      margin: '0 0 16px 24px'
    }
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabTitle')), Object(core_browser_esm["c" /* jsx */])(Box["a" /* default */], {
    css: _ref2
  }, Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "body1",
    component: "p"
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabDescription'), " ", Object(core_browser_esm["c" /* jsx */])(Link["a" /* default */], {
    variant: "body2",
    href: SUPPORT_ARTICLE,
    target: "_blank",
    rel: "noopener noreferrer",
    css: _ref3
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabLearnMoreLink'))), Object(core_browser_esm["c" /* jsx */])(Divider["a" /* default */], null), Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "h4",
    component: "h4",
    style: {
      marginBottom: 16
    }
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabAllowedSitesLabel')), Object(core_browser_esm["c" /* jsx */])(TextField["a" /* default */], {
    onChange: handleUrlInputChange,
    value: allowUrl.url,
    name: "allowListUrl",
    label: Object(localization["b" /* getMessage */])('settingsAllowlistTabEnterURLLabel'),
    color: "primary",
    variant: "outlined",
    fullWidth: true,
    size: "small",
    error: allowUrl.error,
    helperText: allowUrl.errorMsg,
    css: _ref4,
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddToList();
      }
    },
    InputProps: {
      endAdornment: Object(core_browser_esm["c" /* jsx */])(InputAdornment["a" /* default */], {
        position: "end"
      }, Object(core_browser_esm["c" /* jsx */])("button", {
        type: "button",
        onClick: e => {
          e.preventDefault();
          handleAddToList();
        },
        css: _ref5
      }, Object(core_browser_esm["c" /* jsx */])("div", {
        css: _ref6
      }, Object(localization["b" /* getMessage */])('settingsAllowlistTabAddSiteBtn')), Object(core_browser_esm["c" /* jsx */])(AddSharp_default.a, null)))
    }
  }), Object(core_browser_esm["c" /* jsx */])(List["a" /* default */], null, !allowList.length && Object(core_browser_esm["c" /* jsx */])(ListItemText["a" /* default */], {
    style: {
      backgroundColor: '#FBFBFD',
      color: '#7F869F',
      padding: 12
    }
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabAddSiteDescription')), allowList.map((url, i) => Object(core_browser_esm["c" /* jsx */])(ListItem["a" /* default */], {
    key: url,
    style: {
      backgroundColor: i % 2 === 0 ? '#FBFBFD' : '#FFF'
    }
  }, Object(core_browser_esm["c" /* jsx */])(ListItemText["a" /* default */], null, url), Object(core_browser_esm["c" /* jsx */])(ListItemSecondaryAction["a" /* default */], null, Object(core_browser_esm["c" /* jsx */])(Button["a" /* default */], {
    style: {
      color: '#7F869F',
      backgroundColor: 'transparent',
      padding: '0',
      minWidth: '0'
    },
    variant: "text",
    disableRipple: true,
    onClick: () => handleRemoveUrl(url),
    endIcon: Object(core_browser_esm["c" /* jsx */])(CloseSharp_default.a, null)
  })))))));
};
/* harmony default export */ var AllowedSites = (AllowSites);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/FormControl/FormControl.js
var FormControl = __webpack_require__(581);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/InputLabel/InputLabel.js + 1 modules
var InputLabel = __webpack_require__(598);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Select/Select.js + 14 modules
var Select = __webpack_require__(589);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/MenuItem/MenuItem.js
var MenuItem = __webpack_require__(586);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/utils/createSvgIcon.js + 1 modules
var createSvgIcon = __webpack_require__(211);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/internal/svg-icons/Cancel.js


/**
 * @ignore - internal component.
 */

/* harmony default export */ var Cancel = (Object(createSvgIcon["a" /* default */])( /*#__PURE__*/react["createElement"]("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), 'Cancel'));
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/withStyles.js + 1 modules
var withStyles = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/colorManipulator.js
var colorManipulator = __webpack_require__(71);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/utils/useForkRef.js
var useForkRef = __webpack_require__(80);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/utils/capitalize.js
var capitalize = __webpack_require__(56);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ButtonBase/ButtonBase.js + 4 modules
var ButtonBase = __webpack_require__(375);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Chip/Chip.js












var Chip_styles = function styles(theme) {
  var backgroundColor = theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];
  var deleteIconColor = Object(colorManipulator["a" /* alpha */])(theme.palette.text.primary, 0.26);
  return {
    /* Styles applied to the root element. */
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor: backgroundColor,
      borderRadius: 32 / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      border: 'none',
      // Remove `button` border
      padding: 0,
      // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      '&$disabled': {
        opacity: 0.5,
        pointerEvents: 'none'
      },
      '& $avatar': {
        marginLeft: 5,
        marginRight: -6,
        width: 24,
        height: 24,
        color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
        fontSize: theme.typography.pxToRem(12)
      },
      '& $avatarColorPrimary': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark
      },
      '& $avatarColorSecondary': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.dark
      },
      '& $avatarSmall': {
        marginLeft: 4,
        marginRight: -4,
        width: 18,
        height: 18,
        fontSize: theme.typography.pxToRem(10)
      }
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      height: 24
    },

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if `onClick` is defined or `clickable={true}`. */
    clickable: {
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: Object(colorManipulator["d" /* emphasize */])(backgroundColor, 0.08)
      },
      '&:active': {
        boxShadow: theme.shadows[1]
      }
    },

    /* Styles applied to the root element if `onClick` and `color="primary"` is defined or `clickable={true}`. */
    clickableColorPrimary: {
      '&:hover, &:focus': {
        backgroundColor: Object(colorManipulator["d" /* emphasize */])(theme.palette.primary.main, 0.08)
      }
    },

    /* Styles applied to the root element if `onClick` and `color="secondary"` is defined or `clickable={true}`. */
    clickableColorSecondary: {
      '&:hover, &:focus': {
        backgroundColor: Object(colorManipulator["d" /* emphasize */])(theme.palette.secondary.main, 0.08)
      }
    },

    /* Styles applied to the root element if `onDelete` is defined. */
    deletable: {
      '&:focus': {
        backgroundColor: Object(colorManipulator["d" /* emphasize */])(backgroundColor, 0.08)
      }
    },

    /* Styles applied to the root element if `onDelete` and `color="primary"` is defined. */
    deletableColorPrimary: {
      '&:focus': {
        backgroundColor: Object(colorManipulator["d" /* emphasize */])(theme.palette.primary.main, 0.2)
      }
    },

    /* Styles applied to the root element if `onDelete` and `color="secondary"` is defined. */
    deletableColorSecondary: {
      '&:focus': {
        backgroundColor: Object(colorManipulator["d" /* emphasize */])(theme.palette.secondary.main, 0.2)
      }
    },

    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {
      backgroundColor: 'transparent',
      border: "1px solid ".concat(theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'),
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: Object(colorManipulator["a" /* alpha */])(theme.palette.text.primary, theme.palette.action.hoverOpacity)
      },
      '& $avatar': {
        marginLeft: 4
      },
      '& $avatarSmall': {
        marginLeft: 2
      },
      '& $icon': {
        marginLeft: 4
      },
      '& $iconSmall': {
        marginLeft: 2
      },
      '& $deleteIcon': {
        marginRight: 5
      },
      '& $deleteIconSmall': {
        marginRight: 3
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
    outlinedPrimary: {
      color: theme.palette.primary.main,
      border: "1px solid ".concat(theme.palette.primary.main),
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: Object(colorManipulator["a" /* alpha */])(theme.palette.primary.main, theme.palette.action.hoverOpacity)
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
    outlinedSecondary: {
      color: theme.palette.secondary.main,
      border: "1px solid ".concat(theme.palette.secondary.main),
      '$clickable&:hover, $clickable&:focus, $deletable&:focus': {
        backgroundColor: Object(colorManipulator["a" /* alpha */])(theme.palette.secondary.main, theme.palette.action.hoverOpacity)
      }
    },
    // TODO v5: remove

    /* Styles applied to the `avatar` element. */
    avatar: {},

    /* Styles applied to the `avatar` element if `size="small"`. */
    avatarSmall: {},

    /* Styles applied to the `avatar` element if `color="primary"`. */
    avatarColorPrimary: {},

    /* Styles applied to the `avatar` element if `color="secondary"`. */
    avatarColorSecondary: {},

    /* Styles applied to the `icon` element. */
    icon: {
      color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      marginLeft: 5,
      marginRight: -6
    },

    /* Styles applied to the `icon` element if `size="small"`. */
    iconSmall: {
      width: 18,
      height: 18,
      marginLeft: 4,
      marginRight: -4
    },

    /* Styles applied to the `icon` element if `color="primary"`. */
    iconColorPrimary: {
      color: 'inherit'
    },

    /* Styles applied to the `icon` element if `color="secondary"`. */
    iconColorSecondary: {
      color: 'inherit'
    },

    /* Styles applied to the label `span` element. */
    label: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: 12,
      paddingRight: 12,
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the label `span` element if `size="small"`. */
    labelSmall: {
      paddingLeft: 8,
      paddingRight: 8
    },

    /* Styles applied to the `deleteIcon` element. */
    deleteIcon: {
      WebkitTapHighlightColor: 'transparent',
      color: deleteIconColor,
      height: 22,
      width: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: Object(colorManipulator["a" /* alpha */])(deleteIconColor, 0.4)
      }
    },

    /* Styles applied to the `deleteIcon` element if `size="small"`. */
    deleteIconSmall: {
      height: 16,
      width: 16,
      marginRight: 4,
      marginLeft: -4
    },

    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="default"`. */
    deleteIconColorPrimary: {
      color: Object(colorManipulator["a" /* alpha */])(theme.palette.primary.contrastText, 0.7),
      '&:hover, &:active': {
        color: theme.palette.primary.contrastText
      }
    },

    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="default"`. */
    deleteIconColorSecondary: {
      color: Object(colorManipulator["a" /* alpha */])(theme.palette.secondary.contrastText, 0.7),
      '&:hover, &:active': {
        color: theme.palette.secondary.contrastText
      }
    },

    /* Styles applied to the deleteIcon element if `color="primary"` and `variant="outlined"`. */
    deleteIconOutlinedColorPrimary: {
      color: Object(colorManipulator["a" /* alpha */])(theme.palette.primary.main, 0.7),
      '&:hover, &:active': {
        color: theme.palette.primary.main
      }
    },

    /* Styles applied to the deleteIcon element if `color="secondary"` and `variant="outlined"`. */
    deleteIconOutlinedColorSecondary: {
      color: Object(colorManipulator["a" /* alpha */])(theme.palette.secondary.main, 0.7),
      '&:hover, &:active': {
        color: theme.palette.secondary.main
      }
    }
  };
};

function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}
/**
 * Chips represent complex entities in small blocks, such as a contact.
 */


var Chip_Chip = /*#__PURE__*/react["forwardRef"](function Chip(props, ref) {
  var avatarProp = props.avatar,
      classes = props.classes,
      className = props.className,
      clickableProp = props.clickable,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      ComponentProp = props.component,
      deleteIconProp = props.deleteIcon,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      iconProp = props.icon,
      label = props.label,
      onClick = props.onClick,
      onDelete = props.onDelete,
      onKeyDown = props.onKeyDown,
      onKeyUp = props.onKeyUp,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'default' : _props$variant,
      other = Object(objectWithoutProperties["a" /* default */])(props, ["avatar", "classes", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant"]);

  var chipRef = react["useRef"](null);
  var handleRef = Object(useForkRef["a" /* default */])(chipRef, ref);

  var handleDeleteIconClick = function handleDeleteIconClick(event) {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();

    if (onDelete) {
      onDelete(event);
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      // will be handled in keyUp, otherwise some browsers
      // might init navigation
      event.preventDefault();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  var handleKeyUp = function handleKeyUp(event) {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  var clickable = clickableProp !== false && onClick ? true : clickableProp;
  var small = size === 'small';
  var Component = ComponentProp || (clickable ? ButtonBase["a" /* default */] : 'div');
  var moreProps = Component === ButtonBase["a" /* default */] ? {
    component: 'div'
  } : {};
  var deleteIcon = null;

  if (onDelete) {
    var customClasses = Object(clsx_m["a" /* default */])(color !== 'default' && (variant === "default" ? classes["deleteIconColor".concat(Object(capitalize["a" /* default */])(color))] : classes["deleteIconOutlinedColor".concat(Object(capitalize["a" /* default */])(color))]), small && classes.deleteIconSmall);
    deleteIcon = deleteIconProp && /*#__PURE__*/react["isValidElement"](deleteIconProp) ? /*#__PURE__*/react["cloneElement"](deleteIconProp, {
      className: Object(clsx_m["a" /* default */])(deleteIconProp.props.className, classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    }) : /*#__PURE__*/react["createElement"](Cancel, {
      className: Object(clsx_m["a" /* default */])(classes.deleteIcon, customClasses),
      onClick: handleDeleteIconClick
    });
  }

  var avatar = null;

  if (avatarProp && /*#__PURE__*/react["isValidElement"](avatarProp)) {
    avatar = /*#__PURE__*/react["cloneElement"](avatarProp, {
      className: Object(clsx_m["a" /* default */])(classes.avatar, avatarProp.props.className, small && classes.avatarSmall, color !== 'default' && classes["avatarColor".concat(Object(capitalize["a" /* default */])(color))])
    });
  }

  var icon = null;

  if (iconProp && /*#__PURE__*/react["isValidElement"](iconProp)) {
    icon = /*#__PURE__*/react["cloneElement"](iconProp, {
      className: Object(clsx_m["a" /* default */])(classes.icon, iconProp.props.className, small && classes.iconSmall, color !== 'default' && classes["iconColor".concat(Object(capitalize["a" /* default */])(color))])
    });
  }

  if (false) {}

  return /*#__PURE__*/react["createElement"](Component, Object(esm_extends["a" /* default */])({
    role: clickable || onDelete ? 'button' : undefined,
    className: Object(clsx_m["a" /* default */])(classes.root, className, color !== 'default' && [classes["color".concat(Object(capitalize["a" /* default */])(color))], clickable && classes["clickableColor".concat(Object(capitalize["a" /* default */])(color))], onDelete && classes["deletableColor".concat(Object(capitalize["a" /* default */])(color))]], variant !== "default" && [classes.outlined, {
      'primary': classes.outlinedPrimary,
      'secondary': classes.outlinedSecondary
    }[color]], disabled && classes.disabled, small && classes.sizeSmall, clickable && classes.clickable, onDelete && classes.deletable),
    "aria-disabled": disabled ? true : undefined,
    tabIndex: clickable || onDelete ? 0 : undefined,
    onClick: onClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    ref: handleRef
  }, moreProps, other), avatar || icon, /*#__PURE__*/react["createElement"]("span", {
    className: Object(clsx_m["a" /* default */])(classes.label, small && classes.labelSmall)
  }, label), deleteIcon);
});
 false ? undefined : void 0;
/* harmony default export */ var esm_Chip_Chip = (Object(withStyles["a" /* default */])(Chip_styles, {
  name: 'MuiChip'
})(Chip_Chip));
// EXTERNAL MODULE: ./node_modules/@material-ui/icons/HighlightOff.js
var HighlightOff = __webpack_require__(561);
var HighlightOff_default = /*#__PURE__*/__webpack_require__.n(HighlightOff);

// EXTERNAL MODULE: ./src/common/components/Toggle.tsx
var Toggle = __webpack_require__(404);

// CONCATENATED MODULE: ./src/privacy-search/components/Options/AllowListTab/AllowedWidgets.tsx
function AllowedWidgets_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function AllowedWidgets_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? AllowedWidgets_ownKeys(Object(source), !0).forEach(function (key) { AllowedWidgets_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : AllowedWidgets_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function AllowedWidgets_defineProperty(obj, key, value) { key = AllowedWidgets_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function AllowedWidgets_toPropertyKey(arg) { var key = AllowedWidgets_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function AllowedWidgets_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





function AllowedWidgets_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
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












var AllowedWidgets_ref =  true ? {
  name: "ri4luu-AllowWidgets",
  styles: "border:1px solid #dee0f7;border-radius:4px;padding:24px;overflow:hidden;;label:AllowWidgets;"
} : undefined;
var AllowedWidgets_ref2 =  true ? {
  name: "98wqzp-AllowWidgets",
  styles: "display:flex;justify-content:space-between;align-items:center;;label:AllowWidgets;"
} : undefined;
var AllowedWidgets_ref3 =  true ? {
  name: "s2k12s-AllowWidgets",
  styles: "display:flex;padding:0;flex-wrap:wrap;gap:5px;;label:AllowWidgets;"
} : undefined;
var AllowedWidgets_ref4 =  true ? {
  name: "1e9xhm0-AllowWidgets",
  styles: "list-style:none;margin-right:8px;;label:AllowWidgets;"
} : undefined;
var AllowWidgets = () => {
  var options = Object(es["c" /* useSelector */])(selectors["b" /* optionsSelector */]);
  var enableWidget = options.settings.socialWidgetReplacementEnabled;
  var allWidgets = options.widgets;
  var widgetAllowlist = options.settings.widgetReplacementExceptions;
  var widgetSiteAllowlist = Object.entries(options.settings.widgetSiteAllowlist).map(_ref5 => {
    var [site] = _ref5;
    return site;
  });
  var handleSelectWidget = e => {
    var {
      value
    } = e.target;

    // Don't add to allow widget list if it's already added.
    if (!widgetAllowlist.includes(value)) {
      Object(privacy_tools_options["c" /* updateSettings */])(AllowedWidgets_objectSpread(AllowedWidgets_objectSpread({}, options.settings), {}, {
        widgetReplacementExceptions: [...options.settings.widgetReplacementExceptions, value]
      }));
    }
  };
  var handleRemoveWidget = widget => {
    Object(privacy_tools_options["c" /* updateSettings */])(AllowedWidgets_objectSpread(AllowedWidgets_objectSpread({}, options.settings), {}, {
      widgetReplacementExceptions: widgetAllowlist.filter(w => w !== widget)
    }));
  };
  var handleRemoveSite = url => {
    var updatedWidgetSiteAllowlist = AllowedWidgets_objectSpread({}, options.settings.widgetSiteAllowlist);
    delete updatedWidgetSiteAllowlist[url];
    Object(privacy_tools_options["c" /* updateSettings */])(AllowedWidgets_objectSpread(AllowedWidgets_objectSpread({}, options.settings), {}, {
      widgetSiteAllowlist: updatedWidgetSiteAllowlist
    }));
  };
  return Object(core_browser_esm["c" /* jsx */])("form", {
    className: "allowed-widgets"
  }, Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "h3",
    component: "h3",
    style: {
      color: '#202945',
      margin: '0 0 16px 24px'
    }
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabWidgetTitle')), Object(core_browser_esm["c" /* jsx */])(Box["a" /* default */], {
    css: AllowedWidgets_ref
  }, Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "body1",
    component: "p"
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabWidgetDescription')), Object(core_browser_esm["c" /* jsx */])(Divider["a" /* default */], null), Object(core_browser_esm["c" /* jsx */])("div", {
    css: AllowedWidgets_ref2
  }, Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "h4",
    component: "h4"
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabWidgetEnableLabel')), Object(core_browser_esm["c" /* jsx */])(Toggle["a" /* default */], {
    id: "widgetblock-toggle",
    height: 24,
    width: 40,
    hexColor: "#24C5B6",
    checked: enableWidget,
    onChange: () => {
      Object(privacy_tools_options["c" /* updateSettings */])(AllowedWidgets_objectSpread(AllowedWidgets_objectSpread({}, options.settings), {}, {
        socialWidgetReplacementEnabled: !enableWidget
      }));
    }
  })), enableWidget ? Object(core_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(core_browser_esm["c" /* jsx */])(Divider["a" /* default */], null), Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "h4",
    component: "h4",
    style: {
      marginBottom: 16
    }
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabAllowedWidgetsLabel')), Object(core_browser_esm["c" /* jsx */])(FormControl["a" /* default */], {
    variant: "outlined",
    fullWidth: true,
    size: "small"
  }, Object(core_browser_esm["c" /* jsx */])(InputLabel["a" /* default */], {
    htmlFor: "add-widget-to-allow-list-select"
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabAddWidgetLabel')), Object(core_browser_esm["c" /* jsx */])(Select["a" /* default */], {
    style: {
      boxShadow: 'none'
    },
    onChange: handleSelectWidget,
    variant: "outlined",
    labelId: "add-widget-to-allow-list-select",
    label: "Add widget to your allowlist",
    id: "add-widget-to-allow-list-select"
  }, allWidgets.length ? allWidgets.map(widget => Object(core_browser_esm["c" /* jsx */])(MenuItem["a" /* default */], {
    key: widget,
    value: widget,
    style: {
      backgroundColor: widgetAllowlist.includes(widget) ? 'rgba(0, 0, 0, 0.08)' : 'transparent'
    }
  }, widget)) : Object(core_browser_esm["c" /* jsx */])(ListItemText["a" /* default */], {
    style: {
      backgroundColor: '#FBFBFD',
      color: '#7F869F',
      padding: 12
    }
  }, "Widgets will appear here"))), Object(core_browser_esm["c" /* jsx */])("ul", {
    css: AllowedWidgets_ref3
  }, widgetAllowlist.length ? widgetAllowlist.map(url => Object(core_browser_esm["c" /* jsx */])("li", {
    css: AllowedWidgets_ref4,
    key: url
  }, Object(core_browser_esm["c" /* jsx */])(esm_Chip_Chip, {
    label: url,
    style: {
      color: '#202C46',
      background: '#F2F3FF',
      borderRadius: 4,
      fontSize: '14px'
    },
    onDelete: () => handleRemoveWidget(url),
    deleteIcon: Object(core_browser_esm["c" /* jsx */])(CloseSharp_default.a, null)
  }))) : Object(core_browser_esm["c" /* jsx */])(ListItemText["a" /* default */], {
    style: {
      backgroundColor: '#FBFBFD',
      color: '#7F869F',
      padding: 12
    }
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabWidgetCallout'))), Object(core_browser_esm["c" /* jsx */])(Divider["a" /* default */], null), Object(core_browser_esm["c" /* jsx */])(Typography["a" /* default */], {
    variant: "h4",
    component: "h4",
    style: {
      marginBottom: 16
    }
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabSiteWidgetsLabel')), Object(core_browser_esm["c" /* jsx */])(List["a" /* default */], null, widgetSiteAllowlist.length ? widgetSiteAllowlist.map((url, i) => Object(core_browser_esm["c" /* jsx */])(ListItem["a" /* default */], {
    key: url,
    style: {
      backgroundColor: i % 2 === 0 ? '#FBFBFD' : '#FFF'
    }
  }, Object(core_browser_esm["c" /* jsx */])(ListItemText["a" /* default */], null, url), Object(core_browser_esm["c" /* jsx */])(ListItemSecondaryAction["a" /* default */], null, Object(core_browser_esm["c" /* jsx */])(Button["a" /* default */], {
    style: {
      color: '#7F869F',
      backgroundColor: 'transparent'
    },
    variant: "text",
    onClick: () => handleRemoveSite(url),
    endIcon: Object(core_browser_esm["c" /* jsx */])(HighlightOff_default.a, null)
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabRemoveBtn'))))) : Object(core_browser_esm["c" /* jsx */])(ListItemText["a" /* default */], {
    style: {
      backgroundColor: '#FBFBFD',
      color: '#7F869F',
      padding: 12
    }
  }, Object(localization["b" /* getMessage */])('settingsAllowlistTabSiteWidgetListLabel')))) : null));
};
/* harmony default export */ var AllowedWidgets = (AllowWidgets);
// CONCATENATED MODULE: ./src/privacy-search/components/Options/AllowListTab/index.tsx
function AllowListTab_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
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






var AllowListTab_ref =  true ? {
  name: "1c8scww-AllowListTab",
  styles: "padding-bottom:78px;;label:AllowListTab;"
} : undefined;
var AllowListTab = () => {
  return Object(core_browser_esm["c" /* jsx */])("div", {
    css: AllowListTab_ref
  }, Object(core_browser_esm["c" /* jsx */])(AllowedSites, null), Object(core_browser_esm["c" /* jsx */])(AllowedWidgets, null));
};
/* harmony default export */ var Options_AllowListTab = __webpack_exports__["default"] = (AllowListTab);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbXBvbmVudHMvVG9nZ2xlLnRzeCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL2NvcmUvZXNtL0RpdmlkZXIvRGl2aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL2ljb25zL0FkZFNoYXJwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwtdWkvY29yZS9lc20vTGlzdEl0ZW1UZXh0L0xpc3RJdGVtVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL2NvcmUvZXNtL0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uL0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwtdWkvaWNvbnMvSGlnaGxpZ2h0T2ZmLmpzIiwid2VicGFjazovLy8uL3NyYy9wcml2YWN5LXNlYXJjaC9jb21wb25lbnRzL09wdGlvbnMvQWxsb3dMaXN0VGFiL0FsbG93ZWRTaXRlcy50c3giLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9jb3JlL2VzbS9pbnRlcm5hbC9zdmctaWNvbnMvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwtdWkvY29yZS9lc20vQ2hpcC9DaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9wcml2YWN5LXNlYXJjaC9jb21wb25lbnRzL09wdGlvbnMvQWxsb3dMaXN0VGFiL0FsbG93ZWRXaWRnZXRzLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9PcHRpb25zL0FsbG93TGlzdFRhYi9pbmRleC50c3giXSwibmFtZXMiOlsiVG9nZ2xlIiwiX3JlZiIsImlkIiwiaGVpZ2h0Iiwid2lkdGgiLCJoZXhDb2xvciIsImNoZWNrZWQiLCJhbmltYXRlIiwib25DaGFuZ2UiLCJzbGlkZXJEaWFtZXRlciIsInRvZ2dsZUNzcyIsImNzcyIsInByb2Nlc3MiLCJfX19FbW90aW9uSlNYIiwiY2xhc3NOYW1lIiwiaHRtbEZvciIsInR5cGUiLCJldmVudCIsIkVYVF9MQU5HVUFHRV9DT0RFIiwiZ2V0TGFuZ3VhZ2UiLCJTVVBQT1JUX0FSVElDTEUiLCJnZXRIb3N0c1RvQWRkIiwiaG9zdCIsImFsbG93TGlzdCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInJlbW92ZWRXd3ciLCJyZXBsYWNlIiwid2lsZGNhcmRIb3N0IiwiY29uY2F0IiwiYWRkZWRIb3N0cyIsInN0YXJ0c1dpdGgiLCJpbmNsdWRlcyIsIm5hbWUiLCJzdHlsZXMiLCJfcmVmMiIsIl9yZWYzIiwiX3JlZjQiLCJfcmVmNSIsIl9yZWY2IiwiQWxsb3dTaXRlcyIsIm9wdGlvbnMiLCJ1c2VTZWxlY3RvciIsIm9wdGlvbnNTZWxlY3RvciIsInNldHRpbmdzIiwiZGlzYWJsZWRTaXRlcyIsImFsbG93VXJsIiwic2V0QWxsb3dVcmwiLCJ1c2VTdGF0ZSIsInVybCIsImVycm9yIiwiZXJyb3JNc2ciLCJoYW5kbGVBZGRUb0xpc3QiLCJnZXRIb3N0IiwiX3VudXNlZCIsIl9vYmplY3RTcHJlYWQiLCJnZXRNZXNzYWdlIiwiYWxsb3dMaXN0SW5jbHVkZXNIb3N0cyIsImV2ZXJ5IiwiaG9zdFN0ciIsInVwZGF0ZVNldHRpbmdzIiwiaGFuZGxlVXJsSW5wdXRDaGFuZ2UiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJoYW5kbGVSZW1vdmVVcmwiLCJmaWx0ZXIiLCJzIiwiVHlwb2dyYXBoeSIsInZhcmlhbnQiLCJjb21wb25lbnQiLCJzdHlsZSIsImNvbG9yIiwibWFyZ2luIiwiQm94IiwiTGluayIsImhyZWYiLCJyZWwiLCJEaXZpZGVyIiwibWFyZ2luQm90dG9tIiwiVGV4dEZpZWxkIiwibGFiZWwiLCJmdWxsV2lkdGgiLCJzaXplIiwiaGVscGVyVGV4dCIsIm9uS2V5RG93biIsImtleSIsInByZXZlbnREZWZhdWx0IiwiSW5wdXRQcm9wcyIsImVuZEFkb3JubWVudCIsIklucHV0QWRvcm5tZW50IiwicG9zaXRpb24iLCJvbkNsaWNrIiwiQWRkU2lnbiIsIkxpc3QiLCJMaXN0SXRlbVRleHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwibWFwIiwiaSIsIkxpc3RJdGVtIiwiTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24iLCJCdXR0b24iLCJtaW5XaWR0aCIsImRpc2FibGVSaXBwbGUiLCJlbmRJY29uIiwiQ2xvc2VJY29uIiwiQWxsb3dXaWRnZXRzIiwiZW5hYmxlV2lkZ2V0Iiwic29jaWFsV2lkZ2V0UmVwbGFjZW1lbnRFbmFibGVkIiwiYWxsV2lkZ2V0cyIsIndpZGdldHMiLCJ3aWRnZXRBbGxvd2xpc3QiLCJ3aWRnZXRSZXBsYWNlbWVudEV4Y2VwdGlvbnMiLCJ3aWRnZXRTaXRlQWxsb3dsaXN0IiwiT2JqZWN0IiwiZW50cmllcyIsInNpdGUiLCJoYW5kbGVTZWxlY3RXaWRnZXQiLCJoYW5kbGVSZW1vdmVXaWRnZXQiLCJ3aWRnZXQiLCJ3IiwiaGFuZGxlUmVtb3ZlU2l0ZSIsInVwZGF0ZWRXaWRnZXRTaXRlQWxsb3dsaXN0IiwiUmVhY3QiLCJGcmFnbWVudCIsIkZvcm1Db250cm9sIiwiSW5wdXRMYWJlbCIsIlNlbGVjdCIsImJveFNoYWRvdyIsImxhYmVsSWQiLCJNZW51SXRlbSIsIkNoaXAiLCJiYWNrZ3JvdW5kIiwiYm9yZGVyUmFkaXVzIiwiZm9udFNpemUiLCJvbkRlbGV0ZSIsImRlbGV0ZUljb24iLCJIaWdobGlnaHRPZmZJY29uIiwiQWxsb3dMaXN0VGFiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZ0M7QUFDRTtBQUFBO0FBWWxDLElBQU1BLE1BQXVCLEdBQUdDLElBQUEsSUFBOEU7RUFBQSxJQUE3RTtJQUFDQyxFQUFFO0lBQUVDLE1BQU07SUFBRUMsS0FBSztJQUFFQyxRQUFRO0lBQUVDLE9BQU8sR0FBRyxLQUFLO0lBQUVDLE9BQU8sR0FBRyxJQUFJO0lBQUVDLFFBQVEsRUFBUkE7RUFBUSxDQUFDLEdBQUFQLElBQUE7RUFDckcsSUFBTVEsY0FBYyxHQUFHTixNQUFNLEdBQUcsSUFBSTtFQUVwQyxJQUFNTyxTQUFTLGdCQUFHQyxpRUFBRywyREFJSFIsTUFBTSxlQUNQQyxLQUFLLG1HQVdHRCxNQUFNLGtEQUtyQkksT0FBTyxJQUFJLG1CQUFtQixnREFJWkYsUUFBUSw4REFLWEksY0FBYyxrRUFHckJBLGNBQWMscUJBQ1RBLGNBQWMsc0NBRXBCQSxjQUFjLFNBRXJCRixPQUFPLElBQUksbUJBQW1CLG9GQUtSSCxLQUFLLEdBQUdELE1BQU0sOEJBQUFTLEtBQUEsbUJBRTdDO0VBRUQsT0FDSUMsaUVBQUE7SUFBS0YsR0FBRyxFQUFFRDtFQUFVLEdBQ2hCRyxpRUFBQTtJQUFPQyxTQUFTLEVBQUMsUUFBUTtJQUFDQyxPQUFPLEVBQUViO0VBQUcsR0FDbENXLGlFQUFBO0lBQ0lYLEVBQUUsRUFBRUEsRUFBRztJQUNQYyxJQUFJLEVBQUMsVUFBVTtJQUNmVixPQUFPLEVBQUVBO0lBQ1Q7SUFBQTtJQUNBRSxRQUFRLEVBQUdTLEtBQTBDLElBQUs7TUFDdEQsSUFBSVQsU0FBUSxFQUFFO1FBQ1ZBLFNBQVEsRUFBRTtNQUNkO0lBQ0o7RUFBRSxFQUNKLEVBQ0ZLLGlFQUFBO0lBQU1DLFNBQVMsRUFBQztFQUFRLEVBQUcsQ0FDdkIsQ0FDTjtBQUVkLENBQUM7QUFFY2QsK0RBQU0sRTs7Ozs7Ozs7QUNwR3JCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEQ7QUFDZ0M7QUFDM0Q7QUFDSTtBQUNYO0FBQ3NCO0FBQ0s7QUFDNUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLHdEQUF3RCxLQUFLO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwscURBQXFELEtBQUs7QUFDMUQ7QUFDQSx1QkFBdUIsOEVBQUs7QUFDNUIsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLHdEQUF3RCxLQUFLO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnREFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDBHQUF3Qjs7QUFFdEMsc0JBQXNCLG1EQUFtQixZQUFZLDBGQUFRO0FBQzdELGVBQWUsNERBQUk7QUFDbkI7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0QsTUFBcUMsR0FBRyxTQTREdkM7QUFDYyxtSUFBVTtBQUN6QjtBQUNBLENBQUMsVUFBVSxFOzs7Ozs7OztBQ2hKRTs7QUFFYiw2QkFBNkIsbUJBQU8sQ0FBQyxHQUE4Qzs7QUFFbkYsOEJBQThCLG1CQUFPLENBQUMsR0FBK0M7O0FBRXJGO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUEsb0NBQW9DLG1CQUFPLENBQUMsQ0FBTzs7QUFFbkQsNENBQTRDLG1CQUFPLENBQUMsR0FBdUI7O0FBRTNFO0FBQ0E7QUFDQSxDQUFDOztBQUVELDJCOzs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEQ7QUFDZ0M7QUFDM0Q7QUFDSTtBQUNYO0FBQ3NCO0FBQ1A7QUFDTztBQUN2QztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsV0FBVzs7QUFFWCxtREFBbUQsS0FBSztBQUN4RDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGdEQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywwR0FBd0I7O0FBRXRDLDBCQUEwQixnREFBZ0IsQ0FBQyxpRUFBVztBQUN0RDs7QUFFQTs7QUFFQSwwQ0FBMEMsMkRBQVU7QUFDcEQsMkJBQTJCLG1EQUFtQixDQUFDLDJEQUFVLEVBQUUsMEZBQVE7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUEsOENBQThDLDJEQUFVO0FBQ3hELDZCQUE2QixtREFBbUIsQ0FBQywyREFBVSxFQUFFLDBGQUFRO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLHNCQUFzQixtREFBbUIsUUFBUSwwRkFBUTtBQUN6RCxlQUFlLDREQUFJO0FBQ25CO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRCxNQUFxQyxHQUFHLFNBeUR2QztBQUNjLG1JQUFVO0FBQ3pCO0FBQ0EsQ0FBQyxlQUFlLEU7Ozs7Ozs7O0FDN0loQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwRDtBQUNnQztBQUMzRDtBQUNJO0FBQ1g7QUFDc0I7QUFDdkM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQyxnREFBZ0I7QUFDM0Q7QUFDQTtBQUNBLGNBQWMsMEdBQXdCOztBQUV0QyxzQkFBc0IsbURBQW1CLFFBQVEsMEZBQVE7QUFDekQsZUFBZSw0REFBSTtBQUNuQjtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0QsTUFBcUMsR0FBRyxTQXFCdkM7QUFDRDtBQUNlLG1JQUFVO0FBQ3pCO0FBQ0EsQ0FBQywwQkFBMEIsRTs7Ozs7Ozs7QUN0RGQ7O0FBRWIsNkJBQTZCLG1CQUFPLENBQUMsR0FBOEM7O0FBRW5GLDhCQUE4QixtQkFBTyxDQUFDLEdBQStDOztBQUVyRjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLG9DQUFvQyxtQkFBTyxDQUFDLENBQU87O0FBRW5ELDRDQUE0QyxtQkFBTyxDQUFDLEdBQXVCOztBQUUzRTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCwyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXVEO0FBQ3JCO0FBQ2dCO0FBQ0k7QUFDRjtBQVl6QjtBQUNhO0FBRUc7QUFDeUI7QUFDWDtBQUNLO0FBQUE7QUFFOUQsSUFBTWtCLGlCQUFpQixHQUFHQywyQ0FBVyxFQUFFO0FBQ3ZDLElBQU1DLGVBQWUsR0FDakJGLGlCQUFpQixLQUFLLElBQUksR0FDcEIsdUlBQXVJLEdBQ3ZJLHlHQUF5RztBQUU1RyxJQUFNRyxhQUFhLEdBQUcsU0FBaEJBLGFBQWFBLENBQUlDLElBQVksRUFBbUQ7RUFBQSxJQUFqREMsU0FBd0IsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsRUFBRTtFQUNyRSxJQUFNRyxVQUFVLEdBQUdMLElBQUksQ0FBQ00sT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7RUFDM0MsSUFBTUMsWUFBWSxRQUFBQyxNQUFBLENBQVFILFVBQVUsQ0FBRTtFQUN0QyxJQUFJSSxVQUF5QixHQUFHLENBQUNKLFVBQVUsQ0FBQztFQUM1QztBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksSUFBSSxDQUFDTCxJQUFJLENBQUNVLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDVCxTQUFTLENBQUNVLFFBQVEsQ0FBQ0osWUFBWSxDQUFDLEVBQUU7SUFDN0RFLFVBQVUsR0FBRyxDQUFDLEdBQUdBLFVBQVUsRUFBRUYsWUFBWSxDQUFDO0VBQzlDO0VBQ0EsT0FBT0UsVUFBVTtBQUNyQixDQUFDO0FBQUMsSUFBQTlCLElBQUEsR0FBQVcsS0FBQTtFQUFBc0IsSUFBQTtFQUFBQyxNQUFBO0FBQUE7QUFBQSxJQUFBQyxLQUFBLEdBQUF4QixLQUFBO0VBQUFzQixJQUFBO0VBQUFDLE1BQUE7QUFBQTtBQUFBLElBQUFFLEtBQUEsR0FBQXpCLEtBQUE7RUFBQXNCLElBQUE7RUFBQUMsTUFBQTtBQUFBO0FBQUEsSUFBQUcsS0FBQSxHQUFBMUIsS0FBQTtFQUFBc0IsSUFBQTtFQUFBQyxNQUFBO0FBQUE7QUFBQSxJQUFBSSxLQUFBLEdBQUEzQixLQUFBO0VBQUFzQixJQUFBO0VBQUFDLE1BQUE7QUFBQTtBQUFBLElBQUFLLEtBQUEsR0FBQTVCLEtBQUE7RUFBQXNCLElBQUE7RUFBQUMsTUFBQTtBQUFBO0FBRUYsSUFBTU0sVUFBYyxHQUFHQSxDQUFBLEtBQU07RUFDekIsSUFBTUMsT0FBTyxHQUFHQyxpQ0FBVyxDQUFDQyxvQ0FBZSxDQUFDO0VBQzVDLElBQU1yQixTQUFTLEdBQUdtQixPQUFPLENBQUNHLFFBQVEsQ0FBQ0MsYUFBYTtFQUNoRCxJQUFNLENBQUNDLFFBQVEsRUFBRUMsV0FBVyxDQUFDLEdBQUdDLHlCQUFRLENBQUM7SUFBQ0MsR0FBRyxFQUFFLEVBQUU7SUFBRUMsS0FBSyxFQUFFLEtBQUs7SUFBRUMsUUFBUSxFQUFFO0VBQUUsQ0FBQyxDQUFDO0VBRS9FLElBQU1DLGVBQWUsR0FBR0EsQ0FBQSxLQUFNO0lBQzFCLElBQU07TUFBQ0g7SUFBRyxDQUFDLEdBQUdILFFBQVE7SUFDdEIsSUFBSXpCLElBQUk7SUFDUixJQUFJO01BQ0FBLElBQUksR0FBR2dDLG9DQUFPLENBQUNKLEdBQUcsQ0FBQztJQUN2QixDQUFDLENBQUMsT0FBQUssT0FBQSxFQUFNO01BQ0pQLFdBQVcsQ0FBQVEsYUFBQSxDQUFBQSxhQUFBLEtBQUtULFFBQVE7UUFBRUksS0FBSyxFQUFFLElBQUk7UUFBRUMsUUFBUSxFQUFFSywwQ0FBVSxDQUFDLDhCQUE4QjtNQUFDLEdBQUU7TUFDN0Y7SUFDSjtJQUVBLElBQU0xQixVQUFVLEdBQUdWLGFBQWEsQ0FBQ0MsSUFBSSxFQUFFQyxTQUFTLENBQUM7SUFDakQsSUFBTW1DLHNCQUFzQixHQUFHM0IsVUFBVSxDQUFDNEIsS0FBSyxDQUFFQyxPQUFlLElBQWM7TUFDMUUsT0FBT3JDLFNBQVMsQ0FBQ1UsUUFBUSxDQUFDMkIsT0FBTyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztJQUNGO0lBQ0EsSUFBSUYsc0JBQXNCLEVBQUU7TUFDeEJWLFdBQVcsQ0FBQztRQUFDRSxHQUFHLEVBQUUsRUFBRTtRQUFFQyxLQUFLLEVBQUUsS0FBSztRQUFFQyxRQUFRLEVBQUU7TUFBRSxDQUFDLENBQUM7TUFDbEQ7SUFDSjtJQUNBUyx1REFBYyxDQUFBTCxhQUFBLENBQUFBLGFBQUEsS0FBS2QsT0FBTyxDQUFDRyxRQUFRO01BQUVDLGFBQWEsRUFBRSxDQUFDLEdBQUd2QixTQUFTLEVBQUUsR0FBR1EsVUFBVTtJQUFDLEdBQUU7SUFDbkZpQixXQUFXLENBQUM7TUFBQ0UsR0FBRyxFQUFFLEVBQUU7TUFBRUMsS0FBSyxFQUFFLEtBQUs7TUFBRUMsUUFBUSxFQUFFO0lBQUUsQ0FBQyxDQUFDO0VBQ3RELENBQUM7RUFFRCxJQUFNVSxvQkFBb0IsR0FBSUMsQ0FBZ0MsSUFBSztJQUMvRGYsV0FBVyxDQUFDO01BQUNFLEdBQUcsRUFBRWEsQ0FBQyxDQUFDQyxNQUFNLENBQUNDLEtBQUs7TUFBRWQsS0FBSyxFQUFFLEtBQUs7TUFBRUMsUUFBUSxFQUFFO0lBQUUsQ0FBQyxDQUFDO0VBQ2xFLENBQUM7RUFFRCxJQUFNYyxlQUFlLEdBQUloQixHQUFXLElBQUs7SUFDckNXLHVEQUFjLENBQUFMLGFBQUEsQ0FBQUEsYUFBQSxLQUFLZCxPQUFPLENBQUNHLFFBQVE7TUFBRUMsYUFBYSxFQUFFdkIsU0FBUyxDQUFDNEMsTUFBTSxDQUFFQyxDQUFDLElBQUtBLENBQUMsS0FBS2xCLEdBQUc7SUFBQyxHQUFFO0VBQzVGLENBQUM7RUFFRCxPQUNJckMsdUNBQUE7SUFDSUMsU0FBUyxFQUFDLGVBQWU7SUFDekJILEdBQUcsRUFBQVY7RUFFRCxHQUVGWSx1Q0FBQSxDQUFDd0QsNkJBQVU7SUFBQ0MsT0FBTyxFQUFDLElBQUk7SUFBQ0MsU0FBUyxFQUFDLElBQUk7SUFBQ0MsS0FBSyxFQUFFO01BQUNDLEtBQUssRUFBRSxTQUFTO01BQUVDLE1BQU0sRUFBRTtJQUFlO0VBQUUsR0FDdEZqQiwwQ0FBVSxDQUFDLDJCQUEyQixDQUFDLENBQy9CLEVBQ2I1Qyx1Q0FBQSxDQUFDOEQsc0JBQUc7SUFDQWhFLEdBQUcsRUFBQXlCO0VBSUQsR0FFRnZCLHVDQUFBLENBQUN3RCw2QkFBVTtJQUFDQyxPQUFPLEVBQUMsT0FBTztJQUFDQyxTQUFTLEVBQUM7RUFBRyxHQUNwQ2QsMENBQVUsQ0FBQyxpQ0FBaUMsQ0FBQyxPQUU5QzVDLHVDQUFBLENBQUMrRCx1QkFBSTtJQUNETixPQUFPLEVBQUMsT0FBTztJQUNmTyxJQUFJLEVBQUV6RCxlQUFnQjtJQUN0QjRDLE1BQU0sRUFBQyxRQUFRO0lBQ2ZjLEdBQUcsRUFBQyxxQkFBcUI7SUFDekJuRSxHQUFHLEVBQUEwQjtFQU1ELEdBRURvQiwwQ0FBVSxDQUFDLG1DQUFtQyxDQUFDLENBQzdDLENBQ0UsRUFDYjVDLHVDQUFBLENBQUNrRSwwQkFBTyxPQUFHLEVBQ1hsRSx1Q0FBQSxDQUFDd0QsNkJBQVU7SUFBQ0MsT0FBTyxFQUFDLElBQUk7SUFBQ0MsU0FBUyxFQUFDLElBQUk7SUFBQ0MsS0FBSyxFQUFFO01BQUNRLFlBQVksRUFBRTtJQUFFO0VBQUUsR0FDN0R2QiwwQ0FBVSxDQUFDLHVDQUF1QyxDQUFDLENBQzNDLEVBQ2I1Qyx1Q0FBQSxDQUFDb0UsNEJBQVM7SUFDTnpFLFFBQVEsRUFBRXNELG9CQUFxQjtJQUMvQkcsS0FBSyxFQUFFbEIsUUFBUSxDQUFDRyxHQUFJO0lBQ3BCaEIsSUFBSSxFQUFDLGNBQWM7SUFDbkJnRCxLQUFLLEVBQUV6QiwwQ0FBVSxDQUFDLG1DQUFtQyxDQUFFO0lBQ3ZEZ0IsS0FBSyxFQUFDLFNBQVM7SUFDZkgsT0FBTyxFQUFDLFVBQVU7SUFDbEJhLFNBQVM7SUFDVEMsSUFBSSxFQUFDLE9BQU87SUFDWmpDLEtBQUssRUFBRUosUUFBUSxDQUFDSSxLQUFNO0lBQ3RCa0MsVUFBVSxFQUFFdEMsUUFBUSxDQUFDSyxRQUFTO0lBQzlCekMsR0FBRyxFQUFBMkIsS0FLRDtJQUNGZ0QsU0FBUyxFQUFHdkIsQ0FBc0IsSUFBSztNQUNuQyxJQUFJQSxDQUFDLENBQUN3QixHQUFHLEtBQUssT0FBTyxFQUFFO1FBQ25CeEIsQ0FBQyxDQUFDeUIsY0FBYyxFQUFFO1FBQ2xCbkMsZUFBZSxFQUFFO01BQ3JCO0lBQ0osQ0FBRTtJQUNGb0MsVUFBVSxFQUFFO01BQ1JDLFlBQVksRUFDUjdFLHVDQUFBLENBQUM4RSxpQ0FBYztRQUFDQyxRQUFRLEVBQUM7TUFBSyxHQUMxQi9FLHVDQUFBO1FBQ0lHLElBQUksRUFBQyxRQUFRO1FBQ2I2RSxPQUFPLEVBQUc5QixDQUFnQyxJQUFLO1VBQzNDQSxDQUFDLENBQUN5QixjQUFjLEVBQUU7VUFDbEJuQyxlQUFlLEVBQUU7UUFDckIsQ0FBRTtRQUNGMUMsR0FBRyxFQUFBNEI7TUFpQkQsR0FFRjFCLHVDQUFBO1FBQ0lGLEdBQUcsRUFBQTZCO01BR0QsR0FFRGlCLDBDQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FDM0MsRUFDTjVDLHVDQUFBLENBQUNpRixrQkFBTyxPQUFHLENBQ047SUFHckI7RUFBRSxFQUNKLEVBQ0ZqRix1Q0FBQSxDQUFDa0YsdUJBQUksUUFDQSxDQUFDeEUsU0FBUyxDQUFDRSxNQUFNLElBQ2RaLHVDQUFBLENBQUNtRiwrQkFBWTtJQUFDeEIsS0FBSyxFQUFFO01BQUN5QixlQUFlLEVBQUUsU0FBUztNQUFFeEIsS0FBSyxFQUFFLFNBQVM7TUFBRXlCLE9BQU8sRUFBRTtJQUFFO0VBQUUsR0FDNUV6QywwQ0FBVSxDQUFDLHdDQUF3QyxDQUFDLENBRTVELEVBQ0FsQyxTQUFTLENBQUM0RSxHQUFHLENBQUMsQ0FBQ2pELEdBQUcsRUFBRWtELENBQUMsS0FDbEJ2Rix1Q0FBQSxDQUFDd0YsMkJBQVE7SUFBQ2QsR0FBRyxFQUFFckMsR0FBSTtJQUFDc0IsS0FBSyxFQUFFO01BQUN5QixlQUFlLEVBQUVHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsR0FBRztJQUFNO0VBQUUsR0FDM0V2Rix1Q0FBQSxDQUFDbUYsK0JBQVksUUFBRTlDLEdBQUcsQ0FBZ0IsRUFDbENyQyx1Q0FBQSxDQUFDeUYsMENBQXVCLFFBQ3BCekYsdUNBQUEsQ0FBQzBGLHlCQUFNO0lBQ0gvQixLQUFLLEVBQUU7TUFDSEMsS0FBSyxFQUFFLFNBQVM7TUFDaEJ3QixlQUFlLEVBQUUsYUFBYTtNQUM5QkMsT0FBTyxFQUFFLEdBQUc7TUFDWk0sUUFBUSxFQUFFO0lBQ2QsQ0FBRTtJQUNGbEMsT0FBTyxFQUFDLE1BQU07SUFDZG1DLGFBQWE7SUFDYlosT0FBTyxFQUFFQSxDQUFBLEtBQU0zQixlQUFlLENBQUNoQixHQUFHLENBQUU7SUFDcEN3RCxPQUFPLEVBQUU3Rix1Q0FBQSxDQUFDOEYsb0JBQVM7RUFBSSxFQUN6QixDQUNvQixDQUVqQyxDQUFDLENBQ0MsQ0FDTCxDQUNIO0FBRWYsQ0FBQztBQUVjbEUsMkRBQVUsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxT007QUFDdUI7QUFDdEQ7QUFDQTtBQUNBOztBQUVlLG1GQUFhLGVBQWUsc0JBQW1CO0FBQzlEO0FBQ0EsQ0FBQyxZQUFZLEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUjZDO0FBQ2dDO0FBQzNEO0FBQ0k7QUFDWDtBQUM4QjtBQUNSO0FBQ2dCO0FBQ2pCO0FBQ1U7QUFDVjtBQUNOO0FBQ2hDLElBQUksV0FBTTtBQUNqQjtBQUNBLHdCQUF3Qix5Q0FBSztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsOERBQThELEtBQUs7QUFDbkUsZ0JBQWdCOztBQUVoQixpRkFBaUYsS0FBSztBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDZDQUFTO0FBQ2xDLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLHVHQUF1RyxLQUFLO0FBQzVHO0FBQ0E7QUFDQSx5QkFBeUIsNkNBQVM7QUFDbEM7QUFDQSxLQUFLOztBQUVMLHlHQUF5RyxLQUFLO0FBQzlHO0FBQ0E7QUFDQSx5QkFBeUIsNkNBQVM7QUFDbEM7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw2Q0FBUztBQUNsQztBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDZDQUFTO0FBQ2xDO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsNkNBQVM7QUFDbEM7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIseUNBQUs7QUFDOUIsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIseUNBQUs7QUFDOUI7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIseUNBQUs7QUFDOUI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxjQUFjOztBQUVkO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQSw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5Q0FBSztBQUNwQjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsYUFBYSx5Q0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxhQUFhLHlDQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLGFBQWEseUNBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsYUFBYSx5Q0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxJQUFJLFNBQUksZ0JBQWdCLG1CQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxrREFBd0I7O0FBRXRDLGdCQUFnQixlQUFZO0FBQzVCLGtCQUFrQixxQ0FBVTs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsNkJBQVU7QUFDMUQsZ0NBQWdDLDZCQUFVO0FBQzFDO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0Esd0JBQXdCLGlDQUFJLGtGQUFrRixxQ0FBVSxxREFBcUQscUNBQVU7QUFDdkwsZ0RBQWdELHVCQUFvQixnQ0FBZ0MscUJBQWtCO0FBQ3RILGlCQUFpQixpQ0FBSTtBQUNyQjtBQUNBLEtBQUssaUJBQWlCLHNCQUFtQixDQUFDLE1BQVU7QUFDcEQsaUJBQWlCLGlDQUFJO0FBQ3JCO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBLGlDQUFpQyx1QkFBb0I7QUFDckQsMEJBQTBCLHFCQUFrQjtBQUM1QyxpQkFBaUIsaUNBQUksK0hBQStILHFDQUFVO0FBQzlKLEtBQUs7QUFDTDs7QUFFQTs7QUFFQSwrQkFBK0IsdUJBQW9CO0FBQ25ELHdCQUF3QixxQkFBa0I7QUFDMUMsaUJBQWlCLGlDQUFJLHVIQUF1SCxxQ0FBVTtBQUN0SixLQUFLO0FBQ0w7O0FBRUEsTUFBTSxLQUFxQyxFQUFFLEVBSTFDOztBQUVILHNCQUFzQixzQkFBbUIsWUFBWSxzQ0FBUTtBQUM3RDtBQUNBLGVBQWUsaUNBQUkseUVBQXlFLHFDQUFVLHdEQUF3RCxxQ0FBVSx1REFBdUQscUNBQVU7QUFDek87QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLGtEQUFrRCxzQkFBbUI7QUFDeEUsZUFBZSxpQ0FBSTtBQUNuQixHQUFHO0FBQ0gsQ0FBQztBQUNELE1BQXFDLEdBQUcsU0FvR3ZDO0FBQ2MsdUZBQVUsQ0FBQyxXQUFNO0FBQ2hDO0FBQ0EsQ0FBQyxFQUFFLFNBQUksQ0FBQyxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pnQlI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTZDO0FBQ1g7QUFlUDtBQUMyQjtBQUNTO0FBQ3ZCO0FBRWU7QUFDRTtBQUNDO0FBQ0k7QUFBQTtBQUFBLElBQUF4QyxrQkFBQSxHQUFBVyxLQUFBO0VBQUFzQixJQUFBO0VBQUFDLE1BQUE7QUFBQTtBQUFBLElBQUFDLG1CQUFBLEdBQUF4QixLQUFBO0VBQUFzQixJQUFBO0VBQUFDLE1BQUE7QUFBQTtBQUFBLElBQUFFLG1CQUFBLEdBQUF6QixLQUFBO0VBQUFzQixJQUFBO0VBQUFDLE1BQUE7QUFBQTtBQUFBLElBQUFHLG1CQUFBLEdBQUExQixLQUFBO0VBQUFzQixJQUFBO0VBQUFDLE1BQUE7QUFBQTtBQUU5RCxJQUFNeUUsWUFBZ0IsR0FBR0EsQ0FBQSxLQUFNO0VBQzNCLElBQU1sRSxPQUFPLEdBQUdDLGlDQUFXLENBQUNDLG9DQUFlLENBQUM7RUFDNUMsSUFBTWlFLFlBQVksR0FBR25FLE9BQU8sQ0FBQ0csUUFBUSxDQUFDaUUsOEJBQThCO0VBQ3BFLElBQU1DLFVBQVUsR0FBR3JFLE9BQU8sQ0FBQ3NFLE9BQU87RUFDbEMsSUFBTUMsZUFBZSxHQUFHdkUsT0FBTyxDQUFDRyxRQUFRLENBQUNxRSwyQkFBMkI7RUFFcEUsSUFBTUMsbUJBQW1CLEdBQUdDLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDM0UsT0FBTyxDQUFDRyxRQUFRLENBQUNzRSxtQkFBbUIsQ0FBQyxDQUFDaEIsR0FBRyxDQUFDNUQsS0FBQTtJQUFBLElBQUMsQ0FBQytFLElBQUksQ0FBQyxHQUFBL0UsS0FBQTtJQUFBLE9BQUsrRSxJQUFJO0VBQUEsRUFBQztFQUV0RyxJQUFNQyxrQkFBa0IsR0FBSXhELENBQWdDLElBQUs7SUFDN0QsSUFBTTtNQUFDRTtJQUFLLENBQUMsR0FBR0YsQ0FBQyxDQUFDQyxNQUFNOztJQUV4QjtJQUNBLElBQUksQ0FBQ2lELGVBQWUsQ0FBQ2hGLFFBQVEsQ0FBQ2dDLEtBQUssQ0FBVyxFQUFFO01BQzVDSix1REFBYyxDQUFBTCwyQkFBQSxDQUFBQSwyQkFBQSxLQUNQZCxPQUFPLENBQUNHLFFBQVE7UUFDbkJxRSwyQkFBMkIsRUFBRSxDQUFDLEdBQUd4RSxPQUFPLENBQUNHLFFBQVEsQ0FBQ3FFLDJCQUEyQixFQUFFakQsS0FBSztNQUFXLEdBQ2pHO0lBQ047RUFDSixDQUFDO0VBRUQsSUFBTXVELGtCQUFrQixHQUFJQyxNQUFjLElBQUs7SUFDM0M1RCx1REFBYyxDQUFBTCwyQkFBQSxDQUFBQSwyQkFBQSxLQUFLZCxPQUFPLENBQUNHLFFBQVE7TUFBRXFFLDJCQUEyQixFQUFFRCxlQUFlLENBQUM5QyxNQUFNLENBQUV1RCxDQUFDLElBQUtBLENBQUMsS0FBS0QsTUFBTTtJQUFDLEdBQUU7RUFDbkgsQ0FBQztFQUVELElBQU1FLGdCQUFnQixHQUFJekUsR0FBVyxJQUFLO0lBQ3RDLElBQU0wRSwwQkFBMEIsR0FBQXBFLDJCQUFBLEtBQU9kLE9BQU8sQ0FBQ0csUUFBUSxDQUFDc0UsbUJBQW1CLENBQUM7SUFFNUUsT0FBT1MsMEJBQTBCLENBQUMxRSxHQUFHLENBQUM7SUFFdENXLHVEQUFjLENBQUFMLDJCQUFBLENBQUFBLDJCQUFBLEtBQ1BkLE9BQU8sQ0FBQ0csUUFBUTtNQUNuQnNFLG1CQUFtQixFQUFFUztJQUEwQixHQUNqRDtFQUNOLENBQUM7RUFFRCxPQUNJL0csdUNBQUE7SUFBTUMsU0FBUyxFQUFDO0VBQWlCLEdBQzdCRCx1Q0FBQSxDQUFDd0QsNkJBQVU7SUFBQ0MsT0FBTyxFQUFDLElBQUk7SUFBQ0MsU0FBUyxFQUFDLElBQUk7SUFBQ0MsS0FBSyxFQUFFO01BQUNDLEtBQUssRUFBRSxTQUFTO01BQUVDLE1BQU0sRUFBRTtJQUFlO0VBQUUsR0FDdEZqQiwwQ0FBVSxDQUFDLGlDQUFpQyxDQUFDLENBQ3JDLEVBQ2I1Qyx1Q0FBQSxDQUFDOEQsc0JBQUc7SUFDQWhFLEdBQUcsRUFBQVY7RUFLRCxHQUVGWSx1Q0FBQSxDQUFDd0QsNkJBQVU7SUFBQ0MsT0FBTyxFQUFDLE9BQU87SUFBQ0MsU0FBUyxFQUFDO0VBQUcsR0FDcENkLDBDQUFVLENBQUMsdUNBQXVDLENBQUMsQ0FDM0MsRUFDYjVDLHVDQUFBLENBQUNrRSwwQkFBTyxPQUFHLEVBQ1hsRSx1Q0FBQTtJQUNJRixHQUFHLEVBQUF5QjtFQUlELEdBRUZ2Qix1Q0FBQSxDQUFDd0QsNkJBQVU7SUFBQ0MsT0FBTyxFQUFDLElBQUk7SUFBQ0MsU0FBUyxFQUFDO0VBQUksR0FDbENkLDBDQUFVLENBQUMsdUNBQXVDLENBQUMsQ0FDM0MsRUFDYjVDLHVDQUFBLENBQUNiLHlCQUFNO0lBQ0hFLEVBQUUsRUFBQyxvQkFBb0I7SUFDdkJDLE1BQU0sRUFBRSxFQUFHO0lBQ1hDLEtBQUssRUFBRSxFQUFHO0lBQ1ZDLFFBQVEsRUFBQyxTQUFTO0lBQ2xCQyxPQUFPLEVBQUV1RyxZQUFhO0lBQ3RCckcsUUFBUSxFQUFFQSxDQUFBLEtBQU07TUFDWnFELHVEQUFjLENBQUFMLDJCQUFBLENBQUFBLDJCQUFBLEtBQUtkLE9BQU8sQ0FBQ0csUUFBUTtRQUFFaUUsOEJBQThCLEVBQUUsQ0FBQ0Q7TUFBWSxHQUFFO0lBQ3hGO0VBQUUsRUFDSixDQUNBLEVBQ0xBLFlBQVksR0FDVGhHLHVDQUFBLENBQUFnSCxlQUFBLENBQUFDLFFBQUEsUUFDSWpILHVDQUFBLENBQUNrRSwwQkFBTyxPQUFHLEVBQ1hsRSx1Q0FBQSxDQUFDd0QsNkJBQVU7SUFBQ0MsT0FBTyxFQUFDLElBQUk7SUFBQ0MsU0FBUyxFQUFDLElBQUk7SUFBQ0MsS0FBSyxFQUFFO01BQUNRLFlBQVksRUFBRTtJQUFFO0VBQUUsR0FDN0R2QiwwQ0FBVSxDQUFDLHlDQUF5QyxDQUFDLENBQzdDLEVBQ2I1Qyx1Q0FBQSxDQUFDa0gsOEJBQVc7SUFBQ3pELE9BQU8sRUFBQyxVQUFVO0lBQUNhLFNBQVM7SUFBQ0MsSUFBSSxFQUFDO0VBQU8sR0FDbER2RSx1Q0FBQSxDQUFDbUgsNkJBQVU7SUFBQ2pILE9BQU8sRUFBQztFQUFpQyxHQUNoRDBDLDBDQUFVLENBQUMsb0NBQW9DLENBQUMsQ0FDeEMsRUFDYjVDLHVDQUFBLENBQUNvSCx5QkFBTTtJQUNIekQsS0FBSyxFQUFFO01BQUMwRCxTQUFTLEVBQUU7SUFBTSxDQUFFO0lBQzNCMUgsUUFBUSxFQUFFK0csa0JBQW1CO0lBQzdCakQsT0FBTyxFQUFDLFVBQVU7SUFDbEI2RCxPQUFPLEVBQUMsaUNBQWlDO0lBQ3pDakQsS0FBSyxFQUFDLDhCQUE4QjtJQUNwQ2hGLEVBQUUsRUFBQztFQUFpQyxHQUVuQzZHLFVBQVUsQ0FBQ3RGLE1BQU0sR0FDZHNGLFVBQVUsQ0FBQ1osR0FBRyxDQUFFc0IsTUFBTSxJQUNsQjVHLHVDQUFBLENBQUN1SCwyQkFBUTtJQUNMN0MsR0FBRyxFQUFFa0MsTUFBTztJQUNaeEQsS0FBSyxFQUFFd0QsTUFBTztJQUNkakQsS0FBSyxFQUFFO01BQ0h5QixlQUFlLEVBQUVnQixlQUFlLENBQUNoRixRQUFRLENBQUN3RixNQUFNLENBQUMsR0FDM0MscUJBQXFCLEdBQ3JCO0lBQ1Y7RUFBRSxHQUVEQSxNQUFNLENBRWQsQ0FBQyxHQUVGNUcsdUNBQUEsQ0FBQ21GLCtCQUFZO0lBQUN4QixLQUFLLEVBQUU7TUFBQ3lCLGVBQWUsRUFBRSxTQUFTO01BQUV4QixLQUFLLEVBQUUsU0FBUztNQUFFeUIsT0FBTyxFQUFFO0lBQUU7RUFBRSxHQUFDLDBCQUVsRixDQUNILENBQ0ksQ0FDQyxFQUNkckYsdUNBQUE7SUFDSUYsR0FBRyxFQUFBMEI7RUFLRCxHQUVENEUsZUFBZSxDQUFDeEYsTUFBTSxHQUNuQndGLGVBQWUsQ0FBQ2QsR0FBRyxDQUFFakQsR0FBRyxJQUNwQnJDLHVDQUFBO0lBQ0lGLEdBQUcsRUFBQTJCLG1CQUdEO0lBQ0ZpRCxHQUFHLEVBQUVyQztFQUFJLEdBRVRyQyx1Q0FBQSxDQUFDd0gsYUFBSTtJQUNEbkQsS0FBSyxFQUFFaEMsR0FBSTtJQUNYc0IsS0FBSyxFQUFFO01BQ0hDLEtBQUssRUFBRSxTQUFTO01BQ2hCNkQsVUFBVSxFQUFFLFNBQVM7TUFDckJDLFlBQVksRUFBRSxDQUFDO01BQ2ZDLFFBQVEsRUFBRTtJQUNkLENBQUU7SUFDRkMsUUFBUSxFQUFFQSxDQUFBLEtBQU1qQixrQkFBa0IsQ0FBQ3RFLEdBQUcsQ0FBRTtJQUN4Q3dGLFVBQVUsRUFBRTdILHVDQUFBLENBQUM4RixvQkFBUztFQUFJLEVBQzVCLENBRVQsQ0FBQyxHQUVGOUYsdUNBQUEsQ0FBQ21GLCtCQUFZO0lBQUN4QixLQUFLLEVBQUU7TUFBQ3lCLGVBQWUsRUFBRSxTQUFTO01BQUV4QixLQUFLLEVBQUUsU0FBUztNQUFFeUIsT0FBTyxFQUFFO0lBQUU7RUFBRSxHQUM1RXpDLDBDQUFVLENBQUMsbUNBQW1DLENBQUMsQ0FFdkQsQ0FDQSxFQUNMNUMsdUNBQUEsQ0FBQ2tFLDBCQUFPLE9BQUcsRUFDWGxFLHVDQUFBLENBQUN3RCw2QkFBVTtJQUFDQyxPQUFPLEVBQUMsSUFBSTtJQUFDQyxTQUFTLEVBQUMsSUFBSTtJQUFDQyxLQUFLLEVBQUU7TUFBQ1EsWUFBWSxFQUFFO0lBQUU7RUFBRSxHQUM3RHZCLDBDQUFVLENBQUMsc0NBQXNDLENBQUMsQ0FDMUMsRUFDYjVDLHVDQUFBLENBQUNrRix1QkFBSSxRQUNBb0IsbUJBQW1CLENBQUMxRixNQUFNLEdBQ3ZCMEYsbUJBQW1CLENBQUNoQixHQUFHLENBQUMsQ0FBQ2pELEdBQUcsRUFBRWtELENBQUMsS0FDM0J2Rix1Q0FBQSxDQUFDd0YsMkJBQVE7SUFBQ2QsR0FBRyxFQUFFckMsR0FBSTtJQUFDc0IsS0FBSyxFQUFFO01BQUN5QixlQUFlLEVBQUVHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsR0FBRztJQUFNO0VBQUUsR0FDM0V2Rix1Q0FBQSxDQUFDbUYsK0JBQVksUUFBRTlDLEdBQUcsQ0FBZ0IsRUFDbENyQyx1Q0FBQSxDQUFDeUYsMENBQXVCLFFBQ3BCekYsdUNBQUEsQ0FBQzBGLHlCQUFNO0lBQ0gvQixLQUFLLEVBQUU7TUFBQ0MsS0FBSyxFQUFFLFNBQVM7TUFBRXdCLGVBQWUsRUFBRTtJQUFhLENBQUU7SUFDMUQzQixPQUFPLEVBQUMsTUFBTTtJQUNkdUIsT0FBTyxFQUFFQSxDQUFBLEtBQU04QixnQkFBZ0IsQ0FBQ3pFLEdBQUcsQ0FBRTtJQUNyQ3dELE9BQU8sRUFBRTdGLHVDQUFBLENBQUM4SCxzQkFBZ0I7RUFBSSxHQUU3QmxGLDBDQUFVLENBQUMsK0JBQStCLENBQUMsQ0FDdkMsQ0FDYSxDQUVqQyxDQUFDLEdBRUY1Qyx1Q0FBQSxDQUFDbUYsK0JBQVk7SUFBQ3hCLEtBQUssRUFBRTtNQUFDeUIsZUFBZSxFQUFFLFNBQVM7TUFBRXhCLEtBQUssRUFBRSxTQUFTO01BQUV5QixPQUFPLEVBQUU7SUFBRTtFQUFFLEdBQzVFekMsMENBQVUsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUU3RCxDQUNFLENBQ1IsR0FDSCxJQUFJLENBQ04sQ0FDSDtBQUVmLENBQUM7QUFFY21ELCtEQUFZLEU7OztBQ2pPM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWdDO0FBQ0U7QUFDTTtBQUNJO0FBQUE7QUFBQSxJQUFBM0csZ0JBQUEsR0FBQVcsS0FBQTtFQUFBc0IsSUFBQTtFQUFBQyxNQUFBO0FBQUE7QUFFNUMsSUFBTXlHLFlBQWdCLEdBQUdBLENBQUEsS0FBTTtFQUMzQixPQUNJL0gsdUNBQUE7SUFDSUYsR0FBRyxFQUFBVjtFQUVELEdBRUZZLHVDQUFBLENBQUM0QixZQUFVLE9BQUcsRUFDZDVCLHVDQUFBLENBQUMrRixjQUFZLE9BQUcsQ0FDZDtBQUVkLENBQUM7QUFFY2dDLHNHQUFZLEUiLCJmaWxlIjoiMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIyIFN1cmZib2FyZCBIb2xkaW5nIEIuVi4gPGh0dHBzOi8vd3d3LnN0YXJ0cGFnZS5jb20+XG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7RkN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcblxudHlwZSBUb2dnbGVQcm9wcyA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGV4Q29sb3I6IHN0cmluZztcbiAgICBjaGVja2VkPzogYm9vbGVhbjtcbiAgICBhbmltYXRlPzogYm9vbGVhbjtcbiAgICBvbkNoYW5nZT86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBUb2dnbGU6IEZDPFRvZ2dsZVByb3BzPiA9ICh7aWQsIGhlaWdodCwgd2lkdGgsIGhleENvbG9yLCBjaGVja2VkID0gZmFsc2UsIGFuaW1hdGUgPSB0cnVlLCBvbkNoYW5nZX0pID0+IHtcbiAgICBjb25zdCBzbGlkZXJEaWFtZXRlciA9IGhlaWdodCAqIDAuNzU7XG5cbiAgICBjb25zdCB0b2dnbGVDc3MgPSBjc3NgXG4gICAgICAgIC5zd2l0Y2gge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgaGVpZ2h0OiAke2hlaWdodH1weDtcbiAgICAgICAgICAgIHdpZHRoOiAke3dpZHRofXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnN3aXRjaCBpbnB1dCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2xpZGVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjZWQxZGQ7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAke2hlaWdodH1weDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGluc2V0OiAwO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuXG4gICAgICAgICAgICAke2FuaW1hdGUgJiYgJ3RyYW5zaXRpb246IDAuNHM7J31cbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7aGV4Q29sb3J9O1xuICAgICAgICB9XG5cbiAgICAgICAgLnNsaWRlcjpiZWZvcmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ViZWNmNztcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6ICR7c2xpZGVyRGlhbWV0ZXJ9cHg7XG4gICAgICAgICAgICBib3gtc2hhZG93OiAxcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgIGhlaWdodDogJHtzbGlkZXJEaWFtZXRlcn1weDtcbiAgICAgICAgICAgIG1hcmdpbjogY2FsYygke3NsaWRlckRpYW1ldGVyfXB4IC8gNik7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB3aWR0aDogJHtzbGlkZXJEaWFtZXRlcn1weDtcblxuICAgICAgICAgICAgJHthbmltYXRlICYmICd0cmFuc2l0aW9uOiAwLjRzOyd9XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dDpjaGVja2VkICsgLnNsaWRlcjpiZWZvcmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke3dpZHRoIC0gaGVpZ2h0fXB4KTtcbiAgICAgICAgfVxuICAgIGA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17dG9nZ2xlQ3NzfT5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJzd2l0Y2hcIiBodG1sRm9yPXtpZH0+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNsaWRlclwiIC8+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlO1xuIiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnLi4vc3R5bGVzL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHsgYWxwaGEgfSBmcm9tICcuLi9zdHlsZXMvY29sb3JNYW5pcHVsYXRvcic7XG5leHBvcnQgdmFyIHN0eWxlcyA9IGZ1bmN0aW9uIHN0eWxlcyh0aGVtZSkge1xuICByZXR1cm4ge1xuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQuICovXG4gICAgcm9vdDoge1xuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgLy8gUmVzZXQgYnJvd3NlciBkZWZhdWx0IHN0eWxlLlxuICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICBmbGV4U2hyaW5rOiAwLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLmRpdmlkZXJcbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgYWJzb2x1dGU9e3RydWV9YC4gKi9cbiAgICBhYnNvbHV0ZToge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmIGB2YXJpYW50PVwiaW5zZXRcImAuICovXG4gICAgaW5zZXQ6IHtcbiAgICAgIG1hcmdpbkxlZnQ6IDcyXG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYGxpZ2h0PXt0cnVlfWAuICovXG4gICAgbGlnaHQ6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYWxwaGEodGhlbWUucGFsZXR0ZS5kaXZpZGVyLCAwLjA4KVxuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmIGB2YXJpYW50PVwibWlkZGxlXCJgLiAqL1xuICAgIG1pZGRsZToge1xuICAgICAgbWFyZ2luTGVmdDogdGhlbWUuc3BhY2luZygyKSxcbiAgICAgIG1hcmdpblJpZ2h0OiB0aGVtZS5zcGFjaW5nKDIpXG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYG9yaWVudGF0aW9uPVwidmVydGljYWxcImAuICovXG4gICAgdmVydGljYWw6IHtcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgd2lkdGg6IDFcbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgZmxleEl0ZW09e3RydWV9YC4gKi9cbiAgICBmbGV4SXRlbToge1xuICAgICAgYWxpZ25TZWxmOiAnc3RyZXRjaCcsXG4gICAgICBoZWlnaHQ6ICdhdXRvJ1xuICAgIH1cbiAgfTtcbn07XG52YXIgRGl2aWRlciA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIERpdmlkZXIocHJvcHMsIHJlZikge1xuICB2YXIgX3Byb3BzJGFic29sdXRlID0gcHJvcHMuYWJzb2x1dGUsXG4gICAgICBhYnNvbHV0ZSA9IF9wcm9wcyRhYnNvbHV0ZSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkYWJzb2x1dGUsXG4gICAgICBjbGFzc2VzID0gcHJvcHMuY2xhc3NlcyxcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIF9wcm9wcyRjb21wb25lbnQgPSBwcm9wcy5jb21wb25lbnQsXG4gICAgICBDb21wb25lbnQgPSBfcHJvcHMkY29tcG9uZW50ID09PSB2b2lkIDAgPyAnaHInIDogX3Byb3BzJGNvbXBvbmVudCxcbiAgICAgIF9wcm9wcyRmbGV4SXRlbSA9IHByb3BzLmZsZXhJdGVtLFxuICAgICAgZmxleEl0ZW0gPSBfcHJvcHMkZmxleEl0ZW0gPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGZsZXhJdGVtLFxuICAgICAgX3Byb3BzJGxpZ2h0ID0gcHJvcHMubGlnaHQsXG4gICAgICBsaWdodCA9IF9wcm9wcyRsaWdodCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkbGlnaHQsXG4gICAgICBfcHJvcHMkb3JpZW50YXRpb24gPSBwcm9wcy5vcmllbnRhdGlvbixcbiAgICAgIG9yaWVudGF0aW9uID0gX3Byb3BzJG9yaWVudGF0aW9uID09PSB2b2lkIDAgPyAnaG9yaXpvbnRhbCcgOiBfcHJvcHMkb3JpZW50YXRpb24sXG4gICAgICBfcHJvcHMkcm9sZSA9IHByb3BzLnJvbGUsXG4gICAgICByb2xlID0gX3Byb3BzJHJvbGUgPT09IHZvaWQgMCA/IENvbXBvbmVudCAhPT0gJ2hyJyA/ICdzZXBhcmF0b3InIDogdW5kZWZpbmVkIDogX3Byb3BzJHJvbGUsXG4gICAgICBfcHJvcHMkdmFyaWFudCA9IHByb3BzLnZhcmlhbnQsXG4gICAgICB2YXJpYW50ID0gX3Byb3BzJHZhcmlhbnQgPT09IHZvaWQgMCA/ICdmdWxsV2lkdGgnIDogX3Byb3BzJHZhcmlhbnQsXG4gICAgICBvdGhlciA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgW1wiYWJzb2x1dGVcIiwgXCJjbGFzc2VzXCIsIFwiY2xhc3NOYW1lXCIsIFwiY29tcG9uZW50XCIsIFwiZmxleEl0ZW1cIiwgXCJsaWdodFwiLCBcIm9yaWVudGF0aW9uXCIsIFwicm9sZVwiLCBcInZhcmlhbnRcIl0pO1xuXG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IGNsc3goY2xhc3Nlcy5yb290LCBjbGFzc05hbWUsIHZhcmlhbnQgIT09ICdmdWxsV2lkdGgnICYmIGNsYXNzZXNbdmFyaWFudF0sIGFic29sdXRlICYmIGNsYXNzZXMuYWJzb2x1dGUsIGZsZXhJdGVtICYmIGNsYXNzZXMuZmxleEl0ZW0sIGxpZ2h0ICYmIGNsYXNzZXMubGlnaHQsIG9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIGNsYXNzZXMudmVydGljYWwpLFxuICAgIHJvbGU6IHJvbGUsXG4gICAgcmVmOiByZWZcbiAgfSwgb3RoZXIpKTtcbn0pO1xucHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gRGl2aWRlci5wcm9wVHlwZXMgPSB7XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFdhcm5pbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gfCBUaGVzZSBQcm9wVHlwZXMgYXJlIGdlbmVyYXRlZCBmcm9tIHRoZSBUeXBlU2NyaXB0IHR5cGUgZGVmaW5pdGlvbnMgfFxuICAvLyB8ICAgICBUbyB1cGRhdGUgdGhlbSBlZGl0IHRoZSBkLnRzIGZpbGUgYW5kIHJ1biBcInlhcm4gcHJvcHR5cGVzXCIgICAgIHxcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBBYnNvbHV0ZWx5IHBvc2l0aW9uIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgYWJzb2x1dGU6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIG9yIGV4dGVuZCB0aGUgc3R5bGVzIGFwcGxpZWQgdG8gdGhlIGNvbXBvbmVudC5cbiAgICogU2VlIFtDU1MgQVBJXSgjY3NzKSBiZWxvdyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBUaGUgY29tcG9uZW50IHVzZWQgZm9yIHRoZSByb290IG5vZGUuXG4gICAqIEVpdGhlciBhIHN0cmluZyB0byB1c2UgYSBIVE1MIGVsZW1lbnQgb3IgYSBjb21wb25lbnQuXG4gICAqL1xuICBjb21wb25lbnQ6IFByb3BUeXBlc1xuICAvKiBAdHlwZXNjcmlwdC10by1wcm9wdHlwZXMtaWdub3JlICovXG4gIC5lbGVtZW50VHlwZSxcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBhIHZlcnRpY2FsIGRpdmlkZXIgd2lsbCBoYXZlIHRoZSBjb3JyZWN0IGhlaWdodCB3aGVuIHVzZWQgaW4gZmxleCBjb250YWluZXIuXG4gICAqIChCeSBkZWZhdWx0LCBhIHZlcnRpY2FsIGRpdmlkZXIgd2lsbCBoYXZlIGEgY2FsY3VsYXRlZCBoZWlnaHQgb2YgYDBweGAgaWYgaXQgaXMgdGhlIGNoaWxkIG9mIGEgZmxleCBjb250YWluZXIuKVxuICAgKi9cbiAgZmxleEl0ZW06IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBkaXZpZGVyIHdpbGwgaGF2ZSBhIGxpZ2h0ZXIgY29sb3IuXG4gICAqL1xuICBsaWdodDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIFRoZSBkaXZpZGVyIG9yaWVudGF0aW9uLlxuICAgKi9cbiAgb3JpZW50YXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2hvcml6b250YWwnLCAndmVydGljYWwnXSksXG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHJvbGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIFRoZSB2YXJpYW50IHRvIHVzZS5cbiAgICovXG4gIHZhcmlhbnQ6IFByb3BUeXBlcy5vbmVPZihbJ2Z1bGxXaWR0aCcsICdpbnNldCcsICdtaWRkbGUnXSlcbn0gOiB2b2lkIDA7XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcywge1xuICBuYW1lOiAnTXVpRGl2aWRlcidcbn0pKERpdmlkZXIpOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVXaWxkY2FyZFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIFJlYWN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcInJlYWN0XCIpKTtcblxudmFyIF9jcmVhdGVTdmdJY29uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9jcmVhdGVTdmdJY29uXCIpKTtcblxudmFyIF9kZWZhdWx0ID0gKDAsIF9jcmVhdGVTdmdJY29uLmRlZmF1bHQpKCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICBkOiBcIk0xOSAxM2gtNnY2aC0ydi02SDV2LTJoNlY1aDJ2Nmg2djJ6XCJcbn0pLCAnQWRkU2hhcnAnKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnLi4vc3R5bGVzL3dpdGhTdHlsZXMnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnLi4vVHlwb2dyYXBoeSc7XG5pbXBvcnQgTGlzdENvbnRleHQgZnJvbSAnLi4vTGlzdC9MaXN0Q29udGV4dCc7XG5leHBvcnQgdmFyIHN0eWxlcyA9IHtcbiAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudC4gKi9cbiAgcm9vdDoge1xuICAgIGZsZXg6ICcxIDEgYXV0bycsXG4gICAgbWluV2lkdGg6IDAsXG4gICAgbWFyZ2luVG9wOiA0LFxuICAgIG1hcmdpbkJvdHRvbTogNFxuICB9LFxuXG4gIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBgVHlwb2dyYXBoeWAgY29tcG9uZW50cyBpZiBwcmltYXJ5IGFuZCBzZWNvbmRhcnkgYXJlIHNldC4gKi9cbiAgbXVsdGlsaW5lOiB7XG4gICAgbWFyZ2luVG9wOiA2LFxuICAgIG1hcmdpbkJvdHRvbTogNlxuICB9LFxuXG4gIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBgVHlwb2dyYXBoeWAgY29tcG9uZW50cyBpZiBkZW5zZS4gKi9cbiAgZGVuc2U6IHt9LFxuXG4gIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYGluc2V0PXt0cnVlfWAuICovXG4gIGluc2V0OiB7XG4gICAgcGFkZGluZ0xlZnQ6IDU2XG4gIH0sXG5cbiAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHByaW1hcnkgYFR5cG9ncmFwaHlgIGNvbXBvbmVudC4gKi9cbiAgcHJpbWFyeToge30sXG5cbiAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHNlY29uZGFyeSBgVHlwb2dyYXBoeWAgY29tcG9uZW50LiAqL1xuICBzZWNvbmRhcnk6IHt9XG59O1xudmFyIExpc3RJdGVtVGV4dCA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIExpc3RJdGVtVGV4dChwcm9wcywgcmVmKSB7XG4gIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2xhc3NlcyA9IHByb3BzLmNsYXNzZXMsXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBfcHJvcHMkZGlzYWJsZVR5cG9ncmEgPSBwcm9wcy5kaXNhYmxlVHlwb2dyYXBoeSxcbiAgICAgIGRpc2FibGVUeXBvZ3JhcGh5ID0gX3Byb3BzJGRpc2FibGVUeXBvZ3JhID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wcm9wcyRkaXNhYmxlVHlwb2dyYSxcbiAgICAgIF9wcm9wcyRpbnNldCA9IHByb3BzLmluc2V0LFxuICAgICAgaW5zZXQgPSBfcHJvcHMkaW5zZXQgPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGluc2V0LFxuICAgICAgcHJpbWFyeVByb3AgPSBwcm9wcy5wcmltYXJ5LFxuICAgICAgcHJpbWFyeVR5cG9ncmFwaHlQcm9wcyA9IHByb3BzLnByaW1hcnlUeXBvZ3JhcGh5UHJvcHMsXG4gICAgICBzZWNvbmRhcnlQcm9wID0gcHJvcHMuc2Vjb25kYXJ5LFxuICAgICAgc2Vjb25kYXJ5VHlwb2dyYXBoeVByb3BzID0gcHJvcHMuc2Vjb25kYXJ5VHlwb2dyYXBoeVByb3BzLFxuICAgICAgb3RoZXIgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMocHJvcHMsIFtcImNoaWxkcmVuXCIsIFwiY2xhc3Nlc1wiLCBcImNsYXNzTmFtZVwiLCBcImRpc2FibGVUeXBvZ3JhcGh5XCIsIFwiaW5zZXRcIiwgXCJwcmltYXJ5XCIsIFwicHJpbWFyeVR5cG9ncmFwaHlQcm9wc1wiLCBcInNlY29uZGFyeVwiLCBcInNlY29uZGFyeVR5cG9ncmFwaHlQcm9wc1wiXSk7XG5cbiAgdmFyIF9SZWFjdCR1c2VDb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChMaXN0Q29udGV4dCksXG4gICAgICBkZW5zZSA9IF9SZWFjdCR1c2VDb250ZXh0LmRlbnNlO1xuXG4gIHZhciBwcmltYXJ5ID0gcHJpbWFyeVByb3AgIT0gbnVsbCA/IHByaW1hcnlQcm9wIDogY2hpbGRyZW47XG5cbiAgaWYgKHByaW1hcnkgIT0gbnVsbCAmJiBwcmltYXJ5LnR5cGUgIT09IFR5cG9ncmFwaHkgJiYgIWRpc2FibGVUeXBvZ3JhcGh5KSB7XG4gICAgcHJpbWFyeSA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFR5cG9ncmFwaHksIF9leHRlbmRzKHtcbiAgICAgIHZhcmlhbnQ6IGRlbnNlID8gJ2JvZHkyJyA6ICdib2R5MScsXG4gICAgICBjbGFzc05hbWU6IGNsYXNzZXMucHJpbWFyeSxcbiAgICAgIGNvbXBvbmVudDogXCJzcGFuXCIsXG4gICAgICBkaXNwbGF5OiBcImJsb2NrXCJcbiAgICB9LCBwcmltYXJ5VHlwb2dyYXBoeVByb3BzKSwgcHJpbWFyeSk7XG4gIH1cblxuICB2YXIgc2Vjb25kYXJ5ID0gc2Vjb25kYXJ5UHJvcDtcblxuICBpZiAoc2Vjb25kYXJ5ICE9IG51bGwgJiYgc2Vjb25kYXJ5LnR5cGUgIT09IFR5cG9ncmFwaHkgJiYgIWRpc2FibGVUeXBvZ3JhcGh5KSB7XG4gICAgc2Vjb25kYXJ5ID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoVHlwb2dyYXBoeSwgX2V4dGVuZHMoe1xuICAgICAgdmFyaWFudDogXCJib2R5MlwiLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc2VzLnNlY29uZGFyeSxcbiAgICAgIGNvbG9yOiBcInRleHRTZWNvbmRhcnlcIixcbiAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxuICAgIH0sIHNlY29uZGFyeVR5cG9ncmFwaHlQcm9wcyksIHNlY29uZGFyeSk7XG4gIH1cblxuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgX2V4dGVuZHMoe1xuICAgIGNsYXNzTmFtZTogY2xzeChjbGFzc2VzLnJvb3QsIGNsYXNzTmFtZSwgZGVuc2UgJiYgY2xhc3Nlcy5kZW5zZSwgaW5zZXQgJiYgY2xhc3Nlcy5pbnNldCwgcHJpbWFyeSAmJiBzZWNvbmRhcnkgJiYgY2xhc3Nlcy5tdWx0aWxpbmUpLFxuICAgIHJlZjogcmVmXG4gIH0sIG90aGVyKSwgcHJpbWFyeSwgc2Vjb25kYXJ5KTtcbn0pO1xucHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gTGlzdEl0ZW1UZXh0LnByb3BUeXBlcyA9IHtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gV2FybmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyB8IFRoZXNlIFByb3BUeXBlcyBhcmUgZ2VuZXJhdGVkIGZyb20gdGhlIFR5cGVTY3JpcHQgdHlwZSBkZWZpbml0aW9ucyB8XG4gIC8vIHwgICAgIFRvIHVwZGF0ZSB0aGVtIGVkaXQgdGhlIGQudHMgZmlsZSBhbmQgcnVuIFwieWFybiBwcm9wdHlwZXNcIiAgICAgfFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB0aGUgYHByaW1hcnlgIHByb3AuXG4gICAqL1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIG9yIGV4dGVuZCB0aGUgc3R5bGVzIGFwcGxpZWQgdG8gdGhlIGNvbXBvbmVudC5cbiAgICogU2VlIFtDU1MgQVBJXSgjY3NzKSBiZWxvdyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjaGlsZHJlbiB3b24ndCBiZSB3cmFwcGVkIGJ5IGEgVHlwb2dyYXBoeSBjb21wb25lbnQuXG4gICAqIFRoaXMgY2FuIGJlIHVzZWZ1bCB0byByZW5kZXIgYW4gYWx0ZXJuYXRpdmUgVHlwb2dyYXBoeSB2YXJpYW50IGJ5IHdyYXBwaW5nXG4gICAqIHRoZSBgY2hpbGRyZW5gIChvciBgcHJpbWFyeWApIHRleHQsIGFuZCBvcHRpb25hbCBgc2Vjb25kYXJ5YCB0ZXh0XG4gICAqIHdpdGggdGhlIFR5cG9ncmFwaHkgY29tcG9uZW50LlxuICAgKi9cbiAgZGlzYWJsZVR5cG9ncmFwaHk6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjaGlsZHJlbiB3aWxsIGJlIGluZGVudGVkLlxuICAgKiBUaGlzIHNob3VsZCBiZSB1c2VkIGlmIHRoZXJlIGlzIG5vIGxlZnQgYXZhdGFyIG9yIGxlZnQgaWNvbi5cbiAgICovXG4gIGluc2V0OiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogVGhlIG1haW4gY29udGVudCBlbGVtZW50LlxuICAgKi9cbiAgcHJpbWFyeTogUHJvcFR5cGVzLm5vZGUsXG5cbiAgLyoqXG4gICAqIFRoZXNlIHByb3BzIHdpbGwgYmUgZm9yd2FyZGVkIHRvIHRoZSBwcmltYXJ5IHR5cG9ncmFwaHkgY29tcG9uZW50XG4gICAqIChhcyBsb25nIGFzIGRpc2FibGVUeXBvZ3JhcGh5IGlzIG5vdCBgdHJ1ZWApLlxuICAgKi9cbiAgcHJpbWFyeVR5cG9ncmFwaHlQcm9wczogUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKipcbiAgICogVGhlIHNlY29uZGFyeSBjb250ZW50IGVsZW1lbnQuXG4gICAqL1xuICBzZWNvbmRhcnk6IFByb3BUeXBlcy5ub2RlLFxuXG4gIC8qKlxuICAgKiBUaGVzZSBwcm9wcyB3aWxsIGJlIGZvcndhcmRlZCB0byB0aGUgc2Vjb25kYXJ5IHR5cG9ncmFwaHkgY29tcG9uZW50XG4gICAqIChhcyBsb25nIGFzIGRpc2FibGVUeXBvZ3JhcGh5IGlzIG5vdCBgdHJ1ZWApLlxuICAgKi9cbiAgc2Vjb25kYXJ5VHlwb2dyYXBoeVByb3BzOiBQcm9wVHlwZXMub2JqZWN0XG59IDogdm9pZCAwO1xuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzdHlsZXMsIHtcbiAgbmFtZTogJ011aUxpc3RJdGVtVGV4dCdcbn0pKExpc3RJdGVtVGV4dCk7IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnLi4vc3R5bGVzL3dpdGhTdHlsZXMnO1xuZXhwb3J0IHZhciBzdHlsZXMgPSB7XG4gIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQuICovXG4gIHJvb3Q6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICByaWdodDogMTYsXG4gICAgdG9wOiAnNTAlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJ1xuICB9XG59O1xuLyoqXG4gKiBNdXN0IGJlIHVzZWQgYXMgdGhlIGxhc3QgY2hpbGQgb2YgTGlzdEl0ZW0gdG8gZnVuY3Rpb24gcHJvcGVybHkuXG4gKi9cblxudmFyIExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24ocHJvcHMsIHJlZikge1xuICB2YXIgY2xhc3NlcyA9IHByb3BzLmNsYXNzZXMsXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBvdGhlciA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgW1wiY2xhc3Nlc1wiLCBcImNsYXNzTmFtZVwiXSk7XG5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IGNsc3goY2xhc3Nlcy5yb290LCBjbGFzc05hbWUpLFxuICAgIHJlZjogcmVmXG4gIH0sIG90aGVyKSk7XG59KTtcbnByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gV2FybmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyB8IFRoZXNlIFByb3BUeXBlcyBhcmUgZ2VuZXJhdGVkIGZyb20gdGhlIFR5cGVTY3JpcHQgdHlwZSBkZWZpbml0aW9ucyB8XG4gIC8vIHwgICAgIFRvIHVwZGF0ZSB0aGVtIGVkaXQgdGhlIGQudHMgZmlsZSBhbmQgcnVuIFwieWFybiBwcm9wdHlwZXNcIiAgICAgfFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIFRoZSBjb250ZW50IG9mIHRoZSBjb21wb25lbnQsIG5vcm1hbGx5IGFuIGBJY29uQnV0dG9uYCBvciBzZWxlY3Rpb24gY29udHJvbC5cbiAgICovXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblxuICAvKipcbiAgICogT3ZlcnJpZGUgb3IgZXh0ZW5kIHRoZSBzdHlsZXMgYXBwbGllZCB0byB0aGUgY29tcG9uZW50LlxuICAgKiBTZWUgW0NTUyBBUEldKCNjc3MpIGJlbG93IGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBjbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmdcbn0gOiB2b2lkIDA7XG5MaXN0SXRlbVNlY29uZGFyeUFjdGlvbi5tdWlOYW1lID0gJ0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uJztcbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzLCB7XG4gIG5hbWU6ICdNdWlMaXN0SXRlbVNlY29uZGFyeUFjdGlvbidcbn0pKExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uKTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBSZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cbnZhciBfY3JlYXRlU3ZnSWNvbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvY3JlYXRlU3ZnSWNvblwiKSk7XG5cbnZhciBfZGVmYXVsdCA9ICgwLCBfY3JlYXRlU3ZnSWNvbi5kZWZhdWx0KSggLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgZDogXCJNMTQuNTkgOEwxMiAxMC41OSA5LjQxIDggOCA5LjQxIDEwLjU5IDEyIDggMTQuNTkgOS40MSAxNiAxMiAxMy40MSAxNC41OSAxNiAxNiAxNC41OSAxMy40MSAxMiAxNiA5LjQxIDE0LjU5IDh6TTEyIDJDNi40NyAyIDIgNi40NyAyIDEyczQuNDcgMTAgMTAgMTAgMTAtNC40NyAxMC0xMFMxNy41MyAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4elwiXG59KSwgJ0hpZ2hsaWdodE9mZicpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIyIFN1cmZib2FyZCBIb2xkaW5nIEIuVi4gPGh0dHBzOi8vd3d3LnN0YXJ0cGFnZS5jb20+XG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7Q2hhbmdlRXZlbnQsIEZDLCB1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IEFkZFNpZ24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0FkZFNoYXJwJztcbmltcG9ydCBDbG9zZUljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0Nsb3NlU2hhcnAnO1xuaW1wb3J0IFRleHRGaWVsZCBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9UZXh0RmllbGQnO1xuaW1wb3J0IHtcbiAgICBCdXR0b24sXG4gICAgSW5wdXRBZG9ybm1lbnQsXG4gICAgVHlwb2dyYXBoeSxcbiAgICBEaXZpZGVyLFxuICAgIEJveCxcbiAgICBMaW5rLFxuICAgIExpc3QsXG4gICAgTGlzdEl0ZW0sXG4gICAgTGlzdEl0ZW1UZXh0LFxuICAgIExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uXG59IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlJztcbmltcG9ydCB7dXNlU2VsZWN0b3J9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHtnZXRIb3N0fSBmcm9tICcuLi8uLi8uLi91dGlscy91cmwnO1xuaW1wb3J0IHtnZXRNZXNzYWdlLCBnZXRMYW5ndWFnZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbG9jYWxpemF0aW9uJztcbmltcG9ydCB7b3B0aW9uc1NlbGVjdG9yfSBmcm9tICcuLi8uLi8uLi9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHt1cGRhdGVTZXR0aW5nc30gZnJvbSAnLi4vLi4vLi4vcHJpdmFjeSB0b29scy9vcHRpb25zJztcblxuY29uc3QgRVhUX0xBTkdVQUdFX0NPREUgPSBnZXRMYW5ndWFnZSgpO1xuY29uc3QgU1VQUE9SVF9BUlRJQ0xFID1cbiAgICBFWFRfTEFOR1VBR0VfQ09ERSA9PT0gJ2RlJ1xuICAgICAgICA/ICdodHRwczovL3N1cHBvcnQuc3RhcnRwYWdlLmNvbS9oYy9kZS9hcnRpY2xlcy80NDU1MDc3MDM4MTAwLUthbm4taWNoLWJlc3RpbW10ZS1TZWl0ZW4tb2Rlci1XaWRnZXRzLWFscy12ZXJ0cmF1ZW5zdyVDMyVCQ3JkaWctZWluc3R1ZmVuJ1xuICAgICAgICA6ICdodHRwczovL3N1cHBvcnQuc3RhcnRwYWdlLmNvbS9oYy9lbi11cy9hcnRpY2xlcy80NDU1MDc3MDM4MTAwLUNhbi1JLWFsbG93LWxpc3Qtc2l0ZXMtb3Itd2lkZ2V0cy1JLXRydXN0JztcblxuZXhwb3J0IGNvbnN0IGdldEhvc3RzVG9BZGQgPSAoaG9zdDogc3RyaW5nLCBhbGxvd0xpc3Q6IEFycmF5PHN0cmluZz4gPSBbXSk6IEFycmF5PHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IHJlbW92ZWRXd3cgPSBob3N0LnJlcGxhY2UoJ3d3dy4nLCAnJyk7XG4gICAgY29uc3Qgd2lsZGNhcmRIb3N0ID0gYCouJHtyZW1vdmVkV3d3fWA7XG4gICAgbGV0IGFkZGVkSG9zdHM6IEFycmF5PHN0cmluZz4gPSBbcmVtb3ZlZFd3d107XG4gICAgLyoqXG4gICAgICogc3AtcHJpdmFjeSBzdXBwb3J0cyB3aWxkY2FyZCBob3N0cy5cbiAgICAgKiBhZGQgYm90aCB0aGUgaG9zdCArICouaG9zdCBkb21haW5zIHRvIHRoZSBhbGxvd2xpc3RcbiAgICAgKiBmb3IgdXNlcnMnIGNvbnZlbmllbmNlLlxuICAgICAqICovXG4gICAgaWYgKCFob3N0LnN0YXJ0c1dpdGgoJyouJykgJiYgIWFsbG93TGlzdC5pbmNsdWRlcyh3aWxkY2FyZEhvc3QpKSB7XG4gICAgICAgIGFkZGVkSG9zdHMgPSBbLi4uYWRkZWRIb3N0cywgd2lsZGNhcmRIb3N0XTtcbiAgICB9XG4gICAgcmV0dXJuIGFkZGVkSG9zdHM7XG59O1xuXG5jb25zdCBBbGxvd1NpdGVzOiBGQyA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdXNlU2VsZWN0b3Iob3B0aW9uc1NlbGVjdG9yKTtcbiAgICBjb25zdCBhbGxvd0xpc3QgPSBvcHRpb25zLnNldHRpbmdzLmRpc2FibGVkU2l0ZXM7XG4gICAgY29uc3QgW2FsbG93VXJsLCBzZXRBbGxvd1VybF0gPSB1c2VTdGF0ZSh7dXJsOiAnJywgZXJyb3I6IGZhbHNlLCBlcnJvck1zZzogJyd9KTtcblxuICAgIGNvbnN0IGhhbmRsZUFkZFRvTGlzdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qge3VybH0gPSBhbGxvd1VybDtcbiAgICAgICAgbGV0IGhvc3Q7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBob3N0ID0gZ2V0SG9zdCh1cmwpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHNldEFsbG93VXJsKHsuLi5hbGxvd1VybCwgZXJyb3I6IHRydWUsIGVycm9yTXNnOiBnZXRNZXNzYWdlKCdzZXR0aW5nc0FsbG93bGlzdFRhYlVSTEVycm9yJyl9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFkZGVkSG9zdHMgPSBnZXRIb3N0c1RvQWRkKGhvc3QsIGFsbG93TGlzdCk7XG4gICAgICAgIGNvbnN0IGFsbG93TGlzdEluY2x1ZGVzSG9zdHMgPSBhZGRlZEhvc3RzLmV2ZXJ5KChob3N0U3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhbGxvd0xpc3QuaW5jbHVkZXMoaG9zdFN0cik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBkb24ndCBhZGQgYSBkb21haW4gdGhhdCdzIGFscmVhZHkgaW4gdGhlIGFsbG93bGlzdFxuICAgICAgICBpZiAoYWxsb3dMaXN0SW5jbHVkZXNIb3N0cykge1xuICAgICAgICAgICAgc2V0QWxsb3dVcmwoe3VybDogJycsIGVycm9yOiBmYWxzZSwgZXJyb3JNc2c6ICcnfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlU2V0dGluZ3Moey4uLm9wdGlvbnMuc2V0dGluZ3MsIGRpc2FibGVkU2l0ZXM6IFsuLi5hbGxvd0xpc3QsIC4uLmFkZGVkSG9zdHNdfSk7XG4gICAgICAgIHNldEFsbG93VXJsKHt1cmw6ICcnLCBlcnJvcjogZmFsc2UsIGVycm9yTXNnOiAnJ30pO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVVcmxJbnB1dENoYW5nZSA9IChlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICBzZXRBbGxvd1VybCh7dXJsOiBlLnRhcmdldC52YWx1ZSwgZXJyb3I6IGZhbHNlLCBlcnJvck1zZzogJyd9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlVXJsID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICAgIHVwZGF0ZVNldHRpbmdzKHsuLi5vcHRpb25zLnNldHRpbmdzLCBkaXNhYmxlZFNpdGVzOiBhbGxvd0xpc3QuZmlsdGVyKChzKSA9PiBzICE9PSB1cmwpfSk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxmb3JtXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhbGxvd2VkLXNpdGVzXCJcbiAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDQxcHg7XG4gICAgICAgICAgICBgfVxuICAgICAgICA+XG4gICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDNcIiBjb21wb25lbnQ9XCJoM1wiIHN0eWxlPXt7Y29sb3I6ICcjMjAyOTQ1JywgbWFyZ2luOiAnMCAwIDE2cHggMjRweCd9fT5cbiAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgnc2V0dGluZ3NBbGxvd2xpc3RUYWJUaXRsZScpfVxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGVlMGY3O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiYm9keTFcIiBjb21wb25lbnQ9XCJwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc0FsbG93bGlzdFRhYkRlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICAgICAgICAgIHtgIGB9XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PVwiYm9keTJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17U1VQUE9SVF9BUlRJQ0xFfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzJlMzliMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM2Njc3ZmI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzQWxsb3dsaXN0VGFiTGVhcm5Nb3JlTGluaycpfVxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg0XCIgY29tcG9uZW50PVwiaDRcIiBzdHlsZT17e21hcmdpbkJvdHRvbTogMTZ9fT5cbiAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzQWxsb3dsaXN0VGFiQWxsb3dlZFNpdGVzTGFiZWwnKX1cbiAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVXJsSW5wdXRDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthbGxvd1VybC51cmx9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJhbGxvd0xpc3RVcmxcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17Z2V0TWVzc2FnZSgnc2V0dGluZ3NBbGxvd2xpc3RUYWJFbnRlclVSTExhYmVsJyl9XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgICAgICBlcnJvcj17YWxsb3dVcmwuZXJyb3J9XG4gICAgICAgICAgICAgICAgICAgIGhlbHBlclRleHQ9e2FsbG93VXJsLmVycm9yTXNnfVxuICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwO1xuICAgICAgICAgICAgICAgICAgICAgICAgLk11aU91dGxpbmVkSW5wdXQtcm9vdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249eyhlOiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkVG9MaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIElucHV0UHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZEFkb3JubWVudDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEFkb3JubWVudCBwb3NpdGlvbj1cImVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBZGRUb0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjMmUzOWIzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ZnIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICM2NTczZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmMmYzZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDJweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc0FsbG93bGlzdFRhYkFkZFNpdGVCdG4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFkZFNpZ24gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnB1dEFkb3JubWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAgICAgICAgICB7IWFsbG93TGlzdC5sZW5ndGggJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dCBzdHlsZT17e2JhY2tncm91bmRDb2xvcjogJyNGQkZCRkQnLCBjb2xvcjogJyM3Rjg2OUYnLCBwYWRkaW5nOiAxMn19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc0FsbG93bGlzdFRhYkFkZFNpdGVEZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0SXRlbVRleHQ+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIHthbGxvd0xpc3QubWFwKCh1cmwsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbSBrZXk9e3VybH0gc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6IGkgJSAyID09PSAwID8gJyNGQkZCRkQnIDogJyNGRkYnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dD57dXJsfTwvTGlzdEl0ZW1UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVNlY29uZGFyeUFjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM3Rjg2OUYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6ICcwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZVVybCh1cmwpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kSWNvbj17PENsb3NlSWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9MaXN0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvZm9ybT5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWxsb3dTaXRlcztcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVTdmdJY29uIGZyb20gJy4uLy4uL3V0aWxzL2NyZWF0ZVN2Z0ljb24nO1xuLyoqXG4gKiBAaWdub3JlIC0gaW50ZXJuYWwgY29tcG9uZW50LlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN2Z0ljb24oIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gIGQ6IFwiTTEyIDJDNi40NyAyIDIgNi40NyAyIDEyczQuNDcgMTAgMTAgMTAgMTAtNC40NyAxMC0xMFMxNy41MyAyIDEyIDJ6bTUgMTMuNTlMMTUuNTkgMTcgMTIgMTMuNDEgOC40MSAxNyA3IDE1LjU5IDEwLjU5IDEyIDcgOC40MSA4LjQxIDcgMTIgMTAuNTkgMTUuNTkgNyAxNyA4LjQxIDEzLjQxIDEyIDE3IDE1LjU5elwiXG59KSwgJ0NhbmNlbCcpOyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCBDYW5jZWxJY29uIGZyb20gJy4uL2ludGVybmFsL3N2Zy1pY29ucy9DYW5jZWwnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnLi4vc3R5bGVzL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHsgZW1waGFzaXplLCBhbHBoYSB9IGZyb20gJy4uL3N0eWxlcy9jb2xvck1hbmlwdWxhdG9yJztcbmltcG9ydCB1c2VGb3JrUmVmIGZyb20gJy4uL3V0aWxzL3VzZUZvcmtSZWYnO1xuaW1wb3J0IHVuc3VwcG9ydGVkUHJvcCBmcm9tICcuLi91dGlscy91bnN1cHBvcnRlZFByb3AnO1xuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi4vdXRpbHMvY2FwaXRhbGl6ZSc7XG5pbXBvcnQgQnV0dG9uQmFzZSBmcm9tICcuLi9CdXR0b25CYXNlJztcbmV4cG9ydCB2YXIgc3R5bGVzID0gZnVuY3Rpb24gc3R5bGVzKHRoZW1lKSB7XG4gIHZhciBiYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZS5wYWxldHRlLnR5cGUgPT09ICdsaWdodCcgPyB0aGVtZS5wYWxldHRlLmdyZXlbMzAwXSA6IHRoZW1lLnBhbGV0dGUuZ3JleVs3MDBdO1xuICB2YXIgZGVsZXRlSWNvbkNvbG9yID0gYWxwaGEodGhlbWUucGFsZXR0ZS50ZXh0LnByaW1hcnksIDAuMjYpO1xuICByZXR1cm4ge1xuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQuICovXG4gICAgcm9vdDoge1xuICAgICAgZm9udEZhbWlseTogdGhlbWUudHlwb2dyYXBoeS5mb250RmFtaWx5LFxuICAgICAgZm9udFNpemU6IHRoZW1lLnR5cG9ncmFwaHkucHhUb1JlbSgxMyksXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICBoZWlnaHQ6IDMyLFxuICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUuZ2V0Q29udHJhc3RUZXh0KGJhY2tncm91bmRDb2xvciksXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcixcbiAgICAgIGJvcmRlclJhZGl1czogMzIgLyAyLFxuICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICB0cmFuc2l0aW9uOiB0aGVtZS50cmFuc2l0aW9ucy5jcmVhdGUoWydiYWNrZ3JvdW5kLWNvbG9yJywgJ2JveC1zaGFkb3cnXSksXG4gICAgICAvLyBsYWJlbCB3aWxsIGluaGVyaXQgdGhpcyBmcm9tIHJvb3QsIHRoZW4gYGNsaWNrYWJsZWAgY2xhc3Mgb3ZlcnJpZGVzIHRoaXMgZm9yIGJvdGhcbiAgICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgICAgLy8gV2UgZGlzYWJsZSB0aGUgZm9jdXMgcmluZyBmb3IgbW91c2UsIHRvdWNoIGFuZCBrZXlib2FyZCB1c2Vycy5cbiAgICAgIG91dGxpbmU6IDAsXG4gICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAvLyBSZW1vdmUgYGJ1dHRvbmAgYm9yZGVyXG4gICAgICBwYWRkaW5nOiAwLFxuICAgICAgLy8gUmVtb3ZlIGBidXR0b25gIHBhZGRpbmdcbiAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAnJiRkaXNhYmxlZCc6IHtcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZSdcbiAgICAgIH0sXG4gICAgICAnJiAkYXZhdGFyJzoge1xuICAgICAgICBtYXJnaW5MZWZ0OiA1LFxuICAgICAgICBtYXJnaW5SaWdodDogLTYsXG4gICAgICAgIHdpZHRoOiAyNCxcbiAgICAgICAgaGVpZ2h0OiAyNCxcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUudHlwZSA9PT0gJ2xpZ2h0JyA/IHRoZW1lLnBhbGV0dGUuZ3JleVs3MDBdIDogdGhlbWUucGFsZXR0ZS5ncmV5WzMwMF0sXG4gICAgICAgIGZvbnRTaXplOiB0aGVtZS50eXBvZ3JhcGh5LnB4VG9SZW0oMTIpXG4gICAgICB9LFxuICAgICAgJyYgJGF2YXRhckNvbG9yUHJpbWFyeSc6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5jb250cmFzdFRleHQsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFsZXR0ZS5wcmltYXJ5LmRhcmtcbiAgICAgIH0sXG4gICAgICAnJiAkYXZhdGFyQ29sb3JTZWNvbmRhcnknOiB7XG4gICAgICAgIGNvbG9yOiB0aGVtZS5wYWxldHRlLnNlY29uZGFyeS5jb250cmFzdFRleHQsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFsZXR0ZS5zZWNvbmRhcnkuZGFya1xuICAgICAgfSxcbiAgICAgICcmICRhdmF0YXJTbWFsbCc6IHtcbiAgICAgICAgbWFyZ2luTGVmdDogNCxcbiAgICAgICAgbWFyZ2luUmlnaHQ6IC00LFxuICAgICAgICB3aWR0aDogMTgsXG4gICAgICAgIGhlaWdodDogMTgsXG4gICAgICAgIGZvbnRTaXplOiB0aGVtZS50eXBvZ3JhcGh5LnB4VG9SZW0oMTApXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYHNpemU9XCJzbWFsbFwiYC4gKi9cbiAgICBzaXplU21hbGw6IHtcbiAgICAgIGhlaWdodDogMjRcbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgY29sb3I9XCJwcmltYXJ5XCJgLiAqL1xuICAgIGNvbG9yUHJpbWFyeToge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnkubWFpbixcbiAgICAgIGNvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnkuY29udHJhc3RUZXh0XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYGNvbG9yPVwic2Vjb25kYXJ5XCJgLiAqL1xuICAgIGNvbG9yU2Vjb25kYXJ5OiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUuc2Vjb25kYXJ5Lm1haW4sXG4gICAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5zZWNvbmRhcnkuY29udHJhc3RUZXh0XG4gICAgfSxcblxuICAgIC8qIFBzZXVkby1jbGFzcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYGRpc2FibGVkPXt0cnVlfWAuICovXG4gICAgZGlzYWJsZWQ6IHt9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgb25DbGlja2AgaXMgZGVmaW5lZCBvciBgY2xpY2thYmxlPXt0cnVlfWAuICovXG4gICAgY2xpY2thYmxlOiB7XG4gICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICBXZWJraXRUYXBIaWdobGlnaHRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgJyY6aG92ZXIsICY6Zm9jdXMnOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogZW1waGFzaXplKGJhY2tncm91bmRDb2xvciwgMC4wOClcbiAgICAgIH0sXG4gICAgICAnJjphY3RpdmUnOiB7XG4gICAgICAgIGJveFNoYWRvdzogdGhlbWUuc2hhZG93c1sxXVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmIGBvbkNsaWNrYCBhbmQgYGNvbG9yPVwicHJpbWFyeVwiYCBpcyBkZWZpbmVkIG9yIGBjbGlja2FibGU9e3RydWV9YC4gKi9cbiAgICBjbGlja2FibGVDb2xvclByaW1hcnk6IHtcbiAgICAgICcmOmhvdmVyLCAmOmZvY3VzJzoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGVtcGhhc2l6ZSh0aGVtZS5wYWxldHRlLnByaW1hcnkubWFpbiwgMC4wOClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgb25DbGlja2AgYW5kIGBjb2xvcj1cInNlY29uZGFyeVwiYCBpcyBkZWZpbmVkIG9yIGBjbGlja2FibGU9e3RydWV9YC4gKi9cbiAgICBjbGlja2FibGVDb2xvclNlY29uZGFyeToge1xuICAgICAgJyY6aG92ZXIsICY6Zm9jdXMnOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogZW1waGFzaXplKHRoZW1lLnBhbGV0dGUuc2Vjb25kYXJ5Lm1haW4sIDAuMDgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYG9uRGVsZXRlYCBpcyBkZWZpbmVkLiAqL1xuICAgIGRlbGV0YWJsZToge1xuICAgICAgJyY6Zm9jdXMnOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogZW1waGFzaXplKGJhY2tncm91bmRDb2xvciwgMC4wOClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgb25EZWxldGVgIGFuZCBgY29sb3I9XCJwcmltYXJ5XCJgIGlzIGRlZmluZWQuICovXG4gICAgZGVsZXRhYmxlQ29sb3JQcmltYXJ5OiB7XG4gICAgICAnJjpmb2N1cyc6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBlbXBoYXNpemUodGhlbWUucGFsZXR0ZS5wcmltYXJ5Lm1haW4sIDAuMilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgb25EZWxldGVgIGFuZCBgY29sb3I9XCJzZWNvbmRhcnlcImAgaXMgZGVmaW5lZC4gKi9cbiAgICBkZWxldGFibGVDb2xvclNlY29uZGFyeToge1xuICAgICAgJyY6Zm9jdXMnOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogZW1waGFzaXplKHRoZW1lLnBhbGV0dGUuc2Vjb25kYXJ5Lm1haW4sIDAuMilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgdmFyaWFudD1cIm91dGxpbmVkXCJgLiAqL1xuICAgIG91dGxpbmVkOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIFwiLmNvbmNhdCh0aGVtZS5wYWxldHRlLnR5cGUgPT09ICdsaWdodCcgPyAncmdiYSgwLCAwLCAwLCAwLjIzKScgOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIzKScpLFxuICAgICAgJyRjbGlja2FibGUmOmhvdmVyLCAkY2xpY2thYmxlJjpmb2N1cywgJGRlbGV0YWJsZSY6Zm9jdXMnOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogYWxwaGEodGhlbWUucGFsZXR0ZS50ZXh0LnByaW1hcnksIHRoZW1lLnBhbGV0dGUuYWN0aW9uLmhvdmVyT3BhY2l0eSlcbiAgICAgIH0sXG4gICAgICAnJiAkYXZhdGFyJzoge1xuICAgICAgICBtYXJnaW5MZWZ0OiA0XG4gICAgICB9LFxuICAgICAgJyYgJGF2YXRhclNtYWxsJzoge1xuICAgICAgICBtYXJnaW5MZWZ0OiAyXG4gICAgICB9LFxuICAgICAgJyYgJGljb24nOiB7XG4gICAgICAgIG1hcmdpbkxlZnQ6IDRcbiAgICAgIH0sXG4gICAgICAnJiAkaWNvblNtYWxsJzoge1xuICAgICAgICBtYXJnaW5MZWZ0OiAyXG4gICAgICB9LFxuICAgICAgJyYgJGRlbGV0ZUljb24nOiB7XG4gICAgICAgIG1hcmdpblJpZ2h0OiA1XG4gICAgICB9LFxuICAgICAgJyYgJGRlbGV0ZUljb25TbWFsbCc6IHtcbiAgICAgICAgbWFyZ2luUmlnaHQ6IDNcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgdmFyaWFudD1cIm91dGxpbmVkXCJgIGFuZCBgY29sb3I9XCJwcmltYXJ5XCJgLiAqL1xuICAgIG91dGxpbmVkUHJpbWFyeToge1xuICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5tYWluLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCBcIi5jb25jYXQodGhlbWUucGFsZXR0ZS5wcmltYXJ5Lm1haW4pLFxuICAgICAgJyRjbGlja2FibGUmOmhvdmVyLCAkY2xpY2thYmxlJjpmb2N1cywgJGRlbGV0YWJsZSY6Zm9jdXMnOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogYWxwaGEodGhlbWUucGFsZXR0ZS5wcmltYXJ5Lm1haW4sIHRoZW1lLnBhbGV0dGUuYWN0aW9uLmhvdmVyT3BhY2l0eSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgdmFyaWFudD1cIm91dGxpbmVkXCJgIGFuZCBgY29sb3I9XCJzZWNvbmRhcnlcImAuICovXG4gICAgb3V0bGluZWRTZWNvbmRhcnk6IHtcbiAgICAgIGNvbG9yOiB0aGVtZS5wYWxldHRlLnNlY29uZGFyeS5tYWluLFxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCBcIi5jb25jYXQodGhlbWUucGFsZXR0ZS5zZWNvbmRhcnkubWFpbiksXG4gICAgICAnJGNsaWNrYWJsZSY6aG92ZXIsICRjbGlja2FibGUmOmZvY3VzLCAkZGVsZXRhYmxlJjpmb2N1cyc6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBhbHBoYSh0aGVtZS5wYWxldHRlLnNlY29uZGFyeS5tYWluLCB0aGVtZS5wYWxldHRlLmFjdGlvbi5ob3Zlck9wYWNpdHkpXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBUT0RPIHY1OiByZW1vdmVcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBgYXZhdGFyYCBlbGVtZW50LiAqL1xuICAgIGF2YXRhcjoge30sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgYGF2YXRhcmAgZWxlbWVudCBpZiBgc2l6ZT1cInNtYWxsXCJgLiAqL1xuICAgIGF2YXRhclNtYWxsOiB7fSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBgYXZhdGFyYCBlbGVtZW50IGlmIGBjb2xvcj1cInByaW1hcnlcImAuICovXG4gICAgYXZhdGFyQ29sb3JQcmltYXJ5OiB7fSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBgYXZhdGFyYCBlbGVtZW50IGlmIGBjb2xvcj1cInNlY29uZGFyeVwiYC4gKi9cbiAgICBhdmF0YXJDb2xvclNlY29uZGFyeToge30sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgYGljb25gIGVsZW1lbnQuICovXG4gICAgaWNvbjoge1xuICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUudHlwZSA9PT0gJ2xpZ2h0JyA/IHRoZW1lLnBhbGV0dGUuZ3JleVs3MDBdIDogdGhlbWUucGFsZXR0ZS5ncmV5WzMwMF0sXG4gICAgICBtYXJnaW5MZWZ0OiA1LFxuICAgICAgbWFyZ2luUmlnaHQ6IC02XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBgaWNvbmAgZWxlbWVudCBpZiBgc2l6ZT1cInNtYWxsXCJgLiAqL1xuICAgIGljb25TbWFsbDoge1xuICAgICAgd2lkdGg6IDE4LFxuICAgICAgaGVpZ2h0OiAxOCxcbiAgICAgIG1hcmdpbkxlZnQ6IDQsXG4gICAgICBtYXJnaW5SaWdodDogLTRcbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIGBpY29uYCBlbGVtZW50IGlmIGBjb2xvcj1cInByaW1hcnlcImAuICovXG4gICAgaWNvbkNvbG9yUHJpbWFyeToge1xuICAgICAgY29sb3I6ICdpbmhlcml0J1xuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgYGljb25gIGVsZW1lbnQgaWYgYGNvbG9yPVwic2Vjb25kYXJ5XCJgLiAqL1xuICAgIGljb25Db2xvclNlY29uZGFyeToge1xuICAgICAgY29sb3I6ICdpbmhlcml0J1xuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgbGFiZWwgYHNwYW5gIGVsZW1lbnQuICovXG4gICAgbGFiZWw6IHtcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICAgIHBhZGRpbmdMZWZ0OiAxMixcbiAgICAgIHBhZGRpbmdSaWdodDogMTIsXG4gICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJ1xuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgbGFiZWwgYHNwYW5gIGVsZW1lbnQgaWYgYHNpemU9XCJzbWFsbFwiYC4gKi9cbiAgICBsYWJlbFNtYWxsOiB7XG4gICAgICBwYWRkaW5nTGVmdDogOCxcbiAgICAgIHBhZGRpbmdSaWdodDogOFxuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgYGRlbGV0ZUljb25gIGVsZW1lbnQuICovXG4gICAgZGVsZXRlSWNvbjoge1xuICAgICAgV2Via2l0VGFwSGlnaGxpZ2h0Q29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICBjb2xvcjogZGVsZXRlSWNvbkNvbG9yLFxuICAgICAgaGVpZ2h0OiAyMixcbiAgICAgIHdpZHRoOiAyMixcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgbWFyZ2luOiAnMCA1cHggMCAtNnB4JyxcbiAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICBjb2xvcjogYWxwaGEoZGVsZXRlSWNvbkNvbG9yLCAwLjQpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBgZGVsZXRlSWNvbmAgZWxlbWVudCBpZiBgc2l6ZT1cInNtYWxsXCJgLiAqL1xuICAgIGRlbGV0ZUljb25TbWFsbDoge1xuICAgICAgaGVpZ2h0OiAxNixcbiAgICAgIHdpZHRoOiAxNixcbiAgICAgIG1hcmdpblJpZ2h0OiA0LFxuICAgICAgbWFyZ2luTGVmdDogLTRcbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIGRlbGV0ZUljb24gZWxlbWVudCBpZiBgY29sb3I9XCJwcmltYXJ5XCJgIGFuZCBgdmFyaWFudD1cImRlZmF1bHRcImAuICovXG4gICAgZGVsZXRlSWNvbkNvbG9yUHJpbWFyeToge1xuICAgICAgY29sb3I6IGFscGhhKHRoZW1lLnBhbGV0dGUucHJpbWFyeS5jb250cmFzdFRleHQsIDAuNyksXG4gICAgICAnJjpob3ZlciwgJjphY3RpdmUnOiB7XG4gICAgICAgIGNvbG9yOiB0aGVtZS5wYWxldHRlLnByaW1hcnkuY29udHJhc3RUZXh0XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBkZWxldGVJY29uIGVsZW1lbnQgaWYgYGNvbG9yPVwic2Vjb25kYXJ5XCJgIGFuZCBgdmFyaWFudD1cImRlZmF1bHRcImAuICovXG4gICAgZGVsZXRlSWNvbkNvbG9yU2Vjb25kYXJ5OiB7XG4gICAgICBjb2xvcjogYWxwaGEodGhlbWUucGFsZXR0ZS5zZWNvbmRhcnkuY29udHJhc3RUZXh0LCAwLjcpLFxuICAgICAgJyY6aG92ZXIsICY6YWN0aXZlJzoge1xuICAgICAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5zZWNvbmRhcnkuY29udHJhc3RUZXh0XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBkZWxldGVJY29uIGVsZW1lbnQgaWYgYGNvbG9yPVwicHJpbWFyeVwiYCBhbmQgYHZhcmlhbnQ9XCJvdXRsaW5lZFwiYC4gKi9cbiAgICBkZWxldGVJY29uT3V0bGluZWRDb2xvclByaW1hcnk6IHtcbiAgICAgIGNvbG9yOiBhbHBoYSh0aGVtZS5wYWxldHRlLnByaW1hcnkubWFpbiwgMC43KSxcbiAgICAgICcmOmhvdmVyLCAmOmFjdGl2ZSc6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5tYWluXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBkZWxldGVJY29uIGVsZW1lbnQgaWYgYGNvbG9yPVwic2Vjb25kYXJ5XCJgIGFuZCBgdmFyaWFudD1cIm91dGxpbmVkXCJgLiAqL1xuICAgIGRlbGV0ZUljb25PdXRsaW5lZENvbG9yU2Vjb25kYXJ5OiB7XG4gICAgICBjb2xvcjogYWxwaGEodGhlbWUucGFsZXR0ZS5zZWNvbmRhcnkubWFpbiwgMC43KSxcbiAgICAgICcmOmhvdmVyLCAmOmFjdGl2ZSc6IHtcbiAgICAgICAgY29sb3I6IHRoZW1lLnBhbGV0dGUuc2Vjb25kYXJ5Lm1haW5cbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG5mdW5jdGlvbiBpc0RlbGV0ZUtleWJvYXJkRXZlbnQoa2V5Ym9hcmRFdmVudCkge1xuICByZXR1cm4ga2V5Ym9hcmRFdmVudC5rZXkgPT09ICdCYWNrc3BhY2UnIHx8IGtleWJvYXJkRXZlbnQua2V5ID09PSAnRGVsZXRlJztcbn1cbi8qKlxuICogQ2hpcHMgcmVwcmVzZW50IGNvbXBsZXggZW50aXRpZXMgaW4gc21hbGwgYmxvY2tzLCBzdWNoIGFzIGEgY29udGFjdC5cbiAqL1xuXG5cbnZhciBDaGlwID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gQ2hpcChwcm9wcywgcmVmKSB7XG4gIHZhciBhdmF0YXJQcm9wID0gcHJvcHMuYXZhdGFyLFxuICAgICAgY2xhc3NlcyA9IHByb3BzLmNsYXNzZXMsXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjbGlja2FibGVQcm9wID0gcHJvcHMuY2xpY2thYmxlLFxuICAgICAgX3Byb3BzJGNvbG9yID0gcHJvcHMuY29sb3IsXG4gICAgICBjb2xvciA9IF9wcm9wcyRjb2xvciA9PT0gdm9pZCAwID8gJ2RlZmF1bHQnIDogX3Byb3BzJGNvbG9yLFxuICAgICAgQ29tcG9uZW50UHJvcCA9IHByb3BzLmNvbXBvbmVudCxcbiAgICAgIGRlbGV0ZUljb25Qcm9wID0gcHJvcHMuZGVsZXRlSWNvbixcbiAgICAgIF9wcm9wcyRkaXNhYmxlZCA9IHByb3BzLmRpc2FibGVkLFxuICAgICAgZGlzYWJsZWQgPSBfcHJvcHMkZGlzYWJsZWQgPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGRpc2FibGVkLFxuICAgICAgaWNvblByb3AgPSBwcm9wcy5pY29uLFxuICAgICAgbGFiZWwgPSBwcm9wcy5sYWJlbCxcbiAgICAgIG9uQ2xpY2sgPSBwcm9wcy5vbkNsaWNrLFxuICAgICAgb25EZWxldGUgPSBwcm9wcy5vbkRlbGV0ZSxcbiAgICAgIG9uS2V5RG93biA9IHByb3BzLm9uS2V5RG93bixcbiAgICAgIG9uS2V5VXAgPSBwcm9wcy5vbktleVVwLFxuICAgICAgX3Byb3BzJHNpemUgPSBwcm9wcy5zaXplLFxuICAgICAgc2l6ZSA9IF9wcm9wcyRzaXplID09PSB2b2lkIDAgPyAnbWVkaXVtJyA6IF9wcm9wcyRzaXplLFxuICAgICAgX3Byb3BzJHZhcmlhbnQgPSBwcm9wcy52YXJpYW50LFxuICAgICAgdmFyaWFudCA9IF9wcm9wcyR2YXJpYW50ID09PSB2b2lkIDAgPyAnZGVmYXVsdCcgOiBfcHJvcHMkdmFyaWFudCxcbiAgICAgIG90aGVyID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbXCJhdmF0YXJcIiwgXCJjbGFzc2VzXCIsIFwiY2xhc3NOYW1lXCIsIFwiY2xpY2thYmxlXCIsIFwiY29sb3JcIiwgXCJjb21wb25lbnRcIiwgXCJkZWxldGVJY29uXCIsIFwiZGlzYWJsZWRcIiwgXCJpY29uXCIsIFwibGFiZWxcIiwgXCJvbkNsaWNrXCIsIFwib25EZWxldGVcIiwgXCJvbktleURvd25cIiwgXCJvbktleVVwXCIsIFwic2l6ZVwiLCBcInZhcmlhbnRcIl0pO1xuXG4gIHZhciBjaGlwUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICB2YXIgaGFuZGxlUmVmID0gdXNlRm9ya1JlZihjaGlwUmVmLCByZWYpO1xuXG4gIHZhciBoYW5kbGVEZWxldGVJY29uQ2xpY2sgPSBmdW5jdGlvbiBoYW5kbGVEZWxldGVJY29uQ2xpY2soZXZlbnQpIHtcbiAgICAvLyBTdG9wIHRoZSBldmVudCBmcm9tIGJ1YmJsaW5nIHVwIHRvIHRoZSBgQ2hpcGBcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmIChvbkRlbGV0ZSkge1xuICAgICAgb25EZWxldGUoZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZXZlbnQpIHtcbiAgICAvLyBJZ25vcmUgZXZlbnRzIGZyb20gY2hpbGRyZW4gb2YgYENoaXBgLlxuICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0ID09PSBldmVudC50YXJnZXQgJiYgaXNEZWxldGVLZXlib2FyZEV2ZW50KGV2ZW50KSkge1xuICAgICAgLy8gd2lsbCBiZSBoYW5kbGVkIGluIGtleVVwLCBvdGhlcndpc2Ugc29tZSBicm93c2Vyc1xuICAgICAgLy8gbWlnaHQgaW5pdCBuYXZpZ2F0aW9uXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlmIChvbktleURvd24pIHtcbiAgICAgIG9uS2V5RG93bihldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBoYW5kbGVLZXlVcCA9IGZ1bmN0aW9uIGhhbmRsZUtleVVwKGV2ZW50KSB7XG4gICAgLy8gSWdub3JlIGV2ZW50cyBmcm9tIGNoaWxkcmVuIG9mIGBDaGlwYC5cbiAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldCA9PT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICBpZiAob25EZWxldGUgJiYgaXNEZWxldGVLZXlib2FyZEV2ZW50KGV2ZW50KSkge1xuICAgICAgICBvbkRlbGV0ZShldmVudCk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgJiYgY2hpcFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNoaXBSZWYuY3VycmVudC5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9uS2V5VXApIHtcbiAgICAgIG9uS2V5VXAoZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY2xpY2thYmxlID0gY2xpY2thYmxlUHJvcCAhPT0gZmFsc2UgJiYgb25DbGljayA/IHRydWUgOiBjbGlja2FibGVQcm9wO1xuICB2YXIgc21hbGwgPSBzaXplID09PSAnc21hbGwnO1xuICB2YXIgQ29tcG9uZW50ID0gQ29tcG9uZW50UHJvcCB8fCAoY2xpY2thYmxlID8gQnV0dG9uQmFzZSA6ICdkaXYnKTtcbiAgdmFyIG1vcmVQcm9wcyA9IENvbXBvbmVudCA9PT0gQnV0dG9uQmFzZSA/IHtcbiAgICBjb21wb25lbnQ6ICdkaXYnXG4gIH0gOiB7fTtcbiAgdmFyIGRlbGV0ZUljb24gPSBudWxsO1xuXG4gIGlmIChvbkRlbGV0ZSkge1xuICAgIHZhciBjdXN0b21DbGFzc2VzID0gY2xzeChjb2xvciAhPT0gJ2RlZmF1bHQnICYmICh2YXJpYW50ID09PSBcImRlZmF1bHRcIiA/IGNsYXNzZXNbXCJkZWxldGVJY29uQ29sb3JcIi5jb25jYXQoY2FwaXRhbGl6ZShjb2xvcikpXSA6IGNsYXNzZXNbXCJkZWxldGVJY29uT3V0bGluZWRDb2xvclwiLmNvbmNhdChjYXBpdGFsaXplKGNvbG9yKSldKSwgc21hbGwgJiYgY2xhc3Nlcy5kZWxldGVJY29uU21hbGwpO1xuICAgIGRlbGV0ZUljb24gPSBkZWxldGVJY29uUHJvcCAmJiAvKiNfX1BVUkVfXyovUmVhY3QuaXNWYWxpZEVsZW1lbnQoZGVsZXRlSWNvblByb3ApID8gLyojX19QVVJFX18qL1JlYWN0LmNsb25lRWxlbWVudChkZWxldGVJY29uUHJvcCwge1xuICAgICAgY2xhc3NOYW1lOiBjbHN4KGRlbGV0ZUljb25Qcm9wLnByb3BzLmNsYXNzTmFtZSwgY2xhc3Nlcy5kZWxldGVJY29uLCBjdXN0b21DbGFzc2VzKSxcbiAgICAgIG9uQ2xpY2s6IGhhbmRsZURlbGV0ZUljb25DbGlja1xuICAgIH0pIDogLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQ2FuY2VsSWNvbiwge1xuICAgICAgY2xhc3NOYW1lOiBjbHN4KGNsYXNzZXMuZGVsZXRlSWNvbiwgY3VzdG9tQ2xhc3NlcyksXG4gICAgICBvbkNsaWNrOiBoYW5kbGVEZWxldGVJY29uQ2xpY2tcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBhdmF0YXIgPSBudWxsO1xuXG4gIGlmIChhdmF0YXJQcm9wICYmIC8qI19fUFVSRV9fKi9SZWFjdC5pc1ZhbGlkRWxlbWVudChhdmF0YXJQcm9wKSkge1xuICAgIGF2YXRhciA9IC8qI19fUFVSRV9fKi9SZWFjdC5jbG9uZUVsZW1lbnQoYXZhdGFyUHJvcCwge1xuICAgICAgY2xhc3NOYW1lOiBjbHN4KGNsYXNzZXMuYXZhdGFyLCBhdmF0YXJQcm9wLnByb3BzLmNsYXNzTmFtZSwgc21hbGwgJiYgY2xhc3Nlcy5hdmF0YXJTbWFsbCwgY29sb3IgIT09ICdkZWZhdWx0JyAmJiBjbGFzc2VzW1wiYXZhdGFyQ29sb3JcIi5jb25jYXQoY2FwaXRhbGl6ZShjb2xvcikpXSlcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBpY29uID0gbnVsbDtcblxuICBpZiAoaWNvblByb3AgJiYgLyojX19QVVJFX18qL1JlYWN0LmlzVmFsaWRFbGVtZW50KGljb25Qcm9wKSkge1xuICAgIGljb24gPSAvKiNfX1BVUkVfXyovUmVhY3QuY2xvbmVFbGVtZW50KGljb25Qcm9wLCB7XG4gICAgICBjbGFzc05hbWU6IGNsc3goY2xhc3Nlcy5pY29uLCBpY29uUHJvcC5wcm9wcy5jbGFzc05hbWUsIHNtYWxsICYmIGNsYXNzZXMuaWNvblNtYWxsLCBjb2xvciAhPT0gJ2RlZmF1bHQnICYmIGNsYXNzZXNbXCJpY29uQ29sb3JcIi5jb25jYXQoY2FwaXRhbGl6ZShjb2xvcikpXSlcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGF2YXRhciAmJiBpY29uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdNYXRlcmlhbC1VSTogVGhlIENoaXAgY29tcG9uZW50IGNhbiBub3QgaGFuZGxlIHRoZSBhdmF0YXIgJyArICdhbmQgdGhlIGljb24gcHJvcCBhdCB0aGUgc2FtZSB0aW1lLiBQaWNrIG9uZS4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7XG4gICAgcm9sZTogY2xpY2thYmxlIHx8IG9uRGVsZXRlID8gJ2J1dHRvbicgOiB1bmRlZmluZWQsXG4gICAgY2xhc3NOYW1lOiBjbHN4KGNsYXNzZXMucm9vdCwgY2xhc3NOYW1lLCBjb2xvciAhPT0gJ2RlZmF1bHQnICYmIFtjbGFzc2VzW1wiY29sb3JcIi5jb25jYXQoY2FwaXRhbGl6ZShjb2xvcikpXSwgY2xpY2thYmxlICYmIGNsYXNzZXNbXCJjbGlja2FibGVDb2xvclwiLmNvbmNhdChjYXBpdGFsaXplKGNvbG9yKSldLCBvbkRlbGV0ZSAmJiBjbGFzc2VzW1wiZGVsZXRhYmxlQ29sb3JcIi5jb25jYXQoY2FwaXRhbGl6ZShjb2xvcikpXV0sIHZhcmlhbnQgIT09IFwiZGVmYXVsdFwiICYmIFtjbGFzc2VzLm91dGxpbmVkLCB7XG4gICAgICAncHJpbWFyeSc6IGNsYXNzZXMub3V0bGluZWRQcmltYXJ5LFxuICAgICAgJ3NlY29uZGFyeSc6IGNsYXNzZXMub3V0bGluZWRTZWNvbmRhcnlcbiAgICB9W2NvbG9yXV0sIGRpc2FibGVkICYmIGNsYXNzZXMuZGlzYWJsZWQsIHNtYWxsICYmIGNsYXNzZXMuc2l6ZVNtYWxsLCBjbGlja2FibGUgJiYgY2xhc3Nlcy5jbGlja2FibGUsIG9uRGVsZXRlICYmIGNsYXNzZXMuZGVsZXRhYmxlKSxcbiAgICBcImFyaWEtZGlzYWJsZWRcIjogZGlzYWJsZWQgPyB0cnVlIDogdW5kZWZpbmVkLFxuICAgIHRhYkluZGV4OiBjbGlja2FibGUgfHwgb25EZWxldGUgPyAwIDogdW5kZWZpbmVkLFxuICAgIG9uQ2xpY2s6IG9uQ2xpY2ssXG4gICAgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duLFxuICAgIG9uS2V5VXA6IGhhbmRsZUtleVVwLFxuICAgIHJlZjogaGFuZGxlUmVmXG4gIH0sIG1vcmVQcm9wcywgb3RoZXIpLCBhdmF0YXIgfHwgaWNvbiwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtcbiAgICBjbGFzc05hbWU6IGNsc3goY2xhc3Nlcy5sYWJlbCwgc21hbGwgJiYgY2xhc3Nlcy5sYWJlbFNtYWxsKVxuICB9LCBsYWJlbCksIGRlbGV0ZUljb24pO1xufSk7XG5wcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBDaGlwLnByb3BUeXBlcyA9IHtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gV2FybmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyB8IFRoZXNlIFByb3BUeXBlcyBhcmUgZ2VuZXJhdGVkIGZyb20gdGhlIFR5cGVTY3JpcHQgdHlwZSBkZWZpbml0aW9ucyB8XG4gIC8vIHwgICAgIFRvIHVwZGF0ZSB0aGVtIGVkaXQgdGhlIGQudHMgZmlsZSBhbmQgcnVuIFwieWFybiBwcm9wdHlwZXNcIiAgICAgfFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIEF2YXRhciBlbGVtZW50LlxuICAgKi9cbiAgYXZhdGFyOiBQcm9wVHlwZXMuZWxlbWVudCxcblxuICAvKipcbiAgICogVGhpcyBwcm9wIGlzbid0IHN1cHBvcnRlZC5cbiAgICogVXNlIHRoZSBgY29tcG9uZW50YCBwcm9wIGlmIHlvdSBuZWVkIHRvIGNoYW5nZSB0aGUgY2hpbGRyZW4gc3RydWN0dXJlLlxuICAgKi9cbiAgY2hpbGRyZW46IHVuc3VwcG9ydGVkUHJvcCxcblxuICAvKipcbiAgICogT3ZlcnJpZGUgb3IgZXh0ZW5kIHRoZSBzdHlsZXMgYXBwbGllZCB0byB0aGUgY29tcG9uZW50LlxuICAgKiBTZWUgW0NTUyBBUEldKCNjc3MpIGJlbG93IGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICBjbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGNoaXAgd2lsbCBhcHBlYXIgY2xpY2thYmxlLCBhbmQgd2lsbCByYWlzZSB3aGVuIHByZXNzZWQsXG4gICAqIGV2ZW4gaWYgdGhlIG9uQ2xpY2sgcHJvcCBpcyBub3QgZGVmaW5lZC5cbiAgICogSWYgZmFsc2UsIHRoZSBjaGlwIHdpbGwgbm90IGJlIGNsaWNrYWJsZSwgZXZlbiBpZiBvbkNsaWNrIHByb3AgaXMgZGVmaW5lZC5cbiAgICogVGhpcyBjYW4gYmUgdXNlZCwgZm9yIGV4YW1wbGUsXG4gICAqIGFsb25nIHdpdGggdGhlIGNvbXBvbmVudCBwcm9wIHRvIGluZGljYXRlIGFuIGFuY2hvciBDaGlwIGlzIGNsaWNrYWJsZS5cbiAgICovXG4gIGNsaWNrYWJsZTogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIFRoZSBjb2xvciBvZiB0aGUgY29tcG9uZW50LiBJdCBzdXBwb3J0cyB0aG9zZSB0aGVtZSBjb2xvcnMgdGhhdCBtYWtlIHNlbnNlIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIGNvbG9yOiBQcm9wVHlwZXMub25lT2YoWydkZWZhdWx0JywgJ3ByaW1hcnknLCAnc2Vjb25kYXJ5J10pLFxuXG4gIC8qKlxuICAgKiBUaGUgY29tcG9uZW50IHVzZWQgZm9yIHRoZSByb290IG5vZGUuXG4gICAqIEVpdGhlciBhIHN0cmluZyB0byB1c2UgYSBIVE1MIGVsZW1lbnQgb3IgYSBjb21wb25lbnQuXG4gICAqL1xuICBjb21wb25lbnQ6IFByb3BUeXBlc1xuICAvKiBAdHlwZXNjcmlwdC10by1wcm9wdHlwZXMtaWdub3JlICovXG4gIC5lbGVtZW50VHlwZSxcblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgZGVsZXRlIGljb24gZWxlbWVudC4gU2hvd24gb25seSBpZiBgb25EZWxldGVgIGlzIHNldC5cbiAgICovXG4gIGRlbGV0ZUljb246IFByb3BUeXBlcy5lbGVtZW50LFxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBjaGlwIHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gYSBkaXNhYmxlZCBzdGF0ZS5cbiAgICovXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogSWNvbiBlbGVtZW50LlxuICAgKi9cbiAgaWNvbjogUHJvcFR5cGVzLmVsZW1lbnQsXG5cbiAgLyoqXG4gICAqIFRoZSBjb250ZW50IG9mIHRoZSBsYWJlbC5cbiAgICovXG4gIGxhYmVsOiBQcm9wVHlwZXMubm9kZSxcblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uIGZpcmVkIHdoZW4gdGhlIGRlbGV0ZSBpY29uIGlzIGNsaWNrZWQuXG4gICAqIElmIHNldCwgdGhlIGRlbGV0ZSBpY29uIHdpbGwgYmUgc2hvd24uXG4gICAqL1xuICBvbkRlbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIG9uS2V5VXA6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgY2hpcC5cbiAgICovXG4gIHNpemU6IFByb3BUeXBlcy5vbmVPZihbJ21lZGl1bScsICdzbWFsbCddKSxcblxuICAvKipcbiAgICogVGhlIHZhcmlhbnQgdG8gdXNlLlxuICAgKi9cbiAgdmFyaWFudDogUHJvcFR5cGVzLm9uZU9mKFsnZGVmYXVsdCcsICdvdXRsaW5lZCddKVxufSA6IHZvaWQgMDtcbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzLCB7XG4gIG5hbWU6ICdNdWlDaGlwJ1xufSkoQ2hpcCk7IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBSZWFjdCwge0NoYW5nZUV2ZW50LCBGQ30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBCdXR0b24sXG4gICAgVHlwb2dyYXBoeSxcbiAgICBEaXZpZGVyLFxuICAgIEJveCxcbiAgICBMaXN0LFxuICAgIExpc3RJdGVtLFxuICAgIExpc3RJdGVtVGV4dCxcbiAgICBMaXN0SXRlbVNlY29uZGFyeUFjdGlvbixcbiAgICBTZWxlY3QsXG4gICAgTWVudUl0ZW0sXG4gICAgQ2hpcCxcbiAgICBJbnB1dExhYmVsLFxuICAgIEZvcm1Db250cm9sXG59IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlJztcbmltcG9ydCBDbG9zZUljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0Nsb3NlU2hhcnAnO1xuaW1wb3J0IEhpZ2hsaWdodE9mZkljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0hpZ2hsaWdodE9mZic7XG5pbXBvcnQge3VzZVNlbGVjdG9yfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7Z2V0TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbG9jYWxpemF0aW9uJztcbmltcG9ydCB7b3B0aW9uc1NlbGVjdG9yfSBmcm9tICcuLi8uLi8uLi9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IFRvZ2dsZSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vY29tcG9uZW50cy9Ub2dnbGUnO1xuaW1wb3J0IHt1cGRhdGVTZXR0aW5nc30gZnJvbSAnLi4vLi4vLi4vcHJpdmFjeSB0b29scy9vcHRpb25zJztcblxuY29uc3QgQWxsb3dXaWRnZXRzOiBGQyA9ICgpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0gdXNlU2VsZWN0b3Iob3B0aW9uc1NlbGVjdG9yKTtcbiAgICBjb25zdCBlbmFibGVXaWRnZXQgPSBvcHRpb25zLnNldHRpbmdzLnNvY2lhbFdpZGdldFJlcGxhY2VtZW50RW5hYmxlZDtcbiAgICBjb25zdCBhbGxXaWRnZXRzID0gb3B0aW9ucy53aWRnZXRzO1xuICAgIGNvbnN0IHdpZGdldEFsbG93bGlzdCA9IG9wdGlvbnMuc2V0dGluZ3Mud2lkZ2V0UmVwbGFjZW1lbnRFeGNlcHRpb25zO1xuXG4gICAgY29uc3Qgd2lkZ2V0U2l0ZUFsbG93bGlzdCA9IE9iamVjdC5lbnRyaWVzKG9wdGlvbnMuc2V0dGluZ3Mud2lkZ2V0U2l0ZUFsbG93bGlzdCkubWFwKChbc2l0ZV0pID0+IHNpdGUpO1xuXG4gICAgY29uc3QgaGFuZGxlU2VsZWN0V2lkZ2V0ID0gKGU6IENoYW5nZUV2ZW50PHt2YWx1ZTogdW5rbm93bn0+KSA9PiB7XG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSBlLnRhcmdldDtcblxuICAgICAgICAvLyBEb24ndCBhZGQgdG8gYWxsb3cgd2lkZ2V0IGxpc3QgaWYgaXQncyBhbHJlYWR5IGFkZGVkLlxuICAgICAgICBpZiAoIXdpZGdldEFsbG93bGlzdC5pbmNsdWRlcyh2YWx1ZSBhcyBzdHJpbmcpKSB7XG4gICAgICAgICAgICB1cGRhdGVTZXR0aW5ncyh7XG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5zZXR0aW5ncyxcbiAgICAgICAgICAgICAgICB3aWRnZXRSZXBsYWNlbWVudEV4Y2VwdGlvbnM6IFsuLi5vcHRpb25zLnNldHRpbmdzLndpZGdldFJlcGxhY2VtZW50RXhjZXB0aW9ucywgdmFsdWUgYXMgc3RyaW5nXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlV2lkZ2V0ID0gKHdpZGdldDogc3RyaW5nKSA9PiB7XG4gICAgICAgIHVwZGF0ZVNldHRpbmdzKHsuLi5vcHRpb25zLnNldHRpbmdzLCB3aWRnZXRSZXBsYWNlbWVudEV4Y2VwdGlvbnM6IHdpZGdldEFsbG93bGlzdC5maWx0ZXIoKHcpID0+IHcgIT09IHdpZGdldCl9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlU2l0ZSA9ICh1cmw6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB1cGRhdGVkV2lkZ2V0U2l0ZUFsbG93bGlzdCA9IHsuLi5vcHRpb25zLnNldHRpbmdzLndpZGdldFNpdGVBbGxvd2xpc3R9O1xuXG4gICAgICAgIGRlbGV0ZSB1cGRhdGVkV2lkZ2V0U2l0ZUFsbG93bGlzdFt1cmxdO1xuXG4gICAgICAgIHVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnMuc2V0dGluZ3MsXG4gICAgICAgICAgICB3aWRnZXRTaXRlQWxsb3dsaXN0OiB1cGRhdGVkV2lkZ2V0U2l0ZUFsbG93bGlzdFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiYWxsb3dlZC13aWRnZXRzXCI+XG4gICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDNcIiBjb21wb25lbnQ9XCJoM1wiIHN0eWxlPXt7Y29sb3I6ICcjMjAyOTQ1JywgbWFyZ2luOiAnMCAwIDE2cHggMjRweCd9fT5cbiAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgnc2V0dGluZ3NBbGxvd2xpc3RUYWJXaWRnZXRUaXRsZScpfVxuICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGVlMGY3O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiYm9keTFcIiBjb21wb25lbnQ9XCJwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc0FsbG93bGlzdFRhYldpZGdldERlc2NyaXB0aW9uJyl9XG4gICAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg0XCIgY29tcG9uZW50PVwiaDRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc0FsbG93bGlzdFRhYldpZGdldEVuYWJsZUxhYmVsJyl9XG4gICAgICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICAgICAgPFRvZ2dsZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ3aWRnZXRibG9jay10b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsyNH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXs0MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhleENvbG9yPVwiIzI0QzVCNlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtlbmFibGVXaWRnZXR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNldHRpbmdzKHsuLi5vcHRpb25zLnNldHRpbmdzLCBzb2NpYWxXaWRnZXRSZXBsYWNlbWVudEVuYWJsZWQ6ICFlbmFibGVXaWRnZXR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge2VuYWJsZVdpZGdldCA/IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDRcIiBjb21wb25lbnQ9XCJoNFwiIHN0eWxlPXt7bWFyZ2luQm90dG9tOiAxNn19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc0FsbG93bGlzdFRhYkFsbG93ZWRXaWRnZXRzTGFiZWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCB2YXJpYW50PVwib3V0bGluZWRcIiBmdWxsV2lkdGggc2l6ZT1cInNtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0TGFiZWwgaHRtbEZvcj1cImFkZC13aWRnZXQtdG8tYWxsb3ctbGlzdC1zZWxlY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzQWxsb3dsaXN0VGFiQWRkV2lkZ2V0TGFiZWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0lucHV0TGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2JveFNoYWRvdzogJ25vbmUnfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVNlbGVjdFdpZGdldH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxJZD1cImFkZC13aWRnZXQtdG8tYWxsb3ctbGlzdC1zZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkFkZCB3aWRnZXQgdG8geW91ciBhbGxvd2xpc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImFkZC13aWRnZXQtdG8tYWxsb3ctbGlzdC1zZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbFdpZGdldHMubGVuZ3RoID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsV2lkZ2V0cy5tYXAoKHdpZGdldCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3dpZGdldH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3dpZGdldH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogd2lkZ2V0QWxsb3dsaXN0LmluY2x1ZGVzKHdpZGdldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdyZ2JhKDAsIDAsIDAsIDAuMDgpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dpZGdldH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHQgc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6ICcjRkJGQkZEJywgY29sb3I6ICcjN0Y4NjlGJywgcGFkZGluZzogMTJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaWRnZXRzIHdpbGwgYXBwZWFyIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogNXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3dpZGdldEFsbG93bGlzdC5sZW5ndGggPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldEFsbG93bGlzdC5tYXAoKHVybCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt1cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoaXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e3VybH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzIwMkM0NicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0YyRjNGRicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXsoKSA9PiBoYW5kbGVSZW1vdmVXaWRnZXQodXJsKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlSWNvbj17PENsb3NlSWNvbiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1UZXh0IHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOiAnI0ZCRkJGRCcsIGNvbG9yOiAnIzdGODY5RicsIHBhZGRpbmc6IDEyfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgnc2V0dGluZ3NBbGxvd2xpc3RUYWJXaWRnZXRDYWxsb3V0Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPERpdmlkZXIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNFwiIGNvbXBvbmVudD1cImg0XCIgc3R5bGU9e3ttYXJnaW5Cb3R0b206IDE2fX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzQWxsb3dsaXN0VGFiU2l0ZVdpZGdldHNMYWJlbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPExpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3dpZGdldFNpdGVBbGxvd2xpc3QubGVuZ3RoID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRTaXRlQWxsb3dsaXN0Lm1hcCgodXJsLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW0ga2V5PXt1cmx9IHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOiBpICUgMiA9PT0gMCA/ICcjRkJGQkZEJyA6ICcjRkZGJ319PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVRleHQ+e3VybH08L0xpc3RJdGVtVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7Y29sb3I6ICcjN0Y4NjlGJywgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZVNpdGUodXJsKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZEljb249ezxIaWdobGlnaHRPZmZJY29uIC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgnc2V0dGluZ3NBbGxvd2xpc3RUYWJSZW1vdmVCdG4nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0SXRlbVNlY29uZGFyeUFjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dCBzdHlsZT17e2JhY2tncm91bmRDb2xvcjogJyNGQkZCRkQnLCBjb2xvcjogJyM3Rjg2OUYnLCBwYWRkaW5nOiAxMn19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzQWxsb3dsaXN0VGFiU2l0ZVdpZGdldExpc3RMYWJlbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3RJdGVtVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0PlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L2Zvcm0+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFsbG93V2lkZ2V0cztcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjIgU3VyZmJvYXJkIEhvbGRpbmcgQi5WLiA8aHR0cHM6Ly93d3cuc3RhcnRwYWdlLmNvbT5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHtGQ30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjc3N9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IEFsbG93U2l0ZXMgZnJvbSAnLi9BbGxvd2VkU2l0ZXMnO1xuaW1wb3J0IEFsbG93V2lkZ2V0cyBmcm9tICcuL0FsbG93ZWRXaWRnZXRzJztcblxuY29uc3QgQWxsb3dMaXN0VGFiOiBGQyA9ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogNzhweDtcbiAgICAgICAgICAgIGB9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxBbGxvd1NpdGVzIC8+XG4gICAgICAgICAgICA8QWxsb3dXaWRnZXRzIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBbGxvd0xpc3RUYWI7XG4iXSwic291cmNlUm9vdCI6IiJ9