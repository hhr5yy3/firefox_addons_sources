var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { B as reactive, C as trace_fn, D as AsyncChannel, u as browser, d as defineComponent, o as openBlock, b as createElementBlock, E as renderSlot, G as mergeProps, a as resolveComponent, m as createBlock, w as withCtx, e as createBaseVNode, i as withModifiers, h as createCommentVNode, n as normalizeClass, H as withKeys, j as required, t as toDisplayString, F as Fragment, g as renderList, f as createVNode, I as createSlots, l as filterMap, J as h, K as delimit, L as nextTick, s as createTextVNode, y as withDirectives, N as vModelSelect, O as urlToOpen, P as vModelCheckbox, r as ref, c as computed, Q as resolveDynamicComponent, R as normalizeStyle, S as shallowReactive, U as onMounted, V as vModelText, x as unref, W as altKeyName, X as bgKeyName, Y as bgKeyPressed, Z as withMemo, k as textMatcher, _ as Teleport, $ as parseVersion, p as pageref, T as TransitionGroup, a0 as Transition, q as launch } from "./assets/launch-vue.js";
import { a as friendlyFolderName, b as isBookmark, c as isFolder, t as the, d as isNode, e as isTab, g as isWindow, h as copying, j as getDefaultFolderNameISODate, k as copyIf, p as pathTo, l as genDefaultFolderName, T as TreeFilter, O as OopsNotification, C as CUR_WINDOW_MD_ID, m as domainForUrl, i as init } from "./assets/oops-notification.js";
import { _ as _sfc_main$i, M as Menu, L as LoadMore, a as _sfc_main$j } from "./assets/menu.js";
import { B as ButtonBox, N as Notification } from "./assets/notification.js";
import { _ as _export_sfc } from "./assets/_plugin-vue_export-helper.js";
function _spawn(parent, weight, fn) {
  const tm = new TaskMonitor(parent, weight);
  const promise = fn(tm).finally(() => tm.detach());
  return Object.assign(promise, {
    progress: tm.progress,
    cancel() {
      tm.cancel();
    }
  });
}
function _spawn_iter(parent, weight, fn) {
  let tm = new TaskMonitor(parent, weight);
  const iter = fn(tm);
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      const res = await iter.next();
      if (tm && res.done) {
        tm.detach();
        tm = void 0;
      }
      return res;
    },
    progress: tm.progress,
    cancel() {
      tm == null ? void 0 : tm.cancel();
    }
  };
}
class TaskMonitor {
  constructor(parent, weight) {
    __publicField(this, "progress");
    __publicField(this, "onCancel");
    __publicField(this, "_cancelled", false);
    __publicField(this, "_parent");
    __publicField(this, "_children", []);
    this.progress = make_progress(parent == null ? void 0 : parent.progress, weight);
    this._parent = parent;
    if (this._parent) {
      this._parent._children.push(this);
    }
  }
  static run(fn) {
    return _spawn(void 0, 1, fn);
  }
  static run_iter(fn) {
    return _spawn_iter(void 0, 1, fn);
  }
  detach() {
    this.progress._detach();
    if (this._parent) {
      this._parent._children.splice(this._parent._children.indexOf(this), 1);
      this._parent = void 0;
    }
  }
  spawn(fn) {
    return this.wspawn(1, fn);
  }
  wspawn(weight, fn) {
    return _spawn(this, weight, fn);
  }
  spawn_iter(fn) {
    return this.wspawn_iter(1, fn);
  }
  wspawn_iter(weight, fn) {
    return _spawn_iter(this, weight, fn);
  }
  get cancelled() {
    return this._cancelled;
  }
  cancel() {
    this._cancelled = true;
  }
  get status() {
    return this.progress.status;
  }
  set status(s) {
    this.progress.status = s;
    this._cancelCheck();
  }
  get value() {
    return this.progress.value;
  }
  set value(v) {
    this.progress.value = v;
    this._cancelCheck();
  }
  get max() {
    return this.progress.max;
  }
  set max(m) {
    this.progress.max = m;
    this._cancelCheck();
  }
  _cancelCheck() {
    if (this._parent) this._parent._cancelCheck();
    if (this.onCancel && this._cancelled) {
      this.onCancel();
      this.onCancel = void 0;
    }
  }
}
function make_progress(parent, weight) {
  let value = 0;
  let max = 1;
  function updateParentProgress(old_value, old_max) {
    if (parent) {
      const old_progress = (weight || 1) * old_value / (old_max || 1);
      const new_progress = (weight || 1) * value / (max || 1);
      parent.value += new_progress - old_progress;
    }
  }
  const progress = reactive({
    id: parent ? `${parent.id}/${parent._child_count}` : "",
    status: "",
    children: [],
    _child_count: 0,
    get value() {
      return value;
    },
    set value(v) {
      if (v < 0) throw new RangeError("value must be >= 0");
      if (v > max) v = max;
      const old_value = value;
      value = v;
      updateParentProgress(old_value, max);
    },
    get max() {
      return max;
    },
    set max(m) {
      if (m < 0) throw new RangeError("max must be >= 0");
      const old_max = max;
      max = m;
      updateParentProgress(value, old_max);
    },
    _detach() {
      if (parent) {
        parent.children.splice(parent.children.indexOf(this), 1);
        parent = void 0;
      }
    }
  });
  if (parent) {
    parent._child_count += 1;
    parent.children.push(progress);
  }
  return progress;
}
const trace$2 = trace_fn("siteinfo");
const MAX_CONCURRENT_FETCHES = navigator.hardwareConcurrency ?? 4;
const LOADING_TIMEOUT = 3e4;
const FAVICON_TIMEOUT = 2e3;
const REPLACEMENT_TIMEOUT = 3e3;
function fetchInfoForSites(urlset, tm) {
  const urls = Array.from(urlset);
  const chan = new AsyncChannel();
  const max = urls.length;
  tm.status = "Fetching site info...";
  tm.max = max;
  const parent_tm = tm;
  const fiber = async (tm2) => {
    tm2.max = max;
    while (urls.length > 0) {
      const url = urls.pop();
      tm2.status = url;
      for (let retry_count = 3; retry_count > 0; ) {
        try {
          chan.send(await fetchSiteInfo(url));
          break;
        } catch (e) {
          --retry_count;
          if (retry_count > 0) continue;
          chan.send({
            originalUrl: url,
            error: e
          });
          break;
        }
      }
      tm2.value = max - urls.length;
      if (parent_tm.cancelled) break;
    }
  };
  let fiber_count = Math.min(MAX_CONCURRENT_FETCHES, urls.length);
  const fiber_weight = urls.length / fiber_count;
  const fibers = [];
  for (let i = 0; i < fiber_count; ++i) {
    fibers.push(
      tm.wspawn(
        fiber_weight,
        (tm2) => fiber(tm2).finally(() => {
          --fiber_count;
          if (fiber_count == 0) chan.close();
        })
      )
    );
  }
  if (fibers.length === 0) chan.close();
  tm.onCancel = () => fibers.forEach((f) => f.cancel());
  return chan;
}
async function fetchSiteInfo(url) {
  let events = void 0;
  let tab = void 0;
  let timeout = void 0;
  const onTimeout = () => {
    trace$2("timeout", url);
    if (events) events.close();
  };
  const info = {
    complete: false,
    originalUrl: url,
    finalUrl: void 0,
    title: void 0,
    favIconUrl: void 0
  };
  const capture_info = (tab2) => {
    trace$2("capturing", {
      status: tab2.status,
      title: tab2.title,
      url: tab2.url,
      favicon: tab2.favIconUrl ? tab2.favIconUrl.substr(0, 10) : void 0
    });
    if (tab2.url && tab2.url !== "about:blank") info.finalUrl = tab2.url;
    if (info.finalUrl) {
      if (tab2.title) info.title = tab2.title;
      if (tab2.favIconUrl) info.favIconUrl = tab2.favIconUrl;
      if (tab2.status === "complete") {
        info.complete = true;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(onTimeout, FAVICON_TIMEOUT);
      }
    }
    trace$2("current best", info);
  };
  const has_complete_info = () => info.finalUrl && info.title && info.favIconUrl;
  try {
    events = watchForTabEvents();
    tab = await browser.tabs.create({ active: false, url });
    if (browser.tabs.hide) await browser.tabs.hide(tab.id);
    timeout = setTimeout(onTimeout, LOADING_TIMEOUT);
    for await (const ev of events) {
      if (ev.id !== tab.id) continue;
      switch (ev.$type) {
        case "create":
        case "update":
          capture_info(ev.tab);
          break;
        case "replace":
          trace$2("replace", ev.id, "=>", ev.replacedWith);
          tab = await browser.tabs.get(ev.replacedWith);
          break;
        case "remove":
          tab = await findReplacementTab(events, url);
          if (tab) capture_info(tab);
          else throw new TabRemovedError(url);
          break;
      }
      if (has_complete_info()) break;
    }
  } finally {
    if (timeout) clearTimeout(timeout);
    if (tab) browser.tabs.remove(tab.id).catch(console.error);
    if (events) events.close();
  }
  trace$2("final info", info);
  return info;
}
async function findReplacementTab(events, url) {
  const access_cutoff = Date.now() - 500;
  const timeout = setTimeout(() => {
    trace$2("replacement timed out", url);
    events.close();
  }, REPLACEMENT_TIMEOUT);
  try {
    const recent_tabs = (await browser.tabs.query({ currentWindow: true })).filter(
      (tab) => (tab.lastAccessed ?? 0) >= access_cutoff && tab.url === url
    );
    trace$2("immediate replacement candidates", recent_tabs);
    if (recent_tabs.length > 0) return recent_tabs[0];
    for await (const ev of events) {
      if (!("tab" in ev)) continue;
      if ((ev.tab.lastAccessed ?? 0) < access_cutoff) {
        trace$2("searching for replacement - too old", ev);
        continue;
      }
      if (ev.tab.url === url) {
        trace$2("found replacement", ev);
        return ev.tab;
      }
    }
    trace$2("no replacement found");
    events.close();
    return void 0;
  } finally {
    clearTimeout(timeout);
  }
}
class TabRemovedError extends Error {
  constructor(url) {
    super(`Tab was removed after navigating to ${url}`);
    __publicField(this, "url");
    this.url = url;
  }
}
function watchForTabEvents() {
  const chan = new AsyncChannel();
  const onCreated = (tab) => chan.send({ $type: "create", id: tab.id, tab });
  const onUpdated = (id, info, tab) => chan.send({ $type: "update", id, tab });
  const onReplaced = (replacedWith, id) => chan.send({ $type: "replace", replacedWith, id });
  const onRemoved = (id) => chan.send({ $type: "remove", id });
  chan.onClose = () => {
    browser.tabs.onCreated.removeListener(onCreated);
    browser.tabs.onUpdated.removeListener(onUpdated);
    browser.tabs.onReplaced.removeListener(onReplaced);
    browser.tabs.onRemoved.removeListener(onRemoved);
  };
  browser.tabs.onCreated.addListener(onCreated);
  browser.tabs.onUpdated.addListener(onUpdated);
  browser.tabs.onReplaced.addListener(onReplaced);
  browser.tabs.onRemoved.addListener(onRemoved);
  return chan;
}
const _sfc_main$h = defineComponent({
  mounted() {
    this.$refs.modal.focus();
  }
});
const modal = "_modal_hx9di_2";
const style0$2 = {
  modal
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("aside", mergeProps({
    class: { "modal-backdrop": true, [_ctx.$style.modal]: true },
    tabindex: "-1"
  }, _ctx.$attrs, { ref: "modal" }), [
    renderSlot(_ctx.$slots, "default")
  ], 16);
}
const cssModules$2 = {
  "$style": style0$2
};
const ModalBackdrop = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$c], ["__cssModules", cssModules$2]]);
const _sfc_main$g = defineComponent({
  components: { ModalBackdrop },
  emits: ["close"],
  props: {
    backdropClass: Object,
    showCloseButton: Boolean
  },
  inheritAttrs: false,
  methods: {
    close() {
      this.$emit("close");
    }
  }
});
const _hoisted_1$e = {
  key: 0,
  class: "dialog-title"
};
const _hoisted_2$a = { class: "dialog-content" };
const _hoisted_3$8 = {
  key: 1,
  class: "dialog-buttons"
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ModalBackdrop = resolveComponent("ModalBackdrop");
  return openBlock(), createBlock(_component_ModalBackdrop, {
    class: normalizeClass(_ctx.backdropClass),
    onClick: _ctx.close,
    onKeydown: withKeys(withModifiers(_ctx.close, ["prevent", "stop"]), ["esc"])
  }, {
    default: withCtx(() => [
      createBaseVNode("aside", mergeProps({
        ref: "dialog",
        class: "dialog"
      }, _ctx.$attrs, {
        onClick: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["stop"]))
      }), [
        _ctx.$slots.title || _ctx.showCloseButton ? (openBlock(), createElementBlock("header", _hoisted_1$e, [
          renderSlot(_ctx.$slots, "title"),
          _ctx.showCloseButton ? renderSlot(_ctx.$slots, "close", { key: 0 }, () => [
            createBaseVNode("button", {
              class: "dialog-close",
              title: "Close",
              onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.close && _ctx.close(...args), ["prevent", "stop"]))
            })
          ]) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createBaseVNode("section", _hoisted_2$a, [
          renderSlot(_ctx.$slots, "default")
        ]),
        _ctx.$slots.buttons ? (openBlock(), createElementBlock("footer", _hoisted_3$8, [
          renderSlot(_ctx.$slots, "buttons")
        ])) : createCommentVNode("", true)
      ], 16)
    ]),
    _: 3
  }, 8, ["class", "onClick", "onKeydown"]);
}
const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$b]]);
const _sfc_main$f = defineComponent({
  name: "Self",
  props: {
    progress: required(Object)
  }
});
const _hoisted_1$d = { class: "progress-item" };
const _hoisted_2$9 = ["max", "value"];
const _hoisted_3$7 = { key: 0 };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Self = resolveComponent("Self");
  return openBlock(), createElementBlock("div", _hoisted_1$d, [
    createBaseVNode("progress", {
      max: _ctx.progress.max !== 0 ? _ctx.progress.max : void 0,
      value: _ctx.progress.max !== 0 ? _ctx.progress.value : void 0
    }, null, 8, _hoisted_2$9),
    createBaseVNode("label", null, toDisplayString(_ctx.progress.status), 1),
    _ctx.progress.children.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_3$7, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.progress.children, (c) => {
        return openBlock(), createElementBlock("li", {
          key: c.id
        }, [
          createVNode(_component_Self, { progress: c }, null, 8, ["progress"])
        ]);
      }), 128))
    ])) : createCommentVNode("", true)
  ]);
}
const ProgressItem = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$a]]);
const _sfc_main$e = defineComponent({
  components: { Dialog, ProgressItem },
  emits: ["close"],
  props: {
    cancel: Function,
    progress: required(Object)
  },
  data() {
    return {
      cancelled: false
    };
  },
  methods: {
    doCancel() {
      if (!this.cancel) return;
      this.cancel();
      this.cancelled = true;
    }
  }
});
const _hoisted_1$c = ["disabled"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProgressItem = resolveComponent("ProgressItem");
  const _component_Dialog = resolveComponent("Dialog");
  return openBlock(), createBlock(_component_Dialog, {
    class: normalizeClass({ progress: true, cancellable: !!_ctx.cancel }),
    "backdrop-class": { progress: true, cancellable: !!_ctx.cancel }
  }, createSlots({
    default: withCtx(() => [
      createVNode(_component_ProgressItem, {
        class: "toplevel",
        progress: _ctx.progress
      }, null, 8, ["progress"])
    ]),
    _: 2
  }, [
    _ctx.cancel ? {
      name: "buttons",
      fn: withCtx(() => [
        createBaseVNode("button", {
          disabled: _ctx.cancelled,
          class: normalizeClass({ disabled: _ctx.cancelled }),
          onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.doCancel && _ctx.doCancel(...args), ["prevent", "stop"]))
        }, " Cancel ", 10, _hoisted_1$c)
      ]),
      key: "0"
    } : void 0
  ]), 1032, ["class", "backdrop-class"]);
}
const ProgressDialog = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$9]]);
function exportFolder(m, f) {
  const children = f.children.filter((c) => c !== void 0);
  return {
    id: f.id,
    title: friendlyFolderName(f.title),
    bookmarks: filterMap(children, (c) => isBookmark(c) ? c : void 0).map(
      exportBookmark
    ),
    folders: filterMap(children, (c) => isFolder(c) ? c : void 0).map(
      (f2) => exportFolder(m, f2)
    )
  };
}
function exportBookmark(bm) {
  return { id: bm.id, title: bm.title, url: bm.url };
}
function br() {
  return h("div", {}, [h("br")]);
}
function renderFolder$3(level, folder) {
  return h("section", {}, [
    h(`h${level}`, {}, [folder.title]),
    h("ul", {}, folder.bookmarks.map(renderBookmark$3)),
    ...folder.folders.map((f) => renderFolder$3(Math.min(level + 1, 5), f))
  ]);
}
function renderBookmark$3(node) {
  return h("li", {}, [h("a", { href: node.url }, [node.title])]);
}
const HtmlLinks = defineComponent({
  props: {
    folders: required(Object)
  },
  setup(props) {
    return () => props.folders.map((f) => renderFolder$3(2, f));
  }
});
const MD_LINK_QUOTABLES_RE = /\\|\[|\]|\&|\<|\>/g;
const MD_URL_QUOTABLES_RE = /\\|\)/g;
function renderFolder$2(level, folder) {
  return h("div", {}, [
    h("div", {}, [`${"".padStart(level, "#")} ${quote_title(folder.title)}`]),
    ...folder.bookmarks.map(renderBookmark$2),
    ...folder.folders.length > 0 ? [br()] : [],
    ...delimit(
      br,
      folder.folders.map((f) => renderFolder$2(level + 1, f))
    )
  ]);
}
function renderBookmark$2(node) {
  return h("div", {}, [
    `- [${quote_title(node.title)}](`,
    h("a", { href: node.url }, [quote_url(node.url)]),
    `)`
  ]);
}
function quote_emphasis(text) {
  return text.replace(
    /(^|\s)([*_]+)(\S)/g,
    (str, ws, emph, rest) => `${ws}${emph.replace(/./g, "\\$&")}${rest}`
  ).replace(
    /(\S)([*_]+)(\s|$)/g,
    (str, rest, emph, ws) => `${rest}${emph.replace(/./g, "\\$&")}${ws}`
  );
}
function quote_title(text) {
  return quote_emphasis(text.replace(MD_LINK_QUOTABLES_RE, (x) => `\\${x}`));
}
function quote_url(url) {
  return url.replace(MD_URL_QUOTABLES_RE, (x) => `\\${x}`);
}
const Markdown = defineComponent({
  props: {
    folders: required(Object)
  },
  setup(props) {
    return () => delimit(
      br,
      props.folders.map((f) => renderFolder$2(2, f))
    );
  }
});
function flattenFolders(tree) {
  const r = tree.folders.flatMap(flattenFolders);
  r.unshift(tree);
  return r;
}
function renderFolder$1(folder) {
  return h("div", {}, [
    ...folder.bookmarks.map(renderBookmark$1),
    h("div", {}, [h("br")])
  ]);
}
function renderBookmark$1(node) {
  return h("div", {}, [
    h("a", { href: node.url }, [node.url]),
    ` | ${node.title}`
  ]);
}
const OneTab = defineComponent({
  props: {
    folders: required(Object)
  },
  setup(props) {
    return () => props.folders.flatMap(flattenFolders).filter((f) => f.bookmarks.length > 0).map(renderFolder$1);
  }
});
function renderFolder(level, folder) {
  return h("div", {}, [
    h("div", {}, [`${"".padStart(level, "#")} ${folder.title}`]),
    ...folder.bookmarks.map(renderBookmark),
    ...folder.folders.length > 0 ? [br()] : [],
    ...delimit(
      br,
      folder.folders.map((f) => renderFolder(level + 1, f))
    )
  ]);
}
function renderBookmark(node) {
  return h("div", {}, [h("a", { href: node.url }, [node.url])]);
}
const UrlList = defineComponent({
  props: {
    folders: required(Object)
  },
  setup(props) {
    return () => delimit(
      br,
      props.folders.map((f) => renderFolder(2, f))
    );
  }
});
const _sfc_main$d = defineComponent({
  components: { Dialog, HtmlLinks, Markdown, OneTab, UrlList },
  emits: ["close"],
  props: {},
  computed: {
    export_folders() {
      const root = the.model.bookmarks.stash_root.value;
      if (!root) return void 0;
      return exportFolder(the.model.bookmarks, root).folders;
    },
    stash() {
      const m = the.model.bookmarks;
      if (!m.stash_root.value) return [];
      return m.stash_root.value.children.filter((c) => c !== void 0);
    },
    folders() {
      return this.stash.filter((t) => "children" in t);
    }
  },
  data: () => ({
    format: "html-links"
  }),
  mounted() {
    this.select_all();
  },
  watch: {
    format(val) {
      this.select_all();
    }
  },
  methods: {
    friendlyFolderName,
    leaves(folder) {
      return filterMap(folder.children, (node) => {
        if (node && isBookmark(node)) return node;
        return void 0;
      });
    },
    copy() {
      document.execCommand("copy");
    },
    select_all() {
      nextTick(() => {
        this.$refs.output.focus();
        window.getSelection().selectAllChildren(this.$refs.output);
      });
    }
  }
});
const dlg$1 = "_dlg_1ed4b_2";
const help = "_help_1ed4b_30";
const format = "_format_1ed4b_36";
const plaintext = "_plaintext_1ed4b_41";
const style0$1 = {
  dlg: dlg$1,
  help,
  format,
  plaintext
};
const _hoisted_1$b = ["id"];
const _hoisted_2$8 = ["for"];
const _hoisted_3$6 = ["id"];
const _hoisted_4$4 = ["for"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_html_links = resolveComponent("html-links");
  const _component_url_list = resolveComponent("url-list");
  const _component_markdown = resolveComponent("markdown");
  const _component_one_tab = resolveComponent("one-tab");
  const _component_Dialog = resolveComponent("Dialog");
  return openBlock(), createBlock(_component_Dialog, {
    class: normalizeClass({ [_ctx.$style.dlg]: true, "export-dialog": true }),
    onClose: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("close")),
    "show-close-button": ""
  }, {
    title: withCtx(() => _cache[5] || (_cache[5] = [
      createTextVNode("Export")
    ])),
    default: withCtx(() => [
      createBaseVNode("form", {
        id: _ctx.$style.dlg,
        onSubmit: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["prevent", "stop"]))
      }, [
        createBaseVNode("label", {
          for: _ctx.$style.format,
          class: normalizeClass(_ctx.$style.format)
        }, "Format:", 10, _hoisted_2$8),
        withDirectives(createBaseVNode("select", {
          id: _ctx.$style.format,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.format = $event)
        }, _cache[6] || (_cache[6] = [
          createBaseVNode("option", { value: "html-links" }, "Clickable Links", -1),
          createBaseVNode("option", { value: "url-list" }, "List of URLs", -1),
          createBaseVNode("option", { value: "markdown" }, "Markdown", -1),
          createBaseVNode("option", { value: "one-tab" }, "OneTab", -1)
        ]), 8, _hoisted_3$6), [
          [vModelSelect, _ctx.format]
        ]),
        createBaseVNode("nav", null, [
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.select_all && _ctx.select_all(...args), ["prevent", "stop"]))
          }, "Select All"),
          createBaseVNode("button", {
            class: "clickme",
            onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.copy && _ctx.copy(...args), ["prevent", "stop"]))
          }, "Copy")
        ]),
        createBaseVNode("label", {
          class: normalizeClass(_ctx.$style.help)
        }, _cache[7] || (_cache[7] = [
          createBaseVNode("a", {
            href: "https://github.com/josh-berry/tab-stash/wiki/Exporting-Tabs-from-Tab-Stash",
            target: "_blank"
          }, "About Formats...", -1)
        ]), 2)
      ], 40, _hoisted_1$b),
      _ctx.export_folders ? (openBlock(), createElementBlock("output", {
        key: 0,
        ref: "output",
        for: _ctx.$style.dlg,
        class: normalizeClass({ [_ctx.$style.plaintext]: _ctx.format !== "html-links" }),
        tabindex: "0"
      }, [
        _ctx.format === "html-links" ? (openBlock(), createBlock(_component_html_links, {
          key: 0,
          folders: _ctx.export_folders
        }, null, 8, ["folders"])) : createCommentVNode("", true),
        _ctx.format === "url-list" ? (openBlock(), createBlock(_component_url_list, {
          key: 1,
          folders: _ctx.export_folders
        }, null, 8, ["folders"])) : createCommentVNode("", true),
        _ctx.format === "markdown" ? (openBlock(), createBlock(_component_markdown, {
          key: 2,
          folders: _ctx.export_folders
        }, null, 8, ["folders"])) : createCommentVNode("", true),
        _ctx.format === "one-tab" ? (openBlock(), createBlock(_component_one_tab, {
          key: 3,
          folders: _ctx.export_folders
        }, null, 8, ["folders"])) : createCommentVNode("", true)
      ], 10, _hoisted_4$4)) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["class"]);
}
const cssModules$1 = {
  "$style": style0$1
};
const ExportDialog = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$8], ["__cssModules", cssModules$1]]);
const trace$1 = trace_fn("import");
const URL_RE = `[a-zA-Z][-a-zA-Z0-9+.]*:\\/\\/[^\\]\\) 	
\r"'<>\\\\]+`;
const MARKDOWN_LINK_RE = `\\[(?<md_title>[^\\]]+)\\]\\((?<md_url>${URL_RE})\\)`;
const ONETAB_LINK_RE = `^(?<ot_url>${URL_RE}) \\| (?<ot_title>.*)$`;
const PLAIN_URL_RE = `(?<url>${URL_RE})`;
const URL_WITH_TITLE_RE = `${MARKDOWN_LINK_RE}|${ONETAB_LINK_RE}|${PLAIN_URL_RE}`;
const MARKDOWN_HEADER_RE = /^#+ (.*)$/;
function parse(node, model, options) {
  const parser = new Parser(model, options);
  parser.parseChildren(node);
  return parser.end();
}
class Parser {
  constructor(model, options) {
    __publicField(this, "model");
    __publicField(this, "options", {
      splitOn: "p+h"
    });
    __publicField(this, "building", { title: "", children: [] });
    __publicField(this, "built", []);
    __publicField(this, "afterBR", false);
    this.model = model;
    if (options) this.options = Object.assign({}, this.options, options);
  }
  end() {
    trace$1("end");
    this.endGroup();
    return this.built.filter((group) => group.children.length > 0);
  }
  endGroup(titleForNextGroup) {
    trace$1("endGroup", { titleForNextGroup });
    this.built.push(this.building);
    this.building = { title: titleForNextGroup ?? "", children: [] };
  }
  parseChildren(node) {
    var _a, _b;
    for (const child of node.childNodes) {
      switch (child.nodeType) {
        case Node.ELEMENT_NODE:
          const el = child;
          this.parseElement(el);
          break;
        case Node.TEXT_NODE:
          const text = (_a = child.nodeValue) == null ? void 0 : _a.trim();
          if (!text) continue;
          trace$1("text_node", { text });
          this.afterBR = false;
          if (["h", "p+h"].includes(this.options.splitOn)) {
            const header = text.match(MARKDOWN_HEADER_RE);
            if (header) {
              trace$1("text_node found header", header);
              this.endGroup((_b = header[1]) == null ? void 0 : _b.trim());
            }
          }
          for (const link of extractURLs(text)) {
            trace$1("text_node found url", link);
            this.building.children.push(link);
          }
          break;
      }
    }
  }
  parseElement(el) {
    trace$1("parsing", el.localName, el);
    switch (el.localName) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        if (["h", "p+h"].includes(this.options.splitOn)) {
          this.endGroup(el.textContent ?? void 0);
        } else {
          this.parseChildren(el);
        }
        break;
      case "p":
        this.parseChildren(el);
        if (this.options.splitOn === "p+h") this.endGroup();
        break;
      case "br":
        if (this.afterBR) {
          if (this.options.splitOn === "p+h") this.endGroup();
          this.afterBR = false;
        } else {
          this.afterBR = true;
        }
        this.parseChildren(el);
        break;
      case "a":
        const a = el;
        if (a.href && a.innerText.trim()) {
          this.building.children.push({
            url: a.href,
            title: a.innerText.trim()
          });
        } else {
          this.parseChildren(el);
        }
        break;
      default:
        this.parseChildren(el);
        break;
    }
    if (el.localName !== "br") this.afterBR = false;
  }
}
function* extractURLs(str) {
  const re = new RegExp(URL_WITH_TITLE_RE, "g");
  let m;
  while ((m = re.exec(str)) !== null) {
    const g = m.groups;
    if (g.md_url) yield { url: g.md_url, title: g.md_title };
    else if (g.ot_url) yield { url: g.ot_url, title: g.ot_title };
    else if (g.url) yield { url: g.url };
  }
}
async function importURLs(options) {
  options.task.status = "Importing tabs...";
  options.task.max = 100;
  const groups_rev = options.folders.reverse();
  const urls_in_tree = (f) => flat(
    f.children.map((c) => {
      if ("children" in c) return urls_in_tree(c);
      return [c.url];
    })
  );
  const urlset = new Set(flat(groups_rev.map((g) => urls_in_tree(g))));
  const create_bms_p = options.task.wspawn(25, async (tm) => {
    tm.status = "Creating stash folders...";
    tm.max = groups_rev.length;
    const bm_groups = [];
    for (const g of groups_rev) {
      if (tm.cancelled) break;
      const res = await tm.spawn(async (tm2) => {
        const folder = await options.model.bookmarks.createStashFolder(
          g.title || void 0
        );
        const bookmarks = await options.model.putItemsInFolder({
          items: g.children,
          toFolder: folder,
          task: tm2
        });
        return { folder, bookmarks };
      });
      bm_groups.push(res);
    }
    return {
      bookmarks: flat(
        bm_groups.map(
          (g) => filterMap(g.bookmarks, (bm) => isBookmark(bm) ? bm : void 0)
        )
      ),
      folderIds: bm_groups.map((g) => g.folder.id).filter((id) => id)
    };
  });
  const siteinfo_aiter = options.task.wspawn_iter(50, (tm) => {
    if (options.fetchIconsAndTitles) return fetchInfoForSites(urlset, tm);
    const chan = new AsyncChannel();
    chan.close();
    return chan;
  });
  const update_p = options.task.wspawn(25, async (tm) => {
    var _a;
    tm.status = "Updating bookmarks...";
    const { bookmarks, folderIds } = await create_bms_p;
    const bms_by_url = /* @__PURE__ */ new Map();
    tm.max = bookmarks.length;
    for (const bm of bookmarks) {
      const v = bms_by_url.get(bm.url);
      if (v) {
        v.push(bm);
      } else {
        bms_by_url.set(bm.url, [bm]);
      }
    }
    for await (const siteinfo of siteinfo_aiter) {
      if (siteinfo.error) {
        options.task.cancel();
        tm.cancel();
        alert(
          "Seems like an error occurred during the import.  We were trying to import the following URL:\n\n" + siteinfo.originalUrl + "\n\nThe error was:\n\n" + siteinfo.error + "\n" + ((_a = siteinfo.error) == null ? void 0 : _a.stack) + `

Really sorry about this!  Please let us know by filing a bug with the above error text (see the "Help and Support" menu).  We'll clean up any imported tabs so you can try again.`
        );
      }
      if (tm.cancelled) break;
      const url = siteinfo.finalUrl || siteinfo.originalUrl;
      if (siteinfo.title || siteinfo.finalUrl) {
        const title = siteinfo.title || siteinfo.originalUrl;
        const bms = bms_by_url.get(siteinfo.originalUrl);
        if (!bms) continue;
        for (const bm of bms) {
          await browser.bookmarks.update(bm.id, { url, title });
        }
      }
      options.model.favicons.maybeSet(urlToOpen(url), siteinfo);
      ++tm.value;
    }
    if (tm.cancelled) {
      for (const fid of folderIds) browser.bookmarks.removeTree(fid);
    }
  });
  options.task.onCancel = () => {
    create_bms_p.cancel();
    siteinfo_aiter.cancel();
    update_p.cancel();
  };
  await update_p;
}
function flat(a) {
  return a.reduce((a2, v) => a2.concat(v), []);
}
const _sfc_main$c = defineComponent({
  components: { Dialog, ProgressDialog },
  emits: ["close"],
  data: () => ({
    cancel: void 0,
    progress: void 0,
    splitOn: "p+h",
    fetchIconsAndTitles: true
  }),
  mounted() {
    this.$refs.data.focus();
  },
  methods: {
    start() {
      the.model.attempt(async () => {
        const folders = parse(this.$refs.data, the.model, {
          splitOn: this.splitOn
        });
        try {
          const task = TaskMonitor.run(
            (task2) => importURLs({
              model: the.model,
              folders,
              fetchIconsAndTitles: this.fetchIconsAndTitles,
              task: task2
            })
          );
          this.cancel = () => task.cancel();
          this.progress = task.progress;
          await task;
        } finally {
          this.cancel = void 0;
          this.progress = void 0;
          this.$emit("close");
        }
      });
    }
  }
});
const dlg = "_dlg_qojk7_2";
const style0 = {
  dlg
};
const _hoisted_1$a = {
  ref: "data",
  contenteditable: "true",
  id: "data",
  class: "input"
};
const _hoisted_2$7 = { for: "splitOn" };
const _hoisted_3$5 = { for: "fetchIconsAndTitles" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ProgressDialog = resolveComponent("ProgressDialog");
  const _component_Dialog = resolveComponent("Dialog");
  return _ctx.progress ? (openBlock(), createBlock(_component_ProgressDialog, {
    key: 0,
    progress: _ctx.progress,
    cancel: _ctx.cancel
  }, null, 8, ["progress", "cancel"])) : (openBlock(), createBlock(_component_Dialog, {
    key: 1,
    class: normalizeClass({ [_ctx.$style.dlg]: true, "import-dialog": true }),
    onClose: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("close")),
    "show-close-button": ""
  }, {
    title: withCtx(() => _cache[4] || (_cache[4] = [
      createTextVNode("Import")
    ])),
    buttons: withCtx(() => [
      createBaseVNode("button", {
        class: "clickme",
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.start && _ctx.start(...args))
      }, "Import")
    ]),
    default: withCtx(() => [
      _cache[8] || (_cache[8] = createBaseVNode("label", { for: "data" }, " Paste anything containing links or URLs here. Links and URLs will be extracted and converted into bookmarks in your stash. ", -1)),
      createBaseVNode("div", _hoisted_1$a, null, 512),
      createBaseVNode("section", null, [
        createBaseVNode("label", _hoisted_2$7, [
          _cache[6] || (_cache[6] = createBaseVNode("span", null, "Split tabs into different groups on:", -1)),
          withDirectives(createBaseVNode("select", {
            id: "splitOn",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.splitOn = $event)
          }, _cache[5] || (_cache[5] = [
            createBaseVNode("option", { value: "p+h" }, "Paragraphs and Headers", -1),
            createBaseVNode("option", { value: "h" }, "Headers", -1),
            createBaseVNode("option", { value: "" }, "Nothing [all in one group]", -1)
          ]), 512), [
            [vModelSelect, _ctx.splitOn]
          ])
        ])
      ]),
      createBaseVNode("section", null, [
        createBaseVNode("label", _hoisted_3$5, [
          withDirectives(createBaseVNode("input", {
            type: "checkbox",
            id: "fetchIconsAndTitles",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.fetchIconsAndTitles = $event)
          }, null, 512), [
            [vModelCheckbox, _ctx.fetchIconsAndTitles]
          ]),
          _cache[7] || (_cache[7] = createBaseVNode("span", null, "Fetch icons and titles from each site", -1))
        ])
      ])
    ]),
    _: 1
  }, 8, ["class"]));
}
const cssModules = {
  "$style": style0
};
const ImportDialog = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$7], ["__cssModules", cssModules]]);
const trace = trace_fn("dnd-list");
let sourceList = void 0;
let destList = void 0;
let dropTask = void 0;
const ghostSize = ref(void 0);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "dnd-list",
  props: {
    is: {},
    itemIs: {},
    itemKey: { type: Function },
    itemClass: { type: Function },
    accepts: {},
    modelValue: {},
    drag: { type: Function },
    drop: { type: Function },
    orientation: {},
    ghostDisplacesItems: { type: Boolean },
    ghostMimicsWidth: { type: Boolean },
    ghostMimicsHeight: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const $top = ref(void 0);
    const $dndElements = ref([]);
    const state = reactive({
      modelValue: computed(() => props.modelValue),
      modelSnapshot: void 0,
      draggingFromIndex: void 0,
      droppingToIndex: void 0
    });
    const ghostStyle = computed(() => {
      const s = ghostSize.value;
      if (!s) return void 0;
      let style = "";
      if (props.ghostMimicsWidth) style += `width: ${s.width}px; `;
      if (props.ghostMimicsHeight) style += `height: ${s.height}px; `;
      return style || void 0;
    });
    const displayItems = computed(() => {
      return state.modelSnapshot ?? props.modelValue;
    });
    function itemClassFor(item, index) {
      const classes = props.itemClass ? props.itemClass(item, index) : {};
      classes.dragging = state.draggingFromIndex === index;
      return classes;
    }
    function dndElement(ev) {
      if (!($dndElements.value instanceof Array)) return;
      let t = ev.target;
      while (t instanceof HTMLElement) {
        if ($dndElements.value.includes(t)) return t;
        t = t.parentElement;
      }
      return void 0;
    }
    function enableDrag(ev) {
      const el = dndElement(ev);
      if (el) el.draggable = true;
    }
    function disableDrag(ev) {
      const el = dndElement(ev);
      if (el) el.draggable = false;
    }
    function itemDragStart(ev, index) {
      const dndEl = dndElement(ev);
      disableDrag(ev);
      ev.stopPropagation();
      if (dropTask) {
        ev.preventDefault();
        return;
      }
      trace("dragStart", index, props.modelValue[index]);
      props.drag({
        dataTransfer: ev.dataTransfer,
        fromIndex: index,
        value: props.modelValue[index]
      });
      setTimeout(() => {
        if (!dndEl) return;
        const rect = dndEl.getBoundingClientRect();
        ghostSize.value = { width: rect.width, height: rect.height };
        state.draggingFromIndex = index;
        sourceList = state;
        state.droppingToIndex = index;
        destList = state;
      });
    }
    function itemDragEnd() {
      if (dropTask) return;
      trace("dragEnd");
      if (sourceList) sourceList.draggingFromIndex = void 0;
      sourceList = void 0;
      if (destList) destList.droppingToIndex = void 0;
      destList = void 0;
      ghostSize.value = void 0;
    }
    function itemDragEnter(ev, index) {
      if (!allowDropHere(ev)) return;
      const el = dndElement(ev);
      if (el) {
        const rect = el.getBoundingClientRect();
        ghostSize.value = { width: rect.width, height: rect.height };
      }
      index = desiredDropPosition(ev, index);
      moveGhost(index);
    }
    function itemDragOver(ev, index) {
      if (!allowDropHere(ev)) return;
      trace("itemDragOver", ev.target, index);
      index = desiredDropPosition(ev, index);
      moveGhost(index);
    }
    function parentDragEnter(ev) {
      if (ev.target && ev.target !== $top.value) return;
      if (props.ghostDisplacesItems) return;
      if (!allowDropHere(ev)) return;
      moveGhost(displayItems.value.length);
    }
    function parentDragExit(ev) {
      if (ev.target && ev.target !== $top.value) return;
      if (!allowDropHere(ev)) return;
      if (destList && destList !== state) {
        trace("parentDragExit", "clearing destList", ev);
        destList.droppingToIndex = void 0;
        destList = void 0;
      }
    }
    function parentDragOver(ev) {
      allowDropHere(ev);
    }
    function ghostDragEnter(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    function ghostDragOver(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    function allowDropHere(ev) {
      if (!ev.dataTransfer) return false;
      const types = ev.dataTransfer.types;
      if (props.accepts instanceof Array) {
        if (!types.find((t) => props.accepts.includes(t))) return false;
      } else if (props.accepts) {
        if (!types.includes(props.accepts)) return false;
      } else {
        return false;
      }
      ev.preventDefault();
      ev.stopPropagation();
      return true;
    }
    function desiredDropPosition(ev, hoveredIndex) {
      let index = hoveredIndex;
      if (props.ghostDisplacesItems) {
        if (state.droppingToIndex !== void 0 && state.droppingToIndex <= index) {
          index++;
        }
      } else {
        const rect = ev.currentTarget.getBoundingClientRect();
        switch (props.orientation) {
          case "horizontal":
            if (ev.offsetX > rect.width / 2) index++;
            break;
          case "vertical":
            if (ev.offsetY > rect.height / 2) index++;
            break;
        }
      }
      index = Math.min(index, displayItems.value.length);
      trace("desiredDropPosition", hoveredIndex, "->", index);
      return index;
    }
    function moveGhost(index) {
      if (destList && destList !== state) {
        destList.droppingToIndex = void 0;
      }
      destList = state;
      state.droppingToIndex = index;
      trace("moveGhost", index, destList);
    }
    function doDrop(ev) {
      if (!allowDropHere(ev)) return;
      if (!destList) return;
      ev.stopPropagation();
      console.assert(destList === state);
      console.assert(destList.droppingToIndex !== void 0);
      const drop_ev = {
        dataTransfer: ev.dataTransfer,
        toIndex: destList.droppingToIndex
      };
      dropTask = drop_ev;
      if (sourceList) {
        sourceList.modelSnapshot = Array.from(sourceList.modelValue);
      }
      state.modelSnapshot = Array.from(props.modelValue);
      trace("drop", "start", sourceList, destList);
      props.drop(drop_ev).then(() => nextTick(), console.error).finally(() => {
        trace("drop", "end");
        if (sourceList) {
          sourceList.modelSnapshot = void 0;
          sourceList.draggingFromIndex = void 0;
          sourceList = void 0;
        }
        if (destList) {
          destList.modelSnapshot = void 0;
          destList.droppingToIndex = void 0;
          destList = void 0;
        }
        dropTask = void 0;
        ghostSize.value = void 0;
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.is || "ul"), {
        class: normalizeClass({ "dnd-list": true, "dnd-list-empty": displayItems.value.length === 0 }),
        ref_key: "$top",
        ref: $top,
        onDragenter: parentDragEnter,
        onDragleave: parentDragExit,
        onDragexit: parentDragExit,
        onDragover: parentDragOver,
        onDrop: doDrop
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(displayItems.value, (item, index) => {
            return openBlock(), createElementBlock(Fragment, {
              key: _ctx.itemKey(item)
            }, [
              index === state.droppingToIndex ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.itemIs || "li"), {
                key: 0,
                style: normalizeStyle(ghostStyle.value),
                class: "dnd-list-ghost dropping-here",
                "data-key": _ctx.itemKey(item),
                onDragenter: ghostDragEnter,
                onDragover: _cache[0] || (_cache[0] = ($event) => ghostDragOver($event)),
                onDrop: doDrop
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "ghost")
                ]),
                _: 2
              }, 1064, ["style", "data-key"])) : createCommentVNode("", true),
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.itemIs || "li"), {
                class: normalizeClass(itemClassFor(item, index)),
                "data-key": _ctx.itemKey(item),
                ref_for: true,
                ref_key: "$dndElements",
                ref: $dndElements,
                onMousedown: withModifiers(enableDrag, ["stop"]),
                onMouseup: withModifiers(disableDrag, ["stop"]),
                onDragstart: ($event) => itemDragStart($event, index),
                onDragend: itemDragEnd,
                onDragenter: ($event) => itemDragEnter($event, index),
                onDragover: ($event) => itemDragOver($event, index),
                onDrop: doDrop
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "item", { item })
                ]),
                _: 2
              }, 1064, ["class", "data-key", "onDragstart", "onDragenter", "onDragover"]))
            ], 64);
          }), 128)),
          state.droppingToIndex === displayItems.value.length ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.itemIs || "li"), {
            key: 0,
            style: normalizeStyle(ghostStyle.value),
            class: "dnd-list-ghost dropping-here",
            onDragenter: ghostDragEnter,
            onDragover: _cache[1] || (_cache[1] = ($event) => ghostDragOver($event)),
            onDrop: doDrop
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "ghost")
            ]),
            _: 3
          }, 40, ["style"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 40, ["class"]);
    };
  }
});
const _hoisted_1$9 = ["placeholder", "disabled", "onKeyup"];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "async-text-input",
  props: {
    save: { type: Function },
    value: {},
    defaultValue: {}
  },
  emits: ["save", "cancel", "done"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const state = shallowReactive({
      dirtyValue: props.value,
      saving: void 0
    });
    const $input = ref();
    onMounted(() => {
      if ($input.value) {
        $input.value.focus();
        $input.value.select();
      }
    });
    function commit() {
      if (state.saving) return;
      if (state.dirtyValue === props.value) {
        cancel();
        return;
      }
      state.saving = props.save(state.dirtyValue).then(
        () => {
          const v = state.dirtyValue;
          state.dirtyValue = props.value;
          state.saving = void 0;
          emit("save", v);
          emit("done", v);
        },
        () => {
          state.saving = void 0;
        }
      );
    }
    function cancel() {
      if (state.saving) return;
      state.dirtyValue = props.value;
      emit("cancel");
      emit("done");
    }
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("input", {
        ref_key: "$input",
        ref: $input,
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(state).dirtyValue = $event),
        placeholder: _ctx.defaultValue,
        disabled: !!unref(state).saving,
        onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["stop"])),
        onMouseup: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["stop"])),
        onClick: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["stop"])),
        onAuxclick: _cache[4] || (_cache[4] = withModifiers(() => {
        }, ["stop"])),
        onKeydown: _cache[5] || (_cache[5] = withModifiers(() => {
        }, ["stop"])),
        onKeyup: [
          _cache[6] || (_cache[6] = withModifiers(() => {
          }, ["stop"])),
          withKeys(withModifiers(commit, ["prevent", "stop"]), ["enter"]),
          withKeys(withModifiers(cancel, ["prevent", "stop"]), ["esc"])
        ],
        onKeypress: _cache[7] || (_cache[7] = withModifiers(() => {
        }, ["stop"])),
        onBlur: commit
      }, null, 40, _hoisted_1$9)), [
        [vModelText, unref(state).dirtyValue]
      ]);
    };
  }
});
const _hoisted_1$8 = ["aria-label"];
const _hoisted_2$6 = { class: "forest-title status-text" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "show-filtered-item",
  props: {
    visible: { type: Boolean },
    count: {}
  },
  emits: ["update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "forest-item selectable",
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => emit("update:visible", !props.visible), ["prevent", "stop"]))
      }, [
        createBaseVNode("span", {
          class: normalizeClass({
            "forest-icon": true,
            "item-icon": true,
            "icon-filtered-visible": props.visible,
            "icon-filtered-hidden": !props.visible,
            "status-text": true
          }),
          "aria-label": props.visible ? "Showing" : "Hiding"
        }, null, 10, _hoisted_1$8),
        createBaseVNode("span", _hoisted_2$6, toDisplayString(_ctx.count) + " filtered", 1)
      ]);
    };
  }
});
const _sfc_main$8 = defineComponent({
  components: { ItemIcon: _sfc_main$i, AsyncTextInput: _sfc_main$a },
  props: {
    bookmark: required(Object)
  },
  computed: {
    altkey: altKeyName,
    bgKey: bgKeyName,
    filterInfo() {
      return the.model.filter.info(this.bookmark);
    },
    selectionInfo() {
      return the.model.selection.info(this.bookmark);
    },
    relatedTabs() {
      const tab_model = the.model.tabs;
      const target_window = tab_model.targetWindow.value;
      return Array.from(tab_model.tabsWithURL(this.bookmark.url)).filter(
        (t) => {
          var _a;
          return ((_a = t.position) == null ? void 0 : _a.parent) === target_window;
        }
      );
    },
    related_container_color() {
      const containers = the.model.containers;
      const container_color = this.relatedTabs.reduce(
        (prev, t) => {
          var _a;
          if (t.hidden || prev === null || t.cookieStoreId === void 0)
            return prev;
          const cc = (_a = containers.container(t.cookieStoreId)) == null ? void 0 : _a.color;
          if (!cc) return prev;
          return prev === void 0 || cc === prev ? cc : null;
        },
        void 0
      );
      return container_color ?? void 0;
    },
    tabState() {
      let open = false, active = false, loading = false;
      let discarded = 0;
      let title = void 0;
      for (const t of this.relatedTabs) {
        if (!t.hidden && t.discarded) discarded++;
        open = open || !t.hidden;
        active = active || t.active;
        loading = loading || t.status === "loading";
        if (t.title) title = t.title;
      }
      const tl = this.relatedTabs.length;
      return {
        open: !!open,
        active: !!active,
        loading: !!loading,
        discarded: tl > 0 && discarded === tl,
        title
      };
    },
    defaultTitle() {
      var _a;
      const url = urlToOpen(this.bookmark.url);
      const favicon = the.model.favicons.get(url);
      return this.tabState.title ?? ((_a = favicon == null ? void 0 : favicon.value) == null ? void 0 : _a.title) ?? this.bookmark.title;
    },
    favicon() {
      if (!this.bookmark.url) return "";
      const url = urlToOpen(this.bookmark.url);
      return the.model.favicons.getFavIconUrl(url);
    }
  },
  data: () => ({
    isRenaming: false
  }),
  methods: {
    select(ev) {
      the.model.attempt(async () => {
        the.model.selection.toggleSelectFromEvent(ev, this.bookmark);
      });
    },
    open(ev) {
      the.model.attempt(async () => {
        this.$refs.link.blur();
        if (!this.bookmark.url) return;
        const bg = bgKeyPressed(ev);
        await the.model.restoreTabs([this.bookmark], { background: bg });
      });
    },
    remove() {
      the.model.attempt(async () => {
        await the.model.deleteBookmark(this.bookmark);
      });
    },
    closeOrHideOrOpen(ev) {
      the.model.attempt(async () => {
        const openTabs = this.relatedTabs.filter((t) => !t.hidden);
        this.$refs.link.blur();
        if (openTabs.length < 1) {
          if (!this.bookmark.url) return;
          return await the.model.restoreTabs([this.bookmark], {
            background: true
          });
        }
        await the.model.hideOrCloseStashedTabs(openTabs);
      });
    },
    openRemove(ev) {
      the.model.attempt(async () => {
        if (!this.bookmark.url) return;
        const bg = bgKeyPressed(ev);
        await the.model.restoreTabs([this.bookmark], {
          background: bg,
          beforeClosing: () => the.model.deleteBookmark(this.bookmark)
        });
      });
    },
    rename(newName) {
      return the.model.attempt(async () => {
        await the.model.bookmarks.rename(
          this.bookmark,
          newName || this.defaultTitle
        );
      });
    }
  }
});
const _hoisted_1$7 = ["title", "data-container-color"];
const _hoisted_2$5 = ["href"];
const _hoisted_3$4 = ["title"];
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_item_icon = resolveComponent("item-icon");
  const _component_async_text_input = resolveComponent("async-text-input");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "action-container": true,
      "forest-item": true,
      selectable: true,
      discarded: _ctx.tabState.discarded,
      open: _ctx.tabState.open,
      active: _ctx.tabState.active,
      loading: _ctx.tabState.loading,
      selected: _ctx.selectionInfo.isSelected,
      "no-match": !_ctx.filterInfo.isMatching
    }),
    title: _ctx.bookmark.title,
    "data-container-color": _ctx.related_container_color
  }, [
    createVNode(_component_item_icon, {
      class: normalizeClass({
        "forest-icon": true,
        action: true,
        select: true
      }),
      "default-icon": "tab",
      src: !_ctx.selectionInfo.isSelected ? _ctx.favicon : "",
      selectable: "",
      selected: _ctx.selectionInfo.isSelected,
      onClick: withModifiers(_ctx.select, ["prevent", "stop"])
    }, null, 8, ["src", "selected", "onClick"]),
    !_ctx.isRenaming ? (openBlock(), createElementBlock("a", {
      key: 0,
      class: "forest-title",
      href: _ctx.bookmark.url,
      target: "_blank",
      draggable: "false",
      ref: "link",
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.open && _ctx.open(...args), ["left", "prevent", "stop"])),
      onAuxclick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.closeOrHideOrOpen && _ctx.closeOrHideOrOpen(...args), ["middle", "exact", "prevent", "stop"]))
    }, toDisplayString(_ctx.bookmark.title), 41, _hoisted_2$5)) : (openBlock(), createBlock(_component_async_text_input, {
      key: 1,
      class: "forest-title editable",
      value: _ctx.bookmark.title,
      defaultValue: _ctx.defaultTitle,
      save: _ctx.rename,
      onDone: _cache[2] || (_cache[2] = ($event) => _ctx.isRenaming = false)
    }, null, 8, ["value", "defaultValue", "save"])),
    !_ctx.isRenaming ? withMemo([_ctx.isRenaming], () => (openBlock(), createElementBlock("nav", {
      key: 2,
      class: "action-group forest-toolbar"
    }, [
      createBaseVNode("a", {
        class: "action rename",
        title: "Rename",
        onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.isRenaming = true, ["prevent", "stop"]))
      }),
      createBaseVNode("a", {
        class: "action restore-remove",
        title: `Open this tab and delete it from the group (hold ${_ctx.bgKey} to open in background)`,
        onClick: _cache[4] || (_cache[4] = withModifiers((...args) => _ctx.openRemove && _ctx.openRemove(...args), ["prevent", "stop"]))
      }, null, 8, _hoisted_3$4),
      createBaseVNode("a", {
        class: "action remove",
        title: "Delete this tab from the group",
        onClick: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.remove && _ctx.remove(...args), ["prevent", "stop"]))
      })
    ])), _cache, 6) : createCommentVNode("", true)
  ], 10, _hoisted_1$7);
}
const Bookmark = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$6]]);
const NATIVE_TYPE = "application/x-tab-stash-dnd-items";
const ACCEPTS = [NATIVE_TYPE];
function sendDragData(dt, items) {
  const data = items.map((i) => {
    if (isNode(i)) return { node: i.id };
    if (isTab(i)) return { tab: i.id };
    if (isWindow(i)) return { window: i.id };
    throw new Error(`Trying to drag unrecognized model item: ${i}`);
  });
  dt.setData(NATIVE_TYPE, JSON.stringify(data));
  dt.effectAllowed = "copyMove";
}
function recvDragData(dt, model) {
  const blob = dt.getData(NATIVE_TYPE);
  let data;
  try {
    data = JSON.parse(blob);
    if (!(data instanceof Array)) return [];
  } catch (e) {
    data = [];
  }
  const ret = filterMap(data, (i) => {
    if (typeof i !== "object" || i === null) return void 0;
    if ("node" in i && typeof i.node === "string") {
      return model.bookmarks.node(i.node);
    }
    if ("window" in i && typeof i.window === "number") {
      return model.tabs.window(i.window);
    }
    if ("tab" in i && typeof i.tab === "number") {
      return model.tabs.tab(i.tab);
    }
    return void 0;
  });
  if (dt.dropEffect === "copy") return copying(ret);
  return ret;
}
const _sfc_main$7 = defineComponent({
  name: "child-folder",
  components: {
    AsyncTextInput: _sfc_main$a,
    ButtonBox,
    DndList: _sfc_main$b,
    Bookmark,
    ItemIcon: _sfc_main$i,
    Menu,
    ShowFilteredItem: _sfc_main$9,
    LoadMore
  },
  props: {
    folder: required(Object),
    isToplevel: Boolean
  },
  data: () => ({
    isRenaming: false,
    isVisible: false
  }),
  computed: {
    altKey: altKeyName,
    bgKey: bgKeyName,
    accepts() {
      return ACCEPTS;
    },
    filterInfo() {
      return the.model.filter.info(this.folder);
    },
    selectionInfo() {
      return the.model.selection.info(this.folder);
    },
    showFiltered: {
      get() {
        let f = the.model.showFilteredChildren.get(this.folder);
        if (!f) {
          f = ref(false);
          the.model.showFilteredChildren.set(this.folder, f);
        }
        return f.value;
      },
      set(v) {
        let f = the.model.showFilteredChildren.get(this.folder);
        if (!f) {
          f = ref(false);
          the.model.showFilteredChildren.set(this.folder, f);
        }
        f.value = v;
      }
    },
    metadata() {
      return the.model.bookmark_metadata.get(this.folder.id);
    },
    targetWindow() {
      return the.model.tabs.targetWindow.value;
    },
    childrenWithTabs() {
      const tab_model = the.model.tabs;
      return this.children.map((n) => ({
        node: n,
        tabs: isBookmark(n) && n.url ? Array.from(tab_model.tabsWithURL(n.url)).filter(
          (t) => {
            var _a;
            return ((_a = t.position) == null ? void 0 : _a.parent) === this.targetWindow;
          }
        ) : []
      }));
    },
    childTabStats() {
      var _a;
      let open = 0, discarded = 0, hidden = 0;
      for (const nwt of this.childrenWithTabs) {
        for (const tab of nwt.tabs) {
          if (((_a = tab.position) == null ? void 0 : _a.parent) !== this.targetWindow) {
            continue;
          }
          if (tab.hidden) {
            hidden += 1;
          } else if (tab.discarded) {
            discarded += 1;
          } else {
            open += 1;
          }
        }
      }
      return { open, discarded, hidden };
    },
    openTabsCount() {
      return this.childTabStats.open + this.childTabStats.discarded;
    },
    collapsed: {
      get() {
        if (this.metadata.value === void 0) {
          return the.model.options.sync.state.show_new_folders === "collapsed";
        }
        return !!this.metadata.value.collapsed;
      },
      set(collapsed) {
        the.model.bookmark_metadata.setCollapsed(this.metadata.key, collapsed);
      }
    },
    // Used to populate a menu of tabs to select for stashing here
    unstashedOrOpenTabs() {
      const target_win = the.model.tabs.targetWindow.value;
      if (!target_win) return [];
      return target_win.children.filter(
        (t) => !t.pinned && !t.hidden && the.model.isURLStashable(t.url) && (!the.model.bookmarks.isURLLoadedInStash(t.url) || the.model.options.sync.state.show_open_tabs !== "unstashed")
      ).map((tab) => ({
        tab,
        stashedIn: the.model.bookmarks.loadedFoldersInStashWithURL(tab.url).map((f) => friendlyFolderName(f.title))
      }));
    },
    /** Returns a "default" name to use if no explicit name is set.  This
     * default is typically a timestamp with one of two sources--if the
     * folder has a title that looks like a "default" title, we use that.
     * Otherwise we generate the default name from the folder's creation
     * time.
     *
     * This approach handles unnamed folders which were synced from
     * elsewhere and thus have a creation time that isn't their actual
     * creation time. */
    defaultTitle() {
      const unfiltered = this.folder;
      if (getDefaultFolderNameISODate(unfiltered.title) !== null) {
        return friendlyFolderName(unfiltered.title);
      } else {
        return `Saved ${new Date(unfiltered.dateAdded || 0).toLocaleString()}`;
      }
    },
    nonDefaultTitle() {
      return getDefaultFolderNameISODate(this.folder.title) !== null ? "" : this.folder.title;
    },
    title() {
      return friendlyFolderName(this.folder.title);
    },
    tooltip() {
      const bm_stats = this.folder.$stats;
      const st = this.childTabStats;
      const statstip = `${bm_stats.folderCount} child group${bm_stats.folderCount !== 1 ? "s" : ""}, ${bm_stats.bookmarkCount} stashed tab${bm_stats.bookmarkCount != 1 ? "s" : ""} (${st.open} open, ${st.discarded} unloaded, ${st.hidden} hidden)`;
      return `${this.title}
${statstip}`;
    },
    children() {
      if (this.folder.isLoaded) return this.folder.children;
      return [];
    },
    leafChildren() {
      return filterMap(this.children, (c) => isBookmark(c) ? c : void 0);
    },
    selectedCount() {
      return the.model.selection.selectedCount.value;
    },
    canMoveIntoFolder() {
      return !the.model.selection.isSelfOrParentSelected(this.folder);
    }
  },
  methods: {
    attempt(fn) {
      return the.model.attempt(fn);
    },
    async loadMore() {
      this.isVisible = true;
      await the.model.bookmarks.loaded(this.folder);
    },
    isFolder,
    isBookmark,
    toggleCollapsed(ev) {
      var _a;
      if (!ev.altKey) {
        this.collapsed = !this.collapsed;
        return;
      }
      const folders = filterMap(
        this.children,
        (c) => "children" in c ? c : void 0
      );
      if (folders.length === 0) return;
      const collapsed = ((_a = the.model.bookmark_metadata.get(folders[0].id).value) == null ? void 0 : _a.collapsed) || false;
      for (const f of folders) {
        the.model.bookmark_metadata.setCollapsed(f.id, !collapsed);
      }
    },
    select(ev) {
      the.model.attempt(async () => {
        the.model.selection.toggleSelectFromEvent(ev, this.folder);
      });
    },
    isChildVisible(node) {
      const fi = the.model.filter.info(node);
      const si = the.model.selection.info(node);
      return this.isValidChild(node) && (this.showFiltered || fi.hasMatchInSubtree || si.isSelected || si.hasSelectionInSubtree);
    },
    isValidChild(node) {
      return "url" in node || "children" in node;
    },
    stash(ev) {
      const win = the.model.tabs.targetWindow.value;
      if (!win) return;
      the.model.attempt(
        async () => await the.model.putItemsInFolder({
          items: copyIf(ev.altKey, the.model.stashableTabsInWindow(win)),
          toFolder: this.folder
        })
      );
    },
    stashOne(ev) {
      const tab = the.model.tabs.activeTab();
      if (!tab) return;
      this.stashSpecificTab(ev, tab);
    },
    stashSpecificTab(ev, tab) {
      this.attempt(async () => {
        await the.model.putItemsInFolder({
          items: copyIf(ev.altKey, [tab]),
          toFolder: this.folder
        });
      });
    },
    moveSelfToTopLevel() {
      this.attempt(async () => {
        const model = the.model.bookmarks;
        const root = model.stash_root.value;
        const rootPos = pathTo(this.folder).find(
          (p) => p.parent === root
        );
        await model.move(this.folder, root, (rootPos == null ? void 0 : rootPos.index) ?? 0);
      });
    },
    moveSelfToChild() {
      this.attempt(async () => {
        const model = the.model.bookmarks;
        const pos = this.folder.position;
        const newParent = await model.createFolder({
          // We give the parent a default name so it will go away automatically
          // when emptied.
          title: genDefaultFolderName(/* @__PURE__ */ new Date()),
          parent: model.stash_root.value,
          index: pos.index
        });
        await model.move(this.folder, newParent, 0);
      });
    },
    move(ev) {
      const win_id = the.model.tabs.targetWindow.value;
      if (!win_id) return;
      the.model.attempt(
        () => the.model.putSelectedInFolder({ copy: ev.altKey, toFolder: this.folder })
      );
    },
    moveToChild(ev) {
      const win_id = the.model.tabs.targetWindow.value;
      if (!win_id) return;
      the.model.attempt(async () => {
        const f = await the.model.bookmarks.createFolder({
          parent: this.folder,
          title: genDefaultFolderName(/* @__PURE__ */ new Date())
        });
        await the.model.putSelectedInFolder({ copy: ev.altKey, toFolder: f });
      });
    },
    restoreAll(ev) {
      this.attempt(async () => {
        await the.model.restoreTabs(this.leafChildren, {
          background: bgKeyPressed(ev)
        });
      });
    },
    remove() {
      this.attempt(async () => {
        await the.model.deleteBookmarkTree(this.folder);
      });
    },
    restoreAndRemove(ev) {
      this.attempt(async () => {
        const bg = bgKeyPressed(ev);
        await the.model.restoreTabs(this.leafChildren, {
          background: bg,
          beforeClosing: () => this.leafChildren.length === this.folder.children.length ? the.model.deleteBookmarkTree(this.folder) : the.model.deleteItems(this.leafChildren)
        });
      });
    },
    rename(title) {
      return this.attempt(async () => {
        if (title === "") {
          if (getDefaultFolderNameISODate(this.folder.title) !== null) {
            return;
          }
          title = genDefaultFolderName(new Date(this.folder.dateAdded || 0));
        }
        await the.model.bookmarks.rename(this.folder, title);
      });
    },
    newChildFolder() {
      return this.attempt(async () => {
        await the.model.bookmarks.create({
          parentId: this.folder.id,
          title: genDefaultFolderName(/* @__PURE__ */ new Date())
        });
      });
    },
    stashToNewChildFolder(ev) {
      this.attempt(async () => {
        if (the.model.tabs.targetWindow.value === void 0) return;
        await the.model.stashAllTabsInWindow(
          the.model.tabs.targetWindow.value,
          { copy: ev.altKey, parent: this.folder, position: "bottom" }
        );
      });
    },
    closeStashedTabs() {
      return this.attempt(async () => {
        const openTabs = this.childrenWithTabs.flatMap((c) => c.tabs).filter((t) => !t.hidden && !t.pinned);
        await the.model.hideOrCloseStashedTabs(openTabs);
      });
    },
    drag(ev) {
      const items = the.model.selection.info(ev.value).isSelected ? Array.from(the.model.selection.selectedItems()) : [ev.value];
      sendDragData(ev.dataTransfer, items);
    },
    async drop(ev) {
      const items = recvDragData(ev.dataTransfer, the.model);
      await the.model.attempt(
        () => the.model.putItemsInFolder({
          items,
          toFolder: this.folder,
          toIndex: ev.toIndex,
          allowDuplicates: true
        })
      );
    }
  }
});
const _hoisted_1$6 = ["title"];
const _hoisted_2$4 = ["title"];
const _hoisted_3$3 = ["title"];
const _hoisted_4$3 = ["title"];
const _hoisted_5$3 = ["title"];
const _hoisted_6$2 = { class: "menu-item disabled status-text" };
const _hoisted_7$2 = { class: "menu-scrollable-list" };
const _hoisted_8$1 = ["href", "title", "onClick"];
const _hoisted_9 = ["title"];
const _hoisted_10 = ["title"];
const _hoisted_11 = ["title"];
const _hoisted_12 = ["title"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_item_icon = resolveComponent("item-icon");
  const _component_Menu = resolveComponent("Menu");
  const _component_ButtonBox = resolveComponent("ButtonBox");
  const _component_async_text_input = resolveComponent("async-text-input");
  const _component_load_more = resolveComponent("load-more");
  const _component_child_folder = resolveComponent("child-folder");
  const _component_bookmark = resolveComponent("bookmark");
  const _component_dnd_list = resolveComponent("dnd-list");
  const _component_show_filtered_item = resolveComponent("show-filtered-item");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", {
      class: normalizeClass({
        "forest-item": true,
        selectable: true,
        folder: true,
        "action-container": true,
        "has-open-tabs": _ctx.openTabsCount > 0,
        collapsed: _ctx.collapsed,
        selected: _ctx.selectionInfo.isSelected,
        "no-match": !_ctx.filterInfo.isMatching,
        "has-matching-children": _ctx.filterInfo.hasMatchInSubtree
      })
    }, [
      !_ctx.isToplevel ? (openBlock(), createBlock(_component_item_icon, {
        key: 0,
        class: normalizeClass({
          "forest-icon": true,
          action: true,
          select: true
        }),
        "default-icon": "folder",
        selectable: "",
        selected: _ctx.selectionInfo.isSelected,
        onClick: withModifiers(_ctx.select, ["prevent", "stop"])
      }, null, 8, ["selected", "onClick"])) : createCommentVNode("", true),
      createBaseVNode("a", {
        class: normalizeClass({
          "forest-collapse": true,
          action: true,
          collapse: !_ctx.collapsed,
          expand: _ctx.collapsed
        }),
        title: `Hide the tabs for this group (hold ${_ctx.altKey} to hide tabs for child groups)`,
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.toggleCollapsed && _ctx.toggleCollapsed(...args), ["prevent", "stop"]))
      }, null, 10, _hoisted_1$6),
      !_ctx.isRenaming && _ctx.selectedCount === 0 ? (openBlock(), createBlock(_component_ButtonBox, {
        key: 1,
        class: "forest-toolbar"
      }, {
        default: withCtx(() => [
          createBaseVNode("a", {
            class: "action stash here",
            title: `Stash all (or highlighted) open tabs to this group (hold ${_ctx.altKey} to keep tabs open)`,
            onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.stash && _ctx.stash(...args), ["prevent", "stop"]))
          }, null, 8, _hoisted_2$4),
          createBaseVNode("a", {
            class: "action stash one here",
            title: `Stash the active tab to this group (hold ${_ctx.altKey} to keep tabs open)`,
            onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.stashOne && _ctx.stashOne(...args), ["prevent", "stop"]))
          }, null, 8, _hoisted_3$3),
          createBaseVNode("a", {
            class: "action restore",
            title: `Open all tabs in this group (hold ${_ctx.bgKey} to open in background)`,
            onClick: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.restoreAll && _ctx.restoreAll(...args), ["prevent", "stop"]))
          }, null, 8, _hoisted_4$3),
          createBaseVNode("a", {
            class: "action restore-remove",
            title: (_ctx.folder.$stats.folderCount === 0 ? `Open all tabs and delete this group` : `Open all tabs and remove them from this group`) + ` (hold ${_ctx.bgKey} to open in background)`,
            onClick: _cache[4] || (_cache[4] = withModifiers((...args) => _ctx.restoreAndRemove && _ctx.restoreAndRemove(...args), ["prevent", "stop"]))
          }, null, 8, _hoisted_5$3),
          createVNode(_component_Menu, {
            summaryClass: "action neutral icon-item-menu last-toolbar-button",
            "h-position": "right"
          }, {
            default: withCtx(() => [
              createBaseVNode("button", {
                onClick: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.newChildFolder && _ctx.newChildFolder(...args), ["prevent"])),
                title: `Create a new sub-group within this group`
              }, _cache[17] || (_cache[17] = [
                createBaseVNode("span", { class: "menu-icon icon icon-new-empty-group" }, null, -1),
                createBaseVNode("span", null, "New Child Group", -1)
              ])),
              createBaseVNode("button", {
                onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.stashToNewChildFolder && _ctx.stashToNewChildFolder(...args), ["prevent"])),
                title: "Stash all open tabs to a new child group"
              }, _cache[18] || (_cache[18] = [
                createBaseVNode("span", { class: "menu-icon icon icon-stash" }, null, -1),
                createBaseVNode("span", null, "Stash Tabs to New Child Group", -1)
              ])),
              _cache[24] || (_cache[24] = createBaseVNode("hr", null, null, -1)),
              _ctx.isToplevel ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.moveSelfToChild && _ctx.moveSelfToChild(...args), ["prevent"])),
                title: "Move this group inside a new top-level group"
              }, _cache[19] || (_cache[19] = [
                createBaseVNode("span", { class: "menu-icon icon icon-pop-in" }, null, -1),
                createBaseVNode("span", null, "Convert to Child Group", -1)
              ]))) : (openBlock(), createElementBlock("button", {
                key: 1,
                onClick: _cache[8] || (_cache[8] = withModifiers((...args) => _ctx.moveSelfToTopLevel && _ctx.moveSelfToTopLevel(...args), ["prevent"])),
                title: "Move this group up to the top level"
              }, _cache[20] || (_cache[20] = [
                createBaseVNode("span", { class: "menu-icon icon icon-pop-out" }, null, -1),
                createBaseVNode("span", null, "Convert to Top-Level Group", -1)
              ]))),
              _ctx.unstashedOrOpenTabs.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                _cache[21] || (_cache[21] = createBaseVNode("hr", null, null, -1)),
                createBaseVNode("div", _hoisted_6$2, [
                  createBaseVNode("span", null, 'Stash to "' + toDisplayString(_ctx.title) + '":', 1)
                ]),
                createBaseVNode("ul", _hoisted_7$2, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.unstashedOrOpenTabs, (t) => {
                    return openBlock(), createElementBlock("li", {
                      key: t.tab.id
                    }, [
                      createBaseVNode("a", {
                        href: t.tab.url,
                        title: `Stash tab to this group (hold ${_ctx.altKey} to keep tab open)`,
                        onClick: withModifiers(($event) => _ctx.stashSpecificTab($event, t.tab), ["prevent", "stop"])
                      }, [
                        createVNode(_component_item_icon, {
                          class: "menu-icon",
                          "default-icon": "tab",
                          src: t.tab.favIconUrl
                        }, null, 8, ["src"]),
                        createBaseVNode("span", null, toDisplayString(t.tab.title), 1),
                        t.stashedIn.length > 0 ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: "menu-icon icon icon-stashed status-text",
                          title: ["This tab is stashed in:", ...t.stashedIn].join("\n")
                        }, null, 8, _hoisted_9)) : createCommentVNode("", true)
                      ], 8, _hoisted_8$1)
                    ]);
                  }), 128))
                ])
              ], 64)) : createCommentVNode("", true),
              _cache[25] || (_cache[25] = createBaseVNode("hr", null, null, -1)),
              createBaseVNode("button", {
                onClick: _cache[9] || (_cache[9] = withModifiers((...args) => _ctx.closeStashedTabs && _ctx.closeStashedTabs(...args), ["prevent"])),
                title: `Close any open tabs that are stashed in this group`
              }, _cache[22] || (_cache[22] = [
                createBaseVNode("span", { class: "menu-icon icon icon-delete-stashed" }, null, -1),
                createBaseVNode("span", null, "Close Stashed Tabs", -1)
              ])),
              _cache[26] || (_cache[26] = createBaseVNode("hr", null, null, -1)),
              createBaseVNode("button", {
                title: "Delete the whole group and all its tabs and child groups",
                onClick: _cache[10] || (_cache[10] = withModifiers((...args) => _ctx.remove && _ctx.remove(...args), ["prevent"]))
              }, _cache[23] || (_cache[23] = [
                createBaseVNode("span", { class: "menu-icon icon icon-delete" }, null, -1),
                createBaseVNode("span", null, "Delete Group", -1)
              ]))
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : !_ctx.isRenaming && _ctx.canMoveIntoFolder ? (openBlock(), createBlock(_component_ButtonBox, {
        key: 2,
        class: "forest-toolbar"
      }, {
        default: withCtx(() => [
          createBaseVNode("a", {
            class: "action stash here",
            title: `Move ${_ctx.selectedCount} selected item(s) to this group (hold ${_ctx.altKey} to copy)`,
            onClick: _cache[11] || (_cache[11] = withModifiers((...args) => _ctx.move && _ctx.move(...args), ["prevent", "stop"]))
          }, null, 8, _hoisted_10),
          createBaseVNode("a", {
            class: "action stash newgroup",
            title: `Move ${_ctx.selectedCount} selected item(s) to a new child group (hold ${_ctx.altKey} to copy)`,
            onClick: _cache[12] || (_cache[12] = withModifiers((...args) => _ctx.moveToChild && _ctx.moveToChild(...args), ["prevent", "stop"]))
          }, null, 8, _hoisted_11)
        ]),
        _: 1
      })) : createCommentVNode("", true),
      !_ctx.isRenaming ? (openBlock(), createElementBlock("span", {
        key: 3,
        class: "forest-title editable",
        title: _ctx.tooltip,
        onClick: _cache[13] || (_cache[13] = withModifiers(($event) => _ctx.isRenaming = true, ["stop"]))
      }, toDisplayString(_ctx.title), 9, _hoisted_12)) : (openBlock(), createBlock(_component_async_text_input, {
        key: 4,
        class: "forest-title editable",
        title: _ctx.tooltip,
        value: _ctx.nonDefaultTitle,
        defaultValue: _ctx.defaultTitle,
        save: _ctx.rename,
        onDone: _cache[14] || (_cache[14] = ($event) => _ctx.isRenaming = false)
      }, null, 8, ["title", "value", "defaultValue", "save"]))
    ], 2),
    !_ctx.isVisible || !_ctx.folder.isLoaded ? (openBlock(), createBlock(_component_load_more, {
      key: 0,
      load: _ctx.loadMore,
      "is-fully-loaded": false
    }, null, 8, ["load"])) : (openBlock(), createBlock(_component_dnd_list, {
      key: 1,
      class: normalizeClass({ "forest-children": true, collapsed: _ctx.collapsed }),
      modelValue: _ctx.children,
      "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => _ctx.children = $event),
      "item-key": (item) => item.id,
      accepts: _ctx.accepts,
      drag: _ctx.drag,
      drop: _ctx.drop,
      orientation: "vertical"
    }, {
      item: withCtx(({ item }) => [
        _ctx.isChildVisible(item) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _ctx.isFolder(item) ? (openBlock(), createBlock(_component_child_folder, {
            key: 0,
            folder: item
          }, null, 8, ["folder"])) : _ctx.isBookmark(item) ? (openBlock(), createBlock(_component_bookmark, {
            key: 1,
            bookmark: item
          }, null, 8, ["bookmark"])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["class", "modelValue", "item-key", "accepts", "drag", "drop"])),
    _ctx.filterInfo.nonMatchingCount > 0 ? (openBlock(), createElementBlock("ul", {
      key: 2,
      class: normalizeClass({ "forest-children": true, collapsed: _ctx.collapsed })
    }, [
      createBaseVNode("li", null, [
        createVNode(_component_show_filtered_item, {
          visible: _ctx.showFiltered,
          "onUpdate:visible": _cache[16] || (_cache[16] = ($event) => _ctx.showFiltered = $event),
          count: _ctx.filterInfo.nonMatchingCount
        }, null, 8, ["visible", "count"])
      ])
    ], 2)) : createCommentVNode("", true)
  ], 64);
}
const FolderVue = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$5]]);
const DROP_FORMAT = "application/x-tab-stash-folder-id";
const _sfc_main$6 = defineComponent({
  components: { DndList: _sfc_main$b, Folder: FolderVue, LoadMore },
  props: {
    parentFolder: required(Object)
  },
  computed: {
    accepts() {
      return DROP_FORMAT;
    }
  },
  methods: {
    isFolder,
    isVisible(f) {
      const fi = the.model.filter.info(f);
      const si = the.model.selection.info(f);
      return isFolder(f) && (fi.hasMatchInSubtree || si.hasSelectionInSubtree);
    },
    async loadMore() {
      await the.model.bookmarks.loaded(this.parentFolder);
    },
    drag(ev) {
      ev.dataTransfer.setData(DROP_FORMAT, ev.value.id);
    },
    async drop(ev) {
      const id = ev.dataTransfer.getData(DROP_FORMAT);
      const node = the.model.bookmarks.node(id);
      if (!node) throw new Error(`${id}: No such bookmark node`);
      await the.model.bookmarks.move(node, this.parentFolder, ev.toIndex);
    },
    setCollapsed(c) {
      for (const f of this.$refs.folders) f.collapsed = c;
    }
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_load_more = resolveComponent("load-more");
  const _component_Folder = resolveComponent("Folder");
  const _component_dnd_list = resolveComponent("dnd-list");
  return !_ctx.parentFolder.isLoaded ? (openBlock(), createBlock(_component_load_more, {
    key: 0,
    load: _ctx.loadMore,
    "is-fully-loaded": false
  }, null, 8, ["load"])) : (openBlock(), createBlock(_component_dnd_list, {
    key: 1,
    class: "forest",
    modelValue: _ctx.parentFolder.children,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.parentFolder.children = $event),
    "item-key": (item) => item.id,
    accepts: _ctx.accepts,
    drag: _ctx.drag,
    drop: _ctx.drop,
    orientation: "vertical",
    "ghost-displaces-items": "",
    "ghost-mimics-height": ""
  }, {
    item: withCtx(({ item }) => [
      _ctx.isVisible(item) ? (openBlock(), createBlock(_component_Folder, {
        key: 0,
        ref: "folders",
        folder: item,
        "is-toplevel": ""
      }, null, 8, ["folder"])) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["modelValue", "item-key", "accepts", "drag", "drop"]));
}
const FolderList = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$4]]);
const _hoisted_1$5 = ["title", "onClick"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "select-folder",
  props: {
    folder: {},
    tooltips: { type: Function },
    buttonClasses: { type: Function },
    filter: { type: Function }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selection = the.model.selection;
    const visibleChildFolders = computed(
      () => filterMap(
        props.folder.children,
        (c) => c && "children" in c && props.filter(c) && !selection.info(c).isSelected ? c : void 0
      )
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(visibleChildFolders.value, (folder) => {
          return openBlock(), createElementBlock("li", null, [
            createBaseVNode("button", {
              class: normalizeClass(props.buttonClasses(folder)),
              title: props.tooltips(folder),
              onClick: withModifiers(($event) => emit("select", $event, folder), ["prevent"])
            }, [
              createBaseVNode("span", null, toDisplayString(unref(friendlyFolderName)(folder.title)), 1)
            ], 10, _hoisted_1$5),
            createVNode(_sfc_main$5, {
              folder,
              filter: _ctx.filter,
              tooltips: props.tooltips,
              "button-classes": props.buttonClasses,
              onSelect: (ev, folder2) => emit("select", ev, folder2)
            }, null, 8, ["folder", "filter", "tooltips", "button-classes", "onSelect"])
          ]);
        }), 256))
      ]);
    };
  }
});
const _sfc_main$4 = defineComponent({
  components: { Menu, SearchInput: _sfc_main$j, SelectFolder: _sfc_main$5 },
  // If `props` is an empty object, Vue thinks the props of the component are of
  // type `unknown` rather than `{}`. See:
  // https://github.com/vuejs/core/issues/4051
  //
  // props: {},
  data: () => ({
    searchText: ""
  }),
  computed: {
    altKey: altKeyName,
    stashRoot() {
      return the.model.bookmarks.stash_root.value;
    },
    selectedCount() {
      return the.model.selection.selectedCount.value;
    },
    filter() {
      const matcher = textMatcher(this.searchText);
      return (node) => isFolder(node) && matcher(friendlyFolderName(node.title));
    },
    nodeFilterFn() {
      const tree = new TreeFilter(
        isFolder,
        computed(() => this.filter)
      );
      return (node) => tree.info(node).hasMatchInSubtree;
    },
    createTitle() {
      if (this.searchText === "") return "Move to New Group";
      return `Move to "${this.searchText}"`;
    },
    createTooltip() {
      const copy = `(hold ${this.altKey} to copy)`;
      if (this.searchText === "") return `Move to a new group ${copy}`;
      return `Move to new group "${this.searchText}" ${copy}`;
    }
  },
  methods: {
    attempt(fn) {
      the.model.attempt(fn);
    },
    friendlyFolderName,
    closeMenu() {
      this.$refs.menu.close();
    },
    onOpenMenu() {
      this.searchText = "";
      this.$refs.search.focus();
    },
    create(ev) {
      this.attempt(async () => {
        let folder;
        if (!this.searchText) {
          folder = await the.model.bookmarks.createStashFolder();
        } else {
          const stash_root = await the.model.bookmarks.ensureStashRoot();
          folder = await the.model.bookmarks.create({
            parentId: stash_root.id,
            title: this.searchText,
            index: 0
          });
        }
        this.moveTo(ev, folder);
      });
    },
    moveTo(ev, folder) {
      this.attempt(
        () => the.model.putSelectedInFolder({
          copy: ev.altKey,
          toFolder: folder
        })
      );
    },
    copyToWindow() {
      this.attempt(() => the.model.putSelectedInWindow({ copy: true }));
    },
    moveToWindow() {
      this.attempt(() => the.model.putSelectedInWindow({ copy: false }));
    },
    remove() {
      this.attempt(async () => {
        await the.model.deleteItems(
          Array.from(the.model.selection.selectedItems())
        );
      });
    }
  }
});
const _hoisted_1$4 = { class: "count" };
const _hoisted_2$3 = ["title"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_search_input = resolveComponent("search-input");
  const _component_select_folder = resolveComponent("select-folder");
  const _component_Menu = resolveComponent("Menu");
  return openBlock(), createBlock(_component_Menu, {
    ref: "menu",
    class: "selection-menu",
    modalClass: "action-container",
    onOpen: _ctx.onOpenMenu
  }, {
    summary: withCtx(() => [
      createBaseVNode("div", _hoisted_1$4, toDisplayString(_ctx.selectedCount), 1),
      _cache[7] || (_cache[7] = createBaseVNode("div", { class: "icon icon-move-menu-inverse" }, null, -1))
    ]),
    default: withCtx(() => [
      createBaseVNode("button", {
        tabindex: "0",
        title: "Open stashed tabs",
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.copyToWindow && _ctx.copyToWindow(...args), ["prevent"]))
      }, _cache[8] || (_cache[8] = [
        createBaseVNode("span", { class: "menu-icon icon icon-restore" }, null, -1),
        createBaseVNode("span", null, "Open", -1)
      ])),
      createBaseVNode("button", {
        tabindex: "0",
        title: "Open tabs and delete them from the stash",
        onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.moveToWindow && _ctx.moveToWindow(...args), ["prevent"]))
      }, _cache[9] || (_cache[9] = [
        createBaseVNode("span", { class: "menu-icon icon icon-restore-del" }, null, -1),
        createBaseVNode("span", null, "Unstash", -1)
      ])),
      _cache[12] || (_cache[12] = createBaseVNode("hr", null, null, -1)),
      createVNode(_component_search_input, {
        ref: "search",
        placeholder: "Search or create group",
        modelValue: _ctx.searchText,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.searchText = $event),
        onClick: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["stop"])),
        onKeypress: _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => {
          _ctx.create($event);
          _ctx.closeMenu();
        }, ["prevent", "stop"]), ["enter"]))
      }, null, 8, ["modelValue"]),
      createBaseVNode("button", {
        title: _ctx.createTooltip,
        onClick: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.create && _ctx.create(...args), ["prevent"]))
      }, [
        _cache[10] || (_cache[10] = createBaseVNode("span", { class: "menu-icon icon icon-new-empty-group" }, null, -1)),
        createBaseVNode("span", null, toDisplayString(_ctx.createTitle), 1)
      ], 8, _hoisted_2$3),
      _cache[13] || (_cache[13] = createBaseVNode("hr", null, null, -1)),
      _ctx.stashRoot ? (openBlock(), createBlock(_component_select_folder, {
        key: 0,
        class: "menu-scrollable-list",
        folder: _ctx.stashRoot,
        filter: _ctx.nodeFilterFn,
        tooltips: (f) => `Move to "${_ctx.friendlyFolderName(
          f.title
        )}" (hold ${_ctx.altKey} to copy)`,
        "button-classes": (f) => ({}),
        onSelect: _ctx.moveTo
      }, null, 8, ["folder", "filter", "tooltips", "onSelect"])) : createCommentVNode("", true),
      _cache[14] || (_cache[14] = createBaseVNode("hr", null, null, -1)),
      createBaseVNode("button", {
        title: "Delete stashed tabs and close unstashed tabs",
        onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.remove && _ctx.remove(...args), ["prevent"]))
      }, _cache[11] || (_cache[11] = [
        createBaseVNode("span", { class: "menu-icon icon icon-delete" }, null, -1),
        createBaseVNode("span", null, "Delete or Close", -1)
      ]))
    ]),
    _: 1
  }, 8, ["onOpen"]);
}
const SelectionMenu = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3]]);
const _hoisted_1$3 = {
  for: "ask_next_time",
  title: "If you change your mind, you can turn this confirmation on again in the options."
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "confirm-dialog",
  props: {
    confirm: {},
    cancel: {},
    confirmByDefault: { type: Boolean }
  },
  emits: ["confirm", "cancel", "answer"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const confirmNextTime = ref(true);
    const $confirm = ref(void 0);
    const $cancel = ref(void 0);
    onMounted(() => {
      if (props.confirmByDefault) {
        $confirm.value.focus();
      } else {
        $cancel.value.focus();
      }
    });
    function answer(confirmed) {
      if (confirmed) {
        emit("answer", { confirmed: true, confirmNextTime: confirmNextTime.value });
        emit("confirm", { confirmed: true, confirmNextTime: confirmNextTime.value });
      } else {
        emit("answer", { confirmed: false, confirmNextTime: true });
        emit("cancel", { confirmed: false, confirmNextTime: true });
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Dialog, {
          onClose: _cache[3] || (_cache[3] = ($event) => answer(false))
        }, {
          buttons: withCtx(() => [
            createBaseVNode("button", {
              class: normalizeClass({ "confirm-dialog-default": !props.confirmByDefault }),
              ref: (b) => {
                $cancel.value = b;
              },
              onClick: _cache[1] || (_cache[1] = ($event) => answer(false))
            }, toDisplayString(props.cancel), 3),
            createBaseVNode("button", {
              class: normalizeClass({ "confirm-dialog-default": props.confirmByDefault }),
              ref: (b) => {
                $confirm.value = b;
              },
              onClick: _cache[2] || (_cache[2] = ($event) => answer(true))
            }, toDisplayString(props.confirm), 3)
          ]),
          default: withCtx(() => [
            createBaseVNode("section", null, [
              renderSlot(_ctx.$slots, "default")
            ]),
            createBaseVNode("section", null, [
              createBaseVNode("label", _hoisted_1$3, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  id: "ask_next_time",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => confirmNextTime.value = $event)
                }, null, 512), [
                  [vModelCheckbox, confirmNextTime.value]
                ]),
                _cache[4] || (_cache[4] = createTextVNode(" Ask me again next time "))
              ])
            ])
          ]),
          _: 3
        })
      ]);
    };
  }
});
const _sfc_main$2 = defineComponent({
  components: { ItemIcon: _sfc_main$i },
  props: {
    tab: required(Object)
  },
  computed: {
    filterInfo() {
      return the.model.filter.info(this.tab);
    },
    selectionInfo() {
      return the.model.selection.info(this.tab);
    },
    altKey: altKeyName,
    bgKey: bgKeyName,
    targetWindow() {
      return the.model.tabs.targetWindow.value;
    },
    favIcon() {
      if (!this.selectionInfo.isSelected && this.tab.favIconUrl) {
        return this.tab.favIconUrl;
      }
      return "";
    },
    isStashable() {
      const t = this.tab;
      return !t.hidden && !t.pinned && the.model.isURLStashable(t.url);
    },
    isLoading() {
      return this.tab.status === "loading";
    },
    isActive() {
      var _a;
      return this.tab.active && ((_a = this.tab.position) == null ? void 0 : _a.parent) === this.targetWindow;
    },
    stashedIn() {
      if (this.isLoading) return [];
      if (!this.tab.url) return [];
      return the.model.bookmarks.loadedFoldersInStashWithURL(this.tab.url).map((f) => friendlyFolderName(f.title));
    },
    container() {
      if (this.tab.cookieStoreId === void 0) return;
      return the.model.containers.container(this.tab.cookieStoreId);
    },
    containerColor() {
      var _a;
      return (_a = this.container) == null ? void 0 : _a.color;
    }
  },
  methods: {
    attempt(fn) {
      the.model.attempt(fn);
    },
    select(ev) {
      this.attempt(async () => {
        the.model.selection.toggleSelectFromEvent(ev, this.tab);
      });
    },
    stash(ev) {
      this.attempt(async () => {
        await the.model.putItemsInFolder({
          items: copyIf(ev.altKey, [this.tab]),
          toFolder: await the.model.ensureRecentUnnamedFolder()
        });
      });
    },
    open(ev) {
      this.attempt(async () => {
        this.$refs.a.blur();
        await browser.tabs.update(this.tab.id, { active: true });
      });
    },
    remove() {
      this.attempt(async () => {
        if (this.stashedIn.length > 0) {
          await the.model.hideOrCloseStashedTabs([this.tab]);
        } else {
          await the.model.tabs.remove([this.tab]);
        }
      });
    }
  }
});
const _hoisted_1$2 = ["title", "data-container-color"];
const _hoisted_2$2 = ["href"];
const _hoisted_3$2 = ["title"];
const _hoisted_4$2 = { class: "action-group forest-toolbar" };
const _hoisted_5$2 = ["title"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_item_icon = resolveComponent("item-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "action-container": true,
      "forest-item": true,
      selectable: true,
      open: !_ctx.tab.hidden,
      active: !!_ctx.tab.active,
      discarded: _ctx.tab.discarded,
      loading: _ctx.isLoading,
      stashed: _ctx.stashedIn.length > 0,
      selected: _ctx.selectionInfo.isSelected,
      "no-match": !_ctx.filterInfo.isMatching
    }),
    title: _ctx.tab.title,
    "data-container-color": _ctx.containerColor
  }, [
    createVNode(_component_item_icon, {
      class: normalizeClass({
        "forest-icon": true,
        action: true,
        select: true
      }),
      "default-icon": "tab",
      src: _ctx.favIcon,
      selectable: "",
      selected: _ctx.selectionInfo.isSelected,
      onClick: withModifiers(_ctx.select, ["prevent", "stop"])
    }, null, 8, ["src", "selected", "onClick"]),
    createBaseVNode("a", {
      class: "forest-title",
      href: _ctx.tab.url,
      target: "_blank",
      draggable: "false",
      ref: "a",
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => _ctx.open && _ctx.open(...args), ["left", "prevent", "stop"])),
      onAuxclick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.remove && _ctx.remove(...args), ["middle", "exact", "prevent", "stop"]))
    }, toDisplayString(_ctx.tab.title), 41, _hoisted_2$2),
    _ctx.stashedIn.length > 0 ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: "forest-badge icon icon-stashed",
      title: `This tab is stashed in:
${_ctx.stashedIn.join("\n")}`
    }, null, 8, _hoisted_3$2)) : createCommentVNode("", true),
    createBaseVNode("nav", _hoisted_4$2, [
      _ctx.isStashable ? (openBlock(), createElementBlock("a", {
        key: 0,
        class: "action stash one",
        title: `Stash this tab (hold ${_ctx.altKey} to keep tab open)`,
        onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.stash && _ctx.stash(...args), ["prevent", "stop"]))
      }, null, 8, _hoisted_5$2)) : createCommentVNode("", true),
      createBaseVNode("a", {
        class: "action remove",
        title: "Close this tab",
        onClick: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.remove && _ctx.remove(...args), ["prevent", "stop"]))
      })
    ])
  ], 10, _hoisted_1$2);
}
const TabVue = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const NEXT_SHOW_OPEN_TAB_STATE = {
  all: "unstashed",
  unstashed: "all"
};
const _sfc_main$1 = defineComponent({
  components: {
    ConfirmDialog: _sfc_main$3,
    DndList: _sfc_main$b,
    Tab: TabVue,
    Bookmark,
    ShowFilteredItem: _sfc_main$9
  },
  props: {
    // Window contents
    targetWindow: required(Object),
    // Metadata (for collapsed state)
    metadata: required(Object)
  },
  data: () => ({
    confirmCloseTabs: 0,
    confirmCloseTabsThen: (id) => {
    }
  }),
  computed: {
    altKey: altKeyName,
    filterInfo() {
      return the.model.filter.info(this.targetWindow);
    },
    showFiltered: {
      get() {
        let f = the.model.showFilteredChildren.get(this.targetWindow);
        if (!f) {
          f = ref(false);
          the.model.showFilteredChildren.set(this.targetWindow, f);
        }
        return f.value;
      },
      set(v) {
        let f = the.model.showFilteredChildren.get(this.targetWindow);
        if (!f) {
          f = ref(false);
          the.model.showFilteredChildren.set(this.targetWindow, f);
        }
        f.value = v;
      }
    },
    accepts() {
      return ACCEPTS;
    },
    tabs() {
      return this.targetWindow.children;
    },
    showStashedTabs() {
      return the.model.options.sync.state.show_open_tabs === "all";
    },
    title() {
      if (this.showStashedTabs) return "Open Tabs";
      return "Unstashed Tabs";
    },
    tooltip() {
      return `${this.displayCount} ${this.title}
Click to change which tabs are shown.`;
    },
    collapsed: {
      get() {
        var _a;
        return !!((_a = this.metadata.value) == null ? void 0 : _a.collapsed);
      },
      set(collapsed) {
        the.model.bookmark_metadata.setCollapsed(this.metadata.key, collapsed);
      }
    },
    // How many tabs are visible in the list, ignoring the filter?
    displayCount() {
      let count = 0;
      for (const c of this.targetWindow.children) {
        if (this.isValidChild(c)) ++count;
      }
      return count;
    },
    // We ignore the built-in filteredCount because it includes invalid things
    // like hidden tabs
    filteredCount() {
      let count = 0;
      for (const c of this.targetWindow.children) {
        const i = the.model.filter.info(c);
        if (this.isValidChild(c) && !i.isMatching) ++count;
      }
      return count;
    },
    selectedCount() {
      return the.model.selection.selectedCount.value;
    },
    shouldConfirmCloseOpenTabs: {
      get() {
        return the.model.options.local.state.confirm_close_open_tabs;
      },
      set(v) {
        the.model.attempt(
          () => the.model.options.local.set({ confirm_close_open_tabs: v })
        );
      }
    }
  },
  methods: {
    attempt(fn) {
      the.model.attempt(fn);
    },
    toggleMode() {
      this.attempt(async () => {
        const options = the.model.options;
        await options.sync.set({
          show_open_tabs: NEXT_SHOW_OPEN_TAB_STATE[options.sync.state.show_open_tabs]
        });
      });
    },
    isVisible(t) {
      const f = the.model.filter.info(t);
      const s = the.model.selection.info(t);
      return this.isValidChild(t) && (this.showFiltered || f.isMatching || s.isSelected);
    },
    isValidChild(t) {
      if (t.hidden || t.pinned) return false;
      return this.showStashedTabs || the.model.isURLStashable(t.url) && !the.model.bookmarks.isURLLoadedInStash(t.url);
    },
    async newGroup() {
      this.attempt(async () => {
        await the.model.bookmarks.createStashFolder();
      });
    },
    async stash(ev) {
      this.attempt(async () => {
        const stashable_children = the.model.stashableTabsInWindow(this.targetWindow).filter((t) => this.isValidChild(t));
        if (stashable_children.length === 0) return;
        await the.model.putItemsInFolder({
          items: copyIf(ev.altKey, stashable_children),
          toFolder: await the.model.bookmarks.createStashFolder()
        });
      });
    },
    async removeUnstashed() {
      this.attempt(async () => {
        const to_remove = this.tabs.filter(
          (t) => !t.hidden && !t.pinned && // Keep the active tab if it's the Tab Stash tab
          (!t.active || the.model.isURLStashable(t.url)) && !the.model.bookmarks.isURLLoadedInStash(t.url)
        );
        if (!await this.confirmRemove(to_remove.length)) return;
        await the.model.tabs.remove(to_remove);
      });
    },
    async removeStashed() {
      this.attempt(async () => {
        const to_remove = this.tabs.filter(
          (t) => !t.hidden && !t.pinned && the.model.bookmarks.isURLLoadedInStash(t.url)
        );
        if (!await this.confirmRemove(to_remove.length)) return;
        await the.model.hideOrCloseStashedTabs(to_remove);
      });
    },
    async removeOpen(ev) {
      this.attempt(async () => {
        if (ev.altKey) {
          const tabs = this.tabs.filter(
            (t) => t.hidden && the.model.bookmarks.isURLLoadedInStash(t.url)
          );
          await the.model.tabs.remove(tabs);
        } else {
          const tabs = this.tabs.filter(
            (t) => (!t.active || the.model.isURLStashable(t.url)) && !t.hidden && !t.pinned
          );
          const hide_tabs = tabs.filter(
            (t) => the.model.bookmarks.isURLLoadedInStash(t.url)
          );
          const close_tabs = tabs.filter((t) => !the.model.bookmarks.isURLLoadedInStash(t.url)).map((t) => t.id);
          if (!await this.confirmRemove(tabs.length)) return;
          await the.model.tabs.refocusAwayFromTabs(tabs);
          the.model.hideOrCloseStashedTabs(hide_tabs).catch(console.log);
          browser.tabs.remove(close_tabs).catch(console.log);
        }
      });
    },
    confirmRemove(nr_tabs) {
      if (nr_tabs <= 10) return Promise.resolve(true);
      if (!this.shouldConfirmCloseOpenTabs) return Promise.resolve(true);
      return new Promise((resolve) => {
        this.confirmCloseTabs = nr_tabs;
        this.confirmCloseTabsThen = (ev) => {
          this.confirmCloseTabs = 0;
          this.shouldConfirmCloseOpenTabs = ev.confirmNextTime;
          resolve(ev.confirmed);
        };
      });
    },
    copyToWindow() {
      this.attempt(() => the.model.putSelectedInWindow({ copy: true }));
    },
    moveToWindow() {
      this.attempt(() => the.model.putSelectedInWindow({ copy: false }));
    },
    moveToNewGroup(ev) {
      this.attempt(async () => {
        const folder = await the.model.bookmarks.createStashFolder();
        await the.model.putSelectedInFolder({
          copy: ev.altKey,
          toFolder: folder
        });
      });
    },
    drag(ev) {
      const items = the.model.selection.info(ev.value).isSelected ? Array.from(the.model.selection.selectedItems()) : [ev.value];
      sendDragData(ev.dataTransfer, items);
    },
    async drop(ev) {
      const items = recvDragData(ev.dataTransfer, the.model);
      await the.model.attempt(
        () => the.model.putItemsInWindow({
          items,
          toIndex: ev.toIndex
        })
      );
    }
  }
});
const _hoisted_1$1 = {
  key: 0,
  class: "action-group forest-toolbar"
};
const _hoisted_2$1 = ["title"];
const _hoisted_3$1 = ["title"];
const _hoisted_4$1 = {
  key: 1,
  class: "action-group forest-toolbar"
};
const _hoisted_5$1 = ["title"];
const _hoisted_6$1 = ["title"];
const _hoisted_7$1 = ["title"];
const _hoisted_8 = ["title"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tab = resolveComponent("tab");
  const _component_dnd_list = resolveComponent("dnd-list");
  const _component_show_filtered_item = resolveComponent("show-filtered-item");
  const _component_confirm_dialog = resolveComponent("confirm-dialog");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", {
      class: normalizeClass({
        "action-container": true,
        "forest-item": true,
        selectable: true,
        collapsed: _ctx.collapsed
      })
    }, [
      createBaseVNode("a", {
        class: normalizeClass({
          action: true,
          "forest-collapse": true,
          collapse: !_ctx.collapsed,
          expand: _ctx.collapsed
        }),
        title: "Hide the tabs for this group",
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.collapsed = !_ctx.collapsed, ["prevent", "stop"]))
      }, null, 2),
      _ctx.selectedCount === 0 ? (openBlock(), createElementBlock("nav", _hoisted_1$1, [
        createBaseVNode("a", {
          class: "action stash",
          title: `Stash all ${_ctx.showStashedTabs ? "open tabs" : "unstashed tabs"} to a new group (hold ${_ctx.altKey} to keep tabs open)`,
          onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.stash && _ctx.stash(...args), ["prevent", "stop"]))
        }, null, 8, _hoisted_2$1),
        createBaseVNode("a", {
          class: "action stash newgroup",
          title: "Create a new empty group",
          onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.newGroup && _ctx.newGroup(...args), ["prevent", "stop"]))
        }),
        createBaseVNode("a", {
          class: "action remove",
          title: `Close all unstashed tabs`,
          onClick: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.removeUnstashed && _ctx.removeUnstashed(...args), ["prevent", "stop"]))
        }),
        createBaseVNode("a", {
          class: "action remove stashed",
          title: `Close all stashed tabs`,
          onClick: _cache[4] || (_cache[4] = withModifiers((...args) => _ctx.removeStashed && _ctx.removeStashed(...args), ["prevent", "stop"]))
        }),
        createBaseVNode("a", {
          class: "action remove opened",
          title: `Click: Close all open tabs
${_ctx.altKey}+Click: Close any hidden/stashed tabs (reclaims memory)`,
          onClick: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.removeOpen && _ctx.removeOpen(...args), ["prevent", "stop"]))
        }, null, 8, _hoisted_3$1)
      ])) : (openBlock(), createElementBlock("nav", _hoisted_4$1, [
        createBaseVNode("a", {
          class: "action stash newgroup",
          title: `Move ${_ctx.selectedCount} tab(s) to a new group (hold ${_ctx.altKey} to copy)`,
          onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.moveToNewGroup && _ctx.moveToNewGroup(...args), ["prevent", "stop"]))
        }, null, 8, _hoisted_5$1),
        _ctx.selectedCount > 0 ? (openBlock(), createElementBlock("a", {
          key: 0,
          class: "action restore",
          title: `Open ${_ctx.selectedCount} tab(s)`,
          onClick: _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.copyToWindow && _ctx.copyToWindow(...args), ["prevent", "stop"]))
        }, null, 8, _hoisted_6$1)) : createCommentVNode("", true),
        _ctx.selectedCount > 0 ? (openBlock(), createElementBlock("a", {
          key: 1,
          class: "action restore-remove",
          title: `Unstash ${_ctx.selectedCount} tab(s)`,
          onClick: _cache[8] || (_cache[8] = withModifiers((...args) => _ctx.moveToWindow && _ctx.moveToWindow(...args), ["prevent", "stop"]))
        }, null, 8, _hoisted_7$1)) : createCommentVNode("", true)
      ])),
      createBaseVNode("span", {
        class: normalizeClass({ "forest-title": true, editable: true, disabled: true }),
        title: _ctx.tooltip,
        onClick: _cache[9] || (_cache[9] = withModifiers((...args) => _ctx.toggleMode && _ctx.toggleMode(...args), ["prevent", "stop"]))
      }, toDisplayString(_ctx.title), 9, _hoisted_8)
    ], 2),
    createVNode(_component_dnd_list, {
      class: normalizeClass({ "forest-children": true, collapsed: _ctx.collapsed }),
      modelValue: _ctx.targetWindow.children,
      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.targetWindow.children = $event),
      "item-key": (item) => item.id,
      accepts: _ctx.accepts,
      drag: _ctx.drag,
      drop: _ctx.drop,
      orientation: "vertical"
    }, {
      item: withCtx(({ item }) => [
        _ctx.isVisible(item) ? (openBlock(), createBlock(_component_tab, {
          key: 0,
          tab: item
        }, null, 8, ["tab"])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["class", "modelValue", "item-key", "accepts", "drag", "drop"]),
    _ctx.filteredCount > 0 ? (openBlock(), createElementBlock("ul", {
      key: 0,
      class: normalizeClass({ "forest-children": true, collapsed: _ctx.collapsed })
    }, [
      createBaseVNode("li", null, [
        createVNode(_component_show_filtered_item, {
          visible: _ctx.showFiltered,
          "onUpdate:visible": _cache[11] || (_cache[11] = ($event) => _ctx.showFiltered = $event),
          count: _ctx.filteredCount
        }, null, 8, ["visible", "count"])
      ])
    ], 2)) : createCommentVNode("", true),
    _ctx.confirmCloseTabs > 0 ? (openBlock(), createBlock(_component_confirm_dialog, {
      key: 1,
      confirm: `Close ${_ctx.confirmCloseTabs} tabs`,
      cancel: "Cancel",
      onAnswer: _cache[12] || (_cache[12] = ($event) => _ctx.confirmCloseTabsThen($event))
    }, {
      default: withCtx(() => [
        createBaseVNode("p", null, "You're about to close " + toDisplayString(_ctx.confirmCloseTabs) + " tabs at once.", 1),
        _cache[13] || (_cache[13] = createBaseVNode("p", null, " Your browser may not keep this many tabs in its recent history, so THIS IS IRREVERSIBLE. Are you sure? ", -1))
      ]),
      _: 1
    }, 8, ["confirm"])) : createCommentVNode("", true)
  ], 64);
}
const WindowVue = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  components: {
    ExportDialog,
    Folder: FolderVue,
    FolderList,
    ImportDialog,
    Menu,
    Notification,
    OopsNotification,
    ProgressDialog,
    SearchInput: _sfc_main$j,
    SelectionMenu,
    Window: WindowVue
  },
  data: () => ({
    collapsed: false,
    searchText: "",
    dialog: void 0
  }),
  computed: {
    my_version() {
      return the.version;
    },
    view() {
      return document.documentElement.dataset.view ?? "tab";
    },
    stash_root_warning() {
      return the.model.bookmarks.stash_root_warning.value;
    },
    targetWindow() {
      return the.model.tabs.targetWindow.value;
    },
    tabs() {
      const m = the.model.tabs;
      if (m.targetWindow.value === void 0) return [];
      return m.targetWindow.value.children;
    },
    stashRoot() {
      const sr = the.model.bookmarks.stash_root.value;
      if (!sr) return void 0;
      return sr;
    },
    recently_updated() {
      const last_notified = the.model.options.local.state.last_notified_version;
      if (!last_notified || last_notified === this.my_version) return void 0;
      const my = parseVersion(this.my_version);
      const last = last_notified ? parseVersion(last_notified) : [];
      if (my[0] == last[0] && my[1] == last[1]) return "fixes";
      return "features";
    },
    recently_deleted() {
      return the.model.deleted_items.state.recentlyDeleted;
    },
    recentlyDeletedTitle() {
      if (typeof this.recently_deleted === "object") {
        return friendlyFolderName(this.recently_deleted.item.title);
      }
      return void 0;
    },
    selection_active() {
      return the.model.selection.selectedCount.value > 0;
    },
    counts() {
      var _a;
      const stats = (_a = this.stashRoot) == null ? void 0 : _a.$recursiveStats;
      if (!stats) return { bookmarkCount: 0, folderCount: 0, isLoaded: true };
      return stats;
    },
    search_placeholder() {
      const counts = this.counts;
      const groups = counts.folderCount == 1 ? "group" : "groups";
      const tabs = counts.bookmarkCount == 1 ? "tab" : "tabs";
      const loading = counts.isLoaded ? "" : "+";
      return `Search ${counts.folderCount}${loading} ${groups}, ${counts.bookmarkCount}${loading} ${tabs}`;
    },
    tabStats() {
      var _a;
      let open = 0, discarded = 0, hidden = 0;
      for (const tab of this.tabs) {
        if (((_a = tab.position) == null ? void 0 : _a.parent) !== this.targetWindow) continue;
        if (tab.hidden) {
          hidden += 1;
        } else if (tab.discarded) {
          discarded += 1;
        } else {
          open += 1;
        }
      }
      return { open, discarded, hidden };
    },
    searchTooltip() {
      const st = this.tabStats;
      const tabs_sum = st.open + st.discarded + st.hidden;
      return `${this.counts.folderCount} group${this.plural(
        this.counts.folderCount
      )}, ${this.counts.bookmarkCount} stashed tab${this.plural(
        this.counts.bookmarkCount
      )}
${tabs_sum} tab${this.plural(tabs_sum)} in this window (${st.open} open, ${st.discarded} unloaded, ${st.hidden} hidden)`;
    },
    curWindowMetadata() {
      return the.model.bookmark_metadata.get(CUR_WINDOW_MD_ID);
    },
    showCrashReport() {
      return the.model.options.showCrashReport.value;
    }
  },
  mounted() {
    if (document.documentElement.dataset.view === "popup") {
      this.$refs.search.focus();
    }
  },
  watch: {
    searchText() {
      the.model.searchText.value = this.searchText;
    }
  },
  methods: {
    pageref,
    collapseAll() {
      var _a;
      this.collapsed = !this.collapsed;
      const metadata = the.model.bookmark_metadata;
      metadata.setCollapsed(CUR_WINDOW_MD_ID, this.collapsed);
      for (const f of ((_a = this.stashRoot) == null ? void 0 : _a.children) || []) {
        if (f) metadata.setCollapsed(f.id, this.collapsed);
      }
    },
    onDeleteNotifActivated() {
      if (typeof this.recently_deleted === "object") {
        the.model.undelete(this.recently_deleted);
      } else {
        this.go("deleted-items.html");
      }
    },
    onEscape() {
      if (this.searchText) {
        this.searchText = "";
        return;
      }
      this.deselectAll();
    },
    deselectAll() {
      the.model.selection.clearSelection();
    },
    showOptions() {
      browser.runtime.openOptionsPage().catch(console.log);
    },
    showTabUI() {
      the.model.attempt(async () => {
        await the.model.restoreTabs(
          [
            {
              title: "Tab Stash",
              url: browser.runtime.getURL("stash-list.html")
            }
          ],
          {}
        );
        window.close();
      });
    },
    go(page) {
      window.location.href = pageref(page);
    },
    hideWhatsNew() {
      the.model.options.local.set({ last_notified_version: this.my_version });
    },
    showExportDialog() {
      this.dialog = { class: "ExportDialog", props: {} };
    },
    plural(n) {
      return n == 1 ? "" : "s";
    },
    async fetchMissingFavicons() {
      the.model.attempt(async () => {
        const favicons = the.model.favicons;
        const urls = await the.model.bookmarks.urlsInStash();
        const urls_to_fetch = /* @__PURE__ */ new Set();
        const domains_to_fetch = /* @__PURE__ */ new Map();
        for (const url of urls) {
          const norm_url = urlToOpen(url);
          const domain = domainForUrl(norm_url);
          if (!favicons.get(norm_url).value) urls_to_fetch.add(norm_url);
          if (!favicons.getForDomain(norm_url).value) {
            domains_to_fetch.set(domain, norm_url);
          }
        }
        const task = TaskMonitor.run(async (tm) => {
          let iter;
          const updateIcon = (info) => favicons.maybeSet(urlToOpen(info.originalUrl), {
            favIconUrl: info.favIconUrl ?? null,
            title: info.title
          });
          tm.max = domains_to_fetch.size + urls_to_fetch.size;
          tm.onCancel = () => {
            if (iter) iter.cancel();
          };
          tm.status = "Fetching icons for each domain...";
          iter = tm.wspawn_iter(
            domains_to_fetch.size,
            (tm2) => fetchInfoForSites(new Set(domains_to_fetch.values()), tm2)
          );
          for await (const info of iter) updateIcon(info);
          if (tm.cancelled) return;
          tm.status = "Fetching icons for each page...";
          iter = tm.wspawn_iter(
            urls_to_fetch.size,
            (tm2) => fetchInfoForSites(urls_to_fetch, tm2)
          );
          for await (const info of iter) updateIcon(info);
        });
        this.dialog = {
          class: "ProgressDialog",
          props: {
            progress: task.progress,
            cancel: () => task.cancel()
          }
        };
        task.finally(() => {
          this.dialog = void 0;
        });
      });
    }
  }
});
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = ["href"];
const _hoisted_4 = ["href"];
const _hoisted_5 = {
  key: 0,
  class: "forest one-column"
};
const _hoisted_6 = { class: "page status-text" };
const _hoisted_7 = ["href"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_OopsNotification = resolveComponent("OopsNotification");
  const _component_Notification = resolveComponent("Notification");
  const _component_Menu = resolveComponent("Menu");
  const _component_SelectionMenu = resolveComponent("SelectionMenu");
  const _component_search_input = resolveComponent("search-input");
  const _component_window = resolveComponent("window");
  const _component_folder_list = resolveComponent("folder-list");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("main", {
      class: normalizeClass({ "stash-list": true, "selection-active": _ctx.selection_active }),
      tabindex: "0",
      onClick: _cache[10] || (_cache[10] = (...args) => _ctx.deselectAll && _ctx.deselectAll(...args)),
      onKeydown: _cache[11] || (_cache[11] = withKeys(withModifiers((...args) => _ctx.onEscape && _ctx.onEscape(...args), ["prevent", "stop"]), ["esc"]))
    }, [
      createVNode(TransitionGroup, {
        tag: "aside",
        class: "notification-overlay",
        appear: "",
        name: "notification"
      }, {
        default: withCtx(() => [
          _ctx.showCrashReport ? (openBlock(), createBlock(_component_OopsNotification, { key: "oops" })) : createCommentVNode("", true),
          _ctx.recently_updated === "features" ? (openBlock(), createBlock(_component_Notification, {
            key: "new-features",
            onActivate: _cache[0] || (_cache[0] = ($event) => _ctx.go("whats-new.html")),
            onDismiss: _ctx.hideWhatsNew
          }, {
            default: withCtx(() => [
              createTextVNode(" Tab Stash " + toDisplayString(_ctx.my_version) + " significantly improves performance, especially when opening the UI. See what's new! ", 1)
            ]),
            _: 1
          }, 8, ["onDismiss"])) : createCommentVNode("", true),
          _ctx.recently_updated === "fixes" ? (openBlock(), createBlock(_component_Notification, {
            key: "new-fixes",
            onActivate: _cache[1] || (_cache[1] = ($event) => _ctx.go("whats-new.html")),
            onDismiss: _ctx.hideWhatsNew
          }, {
            default: withCtx(() => [
              createTextVNode(" Tab Stash " + toDisplayString(_ctx.my_version) + " fixes a crash, a few bugs, and a performance issue. See what's new! ", 1)
            ]),
            _: 1
          }, 8, ["onDismiss"])) : createCommentVNode("", true),
          _ctx.stash_root_warning ? (openBlock(), createBlock(_component_Notification, {
            key: "stash-root-warning",
            onActivate: _ctx.stash_root_warning.help
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.stash_root_warning.text), 1)
            ]),
            _: 1
          }, 8, ["onActivate"])) : createCommentVNode("", true),
          _ctx.recently_deleted !== 0 ? (openBlock(), createBlock(_component_Notification, {
            key: "recently-deleted",
            onActivate: _ctx.onDeleteNotifActivated
          }, {
            default: withCtx(() => [
              typeof _ctx.recently_deleted === "object" ? (openBlock(), createElementBlock("span", _hoisted_1, ' Deleted "' + toDisplayString(_ctx.recentlyDeletedTitle) + '". Undo? ', 1)) : (openBlock(), createElementBlock("span", _hoisted_2, " Deleted " + toDisplayString(_ctx.recently_deleted) + " items. Show what was deleted? ", 1))
            ]),
            _: 1
          }, 8, ["onActivate"])) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createBaseVNode("header", {
        class: "page action-container",
        onClick: _cache[9] || (_cache[9] = withModifiers(() => {
        }, ["stop"]))
      }, [
        _ctx.view !== "popup" ? (openBlock(), createBlock(_component_Menu, {
          key: 0,
          class: "main-menu",
          summaryClass: "action mainmenu"
        }, {
          default: withCtx(() => [
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.showOptions && _ctx.showOptions(...args), ["prevent"]))
            }, _cache[13] || (_cache[13] = [
              createBaseVNode("span", null, "Options...", -1)
            ])),
            _cache[19] || (_cache[19] = createBaseVNode("hr", null, null, -1)),
            createBaseVNode("button", {
              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.dialog = { class: "ImportDialog" }, ["prevent"]))
            }, _cache[14] || (_cache[14] = [
              createBaseVNode("span", null, "Import...", -1)
            ])),
            createBaseVNode("button", {
              onClick: _cache[4] || (_cache[4] = withModifiers((...args) => _ctx.showExportDialog && _ctx.showExportDialog(...args), ["prevent"]))
            }, _cache[15] || (_cache[15] = [
              createBaseVNode("span", null, "Export...", -1)
            ])),
            _cache[20] || (_cache[20] = createBaseVNode("hr", null, null, -1)),
            createBaseVNode("a", {
              tabindex: "0",
              href: _ctx.pageref("deleted-items.html")
            }, _cache[16] || (_cache[16] = [
              createBaseVNode("span", null, "Deleted Items...", -1)
            ]), 8, _hoisted_3),
            createBaseVNode("button", {
              onClick: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.fetchMissingFavicons && _ctx.fetchMissingFavicons(...args), ["prevent"]))
            }, _cache[17] || (_cache[17] = [
              createBaseVNode("span", null, "Fetch Missing Icons", -1)
            ])),
            _cache[21] || (_cache[21] = createBaseVNode("hr", null, null, -1)),
            _cache[22] || (_cache[22] = createBaseVNode("a", {
              tabindex: "0",
              href: "https://josh-berry.github.io/tab-stash/tips.html"
            }, [
              createBaseVNode("span", null, "Tips and Tricks")
            ], -1)),
            _cache[23] || (_cache[23] = createBaseVNode("a", {
              tabindex: "0",
              href: "https://github.com/josh-berry/tab-stash/wiki"
            }, [
              createBaseVNode("span", null, "Wiki")
            ], -1)),
            _cache[24] || (_cache[24] = createBaseVNode("a", {
              tabindex: "0",
              href: "https://josh-berry.github.io/tab-stash/support.html"
            }, [
              createBaseVNode("span", null, "Help and Support")
            ], -1)),
            _cache[25] || (_cache[25] = createBaseVNode("hr", null, null, -1)),
            createBaseVNode("a", {
              tabindex: "0",
              href: _ctx.pageref("whats-new.html")
            }, _cache[18] || (_cache[18] = [
              createBaseVNode("span", null, "What's New?", -1)
            ]), 8, _hoisted_4),
            _cache[26] || (_cache[26] = createBaseVNode("a", {
              tabindex: "0",
              href: "https://github.com/sponsors/josh-berry"
            }, [
              createBaseVNode("span", null, "Sponsor")
            ], -1))
          ]),
          _: 1
        })) : (openBlock(), createElementBlock("a", {
          key: 1,
          class: "action icon icon-pop-out",
          title: "Show stashed tabs in a tab",
          onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.showTabUI && _ctx.showTabUI(...args), ["prevent"]))
        })),
        _ctx.selection_active ? (openBlock(), createBlock(_component_SelectionMenu, { key: 2 })) : createCommentVNode("", true),
        createVNode(_component_search_input, {
          ref: "search",
          tooltip: _ctx.searchTooltip,
          placeholder: _ctx.search_placeholder,
          modelValue: _ctx.searchText,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.searchText = $event),
          "debounce-ms": 250
        }, null, 8, ["tooltip", "placeholder", "modelValue"]),
        createBaseVNode("a", {
          class: normalizeClass({ action: true, collapse: !_ctx.collapsed, expand: _ctx.collapsed }),
          title: "Hide all tabs so only group names are showing",
          onClick: _cache[8] || (_cache[8] = withModifiers((...args) => _ctx.collapseAll && _ctx.collapseAll(...args), ["prevent", "stop"]))
        }, null, 2)
      ]),
      _ctx.targetWindow ? (openBlock(), createElementBlock("ul", _hoisted_5, [
        createBaseVNode("li", null, [
          createVNode(_component_window, {
            "target-window": _ctx.targetWindow,
            metadata: _ctx.curWindowMetadata
          }, null, 8, ["target-window", "metadata"])
        ])
      ])) : createCommentVNode("", true),
      _ctx.stashRoot ? (openBlock(), createBlock(_component_folder_list, {
        key: 1,
        ref: "stashed",
        parentFolder: _ctx.stashRoot
      }, null, 8, ["parentFolder"])) : createCommentVNode("", true),
      createBaseVNode("footer", _hoisted_6, [
        createTextVNode(" Tab Stash " + toDisplayString(_ctx.my_version) + " — ", 1),
        createBaseVNode("a", {
          href: _ctx.pageref("whats-new.html")
        }, "What's New", 8, _hoisted_7)
      ])
    ], 34),
    createVNode(Transition, {
      appear: "",
      name: "dialog"
    }, {
      default: withCtx(() => [
        _ctx.dialog ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.dialog.class), mergeProps({ key: 0 }, _ctx.dialog.props, {
          onClose: _cache[12] || (_cache[12] = ($event) => _ctx.dialog = void 0)
        }), null, 16)) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ], 64);
}
const Main = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
launch(Main, async () => {
  await init();
  return {
    propsData: {}
  };
});
