var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { i as i18n, _ as __vitePreload, S as Service, T, I as ID, s as serviceProxy } from "./service.04921d45.js";
function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function is_promise(value) {
  return !!value && (typeof value === "object" || typeof value === "function") && typeof value.then === "function";
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
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
let src_url_equal_anchor;
function src_url_equal(element_src, url2) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url2;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_2) => value = _2)();
  return value;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
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
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function compute_slots(slots) {
  const result = {};
  for (const key in slots) {
    result[key] = true;
  }
  return result;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
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
function text$1(data) {
  return document.createTextNode(data);
}
function space() {
  return text$1(" ");
}
function empty() {
  return text$1("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
const always_set_through_set_attribute = ["width", "height"];
function set_attributes(node, attributes2) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes2) {
    if (attributes2[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes2[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes2[key];
    } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
      node[key] = attributes2[key];
    } else {
      attr(node, key, attributes2[key]);
    }
  }
}
function set_svg_attributes(node, attributes2) {
  for (const key in attributes2) {
    attr(node, key, attributes2[key]);
  }
}
function get_binding_group_value(group, __value, checked) {
  const value = /* @__PURE__ */ new Set();
  for (let i = 0; i < group.length; i += 1) {
    if (group[i].checked)
      value.add(group[i].__value);
  }
  if (!checked) {
    value.delete(__value);
  }
  return Array.from(value);
}
function init_binding_group(group) {
  let _inputs;
  return {
    p(...inputs) {
      _inputs = inputs;
      _inputs.forEach((input) => group.push(input));
    },
    r() {
      _inputs.forEach((input) => group.splice(group.indexOf(input), 1));
    }
  };
}
function to_number(value) {
  return value === "" ? null : +value;
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data)
    return;
  text2.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_style(node, key, value, important) {
  if (value == null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function select_option(select, value, mounting) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function select_value(select) {
  const selected_option = select.querySelector(":checked");
  return selected_option && selected_option.__value;
}
function toggle_class(element2, name, toggle) {
  element2.classList[toggle ? "add" : "remove"](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
function construct_svelte_component(component, props) {
  return new component(props);
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
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
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
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
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
function handle_promise(promise, info) {
  const token = info.token = {};
  function update2(type, index, key, value) {
    if (info.token !== token)
      return;
    info.resolved = value;
    let child_ctx = info.ctx;
    if (key !== void 0) {
      child_ctx = child_ctx.slice();
      child_ctx[key] = value;
    }
    const block = type && (info.current = type)(child_ctx);
    let needs_flush = false;
    if (info.block) {
      if (info.blocks) {
        info.blocks.forEach((block2, i) => {
          if (i !== index && block2) {
            group_outros();
            transition_out(block2, 1, 1, () => {
              if (info.blocks[i] === block2) {
                info.blocks[i] = null;
              }
            });
            check_outros();
          }
        });
      } else {
        info.block.d(1);
      }
      block.c();
      transition_in(block, 1);
      block.m(info.mount(), info.anchor);
      needs_flush = true;
    }
    info.block = block;
    if (info.blocks)
      info.blocks[index] = block;
    if (needs_flush) {
      flush();
    }
  }
  if (is_promise(promise)) {
    const current_component2 = get_current_component();
    promise.then((value) => {
      set_current_component(current_component2);
      update2(info.then, 1, info.value, value);
      set_current_component(null);
    }, (error) => {
      set_current_component(current_component2);
      update2(info.catch, 2, info.error, error);
      set_current_component(null);
      if (!info.hasCatch) {
        throw error;
      }
    });
    if (info.current !== info.pending) {
      update2(info.pending, 0);
      return true;
    }
  } else {
    if (info.current !== info.then) {
      update2(info.then, 1, info.value, promise);
      return true;
    }
    info.resolved = promise;
  }
}
function update_await_block_branch(info, ctx, dirty) {
  const child_ctx = ctx.slice();
  const { resolved } = info;
  if (info.current === info.then) {
    child_ctx[info.value] = resolved;
  }
  if (info.current === info.catch) {
    child_ctx[info.error] = resolved;
  }
  info.block.p(child_ctx, dirty);
}
function destroy_block(block, lookup) {
  block.d(1);
  lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--)
    old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  const updates = [];
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else if (dynamic) {
      updates.push(() => block.p(child_ctx, dirty));
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes)
      deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert2(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert2(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert2(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key))
      destroy(old_block, lookup);
  }
  while (n)
    insert2(new_blocks[n - 1]);
  run_all(updates);
  return new_blocks;
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
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
function init$1(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
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
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
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
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
var common = "";
var tachyons = "";
var icomoon = "";
var tailwind = "";
var app = "";
var fontAwesome = "";
const domo$3 = window.domo;
if (!domo$3) {
  throw new Error("ADD domo");
}
const $$5 = window.jQuery;
if (!$$5) {
  throw new Error("ADD jQuery");
}
const _$8 = window._;
if (!_$8) {
  throw new Error("ADD _");
}
const Backbone$7 = window.Backbone;
if (!Backbone$7) {
  throw new Error("ADD Backbone");
}
let Msg = Backbone$7.View.extend({
  events: {
    "click a": "onClick"
  },
  addActions: function($container, actions) {
    if (!_$8.isArray(actions))
      actions = [actions];
    this.actions = actions;
    _$8.each(actions, function(action, index) {
      $container.append("&nbsp;").append(domo$3.A({
        "class": "xaction",
        "data-index": index,
        "href": "#"
      }, i18n.gettext(action.name)));
    }, this);
  },
  error: function(msg, action) {
    const key = msg.msg || msg;
    this.$info.text("").hide();
    this.$error.html(i18n.gettext(key));
    this.$error.show();
    action && this.addActions(this.$error, action);
  },
  findAction: function(el) {
    const index = parseInt(el.getAttribute("data-index"));
    if (!isNaN(index)) {
      return this.actions && this.actions[index];
    }
  },
  info: function(msg, action) {
    const key = msg.msg || msg;
    this.$error.text("").hide();
    this.$info.html(i18n.gettext(key));
    this.$info.show();
    action && this.addActions(this.$info, action);
  },
  onClick: function(e) {
    const action = this.findAction(e.currentTarget);
    if (action) {
      action.callback(action);
    } else {
      DBG && console.warn("unhandled action click");
    }
  },
  bind: function(el) {
    this.el = el;
    this.$el = $$5(el);
    this.$error = this.$el.find(".xerror");
    this.$info = this.$el.find(".xmsg");
    this.reset();
  },
  reset() {
    this.$error.empty().hide();
    this.$info.empty().hide();
  },
  setMsg: function(options) {
    options || (options = {});
    if (_$8.isString(options)) {
      options = { info: options };
    }
    if (options.error) {
      this.error(options.error);
    } else if (options.info) {
      this.info(options.info);
    }
  },
  start: function(name, options) {
    this.setMsg(options);
  },
  stop: function(name, options) {
    this.$info.empty().hide();
    this.setMsg(options);
  }
});
Msg = window.Msg = new Msg();
var Msg$1 = Msg;
var MESSAGES = {
  e_brwsr_na: "Brwsr not found",
  e_brwsr_timeout: "Please try again later. No remote browser is available right now.",
  e_err: "Error",
  e_err_add: "Failed to add - ",
  e_err_unexpected: "Unexpected error",
  e_feed_in_page_na: "No feed found in the page.",
  e_load_source: "Failed to load source.",
  e_load_stripe: "Failed to load Stripe.",
  e_pwd_change: "Failed to change password.",
  e_pwd_new: "Sorry, we could not find this email.",
  e_pwd_reset: "Failed to reset password.",
  e_req: "Request to server failed.",
  e_sel_0_save: "No selections could be found to be saved.",
  e_signin_invalid: "Sign in failed, please check your username and password and try again",
  e_subscription_failed: "Failed to complete subscription.",
  e_sync_disabled: "Please sign in and then enable sync.",
  e_sync_server_na: "Please check if sync is enabled for your account.",
  e_unknown_content_type: "Unknown content type: %1$s",
  e_value_exists: "Entered value already exists.",
  e_value_incorrect_check: "Please check entered value. It is an invalid value.",
  a_action_object: "%1$s %2$s",
  a_action_reload: "Reload",
  a_add: "Add",
  a_add_action: "Add action",
  a_add_feed: "Add feed",
  a_add_file: "Add file",
  a_add_label: "Add label",
  a_add_pdf: "Add PDF",
  a_add_url: "Add url",
  a_apply: "Apply",
  a_cancel: "Cancel",
  a_change_plan: "Change Plan",
  a_check_changes: "Check for changes",
  a_check_changes_all: "Check all for changes",
  a_checks_off: "OFF",
  a_checks_on: "ON",
  a_change: "Change",
  a_clear: "Clear",
  a_close: "Close",
  a_confirm: "Confirm",
  a_confirm_plan: "Confirm Plan",
  a_del: "Delete",
  a_del_permanent: "Delete forever",
  a_discard: "Cancel",
  a_downgrade: "Downgrade",
  a_duplicate: "Duplicate",
  a_edit: "Edit",
  a_edit_options: "Edit Options",
  a_edit_rules: "Edit Conditions",
  a_expand: "Expand",
  a_get_set_go: "Got it - Get started",
  a_go_to_watchlist: "Go to Watchlist",
  a_hide_actions: "Hide actions",
  a_later: "Later",
  a_load_website_in_sieve: "Go!",
  a_mark_read: "Mark as read",
  a_monitor_feed: "Monitor feed",
  a_monitor_page: "Monitor full page",
  a_monitor_page_elements: "Monitor parts of page",
  a_move_to_trash: "Move to Trash",
  a_narrow_sel: "Narrow expanded selection",
  a_next: "Next",
  a_open_selector: "Open Selector",
  a_close_selector: "Close Selector",
  a_open_x_selector: "Open %s Selector",
  a_close_x_selector: "Close %s Selector",
  a_open_unread_in_tab: "Open unread in tab",
  a_play: "Play",
  a_register: "Create Account",
  a_rename: "Rename",
  a_resend_verification_msg: "Resend verification message",
  a_restore: "Restore",
  a_save: "Save",
  a_save_selections: "Save selections",
  a_select: "Select",
  a_select_elements: "Select elements",
  a_select_properties: "Select properties",
  a_select_device: "Select device to run checks",
  a_show_actions: "Show actions",
  a_signin: "Sign In",
  a_subscribe: "Subscribe",
  a_sieve_new: "Add Webpage",
  a_static_load: "Disable JavaScript",
  a_toggle_changes: "Show/Hide Changes",
  a_verify: "Verify",
  a_window_close: "Close Window",
  a_make_primary: "Make Primary",
  h_brwsr_closed: "Remote browser has stopped working. Please try to start new browser.",
  h_brwsr_disconnect: "Connection to remote browser has been broken. Please try to start new browser.",
  h_config_show: "Show config",
  h_css_selelctor: "CSS selector to select elements",
  h_del_action: "Delete action",
  h_desc: "Write a description that explains purpose of this entry.",
  h_email_addr: "Email address, e.g. name@example.com",
  h_js: "JavaScript to match selected elements. Return matched elements synchronously or perform an async task and use sendResponse(err, elements) callback to return matched elements after task completion.",
  h_opening_selector_in_new_tab: "Opening new tab to select content...",
  h_opened_selector_in_tab: "Opened new tab to select source content.",
  h_phone: "# international format: +19999999999",
  h_regexp_filter: "Regular expression to filter text content",
  h_schedule_interval: "Set interval at which it will be checked for changes.",
  h_selector_edit: "Select content from a webpage.",
  h_sieve_actions: "Actions are taken when source content changes. Multiple actions can be taken concurrently.",
  h_sieve_device: "Select device that this monitor runs on. Other devices will appear in the list once all devices are synced. The device name with suffix (this device) is name of the current Watchlist's device.",
  h_sieve_empty: "Empty text in selection! If it does not match text in next check consider changing selections. Check update log for checks.",
  h_sieve_name: "A short name to identify this monitor.",
  h_sieve_new: "Preview will be available soon after this task is run.",
  h_sieve_no_config: "No source has been selected. Edit options to select content from a webpage.",
  h_sieve_rules: "Conditions can be used to take actions only when it is true. When there is no condition, actions are taken on any change. All conditions except regexp are case-insensitive.",
  h_sieve_source: "Source is used to get text and data to be monitored.",
  h_tpl_desc_info: "A description of the template. Add any info that may be useful for users and show what is unique about this template.",
  h_tpl_desc_name: 'A short name that specifies what is being monitored e.g. "Price and Stock". Do not include verbs like "Monitor" or "Track changes" or website name.',
  h_tpl_desc_url: "URL of homepage of the website.",
  h_tpl_config: "Define selections to be monitored in a webpage using this template. When required, reference a parameter by its {{name}}.",
  h_tpl_params: "Parameters make it possible to use a template to create multiple monitors using multiple input values. Values can be extracted from a reference URL or provided by user.",
  h_tpl_url: "A template used to create a monitor's URL. Reference a parameter by its {{name}}. When there is only one possible URL, there is no need to use a parameter.",
  h_tpl_url_pattern: "A regular expression to test if this template can be used for a webpage. It is a good idea to capture a group that is name or id. A group can be mapped to parameters in a template. For example, amazon((\\.\\w+)+)/(.*/)*dp/(w+) can be used to match products at all Amazon websites. It captures TLD and product id. Use regex101.com for tests.",
  h_tpl_url_ref: "URL of the webpage that is used to create and test following regular expression.",
  h_try_later: "Please try again later.",
  h_xpath: "XPath expression to select elements",
  l_welcome: "Welcome",
  l_account: "Account",
  l_account_credit: "Account credit",
  l_actions: "Actions",
  l_active: "active",
  l_action_email: "Email",
  l_action_local_audio: "Audio Notification (for local monitor)",
  l_action_local_popup: "Popup Notification (for local monitor)",
  l_action_macro: "Run Macro",
  l_action_none: "Unknown action type",
  l_action_push: "Push Notification (Using Distill's iOS or Android App)",
  l_action_sms: "SMS",
  l_action_webhook: "Webhook Call",
  l_added_text: "Added text",
  l_advanced: "Advanced",
  l_all: "All",
  l_any: "Any",
  l_apps: "Apps",
  l_asian_koel: "Asian Koel",
  l_available: "Available",
  l_available_na: "Not available!",
  l_brwsr: "Brwsr",
  l_bell_strike: "Bell Strike",
  l_changed_on: "Last changed on",
  l_check_log: "Check log",
  l_conditions: "Conditions",
  l_connect: "Connect",
  l_credit: "Credit",
  l_css_selector: "CSS Selector",
  l_device: "Device",
  l_device_this: "this device",
  l_devices: "Devices",
  l_devices_all: "all devices",
  l_data: "Data",
  l_desc: "Description",
  l_developers: "Developers",
  l_device_filter: "Show devices",
  l_done: "Done",
  l_ding_dong: "Ding Dong",
  l_el_selected: "Selected",
  l_el_deselected: "Deselected",
  l_email: "Email",
  l_emails_phones: "Emails & Phones",
  l_error: "Error",
  l_explore: "Explore",
  l_feed: "Feed",
  l_field: "Field",
  l_file: "File",
  l_flags: "Flags",
  l_fullname: "Full Name",
  l_general: "General",
  l_get_access: "Get early access",
  l_get_started: "Get started",
  l_has: "has",
  l_has_not: "does not have",
  l_has_num_gt: "has number more than (>)",
  l_has_num_lt: "has number less than (<)",
  l_has_num_decr_min: "has number that decreased more than (-\u0394 >)",
  l_has_num_incr_min: "has number that increased more than (+\u0394 >)",
  l_header: "Header",
  l_headers: "Headers",
  l_help: "Help",
  l_help_support: "Help and support",
  l_js: "JavaScript",
  l_label: "Label",
  l_learn_more: "Learn More",
  l_loading: "Loading",
  l_macro: "Macro",
  l_match_regex: "matches regular expression",
  l_month: "month",
  l_name: "Name",
  l_name_or_email: "Username or Email",
  l_never: "Never",
  l_none: "None",
  l_not_is_empty: "is not empty",
  l_num: "Number",
  l_options: "Options",
  l_opt_force_bg: "Background (dynamic content won't work)",
  l_opt_bgtab: "Tab",
  l_opt_bgwindow: "Window",
  l_page_size: "Page size",
  l_password: "Password",
  l_pdf: "PDF",
  l_phone: "Phone Number",
  l_preview: "Preview",
  l_pricing: "Pricing",
  l_prompt: "Prompt",
  l_read: "Read",
  l_referral: "Referral",
  l_regexp: "Regular Expression",
  l_regexp_filter: "RegExp Filter",
  l_reset_sel: "Reset Selections",
  l_rule: "Condition",
  l_rule_group: "Compound Condition",
  l_rule_true_if_matches_x: "True if matches",
  l_saving: "Saving...",
  l_schedule: "Schedule checks",
  l_schedule_live: "Live",
  l_search_input_label: "Enter the website url here",
  l_search_label: "Tell us the website to track",
  l_selector: "Selector",
  l_select_el: "Select Elements",
  l_selection_config: "Selection Config",
  l_settings: "Settings",
  l_signed_in_as: "Signed in as %s",
  l_sieve_tpl_list: "Templates",
  l_sort_by: "Sort by",
  l_source: "Source",
  l_sources: "Sources",
  l_subscription: "Subscription",
  l_sync: "Sync",
  l_syncing: "Syncing data...",
  l_syncing_wait: "Syncing data. It may take some time to sync numerous changes!",
  l_text: "Text",
  l_text_filter: "Text filter",
  l_time_changed_on: "Time changed on",
  l_tone: "Tone",
  l_tos: "Terms of service",
  l_tpl: "Template",
  l_tpl_desc_name: "Name",
  l_tpl_desc_url: "Homepage",
  l_tpl_desc_info: "Description",
  l_tpl_config: "Selection Config",
  l_tpl_params: "Parameters",
  l_tpl_uri: "URL",
  l_trash: "Trash",
  l_unread: "Unread",
  l_unsaved: "Unsaved",
  l_untitled: "Untitled",
  l_unverified: "Unverified",
  l_url: "URL",
  l_uri_match_group_param_map: "Parameter map",
  l_uri_pattern: "Pattern to match URL",
  l_uri_ref: "Test URL",
  l_usage: "Usage",
  l_username: "Username",
  l_value: "Value",
  l_verification_code: "Verification Code",
  l_verification_req: "Verification Required",
  l_visual_selector: "Visual Selector",
  l_vs_bookmarklet: "Visual Selector Bookmarklet",
  l_waiting: "Waiting",
  l_watchlist: "Watchlist",
  l_webpage: "Webpage",
  l_x_of_following_rules: "of following conditions",
  l_xml: "XML (beta)",
  l_json: "JSON",
  l_xpath: "XPath",
  l_year: "year",
  l_sitemap: "Sitemap (alpha)",
  l_auto: "Auto",
  l_feedback_form: "Please provide your feedback",
  m_1_day: "1 day",
  m_n_day: "%d days",
  m_1_hour: "1 hour",
  m_n_hour: "%d hours",
  m_1_minute: "1 min",
  m_n_minute: "%d mins",
  m_1_second: "1 sec",
  m_n_second: "%d secs",
  m_account_credit: "%1$d USD will be credited to your account.",
  m_account_credit_minus: "%1$d USD will be deducted from your account credit.",
  m_action_can_add_only_one: "Action already added. Cannot add another.",
  m_autohide_popup: "Auto-hide notification popup after",
  m_brwsr_data_discard: "Note: Browsing data will be discarded after remote browser is closed.",
  m_check_local_only: "Please switch to web app for cloud monitors. Only local monitors can be checked for changes from this device.",
  m_coming_soon: "Coming soon",
  m_confirm_plan_change: "Please confirm that you would like to change the plan.",
  m_del_item: "Moved one item to trash.",
  m_del_items: "Moved %1$s items to trash.",
  m_deleted_action: "Deleted action",
  m_dont_show: "Don't show again",
  m_enter_valid_url: "Please enter a valid URL.",
  m_enter_feed_url: "Enter URL of a feed or a page containing the feed",
  m_enter_pdf_url: "Enter URL of a PDF file",
  m_enter_xml_url: "Enter URL of an XML file",
  m_feed_finding: "Looking for feeds in webpage...",
  m_feed_multi_selection: "Found multiple feeds in page. Pick one!",
  m_free_trial_days_left: "Multiple feeds found, pick one!",
  m_free_trial_end: "Your FREE trial is coming to an end soon.",
  m_free_trial_ending_soon: "Your free trial has ended. You should upgrade now or switch to the Free plan.",
  m_free_trial_till: "Your free trial lasts till %1$s.",
  m_firefox_only: "Only for Firefox",
  m_initial_charge_amount: "Account will be charged $%1$d. It is a prorated fee for %2$s plan till %3$s.",
  m_load_page_options: "Load pages that can't be loaded in background in",
  m_log_na: "Log is empty. Logs appear after the source is checked for updates.",
  m_login_success: "Login successful",
  m_max_workers: "Maximum number of concurrent workers",
  m_never: "Never",
  m_popup_empty: "Recent updates from your Watchlist appear here. Get started by monitoring a few webpages.",
  m_premium_only: "For paid customers",
  m_pwd_reset_req_sent: "Please check your inbox for the password reset link",
  m_referral_info: "Send your friends $10 in Distill credit. Earn $20 credit for each one that signs up and upgrades account.",
  m_referral_tweet: "Tweet to invite you friends",
  m_referral_tweet_msg: "Distill monitors web and notifies instantly. Join now and get $10 in free credit!",
  m_regex_group_na: "There is no group in url pattern.",
  m_restored_from_trash: "Restored monitors from Trash.",
  m_save_selections_none: "There is no selection to save.",
  m_saved: "Saved",
  m_saved_action: "Saved action",
  m_saved_schedule: "Saved changes to schedule",
  m_selection_discarded: "Selection canceled",
  m_selection_saved: "Selection complete",
  m_sent_verify: "Sent verification request",
  m_sieve_data_na: "No older history found",
  m_sign_in_req: "Sign in to view details.",
  m_start_end_of_total: "%1$s-%2$s of %3$s",
  m_subscription_cancelled: "Subscription cancelled.",
  m_sync_monitors: "Sync monitors across devices.",
  m_sync_to_save: "Sync to cloud to save local changes",
  m_try_later: "Please try again later.",
  m_unique_referral_link: "Your unique referral link",
  m_verification_code: "You will receive a message with a code on your %1$s. Please enter the code below to verify it.",
  m_vs_bookmarklet: "Drag me to bookmarks toolbar. Then open a webpage in your browser and click the bookmarklet to select parts from it and add to Distill.",
  m_vs_help: "Select one or more elements on the page to monitor for changes. Ignore a child element by clicking on the element within a selection. Ignored elements are shown in a red box.",
  m_vs_intro_main: "Visual Selector starts a browser in the cloud for remote interaction.",
  m_vs_intro_msg1: "Go to a webpage using the urlbar.",
  m_vs_intro_msg2: "Use selector tools to select and save content from the opened webpage.",
  m_vs_page_loading_try_later: "Uh oh! It seems that the page has not finished loading! Please try again after page has finished loading.",
  m_vs_sel_preview: "Select elements to see preview of selected text.",
  m_xframe_notice1: "When checking for updates, this page will be opened in a tab or a window in an extension.",
  m_xframe_notice2: "You can load it in background in the extension by disabling JavaScript.",
  l_add_monitor: "Add Monitor",
  t_updates: "Updates",
  a_bulk_edit: "Batch Edit",
  a_create: "Create",
  a_export: "Export",
  a_feeds: "Feeds",
  a_import: "Import",
  a_clear_error: "Clear Error Flag",
  a_send: "Send",
  h_error_notif_desc: "Error notification appears: 1. For the first time, when any monitor encounters consecutive errors and 2. In regular intervals if further errors are encountered.",
  h_schedule_constraint_1: "Minimum interval for your account is ",
  h_schedule_constraint_2: "Use local monitor for smaller interval or ",
  h_schedule_random: "Set minimum and maximum interval in seconds to schedule checks",
  l_action_local_open_tab: "Open Page In Tab (for local monitor)",
  l_action_macro_open_tab: "Run Macro (for local monitor)",
  l_action_discord: "Discord Notification",
  l_action_slack: "Slack Notification",
  l_buzzer: "Buzzer",
  l_confused: "Confused",
  l_discord: "Discord Webhook URL",
  l_dissatisfied: "Dissatisfied",
  l_feedback: "Send Feedback?",
  l_happy: "Happy",
  l_has_num_decr_pct_min: "has number that decreased more than percent (-\u0394% >)",
  l_has_num_incr_pct_min: "has number that increased more than percent (+\u0394% >)",
  l_notification_sound: "Notification Sound",
  l_opt_sticky_tabs: "Sticky Tabs",
  l_opt_sticky_window: "Sticky Window",
  l_random: "Random",
  l_sad: "Sad",
  l_schedule_live_desc: "Check webpages that auto-update content (e.g. a ticker). For local monitors only.",
  l_slack: "Slack Incoming Webhook URL",
  l_suggestion: "Suggestion",
  l_text_old: "Previous text",
  l_time_slots: "Time Slots For Checks",
  l_monday: "Monday",
  l_tuesday: "Tuesday",
  l_wednesday: "Wednesday",
  l_thursday: "Thursday",
  l_friday: "Friday",
  l_saturday: "Saturday",
  l_sunday: "Sunday",
  l_time_slots_start: "Start Time",
  l_time_slots_end: "End Time",
  l_time_slots_day: "Days",
  l_time_slots_enabled: "Enable checks by time slots",
  m_day_warning: "Warning! Slot timings were changed!",
  m_ext_signin: "Sign in to connect with cloud and sync data across connected devices.",
  m_history_empty: "History is empty. Details will appear once it is checked for updates.",
  m_send_feedback: "Send Feedback?",
  m_sticky_window_timeout: "Specify time after which sticky window will close due to inactivity (in minutes) ",
  m_sticky_window_warning: "When using sticky window, Distill will try its best to restore your tabs on startup.",
  m_sticky_tab_timeout: "Specify time after which sticky tab will close due to inactivity (in minutes) ",
  m_subscription_renewal: "Subscription is renewed on 1st of every month. To cancel this subscription, change to Free plan.",
  m_thank_you: "Thank You!",
  e_auth_400: "Please enter valid username and password!",
  e_auth_402: "Please remove other devices or upgrade account. Reached maximum number of devices!",
  e_auth_403: "Forbidden",
  e_auth_5xx: "Please try again later, unexpected error encountered.",
  m_monitor_constraint_1: "Used %1$d of %2$d available monitors. Unable to add a new monitor.",
  m_monitor_constraint_2: "Please follow one of the following options to add new monitors:",
  m_monitor_constraint_3: "Move a few monitors to trash and try again.",
  a_go_to_billing: "Go to billing",
  m_monitor_constraint_4: "Upgrade your plan to increase the limit.",
  m_monitor_limit: "Monitor Limit Exceeded",
  a_signout: "Sign Out",
  m_embedded_opt: "Show embedded icon in pages opened by Distill",
  l_left: "Left",
  l_right: "Right",
  l_top: "Top",
  l_bottom: "Bottom",
  l_dock: "Dock Position",
  a_login: "Login",
  a_forgot_pass: "Forgot password?",
  l_used: "%1$d out of %2$d used",
  l_billing: "Billing",
  l_usage_stats: "Usage Analytics",
  l_support: "Support",
  a_sign_out: "Sign Out",
  l_admin: "Admin Console",
  m_enter_doc_url: "Enter URL of a DOC or DOCX file",
  l_doc: "Word document",
  m_lose_monitors: "You will lose %1$d monitors",
  m_resend_modal: "Verification",
  a_resend: "Resend",
  m_resend: "Do you want to resend verification message?",
  l_snapshot: "Snapshot",
  l_proxy_server: "Proxy Servers",
  h_proxy_server: "Select Proxies, add to monitor.",
  m_checks_paused: "Checks are paused; Click Distill icon in the browser toolbar and click ON button to start checks.",
  m_enterprise_only_feature: "This feature is only available for the enterprise users right now.",
  m_started_check_for_changes: "Started the checks for changes",
  m_check_for_changes_failed: "Could not check for changes",
  rule_comma_dot: "A: 1,000,000.00",
  rule_dot_comma: "B: 1.000.000,00",
  rule_space_comma: "C: 1 000 000,00",
  l_num_format: "Number Format",
  title_num_format: "Number format used for parsing the numbers from the text.",
  title_format_option_comma_dot: ", as Thousands separator and . as Decimal Separator",
  title_format_option_dot_comma: ". as Thousands separator and , as Decimal Separator",
  title_format_option_space_comma: "' ' as Thousands separator and , as Decimal Separator",
  m_upgrade_account: "Upgrade Account",
  err_select_datasource: "Please select a datasource.",
  err_invalid_datasource_selected: "The selected datasource is not available anymore, please select one from the available datasources.",
  m_no_datasource_available: "No datasources are available for this website.",
  m_err_datasource: "Error while executing the datasource.",
  m_datasources_info_title: "All about Datasources",
  m_datasources_info_1: "Offers a data-driven view instead of the web page view that will eliminate false notifications.",
  m_datasources_info_2: "Unlike visual selectors, they are managed by Distill.io, so that we can make sure that data is monitored accurately.",
  m_datasources_info_3: "And, you don't have to worry about the configurations of selectors, delay or authentication.",
  a_show_more_info: "Show more info",
  m_datasource_request: "Let us know if we should create a datasource for the provided URL too",
  m_datasource_request_description: "More info, like fields to be included",
  m_datasource_request_success: "Datasource request submitted successfully",
  err_datasource_request_submit: "Error while submitting datasource request",
  a_submit: "Submit",
  l_monitor: "Monitor",
  l_uptime: "Uptime",
  l_datasource: "Datasource",
  a_inline_diff: "Inline Diff",
  a_side_by_side_diff: "Side-by-Side Diff",
  a_styled_page: "Styled Page",
  a_unstyled_page: "Unstyled Page",
  l_sieve_to_compare: "Sieve to compare",
  l_sieve_to_compare_with: "Sieve to compare with",
  l_diff_stats: "Diff Stats",
  l_tree: "Tree",
  l_raw: "Raw",
  l_continue_only: "Only continue if",
  l_continue_or: "Or continue if",
  l_and: "And",
  l_or: "Or",
  l_contains: "contains",
  l_not_contains: "does not contain",
  l_starts_with: "starts with",
  l_not_starts_with: "doesn't start with",
  l_ends_with: "ends with",
  l_not_ends_with: "doesn't end with",
  l_greater_than: "is greater than",
  l_less_than: "is less than",
  l_equal_to: "is equal to",
  l_not_equal_to: "is not equal to",
  l_is_empty: "is empty",
  l_not_match_regex: "doesn't match regular expression",
  l_length_lt: "length is less than",
  l_length_gt: "length is greater than",
  l_text_del: "Deleted text",
  e_app_not_installed: "App not installed. Install one to get push notifications.",
  l_duration: "Duration",
  l_no_snapshot_found: "No snapshot found for this check",
  m_sieve_count_per_plan: "The number of past changes per monitor kept in history is based on the plan.",
  l_visual: "Visual",
  m_invalid_sieve_data_id_explore_diff: "Cannot find this change data from this monitor's change history",
  l_explore_diff_in_a_new_page: "Explore diff in a new page"
};
var lang = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": MESSAGES
}, Symbol.toStringTag, { value: "Module" }));
window.LANG = MESSAGES;
async function loadLang(locale) {
  let mod = await loadModule(locale);
  if (mod) {
    window.LANG = mod.default;
  }
  i18n.init(window.LANG);
}
async function loadModule(locale) {
  switch (locale) {
    case "de":
      return await __vitePreload(() => import("./lang.1554615b.js"), true ? ["assets/lang.1554615b.js","assets/service.04921d45.js"] : void 0);
    case "en-US":
      return await __vitePreload(() => Promise.resolve().then(function() {
        return lang;
      }), true ? void 0 : void 0);
    case "es":
      return await __vitePreload(() => import("./lang.efdb1f41.js"), true ? ["assets/lang.efdb1f41.js","assets/service.04921d45.js"] : void 0);
    case "fr":
      return await __vitePreload(() => import("./lang.1d956266.js"), true ? ["assets/lang.1d956266.js","assets/service.04921d45.js"] : void 0);
    case "it":
      return await __vitePreload(() => import("./lang.6dff69d4.js"), true ? ["assets/lang.6dff69d4.js","assets/service.04921d45.js"] : void 0);
    case "ja":
      return await __vitePreload(() => import("./lang.43f63440.js"), true ? ["assets/lang.43f63440.js","assets/service.04921d45.js"] : void 0);
    case "pl":
      return await __vitePreload(() => import("./lang.e1ed24f9.js"), true ? ["assets/lang.e1ed24f9.js","assets/service.04921d45.js"] : void 0);
    case "pt":
      return await __vitePreload(() => import("./lang.5afb474a.js"), true ? ["assets/lang.5afb474a.js","assets/service.04921d45.js"] : void 0);
    case "ru":
      return await __vitePreload(() => import("./lang.ae9bf6c1.js"), true ? ["assets/lang.ae9bf6c1.js","assets/service.04921d45.js"] : void 0);
    case "sr":
      return await __vitePreload(() => import("./lang.5c8a058c.js"), true ? ["assets/lang.5c8a058c.js","assets/service.04921d45.js"] : void 0);
    case "zh":
      return await __vitePreload(() => import("./lang.26389ab7.js"), true ? ["assets/lang.26389ab7.js","assets/service.04921d45.js"] : void 0);
    default:
      throw new Error("unhandled language:" + locale);
  }
}
const subscriber_queue = [];
function readable(value, start2) {
  return {
    subscribe: writable(value, start2).subscribe
  };
}
function writable(value, start2 = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start2(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync2 = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (started) {
        sync2();
      }
    }, () => {
      pending |= 1 << i;
    }));
    started = true;
    sync2();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function parse(str, loose) {
  if (str instanceof RegExp)
    return { keys: false, pattern: str };
  var c, o, tmp, ext, keys = [], pattern = "", arr = str.split("/");
  arr[0] || arr.shift();
  while (tmp = arr.shift()) {
    c = tmp[0];
    if (c === "*") {
      keys.push("wild");
      pattern += "/(.*)";
    } else if (c === ":") {
      o = tmp.indexOf("?", 1);
      ext = tmp.indexOf(".", 1);
      keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
      pattern += !!~o && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
      if (!!~ext)
        pattern += (!!~o ? "?" : "") + "\\" + tmp.substring(ext);
    } else {
      pattern += "/" + tmp;
    }
  }
  return {
    keys,
    pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
  };
}
function create_else_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[2]];
  var switch_value = ctx[0];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
    switch_instance.$on("routeEvent", ctx[7]);
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[2])]) : {};
      if (dirty & 1 && switch_value !== (switch_value = ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props());
          switch_instance.$on("routeEvent", ctx2[7]);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [{ params: ctx[1] }, ctx[2]];
  var switch_value = ctx[0];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props());
    switch_instance.$on("routeEvent", ctx[6]);
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 6 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 2 && { params: ctx2[1] },
        dirty & 4 && get_spread_object(ctx2[2])
      ]) : {};
      if (dirty & 1 && switch_value !== (switch_value = ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props());
          switch_instance.$on("routeEvent", ctx2[6]);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[1])
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
function getLocation() {
  const hashPosition = window.location.href.indexOf("#/");
  let location2 = hashPosition > -1 ? window.location.href.substr(hashPosition + 1) : "/";
  const qsPosition = location2.indexOf("?");
  let querystring2 = "";
  if (qsPosition > -1) {
    querystring2 = location2.substr(qsPosition + 1);
    location2 = location2.substr(0, qsPosition);
  }
  return { location: location2, querystring: querystring2 };
}
const loc = readable(
  null,
  function start(set) {
    set(getLocation());
    const update2 = () => {
      set(getLocation());
    };
    window.addEventListener("hashchange", update2, false);
    return function stop() {
      window.removeEventListener("hashchange", update2, false);
    };
  }
);
const location = derived(loc, ($loc) => $loc.location);
const querystring = derived(loc, ($loc) => $loc.querystring);
const params = writable(void 0);
async function push(location2) {
  if (!location2 || location2.length < 1 || location2.charAt(0) != "/" && location2.indexOf("#/") !== 0) {
    throw Error("Invalid parameter location");
  }
  await tick();
  history.replaceState(
    {
      ...history.state,
      __svelte_spa_router_scrollX: window.scrollX,
      __svelte_spa_router_scrollY: window.scrollY
    },
    void 0
  );
  window.location.hash = (location2.charAt(0) == "#" ? "" : "#") + location2;
}
async function replace(location2) {
  if (!location2 || location2.length < 1 || location2.charAt(0) != "/" && location2.indexOf("#/") !== 0) {
    throw Error("Invalid parameter location");
  }
  await tick();
  const dest = (location2.charAt(0) == "#" ? "" : "#") + location2;
  try {
    const newState = { ...history.state };
    delete newState["__svelte_spa_router_scrollX"];
    delete newState["__svelte_spa_router_scrollY"];
    window.history.replaceState(newState, void 0, dest);
  } catch (e) {
    console.warn("Caught exception while replacing the current page. If you're running this in the Svelte REPL, please note that the `replace` method might not work in this environment.");
  }
  window.dispatchEvent(new Event("hashchange"));
}
function restoreScroll(state) {
  if (state) {
    window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
  } else {
    window.scrollTo(0, 0);
  }
}
function instance($$self, $$props, $$invalidate) {
  let { routes = {} } = $$props;
  let { prefix = "" } = $$props;
  let { restoreScrollState = false } = $$props;
  class RouteItem {
    constructor(path, component2) {
      if (!component2 || typeof component2 != "function" && (typeof component2 != "object" || component2._sveltesparouter !== true)) {
        throw Error("Invalid component object");
      }
      if (!path || typeof path == "string" && (path.length < 1 || path.charAt(0) != "/" && path.charAt(0) != "*") || typeof path == "object" && !(path instanceof RegExp)) {
        throw Error('Invalid value for "path" argument - strings must start with / or *');
      }
      const { pattern, keys } = parse(path);
      this.path = path;
      if (typeof component2 == "object" && component2._sveltesparouter === true) {
        this.component = component2.component;
        this.conditions = component2.conditions || [];
        this.userData = component2.userData;
        this.props = component2.props || {};
      } else {
        this.component = () => Promise.resolve(component2);
        this.conditions = [];
        this.props = {};
      }
      this._pattern = pattern;
      this._keys = keys;
    }
    match(path) {
      if (prefix) {
        if (typeof prefix == "string") {
          if (path.startsWith(prefix)) {
            path = path.substr(prefix.length) || "/";
          } else {
            return null;
          }
        } else if (prefix instanceof RegExp) {
          const match = path.match(prefix);
          if (match && match[0]) {
            path = path.substr(match[0].length) || "/";
          } else {
            return null;
          }
        }
      }
      const matches = this._pattern.exec(path);
      if (matches === null) {
        return null;
      }
      if (this._keys === false) {
        return matches;
      }
      const out = {};
      let i = 0;
      while (i < this._keys.length) {
        try {
          out[this._keys[i]] = decodeURIComponent(matches[i + 1] || "") || null;
        } catch (e) {
          out[this._keys[i]] = null;
        }
        i++;
      }
      return out;
    }
    async checkConditions(detail) {
      for (let i = 0; i < this.conditions.length; i++) {
        if (!await this.conditions[i](detail)) {
          return false;
        }
      }
      return true;
    }
  }
  const routesList = [];
  if (routes instanceof Map) {
    routes.forEach((route, path) => {
      routesList.push(new RouteItem(path, route));
    });
  } else {
    Object.keys(routes).forEach((path) => {
      routesList.push(new RouteItem(path, routes[path]));
    });
  }
  let component = null;
  let componentParams = null;
  let props = {};
  const dispatch = createEventDispatcher();
  async function dispatchNextTick(name, detail) {
    await tick();
    dispatch(name, detail);
  }
  let previousScrollState = null;
  let popStateChanged = null;
  if (restoreScrollState) {
    popStateChanged = (event) => {
      if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
        previousScrollState = event.state;
      } else {
        previousScrollState = null;
      }
    };
    window.addEventListener("popstate", popStateChanged);
    afterUpdate(() => {
      restoreScroll(previousScrollState);
    });
  }
  let lastLoc = null;
  let componentObj = null;
  const unsubscribeLoc = loc.subscribe(async (newLoc) => {
    lastLoc = newLoc;
    let i = 0;
    while (i < routesList.length) {
      const match = routesList[i].match(newLoc.location);
      if (!match) {
        i++;
        continue;
      }
      const detail = {
        route: routesList[i].path,
        location: newLoc.location,
        querystring: newLoc.querystring,
        userData: routesList[i].userData,
        params: match && typeof match == "object" && Object.keys(match).length ? match : null
      };
      if (!await routesList[i].checkConditions(detail)) {
        $$invalidate(0, component = null);
        componentObj = null;
        dispatchNextTick("conditionsFailed", detail);
        return;
      }
      dispatchNextTick("routeLoading", Object.assign({}, detail));
      const obj = routesList[i].component;
      if (componentObj != obj) {
        if (obj.loading) {
          $$invalidate(0, component = obj.loading);
          componentObj = obj;
          $$invalidate(1, componentParams = obj.loadingParams);
          $$invalidate(2, props = {});
          dispatchNextTick("routeLoaded", Object.assign({}, detail, {
            component,
            name: component.name,
            params: componentParams
          }));
        } else {
          $$invalidate(0, component = null);
          componentObj = null;
        }
        const loaded = await obj();
        if (newLoc != lastLoc) {
          return;
        }
        $$invalidate(0, component = loaded && loaded.default || loaded);
        componentObj = obj;
      }
      if (match && typeof match == "object" && Object.keys(match).length) {
        $$invalidate(1, componentParams = match);
      } else {
        $$invalidate(1, componentParams = null);
      }
      $$invalidate(2, props = routesList[i].props);
      dispatchNextTick("routeLoaded", Object.assign({}, detail, {
        component,
        name: component.name,
        params: componentParams
      })).then(() => {
        params.set(componentParams);
      });
      return;
    }
    $$invalidate(0, component = null);
    componentObj = null;
    params.set(void 0);
  });
  onDestroy(() => {
    unsubscribeLoc();
    popStateChanged && window.removeEventListener("popstate", popStateChanged);
  });
  function routeEvent_handler(event) {
    bubble.call(this, $$self, event);
  }
  function routeEvent_handler_1(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("routes" in $$props2)
      $$invalidate(3, routes = $$props2.routes);
    if ("prefix" in $$props2)
      $$invalidate(4, prefix = $$props2.prefix);
    if ("restoreScrollState" in $$props2)
      $$invalidate(5, restoreScrollState = $$props2.restoreScrollState);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 32) {
      history.scrollRestoration = restoreScrollState ? "manual" : "auto";
    }
  };
  return [
    component,
    componentParams,
    props,
    routes,
    prefix,
    restoreScrollState,
    routeEvent_handler,
    routeEvent_handler_1
  ];
}
class Router$1 extends SvelteComponent {
  constructor(options) {
    super();
    init$1(this, options, instance, create_fragment, safe_not_equal, {
      routes: 3,
      prefix: 4,
      restoreScrollState: 5
    });
  }
}
const _$7 = window._;
if (!_$7) {
  throw new Error("ADD _");
}
function Route(options) {
  _$7.extend(this, options, this.parse(options.path));
}
_$7.extend(Route.prototype, {
  match: function(path) {
    const keys = this.keys;
    const params2 = this.params = {};
    const m = this.regexp.exec(path);
    if (!m)
      return false;
    for (let i = 1, len = m.length; i < len; ++i) {
      const key = keys[i - 1];
      const val = "string" == typeof m[i] ? decode(m[i]) : m[i];
      if (key) {
        params2[key.name] = val;
      } else {
        throw new Error("Nameless param not supported, path:" + path);
      }
    }
    return true;
  },
  parse: function(path) {
    const keys = [];
    path = path.concat("").replace(/\/\(/g, "(?:/").replace(
      /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,
      function(_2, slash, format, key, capture, optional, star) {
        keys.push({ name: key, optional: !!optional });
        slash = slash || "";
        return "" + (optional ? "" : slash) + "(?:" + (optional ? slash : "") + (format || "") + (capture || (format && "([^/.]+?)" || "([^/]+?)")) + ")" + (optional || "") + (star ? "(/*)?" : "");
      }
    ).replace(/([\/.])/g, "\\$1").replace(/\*/g, "(.*)");
    return {
      keys,
      regexp: new RegExp("^" + path + "$", "i")
    };
  }
});
function Router(options) {
  this.routes = _$7.map(options.routes, function(routeOptions) {
    return new Route(routeOptions);
  }, this);
}
_$7.extend(Router.prototype, {
  find: function(path) {
    const route = _$7.find(this.routes, function(route2) {
      return route2.match(path);
    });
    return route;
  }
});
function decode(str) {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}
var C$1 = {
  TYPE_ERR: 0,
  TYPE_TEXT: 1,
  TYPE_HTML: 2,
  TYPE_XML: 4,
  TYPE_FEED: 5,
  TYPE_FORM: 6,
  TYPE_PDF_HTML: 7,
  TYPE_DOC: 8,
  TYPE_JSON: 9,
  TYPE_SITEMAP: 10,
  TYPE_RULE: 1,
  TYPE_RULE_GROUP: 2,
  OP_AND: 1,
  OP_OR: 2,
  CONTENT_TYPE_TEXT: 1,
  CONTENT_TYPE_CHANGED_TEXT: 2,
  CONTENT_TYPE_OLD_TEXT: 3,
  RULE_NOT_EMPTY: 1,
  RULE_HAS_TEXT: 2,
  RULE_HAS_TEXT_NOT: 3,
  RULE_HAS_NUMBER_LT: 4,
  RULE_HAS_NUMBER_GT: 5,
  RULE_HAS_NUMBER_DECR_MIN: 6,
  RULE_HAS_NUMBER_INCR_MIN: 7,
  RULE_MATCH_REGEX: 8,
  RULE_HAS_NUMBER_DECR_PERCENT_MIN: 9,
  RULE_HAS_NUMBER_INCR_PERCENT_MIN: 10,
  STATE_DEFAULT: 0,
  STATE_NEW: 10,
  STATE_INIT: 20,
  STATE_UNAUTHORIZED: 30,
  STATE_AUTHORIZED: 35,
  STATE_READY: 40,
  STATE_PAUSED: 45,
  STATE_RESTRICTED: 50,
  STATE_DISCARD: 90,
  STATE_DEL: 100,
  STATE_DONE: 100,
  STATE_PLAN_PUBLIC: 0,
  STATE_PLAN_PRIVATE: 70,
  STATE_ARCHIVED: 110,
  STATE_ERROR: 120,
  STATE_TERMINATING: 130,
  STATE_TERMINATED: 135,
  STATE_RETRYING: 140,
  STATE_ATTR_DEFAULT: 0,
  STATE_ATTR_VERIFY: 10,
  STATE_ATTR_VERIFY_INIT: 20,
  STATE_ATTR_VERIFY_WAIT: 30,
  STATE_ATTR_VERIFY_DONE: 40,
  ACTION_NONE: 0,
  ACTION_EMAIL: 1,
  ACTION_SMS: 2,
  ACTION_PUSH: 3,
  ACTION_MACRO: 4,
  ACTION_WEBHOOK: 5,
  ACTION_SLACK: 6,
  ACTION_DISCORD: 7,
  ACTION_LOCAL_AUDIO: 101,
  ACTION_LOCAL_POPUP: 102,
  ACTION_LOCAL_OPEN_TAB: 103,
  RUN_STATE_INIT: 1,
  RUN_STATE_WAIT: 2,
  RUN_STATE_WIP: 3,
  LOCAL_STATE_SYNCED: 0,
  LOCAL_STATE_POST: 1,
  LOCAL_STATE_PUT: 2,
  LOCAL_STATE_DEL: 3,
  LOCAL_STATE_POST_ERR: 10,
  LOCAL_STATE_PUT_ERR: 20,
  LOCAL_STATE_DEL_ERR: 30,
  CLIENT_WEB: 1,
  CLIENT_ANY: 2,
  CLIENT_FF: 10,
  CLIENT_CR: 11,
  CLIENT_OP: 12,
  CLIENT_FFWX: 13,
  CLIENT_MSE: 14,
  CLIENT_ELECTRON: 15,
  CLIENT_SF: 16,
  CLIENT_MAC: 20,
  CLIENT_IOS: 21,
  CLIENT_ANDROID: 22,
  CLIENT_WEBFF: 50,
  CLIENT_DEDI: 51,
  CLIENT_ID_ANY: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
  CLIENT_ID_WEB: "ffffffff-ffff-ffff-ffff-ffffffffffff",
  CLIENT_ACTIVE: 15,
  CLIENT_INACTIVE: 25,
  CLIENT_DISCONN: 45,
  CLIENT_INVALID: 55,
  SOURCE_SITEMAP: 1,
  DEFAULT_GROUPID: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
  TIME_INFINITE: 2592e3,
  NUM_FORMAT_COMMA_DOT: "1,.",
  NUM_FORMAT_DOT_COMMA: "2.,",
  NUM_FORMAT_SPACE_COMMA: "3 ,",
  DS_TYPE_JSON: "json",
  DS_TYPE_SCRAPEX_SCRAPER: "scrapex_scraper",
  DS_TYPE_SCRAPEX_SCRIPT: "scrapex_script",
  DS_TYPE_UPTIME: "uptime",
  DS_ID_JSON: "00000000-0000-0000-0000-000000000001",
  DS_ID_UPTIME: "00000000-0000-0000-0000-000000000002",
  DS_ID_TEXT: "00000000-0000-0000-0000-000000000003",
  PRODUCT_ID_DISTILL: 1,
  PRODUCT_ID_SCRAPEX: 2,
  PRODUCT_DISTILL: "Distill Web Monitor",
  PRODUCT_SCRAPEX: "Scrapex.ai",
  DIFF_MODE_VISUAL: 1,
  DIFF_MODE_TEXT: 2,
  DIFF_MODE_SOURCE: 3,
  FORM_DOWNGRADE: "downgrade",
  FORM_CANCEL: "cancel",
  FORM_ACCOUNT_CLOSE: "account-close",
  FORM_EMAIL_ALERT: "email-alert",
  FORM_APP_FEEDBACK: "app",
  FORM_CHANGELOG: "changelog",
  FORM_DOCS: "docs",
  FORM_CHANGE_SUMMARY: "change-summary-feedback"
};
var _const = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": C$1
}, Symbol.toStringTag, { value: "Module" }));
const qs = window.qs;
if (!qs) {
  throw new Error("ADD qs");
}
const $$4 = window.jQuery;
if (!$$4) {
  throw new Error("ADD jQuery");
}
const _$6 = window._;
if (!_$6) {
  throw new Error("ADD _");
}
const async$1 = window.async;
if (!async$1) {
  throw new Error("ADD async");
}
const Backbone$6 = window.Backbone;
if (!Backbone$6) {
  throw new Error("ADD Backbone");
}
const methodMap = {
  "create": "POST",
  "update": "PUT",
  "patch": "PATCH",
  "delete": "DELETE",
  "read": "GET"
};
let IID_USER = null;
let iid = IID_USER;
const Api = _$6.extend({
  api: promisifyOrCallback(api),
  utils: Service.utilApi,
  batch: promisifyOrCallback(batch),
  init,
  setIdentityId
}, Backbone$6.Events);
const router = new Router({
  routes: [{
    list: true,
    path: "/clients",
    store: Service.store.ClientStore
  }, {
    path: "/clients/:id",
    store: Service.store.ClientStore
  }, {
    list: true,
    path: "/sieves",
    store: Service.store.SieveStore
  }, {
    path: "/sieves/:id",
    store: Service.store.SieveStore
  }, {
    list: true,
    path: "/sieves/:sieve_id/actions",
    store: Service.store.ActionStore
  }, {
    path: "/sieves/:sieve_id/actions/:id",
    store: Service.store.ActionStore
  }, {
    list: true,
    path: "/sieves/:sieve_id/data",
    store: Service.store.SieveDataProxy
  }, {
    path: "/sieves/:sieve_id/data/:id",
    store: Service.store.SieveDataStore
  }, {
    list: true,
    path: "/sieves/:key/works/local",
    store: Service.store.WorkStore
  }, {
    path: "/sieves/:sieve_id/snapshots/:id/local",
    store: Service.store.SieveSnapshotStore
  }, {
    list: true,
    path: "/rules",
    store: Service.store.RuleStore
  }, {
    path: "/rules/:id",
    store: Service.store.RuleStore
  }, {
    list: true,
    path: "/tags",
    store: Service.store.TagStore
  }, {
    list: true,
    path: "/tags/:id",
    store: Service.store.TagStore
  }, {
    list: true,
    path: "/users/attrs",
    store: Service.store.AttrStore
  }, {
    path: "/users/attrs/:id",
    store: Service.store.AttrStore
  }]
});
function api(url2, method, json2, callback) {
  if (url2 && typeof url2 === "object") {
    const requestOptions = url2;
    callback = method;
    url2 = requestOptions["url"];
    method = requestOptions["method"] || "GET";
    json2 = requestOptions["json"];
    requestOptions["headers"];
  } else if (typeof method == "function") {
    callback = method;
    json2 = null;
    method = "GET";
  } else if (typeof json2 == "function") {
    callback = json2;
    if (_$6.isObject(method)) {
      json2 = method;
      method = "GET";
    } else {
      json2 = null;
    }
  }
  json2 = json2 || {};
  method = methodMap[method] || method || "GET";
  delete json2._state;
  if (iid !== IID_USER) {
    return Service.api({
      url: url2,
      method,
      json: json2,
      headers: { "x-identity": iid }
    }, callback);
  }
  const route = router.find(url2);
  if (route) {
    return handleStoreQuery(route, method, json2, callback);
  } else {
    return Service.api(url2, method, json2, callback);
  }
}
function promisifyOrCallback(fn) {
  return function(...args) {
    if (typeof args[args.length - 1] != "function") {
      return new Promise((resolve, reject) => {
        fn(...args, function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    } else {
      fn(...args);
    }
  };
}
function batch(requests, callback) {
  async$1.mapSeries(requests, function(request, callback2) {
    api(request.url, request.method, request.body, function(err, res) {
      if (err)
        console.error("Error handling request:", request);
      callback2(err, res);
    });
  }, callback);
}
function handleStoreQuery(route, method, json2, _callback) {
  const path = route.path;
  const store = route.store;
  const hasUserId = store.hasField("user_id");
  const user_id = window.USER ? USER.id : Service.auth.getId();
  const callback = function(err, result) {
    if (err) {
      console.error("API:err", path, method, err);
    } else {
      if (method != "GET") {
        Service.service.syncStore(store);
      }
    }
    result && (result = JSON.parse(JSON.stringify(result)));
    _callback(err, result);
  };
  switch (method) {
    case "DELETE":
      store.update(route.params, {
        state: C$1.STATE_DEL,
        _state: C$1.LOCAL_STATE_DEL
      }, callback);
      break;
    case "GET":
      var query = route.params;
      if (hasUserId) {
        query.$and = {
          $or: [
            ["user_id", user_id],
            ["user_id", null]
          ]
        };
      }
      if (route.list) {
        const opts = json2._opt;
        query = _$6.extend(_$6.omit(json2, "_opt"), query);
        store.find(query, opts, callback);
      } else {
        store.findOne(query, callback);
      }
      break;
    case "PATCH":
    case "PUT":
      var query = route.params;
      var doc = json2;
      store.update(query, doc, callback);
      break;
    case "POST":
      var doc = _$6.extend(json2, route.params);
      store.create(doc, callback);
      break;
    default:
      callback({
        msg: "API: Unknown method:" + method
      });
  }
}
function init() {
}
function setIdentityId(_iid) {
  iid = _iid || IID_USER;
}
var Supports = {
  user: 1,
  email: 1,
  phone: 0,
  agents: {
    local: 1,
    type: async () => {
      if (Service.proxy)
        return await Service.proxy.CFG.CLIENT.TYPE;
      else
        return Service.CFG.CLIENT.TYPE;
    },
    version: async () => {
      if (Service.proxy)
        return await Service.proxy.CFG.VERSION;
      else
        return Service.CFG.VERSION;
    }
  },
  actions: {
    popup: true
  },
  tabForDynamic: Service.Supports.tabForDynamic,
  tabForXFrame: Service.Supports.tabForXFrame
};
function prepareURLs({
  APP: APP2,
  AUTH: AUTH2
}) {
  return {
    admin: `${APP2}#/admin/users/`,
    availability: `${APP2}/#/usage/availability/`,
    billing: `${AUTH2}/billing`,
    diffPage(sieveId, dataId1 = "", dataId2 = "") {
      return `#/u/${Api.identityId || 0}/sieve/${sieveId}/data/${dataId1}/diff?d2=${dataId2}`;
    },
    forums: `https://forums.distill.io`,
    groups: `${APP2}#/teams/`,
    logout: `${AUTH2}/logout`,
    sievePage(sieveId) {
      return `#/w/${Api.identityId || 0}/list/all/${sieveId}.id`;
    },
    usageAvailabilityForTeam: (teamId = ((_b) => (_b = ((_a) => (_a = get_store_value(params)) == null ? void 0 : _a.team)()) != null ? _b : 0)()) => {
      return `${APP2}/#/u/${teamId}/usage/availability/`;
    },
    usageDailyForTeam: (teamId) => {
      return `${APP2}/#/u/${teamId}/usage/daily/`;
    },
    usageMonthlyForTeam: (teamId) => {
      return `${APP2}/#/u/${teamId}/usage/monthly/`;
    },
    usageJobsForTeam: (teamId) => {
      return `${APP2}/#/u/${teamId}/usage/jobs/`;
    },
    crawlerDetail: (teamId, crawlerId) => {
      return `${APP2}/#/u/${teamId}/crawlers/${crawlerId}`;
    },
    serviceLogin: (params2) => {
      return `${AUTH2}/service-login?redirect=` + encodeURIComponent(params2.href);
    },
    updateTeam: (oldTeamId, newTeamId) => {
      return get_store_value(location).replace(`/${oldTeamId != null ? oldTeamId : 0}/`, `/${newTeamId}/`);
    }
  };
}
const { AUTH, API, APP } = Service.CFG.URL;
const INBOX = "/ui/inbox.html";
var urlCfg = {
  ...prepareURLs({
    APP,
    AUTH
  }),
  api: API,
  app: APP,
  login: `${AUTH}/service-login?redirect=app://ui/inbox.html#`,
  settings: `${INBOX}#/settings/general`,
  website: `https://distill.io`,
  watchlist: `${INBOX}#/w/0/list/all/`
};
const Backbone$5 = window.Backbone;
if (!Backbone$5) {
  throw new Error("ADD Backbone");
}
var Base$4 = Backbone$5.View.extend({
  name: "Base",
  domo,
  bubbleEvent: function(name) {
    this.parent && this.parent.trigger(name);
  },
  bubbleAddEvent: function() {
    this.bubbleEvent("child:add");
  },
  bubbleRemoveEvent: function() {
    this.bubbleEvent("child:remove");
  },
  getRoot: function() {
    if (this.parent) {
      return this.parent.getRoot();
    }
    return this;
  },
  focus: _.debounce(function() {
    this.$el.find('[value=""],input:not([value]),textarea').first().focus();
  }, 100),
  initialize: function(options) {
    options || (options = {});
    this.options = options;
    _.bindAll(...[this].concat(_.functions(this)));
    this.children = [];
    this.name = options.name || this.name;
    options.parent && this.setParent(options.parent);
    this.listenTo(this, "child:add", this.bubbleAddEvent);
    this.listenTo(this, "child:remove", this.bubbleRemoveEvent);
    this.model && this.$el.attr("data-id", this.model.id);
    this.$el.attr("viewclass", this.name);
    this.postInit(options);
  },
  postInit: function(options) {
  },
  remove: function() {
    if (this.el.parentNode) {
      Base$4.__super__.remove.call(this);
      this.setParent(null);
      this.removeChildren();
      this.trigger("remove", this);
    }
  },
  removeChildren: function() {
    _.each(this.children.slice(0), function(child) {
      child.remove();
      this.trigger("child:remove");
    }, this);
  },
  setParent: function(parent) {
    if (this.parent) {
      this.parent.children = _.without(this.parent.children, this);
      this.parent.trigger("child:remove", this);
    }
    this.parent = parent;
    if (this.parent) {
      this.parent.children.push(this);
      this.parent.trigger("child:add", this);
    }
  }
});
var View$1 = { Base: Base$4 };
const _$5 = window._;
if (!_$5) {
  throw new Error("ADD _");
}
const types = {};
function Def(name, __super__, members) {
  if (typeof __super__ == "object") {
    members = __super__;
    __super__ = void 0;
  }
  types[this.name = name] = this;
  this.__super__ = __super__;
  _$5.extend(this, members);
}
_$5.extend(Def.prototype, {
  is: function(name) {
    return this.name == name || this.__super__ && this.__super__.isType(name);
  },
  isValid: function(value, desc) {
    return true;
  },
  format: identity$1,
  parse: identity$1
});
new Def("text"), new Def("integer", {
  isValid: function(value, desc) {
    return !isNaN(this.parse(value));
  },
  parse: function(value) {
    return parseInt(value);
  }
}), new Def("number", {
  isValid: function(value, desc) {
    return !isNaN(this.parse(value));
  },
  parse: function(value) {
    return parseFloat(value);
  }
}), new Def("email", "text", {
  isValid: function(value, desc) {
    return /^[a-z0-9_.+-]+@[a-z0-9_.-]+\.[a-z0-9_.-]+$/i.test(value);
  }
}), new Def("phone", "text", {
  isValid: function(value, desc) {
    return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value);
  }
}), new Def("tpl:text", "text", {
  params: [],
  isValid: function(value, desc) {
    return true;
  }
}), new Def("tpl:html", "tpl:text", {
  isValid: function(value, desc) {
    return this.__super__.isValid(value, desc);
  }
}), new Def("url", "text", {
  isValid: function(value, desc) {
    return /^([a-z]*\:\w*)/.test(value) && value.indexOf(" ") < 0;
  }
}), new Def("json", {
  isValid: function(value, desc) {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  },
  format: function(value) {
    return JSON.stringify(value, null, "  ");
  },
  parse: function(text2) {
    return _$5.isEmpty(text2) ? {} : JSON.parse(text2);
  }
}), new Def("dict"), new Def("css", "text", {
  isValid: function(value, desc) {
    try {
      document.querySelector(value);
      return true;
    } catch (e) {
      return false;
    }
  }
}), new Def("js", "text", {
  isValid: function(value, desc) {
    return true;
  }
}), new Def("xpath", "text", {
  isValid: function(value, desc) {
    try {
      document.createExpression(value, function(prefix) {
        if (prefix == "x" || prefix == "xhtml" || prefix == "html") {
          return "http://www.w3.org/1999/xhtml";
        }
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}), new Def("regexp", "text", {
  isValid: function(value, desc) {
    try {
      new RegExp(value.expr, value.flags);
      return true;
    } catch (e) {
      return false;
    }
  }
}), new Def("enum", "text", {
  isValid: function(value, desc) {
    return _$5.indexOf(_$5.pluck(desc.list, "value"), value) >= 0;
  }
}), new Def("file", {});
var Types = _$5.extend(types, {
  Def,
  get: function(name) {
    return types[name];
  },
  reg: function(name, type) {
    if (typeof type == "string") {
      type = types[type];
    }
    types[name] = type;
  }
});
function identity$1(value) {
  return value;
}
const $$3 = window.jQuery;
if (!$$3) {
  throw new Error("ADD jQuery");
}
const _$4 = window._;
if (!_$4) {
  throw new Error("ADD _");
}
const async = window.async;
if (!async) {
  throw new Error("ADD async");
}
const domo$2 = window.domo;
if (!domo$2) {
  throw new Error("ADD domo");
}
const moment$1 = window.moment;
if (!moment$1) {
  throw new Error("ADD moment");
}
const Backbone$4 = window.Backbone;
if (!Backbone$4) {
  throw new Error("ADD Backbone");
}
const CLASS_HIDE = "hidden";
var Base$3 = View$1.Base.extend({
  initialize: function(options) {
    const param = this.param = options.param || { name: "param" };
    const type = Types.get(options.type || param.type) || this.type;
    if (type == null) {
      throw new Error("Editor with unknown type: " + type);
    }
    this.type = type;
    Base$3.__super__.initialize.call(this, options);
    this.model || (this.model = new Backbone$4.Model());
    this.listenTo(this.model, "change:" + param.name, this.resetValue);
    this.plugins = _$4.map(param.plugins, function(cls) {
      return new cls(type, param, this);
    }, this);
  },
  acquire: function() {
    this.acquireRefs();
    this.renderPlugins();
    this.postRender();
    return this;
  },
  acquireRefs: function() {
  },
  isValid: function() {
    const rawValue = this.getRawValue();
    return !(this.param.must && _$4.isEmpty(rawValue)) && this.type.isValid(rawValue, this.param);
  },
  getValue: function() {
    const raw = this.getRawValue();
    return this.type.parse(raw);
  },
  postRender: function() {
  },
  remove: function() {
    Base$3.__super__.remove.call(this);
    _$4.each(this.plugins, function(plugin) {
      plugin.unload();
    });
  },
  render: function() {
    this.renderBase();
    this.renderPlugins();
    this.postRender();
    return this;
  },
  renderBase: function() {
  },
  renderPlugins: function() {
    _$4.each(this.plugins, function(plugin) {
      plugin.render();
    });
  },
  resetValue: function(model, changes, options) {
    if (options && options.source == "editor") {
      return;
    }
    let value = this.model.get(this.param.name);
    if (value === void 0) {
      value = this.param.defaultValue;
    }
    if (this.getValue() !== value) {
      this.setValue(value);
    }
  },
  setValue: function(value) {
  }
});
const Static = Base$3.extend({
  name: "Static",
  type: Types.text,
  postInit: function() {
    this.listenTo(this.model, "change", this.render);
  },
  renderBase: function() {
    this.$el.text(this.model.get(this.param.name));
    this.$field = this.$el;
    this.field = this.el;
  }
});
const Formatted = Base$3.extend({
  name: "Formatted",
  acquireRefs: function() {
    const $field = this.$el.find("input,textarea,select");
    this.field = $field[0];
    this.$help = $field.next(".help,.help-inline,.help-block");
    this.classHide = this.$help.hasClass("invisible") ? "invisible" : CLASS_HIDE;
    if (!this.field) {
      console.error("Failed to acquire refs for:", this);
      throw new Error("Editor failed to acquire refs");
    }
    const modelValue = this.model.get(this.param.name);
    if (_$4.isUndefined(modelValue)) {
      const value = this.getValue();
      if (!_$4.isEmpty(value) && _$4.isEmpty(this.model.get(this.param.name))) {
        this.model.set(this.param.name, value);
        const self = this;
        _$4.delay(function() {
          self.trigger("change", this, value);
        }, 0);
      }
    }
  },
  getRawValue: function() {
    return this.field.value;
  },
  getFormatted: function(value) {
    return value !== void 0 ? this.type.format(value) : void 0;
  },
  setRawValue: function(value) {
    this.field.value = value;
  },
  setValue: function(value) {
    const formatted = value && this.getFormatted(value);
    if (formatted !== void 0)
      this.setRawValue(formatted);
    if (this.model.get(this.param.name) != value) {
      this.model.set(this.param.name, value);
    }
  }
});
const Hidden = Formatted.extend({
  name: "Hidden",
  type: Types.text
});
const BaseFieldEdit = Formatted.extend({
  inputClass: "form-control xform-control-sm",
  type: Types.text,
  hideError: function() {
    this.$el.removeClass("has-error");
  },
  onBlur: function() {
    this.validate();
  },
  onChange: function() {
    if (this.isValid()) {
      const value = this.getValue();
      this.hideError();
      this.model.set(this.param.name, value, { source: "editor" });
      this.trigger("change", this, value);
    } else {
      this.showError();
    }
  },
  onFocus: function() {
  },
  onInput: _$4.debounce(function() {
    this.onChange();
  }, 400),
  onKeypress: function(e) {
    if (e.keyCode == 13) {
      this.onChange();
    }
  },
  postRender: function() {
    this.$el.addClass("xeditor control-group");
    $$3(this.field).change(this.onChange).focus(this.onFocus).blur(this.onBlur).keypress(this.onKeypress);
    this.resetValue();
  },
  renderBase: function() {
    const help = this.param.help;
    this.$el.empty().append(
      this.field = this.renderField(),
      help ? P({ "class": "help " }, T(help)) : ""
    );
    this.$field = $$3(this.field);
    this.$help = this.$(".help");
  },
  showError: function() {
    this.$el.addClass("has-error");
  },
  validate: function() {
    if (this.isValid())
      ;
    else {
      this.showError();
    }
  }
});
const InputEdit = BaseFieldEdit.extend({
  name: "InputEdit",
  className: "xtext",
  inputType: "text",
  renderField: function() {
    const placeholder = this.param.placeholder || this.param.label;
    return INPUT({
      "placeholder": placeholder ? T(placeholder) : "",
      "type": this.inputType,
      "class": this.inputClass + " inline"
    });
  }
});
const PasswordEdit = InputEdit.extend({
  name: "PasswordEdit",
  inputType: "password"
});
const EmailEdit = InputEdit.extend({
  name: "EmailEdit",
  className: "xemail",
  type: Types.email
});
const IntegerEdit = InputEdit.extend({
  name: "IntegerEdit",
  className: "xnumber",
  type: Types.integer,
  inputType: "number"
});
const NumberEdit = InputEdit.extend({
  name: "NumberEdit",
  className: "xnumber",
  type: Types.number,
  inputType: "number"
});
const DurationEdit = IntegerEdit.extend({
  name: "DurationEdit",
  className: "xduration",
  type: Types.duration
});
const PhoneEdit = InputEdit.extend({
  name: "PhoneEdit",
  className: "xphone",
  type: Types.phone
});
const TextTplEdit = InputEdit.extend({
  name: "TextTplEdit",
  className: "xtpltext",
  type: Types.get("tpl:text")
});
const RichTextEdit = InputEdit.extend({
  name: "RichTextEdit",
  className: "xrichtext",
  renderField: function() {
    return TEXTAREA({
      "class": this.inputClass,
      "placeholder": T(this.param.label || "NA")
    });
  }
});
const HTMLTplEdit = RichTextEdit.extend({
  name: "HTMLTplEdit",
  className: "xhtmltext",
  type: Types.get("tpl:html")
});
const URLEdit = InputEdit.extend({
  name: "URLEdit",
  className: "xurl flex items-stretch",
  type: Types.url
});
const RegExpEdit = BaseFieldEdit.extend({
  name: "RegExpEdit",
  className: "xregexp",
  type: Types.regexp,
  getValue: function() {
    return {
      expr: this.elExpr.value,
      flags: this.elFlags.value
    };
  },
  postRender: function() {
    this.$el.addClass("xeditor control-group");
    $$3([this.elExpr, this.elFlags]).change(this.onChange).focus(this.onFocus).blur(this.onBlur).keypress(this.onKeypress);
    this.resetValue();
  },
  renderField: function() {
    return DIV(
      { "class": "flex" },
      this.elExpr = INPUT({
        "placeholder": T("l_regexp"),
        "type": "text",
        "class": this.inputClass + " xre-expr flex-auto mr2"
      }),
      this.elFlags = INPUT({
        "placeholder": T("l_flags"),
        "type": "text",
        "class": this.inputClass + " xre-flag w-16"
      })
    );
  },
  getRawValue: function() {
    return this.getValue();
  },
  setValue: function(value) {
    const oldValue = this.model.get(this.param.name) || {};
    value || (value = {});
    this.elExpr.value = value.expr || "";
    this.elFlags.value = value.flags || "gim";
    if (!_$4.isEqual(oldValue, value)) {
      this.model.set(this.param.name, value);
    }
  }
});
const MacroEdit = Base$3.extend({
  name: "MacroEdit",
  type: Types.macro,
  getValue: function() {
    return this.value;
  },
  setValue: function(value) {
    this.value = value || {};
  },
  acquireRefs: function() {
    throw new Error("Not supported");
  },
  renderBase: function() {
    throw new Error("Not implemented");
  }
});
const XPathEdit = InputEdit.extend({
  name: "XPathEdit",
  className: "xxpath",
  type: Types.xpath
});
const CSSEdit = InputEdit.extend({
  name: "CSSEdit",
  className: "xcss",
  type: Types.css
});
const JSEdit = RichTextEdit.extend({
  name: "JSEdit",
  className: "xjs",
  type: Types.js
});
const JSONEdit = RichTextEdit.extend({
  name: "JSONEdit",
  className: "xjson",
  type: Types.json
});
const EnumEdit = BaseFieldEdit.extend({
  name: "EnumEdit",
  className: "xenum",
  type: Types.get("enum"),
  getItemLabel: function(item) {
    return T(item.label);
  },
  postInit: function() {
    this.list = this.param.list;
  },
  renderField: function() {
    const self = this;
    const options = _$4.map(this.list, function(aItem) {
      if (_$4.isString(aItem)) {
        return OPTION({ value: aItem }, aItem ? T(aItem) : "");
      } else {
        let attributes3 = { value: aItem.value };
        if (!!aItem.title) {
          attributes3.title = T(aItem.title);
        }
        return OPTION(attributes3, aItem ? self.getItemLabel(aItem) : "");
      }
    });
    let attributes2 = {};
    if (!!this.param.title) {
      attributes2.title = T(this.param.title);
    }
    return SELECT(attributes2, options);
  },
  setList: function(list) {
    this.list = list;
    this.render();
  }
});
var Property = View$1.Base.extend({
  name: "Property",
  className: "row",
  initialize: function(options) {
    Property.__super__.initialize.call(this, options);
    this.$el.on("change", this.updateModel);
  },
  render: function() {
    const self = this;
    let btnDel;
    this.$el.append(
      DIV(
        { "class": "col-xs-1" },
        btnDel = BUTTON(
          { "class": "btn btn-default xbtn-light" },
          I({ "class": "fa fa-trash-o" })
        )
      ),
      DIV(
        { "class": "col-xs-3" },
        this.elKey = INPUT({
          "class": "form-control xform-control-sm inline",
          "placeholder": "name",
          "value": this.model.get("key")
        })
      ),
      DIV(
        { "class": "col-xs-8" },
        this.elValue = INPUT({
          "class": "form-control xform-control-sm inline",
          "placeholder": "value",
          "value": this.model.get("value")
        })
      )
    );
    btnDel.onclick = function() {
      self.trigger("request:delete", self);
    };
    return this;
  },
  updateModel: function() {
    this.model.set({
      key: this.elKey.value,
      value: this.elValue.value
    });
  }
});
var DictEdit = BaseFieldEdit.extend({
  name: "DictEdit",
  className: "xdict",
  type: Types.dict,
  action_add: function() {
    this.addOne("", "");
  },
  addOne: function(key, value) {
    const propertyEditor = new Property({
      model: new Backbone$4.Model({ key, value }),
      parent: this
    });
    propertyEditor.render();
    this.listenTo(propertyEditor, "request:delete", this.onDelete);
    this.listenTo(propertyEditor.model, "change", this.onPropertyChange);
    this.elList.appendChild(propertyEditor.el);
    this.propertyEditors.push(propertyEditor);
  },
  getRawValue: function() {
    return this.getValue();
  },
  getValue: function() {
    return _$4.reduce(this.propertyEditors, function(memo, editor) {
      memo[editor.model.get("key")] = editor.model.get("value");
      return memo;
    }, {});
  },
  initialize: function(options) {
    DictEdit.__super__.initialize.call(this, options);
    this.propertyEditors = [];
  },
  onDelete: function(editor) {
    editor.remove();
    this.propertyEditors = _$4.without(this.propertyEditors, editor);
    this.onChange();
  },
  onPropertyChange: function(model) {
    this.onChange();
  },
  postRender: function() {
    this.resetValue();
  },
  renderField: function() {
    let btnAdd;
    let el;
    el = DIV(
      DIV(
        { "class": "xpad-vertical" },
        btnAdd = BUTTON(
          { "class": "btn btn-default btn-sm xbtn-light" },
          I({ "class": "fa fa-plus" }),
          " " + T(this.param.fieldLabel)
        )
      ),
      this.elList = DIV({})
    );
    btnAdd.onclick = this.action_add;
    return el;
  },
  setValue: function(value) {
    const self = this;
    const oldValue = this.model.get(this.param.name) || {};
    value || (value = {});
    _$4.each(this.propertyEditors, function(editor) {
      editor.remove();
    });
    this.propertyEditors = [];
    _$4.each(value, function(value2, key) {
      self.addOne(key, value2);
    });
    if (!_$4.isEqual(oldValue, value)) {
      this.model.set(this.param.name, value);
    }
  }
});
const FileEdit = InputEdit.extend({
  name: "FileEdit",
  inputType: "file"
});
const views = {
  "css": CSSEdit,
  "duration": DurationEdit,
  "email": EmailEdit,
  "enum": EnumEdit,
  "file": FileEdit,
  "hidden": Hidden,
  "integer": IntegerEdit,
  "js": JSEdit,
  "json": JSONEdit,
  "macro": MacroEdit,
  "number": NumberEdit,
  "password": PasswordEdit,
  "phone": PhoneEdit,
  "regexp": RegExpEdit,
  "request_headers": DictEdit,
  "request_data": DictEdit,
  "static": Static,
  "text": InputEdit,
  "textarea": RichTextEdit,
  "tpl:text": TextTplEdit,
  "tpl:html": HTMLTplEdit,
  "url": URLEdit,
  "xpath": XPathEdit
};
function Plugin(type, param, editor) {
  this.type = type;
  this.param = param;
  this.editor = editor;
  this.load(param, editor);
}
_$4.extend(Plugin.prototype, Backbone$4.Events, {
  load: function(param, editor) {
  },
  render: function() {
  },
  unload: function() {
    this.off();
  }
});
Plugin.extend = View$1.Base.extend;
const SelectOptionsPlugin = Plugin.extend({
  attrLabel: "value",
  attrValue: "value",
  loadData: function(collection) {
    $$3(this.separator).attr("label", "");
    $$3(this.separator).nextAll().remove();
    collection.each(function(model) {
      this.select.appendChild(this.renderOption(model));
    }, this);
    this.editor.resetValue();
    if (_$4.isEmpty(this.editor.getValue()) && collection.length > 0) {
      this.editor.setValue(collection.at(0).get(this.attrValue));
    }
  },
  render: function() {
    const self = this;
    $$3(this.editor.field).wrap(SPAN({
      "class": "xwrap"
    })).addClass("hide").before(this.select = SELECT());
    this.editor.field = this.select;
    this.renderDefaults();
    this.renderActions();
    this.separator = OPTGROUP();
    this.select.appendChild(this.separator);
    $$3(this.select).change(function() {
      const value = self.select.value;
      if (value.indexOf("action:") == 0) {
        self[value.replace(":", "_")]();
        self.reset();
      }
    });
  },
  renderActions: function() {
  },
  renderDefaults: function() {
    this.select.appendChild(
      OPTION(
        { value: "", tag: "defaults" },
        i18n.sprintf(
          T("a_action_object"),
          T("a_select"),
          T(this.param.label || "")
        )
      )
    );
  },
  renderOption: function(model) {
    return OPTION({
      value: model.get(this.attrValue)
    }, this.getOptionLabel(model));
  },
  getOptionLabel: function(model) {
    return model.get(this.attrLabel);
  },
  reset: function() {
    if (this.attrs.length > 0) {
      this.select.value = "";
    } else {
      this.select.value = "";
    }
  }
});
Plugin.extend({
  load: function(param, editor) {
    editor.on("change", function(editor2, value) {
      localStorage.setItem("editor:" + param.name, value);
    });
    let localStorageValue = localStorage.getItem("editor:" + param.name);
    if (!!localStorageValue) {
      param.defaultValue = localStorageValue;
    } else {
      localStorage.setItem("editor:" + param.name, editor.model.get(param.name));
    }
  }
});
var Editor = {
  create: function(type, options) {
    if (typeof type == "object") {
      options = type;
      if (!options.param || !options.param.type) {
        throw new Error("Invalid editor param: " + JSON.stringify(options));
      }
      type = options.param.type;
    }
    const Cls = views[type];
    if (Cls == null)
      throw new Error("View type not registered: " + type);
    return new Cls(options);
  },
  get: function(type) {
    return views[type];
  },
  reg: function(type, Cls) {
    views[type] = Cls;
  },
  Plugin,
  SelectOptionsPlugin
};
const $$2 = window.jQuery;
if (!$$2) {
  throw new Error("ADD jQuery");
}
const _$3 = window._;
if (!_$3) {
  throw new Error("ADD _");
}
const Backbone$3 = window.Backbone;
if (!Backbone$3) {
  throw new Error("ADD Backbone");
}
const Acts = function() {
  let actions = null;
  let view = null;
  function act(name, param, originalTarget) {
    const action = actions && actions[name];
    if (!action) {
      console.error("action not found:" + name);
      return false;
    }
    const context = action.context;
    let fn = action.fn;
    if (_$3.isString(fn)) {
      fn = context[fn];
    }
    if (!fn) {
      return console.error("Function not found: " + action.fn);
    }
    return fn.call(context, param, originalTarget);
  }
  function updateActions() {
    actions = view.getActions();
  }
  return {
    act,
    setActions: function(_actions) {
      actions = _actions;
    },
    setView(_view) {
      if (view) {
        view.off("child:add child:on", updateActions);
      }
      view = _view;
      view.on("child:add child:on", updateActions);
    }
  };
}();
$$2(document).delegate("[data-action]", {
  click: function(event) {
    if (event.actDone)
      return;
    const target = event.currentTarget;
    const name = target.dataset.action;
    let param = target.dataset.actionParam || "";
    if (name == "void 0") {
      event.actDone = true;
      return;
    }
    if (param.charAt(0) == "@") {
      param = $$2(target).attr(param.slice(1));
    } else if (param.charAt(0) == "$") {
      param = param.slice(1);
      const indexSpace = param.indexOf(" ");
      const fn = param.slice(0, indexSpace);
      const path = param.slice(indexSpace + 1);
      const lioAt = path.lastIndexOf("@");
      const el = path.slice(0, lioAt);
      param = $$2(target)[fn](el).attr(path.slice(lioAt + 1));
    }
    if (Acts.act(name, param, target) !== false) {
      event.preventDefault();
      event.actDone = true;
    }
  }
});
Backbone$3.Model.prototype.eget = function(name, v) {
  v = this.get(name);
  return v ? _$3.escape(v) : v;
};
if (typeof console == "undefined") {
  window.console = {
    error: function() {
      alert("unexpected error:" + _$3.toArray(arguments).join(":"));
    },
    log: function() {
    },
    warn: function() {
    }
  };
}
var Core = {
  Acts,
  ID: function(x) {
    return function() {
      return x += 1;
    };
  }(1)
};
const domo$1 = window.domo;
if (!domo$1) {
  throw new Error("ADD domo");
}
const $$1 = window.jQuery;
if (!$$1) {
  throw new Error("ADD jQuery");
}
const Backbone$2 = window.Backbone;
if (!Backbone$2) {
  throw new Error("ADD Backbone");
}
var Base$2 = Backbone$2.View.extend({
  name: "Base",
  domo: domo$1,
  bubbleEvent: function() {
    this.trigger(...arguments);
    this.parent && this.parent.bubbleEvent(...arguments);
  },
  getRoot: function() {
    if (this.parent) {
      return this.parent.getRoot();
    }
    return this;
  },
  focus: _.debounce(function() {
    this.$el.find('[value=""],input:not([value]),textarea').first().focus();
  }, 100),
  initialize: function(options) {
    options || (options = {});
    this.options = options;
    _.bindAll(...[this].concat(_.functions(this)));
    this.children = [];
    this.name = options.name || this.name;
    options.parent && this.setParent(options.parent);
    this.model && this.$el.attr("data-id", this.model.id);
    this.$el.attr({ viewclass: this.name, cid: this.cid });
    this.postInit(options);
  },
  postInit: function(options) {
  },
  remove: function() {
    if (this.el.parentNode) {
      Base$2.__super__.remove.call(this);
      this.setParent(null);
      this.removeChildren();
      this.trigger("remove", this);
    }
  },
  removeChildren: function() {
    _.each(this.children.slice(0), function(child) {
      child.remove();
      this.bubbleEvent("child:remove");
    }, this);
  },
  setParent: function(parent) {
    if (this.parent) {
      this.parent.children = _.without(this.parent.children, this);
      this.parent.bubbleEvent("child:remove", this);
    }
    this.parent = parent;
    if (this.parent) {
      this.parent.children.push(this);
      this.parent.bubbleEvent("child:add", this);
    }
  }
});
const Activable = Base$2.extend({
  name: "Activable",
  active: true,
  setActive: function(active) {
    if (this.active != active) {
      this.active = active;
      this.trigger("active", active);
    }
  }
});
const ActionProvider = Activable.extend({
  name: "ActionProvider",
  actions: {},
  getActions: function() {
    if (this.active) {
      return _.reduce(this.children, function(memo, child) {
        return _.extend(memo, child.getActions && child.getActions());
      }, contextifyActions(this));
    }
    function contextifyActions(view) {
      return _.reduce(view.actions, function(memo, action, name) {
        memo[name] = _.extend({ context: view }, action);
        return memo;
      }, {});
    }
  }
});
var Form = ActionProvider.extend({
  name: "Form",
  tagName: "form",
  event_keypress: function(e) {
    if (e.keyCode == "\r".charCodeAt(0)) {
      return this.onSubmit();
    }
  },
  event_submit: function(e) {
    return this.onSubmit();
  },
  clear: function() {
    this.$el.find("input").val("");
  },
  initialize: function(options) {
    Form.__super__.initialize.call(this, options);
    this.$el.on("submit", this.event_submit);
    this.$el.on("keypress", this.event_keypress);
  },
  onError: function(errors) {
  },
  onSubmit: function() {
    const errors = this.validateFields();
    if (!_.isEmpty(errors)) {
      this.onError(errors);
      return false;
    }
    return this.submit();
  },
  submit: function() {
    return true;
  },
  validateFields: function() {
    return null;
  }
});
const SimpleForm = Form.extend({
  name: "SimpleForm",
  className: "form-horizontal",
  fields: [],
  afterRender: function() {
  },
  onError: function(errors) {
    _.each(this.editors, function(editor) {
      editor.validate();
    });
  },
  render: function() {
    this.$el.attr({
      action: this.options.action || "",
      method: this.options.method || "post"
    });
    this.renderEditors();
    return this;
  },
  renderEditors: function() {
    const self = this;
    self.editors = _.map(self.fields, function(field) {
      const editor = Editor.create(field.type, {
        param: field,
        parent: self,
        model: self.model,
        label: field.label,
        form: true
      });
      self.el.appendChild(editor.render().el);
      return editor;
    });
    self.afterRender();
  },
  validateFields: function() {
    const errors = _.filter(this.editors, function(editor) {
      return !editor.isValid();
    }, this);
    return errors;
  }
});
const Frame$1 = ActionProvider.extend({
  name: "Frame",
  tagName: "iframe",
  attributes: {
    frameborder: 0,
    style: "width: 100%;"
  },
  render: function() {
    this.rendered = true;
    this.iframe = this.el;
    this.iframe.src = this.getFrameURL();
    this.iframe.onload = _.bind(this.initializeFrame, this);
    return this;
  },
  getFrameURL: function() {
    return "about:blank";
  },
  initializeFrame: function() {
  }
});
var XDFrame = Frame$1.extend({
  name: "XDFrame",
  getFrameURL: function() {
    return this.model.get("host") + "/" + this.name + "#" + this.model.id;
  },
  initialize: function(options) {
    XDFrame.__super__.initialize.call(this, options);
    this.options = options;
    this.responseHandlers = {};
  },
  initializeFrame: function() {
    window.addEventListener("message", _.bind(this.onMessage, this));
  },
  onMessage: function(e) {
    if (e.source != this.iframe.contentWindow || this.model.get("host") != e.origin)
      return;
    const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
    if (data.type == "response") {
      const handler = this.responseHandlers[data._id];
      if (handler) {
        delete this.responseHandlers[data._id];
        handler(data.err, data.data);
      }
    } else if (data.type == "event") {
      this.trigger("app", data.data, this);
      if (typeof this["on_" + data.data.type] == "function") {
        this["on_" + data.data.type](data.data);
      }
    } else {
      console.error("Unhandled message type:", data);
    }
  },
  request: function(path, data, callback) {
    const _id = Core.ID();
    callback || (callback = function() {
    });
    this.responseHandlers[_id] = callback;
    let msg = {
      _id,
      type: "request",
      path,
      data
    };
    window.IE && (msg = JSON.stringify(msg));
    this.iframe.contentWindow.postMessage(msg, this.model.get("host"));
  }
});
const Routed = ActionProvider.extend({
  name: "Routed",
  getRouter: function() {
    return this.parent.getRouter();
  },
  routePrefix: function() {
    const prefix = this.options.routePrefix;
    return _.isUndefined(prefix) ? this.name : prefix;
  },
  route: function(frags) {
    frags = _.toArray(arguments);
    frags.unshift(_.result(this, "routePrefix"));
    this.parent.route(frags.join("/"));
  }
});
const RoutedRoot = Routed.extend({
  name: "RoutedRoot",
  actions: {
    "nav": {
      fn: "action_nav"
    }
  },
  action_nav: function(name) {
    Backbone$2.history.navigate(name, true);
  },
  postInit: function(options) {
    this.router = options.router;
    this.on("child:add child:remove", _.debounce(this.updateActions, 10));
  },
  route: function(fragment) {
    this.router.navigate(fragment || "", true);
  },
  getRouter: function() {
    return this.router;
  },
  setRouter: function(router2) {
    this.router = router2;
  },
  updateActions: function() {
    Core.Acts.setActions(this.getActions());
  }
});
const Menu = ActionProvider.extend({
  name: "Menu",
  tagName: "ul",
  className: "dropdown-menu",
  actions: {
    noop: { fn: "noop" }
  },
  noop: function() {
  },
  events: {
    "click a": "event_click"
  },
  event_click: function(event) {
    this.trigger("click", event.target.dataset, event);
  },
  render: function() {
    const items = this.options.items;
    this.$el.append(
      _.map(items, function(item) {
        const a = A({ href: "#", class: "dropdown-item" }, T(item.label));
        _.each(item.data, function(value, key) {
          a.dataset[key] = value;
        });
        return LI(a);
      })
    ).attr("data-action", "noop");
    return this;
  }
});
const ContextMenu = Menu.extend({
  name: "ContextMenu",
  hide: function() {
    this.$el.remove();
    this.removeChildren();
    this.stopListening();
    $$1(window).off("click", this.onAClick).off("keypress", this.onKeyup);
    this.id = null;
  },
  onAClick: function(e) {
    const target = e.target;
    if (($$1.contains(document.documentElement, target) || document.documentElement == target) && !$$1.contains(this.el, target) && $$1(target).parents(".dropdown-menu").length == 0) {
      this.hide();
    }
  },
  onKeyup: function(e) {
    if (e.keyCode == 27) {
      this.hide();
    }
  },
  renderMenu: function() {
  },
  show: function() {
    const ref = this.ref;
    const parent = $$1(ref).offsetParent();
    const offset = $$1(ref).position();
    $$1(this.el).css({
      "display": "block",
      "left": 0,
      "color": "#333",
      "font-weight": 300
    }).css({
      top: offset.top + ref.offsetHeight,
      left: Math.min(
        offset.left + 10,
        parent.width() - this.el.offsetWidth - 10
      )
    }).attr("data-action", "noop");
  },
  toggle: function(id, ref) {
    if (this.id === id) {
      this.off();
      this.hide();
      return;
    }
    if (this.id)
      this.hide();
    this.id = id;
    this.ref = ref;
    this.renderMenu();
    this.$el.appendTo(ref.parentNode);
    this.show();
    _.defer(function(self) {
      $$1(window).click(self.onAClick).keyup(self.onKeyup);
    }, this);
  }
});
const Dropdown = ActionProvider.extend({
  name: "Dropdown",
  className: "dropdown dropup",
  actionTag: "a",
  postInit: function(options) {
    this.menu = options.menu;
    this.label = options.label;
  },
  render: function() {
    const elAction = this.renderAction();
    this.$el.append(
      elAction,
      this.menu.render().el
    ).css("font-weight", "initial");
    return this;
  },
  renderAction: function() {
    const caret = SPAN({ "class": "caret" });
    const elLabel = this.elLabel = SPAN(this.label);
    return this.actionTag == "a" ? A({
      "class": "dropdown-toggle",
      "data-toggle": "dropdown",
      "href": "#"
    }, elLabel, " ", caret) : BUTTON({
      "class": "btn btn-default dropdown-toggle",
      "data-toggle": "dropdown"
    }, elLabel, " ", caret);
  },
  setLabel: function(label) {
    this.label = label;
    if (this.elLabel) {
      $$1(this.elLabel).text(T(this.label));
    }
  }
});
var Panel = ActionProvider.extend({
  name: "Panel",
  className: "card panel-default",
  bodyClass: "card-body",
  headerClass: "card-header",
  title: "Title",
  postInit: function(options) {
    _.extend(this, _.pick(
      options,
      "toolbarActions",
      "title",
      "view",
      "bodyClass",
      "headerClass"
    ));
    this.view && this.listenTo(this.view, "remove", this.remove);
  },
  remove: function() {
    this.view && this.view.remove();
    Panel.__super__.remove.call(this);
  },
  render: function() {
    const views2 = [];
    const header = this.renderHeader();
    const view = this.renderView();
    const footer = this.footer = this.renderFooter();
    if (header) {
      views2.push(DIV({ "class": this.headerClass }, header));
    }
    $$1(view).addClass(this.bodyClass).css("clear", "both");
    views2.push(view);
    if (footer) {
      views2.push(footer);
    }
    this.$el.append(views2);
    return Panel.__super__.render.call(this);
  },
  renderHeader: function() {
    let extraEl;
    let actions;
    const header = DIV(
      actions = DIV({ "class": "xtbar pull-right" }),
      H3(T(this.title), extraEl = SMALL())
    );
    _.each(this.toolbarActions, function(action, index) {
      actions.appendChild(
        A(_.extend({
          "class": index == 0 ? "btn btn-primary" : "btn"
        }, action.attrs), T(action.label))
      );
    });
    this.options.titleEx && $$1(extraEl).empty().append(" ", SMALL(T(this.options.titleEx)));
    return header;
  },
  renderFooter: function() {
  },
  renderView: function() {
    return this.view.render().el;
  }
});
var Modal = Panel.extend({
  name: "Modal",
  actions: { "modal close": { fn: "action_discard" } },
  toolbarActions: [
    {
      label: "\u2715",
      attrs: {
        "data-action": "modal close",
        "class": "close",
        "title": "Close"
      }
    }
  ],
  action_discard: function() {
    this.trigger("discard");
    this.remove();
  },
  render: function() {
    Modal.__super__.render.call(this);
    const opts = this.options;
    const top = opts.top === void 0 ? 0 : opts.top;
    const dimens = _.extend({
      width: 800
    }, _.pick(opts, "height", "width"));
    const wrapped = this.el;
    const parent = this.el.parentNode;
    const wrap = domo$1.DIV(
      { "class": "xmodal" },
      wrapped,
      domo$1.DIV({ "class": "xbg" })
    );
    parent && parent.appendChild(wrap);
    this.el = wrap;
    this.$el = Backbone$2.$(this.el);
    if (opts.maxHeight) {
      this.view.$el.css({
        maxHeight: opts.maxHeight,
        overflow: "auto"
      });
    }
    $$1(wrapped).css(dimens).addClass("xraised");
    if (opts.position == "absolute") {
      this.$el.css("top", $$1(window).scrollTop() + top);
    } else {
      this.$el.css({ position: "fixed", top });
    }
    return this;
  },
  show: function() {
    $$1("body").append(this.render().el);
    this.focus();
    return this;
  }
});
const SaveDiscardModal = Modal.extend({
  action_discard: function() {
    this.trigger("discard");
    const callback = this.options.discard;
    callback && callback(this);
  },
  action_save: function() {
    this.trigger("save");
    const callback = this.options.save;
    callback && callback(this);
  },
  renderFooter: function() {
    const footer = DIV(
      { "class": "card-footer btn-toolbar" },
      this.save = BUTTON({
        "class": "btn " + (this.options.okBtnClass || "btn-primary"),
        "data-loading-text": T("l_loading")
      }, T(this.options.a_save || "a_save")),
      this.discard = BUTTON({
        "class": "btn btn-default ml-2"
      }, T(this.options.a_discard || "a_discard"))
    );
    this.discard.onclick = this.action_discard;
    this.save.onclick = this.action_save;
    return footer;
  },
  showProgress: function(show) {
    if (show === false) {
      $$1(this.save).button("reset");
    } else {
      $$1(this.save).button("loading");
    }
  }
});
const PromptModal = SaveDiscardModal.extend({
  title: "l_prompt",
  a_save: "a_save",
  action_discard: function() {
    this.trigger("discard");
    this.remove();
  },
  renderView: function() {
    return DIV(
      { "class": "form" },
      DIV(
        { "class": "form-group" },
        LABEL({
          "class": "control-label"
        }, T(this.options.msg || " ")),
        DIV(this.view ? this.view.render().el : ""),
        this.alert = DIV({ "class": "alert alert-error hide" })
      )
    );
  },
  showAlert: function(msg) {
    if (msg) {
      $$1(this.alert).html(T(msg)).removeClass("hide").removeClass("invisible");
    } else {
      $$1(this.alert).addClass("invisible");
    }
  }
});
var Collection$3 = ActionProvider.extend({
  name: "Collection",
  _getModelId: function(model) {
    return model.id || model.cid;
  },
  addOne: function(model) {
    throw new Error("addOne not implemented!");
  },
  initialize: function(options) {
    const self = this;
    this.initCollection(options);
    this.views = {};
    this.listenTo(this.collection, "add", function(model) {
      self.views[self._getModelId(model)] = self.addOne(model);
    });
    this.listenTo(this.collection, "remove", this.removeOne);
    this.listenTo(this.collection, "reset", this.onReset);
    Collection$3.__super__.initialize.call(this, options);
  },
  initCollection: function(options) {
    this.collection = options.collection || options.model;
  },
  onReset: function(collection, options) {
    this.resetList(options.previousModels);
    if (this.rendered) {
      this.renderList();
    }
  },
  removeOne: function(model) {
    const id = this._getModelId(model);
    const view = this.views[id];
    if (view) {
      view.remove();
      delete this.views[id];
    }
  },
  render: function() {
    this.renderBase();
    this.renderList();
    this.rendered = true;
    return this;
  },
  renderBase: function() {
  },
  renderList: function() {
    const self = this;
    this.views = this.collection.reduce(function(views2, model) {
      views2[self._getModelId(model)] = self.addOne(model);
      return views2;
    }, this.views);
  },
  resetList: function(oldModels) {
    _.each(oldModels, this.removeOne);
  }
});
const Entities = Collection$3.extend({
  name: "Entities",
  ViewClass: Base$2,
  removeModelView: function() {
    if (this.modelView) {
      this.modelView.remove();
    }
    this.modelView = this.model = null;
  },
  renderModelView: function(model, view) {
    throw new Error("Override renderModelView()");
  },
  showModelView: function(model) {
    if (!this.ViewClass) {
      throw new Error("ViewClass not set.", model);
    }
    if (this.modelView) {
      if (this.modelView.model == model) {
        return this.modelView;
      }
      this.removeModelView();
    }
    this.modelView = new this.ViewClass({
      model,
      parent: this,
      ...this.ViewOptions
    });
    this.renderModelView(model, this.modelView);
    return this.modelView;
  }
});
const Summary = Base$2.extend({
  name: "Summary",
  className: "xsummary",
  render: function() {
    this.$el.append(
      DIV(CLS("xmask")),
      DIV(CLS("xinfo"))
    );
  }
});
var View = {
  ActionProvider,
  Activable,
  Base: Base$2,
  Collection: Collection$3,
  Dropdown,
  ContextMenu,
  Entities,
  Form,
  Frame: Frame$1,
  Menu,
  Modal,
  PromptModal,
  Panel,
  Routed,
  RoutedRoot,
  SaveDiscardModal,
  SimpleForm,
  Summary,
  XDFrame
};
const _$2 = window._;
if (!_$2) {
  throw new Error("ADD _");
}
const Backbone$1 = window.Backbone;
if (!Backbone$1) {
  throw new Error("ADD Backbone");
}
async function sync(method, model, options) {
  if (!Api.api) {
    Api.on("init", function() {
      sync(method, model, options);
    });
    return;
  }
  const url2 = _$2.result(model, "url") || urlError();
  let data = options.data;
  let headers = options.headers;
  if (data == null && model && (method === "create" || method === "update" || method === "patch")) {
    data = options.attrs || model.toJSON(options);
  }
  let xhr;
  try {
    xhr = options.xhr = await Api.api({
      url: url2,
      method,
      json: data,
      headers
    });
    options.success && options.success(xhr);
  } catch (err) {
    options.error && options.error({ ...err, data });
    throw err;
  }
  model.trigger("request", model, xhr, options);
  return xhr;
}
async function syncBatch(changes) {
  const dels = _$2.map(changes.dels, function(model) {
    return {
      method: "DELETE",
      url: _$2.result(model, "url") || urlError()
    };
  });
  const posts = _$2.map(changes.posts, function(model) {
    return {
      method: "POST",
      url: _$2.result(model, "url") || urlError(),
      body: model.toJSON()
    };
  });
  const puts = _$2.map(changes.puts, function(model) {
    return {
      method: "PUT",
      url: _$2.result(model, "url") || urlError(),
      body: _$2.pick(...[model.toJSON()].concat(_$2.keys(model.changedAttributes())))
    };
  });
  const requests = [].concat(dels, posts, puts);
  if (requests.length == 0) {
    return false;
  }
  return await Api.batch(requests);
}
var urlError = function() {
  throw new Error('A "url" property or function must be specified');
};
const origModelFetch = Backbone$1.Model.prototype.fetch;
Backbone$1.Model.prototype.fetch = async function(options) {
  try {
    await this.fetchPromise;
  } catch (e) {
  }
  options || (options = {});
  let promise = new Promise((resolve, reject) => {
    origModelFetch.call(this, {
      ...options,
      error: function(...args) {
        options.error && options.error(...args);
        reject(args[1]);
      },
      success: function(...args) {
        options.success && options.success(...args);
        resolve(args);
      }
    });
  });
  this.fetchPromise = promise;
  return promise;
};
const origModelSave = Backbone$1.Model.prototype.save;
Backbone$1.Model.prototype.save = async function(key, value, options) {
  let data;
  if (arguments.length == 3) {
    data = { [key]: value };
  } else {
    data = key;
    options = value;
  }
  options || (options = {});
  return new Promise((resolve, reject) => {
    origModelSave.call(this, data, {
      ...options,
      error: function(...args) {
        options.error && options.error(...args);
        reject(args[1]);
      },
      success: function(...args) {
        options.success && options.success(...args);
        resolve(args);
      }
    });
  });
};
const origCollectionCreate = Backbone$1.Collection.prototype.create;
Backbone$1.Collection.prototype.create = async function(attributes2, options) {
  options || (options = {});
  return new Promise((resolve, reject) => {
    origCollectionCreate.call(this, attributes2, {
      ...options,
      error: function(...args) {
        options.error && options.error(...args);
        reject(args[1]);
      },
      success: function(model, resp) {
        options.success && options.success(model, resp, options);
        resolve(model);
      }
    });
  });
};
const origCollectionFetch = Backbone$1.Collection.prototype.fetch;
Backbone$1.Collection.prototype.fetch = async function(options) {
  try {
    await this.fetchPromise;
  } catch (e) {
  }
  options || (options = {});
  let promise = new Promise((resolve, reject) => {
    origCollectionFetch.call(this, {
      ...options,
      error: function(...args) {
        options.error && options.error(...args);
        reject(args[1]);
      },
      success: function(...args) {
        options.success && options.success(...args);
        resolve(args);
      }
    });
  });
  this.fetchPromise = promise;
  return promise;
};
Backbone$1.Model.prototype.clone = function() {
  const json2 = this.toJSON();
  const model = new this.constructor(json2, { parse: true });
  model.props = _$2.clone(this.props);
  return model;
};
const Model$3 = Backbone$1.Model.extend({
  sync,
  encodedFields: [],
  initialize(...args) {
    Model$3.__super__.initialize.call(this, ...args);
    this._listeners = [];
    this.listenTo(this, "change", this._notify);
    this.attributes = new Proxy(this.attributes, {
      set: (obj, key, value) => {
        let oldValue = obj[key];
        if (oldValue !== value) {
          obj[key] = value;
          this._notify();
        }
        return true;
      }
    });
  },
  _notify() {
    for (let listener of this._listeners) {
      listener(this.attributes);
    }
  },
  subscribe(listener) {
    this._listeners.push(listener);
    listener(this.attributes);
    return () => {
      this._listeners.splice(this._listeners.indexOf(listener), 1);
    };
  },
  parse(response) {
    _$2.each(this.encodedFields, function(name) {
      const text2 = response[name];
      if (_$2.isString(text2)) {
        let obj = null;
        try {
          obj = JSON.parse(text2);
        } catch (e) {
          console.error("Invalid model json attribute:", name, text2, e);
        }
        response[name] = obj;
      }
    });
    return response;
  },
  prop(name, value) {
    this.props || (this.props = {});
    if (arguments.length == 2) {
      const oldVal = _$2.result(this.props, name);
      if (oldVal === value)
        return;
      this.props[name] = value;
      this.trigger("prop:" + name, value, oldVal);
      if (this.collection) {
        this.collection.trigger("prop:" + name, value, oldVal, this);
      }
    } else {
      return _$2.result(this.props, name);
    }
  },
  toJSON() {
    const json2 = Backbone$1.Model.prototype.toJSON.call(this);
    _$2.each(this.encodedFields, function(name) {
      const obj = json2[name];
      if (!_$2.isEmpty(obj)) {
        json2[name] = JSON.stringify(obj);
      }
    });
    return json2;
  }
});
const Collection$2 = Backbone$1.Collection.extend({
  model: Model$3,
  sync,
  initialize(...args) {
    Collection$2.__super__.initialize.call(this, ...args);
    this._listeners = [];
    this._query = {};
    this._opt = {};
    this.listenTo(this, "add", this._notify);
    this.listenTo(this, "change", this._notify);
    this.listenTo(this, "remove", this._notify);
    this.listenTo(this, "reset", this._notify);
  },
  _notify() {
    for (let listener of this._listeners) {
      listener(this);
    }
  },
  fetch(options = {}) {
    var _a;
    let data = options.data || {};
    let _opt = { ...(_a = data._opt) != null ? _a : {}, ...this._opt };
    options.data = { ...data, ...this._query, _opt };
    options.headers = this.headers;
    let res = Collection$2.__super__.fetch.call(this, options);
    this._notify();
    return res;
  },
  parse: function(res) {
    return res.data;
  },
  subscribe(listener) {
    this._listeners.push(listener);
    listener(this);
    return () => {
      this._listeners.splice(this._listeners.indexOf(listener), 1);
    };
  },
  setQuery(q) {
    this._query = q;
  },
  getQuery(q) {
    return this._query;
  },
  setOpt(opt) {
    this._opt = opt;
  },
  setHeaders(headerObj) {
    if (typeof headerObj !== "object") {
      throw new Error("header must be an object");
    }
    this.headers = headerObj;
  }
});
const PagedCollection = Collection$2.extend({
  currentPage: 0,
  limit: 20,
  total_count: 0,
  orderBy: "-ts",
  initialize(models = [], options = {}) {
    PagedCollection.__super__.initialize.call(this, models, options);
    _$2.extend(this, _$2.pick(options, "limit", "orderBy"));
  },
  getOpts() {
    return {
      limit: this.limit,
      offset: this.currentPage * this.limit,
      order: [this.orderBy]
    };
  },
  goto(page, options) {
    this.currentPage = parseInt(page || "0", 10);
    return this.fetch(options);
  },
  hasNext() {
    let { currentPage, nPages } = this.info();
    return currentPage < nPages - 1;
  },
  hasPrev() {
    return this.currentPage > 0;
  },
  info() {
    let { currentPage, limit, orderBy, total_count } = this;
    let count = this.models.length;
    return {
      count,
      currentPage,
      nPages: Math.ceil(total_count / limit),
      offset: currentPage * limit,
      limit,
      orderBy,
      total_count: total_count || 0
    };
  },
  onNext() {
    this.hasNext() && this.goto(this.currentPage + 1);
  },
  onPrev() {
    this.hasPrev() && this.goto(this.currentPage - 1);
  },
  parse(res) {
    this.total_count = res.total_count;
    return res.data;
  },
  sync(method, self, options) {
    options.data = options.data || {};
    options.data._opt = _$2.extend(this.getOpts(), options.data._opt);
    return sync(method, self, options);
  }
});
var base$1 = {
  sync,
  syncBatch,
  Model: Model$3,
  Collection: Collection$2,
  PagedCollection
};
class UserPermissions extends base$1.Model {
  constructor(user) {
    super();
    this.user = user;
    params.subscribe((paramsSubValue) => {
      var _a;
      paramsSubValue != null ? paramsSubValue : paramsSubValue = {
        team: "0"
      };
      (_a = paramsSubValue.team) != null ? _a : paramsSubValue.team = "0";
      let attrs = {
        "team": paramsSubValue.team,
        readOnly: !user.hasEditPermissions(paramsSubValue.team)
      };
      this.set(attrs);
    });
  }
}
const PREFS_DEFAULT = {
  ui_diff: {
    removed: false,
    snipped: false
  }
};
const User = base$1.Model.extend({});
const Self = User.extend({
  url: "/users/self/init",
  initialize(...args) {
    Self.__super__.initialize.call(this, ...args);
    this.permissionsModel = new UserPermissions(this);
  },
  defaults() {
    return {
      constraint: { interval: 5 },
      prefs: PREFS_DEFAULT,
      features: {}
    };
  },
  getPref(key) {
    return this.attributes.prefs[key] || PREFS_DEFAULT[key];
  },
  setDiffPrefs(diffPrefs) {
    this.attributes.prefs.ui_diff = diffPrefs;
    this.trigger("change:ui_diff", diffPrefs);
  },
  isLoggedIn() {
    return !!this.attributes.id;
  },
  isEnterprise() {
    return !!this.attributes.account_id;
  },
  isFlexi() {
    return this.attributes.constraint.flexi;
  },
  getPermissions(teamId = "0") {
    if (teamId === "0") {
      return {
        edit: true,
        admin: true
      };
    }
    const teams = this.get("groups");
    if (!teams || teams.length === 0) {
      return {
        edit: false,
        admin: false
      };
    }
    const team = teams.find((t) => t.id === teamId);
    if (!team) {
      return {
        edit: false,
        admin: false
      };
    }
    return team.permissions;
  },
  hasEditPermissions(teamId = "0") {
    const permissions = this.getPermissions(teamId);
    return !!(permissions.edit || permissions.admin);
  }
});
const { Model: Model$2, Collection: Collection$1 } = base$1;
const UserAttr = Model$2.extend({
  urlRoot: "/users/attrs",
  isVerified() {
    return this.get("state") == C$1.STATE_ATTR_VERIFY_DONE;
  },
  isPrimary() {
    return this.get("name") == "email" && this.get("value") == window.App.user.get("email");
  }
});
const UserAttrs = Collection$1.extend({
  model: UserAttr,
  url: "/users/attrs"
});
var AttrModel = {
  UserAttr,
  UserAttrs
};
const Client = base$1.Model.extend({
  urlRoot: "/clients",
  getIcon: function() {
    let iconClass;
    const clientType = this.get("type");
    if (this.iconClass) {
      return this.iconClass;
    } else if (this.id == Clients.webAppId) {
      iconClass = "fa fa-cloud";
    } else if (this.id == App.clients.defaultId) {
      iconClass = "im-pc";
    } else if (clientType == C$1.CLIENT_FF) {
      iconClass = "im-firefox";
    } else if (clientType == C$1.CLIENT_CR) {
      iconClass = "im-chrome";
    } else if (clientType == C$1.CLIENT_OP) {
      iconClass = "im-opera";
    } else if (clientType == C$1.CLIENT_FFWX) {
      iconClass = "im-firefox";
    } else {
      iconClass = "im-globe";
    }
    return this.iconClass = iconClass;
  },
  getInfo: function() {
    let info = this.get("info") || this.get("name");
    if (this.id == App.clients.defaultId) {
      info += " (this device)";
    }
    return info;
  },
  isWeb: function() {
    return this.id === Clients.webAppId;
  },
  isExtension() {
    return [
      C$1.CLIENT_SF,
      C$1.CLIENT_FFWX,
      C$1.CLIENT_CR,
      C$1.CLIENT_OP,
      C$1.CLIENT_MSE,
      C$1.CLIENT_ANY
    ].includes(this.get("type"));
  }
});
var Clients = base$1.Collection.extend({
  model: Client,
  url: "/clients",
  fetch(options = { data: { "state.in": [0, 30], "_opt": { order: ["ts"] } } }) {
    return Clients.__super__.fetch.call(this, options);
  }
}, {
  webAppId: C$1.CLIENT_ID_WEB,
  anyLocalId: C$1.CLIENT_ID_ANY
});
var ModelClient = {
  Client,
  Clients
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = /* @__PURE__ */ new WeakMap();
const directive = (f) => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};
const isDirective = (o) => {
  return typeof o === "function" && directives.has(o);
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
const reparentNodes = (container, start2, end = null, before = null) => {
  while (start2 !== end) {
    const n = start2.nextSibling;
    container.insertBefore(start2, before);
    start2 = n;
  }
};
const removeNodes = (container, start2, end = null) => {
  while (start2 !== end) {
    const n = start2.nextSibling;
    container.removeChild(start2);
    start2 = n;
  }
};
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const noChange = {};
const nothing = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
const boundAttributeSuffix = "$lit$";
class Template {
  constructor(result, element2) {
    this.parts = [];
    this.element = element2;
    const nodesToRemove = [];
    const stack = [];
    const walker = document.createTreeWalker(element2.content, 133, null, false);
    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const { strings, values: { length } } = result;
    while (partIndex < length) {
      const node = walker.nextNode();
      if (node === null) {
        walker.currentNode = stack.pop();
        continue;
      }
      index++;
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attributes2 = node.attributes;
          const { length: length2 } = attributes2;
          let count = 0;
          for (let i = 0; i < length2; i++) {
            if (endsWith(attributes2[i].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings[partIndex];
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({ type: "attribute", index, name, strings: statics });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings2 = data.split(markerRegex);
          const lastIndex = strings2.length - 1;
          for (let i = 0; i < lastIndex; i++) {
            let insert2;
            let s = strings2[i];
            if (s === "") {
              insert2 = createMarker();
            } else {
              const match = lastAttributeNameRegex.exec(s);
              if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
              }
              insert2 = document.createTextNode(s);
            }
            parent.insertBefore(insert2, node);
            this.parts.push({ type: "node", index: ++index });
          }
          if (strings2[lastIndex] === "") {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings2[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({ type: "node", index });
          if (node.nextSibling === null) {
            node.data = "";
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            this.parts.push({ type: "node", index: -1 });
            partIndex++;
          }
        }
      }
    }
    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }
}
const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
const createMarker = () => document.createComment("");
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i = 0;
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.setValue(values[i]);
      }
      i++;
    }
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts2 = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts2.length) {
      part = parts2[partIndex];
      if (!isTemplatePartActive(part)) {
        this.__parts.push(void 0);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part2 = this.processor.handleTextExpression(this.options);
        part2.insertAfterNode(node.previousSibling);
        this.__parts.push(part2);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  getHTML() {
    const l = this.strings.length - 1;
    let html2 = "";
    let isCommentBinding = false;
    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      const commentOpen = s.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        html2 += s + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        html2 += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }
    html2 += this.strings[l];
    return html2;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    let value = this.getHTML();
    if (policy !== void 0) {
      value = policy.createHTML(value);
    }
    template.innerHTML = value;
    return template;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
const isIterable = (value) => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
class AttributeCommitter {
  constructor(element2, name, strings) {
    this.dirty = true;
    this.element = element2;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts2 = this.parts;
    if (l === 1 && strings[0] === "" && strings[1] === "") {
      const v = parts2[0].value;
      if (typeof v === "symbol") {
        return String(v);
      }
      if (typeof v === "string" || !isIterable(v)) {
        return v;
      }
    }
    let text2 = "";
    for (let i = 0; i < l; i++) {
      text2 += strings[i];
      const part = parts2[i];
      if (part !== void 0) {
        const v = part.value;
        if (isPrimitive(v) || !isIterable(v)) {
          text2 += typeof v === "string" ? v : String(v);
        } else {
          for (const t of v) {
            text2 += typeof t === "string" ? t : String(t);
          }
        }
      }
    }
    text2 += strings[l];
    return text2;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}
class AttributePart {
  constructor(committer) {
    this.value = void 0;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (isDirective(this.value)) {
      const directive2 = this.value;
      this.value = noChange;
      directive2(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
}
class NodePart {
  constructor(options) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.options = options;
  }
  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());
    part.__insert(this.endNode = createMarker());
  }
  insertAfterPart(ref) {
    ref.__insert(this.startNode = createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    const value = this.__pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance2 = new TemplateInstance(template, value.processor, this.options);
      const fragment = instance2._clone();
      instance2.update(value.values);
      this.__commitNode(fragment);
      this.value = instance2;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === void 0) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
class BooleanAttributePart {
  constructor(element2, name, strings) {
    this.value = void 0;
    this.__pendingValue = void 0;
    if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element2;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = noChange;
  }
}
class PropertyCommitter extends AttributeCommitter {
  constructor(element2, name, strings) {
    super(element2, name, strings);
    this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
}
class PropertyPart extends AttributePart {
}
let eventOptionsSupported = false;
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (_e) {
  }
})();
class EventPart {
  constructor(element2, eventName, eventContext) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.element = element2;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = (e) => this.handleEvent(e);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
}
const getOptions = (o) => o && (eventOptionsSupported ? { capture: o.capture, passive: o.passive, once: o.once } : o.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class DefaultTemplateProcessor {
  handleAttributeExpressions(element2, name, strings, options) {
    const prefix = name[0];
    if (prefix === ".") {
      const committer2 = new PropertyCommitter(element2, name.slice(1), strings);
      return committer2.parts;
    }
    if (prefix === "@") {
      return [new EventPart(element2, name.slice(1), options.eventContext)];
    }
    if (prefix === "?") {
      return [new BooleanAttributePart(element2, name.slice(1), strings)];
    }
    const committer = new AttributeCommitter(element2, name, strings);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new NodePart(options);
  }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: /* @__PURE__ */ new WeakMap(),
      keyString: /* @__PURE__ */ new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);
  if (template === void 0) {
    template = new Template(result, result.getTemplateElement());
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
const templateCaches = /* @__PURE__ */ new Map();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = /* @__PURE__ */ new WeakMap();
const render = (result, container, options) => {
  let part = parts.get(container);
  if (part === void 0) {
    removeNodes(container, container.firstChild);
    parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
if (typeof window !== "undefined") {
  (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.4.1");
}
const html = (strings, ...values) => new TemplateResult(strings, values, "html", defaultTemplateProcessor);
class Base$1 {
  constructor(initialState = {}, options) {
    Object.assign(this, options);
    this.el = this.el || document.createElement(this.tag);
    this.el.setAttribute("viewclass", this._getCName());
    this.state = new Proxy(initialState, {
      set: (obj, prop, value) => {
        if (obj[prop] !== value) {
          obj[prop] = value;
          !this._renderTimeout && this._render();
        }
        return true;
      },
      deleteProperty: (target, prop) => {
        if (prop in target) {
          delete target[prop];
          !this._renderTimeout && this._render();
          return true;
        }
        return false;
      }
    });
    this.views = new Proxy({}, {
      set: (obj, prop, value) => {
        if (obj[prop] !== value) {
          obj[prop] = value;
          this._render();
        }
        return true;
      }
    });
    this.init();
    this._render();
  }
  createTpl() {
    throw new Error(`View should implement createTpl(state)`);
  }
  init() {
  }
  _render() {
    if (this._renderTimeout) {
      clearTimeout(this._renderTimeout);
    }
    this._renderTimeout = setTimeout(() => {
      delete this._renderTimeout;
      render(this.createTpl(this.state), this.el);
      this.afterRender();
    }, 1);
  }
  afterRender() {
  }
  setState(newState) {
    for (const key in newState) {
      if (this.state[key] !== newState[key]) {
        this.state[key] = newState[key];
      }
    }
  }
  _getCName() {
    return this.constructor.name;
  }
}
Base$1.prototype.tag = "div";
let _$1 = typeof window !== "undefined" ? window._ : null;
let C = typeof window !== "undefined" ? window.C : null;
(async () => {
  if (!_$1) {
    _$1 = await __vitePreload(() => import("underscore"), true ? [] : void 0);
  }
  if (!C) {
    ({ default: C } = await __vitePreload(() => Promise.resolve().then(function() {
      return _const;
    }), true ? void 0 : void 0));
  }
})();
function findNumbers(text2, numberFormat) {
  if (!numberFormat) {
    numberFormat = C.NUM_FORMAT_COMMA_DOT;
  }
  switch (numberFormat) {
    case C.NUM_FORMAT_DOT_COMMA:
      return findNumbersDotComma(text2);
    case C.NUM_FORMAT_SPACE_COMMA:
      return findNumbersSpaceComma(text2);
    case C.NUM_FORMAT_COMMA_DOT:
      return findNumbersCommaDot(text2);
    default:
      throw new Error("unknown number format:" + numberFormat);
  }
}
function containsText(text1, text2) {
  if (!_$1.isString(text1)) {
    throw new Error("invalid type of text: " + typeof text1);
  }
  text2 || (text2 = "");
  if (!_$1.isString(text2)) {
    throw new Error("invalid type of text: " + typeof text2);
  }
  return text1.toLowerCase().includes(text2.toLowerCase());
}
function findNumbersCommaDot(text2) {
  let matches = text2 ? text2.match(/-*[0-9,.]+/g) || [] : [];
  let numbers = [];
  for (let i = 0, len = matches.length; i < len; i += 1) {
    let a_num = matches[i];
    if (a_num.length > 0) {
      a_num = parseFloat(a_num.replace(/([\s,]*)/g, ""));
      if (!isNaN(a_num)) {
        numbers.push(a_num);
      }
    }
  }
  return numbers;
}
function findNumbersDotComma(text2) {
  let matches = text2 ? text2.match(/-*[0-9,.]+/g) || [] : [];
  let numbers = [];
  for (let i = 0, len = matches.length; i < len; i += 1) {
    let a_num = matches[i];
    if (a_num.length > 0) {
      a_num = a_num.replace(/\./g, "*");
      a_num = a_num.replace(/,/g, ".");
      a_num = a_num.replace(/\.(?=.*\.)/g, "");
      a_num = a_num.replace(/\*/g, "");
      a_num = parseFloat(a_num);
      if (!isNaN(a_num)) {
        numbers.push(a_num);
      }
    }
  }
  return numbers;
}
function findNumbersSpaceComma(text2) {
  let matches = text2 ? text2.match(/-*[\d,.\s]+/g) || [] : [];
  let numbers = [];
  for (let i = 0, len = matches.length; i < len; i += 1) {
    let a_num = matches[i];
    if (a_num.length > 0) {
      a_num = a_num.replace(/\s/g, "");
      a_num = a_num.replace(/\./g, "");
      a_num = a_num.replace(/,(?=.*,)/g, "");
      a_num = a_num.replace(",", ".");
      a_num = parseFloat(a_num);
      if (!isNaN(a_num)) {
        numbers.push(a_num);
      }
    }
  }
  return numbers;
}
const defs = {
  contains: {
    id: "contains",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      return containsText(left, right);
    },
    fieldType: "text"
  },
  not_contains: {
    id: "not_contains",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      return !containsText(left, right);
    },
    fieldType: "text"
  },
  starts_with: {
    id: "starts_with",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      return left.startsWith(right);
    },
    fieldType: "text"
  },
  not_starts_with: {
    id: "not_starts_with",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      return !left.startsWith(right);
    },
    fieldType: "text"
  },
  ends_with: {
    id: "ends_with",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      return left.endsWith(right);
    },
    fieldType: "text"
  },
  not_ends_with: {
    id: "not_ends_with",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      return !left.endsWith(right);
    },
    fieldType: "text"
  },
  is_empty: {
    id: "is_empty",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      return _$1.isEmpty(left);
    },
    fieldType: null
  },
  not_is_empty: {
    id: "not_is_empty",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      return !_$1.isEmpty(left);
    },
    fieldType: null
  },
  has_num_lt: {
    id: "has_num_lt",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      let numbers = findNumbers(left, context.numberFormat);
      return _$1.any(numbers, function(num) {
        return num < right;
      });
    },
    fieldType: "number"
  },
  has_num_gt: {
    id: "has_num_gt",
    match: (leftOperand, right, context) => {
      let left = getVar(leftOperand, context);
      let numbers = findNumbers(left, context.numberFormat);
      return _$1.any(numbers, function(num) {
        return num > right;
      });
    },
    fieldType: "number"
  },
  has_num_decr_min: {
    id: "has_num_decr_min",
    match: (leftOperand, right, context) => {
      if (leftOperand != "$new") {
        throw new Error("Old value not present for " + leftOperand);
      }
      let left = getVar(leftOperand, context);
      let numbers = findNumbers(left, context.numberFormat);
      let oldText = getVar("$old", context);
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        if (oldNumbers[i] - numbers[i] > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: "number"
  },
  has_num_incr_min: {
    id: "has_num_incr_min",
    match: (leftOperand, right, context) => {
      if (leftOperand != "$new") {
        throw new Error("Old value not present for " + leftOperand);
      }
      let left = getVar(leftOperand, context);
      let numbers = findNumbers(left, context.numberFormat);
      let oldText = getVar("$old", context);
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        if (numbers[i] - oldNumbers[i] > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: "number"
  },
  has_num_decr_pct_min: {
    id: "has_num_decr_pct_min",
    match: (leftOperand, right, context) => {
      if (leftOperand != "$new") {
        throw new Error("Old value not present for " + leftOperand);
      }
      let left = getVar(leftOperand, context);
      let numbers = findNumbers(left, context.numberFormat);
      let oldText = getVar("$old", context);
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        const percentChange = (oldNumbers[i] - numbers[i]) * 100 / oldNumbers[i];
        if (percentChange > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: "number"
  },
  has_num_incr_pct_min: {
    id: "has_num_incr_pct_min",
    match: (leftOperand, right, context) => {
      if (leftOperand != "$new") {
        throw new Error("Old value not present for " + leftOperand);
      }
      let left = getVar(leftOperand, context);
      let numbers = findNumbers(left, context.numberFormat);
      let oldText = getVar("$old", context);
      let oldNumbers = findNumbers(oldText, context.numberFormat);
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        const percentChange = (numbers[i] - oldNumbers[i]) * 100 / oldNumbers[i];
        if (percentChange > right) {
          return true;
        }
      }
      return false;
    },
    fieldType: "number"
  },
  length_lt: {
    id: "length_lt",
    match(leftOperand, right, context) {
      let left = getVar(leftOperand, context);
      return left.length < right;
    },
    fieldType: "number"
  },
  length_gt: {
    id: "length_gt",
    match(leftOperand, right, context) {
      let left = getVar(leftOperand, context);
      return left.length > right;
    },
    fieldType: "number"
  },
  match_regex: {
    id: "match_regex",
    match(leftOperand, right, context) {
      let left = getVar(leftOperand, context);
      return left.match(new RegExp(right.expr, right.flags));
    },
    fieldType: "regex",
    defaultValue: () => ({ expr: "", flags: "gim" })
  },
  not_match_regex: {
    id: "not_match_regex",
    match(leftOperand, right, context) {
      let left = getVar(leftOperand, context);
      return !left.match(new RegExp(right.expr, right.flags));
    },
    fieldType: "regex",
    defaultValue: () => ({ expr: "", flags: "gim" })
  }
};
const defValues = Object.values(defs);
const NUMERICS = defValues.filter((def) => def.fieldType == "number").map((def) => def.id);
function getDef(id) {
  return defs[id];
}
function matchSingleRuleV2(rule, context) {
  const [op, left, right] = rule;
  return defs[op].match(left, right, context);
}
function matchRuleConfigV1(config, inserts, dels, text2, oldText, numberFormat) {
  if (config.type == C.TYPE_RULE) {
    return matchRule_RULE(config, inserts, dels, text2, oldText, numberFormat);
  } else if (config.type == C.TYPE_RULE_GROUP) {
    return matchRule_RULE_GROUP(config, inserts, dels, text2, oldText, numberFormat);
  } else {
    DBG && console.error("unknown type of rule config: ", config);
    return false;
  }
}
const V1 = "1.0.0";
const V2 = "2.0.0";
function matchRule_RULE(config, inserts, dels, text2, oldText, numberFormat) {
  let content = text2;
  let oldContent = oldText;
  let matched = false;
  let numbers;
  let oldNumbers;
  const rule = config.rule;
  const params2 = rule.params;
  if (config.contentType == C.CONTENT_TYPE_CHANGED_TEXT) {
    content = inserts;
    oldContent = dels;
  } else if (config.contentType == C.CONTENT_TYPE_OLD_TEXT) {
    content = oldText;
  }
  switch (rule.type) {
    case C.RULE_NOT_EMPTY:
      matched = !_$1.isEmpty(content);
      break;
    case C.RULE_HAS_TEXT:
      matched = containsText(content, params2.input);
      break;
    case C.RULE_HAS_TEXT_NOT:
      matched = !containsText(content, params2.input);
      break;
    case C.RULE_HAS_NUMBER_LT:
      numbers = findNumbers(content, numberFormat);
      matched = _$1.any(numbers, function(num) {
        return num < params2.input;
      });
      break;
    case C.RULE_HAS_NUMBER_GT:
      numbers = findNumbers(content, numberFormat);
      matched = _$1.any(numbers, function(num) {
        return num > params2.input;
      });
      break;
    case C.RULE_HAS_NUMBER_DECR_MIN:
      numbers = findNumbers(content, numberFormat);
      oldNumbers = findNumbers(oldContent, numberFormat);
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        if (oldNumbers[i] - numbers[i] > params2.input) {
          matched = true;
          break;
        }
      }
      break;
    case C.RULE_HAS_NUMBER_INCR_MIN:
      numbers = findNumbers(content, numberFormat);
      oldNumbers = findNumbers(oldContent, numberFormat);
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        if (numbers[i] - oldNumbers[i] > params2.input) {
          matched = true;
          break;
        }
      }
      break;
    case C.RULE_HAS_NUMBER_DECR_PERCENT_MIN:
      numbers = findNumbers(content, numberFormat);
      oldNumbers = findNumbers(oldContent, numberFormat);
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        var percentChange = (oldNumbers[i] - numbers[i]) * 100 / oldNumbers[i];
        if (percentChange > params2.input) {
          matched = true;
          break;
        }
      }
      break;
    case C.RULE_HAS_NUMBER_INCR_PERCENT_MIN:
      numbers = findNumbers(content, numberFormat);
      oldNumbers = findNumbers(oldContent, numberFormat);
      for (var i = Math.min(numbers.length, oldNumbers.length) - 1; i >= 0; i -= 1) {
        var percentChange = (numbers[i] - oldNumbers[i]) * 100 / oldNumbers[i];
        if (percentChange > params2.input) {
          matched = true;
          break;
        }
      }
      break;
    case C.RULE_MATCH_REGEX:
      matched = content.match(new RegExp(params2.input.expr, params2.input.flags));
      break;
    default:
      return false;
  }
  return matched;
}
function matchRule_RULE_GROUP(config, inserts, dels, text2, oldText, numberFormat) {
  return !config.rules || config.rules.length === 0 || _$1[config.op == C.OP_AND ? "all" : "any"](config.rules, function(ruleConfig) {
    return matchRuleConfigV1(ruleConfig, inserts, dels, text2, oldText, numberFormat);
  });
}
function getVar(name, context) {
  return context.vars[name];
}
class Macro extends base$1.Model {
  parse(json2) {
    if (json2.steps && (!json2.version || json2.version === 1)) {
      json2.steps = toMacroFormat(json2.steps || []);
    }
    return json2;
  }
  toJSON() {
    var _a;
    let json2 = super.toJSON();
    if (json2.steps) {
      if (((_a = USER.features) == null ? void 0 : _a.macro_version) === "2") {
        json2.version = 2;
      } else {
        json2.steps = toDistillFormat(json2.steps || []);
        json2.version = 1;
      }
    }
    return json2;
  }
}
class Macros extends base$1.PagedCollection {
  constructor() {
    super(...arguments);
    __publicField(this, "model", Macro);
    __publicField(this, "url", "/macros");
    __publicField(this, "limit", 20);
  }
}
function toDistillFormat(steps) {
  return steps.map((step) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    let type = step[0].toUpperCase();
    switch (step[0]) {
      case "click":
        return {
          type,
          data: {
            selector: step[1][1],
            pos: step[2]
          },
          frame: ((_a = step[3]) == null ? void 0 : _a.frame) || 0
        };
      case "wait_doc":
        return {
          type,
          data: {},
          frame: ((_b = step[1]) == null ? void 0 : _b.frame) || 0
        };
      case "select":
        return {
          type,
          data: {
            selector: step[1][1],
            value: step[2]
          },
          frame: ((_c = step[3]) == null ? void 0 : _c.frame) || 0
        };
      case "keypress":
        return {
          type,
          data: {
            code: step[1],
            count: step[2]
          },
          page: ((_d = step[3]) == null ? void 0 : _d.page) || -1
        };
      case "mousemove":
        return {
          type,
          data: {
            selector: step[1][1],
            pos: step[2]
          },
          frame: ((_e = step[3]) == null ? void 0 : _e.frame) || 0
        };
      case "drag":
        return {
          type,
          data: {
            start: {
              selector: step[1][1],
              pos: step[2]
            },
            end: {
              selector: step[3][1],
              pos: step[4]
            }
          },
          frame: ((_f = step[5]) == null ? void 0 : _f.frame) || 0
        };
      case "focus":
        return {
          type,
          data: {
            selector: step[1][1]
          },
          frame: ((_g = step[2]) == null ? void 0 : _g.frame) || 0
        };
      case "type":
        return {
          type,
          data: {
            selector: step[1][1],
            value: step[2]
          },
          frame: ((_h = step[3]) == null ? void 0 : _h.frame) || 0
        };
      case "scroll":
        return {
          type,
          data: {
            selector: step[1][1],
            left: step[2],
            top: step[3]
          },
          frame: ((_i = step[4]) == null ? void 0 : _i.frame) || 0
        };
      case "wait_for_duration":
        return {
          type,
          data: {
            duration: step[1]
          }
        };
      case "wait_for_element":
        return {
          type,
          data: {
            selector: step[1][1]
          },
          frame: ((_j = step[2]) == null ? void 0 : _j.frame) || 0
        };
      case "open":
        return {
          type,
          data: {
            url: step[1]
          },
          page: ((_k = step[2]) == null ? void 0 : _k.page) || -1
        };
      default:
        throw new Error("Unknown step type: " + step[0]);
    }
  });
}
function toMacroFormat(steps) {
  return steps.map((step) => {
    let type = step.type.toLowerCase();
    switch (type) {
      case "click":
        return [
          type,
          ["selector", step.data.selector],
          step.data.pos,
          { frame: step.frame || 0 }
        ];
      case "wait_doc":
        return [
          type,
          { frame: step.frame || 0 }
        ];
      case "select":
        return [
          type,
          ["selector", step.data.selector],
          step.data.value,
          { frame: step.frame || 0 }
        ];
      case "keypress":
        return [
          type,
          step.data.code,
          step.data.count,
          { page: step.page || -1 }
        ];
      case "mousemove":
        return [
          type,
          ["selector", step.data.selector],
          step.data.pos,
          { frame: step.frame || 0 }
        ];
      case "drag":
        return [
          type,
          ["selector", step.data.start.selector],
          step.data.start.pos,
          ["selector", step.data.end.selector],
          step.data.end.pos,
          { frame: step.frame || 0 }
        ];
      case "focus":
        return [
          type,
          ["selector", step.data.selector],
          { frame: step.frame || 0 }
        ];
      case "type":
        return [
          type,
          ["selector", step.data.selector],
          step.data.value,
          { frame: step.frame || 0 }
        ];
      case "scroll":
        return [
          type,
          ["selector", step.data.selector],
          step.data.left,
          step.data.top,
          { frame: step.frame || 0 }
        ];
      case "wait_for_duration":
        return [
          type,
          step.data.duration
        ];
      case "wait_for_element":
        return [
          type,
          ["selector", step.data.selector],
          { frame: step.frame || 0 }
        ];
      case "open":
        return [
          type,
          step.data.url,
          { page: step.page || -1 }
        ];
      default:
        throw new Error("Unknown step type: " + step.type);
    }
  });
}
let Crawler = base$1.Model.extend({
  urlRoot: `/crawlers`,
  defaults() {
    return {
      name: "Untitled Crawler",
      url: "https://distill.io",
      state: C$1.STATE_READY,
      schedule: {
        type: "INTERVAL",
        params: {
          interval: 24 * 60 * 60
        }
      },
      config: {
        crawlSubdomains: false,
        maxPages: Math.min(App.user.get("constraint").crawl_pages, 1e4),
        includes: [],
        excludes: [],
        subtreeOnly: true
      }
    };
  },
  parseAndSet(key, value, options) {
    if (key == null)
      return this;
    let attrs;
    if (typeof key === "object") {
      attrs = key;
    } else {
      (attrs = {})[key] = value;
    }
    attrs = this.parse(attrs);
    return Crawler.__super__.set.call(this, key, attrs[key]);
  }
});
class CrawlerJob extends base$1.Model {
  constructor(attrs, options) {
    super(attrs, options);
    this.urlRoot = `/crawlers/${options.crawler_id}/jobs`;
  }
}
class Crawlers extends base$1.PagedCollection {
  constructor() {
    super(...arguments);
    __publicField(this, "model", Crawler);
    __publicField(this, "url", "/crawlers");
    __publicField(this, "limit", 20);
  }
}
class CrawlerJobs extends base$1.PagedCollection {
  constructor(attrs, options) {
    super(attrs, options);
    __publicField(this, "model", CrawlerJob);
    __publicField(this, "limit", 20);
    this.url = `/crawlers/${options.crawler_id}/jobs`;
  }
}
class JobState extends base$1.Model {
}
class JobStates extends base$1.PagedCollection {
  constructor(attrs, options) {
    super(attrs, options);
    __publicField(this, "model", JobState);
    __publicField(this, "limit", 20);
    __publicField(this, "orderBy", "ts");
    this.url = `/crawlers/data/${options.crawler_id}/jobs/${options.id}/states`;
    this._query = {
      "state.ne": C$1.STATE_READY
    };
  }
}
async function send({ path, method, data, query, headers }) {
  return await Api.api({
    url: path,
    method,
    json: query != null ? query : data,
    headers
  });
}
function get(path, query, headers) {
  return send({ method: "GET", path, query, headers });
}
function del(path, data) {
  return send({ method: "DELETE", path, data });
}
function post(path, data) {
  return send({ method: "POST", path, data });
}
function patch(path, data) {
  return send({ method: "PATCH", path, data });
}
class EventEmitter {
  constructor() {
    __publicField(this, "__ee_listeners");
    this.__ee_listeners = {};
  }
  emit(name, ...args) {
    (this.__ee_listeners[name] || []).forEach((l) => l(...args));
  }
  off(name, listener) {
    let listeners = this.__ee_listeners[name];
    if (listeners == void 0) {
      listeners = this.__ee_listeners[name] = [];
    }
    let index = listeners.indexOf(listener);
    while (index >= 0) {
      listeners.splice(index, 1);
      index = listeners.indexOf(listener);
    }
    return this;
  }
  on(name, listener) {
    let listeners = this.__ee_listeners[name];
    if (listeners == void 0) {
      listeners = this.__ee_listeners[name] = [];
    }
    listeners.push(listener);
    return this;
  }
  once(name, listener) {
    const l2 = (...args) => {
      this.off(name, l2);
      listener(...args);
    };
    this.on(name, l2);
    return this;
  }
  reset() {
    this.__ee_listeners = [];
  }
  waitForEvent(name, ...selectors) {
    return new Promise((resolve) => {
      const l2 = (...args) => {
        for (let i = 0, length = selectors.length; i < length; i += 1) {
          if (selectors[i] !== args[i]) {
            return;
          }
        }
        resolve(args[0]);
      };
      this.on(name, l2);
    });
  }
}
function verifyURL(urlObj) {
  try {
    const protocolRegex = new RegExp("(http|https):");
    const urlRegex = new RegExp(
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
      "i"
    );
    const ipv4Regex = new RegExp(
      "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
    );
    const block = "[0-9a-fA-F]{1,4}";
    const ipv6Full = `(${block}:){7}${block}`;
    const ipv6Shorthand = [
      `(${block}:){1,7}:`,
      `(${block}:){1,6}:${block}`,
      `(${block}:){1,5}(:${block}){1,2}`,
      `(${block}:){1,4}(:${block}){1,3}`,
      `(${block}:){1,3}(:${block}){1,4}`,
      `(${block}:){1,2}(:${block}){1,5}`,
      `${block}:((:${block}){1,6})`,
      `:((:${block}){1,7}|:)`,
      `fe80:(:${block}){0,4}%[0-9a-zA-Z]{1,}`,
      `::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])`,
      `(${block}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])`
    ].join("|");
    const ipv6Regex = new RegExp(`\\[(${ipv6Full}|${ipv6Shorthand})\\]$`, "i");
    const protocol = urlObj.protocol;
    const hostname = urlObj.hostname;
    if (!protocolRegex.test(protocol)) {
      throw new Error("Invalid Protocol");
    }
    if (!urlRegex.test(hostname) && !ipv4Regex.test(hostname) && !ipv6Regex.test(hostname)) {
      throw new Error("Invalid URL");
    }
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
}
function verifyRegex({ expr, flags }) {
  try {
    let x = new RegExp(expr, flags);
    return null;
  } catch (err) {
    return "Invalid Regular Expression";
  }
}
function verifyInt(value) {
  if (value === null) {
    return "Invalid Number";
  }
  const num = Number(value);
  if (!Number.isInteger(num)) {
    return "Invalid Number";
  }
  return null;
}
function verifyFloat(value) {
  if (value === null) {
    return "Invalid Number";
  }
  const num = Number(value);
  if (isNaN(num)) {
    return "Invalid Number";
  }
  return null;
}
function verifyBool(value) {
  if (typeof value !== "boolean") {
    return "Invalid boolean";
  }
}
function verifyEnum(value, def) {
  const optionsList = def.options.map((obj) => obj.id);
  let isSubset = false;
  if (def.multi) {
    isSubset = value.every((val) => optionsList.includes(val));
    if (isSubset)
      return;
  } else {
    isSubset = optionsList.includes(value);
    if (isSubset)
      return;
  }
  return "Invalid selection";
}
function identity(value) {
  return value;
}
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return value === void 0;
}
class base {
}
__publicField(base, "default");
__publicField(base, "validators", []);
__publicField(base, "toJSON", identity);
__publicField(base, "parse", identity);
__publicField(base, "format", identity);
__publicField(base, "deformat", identity);
__publicField(base, "isEmpty", isUndefined);
class bool extends base {
}
__publicField(bool, "default", false);
__publicField(bool, "validators", [verifyBool]);
class text extends base {
  static isEmpty(val) {
    return !val || val.trim().length == 0;
  }
  static format(val) {
    return val != null ? val : "";
  }
}
const _url = class extends base {
  static toJSON(value) {
    if (!value) {
      return "";
    }
    return value.toString();
  }
  static parse(value) {
    if (!value) {
      return null;
    }
    return new URL(value);
  }
};
let url = _url;
__publicField(url, "default", null);
__publicField(url, "validators", [verifyURL]);
__publicField(url, "format", _url.toJSON);
__publicField(url, "deformat", _url.parse);
__publicField(url, "isEmpty", isNull);
class json extends base {
  static format(jsonObj, options = {}) {
    const { spaces = 2, showEmpty = true } = options;
    if (!showEmpty && !jsonObj) {
      return "";
    }
    return JSON.stringify(jsonObj, null, spaces);
  }
  static deformat(formattedValue) {
    if (formattedValue === "") {
      return null;
    }
    return JSON.parse(formattedValue);
  }
}
__publicField(json, "toJSON", identity);
__publicField(json, "parse", identity);
__publicField(json, "isEmpty", isNull);
class jsonStr extends json {
  static toJSON(value) {
    return JSON.stringify(value);
  }
  static parse(value) {
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }
}
class regex extends base {
}
__publicField(regex, "validators", [verifyRegex]);
__publicField(regex, "toJSON", identity);
__publicField(regex, "parse", identity);
class int extends base {
  static toJSON(value) {
    return parseInt(value);
  }
}
__publicField(int, "default", 0);
__publicField(int, "validators", [verifyInt]);
class float extends base {
  static toJSON(value) {
    return parseFloat(value);
  }
}
__publicField(float, "default", 0);
__publicField(float, "validators", [verifyFloat]);
class eNum extends base {
}
__publicField(eNum, "validators", [verifyEnum]);
function verifyEmail(value) {
  if (!value.trim().length) {
    return "Email cannot be empty";
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    return "Invalid email";
  }
}
class email extends base {
}
__publicField(email, "default", new String());
__publicField(email, "validators", [verifyEmail]);
const TYPES = {
  base,
  bool,
  email,
  enum: eNum,
  int,
  float,
  json,
  jsonStr,
  regex,
  text,
  url
};
function register(name, type) {
  if (TYPES[name]) {
    throw new Error(`type "${name}" already exists`);
  }
  TYPES[name] = type;
}
function createObservableProxy(target, onModified) {
  const handler = {
    set(obj, prop, value) {
      if (obj[prop] !== value) {
        if (isObject(value)) {
          value = createObservableProxy(value, onModified);
        }
        obj[prop] = value;
        onModified();
      }
      return true;
    },
    apply(target2, thisArg, argumentsList) {
      onModified();
      return Reflect.apply(target2, thisArg, argumentsList);
    }
  };
  const isArray = Array.isArray(target);
  if (isArray) {
    for (let i = 0; i < target.length; i++) {
      if (isObject(target[i])) {
        target[i] = createObservableProxy(target[i], onModified);
      }
    }
  } else {
    for (let key in target) {
      if (isObject(target[key])) {
        target[key] = createObservableProxy(target[key], onModified);
      }
    }
  }
  return new Proxy(target, handler);
}
function isObject(value) {
  return typeof value === "object" && value !== null;
}
class SvelteStore extends EventEmitter {
  constructor() {
    super();
    this._listeners = [];
  }
  _notify() {
    for (let listener of this._listeners) {
      listener(this.getStoreValue());
    }
  }
  subscribe(listener) {
    this._listeners.push(listener);
    listener(this.getStoreValue());
    return () => {
      this._listeners.splice(this._listeners.indexOf(listener), 1);
    };
  }
  getStoreValue() {
    throw new Error("Not implemented!");
  }
  clone() {
    throw new Error("Not implemented!");
  }
}
class SyncableStore extends SvelteStore {
  constructor() {
    super();
    this.syncState = writable(false);
    this.syncError = writable(null);
  }
  getURLRoot() {
    throw new Error("Not implemented");
  }
  async fetch() {
    throw new Error("Not implemented");
  }
}
class BaseModel extends SyncableStore {
  isNew() {
    return !this.id;
  }
  getURL() {
    return this.getURLRoot() + "/" + this.id;
  }
  async fetch() {
    this.syncState.set(true);
    try {
      let res = await get(this.getURL());
      let parsed = this.parse(res);
      this.reset(parsed);
    } catch (e) {
      this.syncError.set(e);
      throw e;
    } finally {
      this.syncState.set(false);
    }
  }
  reset(parsed) {
    throw new Error("Reset not implemented");
  }
  parse(res) {
    return res;
  }
  toJSON() {
    throw new Error("toJSON not implemented");
  }
  async save(attrs = {}) {
    this.syncState.set(true);
    this.syncError.set(null);
    try {
      let res;
      if (this.isNew()) {
        res = await post(this.getURLRoot(), this.toJSON());
        this.id = res["id"];
      } else {
        res = await patch(this.getURL(), { ...this.toJSON(true), ...attrs });
      }
      this.set({ ...attrs, ...res });
      return res;
    } catch (e) {
      this.syncError.set(e);
      throw e;
    } finally {
      this.syncState.set(false);
    }
  }
  async delete() {
    this.syncState.set(true);
    this.syncError.set(null);
    try {
      await del(this.getURL());
      this.emit("destroy", this);
    } catch (e) {
      this.syncError.set(e);
      throw e;
    } finally {
      this.syncState.set(false);
    }
  }
}
class StoreList extends SvelteStore {
  constructor(stores = []) {
    super();
    __publicField(this, "add", (store) => {
      this.stores.push(store);
      let unsubscribe = store.subscribe(() => {
        this._notify();
      });
      this.unsubscribes.set(store, unsubscribe);
    });
    __publicField(this, "remove", (store) => {
      let index = this.stores.indexOf(store);
      if (index < 0) {
        throw Error("store not added - cant remove");
      }
      let unsubscribe = this.unsubscribes.get(store);
      unsubscribe();
      this.unsubscribes.delete(store);
      this.stores.splice(index, 1);
      this._notify();
    });
    this.stores = [];
    this.unsubscribes = /* @__PURE__ */ new Map();
    stores.forEach(this.add);
  }
  getStoreValue() {
    return this.stores.map(get_store_value);
  }
}
class ReducedStoreList extends StoreList {
  constructor() {
    super();
    this.dirty = false;
  }
  set(dirty) {
    this.dirty = dirty;
    this._notify();
  }
  getStoreValue() {
    return this.stores.filter(get_store_value)[0] || this.dirty;
  }
}
class FieldList extends SvelteStore {
  constructor(def, fields) {
    super();
    __publicField(this, "add", (value = this.getDefaultValue()) => {
      let field = createFieldStore(this.getDef(value), value);
      this.fields.push(field);
      this.dirty.add(field.dirty);
      this.error.add(field.error);
      this.touched.add(field.touched);
      this.showError.add(field.showError);
      if (this._ready) {
        this._notify();
        this.dirty.set(true);
      }
    });
    __publicField(this, "remove", (i) => {
      let deletedList = this.fields.splice(i, 1);
      if (deletedList.length !== 1) {
        throw new Error("item not found");
      }
      let field = deletedList[0];
      this.dirty.remove(field.dirty);
      this.error.remove(field.error);
      this.touched.remove(field.touched);
      this.showError.remove(field.showError);
      if (this._ready) {
        this._notify();
        this.dirty.set(true);
      }
      return deletedList[0];
    });
    this.def = def;
    this.fields = [];
    this.dirty = new ReducedStoreList();
    this.error = new ReducedStoreList();
    this.touched = new ReducedStoreList();
    this.showError = new ReducedStoreList();
    fields.map(this.add);
    this._ready = true;
  }
  getDef(value) {
    return this.def;
  }
  getDefaultValue() {
    throw new Error("Not implemented");
  }
  getStoreValue() {
    return this.fields;
  }
  set(fields) {
    [...this.fields].forEach(this.remove);
    fields.forEach(this.add);
  }
  toJSON() {
    return this.fields.map(get_store_value);
  }
}
function mapDefTree(defTree, valTree, map, acc, root = acc) {
  Object.keys(defTree).forEach((key) => {
    const defOrObj = defTree[key];
    const val = valTree[key];
    if (typeof defOrObj !== "object") {
      throw new Error("def not found");
    }
    let fieldFound = typeof defOrObj.type == "string";
    if (fieldFound) {
      acc[key] = map(key, defOrObj, val, acc, root);
    } else {
      acc[key] = mapDefTree(defOrObj, val, map, {}, root);
    }
  });
  return acc;
}
function visitObject(object, altTree, visitor, isLeafNode) {
  Object.entries(object).forEach(([key, value]) => {
    const altValue = altTree == null ? void 0 : altTree[key];
    if (isLeafNode(value)) {
      visitor(key, value, altValue, object);
    } else if (value instanceof Object) {
      visitObject(value, altValue, visitor, isLeafNode);
    }
  });
}
function mapObject(object, map, isLeafNode, acc = {}) {
  Object.entries(object).forEach(([key, value]) => {
    if (isLeafNode(value)) {
      acc[key] = map(value, key, object, acc);
    } else if (value instanceof Object) {
      acc[key] = mapObject(value, map, isLeafNode, {});
    }
  });
  return acc;
}
class FormModel extends BaseModel {
  constructor(defs2, attrs = {}) {
    super();
    this.id = attrs.id;
    this.initFields(defs2, attrs);
    this._iid = `${this.constructor.name}-${ID()}`;
  }
  initFields(defs2, attrs) {
    if (!defs2)
      throw new Error("fields defs is mandatory");
    this.defs = defs2;
    const valueStores = [];
    const dirtys = [];
    const errors = [];
    const touchedStores = [];
    this.fields = mapDefTree(defs2, attrs, (key, def, val, acc, root) => {
      const store = this.createField(key, def, val, root);
      valueStores.push(store);
      dirtys.push(store.dirty);
      errors.push(store.error);
      touchedStores.push(store.touched);
      return store;
    }, {});
    const formError = derived(valueStores, (values) => this.validate(values));
    errors.push(formError);
    this.dirty = derived(dirtys, filterTruthyValues);
    this.error = derived(errors, filterTruthyValues);
    this.touched = derived(touchedStores, filterTruthyValues);
    this.showError = derived(
      [this.error, this.touched],
      ([$error, $touched]) => !!($error && $touched)
    );
    function filterTruthyValues(list) {
      return list.find(identity);
    }
  }
  createField(key, def, val, fields) {
    if (def.type === "unknown") {
      let type = this.getTypeForUnknown(key, val, fields);
      if (!type) {
        throw new Error(`Unknown type for ${key} - ${type}`);
      }
      def = { type };
    }
    return createFieldStore(def, val);
  }
  getTypeForUnknown(fieldName, val, fields) {
    throw new Error("Not implemented");
  }
  getStoreValue() {
    return this.toJSON();
  }
  getURL() {
    return this.getURLRoot() + "/" + this.id;
  }
  getURLRoot() {
    throw new Error("Not implemented");
  }
  set(res) {
    this.visitFields((key, field, altValue) => {
      if (altValue !== void 0) {
        field.reset(altValue);
      }
    }, res);
  }
  reset(parsed) {
    this.visitFields((key, field, altValue) => field.reset(altValue), parsed);
  }
  setTouched(touched = true) {
    this.visitFields((key, field) => field.setTouched(touched));
  }
  async save() {
    let error = get_store_value(this.error);
    if (error) {
      throw error;
    } else {
      return super.save();
    }
  }
  async submit(e) {
    e.preventDefault();
    return this.save();
  }
  replaceField(field, value) {
    this.visitFields((key, f, alt, parent) => {
      if (f === field) {
        parent[key] = this.createField(key, { type: "unknown" }, value, this.fields);
      }
    });
  }
  visitFields(visitor, altTree = {}) {
    visitObject(this.fields, altTree, visitor, (field) => field == null ? void 0 : field.subscribe);
  }
  validate(values) {
  }
  toJSON(dirty = false) {
    return mapObject(this.fields, (field) => {
      if (!dirty || get_store_value(field.dirty)) {
        return field.toJSON();
      }
    }, (field) => field == null ? void 0 : field.subscribe);
  }
}
function createFieldStore(def, dbValue) {
  var _a;
  let subscribers = /* @__PURE__ */ new Set();
  const typeDef = TYPES[def.type];
  if (dbValue === void 0) {
    dbValue = def && typeof def.default === "function" ? def.default() : (def == null ? void 0 : def.default) || (typeDef == null ? void 0 : typeDef.default);
  }
  let parsedValue = typeDef.parse(dbValue);
  if (parsedValue == null ? void 0 : parsedValue.subscribe) {
    return parsedValue;
  }
  const isPOJO = (parsedValue == null ? void 0 : parsedValue.constructor) === Object;
  if (isPOJO) {
    parsedValue = createObservableProxy(parsedValue, onNestedPropertyModified);
  }
  const value = writable(parsedValue);
  const { subscribe: subscribe2, set: set_internal } = value;
  const error = writable(null);
  const dirty = writable(false);
  const touched = writable(false);
  const showError = derived([error, touched], ([$error, $touched]) => !!($error && $touched));
  const isEmpty = (_a = def.isEmpty) != null ? _a : typeDef.isEmpty;
  function onNestedPropertyModified() {
    dirty.set(true);
    validate(get_store_value(value));
  }
  function validate(val) {
    let err = null;
    if (isEmpty(val)) {
      if (def.required) {
        err = {
          message: "This field is required"
        };
      }
    } else {
      const validators = def.validators || [];
      for (const validator of [...typeDef.validators, ...validators]) {
        const message = validator(val, def);
        if (message) {
          err = {
            message
          };
          break;
        }
      }
    }
    error.set(err);
    if (err) {
      let $value = get_store_value(value);
      subscribers.forEach((fn) => fn($value));
    }
    return err;
  }
  function reset($value) {
    value.set($value);
    dirty.set(false);
    error.set(null);
    touched.set(false);
  }
  function clone() {
    return createFieldStore(def, typeDef.toJSON(get_store_value(value)));
  }
  function set($value, options = {}) {
    const { parse: parse2 = false } = options;
    if (parse2) {
      $value = typeDef.parse($value);
    }
    dirty.set($value !== parsedValue);
    if (isPOJO) {
      $value = createObservableProxy(JSON.parse(JSON.stringify($value)), onNestedPropertyModified);
    }
    if (validate($value)) {
      return;
    }
    set_internal($value);
  }
  return {
    get() {
      return get_store_value(value);
    },
    subscribe: (fn) => {
      subscribers.add(fn);
      let unsubscribe = subscribe2(fn);
      return () => {
        subscribers.delete(fn);
        unsubscribe();
      };
    },
    set,
    update(fn) {
      let newValue = fn(get_store_value(value));
      set(newValue);
    },
    reset,
    def,
    typeDef,
    dirty,
    error,
    showError,
    touched,
    setTouched(val = true) {
      const wasTouched = get_store_value(touched);
      if (wasTouched !== val) {
        touched.set(val);
        if (!wasTouched) {
          validate(get_store_value(value));
        }
      }
    },
    validate,
    clone,
    toJSON() {
      return typeDef.toJSON(get_store_value(value));
    }
  };
}
const TEXTRULES = [C$1.RULE_HAS_TEXT, C$1.RULE_HAS_TEXT_NOT, C$1.RULE_MATCH_REGEX, C$1.RULE_NOT_EMPTY];
const RuleToTypeMap = Object.freeze({
  [C$1.RULE_NOT_EMPTY]: "json",
  [C$1.RULE_HAS_TEXT]: "text",
  [C$1.RULE_HAS_TEXT_NOT]: "text",
  [C$1.RULE_HAS_NUMBER_GT]: "float",
  [C$1.RULE_HAS_NUMBER_LT]: "float",
  [C$1.RULE_HAS_NUMBER_INCR_MIN]: "float",
  [C$1.RULE_HAS_NUMBER_INCR_PERCENT_MIN]: "float",
  [C$1.RULE_HAS_NUMBER_DECR_MIN]: "float",
  [C$1.RULE_HAS_NUMBER_DECR_PERCENT_MIN]: "float",
  [C$1.RULE_MATCH_REGEX]: "regex"
});
class RuleList extends FieldList {
  constructor(values) {
    super({ type: "singleRuleType" }, values);
  }
  getDef(value) {
    if (value.type === C$1.TYPE_RULE_GROUP) {
      return {
        type: "compoundRuleType"
      };
    }
    return {
      type: "singleRuleType"
    };
  }
  defaultRule() {
    return {
      type: C$1.TYPE_RULE,
      contentType: C$1.CONTENT_TYPE_CHANGED_TEXT,
      rule: {
        type: C$1.RULE_HAS_TEXT,
        params: {
          input: ""
        }
      }
    };
  }
  getDefaultValue(isGroup = false) {
    return isGroup ? {
      type: C$1.TYPE_RULE_GROUP,
      op: C$1.OP_AND,
      rules: [this.defaultRule()]
    } : this.defaultRule();
  }
}
class RuleListType extends TYPES.base {
  static toJSON(config) {
    return config.toJSON();
  }
  static parse(json2) {
    return new RuleList(json2);
  }
}
__publicField(RuleListType, "default", []);
const _Rule = class extends FormModel {
  getTypeForUnknown(fieldName, val, fields) {
    return RuleToTypeMap[fields.type.get()];
  }
  constructor(json2) {
    super(_Rule.defs, json2);
  }
};
let Rule = _Rule;
__publicField(Rule, "defs", Object.freeze({
  type: {
    type: "int"
  },
  params: {
    input: {
      type: "unknown"
    }
  }
}));
class RuleType extends TYPES.base {
  static toJSON(rule) {
    return rule.toJSON();
  }
  static parse(json2) {
    return new Rule(json2);
  }
}
class CompoundRuleType extends TYPES.base {
  static toJSON(config) {
    return config.toJSON();
  }
  static parse(json2) {
    return new CompoundRule(json2);
  }
}
class SingleRuleType extends TYPES.base {
  static toJSON(config) {
    return config.toJSON();
  }
  static parse(json2) {
    return new SingleRule$1(json2);
  }
}
register("singleRuleType", SingleRuleType);
register("compoundRuleType", CompoundRuleType);
register("ruleType", RuleType);
register("list:rule", RuleListType);
const _SingleRule$1 = class extends FormModel {
  constructor(json2) {
    super(_SingleRule$1.fields, json2);
  }
  evaluate(context, numberFormat) {
    var _a;
    const ruleConfig = this.toJSON();
    const ruleType = ruleConfig.rule.type;
    let result = matchRuleConfigV1(
      ruleConfig,
      context.inserts,
      context.dels,
      context.sieve_data.text,
      ((_a = context.old_sieve_data) == null ? void 0 : _a.text) || "",
      numberFormat
    );
    if (ruleType === 8) {
      result = result = Array.isArray(result) || false;
    }
    this.fields.result.set(result);
    return result;
  }
  isNumeric() {
    return !TEXTRULES.includes(this.fields.rule.toJSON().type);
  }
};
let SingleRule$1 = _SingleRule$1;
__publicField(SingleRule$1, "fields", Object.freeze({
  type: {
    type: "int"
  },
  contentType: {
    type: "int"
  },
  rule: {
    type: "ruleType"
  },
  result: {
    type: "base"
  }
}));
const _CompoundRule = class extends FormModel {
  constructor(json2, fields = _CompoundRule.fields) {
    super(fields, json2);
  }
  evaluate(context, numberFormat) {
    const rules = this.fields.rules.fields;
    if (rules.length === 0) {
      return true;
    }
    const OP = this.fields.op.get();
    const results = rules.map((rule) => rule.evaluate(context, numberFormat));
    const result = OP === C$1.OP_AND ? results.every((result2) => result2) : results.some((result2) => result2);
    this.fields.result.set(result);
    return result;
  }
  hasNumeric() {
    return this.fields.rules.fields.some((rule) => {
      if (rule.toJSON().type === C$1.TYPE_RULE) {
        return rule.isNumeric();
      } else {
        return rule.hasNumeric();
      }
    });
  }
};
let CompoundRule = _CompoundRule;
__publicField(CompoundRule, "fields", Object.freeze({
  type: {
    type: "int"
  },
  op: {
    type: "int"
  },
  rules: {
    type: "list:rule"
  },
  result: {
    type: "base"
  }
}));
const _RuleConfig = class extends CompoundRule {
  constructor(json2 = _RuleConfig.default) {
    super(json2, _RuleConfig.fields);
  }
  getURLRoot() {
    return "/rules";
  }
};
let RuleConfig = _RuleConfig;
__publicField(RuleConfig, "fields", Object.freeze({
  ...CompoundRule.fields,
  numberFormat: {
    type: "text"
  }
}));
__publicField(RuleConfig, "default", {
  type: C$1.TYPE_RULE_GROUP,
  op: C$1.OP_AND,
  rules: [],
  numberFormat: "1,."
});
class Base {
  constructor(op, ...operands) {
    this.expr = [op, ...operands];
    this.result = void 0;
  }
  toJSON() {
    const [op, ...operands] = this.expr;
    return [op, ...operands.map((operand) => operand instanceof Base ? operand.toJSON() : operand)];
  }
}
class Or extends Base {
  constructor(...operands) {
    super("or", ...operands);
  }
  evaluate(vars, numberFormat) {
    const rules = this.expr.slice(1);
    const results = rules.map((rule) => rule.evaluate(vars, numberFormat));
    this.result = results.some((result) => result);
    return this.result;
  }
}
class And extends Base {
  constructor(...operands) {
    super("and", ...operands);
  }
  evaluate(vars, numberFormat) {
    const rules = this.expr.slice(1);
    const results = rules.map((rule) => rule.evaluate(vars, numberFormat));
    this.result = results.every((result) => result);
    return this.result;
  }
}
class SingleRule extends Base {
  constructor(op, leftOperand, rightOperand) {
    super(op, leftOperand, rightOperand);
  }
  evaluate(vars, numberFormat) {
    this.result = matchSingleRuleV2(this.expr, { numberFormat, vars });
    const conditionExpr = this.expr[0];
    if (conditionExpr === "match_regex" || conditionExpr === "not_match_regex") {
      this.result = Array.isArray(this.result) || false;
    }
    return this.result;
  }
}
const _RuleConfigV2 = class {
  constructor(config) {
    const { rules, numberFormat } = config != null ? config : _RuleConfigV2.default;
    this.numberFormat = numberFormat;
    this.rule = null;
    this.parseRules(rules);
  }
  parseRules(rules) {
    const [op, ...operands] = rules;
    if (op === "and" || op === "or") {
      const nestedRules = operands.map((nestedRule) => this.parseRules(nestedRule));
      this.rule = new (op === "and" ? And : Or)(...nestedRules);
    } else {
      const [leftOperand, rightOperand] = operands;
      this.rule = new SingleRule(op, leftOperand, rightOperand);
    }
    return this.rule;
  }
  toJSON() {
    return {
      rules: this.rule.toJSON(),
      numberFormat: this.numberFormat
    };
  }
  evaluate(vars, numberFormat) {
    return this.rule.evaluate(vars, numberFormat);
  }
};
let RuleConfigV2 = _RuleConfigV2;
__publicField(RuleConfigV2, "default", {
  rules: ["or"],
  numberFormat: C$1.NUM_FORMAT_COMMA_DOT
});
function hasNumeric(rules) {
  const orEdRules = rules.toJSON().slice(1);
  const containsNumeric = orEdRules.find(
    (andEdRules) => andEdRules.find(
      ([op]) => NUMERICS.includes(op)
    )
  );
  return !!containsNumeric;
}
const Backbone = window.Backbone;
if (!Backbone) {
  throw new Error("ADD Backbone");
}
const moment = window.moment;
if (!moment) {
  throw new Error("ADD moment");
}
const { Model, Collection } = base$1;
var Schedule = Backbone.Model.extend({
  defaults: function() {
    return {
      type: "INTERVAL",
      params: new Model({
        interval: 10800
      })
    };
  },
  getFrequencyClass: function() {
    let { params: params2, type } = this.attributes;
    params2 || (params2 = this.defaults());
    const interval = params2.attributes.interval;
    let cls = "";
    if (interval) {
      if (interval < 60) {
        cls = "xfreq-xh";
      } else if (interval < 600) {
        cls = "xfreq-hi";
      } else {
        cls = "xfreq";
      }
    } else if (type == "LIVE") {
      cls = "xfreq-hi";
    }
    return cls;
  },
  parse: function(response) {
    response.params = new Backbone.Model({ ...response.params }, { parse: true });
    return response;
  },
  toJSON: function() {
    const json2 = Schedule.__super__.toJSON.call(this);
    json2.params = json2.params.toJSON();
    return json2;
  }
});
const LocatorDescList = [
  {
    type: "css",
    label: "l_css_selector",
    params: [{
      label: "l_css_selector",
      help: "h_css_selelctor",
      must: true,
      name: "expr",
      type: "css"
    }]
  },
  {
    type: "js",
    label: "l_js",
    params: [{
      label: "l_js",
      help: "h_js",
      must: true,
      name: "expr",
      type: "js"
    }]
  },
  {
    type: "xpath",
    label: "l_xpath",
    params: [{
      label: "l_xpath",
      help: "h_xpath",
      must: true,
      name: "expr",
      type: "xpath"
    }]
  }
];
const Locator = Model.extend({
  defaults: {
    type: "xpath"
  },
  toJSON: function() {
    const json2 = Locator.__super__.toJSON.call(this);
    delete json2.id;
    if (json2.allFields) {
      delete json2.allFields;
    }
    return json2;
  }
});
const Locators = Collection.extend({
  model: Locator,
  initialize: function(attrs, options) {
    Locators.__super__.initialize.call(this, attrs, options);
    this.frame = options.frame;
  },
  parse: function(response) {
    return response;
  }
});
var Frame = Model.extend({
  parse: function(response) {
    response.excludes = new Locators(response.excludes, {
      parse: true,
      frame: this
    });
    response.includes = new Locators(response.includes, {
      parse: true,
      frame: this
    });
    return response;
  },
  toJSON: function() {
    const json2 = Frame.__super__.toJSON.call(this);
    json2.excludes = json2.excludes.toJSON();
    json2.includes = json2.includes.toJSON();
    if (json2.index === 0) {
      delete json2.title;
      delete json2.uri;
    }
    return json2;
  }
});
const Frames = Collection.extend({
  model: Frame,
  parse: function(response) {
    return response;
  }
});
var Page = Model.extend({
  defaults: {
    dynamic: true,
    delay: 2
  },
  addLocator: function(frameConfig, op, attrs) {
    const frames = this.get("frames");
    let frame = frames.findWhere({ index: frameConfig.index });
    const locator = new Locator(attrs);
    if (!frame) {
      frame = new Frame(frameConfig, { parse: true });
      frames.add(frame);
    }
    if (op == "EXCLUDE") {
      frame.get("excludes").add(locator);
    } else {
      frame.get("includes").add(locator);
    }
    return locator;
  },
  createDefaultSelection: function() {
    this.addLocator({ index: 0 }, "INCLUDE", { type: "css", expr: "body" });
  },
  getLocator: function(frameIndex, id) {
    const frames = this.get("frames");
    const frame = frames.findWhere({ index: frameIndex });
    return frame.get("excludes").get(id) || frame.get("includes").get(id);
  },
  isEmpty: function() {
    const frame = this.get("frames").at(0);
    return !frame || frame.get("includes").length === 0;
  },
  parse: function(response) {
    response.frames = new Frames(response.frames, { parse: true });
    return response;
  },
  removeLocator: function(frameIndex, id) {
    const frames = this.get("frames");
    const frame = frames.findWhere({ index: frameIndex });
    const excludes = frame.get("excludes");
    const includes = frame.get("includes");
    let model;
    if (model = excludes.get(id)) {
      excludes.remove(model);
    } else if (model = includes.get(id)) {
      includes.remove(model);
    } else {
      throw new Error("Frame does not contain selection with id: " + id);
    }
  },
  reset() {
    const frames = this.get("frames");
    frames.reset();
  },
  toJSON: function() {
    const json2 = Page.__super__.toJSON.call(this);
    json2.frames = json2.frames.toJSON();
    delete json2.title;
    delete json2.uri;
    return json2;
  }
});
const Pages = Collection.extend({
  model: Page,
  parse: function(res) {
    return res;
  }
});
const SieveConfig = Model.extend({
  isEmpty: function() {
    return false;
  },
  applyDefaults() {
    return;
  }
});
const SieveConfigRequest = SieveConfig.extend({
  defaults() {
    return {
      request: {
        method: "GET",
        headers: [],
        body: {
          type: "none"
        }
      }
    };
  }
});
const SieveConfigFeed = SieveConfigRequest.extend();
const SieveConfigPDF = SieveConfigRequest.extend();
const SieveConfigNA = SieveConfig.extend();
const SieveConfigXML = SieveConfigRequest.extend({
  defaults() {
    return {
      ...SieveConfigXML.__super__.defaults(),
      selection: {
        excludes: [],
        includes: [{
          type: "xpath",
          expr: "/*"
        }]
      },
      ignoreEmptyText: true,
      dataAttr: "text"
    };
  }
});
const SieveConfigJSON = SieveConfigRequest.extend({
  constructor: function(attrs, options) {
    this.datasource_id = options.datasource_id;
    SieveConfigJSON.__super__.constructor.call(this, attrs, options);
  },
  isEmpty() {
    const filters = this.get("filters");
    return !(filters == null ? void 0 : filters.included) || filters.included.length === 0;
  },
  defaults() {
    let attrs = {
      filters: {
        inculded: []
      }
    };
    switch (this.datasource_id) {
      case null:
      case void 0:
      case C$1.DS_ID_JSON:
      case C$1.DS_ID_UPTIME:
        attrs = { ...SieveConfigJSON.__super__.defaults(), ...attrs };
        break;
    }
    return attrs;
  },
  applyDefaults() {
    this.set({
      ...this.defaults(),
      filters: {
        included: ["."]
      }
    });
  }
});
const SieveConfigDOC = SieveConfigRequest.extend({
  defaults() {
    return { ...SieveConfigDOC.__super__.defaults(), ignoreEmptyText: true, dataAttr: "text" };
  }
});
var SieveConfigHTML = Model.extend({
  __structure__: {
    includeStyle: false,
    includeScript: false,
    selections: [{
      title: "Distill",
      uri: "https://distill.io",
      frames: [{
        index: 0,
        excludes: [{
          type: "xpath",
          expr: ""
        }],
        includes: [{}]
      }]
    }]
  },
  defaults: {
    ignoreEmptyText: true,
    includeStyle: false,
    dataAttr: "text"
  },
  applyDefaults() {
    this.set({
      ...this.defaults,
      selections: new Page([
        {
          frames: [
            {
              index: 0,
              excludes: [],
              includes: [
                {
                  expr: "body",
                  type: "css"
                }
              ]
            }
          ],
          dynamic: true,
          delay: 2
        }
      ], { parse: true })
    });
  },
  createDefaultPage: function() {
    const page = new Page(
      {
        frames: [{ index: 0 }],
        dynamic: true
      },
      { parse: true }
    );
    page.createDefaultSelection();
    this.set("selections", new Pages([page]));
  },
  getExcludes: function() {
    const selections = this.get("selections").toJSON();
    return _.chain(selections).pluck("frames").flatten().pluck("excludes").flatten().value();
  },
  getIncludes: function() {
    const selections = this.get("selections").toJSON();
    return _.chain(selections).pluck("frames").flatten().pluck("includes").flatten().value();
  },
  getPage: function() {
    const selections = this.get("selections");
    return selections && selections.at(0);
  },
  isEmpty: function() {
    return this.getIncludes().length == 0;
  },
  parse: function(response) {
    response.selections = new Pages(response.selections, { parse: true });
    if (_.isString(response.regexp)) {
      response.regexp = { expr: response.regexp, flags: "gim" };
    }
    return response;
  },
  toJSON: function() {
    const json2 = SieveConfigHTML.__super__.toJSON.call(this);
    json2.selections = json2.selections.toJSON();
    return json2;
  }
});
function clientAny() {
  return true;
}
function clientNone() {
  return false;
}
function clientWeb({ id }) {
  return id == C$1.CLIENT_ID_WEB;
}
var Sieve = Model.extend({
  ANON_ACCESSIBLE_TYPES: [
    C$1.TYPE_HTML,
    C$1.TYPE_FEED
  ],
  TYPES: [{
    type: C$1.TYPE_HTML,
    name: "Webpage",
    client: clientAny
  }, {
    type: C$1.TYPE_FEED,
    name: "Feed",
    client: clientAny
  }, {
    type: C$1.TYPE_XML,
    name: "XML",
    client: clientAny
  }, {
    type: C$1.TYPE_PDF_HTML,
    name: "PDF",
    client: clientWeb
  }, {
    type: C$1.TYPE_DOC,
    name: "Word Document",
    client: clientWeb
  }, {
    type: C$1.TYPE_JSON,
    name: "JSON",
    client: clientAny
  }, {
    type: C$1.TYPE_SITEMAP,
    name: "Sitemap",
    client: clientWeb
  }],
  encodedFields: ["config", "schedule", "err"],
  urlRoot: "/sieves",
  save(...args) {
    const config = this.get("config");
    if (config == null ? void 0 : config.isEmpty()) {
      config.applyDefaults();
    }
    return Sieve.__super__.save.call(this, ...args);
  },
  defaults: function() {
    return {
      schedule: new Schedule({
        type: this.content_type === C$1.TYPE_SITEMAP ? "AUTO" : "INTERVAL"
      }),
      meta: {
        diffContentMode: C$1.DIFF_MODE_VISUAL
      }
    };
  },
  parseAndSet(key, value, options) {
    if (key == null)
      return this;
    let attrs;
    if (typeof key === "object") {
      attrs = key;
      options = value;
    } else {
      (attrs = {})[key] = value;
    }
    attrs = this.parse(attrs);
    return Sieve.__super__.set.call(this, attrs, options);
  },
  getExcludes: function() {
    const config = this.get("config");
    return config && config.getExcludes() || [];
  },
  getIncludes: function() {
    const config = this.get("config");
    return config && config.getIncludes() || [];
  },
  getPage: function() {
    const config = this.get("config");
    return config && config.getPage();
  },
  getTags: function(fromTags) {
    let tag;
    const tags = [];
    const tagIds = (this.get("tags") || "").split(",");
    _.each(tagIds, function(id) {
      tag = fromTags && fromTags.get(id);
      tag && tags.push(tag);
    });
    return tags;
  },
  isDeviceWeb() {
    return this.get("client_id") == C$1.CLIENT_ID_WEB;
  },
  isDynamic: function() {
    const config = this.get("config");
    if (config) {
      const selections = config.get("selections");
      if (selections && selections.length > 0) {
        const page = selections.at(0);
        return page.attributes.dynamic === true;
      }
    }
    return false;
  },
  isEmpty: function() {
    const config = this.get("config");
    return !config || config.isEmpty();
  },
  isRead: function() {
    return moment(this.get("ts_view")) >= moment(this.get("ts_data") || 0);
  },
  markRead: function(read = true) {
    if (read === this.isRead()) {
      return;
    }
    const ts_view = read ? moment().format() : moment(0).format();
    const tags = this.getTags(App.labels);
    const tagIds = tags.map((tag) => tag.id);
    return this.save({
      tags: tagIds.join(","),
      ts_view
    }, {
      patch: true
    });
  },
  async loadCrawler() {
    let { crawler_id, crawler } = this.attributes;
    if (crawler) {
      return;
    }
    if (crawler_id) {
      crawler = new Crawler({ id: crawler_id });
      await crawler.fetch();
    } else {
      crawler = new Crawler();
    }
    this.set("crawler", crawler);
  },
  moveToTrash() {
    this.save({ state: C$1.STATE_DISCARD }, { patch: true });
  },
  parse: function({ schedule, ...response }) {
    response = Sieve.__super__.parse.call(this, response);
    const content_type = response.content_type || this.attributes.content_type;
    let config = response.config;
    if (config) {
      if (content_type == C$1.TYPE_FEED) {
        response.config = new SieveConfigFeed(config);
      } else if (content_type == C$1.TYPE_HTML) {
        response.config = new SieveConfigHTML(config, { parse: true });
      } else if (content_type == C$1.TYPE_PDF_HTML) {
        response.config = new SieveConfigPDF(config, { parse: true });
      } else if (content_type == C$1.TYPE_XML) {
        response.config = new SieveConfigXML(config, { parse: true });
      } else if (content_type == C$1.TYPE_DOC) {
        response.config = new SieveConfigDOC(config, { parse: true });
      } else if (content_type == C$1.TYPE_JSON) {
        response.config = new SieveConfigJSON(config, {
          parse: true,
          datasource_id: response.datasource_id
        });
      } else {
        response.config = new SieveConfigNA(config, { parse: true });
      }
    }
    if (schedule) {
      try {
        schedule = JSON.parse(schedule);
      } catch (e) {
        schedule = {};
      }
      response.schedule = new Schedule(schedule, { parse: true });
    }
    if (!response.meta) {
      response.meta = {
        diffContentMode: C$1.DIFF_MODE_VISUAL
      };
    }
    return response;
  },
  getTypeDesc() {
    let content_type = this.attributes.content_type;
    let desc = this.TYPES.filter(({ type }) => type == content_type)[0];
    if (!desc) {
      desc = {
        type: content_type,
        client: clientNone,
        name: "<none>"
      };
    }
    return desc;
  },
  getAccessibleClients(clients) {
    let type = this.getTypeDesc();
    return clients.filter((client) => type.client(client));
  },
  async getAccess(user) {
    if (user.isLoggedIn()) {
      try {
        return await Api.api(`/users/sieve-access/${this.attributes.content_type}`);
      } catch (e) {
        console.error("error getting sieve-access", e);
        return { hasAccess: true };
      }
    } else {
      let hasAccess = this.ANON_ACCESSIBLE_TYPES.includes(this.attributes.content_type);
      return {
        hasAccess,
        minPlan: null
      };
    }
  },
  getTypeName() {
    let type = this.getTypeDesc();
    return type.name;
  }
});
const Sieves = base$1.PagedCollection.extend({
  model: Sieve,
  url: "/sieves",
  initialize: function(models, options) {
    Sieves.__super__.initialize.call(this, models, options);
    this.listenTo(this, "change:selected", this._notify);
  },
  getSelectedSieves() {
    return this.models.filter((sieve) => sieve.get("selected"));
  },
  getSelectedSieveIds() {
    let selectedIds = [];
    this.models.forEach((sieve) => {
      if (sieve.get("selected")) {
        selectedIds.push(sieve.get("id"));
      }
    });
    return selectedIds;
  },
  toggleSieveSelection(check) {
    this.models.forEach((sieve) => {
      sieve.set("selected", typeof check === "function" ? check(sieve) : check);
    });
  },
  async markAsRead(read) {
    const models = this.getSelectedSieves();
    try {
      await Promise.all(
        models.map((model) => model.markRead(read))
      );
    } catch (err) {
      Msg$1.error("sieve:update:err");
    }
  }
});
const SieveRule = Model.extend({
  encodedFields: ["config"],
  urlRoot: "/rules",
  defaults() {
    const ruleDefault = USER.features.rule_default || V1;
    return ruleDefault === V1 ? this.defaultsV1() : this.defaultsV2();
  },
  defaultsV1() {
    return {
      config: new RuleConfig({
        type: C$1.TYPE_RULE_GROUP,
        op: C$1.OP_AND,
        rules: [],
        numberFormat: C$1.NUM_FORMAT_COMMA_DOT
      }),
      version: V1
    };
  },
  defaultsV2() {
    return {
      config: new RuleConfigV2({
        numberFormat: C$1.NUM_FORMAT_COMMA_DOT,
        rules: ["or"]
      }),
      version: V2
    };
  },
  getCount() {
    let count = 0;
    const { config, version } = this.attributes;
    if (V1 == this.get("version")) {
      let doCount = function(rule) {
        if (rule.type == C$1.TYPE_RULE_GROUP) {
          rule.rules.forEach(doCount);
        } else {
          count += 1;
        }
      };
      doCount(config.toJSON());
    } else {
      const orEdRules = config.toJSON().rules;
      for (let i = 1; i < orEdRules.length; i += 1) {
        const andEdRules = orEdRules[i];
        count += andEdRules.length - 1;
      }
    }
    return count;
  },
  isEmpty: function() {
    const { config, version } = this.attributes;
    if (V1 == this.get("version")) {
      return !(config && config.toJSON().rules.length > 0);
    } else {
      return !(config && config.toJSON().rules.length > 1);
    }
  },
  parse(json2) {
    json2 = SieveRule.__super__.parse.call(this, json2);
    if (!json2.version) {
      json2.version = USER.features.rule_default || V1;
    }
    if (json2.version === V1) {
      json2.config = new RuleConfig(json2.config);
    } else if (json2.version === V2) {
      json2.config = new RuleConfigV2(json2.config);
    }
    return json2;
  },
  setVersion(version) {
    if (version === this.get("version")) {
      return;
    }
    let attrs;
    if (version == V1) {
      this._v2Attrs = { ...this.attributes };
      attrs = this._v1Attrs || this.defaultsV1();
    } else if (version == V2) {
      this._v1Attrs = { ...this.attributes };
      attrs = this._v2Attrs || this.defaultsV2();
    }
    this.set(attrs);
  }
});
SieveRule.V1 = V1;
SieveRule.V2 = V2;
const Work = Model.extend({
  encodedFields: ["err", "data"],
  parse(json2) {
    json2.fetchingSnapshot = false;
    json2.uri = this.collection.sieve.get("uri");
    return Work.__super__.parse.call(this, json2);
  },
  getMessage() {
    return this.get("err").msg || this.get("err").message || JSON.stringify(this.get("err"));
  },
  async fetchScreenshot() {
    var _a;
    const sieve = this.collection.sieve;
    if (this.get("snapshot")) {
      return;
    }
    try {
      this.set("fetchingSnapshot", true);
      let uri = `/sieves/${sieve.id}/snapshots/${this.get("snapshot_id")}`;
      if (Supports.agents.local && sieve.get("client_id") !== ModelClient.Clients.webAppId) {
        uri += "/local";
      }
      const res = await Api.api(uri, "GET");
      if (res) {
        this.set("snapshot", res);
        this.set("uri", (_a = res.uri) != null ? _a : this.get("uri"));
      }
    } catch (e) {
      console.error("error while fetching screenshot data", "sieveID", sieve.id, "workID", this.id, e);
    } finally {
      this.set("fetchingSnapshot", false);
    }
  }
});
const Works = Collection.extend({
  model: Work,
  initialize: function(models, options) {
    Works.__super__.initialize.call(this, models, options);
    this.sieve = options.sieve;
    this.on("add", this.onAdd, this);
  },
  onAdd: function(model) {
    model.sieve = this.sieve;
  },
  url: function() {
    let route = "works";
    const clientId = this.sieve.get("client_id");
    if (Supports.agents.local && clientId !== ModelClient.Clients.webAppId) {
      route = "works/local";
    }
    return ["/sieves", this.sieve.id, route].join("/");
  }
});
class SimpleAttrList extends Base$1 {
  constructor(name) {
    super({
      name,
      available: false,
      list: [],
      loading: true,
      newValue: ""
    });
    this.fetch();
  }
  async fetch() {
    let constraint = await Api.api("/users/constraints");
    if (constraint.plan_id[0] !== "0") {
      this.state.available = true;
    }
    let attrs = await Api.api("/users/attrs", {
      name: this.state.name,
      "state.in": [10, 40]
    });
    this.state.loading = false;
    this.state.list = attrs.data;
  }
  createTpl({ loading, available, list, name }) {
    return loading ? html`Loading` : !available ? html`It is currently only available for paid customers.` : html`
      <ul class='list-group'>
      ${list.map((attr2) => attr2.value == USER.email ? "" : html`<li class='list-group-item' id=${attr2.id}>
        <span>${attr2.value}</span>
        <div class='right'>
          <button class='btn btn-default btn-sm' @click=${(e) => this.onDel(attr2.id)}>
            Delete
          </button>
        <div>
        </li>`)}
      </ul>
      <div class='input-group'>
        <input class='form-control' type='text' placeholder='Enter new ${name}'
          @input=${(e) => this.state.newValue = e.target.value}
          .value=${this.state.newValue}
          >
        <span class='input-group-btn'>
          <button @click=${(e) => this.onAdd()} class='btn btn-primary'>Add</button>
        </span>
      </div>
      `;
  }
  async onAdd() {
    let value = this.state.newValue.trim();
    if (value.length > 0) {
      await Api.api("/users/attrs", "POST", { name: this.state.name, value });
      this.fetch();
    }
    this.state.newValue = "";
  }
  async onDel(id) {
    await Api.api(`/users/attrs/${id}`, "DELETE");
    this.fetch();
  }
}
var UserAttrOptionsPlugin = Editor.SelectOptionsPlugin.extend({
  action_edit: function() {
    const view = new View.Base({
      el: new SimpleAttrList(this.param.name).el
    });
    const modal = new View.Modal({
      title: "Manage List",
      parent: this.editor.getRoot(),
      view
    });
    modal.show();
    this.listenTo(modal, "discard", () => this.fetch());
  },
  fetch: function() {
    this.attrs.fetch({
      data: {
        "name": this.param.name,
        "state.in": [10, 40],
        "_opt": {
          order: ["ts"]
        }
      }
    });
  },
  getOptionLabel: function(model) {
    return model.get(this.attrLabel) + (model.get("state") == 10 ? " - unverified" : "");
  },
  load: function() {
    this.attrs = new AttrModel.UserAttrs();
    this.listenTo(this.editor, "reset", _.bind(this.fetch, this));
    this.listenTo(this.attrs, "sync", _.bind(this.loadData, this));
    this.fetch();
    $(this.separator).attr("label", T("l_loading"));
  },
  onSync: async function() {
    await serviceProxy.SyncMan._syncStore(serviceProxy.store.AttrStore);
    this.fetch();
  },
  render: function() {
    UserAttrOptionsPlugin.__super__.render.call(this);
    if (Supports.agents.local && App.user.isLoggedIn()) {
      let btn;
      $(this.select).after(
        " ",
        btn = BUTTON(
          { "class": "btn xbtn-light", "title": T("l_sync") },
          I({ "class": "fa fa-refresh" })
        )
      );
      btn.onclick = this.onSync.bind(this);
    }
  },
  renderActions() {
    if (this.param.name == "email") {
      this.select.appendChild(OPTION({ value: "action:edit" }, "Manager List"));
    }
  },
  unload: function() {
    UserAttrOptionsPlugin.__super__.unload.call(this);
    this.attrs.reset();
  }
});
const MacroOptionsPlugin = Editor.SelectOptionsPlugin.extend({
  attrLabel: "name",
  attrValue: "id",
  action_edit: function() {
    const view = new View.Base({
      el: new SimpleAttrList(this.param.name).el
    });
    const modal = new View.Modal({
      title: "Manage List",
      parent: this.editor.getRoot(),
      view
    });
    modal.show();
    this.listenTo(modal, "discard", () => this.fetch());
  },
  fetch: function() {
    this.macros.fetch();
  },
  getOptionLabel: function(model) {
    return model.get(this.attrLabel);
  },
  load: function() {
    this.macros = new Macros([], {
      orderBy: "-ts"
    });
    this.listenTo(this.editor, "reset", _.bind(this.fetch, this));
    this.listenTo(this.macros, "sync", _.bind(this.loadData, this));
    this.fetch();
    $(this.separator).attr("label", T("l_loading"));
  },
  render: function() {
    MacroOptionsPlugin.__super__.render.call(this);
  },
  renderActions() {
    if (this.param.name == "email") {
      this.select.appendChild(OPTION({ value: "action:edit" }, "Managre List"));
    }
  },
  unload: function() {
    MacroOptionsPlugin.__super__.unload.call(this);
    this.macros.reset();
  }
});
const UserSignInCheckPlugin = Editor.Plugin.extend({
  render() {
    if (!App.user.isLoggedIn()) {
      this.a = A({ href: serviceProxy.CFG.URL.LOGIN }, B(T("a_signin")));
      $(this.editor.field).hide().after(this.a);
    }
  }
});
const attributes = {
  "run": "Checks",
  "action": "Actions",
  "email": "Emails",
  "sms": "SMS",
  "push": "Push notifications",
  "action_macro": "Macro Action"
};
function actionQuotaCheckPlugin(action) {
  return function(editor) {
    if (App.user.isLoggedIn() && !App.user.isFlexi()) {
      let message;
      if (!USER.constraint[action]) {
        message = `${action === "action" ? "Action" : attributes[action]} not included in your plan `;
      } else if (USER.constraint[action] - USER.usage[action] <= 0) {
        message = `${USER.usage[action]} of ${USER.constraint[action]} ${attributes[action]} used `;
      }
      if (message) {
        editor.$el.append(
          P(
            {
              class: "error mt-[-5px] p-[5px] pl-[36px] text-base"
            },
            message,
            A({ href: urlCfg.availability, target: "blank", rel: "noopener" }, T("l_learn_more"))
          )
        );
      }
    }
  };
}
const AudioPlayer = Editor.Plugin.extend({
  play: async function() {
    const field = this.editor.field;
    const audio = AUDIO();
    const tone = field.value;
    $(field).after(audio);
    if (tone.indexOf("tone:") == 0) {
      let doc = await serviceProxy.store.KVStore.findOne(tone);
      play(doc.value);
    } else {
      play(tone);
    }
    function play(dataOrUrl) {
      audio.src = dataOrUrl;
      audio.play();
    }
  },
  render: function() {
    const field = this.editor.field;
    const a = A({ href: "javascript:void 0" }, T("a_play"));
    $(field).after(" ", a);
    a.onclick = _.bind(this.play, this);
  }
});
const SieveActionDescList = [
  {
    type: C$1.ACTION_EMAIL,
    label: "l_action_email",
    icon: "fa-envelope-o",
    addByDefault: function(Supports2) {
      return Supports2.user && Supports2.email;
    },
    params: [{
      label: "l_email",
      must: true,
      name: "email",
      type: "email",
      plugins: [UserAttrOptionsPlugin, UserSignInCheckPlugin]
    }],
    groupPlugin: actionQuotaCheckPlugin("email")
  },
  {
    type: C$1.ACTION_PUSH,
    label: "l_action_push",
    icon: "fa-mobile",
    paid: 1,
    single: true,
    addByDefault: function(Supports2) {
      return false;
    },
    params: [],
    groupPlugin: actionQuotaCheckPlugin("push"),
    plugin: function(editor) {
      const attrs = new AttrModel.UserAttrs();
      attrs.fetch({
        data: {
          "name.in": ["fcm_id", "gcm_id", "apns_id"],
          "state.in": [0, 40],
          "_opt": {
            order: ["ts"],
            limit: 1
          }
        },
        success: function() {
          if (attrs.length == 0) {
            editor.$el.append(
              P({
                "class": "error",
                "style": "padding:5px"
              }, T("e_app_not_installed"))
            );
          }
        }
      });
    }
  },
  {
    type: C$1.ACTION_SMS,
    label: "l_action_sms",
    icon: "fa-mobile",
    paid: 1,
    addByDefault: function(Supports2) {
      return false;
    },
    params: [{
      label: "l_phone",
      must: true,
      name: "phone",
      type: "phone",
      plugins: [UserAttrOptionsPlugin, UserSignInCheckPlugin]
    }],
    groupPlugin: actionQuotaCheckPlugin("sms")
  },
  {
    type: C$1.ACTION_DISCORD,
    label: "l_action_discord",
    icon: "fa-terminal",
    paid: 1,
    addByDefault: function(Supports2) {
      return false;
    },
    groupPlugin: actionQuotaCheckPlugin("action"),
    params: [{
      label: "l_discord",
      must: true,
      name: "discord",
      type: "url",
      plugins: [UserSignInCheckPlugin]
    }]
  },
  {
    type: C$1.ACTION_SLACK,
    label: "l_action_slack",
    icon: "fa-slack",
    paid: 1,
    addByDefault: function(Supports2) {
      return false;
    },
    groupPlugin: actionQuotaCheckPlugin("action"),
    params: [{
      label: "l_slack",
      must: true,
      name: "slack",
      type: "url",
      plugins: [UserSignInCheckPlugin]
    }]
  },
  {
    type: C$1.ACTION_WEBHOOK,
    label: "l_action_webhook",
    icon: "fa-terminal",
    paid: 1,
    addByDefault: function(Supports2) {
      return false;
    },
    defaults: {
      data: {
        id: "{{sieve.id}}",
        name: "{{sieve.name}}",
        uri: "{{sieve.uri}}",
        text: "{{sieve_data.text}}"
      }
    },
    groupPlugin: actionQuotaCheckPlugin("action"),
    params: [
      {
        label: "l_url",
        must: true,
        name: "url",
        type: "url",
        values: [{
          name: "sieve.id",
          help: "Monitor's UUID."
        }],
        plugins: [UserSignInCheckPlugin]
      },
      {
        label: "l_data",
        fieldLabel: "l_field",
        must: false,
        name: "data",
        type: "request_data",
        values: [{
          name: "sieve.id",
          help: "Monitor's UUID."
        }, {
          name: "sieve_data.data",
          help: "Data fetched from source. HTML for pages and XML for feeds."
        }, {
          name: "sieve_data.text",
          help: "Readable text extracted from source data."
        }]
      },
      {
        label: "l_headers",
        fieldLabel: "l_header",
        must: false,
        name: "headers",
        type: "request_headers",
        values: []
      }
    ]
  },
  {
    type: C$1.ACTION_LOCAL_OPEN_TAB,
    label: "l_action_local_open_tab",
    icon: "fa-file-o",
    local: true,
    single: true,
    addByDefault: function() {
      return false;
    },
    params: []
  },
  {
    type: C$1.ACTION_LOCAL_POPUP,
    label: "l_action_local_popup",
    icon: "fa-comment-o",
    local: true,
    single: true,
    addByDefault: function(Supports2) {
      return Supports2.agents.local;
    },
    params: []
  },
  {
    type: C$1.ACTION_LOCAL_AUDIO,
    label: "l_action_local_audio",
    icon: "fa-volume-up",
    local: true,
    single: true,
    addByDefault: function(Supports2) {
      return Supports2.agents.local;
    },
    params: [{
      label: "l_tone",
      name: "tone",
      type: "enum",
      must: true,
      list: function() {
        const list = [{
          label: "l_bell_strike",
          value: "/skin/media/bell_strike.ogg"
        }, {
          label: "l_asian_koel",
          value: "/skin/media/asian_koel.ogg"
        }, {
          label: "l_ding_dong",
          value: "/skin/media/ding_dong.ogg"
        }, {
          label: "l_buzzer",
          value: "/skin/media/buzzer.ogg"
        }];
        if (Supports.agents.local) {
          (async () => {
            let doc = await serviceProxy.store.KVStore.findOne("tones");
            if (doc) {
              const customTones = JSON.parse(doc.value);
              _.each(customTones, function(aTone) {
                list.push(aTone);
              });
            }
          })();
        }
        return list;
      }(),
      plugins: [AudioPlayer]
    }]
  },
  {
    type: C$1.ACTION_MACRO,
    label: "l_action_macro_open_tab",
    icon: "fa fa-tasks",
    paid: 1,
    addByDefault: function(Supports2) {
      return false;
    },
    params: [{
      label: "l_macro",
      must: true,
      name: "macro_id",
      type: "text",
      plugins: [MacroOptionsPlugin, UserSignInCheckPlugin]
    }],
    groupPlugin: actionQuotaCheckPlugin("action_macro")
  }
];
const SieveAction = Model.extend({
  encodedFields: ["config"],
  parent: null,
  defaults: function() {
    const desc = this.desc;
    const defaults = {
      type: desc.type
    };
    if (desc.defaults) {
      defaults.config = _.result(desc, "defaults");
    }
    return defaults;
  },
  initialize: function(attrs, options) {
    Works.__super__.initialize.call(this, attrs, options);
    this.parent = options && options.parent;
  },
  urlRoot: function() {
    const parent = this.parent;
    if (parent == null)
      throw new Error("Parent sieve not set for action");
    return "/sieves/" + parent.id + "/actions";
  }
});
const SieveActionNone = SieveAction.extend({
  desc: {
    type: C$1.ACTION_NONE,
    label: "l_action_none",
    single: true,
    addByDefault: function(Supports2) {
      return false;
    },
    params: []
  }
});
var SieveActions = Collection.extend({
  initialize: function(models, options) {
    Works.__super__.initialize.call(this, models, options);
    this.parent = options.parent;
    this.on("add", this.onAdd, this);
  },
  onAdd: function(action) {
    action.parent = this.parent;
  },
  parse: function(response) {
    response = SieveActions.__super__.parse.call(this, response);
    return _.map(response, function(attrs) {
      const Type = SieveAction[attrs.type] || SieveActionNone;
      return new Type(attrs, {
        parse: true,
        parent: this.parent
      });
    }, this);
  },
  url: function() {
    return ["/sieves", this.parent.id, "actions"].join("/");
  }
});
if (Supports.agents.local) {
  SieveActionDescList.slice(0).forEach(function(desc, index) {
    if (desc.local) {
      SieveActionDescList.splice(index, 1);
      SieveActionDescList.splice(0, 0, desc);
    }
  });
}
_.each(SieveActionDescList, function(desc) {
  SieveAction[desc.type] = SieveAction.extend({ desc }, { desc });
});
var Model$1 = {
  LocatorDescList,
  Frame,
  Frames,
  Page,
  Pages,
  Schedule,
  Sieve,
  SieveConfigRequest,
  SieveConfigFeed,
  SieveConfigHTML,
  SieveConfigJSON,
  SieveConfigPDF,
  SieveConfigXML,
  Sieves,
  SieveRule,
  SieveActionDescList,
  SieveAction,
  SieveActions,
  Works,
  ACTION_EMAIL: C$1.ACTION_EMAIL,
  ACTION_SMS: C$1.ACTION_SMS,
  ACTION_PUSH: C$1.ACTION_PUSH
};
export { action_destroyer as $, Api as A, group_outros as B, transition_out as C, check_outros as D, compute_rest_props as E, compute_slots as F, assign as G, exclude_internal_props as H, create_component as I, mount_component as J, destroy_component as K, directive as L, createMarker as M, NodePart as N, reparentNodes as O, removeNodes as P, Editor as Q, Model$1 as R, SvelteComponent as S, C$1 as T, Msg$1 as U, View as V, subscribe as W, run_all as X, createEventDispatcher as Y, set_attributes as Z, toggle_class as _, space as a, Crawlers as a$, get_spread_update as a0, bubble as a1, createFieldStore as a2, handle_promise as a3, update_await_block_branch as a4, empty as a5, binding_callbacks as a6, bind as a7, add_flush_callback as a8, FormModel as a9, get_store_value as aA, writable as aB, flush as aC, null_to_empty as aD, querystring as aE, location as aF, push as aG, set_store_value as aH, to_number as aI, Base$1 as aJ, html as aK, getDef as aL, defs as aM, And as aN, Or as aO, SingleRule as aP, set_svg_attributes as aQ, hasNumeric as aR, RuleToTypeMap as aS, Macros as aT, render as aU, AttrModel as aV, stop_propagation as aW, JSONEdit as aX, V1 as aY, V2 as aZ, parse as a_, onMount as aa, TYPES as ab, FieldList as ac, get_binding_group_value as ad, init_binding_group as ae, get_spread_object as af, register as ag, derived as ah, ModelClient as ai, construct_svelte_component as aj, set_input_value as ak, tick as al, onDestroy as am, add_render_callback as an, select_option as ao, update_keyed_each as ap, destroy_block as aq, select_value as ar, outro_and_destroy_block as as, Router$1 as at, afterUpdate as au, base$1 as av, globals as aw, setContext as ax, is_function as ay, svg_element as az, attr as b, CrawlerJobs as b0, Crawler as b1, CrawlerJob as b2, JobStates as b3, replace as b4, Self as b5, Core as b6, loadLang as b7, MESSAGES as b8, src_url_equal as c, Supports as d, element as e, set_style as f, insert as g, append as h, init$1 as i, detach as j, destroy_each as k, listen as l, component_subscribe as m, noop as n, params as o, prevent_default as p, getContext as q, set_data as r, safe_not_equal as s, text$1 as t, urlCfg as u, create_slot as v, update_slot_base as w, get_all_dirty_from_scope as x, get_slot_changes as y, transition_in as z };
