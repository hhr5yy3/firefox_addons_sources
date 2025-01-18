import "./index-3da6bb4f.js";
import { c as createAPI, b as browser, l as logger, a as logger$1, g as getExtensionPage } from "./urlAccess-93f11c64.js";
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
const defaultConfig = {
  notifyByEmail: true,
  trackingEmail: "",
  notifyByDm: true
};
const configAPIHandler = createAPI({
  name: "user-config",
  endpoint: "user/config",
  default() {
    return defaultConfig;
  },
  async read() {
    const config = await this.fetch("").then((v2) => v2.json()).then((v2) => v2.data || defaultConfig);
    return config;
  },
  methods: {
    async update(config) {
      return this.fetch("", { method: "POST", body: JSON.stringify(config) });
    }
  }
});
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  configAPIHandler
}, Symbol.toStringTag, { value: "Module" }));
const defaultSettings = {
  initWithCompactMenu: true,
  theme: "light",
  UIScale: "default",
  SERPConf: "activate",
  graphTimeRange: "6 months"
};
const settings_key = "assistant_settings";
const settingsAPIHandler = createAPI({
  name: "user-settings",
  default() {
    return defaultSettings;
  },
  async read() {
    const settings = await browser.storage.sync.get([settings_key]).then((ob) => {
      return { ...defaultSettings, ...ob[settings_key] || {} };
    });
    return settings;
  },
  methods: {
    async update(settings) {
      return browser.storage.sync.set({ [settings_key]: settings });
    }
  }
});
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  settingsAPIHandler
}, Symbol.toStringTag, { value: "Module" }));
const methods$2 = {
  metricPepperToChollo(pepperMetrics) {
    this.metric({
      body: {
        name: pepperMetrics.name,
        data: pepperMetrics.data
      },
      method: "POST"
    });
  }
};
const metricPepper = createAPI({
  name: "metrics:pepper",
  methods: methods$2,
  endpoint: "metric/",
  read: () => {
  }
});
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  metricPepper
}, Symbol.toStringTag, { value: "Module" }));
//! moment.js
//! version : 2.29.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
  hookCallback = callback;
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp(a2, b2) {
  return Object.prototype.hasOwnProperty.call(a2, b2);
}
function isObjectEmpty(obj2) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj2).length === 0;
  } else {
    var k2;
    for (k2 in obj2) {
      if (hasOwnProp(obj2, k2)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined(input) {
  return input === void 0;
}
function isNumber(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map(arr, fn2) {
  var res = [], i2;
  for (i2 = 0; i2 < arr.length; ++i2) {
    res.push(fn2(arr[i2], i2));
  }
  return res;
}
function extend(a2, b2) {
  for (var i2 in b2) {
    if (hasOwnProp(b2, i2)) {
      a2[i2] = b2[i2];
    }
  }
  if (hasOwnProp(b2, "toString")) {
    a2.toString = b2.toString;
  }
  if (hasOwnProp(b2, "valueOf")) {
    a2.valueOf = b2.valueOf;
  }
  return a2;
}
function createUTC(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(m2) {
  if (m2._pf == null) {
    m2._pf = defaultParsingFlags();
  }
  return m2._pf;
}
var some;
if (Array.prototype.some) {
  some = Array.prototype.some;
} else {
  some = function(fun) {
    var t2 = Object(this), len = t2.length >>> 0, i2;
    for (i2 = 0; i2 < len; i2++) {
      if (i2 in t2 && fun.call(this, t2[i2], i2, t2)) {
        return true;
      }
    }
    return false;
  };
}
function isValid(m2) {
  if (m2._isValid == null) {
    var flags2 = getParsingFlags(m2), parsedParts = some.call(flags2.parsedDateParts, function(i2) {
      return i2 != null;
    }), isNowValid = !isNaN(m2._d.getTime()) && flags2.overflow < 0 && !flags2.empty && !flags2.invalidEra && !flags2.invalidMonth && !flags2.invalidWeekday && !flags2.weekdayMismatch && !flags2.nullInput && !flags2.invalidFormat && !flags2.userInvalidated && (!flags2.meridiem || flags2.meridiem && parsedParts);
    if (m2._strict) {
      isNowValid = isNowValid && flags2.charsLeftOver === 0 && flags2.unusedTokens.length === 0 && flags2.bigHour === void 0;
    }
    if (Object.isFrozen == null || !Object.isFrozen(m2)) {
      m2._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return m2._isValid;
}
function createInvalid(flags2) {
  var m2 = createUTC(NaN);
  if (flags2 != null) {
    extend(getParsingFlags(m2), flags2);
  } else {
    getParsingFlags(m2).userInvalidated = true;
  }
  return m2;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = false;
function copyConfig(to2, from2) {
  var i2, prop, val;
  if (!isUndefined(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined(from2._pf)) {
    to2._pf = getParsingFlags(from2);
  }
  if (!isUndefined(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentProperties.length > 0) {
    for (i2 = 0; i2 < momentProperties.length; i2++) {
      prop = momentProperties[i2];
      val = from2[prop];
      if (!isUndefined(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment(config) {
  copyConfig(this, config);
  this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = new Date(NaN);
  }
  if (updateInProgress === false) {
    updateInProgress = true;
    hooks.updateOffset(this);
    updateInProgress = false;
  }
}
function isMoment(obj2) {
  return obj2 instanceof Moment || obj2 != null && obj2._isAMomentObject != null;
}
function warn(msg) {
  if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate(msg, fn2) {
  var firstTime = true;
  return extend(function() {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i2, key;
      for (i2 = 0; i2 < arguments.length; i2++) {
        arg = "";
        if (typeof arguments[i2] === "object") {
          arg += "\n[" + i2 + "] ";
          for (key in arguments[0]) {
            if (hasOwnProp(arguments[0], key)) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i2];
        }
        args.push(arg);
      }
      warn(
        msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
      );
      firstTime = false;
    }
    return fn2.apply(this, arguments);
  }, fn2);
}
var deprecations = {};
function deprecateSimple(name, msg) {
  if (hooks.deprecationHandler != null) {
    hooks.deprecationHandler(name, msg);
  }
  if (!deprecations[name]) {
    warn(msg);
    deprecations[name] = true;
  }
}
hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;
function isFunction(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set(config) {
  var prop, i2;
  for (i2 in config) {
    if (hasOwnProp(config, i2)) {
      prop = config[i2];
      if (isFunction(prop)) {
        this[i2] = prop;
      } else {
        this["_" + i2] = prop;
      }
    }
  }
  this._config = config;
  this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function mergeConfigs(parentConfig, childConfig) {
  var res = extend({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp(childConfig, prop)) {
      if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
        res[prop] = {};
        extend(res[prop], parentConfig[prop]);
        extend(res[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res[prop] = childConfig[prop];
      } else {
        delete res[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
      res[prop] = extend({}, res[prop]);
    }
  }
  return res;
}
function Locale(config) {
  if (config != null) {
    this.set(config);
  }
}
var keys;
if (Object.keys) {
  keys = Object.keys;
} else {
  keys = function(obj2) {
    var i2, res = [];
    for (i2 in obj2) {
      if (hasOwnProp(obj2, i2)) {
        res.push(i2);
      }
    }
    return res;
  };
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(key, mom, now2) {
  var output = this._calendar[key] || this._calendar["sameElse"];
  return isFunction(output) ? output.call(mom, now2) : output;
}
function zeroFill(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(token2, padded, ordinal2, callback) {
  var func3 = callback;
  if (typeof callback === "string") {
    func3 = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions[token2] = func3;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(func3.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions[ordinal2] = function() {
      return this.localeData().ordinal(
        func3.apply(this, arguments),
        token2
      );
    };
  }
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction(format2) {
  var array3 = format2.match(formattingTokens), i2, length;
  for (i2 = 0, length = array3.length; i2 < length; i2++) {
    if (formatTokenFunctions[array3[i2]]) {
      array3[i2] = formatTokenFunctions[array3[i2]];
    } else {
      array3[i2] = removeFormattingTokens(array3[i2]);
    }
  }
  return function(mom) {
    var output = "", i3;
    for (i3 = 0; i3 < length; i3++) {
      output += isFunction(array3[i3]) ? array3[i3].call(mom, format2) : array3[i3];
    }
    return output;
  };
}
function formatMoment(m2, format2) {
  if (!m2.isValid()) {
    return m2.localeData().invalidDate();
  }
  format2 = expandFormat(format2, m2.localeData());
  formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
  return formatFunctions[format2](m2);
}
function expandFormat(format2, locale2) {
  var i2 = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens.lastIndex = 0;
  while (i2 >= 0 && localFormattingTokens.test(format2)) {
    format2 = format2.replace(
      localFormattingTokens,
      replaceLongDateFormatTokens
    );
    localFormattingTokens.lastIndex = 0;
    i2 -= 1;
  }
  return format2;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(key) {
  var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key];
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(number) {
  return this._ordinal.replace("%d", number);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(number, withoutSuffix, string4, isFuture) {
  var output = this._relativeTime[string4];
  return isFunction(output) ? output(number, withoutSuffix, string4, isFuture) : output.replace(/%d/i, number);
}
function pastFuture(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases = {};
function addUnitAlias(unit, shorthand) {
  var lowerCase = unit.toLowerCase();
  aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
}
function normalizeUnits(units) {
  return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities = {};
function addUnitPriority(unit, priority) {
  priorities[unit] = priority;
}
function getPrioritizedUnits(unitsObj) {
  var units = [], u2;
  for (u2 in unitsObj) {
    if (hasOwnProp(unitsObj, u2)) {
      units.push({ unit: u2, priority: priorities[u2] });
    }
  }
  units.sort(function(a2, b2) {
    return a2.priority - b2.priority;
  });
  return units;
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function absFloor(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
function toInt(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
function makeGetSet(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1(this, unit, value);
      hooks.updateOffset(this, keepTime);
      return this;
    } else {
      return get$1(this, unit);
    }
  };
}
function get$1(mom, unit) {
  return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
}
function set$1(mom, unit, value) {
  if (mom.isValid() && !isNaN(value)) {
    if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
      value = toInt(value);
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
        value,
        mom.month(),
        daysInMonth(value, mom.month())
      );
    } else {
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
  }
}
function stringGet(units) {
  units = normalizeUnits(units);
  if (isFunction(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits(units);
    var prioritized = getPrioritizedUnits(units), i2;
    for (i2 = 0; i2 < prioritized.length; i2++) {
      this[prioritized[i2].unit](units[prioritized[i2].unit]);
    }
  } else {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
regexes = {};
function addRegexToken(token2, regex2, strictRegex) {
  regexes[token2] = isFunction(regex2) ? regex2 : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex2;
  };
}
function getParseRegexForToken(token2, config) {
  if (!hasOwnProp(regexes, token2)) {
    return new RegExp(unescapeFormat(token2));
  }
  return regexes[token2](config._strict, config._locale);
}
function unescapeFormat(s2) {
  return regexEscape(
    s2.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    })
  );
}
function regexEscape(s2) {
  return s2.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens = {};
function addParseToken(token2, callback) {
  var i2, func3 = callback;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber(callback)) {
    func3 = function(input, array3) {
      array3[callback] = toInt(input);
    };
  }
  for (i2 = 0; i2 < token2.length; i2++) {
    tokens[token2[i2]] = func3;
  }
}
function addWeekParseToken(token2, callback) {
  addParseToken(token2, function(input, array3, config, token3) {
    config._w = config._w || {};
    callback(input, config._w, config, token3);
  });
}
function addTimeToArrayFromToken(token2, input, config) {
  if (input != null && hasOwnProp(tokens, token2)) {
    tokens[token2](input, config._a, config, token2);
  }
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function mod(n2, x2) {
  return (n2 % x2 + x2) % x2;
}
var indexOf;
if (Array.prototype.indexOf) {
  indexOf = Array.prototype.indexOf;
} else {
  indexOf = function(o2) {
    var i2;
    for (i2 = 0; i2 < this.length; ++i2) {
      if (this[i2] === o2) {
        return i2;
      }
    }
    return -1;
  };
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addUnitAlias("month", "M");
addUnitPriority("month", 8);
addRegexToken("M", match1to2);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken(["M", "MM"], function(input, array3) {
  array3[MONTH] = toInt(input) - 1;
});
addParseToken(["MMM", "MMMM"], function(input, array3, config, token2) {
  var month = config._locale.monthsParse(input, token2, config._strict);
  if (month != null) {
    array3[MONTH] = month;
  } else {
    getParsingFlags(config).invalidMonth = input;
  }
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
  "_"
), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(m2, format2) {
  if (!m2) {
    return isArray(this._months) ? this._months : this._months["standalone"];
  }
  return isArray(this._months) ? this._months[m2.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m2.month()];
}
function localeMonthsShort(m2, format2) {
  if (!m2) {
    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray(this._monthsShort) ? this._monthsShort[m2.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m2.month()];
}
function handleStrictParse(monthName, format2, strict) {
  var i2, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i2 = 0; i2 < 12; ++i2) {
      mom = createUTC([2e3, i2]);
      this._shortMonthsParse[i2] = this.monthsShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._longMonthsParse[i2] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse(monthName, format2, strict) {
  var i2, mom, regex2;
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i2 = 0; i2 < 12; i2++) {
    mom = createUTC([2e3, i2]);
    if (strict && !this._longMonthsParse[i2]) {
      this._longMonthsParse[i2] = new RegExp(
        "^" + this.months(mom, "").replace(".", "") + "$",
        "i"
      );
      this._shortMonthsParse[i2] = new RegExp(
        "^" + this.monthsShort(mom, "").replace(".", "") + "$",
        "i"
      );
    }
    if (!strict && !this._monthsParse[i2]) {
      regex2 = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i2] = new RegExp(regex2.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i2].test(monthName)) {
      return i2;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i2].test(monthName)) {
      return i2;
    } else if (!strict && this._monthsParse[i2].test(monthName)) {
      return i2;
    }
  }
}
function setMonth(mom, value) {
  var dayOfMonth;
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber(value)) {
        return mom;
      }
    }
  }
  dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
  mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
  return mom;
}
function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return get$1(this, "Month");
  }
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse() {
  function cmpLenRev(a2, b2) {
    return b2.length - a2.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i2, mom;
  for (i2 = 0; i2 < 12; i2++) {
    mom = createUTC([2e3, i2]);
    shortPieces.push(this.monthsShort(mom, ""));
    longPieces.push(this.months(mom, ""));
    mixedPieces.push(this.months(mom, ""));
    mixedPieces.push(this.monthsShort(mom, ""));
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (i2 = 0; i2 < 12; i2++) {
    shortPieces[i2] = regexEscape(shortPieces[i2]);
    longPieces[i2] = regexEscape(longPieces[i2]);
  }
  for (i2 = 0; i2 < 24; i2++) {
    mixedPieces[i2] = regexEscape(mixedPieces[i2]);
  }
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._monthsShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
}
addFormatToken("Y", 0, 0, function() {
  var y2 = this.year();
  return y2 <= 9999 ? zeroFill(y2, 4) : "+" + y2;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
addUnitAlias("year", "y");
addUnitPriority("year", 1);
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(input, array3) {
  array3[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken("YY", function(input, array3) {
  array3[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken("Y", function(input, array3) {
  array3[YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", true);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function createDate(y2, m2, d2, h2, M2, s2, ms) {
  var date;
  if (y2 < 100 && y2 >= 0) {
    date = new Date(y2 + 400, m2, d2, h2, M2, s2, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y2);
    }
  } else {
    date = new Date(y2, m2, d2, h2, M2, s2, ms);
  }
  return date;
}
function createUTCDate(y2) {
  var date, args;
  if (y2 < 100 && y2 >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y2 + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y2);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(mom, dow, doy) {
  var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear(resYear, dow, doy);
  } else if (week > weeksInYear(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");
addUnitPriority("week", 5);
addUnitPriority("isoWeek", 5);
addRegexToken("w", match1to2);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token2) {
  week[token2.substr(0, 1)] = toInt(input);
});
function localeWeek(mom) {
  return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek(input) {
  var week = weekOfYear(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");
addUnitPriority("day", 11);
addUnitPriority("weekday", 11);
addUnitPriority("isoWeekday", 11);
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
  var weekday = config._locale.weekdaysParse(input, token2, config._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags(config).invalidWeekday = input;
  }
});
addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
  week[token2] = toInt(input);
});
function parseWeekday(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays(ws, n2) {
  return ws.slice(n2, 7).concat(ws.slice(0, n2));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
  "_"
), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(m2, format2) {
  var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m2 && m2 !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m2 === true ? shiftWeekdays(weekdays, this._week.dow) : m2 ? weekdays[m2.day()] : weekdays;
}
function localeWeekdaysShort(m2) {
  return m2 === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m2 ? this._weekdaysShort[m2.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(m2) {
  return m2 === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m2 ? this._weekdaysMin[m2.day()] : this._weekdaysMin;
}
function handleStrictParse$1(weekdayName, format2, strict) {
  var i2, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i2 = 0; i2 < 7; ++i2) {
      mom = createUTC([2e3, 1]).day(i2);
      this._minWeekdaysParse[i2] = this.weekdaysMin(
        mom,
        ""
      ).toLocaleLowerCase();
      this._shortWeekdaysParse[i2] = this.weekdaysShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._weekdaysParse[i2] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse(weekdayName, format2, strict) {
  var i2, mom, regex2;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i2 = 0; i2 < 7; i2++) {
    mom = createUTC([2e3, 1]).day(i2);
    if (strict && !this._fullWeekdaysParse[i2]) {
      this._fullWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._shortWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._minWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
    }
    if (!this._weekdaysParse[i2]) {
      regex2 = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i2] = new RegExp(regex2.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (!strict && this._weekdaysParse[i2].test(weekdayName)) {
      return i2;
    }
  }
}
function getSetDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  if (input != null) {
    input = parseWeekday(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse() {
  function cmpLenRev(a2, b2) {
    return b2.length - a2.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i2, mom, minp, shortp, longp;
  for (i2 = 0; i2 < 7; i2++) {
    mom = createUTC([2e3, 1]).day(i2);
    minp = regexEscape(this.weekdaysMin(mom, ""));
    shortp = regexEscape(this.weekdaysShort(mom, ""));
    longp = regexEscape(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._weekdaysShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
  this._weekdaysMinStrictRegex = new RegExp(
    "^(" + minPieces.join("|") + ")",
    "i"
  );
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(token2, lowercase) {
  addFormatToken(token2, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      lowercase
    );
  });
}
meridiem("a", true);
meridiem("A", false);
addUnitAlias("hour", "h");
addUnitPriority("hour", 13);
function matchMeridiem(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2);
addRegexToken("h", match1to2);
addRegexToken("k", match1to2);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(input, array3, config) {
  var kInput = toInt(input);
  array3[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(["a", "A"], function(input, array3, config) {
  config._isPm = config._locale.isPM(input);
  config._meridiem = input;
});
addParseToken(["h", "hh"], function(input, array3, config) {
  array3[HOUR] = toInt(input);
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmm", function(input, array3, config) {
  var pos = input.length - 2;
  array3[HOUR] = toInt(input.substr(0, pos));
  array3[MINUTE] = toInt(input.substr(pos));
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmmss", function(input, array3, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array3[HOUR] = toInt(input.substr(0, pos1));
  array3[MINUTE] = toInt(input.substr(pos1, 2));
  array3[SECOND] = toInt(input.substr(pos2));
  getParsingFlags(config).bigHour = true;
});
addParseToken("Hmm", function(input, array3, config) {
  var pos = input.length - 2;
  array3[HOUR] = toInt(input.substr(0, pos));
  array3[MINUTE] = toInt(input.substr(pos));
});
addParseToken("Hmmss", function(input, array3, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array3[HOUR] = toInt(input.substr(0, pos1));
  array3[MINUTE] = toInt(input.substr(pos1, 2));
  array3[SECOND] = toInt(input.substr(pos2));
});
function localeIsPM(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
function localeMeridiem(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
var locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(arr1, arr2) {
  var i2, minl = Math.min(arr1.length, arr2.length);
  for (i2 = 0; i2 < minl; i2 += 1) {
    if (arr1[i2] !== arr2[i2]) {
      return i2;
    }
  }
  return minl;
}
function normalizeLocale(key) {
  return key ? key.toLowerCase().replace("_", "-") : key;
}
function chooseLocale(names) {
  var i2 = 0, j2, next, locale2, split2;
  while (i2 < names.length) {
    split2 = normalizeLocale(names[i2]).split("-");
    j2 = split2.length;
    next = normalizeLocale(names[i2 + 1]);
    next = next ? next.split("-") : null;
    while (j2 > 0) {
      locale2 = loadLocale(split2.slice(0, j2).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j2 && commonPrefix(split2, next) >= j2 - 1) {
        break;
      }
      j2--;
    }
    i2++;
  }
  return globalLocale;
}
function loadLocale(name) {
  var oldLocale = null, aliasedRequire;
  if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports) {
    try {
      oldLocale = globalLocale._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name);
      getSetGlobalLocale(oldLocale);
    } catch (e) {
      locales[name] = null;
    }
  }
  return locales[name];
}
function getSetGlobalLocale(key, values) {
  var data;
  if (key) {
    if (isUndefined(values)) {
      data = getLocale(key);
    } else {
      data = defineLocale(key, values);
    }
    if (data) {
      globalLocale = data;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "Locale " + key + " not found. Did you forget to load it?"
        );
      }
    }
  }
  return globalLocale._abbr;
}
function defineLocale(name, config) {
  if (config !== null) {
    var locale2, parentConfig = baseConfig;
    config.abbr = name;
    if (locales[name] != null) {
      deprecateSimple(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      );
      parentConfig = locales[name]._config;
    } else if (config.parentLocale != null) {
      if (locales[config.parentLocale] != null) {
        parentConfig = locales[config.parentLocale]._config;
      } else {
        locale2 = loadLocale(config.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies[config.parentLocale]) {
            localeFamilies[config.parentLocale] = [];
          }
          localeFamilies[config.parentLocale].push({
            name,
            config
          });
          return null;
        }
      }
    }
    locales[name] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name]) {
      localeFamilies[name].forEach(function(x2) {
        defineLocale(x2.name, x2.config);
      });
    }
    getSetGlobalLocale(name);
    return locales[name];
  } else {
    delete locales[name];
    return null;
  }
}
function updateLocale(name, config) {
  if (config != null) {
    var locale2, tmpLocale, parentConfig = baseConfig;
    if (locales[name] != null && locales[name].parentLocale != null) {
      locales[name].set(mergeConfigs(locales[name]._config, config));
    } else {
      tmpLocale = loadLocale(name);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs(parentConfig, config);
      if (tmpLocale == null) {
        config.abbr = name;
      }
      locale2 = new Locale(config);
      locale2.parentLocale = locales[name];
      locales[name] = locale2;
    }
    getSetGlobalLocale(name);
  } else {
    if (locales[name] != null) {
      if (locales[name].parentLocale != null) {
        locales[name] = locales[name].parentLocale;
        if (name === getSetGlobalLocale()) {
          getSetGlobalLocale(name);
        }
      } else if (locales[name] != null) {
        delete locales[name];
      }
    }
  }
  return locales[name];
}
function getLocale(key) {
  var locale2;
  if (key && key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }
  if (!key) {
    return globalLocale;
  }
  if (!isArray(key)) {
    locale2 = loadLocale(key);
    if (locale2) {
      return locale2;
    }
    key = [key];
  }
  return chooseLocale(key);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(m2) {
  var overflow, a2 = m2._a;
  if (a2 && getParsingFlags(m2).overflow === -2) {
    overflow = a2[MONTH] < 0 || a2[MONTH] > 11 ? MONTH : a2[DATE] < 1 || a2[DATE] > daysInMonth(a2[YEAR], a2[MONTH]) ? DATE : a2[HOUR] < 0 || a2[HOUR] > 24 || a2[HOUR] === 24 && (a2[MINUTE] !== 0 || a2[SECOND] !== 0 || a2[MILLISECOND] !== 0) ? HOUR : a2[MINUTE] < 0 || a2[MINUTE] > 59 ? MINUTE : a2[SECOND] < 0 || a2[SECOND] > 59 ? SECOND : a2[MILLISECOND] < 0 || a2[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(m2)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(m2)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(m2)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(m2).overflow = overflow;
  }
  return m2;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(config) {
  var i2, l2, string4 = config._i, match = extendedIsoRegex.exec(string4) || basicIsoRegex.exec(string4), allowTime, dateFormat, timeFormat, tzFormat;
  if (match) {
    getParsingFlags(config).iso = true;
    for (i2 = 0, l2 = isoDates.length; i2 < l2; i2++) {
      if (isoDates[i2][1].exec(match[1])) {
        dateFormat = isoDates[i2][0];
        allowTime = isoDates[i2][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config._isValid = false;
      return;
    }
    if (match[3]) {
      for (i2 = 0, l2 = isoTimes.length; i2 < l2; i2++) {
        if (isoTimes[i2][1].exec(match[3])) {
          timeFormat = (match[2] || " ") + isoTimes[i2][0];
          break;
        }
      }
      if (timeFormat == null) {
        config._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config._isValid = false;
      return;
    }
    if (match[4]) {
      if (tzRegex.exec(match[4])) {
        tzFormat = "Z";
      } else {
        config._isValid = false;
        return;
      }
    }
    config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat(config);
  } else {
    config._isValid = false;
  }
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = [
    untruncateYear(yearStr),
    defaultLocaleMonthsShort.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
      parsedInput[0],
      parsedInput[1],
      parsedInput[2]
    ).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m2 = hm % 100, h2 = (hm - m2) / 100;
    return h2 * 60 + m2;
  }
}
function configFromRFC2822(config) {
  var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
  if (match) {
    parsedArray = extractFromRFC2822Strings(
      match[4],
      match[3],
      match[2],
      match[5],
      match[6],
      match[7]
    );
    if (!checkWeekday(match[1], parsedArray, config)) {
      return;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset(match[8], match[9], match[10]);
    config._d = createUTCDate.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags(config).rfc2822 = true;
  } else {
    config._isValid = false;
  }
}
function configFromString(config) {
  var matched = aspNetJsonRegex.exec(config._i);
  if (matched !== null) {
    config._d = new Date(+matched[1]);
    return;
  }
  configFromISO(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  configFromRFC2822(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  if (config._strict) {
    config._isValid = false;
  } else {
    hooks.createFromInputFallback(config);
  }
}
hooks.createFromInputFallback = deprecate(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(config) {
    config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
  }
);
function defaults(a2, b2, c2) {
  if (a2 != null) {
    return a2;
  }
  if (b2 != null) {
    return b2;
  }
  return c2;
}
function currentDateArray(config) {
  var nowValue = new Date(hooks.now());
  if (config._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config) {
  var i2, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config._d) {
    return;
  }
  currentDate = currentDateArray(config);
  if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags(config)._overflowDayOfYear = true;
    }
    date = createUTCDate(yearToUse, 0, config._dayOfYear);
    config._a[MONTH] = date.getUTCMonth();
    config._a[DATE] = date.getUTCDate();
  }
  for (i2 = 0; i2 < 3 && config._a[i2] == null; ++i2) {
    config._a[i2] = input[i2] = currentDate[i2];
  }
  for (; i2 < 7; i2++) {
    config._a[i2] = input[i2] = config._a[i2] == null ? i2 === 2 ? 1 : 0 : config._a[i2];
  }
  if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
    config._nextDay = true;
    config._a[HOUR] = 0;
  }
  config._d = (config._useUTC ? createUTCDate : createDate).apply(
    null,
    input
  );
  expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR] = 24;
  }
  if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
    getParsingFlags(config).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo(config) {
  var w2, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w2 = config._w;
  if (w2.GG != null || w2.W != null || w2.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(
      w2.GG,
      config._a[YEAR],
      weekOfYear(createLocal(), 1, 4).year
    );
    week = defaults(w2.W, 1);
    weekday = defaults(w2.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    curWeek = weekOfYear(createLocal(), dow, doy);
    weekYear = defaults(w2.gg, config._a[YEAR], curWeek.year);
    week = defaults(w2.w, curWeek.week);
    if (w2.d != null) {
      weekday = w2.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w2.e != null) {
      weekday = w2.e + dow;
      if (w2.e < 0 || w2.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(config) {
  if (config._f === hooks.ISO_8601) {
    configFromISO(config);
    return;
  }
  if (config._f === hooks.RFC_2822) {
    configFromRFC2822(config);
    return;
  }
  config._a = [];
  getParsingFlags(config).empty = true;
  var string4 = "" + config._i, i2, parsedInput, tokens2, token2, skipped, stringLength = string4.length, totalParsedInputLength = 0, era;
  tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  for (i2 = 0; i2 < tokens2.length; i2++) {
    token2 = tokens2[i2];
    parsedInput = (string4.match(getParseRegexForToken(token2, config)) || [])[0];
    if (parsedInput) {
      skipped = string4.substr(0, string4.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      string4 = string4.slice(
        string4.indexOf(parsedInput) + parsedInput.length
      );
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token2]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken(token2, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token2);
    }
  }
  getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  if (string4.length > 0) {
    getParsingFlags(config).unusedInput.push(string4);
  }
  if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }
  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  config._a[HOUR] = meridiemFixWrap(
    config._locale,
    config._a[HOUR],
    config._meridiem
  );
  era = getParsingFlags(config).era;
  if (era !== null) {
    config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
  }
  configFromArray(config);
  checkOverflow(config);
}
function meridiemFixWrap(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray(config) {
  var tempConfig, bestMoment, scoreToBeat, i2, currentScore, validFormatFound, bestFormatIsValid = false;
  if (config._f.length === 0) {
    getParsingFlags(config).invalidFormat = true;
    config._d = new Date(NaN);
    return;
  }
  for (i2 = 0; i2 < config._f.length; i2++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i2];
    configFromStringAndFormat(tempConfig);
    if (isValid(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend(config, bestMoment || tempConfig);
}
function configFromObject(config) {
  if (config._d) {
    return;
  }
  var i2 = normalizeObjectUnits(config._i), dayOrDate = i2.day === void 0 ? i2.date : i2.day;
  config._a = map(
    [i2.year, i2.month, dayOrDate, i2.hour, i2.minute, i2.second, i2.millisecond],
    function(obj2) {
      return obj2 && parseInt(obj2, 10);
    }
  );
  configFromArray(config);
}
function createFromConfig(config) {
  var res = new Moment(checkOverflow(prepareConfig(config)));
  if (res._nextDay) {
    res.add(1, "d");
    res._nextDay = void 0;
  }
  return res;
}
function prepareConfig(config) {
  var input = config._i, format2 = config._f;
  config._locale = config._locale || getLocale(config._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid({ nullInput: true });
  }
  if (typeof input === "string") {
    config._i = input = config._locale.preparse(input);
  }
  if (isMoment(input)) {
    return new Moment(checkOverflow(input));
  } else if (isDate(input)) {
    config._d = input;
  } else if (isArray(format2)) {
    configFromStringAndArray(config);
  } else if (format2) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }
  if (!isValid(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput(config) {
  var input = config._i;
  if (isUndefined(input)) {
    config._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString(config);
  } else if (isArray(input)) {
    config._a = map(input.slice(0), function(obj2) {
      return parseInt(obj2, 10);
    });
    configFromArray(config);
  } else if (isObject(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    config._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config);
  }
}
function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
  var c2 = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
    input = void 0;
  }
  c2._isAMomentObject = true;
  c2._useUTC = c2._isUTC = isUTC;
  c2._l = locale2;
  c2._i = input;
  c2._f = format2;
  c2._strict = strict;
  return createFromConfig(c2);
}
function createLocal(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, false);
}
var prototypeMin = deprecate(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  }
), prototypeMax = deprecate(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other = createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }
);
function pickBy(fn2, moments) {
  var res, i2;
  if (moments.length === 1 && isArray(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal();
  }
  res = moments[0];
  for (i2 = 1; i2 < moments.length; ++i2) {
    if (!moments[i2].isValid() || moments[i2][fn2](res)) {
      res = moments[i2];
    }
  }
  return res;
}
function min() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isBefore", args);
}
function max() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isAfter", args);
}
var now = function() {
  return Date.now ? Date.now() : +new Date();
};
var ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(m2) {
  var key, unitHasDecimal = false, i2;
  for (key in m2) {
    if (hasOwnProp(m2, key) && !(indexOf.call(ordering, key) !== -1 && (m2[key] == null || !isNaN(m2[key])))) {
      return false;
    }
  }
  for (i2 = 0; i2 < ordering.length; ++i2) {
    if (m2[ordering[i2]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m2[ordering[i2]]) !== toInt(m2[ordering[i2]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(duration) {
  var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
  minutes2 * 6e4 + // 1000 * 60
  hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale();
  this._bubble();
}
function isDuration(obj2) {
  return obj2 instanceof Duration;
}
function absRound(number) {
  if (number < 0) {
    return Math.round(-1 * number) * -1;
  } else {
    return Math.round(number);
  }
}
function compareArrays(array1, array22, dontConvert) {
  var len = Math.min(array1.length, array22.length), lengthDiff = Math.abs(array1.length - array22.length), diffs = 0, i2;
  for (i2 = 0; i2 < len; i2++) {
    if (dontConvert && array1[i2] !== array22[i2] || !dontConvert && toInt(array1[i2]) !== toInt(array22[i2])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset(token2, separator) {
  addFormatToken(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(input, array3, config) {
  config._useUTC = true;
  config._tzm = offsetFromString(matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher2, string4) {
  var matches = (string4 || "").match(matcher2), chunk, parts, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  minutes2 = +(parts[1] * 60) + toInt(parts[2]);
  return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset(input, model) {
  var res, diff2;
  if (model._isUTC) {
    res = model.clone();
    diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
    res._d.setTime(res._d.valueOf() + diff2);
    hooks.updateOffset(res, false);
    return res;
  } else {
    return createLocal(input).local();
  }
}
function getDateOffset(m2) {
  return -Math.round(m2._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString(matchShortOffset, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract(
          this,
          createDuration(input - offset2, "m"),
          1,
          false
        );
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset(this);
  }
}
function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c2 = {}, other;
  copyConfig(c2, this);
  c2 = prepareConfig(c2);
  if (c2._a) {
    other = c2._isUTC ? createUTC(c2._a) : createLocal(c2._a);
    this._isDSTShifted = this.isValid() && compareArrays(c2._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key) {
  var duration = input, match = null, sign2, ret, diffRes;
  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key) {
      duration[key] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match = aspNetRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt(match[DATE]) * sign2,
      h: toInt(match[HOUR]) * sign2,
      m: toInt(match[MINUTE]) * sign2,
      s: toInt(match[SECOND]) * sign2,
      ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
      // the millisecond decimal point is included in the match
    };
  } else if (match = isoRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso(match[2], sign2),
      M: parseIso(match[3], sign2),
      w: parseIso(match[4], sign2),
      d: parseIso(match[5], sign2),
      h: parseIso(match[6], sign2),
      m: parseIso(match[7], sign2),
      s: parseIso(match[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference(
      createLocal(duration.from),
      createLocal(duration.to)
    );
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration(duration);
  if (isDuration(input) && hasOwnProp(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration(input) && hasOwnProp(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(inp, sign2) {
  var res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign2;
}
function positiveMomentsDifference(base, other) {
  var res = {};
  res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  if (base.clone().add(res.months, "M").isAfter(other)) {
    --res.months;
  }
  res.milliseconds = +other - +base.clone().add(res.months, "M");
  return res;
}
function momentsDifference(base, other) {
  var res;
  if (!(base.isValid() && other.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other = cloneWithOffset(other, base);
  if (base.isBefore(other)) {
    res = positiveMomentsDifference(base, other);
  } else {
    res = positiveMomentsDifference(other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function createAdder(direction, name) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple(
        name,
        "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
      );
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration(val, period);
    addSubtract(this, dur, direction);
    return this;
  };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth(mom, get$1(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1(mom, "Date", get$1(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks.updateOffset(mom, days2 || months2);
  }
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput(input) {
  return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
}
function isMomentInputObject(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i2, property;
  for (i2 = 0; i2 < properties.length; i2 += 1) {
    property = properties[i2];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray(input) {
  var arrayTest = isArray(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber(item) && isString(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i2, property;
  for (i2 = 0; i2 < properties.length; i2 += 1) {
    property = properties[i2];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(time, formats) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats = void 0;
    } else if (isMomentInput(arguments[0])) {
      time = arguments[0];
      formats = void 0;
    } else if (isCalendarSpec(arguments[0])) {
      formats = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
  return this.format(
    output || this.localeData().calendar(format2, this, createLocal(now2))
  );
}
function clone() {
  return new Moment(this);
}
function isAfter(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween(from2, to2, units, inclusivity) {
  var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits(units);
  switch (units) {
    case "year":
      output = monthDiff(this, that) / 12;
      break;
    case "month":
      output = monthDiff(this, that);
      break;
    case "quarter":
      output = monthDiff(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    case "minute":
      output = (this - that) / 6e4;
      break;
    case "hour":
      output = (this - that) / 36e5;
      break;
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor(output);
}
function monthDiff(a2, b2) {
  if (a2.date() < b2.date()) {
    return -monthDiff(b2, a2);
  }
  var wholeMonthDiff = (b2.year() - a2.year()) * 12 + (b2.month() - a2.month()), anchor = a2.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b2 - anchor < 0) {
    anchor2 = a2.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b2 - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a2.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b2 - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString$1() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc = keepOffset !== true, m2 = utc ? this.clone().utc() : this;
  if (m2.year() < 0 || m2.year() > 9999) {
    return formatMoment(
      m2,
      utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  if (isFunction(Date.prototype.toISOString)) {
    if (utc) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m2, "Z"));
    }
  }
  return formatMoment(
    m2,
    utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function inspect() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func3 = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func3 = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func3 + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format$1(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  }
  var output = formatMoment(this, inputString);
  return this.localeData().postformat(output);
}
function from(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow(withoutSuffix) {
  return this.from(createLocal(), withoutSuffix);
}
function to(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow(withoutSuffix) {
  return this.to(createLocal(), withoutSuffix);
}
function locale(key) {
  var newLocaleData;
  if (key === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale(key);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang = deprecate(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(key) {
    if (key === void 0) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  }
);
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate(y2, m2, d2) {
  if (y2 < 100 && y2 >= 0) {
    return new Date(y2 + 400, m2, d2) - MS_PER_400_YEARS;
  } else {
    return new Date(y2, m2, d2).valueOf();
  }
}
function utcStartOfDate(y2, m2, d2) {
  if (y2 < 100 && y2 >= 0) {
    return Date.UTC(y2 + 400, m2, d2) - MS_PER_400_YEARS;
  } else {
    return Date.UTC(y2, m2, d2);
  }
}
function startOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      );
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_MINUTE);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_SECOND);
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function endOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR - mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      ) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var m2 = this;
  return [
    m2.year(),
    m2.month(),
    m2.date(),
    m2.hour(),
    m2.minute(),
    m2.second(),
    m2.millisecond()
  ];
}
function toObject() {
  var m2 = this;
  return {
    years: m2.year(),
    months: m2.month(),
    date: m2.date(),
    hours: m2.hours(),
    minutes: m2.minutes(),
    seconds: m2.seconds(),
    milliseconds: m2.milliseconds()
  };
}
function toJSON() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function(input, array3, config, token2) {
  var era = config._locale.erasParse(input, token2, config._strict);
  if (era) {
    getParsingFlags(config).era = era;
  } else {
    getParsingFlags(config).invalidEra = input;
  }
});
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(input, array3, config, token2) {
  var match;
  if (config._locale._eraYearOrdinalRegex) {
    match = input.match(config._locale._eraYearOrdinalRegex);
  }
  if (config._locale.eraYearOrdinalParse) {
    array3[YEAR] = config._locale.eraYearOrdinalParse(input, match);
  } else {
    array3[YEAR] = parseInt(input, 10);
  }
});
function localeEras(m2, format2) {
  var i2, l2, date, eras = this._eras || getLocale("en")._eras;
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    switch (typeof eras[i2].since) {
      case "string":
        date = hooks(eras[i2].since).startOf("day");
        eras[i2].since = date.valueOf();
        break;
    }
    switch (typeof eras[i2].until) {
      case "undefined":
        eras[i2].until = Infinity;
        break;
      case "string":
        date = hooks(eras[i2].until).startOf("day").valueOf();
        eras[i2].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse(eraName, format2, strict) {
  var i2, l2, eras = this.eras(), name, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    name = eras[i2].name.toUpperCase();
    abbr = eras[i2].abbr.toUpperCase();
    narrow = eras[i2].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i2];
          }
          break;
        case "NNNN":
          if (name === eraName) {
            return eras[i2];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i2];
          }
          break;
      }
    } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i2];
    }
  }
}
function localeErasConvertYear(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks(era.since).year();
  } else {
    return hooks(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName() {
  var i2, l2, val, eras = this.localeData().eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].name;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].name;
    }
  }
  return "";
}
function getEraNarrow() {
  var i2, l2, val, eras = this.localeData().eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].narrow;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].narrow;
    }
  }
  return "";
}
function getEraAbbr() {
  var i2, l2, val, eras = this.localeData().eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].abbr;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].abbr;
    }
  }
  return "";
}
function getEraYear() {
  var i2, l2, dir, val, eras = this.localeData().eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    dir = eras[i2].since <= eras[i2].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until || eras[i2].until <= val && val <= eras[i2].since) {
      return (this.year() - hooks(eras[i2].since).year()) * dir + eras[i2].offset;
    }
  }
  return this.year();
}
function erasNameRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNameRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(isStrict) {
  if (!hasOwnProp(this, "_erasAbbrRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNarrowRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i2, l2, eras = this.eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    namePieces.push(regexEscape(eras[i2].name));
    abbrPieces.push(regexEscape(eras[i2].abbr));
    narrowPieces.push(regexEscape(eras[i2].narrow));
    mixedPieces.push(regexEscape(eras[i2].name));
    mixedPieces.push(regexEscape(eras[i2].abbr));
    mixedPieces.push(regexEscape(eras[i2].narrow));
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp(
    "^(" + narrowPieces.join("|") + ")",
    "i"
  );
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token2, getter) {
  addFormatToken(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addUnitAlias("weekYear", "gg");
addUnitAlias("isoWeekYear", "GG");
addUnitPriority("weekYear", 1);
addUnitPriority("isoWeekYear", 1);
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token2) {
  week[token2.substr(0, 2)] = toInt(input);
});
addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
  week[token2] = hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function getSetISOWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addUnitAlias("quarter", "Q");
addUnitPriority("quarter", 7);
addRegexToken("Q", match1);
addParseToken("Q", function(input, array3) {
  array3[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addUnitAlias("date", "D");
addUnitPriority("date", 9);
addRegexToken("D", match1to2);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(input, array3) {
  array3[DATE] = toInt(input.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", true);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addUnitAlias("dayOfYear", "DDD");
addUnitPriority("dayOfYear", 4);
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(input, array3, config) {
  config._dayOfYear = toInt(input);
});
function getSetDayOfYear(input) {
  var dayOfYear = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addUnitAlias("minute", "m");
addUnitPriority("minute", 14);
addRegexToken("m", match1to2);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", false);
addFormatToken("s", ["ss", 2], 0, "second");
addUnitAlias("second", "s");
addUnitPriority("second", 15);
addRegexToken("s", match1to2);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", false);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addUnitAlias("millisecond", "ms");
addUnitPriority("millisecond", 16);
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}
function parseMs(input, array3) {
  array3[MILLISECOND] = toInt(("0." + input) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
getSetMillisecond = makeGetSet("Milliseconds", false);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format$1;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto.toJSON = toJSON;
proto.toString = toString$1;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate(
  "dates accessor is deprecated. Use date instead.",
  getSetDayOfMonth
);
proto.months = deprecate(
  "months accessor is deprecated. Use month instead",
  getSetMonth
);
proto.years = deprecate(
  "years accessor is deprecated. Use year instead",
  getSetYear
);
proto.zone = deprecate(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  getSetZone
);
proto.isDSTShifted = deprecate(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  isDaylightSavingTimeShifted
);
function createUnix(input) {
  return createLocal(input * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(string4) {
  return string4;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1$1(format2, index, field, setter) {
  var locale2 = getLocale(), utc = createUTC().set(setter, index);
  return locale2[field](utc, format2);
}
function listMonthsImpl(format2, index, field) {
  if (isNumber(format2)) {
    index = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index != null) {
    return get$1$1(format2, index, field, "month");
  }
  var i2, out = [];
  for (i2 = 0; i2 < 12; i2++) {
    out[i2] = get$1$1(format2, i2, field, "month");
  }
  return out;
}
function listWeekdaysImpl(localeSorted, format2, index, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index = format2;
    localeSorted = false;
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i2, out = [];
  if (index != null) {
    return get$1$1(format2, (index + shift) % 7, field, "day");
  }
  for (i2 = 0; i2 < 7; i2++) {
    out[i2] = get$1$1(format2, (i2 + shift) % 7, field, "day");
  }
  return out;
}
function listMonths(format2, index) {
  return listMonthsImpl(format2, index, "months");
}
function listMonthsShort(format2, index) {
  return listMonthsImpl(format2, index, "monthsShort");
}
function listWeekdays(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
}
function listWeekdaysShort(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
}
function listWeekdaysMin(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number) {
    var b2 = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b2 === 1 ? "st" : b2 === 2 ? "nd" : b2 === 3 ? "rd" : "th";
    return number + output;
  }
});
hooks.lang = deprecate(
  "moment.lang is deprecated. Use moment.locale instead.",
  getSetGlobalLocale
);
hooks.langData = deprecate(
  "moment.langData is deprecated. Use moment.localeData instead.",
  getLocale
);
var mathAbs = Math.abs;
function abs() {
  var data = this._data;
  this._milliseconds = mathAbs(this._milliseconds);
  this._days = mathAbs(this._days);
  this._months = mathAbs(this._months);
  data.milliseconds = mathAbs(data.milliseconds);
  data.seconds = mathAbs(data.seconds);
  data.minutes = mathAbs(data.minutes);
  data.hours = mathAbs(data.hours);
  data.months = mathAbs(data.months);
  data.years = mathAbs(data.years);
  return this;
}
function addSubtract$1(duration, input, value, direction) {
  var other = createDuration(input, value);
  duration._milliseconds += direction * other._milliseconds;
  duration._days += direction * other._days;
  duration._months += direction * other._months;
  return duration._bubble();
}
function add$1(input, value) {
  return addSubtract$1(this, input, value, 1);
}
function subtract$1(input, value) {
  return addSubtract$1(this, input, value, -1);
}
function absCeil(number) {
  if (number < 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}
function bubble() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor(milliseconds2 / 1e3);
  data.seconds = seconds2 % 60;
  minutes2 = absFloor(seconds2 / 60);
  data.minutes = minutes2 % 60;
  hours2 = absFloor(minutes2 / 60);
  data.hours = hours2 % 24;
  days2 += absFloor(hours2 / 24);
  monthsFromDays = absFloor(daysToMonths(days2));
  months2 += monthsFromDays;
  days2 -= absCeil(monthsToDays(monthsFromDays));
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  data.days = days2;
  data.months = months2;
  data.years = years2;
  return this;
}
function daysToMonths(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays(months2) {
  return months2 * 146097 / 4800;
}
function as(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function valueOf$1() {
  if (!this.isValid()) {
    return NaN;
  }
  return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
}
function makeAs(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() {
  return createDuration(this);
}
function get$2(units) {
  units = normalizeUnits(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter(name) {
  return function() {
    return this.isValid() ? this._data[name] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function substituteTimeAgo(string4, number, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number || 1, !!withoutSuffix, string4, isFuture);
}
function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a2 = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a2 = a2 || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a2 = a2 || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a2[2] = withoutSuffix;
  a2[3] = +posNegDuration > 0;
  a2[4] = locale2;
  return substituteTimeAgo.apply(null, a2);
}
function getSetRelativeTimeRounding(roundingFunction) {
  if (roundingFunction === void 0) {
    return round;
  }
  if (typeof roundingFunction === "function") {
    round = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold(threshold, limit) {
  if (thresholds[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === "s") {
    thresholds.ss = limit - 1;
  }
  return true;
}
function humanize(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1 = Math.abs;
function sign(x2) {
  return (x2 > 0) - (x2 < 0) || +x2;
}
function toISOString$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s2, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor(seconds2 / 60);
  hours2 = absFloor(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  s2 = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign(this._months) !== sign(total) ? "-" : "";
  daysSign = sign(this._days) !== sign(total) ? "-" : "";
  hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s2 + "S" : "");
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  toISOString$1
);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(input, array3, config) {
  config._d = new Date(parseFloat(input) * 1e3);
});
addParseToken("x", function(input, array3, config) {
  config._d = new Date(toInt(input));
});
//! moment.js
hooks.version = "2.29.1";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
globalThis.browser = browser;
function isCurrentPathname(path) {
  if (!path) {
    return false;
  }
  try {
    const { pathname } = new URL(path, location.origin);
    return pathname === location.pathname;
  } catch {
    return false;
  }
}
function getManifest(_version) {
  return globalThis.browser?.runtime?.getManifest?.();
}
function once$1(function_) {
  let result;
  return () => {
    if (typeof result === "undefined") {
      result = function_();
    }
    return result;
  };
}
const isBrowserActionPage = once$1(() => {
  const manifest = getManifest();
  if (manifest && isCurrentPathname(manifest?.browser_action?.default_popup)) {
    return true;
  }
  return false;
});
function n(n2) {
  for (var r2 = arguments.length, t2 = Array(r2 > 1 ? r2 - 1 : 0), e = 1; e < r2; e++)
    t2[e - 1] = arguments[e];
  throw Error("[Immer] minified error nr: " + n2 + (t2.length ? " " + t2.map(function(n3) {
    return "'" + n3 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r(n2) {
  return !!n2 && !!n2[Q];
}
function t(n2) {
  return !!n2 && (function(n3) {
    if (!n3 || "object" != typeof n3)
      return false;
    var r2 = Object.getPrototypeOf(n3);
    if (null === r2)
      return true;
    var t2 = Object.hasOwnProperty.call(r2, "constructor") && r2.constructor;
    return "function" == typeof t2 && Function.toString.call(t2) === Z;
  }(n2) || Array.isArray(n2) || !!n2[L] || !!n2.constructor[L] || s(n2) || v(n2));
}
function i(n2, r2, t2) {
  void 0 === t2 && (t2 = false), 0 === o(n2) ? (t2 ? Object.keys : nn)(n2).forEach(function(e) {
    t2 && "symbol" == typeof e || r2(e, n2[e], n2);
  }) : n2.forEach(function(t3, e) {
    return r2(e, t3, n2);
  });
}
function o(n2) {
  var r2 = n2[Q];
  return r2 ? r2.i > 3 ? r2.i - 4 : r2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
}
function u(n2, r2) {
  return 2 === o(n2) ? n2.has(r2) : Object.prototype.hasOwnProperty.call(n2, r2);
}
function a(n2, r2) {
  return 2 === o(n2) ? n2.get(r2) : n2[r2];
}
function f(n2, r2, t2) {
  var e = o(n2);
  2 === e ? n2.set(r2, t2) : 3 === e ? (n2.delete(r2), n2.add(t2)) : n2[r2] = t2;
}
function c(n2, r2) {
  return n2 === r2 ? 0 !== n2 || 1 / n2 == 1 / r2 : n2 != n2 && r2 != r2;
}
function s(n2) {
  return X && n2 instanceof Map;
}
function v(n2) {
  return q && n2 instanceof Set;
}
function p(n2) {
  return n2.o || n2.t;
}
function l(n2) {
  if (Array.isArray(n2))
    return Array.prototype.slice.call(n2);
  var r2 = rn(n2);
  delete r2[Q];
  for (var t2 = nn(r2), e = 0; e < t2.length; e++) {
    var i2 = t2[e], o2 = r2[i2];
    false === o2.writable && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (r2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
  }
  return Object.create(Object.getPrototypeOf(n2), r2);
}
function d(n2, e) {
  return void 0 === e && (e = false), y(n2) || r(n2) || !t(n2) ? n2 : (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e && i(n2, function(n3, r2) {
    return d(r2, true);
  }, true), n2);
}
function h() {
  n(2);
}
function y(n2) {
  return null == n2 || "object" != typeof n2 || Object.isFrozen(n2);
}
function b(r2) {
  var t2 = tn[r2];
  return t2 || n(18, r2), t2;
}
function m(n2, r2) {
  tn[n2] || (tn[n2] = r2);
}
function _() {
  return U;
}
function j(n2, r2) {
  r2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = r2);
}
function g(n2) {
  O(n2), n2.p.forEach(S), n2.p = null;
}
function O(n2) {
  n2 === U && (U = n2.l);
}
function w(n2) {
  return U = { p: [], l: U, h: n2, m: true, _: 0 };
}
function S(n2) {
  var r2 = n2[Q];
  0 === r2.i || 1 === r2.i ? r2.j() : r2.g = true;
}
function P(r2, e) {
  e._ = e.p.length;
  var i2 = e.p[0], o2 = void 0 !== r2 && r2 !== i2;
  return e.h.O || b("ES5").S(e, r2, o2), o2 ? (i2[Q].P && (g(e), n(4)), t(r2) && (r2 = M(e, r2), e.l || x(e, r2)), e.u && b("Patches").M(i2[Q], r2, e.u, e.s)) : r2 = M(e, i2, []), g(e), e.u && e.v(e.u, e.s), r2 !== H ? r2 : void 0;
}
function M(n2, r2, t2) {
  if (y(r2))
    return r2;
  var e = r2[Q];
  if (!e)
    return i(r2, function(i2, o3) {
      return A(n2, e, r2, i2, o3, t2);
    }, true), r2;
  if (e.A !== n2)
    return r2;
  if (!e.P)
    return x(n2, e.t, true), e.t;
  if (!e.I) {
    e.I = true, e.A._--;
    var o2 = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o;
    i(3 === e.i ? new Set(o2) : o2, function(r3, i2) {
      return A(n2, e, o2, r3, i2, t2);
    }), x(n2, o2, false), t2 && n2.u && b("Patches").R(e, t2, n2.u, n2.s);
  }
  return e.o;
}
function A(e, i2, o2, a2, c2, s2) {
  if (r(c2)) {
    var v2 = M(e, c2, s2 && i2 && 3 !== i2.i && !u(i2.D, a2) ? s2.concat(a2) : void 0);
    if (f(o2, a2, v2), !r(v2))
      return;
    e.m = false;
  }
  if (t(c2) && !y(c2)) {
    if (!e.h.F && e._ < 1)
      return;
    M(e, c2), i2 && i2.A.l || x(e, c2);
  }
}
function x(n2, r2, t2) {
  void 0 === t2 && (t2 = false), n2.h.F && n2.m && d(r2, t2);
}
function z(n2, r2) {
  var t2 = n2[Q];
  return (t2 ? p(t2) : n2)[r2];
}
function I(n2, r2) {
  if (r2 in n2)
    for (var t2 = Object.getPrototypeOf(n2); t2; ) {
      var e = Object.getOwnPropertyDescriptor(t2, r2);
      if (e)
        return e;
      t2 = Object.getPrototypeOf(t2);
    }
}
function k(n2) {
  n2.P || (n2.P = true, n2.l && k(n2.l));
}
function E(n2) {
  n2.o || (n2.o = l(n2.t));
}
function R(n2, r2, t2) {
  var e = s(r2) ? b("MapSet").N(r2, t2) : v(r2) ? b("MapSet").T(r2, t2) : n2.O ? function(n3, r3) {
    var t3 = Array.isArray(n3), e2 = { i: t3 ? 1 : 0, A: r3 ? r3.A : _(), P: false, I: false, D: {}, l: r3, t: n3, k: null, o: null, j: null, C: false }, i2 = e2, o2 = en;
    t3 && (i2 = [e2], o2 = on);
    var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
    return e2.k = f2, e2.j = a2, f2;
  }(r2, t2) : b("ES5").J(r2, t2);
  return (t2 ? t2.A : _()).p.push(e), e;
}
function D(e) {
  return r(e) || n(22, e), function n2(r2) {
    if (!t(r2))
      return r2;
    var e2, u2 = r2[Q], c2 = o(r2);
    if (u2) {
      if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
        return u2.t;
      u2.I = true, e2 = F(r2, c2), u2.I = false;
    } else
      e2 = F(r2, c2);
    return i(e2, function(r3, t2) {
      u2 && a(u2.t, r3) === t2 || f(e2, r3, n2(t2));
    }), 3 === c2 ? new Set(e2) : e2;
  }(e);
}
function F(n2, r2) {
  switch (r2) {
    case 2:
      return new Map(n2);
    case 3:
      return Array.from(n2);
  }
  return l(n2);
}
function N() {
  function t2(n2, r2) {
    var t3 = s2[n2];
    return t3 ? t3.enumerable = r2 : s2[n2] = t3 = { configurable: true, enumerable: r2, get: function() {
      var r3 = this[Q];
      return en.get(r3, n2);
    }, set: function(r3) {
      var t4 = this[Q];
      en.set(t4, n2, r3);
    } }, t3;
  }
  function e(n2) {
    for (var r2 = n2.length - 1; r2 >= 0; r2--) {
      var t3 = n2[r2][Q];
      if (!t3.P)
        switch (t3.i) {
          case 5:
            a2(t3) && k(t3);
            break;
          case 4:
            o2(t3) && k(t3);
        }
    }
  }
  function o2(n2) {
    for (var r2 = n2.t, t3 = n2.k, e2 = nn(t3), i2 = e2.length - 1; i2 >= 0; i2--) {
      var o3 = e2[i2];
      if (o3 !== Q) {
        var a3 = r2[o3];
        if (void 0 === a3 && !u(r2, o3))
          return true;
        var f2 = t3[o3], s3 = f2 && f2[Q];
        if (s3 ? s3.t !== a3 : !c(f2, a3))
          return true;
      }
    }
    var v2 = !!r2[Q];
    return e2.length !== nn(r2).length + (v2 ? 0 : 1);
  }
  function a2(n2) {
    var r2 = n2.k;
    if (r2.length !== n2.t.length)
      return true;
    var t3 = Object.getOwnPropertyDescriptor(r2, r2.length - 1);
    return !(!t3 || t3.get);
  }
  var s2 = {};
  m("ES5", { J: function(n2, r2) {
    var e2 = Array.isArray(n2), i2 = function(n3, r3) {
      if (n3) {
        for (var e3 = Array(r3.length), i3 = 0; i3 < r3.length; i3++)
          Object.defineProperty(e3, "" + i3, t2(i3, true));
        return e3;
      }
      var o4 = rn(r3);
      delete o4[Q];
      for (var u2 = nn(o4), a3 = 0; a3 < u2.length; a3++) {
        var f2 = u2[a3];
        o4[f2] = t2(f2, n3 || !!o4[f2].enumerable);
      }
      return Object.create(Object.getPrototypeOf(r3), o4);
    }(e2, n2), o3 = { i: e2 ? 5 : 4, A: r2 ? r2.A : _(), P: false, I: false, D: {}, l: r2, t: n2, k: i2, o: null, g: false, C: false };
    return Object.defineProperty(i2, Q, { value: o3, writable: true }), i2;
  }, S: function(n2, t3, o3) {
    o3 ? r(t3) && t3[Q].A === n2 && e(n2.p) : (n2.u && function n3(r2) {
      if (r2 && "object" == typeof r2) {
        var t4 = r2[Q];
        if (t4) {
          var e2 = t4.t, o4 = t4.k, f2 = t4.D, c2 = t4.i;
          if (4 === c2)
            i(o4, function(r3) {
              r3 !== Q && (void 0 !== e2[r3] || u(e2, r3) ? f2[r3] || n3(o4[r3]) : (f2[r3] = true, k(t4)));
            }), i(e2, function(n4) {
              void 0 !== o4[n4] || u(o4, n4) || (f2[n4] = false, k(t4));
            });
          else if (5 === c2) {
            if (a2(t4) && (k(t4), f2.length = true), o4.length < e2.length)
              for (var s3 = o4.length; s3 < e2.length; s3++)
                f2[s3] = false;
            else
              for (var v2 = e2.length; v2 < o4.length; v2++)
                f2[v2] = true;
            for (var p2 = Math.min(o4.length, e2.length), l2 = 0; l2 < p2; l2++)
              void 0 === f2[l2] && n3(o4[l2]);
          }
        }
      }
    }(n2.p[0]), e(n2.p));
  }, K: function(n2) {
    return 4 === n2.i ? o2(n2) : a2(n2);
  } });
}
var G, U, W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), X = "undefined" != typeof Map, q = "undefined" != typeof Set, B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G), L = W ? Symbol.for("immer-draftable") : "__$immer_draftable", Q = W ? Symbol.for("immer-state") : "__$immer_state", Z = "" + Object.prototype.constructor, nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n2) {
  return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
} : Object.getOwnPropertyNames, rn = Object.getOwnPropertyDescriptors || function(n2) {
  var r2 = {};
  return nn(n2).forEach(function(t2) {
    r2[t2] = Object.getOwnPropertyDescriptor(n2, t2);
  }), r2;
}, tn = {}, en = { get: function(n2, r2) {
  if (r2 === Q)
    return n2;
  var e = p(n2);
  if (!u(e, r2))
    return function(n3, r3, t2) {
      var e2, i3 = I(r3, t2);
      return i3 ? "value" in i3 ? i3.value : null === (e2 = i3.get) || void 0 === e2 ? void 0 : e2.call(n3.k) : void 0;
    }(n2, e, r2);
  var i2 = e[r2];
  return n2.I || !t(i2) ? i2 : i2 === z(n2.t, r2) ? (E(n2), n2.o[r2] = R(n2.A.h, i2, n2)) : i2;
}, has: function(n2, r2) {
  return r2 in p(n2);
}, ownKeys: function(n2) {
  return Reflect.ownKeys(p(n2));
}, set: function(n2, r2, t2) {
  var e = I(p(n2), r2);
  if (null == e ? void 0 : e.set)
    return e.set.call(n2.k, t2), true;
  if (!n2.P) {
    var i2 = z(p(n2), r2), o2 = null == i2 ? void 0 : i2[Q];
    if (o2 && o2.t === t2)
      return n2.o[r2] = t2, n2.D[r2] = false, true;
    if (c(t2, i2) && (void 0 !== t2 || u(n2.t, r2)))
      return true;
    E(n2), k(n2);
  }
  return n2.o[r2] === t2 && "number" != typeof t2 || (n2.o[r2] = t2, n2.D[r2] = true, true);
}, deleteProperty: function(n2, r2) {
  return void 0 !== z(n2.t, r2) || r2 in n2.t ? (n2.D[r2] = false, E(n2), k(n2)) : delete n2.D[r2], n2.o && delete n2.o[r2], true;
}, getOwnPropertyDescriptor: function(n2, r2) {
  var t2 = p(n2), e = Reflect.getOwnPropertyDescriptor(t2, r2);
  return e ? { writable: true, configurable: 1 !== n2.i || "length" !== r2, enumerable: e.enumerable, value: t2[r2] } : e;
}, defineProperty: function() {
  n(11);
}, getPrototypeOf: function(n2) {
  return Object.getPrototypeOf(n2.t);
}, setPrototypeOf: function() {
  n(12);
} }, on = {};
i(en, function(n2, r2) {
  on[n2] = function() {
    return arguments[0] = arguments[0][0], r2.apply(this, arguments);
  };
}), on.deleteProperty = function(r2, t2) {
  return en.deleteProperty.call(this, r2[0], t2);
}, on.set = function(r2, t2, e) {
  return en.set.call(this, r2[0], t2, e, r2[0]);
};
var un = function() {
  function e(r2) {
    var e2 = this;
    this.O = B, this.F = true, this.produce = function(r3, i3, o2) {
      if ("function" == typeof r3 && "function" != typeof i3) {
        var u2 = i3;
        i3 = r3;
        var a2 = e2;
        return function(n2) {
          var r4 = this;
          void 0 === n2 && (n2 = u2);
          for (var t2 = arguments.length, e3 = Array(t2 > 1 ? t2 - 1 : 0), o3 = 1; o3 < t2; o3++)
            e3[o3 - 1] = arguments[o3];
          return a2.produce(n2, function(n3) {
            var t3;
            return (t3 = i3).call.apply(t3, [r4, n3].concat(e3));
          });
        };
      }
      var f2;
      if ("function" != typeof i3 && n(6), void 0 !== o2 && "function" != typeof o2 && n(7), t(r3)) {
        var c2 = w(e2), s2 = R(e2, r3, void 0), v2 = true;
        try {
          f2 = i3(s2), v2 = false;
        } finally {
          v2 ? g(c2) : O(c2);
        }
        return "undefined" != typeof Promise && f2 instanceof Promise ? f2.then(function(n2) {
          return j(c2, o2), P(n2, c2);
        }, function(n2) {
          throw g(c2), n2;
        }) : (j(c2, o2), P(f2, c2));
      }
      if (!r3 || "object" != typeof r3) {
        if ((f2 = i3(r3)) === H)
          return;
        return void 0 === f2 && (f2 = r3), e2.F && d(f2, true), f2;
      }
      n(21, r3);
    }, this.produceWithPatches = function(n2, r3) {
      return "function" == typeof n2 ? function(r4) {
        for (var t3 = arguments.length, i4 = Array(t3 > 1 ? t3 - 1 : 0), o2 = 1; o2 < t3; o2++)
          i4[o2 - 1] = arguments[o2];
        return e2.produceWithPatches(r4, function(r5) {
          return n2.apply(void 0, [r5].concat(i4));
        });
      } : [e2.produce(n2, r3, function(n3, r4) {
        t2 = n3, i3 = r4;
      }), t2, i3];
      var t2, i3;
    }, "boolean" == typeof (null == r2 ? void 0 : r2.useProxies) && this.setUseProxies(r2.useProxies), "boolean" == typeof (null == r2 ? void 0 : r2.autoFreeze) && this.setAutoFreeze(r2.autoFreeze);
  }
  var i2 = e.prototype;
  return i2.createDraft = function(e2) {
    t(e2) || n(8), r(e2) && (e2 = D(e2));
    var i3 = w(this), o2 = R(this, e2, void 0);
    return o2[Q].C = true, O(i3), o2;
  }, i2.finishDraft = function(r2, t2) {
    var e2 = r2 && r2[Q];
    var i3 = e2.A;
    return j(i3, t2), P(void 0, i3);
  }, i2.setAutoFreeze = function(n2) {
    this.F = n2;
  }, i2.setUseProxies = function(r2) {
    r2 && !B && n(20), this.O = r2;
  }, i2.applyPatches = function(n2, t2) {
    var e2;
    for (e2 = t2.length - 1; e2 >= 0; e2--) {
      var i3 = t2[e2];
      if (0 === i3.path.length && "replace" === i3.op) {
        n2 = i3.value;
        break;
      }
    }
    var o2 = b("Patches").$;
    return r(n2) ? o2(n2, t2) : this.produce(n2, function(n3) {
      return o2(n3, t2.slice(e2 + 1));
    });
  }, e;
}(), an = new un(), fn$1 = an.produce;
an.produceWithPatches.bind(an);
an.setAutoFreeze.bind(an);
an.setUseProxies.bind(an);
an.applyPatches.bind(an);
an.createDraft.bind(an);
an.finishDraft.bind(an);
function _defineProperty(obj2, key, value) {
  if (key in obj2) {
    Object.defineProperty(obj2, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj2[key] = value;
  }
  return obj2;
}
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or use the non-minified dev environment for full errors. ";
}
var $$observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
var randomString = function randomString2() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function isPlainObject(obj2) {
  if (typeof obj2 !== "object" || obj2 === null)
    return false;
  var proto2 = obj2;
  while (Object.getPrototypeOf(proto2) !== null) {
    proto2 = Object.getPrototypeOf(proto2);
  }
  return Object.getPrototypeOf(obj2) === proto2;
}
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(formatProdErrorMessage(0));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(formatProdErrorMessage(1));
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== "function") {
    throw new Error(formatProdErrorMessage(2));
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(3));
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(formatProdErrorMessage(4));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(5));
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage(6));
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(formatProdErrorMessage(7));
    }
    if (typeof action.type === "undefined") {
      throw new Error(formatProdErrorMessage(8));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(9));
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i2 = 0; i2 < listeners.length; i2++) {
      var listener = listeners[i2];
      listener();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(formatProdErrorMessage(10));
    }
    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(formatProdErrorMessage(11));
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      }
    }, _ref[$$observable] = function() {
      return this;
    }, _ref;
  }
  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function(key) {
    var reducer = reducers[key];
    var initialState2 = reducer(void 0, {
      type: ActionTypes.INIT
    });
    if (typeof initialState2 === "undefined") {
      throw new Error(formatProdErrorMessage(12));
    }
    if (typeof reducer(void 0, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage(13));
    }
  });
}
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i2 = 0; i2 < reducerKeys.length; i2++) {
    var key = reducerKeys[i2];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage(14));
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function(arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function(a2, b2) {
    return function() {
      return a2(b2.apply(void 0, arguments));
    };
  });
}
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function(createStore2) {
    return function() {
      var store = createStore2.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error(formatProdErrorMessage(15));
      };
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function(middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2(_objectSpread2({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}
function defaultEqualityCheck(a2, b2) {
  return a2 === b2;
}
function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }
  var length = prev.length;
  for (var i2 = 0; i2 < length; i2++) {
    if (!equalityCheck(prev[i2], next[i2])) {
      return false;
    }
  }
  return true;
}
function defaultMemoize(func3) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultEqualityCheck;
  var lastArgs = null;
  var lastResult = null;
  return function() {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      lastResult = func3.apply(null, arguments);
    }
    lastArgs = arguments;
    return lastResult;
  };
}
function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
  if (!dependencies.every(function(dep) {
    return typeof dep === "function";
  })) {
    var dependencyTypes = dependencies.map(function(dep) {
      return typeof dep;
    }).join(", ");
    throw new Error("Selector creators expect all input-selectors to be functions, " + ("instead received the following types: [" + dependencyTypes + "]"));
  }
  return dependencies;
}
function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }
  return function() {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }
    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);
    var memoizedResultFunc = memoize.apply(void 0, [function() {
      recomputations++;
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));
    var selector2 = memoize(function() {
      var params = [];
      var length = dependencies.length;
      for (var i2 = 0; i2 < length; i2++) {
        params.push(dependencies[i2].apply(null, arguments));
      }
      return memoizedResultFunc.apply(null, params);
    });
    selector2.resultFunc = resultFunc;
    selector2.dependencies = dependencies;
    selector2.recomputations = function() {
      return recomputations;
    };
    selector2.resetRecomputations = function() {
      return recomputations = 0;
    };
    return selector2;
  };
}
createSelectorCreator(defaultMemoize);
function createThunkMiddleware(extraArgument) {
  return function(_ref) {
    var dispatch = _ref.dispatch, getState = _ref.getState;
    return function(next) {
      return function(action) {
        if (typeof action === "function") {
          return action(dispatch, getState, extraArgument);
        }
        return next(action);
      };
    };
  };
}
var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function createAction(type, prepareAction) {
  function actionCreator() {
    if (prepareAction) {
      var prepared = prepareAction.apply(void 0, arguments);
      if (!prepared) {
        throw new Error("prepareAction did not return an object");
      }
      return _extends({
        type,
        payload: prepared.payload
      }, "meta" in prepared && {
        meta: prepared.meta
      }, {}, "error" in prepared && {
        error: prepared.error
      });
    }
    return {
      type,
      payload: arguments.length <= 0 ? void 0 : arguments[0]
    };
  }
  actionCreator.toString = function() {
    return "" + type;
  };
  actionCreator.type = type;
  actionCreator.match = function(action) {
    return action.type === type;
  };
  return actionCreator;
}
function executeReducerBuilderCallback(builderCallback) {
  var actionsMap = {};
  var actionMatchers = [];
  var defaultCaseReducer;
  var builder = {
    addCase: function addCase(typeOrActionCreator, reducer) {
      var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (type in actionsMap) {
        throw new Error("addCase cannot be called with two reducers for the same action type");
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addMatcher: function addMatcher(matcher2, reducer) {
      actionMatchers.push({
        matcher: matcher2,
        reducer
      });
      return builder;
    },
    addDefaultCase: function addDefaultCase(reducer) {
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function createReducer(initialState2, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
  if (actionMatchers === void 0) {
    actionMatchers = [];
  }
  var _ref = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _ref[0], finalActionMatchers = _ref[1], finalDefaultCaseReducer = _ref[2];
  var frozenInitialState = fn$1(initialState2, function() {
  });
  return function(state, action) {
    if (state === void 0) {
      state = frozenInitialState;
    }
    var caseReducers = [actionsMap[action.type]].concat(finalActionMatchers.filter(function(_ref2) {
      var matcher2 = _ref2.matcher;
      return matcher2(action);
    }).map(function(_ref3) {
      var reducer = _ref3.reducer;
      return reducer;
    }));
    if (caseReducers.filter(function(cr) {
      return !!cr;
    }).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce(function(previousState, caseReducer) {
      if (caseReducer) {
        if (r(previousState)) {
          var draft = previousState;
          var result = caseReducer(draft, action);
          if (typeof result === "undefined") {
            return previousState;
          }
          return result;
        } else if (!t(previousState)) {
          var _result = caseReducer(previousState, action);
          if (typeof _result === "undefined") {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return _result;
        } else {
          return fn$1(previousState, function(draft2) {
            return caseReducer(draft2, action);
          });
        }
      }
      return previousState;
    }, state);
  };
}
function getType$1(slice, actionKey) {
  return slice + "/" + actionKey;
}
function createSlice(options) {
  var name = options.name, initialState2 = options.initialState;
  if (!name) {
    throw new Error("`name` is a required option for createSlice");
  }
  var reducers = options.reducers || {};
  var _ref = typeof options.extraReducers === "undefined" ? [] : typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _ref$ = _ref[0], extraReducers = _ref$ === void 0 ? {} : _ref$, _ref$2 = _ref[1], actionMatchers = _ref$2 === void 0 ? [] : _ref$2, _ref$3 = _ref[2], defaultCaseReducer = _ref$3 === void 0 ? void 0 : _ref$3;
  var reducerNames = Object.keys(reducers);
  var sliceCaseReducersByName = {};
  var sliceCaseReducersByType = {};
  var actionCreators = {};
  reducerNames.forEach(function(reducerName) {
    var maybeReducerWithPrepare = reducers[reducerName];
    var type = getType$1(name, reducerName);
    var caseReducer;
    var prepareCallback;
    if ("reducer" in maybeReducerWithPrepare) {
      caseReducer = maybeReducerWithPrepare.reducer;
      prepareCallback = maybeReducerWithPrepare.prepare;
    } else {
      caseReducer = maybeReducerWithPrepare;
    }
    sliceCaseReducersByName[reducerName] = caseReducer;
    sliceCaseReducersByType[type] = caseReducer;
    actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
  });
  var finalCaseReducers = _extends({}, extraReducers, {}, sliceCaseReducersByType);
  var reducer = createReducer(initialState2, finalCaseReducers, actionMatchers, defaultCaseReducer);
  return {
    name,
    reducer,
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName
  };
}
typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")) : "@@asyncIterator";
N();
function asyncHelper() {
  const initialState2 = {
    loginStatus: {
      loggedIn: false,
      username: ""
    },
    logInLoader: false
  };
  const accountSlice = createSlice({
    name: "account",
    initialState: initialState2,
    reducers: {
      setLoginStatus(state, action) {
        state.loginStatus = action.payload;
      },
      setLogInLoader(state, action) {
        state.logInLoader = action.payload;
      }
    }
  });
  return accountSlice;
}
const account = asyncHelper().reducer;
const { setLoginStatus, setLogInLoader } = asyncHelper().actions;
const ns$1 = "app/";
const CLOSE_VIEW = `${ns$1}close-view`;
const OPEN_VIEW = `${ns$1}open-view`;
const SET_IS_SHOP_MATCH = `${ns$1}set-is-shop-match`;
const SET_IS_PRODUCT_PAGE = `${ns$1}set-is-product-page`;
const TOGGLE_MENU = `${ns$1}toggle-menu`;
const APP_LOADING = `${ns$1}app-loading`;
const SET_MENU_OPEN = `${ns$1}menu-open`;
const SET_ICON_COUNT = `${ns$1}icon-count`;
function closeView() {
  return {
    type: CLOSE_VIEW
  };
}
function openView(view) {
  return {
    type: OPEN_VIEW,
    payload: view
  };
}
function setIsShopMatch(activate) {
  return {
    type: SET_IS_SHOP_MATCH,
    payload: activate
  };
}
function setMenuOpen(open) {
  return {
    type: SET_MENU_OPEN,
    payload: open
  };
}
function toggleMenu() {
  return {
    type: TOGGLE_MENU
  };
}
function startAppLoading(payload) {
  return {
    type: APP_LOADING,
    payload
  };
}
const initialState$4 = {
  appLoading: false,
  isShopMatch: false,
  isProductPage: false,
  view: null,
  menuOpen: false,
  icons: {
    offer: { count: 0, showCount: false },
    postedOffer: { count: 0, showCount: false },
    productStats: { count: 0, showCount: false },
    similar: { count: 0, showCount: false },
    voucher: { count: 0, showCount: false },
    alertas: { count: 0, showCount: true }
  }
};
function appReducer(state = initialState$4, action) {
  switch (action.type) {
    case CLOSE_VIEW:
    case OPEN_VIEW:
      return { ...state, view: action.payload || null };
    case SET_IS_SHOP_MATCH:
      return { ...state, isShopMatch: action.payload };
    case SET_IS_PRODUCT_PAGE:
      return { ...state, isProductPage: action.payload };
    case TOGGLE_MENU:
      return { ...state, menuOpen: !state.menuOpen };
    case APP_LOADING:
      return { ...state, appLoading: action.payload };
    case SET_MENU_OPEN:
      return state.isShopMatch ? state : { ...state, menuOpen: action?.payload };
    case SET_ICON_COUNT:
      return {
        ...state,
        icons: {
          ...state.icons,
          [action?.payload?.icon]: {
            ...state?.icons?.[action?.payload?.icon],
            count: action?.payload?.count
          }
        }
      };
    default:
      return state;
  }
}
var createSymbol = function createSymbol2(name) {
  return "@@redux-saga/" + name;
};
var CANCEL$1 = /* @__PURE__ */ createSymbol("CANCEL_PROMISE");
var CHANNEL_END_TYPE = /* @__PURE__ */ createSymbol("CHANNEL_END");
var IO = /* @__PURE__ */ createSymbol("IO");
var MATCH = /* @__PURE__ */ createSymbol("MATCH");
var MULTICAST = /* @__PURE__ */ createSymbol("MULTICAST");
var SAGA_ACTION = /* @__PURE__ */ createSymbol("SAGA_ACTION");
var SELF_CANCELLATION = /* @__PURE__ */ createSymbol("SELF_CANCELLATION");
var TASK = /* @__PURE__ */ createSymbol("TASK");
var TASK_CANCEL = /* @__PURE__ */ createSymbol("TASK_CANCEL");
var TERMINATE = /* @__PURE__ */ createSymbol("TERMINATE");
var SAGA_LOCATION = /* @__PURE__ */ createSymbol("LOCATION");
var undef = function undef2(v2) {
  return v2 === null || v2 === void 0;
};
var notUndef = function notUndef2(v2) {
  return v2 !== null && v2 !== void 0;
};
var func = function func2(f2) {
  return typeof f2 === "function";
};
var string$2 = function string(s2) {
  return typeof s2 === "string";
};
var array$1 = Array.isArray;
var promise = function promise2(p2) {
  return p2 && func(p2.then);
};
var iterator = function iterator2(it) {
  return it && func(it.next) && func(it.throw);
};
var pattern = function pattern2(pat) {
  return pat && (string$2(pat) || symbol$1(pat) || func(pat) || array$1(pat) && pat.every(pattern2));
};
var channel$1 = function channel(ch) {
  return ch && func(ch.take) && func(ch.close);
};
var stringableFunc = function stringableFunc2(f2) {
  return func(f2) && f2.hasOwnProperty("toString");
};
var symbol$1 = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === "function" && sym.constructor === Symbol && sym !== Symbol.prototype;
};
var multicast = function multicast2(ch) {
  return channel$1(ch) && ch[MULTICAST];
};
var konst = function konst2(v2) {
  return function() {
    return v2;
  };
};
var kTrue = /* @__PURE__ */ konst(true);
var noop = function noop2() {
};
var identity = function identity2(v2) {
  return v2;
};
var assignWithSymbols = function assignWithSymbols2(target, source) {
  _extends$1(target, source);
  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(function(s2) {
      target[s2] = source[s2];
    });
  }
};
var flatMap = function flatMap2(mapper, arr) {
  var _ref;
  return (_ref = []).concat.apply(_ref, arr.map(mapper));
};
function remove(array3, item) {
  var index = array3.indexOf(item);
  if (index >= 0) {
    array3.splice(index, 1);
  }
}
function once(fn2) {
  var called = false;
  return function() {
    if (called) {
      return;
    }
    called = true;
    fn2();
  };
}
var kThrow = function kThrow2(err) {
  throw err;
};
var kReturn = function kReturn2(value) {
  return {
    value,
    done: true
  };
};
function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }
  if (name === void 0) {
    name = "iterator";
  }
  var iterator3 = {
    meta: {
      name
    },
    next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };
  if (typeof Symbol !== "undefined") {
    iterator3[Symbol.iterator] = function() {
      return iterator3;
    };
  }
  return iterator3;
}
function logError(error, _ref2) {
  var sagaStack2 = _ref2.sagaStack;
  console.error(error);
  console.error(sagaStack2);
}
var createEmptyArray = function createEmptyArray2(n2) {
  return Array.apply(null, new Array(n2));
};
var wrapSagaDispatch = function wrapSagaDispatch2(dispatch) {
  return function(action) {
    return dispatch(Object.defineProperty(action, SAGA_ACTION, {
      value: true
    }));
  };
};
var shouldTerminate = function shouldTerminate2(res) {
  return res === TERMINATE;
};
var shouldCancel = function shouldCancel2(res) {
  return res === TASK_CANCEL;
};
var shouldComplete = function shouldComplete2(res) {
  return shouldTerminate(res) || shouldCancel(res);
};
function createAllStyleChildCallbacks(shape, parentCallback) {
  var keys2 = Object.keys(shape);
  var totalCount = keys2.length;
  var completedCount = 0;
  var completed;
  var results = array$1(shape) ? createEmptyArray(totalCount) : {};
  var childCallbacks = {};
  function checkEnd() {
    if (completedCount === totalCount) {
      completed = true;
      parentCallback(results);
    }
  }
  keys2.forEach(function(key) {
    var chCbAtKey = function chCbAtKey2(res, isErr) {
      if (completed) {
        return;
      }
      if (isErr || shouldComplete(res)) {
        parentCallback.cancel();
        parentCallback(res, isErr);
      } else {
        results[key] = res;
        completedCount++;
        checkEnd();
      }
    };
    chCbAtKey.cancel = noop;
    childCallbacks[key] = chCbAtKey;
  });
  parentCallback.cancel = function() {
    if (!completed) {
      completed = true;
      keys2.forEach(function(key) {
        return childCallbacks[key].cancel();
      });
    }
  };
  return childCallbacks;
}
function getMetaInfo(fn2) {
  return {
    name: fn2.name || "anonymous",
    location: getLocation(fn2)
  };
}
function getLocation(instrumented) {
  return instrumented[SAGA_LOCATION];
}
var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
function ringBuffer(limit, overflowAction) {
  if (limit === void 0) {
    limit = 10;
  }
  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;
  var push = function push2(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };
  var take2 = function take3() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };
  var flush2 = function flush3() {
    var items = [];
    while (length) {
      items.push(take2());
    }
    return items;
  };
  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put2(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit;
        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);
          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;
          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush2();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push(it);
            break;
        }
      }
    },
    take: take2,
    flush: flush2
  };
}
var expanding = function expanding2(initialSize) {
  return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
};
var TAKE = "TAKE";
var PUT = "PUT";
var ALL = "ALL";
var RACE = "RACE";
var CALL = "CALL";
var CPS = "CPS";
var FORK = "FORK";
var JOIN = "JOIN";
var CANCEL = "CANCEL";
var SELECT = "SELECT";
var ACTION_CHANNEL = "ACTION_CHANNEL";
var CANCELLED$1 = "CANCELLED";
var FLUSH = "FLUSH";
var GET_CONTEXT = "GET_CONTEXT";
var SET_CONTEXT = "SET_CONTEXT";
var makeEffect = function makeEffect2(type, payload) {
  var _ref;
  return _ref = {}, _ref[IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = "*";
  }
  if (pattern(patternOrChannel)) {
    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }
  if (multicast(patternOrChannel) && notUndef(multicastPattern) && pattern(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }
  if (channel$1(patternOrChannel)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }
}
function put(channel$1$1, action) {
  if (undef(action)) {
    action = channel$1$1;
    channel$1$1 = void 0;
  }
  return makeEffect(PUT, {
    channel: channel$1$1,
    action
  });
}
function all(effects) {
  var eff = makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}
function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn2;
  if (func(fnDescriptor)) {
    fn2 = fnDescriptor;
  } else {
    if (array$1(fnDescriptor)) {
      context = fnDescriptor[0];
      fn2 = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn2 = fnDescriptor.fn;
    }
    if (context && string$2(fn2) && func(context[fn2])) {
      fn2 = context[fn2];
    }
  }
  return {
    context,
    fn: fn2,
    args
  };
}
function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function fork(fnDescriptor) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
var done = function done2(value) {
  return {
    done: true,
    value
  };
};
var qEnd = {};
function safeName(patternOrChannel) {
  if (channel$1(patternOrChannel)) {
    return "channel";
  }
  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }
  if (func(patternOrChannel)) {
    return patternOrChannel.name;
  }
  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater, errorState, effect, nextState = startState;
  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }
    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }
  return makeIterator(next, function(error) {
    return next(null, error);
  }, name);
}
function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yFork = function yFork2(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };
  var action, setAction = function setAction2(ac) {
    return action = ac;
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: "q2",
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: "q1",
        effect: yFork(action)
      };
    }
  }, "q1", "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}
function takeEvery$1(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}
function deferred() {
  var def = {};
  def.promise = new Promise(function(resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
}
var queue = [];
var semaphore = 0;
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    release();
  }
}
function asap(task) {
  queue.push(task);
  if (!semaphore) {
    suspend();
    flush();
  }
}
function immediately(task) {
  try {
    suspend();
    return task();
  } finally {
    flush();
  }
}
function suspend() {
  semaphore++;
}
function release() {
  semaphore--;
}
function flush() {
  release();
  var task;
  while (!semaphore && (task = queue.shift()) !== void 0) {
    exec(task);
  }
}
var array = function array2(patterns) {
  return function(input) {
    return patterns.some(function(p2) {
      return matcher(p2)(input);
    });
  };
};
var predicate = function predicate2(_predicate) {
  return function(input) {
    return _predicate(input);
  };
};
var string$1 = function string2(pattern3) {
  return function(input) {
    return input.type === String(pattern3);
  };
};
var symbol2 = function symbol3(pattern3) {
  return function(input) {
    return input.type === pattern3;
  };
};
var wildcard = function wildcard2() {
  return kTrue;
};
function matcher(pattern3) {
  var matcherCreator = pattern3 === "*" ? wildcard : string$2(pattern3) ? string$1 : array$1(pattern3) ? array : stringableFunc(pattern3) ? string$1 : func(pattern3) ? predicate : symbol$1(pattern3) ? symbol2 : null;
  if (matcherCreator === null) {
    throw new Error("invalid pattern: " + pattern3);
  }
  return matcherCreator(pattern3);
}
var END = {
  type: CHANNEL_END_TYPE
};
var isEnd = function isEnd2(a2) {
  return a2 && a2.type === CHANNEL_END_TYPE;
};
function channel2(buffer$1) {
  if (buffer$1 === void 0) {
    buffer$1 = expanding();
  }
  var closed = false;
  var takers = [];
  function put2(input) {
    if (closed) {
      return;
    }
    if (takers.length === 0) {
      return buffer$1.put(input);
    }
    var cb = takers.shift();
    cb(input);
  }
  function take2(cb) {
    if (closed && buffer$1.isEmpty()) {
      cb(END);
    } else if (!buffer$1.isEmpty()) {
      cb(buffer$1.take());
    } else {
      takers.push(cb);
      cb.cancel = function() {
        remove(takers, cb);
      };
    }
  }
  function flush2(cb) {
    if (closed && buffer$1.isEmpty()) {
      cb(END);
      return;
    }
    cb(buffer$1.flush());
  }
  function close() {
    if (closed) {
      return;
    }
    closed = true;
    var arr = takers;
    takers = [];
    for (var i2 = 0, len = arr.length; i2 < len; i2++) {
      var taker = arr[i2];
      taker(END);
    }
  }
  return {
    take: take2,
    put: put2,
    flush: flush2,
    close
  };
}
function multicastChannel() {
  var _ref;
  var closed = false;
  var currentTakers = [];
  var nextTakers = currentTakers;
  var ensureCanMutateNextTakers = function ensureCanMutateNextTakers2() {
    if (nextTakers !== currentTakers) {
      return;
    }
    nextTakers = currentTakers.slice();
  };
  var close = function close2() {
    closed = true;
    var takers = currentTakers = nextTakers;
    nextTakers = [];
    takers.forEach(function(taker) {
      taker(END);
    });
  };
  return _ref = {}, _ref[MULTICAST] = true, _ref.put = function put2(input) {
    if (closed) {
      return;
    }
    if (isEnd(input)) {
      close();
      return;
    }
    var takers = currentTakers = nextTakers;
    for (var i2 = 0, len = takers.length; i2 < len; i2++) {
      var taker = takers[i2];
      if (taker[MATCH](input)) {
        taker.cancel();
        taker(input);
      }
    }
  }, _ref.take = function take2(cb, matcher2) {
    if (matcher2 === void 0) {
      matcher2 = wildcard;
    }
    if (closed) {
      cb(END);
      return;
    }
    cb[MATCH] = matcher2;
    ensureCanMutateNextTakers();
    nextTakers.push(cb);
    cb.cancel = once(function() {
      ensureCanMutateNextTakers();
      remove(nextTakers, cb);
    });
  }, _ref.close = close, _ref;
}
function stdChannel() {
  var chan = multicastChannel();
  var put2 = chan.put;
  chan.put = function(input) {
    if (input[SAGA_ACTION]) {
      put2(input);
      return;
    }
    asap(function() {
      put2(input);
    });
  };
  return chan;
}
var RUNNING = 0;
var CANCELLED = 1;
var ABORTED = 2;
var DONE = 3;
function resolvePromise(promise3, cb) {
  var cancelPromise = promise3[CANCEL$1];
  if (func(cancelPromise)) {
    cb.cancel = cancelPromise;
  }
  promise3.then(cb, function(error) {
    cb(error, true);
  });
}
var current = 0;
var nextSagaId = function() {
  return ++current;
};
var _effectRunnerMap;
function getIteratorMetaInfo(iterator3, fn2) {
  if (iterator3.isSagaIterator) {
    return {
      name: iterator3.meta.name
    };
  }
  return getMetaInfo(fn2);
}
function createTaskIterator(_ref) {
  var context = _ref.context, fn2 = _ref.fn, args = _ref.args;
  try {
    var result = fn2.apply(context, args);
    if (iterator(result)) {
      return result;
    }
    var resolved = false;
    var next = function next2(arg) {
      if (!resolved) {
        resolved = true;
        return {
          value: result,
          done: !promise(result)
        };
      } else {
        return {
          value: arg,
          done: true
        };
      }
    };
    return makeIterator(next);
  } catch (err) {
    return makeIterator(function() {
      throw err;
    });
  }
}
function runPutEffect(env, _ref2, cb) {
  var channel3 = _ref2.channel, action = _ref2.action, resolve = _ref2.resolve;
  asap(function() {
    var result;
    try {
      result = (channel3 ? channel3.put : env.dispatch)(action);
    } catch (error) {
      cb(error, true);
      return;
    }
    if (resolve && promise(result)) {
      resolvePromise(result, cb);
    } else {
      cb(result);
    }
  });
}
function runTakeEffect(env, _ref3, cb) {
  var _ref3$channel = _ref3.channel, channel3 = _ref3$channel === void 0 ? env.channel : _ref3$channel, pattern3 = _ref3.pattern, maybe = _ref3.maybe;
  var takeCb = function takeCb2(input) {
    if (input instanceof Error) {
      cb(input, true);
      return;
    }
    if (isEnd(input) && !maybe) {
      cb(TERMINATE);
      return;
    }
    cb(input);
  };
  try {
    channel3.take(takeCb, notUndef(pattern3) ? matcher(pattern3) : null);
  } catch (err) {
    cb(err, true);
    return;
  }
  cb.cancel = takeCb.cancel;
}
function runCallEffect(env, _ref4, cb, _ref5) {
  var context = _ref4.context, fn2 = _ref4.fn, args = _ref4.args;
  var task = _ref5.task;
  try {
    var result = fn2.apply(context, args);
    if (promise(result)) {
      resolvePromise(result, cb);
      return;
    }
    if (iterator(result)) {
      proc(
        env,
        result,
        task.context,
        current,
        getMetaInfo(fn2),
        /* isRoot */
        false,
        cb
      );
      return;
    }
    cb(result);
  } catch (error) {
    cb(error, true);
  }
}
function runCPSEffect(env, _ref6, cb) {
  var context = _ref6.context, fn2 = _ref6.fn, args = _ref6.args;
  try {
    var cpsCb = function cpsCb2(err, res) {
      if (undef(err)) {
        cb(res);
      } else {
        cb(err, true);
      }
    };
    fn2.apply(context, args.concat(cpsCb));
    if (cpsCb.cancel) {
      cb.cancel = cpsCb.cancel;
    }
  } catch (error) {
    cb(error, true);
  }
}
function runForkEffect(env, _ref7, cb, _ref8) {
  var context = _ref7.context, fn2 = _ref7.fn, args = _ref7.args, detached = _ref7.detached;
  var parent = _ref8.task;
  var taskIterator = createTaskIterator({
    context,
    fn: fn2,
    args
  });
  var meta = getIteratorMetaInfo(taskIterator, fn2);
  immediately(function() {
    var child = proc(env, taskIterator, parent.context, current, meta, detached, void 0);
    if (detached) {
      cb(child);
    } else {
      if (child.isRunning()) {
        parent.queue.addTask(child);
        cb(child);
      } else if (child.isAborted()) {
        parent.queue.abort(child.error());
      } else {
        cb(child);
      }
    }
  });
}
function runJoinEffect(env, taskOrTasks, cb, _ref9) {
  var task = _ref9.task;
  var joinSingleTask = function joinSingleTask2(taskToJoin, cb2) {
    if (taskToJoin.isRunning()) {
      var joiner = {
        task,
        cb: cb2
      };
      cb2.cancel = function() {
        if (taskToJoin.isRunning())
          remove(taskToJoin.joiners, joiner);
      };
      taskToJoin.joiners.push(joiner);
    } else {
      if (taskToJoin.isAborted()) {
        cb2(taskToJoin.error(), true);
      } else {
        cb2(taskToJoin.result());
      }
    }
  };
  if (array$1(taskOrTasks)) {
    if (taskOrTasks.length === 0) {
      cb([]);
      return;
    }
    var childCallbacks = createAllStyleChildCallbacks(taskOrTasks, cb);
    taskOrTasks.forEach(function(t2, i2) {
      joinSingleTask(t2, childCallbacks[i2]);
    });
  } else {
    joinSingleTask(taskOrTasks, cb);
  }
}
function cancelSingleTask(taskToCancel) {
  if (taskToCancel.isRunning()) {
    taskToCancel.cancel();
  }
}
function runCancelEffect(env, taskOrTasks, cb, _ref10) {
  var task = _ref10.task;
  if (taskOrTasks === SELF_CANCELLATION) {
    cancelSingleTask(task);
  } else if (array$1(taskOrTasks)) {
    taskOrTasks.forEach(cancelSingleTask);
  } else {
    cancelSingleTask(taskOrTasks);
  }
  cb();
}
function runAllEffect(env, effects, cb, _ref11) {
  var digestEffect = _ref11.digestEffect;
  var effectId = current;
  var keys2 = Object.keys(effects);
  if (keys2.length === 0) {
    cb(array$1(effects) ? [] : {});
    return;
  }
  var childCallbacks = createAllStyleChildCallbacks(effects, cb);
  keys2.forEach(function(key) {
    digestEffect(effects[key], effectId, childCallbacks[key], key);
  });
}
function runRaceEffect(env, effects, cb, _ref12) {
  var digestEffect = _ref12.digestEffect;
  var effectId = current;
  var keys2 = Object.keys(effects);
  var response = array$1(effects) ? createEmptyArray(keys2.length) : {};
  var childCbs = {};
  var completed = false;
  keys2.forEach(function(key) {
    var chCbAtKey = function chCbAtKey2(res, isErr) {
      if (completed) {
        return;
      }
      if (isErr || shouldComplete(res)) {
        cb.cancel();
        cb(res, isErr);
      } else {
        cb.cancel();
        completed = true;
        response[key] = res;
        cb(response);
      }
    };
    chCbAtKey.cancel = noop;
    childCbs[key] = chCbAtKey;
  });
  cb.cancel = function() {
    if (!completed) {
      completed = true;
      keys2.forEach(function(key) {
        return childCbs[key].cancel();
      });
    }
  };
  keys2.forEach(function(key) {
    if (completed) {
      return;
    }
    digestEffect(effects[key], effectId, childCbs[key], key);
  });
}
function runSelectEffect(env, _ref13, cb) {
  var selector2 = _ref13.selector, args = _ref13.args;
  try {
    var state = selector2.apply(void 0, [env.getState()].concat(args));
    cb(state);
  } catch (error) {
    cb(error, true);
  }
}
function runChannelEffect(env, _ref14, cb) {
  var pattern3 = _ref14.pattern, buffer = _ref14.buffer;
  var chan = channel2(buffer);
  var match = matcher(pattern3);
  var taker = function taker2(action) {
    if (!isEnd(action)) {
      env.channel.take(taker2, match);
    }
    chan.put(action);
  };
  var close = chan.close;
  chan.close = function() {
    taker.cancel();
    close();
  };
  env.channel.take(taker, match);
  cb(chan);
}
function runCancelledEffect(env, data, cb, _ref15) {
  var task = _ref15.task;
  cb(task.isCancelled());
}
function runFlushEffect(env, channel3, cb) {
  channel3.flush(cb);
}
function runGetContextEffect(env, prop, cb, _ref16) {
  var task = _ref16.task;
  cb(task.context[prop]);
}
function runSetContextEffect(env, props, cb, _ref17) {
  var task = _ref17.task;
  assignWithSymbols(task.context, props);
  cb();
}
var effectRunnerMap = (_effectRunnerMap = {}, _effectRunnerMap[TAKE] = runTakeEffect, _effectRunnerMap[PUT] = runPutEffect, _effectRunnerMap[ALL] = runAllEffect, _effectRunnerMap[RACE] = runRaceEffect, _effectRunnerMap[CALL] = runCallEffect, _effectRunnerMap[CPS] = runCPSEffect, _effectRunnerMap[FORK] = runForkEffect, _effectRunnerMap[JOIN] = runJoinEffect, _effectRunnerMap[CANCEL] = runCancelEffect, _effectRunnerMap[SELECT] = runSelectEffect, _effectRunnerMap[ACTION_CHANNEL] = runChannelEffect, _effectRunnerMap[CANCELLED$1] = runCancelledEffect, _effectRunnerMap[FLUSH] = runFlushEffect, _effectRunnerMap[GET_CONTEXT] = runGetContextEffect, _effectRunnerMap[SET_CONTEXT] = runSetContextEffect, _effectRunnerMap);
function forkQueue(mainTask, onAbort, cont) {
  var tasks = [];
  var result;
  var completed = false;
  addTask(mainTask);
  var getTasks = function getTasks2() {
    return tasks;
  };
  function abort(err) {
    onAbort();
    cancelAll();
    cont(err, true);
  }
  function addTask(task) {
    tasks.push(task);
    task.cont = function(res, isErr) {
      if (completed) {
        return;
      }
      remove(tasks, task);
      task.cont = noop;
      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }
        if (!tasks.length) {
          completed = true;
          cont(result);
        }
      }
    };
  }
  function cancelAll() {
    if (completed) {
      return;
    }
    completed = true;
    tasks.forEach(function(t2) {
      t2.cont = noop;
      t2.cancel();
    });
    tasks = [];
  }
  return {
    addTask,
    cancelAll,
    abort,
    getTasks
  };
}
function formatLocation(fileName, lineNumber) {
  return fileName + "?" + lineNumber;
}
function effectLocationAsString(effect) {
  var location2 = getLocation(effect);
  if (location2) {
    var code = location2.code, fileName = location2.fileName, lineNumber = location2.lineNumber;
    var source = code + "  " + formatLocation(fileName, lineNumber);
    return source;
  }
  return "";
}
function sagaLocationAsString(sagaMeta) {
  var name = sagaMeta.name, location2 = sagaMeta.location;
  if (location2) {
    return name + "  " + formatLocation(location2.fileName, location2.lineNumber);
  }
  return name;
}
function cancelledTasksAsString(sagaStack2) {
  var cancelledTasks = flatMap(function(i2) {
    return i2.cancelledTasks;
  }, sagaStack2);
  if (!cancelledTasks.length) {
    return "";
  }
  return ["Tasks cancelled due to error:"].concat(cancelledTasks).join("\n");
}
var crashedEffect = null;
var sagaStack = [];
var addSagaFrame = function addSagaFrame2(frame) {
  frame.crashedEffect = crashedEffect;
  sagaStack.push(frame);
};
var clear = function clear2() {
  crashedEffect = null;
  sagaStack.length = 0;
};
var setCrashedEffect = function setCrashedEffect2(effect) {
  crashedEffect = effect;
};
var toString = function toString2() {
  var firstSaga = sagaStack[0], otherSagas = sagaStack.slice(1);
  var crashedEffectLocation = firstSaga.crashedEffect ? effectLocationAsString(firstSaga.crashedEffect) : null;
  var errorMessage = "The above error occurred in task " + sagaLocationAsString(firstSaga.meta) + (crashedEffectLocation ? " \n when executing effect " + crashedEffectLocation : "");
  return [errorMessage].concat(otherSagas.map(function(s2) {
    return "    created by " + sagaLocationAsString(s2.meta);
  }), [cancelledTasksAsString(sagaStack)]).join("\n");
};
function newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont) {
  var _task;
  if (cont === void 0) {
    cont = noop;
  }
  var status = RUNNING;
  var taskResult;
  var taskError;
  var deferredEnd = null;
  var cancelledDueToErrorTasks = [];
  var context = Object.create(parentContext);
  var queue2 = forkQueue(mainTask, function onAbort() {
    cancelledDueToErrorTasks.push.apply(cancelledDueToErrorTasks, queue2.getTasks().map(function(t2) {
      return t2.meta.name;
    }));
  }, end);
  function cancel() {
    if (status === RUNNING) {
      status = CANCELLED;
      queue2.cancelAll();
      end(TASK_CANCEL, false);
    }
  }
  function end(result, isErr) {
    if (!isErr) {
      if (result === TASK_CANCEL) {
        status = CANCELLED;
      } else if (status !== CANCELLED) {
        status = DONE;
      }
      taskResult = result;
      deferredEnd && deferredEnd.resolve(result);
    } else {
      status = ABORTED;
      addSagaFrame({
        meta,
        cancelledTasks: cancelledDueToErrorTasks
      });
      if (task.isRoot) {
        var sagaStack2 = toString();
        clear();
        env.onError(result, {
          sagaStack: sagaStack2
        });
      }
      taskError = result;
      deferredEnd && deferredEnd.reject(result);
    }
    task.cont(result, isErr);
    task.joiners.forEach(function(joiner) {
      joiner.cb(result, isErr);
    });
    task.joiners = null;
  }
  function setContext(props) {
    assignWithSymbols(context, props);
  }
  function toPromise() {
    if (deferredEnd) {
      return deferredEnd.promise;
    }
    deferredEnd = deferred();
    if (status === ABORTED) {
      deferredEnd.reject(taskError);
    } else if (status !== RUNNING) {
      deferredEnd.resolve(taskResult);
    }
    return deferredEnd.promise;
  }
  var task = (_task = {}, _task[TASK] = true, _task.id = parentEffectId, _task.meta = meta, _task.isRoot = isRoot, _task.context = context, _task.joiners = [], _task.queue = queue2, _task.cancel = cancel, _task.cont = cont, _task.end = end, _task.setContext = setContext, _task.toPromise = toPromise, _task.isRunning = function isRunning() {
    return status === RUNNING;
  }, _task.isCancelled = function isCancelled() {
    return status === CANCELLED || status === RUNNING && mainTask.status === CANCELLED;
  }, _task.isAborted = function isAborted() {
    return status === ABORTED;
  }, _task.result = function result() {
    return taskResult;
  }, _task.error = function error() {
    return taskError;
  }, _task);
  return task;
}
function proc(env, iterator$1, parentContext, parentEffectId, meta, isRoot, cont) {
  var finalRunEffect = env.finalizeRunEffect(runEffect);
  next.cancel = noop;
  var mainTask = {
    meta,
    cancel: cancelMain,
    status: RUNNING
  };
  var task = newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont);
  var executingContext = {
    task,
    digestEffect
  };
  function cancelMain() {
    if (mainTask.status === RUNNING) {
      mainTask.status = CANCELLED;
      next(TASK_CANCEL);
    }
  }
  if (cont) {
    cont.cancel = task.cancel;
  }
  next();
  return task;
  function next(arg, isErr) {
    try {
      var result;
      if (isErr) {
        result = iterator$1.throw(arg);
        clear();
      } else if (shouldCancel(arg)) {
        mainTask.status = CANCELLED;
        next.cancel();
        result = func(iterator$1.return) ? iterator$1.return(TASK_CANCEL) : {
          done: true,
          value: TASK_CANCEL
        };
      } else if (shouldTerminate(arg)) {
        result = func(iterator$1.return) ? iterator$1.return() : {
          done: true
        };
      } else {
        result = iterator$1.next(arg);
      }
      if (!result.done) {
        digestEffect(result.value, parentEffectId, next);
      } else {
        if (mainTask.status !== CANCELLED) {
          mainTask.status = DONE;
        }
        mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.status === CANCELLED) {
        throw error;
      }
      mainTask.status = ABORTED;
      mainTask.cont(error, true);
    }
  }
  function runEffect(effect, effectId, currCb) {
    if (promise(effect)) {
      resolvePromise(effect, currCb);
    } else if (iterator(effect)) {
      proc(
        env,
        effect,
        task.context,
        effectId,
        meta,
        /* isRoot */
        false,
        currCb
      );
    } else if (effect && effect[IO]) {
      var effectRunner = effectRunnerMap[effect.type];
      effectRunner(env, effect.payload, currCb, executingContext);
    } else {
      currCb(effect);
    }
  }
  function digestEffect(effect, parentEffectId2, cb, label) {
    if (label === void 0) {
      label = "";
    }
    var effectId = nextSagaId();
    env.sagaMonitor && env.sagaMonitor.effectTriggered({
      effectId,
      parentEffectId: parentEffectId2,
      label,
      effect
    });
    var effectSettled;
    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }
      effectSettled = true;
      cb.cancel = noop;
      if (env.sagaMonitor) {
        if (isErr) {
          env.sagaMonitor.effectRejected(effectId, res);
        } else {
          env.sagaMonitor.effectResolved(effectId, res);
        }
      }
      if (isErr) {
        setCrashedEffect(effect);
      }
      cb(res, isErr);
    }
    currCb.cancel = noop;
    cb.cancel = function() {
      if (effectSettled) {
        return;
      }
      effectSettled = true;
      currCb.cancel();
      currCb.cancel = noop;
      env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
    };
    finalRunEffect(effect, effectId, currCb);
  }
}
function runSaga(_ref, saga) {
  var _ref$channel = _ref.channel, channel3 = _ref$channel === void 0 ? stdChannel() : _ref$channel, dispatch = _ref.dispatch, getState = _ref.getState, _ref$context = _ref.context, context = _ref$context === void 0 ? {} : _ref$context, sagaMonitor = _ref.sagaMonitor, effectMiddlewares = _ref.effectMiddlewares, _ref$onError = _ref.onError, onError = _ref$onError === void 0 ? logError : _ref$onError;
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var iterator$1 = saga.apply(void 0, args);
  var effectId = nextSagaId();
  if (sagaMonitor) {
    sagaMonitor.rootSagaStarted = sagaMonitor.rootSagaStarted || noop;
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop;
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop;
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop;
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop;
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop;
    sagaMonitor.rootSagaStarted({
      effectId,
      saga,
      args
    });
  }
  var finalizeRunEffect;
  if (effectMiddlewares) {
    var middleware = compose.apply(void 0, effectMiddlewares);
    finalizeRunEffect = function finalizeRunEffect2(runEffect) {
      return function(effect, effectId2, currCb) {
        var plainRunEffect = function plainRunEffect2(eff) {
          return runEffect(eff, effectId2, currCb);
        };
        return middleware(plainRunEffect)(effect);
      };
    };
  } else {
    finalizeRunEffect = identity;
  }
  var env = {
    channel: channel3,
    dispatch: wrapSagaDispatch(dispatch),
    getState,
    sagaMonitor,
    onError,
    finalizeRunEffect
  };
  return immediately(function() {
    var task = proc(
      env,
      iterator$1,
      context,
      effectId,
      getMetaInfo(saga),
      /* isRoot */
      true,
      void 0
    );
    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task);
    }
    return task;
  });
}
function sagaMiddlewareFactory(_temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$context = _ref.context, context = _ref$context === void 0 ? {} : _ref$context, _ref$channel = _ref.channel, channel3 = _ref$channel === void 0 ? stdChannel() : _ref$channel, sagaMonitor = _ref.sagaMonitor, options = _objectWithoutPropertiesLoose(_ref, ["context", "channel", "sagaMonitor"]);
  var boundRunSaga;
  function sagaMiddleware(_ref2) {
    var getState = _ref2.getState, dispatch = _ref2.dispatch;
    boundRunSaga = runSaga.bind(null, _extends$1({}, options, {
      context,
      channel: channel3,
      dispatch,
      getState,
      sagaMonitor
    }));
    return function(next) {
      return function(action) {
        if (sagaMonitor && sagaMonitor.actionDispatched) {
          sagaMonitor.actionDispatched(action);
        }
        var result = next(action);
        channel3.put(action);
        return result;
      };
    };
  }
  sagaMiddleware.run = function() {
    return boundRunSaga.apply(void 0, arguments);
  };
  sagaMiddleware.setContext = function(props) {
    assignWithSymbols(context, props);
  };
  return sagaMiddleware;
}
function createExecutor(processors) {
  return (ast, initialValue = null) => executeAST(ast, initialValue, processors);
}
function executeAST(ast, initialValue = null, processors = {}) {
  switch (ast?.kind) {
    case "lit":
      return {
        value: ast.value
      };
    case "pipe":
      return ast.values.reduce(
        (acc, curr) => {
          if (acc?.error)
            return acc;
          const res = executeAST(curr, acc?.value, processors);
          return res;
        },
        { value: initialValue }
      );
    case "fn":
      const args = ast.args.map((arg) => executeAST(arg, null, processors));
      const errors = args.filter((arg) => arg.error);
      if (errors.length > 0) {
        return {
          error: true,
          kind: "FnExecutionError",
          message: `AST function [${ast.fn}] has errors`,
          stackedErrors: errors
        };
      }
      try {
        const appliedFn = processors[ast.fn](
          ast,
          ...args.map((arg) => arg.value)
        );
        if (Array.isArray(initialValue) && ast.multi) {
          const results = initialValue.map(appliedFn);
          const errors2 = results.filter((result) => result.error);
          if (errors2.length > 0) {
            return {
              error: true,
              kind: "FnMultiplexError",
              message: `AST function [${ast.fn}] has errors`,
              stackedErrors: errors2
            };
          }
          const ret = results.map((r2) => r2.value).filter((r2) => r2 !== null);
          return {
            value: ast.flatten ? ret.flat() : ret
          };
        } else {
          return appliedFn(initialValue);
        }
      } catch (e) {
        return {
          error: true,
          kind: "FnExecutionError",
          message: `AST function [${ast.fn}] has errors`,
          stackedErrors: [
            {
              error: true,
              kind: "FnException",
              message: `[${e}]: ${e?.message}`
            }
          ]
        };
      }
    case void 0:
      return {
        error: true,
        kind: "UnknownASTElementType",
        message: `ASTElement is \`undefined\``
      };
    default:
      return {
        error: true,
        kind: "UnknownASTElementType",
        message: `Value [${ast?.kind}] is not a valid ASTElementType`
      };
  }
}
let text;
if (typeof TextEncoder !== "undefined") {
  text = { Encoder: TextEncoder, Decoder: TextDecoder };
} else {
  try {
    const util = require("util");
    text = { Encoder: util.TextEncoder, Decoder: util.TextDecoder };
  } catch (ex) {
    throw new Error("Arcsecond requires TextEncoder and TextDecoder to be polyfilled.");
  }
}
const encoder = new text.Encoder();
const decoder = new text.Decoder();
const getString = (index, length, dataView) => {
  const bytes = Uint8Array.from({ length }, (_2, i2) => dataView.getUint8(index + i2));
  const decodedString = decoder.decode(bytes);
  return decodedString;
};
const getNextCharWidth = (index, dataView) => {
  const byte = dataView.getUint8(index);
  if ((byte & 128) >> 7 === 0)
    return 1;
  else if ((byte & 224) >> 5 === 6)
    return 2;
  else if ((byte & 240) >> 4 === 14)
    return 3;
  else if ((byte & 240) >> 4 === 15)
    return 4;
  return 1;
};
const getUtf8Char = (index, length, dataView) => {
  const bytes = Uint8Array.from({ length }, (_2, i2) => dataView.getUint8(index + i2));
  return decoder.decode(bytes);
};
const getCharacterLength = (str) => {
  let cp;
  let total = 0;
  let i2 = 0;
  while (i2 < str.length) {
    cp = str.codePointAt(i2);
    while (cp) {
      cp = cp >> 8;
      i2++;
    }
    total++;
  }
  return total;
};
const isTypedArray = (x2) => x2 instanceof Uint8Array || x2 instanceof Uint8ClampedArray || x2 instanceof Int8Array || x2 instanceof Uint16Array || x2 instanceof Int16Array || x2 instanceof Uint32Array || x2 instanceof Int32Array || x2 instanceof Float32Array || x2 instanceof Float64Array;
var InputTypes;
(function(InputTypes2) {
  InputTypes2["STRING"] = "string";
  InputTypes2["ARRAY_BUFFER"] = "arrayBuffer";
  InputTypes2["TYPED_ARRAY"] = "typedArray";
  InputTypes2["DATA_VIEW"] = "dataView";
})(InputTypes || (InputTypes = {}));
const createParserState = (target, data = null) => {
  let dataView;
  let inputType;
  if (typeof target === "string") {
    const bytes = encoder.encode(target);
    dataView = new DataView(bytes.buffer);
    inputType = InputTypes.STRING;
  } else if (target instanceof ArrayBuffer) {
    dataView = new DataView(target);
    inputType = InputTypes.ARRAY_BUFFER;
  } else if (isTypedArray(target)) {
    dataView = new DataView(target.buffer);
    inputType = InputTypes.TYPED_ARRAY;
  } else if (target instanceof DataView) {
    dataView = target;
    inputType = InputTypes.DATA_VIEW;
  } else {
    throw new Error(`Cannot process input. Must be a string, ArrayBuffer, TypedArray, or DataView. but got ${typeof target}`);
  }
  return {
    dataView,
    inputType,
    isError: false,
    error: null,
    result: null,
    data,
    index: 0
  };
};
const updateError = (state, error) => ({ ...state, isError: true, error });
const updateResult = (state, result) => ({ ...state, result });
const updateData = (state, data) => ({ ...state, data });
const updateParserState = (state, result, index) => ({
  ...state,
  result,
  index
});
class Parser {
  constructor(p2) {
    this.p = p2;
  }
  // run :: Parser e a s ~> x -> Either e a
  run(target) {
    const state = createParserState(target);
    const resultState = this.p(state);
    if (resultState.isError) {
      return {
        isError: true,
        error: resultState.error,
        index: resultState.index,
        data: resultState.data
      };
    }
    return {
      isError: false,
      result: resultState.result,
      index: resultState.index,
      data: resultState.data
    };
  }
  // fork :: Parser e a s ~> x -> (e -> ParserState e a s -> f) -> (a -> ParserState e a s -> b)
  fork(target, errorFn, successFn) {
    const state = createParserState(target);
    const newState = this.p(state);
    if (newState.isError) {
      return errorFn(newState.error, newState);
    }
    return successFn(newState.result, newState);
  }
  // map :: Parser e a s ~> (a -> b) -> Parser e b s
  map(fn2) {
    const p2 = this.p;
    return new Parser(function Parser$map$state(state) {
      const newState = p2(state);
      if (newState.isError)
        return newState;
      return updateResult(newState, fn2(newState.result));
    });
  }
  // chain :: Parser e a s ~> (a -> Parser e b s) -> Parser e b s
  chain(fn2) {
    const p2 = this.p;
    return new Parser(function Parser$chain$state(state) {
      const newState = p2(state);
      if (newState.isError)
        return newState;
      return fn2(newState.result).p(newState);
    });
  }
  // ap :: Parser e a s ~> Parser e (a -> b) s -> Parser e b s
  ap(parserOfFunction) {
    const p2 = this.p;
    return new Parser(function Parser$ap$state(state) {
      if (state.isError)
        return state;
      const argumentState = p2(state);
      if (argumentState.isError)
        return argumentState;
      const fnState = parserOfFunction.p(argumentState);
      if (fnState.isError)
        return fnState;
      return updateResult(fnState, fnState.result(argumentState.result));
    });
  }
  // errorMap :: Parser e a s ~> (e -> f) -> Parser f a s
  errorMap(fn2) {
    const p2 = this.p;
    return new Parser(function Parser$errorMap$state(state) {
      const nextState = p2(state);
      if (!nextState.isError)
        return nextState;
      return updateError(nextState, fn2({
        isError: true,
        error: nextState.error,
        index: nextState.index,
        data: nextState.data
      }));
    });
  }
  // errorChain :: Parser e a s ~> ((e, Integer, s) -> Parser f a s) -> Parser f a s
  errorChain(fn2) {
    const p2 = this.p;
    return new Parser(function Parser$errorChain$state(state) {
      const nextState = p2(state);
      if (nextState.isError) {
        const { error, index, data } = nextState;
        const nextParser = fn2({ isError: true, error, index, data });
        return nextParser.p({ ...nextState, isError: false });
      }
      return nextState;
    });
  }
  // mapFromData :: Parser e a s ~> (StateData a s -> b) -> Parser e b s
  mapFromData(fn2) {
    const p2 = this.p;
    return new Parser((state) => {
      const newState = p2(state);
      if (newState.isError && newState.error)
        return newState;
      return updateResult(newState, fn2({
        isError: false,
        result: newState.result,
        data: newState.data,
        index: newState.index
      }));
    });
  }
  // chainFromData :: Parser e a s ~> (StateData a s -> Parser f b t) -> Parser f b t
  chainFromData(fn2) {
    const p2 = this.p;
    return new Parser(function Parser$chainFromData$state(state) {
      const newState = p2(state);
      if (newState.isError && newState.error)
        return newState;
      return fn2({ result: newState.result, data: newState.data }).p(newState);
    });
  }
  // mapData :: Parser e a s ~> (s -> t) -> Parser e a t
  mapData(fn2) {
    const p2 = this.p;
    return new Parser(function mapData$state(state) {
      const newState = p2(state);
      return updateData(newState, fn2(newState.data));
    });
  }
  // of :: a -> Parser e a s
  static of(x2) {
    return new Parser((state) => updateResult(state, x2));
  }
}
const reDigit = /[0-9]/;
const reDigits = /^[0-9]+/;
const reLetter = /[a-zA-Z]/;
const reLetters = /^[a-zA-Z]+/;
const reWhitespaces = /^\s+/;
new Parser(function getData$state(state) {
  if (state.isError)
    return state;
  return updateResult(state, state.data);
});
function fail(errorMessage) {
  return new Parser(function fail$state(state) {
    if (state.isError)
      return state;
    return updateError(state, errorMessage);
  });
}
Parser.of;
function coroutine(g2) {
  return new Parser(function coroutine$state(state) {
    const generator = g2();
    let nextValue = void 0;
    let nextState = state;
    while (true) {
      const result = generator.next(nextValue);
      const value = result.value;
      const done3 = result.done;
      if (done3) {
        return updateResult(nextState, value);
      }
      if (!(value && value instanceof Parser)) {
        throw new Error(`[coroutine] yielded values must be Parsers, got ${result.value}.`);
      }
      nextState = value.p(nextState);
      if (nextState.isError) {
        return nextState;
      }
      nextValue = nextState.result;
    }
  });
}
const many = function many2(parser2) {
  return new Parser(function many$state(state) {
    if (state.isError)
      return state;
    const results = [];
    let nextState = state;
    while (true) {
      const out = parser2.p(nextState);
      if (out.isError) {
        break;
      } else {
        nextState = out;
        results.push(nextState.result);
        if (nextState.index >= nextState.dataView.byteLength) {
          break;
        }
      }
    }
    return updateResult(nextState, results);
  });
};
const char = function char2(c2) {
  if (!c2 || getCharacterLength(c2) !== 1) {
    throw new TypeError(`char must be called with a single character, but got ${c2}`);
  }
  return new Parser(function char$state(state) {
    if (state.isError)
      return state;
    const { index, dataView } = state;
    if (index < dataView.byteLength) {
      const charWidth = getNextCharWidth(index, dataView);
      if (index + charWidth <= dataView.byteLength) {
        const char3 = getUtf8Char(index, charWidth, dataView);
        return char3 === c2 ? updateParserState(state, c2, index + charWidth) : updateError(state, `ParseError (position ${index}): Expecting character '${c2}', got '${char3}'`);
      }
    }
    return updateError(state, `ParseError (position ${index}): Expecting character '${c2}', but got end of input.`);
  });
};
new Parser(function anyChar$state(state) {
  if (state.isError)
    return state;
  const { index, dataView } = state;
  if (index < dataView.byteLength) {
    const charWidth = getNextCharWidth(index, dataView);
    if (index + charWidth <= dataView.byteLength) {
      const char3 = getUtf8Char(index, charWidth, dataView);
      return updateParserState(state, char3, index + charWidth);
    }
  }
  return updateError(state, `ParseError (position ${index}): Expecting a character, but got end of input.`);
});
new Parser(function peek$state(state) {
  if (state.isError)
    return state;
  const { index, dataView } = state;
  if (index < dataView.byteLength) {
    return updateParserState(state, dataView.getUint8(index), index);
  }
  return updateError(state, `ParseError (position ${index}): Unexpected end of input.`);
});
function regex$1(re) {
  const typeofre = Object.prototype.toString.call(re);
  if (typeofre !== "[object RegExp]") {
    throw new TypeError(`regex must be called with a Regular Expression, but got ${typeofre}`);
  }
  if (re.toString()[1] !== "^") {
    throw new Error(`regex parsers must contain '^' start assertion.`);
  }
  return new Parser(function regex$state(state) {
    if (state.isError)
      return state;
    const { dataView, index } = state;
    const rest = getString(index, dataView.byteLength - index, dataView);
    if (rest.length >= 1) {
      const match = rest.match(re);
      return match ? updateParserState(state, match[0], index + encoder.encode(match[0]).byteLength) : updateError(state, `ParseError (position ${index}): Expecting string matching '${re}', got '${rest.slice(0, 5)}...'`);
    }
    return updateError(state, `ParseError (position ${index}): Expecting string matching '${re}', but got end of input.`);
  });
}
new Parser(function digit$state(state) {
  if (state.isError)
    return state;
  const { dataView, index } = state;
  if (dataView.byteLength > index) {
    const charWidth = getNextCharWidth(index, dataView);
    if (index + charWidth <= dataView.byteLength) {
      const char3 = getUtf8Char(index, charWidth, dataView);
      return dataView.byteLength && char3 && reDigit.test(char3) ? updateParserState(state, char3, index + charWidth) : updateError(state, `ParseError (position ${index}): Expecting digit, got '${char3}'`);
    }
  }
  return updateError(state, `ParseError (position ${index}): Expecting digit, but got end of input.`);
});
const digits = regex$1(reDigits).errorMap(({ index }) => `ParseError (position ${index}): Expecting digits`);
new Parser(function letter$state(state) {
  if (state.isError)
    return state;
  const { index, dataView } = state;
  if (dataView.byteLength > index) {
    const charWidth = getNextCharWidth(index, dataView);
    if (index + charWidth <= dataView.byteLength) {
      const char3 = getUtf8Char(index, charWidth, dataView);
      return dataView.byteLength && char3 && reLetter.test(char3) ? updateParserState(state, char3, index + charWidth) : updateError(state, `ParseError (position ${index}): Expecting letter, got '${char3}'`);
    }
  }
  return updateError(state, `ParseError (position ${index}): Expecting letter, but got end of input.`);
});
const letters = regex$1(reLetters).errorMap(({ index }) => `ParseError (position ${index}): Expecting letters`);
function namedSequenceOf(pairedParsers) {
  return new Parser(function namedSequenceOf$state(state) {
    if (state.isError)
      return state;
    const results = {};
    let nextState = state;
    for (const [key, parser2] of pairedParsers) {
      const out = parser2.p(nextState);
      if (out.isError) {
        return out;
      } else {
        nextState = out;
        results[key] = out.result;
      }
    }
    return updateResult(nextState, results);
  });
}
function sequenceOf(parsers) {
  return new Parser(function sequenceOf$state(state) {
    if (state.isError)
      return state;
    const length = parsers.length;
    const results = new Array(length);
    let nextState = state;
    for (let i2 = 0; i2 < length; i2++) {
      const out = parsers[i2].p(nextState);
      if (out.isError) {
        return out;
      } else {
        nextState = out;
        results[i2] = out.result;
      }
    }
    return updateResult(nextState, results);
  });
}
function sepBy(sepParser) {
  return function sepBy$valParser(valueParser) {
    return new Parser(function sepBy$valParser$state(state) {
      if (state.isError)
        return state;
      let nextState = state;
      let error = null;
      const results = [];
      while (true) {
        const valState = valueParser.p(nextState);
        const sepState = sepParser.p(valState);
        if (valState.isError) {
          error = valState;
          break;
        } else {
          results.push(valState.result);
        }
        if (sepState.isError) {
          nextState = valState;
          break;
        }
        nextState = sepState;
      }
      if (error) {
        if (results.length === 0) {
          return updateResult(state, results);
        }
        return error;
      }
      return updateResult(nextState, results);
    });
  };
}
function choice(parsers) {
  if (parsers.length === 0)
    throw new Error(`List of parsers can't be empty.`);
  return new Parser(function choice$state(state) {
    if (state.isError)
      return state;
    let error = null;
    for (const parser2 of parsers) {
      const out = parser2.p(state);
      if (!out.isError)
        return out;
      if (error === null || error && out.index > error.index) {
        error = out;
      }
    }
    return error;
  });
}
function between(leftParser) {
  return function between$rightParser(rightParser) {
    return function between$parser(parser2) {
      return sequenceOf([leftParser, parser2, rightParser]).map(([_2, x2]) => x2);
    };
  };
}
function possibly(parser2) {
  return new Parser(function possibly$state(state) {
    if (state.isError)
      return state;
    const nextState = parser2.p(state);
    return nextState.isError ? updateResult(state, null) : nextState;
  });
}
new Parser(function startOfInput$state(state) {
  if (state.isError)
    return state;
  const { index } = state;
  if (index > 0) {
    return updateError(state, `ParseError 'startOfInput' (position ${index}): Expected start of input'`);
  }
  return state;
});
new Parser(function endOfInput$state(state) {
  if (state.isError)
    return state;
  const { dataView, index, inputType } = state;
  if (index !== dataView.byteLength) {
    const errorByte = inputType === InputTypes.STRING ? String.fromCharCode(dataView.getUint8(index)) : `0x${dataView.getUint8(index).toString(16).padStart(2, "0")}`;
    return updateError(state, `ParseError 'endOfInput' (position ${index}): Expected end of input but got '${errorByte}'`);
  }
  return updateResult(state, null);
});
const whitespace = regex$1(reWhitespaces).errorMap(({ index }) => `ParseError 'many1' (position ${index}): Expecting to match at least one value`);
const optionalWhitespace = possibly(whitespace).map((x2) => x2 || "");
function recursiveParser(parserThunk) {
  return new Parser(function recursiveParser$state(state) {
    return parserThunk().p(state);
  });
}
class JSONRegExp extends RegExp {
  constructor(regExp, flags2) {
    if (regExp[0] === "/" && regExp[0] == regExp[regExp.length - 1])
      ;
    super(regExp, flags2);
  }
  toJSON() {
    return this.toString();
  }
}
const surroundedBy = (parser2) => between(parser2)(parser2);
const betweenSquareBrackets = between(char("["))(char("]"));
const betweenParens = between(char("("))(char(")"));
const pipeSeparated = sepBy(surroundedBy(optionalWhitespace)(char("|")));
const commaSeparated = sepBy(surroundedBy(optionalWhitespace)(char(",")));
const flags = namedSequenceOf([
  ["flat", possibly(char("_"))],
  ["multi", possibly(char("!"))]
]);
possibly(
  choice([
    flags,
    namedSequenceOf([
      ["secondName", letters],
      ["flags", possibly(flags)]
    ])
  ])
);
const checkFlags = (value, flag) => {
  if (value.fSecond && value.fSecond.flags) {
    return value.fSecond.flags[flag] ? true : false;
  }
  if (value.flags) {
    return value.flags[flag] ? true : false;
  }
};
const fnName = namedSequenceOf([
  ["fName", letters],
  ["flags", flags],
  [
    "fSecond",
    possibly(
      namedSequenceOf([
        ["secondName", letters],
        ["flags", flags]
      ])
    )
  ]
]).map((value) => ({
  kind: "symbol",
  type: "name",
  value: `${(() => {
    if (value.fSecond) {
      const { fSecond } = value;
      return value.fName + "_" + fSecond.secondName;
    }
    return value.fName;
  })()}`,
  multi: checkFlags(value, "multi"),
  flatten: checkFlags(value, "flat")
}));
regex$1(/^([^\/\)])*/).map((value) => {
  return {
    kind: "lit",
    type: "stringAux",
    value
  };
});
const fn = sequenceOf([
  fnName,
  betweenParens(
    choice([
      // This comment is the future support once all queries are updated
      // The engine implementation supports this, but current queries do not.
      commaSeparated(recursiveParser(() => expression))
      // From here should be commented out once full literal support is achieved
      // recursiveParser(() => argument),
      // stringAux,
    ])
  )
]).map((value) => {
  return {
    kind: "fn",
    fn: value[0].value,
    multi: value[0].multi,
    flatten: value[0].flatten,
    args: value[1].kind ? [value[1]] : [...value[1]]
  };
});
const regularExpression = sequenceOf([
  surroundedBy(char("/"))(regex$1(/^([^\/]|(?<=\\)\/)*/)),
  possibly(many(choice([..."gmisuy"].map((c2) => char(c2)))))
]);
const regexParser = coroutine(function* () {
  const regex2 = yield regularExpression;
  try {
    const regexResult = new JSONRegExp(`${regex2[0]}`, `${regex2[1].join("")}` || void 0);
    return {
      kind: "lit",
      type: "regex",
      value: regexResult
    };
  } catch (error) {
    const exitError = yield fail(error.message);
    return exitError;
  }
});
const nullValue = sequenceOf([..."null"].map((c2) => char(c2))).map((v2) => ({
  kind: "lit",
  type: "null",
  value: null
}));
const string3 = surroundedBy(char("`"))(regex$1(/^([^`])*/)).map((value) => ({
  kind: "lit",
  type: "string",
  value
}));
const integer = digits.map((value) => ({
  kind: "lit",
  type: "integer",
  value: parseInt(value)
}));
const float = sequenceOf([digits, char("."), digits]).map((value) => ({
  kind: "lit",
  type: "float",
  value: parseFloat(value.join(""))
}));
const argument = choice([
  nullValue,
  string3,
  float,
  integer,
  regexParser,
  recursiveParser(() => list),
  recursiveParser(() => obj)
]);
const list = betweenSquareBrackets(commaSeparated(argument)).map((value) => ({
  kind: "lit",
  type: "list",
  value: value.map((ast) => {
    return ast.value;
  })
}));
const obj = between(char("{"))(char("}"))(
  surroundedBy(optionalWhitespace)(
    commaSeparated(
      sequenceOf([letters, surroundedBy(optionalWhitespace)(char(":")), argument])
    ).map((value) => ({
      kind: "lit",
      type: "object",
      value: value.reduce((acc, curr) => (acc[curr[0]] = curr[2].value, acc), {})
    }))
  )
);
const pipeElement = recursiveParser(() => fn);
const pipe = choice([
  pipeSeparated(pipeElement).map((values) => ({
    kind: "pipe",
    values
  }))
]);
const expression = choice([
  sequenceOf([
    argument,
    possibly(sequenceOf([surroundedBy(optionalWhitespace)(char("|")), pipe]))
  ]).map(([argument2, pipe2]) => {
    [, pipe2] = pipe2 || [];
    const pipeArgs = pipe2?.values || [];
    return {
      kind: "pipe",
      values: [argument2, ...pipeArgs]
    };
  }),
  pipe
]);
const parser = between(optionalWhitespace)(optionalWhitespace)(expression);
function get(ob, path) {
  if (!path)
    return ob;
  return path.split(".").reduce((way, s2) => !way || way[s2] === void 0 ? null : way[s2], ob);
}
function split(ast, splitChar) {
  return (el) => {
    if (typeof splitChar !== "string" && !(splitChar instanceof RegExp)) {
      throw new Error("split(splitChar) should be a string or Regex");
    }
    const inputValue = `${el || ""}`;
    return {
      value: inputValue.split(splitChar)
    };
  };
}
function firstContaining(ast, text2) {
  return (el) => {
    return {
      value: el.find((v2) => {
        const val = v2 instanceof HTMLElement ? v2.textContent : v2 && `${v2}`;
        if (!val)
          return false;
        return text2 instanceof RegExp ? val.match(text2) : val.includes(text2);
      }) || null
    };
  };
}
function selector(ast, query, pick2 = null) {
  return (el) => {
    const htmlElement = (el instanceof HTMLElement ? el : document).querySelector(
      query
    );
    return {
      value: pick2 !== null ? get(htmlElement, pick2) : htmlElement
    };
  };
}
function global(ast, value) {
  return () => {
    return {
      value: get(window, value)
    };
  };
}
function concat(ast, value1, value2) {
  return (el) => {
    if (value1 === void 0) {
      throw new Error(`concat needs at least 1 argument`);
    }
    if (value2 === void 0)
      return { value: `${el || ""}${value1 || ""}` };
    return { value: `${value1 || ""}${value2 || ""}` };
  };
}
function parse(ast, format2, pick2) {
  return (el) => {
    let toParse = el instanceof HTMLElement ? el.textContent || "" : el;
    switch (format2) {
      case "jsonld":
        toParse = toParse.replaceAll("\n", "").replaceAll(/((?<!")http.+?(?!"))\s*?,/g, '"$1",').replaceAll(/:\s*'(.*?)'\s*,/g, ':"$1",').replaceAll(/,\s*\?*\s*("[a-zA-Z_0-9]*":)/g, ",$1");
      case "json":
        return { value: get(JSON.parse(toParse), pick2) };
    }
    throw new Error("Invalid argument, choose one of: [json,jsonld]");
  };
}
function json_parse(ast, format2 = "json") {
  return (el) => {
    let toParse = el;
    if (format2 === "jsonld") {
      toParse = toParse.replaceAll("\n", "").replaceAll(/((?<!")http.+?(?!"))\s*?,/g, '"$1",').replaceAll(/:\s*'(.*?)'\s*,/g, ':"$1",').replaceAll(/,\s*\?*\s*("[a-zA-Z_0-9]*":)/g, ",$1");
    }
    return { value: JSON.parse(toParse) };
  };
}
function json_string(ast) {
  return (el) => {
    return { value: JSON.stringify(el) };
  };
}
function selectorAll(ast, query, pick2 = null) {
  return (el) => {
    const htmlElements = [
      ...(el instanceof HTMLElement ? el : document).querySelectorAll(query)
    ].map((he) => (he.toJSON = he.toString, he));
    return {
      value: pick2 !== null ? htmlElements.map((he) => get(he, pick2)) : htmlElements
    };
  };
}
function innerFormat(value, fmt) {
  if (value === null) {
    return null;
  }
  value = value || "";
  switch (fmt.toLowerCase()) {
    case "currency": {
      const currencySymbol = value.replace(/((?!\$|€|£|¥).)*/g, "");
      switch (currencySymbol[0]) {
        case "$":
          return "USD";
        case "£":
          return "GBP";
        case "¥":
          return "CNY";
        case "€":
        default:
          return "EUR";
      }
    }
    case "number": {
      const findNumber = /((\.|,)?\d{1,3})+((\.|,)\d+)?/.exec(value);
      if (findNumber && findNumber[0]) {
        value = findNumber[0].replace(/(\.|,)(\d{3})/g, "$2");
      } else {
        return null;
      }
      const number = parseFloat(value.replace(",", "."));
      return number;
    }
    case "trim-string":
      return `${value || ""}`.trim();
    case "string":
      return `${value || ""}`;
    case "lower":
      return `${value}`.toLowerCase();
    case "upper":
      return `${value}`.toUpperCase();
    default:
      return null;
  }
}
function format(ast, fmt) {
  return (value) => {
    return {
      value: innerFormat(value, fmt)
    };
  };
}
function replace(ast, regex2, format2) {
  return (el) => {
    return {
      value: el.replace(regex2, format2)
    };
  };
}
function regex(ast, reg) {
  return (el) => {
    const match = reg.exec(el);
    if (match && match.groups && match.groups.target) {
      return {
        value: match.groups.target
      };
    } else {
      return {
        value: null
      };
    }
  };
}
function pick(ast, path) {
  return (el) => {
    return {
      value: get(el, path)
    };
  };
}
function flat(ast, levels = Infinity) {
  return (el) => {
    return {
      value: el.flat(levels)
    };
  };
}
const stringRegex = /^('|")(.+)('|")$/;
const numberRegex = /^(([0-9])+(.[0-9]+)?)$/;
function constant(value) {
  const arg = value.args[0].value;
  return (el) => {
    const ret = (() => {
      logger.debug("constant in", { arg });
      const stringMatch = stringRegex.exec(arg);
      if (stringMatch) {
        return arg.substring(1, arg.length - 1);
      }
      const match = numberRegex.exec(arg);
      if (match) {
        if (match[2]) {
          return parseFloat(arg);
        } else {
          return parseInt(arg);
        }
      }
      const vLower = arg.toLowerCase();
      switch (vLower) {
        case "nan":
          return NaN;
        case "null":
        case "none":
          return null;
        case "undefined":
          return void 0;
        case "true":
        case "yes":
        case "on":
          return true;
        case "false":
        case "no":
        case "off":
          return false;
        default:
          throw new Error(`Unparseable constant: ${arg}`);
      }
    })();
    logger.debug("constant out", { arg, ret });
    return { value: ret };
  };
}
const PROCESSORS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  concat,
  constant,
  firstContaining,
  flat,
  format,
  global,
  json_parse,
  json_string,
  parse,
  pick,
  regex,
  replace,
  selector,
  selectorAll,
  split
}, Symbol.toStringTag, { value: "Module" }));
const execute = createExecutor(PROCESSORS);
const defaultRunOptions = {
  stackErrors: false,
  debug: false,
  initialValue: null
};
function runQuery(query, opts = defaultRunOptions) {
  try {
    opts = { ...defaultRunOptions, ...opts };
    const result = parser.run(query);
    if (result.isError) {
      console.error(result);
      return {
        error: true,
        kind: "ExecutionError",
        message: `Parse: ${result.error}`,
        stackedErrors: []
      };
    } else {
      if (opts.debug) {
        logger$1.log("Executing: ", { result: result?.result });
      }
      const exResult = execute(result?.result, opts.initialValue);
      if (exResult) {
        return exResult;
      } else {
        return {
          error: true,
          kind: "ExecutionError",
          message: `NoOutputValue`,
          stackedErrors: []
        };
      }
    }
  } catch (error) {
    if (opts.debug) {
      console.error("parser error", error.message);
    }
    return {
      error: true,
      kind: "ExecutionError",
      message: `Unknown: ${error}`,
      stackedErrors: []
    };
  }
}
function runCascadeQuery(cascadeQuery, opts = defaultRunOptions) {
  opts = { ...defaultRunOptions, ...opts };
  const stackedErrors = [];
  for (const query of cascadeQuery) {
    const result = runQuery(query, opts);
    if (result?.error) {
      if (opts.stackErrors)
        stackedErrors.push({
          error: true,
          kind: "ExecutionError",
          message: `Cascading down to next execution due to error`,
          stackedErrors: [result]
        });
      continue;
    }
    if (result?.value === null) {
      if (opts.stackErrors)
        stackedErrors.push({
          error: true,
          kind: "ExecutionError",
          message: `Cascading down to next execution due to null value`,
          stackedErrors: []
        });
      continue;
    }
    return opts.stackErrors ? { ...result, stackedErrors } : result;
  }
  return {
    error: true,
    kind: "ExecutionError",
    message: `Cascade resolves to null`,
    stackedErrors
  };
}
function runParallel(runner) {
  return (queryObject, opts = defaultRunOptions) => {
    opts = { ...defaultRunOptions, ...opts };
    const resultObject = {};
    for (const key in queryObject) {
      let scrapResult = runner(queryObject[key], opts);
      resultObject[key] = scrapResult.error ? null : scrapResult.value;
    }
    return resultObject;
  };
}
const runCascadeQueries = runParallel(runCascadeQuery);
function scrap(config) {
  if (!config.baseSelect) {
    return runCascadeQueries(config.dataScrap, {
      stackErrors: config.stackErrors,
      debug: config.debug
    });
  }
  const base = runCascadeQuery(config.baseSelect, {
    stackErrors: config.stackErrors,
    debug: config.debug
  });
  if (config.debug)
    ;
  if (base.error)
    return base;
  if (Array.isArray(base.value)) {
    const list2 = base.value;
    const acc = [];
    for (const el of list2) {
      if (!(el instanceof HTMLElement)) {
        if (config.stackErrors)
          ;
        continue;
      }
      acc.push(
        runCascadeQueries(config.dataScrap, {
          stackErrors: config.stackErrors,
          debug: config.debug,
          initialValue: el
        })
      );
    }
    return acc;
  }
  return runCascadeQueries(config.dataScrap, {
    initialValue: base.value
  });
}
function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function throttle(callback, waitMs) {
  let timerId = null;
  let lastArgs;
  return (...args) => {
    lastArgs = args;
    if (timerId)
      return;
    timerId = setTimeout(() => {
      callback(...lastArgs);
      timerId = null;
    }, waitMs);
  };
}
function createObserveChangesCallback(changeDetected, throttlingMs = 0) {
  const throttledFn = throttle(changeDetected, throttlingMs);
  return function observeChangesCallback(mutationsList, observer) {
    throttledFn(mutationsList);
  };
}
function createMutationObserver(defaultSelector, defaultCallback, throttleTimeMs = 1e3) {
  let isObserving = false;
  let selector2 = defaultSelector;
  let callback = defaultCallback;
  let config = {
    childList: true,
    subtree: true,
    attributes: true
  };
  const observer = new MutationObserver(
    createObserveChangesCallback((m2) => {
      callback(m2);
    }, throttleTimeMs)
  );
  const ob = {
    observe() {
      document.querySelectorAll(selector2).forEach((node) => observer.observe(node, config));
      isObserving = true;
    },
    changeConfig(newConfig) {
      config = newConfig;
      this.resetObservation();
    },
    changeSelector(newSelector) {
      selector2 = newSelector;
      this.resetObservation();
    },
    changeCallback(newCallback) {
      callback = newCallback;
      this.resetObservation();
    },
    disconnect() {
      observer.disconnect();
      isObserving = false;
    },
    resetObservation() {
      observer.disconnect();
      if (isObserving) {
        this.observe();
      }
    }
  };
  return ob;
}
var ExtensionScrappingWorkingMode = /* @__PURE__ */ ((ExtensionScrappingWorkingMode2) => {
  ExtensionScrappingWorkingMode2["default"] = "default";
  ExtensionScrappingWorkingMode2["onlyId"] = "onlyId";
  ExtensionScrappingWorkingMode2["disabled"] = "disabled";
  return ExtensionScrappingWorkingMode2;
})(ExtensionScrappingWorkingMode || {});
function addExtensionUTMParamsToLink(urlStr, source) {
  let url = urlStr;
  url = updateURLParameter(url, "utm_medium", "extension");
  url = updateURLParameter(url, "utm_source", source);
  url = updateURLParameter(url, "utm_campaign", formatUTMDate(new Date()));
  return url;
}
function formatUTMDate(date) {
  const y2 = date.getFullYear().toString();
  const m2 = (date.getMonth() + 1).toString();
  const d2 = date.getDate().toString();
  const formattedDate = `${y2}-${m2.padStart(2, "0")}-${d2.padStart(2, "0")}`;
  return formattedDate;
}
function updateURLParameter(url, param, paramVal) {
  var newAdditionalURL = "";
  var tempArray = url.split("?");
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  var temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (var i2 = 0; i2 < tempArray.length; i2++) {
      if (tempArray[i2].split("=")[0] != param) {
        newAdditionalURL += temp + tempArray[i2];
        temp = "&";
      }
    }
  }
  var rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}
const initialState$3 = {
  offer: null
};
const postedOfferSlice = createSlice({
  name: "offer",
  initialState: initialState$3,
  reducers: {
    setPostedOffer(state, action) {
      if (action.payload) {
        action.payload.url = addExtensionUTMParamsToLink(
          action.payload?.url,
          "extension_ofertapublicada"
        );
      }
      state.offer = action.payload;
    }
  }
});
const postedOfferReducer = postedOfferSlice.reducer;
const { setPostedOffer } = postedOfferSlice.actions;
const initialState$2 = {
  shop: "",
  vouchers: [],
  codeUnlocked: false
};
const voucherSlice = createSlice({
  name: "voucher",
  initialState: initialState$2,
  reducers: {
    setVoucher: (state, action) => {
      action.payload.vouchers.forEach((v2) => {
        if (v2.url)
          v2.url = addExtensionUTMParamsToLink(v2.url, "extension_cupones");
      });
      return action.payload;
    },
    setUnLock(state, action) {
      state.codeUnlocked = action.payload;
    }
  }
});
const Reducer = voucherSlice.reducer;
const { setVoucher, setUnLock } = voucherSlice.actions;
function calculateStats(state) {
  if (!state.product || !state.history.length)
    return;
  state.stats.meanPrice = getMean(
    state.product,
    {
      count: 3,
      value: "months"
    },
    state.history
  );
  state.stats.price = state.history[state.history.length - 1].price;
  state.stats.maxPrice = Math.max(...state.history.map((v2) => v2.price));
  state.stats.minPrice = Math.min(...state.history.map((v2) => v2.price));
}
const getMeanCache = {};
function getMean(product, interval, priceHistory) {
  let cacheId = `${product.id}${product.shop}${product.price}${priceHistory ? priceHistory[0] && priceHistory[0].time : "null"}`;
  if (priceHistory.length === 0) {
    return product.price;
  } else if (cacheId in getMeanCache) {
    return getMeanCache[cacheId];
  }
  let price = product.price;
  let startRange = hooks().add(-Math.abs(interval.count), interval.value).valueOf();
  let endRange = hooks().valueOf();
  let acc = 0, totalSpan = 0;
  let history = [
    ...priceHistory,
    {
      price: price !== null ? price : priceHistory[priceHistory.length - 1].price,
      time: hooks().valueOf()
    }
  ];
  for (
    let i2 = history.findIndex((v2) => v2.time > startRange), curr = history[i2] || { ...history[i2 - 1] }, prev = { ...history[i2 - 1] || history[i2], time: startRange };
    // condition
    i2 <= history.length;
    // loop
    i2++, curr = history[i2] || { ...history[i2 - 1], time: endRange }, prev = history[i2 - 1]
  ) {
    let timeSpan = curr.time - prev.time;
    let spanMean = timeSpan * prev.price;
    acc += spanMean;
    totalSpan += timeSpan;
  }
  const result = parseFloat((acc / totalSpan).toFixed(2));
  getMeanCache[cacheId] = result;
  return result;
}
const initialState$1 = {
  history: [],
  stats: {
    maxPrice: 0,
    meanPrice: 0,
    minPrice: 0,
    price: 0
  },
  product: null
};
const priceSlice = createSlice({
  name: "price",
  initialState: initialState$1,
  reducers: {
    setProduct(state, action) {
      if (!action.payload)
        return;
      state.product = action.payload;
      state.stats.price = action.payload.price;
    },
    setStats(state, action) {
      if (!action.payload)
        return;
      state.stats.price = action.payload.price;
      calculateStats(state);
    },
    setHistory(state, action) {
      if (!action.payload)
        return;
      state.history = action.payload;
      calculateStats(state);
    }
  }
});
const ProductStatsReducer = priceSlice.reducer;
const { setProduct, setStats, setHistory } = priceSlice.actions;
const methods$1 = {
  async metricView(metricsData) {
    this.metric({
      body: {
        name: metricsData.name,
        data: metricsData.data
      },
      method: "POST"
    });
  }
};
const metricViews = createAPI({
  name: "metrics:views",
  endpoint: "metric/",
  methods: methods$1,
  read: () => {
  }
});
const priceTrackAPI = createAPI({
  name: "price-track",
  endpoint: "price-track/",
  default: () => [],
  async read() {
    return this.fetch("").then((v2) => v2.json()).then((v2) => v2?.data || []).then((v2) => {
      return v2.map(
        (i2) => typeof i2.createdAt === "string" ? { ...i2, createdAt: new Date(`${i2.createdAt}Z`).valueOf() } : i2
      );
    });
  },
  methods: {
    async create(element) {
      return this.fetch("", {
        method: "POST",
        body: JSON.stringify(element)
      }).then((v2) => v2.json());
    },
    async remove(element) {
      return this.fetch("", {
        method: "DELETE",
        body: JSON.stringify(element)
      }).then((v2) => v2.json());
    },
    async update(element) {
      return this.fetch("", {
        method: "PATCH",
        body: JSON.stringify(element)
      }).then((v2) => v2.json());
    }
  }
});
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  priceTrackAPI
}, Symbol.toStringTag, { value: "Module" }));
const priceTrackNotificationsAPI = createAPI({
  name: "price-track-notifications",
  endpoint: "price-track/notifications/",
  default: () => [],
  async read() {
    return this.fetch("").then((v2) => {
      return v2.json();
    }).then((v2) => {
      const notifications = v2.data.map((ptnot) => {
        ptnot.product.id = ptnot.product["productInfoId"];
        return ptnot;
      });
      return notifications;
    });
  },
  methods: {
    async remove(priceTrackNotificationId) {
      return this.fetch(`${priceTrackNotificationId}/delete`, {
        method: "DELETE"
      }).then((v2) => v2.json());
    },
    async markAll() {
      return this.fetch("all/read", { method: "POST" }).then((v2) => v2.json()).then(() => {
        browser.browserAction.setBadgeText({ text: "" });
      });
    }
  }
});
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  priceTrackNotificationsAPI
}, Symbol.toStringTag, { value: "Module" }));
var NotificationStatus = /* @__PURE__ */ ((NotificationStatus2) => {
  NotificationStatus2[NotificationStatus2["PendingEmail"] = 0] = "PendingEmail";
  NotificationStatus2[NotificationStatus2["Notified"] = 1] = "Notified";
  NotificationStatus2[NotificationStatus2["Read"] = 2] = "Read";
  return NotificationStatus2;
})(NotificationStatus || {});
/* @__PURE__ */ new Set([
  NotificationStatus.Notified,
  NotificationStatus.PendingEmail
]);
function* disableMarkerSaga() {
  try {
    yield call(priceTrackNotificationsAPI.methods.markAll);
  } catch (e) {
    logger$1.warn(`Error apt notifications api: ${e.message}`);
  }
}
const DISABLE_MARKER = "DISABLE_MARKER";
function disableMarker() {
  return {
    type: DISABLE_MARKER
  };
}
const ns = "background-link/";
const FETCH_PRODUCT_STATS_RESULT = `${ns}fetch-product-stats-result`;
const SCRAP_CONFIG_MATCH = `${ns}scrap-config-match`;
const SCRAPPED_DATA = `${ns}scrapped-data`;
const Q_SIMPLE_LOGIN = `${ns}query-simple-login`;
const A_SIMPLE_LOGIN = `${ns}answer-simple-login`;
const UNLOCK_VOUCHER = `${ns}unlock-voucher`;
const LOGOUT = `${ns}logout`;
const RELOAD_EXTENSION = `${ns}reload-extension`;
const RELEASED_OFFER = `${ns}released-offer`;
const CREATE_TAB = `${ns}-create-tab`;
function createTab(pageName) {
  return {
    type: CREATE_TAB,
    payload: getExtensionPage(pageName)
  };
}
function logOut() {
  return {
    type: LOGOUT
  };
}
function fetchProductStatsResult(p2) {
  return {
    type: FETCH_PRODUCT_STATS_RESULT,
    payload: p2
  };
}
function scrapConfigMatch(p2) {
  return {
    type: SCRAP_CONFIG_MATCH,
    payload: p2
  };
}
function scrappedData(p2) {
  return {
    type: SCRAPPED_DATA,
    payload: p2
  };
}
function releasedOffert(p2) {
  return {
    type: RELEASED_OFFER,
    payload: p2
  };
}
function querySimpleLogin(p2) {
  return {
    type: Q_SIMPLE_LOGIN,
    payload: p2
  };
}
function answerSimpleLogin(loginStatus) {
  return {
    type: A_SIMPLE_LOGIN,
    payload: loginStatus
  };
}
function unlockVoucherActionCreator(payload) {
  return {
    type: UNLOCK_VOUCHER,
    payload
  };
}
function* receiveProductStatsSaga({ type, payload }) {
  try {
    switch (type) {
      case FETCH_PRODUCT_STATS_RESULT:
        yield put(setProduct(payload.product));
        yield put(setHistory(payload.priceHistory));
        break;
    }
  } catch (e) {
  }
}
function* releasedOffertSaga({ type, payload }) {
  yield put(setPostedOffer(payload));
}
function* querySimpleLoginSaga(a2) {
  yield put(setLogInLoader(true));
  yield call(browser.runtime.sendMessage, a2);
}
function* answerSimpleLoginSaga({ payload }) {
  const localUserKey = "loginStatus";
  yield put(setLoginStatus(payload));
  yield put(setLogInLoader(false));
  setLS(localUserKey, payload);
}
function* logOutSaga(action) {
  yield call(browser.runtime.sendMessage, action);
}
let lastScrappedObject = null;
function* runScrapperSaga({ payload }) {
  const config = {
    dataScrap: payload.scrapperConfig
  };
  try {
    let scrappedObject = yield call(urlImgValidatorLoop, config);
    if (lastScrappedObject) {
      let foundInequality = false;
      for (const key of Object.keys(scrappedObject)) {
        if (lastScrappedObject[key] !== scrappedObject[key]) {
          foundInequality = true;
          break;
        }
      }
      if (!foundInequality) {
        logger$1.info("Skipped scrappedObject");
        return;
      }
    }
    lastScrappedObject = scrappedObject;
    const message = scrappedData({
      data: { ...scrappedObject, shop: payload.shop },
      url: location.href,
      config: payload
    });
    yield call(browser.runtime.sendMessage, message);
    metricViews.methods.metricView({ name: "ext-event-load" });
  } catch (e) {
    yield put(setRenderStatus(shouldLoadUI(payload)));
  }
}
const scrapConfigMatchChannel = channel2();
const scrapConfigObserver = !browser.runtime ? createMutationObserver("body", () => {
}) : null;
scrapConfigObserver?.observe();
function* scrapConfigMatchSaga(action) {
  lastScrappedObject = null;
  scrapConfigObserver?.changeCallback((m2) => {
    scrapConfigMatchChannel.put(action);
  });
  scrapConfigMatchChannel.put(action);
}
function* unlockVoucherSaga({ payload }) {
  yield call(browser.runtime.sendMessage, unlockVoucherActionCreator(payload));
  yield put(setUnLock(true));
}
function* watchBackgroundSaga() {
  yield all([
    //takeEvery(START_APP, startAppSaga),
    takeEvery$1(FETCH_PRODUCT_STATS_RESULT, receiveProductStatsSaga),
    takeEvery$1(SCRAP_CONFIG_MATCH, scrapConfigMatchSaga),
    takeEvery$1(scrapConfigMatchChannel, runScrapperSaga),
    takeEvery$1(UNLOCK_VOUCHER, unlockVoucherSaga),
    takeEvery$1(RELEASED_OFFER, releasedOffertSaga),
    takeEvery$1(DISABLE_MARKER, disableMarkerSaga)
  ]);
}
function isValidUrlImg(product) {
  if (typeof product?.imageUrl === "string")
    return product.imageUrl.startsWith("data:");
  return false;
}
async function urlImgValidatorLoop(scrapConfig, { attemptsNumber, attemptDuration, maxCheckDuration } = {
  attemptsNumber: 3,
  attemptDuration: 350,
  maxCheckDuration: 2e3
}) {
  let scrappProductData = scrap(scrapConfig);
  let attemptIterationCount = 0;
  while (attemptIterationCount < attemptsNumber && attemptDuration * attemptIterationCount < maxCheckDuration) {
    if (isValidUrlImg(scrappProductData)) {
      return scrappProductData;
    } else {
      await awaitAction(attemptDuration);
      scrappProductData = scrap(scrapConfig);
    }
    attemptIterationCount += 1;
  }
  return scrappProductData;
}
function awaitAction(timeout) {
  return new Promise((resolve) => {
    return setTimeout(resolve, timeout);
  });
}
function shouldLoadUI(config, scrappedObject) {
  switch (config?.workingMode) {
    case ExtensionScrappingWorkingMode.onlyId:
      return true;
    case ExtensionScrappingWorkingMode.disabled:
      return false;
    default:
      return true;
  }
}
const initialState = {
  viewScrapped: false,
  scrappedObject: {},
  shopScrappingDetails: {},
  isLocalConfig: false
};
const debugSlice = createSlice({
  name: "debug",
  initialState,
  reducers: {
    setViewScrapped(state, { payload }) {
      state.viewScrapped = payload;
    },
    setScrapperConfig(state, { payload }) {
      state.shopScrappingDetails = payload;
    },
    setAddNewScrapConf(state, { payload }) {
      state.shopScrappingDetails.scrapperConfig[payload.scrapKey].push(
        payload.scrapConf
      );
    },
    setRemoveConf(state, { payload }) {
      state.shopScrappingDetails.scrapperConfig[payload.scrapKey].splice(
        payload.confIndex,
        1
      );
    },
    setUpdateConf(state, { payload }) {
      state.shopScrappingDetails.scrapperConfig[payload.scrapKey][payload.scrapConfIndex] = payload.scrapConf;
    },
    setIsLocalConfig(state, { payload }) {
      state.isLocalConfig = payload;
    }
  }
});
const debugReducer = debugSlice.reducer;
const methods = {
  async metricAlerts(metricsData) {
    this.metric({
      body: {
        name: metricsData.name,
        data: metricsData.data
      },
      method: "POST"
    });
  }
};
const metricAlertsApi = createAPI({
  name: "metrics:alerts",
  endpoint: "metric/",
  methods,
  read: () => {
  }
});
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  metricAlertsApi
}, Symbol.toStringTag, { value: "Module" }));
export {
  CREATE_TAB as $,
  A_SIMPLE_LOGIN as A,
  account as B,
  postedOfferReducer as C,
  closeView as D,
  priceTrackAPI as E,
  metricAlertsApi as F,
  priceTrackNotificationsAPI as G,
  disableMarker as H,
  metricPepper as I,
  lastScrappedObject as J,
  openView as K,
  LOGOUT as L,
  toggleMenu as M,
  NotificationStatus as N,
  metricViews as O,
  ProductStatsReducer as P,
  Q_SIMPLE_LOGIN as Q,
  Reducer as R,
  createMutationObserver as S,
  __vite_glob_0_1 as T,
  __vite_glob_0_3 as U,
  __vite_glob_0_5 as V,
  __vite_glob_0_12 as W,
  __vite_glob_0_13 as X,
  answerSimpleLogin as Y,
  RELOAD_EXTENSION as Z,
  __vite_glob_0_0 as _,
  settingsAPIHandler as a,
  ExtensionScrappingWorkingMode as a0,
  setIsShopMatch as a1,
  startAppLoading as a2,
  fetchProductStatsResult as a3,
  releasedOffert as a4,
  SCRAPPED_DATA as a5,
  shouldLoadUI as a6,
  scrapConfigMatch as a7,
  createTab as b,
  configAPIHandler as c,
  answerSimpleLoginSaga as d,
  logOutSaga as e,
  all as f,
  call as g,
  hooks as h,
  setMenuOpen as i,
  isBrowserActionPage as j,
  querySimpleLogin as k,
  logOut as l,
  createSlice as m,
  addExtensionUTMParamsToLink as n,
  sagaMiddlewareFactory as o,
  put as p,
  querySimpleLoginSaga as q,
  combineReducers as r,
  setLoginStatus as s,
  takeEvery$1 as t,
  createStore as u,
  compose as v,
  watchBackgroundSaga as w,
  applyMiddleware as x,
  debugReducer as y,
  appReducer as z
};
