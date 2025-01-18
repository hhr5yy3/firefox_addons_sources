!function(Vue) {
 "use strict";
 Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, "default") ? Vue.default : Vue;
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
 const log$1 = browser$1("messages");
 function sendActionToBg(action, callback) {
  log$1('sending message to background, action "%s": %O', action.type, action), chrome.runtime.sendMessage(action, (function(response) {
   callback && callback(response), chrome.runtime.lastError && log$1("sendActionToBg for %s generated error", action.type, chrome.runtime.lastError);
  }));
 }
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
   sendActionToBg(globalActions_getState(), res => {
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
 let EventCategory, EventAction, EventLabel, ScreenView, UserConsentSource;
 !function(EventCategory) {
  EventCategory.Lifecycle = "Lifecycle", EventCategory.Notification = "Notification";
 }(EventCategory || (EventCategory = {})), function(EventAction) {
  EventAction.Installation = "Installation", EventAction.Heartbeat = "Heartbeat", 
  EventAction.Update = "Update", EventAction.Click = "Click";
 }(EventAction || (EventAction = {})), function(EventLabel) {
  EventLabel.WholeNotification = "Whole Notification", EventLabel.Close = "Close", 
  EventLabel.MoreStartFreeDownload = "More: Start Free Download", EventLabel.MoreNextTime = "More: Next time";
 }(EventLabel || (EventLabel = {})), function(ScreenView) {
  ScreenView.Notification = "Notification";
 }(ScreenView || (ScreenView = {})), function(UserConsentSource) {
  UserConsentSource.User = "user", UserConsentSource.Preset = "preset";
 }(UserConsentSource || (UserConsentSource = {}));
 const log$3 = browser$1("runtimeInfo");
 let OperatingSystem, PlatformArchitecture, Browser;
 !function(OperatingSystem) {
  OperatingSystem.Win = "win", OperatingSystem.Mac = "mac", OperatingSystem.Unknown = "unknown";
 }(OperatingSystem || (OperatingSystem = {})), function(PlatformArchitecture) {
  PlatformArchitecture.Arm = "arm", PlatformArchitecture.X86 = "x86-32", PlatformArchitecture.X64 = "x86-64", 
  PlatformArchitecture.Unknown = "unknown";
 }(PlatformArchitecture || (PlatformArchitecture = {})), function(Browser) {
  Browser.Chrome = "chrome", Browser.Firefox = "firefox", Browser.Other = "other";
 }(Browser || (Browser = {}));
 const runtimeInfo = new class {
  constructor(manifest) {
   _defineProperty(this, "_brand", void 0), _defineProperty(this, "_extensionVersion", void 0), 
   _defineProperty(this, "_permissions", void 0), _defineProperty(this, "_optionalPermissions", void 0), 
   _defineProperty(this, "_contentScriptPaths", void 0), _defineProperty(this, "_browser", void 0), 
   _defineProperty(this, "_name", void 0), _defineProperty(this, "_shortName", void 0), 
   _defineProperty(this, "_platformInfoResolvedCallbacks", void 0), _defineProperty(this, "_os", void 0), 
   _defineProperty(this, "_arch", void 0), manifest.short_name || log$3("short_name not defined in manifest"), 
   this._brand = manifest.short_name, this._extensionVersion = manifest.version, this._permissions = manifest.permissions, 
   this._optionalPermissions = manifest.optional_permissions || [], this._name = manifest.name, 
   this._shortName = manifest.short_name, this._contentScriptPaths = this.extractPathsFromContentScripts(manifest.content_scripts), 
   this._platformInfoResolvedCallbacks = [], navigator.userAgent.includes("Chrome") ? this._browser = Browser.Chrome : navigator.userAgent.includes("Firefox") ? this._browser = Browser.Firefox : this._browser = Browser.Other, 
   log$3("extension version: %s", this._extensionVersion);
  }
  get brand() {
   if (!this._brand) throw new Error("Invalid runtime info brand value.");
   return this._brand;
  }
  get extensionVersion() {
   return this._extensionVersion;
  }
  get permissions() {
   return this._permissions;
  }
  get optionalPermissions() {
   return this._optionalPermissions;
  }
  get contentScriptPaths() {
   return this._contentScriptPaths;
  }
  get os() {
   switch (this._os) {
   case OperatingSystem.Mac:
   case OperatingSystem.Win:
    return this._os;

   default:
    return OperatingSystem.Unknown;
   }
  }
  get arch() {
   switch (this._arch) {
   case PlatformArchitecture.Arm:
   case PlatformArchitecture.X86:
   case PlatformArchitecture.X64:
    return this._arch;

   default:
    return PlatformArchitecture.Unknown;
   }
  }
  get browser() {
   return this._browser;
  }
  get name() {
   return this._name;
  }
  get shortName() {
   return this._shortName;
  }
  handleGetPlatformInfo(platformInfo) {
   if (platformInfo) for (this._os = platformInfo.os, this._arch = platformInfo.arch; this._platformInfoResolvedCallbacks.length; ) this._platformInfoResolvedCallbacks.pop()();
  }
  addPlatformInfoResolvedCallback(callback) {
   this._platformInfoResolvedCallbacks.push(callback);
  }
  extractPathsFromContentScripts(contentScripts) {
   if (!contentScripts) return [];
   const paths = contentScripts.reduce((function(result, contentScript) {
    return contentScript.js.forEach(path => {
     const components = path.split("/");
     result.add(components[components.length - 1]);
    }), result;
   }), new Set);
   return Array.from(paths);
  }
 }(chrome.runtime.getManifest());
 let SecureLineVpnAction, SecureVpnVpnAction, StateItemFlag, VpnStatus, VpnLicenseType, VpnLicenseStatus, NativeMessagingEndpointName, VpnProductInstallationInfoLink, VpnProductDownloadLink, SecureBrowserFaqLink, VpnProductLicensePurchaseLink, ApiCompatibility, ExtensionCallerMethodName;
 var ErrorInfoSource, ErrorInfoCode;
 let VpnApiErrorType, NotificationType, VpnActionTypes;
 chrome.runtime.getPlatformInfo(runtimeInfo.handleGetPlatformInfo.bind(runtimeInfo)), 
 function(SecureLineVpnAction) {
  SecureLineVpnAction.Connect = "public.AvastSecureLine.Connect", SecureLineVpnAction.ConnectToOptimal = "public.AvastSecureLine.ConnectToOptimal", 
  SecureLineVpnAction.Disconnect = "public.AvastSecureLine.Disconnect", SecureLineVpnAction.GetApiVersion = "public.AvastSecureLine.GetApiVersion", 
  SecureLineVpnAction.GetOptimalGateway = "public.AvastSecureLine.GetOptimalGateway", 
  SecureLineVpnAction.GetState = "public.AvastSecureLine.GetState", SecureLineVpnAction.GetProductInfo = "public.AvastSecureLine.GetProductInfo", 
  SecureLineVpnAction.GetPublicIp = "public.AvastSecureLine.GetPublicIp", SecureLineVpnAction.OnErrorOccurred = "public.AvastSecureLine.OnErrorOccurred", 
  SecureLineVpnAction.OnStateChanged = "public.AvastSecureLine.OnStateChanged", SecureLineVpnAction.SetLanguage = "public.AvastSecureLine.SetLanguage", 
  SecureLineVpnAction.ShowNag = "public.AvastSecureLine.Ui.ShowNag", SecureLineVpnAction.ShowMainWindow = "public.AvastSecureLine.Ui.ShowMainWindow";
 }(SecureLineVpnAction || (SecureLineVpnAction = {})), function(SecureVpnVpnAction) {
  SecureVpnVpnAction.Connect = "public.AVGSecureVPN.Connect", SecureVpnVpnAction.ConnectToOptimal = "public.AVGSecureVPN.ConnectToOptimal", 
  SecureVpnVpnAction.Disconnect = "public.AVGSecureVPN.Disconnect", SecureVpnVpnAction.GetApiVersion = "public.AVGSecureVPN.GetApiVersion", 
  SecureVpnVpnAction.GetOptimalGateway = "public.AVGSecureVPN.GetOptimalGateway", 
  SecureVpnVpnAction.GetState = "public.AVGSecureVPN.GetState", SecureVpnVpnAction.GetProductInfo = "public.AVGSecureVPN.GetProductInfo", 
  SecureVpnVpnAction.GetPublicIp = "public.AVGSecureVPN.GetPublicIp", SecureVpnVpnAction.OnErrorOccurred = "public.AVGSecureVPN.OnErrorOccurred", 
  SecureVpnVpnAction.OnStateChanged = "public.AVGSecureVPN.OnStateChanged", SecureVpnVpnAction.SetLanguage = "public.AVGSecureVPN.SetLanguage", 
  SecureVpnVpnAction.ShowNag = "public.AVGSecureVPN.Ui.ShowNag", SecureVpnVpnAction.ShowMainWindow = "public.AVGSecureVPN.Ui.ShowMainWindow";
 }(SecureVpnVpnAction || (SecureVpnVpnAction = {})), function(StateItemFlag) {
  StateItemFlag[StateItemFlag.VpnStatus = 1] = "VpnStatus", StateItemFlag[StateItemFlag.Gateways = 2] = "Gateways", 
  StateItemFlag[StateItemFlag.LicenseInfo = 4] = "LicenseInfo", StateItemFlag[StateItemFlag.ActiveGateway = 8] = "ActiveGateway", 
  StateItemFlag[StateItemFlag.LastError = 32] = "LastError";
 }(StateItemFlag || (StateItemFlag = {})), function(VpnStatus) {
  VpnStatus.Connected = "connected", VpnStatus.Connecting = "connecting", VpnStatus.Reconnecting = "reconnecting", 
  VpnStatus.Disconnected = "disconnected", VpnStatus.Disconnecting = "disconnecting", 
  VpnStatus.Error = "error", VpnStatus.Initializing = "initializing";
 }(VpnStatus || (VpnStatus = {})), function(VpnLicenseType) {
  VpnLicenseType.Trial = "trial", VpnLicenseType.Subscription = "subscription", VpnLicenseType.Free = "free";
 }(VpnLicenseType || (VpnLicenseType = {})), function(VpnLicenseStatus) {
  VpnLicenseStatus.Valid = "valid", VpnLicenseStatus.Expired = "expired", VpnLicenseStatus.NoSubscription = "noSubscription", 
  VpnLicenseStatus.NoLicenseFile = "noLicenseFile", VpnLicenseStatus.Banned = "banned";
 }(VpnLicenseStatus || (VpnLicenseStatus = {})), function(NativeMessagingEndpointName) {
  NativeMessagingEndpointName.SecureVpn = "com.avg.vpn", NativeMessagingEndpointName.SecureLine = "com.avast.vpn";
 }(NativeMessagingEndpointName || (NativeMessagingEndpointName = {})), function(VpnProductInstallationInfoLink) {
  VpnProductInstallationInfoLink.SecureVpn = "https://extension.avgbrowser.com/vpn/how-to-install", 
  VpnProductInstallationInfoLink.SecureLine = "https://extension.avastbrowser.com/vpn/how-to-install";
 }(VpnProductInstallationInfoLink || (VpnProductInstallationInfoLink = {})), function(VpnProductDownloadLink) {
  VpnProductDownloadLink.SecureVpn = "https://extension.avgbrowser.com/vpn/download", 
  VpnProductDownloadLink.SecureLine = "https://extension.avastbrowser.com/vpn/download";
 }(VpnProductDownloadLink || (VpnProductDownloadLink = {})), function(SecureBrowserFaqLink) {
  SecureBrowserFaqLink.SecureVpn = "https://extension.avgbrowser.com/vpn/about", SecureBrowserFaqLink.SecureLine = "https://extension.avastbrowser.com/vpn/about";
 }(SecureBrowserFaqLink || (SecureBrowserFaqLink = {})), function(VpnProductLicensePurchaseLink) {
  VpnProductLicensePurchaseLink.SecureVpn = "https://extension.avgbrowser.com/vpn/offer", 
  VpnProductLicensePurchaseLink.SecureLine = "https://extension.avastbrowser.com/vpn/offer";
 }(VpnProductLicensePurchaseLink || (VpnProductLicensePurchaseLink = {})), function(ApiCompatibility) {
  ApiCompatibility.Compatible = "Compatible", ApiCompatibility.ExtensionOld = "ExtensionOld", 
  ApiCompatibility.VpnClientOld = "VpnClientOld";
 }(ApiCompatibility || (ApiCompatibility = {})), function(ExtensionCallerMethodName) {
  ExtensionCallerMethodName.SetState = "setState", ExtensionCallerMethodName.GetState = "getState", 
  ExtensionCallerMethodName.UpgradeNow = "upgradeNow";
 }(ExtensionCallerMethodName || (ExtensionCallerMethodName = {})), function(ErrorInfoSource) {
  ErrorInfoSource.Connection = "connection";
 }(ErrorInfoSource || (ErrorInfoSource = {})), function(ErrorInfoCode) {
  ErrorInfoCode.LicenseRefused = "licenseRefused", ErrorInfoCode.NoInternetConnection = "noInternetConnection", 
  ErrorInfoCode.LicenseExpired = "licenseExpired", ErrorInfoCode.ConnectionLimitReached = "connectionLimitReached", 
  ErrorInfoCode.DataLimitReached = "dataLimitReached", ErrorInfoCode.VpnNameBanned = "vpnNameBanned", 
  ErrorInfoCode.PlatformNotAllowed = "platformNotAllowed", ErrorInfoCode.LicenseBanned = "licenseBanned", 
  ErrorInfoCode.AuthorizationFailed = "authorizationFailed", ErrorInfoCode.LocationNotAllowed = "locationNotAllowed", 
  ErrorInfoCode.InternalError = "internalError", ErrorInfoCode.MissingMandatoryParameters = "missingMandatoryParameters", 
  ErrorInfoCode.NoLicenseInAccount = "noLicenseInAccount";
 }(ErrorInfoCode || (ErrorInfoCode = {})), function(VpnApiErrorType) {
  VpnApiErrorType.Exception = "exception";
 }(VpnApiErrorType || (VpnApiErrorType = {})), function(NotificationType) {
  NotificationType.ActivateVpnLicense = "ActivateVpnLicense", NotificationType.Error = "Error", 
  NotificationType.InstallVpnClient = "InstallVpnClient", NotificationType.Offline = "Offline", 
  NotificationType.SubscriptionExpired = "SubscriptionExpired", NotificationType.TrialExpired = "TrialExpired", 
  NotificationType.UpdateExtension = "UpdateExtension", NotificationType.UpdateVpnClient = "UpdateVpnClient";
 }(NotificationType || (NotificationType = {})), function(VpnActionTypes) {
  VpnActionTypes.ApiCompatibilityResolved = "vpn.apiCompatibilityResolved", VpnActionTypes.ActiveGatewayUpdated = "vpn.activeGatewayUpdated", 
  VpnActionTypes.AddNotification = "vpn.addNotification", VpnActionTypes.GatewaysUpdated = "vpn.gatewaysUpdated", 
  VpnActionTypes.LastErrorUpdated = "vpn.lastErrorUpdated", VpnActionTypes.ErrorOccurred = "vpn.ErrorOccurred", 
  VpnActionTypes.VpnApiReturnedError = "vpn.VpnApiReturnedError", VpnActionTypes.LicenseInfoUpdated = "vpn.licenseInfoUpdated", 
  VpnActionTypes.VpnStatusUpdated = "vpn.vpnStatusUpdated", VpnActionTypes.Connect = "vpn.connect", 
  VpnActionTypes.Disconnect = "vpn.disconnect", VpnActionTypes.OptimalGatewayUpdated = "vpn.optimalGatewayUpdated", 
  VpnActionTypes.SelectGateway = "vpn.selectGateway", VpnActionTypes.IpAddressChanged = "vpn.ipAddressChanged", 
  VpnActionTypes.ProductInfoUpdated = "vpn.productInfoUpdated", VpnActionTypes.PublicIpChanged = "vpn.publicIpChanged", 
  VpnActionTypes.ReconnectingToAnotherGatewayStatusChanged = "vpn.reconnectingToAnotherGatewayStatusChanged", 
  VpnActionTypes.RemoveNotification = "vpn.removeNotification", VpnActionTypes.HandleNetworkConnectivityChange = "vpn.handleNetworkConnectivityChange", 
  VpnActionTypes.SetBrowserApiAvailability = "vpn.setBrowserApiAvailability", VpnActionTypes.SetIsInitialized = "vpn.setIsInitialized", 
  VpnActionTypes.SetNativeMessagingHostFound = "vpn.setNativeMessagingHostFound", 
  VpnActionTypes.VpnClientApiVersionUpdated = "vpn.VpnClientApiVersionUpdated", VpnActionTypes.ShowLicenseUpgradePage = "vpn.showLicenseUpgradePage", 
  VpnActionTypes.ShowMainWindow = "vpn.ShowMainWindow", VpnActionTypes.ShowNag = "vpn.ShowNag";
 }(VpnActionTypes || (VpnActionTypes = {}));
 const vpnActions_connect = () => createAction(VpnActionTypes.Connect), vpnActions_disconnect = () => createAction(VpnActionTypes.Disconnect), vpnActions_errorOccurred = value => createAction(VpnActionTypes.ErrorOccurred, value), vpnActions_gatewaySelected = value => createAction(VpnActionTypes.SelectGateway, value), vpnActions_showLicenseUpgradePage = () => createAction(VpnActionTypes.ShowLicenseUpgradePage), vpnActions_showMainWindow = value => createAction(VpnActionTypes.ShowMainWindow, value), vpnActions_showNag = (elementId, pScrParameter) => createAction(VpnActionTypes.ShowNag, {
  elementId: elementId,
  pScrParameter: pScrParameter
 }), vpnActions_vpnApiReturnedError = value => createAction(VpnActionTypes.VpnApiReturnedError, value);
 function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
 }
 const __vue_component__ = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon update-download"
   }), _vm._v(" "), _c("div", {
    staticClass: "txt"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("activate_vpn_product")) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "wrapper-btn"
   }, [ _c("a", {
    staticClass: "btn",
    attrs: {
     href: "#"
    },
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("learn_more")) + "\n\t\t\t\t") ]) ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  methods: {
   onBtnClicked() {
    sendActionToBg(vpnActions_showLicenseUpgradePage());
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$1 = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("li", {
    class: {
     sublist__toggle: _vm.isSingleCity,
     sublist__has__sub: _vm.isMultiCity,
     active: _vm.selectedGateway.country.name === _vm.country
    },
    on: {
     click: function($event) {
      return _vm.$emit("country-clicked", _vm.country);
     }
    }
   }, [ _c("div", {
    staticClass: "green-tick"
   }), _vm._v(" "), _c("a", {
    staticClass: "link",
    attrs: {
     href: "#"
    }
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.country) + "\n\t\t"), _vm.isMultiCity ? [ _c("span", {
    attrs: {
     id: "count"
    }
   }, [ _vm._v("\n\t\t\t\t(" + _vm._s(_vm.countryMap[_vm.country].length) + ")\n\t\t\t") ]), _vm._v(" "), _c("img", {
    staticClass: "shape",
    attrs: {
     src: "/img/chevron.svg"
    },
    on: {
     click: function($event) {
      return $event.stopPropagation(), _vm.$emit("chevron-clicked", _vm.country);
     }
    }
   }) ] : _vm._e() ], 2), _vm._v(" "), _vm.isMultiCity ? _c("ul", {
    directives: [ {
     name: "show",
     rawName: "v-show",
     value: _vm.showCities && _vm.country === _vm.selectedMultiCityCountry,
     expression: "showCities && country === selectedMultiCityCountry"
    } ],
    staticClass: "sublist__toggle__body"
   }, _vm._l(_vm.cities(_vm.country), (function(city) {
    return _c("li", {
     key: _vm.country + "-" + city,
     class: {
      selected: city === _vm.selectedGateway.city.name
     },
     on: {
      click: function($event) {
       return $event.stopPropagation(), _vm.$emit("city-clicked", _vm.country, city);
      }
     }
    }, [ _c("div", {
     staticClass: "green-sub-tick"
    }), _vm._v(" "), _c("a", {
     staticClass: "sublist--link",
     attrs: {
      href: "#"
     }
    }, [ _vm._v("\n\t\t\t\t" + _vm._s(city) + "\n\t\t\t") ]) ]);
   })), 0) : _vm._e() ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object,
   country: String,
   countryMap: Object,
   showCities: Boolean,
   selectedMultiCityCountry: String
  },
  data() {
   return {
    selectedGateway: this.bgState.vpn.selectedGateway
   };
  },
  computed: {
   isSingleCity() {
    return 1 === this.countryMap[this.country].length;
   },
   isMultiCity() {
    return this.countryMap[this.country].length > 1;
   }
  },
  methods: {
   cities(country) {
    return this.countryMap[country];
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$4 = browser$1("vpn-dashboard-location-menu");
 const __vue_component__$2 = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("ul", {
    staticClass: "nav-dropdown-menu"
   }, [ _c("li", {
    staticClass: "opt__loc",
    class: {
     active: _vm.optimalGateway.id === _vm.selectedGateway.id
    },
    on: {
     click: _vm.onOptimalLocationClicked
    }
   }, [ _c("div", {
    staticClass: "green-tick"
   }), _vm._v(" "), _c("p", [ _c("a", {
    attrs: {
     href: "#"
    }
   }, [ _c("span", {
    attrs: {
     id: "optimal_state"
    }
   }, [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.optimalGatewayDisplayName) + "\n\t\t\t\t") ]) ]) ]) ]), _vm._v(" "), _vm._l(_vm.countries, (function(country) {
    return _c("location-menu-item", {
     key: country,
     attrs: {
      "bg-state": _vm.bgState,
      country: country,
      "country-map": _vm.countryMap,
      "show-cities": _vm.showCities,
      "selected-multi-city-country": _vm.selectedMultiCityCountry
     },
     on: {
      "city-clicked": _vm.onCityClicked,
      "chevron-clicked": _vm.onChevronClicked,
      "country-clicked": _vm.onCountryClicked
     }
    });
   })) ], 2);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   LocationMenuItem: __vue_component__$1
  },
  props: {
   bgState: Object,
   optimalGatewayDisplayName: String
  },
  data() {
   return {
    showCities: !1,
    selectedMultiCityCountry: "",
    selectedGateway: this.bgState.vpn.selectedGateway,
    optimalGateway: this.bgState.vpn.optimalGateway
   };
  },
  computed: {
   gateways() {
    return this.bgState.vpn.gateways;
   },
   countryMap() {
    return log$4(this.bgState), this.bgState.vpn.gateways.reduce((map, gateway) => ("optimal_unknown" !== gateway.id && (map[gateway.country.name] = map[gateway.country.name] || [], 
    map[gateway.country.name].push(gateway.city.name)), map), {});
   },
   countries() {
    return Object.keys(this.countryMap);
   }
  },
  methods: {
   isMultiCity(country) {
    return this.countryMap[country].length > 1;
   },
   onChevronClicked(country) {
    log$4("Chevron clicked for multicity country: %s", country), this.selectedMultiCityCountry = country, 
    this.showCities = !this.showCities;
   },
   onCountryClicked(country) {
    if (this.isMultiCity(country)) {
     const citiesInCountry = this.gateways.filter(gw => gw.country.name === country);
     this.selectedGateway = citiesInCountry[Math.floor(Math.random() * citiesInCountry.length)];
    } else this.showCities = !1, this.selectedGateway = this.gateways.find(gw => gw.country.name === country);
    this.$emit("toggleDropdown"), log$4("Selected country: %s. Selected gateway id: %s", country, this.selectedGateway.id), 
    sendActionToBg(vpnActions_gatewaySelected(this.selectedGateway));
   },
   onCityClicked(country, city) {
    this.$emit("toggleDropdown"), this.selectedGateway = this.bgState.vpn.gateways.find(gw => gw.country.name === country && gw.city.name === city), 
    log$4("Selected city: %s. Selected gateway id: %s", city, this.selectedGateway.id), 
    sendActionToBg(vpnActions_gatewaySelected(this.selectedGateway));
   },
   onOptimalLocationClicked() {
    this.$emit("toggleDropdown"), this.selectedGateway = this.bgState.vpn.optimalGateway, 
    log$4("Selected optimal location. Selected gateway id: %s", this.selectedGateway.id), 
    sendActionToBg(vpnActions_gatewaySelected(this.selectedGateway));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$5 = browser$1("vpn-dashboard-location");
 const __vue_component__$3 = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper-select"
   }, [ _c("div", {
    staticClass: "location-text"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("vpn_location")) + "\n\t") ]), _vm._v(" "), _c("div", {
    staticClass: "nav-dropdown"
   }, [ _c("div", {
    staticClass: "nav-toggle-dropdown",
    on: {
     click: _vm.onDropdownToggleClicked
    }
   }, [ _c("button", [ _c("span", [ _vm._v(_vm._s(_vm.selectedGatewayDisplayName)) ]) ]), _vm._v(" "), _c("img", {
    staticClass: "shape",
    attrs: {
     src: "/img/chevron.svg"
    }
   }) ]), _vm._v(" "), _c("location-menu", {
    directives: [ {
     name: "show",
     rawName: "v-show",
     value: _vm.showDropdown,
     expression: "showDropdown"
    } ],
    attrs: {
     "bg-state": _vm.bgState,
     "optimal-gateway-display-name": _vm.optimalGatewayDisplayName
    },
    on: {
     toggleDropdown: _vm.onDropdownToggleClicked
    }
   }) ], 1) ]);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   LocationMenu: __vue_component__$2
  },
  props: {
   bgState: Object
  },
  data() {
   return {
    showDropdown: !1,
    selectedGateway: this.bgState.vpn.selectedGateway,
    optimalGateway: this.bgState.vpn.optimalGateway
   };
  },
  computed: {
   selectedGatewayDisplayName() {
    let selectedGatewayDisplayName;
    return selectedGatewayDisplayName = this.bgState.vpn.selectedGateway.id === this.bgState.vpn.optimalGateway.id ? this.optimalGatewayDisplayName : this.bgState.vpn.selectedGateway.city.name + ", " + this.bgState.vpn.selectedGateway.country.name, 
    selectedGatewayDisplayName;
   },
   optimalGatewayDisplayName() {
    let optimalGatewayDisplayName = this.translate("optimal_location");
    return "optimal_unknown" !== this.bgState.vpn.optimalGateway.id && (optimalGatewayDisplayName += " (" + this.bgState.vpn.optimalGateway.city.name + ", " + this.bgState.vpn.optimalGateway.country.name + ")"), 
    optimalGatewayDisplayName;
   }
  },
  methods: {
   onDropdownToggleClicked() {
    this.showDropdown = !this.showDropdown, log$5("Dropdown menu clicked! showDropdown = %s", this.showDropdown), 
    log$5("selectedGateway: %s. optimalGateway: %s.", this.selectedGateway.id, this.optimalGateway.id);
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$4 = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper-switch-block"
   }, [ _vm.isConnecting ? _c("h3", {
    staticClass: "state__connect connecting"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("connecting")) + "\n\t") ]) : _vm.isReconnecting || _vm.isReconnectingToAnotherGateway ? _c("h3", {
    staticClass: "state__connect reconnecting"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("reconnecting")) + "\n\t") ]) : _vm.isConnected ? _c("h3", {
    staticClass: "state__connect connected"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("connected")) + "\n\t") ]) : _vm.isDisconnecting ? _c("h3", {
    staticClass: "state__connect disconnecting"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("disconnecting")) + "\n\t") ]) : _vm.isDisconnected ? _c("h3", {
    staticClass: "state__connect disconnected"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("disconnected")) + "\n\t") ]) : _vm.isConnectionFailed ? _c("h3", {
    staticClass: "state__connect fail"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("connection_failed")) + "\n\t") ]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "switch"
   }, [ _c("label", [ _c("input", {
    attrs: {
     id: "switch_box",
     type: "checkbox"
    },
    domProps: {
     checked: _vm.isConnecting || _vm.isConnected || _vm.isReconnecting
    },
    on: {
     click: _vm.onConnectToggle
    }
   }), _vm._v(" "), _c("span", {
    staticClass: "lever"
   }) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  computed: {
   status() {
    return this.bgState.vpn.vpnStatus;
   },
   isConnecting() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Connecting;
   },
   isReconnectingToAnotherGateway() {
    return this.bgState.vpn.isReconnectingToAnotherGateway;
   },
   isReconnecting() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Reconnecting;
   },
   isConnected() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Connected;
   },
   isDisconnecting() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Disconnecting;
   },
   isDisconnected() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Disconnected;
   },
   isConnectionFailed: () => !1
  },
  methods: {
   onConnectToggle() {
    switch (this.status) {
    case VpnStatus.Disconnected:
     sendActionToBg(vpnActions_connect()), this.$emit("switch-turn-on");
     break;

    case VpnStatus.Connecting:
    case VpnStatus.Connected:
     sendActionToBg(vpnActions_disconnect()), this.$emit("switch-turn-off");
    }
    this.$forceUpdate();
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$5 = normalizeComponent({
  render: function() {
   var _h = this.$createElement, _c = this._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("location", {
    attrs: {
     "bg-state": this.bgState
    }
   }), this._v(" "), _c("connection-switch", {
    attrs: {
     "bg-state": this.bgState
    }
   }) ], 1) ]);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   Location: __vue_component__$3,
   ConnectionSwitch: __vue_component__$4
  },
  props: {
   bgState: Object
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$6 = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon update-download"
   }), _vm._v(" "), _c("div", {
    staticClass: "txt"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("something_is_not_right")) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "wrapper-btn"
   }, [ _c("a", {
    staticClass: "btn",
    attrs: {
     href: "#"
    },
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("dismiss")) + "\n\t\t\t\t") ]) ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  methods: {
   onBtnClicked() {
    sendActionToBg(vpnActions_errorOccurred(null)), sendActionToBg(vpnActions_vpnApiReturnedError(null));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 let ProductId;
 !function(ProductId) {
  ProductId.AvastVpn = "AvastVpn", ProductId.AvastVpnStandalone = "AvastVpnStandalone", 
  ProductId.AvgVpn = "AvgVpn", ProductId.HmaProxy = "HmaProxy", ProductId.Unknown = "Unknown";
 }(ProductId || (ProductId = {}));
 const buildTimeInfo = new class {
  constructor() {
   _defineProperty(this, "_shepherdId", void 0), _defineProperty(this, "_productId", void 0), 
   _defineProperty(this, "_productBrand", void 0);
   switch (this._shepherdId = "123" == Number("123") ? "123" : "", this._productId = ProductId.AvastVpnStandalone ? ProductId.AvastVpnStandalone : ProductId.Unknown, 
   this._productId) {
   case ProductId.AvastVpn:
   case ProductId.AvastVpnStandalone:
    this._productBrand = "SecureLine";
    break;

   case ProductId.AvgVpn:
    this._productBrand = "SecureVpn";
    break;

   default:
    this._productBrand = this._productId;
   }
  }
  get shepherdId() {
   return this._shepherdId;
  }
  get productId() {
   return this._productId;
  }
  get isProduction() {
   return !0;
  }
  get productBrand() {
   return this._productBrand;
  }
 };
 const __vue_component__$7 = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("header", {
    staticClass: "header"
   }, [ _c("div", {
    staticClass: "header-text",
    class: {
     "text-center": !_vm.isShowDashboard
    }
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("product_name")) + "\n\t") ]), _vm._v(" "), _vm.isShowDashboard ? _c("a", {
    staticClass: "info-link",
    attrs: {
     target: "_blank",
     href: _vm.vpnProductInfoLink
    }
   }, [ _c("div", {
    staticClass: "info-icon"
   }, [ _c("div", {
    staticClass: "info-text-block"
   }, [ _c("p", {
    staticClass: "info_descript"
   }, [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("learn_more")) + "\n\t\t\t\t") ]) ]) ]) ]) : _vm._e() ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   isShowDashboard: Boolean
  },
  computed: {
   vpnProductInfoLink: () => VpnProductInstallationInfoLink[buildTimeInfo.productBrand]
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 function openUrlInNewTab(url) {
  chrome.tabs.create({
   url: url
  });
 }
 const __vue_component__$8 = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon update-download"
   }), _vm._v(" "), _c("div", {
    staticClass: "txt"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("install_vpn_product")) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "wrapper-btn"
   }, [ _c("a", {
    staticClass: "btn",
    attrs: {
     href: "#"
    },
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("learn_more")) + "\n\t\t\t\t") ]) ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  methods: {
   onBtnClicked() {
    openUrlInNewTab(VpnProductInstallationInfoLink[buildTimeInfo.productBrand]);
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$9 = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("footer", [ _vm.isConnectedToNetwork ? _c("div", {
    staticClass: "footer-wrap"
   }, [ _c("div", {
    staticClass: "footer-text"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.isConnected ? _vm.translate("virtual_ip_address") : _vm.translate("your_ip_address")) + "\n\t\t") ]), _vm._v(" "), _vm.isDisconnected && !_vm.isReconnectingToAnotherGateway || _vm.isConnected || !_vm.isShowDashboard ? _c("div", {
    staticClass: "footer-text ip--numb",
    class: {
     users: _vm.isDisconnected && !_vm.isReconnectingToAnotherGateway || !_vm.isShowDashboard,
     virtual: _vm.isConnected
    }
   }, [ "" === _vm.ipAddress ? _c("a", {
    staticClass: "locating",
    attrs: {
     href: "#"
    }
   }, [ _c("div", {
    staticClass: "locating-text"
   }, [ _c("span", [ _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.translate("locating")) + "\n\t\t\t\t\t") ]), _vm._v(" "), _c("div", {
    staticClass: "pre-ellipsis"
   }), _vm._v(" "), _c("div", {
    staticClass: "ip-info"
   }, [ _c("p", {
    staticClass: "ip-info-text"
   }, [ _vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.translate("waiting_for_ip_address_to_be_assigned_to_your_computer")) + "\n\t\t\t\t\t\t") ]) ]) ]) ]) : _c("a", {
    staticClass: "addr-link",
    attrs: {
     href: "#"
    }
   }, [ _c("span", [ _vm._v(" " + _vm._s(_vm.ipAddress) + " ") ]), _vm._v(" "), _c("div", {
    staticClass: "ip-info"
   }, [ _c("p", {
    staticClass: "ip-info-text"
   }, [ _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.getIpAddressTooltipText()) + "\n\t\t\t\t\t") ]) ]) ]) ]) : _vm._e() ]) : _vm._e() ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object,
   isShowDashboard: Boolean
  },
  computed: {
   ipAddress() {
    return this.bgState.vpn.ipAddress;
   },
   isConnectedToNetwork() {
    return this.bgState.vpn.isConnectedToNetwork;
   },
   isDisconnected() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Disconnected;
   },
   isConnected() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Connected;
   },
   isReconnectingToAnotherGateway() {
    return this.bgState.vpn.isReconnectingToAnotherGateway;
   }
  },
  methods: {
   getIpAddressTooltipText() {
    let toolTipMessageId;
    return this.isShowDashboard ? this.isConnected ? toolTipMessageId = "virtual_ip_address_explanation" : this.isDisconnected && (toolTipMessageId = "turn_on_vpn_reason") : toolTipMessageId = "this_is_your_current_ip_address", 
    this.translate(toolTipMessageId);
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$a = normalizeComponent({
  render: function() {
   var _h = this.$createElement, _c = this._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-loading"
   }, [ _c("span", [ this._v("\n\t\t\t" + this._s(this.translate("loading")) + "\n\t\t") ]), this._v(" "), _c("div", {
    staticClass: "pre-ellipsis"
   }) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {}, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$b = normalizeComponent({
  render: function() {
   var _h = this.$createElement, _c = this._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon offline"
   }), this._v(" "), _c("div", {
    staticClass: "txt"
   }, [ this._v("\n\t\t\t\t" + this._s(this.translate("make_sure_your_internet_connection_works_properly")) + "\n\t\t\t") ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {}, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$c = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon icon update-download"
   }), _vm._v(" "), _c("div", {
    staticClass: "txt wide"
   }, [ _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("something_is_not_right")) + "\n\t\t\t\t") ]), _c("br"), _c("br"), _vm._v(" "), _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("please_try_reinstalling_vpn_product")) + "\n\t\t\t\t") ]), _vm._v(" "), _c("span", [ _vm._v(" (") ]), _vm._v(" "), _c("a", {
    staticClass: "txt-how-link",
    attrs: {
     target: "_blank",
     href: _vm.reinstallVpnProductHelpPageUrl
    }
   }, [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("see_how")) + "\n\t\t\t\t") ]), _vm._v(" "), _c("span", [ _vm._v("). ") ]), _vm._v(" "), _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("if_that_does_not_work_try_reinstalling_browser_product")) + "\n\t\t\t\t") ]), _vm._v(" "), _c("span", [ _vm._v(" (") ]), _vm._v(" "), _c("a", {
    staticClass: "txt-how-link",
    attrs: {
     target: "_blank",
     href: _vm.reinstallBrowserHelpPageUrl
    }
   }, [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("see_how")) + "\n\t\t\t\t") ]), _vm._v(" "), _c("span", [ _vm._v(").") ]) ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  computed: {
   reinstallVpnProductHelpPageUrl: () => VpnProductInstallationInfoLink[buildTimeInfo.productBrand],
   reinstallBrowserHelpPageUrl: () => SecureBrowserFaqLink[buildTimeInfo.productBrand]
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$d = normalizeComponent({
  render: function() {
   var _h = this.$createElement, _c = this._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon icon update-download"
   }), this._v(" "), _c("div", {
    staticClass: "txt"
   }, [ this._v("\n\t\t\t\t" + this._s(this.translate("something_not_right_please_restart")) + "\n\t\t\t") ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {}, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$e = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon update-download"
   }), _vm._v(" "), _c("div", {
    staticClass: "txt"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("update_browser_product_to_use_this_feature")) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "wrapper-btn"
   }, [ _c("a", {
    staticClass: "btn",
    attrs: {
     href: "#"
    },
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("update_now")) + "\n\t\t\t\t") ]) ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  methods: {
   onBtnClicked() {
    openUrlInNewTab("secure://settings/help");
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$f = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon update-download"
   }), _vm._v(" "), _c("div", {
    staticClass: "txt"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("you_need_to_update_your_vpn_product_extension")) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "wrapper-btn"
   }, [ _c("a", {
    staticClass: "btn",
    attrs: {
     href: "#"
    },
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("update_now")) + "\n\t\t\t\t") ]) ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  methods: {
   onBtnClicked() {
    openUrlInNewTab(`secure://extensions/?id=${chrome.runtime.id}`);
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$g = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "wrapper"
   }, [ _c("div", {
    staticClass: "wrapper-main"
   }, [ _c("div", {
    staticClass: "wrpper-icon-block"
   }, [ _c("div", {
    staticClass: "icon update-download"
   }), _vm._v(" "), _c("div", {
    staticClass: "txt"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("update_vpn_product_to_use_this_feature")) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "wrapper-btn"
   }, [ _c("a", {
    staticClass: "btn",
    attrs: {
     href: "#"
    },
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _c("span", [ _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.translate("update_now")) + "\n\t\t\t\t") ]) ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  methods: {
   onBtnClicked() {
    openUrlInNewTab(VpnProductDownloadLink[buildTimeInfo.productBrand]);
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$h = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "container"
   }, [ _c("HeaderBase", {
    attrs: {
     "is-show-dashboard": _vm.isShowDashboard
    }
   }), _vm._v(" "), _vm.isConnectedToNetwork ? _vm.isErrorOccurred ? _c("ErrorBase") : _vm.isShowUpdateBrowser ? _c("UpdateBrowserBase") : _vm.isNativeMessagingHostFound ? _vm.isLoading ? _c("LoadingBase") : _vm.isExtensionOld ? _c("UpdateExtensionBase") : _vm.isVpnClientOld ? _c("UpdateVpnClientBase") : _vm.isVpnLicenseActive ? _vm.isReinstallRequired ? _c("ReinstallBase") : _vm.isRestartRequired ? _c("RestartBase") : _c("DashboardBase", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _c("ActivateVpnLicenseBase") : _c("InstallVpnClientBase") : _c("OfflineBase"), _vm._v(" "), _c("IpAddressBase", {
    attrs: {
     "bg-state": _vm.bgState,
     "is-show-dashboard": _vm.isShowDashboard
    }
   }) ], 1);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   ActivateVpnLicenseBase: __vue_component__,
   DashboardBase: __vue_component__$5,
   ErrorBase: __vue_component__$6,
   HeaderBase: __vue_component__$7,
   InstallVpnClientBase: __vue_component__$8,
   IpAddressBase: __vue_component__$9,
   LoadingBase: __vue_component__$a,
   OfflineBase: __vue_component__$b,
   ReinstallBase: __vue_component__$c,
   RestartBase: __vue_component__$d,
   UpdateBrowserBase: __vue_component__$e,
   UpdateExtensionBase: __vue_component__$f,
   UpdateVpnClientBase: __vue_component__$g
  },
  props: {
   bgState: Object
  },
  computed: {
   isConnectedToNetwork() {
    return this.bgState.vpn.isConnectedToNetwork;
   },
   isExtensionOld() {
    return this.bgState.vpn.apiCompatibility === ApiCompatibility.ExtensionOld;
   },
   isVpnClientOld() {
    return this.bgState.vpn.apiCompatibility === ApiCompatibility.VpnClientOld;
   },
   isShowUpdateBrowser() {
    return !!this.bgState.spc && !this.bgState.spc.isBrowserApiAvailable;
   },
   isNativeMessagingHostFound() {
    return this.bgState.vpn.isNativeMessagingHostFound;
   },
   isVpnLicenseActive() {
    return this.bgState.vpn.licenseInfo && this.bgState.vpn.licenseInfo.status === VpnLicenseStatus.Valid;
   },
   isReinstallRequired: () => !1,
   isRestartRequired: () => !1,
   isErrorOccurred() {
    return this.bgState.vpn.errorInfo || this.bgState.vpn.vpnApiError;
   },
   isShowDashboard() {
    return this.isConnectedToNetwork && !this.isExtensionOld && !this.isVpnClientOld && this.isBrowserApiAvailable && this.isNativeMessagingHostFound && this.isVpnLicenseActive && !this.isReinstallRequired && !this.isRestartRequired && !this.isErrorOccurred;
   },
   isLoading() {
    const somethingNotLoaded = !(this.bgState.vpn.licenseInfo && this.bgState.vpn.selectedGateway && this.bgState.vpn.optimalGateway && this.bgState.vpn.gateways.length);
    return !this.isErrorOccurred && somethingNotLoaded;
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 let AnalyticsActionTypes;
 !function(AnalyticsActionTypes) {
  AnalyticsActionTypes.AnalyticsUserConsent = "analytics.analyticsUserConsent", AnalyticsActionTypes.ClientCountryCodeChange = "analytics.clientCountryCodeChange", 
  AnalyticsActionTypes.CreateSession = "analytics.createSession", AnalyticsActionTypes.HeartbeatTracked = "analytics.heartbeatTracked", 
  AnalyticsActionTypes.TrackEvent = "analytics.trackEvent", AnalyticsActionTypes.TrackInstall = "analytics.trackInstall", 
  AnalyticsActionTypes.TrackView = "analytics.trackView", AnalyticsActionTypes.UninstallUrlDirty = "analytics.uninstallUrlDirty", 
  AnalyticsActionTypes.UserConsentChange = "analytics.userConsentChange";
 }(AnalyticsActionTypes || (AnalyticsActionTypes = {}));
 const analyticsActions_trackEvent = (category, action, label, view) => createAction(AnalyticsActionTypes.TrackEvent, {
  category: category,
  action: action,
  label: label,
  view: view
 }), analyticsActions_trackInstall = () => createAction(AnalyticsActionTypes.TrackInstall), analyticsActions_trackView = (view, label) => createAction(AnalyticsActionTypes.TrackView, {
  view: view,
  label: label
 }), analyticsActions_userConsentChange = value => createAction(AnalyticsActionTypes.UserConsentChange, value);
 function addUtmParams(link, params) {
  const source = runtimeInfo.browser === Browser.Firefox ? "extension_firefox" : "extension_chrome", url = new URL(link);
  return url.searchParams.append("utm_medium", "prg_link"), url.searchParams.append("utm_source", source), 
  url.searchParams.append("utm_campaign", params.campaign), params.content && url.searchParams.append("utm_content", params.content), 
  params.term && url.searchParams.append("utm_term", params.term), params.otherParams && Object.keys(params.otherParams).forEach(key => {
   url.searchParams.append(key, params.otherParams[key]);
  }), url.href;
 }
 function convertLegacyGatewayId(id) {
  return id.includes(".prcdn.net") ? id.replace(".prcdn.net", "").split("-").reverse().join("-") : id;
 }
 const __vue_component__$i = normalizeComponent({
  render: function() {
   var _obj, _obj$1, _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "dashboard-switch-block"
   }, [ _c("h3", {
    staticClass: "text -strong g-margin-bottom--30 g-align--center"
   }, [ _vm.isReconnecting || _vm.isReconnectingToAnotherGateway ? [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("reconnecting")) + "\n\t\t") ] : _vm.isConnecting ? [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("connecting")) + "\n\t\t") ] : _vm.isConnected ? [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("connected")) + "\n\t\t") ] : _vm.isDisconnecting ? [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("disconnecting")) + "\n\t\t") ] : _vm.isDisconnected ? [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("disconnected")) + "\n\t\t") ] : _vm.isConnectionFailed ? [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("connection_failed")) + "\n\t\t") ] : _vm._e() ], 2), _vm._v(" "), _c("div", {
    staticClass: "switch__holder"
   }, [ _c("button", {
    staticClass: "switch -large",
    class: {
     "-checked": _vm.isConnecting || _vm.isConnected || _vm.isReconnecting || _vm.isReconnectingToAnotherGateway
    },
    attrs: {
     role: "switch"
    },
    on: {
     click: _vm.onConnectToggle
    }
   }, [ _c("span", {
    staticClass: "switch__txt -on",
    class: (_obj = {}, _obj["-length-" + _vm.onLabel.length] = !0, _obj["-visible"] = _vm.isConnected && !_vm.isReconnectingToAnotherGateway && _vm.onLabel.length <= 5, 
    _obj)
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.onLabel) + "\n\t\t\t") ]), _vm._v(" "), _c("span", {
    staticClass: "switch__txt -off",
    class: (_obj$1 = {}, _obj$1["-length-" + _vm.offLabel.length] = !0, _obj$1["-visible"] = _vm.isDisconnected && !_vm.isReconnectingToAnotherGateway && _vm.offLabel.length <= 5, 
    _obj$1)
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.offLabel) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "switch__handle"
   }, [ _vm.isConnecting || _vm.isReconnecting || _vm.isReconnectingToAnotherGateway ? _c("img", {
    key: "spin",
    staticClass: "switch__icon spin",
    attrs: {
     width: "22",
     height: "22",
     src: "/img/spin.svg"
    }
   }) : _vm.isConnected ? _c("img", {
    key: "check",
    staticClass: "switch__icon",
    attrs: {
     width: "18",
     height: "12",
     src: "/img/check.svg"
    }
   }) : _vm.isDisconnected || _vm.isConnectionFailed ? _c("img", {
    key: "times",
    staticClass: "switch__icon",
    attrs: {
     width: "12",
     height: "12",
     src: "/img/times.svg"
    }
   }) : _vm.isDisconnecting ? _c("img", {
    key: "spin-red",
    staticClass: "switch__icon spin",
    attrs: {
     width: "22",
     height: "22",
     src: "/img/spin-red.svg"
    }
   }) : _vm._e() ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  extends: __vue_component__$4,
  computed: {
   onLabel() {
    return this.translate("on");
   },
   offLabel() {
    return this.translate("off");
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$j = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "dashboard-ip-address text -small",
    class: {
     "-empty": !_vm.showRealIpAddress && !_vm.showVirtualIpAddress
    }
   }, [ _vm.showRealIpAddress ? _c("div", {
    staticClass: "dashboard-ip-address-row"
   }, [ _c("div", {
    staticClass: "col -pad"
   }), _vm._v(" "), _c("div", {
    staticClass: "col -label text -small -secondary"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate(_vm.realIpMessageString)) + "\n\t\t") ]), _vm._v(" "), _c("div", {
    staticClass: "col -value"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.realIpAddress) + "\n\t\t") ]) ]) : _vm._e(), _vm._v(" "), _vm.showVirtualIpAddress ? _c("div", {
    staticClass: "dashboard-ip-address-row g-margin-top--10"
   }, [ _c("div", {
    staticClass: "col -pad"
   }), _vm._v(" "), _c("div", {
    staticClass: "col -label text -small -secondary"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("virtual_ip")) + "\n\t\t") ]), _vm._v(" "), _c("div", {
    staticClass: "col -value"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.virtualIpAddress) + "\n\t\t") ]) ]) : _vm._e() ]);
  },
  staticRenderFns: []
 }, void 0, {
  extends: __vue_component__$9,
  computed: {
   realIpAddress() {
    return this.bgState.vpn.vpnIpAddresses && this.bgState.vpn.vpnIpAddresses.original ? this.bgState.vpn.vpnIpAddresses.original.ip : this.ipAddress;
   },
   realIpMessageString() {
    return this.bgState.vpn.vpnIpAddresses ? "real_ip" : "current_ip";
   },
   showIpAddress() {
    return !!this.bgState.vpn.vpnIpAddresses && !!this.bgState.vpn.vpnIpAddresses.original || !!this.bgState.vpn.ipAddress;
   },
   showRealIpAddress() {
    return this.isConnectedToNetwork && this.showIpAddress;
   },
   showVirtualIpAddress() {
    return this.isConnected && this.showIpAddress && !!this.virtualIpAddress && this.virtualIpAddress !== this.realIpAddress;
   },
   virtualIpAddress() {
    return this.bgState.vpn.vpnIpAddresses && this.bgState.vpn.vpnIpAddresses.current ? this.bgState.vpn.vpnIpAddresses.current.ip : null;
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$k = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("li", {
    staticClass: "dashboard-location-menu-item",
    class: {
     active: _vm.isActive
    }
   }, [ _c("div", {
    staticClass: "dashboard-location-menu-line text color-ok",
    class: {
     "-text -strong": _vm.isActive
    }
   }, [ _c("button", {
    staticClass: "dashboard-location-menu-btn",
    on: {
     click: function($event) {
      return _vm.$emit("country-clicked", _vm.country);
     }
    }
   }, [ _c("i", {
    staticClass: "g-margin-end--15 flag-icon",
    class: _vm.getIconClass(_vm.country)
   }, [ _vm.isActive ? _c("img", {
    attrs: {
     src: "/img/check-green.svg",
     width: "15",
     height: "15"
    }
   }) : _vm._e() ]), _vm._v(" "), _c("span", {
    staticClass: "dashboard-location-menu-name"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.country) + "\n\t\t\t") ]) ]), _vm._v(" "), _vm.isMultiCity ? _c("div", {
    staticClass: "dashboard-location-menu-status"
   }, [ _c("div", {
    staticClass: "badge color-highlight -bg text -tiny"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.countryMap[_vm.country].length) + "\n\t\t\t") ]), _vm._v(" "), _c("button", {
    staticClass: "dashboard-location-menu-chevron",
    class: {
     "-up": _vm.isMultiCity && _vm.showCities && _vm.country === _vm.selectedMultiCityCountry
    },
    on: {
     click: function($event) {
      return $event.stopPropagation(), _vm.$emit("chevron-clicked", _vm.country);
     }
    }
   }, [ _c("img", {
    staticClass: "g-valign--middle",
    attrs: {
     src: "/img/arrow-down.svg",
     width: "24",
     height: "24"
    }
   }) ]) ]) : _vm._e() ]), _vm._v(" "), _c("transition", {
    attrs: {
     name: "location-menu"
    }
   }, [ _vm.isMultiCity ? _c("ul", {
    directives: [ {
     name: "show",
     rawName: "v-show",
     value: _vm.showCities && _vm.country === _vm.selectedMultiCityCountry,
     expression: "showCities && country === selectedMultiCityCountry"
    } ],
    staticClass: "dashboard-location-menu-item-sublist"
   }, _vm._l(_vm.cities(_vm.country), (function(city) {
    return _c("li", {
     key: _vm.country + "-" + city,
     staticClass: "dashboard-location-menu-item -sub",
     class: {
      active: _vm.activeGateway.city.name === city
     }
    }, [ _c("div", {
     staticClass: "dashboard-location-menu-line color-ok text",
     class: {
      "-text -strong": _vm.activeGateway.city.name === city
     }
    }, [ _c("button", {
     staticClass: "dashboard-location-menu-btn",
     on: {
      click: function($event) {
       return $event.stopPropagation(), _vm.$emit("city-clicked", _vm.country, city);
      }
     }
    }, [ _c("span", {
     staticClass: "dashboard-location-menu-name"
    }, [ _vm._v("\n\t\t\t\t\t\t\t" + _vm._s(city) + "\n\t\t\t\t\t\t") ]) ]) ]) ]);
   })), 0) : _vm._e() ]) ], 1);
  },
  staticRenderFns: []
 }, void 0, {
  extends: __vue_component__$1,
  computed: {
   activeGateway() {
    return this.bgState.vpn.selectedGateway;
   },
   isActive() {
    return this.activeGateway.country.name === this.country;
   }
  },
  methods: {
   getIconClass(country) {
    return `flag-icon-${this.getCountryId(country)}`;
   },
   getCountryId(country) {
    const fittingGateway = this.bgState.vpn.gateways.find(gateway => gateway.country.name === country);
    return fittingGateway && fittingGateway.country ? fittingGateway.country.id : "";
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 let EventCategory$1, EventAction$1, EventLabel$1;
 !function(EventCategory) {
  EventCategory.Dashboard = "Dashboard", EventCategory.ConnectionMaxReachedUpgrade = "Connection - max reached Upgrade", 
  EventCategory.ConnectionMaxReached = "Connection - max reached", EventCategory.ConnectionWentWrong = "Connection - went wrong", 
  EventCategory.ConnectionOffline = "Connection - offline", EventCategory.ConnectionInstallSecurelineVpn = "Connection - install Secureline VPN", 
  EventCategory.ConnectionOpenSecurelineVpn = "Connection - open Secureline VPN", 
  EventCategory.ConnectionInstallOurDesktop = "Connection - install our desktop", 
  EventCategory.Location = "Location", EventCategory.SubscriptionActivate = "Subscription - activate", 
  EventCategory.SubscriptionExpired = "Subscription - expired", EventCategory.SubscriptionTrialExpired = "Subscription - trial expired", 
  EventCategory.SubscriptionOnlySingle = "Subscription - only single", EventCategory.SubscriptionBanned = "Subscription - banned", 
  EventCategory.UpdateExtension = "Extension - update extension", EventCategory.UpdateVpnClient = "Extension - update client", 
  EventCategory.Burger = "Burger", EventCategory.Settings = "Settings", EventCategory.Error = "Error", 
  EventCategory.DataCollectionOnboarding = "Data Collection Onboarding";
 }(EventCategory$1 || (EventCategory$1 = {})), function(EventAction) {
  EventAction.Click = "click", EventAction.View = "view";
 }(EventAction$1 || (EventAction$1 = {})), function(EventLabel) {
  EventLabel.TurnOn = "Turn On", EventLabel.TurnOff = "Turn Off", EventLabel.Location = "Location", 
  EventLabel.Retry = "Retry", EventLabel.Upgrade = "Upgrade", EventLabel.VisitOurSupportCenter = "Visit our Support Center", 
  EventLabel.MaxConnectionsReached = "Max connections reached", EventLabel.ChooseAnotherLocation = "Choose another location", 
  EventLabel.GetSecureLineVpn = "Get SecureLine VPN", EventLabel.ChooseNewLocation = "Choose New Location", 
  EventLabel.EnterActivationCode = "Enter activation code", EventLabel.Renew = "Renew", 
  EventLabel.BuyNow = "Buy now", EventLabel.ContactSupport = "Contact support", EventLabel.WebRtcBlockerTurnOn = "WebRTC Blocker Turn On", 
  EventLabel.WebRtcBlockerTurnOff = "WebRTC Blocker Turn Off", EventLabel.DisableOtherExtension = "Disable other extension", 
  EventLabel.Help = "Help", EventLabel.About = "About", EventLabel.RateUs = "Rate us", 
  EventLabel.Feedback = "Feedback", EventLabel.Update = "Update", EventLabel.OpenSlVpnSettings = "Open SL VPN settings", 
  EventLabel.ClientVersion = "Client version", EventLabel.TurnOnUserConsent = "Turn On user consent", 
  EventLabel.TurnOffUserConsent = "Turn Off user consent", EventLabel.PrivacyPolicy = "Privacy policy";
 }(EventLabel$1 || (EventLabel$1 = {}));
 const log$6 = browser$1("vpn-dashboard-location-menu");
 const __vue_component__$l = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "dashboard-location-overlay"
   }, [ _c("header", {
    staticClass: "header -alt"
   }, [ _c("button", {
    staticClass: "header-btn",
    on: {
     click: _vm.onArrowClicked
    }
   }, [ _c("img", {
    staticClass: "g-valign--middle dashboard-location-back-arrow",
    attrs: {
     src: "/img/arrow-left.svg",
     width: "16",
     height: "16"
    }
   }) ]), _vm._v(" "), _c("h5", [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("change_location")) + "\n\t\t") ]) ]), _vm._v(" "), _c("ul", {
    staticClass: "dashboard-location-menu text"
   }, [ _c("li", {
    staticClass: "dashboard-location-menu-optimal",
    class: {
     active: _vm.isOptimalActive
    }
   }, [ _c("button", {
    staticClass: "dashboard-location-menu-btn",
    on: {
     click: _vm.onOptimalLocationClicked
    }
   }, [ _c("i", {
    staticClass: "g-margin-end--15 flag-icon",
    class: _vm.getIconClass(_vm.optimalGateway)
   }, [ _vm.isOptimalActive ? _c("img", {
    attrs: {
     src: "/img/check-green.svg",
     width: "15",
     height: "15"
    }
   }) : _vm._e() ]), _vm._v(" "), _c("span", [ _c("strong", {
    staticClass: "dashboard-location-menu-name color-ok",
    class: {
     "-text": _vm.isOptimalActive
    }
   }, [ _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.translate("optimal_location")) + "\n\t\t\t\t\t") ]), _vm._v(" "), _c("span", {
    staticClass: "dashboard-location-menu-name"
   }, [ _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.optimalGatewayDisplayName) + "\n\t\t\t\t\t") ]) ]) ]) ]), _vm._v(" "), _vm._l(_vm.countries, (function(country) {
    return _c("location-menu-item", {
     key: country,
     attrs: {
      "bg-state": _vm.bgState,
      country: country,
      "country-map": _vm.countryMap,
      "show-cities": _vm.showCities,
      "selected-multi-city-country": _vm.selectedMultiCityCountry
     },
     on: {
      "city-clicked": _vm.onCityClicked,
      "chevron-clicked": _vm.onChevronClicked,
      "country-clicked": _vm.onCountryClicked
     }
    });
   })) ], 2) ]);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   LocationMenuItem: __vue_component__$k
  },
  extends: __vue_component__$2,
  computed: {
   isOptimalActive() {
    return this.optimalGateway.id === this.selectedGateway.id;
   }
  },
  methods: {
   onArrowClicked() {
    this.$emit("toggleDropdown");
   },
   getIconClass: gateway => `flag-icon-${gateway.country.id}`,
   closeDropdown() {
    this.showCities = !1, this.selectedMultiCityCountry = "", this.$emit("toggleDropdown");
   },
   onChevronClicked(country) {
    log$6("Chevron clicked for multicity country: %s", country), "" === this.selectedMultiCityCountry ? (this.showCities = !this.showCities, 
    this.selectedMultiCityCountry = country) : country === this.selectedMultiCityCountry ? this.showCities = !this.showCities : (this.showCities = !0, 
    this.selectedMultiCityCountry = country);
   },
   onCountryClicked(country) {
    if (this.isMultiCity(country)) {
     const citiesInCountry = this.gateways.filter(gw => gw.country.name === country);
     this.selectedGateway = citiesInCountry[Math.floor(Math.random() * citiesInCountry.length)];
    } else this.selectedGateway = this.gateways.find(gw => gw.country.name === country);
    log$6("Selected country: %s. Selected gateway id: %s", country, this.selectedGateway.id), 
    this.onAnyLocationClick();
   },
   onCityClicked(country, city) {
    this.selectedGateway = this.bgState.vpn.gateways.find(gw => gw.country.name === country && gw.city.name === city), 
    log$6("Selected city: %s. Selected gateway id: %s", city, this.selectedGateway.id), 
    this.onAnyLocationClick();
   },
   onOptimalLocationClicked() {
    this.selectedGateway = this.bgState.vpn.optimalGateway, log$6("Selected optimal location. Selected gateway id: %s", this.selectedGateway.id), 
    this.onAnyLocationClick();
   },
   onAnyLocationClick() {
    this.selectGatewayAndPossiblyConnect(), this.trackChangeLocationEvent(), this.closeDropdown();
   },
   selectGatewayAndPossiblyConnect() {
    sendActionToBg(vpnActions_gatewaySelected(this.selectedGateway)), this.bgState.vpn.vpnStatus === VpnStatus.Disconnected && (log$6("Forcing connect"), 
    sendActionToBg(vpnActions_connect()));
   },
   trackChangeLocationEvent() {
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Location, EventAction$1.Click, `${EventLabel$1.ChooseNewLocation} - ${convertLegacyGatewayId(this.selectedGateway.id)}`));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$7 = browser$1("vpn-dashboard-location");
 const __vue_component__$m = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "dashboard-location",
    class: {
     disabled: _vm.isDisabled
    }
   }, [ _c("div", {
    staticClass: "dashboard-location-details g-margin-bottom--20 text"
   }, [ _c("i", {
    staticClass: "g-margin-end--15 flag-icon",
    class: _vm.selectedGatewayIconClass
   }), _vm._v("\n\t\t" + _vm._s(_vm.selectedGatewayDisplayName) + "\n\t") ]), _vm._v(" "), _c("button", {
    staticClass: "btn -small -secondary",
    attrs: {
     disabled: _vm.isDisabled
    },
    on: {
     click: _vm.onDropdownToggleClicked
    }
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("change_location")) + "\n\t") ]), _vm._v(" "), _c("transition", {
    attrs: {
     name: "location"
    }
   }, [ _c("location-menu", {
    directives: [ {
     name: "show",
     rawName: "v-show",
     value: _vm.showDropdown,
     expression: "showDropdown"
    } ],
    attrs: {
     "bg-state": _vm.bgState,
     "optimal-gateway-display-name": _vm.optimalGatewayShortDisplayName
    },
    on: {
     toggleDropdown: _vm.onDropdownToggleClicked
    }
   }) ], 1) ], 1);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   LocationMenu: __vue_component__$l
  },
  extends: __vue_component__$3,
  computed: {
   isDisabled() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Connecting || this.bgState.vpn.isReconnectingToAnotherGateway || this.bgState.vpn.vpnStatus === VpnStatus.Reconnecting || this.bgState.vpn.vpnStatus === VpnStatus.Disconnecting;
   },
   selectedGatewayIconClass() {
    let selectedGatewayDisplayCountryId;
    return selectedGatewayDisplayCountryId = this.bgState.vpn.selectedGateway.id === this.bgState.vpn.optimalGateway.id ? this.optimalGateway.country.id : this.bgState.vpn.selectedGateway.country.id, 
    `flag-icon-${selectedGatewayDisplayCountryId}`;
   },
   optimalGatewayShortDisplayName() {
    return "optimal_unknown" !== this.bgState.vpn.optimalGateway.id ? `(${this.bgState.vpn.optimalGateway.country.name})` : "";
   }
  },
  methods: {
   onDropdownToggleClicked() {
    this.isDisabled || (this.showDropdown = !this.showDropdown, log$7("Dropdown menu clicked! showDropdown = %s", this.showDropdown), 
    log$7("selectedGateway: %s. optimalGateway: %s.", this.bgState.vpn.selectedGateway.id, this.bgState.vpn.optimalGateway.id), 
    this.showDropdown && sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Dashboard, EventAction$1.Click, EventLabel$1.Location)), 
    this.$emit("location-menu-visibility-changed", this.showDropdown));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), subscriptionsUrl = "#settings/subscription";
 const __vue_component__$n = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _vm.showMenu ? _c("div", {
    staticClass: "settings-menu text -small -strong"
   }, [ _vm.helpUrl ? _c("button", {
    staticClass: "settings-menu-item",
    on: {
     click: _vm.helpClick
    }
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("help")) + "\n\t") ]) : _vm._e(), _vm._v(" "), _vm.helpUrl ? _c("div", {
    staticClass: "settings-separator"
   }) : _vm._e(), _vm._v(" "), _vm.feedbackUrl ? _c("button", {
    staticClass: "settings-menu-item",
    on: {
     click: _vm.feedbackClick
    }
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("feedback")) + "\n\t") ]) : _vm._e(), _vm._v(" "), _vm.feedbackUrl ? _c("div", {
    staticClass: "settings-separator"
   }) : _vm._e(), _vm._v(" "), _vm.rateUsUrl ? _c("button", {
    staticClass: "settings-menu-item",
    on: {
     click: _vm.rateUsClick
    }
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("rate_us")) + "\n\t") ]) : _vm._e() ]) : _vm._e();
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  computed: {
   feedbackUrl() {
    return this.bgState.shepherd.config.popup.urlFeedback;
   },
   helpUrl() {
    return this.bgState.shepherd.config.popup.urlHelp;
   },
   rateUsUrl() {
    switch (runtimeInfo.browser) {
    case Browser.Chrome:
     return this.bgState.shepherd.config.popup.urlRateUsChrome;

    case Browser.Firefox:
     return this.bgState.shepherd.config.popup.urlRateUsFirefox;
    }
    return null;
   },
   showMenu() {
    return this.feedbackUrl || this.helpUrl || this.rateUsUrl;
   }
  },
  methods: {
   feedbackClick() {
    openUrlInNewTab(addUtmParams(this.feedbackUrl, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, EventLabel$1.Feedback));
   },
   helpClick() {
    openUrlInNewTab(addUtmParams(this.helpUrl, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, EventLabel$1.Help));
   },
   rateUsClick() {
    openUrlInNewTab(addUtmParams(this.rateUsUrl, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, EventLabel$1.RateUs));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 let WebRtcActionTypes;
 !function(WebRtcActionTypes) {
  WebRtcActionTypes.IsSupportedChange = "webrtc.isSupportedChange", WebRtcActionTypes.IsAvailableChange = "webrtc.isAvailableChange", 
  WebRtcActionTypes.IsEnabledChange = "webrtc.isEnabledChange", WebRtcActionTypes.Toggle = "webrtc.toggle", 
  WebRtcActionTypes.DisableConflictingExtensions = "webrtc.disableConflictingExtensions";
 }(WebRtcActionTypes || (WebRtcActionTypes = {}));
 const webRtcActions_disableConflictingExtensions = () => createAction(WebRtcActionTypes.DisableConflictingExtensions), webRtcActions_toggle = () => createAction(WebRtcActionTypes.Toggle), log$8 = browser$1("popup-settings-webrtc");
 const __vue_component__$o = normalizeComponent({
  render: function() {
   var _obj, _obj$1, _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", [ _vm.webRtcProtectionNotAvailable ? _c("div", {
    staticClass: "settings-item-blocked"
   }, [ _c("img", {
    attrs: {
     src: "/img/info.svg",
     width: "24",
     height: "24"
    }
   }), _vm._v(" "), _c("div", {
    staticClass: "settings-item-blocked-text text -tiny"
   }, [ _c("p", {
    staticClass: "g-margin-bottom--5"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("webrtc_blocker_disabled")) + "\n\t\t\t") ]), _vm._v(" "), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.disableOtherExtension
    }
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("disable_other_extension")) + "\n\t\t\t") ]) ]) ]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "settings-item"
   }, [ _c("div", {
    staticClass: "settings-item-switch",
    class: {
     "g-margin-top--15": _vm.webRtcProtectionNotAvailable
    }
   }, [ _c("div", {
    staticClass: "text -small -strong"
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("webrtc_blocker")) + "\n\t\t\t") ]), _vm._v(" "), _c("div", {
    staticClass: "switch__holder"
   }, [ _c("button", {
    staticClass: "switch -small",
    class: {
     "-checked": _vm.webRtcProtectionEnabled
    },
    attrs: {
     role: "switch",
     disabled: _vm.webRtcProtectionNotAvailable
    },
    on: {
     click: _vm.toggleWebRtcProtection
    }
   }, [ _c("span", {
    staticClass: "switch__txt -on",
    class: (_obj = {}, _obj["-length-" + _vm.onLabel.length] = !0, _obj["-visible"] = _vm.webRtcProtectionEnabled && _vm.onLabel.length <= 5, 
    _obj)
   }, [ _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.onLabel) + "\n\t\t\t\t\t") ]), _vm._v(" "), _c("span", {
    staticClass: "switch__txt -off",
    class: (_obj$1 = {}, _obj$1["-length-" + _vm.offLabel.length] = !0, _obj$1["-visible"] = !_vm.webRtcProtectionEnabled && _vm.offLabel.length <= 5, 
    _obj$1)
   }, [ _vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.offLabel) + "\n\t\t\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "switch__handle"
   }, [ _vm.webRtcProtectionEnabled ? _c("img", {
    staticClass: "switch-icon",
    attrs: {
     width: "8",
     height: "8",
     src: "/img/check.svg"
    }
   }) : _c("img", {
    staticClass: "switch-icon",
    attrs: {
     width: "8",
     height: "8",
     src: "/img/times.svg"
    }
   }) ]) ]) ]), _vm._v(" "), _c("div", {
    staticClass: "settings-item-description text -tiny -secondary g-margin-top--10"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("webrtc_blocker_description")) + "\n\t\t") ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  computed: {
   onLabel() {
    return this.translate("on");
   },
   offLabel() {
    return this.translate("off");
   },
   webRtcProtectionSupported() {
    return this.bgState.webRtc.isSupported;
   },
   webRtcProtectionNotAvailable() {
    return !this.bgState.webRtc.isAvailable;
   },
   webRtcProtectionEnabled() {
    return this.bgState.webRtc.isEnabled;
   }
  },
  methods: {
   disableOtherExtension() {
    log$8("Disable WebRTC blocking extension clicked"), sendActionToBg(webRtcActions_disableConflictingExtensions()), 
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, EventLabel$1.DisableOtherExtension));
   },
   toggleWebRtcProtection() {
    log$8("toggling WebRTC setting"), sendActionToBg(webRtcActions_toggle()), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, this.webRtcProtectionEnabled ? EventLabel$1.WebRtcBlockerTurnOff : EventLabel$1.WebRtcBlockerTurnOn));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$9 = browser$1("popup-settings-optin");
 const __vue_component__$p = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "settings-item g-padding--25"
   }, [ _c("div", {
    staticClass: "settings-item-checkbox"
   }, [ _c("div", {
    staticClass: "text -small -strong"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("help_us_improve")) + "\n\t\t") ]), _vm._v(" "), _c("div", {
    staticClass: "opt-checkbox"
   }, [ _c("input", {
    directives: [ {
     name: "model",
     rawName: "v-model",
     value: _vm.optUserConsent,
     expression: "optUserConsent"
    } ],
    staticClass: "checkbox",
    attrs: {
     type: "checkbox"
    },
    domProps: {
     checked: Array.isArray(_vm.optUserConsent) ? _vm._i(_vm.optUserConsent, null) > -1 : _vm.optUserConsent
    },
    on: {
     change: function($event) {
      var $$a = _vm.optUserConsent, $$el = $event.target, $$c = !!$$el.checked;
      if (Array.isArray($$a)) {
       var $$i = _vm._i($$a, null);
       $$el.checked ? $$i < 0 && (_vm.optUserConsent = $$a.concat([ null ])) : $$i > -1 && (_vm.optUserConsent = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      } else _vm.optUserConsent = $$c;
     }
    }
   }) ]) ]), _vm._v(" "), _c("div", {
    staticClass: "settings-comp-description text -tiny -secondary g-margin-top--10"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("analyze_anonymous_usage_data_to_help_fix_bugs_and_improve_this_extension")) + "\n\t\t"), _c("span", {
    staticClass: "g-display--inline-block",
    domProps: {
     innerHTML: _vm._s(_vm.translate("see_our_privacy_policy"))
    },
    on: {
     click: _vm.privacyClick
    }
   }) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  computed: {
   privacyUrl: () => "https://www.avast.com/vpn-policy",
   optUserConsent: {
    get() {
     return this.bgState.analytics.userConsent;
    },
    set(value) {
     log$9("Opt-in Change"), sendActionToBg(analyticsActions_userConsentChange(value)), 
     sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, this.optUserConsent ? EventLabel$1.TurnOnUserConsent : EventLabel$1.TurnOffUserConsent));
    }
   }
  },
  methods: {
   privacyClick(e) {
    "A" === e.target.tagName && (openUrlInNewTab(addUtmParams(this.privacyUrl, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, EventLabel$1.PrivacyPolicy)));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$a = browser$1("settings");
 const __vue_component__$q = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "settings text -small"
   }, [ _c("div", {
    staticClass: "header -alt"
   }, [ _c("button", {
    staticClass: "header-btn",
    on: {
     click: function($event) {
      return _vm.$emit("close-clicked");
     }
    }
   }, [ _c("img", {
    attrs: {
     src: "/img/close.svg",
     width: "18",
     height: "18"
    }
   }) ]), _vm._v(" "), _c("h5", [ _vm._v(_vm._s(_vm.translate("settings"))) ]) ]), _vm._v(" "), _c("div", {
    staticClass: "settings-content"
   }, [ _c("settings-web-rtc", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }), _vm._v(" "), _c("settings-opt-in", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }), _vm._v(" "), _c("settings-menu", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) ], 1), _vm._v(" "), _c("button", {
    staticClass: "settings-open-vpn",
    on: {
     click: _vm.onOpenSettingsClick
    }
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-open.svg",
     width: "14",
     height: "14"
    }
   }), _vm._v("\n\t\t" + _vm._s(_vm.translate("open_settings")) + "\n\t") ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   SettingsMenu: __vue_component__$n,
   SettingsWebRtc: __vue_component__$o,
   SettingsOptIn: __vue_component__$p
  },
  props: {
   bgState: Object
  },
  created() {
   sendActionToBg(analyticsActions_trackView(EventCategory$1.Settings));
  },
  methods: {
   onOpenSettingsClick() {
    log$a("Opening app settings"), sendActionToBg(vpnActions_showMainWindow("#settings/general")), 
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, EventLabel$1.OpenSlVpnSettings));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$r = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "dashboard"
   }, [ _c("transition", {
    attrs: {
     name: "settings"
    }
   }, [ _vm.isShowSettings ? _c("settings", {
    attrs: {
     "bg-state": _vm.bgState
    },
    on: {
     "close-clicked": _vm.onCloseClicked
    }
   }) : _vm._e() ], 1), _vm._v(" "), _c("div", {
    staticClass: "dashboard-wrapper"
   }, [ _c("connection-switch", {
    attrs: {
     "bg-state": _vm.bgState
    },
    on: {
     "switch-turn-off": _vm.onSwitchTurnOff,
     "switch-turn-on": _vm.onSwitchTurnOn
    }
   }) ], 1), _vm._v(" "), _c("ip-address", {
    attrs: {
     "bg-state": _vm.bgState,
     "is-show-dashboard": _vm.isShowDashboard
    }
   }), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary -center g-margin-bottom--15"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("selected_location")) + "\n\t") ]), _vm._v(" "), _c("location", {
    attrs: {
     "bg-state": _vm.bgState
    },
    on: {
     "location-menu-visibility-changed": _vm.onLocationMenuVisibilityChanged
    }
   }) ], 1);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   ConnectionSwitch: __vue_component__$i,
   IpAddress: __vue_component__$j,
   Location: __vue_component__$m,
   Settings: __vue_component__$q
  },
  extends: __vue_component__$5,
  props: {
   isShowDashboard: Boolean,
   isShowSettings: Boolean
  },
  computed: {
   isConnected() {
    return this.bgState.vpn.vpnStatus === VpnStatus.Connected;
   }
  },
  created() {
   this.trackAppropriateView(!1);
  },
  methods: {
   onCloseClicked() {
    this.$emit("menu-clicked");
   },
   onSwitchTurnOff() {
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Dashboard, EventAction$1.Click, EventLabel$1.TurnOff));
   },
   onSwitchTurnOn() {
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Dashboard, EventAction$1.Click, EventLabel$1.TurnOn));
   },
   onLocationMenuVisibilityChanged(menuVisible) {
    this.trackAppropriateView(menuVisible);
   },
   trackAppropriateView(menuVisible) {
    let view, label;
    menuVisible ? (view = EventCategory$1.Location, this.bgState.vpn.selectedGateway && this.bgState.vpn.selectedGateway.id && (label = convertLegacyGatewayId(this.bgState.vpn.selectedGateway.id))) : (view = EventCategory$1.Dashboard, 
    label = this.isConnected ? EventLabel$1.TurnOn : EventLabel$1.TurnOff), this.trackView(view, label);
   },
   trackView(view, label) {
    sendActionToBg(analyticsActions_trackView(view, label));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$s = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("header", {
    staticClass: "header"
   }, [ _vm.isShowDashboard ? _c("button", {
    staticClass: "header-btn",
    on: {
     click: function($event) {
      return _vm.$emit("menu-clicked");
     }
    }
   }, [ _c("img", {
    staticClass: "g-valign--middle ",
    attrs: {
     src: "/img/settings.svg",
     width: "18",
     height: "18"
    }
   }) ]) : _vm._e(), _vm._v(" "), _c("h5", [ _c("img", {
    staticClass: "g-valign--middle header-logo",
    attrs: {
     src: "/img/image-logo-secureline.svg",
     width: "24",
     height: "24"
    }
   }), _vm._v("\n\t\t" + _vm._s(_vm.translate("product_name")) + "\n\t") ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  extends: __vue_component__$7
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$b = browser$1("vpn-activate-license");
 const __vue_component__$t = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-48-status-critical.svg",
     width: "48",
     height: "48"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-top--15 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("activate_vpn_product_title")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--25"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate(_vm.messageStringId)) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("need_help")) + "\n\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onSupportCenterLinkClick
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("support_center_link")) + "\n\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "notification-btn"
   }, [ _c("button", {
    staticClass: "btn -large -shadow",
    on: {
     click: _vm.onEnterActivationClick
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("enter_code")) + "\n\t\t") ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  computed: {
   messageStringId: () => runtimeInfo.os === OperatingSystem.Mac ? "activate_vpn_product_msg_mac" : "activate_vpn_product_msg_win"
  },
  created() {
   sendActionToBg(analyticsActions_trackView(EventCategory$1.SubscriptionActivate));
  },
  methods: {
   onEnterActivationClick() {
    log$b("Opening UI with URL: %s", subscriptionsUrl), sendActionToBg(vpnActions_showMainWindow(subscriptionsUrl)), 
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.SubscriptionActivate, EventAction$1.Click, EventLabel$1.EnterActivationCode));
   },
   onSupportCenterLinkClick() {
    openUrlInNewTab(addUtmParams(this.bgState.shepherd.config.popup.urlSupport, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.SubscriptionActivate, EventAction$1.Click, EventLabel$1.VisitOurSupportCenter));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$c = browser$1("vpn-data-collection-consent");
 const __vue_component__$u = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("img", {
    attrs: {
     src: "/img/data-collection.svg",
     width: "80",
     height: "80"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("want_to_improve_your_vpn_extension")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--25"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("if_you_agree_we_ll_analyze_anonymous_usage_data")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30",
    domProps: {
     innerHTML: _vm._s(_vm.translate("see_our_privacy_policy"))
    },
    on: {
     click: _vm.onPrivacyClick
    }
   }), _vm._v(" "), _c("div", {
    staticClass: "notification-btn"
   }, [ _c("button", {
    staticClass: "btn -large -primary -shadow g-margin-bottom--15",
    on: {
     click: _vm.onYesButtonClicked
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("yes_i_agree")) + "\n\t\t") ]), _vm._v(" "), _c("button", {
    staticClass: "btn -large -secondary",
    on: {
     click: _vm.onNoButtonClicked
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("no_thanks")) + "\n\t\t") ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  computed: {
   messageStringId: () => runtimeInfo.os === OperatingSystem.Mac ? "activate_vpn_product_msg_mac" : "activate_vpn_product_msg_win"
  },
  created() {
   sendActionToBg(analyticsActions_trackView(EventCategory$1.SubscriptionActivate));
  },
  methods: {
   onYesButtonClicked() {
    log$c("enabling data collection"), sendActionToBg(analyticsActions_userConsentChange(!0)), 
    sendActionToBg(analyticsActions_trackInstall()), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.DataCollectionOnboarding, EventAction$1.Click, EventLabel$1.TurnOnUserConsent));
   },
   onNoButtonClicked() {
    log$c("keeping data collection disabled"), sendActionToBg(analyticsActions_userConsentChange(!1)), 
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.DataCollectionOnboarding, EventAction$1.Click, EventLabel$1.TurnOffUserConsent));
   },
   onPrivacyClick(e) {
    "A" === e.target.tagName && (openUrlInNewTab(addUtmParams("https://www.avast.com/vpn-policy", {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.Settings, EventAction$1.Click, EventLabel$1.PrivacyPolicy)));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$v = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-48-status-attention.svg",
     width: "48",
     height: "48"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-top--15 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("something_wrong_title")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--25"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("something_wrong_message_first")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("something_wrong_message_second")) + "\n\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onSupportCenterLinkClick
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("something_wrong_message_support")) + "\n\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "notification-btn"
   }, [ _c("button", {
    staticClass: "btn -secondary -large",
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("ok")) + "\n\t\t") ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  extends: __vue_component__$6,
  props: {
   bgState: Object
  },
  created() {
   let label;
   this.bgState.vpn.vpnApiError && this.bgState.vpn.vpnApiError.type ? (label = this.bgState.vpn.vpnApiError.type, 
   this.bgState.vpn.vpnApiError.exception && this.bgState.vpn.vpnApiError.exception.errorMessage && (label += ` (${this.bgState.vpn.vpnApiError.exception.errorMessage})`)) : this.bgState.vpn.errorInfo && this.bgState.vpn.errorInfo.code && (label = this.bgState.vpn.errorInfo.code), 
   sendActionToBg(analyticsActions_trackView(EventCategory$1.Error), label);
  },
  methods: {
   onSupportCenterLinkClick() {
    openUrlInNewTab(addUtmParams(this.bgState.shepherd.config.popup.urlSupport, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    }));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$w = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-48-status-attention.svg",
     width: "48",
     height: "48"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-top--15 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("please_install_title")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--25"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate(_vm.messageStringId)) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("need_help")) + "\n\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onSupportCenterLinkClick
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("support_center_link")) + "\n\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "notification-btn"
   }, [ _c("button", {
    staticClass: "btn -large",
    on: {
     click: _vm.onGetVpnClicked
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("get_vpn")) + "\n\t\t") ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  computed: {
   messageStringId: () => runtimeInfo.os === OperatingSystem.Mac ? "please_install_message_mac" : "please_install_message_win"
  },
  created() {
   sendActionToBg(analyticsActions_trackView(EventCategory$1.ConnectionInstallSecurelineVpn));
  },
  methods: {
   onGetVpnClicked() {
    openUrlInNewTab(addUtmParams(this.bgState.shepherd.config.popup.urlGetVpn, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.ConnectionInstallSecurelineVpn, EventAction$1.Click, EventLabel$1.GetSecureLineVpn));
   },
   onSupportCenterLinkClick() {
    openUrlInNewTab(addUtmParams(this.bgState.shepherd.config.popup.urlSupport, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.ConnectionInstallSecurelineVpn, EventAction$1.Click, EventLabel$1.VisitOurSupportCenter));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$x = normalizeComponent({
  render: function() {
   var _h = this.$createElement;
   this._self._c;
   return this._m(0);
  },
  staticRenderFns: [ function() {
   var _h = this.$createElement, _c = this._self._c || _h;
   return _c("div", {
    staticClass: "loading"
   }, [ _c("div", {
    staticClass: "spinner"
   }) ]);
  } ]
 }, void 0, {}, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$y = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-48-status-attention.svg",
     width: "48",
     height: "48"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-top--15 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("youre_offline_title")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("youre_offline_message")) + "\n\t") ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  created() {
   sendActionToBg(analyticsActions_trackView(EventCategory$1.ConnectionOffline));
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$d = browser$1("vpn-subscription-expired");
 const __vue_component__$z = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("div", {
    staticClass: "notification-content"
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-48-status-critical.svg",
     width: "48",
     height: "48"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-top--15 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("subscription_expired_title")) + "\n\t\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--25"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("subscription_expired_message")) + "\n\t\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("need_help")) + "\n\t\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onSupportCenterLinkClick
    }
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("support_center_link")) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "notification-btn"
   }, [ _c("button", {
    staticClass: "btn -large -shadow",
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("renew")) + "\n\t\t\t") ]) ]) ]), _vm._v(" "), _c("footer", {
    staticClass: "notification-footer"
   }, [ _c("p", {
    staticClass: "text -small -secondary"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("already_subscribed")) + "\n\t\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onEnterActivationClick
    }
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("enter_code")) + "\n\t\t\t") ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  created() {
   sendActionToBg(analyticsActions_trackView(EventCategory$1.SubscriptionExpired));
  },
  methods: {
   onSupportCenterLinkClick() {
    openUrlInNewTab(addUtmParams(this.bgState.shepherd.config.popup.urlSupport, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.SubscriptionExpired, EventAction$1.Click, EventLabel$1.VisitOurSupportCenter));
   },
   onEnterActivationClick() {
    log$d("Opening UI with URL: %s", subscriptionsUrl), sendActionToBg(vpnActions_showMainWindow(subscriptionsUrl)), 
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.SubscriptionExpired, EventAction$1.Click, EventLabel$1.EnterActivationCode));
   },
   onBtnClicked() {
    log$d("Opening nag with ID %d", 2), sendActionToBg(vpnActions_showNag(2, "browserextension")), 
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.SubscriptionExpired, EventAction$1.Click, EventLabel$1.Renew));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0), log$e = browser$1("vpn-trial-expired");
 const __vue_component__$A = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("div", {
    staticClass: "notification-content"
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-48-status-critical.svg",
     width: "48",
     height: "48"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-top--15 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("trial_expired_title")) + "\n\t\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--25"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("trial_expired_message")) + "\n\t\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("need_help")) + "\n\t\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onSupportCenterLinkClick
    }
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("support_center_link")) + "\n\t\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "notification-btn"
   }, [ _c("button", {
    staticClass: "btn -large -shadow",
    on: {
     click: _vm.onBtnClicked
    }
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("buy_now")) + "\n\t\t\t") ]) ]) ]), _vm._v(" "), _c("footer", {
    staticClass: "notification-footer"
   }, [ _c("p", {
    staticClass: "text -small -secondary"
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("already_subscribed")) + "\n\t\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onEnterActivationClick
    }
   }, [ _vm._v("\n\t\t\t\t" + _vm._s(_vm.translate("enter_code")) + "\n\t\t\t") ]) ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  methods: {
   onSupportCenterLinkClick() {
    openUrlInNewTab(addUtmParams(this.bgState.shepherd.config.popup.urlSupport, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.SubscriptionTrialExpired, EventAction$1.Click, EventLabel$1.VisitOurSupportCenter));
   },
   onEnterActivationClick() {
    log$e("Opening UI with URL: %s", subscriptionsUrl), sendActionToBg(vpnActions_showMainWindow(subscriptionsUrl)), 
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.SubscriptionTrialExpired, EventAction$1.Click, EventLabel$1.EnterActivationCode));
   },
   onBtnClicked() {
    log$e("Opening nag with ID %d", 2), sendActionToBg(vpnActions_showNag(2, "browserextension")), 
    sendActionToBg(analyticsActions_trackEvent(EventCategory$1.SubscriptionTrialExpired, EventAction$1.Click, EventLabel$1.BuyNow));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$B = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-48-status-attention.svg",
     width: "48",
     height: "48"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-top--15 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("update_extension_title")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--25"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("update_extension_message")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("need_help")) + "\n\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onSupportCenterLinkClick
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("support_center_link")) + "\n\t\t") ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  created() {
   const productVersion = this.bgState.vpn.productInfo && this.bgState.vpn.productInfo.version;
   sendActionToBg(analyticsActions_trackView(EventCategory$1.UpdateExtension, `${EventLabel$1.ClientVersion} ${productVersion || "unknown"}`));
  },
  methods: {
   onSupportCenterLinkClick() {
    openUrlInNewTab(addUtmParams(this.bgState.shepherd.config.popup.urlSupport, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    }));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$C = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "notification"
   }, [ _c("img", {
    attrs: {
     src: "/img/icon-48-status-attention.svg",
     width: "48",
     height: "48"
    }
   }), _vm._v(" "), _c("h4", {
    staticClass: "h4 g-margin-top--15 g-margin-bottom--15"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("update_application_title")) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--25"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate(_vm.messageStringId)) + "\n\t") ]), _vm._v(" "), _c("p", {
    staticClass: "text -small -secondary g-margin-bottom--30"
   }, [ _vm._v("\n\t\t" + _vm._s(_vm.translate("need_help")) + "\n\t\t"), _c("button", {
    staticClass: "a",
    on: {
     click: _vm.onSupportCenterLinkClick
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("support_center_link")) + "\n\t\t") ]) ]), _vm._v(" "), _c("div", {
    staticClass: "notification-btn"
   }, [ _c("button", {
    staticClass: "btn -large -shadow",
    on: {
     click: _vm.onUpdateClicked
    }
   }, [ _vm._v("\n\t\t\t" + _vm._s(_vm.translate("update")) + "\n\t\t") ]) ]) ]);
  },
  staticRenderFns: []
 }, void 0, {
  props: {
   bgState: Object
  },
  computed: {
   messageStringId: () => runtimeInfo.os === OperatingSystem.Mac ? "update_application_message_mac" : "update_application_message_win"
  },
  created() {
   const productVersion = this.bgState.vpn.productInfo && this.bgState.vpn.productInfo.version;
   sendActionToBg(analyticsActions_trackView(EventCategory$1.UpdateExtension, `${EventLabel$1.ClientVersion} ${productVersion || "unknown"}`));
  },
  methods: {
   onSupportCenterLinkClick() {
    openUrlInNewTab(addUtmParams(this.bgState.shepherd.config.popup.urlSupport, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    }));
   },
   onUpdateClicked() {
    openUrlInNewTab(addUtmParams(runtimeInfo.os === OperatingSystem.Mac ? this.bgState.shepherd.config.popup.urlDownloadClientMac : this.bgState.shepherd.config.popup.urlDownloadClientWin, {
     campaign: this.bgState.shepherd.config.analytics.utmCampaign
    })), sendActionToBg(analyticsActions_trackEvent(EventCategory$1.UpdateVpnClient, EventAction$1.Click, EventLabel$1.Update));
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 const __vue_component__$D = normalizeComponent({
  render: function() {
   var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
   return _c("div", {
    staticClass: "avs container -popup",
    attrs: {
     id: "app"
    }
   }, [ _c("Header", {
    attrs: {
     "is-show-dashboard": _vm.isShowDashboard
    },
    on: {
     "menu-clicked": _vm.toggleSettings
    }
   }), _vm._v(" "), _vm.showDataCollectionDialog ? _c("DataCollection", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _vm.showErrorOccurred ? _c("Error", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _vm.showNativeMessagingHostNotFound ? _c("InstallVpnClient", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _vm.showExtensionOld ? _c("UpdateExtension", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _vm.showVpnClientOld ? _c("UpdateVpnClient", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _vm.isLoading ? _c("Loading") : _vm.showSubscriptionExpired ? _c("SubscriptionExpired", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _vm.showTrialExpired ? _c("TrialExpired", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _vm.showVpnLicenseInactive ? _c("ActivateVpnLicense", {
    attrs: {
     "bg-state": _vm.bgState
    }
   }) : _vm.showOffline ? _c("Offline") : _c("Dashboard", {
    attrs: {
     "bg-state": _vm.bgState,
     "is-show-dashboard": _vm.isShowDashboard,
     "is-show-settings": _vm.showSettings
    },
    on: {
     "menu-clicked": _vm.toggleSettings
    }
   }) ], 1);
  },
  staticRenderFns: []
 }, void 0, {
  components: {
   DataCollection: __vue_component__$u,
   ActivateVpnLicense: __vue_component__$t,
   Dashboard: __vue_component__$r,
   Error: __vue_component__$v,
   Header: __vue_component__$s,
   InstallVpnClient: __vue_component__$w,
   Loading: __vue_component__$x,
   Offline: __vue_component__$y,
   SubscriptionExpired: __vue_component__$z,
   TrialExpired: __vue_component__$A,
   UpdateExtension: __vue_component__$B,
   UpdateVpnClient: __vue_component__$C
  },
  extends: __vue_component__$h,
  data: () => ({
   showSettings: !1
  }),
  computed: {
   showOffline() {
    return this.bgState.vpn.vpnStatus !== VpnStatus.Connected && this.bgState.vpn.vpnStatus !== VpnStatus.Connecting && this.bgState.vpn.vpnStatus !== VpnStatus.Disconnecting && this.bgState.vpn.vpnStatus !== VpnStatus.Reconnecting && this.bgState.vpn.notifications.includes(NotificationType.Offline);
   },
   showSubscriptionExpired() {
    return this.bgState.vpn.notifications.includes(NotificationType.SubscriptionExpired);
   },
   showTrialExpired() {
    return this.bgState.vpn.notifications.includes(NotificationType.TrialExpired);
   },
   isShowDashboard() {
    return !(this.showDataCollectionDialog || this.showOffline || this.showExtensionOld || this.showVpnClientOld || this.showNativeMessagingHostNotFound || this.showVpnLicenseInactive || this.showErrorOccurred);
   },
   showExtensionOld() {
    return this.bgState.vpn.notifications.includes(NotificationType.UpdateExtension);
   },
   showVpnClientOld() {
    return this.bgState.vpn.notifications.includes(NotificationType.UpdateVpnClient);
   },
   showNativeMessagingHostNotFound() {
    return this.bgState.vpn.notifications.includes(NotificationType.InstallVpnClient);
   },
   showVpnLicenseInactive() {
    return this.bgState.vpn.notifications.includes(NotificationType.ActivateVpnLicense);
   },
   showErrorOccurred() {
    return this.bgState.vpn.notifications.includes(NotificationType.Error);
   },
   showDataCollectionDialog() {
    return runtimeInfo.browser === Browser.Firefox && this.bgState.analytics.userConsentSource === UserConsentSource.Preset;
   }
  },
  methods: {
   toggleSettings() {
    this.showSettings = !this.showSettings;
   }
  }
 }, void 0, !1, void 0, !1, void 0, void 0, void 0);
 var rootComponent, extraOptions;
 rootComponent = __vue_component__$D, browserStorage.init().then(connectToBackground).then(bgState => {
  initVue(bgState, rootComponent, extraOptions);
 });
}(Vue);
