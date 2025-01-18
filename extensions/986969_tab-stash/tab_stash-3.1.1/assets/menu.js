import { d as defineComponent, m as createBlock, n as normalizeClass, Q as resolveDynamicComponent, o as openBlock, w as withCtx, b as createElementBlock, j as required, r as ref, E as renderSlot, v as watch, a1 as onceRefHasValue, y as withDirectives, V as vModelText, e as createBaseVNode, H as withKeys, i as withModifiers, h as createCommentVNode, C as trace_fn, c as computed, L as nextTick, R as normalizeStyle, s as createTextVNode, t as toDisplayString } from "./launch-vue.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.js";
const _hoisted_1$2 = ["src"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "item-icon",
  props: {
    defaultIcon: {},
    src: {},
    selectable: { type: Boolean },
    selected: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.selectable ? "a" : "span"), {
        class: normalizeClass({ "item-icon": true, selectable: _ctx.selectable, selected: _ctx.selected }),
        title: _ctx.selectable ? _ctx.selected ? "Deselect" : "Select" : void 0
      }, {
        default: withCtx(() => [
          _ctx.src ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _ctx.src,
            referrerpolicy: "no-referrer",
            alt: "",
            decoding: "async",
            loading: "lazy"
          }, null, 8, _hoisted_1$2)) : (openBlock(), createElementBlock("span", {
            key: 1,
            class: normalizeClass({ icon: true, [`icon-${_ctx.defaultIcon}`]: true })
          }, null, 2))
        ]),
        _: 1
      }, 8, ["class", "title"]);
    };
  }
});
const callbacks = /* @__PURE__ */ new WeakMap();
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    const cb = callbacks.get(e.target);
    if (cb) cb(e);
  })
);
const _sfc_main$2 = defineComponent({
  props: {
    /** Optional parameter deciding which tag to use (`div` by default) */
    is: String,
    /** Async function which is called to load more elements.  The function
     * will be called repeatedly until isFullyLoaded becomes true or enough
     * items have been loaded to fill the UI.
     *
     * Only one invocation of the function will be run at a time--that is,
     * the function must return a Promise which will resolve once loading
     * has completed.  The function will not be called again until the
     * Promise resolves.
     *
     * If the function throws during loading, it will be retried again
     * periodically, as controlled by the retry parameters.  (Note that
     * retry backoff is only done for errors; a successful return of the
     * loader will always trigger an immediate retry if more data needs to
     * be loaded.) */
    load: required(Function),
    /** Boolean to determine whether load() should be called to load more
     * elements.  If true, load() will not be called.  When the boolean
     * becomes false again, load() will be called again once the load-more
     * component is visible again. */
    isFullyLoaded: required(Boolean),
    // Optional parameters for controlling retry/backoff behavior (only used
    // for handling errors in the user-provided load() function)
    initialRetryMS: Number,
    retryBackoffExponent: Number,
    maxRetryMS: Number
  },
  data: () => ({
    /** Is this load-more component visible to the user?  If so (because the
     * LoadMore component has scrolled into view), and if isFullyLoaded is
     * false, we should be trying to load more data. */
    isVisible: false,
    /** Are we currently trying to load more data (i.e. waiting for load()
     * to return)? */
    isLoading: false
  }),
  computed: {
    actualInitialRetryMS() {
      return Math.max(1, this.initialRetryMS ?? 5);
    },
    actualRetryBackoffExponent() {
      return Math.max(1, Math.min(2, this.retryBackoffExponent ?? 1.1));
    },
    actualMaxRetryMS() {
      return Math.max(1 / 60, this.maxRetryMS ?? 15e3);
    }
  },
  setup() {
    return {
      el: ref(null)
    };
  },
  mounted() {
    callbacks.set(this.el, (e) => {
      this.isVisible = e.isIntersecting;
      this.tryLoadMore();
    });
    observer.observe(this.el);
  },
  beforeUnmount() {
    this.isVisible = false;
    callbacks.delete(this.el);
    observer.unobserve(this.el);
  },
  watch: {
    // This ensures that if isFullyLoaded spontaneously becomes false (e.g.
    // to something changing in our parent component), we will try to load
    // more if needed.
    isFullyLoaded() {
      this.tryLoadMore();
    }
  },
  methods: {
    tryLoadMore() {
      if (this.isVisible && !this.isLoading && !this.isFullyLoaded) {
        this.isLoading = true;
        this.loadMore().catch(console.error).finally(() => {
          this.isLoading = false;
        });
      }
    },
    async loadMore() {
      let nextRetryMS = this.actualInitialRetryMS;
      while (this.isVisible && !this.isFullyLoaded) {
        try {
          await this.load();
          await waitForIntersectionUpdate();
        } catch (e) {
          console.error(`load-more loader function failed:`, e);
          if (!this.isVisible || this.isFullyLoaded) return;
          await new Promise((resolve) => setTimeout(resolve, nextRetryMS));
          nextRetryMS = Math.min(
            nextRetryMS * this.actualRetryBackoffExponent,
            this.actualMaxRetryMS
          );
        }
      }
    }
  }
});
function waitForIntersectionUpdate() {
  return new Promise(
    (resolve) => (window.requestIdleCallback || requestAnimationFrame)(resolve)
  );
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.is || "div"), {
    ref: "el",
    class: normalizeClass({
      loading: _ctx.isLoading,
      "fully-loaded": _ctx.isFullyLoaded
    })
  }, {
    default: withCtx(() => [
      !_ctx.isFullyLoaded ? renderSlot(_ctx.$slots, "loading", { key: 0 }) : renderSlot(_ctx.$slots, "fully-loaded", { key: 1 })
    ]),
    _: 3
  }, 8, ["class"]);
}
const LoadMore = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
const _hoisted_1$1 = { class: "search-input" };
const _hoisted_2$1 = ["aria-label", "title", "placeholder", "onKeydown"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "search-input",
  props: {
    tooltip: {},
    placeholder: {},
    ariaLabel: {},
    modelValue: {},
    debounceMs: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const searchContent = ref("");
    let debounceTimeout = void 0;
    watch(searchContent, () => {
      if (!props.debounceMs || searchContent.value === "") {
        emit("update:modelValue", searchContent.value);
        return;
      }
      if (debounceTimeout !== void 0) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(updateModelValue, props.debounceMs);
    });
    const $search = ref(void 0);
    __expose({
      focus() {
        onceRefHasValue($search, (s) => s.focus());
      }
    });
    function clear(ev) {
      if (searchContent.value !== "") {
        ev.stopPropagation();
        searchContent.value = "";
      }
    }
    function updateModelValue() {
      if (debounceTimeout !== void 0) {
        clearTimeout(debounceTimeout);
        debounceTimeout = void 0;
        emit("update:modelValue", searchContent.value);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        withDirectives(createBaseVNode("input", {
          type: "search",
          ref: (s) => {
            $search.value = s;
          },
          "aria-label": _ctx.ariaLabel ?? "Search",
          title: props.tooltip,
          placeholder: props.placeholder,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchContent.value = $event),
          onKeydown: [
            withKeys(withModifiers(clear, ["prevent"]), ["esc"]),
            withKeys(withModifiers(updateModelValue, ["prevent"]), ["enter"])
          ]
        }, null, 40, _hoisted_2$1), [
          [vModelText, searchContent.value]
        ]),
        searchContent.value !== "" ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "clear",
          "aria-label": "Clear Search",
          title: "Clear search",
          tabindex: "-1",
          onClick: withModifiers(clear, ["prevent", "stop"])
        })) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1 = ["open"];
const _hoisted_2 = ["onKeydown"];
const trace = trace_fn("menus");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "menu",
  props: {
    name: {},
    summaryClass: {},
    modalClass: {},
    hPosition: {},
    vPosition: {}
  },
  emits: ["open", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    __expose({ open, close });
    const viewport = ref();
    const origin = ref();
    const vertical = ref();
    const horizontal = ref();
    const isOpen = ref(false);
    const $details = ref();
    const $summary = ref();
    const $menu = ref();
    const vertical_bound = computed(() => {
      var _a;
      if (vertical.value === "below") {
        return `padding-top: ${((_a = origin.value) == null ? void 0 : _a.bottom) || 0}px;`;
      } else {
        return `padding-bottom: ${viewport.value.height - origin.value.top}px;`;
      }
    });
    const horizontal_bound = computed(() => {
      var _a;
      if (horizontal.value === "left") {
        return `padding-left: ${(_a = origin.value) == null ? void 0 : _a.left}px;`;
      } else {
        return `padding-right: ${viewport.value.width - origin.value.right}px;`;
      }
    });
    const bounds = computed(
      () => `${horizontal_bound.value} ${vertical_bound.value}`
    );
    function open() {
      trace("open");
      isOpen.value = true;
      viewport.value = document.body.getBoundingClientRect();
      const pos = $summary.value.getBoundingClientRect();
      const focus = {
        x: viewport.value.width / 2,
        y: 2 * viewport.value.height / 3
      };
      origin.value = pos;
      vertical.value = props.vPosition ?? (pos.bottom < focus.y ? "below" : "above");
      horizontal.value = props.hPosition ?? (pos.right < focus.x ? "left" : "right");
      onceRefHasValue($menu, (m) => {
        m.focus();
        emit("open");
      });
    }
    function close() {
      trace("close");
      if ($details.value) $details.value.focus();
      isOpen.value = false;
      nextTick(() => {
        vertical.value = void 0;
        horizontal.value = void 0;
        emit("close");
        if ($summary.value) $summary.value.blur();
      });
    }
    function onToggle() {
      trace("toggle");
      if ($details.value.open) {
        open();
      } else {
        close();
      }
    }
    function onFocusOut() {
      if (globalThis.menu_close_on_blur === false) return;
      if (!$menu.value) return;
      if ($menu.value.closest("details.menu:focus-within") !== $details.value) {
        trace("lost focus");
        close();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("details", {
        class: normalizeClass(["menu", {
          above: vertical.value === "above",
          below: vertical.value === "below",
          left: horizontal.value === "left",
          right: horizontal.value === "right"
        }]),
        ref_key: "$details",
        ref: $details,
        open: isOpen.value,
        onToggle,
        onFocusout: onFocusOut
      }, [
        createBaseVNode("summary", {
          ref_key: "$summary",
          ref: $summary,
          class: normalizeClass(_ctx.summaryClass),
          tabindex: "0"
        }, [
          renderSlot(_ctx.$slots, "summary", {}, () => [
            createTextVNode(toDisplayString(_ctx.name), 1)
          ])
        ], 2),
        isOpen.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          style: normalizeStyle(bounds.value),
          class: normalizeClass({
            "menu-modal": true,
            [_ctx.$style.modal]: true,
            [_ctx.modalClass ?? ""]: true,
            above: vertical.value === "above",
            below: vertical.value === "below",
            left: horizontal.value === "left",
            right: horizontal.value === "right"
          }),
          tabindex: "-1",
          onKeydown: withKeys(withModifiers(close, ["prevent", "stop"]), ["esc"]),
          onClick: withModifiers(close, ["prevent", "stop"])
        }, [
          createBaseVNode("nav", {
            ref_key: "$menu",
            ref: $menu,
            class: normalizeClass({ menu: true, [_ctx.$style.menu]: true }),
            tabIndex: "0",
            onClick: withModifiers(close, ["stop"])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)
        ], 46, _hoisted_2)) : createCommentVNode("", true)
      ], 42, _hoisted_1);
    };
  }
});
const modal = "_modal_jo87a_2";
const menu = "_menu_jo87a_32";
const style0 = {
  modal,
  menu
};
const cssModules = {
  "$style": style0
};
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  LoadMore as L,
  Menu as M,
  _sfc_main$3 as _,
  _sfc_main$1 as a
};
