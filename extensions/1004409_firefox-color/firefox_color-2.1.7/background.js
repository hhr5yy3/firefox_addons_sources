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
/******/ 	return __webpack_require__(__webpack_require__.s = 86);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANNEL_NAME; });
/* unused harmony export DOWNLOAD_FIREFOX_URL */
/* unused harmony export CUSTOM_BACKGROUND_MAXIMUM_LENGTH */
/* unused harmony export CUSTOM_BACKGROUND_MAXIMUM_SIZE */
/* unused harmony export CUSTOM_BACKGROUND_ALLOWED_TYPES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CUSTOM_BACKGROUND_DEFAULT_ALIGNMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return colorLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return advancedColorLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return fallbackColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return colorsWithoutAlpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return alphaEqualityTolerance; });
/* unused harmony export ESC */
/* unused harmony export loaderQuotes */
var CHANNEL_NAME = "FirefoxColor";
var DOWNLOAD_FIREFOX_URL = "https://www.mozilla.org/firefox/new/?utm_campaign=firefoxcolor-acquisition&utm_medium=referral&utm_source=".concat("color.firefox.com");
var CUSTOM_BACKGROUND_MAXIMUM_LENGTH = 3;
var CUSTOM_BACKGROUND_MAXIMUM_SIZE = 1000000; // Note: SVGs cannot be passed as base64.
// Bugzilla bug passed here https://bugzilla.mozilla.org/show_bug.cgi?id=1491790
// gifs also seem to break the background

var CUSTOM_BACKGROUND_ALLOWED_TYPES = ["image/jpeg", "image/png" // "image/gif",
// "image/bmp"
// "image/svg+xml"
];
var CUSTOM_BACKGROUND_DEFAULT_ALIGNMENT = "right top";
var colorLabels = {
  toolbar: "Toolbar Color",
  toolbar_text: "Toolbar Icons and Text",
  frame: "Background Color",
  tab_background_text: "Background Tab Text Color",
  toolbar_field: "Search Bar Color",
  toolbar_field_text: "Search Text",
  tab_line: "Tab Highlight Color",
  popup: "Popup Background",
  popup_text: "Popup Text"
};
var advancedColorLabels = {
  button_background_active: "Button Background Active",
  button_background_hover: "Button Background Hover",
  frame_inactive: "Frame Inactive",
  icons_attention: "Icons Attention",
  icons: "Icons",
  ntp_background: "New Tab Background Color",
  ntp_text: "New Tab Text",
  popup_border: "Popup Border",
  popup_highlight_text: "Popup Highlight Text",
  popup_highlight: "Popup Highlight",
  sidebar_border: "Sidebar Border",
  sidebar_highlight_text: "Sidebar Highlight Text",
  sidebar_highlight: "Sidebar Highlight",
  sidebar_text: "Sidebar Text",
  sidebar: "Sidebar",
  tab_background_separator: "Tab Background Separator",
  tab_loading: "Tab Loading",
  tab_selected: "Tab Selected",
  tab_text: "Tab Text",
  toolbar_bottom_separator: "Toolbar Bottom Separator",
  toolbar_field_border_focus: "Toolbar Field Border Focus",
  toolbar_field_border: "Toolbar Field Border",
  toolbar_field_focus: "Toolbar Field Focus",
  toolbar_field_highlight_text: "Toolbar Field Highlight Text",
  toolbar_field_highlight: "Toolbar Field Highlight",
  toolbar_field_separator: "Toolbar Field Separator",
  toolbar_field_text_focus: "Toolbar Field Text Focus",
  toolbar_top_separator: "Toolbar Top Separator",
  toolbar_vertical_separator: "Toolbar Vertical Separator"
};
var fallbackColors = {
  frame: "accentcolor",
  // "popup" falls back to "frame" if "popup" is void.
  // If "frame" is somehow void, then "toolbar" is used instead.
  // This is for no particular reason, besides backwards-compatibility.
  // Similarly for "popup_text".
  popup: ["frame", "toolbar"],
  popup_text: ["toolbar_text", "tab_background_text", "textcolor"],
  tab_background_text: "textcolor"
};
var colorsWithoutAlpha = ["tab_background_text", "frame", "sidebar"];
var alphaEqualityTolerance = 0.02;
var ESC = 27;
var loaderQuotes = [{
  quote: "Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.",
  attribution: "Oscar Wilde"
}, {
  quote: "The purest and most thoughtful minds are those which love color the most.",
  attribution: "John Ruskin"
}, {
  quote: "I found I could say things with color and shapes that I couldn't say any other way — things I had no words for.",
  attribution: "Georgia O'Keeffe"
}, {
  quote: "Colours and colours and colours of colours",
  attribution: "Hot Chip"
}];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if ( true && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return tinycolor;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
// Browser: Expose to window
else {}

})(Math);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./001.json": 3,
	"./002.json": 4,
	"./003.json": 5,
	"./004.json": 6,
	"./005.json": 7,
	"./006.json": 8,
	"./007.json": 9,
	"./008.json": 10,
	"./009.json": 11,
	"./010.json": 12,
	"./011.json": 13,
	"./012.json": 14,
	"./013.json": 15,
	"./014.json": 16,
	"./015.json": 17,
	"./016.json": 18,
	"./017.json": 19,
	"./018.json": 20,
	"./019.json": 21,
	"./020.json": 22,
	"./021.json": 23,
	"./022.json": 24,
	"./default.json": 25,
	"./hotdog.json": 26
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 2;

/***/ }),
/* 3 */
/***/ (function(module) {

module.exports = JSON.parse("{\"colors\":{\"toolbar\":{\"r\":43,\"g\":206,\"b\":227},\"toolbar_text\":{\"r\":215,\"g\":226,\"b\":239},\"frame\":{\"r\":115,\"g\":214,\"b\":228},\"tab_background_text\":{\"r\":84,\"g\":84,\"b\":84},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0.53},\"toolbar_field_text\":{\"r\":255,\"g\":71,\"b\":203},\"tab_line\":{\"r\":255,\"g\":66,\"b\":205},\"popup\":{\"r\":231,\"g\":242,\"b\":244},\"popup_text\":{\"r\":84,\"g\":84,\"b\":84}},\"images\":{\"additional_backgrounds\":[\"./bg-024.svg\"]},\"title\":\"001\"}");

/***/ }),
/* 4 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"002\",\"colors\":{\"toolbar\":{\"r\":7,\"g\":50,\"b\":84},\"toolbar_text\":{\"r\":67,\"g\":194,\"b\":218},\"frame\":{\"r\":14,\"g\":41,\"b\":65},\"tab_background_text\":{\"r\":24,\"g\":156,\"b\":180},\"toolbar_field\":{\"r\":38,\"g\":72,\"b\":102},\"toolbar_field_text\":{\"r\":67,\"g\":194,\"b\":218},\"tab_line\":{\"r\":67,\"g\":194,\"b\":218},\"popup\":{\"r\":7,\"g\":50,\"b\":84},\"popup_text\":{\"r\":24,\"g\":156,\"b\":180}},\"images\":{\"additional_backgrounds\":[]}}");

/***/ }),
/* 5 */
/***/ (function(module) {

module.exports = JSON.parse("{\"colors\":{\"toolbar\":{\"r\":58,\"g\":89,\"b\":105,\"a\":0.17},\"toolbar_text\":{\"r\":247,\"g\":253,\"b\":251},\"frame\":{\"r\":157,\"g\":183,\"b\":190},\"tab_background_text\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field_text\":{\"r\":90,\"g\":93,\"b\":154},\"tab_line\":{\"r\":218,\"g\":135,\"b\":124},\"popup\":{\"r\":255,\"g\":255,\"b\":255},\"popup_text\":{\"r\":90,\"g\":93,\"b\":154}},\"images\":{\"additional_backgrounds\":[\"./bg-036.svg\"]},\"title\":\"003\"}");

/***/ }),
/* 6 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"004\",\"colors\":{\"toolbar\":{\"r\":31,\"g\":34,\"b\":61},\"toolbar_text\":{\"r\":255,\"g\":255,\"b\":255},\"frame\":{\"r\":8,\"g\":11,\"b\":33},\"tab_background_text\":{\"r\":215,\"g\":226,\"b\":239},\"toolbar_field\":{\"r\":54,\"g\":58,\"b\":89},\"toolbar_field_text\":{\"r\":255,\"g\":255,\"b\":255},\"tab_line\":{\"r\":205,\"g\":35,\"b\":185},\"popup\":{\"r\":31,\"g\":34,\"b\":61},\"popup_text\":{\"r\":215,\"g\":226,\"b\":239}}}");

/***/ }),
/* 7 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"005\",\"colors\":{\"toolbar\":{\"r\":236,\"g\":220,\"b\":249},\"toolbar_text\":{\"r\":159,\"g\":65,\"b\":190},\"frame\":{\"r\":223,\"g\":182,\"b\":246},\"tab_background_text\":{\"r\":159,\"g\":65,\"b\":190},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0},\"toolbar_field_text\":{\"r\":159,\"g\":65,\"b\":190},\"tab_line\":{\"r\":253,\"g\":124,\"b\":73},\"popup\":{\"r\":236,\"g\":220,\"b\":249},\"popup_text\":{\"r\":159,\"g\":65,\"b\":190}},\"images\":{\"additional_backgrounds\":[\"./bg-014.svg\"]}}");

/***/ }),
/* 8 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"006\",\"colors\":{\"toolbar\":{\"r\":243,\"g\":244,\"b\":247},\"toolbar_text\":{\"r\":185,\"g\":17,\"b\":223},\"frame\":{\"r\":255,\"g\":255,\"b\":255},\"tab_background_text\":{\"r\":185,\"g\":17,\"b\":223},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field_text\":{\"r\":185,\"g\":17,\"b\":223},\"tab_line\":{\"r\":185,\"g\":17,\"b\":223},\"popup\":{\"r\":243,\"g\":244,\"b\":247},\"popup_text\":{\"r\":185,\"g\":17,\"b\":223}},\"images\":{\"additional_backgrounds\":[]}}");

/***/ }),
/* 9 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"007\",\"colors\":{\"toolbar\":{\"r\":22,\"g\":72,\"b\":75,\"a\":0.8},\"toolbar_text\":{\"r\":27,\"g\":170,\"b\":177},\"frame\":{\"r\":22,\"g\":54,\"b\":75},\"tab_background_text\":{\"r\":148,\"g\":157,\"b\":173},\"toolbar_field\":{\"r\":0,\"g\":0,\"b\":0,\"a\":0.2},\"toolbar_field_text\":{\"r\":251,\"g\":131,\"b\":165},\"tab_line\":{\"r\":28,\"g\":171,\"b\":176},\"popup\":{\"r\":22,\"g\":54,\"b\":75},\"popup_text\":{\"r\":251,\"g\":131,\"b\":165}},\"images\":{\"additional_backgrounds\":[]}}");

/***/ }),
/* 10 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"008\",\"colors\":{\"toolbar\":{\"r\":219,\"g\":220,\"b\":219},\"toolbar_text\":{\"r\":136,\"g\":141,\"b\":129},\"frame\":{\"r\":201,\"g\":197,\"b\":197},\"tab_background_text\":{\"r\":245,\"g\":78,\"b\":41},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0.7},\"toolbar_field_text\":{\"r\":132,\"g\":168,\"b\":67},\"tab_line\":{\"r\":245,\"g\":75,\"b\":41},\"popup\":{\"r\":219,\"g\":220,\"b\":219},\"popup_text\":{\"r\":87,\"g\":120,\"b\":33}},\"images\":{\"additional_backgrounds\":[]}}");

/***/ }),
/* 11 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"009\",\"colors\":{\"toolbar\":{\"r\":248,\"g\":237,\"b\":236},\"toolbar_text\":{\"r\":140,\"g\":89,\"b\":87},\"frame\":{\"r\":243,\"g\":223,\"b\":223},\"tab_background_text\":{\"r\":140,\"g\":89,\"b\":87},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field_text\":{\"r\":140,\"g\":89,\"b\":87},\"tab_line\":{\"r\":140,\"g\":89,\"b\":87},\"popup\":{\"r\":248,\"g\":237,\"b\":236},\"popup_text\":{\"r\":140,\"g\":89,\"b\":87}},\"images\":{\"additional_backgrounds\":[]}}");

/***/ }),
/* 12 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"010\",\"colors\":{\"toolbar\":{\"r\":245,\"g\":255,\"b\":252},\"toolbar_text\":{\"r\":0,\"g\":0,\"b\":0},\"frame\":{\"r\":215,\"g\":234,\"b\":234},\"tab_background_text\":{\"r\":0,\"g\":0,\"b\":0},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field_text\":{\"r\":0,\"g\":0,\"b\":0},\"tab_line\":{\"r\":0,\"g\":255,\"b\":200},\"popup\":{\"r\":245,\"g\":255,\"b\":252},\"popup_text\":{\"r\":0,\"g\":0,\"b\":0}},\"images\":{\"additional_backgrounds\":[\"./bg-045.svg\"]}}");

/***/ }),
/* 13 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"011\",\"colors\":{\"toolbar\":{\"r\":235,\"g\":235,\"b\":235},\"toolbar_text\":{\"r\":88,\"g\":151,\"b\":223},\"frame\":{\"r\":201,\"g\":212,\"b\":222},\"tab_background_text\":{\"r\":240,\"g\":140,\"b\":40},\"toolbar_field\":{\"r\":248,\"g\":241,\"b\":211},\"toolbar_field_text\":{\"r\":118,\"g\":132,\"b\":98},\"tab_line\":{\"r\":255,\"g\":51,\"b\":51},\"popup\":{\"r\":235,\"g\":235,\"b\":235},\"popup_text\":{\"r\":255,\"g\":51,\"b\":51}},\"images\":{\"additional_backgrounds\":[\"./bg-020.svg\"]}}");

/***/ }),
/* 14 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"012\",\"colors\":{\"toolbar\":{\"r\":233,\"g\":237,\"b\":240},\"toolbar_text\":{\"r\":214,\"g\":81,\"b\":109},\"frame\":{\"r\":73,\"g\":153,\"b\":201},\"tab_background_text\":{\"r\":248,\"g\":248,\"b\":248},\"toolbar_field\":{\"r\":252,\"g\":252,\"b\":252},\"toolbar_field_text\":{\"r\":214,\"g\":81,\"b\":109},\"tab_line\":{\"r\":214,\"g\":81,\"b\":109},\"popup\":{\"r\":233,\"g\":237,\"b\":240},\"popup_text\":{\"r\":177,\"g\":63,\"b\":87}},\"images\":{\"additional_backgrounds\":[\"./bg-011.svg\"]}}");

/***/ }),
/* 15 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"013\",\"colors\":{\"toolbar\":{\"r\":225,\"g\":234,\"b\":239,\"a\":0.41},\"toolbar_text\":{\"r\":255,\"g\":138,\"b\":163},\"frame\":{\"r\":60,\"g\":105,\"b\":134},\"tab_background_text\":{\"r\":255,\"g\":138,\"b\":163},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field_text\":{\"r\":123,\"g\":127,\"b\":204},\"tab_line\":{\"r\":255,\"g\":138,\"b\":163},\"popup\":{\"r\":225,\"g\":234,\"b\":239},\"popup_text\":{\"r\":60,\"g\":105,\"b\":134}},\"images\":{\"additional_backgrounds\":[\"./bg-031.svg\"]}}");

/***/ }),
/* 16 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"014\",\"colors\":{\"toolbar\":{\"r\":251,\"g\":203,\"b\":251,\"a\":0.86},\"toolbar_text\":{\"r\":102,\"g\":102,\"b\":194},\"frame\":{\"r\":247,\"g\":212,\"b\":212},\"tab_background_text\":{\"r\":104,\"g\":104,\"b\":196},\"toolbar_field\":{\"r\":102,\"g\":118,\"b\":225,\"a\":0.26},\"toolbar_field_text\":{\"r\":255,\"g\":255,\"b\":255},\"tab_line\":{\"r\":102,\"g\":102,\"b\":194},\"popup\":{\"r\":245,\"g\":226,\"b\":226},\"popup_text\":{\"r\":104,\"g\":104,\"b\":196}},\"images\":{\"additional_backgrounds\":[\"./bg-030.svg\"]}}");

/***/ }),
/* 17 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"015\",\"colors\":{\"toolbar\":{\"r\":27,\"g\":40,\"b\":45},\"toolbar_text\":{\"r\":143,\"g\":143,\"b\":143},\"frame\":{\"r\":0,\"g\":0,\"b\":0},\"tab_background_text\":{\"r\":140,\"g\":140,\"b\":140},\"toolbar_field\":{\"r\":0,\"g\":0,\"b\":0},\"toolbar_field_text\":{\"r\":255,\"g\":255,\"b\":255},\"tab_line\":{\"r\":35,\"g\":205,\"b\":179},\"popup\":{\"r\":27,\"g\":40,\"b\":45},\"popup_text\":{\"r\":140,\"g\":140,\"b\":140}},\"images\":{\"additional_backgrounds\":[\"./bg-026.svg\"]}}");

/***/ }),
/* 18 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"016\",\"colors\":{\"toolbar\":{\"r\":220,\"g\":181,\"b\":253,\"a\":0.86},\"toolbar_text\":{\"r\":255,\"g\":255,\"b\":255},\"frame\":{\"r\":220,\"g\":203,\"b\":216},\"tab_background_text\":{\"r\":0,\"g\":0,\"b\":0},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0.21},\"toolbar_field_text\":{\"r\":255,\"g\":255,\"b\":255},\"tab_line\":{\"r\":255,\"g\":255,\"b\":255},\"popup\":{\"r\":234,\"g\":235,\"b\":246},\"popup_text\":{\"r\":153,\"g\":51,\"b\":255}},\"images\":{\"additional_backgrounds\":[\"./bg-043.svg\"]}}");

/***/ }),
/* 19 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"017\",\"colors\":{\"toolbar\":{\"r\":234,\"g\":235,\"b\":246},\"toolbar_text\":{\"r\":255,\"g\":138,\"b\":163},\"frame\":{\"r\":233,\"g\":225,\"b\":234},\"tab_background_text\":{\"r\":255,\"g\":138,\"b\":163},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field_text\":{\"r\":153,\"g\":51,\"b\":255},\"tab_line\":{\"r\":153,\"g\":51,\"b\":255},\"popup\":{\"r\":234,\"g\":235,\"b\":246},\"popup_text\":{\"r\":153,\"g\":51,\"b\":255}},\"images\":{\"additional_backgrounds\":[\"./bg-012.svg\"]}}");

/***/ }),
/* 20 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"018\",\"colors\":{\"toolbar\":{\"r\":181,\"g\":242,\"b\":253,\"a\":0.77},\"toolbar_text\":{\"r\":255,\"g\":255,\"b\":255},\"frame\":{\"r\":225,\"g\":86,\"b\":193},\"tab_background_text\":{\"r\":0,\"g\":15,\"b\":1},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0.21},\"toolbar_field_text\":{\"r\":221,\"g\":8,\"b\":175},\"tab_line\":{\"r\":255,\"g\":255,\"b\":255},\"popup\":{\"r\":255,\"g\":255,\"b\":255},\"popup_text\":{\"r\":0,\"g\":15,\"b\":1}},\"images\":{\"additional_backgrounds\":[\"./bg-041.svg\"]}}");

/***/ }),
/* 21 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"019\",\"colors\":{\"toolbar\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0.64},\"toolbar_text\":{\"r\":0,\"g\":187,\"b\":255},\"frame\":{\"r\":221,\"g\":249,\"b\":118},\"tab_background_text\":{\"r\":0,\"g\":187,\"b\":255},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0.36},\"toolbar_field_text\":{\"r\":0,\"g\":183,\"b\":255},\"tab_line\":{\"r\":0,\"g\":183,\"b\":255},\"popup\":{\"r\":255,\"g\":255,\"b\":255},\"popup_text\":{\"r\":5,\"g\":124,\"b\":167}},\"images\":{\"additional_backgrounds\":[\"./bg-027.svg\"]}}");

/***/ }),
/* 22 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"020\",\"colors\":{\"toolbar\":{\"r\":91,\"g\":210,\"b\":230,\"a\":0.7},\"toolbar_text\":{\"r\":28,\"g\":71,\"b\":227},\"frame\":{\"r\":162,\"g\":234,\"b\":235},\"tab_background_text\":{\"r\":0,\"g\":15,\"b\":1},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0},\"toolbar_field_text\":{\"r\":0,\"g\":15,\"b\":1},\"tab_line\":{\"r\":28,\"g\":71,\"b\":227},\"popup\":{\"r\":162,\"g\":234,\"b\":235},\"popup_text\":{\"r\":28,\"g\":71,\"b\":227}},\"images\":{\"additional_backgrounds\":[\"./bg-044.svg\"]}}");

/***/ }),
/* 23 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"021\",\"colors\":{\"toolbar\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_text\":{\"r\":255,\"g\":0,\"b\":0},\"frame\":{\"r\":255,\"g\":255,\"b\":255},\"tab_background_text\":{\"r\":255,\"g\":0,\"b\":0},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field_text\":{\"r\":255,\"g\":0,\"b\":0},\"tab_line\":{\"r\":255,\"g\":0,\"b\":0},\"popup\":{\"r\":255,\"g\":255,\"b\":255},\"popup_text\":{\"r\":255,\"g\":0,\"b\":0}},\"images\":{\"additional_backgrounds\":[\"./bg-011.svg\"]}}");

/***/ }),
/* 24 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"022\",\"colors\":{\"toolbar\":{\"r\":138,\"g\":204,\"b\":255,\"a\":0.49},\"toolbar_text\":{\"r\":222,\"g\":18,\"b\":181},\"frame\":{\"r\":80,\"g\":226,\"b\":192},\"tab_background_text\":{\"r\":185,\"g\":17,\"b\":223},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255,\"a\":0.36},\"toolbar_field_text\":{\"r\":185,\"g\":17,\"b\":223},\"tab_line\":{\"r\":222,\"g\":18,\"b\":181},\"popup\":{\"r\":228,\"g\":243,\"b\":255},\"popup_text\":{\"r\":185,\"g\":17,\"b\":223}},\"images\":{\"additional_backgrounds\":[\"./bg-034.svg\"]}}");

/***/ }),
/* 25 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"default\",\"colors\":{\"toolbar\":{\"r\":225,\"g\":234,\"b\":239},\"toolbar_text\":{\"r\":248,\"g\":112,\"b\":140},\"frame\":{\"r\":142,\"g\":179,\"b\":201},\"tab_background_text\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field\":{\"r\":255,\"g\":255,\"b\":255},\"toolbar_field_text\":{\"r\":123,\"g\":127,\"b\":204},\"tab_line\":{\"r\":248,\"g\":112,\"b\":140},\"popup\":{\"r\":255,\"g\":255,\"b\":255},\"popup_text\":{\"r\":98,\"g\":102,\"b\":183}},\"images\":{\"additional_backgrounds\":[\"./bg-009.svg\"]}}");

/***/ }),
/* 26 */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"Hotdog Stand 🌭\",\"colors\":{\"toolbar\":{\"r\":255,\"g\":255,\"b\":0},\"toolbar_text\":{\"r\":0,\"g\":0,\"b\":0},\"frame\":{\"r\":255,\"g\":0,\"b\":0},\"tab_background_text\":{\"r\":0,\"g\":0,\"b\":0},\"toolbar_field\":{\"r\":0,\"g\":0,\"b\":0},\"toolbar_field_text\":{\"r\":255,\"g\":255,\"b\":255},\"tab_line\":{\"r\":0,\"g\":0,\"b\":0},\"popup\":{\"r\":255,\"g\":255,\"b\":0},\"popup_text\":{\"r\":0,\"g\":0,\"b\":0}}}");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bg-000.svg": 28,
	"./bg-001.svg": 29,
	"./bg-002.svg": 30,
	"./bg-003.svg": 31,
	"./bg-004.svg": 32,
	"./bg-005.svg": 33,
	"./bg-006.svg": 34,
	"./bg-007.svg": 35,
	"./bg-008.svg": 36,
	"./bg-009.svg": 37,
	"./bg-010.svg": 38,
	"./bg-011.svg": 39,
	"./bg-012.svg": 40,
	"./bg-013.svg": 41,
	"./bg-014.svg": 42,
	"./bg-015.svg": 43,
	"./bg-016.svg": 44,
	"./bg-017.svg": 45,
	"./bg-018.svg": 46,
	"./bg-019.svg": 47,
	"./bg-020.svg": 48,
	"./bg-021.svg": 49,
	"./bg-022.svg": 50,
	"./bg-023.svg": 51,
	"./bg-024.svg": 52,
	"./bg-025.svg": 53,
	"./bg-026.svg": 54,
	"./bg-027.svg": 55,
	"./bg-028.svg": 56,
	"./bg-029.svg": 57,
	"./bg-030.svg": 58,
	"./bg-031.svg": 59,
	"./bg-032.svg": 60,
	"./bg-033.svg": 61,
	"./bg-034.svg": 62,
	"./bg-035.svg": 63,
	"./bg-036.svg": 64,
	"./bg-037.svg": 65,
	"./bg-038.svg": 66,
	"./bg-039.svg": 67,
	"./bg-040.svg": 68,
	"./bg-041.svg": 69,
	"./bg-042.svg": 70,
	"./bg-043.svg": 71,
	"./bg-044.svg": 72,
	"./bg-045.svg": 73
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 27;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-000-5672c42860d5b06e1058dc477397f3ef.svg";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-001-9c6d74e14860e77ee6f8f43e824bff25.svg";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-002-609370e89a219e0548ac5ef6b4a7dd2e.svg";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-003-31b6bea3c78e3a19fd889b0389652a94.svg";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-004-411c27df18d2f86bd8790aa4a1bde85f.svg";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-005-f5f3cf677b1f132c75ddc7bd319dd1fc.svg";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-006-51ab495c5f5dde6a3cddb22484acd00d.svg";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-007-ea06061a8f8be943739a27dace8dc532.svg";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-008-60d2718f8c915b5ba09f31df5555b459.svg";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-009-f069b97f439938a011297c84464f0df6.svg";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-010-e9f94a3e61666a4c7677eb9cce17d854.svg";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-011-d53e0d0d1538ed554a90e056a2f04eca.svg";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-012-1e971c5fbb8dec3acbd76dd6c6819de9.svg";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-013-06591d4ad28ab7b9ee90f62f81d6b505.svg";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-014-1586da559b26f11cd37804ee9347a16b.svg";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-015-79a105bb546d3dfdd686392cf3ad1f57.svg";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-016-af8c49de75012ca2c007f953ff2e4499.svg";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-017-7074520d97b5c592d413aed5f115f093.svg";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-018-0ca3dfc7bb661ec53999d358812ce0ab.svg";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-019-7ce748211c61f9059493d4c4378e8a74.svg";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-020-48c286b34e53380d46803c2e5603a5b2.svg";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-021-775b159da029a74f5c76e835cd65e9dc.svg";

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-022-0e8aa16bfcfce2449791412d89f3a92b.svg";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-023-f741aad3989b46322a7840a425068429.svg";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-024-8de86d890779309c9a66423c64daa480.svg";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-025-ffb27cfded66d27a465aeffe41e9fe61.svg";

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-026-829b05416f823e170310e7c826ad1bec.svg";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-027-1049af643fc55b4ffd4a8575444547c5.svg";

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-028-5466583598afcc175c90e35aceb1246b.svg";

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-029-cc9cab928c1799136d18758709e91ecc.svg";

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-030-0f935cfde055600d01a959c5c15353de.svg";

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-031-9570e8d1f7a5f835c92e764693337f43.svg";

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-032-c7f80ac9e21af771c8d088973b1309ea.svg";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-033-cf10aca0d9374ba108ef8e68a5f5e931.svg";

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-034-e0dfa84411058d2e5627f19f1ea501ca.svg";

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-035-ec6e2e3635b86a13a7ebee9a1390e7e7.svg";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-036-40a272fe657f748396e017c7a64ee2dc.svg";

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-037-b73f9b34467ba541de861f5b4c0c6316.svg";

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-038-6c77b9d7dc86f50c6cd82f9c9b1f36f0.svg";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-039-717a66ba4d455686088c80f391cb3264.svg";

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-040-0df8e190c15355cd3fa41a58e86426a9.svg";

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-041-077a603513df821d182a70f010b4ab5e.svg";

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-042-ce07393efde7786b9dae05d4718b10e5.svg";

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-043-dfcec5f93f7a29f97b030eda45530203.svg";

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-044-2454b1459f8c4ee2e38d41030bf1580e.svg";

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-045-3e6898966e6ccdc87f80d23d4e7a6a49.svg";

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./back-16.svg": 75,
	"./bookmark-16.svg": 76,
	"./close-16.svg": 77,
	"./forward-16.svg": 78,
	"./home-16.svg": 79,
	"./info-16.svg": 80,
	"./menu-16.svg": 81,
	"./more-16.svg": 82,
	"./refresh-16.svg": 83,
	"./sidebar-16.svg": 84
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 74;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/back-16-592b5b4ebc003e330420cbd7ebc8d94e.svg";

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bookmark-16-44751589a819f431ff6abcb1de056740.svg";

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/close-16-a227168a97a23d7359673c7047ad71a5.svg";

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/forward-16-497e8f409c9868766abdbaf7abec5a9c.svg";

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/home-16-858938ee93b6c736c37c0399f1df0c33.svg";

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/info-16-1196b1872a7fd89ab8f0f67df3c15bfb.svg";

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/menu-16-3e6a44ec93be55b771089a4508c3c32b.svg";

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/more-16-19d411a9b6cbd8a244aea7f6825fd32d.svg";

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/refresh-16-d15f25bea11bb6fc2fbfacc7b0e0c2e4.svg";

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/sidebar-16-0202124bef8dfa443f16ec67c905dd7d.svg";

/***/ }),
/* 85 */,
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/lib/utils.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEBUG = "production" === "development";
var makeLog = function makeLog(context) {
  return function () {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (// eslint-disable-next-line no-console
      DEBUG && (_console = console).log.apply(_console, ["[FirefoxColor ".concat(context, "]")].concat(args))
    );
  };
};
var getCustomImages = function getCustomImages() {
  var backgroundImages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return backgroundImages.map(function (item) {
    var customImage = _objectSpread({}, item);

    var image = JSON.parse(localStorage.getItem("IMAGE-".concat(item.name)));

    if (image) {
      customImage.image = images[item.name] && images[item.name].image;
      return customImage;
    }

    return null;
  }).filter(Boolean);
};
// EXTERNAL MODULE: ./node_modules/tinycolor2/tinycolor.js
var tinycolor = __webpack_require__(1);
var tinycolor_default = /*#__PURE__*/__webpack_require__.n(tinycolor);

// EXTERNAL MODULE: ./src/lib/constants.js
var constants = __webpack_require__(0);

// CONCATENATED MODULE: ./src/lib/assets.js
var presetThemesContext = __webpack_require__(2);
var assets_bgImages = __webpack_require__(27);
var buttonImages = __webpack_require__(74);
// CONCATENATED MODULE: ./src/lib/themes.js
function themes_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function themes_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { themes_ownKeys(Object(source), true).forEach(function (key) { themes_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { themes_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function themes_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var defaultTheme = presetThemesContext("./default.json");
var IMAGE_PROPS = ["name", "tiling", "alignment"];
var themes_themesEqual = function themesEqual(themeA, themeB) {
  if (!!themeA !== !!themeB) {
    return false;
  }

  var hasImagesA = "images" in themeA && "additional_backgrounds" in themeA.images;
  var hasImagesB = "images" in themeB && "additional_backgrounds" in themeB.images;

  if (hasImagesA !== hasImagesB) {
    return false;
  }

  if (hasImagesA && hasImagesB) {
    // HACK: We only allow one image at this point, so be lazy:
    if (themeA.images.additional_backgrounds[0] !== themeB.images.additional_backgrounds[0]) {
      return false;
    }
  }

  var imagesA = themeA.images && themeA.images.custom_backgrounds || [];
  var imagesB = themeB.images && themeB.images.custom_backgrounds || [];

  if (imagesA.length !== imagesB.length) {
    return false;
  }

  for (var idx = 0; idx < imagesA.length; idx++) {
    for (var propIdx = 0; propIdx < IMAGE_PROPS.length; propIdx++) {
      if (imagesA[idx][IMAGE_PROPS[propIdx]] !== imagesB[idx][IMAGE_PROPS[propIdx]]) {
        return false;
      }
    }
  } // TODO: Skipping title equality, because user themes don't have titles yet.


  var hasColorsA = ("colors" in themeA);
  var hasColorsB = ("colors" in themeB);

  if (hasColorsA !== hasColorsB) {
    return false;
  }

  if (!hasColorsA && !hasColorsB) {
    // HACK: Not having colors is invalid, but let's call them equal anyway.
    return true;
  }

  var colorNames = [].concat(_toConsumableArray(Object.keys(constants["e" /* colorLabels */])), _toConsumableArray(Object.keys(constants["c" /* advancedColorLabels */])));

  var _iterator = _createForOfIteratorHelper(colorNames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _colorA$a, _colorB$a;

      var name = _step.value;
      var inA = (name in themeA.colors);
      var inB = (name in themeB.colors);

      if (inA !== inB) {
        return false;
      }

      if (!inA && !inB) {
        continue;
      }

      var colorA = themeA.colors[name];
      var colorB = themeB.colors[name];

      for (var _i = 0, _arr = ["r", "g", "b"]; _i < _arr.length; _i++) {
        var channel = _arr[_i];

        if (colorA[channel] !== colorB[channel]) {
          return false;
        }
      }

      var alphaA = (_colorA$a = colorA.a) !== null && _colorA$a !== void 0 ? _colorA$a : 1;
      var alphaB = (_colorB$a = colorB.a) !== null && _colorB$a !== void 0 ? _colorB$a : 1;

      if (Math.abs(alphaA - alphaB) > constants["d" /* alphaEqualityTolerance */]) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
};
var themes_makeTinycolor = function makeTinycolor(colorIn) {
  var color = themes_objectSpread({}, colorIn);

  if ("s" in color) {
    color.s = Math.floor(color.s) / 100.0;
  }

  if ("a" in color) {
    // HACK: normalize alpha value to two decimal places - LOL JS FP WTF
    if (color.a > 1.0) {
      color.a = Math.floor(color.a) / 100.0;
    }

    color.a = Math.ceil(color.a * 100) / 100.0;
  }

  return tinycolor_default()(color);
};
var colorToCSS = function colorToCSS(colorIn) {
  return themes_makeTinycolor(colorIn).toRgbString();
};
var themes_normalizeThemeBackground = function normalizeThemeBackground(background) {
  return assets_bgImages.keys().includes(background) ? background : null;
}; // Utility to ensure normal & consistent colors

var themes_normalizeThemeColor = function normalizeThemeColor(name, data, defaultColor) {
  var inColor = data || defaultColor;
  var color = themes_makeTinycolor(inColor).toRgb();

  if (constants["f" /* colorsWithoutAlpha */].includes(name) || color.a === 1) {
    delete color.a;
  }

  return color;
};
var themes_normalizeThemeColors = function normalizeThemeColors() {
  var colors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var out = {};
  var defaultColors = defaultTheme.colors;

  var resolveColor = function resolveColor(name) {
    var color = colors[name];

    if (color) {
      return color;
    }

    name = constants["g" /* fallbackColors */][name];

    if (Array.isArray(name)) {
      name = name.find(function (n) {
        return colors[n];
      });
    }

    return colors[name];
  };

  Object.keys(defaultColors).forEach(function (name) {
    var matchedColor = resolveColor(name);
    var color = themes_normalizeThemeColor(name, matchedColor, defaultColors[name]);
    out[name] = color;
  });
  Object.keys(constants["c" /* advancedColorLabels */]).forEach(function (name) {
    var matchedColor = resolveColor(name);

    if (matchedColor) {
      out[name] = themes_normalizeThemeColor(name, matchedColor);
    }
  });
  return out;
}; // Utility to ensure normal properties and values in app theme state

var normalizeTheme = function normalizeTheme() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var images = data.images ? data.images : {};
  var colors = data.colors ? data.colors : {};
  var theme = {
    colors: themes_normalizeThemeColors(colors),
    images: {
      additional_backgrounds: []
    },
    title: data.title
  };
  var theme_frame = images.theme_frame || images.headerURL;

  if (theme_frame) {
    var background = themes_normalizeThemeBackground(theme_frame);

    if (background) {
      theme.images.additional_backgrounds = [background];
    }
  }

  if (images.custom_backgrounds) {
    if (!Array.isArray(theme.images.custom_backgrounds)) {
      theme.images.custom_backgrounds = [];
    }

    theme.images.custom_backgrounds = images.custom_backgrounds || [];
  }

  if (images.additional_backgrounds) {
    var _background = themes_normalizeThemeBackground(images.additional_backgrounds[0]);

    if (_background) {
      theme.images.additional_backgrounds = [_background];
    }
  }

  return theme;
};
var presetThemes = presetThemesContext.keys().map(function (filename, idx) {
  return themes_objectSpread({
    idx: idx,
    filename: filename
  }, normalizeTheme(presetThemesContext(filename)));
}).sort(function (_ref, _ref2) {
  var a = _ref.filename;
  var b = _ref2.filename;
  return a.localeCompare(b);
});
var themes_convertToBrowserTheme = function convertToBrowserTheme(themeData, bgImages, customBackgrounds) {
  var newTheme = {
    images: {},
    properties: {},
    colors: {}
  }; // Ensure that the theme data is normalized and any deprecated theme
  // property has been replaced with a supported one (and/or removed from
  // the theme object).

  var theme = normalizeTheme(themeData);
  var custom_backgrounds = theme.images.custom_backgrounds || [];

  if (custom_backgrounds.length) {
    var additional_backgrounds = [];
    var additional_backgrounds_alignment = [];
    var additional_backgrounds_tiling = [];
    custom_backgrounds.forEach(function (_ref3) {
      var name = _ref3.name,
          alignment = _ref3.alignment,
          tiling = _ref3.tiling;
      var background = customBackgrounds[name];

      if (!background || !background.image) {
        return;
      }

      additional_backgrounds.push(background.image);
      additional_backgrounds_alignment.push(alignment || constants["b" /* CUSTOM_BACKGROUND_DEFAULT_ALIGNMENT */]);
      additional_backgrounds_tiling.push(tiling || "no-repeat");
    });
    newTheme.images.additional_backgrounds = additional_backgrounds;
    Object.assign(newTheme.properties, {
      additional_backgrounds_alignment: additional_backgrounds_alignment,
      additional_backgrounds_tiling: additional_backgrounds_tiling
    });
  } else {
    var background = themes_normalizeThemeBackground(theme.images.additional_backgrounds[0]);

    if (background) {
      newTheme.images.additional_backgrounds = [bgImages(background)];
      Object.assign(newTheme.properties, {
        additional_backgrounds_alignment: ["top"],
        additional_backgrounds_tiling: ["repeat"]
      });
    }
  }

  Object.keys(theme.colors).forEach(function (key) {
    newTheme.colors[key] = colorToCSS(theme.colors[key]);
  });

  if (!theme.colors.tab_loading) {
    // TODO: we will need to actually create this field in
    // theme manifests as part of #93.
    newTheme.colors.tab_loading = colorToCSS(theme.colors.tab_line);
  }

  return newTheme;
};
// CONCATENATED MODULE: ./src/extension/background.js
function background_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function background_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { background_ownKeys(Object(source), true).forEach(function (key) { background_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { background_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function background_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var log = makeLog("background");
var siteUrl = "https://color.firefox.com/";
var background_customBackgrounds = {};
var isThemePreview = false;
var extensionVersion = browser.runtime.getManifest().version;

var init = function init() {
  browser.browserAction.onClicked.addListener(function () {
    queryAndFocusTab("fromAddon=true");
  });
  browser.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(messageListener(port));
    port.postMessage({
      type: "hello",
      extensionVersion: extensionVersion
    });
    port.onDisconnect.addListener(function () {
      if (isThemePreview) {
        isThemePreview = false;

        _fetchTheme().then(background_applyTheme);
      }
    });
  });
  fetchFirstRunDone().then(function (_ref) {
    var firstRunDone = _ref.firstRunDone;
    log("firstRunDone", firstRunDone);

    if (firstRunDone) {
      fetchImages().then(function (_ref2) {
        var images = _ref2.images;
        background_customBackgrounds = images || {};
        return _fetchTheme();
      }).then(background_applyTheme);
    } else {
      log("Opening first run tab");
      queryAndFocusTab("firstRun=true", true);
      setFirstRunDone();
    }
  });
};

var messageListener = function messageListener(port) {
  return function (message) {
    var type = message.type;
    messageHandlers[type in messageHandlers ? type : "default"](message, port);
  };
};

var messageHandlers = {
  fetchTheme: function fetchTheme(message, port) {
    log("fetchTheme");

    _fetchTheme().then(function (_ref3) {
      var currentTheme = _ref3.theme;
      return port.postMessage({
        type: "fetchedTheme",
        theme: currentTheme
      });
    });
  },
  revertAll: function revertAll(message) {
    log("revertAllThemes", message);
    storeTheme({
      theme: null
    });
    queryAndFocusTab("", true);
    browser.theme.reset();
  },
  setTheme: function setTheme(message) {
    var theme = normalizeTheme(message.theme);
    log("setTheme", theme);
    storeTheme({
      theme: theme
    });
    background_applyTheme({
      theme: theme
    });
  },
  previewTheme: function previewTheme(_ref4) {
    var theme = _ref4.theme;
    log("previewTheme", theme);

    if (theme) {
      var previewTheme = normalizeTheme(theme);
      background_applyTheme({
        theme: previewTheme
      });
      isThemePreview = true;
    } else {
      _fetchTheme().then(background_applyTheme);

      isThemePreview = false;
    }
  },
  ping: function ping(message, port) {
    port.postMessage({
      type: "pong",
      extensionVersion: extensionVersion
    });
  },
  addImage: function addImage(_ref5) {
    var image = _ref5.image;
    log("addImage", image, background_customBackgrounds);
    background_customBackgrounds[image.name] = image;
    storeImages({
      images: background_customBackgrounds
    });
  },
  addImages: function addImages(_ref6) {
    var _ref6$images = _ref6.images,
        images = _ref6$images === void 0 ? {} : _ref6$images;
    log("addImages", images, background_customBackgrounds);
    Object.assign(background_customBackgrounds, images);
    storeImages({
      images: background_customBackgrounds
    });
  },
  updateImage: function updateImage(_ref7) {
    var image = _ref7.image;
    log("updateImage", image, background_customBackgrounds);
    var orig = background_customBackgrounds[image.name];
    background_customBackgrounds[image.name] = background_objectSpread({}, orig, {}, image);
    storeImages({
      images: background_customBackgrounds
    });
  },
  deleteImages: function deleteImages(_ref8) {
    var images = _ref8.images;
    log("deleteImages", images, background_customBackgrounds);
    images.forEach(function (name) {
      return delete background_customBackgrounds[name];
    });
    storeImages({
      images: background_customBackgrounds
    });
  },
  default: function _default(message) {
    log("unexpected message", message);
  }
};

var queryAndFocusTab = function queryAndFocusTab(params) {
  var reload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  browser.tabs.query({
    currentWindow: true
  }).then(function (tabs) {
    var siteTab = tabs.find(function (tab) {
      return tab.url.startsWith(siteUrl);
    });

    if (siteTab) {
      var tabUrl = new URL(siteTab.url);

      if (reload) {
        browser.tabs.update(siteTab.id, {
          active: true,
          url: "".concat(siteUrl).concat(tabUrl.search ? tabUrl.search + "&" : "?").concat(params).concat(tabUrl.hash)
        });
      } else {
        browser.tabs.update(siteTab.id, {
          active: true
        });
      }
    } else {
      browser.tabs.create({
        url: "".concat(siteUrl, "?").concat(params)
      });
    }
  });
};

var fetchFirstRunDone = function fetchFirstRunDone() {
  return browser.storage.local.get("firstRunDone");
};

var setFirstRunDone = function setFirstRunDone() {
  return browser.storage.local.set({
    firstRunDone: true
  });
};

var _fetchTheme = function _fetchTheme() {
  return browser.storage.local.get("theme");
};

var storeTheme = function storeTheme(_ref9) {
  var theme = _ref9.theme;
  return browser.storage.local.set({
    theme: theme
  });
};

var fetchImages = function fetchImages() {
  return browser.storage.local.get("images");
};

var storeImages = function storeImages(_ref10) {
  var images = _ref10.images;
  return browser.storage.local.set({
    images: images
  });
}; // Blank 1x1 PNG from http://png-pixel.com/


var BLANK_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

var background_applyTheme = function applyTheme(_ref11) {
  var theme = _ref11.theme;
  log("applyTheme", theme);

  if (!theme) {
    return;
  }

  var newTheme = themes_convertToBrowserTheme(theme, assets_bgImages, background_customBackgrounds); // the headerURL is required in < 60,
  // but it creates an ugly text shadow.
  // So only add it for older FFs only.

  var fxVersion = navigator.userAgent.toLowerCase().split("firefox/")[1];

  if (fxVersion < 60) {
    newTheme.images.headerURL = BLANK_IMAGE;
  }

  browser.theme.update(newTheme);
};

init();

/***/ })
/******/ ]);
//# sourceMappingURL=background.js.map