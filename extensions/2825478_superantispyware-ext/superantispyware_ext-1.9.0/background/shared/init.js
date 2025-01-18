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
  var DISTRIBUTION = "sas";
  var VERSION = "1.9.0";
  var BROWSER = "firefox";
  var ONBOARDING = "https://onboarding.superantispywareext.com/";
  var OFFBOARDING = "https://offboarding.superantispywareext.com/";
  var TRANSMIT_STATS_DEFAULT = !browser;
  var ENABLED_DEFAULT = !browser;
  var TEST_GROUP_STORAGE_KEY = "config:test_group";
  var TRANSMIT_STATS_STORAGE_KEY = "settings:transmit-stats";
  var ENABLED_STORAGE_KEY = "settings:enabled";
  var INSTALL_LOG_STORAGE_KEY = "install_log";
  var CATEGORIZATION_CACHE_PFX = "ctg";

  // ../common/lib/util.ts
  async function getStoredData(key, storage2 = "local", defaultValue = null) {
    const store2 = storage2 === "sync" ? chrome.storage.sync : storage2 === "session" ? chrome.storage.session : chrome.storage.local;
    const data = await new Promise((res) => store2.get(key, res));
    return data && data.hasOwnProperty(key) ? data[key] : defaultValue;
  }
  function isHttp(url) {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  }
  async function log(...args) {
    NODE_ENV === "development" && console.debug("[WSP]", ...args);
  }

  // ../common/lib/abTesting.ts
  async function getTestGroup() {
    let testGroup = await getStoredData(TEST_GROUP_STORAGE_KEY, "sync");
    if (!testGroup) {
      testGroup = getRandomArbitrary(1, 12);
      const storage2 = chrome.storage.sync || chrome.storage.local;
      await storage2.set({ [TEST_GROUP_STORAGE_KEY]: testGroup });
    }
    return testGroup;
  }
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // ../common/lib/api.ts
  var getUrl = (p) => new URL(`${API_URL}/v1/${p}`);
  async function getCategorization(target) {
    const url = getUrl("categorization");
    url.searchParams.append("t", target);
    return await get(url);
  }
  async function getDistribution() {
    const url = getUrl("distribution");
    return await get(url);
  }
  async function postInstallation(lsrc) {
    post(getUrl("installation"), { lsrc });
  }
  async function postUpdate() {
    post(getUrl("update"));
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
  async function post(url, body = {}) {
    const userConsentedToDataTransmission = await getStoredData(TRANSMIT_STATS_STORAGE_KEY);
    if (userConsentedToDataTransmission) {
      const grp = await getTestGroup();
      const wspHeader = [
        DISTRIBUTION,
        VERSION,
        BROWSER,
        grp.toString()
      ].join(" ");
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-WebScannerPro": wspHeader
          },
          body: JSON.stringify(body)
        });
        if (!response.ok) {
          console.error(response);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  // ../common/lib/installationLog.ts
  async function logInstall(lsrc) {
    postInstallation(lsrc);
    return await store("i");
  }
  async function logUpdate() {
    postUpdate();
    return await store("u");
  }
  async function getInstallationTs() {
    const entries = await load();
    return entries.length ? entries[0].ts : null;
  }
  async function store(evt) {
    const ts = Date.now();
    const entries = await load();
    entries.push({
      ts,
      evt,
      v: VERSION
    });
    chrome.storage.local.set({ [INSTALL_LOG_STORAGE_KEY]: entries });
    return ts;
  }
  async function load() {
    const entries = await getStoredData(INSTALL_LOG_STORAGE_KEY);
    return entries || [];
  }

  // ../common/lib/getCategorization.ts
  var import_fnv1a = __toESM(require_fnv1a(), 1);

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

  // ../common/lib/setIcon.ts
  function setIcon_default(tabId, risk) {
    const icon = risk || "icon";
    log("Set icon for tab", tabId, icon);
    const details = {
      tabId,
      path: {
        16: `/resources/icons/${icon}-16.png`,
        32: `/resources/icons/${icon}-32.png`,
        48: `/resources/icons/${icon}-48.png`,
        128: `/resources/icons/${icon}-128.png`
      }
    };
    if (chrome.browserAction) {
      chrome.browserAction.setIcon(details);
    } else {
      chrome.action.setIcon(details);
    }
  }

  // ../common/lib/categorizeUrl.ts
  async function categorizeUrl_default(tabId, url) {
    const categorization = await getCategorization_default(url);
    if (categorization) {
      setIcon_default(tabId, categorization.risk);
      return categorization;
    } else {
      setIcon_default(tabId, null);
    }
    return null;
  }

  // ../common/lib/setUninstallUrl.ts
  async function setUninstallUrl_default() {
    let url = "";
    if (OFFBOARDING) {
      const userConsentedToDataTransmission = await getStoredData(TRANSMIT_STATS_STORAGE_KEY);
      if (userConsentedToDataTransmission) {
        const grp = await getTestGroup();
        const lsrc = await getStoredData("lsrc");
        const instTs = await getInstallationTs();
        const offboardingUrl = new URL(OFFBOARDING);
        appendParams(offboardingUrl, grp, instTs, lsrc);
        const loggingUrl = new URL(`${API_URL}/v1/uninstallation`);
        appendParams(loggingUrl, grp, instTs, lsrc);
        loggingUrl.searchParams.append("redir", offboardingUrl.toString());
        url = loggingUrl.toString();
      } else {
        url = OFFBOARDING;
      }
    }
    log("Set UninstallURL", url);
    chrome.runtime.setUninstallURL(url);
  }
  function appendParams(url, grp, instTs, lsrc) {
    url.searchParams.append("brw", BROWSER);
    url.searchParams.append("v", VERSION);
    url.searchParams.append("dist", DISTRIBUTION);
    url.searchParams.append("grp", grp.toString());
    lsrc && url.searchParams.append("lsrc", lsrc);
    instTs && url.searchParams.append("instts", instTs.toString());
  }

  // ../common/background/init.ts
  var FIREFOX = BROWSER === "firefox";
  chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    const [lsrc, grp] = await Promise.all([
      fetchDistribution(),
      getTestGroup(),
      ensureDefaultTransmitStats(),
      ensureDefaultEnabled()
    ]);
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      log("Installing");
      setupOnboarding(grp);
      await logInstall(lsrc);
    } else if (reason === chrome.runtime.OnInstalledReason.UPDATE) {
      log("Updating");
      await logUpdate();
    }
    setUninstallUrl_default();
    refreshTabs();
    setupStorageAccess();
  });
  async function ensureDefaultEnabled() {
    let enabled = await getStoredData(ENABLED_STORAGE_KEY);
    if (enabled === null) {
      enabled = ENABLED_DEFAULT;
      chrome.storage.local.set({ [ENABLED_STORAGE_KEY]: enabled });
      log("Set default enabled", ENABLED_DEFAULT);
    }
    return enabled;
  }
  async function ensureDefaultTransmitStats() {
    let transmitStats = await getStoredData(TRANSMIT_STATS_STORAGE_KEY);
    if (transmitStats === null) {
      transmitStats = TRANSMIT_STATS_DEFAULT;
      chrome.storage.local.set({ [TRANSMIT_STATS_STORAGE_KEY]: transmitStats });
      log("Set default transmitStats", TRANSMIT_STATS_DEFAULT);
    }
    return transmitStats;
  }
  async function fetchDistribution() {
    const distribution = await getDistribution();
    const lsrc = distribution == null ? void 0 : distribution.lsrc;
    lsrc && chrome.storage.local.set({ lsrc });
    return lsrc;
  }
  function setupOnboarding(grp) {
    if (FIREFOX) {
      const INTERVAL = 200;
      const MAX_TRIES = 1e3 / INTERVAL * 20;
      firefoxLaunch(grp, 1, MAX_TRIES, INTERVAL);
    } else {
      openOnboardingTab(grp);
    }
  }
  async function firefoxLaunch(grp, n, maxTries, interval) {
    if (n >= maxTries) {
      openOnboardingTab(grp);
    } else {
      setTimeout(async () => {
        const engines = await browser.search.get();
        const spDefault = engines.some((e) => e.name === "Startpage" && e.isDefault);
        if (spDefault) {
          openOnboardingTab(grp);
        } else {
          firefoxLaunch(grp, n + 1, maxTries, interval);
        }
      }, interval);
    }
  }
  function openOnboardingTab(grp) {
    let url;
    if (FIREFOX) {
      url = chrome.runtime.getURL("/ui/onboarding/index.html");
    } else if (ONBOARDING) {
      const u = new URL(ONBOARDING);
      u.searchParams.append("brw", BROWSER);
      u.searchParams.append("tg", grp.toString());
      url = u.toString();
    }
    url && chrome.tabs.create({ url });
  }
  function setupStorageAccess() {
    if (BROWSER !== "firefox") {
      chrome.storage.session.setAccessLevel({
        accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS"
      });
    }
  }
  function refreshTabs() {
    chrome.tabs.query({}, async (tabs) => {
      for (const { id, url } of tabs) {
        if (id && url && isHttp(url)) {
          categorizeUrl_default(id, url);
        }
      }
    });
  }
})();
