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
  var BROWSER = "firefox";
  var TRANSMIT_STATS_DEFAULT = !browser;
  var ENABLED_DEFAULT = !browser;
  var CONTENT_FILTERS_STORAGE_KEY_PFX = "settings:content_filter";
  var ENABLED_STORAGE_KEY = "settings:enabled";
  var SITE_BLOCK_ALLOWLIST_STORAGE_KEY_PFX = "allow_site";
  var CATEGORIZATION_CACHE_PFX = "ctg";

  // ../common/lib/getCategorization.ts
  var import_fnv1a = __toESM(require_fnv1a(), 1);

  // ../common/lib/secondLevelDomains.ts
  var secondLevelDomains_default = {
    ac: ["com", "net", "gov", "org", "mil"],
    ae: ["co", "net", "gov", "ac", "sch", "org", "mil", "pro", "name"],
    af: ["com", "edu", "gov", "net", "org"],
    al: ["com", "edu", "gov", "mil", "net", "org"],
    ao: ["ed", "gv", "og", "co", "pb", "it"],
    ar: ["com", "edu", "gob", "gov", "gov", "int", "mil", "net", "org", "tur"],
    at: ["gv", "ac", "co", "or"],
    au: ["com", "net", "org", "edu", "gov", "csiro", "asn", "id"],
    ba: ["org", "net", "edu", "gov", "mil", "unsa", "untz", "unmo", "unbi", "unze", "co", "com", "rs"],
    bb: ["co", "com", "net", "org", "gov", "edu", "info", "store", "tv", "biz"],
    bh: ["com", "info", "cc", "edu", "biz", "net", "org", "gov"],
    bn: ["com", "edu", "gov", "net", "org"],
    bo: ["com", "net", "org", "tv", "mil", "int", "gob", "gov", "edu"],
    br: ["adm", "adv", "agr", "am", "arq", "art", "ato", "b", "bio", "blog", "bmd", "cim", "cng", "cnt", "com", "coop", "ecn", "edu", "eng", "esp", "etc", "eti", "far", "flog", "fm", "fnd", "fot", "fst", "g12", "ggf", "gov", "imb", "ind", "inf", "jor", "jus", "lel", "mat", "med", "mil", "mus", "net", "nom", "not", "ntr", "odo", "org", "ppg", "pro", "psc", "psi", "qsl", "rec", "slg", "srv", "tmp", "trd", "tur", "tv", "vet", "vlog", "wiki", "zlg"],
    bs: ["com", "net", "org", "edu", "gov"],
    bz: ["com", "edu", "gov", "net", "org"],
    ca: ["ab", "bc", "mb", "nb", "nf", "nl", "ns", "nt", "nu", "on", "pe", "qc", "sk", "yk"],
    ck: ["co", "org", "edu", "gov", "net", "gen", "biz", "info"],
    cn: ["ac", "com", "edu", "gov", "mil", "net", "org", "ah", "bj", "cq", "fj", "gd", "gs", "gz", "gx", "ha", "hb", "he", "hi", "hl", "hn", "jl", "js", "jx", "ln", "nm", "nx", "qh", "sc", "sd", "sh", "sn", "sx", "tj", "tw", "xj", "xz", "yn", "zj"],
    co: ["com", "org", "edu", "gov", "net", "mil", "nom"],
    cr: ["ac", "co", "ed", "fi", "go", "or", "sa"],
    cy: ["ac", "net", "gov", "org", "pro", "name", "ekloges", "tm", "ltd", "biz", "press", "parliament", "com"],
    do: ["edu", "gob", "gov", "com", "sld", "org", "net", "web", "mil", "art"],
    dz: ["com", "org", "net", "gov", "edu", "asso", "pol", "art"],
    ec: ["com", "info", "net", "fin", "med", "pro", "org", "edu", "gov", "mil"],
    eg: ["com", "edu", "eun", "gov", "mil", "name", "net", "org", "sci"],
    er: ["com", "edu", "gov", "mil", "net", "org", "ind", "rochest", "w"],
    es: ["com", "nom", "org", "gob", "edu"],
    et: ["com", "gov", "org", "edu", "net", "biz", "name", "info"],
    fj: ["ac", "biz", "com", "info", "mil", "name", "net", "org", "pro"],
    fk: ["co", "org", "gov", "ac", "nom", "net"],
    fr: ["tm", "asso", "nom", "prd", "presse", "com", "gouv"],
    gg: ["co", "net", "org"],
    gh: ["com", "edu", "gov", "org", "mil"],
    gn: ["com", "ac", "gov", "org", "net"],
    gr: ["com", "edu", "net", "org", "gov", "mil"],
    gt: ["com", "edu", "net", "gob", "org", "mil", "ind"],
    gu: ["com", "net", "gov", "org", "edu"],
    hk: ["com", "edu", "gov", "idv", "net", "org"],
    hu: ["2000", "agrar", "bolt", "casino", "city", "co", "erotica", "erotika", "film", "forum", "games", "hotel", "info", "ingatlan", "jogasz", "konyvelo", "lakas", "media", "news", "org", "priv", "reklam", "sex", "shop", "sport", "suli", "szex", "tm", "tozsde", "utazas", "video"],
    id: ["ac", "co", "net", "or", "web", "sch", "mil", "go", "war.net"],
    il: ["ac", "co", "org", "net", "k12", "gov", "muni", "idf"],
    in: ["4fd", "co", "firm", "net", "org", "gen", "ind", "ac", "edu", "res", "ernet", "gov", "mil", "nic", "nic"],
    iq: ["gov", "edu", "com", "mil", "org", "net"],
    ir: ["ac", "co", "gov", "id", "net", "org", "sch", "dnssec"],
    it: ["gov", "edu"],
    je: ["co", "net", "org"],
    jo: ["com", "net", "gov", "edu", "org", "mil", "name", "sch"],
    jp: ["ac", "ad", "co", "ed", "go", "gr", "lg", "ne", "or"],
    ke: ["co", "or", "ne", "go", "ac", "sc", "me", "mobi", "info"],
    kh: ["per", "com", "edu", "gov", "mil", "net", "org"],
    ki: ["com", "biz", "de", "net", "info", "org", "gov", "edu", "mob", "tel"],
    km: ["com", "coop", "asso", "nom", "presse", "tm", "medecin", "notaires", "pharmaciens", "veterinaire", "edu", "gouv", "mil"],
    kn: ["net", "org", "edu", "gov"],
    kr: ["co", "ne", "or", "re", "pe", "go", "mil", "ac", "hs", "ms", "es", "sc", "kg", "seoul", "busan", "daegu", "incheon", "gwangju", "daejeon", "ulsan", "gyeonggi", "gangwon", "chungbuk", "chungnam", "jeonbuk", "jeonnam", "gyeongbuk", "gyeongnam", "jeju"],
    kw: ["edu", "com", "net", "org", "gov"],
    ky: ["com", "org", "net", "edu", "gov"],
    kz: ["com", "edu", "gov", "mil", "net", "org"],
    lb: ["com", "edu", "gov", "net", "org"],
    lk: ["gov", "sch", "net", "int", "com", "org", "edu", "ngo", "soc", "web", "ltd", "assn", "grp", "hotel"],
    lr: ["com", "edu", "gov", "org", "net"],
    lv: ["com", "edu", "gov", "org", "mil", "id", "net", "asn", "conf"],
    ly: ["com", "net", "gov", "plc", "edu", "sch", "med", "org", "id"],
    ma: ["net", "ac", "org", "gov", "press", "co"],
    mc: ["tm", "asso"],
    me: ["co", "net", "org", "edu", "ac", "gov", "its", "priv"],
    mg: ["org", "nom", "gov", "prd", "tm", "edu", "mil", "com"],
    mk: ["com", "org", "net", "edu", "gov", "inf", "name", "pro"],
    ml: ["com", "net", "org", "edu", "gov", "presse"],
    mn: ["gov", "edu", "org"],
    mo: ["com", "edu", "gov", "net", "org"],
    mt: ["com", "org", "net", "edu", "gov"],
    mv: ["aero", "biz", "com", "coop", "edu", "gov", "info", "int", "mil", "museum", "name", "net", "org", "pro"],
    mw: ["ac", "co", "com", "coop", "edu", "gov", "int", "museum", "net", "org"],
    mx: ["com", "net", "org", "edu", "gob"],
    my: ["com", "net", "org", "gov", "edu", "sch", "mil", "name"],
    nf: ["com", "net", "arts", "store", "web", "firm", "info", "other", "per", "rec"],
    ng: ["com", "org", "gov", "edu", "net", "sch", "name", "mobi", "biz", "mil"],
    ni: ["gob", "co", "com", "ac", "edu", "org", "nom", "net", "mil"],
    np: ["com", "edu", "gov", "org", "mil", "net"],
    nr: ["edu", "gov", "biz", "info", "net", "org", "com"],
    om: ["com", "co", "edu", "ac", "sch", "gov", "net", "org", "mil", "museum", "biz", "pro", "med"],
    pe: ["edu", "gob", "nom", "mil", "sld", "org", "com", "net"],
    ph: ["com", "net", "org", "mil", "ngo", "i", "gov", "edu"],
    pk: ["com", "net", "edu", "org", "fam", "biz", "web", "gov", "gob", "gok", "gon", "gop", "gos"],
    pl: ["pwr", "com", "biz", "net", "art", "edu", "org", "ngo", "gov", "info", "mil", "waw", "warszawa", "wroc", "wroclaw", "krakow", "katowice", "poznan", "lodz", "gda", "gdansk", "slupsk", "radom", "szczecin", "lublin", "bialystok", "olsztyn", "torun", "gorzow", "zgora"],
    pr: ["biz", "com", "edu", "gov", "info", "isla", "name", "net", "org", "pro", "est", "prof", "ac"],
    ps: ["com", "net", "org", "edu", "gov", "plo", "sec"],
    pw: ["co", "ne", "or", "ed", "go", "belau"],
    ro: ["arts", "com", "firm", "info", "nom", "nt", "org", "rec", "store", "tm", "www"],
    rs: ["co", "org", "edu", "ac", "gov", "in"],
    sb: ["com", "net", "edu", "org", "gov"],
    sc: ["com", "net", "edu", "gov", "org"],
    sh: ["co", "com", "org", "gov", "edu", "net", "nom"],
    sl: ["com", "net", "org", "edu", "gov"],
    st: ["gov", "saotome", "principe", "consulado", "embaixada", "org", "edu", "net", "com", "store", "mil", "co"],
    sv: ["edu", "gob", "com", "org", "red"],
    sz: ["co", "ac", "org"],
    tr: ["com", "gen", "org", "biz", "info", "av", "dr", "pol", "bel", "tsk", "bbs", "k12", "edu", "name", "net", "gov", "web", "tel", "tv"],
    tt: ["co", "com", "org", "net", "biz", "info", "pro", "int", "coop", "jobs", "mobi", "travel", "museum", "aero", "cat", "tel", "name", "mil", "edu", "gov"],
    tw: ["edu", "gov", "mil", "com", "net", "org", "idv", "game", "ebiz", "club"],
    mu: ["com", "gov", "net", "org", "ac", "co", "or"],
    mz: ["ac", "co", "edu", "org", "gov"],
    na: ["com", "co"],
    nz: ["ac", "co", "cri", "geek", "gen", "govt", "health", "iwi", "maori", "mil", "net", "org", "parliament", "school"],
    pa: ["abo", "ac", "com", "edu", "gob", "ing", "med", "net", "nom", "org", "sld"],
    pt: ["com", "edu", "gov", "int", "net", "nome", "org", "publ"],
    py: ["com", "edu", "gov", "mil", "net", "org"],
    qa: ["com", "edu", "gov", "mil", "net", "org"],
    re: ["asso", "com", "nom"],
    ru: ["ac", "adygeya", "altai", "amur", "arkhangelsk", "astrakhan", "bashkiria", "belgorod", "bir", "bryansk", "buryatia", "cbg", "chel", "chelyabinsk", "chita", "chita", "chukotka", "chuvashia", "com", "dagestan", "e-burg", "edu", "gov", "grozny", "int", "irkutsk", "ivanovo", "izhevsk", "jar", "joshkar-ola", "kalmykia", "kaluga", "kamchatka", "karelia", "kazan", "kchr", "kemerovo", "khabarovsk", "khakassia", "khv", "kirov", "koenig", "komi", "kostroma", "kranoyarsk", "kuban", "kurgan", "kursk", "lipetsk", "magadan", "mari", "mari-el", "marine", "mil", "mordovia", "mosreg", "msk", "murmansk", "nalchik", "net", "nnov", "nov", "novosibirsk", "nsk", "omsk", "orenburg", "org", "oryol", "penza", "perm", "pp", "pskov", "ptz", "rnd", "ryazan", "sakhalin", "samara", "saratov", "simbirsk", "smolensk", "spb", "stavropol", "stv", "surgut", "tambov", "tatarstan", "tom", "tomsk", "tsaritsyn", "tsk", "tula", "tuva", "tver", "tyumen", "udm", "udmurtia", "ulan-ude", "vladikavkaz", "vladimir", "vladivostok", "volgograd", "vologda", "voronezh", "vrn", "vyatka", "yakutia", "yamal", "yekaterinburg", "yuzhno-sakhalinsk"],
    rw: ["ac", "co", "com", "edu", "gouv", "gov", "int", "mil", "net"],
    sa: ["com", "edu", "gov", "med", "net", "org", "pub", "sch"],
    sd: ["com", "edu", "gov", "info", "med", "net", "org", "tv"],
    se: ["a", "ac", "b", "bd", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "n", "o", "org", "p", "parti", "pp", "press", "r", "s", "t", "tm", "u", "w", "x", "y", "z"],
    sg: ["com", "edu", "gov", "idn", "net", "org", "per"],
    sn: ["art", "com", "edu", "gouv", "org", "perso", "univ"],
    sy: ["com", "edu", "gov", "mil", "net", "news", "org"],
    th: ["ac", "co", "go", "in", "mi", "net", "or"],
    tj: ["ac", "biz", "co", "com", "edu", "go", "gov", "info", "int", "mil", "name", "net", "nic", "org", "test", "web"],
    tn: ["agrinet", "com", "defense", "edunet", "ens", "fin", "gov", "ind", "info", "intl", "mincom", "nat", "net", "org", "perso", "rnrt", "rns", "rnu", "tourism"],
    tz: ["ac", "co", "go", "ne", "or"],
    ua: ["biz", "cherkassy", "chernigov", "chernovtsy", "ck", "cn", "co", "com", "crimea", "cv", "dn", "dnepropetrovsk", "donetsk", "dp", "edu", "gov", "if", "in", "ivano-frankivsk", "kh", "kharkov", "kherson", "khmelnitskiy", "kiev", "kirovograd", "km", "kr", "ks", "kv", "lg", "lugansk", "lutsk", "lviv", "me", "mk", "net", "nikolaev", "od", "odessa", "org", "pl", "poltava", "pp", "rovno", "rv", "sebastopol", "sumy", "te", "ternopil", "uzhgorod", "vinnica", "vn", "zaporizhzhe", "zhitomir", "zp", "zt"],
    ug: ["ac", "co", "go", "ne", "or", "org", "sc"],
    uk: ["ac", "bl", "british-library", "co", "cym", "gov", "govt", "icnet", "jet", "lea", "ltd", "me", "mil", "mod", "mod", "national-library-scotland", "nel", "net", "nhs", "nhs", "nic", "nls", "org", "orgn", "parliament", "parliament", "plc", "police", "sch", "scot", "soc"],
    us: ["4fd", "dni", "fed", "isa", "kids", "nsn"],
    uy: ["com", "edu", "gub", "mil", "net", "org"],
    ve: ["co", "com", "edu", "gob", "info", "mil", "net", "org", "web"],
    vi: ["co", "com", "k12", "net", "org"],
    vn: ["ac", "biz", "com", "edu", "gov", "health", "info", "int", "name", "net", "org", "pro"],
    ye: ["co", "com", "gov", "ltd", "me", "net", "org", "plc"],
    yu: ["ac", "co", "edu", "gov", "org"],
    za: ["ac", "agric", "alt", "bourse", "city", "co", "cybernet", "db", "ecape.school", "edu", "fs.school", "gov", "gp.school", "grondar", "iaccess", "imt", "inca", "kzn.school", "landesign", "law", "lp.school", "mil", "mpm.school", "ncape.school", "net", "ngo", "nis", "nom", "nw.school", "olivetti", "org", "pix", "school", "tm", "wcape.school", "web"],
    zm: ["ac", "co", "com", "edu", "gov", "net", "org", "sch"]
  };

  // ../common/lib/util.ts
  function getDomain(url) {
    url = new URL(url);
    const p = url.hostname.split(".");
    const t = p[p.length - 1];
    const t2 = p[p.length - 2];
    const n = secondLevelDomains_default[t] && secondLevelDomains_default[t].includes(t2) ? -3 : -2;
    return p.slice(n).join(".");
  }
  async function getStoredData(key, storage2 = "local", defaultValue = null) {
    const store = storage2 === "sync" ? chrome.storage.sync : storage2 === "session" ? chrome.storage.session : chrome.storage.local;
    const data = await new Promise((res) => store.get(key, res));
    return data && data.hasOwnProperty(key) ? data[key] : defaultValue;
  }
  function isHttp(url) {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
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

  // ../common/lib/enums/SiteBlockReason.ts
  var SiteBlockReason = /* @__PURE__ */ ((SiteBlockReason2) => {
    SiteBlockReason2["ContentFilter"] = "content_filter";
    SiteBlockReason2["HighRisk"] = "not_safe";
    return SiteBlockReason2;
  })(SiteBlockReason || {});
  var SiteBlockReason_default = SiteBlockReason;

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

  // ../common/lib/siteBlock.ts
  var storeKey = (domain, reason) => `${SITE_BLOCK_ALLOWLIST_STORAGE_KEY_PFX}:${reason}:${domain}`;
  async function getBlockReason(categories, risk) {
    let blockReason = null;
    let causes = null;
    if (risk === Risk_default.Red) {
      blockReason = SiteBlockReason_default.HighRisk;
      causes = Object.values(categories).filter((c) => c && c.highRisk).map((c) => c.id);
    } else if (categories.primary) {
      causes = await getFiltered([categories.primary.group]);
      if (causes.length) {
        blockReason = SiteBlockReason_default.ContentFilter;
      }
    }
    return {
      blockReason,
      causes
    };
  }
  async function isAllowlisted(domain, reason) {
    const val = await getStoredData(storeKey(domain, reason), "session");
    return val || false;
  }
  async function passOrBlock(tabId, originalUrl, categorization) {
    const { blockReason, causes } = await getBlockReason(categorization.categories, categorization.risk);
    if (blockReason) {
      const allowListed = await isAllowlisted(getDomain(originalUrl), blockReason);
      if (!allowListed) {
        const url = buildUrl(blockReason, originalUrl, causes || []);
        chrome.tabs.update(tabId, { url });
        log("Blocked site", originalUrl, blockReason);
        setIcon_default(tabId, Risk_default.Red);
        return true;
      } else {
        log("Is allowlisted", originalUrl);
      }
    }
    return false;
  }
  function buildUrl(reason, originalUrl, causes) {
    const url = new URL(chrome.runtime.getURL(`ui/${reason}/index.html`));
    url.searchParams.set("url", originalUrl);
    for (const categoryGroup of causes) {
      url.searchParams.set("c", categoryGroup);
    }
    return url.toString();
  }
  async function getFiltered(groups) {
    const filterSettings = await getSettings();
    return groups.filter((group) => filterSettings.get(group));
  }

  // ../common/background/categorization.ts
  var ignore = ({ url, frameId }) => frameId !== 0 || !isHttp(url);
  chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    if (!ignore(details)) {
      setIcon_default(details.tabId, null);
      const enabled = await getStoredData(ENABLED_STORAGE_KEY);
      if (enabled) {
        const categorization = await categorizeUrl_default(details.tabId, details.url);
        if (categorization) {
          passOrBlock(details.tabId, details.url, categorization);
        }
      }
    }
  });
  chrome.webNavigation.onCompleted.addListener(async (details) => {
    if (!ignore(details)) {
      const enabled = await getStoredData(ENABLED_STORAGE_KEY);
      enabled && categorizeUrl_default(details.tabId, details.url);
    }
  });
})();
