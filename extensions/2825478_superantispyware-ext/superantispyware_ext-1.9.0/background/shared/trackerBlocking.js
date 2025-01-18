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

  // ../node_modules/lodash.uniq/index.js
  var require_lodash = __commonJS({
    "../node_modules/lodash.uniq/index.js"(exports, module) {
      var LARGE_ARRAY_SIZE = 200;
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var INFINITY = 1 / 0;
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      function arrayIncludes(array, value) {
        var length = array ? array.length : 0;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array ? array.length : 0;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        if (value !== value) {
          return baseFindIndex(array, baseIsNaN, fromIndex);
        }
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function isHostObject(value) {
        var result = false;
        if (value != null && typeof value.toString != "function") {
          try {
            result = !!(value + "");
          } catch (e) {
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      var arrayProto = Array.prototype;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var coreJsData = root["__core-js_shared__"];
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var objectToString = objectProto.toString;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      var splice = arrayProto.splice;
      var Map = getNative(root, "Map");
      var Set2 = getNative(root, "Set");
      var nativeCreate = getNative(Object, "create");
      function Hash(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
      }
      function hashDelete(key) {
        return this.has(key) && delete this.__data__[key];
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
      }
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map || ListCache)(),
          "string": new Hash()
        };
      }
      function mapCacheDelete(key) {
        return getMapData(this, key)["delete"](key);
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        getMapData(this, key).set(key, value);
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values) {
        var index = -1, length = values ? values.length : 0;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseUniq(array, iteratee, comparator) {
        var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
        if (comparator) {
          isCommon = false;
          includes = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set = iteratee ? null : createSet(array);
          if (set) {
            return setToArray(set);
          }
          isCommon = false;
          includes = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee ? [] : result;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee ? iteratee(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee) {
                seen.push(computed);
              }
              result.push(value);
            } else if (!includes(seen, computed, comparator)) {
              if (seen !== result) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
        return result;
      }
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values) {
        return new Set2(values);
      };
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function uniq2(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      function isFunction(value) {
        var tag = isObject(value) ? objectToString.call(value) : "";
        return tag == funcTag || tag == genTag;
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function noop() {
      }
      module.exports = uniq2;
    }
  });

  // ../common/background/trackerBlocking.ts
  var import_lodash = __toESM(require_lodash(), 1);

  // ../common/lib/consts.ts
  var NODE_ENV = "production";
  var BROWSER = "firefox";
  var TRANSMIT_STATS_DEFAULT = !browser;
  var ENABLED_DEFAULT = !browser;
  var TRACKER_BLOCKING_STORAGE_KEY = "privacy_protection";
  var TRACKER_BLOCKING_ALLOWLIST_STORAGE_KEY_PFX = "allow_trackers";
  var CSS_TRACKER_BLOCKING_STORAGE_KEY_PFX = "csstb";
  var TAB_STORAGE_KEY_PFX = "tab";
  var BLOCK_COUNT_STORAGE_KEY_SFX = "reqcnc";

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
  async function getStoredData(key, storage = "local", defaultValue = null) {
    const store = storage === "sync" ? chrome.storage.sync : storage === "session" ? chrome.storage.session : chrome.storage.local;
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

  // ../common/lib/blockCounter.ts
  var counts = {};
  var timer;
  var counterStoreKey = (tabId) => `${TAB_STORAGE_KEY_PFX}:${tabId}:${BLOCK_COUNT_STORAGE_KEY_SFX}`;
  function resetBlockCount(tabId) {
    if (timer) {
      clearTimeout(timer);
    }
    counts[tabId] = 0;
    storeBlockCount(tabId, counts[tabId]);
  }
  function storeBlockCount(tabId, count) {
    chrome.storage.session.set({ [counterStoreKey(tabId)]: count });
  }

  // ../common/lib/rules/toggleRules.ts
  var storageKey = (key) => `settings:ruleset_active:${key}`;
  async function areRulesetsActive(ruleSets, key) {
    if (BROWSER === "firefox") {
      return !!await getStoredData(storageKey(key), "local", true);
    } else {
      const enabled = await chrome.declarativeNetRequest.getEnabledRulesets();
      return enabled.includes(ruleSets[0]);
    }
  }
  async function enableRulesets(ruleSets, key) {
    if (BROWSER === "firefox") {
      chrome.runtime.sendMessage({ enableTrackerBlocking: true });
      chrome.storage.local.set({ [storageKey(key)]: true });
    } else {
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ruleSets
      });
    }
  }

  // ../common/lib/rules/trackerBlocking.ts
  var internationalBlockLists = [
    "easylist",
    "easyprivacy"
  ];
  var allowlistKey = (domain) => `${TRACKER_BLOCKING_ALLOWLIST_STORAGE_KEY_PFX}:${domain}`;
  async function isTrackerBlockingOn() {
    return await areRulesetsActive(
      internationalBlockLists,
      TRACKER_BLOCKING_STORAGE_KEY
    );
  }
  async function enableTrackerBlocking() {
    const ruleSets = await getAllFilterLists();
    enableRulesets(ruleSets, TRACKER_BLOCKING_STORAGE_KEY);
  }
  async function isDomainAllowlisted(domain) {
    const allowlisted = await getStoredData(allowlistKey(domain));
    return allowlisted || false;
  }
  async function getAllFilterLists() {
    return [
      ...internationalBlockLists,
      ...await getLocalizedBlockLists()
    ];
  }
  async function getLocalizedBlockLists() {
    const NORDIC = "nordic";
    const CZECHOSLOVAK = "czechoslovak";
    const RUSSIAN = "russian";
    const langMap = {
      be: RUSSIAN,
      cz: CZECHOSLOVAK,
      da: NORDIC,
      de: "german",
      es: "spanish",
      fi: NORDIC,
      fo: NORDIC,
      fr: "french",
      is: NORDIC,
      it: "italian",
      ky: RUSSIAN,
      kz: RUSSIAN,
      nb: NORDIC,
      nl: "dutch",
      nn: NORDIC,
      no: NORDIC,
      pl: "polish",
      pt: "portuguese",
      ru: RUSSIAN,
      sk: CZECHOSLOVAK,
      sv: NORDIC,
      tg: RUSSIAN,
      uk: RUSSIAN,
      uz: RUSSIAN
    };
    const ruleSets = /* @__PURE__ */ new Set();
    for (const lang of navigator.languages) {
      const ruleSetId = langMap[lang.substring(0, 2)];
      ruleSetId && ruleSets.add(ruleSetId);
    }
    return Array.from(ruleSets);
  }

  // ../common/background/trackerBlocking.ts
  var _globalBlockingCssFiles = void 0;
  var domainBlockKey = (domain) => `${CSS_TRACKER_BLOCKING_STORAGE_KEY_PFX}:${domain}`;
  chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === chrome.runtime.OnInstalledReason.UPDATE) {
      await clearCssBlockerDB();
    }
    enableTrackerBlocking();
    setupCssBlockerDB();
  });
  chrome.webRequest.onBeforeRequest.addListener(({ tabId }) => {
    resetBlockCount(tabId);
  }, {
    urls: ["http://*/*", "https://*/*"],
    types: [chrome.webRequest.ResourceType.MAIN_FRAME]
  });
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "loading" && tab.url) {
      const url = new URL(tab.url);
      const trackerBlockingOn = await isTrackerBlockingOn();
      if (trackerBlockingOn) {
        const domainAllowlisted = await isDomainAllowlisted(getDomain(url));
        if (!domainAllowlisted && isHttp(url)) {
          addGlobalBlockingCss(tabId);
          addDomainBlockingCss(tabId, url.hostname);
        }
      }
    }
  });
  chrome.tabs.onRemoved.addListener(async (tabId) => {
    const key = `${TAB_STORAGE_KEY_PFX}:${tabId}:${BLOCK_COUNT_STORAGE_KEY_SFX}`;
    setTimeout(() => chrome.storage.session.remove(key), 1e3);
  });
  async function clearCssBlockerDB() {
    log("Clearing CSS blocker DB");
    const items = BROWSER === "firefox" ? await browser.storage.local.get() : await chrome.storage.local.get(null);
    const keys = Object.keys(items).filter((key) => key.startsWith(CSS_TRACKER_BLOCKING_STORAGE_KEY_PFX));
    await chrome.storage.local.remove(keys);
    log("Cleared CSS blocker DB");
  }
  async function setupCssBlockerDB() {
    log("Building CSS blocker DB");
    const jsonPath = (file) => `/rules/css-selector-db/${file}.json`;
    const localizedBlockLists = await getLocalizedBlockLists();
    const files = [
      ...internationalBlockLists.map(jsonPath),
      ...localizedBlockLists.map(jsonPath)
    ];
    const items = {};
    for (const file of files) {
      log(`Adding ${file} CSS rules`);
      const response = await fetch(chrome.runtime.getURL(file));
      const fileData = await response.json();
      for (const [key, value] of Object.entries(fileData)) {
        if (!key.endsWith("#@")) {
          const storeKey = domainBlockKey(key);
          const curr = items[storeKey] || [];
          items[storeKey] = (0, import_lodash.default)([...curr, ...value]);
        }
      }
    }
    await chrome.storage.local.set(items);
    log("Built CSS blocker DB");
  }
  async function addGlobalBlockingCss(tabId) {
    const cssPath = (file) => `/content-scripts/shared/rules/${file}.css`;
    if (!_globalBlockingCssFiles) {
      const localizedBlockLists = await getLocalizedBlockLists();
      _globalBlockingCssFiles = [
        ...internationalBlockLists.map(cssPath),
        ...localizedBlockLists.map(cssPath)
      ];
    }
    if (BROWSER === "firefox") {
      for (const file of _globalBlockingCssFiles) {
        chrome.tabs.insertCSS(tabId, { file });
      }
    } else {
      chrome.scripting.insertCSS({
        target: { tabId },
        files: _globalBlockingCssFiles
      });
    }
  }
  async function addDomainBlockingCss(tabId, host) {
    const selectors = await getSelectors(host);
    if (selectors) {
      log("Adding domain blocker CSS", host);
      const selector = selectors.join(",");
      chrome.scripting.insertCSS({
        target: { tabId },
        css: `${selector}{visibility:hidden!important;display:none!important;}`
      });
    }
  }
  async function getSelectors(domain) {
    let data = await getStoredData(domainBlockKey(domain));
    if (!data) {
      const p = domain.split(".");
      if (p.length > 2) {
        p.shift();
        data = await getSelectors(p.join("."));
      }
    }
    return data;
  }
})();
