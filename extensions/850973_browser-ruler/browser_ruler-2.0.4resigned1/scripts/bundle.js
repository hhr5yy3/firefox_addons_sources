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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/* 7299d2d29ee0de87bd5e67ed9e6d7a0d is the md5() of 'ruler' for avoid collisions with already existing styles. */\n.ruler-overlay-7299d2d29ee0de87bd5e67ed9e6d7a0d {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 10000;\n\n  background-color: rgba(0, 0, 0, 0.2);\n\n  cursor: crosshair;\n}\n\n.ruler-rect-7299d2d29ee0de87bd5e67ed9e6d7a0d,\n.ruler-label-7299d2d29ee0de87bd5e67ed9e6d7a0d {\n  position: absolute;\n  z-index: 10005;\n}\n\n.ruler-rect-7299d2d29ee0de87bd5e67ed9e6d7a0d {\n  box-sizing: border-box;\n  background-color: rgba(127, 127, 127, 0.5);\n  border: 1px solid #000;\n}\n\n.ruler-label-7299d2d29ee0de87bd5e67ed9e6d7a0d {\n  white-space: nowrap;\n  color: #000;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  } // blank or null?


  if (!css || typeof css !== "string") {
    return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/"); // convert each url(...)

  /*
  This regular expression is just a way to recursively match brackets within
  a string.
  	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
     (  = Start a capturing group
       (?:  = Start a non-capturing group
           [^)(]  = Match anything that isn't a parentheses
           |  = OR
           \(  = Match a start parentheses
               (?:  = Start another non-capturing groups
                   [^)(]+  = Match anything that isn't a parentheses
                   |  = OR
                   \(  = Match a start parentheses
                       [^)(]*  = Match anything that isn't a parentheses
                   \)  = Match a end parentheses
               )  = End Group
               *\) = Match anything and then a close parens
           )  = Close non-capturing group
           *  = Match anything
        )  = Close capturing group
   \)  = Match a close parens
  	 /gi  = Get all matches, not the first.  Be case insensitive.
   */

  var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
    // strip quotes (if they exist)
    var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
      return $1;
    }).replace(/^'(.*)'$/, function (o, $1) {
      return $1;
    }); // already a full url? no change

    if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
      return fullMatch;
    } // convert the url to a full url


    var newUrl;

    if (unquotedOrigUrl.indexOf("//") === 0) {
      //TODO: should we add protocol?
      newUrl = unquotedOrigUrl;
    } else if (unquotedOrigUrl.indexOf("/") === 0) {
      // path should be relative to the base url
      newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
    } else {
      // path should be relative to current directory
      newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
    } // send back the fixed url(...)


    return "url(" + JSON.stringify(newUrl) + ")";
  }); // send back the fixed css

  return fixedCss;
};

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_main_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_ruler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/ruler */ "./src/scripts/ruler/index.ts");
/* eslint-disable import/no-unassigned-import */


/* eslint-enable import/no-unassigned-import */

/***/ }),

/***/ "./src/scripts/lib/get.ts":
/*!********************************!*\
  !*** ./src/scripts/lib/get.ts ***!
  \********************************/
/*! exports provided: get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _type_narrowing_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type-narrowing-error */ "./src/scripts/lib/type-narrowing-error.ts");

function get(map, instance) {
  const ret = map.get(instance);

  if (!ret) {
    throw new _type_narrowing_error__WEBPACK_IMPORTED_MODULE_0__["TypeNarrowingError"]();
  }

  return ret;
}

/***/ }),

/***/ "./src/scripts/lib/prevent-collision.ts":
/*!**********************************************!*\
  !*** ./src/scripts/lib/prevent-collision.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return preventCollision; });
/**
 * Modifies a CSS class or id to prevent collisions with local styles
 */
function preventCollision(selector) {
  // 7299d2d29ee0de87bd5e67ed9e6d7a0d is the md5 of "ruler" and it's extremely
  // unlikely any other styles would include it in their last 32 characters.
  return `${selector}-7299d2d29ee0de87bd5e67ed9e6d7a0d`;
}

/***/ }),

/***/ "./src/scripts/lib/type-narrowing-error.ts":
/*!*************************************************!*\
  !*** ./src/scripts/lib/type-narrowing-error.ts ***!
  \*************************************************/
/*! exports provided: TypeNarrowingError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeNarrowingError", function() { return TypeNarrowingError; });
class TypeNarrowingError extends TypeError {
  constructor() {
    super('This error should never throw at runtime and exists only to satisfy the typescript inferrence engine.');
  }

}

/***/ }),

/***/ "./src/scripts/ruler/index.ts":
/*!************************************!*\
  !*** ./src/scripts/ruler/index.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./overlay */ "./src/scripts/ruler/overlay.ts");

const overlay = new _overlay__WEBPACK_IMPORTED_MODULE_0__["default"]();

if (overlay.isVisible()) {
  overlay.remove();
} else {
  overlay.add();
}

/***/ }),

/***/ "./src/scripts/ruler/overlay.ts":
/*!**************************************!*\
  !*** ./src/scripts/ruler/overlay.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Overlay; });
/* harmony import */ var _lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/prevent-collision */ "./src/scripts/lib/prevent-collision.ts");
/* harmony import */ var _lib_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/get */ "./src/scripts/lib/get.ts");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./point */ "./src/scripts/ruler/point.ts");
/* harmony import */ var _ruler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ruler */ "./src/scripts/ruler/ruler.ts");




const elements = new WeakMap();
const rulers = new WeakMap();
/**
 * Background layer that listens for mouse events to draw the Ruler
 */

class Overlay {
  get el() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_1__["get"])(elements, this);
  }

  set el(value) {
    elements.set(this, value);
  }

  get ruler() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_1__["get"])(rulers, this);
  }

  set ruler(value) {
    rulers.set(this, value);
  }
  /**
   * Adds the overlay to the DOM
   * @returns {undefined}
   */


  add() {
    document.body.appendChild(this.el);
  }
  /**
   * Constructor
   */


  constructor() {
    this.onMousedown = this.onMousedown.bind(this);
    this.onMousemove = this.onMousemove.bind(this);
    this.onMouseup = this.onMouseup.bind(this);
    const el = document.getElementById(Object(_lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__["default"])(`ruler-overlay`));

    if (el) {
      this.el = el;
    } else {
      this.el = document.createElement(`div`);
      this.el.id = Object(_lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__["default"])(`ruler-overlay`);
      this.el.classList.add(Object(_lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__["default"])(`ruler-overlay`));
      this.el.addEventListener(`mousedown`, this.onMousedown);
      this.el.addEventListener(`mouseup`, this.onMouseup);
    }

    this.ruler = new _ruler__WEBPACK_IMPORTED_MODULE_3__["default"](this.el);
  }
  /**
   * Indicates if the overlay is visible
   * @returns {boolean}
   */


  isVisible() {
    return elements.has(this) && this.el.style.display !== `none` && document.body.contains(this.el);
  }

  onMousedown(event) {
    const point = new _point__WEBPACK_IMPORTED_MODULE_2__["default"](event);

    if (!this.ruler.isDrawing) {
      this.ruler.setOrigin(point);
      this.el.addEventListener(`mousemove`, this.onMousemove);
    }
  }

  onMousemove(event) {
    const point = new _point__WEBPACK_IMPORTED_MODULE_2__["default"](event);
    this.ruler.draw(undefined, point);
  }

  onMouseup(event) {
    const point = new _point__WEBPACK_IMPORTED_MODULE_2__["default"](event);

    if (!point.equals(this.ruler.rect.origin)) {
      this.el.removeEventListener(`mousemove`, this.onMousemove);
      this.ruler.setTerminus(point);
    }
  }
  /**
   * Removes the overlay from the DOM
   */


  remove() {
    if (elements.has(this)) {
      this.el.removeEventListener(`mousedown`, this.onMousedown);
      this.el.removeEventListener(`mousemove`, this.onMousemove);
      this.el.removeEventListener(`mouseup`, this.onMouseup);
      document.body.removeChild(this.el);
    }
  }

}

/***/ }),

/***/ "./src/scripts/ruler/point.ts":
/*!************************************!*\
  !*** ./src/scripts/ruler/point.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
const xs = new WeakMap();
const ys = new WeakMap();
/**
 * Represents a point in two-demensional space
 */

class Point {
  get x() {
    const value = xs.get(this);

    if (typeof value === 'undefined') {
      return null;
    }

    return value;
  }

  set x(value) {
    if (value === null) {
      xs.delete(this);
    } else {
      xs.set(this, value);
    }
  }

  get y() {
    const value = ys.get(this);

    if (typeof value === 'undefined') {
      return null;
    }

    return value;
  }

  set y(value) {
    if (value === null) {
      ys.delete(this);
    } else {
      ys.set(this, value);
    }
  }

  constructor(point) {
    if (point) {
      const {
        x,
        y
      } = point;
      this.x = x;
      this.y = y;
    }
  }
  /**
   * Compares two points for equality
   */


  equals(point) {
    return point && this.x === point.x && this.y === point.y;
  }

}

/***/ }),

/***/ "./src/scripts/ruler/rect.ts":
/*!***********************************!*\
  !*** ./src/scripts/ruler/rect.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rect; });
/* harmony import */ var _lib_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/get */ "./src/scripts/lib/get.ts");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point */ "./src/scripts/ruler/point.ts");


const origins = new WeakMap();
const termini = new WeakMap();
/**
 * Represents a plane in two-demenional space
 */

class Rect {
  get bottom() {
    return Math.max(this.origin.y || 0, this.terminus.y || 0);
  }

  get height() {
    return Math.abs((this.origin.y || 0) - (this.terminus.y || 0));
  }

  get left() {
    return Math.min(this.origin.x || 0, this.terminus.x || 0);
  }

  get origin() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_0__["get"])(origins, this);
  }

  set origin(value) {
    origins.set(this, value);
  }

  get right() {
    return Math.max(this.origin.x || 0, this.terminus.x || 0);
  }

  get terminus() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_0__["get"])(termini, this);
  }

  set terminus(value) {
    termini.set(this, value);
  }

  get top() {
    return Math.min(this.origin.y || 0, this.terminus.y || 0);
  }

  get width() {
    return Math.abs((this.origin.x || 0) - (this.terminus.x || 0));
  }

  constructor(o, t) {
    this.origin = o || new _point__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.terminus = t || new _point__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

}

/***/ }),

/***/ "./src/scripts/ruler/ruler.ts":
/*!************************************!*\
  !*** ./src/scripts/ruler/ruler.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ruler; });
/* harmony import */ var _lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/prevent-collision */ "./src/scripts/lib/prevent-collision.ts");
/* harmony import */ var _lib_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/get */ "./src/scripts/lib/get.ts");
/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rect */ "./src/scripts/ruler/rect.ts");



const elements = new WeakMap();
const labels = new WeakMap();
const rects = new WeakMap();
const termini = new WeakMap();
const origins = new WeakMap();
const isDrawings = new WeakMap();
/**
 * Represents the region being measured.
 */

class Ruler {
  get isDrawing() {
    return !!isDrawings.get(this);
  }

  get el() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_1__["get"])(elements, this);
  }

  set el(value) {
    elements.set(this, value);
  }

  get label() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_1__["get"])(labels, this);
  }

  set label(value) {
    labels.set(this, value);
  }

  get origin() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_1__["get"])(origins, this);
  }

  set origin(value) {
    origins.set(this, value);
  }

  get rect() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_1__["get"])(rects, this);
  }

  set rect(value) {
    rects.set(this, value);
  }

  get terminus() {
    return Object(_lib_get__WEBPACK_IMPORTED_MODULE_1__["get"])(termini, this);
  }

  set terminus(value) {
    termini.set(this, value);
  }

  constructor(overlay) {
    const el = document.getElementById(Object(_lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__["default"])(`ruler-rect`));

    if (el) {
      this.el = el;
    } else {
      this.el = document.createElement(`div`);
      this.el.id = Object(_lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__["default"])(`ruler-rect`);
      this.el.classList.add(Object(_lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__["default"])(`ruler-rect`));
      this.label = document.createElement(`span`);
      this.label.id = Object(_lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__["default"])(`ruler-label`);
      this.label.classList.add(Object(_lib_prevent_collision__WEBPACK_IMPORTED_MODULE_0__["default"])(`ruler-label`));
      this.el.appendChild(this.label);
      overlay.appendChild(this.el);
    }

    this.rect = new _rect__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }
  /**
   * Draws the Ruler
   */


  draw(origin, terminus) {
    if (origin) {
      this.rect.origin = origin;
    }

    if (terminus) {
      this.rect.terminus = terminus;
    }

    if (!this.rect.terminus.x || !this.rect.terminus.y) {
      this.rect.terminus = this.rect.origin;
    }

    this.el.style.top = `${this.rect.top}px`;
    this.el.style.right = `${this.rect.right}px`;
    this.el.style.bottom = `${this.rect.bottom}px`;
    this.el.style.left = `${this.rect.left}px`;
    this.el.style.width = `${this.rect.width}px`;
    this.el.style.height = `${this.rect.height}px`;
    const diagonal = Math.sqrt(Math.pow(this.rect.width, 2) + Math.pow(this.rect.height, 2));
    this.label.innerHTML = `W:${this.rect.width} H:${this.rect.height}  D:${diagonal.toFixed(1)}`;
  }
  /**
   * Sets the start point for ruler box
   */


  setOrigin(point) {
    isDrawings.set(this, true);
    this.rect = new _rect__WEBPACK_IMPORTED_MODULE_2__["default"](point);
    this.draw();
  }
  /**
   * Sets the end point for ruler box
   */


  setTerminus(point) {
    this.rect.terminus = point;
    this.draw();
    isDrawings.set(this, false);
  }

}

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9tYWluLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9saWIvZ2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2xpYi9wcmV2ZW50LWNvbGxpc2lvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9saWIvdHlwZS1uYXJyb3dpbmctZXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcnVsZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcnVsZXIvb3ZlcmxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9ydWxlci9wb2ludC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9ydWxlci9yZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL3J1bGVyL3J1bGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5jc3M/MDBlMiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwidXNlU291cmNlTWFwIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWFRdWVyeSIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJsZW5ndGgiLCJpZCIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsInNvdXJjZU1hcHBpbmciLCJ0b0NvbW1lbnQiLCJzb3VyY2VVUkxzIiwic291cmNlcyIsInNvdXJjZSIsInNvdXJjZVJvb3QiLCJjb25jYXQiLCJzb3VyY2VNYXAiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwiY3NzIiwibG9jYXRpb24iLCJ3aW5kb3ciLCJFcnJvciIsImJhc2VVcmwiLCJwcm90b2NvbCIsImhvc3QiLCJjdXJyZW50RGlyIiwicGF0aG5hbWUiLCJyZXBsYWNlIiwiZml4ZWRDc3MiLCJmdWxsTWF0Y2giLCJvcmlnVXJsIiwidW5xdW90ZWRPcmlnVXJsIiwidHJpbSIsIm8iLCIkMSIsInRlc3QiLCJuZXdVcmwiLCJpbmRleE9mIiwiZ2V0IiwiaW5zdGFuY2UiLCJyZXQiLCJUeXBlTmFycm93aW5nRXJyb3IiLCJwcmV2ZW50Q29sbGlzaW9uIiwic2VsZWN0b3IiLCJUeXBlRXJyb3IiLCJjb25zdHJ1Y3RvciIsIm92ZXJsYXkiLCJPdmVybGF5IiwiaXNWaXNpYmxlIiwicmVtb3ZlIiwiYWRkIiwiZWxlbWVudHMiLCJXZWFrTWFwIiwicnVsZXJzIiwiZWwiLCJ2YWx1ZSIsInNldCIsInJ1bGVyIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJvbk1vdXNlZG93biIsImJpbmQiLCJvbk1vdXNlbW92ZSIsIm9uTW91c2V1cCIsImdldEVsZW1lbnRCeUlkIiwicGMiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIlJ1bGVyIiwiaGFzIiwic3R5bGUiLCJkaXNwbGF5IiwiY29udGFpbnMiLCJldmVudCIsInBvaW50IiwiUG9pbnQiLCJpc0RyYXdpbmciLCJzZXRPcmlnaW4iLCJkcmF3IiwidW5kZWZpbmVkIiwiZXF1YWxzIiwicmVjdCIsIm9yaWdpbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRUZXJtaW51cyIsInJlbW92ZUNoaWxkIiwieHMiLCJ5cyIsIngiLCJkZWxldGUiLCJ5Iiwib3JpZ2lucyIsInRlcm1pbmkiLCJSZWN0IiwiYm90dG9tIiwiTWF0aCIsIm1heCIsInRlcm1pbnVzIiwiaGVpZ2h0IiwiYWJzIiwibGVmdCIsIm1pbiIsInJpZ2h0IiwidG9wIiwid2lkdGgiLCJ0IiwibGFiZWxzIiwicmVjdHMiLCJpc0RyYXdpbmdzIiwibGFiZWwiLCJkaWFnb25hbCIsInNxcnQiLCJwb3ciLCJpbm5lckhUTUwiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsMkJBQTJCLG1CQUFPLENBQUMsd0dBQW1EO0FBQ3RGO0FBQ0EsY0FBYyxRQUFTLHVLQUF1SyxvQkFBb0IsV0FBVyxhQUFhLGNBQWMsWUFBWSxtQkFBbUIsMkNBQTJDLHdCQUF3QixHQUFHLGtHQUFrRyx1QkFBdUIsbUJBQW1CLEdBQUcsa0RBQWtELDJCQUEyQiwrQ0FBK0MsMkJBQTJCLEdBQUcsbURBQW1ELHdCQUF3QixnQkFBZ0Is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QU0sTUFDMUMsS0FBS3ZCLElBQUwsQ0FBVWlCLE1BQ1gsT0FBTVksUUFBUSxDQUFDSSxPQUFULENBQWlCLENBQWpCLENBQW9CLEVBRjNCO0FBR0Q7QUFFRDs7Ozs7QUFHQXJDLFdBQVMsQ0FBQ0gsS0FBRCxFQUFlO0FBQ3RCa0MsY0FBVSxDQUFDdEQsR0FBWCxDQUFlLElBQWYsRUFBcUIsSUFBckI7QUFFQSxTQUFLMkIsSUFBTCxHQUFZLElBQUlZLDZDQUFKLENBQVNuQixLQUFULENBQVo7QUFDQSxTQUFLSSxJQUFMO0FBQ0Q7QUFFRDs7Ozs7QUFHQU0sYUFBVyxDQUFDVixLQUFELEVBQWU7QUFDeEIsU0FBS08sSUFBTCxDQUFVZ0IsUUFBVixHQUFxQnZCLEtBQXJCO0FBQ0EsU0FBS0ksSUFBTDtBQUVBOEIsY0FBVSxDQUFDdEQsR0FBWCxDQUFlLElBQWYsRUFBcUIsS0FBckI7QUFDRDs7QUFwSHdCLEM7Ozs7Ozs7Ozs7OztBQ2hCM0IsY0FBYyxtQkFBTyxDQUFDLDBIQUF3RDs7QUFFOUUsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLHNHQUFtRDs7QUFFeEU7O0FBRUEsR0FBRyxLQUFVLEVBQUUsRSIsImZpbGUiOiJzY3JpcHRzL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiA3Mjk5ZDJkMjllZTBkZTg3YmQ1ZTY3ZWQ5ZTZkN2EwZCBpcyB0aGUgbWQ1KCkgb2YgJ3J1bGVyJyBmb3IgYXZvaWQgY29sbGlzaW9ucyB3aXRoIGFscmVhZHkgZXhpc3Rpbmcgc3R5bGVzLiAqL1xcbi5ydWxlci1vdmVybGF5LTcyOTlkMmQyOWVlMGRlODdiZDVlNjdlZDllNmQ3YTBkIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDEwMDAwO1xcblxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjIpO1xcblxcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcbi5ydWxlci1yZWN0LTcyOTlkMmQyOWVlMGRlODdiZDVlNjdlZDllNmQ3YTBkLFxcbi5ydWxlci1sYWJlbC03Mjk5ZDJkMjllZTBkZTg3YmQ1ZTY3ZWQ5ZTZkN2EwZCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxMDAwNTtcXG59XFxuXFxuLnJ1bGVyLXJlY3QtNzI5OWQyZDI5ZWUwZGU4N2JkNWU2N2VkOWU2ZDdhMGQge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTI3LCAxMjcsIDEyNywgMC41KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxufVxcblxcbi5ydWxlci1sYWJlbC03Mjk5ZDJkMjllZTBkZTg3YmQ1ZTY3ZWQ5ZTZkN2EwZCB7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgY29sb3I6ICMwMDA7XFxufVxcblwiLCBcIlwiXSk7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiAnQG1lZGlhICcgKyBpdGVtWzJdICsgJ3snICsgY29udGVudCArICd9JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSAnKCcgKyBpdGVtWzJdICsgJykgYW5kICgnICsgbWVkaWFRdWVyeSArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJztcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcbiAgcmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn0iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5hc3NpZ25lZC1pbXBvcnQgKi9cblxuaW1wb3J0ICcuL3N0eWxlcy9tYWluLmNzcyc7XG5pbXBvcnQgJy4vc2NyaXB0cy9ydWxlcic7XG5cbi8qIGVzbGludC1lbmFibGUgaW1wb3J0L25vLXVuYXNzaWduZWQtaW1wb3J0ICovXG4iLCJpbXBvcnQge1R5cGVOYXJyb3dpbmdFcnJvcn0gZnJvbSAnLi90eXBlLW5hcnJvd2luZy1lcnJvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQ8SVQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBUPihcbiAgbWFwOiBXZWFrTWFwPElULCBUPixcbiAgaW5zdGFuY2U6IElUXG4pIHtcbiAgY29uc3QgcmV0ID0gbWFwLmdldChpbnN0YW5jZSk7XG4gIGlmICghcmV0KSB7XG4gICAgdGhyb3cgbmV3IFR5cGVOYXJyb3dpbmdFcnJvcigpO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCIvKipcbiAqIE1vZGlmaWVzIGEgQ1NTIGNsYXNzIG9yIGlkIHRvIHByZXZlbnQgY29sbGlzaW9ucyB3aXRoIGxvY2FsIHN0eWxlc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmV2ZW50Q29sbGlzaW9uKHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyA3Mjk5ZDJkMjllZTBkZTg3YmQ1ZTY3ZWQ5ZTZkN2EwZCBpcyB0aGUgbWQ1IG9mIFwicnVsZXJcIiBhbmQgaXQncyBleHRyZW1lbHlcbiAgLy8gdW5saWtlbHkgYW55IG90aGVyIHN0eWxlcyB3b3VsZCBpbmNsdWRlIGl0IGluIHRoZWlyIGxhc3QgMzIgY2hhcmFjdGVycy5cbiAgcmV0dXJuIGAke3NlbGVjdG9yfS03Mjk5ZDJkMjllZTBkZTg3YmQ1ZTY3ZWQ5ZTZkN2EwZGA7XG59XG4iLCJleHBvcnQgY2xhc3MgVHlwZU5hcnJvd2luZ0Vycm9yIGV4dGVuZHMgVHlwZUVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXG4gICAgICAnVGhpcyBlcnJvciBzaG91bGQgbmV2ZXIgdGhyb3cgYXQgcnVudGltZSBhbmQgZXhpc3RzIG9ubHkgdG8gc2F0aXNmeSB0aGUgdHlwZXNjcmlwdCBpbmZlcnJlbmNlIGVuZ2luZS4nXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IE92ZXJsYXkgZnJvbSAnLi9vdmVybGF5JztcblxuY29uc3Qgb3ZlcmxheSA9IG5ldyBPdmVybGF5KCk7XG5pZiAob3ZlcmxheS5pc1Zpc2libGUoKSkge1xuICBvdmVybGF5LnJlbW92ZSgpO1xufSBlbHNlIHtcbiAgb3ZlcmxheS5hZGQoKTtcbn1cbiIsImltcG9ydCBwYyBmcm9tICcuLi9saWIvcHJldmVudC1jb2xsaXNpb24nO1xuaW1wb3J0IHtnZXR9IGZyb20gJy4uL2xpYi9nZXQnO1xuXG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9wb2ludCc7XG5pbXBvcnQgUnVsZXIgZnJvbSAnLi9ydWxlcic7XG5cbmNvbnN0IGVsZW1lbnRzOiBXZWFrTWFwPE92ZXJsYXksIEhUTUxFbGVtZW50PiA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBydWxlcnM6IFdlYWtNYXA8T3ZlcmxheSwgUnVsZXI+ID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBCYWNrZ3JvdW5kIGxheWVyIHRoYXQgbGlzdGVucyBmb3IgbW91c2UgZXZlbnRzIHRvIGRyYXcgdGhlIFJ1bGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE92ZXJsYXkge1xuICBnZXQgZWwoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBnZXQoZWxlbWVudHMsIHRoaXMpO1xuICB9XG5cbiAgc2V0IGVsKHZhbHVlOiBIVE1MRWxlbWVudCkge1xuICAgIGVsZW1lbnRzLnNldCh0aGlzLCB2YWx1ZSk7XG4gIH1cblxuICBnZXQgcnVsZXIoKTogUnVsZXIge1xuICAgIHJldHVybiBnZXQocnVsZXJzLCB0aGlzKTtcbiAgfVxuXG4gIHNldCBydWxlcih2YWx1ZTogUnVsZXIpIHtcbiAgICBydWxlcnMuc2V0KHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBvdmVybGF5IHRvIHRoZSBET01cbiAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICovXG4gIGFkZCgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9uTW91c2Vkb3duID0gdGhpcy5vbk1vdXNlZG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25Nb3VzZW1vdmUgPSB0aGlzLm9uTW91c2Vtb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbk1vdXNldXAgPSB0aGlzLm9uTW91c2V1cC5iaW5kKHRoaXMpO1xuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYyhgcnVsZXItb3ZlcmxheWApKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHRoaXMuZWwgPSBlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgICAgdGhpcy5lbC5pZCA9IHBjKGBydWxlci1vdmVybGF5YCk7XG4gICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQocGMoYHJ1bGVyLW92ZXJsYXlgKSk7XG5cbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihgbW91c2Vkb3duYCwgdGhpcy5vbk1vdXNlZG93bik7XG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoYG1vdXNldXBgLCB0aGlzLm9uTW91c2V1cCk7XG4gICAgfVxuXG4gICAgdGhpcy5ydWxlciA9IG5ldyBSdWxlcih0aGlzLmVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIG92ZXJsYXkgaXMgdmlzaWJsZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZWxlbWVudHMuaGFzKHRoaXMpICYmXG4gICAgICB0aGlzLmVsLnN0eWxlLmRpc3BsYXkgIT09IGBub25lYCAmJlxuICAgICAgZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLmVsKVxuICAgICk7XG4gIH1cblxuICBvbk1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHBvaW50ID0gbmV3IFBvaW50KGV2ZW50KTtcblxuICAgIGlmICghdGhpcy5ydWxlci5pc0RyYXdpbmcpIHtcbiAgICAgIHRoaXMucnVsZXIuc2V0T3JpZ2luKHBvaW50KTtcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihgbW91c2Vtb3ZlYCwgdGhpcy5vbk1vdXNlbW92ZSk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCBwb2ludCA9IG5ldyBQb2ludChldmVudCk7XG5cbiAgICB0aGlzLnJ1bGVyLmRyYXcodW5kZWZpbmVkLCBwb2ludCk7XG4gIH1cblxuICBvbk1vdXNldXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCBwb2ludCA9IG5ldyBQb2ludChldmVudCk7XG5cbiAgICBpZiAoIXBvaW50LmVxdWFscyh0aGlzLnJ1bGVyLnJlY3Qub3JpZ2luKSkge1xuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKGBtb3VzZW1vdmVgLCB0aGlzLm9uTW91c2Vtb3ZlKTtcbiAgICAgIHRoaXMucnVsZXIuc2V0VGVybWludXMocG9pbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBvdmVybGF5IGZyb20gdGhlIERPTVxuICAgKi9cbiAgcmVtb3ZlKCkge1xuICAgIGlmIChlbGVtZW50cy5oYXModGhpcykpIHtcbiAgICAgIHRoaXMuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihgbW91c2Vkb3duYCwgdGhpcy5vbk1vdXNlZG93bik7XG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoYG1vdXNlbW92ZWAsIHRoaXMub25Nb3VzZW1vdmUpO1xuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKGBtb3VzZXVwYCwgdGhpcy5vbk1vdXNldXApO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IHhzOiBXZWFrTWFwPFBvaW50LCBudW1iZXI+ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHlzOiBXZWFrTWFwPFBvaW50LCBudW1iZXI+ID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcG9pbnQgaW4gdHdvLWRlbWVuc2lvbmFsIHNwYWNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IHtcbiAgZ2V0IHgoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgdmFsdWUgPSB4cy5nZXQodGhpcyk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzZXQgeCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgeHMuZGVsZXRlKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4cy5zZXQodGhpcywgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldCB5KCk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IHZhbHVlID0geXMuZ2V0KHRoaXMpO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgc2V0IHkodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHlzLmRlbGV0ZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeXMuc2V0KHRoaXMsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwb2ludD86IFBvaW50TGl0ZXJhbCkge1xuICAgIGlmIChwb2ludCkge1xuICAgICAgY29uc3Qge3gsIHl9ID0gcG9pbnQ7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdHdvIHBvaW50cyBmb3IgZXF1YWxpdHlcbiAgICovXG4gIGVxdWFscyhwb2ludDogUG9pbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcG9pbnQgJiYgdGhpcy54ID09PSBwb2ludC54ICYmIHRoaXMueSA9PT0gcG9pbnQueTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgUG9pbnRMaXRlcmFsIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59XG4iLCJpbXBvcnQge2dldH0gZnJvbSAnLi4vbGliL2dldCc7XG5cbmltcG9ydCBQb2ludCBmcm9tICcuL3BvaW50JztcblxuY29uc3Qgb3JpZ2luczogV2Vha01hcDxSZWN0LCBQb2ludD4gPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdGVybWluaTogV2Vha01hcDxSZWN0LCBQb2ludD4gPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwbGFuZSBpbiB0d28tZGVtZW5pb25hbCBzcGFjZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0IHtcbiAgZ2V0IGJvdHRvbSgpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLm1heCh0aGlzLm9yaWdpbi55IHx8IDAsIHRoaXMudGVybWludXMueSB8fCAwKTtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoKHRoaXMub3JpZ2luLnkgfHwgMCkgLSAodGhpcy50ZXJtaW51cy55IHx8IDApKTtcbiAgfVxuXG4gIGdldCBsZWZ0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWluKHRoaXMub3JpZ2luLnggfHwgMCwgdGhpcy50ZXJtaW51cy54IHx8IDApO1xuICB9XG5cbiAgZ2V0IG9yaWdpbigpOiBQb2ludCB7XG4gICAgcmV0dXJuIGdldChvcmlnaW5zLCB0aGlzKTtcbiAgfVxuXG4gIHNldCBvcmlnaW4odmFsdWU6IFBvaW50KSB7XG4gICAgb3JpZ2lucy5zZXQodGhpcywgdmFsdWUpO1xuICB9XG5cbiAgZ2V0IHJpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHRoaXMub3JpZ2luLnggfHwgMCwgdGhpcy50ZXJtaW51cy54IHx8IDApO1xuICB9XG5cbiAgZ2V0IHRlcm1pbnVzKCk6IFBvaW50IHtcbiAgICByZXR1cm4gZ2V0KHRlcm1pbmksIHRoaXMpO1xuICB9XG5cbiAgc2V0IHRlcm1pbnVzKHZhbHVlOiBQb2ludCkge1xuICAgIHRlcm1pbmkuc2V0KHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIGdldCB0b3AoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5taW4odGhpcy5vcmlnaW4ueSB8fCAwLCB0aGlzLnRlcm1pbnVzLnkgfHwgMCk7XG4gIH1cblxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoKHRoaXMub3JpZ2luLnggfHwgMCkgLSAodGhpcy50ZXJtaW51cy54IHx8IDApKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG8/OiBQb2ludCwgdD86IFBvaW50KSB7XG4gICAgdGhpcy5vcmlnaW4gPSBvIHx8IG5ldyBQb2ludCgpO1xuICAgIHRoaXMudGVybWludXMgPSB0IHx8IG5ldyBQb2ludCgpO1xuICB9XG59XG4iLCJpbXBvcnQgcGMgZnJvbSAnLi4vbGliL3ByZXZlbnQtY29sbGlzaW9uJztcbmltcG9ydCB7Z2V0fSBmcm9tICcuLi9saWIvZ2V0JztcblxuaW1wb3J0IE92ZXJsYXkgZnJvbSAnLi9vdmVybGF5JztcbmltcG9ydCBQb2ludCBmcm9tICcuL3BvaW50JztcbmltcG9ydCBSZWN0IGZyb20gJy4vcmVjdCc7XG5cbmNvbnN0IGVsZW1lbnRzOiBXZWFrTWFwPFJ1bGVyLCBIVE1MRWxlbWVudD4gPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgbGFiZWxzOiBXZWFrTWFwPFJ1bGVyLCBIVE1MU3BhbkVsZW1lbnQ+ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHJlY3RzOiBXZWFrTWFwPFJ1bGVyLCBSZWN0PiA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0ZXJtaW5pOiBXZWFrTWFwPFJ1bGVyLCBQb2ludD4gPSBuZXcgV2Vha01hcCgpO1xuY29uc3Qgb3JpZ2luczogV2Vha01hcDxSdWxlciwgUG9pbnQ+ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGlzRHJhd2luZ3M6IFdlYWtNYXA8UnVsZXIsIGJvb2xlYW4+ID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSByZWdpb24gYmVpbmcgbWVhc3VyZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVyIHtcbiAgZ2V0IGlzRHJhd2luZygpIHtcbiAgICByZXR1cm4gISFpc0RyYXdpbmdzLmdldCh0aGlzKTtcbiAgfVxuXG4gIGdldCBlbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGdldChlbGVtZW50cywgdGhpcyk7XG4gIH1cblxuICBzZXQgZWwodmFsdWU6IEhUTUxFbGVtZW50KSB7XG4gICAgZWxlbWVudHMuc2V0KHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIGdldCBsYWJlbCgpOiBIVE1MU3BhbkVsZW1lbnQge1xuICAgIHJldHVybiBnZXQobGFiZWxzLCB0aGlzKTtcbiAgfVxuXG4gIHNldCBsYWJlbCh2YWx1ZTogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgbGFiZWxzLnNldCh0aGlzLCB2YWx1ZSk7XG4gIH1cblxuICBnZXQgb3JpZ2luKCk6IFBvaW50IHtcbiAgICByZXR1cm4gZ2V0KG9yaWdpbnMsIHRoaXMpO1xuICB9XG5cbiAgc2V0IG9yaWdpbih2YWx1ZTogUG9pbnQpIHtcbiAgICBvcmlnaW5zLnNldCh0aGlzLCB2YWx1ZSk7XG4gIH1cblxuICBnZXQgcmVjdCgpOiBSZWN0IHtcbiAgICByZXR1cm4gZ2V0KHJlY3RzLCB0aGlzKTtcbiAgfVxuXG4gIHNldCByZWN0KHZhbHVlOiBSZWN0KSB7XG4gICAgcmVjdHMuc2V0KHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIGdldCB0ZXJtaW51cygpOiBQb2ludCB7XG4gICAgcmV0dXJuIGdldCh0ZXJtaW5pLCB0aGlzKTtcbiAgfVxuXG4gIHNldCB0ZXJtaW51cyh2YWx1ZTogUG9pbnQpIHtcbiAgICB0ZXJtaW5pLnNldCh0aGlzLCB2YWx1ZSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihvdmVybGF5OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGMoYHJ1bGVyLXJlY3RgKSk7XG4gICAgaWYgKGVsKSB7XG4gICAgICB0aGlzLmVsID0gZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICAgIHRoaXMuZWwuaWQgPSBwYyhgcnVsZXItcmVjdGApO1xuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKHBjKGBydWxlci1yZWN0YCkpO1xuXG4gICAgICB0aGlzLmxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgdGhpcy5sYWJlbC5pZCA9IHBjKGBydWxlci1sYWJlbGApO1xuICAgICAgdGhpcy5sYWJlbC5jbGFzc0xpc3QuYWRkKHBjKGBydWxlci1sYWJlbGApKTtcblxuICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmxhYmVsKTtcblxuICAgICAgb3ZlcmxheS5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlY3QgPSBuZXcgUmVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdzIHRoZSBSdWxlclxuICAgKi9cbiAgZHJhdyhvcmlnaW4/OiBQb2ludCwgdGVybWludXM/OiBQb2ludCkge1xuICAgIGlmIChvcmlnaW4pIHtcbiAgICAgIHRoaXMucmVjdC5vcmlnaW4gPSBvcmlnaW47XG4gICAgfVxuXG4gICAgaWYgKHRlcm1pbnVzKSB7XG4gICAgICB0aGlzLnJlY3QudGVybWludXMgPSB0ZXJtaW51cztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucmVjdC50ZXJtaW51cy54IHx8ICF0aGlzLnJlY3QudGVybWludXMueSkge1xuICAgICAgdGhpcy5yZWN0LnRlcm1pbnVzID0gdGhpcy5yZWN0Lm9yaWdpbjtcbiAgICB9XG5cbiAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IGAke3RoaXMucmVjdC50b3B9cHhgO1xuICAgIHRoaXMuZWwuc3R5bGUucmlnaHQgPSBgJHt0aGlzLnJlY3QucmlnaHR9cHhgO1xuICAgIHRoaXMuZWwuc3R5bGUuYm90dG9tID0gYCR7dGhpcy5yZWN0LmJvdHRvbX1weGA7XG4gICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5yZWN0LmxlZnR9cHhgO1xuXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke3RoaXMucmVjdC53aWR0aH1weGA7XG4gICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLnJlY3QuaGVpZ2h0fXB4YDtcblxuICAgIGNvbnN0IGRpYWdvbmFsID0gTWF0aC5zcXJ0KFxuICAgICAgTWF0aC5wb3codGhpcy5yZWN0LndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMucmVjdC5oZWlnaHQsIDIpXG4gICAgKTtcbiAgICB0aGlzLmxhYmVsLmlubmVySFRNTCA9IGBXOiR7dGhpcy5yZWN0LndpZHRofSBIOiR7XG4gICAgICB0aGlzLnJlY3QuaGVpZ2h0XG4gICAgfSAgRDoke2RpYWdvbmFsLnRvRml4ZWQoMSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBzdGFydCBwb2ludCBmb3IgcnVsZXIgYm94XG4gICAqL1xuICBzZXRPcmlnaW4ocG9pbnQ6IFBvaW50KSB7XG4gICAgaXNEcmF3aW5ncy5zZXQodGhpcywgdHJ1ZSk7XG5cbiAgICB0aGlzLnJlY3QgPSBuZXcgUmVjdChwb2ludCk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZW5kIHBvaW50IGZvciBydWxlciBib3hcbiAgICovXG4gIHNldFRlcm1pbnVzKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMucmVjdC50ZXJtaW51cyA9IHBvaW50O1xuICAgIHRoaXMuZHJhdygpO1xuXG4gICAgaXNEcmF3aW5ncy5zZXQodGhpcywgZmFsc2UpO1xuICB9XG59XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9