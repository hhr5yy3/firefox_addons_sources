var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _badge, _timeOut, _showTooltipDelayed, showTooltipDelayed_fn, _showTooltip, showTooltip_fn, _calculateLeft, calculateLeft_fn, _calculateTop, calculateTop_fn, _hideTooltip, hideTooltip_fn, _resetTooltip, resetTooltip_fn;
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
const main = "";
function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return (
    /** @type {T & S} */
    tar
  );
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
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
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
const VERSION = "1.9.0";
const BROWSER = "firefox";
const TITLE = "SUPERAntiSpyware Ext";
const ONBOARDING = "https://onboarding.superantispywareext.com/";
const OFFBOARDING = "https://offboarding.superantispywareext.com/";
!browser;
!browser;
const TRACKER_BLOCKING_STORAGE_KEY = "privacy_protection";
const GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_STORAGE_KEY = "google_sign_in_prompt_suppression";
const GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_RULE_SET_ID = "suppress-sign-in-with-google";
const QS_PARAM_STRIPPING_RULE_STORAGE_KEY = "tracking_query_parameter_stripping";
const QS_PARAM_STRIPPING_RULE_SET_ID = "strip-tracking-query-parameters";
const TEST_GROUP_STORAGE_KEY = "config:test_group";
const DSE_DISMISED_STORAGE_KEY = "dse:prompt_dismissed";
function cssString(style) {
  return Object.entries(style).map(([k, v]) => `${k}:${v}`).join(";");
}
function getMessage(messageName) {
  const BROWSER_NAME = "Firefox";
  return chrome.i18n.getMessage(messageName).replace(/<BROWSER>/g, BROWSER_NAME).replace(/<TITLE>/g, TITLE);
}
async function getStoredData(key, storage = "local", defaultValue = null) {
  const store = storage === "sync" ? chrome.storage.sync : storage === "session" ? chrome.storage.session : chrome.storage.local;
  const data = await new Promise((res) => store.get(key, res));
  return data && data.hasOwnProperty(key) ? data[key] : defaultValue;
}
async function log(...args) {
}
async function getTestGroup() {
  let testGroup = await getStoredData(TEST_GROUP_STORAGE_KEY, "sync");
  if (!testGroup) {
    testGroup = getRandomArbitrary(1, 12);
    const storage = chrome.storage.sync || chrome.storage.local;
    await storage.set({ [TEST_GROUP_STORAGE_KEY]: testGroup });
  }
  return testGroup;
}
async function getTestDiv(divs) {
  const g = await getTestGroup();
  const rangeSize = 12 / divs;
  for (let i = 1; i <= divs; i++) {
    const start = (i - 1) * rangeSize + 1;
    const end = i * rangeSize;
    if (g >= start && g <= end) {
      return i;
    }
  }
  return null;
}
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var Risk = /* @__PURE__ */ ((Risk2) => {
  Risk2["Red"] = "red";
  Risk2["Orange"] = "orange";
  Risk2["Green"] = "green";
  Risk2["Grey"] = "grey";
  return Risk2;
})(Risk || {});
class Badge {
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
  appendTooltipContent(element2) {
  }
}
_badge = new WeakMap();
_timeOut = new WeakMap();
_showTooltipDelayed = new WeakSet();
showTooltipDelayed_fn = function() {
  __privateSet(this, _timeOut, setTimeout(() => __privateMethod(this, _showTooltip, showTooltip_fn).call(this), 800));
};
_showTooltip = new WeakSet();
showTooltip_fn = function() {
  __privateMethod(this, _resetTooltip, resetTooltip_fn).call(this);
  const element2 = document.createElement("div");
  element2.id = this.tooltipElementId;
  element2.style.transition = `${this.tooltipFadeTime}ms`;
  this.appendTooltipContent(element2);
  document.body.prepend(element2);
  const rect = __privateGet(this, _badge).getBoundingClientRect();
  const left = __privateMethod(this, _calculateLeft, calculateLeft_fn).call(this, rect, element2);
  const top = __privateMethod(this, _calculateTop, calculateTop_fn).call(this, rect, element2);
  element2.style.left = `${left}px`;
  element2.style.top = `${top}px`;
  log("Positioning tooltip", left, top);
  element2.style.opacity = "1";
};
_calculateLeft = new WeakSet();
calculateLeft_fn = function(rect, element2) {
  const MIN_LEFT_MARGIN = 10;
  const left = rect.x - element2.offsetWidth / 2 + rect.width / 2;
  return left > MIN_LEFT_MARGIN ? left : MIN_LEFT_MARGIN;
};
_calculateTop = new WeakSet();
calculateTop_fn = function(rect, element2) {
  const MIN_BOTTOM_MARGIN = 10;
  const BADGE_MARGIN = 7;
  const maxY = window.scrollY + window.innerHeight - MIN_BOTTOM_MARGIN;
  const topY = window.scrollY + rect.y + rect.height + BADGE_MARGIN;
  const bottomY = topY + element2.offsetHeight;
  return bottomY > maxY ? window.scrollY + rect.y - element2.offsetHeight - BADGE_MARGIN : topY;
};
_hideTooltip = new WeakSet();
hideTooltip_fn = function() {
  if (__privateGet(this, _timeOut)) {
    clearTimeout(__privateGet(this, _timeOut));
    __privateSet(this, _timeOut, -1);
  }
  const element2 = document.getElementById(this.tooltipElementId);
  if (element2) {
    element2.style.opacity = "0";
    setTimeout(() => __privateMethod(this, _resetTooltip, resetTooltip_fn).call(this), this.tooltipFadeTime);
  }
};
_resetTooltip = new WeakSet();
resetTooltip_fn = function() {
  const element2 = document.getElementById(this.tooltipElementId);
  if (element2) {
    element2.remove();
  }
};
const TICK_CLASS_NAME = "webscannerpro_tick";
class SafetyBadge extends Badge {
  /**
   * @param categorization - Categorization of website.
   * @param style - Object of CSS values.
   */
  constructor({ categorized, risk }, style) {
    if (!categorized) {
      risk = Risk.Grey;
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
  appendTooltipContent(element2) {
    element2.append(this.buildTooltipBadgeEl());
    element2.append(this.buildTooltipMsgEl());
    element2.append(this.buildTooltipLogoEl());
    element2.classList.add(`webscannerpro_${this.risk}`);
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
    if (!this.categorized || this.risk === Risk.Grey) {
      return "website_safety_unknown";
    }
    if (this.risk === Risk.Green) {
      return "website_safety_safe";
    }
    return "website_safety_unsafe";
  }
}
function hasChildNodeWithClass(element2, className) {
  for (let i = 0; i < element2.childNodes.length; i++) {
    const childNode = element2.childNodes[i];
    if (childNode.nodeType === Node.ELEMENT_NODE) {
      const childEl = childNode;
      if (childEl.classList.contains(className)) {
        return true;
      }
    }
  }
  return false;
}
var Color;
(function(Color2) {
  Color2["Green"] = "#04B72F";
  Color2["Grey"] = "#7F7F7F";
  Color2["Red"] = "#F30011";
  Color2["Lightblue"] = "#10A7E2";
  Color2["Blue"] = "#285972";
  Color2["Darkblue"] = "#0F3544";
  Color2["Yellow"] = "#F9DD0E";
  Color2["Mustard"] = "#EDC20F";
})(Color || (Color = {}));
const Color$1 = Color;
const LOGO = "/resources/SASExt_logo.png";
function setDsePromptDismissed() {
  const storage = chrome.storage.sync || chrome.storage.local;
  try {
    storage.set({ [DSE_DISMISED_STORAGE_KEY]: true });
  } catch (err) {
    console.error(err);
  }
}
const CIRCLE = "/resources/dse/circle.svg";
const KEEP = `/resources/dse/en-${BROWSER}-keep-b.webm`;
async function showDsePrompt() {
  const testDiv = await getTestDiv(2);
  if (testDiv === 2) {
    return;
  }
  const outerContainer = document.createElement("aside");
  addBoxStyle(outerContainer);
  outerContainer.style.left = "50%";
  outerContainer.style.transform = "translate(-50%, 0)";
  outerContainer.style.width = "48rem";
  outerContainer.addEventListener("click", dismiss);
  const arrow = getArrow();
  arrow.style.top = "-48px";
  arrow.style.left = "50%";
  arrow.style.transform = "translate(-50%, 0)";
  const innerContainer = document.createElement("div");
  innerContainer.style.display = "flex";
  innerContainer.style.alignItems = "center";
  innerContainer.style.justifyContent = "space-evenly";
  const left = document.createElement("div");
  left.style.width = "400px";
  left.style.backgroundImage = `url(${chrome.runtime.getURL(CIRCLE)})`;
  left.style.backgroundSize = "400px";
  left.style.backgroundPosition = "center";
  left.style.display = "flex";
  left.style.alignItems = "center";
  left.style.justifyContent = "center";
  left.style.padding = "3rem 0";
  const right = document.createElement("div");
  const video = document.createElement("video");
  video.src = chrome.runtime.getURL(KEEP);
  video.width = 340;
  addVideoProps(video);
  const logo = document.createElement("img");
  logo.src = chrome.runtime.getURL(LOGO);
  logo.width = 200;
  const text2 = document.createElement("span");
  text2.style.color = Color$1.Yellow;
  text2.style.fontWeight = "500";
  addTextContent(text2);
  left.append(video);
  right.append(logo, text2, getDoneButton());
  innerContainer.append(left, right);
  outerContainer.append(arrow, innerContainer);
  document.body.append(outerContainer);
  function dismiss() {
    outerContainer.remove();
    setDsePromptDismissed();
  }
}
function getDoneButton() {
  const button = document.createElement("button");
  button.style.display = "block";
  button.style.marginTop = "16px";
  button.style.padding = "8px 32px 8px 12px";
  button.style.fontSize = "14px";
  button.style.color = "white";
  button.style.backgroundColor = Color$1.Darkblue;
  button.style.outlineWidth = "0px";
  button.style.borderWidth = "0px";
  button.style.borderRadius = "6px";
  button.style.textTransform = "lowercase";
  button.style.fontWeight = "bold";
  button.style.backgroundImage = `url(${chrome.runtime.getURL("/resources/dse/arrow.svg")})`;
  button.style.backgroundSize = "16px";
  button.style.backgroundRepeat = "no-repeat";
  button.style.backgroundPositionX = "calc(100% - 8px)";
  button.style.backgroundPositionY = "50%";
  button.style.cursor = "pointer";
  button.style.boxShadow = "none";
  button.innerText = getMessage("buttons_done");
  return button;
}
function addTextContent(target) {
  const html = getMessage(`dse_keep_${BROWSER}`);
  const dom = new DOMParser().parseFromString(html, "text/html");
  const b = dom.getElementsByTagName("b")[0];
  if (b) {
    b.style.display = "block";
    b.style.padding = "1rem 0";
    b.style.color = "white";
  }
  for (const node of dom.body.childNodes) {
    target.appendChild(node.cloneNode(true));
  }
}
function addBoxStyle(box) {
  box.style.position = "fixed";
  box.style.zIndex = "2147483647";
  box.style.bottom = "0";
  box.style.fontFamily = "sans-serif";
  box.style.fontSize = "1.25rem";
  box.style.lineHeight = "1.75rem";
  box.style.backgroundColor = Color$1.Blue;
}
function getArrow() {
  const W = 96;
  const H = W / 2;
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.innerHTML = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <polygon points="${H},0 ${W},${H} 0,${H}" fill="${Color$1.Blue}" />
    </svg>
  `;
  return el;
}
function addVideoProps(video) {
  video.loop = true;
  video.muted = true;
  video.autoplay = true;
  video.style.clipPath = "inset(1px 1px)";
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
async function isGoogleSignInSuppressionOn() {
  return await areRulesetsActive(
    [GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_RULE_SET_ID],
    GOOGLE_SIGN_IN_PROMPT_SUPPRESSION_STORAGE_KEY
  );
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
async function isQsParamStrippingOn() {
  return await areRulesetsActive(
    [QS_PARAM_STRIPPING_RULE_SET_ID],
    QS_PARAM_STRIPPING_RULE_STORAGE_KEY
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
const internationalBlockLists = [
  "easylist",
  "easyprivacy"
];
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
const JsonContent_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let div;
  let input;
  let t;
  let label;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[3].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[2],
    null
  );
  return {
    c() {
      div = element("div");
      input = element("input");
      t = space();
      label = element("label");
      if (default_slot)
        default_slot.c();
      attr(input, "type", "checkbox");
      attr(
        input,
        "id",
        /*id*/
        ctx[1]
      );
      attr(
        label,
        "for",
        /*id*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, input);
      input.checked = /*checked*/
      ctx[0];
      append(div, t);
      append(div, label);
      if (default_slot) {
        default_slot.m(label, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(
          input,
          "change",
          /*input_change_handler*/
          ctx[4]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*id*/
      2) {
        attr(
          input,
          "id",
          /*id*/
          ctx2[1]
        );
      }
      if (dirty & /*checked*/
      1) {
        input.checked = /*checked*/
        ctx2[0];
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[2],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[2]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[2],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*id*/
      2) {
        attr(
          label,
          "for",
          /*id*/
          ctx2[1]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { id } = $$props;
  let { checked } = $$props;
  const dispatch = createEventDispatcher();
  function input_change_handler() {
    checked = this.checked;
    $$invalidate(0, checked);
  }
  $$self.$$set = ($$props2) => {
    if ("id" in $$props2)
      $$invalidate(1, id = $$props2.id);
    if ("checked" in $$props2)
      $$invalidate(0, checked = $$props2.checked);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*checked*/
    1) {
      {
        if (checked) {
          dispatch("on");
        } else {
          dispatch("off");
        }
      }
    }
  };
  return [checked, id, $$scope, slots, input_change_handler];
}
class Toggle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { id: 1, checked: 0 });
  }
}
function create_fragment$2(ctx) {
  let tr;
  let td0;
  let t0;
  let t1;
  let td1;
  let t2;
  let t3;
  let td2;
  let button0;
  let t5;
  let td3;
  let button1;
  let mounted;
  let dispose;
  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(
        /*key*/
        ctx[0]
      );
      t1 = space();
      td1 = element("td");
      t2 = text(
        /*value*/
        ctx[1]
      );
      t3 = space();
      td2 = element("td");
      button0 = element("button");
      button0.textContent = "Edit";
      t5 = space();
      td3 = element("td");
      button1 = element("button");
      button1.textContent = "Delete";
    },
    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, t2);
      append(tr, t3);
      append(tr, td2);
      append(td2, button0);
      append(tr, t5);
      append(tr, td3);
      append(td3, button1);
      if (!mounted) {
        dispose = [
          listen(
            td1,
            "click",
            /*toggle*/
            ctx[2]
          ),
          listen(
            button0,
            "click",
            /*click_handler*/
            ctx[6]
          ),
          listen(
            button1,
            "click",
            /*click_handler_1*/
            ctx[7]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*key*/
      1)
        set_data(
          t0,
          /*key*/
          ctx2[0]
        );
      if (dirty & /*value*/
      2)
        set_data(
          t2,
          /*value*/
          ctx2[1]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(tr);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { key } = $$props;
  let { value } = $$props;
  let { storage } = $$props;
  function toggle() {
  }
  async function edit(key2) {
    const oldVal = (await storage.get(key2))[key2];
    const type = typeof oldVal;
    const defaultVal = type === "object" ? JSON.stringify(oldVal) : oldVal;
    const newVal = prompt(`Enter new ${type} value for ${key2}`, defaultVal);
    if (newVal !== null) {
      switch (type) {
        case "string":
          await editString(key2, newVal);
          break;
        case "number":
          await editNumber(key2, newVal);
          break;
        case "boolean":
          await editBoolean(key2, newVal);
          break;
        case "object":
          await editObject(key2, newVal);
          break;
      }
    }
  }
  async function editString(key2, value2) {
    storage.set({ [key2]: value2 });
  }
  async function editNumber(key2, value2) {
    if (!value2.match(/^[0-9]+\.?[0-9]*$/)) {
      alert("Not a valid number");
    } else {
      storage.set({ [key2]: Number(value2) });
    }
  }
  async function editBoolean(key2, value2) {
    if (value2 === "true") {
      storage.set({ [key2]: true });
    } else if (value2 === "false") {
      storage.set({ [key2]: false });
    } else {
      alert("Not a valid boolean representation");
    }
  }
  async function editObject(key2, value2) {
    let newObject;
    try {
      newObject = JSON.parse(value2);
    } catch (_a) {
      alert("Not a valid object representation");
      return;
    }
    storage.set({ [key2]: newObject });
  }
  async function del(id) {
    if (confirm(`Delete ${id}?`)) {
      await storage.remove(id);
    }
  }
  const click_handler = () => edit(key);
  const click_handler_1 = () => del(key);
  $$self.$$set = ($$props2) => {
    if ("key" in $$props2)
      $$invalidate(0, key = $$props2.key);
    if ("value" in $$props2)
      $$invalidate(1, value = $$props2.value);
    if ("storage" in $$props2)
      $$invalidate(5, storage = $$props2.storage);
  };
  return [key, value, toggle, edit, del, storage, click_handler, click_handler_1];
}
class StorageItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { key: 0, value: 1, storage: 5 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i].key;
  child_ctx[8] = list[i].value;
  return child_ctx;
}
function create_each_block(ctx) {
  let storageitem;
  let current;
  storageitem = new StorageItem({
    props: {
      storage: (
        /*storage*/
        ctx[0]
      ),
      key: (
        /*key*/
        ctx[7]
      ),
      value: (
        /*value*/
        ctx[8]
      )
    }
  });
  return {
    c() {
      create_component(storageitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(storageitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const storageitem_changes = {};
      if (dirty & /*storage*/
      1)
        storageitem_changes.storage = /*storage*/
        ctx2[0];
      if (dirty & /*items*/
      2)
        storageitem_changes.key = /*key*/
        ctx2[7];
      if (dirty & /*items*/
      2)
        storageitem_changes.value = /*value*/
        ctx2[8];
      storageitem.$set(storageitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(storageitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(storageitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(storageitem, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let section;
  let header;
  let h1;
  let t0;
  let div;
  let button0;
  let t2;
  let button1;
  let t4;
  let table;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  let each_value = (
    /*items*/
    ctx[1]
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
      section = element("section");
      header = element("header");
      h1 = element("h1");
      if (default_slot)
        default_slot.c();
      t0 = space();
      div = element("div");
      button0 = element("button");
      button0.textContent = "Add";
      t2 = space();
      button1 = element("button");
      button1.textContent = "Clear";
      t4 = space();
      table = element("table");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "action");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      append(section, header);
      append(header, h1);
      if (default_slot) {
        default_slot.m(h1, null);
      }
      append(header, t0);
      append(header, div);
      append(div, button0);
      append(div, t2);
      append(div, button1);
      append(section, t4);
      append(section, table);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(table, null);
        }
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*add*/
            ctx[2]
          ),
          listen(
            button1,
            "click",
            /*clear*/
            ctx[3]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (dirty & /*storage, items*/
      3) {
        each_value = /*items*/
        ctx2[1];
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
            each_blocks[i].m(table, null);
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
      transition_in(default_slot, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(section);
      if (default_slot)
        default_slot.d(detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { storage } = $$props;
  let items;
  onMount(async () => {
    await loadStore();
    storage.onChanged.addListener(() => {
      loadStore();
    });
  });
  async function loadStore() {
    const it = await new Promise((res) => storage.get(null, res));
    $$invalidate(1, items = it ? Object.keys(it).map((key) => ({
      key,
      value: JSON.stringify(it[key], null, 2)
    })) : []);
  }
  async function add() {
    const key = prompt("Enter key");
    if (key === null) {
      return;
    }
    if (key === "") {
      alert("Invalid input");
      return;
    }
    const entered = prompt("Enter value");
    if (entered === null) {
      return;
    }
    let value;
    if (entered.match(/^[0-9]+\.?[0-9]*$/)) {
      value = Number(entered);
    } else if (entered === "true") {
      value = true;
    } else if (entered === "false") {
      value = false;
    } else {
      let obj;
      try {
        obj = JSON.parse(entered);
      } catch (_a) {
        console.error("Malformed JSON", entered);
      }
      if (obj) {
        value = obj;
      } else {
        value = entered;
      }
    }
    storage.set({ [key]: value });
  }
  function clear() {
    if (confirm("Clear")) {
      storage.clear();
    }
  }
  $$self.$$set = ($$props2) => {
    if ("storage" in $$props2)
      $$invalidate(0, storage = $$props2.storage);
    if ("$$scope" in $$props2)
      $$invalidate(4, $$scope = $$props2.$$scope);
  };
  $$invalidate(1, items = []);
  return [storage, items, add, clear, $$scope, slots];
}
class Storage extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { storage: 0 });
  }
}
function create_if_block_2(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Onboarding";
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[7]
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
function create_if_block_1(ctx) {
  let a;
  let t;
  return {
    c() {
      a = element("a");
      t = text("Offboarding");
      attr(a, "href", OFFBOARDING);
      attr(a, "target", "_blank");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(a);
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("Google Sign In Suppression");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("Tracking Query Parameter Stripping");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text("Tracker Blocking");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_2(ctx) {
  let t;
  return {
    c() {
      t = text("Sync Storage");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text("Session Storage");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot(ctx) {
  let t;
  return {
    c() {
      t = text("Local Storage");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment(ctx) {
  let main2;
  let header;
  let h10;
  let t1;
  let t2;
  let t3;
  let section0;
  let h11;
  let t5;
  let div0;
  let t6;
  let t7;
  let button;
  let t9;
  let a;
  let t11;
  let span0;
  let t12;
  let span1;
  let t13;
  let span2;
  let t14;
  let section1;
  let h12;
  let t16;
  let div1;
  let toggle0;
  let t17;
  let toggle1;
  let t18;
  let toggle2;
  let t19;
  let t20;
  let storage0;
  let t21;
  let storage1;
  let t22;
  let storage2;
  let current;
  let mounted;
  let dispose;
  let if_block0 = create_if_block_2(ctx);
  let if_block1 = create_if_block_1();
  toggle0 = new Toggle({
    props: {
      id: "debug-toggle-google-sign-in-supression",
      checked: (
        /*googleSignInSuppressionOn*/
        ctx[0]
      ),
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  toggle0.$on(
    "on",
    /*on_handler*/
    ctx[9]
  );
  toggle0.$on(
    "off",
    /*off_handler*/
    ctx[10]
  );
  toggle1 = new Toggle({
    props: {
      id: "debug-toggle-tracking-query-parameter-stripping",
      checked: (
        /*qsParamStrippingOn*/
        ctx[1]
      ),
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  toggle1.$on(
    "on",
    /*on_handler_1*/
    ctx[11]
  );
  toggle1.$on(
    "off",
    /*off_handler_1*/
    ctx[12]
  );
  toggle2 = new Toggle({
    props: {
      id: "debug-toggle-tracker-blocking",
      checked: (
        /*trackerBlockingOn*/
        ctx[2]
      ),
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  toggle2.$on(
    "on",
    /*on_handler_2*/
    ctx[13]
  );
  toggle2.$on(
    "off",
    /*off_handler_2*/
    ctx[14]
  );
  let if_block2 = BROWSER !== "firefox";
  storage0 = new Storage({
    props: {
      storage: (
        /*sync*/
        ctx[3]
      ),
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  storage1 = new Storage({
    props: {
      storage: (
        /*session*/
        ctx[5]
      ),
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  storage2 = new Storage({
    props: {
      storage: (
        /*local*/
        ctx[4]
      ),
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      main2 = element("main");
      header = element("header");
      h10 = element("h1");
      h10.textContent = `${TITLE}`;
      t1 = space();
      t2 = text(VERSION);
      t3 = space();
      section0 = element("section");
      h11 = element("h1");
      h11.textContent = "Quick Access";
      t5 = space();
      div0 = element("div");
      if (if_block0)
        if_block0.c();
      t6 = space();
      if (if_block1)
        if_block1.c();
      t7 = space();
      button = element("button");
      button.textContent = "Show DSE prompt";
      t9 = space();
      a = element("a");
      a.textContent = "Not safe";
      t11 = space();
      span0 = element("span");
      t12 = space();
      span1 = element("span");
      t13 = space();
      span2 = element("span");
      t14 = space();
      section1 = element("section");
      h12 = element("h1");
      h12.textContent = "Settings";
      t16 = space();
      div1 = element("div");
      create_component(toggle0.$$.fragment);
      t17 = space();
      create_component(toggle1.$$.fragment);
      t18 = space();
      create_component(toggle2.$$.fragment);
      t19 = space();
      t20 = space();
      create_component(storage0.$$.fragment);
      t21 = space();
      create_component(storage1.$$.fragment);
      t22 = space();
      create_component(storage2.$$.fragment);
      attr(a, "href", "http://101.incompass.netstar-inc.com/");
      attr(a, "target", "_blank");
      attr(span0, "class", "badge green");
      attr(span1, "class", "badge red");
      attr(span2, "class", "badge grey");
      attr(div0, "class", "action");
      attr(div1, "class", "action");
    },
    m(target, anchor) {
      insert(target, main2, anchor);
      append(main2, header);
      append(header, h10);
      append(header, t1);
      append(header, t2);
      append(main2, t3);
      append(main2, section0);
      append(section0, h11);
      append(section0, t5);
      append(section0, div0);
      if (if_block0)
        if_block0.m(div0, null);
      append(div0, t6);
      if (if_block1)
        if_block1.m(div0, null);
      append(div0, t7);
      append(div0, button);
      append(div0, t9);
      append(div0, a);
      append(div0, t11);
      append(div0, span0);
      append(div0, t12);
      append(div0, span1);
      append(div0, t13);
      append(div0, span2);
      append(main2, t14);
      append(main2, section1);
      append(section1, h12);
      append(section1, t16);
      append(section1, div1);
      mount_component(toggle0, div1, null);
      append(div1, t17);
      mount_component(toggle1, div1, null);
      append(div1, t18);
      mount_component(toggle2, div1, null);
      append(main2, t19);
      append(main2, t20);
      mount_component(storage0, main2, null);
      append(main2, t21);
      mount_component(storage1, main2, null);
      append(main2, t22);
      mount_component(storage2, main2, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_1*/
          ctx[8]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const toggle0_changes = {};
      if (dirty & /*googleSignInSuppressionOn*/
      1)
        toggle0_changes.checked = /*googleSignInSuppressionOn*/
        ctx2[0];
      if (dirty & /*$$scope*/
      65536) {
        toggle0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      toggle0.$set(toggle0_changes);
      const toggle1_changes = {};
      if (dirty & /*qsParamStrippingOn*/
      2)
        toggle1_changes.checked = /*qsParamStrippingOn*/
        ctx2[1];
      if (dirty & /*$$scope*/
      65536) {
        toggle1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      toggle1.$set(toggle1_changes);
      const toggle2_changes = {};
      if (dirty & /*trackerBlockingOn*/
      4)
        toggle2_changes.checked = /*trackerBlockingOn*/
        ctx2[2];
      if (dirty & /*$$scope*/
      65536) {
        toggle2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      toggle2.$set(toggle2_changes);
      const storage0_changes = {};
      if (dirty & /*$$scope*/
      65536) {
        storage0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      storage0.$set(storage0_changes);
      const storage1_changes = {};
      if (dirty & /*$$scope*/
      65536) {
        storage1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      storage1.$set(storage1_changes);
      const storage2_changes = {};
      if (dirty & /*$$scope*/
      65536) {
        storage2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      storage2.$set(storage2_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toggle0.$$.fragment, local);
      transition_in(toggle1.$$.fragment, local);
      transition_in(toggle2.$$.fragment, local);
      transition_in(if_block2);
      transition_in(storage0.$$.fragment, local);
      transition_in(storage1.$$.fragment, local);
      transition_in(storage2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggle0.$$.fragment, local);
      transition_out(toggle1.$$.fragment, local);
      transition_out(toggle2.$$.fragment, local);
      transition_out(if_block2);
      transition_out(storage0.$$.fragment, local);
      transition_out(storage1.$$.fragment, local);
      transition_out(storage2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main2);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      destroy_component(toggle0);
      destroy_component(toggle1);
      destroy_component(toggle2);
      destroy_component(storage0);
      destroy_component(storage1);
      destroy_component(storage2);
      mounted = false;
      dispose();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let googleSignInSuppressionOn = false;
  let qsParamStrippingOn = false;
  let trackerBlockingOn = false;
  const { sync, local, session } = chrome.storage;
  async function onboarding() {
    const tg = await getTestGroup();
    const url = new URL(ONBOARDING);
    url.searchParams.append("brw", BROWSER);
    url.searchParams.append("tg", String(tg));
    window.open(url, "_blank");
  }
  function drawBadge(risk) {
    const badge = new SafetyBadge({ categorized: true, risk }, { width: "16px", height: "16px" });
    const target = document.querySelector(`.badge.${risk}`);
    if (target) {
      badge.draw(target);
    }
  }
  onMount(() => {
    isGoogleSignInSuppressionOn().then((on) => $$invalidate(0, googleSignInSuppressionOn = on));
    isQsParamStrippingOn().then((on) => $$invalidate(1, qsParamStrippingOn = on));
    isTrackerBlockingOn().then((on) => $$invalidate(2, trackerBlockingOn = on));
    drawBadge(Risk.Green);
    drawBadge(Risk.Red);
    drawBadge(Risk.Orange);
    drawBadge(Risk.Grey);
  });
  const click_handler = () => onboarding();
  const click_handler_1 = () => showDsePrompt();
  const on_handler = () => enableGoogleSignInSuppression().then(() => $$invalidate(0, googleSignInSuppressionOn = true));
  const off_handler = () => disableGoogleSignInSuppression().then(() => $$invalidate(0, googleSignInSuppressionOn = false));
  const on_handler_1 = () => enableQsParamStripping().then(() => $$invalidate(1, qsParamStrippingOn = true));
  const off_handler_1 = () => disableQsParamStripping().then(() => $$invalidate(1, qsParamStrippingOn = false));
  const on_handler_2 = () => enableTrackerBlocking().then(() => $$invalidate(2, trackerBlockingOn = true));
  const off_handler_2 = () => disableTrackerBlocking().then(() => $$invalidate(2, trackerBlockingOn = false));
  return [
    googleSignInSuppressionOn,
    qsParamStrippingOn,
    trackerBlockingOn,
    sync,
    local,
    session,
    onboarding,
    click_handler,
    click_handler_1,
    on_handler,
    off_handler,
    on_handler_1,
    off_handler_1,
    on_handler_2,
    off_handler_2
  ];
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
