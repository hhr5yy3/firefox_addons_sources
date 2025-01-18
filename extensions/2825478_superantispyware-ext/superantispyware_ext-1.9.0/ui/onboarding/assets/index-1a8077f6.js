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
function element(name) {
  return document.createElement(name);
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
let current_component;
function set_current_component(component) {
  current_component = component;
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
function create_fragment$1(ctx) {
  let a;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[2].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[1],
    null
  );
  return {
    c() {
      a = element("a");
      if (default_slot)
        default_slot.c();
      attr(
        a,
        "href",
        /*href*/
        ctx[0]
      );
      attr(a, "target", "_blank");
      attr(a, "class", "nobr");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (default_slot) {
        default_slot.m(a, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[1],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[1]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[1],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*href*/
      1) {
        attr(
          a,
          "href",
          /*href*/
          ctx2[0]
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
        detach(a);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { href } = $$props;
  $$self.$$set = ($$props2) => {
    if ("href" in $$props2)
      $$invalidate(0, href = $$props2.href);
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [href, $$scope, slots];
}
class Doc extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { href: 0 });
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
const TEST_GROUP_STORAGE_KEY = "config:test_group";
const TRANSMIT_STATS_STORAGE_KEY = "settings:transmit-stats";
const ENABLED_STORAGE_KEY = "settings:enabled";
const INSTALL_LOG_STORAGE_KEY = "install_log";
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
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const getUrl = (p) => new URL(`${API_URL}/v1/${p}`);
async function postEnabling() {
  post(getUrl("enabling"));
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
function create_if_block_1(ctx) {
  let main2;
  let div0;
  let t0;
  let div1;
  let img;
  let img_src_value;
  let t1;
  let h1;
  let t2;
  let br0;
  let t3;
  let t4;
  let br1;
  let t5;
  let t6;
  let ol;
  let li0;
  let t9;
  let li1;
  let b1;
  let t11;
  let br3;
  let t12;
  let t13;
  let t14;
  let br4;
  let t15;
  return {
    c() {
      main2 = element("main");
      div0 = element("div");
      div0.innerHTML = `<video autoplay="" loop="" muted="" width="340"><source src="assets/en-firefox-pin-w.webm" type="video/webm"/></video>`;
      t0 = space();
      div1 = element("div");
      img = element("img");
      t1 = space();
      h1 = element("h1");
      t2 = text("For always-on privacy protection,");
      br0 = element("br");
      t3 = text("\n        make ");
      t4 = text(TITLE);
      br1 = element("br");
      t5 = text("\n        visible in Firefox.");
      t6 = space();
      ol = element("ol");
      li0 = element("li");
      li0.innerHTML = `<b>Click the ‘extensions’ icon</b><br/>
          to the right of the address bar.`;
      t9 = space();
      li1 = element("li");
      b1 = element("b");
      b1.textContent = "Click the ‘cog’ icon";
      t11 = text(" next to");
      br3 = element("br");
      t12 = space();
      t13 = text(TITLE);
      t14 = text(", to pin it");
      br4 = element("br");
      t15 = text("\n          to the toolbar.");
      attr(div0, "class", "container container--video");
      if (!src_url_equal(img.src, img_src_value = "/resources/SASExt_logo.png"))
        attr(img, "src", img_src_value);
      attr(img, "alt", TITLE);
      attr(li0, "class", "one");
      attr(li1, "class", "two");
      attr(div1, "class", "container container--text");
    },
    m(target, anchor) {
      insert(target, main2, anchor);
      append(main2, div0);
      append(main2, t0);
      append(main2, div1);
      append(div1, img);
      append(div1, t1);
      append(div1, h1);
      append(h1, t2);
      append(h1, br0);
      append(h1, t3);
      append(h1, t4);
      append(h1, br1);
      append(h1, t5);
      append(div1, t6);
      append(div1, ol);
      append(ol, li0);
      append(ol, t9);
      append(ol, li1);
      append(li1, b1);
      append(li1, t11);
      append(li1, br3);
      append(li1, t12);
      append(li1, t13);
      append(li1, t14);
      append(li1, br4);
      append(li1, t15);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(main2);
    }
  };
}
function create_if_block(ctx) {
  let main2;
  let div;
  let img;
  let img_src_value;
  let t0;
  let h1;
  let t1;
  let span0;
  let t3;
  let t4;
  let ul;
  let t10;
  let p0;
  let span1;
  let t12;
  let t13;
  let p1;
  let t14;
  let span2;
  let t16;
  let doc0;
  let t17;
  let button0;
  let t20;
  let button1;
  let t22;
  let p2;
  let t23;
  let span3;
  let t25;
  let doc1;
  let t26;
  let doc2;
  let current;
  let mounted;
  let dispose;
  doc0 = new Doc({
    props: {
      href: "/ui/legal/privacy-policy.html",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  doc1 = new Doc({
    props: {
      href: "/ui/legal/privacy-policy.html",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  doc2 = new Doc({
    props: {
      href: "/ui/legal/terms-of-use.html",
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      main2 = element("main");
      div = element("div");
      img = element("img");
      t0 = space();
      h1 = element("h1");
      t1 = text("Enable ");
      span0 = element("span");
      span0.textContent = `${TITLE}`;
      t3 = text(" for enhanced security and\n        privcy protection");
      t4 = space();
      ul = element("ul");
      ul.innerHTML = `<li class="none">Block ads and trackers</li> 
        <li class="none">Protect yourself from malware, phishing and malicious websites</li> 
        <li class="none">Block unwanted content according to you preferences</li>`;
      t10 = space();
      p0 = element("p");
      span1 = element("span");
      span1.textContent = `${TITLE}`;
      t12 = text(" respects your privacy and does not\n        transmit, collect or store any personal data, or any data that can be\n        traced back to you.");
      t13 = space();
      p1 = element("p");
      t14 = text("For further improvement of ");
      span2 = element("span");
      span2.textContent = `${TITLE}`;
      t16 = text(",\n        anonymous statistical data is collected in aggagated form, according to\n        our ");
      create_component(doc0.$$.fragment);
      t17 = space();
      button0 = element("button");
      button0.textContent = `Enable ${TITLE}`;
      t20 = space();
      button1 = element("button");
      button1.textContent = "Keep disabled";
      t22 = space();
      p2 = element("p");
      t23 = text("By enabling ");
      span3 = element("span");
      span3.textContent = `${TITLE}`;
      t25 = text(" you agree to our\n        ");
      create_component(doc1.$$.fragment);
      t26 = text(" and\n        ");
      create_component(doc2.$$.fragment);
      if (!src_url_equal(img.src, img_src_value = "../../resources/SASExt_logo.png"))
        attr(img, "src", img_src_value);
      attr(img, "alt", TITLE);
      attr(span0, "class", "nobr");
      attr(span1, "class", "nobr");
      attr(span2, "class", "nobr");
      attr(button0, "class", "enable");
      attr(button1, "class", "keep-disabled");
      attr(span3, "class", "nobr");
      attr(div, "class", "container");
    },
    m(target, anchor) {
      insert(target, main2, anchor);
      append(main2, div);
      append(div, img);
      append(div, t0);
      append(div, h1);
      append(h1, t1);
      append(h1, span0);
      append(h1, t3);
      append(div, t4);
      append(div, ul);
      append(div, t10);
      append(div, p0);
      append(p0, span1);
      append(p0, t12);
      append(div, t13);
      append(div, p1);
      append(p1, t14);
      append(p1, span2);
      append(p1, t16);
      mount_component(doc0, p1, null);
      append(div, t17);
      append(div, button0);
      append(div, t20);
      append(div, button1);
      append(div, t22);
      append(div, p2);
      append(p2, t23);
      append(p2, span3);
      append(p2, t25);
      mount_component(doc1, p2, null);
      append(p2, t26);
      mount_component(doc2, p2, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler*/
            ctx[2]
          ),
          listen(
            button1,
            "click",
            /*click_handler_1*/
            ctx[3]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const doc0_changes = {};
      if (dirty & /*$$scope*/
      16) {
        doc0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      doc0.$set(doc0_changes);
      const doc1_changes = {};
      if (dirty & /*$$scope*/
      16) {
        doc1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      doc1.$set(doc1_changes);
      const doc2_changes = {};
      if (dirty & /*$$scope*/
      16) {
        doc2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      doc2.$set(doc2_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(doc0.$$.fragment, local);
      transition_in(doc1.$$.fragment, local);
      transition_in(doc2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(doc0.$$.fragment, local);
      transition_out(doc1.$$.fragment, local);
      transition_out(doc2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main2);
      destroy_component(doc0);
      destroy_component(doc1);
      destroy_component(doc2);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_default_slot_2(ctx) {
  let t;
  return {
    c() {
      t = text("Privacy Policy");
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
      t = text("Privacy Policy");
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
      t = text("Terms of Use");
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
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_if_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*screen*/
      ctx2[0] === "screen1"
    )
      return 0;
    if (
      /*screen*/
      ctx2[0] === "screen2"
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
function instance($$self, $$props, $$invalidate) {
  let screen = "screen1";
  function next(enableIt) {
    enable(enableIt);
    $$invalidate(0, screen = "screen2");
  }
  const click_handler = () => next(true);
  const click_handler_1 = () => next(false);
  return [screen, next, click_handler, click_handler_1];
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
