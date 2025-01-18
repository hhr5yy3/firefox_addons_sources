!function(Vue) {
 "use strict";
 Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, "default") ? Vue.default : Vue;
 var allPrecompiledLocales = {
  ar: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "لتشغيل VPN، ما عليك سوى النقر فوق رمز " + d.image + " الخاص بنا.";
   }
  },
  be: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Каб уключыць VPN, проста націсніце значок " + d.image + ".";
   }
  },
  bg: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "За да включите своята VPN, просто щракнете върху иконата " + d.image + ".";
   }
  },
  bn: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "আপনার VPN চালু করতে, শুধুমাত্র আমাদের " + d.image + " আইকনে ক্লিক করুন।";
   }
  },
  ca: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Per activar la VPN, només heu de fer clic a la nostra icona " + d.image + ".";
   }
  },
  cs: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "VPN zapnete pouhým kliknutím na ikonu " + d.image + ".";
   }
  },
  da: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Aktivér din VPN ved at klikke på vores " + d.image + "-ikon.";
   }
  },
  de: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Klicken Sie einfach auf das Symbol " + d.image + ", um Ihr VPN einzuschalten.";
   }
  },
  el: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Για να ενεργοποιήσετε το VPN, κάντε κλικ στο εικονίδιο " + d.image + ".";
   }
  },
  en: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "To turn on your VPN, just click our " + d.image + " icon.";
   }
  },
  es: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Para activar su VPN, haga clic en nuestro icono " + d.image + ".";
   }
  },
  et: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Oma VPNi sisse lülitamiseks lihtsalt klõpsa meie ikoonile " + d.image + ".";
   }
  },
  fa: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "برای روشن کردن VNP‌ خود، کافی است روی آیکن " + d.image + " کلیک کنید.";
   }
  },
  fi: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Ota VPN käyttöön klikkaamalla " + d.image + "-kuvaketta.";
   }
  },
  fr: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Pour activer le VPN, cliquez sur l'icône " + d.image + ".";
   }
  },
  he: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "כדי להפעיל את ה-VPN, לחץ על האייקון " + d.image + ".";
   }
  },
  hi: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "अपने VPN को चालू करने हेतु, बस हमारे " + d.image + " आइकन पर क्लिक करें.";
   }
  },
  hr: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Da biste uključili VPN, samo kliknite našu ikonu " + d.image + ".";
   }
  },
  hu: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "A VPN bekapcsolásához csak kattintson az " + d.image + " ikonra.";
   }
  },
  id: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Untuk menyalakan VPN Anda, cukup klik ikon " + d.image + " kami.";
   }
  },
  it: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Per attivare la VPN, fai clic sull'icona " + d.image + ".";
   }
  },
  ja: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return d.image + " アイコンをクリックするだけで、VPN を有効にできます。";
   }
  },
  ko: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "VPN을 켜려면 " + d.image + " 아이콘을 클릭하십시오.";
   }
  },
  lt: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Norint įsijungti savo VPN, tiesiog paspauskite simbolį " + d.image + ".";
   }
  },
  lv: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Ieslēdziet savu VPN, vienkārši noklikšķinot uz mūsu " + d.image + " ikonas.";
   }
  },
  ms: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Untuk menghidupkan VPN anda, klik sahaja pada ikon " + d.image + " kami.";
   }
  },
  nb: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Bare klikk på ikonet " + d.image + " for å slå på VPN.";
   }
  },
  nl: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Klik op het pictogram " + d.image + " om het VPN in te schakelen.";
   }
  },
  pl: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Aby włączyć VPN, kliknij ikonę " + d.image + ".";
   }
  },
  pt_BR: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Para ligar a VPN, clique no ícone " + d.image + ".";
   }
  },
  pt_PT: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Para ligar a VPN, clique no ícone " + d.image + ".";
   }
  },
  ro: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Pentru activarea rețelei VPN, faceți clic pe pictograma noastră " + d.image + ".";
   }
  },
  ru: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Чтобы включить VPN, просто нажмите значок " + d.image + ".";
   }
  },
  sk: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Ak chcete zapnúť VPN, stačí kliknúť na ikonu " + d.image + ".";
   }
  },
  sl: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Če želite vklopiti VPN, preprosto kliknite našo ikono " + d.image + ".";
   }
  },
  sr: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Da biste uključili VPN, samo kliknite na ikonu " + d.image + ".";
   }
  },
  sv: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Aktivera ditt VPN genom att klicka på vår " + d.image + "-ikon.";
   }
  },
  th: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "หากต้องการเปิด VPN ให้คลิกที่ไอคอน " + d.image + " ของเรา";
   }
  },
  tr: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "VPN'inizi açmak için " + d.image + " simgemize tıklamanız yeterlidir.";
   }
  },
  uk: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Щоб увімкнути VPN, просто натисніть піктограму " + d.image + ".";
   }
  },
  ur: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "اپنے VPN آن کرنے کے لئے، صرف ہمارے " + d.image + " آئیکن کو کلک کریں۔";
   }
  },
  vi: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "Để bật VPN, bạn chỉ cần nhấp vào biểu tượng " + d.image + ".";
   }
  },
  zh_CN: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "单击 " + d.image + " 图标即可打开 VPN。";
   }
  },
  zh_TW: {
   turn_turn_on_your_vpn_just_click_our_icon: function(d) {
    return "若要打開 VPN，只要按一下 " + d.image + " 圖示即可。";
   }
  }
 };
 let ShortcutKeyModifier, SafePage, TextDirection;
 !function(ShortcutKeyModifier) {
  ShortcutKeyModifier.None = "none", ShortcutKeyModifier.Alt = "alt", ShortcutKeyModifier.Meta = "meta", 
  ShortcutKeyModifier.Ctrl = "ctrl", ShortcutKeyModifier.Shift = "shift";
 }(ShortcutKeyModifier || (ShortcutKeyModifier = {})), function(SafePage) {
  SafePage.Blank = "blank", SafePage.NewTab = "newTab";
 }(SafePage || (SafePage = {})), function(TextDirection) {
  TextDirection.Ltr = "ltr", TextDirection.Rtl = "rtl";
 }(TextDirection || (TextDirection = {}));
 const rtlLanguages = [ "ar", "dv", "fa", "ha", "he", "ks", "ku", "ps", "ur", "yi" ];
 let languageCode, precompiledLocale = {};
 function getMessage(messageName, messageFormatParams) {
  return precompiledLocale[messageName] ? precompiledLocale[messageName](messageFormatParams || {}) : chrome.i18n.getMessage(messageName);
 }
 function getLanguage() {
  return (languageCode || chrome.i18n.getUILanguage()).split("_")[0];
 }
 languageCode = getMessage("language_code").replace("-", "_"), languageCode && allPrecompiledLocales && allPrecompiledLocales[languageCode] && (precompiledLocale = allPrecompiledLocales[languageCode]);
 var s = 1e3, m = 6e4, h = 60 * m, d = 24 * h, ms = function(val, options) {
  options = options || {};
  var type = typeof val;
  if ("string" === type && val.length > 0) return function(str) {
   if ((str = String(str)).length > 100) return;
   var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
   if (!match) return;
   var n = parseFloat(match[1]);
   switch ((match[2] || "ms").toLowerCase()) {
   case "years":
   case "year":
   case "yrs":
   case "yr":
   case "y":
    return 315576e5 * n;

   case "weeks":
   case "week":
   case "w":
    return 6048e5 * n;

   case "days":
   case "day":
   case "d":
    return n * d;

   case "hours":
   case "hour":
   case "hrs":
   case "hr":
   case "h":
    return n * h;

   case "minutes":
   case "minute":
   case "mins":
   case "min":
   case "m":
    return n * m;

   case "seconds":
   case "second":
   case "secs":
   case "sec":
   case "s":
    return n * s;

   case "milliseconds":
   case "millisecond":
   case "msecs":
   case "msec":
   case "ms":
    return n;

   default:
    return;
   }
  }(val);
  if ("number" === type && isFinite(val)) return options.long ? function(ms) {
   var msAbs = Math.abs(ms);
   if (msAbs >= d) return plural(ms, msAbs, d, "day");
   if (msAbs >= h) return plural(ms, msAbs, h, "hour");
   if (msAbs >= m) return plural(ms, msAbs, m, "minute");
   if (msAbs >= s) return plural(ms, msAbs, s, "second");
   return ms + " ms";
  }(val) : function(ms) {
   var msAbs = Math.abs(ms);
   if (msAbs >= d) return Math.round(ms / d) + "d";
   if (msAbs >= h) return Math.round(ms / h) + "h";
   if (msAbs >= m) return Math.round(ms / m) + "m";
   if (msAbs >= s) return Math.round(ms / s) + "s";
   return ms + "ms";
  }(val);
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
 };
 function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= 1.5 * n;
  return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
 }
 var common = function(env) {
  function selectColor(namespace) {
   let hash = 0;
   for (let i = 0; i < namespace.length; i++) hash = (hash << 5) - hash + namespace.charCodeAt(i), 
   hash |= 0;
   return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  function createDebug(namespace) {
   let prevTime;
   function debug(...args) {
    if (!debug.enabled) return;
    const self = debug, curr = Number(new Date), ms = curr - (prevTime || curr);
    self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr, args[0] = createDebug.coerce(args[0]), 
    "string" != typeof args[0] && args.unshift("%O");
    let index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
     if ("%%" === match) return match;
     index++;
     const formatter = createDebug.formatters[format];
     if ("function" == typeof formatter) {
      const val = args[index];
      match = formatter.call(self, val), args.splice(index, 1), index--;
     }
     return match;
    }), createDebug.formatArgs.call(self, args), (self.log || createDebug.log).apply(self, args);
   }
   return debug.namespace = namespace, debug.enabled = createDebug.enabled(namespace), 
   debug.useColors = createDebug.useColors(), debug.color = selectColor(namespace), 
   debug.destroy = destroy, debug.extend = extend, "function" == typeof createDebug.init && createDebug.init(debug), 
   createDebug.instances.push(debug), debug;
  }
  function destroy() {
   const index = createDebug.instances.indexOf(this);
   return -1 !== index && (createDebug.instances.splice(index, 1), !0);
  }
  function extend(namespace, delimiter) {
   const newDebug = createDebug(this.namespace + (void 0 === delimiter ? ":" : delimiter) + namespace);
   return newDebug.log = this.log, newDebug;
  }
  function toNamespace(regexp) {
   return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  return createDebug.debug = createDebug, createDebug.default = createDebug, createDebug.coerce = function(val) {
   if (val instanceof Error) return val.stack || val.message;
   return val;
  }, createDebug.disable = function() {
   const namespaces = [ ...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => "-" + namespace) ].join(",");
   return createDebug.enable(""), namespaces;
  }, createDebug.enable = function(namespaces) {
   let i;
   createDebug.save(namespaces), createDebug.names = [], createDebug.skips = [];
   const split = ("string" == typeof namespaces ? namespaces : "").split(/[\s,]+/), len = split.length;
   for (i = 0; i < len; i++) split[i] && ("-" === (namespaces = split[i].replace(/\*/g, ".*?"))[0] ? createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$")) : createDebug.names.push(new RegExp("^" + namespaces + "$")));
   for (i = 0; i < createDebug.instances.length; i++) {
    const instance = createDebug.instances[i];
    instance.enabled = createDebug.enabled(instance.namespace);
   }
  }, createDebug.enabled = function(name) {
   if ("*" === name[name.length - 1]) return !0;
   let i, len;
   for (i = 0, len = createDebug.skips.length; i < len; i++) if (createDebug.skips[i].test(name)) return !1;
   for (i = 0, len = createDebug.names.length; i < len; i++) if (createDebug.names[i].test(name)) return !0;
   return !1;
  }, createDebug.humanize = ms, Object.keys(env).forEach(key => {
   createDebug[key] = env[key];
  }), createDebug.instances = [], createDebug.names = [], createDebug.skips = [], 
  createDebug.formatters = {}, createDebug.selectColor = selectColor, createDebug.enable(createDebug.load()), 
  createDebug;
 }, browser$1 = function(fn, module) {
  return fn(module = {
   exports: {}
  }, module.exports), module.exports;
 }((function(module, exports) {
  exports.log = function(...args) {
   return "object" == typeof console && console.log && console.log(...args);
  }, exports.formatArgs = function(args) {
   if (args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), 
   !this.useColors) return;
   const c = "color: " + this.color;
   args.splice(1, 0, c, "color: inherit");
   let index = 0, lastC = 0;
   args[0].replace(/%[a-zA-Z%]/g, match => {
    "%%" !== match && (index++, "%c" === match && (lastC = index));
   }), args.splice(lastC, 0, c);
  }, exports.save = function(namespaces) {
   try {
    namespaces ? exports.storage.setItem("debug", namespaces) : exports.storage.removeItem("debug");
   } catch (error) {}
  }, exports.load = function() {
   let r;
   try {
    r = exports.storage.getItem("debug");
   } catch (error) {}
   !r && "undefined" != typeof process && "env" in process && (r = process.env.DEBUG);
   return r;
  }, exports.useColors = function() {
   if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
   if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
   return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }, exports.storage = function() {
   try {
    return localStorage;
   } catch (error) {}
  }(), exports.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
  module.exports = common(exports);
  const {formatters: formatters} = module.exports;
  formatters.j = function(v) {
   try {
    return JSON.stringify(v);
   } catch (error) {
    return "[UnexpectedJSONParseError]: " + error.message;
   }
  };
 }));
 browser$1.log, browser$1.formatArgs, browser$1.save, browser$1.load, browser$1.useColors, 
 browser$1.storage, browser$1.colors;
 function _defineProperty(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
   value: value,
   enumerable: !0,
   configurable: !0,
   writable: !0
  }) : obj[key] = value, obj;
 }
 const log = browser$1("browserStorage");
 const log$1 = browser$1("messages");
 function createAction(type, value) {
  return void 0 === value ? {
   type: type
  } : {
   type: type,
   value: value
  };
 }
 let GlobalActionTypes;
 !function(GlobalActionTypes) {
  GlobalActionTypes.Startup = "startup", GlobalActionTypes.GetState = "getState", 
  GlobalActionTypes.StateChange = "stateChange", GlobalActionTypes.Installed = "installed", 
  GlobalActionTypes.Updated = "updated";
 }(GlobalActionTypes || (GlobalActionTypes = {}));
 const globalActions_getState = () => createAction(GlobalActionTypes.GetState);
 "undefined" != typeof chrome && void 0 !== chrome.runtime || (window.chrome = browser);
 const browserStorage = new class {
  constructor() {
   _defineProperty(this, "cache", void 0), _defineProperty(this, "usingStorage", void 0), 
   this.cache = {}, this.usingStorage = !1;
  }
  init(keys) {
   return new Promise(resolve => {
    chrome && chrome.storage || resolve(), this.usingStorage = !0, chrome.storage.local.get(keys || null, items => {
     this.cache = items, resolve();
    });
   });
  }
  get(path) {
   return this.cache[path];
  }
  set(path, value) {
   null == value || void 0 === value ? (this.usingStorage && chrome.storage.local.remove(path, () => {
    chrome.runtime.lastError && log('could not remove key "%s" from browser storage (%O)', path, chrome.runtime.lastError);
   }), delete this.cache[path]) : (this.usingStorage && chrome.storage.local.set({
    [path]: value
   }, () => {
    chrome.runtime.lastError && log('could not set key "%s" in browser storage (%O)', path, chrome.runtime.lastError);
   }), this.cache[path] = value);
  }
 };
 let onStateChange;
 const log$2 = browser$1("index");
 function connectToBackground() {
  var type, callback;
  return type = GlobalActionTypes.StateChange, callback = res => {
   log$2("background state changed: %O", res.state), onStateChange && onStateChange(res.state);
  }, chrome.runtime.onMessage.addListener((function(message, sender, sendResponse) {
   message && message.type && message.value && message.type === type && callback && callback(message.value);
  })), new Promise((function(resolve) {
   !function(action, callback) {
    log$1('sending message to background, action "%s": %O', action.type, action), chrome.runtime.sendMessage(action, (function(response) {
     callback && callback(response), chrome.runtime.lastError && log$1("sendActionToBg for %s generated error", action.type, chrome.runtime.lastError);
    }));
   }(globalActions_getState(), res => {
    log$2("background state: %O", res.state), resolve(res.state);
   });
  }));
 }
 function initVue(bgState, rootComponent, extraOptions) {
  Vue.mixin({
   methods: {
    translate: (messageName, messageFormatParams) => getMessage(messageName, messageFormatParams)
   }
  });
  const app = new Vue({
   components: {
    Root: rootComponent
   },
   data: {
    bgState: bgState,
    hash: location.hash
   },
   el: "#app",
   render(createElement) {
    return createElement(rootComponent, {
     props: {
      bgState: this.bgState,
      hash: this.hash,
      storage: browserStorage
     }
    });
   },
   created() {
    const lang = this.translate("language_code");
    if (lang) {
     const html = document.querySelector("html");
     html.setAttribute("lang", lang), html.setAttribute("dir", rtlLanguages.includes(getLanguage()) ? TextDirection.Rtl : TextDirection.Ltr);
    }
   },
   ...extraOptions
  });
  onStateChange = newBgState => {
   app.bgState = newBgState;
  }, window.addEventListener("hashchange", () => {
   app.hash = location.hash.replace("#", "");
  }, !1);
 }
 const log$3 = browser$1("thankYou");
 var script = {
  props: {
   bgState: Object,
   hash: String,
   storage: Object
  },
  computed: {
   messageWithIcon() {
    return this.translate("turn_turn_on_your_vpn_just_click_our_icon", {
     image: '<img src="/img/icon16.png" srcset="/img/icon16.png, /img/icon32.png 2x" />'
    });
   }
  },
  methods: {
   close() {
    chrome.tabs.query({
     active: !0,
     currentWindow: !0
    }, tabs => {
     chrome.runtime.lastError ? log$3("error while getting tabs", chrome.runtime.lastError) : tabs.forEach(tab => chrome.tabs.remove(tab.id));
    });
   }
  }
 };
 const isOldIE = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
 let HEAD;
 const styles = {};
 const __vue_component__ = function(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  "boolean" != typeof shadowMode && (createInjectorSSR = createInjector, createInjector = shadowMode, 
  shadowMode = !1);
  const options = "function" == typeof script ? script.options : script;
  let hook;
  if (template && template.render && (options.render = template.render, options.staticRenderFns = template.staticRenderFns, 
  options._compiled = !0, isFunctionalTemplate && (options.functional = !0)), scopeId && (options._scopeId = scopeId), 
  moduleIdentifier ? (hook = function(context) {
   (context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (context = __VUE_SSR_CONTEXT__), 
   style && style.call(this, createInjectorSSR(context)), context && context._registeredComponents && context._registeredComponents.add(moduleIdentifier);
  }, options._ssrRegister = hook) : style && (hook = shadowMode ? function(context) {
   style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
  } : function(context) {
   style.call(this, createInjector(context));
  }), hook) if (options.functional) {
   const originalRender = options.render;
   options.render = function(h, context) {
    return hook.call(context), originalRender(h, context);
   };
  } else {
   const existing = options.beforeCreate;
   options.beforeCreate = existing ? [].concat(existing, hook) : [ hook ];
  }
  return script;
 }({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "avs container -thank-you",
    attrs: {
     id: "app"
    }
   }, [ _c("div", {
    staticClass: "thankyou"
   }, [ _c("img", {
    attrs: {
     src: "/img/done.svg",
     width: "40",
     height: "40"
    }
   }), _vm._v(" "), _c("h1", {
    staticClass: "h1 strong g-margin-top--20 g-margin-bottom--20"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("thanks_for_installing_the_avast_secure_line_vpn_extension")) + "\n\t\t") ]), _vm._v(" "), _c("div", {
    staticClass: "text g-margin-bottom--40",
    domProps: {
     innerHTML: _vm._s(_vm.messageWithIcon)
    }
   }), _vm._v(" "), _c("button", {
    staticClass: "btn -secondary g-margin-bottom--60 thankyou__close",
    on: {
     click: _vm.close
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("close")) + "\n\t\t") ]), _vm._v(" "), _c("div", {
    staticClass: "text"
   }, [ _c("span", {
    staticClass: "logo -ameba thankyou__product"
   }), _vm._v(" " + _vm._s(_vm.translate("product_name")) + "\n\t\t") ]) ]) ]);
  },
  staticRenderFns: []
 }, (function(inject) {
  inject && inject("data-v-7232de48_0", {
   source: ".thankyou[data-v-7232de48]{--font-weight-h1:bold;display:flex;align-items:center;justify-content:center;flex-direction:column;height:100vh;max-width:500px;margin:0 auto;text-align:center}.thankyou__close[data-v-7232de48]{min-width:180px}.thankyou__product[data-v-7232de48]{margin-inline-end:8px}",
   map: void 0,
   media: void 0
  });
 }), script, "data-v-7232de48", !1, void 0, !1, (function(context) {
  return (id, style) => function(id, css) {
   const group = isOldIE ? css.media || "default" : id, style = styles[group] || (styles[group] = {
    ids: new Set,
    styles: []
   });
   if (!style.ids.has(id)) {
    style.ids.add(id);
    let code = css.source;
    if (css.map && (code += "\n/*# sourceURL=" + css.map.sources[0] + " */", code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */"), 
    style.element || (style.element = document.createElement("style"), style.element.type = "text/css", 
    css.media && style.element.setAttribute("media", css.media), void 0 === HEAD && (HEAD = document.head || document.getElementsByTagName("head")[0]), 
    HEAD.appendChild(style.element)), "styleSheet" in style.element) style.styles.push(code), 
    style.element.styleSheet.cssText = style.styles.filter(Boolean).join("\n"); else {
     const index = style.ids.size - 1, textNode = document.createTextNode(code), nodes = style.element.childNodes;
     nodes[index] && style.element.removeChild(nodes[index]), nodes.length ? style.element.insertBefore(textNode, nodes[index]) : style.element.appendChild(textNode);
    }
   }
  }(id, style);
 }), void 0, void 0);
 var rootComponent, extraOptions;
 rootComponent = __vue_component__, browserStorage.init().then(connectToBackground).then(bgState => {
  initVue(bgState, rootComponent, extraOptions);
 });
 const title = document.createElement("title");
 title.textContent = getMessage("product_name"), document.head.appendChild(title);
}(Vue);
