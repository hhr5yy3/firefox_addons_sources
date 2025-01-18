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
const blockscreen = "";
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
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
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
const TITLE = "SUPERAntiSpyware Ext";
!browser;
!browser;
const SITE_BLOCK_ALLOWLIST_STORAGE_KEY_PFX = "allow_site";
var SiteBlockReason = /* @__PURE__ */ ((SiteBlockReason2) => {
  SiteBlockReason2["ContentFilter"] = "content_filter";
  SiteBlockReason2["HighRisk"] = "not_safe";
  return SiteBlockReason2;
})(SiteBlockReason || {});
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
async function log(...args) {
}
var fnv1a = { exports: {} };
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
})(fnv1a, fnv1a.exports);
chrome.storage.local;
const storeKey = (domain, reason) => `${SITE_BLOCK_ALLOWLIST_STORAGE_KEY_PFX}:${reason}:${domain}`;
async function addToAllowlist(domain, reason) {
  chrome.storage.session.set({ [storeKey(domain, reason)]: true });
  log("Added to allowlist", reason, domain);
}
const BackProceed_svelte_svelte_type_style_lang = "";
function create_if_block$1(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = `${/*getMessage*/
      ctx[1]("not_safe_button_back")}`;
      attr(button, "id", "button-back");
      attr(button, "data-t", "blockscreen__button-back");
      attr(button, "class", "svelte-83ahxu");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let t0;
  let button;
  let mounted;
  let dispose;
  let if_block = (
    /*previousUrl*/
    ctx[0] && create_if_block$1(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      t0 = space();
      button = element("button");
      button.textContent = `${/*getMessage*/
      ctx[1]("not_safe_button_continue")}`;
      attr(button, "id", "button-continue");
      attr(button, "data-t", "blockscreen__button-proceed");
      attr(button, "class", "svelte-83ahxu");
      attr(div, "class", "svelte-83ahxu");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      append(div, t0);
      append(div, button);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_1*/
          ctx[6]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*previousUrl*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          if_block.m(div, t0);
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
        detach(div);
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { target } = $$props;
  let { reason } = $$props;
  let previousUrl = "";
  const getMessage2 = chrome.i18n.getMessage;
  onMount(async () => {
    const baseUrl = (url) => url.split("?")[0];
    const hostname = (url) => new URL(url).hostname;
    const targetHostname = hostname(target);
    const locationBaseUrl = baseUrl(location.href);
    const history = await chrome.history.search({ text: "" });
    const previousItem = history.find((historyItem) => historyItem.url && baseUrl(historyItem.url) !== locationBaseUrl && hostname(historyItem.url) !== targetHostname);
    if (previousItem) {
      $$invalidate(0, previousUrl = previousItem.url);
    }
  });
  async function proceed() {
    await addToAllowlist(getDomain(target), reason);
    window.location.assign(target);
  }
  const click_handler = () => location.assign(previousUrl);
  const click_handler_1 = () => proceed();
  $$self.$$set = ($$props2) => {
    if ("target" in $$props2)
      $$invalidate(3, target = $$props2.target);
    if ("reason" in $$props2)
      $$invalidate(4, reason = $$props2.reason);
  };
  return [
    previousUrl,
    getMessage2,
    proceed,
    target,
    reason,
    click_handler,
    click_handler_1
  ];
}
class BackProceed extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { target: 3, reason: 4 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let li;
  let img;
  let img_src_value;
  let t0;
  let span;
  let t1_value = getMessage(`content_categories_${/*contentCategory*/
  ctx[3]}`) + "";
  let t1;
  let t2;
  let li_data_t_value;
  return {
    c() {
      li = element("li");
      img = element("img");
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      if (!src_url_equal(img.src, img_src_value = /*getUrl*/
      ctx[2]("/resources/circle-cross.svg")))
        attr(img, "src", img_src_value);
      attr(img, "height", "16");
      attr(img, "alt", "");
      attr(li, "data-t", li_data_t_value = `blockscreen__content-category--${/*contentCategory*/
      ctx[3]}`);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, img);
      append(li, t0);
      append(li, span);
      append(span, t1);
      append(li, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*contentCategories*/
      1 && t1_value !== (t1_value = getMessage(`content_categories_${/*contentCategory*/
      ctx2[3]}`) + ""))
        set_data(t1, t1_value);
      if (dirty & /*contentCategories*/
      1 && li_data_t_value !== (li_data_t_value = `blockscreen__content-category--${/*contentCategory*/
      ctx2[3]}`)) {
        attr(li, "data-t", li_data_t_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_if_block(ctx) {
  let backproceed;
  let current;
  backproceed = new BackProceed({
    props: {
      target: (
        /*originUrl*/
        ctx[1]
      ),
      reason: SiteBlockReason.HighRisk
    }
  });
  return {
    c() {
      create_component(backproceed.$$.fragment);
    },
    m(target, anchor) {
      mount_component(backproceed, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const backproceed_changes = {};
      if (dirty & /*originUrl*/
      2)
        backproceed_changes.target = /*originUrl*/
        ctx2[1];
      backproceed.$set(backproceed_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(backproceed.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(backproceed.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(backproceed, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div2;
  let div1;
  let header;
  let img0;
  let img0_src_value;
  let t0;
  let h1;
  let raw_value = getMessage("website_safety_unsafe") + "";
  let t1;
  let div0;
  let p0;
  let t3;
  let ul;
  let t4;
  let p1;
  let t6;
  let t7;
  let footer;
  let img1;
  let img1_src_value;
  let current;
  let each_value = (
    /*contentCategories*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  let if_block = (
    /*originUrl*/
    ctx[1] && create_if_block(ctx)
  );
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      header = element("header");
      img0 = element("img");
      t0 = space();
      h1 = element("h1");
      t1 = space();
      div0 = element("div");
      p0 = element("p");
      p0.textContent = `${getMessage("not_safe_p1")}`;
      t3 = space();
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t4 = space();
      p1 = element("p");
      p1.textContent = `${getMessage("not_safe_p2")}`;
      t6 = space();
      if (if_block)
        if_block.c();
      t7 = space();
      footer = element("footer");
      img1 = element("img");
      if (!src_url_equal(img0.src, img0_src_value = /*getUrl*/
      ctx[2]("/resources/circle-cross.svg")))
        attr(img0, "src", img0_src_value);
      attr(img0, "height", "96");
      attr(img0, "alt", "");
      attr(div0, "class", "container");
      if (!src_url_equal(img1.src, img1_src_value = "/resources/SASExt_logo.png"))
        attr(img1, "src", img1_src_value);
      attr(img1, "width", "190");
      attr(img1, "alt", TITLE);
      attr(div1, "id", "blockscreen__inner");
      attr(div2, "id", "blockscreen");
      attr(div2, "data-t", "blockscreen--high-risk");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div1);
      append(div1, header);
      append(header, img0);
      append(header, t0);
      append(header, h1);
      h1.innerHTML = raw_value;
      append(div1, t1);
      append(div1, div0);
      append(div0, p0);
      append(div0, t3);
      append(div0, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      append(div0, t4);
      append(div0, p1);
      append(div0, t6);
      if (if_block)
        if_block.m(div0, null);
      append(div1, t7);
      append(div1, footer);
      append(footer, img1);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & /*contentCategories, getMessage, getUrl*/
      5) {
        each_value = /*contentCategories*/
        ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (
        /*originUrl*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*originUrl*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div0, null);
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
      if (detaching)
        detach(div2);
      destroy_each(each_blocks, detaching);
      if (if_block)
        if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let contentCategories = [];
  let originUrl = null;
  const getUrl = chrome.runtime.getURL;
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    $$invalidate(1, originUrl = params.get("url"));
    $$invalidate(0, contentCategories = params.getAll("c"));
  });
  return [contentCategories, originUrl, getUrl];
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
new App({
  target: document.getElementById("app")
});
