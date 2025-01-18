(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

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

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(164);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(590);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(582);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(584);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(559);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(387);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(560);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(557);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(94);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2);
/* harmony import */ var _utils_localization__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(19);
/* harmony import */ var _selectors_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(163);
/* harmony import */ var _common_components_Toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(404);
/* harmony import */ var _privacy_tools_options__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(158);

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










var _ref =  true ? {
  name: "33pg5e-PrivacyTab",
  styles: "border:1px solid #dee0f7;border-radius:4px;padding:24px;;label:PrivacyTab;"
} : undefined;
var PrivacyTab = () => {
  var options = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__[/* useSelector */ "c"])(_selectors_index__WEBPACK_IMPORTED_MODULE_12__[/* optionsSelector */ "b"]);
  var dntEnabled = options.settings.checkForDNTPolicy && options.settings.sendDNTSignal;
  var hyperlinkDisabled = options.settings.disableHyperlinkAuditing;
  var networkPredictionDisabled = options.settings.disableNetworkPrediction;
  var toggleColor = '#24C5B6';
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    css: _ref,
    style: {
      borderRadius: 4,
      padding: 24
    }
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    style: {
      padding: 0
    }
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    id: "gpc",
    primary: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      variant: "h4",
      style: {
        marginBottom: 12
      }
    }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_11__[/* getMessage */ "b"])('settingsPrivacyTabDNTLabel')),
    secondary: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      variant: "h6",
      color: "textPrimary"
    }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_11__[/* getMessage */ "b"])('settingsPrivacyTabDNTDescription'))
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_common_components_Toggle__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    id: "dnt-toggle",
    height: 24,
    width: 40,
    hexColor: toggleColor,
    checked: dntEnabled,
    onChange: () => {
      Object(_privacy_tools_options__WEBPACK_IMPORTED_MODULE_14__[/* updateSettings */ "c"])(_objectSpread(_objectSpread({}, options.settings), {}, {
        checkForDNTPolicy: !dntEnabled,
        sendDNTSignal: !dntEnabled
      }));
    }
  }))), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    style: {
      padding: 0
    }
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    id: "hyperlink-auditing",
    primary: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      variant: "h4",
      style: {
        marginBottom: 12
      }
    }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_11__[/* getMessage */ "b"])('settingsPrivacyTabHyperlinkLabel')),
    secondary: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      variant: "h6",
      color: "textPrimary"
    }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_11__[/* getMessage */ "b"])('settingsPrivacyTabHyperlinkDescription'))
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_common_components_Toggle__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    id: "hyperlink-toggle",
    height: 24,
    width: 40,
    hexColor: toggleColor,
    checked: hyperlinkDisabled,
    onChange: () => {
      Object(_privacy_tools_options__WEBPACK_IMPORTED_MODULE_14__[/* updateSettings */ "c"])(_objectSpread(_objectSpread({}, options.settings), {}, {
        disableHyperlinkAuditing: !hyperlinkDisabled
      }));
    }
  }), ' ')), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], null), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    style: {
      padding: 0
    }
  }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    id: "prefetching",
    primary: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      variant: "h4",
      style: {
        marginBottom: 12
      }
    }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_11__[/* getMessage */ "b"])('settingsPrivacyTabPrefetchLabel')),
    secondary: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      variant: "h6",
      color: "textPrimary"
    }, Object(_utils_localization__WEBPACK_IMPORTED_MODULE_11__[/* getMessage */ "b"])('settingsPrivacyTabPrefetchDescription'))
  }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_10__[/* jsx */ "c"])(_common_components_Toggle__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    id: "prefetch-toggle",
    height: 24,
    width: 40,
    hexColor: toggleColor,
    checked: networkPredictionDisabled,
    onChange: () => {
      Object(_privacy_tools_options__WEBPACK_IMPORTED_MODULE_14__[/* updateSettings */ "c"])(_objectSpread(_objectSpread({}, options.settings), {}, {
        disableNetworkPrediction: !networkPredictionDisabled
      }));
    }
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (PrivacyTab);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbXBvbmVudHMvVG9nZ2xlLnRzeCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL2NvcmUvZXNtL0RpdmlkZXIvRGl2aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL2NvcmUvZXNtL0xpc3RJdGVtVGV4dC9MaXN0SXRlbVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9jb3JlL2VzbS9MaXN0SXRlbVNlY29uZGFyeUFjdGlvbi9MaXN0SXRlbVNlY29uZGFyeUFjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJpdmFjeS1zZWFyY2gvY29tcG9uZW50cy9PcHRpb25zL1ByaXZhY3lUYWIudHN4Il0sIm5hbWVzIjpbIlRvZ2dsZSIsIl9yZWYiLCJpZCIsImhlaWdodCIsIndpZHRoIiwiaGV4Q29sb3IiLCJjaGVja2VkIiwiYW5pbWF0ZSIsIm9uQ2hhbmdlIiwic2xpZGVyRGlhbWV0ZXIiLCJ0b2dnbGVDc3MiLCJjc3MiLCJwcm9jZXNzIiwiX19fRW1vdGlvbkpTWCIsImNsYXNzTmFtZSIsImh0bWxGb3IiLCJ0eXBlIiwiZXZlbnQiLCJuYW1lIiwic3R5bGVzIiwiUHJpdmFjeVRhYiIsIm9wdGlvbnMiLCJ1c2VTZWxlY3RvciIsIm9wdGlvbnNTZWxlY3RvciIsImRudEVuYWJsZWQiLCJzZXR0aW5ncyIsImNoZWNrRm9yRE5UUG9saWN5Iiwic2VuZEROVFNpZ25hbCIsImh5cGVybGlua0Rpc2FibGVkIiwiZGlzYWJsZUh5cGVybGlua0F1ZGl0aW5nIiwibmV0d29ya1ByZWRpY3Rpb25EaXNhYmxlZCIsImRpc2FibGVOZXR3b3JrUHJlZGljdGlvbiIsInRvZ2dsZUNvbG9yIiwiQm94Iiwic3R5bGUiLCJib3JkZXJSYWRpdXMiLCJwYWRkaW5nIiwiTGlzdCIsIkxpc3RJdGVtIiwiTGlzdEl0ZW1UZXh0IiwicHJpbWFyeSIsIlR5cG9ncmFwaHkiLCJ2YXJpYW50IiwibWFyZ2luQm90dG9tIiwiZ2V0TWVzc2FnZSIsInNlY29uZGFyeSIsImNvbG9yIiwiTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24iLCJ1cGRhdGVTZXR0aW5ncyIsIl9vYmplY3RTcHJlYWQiLCJEaXZpZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZ0M7QUFDRTtBQUFBO0FBWWxDLElBQU1BLE1BQXVCLEdBQUdDLElBQUEsSUFBOEU7RUFBQSxJQUE3RTtJQUFDQyxFQUFFO0lBQUVDLE1BQU07SUFBRUMsS0FBSztJQUFFQyxRQUFRO0lBQUVDLE9BQU8sR0FBRyxLQUFLO0lBQUVDLE9BQU8sR0FBRyxJQUFJO0lBQUVDLFFBQVEsRUFBUkE7RUFBUSxDQUFDLEdBQUFQLElBQUE7RUFDckcsSUFBTVEsY0FBYyxHQUFHTixNQUFNLEdBQUcsSUFBSTtFQUVwQyxJQUFNTyxTQUFTLGdCQUFHQyxpRUFBRywyREFJSFIsTUFBTSxlQUNQQyxLQUFLLG1HQVdHRCxNQUFNLGtEQUtyQkksT0FBTyxJQUFJLG1CQUFtQixnREFJWkYsUUFBUSw4REFLWEksY0FBYyxrRUFHckJBLGNBQWMscUJBQ1RBLGNBQWMsc0NBRXBCQSxjQUFjLFNBRXJCRixPQUFPLElBQUksbUJBQW1CLG9GQUtSSCxLQUFLLEdBQUdELE1BQU0sOEJBQUFTLEtBQUEsbUJBRTdDO0VBRUQsT0FDSUMsaUVBQUE7SUFBS0YsR0FBRyxFQUFFRDtFQUFVLEdBQ2hCRyxpRUFBQTtJQUFPQyxTQUFTLEVBQUMsUUFBUTtJQUFDQyxPQUFPLEVBQUViO0VBQUcsR0FDbENXLGlFQUFBO0lBQ0lYLEVBQUUsRUFBRUEsRUFBRztJQUNQYyxJQUFJLEVBQUMsVUFBVTtJQUNmVixPQUFPLEVBQUVBO0lBQ1Q7SUFBQTtJQUNBRSxRQUFRLEVBQUdTLEtB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O0lBQ3RCMUIsT0FBTyxFQUFFd0IseUJBQTBCO0lBQ25DdEIsUUFBUSxFQUFFQSxDQUFBLEtBQU07TUFDWndDLHNGQUFjLENBQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUNQNUIsT0FBTyxDQUFDSSxRQUFRO1FBQ25CTSx3QkFBd0IsRUFBRSxDQUFDRDtNQUF5QixHQUN0RDtJQUNOO0VBQUUsRUFDSixDQUNvQixDQUNuQixDQUNSLENBQ0w7QUFFZCxDQUFDO0FBRWNWLHlFQUFVLEUiLCJmaWxlIjoiMTMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIyIFN1cmZib2FyZCBIb2xkaW5nIEIuVi4gPGh0dHBzOi8vd3d3LnN0YXJ0cGFnZS5jb20+XG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7RkN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcblxudHlwZSBUb2dnbGVQcm9wcyA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGV4Q29sb3I6IHN0cmluZztcbiAgICBjaGVja2VkPzogYm9vbGVhbjtcbiAgICBhbmltYXRlPzogYm9vbGVhbjtcbiAgICBvbkNoYW5nZT86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBUb2dnbGU6IEZDPFRvZ2dsZVByb3BzPiA9ICh7aWQsIGhlaWdodCwgd2lkdGgsIGhleENvbG9yLCBjaGVja2VkID0gZmFsc2UsIGFuaW1hdGUgPSB0cnVlLCBvbkNoYW5nZX0pID0+IHtcbiAgICBjb25zdCBzbGlkZXJEaWFtZXRlciA9IGhlaWdodCAqIDAuNzU7XG5cbiAgICBjb25zdCB0b2dnbGVDc3MgPSBjc3NgXG4gICAgICAgIC5zd2l0Y2gge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgaGVpZ2h0OiAke2hlaWdodH1weDtcbiAgICAgICAgICAgIHdpZHRoOiAke3dpZHRofXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnN3aXRjaCBpbnB1dCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2xpZGVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjZWQxZGQ7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAke2hlaWdodH1weDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGluc2V0OiAwO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuXG4gICAgICAgICAgICAke2FuaW1hdGUgJiYgJ3RyYW5zaXRpb246IDAuNHM7J31cbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0OmNoZWNrZWQgKyAuc2xpZGVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7aGV4Q29sb3J9O1xuICAgICAgICB9XG5cbiAgICAgICAgLnNsaWRlcjpiZWZvcmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ViZWNmNztcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6ICR7c2xpZGVyRGlhbWV0ZXJ9cHg7XG4gICAgICAgICAgICBib3gtc2hhZG93OiAxcHggMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgICAgIGhlaWdodDogJHtzbGlkZXJEaWFtZXRlcn1weDtcbiAgICAgICAgICAgIG1hcmdpbjogY2FsYygke3NsaWRlckRpYW1ldGVyfXB4IC8gNik7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB3aWR0aDogJHtzbGlkZXJEaWFtZXRlcn1weDtcblxuICAgICAgICAgICAgJHthbmltYXRlICYmICd0cmFuc2l0aW9uOiAwLjRzOyd9XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dDpjaGVja2VkICsgLnNsaWRlcjpiZWZvcmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke3dpZHRoIC0gaGVpZ2h0fXB4KTtcbiAgICAgICAgfVxuICAgIGA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17dG9nZ2xlQ3NzfT5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJzd2l0Y2hcIiBodG1sRm9yPXtpZH0+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y2hlY2tlZH1cbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNsaWRlclwiIC8+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlO1xuIiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG5pbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnO1xuaW1wb3J0IHdpdGhTdHlsZXMgZnJvbSAnLi4vc3R5bGVzL3dpdGhTdHlsZXMnO1xuaW1wb3J0IHsgYWxwaGEgfSBmcm9tICcuLi9zdHlsZXMvY29sb3JNYW5pcHVsYXRvcic7XG5leHBvcnQgdmFyIHN0eWxlcyA9IGZ1bmN0aW9uIHN0eWxlcyh0aGVtZSkge1xuICByZXR1cm4ge1xuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQuICovXG4gICAgcm9vdDoge1xuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgbWFyZ2luOiAwLFxuICAgICAgLy8gUmVzZXQgYnJvd3NlciBkZWZhdWx0IHN0eWxlLlxuICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICBmbGV4U2hyaW5rOiAwLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLmRpdmlkZXJcbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgYWJzb2x1dGU9e3RydWV9YC4gKi9cbiAgICBhYnNvbHV0ZToge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmIGB2YXJpYW50PVwiaW5zZXRcImAuICovXG4gICAgaW5zZXQ6IHtcbiAgICAgIG1hcmdpbkxlZnQ6IDcyXG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYGxpZ2h0PXt0cnVlfWAuICovXG4gICAgbGlnaHQ6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYWxwaGEodGhlbWUucGFsZXR0ZS5kaXZpZGVyLCAwLjA4KVxuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmIGB2YXJpYW50PVwibWlkZGxlXCJgLiAqL1xuICAgIG1pZGRsZToge1xuICAgICAgbWFyZ2luTGVmdDogdGhlbWUuc3BhY2luZygyKSxcbiAgICAgIG1hcmdpblJpZ2h0OiB0aGVtZS5zcGFjaW5nKDIpXG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQgaWYgYG9yaWVudGF0aW9uPVwidmVydGljYWxcImAuICovXG4gICAgdmVydGljYWw6IHtcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgd2lkdGg6IDFcbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgZmxleEl0ZW09e3RydWV9YC4gKi9cbiAgICBmbGV4SXRlbToge1xuICAgICAgYWxpZ25TZWxmOiAnc3RyZXRjaCcsXG4gICAgICBoZWlnaHQ6ICdhdXRvJ1xuICAgIH1cbiAgfTtcbn07XG52YXIgRGl2aWRlciA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIERpdmlkZXIocHJvcHMsIHJlZikge1xuICB2YXIgX3Byb3BzJGFic29sdXRlID0gcHJvcHMuYWJzb2x1dGUsXG4gICAgICBhYnNvbHV0ZSA9IF9wcm9wcyRhYnNvbHV0ZSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkYWJzb2x1dGUsXG4gICAgICBjbGFzc2VzID0gcHJvcHMuY2xhc3NlcyxcbiAgICAgIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIF9wcm9wcyRjb21wb25lbnQgPSBwcm9wcy5jb21wb25lbnQsXG4gICAgICBDb21wb25lbnQgPSBfcHJvcHMkY29tcG9uZW50ID09PSB2b2lkIDAgPyAnaHInIDogX3Byb3BzJGNvbXBvbmVudCxcbiAgICAgIF9wcm9wcyRmbGV4SXRlbSA9IHByb3BzLmZsZXhJdGVtLFxuICAgICAgZmxleEl0ZW0gPSBfcHJvcHMkZmxleEl0ZW0gPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGZsZXhJdGVtLFxuICAgICAgX3Byb3BzJGxpZ2h0ID0gcHJvcHMubGlnaHQsXG4gICAgICBsaWdodCA9IF9wcm9wcyRsaWdodCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkbGlnaHQsXG4gICAgICBfcHJvcHMkb3JpZW50YXRpb24gPSBwcm9wcy5vcmllbnRhdGlvbixcbiAgICAgIG9yaWVudGF0aW9uID0gX3Byb3BzJG9yaWVudGF0aW9uID09PSB2b2lkIDAgPyAnaG9yaXpvbnRhbCcgOiBfcHJvcHMkb3JpZW50YXRpb24sXG4gICAgICBfcHJvcHMkcm9sZSA9IHByb3BzLnJvbGUsXG4gICAgICByb2xlID0gX3Byb3BzJHJvbGUgPT09IHZvaWQgMCA/IENvbXBvbmVudCAhPT0gJ2hyJyA/ICdzZXBhcmF0b3InIDogdW5kZWZpbmVkIDogX3Byb3BzJHJvbGUsXG4gICAgICBfcHJvcHMkdmFyaWFudCA9IHByb3BzLnZhcmlhbnQsXG4gICAgICB2YXJpYW50ID0gX3Byb3BzJHZhcmlhbnQgPT09IHZvaWQgMCA/ICdmdWxsV2lkdGgnIDogX3Byb3BzJHZhcmlhbnQsXG4gICAgICBvdGhlciA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgW1wiYWJzb2x1dGVcIiwgXCJjbGFzc2VzXCIsIFwiY2xhc3NOYW1lXCIsIFwiY29tcG9uZW50XCIsIFwiZmxleEl0ZW1cIiwgXCJsaWdodFwiLCBcIm9yaWVudGF0aW9uXCIsIFwicm9sZVwiLCBcInZhcmlhbnRcIl0pO1xuXG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IGNsc3goY2xhc3Nlcy5yb290LCBjbGFzc05hbWUsIHZhcmlhbnQgIT09ICdmdWxsV2lkdGgnICYmIGNsYXNzZXNbdmFyaWFudF0sIGFic29sdXRlICYmIGNsYXNzZXMuYWJzb2x1dGUsIGZsZXhJdGVtICYmIGNsYXNzZXMuZmxleEl0ZW0sIGxpZ2h0ICYmIGNsYXNzZXMubGlnaHQsIG9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIGNsYXNzZXMudmVydGljYWwpLFxuICAgIHJvbGU6IHJvbGUsXG4gICAgcmVmOiByZWZcbiAgfSwgb3RoZXIpKTtcbn0pO1xucHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gRGl2aWRlci5wcm9wVHlwZXMgPSB7XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFdhcm5pbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gfCBUaGVzZSBQcm9wVHlwZXMgYXJlIGdlbmVyYXRlZCBmcm9tIHRoZSBUeXBlU2NyaXB0IHR5cGUgZGVmaW5pdGlvbnMgfFxuICAvLyB8ICAgICBUbyB1cGRhdGUgdGhlbSBlZGl0IHRoZSBkLnRzIGZpbGUgYW5kIHJ1biBcInlhcm4gcHJvcHR5cGVzXCIgICAgIHxcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBBYnNvbHV0ZWx5IHBvc2l0aW9uIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgYWJzb2x1dGU6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIG9yIGV4dGVuZCB0aGUgc3R5bGVzIGFwcGxpZWQgdG8gdGhlIGNvbXBvbmVudC5cbiAgICogU2VlIFtDU1MgQVBJXSgjY3NzKSBiZWxvdyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBUaGUgY29tcG9uZW50IHVzZWQgZm9yIHRoZSByb290IG5vZGUuXG4gICAqIEVpdGhlciBhIHN0cmluZyB0byB1c2UgYSBIVE1MIGVsZW1lbnQgb3IgYSBjb21wb25lbnQuXG4gICAqL1xuICBjb21wb25lbnQ6IFByb3BUeXBlc1xuICAvKiBAdHlwZXNjcmlwdC10by1wcm9wdHlwZXMtaWdub3JlICovXG4gIC5lbGVtZW50VHlwZSxcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBhIHZlcnRpY2FsIGRpdmlkZXIgd2lsbCBoYXZlIHRoZSBjb3JyZWN0IGhlaWdodCB3aGVuIHVzZWQgaW4gZmxleCBjb250YWluZXIuXG4gICAqIChCeSBkZWZhdWx0LCBhIHZlcnRpY2FsIGRpdmlkZXIgd2lsbCBoYXZlIGEgY2FsY3VsYXRlZCBoZWlnaHQgb2YgYDBweGAgaWYgaXQgaXMgdGhlIGNoaWxkIG9mIGEgZmxleCBjb250YWluZXIuKVxuICAgKi9cbiAgZmxleEl0ZW06IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBkaXZpZGVyIHdpbGwgaGF2ZSBhIGxpZ2h0ZXIgY29sb3IuXG4gICAqL1xuICBsaWdodDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIFRoZSBkaXZpZGVyIG9yaWVudGF0aW9uLlxuICAgKi9cbiAgb3JpZW50YXRpb246IFByb3BUeXBlcy5vbmVPZihbJ2hvcml6b250YWwnLCAndmVydGljYWwnXSksXG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIHJvbGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIFRoZSB2YXJpYW50IHRvIHVzZS5cbiAgICovXG4gIHZhcmlhbnQ6IFByb3BUeXBlcy5vbmVPZihbJ2Z1bGxXaWR0aCcsICdpbnNldCcsICdtaWRkbGUnXSlcbn0gOiB2b2lkIDA7XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcywge1xuICBuYW1lOiAnTXVpRGl2aWRlcidcbn0pKERpdmlkZXIpOyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJy4uL3N0eWxlcy93aXRoU3R5bGVzJztcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJy4uL1R5cG9ncmFwaHknO1xuaW1wb3J0IExpc3RDb250ZXh0IGZyb20gJy4uL0xpc3QvTGlzdENvbnRleHQnO1xuZXhwb3J0IHZhciBzdHlsZXMgPSB7XG4gIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSByb290IGVsZW1lbnQuICovXG4gIHJvb3Q6IHtcbiAgICBmbGV4OiAnMSAxIGF1dG8nLFxuICAgIG1pbldpZHRoOiAwLFxuICAgIG1hcmdpblRvcDogNCxcbiAgICBtYXJnaW5Cb3R0b206IDRcbiAgfSxcblxuICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgYFR5cG9ncmFwaHlgIGNvbXBvbmVudHMgaWYgcHJpbWFyeSBhbmQgc2Vjb25kYXJ5IGFyZSBzZXQuICovXG4gIG11bHRpbGluZToge1xuICAgIG1hcmdpblRvcDogNixcbiAgICBtYXJnaW5Cb3R0b206IDZcbiAgfSxcblxuICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgYFR5cG9ncmFwaHlgIGNvbXBvbmVudHMgaWYgZGVuc2UuICovXG4gIGRlbnNlOiB7fSxcblxuICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmIGBpbnNldD17dHJ1ZX1gLiAqL1xuICBpbnNldDoge1xuICAgIHBhZGRpbmdMZWZ0OiA1NlxuICB9LFxuXG4gIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBwcmltYXJ5IGBUeXBvZ3JhcGh5YCBjb21wb25lbnQuICovXG4gIHByaW1hcnk6IHt9LFxuXG4gIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBzZWNvbmRhcnkgYFR5cG9ncmFwaHlgIGNvbXBvbmVudC4gKi9cbiAgc2Vjb25kYXJ5OiB7fVxufTtcbnZhciBMaXN0SXRlbVRleHQgPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBMaXN0SXRlbVRleHQocHJvcHMsIHJlZikge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzZXMgPSBwcm9wcy5jbGFzc2VzLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgX3Byb3BzJGRpc2FibGVUeXBvZ3JhID0gcHJvcHMuZGlzYWJsZVR5cG9ncmFwaHksXG4gICAgICBkaXNhYmxlVHlwb2dyYXBoeSA9IF9wcm9wcyRkaXNhYmxlVHlwb2dyYSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkZGlzYWJsZVR5cG9ncmEsXG4gICAgICBfcHJvcHMkaW5zZXQgPSBwcm9wcy5pbnNldCxcbiAgICAgIGluc2V0ID0gX3Byb3BzJGluc2V0ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wcm9wcyRpbnNldCxcbiAgICAgIHByaW1hcnlQcm9wID0gcHJvcHMucHJpbWFyeSxcbiAgICAgIHByaW1hcnlUeXBvZ3JhcGh5UHJvcHMgPSBwcm9wcy5wcmltYXJ5VHlwb2dyYXBoeVByb3BzLFxuICAgICAgc2Vjb25kYXJ5UHJvcCA9IHByb3BzLnNlY29uZGFyeSxcbiAgICAgIHNlY29uZGFyeVR5cG9ncmFwaHlQcm9wcyA9IHByb3BzLnNlY29uZGFyeVR5cG9ncmFwaHlQcm9wcyxcbiAgICAgIG90aGVyID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbXCJjaGlsZHJlblwiLCBcImNsYXNzZXNcIiwgXCJjbGFzc05hbWVcIiwgXCJkaXNhYmxlVHlwb2dyYXBoeVwiLCBcImluc2V0XCIsIFwicHJpbWFyeVwiLCBcInByaW1hcnlUeXBvZ3JhcGh5UHJvcHNcIiwgXCJzZWNvbmRhcnlcIiwgXCJzZWNvbmRhcnlUeXBvZ3JhcGh5UHJvcHNcIl0pO1xuXG4gIHZhciBfUmVhY3QkdXNlQ29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoTGlzdENvbnRleHQpLFxuICAgICAgZGVuc2UgPSBfUmVhY3QkdXNlQ29udGV4dC5kZW5zZTtcblxuICB2YXIgcHJpbWFyeSA9IHByaW1hcnlQcm9wICE9IG51bGwgPyBwcmltYXJ5UHJvcCA6IGNoaWxkcmVuO1xuXG4gIGlmIChwcmltYXJ5ICE9IG51bGwgJiYgcHJpbWFyeS50eXBlICE9PSBUeXBvZ3JhcGh5ICYmICFkaXNhYmxlVHlwb2dyYXBoeSkge1xuICAgIHByaW1hcnkgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChUeXBvZ3JhcGh5LCBfZXh0ZW5kcyh7XG4gICAgICB2YXJpYW50OiBkZW5zZSA/ICdib2R5MicgOiAnYm9keTEnLFxuICAgICAgY2xhc3NOYW1lOiBjbGFzc2VzLnByaW1hcnksXG4gICAgICBjb21wb25lbnQ6IFwic3BhblwiLFxuICAgICAgZGlzcGxheTogXCJibG9ja1wiXG4gICAgfSwgcHJpbWFyeVR5cG9ncmFwaHlQcm9wcyksIHByaW1hcnkpO1xuICB9XG5cbiAgdmFyIHNlY29uZGFyeSA9IHNlY29uZGFyeVByb3A7XG5cbiAgaWYgKHNlY29uZGFyeSAhPSBudWxsICYmIHNlY29uZGFyeS50eXBlICE9PSBUeXBvZ3JhcGh5ICYmICFkaXNhYmxlVHlwb2dyYXBoeSkge1xuICAgIHNlY29uZGFyeSA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFR5cG9ncmFwaHksIF9leHRlbmRzKHtcbiAgICAgIHZhcmlhbnQ6IFwiYm9keTJcIixcbiAgICAgIGNsYXNzTmFtZTogY2xhc3Nlcy5zZWNvbmRhcnksXG4gICAgICBjb2xvcjogXCJ0ZXh0U2Vjb25kYXJ5XCIsXG4gICAgICBkaXNwbGF5OiBcImJsb2NrXCJcbiAgICB9LCBzZWNvbmRhcnlUeXBvZ3JhcGh5UHJvcHMpLCBzZWNvbmRhcnkpO1xuICB9XG5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIF9leHRlbmRzKHtcbiAgICBjbGFzc05hbWU6IGNsc3goY2xhc3Nlcy5yb290LCBjbGFzc05hbWUsIGRlbnNlICYmIGNsYXNzZXMuZGVuc2UsIGluc2V0ICYmIGNsYXNzZXMuaW5zZXQsIHByaW1hcnkgJiYgc2Vjb25kYXJ5ICYmIGNsYXNzZXMubXVsdGlsaW5lKSxcbiAgICByZWY6IHJlZlxuICB9LCBvdGhlciksIHByaW1hcnksIHNlY29uZGFyeSk7XG59KTtcbnByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IExpc3RJdGVtVGV4dC5wcm9wVHlwZXMgPSB7XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFdhcm5pbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gfCBUaGVzZSBQcm9wVHlwZXMgYXJlIGdlbmVyYXRlZCBmcm9tIHRoZSBUeXBlU2NyaXB0IHR5cGUgZGVmaW5pdGlvbnMgfFxuICAvLyB8ICAgICBUbyB1cGRhdGUgdGhlbSBlZGl0IHRoZSBkLnRzIGZpbGUgYW5kIHJ1biBcInlhcm4gcHJvcHR5cGVzXCIgICAgIHxcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBBbGlhcyBmb3IgdGhlIGBwcmltYXJ5YCBwcm9wLlxuICAgKi9cbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSBvciBleHRlbmQgdGhlIHN0eWxlcyBhcHBsaWVkIHRvIHRoZSBjb21wb25lbnQuXG4gICAqIFNlZSBbQ1NTIEFQSV0oI2NzcykgYmVsb3cgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgY2hpbGRyZW4gd29uJ3QgYmUgd3JhcHBlZCBieSBhIFR5cG9ncmFwaHkgY29tcG9uZW50LlxuICAgKiBUaGlzIGNhbiBiZSB1c2VmdWwgdG8gcmVuZGVyIGFuIGFsdGVybmF0aXZlIFR5cG9ncmFwaHkgdmFyaWFudCBieSB3cmFwcGluZ1xuICAgKiB0aGUgYGNoaWxkcmVuYCAob3IgYHByaW1hcnlgKSB0ZXh0LCBhbmQgb3B0aW9uYWwgYHNlY29uZGFyeWAgdGV4dFxuICAgKiB3aXRoIHRoZSBUeXBvZ3JhcGh5IGNvbXBvbmVudC5cbiAgICovXG4gIGRpc2FibGVUeXBvZ3JhcGh5OiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgY2hpbGRyZW4gd2lsbCBiZSBpbmRlbnRlZC5cbiAgICogVGhpcyBzaG91bGQgYmUgdXNlZCBpZiB0aGVyZSBpcyBubyBsZWZ0IGF2YXRhciBvciBsZWZ0IGljb24uXG4gICAqL1xuICBpbnNldDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIFRoZSBtYWluIGNvbnRlbnQgZWxlbWVudC5cbiAgICovXG4gIHByaW1hcnk6IFByb3BUeXBlcy5ub2RlLFxuXG4gIC8qKlxuICAgKiBUaGVzZSBwcm9wcyB3aWxsIGJlIGZvcndhcmRlZCB0byB0aGUgcHJpbWFyeSB0eXBvZ3JhcGh5IGNvbXBvbmVudFxuICAgKiAoYXMgbG9uZyBhcyBkaXNhYmxlVHlwb2dyYXBoeSBpcyBub3QgYHRydWVgKS5cbiAgICovXG4gIHByaW1hcnlUeXBvZ3JhcGh5UHJvcHM6IFByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqXG4gICAqIFRoZSBzZWNvbmRhcnkgY29udGVudCBlbGVtZW50LlxuICAgKi9cbiAgc2Vjb25kYXJ5OiBQcm9wVHlwZXMubm9kZSxcblxuICAvKipcbiAgICogVGhlc2UgcHJvcHMgd2lsbCBiZSBmb3J3YXJkZWQgdG8gdGhlIHNlY29uZGFyeSB0eXBvZ3JhcGh5IGNvbXBvbmVudFxuICAgKiAoYXMgbG9uZyBhcyBkaXNhYmxlVHlwb2dyYXBoeSBpcyBub3QgYHRydWVgKS5cbiAgICovXG4gIHNlY29uZGFyeVR5cG9ncmFwaHlQcm9wczogUHJvcFR5cGVzLm9iamVjdFxufSA6IHZvaWQgMDtcbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZXMoc3R5bGVzLCB7XG4gIG5hbWU6ICdNdWlMaXN0SXRlbVRleHQnXG59KShMaXN0SXRlbVRleHQpOyIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xzeCBmcm9tICdjbHN4JztcbmltcG9ydCB3aXRoU3R5bGVzIGZyb20gJy4uL3N0eWxlcy93aXRoU3R5bGVzJztcbmV4cG9ydCB2YXIgc3R5bGVzID0ge1xuICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50LiAqL1xuICByb290OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgcmlnaHQ6IDE2LFxuICAgIHRvcDogJzUwJScsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKSdcbiAgfVxufTtcbi8qKlxuICogTXVzdCBiZSB1c2VkIGFzIHRoZSBsYXN0IGNoaWxkIG9mIExpc3RJdGVtIHRvIGZ1bmN0aW9uIHByb3Blcmx5LlxuICovXG5cbnZhciBMaXN0SXRlbVNlY29uZGFyeUFjdGlvbiA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uKHByb3BzLCByZWYpIHtcbiAgdmFyIGNsYXNzZXMgPSBwcm9wcy5jbGFzc2VzLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgb3RoZXIgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMocHJvcHMsIFtcImNsYXNzZXNcIiwgXCJjbGFzc05hbWVcIl0pO1xuXG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBfZXh0ZW5kcyh7XG4gICAgY2xhc3NOYW1lOiBjbHN4KGNsYXNzZXMucm9vdCwgY2xhc3NOYW1lKSxcbiAgICByZWY6IHJlZlxuICB9LCBvdGhlcikpO1xufSk7XG5wcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBMaXN0SXRlbVNlY29uZGFyeUFjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFdhcm5pbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gfCBUaGVzZSBQcm9wVHlwZXMgYXJlIGdlbmVyYXRlZCBmcm9tIHRoZSBUeXBlU2NyaXB0IHR5cGUgZGVmaW5pdGlvbnMgfFxuICAvLyB8ICAgICBUbyB1cGRhdGUgdGhlbSBlZGl0IHRoZSBkLnRzIGZpbGUgYW5kIHJ1biBcInlhcm4gcHJvcHR5cGVzXCIgICAgIHxcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiBUaGUgY29udGVudCBvZiB0aGUgY29tcG9uZW50LCBub3JtYWxseSBhbiBgSWNvbkJ1dHRvbmAgb3Igc2VsZWN0aW9uIGNvbnRyb2wuXG4gICAqL1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIG9yIGV4dGVuZCB0aGUgc3R5bGVzIGFwcGxpZWQgdG8gdGhlIGNvbXBvbmVudC5cbiAgICogU2VlIFtDU1MgQVBJXSgjY3NzKSBiZWxvdyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdCxcblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nXG59IDogdm9pZCAwO1xuTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24ubXVpTmFtZSA9ICdMaXN0SXRlbVNlY29uZGFyeUFjdGlvbic7XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcywge1xuICBuYW1lOiAnTXVpTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24nXG59KShMaXN0SXRlbVNlY29uZGFyeUFjdGlvbik7IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAyMiBTdXJmYm9hcmQgSG9sZGluZyBCLlYuIDxodHRwczovL3d3dy5zdGFydHBhZ2UuY29tPlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW0sIExpc3RJdGVtVGV4dCwgTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24sIERpdmlkZXIsIEJveCwgVHlwb2dyYXBoeX0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dXNlU2VsZWN0b3J9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7Y3NzfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcblxuaW1wb3J0IHtnZXRNZXNzYWdlfSBmcm9tICcuLi8uLi91dGlscy9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHtvcHRpb25zU2VsZWN0b3J9IGZyb20gJy4uLy4uL3NlbGVjdG9ycy9pbmRleCc7XG5pbXBvcnQgVG9nZ2xlIGZyb20gJy4uLy4uLy4uL2NvbW1vbi9jb21wb25lbnRzL1RvZ2dsZSc7XG5pbXBvcnQge3VwZGF0ZVNldHRpbmdzfSBmcm9tICcuLi8uLi9wcml2YWN5IHRvb2xzL29wdGlvbnMnO1xuXG5jb25zdCBQcml2YWN5VGFiID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB1c2VTZWxlY3RvcihvcHRpb25zU2VsZWN0b3IpO1xuICAgIGNvbnN0IGRudEVuYWJsZWQgPSBvcHRpb25zLnNldHRpbmdzLmNoZWNrRm9yRE5UUG9saWN5ICYmIG9wdGlvbnMuc2V0dGluZ3Muc2VuZEROVFNpZ25hbDtcbiAgICBjb25zdCBoeXBlcmxpbmtEaXNhYmxlZCA9IG9wdGlvbnMuc2V0dGluZ3MuZGlzYWJsZUh5cGVybGlua0F1ZGl0aW5nO1xuICAgIGNvbnN0IG5ldHdvcmtQcmVkaWN0aW9uRGlzYWJsZWQgPSBvcHRpb25zLnNldHRpbmdzLmRpc2FibGVOZXR3b3JrUHJlZGljdGlvbjtcbiAgICBjb25zdCB0b2dnbGVDb2xvciA9ICcjMjRDNUI2JztcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZWUwZjc7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgICAgICAgICBgfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDQsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMjRcbiAgICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAgICAgIDxMaXN0SXRlbSBzdHlsZT17e3BhZGRpbmc6IDB9fT5cbiAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJncGNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg0XCIgc3R5bGU9e3ttYXJnaW5Cb3R0b206IDEyfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc1ByaXZhY3lUYWJETlRMYWJlbCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeT17XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgY29sb3I9XCJ0ZXh0UHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0TWVzc2FnZSgnc2V0dGluZ3NQcml2YWN5VGFiRE5URGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVNlY29uZGFyeUFjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUb2dnbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cImRudC10b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17MjR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezQwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhleENvbG9yPXt0b2dnbGVDb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtkbnRFbmFibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNldHRpbmdzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMuc2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0ZvckROVFBvbGljeTogIWRudEVuYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kRE5UU2lnbmFsOiAhZG50RW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0SXRlbVNlY29uZGFyeUFjdGlvbj5cbiAgICAgICAgICAgICAgICA8L0xpc3RJdGVtPlxuICAgICAgICAgICAgICAgIDxEaXZpZGVyIC8+XG4gICAgICAgICAgICAgICAgPExpc3RJdGVtIHN0eWxlPXt7cGFkZGluZzogMH19PlxuICAgICAgICAgICAgICAgICAgICA8TGlzdEl0ZW1UZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cImh5cGVybGluay1hdWRpdGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDRcIiBzdHlsZT17e21hcmdpbkJvdHRvbTogMTJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzUHJpdmFjeVRhYkh5cGVybGlua0xhYmVsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5PXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIiBjb2xvcj1cInRleHRQcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRNZXNzYWdlKCdzZXR0aW5nc1ByaXZhY3lUYWJIeXBlcmxpbmtEZXNjcmlwdGlvbicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRvZ2dsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiaHlwZXJsaW5rLXRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsyNH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17NDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4Q29sb3I9e3RvZ2dsZUNvbG9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2h5cGVybGlua0Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNldHRpbmdzKHsuLi5vcHRpb25zLnNldHRpbmdzLCBkaXNhYmxlSHlwZXJsaW5rQXVkaXRpbmc6ICFoeXBlcmxpbmtEaXNhYmxlZH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPnsnICd9XG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgICAgICAgICA8RGl2aWRlciAvPlxuICAgICAgICAgICAgICAgIDxMaXN0SXRlbSBzdHlsZT17e3BhZGRpbmc6IDB9fT5cbiAgICAgICAgICAgICAgICAgICAgPExpc3RJdGVtVGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJwcmVmZXRjaGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDRcIiBzdHlsZT17e21hcmdpbkJvdHRvbTogMTJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzUHJpdmFjeVRhYlByZWZldGNoTGFiZWwnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnk9e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNlwiIGNvbG9yPVwidGV4dFByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldE1lc3NhZ2UoJ3NldHRpbmdzUHJpdmFjeVRhYlByZWZldGNoRGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0SXRlbVNlY29uZGFyeUFjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUb2dnbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cInByZWZldGNoLXRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsyNH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17NDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGV4Q29sb3I9e3RvZ2dsZUNvbG9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e25ldHdvcmtQcmVkaWN0aW9uRGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU2V0dGluZ3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ub3B0aW9ucy5zZXR0aW5ncyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVOZXR3b3JrUHJlZGljdGlvbjogIW5ldHdvcmtQcmVkaWN0aW9uRGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgPC9Cb3g+XG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByaXZhY3lUYWI7XG4iXSwic291cmNlUm9vdCI6IiJ9