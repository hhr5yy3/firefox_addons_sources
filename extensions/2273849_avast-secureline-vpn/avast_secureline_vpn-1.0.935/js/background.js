!function() {
 "use strict";
 function createAction(type, value) {
  return void 0 === value ? {
   type: type
  } : {
   type: type,
   value: value
  };
 }
 let ProxyActionTypes, ProxyState, ChromeProxyConfigMode, IFirefoxProxyInfoType, UninstallTabType, ShepherdActionTypes;
 !function(ProxyActionTypes) {
  ProxyActionTypes.IsAvailableChange = "proxy.isAvailable", ProxyActionTypes.StateChange = "proxy.stateChange", 
  ProxyActionTypes.SelectedLocationChange = "proxy.selectedLocationChange", ProxyActionTypes.Connect = "proxy.connect", 
  ProxyActionTypes.Disconnect = "proxy.disconnect", ProxyActionTypes.CredentialsConfigInvalid = "proxy.credentialsConfigInvalid", 
  ProxyActionTypes.CredentialsConfigReceived = "proxy.credentialsConfigReceived", 
  ProxyActionTypes.LocationsConfigReceived = "proxy.locationsConfigReceived", ProxyActionTypes.AutoConnectEnabledChange = "proxy.autoConnectEnabledChange", 
  ProxyActionTypes.AutoConnectSiteAdd = "proxy.autoConnectSiteAdd", ProxyActionTypes.AutoConnectSiteRemove = "proxy.autoConnectSiteRemove", 
  ProxyActionTypes.AutoConnectSiteChange = "proxy.autoConnectSiteChange", ProxyActionTypes.DisableConflictingExtensions = "proxy.disableConflictingExtensions", 
  ProxyActionTypes.GetState = "proxy.getState";
 }(ProxyActionTypes || (ProxyActionTypes = {})), function(ProxyState) {
  ProxyState.Connecting = "connecting", ProxyState.Connected = "connected", ProxyState.Disconnected = "disconnected", 
  ProxyState.Disconnecting = "disconnecting";
 }(ProxyState || (ProxyState = {})), function(ChromeProxyConfigMode) {
  ChromeProxyConfigMode.FixedServers = "fixed_servers", ChromeProxyConfigMode.PacScript = "pac_script", 
  ChromeProxyConfigMode.Direct = "direct";
 }(ChromeProxyConfigMode || (ChromeProxyConfigMode = {})), function(IFirefoxProxyInfoType) {
  IFirefoxProxyInfoType.Direct = "direct", IFirefoxProxyInfoType.Https = "https";
 }(IFirefoxProxyInfoType || (IFirefoxProxyInfoType = {})), function(UninstallTabType) {
  UninstallTabType.Ga = "ga", UninstallTabType.Burger = "burger";
 }(UninstallTabType || (UninstallTabType = {})), function(ShepherdActionTypes) {
  ShepherdActionTypes.ConfigReceived = "shepherd.configReceived";
 }(ShepherdActionTypes || (ShepherdActionTypes = {}));
 const shepherdActions_configReceived = (config, ttl, abTests, configId, configName, configVersion) => createAction(ShepherdActionTypes.ConfigReceived, {
  config: config,
  ttl: ttl,
  abTests: abTests,
  configId: configId,
  configName: configName,
  configVersion: configVersion
 });
 let GlobalActionTypes;
 !function(GlobalActionTypes) {
  GlobalActionTypes.Startup = "startup", GlobalActionTypes.GetState = "getState", 
  GlobalActionTypes.StateChange = "stateChange", GlobalActionTypes.Installed = "installed", 
  GlobalActionTypes.Updated = "updated";
 }(GlobalActionTypes || (GlobalActionTypes = {}));
 const globalActions_installed = () => createAction(GlobalActionTypes.Installed), globalActions_startup = () => createAction(GlobalActionTypes.Startup), globalActions_updated = previousVersion => createAction(GlobalActionTypes.Updated, {
  previousVersion: previousVersion
 });
 let AnalyticsActionTypes;
 !function(AnalyticsActionTypes) {
  AnalyticsActionTypes.AnalyticsUserConsent = "analytics.analyticsUserConsent", AnalyticsActionTypes.ClientCountryCodeChange = "analytics.clientCountryCodeChange", 
  AnalyticsActionTypes.CreateSession = "analytics.createSession", AnalyticsActionTypes.HeartbeatTracked = "analytics.heartbeatTracked", 
  AnalyticsActionTypes.TrackEvent = "analytics.trackEvent", AnalyticsActionTypes.TrackInstall = "analytics.trackInstall", 
  AnalyticsActionTypes.TrackView = "analytics.trackView", AnalyticsActionTypes.UninstallUrlDirty = "analytics.uninstallUrlDirty", 
  AnalyticsActionTypes.UserConsentChange = "analytics.userConsentChange";
 }(AnalyticsActionTypes || (AnalyticsActionTypes = {}));
 const analyticsActions_createSession = () => createAction(AnalyticsActionTypes.CreateSession), analyticsActions_heartbeatTracked = () => createAction(AnalyticsActionTypes.HeartbeatTracked), analyticsActions_uninstallUrlDirty = () => createAction(AnalyticsActionTypes.UninstallUrlDirty);
 let EventCategory, EventAction, EventLabel, ScreenView, UserConsentSource;
 function createAnalyticsActionGenerator(analytics) {
  const generators = {};
  return generators[GlobalActionTypes.Startup] = dispatch => {
   analytics.init(), analytics.setUpOrTearDown(), dispatch(analyticsActions_createSession()), 
   dispatch(analyticsActions_uninstallUrlDirty());
  }, generators[GlobalActionTypes.GetState] = dispatch => {
   dispatch(analyticsActions_createSession());
  }, generators[GlobalActionTypes.Installed] = () => {
   analytics.trackLifecycleEvent(EventAction.Installation), analytics.refreshClientCountryCode();
  }, generators[GlobalActionTypes.Updated] = () => {
   analytics.trackLifecycleEvent(EventAction.Update);
  }, generators[ShepherdActionTypes.ConfigReceived] = dispatch => {
   analytics.setUpOrTearDown(), dispatch(analyticsActions_uninstallUrlDirty());
  }, generators[ProxyActionTypes.StateChange] = (dispatch, getState, action) => {
   action.value === ProxyState.Disconnected && analytics.refreshClientCountryCode();
  }, generators[AnalyticsActionTypes.TrackEvent] = (dispatch, getState, action) => {
   analytics.trackEvent(action.value.category, action.value.action, action.value.label, action.value.view);
  }, generators[AnalyticsActionTypes.TrackInstall] = () => {
   analytics.trackLifecycleEvent(EventAction.Installation);
  }, generators[AnalyticsActionTypes.TrackView] = (dispatch, getState, action) => {
   analytics.trackView(action.value.view, action.value.label);
  }, generators[AnalyticsActionTypes.UninstallUrlDirty] = () => {
   analytics.updateUninstallUrl();
  }, generators[AnalyticsActionTypes.AnalyticsUserConsent] = () => {
   analytics.setUpOrTearDown();
  }, generators[AnalyticsActionTypes.UserConsentChange] = dispatch => {
   analytics.setUpOrTearDown(), dispatch(analyticsActions_uninstallUrlDirty());
  }, generators;
 }
 function shallowCopy(original, ...mutations) {
  return Object.assign.apply(this, [].concat({}, original, ...mutations));
 }
 function randHex(digits) {
  let r = "";
  for (;digits-- > 0; ) r += Math.floor(16 * Math.random()).toString(16);
  return r;
 }
 function openUrlInNewTab(url) {
  chrome.tabs.create({
   url: url
  });
 }
 function _defineProperty(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
   value: value,
   enumerable: !0,
   configurable: !0,
   writable: !0
  }) : obj[key] = value, obj;
 }
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
 var commonjsGlobal = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
 function unwrapExports(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
 }
 function createCommonjsModule(fn, module) {
  return fn(module = {
   exports: {}
  }, module.exports), module.exports;
 }
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
 }, browser = createCommonjsModule((function(module, exports) {
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
 browser.log, browser.formatArgs, browser.save, browser.load, browser.useColors, 
 browser.storage, browser.colors;
 const log = browser("runtimeInfo");
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
   _defineProperty(this, "_arch", void 0), manifest.short_name || log("short_name not defined in manifest"), 
   this._brand = manifest.short_name, this._extensionVersion = manifest.version, this._permissions = manifest.permissions, 
   this._optionalPermissions = manifest.optional_permissions || [], this._name = manifest.name, 
   this._shortName = manifest.short_name, this._contentScriptPaths = this.extractPathsFromContentScripts(manifest.content_scripts), 
   this._platformInfoResolvedCallbacks = [], navigator.userAgent.includes("Chrome") ? this._browser = Browser.Chrome : navigator.userAgent.includes("Firefox") ? this._browser = Browser.Firefox : this._browser = Browser.Other, 
   log("extension version: %s", this._extensionVersion);
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
 function analyticsReducer(state, action) {
  switch (state = void 0 === state ? {} : state, action.type) {
  case GlobalActionTypes.Updated:
   return shallowCopy(state, {
    currentVersion: runtimeInfo.extensionVersion,
    updateTime: Date.now()
   });

  case AnalyticsActionTypes.HeartbeatTracked:
   return shallowCopy(state, {
    lastHeartbeat: Date.now()
   });

  case AnalyticsActionTypes.ClientCountryCodeChange:
   return shallowCopy(state, {
    clientCountryCode: action.value
   });

  case AnalyticsActionTypes.CreateSession:
   return shallowCopy(state, {
    sessionId: randHex(24),
    sessionStart: Date.now()
   });

  case AnalyticsActionTypes.UserConsentChange:
   return shallowCopy(state, {
    userConsent: action.value,
    userConsentSource: UserConsentSource.User
   });
  }
  return state;
 }
 chrome.runtime.getPlatformInfo(runtimeInfo.handleGetPlatformInfo.bind(runtimeInfo));
 const initialAnalyticsState = {
  guid: randHex(8) + "-" + randHex(4) + "-" + randHex(4) + "-" + randHex(4) + "-" + randHex(12),
  installationTime: Date.now(),
  installationVersion: runtimeInfo.extensionVersion,
  updateTime: null,
  currentVersion: runtimeInfo.extensionVersion,
  currentVersionBuild: Number(runtimeInfo.extensionVersion.split(".").pop()),
  lastHeartbeat: 0,
  clientCountryCode: null,
  sessionId: null,
  sessionStart: null,
  startupTime: Date.now(),
  userConsent: null,
  userConsentSource: null
 }, analyticsPersistedPaths = [ "guid", "installationTime", "installationVersion", "updateTime", "currentVersion", "lastHeartbeat", "clientCountryCode", "userConsent", "userConsentSource" ];
 var eventemitter3 = createCommonjsModule((function(module) {
  var has = Object.prototype.hasOwnProperty, prefix = "~";
  function Events() {}
  function EE(fn, context, once) {
   this.fn = fn, this.context = context, this.once = once || !1;
  }
  function addListener(emitter, event, fn, context, once) {
   if ("function" != typeof fn) throw new TypeError("The listener must be a function");
   var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
   return emitter._events[evt] ? emitter._events[evt].fn ? emitter._events[evt] = [ emitter._events[evt], listener ] : emitter._events[evt].push(listener) : (emitter._events[evt] = listener, 
   emitter._eventsCount++), emitter;
  }
  function clearEvent(emitter, evt) {
   0 == --emitter._eventsCount ? emitter._events = new Events : delete emitter._events[evt];
  }
  function EventEmitter() {
   this._events = new Events, this._eventsCount = 0;
  }
  Object.create && (Events.prototype = Object.create(null), (new Events).__proto__ || (prefix = !1)), 
  EventEmitter.prototype.eventNames = function() {
   var events, name, names = [];
   if (0 === this._eventsCount) return names;
   for (name in events = this._events) has.call(events, name) && names.push(prefix ? name.slice(1) : name);
   return Object.getOwnPropertySymbols ? names.concat(Object.getOwnPropertySymbols(events)) : names;
  }, EventEmitter.prototype.listeners = function(event) {
   var evt = prefix ? prefix + event : event, handlers = this._events[evt];
   if (!handlers) return [];
   if (handlers.fn) return [ handlers.fn ];
   for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
   return ee;
  }, EventEmitter.prototype.listenerCount = function(event) {
   var evt = prefix ? prefix + event : event, listeners = this._events[evt];
   return listeners ? listeners.fn ? 1 : listeners.length : 0;
  }, EventEmitter.prototype.emit = function(event, a1, a2, a3, a4, a5) {
   var evt = prefix ? prefix + event : event;
   if (!this._events[evt]) return !1;
   var args, i, listeners = this._events[evt], len = arguments.length;
   if (listeners.fn) {
    switch (listeners.once && this.removeListener(event, listeners.fn, void 0, !0), 
    len) {
    case 1:
     return listeners.fn.call(listeners.context), !0;

    case 2:
     return listeners.fn.call(listeners.context, a1), !0;

    case 3:
     return listeners.fn.call(listeners.context, a1, a2), !0;

    case 4:
     return listeners.fn.call(listeners.context, a1, a2, a3), !0;

    case 5:
     return listeners.fn.call(listeners.context, a1, a2, a3, a4), !0;

    case 6:
     return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), !0;
    }
    for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
    listeners.fn.apply(listeners.context, args);
   } else {
    var j, length = listeners.length;
    for (i = 0; i < length; i++) switch (listeners[i].once && this.removeListener(event, listeners[i].fn, void 0, !0), 
    len) {
    case 1:
     listeners[i].fn.call(listeners[i].context);
     break;

    case 2:
     listeners[i].fn.call(listeners[i].context, a1);
     break;

    case 3:
     listeners[i].fn.call(listeners[i].context, a1, a2);
     break;

    case 4:
     listeners[i].fn.call(listeners[i].context, a1, a2, a3);
     break;

    default:
     if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
     listeners[i].fn.apply(listeners[i].context, args);
    }
   }
   return !0;
  }, EventEmitter.prototype.on = function(event, fn, context) {
   return addListener(this, event, fn, context, !1);
  }, EventEmitter.prototype.once = function(event, fn, context) {
   return addListener(this, event, fn, context, !0);
  }, EventEmitter.prototype.removeListener = function(event, fn, context, once) {
   var evt = prefix ? prefix + event : event;
   if (!this._events[evt]) return this;
   if (!fn) return clearEvent(this, evt), this;
   var listeners = this._events[evt];
   if (listeners.fn) listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context || clearEvent(this, evt); else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) && events.push(listeners[i]);
    events.length ? this._events[evt] = 1 === events.length ? events[0] : events : clearEvent(this, evt);
   }
   return this;
  }, EventEmitter.prototype.removeAllListeners = function(event) {
   var evt;
   return event ? (evt = prefix ? prefix + event : event, this._events[evt] && clearEvent(this, evt)) : (this._events = new Events, 
   this._eventsCount = 0), this;
  }, EventEmitter.prototype.off = EventEmitter.prototype.removeListener, EventEmitter.prototype.addListener = EventEmitter.prototype.on, 
  EventEmitter.prefixed = prefix, EventEmitter.EventEmitter = EventEmitter, module.exports = EventEmitter;
 })), uaParser = createCommonjsModule((function(module, exports) {
  /*!
	 * UAParser.js v0.7.21
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2019 Faisal Salman <f@faisalman.com>
	 * Licensed under MIT License
	 */
  !function(window, undefined$1) {
   var MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", util = {
    extend: function(regexes, extensions) {
     var mergedRegexes = {};
     for (var i in regexes) extensions[i] && extensions[i].length % 2 == 0 ? mergedRegexes[i] = extensions[i].concat(regexes[i]) : mergedRegexes[i] = regexes[i];
     return mergedRegexes;
    },
    has: function(str1, str2) {
     return "string" == typeof str1 && -1 !== str2.toLowerCase().indexOf(str1.toLowerCase());
    },
    lowerize: function(str) {
     return str.toLowerCase();
    },
    major: function(version) {
     return "string" == typeof version ? version.replace(/[^\d\.]/g, "").split(".")[0] : void 0;
    },
    trim: function(str) {
     return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
   }, mapper = {
    rgx: function(ua, arrays) {
     for (var j, k, p, q, matches, match, i = 0; i < arrays.length && !matches; ) {
      var regex = arrays[i], props = arrays[i + 1];
      for (j = k = 0; j < regex.length && !matches; ) if (matches = regex[j++].exec(ua)) for (p = 0; p < props.length; p++) match = matches[++k], 
      "object" == typeof (q = props[p]) && q.length > 0 ? 2 == q.length ? "function" == typeof q[1] ? this[q[0]] = q[1].call(this, match) : this[q[0]] = q[1] : 3 == q.length ? "function" != typeof q[1] || q[1].exec && q[1].test ? this[q[0]] = match ? match.replace(q[1], q[2]) : void 0 : this[q[0]] = match ? q[1].call(this, match, q[2]) : void 0 : 4 == q.length && (this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : void 0) : this[q] = match || void 0;
      i += 2;
     }
    },
    str: function(str, map) {
     for (var i in map) if ("object" == typeof map[i] && map[i].length > 0) {
      for (var j = 0; j < map[i].length; j++) if (util.has(map[i][j], str)) return "?" === i ? void 0 : i;
     } else if (util.has(map[i], str)) return "?" === i ? void 0 : i;
     return str;
    }
   }, maps = {
    browser: {
     oldsafari: {
      version: {
       "1.0": "/8",
       1.2: "/1",
       1.3: "/3",
       "2.0": "/412",
       "2.0.2": "/416",
       "2.0.3": "/417",
       "2.0.4": "/419",
       "?": "/"
      }
     }
    },
    device: {
     amazon: {
      model: {
       "Fire Phone": [ "SD", "KF" ]
      }
     },
     sprint: {
      model: {
       "Evo Shift 4G": "7373KT"
      },
      vendor: {
       HTC: "APA",
       Sprint: "Sprint"
      }
     }
    },
    os: {
     windows: {
      version: {
       ME: "4.90",
       "NT 3.11": "NT3.51",
       "NT 4.0": "NT4.0",
       2e3: "NT 5.0",
       XP: [ "NT 5.1", "NT 5.2" ],
       Vista: "NT 6.0",
       7: "NT 6.1",
       8: "NT 6.2",
       8.1: "NT 6.3",
       10: [ "NT 6.4", "NT 10.0" ],
       RT: "ARM"
      }
     }
    }
   }, regexes = {
    browser: [ [ /(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i ], [ NAME, VERSION ], [ /(opios)[\/\s]+([\w\.]+)/i ], [ [ NAME, "Opera Mini" ], VERSION ], [ /\s(opr)\/([\w\.]+)/i ], [ [ NAME, "Opera" ], VERSION ], [ /(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i, /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i ], [ NAME, VERSION ], [ /(konqueror)\/([\w\.]+)/i ], [ [ NAME, "Konqueror" ], VERSION ], [ /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i ], [ [ NAME, "IE" ], VERSION ], [ /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i ], [ [ NAME, "Edge" ], VERSION ], [ /(yabrowser)\/([\w\.]+)/i ], [ [ NAME, "Yandex" ], VERSION ], [ /(Avast)\/([\w\.]+)/i ], [ [ NAME, "Avast Secure Browser" ], VERSION ], [ /(AVG)\/([\w\.]+)/i ], [ [ NAME, "AVG Secure Browser" ], VERSION ], [ /(puffin)\/([\w\.]+)/i ], [ [ NAME, "Puffin" ], VERSION ], [ /(focus)\/([\w\.]+)/i ], [ [ NAME, "Firefox Focus" ], VERSION ], [ /(opt)\/([\w\.]+)/i ], [ [ NAME, "Opera Touch" ], VERSION ], [ /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i ], [ [ NAME, "UCBrowser" ], VERSION ], [ /(comodo_dragon)\/([\w\.]+)/i ], [ [ NAME, /_/g, " " ], VERSION ], [ /(windowswechat qbcore)\/([\w\.]+)/i ], [ [ NAME, "WeChat(Win) Desktop" ], VERSION ], [ /(micromessenger)\/([\w\.]+)/i ], [ [ NAME, "WeChat" ], VERSION ], [ /(brave)\/([\w\.]+)/i ], [ [ NAME, "Brave" ], VERSION ], [ /(qqbrowserlite)\/([\w\.]+)/i ], [ NAME, VERSION ], [ /(QQ)\/([\d\.]+)/i ], [ NAME, VERSION ], [ /m?(qqbrowser)[\/\s]?([\w\.]+)/i ], [ NAME, VERSION ], [ /(baiduboxapp)[\/\s]?([\w\.]+)/i ], [ NAME, VERSION ], [ /(2345Explorer)[\/\s]?([\w\.]+)/i ], [ NAME, VERSION ], [ /(MetaSr)[\/\s]?([\w\.]+)/i ], [ NAME ], [ /(LBBROWSER)/i ], [ NAME ], [ /xiaomi\/miuibrowser\/([\w\.]+)/i ], [ VERSION, [ NAME, "MIUI Browser" ] ], [ /;fbav\/([\w\.]+);/i ], [ VERSION, [ NAME, "Facebook" ] ], [ /safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i ], [ NAME, VERSION ], [ /headlesschrome(?:\/([\w\.]+)|\s)/i ], [ VERSION, [ NAME, "Chrome Headless" ] ], [ /\swv\).+(chrome)\/([\w\.]+)/i ], [ [ NAME, /(.+)/, "$1 WebView" ], VERSION ], [ /((?:oculus|samsung)browser)\/([\w\.]+)/i ], [ [ NAME, /(.+(?:g|us))(.+)/, "$1 $2" ], VERSION ], [ /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i ], [ VERSION, [ NAME, "Android Browser" ] ], [ /(sailfishbrowser)\/([\w\.]+)/i ], [ [ NAME, "Sailfish Browser" ], VERSION ], [ /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i ], [ NAME, VERSION ], [ /(dolfin)\/([\w\.]+)/i ], [ [ NAME, "Dolphin" ], VERSION ], [ /(qihu|qhbrowser|qihoobrowser|360browser)/i ], [ [ NAME, "360 Browser" ] ], [ /((?:android.+)crmo|crios)\/([\w\.]+)/i ], [ [ NAME, "Chrome" ], VERSION ], [ /(coast)\/([\w\.]+)/i ], [ [ NAME, "Opera Coast" ], VERSION ], [ /fxios\/([\w\.-]+)/i ], [ VERSION, [ NAME, "Firefox" ] ], [ /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i ], [ VERSION, [ NAME, "Mobile Safari" ] ], [ /version\/([\w\.]+).+?(mobile\s?safari|safari)/i ], [ VERSION, NAME ], [ /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i ], [ [ NAME, "GSA" ], VERSION ], [ /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i ], [ NAME, [ VERSION, mapper.str, maps.browser.oldsafari.version ] ], [ /(webkit|khtml)\/([\w\.]+)/i ], [ NAME, VERSION ], [ /(navigator|netscape)\/([\w\.-]+)/i ], [ [ NAME, "Netscape" ], VERSION ], [ /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i ], [ NAME, VERSION ] ],
    cpu: [ [ /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i ], [ [ "architecture", "amd64" ] ], [ /(ia32(?=;))/i ], [ [ "architecture", util.lowerize ] ], [ /((?:i[346]|x)86)[;\)]/i ], [ [ "architecture", "ia32" ] ], [ /windows\s(ce|mobile);\sppc;/i ], [ [ "architecture", "arm" ] ], [ /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i ], [ [ "architecture", /ower/, "", util.lowerize ] ], [ /(sun4\w)[;\)]/i ], [ [ "architecture", "sparc" ] ], [ /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i ], [ [ "architecture", util.lowerize ] ] ],
    device: [ [ /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i ], [ MODEL, VENDOR, [ TYPE, TABLET ] ], [ /applecoremedia\/[\w\.]+ \((ipad)/ ], [ MODEL, [ VENDOR, "Apple" ], [ TYPE, TABLET ] ], [ /(apple\s{0,1}tv)/i ], [ [ MODEL, "Apple TV" ], [ VENDOR, "Apple" ], [ TYPE, SMARTTV ] ], [ /(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i ], [ VENDOR, MODEL, [ TYPE, TABLET ] ], [ /(kf[A-z]+)\sbuild\/.+silk\//i ], [ MODEL, [ VENDOR, "Amazon" ], [ TYPE, TABLET ] ], [ /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i ], [ [ MODEL, mapper.str, maps.device.amazon.model ], [ VENDOR, "Amazon" ], [ TYPE, MOBILE ] ], [ /android.+aft([bms])\sbuild/i ], [ MODEL, [ VENDOR, "Amazon" ], [ TYPE, SMARTTV ] ], [ /\((ip[honed|\s\w*]+);.+(apple)/i ], [ MODEL, VENDOR, [ TYPE, MOBILE ] ], [ /\((ip[honed|\s\w*]+);/i ], [ MODEL, [ VENDOR, "Apple" ], [ TYPE, MOBILE ] ], [ /(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i ], [ VENDOR, MODEL, [ TYPE, MOBILE ] ], [ /\(bb10;\s(\w+)/i ], [ MODEL, [ VENDOR, "BlackBerry" ], [ TYPE, MOBILE ] ], [ /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i ], [ MODEL, [ VENDOR, "Asus" ], [ TYPE, TABLET ] ], [ /(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i ], [ [ VENDOR, "Sony" ], [ MODEL, "Xperia Tablet" ], [ TYPE, TABLET ] ], [ /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i ], [ MODEL, [ VENDOR, "Sony" ], [ TYPE, MOBILE ] ], [ /\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i ], [ VENDOR, MODEL, [ TYPE, "console" ] ], [ /android.+;\s(shield)\sbuild/i ], [ MODEL, [ VENDOR, "Nvidia" ], [ TYPE, "console" ] ], [ /(playstation\s[34portablevi]+)/i ], [ MODEL, [ VENDOR, "Sony" ], [ TYPE, "console" ] ], [ /(sprint\s(\w+))/i ], [ [ VENDOR, mapper.str, maps.device.sprint.vendor ], [ MODEL, mapper.str, maps.device.sprint.model ], [ TYPE, MOBILE ] ], [ /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i ], [ VENDOR, [ MODEL, /_/g, " " ], [ TYPE, MOBILE ] ], [ /(nexus\s9)/i ], [ MODEL, [ VENDOR, "HTC" ], [ TYPE, TABLET ] ], [ /d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p|vog-l29|ane-lx1|eml-l29)/i ], [ MODEL, [ VENDOR, "Huawei" ], [ TYPE, MOBILE ] ], [ /android.+(bah2?-a?[lw]\d{2})/i ], [ MODEL, [ VENDOR, "Huawei" ], [ TYPE, TABLET ] ], [ /(microsoft);\s(lumia[\s\w]+)/i ], [ VENDOR, MODEL, [ TYPE, MOBILE ] ], [ /[\s\(;](xbox(?:\sone)?)[\s\);]/i ], [ MODEL, [ VENDOR, "Microsoft" ], [ TYPE, "console" ] ], [ /(kin\.[onetw]{3})/i ], [ [ MODEL, /\./g, " " ], [ VENDOR, "Microsoft" ], [ TYPE, MOBILE ] ], [ /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i ], [ MODEL, [ VENDOR, "Motorola" ], [ TYPE, MOBILE ] ], [ /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i ], [ MODEL, [ VENDOR, "Motorola" ], [ TYPE, TABLET ] ], [ /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i ], [ [ VENDOR, util.trim ], [ MODEL, util.trim ], [ TYPE, SMARTTV ] ], [ /hbbtv.+maple;(\d+)/i ], [ [ MODEL, /^/, "SmartTV" ], [ VENDOR, "Samsung" ], [ TYPE, SMARTTV ] ], [ /\(dtv[\);].+(aquos)/i ], [ MODEL, [ VENDOR, "Sharp" ], [ TYPE, SMARTTV ] ], [ /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i ], [ [ VENDOR, "Samsung" ], MODEL, [ TYPE, TABLET ] ], [ /smart-tv.+(samsung)/i ], [ VENDOR, [ TYPE, SMARTTV ], MODEL ], [ /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i ], [ [ VENDOR, "Samsung" ], MODEL, [ TYPE, MOBILE ] ], [ /sie-(\w*)/i ], [ MODEL, [ VENDOR, "Siemens" ], [ TYPE, MOBILE ] ], [ /(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i ], [ [ VENDOR, "Nokia" ], MODEL, [ TYPE, MOBILE ] ], [ /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i ], [ MODEL, [ VENDOR, "Acer" ], [ TYPE, TABLET ] ], [ /android.+([vl]k\-?\d{3})\s+build/i ], [ MODEL, [ VENDOR, "LG" ], [ TYPE, TABLET ] ], [ /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i ], [ [ VENDOR, "LG" ], MODEL, [ TYPE, TABLET ] ], [ /(lg) netcast\.tv/i ], [ VENDOR, MODEL, [ TYPE, SMARTTV ] ], [ /(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i ], [ MODEL, [ VENDOR, "LG" ], [ TYPE, MOBILE ] ], [ /(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i ], [ VENDOR, MODEL, [ TYPE, TABLET ] ], [ /android.+(ideatab[a-z0-9\-\s]+)/i ], [ MODEL, [ VENDOR, "Lenovo" ], [ TYPE, TABLET ] ], [ /(lenovo)[_\s-]?([\w-]+)/i ], [ VENDOR, MODEL, [ TYPE, MOBILE ] ], [ /linux;.+((jolla));/i ], [ VENDOR, MODEL, [ TYPE, MOBILE ] ], [ /((pebble))app\/[\d\.]+\s/i ], [ VENDOR, MODEL, [ TYPE, "wearable" ] ], [ /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i ], [ VENDOR, MODEL, [ TYPE, MOBILE ] ], [ /crkey/i ], [ [ MODEL, "Chromecast" ], [ VENDOR, "Google" ], [ TYPE, SMARTTV ] ], [ /android.+;\s(glass)\s\d/i ], [ MODEL, [ VENDOR, "Google" ], [ TYPE, "wearable" ] ], [ /android.+;\s(pixel c)[\s)]/i ], [ MODEL, [ VENDOR, "Google" ], [ TYPE, TABLET ] ], [ /android.+;\s(pixel( [23])?( xl)?)[\s)]/i ], [ MODEL, [ VENDOR, "Google" ], [ TYPE, MOBILE ] ], [ /android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i ], [ [ MODEL, /_/g, " " ], [ VENDOR, "Xiaomi" ], [ TYPE, MOBILE ] ], [ /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i ], [ [ MODEL, /_/g, " " ], [ VENDOR, "Xiaomi" ], [ TYPE, TABLET ] ], [ /android.+;\s(m[1-5]\snote)\sbuild/i ], [ MODEL, [ VENDOR, "Meizu" ], [ TYPE, MOBILE ] ], [ /(mz)-([\w-]{2,})/i ], [ [ VENDOR, "Meizu" ], MODEL, [ TYPE, MOBILE ] ], [ /android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})[\s)]/i ], [ MODEL, [ VENDOR, "OnePlus" ], [ TYPE, MOBILE ] ], [ /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i ], [ MODEL, [ VENDOR, "RCA" ], [ TYPE, TABLET ] ], [ /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i ], [ MODEL, [ VENDOR, "Dell" ], [ TYPE, TABLET ] ], [ /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i ], [ MODEL, [ VENDOR, "Verizon" ], [ TYPE, TABLET ] ], [ /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i ], [ [ VENDOR, "Barnes & Noble" ], MODEL, [ TYPE, TABLET ] ], [ /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i ], [ MODEL, [ VENDOR, "NuVision" ], [ TYPE, TABLET ] ], [ /android.+;\s(k88)\sbuild/i ], [ MODEL, [ VENDOR, "ZTE" ], [ TYPE, TABLET ] ], [ /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i ], [ MODEL, [ VENDOR, "Swiss" ], [ TYPE, MOBILE ] ], [ /android.+[;\/]\s*(zur\d{3})\s+build/i ], [ MODEL, [ VENDOR, "Swiss" ], [ TYPE, TABLET ] ], [ /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i ], [ MODEL, [ VENDOR, "Zeki" ], [ TYPE, TABLET ] ], [ /(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i ], [ [ VENDOR, "Dragon Touch" ], MODEL, [ TYPE, TABLET ] ], [ /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i ], [ MODEL, [ VENDOR, "Insignia" ], [ TYPE, TABLET ] ], [ /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i ], [ MODEL, [ VENDOR, "NextBook" ], [ TYPE, TABLET ] ], [ /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i ], [ [ VENDOR, "Voice" ], MODEL, [ TYPE, MOBILE ] ], [ /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i ], [ [ VENDOR, "LvTel" ], MODEL, [ TYPE, MOBILE ] ], [ /android.+;\s(PH-1)\s/i ], [ MODEL, [ VENDOR, "Essential" ], [ TYPE, MOBILE ] ], [ /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i ], [ MODEL, [ VENDOR, "Envizen" ], [ TYPE, TABLET ] ], [ /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i ], [ VENDOR, MODEL, [ TYPE, TABLET ] ], [ /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i ], [ MODEL, [ VENDOR, "MachSpeed" ], [ TYPE, TABLET ] ], [ /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i ], [ VENDOR, MODEL, [ TYPE, TABLET ] ], [ /android.+[;\/]\s*TU_(1491)\s+build/i ], [ MODEL, [ VENDOR, "Rotor" ], [ TYPE, TABLET ] ], [ /android.+(KS(.+))\s+build/i ], [ MODEL, [ VENDOR, "Amazon" ], [ TYPE, TABLET ] ], [ /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i ], [ VENDOR, MODEL, [ TYPE, TABLET ] ], [ /\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i ], [ [ TYPE, util.lowerize ], VENDOR, MODEL ], [ /[\s\/\(](smart-?tv)[;\)]/i ], [ [ TYPE, SMARTTV ] ], [ /(android[\w\.\s\-]{0,9});.+build/i ], [ MODEL, [ VENDOR, "Generic" ] ] ],
    engine: [ [ /windows.+\sedge\/([\w\.]+)/i ], [ VERSION, [ NAME, "EdgeHTML" ] ], [ /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i ], [ VERSION, [ NAME, "Blink" ] ], [ /(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i ], [ NAME, VERSION ], [ /rv\:([\w\.]{1,9}).+(gecko)/i ], [ VERSION, NAME ] ],
    os: [ [ /microsoft\s(windows)\s(vista|xp)/i ], [ NAME, VERSION ], [ /(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i ], [ NAME, [ VERSION, mapper.str, maps.os.windows.version ] ], [ /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i ], [ [ NAME, "Windows" ], [ VERSION, mapper.str, maps.os.windows.version ] ], [ /\((bb)(10);/i ], [ [ NAME, "BlackBerry" ], VERSION ], [ /(blackberry)\w*\/?([\w\.]*)/i, /(tizen|kaios)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i ], [ NAME, VERSION ], [ /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i ], [ [ NAME, "Symbian" ], VERSION ], [ /\((series40);/i ], [ NAME ], [ /mozilla.+\(mobile;.+gecko.+firefox/i ], [ [ NAME, "Firefox OS" ], VERSION ], [ /(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i ], [ NAME, VERSION ], [ /(cros)\s[\w]+\s([\w\.]+\w)/i ], [ [ NAME, "Chromium OS" ], VERSION ], [ /(sunos)\s?([\w\.\d]*)/i ], [ [ NAME, "Solaris" ], VERSION ], [ /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i ], [ NAME, VERSION ], [ /(haiku)\s(\w+)/i ], [ NAME, VERSION ], [ /cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i ], [ [ VERSION, /_/g, "." ], [ NAME, "iOS" ] ], [ /(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i ], [ [ NAME, "Mac OS" ], [ VERSION, /_/g, "." ] ], [ /((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, /(unix)\s?([\w\.]*)/i ], [ NAME, VERSION ] ]
   }, UAParser = function(uastring, extensions) {
    if ("object" == typeof uastring && (extensions = uastring, uastring = void 0), !(this instanceof UAParser)) return new UAParser(uastring, extensions).getResult();
    var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : ""), rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
    return this.getBrowser = function() {
     var browser = {
      name: void 0,
      version: void 0
     };
     return mapper.rgx.call(browser, ua, rgxmap.browser), browser.major = util.major(browser.version), 
     browser;
    }, this.getCPU = function() {
     var cpu = {
      architecture: void 0
     };
     return mapper.rgx.call(cpu, ua, rgxmap.cpu), cpu;
    }, this.getDevice = function() {
     var device = {
      vendor: void 0,
      model: void 0,
      type: void 0
     };
     return mapper.rgx.call(device, ua, rgxmap.device), device;
    }, this.getEngine = function() {
     var engine = {
      name: void 0,
      version: void 0
     };
     return mapper.rgx.call(engine, ua, rgxmap.engine), engine;
    }, this.getOS = function() {
     var os = {
      name: void 0,
      version: void 0
     };
     return mapper.rgx.call(os, ua, rgxmap.os), os;
    }, this.getResult = function() {
     return {
      ua: this.getUA(),
      browser: this.getBrowser(),
      engine: this.getEngine(),
      os: this.getOS(),
      device: this.getDevice(),
      cpu: this.getCPU()
     };
    }, this.getUA = function() {
     return ua;
    }, this.setUA = function(uastring) {
     return ua = uastring, this;
    }, this;
   };
   UAParser.VERSION = "0.7.21", UAParser.BROWSER = {
    NAME: NAME,
    MAJOR: "major",
    VERSION: VERSION
   }, UAParser.CPU = {
    ARCHITECTURE: "architecture"
   }, UAParser.DEVICE = {
    MODEL: MODEL,
    VENDOR: VENDOR,
    TYPE: TYPE,
    CONSOLE: "console",
    MOBILE: MOBILE,
    SMARTTV: SMARTTV,
    TABLET: TABLET,
    WEARABLE: "wearable",
    EMBEDDED: "embedded"
   }, UAParser.ENGINE = {
    NAME: NAME,
    VERSION: VERSION
   }, UAParser.OS = {
    NAME: NAME,
    VERSION: VERSION
   }, module.exports && (exports = module.exports = UAParser), exports.UAParser = UAParser;
   var $ = window && (window.jQuery || window.Zepto);
   if ($ && !$.ua) {
    var parser = new UAParser;
    $.ua = parser.getResult(), $.ua.get = function() {
     return parser.getUA();
    }, $.ua.set = function(uastring) {
     parser.setUA(uastring);
     var result = parser.getResult();
     for (var prop in result) $.ua[prop] = result[prop];
    };
   }
  }("object" == typeof window ? window : commonjsGlobal);
 }));
 uaParser.UAParser;
 const send = {
  _activity(subtype, activity) {
   let activityMessage = Object.assign({
    common: {
     session_id: this._sessionId,
     test_id: this._abTests.map((function(a) {
      return a.test_id;
     })).join(","),
     test_group_id: this._abTests.map((function(a) {
      return a.test_group_id;
     })).join(","),
     error_state: this._errorState
    }
   }, activity);
   const event = {
    type: 5,
    subtype: subtype,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    activity: activityMessage
   });
  },
  activity: {
   click: 1,
   view: 2,
   ipm: 3,
   auto: 10
  },
  commonActivity(activity) {
   let activityMessage = Object.assign({}, activity);
   const event = {
    type: 48,
    subtype: 1,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    activity: activityMessage
   });
  },
  heartbeat(uptimeMs) {
   let heartbeatMessage = {
    uptime: uptimeMs
   };
   const event = {
    type: 2,
    subtype: 1,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    heartbeat: heartbeatMessage
   });
  },
  install(operation) {
   let installMessage = {
    operation: operation || 1
   };
   const event = {
    type: 1,
    subtype: installMessage.operation,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    install: installMessage
   });
  },
  aosWebshieldScanning(scanning) {
   let scanningMessage = Object.assign({
    caller_id: this._options.caller_id,
    product_av: {
     identity: this._options.extensionProductIdentity,
     product: this._options.extensionProduct
    }
   }, scanning);
   const event = {
    type: 41,
    subtype: 1,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    aos_webshield_scanning: scanningMessage
   });
  },
  update(data = {}) {
   const subtype = data.action || 3, now = Date.now(), updateData = Object.assign({
    action: subtype,
    component: 1,
    type: 1,
    time: {
     ends: now
    }
   }, data), event = {
    type: 4,
    subtype: subtype,
    time: now
   };
   this.sendEvent({
    event: event,
    updates: updateData
   });
  },
  preferences(configuration = []) {
   const configData = {
    config: {
     configuration: configuration
    }
   }, event = {
    type: 6,
    subtype: 1,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    preferences: configData
   });
  },
  maliciousUrl(url) {
   const event = {
    type: 46,
    subtype: 1,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    malicious: {
     url: url
    }
   });
  },
  vote(url, rating) {
   const event = {
    type: 47,
    subtype: 1,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    vote: {
     url: url,
     rating: rating
    }
   });
  },
  _issue(category, error, opt_source) {
   let issueMessage = {
    category: category,
    source: void 0 !== opt_source ? opt_source : 3,
    error: Object.assign(error)
   };
   const event = {
    type: 9,
    subtype: category,
    time: Date.now()
   };
   this.sendEvent({
    event: event,
    issue: issueMessage
   });
  },
  issue: {
   debug: 1,
   crash: 2,
   error: 3,
   failure: 4,
   warning: 5
  }
 };
 var send_1_bind = function(burgerClient) {
  let bound = {};
  for (let fun in send) if (fun.startsWith("_") || "function" != typeof send[fun]) {
   if ("object" == typeof send[fun]) {
    bound[fun] = {};
    for (let subfun in send[fun]) bound[fun][subfun] = send["_" + fun].bind(burgerClient, send[fun][subfun]);
   }
  } else bound[fun] = send[fun].bind(burgerClient);
  return bound;
 };
 var burgerEnum = {
  browserNameToEnum: function(name) {
   return "avast secure browser" === (name = name.toLowerCase()) || "avg secure browser" === name ? 2 : name.includes("chrome") ? 3 : name.includes("firefox") ? 4 : name.includes("safari") ? 5 : name.includes("edge") ? 6 : name.includes("opera") ? 7 : "ie" === name ? 8 : "ucbrowser" === name ? 11 : "yandex" === name ? 12 : "coc coc" === name ? 13 : "chromium" === name ? 14 : "vivaldi" === name ? 15 : 1;
  },
  platformNameToEnum: function(name) {
   return name ? name.startsWith("Win") ? 1 : name.startsWith("Mac") ? 2 : name.startsWith("iP") ? 3 : name.toLowerCase().startsWith("android") ? 5 : name.toLowerCase().startsWith("chromium os") ? 6 : 4 : 5;
  },
  cpuToEnum: function(name) {
   return "arm" === name ? 3 : "arm64" === name ? 4 : "amd64" === name || "ia64" === name ? 2 : "ia32" === name ? 1 : 5;
  }
 };
 const {browserNameToEnum: browserNameToEnum$1, platformNameToEnum: platformNameToEnum$1, cpuToEnum: cpuToEnum$1} = burgerEnum;
 class BurgerClient extends eventemitter3 {
  constructor(burgerUrl, adapter, options) {
   super(), this._localStorage = options.localStorage || localStorage, this._retries = 0, 
   this._url = burgerUrl, this._adapter = adapter, this._options = options, this._flushInterval = null, 
   this._eventsCache = {}, this._storageKey = options.storageKey || "records", this._sessionId = options.session_id || BurgerClient.createSessionId(), 
   this._errorState = 0, this._abTests = [], this.send = send_1_bind(this), this._loadEvents().then(events => {
    const syncBack = Object.keys(this._eventsCache).length > 0;
    [ ...Object.keys(events), ...Object.keys(this._eventsCache) ].forEach(type => this._eventsCache[type] = [ ...events[type] || [], ...this._eventsCache[type] || [] ]), 
    syncBack && this._localStorage.setItem(this._storageKey, JSON.stringify(this._eventsCache)), 
    this.flush(), this._flushInterval = setInterval(() => {
     this.flush();
    }, options.batchTimeoutMs || 5e3), this.emit(BurgerClient.Event.INITIALIZED);
   });
  }
  updateIdentity(identity) {
   return this._updateOptions("identity", identity);
  }
  updateProduct(product) {
   return this._updateOptions("product", product);
  }
  updatePlatform(platform) {
   return this._updateOptions("platform", platform);
  }
  updateGeo(geo) {
   return this._updateOptions("geo", geo);
  }
  updateInstallation(installation) {
   return this._updateOptions("installation", installation);
  }
  updateLicense(license) {
   return this._updateOptions("license", license);
  }
  updateShepherd(shepherd) {
   return this._updateOptions("shepherd", shepherd);
  }
  updateExtensionProduct(product) {
   return this._updateOptions("extensionProduct", product);
  }
  updateExtensionProductIdentity(extensionProductIdentity) {
   return this._updateOptions("extensionProductIdentity", extensionProductIdentity);
  }
  updateCampaign(campaign) {
   return this._updateOptions("campaign", campaign);
  }
  updateSettings(settings) {
   return this._updateOptions("settings", settings);
  }
  get hasPendingEvents() {
   return Object.keys(this._eventsCache).some(type => 0 !== this._eventsCache[type].length);
  }
  static createSessionId() {
   return function(digits) {
    var r = "";
    for (;digits-- > 0; ) r += Math.floor(16 * Math.random()).toString(16);
    return r;
   }(24);
  }
  setSessionId(session_id) {
   return this._sessionId = session_id, this;
  }
  setErrorState(state) {
   return this._errorState = state, this;
  }
  setHTTPErrorState(httpStatusCode) {
   let state = httpStatusCode;
   return 0 == httpStatusCode ? state = -1 : httpStatusCode < 400 && (state = 0), this.setErrorState(state), 
   this;
  }
  setABTest(test_id, test_group_id) {
   let existing = this._abTests.find((function(a) {
    return a.test_id === test_id;
   }));
   return existing ? existing.test_group_id = test_group_id : (this._abTests.push({
    test_id: test_id,
    test_group_id: test_group_id
   }), this._abTests.sort((function(a, b) {
    return a.test_id < b.test_id ? -1 : a.test_id > b.test_id ? 1 : 0;
   }))), this;
  }
  setABTests(tests) {
   if (!Array.isArray(tests) || tests.some(t => "string" != typeof t.test_id || "string" != typeof t.test_group_id)) throw new Error("Invalid parameter:", JSON.stringify(tests, null, 2));
   return this._abTests = tests, this._abTests.sort((function(a, b) {
    return a.test_id < b.test_id ? -1 : a.test_id > b.test_id ? 1 : 0;
   })), this;
  }
  sendEvent(data) {
   const record = removeCRLF(Object.assign({}, data));
   if (record.event && void 0 !== record.event.type) if ([ 1, 2, 6 ].includes(record.event.type)) try {
    fetch(this._url, this._adapter({
     record: [ this._updateRecord(record) ],
     common: {
      send_time: Date.now()
     }
    }));
   } catch (ex) {
    console.error(ex);
   } else this._eventsCache[record.event.type] || (this._eventsCache[record.event.type] = []), 
   this._eventsCache[record.event.type].push(record), this._flushInterval && this._localStorage.setItem(this._storageKey, JSON.stringify(this._eventsCache)), 
   this._eventsCache[record.event.type].length < (this._options.batchSizeLimit || 500) || this.flush({
    type: record.event.type
   }); else console.error("missing event.type at " + JSON.stringify(record));
  }
  flush(options) {
   if (options && void 0 !== options.type && 0 == this._eventsCache[options.type].length || !this.hasPendingEvents) return Promise.resolve(null);
   if (options && options.doNotVerify) if (void 0 !== options.type) {
    let after = Object.assign({}, this._eventsCache);
    delete after[options.type], this._localStorage.setItem(this._storageKey, JSON.stringify(after));
   } else this._localStorage.setItem(this._storageKey, "{}");
   const types = options && "undefined" !== options.type ? [ options.type ] : Object.keys(this._eventsCache);
   return Promise.all(types.map(type => {
    try {
     let envelope = {
      record: this._eventsCache[type].map(this._updateRecord.bind(this)),
      common: {
       send_time: Date.now()
      }
     };
     const fetchOpt = this._adapter(envelope);
     return fetch(this._url, fetchOpt).then(resp => resp.status >= 400 && resp.status < 500 || ++this._retries >= (this._options.maxRetries || 3) ? (this._clearEvents(type), 
     resp.text().then(text => "Data rejected: " + resp.status + " " + resp.statusText + "\n" + text)) : resp.status >= 500 ? "Burger failure: " + resp.status + " " + resp.statusText : (this._clearEvents(type), 
     this.emit(BurgerClient.Event.FLUSHED), null)).catch(ex => this._options.ignoreNetworkErrors ? (this._retries = 0, 
     null) : ex);
    } catch (ex) {
     return console.error(ex), this._clearEvents(type), Promise.resolve(ex);
    }
   })).then(responses => {
    if (1 == responses.length) return responses[0];
    const errors = responses.filter(r => null !== r);
    return errors.length > 0 ? errors.join(", ") : null;
   });
  }
  _updateOptions(optionsKey, value) {
   for (var key in value) void 0 === value[key] ? this._options[optionsKey] && delete this._options[optionsKey][key] : (this._options[optionsKey] || (this._options[optionsKey] = {}), 
   this._options[optionsKey][key] = value[key]);
   return this;
  }
  _updateRecord(record) {
   if (this._options.identity && (record.identity = this._options.identity), this._options.product && (record.product = this._options.product), 
   this._options.platform && (record.platform = this._options.platform, void 0 !== record.platform.os && "number" != typeof record.platform.os && (record.platform.os = platformNameToEnum$1(record.platform.os)), 
   void 0 !== record.platform.architecture && "number" != typeof record.platform.architecture && (record.platform.architecture = cpuToEnum$1(record.platform.architecture))), 
   this._options.license && (record.license = this._options.license), this._options.installation && (record.installation = this._options.installation), 
   this._options.shepherd && (record.shepherd = this._options.shepherd), this._options.geo && (record.geo = this._options.geo), 
   "undefined" != typeof navigator && navigator.userAgent) {
    let ua = uaParser(navigator.userAgent);
    record.browser = {
     type: browserNameToEnum$1(ua.browser.name),
     version: ua.browser.version
    }, navigator.language && (record.browser.lang = navigator.language);
   }
   if ("undefined" != typeof navigator && (shallowAddIfUndefined(record, {
    platform: {}
   }), shallowAddIfUndefined(record.platform, {
    os: platformNameToEnum$1(navigator.platform),
    time_zone: -(new Date).getTimezoneOffset()
   }), navigator.userAgent)) {
    let ua = uaParser(navigator.userAgent);
    shallowAddIfUndefined(record.platform, {
     version: ua.os.version,
     architecture: cpuToEnum$1(ua.cpu.architecture)
    }), "Chromium OS" === ua.os.name && (record.platform.os = 6, 5 == record.platform.architecture && (-1 != navigator.userAgent.indexOf("x86_64") ? record.platform.architecture = 2 : -1 != navigator.userAgent.indexOf("x86") ? record.platform.architecture = 1 : -1 != navigator.userAgent.indexOf("armv") && (record.platform.architecture = 4)));
   }
   return this._options.campaign && (record.campaign = this._options.campaign), this._options.settings && (record.settings = this._options.settings), 
   record;
  }
  _loadEvents() {
   return Promise.resolve(this._localStorage.getItem(this._storageKey)).then(recordStr => recordStr ? JSON.parse(recordStr) : {}).then(records => Array.isArray(records) || "object" != typeof records ? {} : records).catch(() => (this._localStorage.setItem(this._storageKey, "{}"), 
   {}));
  }
  _clearEvents(type) {
   this._retries = 0, void 0 === type ? this._eventsCache = {} : delete this._eventsCache[type], 
   this._localStorage.setItem(this._storageKey, JSON.stringify(this._eventsCache));
  }
 }
 function shallowAddIfUndefined(obj, values) {
  for (let key in values) void 0 === obj[key] && (obj[key] = values[key]);
  return obj;
 }
 function removeCRLF(obj) {
  if ("object" == typeof obj && null !== obj) {
   if (Array.isArray(obj)) obj = obj.map(removeCRLF); else for (var key in obj) obj[key] = removeCRLF(obj[key]);
   return obj;
  }
  return "string" == typeof obj ? obj.replace(/[\r\n]+/g, " ") : obj;
 }
 BurgerClient.Event = {
  INITIALIZED: "initialized",
  FLUSHED: "flushed"
 };
 var burgerClient = BurgerClient, long_1 = createCommonjsModule((function(module) {
  /**
	 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
	 * Released under the Apache License, Version 2.0
	 * see: https://github.com/dcodeIO/long.js for details
	 */
  !function(global, factory) {
   module && module.exports ? module.exports = factory() : (global.dcodeIO = global.dcodeIO || {}).Long = factory();
  }(commonjsGlobal, (function() {
   function Long(low, high, unsigned) {
    this.low = 0 | low, this.high = 0 | high, this.unsigned = !!unsigned;
   }
   function isLong(obj) {
    return !0 === (obj && obj.__isLong__);
   }
   Long.prototype.__isLong__, Object.defineProperty(Long.prototype, "__isLong__", {
    value: !0,
    enumerable: !1,
    configurable: !1
   }), Long.isLong = isLong;
   var INT_CACHE = {}, UINT_CACHE = {};
   function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    return unsigned ? (cache = 0 <= (value >>>= 0) && value < 256) && (cachedObj = UINT_CACHE[value]) ? cachedObj : (obj = fromBits(value, (0 | value) < 0 ? -1 : 0, !0), 
    cache && (UINT_CACHE[value] = obj), obj) : (cache = -128 <= (value |= 0) && value < 128) && (cachedObj = INT_CACHE[value]) ? cachedObj : (obj = fromBits(value, value < 0 ? -1 : 0, !1), 
    cache && (INT_CACHE[value] = obj), obj);
   }
   function fromNumber(value, unsigned) {
    if (isNaN(value) || !isFinite(value)) return unsigned ? UZERO : ZERO;
    if (unsigned) {
     if (value < 0) return UZERO;
     if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
    } else {
     if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
     if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
    }
    return value < 0 ? fromNumber(-value, unsigned).neg() : fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
   }
   function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
   }
   Long.fromInt = fromInt, Long.fromNumber = fromNumber, Long.fromBits = fromBits;
   var pow_dbl = Math.pow;
   function fromString(str, unsigned, radix) {
    if (0 === str.length) throw Error("empty string");
    if ("NaN" === str || "Infinity" === str || "+Infinity" === str || "-Infinity" === str) return ZERO;
    if ("number" == typeof unsigned ? (radix = unsigned, unsigned = !1) : unsigned = !!unsigned, 
    (radix = radix || 10) < 2 || 36 < radix) throw RangeError("radix");
    var p;
    if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
    if (0 === p) return fromString(str.substring(1), unsigned, radix).neg();
    for (var radixToPower = fromNumber(pow_dbl(radix, 8)), result = ZERO, i = 0; i < str.length; i += 8) {
     var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
     if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
     } else result = (result = result.mul(radixToPower)).add(fromNumber(value));
    }
    return result.unsigned = unsigned, result;
   }
   function fromValue(val) {
    return val instanceof Long ? val : "number" == typeof val ? fromNumber(val) : "string" == typeof val ? fromString(val) : fromBits(val.low, val.high, val.unsigned);
   }
   Long.fromString = fromString, Long.fromValue = fromValue;
   var TWO_PWR_32_DBL = 4294967296, TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL, TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2, TWO_PWR_24 = fromInt(1 << 24), ZERO = fromInt(0);
   Long.ZERO = ZERO;
   var UZERO = fromInt(0, !0);
   Long.UZERO = UZERO;
   var ONE = fromInt(1);
   Long.ONE = ONE;
   var UONE = fromInt(1, !0);
   Long.UONE = UONE;
   var NEG_ONE = fromInt(-1);
   Long.NEG_ONE = NEG_ONE;
   var MAX_VALUE = fromBits(-1, 2147483647, !1);
   Long.MAX_VALUE = MAX_VALUE;
   var MAX_UNSIGNED_VALUE = fromBits(-1, -1, !0);
   Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
   var MIN_VALUE = fromBits(0, -2147483648, !1);
   Long.MIN_VALUE = MIN_VALUE;
   var LongPrototype = Long.prototype;
   return LongPrototype.toInt = function() {
    return this.unsigned ? this.low >>> 0 : this.low;
   }, LongPrototype.toNumber = function() {
    return this.unsigned ? (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0) : this.high * TWO_PWR_32_DBL + (this.low >>> 0);
   }, LongPrototype.toString = function(radix) {
    if ((radix = radix || 10) < 2 || 36 < radix) throw RangeError("radix");
    if (this.isZero()) return "0";
    if (this.isNegative()) {
     if (this.eq(MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
     }
     return "-" + this.neg().toString(radix);
    }
    for (var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this, result = ""; ;) {
     var remDiv = rem.div(radixToPower), digits = (rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0).toString(radix);
     if ((rem = remDiv).isZero()) return digits + result;
     for (;digits.length < 6; ) digits = "0" + digits;
     result = "" + digits + result;
    }
   }, LongPrototype.getHighBits = function() {
    return this.high;
   }, LongPrototype.getHighBitsUnsigned = function() {
    return this.high >>> 0;
   }, LongPrototype.getLowBits = function() {
    return this.low;
   }, LongPrototype.getLowBitsUnsigned = function() {
    return this.low >>> 0;
   }, LongPrototype.getNumBitsAbs = function() {
    if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    for (var val = 0 != this.high ? this.high : this.low, bit = 31; bit > 0 && 0 == (val & 1 << bit); bit--) ;
    return 0 != this.high ? bit + 33 : bit + 1;
   }, LongPrototype.isZero = function() {
    return 0 === this.high && 0 === this.low;
   }, LongPrototype.isNegative = function() {
    return !this.unsigned && this.high < 0;
   }, LongPrototype.isPositive = function() {
    return this.unsigned || this.high >= 0;
   }, LongPrototype.isOdd = function() {
    return 1 == (1 & this.low);
   }, LongPrototype.isEven = function() {
    return 0 == (1 & this.low);
   }, LongPrototype.equals = function(other) {
    return isLong(other) || (other = fromValue(other)), (this.unsigned === other.unsigned || this.high >>> 31 != 1 || other.high >>> 31 != 1) && (this.high === other.high && this.low === other.low);
   }, LongPrototype.eq = LongPrototype.equals, LongPrototype.notEquals = function(other) {
    return !this.eq(other);
   }, LongPrototype.neq = LongPrototype.notEquals, LongPrototype.lessThan = function(other) {
    return this.comp(other) < 0;
   }, LongPrototype.lt = LongPrototype.lessThan, LongPrototype.lessThanOrEqual = function(other) {
    return this.comp(other) <= 0;
   }, LongPrototype.lte = LongPrototype.lessThanOrEqual, LongPrototype.greaterThan = function(other) {
    return this.comp(other) > 0;
   }, LongPrototype.gt = LongPrototype.greaterThan, LongPrototype.greaterThanOrEqual = function(other) {
    return this.comp(other) >= 0;
   }, LongPrototype.gte = LongPrototype.greaterThanOrEqual, LongPrototype.compare = function(other) {
    if (isLong(other) || (other = fromValue(other)), this.eq(other)) return 0;
    var thisNeg = this.isNegative(), otherNeg = other.isNegative();
    return thisNeg && !otherNeg ? -1 : !thisNeg && otherNeg ? 1 : this.unsigned ? other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(other).isNegative() ? -1 : 1;
   }, LongPrototype.comp = LongPrototype.compare, LongPrototype.negate = function() {
    return !this.unsigned && this.eq(MIN_VALUE) ? MIN_VALUE : this.not().add(ONE);
   }, LongPrototype.neg = LongPrototype.negate, LongPrototype.add = function(addend) {
    isLong(addend) || (addend = fromValue(addend));
    var a48 = this.high >>> 16, a32 = 65535 & this.high, a16 = this.low >>> 16, a00 = 65535 & this.low, b48 = addend.high >>> 16, b32 = 65535 & addend.high, b16 = addend.low >>> 16, c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    return c16 += (c00 += a00 + (65535 & addend.low)) >>> 16, c32 += (c16 += a16 + b16) >>> 16, 
    c48 += (c32 += a32 + b32) >>> 16, c48 += a48 + b48, fromBits((c16 &= 65535) << 16 | (c00 &= 65535), (c48 &= 65535) << 16 | (c32 &= 65535), this.unsigned);
   }, LongPrototype.subtract = function(subtrahend) {
    return isLong(subtrahend) || (subtrahend = fromValue(subtrahend)), this.add(subtrahend.neg());
   }, LongPrototype.sub = LongPrototype.subtract, LongPrototype.multiply = function(multiplier) {
    if (this.isZero()) return ZERO;
    if (isLong(multiplier) || (multiplier = fromValue(multiplier)), multiplier.isZero()) return ZERO;
    if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
    if (this.isNegative()) return multiplier.isNegative() ? this.neg().mul(multiplier.neg()) : this.neg().mul(multiplier).neg();
    if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
    var a48 = this.high >>> 16, a32 = 65535 & this.high, a16 = this.low >>> 16, a00 = 65535 & this.low, b48 = multiplier.high >>> 16, b32 = 65535 & multiplier.high, b16 = multiplier.low >>> 16, b00 = 65535 & multiplier.low, c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    return c16 += (c00 += a00 * b00) >>> 16, c32 += (c16 += a16 * b00) >>> 16, c16 &= 65535, 
    c32 += (c16 += a00 * b16) >>> 16, c48 += (c32 += a32 * b00) >>> 16, c32 &= 65535, 
    c48 += (c32 += a16 * b16) >>> 16, c32 &= 65535, c48 += (c32 += a00 * b32) >>> 16, 
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48, fromBits((c16 &= 65535) << 16 | (c00 &= 65535), (c48 &= 65535) << 16 | (c32 &= 65535), this.unsigned);
   }, LongPrototype.mul = LongPrototype.multiply, LongPrototype.divide = function(divisor) {
    if (isLong(divisor) || (divisor = fromValue(divisor)), divisor.isZero()) throw Error("division by zero");
    if (this.isZero()) return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (this.unsigned) {
     if (divisor.unsigned || (divisor = divisor.toUnsigned()), divisor.gt(this)) return UZERO;
     if (divisor.gt(this.shru(1))) return UONE;
     res = UZERO;
    } else {
     if (this.eq(MIN_VALUE)) return divisor.eq(ONE) || divisor.eq(NEG_ONE) ? MIN_VALUE : divisor.eq(MIN_VALUE) ? ONE : (approx = this.shr(1).div(divisor).shl(1)).eq(ZERO) ? divisor.isNegative() ? ONE : NEG_ONE : (rem = this.sub(divisor.mul(approx)), 
     res = approx.add(rem.div(divisor)));
     if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
     if (this.isNegative()) return divisor.isNegative() ? this.neg().div(divisor.neg()) : this.neg().div(divisor).neg();
     if (divisor.isNegative()) return this.div(divisor.neg()).neg();
     res = ZERO;
    }
    for (rem = this; rem.gte(divisor); ) {
     approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
     for (var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor); approxRem.isNegative() || approxRem.gt(rem); ) approxRem = (approxRes = fromNumber(approx -= delta, this.unsigned)).mul(divisor);
     approxRes.isZero() && (approxRes = ONE), res = res.add(approxRes), rem = rem.sub(approxRem);
    }
    return res;
   }, LongPrototype.div = LongPrototype.divide, LongPrototype.modulo = function(divisor) {
    return isLong(divisor) || (divisor = fromValue(divisor)), this.sub(this.div(divisor).mul(divisor));
   }, LongPrototype.mod = LongPrototype.modulo, LongPrototype.not = function() {
    return fromBits(~this.low, ~this.high, this.unsigned);
   }, LongPrototype.and = function(other) {
    return isLong(other) || (other = fromValue(other)), fromBits(this.low & other.low, this.high & other.high, this.unsigned);
   }, LongPrototype.or = function(other) {
    return isLong(other) || (other = fromValue(other)), fromBits(this.low | other.low, this.high | other.high, this.unsigned);
   }, LongPrototype.xor = function(other) {
    return isLong(other) || (other = fromValue(other)), fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
   }, LongPrototype.shiftLeft = function(numBits) {
    return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned) : fromBits(0, this.low << numBits - 32, this.unsigned);
   }, LongPrototype.shl = LongPrototype.shiftLeft, LongPrototype.shiftRight = function(numBits) {
    return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned) : fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
   }, LongPrototype.shr = LongPrototype.shiftRight, LongPrototype.shiftRightUnsigned = function(numBits) {
    if (isLong(numBits) && (numBits = numBits.toInt()), 0 === (numBits &= 63)) return this;
    var high = this.high;
    return numBits < 32 ? fromBits(this.low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned) : fromBits(32 === numBits ? high : high >>> numBits - 32, 0, this.unsigned);
   }, LongPrototype.shru = LongPrototype.shiftRightUnsigned, LongPrototype.toSigned = function() {
    return this.unsigned ? fromBits(this.low, this.high, !1) : this;
   }, LongPrototype.toUnsigned = function() {
    return this.unsigned ? this : fromBits(this.low, this.high, !0);
   }, LongPrototype.toBytes = function(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
   }, LongPrototype.toBytesLE = function() {
    var hi = this.high, lo = this.low;
    return [ 255 & lo, lo >>> 8 & 255, lo >>> 16 & 255, lo >>> 24 & 255, 255 & hi, hi >>> 8 & 255, hi >>> 16 & 255, hi >>> 24 & 255 ];
   }, LongPrototype.toBytesBE = function() {
    var hi = this.high, lo = this.low;
    return [ hi >>> 24 & 255, hi >>> 16 & 255, hi >>> 8 & 255, 255 & hi, lo >>> 24 & 255, lo >>> 16 & 255, lo >>> 8 & 255, 255 & lo ];
   }, Long;
  }));
 })), bytebuffer = createCommonjsModule((function(module) {
  /**
	 * @license bytebuffer.js (c) 2015 Daniel Wirtz <dcode@dcode.io>
	 * Backing buffer: ArrayBuffer, Accessor: Uint8Array
	 * Released under the Apache License, Version 2.0
	 * see: https://github.com/dcodeIO/bytebuffer.js for details
	 */
  !function(global, factory) {
   module && module.exports ? module.exports = function() {
    var Long;
    try {
     Long = long_1;
    } catch (e) {}
    return factory(Long);
   }() : (global.dcodeIO = global.dcodeIO || {}).ByteBuffer = factory(global.dcodeIO.Long);
  }(commonjsGlobal, (function(Long) {
   var ByteBuffer = function(capacity, littleEndian, noAssert) {
    if (void 0 === capacity && (capacity = ByteBuffer.DEFAULT_CAPACITY), void 0 === littleEndian && (littleEndian = ByteBuffer.DEFAULT_ENDIAN), 
    void 0 === noAssert && (noAssert = ByteBuffer.DEFAULT_NOASSERT), !noAssert) {
     if ((capacity |= 0) < 0) throw RangeError("Illegal capacity");
     littleEndian = !!littleEndian, noAssert = !!noAssert;
    }
    this.buffer = 0 === capacity ? EMPTY_BUFFER : new ArrayBuffer(capacity), this.view = 0 === capacity ? null : new Uint8Array(this.buffer), 
    this.offset = 0, this.markedOffset = -1, this.limit = capacity, this.littleEndian = littleEndian, 
    this.noAssert = noAssert;
   };
   ByteBuffer.VERSION = "5.0.1", ByteBuffer.LITTLE_ENDIAN = !0, ByteBuffer.BIG_ENDIAN = !1, 
   ByteBuffer.DEFAULT_CAPACITY = 16, ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN, 
   ByteBuffer.DEFAULT_NOASSERT = !1, ByteBuffer.Long = Long || null;
   var ByteBufferPrototype = ByteBuffer.prototype;
   ByteBufferPrototype.__isByteBuffer__, Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
    value: !0,
    enumerable: !1,
    configurable: !1
   });
   var EMPTY_BUFFER = new ArrayBuffer(0), stringFromCharCode = String.fromCharCode;
   function stringSource(s) {
    var i = 0;
    return function() {
     return i < s.length ? s.charCodeAt(i++) : null;
    };
   }
   function stringDestination() {
    var cs = [], ps = [];
    return function() {
     if (0 === arguments.length) return ps.join("") + stringFromCharCode.apply(String, cs);
     cs.length + arguments.length > 1024 && (ps.push(stringFromCharCode.apply(String, cs)), 
     cs.length = 0), Array.prototype.push.apply(cs, arguments);
    };
   }
   function ieee754_read(buffer, offset, isLE, mLen, nBytes) {
    var e, m, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
    for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = 256 * e + buffer[offset + i], 
    i += d, nBits -= 8) ;
    for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = 256 * m + buffer[offset + i], 
    i += d, nBits -= 8) ;
    if (0 === e) e = 1 - eBias; else {
     if (e === eMax) return m ? NaN : 1 / 0 * (s ? -1 : 1);
     m += Math.pow(2, mLen), e -= eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
   }
   function ieee754_write(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c, eLen = 8 * nBytes - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
    for (value = Math.abs(value), isNaN(value) || value === 1 / 0 ? (m = isNaN(value) ? 1 : 0, 
    e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, 
    c *= 2), (value += e + eBias >= 1 ? rt / c : rt * Math.pow(2, 1 - eBias)) * c >= 2 && (e++, 
    c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), 
    e += eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = 255 & m, 
    i += d, m /= 256, mLen -= 8) ;
    for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = 255 & e, i += d, 
    e /= 256, eLen -= 8) ;
    buffer[offset + i - d] |= 128 * s;
   }
   ByteBuffer.accessor = function() {
    return Uint8Array;
   }, ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
    return new ByteBuffer(capacity, littleEndian, noAssert);
   }, ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
    "boolean" != typeof encoding && "string" == typeof encoding || (noAssert = littleEndian, 
    littleEndian = encoding, encoding = void 0);
    for (var length, capacity = 0, i = 0, k = buffers.length; i < k; ++i) ByteBuffer.isByteBuffer(buffers[i]) || (buffers[i] = ByteBuffer.wrap(buffers[i], encoding)), 
    (length = buffers[i].limit - buffers[i].offset) > 0 && (capacity += length);
    if (0 === capacity) return new ByteBuffer(0, littleEndian, noAssert);
    var bi, bb = new ByteBuffer(capacity, littleEndian, noAssert);
    for (i = 0; i < k; ) (length = (bi = buffers[i++]).limit - bi.offset) <= 0 || (bb.view.set(bi.view.subarray(bi.offset, bi.limit), bb.offset), 
    bb.offset += length);
    return bb.limit = bb.offset, bb.offset = 0, bb;
   }, ByteBuffer.isByteBuffer = function(bb) {
    return !0 === (bb && bb.__isByteBuffer__);
   }, ByteBuffer.type = function() {
    return ArrayBuffer;
   }, ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
    if ("string" != typeof encoding && (noAssert = littleEndian, littleEndian = encoding, 
    encoding = void 0), "string" == typeof buffer) switch (void 0 === encoding && (encoding = "utf8"), 
    encoding) {
    case "base64":
     return ByteBuffer.fromBase64(buffer, littleEndian);

    case "hex":
     return ByteBuffer.fromHex(buffer, littleEndian);

    case "binary":
     return ByteBuffer.fromBinary(buffer, littleEndian);

    case "utf8":
     return ByteBuffer.fromUTF8(buffer, littleEndian);

    case "debug":
     return ByteBuffer.fromDebug(buffer, littleEndian);

    default:
     throw Error("Unsupported encoding: " + encoding);
    }
    if (null === buffer || "object" != typeof buffer) throw TypeError("Illegal buffer");
    var bb;
    if (ByteBuffer.isByteBuffer(buffer)) return (bb = ByteBufferPrototype.clone.call(buffer)).markedOffset = -1, 
    bb;
    if (buffer instanceof Uint8Array) bb = new ByteBuffer(0, littleEndian, noAssert), 
    buffer.length > 0 && (bb.buffer = buffer.buffer, bb.offset = buffer.byteOffset, 
    bb.limit = buffer.byteOffset + buffer.byteLength, bb.view = new Uint8Array(buffer.buffer)); else if (buffer instanceof ArrayBuffer) bb = new ByteBuffer(0, littleEndian, noAssert), 
    buffer.byteLength > 0 && (bb.buffer = buffer, bb.offset = 0, bb.limit = buffer.byteLength, 
    bb.view = buffer.byteLength > 0 ? new Uint8Array(buffer) : null); else {
     if ("[object Array]" !== Object.prototype.toString.call(buffer)) throw TypeError("Illegal buffer");
     (bb = new ByteBuffer(buffer.length, littleEndian, noAssert)).limit = buffer.length;
     for (var i = 0; i < buffer.length; ++i) bb.view[i] = buffer[i];
    }
    return bb;
   }, ByteBufferPrototype.writeBitSet = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if (!(value instanceof Array)) throw TypeError("Illegal BitSet: Not an array");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    var k, start = offset, bits = value.length, bytes = bits >> 3, bit = 0;
    for (offset += this.writeVarint32(bits, offset); bytes--; ) k = 1 & !!value[bit++] | (1 & !!value[bit++]) << 1 | (1 & !!value[bit++]) << 2 | (1 & !!value[bit++]) << 3 | (1 & !!value[bit++]) << 4 | (1 & !!value[bit++]) << 5 | (1 & !!value[bit++]) << 6 | (1 & !!value[bit++]) << 7, 
    this.writeByte(k, offset++);
    if (bit < bits) {
     var m = 0;
     for (k = 0; bit < bits; ) k |= (1 & !!value[bit++]) << m++;
     this.writeByte(k, offset++);
    }
    return relative ? (this.offset = offset, this) : offset - start;
   }, ByteBufferPrototype.readBitSet = function(offset) {
    var relative = void 0 === offset;
    relative && (offset = this.offset);
    var k, ret = this.readVarint32(offset), bits = ret.value, bytes = bits >> 3, bit = 0, value = [];
    for (offset += ret.length; bytes--; ) k = this.readByte(offset++), value[bit++] = !!(1 & k), 
    value[bit++] = !!(2 & k), value[bit++] = !!(4 & k), value[bit++] = !!(8 & k), value[bit++] = !!(16 & k), 
    value[bit++] = !!(32 & k), value[bit++] = !!(64 & k), value[bit++] = !!(128 & k);
    if (bit < bits) {
     var m = 0;
     for (k = this.readByte(offset++); bit < bits; ) value[bit++] = !!(k >> m++ & 1);
    }
    return relative && (this.offset = offset), value;
   }, ByteBufferPrototype.readBytes = function(length, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + length > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.byteLength);
    }
    var slice = this.slice(offset, offset + length);
    return relative && (this.offset += length), slice;
   }, ByteBufferPrototype.writeBytes = ByteBufferPrototype.append, ByteBufferPrototype.writeInt8 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value || value % 1 != 0) throw TypeError("Illegal value: " + value + " (not an integer)");
     if (value |= 0, "number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    offset += 1;
    var capacity0 = this.buffer.byteLength;
    return offset > capacity0 && this.resize((capacity0 *= 2) > offset ? capacity0 : offset), 
    offset -= 1, this.view[offset] = value, relative && (this.offset += 1), this;
   }, ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8, ByteBufferPrototype.readInt8 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
    }
    var value = this.view[offset];
    return 128 == (128 & value) && (value = -(255 - value + 1)), relative && (this.offset += 1), 
    value;
   }, ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8, ByteBufferPrototype.writeUint8 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value || value % 1 != 0) throw TypeError("Illegal value: " + value + " (not an integer)");
     if (value >>>= 0, "number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    offset += 1;
    var capacity1 = this.buffer.byteLength;
    return offset > capacity1 && this.resize((capacity1 *= 2) > offset ? capacity1 : offset), 
    offset -= 1, this.view[offset] = value, relative && (this.offset += 1), this;
   }, ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8, ByteBufferPrototype.readUint8 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
    }
    var value = this.view[offset];
    return relative && (this.offset += 1), value;
   }, ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8, ByteBufferPrototype.writeInt16 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value || value % 1 != 0) throw TypeError("Illegal value: " + value + " (not an integer)");
     if (value |= 0, "number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    offset += 2;
    var capacity2 = this.buffer.byteLength;
    return offset > capacity2 && this.resize((capacity2 *= 2) > offset ? capacity2 : offset), 
    offset -= 2, this.littleEndian ? (this.view[offset + 1] = (65280 & value) >>> 8, 
    this.view[offset] = 255 & value) : (this.view[offset] = (65280 & value) >>> 8, this.view[offset + 1] = 255 & value), 
    relative && (this.offset += 2), this;
   }, ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16, ByteBufferPrototype.readInt16 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+2) <= " + this.buffer.byteLength);
    }
    var value = 0;
    return this.littleEndian ? (value = this.view[offset], value |= this.view[offset + 1] << 8) : (value = this.view[offset] << 8, 
    value |= this.view[offset + 1]), 32768 == (32768 & value) && (value = -(65535 - value + 1)), 
    relative && (this.offset += 2), value;
   }, ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16, ByteBufferPrototype.writeUint16 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value || value % 1 != 0) throw TypeError("Illegal value: " + value + " (not an integer)");
     if (value >>>= 0, "number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    offset += 2;
    var capacity3 = this.buffer.byteLength;
    return offset > capacity3 && this.resize((capacity3 *= 2) > offset ? capacity3 : offset), 
    offset -= 2, this.littleEndian ? (this.view[offset + 1] = (65280 & value) >>> 8, 
    this.view[offset] = 255 & value) : (this.view[offset] = (65280 & value) >>> 8, this.view[offset + 1] = 255 & value), 
    relative && (this.offset += 2), this;
   }, ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16, ByteBufferPrototype.readUint16 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+2) <= " + this.buffer.byteLength);
    }
    var value = 0;
    return this.littleEndian ? (value = this.view[offset], value |= this.view[offset + 1] << 8) : (value = this.view[offset] << 8, 
    value |= this.view[offset + 1]), relative && (this.offset += 2), value;
   }, ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16, ByteBufferPrototype.writeInt32 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value || value % 1 != 0) throw TypeError("Illegal value: " + value + " (not an integer)");
     if (value |= 0, "number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    offset += 4;
    var capacity4 = this.buffer.byteLength;
    return offset > capacity4 && this.resize((capacity4 *= 2) > offset ? capacity4 : offset), 
    offset -= 4, this.littleEndian ? (this.view[offset + 3] = value >>> 24 & 255, this.view[offset + 2] = value >>> 16 & 255, 
    this.view[offset + 1] = value >>> 8 & 255, this.view[offset] = 255 & value) : (this.view[offset] = value >>> 24 & 255, 
    this.view[offset + 1] = value >>> 16 & 255, this.view[offset + 2] = value >>> 8 & 255, 
    this.view[offset + 3] = 255 & value), relative && (this.offset += 4), this;
   }, ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32, ByteBufferPrototype.readInt32 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
    }
    var value = 0;
    return this.littleEndian ? (value = this.view[offset + 2] << 16, value |= this.view[offset + 1] << 8, 
    value |= this.view[offset], value += this.view[offset + 3] << 24 >>> 0) : (value = this.view[offset + 1] << 16, 
    value |= this.view[offset + 2] << 8, value |= this.view[offset + 3], value += this.view[offset] << 24 >>> 0), 
    value |= 0, relative && (this.offset += 4), value;
   }, ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32, ByteBufferPrototype.writeUint32 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value || value % 1 != 0) throw TypeError("Illegal value: " + value + " (not an integer)");
     if (value >>>= 0, "number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    offset += 4;
    var capacity5 = this.buffer.byteLength;
    return offset > capacity5 && this.resize((capacity5 *= 2) > offset ? capacity5 : offset), 
    offset -= 4, this.littleEndian ? (this.view[offset + 3] = value >>> 24 & 255, this.view[offset + 2] = value >>> 16 & 255, 
    this.view[offset + 1] = value >>> 8 & 255, this.view[offset] = 255 & value) : (this.view[offset] = value >>> 24 & 255, 
    this.view[offset + 1] = value >>> 16 & 255, this.view[offset + 2] = value >>> 8 & 255, 
    this.view[offset + 3] = 255 & value), relative && (this.offset += 4), this;
   }, ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32, ByteBufferPrototype.readUint32 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
    }
    var value = 0;
    return this.littleEndian ? (value = this.view[offset + 2] << 16, value |= this.view[offset + 1] << 8, 
    value |= this.view[offset], value += this.view[offset + 3] << 24 >>> 0) : (value = this.view[offset + 1] << 16, 
    value |= this.view[offset + 2] << 8, value |= this.view[offset + 3], value += this.view[offset] << 24 >>> 0), 
    relative && (this.offset += 4), value;
   }, ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32, Long && (ByteBufferPrototype.writeInt64 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" == typeof value) value = Long.fromNumber(value); else if ("string" == typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    "number" == typeof value ? value = Long.fromNumber(value) : "string" == typeof value && (value = Long.fromString(value)), 
    offset += 8;
    var capacity6 = this.buffer.byteLength;
    offset > capacity6 && this.resize((capacity6 *= 2) > offset ? capacity6 : offset), 
    offset -= 8;
    var lo = value.low, hi = value.high;
    return this.littleEndian ? (this.view[offset + 3] = lo >>> 24 & 255, this.view[offset + 2] = lo >>> 16 & 255, 
    this.view[offset + 1] = lo >>> 8 & 255, this.view[offset] = 255 & lo, offset += 4, 
    this.view[offset + 3] = hi >>> 24 & 255, this.view[offset + 2] = hi >>> 16 & 255, 
    this.view[offset + 1] = hi >>> 8 & 255, this.view[offset] = 255 & hi) : (this.view[offset] = hi >>> 24 & 255, 
    this.view[offset + 1] = hi >>> 16 & 255, this.view[offset + 2] = hi >>> 8 & 255, 
    this.view[offset + 3] = 255 & hi, offset += 4, this.view[offset] = lo >>> 24 & 255, 
    this.view[offset + 1] = lo >>> 16 & 255, this.view[offset + 2] = lo >>> 8 & 255, 
    this.view[offset + 3] = 255 & lo), relative && (this.offset += 8), this;
   }, ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64, ByteBufferPrototype.readInt64 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
    }
    var lo = 0, hi = 0;
    this.littleEndian ? (lo = this.view[offset + 2] << 16, lo |= this.view[offset + 1] << 8, 
    lo |= this.view[offset], lo += this.view[offset + 3] << 24 >>> 0, offset += 4, hi = this.view[offset + 2] << 16, 
    hi |= this.view[offset + 1] << 8, hi |= this.view[offset], hi += this.view[offset + 3] << 24 >>> 0) : (hi = this.view[offset + 1] << 16, 
    hi |= this.view[offset + 2] << 8, hi |= this.view[offset + 3], hi += this.view[offset] << 24 >>> 0, 
    offset += 4, lo = this.view[offset + 1] << 16, lo |= this.view[offset + 2] << 8, 
    lo |= this.view[offset + 3], lo += this.view[offset] << 24 >>> 0);
    var value = new Long(lo, hi, !1);
    return relative && (this.offset += 8), value;
   }, ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64, ByteBufferPrototype.writeUint64 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" == typeof value) value = Long.fromNumber(value); else if ("string" == typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    "number" == typeof value ? value = Long.fromNumber(value) : "string" == typeof value && (value = Long.fromString(value)), 
    offset += 8;
    var capacity7 = this.buffer.byteLength;
    offset > capacity7 && this.resize((capacity7 *= 2) > offset ? capacity7 : offset), 
    offset -= 8;
    var lo = value.low, hi = value.high;
    return this.littleEndian ? (this.view[offset + 3] = lo >>> 24 & 255, this.view[offset + 2] = lo >>> 16 & 255, 
    this.view[offset + 1] = lo >>> 8 & 255, this.view[offset] = 255 & lo, offset += 4, 
    this.view[offset + 3] = hi >>> 24 & 255, this.view[offset + 2] = hi >>> 16 & 255, 
    this.view[offset + 1] = hi >>> 8 & 255, this.view[offset] = 255 & hi) : (this.view[offset] = hi >>> 24 & 255, 
    this.view[offset + 1] = hi >>> 16 & 255, this.view[offset + 2] = hi >>> 8 & 255, 
    this.view[offset + 3] = 255 & hi, offset += 4, this.view[offset] = lo >>> 24 & 255, 
    this.view[offset + 1] = lo >>> 16 & 255, this.view[offset + 2] = lo >>> 8 & 255, 
    this.view[offset + 3] = 255 & lo), relative && (this.offset += 8), this;
   }, ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64, ByteBufferPrototype.readUint64 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
    }
    var lo = 0, hi = 0;
    this.littleEndian ? (lo = this.view[offset + 2] << 16, lo |= this.view[offset + 1] << 8, 
    lo |= this.view[offset], lo += this.view[offset + 3] << 24 >>> 0, offset += 4, hi = this.view[offset + 2] << 16, 
    hi |= this.view[offset + 1] << 8, hi |= this.view[offset], hi += this.view[offset + 3] << 24 >>> 0) : (hi = this.view[offset + 1] << 16, 
    hi |= this.view[offset + 2] << 8, hi |= this.view[offset + 3], hi += this.view[offset] << 24 >>> 0, 
    offset += 4, lo = this.view[offset + 1] << 16, lo |= this.view[offset + 2] << 8, 
    lo |= this.view[offset + 3], lo += this.view[offset] << 24 >>> 0);
    var value = new Long(lo, hi, !0);
    return relative && (this.offset += 8), value;
   }, ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64), ByteBufferPrototype.writeFloat32 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value) throw TypeError("Illegal value: " + value + " (not a number)");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    offset += 4;
    var capacity8 = this.buffer.byteLength;
    return offset > capacity8 && this.resize((capacity8 *= 2) > offset ? capacity8 : offset), 
    offset -= 4, ieee754_write(this.view, value, offset, this.littleEndian, 23, 4), 
    relative && (this.offset += 4), this;
   }, ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32, ByteBufferPrototype.readFloat32 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
    }
    var value = ieee754_read(this.view, offset, this.littleEndian, 23, 4);
    return relative && (this.offset += 4), value;
   }, ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32, ByteBufferPrototype.writeFloat64 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value) throw TypeError("Illegal value: " + value + " (not a number)");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    offset += 8;
    var capacity9 = this.buffer.byteLength;
    return offset > capacity9 && this.resize((capacity9 *= 2) > offset ? capacity9 : offset), 
    offset -= 8, ieee754_write(this.view, value, offset, this.littleEndian, 52, 8), 
    relative && (this.offset += 8), this;
   }, ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64, ByteBufferPrototype.readFloat64 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+8) <= " + this.buffer.byteLength);
    }
    var value = ieee754_read(this.view, offset, this.littleEndian, 52, 8);
    return relative && (this.offset += 8), value;
   }, ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64, ByteBuffer.MAX_VARINT32_BYTES = 5, 
   ByteBuffer.calculateVarint32 = function(value) {
    return (value >>>= 0) < 128 ? 1 : value < 16384 ? 2 : value < 1 << 21 ? 3 : value < 1 << 28 ? 4 : 5;
   }, ByteBuffer.zigZagEncode32 = function(n) {
    return ((n |= 0) << 1 ^ n >> 31) >>> 0;
   }, ByteBuffer.zigZagDecode32 = function(n) {
    return n >>> 1 ^ -(1 & n) | 0;
   }, ByteBufferPrototype.writeVarint32 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof value || value % 1 != 0) throw TypeError("Illegal value: " + value + " (not an integer)");
     if (value |= 0, "number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    var b, size = ByteBuffer.calculateVarint32(value);
    offset += size;
    var capacity10 = this.buffer.byteLength;
    for (offset > capacity10 && this.resize((capacity10 *= 2) > offset ? capacity10 : offset), 
    offset -= size, value >>>= 0; value >= 128; ) b = 127 & value | 128, this.view[offset++] = b, 
    value >>>= 7;
    return this.view[offset++] = value, relative ? (this.offset = offset, this) : size;
   }, ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
    return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
   }, ByteBufferPrototype.readVarint32 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
    }
    var b, c = 0, value = 0;
    do {
     if (!this.noAssert && offset > this.limit) {
      var err = Error("Truncated");
      throw err.truncated = !0, err;
     }
     b = this.view[offset++], c < 5 && (value |= (127 & b) << 7 * c), ++c;
    } while (0 != (128 & b));
    return value |= 0, relative ? (this.offset = offset, value) : {
     value: value,
     length: c
    };
   }, ByteBufferPrototype.readVarint32ZigZag = function(offset) {
    var val = this.readVarint32(offset);
    return "object" == typeof val ? val.value = ByteBuffer.zigZagDecode32(val.value) : val = ByteBuffer.zigZagDecode32(val), 
    val;
   }, Long && (ByteBuffer.MAX_VARINT64_BYTES = 10, ByteBuffer.calculateVarint64 = function(value) {
    "number" == typeof value ? value = Long.fromNumber(value) : "string" == typeof value && (value = Long.fromString(value));
    var part0 = value.toInt() >>> 0, part1 = value.shiftRightUnsigned(28).toInt() >>> 0, part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
    return 0 == part2 ? 0 == part1 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 1 << 21 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 1 << 21 ? 7 : 8 : part2 < 128 ? 9 : 10;
   }, ByteBuffer.zigZagEncode64 = function(value) {
    return "number" == typeof value ? value = Long.fromNumber(value, !1) : "string" == typeof value ? value = Long.fromString(value, !1) : !1 !== value.unsigned && (value = value.toSigned()), 
    value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
   }, ByteBuffer.zigZagDecode64 = function(value) {
    return "number" == typeof value ? value = Long.fromNumber(value, !1) : "string" == typeof value ? value = Long.fromString(value, !1) : !1 !== value.unsigned && (value = value.toSigned()), 
    value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
   }, ByteBufferPrototype.writeVarint64 = function(value, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" == typeof value) value = Long.fromNumber(value); else if ("string" == typeof value) value = Long.fromString(value); else if (!(value && value instanceof Long)) throw TypeError("Illegal value: " + value + " (not an integer or Long)");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    "number" == typeof value ? value = Long.fromNumber(value, !1) : "string" == typeof value ? value = Long.fromString(value, !1) : !1 !== value.unsigned && (value = value.toSigned());
    var size = ByteBuffer.calculateVarint64(value), part0 = value.toInt() >>> 0, part1 = value.shiftRightUnsigned(28).toInt() >>> 0, part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
    offset += size;
    var capacity11 = this.buffer.byteLength;
    switch (offset > capacity11 && this.resize((capacity11 *= 2) > offset ? capacity11 : offset), 
    offset -= size, size) {
    case 10:
     this.view[offset + 9] = part2 >>> 7 & 1;

    case 9:
     this.view[offset + 8] = 9 !== size ? 128 | part2 : 127 & part2;

    case 8:
     this.view[offset + 7] = 8 !== size ? part1 >>> 21 | 128 : part1 >>> 21 & 127;

    case 7:
     this.view[offset + 6] = 7 !== size ? part1 >>> 14 | 128 : part1 >>> 14 & 127;

    case 6:
     this.view[offset + 5] = 6 !== size ? part1 >>> 7 | 128 : part1 >>> 7 & 127;

    case 5:
     this.view[offset + 4] = 5 !== size ? 128 | part1 : 127 & part1;

    case 4:
     this.view[offset + 3] = 4 !== size ? part0 >>> 21 | 128 : part0 >>> 21 & 127;

    case 3:
     this.view[offset + 2] = 3 !== size ? part0 >>> 14 | 128 : part0 >>> 14 & 127;

    case 2:
     this.view[offset + 1] = 2 !== size ? part0 >>> 7 | 128 : part0 >>> 7 & 127;

    case 1:
     this.view[offset] = 1 !== size ? 128 | part0 : 127 & part0;
    }
    return relative ? (this.offset += size, this) : size;
   }, ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
    return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
   }, ByteBufferPrototype.readVarint64 = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
    }
    var start = offset, part0 = 0, part1 = 0, part2 = 0, b = 0;
    if (part0 = 127 & (b = this.view[offset++]), 128 & b && (part0 |= (127 & (b = this.view[offset++])) << 7, 
    (128 & b || this.noAssert && void 0 === b) && (part0 |= (127 & (b = this.view[offset++])) << 14, 
    (128 & b || this.noAssert && void 0 === b) && (part0 |= (127 & (b = this.view[offset++])) << 21, 
    (128 & b || this.noAssert && void 0 === b) && (part1 = 127 & (b = this.view[offset++]), 
    (128 & b || this.noAssert && void 0 === b) && (part1 |= (127 & (b = this.view[offset++])) << 7, 
    (128 & b || this.noAssert && void 0 === b) && (part1 |= (127 & (b = this.view[offset++])) << 14, 
    (128 & b || this.noAssert && void 0 === b) && (part1 |= (127 & (b = this.view[offset++])) << 21, 
    (128 & b || this.noAssert && void 0 === b) && (part2 = 127 & (b = this.view[offset++]), 
    (128 & b || this.noAssert && void 0 === b) && (part2 |= (127 & (b = this.view[offset++])) << 7, 
    128 & b || this.noAssert && void 0 === b)))))))))) throw Error("Buffer overrun");
    var value = Long.fromBits(part0 | part1 << 28, part1 >>> 4 | part2 << 24, !1);
    return relative ? (this.offset = offset, value) : {
     value: value,
     length: offset - start
    };
   }, ByteBufferPrototype.readVarint64ZigZag = function(offset) {
    var val = this.readVarint64(offset);
    return val && val.value instanceof Long ? val.value = ByteBuffer.zigZagDecode64(val.value) : val = ByteBuffer.zigZagDecode64(val), 
    val;
   }), ByteBufferPrototype.writeCString = function(str, offset) {
    var relative = void 0 === offset;
    relative && (offset = this.offset);
    var i, k = str.length;
    if (!this.noAssert) {
     if ("string" != typeof str) throw TypeError("Illegal str: Not a string");
     for (i = 0; i < k; ++i) if (0 === str.charCodeAt(i)) throw RangeError("Illegal str: Contains NULL-characters");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    k = utfx.calculateUTF16asUTF8(stringSource(str))[1], offset += k + 1;
    var capacity12 = this.buffer.byteLength;
    return offset > capacity12 && this.resize((capacity12 *= 2) > offset ? capacity12 : offset), 
    offset -= k + 1, utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
     this.view[offset++] = b;
    }.bind(this)), this.view[offset++] = 0, relative ? (this.offset = offset, this) : k;
   }, ByteBufferPrototype.readCString = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
    }
    var sd, start = offset, b = -1;
    return utfx.decodeUTF8toUTF16(function() {
     if (0 === b) return null;
     if (offset >= this.limit) throw RangeError("Illegal range: Truncated data, " + offset + " < " + this.limit);
     return 0 === (b = this.view[offset++]) ? null : b;
    }.bind(this), sd = stringDestination(), !0), relative ? (this.offset = offset, sd()) : {
     string: sd(),
     length: offset - start
    };
   }, ByteBufferPrototype.writeIString = function(str, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("string" != typeof str) throw TypeError("Illegal str: Not a string");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    var k, start = offset;
    k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1], offset += 4 + k;
    var capacity13 = this.buffer.byteLength;
    if (offset > capacity13 && this.resize((capacity13 *= 2) > offset ? capacity13 : offset), 
    offset -= 4 + k, this.littleEndian ? (this.view[offset + 3] = k >>> 24 & 255, this.view[offset + 2] = k >>> 16 & 255, 
    this.view[offset + 1] = k >>> 8 & 255, this.view[offset] = 255 & k) : (this.view[offset] = k >>> 24 & 255, 
    this.view[offset + 1] = k >>> 16 & 255, this.view[offset + 2] = k >>> 8 & 255, this.view[offset + 3] = 255 & k), 
    offset += 4, utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
     this.view[offset++] = b;
    }.bind(this)), offset !== start + 4 + k) throw RangeError("Illegal range: Truncated data, " + offset + " == " + (offset + 4 + k));
    return relative ? (this.offset = offset, this) : offset - start;
   }, ByteBufferPrototype.readIString = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+4) <= " + this.buffer.byteLength);
    }
    var start = offset, len = this.readUint32(offset), str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
    return offset += str.length, relative ? (this.offset = offset, str.string) : {
     string: str.string,
     length: offset - start
    };
   }, ByteBuffer.METRICS_CHARS = "c", ByteBuffer.METRICS_BYTES = "b", ByteBufferPrototype.writeUTF8String = function(str, offset) {
    var k, relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    var start = offset;
    k = utfx.calculateUTF16asUTF8(stringSource(str))[1], offset += k;
    var capacity14 = this.buffer.byteLength;
    return offset > capacity14 && this.resize((capacity14 *= 2) > offset ? capacity14 : offset), 
    offset -= k, utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
     this.view[offset++] = b;
    }.bind(this)), relative ? (this.offset = offset, this) : offset - start;
   }, ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String, ByteBuffer.calculateUTF8Chars = function(str) {
    return utfx.calculateUTF16asUTF8(stringSource(str))[0];
   }, ByteBuffer.calculateUTF8Bytes = function(str) {
    return utfx.calculateUTF16asUTF8(stringSource(str))[1];
   }, ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes, ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
    "number" == typeof metrics && (offset = metrics, metrics = void 0);
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), void 0 === metrics && (metrics = ByteBuffer.METRICS_CHARS), 
    !this.noAssert) {
     if ("number" != typeof length || length % 1 != 0) throw TypeError("Illegal length: " + length + " (not an integer)");
     if (length |= 0, "number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    var sd, i = 0, start = offset;
    if (metrics === ByteBuffer.METRICS_CHARS) {
     if (sd = stringDestination(), utfx.decodeUTF8(function() {
      return i < length && offset < this.limit ? this.view[offset++] : null;
     }.bind(this), (function(cp) {
      ++i, utfx.UTF8toUTF16(cp, sd);
     })), i !== length) throw RangeError("Illegal range: Truncated data, " + i + " == " + length);
     return relative ? (this.offset = offset, sd()) : {
      string: sd(),
      length: offset - start
     };
    }
    if (metrics === ByteBuffer.METRICS_BYTES) {
     if (!this.noAssert) {
      if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
      if ((offset >>>= 0) < 0 || offset + length > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+" + length + ") <= " + this.buffer.byteLength);
     }
     var k = offset + length;
     if (utfx.decodeUTF8toUTF16(function() {
      return offset < k ? this.view[offset++] : null;
     }.bind(this), sd = stringDestination(), this.noAssert), offset !== k) throw RangeError("Illegal range: Truncated data, " + offset + " == " + k);
     return relative ? (this.offset = offset, sd()) : {
      string: sd(),
      length: offset - start
     };
    }
    throw TypeError("Unsupported metrics: " + metrics);
   }, ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String, ByteBufferPrototype.writeVString = function(str, offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("string" != typeof str) throw TypeError("Illegal str: Not a string");
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    var k, l, start = offset;
    k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1], l = ByteBuffer.calculateVarint32(k), 
    offset += l + k;
    var capacity15 = this.buffer.byteLength;
    if (offset > capacity15 && this.resize((capacity15 *= 2) > offset ? capacity15 : offset), 
    offset -= l + k, offset += this.writeVarint32(k, offset), utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
     this.view[offset++] = b;
    }.bind(this)), offset !== start + k + l) throw RangeError("Illegal range: Truncated data, " + offset + " == " + (offset + k + l));
    return relative ? (this.offset = offset, this) : offset - start;
   }, ByteBufferPrototype.readVString = function(offset) {
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+1) <= " + this.buffer.byteLength);
    }
    var start = offset, len = this.readVarint32(offset), str = this.readUTF8String(len.value, ByteBuffer.METRICS_BYTES, offset += len.length);
    return offset += str.length, relative ? (this.offset = offset, str.string) : {
     string: str.string,
     length: offset - start
    };
   }, ByteBufferPrototype.append = function(source, encoding, offset) {
    "number" != typeof encoding && "string" == typeof encoding || (offset = encoding, 
    encoding = void 0);
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    source instanceof ByteBuffer || (source = ByteBuffer.wrap(source, encoding));
    var length = source.limit - source.offset;
    if (length <= 0) return this;
    offset += length;
    var capacity16 = this.buffer.byteLength;
    return offset > capacity16 && this.resize((capacity16 *= 2) > offset ? capacity16 : offset), 
    offset -= length, this.view.set(source.view.subarray(source.offset, source.limit), offset), 
    source.offset += length, relative && (this.offset += length), this;
   }, ByteBufferPrototype.appendTo = function(target, offset) {
    return target.append(this, offset), this;
   }, ByteBufferPrototype.assert = function(assert) {
    return this.noAssert = !assert, this;
   }, ByteBufferPrototype.capacity = function() {
    return this.buffer.byteLength;
   }, ByteBufferPrototype.clear = function() {
    return this.offset = 0, this.limit = this.buffer.byteLength, this.markedOffset = -1, 
    this;
   }, ByteBufferPrototype.clone = function(copy) {
    var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
    return copy ? (bb.buffer = new ArrayBuffer(this.buffer.byteLength), bb.view = new Uint8Array(bb.buffer)) : (bb.buffer = this.buffer, 
    bb.view = this.view), bb.offset = this.offset, bb.markedOffset = this.markedOffset, 
    bb.limit = this.limit, bb;
   }, ByteBufferPrototype.compact = function(begin, end) {
    if (void 0 === begin && (begin = this.offset), void 0 === end && (end = this.limit), 
    !this.noAssert) {
     if ("number" != typeof begin || begin % 1 != 0) throw TypeError("Illegal begin: Not an integer");
     if (begin >>>= 0, "number" != typeof end || end % 1 != 0) throw TypeError("Illegal end: Not an integer");
     if (end >>>= 0, begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
    }
    if (0 === begin && end === this.buffer.byteLength) return this;
    var len = end - begin;
    if (0 === len) return this.buffer = EMPTY_BUFFER, this.view = null, this.markedOffset >= 0 && (this.markedOffset -= begin), 
    this.offset = 0, this.limit = 0, this;
    var buffer = new ArrayBuffer(len), view = new Uint8Array(buffer);
    return view.set(this.view.subarray(begin, end)), this.buffer = buffer, this.view = view, 
    this.markedOffset >= 0 && (this.markedOffset -= begin), this.offset = 0, this.limit = len, 
    this;
   }, ByteBufferPrototype.copy = function(begin, end) {
    if (void 0 === begin && (begin = this.offset), void 0 === end && (end = this.limit), 
    !this.noAssert) {
     if ("number" != typeof begin || begin % 1 != 0) throw TypeError("Illegal begin: Not an integer");
     if (begin >>>= 0, "number" != typeof end || end % 1 != 0) throw TypeError("Illegal end: Not an integer");
     if (end >>>= 0, begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
    }
    if (begin === end) return new ByteBuffer(0, this.littleEndian, this.noAssert);
    var capacity = end - begin, bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
    return bb.offset = 0, bb.limit = capacity, bb.markedOffset >= 0 && (bb.markedOffset -= begin), 
    this.copyTo(bb, 0, begin, end), bb;
   }, ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
    var relative, targetRelative;
    if (!this.noAssert && !ByteBuffer.isByteBuffer(target)) throw TypeError("Illegal target: Not a ByteBuffer");
    if (targetOffset = (targetRelative = void 0 === targetOffset) ? target.offset : 0 | targetOffset, 
    sourceOffset = (relative = void 0 === sourceOffset) ? this.offset : 0 | sourceOffset, 
    sourceLimit = void 0 === sourceLimit ? this.limit : 0 | sourceLimit, targetOffset < 0 || targetOffset > target.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + targetOffset + " <= " + target.buffer.byteLength);
    if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + sourceOffset + " <= " + this.buffer.byteLength);
    var len = sourceLimit - sourceOffset;
    return 0 === len ? target : (target.ensureCapacity(targetOffset + len), target.view.set(this.view.subarray(sourceOffset, sourceLimit), targetOffset), 
    relative && (this.offset += len), targetRelative && (target.offset += len), this);
   }, ByteBufferPrototype.ensureCapacity = function(capacity) {
    var current = this.buffer.byteLength;
    return current < capacity ? this.resize((current *= 2) > capacity ? current : capacity) : this;
   }, ByteBufferPrototype.fill = function(value, begin, end) {
    var relative = void 0 === begin;
    if (relative && (begin = this.offset), "string" == typeof value && value.length > 0 && (value = value.charCodeAt(0)), 
    void 0 === begin && (begin = this.offset), void 0 === end && (end = this.limit), 
    !this.noAssert) {
     if ("number" != typeof value || value % 1 != 0) throw TypeError("Illegal value: " + value + " (not an integer)");
     if (value |= 0, "number" != typeof begin || begin % 1 != 0) throw TypeError("Illegal begin: Not an integer");
     if (begin >>>= 0, "number" != typeof end || end % 1 != 0) throw TypeError("Illegal end: Not an integer");
     if (end >>>= 0, begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
    }
    if (begin >= end) return this;
    for (;begin < end; ) this.view[begin++] = value;
    return relative && (this.offset = begin), this;
   }, ByteBufferPrototype.flip = function() {
    return this.limit = this.offset, this.offset = 0, this;
   }, ByteBufferPrototype.mark = function(offset) {
    if (offset = void 0 === offset ? this.offset : offset, !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    return this.markedOffset = offset, this;
   }, ByteBufferPrototype.order = function(littleEndian) {
    if (!this.noAssert && "boolean" != typeof littleEndian) throw TypeError("Illegal littleEndian: Not a boolean");
    return this.littleEndian = !!littleEndian, this;
   }, ByteBufferPrototype.LE = function(littleEndian) {
    return this.littleEndian = void 0 === littleEndian || !!littleEndian, this;
   }, ByteBufferPrototype.BE = function(bigEndian) {
    return this.littleEndian = void 0 !== bigEndian && !bigEndian, this;
   }, ByteBufferPrototype.prepend = function(source, encoding, offset) {
    "number" != typeof encoding && "string" == typeof encoding || (offset = encoding, 
    encoding = void 0);
    var relative = void 0 === offset;
    if (relative && (offset = this.offset), !this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: " + offset + " (not an integer)");
     if ((offset >>>= 0) < 0 || offset + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + offset + " (+0) <= " + this.buffer.byteLength);
    }
    source instanceof ByteBuffer || (source = ByteBuffer.wrap(source, encoding));
    var len = source.limit - source.offset;
    if (len <= 0) return this;
    var diff = len - offset;
    if (diff > 0) {
     var buffer = new ArrayBuffer(this.buffer.byteLength + diff), view = new Uint8Array(buffer);
     view.set(this.view.subarray(offset, this.buffer.byteLength), len), this.buffer = buffer, 
     this.view = view, this.offset += diff, this.markedOffset >= 0 && (this.markedOffset += diff), 
     this.limit += diff, offset += diff;
    } else new Uint8Array(this.buffer);
    return this.view.set(source.view.subarray(source.offset, source.limit), offset - len), 
    source.offset = source.limit, relative && (this.offset -= len), this;
   }, ByteBufferPrototype.prependTo = function(target, offset) {
    return target.prepend(this, offset), this;
   }, ByteBufferPrototype.printDebug = function(out) {
    "function" != typeof out && (out = console.log.bind(console)), out(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0));
   }, ByteBufferPrototype.remaining = function() {
    return this.limit - this.offset;
   }, ByteBufferPrototype.reset = function() {
    return this.markedOffset >= 0 ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0, 
    this;
   }, ByteBufferPrototype.resize = function(capacity) {
    if (!this.noAssert) {
     if ("number" != typeof capacity || capacity % 1 != 0) throw TypeError("Illegal capacity: " + capacity + " (not an integer)");
     if ((capacity |= 0) < 0) throw RangeError("Illegal capacity: 0 <= " + capacity);
    }
    if (this.buffer.byteLength < capacity) {
     var buffer = new ArrayBuffer(capacity), view = new Uint8Array(buffer);
     view.set(this.view), this.buffer = buffer, this.view = view;
    }
    return this;
   }, ByteBufferPrototype.reverse = function(begin, end) {
    if (void 0 === begin && (begin = this.offset), void 0 === end && (end = this.limit), 
    !this.noAssert) {
     if ("number" != typeof begin || begin % 1 != 0) throw TypeError("Illegal begin: Not an integer");
     if (begin >>>= 0, "number" != typeof end || end % 1 != 0) throw TypeError("Illegal end: Not an integer");
     if (end >>>= 0, begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
    }
    return begin === end || Array.prototype.reverse.call(this.view.subarray(begin, end)), 
    this;
   }, ByteBufferPrototype.skip = function(length) {
    if (!this.noAssert) {
     if ("number" != typeof length || length % 1 != 0) throw TypeError("Illegal length: " + length + " (not an integer)");
     length |= 0;
    }
    var offset = this.offset + length;
    if (!this.noAssert && (offset < 0 || offset > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + length + " <= " + this.buffer.byteLength);
    return this.offset = offset, this;
   }, ByteBufferPrototype.slice = function(begin, end) {
    if (void 0 === begin && (begin = this.offset), void 0 === end && (end = this.limit), 
    !this.noAssert) {
     if ("number" != typeof begin || begin % 1 != 0) throw TypeError("Illegal begin: Not an integer");
     if (begin >>>= 0, "number" != typeof end || end % 1 != 0) throw TypeError("Illegal end: Not an integer");
     if (end >>>= 0, begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
    }
    var bb = this.clone();
    return bb.offset = begin, bb.limit = end, bb;
   }, ByteBufferPrototype.toBuffer = function(forceCopy) {
    var offset = this.offset, limit = this.limit;
    if (!this.noAssert) {
     if ("number" != typeof offset || offset % 1 != 0) throw TypeError("Illegal offset: Not an integer");
     if (offset >>>= 0, "number" != typeof limit || limit % 1 != 0) throw TypeError("Illegal limit: Not an integer");
     if (limit >>>= 0, offset < 0 || offset > limit || limit > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + offset + " <= " + limit + " <= " + this.buffer.byteLength);
    }
    if (!forceCopy && 0 === offset && limit === this.buffer.byteLength) return this.buffer;
    if (offset === limit) return EMPTY_BUFFER;
    var buffer = new ArrayBuffer(limit - offset);
    return new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0), 
    buffer;
   }, ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer, ByteBufferPrototype.toString = function(encoding, begin, end) {
    if (void 0 === encoding) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";
    switch ("number" == typeof encoding && (end = begin = encoding = "utf8"), encoding) {
    case "utf8":
     return this.toUTF8(begin, end);

    case "base64":
     return this.toBase64(begin, end);

    case "hex":
     return this.toHex(begin, end);

    case "binary":
     return this.toBinary(begin, end);

    case "debug":
     return this.toDebug();

    case "columns":
     return this.toColumns();

    default:
     throw Error("Unsupported encoding: " + encoding);
    }
   };
   var lxiv = function() {
    for (var lxiv = {}, aout = [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47 ], ain = [], i = 0, k = aout.length; i < k; ++i) ain[aout[i]] = i;
    return lxiv.encode = function(src, dst) {
     for (var b, t; null !== (b = src()); ) dst(aout[b >> 2 & 63]), t = (3 & b) << 4, 
     null !== (b = src()) ? (dst(aout[63 & ((t |= b >> 4 & 15) | b >> 4 & 15)]), t = (15 & b) << 2, 
     null !== (b = src()) ? (dst(aout[63 & (t | b >> 6 & 3)]), dst(aout[63 & b])) : (dst(aout[63 & t]), 
     dst(61))) : (dst(aout[63 & t]), dst(61), dst(61));
    }, lxiv.decode = function(src, dst) {
     var c, t1, t2;
     function fail(c) {
      throw Error("Illegal character code: " + c);
     }
     for (;null !== (c = src()); ) if (void 0 === (t1 = ain[c]) && fail(c), null !== (c = src()) && (void 0 === (t2 = ain[c]) && fail(c), 
     dst(t1 << 2 >>> 0 | (48 & t2) >> 4), null !== (c = src()))) {
      if (void 0 === (t1 = ain[c])) {
       if (61 === c) break;
       fail(c);
      }
      if (dst((15 & t2) << 4 >>> 0 | (60 & t1) >> 2), null !== (c = src())) {
       if (void 0 === (t2 = ain[c])) {
        if (61 === c) break;
        fail(c);
       }
       dst((3 & t1) << 6 >>> 0 | t2);
      }
     }
    }, lxiv.test = function(str) {
     return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
    }, lxiv;
   }();
   ByteBufferPrototype.toBase64 = function(begin, end) {
    if (void 0 === begin && (begin = this.offset), void 0 === end && (end = this.limit), 
    end |= 0, (begin |= 0) < 0 || end > this.capacity || begin > end) throw RangeError("begin, end");
    var sd;
    return lxiv.encode(function() {
     return begin < end ? this.view[begin++] : null;
    }.bind(this), sd = stringDestination()), sd();
   }, ByteBuffer.fromBase64 = function(str, littleEndian) {
    if ("string" != typeof str) throw TypeError("str");
    var bb = new ByteBuffer(str.length / 4 * 3, littleEndian), i = 0;
    return lxiv.decode(stringSource(str), (function(b) {
     bb.view[i++] = b;
    })), bb.limit = i, bb;
   }, ByteBuffer.btoa = function(str) {
    return ByteBuffer.fromBinary(str).toBase64();
   }, ByteBuffer.atob = function(b64) {
    return ByteBuffer.fromBase64(b64).toBinary();
   }, ByteBufferPrototype.toBinary = function(begin, end) {
    if (void 0 === begin && (begin = this.offset), void 0 === end && (end = this.limit), 
    end |= 0, (begin |= 0) < 0 || end > this.capacity() || begin > end) throw RangeError("begin, end");
    if (begin === end) return "";
    for (var chars = [], parts = []; begin < end; ) chars.push(this.view[begin++]), 
    chars.length >= 1024 && (parts.push(String.fromCharCode.apply(String, chars)), chars = []);
    return parts.join("") + String.fromCharCode.apply(String, chars);
   }, ByteBuffer.fromBinary = function(str, littleEndian) {
    if ("string" != typeof str) throw TypeError("str");
    for (var charCode, i = 0, k = str.length, bb = new ByteBuffer(k, littleEndian); i < k; ) {
     if ((charCode = str.charCodeAt(i)) > 255) throw RangeError("illegal char code: " + charCode);
     bb.view[i++] = charCode;
    }
    return bb.limit = k, bb;
   }, ByteBufferPrototype.toDebug = function(columns) {
    for (var b, i = -1, k = this.buffer.byteLength, hex = "", asc = "", out = ""; i < k; ) {
     if (-1 !== i && (hex += (b = this.view[i]) < 16 ? "0" + b.toString(16).toUpperCase() : b.toString(16).toUpperCase(), 
     columns && (asc += b > 32 && b < 127 ? String.fromCharCode(b) : ".")), ++i, columns && i > 0 && i % 16 == 0 && i !== k) {
      for (;hex.length < 51; ) hex += " ";
      out += hex + asc + "\n", hex = asc = "";
     }
     i === this.offset && i === this.limit ? hex += i === this.markedOffset ? "!" : "|" : i === this.offset ? hex += i === this.markedOffset ? "[" : "<" : i === this.limit ? hex += i === this.markedOffset ? "]" : ">" : hex += i === this.markedOffset ? "'" : columns || 0 !== i && i !== k ? " " : "";
    }
    if (columns && " " !== hex) {
     for (;hex.length < 51; ) hex += " ";
     out += hex + asc + "\n";
    }
    return columns ? out : hex;
   }, ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
    for (var ch, b, k = str.length, bb = new ByteBuffer((k + 1) / 3 | 0, littleEndian, noAssert), i = 0, j = 0, rs = !1, ho = !1, hm = !1, hl = !1, fail = !1; i < k; ) {
     switch (ch = str.charAt(i++)) {
     case "!":
      if (!noAssert) {
       if (ho || hm || hl) {
        fail = !0;
        break;
       }
       ho = hm = hl = !0;
      }
      bb.offset = bb.markedOffset = bb.limit = j, rs = !1;
      break;

     case "|":
      if (!noAssert) {
       if (ho || hl) {
        fail = !0;
        break;
       }
       ho = hl = !0;
      }
      bb.offset = bb.limit = j, rs = !1;
      break;

     case "[":
      if (!noAssert) {
       if (ho || hm) {
        fail = !0;
        break;
       }
       ho = hm = !0;
      }
      bb.offset = bb.markedOffset = j, rs = !1;
      break;

     case "<":
      if (!noAssert) {
       if (ho) {
        fail = !0;
        break;
       }
       ho = !0;
      }
      bb.offset = j, rs = !1;
      break;

     case "]":
      if (!noAssert) {
       if (hl || hm) {
        fail = !0;
        break;
       }
       hl = hm = !0;
      }
      bb.limit = bb.markedOffset = j, rs = !1;
      break;

     case ">":
      if (!noAssert) {
       if (hl) {
        fail = !0;
        break;
       }
       hl = !0;
      }
      bb.limit = j, rs = !1;
      break;

     case "'":
      if (!noAssert) {
       if (hm) {
        fail = !0;
        break;
       }
       hm = !0;
      }
      bb.markedOffset = j, rs = !1;
      break;

     case " ":
      rs = !1;
      break;

     default:
      if (!noAssert && rs) {
       fail = !0;
       break;
      }
      if (b = parseInt(ch + str.charAt(i++), 16), !noAssert && (isNaN(b) || b < 0 || b > 255)) throw TypeError("Illegal str: Not a debug encoded string");
      bb.view[j++] = b, rs = !0;
     }
     if (fail) throw TypeError("Illegal str: Invalid symbol at " + i);
    }
    if (!noAssert) {
     if (!ho || !hl) throw TypeError("Illegal str: Missing offset or limit");
     if (j < bb.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + j + " < " + k);
    }
    return bb;
   }, ByteBufferPrototype.toHex = function(begin, end) {
    if (begin = void 0 === begin ? this.offset : begin, end = void 0 === end ? this.limit : end, 
    !this.noAssert) {
     if ("number" != typeof begin || begin % 1 != 0) throw TypeError("Illegal begin: Not an integer");
     if (begin >>>= 0, "number" != typeof end || end % 1 != 0) throw TypeError("Illegal end: Not an integer");
     if (end >>>= 0, begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
    }
    for (var b, out = new Array(end - begin); begin < end; ) (b = this.view[begin++]) < 16 ? out.push("0", b.toString(16)) : out.push(b.toString(16));
    return out.join("");
   }, ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
    if (!noAssert) {
     if ("string" != typeof str) throw TypeError("Illegal str: Not a string");
     if (str.length % 2 != 0) throw TypeError("Illegal str: Length not a multiple of 2");
    }
    for (var b, k = str.length, bb = new ByteBuffer(k / 2 | 0, littleEndian), i = 0, j = 0; i < k; i += 2) {
     if (b = parseInt(str.substring(i, i + 2), 16), !noAssert && (!isFinite(b) || b < 0 || b > 255)) throw TypeError("Illegal str: Contains non-hex characters");
     bb.view[j++] = b;
    }
    return bb.limit = j, bb;
   };
   var utfx = function() {
    var utfx = {
     MAX_CODEPOINT: 1114111,
     encodeUTF8: function(src, dst) {
      var cp = null;
      for ("number" == typeof src && (cp = src, src = function() {
       return null;
      }); null !== cp || null !== (cp = src()); ) cp < 128 ? dst(127 & cp) : cp < 2048 ? (dst(cp >> 6 & 31 | 192), 
      dst(63 & cp | 128)) : cp < 65536 ? (dst(cp >> 12 & 15 | 224), dst(cp >> 6 & 63 | 128), 
      dst(63 & cp | 128)) : (dst(cp >> 18 & 7 | 240), dst(cp >> 12 & 63 | 128), dst(cp >> 6 & 63 | 128), 
      dst(63 & cp | 128)), cp = null;
     },
     decodeUTF8: function(src, dst) {
      for (var a, b, c, d, fail = function(b) {
       b = b.slice(0, b.indexOf(null));
       var err = Error(b.toString());
       throw err.name = "TruncatedError", err.bytes = b, err;
      }; null !== (a = src()); ) if (0 == (128 & a)) dst(a); else if (192 == (224 & a)) null === (b = src()) && fail([ a, b ]), 
      dst((31 & a) << 6 | 63 & b); else if (224 == (240 & a)) (null === (b = src()) || null === (c = src())) && fail([ a, b, c ]), 
      dst((15 & a) << 12 | (63 & b) << 6 | 63 & c); else {
       if (240 != (248 & a)) throw RangeError("Illegal starting byte: " + a);
       (null === (b = src()) || null === (c = src()) || null === (d = src())) && fail([ a, b, c, d ]), 
       dst((7 & a) << 18 | (63 & b) << 12 | (63 & c) << 6 | 63 & d);
      }
     },
     UTF16toUTF8: function(src, dst) {
      for (var c1, c2 = null; null !== (c1 = null !== c2 ? c2 : src()); ) c1 >= 55296 && c1 <= 57343 && null !== (c2 = src()) && c2 >= 56320 && c2 <= 57343 ? (dst(1024 * (c1 - 55296) + c2 - 56320 + 65536), 
      c2 = null) : dst(c1);
      null !== c2 && dst(c2);
     },
     UTF8toUTF16: function(src, dst) {
      var cp = null;
      for ("number" == typeof src && (cp = src, src = function() {
       return null;
      }); null !== cp || null !== (cp = src()); ) cp <= 65535 ? dst(cp) : (dst(55296 + ((cp -= 65536) >> 10)), 
      dst(cp % 1024 + 56320)), cp = null;
     },
     encodeUTF16toUTF8: function(src, dst) {
      utfx.UTF16toUTF8(src, (function(cp) {
       utfx.encodeUTF8(cp, dst);
      }));
     },
     decodeUTF8toUTF16: function(src, dst) {
      utfx.decodeUTF8(src, (function(cp) {
       utfx.UTF8toUTF16(cp, dst);
      }));
     },
     calculateCodePoint: function(cp) {
      return cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
     },
     calculateUTF8: function(src) {
      for (var cp, l = 0; null !== (cp = src()); ) l += cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
      return l;
     },
     calculateUTF16asUTF8: function(src) {
      var n = 0, l = 0;
      return utfx.UTF16toUTF8(src, (function(cp) {
       ++n, l += cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
      })), [ n, l ];
     }
    };
    return utfx;
   }();
   return ByteBufferPrototype.toUTF8 = function(begin, end) {
    if (void 0 === begin && (begin = this.offset), void 0 === end && (end = this.limit), 
    !this.noAssert) {
     if ("number" != typeof begin || begin % 1 != 0) throw TypeError("Illegal begin: Not an integer");
     if (begin >>>= 0, "number" != typeof end || end % 1 != 0) throw TypeError("Illegal end: Not an integer");
     if (end >>>= 0, begin < 0 || begin > end || end > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + begin + " <= " + end + " <= " + this.buffer.byteLength);
    }
    var sd;
    try {
     utfx.decodeUTF8toUTF16(function() {
      return begin < end ? this.view[begin++] : null;
     }.bind(this), sd = stringDestination());
    } catch (e) {
     if (begin !== end) throw RangeError("Illegal range: Truncated data, " + begin + " != " + end);
    }
    return sd();
   }, ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
    if (!noAssert && "string" != typeof str) throw TypeError("Illegal str: Not a string");
    var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), !0)[1], littleEndian, noAssert), i = 0;
    return utfx.encodeUTF16toUTF8(stringSource(str), (function(b) {
     bb.view[i++] = b;
    })), bb.limit = i, bb;
   }, ByteBuffer;
  }));
 })), protobufLight = createCommonjsModule((function(module) {
  /**
	 * @license protobuf.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
	 * Released under the Apache License, Version 2.0
	 * see: https://github.com/dcodeIO/protobuf.js for details
	 */
  !function(global, factory) {
   module && module.exports ? module.exports = factory(bytebuffer, !0) : (global.dcodeIO = global.dcodeIO || {}).ProtoBuf = factory(global.dcodeIO.ByteBuffer);
  }(commonjsGlobal, (function(ByteBuffer, isCommonJS) {
   var Util, ProtoBuf = {};
   return ProtoBuf.ByteBuffer = ByteBuffer, ProtoBuf.Long = ByteBuffer.Long || null, 
   ProtoBuf.VERSION = "5.0.3", ProtoBuf.WIRE_TYPES = {}, ProtoBuf.WIRE_TYPES.VARINT = 0, 
   ProtoBuf.WIRE_TYPES.BITS64 = 1, ProtoBuf.WIRE_TYPES.LDELIM = 2, ProtoBuf.WIRE_TYPES.STARTGROUP = 3, 
   ProtoBuf.WIRE_TYPES.ENDGROUP = 4, ProtoBuf.WIRE_TYPES.BITS32 = 5, ProtoBuf.PACKABLE_WIRE_TYPES = [ ProtoBuf.WIRE_TYPES.VARINT, ProtoBuf.WIRE_TYPES.BITS64, ProtoBuf.WIRE_TYPES.BITS32 ], 
   ProtoBuf.TYPES = {
    int32: {
     name: "int32",
     wireType: ProtoBuf.WIRE_TYPES.VARINT,
     defaultValue: 0
    },
    uint32: {
     name: "uint32",
     wireType: ProtoBuf.WIRE_TYPES.VARINT,
     defaultValue: 0
    },
    sint32: {
     name: "sint32",
     wireType: ProtoBuf.WIRE_TYPES.VARINT,
     defaultValue: 0
    },
    int64: {
     name: "int64",
     wireType: ProtoBuf.WIRE_TYPES.VARINT,
     defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
    },
    uint64: {
     name: "uint64",
     wireType: ProtoBuf.WIRE_TYPES.VARINT,
     defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : void 0
    },
    sint64: {
     name: "sint64",
     wireType: ProtoBuf.WIRE_TYPES.VARINT,
     defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
    },
    bool: {
     name: "bool",
     wireType: ProtoBuf.WIRE_TYPES.VARINT,
     defaultValue: !1
    },
    double: {
     name: "double",
     wireType: ProtoBuf.WIRE_TYPES.BITS64,
     defaultValue: 0
    },
    string: {
     name: "string",
     wireType: ProtoBuf.WIRE_TYPES.LDELIM,
     defaultValue: ""
    },
    bytes: {
     name: "bytes",
     wireType: ProtoBuf.WIRE_TYPES.LDELIM,
     defaultValue: null
    },
    fixed32: {
     name: "fixed32",
     wireType: ProtoBuf.WIRE_TYPES.BITS32,
     defaultValue: 0
    },
    sfixed32: {
     name: "sfixed32",
     wireType: ProtoBuf.WIRE_TYPES.BITS32,
     defaultValue: 0
    },
    fixed64: {
     name: "fixed64",
     wireType: ProtoBuf.WIRE_TYPES.BITS64,
     defaultValue: ProtoBuf.Long ? ProtoBuf.Long.UZERO : void 0
    },
    sfixed64: {
     name: "sfixed64",
     wireType: ProtoBuf.WIRE_TYPES.BITS64,
     defaultValue: ProtoBuf.Long ? ProtoBuf.Long.ZERO : void 0
    },
    float: {
     name: "float",
     wireType: ProtoBuf.WIRE_TYPES.BITS32,
     defaultValue: 0
    },
    enum: {
     name: "enum",
     wireType: ProtoBuf.WIRE_TYPES.VARINT,
     defaultValue: 0
    },
    message: {
     name: "message",
     wireType: ProtoBuf.WIRE_TYPES.LDELIM,
     defaultValue: null
    },
    group: {
     name: "group",
     wireType: ProtoBuf.WIRE_TYPES.STARTGROUP,
     defaultValue: null
    }
   }, ProtoBuf.MAP_KEY_TYPES = [ ProtoBuf.TYPES.int32, ProtoBuf.TYPES.sint32, ProtoBuf.TYPES.sfixed32, ProtoBuf.TYPES.uint32, ProtoBuf.TYPES.fixed32, ProtoBuf.TYPES.int64, ProtoBuf.TYPES.sint64, ProtoBuf.TYPES.sfixed64, ProtoBuf.TYPES.uint64, ProtoBuf.TYPES.fixed64, ProtoBuf.TYPES.bool, ProtoBuf.TYPES.string, ProtoBuf.TYPES.bytes ], 
   ProtoBuf.ID_MIN = 1, ProtoBuf.ID_MAX = 536870911, ProtoBuf.convertFieldsToCamelCase = !1, 
   ProtoBuf.populateAccessors = !0, ProtoBuf.populateDefaults = !0, ProtoBuf.Util = ((Util = {}).IS_NODE = !("object" != typeof process || process + "" != "[object process]" || process.browser), 
   Util.XHR = function() {
    for (var XMLHttpFactories = [ function() {
     return new XMLHttpRequest;
    }, function() {
     return new ActiveXObject("Msxml2.XMLHTTP");
    }, function() {
     return new ActiveXObject("Msxml3.XMLHTTP");
    }, function() {
     return new ActiveXObject("Microsoft.XMLHTTP");
    } ], xhr = null, i = 0; i < XMLHttpFactories.length; i++) {
     try {
      xhr = XMLHttpFactories[i]();
     } catch (e) {
      continue;
     }
     break;
    }
    if (!xhr) throw Error("XMLHttpRequest is not supported");
    return xhr;
   }, Util.fetch = function(path, callback) {
    if (callback && "function" != typeof callback && (callback = null), Util.IS_NODE) {
     var fs = {};
     if (callback) fs.readFile(path, (function(err, data) {
      callback(err ? null : "" + data);
     })); else try {
      return fs.readFileSync(path);
     } catch (e) {
      return null;
     }
    } else {
     var xhr = Util.XHR();
     if (xhr.open("GET", path, !!callback), xhr.setRequestHeader("Accept", "text/plain"), 
     "function" == typeof xhr.overrideMimeType && xhr.overrideMimeType("text/plain"), 
     !callback) return xhr.send(null), 200 == xhr.status || 0 == xhr.status && "string" == typeof xhr.responseText ? xhr.responseText : null;
     if (xhr.onreadystatechange = function() {
      4 == xhr.readyState && (200 == xhr.status || 0 == xhr.status && "string" == typeof xhr.responseText ? callback(xhr.responseText) : callback(null));
     }, 4 == xhr.readyState) return;
     xhr.send(null);
    }
   }, Util.toCamelCase = function(str) {
    return str.replace(/_([a-zA-Z])/g, (function($0, $1) {
     return $1.toUpperCase();
    }));
   }, Util), ProtoBuf.Lang = {
    DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
    RULE: /^(?:required|optional|repeated|map)$/,
    TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
    NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
    TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
    FQTYPEREF: /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/,
    NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
    NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
    NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
    NUMBER_OCT: /^0[0-7]+$/,
    NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
    BOOL: /^(?:true|false)$/i,
    ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
    NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
    WHITESPACE: /\s/,
    STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
    STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
   }, ProtoBuf.Reflect = function(ProtoBuf) {
    var Reflect = {}, T = function(builder, parent, name) {
     this.builder = builder, this.parent = parent, this.name = name, this.className;
    }, TPrototype = T.prototype;
    TPrototype.fqn = function() {
     for (var name = this.name, ptr = this; ;) {
      if (null == (ptr = ptr.parent)) break;
      name = ptr.name + "." + name;
     }
     return name;
    }, TPrototype.toString = function(includeClass) {
     return (includeClass ? this.className + " " : "") + this.fqn();
    }, TPrototype.build = function() {
     throw Error(this.toString(!0) + " cannot be built directly");
    }, Reflect.T = T;
    var Namespace = function(builder, parent, name, options, syntax) {
     T.call(this, builder, parent, name), this.className = "Namespace", this.children = [], 
     this.options = options || {}, this.syntax = syntax || "proto2";
    }, NamespacePrototype = Namespace.prototype = Object.create(T.prototype);
    NamespacePrototype.getChildren = function(type) {
     if (null == (type = type || null)) return this.children.slice();
     for (var children = [], i = 0, k = this.children.length; i < k; ++i) this.children[i] instanceof type && children.push(this.children[i]);
     return children;
    }, NamespacePrototype.addChild = function(child) {
     var other;
     if (other = this.getChild(child.name)) if (other instanceof Message.Field && other.name !== other.originalName && null === this.getChild(other.originalName)) other.name = other.originalName; else {
      if (!(child instanceof Message.Field && child.name !== child.originalName && null === this.getChild(child.originalName))) throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + child.name);
      child.name = child.originalName;
     }
     this.children.push(child);
    }, NamespacePrototype.getChild = function(nameOrId) {
     for (var key = "number" == typeof nameOrId ? "id" : "name", i = 0, k = this.children.length; i < k; ++i) if (this.children[i][key] === nameOrId) return this.children[i];
     return null;
    }, NamespacePrototype.resolve = function(qn, excludeNonNamespace) {
     var child, part = "string" == typeof qn ? qn.split(".") : qn, ptr = this, i = 0;
     if ("" === part[i]) {
      for (;null !== ptr.parent; ) ptr = ptr.parent;
      i++;
     }
     do {
      do {
       if (!(ptr instanceof Reflect.Namespace)) {
        ptr = null;
        break;
       }
       if (!(child = ptr.getChild(part[i])) || !(child instanceof Reflect.T) || excludeNonNamespace && !(child instanceof Reflect.Namespace)) {
        ptr = null;
        break;
       }
       ptr = child, i++;
      } while (i < part.length);
      if (null != ptr) break;
      if (null !== this.parent) return this.parent.resolve(qn, excludeNonNamespace);
     } while (null != ptr);
     return ptr;
    }, NamespacePrototype.qn = function(t) {
     var part = [], ptr = t;
     do {
      part.unshift(ptr.name), ptr = ptr.parent;
     } while (null !== ptr);
     for (var len = 1; len <= part.length; len++) {
      var qn = part.slice(part.length - len);
      if (t === this.resolve(qn, t instanceof Reflect.Namespace)) return qn.join(".");
     }
     return t.fqn();
    }, NamespacePrototype.build = function() {
     for (var child, ns = {}, children = this.children, i = 0, k = children.length; i < k; ++i) (child = children[i]) instanceof Namespace && (ns[child.name] = child.build());
     return Object.defineProperty && Object.defineProperty(ns, "$options", {
      value: this.buildOpt()
     }), ns;
    }, NamespacePrototype.buildOpt = function() {
     for (var opt = {}, keys = Object.keys(this.options), i = 0, k = keys.length; i < k; ++i) {
      var key = keys[i], val = this.options[keys[i]];
      opt[key] = val;
     }
     return opt;
    }, NamespacePrototype.getOption = function(name) {
     return void 0 === name ? this.options : void 0 !== this.options[name] ? this.options[name] : null;
    }, Reflect.Namespace = Namespace;
    var Element = function(type, resolvedType, isMapKey, syntax, name) {
     if (this.type = type, this.resolvedType = resolvedType, this.isMapKey = isMapKey, 
     this.syntax = syntax, this.name = name, isMapKey && ProtoBuf.MAP_KEY_TYPES.indexOf(type) < 0) throw Error("Invalid map key type: " + type.name);
    }, ElementPrototype = Element.prototype;
    function mkLong(value, unsigned) {
     if (value && "number" == typeof value.low && "number" == typeof value.high && "boolean" == typeof value.unsigned && value.low == value.low && value.high == value.high) return new ProtoBuf.Long(value.low, value.high, void 0 === unsigned ? value.unsigned : unsigned);
     if ("string" == typeof value) return ProtoBuf.Long.fromString(value, unsigned || !1, 10);
     if ("number" == typeof value) return ProtoBuf.Long.fromNumber(value, unsigned || !1);
     throw Error("not convertible to Long");
    }
    Element.defaultFieldValue = function(type) {
     if ("string" == typeof type && (type = ProtoBuf.TYPES[type]), void 0 === type.defaultValue) throw Error("default value for type " + type.name + " is not supported");
     return type == ProtoBuf.TYPES.bytes ? new ByteBuffer(0) : type.defaultValue;
    }, ElementPrototype.toString = function() {
     return (this.name || "") + (this.isMapKey ? "map" : "value") + " element";
    }, ElementPrototype.verifyValue = function(value) {
     var self = this;
     function fail(val, msg) {
      throw Error("Illegal value for " + self.toString(!0) + " of type " + self.type.name + ": " + val + " (" + msg + ")");
     }
     switch (this.type) {
     case ProtoBuf.TYPES.int32:
     case ProtoBuf.TYPES.sint32:
     case ProtoBuf.TYPES.sfixed32:
      return ("number" != typeof value || value == value && value % 1 != 0) && fail(typeof value, "not an integer"), 
      value > 4294967295 ? 0 | value : value;

     case ProtoBuf.TYPES.uint32:
     case ProtoBuf.TYPES.fixed32:
      return ("number" != typeof value || value == value && value % 1 != 0) && fail(typeof value, "not an integer"), 
      value < 0 ? value >>> 0 : value;

     case ProtoBuf.TYPES.int64:
     case ProtoBuf.TYPES.sint64:
     case ProtoBuf.TYPES.sfixed64:
      if (ProtoBuf.Long) try {
       return mkLong(value, !1);
      } catch (e) {
       fail(typeof value, e.message);
      } else fail(typeof value, "requires Long.js");

     case ProtoBuf.TYPES.uint64:
     case ProtoBuf.TYPES.fixed64:
      if (ProtoBuf.Long) try {
       return mkLong(value, !0);
      } catch (e) {
       fail(typeof value, e.message);
      } else fail(typeof value, "requires Long.js");

     case ProtoBuf.TYPES.bool:
      return "boolean" != typeof value && fail(typeof value, "not a boolean"), value;

     case ProtoBuf.TYPES.float:
     case ProtoBuf.TYPES.double:
      return "number" != typeof value && fail(typeof value, "not a number"), value;

     case ProtoBuf.TYPES.string:
      return "string" == typeof value || value && value instanceof String || fail(typeof value, "not a string"), 
      "" + value;

     case ProtoBuf.TYPES.bytes:
      return ByteBuffer.isByteBuffer(value) ? value : ByteBuffer.wrap(value, "base64");

     case ProtoBuf.TYPES.enum:
      var values = this.resolvedType.getChildren(ProtoBuf.Reflect.Enum.Value);
      for (i = 0; i < values.length; i++) {
       if (values[i].name == value) return values[i].id;
       if (values[i].id == value) return values[i].id;
      }
      if ("proto3" === this.syntax) return ("number" != typeof value || value == value && value % 1 != 0) && fail(typeof value, "not an integer"), 
      (value > 4294967295 || value < 0) && fail(typeof value, "not in range for uint32"), 
      value;
      fail(value, "not a valid enum value");

     case ProtoBuf.TYPES.group:
     case ProtoBuf.TYPES.message:
      if (value && "object" == typeof value || fail(typeof value, "object expected"), 
      value instanceof this.resolvedType.clazz) return value;
      if (value instanceof ProtoBuf.Builder.Message) {
       var obj = {};
       for (var i in value) value.hasOwnProperty(i) && (obj[i] = value[i]);
       value = obj;
      }
      return new this.resolvedType.clazz(value);
     }
     throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + value + " (undefined type " + this.type + ")");
    }, ElementPrototype.calculateLength = function(id, value) {
     if (null === value) return 0;
     var n;
     switch (this.type) {
     case ProtoBuf.TYPES.int32:
      return value < 0 ? ByteBuffer.calculateVarint64(value) : ByteBuffer.calculateVarint32(value);

     case ProtoBuf.TYPES.uint32:
      return ByteBuffer.calculateVarint32(value);

     case ProtoBuf.TYPES.sint32:
      return ByteBuffer.calculateVarint32(ByteBuffer.zigZagEncode32(value));

     case ProtoBuf.TYPES.fixed32:
     case ProtoBuf.TYPES.sfixed32:
     case ProtoBuf.TYPES.float:
      return 4;

     case ProtoBuf.TYPES.int64:
     case ProtoBuf.TYPES.uint64:
      return ByteBuffer.calculateVarint64(value);

     case ProtoBuf.TYPES.sint64:
      return ByteBuffer.calculateVarint64(ByteBuffer.zigZagEncode64(value));

     case ProtoBuf.TYPES.fixed64:
     case ProtoBuf.TYPES.sfixed64:
      return 8;

     case ProtoBuf.TYPES.bool:
      return 1;

     case ProtoBuf.TYPES.enum:
      return ByteBuffer.calculateVarint32(value);

     case ProtoBuf.TYPES.double:
      return 8;

     case ProtoBuf.TYPES.string:
      return n = ByteBuffer.calculateUTF8Bytes(value), ByteBuffer.calculateVarint32(n) + n;

     case ProtoBuf.TYPES.bytes:
      if (value.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + value.remaining() + " bytes remaining");
      return ByteBuffer.calculateVarint32(value.remaining()) + value.remaining();

     case ProtoBuf.TYPES.message:
      return n = this.resolvedType.calculate(value), ByteBuffer.calculateVarint32(n) + n;

     case ProtoBuf.TYPES.group:
      return (n = this.resolvedType.calculate(value)) + ByteBuffer.calculateVarint32(id << 3 | ProtoBuf.WIRE_TYPES.ENDGROUP);
     }
     throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + value + " (unknown type)");
    }, ElementPrototype.encodeValue = function(id, value, buffer) {
     if (null === value) return buffer;
     switch (this.type) {
     case ProtoBuf.TYPES.int32:
      value < 0 ? buffer.writeVarint64(value) : buffer.writeVarint32(value);
      break;

     case ProtoBuf.TYPES.uint32:
      buffer.writeVarint32(value);
      break;

     case ProtoBuf.TYPES.sint32:
      buffer.writeVarint32ZigZag(value);
      break;

     case ProtoBuf.TYPES.fixed32:
      buffer.writeUint32(value);
      break;

     case ProtoBuf.TYPES.sfixed32:
      buffer.writeInt32(value);
      break;

     case ProtoBuf.TYPES.int64:
     case ProtoBuf.TYPES.uint64:
      buffer.writeVarint64(value);
      break;

     case ProtoBuf.TYPES.sint64:
      buffer.writeVarint64ZigZag(value);
      break;

     case ProtoBuf.TYPES.fixed64:
      buffer.writeUint64(value);
      break;

     case ProtoBuf.TYPES.sfixed64:
      buffer.writeInt64(value);
      break;

     case ProtoBuf.TYPES.bool:
      "string" == typeof value ? buffer.writeVarint32("false" === value.toLowerCase() ? 0 : !!value) : buffer.writeVarint32(value ? 1 : 0);
      break;

     case ProtoBuf.TYPES.enum:
      buffer.writeVarint32(value);
      break;

     case ProtoBuf.TYPES.float:
      buffer.writeFloat32(value);
      break;

     case ProtoBuf.TYPES.double:
      buffer.writeFloat64(value);
      break;

     case ProtoBuf.TYPES.string:
      buffer.writeVString(value);
      break;

     case ProtoBuf.TYPES.bytes:
      if (value.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + value.remaining() + " bytes remaining");
      var prevOffset = value.offset;
      buffer.writeVarint32(value.remaining()), buffer.append(value), value.offset = prevOffset;
      break;

     case ProtoBuf.TYPES.message:
      var bb = (new ByteBuffer).LE();
      this.resolvedType.encode(value, bb), buffer.writeVarint32(bb.offset), buffer.append(bb.flip());
      break;

     case ProtoBuf.TYPES.group:
      this.resolvedType.encode(value, buffer), buffer.writeVarint32(id << 3 | ProtoBuf.WIRE_TYPES.ENDGROUP);
      break;

     default:
      throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + value + " (unknown type)");
     }
     return buffer;
    }, ElementPrototype.decode = function(buffer, wireType, id) {
     if (wireType != this.type.wireType) throw Error("Unexpected wire type for element");
     var value, nBytes;
     switch (this.type) {
     case ProtoBuf.TYPES.int32:
      return 0 | buffer.readVarint32();

     case ProtoBuf.TYPES.uint32:
      return buffer.readVarint32() >>> 0;

     case ProtoBuf.TYPES.sint32:
      return 0 | buffer.readVarint32ZigZag();

     case ProtoBuf.TYPES.fixed32:
      return buffer.readUint32() >>> 0;

     case ProtoBuf.TYPES.sfixed32:
      return 0 | buffer.readInt32();

     case ProtoBuf.TYPES.int64:
      return buffer.readVarint64();

     case ProtoBuf.TYPES.uint64:
      return buffer.readVarint64().toUnsigned();

     case ProtoBuf.TYPES.sint64:
      return buffer.readVarint64ZigZag();

     case ProtoBuf.TYPES.fixed64:
      return buffer.readUint64();

     case ProtoBuf.TYPES.sfixed64:
      return buffer.readInt64();

     case ProtoBuf.TYPES.bool:
      return !!buffer.readVarint32();

     case ProtoBuf.TYPES.enum:
      return buffer.readVarint32();

     case ProtoBuf.TYPES.float:
      return buffer.readFloat();

     case ProtoBuf.TYPES.double:
      return buffer.readDouble();

     case ProtoBuf.TYPES.string:
      return buffer.readVString();

     case ProtoBuf.TYPES.bytes:
      if (nBytes = buffer.readVarint32(), buffer.remaining() < nBytes) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + nBytes + " required but got only " + buffer.remaining());
      return (value = buffer.clone()).limit = value.offset + nBytes, buffer.offset += nBytes, 
      value;

     case ProtoBuf.TYPES.message:
      return nBytes = buffer.readVarint32(), this.resolvedType.decode(buffer, nBytes);

     case ProtoBuf.TYPES.group:
      return this.resolvedType.decode(buffer, -1, id);
     }
     throw Error("[INTERNAL] Illegal decode type");
    }, ElementPrototype.valueFromString = function(str) {
     if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");
     switch (this.type) {
     case ProtoBuf.TYPES.int32:
     case ProtoBuf.TYPES.sint32:
     case ProtoBuf.TYPES.sfixed32:
     case ProtoBuf.TYPES.uint32:
     case ProtoBuf.TYPES.fixed32:
      return this.verifyValue(parseInt(str));

     case ProtoBuf.TYPES.int64:
     case ProtoBuf.TYPES.sint64:
     case ProtoBuf.TYPES.sfixed64:
     case ProtoBuf.TYPES.uint64:
     case ProtoBuf.TYPES.fixed64:
      return this.verifyValue(str);

     case ProtoBuf.TYPES.bool:
      return "true" === str;

     case ProtoBuf.TYPES.string:
      return this.verifyValue(str);

     case ProtoBuf.TYPES.bytes:
      return ByteBuffer.fromBinary(str);
     }
    }, ElementPrototype.valueToString = function(value) {
     if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");
     return this.type === ProtoBuf.TYPES.bytes ? value.toString("binary") : value.toString();
    }, Reflect.Element = Element;
    var Message = function(builder, parent, name, options, isGroup, syntax) {
     Namespace.call(this, builder, parent, name, options, syntax), this.className = "Message", 
     this.extensions = void 0, this.clazz = null, this.isGroup = !!isGroup, this._fields = null, 
     this._fieldsById = null, this._fieldsByName = null;
    }, MessagePrototype = Message.prototype = Object.create(Namespace.prototype);
    function skipTillGroupEnd(expectedId, buf) {
     var tag = buf.readVarint32(), wireType = 7 & tag, id = tag >>> 3;
     switch (wireType) {
     case ProtoBuf.WIRE_TYPES.VARINT:
      do {
       tag = buf.readUint8();
      } while (128 == (128 & tag));
      break;

     case ProtoBuf.WIRE_TYPES.BITS64:
      buf.offset += 8;
      break;

     case ProtoBuf.WIRE_TYPES.LDELIM:
      tag = buf.readVarint32(), buf.offset += tag;
      break;

     case ProtoBuf.WIRE_TYPES.STARTGROUP:
      skipTillGroupEnd(id, buf);
      break;

     case ProtoBuf.WIRE_TYPES.ENDGROUP:
      if (id === expectedId) return !1;
      throw Error("Illegal GROUPEND after unknown group: " + id + " (" + expectedId + " expected)");

     case ProtoBuf.WIRE_TYPES.BITS32:
      buf.offset += 4;
      break;

     default:
      throw Error("Illegal wire type in unknown group " + expectedId + ": " + wireType);
     }
     return !0;
    }
    MessagePrototype.build = function(rebuild) {
     if (this.clazz && !rebuild) return this.clazz;
     var clazz = function(ProtoBuf, T) {
      var fields = T.getChildren(ProtoBuf.Reflect.Message.Field), oneofs = T.getChildren(ProtoBuf.Reflect.Message.OneOf), Message = function(values, var_args) {
       ProtoBuf.Builder.Message.call(this);
       for (var i = 0, k = oneofs.length; i < k; ++i) this[oneofs[i].name] = null;
       for (i = 0, k = fields.length; i < k; ++i) {
        var field = fields[i];
        this[field.name] = field.repeated ? [] : field.map ? new ProtoBuf.Map(field) : null, 
        !field.required && "proto3" !== T.syntax || null === field.defaultValue || (this[field.name] = field.defaultValue);
       }
       var value;
       if (arguments.length > 0) if (1 !== arguments.length || null === values || "object" != typeof values || !("function" != typeof values.encode || values instanceof Message) || Array.isArray(values) || values instanceof ProtoBuf.Map || ByteBuffer.isByteBuffer(values) || values instanceof ArrayBuffer || ProtoBuf.Long && values instanceof ProtoBuf.Long) for (i = 0, 
       k = arguments.length; i < k; ++i) void 0 !== (value = arguments[i]) && this.$set(fields[i].name, value); else this.$set(values);
      }, MessagePrototype = Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);
      MessagePrototype.add = function(key, value, noAssert) {
       var field = T._fieldsByName[key];
       if (!noAssert) {
        if (!field) throw Error(this + "#" + key + " is undefined");
        if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: " + field.toString(!0));
        if (!field.repeated) throw Error(this + "#" + key + " is not a repeated field");
        value = field.verifyValue(value, !0);
       }
       return null === this[key] && (this[key] = []), this[key].push(value), this;
      }, MessagePrototype.$add = MessagePrototype.add, MessagePrototype.set = function(keyOrObj, value, noAssert) {
       if (keyOrObj && "object" == typeof keyOrObj) {
        for (var ikey in noAssert = value, keyOrObj) keyOrObj.hasOwnProperty(ikey) && void 0 !== (value = keyOrObj[ikey]) && void 0 === T._oneofsByName[ikey] && this.$set(ikey, value, noAssert);
        return this;
       }
       var field = T._fieldsByName[keyOrObj];
       if (noAssert) this[keyOrObj] = value; else {
        if (!field) throw Error(this + "#" + keyOrObj + " is not a field: undefined");
        if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + keyOrObj + " is not a field: " + field.toString(!0));
        this[field.name] = value = field.verifyValue(value);
       }
       if (field && field.oneof) {
        var currentField = this[field.oneof.name];
        null !== value ? (null !== currentField && currentField !== field.name && (this[currentField] = null), 
        this[field.oneof.name] = field.name) : currentField === keyOrObj && (this[field.oneof.name] = null);
       }
       return this;
      }, MessagePrototype.$set = MessagePrototype.set, MessagePrototype.get = function(key, noAssert) {
       if (noAssert) return this[key];
       var field = T._fieldsByName[key];
       if (!(field && field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: undefined");
       if (!(field instanceof ProtoBuf.Reflect.Message.Field)) throw Error(this + "#" + key + " is not a field: " + field.toString(!0));
       return this[field.name];
      }, MessagePrototype.$get = MessagePrototype.get;
      for (var i = 0; i < fields.length; i++) {
       var field = fields[i];
       field instanceof ProtoBuf.Reflect.Message.ExtensionField || T.builder.options.populateAccessors && function(field) {
        var Name = field.originalName.replace(/(_[a-zA-Z])/g, (function(match) {
         return match.toUpperCase().replace("_", "");
        }));
        Name = Name.substring(0, 1).toUpperCase() + Name.substring(1);
        var name = field.originalName.replace(/([A-Z])/g, (function(match) {
         return "_" + match;
        })), setter = function(value, noAssert) {
         return this[field.name] = noAssert ? value : field.verifyValue(value), this;
        }, getter = function() {
         return this[field.name];
        };
        null === T.getChild("set" + Name) && (MessagePrototype["set" + Name] = setter), 
        null === T.getChild("set_" + name) && (MessagePrototype["set_" + name] = setter), 
        null === T.getChild("get" + Name) && (MessagePrototype["get" + Name] = getter), 
        null === T.getChild("get_" + name) && (MessagePrototype["get_" + name] = getter);
       }(field);
      }
      function cloneRaw(obj, binaryAsBase64, longsAsStrings, resolvedType) {
       if (null === obj || "object" != typeof obj) {
        if (resolvedType && resolvedType instanceof ProtoBuf.Reflect.Enum) {
         var name = ProtoBuf.Reflect.Enum.getName(resolvedType.object, obj);
         if (null !== name) return name;
        }
        return obj;
       }
       if (ByteBuffer.isByteBuffer(obj)) return binaryAsBase64 ? obj.toBase64() : obj.toBuffer();
       if (ProtoBuf.Long.isLong(obj)) return longsAsStrings ? obj.toString() : ProtoBuf.Long.fromValue(obj);
       var clone;
       if (Array.isArray(obj)) return clone = [], obj.forEach((function(v, k) {
        clone[k] = cloneRaw(v, binaryAsBase64, longsAsStrings, resolvedType);
       })), clone;
       if (clone = {}, obj instanceof ProtoBuf.Map) {
        for (var it = obj.entries(), e = it.next(); !e.done; e = it.next()) clone[obj.keyElem.valueToString(e.value[0])] = cloneRaw(e.value[1], binaryAsBase64, longsAsStrings, obj.valueElem.resolvedType);
        return clone;
       }
       var type = obj.$type, field = void 0;
       for (var i in obj) obj.hasOwnProperty(i) && (type && (field = type.getChild(i)) ? clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings, field.resolvedType) : clone[i] = cloneRaw(obj[i], binaryAsBase64, longsAsStrings));
       return clone;
      }
      return MessagePrototype.encode = function(buffer, noVerify) {
       "boolean" == typeof buffer && (noVerify = buffer, buffer = void 0);
       var isNew = !1;
       buffer || (buffer = new ByteBuffer, isNew = !0);
       var le = buffer.littleEndian;
       try {
        return T.encode(this, buffer.LE(), noVerify), (isNew ? buffer.flip() : buffer).LE(le);
       } catch (e) {
        throw buffer.LE(le), e;
       }
      }, Message.encode = function(data, buffer, noVerify) {
       return new Message(data).encode(buffer, noVerify);
      }, MessagePrototype.calculate = function() {
       return T.calculate(this);
      }, MessagePrototype.encodeDelimited = function(buffer, noVerify) {
       var isNew = !1;
       buffer || (buffer = new ByteBuffer, isNew = !0);
       var enc = (new ByteBuffer).LE();
       return T.encode(this, enc, noVerify).flip(), buffer.writeVarint32(enc.remaining()), 
       buffer.append(enc), isNew ? buffer.flip() : buffer;
      }, MessagePrototype.encodeAB = function() {
       try {
        return this.encode().toArrayBuffer();
       } catch (e) {
        throw e.encoded && (e.encoded = e.encoded.toArrayBuffer()), e;
       }
      }, MessagePrototype.toArrayBuffer = MessagePrototype.encodeAB, MessagePrototype.encodeNB = function() {
       try {
        return this.encode().toBuffer();
       } catch (e) {
        throw e.encoded && (e.encoded = e.encoded.toBuffer()), e;
       }
      }, MessagePrototype.toBuffer = MessagePrototype.encodeNB, MessagePrototype.encode64 = function() {
       try {
        return this.encode().toBase64();
       } catch (e) {
        throw e.encoded && (e.encoded = e.encoded.toBase64()), e;
       }
      }, MessagePrototype.toBase64 = MessagePrototype.encode64, MessagePrototype.encodeHex = function() {
       try {
        return this.encode().toHex();
       } catch (e) {
        throw e.encoded && (e.encoded = e.encoded.toHex()), e;
       }
      }, MessagePrototype.toHex = MessagePrototype.encodeHex, MessagePrototype.toRaw = function(binaryAsBase64, longsAsStrings) {
       return cloneRaw(this, !!binaryAsBase64, !!longsAsStrings, this.$type);
      }, MessagePrototype.encodeJSON = function() {
       return JSON.stringify(cloneRaw(this, !0, !0, this.$type));
      }, Message.decode = function(buffer, length, enc) {
       "string" == typeof length && (enc = length, length = -1), "string" == typeof buffer ? buffer = ByteBuffer.wrap(buffer, enc || "base64") : ByteBuffer.isByteBuffer(buffer) || (buffer = ByteBuffer.wrap(buffer));
       var le = buffer.littleEndian;
       try {
        var msg = T.decode(buffer.LE(), length);
        return buffer.LE(le), msg;
       } catch (e) {
        throw buffer.LE(le), e;
       }
      }, Message.decodeDelimited = function(buffer, enc) {
       if ("string" == typeof buffer ? buffer = ByteBuffer.wrap(buffer, enc || "base64") : ByteBuffer.isByteBuffer(buffer) || (buffer = ByteBuffer.wrap(buffer)), 
       buffer.remaining() < 1) return null;
       var off = buffer.offset, len = buffer.readVarint32();
       if (buffer.remaining() < len) return buffer.offset = off, null;
       try {
        var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
        return buffer.offset += len, msg;
       } catch (err) {
        throw buffer.offset += len, err;
       }
      }, Message.decode64 = function(str) {
       return Message.decode(str, "base64");
      }, Message.decodeHex = function(str) {
       return Message.decode(str, "hex");
      }, Message.decodeJSON = function(str) {
       return new Message(JSON.parse(str));
      }, MessagePrototype.toString = function() {
       return T.toString();
      }, Object.defineProperty && (Object.defineProperty(Message, "$options", {
       value: T.buildOpt()
      }), Object.defineProperty(MessagePrototype, "$options", {
       value: Message.$options
      }), Object.defineProperty(Message, "$type", {
       value: T
      }), Object.defineProperty(MessagePrototype, "$type", {
       value: T
      })), Message;
     }(ProtoBuf, this);
     this._fields = [], this._fieldsById = {}, this._fieldsByName = {}, this._oneofsByName = {};
     for (var child, i = 0, k = this.children.length; i < k; i++) if ((child = this.children[i]) instanceof Enum || child instanceof Message || child instanceof Service) {
      if (clazz.hasOwnProperty(child.name)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + child.toString(!0) + " cannot override static property '" + child.name + "'");
      clazz[child.name] = child.build();
     } else if (child instanceof Message.Field) child.build(), this._fields.push(child), 
     this._fieldsById[child.id] = child, this._fieldsByName[child.name] = child; else if (child instanceof Message.OneOf) this._oneofsByName[child.name] = child; else if (!(child instanceof Message.OneOf || child instanceof Extension)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[i].toString(!0));
     return this.clazz = clazz;
    }, MessagePrototype.encode = function(message, buffer, noVerify) {
     for (var field, val, fieldMissing = null, i = 0, k = this._fields.length; i < k; ++i) val = message[(field = this._fields[i]).name], 
     field.required && null === val ? null === fieldMissing && (fieldMissing = field) : field.encode(noVerify ? val : field.verifyValue(val), buffer, message);
     if (null !== fieldMissing) {
      var err = Error("Missing at least one required field for " + this.toString(!0) + ": " + fieldMissing);
      throw err.encoded = buffer, err;
     }
     return buffer;
    }, MessagePrototype.calculate = function(message) {
     for (var field, val, n = 0, i = 0, k = this._fields.length; i < k; ++i) {
      if (val = message[(field = this._fields[i]).name], field.required && null === val) throw Error("Missing at least one required field for " + this.toString(!0) + ": " + field);
      n += field.calculate(val, message);
     }
     return n;
    }, MessagePrototype.decode = function(buffer, length, expectedGroupEndId) {
     "number" != typeof length && (length = -1);
     for (var tag, wireType, id, field, start = buffer.offset, msg = new this.clazz; buffer.offset < start + length || -1 === length && buffer.remaining() > 0; ) {
      if (id = (tag = buffer.readVarint32()) >>> 3, (wireType = 7 & tag) === ProtoBuf.WIRE_TYPES.ENDGROUP) {
       if (id !== expectedGroupEndId) throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + id + " (" + (expectedGroupEndId ? expectedGroupEndId + " expected" : "not a group") + ")");
       break;
      }
      if (field = this._fieldsById[id]) {
       if (field.repeated && !field.options.packed) msg[field.name].push(field.decode(wireType, buffer)); else if (field.map) {
        var keyval = field.decode(wireType, buffer);
        msg[field.name].set(keyval[0], keyval[1]);
       } else if (msg[field.name] = field.decode(wireType, buffer), field.oneof) {
        var currentField = msg[field.oneof.name];
        null !== currentField && currentField !== field.name && (msg[currentField] = null), 
        msg[field.oneof.name] = field.name;
       }
      } else switch (wireType) {
      case ProtoBuf.WIRE_TYPES.VARINT:
       buffer.readVarint32();
       break;

      case ProtoBuf.WIRE_TYPES.BITS32:
       buffer.offset += 4;
       break;

      case ProtoBuf.WIRE_TYPES.BITS64:
       buffer.offset += 8;
       break;

      case ProtoBuf.WIRE_TYPES.LDELIM:
       var len = buffer.readVarint32();
       buffer.offset += len;
       break;

      case ProtoBuf.WIRE_TYPES.STARTGROUP:
       for (;skipTillGroupEnd(id, buffer); ) ;
       break;

      default:
       throw Error("Illegal wire type for unknown field " + id + " in " + this.toString(!0) + "#decode: " + wireType);
      }
     }
     for (var i = 0, k = this._fields.length; i < k; ++i) if (null === msg[(field = this._fields[i]).name]) if ("proto3" === this.syntax) msg[field.name] = field.defaultValue; else {
      if (field.required) {
       var err = Error("Missing at least one required field for " + this.toString(!0) + ": " + field.name);
       throw err.decoded = msg, err;
      }
      ProtoBuf.populateDefaults && null !== field.defaultValue && (msg[field.name] = field.defaultValue);
     }
     return msg;
    }, Reflect.Message = Message;
    var Field = function(builder, message, rule, keytype, type, name, id, options, oneof, syntax) {
     T.call(this, builder, message, name), this.className = "Message.Field", this.required = "required" === rule, 
     this.repeated = "repeated" === rule, this.map = "map" === rule, this.keyType = keytype || null, 
     this.type = type, this.resolvedType = null, this.id = id, this.options = options || {}, 
     this.defaultValue = null, this.oneof = oneof || null, this.syntax = syntax || "proto2", 
     this.originalName = this.name, this.element = null, this.keyElement = null, !this.builder.options.convertFieldsToCamelCase || this instanceof Message.ExtensionField || (this.name = ProtoBuf.Util.toCamelCase(this.name));
    }, FieldPrototype = Field.prototype = Object.create(T.prototype);
    FieldPrototype.build = function() {
     this.element = new Element(this.type, this.resolvedType, !1, this.syntax, this.name), 
     this.map && (this.keyElement = new Element(this.keyType, void 0, !0, this.syntax, this.name)), 
     "proto3" !== this.syntax || this.repeated || this.map ? void 0 !== this.options.default && (this.defaultValue = this.verifyValue(this.options.default)) : this.defaultValue = Element.defaultFieldValue(this.type);
    }, FieldPrototype.verifyValue = function(value, skipRepeated) {
     skipRepeated = skipRepeated || !1;
     var i, self = this;
     function fail(val, msg) {
      throw Error("Illegal value for " + self.toString(!0) + " of type " + self.type.name + ": " + val + " (" + msg + ")");
     }
     if (null === value) return this.required && fail(typeof value, "required"), "proto3" === this.syntax && this.type !== ProtoBuf.TYPES.message && fail(typeof value, "proto3 field without field presence cannot be null"), 
     null;
     if (this.repeated && !skipRepeated) {
      Array.isArray(value) || (value = [ value ]);
      var res = [];
      for (i = 0; i < value.length; i++) res.push(this.element.verifyValue(value[i]));
      return res;
     }
     return this.map && !skipRepeated ? value instanceof ProtoBuf.Map ? value : (value instanceof Object || fail(typeof value, "expected ProtoBuf.Map or raw object for map field"), 
     new ProtoBuf.Map(this, value)) : (!this.repeated && Array.isArray(value) && fail(typeof value, "no array expected"), 
     this.element.verifyValue(value));
    }, FieldPrototype.hasWirePresence = function(value, message) {
     if ("proto3" !== this.syntax) return null !== value;
     if (this.oneof && message[this.oneof.name] === this.name) return !0;
     switch (this.type) {
     case ProtoBuf.TYPES.int32:
     case ProtoBuf.TYPES.sint32:
     case ProtoBuf.TYPES.sfixed32:
     case ProtoBuf.TYPES.uint32:
     case ProtoBuf.TYPES.fixed32:
      return 0 !== value;

     case ProtoBuf.TYPES.int64:
     case ProtoBuf.TYPES.sint64:
     case ProtoBuf.TYPES.sfixed64:
     case ProtoBuf.TYPES.uint64:
     case ProtoBuf.TYPES.fixed64:
      return 0 !== value.low || 0 !== value.high;

     case ProtoBuf.TYPES.bool:
      return value;

     case ProtoBuf.TYPES.float:
     case ProtoBuf.TYPES.double:
      return 0 !== value;

     case ProtoBuf.TYPES.string:
      return value.length > 0;

     case ProtoBuf.TYPES.bytes:
      return value.remaining() > 0;

     case ProtoBuf.TYPES.enum:
      return 0 !== value;

     case ProtoBuf.TYPES.message:
      return null !== value;

     default:
      return !0;
     }
    }, FieldPrototype.encode = function(value, buffer, message) {
     if (null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
     if (null === value || this.repeated && 0 == value.length) return buffer;
     try {
      var i;
      if (this.repeated) if (this.options.packed && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
       buffer.writeVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM), buffer.ensureCapacity(buffer.offset += 1);
       var start = buffer.offset;
       for (i = 0; i < value.length; i++) this.element.encodeValue(this.id, value[i], buffer);
       var len = buffer.offset - start, varintLen = ByteBuffer.calculateVarint32(len);
       if (varintLen > 1) {
        var contents = buffer.slice(start, buffer.offset);
        start += varintLen - 1, buffer.offset = start, buffer.append(contents);
       }
       buffer.writeVarint32(len, start - varintLen);
      } else for (i = 0; i < value.length; i++) buffer.writeVarint32(this.id << 3 | this.type.wireType), 
      this.element.encodeValue(this.id, value[i], buffer); else this.map ? value.forEach((function(val, key, m) {
       var length = ByteBuffer.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, key) + ByteBuffer.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, val);
       buffer.writeVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM), buffer.writeVarint32(length), 
       buffer.writeVarint32(8 | this.keyType.wireType), this.keyElement.encodeValue(1, key, buffer), 
       buffer.writeVarint32(16 | this.type.wireType), this.element.encodeValue(2, val, buffer);
      }), this) : this.hasWirePresence(value, message) && (buffer.writeVarint32(this.id << 3 | this.type.wireType), 
      this.element.encodeValue(this.id, value, buffer));
     } catch (e) {
      throw Error("Illegal value for " + this.toString(!0) + ": " + value + " (" + e + ")");
     }
     return buffer;
    }, FieldPrototype.calculate = function(value, message) {
     if (value = this.verifyValue(value), null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);
     if (null === value || this.repeated && 0 == value.length) return 0;
     var n = 0;
     try {
      var i, ni;
      if (this.repeated) if (this.options.packed && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
       for (n += ByteBuffer.calculateVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM), 
       ni = 0, i = 0; i < value.length; i++) ni += this.element.calculateLength(this.id, value[i]);
       n += ByteBuffer.calculateVarint32(ni), n += ni;
      } else for (i = 0; i < value.length; i++) n += ByteBuffer.calculateVarint32(this.id << 3 | this.type.wireType), 
      n += this.element.calculateLength(this.id, value[i]); else this.map ? value.forEach((function(val, key, m) {
       var length = ByteBuffer.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, key) + ByteBuffer.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, val);
       n += ByteBuffer.calculateVarint32(this.id << 3 | ProtoBuf.WIRE_TYPES.LDELIM), n += ByteBuffer.calculateVarint32(length), 
       n += length;
      }), this) : this.hasWirePresence(value, message) && (n += ByteBuffer.calculateVarint32(this.id << 3 | this.type.wireType), 
      n += this.element.calculateLength(this.id, value));
     } catch (e) {
      throw Error("Illegal value for " + this.toString(!0) + ": " + value + " (" + e + ")");
     }
     return n;
    }, FieldPrototype.decode = function(wireType, buffer, skipRepeated) {
     var value, nBytes;
     if (!(!this.map && wireType == this.type.wireType || !skipRepeated && this.repeated && this.options.packed && wireType == ProtoBuf.WIRE_TYPES.LDELIM || this.map && wireType == ProtoBuf.WIRE_TYPES.LDELIM)) throw Error("Illegal wire type for field " + this.toString(!0) + ": " + wireType + " (" + this.type.wireType + " expected)");
     if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !skipRepeated) {
      nBytes = buffer.readVarint32(), nBytes = buffer.offset + nBytes;
      for (var values = []; buffer.offset < nBytes; ) values.push(this.decode(this.type.wireType, buffer, !0));
      return values;
     }
     if (this.map) {
      var key = Element.defaultFieldValue(this.keyType);
      if (value = Element.defaultFieldValue(this.type), nBytes = buffer.readVarint32(), 
      buffer.remaining() < nBytes) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + nBytes + " required but got only " + buffer.remaining());
      var msgbuf = buffer.clone();
      for (msgbuf.limit = msgbuf.offset + nBytes, buffer.offset += nBytes; msgbuf.remaining() > 0; ) {
       var tag = msgbuf.readVarint32();
       wireType = 7 & tag;
       var id = tag >>> 3;
       if (1 === id) key = this.keyElement.decode(msgbuf, wireType, id); else {
        if (2 !== id) throw Error("Unexpected tag in map field key/value submessage");
        value = this.element.decode(msgbuf, wireType, id);
       }
      }
      return [ key, value ];
     }
     return this.element.decode(buffer, wireType, this.id);
    }, Reflect.Message.Field = Field;
    var ExtensionField = function(builder, message, rule, type, name, id, options) {
     Field.call(this, builder, message, rule, null, type, name, id, options), this.extension;
    };
    ExtensionField.prototype = Object.create(Field.prototype), Reflect.Message.ExtensionField = ExtensionField;
    Reflect.Message.OneOf = function(builder, message, name) {
     T.call(this, builder, message, name), this.fields = [];
    };
    var Enum = function(builder, parent, name, options, syntax) {
     Namespace.call(this, builder, parent, name, options, syntax), this.className = "Enum", 
     this.object = null;
    };
    Enum.getName = function(enm, value) {
     for (var key, keys = Object.keys(enm), i = 0; i < keys.length; ++i) if (enm[key = keys[i]] === value) return key;
     return null;
    }, (Enum.prototype = Object.create(Namespace.prototype)).build = function(rebuild) {
     if (this.object && !rebuild) return this.object;
     for (var enm = new ProtoBuf.Builder.Enum, values = this.getChildren(Enum.Value), i = 0, k = values.length; i < k; ++i) enm[values[i].name] = values[i].id;
     return Object.defineProperty && Object.defineProperty(enm, "$options", {
      value: this.buildOpt(),
      enumerable: !1
     }), this.object = enm;
    }, Reflect.Enum = Enum;
    var Value = function(builder, enm, name, id) {
     T.call(this, builder, enm, name), this.className = "Enum.Value", this.id = id;
    };
    Value.prototype = Object.create(T.prototype), Reflect.Enum.Value = Value;
    var Extension = function(builder, parent, name, field) {
     T.call(this, builder, parent, name), this.field = field;
    };
    Extension.prototype = Object.create(T.prototype), Reflect.Extension = Extension;
    var Service = function(builder, root, name, options) {
     Namespace.call(this, builder, root, name, options), this.className = "Service", 
     this.clazz = null;
    };
    (Service.prototype = Object.create(Namespace.prototype)).build = function(rebuild) {
     return this.clazz && !rebuild ? this.clazz : this.clazz = function(ProtoBuf, T) {
      for (var Service = function(rpcImpl) {
       ProtoBuf.Builder.Service.call(this), this.rpcImpl = rpcImpl || function(name, msg, callback) {
        setTimeout(callback.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);
       };
      }, ServicePrototype = Service.prototype = Object.create(ProtoBuf.Builder.Service.prototype), rpc = T.getChildren(ProtoBuf.Reflect.Service.RPCMethod), i = 0; i < rpc.length; i++) !function(method) {
       ServicePrototype[method.name] = function(req, callback) {
        try {
         try {
          req = method.resolvedRequestType.clazz.decode(ByteBuffer.wrap(req));
         } catch (err) {
          if (!(err instanceof TypeError)) throw err;
         }
         if (null === req || "object" != typeof req) throw Error("Illegal arguments");
         req instanceof method.resolvedRequestType.clazz || (req = new method.resolvedRequestType.clazz(req)), 
         this.rpcImpl(method.fqn(), req, (function(err, res) {
          if (err) callback(err); else {
           null === res && (res = "");
           try {
            res = method.resolvedResponseType.clazz.decode(res);
           } catch (notABuffer) {}
           res && res instanceof method.resolvedResponseType.clazz ? callback(null, res) : callback(Error("Illegal response type received in service method " + T.name + "#" + method.name));
          }
         }));
        } catch (err) {
         setTimeout(callback.bind(this, err), 0);
        }
       }, Service[method.name] = function(rpcImpl, req, callback) {
        new Service(rpcImpl)[method.name](req, callback);
       }, Object.defineProperty && (Object.defineProperty(Service[method.name], "$options", {
        value: method.buildOpt()
       }), Object.defineProperty(ServicePrototype[method.name], "$options", {
        value: Service[method.name].$options
       }));
      }(rpc[i]);
      return Object.defineProperty && (Object.defineProperty(Service, "$options", {
       value: T.buildOpt()
      }), Object.defineProperty(ServicePrototype, "$options", {
       value: Service.$options
      }), Object.defineProperty(Service, "$type", {
       value: T
      }), Object.defineProperty(ServicePrototype, "$type", {
       value: T
      })), Service;
     }(ProtoBuf, this);
    }, Reflect.Service = Service;
    var Method = function(builder, svc, name, options) {
     T.call(this, builder, svc, name), this.className = "Service.Method", this.options = options || {};
    };
    (Method.prototype = Object.create(T.prototype)).buildOpt = NamespacePrototype.buildOpt, 
    Reflect.Service.Method = Method;
    var RPCMethod = function(builder, svc, name, request, response, request_stream, response_stream, options) {
     Method.call(this, builder, svc, name, options), this.className = "Service.RPCMethod", 
     this.requestName = request, this.responseName = response, this.requestStream = request_stream, 
     this.responseStream = response_stream, this.resolvedRequestType = null, this.resolvedResponseType = null;
    };
    return RPCMethod.prototype = Object.create(Method.prototype), Reflect.Service.RPCMethod = RPCMethod, 
    Reflect;
   }(ProtoBuf), ProtoBuf.Builder = function(ProtoBuf, Lang, Reflect) {
    var Builder = function(options) {
     this.ns = new Reflect.Namespace(this, null, ""), this.ptr = this.ns, this.resolved = !1, 
     this.result = null, this.files = {}, this.importRoot = null, this.options = options || {};
    }, BuilderPrototype = Builder.prototype;
    return Builder.isMessage = function(def) {
     return "string" == typeof def.name && (void 0 === def.values && void 0 === def.rpc);
    }, Builder.isMessageField = function(def) {
     return "string" == typeof def.rule && "string" == typeof def.name && "string" == typeof def.type && void 0 !== def.id;
    }, Builder.isEnum = function(def) {
     return "string" == typeof def.name && !(void 0 === def.values || !Array.isArray(def.values) || 0 === def.values.length);
    }, Builder.isService = function(def) {
     return !("string" != typeof def.name || "object" != typeof def.rpc || !def.rpc);
    }, Builder.isExtend = function(def) {
     return "string" == typeof def.ref;
    }, BuilderPrototype.reset = function() {
     return this.ptr = this.ns, this;
    }, BuilderPrototype.define = function(namespace) {
     if ("string" != typeof namespace || !Lang.TYPEREF.test(namespace)) throw Error("illegal namespace: " + namespace);
     return namespace.split(".").forEach((function(part) {
      var ns = this.ptr.getChild(part);
      null === ns && this.ptr.addChild(ns = new Reflect.Namespace(this, this.ptr, part)), 
      this.ptr = ns;
     }), this), this;
    }, BuilderPrototype.create = function(defs) {
     if (!defs) return this;
     if (Array.isArray(defs)) {
      if (0 === defs.length) return this;
      defs = defs.slice();
     } else defs = [ defs ];
     for (var stack = [ defs ]; stack.length > 0; ) {
      if (defs = stack.pop(), !Array.isArray(defs)) throw Error("not a valid namespace: " + JSON.stringify(defs));
      for (;defs.length > 0; ) {
       var def = defs.shift();
       if (Builder.isMessage(def)) {
        var obj = new Reflect.Message(this, this.ptr, def.name, def.options, def.isGroup, def.syntax), oneofs = {};
        def.oneofs && Object.keys(def.oneofs).forEach((function(name) {
         obj.addChild(oneofs[name] = new Reflect.Message.OneOf(this, obj, name));
        }), this), def.fields && def.fields.forEach((function(fld) {
         if (null !== obj.getChild(0 | fld.id)) throw Error("duplicate or invalid field id in " + obj.name + ": " + fld.id);
         if (fld.options && "object" != typeof fld.options) throw Error("illegal field options in " + obj.name + "#" + fld.name);
         var oneof = null;
         if ("string" == typeof fld.oneof && !(oneof = oneofs[fld.oneof])) throw Error("illegal oneof in " + obj.name + "#" + fld.name + ": " + fld.oneof);
         fld = new Reflect.Message.Field(this, obj, fld.rule, fld.keytype, fld.type, fld.name, fld.id, fld.options, oneof, def.syntax), 
         oneof && oneof.fields.push(fld), obj.addChild(fld);
        }), this);
        var subObj = [];
        if (def.enums && def.enums.forEach((function(enm) {
         subObj.push(enm);
        })), def.messages && def.messages.forEach((function(msg) {
         subObj.push(msg);
        })), def.services && def.services.forEach((function(svc) {
         subObj.push(svc);
        })), def.extensions && ("number" == typeof def.extensions[0] ? obj.extensions = [ def.extensions ] : obj.extensions = def.extensions), 
        this.ptr.addChild(obj), subObj.length > 0) {
         stack.push(defs), defs = subObj, subObj = null, this.ptr = obj, obj = null;
         continue;
        }
        subObj = null;
       } else if (Builder.isEnum(def)) obj = new Reflect.Enum(this, this.ptr, def.name, def.options, def.syntax), 
       def.values.forEach((function(val) {
        obj.addChild(new Reflect.Enum.Value(this, obj, val.name, val.id));
       }), this), this.ptr.addChild(obj); else if (Builder.isService(def)) obj = new Reflect.Service(this, this.ptr, def.name, def.options), 
       Object.keys(def.rpc).forEach((function(name) {
        var mtd = def.rpc[name];
        obj.addChild(new Reflect.Service.RPCMethod(this, obj, name, mtd.request, mtd.response, !!mtd.request_stream, !!mtd.response_stream, mtd.options));
       }), this), this.ptr.addChild(obj); else {
        if (!Builder.isExtend(def)) throw Error("not a valid definition: " + JSON.stringify(def));
        if (obj = this.ptr.resolve(def.ref, !0)) def.fields.forEach((function(fld) {
         if (null !== obj.getChild(0 | fld.id)) throw Error("duplicate extended field id in " + obj.name + ": " + fld.id);
         if (obj.extensions) {
          var valid = !1;
          if (obj.extensions.forEach((function(range) {
           fld.id >= range[0] && fld.id <= range[1] && (valid = !0);
          })), !valid) throw Error("illegal extended field id in " + obj.name + ": " + fld.id + " (not within valid ranges)");
         }
         var name = fld.name;
         this.options.convertFieldsToCamelCase && (name = ProtoBuf.Util.toCamelCase(name));
         var field = new Reflect.Message.ExtensionField(this, obj, fld.rule, fld.type, this.ptr.fqn() + "." + name, fld.id, fld.options), ext = new Reflect.Extension(this, this.ptr, fld.name, field);
         field.extension = ext, this.ptr.addChild(ext), obj.addChild(field);
        }), this); else if (!/\.?google\.protobuf\./.test(def.ref)) throw Error("extended message " + def.ref + " is not defined");
       }
       def = null, obj = null;
      }
      defs = null, this.ptr = this.ptr.parent;
     }
     return this.resolved = !1, this.result = null, this;
    }, BuilderPrototype.import = function(json, filename) {
     var delim = "/";
     if ("string" == typeof filename) {
      if (ProtoBuf.Util.IS_NODE && (filename = {}.resolve(filename)), !0 === this.files[filename]) return this.reset();
      this.files[filename] = !0;
     } else if ("object" == typeof filename) {
      var fname, root = filename.root;
      if (ProtoBuf.Util.IS_NODE && (root = {}.resolve(root)), (root.indexOf("\\") >= 0 || filename.file.indexOf("\\") >= 0) && (delim = "\\"), 
      fname = ProtoBuf.Util.IS_NODE ? {}.join(root, filename.file) : root + delim + filename.file, 
      !0 === this.files[fname]) return this.reset();
      this.files[fname] = !0;
     }
     if (json.imports && json.imports.length > 0) {
      var importRoot, resetRoot = !1;
      "object" == typeof filename ? (this.importRoot = filename.root, resetRoot = !0, 
      importRoot = this.importRoot, filename = filename.file, (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0) && (delim = "\\")) : "string" == typeof filename ? this.importRoot ? importRoot = this.importRoot : filename.indexOf("/") >= 0 ? "" === (importRoot = filename.replace(/\/[^\/]*$/, "")) && (importRoot = "/") : filename.indexOf("\\") >= 0 ? (importRoot = filename.replace(/\\[^\\]*$/, ""), 
      delim = "\\") : importRoot = "." : importRoot = null;
      for (var i = 0; i < json.imports.length; i++) if ("string" == typeof json.imports[i]) {
       if (!importRoot) throw Error("cannot determine import root");
       var importFilename = json.imports[i];
       if ("google/protobuf/descriptor.proto" === importFilename) continue;
       if (importFilename = ProtoBuf.Util.IS_NODE ? {}.join(importRoot, importFilename) : importRoot + delim + importFilename, 
       !0 === this.files[importFilename]) continue;
       /\.proto$/i.test(importFilename) && !ProtoBuf.DotProto && (importFilename = importFilename.replace(/\.proto$/, ".json"));
       var contents = ProtoBuf.Util.fetch(importFilename);
       if (null === contents) throw Error("failed to import '" + importFilename + "' in '" + filename + "': file not found");
       /\.json$/i.test(importFilename) ? this.import(JSON.parse(contents + ""), importFilename) : this.import(ProtoBuf.DotProto.Parser.parse(contents), importFilename);
      } else filename ? /\.(\w+)$/.test(filename) ? this.import(json.imports[i], filename.replace(/^(.+)\.(\w+)$/, (function($0, $1, $2) {
       return $1 + "_import" + i + "." + $2;
      }))) : this.import(json.imports[i], filename + "_import" + i) : this.import(json.imports[i]);
      resetRoot && (this.importRoot = null);
     }
     json.package && this.define(json.package), json.syntax && function propagateSyntax(parent) {
      parent.messages && parent.messages.forEach((function(child) {
       child.syntax = parent.syntax, propagateSyntax(child);
      })), parent.enums && parent.enums.forEach((function(child) {
       child.syntax = parent.syntax;
      }));
     }(json);
     var base = this.ptr;
     return json.options && Object.keys(json.options).forEach((function(key) {
      base.options[key] = json.options[key];
     })), json.messages && (this.create(json.messages), this.ptr = base), json.enums && (this.create(json.enums), 
     this.ptr = base), json.services && (this.create(json.services), this.ptr = base), 
     json.extends && this.create(json.extends), this.reset();
    }, BuilderPrototype.resolveAll = function() {
     var res;
     if (null == this.ptr || "object" == typeof this.ptr.type) return this;
     if (this.ptr instanceof Reflect.Namespace) this.ptr.children.forEach((function(child) {
      this.ptr = child, this.resolveAll();
     }), this); else if (this.ptr instanceof Reflect.Message.Field) {
      if (Lang.TYPE.test(this.ptr.type)) this.ptr.type = ProtoBuf.TYPES[this.ptr.type]; else {
       if (!Lang.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
       if (!(res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0))) throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
       if (this.ptr.resolvedType = res, res instanceof Reflect.Enum) {
        if (this.ptr.type = ProtoBuf.TYPES.enum, "proto3" === this.ptr.syntax && "proto3" !== res.syntax) throw Error("proto3 message cannot reference proto2 enum");
       } else {
        if (!(res instanceof Reflect.Message)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);
        this.ptr.type = res.isGroup ? ProtoBuf.TYPES.group : ProtoBuf.TYPES.message;
       }
      }
      if (this.ptr.map) {
       if (!Lang.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);
       this.ptr.keyType = ProtoBuf.TYPES[this.ptr.keyType];
      }
      "proto3" === this.ptr.syntax && this.ptr.repeated && void 0 === this.ptr.options.packed && -1 !== ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.ptr.type.wireType) && (this.ptr.options.packed = !0);
     } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {
      if (!(this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(!0));
      if (!((res = this.ptr.parent.resolve(this.ptr.requestName, !0)) && res instanceof ProtoBuf.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);
      if (this.ptr.resolvedRequestType = res, !((res = this.ptr.parent.resolve(this.ptr.responseName, !0)) && res instanceof ProtoBuf.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);
      this.ptr.resolvedResponseType = res;
     } else if (!(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf || this.ptr instanceof ProtoBuf.Reflect.Extension || this.ptr instanceof ProtoBuf.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);
     return this.reset();
    }, BuilderPrototype.build = function(path) {
     if (this.reset(), this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null), 
     null === this.result && (this.result = this.ns.build()), !path) return this.result;
     for (var part = "string" == typeof path ? path.split(".") : path, ptr = this.result, i = 0; i < part.length; i++) {
      if (!ptr[part[i]]) {
       ptr = null;
       break;
      }
      ptr = ptr[part[i]];
     }
     return ptr;
    }, BuilderPrototype.lookup = function(path, excludeNonNamespace) {
     return path ? this.ns.resolve(path, excludeNonNamespace) : this.ns;
    }, BuilderPrototype.toString = function() {
     return "Builder";
    }, Builder.Message = function() {}, Builder.Enum = function() {}, Builder.Service = function() {}, 
    Builder;
   }(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect), ProtoBuf.Map = function(ProtoBuf, Reflect) {
    var Map = function(field, contents) {
     if (!field.map) throw Error("field is not a map");
     if (this.field = field, this.keyElem = new Reflect.Element(field.keyType, null, !0, field.syntax), 
     this.valueElem = new Reflect.Element(field.type, field.resolvedType, !1, field.syntax), 
     this.map = {}, Object.defineProperty(this, "size", {
      get: function() {
       return Object.keys(this.map).length;
      }
     }), contents) for (var keys = Object.keys(contents), i = 0; i < keys.length; i++) {
      var key = this.keyElem.valueFromString(keys[i]), val = this.valueElem.verifyValue(contents[keys[i]]);
      this.map[this.keyElem.valueToString(key)] = {
       key: key,
       value: val
      };
     }
    }, MapPrototype = Map.prototype;
    function arrayIterator(arr) {
     var idx = 0;
     return {
      next: function() {
       return idx < arr.length ? {
        done: !1,
        value: arr[idx++]
       } : {
        done: !0
       };
      }
     };
    }
    return MapPrototype.clear = function() {
     this.map = {};
    }, MapPrototype.delete = function(key) {
     var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key)), hadKey = keyValue in this.map;
     return delete this.map[keyValue], hadKey;
    }, MapPrototype.entries = function() {
     for (var entry, entries = [], strKeys = Object.keys(this.map), i = 0; i < strKeys.length; i++) entries.push([ (entry = this.map[strKeys[i]]).key, entry.value ]);
     return arrayIterator(entries);
    }, MapPrototype.keys = function() {
     for (var keys = [], strKeys = Object.keys(this.map), i = 0; i < strKeys.length; i++) keys.push(this.map[strKeys[i]].key);
     return arrayIterator(keys);
    }, MapPrototype.values = function() {
     for (var values = [], strKeys = Object.keys(this.map), i = 0; i < strKeys.length; i++) values.push(this.map[strKeys[i]].value);
     return arrayIterator(values);
    }, MapPrototype.forEach = function(cb, thisArg) {
     for (var entry, strKeys = Object.keys(this.map), i = 0; i < strKeys.length; i++) cb.call(thisArg, (entry = this.map[strKeys[i]]).value, entry.key, this);
    }, MapPrototype.set = function(key, value) {
     var keyValue = this.keyElem.verifyValue(key), valValue = this.valueElem.verifyValue(value);
     return this.map[this.keyElem.valueToString(keyValue)] = {
      key: keyValue,
      value: valValue
     }, this;
    }, MapPrototype.get = function(key) {
     var keyValue = this.keyElem.valueToString(this.keyElem.verifyValue(key));
     if (keyValue in this.map) return this.map[keyValue].value;
    }, MapPrototype.has = function(key) {
     return this.keyElem.valueToString(this.keyElem.verifyValue(key)) in this.map;
    }, Map;
   }(0, ProtoBuf.Reflect), ProtoBuf.newBuilder = function(options) {
    return void 0 === (options = options || {}).convertFieldsToCamelCase && (options.convertFieldsToCamelCase = ProtoBuf.convertFieldsToCamelCase), 
    void 0 === options.populateAccessors && (options.populateAccessors = ProtoBuf.populateAccessors), 
    new ProtoBuf.Builder(options);
   }, ProtoBuf.loadJson = function(json, builder, filename) {
    return ("string" == typeof builder || builder && "string" == typeof builder.file && "string" == typeof builder.root) && (filename = builder, 
    builder = null), builder && "object" == typeof builder || (builder = ProtoBuf.newBuilder()), 
    "string" == typeof json && (json = JSON.parse(json)), builder.import(json, filename), 
    builder.resolveAll(), builder;
   }, ProtoBuf.loadJsonFile = function(filename, callback, builder) {
    if (callback && "object" == typeof callback ? (builder = callback, callback = null) : callback && "function" == typeof callback || (callback = null), 
    callback) return ProtoBuf.Util.fetch("string" == typeof filename ? filename : filename.root + "/" + filename.file, (function(contents) {
     if (null !== contents) try {
      callback(null, ProtoBuf.loadJson(JSON.parse(contents), builder, filename));
     } catch (e) {
      callback(e);
     } else callback(Error("Failed to fetch file"));
    }));
    var contents = ProtoBuf.Util.fetch("object" == typeof filename ? filename.root + "/" + filename.file : filename);
    return null === contents ? null : ProtoBuf.loadJson(JSON.parse(contents), builder, filename);
   }, ProtoBuf;
  }));
 })), activity_envelope = protobufLight.newBuilder({}).import({
  package: null,
  syntax: "proto2",
  options: {
   java_outer_classname: "ActivityEnvelopeProto"
  },
  messages: [ {
   name: "Browser",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "BrowserType",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 3
   } ]
  }, {
   name: "EnvelopeCommon",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "send_time",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "no_geo",
    id: 2
   } ]
  }, {
   name: "Event",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "subtype",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 3
   }, {
    rule: "optional",
    type: "int64",
    name: "reception_time",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "request_id",
    id: 5
   } ]
  }, {
   name: "Geo",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bytes",
    name: "ip",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "country",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "region",
    id: 3
   }, {
    rule: "optional",
    type: "string",
    name: "city",
    id: 4
   }, {
    rule: "optional",
    type: "double",
    name: "latitude",
    id: 5
   }, {
    rule: "optional",
    type: "double",
    name: "longitude",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "isp",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "asn",
    id: 8
   } ]
  }, {
   name: "Identity",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "guid",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "hwid",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "uuid",
    id: 3
   } ]
  }, {
   name: "Installation",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "aiid",
    id: 1
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 2
   }, {
    rule: "optional",
    type: "SetupAction",
    name: "action",
    id: 3
   } ]
  }, {
   name: "License",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "wallet_key",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "container_id",
    id: 2
   }, {
    rule: "optional",
    type: "LicenseEdition",
    name: "edition",
    id: 3
   }, {
    rule: "optional",
    type: "ModeType",
    name: "type",
    id: 4
   }, {
    rule: "optional",
    type: "bool",
    name: "subscription_mode",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "schema_id",
    id: 6
   }, {
    rule: "optional",
    type: "int64",
    name: "issued",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "activation",
    id: 8
   }, {
    rule: "optional",
    type: "int64",
    name: "valid_thru",
    id: 9
   }, {
    rule: "optional",
    type: "int32",
    name: "count",
    id: 10
   }, {
    rule: "optional",
    type: "int32",
    name: "count_device",
    id: 11
   } ]
  }, {
   name: "Platform",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "OperatingSystem",
    name: "os",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "build",
    id: 3
   }, {
    rule: "optional",
    type: "int32",
    name: "ubr",
    id: 4
   }, {
    rule: "optional",
    type: "Architecture",
    name: "architecture",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "score",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 7
   }, {
    rule: "optional",
    type: "sint32",
    name: "time_zone",
    id: 8
   } ]
  }, {
   name: "Product",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "edition",
    id: 2
   }, {
    rule: "optional",
    type: "ModeType",
    name: "mode",
    id: 3
   }, {
    rule: "optional",
    type: "StateType",
    name: "state",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "version_app",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "version_gui",
    id: 7
   }, {
    rule: "optional",
    type: "int32",
    name: "build",
    id: 8
   }, {
    rule: "optional",
    type: "string",
    name: "partner_id",
    id: 9
   } ]
  }, {
   name: "Shepherd",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "name",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "version",
    id: 3
   } ]
  }, {
   name: "Campaign",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "string",
    name: "test",
    id: 1
   } ]
  }, {
   name: "Settings",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "SettingsConsent",
    name: "consent",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "eula",
    id: 2
   }, {
    rule: "optional",
    type: "int32",
    name: "eula_version",
    id: 3
   } ]
  }, {
   name: "SettingsConsent",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bool",
    name: "product_marketing",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "product_development",
    id: 2
   }, {
    rule: "optional",
    type: "bool",
    name: "third_party_apps",
    id: 3
   }, {
    rule: "optional",
    type: "bool",
    name: "third_party_analytics",
    id: 4
   } ]
  }, {
   name: "Activity",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "ActivityCommon",
    name: "common",
    id: 1
   }, {
    rule: "optional",
    type: "ActivityObject",
    name: "object",
    id: 2
   }, {
    rule: "optional",
    type: "ActivityTime",
    name: "time",
    id: 3
   }, {
    rule: "optional",
    type: "ActivityScope",
    name: "scope",
    id: 4
   }, {
    rule: "optional",
    type: "ActivityCustom",
    name: "custom",
    id: 5
   } ]
  }, {
   name: "ActivityCommon",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "session_id",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "test_id",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "test_group_id",
    id: 3
   }, {
    rule: "optional",
    type: "int32",
    name: "error_state",
    id: 4
   } ]
  }, {
   name: "ActivityObject",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "category",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "action",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "label",
    id: 3
   }, {
    rule: "optional",
    type: "string",
    name: "view",
    id: 4
   } ]
  }, {
   name: "ActivityTime",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "request",
    id: 1
   }, {
    rule: "optional",
    type: "int64",
    name: "response",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "render",
    id: 3
   } ]
  }, {
   name: "ActivityScope",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "hit",
    id: 1
   }, {
    rule: "optional",
    type: "int64",
    name: "session",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "user_level",
    id: 3
   } ]
  }, {
   name: "ActivityCustom",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "a1",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "a2",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "a3",
    id: 3
   }, {
    rule: "optional",
    type: "string",
    name: "a4",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "a5",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "a6",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "a7",
    id: 7
   }, {
    rule: "optional",
    type: "string",
    name: "a8",
    id: 8
   }, {
    rule: "optional",
    type: "string",
    name: "a9",
    id: 9
   }, {
    rule: "optional",
    type: "string",
    name: "a10",
    id: 10
   }, {
    rule: "optional",
    type: "string",
    name: "f1",
    id: 11
   }, {
    rule: "optional",
    type: "string",
    name: "f2",
    id: 12
   }, {
    rule: "optional",
    type: "string",
    name: "f3",
    id: 13
   }, {
    rule: "optional",
    type: "string",
    name: "f4",
    id: 14
   }, {
    rule: "optional",
    type: "string",
    name: "f5",
    id: 15
   }, {
    rule: "optional",
    type: "string",
    name: "f6",
    id: 16
   }, {
    rule: "optional",
    type: "string",
    name: "f7",
    id: 17
   }, {
    rule: "optional",
    type: "string",
    name: "f8",
    id: 18
   }, {
    rule: "optional",
    type: "string",
    name: "f9",
    id: 19
   }, {
    rule: "optional",
    type: "string",
    name: "f10",
    id: 20
   } ]
  }, {
   name: "ActivityEnvelope",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "ActivityRecord",
    name: "record",
    id: 1
   }, {
    rule: "optional",
    type: "EnvelopeCommon",
    name: "common",
    id: 2
   } ]
  }, {
   name: "ActivityRecord",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "Event",
    name: "event",
    id: 1
   }, {
    rule: "optional",
    type: "Identity",
    name: "identity",
    id: 2
   }, {
    rule: "optional",
    type: "Product",
    name: "product",
    id: 3
   }, {
    rule: "optional",
    type: "Platform",
    name: "platform",
    id: 4
   }, {
    rule: "optional",
    type: "Geo",
    name: "geo",
    id: 5
   }, {
    rule: "optional",
    type: "Installation",
    name: "installation",
    id: 6
   }, {
    rule: "optional",
    type: "License",
    name: "license",
    id: 7
   }, {
    rule: "optional",
    type: "Shepherd",
    name: "shepherd",
    id: 8
   }, {
    rule: "optional",
    type: "Browser",
    name: "browser",
    id: 10
   }, {
    rule: "optional",
    type: "Campaign",
    name: "campaign",
    id: 11
   }, {
    rule: "optional",
    type: "Settings",
    name: "settings",
    id: 12
   }, {
    rule: "optional",
    type: "Activity",
    name: "activity",
    id: 1e3
   } ]
  } ],
  enums: [ {
   name: "BrowserType",
   syntax: "proto2",
   values: [ {
    name: "OTHER_BROWSER",
    id: 1
   }, {
    name: "AVAST_SECURE_BROWSER",
    id: 2
   }, {
    name: "CHROME",
    id: 3
   }, {
    name: "FIREFOX",
    id: 4
   }, {
    name: "SAFARI",
    id: 5
   }, {
    name: "MICROSOFTEDGE",
    id: 6
   }, {
    name: "OPERA",
    id: 7
   }, {
    name: "IE",
    id: 8
   }, {
    name: "PALE_MOON",
    id: 9
   }, {
    name: "NETSCAPE",
    id: 10
   }, {
    name: "UC",
    id: 11
   }, {
    name: "YAB",
    id: 12
   }, {
    name: "COC_COC",
    id: 13
   }, {
    name: "CHROMIUM",
    id: 14
   }, {
    name: "VIVALDI",
    id: 15
   } ]
  }, {
   name: "SetupAction",
   syntax: "proto2",
   values: [ {
    name: "INSTALL",
    id: 1
   }, {
    name: "REINSTALL",
    id: 2
   }, {
    name: "REPAIR",
    id: 3
   }, {
    name: "UPGRADE",
    id: 4
   }, {
    name: "MIGRATION",
    id: 5
   }, {
    name: "UNINSTALL",
    id: 6
   }, {
    name: "CHANGE",
    id: 7
   }, {
    name: "CHECKFORUPDATES",
    id: 8
   }, {
    name: "COMPLETEOPERATION",
    id: 9
   }, {
    name: "OTHER",
    id: 10
   } ]
  }, {
   name: "LicenseEdition",
   syntax: "proto2",
   values: [ {
    name: "AV_FREE",
    id: 1
   }, {
    name: "AV_PRO",
    id: 2
   }, {
    name: "AV_AIS",
    id: 3
   }, {
    name: "AV_APR",
    id: 4
   }, {
    name: "AV_BUSINESS",
    id: 5
   }, {
    name: "AV_VPN",
    id: 6
   }, {
    name: "GF_SRV",
    id: 7
   }, {
    name: "AV_PSW",
    id: 8
   }, {
    name: "AV_PAP",
    id: 9
   }, {
    name: "AV_PSM",
    id: 10
   }, {
    name: "AV_ASH",
    id: 12
   }, {
    name: "AV_SOHO",
    id: 13
   }, {
    name: "AV_AVG_PRO",
    id: 14
   }, {
    name: "AV_AVG_FREE",
    id: 15
   }, {
    name: "AV_AVG_BUSINESS",
    id: 16
   }, {
    name: "PCT_AVG_PRO",
    id: 17
   }, {
    name: "AVG_VPN",
    id: 18
   }, {
    name: "HMA_VPN_CONSUMER",
    id: 19
   }, {
    name: "HMA_VPN_TRIAL",
    id: 20
   }, {
    name: "HMA_VPN_BUSINESS",
    id: 21
   }, {
    name: "GF_V2",
    id: 22
   }, {
    name: "BS_AVAST",
    id: 23
   }, {
    name: "BS_AVG",
    id: 24
   }, {
    name: "DU_AVAST",
    id: 25
   }, {
    name: "DU_AVG",
    id: 26
   } ]
  }, {
   name: "ModeType",
   syntax: "proto2",
   values: [ {
    name: "NO_LICENSE",
    id: 1
   }, {
    name: "FREE",
    id: 2
   }, {
    name: "TRIAL",
    id: 3
   }, {
    name: "PAID",
    id: 4
   }, {
    name: "OEM",
    id: 5
   }, {
    name: "PRE_AUTH_TRIAL",
    id: 6
   }, {
    name: "BETA",
    id: 7
   }, {
    name: "FREEMIUM",
    id: 8
   }, {
    name: "TRIAL_HARDCODED",
    id: 9
   } ]
  }, {
   name: "StateType",
   syntax: "proto2",
   values: [ {
    name: "ACTIVE",
    id: 1
   }, {
    name: "EXPIRED",
    id: 2
   } ]
  }, {
   name: "OperatingSystem",
   syntax: "proto2",
   values: [ {
    name: "WINDOWS",
    id: 1
   }, {
    name: "OSX",
    id: 2
   }, {
    name: "IOS",
    id: 3
   }, {
    name: "LINUX",
    id: 4
   }, {
    name: "ANDROID",
    id: 5
   }, {
    name: "CHROMEOS",
    id: 6
   } ]
  }, {
   name: "Architecture",
   syntax: "proto2",
   values: [ {
    name: "X86",
    id: 1
   }, {
    name: "X64",
    id: 2
   }, {
    name: "ARM",
    id: 3
   }, {
    name: "ARM64",
    id: 4
   }, {
    name: "MIPS",
    id: 5
   } ]
  } ],
  isNamespace: !0
 }).build(), heartbeat_envelope = protobufLight.newBuilder({}).import({
  package: null,
  syntax: "proto2",
  options: {
   java_outer_classname: "HeartbeatEnvelopeProto"
  },
  messages: [ {
   name: "Browser",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "BrowserType",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 3
   } ]
  }, {
   name: "EnvelopeCommon",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "send_time",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "no_geo",
    id: 2
   } ]
  }, {
   name: "Event",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "subtype",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 3
   }, {
    rule: "optional",
    type: "int64",
    name: "reception_time",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "request_id",
    id: 5
   } ]
  }, {
   name: "Geo",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bytes",
    name: "ip",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "country",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "region",
    id: 3
   }, {
    rule: "optional",
    type: "string",
    name: "city",
    id: 4
   }, {
    rule: "optional",
    type: "double",
    name: "latitude",
    id: 5
   }, {
    rule: "optional",
    type: "double",
    name: "longitude",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "isp",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "asn",
    id: 8
   } ]
  }, {
   name: "Identity",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "guid",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "hwid",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "uuid",
    id: 3
   } ]
  }, {
   name: "Installation",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "aiid",
    id: 1
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 2
   }, {
    rule: "optional",
    type: "SetupAction",
    name: "action",
    id: 3
   } ]
  }, {
   name: "License",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "wallet_key",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "container_id",
    id: 2
   }, {
    rule: "optional",
    type: "LicenseEdition",
    name: "edition",
    id: 3
   }, {
    rule: "optional",
    type: "ModeType",
    name: "type",
    id: 4
   }, {
    rule: "optional",
    type: "bool",
    name: "subscription_mode",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "schema_id",
    id: 6
   }, {
    rule: "optional",
    type: "int64",
    name: "issued",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "activation",
    id: 8
   }, {
    rule: "optional",
    type: "int64",
    name: "valid_thru",
    id: 9
   }, {
    rule: "optional",
    type: "int32",
    name: "count",
    id: 10
   }, {
    rule: "optional",
    type: "int32",
    name: "count_device",
    id: 11
   } ]
  }, {
   name: "Platform",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "OperatingSystem",
    name: "os",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "build",
    id: 3
   }, {
    rule: "optional",
    type: "int32",
    name: "ubr",
    id: 4
   }, {
    rule: "optional",
    type: "Architecture",
    name: "architecture",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "score",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 7
   }, {
    rule: "optional",
    type: "sint32",
    name: "time_zone",
    id: 8
   } ]
  }, {
   name: "Product",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "edition",
    id: 2
   }, {
    rule: "optional",
    type: "ModeType",
    name: "mode",
    id: 3
   }, {
    rule: "optional",
    type: "StateType",
    name: "state",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "version_app",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "version_gui",
    id: 7
   }, {
    rule: "optional",
    type: "int32",
    name: "build",
    id: 8
   }, {
    rule: "optional",
    type: "string",
    name: "partner_id",
    id: 9
   } ]
  }, {
   name: "Shepherd",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "name",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "version",
    id: 3
   } ]
  }, {
   name: "Campaign",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "string",
    name: "test",
    id: 1
   } ]
  }, {
   name: "Settings",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "SettingsConsent",
    name: "consent",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "eula",
    id: 2
   }, {
    rule: "optional",
    type: "int32",
    name: "eula_version",
    id: 3
   } ]
  }, {
   name: "SettingsConsent",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bool",
    name: "product_marketing",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "product_development",
    id: 2
   }, {
    rule: "optional",
    type: "bool",
    name: "third_party_apps",
    id: 3
   }, {
    rule: "optional",
    type: "bool",
    name: "third_party_analytics",
    id: 4
   } ]
  }, {
   name: "Heartbeat",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "uptime",
    id: 1
   }, {
    rule: "optional",
    type: "HeartbeatAV",
    name: "av",
    id: 2
   }, {
    rule: "optional",
    type: "HeartbeatVPN",
    name: "vpn",
    id: 3
   } ]
  }, {
   name: "HeartbeatAV",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "HeartbeatWinAV",
    name: "windows",
    id: 1
   } ]
  }, {
   name: "HeartbeatWinAV",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "WinAVGSMainStatus",
    name: "gs_main_status",
    id: 1
   } ]
  }, {
   name: "HeartbeatVPN",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "vpn_name",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "connections_succeeded",
    id: 2
   }, {
    rule: "optional",
    type: "int32",
    name: "connections_failed",
    id: 3
   } ]
  }, {
   name: "HeartbeatEnvelope",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "HeartbeatRecord",
    name: "record",
    id: 1
   }, {
    rule: "optional",
    type: "EnvelopeCommon",
    name: "common",
    id: 2
   } ]
  }, {
   name: "HeartbeatRecord",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "Event",
    name: "event",
    id: 1
   }, {
    rule: "optional",
    type: "Identity",
    name: "identity",
    id: 2
   }, {
    rule: "optional",
    type: "Product",
    name: "product",
    id: 3
   }, {
    rule: "optional",
    type: "Platform",
    name: "platform",
    id: 4
   }, {
    rule: "optional",
    type: "Geo",
    name: "geo",
    id: 5
   }, {
    rule: "optional",
    type: "Installation",
    name: "installation",
    id: 6
   }, {
    rule: "optional",
    type: "License",
    name: "license",
    id: 7
   }, {
    rule: "optional",
    type: "Shepherd",
    name: "shepherd",
    id: 8
   }, {
    rule: "optional",
    type: "Browser",
    name: "browser",
    id: 10
   }, {
    rule: "optional",
    type: "Campaign",
    name: "campaign",
    id: 11
   }, {
    rule: "optional",
    type: "Settings",
    name: "settings",
    id: 12
   }, {
    rule: "optional",
    type: "Heartbeat",
    name: "heartbeat",
    id: 1e3
   } ]
  } ],
  enums: [ {
   name: "BrowserType",
   syntax: "proto2",
   values: [ {
    name: "OTHER_BROWSER",
    id: 1
   }, {
    name: "AVAST_SECURE_BROWSER",
    id: 2
   }, {
    name: "CHROME",
    id: 3
   }, {
    name: "FIREFOX",
    id: 4
   }, {
    name: "SAFARI",
    id: 5
   }, {
    name: "MICROSOFTEDGE",
    id: 6
   }, {
    name: "OPERA",
    id: 7
   }, {
    name: "IE",
    id: 8
   }, {
    name: "PALE_MOON",
    id: 9
   }, {
    name: "NETSCAPE",
    id: 10
   }, {
    name: "UC",
    id: 11
   }, {
    name: "YAB",
    id: 12
   }, {
    name: "COC_COC",
    id: 13
   }, {
    name: "CHROMIUM",
    id: 14
   }, {
    name: "VIVALDI",
    id: 15
   } ]
  }, {
   name: "SetupAction",
   syntax: "proto2",
   values: [ {
    name: "INSTALL",
    id: 1
   }, {
    name: "REINSTALL",
    id: 2
   }, {
    name: "REPAIR",
    id: 3
   }, {
    name: "UPGRADE",
    id: 4
   }, {
    name: "MIGRATION",
    id: 5
   }, {
    name: "UNINSTALL",
    id: 6
   }, {
    name: "CHANGE",
    id: 7
   }, {
    name: "CHECKFORUPDATES",
    id: 8
   }, {
    name: "COMPLETEOPERATION",
    id: 9
   }, {
    name: "OTHER",
    id: 10
   } ]
  }, {
   name: "LicenseEdition",
   syntax: "proto2",
   values: [ {
    name: "AV_FREE",
    id: 1
   }, {
    name: "AV_PRO",
    id: 2
   }, {
    name: "AV_AIS",
    id: 3
   }, {
    name: "AV_APR",
    id: 4
   }, {
    name: "AV_BUSINESS",
    id: 5
   }, {
    name: "AV_VPN",
    id: 6
   }, {
    name: "GF_SRV",
    id: 7
   }, {
    name: "AV_PSW",
    id: 8
   }, {
    name: "AV_PAP",
    id: 9
   }, {
    name: "AV_PSM",
    id: 10
   }, {
    name: "AV_ASH",
    id: 12
   }, {
    name: "AV_SOHO",
    id: 13
   }, {
    name: "AV_AVG_PRO",
    id: 14
   }, {
    name: "AV_AVG_FREE",
    id: 15
   }, {
    name: "AV_AVG_BUSINESS",
    id: 16
   }, {
    name: "PCT_AVG_PRO",
    id: 17
   }, {
    name: "AVG_VPN",
    id: 18
   }, {
    name: "HMA_VPN_CONSUMER",
    id: 19
   }, {
    name: "HMA_VPN_TRIAL",
    id: 20
   }, {
    name: "HMA_VPN_BUSINESS",
    id: 21
   }, {
    name: "GF_V2",
    id: 22
   }, {
    name: "BS_AVAST",
    id: 23
   }, {
    name: "BS_AVG",
    id: 24
   }, {
    name: "DU_AVAST",
    id: 25
   }, {
    name: "DU_AVG",
    id: 26
   } ]
  }, {
   name: "ModeType",
   syntax: "proto2",
   values: [ {
    name: "NO_LICENSE",
    id: 1
   }, {
    name: "FREE",
    id: 2
   }, {
    name: "TRIAL",
    id: 3
   }, {
    name: "PAID",
    id: 4
   }, {
    name: "OEM",
    id: 5
   }, {
    name: "PRE_AUTH_TRIAL",
    id: 6
   }, {
    name: "BETA",
    id: 7
   }, {
    name: "FREEMIUM",
    id: 8
   }, {
    name: "TRIAL_HARDCODED",
    id: 9
   } ]
  }, {
   name: "StateType",
   syntax: "proto2",
   values: [ {
    name: "ACTIVE",
    id: 1
   }, {
    name: "EXPIRED",
    id: 2
   } ]
  }, {
   name: "OperatingSystem",
   syntax: "proto2",
   values: [ {
    name: "WINDOWS",
    id: 1
   }, {
    name: "OSX",
    id: 2
   }, {
    name: "IOS",
    id: 3
   }, {
    name: "LINUX",
    id: 4
   }, {
    name: "ANDROID",
    id: 5
   }, {
    name: "CHROMEOS",
    id: 6
   } ]
  }, {
   name: "Architecture",
   syntax: "proto2",
   values: [ {
    name: "X86",
    id: 1
   }, {
    name: "X64",
    id: 2
   }, {
    name: "ARM",
    id: 3
   }, {
    name: "ARM64",
    id: 4
   }, {
    name: "MIPS",
    id: 5
   } ]
  }, {
   name: "WinAVGSMainStatus",
   syntax: "proto2",
   values: [ {
    name: "NULL",
    id: 0
   }, {
    name: "GREEN",
    id: 1
   }, {
    name: "YELLOW",
    id: 2
   }, {
    name: "RED",
    id: 3
   } ]
  } ],
  isNamespace: !0
 }).build(), install_envelope = protobufLight.newBuilder({}).import({
  package: null,
  syntax: "proto2",
  options: {
   java_outer_classname: "InstallEnvelopeProto"
  },
  messages: [ {
   name: "EnvelopeCommon",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "send_time",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "no_geo",
    id: 2
   } ]
  }, {
   name: "Event",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "subtype",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 3
   }, {
    rule: "optional",
    type: "int64",
    name: "reception_time",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "request_id",
    id: 5
   } ]
  }, {
   name: "Geo",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bytes",
    name: "ip",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "country",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "region",
    id: 3
   }, {
    rule: "optional",
    type: "string",
    name: "city",
    id: 4
   }, {
    rule: "optional",
    type: "double",
    name: "latitude",
    id: 5
   }, {
    rule: "optional",
    type: "double",
    name: "longitude",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "isp",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "asn",
    id: 8
   } ]
  }, {
   name: "Identity",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "guid",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "hwid",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "uuid",
    id: 3
   } ]
  }, {
   name: "Installation",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "aiid",
    id: 1
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 2
   }, {
    rule: "optional",
    type: "SetupAction",
    name: "action",
    id: 3
   } ]
  }, {
   name: "License",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "wallet_key",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "container_id",
    id: 2
   }, {
    rule: "optional",
    type: "LicenseEdition",
    name: "edition",
    id: 3
   }, {
    rule: "optional",
    type: "ModeType",
    name: "type",
    id: 4
   }, {
    rule: "optional",
    type: "bool",
    name: "subscription_mode",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "schema_id",
    id: 6
   }, {
    rule: "optional",
    type: "int64",
    name: "issued",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "activation",
    id: 8
   }, {
    rule: "optional",
    type: "int64",
    name: "valid_thru",
    id: 9
   }, {
    rule: "optional",
    type: "int32",
    name: "count",
    id: 10
   }, {
    rule: "optional",
    type: "int32",
    name: "count_device",
    id: 11
   } ]
  }, {
   name: "Platform",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "OperatingSystem",
    name: "os",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "build",
    id: 3
   }, {
    rule: "optional",
    type: "int32",
    name: "ubr",
    id: 4
   }, {
    rule: "optional",
    type: "Architecture",
    name: "architecture",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "score",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 7
   }, {
    rule: "optional",
    type: "sint32",
    name: "time_zone",
    id: 8
   } ]
  }, {
   name: "Product",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "edition",
    id: 2
   }, {
    rule: "optional",
    type: "ModeType",
    name: "mode",
    id: 3
   }, {
    rule: "optional",
    type: "StateType",
    name: "state",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "version_app",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "version_gui",
    id: 7
   }, {
    rule: "optional",
    type: "int32",
    name: "build",
    id: 8
   }, {
    rule: "optional",
    type: "string",
    name: "partner_id",
    id: 9
   } ]
  }, {
   name: "Shepherd",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "name",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "version",
    id: 3
   } ]
  }, {
   name: "Browser",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "BrowserType",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 3
   } ]
  }, {
   name: "Campaign",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "string",
    name: "test",
    id: 1
   } ]
  }, {
   name: "Settings",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "SettingsConsent",
    name: "consent",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "eula",
    id: 2
   }, {
    rule: "optional",
    type: "int32",
    name: "eula_version",
    id: 3
   } ]
  }, {
   name: "SettingsConsent",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bool",
    name: "product_marketing",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "product_development",
    id: 2
   }, {
    rule: "optional",
    type: "bool",
    name: "third_party_apps",
    id: 3
   }, {
    rule: "optional",
    type: "bool",
    name: "third_party_analytics",
    id: 4
   } ]
  }, {
   name: "Install",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "SetupAction",
    name: "operation",
    id: 1
   }, {
    rule: "optional",
    type: "InstallError",
    name: "error",
    id: 2
   } ]
  }, {
   name: "InstallError",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "code",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "msg",
    id: 2
   } ]
  }, {
   name: "InstallEnvelope",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "InstallRecord",
    name: "record",
    id: 1
   }, {
    rule: "optional",
    type: "EnvelopeCommon",
    name: "common",
    id: 2
   } ]
  }, {
   name: "InstallRecord",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "Event",
    name: "event",
    id: 1
   }, {
    rule: "optional",
    type: "Identity",
    name: "identity",
    id: 2
   }, {
    rule: "optional",
    type: "Product",
    name: "product",
    id: 3
   }, {
    rule: "optional",
    type: "Platform",
    name: "platform",
    id: 4
   }, {
    rule: "optional",
    type: "Geo",
    name: "geo",
    id: 5
   }, {
    rule: "optional",
    type: "Installation",
    name: "installation",
    id: 6
   }, {
    rule: "optional",
    type: "License",
    name: "license",
    id: 7
   }, {
    rule: "optional",
    type: "Shepherd",
    name: "shepherd",
    id: 8
   }, {
    rule: "optional",
    type: "Browser",
    name: "browser",
    id: 9
   }, {
    rule: "optional",
    type: "Campaign",
    name: "campaign",
    id: 10
   }, {
    rule: "optional",
    type: "Settings",
    name: "settings",
    id: 11
   }, {
    rule: "optional",
    type: "Install",
    name: "install",
    id: 1e3
   } ]
  } ],
  enums: [ {
   name: "SetupAction",
   syntax: "proto2",
   values: [ {
    name: "INSTALL",
    id: 1
   }, {
    name: "REINSTALL",
    id: 2
   }, {
    name: "REPAIR",
    id: 3
   }, {
    name: "UPGRADE",
    id: 4
   }, {
    name: "MIGRATION",
    id: 5
   }, {
    name: "UNINSTALL",
    id: 6
   }, {
    name: "CHANGE",
    id: 7
   }, {
    name: "CHECKFORUPDATES",
    id: 8
   }, {
    name: "COMPLETEOPERATION",
    id: 9
   }, {
    name: "OTHER",
    id: 10
   } ]
  }, {
   name: "LicenseEdition",
   syntax: "proto2",
   values: [ {
    name: "AV_FREE",
    id: 1
   }, {
    name: "AV_PRO",
    id: 2
   }, {
    name: "AV_AIS",
    id: 3
   }, {
    name: "AV_APR",
    id: 4
   }, {
    name: "AV_BUSINESS",
    id: 5
   }, {
    name: "AV_VPN",
    id: 6
   }, {
    name: "GF_SRV",
    id: 7
   }, {
    name: "AV_PSW",
    id: 8
   }, {
    name: "AV_PAP",
    id: 9
   }, {
    name: "AV_PSM",
    id: 10
   }, {
    name: "AV_ASH",
    id: 12
   }, {
    name: "AV_SOHO",
    id: 13
   }, {
    name: "AV_AVG_PRO",
    id: 14
   }, {
    name: "AV_AVG_FREE",
    id: 15
   }, {
    name: "AV_AVG_BUSINESS",
    id: 16
   }, {
    name: "PCT_AVG_PRO",
    id: 17
   }, {
    name: "AVG_VPN",
    id: 18
   }, {
    name: "HMA_VPN_CONSUMER",
    id: 19
   }, {
    name: "HMA_VPN_TRIAL",
    id: 20
   }, {
    name: "HMA_VPN_BUSINESS",
    id: 21
   }, {
    name: "GF_V2",
    id: 22
   }, {
    name: "BS_AVAST",
    id: 23
   }, {
    name: "BS_AVG",
    id: 24
   }, {
    name: "DU_AVAST",
    id: 25
   }, {
    name: "DU_AVG",
    id: 26
   } ]
  }, {
   name: "ModeType",
   syntax: "proto2",
   values: [ {
    name: "NO_LICENSE",
    id: 1
   }, {
    name: "FREE",
    id: 2
   }, {
    name: "TRIAL",
    id: 3
   }, {
    name: "PAID",
    id: 4
   }, {
    name: "OEM",
    id: 5
   }, {
    name: "PRE_AUTH_TRIAL",
    id: 6
   }, {
    name: "BETA",
    id: 7
   }, {
    name: "FREEMIUM",
    id: 8
   }, {
    name: "TRIAL_HARDCODED",
    id: 9
   } ]
  }, {
   name: "StateType",
   syntax: "proto2",
   values: [ {
    name: "ACTIVE",
    id: 1
   }, {
    name: "EXPIRED",
    id: 2
   } ]
  }, {
   name: "OperatingSystem",
   syntax: "proto2",
   values: [ {
    name: "WINDOWS",
    id: 1
   }, {
    name: "OSX",
    id: 2
   }, {
    name: "IOS",
    id: 3
   }, {
    name: "LINUX",
    id: 4
   }, {
    name: "ANDROID",
    id: 5
   }, {
    name: "CHROMEOS",
    id: 6
   } ]
  }, {
   name: "Architecture",
   syntax: "proto2",
   values: [ {
    name: "X86",
    id: 1
   }, {
    name: "X64",
    id: 2
   }, {
    name: "ARM",
    id: 3
   }, {
    name: "ARM64",
    id: 4
   }, {
    name: "MIPS",
    id: 5
   } ]
  }, {
   name: "BrowserType",
   syntax: "proto2",
   values: [ {
    name: "OTHER_BROWSER",
    id: 1
   }, {
    name: "AVAST_SECURE_BROWSER",
    id: 2
   }, {
    name: "CHROME",
    id: 3
   }, {
    name: "FIREFOX",
    id: 4
   }, {
    name: "SAFARI",
    id: 5
   }, {
    name: "MICROSOFTEDGE",
    id: 6
   }, {
    name: "OPERA",
    id: 7
   }, {
    name: "IE",
    id: 8
   }, {
    name: "PALE_MOON",
    id: 9
   }, {
    name: "NETSCAPE",
    id: 10
   }, {
    name: "UC",
    id: 11
   }, {
    name: "YAB",
    id: 12
   }, {
    name: "COC_COC",
    id: 13
   }, {
    name: "CHROMIUM",
    id: 14
   }, {
    name: "VIVALDI",
    id: 15
   } ]
  } ],
  isNamespace: !0
 }).build(), uninstall_envelope = protobufLight.newBuilder({}).import({
  package: null,
  syntax: "proto2",
  options: {
   java_outer_classname: "UninstallEnvelopeProto"
  },
  messages: [ {
   name: "EnvelopeCommon",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "send_time",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "no_geo",
    id: 2
   } ]
  }, {
   name: "Event",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "subtype",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 3
   }, {
    rule: "optional",
    type: "int64",
    name: "reception_time",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "request_id",
    id: 5
   } ]
  }, {
   name: "Geo",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bytes",
    name: "ip",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "country",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "region",
    id: 3
   }, {
    rule: "optional",
    type: "string",
    name: "city",
    id: 4
   }, {
    rule: "optional",
    type: "double",
    name: "latitude",
    id: 5
   }, {
    rule: "optional",
    type: "double",
    name: "longitude",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "isp",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "asn",
    id: 8
   } ]
  }, {
   name: "Identity",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "guid",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "hwid",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "uuid",
    id: 3
   } ]
  }, {
   name: "Installation",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "aiid",
    id: 1
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 2
   }, {
    rule: "optional",
    type: "SetupAction",
    name: "action",
    id: 3
   } ]
  }, {
   name: "License",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "wallet_key",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "container_id",
    id: 2
   }, {
    rule: "optional",
    type: "LicenseEdition",
    name: "edition",
    id: 3
   }, {
    rule: "optional",
    type: "ModeType",
    name: "type",
    id: 4
   }, {
    rule: "optional",
    type: "bool",
    name: "subscription_mode",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "schema_id",
    id: 6
   }, {
    rule: "optional",
    type: "int64",
    name: "issued",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "activation",
    id: 8
   }, {
    rule: "optional",
    type: "int64",
    name: "valid_thru",
    id: 9
   }, {
    rule: "optional",
    type: "int32",
    name: "count",
    id: 10
   }, {
    rule: "optional",
    type: "int32",
    name: "count_device",
    id: 11
   } ]
  }, {
   name: "Platform",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "OperatingSystem",
    name: "os",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "build",
    id: 3
   }, {
    rule: "optional",
    type: "int32",
    name: "ubr",
    id: 4
   }, {
    rule: "optional",
    type: "Architecture",
    name: "architecture",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "score",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 7
   }, {
    rule: "optional",
    type: "sint32",
    name: "time_zone",
    id: 8
   } ]
  }, {
   name: "Product",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "edition",
    id: 2
   }, {
    rule: "optional",
    type: "ModeType",
    name: "mode",
    id: 3
   }, {
    rule: "optional",
    type: "StateType",
    name: "state",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "version_app",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "version_gui",
    id: 7
   }, {
    rule: "optional",
    type: "int32",
    name: "build",
    id: 8
   }, {
    rule: "optional",
    type: "string",
    name: "partner_id",
    id: 9
   } ]
  }, {
   name: "Shepherd",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "name",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "version",
    id: 3
   } ]
  }, {
   name: "Browser",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "BrowserType",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 3
   } ]
  }, {
   name: "Campaign",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "string",
    name: "test",
    id: 1
   } ]
  }, {
   name: "Settings",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "SettingsConsent",
    name: "consent",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "eula",
    id: 2
   }, {
    rule: "optional",
    type: "int32",
    name: "eula_version",
    id: 3
   } ]
  }, {
   name: "SettingsConsent",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bool",
    name: "product_marketing",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "product_development",
    id: 2
   }, {
    rule: "optional",
    type: "bool",
    name: "third_party_apps",
    id: 3
   }, {
    rule: "optional",
    type: "bool",
    name: "third_party_analytics",
    id: 4
   } ]
  }, {
   name: "Uninstall",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "UninstallOperation",
    name: "operation",
    id: 1
   }, {
    rule: "optional",
    type: "UninstallError",
    name: "error",
    id: 2
   } ]
  }, {
   name: "UninstallError",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "code",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "msg",
    id: 2
   } ]
  }, {
   name: "UninstallEnvelope",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "UninstallRecord",
    name: "record",
    id: 1
   }, {
    rule: "optional",
    type: "EnvelopeCommon",
    name: "common",
    id: 2
   } ]
  }, {
   name: "UninstallRecord",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "Event",
    name: "event",
    id: 1
   }, {
    rule: "optional",
    type: "Identity",
    name: "identity",
    id: 2
   }, {
    rule: "optional",
    type: "Product",
    name: "product",
    id: 3
   }, {
    rule: "optional",
    type: "Platform",
    name: "platform",
    id: 4
   }, {
    rule: "optional",
    type: "Geo",
    name: "geo",
    id: 5
   }, {
    rule: "optional",
    type: "Installation",
    name: "installation",
    id: 6
   }, {
    rule: "optional",
    type: "License",
    name: "license",
    id: 7
   }, {
    rule: "optional",
    type: "Shepherd",
    name: "shepherd",
    id: 8
   }, {
    rule: "optional",
    type: "Browser",
    name: "browser",
    id: 9
   }, {
    rule: "optional",
    type: "Campaign",
    name: "campaign",
    id: 11
   }, {
    rule: "optional",
    type: "Settings",
    name: "settings",
    id: 12
   }, {
    rule: "optional",
    type: "Uninstall",
    name: "uninstall",
    id: 1e3
   } ]
  } ],
  enums: [ {
   name: "SetupAction",
   syntax: "proto2",
   values: [ {
    name: "INSTALL",
    id: 1
   }, {
    name: "REINSTALL",
    id: 2
   }, {
    name: "REPAIR",
    id: 3
   }, {
    name: "UPGRADE",
    id: 4
   }, {
    name: "MIGRATION",
    id: 5
   }, {
    name: "UNINSTALL",
    id: 6
   }, {
    name: "CHANGE",
    id: 7
   }, {
    name: "CHECKFORUPDATES",
    id: 8
   }, {
    name: "COMPLETEOPERATION",
    id: 9
   }, {
    name: "OTHER",
    id: 10
   } ]
  }, {
   name: "LicenseEdition",
   syntax: "proto2",
   values: [ {
    name: "AV_FREE",
    id: 1
   }, {
    name: "AV_PRO",
    id: 2
   }, {
    name: "AV_AIS",
    id: 3
   }, {
    name: "AV_APR",
    id: 4
   }, {
    name: "AV_BUSINESS",
    id: 5
   }, {
    name: "AV_VPN",
    id: 6
   }, {
    name: "GF_SRV",
    id: 7
   }, {
    name: "AV_PSW",
    id: 8
   }, {
    name: "AV_PAP",
    id: 9
   }, {
    name: "AV_PSM",
    id: 10
   }, {
    name: "AV_ASH",
    id: 12
   }, {
    name: "AV_SOHO",
    id: 13
   }, {
    name: "AV_AVG_PRO",
    id: 14
   }, {
    name: "AV_AVG_FREE",
    id: 15
   }, {
    name: "AV_AVG_BUSINESS",
    id: 16
   }, {
    name: "PCT_AVG_PRO",
    id: 17
   }, {
    name: "AVG_VPN",
    id: 18
   }, {
    name: "HMA_VPN_CONSUMER",
    id: 19
   }, {
    name: "HMA_VPN_TRIAL",
    id: 20
   }, {
    name: "HMA_VPN_BUSINESS",
    id: 21
   }, {
    name: "GF_V2",
    id: 22
   }, {
    name: "BS_AVAST",
    id: 23
   }, {
    name: "BS_AVG",
    id: 24
   }, {
    name: "DU_AVAST",
    id: 25
   }, {
    name: "DU_AVG",
    id: 26
   } ]
  }, {
   name: "ModeType",
   syntax: "proto2",
   values: [ {
    name: "NO_LICENSE",
    id: 1
   }, {
    name: "FREE",
    id: 2
   }, {
    name: "TRIAL",
    id: 3
   }, {
    name: "PAID",
    id: 4
   }, {
    name: "OEM",
    id: 5
   }, {
    name: "PRE_AUTH_TRIAL",
    id: 6
   }, {
    name: "BETA",
    id: 7
   }, {
    name: "FREEMIUM",
    id: 8
   }, {
    name: "TRIAL_HARDCODED",
    id: 9
   } ]
  }, {
   name: "StateType",
   syntax: "proto2",
   values: [ {
    name: "ACTIVE",
    id: 1
   }, {
    name: "EXPIRED",
    id: 2
   } ]
  }, {
   name: "OperatingSystem",
   syntax: "proto2",
   values: [ {
    name: "WINDOWS",
    id: 1
   }, {
    name: "OSX",
    id: 2
   }, {
    name: "IOS",
    id: 3
   }, {
    name: "LINUX",
    id: 4
   }, {
    name: "ANDROID",
    id: 5
   }, {
    name: "CHROMEOS",
    id: 6
   } ]
  }, {
   name: "Architecture",
   syntax: "proto2",
   values: [ {
    name: "X86",
    id: 1
   }, {
    name: "X64",
    id: 2
   }, {
    name: "ARM",
    id: 3
   }, {
    name: "ARM64",
    id: 4
   }, {
    name: "MIPS",
    id: 5
   } ]
  }, {
   name: "BrowserType",
   syntax: "proto2",
   values: [ {
    name: "OTHER_BROWSER",
    id: 1
   }, {
    name: "AVAST_SECURE_BROWSER",
    id: 2
   }, {
    name: "CHROME",
    id: 3
   }, {
    name: "FIREFOX",
    id: 4
   }, {
    name: "SAFARI",
    id: 5
   }, {
    name: "MICROSOFTEDGE",
    id: 6
   }, {
    name: "OPERA",
    id: 7
   }, {
    name: "IE",
    id: 8
   }, {
    name: "PALE_MOON",
    id: 9
   }, {
    name: "NETSCAPE",
    id: 10
   }, {
    name: "UC",
    id: 11
   }, {
    name: "YAB",
    id: 12
   }, {
    name: "COC_COC",
    id: 13
   }, {
    name: "CHROMIUM",
    id: 14
   }, {
    name: "VIVALDI",
    id: 15
   } ]
  }, {
   name: "UninstallOperation",
   syntax: "proto2",
   values: [ {
    name: "USERSTARTED",
    id: 1
   }, {
    name: "UNINSTALLED",
    id: 2
   } ]
  } ],
  isNamespace: !0
 }).build(), update_envelope = protobufLight.newBuilder({}).import({
  package: null,
  syntax: "proto2",
  options: {
   java_outer_classname: "UpdateEnvelopeProto"
  },
  messages: [ {
   name: "EnvelopeCommon",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "send_time",
    id: 1
   }, {
    rule: "optional",
    type: "bool",
    name: "no_geo",
    id: 2
   } ]
  }, {
   name: "Event",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "subtype",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 3
   }, {
    rule: "optional",
    type: "int64",
    name: "reception_time",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "request_id",
    id: 5
   } ]
  }, {
   name: "Geo",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "bytes",
    name: "ip",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "country",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "region",
    id: 3
   }, {
    rule: "optional",
    type: "string",
    name: "city",
    id: 4
   }, {
    rule: "optional",
    type: "double",
    name: "latitude",
    id: 5
   }, {
    rule: "optional",
    type: "double",
    name: "longitude",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "isp",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "asn",
    id: 8
   } ]
  }, {
   name: "Identity",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "guid",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "hwid",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "uuid",
    id: 3
   } ]
  }, {
   name: "Installation",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "aiid",
    id: 1
   }, {
    rule: "optional",
    type: "int64",
    name: "time",
    id: 2
   }, {
    rule: "optional",
    type: "SetupAction",
    name: "action",
    id: 3
   } ]
  }, {
   name: "License",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "wallet_key",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "container_id",
    id: 2
   }, {
    rule: "optional",
    type: "LicenseEdition",
    name: "edition",
    id: 3
   }, {
    rule: "optional",
    type: "ModeType",
    name: "type",
    id: 4
   }, {
    rule: "optional",
    type: "bool",
    name: "subscription_mode",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "schema_id",
    id: 6
   }, {
    rule: "optional",
    type: "int64",
    name: "issued",
    id: 7
   }, {
    rule: "optional",
    type: "int64",
    name: "activation",
    id: 8
   }, {
    rule: "optional",
    type: "int64",
    name: "valid_thru",
    id: 9
   }, {
    rule: "optional",
    type: "int32",
    name: "count",
    id: 10
   }, {
    rule: "optional",
    type: "int32",
    name: "count_device",
    id: 11
   } ]
  }, {
   name: "Platform",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "OperatingSystem",
    name: "os",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "build",
    id: 3
   }, {
    rule: "optional",
    type: "int32",
    name: "ubr",
    id: 4
   }, {
    rule: "optional",
    type: "Architecture",
    name: "architecture",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "score",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 7
   }, {
    rule: "optional",
    type: "sint32",
    name: "time_zone",
    id: 8
   } ]
  }, {
   name: "Product",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int32",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "int32",
    name: "edition",
    id: 2
   }, {
    rule: "optional",
    type: "ModeType",
    name: "mode",
    id: 3
   }, {
    rule: "optional",
    type: "StateType",
    name: "state",
    id: 4
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 5
   }, {
    rule: "optional",
    type: "string",
    name: "version_app",
    id: 6
   }, {
    rule: "optional",
    type: "string",
    name: "version_gui",
    id: 7
   }, {
    rule: "optional",
    type: "int32",
    name: "build",
    id: 8
   }, {
    rule: "optional",
    type: "string",
    name: "partner_id",
    id: 9
   } ]
  }, {
   name: "Shepherd",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "id",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "name",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "version",
    id: 3
   } ]
  }, {
   name: "Browser",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "BrowserType",
    name: "type",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "lang",
    id: 3
   } ]
  }, {
   name: "Update",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "UpdateAction",
    name: "action",
    id: 1
   }, {
    rule: "optional",
    type: "UpdateComponent",
    name: "component",
    id: 2
   }, {
    rule: "optional",
    type: "UpdateType",
    name: "type",
    id: 3
   }, {
    rule: "optional",
    type: "UpdateTime",
    name: "time",
    id: 4
   }, {
    rule: "optional",
    type: "UpdateTargetVersion",
    name: "version",
    id: 5
   }, {
    rule: "optional",
    type: "UpdateProductSetting",
    name: "setting",
    id: 6
   }, {
    rule: "optional",
    type: "UpdateError",
    name: "error",
    id: 7
   } ]
  }, {
   name: "UpdateTime",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "int64",
    name: "previous",
    id: 1
   }, {
    rule: "optional",
    type: "int64",
    name: "starts",
    id: 2
   }, {
    rule: "optional",
    type: "int64",
    name: "ends",
    id: 3
   } ]
  }, {
   name: "UpdateProductSetting",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "program",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "source",
    id: 2
   }, {
    rule: "optional",
    type: "string",
    name: "svc_state",
    id: 3
   } ]
  }, {
   name: "UpdateTargetVersion",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "version_app",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "version_gui",
    id: 2
   }, {
    rule: "optional",
    type: "int32",
    name: "build",
    id: 3
   }, {
    rule: "optional",
    type: "string",
    name: "version_setup",
    id: 4
   }, {
    rule: "optional",
    type: "int32",
    name: "microupdate_id",
    id: 5
   } ]
  }, {
   name: "UpdateError",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "string",
    name: "code",
    id: 1
   }, {
    rule: "optional",
    type: "string",
    name: "msg",
    id: 2
   } ]
  }, {
   name: "UpdateEnvelope",
   syntax: "proto2",
   fields: [ {
    rule: "repeated",
    type: "UpdateRecord",
    name: "record",
    id: 1
   }, {
    rule: "optional",
    type: "EnvelopeCommon",
    name: "common",
    id: 2
   } ]
  }, {
   name: "UpdateRecord",
   syntax: "proto2",
   fields: [ {
    rule: "optional",
    type: "Event",
    name: "event",
    id: 1
   }, {
    rule: "optional",
    type: "Identity",
    name: "identity",
    id: 2
   }, {
    rule: "optional",
    type: "Product",
    name: "product",
    id: 3
   }, {
    rule: "optional",
    type: "Platform",
    name: "platform",
    id: 4
   }, {
    rule: "optional",
    type: "Geo",
    name: "geo",
    id: 5
   }, {
    rule: "optional",
    type: "Installation",
    name: "installation",
    id: 6
   }, {
    rule: "optional",
    type: "License",
    name: "license",
    id: 7
   }, {
    rule: "optional",
    type: "Shepherd",
    name: "shepherd",
    id: 8
   }, {
    rule: "optional",
    type: "Browser",
    name: "browser",
    id: 9
   }, {
    rule: "optional",
    type: "Update",
    name: "updates",
    id: 1e3
   } ]
  } ],
  enums: [ {
   name: "SetupAction",
   syntax: "proto2",
   values: [ {
    name: "INSTALL",
    id: 1
   }, {
    name: "REINSTALL",
    id: 2
   }, {
    name: "REPAIR",
    id: 3
   }, {
    name: "UPGRADE",
    id: 4
   }, {
    name: "MIGRATION",
    id: 5
   }, {
    name: "UNINSTALL",
    id: 6
   }, {
    name: "CHANGE",
    id: 7
   }, {
    name: "CHECKFORUPDATES",
    id: 8
   }, {
    name: "COMPLETEOPERATION",
    id: 9
   }, {
    name: "OTHER",
    id: 10
   } ]
  }, {
   name: "LicenseEdition",
   syntax: "proto2",
   values: [ {
    name: "AV_FREE",
    id: 1
   }, {
    name: "AV_PRO",
    id: 2
   }, {
    name: "AV_AIS",
    id: 3
   }, {
    name: "AV_APR",
    id: 4
   }, {
    name: "AV_BUSINESS",
    id: 5
   }, {
    name: "AV_VPN",
    id: 6
   }, {
    name: "GF_SRV",
    id: 7
   }, {
    name: "AV_PSW",
    id: 8
   }, {
    name: "AV_PAP",
    id: 9
   }, {
    name: "AV_PSM",
    id: 10
   }, {
    name: "AV_ASH",
    id: 12
   }, {
    name: "AV_SOHO",
    id: 13
   }, {
    name: "AV_AVG_PRO",
    id: 14
   }, {
    name: "AV_AVG_FREE",
    id: 15
   }, {
    name: "AV_AVG_BUSINESS",
    id: 16
   }, {
    name: "PCT_AVG_PRO",
    id: 17
   }, {
    name: "AVG_VPN",
    id: 18
   }, {
    name: "HMA_VPN_CONSUMER",
    id: 19
   }, {
    name: "HMA_VPN_TRIAL",
    id: 20
   }, {
    name: "HMA_VPN_BUSINESS",
    id: 21
   }, {
    name: "GF_V2",
    id: 22
   }, {
    name: "BS_AVAST",
    id: 23
   }, {
    name: "BS_AVG",
    id: 24
   }, {
    name: "DU_AVAST",
    id: 25
   }, {
    name: "DU_AVG",
    id: 26
   } ]
  }, {
   name: "ModeType",
   syntax: "proto2",
   values: [ {
    name: "NO_LICENSE",
    id: 1
   }, {
    name: "FREE",
    id: 2
   }, {
    name: "TRIAL",
    id: 3
   }, {
    name: "PAID",
    id: 4
   }, {
    name: "OEM",
    id: 5
   }, {
    name: "PRE_AUTH_TRIAL",
    id: 6
   }, {
    name: "BETA",
    id: 7
   }, {
    name: "FREEMIUM",
    id: 8
   }, {
    name: "TRIAL_HARDCODED",
    id: 9
   } ]
  }, {
   name: "StateType",
   syntax: "proto2",
   values: [ {
    name: "ACTIVE",
    id: 1
   }, {
    name: "EXPIRED",
    id: 2
   } ]
  }, {
   name: "OperatingSystem",
   syntax: "proto2",
   values: [ {
    name: "WINDOWS",
    id: 1
   }, {
    name: "OSX",
    id: 2
   }, {
    name: "IOS",
    id: 3
   }, {
    name: "LINUX",
    id: 4
   }, {
    name: "ANDROID",
    id: 5
   }, {
    name: "CHROMEOS",
    id: 6
   } ]
  }, {
   name: "Architecture",
   syntax: "proto2",
   values: [ {
    name: "X86",
    id: 1
   }, {
    name: "X64",
    id: 2
   }, {
    name: "ARM",
    id: 3
   }, {
    name: "ARM64",
    id: 4
   }, {
    name: "MIPS",
    id: 5
   } ]
  }, {
   name: "BrowserType",
   syntax: "proto2",
   values: [ {
    name: "OTHER_BROWSER",
    id: 1
   }, {
    name: "AVAST_SECURE_BROWSER",
    id: 2
   }, {
    name: "CHROME",
    id: 3
   }, {
    name: "FIREFOX",
    id: 4
   }, {
    name: "SAFARI",
    id: 5
   }, {
    name: "MICROSOFTEDGE",
    id: 6
   }, {
    name: "OPERA",
    id: 7
   }, {
    name: "IE",
    id: 8
   }, {
    name: "PALE_MOON",
    id: 9
   }, {
    name: "NETSCAPE",
    id: 10
   }, {
    name: "UC",
    id: 11
   }, {
    name: "YAB",
    id: 12
   }, {
    name: "COC_COC",
    id: 13
   }, {
    name: "CHROMIUM",
    id: 14
   }, {
    name: "VIVALDI",
    id: 15
   } ]
  }, {
   name: "UpdateAction",
   syntax: "proto2",
   values: [ {
    name: "DOWNLOADING_SUCCESS",
    id: 1
   }, {
    name: "DOWNLOADING_FAILED",
    id: 2
   }, {
    name: "UPDATING_SUCCESS",
    id: 3
   }, {
    name: "UPDATING_FAILED",
    id: 4
   } ]
  }, {
   name: "UpdateComponent",
   syntax: "proto2",
   values: [ {
    name: "PROGRAM",
    id: 1
   }, {
    name: "SETUP",
    id: 2
   }, {
    name: "VPS",
    id: 3
   } ]
  }, {
   name: "UpdateType",
   syntax: "proto2",
   values: [ {
    name: "NORMAL",
    id: 1
   }, {
    name: "MICRO",
    id: 2
   }, {
    name: "EMERGENCY",
    id: 3
   } ]
  } ],
  isNamespace: !0
 }).build();
 const ENVELOPE_TYPES = {
  InstallEnvelope: 1,
  HeartbeatEnvelope: 2,
  UpdateEnvelope: 4,
  ActivityEnvelope: 5,
  PreferencesEnvelope: 6,
  IssueEnvelope: 9,
  AOSWebshieldScanningEnvelope: 41,
  MaliciousURLEnvelope: 46,
  VoteEnvelope: 47,
  CommonActivityEnvelope: 48
 }, TYPE_ENVELOPES = Object.keys(ENVELOPE_TYPES).reduce((function(obj, key) {
  return obj[ENVELOPE_TYPES[key]] = key, obj;
 }), {});
 var pbjs5Adapter = {
  create: function(envelopePrototypes) {
   return function(envelope) {
    const envelopeType = envelope.record[0].event.type, Prototype = envelopePrototypes[TYPE_ENVELOPES[envelopeType]];
    let record = envelope.record.slice().map(o => Object.assign({}, o));
    const recordType = Prototype.$type.getChild("record").resolvedType;
    return record.forEach((function(r) {
     for (let key in r) recordType.getChild(key) || delete r[key];
    })), {
     method: "POST",
     headers: {
      "Content-Type": "application/octet-stream"
     },
     body: new Prototype(Object.assign({}, envelope, {
      record: record
     })).encodeAB()
    };
   };
  }
 }, common$1 = createCommonjsModule((function(module, exports) {
  var TYPED_OK = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
  function _has(obj, key) {
   return Object.prototype.hasOwnProperty.call(obj, key);
  }
  exports.assign = function(obj) {
   for (var sources = Array.prototype.slice.call(arguments, 1); sources.length; ) {
    var source = sources.shift();
    if (source) {
     if ("object" != typeof source) throw new TypeError(source + "must be non-object");
     for (var p in source) _has(source, p) && (obj[p] = source[p]);
    }
   }
   return obj;
  }, exports.shrinkBuf = function(buf, size) {
   return buf.length === size ? buf : buf.subarray ? buf.subarray(0, size) : (buf.length = size, 
   buf);
  };
  var fnTyped = {
   arraySet: function(dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) dest.set(src.subarray(src_offs, src_offs + len), dest_offs); else for (var i = 0; i < len; i++) dest[dest_offs + i] = src[src_offs + i];
   },
   flattenChunks: function(chunks) {
    var i, l, len, pos, chunk, result;
    for (len = 0, i = 0, l = chunks.length; i < l; i++) len += chunks[i].length;
    for (result = new Uint8Array(len), pos = 0, i = 0, l = chunks.length; i < l; i++) chunk = chunks[i], 
    result.set(chunk, pos), pos += chunk.length;
    return result;
   }
  }, fnUntyped = {
   arraySet: function(dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) dest[dest_offs + i] = src[src_offs + i];
   },
   flattenChunks: function(chunks) {
    return [].concat.apply([], chunks);
   }
  };
  exports.setTyped = function(on) {
   on ? (exports.Buf8 = Uint8Array, exports.Buf16 = Uint16Array, exports.Buf32 = Int32Array, 
   exports.assign(exports, fnTyped)) : (exports.Buf8 = Array, exports.Buf16 = Array, 
   exports.Buf32 = Array, exports.assign(exports, fnUntyped));
  }, exports.setTyped(TYPED_OK);
 }));
 common$1.assign, common$1.shrinkBuf, common$1.setTyped, common$1.Buf8, common$1.Buf16, 
 common$1.Buf32;
 function zero(buf) {
  for (var len = buf.length; --len >= 0; ) buf[len] = 0;
 }
 var extra_lbits = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 ], extra_dbits = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ], extra_blbits = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7 ], bl_order = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ], static_ltree = new Array(576);
 zero(static_ltree);
 var static_dtree = new Array(60);
 zero(static_dtree);
 var _dist_code = new Array(512);
 zero(_dist_code);
 var _length_code = new Array(256);
 zero(_length_code);
 var base_length = new Array(29);
 zero(base_length);
 var static_l_desc, static_d_desc, static_bl_desc, base_dist = new Array(30);
 function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree, this.extra_bits = extra_bits, this.extra_base = extra_base, 
  this.elems = elems, this.max_length = max_length, this.has_stree = static_tree && static_tree.length;
 }
 function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree, this.max_code = 0, this.stat_desc = stat_desc;
 }
 function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
 }
 function put_short(s, w) {
  s.pending_buf[s.pending++] = 255 & w, s.pending_buf[s.pending++] = w >>> 8 & 255;
 }
 function send_bits(s, value, length) {
  s.bi_valid > 16 - length ? (s.bi_buf |= value << s.bi_valid & 65535, put_short(s, s.bi_buf), 
  s.bi_buf = value >> 16 - s.bi_valid, s.bi_valid += length - 16) : (s.bi_buf |= value << s.bi_valid & 65535, 
  s.bi_valid += length);
 }
 function send_code(s, c, tree) {
  send_bits(s, tree[2 * c], tree[2 * c + 1]);
 }
 function bi_reverse(code, len) {
  var res = 0;
  do {
   res |= 1 & code, code >>>= 1, res <<= 1;
  } while (--len > 0);
  return res >>> 1;
 }
 function gen_codes(tree, max_code, bl_count) {
  var bits, n, next_code = new Array(16), code = 0;
  for (bits = 1; bits <= 15; bits++) next_code[bits] = code = code + bl_count[bits - 1] << 1;
  for (n = 0; n <= max_code; n++) {
   var len = tree[2 * n + 1];
   0 !== len && (tree[2 * n] = bi_reverse(next_code[len]++, len));
  }
 }
 function init_block(s) {
  var n;
  for (n = 0; n < 286; n++) s.dyn_ltree[2 * n] = 0;
  for (n = 0; n < 30; n++) s.dyn_dtree[2 * n] = 0;
  for (n = 0; n < 19; n++) s.bl_tree[2 * n] = 0;
  s.dyn_ltree[512] = 1, s.opt_len = s.static_len = 0, s.last_lit = s.matches = 0;
 }
 function bi_windup(s) {
  s.bi_valid > 8 ? put_short(s, s.bi_buf) : s.bi_valid > 0 && (s.pending_buf[s.pending++] = s.bi_buf), 
  s.bi_buf = 0, s.bi_valid = 0;
 }
 function smaller(tree, n, m, depth) {
  var _n2 = 2 * n, _m2 = 2 * m;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
 }
 function pqdownheap(s, tree, k) {
  for (var v = s.heap[k], j = k << 1; j <= s.heap_len && (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth) && j++, 
  !smaller(tree, v, s.heap[j], s.depth)); ) s.heap[k] = s.heap[j], k = j, j <<= 1;
  s.heap[k] = v;
 }
 function compress_block(s, ltree, dtree) {
  var dist, lc, code, extra, lx = 0;
  if (0 !== s.last_lit) do {
   dist = s.pending_buf[s.d_buf + 2 * lx] << 8 | s.pending_buf[s.d_buf + 2 * lx + 1], 
   lc = s.pending_buf[s.l_buf + lx], lx++, 0 === dist ? send_code(s, lc, ltree) : (send_code(s, (code = _length_code[lc]) + 256 + 1, ltree), 
   0 !== (extra = extra_lbits[code]) && send_bits(s, lc -= base_length[code], extra), 
   send_code(s, code = d_code(--dist), dtree), 0 !== (extra = extra_dbits[code]) && send_bits(s, dist -= base_dist[code], extra));
  } while (lx < s.last_lit);
  send_code(s, 256, ltree);
 }
 function build_tree(s, desc) {
  var n, m, node, tree = desc.dyn_tree, stree = desc.stat_desc.static_tree, has_stree = desc.stat_desc.has_stree, elems = desc.stat_desc.elems, max_code = -1;
  for (s.heap_len = 0, s.heap_max = 573, n = 0; n < elems; n++) 0 !== tree[2 * n] ? (s.heap[++s.heap_len] = max_code = n, 
  s.depth[n] = 0) : tree[2 * n + 1] = 0;
  for (;s.heap_len < 2; ) tree[2 * (node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0)] = 1, 
  s.depth[node] = 0, s.opt_len--, has_stree && (s.static_len -= stree[2 * node + 1]);
  for (desc.max_code = max_code, n = s.heap_len >> 1; n >= 1; n--) pqdownheap(s, tree, n);
  node = elems;
  do {
   n = s.heap[1], s.heap[1] = s.heap[s.heap_len--], pqdownheap(s, tree, 1), m = s.heap[1], 
   s.heap[--s.heap_max] = n, s.heap[--s.heap_max] = m, tree[2 * node] = tree[2 * n] + tree[2 * m], 
   s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1, tree[2 * n + 1] = tree[2 * m + 1] = node, 
   s.heap[1] = node++, pqdownheap(s, tree, 1);
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[1], function(s, desc) {
   var h, n, m, bits, xbits, f, tree = desc.dyn_tree, max_code = desc.max_code, stree = desc.stat_desc.static_tree, has_stree = desc.stat_desc.has_stree, extra = desc.stat_desc.extra_bits, base = desc.stat_desc.extra_base, max_length = desc.stat_desc.max_length, overflow = 0;
   for (bits = 0; bits <= 15; bits++) s.bl_count[bits] = 0;
   for (tree[2 * s.heap[s.heap_max] + 1] = 0, h = s.heap_max + 1; h < 573; h++) (bits = tree[2 * tree[2 * (n = s.heap[h]) + 1] + 1] + 1) > max_length && (bits = max_length, 
   overflow++), tree[2 * n + 1] = bits, n > max_code || (s.bl_count[bits]++, xbits = 0, 
   n >= base && (xbits = extra[n - base]), f = tree[2 * n], s.opt_len += f * (bits + xbits), 
   has_stree && (s.static_len += f * (stree[2 * n + 1] + xbits)));
   if (0 !== overflow) {
    do {
     for (bits = max_length - 1; 0 === s.bl_count[bits]; ) bits--;
     s.bl_count[bits]--, s.bl_count[bits + 1] += 2, s.bl_count[max_length]--, overflow -= 2;
    } while (overflow > 0);
    for (bits = max_length; 0 !== bits; bits--) for (n = s.bl_count[bits]; 0 !== n; ) (m = s.heap[--h]) > max_code || (tree[2 * m + 1] !== bits && (s.opt_len += (bits - tree[2 * m + 1]) * tree[2 * m], 
    tree[2 * m + 1] = bits), n--);
   }
  }(s, desc), gen_codes(tree, max_code, s.bl_count);
 }
 function scan_tree(s, tree, max_code) {
  var n, curlen, prevlen = -1, nextlen = tree[1], count = 0, max_count = 7, min_count = 4;
  for (0 === nextlen && (max_count = 138, min_count = 3), tree[2 * (max_code + 1) + 1] = 65535, 
  n = 0; n <= max_code; n++) curlen = nextlen, nextlen = tree[2 * (n + 1) + 1], ++count < max_count && curlen === nextlen || (count < min_count ? s.bl_tree[2 * curlen] += count : 0 !== curlen ? (curlen !== prevlen && s.bl_tree[2 * curlen]++, 
  s.bl_tree[32]++) : count <= 10 ? s.bl_tree[34]++ : s.bl_tree[36]++, count = 0, prevlen = curlen, 
  0 === nextlen ? (max_count = 138, min_count = 3) : curlen === nextlen ? (max_count = 6, 
  min_count = 3) : (max_count = 7, min_count = 4));
 }
 function send_tree(s, tree, max_code) {
  var n, curlen, prevlen = -1, nextlen = tree[1], count = 0, max_count = 7, min_count = 4;
  for (0 === nextlen && (max_count = 138, min_count = 3), n = 0; n <= max_code; n++) if (curlen = nextlen, 
  nextlen = tree[2 * (n + 1) + 1], !(++count < max_count && curlen === nextlen)) {
   if (count < min_count) do {
    send_code(s, curlen, s.bl_tree);
   } while (0 != --count); else 0 !== curlen ? (curlen !== prevlen && (send_code(s, curlen, s.bl_tree), 
   count--), send_code(s, 16, s.bl_tree), send_bits(s, count - 3, 2)) : count <= 10 ? (send_code(s, 17, s.bl_tree), 
   send_bits(s, count - 3, 3)) : (send_code(s, 18, s.bl_tree), send_bits(s, count - 11, 7));
   count = 0, prevlen = curlen, 0 === nextlen ? (max_count = 138, min_count = 3) : curlen === nextlen ? (max_count = 6, 
   min_count = 3) : (max_count = 7, min_count = 4);
  }
 }
 zero(base_dist);
 var static_init_done = !1;
 function _tr_stored_block(s, buf, stored_len, last) {
  send_bits(s, 0 + (last ? 1 : 0), 3), function(s, buf, len, header) {
   bi_windup(s), header && (put_short(s, len), put_short(s, ~len)), common$1.arraySet(s.pending_buf, s.window, buf, len, s.pending), 
   s.pending += len;
  }(s, buf, stored_len, !0);
 }
 var trees = {
  _tr_init: function(s) {
   static_init_done || (!function() {
    var n, bits, length, code, dist, bl_count = new Array(16);
    for (length = 0, code = 0; code < 28; code++) for (base_length[code] = length, n = 0; n < 1 << extra_lbits[code]; n++) _length_code[length++] = code;
    for (_length_code[length - 1] = code, dist = 0, code = 0; code < 16; code++) for (base_dist[code] = dist, 
    n = 0; n < 1 << extra_dbits[code]; n++) _dist_code[dist++] = code;
    for (dist >>= 7; code < 30; code++) for (base_dist[code] = dist << 7, n = 0; n < 1 << extra_dbits[code] - 7; n++) _dist_code[256 + dist++] = code;
    for (bits = 0; bits <= 15; bits++) bl_count[bits] = 0;
    for (n = 0; n <= 143; ) static_ltree[2 * n + 1] = 8, n++, bl_count[8]++;
    for (;n <= 255; ) static_ltree[2 * n + 1] = 9, n++, bl_count[9]++;
    for (;n <= 279; ) static_ltree[2 * n + 1] = 7, n++, bl_count[7]++;
    for (;n <= 287; ) static_ltree[2 * n + 1] = 8, n++, bl_count[8]++;
    for (gen_codes(static_ltree, 287, bl_count), n = 0; n < 30; n++) static_dtree[2 * n + 1] = 5, 
    static_dtree[2 * n] = bi_reverse(n, 5);
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, 257, 286, 15), static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, 30, 15), 
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, 19, 7);
   }(), static_init_done = !0), s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc), 
   s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc), s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc), 
   s.bi_buf = 0, s.bi_valid = 0, init_block(s);
  },
  _tr_stored_block: _tr_stored_block,
  _tr_flush_block: function(s, buf, stored_len, last) {
   var opt_lenb, static_lenb, max_blindex = 0;
   s.level > 0 ? (2 === s.strm.data_type && (s.strm.data_type = function(s) {
    var n, black_mask = 4093624447;
    for (n = 0; n <= 31; n++, black_mask >>>= 1) if (1 & black_mask && 0 !== s.dyn_ltree[2 * n]) return 0;
    if (0 !== s.dyn_ltree[18] || 0 !== s.dyn_ltree[20] || 0 !== s.dyn_ltree[26]) return 1;
    for (n = 32; n < 256; n++) if (0 !== s.dyn_ltree[2 * n]) return 1;
    return 0;
   }(s)), build_tree(s, s.l_desc), build_tree(s, s.d_desc), max_blindex = function(s) {
    var max_blindex;
    for (scan_tree(s, s.dyn_ltree, s.l_desc.max_code), scan_tree(s, s.dyn_dtree, s.d_desc.max_code), 
    build_tree(s, s.bl_desc), max_blindex = 18; max_blindex >= 3 && 0 === s.bl_tree[2 * bl_order[max_blindex] + 1]; max_blindex--) ;
    return s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4, max_blindex;
   }(s), opt_lenb = s.opt_len + 3 + 7 >>> 3, (static_lenb = s.static_len + 3 + 7 >>> 3) <= opt_lenb && (opt_lenb = static_lenb)) : opt_lenb = static_lenb = stored_len + 5, 
   stored_len + 4 <= opt_lenb && -1 !== buf ? _tr_stored_block(s, buf, stored_len, last) : 4 === s.strategy || static_lenb === opt_lenb ? (send_bits(s, 2 + (last ? 1 : 0), 3), 
   compress_block(s, static_ltree, static_dtree)) : (send_bits(s, 4 + (last ? 1 : 0), 3), 
   function(s, lcodes, dcodes, blcodes) {
    var rank;
    for (send_bits(s, lcodes - 257, 5), send_bits(s, dcodes - 1, 5), send_bits(s, blcodes - 4, 4), 
    rank = 0; rank < blcodes; rank++) send_bits(s, s.bl_tree[2 * bl_order[rank] + 1], 3);
    send_tree(s, s.dyn_ltree, lcodes - 1), send_tree(s, s.dyn_dtree, dcodes - 1);
   }(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1), compress_block(s, s.dyn_ltree, s.dyn_dtree)), 
   init_block(s), last && bi_windup(s);
  },
  _tr_tally: function(s, dist, lc) {
   return s.pending_buf[s.d_buf + 2 * s.last_lit] = dist >>> 8 & 255, s.pending_buf[s.d_buf + 2 * s.last_lit + 1] = 255 & dist, 
   s.pending_buf[s.l_buf + s.last_lit] = 255 & lc, s.last_lit++, 0 === dist ? s.dyn_ltree[2 * lc]++ : (s.matches++, 
   dist--, s.dyn_ltree[2 * (_length_code[lc] + 256 + 1)]++, s.dyn_dtree[2 * d_code(dist)]++), 
   s.last_lit === s.lit_bufsize - 1;
  },
  _tr_align: function(s) {
   send_bits(s, 2, 3), send_code(s, 256, static_ltree), function(s) {
    16 === s.bi_valid ? (put_short(s, s.bi_buf), s.bi_buf = 0, s.bi_valid = 0) : s.bi_valid >= 8 && (s.pending_buf[s.pending++] = 255 & s.bi_buf, 
    s.bi_buf >>= 8, s.bi_valid -= 8);
   }(s);
  }
 };
 var adler32_1 = function(adler, buf, len, pos) {
  for (var s1 = 65535 & adler | 0, s2 = adler >>> 16 & 65535 | 0, n = 0; 0 !== len; ) {
   len -= n = len > 2e3 ? 2e3 : len;
   do {
    s2 = s2 + (s1 = s1 + buf[pos++] | 0) | 0;
   } while (--n);
   s1 %= 65521, s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
 };
 var crcTable = function() {
  for (var c, table = [], n = 0; n < 256; n++) {
   c = n;
   for (var k = 0; k < 8; k++) c = 1 & c ? 3988292384 ^ c >>> 1 : c >>> 1;
   table[n] = c;
  }
  return table;
 }();
 var configuration_table, crc32_1 = function(crc, buf, len, pos) {
  var t = crcTable, end = pos + len;
  crc ^= -1;
  for (var i = pos; i < end; i++) crc = crc >>> 8 ^ t[255 & (crc ^ buf[i])];
  return -1 ^ crc;
 }, messages = {
  2: "need dictionary",
  1: "stream end",
  0: "",
  "-1": "file error",
  "-2": "stream error",
  "-3": "data error",
  "-4": "insufficient memory",
  "-5": "buffer error",
  "-6": "incompatible version"
 };
 function err(strm, errorCode) {
  return strm.msg = messages[errorCode], errorCode;
 }
 function rank(f) {
  return (f << 1) - (f > 4 ? 9 : 0);
 }
 function zero$1(buf) {
  for (var len = buf.length; --len >= 0; ) buf[len] = 0;
 }
 function flush_pending(strm) {
  var s = strm.state, len = s.pending;
  len > strm.avail_out && (len = strm.avail_out), 0 !== len && (common$1.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out), 
  strm.next_out += len, s.pending_out += len, strm.total_out += len, strm.avail_out -= len, 
  s.pending -= len, 0 === s.pending && (s.pending_out = 0));
 }
 function flush_block_only(s, last) {
  trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last), 
  s.block_start = s.strstart, flush_pending(s.strm);
 }
 function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
 }
 function putShortMSB(s, b) {
  s.pending_buf[s.pending++] = b >>> 8 & 255, s.pending_buf[s.pending++] = 255 & b;
 }
 function longest_match(s, cur_match) {
  var match, len, chain_length = s.max_chain_length, scan = s.strstart, best_len = s.prev_length, nice_match = s.nice_match, limit = s.strstart > s.w_size - 262 ? s.strstart - (s.w_size - 262) : 0, _win = s.window, wmask = s.w_mask, prev = s.prev, strend = s.strstart + 258, scan_end1 = _win[scan + best_len - 1], scan_end = _win[scan + best_len];
  s.prev_length >= s.good_match && (chain_length >>= 2), nice_match > s.lookahead && (nice_match = s.lookahead);
  do {
   if (_win[(match = cur_match) + best_len] === scan_end && _win[match + best_len - 1] === scan_end1 && _win[match] === _win[scan] && _win[++match] === _win[scan + 1]) {
    scan += 2, match++;
    do {} while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    if (len = 258 - (strend - scan), scan = strend - 258, len > best_len) {
     if (s.match_start = cur_match, best_len = len, len >= nice_match) break;
     scan_end1 = _win[scan + best_len - 1], scan_end = _win[scan + best_len];
    }
   }
  } while ((cur_match = prev[cur_match & wmask]) > limit && 0 != --chain_length);
  return best_len <= s.lookahead ? best_len : s.lookahead;
 }
 function fill_window(s) {
  var p, n, m, more, str, strm, buf, start, size, len, _w_size = s.w_size;
  do {
   if (more = s.window_size - s.lookahead - s.strstart, s.strstart >= _w_size + (_w_size - 262)) {
    common$1.arraySet(s.window, s.window, _w_size, _w_size, 0), s.match_start -= _w_size, 
    s.strstart -= _w_size, s.block_start -= _w_size, p = n = s.hash_size;
    do {
     m = s.head[--p], s.head[p] = m >= _w_size ? m - _w_size : 0;
    } while (--n);
    p = n = _w_size;
    do {
     m = s.prev[--p], s.prev[p] = m >= _w_size ? m - _w_size : 0;
    } while (--n);
    more += _w_size;
   }
   if (0 === s.strm.avail_in) break;
   if (strm = s.strm, buf = s.window, start = s.strstart + s.lookahead, size = more, 
   len = void 0, (len = strm.avail_in) > size && (len = size), n = 0 === len ? 0 : (strm.avail_in -= len, 
   common$1.arraySet(buf, strm.input, strm.next_in, len, start), 1 === strm.state.wrap ? strm.adler = adler32_1(strm.adler, buf, len, start) : 2 === strm.state.wrap && (strm.adler = crc32_1(strm.adler, buf, len, start)), 
   strm.next_in += len, strm.total_in += len, len), s.lookahead += n, s.lookahead + s.insert >= 3) for (str = s.strstart - s.insert, 
   s.ins_h = s.window[str], s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask; s.insert && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 3 - 1]) & s.hash_mask, 
   s.prev[str & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = str, str++, s.insert--, 
   !(s.lookahead + s.insert < 3)); ) ;
  } while (s.lookahead < 262 && 0 !== s.strm.avail_in);
 }
 function deflate_fast(s, flush) {
  for (var hash_head, bflush; ;) {
   if (s.lookahead < 262) {
    if (fill_window(s), s.lookahead < 262 && 0 === flush) return 1;
    if (0 === s.lookahead) break;
   }
   if (hash_head = 0, s.lookahead >= 3 && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 3 - 1]) & s.hash_mask, 
   hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart), 
   0 !== hash_head && s.strstart - hash_head <= s.w_size - 262 && (s.match_length = longest_match(s, hash_head)), 
   s.match_length >= 3) if (bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - 3), 
   s.lookahead -= s.match_length, s.match_length <= s.max_lazy_match && s.lookahead >= 3) {
    s.match_length--;
    do {
     s.strstart++, s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 3 - 1]) & s.hash_mask, 
     hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart;
    } while (0 != --s.match_length);
    s.strstart++;
   } else s.strstart += s.match_length, s.match_length = 0, s.ins_h = s.window[s.strstart], 
   s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask; else bflush = trees._tr_tally(s, 0, s.window[s.strstart]), 
   s.lookahead--, s.strstart++;
   if (bflush && (flush_block_only(s, !1), 0 === s.strm.avail_out)) return 1;
  }
  return s.insert = s.strstart < 2 ? s.strstart : 2, 4 === flush ? (flush_block_only(s, !0), 
  0 === s.strm.avail_out ? 3 : 4) : s.last_lit && (flush_block_only(s, !1), 0 === s.strm.avail_out) ? 1 : 2;
 }
 function deflate_slow(s, flush) {
  for (var hash_head, bflush, max_insert; ;) {
   if (s.lookahead < 262) {
    if (fill_window(s), s.lookahead < 262 && 0 === flush) return 1;
    if (0 === s.lookahead) break;
   }
   if (hash_head = 0, s.lookahead >= 3 && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 3 - 1]) & s.hash_mask, 
   hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart), 
   s.prev_length = s.match_length, s.prev_match = s.match_start, s.match_length = 2, 
   0 !== hash_head && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - 262 && (s.match_length = longest_match(s, hash_head), 
   s.match_length <= 5 && (1 === s.strategy || 3 === s.match_length && s.strstart - s.match_start > 4096) && (s.match_length = 2)), 
   s.prev_length >= 3 && s.match_length <= s.prev_length) {
    max_insert = s.strstart + s.lookahead - 3, bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - 3), 
    s.lookahead -= s.prev_length - 1, s.prev_length -= 2;
    do {
     ++s.strstart <= max_insert && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 3 - 1]) & s.hash_mask, 
     hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart);
    } while (0 != --s.prev_length);
    if (s.match_available = 0, s.match_length = 2, s.strstart++, bflush && (flush_block_only(s, !1), 
    0 === s.strm.avail_out)) return 1;
   } else if (s.match_available) {
    if ((bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1])) && flush_block_only(s, !1), 
    s.strstart++, s.lookahead--, 0 === s.strm.avail_out) return 1;
   } else s.match_available = 1, s.strstart++, s.lookahead--;
  }
  return s.match_available && (bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]), 
  s.match_available = 0), s.insert = s.strstart < 2 ? s.strstart : 2, 4 === flush ? (flush_block_only(s, !0), 
  0 === s.strm.avail_out ? 3 : 4) : s.last_lit && (flush_block_only(s, !1), 0 === s.strm.avail_out) ? 1 : 2;
 }
 function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length, this.max_lazy = max_lazy, this.nice_length = nice_length, 
  this.max_chain = max_chain, this.func = func;
 }
 function DeflateState() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, 
  this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, 
  this.method = 8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, 
  this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, 
  this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, 
  this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, 
  this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, 
  this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, 
  this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new common$1.Buf16(1146), 
  this.dyn_dtree = new common$1.Buf16(122), this.bl_tree = new common$1.Buf16(78), 
  zero$1(this.dyn_ltree), zero$1(this.dyn_dtree), zero$1(this.bl_tree), this.l_desc = null, 
  this.d_desc = null, this.bl_desc = null, this.bl_count = new common$1.Buf16(16), 
  this.heap = new common$1.Buf16(573), zero$1(this.heap), this.heap_len = 0, this.heap_max = 0, 
  this.depth = new common$1.Buf16(573), zero$1(this.depth), this.l_buf = 0, this.lit_bufsize = 0, 
  this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, 
  this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
 }
 function deflateResetKeep(strm) {
  var s;
  return strm && strm.state ? (strm.total_in = strm.total_out = 0, strm.data_type = 2, 
  (s = strm.state).pending = 0, s.pending_out = 0, s.wrap < 0 && (s.wrap = -s.wrap), 
  s.status = s.wrap ? 42 : 113, strm.adler = 2 === s.wrap ? 0 : 1, s.last_flush = 0, 
  trees._tr_init(s), 0) : err(strm, -2);
 }
 function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  return 0 === ret && function(s) {
   s.window_size = 2 * s.w_size, zero$1(s.head), s.max_lazy_match = configuration_table[s.level].max_lazy, 
   s.good_match = configuration_table[s.level].good_length, s.nice_match = configuration_table[s.level].nice_length, 
   s.max_chain_length = configuration_table[s.level].max_chain, s.strstart = 0, s.block_start = 0, 
   s.lookahead = 0, s.insert = 0, s.match_length = s.prev_length = 2, s.match_available = 0, 
   s.ins_h = 0;
  }(strm.state), ret;
 }
 function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) return -2;
  var wrap = 1;
  if (-1 === level && (level = 6), windowBits < 0 ? (wrap = 0, windowBits = -windowBits) : windowBits > 15 && (wrap = 2, 
  windowBits -= 16), memLevel < 1 || memLevel > 9 || 8 !== method || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > 4) return err(strm, -2);
  8 === windowBits && (windowBits = 9);
  var s = new DeflateState;
  return strm.state = s, s.strm = strm, s.wrap = wrap, s.gzhead = null, s.w_bits = windowBits, 
  s.w_size = 1 << s.w_bits, s.w_mask = s.w_size - 1, s.hash_bits = memLevel + 7, s.hash_size = 1 << s.hash_bits, 
  s.hash_mask = s.hash_size - 1, s.hash_shift = ~~((s.hash_bits + 3 - 1) / 3), s.window = new common$1.Buf8(2 * s.w_size), 
  s.head = new common$1.Buf16(s.hash_size), s.prev = new common$1.Buf16(s.w_size), 
  s.lit_bufsize = 1 << memLevel + 6, s.pending_buf_size = 4 * s.lit_bufsize, s.pending_buf = new common$1.Buf8(s.pending_buf_size), 
  s.d_buf = 1 * s.lit_bufsize, s.l_buf = 3 * s.lit_bufsize, s.level = level, s.strategy = strategy, 
  s.method = method, deflateReset(strm);
 }
 configuration_table = [ new Config(0, 0, 0, 0, (function(s, flush) {
  var max_block_size = 65535;
  for (max_block_size > s.pending_buf_size - 5 && (max_block_size = s.pending_buf_size - 5); ;) {
   if (s.lookahead <= 1) {
    if (fill_window(s), 0 === s.lookahead && 0 === flush) return 1;
    if (0 === s.lookahead) break;
   }
   s.strstart += s.lookahead, s.lookahead = 0;
   var max_start = s.block_start + max_block_size;
   if ((0 === s.strstart || s.strstart >= max_start) && (s.lookahead = s.strstart - max_start, 
   s.strstart = max_start, flush_block_only(s, !1), 0 === s.strm.avail_out)) return 1;
   if (s.strstart - s.block_start >= s.w_size - 262 && (flush_block_only(s, !1), 0 === s.strm.avail_out)) return 1;
  }
  return s.insert = 0, 4 === flush ? (flush_block_only(s, !0), 0 === s.strm.avail_out ? 3 : 4) : (s.strstart > s.block_start && (flush_block_only(s, !1), 
  s.strm.avail_out), 1);
 })), new Config(4, 4, 8, 4, deflate_fast), new Config(4, 5, 16, 8, deflate_fast), new Config(4, 6, 32, 32, deflate_fast), new Config(4, 4, 16, 16, deflate_slow), new Config(8, 16, 32, 32, deflate_slow), new Config(8, 16, 128, 128, deflate_slow), new Config(8, 32, 128, 256, deflate_slow), new Config(32, 128, 258, 1024, deflate_slow), new Config(32, 258, 258, 4096, deflate_slow) ];
 var deflate_1 = {
  deflateInit: function(strm, level) {
   return deflateInit2(strm, level, 8, 15, 8, 0);
  },
  deflateInit2: deflateInit2,
  deflateReset: deflateReset,
  deflateResetKeep: deflateResetKeep,
  deflateSetHeader: function(strm, head) {
   return strm && strm.state ? 2 !== strm.state.wrap ? -2 : (strm.state.gzhead = head, 
   0) : -2;
  },
  deflate: function(strm, flush) {
   var old_flush, s, beg, val;
   if (!strm || !strm.state || flush > 5 || flush < 0) return strm ? err(strm, -2) : -2;
   if (s = strm.state, !strm.output || !strm.input && 0 !== strm.avail_in || 666 === s.status && 4 !== flush) return err(strm, 0 === strm.avail_out ? -5 : -2);
   if (s.strm = strm, old_flush = s.last_flush, s.last_flush = flush, 42 === s.status) if (2 === s.wrap) strm.adler = 0, 
   put_byte(s, 31), put_byte(s, 139), put_byte(s, 8), s.gzhead ? (put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (s.gzhead.extra ? 4 : 0) + (s.gzhead.name ? 8 : 0) + (s.gzhead.comment ? 16 : 0)), 
   put_byte(s, 255 & s.gzhead.time), put_byte(s, s.gzhead.time >> 8 & 255), put_byte(s, s.gzhead.time >> 16 & 255), 
   put_byte(s, s.gzhead.time >> 24 & 255), put_byte(s, 9 === s.level ? 2 : s.strategy >= 2 || s.level < 2 ? 4 : 0), 
   put_byte(s, 255 & s.gzhead.os), s.gzhead.extra && s.gzhead.extra.length && (put_byte(s, 255 & s.gzhead.extra.length), 
   put_byte(s, s.gzhead.extra.length >> 8 & 255)), s.gzhead.hcrc && (strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0)), 
   s.gzindex = 0, s.status = 69) : (put_byte(s, 0), put_byte(s, 0), put_byte(s, 0), 
   put_byte(s, 0), put_byte(s, 0), put_byte(s, 9 === s.level ? 2 : s.strategy >= 2 || s.level < 2 ? 4 : 0), 
   put_byte(s, 3), s.status = 113); else {
    var header = 8 + (s.w_bits - 8 << 4) << 8;
    header |= (s.strategy >= 2 || s.level < 2 ? 0 : s.level < 6 ? 1 : 6 === s.level ? 2 : 3) << 6, 
    0 !== s.strstart && (header |= 32), header += 31 - header % 31, s.status = 113, 
    putShortMSB(s, header), 0 !== s.strstart && (putShortMSB(s, strm.adler >>> 16), 
    putShortMSB(s, 65535 & strm.adler)), strm.adler = 1;
   }
   if (69 === s.status) if (s.gzhead.extra) {
    for (beg = s.pending; s.gzindex < (65535 & s.gzhead.extra.length) && (s.pending !== s.pending_buf_size || (s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg)), 
    flush_pending(strm), beg = s.pending, s.pending !== s.pending_buf_size)); ) put_byte(s, 255 & s.gzhead.extra[s.gzindex]), 
    s.gzindex++;
    s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg)), 
    s.gzindex === s.gzhead.extra.length && (s.gzindex = 0, s.status = 73);
   } else s.status = 73;
   if (73 === s.status) if (s.gzhead.name) {
    beg = s.pending;
    do {
     if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg)), 
     flush_pending(strm), beg = s.pending, s.pending === s.pending_buf_size)) {
      val = 1;
      break;
     }
     val = s.gzindex < s.gzhead.name.length ? 255 & s.gzhead.name.charCodeAt(s.gzindex++) : 0, 
     put_byte(s, val);
    } while (0 !== val);
    s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg)), 
    0 === val && (s.gzindex = 0, s.status = 91);
   } else s.status = 91;
   if (91 === s.status) if (s.gzhead.comment) {
    beg = s.pending;
    do {
     if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg)), 
     flush_pending(strm), beg = s.pending, s.pending === s.pending_buf_size)) {
      val = 1;
      break;
     }
     val = s.gzindex < s.gzhead.comment.length ? 255 & s.gzhead.comment.charCodeAt(s.gzindex++) : 0, 
     put_byte(s, val);
    } while (0 !== val);
    s.gzhead.hcrc && s.pending > beg && (strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg)), 
    0 === val && (s.status = 103);
   } else s.status = 103;
   if (103 === s.status && (s.gzhead.hcrc ? (s.pending + 2 > s.pending_buf_size && flush_pending(strm), 
   s.pending + 2 <= s.pending_buf_size && (put_byte(s, 255 & strm.adler), put_byte(s, strm.adler >> 8 & 255), 
   strm.adler = 0, s.status = 113)) : s.status = 113), 0 !== s.pending) {
    if (flush_pending(strm), 0 === strm.avail_out) return s.last_flush = -1, 0;
   } else if (0 === strm.avail_in && rank(flush) <= rank(old_flush) && 4 !== flush) return err(strm, -5);
   if (666 === s.status && 0 !== strm.avail_in) return err(strm, -5);
   if (0 !== strm.avail_in || 0 !== s.lookahead || 0 !== flush && 666 !== s.status) {
    var bstate = 2 === s.strategy ? function(s, flush) {
     for (var bflush; ;) {
      if (0 === s.lookahead && (fill_window(s), 0 === s.lookahead)) {
       if (0 === flush) return 1;
       break;
      }
      if (s.match_length = 0, bflush = trees._tr_tally(s, 0, s.window[s.strstart]), s.lookahead--, 
      s.strstart++, bflush && (flush_block_only(s, !1), 0 === s.strm.avail_out)) return 1;
     }
     return s.insert = 0, 4 === flush ? (flush_block_only(s, !0), 0 === s.strm.avail_out ? 3 : 4) : s.last_lit && (flush_block_only(s, !1), 
     0 === s.strm.avail_out) ? 1 : 2;
    }(s, flush) : 3 === s.strategy ? function(s, flush) {
     for (var bflush, prev, scan, strend, _win = s.window; ;) {
      if (s.lookahead <= 258) {
       if (fill_window(s), s.lookahead <= 258 && 0 === flush) return 1;
       if (0 === s.lookahead) break;
      }
      if (s.match_length = 0, s.lookahead >= 3 && s.strstart > 0 && (prev = _win[scan = s.strstart - 1]) === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
       strend = s.strstart + 258;
       do {} while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
       s.match_length = 258 - (strend - scan), s.match_length > s.lookahead && (s.match_length = s.lookahead);
      }
      if (s.match_length >= 3 ? (bflush = trees._tr_tally(s, 1, s.match_length - 3), s.lookahead -= s.match_length, 
      s.strstart += s.match_length, s.match_length = 0) : (bflush = trees._tr_tally(s, 0, s.window[s.strstart]), 
      s.lookahead--, s.strstart++), bflush && (flush_block_only(s, !1), 0 === s.strm.avail_out)) return 1;
     }
     return s.insert = 0, 4 === flush ? (flush_block_only(s, !0), 0 === s.strm.avail_out ? 3 : 4) : s.last_lit && (flush_block_only(s, !1), 
     0 === s.strm.avail_out) ? 1 : 2;
    }(s, flush) : configuration_table[s.level].func(s, flush);
    if (3 !== bstate && 4 !== bstate || (s.status = 666), 1 === bstate || 3 === bstate) return 0 === strm.avail_out && (s.last_flush = -1), 
    0;
    if (2 === bstate && (1 === flush ? trees._tr_align(s) : 5 !== flush && (trees._tr_stored_block(s, 0, 0, !1), 
    3 === flush && (zero$1(s.head), 0 === s.lookahead && (s.strstart = 0, s.block_start = 0, 
    s.insert = 0))), flush_pending(strm), 0 === strm.avail_out)) return s.last_flush = -1, 
    0;
   }
   return 4 !== flush ? 0 : s.wrap <= 0 ? 1 : (2 === s.wrap ? (put_byte(s, 255 & strm.adler), 
   put_byte(s, strm.adler >> 8 & 255), put_byte(s, strm.adler >> 16 & 255), put_byte(s, strm.adler >> 24 & 255), 
   put_byte(s, 255 & strm.total_in), put_byte(s, strm.total_in >> 8 & 255), put_byte(s, strm.total_in >> 16 & 255), 
   put_byte(s, strm.total_in >> 24 & 255)) : (putShortMSB(s, strm.adler >>> 16), putShortMSB(s, 65535 & strm.adler)), 
   flush_pending(strm), s.wrap > 0 && (s.wrap = -s.wrap), 0 !== s.pending ? 0 : 1);
  },
  deflateEnd: function(strm) {
   var status;
   return strm && strm.state ? 42 !== (status = strm.state.status) && 69 !== status && 73 !== status && 91 !== status && 103 !== status && 113 !== status && 666 !== status ? err(strm, -2) : (strm.state = null, 
   113 === status ? err(strm, -3) : 0) : -2;
  },
  deflateSetDictionary: function(strm, dictionary) {
   var s, str, n, wrap, avail, next, input, tmpDict, dictLength = dictionary.length;
   if (!strm || !strm.state) return -2;
   if (2 === (wrap = (s = strm.state).wrap) || 1 === wrap && 42 !== s.status || s.lookahead) return -2;
   for (1 === wrap && (strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0)), 
   s.wrap = 0, dictLength >= s.w_size && (0 === wrap && (zero$1(s.head), s.strstart = 0, 
   s.block_start = 0, s.insert = 0), tmpDict = new common$1.Buf8(s.w_size), common$1.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0), 
   dictionary = tmpDict, dictLength = s.w_size), avail = strm.avail_in, next = strm.next_in, 
   input = strm.input, strm.avail_in = dictLength, strm.next_in = 0, strm.input = dictionary, 
   fill_window(s); s.lookahead >= 3; ) {
    str = s.strstart, n = s.lookahead - 2;
    do {
     s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 3 - 1]) & s.hash_mask, s.prev[str & s.w_mask] = s.head[s.ins_h], 
     s.head[s.ins_h] = str, str++;
    } while (--n);
    s.strstart = str, s.lookahead = 2, fill_window(s);
   }
   return s.strstart += s.lookahead, s.block_start = s.strstart, s.insert = s.lookahead, 
   s.lookahead = 0, s.match_length = s.prev_length = 2, s.match_available = 0, strm.next_in = next, 
   strm.input = input, strm.avail_in = avail, s.wrap = wrap, 0;
  },
  deflateInfo: "pako deflate (from Nodeca project)"
 }, STR_APPLY_OK = !0, STR_APPLY_UIA_OK = !0;
 try {
  String.fromCharCode.apply(null, [ 0 ]);
 } catch (__) {
  STR_APPLY_OK = !1;
 }
 try {
  String.fromCharCode.apply(null, new Uint8Array(1));
 } catch (__) {
  STR_APPLY_UIA_OK = !1;
 }
 for (var _utf8len = new common$1.Buf8(256), q = 0; q < 256; q++) _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
 _utf8len[254] = _utf8len[254] = 1;
 function buf2binstring(buf, len) {
  if (len < 65534 && (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK)) return String.fromCharCode.apply(null, common$1.shrinkBuf(buf, len));
  for (var result = "", i = 0; i < len; i++) result += String.fromCharCode(buf[i]);
  return result;
 }
 var strings_string2buf = function(str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) 55296 == (64512 & (c = str.charCodeAt(m_pos))) && m_pos + 1 < str_len && 56320 == (64512 & (c2 = str.charCodeAt(m_pos + 1))) && (c = 65536 + (c - 55296 << 10) + (c2 - 56320), 
  m_pos++), buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  for (buf = new common$1.Buf8(buf_len), i = 0, m_pos = 0; i < buf_len; m_pos++) 55296 == (64512 & (c = str.charCodeAt(m_pos))) && m_pos + 1 < str_len && 56320 == (64512 & (c2 = str.charCodeAt(m_pos + 1))) && (c = 65536 + (c - 55296 << 10) + (c2 - 56320), 
  m_pos++), c < 128 ? buf[i++] = c : c < 2048 ? (buf[i++] = 192 | c >>> 6, buf[i++] = 128 | 63 & c) : c < 65536 ? (buf[i++] = 224 | c >>> 12, 
  buf[i++] = 128 | c >>> 6 & 63, buf[i++] = 128 | 63 & c) : (buf[i++] = 240 | c >>> 18, 
  buf[i++] = 128 | c >>> 12 & 63, buf[i++] = 128 | c >>> 6 & 63, buf[i++] = 128 | 63 & c);
  return buf;
 }, strings_buf2binstring = function(buf) {
  return buf2binstring(buf, buf.length);
 };
 var zstream = function() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, 
  this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, 
  this.data_type = 2, this.adler = 0;
 }, toString = Object.prototype.toString;
 function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);
  this.options = common$1.assign({
   level: -1,
   method: 8,
   chunkSize: 16384,
   windowBits: 15,
   memLevel: 8,
   strategy: 0,
   to: ""
  }, options || {});
  var opt = this.options;
  opt.raw && opt.windowBits > 0 ? opt.windowBits = -opt.windowBits : opt.gzip && opt.windowBits > 0 && opt.windowBits < 16 && (opt.windowBits += 16), 
  this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new zstream, 
  this.strm.avail_out = 0;
  var status = deflate_1.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);
  if (0 !== status) throw new Error(messages[status]);
  if (opt.header && deflate_1.deflateSetHeader(this.strm, opt.header), opt.dictionary) {
   var dict;
   if (dict = "string" == typeof opt.dictionary ? strings_string2buf(opt.dictionary) : "[object ArrayBuffer]" === toString.call(opt.dictionary) ? new Uint8Array(opt.dictionary) : opt.dictionary, 
   0 !== (status = deflate_1.deflateSetDictionary(this.strm, dict))) throw new Error(messages[status]);
   this._dict_set = !0;
  }
 }
 function deflate$1(input, options) {
  var deflator = new Deflate(options);
  if (deflator.push(input, !0), deflator.err) throw deflator.msg || messages[deflator.err];
  return deflator.result;
 }
 Deflate.prototype.push = function(data, mode) {
  var status, _mode, strm = this.strm, chunkSize = this.options.chunkSize;
  if (this.ended) return !1;
  _mode = mode === ~~mode ? mode : !0 === mode ? 4 : 0, "string" == typeof data ? strm.input = strings_string2buf(data) : "[object ArrayBuffer]" === toString.call(data) ? strm.input = new Uint8Array(data) : strm.input = data, 
  strm.next_in = 0, strm.avail_in = strm.input.length;
  do {
   if (0 === strm.avail_out && (strm.output = new common$1.Buf8(chunkSize), strm.next_out = 0, 
   strm.avail_out = chunkSize), 1 !== (status = deflate_1.deflate(strm, _mode)) && 0 !== status) return this.onEnd(status), 
   this.ended = !0, !1;
   0 !== strm.avail_out && (0 !== strm.avail_in || 4 !== _mode && 2 !== _mode) || ("string" === this.options.to ? this.onData(strings_buf2binstring(common$1.shrinkBuf(strm.output, strm.next_out))) : this.onData(common$1.shrinkBuf(strm.output, strm.next_out)));
  } while ((strm.avail_in > 0 || 0 === strm.avail_out) && 1 !== status);
  return 4 === _mode ? (status = deflate_1.deflateEnd(this.strm), this.onEnd(status), 
  this.ended = !0, 0 === status) : 2 !== _mode || (this.onEnd(0), strm.avail_out = 0, 
  !0);
 }, Deflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
 }, Deflate.prototype.onEnd = function(status) {
  0 === status && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = common$1.flattenChunks(this.chunks)), 
  this.chunks = [], this.err = status, this.msg = this.strm.msg;
 };
 var deflate_1$1 = {
  Deflate: Deflate,
  deflate: deflate$1,
  deflateRaw: function(input, options) {
   return (options = options || {}).raw = !0, deflate$1(input, options);
  },
  gzip: function(input, options) {
   return (options = options || {}).gzip = !0, deflate$1(input, options);
  }
 };
 const dispatcher = new class {
  constructor() {
   _defineProperty(this, "store", void 0);
  }
  setStore(store) {
   this.store = store;
  }
  dispatch(action) {
   return this.store.dispatch(action);
  }
  getState() {
   return this.store.getState();
  }
 };
 function addUtmParams(link, params) {
  const source = runtimeInfo.browser === Browser.Firefox ? "extension_firefox" : "extension_chrome", url = new URL(link);
  return url.searchParams.append("utm_medium", "prg_link"), url.searchParams.append("utm_source", source), 
  url.searchParams.append("utm_campaign", params.campaign), params.content && url.searchParams.append("utm_content", params.content), 
  params.term && url.searchParams.append("utm_term", params.term), params.otherParams && Object.keys(params.otherParams).forEach(key => {
   url.searchParams.append(key, params.otherParams[key]);
  }), url.href;
 }
 const log$1 = browser("analytics");
 class Analytics {
  init() {
   log$1("initializing"), chrome.alarms.onAlarm.addListener(this.handleAlarm.bind(this)), 
   chrome.alarms.create(Analytics.alarmName, {
    periodInMinutes: Analytics.alarmInterval
   }), window.addEventListener("online", this.handleConnectivityChange.bind(this));
  }
  updateUninstallUrl() {
   const state = dispatcher.getState(), campaign = state.shepherd.config.analytics.utmCampaignUninstall || state.shepherd.config.analytics.utmCampaign, url = state.shepherd.config.analytics.uninstallUrl;
   if (!url) return void log$1("not updating uninstall url, analytics.uninstallUrl not set in shepherd config");
   let urlWithParams = addUtmParams(url, {
    campaign: campaign,
    otherParams: this.getParamsForUninstallUrl()
   });
   urlWithParams.length > 255 && (urlWithParams = addUtmParams(url, {
    campaign: campaign
   }), log$1("uninstall url too long, stripping otherParams")), log$1("updating uninstall url: %s (%d)", urlWithParams, urlWithParams.length), 
   chrome.runtime.setUninstallURL(urlWithParams);
  }
  trackHeartbeat() {
   dispatcher.dispatch(analyticsActions_heartbeatTracked());
  }
  trackHeartbeatIfNecessary() {
   log$1("checking if heartbeat should be tracked");
   const state = dispatcher.getState(), now = Date.now(), intervalMilliseconds = 60 * state.shepherd.config.analytics.heartbeatIntervalHours * 60 * 1e3;
   state.analytics.lastHeartbeat + intervalMilliseconds > now || this.trackHeartbeat();
  }
  handleAlarm(alarm) {
   alarm.name === Analytics.alarmName && this.trackHeartbeatIfNecessary();
  }
  handleConnectivityChange() {
   this.trackHeartbeatIfNecessary(), this.refreshClientCountryCode();
  }
 }
 _defineProperty(Analytics, "alarmName", "analytics/heartbeat"), _defineProperty(Analytics, "alarmInterval", 15);
 const log$2 = browser("analytics/burger");
 class AnalyticsBurger extends Analytics {
  constructor(browserStorage, adapter) {
   super(), _defineProperty(this, "adapter", void 0), _defineProperty(this, "browserStorage", void 0), 
   _defineProperty(this, "client", void 0), _defineProperty(this, "clientAdapter", void 0), 
   this.adapter = adapter, this.browserStorage = browserStorage, this.clientAdapter = pbjs5Adapter.create({
    ActivityEnvelope: activity_envelope.ActivityEnvelope,
    HeartbeatEnvelope: heartbeat_envelope.HeartbeatEnvelope,
    InstallEnvelope: install_envelope.InstallEnvelope,
    UninstallEnvelope: uninstall_envelope.UninstallEnvelope,
    UpdateEnvelope: update_envelope.UpdateEnvelope
   });
  }
  async setUpOrTearDown() {
   const state = dispatcher.getState(), userConsent = state.analytics.userConsent, trackToBurger = state.shepherd.config.analytics && state.shepherd.config.analytics.trackToBurger;
   if (userConsent && trackToBurger) this.client || (log$2("initializing burger client"), 
   this.client = this.createBurgerClient()); else if (this.client) {
    log$2("removing burger client");
    const client = this.client;
    this.client = null, await client.flush();
   }
  }
  trackView(view, label) {
   this.client && (log$2('tracking activity view: "%s"', view), this.updateClient(), 
   this.client.send.activity.view({
    object: {
     category: view,
     action: "view",
     label: label,
     view: view
    }
   }));
  }
  trackEvent(category, action, label, view) {
   this.client && (log$2('tracking activity event: "%s" "%s" "%s" "%s"', category, action, label, view || category), 
   this.updateClient(), this.client.send.activity.click({
    object: {
     category: category,
     action: action,
     label: label,
     view: view || category
    }
   }));
  }
  trackHeartbeat() {
   if (!this.client) return;
   log$2("tracking heartbeat"), super.trackHeartbeat(), this.updateClient();
   const state = dispatcher.getState();
   this.client.send.heartbeat(Date.now() - state.analytics.startupTime);
  }
  trackLifecycleEvent(action) {
   switch (action) {
   case EventAction.Installation:
    this.trackInstall(), this.trackHeartbeat();
    break;

   case EventAction.Update:
    this.trackUpdate();
   }
  }
  trackInstall() {
   this.client && (log$2("tracking install event"), this.updateClient(), this.client.send.install());
  }
  trackUpdate() {
   this.client && (log$2("tracking update event"), this.updateClient(), this.client.send.update());
  }
  getParamsForUninstallUrl() {
   const state = dispatcher.getState();
   if (!this.client || state.shepherd.config.analytics.uninstallTabType !== UninstallTabType.Burger) return {};
   const fullRecord = this.client._updateRecord({
    event: {
     type: 24,
     subtype: 1,
     time: Date.now()
    }
   });
   try {
    const envelope = {
     record: [ {
      event: fullRecord.event,
      identity: {
       guid: fullRecord.identity.guid
      },
      product: {
       id: fullRecord.product.id,
       mode: fullRecord.product.mode,
       version_app: fullRecord.product.version_app
      },
      platform: {
       os: fullRecord.platform.os
      },
      browser: {
       type: fullRecord.browser.type
      }
     } ]
    }, encoded = new uninstall_envelope.UninstallEnvelope(envelope).encode64().replace(/=+$/, "");
    return log$2("packing this burger envelope to uninstall url: %O (%d bytes)", envelope, encoded.length), 
    {
     burger: encoded
    };
   } catch (e) {
    return log$2("cant encode envelope, error: %O", e), {};
   }
  }
  async refreshClientCountryCode() {}
  gzippedClientAdapter(envelope) {
   log$2("processing burger envelope: %O", envelope);
   const fetchOptions = this.clientAdapter(envelope);
   try {
    fetchOptions.body = deflate_1$1.gzip(fetchOptions.body), fetchOptions.headers["Content-Encoding"] = "gzip";
   } catch (e) {
    log$2("could not gzip burger envelope: %O", e);
   }
   return fetchOptions;
  }
  updateClient() {
   const state = dispatcher.getState(), data = this.adapter(state), abTests = Object.keys(state.shepherd.abTests).map(id => ({
    test_group_id: state.shepherd.abTests[id],
    test_id: id
   }));
   this.client.setSessionId(state.analytics.sessionId).setABTests(abTests).updateGeo(data.geo).updateIdentity(data.identity).updateInstallation(data.installation).updateLicense(data.license).updateProduct(data.product).updateShepherd(data.shepherd);
  }
  createBurgerClient() {
   const state = dispatcher.getState(), storage = {
    getItem: this.browserStorage.get.bind(this.browserStorage),
    setItem: this.browserStorage.set.bind(this.browserStorage)
   }, adapterData = this.adapter(state), url = state.shepherd.config.analytics.burgerUrl, client = new burgerClient(url, this.gzippedClientAdapter.bind(this), {
    batchTimeoutMs: 60 * (state.shepherd.config.analytics.burgerBatchTimeoutMinutes || 0) * 1e3,
    localStorage: storage,
    storageKey: "_events",
    identity: adapterData.identity,
    product: adapterData.product,
    platform: adapterData.platform,
    geo: adapterData.geo,
    installation: adapterData.installation,
    license: adapterData.license,
    shepherd: adapterData.shepherd,
    session_id: state.analytics.sessionId
   });
   return client.on(burgerClient.Event.INITIALIZED, () => {
    log$2("burger client initialized");
   }), client.on(burgerClient.Event.FLUSHED, () => {
    log$2("burger client flushed"), dispatcher.dispatch(analyticsActions_uninstallUrlDirty());
   }), client;
  }
 }
 const log$3 = browser("browserStorage");
 var isArray = Array.isArray, keyList = Object.keys, hasProp = Object.prototype.hasOwnProperty, fastDeepEqual = function equal(a, b) {
  if (a === b) return !0;
  if (a && b && "object" == typeof a && "object" == typeof b) {
   var i, length, key, arrA = isArray(a), arrB = isArray(b);
   if (arrA && arrB) {
    if ((length = a.length) != b.length) return !1;
    for (i = length; 0 != i--; ) if (!equal(a[i], b[i])) return !1;
    return !0;
   }
   if (arrA != arrB) return !1;
   var dateA = a instanceof Date, dateB = b instanceof Date;
   if (dateA != dateB) return !1;
   if (dateA && dateB) return a.getTime() == b.getTime();
   var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
   if (regexpA != regexpB) return !1;
   if (regexpA && regexpB) return a.toString() == b.toString();
   var keys = keyList(a);
   if ((length = keys.length) !== keyList(b).length) return !1;
   for (i = length; 0 != i--; ) if (!hasProp.call(b, keys[i])) return !1;
   for (i = length; 0 != i--; ) if (!equal(a[key = keys[i]], b[key])) return !1;
   return !0;
  }
  return a != a && b != b;
 };
 const log$4 = browser("statePersist");
 class StatePersist {
  constructor(browserStorage, pathMap) {
   _defineProperty(this, "browserStorage", void 0), _defineProperty(this, "paths", void 0);
   const paths = [];
   Object.keys(pathMap).forEach((function(key) {
    pathMap[key].forEach((function(path) {
     path.includes(".") ? log$4("no support for persisting nested properties: %s:%s", key, path) : paths.push({
      root: key,
      subpath: path
     });
    }));
   })), this.browserStorage = browserStorage, this.paths = paths;
  }
  load() {
   const stored = this.browserStorage.get("_state");
   return stored || null;
  }
  clear() {
   this.browserStorage.set("_state", null);
  }
  buildMiddleware() {
   let previousState = null;
   return ref => next => action => {
    let toPersist;
    const nextAction = next(action), nextState = ref.getState();
    return nextState !== previousState && (toPersist = this.paths.reduce((result, path) => (result[path.root] = result[path.root] || {}, 
    result[path.root][path.subpath] = nextState[path.root][path.subpath], result), {})), 
    previousState = nextState, !toPersist || fastDeepEqual(this.browserStorage.get("_state"), toPersist) || this.browserStorage.set("_state", toPersist), 
    nextAction;
   };
  }
 }
 var result = function(root) {
  var result, Symbol = root.Symbol;
  return "function" == typeof Symbol ? Symbol.observable ? result = Symbol.observable : (result = Symbol("observable"), 
  Symbol.observable = result) : result = "@@observable", result;
 }("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof module ? module : Function("return this")()), randomString = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
 }, ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function() {
   return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
 };
 function isPlainObject(obj) {
  if ("object" != typeof obj || null === obj) return !1;
  for (var proto = obj; null !== Object.getPrototypeOf(proto); ) proto = Object.getPrototypeOf(proto);
  return Object.getPrototypeOf(obj) === proto;
 }
 function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if ("function" == typeof preloadedState && "function" == typeof enhancer || "function" == typeof enhancer && "function" == typeof arguments[3]) throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");
  if ("function" == typeof preloadedState && void 0 === enhancer && (enhancer = preloadedState, 
  preloadedState = void 0), void 0 !== enhancer) {
   if ("function" != typeof enhancer) throw new Error("Expected the enhancer to be a function.");
   return enhancer(createStore)(reducer, preloadedState);
  }
  if ("function" != typeof reducer) throw new Error("Expected the reducer to be a function.");
  var currentReducer = reducer, currentState = preloadedState, currentListeners = [], nextListeners = currentListeners, isDispatching = !1;
  function ensureCanMutateNextListeners() {
   nextListeners === currentListeners && (nextListeners = currentListeners.slice());
  }
  function getState() {
   if (isDispatching) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
   return currentState;
  }
  function subscribe(listener) {
   if ("function" != typeof listener) throw new Error("Expected the listener to be a function.");
   if (isDispatching) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
   var isSubscribed = !0;
   return ensureCanMutateNextListeners(), nextListeners.push(listener), function() {
    if (isSubscribed) {
     if (isDispatching) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");
     isSubscribed = !1, ensureCanMutateNextListeners();
     var index = nextListeners.indexOf(listener);
     nextListeners.splice(index, 1), currentListeners = null;
    }
   };
  }
  function dispatch(action) {
   if (!isPlainObject(action)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
   if (void 0 === action.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
   if (isDispatching) throw new Error("Reducers may not dispatch actions.");
   try {
    isDispatching = !0, currentState = currentReducer(currentState, action);
   } finally {
    isDispatching = !1;
   }
   for (var listeners = currentListeners = nextListeners, i = 0; i < listeners.length; i++) {
    (0, listeners[i])();
   }
   return action;
  }
  function replaceReducer(nextReducer) {
   if ("function" != typeof nextReducer) throw new Error("Expected the nextReducer to be a function.");
   currentReducer = nextReducer, dispatch({
    type: ActionTypes.REPLACE
   });
  }
  function observable() {
   var _ref, outerSubscribe = subscribe;
   return (_ref = {
    subscribe: function(observer) {
     if ("object" != typeof observer || null === observer) throw new TypeError("Expected the observer to be an object.");
     function observeState() {
      observer.next && observer.next(getState());
     }
     return observeState(), {
      unsubscribe: outerSubscribe(observeState)
     };
    }
   })[result] = function() {
    return this;
   }, _ref;
  }
  return dispatch({
   type: ActionTypes.INIT
  }), (_ref2 = {
   dispatch: dispatch,
   subscribe: subscribe,
   getState: getState,
   replaceReducer: replaceReducer
  })[result] = observable, _ref2;
 }
 function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  return "Given " + (actionType && 'action "' + String(actionType) + '"' || "an action") + ', reducer "' + key + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.';
 }
 function combineReducers(reducers) {
  for (var reducerKeys = Object.keys(reducers), finalReducers = {}, i = 0; i < reducerKeys.length; i++) {
   var key = reducerKeys[i];
   "function" == typeof reducers[key] && (finalReducers[key] = reducers[key]);
  }
  var shapeAssertionError, finalReducerKeys = Object.keys(finalReducers);
  try {
   !function(reducers) {
    Object.keys(reducers).forEach((function(key) {
     var reducer = reducers[key];
     if (void 0 === reducer(void 0, {
      type: ActionTypes.INIT
     })) throw new Error('Reducer "' + key + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
     if (void 0 === reducer(void 0, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
     })) throw new Error('Reducer "' + key + "\" returned undefined when probed with a random type. Don't try to handle " + ActionTypes.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.');
    }));
   }(finalReducers);
  } catch (e) {
   shapeAssertionError = e;
  }
  return function(state, action) {
   if (void 0 === state && (state = {}), shapeAssertionError) throw shapeAssertionError;
   for (var hasChanged = !1, nextState = {}, _i = 0; _i < finalReducerKeys.length; _i++) {
    var _key = finalReducerKeys[_i], reducer = finalReducers[_key], previousStateForKey = state[_key], nextStateForKey = reducer(previousStateForKey, action);
    if (void 0 === nextStateForKey) {
     var errorMessage = getUndefinedStateErrorMessage(_key, action);
     throw new Error(errorMessage);
    }
    nextState[_key] = nextStateForKey, hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
   }
   return (hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length) ? nextState : state;
  };
 }
 function _defineProperty$1(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
   value: value,
   enumerable: !0,
   configurable: !0,
   writable: !0
  }) : obj[key] = value, obj;
 }
 function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  return Object.getOwnPropertySymbols && keys.push.apply(keys, Object.getOwnPropertySymbols(object)), 
  enumerableOnly && (keys = keys.filter((function(sym) {
   return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  }))), keys;
 }
 function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
   var source = null != arguments[i] ? arguments[i] : {};
   i % 2 ? ownKeys(source, !0).forEach((function(key) {
    _defineProperty$1(target, key, source[key]);
   })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(source).forEach((function(key) {
    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
   }));
  }
  return target;
 }
 function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) funcs[_key] = arguments[_key];
  return 0 === funcs.length ? function(arg) {
   return arg;
  } : 1 === funcs.length ? funcs[0] : funcs.reduce((function(a, b) {
   return function() {
    return a(b.apply(void 0, arguments));
   };
  }));
 }
 function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) middlewares[_key] = arguments[_key];
  return function(createStore) {
   return function() {
    var store = createStore.apply(void 0, arguments), _dispatch = function() {
     throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    }, middlewareAPI = {
     getState: store.getState,
     dispatch: function() {
      return _dispatch.apply(void 0, arguments);
     }
    }, chain = middlewares.map((function(middleware) {
     return middleware(middlewareAPI);
    }));
    return _objectSpread2({}, store, {
     dispatch: _dispatch = compose.apply(void 0, chain)(store.dispatch)
    });
   };
  };
 }
 var helpers = createCommonjsModule((function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
   value: !0
  });
  var repeat = exports.repeat = function(str, times) {
   return new Array(times + 1).join(str);
  }, pad = exports.pad = function(num, maxLength) {
   return repeat("0", maxLength - num.toString().length) + num;
  };
  exports.formatTime = function(time) {
   return pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
  }, exports.timer = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date;
 }));
 unwrapExports(helpers);
 helpers.repeat, helpers.pad, helpers.formatTime, helpers.timer;
 var deepDiff = createCommonjsModule((function(module, exports) {
  module.exports = function(undefined$1) {
   var $scope, conflict, conflictResolution = [];
   function inherits(ctor, superCtor) {
    ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
     constructor: {
      value: ctor,
      enumerable: !1,
      writable: !0,
      configurable: !0
     }
    });
   }
   function Diff(kind, path) {
    Object.defineProperty(this, "kind", {
     value: kind,
     enumerable: !0
    }), path && path.length && Object.defineProperty(this, "path", {
     value: path,
     enumerable: !0
    });
   }
   function DiffEdit(path, origin, value) {
    DiffEdit.super_.call(this, "E", path), Object.defineProperty(this, "lhs", {
     value: origin,
     enumerable: !0
    }), Object.defineProperty(this, "rhs", {
     value: value,
     enumerable: !0
    });
   }
   function DiffNew(path, value) {
    DiffNew.super_.call(this, "N", path), Object.defineProperty(this, "rhs", {
     value: value,
     enumerable: !0
    });
   }
   function DiffDeleted(path, value) {
    DiffDeleted.super_.call(this, "D", path), Object.defineProperty(this, "lhs", {
     value: value,
     enumerable: !0
    });
   }
   function DiffArray(path, index, item) {
    DiffArray.super_.call(this, "A", path), Object.defineProperty(this, "index", {
     value: index,
     enumerable: !0
    }), Object.defineProperty(this, "item", {
     value: item,
     enumerable: !0
    });
   }
   function arrayRemove(arr, from, to) {
    var rest = arr.slice((to || from) + 1 || arr.length);
    return arr.length = from < 0 ? arr.length + from : from, arr.push.apply(arr, rest), 
    arr;
   }
   function realTypeOf(subject) {
    var type = typeof subject;
    return "object" !== type ? type : subject === Math ? "math" : null === subject ? "null" : Array.isArray(subject) ? "array" : "[object Date]" === Object.prototype.toString.call(subject) ? "date" : void 0 !== subject.toString && /^\/.*\//.test(subject.toString()) ? "regexp" : "object";
   }
   function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
    var currentPath = (path = path || []).slice(0);
    if (void 0 !== key) {
     if (prefilter) {
      if ("function" == typeof prefilter && prefilter(currentPath, key)) return;
      if ("object" == typeof prefilter) {
       if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) return;
       if (prefilter.normalize) {
        var alt = prefilter.normalize(currentPath, key, lhs, rhs);
        alt && (lhs = alt[0], rhs = alt[1]);
       }
      }
     }
     currentPath.push(key);
    }
    "regexp" === realTypeOf(lhs) && "regexp" === realTypeOf(rhs) && (lhs = lhs.toString(), 
    rhs = rhs.toString());
    var ltype = typeof lhs, rtype = typeof rhs;
    if ("undefined" === ltype) "undefined" !== rtype && changes(new DiffNew(currentPath, rhs)); else if ("undefined" === rtype) changes(new DiffDeleted(currentPath, lhs)); else if (realTypeOf(lhs) !== realTypeOf(rhs)) changes(new DiffEdit(currentPath, lhs, rhs)); else if ("[object Date]" === Object.prototype.toString.call(lhs) && "[object Date]" === Object.prototype.toString.call(rhs) && lhs - rhs != 0) changes(new DiffEdit(currentPath, lhs, rhs)); else if ("object" === ltype && null !== lhs && null !== rhs) {
     if ((stack = stack || []).indexOf(lhs) < 0) {
      if (stack.push(lhs), Array.isArray(lhs)) {
       var i;
       for (lhs.length, i = 0; i < lhs.length; i++) i >= rhs.length ? changes(new DiffArray(currentPath, i, new DiffDeleted(undefined$1, lhs[i]))) : deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
       for (;i < rhs.length; ) changes(new DiffArray(currentPath, i, new DiffNew(undefined$1, rhs[i++])));
      } else {
       var akeys = Object.keys(lhs), pkeys = Object.keys(rhs);
       akeys.forEach((function(k, i) {
        var other = pkeys.indexOf(k);
        other >= 0 ? (deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack), 
        pkeys = arrayRemove(pkeys, other)) : deepDiff(lhs[k], undefined$1, changes, prefilter, currentPath, k, stack);
       })), pkeys.forEach((function(k) {
        deepDiff(undefined$1, rhs[k], changes, prefilter, currentPath, k, stack);
       }));
      }
      stack.length = stack.length - 1;
     }
    } else lhs !== rhs && ("number" === ltype && isNaN(lhs) && isNaN(rhs) || changes(new DiffEdit(currentPath, lhs, rhs)));
   }
   function accumulateDiff(lhs, rhs, prefilter, accum) {
    return accum = accum || [], deepDiff(lhs, rhs, (function(diff) {
     diff && accum.push(diff);
    }), prefilter), accum.length ? accum : undefined$1;
   }
   function applyChange(target, source, change) {
    if (target && source && change && change.kind) {
     for (var it = target, i = -1, last = change.path ? change.path.length - 1 : 0; ++i < last; ) void 0 === it[change.path[i]] && (it[change.path[i]] = "number" == typeof change.path[i] ? [] : {}), 
     it = it[change.path[i]];
     switch (change.kind) {
     case "A":
      !function applyArrayChange(arr, index, change) {
       if (change.path && change.path.length) {
        var i, it = arr[index], u = change.path.length - 1;
        for (i = 0; i < u; i++) it = it[change.path[i]];
        switch (change.kind) {
        case "A":
         applyArrayChange(it[change.path[i]], change.index, change.item);
         break;

        case "D":
         delete it[change.path[i]];
         break;

        case "E":
        case "N":
         it[change.path[i]] = change.rhs;
        }
       } else switch (change.kind) {
       case "A":
        applyArrayChange(arr[index], change.index, change.item);
        break;

       case "D":
        arr = arrayRemove(arr, index);
        break;

       case "E":
       case "N":
        arr[index] = change.rhs;
       }
       return arr;
      }(change.path ? it[change.path[i]] : it, change.index, change.item);
      break;

     case "D":
      delete it[change.path[i]];
      break;

     case "E":
     case "N":
      it[change.path[i]] = change.rhs;
     }
    }
   }
   return $scope = "object" == typeof commonjsGlobal && commonjsGlobal ? commonjsGlobal : "undefined" != typeof window ? window : {}, 
   (conflict = $scope.DeepDiff) && conflictResolution.push((function() {
    void 0 !== conflict && $scope.DeepDiff === accumulateDiff && ($scope.DeepDiff = conflict, 
    conflict = undefined$1);
   })), inherits(DiffEdit, Diff), inherits(DiffNew, Diff), inherits(DiffDeleted, Diff), 
   inherits(DiffArray, Diff), Object.defineProperties(accumulateDiff, {
    diff: {
     value: accumulateDiff,
     enumerable: !0
    },
    observableDiff: {
     value: deepDiff,
     enumerable: !0
    },
    applyDiff: {
     value: function(target, source, filter) {
      if (target && source) {
       deepDiff(target, source, (function(change) {
        filter && !filter(target, source, change) || applyChange(target, source, change);
       }));
      }
     },
     enumerable: !0
    },
    applyChange: {
     value: applyChange,
     enumerable: !0
    },
    revertChange: {
     value: function(target, source, change) {
      if (target && source && change && change.kind) {
       var i, u, it = target;
       for (u = change.path.length - 1, i = 0; i < u; i++) void 0 === it[change.path[i]] && (it[change.path[i]] = {}), 
       it = it[change.path[i]];
       switch (change.kind) {
       case "A":
        !function revertArrayChange(arr, index, change) {
         if (change.path && change.path.length) {
          var i, it = arr[index], u = change.path.length - 1;
          for (i = 0; i < u; i++) it = it[change.path[i]];
          switch (change.kind) {
          case "A":
           revertArrayChange(it[change.path[i]], change.index, change.item);
           break;

          case "D":
          case "E":
           it[change.path[i]] = change.lhs;
           break;

          case "N":
           delete it[change.path[i]];
          }
         } else switch (change.kind) {
         case "A":
          revertArrayChange(arr[index], change.index, change.item);
          break;

         case "D":
         case "E":
          arr[index] = change.lhs;
          break;

         case "N":
          arr = arrayRemove(arr, index);
         }
         return arr;
        }(it[change.path[i]], change.index, change.item);
        break;

       case "D":
       case "E":
        it[change.path[i]] = change.lhs;
        break;

       case "N":
        delete it[change.path[i]];
       }
      }
     },
     enumerable: !0
    },
    isConflict: {
     value: function() {
      return void 0 !== conflict;
     },
     enumerable: !0
    },
    noConflict: {
     value: function() {
      return conflictResolution && (conflictResolution.forEach((function(it) {
       it();
      })), conflictResolution = null), accumulateDiff;
     },
     enumerable: !0
    }
   }), accumulateDiff;
  }();
 })), diff = createCommonjsModule((function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
   value: !0
  }), exports.default = function(prevState, newState, logger, isCollapsed) {
   var diff = (0, _deepDiff2.default)(prevState, newState);
   try {
    isCollapsed ? logger.groupCollapsed("diff") : logger.group("diff");
   } catch (e) {
    logger.log("diff");
   }
   diff ? diff.forEach((function(elem) {
    var kind = elem.kind, output = function(diff) {
     var kind = diff.kind, path = diff.path, lhs = diff.lhs, rhs = diff.rhs, index = diff.index, item = diff.item;
     switch (kind) {
     case "E":
      return [ path.join("."), lhs, "→", rhs ];

     case "N":
      return [ path.join("."), rhs ];

     case "D":
      return [ path.join(".") ];

     case "A":
      return [ path.join(".") + "[" + index + "]", item ];

     default:
      return [];
     }
    }(elem);
    logger.log.apply(logger, [ "%c " + dictionary[kind].text, style(kind) ].concat(function(arr) {
     if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
     }
     return Array.from(arr);
    }(output)));
   })) : logger.log("—— no diff ——");
   try {
    logger.groupEnd();
   } catch (e) {
    logger.log("—— diff end —— ");
   }
  };
  var obj, _deepDiff2 = (obj = deepDiff) && obj.__esModule ? obj : {
   default: obj
  };
  var dictionary = {
   E: {
    color: "#2196F3",
    text: "CHANGED:"
   },
   N: {
    color: "#4CAF50",
    text: "ADDED:"
   },
   D: {
    color: "#F44336",
    text: "DELETED:"
   },
   A: {
    color: "#2196F3",
    text: "ARRAY:"
   }
  };
  function style(kind) {
   return "color: " + dictionary[kind].color + "; font-weight: bold";
  }
  module.exports = exports.default;
 }));
 unwrapExports(diff);
 var core = createCommonjsModule((function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
   value: !0
  });
  var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
   return typeof obj;
  } : function(obj) {
   return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  exports.printBuffer = function(buffer, options) {
   var logger = options.logger, actionTransformer = options.actionTransformer, _options$titleFormatt = options.titleFormatter, titleFormatter = void 0 === _options$titleFormatt ? function(options) {
    var timestamp = options.timestamp, duration = options.duration;
    return function(action, time, took) {
     var parts = [ "action" ];
     return parts.push("%c" + String(action.type)), timestamp && parts.push("%c@ " + time), 
     duration && parts.push("%c(in " + took.toFixed(2) + " ms)"), parts.join(" ");
    };
   }(options) : _options$titleFormatt, collapsed = options.collapsed, colors = options.colors, level = options.level, diff = options.diff, isUsingDefaultFormatter = void 0 === options.titleFormatter;
   buffer.forEach((function(logEntry, key) {
    var started = logEntry.started, startedTime = logEntry.startedTime, action = logEntry.action, prevState = logEntry.prevState, error = logEntry.error, took = logEntry.took, nextState = logEntry.nextState, nextEntry = buffer[key + 1];
    nextEntry && (nextState = nextEntry.prevState, took = nextEntry.started - started);
    var formattedAction = actionTransformer(action), isCollapsed = "function" == typeof collapsed ? collapsed((function() {
     return nextState;
    }), action, logEntry) : collapsed, formattedTime = (0, helpers.formatTime)(startedTime), titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : "", headerCSS = [ "color: gray; font-weight: lighter;" ];
    headerCSS.push(titleCSS), options.timestamp && headerCSS.push("color: gray; font-weight: lighter;"), 
    options.duration && headerCSS.push("color: gray; font-weight: lighter;");
    var title = titleFormatter(formattedAction, formattedTime, took);
    try {
     isCollapsed ? colors.title && isUsingDefaultFormatter ? logger.groupCollapsed.apply(logger, [ "%c " + title ].concat(headerCSS)) : logger.groupCollapsed(title) : colors.title && isUsingDefaultFormatter ? logger.group.apply(logger, [ "%c " + title ].concat(headerCSS)) : logger.group(title);
    } catch (e) {
     logger.log(title);
    }
    var prevStateLevel = getLogLevel(level, formattedAction, [ prevState ], "prevState"), actionLevel = getLogLevel(level, formattedAction, [ formattedAction ], "action"), errorLevel = getLogLevel(level, formattedAction, [ error, prevState ], "error"), nextStateLevel = getLogLevel(level, formattedAction, [ nextState ], "nextState");
    prevStateLevel && (colors.prevState ? logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState) : logger[prevStateLevel]("prev state", prevState)), 
    actionLevel && (colors.action ? logger[actionLevel]("%c action    ", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction) : logger[actionLevel]("action    ", formattedAction)), 
    error && errorLevel && (colors.error ? logger[errorLevel]("%c error     ", "color: " + colors.error(error, prevState) + "; font-weight: bold;", error) : logger[errorLevel]("error     ", error)), 
    nextStateLevel && (colors.nextState ? logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState) : logger[nextStateLevel]("next state", nextState)), 
    diff && (0, _diff2.default)(prevState, nextState, logger, isCollapsed);
    try {
     logger.groupEnd();
    } catch (e) {
     logger.log("—— log end ——");
    }
   }));
  };
  var obj, _diff2 = (obj = diff) && obj.__esModule ? obj : {
   default: obj
  };
  function getLogLevel(level, action, payload, type) {
   switch (void 0 === level ? "undefined" : _typeof(level)) {
   case "object":
    return "function" == typeof level[type] ? level[type].apply(level, function(arr) {
     if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
     }
     return Array.from(arr);
    }(payload)) : level[type];

   case "function":
    return level(action);

   default:
    return level;
   }
  }
 }));
 unwrapExports(core);
 core.printBuffer;
 var defaults = createCommonjsModule((function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
   value: !0
  }), exports.default = {
   level: "log",
   logger: console,
   logErrors: !0,
   collapsed: void 0,
   predicate: void 0,
   duration: !1,
   timestamp: !0,
   stateTransformer: function(state) {
    return state;
   },
   actionTransformer: function(action) {
    return action;
   },
   errorTransformer: function(error) {
    return error;
   },
   colors: {
    title: function() {
     return "inherit";
    },
    prevState: function() {
     return "#9E9E9E";
    },
    action: function() {
     return "#03A9F4";
    },
    nextState: function() {
     return "#4CAF50";
    },
    error: function() {
     return "#F20404";
    }
   },
   diff: !1,
   diffPredicate: void 0,
   transformer: void 0
  }, module.exports = exports.default;
 }));
 unwrapExports(defaults);
 var lib = createCommonjsModule((function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
   value: !0
  }), exports.logger = exports.createLogger = exports.defaults = void 0;
  var obj, _extends = Object.assign || function(target) {
   for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
   }
   return target;
  }, _defaults2 = (obj = defaults) && obj.__esModule ? obj : {
   default: obj
  };
  function createLogger() {
   var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, loggerOptions = _extends({}, _defaults2.default, options), logger = loggerOptions.logger, stateTransformer = loggerOptions.stateTransformer, errorTransformer = loggerOptions.errorTransformer, predicate = loggerOptions.predicate, logErrors = loggerOptions.logErrors, diffPredicate = loggerOptions.diffPredicate;
   if (void 0 === logger) return function() {
    return function(next) {
     return function(action) {
      return next(action);
     };
    };
   };
   if (options.getState && options.dispatch) return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), 
   function() {
    return function(next) {
     return function(action) {
      return next(action);
     };
    };
   };
   var logBuffer = [];
   return function(_ref) {
    var getState = _ref.getState;
    return function(next) {
     return function(action) {
      if ("function" == typeof predicate && !predicate(getState, action)) return next(action);
      var logEntry = {};
      logBuffer.push(logEntry), logEntry.started = helpers.timer.now(), logEntry.startedTime = new Date, 
      logEntry.prevState = stateTransformer(getState()), logEntry.action = action;
      var returnedValue = void 0;
      if (logErrors) try {
       returnedValue = next(action);
      } catch (e) {
       logEntry.error = errorTransformer(e);
      } else returnedValue = next(action);
      logEntry.took = helpers.timer.now() - logEntry.started, logEntry.nextState = stateTransformer(getState());
      var diff = loggerOptions.diff && "function" == typeof diffPredicate ? diffPredicate(getState, action) : loggerOptions.diff;
      if ((0, core.printBuffer)(logBuffer, _extends({}, loggerOptions, {
       diff: diff
      })), logBuffer.length = 0, logEntry.error) throw logEntry.error;
      return returnedValue;
     };
    };
   };
  }
  var defaultLogger = function() {
   var _ref2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, dispatch = _ref2.dispatch, getState = _ref2.getState;
   if ("function" == typeof dispatch || "function" == typeof getState) return createLogger()({
    dispatch: dispatch,
    getState: getState
   });
   console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n");
  };
  exports.defaults = _defaults2.default, exports.createLogger = createLogger, exports.logger = defaultLogger, 
  exports.default = defaultLogger;
 }));
 unwrapExports(lib);
 lib.logger;
 var lib_2 = lib.createLogger, onStateChange = (lib.defaults, unwrapExports(createCommonjsModule((function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
   value: !0
  }), exports.default = function(fn) {
   return function(store) {
    return function(next) {
     return function(action) {
      var prevState = store.getState(), result = next(action), nextState = store.getState();
      return fn(prevState, nextState, action, store.dispatch), result;
     };
    };
   };
  };
 }))));
 const log$5 = browser("store");
 function onStateChangeHandler(prevState, nextState) {
  fastDeepEqual(prevState, nextState) || chrome.runtime.sendMessage({
   type: GlobalActionTypes.StateChange,
   value: {
    state: nextState
   }
  }, (function() {
   chrome.runtime.lastError;
  }));
 }
 function createStore$1(reducers, generators, initialState, persist) {
  const middleware = generators.map(g => {
   return actionHandlers = g, function(ref) {
    const dispatch = ref.dispatch, getState = ref.getState;
    return function(next) {
     return function(action) {
      const nextState = next(action), handler = actionHandlers[action.type];
      return handler && handler.call(actionHandlers, dispatch, getState, action), nextState;
     };
    };
   };
   var actionHandlers;
  }).concat([ onStateChange(onStateChangeHandler), log$5.enabled && lib_2({
   diff: !0,
   predicate: (getState, action) => (action.type || console.error("unknown action type", action), 
   !action.type.includes("getState")),
   collapsed: () => !0,
   duration: !0,
   timestamp: !0
  }), persist && persist.buildMiddleware() ]).filter(m => m);
  return createStore(combineReducers(reducers), initialState, applyMiddleware.apply(null, middleware));
 }
 "undefined" != typeof chrome && void 0 !== chrome.runtime || (window.chrome = window.browser);
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
    chrome.runtime.lastError && log$3('could not remove key "%s" from browser storage (%O)', path, chrome.runtime.lastError);
   }), delete this.cache[path]) : (this.usingStorage && chrome.storage.local.set({
    [path]: value
   }, () => {
    chrome.runtime.lastError && log$3('could not set key "%s" in browser storage (%O)', path, chrome.runtime.lastError);
   }), this.cache[path] = value);
  }
 }, log$6 = browser("bgLdr");
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
 browser("features");
 let Feature;
 function createShepherdActionGenerator(shepherd) {
  const generators = {};
  return shepherd && (generators[GlobalActionTypes.Startup] = () => {
   shepherd.init();
  }), generators;
 }
 !function(Feature) {
  Feature.Proxy = "proxy", Feature.Vpn = "vpn", Feature.WebRtc = "webRtc", Feature.TabKiller = "tabKiller", 
  Feature.Shepherd = "shepherd", Feature.Analytics = "analytics", Feature.Spc = "spc", 
  Feature.Notifications = "notifications", Feature.Account = "account";
 }(Feature || (Feature = {}));
 var deepExtend_1 = createCommonjsModule((function(module) {
  function isSpecificValue(val) {
   return val instanceof Buffer || val instanceof Date || val instanceof RegExp;
  }
  function cloneSpecificValue(val) {
   if (val instanceof Buffer) {
    var x = Buffer.alloc ? Buffer.alloc(val.length) : new Buffer(val.length);
    return val.copy(x), x;
   }
   if (val instanceof Date) return new Date(val.getTime());
   if (val instanceof RegExp) return new RegExp(val);
   throw new Error("Unexpected situation");
  }
  function deepCloneArray(arr) {
   var clone = [];
   return arr.forEach((function(item, index) {
    "object" == typeof item && null !== item ? Array.isArray(item) ? clone[index] = deepCloneArray(item) : isSpecificValue(item) ? clone[index] = cloneSpecificValue(item) : clone[index] = deepExtend({}, item) : clone[index] = item;
   })), clone;
  }
  function safeGetProperty(object, property) {
   return "__proto__" === property ? void 0 : object[property];
  }
  var deepExtend = module.exports = function() {
   if (arguments.length < 1 || "object" != typeof arguments[0]) return !1;
   if (arguments.length < 2) return arguments[0];
   var val, src, target = arguments[0], args = Array.prototype.slice.call(arguments, 1);
   return args.forEach((function(obj) {
    "object" != typeof obj || null === obj || Array.isArray(obj) || Object.keys(obj).forEach((function(key) {
     return src = safeGetProperty(target, key), (val = safeGetProperty(obj, key)) === target ? void 0 : "object" != typeof val || null === val ? void (target[key] = val) : Array.isArray(val) ? void (target[key] = deepCloneArray(val)) : isSpecificValue(val) ? void (target[key] = cloneSpecificValue(val)) : "object" != typeof src || null === src || Array.isArray(src) ? void (target[key] = deepExtend({}, val)) : void (target[key] = deepExtend(src, val));
    }));
   })), target;
  };
 }));
 const initialShepherdState = {
  nextUpdate: Date.now(),
  config: {
   proxy: {},
   analytics: {},
   notifications: {},
   popup: {},
   account: {}
  },
  abTests: {}
 }, shepherdPersistedPaths = [ "nextUpdate", "config", "configId", "configName", "configVersion", "abTests" ];
 window.Buffer = window.Buffer || class {};
 const log$8 = browser("shepherd/utils");
 function mergeConfigs(defaults, current) {
  const overrides = localStorage.shepherdOverrides ? JSON.parse(localStorage.shepherdOverrides) : null, withDefaults = deepExtend_1(defaults, current || void 0);
  return overrides ? (log$8("merging local shepherd overrides: %O", overrides), deepExtend_1(withDefaults, overrides)) : withDefaults;
 }
 function shepherdReducer(state, action) {
  switch (state = void 0 === state ? {} : state, action.type) {
  case ShepherdActionTypes.ConfigReceived:
   const abTests = {};
   return "string" == typeof action.value.abTests && action.value.abTests.split(",").forEach(abTest => {
    if ("string" == typeof abTest && abTest.includes(":")) {
     const [key, value] = abTest.split(":");
     abTests[key] = value;
    }
   }), shallowCopy(state, {
    abTests: abTests,
    config: mergeConfigs(state.config, action.value.config),
    configId: action.value.configId,
    configName: action.value.configName,
    configVersion: action.value.configVersion,
    nextUpdate: Date.now() + 1e3 * action.value.ttl
   });
  }
  return state;
 }
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
 let ShortcutKeyModifier, SafePage, TextDirection, languageCode;
 !function(ShortcutKeyModifier) {
  ShortcutKeyModifier.None = "none", ShortcutKeyModifier.Alt = "alt", ShortcutKeyModifier.Meta = "meta", 
  ShortcutKeyModifier.Ctrl = "ctrl", ShortcutKeyModifier.Shift = "shift";
 }(ShortcutKeyModifier || (ShortcutKeyModifier = {})), function(SafePage) {
  SafePage.Blank = "blank", SafePage.NewTab = "newTab";
 }(SafePage || (SafePage = {})), function(TextDirection) {
  TextDirection.Ltr = "ltr", TextDirection.Rtl = "rtl";
 }(TextDirection || (TextDirection = {}));
 let precompiledLocale = {};
 function getMessage(messageName, messageFormatParams) {
  return precompiledLocale[messageName] ? precompiledLocale[messageName](messageFormatParams || {}) : chrome.i18n.getMessage(messageName);
 }
 function getLanguage() {
  return getLocale().split("_")[0];
 }
 function getLocale() {
  return languageCode || chrome.i18n.getUILanguage();
 }
 languageCode = getMessage("language_code").replace("-", "_"), languageCode && allPrecompiledLocales && allPrecompiledLocales[languageCode] && (precompiledLocale = allPrecompiledLocales[languageCode]);
 const log$9 = browser("shepherd");
 class Shepherd {
  constructor() {
   _defineProperty(this, "isFetching", !1);
  }
  init() {
   log$9("initializing"), chrome.alarms.onAlarm.addListener(this.handleAlarm.bind(this)), 
   chrome.alarms.create(Shepherd.alarmName, {
    periodInMinutes: Shepherd.alarmInterval
   }), window.addEventListener("online", this.handleConnectivityChange.bind(this)), 
   this.fetchConfigIfNecessary();
  }
  handleAlarm(alarm) {
   alarm.name === Shepherd.alarmName && this.fetchConfigIfNecessary();
  }
  handleConnectivityChange() {
   this.fetchConfigIfNecessary();
  }
  async fetchConfigIfNecessary() {
   if (!buildTimeInfo.shepherdId) return void log$9("shepherd id not specified, not updating config");
   if (this.isFetching) return void log$9("already updating config");
   log$9("checking if config update is necessary");
   const state = dispatcher.getState(), now = Date.now();
   if (!(state.shepherd.nextUpdate > now)) {
    this.isFetching = !0;
    try {
     await this.fetchConfig();
    } catch (e) {
     log$9("error while updating config: %O", e);
    } finally {
     this.isFetching = !1;
    }
   }
  }
  async fetchConfig() {
   log$9("updating config");
   const state = dispatcher.getState(), versionNumbers = runtimeInfo.extensionVersion.split("."), params = new URLSearchParams;
   params.append("p_pro", buildTimeInfo.shepherdId), params.append("p_lng", getLanguage()), 
   params.append("p_vep", versionNumbers[0] || "0"), params.append("p_ves", versionNumbers[1] || "0"), 
   params.append("p_vbd", versionNumbers[2] || "0"), params.append("p_hid", state.analytics.guid), 
   params.append("p_bwe", runtimeInfo.browser === Browser.Firefox ? "1" : "0");
   const xhr = new XMLHttpRequest;
   xhr.open("POST", Shepherd.shepherdUrl, !0), xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
   xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) if (200 === xhr.status) try {
     const config = JSON.parse(xhr.responseText), ttl = Number(xhr.getResponseHeader("TTL")) || Shepherd.defaultTtl, abTests = xhr.getResponseHeader("AB-Tests"), configId = Number(xhr.getResponseHeader("Config-Id")), configName = xhr.getResponseHeader("Config-Name"), configVersion = Number(xhr.getResponseHeader("Config-Version"));
     dispatcher.dispatch(shepherdActions_configReceived(config, ttl, abTests, configId, configName, configVersion));
    } catch (e) {
     log$9("error while processing shepherd response: %O", e);
    } else log$9("non-ok status code from shepherd: %s", xhr.status);
   }, xhr.send(params.toString());
  }
 }
 _defineProperty(Shepherd, "shepherdUrl", "https://shepherd.ff.avast.com"), _defineProperty(Shepherd, "alarmName", "shepherd"), 
 _defineProperty(Shepherd, "alarmInterval", 30), _defineProperty(Shepherd, "defaultTtl", 86400);
 const postStartEvents = new class {
  constructor() {
   _defineProperty(this, "extensionInitialized", void 0), _defineProperty(this, "onInstalledDetails", void 0), 
   this.extensionInitialized = !1, chrome.runtime.onInstalled.addListener(this.handleInstalled.bind(this));
  }
  init() {
   this.extensionInitialized = !0, this.onInstalledDetails && this.dispatchInstalled(this.onInstalledDetails);
  }
  handleInstalled(details) {
   this.extensionInitialized ? this.dispatchInstalled(details) : this.onInstalledDetails = details;
  }
  dispatchInstalled(details) {
   switch (details.reason) {
   case "install":
    dispatcher.dispatch(globalActions_installed());
    break;

   case "update":
    runtimeInfo.extensionVersion !== details.previousVersion && dispatcher.dispatch(globalActions_updated(details.previousVersion));
   }
   this.onInstalledDetails = null;
  }
 }, actionGenerators = {
  [GlobalActionTypes.Startup]() {
   postStartEvents.init();
  },
  [GlobalActionTypes.GetState](dispatch, getState, action) {
   action.meta && action.meta.callback && action.meta.callback({
    state: getState()
   });
  }
 }, analyticsUserConsent = {
  userConsent: runtimeInfo.browser === Browser.Chrome,
  userConsentSource: UserConsentSource.Preset
 };
 let BurgerBrowserType, BurgerSetupAction, BurgerLicenseEdition, BurgerModeType, BurgerStateType, BurgerOperatingSystem, BurgerArchitecture, BurgerWinAVGSMainStatus, SecureLineVpnAction, SecureVpnVpnAction, StateItemFlag, VpnStatus, VpnLicenseType, VpnLicenseStatus, NativeMessagingEndpointName, VpnProductInstallationInfoLink, VpnProductDownloadLink, SecureBrowserFaqLink, VpnProductLicensePurchaseLink, ApiCompatibility, ExtensionCallerMethodName;
 var ErrorInfoSource, ErrorInfoCode;
 let VpnApiErrorType, NotificationType;
 !function(BurgerBrowserType) {
  BurgerBrowserType[BurgerBrowserType.OTHER_BROWSER = 1] = "OTHER_BROWSER", BurgerBrowserType[BurgerBrowserType.AVAST_SECURE_BROWSER = 2] = "AVAST_SECURE_BROWSER", 
  BurgerBrowserType[BurgerBrowserType.CHROME = 3] = "CHROME", BurgerBrowserType[BurgerBrowserType.FIREFOX = 4] = "FIREFOX", 
  BurgerBrowserType[BurgerBrowserType.SAFARI = 5] = "SAFARI", BurgerBrowserType[BurgerBrowserType.EDGE = 6] = "EDGE", 
  BurgerBrowserType[BurgerBrowserType.OPERA = 7] = "OPERA", BurgerBrowserType[BurgerBrowserType.IE = 8] = "IE", 
  BurgerBrowserType[BurgerBrowserType.PALE_MOON = 9] = "PALE_MOON", BurgerBrowserType[BurgerBrowserType.NETSCAPE = 10] = "NETSCAPE", 
  BurgerBrowserType[BurgerBrowserType.UC = 11] = "UC", BurgerBrowserType[BurgerBrowserType.YAB = 12] = "YAB", 
  BurgerBrowserType[BurgerBrowserType.COC_COC = 13] = "COC_COC", BurgerBrowserType[BurgerBrowserType.CHROMIUM = 14] = "CHROMIUM", 
  BurgerBrowserType[BurgerBrowserType.VIVALDI = 15] = "VIVALDI";
 }(BurgerBrowserType || (BurgerBrowserType = {})), function(BurgerSetupAction) {
  BurgerSetupAction[BurgerSetupAction.NEW = 1] = "NEW", BurgerSetupAction[BurgerSetupAction.UPGRADE = 2] = "UPGRADE", 
  BurgerSetupAction[BurgerSetupAction.REINSTALL = 3] = "REINSTALL";
 }(BurgerSetupAction || (BurgerSetupAction = {})), function(BurgerLicenseEdition) {
  BurgerLicenseEdition[BurgerLicenseEdition.AV_FREE = 1] = "AV_FREE", BurgerLicenseEdition[BurgerLicenseEdition.AV_PRO = 2] = "AV_PRO", 
  BurgerLicenseEdition[BurgerLicenseEdition.AV_AIS = 3] = "AV_AIS", BurgerLicenseEdition[BurgerLicenseEdition.AV_APR = 4] = "AV_APR", 
  BurgerLicenseEdition[BurgerLicenseEdition.AV_BUSINESS = 5] = "AV_BUSINESS", BurgerLicenseEdition[BurgerLicenseEdition.AV_VPN = 6] = "AV_VPN", 
  BurgerLicenseEdition[BurgerLicenseEdition.GF_SRV = 7] = "GF_SRV", BurgerLicenseEdition[BurgerLicenseEdition.AV_PSW = 8] = "AV_PSW", 
  BurgerLicenseEdition[BurgerLicenseEdition.AV_PAP = 9] = "AV_PAP", BurgerLicenseEdition[BurgerLicenseEdition.AV_PSM = 10] = "AV_PSM", 
  BurgerLicenseEdition[BurgerLicenseEdition.AV_ASH = 12] = "AV_ASH", BurgerLicenseEdition[BurgerLicenseEdition.AV_SOHO = 13] = "AV_SOHO", 
  BurgerLicenseEdition[BurgerLicenseEdition.AV_AVG_PRO = 14] = "AV_AVG_PRO", BurgerLicenseEdition[BurgerLicenseEdition.AV_AVG_FREE = 15] = "AV_AVG_FREE", 
  BurgerLicenseEdition[BurgerLicenseEdition.AV_AVG_BUSINESS = 16] = "AV_AVG_BUSINESS", 
  BurgerLicenseEdition[BurgerLicenseEdition.PCT_AVG_PRO = 17] = "PCT_AVG_PRO", BurgerLicenseEdition[BurgerLicenseEdition.AVG_VPN = 18] = "AVG_VPN", 
  BurgerLicenseEdition[BurgerLicenseEdition.HMA_VPN_CONSUMER = 19] = "HMA_VPN_CONSUMER", 
  BurgerLicenseEdition[BurgerLicenseEdition.HMA_VPN_TRIAL = 20] = "HMA_VPN_TRIAL", 
  BurgerLicenseEdition[BurgerLicenseEdition.HMA_VPN_BUSINESS = 21] = "HMA_VPN_BUSINESS", 
  BurgerLicenseEdition[BurgerLicenseEdition.GF_V2 = 22] = "GF_V2";
 }(BurgerLicenseEdition || (BurgerLicenseEdition = {})), function(BurgerModeType) {
  BurgerModeType[BurgerModeType.NO_LICENSE = 1] = "NO_LICENSE", BurgerModeType[BurgerModeType.FREE = 2] = "FREE", 
  BurgerModeType[BurgerModeType.TRIAL = 3] = "TRIAL", BurgerModeType[BurgerModeType.PAID = 4] = "PAID", 
  BurgerModeType[BurgerModeType.OEM = 5] = "OEM", BurgerModeType[BurgerModeType.PRE_AUTH_TRIAL = 6] = "PRE_AUTH_TRIAL", 
  BurgerModeType[BurgerModeType.BETA = 7] = "BETA", BurgerModeType[BurgerModeType.FREEMIUM = 8] = "FREEMIUM", 
  BurgerModeType[BurgerModeType.TRIAL_HARDCODED = 9] = "TRIAL_HARDCODED";
 }(BurgerModeType || (BurgerModeType = {})), function(BurgerStateType) {
  BurgerStateType[BurgerStateType.ACTIVE = 1] = "ACTIVE", BurgerStateType[BurgerStateType.EXPIRED = 2] = "EXPIRED";
 }(BurgerStateType || (BurgerStateType = {})), function(BurgerOperatingSystem) {
  BurgerOperatingSystem[BurgerOperatingSystem.WINDOWS = 1] = "WINDOWS", BurgerOperatingSystem[BurgerOperatingSystem.OSX = 2] = "OSX", 
  BurgerOperatingSystem[BurgerOperatingSystem.IOS = 3] = "IOS", BurgerOperatingSystem[BurgerOperatingSystem.LINUX = 4] = "LINUX", 
  BurgerOperatingSystem[BurgerOperatingSystem.ANDROID = 5] = "ANDROID";
 }(BurgerOperatingSystem || (BurgerOperatingSystem = {})), function(BurgerArchitecture) {
  BurgerArchitecture[BurgerArchitecture.X86 = 1] = "X86", BurgerArchitecture[BurgerArchitecture.X64 = 2] = "X64", 
  BurgerArchitecture[BurgerArchitecture.ARM = 3] = "ARM", BurgerArchitecture[BurgerArchitecture.ARM64 = 4] = "ARM64", 
  BurgerArchitecture[BurgerArchitecture.MIPS = 5] = "MIPS";
 }(BurgerArchitecture || (BurgerArchitecture = {})), function(BurgerWinAVGSMainStatus) {
  BurgerWinAVGSMainStatus[BurgerWinAVGSMainStatus.NULL = 0] = "NULL", BurgerWinAVGSMainStatus[BurgerWinAVGSMainStatus.GREEN = 1] = "GREEN", 
  BurgerWinAVGSMainStatus[BurgerWinAVGSMainStatus.YELLOW = 2] = "YELLOW", BurgerWinAVGSMainStatus[BurgerWinAVGSMainStatus.RED = 3] = "RED";
 }(BurgerWinAVGSMainStatus || (BurgerWinAVGSMainStatus = {})), function(SecureLineVpnAction) {
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
 }(VpnApiErrorType || (VpnApiErrorType = {}));
 class NativeMessagingHostNotFoundError extends Error {
  constructor(...params) {
   super(...params), Error.captureStackTrace && Error.captureStackTrace(this, NativeMessagingHostNotFoundError);
  }
 }
 class NativeMessagingError extends Error {
  constructor(...params) {
   super(...params), Error.captureStackTrace && Error.captureStackTrace(this, NativeMessagingError);
  }
 }
 class ObjectValidationError extends Error {
  constructor(...params) {
   super(...params), Error.captureStackTrace && Error.captureStackTrace(this, ObjectValidationError);
  }
 }
 function license2BurgerModeType(license) {
  if (!license) return BurgerModeType.NO_LICENSE;
  switch (license.type) {
  case VpnLicenseType.Free:
   return BurgerModeType.FREEMIUM;

  case VpnLicenseType.Subscription:
   return BurgerModeType.PAID;

  case VpnLicenseType.Trial:
   return BurgerModeType.TRIAL;
  }
  switch (license.status) {
  case VpnLicenseStatus.NoLicenseFile:
  case VpnLicenseStatus.NoSubscription:
   return BurgerModeType.NO_LICENSE;
  }
 }
 function license2BurgerStateType(license) {
  if (license) switch (license.status) {
  case VpnLicenseStatus.Expired:
   return BurgerStateType.EXPIRED;

  default:
   return BurgerStateType.ACTIVE;
  }
 }
 !function(NotificationType) {
  NotificationType.ActivateVpnLicense = "ActivateVpnLicense", NotificationType.Error = "Error", 
  NotificationType.InstallVpnClient = "InstallVpnClient", NotificationType.Offline = "Offline", 
  NotificationType.SubscriptionExpired = "SubscriptionExpired", NotificationType.TrialExpired = "TrialExpired", 
  NotificationType.UpdateExtension = "UpdateExtension", NotificationType.UpdateVpnClient = "UpdateVpnClient";
 }(NotificationType || (NotificationType = {}));
 const defaultShepherdConfig = {
  analytics: {
   burgerBatchTimeoutMinutes: 5,
   burgerUrl: "https://analytics.ff.avast.com/v4/receive/gpb",
   heartbeatIntervalHours: 6,
   trackToBurger: !0,
   uninstallTabType: UninstallTabType.Burger,
   uninstallUrl: runtimeInfo.browser === Browser.Firefox ? "https://www.avast.com/survey-qualtrics?qp_sid=SV_5iQImixACvKsu6V" : "https://www.avast.com/survey-qualtrics?qp_sid=SV_0UvtBJkWPhSV2Dj",
   utmCampaign: "avast_vpn_ext"
  },
  notifications: {
   triggers: []
  },
  popup: {
   urlDownloadClientMac: "https://www.avast.com/secureline-vpn#mac",
   urlDownloadClientWin: "https://www.avast.com/secureline-vpn#pc",
   urlFeedback: "",
   urlGetVpn: "https://www.avast.com/secureline-vpn",
   urlHelp: "https://support.avast.com/article/SecureLine-VPN-FAQ/",
   urlRateUsChrome: "https://chrome.google.com/webstore/detail/phmegojolgpbbcnhccbfneddlooepbpd",
   urlRateUsFirefox: "https://addons.mozilla.org/firefox/addon/avast-secureline-vpn",
   urlSupport: "https://support.avast.com/article/SecureLine-VPN-FAQ/"
  }
 };
 function getApiVersionAction() {
  return "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.GetApiVersion : SecureVpnVpnAction.GetApiVersion;
 }
 function getGetStateAction() {
  return "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.GetState : SecureVpnVpnAction.GetState;
 }
 function getGetOptimalGatewayAction() {
  return "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.GetOptimalGateway : SecureVpnVpnAction.GetOptimalGateway;
 }
 function getGetProductInfoAction() {
  return "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.GetProductInfo : SecureVpnVpnAction.GetProductInfo;
 }
 let VpnActionTypes;
 !function(VpnActionTypes) {
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
 const vpnActions_activeGatewayUpdated = value => createAction(VpnActionTypes.ActiveGatewayUpdated, value), vpnActions_addNotification = value => createAction(VpnActionTypes.AddNotification, value), vpnActions_apiCompatibilityResolved = value => createAction(VpnActionTypes.ApiCompatibilityResolved, value), vpnActions_connect = () => createAction(VpnActionTypes.Connect), vpnActions_disconnect = () => createAction(VpnActionTypes.Disconnect), vpnActions_errorOccurred = value => createAction(VpnActionTypes.ErrorOccurred, value), vpnActions_gatewaySelected = value => createAction(VpnActionTypes.SelectGateway, value), vpnActions_gatewaysUpdated = value => createAction(VpnActionTypes.GatewaysUpdated, value), vpnActions_handleNetworkConnectivityChange = value => createAction(VpnActionTypes.HandleNetworkConnectivityChange, value), vpnActions_ipAddressChanged = value => createAction(VpnActionTypes.IpAddressChanged, value), vpnActions_lastErrorUpdated = value => createAction(VpnActionTypes.LastErrorUpdated, value), vpnActions_licenseInfoUpdated = value => createAction(VpnActionTypes.LicenseInfoUpdated, value), vpnActions_optimalGatewayUpdated = value => createAction(VpnActionTypes.OptimalGatewayUpdated, value), vpnActions_productInfoUpdated = value => createAction(VpnActionTypes.ProductInfoUpdated, value), vpnActions_publicIpChanged = value => createAction(VpnActionTypes.PublicIpChanged, value), vpnActions_removeNotification = value => createAction(VpnActionTypes.RemoveNotification, value), vpnActions_setIsInitialized = value => createAction(VpnActionTypes.SetIsInitialized, value), vpnActions_setNativeMessagingHostFound = value => createAction(VpnActionTypes.SetNativeMessagingHostFound, value), vpnActions_statusUpdated = value => createAction(VpnActionTypes.VpnStatusUpdated, value), vpnActions_updateReconnectingToAnotherGatewayStatus = value => createAction(VpnActionTypes.ReconnectingToAnotherGatewayStatusChanged, value), vpnActions_vpnApiReturnedError = value => createAction(VpnActionTypes.VpnApiReturnedError, value), vpnActions_vpnClientApiVersionUpdated = value => createAction(VpnActionTypes.VpnClientApiVersionUpdated, value), log$a = browser("vpn/ipChecker");
 class Version {
  constructor(major, minor) {
   _defineProperty(this, "_major", void 0), _defineProperty(this, "_minor", void 0), 
   this._major = major, this._minor = minor;
  }
  get major() {
   return this._major;
  }
  get minor() {
   return this._minor;
  }
  toString() {
   return this.major + "." + this.minor;
  }
  compare(other) {
   return other ? this.major > other.major ? 1 : this.major === other.major ? this.minor > other.minor ? 1 : this.minor === other.minor ? 0 : -1 : -1 : 1;
  }
 }
 const log$b = browser("vpn/nativeMessagingClient");
 class NativeMessagingClient {
  constructor() {
   _defineProperty(this, "_port", void 0), _defineProperty(this, "_disconnectedHandler", void 0), 
   this._port = null, this._disconnectedHandler = null;
  }
  connect(hostName, onNativeMessage, onDisconnected) {
   log$b("connecting to %s", hostName), this._disconnectedHandler = onDisconnected, 
   this._port = chrome.runtime.connectNative(hostName), this._port.onMessage.addListener(onNativeMessage), 
   this._port.onDisconnect.addListener(this.disconnectedHandlerInner.bind(this));
  }
  postMessage(message) {
   if (!this._port) throw new NativeMessagingError("port is not open!");
   this._port.postMessage(message);
  }
  disconnectedHandlerInner(port) {
   let message;
   const error = port.error || chrome.runtime.lastError;
   log$b("port disconnected"), error && (log$b("error: %O", error), error.message && (log$b("error message: %s", error.message), 
   message = error.message)), this._disconnectedHandler(message), this._port = null;
  }
 }
 const log$c = browser("vpn/vpnNativeMessagingClient");
 class VpnNativeMessagingClient {
  constructor() {
   _defineProperty(this, "_nativeMessagingClient", void 0), this._nativeMessagingClient = new NativeMessagingClient, 
   this._nativeMessagingClient.connect(NativeMessagingEndpointName[buildTimeInfo.productBrand], this.onNativeMessagingMessage.bind(this), this.onNativeMessagingDisconnected.bind(this));
  }
  setLanguage() {
   const setLanguageRequest = {
    action: "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.SetLanguage : SecureVpnVpnAction.SetLanguage,
    languageTag: getLanguage(),
    countryTag: getLanguage()
   };
   log$c("will post message %s, %O", setLanguageRequest.action, setLanguageRequest), 
   this._nativeMessagingClient.postMessage(setLanguageRequest);
  }
  requestOptimalGateway() {
   this.postAction(getGetOptimalGatewayAction());
  }
  requestVpnState() {
   const itemMask = StateItemFlag.VpnStatus | StateItemFlag.Gateways | StateItemFlag.LicenseInfo | StateItemFlag.ActiveGateway | StateItemFlag.LastError;
   this.postAction(getGetStateAction(), itemMask);
  }
  requestProductInfo() {
   this.postAction(getGetProductInfoAction());
  }
  connectVpnToOptimal() {
   this.postAction("SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.ConnectToOptimal : SecureVpnVpnAction.ConnectToOptimal);
  }
  connectVpnToGateway(gatewayId) {
   const connectRequest = {
    action: "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.Connect : SecureVpnVpnAction.Connect,
    location: {
     gatewayId: gatewayId
    }
   };
   log$c("will post message %s, %O", connectRequest.action, connectRequest), this._nativeMessagingClient.postMessage(connectRequest);
  }
  disconnectVpn() {
   this.postAction("SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.Disconnect : SecureVpnVpnAction.Disconnect);
  }
  showMainWindowWithRoute(route) {
   const showMainWindowRequest = {
    action: "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.ShowMainWindow : SecureVpnVpnAction.ShowMainWindow,
    route: route
   };
   log$c("will post message %s, %O", showMainWindowRequest.action, showMainWindowRequest), 
   this._nativeMessagingClient.postMessage(showMainWindowRequest);
  }
  showNag(elementId, pScrParameter) {
   const showNagRequest = {
    action: "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.ShowNag : SecureVpnVpnAction.ShowNag,
    elementId: elementId,
    extraUrlParameters: {
     p_scr: pScrParameter
    }
   };
   log$c("will post message %s, %O", showNagRequest.action, showNagRequest), this._nativeMessagingClient.postMessage(showNagRequest);
  }
  onNativeMessagingMessage(message) {
   if (!message || !message.action) return void log$c("received message without action = %O", message);
   log$c("received %s message, %O", message.action, message), chrome.runtime.lastError && log$c("error set when message was received: %O", chrome.runtime.lastError);
   const vpnClientApiVersionWithRepeatedEvents = new Version(1, 5), isClientWithRepeatedEvents = dispatcher.getState().vpn.vpnClientApiVersion.compare(vpnClientApiVersionWithRepeatedEvents) >= 0;
   switch (message.action) {
   case getGetOptimalGatewayAction():
    this.handleGetOptimalGatewayMessage(message);
    break;

   case "Vpn_OnStateChanged_SvcNm":
    isClientWithRepeatedEvents || this.handleVpnStateMessage(message);
    break;

   case "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.OnStateChanged : SecureVpnVpnAction.OnStateChanged:
   case getGetStateAction():
    this.handleVpnStateMessage(message);
    break;

   case "Vpn_OnErrorOccurred_SvcNm":
    isClientWithRepeatedEvents || this.handleErrorOccurredMessage(message);
    break;

   case "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.OnErrorOccurred : SecureVpnVpnAction.OnErrorOccurred:
    this.handleErrorOccurredMessage(message);
    break;

   case getGetProductInfoAction():
    this.handleGetProductInfoMessage(message);
   }
  }
  onNativeMessagingDisconnected(message) {
   log$c("native messaging host disconnected, message: %s", message), ("Native host has exited." === message || !message && runtimeInfo.browser === Browser.Firefox) && dispatcher.dispatch(vpnActions_setNativeMessagingHostFound(!1));
  }
  postAction(action, itemMask) {
   const message = {
    action: action,
    itemMask: itemMask
   };
   log$c("will post message %s, %O", message.action, message), this._nativeMessagingClient.postMessage(message);
  }
  handleGetOptimalGatewayMessage(message) {
   if (message.data) dispatcher.dispatch(vpnActions_optimalGatewayUpdated(message.data)); else {
    message.error && log$c("WARNING: GetOptimalGateway response contains error: %O", message.error);
    const optimalGateway = {
     city: {
      name: ""
     },
     country: {
      id: "",
      name: ""
     },
     id: "optimal_unknown"
    };
    dispatcher.dispatch(vpnActions_optimalGatewayUpdated(optimalGateway));
   }
  }
  handleVpnStateMessage(message) {
   if (message.data) {
    const vpnClientState = message.action === getGetStateAction() ? message.data : message.data.data;
    vpnClientState.vpnStatus && dispatcher.dispatch(vpnActions_statusUpdated(vpnClientState.vpnStatus)), 
    vpnClientState.activeGateway && dispatcher.dispatch(vpnActions_activeGatewayUpdated(vpnClientState.activeGateway)), 
    vpnClientState.gateways && dispatcher.dispatch(vpnActions_gatewaysUpdated(vpnClientState.gateways)), 
    vpnClientState.lastError && dispatcher.dispatch(vpnActions_lastErrorUpdated(vpnClientState.lastError)), 
    vpnClientState.licenseInfo && dispatcher.dispatch(vpnActions_licenseInfoUpdated(vpnClientState.licenseInfo));
   } else message.error && (log$c("ERROR: GetState/OnStateChanged response is error: %O", message.error), 
   dispatcher.dispatch(vpnActions_vpnApiReturnedError(message.error)));
  }
  handleErrorOccurredMessage(message) {
   message.data ? dispatcher.dispatch(vpnActions_errorOccurred(message.data)) : message.error && (log$c("ERROR: OnErrorOccurred message is error: %O", message.error), 
   dispatcher.dispatch(vpnActions_vpnApiReturnedError(message.error)));
  }
  handleGetProductInfoMessage(message) {
   message.data && dispatcher.dispatch(vpnActions_productInfoUpdated(message.data));
  }
 }
 const log$d = browser("vpn"), ExtensionIconOverlayText = {
  Connected: getMessage("extension_icon_overlay_text_connected"),
  Connecting: getMessage("extension_icon_overlay_text_connecting"),
  Disconnected: getMessage("extension_icon_overlay_text_disconnected"),
  Disconnecting: getMessage("extension_icon_overlay_text_disconnecting"),
  Reconnecting: getMessage("extension_icon_overlay_text_reconnecting")
 };
 class Vpn {
  static updateIcon(vpnStatus) {
   let path = "img/icon19-active.png", title = "";
   switch (vpnStatus) {
   case VpnStatus.Connecting:
    title = ExtensionIconOverlayText.Connecting;
    break;

   case VpnStatus.Reconnecting:
    title = ExtensionIconOverlayText.Reconnecting;
    break;

   case VpnStatus.Connected:
    title = ExtensionIconOverlayText.Connected;
    break;

   case VpnStatus.Disconnecting:
    title = ExtensionIconOverlayText.Disconnecting, path = "img/icon19.png";
    break;

   case VpnStatus.Disconnected:
   default:
    title = ExtensionIconOverlayText.Disconnected, path = "img/icon19.png";
   }
   chrome.browserAction.setIcon({
    path: path
   }, () => {
    chrome.runtime.lastError && log$d("chrome.browserAction.setIcon failed with error %O", chrome.runtime.lastError);
   }), chrome.browserAction.setTitle({
    title: title
   }, () => {
    chrome.runtime.lastError && log$d("chrome.browserAction.setTitle failed with error %O", chrome.runtime.lastError);
   });
  }
  static async checkVpnClientConnectivity() {
   try {
    const vpnClientApiVersion = await Vpn.fetchVpnClientApiVersion();
    vpnClientApiVersion && dispatcher.dispatch(vpnActions_vpnClientApiVersionUpdated(vpnClientApiVersion));
   } catch (e) {
    dispatcher.dispatch(vpnActions_setNativeMessagingHostFound(!1));
   }
  }
  static async fetchPublicIpAddress(vpnClientApiVersion) {
   if (vpnClientApiVersion || (vpnClientApiVersion = await Vpn.fetchVpnClientApiVersion()), 
   vpnClientApiVersion.compare(new Version(1, 6)) >= 0) {
    let vpnIpAddresses = null;
    try {
     vpnIpAddresses = await Vpn.getPublicIp();
    } catch (err) {
     log$d("Retrieving public IP address from app failed. Error: %O", err);
    }
    vpnIpAddresses && vpnIpAddresses.original ? (log$d("Public IP object: %O", vpnIpAddresses), 
    dispatcher.dispatch(vpnActions_publicIpChanged(vpnIpAddresses))) : dispatcher.dispatch(vpnActions_publicIpChanged(null));
   } else {
    let ipAddress = "";
    try {
     ipAddress = await async function() {
      const response = await fetch("https://ip-info.ff.avast.com/v2/info");
      if (log$a("GeoIp service response status = %d", response.status), response.ok) {
       const ip = (await response.json()).ip;
       return log$a("Public IP: %s", ip), ip;
      }
      throw new Error("GeoIp response failed. Offline(?)");
     }();
    } catch (err) {
     log$d("Retrieving current public IP address failed. Error: %O", err);
    }
    dispatcher.dispatch(vpnActions_ipAddressChanged(ipAddress));
   }
  }
  static async getPublicIp() {
   let vpnIpAddresses = null;
   const request = this.createGetPublicIpRequest();
   try {
    vpnIpAddresses = await Vpn.sendRequest(request), vpnIpAddresses = vpnIpAddresses.data;
   } catch (err) {
    log$d("Getting IP addresses request failed. Error: %O", err);
   }
   return vpnIpAddresses;
  }
  static async fetchVpnClientApiVersion() {
   const request = Vpn.createGetApiVersionRequestMessage(), response = await Vpn.sendRequest(request);
   if (!(obj = response) || "object" != typeof obj || obj.action !== getApiVersionAction() || !function(obj) {
    return obj && "object" == typeof obj && "string" == typeof obj.publicApiVersion;
   }(obj.data)) throw new ObjectValidationError("object is not IGetApiVersionResponse");
   var obj;
   return Vpn.extractApiVersion(response.data);
  }
  static createGetApiVersionRequestMessage() {
   return {
    action: getApiVersionAction(),
    clientApiVersion: Vpn.ClientApiVersion.toString()
   };
  }
  static createGetPublicIpRequest() {
   return {
    action: "SecureLine" === buildTimeInfo.productBrand ? SecureLineVpnAction.GetPublicIp : SecureVpnVpnAction.GetPublicIp
   };
  }
  static sendNativeMessageAsync(message) {
   return new Promise((resolve, reject) => {
    chrome.runtime.sendNativeMessage(NativeMessagingEndpointName[buildTimeInfo.productBrand], message, (function(response) {
     chrome.runtime.lastError ? (log$d("chrome.runtime.sendNativeMessage failed with error: %O", chrome.runtime.lastError), 
     "Specified native messaging host not found." === chrome.runtime.lastError.message ? reject(new NativeMessagingHostNotFoundError) : reject(new NativeMessagingError(`chrome.runtime.sendNativeMessage failed. Error: ${chrome.runtime.lastError.message}`))) : (log$d("chrome.runtime.sendNativeMessage received response: %o.", response), 
     resolve(response));
    }));
   });
  }
  static extractApiVersion(data) {
   const version = data.publicApiVersion;
   if (!version) throw new ObjectValidationError("Missing value for property publicApiVersion.");
   const [versionMajor, versionMinor] = version.split(".").map(s => parseInt(s, 10));
   if (isNaN(versionMajor)) throw new ObjectValidationError("Failed to parse Major part of VPN Client's public API version.");
   if (isNaN(versionMinor)) throw new ObjectValidationError("Failed to parse Minor part of VPN Client's public API version.");
   return new Version(versionMajor, versionMinor);
  }
  static async sendRequest(request) {
   let response = null;
   try {
    response = await Vpn.sendNativeMessageAsync(request);
   } catch (e) {
    log$d("Sending request to VPN client failed. Error: %O", e), dispatcher.dispatch(vpnActions_setNativeMessagingHostFound(!1));
   }
   return response;
  }
  constructor(options) {
   _defineProperty(this, "_vpnNativeMessagingClient", void 0), _defineProperty(this, "_vpnBrowserActionAdapter", void 0), 
   options && (this._vpnBrowserActionAdapter = options.vpnBrowserActionAdapter || null);
  }
  async init() {
   window.addEventListener("online", this.handleNetworkConnectivityChange.bind(this)), 
   window.addEventListener("offline", this.handleNetworkConnectivityChange.bind(this)), 
   await this.handleNetworkConnectivityChange();
  }
  async fetchInitData() {
   try {
    this._vpnNativeMessagingClient = new VpnNativeMessagingClient, this._vpnNativeMessagingClient.setLanguage(), 
    this._vpnNativeMessagingClient.requestVpnState(), this._vpnNativeMessagingClient.requestOptimalGateway(), 
    this._vpnNativeMessagingClient.requestProductInfo();
   } catch (e) {
    log$d("Failed to fetch initial data. Error: %O", e), dispatcher.dispatch(vpnActions_setNativeMessagingHostFound(!1));
   }
  }
  async connect() {
   if (!this._vpnNativeMessagingClient) return void log$d("cannot not connect without nativeMessagingClient");
   const state = dispatcher.getState().vpn;
   "optimal_unknown" === state.selectedGateway.id ? this._vpnNativeMessagingClient.connectVpnToOptimal() : this._vpnNativeMessagingClient.connectVpnToGateway(state.selectedGateway.id);
  }
  async disconnect() {
   this._vpnNativeMessagingClient ? this._vpnNativeMessagingClient.disconnectVpn() : log$d("cannot not disconnect without nativeMessagingClient");
  }
  async showMainWindow(route) {
   this._vpnNativeMessagingClient ? this._vpnNativeMessagingClient.showMainWindowWithRoute(route) : log$d("cannot not shown main window without nativeMessagingClient");
  }
  async showNag(elementId, pScrParameter) {
   this._vpnNativeMessagingClient ? this._vpnNativeMessagingClient.showNag(elementId, pScrParameter) : log$d("cannot not shown nag without nativeMessagingClient");
  }
  updateBrowserAction(vpnStatus) {
   this._vpnBrowserActionAdapter ? this._vpnBrowserActionAdapter(vpnStatus) : Vpn.updateIcon(vpnStatus);
  }
  async handleNetworkConnectivityChange() {
   const isConnectedToNetwork = navigator.onLine;
   log$d("Network connectivity: %s", isConnectedToNetwork ? "online" : "offline"), 
   dispatcher.dispatch(vpnActions_handleNetworkConnectivityChange(isConnectedToNetwork));
  }
 }
 _defineProperty(Vpn, "ClientApiVersion", new Version(1, 5));
 let connectingAnimationTimer = null;
 function setIcon(path) {
  chrome.browserAction.setIcon({
   path: path
  }, () => {
   chrome.runtime.lastError;
  });
 }
 function createThankYouActionGenerator(thankYou) {
  const generators = {};
  return generators[GlobalActionTypes.Startup] = () => {
   thankYou.init();
  }, generators[GlobalActionTypes.Installed] = () => {
   thankYou.open();
  }, generators;
 }
 const log$e = browser("thankYou");
 class ThankYou {
  constructor() {
   _defineProperty(this, "shouldOpen", void 0);
  }
  init() {
   log$e("initializing"), this.shouldOpen = runtimeInfo.browser === Browser.Firefox;
  }
  open() {
   if (this.shouldOpen) {
    log$e("opening thank you page"), openUrlInNewTab(chrome.runtime.getURL("html/thankYou.html"));
   }
  }
 }
 const log$f = browser("vpn/actionGenerator");
 function createVpnActionGenerator(vpn) {
  const generator = {};
  return generator[GlobalActionTypes.Startup] = () => {
   vpn.init();
  }, generator[GlobalActionTypes.GetState] = async (dispatch, getState) => {
   getState().vpn.isNativeMessagingHostFound || await Vpn.checkVpnClientConnectivity();
  }, generator[VpnActionTypes.Connect] = () => {
   vpn.connect();
  }, generator[VpnActionTypes.Disconnect] = () => {
   vpn.disconnect();
  }, generator[VpnActionTypes.ShowMainWindow] = (dispatch, getState, action) => {
   vpn.showMainWindow(action.value);
  }, generator[VpnActionTypes.ShowNag] = (dispatch, getState, action) => {
   const {elementId: elementId, pScrParameter: pScrParameter} = action.value;
   vpn.showNag(elementId, pScrParameter);
  }, generator[VpnActionTypes.ShowLicenseUpgradePage] = (dispatch, getState) => {
   getState().vpn.vpnClientApiVersion.compare(new Version(1, 5)) >= 0 ? vpn.showNag(2) : openUrlInNewTab(VpnProductLicensePurchaseLink[buildTimeInfo.productBrand]);
  }, generator[VpnActionTypes.VpnStatusUpdated] = async (dispatch, getState) => {
   const state = getState().vpn, vpnStatus = state.vpnStatus, vpnClientApiVersion = state.vpnClientApiVersion, isReconnectingToAnotherGateway = state.isReconnectingToAnotherGateway, didConnectDuringReconnecting = state.didConnectDuringReconnecting;
   vpn.updateBrowserAction(vpnStatus), isReconnectingToAnotherGateway && (vpnStatus !== VpnStatus.Disconnected || didConnectDuringReconnecting ? vpnStatus === VpnStatus.Connected && dispatcher.dispatch(vpnActions_updateReconnectingToAnotherGatewayStatus(!1)) : (log$f("reconnecting to another gateway: Connecting..."), 
   dispatcher.dispatch(vpnActions_connect()))), vpnStatus === VpnStatus.Connected && dispatcher.dispatch(vpnActions_errorOccurred(null)), 
   (vpnStatus === VpnStatus.Connected || vpnStatus === VpnStatus.Disconnected && !isReconnectingToAnotherGateway) && await Vpn.fetchPublicIpAddress(vpnClientApiVersion);
  }, generator[VpnActionTypes.OptimalGatewayUpdated] = (dispatch, getState) => {
   const optimalGateway = getState().vpn.optimalGateway, selectedGateway = getState().vpn.selectedGateway;
   optimalGateway && !selectedGateway && (log$f("selecting optimal gateway: %s", optimalGateway.id), 
   dispatcher.dispatch(vpnActions_gatewaySelected(optimalGateway)));
  }, generator[VpnActionTypes.SelectGateway] = async (dispatch, getState) => {
   const vpnStatus = getState().vpn.vpnStatus;
   vpnStatus !== VpnStatus.Connected && vpnStatus !== VpnStatus.Connecting || (dispatcher.dispatch(vpnActions_updateReconnectingToAnotherGatewayStatus(!0)), 
   log$f("reconnecting to another gateway: Disconnecting..."), dispatcher.dispatch(vpnActions_disconnect()));
  }, generator[VpnActionTypes.HandleNetworkConnectivityChange] = async (dispatch, getState) => {
   const state = getState(), vpnClientApiVersion = state.vpn.vpnClientApiVersion;
   if (state.vpn.isConnectedToNetwork) {
    state.vpn.isInitialized || (await Vpn.checkVpnClientConnectivity(), dispatcher.dispatch(vpnActions_setIsInitialized(!0))), 
    dispatcher.dispatch(vpnActions_removeNotification(NotificationType.Offline)), await Vpn.fetchPublicIpAddress(vpnClientApiVersion), 
    vpn.updateBrowserAction(getState().vpn.vpnStatus);
   } else dispatcher.dispatch(vpnActions_addNotification(NotificationType.Offline)), 
   dispatcher.dispatch(vpnActions_publicIpChanged(null)), vpn.updateBrowserAction(VpnStatus.Disconnected);
  }, generator[VpnActionTypes.ErrorOccurred] = (dispatch, getState) => {
   const state = getState(), errorInfo = state.vpn.errorInfo;
   errorInfo ? (log$f("Error occurred. Source: %s. Code: %s", errorInfo.source, errorInfo.code), 
   dispatcher.dispatch(vpnActions_addNotification(NotificationType.Error))) : (log$f("Error cleared."), 
   dispatcher.dispatch(vpnActions_removeNotification(NotificationType.Error))), vpn.updateBrowserAction(state.vpn.vpnStatus);
  }, generator[VpnActionTypes.VpnApiReturnedError] = (dispatch, getState) => {
   const state = getState();
   state.vpn.vpnApiError ? (log$f("VPN API returned error: %O", state.vpn.vpnApiError), 
   dispatcher.dispatch(vpnActions_addNotification(NotificationType.Error))) : (log$f("VPN API error cleared."), 
   dispatcher.dispatch(vpnActions_removeNotification(NotificationType.Error))), vpn.updateBrowserAction(state.vpn.vpnStatus);
  }, generator[VpnActionTypes.VpnClientApiVersionUpdated] = (dispatch, getState) => {
   const vpnClientApiVersion = getState().vpn.vpnClientApiVersion;
   let apiCompatibility;
   log$f("vpn client API version: %d.%d", vpnClientApiVersion.major, vpnClientApiVersion.minor), 
   dispatcher.dispatch(vpnActions_removeNotification(NotificationType.InstallVpnClient)), 
   vpnClientApiVersion.major === Vpn.ClientApiVersion.major ? (apiCompatibility = ApiCompatibility.Compatible, 
   dispatcher.dispatch(vpnActions_removeNotification(NotificationType.UpdateVpnClient)), 
   dispatcher.dispatch(vpnActions_removeNotification(NotificationType.UpdateExtension))) : vpnClientApiVersion.major <= Vpn.ClientApiVersion.major ? (apiCompatibility = ApiCompatibility.VpnClientOld, 
   dispatcher.dispatch(vpnActions_addNotification(NotificationType.UpdateVpnClient))) : (apiCompatibility = ApiCompatibility.ExtensionOld, 
   dispatcher.dispatch(vpnActions_addNotification(NotificationType.UpdateExtension))), 
   dispatcher.dispatch(vpnActions_apiCompatibilityResolved(apiCompatibility));
  }, generator[VpnActionTypes.ApiCompatibilityResolved] = async (dispatch, getState) => {
   const state = getState();
   if (state.vpn.apiCompatibility === ApiCompatibility.Compatible) try {
    await vpn.fetchInitData();
   } catch (e) {
    log$f("fetchInitData() failed. Error %O", e), dispatcher.dispatch(vpnActions_setNativeMessagingHostFound(!1));
   }
   vpn.updateBrowserAction(state.vpn.vpnStatus);
  }, generator[VpnActionTypes.LicenseInfoUpdated] = (dispatch, getState) => {
   const state = getState(), {licenseInfo: licenseInfo} = state.vpn;
   licenseInfo && (licenseInfo.status === VpnLicenseStatus.Expired ? licenseInfo.type === VpnLicenseType.Subscription ? dispatcher.dispatch(vpnActions_addNotification(NotificationType.SubscriptionExpired)) : licenseInfo.type === VpnLicenseType.Trial && dispatcher.dispatch(vpnActions_addNotification(NotificationType.TrialExpired)) : (licenseInfo.status !== VpnLicenseStatus.Valid ? dispatcher.dispatch(vpnActions_addNotification(NotificationType.ActivateVpnLicense)) : dispatcher.dispatch(vpnActions_removeNotification(NotificationType.ActivateVpnLicense)), 
   dispatcher.dispatch(vpnActions_removeNotification(NotificationType.SubscriptionExpired)), 
   dispatcher.dispatch(vpnActions_removeNotification(NotificationType.TrialExpired)))), 
   vpn.updateBrowserAction(state.vpn.vpnStatus);
  }, generator[VpnActionTypes.SetNativeMessagingHostFound] = (dispatch, getState) => {
   const state = getState();
   state.vpn.isNativeMessagingHostFound ? dispatcher.dispatch(vpnActions_removeNotification(NotificationType.InstallVpnClient)) : dispatcher.dispatch(vpnActions_addNotification(NotificationType.InstallVpnClient)), 
   vpn.updateBrowserAction(state.vpn.vpnStatus);
  }, generator;
 }
 function vpnReducer(state, action) {
  switch (state = void 0 === state ? {} : state, action.type) {
  case VpnActionTypes.VpnClientApiVersionUpdated:
   return shallowCopy(state, {
    isNativeMessagingHostFound: !0,
    vpnClientApiVersion: action.value
   });

  case VpnActionTypes.ApiCompatibilityResolved:
   return shallowCopy(state, {
    apiCompatibility: action.value
   });

  case VpnActionTypes.OptimalGatewayUpdated:
   {
    const optimalGateway = action.value, isOptimalGatewayUnknown = optimalGateway && "optimal_unknown" === optimalGateway.id, isOptimalUnknownAlreadyAdded = void 0 !== state.gateways.find(gw => "optimal_unknown" === gw.id);
    if (isOptimalGatewayUnknown && !isOptimalUnknownAlreadyAdded) {
     let gateways = [];
     return gateways.push(optimalGateway), gateways = gateways.concat(state.gateways), 
     shallowCopy(state, {
      gateways: gateways,
      optimalGateway: action.value
     });
    }
    return shallowCopy(state, {
     optimalGateway: action.value
    });
   }

  case VpnActionTypes.ActiveGatewayUpdated:
   {
    const connectedOrConnecting = state.vpnStatus === VpnStatus.Connecting || state.vpnStatus === VpnStatus.Connected, mutations = [ {
     activeGateway: action.value
    } ];
    return action.value && action.value.id && (!state.selectedGateway || connectedOrConnecting) && mutations.push({
     selectedGateway: action.value
    }), shallowCopy(state, ...mutations);
   }

  case VpnActionTypes.GatewaysUpdated:
   {
    let gateways = [];
    const optimalGateway = state.optimalGateway, sortedGateways = function(gateways) {
     return [ ...gateways ].sort((a, b) => a.city.name.localeCompare(b.city.name)).sort((a, b) => a.country.name.localeCompare(b.country.name));
    }(action.value);
    return optimalGateway && "optimal_unknown" === optimalGateway.id && gateways.push(optimalGateway), 
    gateways = gateways.concat(sortedGateways), shallowCopy(state, {
     gateways: gateways
    });
   }

  case VpnActionTypes.LastErrorUpdated:
   return shallowCopy(state, {
    lastError: action.value
   });

  case VpnActionTypes.ErrorOccurred:
   return shallowCopy(state, {
    errorInfo: action.value
   });

  case VpnActionTypes.VpnApiReturnedError:
   return shallowCopy(state, {
    vpnApiError: action.value
   });

  case VpnActionTypes.LicenseInfoUpdated:
   return shallowCopy(state, {
    licenseInfo: action.value
   });

  case VpnActionTypes.VpnStatusUpdated:
   return shallowCopy(state, {
    vpnStatus: action.value
   });

  case VpnActionTypes.SelectGateway:
   return shallowCopy(state, {
    selectedGateway: action.value
   });

  case VpnActionTypes.IpAddressChanged:
   return shallowCopy(state, {
    ipAddress: action.value
   });

  case VpnActionTypes.ProductInfoUpdated:
   return shallowCopy(state, {
    productInfo: action.value
   });

  case VpnActionTypes.PublicIpChanged:
   return shallowCopy(state, {
    vpnIpAddresses: action.value
   });

  case VpnActionTypes.ReconnectingToAnotherGatewayStatusChanged:
   return shallowCopy(state, {
    didConnectDuringReconnecting: !1,
    isReconnectingToAnotherGateway: action.value
   });

  case VpnActionTypes.HandleNetworkConnectivityChange:
   return shallowCopy(state, {
    isConnectedToNetwork: action.value
   });

  case VpnActionTypes.SetNativeMessagingHostFound:
   return shallowCopy(state, {
    isNativeMessagingHostFound: action.value
   });

  case VpnActionTypes.SetIsInitialized:
   return shallowCopy(state, {
    isInitialized: action.value
   });

  case VpnActionTypes.Connect:
   if (state.isReconnectingToAnotherGateway) return shallowCopy(state, {
    didConnectDuringReconnecting: !0
   });
   break;

  case VpnActionTypes.AddNotification:
   return shallowCopy(state, {
    notifications: state.notifications.concat([ action.value ])
   });

  case VpnActionTypes.RemoveNotification:
   return shallowCopy(state, {
    notifications: state.notifications.filter(notification => notification !== action.value)
   });
  }
  return state;
 }
 const initialVpnState = {
  apiCompatibility: null,
  optimalGateway: null,
  activeGateway: null,
  gateways: [],
  lastError: null,
  errorInfo: null,
  vpnApiError: null,
  licenseInfo: null,
  vpnStatus: null,
  selectedGateway: null,
  ipAddress: "",
  isInitialized: !1,
  isReconnectingToAnotherGateway: !1,
  didConnectDuringReconnecting: !1,
  isConnectedToNetwork: !1,
  isNativeMessagingHostFound: !0,
  vpnClientApiVersion: null,
  vpnIpAddresses: null,
  productInfo: null,
  notifications: []
 }, vpnPersistedPaths = [ "licenseInfo", "productInfo", "selectedGateway" ], log$g = browser("management");
 function disableExtension(id) {
  return new Promise(resolve => {
   chrome.management.setEnabled(id, !1, () => {
    chrome.runtime.lastError ? log$g("could not disable extension %s: %s", id, chrome.runtime.lastError) : log$g("extension %s disabled", id), 
    resolve();
   });
  });
 }
 async function disableConflictingExtension(permission) {
  log$g("going to disable all extensions with %s permission", permission);
  const extensions = await new Promise(resolve => {
   chrome.management.getAll(result => {
    resolve(result);
   });
  });
  for (const extensionInfo of extensions) extensionInfo.id !== chrome.runtime.id && extensionInfo.enabled && extensionInfo.permissions && extensionInfo.permissions.includes(permission) && (log$g("trying to disable extension: %s / %s", extensionInfo.name, extensionInfo.id), 
  await disableExtension(extensionInfo.id));
 }
 let WebRtcActionTypes;
 !function(WebRtcActionTypes) {
  WebRtcActionTypes.IsSupportedChange = "webrtc.isSupportedChange", WebRtcActionTypes.IsAvailableChange = "webrtc.isAvailableChange", 
  WebRtcActionTypes.IsEnabledChange = "webrtc.isEnabledChange", WebRtcActionTypes.Toggle = "webrtc.toggle", 
  WebRtcActionTypes.DisableConflictingExtensions = "webrtc.disableConflictingExtensions";
 }(WebRtcActionTypes || (WebRtcActionTypes = {}));
 const webRtcActions_isAvailableChange = available => createAction(WebRtcActionTypes.IsAvailableChange, available), webRtcActions_isEnabledChange = enabled => createAction(WebRtcActionTypes.IsEnabledChange, enabled), webRtcActions_isSupportedChange = supported => createAction(WebRtcActionTypes.IsSupportedChange, supported);
 function webRtcActionGenerators(webRtc) {
  const generators = {};
  return generators[GlobalActionTypes.Startup] = () => {
   webRtc.init();
  }, generators[GlobalActionTypes.Installed] = () => {
   webRtc.installed();
  }, generators[WebRtcActionTypes.Toggle] = () => {
   webRtc.toggle();
  }, generators[WebRtcActionTypes.DisableConflictingExtensions] = async () => {
   await disableConflictingExtension("privacy"), webRtc.refreshSettings();
  }, generators;
 }
 function webRtcReducer(state, action) {
  switch (state = void 0 === state ? {} : state, action.type) {
  case WebRtcActionTypes.IsSupportedChange:
   return shallowCopy(state, {
    isSupported: action.value
   });

  case WebRtcActionTypes.IsEnabledChange:
   return shallowCopy(state, {
    isEnabled: action.value
   });

  case WebRtcActionTypes.IsAvailableChange:
   return shallowCopy(state, {
    isAvailable: action.value
   });
  }
  return state;
 }
 const initialWebRtcState = {
  isSupported: null,
  isAvailable: null,
  isEnabled: null
 }, webRtcPersistedPaths = [];
 let BrowserSettingLevelOfControl, ChromeWebRtcConfigValue;
 !function(BrowserSettingLevelOfControl) {
  BrowserSettingLevelOfControl.Controllable = "controllable_by_this_extension", BrowserSettingLevelOfControl.Controlled = "controlled_by_this_extension";
 }(BrowserSettingLevelOfControl || (BrowserSettingLevelOfControl = {})), function(ChromeWebRtcConfigValue) {
  ChromeWebRtcConfigValue.DisableNonProxiedUdp = "disable_non_proxied_udp", ChromeWebRtcConfigValue.Default = "default", 
  ChromeWebRtcConfigValue.ProxyOnly = "proxy_only";
 }(ChromeWebRtcConfigValue || (ChromeWebRtcConfigValue = {}));
 const log$h = browser("webRtc");
 class WebRtc {
  constructor(enableByDefault = !1) {
   _defineProperty(this, "enableByDefault", void 0), _defineProperty(this, "webRtcIpHandlingPolicy", void 0), 
   _defineProperty(this, "enabledValue", void 0), this.enableByDefault = enableByDefault, 
   chrome.privacy && chrome.privacy.network && (this.webRtcIpHandlingPolicy = chrome.privacy.network.webRTCIPHandlingPolicy, 
   this.enabledValue = runtimeInfo.browser === Browser.Firefox ? ChromeWebRtcConfigValue.ProxyOnly : ChromeWebRtcConfigValue.DisableNonProxiedUdp, 
   log$h("enabledValue", this.enabledValue));
  }
  init() {
   log$h("initializing");
   const isSupported = !!this.webRtcIpHandlingPolicy;
   dispatcher.dispatch(webRtcActions_isSupportedChange(isSupported)), isSupported && (this.webRtcIpHandlingPolicy.get({}, this.handleConfig.bind(this)), 
   this.webRtcIpHandlingPolicy.onChange && this.webRtcIpHandlingPolicy.onChange.addListener(this.handleConfig.bind(this)));
  }
  installed() {
   const state = dispatcher.getState();
   this.enableByDefault && !state.webRtc.isEnabled && (log$h("enabling by default"), 
   this.toggle());
  }
  toggle() {
   const state = dispatcher.getState();
   if (!state.webRtc.isSupported) return;
   const nextValue = state.webRtc.isEnabled ? ChromeWebRtcConfigValue.Default : this.enabledValue;
   this.webRtcIpHandlingPolicy.set({
    value: nextValue,
    scope: "regular"
   }, () => {
    this.webRtcIpHandlingPolicy.onChange || this.webRtcIpHandlingPolicy.get({}, this.handleConfig.bind(this));
   });
  }
  refreshSettings() {
   !!this.webRtcIpHandlingPolicy && this.webRtcIpHandlingPolicy.get({}, this.handleConfig.bind(this));
  }
  handleConfig(details) {
   log$h("handling settings change: %O", details);
   const state = dispatcher.getState(), currentAvailability = function(details) {
    return details.levelOfControl === BrowserSettingLevelOfControl.Controlled || details.levelOfControl === BrowserSettingLevelOfControl.Controllable;
   }(details);
   currentAvailability !== state.webRtc.isAvailable && dispatcher.dispatch(webRtcActions_isAvailableChange(currentAvailability));
   const isInControl = function(details) {
    return details.levelOfControl === BrowserSettingLevelOfControl.Controlled;
   }(details), isSet = details.value === this.enabledValue, currentState = isInControl && isSet;
   currentState !== state.webRtc.isEnabled && dispatcher.dispatch(webRtcActions_isEnabledChange(currentState));
  }
 }
 let burgerAdapter$1, defaultShepherdConfig$1, vpnBrowserActionAdapter$1;
 switch (buildTimeInfo.productId) {
 case ProductId.AvastVpnStandalone:
  burgerAdapter$1 = function(state) {
   const licenseInfo = state.vpn.licenseInfo, productInfo = state.vpn.productInfo, ipAddresses = state.vpn.vpnIpAddresses;
   let ipBuffer;
   if (ipAddresses && ipAddresses.original && ipAddresses.original.ip && ipAddresses.original.ip.includes(".") && state.vpn.vpnStatus === VpnStatus.Connected) try {
    const ipArray = ipAddresses.original.ip.split(".").map(part => parseInt(part, 10));
    ipBuffer = new Uint8Array(ipArray).buffer;
   } catch (e) {}
   return {
    geo: ipBuffer ? {
     ip: ipBuffer
    } : void 0,
    identity: {
     guid: state.analytics.guid,
     hwid: productInfo && productInfo.hardwareId ? productInfo.hardwareId : void 0
    },
    installation: {
     aiid: "",
     time: state.analytics.installationTime,
     action: BurgerSetupAction.NEW
    },
    license: licenseInfo ? {
     wallet_key: licenseInfo.walletKey ? licenseInfo.walletKey : void 0,
     container_id: licenseInfo.containerId ? licenseInfo.containerId : void 0,
     edition: BurgerLicenseEdition.AV_VPN,
     type: license2BurgerModeType(state.vpn.licenseInfo),
     subscription_mode: licenseInfo.autoRenewable,
     issued: licenseInfo.creationTimestamp ? 1e3 * licenseInfo.creationTimestamp : void 0,
     activation: licenseInfo.creationTimestamp ? 1e3 * licenseInfo.creationTimestamp : void 0,
     valid_thru: licenseInfo.expirationTimestamp ? 1e3 * licenseInfo.expirationTimestamp : void 0
    } : void 0,
    product: {
     id: 145,
     edition: 1,
     mode: license2BurgerModeType(state.vpn.licenseInfo),
     state: license2BurgerStateType(state.vpn.licenseInfo),
     lang: getLocale(),
     version_app: state.analytics.currentVersion,
     build: state.analytics.currentVersionBuild
    },
    shepherd: state.shepherd.configId && state.shepherd.configName && state.shepherd.configVersion ? {
     id: state.shepherd.configId,
     name: state.shepherd.configName,
     version: state.shepherd.configVersion
    } : void 0
   };
  }, defaultShepherdConfig$1 = defaultShepherdConfig, vpnBrowserActionAdapter$1 = function(vpnStatus) {
   const vpnState = dispatcher.getState().vpn, iconPaths = {
    ICONS_ACTIVE: [ {
     16: "img/icon16-active.png",
     32: "img/icon32-active.png"
    } ],
    ICONS_ALERT: [ {
     16: "img/icon16-alert.png",
     32: "img/icon32-alert.png"
    } ],
    ICONS_CONNECTING: [ {
     16: "img/icon16-connecting1.png",
     32: "img/icon32-connecting1.png"
    }, {
     16: "img/icon16-connecting2.png",
     32: "img/icon32-connecting2.png"
    }, {
     16: "img/icon16-connecting3.png",
     32: "img/icon32-connecting3.png"
    } ],
    ICONS_DEFAULT: [ {
     16: "img/icon16.png",
     32: "img/icon32.png"
    } ]
   };
   let paths, title;
   connectingAnimationTimer && (clearTimeout(connectingAnimationTimer), connectingAnimationTimer = null);
   const hasAlert = vpnState.notifications && vpnState.notifications.length > 0;
   switch (vpnStatus) {
   case VpnStatus.Connecting:
    title = ExtensionIconOverlayText.Connecting, paths = iconPaths.ICONS_CONNECTING;
    break;

   case VpnStatus.Reconnecting:
    title = ExtensionIconOverlayText.Reconnecting, paths = iconPaths.ICONS_CONNECTING;
    break;

   case VpnStatus.Connected:
    title = ExtensionIconOverlayText.Connected, paths = iconPaths.ICONS_ACTIVE;
    break;

   case VpnStatus.Disconnecting:
    title = ExtensionIconOverlayText.Disconnecting, paths = iconPaths.ICONS_CONNECTING;
    break;

   case VpnStatus.Disconnected:
   default:
    title = ExtensionIconOverlayText.Disconnected, paths = hasAlert ? iconPaths.ICONS_ALERT : iconPaths.ICONS_DEFAULT;
   }
   if (chrome.browserAction.setTitle({
    title: title
   }, () => {
    chrome.runtime.lastError;
   }), 1 === paths.length) setIcon(paths[0]); else {
    let index = 0;
    connectingAnimationTimer = setInterval(() => {
     index++, index >= paths.length && (index = 0), setIcon(paths[index]);
    }, 1e3), setIcon(paths[index]);
   }
  };
 }
 !async function(bootstrap) {
  await browserStorage.init();
  const {reducers: reducers, generators: generators, initialState: initialState, persistedPaths: persistedPaths} = bootstrap(browserStorage), persist = new StatePersist(browserStorage, persistedPaths), persistedState = persist.load();
  persistedState && (log$6("persisted state: %O", persistedState), Object.keys(persistedState).forEach(key => {
   initialState[key] && persistedState[key] && ("function" == typeof initialState[key] ? initialState[key] = initialState[key](persistedState[key]) : initialState[key] = {
    ...initialState[key],
    ...persistedState[key]
   });
  })), Object.keys(initialState).forEach(key => {
   "function" == typeof initialState[key] && (initialState[key] = initialState[key]());
  }), log$6("initial state: %O", initialState);
  const store = createStore$1(reducers, generators, initialState, persist);
  dispatcher.setStore(store), dispatcher.dispatch(globalActions_startup()), chrome.runtime.onMessage.addListener((function(msg, sender, callback) {
   if (msg.type) return dispatcher.dispatch({
    ...msg,
    meta: {
     sender: sender,
     callback: callback
    }
   }), void 0 !== callback;
  }));
 }((function(browserStorage) {
  const analytics = new AnalyticsBurger(browserStorage, burgerAdapter$1), shepherd = new Shepherd, vpn = new Vpn({
   vpnBrowserActionAdapter: vpnBrowserActionAdapter$1
  }), webRtc = new WebRtc, thankYou = new ThankYou;
  var defaultConfig;
  return {
   reducers: {
    [Feature.Analytics]: analyticsReducer,
    [Feature.Shepherd]: shepherdReducer,
    [Feature.Vpn]: vpnReducer,
    [Feature.WebRtc]: webRtcReducer
   },
   initialState: {
    [Feature.Analytics]: {
     ...initialAnalyticsState,
     ...analyticsUserConsent
    },
    [Feature.Shepherd]: (defaultConfig = defaultShepherdConfig$1, function(persistedState) {
     const initialConfigWithDefaults = mergeConfigs(initialShepherdState.config, defaultConfig), config = mergeConfigs(initialConfigWithDefaults, persistedState ? persistedState.config : null);
     return {
      ...initialShepherdState,
      ...persistedState,
      config: config
     };
    }),
    [Feature.Vpn]: initialVpnState,
    [Feature.WebRtc]: initialWebRtcState
   },
   persistedPaths: {
    [Feature.Analytics]: analyticsPersistedPaths,
    [Feature.Shepherd]: shepherdPersistedPaths,
    [Feature.Vpn]: vpnPersistedPaths,
    [Feature.WebRtc]: webRtcPersistedPaths
   },
   generators: [ actionGenerators, createAnalyticsActionGenerator(analytics), createShepherdActionGenerator(shepherd), createVpnActionGenerator(vpn), webRtcActionGenerators(webRtc), createThankYouActionGenerator(thankYou) ]
  };
 }));
}();
