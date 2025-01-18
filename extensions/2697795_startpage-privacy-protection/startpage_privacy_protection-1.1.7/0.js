(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isMuiElement; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function isMuiElement(element, muiNames) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["isValidElement"](element) && muiNames.indexOf(element.type.muiName) !== -1;
}

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(97);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js + 4 modules
var makeStyles = __webpack_require__(376);

// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/styled/styled.js









function omit(input, fields) {
  var output = {};
  Object.keys(input).forEach(function (prop) {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
} // styled-components's API removes the mapping between components and styles.
// Using components as a low-level styling construct can be simpler.


function styled_styled(Component) {
  var componentCreator = function componentCreator(style) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var name = options.name,
        stylesOptions = Object(objectWithoutProperties["a" /* default */])(options, ["name"]);

    if (false) {}

    var classNamePrefix = name;

    if (false) { var displayName; }

    var stylesOrCreator = typeof style === 'function' ? function (theme) {
      return {
        root: function root(props) {
          return style(Object(esm_extends["a" /* default */])({
            theme: theme
          }, props));
        }
      };
    } : {
      root: style
    };
    var useStyles = Object(makeStyles["a" /* default */])(stylesOrCreator, Object(esm_extends["a" /* default */])({
      Component: Component,
      name: name || Component.displayName,
      classNamePrefix: classNamePrefix
    }, stylesOptions));
    var filterProps;
    var propTypes = {};

    if (style.filterProps) {
      filterProps = style.filterProps;
      delete style.filterProps;
    }
    /* eslint-disable react/forbid-foreign-prop-types */


    if (style.propTypes) {
      propTypes = style.propTypes;
      delete style.propTypes;
    }
    /* eslint-enable react/forbid-foreign-prop-types */


    var StyledComponent = /*#__PURE__*/react_default.a.forwardRef(function StyledComponent(props, ref) {
      var children = props.children,
          classNameProp = props.className,
          clone = props.clone,
          ComponentProp = props.component,
          other = Object(objectWithoutProperties["a" /* default */])(props, ["children", "className", "clone", "component"]);

      var classes = useStyles(props);
      var className = Object(clsx_m["a" /* default */])(classes.root, classNameProp);
      var spread = other;

      if (filterProps) {
        spread = omit(spread, filterProps);
      }

      if (clone) {
        return /*#__PURE__*/react_default.a.cloneElement(children, Object(esm_extends["a" /* default */])({
          className: Object(clsx_m["a" /* default */])(children.props.className, className)
        }, spread));
      }

      if (typeof children === 'function') {
        return children(Object(esm_extends["a" /* default */])({
          className: className
        }, spread));
      }

      var FinalComponent = ComponentProp || Component;
      return /*#__PURE__*/react_default.a.createElement(FinalComponent, Object(esm_extends["a" /* default */])({
        ref: ref,
        className: className
      }, spread), children);
    });
     false ? undefined : void 0;

    if (false) {}

    hoist_non_react_statics_cjs_default()(StyledComponent, Component);
    return StyledComponent;
  };

  return componentCreator;
}
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/defaultTheme.js
var defaultTheme = __webpack_require__(96);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/styled.js




var styles_styled_styled = function styled(Component) {
  var componentCreator = styled_styled(Component);
  return function (style, options) {
    return componentCreator(style, Object(esm_extends["a" /* default */])({
      defaultTheme: defaultTheme["a" /* default */]
    }, options));
  };
};

/* harmony default export */ var styles_styled = __webpack_exports__["a"] = (styles_styled_styled);

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @ignore - internal component.
 */

var ListContext = react__WEBPACK_IMPORTED_MODULE_0__["createContext"]({});

if (false) {}

/* harmony default export */ __webpack_exports__["a"] = (ListContext);

/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);
/* harmony import */ var _ListContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(419);







var styles = {
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative'
  },

  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8
  },

  /* Styles applied to the root element if dense. */
  dense: {},

  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    paddingTop: 0
  }
};
var List = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function List(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'ul' : _props$component,
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$disablePadding = props.disablePadding,
      disablePadding = _props$disablePadding === void 0 ? false : _props$disablePadding,
      subheader = props.subheader,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["children", "classes", "className", "component", "dense", "disablePadding", "subheader"]);

  var context = react__WEBPACK_IMPORTED_MODULE_2__["useMemo"](function () {
    return {
      dense: dense
    };
  }, [dense]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_ListContext__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].Provider, {
    value: context
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className, dense && classes.dense, !disablePadding && classes.padding, subheader && classes.subheader),
    ref: ref
  }, other), subheader, children));
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiList'
})(List));

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);
/* harmony import */ var _ButtonBase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(375);
/* harmony import */ var _utils_isMuiElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(306);
/* harmony import */ var _utils_useForkRef__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(80);
/* harmony import */ var _List_ListContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(419);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(44);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_9__);












var styles = function styles(theme) {
  return {
    /* Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left',
      paddingTop: 8,
      paddingBottom: 8,
      '&$focusVisible': {
        backgroundColor: theme.palette.action.selected
      },
      '&$selected, &$selected:hover': {
        backgroundColor: theme.palette.action.selected
      },
      '&$disabled': {
        opacity: 0.5
      }
    },

    /* Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`. */
    container: {
      position: 'relative'
    },

    /* Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
    focusVisible: {},

    /* Styles applied to the `component` element if dense. */
    dense: {
      paddingTop: 4,
      paddingBottom: 4
    },

    /* Styles applied to the `component` element if `alignItems="flex-start"`. */
    alignItemsFlexStart: {
      alignItems: 'flex-start'
    },

    /* Pseudo-class applied to the inner `component` element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the inner `component` element if `divider={true}`. */
    divider: {
      borderBottom: "1px solid ".concat(theme.palette.divider),
      backgroundClip: 'padding-box'
    },

    /* Styles applied to the inner `component` element if `disableGutters={false}`. */
    gutters: {
      paddingLeft: 16,
      paddingRight: 16
    },

    /* Styles applied to the inner `component` element if `button={true}`. */
    button: {
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest
      }),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: theme.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },

    /* Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`. */
    secondaryAction: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positioned.
      paddingRight: 48
    },

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {}
  };
};
var useEnhancedEffect = typeof window === 'undefined' ? react__WEBPACK_IMPORTED_MODULE_2__["useEffect"] : react__WEBPACK_IMPORTED_MODULE_2__["useLayoutEffect"];
/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */

var ListItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function ListItem(props, ref) {
  var _props$alignItems = props.alignItems,
      alignItems = _props$alignItems === void 0 ? 'center' : _props$alignItems,
      _props$autoFocus = props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
      _props$button = props.button,
      button = _props$button === void 0 ? false : _props$button,
      childrenProp = props.children,
      classes = props.classes,
      className = props.className,
      componentProp = props.component,
      _props$ContainerCompo = props.ContainerComponent,
      ContainerComponent = _props$ContainerCompo === void 0 ? 'li' : _props$ContainerCompo,
      _props$ContainerProps = props.ContainerProps;
  _props$ContainerProps = _props$ContainerProps === void 0 ? {} : _props$ContainerProps;

  var ContainerClassName = _props$ContainerProps.className,
      ContainerProps = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_props$ContainerProps, ["className"]),
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      _props$divider = props.divider,
      divider = _props$divider === void 0 ? false : _props$divider,
      focusVisibleClassName = props.focusVisibleClassName,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["alignItems", "autoFocus", "button", "children", "classes", "className", "component", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "divider", "focusVisibleClassName", "selected"]);

  var context = react__WEBPACK_IMPORTED_MODULE_2__["useContext"](_List_ListContext__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]);
  var childContext = {
    dense: dense || context.dense || false,
    alignItems: alignItems
  };
  var listItemRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](null);
  useEnhancedEffect(function () {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (false) {}
    }
  }, [autoFocus]);
  var children = react__WEBPACK_IMPORTED_MODULE_2__["Children"].toArray(childrenProp);
  var hasSecondaryAction = children.length && Object(_utils_isMuiElement__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(children[children.length - 1], ['ListItemSecondaryAction']);
  var handleOwnRef = react__WEBPACK_IMPORTED_MODULE_2__["useCallback"](function (instance) {
    // #StrictMode ready
    listItemRef.current = react_dom__WEBPACK_IMPORTED_MODULE_9__["findDOMNode"](instance);
  }, []);
  var handleRef = Object(_utils_useForkRef__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(handleOwnRef, ref);

  var componentProps = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className, childContext.dense && classes.dense, !disableGutters && classes.gutters, divider && classes.divider, disabled && classes.disabled, button && classes.button, alignItems !== "center" && classes.alignItemsFlexStart, hasSecondaryAction && classes.secondaryAction, selected && classes.selected),
    disabled: disabled
  }, other);

  var Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.focusVisible, focusVisibleClassName);
    Component = _ButtonBase__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"];
  }

  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component; // Avoid nesting of li > li.

    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_List_ListContext__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Provider, {
      value: childContext
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](ContainerComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
      className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.container, ContainerClassName),
      ref: handleRef
    }, ContainerProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, componentProps, children), children.pop()));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_List_ListContext__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].Provider, {
    value: childContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    ref: handleRef
  }, componentProps), children));
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiListItem'
})(ListItem));

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: styleFunction

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__(92);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/merge.js
var merge = __webpack_require__(113);

// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/styleFunctionSx.js






function omit(input, fields) {
  var output = {};
  Object.keys(input).forEach(function (prop) {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
}

var warnedOnce = false;

function styleFunctionSx(styleFunction) {
  var newStyleFunction = function newStyleFunction(props) {
    var output = styleFunction(props);

    if (props.css) {
      return Object(esm_extends["a" /* default */])({}, Object(merge["a" /* default */])(output, styleFunction(Object(esm_extends["a" /* default */])({
        theme: props.theme
      }, props.css))), omit(props.css, [styleFunction.filterProps]));
    }

    if (props.sx) {
      return Object(esm_extends["a" /* default */])({}, Object(merge["a" /* default */])(output, styleFunction(Object(esm_extends["a" /* default */])({
        theme: props.theme
      }, props.sx))), omit(props.sx, [styleFunction.filterProps]));
    }

    return output;
  };

  newStyleFunction.propTypes =  false ? undefined : {};
  newStyleFunction.filterProps = ['css', 'sx'].concat(Object(toConsumableArray["a" /* default */])(styleFunction.filterProps));
  return newStyleFunction;
}
/**
 *
 * @deprecated
 * The css style function is deprecated. Use the `styleFunctionSx` instead.
 */


function css(styleFunction) {
  if (false) {}

  return styleFunctionSx(styleFunction);
}
/* harmony default export */ var esm_styleFunctionSx = (styleFunctionSx);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/compose.js



function compose() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  var fn = function fn(props) {
    return styles.reduce(function (acc, style) {
      var output = style(props);

      if (output) {
        return Object(merge["a" /* default */])(acc, output);
      }

      return acc;
    }, {});
  }; // Alternative approach that doesn't yield any performance gain.
  // const handlers = styles.reduce((acc, style) => {
  //   style.filterProps.forEach(prop => {
  //     acc[prop] = style;
  //   });
  //   return acc;
  // }, {});
  // const fn = props => {
  //   return Object.keys(props).reduce((acc, prop) => {
  //     if (handlers[prop]) {
  //       return merge(acc, handlers[prop](props));
  //     }
  //     return acc;
  //   }, {});
  // };


  fn.propTypes =  false ? undefined : {};
  fn.filterProps = styles.reduce(function (acc, style) {
    return acc.concat(style.filterProps);
  }, []);
  return fn;
}

/* harmony default export */ var esm_compose = (compose);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/breakpoints.js
var breakpoints = __webpack_require__(197);

// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/style.js




function getPath(obj, path) {
  if (!path || typeof path !== 'string') {
    return null;
  }

  return path.split('.').reduce(function (acc, item) {
    return acc && acc[item] ? acc[item] : null;
  }, obj);
}

function style_style(options) {
  var prop = options.prop,
      _options$cssProperty = options.cssProperty,
      cssProperty = _options$cssProperty === void 0 ? options.prop : _options$cssProperty,
      themeKey = options.themeKey,
      transform = options.transform;

  var fn = function fn(props) {
    if (props[prop] == null) {
      return null;
    }

    var propValue = props[prop];
    var theme = props.theme;
    var themeMapping = getPath(theme, themeKey) || {};

    var styleFromPropValue = function styleFromPropValue(propValueFinal) {
      var value;

      if (typeof themeMapping === 'function') {
        value = themeMapping(propValueFinal);
      } else if (Array.isArray(themeMapping)) {
        value = themeMapping[propValueFinal] || propValueFinal;
      } else {
        value = getPath(themeMapping, propValueFinal) || propValueFinal;

        if (transform) {
          value = transform(value);
        }
      }

      if (cssProperty === false) {
        return value;
      }

      return Object(defineProperty["a" /* default */])({}, cssProperty, value);
    };

    return Object(breakpoints["a" /* handleBreakpoints */])(props, propValue, styleFromPropValue);
  };

  fn.propTypes =  false ? undefined : {};
  fn.filterProps = [prop];
  return fn;
}

/* harmony default export */ var esm_style = (style_style);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/borders.js



function getBorder(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return "".concat(value, "px solid");
}

var border = esm_style({
  prop: 'border',
  themeKey: 'borders',
  transform: getBorder
});
var borderTop = esm_style({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: getBorder
});
var borderRight = esm_style({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: getBorder
});
var borderBottom = esm_style({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: getBorder
});
var borderLeft = esm_style({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: getBorder
});
var borderColor = esm_style({
  prop: 'borderColor',
  themeKey: 'palette'
});
var borderRadius = esm_style({
  prop: 'borderRadius',
  themeKey: 'shape'
});
var borders = esm_compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderRadius);
/* harmony default export */ var esm_borders = (borders);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/display.js


var displayPrint = esm_style({
  prop: 'displayPrint',
  cssProperty: false,
  transform: function transform(value) {
    return {
      '@media print': {
        display: value
      }
    };
  }
});
var displayRaw = esm_style({
  prop: 'display'
});
var overflow = esm_style({
  prop: 'overflow'
});
var textOverflow = esm_style({
  prop: 'textOverflow'
});
var visibility = esm_style({
  prop: 'visibility'
});
var whiteSpace = esm_style({
  prop: 'whiteSpace'
});
/* harmony default export */ var display = (esm_compose(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace));
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/flexbox.js


var flexBasis = esm_style({
  prop: 'flexBasis'
});
var flexDirection = esm_style({
  prop: 'flexDirection'
});
var flexWrap = esm_style({
  prop: 'flexWrap'
});
var justifyContent = esm_style({
  prop: 'justifyContent'
});
var alignItems = esm_style({
  prop: 'alignItems'
});
var alignContent = esm_style({
  prop: 'alignContent'
});
var order = esm_style({
  prop: 'order'
});
var flex = esm_style({
  prop: 'flex'
});
var flexGrow = esm_style({
  prop: 'flexGrow'
});
var flexShrink = esm_style({
  prop: 'flexShrink'
});
var alignSelf = esm_style({
  prop: 'alignSelf'
});
var justifyItems = esm_style({
  prop: 'justifyItems'
});
var justifySelf = esm_style({
  prop: 'justifySelf'
});
var flexbox = esm_compose(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
/* harmony default export */ var esm_flexbox = (flexbox);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/grid.js


var gridGap = esm_style({
  prop: 'gridGap'
});
var gridColumnGap = esm_style({
  prop: 'gridColumnGap'
});
var gridRowGap = esm_style({
  prop: 'gridRowGap'
});
var gridColumn = esm_style({
  prop: 'gridColumn'
});
var gridRow = esm_style({
  prop: 'gridRow'
});
var gridAutoFlow = esm_style({
  prop: 'gridAutoFlow'
});
var gridAutoColumns = esm_style({
  prop: 'gridAutoColumns'
});
var gridAutoRows = esm_style({
  prop: 'gridAutoRows'
});
var gridTemplateColumns = esm_style({
  prop: 'gridTemplateColumns'
});
var gridTemplateRows = esm_style({
  prop: 'gridTemplateRows'
});
var gridTemplateAreas = esm_style({
  prop: 'gridTemplateAreas'
});
var gridArea = esm_style({
  prop: 'gridArea'
});
var grid = esm_compose(gridGap, gridColumnGap, gridRowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
/* harmony default export */ var esm_grid = (grid);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/positions.js


var position = esm_style({
  prop: 'position'
});
var zIndex = esm_style({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
var positions_top = esm_style({
  prop: 'top'
});
var right = esm_style({
  prop: 'right'
});
var bottom = esm_style({
  prop: 'bottom'
});
var left = esm_style({
  prop: 'left'
});
/* harmony default export */ var positions = (esm_compose(position, zIndex, positions_top, right, bottom, left));
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/palette.js


var color = esm_style({
  prop: 'color',
  themeKey: 'palette'
});
var bgcolor = esm_style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette'
});
var palette = esm_compose(color, bgcolor);
/* harmony default export */ var esm_palette = (palette);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/shadows.js

var boxShadow = esm_style({
  prop: 'boxShadow',
  themeKey: 'shadows'
});
/* harmony default export */ var shadows = (boxShadow);
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/sizing.js



function sizing_transform(value) {
  return value <= 1 ? "".concat(value * 100, "%") : value;
}

var width = esm_style({
  prop: 'width',
  transform: sizing_transform
});
var maxWidth = esm_style({
  prop: 'maxWidth',
  transform: sizing_transform
});
var minWidth = esm_style({
  prop: 'minWidth',
  transform: sizing_transform
});
var height = esm_style({
  prop: 'height',
  transform: sizing_transform
});
var maxHeight = esm_style({
  prop: 'maxHeight',
  transform: sizing_transform
});
var minHeight = esm_style({
  prop: 'minHeight',
  transform: sizing_transform
});
var sizeWidth = esm_style({
  prop: 'size',
  cssProperty: 'width',
  transform: sizing_transform
});
var sizeHeight = esm_style({
  prop: 'size',
  cssProperty: 'height',
  transform: sizing_transform
});
var boxSizing = esm_style({
  prop: 'boxSizing'
});
var sizing = esm_compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
/* harmony default export */ var esm_sizing = (sizing);
// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/spacing.js + 1 modules
var spacing = __webpack_require__(319);

// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/typography.js


var fontFamily = esm_style({
  prop: 'fontFamily',
  themeKey: 'typography'
});
var fontSize = esm_style({
  prop: 'fontSize',
  themeKey: 'typography'
});
var fontStyle = esm_style({
  prop: 'fontStyle',
  themeKey: 'typography'
});
var fontWeight = esm_style({
  prop: 'fontWeight',
  themeKey: 'typography'
});
var letterSpacing = esm_style({
  prop: 'letterSpacing'
});
var lineHeight = esm_style({
  prop: 'lineHeight'
});
var textAlign = esm_style({
  prop: 'textAlign'
});
var typography = esm_compose(fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign);
/* harmony default export */ var esm_typography = (typography);
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/styled.js + 1 modules
var styled = __webpack_require__(309);

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Box/Box.js


var Box_styleFunction = esm_styleFunctionSx(esm_compose(esm_borders, display, esm_flexbox, esm_grid, positions, esm_palette, shadows, esm_sizing, spacing["b" /* default */], esm_typography));
/**
 * @ignore - do not document.
 */

var Box = Object(styled["a" /* default */])('div')(Box_styleFunction, {
  name: 'MuiBox'
});
/* harmony default export */ var Box_Box = __webpack_exports__["a"] = (Box);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL2NvcmUvZXNtL3V0aWxzL2lzTXVpRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL3N0eWxlcy9lc20vc3R5bGVkL3N0eWxlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL2NvcmUvZXNtL3N0eWxlcy9zdHlsZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9jb3JlL2VzbS9MaXN0L0xpc3RDb250ZXh0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwtdWkvY29yZS9lc20vTGlzdC9MaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwtdWkvY29yZS9lc20vTGlzdEl0ZW0vTGlzdEl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9zeXN0ZW0vZXNtL3N0eWxlRnVuY3Rpb25TeC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL3N5c3RlbS9lc20vY29tcG9zZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL3N5c3RlbS9lc20vc3R5bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9zeXN0ZW0vZXNtL2JvcmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9zeXN0ZW0vZXNtL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9zeXN0ZW0vZXNtL2ZsZXhib3guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9zeXN0ZW0vZXNtL2dyaWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC11aS9zeXN0ZW0vZXNtL3Bvc2l0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL3N5c3RlbS9lc20vcGFsZXR0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL3N5c3RlbS9lc20vc2hhZG93cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsLXVpL3N5c3RlbS9lc20vc2l6aW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwtdWkvc3lzdGVtL2VzbS90eXBvZ3JhcGh5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwtdWkvY29yZS9lc20vQm94L0JveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDaEI7QUFDZixzQkFBc0Isb0RBQW9CO0FBQzFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0gwRDtBQUNnQztBQUNoRTtBQUNGO0FBQ1c7QUFDaUM7QUFDVDtBQUNwQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQztBQUNEOzs7QUFHZSxTQUFTLGFBQU07QUFDOUI7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixrREFBd0I7O0FBRWhELFFBQVEsS0FBZ0UsRUFBRSxFQUVyRTs7QUFFTDs7QUFFQSxRQUFRLEtBQXFDLEVBQUUsb0JBUzFDOztBQUVMO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQ0FBUTtBQUMvQjtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxvQkFBb0IscUNBQVUsa0JBQWtCLHNDQUFRO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztB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QzdDTztBQUNJO0FBQ3pCLGlCQUFpQixTQUFLO0FBQzdCO0FBQ0E7QUFDQSxDQUFDO0FBQ00sZUFBZSxTQUFLO0FBQzNCO0FBQ0E7QUFDQSxDQUFDO0FBQ00sZ0JBQWdCLFNBQUs7QUFDNUI7QUFDQTtBQUNBLENBQUM7QUFDTSxpQkFBaUIsU0FBSztBQUM3QjtBQUNBO0FBQ0EsQ0FBQztBQUNNLG9CQUFvQixTQUFLO0FBQ2hDO0FBQ0EsQ0FBQztBQUNNLGlCQUFpQixTQUFLO0FBQzdCO0FBQ0EsQ0FBQztBQUNNLGdCQUFnQixTQUFLO0FBQzVCO0FBQ0EsQ0FBQztBQUNELGlCQUFpQixXQUFPO0FBQ1QsNkRBQVUsRTs7Ozs7QUM1QmlJO0FBQ3BIO0FBQy9CLElBQUksaUJBQWEsR0FBRyxtQkFBZSxDQUFDLFdBQU8sQ0FBQyxXQUFPLEVBQUUsT0FBTyxFQUFFLFdBQU8sRUFBRSxRQUFJLEVBQUUsU0FBUyxFQUFFLFdBQU8sRUFBRSxPQUFPLEVBQUUsVUFBTSxFQUFFLDBCQUFPLEVBQUUsY0FBVTtBQUM1STtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxpQ0FBTSxRQUFRLGlCQUFhO0FBQ3JDO0FBQ0EsQ0FBQztBQUNjLDBFQUFHLEUiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTXVpRWxlbWVudChlbGVtZW50LCBtdWlOYW1lcykge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmlzVmFsaWRFbGVtZW50KGVsZW1lbnQpICYmIG11aU5hbWVzLmluZGV4T2YoZWxlbWVudC50eXBlLm11aU5hbWUpICE9PSAtMTtcbn0iLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsc3ggZnJvbSAnY2xzeCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY2hhaW5Qcm9wVHlwZXMsIGdldERpc3BsYXlOYW1lIH0gZnJvbSAnQG1hdGVyaWFsLXVpL3V0aWxzJztcbmltcG9ydCBob2lzdE5vblJlYWN0U3RhdGljcyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XG5pbXBvcnQgbWFrZVN0eWxlcyBmcm9tICcuLi9tYWtlU3R5bGVzJztcblxuZnVuY3Rpb24gb21pdChpbnB1dCwgZmllbGRzKSB7XG4gIHZhciBvdXRwdXQgPSB7fTtcbiAgT2JqZWN0LmtleXMoaW5wdXQpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoZmllbGRzLmluZGV4T2YocHJvcCkgPT09IC0xKSB7XG4gICAgICBvdXRwdXRbcHJvcF0gPSBpbnB1dFtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufSAvLyBzdHlsZWQtY29tcG9uZW50cydzIEFQSSByZW1vdmVzIHRoZSBtYXBwaW5nIGJldHdlZW4gY29tcG9uZW50cyBhbmQgc3R5bGVzLlxuLy8gVXNpbmcgY29tcG9uZW50cyBhcyBhIGxvdy1sZXZlbCBzdHlsaW5nIGNvbnN0cnVjdCBjYW4gYmUgc2ltcGxlci5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHlsZWQoQ29tcG9uZW50KSB7XG4gIHZhciBjb21wb25lbnRDcmVhdG9yID0gZnVuY3Rpb24gY29tcG9uZW50Q3JlYXRvcihzdHlsZSkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lLFxuICAgICAgICBzdHlsZXNPcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9wdGlvbnMsIFtcIm5hbWVcIl0pO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgQ29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihbJ1lvdSBhcmUgY2FsbGluZyBzdHlsZWQoQ29tcG9uZW50KShzdHlsZSkgd2l0aCBhbiB1bmRlZmluZWQgY29tcG9uZW50LicsICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIGltcG9ydCBpdC4nXS5qb2luKCdcXG4nKSk7XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzTmFtZVByZWZpeCA9IG5hbWU7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIC8vIFByb3ZpZGUgYSBiZXR0ZXIgRFggb3V0c2lkZSBwcm9kdWN0aW9uLlxuICAgICAgICB2YXIgZGlzcGxheU5hbWUgPSBnZXREaXNwbGF5TmFtZShDb21wb25lbnQpO1xuXG4gICAgICAgIGlmIChkaXNwbGF5TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY2xhc3NOYW1lUHJlZml4ID0gZGlzcGxheU5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3R5bGVzT3JDcmVhdG9yID0gdHlwZW9mIHN0eWxlID09PSAnZnVuY3Rpb24nID8gZnVuY3Rpb24gKHRoZW1lKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByb290OiBmdW5jdGlvbiByb290KHByb3BzKSB7XG4gICAgICAgICAgcmV0dXJuIHN0eWxlKF9leHRlbmRzKHtcbiAgICAgICAgICAgIHRoZW1lOiB0aGVtZVxuICAgICAgICAgIH0sIHByb3BzKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSA6IHtcbiAgICAgIHJvb3Q6IHN0eWxlXG4gICAgfTtcbiAgICB2YXIgdXNlU3R5bGVzID0gbWFrZVN0eWxlcyhzdHlsZXNPckNyZWF0b3IsIF9leHRlbmRzKHtcbiAgICAgIENvbXBvbmVudDogQ29tcG9uZW50LFxuICAgICAgbmFtZTogbmFtZSB8fCBDb21wb25lbnQuZGlzcGxheU5hbWUsXG4gICAgICBjbGFzc05hbWVQcmVmaXg6IGNsYXNzTmFtZVByZWZpeFxuICAgIH0sIHN0eWxlc09wdGlvbnMpKTtcbiAgICB2YXIgZmlsdGVyUHJvcHM7XG4gICAgdmFyIHByb3BUeXBlcyA9IHt9O1xuXG4gICAgaWYgKHN0eWxlLmZpbHRlclByb3BzKSB7XG4gICAgICBmaWx0ZXJQcm9wcyA9IHN0eWxlLmZpbHRlclByb3BzO1xuICAgICAgZGVsZXRlIHN0eWxlLmZpbHRlclByb3BzO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9mb3JiaWQtZm9yZWlnbi1wcm9wLXR5cGVzICovXG5cblxuICAgIGlmIChzdHlsZS5wcm9wVHlwZXMpIHtcbiAgICAgIHByb3BUeXBlcyA9IHN0eWxlLnByb3BUeXBlcztcbiAgICAgIGRlbGV0ZSBzdHlsZS5wcm9wVHlwZXM7XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QvZm9yYmlkLWZvcmVpZ24tcHJvcC10eXBlcyAqL1xuXG5cbiAgICB2YXIgU3R5bGVkQ29tcG9uZW50ID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gU3R5bGVkQ29tcG9uZW50KHByb3BzLCByZWYpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgICAgIGNsYXNzTmFtZVByb3AgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgY2xvbmUgPSBwcm9wcy5jbG9uZSxcbiAgICAgICAgICBDb21wb25lbnRQcm9wID0gcHJvcHMuY29tcG9uZW50LFxuICAgICAgICAgIG90aGVyID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbXCJjaGlsZHJlblwiLCBcImNsYXNzTmFtZVwiLCBcImNsb25lXCIsIFwiY29tcG9uZW50XCJdKTtcblxuICAgICAgdmFyIGNsYXNzZXMgPSB1c2VTdHlsZXMocHJvcHMpO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IGNsc3goY2xhc3Nlcy5yb290LCBjbGFzc05hbWVQcm9wKTtcbiAgICAgIHZhciBzcHJlYWQgPSBvdGhlcjtcblxuICAgICAgaWYgKGZpbHRlclByb3BzKSB7XG4gICAgICAgIHNwcmVhZCA9IG9taXQoc3ByZWFkLCBmaWx0ZXJQcm9wcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjbG9uZSkge1xuICAgICAgICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNsb25lRWxlbWVudChjaGlsZHJlbiwgX2V4dGVuZHMoe1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xzeChjaGlsZHJlbi5wcm9wcy5jbGFzc05hbWUsIGNsYXNzTmFtZSlcbiAgICAgICAgfSwgc3ByZWFkKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuKF9leHRlbmRzKHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZVxuICAgICAgICB9LCBzcHJlYWQpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIEZpbmFsQ29tcG9uZW50ID0gQ29tcG9uZW50UHJvcCB8fCBDb21wb25lbnQ7XG4gICAgICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoRmluYWxDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICAgICAgcmVmOiByZWYsXG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gICAgICB9LCBzcHJlYWQpLCBjaGlsZHJlbik7XG4gICAgfSk7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gU3R5bGVkQ29tcG9uZW50LnByb3BUeXBlcyA9IF9leHRlbmRzKHtcbiAgICAgIC8qKlxuICAgICAgICogQSByZW5kZXIgZnVuY3Rpb24gb3Igbm9kZS5cbiAgICAgICAqL1xuICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ub2RlLCBQcm9wVHlwZXMuZnVuY10pLFxuXG4gICAgICAvKipcbiAgICAgICAqIEBpZ25vcmVcbiAgICAgICAqL1xuICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgICAvKipcbiAgICAgICAqIElmIGB0cnVlYCwgdGhlIGNvbXBvbmVudCB3aWxsIHJlY3ljbGUgaXQncyBjaGlsZHJlbiBIVE1MIGVsZW1lbnQuXG4gICAgICAgKiBJdCdzIHVzaW5nIGBSZWFjdC5jbG9uZUVsZW1lbnRgIGludGVybmFsbHkuXG4gICAgICAgKlxuICAgICAgICogVGhpcyBwcm9wIHdpbGwgYmUgZGVwcmVjYXRlZCBhbmQgcmVtb3ZlZCBpbiB2NVxuICAgICAgICovXG4gICAgICBjbG9uZTogY2hhaW5Qcm9wVHlwZXMoUHJvcFR5cGVzLmJvb2wsIGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuY2xvbmUgJiYgcHJvcHMuY29tcG9uZW50KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignWW91IGNhbiBub3QgdXNlIHRoZSBjbG9uZSBhbmQgY29tcG9uZW50IHByb3AgYXQgdGhlIHNhbWUgdGltZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSksXG5cbiAgICAgIC8qKlxuICAgICAgICogVGhlIGNvbXBvbmVudCB1c2VkIGZvciB0aGUgcm9vdCBub2RlLlxuICAgICAgICogRWl0aGVyIGEgc3RyaW5nIHRvIHVzZSBhIEhUTUwgZWxlbWVudCBvciBhIGNvbXBvbmVudC5cbiAgICAgICAqL1xuICAgICAgY29tcG9uZW50OiBQcm9wVHlwZXNcbiAgICAgIC8qIEB0eXBlc2NyaXB0LXRvLXByb3B0eXBlcy1pZ25vcmUgKi9cbiAgICAgIC5lbGVtZW50VHlwZVxuICAgIH0sIHByb3BUeXBlcykgOiB2b2lkIDA7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgU3R5bGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gXCJTdHlsZWQoXCIuY29uY2F0KGNsYXNzTmFtZVByZWZpeCwgXCIpXCIpO1xuICAgIH1cblxuICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKFN0eWxlZENvbXBvbmVudCwgQ29tcG9uZW50KTtcbiAgICByZXR1cm4gU3R5bGVkQ29tcG9uZW50O1xuICB9O1xuXG4gIHJldHVybiBjb21wb25lbnRDcmVhdG9yO1xufSIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IHsgc3R5bGVkIGFzIHN0eWxlZFdpdGhvdXREZWZhdWx0IH0gZnJvbSAnQG1hdGVyaWFsLXVpL3N0eWxlcyc7XG5pbXBvcnQgZGVmYXVsdFRoZW1lIGZyb20gJy4vZGVmYXVsdFRoZW1lJztcblxudmFyIHN0eWxlZCA9IGZ1bmN0aW9uIHN0eWxlZChDb21wb25lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENyZWF0b3IgPSBzdHlsZWRXaXRob3V0RGVmYXVsdChDb21wb25lbnQpO1xuICByZXR1cm4gZnVuY3Rpb24gKHN0eWxlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudENyZWF0b3Ioc3R5bGUsIF9leHRlbmRzKHtcbiAgICAgIGRlZmF1bHRUaGVtZTogZGVmYXVsdFRoZW1lXG4gICAgfSwgb3B0aW9ucykpO1xuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVkOyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogQGlnbm9yZSAtIGludGVybmFsIGNvbXBvbmVudC5cbiAqL1xuXG52YXIgTGlzdENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KHt9KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgTGlzdENvbnRleHQuZGlzcGxheU5hbWUgPSAnTGlzdENvbnRleHQnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0Q29udGV4dDsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsc3ggZnJvbSAnY2xzeCc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICcuLi9zdHlsZXMvd2l0aFN0eWxlcyc7XG5pbXBvcnQgTGlzdENvbnRleHQgZnJvbSAnLi9MaXN0Q29udGV4dCc7XG5leHBvcnQgdmFyIHN0eWxlcyA9IHtcbiAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudC4gKi9cbiAgcm9vdDoge1xuICAgIGxpc3RTdHlsZTogJ25vbmUnLFxuICAgIG1hcmdpbjogMCxcbiAgICBwYWRkaW5nOiAwLFxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gIH0sXG5cbiAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgZGlzYWJsZVBhZGRpbmc9e2ZhbHNlfWAuICovXG4gIHBhZGRpbmc6IHtcbiAgICBwYWRkaW5nVG9wOiA4LFxuICAgIHBhZGRpbmdCb3R0b206IDhcbiAgfSxcblxuICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgcm9vdCBlbGVtZW50IGlmIGRlbnNlLiAqL1xuICBkZW5zZToge30sXG5cbiAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBhIGBzdWJoZWFkZXJgIGlzIHByb3ZpZGVkLiAqL1xuICBzdWJoZWFkZXI6IHtcbiAgICBwYWRkaW5nVG9wOiAwXG4gIH1cbn07XG52YXIgTGlzdCA9IC8qI19fUFVSRV9fKi9SZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIExpc3QocHJvcHMsIHJlZikge1xuICB2YXIgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbixcbiAgICAgIGNsYXNzZXMgPSBwcm9wcy5jbGFzc2VzLFxuICAgICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgX3Byb3BzJGNvbXBvbmVudCA9IHByb3BzLmNvbXBvbmVudCxcbiAgICAgIENvbXBvbmVudCA9IF9wcm9wcyRjb21wb25lbnQgPT09IHZvaWQgMCA/ICd1bCcgOiBfcHJvcHMkY29tcG9uZW50LFxuICAgICAgX3Byb3BzJGRlbnNlID0gcHJvcHMuZGVuc2UsXG4gICAgICBkZW5zZSA9IF9wcm9wcyRkZW5zZSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkZGVuc2UsXG4gICAgICBfcHJvcHMkZGlzYWJsZVBhZGRpbmcgPSBwcm9wcy5kaXNhYmxlUGFkZGluZyxcbiAgICAgIGRpc2FibGVQYWRkaW5nID0gX3Byb3BzJGRpc2FibGVQYWRkaW5nID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wcm9wcyRkaXNhYmxlUGFkZGluZyxcbiAgICAgIHN1YmhlYWRlciA9IHByb3BzLnN1YmhlYWRlcixcbiAgICAgIG90aGVyID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbXCJjaGlsZHJlblwiLCBcImNsYXNzZXNcIiwgXCJjbGFzc05hbWVcIiwgXCJjb21wb25lbnRcIiwgXCJkZW5zZVwiLCBcImRpc2FibGVQYWRkaW5nXCIsIFwic3ViaGVhZGVyXCJdKTtcblxuICB2YXIgY29udGV4dCA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZW5zZTogZGVuc2VcbiAgICB9O1xuICB9LCBbZGVuc2VdKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KExpc3RDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IGNvbnRleHRcbiAgfSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBfZXh0ZW5kcyh7XG4gICAgY2xhc3NOYW1lOiBjbHN4KGNsYXNzZXMucm9vdCwgY2xhc3NOYW1lLCBkZW5zZSAmJiBjbGFzc2VzLmRlbnNlLCAhZGlzYWJsZVBhZGRpbmcgJiYgY2xhc3Nlcy5wYWRkaW5nLCBzdWJoZWFkZXIgJiYgY2xhc3Nlcy5zdWJoZWFkZXIpLFxuICAgIHJlZjogcmVmXG4gIH0sIG90aGVyKSwgc3ViaGVhZGVyLCBjaGlsZHJlbikpO1xufSk7XG5wcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBMaXN0LnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIFRoZSBjb250ZW50IG9mIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIG9yIGV4dGVuZCB0aGUgc3R5bGVzIGFwcGxpZWQgdG8gdGhlIGNvbXBvbmVudC5cbiAgICogU2VlIFtDU1MgQVBJXSgjY3NzKSBiZWxvdyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKi9cbiAgY2xhc3NlczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBAaWdub3JlXG4gICAqL1xuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIFRoZSBjb21wb25lbnQgdXNlZCBmb3IgdGhlIHJvb3Qgbm9kZS5cbiAgICogRWl0aGVyIGEgc3RyaW5nIHRvIHVzZSBhIEhUTUwgZWxlbWVudCBvciBhIGNvbXBvbmVudC5cbiAgICovXG4gIGNvbXBvbmVudDogUHJvcFR5cGVzXG4gIC8qIEB0eXBlc2NyaXB0LXRvLXByb3B0eXBlcy1pZ25vcmUgKi9cbiAgLmVsZW1lbnRUeXBlLFxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGNvbXBhY3QgdmVydGljYWwgcGFkZGluZyBkZXNpZ25lZCBmb3Iga2V5Ym9hcmQgYW5kIG1vdXNlIGlucHV0IHdpbGwgYmUgdXNlZCBmb3JcbiAgICogdGhlIGxpc3QgYW5kIGxpc3QgaXRlbXMuXG4gICAqIFRoZSBwcm9wIGlzIGF2YWlsYWJsZSB0byBkZXNjZW5kYW50IGNvbXBvbmVudHMgYXMgdGhlIGBkZW5zZWAgY29udGV4dC5cbiAgICovXG4gIGRlbnNlOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB2ZXJ0aWNhbCBwYWRkaW5nIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBsaXN0LlxuICAgKi9cbiAgZGlzYWJsZVBhZGRpbmc6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBUaGUgY29udGVudCBvZiB0aGUgc3ViaGVhZGVyLCBub3JtYWxseSBgTGlzdFN1YmhlYWRlcmAuXG4gICAqL1xuICBzdWJoZWFkZXI6IFByb3BUeXBlcy5ub2RlXG59IDogdm9pZCAwO1xuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzdHlsZXMsIHtcbiAgbmFtZTogJ011aUxpc3QnXG59KShMaXN0KTsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsc3ggZnJvbSAnY2xzeCc7XG5pbXBvcnQgeyBjaGFpblByb3BUeXBlcyB9IGZyb20gJ0BtYXRlcmlhbC11aS91dGlscyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICcuLi9zdHlsZXMvd2l0aFN0eWxlcyc7XG5pbXBvcnQgQnV0dG9uQmFzZSBmcm9tICcuLi9CdXR0b25CYXNlJztcbmltcG9ydCBpc011aUVsZW1lbnQgZnJvbSAnLi4vdXRpbHMvaXNNdWlFbGVtZW50JztcbmltcG9ydCB1c2VGb3JrUmVmIGZyb20gJy4uL3V0aWxzL3VzZUZvcmtSZWYnO1xuaW1wb3J0IExpc3RDb250ZXh0IGZyb20gJy4uL0xpc3QvTGlzdENvbnRleHQnO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmV4cG9ydCB2YXIgc3R5bGVzID0gZnVuY3Rpb24gc3R5bGVzKHRoZW1lKSB7XG4gIHJldHVybiB7XG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIChub3JtYWxseSByb290KSBgY29tcG9uZW50YCBlbGVtZW50LiBNYXkgYmUgd3JhcHBlZCBieSBhIGBjb250YWluZXJgLiAqL1xuICAgIHJvb3Q6IHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1zdGFydCcsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgcGFkZGluZ1RvcDogOCxcbiAgICAgIHBhZGRpbmdCb3R0b206IDgsXG4gICAgICAnJiRmb2N1c1Zpc2libGUnOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUucGFsZXR0ZS5hY3Rpb24uc2VsZWN0ZWRcbiAgICAgIH0sXG4gICAgICAnJiRzZWxlY3RlZCwgJiRzZWxlY3RlZDpob3Zlcic6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLmFjdGlvbi5zZWxlY3RlZFxuICAgICAgfSxcbiAgICAgICcmJGRpc2FibGVkJzoge1xuICAgICAgICBvcGFjaXR5OiAwLjVcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIGBjb250YWluZXJgIGVsZW1lbnQgaWYgYGNoaWxkcmVuYCBpbmNsdWRlcyBgTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb25gLiAqL1xuICAgIGNvbnRhaW5lcjoge1xuICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICB9LFxuXG4gICAgLyogUHNldWRvLWNsYXNzIGFwcGxpZWQgdG8gdGhlIGBjb21wb25lbnRgJ3MgYGZvY3VzVmlzaWJsZUNsYXNzTmFtZWAgcHJvcCBpZiBgYnV0dG9uPXt0cnVlfWAuICovXG4gICAgZm9jdXNWaXNpYmxlOiB7fSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBgY29tcG9uZW50YCBlbGVtZW50IGlmIGRlbnNlLiAqL1xuICAgIGRlbnNlOiB7XG4gICAgICBwYWRkaW5nVG9wOiA0LFxuICAgICAgcGFkZGluZ0JvdHRvbTogNFxuICAgIH0sXG5cbiAgICAvKiBTdHlsZXMgYXBwbGllZCB0byB0aGUgYGNvbXBvbmVudGAgZWxlbWVudCBpZiBgYWxpZ25JdGVtcz1cImZsZXgtc3RhcnRcImAuICovXG4gICAgYWxpZ25JdGVtc0ZsZXhTdGFydDoge1xuICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnXG4gICAgfSxcblxuICAgIC8qIFBzZXVkby1jbGFzcyBhcHBsaWVkIHRvIHRoZSBpbm5lciBgY29tcG9uZW50YCBlbGVtZW50IGlmIGBkaXNhYmxlZD17dHJ1ZX1gLiAqL1xuICAgIGRpc2FibGVkOiB7fSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBpbm5lciBgY29tcG9uZW50YCBlbGVtZW50IGlmIGBkaXZpZGVyPXt0cnVlfWAuICovXG4gICAgZGl2aWRlcjoge1xuICAgICAgYm9yZGVyQm90dG9tOiBcIjFweCBzb2xpZCBcIi5jb25jYXQodGhlbWUucGFsZXR0ZS5kaXZpZGVyKSxcbiAgICAgIGJhY2tncm91bmRDbGlwOiAncGFkZGluZy1ib3gnXG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBpbm5lciBgY29tcG9uZW50YCBlbGVtZW50IGlmIGBkaXNhYmxlR3V0dGVycz17ZmFsc2V9YC4gKi9cbiAgICBndXR0ZXJzOiB7XG4gICAgICBwYWRkaW5nTGVmdDogMTYsXG4gICAgICBwYWRkaW5nUmlnaHQ6IDE2XG4gICAgfSxcblxuICAgIC8qIFN0eWxlcyBhcHBsaWVkIHRvIHRoZSBpbm5lciBgY29tcG9uZW50YCBlbGVtZW50IGlmIGBidXR0b249e3RydWV9YC4gKi9cbiAgICBidXR0b246IHtcbiAgICAgIHRyYW5zaXRpb246IHRoZW1lLnRyYW5zaXRpb25zLmNyZWF0ZSgnYmFja2dyb3VuZC1jb2xvcicsIHtcbiAgICAgICAgZHVyYXRpb246IHRoZW1lLnRyYW5zaXRpb25zLmR1cmF0aW9uLnNob3J0ZXN0XG4gICAgICB9KSxcbiAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUuYWN0aW9uLmhvdmVyLFxuICAgICAgICAvLyBSZXNldCBvbiB0b3VjaCBkZXZpY2VzLCBpdCBkb2Vzbid0IGFkZCBzcGVjaWZpY2l0eVxuICAgICAgICAnQG1lZGlhIChob3Zlcjogbm9uZSknOiB7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyogU3R5bGVzIGFwcGxpZWQgdG8gdGhlIGBjb21wb25lbnRgIGVsZW1lbnQgaWYgYGNoaWxkcmVuYCBpbmNsdWRlcyBgTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb25gLiAqL1xuICAgIHNlY29uZGFyeUFjdGlvbjoge1xuICAgICAgLy8gQWRkIHNvbWUgc3BhY2UgdG8gYXZvaWQgY29sbGlzaW9uIGFzIGBMaXN0SXRlbVNlY29uZGFyeUFjdGlvbmBcbiAgICAgIC8vIGlzIGFic29sdXRlbHkgcG9zaXRpb25lZC5cbiAgICAgIHBhZGRpbmdSaWdodDogNDhcbiAgICB9LFxuXG4gICAgLyogUHNldWRvLWNsYXNzIGFwcGxpZWQgdG8gdGhlIHJvb3QgZWxlbWVudCBpZiBgc2VsZWN0ZWQ9e3RydWV9YC4gKi9cbiAgICBzZWxlY3RlZDoge31cbiAgfTtcbn07XG52YXIgdXNlRW5oYW5jZWRFZmZlY3QgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IFJlYWN0LnVzZUVmZmVjdCA6IFJlYWN0LnVzZUxheW91dEVmZmVjdDtcbi8qKlxuICogVXNlcyBhbiBhZGRpdGlvbmFsIGNvbnRhaW5lciBjb21wb25lbnQgaWYgYExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uYCBpcyB0aGUgbGFzdCBjaGlsZC5cbiAqL1xuXG52YXIgTGlzdEl0ZW0gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiBMaXN0SXRlbShwcm9wcywgcmVmKSB7XG4gIHZhciBfcHJvcHMkYWxpZ25JdGVtcyA9IHByb3BzLmFsaWduSXRlbXMsXG4gICAgICBhbGlnbkl0ZW1zID0gX3Byb3BzJGFsaWduSXRlbXMgPT09IHZvaWQgMCA/ICdjZW50ZXInIDogX3Byb3BzJGFsaWduSXRlbXMsXG4gICAgICBfcHJvcHMkYXV0b0ZvY3VzID0gcHJvcHMuYXV0b0ZvY3VzLFxuICAgICAgYXV0b0ZvY3VzID0gX3Byb3BzJGF1dG9Gb2N1cyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkYXV0b0ZvY3VzLFxuICAgICAgX3Byb3BzJGJ1dHRvbiA9IHByb3BzLmJ1dHRvbixcbiAgICAgIGJ1dHRvbiA9IF9wcm9wcyRidXR0b24gPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGJ1dHRvbixcbiAgICAgIGNoaWxkcmVuUHJvcCA9IHByb3BzLmNoaWxkcmVuLFxuICAgICAgY2xhc3NlcyA9IHByb3BzLmNsYXNzZXMsXG4gICAgICBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBjb21wb25lbnRQcm9wID0gcHJvcHMuY29tcG9uZW50LFxuICAgICAgX3Byb3BzJENvbnRhaW5lckNvbXBvID0gcHJvcHMuQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgQ29udGFpbmVyQ29tcG9uZW50ID0gX3Byb3BzJENvbnRhaW5lckNvbXBvID09PSB2b2lkIDAgPyAnbGknIDogX3Byb3BzJENvbnRhaW5lckNvbXBvLFxuICAgICAgX3Byb3BzJENvbnRhaW5lclByb3BzID0gcHJvcHMuQ29udGFpbmVyUHJvcHM7XG4gIF9wcm9wcyRDb250YWluZXJQcm9wcyA9IF9wcm9wcyRDb250YWluZXJQcm9wcyA9PT0gdm9pZCAwID8ge30gOiBfcHJvcHMkQ29udGFpbmVyUHJvcHM7XG5cbiAgdmFyIENvbnRhaW5lckNsYXNzTmFtZSA9IF9wcm9wcyRDb250YWluZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICBDb250YWluZXJQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHMkQ29udGFpbmVyUHJvcHMsIFtcImNsYXNzTmFtZVwiXSksXG4gICAgICBfcHJvcHMkZGVuc2UgPSBwcm9wcy5kZW5zZSxcbiAgICAgIGRlbnNlID0gX3Byb3BzJGRlbnNlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wcm9wcyRkZW5zZSxcbiAgICAgIF9wcm9wcyRkaXNhYmxlZCA9IHByb3BzLmRpc2FibGVkLFxuICAgICAgZGlzYWJsZWQgPSBfcHJvcHMkZGlzYWJsZWQgPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGRpc2FibGVkLFxuICAgICAgX3Byb3BzJGRpc2FibGVHdXR0ZXJzID0gcHJvcHMuZGlzYWJsZUd1dHRlcnMsXG4gICAgICBkaXNhYmxlR3V0dGVycyA9IF9wcm9wcyRkaXNhYmxlR3V0dGVycyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcHJvcHMkZGlzYWJsZUd1dHRlcnMsXG4gICAgICBfcHJvcHMkZGl2aWRlciA9IHByb3BzLmRpdmlkZXIsXG4gICAgICBkaXZpZGVyID0gX3Byb3BzJGRpdmlkZXIgPT09IHZvaWQgMCA/IGZhbHNlIDogX3Byb3BzJGRpdmlkZXIsXG4gICAgICBmb2N1c1Zpc2libGVDbGFzc05hbWUgPSBwcm9wcy5mb2N1c1Zpc2libGVDbGFzc05hbWUsXG4gICAgICBfcHJvcHMkc2VsZWN0ZWQgPSBwcm9wcy5zZWxlY3RlZCxcbiAgICAgIHNlbGVjdGVkID0gX3Byb3BzJHNlbGVjdGVkID09PSB2b2lkIDAgPyBmYWxzZSA6IF9wcm9wcyRzZWxlY3RlZCxcbiAgICAgIG90aGVyID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBbXCJhbGlnbkl0ZW1zXCIsIFwiYXV0b0ZvY3VzXCIsIFwiYnV0dG9uXCIsIFwiY2hpbGRyZW5cIiwgXCJjbGFzc2VzXCIsIFwiY2xhc3NOYW1lXCIsIFwiY29tcG9uZW50XCIsIFwiQ29udGFpbmVyQ29tcG9uZW50XCIsIFwiQ29udGFpbmVyUHJvcHNcIiwgXCJkZW5zZVwiLCBcImRpc2FibGVkXCIsIFwiZGlzYWJsZUd1dHRlcnNcIiwgXCJkaXZpZGVyXCIsIFwiZm9jdXNWaXNpYmxlQ2xhc3NOYW1lXCIsIFwic2VsZWN0ZWRcIl0pO1xuXG4gIHZhciBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChMaXN0Q29udGV4dCk7XG4gIHZhciBjaGlsZENvbnRleHQgPSB7XG4gICAgZGVuc2U6IGRlbnNlIHx8IGNvbnRleHQuZGVuc2UgfHwgZmFsc2UsXG4gICAgYWxpZ25JdGVtczogYWxpZ25JdGVtc1xuICB9O1xuICB2YXIgbGlzdEl0ZW1SZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIHVzZUVuaGFuY2VkRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoYXV0b0ZvY3VzKSB7XG4gICAgICBpZiAobGlzdEl0ZW1SZWYuY3VycmVudCkge1xuICAgICAgICBsaXN0SXRlbVJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTWF0ZXJpYWwtVUk6IFVuYWJsZSB0byBzZXQgZm9jdXMgdG8gYSBMaXN0SXRlbSB3aG9zZSBjb21wb25lbnQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkLicpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW2F1dG9Gb2N1c10pO1xuICB2YXIgY2hpbGRyZW4gPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuUHJvcCk7XG4gIHZhciBoYXNTZWNvbmRhcnlBY3Rpb24gPSBjaGlsZHJlbi5sZW5ndGggJiYgaXNNdWlFbGVtZW50KGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdLCBbJ0xpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uJ10pO1xuICB2YXIgaGFuZGxlT3duUmVmID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgLy8gI1N0cmljdE1vZGUgcmVhZHlcbiAgICBsaXN0SXRlbVJlZi5jdXJyZW50ID0gUmVhY3RET00uZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICB9LCBbXSk7XG4gIHZhciBoYW5kbGVSZWYgPSB1c2VGb3JrUmVmKGhhbmRsZU93blJlZiwgcmVmKTtcblxuICB2YXIgY29tcG9uZW50UHJvcHMgPSBfZXh0ZW5kcyh7XG4gICAgY2xhc3NOYW1lOiBjbHN4KGNsYXNzZXMucm9vdCwgY2xhc3NOYW1lLCBjaGlsZENvbnRleHQuZGVuc2UgJiYgY2xhc3Nlcy5kZW5zZSwgIWRpc2FibGVHdXR0ZXJzICYmIGNsYXNzZXMuZ3V0dGVycywgZGl2aWRlciAmJiBjbGFzc2VzLmRpdmlkZXIsIGRpc2FibGVkICYmIGNsYXNzZXMuZGlzYWJsZWQsIGJ1dHRvbiAmJiBjbGFzc2VzLmJ1dHRvbiwgYWxpZ25JdGVtcyAhPT0gXCJjZW50ZXJcIiAmJiBjbGFzc2VzLmFsaWduSXRlbXNGbGV4U3RhcnQsIGhhc1NlY29uZGFyeUFjdGlvbiAmJiBjbGFzc2VzLnNlY29uZGFyeUFjdGlvbiwgc2VsZWN0ZWQgJiYgY2xhc3Nlcy5zZWxlY3RlZCksXG4gICAgZGlzYWJsZWQ6IGRpc2FibGVkXG4gIH0sIG90aGVyKTtcblxuICB2YXIgQ29tcG9uZW50ID0gY29tcG9uZW50UHJvcCB8fCAnbGknO1xuXG4gIGlmIChidXR0b24pIHtcbiAgICBjb21wb25lbnRQcm9wcy5jb21wb25lbnQgPSBjb21wb25lbnRQcm9wIHx8ICdkaXYnO1xuICAgIGNvbXBvbmVudFByb3BzLmZvY3VzVmlzaWJsZUNsYXNzTmFtZSA9IGNsc3goY2xhc3Nlcy5mb2N1c1Zpc2libGUsIGZvY3VzVmlzaWJsZUNsYXNzTmFtZSk7XG4gICAgQ29tcG9uZW50ID0gQnV0dG9uQmFzZTtcbiAgfVxuXG4gIGlmIChoYXNTZWNvbmRhcnlBY3Rpb24pIHtcbiAgICAvLyBVc2UgZGl2IGJ5IGRlZmF1bHQuXG4gICAgQ29tcG9uZW50ID0gIWNvbXBvbmVudFByb3BzLmNvbXBvbmVudCAmJiAhY29tcG9uZW50UHJvcCA/ICdkaXYnIDogQ29tcG9uZW50OyAvLyBBdm9pZCBuZXN0aW5nIG9mIGxpID4gbGkuXG5cbiAgICBpZiAoQ29udGFpbmVyQ29tcG9uZW50ID09PSAnbGknKSB7XG4gICAgICBpZiAoQ29tcG9uZW50ID09PSAnbGknKSB7XG4gICAgICAgIENvbXBvbmVudCA9ICdkaXYnO1xuICAgICAgfSBlbHNlIGlmIChjb21wb25lbnRQcm9wcy5jb21wb25lbnQgPT09ICdsaScpIHtcbiAgICAgICAgY29tcG9uZW50UHJvcHMuY29tcG9uZW50ID0gJ2Rpdic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KExpc3RDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgICB2YWx1ZTogY2hpbGRDb250ZXh0XG4gICAgfSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGFpbmVyQ29tcG9uZW50LCBfZXh0ZW5kcyh7XG4gICAgICBjbGFzc05hbWU6IGNsc3goY2xhc3Nlcy5jb250YWluZXIsIENvbnRhaW5lckNsYXNzTmFtZSksXG4gICAgICByZWY6IGhhbmRsZVJlZlxuICAgIH0sIENvbnRhaW5lclByb3BzKSwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBjb21wb25lbnRQcm9wcywgY2hpbGRyZW4pLCBjaGlsZHJlbi5wb3AoKSkpO1xuICB9XG5cbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KExpc3RDb250ZXh0LlByb3ZpZGVyLCB7XG4gICAgdmFsdWU6IGNoaWxkQ29udGV4dFxuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIF9leHRlbmRzKHtcbiAgICByZWY6IGhhbmRsZVJlZlxuICB9LCBjb21wb25lbnRQcm9wcyksIGNoaWxkcmVuKSk7XG59KTtcbnByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IExpc3RJdGVtLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIGBhbGlnbi1pdGVtc2Agc3R5bGUgcHJvcGVydHkuXG4gICAqL1xuICBhbGlnbkl0ZW1zOiBQcm9wVHlwZXMub25lT2YoWydmbGV4LXN0YXJ0JywgJ2NlbnRlciddKSxcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgbGlzdCBpdGVtIHdpbGwgYmUgZm9jdXNlZCBkdXJpbmcgdGhlIGZpcnN0IG1vdW50LlxuICAgKiBGb2N1cyB3aWxsIGFsc28gYmUgdHJpZ2dlcmVkIGlmIHRoZSB2YWx1ZSBjaGFuZ2VzIGZyb20gZmFsc2UgdG8gdHJ1ZS5cbiAgICovXG4gIGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGxpc3QgaXRlbSB3aWxsIGJlIGEgYnV0dG9uICh1c2luZyBgQnV0dG9uQmFzZWApLiBQcm9wcyBpbnRlbmRlZFxuICAgKiBmb3IgYEJ1dHRvbkJhc2VgIGNhbiB0aGVuIGJlIGFwcGxpZWQgdG8gYExpc3RJdGVtYC5cbiAgICovXG4gIGJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIFRoZSBjb250ZW50IG9mIHRoZSBjb21wb25lbnQuIElmIGEgYExpc3RJdGVtU2Vjb25kYXJ5QWN0aW9uYCBpcyB1c2VkIGl0IG11c3RcbiAgICogYmUgdGhlIGxhc3QgY2hpbGQuXG4gICAqL1xuICBjaGlsZHJlbjogY2hhaW5Qcm9wVHlwZXMoUHJvcFR5cGVzLm5vZGUsIGZ1bmN0aW9uIChwcm9wcykge1xuICAgIHZhciBjaGlsZHJlbiA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkocHJvcHMuY2hpbGRyZW4pOyAvLyBSZWFjdC5DaGlsZHJlbi50b0FycmF5KHByb3BzLmNoaWxkcmVuKS5maW5kTGFzdEluZGV4KGlzTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24pXG5cbiAgICB2YXIgc2Vjb25kYXJ5QWN0aW9uSW5kZXggPSAtMTtcblxuICAgIGZvciAodmFyIGkgPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG5cbiAgICAgIGlmIChpc011aUVsZW1lbnQoY2hpbGQsIFsnTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb24nXSkpIHtcbiAgICAgICAgc2Vjb25kYXJ5QWN0aW9uSW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IC8vICBpcyBMaXN0SXRlbVNlY29uZGFyeUFjdGlvbiB0aGUgbGFzdCBjaGlsZCBvZiBMaXN0SXRlbVxuXG5cbiAgICBpZiAoc2Vjb25kYXJ5QWN0aW9uSW5kZXggIT09IC0xICYmIHNlY29uZGFyeUFjdGlvbkluZGV4ICE9PSBjaGlsZHJlbi5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdNYXRlcmlhbC1VSTogWW91IHVzZWQgYW4gZWxlbWVudCBhZnRlciBMaXN0SXRlbVNlY29uZGFyeUFjdGlvbi4gJyArICdGb3IgTGlzdEl0ZW0gdG8gZGV0ZWN0IHRoYXQgaXQgaGFzIGEgc2Vjb25kYXJ5IGFjdGlvbiAnICsgJ3lvdSBtdXN0IHBhc3MgaXQgYXMgdGhlIGxhc3QgY2hpbGQgdG8gTGlzdEl0ZW0uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0pLFxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSBvciBleHRlbmQgdGhlIHN0eWxlcyBhcHBsaWVkIHRvIHRoZSBjb21wb25lbnQuXG4gICAqIFNlZSBbQ1NTIEFQSV0oI2NzcykgYmVsb3cgZm9yIG1vcmUgZGV0YWlscy5cbiAgICovXG4gIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQGlnbm9yZVxuICAgKi9cbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBUaGUgY29tcG9uZW50IHVzZWQgZm9yIHRoZSByb290IG5vZGUuXG4gICAqIEVpdGhlciBhIHN0cmluZyB0byB1c2UgYSBIVE1MIGVsZW1lbnQgb3IgYSBjb21wb25lbnQuXG4gICAqIEJ5IGRlZmF1bHQsIGl0J3MgYSBgbGlgIHdoZW4gYGJ1dHRvbmAgaXMgYGZhbHNlYCBhbmQgYSBgZGl2YCB3aGVuIGBidXR0b25gIGlzIGB0cnVlYC5cbiAgICovXG4gIGNvbXBvbmVudDogUHJvcFR5cGVzXG4gIC8qIEB0eXBlc2NyaXB0LXRvLXByb3B0eXBlcy1pZ25vcmUgKi9cbiAgLmVsZW1lbnRUeXBlLFxuXG4gIC8qKlxuICAgKiBUaGUgY29udGFpbmVyIGNvbXBvbmVudCB1c2VkIHdoZW4gYSBgTGlzdEl0ZW1TZWNvbmRhcnlBY3Rpb25gIGlzIHRoZSBsYXN0IGNoaWxkLlxuICAgKi9cbiAgQ29udGFpbmVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG5cbiAgLyoqXG4gICAqIFByb3BzIGFwcGxpZWQgdG8gdGhlIGNvbnRhaW5lciBjb21wb25lbnQgaWYgdXNlZC5cbiAgICovXG4gIENvbnRhaW5lclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIGNvbXBhY3QgdmVydGljYWwgcGFkZGluZyBkZXNpZ25lZCBmb3Iga2V5Ym9hcmQgYW5kIG1vdXNlIGlucHV0IHdpbGwgYmUgdXNlZC5cbiAgICovXG4gIGRlbnNlOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgbGlzdCBpdGVtIHdpbGwgYmUgZGlzYWJsZWQuXG4gICAqL1xuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGxlZnQgYW5kIHJpZ2h0IHBhZGRpbmcgaXMgcmVtb3ZlZC5cbiAgICovXG4gIGRpc2FibGVHdXR0ZXJzOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBhIDFweCBsaWdodCBib3JkZXIgaXMgYWRkZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgbGlzdCBpdGVtLlxuICAgKi9cbiAgZGl2aWRlcjogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIEBpZ25vcmVcbiAgICovXG4gIGZvY3VzVmlzaWJsZUNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogVXNlIHRvIGFwcGx5IHNlbGVjdGVkIHN0eWxpbmcuXG4gICAqL1xuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2xcbn0gOiB2b2lkIDA7XG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGVzKHN0eWxlcywge1xuICBuYW1lOiAnTXVpTGlzdEl0ZW0nXG59KShMaXN0SXRlbSk7IiwiaW1wb3J0IF90b0NvbnN1bWFibGVBcnJheSBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXlcIjtcbmltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNoYWluUHJvcFR5cGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL3V0aWxzJztcbmltcG9ydCBtZXJnZSBmcm9tICcuL21lcmdlJztcblxuZnVuY3Rpb24gb21pdChpbnB1dCwgZmllbGRzKSB7XG4gIHZhciBvdXRwdXQgPSB7fTtcbiAgT2JqZWN0LmtleXMoaW5wdXQpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoZmllbGRzLmluZGV4T2YocHJvcCkgPT09IC0xKSB7XG4gICAgICBvdXRwdXRbcHJvcF0gPSBpbnB1dFtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG52YXIgd2FybmVkT25jZSA9IGZhbHNlO1xuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uU3goc3R5bGVGdW5jdGlvbikge1xuICB2YXIgbmV3U3R5bGVGdW5jdGlvbiA9IGZ1bmN0aW9uIG5ld1N0eWxlRnVuY3Rpb24ocHJvcHMpIHtcbiAgICB2YXIgb3V0cHV0ID0gc3R5bGVGdW5jdGlvbihwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMuY3NzKSB7XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIG1lcmdlKG91dHB1dCwgc3R5bGVGdW5jdGlvbihfZXh0ZW5kcyh7XG4gICAgICAgIHRoZW1lOiBwcm9wcy50aGVtZVxuICAgICAgfSwgcHJvcHMuY3NzKSkpLCBvbWl0KHByb3BzLmNzcywgW3N0eWxlRnVuY3Rpb24uZmlsdGVyUHJvcHNdKSk7XG4gICAgfVxuXG4gICAgaWYgKHByb3BzLnN4KSB7XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIG1lcmdlKG91dHB1dCwgc3R5bGVGdW5jdGlvbihfZXh0ZW5kcyh7XG4gICAgICAgIHRoZW1lOiBwcm9wcy50aGVtZVxuICAgICAgfSwgcHJvcHMuc3gpKSksIG9taXQocHJvcHMuc3gsIFtzdHlsZUZ1bmN0aW9uLmZpbHRlclByb3BzXSkpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgbmV3U3R5bGVGdW5jdGlvbi5wcm9wVHlwZXMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2V4dGVuZHMoe30sIHN0eWxlRnVuY3Rpb24ucHJvcFR5cGVzLCB7XG4gICAgY3NzOiBjaGFpblByb3BUeXBlcyhQcm9wVHlwZXMub2JqZWN0LCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgIGlmICghd2FybmVkT25jZSAmJiBwcm9wcy5jc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB3YXJuZWRPbmNlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignTWF0ZXJpYWwtVUk6IFRoZSBgY3NzYCBwcm9wIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdGhlIGBzeGAgcHJvcCBpbnN0ZWFkLicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KSxcbiAgICBzeDogUHJvcFR5cGVzLm9iamVjdFxuICB9KSA6IHt9O1xuICBuZXdTdHlsZUZ1bmN0aW9uLmZpbHRlclByb3BzID0gWydjc3MnLCAnc3gnXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHN0eWxlRnVuY3Rpb24uZmlsdGVyUHJvcHMpKTtcbiAgcmV0dXJuIG5ld1N0eWxlRnVuY3Rpb247XG59XG4vKipcbiAqXG4gKiBAZGVwcmVjYXRlZFxuICogVGhlIGNzcyBzdHlsZSBmdW5jdGlvbiBpcyBkZXByZWNhdGVkLiBVc2UgdGhlIGBzdHlsZUZ1bmN0aW9uU3hgIGluc3RlYWQuXG4gKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gY3NzKHN0eWxlRnVuY3Rpb24pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjb25zb2xlLndhcm4oJ01hdGVyaWFsLVVJOiBUaGUgYGNzc2AgZnVuY3Rpb24gaXMgZGVwcmVjYXRlZC4gVXNlIHRoZSBgc3R5bGVGdW5jdGlvblN4YCBpbnN0ZWFkLicpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlRnVuY3Rpb25TeChzdHlsZUZ1bmN0aW9uKTtcbn1cbmV4cG9ydCBkZWZhdWx0IHN0eWxlRnVuY3Rpb25TeDsiLCJpbXBvcnQgX2V4dGVuZHMgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2V4dGVuZHNcIjtcbmltcG9ydCBtZXJnZSBmcm9tICcuL21lcmdlJztcblxuZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHN0eWxlcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBzdHlsZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgZm4gPSBmdW5jdGlvbiBmbihwcm9wcykge1xuICAgIHJldHVybiBzdHlsZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHN0eWxlKSB7XG4gICAgICB2YXIgb3V0cHV0ID0gc3R5bGUocHJvcHMpO1xuXG4gICAgICBpZiAob3V0cHV0KSB7XG4gICAgICAgIHJldHVybiBtZXJnZShhY2MsIG91dHB1dCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9OyAvLyBBbHRlcm5hdGl2ZSBhcHByb2FjaCB0aGF0IGRvZXNuJ3QgeWllbGQgYW55IHBlcmZvcm1hbmNlIGdhaW4uXG4gIC8vIGNvbnN0IGhhbmRsZXJzID0gc3R5bGVzLnJlZHVjZSgoYWNjLCBzdHlsZSkgPT4ge1xuICAvLyAgIHN0eWxlLmZpbHRlclByb3BzLmZvckVhY2gocHJvcCA9PiB7XG4gIC8vICAgICBhY2NbcHJvcF0gPSBzdHlsZTtcbiAgLy8gICB9KTtcbiAgLy8gICByZXR1cm4gYWNjO1xuICAvLyB9LCB7fSk7XG4gIC8vIGNvbnN0IGZuID0gcHJvcHMgPT4ge1xuICAvLyAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcykucmVkdWNlKChhY2MsIHByb3ApID0+IHtcbiAgLy8gICAgIGlmIChoYW5kbGVyc1twcm9wXSkge1xuICAvLyAgICAgICByZXR1cm4gbWVyZ2UoYWNjLCBoYW5kbGVyc1twcm9wXShwcm9wcykpO1xuICAvLyAgICAgfVxuICAvLyAgICAgcmV0dXJuIGFjYztcbiAgLy8gICB9LCB7fSk7XG4gIC8vIH07XG5cblxuICBmbi5wcm9wVHlwZXMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gc3R5bGVzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBzdHlsZSkge1xuICAgIHJldHVybiBfZXh0ZW5kcyhhY2MsIHN0eWxlLnByb3BUeXBlcyk7XG4gIH0sIHt9KSA6IHt9O1xuICBmbi5maWx0ZXJQcm9wcyA9IHN0eWxlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgc3R5bGUpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChzdHlsZS5maWx0ZXJQcm9wcyk7XG4gIH0sIFtdKTtcbiAgcmV0dXJuIGZuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlOyIsImltcG9ydCBfZGVmaW5lUHJvcGVydHkgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5XCI7XG5pbXBvcnQgcmVzcG9uc2l2ZVByb3BUeXBlIGZyb20gJy4vcmVzcG9uc2l2ZVByb3BUeXBlJztcbmltcG9ydCB7IGhhbmRsZUJyZWFrcG9pbnRzIH0gZnJvbSAnLi9icmVha3BvaW50cyc7XG5cbmZ1bmN0aW9uIGdldFBhdGgob2JqLCBwYXRoKSB7XG4gIGlmICghcGF0aCB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXRoLnNwbGl0KCcuJykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGl0ZW0pIHtcbiAgICByZXR1cm4gYWNjICYmIGFjY1tpdGVtXSA/IGFjY1tpdGVtXSA6IG51bGw7XG4gIH0sIG9iaik7XG59XG5cbmZ1bmN0aW9uIHN0eWxlKG9wdGlvbnMpIHtcbiAgdmFyIHByb3AgPSBvcHRpb25zLnByb3AsXG4gICAgICBfb3B0aW9ucyRjc3NQcm9wZXJ0eSA9IG9wdGlvbnMuY3NzUHJvcGVydHksXG4gICAgICBjc3NQcm9wZXJ0eSA9IF9vcHRpb25zJGNzc1Byb3BlcnR5ID09PSB2b2lkIDAgPyBvcHRpb25zLnByb3AgOiBfb3B0aW9ucyRjc3NQcm9wZXJ0eSxcbiAgICAgIHRoZW1lS2V5ID0gb3B0aW9ucy50aGVtZUtleSxcbiAgICAgIHRyYW5zZm9ybSA9IG9wdGlvbnMudHJhbnNmb3JtO1xuXG4gIHZhciBmbiA9IGZ1bmN0aW9uIGZuKHByb3BzKSB7XG4gICAgaWYgKHByb3BzW3Byb3BdID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wXTtcbiAgICB2YXIgdGhlbWUgPSBwcm9wcy50aGVtZTtcbiAgICB2YXIgdGhlbWVNYXBwaW5nID0gZ2V0UGF0aCh0aGVtZSwgdGhlbWVLZXkpIHx8IHt9O1xuXG4gICAgdmFyIHN0eWxlRnJvbVByb3BWYWx1ZSA9IGZ1bmN0aW9uIHN0eWxlRnJvbVByb3BWYWx1ZShwcm9wVmFsdWVGaW5hbCkge1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBpZiAodHlwZW9mIHRoZW1lTWFwcGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWx1ZSA9IHRoZW1lTWFwcGluZyhwcm9wVmFsdWVGaW5hbCk7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhlbWVNYXBwaW5nKSkge1xuICAgICAgICB2YWx1ZSA9IHRoZW1lTWFwcGluZ1twcm9wVmFsdWVGaW5hbF0gfHwgcHJvcFZhbHVlRmluYWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGdldFBhdGgodGhlbWVNYXBwaW5nLCBwcm9wVmFsdWVGaW5hbCkgfHwgcHJvcFZhbHVlRmluYWw7XG5cbiAgICAgICAgaWYgKHRyYW5zZm9ybSkge1xuICAgICAgICAgIHZhbHVlID0gdHJhbnNmb3JtKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY3NzUHJvcGVydHkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgY3NzUHJvcGVydHksIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGhhbmRsZUJyZWFrcG9pbnRzKHByb3BzLCBwcm9wVmFsdWUsIHN0eWxlRnJvbVByb3BWYWx1ZSk7XG4gIH07XG5cbiAgZm4ucHJvcFR5cGVzID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9kZWZpbmVQcm9wZXJ0eSh7fSwgcHJvcCwgcmVzcG9uc2l2ZVByb3BUeXBlKSA6IHt9O1xuICBmbi5maWx0ZXJQcm9wcyA9IFtwcm9wXTtcbiAgcmV0dXJuIGZuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHlsZTsiLCJpbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZSc7XG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuXG5mdW5jdGlvbiBnZXRCb3JkZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQodmFsdWUsIFwicHggc29saWRcIik7XG59XG5cbmV4cG9ydCB2YXIgYm9yZGVyID0gc3R5bGUoe1xuICBwcm9wOiAnYm9yZGVyJyxcbiAgdGhlbWVLZXk6ICdib3JkZXJzJyxcbiAgdHJhbnNmb3JtOiBnZXRCb3JkZXJcbn0pO1xuZXhwb3J0IHZhciBib3JkZXJUb3AgPSBzdHlsZSh7XG4gIHByb3A6ICdib3JkZXJUb3AnLFxuICB0aGVtZUtleTogJ2JvcmRlcnMnLFxuICB0cmFuc2Zvcm06IGdldEJvcmRlclxufSk7XG5leHBvcnQgdmFyIGJvcmRlclJpZ2h0ID0gc3R5bGUoe1xuICBwcm9wOiAnYm9yZGVyUmlnaHQnLFxuICB0aGVtZUtleTogJ2JvcmRlcnMnLFxuICB0cmFuc2Zvcm06IGdldEJvcmRlclxufSk7XG5leHBvcnQgdmFyIGJvcmRlckJvdHRvbSA9IHN0eWxlKHtcbiAgcHJvcDogJ2JvcmRlckJvdHRvbScsXG4gIHRoZW1lS2V5OiAnYm9yZGVycycsXG4gIHRyYW5zZm9ybTogZ2V0Qm9yZGVyXG59KTtcbmV4cG9ydCB2YXIgYm9yZGVyTGVmdCA9IHN0eWxlKHtcbiAgcHJvcDogJ2JvcmRlckxlZnQnLFxuICB0aGVtZUtleTogJ2JvcmRlcnMnLFxuICB0cmFuc2Zvcm06IGdldEJvcmRlclxufSk7XG5leHBvcnQgdmFyIGJvcmRlckNvbG9yID0gc3R5bGUoe1xuICBwcm9wOiAnYm9yZGVyQ29sb3InLFxuICB0aGVtZUtleTogJ3BhbGV0dGUnXG59KTtcbmV4cG9ydCB2YXIgYm9yZGVyUmFkaXVzID0gc3R5bGUoe1xuICBwcm9wOiAnYm9yZGVyUmFkaXVzJyxcbiAgdGhlbWVLZXk6ICdzaGFwZSdcbn0pO1xudmFyIGJvcmRlcnMgPSBjb21wb3NlKGJvcmRlciwgYm9yZGVyVG9wLCBib3JkZXJSaWdodCwgYm9yZGVyQm90dG9tLCBib3JkZXJMZWZ0LCBib3JkZXJDb2xvciwgYm9yZGVyUmFkaXVzKTtcbmV4cG9ydCBkZWZhdWx0IGJvcmRlcnM7IiwiaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmV4cG9ydCB2YXIgZGlzcGxheVByaW50ID0gc3R5bGUoe1xuICBwcm9wOiAnZGlzcGxheVByaW50JyxcbiAgY3NzUHJvcGVydHk6IGZhbHNlLFxuICB0cmFuc2Zvcm06IGZ1bmN0aW9uIHRyYW5zZm9ybSh2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAnQG1lZGlhIHByaW50Jzoge1xuICAgICAgICBkaXNwbGF5OiB2YWx1ZVxuICAgICAgfVxuICAgIH07XG4gIH1cbn0pO1xuZXhwb3J0IHZhciBkaXNwbGF5UmF3ID0gc3R5bGUoe1xuICBwcm9wOiAnZGlzcGxheSdcbn0pO1xuZXhwb3J0IHZhciBvdmVyZmxvdyA9IHN0eWxlKHtcbiAgcHJvcDogJ292ZXJmbG93J1xufSk7XG5leHBvcnQgdmFyIHRleHRPdmVyZmxvdyA9IHN0eWxlKHtcbiAgcHJvcDogJ3RleHRPdmVyZmxvdydcbn0pO1xuZXhwb3J0IHZhciB2aXNpYmlsaXR5ID0gc3R5bGUoe1xuICBwcm9wOiAndmlzaWJpbGl0eSdcbn0pO1xuZXhwb3J0IHZhciB3aGl0ZVNwYWNlID0gc3R5bGUoe1xuICBwcm9wOiAnd2hpdGVTcGFjZSdcbn0pO1xuZXhwb3J0IGRlZmF1bHQgY29tcG9zZShkaXNwbGF5UHJpbnQsIGRpc3BsYXlSYXcsIG92ZXJmbG93LCB0ZXh0T3ZlcmZsb3csIHZpc2liaWxpdHksIHdoaXRlU3BhY2UpOyIsImltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlJztcbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5leHBvcnQgdmFyIGZsZXhCYXNpcyA9IHN0eWxlKHtcbiAgcHJvcDogJ2ZsZXhCYXNpcydcbn0pO1xuZXhwb3J0IHZhciBmbGV4RGlyZWN0aW9uID0gc3R5bGUoe1xuICBwcm9wOiAnZmxleERpcmVjdGlvbidcbn0pO1xuZXhwb3J0IHZhciBmbGV4V3JhcCA9IHN0eWxlKHtcbiAgcHJvcDogJ2ZsZXhXcmFwJ1xufSk7XG5leHBvcnQgdmFyIGp1c3RpZnlDb250ZW50ID0gc3R5bGUoe1xuICBwcm9wOiAnanVzdGlmeUNvbnRlbnQnXG59KTtcbmV4cG9ydCB2YXIgYWxpZ25JdGVtcyA9IHN0eWxlKHtcbiAgcHJvcDogJ2FsaWduSXRlbXMnXG59KTtcbmV4cG9ydCB2YXIgYWxpZ25Db250ZW50ID0gc3R5bGUoe1xuICBwcm9wOiAnYWxpZ25Db250ZW50J1xufSk7XG5leHBvcnQgdmFyIG9yZGVyID0gc3R5bGUoe1xuICBwcm9wOiAnb3JkZXInXG59KTtcbmV4cG9ydCB2YXIgZmxleCA9IHN0eWxlKHtcbiAgcHJvcDogJ2ZsZXgnXG59KTtcbmV4cG9ydCB2YXIgZmxleEdyb3cgPSBzdHlsZSh7XG4gIHByb3A6ICdmbGV4R3Jvdydcbn0pO1xuZXhwb3J0IHZhciBmbGV4U2hyaW5rID0gc3R5bGUoe1xuICBwcm9wOiAnZmxleFNocmluaydcbn0pO1xuZXhwb3J0IHZhciBhbGlnblNlbGYgPSBzdHlsZSh7XG4gIHByb3A6ICdhbGlnblNlbGYnXG59KTtcbmV4cG9ydCB2YXIganVzdGlmeUl0ZW1zID0gc3R5bGUoe1xuICBwcm9wOiAnanVzdGlmeUl0ZW1zJ1xufSk7XG5leHBvcnQgdmFyIGp1c3RpZnlTZWxmID0gc3R5bGUoe1xuICBwcm9wOiAnanVzdGlmeVNlbGYnXG59KTtcbnZhciBmbGV4Ym94ID0gY29tcG9zZShmbGV4QmFzaXMsIGZsZXhEaXJlY3Rpb24sIGZsZXhXcmFwLCBqdXN0aWZ5Q29udGVudCwgYWxpZ25JdGVtcywgYWxpZ25Db250ZW50LCBvcmRlciwgZmxleCwgZmxleEdyb3csIGZsZXhTaHJpbmssIGFsaWduU2VsZiwganVzdGlmeUl0ZW1zLCBqdXN0aWZ5U2VsZik7XG5leHBvcnQgZGVmYXVsdCBmbGV4Ym94OyIsImltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlJztcbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5leHBvcnQgdmFyIGdyaWRHYXAgPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkR2FwJ1xufSk7XG5leHBvcnQgdmFyIGdyaWRDb2x1bW5HYXAgPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkQ29sdW1uR2FwJ1xufSk7XG5leHBvcnQgdmFyIGdyaWRSb3dHYXAgPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkUm93R2FwJ1xufSk7XG5leHBvcnQgdmFyIGdyaWRDb2x1bW4gPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkQ29sdW1uJ1xufSk7XG5leHBvcnQgdmFyIGdyaWRSb3cgPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkUm93J1xufSk7XG5leHBvcnQgdmFyIGdyaWRBdXRvRmxvdyA9IHN0eWxlKHtcbiAgcHJvcDogJ2dyaWRBdXRvRmxvdydcbn0pO1xuZXhwb3J0IHZhciBncmlkQXV0b0NvbHVtbnMgPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkQXV0b0NvbHVtbnMnXG59KTtcbmV4cG9ydCB2YXIgZ3JpZEF1dG9Sb3dzID0gc3R5bGUoe1xuICBwcm9wOiAnZ3JpZEF1dG9Sb3dzJ1xufSk7XG5leHBvcnQgdmFyIGdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkVGVtcGxhdGVDb2x1bW5zJ1xufSk7XG5leHBvcnQgdmFyIGdyaWRUZW1wbGF0ZVJvd3MgPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkVGVtcGxhdGVSb3dzJ1xufSk7XG5leHBvcnQgdmFyIGdyaWRUZW1wbGF0ZUFyZWFzID0gc3R5bGUoe1xuICBwcm9wOiAnZ3JpZFRlbXBsYXRlQXJlYXMnXG59KTtcbmV4cG9ydCB2YXIgZ3JpZEFyZWEgPSBzdHlsZSh7XG4gIHByb3A6ICdncmlkQXJlYSdcbn0pO1xudmFyIGdyaWQgPSBjb21wb3NlKGdyaWRHYXAsIGdyaWRDb2x1bW5HYXAsIGdyaWRSb3dHYXAsIGdyaWRDb2x1bW4sIGdyaWRSb3csIGdyaWRBdXRvRmxvdywgZ3JpZEF1dG9Db2x1bW5zLCBncmlkQXV0b1Jvd3MsIGdyaWRUZW1wbGF0ZUNvbHVtbnMsIGdyaWRUZW1wbGF0ZVJvd3MsIGdyaWRUZW1wbGF0ZUFyZWFzLCBncmlkQXJlYSk7XG5leHBvcnQgZGVmYXVsdCBncmlkOyIsImltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlJztcbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5leHBvcnQgdmFyIHBvc2l0aW9uID0gc3R5bGUoe1xuICBwcm9wOiAncG9zaXRpb24nXG59KTtcbmV4cG9ydCB2YXIgekluZGV4ID0gc3R5bGUoe1xuICBwcm9wOiAnekluZGV4JyxcbiAgdGhlbWVLZXk6ICd6SW5kZXgnXG59KTtcbmV4cG9ydCB2YXIgdG9wID0gc3R5bGUoe1xuICBwcm9wOiAndG9wJ1xufSk7XG5leHBvcnQgdmFyIHJpZ2h0ID0gc3R5bGUoe1xuICBwcm9wOiAncmlnaHQnXG59KTtcbmV4cG9ydCB2YXIgYm90dG9tID0gc3R5bGUoe1xuICBwcm9wOiAnYm90dG9tJ1xufSk7XG5leHBvcnQgdmFyIGxlZnQgPSBzdHlsZSh7XG4gIHByb3A6ICdsZWZ0J1xufSk7XG5leHBvcnQgZGVmYXVsdCBjb21wb3NlKHBvc2l0aW9uLCB6SW5kZXgsIHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCk7IiwiaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmV4cG9ydCB2YXIgY29sb3IgPSBzdHlsZSh7XG4gIHByb3A6ICdjb2xvcicsXG4gIHRoZW1lS2V5OiAncGFsZXR0ZSdcbn0pO1xuZXhwb3J0IHZhciBiZ2NvbG9yID0gc3R5bGUoe1xuICBwcm9wOiAnYmdjb2xvcicsXG4gIGNzc1Byb3BlcnR5OiAnYmFja2dyb3VuZENvbG9yJyxcbiAgdGhlbWVLZXk6ICdwYWxldHRlJ1xufSk7XG52YXIgcGFsZXR0ZSA9IGNvbXBvc2UoY29sb3IsIGJnY29sb3IpO1xuZXhwb3J0IGRlZmF1bHQgcGFsZXR0ZTsiLCJpbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZSc7XG52YXIgYm94U2hhZG93ID0gc3R5bGUoe1xuICBwcm9wOiAnYm94U2hhZG93JyxcbiAgdGhlbWVLZXk6ICdzaGFkb3dzJ1xufSk7XG5leHBvcnQgZGVmYXVsdCBib3hTaGFkb3c7IiwiaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcblxuZnVuY3Rpb24gdHJhbnNmb3JtKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA8PSAxID8gXCJcIi5jb25jYXQodmFsdWUgKiAxMDAsIFwiJVwiKSA6IHZhbHVlO1xufVxuXG5leHBvcnQgdmFyIHdpZHRoID0gc3R5bGUoe1xuICBwcm9wOiAnd2lkdGgnLFxuICB0cmFuc2Zvcm06IHRyYW5zZm9ybVxufSk7XG5leHBvcnQgdmFyIG1heFdpZHRoID0gc3R5bGUoe1xuICBwcm9wOiAnbWF4V2lkdGgnLFxuICB0cmFuc2Zvcm06IHRyYW5zZm9ybVxufSk7XG5leHBvcnQgdmFyIG1pbldpZHRoID0gc3R5bGUoe1xuICBwcm9wOiAnbWluV2lkdGgnLFxuICB0cmFuc2Zvcm06IHRyYW5zZm9ybVxufSk7XG5leHBvcnQgdmFyIGhlaWdodCA9IHN0eWxlKHtcbiAgcHJvcDogJ2hlaWdodCcsXG4gIHRyYW5zZm9ybTogdHJhbnNmb3JtXG59KTtcbmV4cG9ydCB2YXIgbWF4SGVpZ2h0ID0gc3R5bGUoe1xuICBwcm9wOiAnbWF4SGVpZ2h0JyxcbiAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1cbn0pO1xuZXhwb3J0IHZhciBtaW5IZWlnaHQgPSBzdHlsZSh7XG4gIHByb3A6ICdtaW5IZWlnaHQnLFxuICB0cmFuc2Zvcm06IHRyYW5zZm9ybVxufSk7XG5leHBvcnQgdmFyIHNpemVXaWR0aCA9IHN0eWxlKHtcbiAgcHJvcDogJ3NpemUnLFxuICBjc3NQcm9wZXJ0eTogJ3dpZHRoJyxcbiAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1cbn0pO1xuZXhwb3J0IHZhciBzaXplSGVpZ2h0ID0gc3R5bGUoe1xuICBwcm9wOiAnc2l6ZScsXG4gIGNzc1Byb3BlcnR5OiAnaGVpZ2h0JyxcbiAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1cbn0pO1xuZXhwb3J0IHZhciBib3hTaXppbmcgPSBzdHlsZSh7XG4gIHByb3A6ICdib3hTaXppbmcnXG59KTtcbnZhciBzaXppbmcgPSBjb21wb3NlKHdpZHRoLCBtYXhXaWR0aCwgbWluV2lkdGgsIGhlaWdodCwgbWF4SGVpZ2h0LCBtaW5IZWlnaHQsIGJveFNpemluZyk7XG5leHBvcnQgZGVmYXVsdCBzaXppbmc7IiwiaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmV4cG9ydCB2YXIgZm9udEZhbWlseSA9IHN0eWxlKHtcbiAgcHJvcDogJ2ZvbnRGYW1pbHknLFxuICB0aGVtZUtleTogJ3R5cG9ncmFwaHknXG59KTtcbmV4cG9ydCB2YXIgZm9udFNpemUgPSBzdHlsZSh7XG4gIHByb3A6ICdmb250U2l6ZScsXG4gIHRoZW1lS2V5OiAndHlwb2dyYXBoeSdcbn0pO1xuZXhwb3J0IHZhciBmb250U3R5bGUgPSBzdHlsZSh7XG4gIHByb3A6ICdmb250U3R5bGUnLFxuICB0aGVtZUtleTogJ3R5cG9ncmFwaHknXG59KTtcbmV4cG9ydCB2YXIgZm9udFdlaWdodCA9IHN0eWxlKHtcbiAgcHJvcDogJ2ZvbnRXZWlnaHQnLFxuICB0aGVtZUtleTogJ3R5cG9ncmFwaHknXG59KTtcbmV4cG9ydCB2YXIgbGV0dGVyU3BhY2luZyA9IHN0eWxlKHtcbiAgcHJvcDogJ2xldHRlclNwYWNpbmcnXG59KTtcbmV4cG9ydCB2YXIgbGluZUhlaWdodCA9IHN0eWxlKHtcbiAgcHJvcDogJ2xpbmVIZWlnaHQnXG59KTtcbmV4cG9ydCB2YXIgdGV4dEFsaWduID0gc3R5bGUoe1xuICBwcm9wOiAndGV4dEFsaWduJ1xufSk7XG52YXIgdHlwb2dyYXBoeSA9IGNvbXBvc2UoZm9udEZhbWlseSwgZm9udFNpemUsIGZvbnRTdHlsZSwgZm9udFdlaWdodCwgbGV0dGVyU3BhY2luZywgbGluZUhlaWdodCwgdGV4dEFsaWduKTtcbmV4cG9ydCBkZWZhdWx0IHR5cG9ncmFwaHk7IiwiaW1wb3J0IHsgYm9yZGVycywgY29tcG9zZSwgZGlzcGxheSwgZmxleGJveCwgZ3JpZCwgcGFsZXR0ZSwgcG9zaXRpb25zLCBzaGFkb3dzLCBzaXppbmcsIHNwYWNpbmcsIHR5cG9ncmFwaHksIHN0eWxlRnVuY3Rpb25TeCB9IGZyb20gJ0BtYXRlcmlhbC11aS9zeXN0ZW0nO1xuaW1wb3J0IHN0eWxlZCBmcm9tICcuLi9zdHlsZXMvc3R5bGVkJztcbmV4cG9ydCB2YXIgc3R5bGVGdW5jdGlvbiA9IHN0eWxlRnVuY3Rpb25TeChjb21wb3NlKGJvcmRlcnMsIGRpc3BsYXksIGZsZXhib3gsIGdyaWQsIHBvc2l0aW9ucywgcGFsZXR0ZSwgc2hhZG93cywgc2l6aW5nLCBzcGFjaW5nLCB0eXBvZ3JhcGh5KSk7XG4vKipcbiAqIEBpZ25vcmUgLSBkbyBub3QgZG9jdW1lbnQuXG4gKi9cblxudmFyIEJveCA9IHN0eWxlZCgnZGl2Jykoc3R5bGVGdW5jdGlvbiwge1xuICBuYW1lOiAnTXVpQm94J1xufSk7XG5leHBvcnQgZGVmYXVsdCBCb3g7Il0sInNvdXJjZVJvb3QiOiIifQ==