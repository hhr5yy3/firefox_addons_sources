var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const popup = "";
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (element_src === url)
    return true;
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data)
    return;
  text2.data = /** @type {string} */
  data;
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
const API_URL = "https://api.webscanner.pro";
const DISTRIBUTION = "sas";
const VERSION = "1.9.0";
const BROWSER = "firefox";
const TITLE = "SUPERAntiSpyware Ext";
const OFFBOARDING = "https://offboarding.superantispywareext.com/";
!browser;
!browser;
const TRACKER_BLOCKING_STORAGE_KEY = "privacy_protection";
const GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_STORAGE_KEY = "google_sign_in_prompt_suppression";
const GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_RULE_SET_ID = "suppress-sign-in-with-google";
const QS_PARAM_STRIPPING_RULE_STORAGE_KEY = "tracking_query_parameter_stripping";
const QS_PARAM_STRIPPING_RULE_SET_ID = "strip-tracking-query-parameters";
const TEST_GROUP_STORAGE_KEY = "config:test_group";
const CONTENT_FILTERS_STORAGE_KEY_PFX = "settings:content_filter";
const TRANSMIT_STATS_STORAGE_KEY = "settings:transmit-stats";
const ENABLED_STORAGE_KEY = "settings:enabled";
const INSTALL_LOG_STORAGE_KEY = "install_log";
const TRACKER_BLOCKING_ALLOWLIST_STORAGE_KEY_PFX = "allow_trackers";
const SITE_BLOCK_ALLOWLIST_STORAGE_KEY_PFX = "allow_site";
const TAB_STORAGE_KEY_PFX = "tab";
const BLOCK_COUNT_STORAGE_KEY_SFX = "reqcnc";
const CATEGORIZATION_CACHE_PFX = "ctg";
const PRIVACY_ASSESSMENT_CACHE_PFX = "pcy";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var fnv1a$1 = { exports: {} };
(function(module, exports) {
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
})(fnv1a$1, fnv1a$1.exports);
var fnv1aExports = fnv1a$1.exports;
const fnv1a = /* @__PURE__ */ getDefaultExportFromCjs(fnv1aExports);
const secondLvlDomains = {
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
async function getActiveTab() {
  const query = {
    active: true,
    currentWindow: true
  };
  const tabs = await new Promise((resolve) => chrome.tabs.query(query, resolve));
  return tabs.length ? tabs[0] : null;
}
function getDomain(url) {
  url = new URL(url);
  const p = url.hostname.split(".");
  const t = p[p.length - 1];
  const t2 = p[p.length - 2];
  const n = secondLvlDomains[t] && secondLvlDomains[t].includes(t2) ? -3 : -2;
  return p.slice(n).join(".");
}
function getMessage(messageName) {
  const BROWSER_NAME = "Firefox";
  return chrome.i18n.getMessage(messageName).replace(/<BROWSER>/g, BROWSER_NAME).replace(/<TITLE>/g, TITLE);
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
}
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
const getUrl = (p) => new URL(`${API_URL}/v1/${p}`);
async function getCategorization$1(target) {
  const url = getUrl("categorization");
  url.searchParams.append("t", target);
  return await get(url);
}
async function getPrivacyAssessment$1(target) {
  const url = getUrl("assessment");
  url.searchParams.append("t", target);
  return await get(url);
}
async function postEnabling() {
  post(getUrl("enabling"));
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
const STORE = "local";
const storage = chrome.storage.local;
class Cache {
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
}
class CacheData {
  constructor(data) {
    const now = /* @__PURE__ */ new Date();
    this.expires = now.getTime() + 60 * 60 * 1e3;
    this.data = data;
  }
}
var Risk = /* @__PURE__ */ ((Risk2) => {
  Risk2["Red"] = "red";
  Risk2["Orange"] = "orange";
  Risk2["Green"] = "green";
  Risk2["Grey"] = "grey";
  return Risk2;
})(Risk || {});
async function getCategorization(url) {
  const cache = new Cache(CATEGORIZATION_CACHE_PFX);
  const { host } = new URL(url);
  const hash = fnv1a(host).toString(36);
  let categorization = await cache.get(hash);
  log(`Cached Categorization for ${host}`, categorization);
  if (!categorization) {
    categorization = await getCategorization$1(host);
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
    categorization.risk = Risk.Grey;
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
async function getPrivacyAssessment(domain) {
  const cache = new Cache(PRIVACY_ASSESSMENT_CACHE_PFX);
  const hash = fnv1a(domain).toString(36);
  let privacyAssessment = await cache.get(hash);
  log(`Cached Privacy Assessment for ${domain}`, privacyAssessment);
  if (!privacyAssessment) {
    privacyAssessment = await getPrivacyAssessment$1(domain);
    if (privacyAssessment) {
      log(`Fetched Privacy Assessment for ${domain}`, privacyAssessment);
      cache.set(hash, privacyAssessment);
    } else {
      log(`Fetching Privacy Assessment for ${domain} failed`);
    }
  }
  return privacyAssessment;
}
const categoryGroups = [
  "drinking_smoking_gambling",
  "illegal_activities_drugs",
  "dangerous_harmful",
  "weapons",
  "adult"
];
function setIcon(tabId, risk) {
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
var SiteBlockReason = /* @__PURE__ */ ((SiteBlockReason2) => {
  SiteBlockReason2["ContentFilter"] = "content_filter";
  SiteBlockReason2["HighRisk"] = "not_safe";
  return SiteBlockReason2;
})(SiteBlockReason || {});
const storeKey = (domain, reason) => `${SITE_BLOCK_ALLOWLIST_STORAGE_KEY_PFX}:${reason}:${domain}`;
const blockPageUrl = (reason) => chrome.runtime.getURL(`ui/${reason}/index.html`);
async function getBlockReason(categories, risk) {
  let blockReason = null;
  let causes = null;
  if (risk === Risk.Red) {
    blockReason = SiteBlockReason.HighRisk;
    causes = Object.values(categories).filter((c) => c && c.highRisk).map((c) => c.id);
  } else if (categories.primary) {
    causes = await getFiltered([categories.primary.group]);
    if (causes.length) {
      blockReason = SiteBlockReason.ContentFilter;
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
      setIcon(tabId, Risk.Red);
      return true;
    } else {
      log("Is allowlisted", originalUrl);
    }
  }
  return false;
}
function isBlockPage(url) {
  if (url.startsWith(blockPageUrl(SiteBlockReason.ContentFilter))) {
    return SiteBlockReason.ContentFilter;
  }
  if (url.startsWith(blockPageUrl(SiteBlockReason.HighRisk))) {
    return SiteBlockReason.HighRisk;
  }
  return null;
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
const groupStorageKey = (group) => `${CONTENT_FILTERS_STORAGE_KEY_PFX}:${group}`;
async function getSettings() {
  const settings = /* @__PURE__ */ new Map();
  const promises = [];
  for (const group of categoryGroups) {
    promises.push(getStoredData(groupStorageKey(group), "sync"));
  }
  const results = await Promise.all(promises);
  for (let i = 0; i < results.length; i++) {
    settings.set(categoryGroups[i], !!results[i]);
  }
  log("Loaded Settings", settings);
  return settings;
}
function getStore() {
  return chrome.storage.sync || chrome.storage.local;
}
function saveSetting(group, on) {
  log("Save Setting", group, on);
  getStore().set({ [groupStorageKey(group)]: on });
  chrome.tabs.query({}, async (tabs) => {
    var _a, _b;
    for (const { id, url } of tabs) {
      if (id && url) {
        if (on && isHttp(url)) {
          const categorization = await getCategorization(url);
          categorization && passOrBlock(id, url, categorization);
        } else if (!on && isBlockPage(url) === SiteBlockReason.ContentFilter) {
          const params = new URL(url).searchParams;
          const originUrl = params.get("url");
          if (originUrl) {
            const categorization = await getCategorization(originUrl);
            const primary = (_b = (_a = categorization == null ? void 0 : categorization.categories) == null ? void 0 : _a.primary) == null ? void 0 : _b.group;
            if (primary && params.getAll("c").includes(primary)) {
              chrome.tabs.update(id, { url: originUrl });
            }
          }
        }
      }
    }
  });
}
const storageKey = (key) => `settings:ruleset_active:${key}`;
async function areRulesetsActive(ruleSets, key) {
  {
    return !!await getStoredData(storageKey(key), "local", true);
  }
}
async function enableRulesets(ruleSets, key) {
  {
    chrome.runtime.sendMessage({ enableTrackerBlocking: true });
    chrome.storage.local.set({ [storageKey(key)]: true });
  }
}
async function disableRulesets(ruleSets, key) {
  {
    chrome.runtime.sendMessage({ enableTrackerBlocking: false });
    chrome.storage.local.set({ [storageKey(key)]: false });
  }
}
const internationalBlockLists = [
  "easylist",
  "easyprivacy"
];
const allowlistKey = (domain) => `${TRACKER_BLOCKING_ALLOWLIST_STORAGE_KEY_PFX}:${domain}`;
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
async function disableTrackerBlocking() {
  const ruleSets = await getAllFilterLists();
  disableRulesets(ruleSets, TRACKER_BLOCKING_STORAGE_KEY);
}
async function getAllowlistedDomains() {
  const domains = [];
  const all = await new Promise((res) => chrome.storage.local.get(null, res));
  for (const [key, value] of Object.entries(all)) {
    const [pfx, domain] = key.split(":");
    if (pfx === TRACKER_BLOCKING_ALLOWLIST_STORAGE_KEY_PFX && value) {
      domains.push(domain);
    }
  }
  return domains;
}
function addDomainToAllowlist(domain) {
  {
    browser.runtime.sendMessage({ addTrackerBlockingDomainExemption: domain });
  }
  return chrome.storage.local.set({ [allowlistKey(domain)]: true });
}
function removeDomainFromAllowlist(domain) {
  {
    browser.runtime.sendMessage({ removeTrackerBlockingDomainExemption: domain });
  }
  return chrome.storage.local.remove(allowlistKey(domain));
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
async function enableGoogleSignInSuppression() {
  enableRulesets(
    [GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_RULE_SET_ID],
    GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_STORAGE_KEY
  );
}
async function disableGoogleSignInSuppression() {
  disableRulesets(
    [GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_RULE_SET_ID],
    GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_STORAGE_KEY
  );
}
async function enableQsParamStripping() {
  enableRulesets(
    [QS_PARAM_STRIPPING_RULE_SET_ID],
    QS_PARAM_STRIPPING_RULE_STORAGE_KEY
  );
}
async function disableQsParamStripping() {
  disableRulesets(
    [QS_PARAM_STRIPPING_RULE_SET_ID],
    QS_PARAM_STRIPPING_RULE_STORAGE_KEY
  );
}
async function setTrackerBlocking(trackerBlockingOn) {
  const promises = trackerBlockingOn ? [
    enableTrackerBlocking(),
    enableGoogleSignInSuppression(),
    enableQsParamStripping()
  ] : [
    disableTrackerBlocking(),
    disableGoogleSignInSuppression(),
    disableQsParamStripping()
  ];
  await Promise.all(promises);
}
var View;
(function(View2) {
  View2[View2["Main"] = 0] = "Main";
  View2[View2["Menu"] = 1] = "Menu";
  View2[View2["TrackerBlocking"] = 2] = "TrackerBlocking";
  View2[View2["Policy"] = 3] = "Policy";
  View2[View2["ContentFilters"] = 4] = "ContentFilters";
  View2[View2["BlockedHighRisk"] = 5] = "BlockedHighRisk";
  View2[View2["Empty"] = 6] = "Empty";
  View2[View2["Settings"] = 7] = "Settings";
  View2[View2["Disabled"] = 8] = "Disabled";
  View2[View2["Offline"] = 9] = "Offline";
})(View || (View = {}));
const View$1 = View;
const SafetyLarge_svelte_svelte_type_style_lang = "";
function create_else_block_1$2(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "data-t", "site-risk--grey");
      if (!src_url_equal(img.src, img_src_value = "/resources/site-risk-questionmark.svg"))
        attr(img, "src", img_src_value);
      attr(img, "height", "40");
      attr(img, "alt", "");
      attr(img, "class", "svelte-fnez1n");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
function create_if_block_4$3(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "data-t", "site-risk--red");
      if (!src_url_equal(img.src, img_src_value = "/resources/site-risk-cross.svg"))
        attr(img, "src", img_src_value);
      attr(img, "height", "40");
      attr(img, "alt", "");
      attr(img, "class", "svelte-fnez1n");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
function create_if_block_3$4(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "data-t", "site-risk--green");
      if (!src_url_equal(img.src, img_src_value = "/resources/site-risk-tick.svg"))
        attr(img, "src", img_src_value);
      attr(img, "height", "40");
      attr(img, "alt", "");
      attr(img, "class", "svelte-fnez1n");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
function create_if_block_2$4(ctx) {
  let p;
  let t;
  return {
    c() {
      p = element("p");
      t = text(
        /*domain*/
        ctx[1]
      );
      attr(p, "data-t", "site-risk--domain");
      attr(p, "class", "domain svelte-fnez1n");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*domain*/
      2)
        set_data(
          t,
          /*domain*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_else_block$5(ctx) {
  let p;
  let raw_value = (
    /*getMessageB*/
    ctx[2]("website_safety_unknown") + ""
  );
  return {
    c() {
      p = element("p");
      attr(p, "data-t", "site-risk--unknown");
      attr(p, "class", "svelte-fnez1n");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      p.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_if_block_1$b(ctx) {
  let p;
  let raw_value = (
    /*getMessageB*/
    ctx[2]("website_safety_unsafe") + ""
  );
  return {
    c() {
      p = element("p");
      attr(p, "data-t", "site-risk--not-safe");
      attr(p, "class", "svelte-fnez1n");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      p.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_if_block$d(ctx) {
  let p;
  let raw_value = (
    /*getMessageB*/
    ctx[2]("website_safety_safe") + ""
  );
  return {
    c() {
      p = element("p");
      attr(p, "data-t", "site-risk--safe");
      attr(p, "class", "svelte-fnez1n");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      p.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_fragment$o(ctx) {
  let div1;
  let t0;
  let div0;
  let t1;
  function select_block_type(ctx2, dirty) {
    if (
      /*risk*/
      ctx2[0] === Risk.Green
    )
      return create_if_block_3$4;
    if (
      /*risk*/
      ctx2[0] === Risk.Red || /*risk*/
      ctx2[0] === Risk.Orange
    )
      return create_if_block_4$3;
    return create_else_block_1$2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*domain*/
    ctx[1] && create_if_block_2$4(ctx)
  );
  function select_block_type_1(ctx2, dirty) {
    if (
      /*risk*/
      ctx2[0] === Risk.Green
    )
      return create_if_block$d;
    if (
      /*risk*/
      ctx2[0] === Risk.Red || /*risk*/
      ctx2[0] === Risk.Orange
    )
      return create_if_block_1$b;
    return create_else_block$5;
  }
  let current_block_type_1 = select_block_type_1(ctx);
  let if_block2 = current_block_type_1(ctx);
  return {
    c() {
      div1 = element("div");
      if_block0.c();
      t0 = space();
      div0 = element("div");
      if (if_block1)
        if_block1.c();
      t1 = space();
      if_block2.c();
      attr(div1, "data-t", "site-risk");
      attr(div1, "class", "wrapper svelte-fnez1n");
      toggle_class(div1, "grey", !/*risk*/
      ctx[0] || /*risk*/
      ctx[0] === Risk.Grey);
      toggle_class(
        div1,
        "green",
        /*risk*/
        ctx[0] === Risk.Green
      );
      toggle_class(
        div1,
        "red",
        /*risk*/
        ctx[0] === Risk.Red
      );
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      if_block0.m(div1, null);
      append(div1, t0);
      append(div1, div0);
      if (if_block1)
        if_block1.m(div0, null);
      append(div0, t1);
      if_block2.m(div0, null);
    },
    p(ctx2, [dirty]) {
      if (current_block_type !== (current_block_type = select_block_type(ctx2))) {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, t0);
        }
      }
      if (
        /*domain*/
        ctx2[1]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_2$4(ctx2);
          if_block1.c();
          if_block1.m(div0, t1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx2)) && if_block2) {
        if_block2.p(ctx2, dirty);
      } else {
        if_block2.d(1);
        if_block2 = current_block_type_1(ctx2);
        if (if_block2) {
          if_block2.c();
          if_block2.m(div0, null);
        }
      }
      if (dirty & /*risk, Risk*/
      1) {
        toggle_class(div1, "grey", !/*risk*/
        ctx2[0] || /*risk*/
        ctx2[0] === Risk.Grey);
      }
      if (dirty & /*risk, Risk*/
      1) {
        toggle_class(
          div1,
          "green",
          /*risk*/
          ctx2[0] === Risk.Green
        );
      }
      if (dirty & /*risk, Risk*/
      1) {
        toggle_class(
          div1,
          "red",
          /*risk*/
          ctx2[0] === Risk.Red
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div1);
      if_block0.d();
      if (if_block1)
        if_block1.d();
      if_block2.d();
    }
  };
}
function instance$m($$self, $$props, $$invalidate) {
  let { risk } = $$props;
  let { domain } = $$props;
  const getMessageB = (key) => chrome.i18n.getMessage(key).replace("<b>", '<b style="text-transform: uppercase;">');
  $$self.$$set = ($$props2) => {
    if ("risk" in $$props2)
      $$invalidate(0, risk = $$props2.risk);
    if ("domain" in $$props2)
      $$invalidate(1, domain = $$props2.domain);
  };
  return [risk, domain, getMessageB];
}
class SafetyLarge extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$m, create_fragment$o, safe_not_equal, { risk: 0, domain: 1 });
  }
}
function create_if_block$c(ctx) {
  let safetylarge;
  let current;
  safetylarge = new SafetyLarge({
    props: {
      domain: (
        /*domain*/
        ctx[0]
      ),
      risk: Risk.Red
    }
  });
  return {
    c() {
      create_component(safetylarge.$$.fragment);
    },
    m(target, anchor) {
      mount_component(safetylarge, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const safetylarge_changes = {};
      if (dirty & /*domain*/
      1)
        safetylarge_changes.domain = /*domain*/
        ctx2[0];
      safetylarge.$set(safetylarge_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(safetylarge.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(safetylarge.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(safetylarge, detaching);
    }
  };
}
function create_fragment$n(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*domain*/
    ctx[0] && create_if_block$c(ctx)
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*domain*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*domain*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$c(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$l($$self, $$props, $$invalidate) {
  let domain = null;
  onMount(async () => {
    const tab = await getActiveTab();
    if (tab && tab.url) {
      const url = new URL(tab.url).searchParams.get("url");
      $$invalidate(0, domain = url ? getDomain(url) : null);
    }
  });
  return [domain];
}
class BlockedHighRiskView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$l, create_fragment$n, safe_not_equal, {});
  }
}
const Close_svelte_svelte_type_style_lang = "";
function create_fragment$m(ctx) {
  let div;
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      button = element("button");
      button.innerHTML = `<img src="/resources/Close-btn-yellow.svg" width="36" alt=""/>`;
      attr(button, "data-t", "button-close");
      attr(button, "class", "svelte-bw3cml");
      attr(div, "class", "svelte-bw3cml");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*click_handler*/
            ctx[1]
          ),
          listen(
            button,
            "keypress",
            /*keypress_handler*/
            ctx[2]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$k($$self) {
  const dispatch = createEventDispatcher();
  const click_handler = () => dispatch("close");
  const keypress_handler = () => dispatch("close");
  return [dispatch, click_handler, keypress_handler];
}
class Close extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$m, safe_not_equal, {});
  }
}
const Toggle_svelte_svelte_type_style_lang = "";
function create_fragment$l(ctx) {
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      attr(input, "type", "checkbox");
      input.checked = /*on*/
      ctx[0];
      input.disabled = /*disabled*/
      ctx[1];
      attr(input, "data-t", "toggle");
      attr(input, "class", "svelte-jcjpom");
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (!mounted) {
        dispose = listen(
          input,
          "click",
          /*confirmChange*/
          ctx[2]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*on*/
      1) {
        input.checked = /*on*/
        ctx2[0];
      }
      if (dirty & /*disabled*/
      2) {
        input.disabled = /*disabled*/
        ctx2[1];
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
      mounted = false;
      dispose();
    }
  };
}
function instance$j($$self, $$props, $$invalidate) {
  let { on } = $$props;
  let { disabled = false } = $$props;
  const dispatch = createEventDispatcher();
  function confirmChange(event) {
    if (event.currentTarget) {
      const inputElement = event.currentTarget;
      const on2 = inputElement.checked;
      dispatch("change", { on: on2 });
    } else {
      throw new Error("MouseEvent has no currentTarget");
    }
  }
  $$self.$$set = ($$props2) => {
    if ("on" in $$props2)
      $$invalidate(0, on = $$props2.on);
    if ("disabled" in $$props2)
      $$invalidate(1, disabled = $$props2.disabled);
  };
  return [on, disabled, confirmChange];
}
class Toggle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$l, safe_not_equal, { on: 0, disabled: 1 });
  }
}
const ContentFiltersView_svelte_svelte_type_style_lang = "";
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
}
function create_if_block_1$a(ctx) {
  let close;
  let current;
  close = new Close({});
  close.$on(
    "close",
    /*close_handler*/
    ctx[6]
  );
  return {
    c() {
      create_component(close.$$.fragment);
    },
    m(target, anchor) {
      mount_component(close, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(close.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(close.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(close, detaching);
    }
  };
}
function create_if_block$b(ctx) {
  let each_1_anchor;
  let current;
  let each_value = categoryGroups;
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*categoryGroups, contentFilters, setFilter, getMessage*/
      25) {
        each_value = categoryGroups;
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_each_block$2(ctx) {
  let div1;
  let div0;
  let raw_value = (
    /*getMessage*/
    ctx[3](`filters_${/*group*/
    ctx[8]}`) + ""
  );
  let t0;
  let toggle;
  let t1;
  let current;
  function change_handler(...args) {
    return (
      /*change_handler*/
      ctx[7](
        /*group*/
        ctx[8],
        ...args
      )
    );
  }
  toggle = new Toggle({
    props: {
      on: (
        /*contentFilters*/
        ctx[0].get(
          /*group*/
          ctx[8]
        ) || false
      )
    }
  });
  toggle.$on("change", change_handler);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      t0 = space();
      create_component(toggle.$$.fragment);
      t1 = space();
      attr(div0, "class", "svelte-10gmi5w");
      attr(div1, "class", "container__element svelte-10gmi5w");
      attr(div1, "data-t", `content-filter--${/*group*/
      ctx[8]}`);
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      div0.innerHTML = raw_value;
      append(div1, t0);
      mount_component(toggle, div1, null);
      append(div1, t1);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const toggle_changes = {};
      if (dirty & /*contentFilters*/
      1)
        toggle_changes.on = /*contentFilters*/
        ctx[0].get(
          /*group*/
          ctx[8]
        ) || false;
      toggle.$set(toggle_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toggle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_component(toggle);
    }
  };
}
function create_fragment$k(ctx) {
  let t0;
  let div;
  let h1;
  let t2;
  let current;
  let if_block0 = !/*stripped*/
  ctx[1] && create_if_block_1$a(ctx);
  let if_block1 = (
    /*contentFilters*/
    ctx[0] && create_if_block$b(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      div = element("div");
      h1 = element("h1");
      h1.textContent = `${/*getMessage*/
      ctx[3]("filters_header")}`;
      t2 = space();
      if (if_block1)
        if_block1.c();
      attr(h1, "class", "svelte-10gmi5w");
      attr(div, "class", "container svelte-10gmi5w");
      attr(div, "data-t", "content-filters-view");
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert(target, t0, anchor);
      insert(target, div, anchor);
      append(div, h1);
      append(div, t2);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!/*stripped*/
      ctx2[1]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*stripped*/
          2) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$a(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*contentFilters*/
        ctx2[0]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*contentFilters*/
          1) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$b(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
      if (if_block1)
        if_block1.d();
    }
  };
}
function instance$i($$self, $$props, $$invalidate) {
  let { contentFilters } = $$props;
  let { tabId } = $$props;
  let { stripped = false } = $$props;
  const dispatch = createEventDispatcher();
  const getMessage2 = chrome.i18n.getMessage;
  function setFilter(group, on) {
    contentFilters.set(group, on);
    saveSetting(group, on);
    chrome.tabs.sendMessage(tabId, { contentFilters: [group], on });
  }
  const close_handler = () => dispatch("close");
  const change_handler = (group, { detail }) => setFilter(group, detail.on);
  $$self.$$set = ($$props2) => {
    if ("contentFilters" in $$props2)
      $$invalidate(0, contentFilters = $$props2.contentFilters);
    if ("tabId" in $$props2)
      $$invalidate(5, tabId = $$props2.tabId);
    if ("stripped" in $$props2)
      $$invalidate(1, stripped = $$props2.stripped);
  };
  return [
    contentFilters,
    stripped,
    dispatch,
    getMessage2,
    setFilter,
    tabId,
    close_handler,
    change_handler
  ];
}
class ContentFiltersView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$k, safe_not_equal, { contentFilters: 0, tabId: 5, stripped: 1 });
  }
}
async function getInstallationTs() {
  const entries = await load();
  return entries.length ? entries[0].ts : null;
}
async function load() {
  const entries = await getStoredData(INSTALL_LOG_STORAGE_KEY);
  return entries || [];
}
async function setUninstallUrl() {
  let url = "";
  {
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
async function enable(enable2) {
  log("Enable", enable2);
  await chrome.storage.local.set({
    [ENABLED_STORAGE_KEY]: enable2,
    [TRANSMIT_STATS_STORAGE_KEY]: enable2
  });
  enable2 && postEnabling();
  setUninstallUrl();
}
const DisabledView_svelte_svelte_type_style_lang = "";
function create_fragment$j(ctx) {
  let div;
  let h1;
  let raw0_value = getMessage("extension_disabled") + "";
  let t0;
  let p0;
  let t2;
  let button;
  let t4;
  let p1;
  let raw1_value = getMessage("extension_disabled_consent") + "";
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      h1 = element("h1");
      t0 = space();
      p0 = element("p");
      p0.textContent = `${getMessage("extension_disabled_note")}`;
      t2 = space();
      button = element("button");
      button.textContent = `${getMessage("extension_disabled_enable")}`;
      t4 = space();
      p1 = element("p");
      attr(h1, "class", "svelte-cq2xev");
      attr(p0, "class", "svelte-cq2xev");
      attr(button, "class", "svelte-cq2xev");
      attr(p1, "class", "svelte-cq2xev");
      attr(div, "class", "svelte-cq2xev");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, h1);
      h1.innerHTML = raw0_value;
      append(div, t0);
      append(div, p0);
      append(div, t2);
      append(div, button);
      append(div, t4);
      append(div, p1);
      p1.innerHTML = raw1_value;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*doEnable*/
          ctx[0]
        );
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function instance$h($$self) {
  const dispatch = createEventDispatcher();
  async function doEnable() {
    await enable(true);
    dispatch("enable");
  }
  return [doEnable];
}
class DisabledView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$j, safe_not_equal, {});
  }
}
const EmptyView_svelte_svelte_type_style_lang = "";
function create_fragment$i(ctx) {
  let div;
  let raw_value = getMessage("not_scanned") + "";
  return {
    c() {
      div = element("div");
      attr(div, "data-t", "empty-view");
      attr(div, "class", "svelte-h0cgj5");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
class EmptyView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$i, safe_not_equal, {});
  }
}
function create_fragment$h(ctx) {
  let svg;
  let style;
  let t;
  let polygon;
  return {
    c() {
      svg = svg_element("svg");
      style = svg_element("style");
      t = text("polygon { fill: currentColor; }\n  ");
      polygon = svg_element("polygon");
      attr(style, "type", "text/css");
      attr(polygon, "points", "174.4,85.6 114.4,85.6 114.4,25.6 85.6,25.6 85.6,85.6 25.6,85.6 25.6,114.4 85.6,114.4 85.6,174.4 114.4,174.4 114.4,114.4 174.4,114.4");
      attr(
        svg,
        "width",
        /*width*/
        ctx[0]
      );
      attr(svg, "viewBox", "0 0 200 200");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, style);
      append(style, t);
      append(svg, polygon);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*width*/
      1) {
        attr(
          svg,
          "width",
          /*width*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  let { width } = $$props;
  $$self.$$set = ($$props2) => {
    if ("width" in $$props2)
      $$invalidate(0, width = $$props2.width);
  };
  return [width];
}
class SvgPlus extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$h, safe_not_equal, { width: 0 });
  }
}
const Expander_svelte_svelte_type_style_lang = "";
function create_fragment$g(ctx) {
  let button;
  let svgplus;
  let current;
  let mounted;
  let dispose;
  svgplus = new SvgPlus({ props: { width: 24 } });
  return {
    c() {
      button = element("button");
      create_component(svgplus.$$.fragment);
      attr(button, "data-t", "button-expander");
      attr(button, "class", "svelte-168ox9j");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      mount_component(svgplus, button, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*click_handler*/
            ctx[1]
          ),
          listen(
            button,
            "keypress",
            /*keypress_handler*/
            ctx[2]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(svgplus.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgplus.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      destroy_component(svgplus);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$f($$self) {
  const dispatch = createEventDispatcher();
  const click_handler = () => dispatch("click");
  const keypress_handler = () => dispatch("click");
  return [dispatch, click_handler, keypress_handler];
}
class Expander extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$g, safe_not_equal, {});
  }
}
function create_fragment$f(ctx) {
  let svg;
  let style;
  let t;
  let path0;
  let path1;
  let path2;
  let path3;
  return {
    c() {
      svg = svg_element("svg");
      style = svg_element("style");
      t = text("path { fill: #10A7E2; }\n  ");
      path0 = svg_element("path");
      path1 = svg_element("path");
      path2 = svg_element("path");
      path3 = svg_element("path");
      attr(style, "type", "text/css");
      attr(path0, "d", "M43.8,80.6h116.5c7,0,12.7-5.7,12.7-12.7c0-7-5.7-12.7-12.7-12.7H43.8c-7,0-12.7,5.7-12.7,12.7 C31.1,74.9,36.8,80.6,43.8,80.6");
      attr(path1, "d", "M57.1,44.7v46c0,7,5.7,12.7,12.7,12.7c7,0,12.7-5.7,12.7-12.7v-46c0-7-5.7-12.7-12.7-12.7 C62.8,32.1,57.1,37.7,57.1,44.7");
      attr(path2, "d", "M160.2,119.4H43.8c-7,0-12.7,5.7-12.7,12.7c0,7,5.7,12.7,12.7,12.7h116.5c7,0,12.7-5.7,12.7-12.7 C172.9,125.1,167.2,119.4,160.2,119.4");
      attr(path3, "d", "M146.8,155.2v-46c0-7-5.7-12.7-12.7-12.7c-7,0-12.7,5.7-12.7,12.7v46c0,7,5.7,12.7,12.7,12.7 C141.2,167.9,146.8,162.2,146.8,155.2");
      attr(
        svg,
        "width",
        /*width*/
        ctx[0]
      );
      attr(svg, "viewBox", "0 0 200 200");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, style);
      append(style, t);
      append(svg, path0);
      append(svg, path1);
      append(svg, path2);
      append(svg, path3);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*width*/
      1) {
        attr(
          svg,
          "width",
          /*width*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let { width } = $$props;
  $$self.$$set = ($$props2) => {
    if ("width" in $$props2)
      $$invalidate(0, width = $$props2.width);
  };
  return [width];
}
class SvgContentFilters extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$f, safe_not_equal, { width: 0 });
  }
}
function create_if_block$a(ctx) {
  let t;
  let expander;
  let current;
  function select_block_type(ctx2, dirty) {
    if (
      /*isOn*/
      ctx2[3]()
    )
      return create_if_block_1$9;
    return create_else_block$4;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  expander = new Expander({});
  expander.$on(
    "click",
    /*click_handler*/
    ctx[4]
  );
  return {
    c() {
      if_block.c();
      t = space();
      create_component(expander.$$.fragment);
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, t, anchor);
      mount_component(expander, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if_block.p(ctx2, dirty);
    },
    i(local) {
      if (current)
        return;
      transition_in(expander.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(expander.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(t);
      destroy_component(expander, detaching);
    }
  };
}
function create_else_block$4(ctx) {
  let div;
  let raw_value = (
    /*getMessageB*/
    ctx[2]("filters_mode_off") + ""
  );
  return {
    c() {
      div = element("div");
      attr(div, "data-t", "content-filters--off");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_1$9(ctx) {
  let div;
  let raw_value = (
    /*getMessageB*/
    ctx[2]("filters_mode_on") + ""
  );
  return {
    c() {
      div = element("div");
      attr(div, "data-t", "content-filters--on");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$e(ctx) {
  let svgcontentfilters;
  let t;
  let if_block_anchor;
  let current;
  svgcontentfilters = new SvgContentFilters({ props: { width: 24 } });
  let if_block = (
    /*contentFilters*/
    ctx[0] && create_if_block$a(ctx)
  );
  return {
    c() {
      create_component(svgcontentfilters.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(svgcontentfilters, target, anchor);
      insert(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*contentFilters*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*contentFilters*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$a(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(svgcontentfilters.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(svgcontentfilters.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      destroy_component(svgcontentfilters, detaching);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$d($$self, $$props, $$invalidate) {
  const dispatch = createEventDispatcher();
  const getMessageB = (key) => chrome.i18n.getMessage(key).replace("<b>", '<b style="text-transform: uppercase;">');
  let { contentFilters } = $$props;
  function isOn() {
    if (contentFilters) {
      for (const contentFilter of contentFilters) {
        if (contentFilter[1]) {
          return true;
        }
      }
    }
    return false;
  }
  const click_handler = () => dispatch("click");
  $$self.$$set = ($$props2) => {
    if ("contentFilters" in $$props2)
      $$invalidate(0, contentFilters = $$props2.contentFilters);
  };
  return [contentFilters, dispatch, getMessageB, isOn, click_handler];
}
class ContentFilters extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$e, safe_not_equal, { contentFilters: 0 });
  }
}
function create_else_block$3(ctx) {
  let img;
  let img_src_value;
  let t;
  let div;
  let raw_value = (
    /*getMessage*/
    ctx[1]("connection_unencrypted") + ""
  );
  return {
    c() {
      img = element("img");
      t = space();
      div = element("div");
      if (!src_url_equal(img.src, img_src_value = "/resources/unencrypted.svg"))
        attr(img, "src", img_src_value);
      attr(img, "width", WIDTH);
      attr(img, "alt", "");
      attr(div, "data-t", "encrypted-connection--unencrypted");
    },
    m(target, anchor) {
      insert(target, img, anchor);
      insert(target, t, anchor);
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      if (detaching)
        detach(t);
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block$9(ctx) {
  let img;
  let img_src_value;
  let t;
  let div;
  let raw_value = (
    /*getMessage*/
    ctx[1]("connection_encrypted") + ""
  );
  return {
    c() {
      img = element("img");
      t = space();
      div = element("div");
      if (!src_url_equal(img.src, img_src_value = "/resources/Encrypted.svg"))
        attr(img, "src", img_src_value);
      attr(img, "width", WIDTH);
      attr(img, "alt", "");
      attr(div, "data-t", "encrypted-connection--encrypted");
    },
    m(target, anchor) {
      insert(target, img, anchor);
      insert(target, t, anchor);
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      if (detaching)
        detach(t);
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$d(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (
      /*url*/
      ctx2[0].protocol === "https:"
    )
      return create_if_block$9;
    return create_else_block$3;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
const WIDTH = 24;
function instance$c($$self, $$props, $$invalidate) {
  let { url } = $$props;
  const getMessage2 = chrome.i18n.getMessage;
  $$self.$$set = ($$props2) => {
    if ("url" in $$props2)
      $$invalidate(0, url = $$props2.url);
  };
  return [url, getMessage2];
}
class EncryptedConnection extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$d, safe_not_equal, { url: 0 });
  }
}
function create_if_block_3$3(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "data-t", "check--green");
      if (!src_url_equal(img.src, img_src_value = "/resources/circle-tick.svg"))
        attr(img, "src", img_src_value);
      attr(
        img,
        "width",
        /*width*/
        ctx[1]
      );
      attr(img, "alt", "");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*width*/
      2) {
        attr(
          img,
          "width",
          /*width*/
          ctx2[1]
        );
      }
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
function create_if_block_2$3(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "data-t", "check--grey");
      if (!src_url_equal(img.src, img_src_value = "/resources/circle-questionmark.svg"))
        attr(img, "src", img_src_value);
      attr(
        img,
        "width",
        /*width*/
        ctx[1]
      );
      attr(img, "alt", "");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*width*/
      2) {
        attr(
          img,
          "width",
          /*width*/
          ctx2[1]
        );
      }
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
function create_if_block_1$8(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "data-t", "check--orange");
      if (!src_url_equal(img.src, img_src_value = "/resources/Attention-triangle-yellow.svg"))
        attr(img, "src", img_src_value);
      attr(
        img,
        "width",
        /*width*/
        ctx[1]
      );
      attr(img, "alt", "");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*width*/
      2) {
        attr(
          img,
          "width",
          /*width*/
          ctx2[1]
        );
      }
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
function create_if_block$8(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      attr(img, "data-t", "check--red");
      if (!src_url_equal(img.src, img_src_value = "/resources/circle-cross.svg"))
        attr(img, "src", img_src_value);
      attr(
        img,
        "width",
        /*width*/
        ctx[1]
      );
      attr(img, "alt", "");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*width*/
      2) {
        attr(
          img,
          "width",
          /*width*/
          ctx2[1]
        );
      }
    },
    d(detaching) {
      if (detaching)
        detach(img);
    }
  };
}
function create_fragment$c(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (
      /*color*/
      ctx2[0] === "red"
    )
      return create_if_block$8;
    if (
      /*color*/
      ctx2[0] === "orange"
    )
      return create_if_block_1$8;
    if (
      /*color*/
      ctx2[0] === "grey"
    )
      return create_if_block_2$3;
    if (
      /*color*/
      ctx2[0] === "green"
    )
      return create_if_block_3$3;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if (if_block)
          if_block.d(1);
        if_block = current_block_type && current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (if_block) {
        if_block.d(detaching);
      }
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  let { color } = $$props;
  let { width = 24 } = $$props;
  $$self.$$set = ($$props2) => {
    if ("color" in $$props2)
      $$invalidate(0, color = $$props2.color);
    if ("width" in $$props2)
      $$invalidate(1, width = $$props2.width);
  };
  return [color, width];
}
class Check extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$c, safe_not_equal, { color: 0, width: 1 });
  }
}
function create_else_block_1$1(ctx) {
  let check;
  let t;
  let div;
  let raw_value = (
    /*getMessage*/
    ctx[2]("terms_unknown") + ""
  );
  let current;
  check = new Check({ props: { color: Risk.Grey } });
  return {
    c() {
      create_component(check.$$.fragment);
      t = space();
      div = element("div");
    },
    m(target, anchor) {
      mount_component(check, target, anchor);
      insert(target, t, anchor);
      insert(target, div, anchor);
      div.innerHTML = raw_value;
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(check.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(check.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(check, detaching);
      if (detaching)
        detach(t);
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block$7(ctx) {
  let check;
  let t0;
  let show_if;
  let t1;
  let expander;
  let current;
  check = new Check({
    props: {
      color: (
        /*privacyAssessment*/
        ctx[0].classification
      )
    }
  });
  function select_block_type_1(ctx2, dirty) {
    if (dirty & /*privacyAssessment*/
    1)
      show_if = null;
    if (show_if == null)
      show_if = !!["red", "orange"].includes(
        /*privacyAssessment*/
        ctx2[0].classification
      );
    if (show_if)
      return create_if_block_1$7;
    return create_else_block$2;
  }
  let current_block_type = select_block_type_1(ctx, -1);
  let if_block = current_block_type(ctx);
  expander = new Expander({});
  expander.$on(
    "click",
    /*click_handler*/
    ctx[3]
  );
  return {
    c() {
      create_component(check.$$.fragment);
      t0 = space();
      if_block.c();
      t1 = space();
      create_component(expander.$$.fragment);
    },
    m(target, anchor) {
      mount_component(check, target, anchor);
      insert(target, t0, anchor);
      if_block.m(target, anchor);
      insert(target, t1, anchor);
      mount_component(expander, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const check_changes = {};
      if (dirty & /*privacyAssessment*/
      1)
        check_changes.color = /*privacyAssessment*/
        ctx2[0].classification;
      check.$set(check_changes);
      if (current_block_type === (current_block_type = select_block_type_1(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(t1.parentNode, t1);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(check.$$.fragment, local);
      transition_in(expander.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(check.$$.fragment, local);
      transition_out(expander.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(check, detaching);
      if (detaching)
        detach(t0);
      if_block.d(detaching);
      if (detaching)
        detach(t1);
      destroy_component(expander, detaching);
    }
  };
}
function create_else_block$2(ctx) {
  let div;
  let raw_value = (
    /*getMessage*/
    ctx[2]("terms_fair") + ""
  );
  return {
    c() {
      div = element("div");
      attr(div, "data-t", "privacy-assessment--fair");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_1$7(ctx) {
  let div;
  let raw_value = (
    /*getMessage*/
    ctx[2]("terms_unfair") + ""
  );
  return {
    c() {
      div = element("div");
      attr(div, "data-t", "privacy-assessment--unfair");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$b(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$7, create_else_block_1$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*privacyAssessment*/
      ctx2[0] && /*privacyAssessment*/
      ctx2[0].assessed
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let { privacyAssessment } = $$props;
  const dispatch = createEventDispatcher();
  const getMessage2 = chrome.i18n.getMessage;
  const click_handler = () => dispatch("click");
  $$self.$$set = ($$props2) => {
    if ("privacyAssessment" in $$props2)
      $$invalidate(0, privacyAssessment = $$props2.privacyAssessment);
  };
  return [privacyAssessment, dispatch, getMessage2, click_handler];
}
class Privacy extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$b, safe_not_equal, { privacyAssessment: 0 });
  }
}
const Search_svelte_svelte_type_style_lang = "";
function create_fragment$a(ctx) {
  let form_1;
  let input0;
  let t0;
  let input1;
  let t1;
  let input2;
  let t2;
  let input3;
  let mounted;
  let dispose;
  return {
    c() {
      form_1 = element("form");
      input0 = element("input");
      t0 = space();
      input1 = element("input");
      t1 = space();
      input2 = element("input");
      t2 = space();
      input3 = element("input");
      attr(input0, "type", "hidden");
      attr(
        input0,
        "name",
        /*SEARCH_SEGMENT_PARAM*/
        ctx[3]
      );
      input0.value = /*SEARCH_SEGMENT_VAL*/
      ctx[4];
      attr(input0, "class", "svelte-10dh72n");
      attr(input1, "type", "hidden");
      attr(
        input1,
        "name",
        /*SEARCH_SOURCE_PARAM*/
        ctx[5]
      );
      input1.value = /*SEARCH_SOURCE_VAL*/
      ctx[6];
      attr(input1, "class", "svelte-10dh72n");
      attr(input2, "type", "hidden");
      attr(
        input2,
        "name",
        /*SEARCH_CAT_PARAM*/
        ctx[7]
      );
      input2.value = /*SEARCH_CAT_VAL*/
      ctx[8];
      attr(input2, "class", "svelte-10dh72n");
      attr(input3, "data-t", "search-query");
      attr(input3, "type", "search");
      attr(
        input3,
        "name",
        /*SEARCH_QUERY_PARAM*/
        ctx[9]
      );
      attr(
        input3,
        "placeholder",
        /*getMessage*/
        ctx[10]("search_box_default_text")
      );
      attr(input3, "autocomplete", "off");
      attr(input3, "maxlength", "196");
      attr(input3, "class", "svelte-10dh72n");
      attr(
        form_1,
        "action",
        /*SEARCH_URL*/
        ctx[2]
      );
      attr(form_1, "method", "GET");
      attr(form_1, "target", "_blank");
      attr(form_1, "class", "svelte-10dh72n");
    },
    m(target, anchor) {
      insert(target, form_1, anchor);
      append(form_1, input0);
      append(form_1, t0);
      append(form_1, input1);
      append(form_1, t1);
      append(form_1, input2);
      append(form_1, t2);
      append(form_1, input3);
      ctx[12](input3);
      ctx[13](form_1);
      if (!mounted) {
        dispose = listen(
          form_1,
          "submit",
          /*close*/
          ctx[11]
        );
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(form_1);
      ctx[12](null);
      ctx[13](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  const SEARCH_URL = "https://www.startpage.com/do/search";
  const SEARCH_SEGMENT_PARAM = "segment";
  const SEARCH_SEGMENT_VAL = "startpage.webscannerpro";
  const SEARCH_SOURCE_PARAM = {}.SEARCH_SOURCE_PARAM;
  const SEARCH_SOURCE_VAL = {}.SEARCH_SOURCE_VAL;
  const SEARCH_CAT_PARAM = "cat";
  const SEARCH_CAT_VAL = "web";
  const SEARCH_QUERY_PARAM = "query";
  let form;
  let input;
  const getMessage2 = chrome.i18n.getMessage;
  function close() {
    {
      setTimeout(
        () => {
          window.close();
        },
        333
      );
    }
  }
  onMount(() => {
    input.focus();
  });
  function input3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(1, input);
    });
  }
  function form_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      form = $$value;
      $$invalidate(0, form);
    });
  }
  return [
    form,
    input,
    SEARCH_URL,
    SEARCH_SEGMENT_PARAM,
    SEARCH_SEGMENT_VAL,
    SEARCH_SOURCE_PARAM,
    SEARCH_SOURCE_VAL,
    SEARCH_CAT_PARAM,
    SEARCH_CAT_VAL,
    SEARCH_QUERY_PARAM,
    getMessage2,
    close,
    input3_binding,
    form_1_binding
  ];
}
class Search extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$a, safe_not_equal, {});
  }
}
const counterStoreKey = (tabId) => `${TAB_STORAGE_KEY_PFX}:${tabId}:${BLOCK_COUNT_STORAGE_KEY_SFX}`;
async function getBlockCount(tabId) {
  {
    const count = await loadBlockCount(tabId);
    return count === null ? null : String(count);
  }
}
async function loadBlockCount(tabId) {
  return await getStoredData(counterStoreKey(tabId), "session");
}
const TrackersBlocked_svelte_svelte_type_style_lang = "";
function create_if_block_1$6(ctx) {
  let if_block_anchor;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*blockCountString*/
      ctx2[1] === null
    )
      return create_if_block_2$2;
    if (
      /*blockCount*/
      ctx2[2] !== void 0
    )
      return create_if_block_3$2;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if (if_block)
          if_block.d(1);
        if_block = current_block_type && current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if (if_block) {
        if_block.d(detaching);
      }
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block$6(ctx) {
  let img;
  let img_src_value;
  let t;
  let div;
  let raw_value = (
    /*getMessageB*/
    ctx[5]("privacy_protection_off") + ""
  );
  return {
    c() {
      img = element("img");
      t = space();
      div = element("div");
      attr(img, "data-t", "trackers-blocked__warn");
      if (!src_url_equal(img.src, img_src_value = "/resources/Attention-triangle-yellow.svg"))
        attr(img, "src", img_src_value);
      attr(img, "width", "24");
      attr(img, "alt", "");
    },
    m(target, anchor) {
      insert(target, img, anchor);
      insert(target, t, anchor);
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      if (detaching)
        detach(t);
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_3$2(ctx) {
  let if_block_anchor;
  function select_block_type_2(ctx2, dirty) {
    if (
      /*blockCountString*/
      ctx2[1] === "0"
    )
      return create_if_block_4$2;
    if (
      /*blockCountString*/
      ctx2[1] === "1"
    )
      return create_if_block_5$2;
    if (
      /*blockCount*/
      ctx2[2] < 5
    )
      return create_if_block_6$2;
    if (
      /*blockCount*/
      ctx2[2] >= 5
    )
      return create_if_block_7$2;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if (if_block)
          if_block.d(1);
        if_block = current_block_type && current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if (if_block) {
        if_block.d(detaching);
      }
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_2$2(ctx) {
  let img;
  let img_src_value;
  let t0;
  let div;
  return {
    c() {
      img = element("img");
      t0 = space();
      div = element("div");
      div.textContent = `${/*getMessage*/
      ctx[4]("trackers_blocked_unknown")}`;
      attr(img, "data-t", "trackers-blocked__unknown");
      if (!src_url_equal(img.src, img_src_value = "/resources/circle-questionmark.svg"))
        attr(img, "src", img_src_value);
      attr(img, "width", "24");
      attr(img, "alt", "");
      attr(div, "class", "message--small svelte-15t5y6p");
    },
    m(target, anchor) {
      insert(target, img, anchor);
      insert(target, t0, anchor);
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_7$2(ctx) {
  let div0;
  let t0_value = (
    /*blockCount*/
    (ctx[2] < 100 ? (
      /*blockCountString*/
      ctx[1]
    ) : "99+") + ""
  );
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      div1.textContent = `${/*getMessage*/
      ctx[4]("trackers_blocked_many") || /*getMessage*/
      ctx[4]("trackers_blocked_other")}`;
      attr(div0, "data-t", "trackers-blocked__count");
      attr(div0, "class", "counter counter--red svelte-15t5y6p");
      toggle_class(
        div0,
        "counter--small",
        /*blockCount*/
        ctx[2] >= 100 || /*blockCountString*/
        ctx[1].length >= 3
      );
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*blockCount, blockCountString*/
      6 && t0_value !== (t0_value = /*blockCount*/
      (ctx2[2] < 100 ? (
        /*blockCountString*/
        ctx2[1]
      ) : "99+") + ""))
        set_data(t0, t0_value);
      if (dirty & /*blockCount, blockCountString*/
      6) {
        toggle_class(
          div0,
          "counter--small",
          /*blockCount*/
          ctx2[2] >= 100 || /*blockCountString*/
          ctx2[1].length >= 3
        );
      }
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
function create_if_block_6$2(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(
        /*blockCountString*/
        ctx[1]
      );
      t1 = space();
      div1 = element("div");
      div1.textContent = `${/*getMessage*/
      ctx[4]("trackers_blocked_few") || /*getMessage*/
      ctx[4]("trackers_blocked_other")}`;
      attr(div0, "data-t", "trackers-blocked__count");
      attr(div0, "class", "counter counter--red svelte-15t5y6p");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*blockCountString*/
      2)
        set_data(
          t0,
          /*blockCountString*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
function create_if_block_5$2(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(
        /*blockCountString*/
        ctx[1]
      );
      t1 = space();
      div1 = element("div");
      div1.textContent = `${/*getMessage*/
      ctx[4]("trackers_blocked_one")}`;
      attr(div0, "data-t", "trackers-blocked__count");
      attr(div0, "class", "counter counter--red svelte-15t5y6p");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*blockCountString*/
      2)
        set_data(
          t0,
          /*blockCountString*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
function create_if_block_4$2(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(
        /*blockCountString*/
        ctx[1]
      );
      t1 = space();
      div1 = element("div");
      div1.textContent = `${/*getMessage*/
      ctx[4]("trackers_detected_zero")}`;
      attr(div0, "data-t", "trackers-blocked__count");
      attr(div0, "class", "counter counter--green svelte-15t5y6p");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*blockCountString*/
      2)
        set_data(
          t0,
          /*blockCountString*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
function create_fragment$9(ctx) {
  let t;
  let expander;
  let current;
  function select_block_type(ctx2, dirty) {
    if (!/*trackerBlockingOn*/
    ctx2[0])
      return create_if_block$6;
    if (
      /*blockCountString*/
      ctx2[1] !== void 0
    )
      return create_if_block_1$6;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  expander = new Expander({});
  expander.$on(
    "click",
    /*click_handler*/
    ctx[7]
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      create_component(expander.$$.fragment);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t, anchor);
      mount_component(expander, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if (if_block)
          if_block.d(1);
        if_block = current_block_type && current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(t.parentNode, t);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(expander.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(expander.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (if_block) {
        if_block.d(detaching);
      }
      if (detaching)
        detach(t);
      destroy_component(expander, detaching);
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let { trackerBlockingOn } = $$props;
  let { tabId } = $$props;
  let blockCountString = void 0;
  let blockCount = void 0;
  const dispatch = createEventDispatcher();
  const getMessage2 = chrome.i18n.getMessage;
  const getMessageB = (key) => getMessage2(key).replace("<b>", '<b style="text-transform: uppercase;">');
  function updateCounter() {
    getBlockCount(tabId).then((result) => {
      $$invalidate(1, blockCountString = result);
      if (blockCountString !== null && blockCountString !== void 0) {
        $$invalidate(2, blockCount = parseInt(blockCountString));
      }
    });
  }
  onMount(() => {
    updateCounter();
    {
      setInterval(updateCounter, 2e3);
    }
  });
  const click_handler = () => dispatch("openTrackerBlocking");
  $$self.$$set = ($$props2) => {
    if ("trackerBlockingOn" in $$props2)
      $$invalidate(0, trackerBlockingOn = $$props2.trackerBlockingOn);
    if ("tabId" in $$props2)
      $$invalidate(6, tabId = $$props2.tabId);
  };
  return [
    trackerBlockingOn,
    blockCountString,
    blockCount,
    dispatch,
    getMessage2,
    getMessageB,
    tabId,
    click_handler
  ];
}
class TrackersBlocked extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$9, safe_not_equal, { trackerBlockingOn: 0, tabId: 6 });
  }
}
const TrackersBlockedFirefox_svelte_svelte_type_style_lang = "";
function create_if_block_1$5(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_2$1, create_if_block_3$1];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*blockCountString*/
      ctx2[1] === null
    )
      return 0;
    if (
      /*blockCount*/
      ctx2[2] !== void 0
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_1(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block$5(ctx) {
  let img;
  let img_src_value;
  let t0;
  let div;
  let raw_value = (
    /*getMessageB*/
    ctx[5]("privacy_protection_off") + ""
  );
  let t1;
  let toggle;
  let current;
  toggle = new Toggle({
    props: { on: (
      /*trackerBlockingOn*/
      ctx[0]
    ) }
  });
  toggle.$on(
    "change",
    /*change_handler*/
    ctx[7]
  );
  return {
    c() {
      img = element("img");
      t0 = space();
      div = element("div");
      t1 = space();
      create_component(toggle.$$.fragment);
      attr(img, "data-t", "trackers-blocked__warn");
      if (!src_url_equal(img.src, img_src_value = "/resources/Attention-triangle-yellow.svg"))
        attr(img, "src", img_src_value);
      attr(img, "width", "24");
      attr(img, "alt", "");
    },
    m(target, anchor) {
      insert(target, img, anchor);
      insert(target, t0, anchor);
      insert(target, div, anchor);
      div.innerHTML = raw_value;
      insert(target, t1, anchor);
      mount_component(toggle, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const toggle_changes = {};
      if (dirty & /*trackerBlockingOn*/
      1)
        toggle_changes.on = /*trackerBlockingOn*/
        ctx2[0];
      toggle.$set(toggle_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toggle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(img);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
      if (detaching)
        detach(t1);
      destroy_component(toggle, detaching);
    }
  };
}
function create_if_block_3$1(ctx) {
  let t;
  let toggle;
  let current;
  function select_block_type_2(ctx2, dirty) {
    if (
      /*blockCountString*/
      ctx2[1] === "0"
    )
      return create_if_block_4$1;
    if (
      /*blockCountString*/
      ctx2[1] === "1"
    )
      return create_if_block_5$1;
    if (
      /*blockCount*/
      ctx2[2] < 5
    )
      return create_if_block_6$1;
    if (
      /*blockCount*/
      ctx2[2] >= 5
    )
      return create_if_block_7$1;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  toggle = new Toggle({
    props: { on: (
      /*trackerBlockingOn*/
      ctx[0]
    ) }
  });
  toggle.$on(
    "change",
    /*change_handler_1*/
    ctx[8]
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      create_component(toggle.$$.fragment);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t, anchor);
      mount_component(toggle, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if (if_block)
          if_block.d(1);
        if_block = current_block_type && current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(t.parentNode, t);
        }
      }
      const toggle_changes = {};
      if (dirty & /*trackerBlockingOn*/
      1)
        toggle_changes.on = /*trackerBlockingOn*/
        ctx2[0];
      toggle.$set(toggle_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toggle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (if_block) {
        if_block.d(detaching);
      }
      if (detaching)
        detach(t);
      destroy_component(toggle, detaching);
    }
  };
}
function create_if_block_2$1(ctx) {
  let img;
  let img_src_value;
  let t0;
  let div;
  return {
    c() {
      img = element("img");
      t0 = space();
      div = element("div");
      div.textContent = `${/*getMessage*/
      ctx[4]("trackers_blocked_unknown")}`;
      attr(img, "data-t", "trackers-blocked__unknown");
      if (!src_url_equal(img.src, img_src_value = "/resources/circle-questionmark.svg"))
        attr(img, "src", img_src_value);
      attr(img, "width", "24");
      attr(img, "alt", "");
      attr(div, "class", "message--small svelte-15t5y6p");
    },
    m(target, anchor) {
      insert(target, img, anchor);
      insert(target, t0, anchor);
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_7$1(ctx) {
  let div0;
  let t0_value = (
    /*blockCount*/
    (ctx[2] < 100 ? (
      /*blockCountString*/
      ctx[1]
    ) : "99+") + ""
  );
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      div1.textContent = `${/*getMessage*/
      ctx[4]("trackers_blocked_many") || /*getMessage*/
      ctx[4]("trackers_blocked_other")}`;
      attr(div0, "data-t", "trackers-blocked__count");
      attr(div0, "class", "counter counter--red svelte-15t5y6p");
      toggle_class(
        div0,
        "counter--small",
        /*blockCount*/
        ctx[2] >= 100 || /*blockCountString*/
        ctx[1].length >= 3
      );
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*blockCount, blockCountString*/
      6 && t0_value !== (t0_value = /*blockCount*/
      (ctx2[2] < 100 ? (
        /*blockCountString*/
        ctx2[1]
      ) : "99+") + ""))
        set_data(t0, t0_value);
      if (dirty & /*blockCount, blockCountString*/
      6) {
        toggle_class(
          div0,
          "counter--small",
          /*blockCount*/
          ctx2[2] >= 100 || /*blockCountString*/
          ctx2[1].length >= 3
        );
      }
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
function create_if_block_6$1(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(
        /*blockCountString*/
        ctx[1]
      );
      t1 = space();
      div1 = element("div");
      div1.textContent = `${/*getMessage*/
      ctx[4]("trackers_blocked_few") || /*getMessage*/
      ctx[4]("trackers_blocked_other")}`;
      attr(div0, "data-t", "trackers-blocked__count");
      attr(div0, "class", "counter counter--red svelte-15t5y6p");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*blockCountString*/
      2)
        set_data(
          t0,
          /*blockCountString*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
function create_if_block_5$1(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(
        /*blockCountString*/
        ctx[1]
      );
      t1 = space();
      div1 = element("div");
      div1.textContent = `${/*getMessage*/
      ctx[4]("trackers_blocked_one")}`;
      attr(div0, "data-t", "trackers-blocked__count");
      attr(div0, "class", "counter counter--red svelte-15t5y6p");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*blockCountString*/
      2)
        set_data(
          t0,
          /*blockCountString*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
function create_if_block_4$1(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      t0 = text(
        /*blockCountString*/
        ctx[1]
      );
      t1 = space();
      div1 = element("div");
      div1.textContent = `${/*getMessage*/
      ctx[4]("trackers_detected_zero")}`;
      attr(div0, "data-t", "trackers-blocked__count");
      attr(div0, "class", "counter counter--green svelte-15t5y6p");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, t0);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*blockCountString*/
      2)
        set_data(
          t0,
          /*blockCountString*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
    }
  };
}
function create_fragment$8(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$5, create_if_block_1$5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!/*trackerBlockingOn*/
    ctx2[0])
      return 0;
    if (
      /*blockCountString*/
      ctx2[1] !== void 0
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let { trackerBlockingOn } = $$props;
  let { tabId } = $$props;
  let blockCountString = void 0;
  let blockCount = void 0;
  const dispatch = createEventDispatcher();
  const getMessage2 = chrome.i18n.getMessage;
  const getMessageB = (key) => getMessage2(key).replace("<b>", '<b style="text-transform: uppercase;">');
  function updateCounter() {
    getBlockCount(tabId).then((result) => {
      $$invalidate(1, blockCountString = result);
      if (blockCountString !== null && blockCountString !== void 0) {
        $$invalidate(2, blockCount = parseInt(blockCountString));
      }
    });
  }
  onMount(() => {
    updateCounter();
    setInterval(updateCounter, 2e3);
  });
  const change_handler = ({ detail }) => dispatch("setTrackerBlocking", detail.on);
  const change_handler_1 = ({ detail }) => dispatch("setTrackerBlocking", detail.on);
  $$self.$$set = ($$props2) => {
    if ("trackerBlockingOn" in $$props2)
      $$invalidate(0, trackerBlockingOn = $$props2.trackerBlockingOn);
    if ("tabId" in $$props2)
      $$invalidate(6, tabId = $$props2.tabId);
  };
  return [
    trackerBlockingOn,
    blockCountString,
    blockCount,
    dispatch,
    getMessage2,
    getMessageB,
    tabId,
    change_handler,
    change_handler_1
  ];
}
class TrackersBlockedFirefox extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$8, safe_not_equal, { trackerBlockingOn: 0, tabId: 6 });
  }
}
function create_else_block$1(ctx) {
  let trackersblocked;
  let current;
  trackersblocked = new TrackersBlocked({
    props: {
      trackerBlockingOn: (
        /*trackerBlockingOn*/
        ctx[5]
      ),
      tabId: (
        /*tabId*/
        ctx[4]
      )
    }
  });
  trackersblocked.$on(
    "openTrackerBlocking",
    /*openTrackerBlocking_handler*/
    ctx[9]
  );
  return {
    c() {
      create_component(trackersblocked.$$.fragment);
    },
    m(target, anchor) {
      mount_component(trackersblocked, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const trackersblocked_changes = {};
      if (dirty & /*trackerBlockingOn*/
      32)
        trackersblocked_changes.trackerBlockingOn = /*trackerBlockingOn*/
        ctx2[5];
      if (dirty & /*tabId*/
      16)
        trackersblocked_changes.tabId = /*tabId*/
        ctx2[4];
      trackersblocked.$set(trackersblocked_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(trackersblocked.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(trackersblocked.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(trackersblocked, detaching);
    }
  };
}
function create_if_block_1$4(ctx) {
  let trackersblockedfirefox;
  let current;
  trackersblockedfirefox = new TrackersBlockedFirefox({
    props: {
      trackerBlockingOn: (
        /*trackerBlockingOn*/
        ctx[5]
      ),
      tabId: (
        /*tabId*/
        ctx[4]
      )
    }
  });
  trackersblockedfirefox.$on(
    "setTrackerBlocking",
    /*setTrackerBlocking_handler*/
    ctx[8]
  );
  return {
    c() {
      create_component(trackersblockedfirefox.$$.fragment);
    },
    m(target, anchor) {
      mount_component(trackersblockedfirefox, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const trackersblockedfirefox_changes = {};
      if (dirty & /*trackerBlockingOn*/
      32)
        trackersblockedfirefox_changes.trackerBlockingOn = /*trackerBlockingOn*/
        ctx2[5];
      if (dirty & /*tabId*/
      16)
        trackersblockedfirefox_changes.tabId = /*tabId*/
        ctx2[4];
      trackersblockedfirefox.$set(trackersblockedfirefox_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(trackersblockedfirefox.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(trackersblockedfirefox.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(trackersblockedfirefox, detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let div;
  let privacy;
  let current;
  privacy = new Privacy({
    props: {
      privacyAssessment: (
        /*privacyAssessment*/
        ctx[2]
      )
    }
  });
  privacy.$on(
    "click",
    /*click_handler*/
    ctx[10]
  );
  return {
    c() {
      div = element("div");
      create_component(privacy.$$.fragment);
      attr(div, "class", "item");
      attr(div, "data-t", "privacy-assessment");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(privacy, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const privacy_changes = {};
      if (dirty & /*privacyAssessment*/
      4)
        privacy_changes.privacyAssessment = /*privacyAssessment*/
        ctx2[2];
      privacy.$set(privacy_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(privacy.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(privacy.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(privacy);
    }
  };
}
function create_fragment$7(ctx) {
  let search;
  let t0;
  let safetylarge;
  let t1;
  let div3;
  let div0;
  let current_block_type_index;
  let if_block0;
  let t2;
  let t3;
  let div1;
  let contentfilters;
  let t4;
  let div2;
  let encryptedconnection;
  let current;
  search = new Search({});
  safetylarge = new SafetyLarge({
    props: {
      domain: (
        /*domain*/
        ctx[1]
      ),
      risk: (
        /*risk*/
        ctx[3]
      )
    }
  });
  const if_block_creators = [create_if_block_1$4, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    return 0;
  }
  current_block_type_index = select_block_type();
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = (
    /*privacyAssessment*/
    ctx[2] && create_if_block$4(ctx)
  );
  contentfilters = new ContentFilters({
    props: {
      contentFilters: (
        /*contentFilters*/
        ctx[0]
      )
    }
  });
  contentfilters.$on(
    "click",
    /*click_handler_1*/
    ctx[11]
  );
  encryptedconnection = new EncryptedConnection({ props: { url: (
    /*url*/
    ctx[6]
  ) } });
  return {
    c() {
      create_component(search.$$.fragment);
      t0 = space();
      create_component(safetylarge.$$.fragment);
      t1 = space();
      div3 = element("div");
      div0 = element("div");
      if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      div1 = element("div");
      create_component(contentfilters.$$.fragment);
      t4 = space();
      div2 = element("div");
      create_component(encryptedconnection.$$.fragment);
      attr(div0, "data-t", "trackers-blocked");
      attr(div0, "class", "item");
      attr(div1, "class", "item");
      attr(div1, "data-t", "content-filters");
      attr(div2, "class", "item");
      attr(div2, "data-t", "encrypted-connection");
      attr(div3, "data-t", "main-view");
      attr(div3, "class", "wrapper");
    },
    m(target, anchor) {
      mount_component(search, target, anchor);
      insert(target, t0, anchor);
      mount_component(safetylarge, target, anchor);
      insert(target, t1, anchor);
      insert(target, div3, anchor);
      append(div3, div0);
      if_blocks[current_block_type_index].m(div0, null);
      append(div3, t2);
      if (if_block1)
        if_block1.m(div3, null);
      append(div3, t3);
      append(div3, div1);
      mount_component(contentfilters, div1, null);
      append(div3, t4);
      append(div3, div2);
      mount_component(encryptedconnection, div2, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const safetylarge_changes = {};
      if (dirty & /*domain*/
      2)
        safetylarge_changes.domain = /*domain*/
        ctx2[1];
      if (dirty & /*risk*/
      8)
        safetylarge_changes.risk = /*risk*/
        ctx2[3];
      safetylarge.$set(safetylarge_changes);
      if_block0.p(ctx2, dirty);
      if (
        /*privacyAssessment*/
        ctx2[2]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*privacyAssessment*/
          4) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$4(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div3, t3);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      const contentfilters_changes = {};
      if (dirty & /*contentFilters*/
      1)
        contentfilters_changes.contentFilters = /*contentFilters*/
        ctx2[0];
      contentfilters.$set(contentfilters_changes);
      const encryptedconnection_changes = {};
      if (dirty & /*url*/
      64)
        encryptedconnection_changes.url = /*url*/
        ctx2[6];
      encryptedconnection.$set(encryptedconnection_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(search.$$.fragment, local);
      transition_in(safetylarge.$$.fragment, local);
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(contentfilters.$$.fragment, local);
      transition_in(encryptedconnection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(search.$$.fragment, local);
      transition_out(safetylarge.$$.fragment, local);
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(contentfilters.$$.fragment, local);
      transition_out(encryptedconnection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(search, detaching);
      if (detaching)
        detach(t0);
      destroy_component(safetylarge, detaching);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div3);
      if_blocks[current_block_type_index].d();
      if (if_block1)
        if_block1.d();
      destroy_component(contentfilters);
      destroy_component(encryptedconnection);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { contentFilters } = $$props;
  let { domain } = $$props;
  let { privacyAssessment } = $$props;
  let { risk } = $$props;
  let { tabId } = $$props;
  let { trackerBlockingOn } = $$props;
  let { url } = $$props;
  const dispatch = createEventDispatcher();
  const setTrackerBlocking_handler = ({ detail }) => dispatch("setTrackerBlocking", detail);
  const openTrackerBlocking_handler = () => dispatch("openTrackerBlocking");
  const click_handler = () => dispatch("openPolicy");
  const click_handler_1 = () => dispatch("openContentFilters");
  $$self.$$set = ($$props2) => {
    if ("contentFilters" in $$props2)
      $$invalidate(0, contentFilters = $$props2.contentFilters);
    if ("domain" in $$props2)
      $$invalidate(1, domain = $$props2.domain);
    if ("privacyAssessment" in $$props2)
      $$invalidate(2, privacyAssessment = $$props2.privacyAssessment);
    if ("risk" in $$props2)
      $$invalidate(3, risk = $$props2.risk);
    if ("tabId" in $$props2)
      $$invalidate(4, tabId = $$props2.tabId);
    if ("trackerBlockingOn" in $$props2)
      $$invalidate(5, trackerBlockingOn = $$props2.trackerBlockingOn);
    if ("url" in $$props2)
      $$invalidate(6, url = $$props2.url);
  };
  return [
    contentFilters,
    domain,
    privacyAssessment,
    risk,
    tabId,
    trackerBlockingOn,
    url,
    dispatch,
    setTrackerBlocking_handler,
    openTrackerBlocking_handler,
    click_handler,
    click_handler_1
  ];
}
class MainView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$7, safe_not_equal, {
      contentFilters: 0,
      domain: 1,
      privacyAssessment: 2,
      risk: 3,
      tabId: 4,
      trackerBlockingOn: 5,
      url: 6
    });
  }
}
const MenuView_svelte_svelte_type_style_lang = "";
function create_if_block_1$3(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Privacy Settings";
      attr(button, "class", "container__element svelte-1dpjixc");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*click_handler*/
            ctx[7]
          ),
          listen(
            button,
            "keypress",
            /*keypress_handler*/
            ctx[8]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$6(ctx) {
  let close;
  let t0;
  let div;
  let a0;
  let t1_value = (
    /*getMessage*/
    ctx[3]("support") + ""
  );
  let t1;
  let t2;
  let a1;
  let t3_value = (
    /*getMessage*/
    ctx[3]("legaldocs_terms") + ""
  );
  let t3;
  let t4;
  let a2;
  let t5_value = (
    /*getMessage*/
    ctx[3]("legaldocs_privacy") + ""
  );
  let t5;
  let t6;
  let t7;
  let current;
  close = new Close({});
  close.$on(
    "close",
    /*close_handler*/
    ctx[6]
  );
  let if_block0 = (
    /*FIREFOX*/
    ctx[1] && create_if_block_1$3(ctx)
  );
  return {
    c() {
      create_component(close.$$.fragment);
      t0 = space();
      div = element("div");
      a0 = element("a");
      t1 = text(t1_value);
      t2 = space();
      a1 = element("a");
      t3 = text(t3_value);
      t4 = space();
      a2 = element("a");
      t5 = text(t5_value);
      t6 = space();
      if (if_block0)
        if_block0.c();
      t7 = space();
      attr(
        a0,
        "href",
        /*supportUrl*/
        ctx[0]
      );
      attr(a0, "target", "_blank");
      attr(a0, "class", "container__element svelte-1dpjixc");
      attr(
        a1,
        "href",
        /*termsUrl*/
        ctx[4]()
      );
      attr(a1, "target", "_blank");
      attr(a1, "class", "container__element svelte-1dpjixc");
      attr(
        a2,
        "href",
        /*privacyPolicyUrl*/
        ctx[5]()
      );
      attr(a2, "target", "_blank");
      attr(a2, "class", "container__element svelte-1dpjixc");
      attr(div, "data-t", "menu-view");
      attr(div, "class", "container");
    },
    m(target, anchor) {
      mount_component(close, target, anchor);
      insert(target, t0, anchor);
      insert(target, div, anchor);
      append(div, a0);
      append(a0, t1);
      append(div, t2);
      append(div, a1);
      append(a1, t3);
      append(div, t4);
      append(div, a2);
      append(a2, t5);
      append(div, t6);
      if (if_block0)
        if_block0.m(div, null);
      append(div, t7);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*supportUrl*/
      1) {
        attr(
          a0,
          "href",
          /*supportUrl*/
          ctx2[0]
        );
      }
      if (
        /*FIREFOX*/
        ctx2[1]
      )
        if_block0.p(ctx2, dirty);
    },
    i(local) {
      if (current)
        return;
      transition_in(close.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(close.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(close, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
      if (if_block0)
        if_block0.d();
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  const FIREFOX = BROWSER === "firefox";
  const dispatch = createEventDispatcher();
  const getMessage2 = chrome.i18n.getMessage;
  let supportUrl = "";
  onMount(async () => {
    $$invalidate(0, supportUrl = await getSupportUrl());
  });
  async function getSupportUrl() {
    const url = new URL("https://help.superantispywareext.com/");
    const userConsentedToDataTransmission = await getStoredData(TRANSMIT_STATS_STORAGE_KEY);
    if (userConsentedToDataTransmission) {
      const grp = await getTestGroup();
      url.searchParams.append("dist", DISTRIBUTION);
      url.searchParams.append("v", VERSION);
      url.searchParams.append("brw", BROWSER);
      url.searchParams.append("grp", grp.toString());
    }
    return url.toString();
  }
  const termsUrl = () => FIREFOX ? chrome.runtime.getURL("/ui/legal/terms-of-use.html") : "https://www.superantispywareext.com/legal/terms-of-use.html";
  const privacyPolicyUrl = () => FIREFOX ? chrome.runtime.getURL("/ui/legal/privacy-policy.html") : "https://www.superantispywareext.com/legal/privacy-policy.html";
  const close_handler = () => dispatch("close");
  const click_handler = () => dispatch("openSettings");
  const keypress_handler = () => dispatch("openSettings");
  return [
    supportUrl,
    FIREFOX,
    dispatch,
    getMessage2,
    termsUrl,
    privacyPolicyUrl,
    close_handler,
    click_handler,
    keypress_handler
  ];
}
class MenuView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$6, safe_not_equal, {});
  }
}
const OfflineView_svelte_svelte_type_style_lang = "";
function create_fragment$5(ctx) {
  let div;
  let raw_value = getMessage("offline") + "";
  return {
    c() {
      div = element("div");
      attr(div, "data-t", "offline-view");
      attr(div, "class", "svelte-h0cgj5");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
class OfflineView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$5, safe_not_equal, {});
  }
}
const PolicyView_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i].id;
  child_ctx[9] = list[i].policyCases;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i].id;
  child_ctx[12] = list[i].classification;
  return child_ctx;
}
function create_if_block$3(ctx) {
  let div1;
  let div0;
  let h1;
  let t1;
  let h2;
  let t2;
  let t3;
  let t4;
  let current;
  let each_value = (
    /*privacyAssessment*/
    ctx[1].policyGroups
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let if_block = (
    /*scrollable*/
    ctx[3] && create_if_block_1$2()
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      h1 = element("h1");
      h1.textContent = `${/*getMessage*/
      ctx[5]("terms_title")}`;
      t1 = space();
      h2 = element("h2");
      t2 = text(
        /*domain*/
        ctx[0]
      );
      t3 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t4 = space();
      if (if_block)
        if_block.c();
      attr(h1, "class", "svelte-2c9sis");
      attr(h2, "data-t", "policy-view__domain");
      attr(h2, "class", "svelte-2c9sis");
      attr(div0, "class", "container__pad svelte-2c9sis");
      attr(div1, "class", "container svelte-2c9sis");
      attr(div1, "data-t", "policy-view");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, h1);
      append(div0, t1);
      append(div0, h2);
      append(h2, t2);
      append(div0, t3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div0, null);
        }
      }
      append(div1, t4);
      if (if_block)
        if_block.m(div1, null);
      ctx[7](div1);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*domain*/
      1)
        set_data(
          t2,
          /*domain*/
          ctx2[0]
        );
      if (dirty & /*privacyAssessment, getMessage*/
      34) {
        each_value = /*privacyAssessment*/
        ctx2[1].policyGroups;
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div0, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (
        /*scrollable*/
        ctx2[3]
      ) {
        if (if_block)
          ;
        else {
          if_block = create_if_block_1$2();
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_each(each_blocks, detaching);
      if (if_block)
        if_block.d();
      ctx[7](null);
    }
  };
}
function create_each_block_1(ctx) {
  let li;
  let span0;
  let check;
  let t0;
  let span1;
  let t1_value = (
    /*getMessage*/
    ctx[5](`terms_case${/*id*/
    ctx[8]}`) + ""
  );
  let t1;
  let li_data_t_value;
  let current;
  check = new Check({
    props: {
      color: (
        /*classification*/
        ctx[12]
      ),
      width: 20
    }
  });
  return {
    c() {
      li = element("li");
      span0 = element("span");
      create_component(check.$$.fragment);
      t0 = space();
      span1 = element("span");
      t1 = text(t1_value);
      attr(span0, "class", "svelte-2c9sis");
      attr(span1, "class", "svelte-2c9sis");
      attr(li, "data-t", li_data_t_value = `policy-view__case--${/*id*/
      ctx[8]}`);
      attr(li, "class", "svelte-2c9sis");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, span0);
      mount_component(check, span0, null);
      append(li, t0);
      append(li, span1);
      append(span1, t1);
      current = true;
    },
    p(ctx2, dirty) {
      const check_changes = {};
      if (dirty & /*privacyAssessment*/
      2)
        check_changes.color = /*classification*/
        ctx2[12];
      check.$set(check_changes);
      if ((!current || dirty & /*privacyAssessment*/
      2) && t1_value !== (t1_value = /*getMessage*/
      ctx2[5](`terms_case${/*id*/
      ctx2[8]}`) + ""))
        set_data(t1, t1_value);
      if (!current || dirty & /*privacyAssessment*/
      2 && li_data_t_value !== (li_data_t_value = `policy-view__case--${/*id*/
      ctx2[8]}`)) {
        attr(li, "data-t", li_data_t_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(check.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(check.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(li);
      destroy_component(check);
    }
  };
}
function create_each_block$1(ctx) {
  let h3;
  let t0_value = (
    /*getMessage*/
    ctx[5](`terms_group${/*id*/
    ctx[8]}`) + ""
  );
  let t0;
  let h3_data_t_value;
  let t1;
  let ul;
  let t2;
  let current;
  let each_value_1 = (
    /*policyCases*/
    ctx[9]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      h3 = element("h3");
      t0 = text(t0_value);
      t1 = space();
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      attr(h3, "data-t", h3_data_t_value = `policy-view__group--${/*id*/
      ctx[8]}`);
      attr(h3, "class", "svelte-2c9sis");
    },
    m(target, anchor) {
      insert(target, h3, anchor);
      append(h3, t0);
      insert(target, t1, anchor);
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      append(ul, t2);
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty & /*privacyAssessment*/
      2) && t0_value !== (t0_value = /*getMessage*/
      ctx2[5](`terms_group${/*id*/
      ctx2[8]}`) + ""))
        set_data(t0, t0_value);
      if (!current || dirty & /*privacyAssessment*/
      2 && h3_data_t_value !== (h3_data_t_value = `policy-view__group--${/*id*/
      ctx2[8]}`)) {
        attr(h3, "data-t", h3_data_t_value);
      }
      if (dirty & /*privacyAssessment, getMessage*/
      34) {
        each_value_1 = /*policyCases*/
        ctx2[9];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, t2);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(h3);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(ul);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_1$2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "data-t", "policy-view__scroll");
      attr(div, "class", "container__scroll svelte-2c9sis");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$4(ctx) {
  let close;
  let t;
  let if_block_anchor;
  let current;
  close = new Close({});
  close.$on(
    "close",
    /*close_handler*/
    ctx[6]
  );
  let if_block = (
    /*privacyAssessment*/
    ctx[1] && create_if_block$3(ctx)
  );
  return {
    c() {
      create_component(close.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(close, target, anchor);
      insert(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*privacyAssessment*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*privacyAssessment*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(close.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(close.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      destroy_component(close, detaching);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { domain } = $$props;
  let { privacyAssessment } = $$props;
  let container;
  let scrollable = false;
  const dispatch = createEventDispatcher();
  const getMessage2 = chrome.i18n.getMessage;
  onMount(() => {
    $$invalidate(3, scrollable = container.scrollHeight > container.clientHeight);
  });
  const close_handler = () => dispatch("close");
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      container = $$value;
      $$invalidate(2, container);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("domain" in $$props2)
      $$invalidate(0, domain = $$props2.domain);
    if ("privacyAssessment" in $$props2)
      $$invalidate(1, privacyAssessment = $$props2.privacyAssessment);
  };
  return [
    domain,
    privacyAssessment,
    container,
    scrollable,
    dispatch,
    getMessage2,
    close_handler,
    div1_binding
  ];
}
class PolicyView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { domain: 0, privacyAssessment: 1 });
  }
}
const SettingsView_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let close;
  let t0;
  let div2;
  let p0;
  let t3;
  let p1;
  let t7;
  let hr;
  let t8;
  let div1;
  let div0;
  let t10;
  let toggle;
  let current;
  close = new Close({});
  close.$on(
    "close",
    /*close_handler*/
    ctx[3]
  );
  toggle = new Toggle({ props: { on: (
    /*transmitStats*/
    ctx[0]
  ) } });
  toggle.$on(
    "change",
    /*change_handler*/
    ctx[4]
  );
  return {
    c() {
      create_component(close.$$.fragment);
      t0 = space();
      div2 = element("div");
      p0 = element("p");
      p0.textContent = `${TITLE} does not collect or store any personal data or any data that can be
    traced back to you.`;
      t3 = space();
      p1 = element("p");
      p1.textContent = `You can help us improve ${TITLE} by allowing us to collect a small amount of
    anonymous statistical data.`;
      t7 = space();
      hr = element("hr");
      t8 = space();
      div1 = element("div");
      div0 = element("div");
      div0.textContent = "Transmit statistical data";
      t10 = space();
      create_component(toggle.$$.fragment);
      attr(p0, "class", "svelte-qzinol");
      attr(p1, "class", "svelte-qzinol");
      attr(hr, "class", "svelte-qzinol");
      attr(div0, "class", "svelte-qzinol");
      attr(div1, "class", "container__element svelte-qzinol");
      attr(div2, "class", "container svelte-qzinol");
    },
    m(target, anchor) {
      mount_component(close, target, anchor);
      insert(target, t0, anchor);
      insert(target, div2, anchor);
      append(div2, p0);
      append(div2, t3);
      append(div2, p1);
      append(div2, t7);
      append(div2, hr);
      append(div2, t8);
      append(div2, div1);
      append(div1, div0);
      append(div1, t10);
      mount_component(toggle, div1, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const toggle_changes = {};
      if (dirty & /*transmitStats*/
      1)
        toggle_changes.on = /*transmitStats*/
        ctx2[0];
      toggle.$set(toggle_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(close.$$.fragment, local);
      transition_in(toggle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(close.$$.fragment, local);
      transition_out(toggle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(close, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div2);
      destroy_component(toggle);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  const dispatch = createEventDispatcher();
  let transmitStats = false;
  onMount(async () => {
    $$invalidate(0, transmitStats = await getStoredData(TRANSMIT_STATS_STORAGE_KEY));
  });
  async function setTransmitStats(on) {
    $$invalidate(0, transmitStats = on);
    await chrome.storage.local.set({
      [TRANSMIT_STATS_STORAGE_KEY]: transmitStats
    });
    setUninstallUrl();
  }
  const close_handler = () => dispatch("close");
  const change_handler = ({ detail }) => setTransmitStats(detail.on);
  return [transmitStats, dispatch, setTransmitStats, close_handler, change_handler];
}
class SettingsView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
  }
}
const TrackerBlockingView_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
}
function create_else_block_1(ctx) {
  let img;
  let img_src_value;
  let t;
  let div;
  let raw_value = (
    /*getMessageB*/
    ctx[3]("privacy_protection_off") + ""
  );
  return {
    c() {
      img = element("img");
      t = space();
      div = element("div");
      if (!src_url_equal(img.src, img_src_value = "/resources/Attention-triangle-yellow.svg"))
        attr(img, "src", img_src_value);
      attr(img, "width", "24");
      attr(img, "alt", "");
    },
    m(target, anchor) {
      insert(target, img, anchor);
      insert(target, t, anchor);
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      if (detaching)
        detach(t);
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_1$1(ctx) {
  let check;
  let t;
  let div;
  let raw_value = (
    /*getMessageB*/
    ctx[3]("privacy_protection_on") + ""
  );
  let current;
  check = new Check({ props: { color: Risk.Green } });
  return {
    c() {
      create_component(check.$$.fragment);
      t = space();
      div = element("div");
    },
    m(target, anchor) {
      mount_component(check, target, anchor);
      insert(target, t, anchor);
      insert(target, div, anchor);
      div.innerHTML = raw_value;
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(check.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(check.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(check, detaching);
      if (detaching)
        detach(t);
      if (detaching)
        detach(div);
    }
  };
}
function create_else_block(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      i.textContent = "There are no exempted websites";
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(i);
    }
  };
}
function create_if_block$2(ctx) {
  let each_1_anchor;
  let current;
  let each_value = (
    /*allowlistedDomains*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*toggleAllowlisted, allowlistedDomains*/
      36) {
        each_value = /*allowlistedDomains*/
        ctx2[2];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_each_block(ctx) {
  let div1;
  let div0;
  let t0_value = (
    /*allowlistedDomain*/
    ctx[13] + ""
  );
  let t0;
  let t1;
  let button;
  let svgplus;
  let t2;
  let current;
  let mounted;
  let dispose;
  svgplus = new SvgPlus({ props: { width: 18 } });
  function click_handler() {
    return (
      /*click_handler*/
      ctx[9](
        /*allowlistedDomain*/
        ctx[13]
      )
    );
  }
  function keypress_handler() {
    return (
      /*keypress_handler*/
      ctx[10](
        /*allowlistedDomain*/
        ctx[13]
      )
    );
  }
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      button = element("button");
      create_component(svgplus.$$.fragment);
      t2 = space();
      attr(div0, "class", "domain svelte-1wqes8q");
      attr(button, "class", "remove svelte-1wqes8q");
      attr(div1, "class", "container__element svelte-1wqes8q");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, t0);
      append(div1, t1);
      append(div1, button);
      mount_component(svgplus, button, null);
      append(div1, t2);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button, "click", click_handler),
          listen(button, "keypress", keypress_handler)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & /*allowlistedDomains*/
      4) && t0_value !== (t0_value = /*allowlistedDomain*/
      ctx[13] + ""))
        set_data(t0, t0_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(svgplus.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(svgplus.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_component(svgplus);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$2(ctx) {
  let close;
  let t0;
  let div5;
  let div0;
  let current_block_type_index;
  let if_block0;
  let t1;
  let toggle0;
  let t2;
  let h2;
  let t4;
  let div3;
  let div1;
  let t5;
  let div2;
  let t6;
  let t7;
  let toggle1;
  let t8;
  let div4;
  let current_block_type_index_1;
  let if_block1;
  let current;
  close = new Close({});
  close.$on(
    "close",
    /*close_handler*/
    ctx[6]
  );
  const if_block_creators = [create_if_block_1$1, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*trackerBlockingOn*/
      ctx2[1]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  toggle0 = new Toggle({
    props: { on: (
      /*trackerBlockingOn*/
      ctx[1]
    ) }
  });
  toggle0.$on(
    "change",
    /*change_handler*/
    ctx[7]
  );
  toggle1 = new Toggle({
    props: {
      on: (
        /*allowlistedDomains*/
        ctx[2].includes(
          /*domain*/
          ctx[0]
        )
      )
    }
  });
  toggle1.$on(
    "change",
    /*change_handler_1*/
    ctx[8]
  );
  const if_block_creators_1 = [create_if_block$2, create_else_block];
  const if_blocks_1 = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*allowlistedDomains*/
      ctx2[2].length
    )
      return 0;
    return 1;
  }
  current_block_type_index_1 = select_block_type_1(ctx);
  if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
  return {
    c() {
      create_component(close.$$.fragment);
      t0 = space();
      div5 = element("div");
      div0 = element("div");
      if_block0.c();
      t1 = space();
      create_component(toggle0.$$.fragment);
      t2 = space();
      h2 = element("h2");
      h2.textContent = "Exempted websites";
      t4 = space();
      div3 = element("div");
      div1 = element("div");
      t5 = space();
      div2 = element("div");
      t6 = text(
        /*domain*/
        ctx[0]
      );
      t7 = space();
      create_component(toggle1.$$.fragment);
      t8 = space();
      div4 = element("div");
      if_block1.c();
      attr(div0, "class", "item");
      attr(h2, "class", "svelte-1wqes8q");
      attr(div2, "class", "domain svelte-1wqes8q");
      attr(div3, "class", "item");
      attr(div4, "class", "container svelte-1wqes8q");
    },
    m(target, anchor) {
      mount_component(close, target, anchor);
      insert(target, t0, anchor);
      insert(target, div5, anchor);
      append(div5, div0);
      if_blocks[current_block_type_index].m(div0, null);
      append(div0, t1);
      mount_component(toggle0, div0, null);
      append(div5, t2);
      append(div5, h2);
      append(div5, t4);
      append(div5, div3);
      append(div3, div1);
      append(div3, t5);
      append(div3, div2);
      append(div2, t6);
      append(div3, t7);
      mount_component(toggle1, div3, null);
      append(div5, t8);
      append(div5, div4);
      if_blocks_1[current_block_type_index_1].m(div4, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
          if_block0.p(ctx2, dirty);
        }
        transition_in(if_block0, 1);
        if_block0.m(div0, t1);
      }
      const toggle0_changes = {};
      if (dirty & /*trackerBlockingOn*/
      2)
        toggle0_changes.on = /*trackerBlockingOn*/
        ctx2[1];
      toggle0.$set(toggle0_changes);
      if (!current || dirty & /*domain*/
      1)
        set_data(
          t6,
          /*domain*/
          ctx2[0]
        );
      const toggle1_changes = {};
      if (dirty & /*allowlistedDomains, domain*/
      5)
        toggle1_changes.on = /*allowlistedDomains*/
        ctx2[2].includes(
          /*domain*/
          ctx2[0]
        );
      toggle1.$set(toggle1_changes);
      let previous_block_index_1 = current_block_type_index_1;
      current_block_type_index_1 = select_block_type_1(ctx2);
      if (current_block_type_index_1 === previous_block_index_1) {
        if_blocks_1[current_block_type_index_1].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
          if_blocks_1[previous_block_index_1] = null;
        });
        check_outros();
        if_block1 = if_blocks_1[current_block_type_index_1];
        if (!if_block1) {
          if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx2);
          if_block1.c();
        } else {
          if_block1.p(ctx2, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(div4, null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(close.$$.fragment, local);
      transition_in(if_block0);
      transition_in(toggle0.$$.fragment, local);
      transition_in(toggle1.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(close.$$.fragment, local);
      transition_out(if_block0);
      transition_out(toggle0.$$.fragment, local);
      transition_out(toggle1.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      destroy_component(close, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div5);
      if_blocks[current_block_type_index].d();
      destroy_component(toggle0);
      destroy_component(toggle1);
      if_blocks_1[current_block_type_index_1].d();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { domain } = $$props;
  let { trackerBlockingOn } = $$props;
  let allowlistedDomains = [];
  const getMessage2 = chrome.i18n.getMessage;
  const getMessageB = (key) => getMessage2(key).replace("<b>", '<b style="text-transform: uppercase;">');
  const dispatch = createEventDispatcher();
  async function toggleAllowlisted(domain2, allowlisted) {
    if (allowlisted) {
      await addDomainToAllowlist(domain2);
      $$invalidate(2, allowlistedDomains = [...allowlistedDomains, domain2].sort());
    } else {
      await removeDomainFromAllowlist(domain2);
      $$invalidate(2, allowlistedDomains = allowlistedDomains.filter((d) => d !== domain2));
    }
    reloadCurrentTabOnDomain(domain2);
  }
  async function reloadCurrentTabOnDomain(domain2) {
    const tab = await getActiveTab();
    if (tab && tab.url && getDomain(tab.url) === domain2) {
      setTimeout(() => chrome.tabs.reload(tab.id), 1500);
    }
  }
  onMount(() => {
    getAllowlistedDomains().then((r) => $$invalidate(2, allowlistedDomains = r));
  });
  const close_handler = () => dispatch("close");
  const change_handler = ({ detail }) => dispatch("setTrackerBlocking", detail.on);
  const change_handler_1 = ({ detail }) => toggleAllowlisted(domain, detail.on);
  const click_handler = (allowlistedDomain) => toggleAllowlisted(allowlistedDomain, false);
  const keypress_handler = (allowlistedDomain) => toggleAllowlisted(allowlistedDomain, false);
  $$self.$$set = ($$props2) => {
    if ("domain" in $$props2)
      $$invalidate(0, domain = $$props2.domain);
    if ("trackerBlockingOn" in $$props2)
      $$invalidate(1, trackerBlockingOn = $$props2.trackerBlockingOn);
  };
  return [
    domain,
    trackerBlockingOn,
    allowlistedDomains,
    getMessageB,
    dispatch,
    toggleAllowlisted,
    close_handler,
    change_handler,
    change_handler_1,
    click_handler,
    keypress_handler
  ];
}
class TrackerBlockingView extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { domain: 0, trackerBlockingOn: 1 });
  }
}
const Footer_svelte_svelte_type_style_lang = "";
function create_if_block$1(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.innerHTML = `<img src="/resources/Menu-btn-yellow.svg" width="36" alt=""/>`;
      attr(button, "data-t", "button-open-menu");
      attr(button, "class", "svelte-1ro6n7p");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*click_handler*/
            ctx[2]
          ),
          listen(
            button,
            "keypress",
            /*keypress_handler*/
            ctx[3]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$1(ctx) {
  let footer;
  let img;
  let img_src_value;
  let t;
  let if_block = (
    /*menu*/
    ctx[0] && create_if_block$1(ctx)
  );
  return {
    c() {
      footer = element("footer");
      img = element("img");
      t = space();
      if (if_block)
        if_block.c();
      if (!src_url_equal(img.src, img_src_value = "/resources/SASExt_logo.png"))
        attr(img, "src", img_src_value);
      attr(img, "width", "240");
      attr(img, "alt", "SUPERAntiSpyware Ext");
      attr(footer, "class", "svelte-1ro6n7p");
    },
    m(target, anchor) {
      insert(target, footer, anchor);
      append(footer, img);
      append(footer, t);
      if (if_block)
        if_block.m(footer, null);
    },
    p(ctx2, [dirty]) {
      if (
        /*menu*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          if_block.m(footer, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(footer);
      if (if_block)
        if_block.d();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { menu } = $$props;
  const dispatch = createEventDispatcher();
  const click_handler = () => dispatch("openMenu");
  const keypress_handler = () => dispatch("openMenu");
  $$self.$$set = ($$props2) => {
    if ("menu" in $$props2)
      $$invalidate(0, menu = $$props2.menu);
  };
  return [menu, dispatch, click_handler, keypress_handler];
}
class Footer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { menu: 0 });
  }
}
const App_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [
    create_if_block_1,
    create_if_block_2,
    create_if_block_3,
    create_if_block_4,
    create_if_block_5,
    create_if_block_6,
    create_if_block_7,
    create_if_block_8,
    create_if_block_9,
    create_if_block_10
  ];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!navigator.onLine)
      return 0;
    if (
      /*currentView*/
      ctx2[7] === View$1.Main
    )
      return 1;
    if (
      /*currentView*/
      ctx2[7] === View$1.TrackerBlocking
    )
      return 2;
    if (
      /*currentView*/
      ctx2[7] === View$1.Policy
    )
      return 3;
    if (
      /*currentView*/
      ctx2[7] === View$1.ContentFilters
    )
      return 4;
    if (
      /*currentView*/
      ctx2[7] === View$1.Menu
    )
      return 5;
    if (
      /*currentView*/
      ctx2[7] === View$1.Settings
    )
      return 6;
    if (
      /*currentView*/
      ctx2[7] === View$1.BlockedHighRisk
    )
      return 7;
    if (
      /*currentView*/
      ctx2[7] === View$1.Empty
    )
      return 8;
    if (
      /*currentView*/
      ctx2[7] === View$1.Disabled
    )
      return 9;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_10(ctx) {
  let disabledview;
  let current;
  disabledview = new DisabledView({});
  disabledview.$on(
    "enable",
    /*load*/
    ctx[11]
  );
  return {
    c() {
      create_component(disabledview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(disabledview, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(disabledview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(disabledview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(disabledview, detaching);
    }
  };
}
function create_if_block_9(ctx) {
  let emptyview;
  let current;
  emptyview = new EmptyView({});
  return {
    c() {
      create_component(emptyview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(emptyview, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(emptyview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(emptyview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(emptyview, detaching);
    }
  };
}
function create_if_block_8(ctx) {
  let blockedhighriskview;
  let current;
  blockedhighriskview = new BlockedHighRiskView({});
  return {
    c() {
      create_component(blockedhighriskview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(blockedhighriskview, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(blockedhighriskview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(blockedhighriskview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(blockedhighriskview, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let settingsview;
  let current;
  settingsview = new SettingsView({});
  settingsview.$on(
    "close",
    /*close_handler_4*/
    ctx[24]
  );
  return {
    c() {
      create_component(settingsview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(settingsview, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(settingsview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(settingsview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(settingsview, detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let menuview;
  let current;
  menuview = new MenuView({});
  menuview.$on(
    "openSettings",
    /*openSettings_handler*/
    ctx[22]
  );
  menuview.$on(
    "close",
    /*close_handler_3*/
    ctx[23]
  );
  return {
    c() {
      create_component(menuview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(menuview, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(menuview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(menuview, detaching);
    }
  };
}
function create_if_block_5(ctx) {
  let contentfiltersview;
  let current;
  contentfiltersview = new ContentFiltersView({
    props: {
      contentFilters: (
        /*contentFilters*/
        ctx[0]
      ),
      stripped: (
        /*stripped*/
        ctx[4]
      ),
      tabId: (
        /*tabId*/
        ctx[5]
      )
    }
  });
  contentfiltersview.$on(
    "close",
    /*close_handler_2*/
    ctx[21]
  );
  return {
    c() {
      create_component(contentfiltersview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(contentfiltersview, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const contentfiltersview_changes = {};
      if (dirty[0] & /*contentFilters*/
      1)
        contentfiltersview_changes.contentFilters = /*contentFilters*/
        ctx2[0];
      if (dirty[0] & /*stripped*/
      16)
        contentfiltersview_changes.stripped = /*stripped*/
        ctx2[4];
      if (dirty[0] & /*tabId*/
      32)
        contentfiltersview_changes.tabId = /*tabId*/
        ctx2[5];
      contentfiltersview.$set(contentfiltersview_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(contentfiltersview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(contentfiltersview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(contentfiltersview, detaching);
    }
  };
}
function create_if_block_4(ctx) {
  let policyview;
  let current;
  policyview = new PolicyView({
    props: {
      domain: (
        /*domain*/
        ctx[1]
      ),
      privacyAssessment: (
        /*privacyAssessment*/
        ctx[2]
      )
    }
  });
  policyview.$on(
    "close",
    /*close_handler_1*/
    ctx[20]
  );
  return {
    c() {
      create_component(policyview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(policyview, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const policyview_changes = {};
      if (dirty[0] & /*domain*/
      2)
        policyview_changes.domain = /*domain*/
        ctx2[1];
      if (dirty[0] & /*privacyAssessment*/
      4)
        policyview_changes.privacyAssessment = /*privacyAssessment*/
        ctx2[2];
      policyview.$set(policyview_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(policyview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(policyview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(policyview, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let trackerblockingview;
  let current;
  trackerblockingview = new TrackerBlockingView({
    props: {
      domain: (
        /*domain*/
        ctx[1]
      ),
      trackerBlockingOn: (
        /*trackerBlockingOn*/
        ctx[10]
      )
    }
  });
  trackerblockingview.$on(
    "close",
    /*close_handler*/
    ctx[18]
  );
  trackerblockingview.$on(
    "setTrackerBlocking",
    /*setTrackerBlocking_handler_1*/
    ctx[19]
  );
  return {
    c() {
      create_component(trackerblockingview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(trackerblockingview, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const trackerblockingview_changes = {};
      if (dirty[0] & /*domain*/
      2)
        trackerblockingview_changes.domain = /*domain*/
        ctx2[1];
      if (dirty[0] & /*trackerBlockingOn*/
      1024)
        trackerblockingview_changes.trackerBlockingOn = /*trackerBlockingOn*/
        ctx2[10];
      trackerblockingview.$set(trackerblockingview_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(trackerblockingview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(trackerblockingview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(trackerblockingview, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let mainview;
  let current;
  mainview = new MainView({
    props: {
      contentFilters: (
        /*contentFilters*/
        ctx[0]
      ),
      domain: (
        /*domain*/
        ctx[1]
      ),
      privacyAssessment: (
        /*privacyAssessment*/
        ctx[2]
      ),
      risk: (
        /*risk*/
        ctx[3]
      ),
      tabId: (
        /*tabId*/
        ctx[5]
      ),
      trackerBlockingOn: (
        /*trackerBlockingOn*/
        ctx[10]
      ),
      url: (
        /*url*/
        ctx[6]
      )
    }
  });
  mainview.$on(
    "openPolicy",
    /*openPolicy_handler*/
    ctx[14]
  );
  mainview.$on(
    "openContentFilters",
    /*openContentFilters_handler*/
    ctx[15]
  );
  mainview.$on(
    "openTrackerBlocking",
    /*openTrackerBlocking_handler*/
    ctx[16]
  );
  mainview.$on(
    "setTrackerBlocking",
    /*setTrackerBlocking_handler*/
    ctx[17]
  );
  return {
    c() {
      create_component(mainview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(mainview, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const mainview_changes = {};
      if (dirty[0] & /*contentFilters*/
      1)
        mainview_changes.contentFilters = /*contentFilters*/
        ctx2[0];
      if (dirty[0] & /*domain*/
      2)
        mainview_changes.domain = /*domain*/
        ctx2[1];
      if (dirty[0] & /*privacyAssessment*/
      4)
        mainview_changes.privacyAssessment = /*privacyAssessment*/
        ctx2[2];
      if (dirty[0] & /*risk*/
      8)
        mainview_changes.risk = /*risk*/
        ctx2[3];
      if (dirty[0] & /*tabId*/
      32)
        mainview_changes.tabId = /*tabId*/
        ctx2[5];
      if (dirty[0] & /*trackerBlockingOn*/
      1024)
        mainview_changes.trackerBlockingOn = /*trackerBlockingOn*/
        ctx2[10];
      if (dirty[0] & /*url*/
      64)
        mainview_changes.url = /*url*/
        ctx2[6];
      mainview.$set(mainview_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(mainview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mainview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(mainview, detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let offlineview;
  let current;
  offlineview = new OfflineView({});
  return {
    c() {
      create_component(offlineview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(offlineview, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(offlineview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(offlineview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(offlineview, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let t;
  let footer;
  let current;
  let if_block = (
    /*view*/
    ctx[12] && create_if_block(ctx)
  );
  footer = new Footer({
    props: {
      menu: (
        /*currentView*/
        ctx[7] !== View$1.Menu && /*currentView*/
        ctx[7] !== View$1.Empty && /*currentView*/
        ctx[7] !== View$1.Disabled && !/*siteBlockReason*/
        ctx[9]
      )
    }
  });
  footer.$on(
    "openMenu",
    /*openMenu_handler*/
    ctx[25]
  );
  footer.$on(
    "closeMenu",
    /*closeMenu_handler*/
    ctx[26]
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      t = space();
      create_component(footer.$$.fragment);
      attr(div, "class", "svelte-rpq8dg");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      append(div, t);
      mount_component(footer, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*view*/
        ctx2[12]
      )
        if_block.p(ctx2, dirty);
      const footer_changes = {};
      if (dirty[0] & /*currentView, siteBlockReason*/
      640)
        footer_changes.menu = /*currentView*/
        ctx2[7] !== View$1.Menu && /*currentView*/
        ctx2[7] !== View$1.Empty && /*currentView*/
        ctx2[7] !== View$1.Disabled && !/*siteBlockReason*/
        ctx2[9];
      footer.$set(footer_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(footer.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(footer.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      destroy_component(footer);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let enabled;
  let contentFilters;
  let domain;
  let privacyAssessment;
  let risk;
  let stripped = false;
  let tabId;
  let url;
  let currentView = null;
  let previousView;
  let siteBlockReason;
  let trackerBlockingOn;
  onMount(load2);
  async function load2() {
    enabled = await getStoredData(ENABLED_STORAGE_KEY);
    if (enabled) {
      if (!navigator.onLine) {
        view(View$1.Offline);
      } else {
        const tab = await getActiveTab();
        if (tab && tab.id && tab.url) {
          $$invalidate(5, tabId = tab.id);
          $$invalidate(6, url = new URL(tab.url));
          if (isHttp(url)) {
            view(View$1.Main);
            $$invalidate(1, domain = getDomain(url));
            getPrivacyAssessment(domain).then((result) => $$invalidate(2, privacyAssessment = result));
            loadCategorization(url);
            loadContentFilters();
            isTrackerBlockingOn().then((on) => $$invalidate(10, trackerBlockingOn = on));
          } else {
            $$invalidate(9, siteBlockReason = isBlockPage(tab.url));
            if (siteBlockReason === SiteBlockReason.HighRisk) {
              view(View$1.BlockedHighRisk);
            } else if (siteBlockReason === SiteBlockReason.ContentFilter) {
              loadContentFilters();
              $$invalidate(4, stripped = true);
              $$invalidate(3, risk = Risk.Red);
              view(View$1.ContentFilters);
            } else if (builtInBrowserPage(url)) {
              view(View$1.Empty);
            } else {
              view(View$1.Empty);
            }
          }
        } else {
          view(View$1.Empty);
        }
      }
    } else {
      view(View$1.Disabled);
    }
  }
  function view(newView) {
    $$invalidate(8, previousView = currentView);
    $$invalidate(7, currentView = newView);
  }
  async function setBlocking(on) {
    await setTrackerBlocking(on);
    $$invalidate(10, trackerBlockingOn = on);
    setTimeout(chrome.tabs.reload, 2e3);
  }
  async function loadCategorization(url2) {
    const categorization = await getCategorization(url2);
    log("Categorization:", domain, categorization);
    if (categorization) {
      categorization.categories;
      $$invalidate(3, risk = categorization.risk);
    } else {
      $$invalidate(3, risk = Risk.Grey);
    }
  }
  async function loadContentFilters() {
    $$invalidate(0, contentFilters = await getSettings());
  }
  const builtInBrowserPage = (url2) => ["about:", "chrome:", "edge:", "file:"].includes(url2.protocol);
  const openPolicy_handler = () => view(View$1.Policy);
  const openContentFilters_handler = () => view(View$1.ContentFilters);
  const openTrackerBlocking_handler = () => view(View$1.TrackerBlocking);
  const setTrackerBlocking_handler = ({ detail }) => setBlocking(detail);
  const close_handler = () => view(View$1.Main);
  const setTrackerBlocking_handler_1 = ({ detail }) => setBlocking(detail);
  const close_handler_1 = () => view(View$1.Main);
  const close_handler_2 = () => view(View$1.Main);
  const openSettings_handler = () => view(View$1.Settings);
  const close_handler_3 = () => view(View$1.Main);
  const close_handler_4 = () => view(View$1.Menu);
  const openMenu_handler = () => view(View$1.Menu);
  const closeMenu_handler = () => view(previousView);
  return [
    contentFilters,
    domain,
    privacyAssessment,
    risk,
    stripped,
    tabId,
    url,
    currentView,
    previousView,
    siteBlockReason,
    trackerBlockingOn,
    load2,
    view,
    setBlocking,
    openPolicy_handler,
    openContentFilters_handler,
    openTrackerBlocking_handler,
    setTrackerBlocking_handler,
    close_handler,
    setTrackerBlocking_handler_1,
    close_handler_1,
    close_handler_2,
    openSettings_handler,
    close_handler_3,
    close_handler_4,
    openMenu_handler,
    closeMenu_handler
  ];
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);
  }
}
new App({
  target: document.getElementById("app")
});
