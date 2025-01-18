(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateWrapper = (obj, member, setter, getter) => ({
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  });
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };

  // ../node_modules/fnv1a/index.js
  var require_fnv1a = __commonJS({
    "../node_modules/fnv1a/index.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      hash.BASE = 2166136261;
      function hash(s, h = hash.BASE) {
        const l = s.length;
        for (let i = 0; i < l; i++) {
          h ^= s.charCodeAt(i);
          h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
        }
        return h >>> 0;
      }
      exports.default = hash;
      module.exports = hash;
    }
  });

  // ../common/lib/consts.ts
  var NODE_ENV = "production";
  var API_URL = "https://api.webscanner.pro";
  var BROWSER = "firefox";
  var TRANSMIT_STATS_DEFAULT = !browser;
  var ENABLED_DEFAULT = !browser;
  var ENABLE_ALL_CONTENT_FILTERS_STORAGE_KEY = "settings:enable_all_content_filters";
  var CONTENT_FILTERS_STORAGE_KEY_PFX = "settings:content_filter";
  var ENABLED_STORAGE_KEY = "settings:enabled";
  var CATEGORIZATION_CACHE_PFX = "ctg";

  // ../common/lib/getCategorization.ts
  var import_fnv1a = __toESM(require_fnv1a(), 1);

  // ../common/lib/util.ts
  function cssString(style) {
    return Object.entries(style).map(([k, v]) => `${k}:${v}`).join(";");
  }
  async function getStoredData(key, storage2 = "local", defaultValue = null) {
    const store = storage2 === "sync" ? chrome.storage.sync : storage2 === "session" ? chrome.storage.session : chrome.storage.local;
    const data = await new Promise((res) => store.get(key, res));
    return data && data.hasOwnProperty(key) ? data[key] : defaultValue;
  }
  async function log(...args) {
    NODE_ENV === "development" && console.debug("[WSP]", ...args);
  }

  // ../common/lib/api.ts
  var getUrl = (p) => new URL(`${API_URL}/v1/${p}`);
  async function getCategorization(target) {
    const url = getUrl("categorization");
    url.searchParams.append("t", target);
    return await get(url);
  }
  async function get(url) {
    let result = null;
    try {
      const response = await fetch(url);
      if (response.ok) {
        result = await response.json();
      } else {
        console.error(response);
      }
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  // ../common/lib/Cache.ts
  var STORE = BROWSER === "firefox" ? "local" : "session";
  var storage = STORE === "session" ? chrome.storage.session : chrome.storage.local;
  var Cache_default = class {
    /**
     * @param prefix - Unique data key prefix.
     */
    constructor(prefix) {
      this.prefix = prefix;
    }
    getFullKey(key) {
      return `cache:${this.prefix}:${key}`;
    }
    /**
     * Fetch data from cache.
     * @returns Data or null if doesn't exist.
     */
    async get(key) {
      const fullKey = this.getFullKey(key);
      const result = await getStoredData(fullKey, STORE);
      if (!result) {
        return null;
      }
      const now = /* @__PURE__ */ new Date();
      if (result.expires < now.getTime()) {
        storage.remove(fullKey);
        return null;
      }
      return result.data;
    }
    /**
     * Store data in the cache.
     */
    async set(key, value) {
      const fullKey = this.getFullKey(key);
      storage.set({ [fullKey]: new CacheData(value) });
    }
    /**
     * Clean expired items from the cache.
     */
    async clean() {
      const prefix = `cache:${this.prefix}`;
      const items = await storage.get(null);
      const now = (/* @__PURE__ */ new Date()).getTime();
      for (const [key, item] of Object.entries(items)) {
        if (key.startsWith(prefix) && item.expires < now) {
          storage.remove(key);
          log("Expiring", key);
        }
      }
    }
  };
  var CacheData = class {
    constructor(data) {
      const now = /* @__PURE__ */ new Date();
      this.expires = now.getTime() + 60 * 60 * 1e3;
      this.data = data;
    }
  };

  // ../common/lib/enums/Risk.ts
  var Risk = /* @__PURE__ */ ((Risk2) => {
    Risk2["Red"] = "red";
    Risk2["Orange"] = "orange";
    Risk2["Green"] = "green";
    Risk2["Grey"] = "grey";
    return Risk2;
  })(Risk || {});
  var Risk_default = Risk;

  // ../common/lib/getCategorization.ts
  async function getCategorization_default(url) {
    const cache = new Cache_default(CATEGORIZATION_CACHE_PFX);
    const { host } = new URL(url);
    const hash = (0, import_fnv1a.default)(host).toString(36);
    let categorization = await cache.get(hash);
    log(`Cached Categorization for ${host}`, categorization);
    if (!categorization) {
      categorization = await getCategorization(host);
      if (categorization) {
        fixUp(categorization);
        log(`Fetched Categorization for ${host}`, categorization);
        cache.set(hash, categorization);
      } else {
        log(`Fetching Categorization for ${host} failed`);
      }
    }
    return categorization;
  }
  function fixUp(categorization) {
    if (!categorization.risk) {
      categorization.risk = Risk_default.Grey;
    }
    if (!categorization.categories) {
      categorization.categories = {
        primary: null,
        secondary: null,
        security: null
      };
    }
    if (!categorization.categories.primary) {
      categorization.categories.primary = null;
    }
    if (!categorization.categories.secondary) {
      categorization.categories.secondary = null;
    }
    if (!categorization.categories.security) {
      categorization.categories.security = null;
    }
  }

  // ../common/lib/components/Badge.ts
  var _badge, _timeOut, _showTooltipDelayed, showTooltipDelayed_fn, _showTooltip, showTooltip_fn, _calculateLeft, calculateLeft_fn, _calculateTop, calculateTop_fn, _hideTooltip, hideTooltip_fn, _resetTooltip, resetTooltip_fn;
  var Badge = class {
    /**
     * @param img - Badge image.
     * @param tooltipElementId - ID of tooltip element.
     */
    constructor(badge, tooltipElementId) {
      /**
       * Show the tooltip after a delay.
       */
      __privateAdd(this, _showTooltipDelayed);
      /**
       * Show the tooltip. Will clear any tooltips already showing for other
       * badges.
       */
      __privateAdd(this, _showTooltip);
      /**
       * Calculates the left position of the tooltip so it doesn't render outside
       * the viewport.
       * @param rect - The DOMRect of the badge element.
       * @param element - The tooltip element.
       */
      __privateAdd(this, _calculateLeft);
      /**
       * Calculates the top position of the tooltip so it doesn't render outside
       * the viewport.
       * @param rect The DOMRect of the badge element.
       * @param element The tooltip element.
       */
      __privateAdd(this, _calculateTop);
      /**
       * Hide the tooltip or prevent it from showing if there's a current delay
       * waiting to finish.
       */
      __privateAdd(this, _hideTooltip);
      /**
       * Remove the tooltip element.
       */
      __privateAdd(this, _resetTooltip);
      __privateAdd(this, _badge, void 0);
      __privateAdd(this, _timeOut, void 0);
      this.tooltipFadeTime = 300;
      __privateSet(this, _badge, badge);
      this.tooltipElementId = tooltipElementId;
    }
    /**
     * Return an HTML element for the badge for insertion into an HTML
     * document.
     */
    getElement() {
      if (__privateGet(this, _badge)) {
        __privateGet(this, _badge).addEventListener("mouseenter", () => __privateMethod(this, _showTooltipDelayed, showTooltipDelayed_fn).call(this));
        __privateGet(this, _badge).addEventListener("mouseleave", () => __privateMethod(this, _hideTooltip, hideTooltip_fn).call(this));
        return __privateGet(this, _badge);
      }
      return null;
    }
    /**
     * Appends content to the tooltip element.
     * @param element - The tooltip element.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appendTooltipContent(element) {
    }
  };
  _badge = new WeakMap();
  _timeOut = new WeakMap();
  _showTooltipDelayed = new WeakSet();
  showTooltipDelayed_fn = function() {
    __privateSet(this, _timeOut, setTimeout(() => __privateMethod(this, _showTooltip, showTooltip_fn).call(this), 800));
  };
  _showTooltip = new WeakSet();
  showTooltip_fn = function() {
    __privateMethod(this, _resetTooltip, resetTooltip_fn).call(this);
    const element = document.createElement("div");
    element.id = this.tooltipElementId;
    element.style.transition = `${this.tooltipFadeTime}ms`;
    this.appendTooltipContent(element);
    document.body.prepend(element);
    const rect = __privateGet(this, _badge).getBoundingClientRect();
    const left = __privateMethod(this, _calculateLeft, calculateLeft_fn).call(this, rect, element);
    const top = __privateMethod(this, _calculateTop, calculateTop_fn).call(this, rect, element);
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    log("Positioning tooltip", left, top);
    element.style.opacity = "1";
  };
  _calculateLeft = new WeakSet();
  calculateLeft_fn = function(rect, element) {
    const MIN_LEFT_MARGIN = 10;
    const left = rect.x - element.offsetWidth / 2 + rect.width / 2;
    return left > MIN_LEFT_MARGIN ? left : MIN_LEFT_MARGIN;
  };
  _calculateTop = new WeakSet();
  calculateTop_fn = function(rect, element) {
    const MIN_BOTTOM_MARGIN = 10;
    const BADGE_MARGIN = 7;
    const maxY = window.scrollY + window.innerHeight - MIN_BOTTOM_MARGIN;
    const topY = window.scrollY + rect.y + rect.height + BADGE_MARGIN;
    const bottomY = topY + element.offsetHeight;
    return bottomY > maxY ? window.scrollY + rect.y - element.offsetHeight - BADGE_MARGIN : topY;
  };
  _hideTooltip = new WeakSet();
  hideTooltip_fn = function() {
    if (__privateGet(this, _timeOut)) {
      clearTimeout(__privateGet(this, _timeOut));
      __privateSet(this, _timeOut, -1);
    }
    const element = document.getElementById(this.tooltipElementId);
    if (element) {
      element.style.opacity = "0";
      setTimeout(() => __privateMethod(this, _resetTooltip, resetTooltip_fn).call(this), this.tooltipFadeTime);
    }
  };
  _resetTooltip = new WeakSet();
  resetTooltip_fn = function() {
    const element = document.getElementById(this.tooltipElementId);
    if (element) {
      element.remove();
    }
  };

  // ../common/lib/components/SafetyBadge.ts
  var TICK_CLASS_NAME = "webscannerpro_tick";
  var SafetyBadge_default = class extends Badge {
    /**
     * @param categorization - Categorization of website.
     * @param style - Object of CSS values.
     */
    constructor({ categorized, risk }, style) {
      if (!categorized) {
        risk = Risk_default.Grey;
      }
      const span = document.createElement("span");
      span.style.cssText = cssString(style);
      span.classList.add(TICK_CLASS_NAME);
      span.classList.add(`webscannerpro_${risk}`);
      super(span, "webscannerpro_tooltip");
      this.categorized = categorized;
      this.risk = risk;
    }
    draw(target) {
      const badge = super.getElement();
      if (badge) {
        badge.onclick = () => false;
        if (!hasChildNodeWithClass(target, TICK_CLASS_NAME)) {
          target.prepend(badge);
        }
      }
    }
    /**
     * Append content to tooltip element.
     * @param element - Tooltip element.
     */
    appendTooltipContent(element) {
      element.append(this.buildTooltipBadgeEl());
      element.append(this.buildTooltipMsgEl());
      element.append(this.buildTooltipLogoEl());
      element.classList.add(`webscannerpro_${this.risk}`);
    }
    /**
     * Create a HTML element containing safety message.
     */
    buildTooltipMsgEl() {
      const el = document.createElement("div");
      el.classList.add("webscannerpro_msg");
      el.innerHTML = chrome.i18n.getMessage(this.getMsgKey());
      return el;
    }
    /**
     * Create a HTML element for holding the logo.
     */
    buildTooltipLogoEl() {
      const el = document.createElement("div");
      el.classList.add("webscannerpro_logo");
      return el;
    }
    /**
     * Create a HTML element for holding the badge.
     */
    buildTooltipBadgeEl() {
      const el = document.createElement("div");
      el.classList.add("webscannerpro_badge");
      return el;
    }
    /**
     * @returns Safety message key.
     */
    getMsgKey() {
      if (!this.categorized || this.risk === Risk_default.Grey) {
        return "website_safety_unknown";
      }
      if (this.risk === Risk_default.Green) {
        return "website_safety_safe";
      }
      return "website_safety_unsafe";
    }
  };
  function hasChildNodeWithClass(element, className) {
    for (let i = 0; i < element.childNodes.length; i++) {
      const childNode = element.childNodes[i];
      if (childNode.nodeType === Node.ELEMENT_NODE) {
        const childEl = childNode;
        if (childEl.classList.contains(className)) {
          return true;
        }
      }
    }
    return false;
  }

  // ../common/lib/categoryGroups.ts
  var categoryGroups_default = [
    "drinking_smoking_gambling",
    "illegal_activities_drugs",
    "dangerous_harmful",
    "weapons",
    "adult"
  ];

  // ../common/lib/contentFilters.ts
  var groupStorageKey = (group) => `${CONTENT_FILTERS_STORAGE_KEY_PFX}:${group}`;
  async function getSettings() {
    const settings = /* @__PURE__ */ new Map();
    const promises = [];
    for (const group of categoryGroups_default) {
      promises.push(getStoredData(groupStorageKey(group), "sync"));
    }
    const results = await Promise.all(promises);
    for (let i = 0; i < results.length; i++) {
      settings.set(categoryGroups_default[i], !!results[i]);
    }
    log("Loaded Settings", settings);
    return settings;
  }
  async function getEnableAll() {
    return await getStoredData(ENABLE_ALL_CONTENT_FILTERS_STORAGE_KEY, "sync");
  }

  // ../common/lib/SearchResultToggler.ts
  var _enableAllFilters, _blockableResults, _contentFilters, _toggleResults, toggleResults_fn;
  var SearchResultToggler_default = class {
    constructor() {
      /**
       * Hide or show search results of certain category groups.
       * @param - Category groups to toggle.
       * @param - True if the search results should be hidden.
       */
      __privateAdd(this, _toggleResults);
      __privateAdd(this, _enableAllFilters, false);
      __privateAdd(this, _blockableResults, /* @__PURE__ */ new Map());
      __privateAdd(this, _contentFilters, void 0);
    }
    async init() {
      [
        __privateWrapper(this, _enableAllFilters)._,
        __privateWrapper(this, _contentFilters)._
      ] = await Promise.all([
        getEnableAll(),
        getSettings()
      ]);
      for (const key of __privateGet(this, _contentFilters).keys()) {
        __privateGet(this, _blockableResults).set(key, []);
      }
      chrome.runtime.onMessage.addListener((message) => {
        if (message.hasOwnProperty("contentFilters")) {
          __privateMethod(this, _toggleResults, toggleResults_fn).call(this, message.contentFilters, message.on);
        }
      });
    }
    /**
     * Make element reactivly hide or show depending on content filter setting.
     */
    toggle(element, categories) {
      const group = categories.primary ? categories.primary.group : null;
      if (group) {
        const on = __privateGet(this, _contentFilters).get(group) || __privateGet(this, _enableAllFilters);
        element.style.display = display(on);
        const blockableGroup = __privateGet(this, _blockableResults).get(group);
        if (blockableGroup) {
          blockableGroup.push(element);
        }
      }
    }
  };
  _enableAllFilters = new WeakMap();
  _blockableResults = new WeakMap();
  _contentFilters = new WeakMap();
  _toggleResults = new WeakSet();
  toggleResults_fn = function(contentFilters, on) {
    const displayValue = display(on);
    for (const group of contentFilters) {
      for (const element of __privateGet(this, _blockableResults).get(group) || []) {
        element.style.display = displayValue;
      }
    }
  };
  var display = (on) => on ? "none" : "block";

  // ../common/content-scripts/serps/bing.ts
  (async () => {
    const enabled = await getStoredData(ENABLED_STORAGE_KEY);
    if (enabled) {
      const searchResultToggler = new SearchResultToggler_default();
      await searchResultToggler.init();
      processResults(searchResultToggler);
      setInterval(() => {
        processResults(searchResultToggler);
      }, 2e3);
    }
  })();
  var ATTR_NAME = "data-wsp-scanned";
  function processResults(searchResultToggler) {
    processWebResultsAndPageRecommendations(searchResultToggler);
    processQnAResults(searchResultToggler);
  }
  function processWebResultsAndPageRecommendations(searchResultToggler) {
    const Q = `#b_results li.b_algo:not([${ATTR_NAME}])`;
    const items = document.querySelectorAll(Q);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const cite = item.querySelector("cite");
      if (!cite) {
        item.setAttribute(ATTR_NAME, "1");
        log("Missing CITE element.");
        continue;
      }
      if (cite.innerText) {
        item.setAttribute(ATTR_NAME, "1");
      } else {
        continue;
      }
      getCategorization_default(cite.innerText).then((categorization) => {
        if (!categorization) {
          log("Failed getting categorization.");
          return;
        }
        searchResultToggler.toggle(item, categorization.categories);
        const h2 = item.querySelector("h2");
        if (!h2) {
          log("Missing H2 element.");
          return;
        }
        const safetyBadge = new SafetyBadge_default(categorization, {
          width: "15px",
          height: "15px",
          "margin-right": "5px"
        });
        safetyBadge.draw(h2);
      });
      const Q2 = `.pageRecoContainer .pagereco_TRow:not([${ATTR_NAME}])`;
      const recoItems = item.querySelectorAll(Q2);
      for (let i2 = 0; i2 < recoItems.length; i2++) {
        const recoItem = recoItems[i2];
        recoItem.setAttribute(ATTR_NAME, "1");
        const recoA = recoItem.querySelector("a");
        if (!recoA) {
          log("Missing A element for page recommendation.");
          continue;
        }
        getCategorization_default(recoA.href).then((categorization) => {
          if (!categorization) {
            log("Failed getting categorization.");
            return;
          }
          searchResultToggler.toggle(item, categorization.categories);
          const recoTarget = recoA.querySelector("div");
          if (!recoTarget) {
            log("Missing DIV element for page recommendation.");
            return;
          }
          const recoSafetyBadge = new SafetyBadge_default(categorization, {
            height: "13px",
            margin: "1px 6px 0 0"
          });
          recoSafetyBadge.draw(recoTarget);
        });
      }
    }
  }
  function processQnAResults(searchResultToggler) {
    const Q = `#relatedQnAListDisplay .slide:not([${ATTR_NAME}]`;
    const items = document.querySelectorAll(Q);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.setAttribute(ATTR_NAME, "1");
      const a = item.querySelector("h2 a");
      getCategorization_default(a.href).then((categorization) => {
        if (!categorization) {
          log("Failed getting categorization.");
          return;
        }
        searchResultToggler.toggle(item, categorization.categories);
        const safetyBadge = new SafetyBadge_default(categorization, {
          height: "12px",
          "margin-right": "4px"
        });
        const target = a.parentElement;
        safetyBadge.draw(target);
      });
    }
  }
})();
