import { d as defineComponent, r as ref, c as computed, a as resolveComponent, b as createElementBlock, e as createBaseVNode, t as toDisplayString, n as normalizeClass, f as createVNode, w as withCtx, F as Fragment, g as renderList, h as createCommentVNode, o as openBlock, i as withModifiers, j as required, k as textMatcher, l as filterMap, p as pageref, T as TransitionGroup, m as createBlock, q as launch } from "./assets/launch-vue.js";
import { f as findChildItem, a as friendlyFolderName, t as the, O as OopsNotification, i as init } from "./assets/oops-notification.js";
import { _ as _sfc_main$2, M as Menu, L as LoadMore, a as _sfc_main$3 } from "./assets/menu.js";
import { B as ButtonBox } from "./assets/notification.js";
import { _ as _export_sfc } from "./assets/_plugin-vue_export-helper.js";
const _hoisted_1$1 = {
  key: 0,
  class: "forest-item deleted loading"
};
const _hoisted_2$1 = { class: "forest-title status-text" };
const _hoisted_3$1 = ["href", "title"];
const _hoisted_4$1 = ["title"];
const _hoisted_5$1 = {
  key: 2,
  class: "forest-children"
};
const _hoisted_6$1 = { key: 0 };
const _hoisted_7$1 = { class: "forest-item disabled" };
const _hoisted_8$1 = { class: "forest-title status-text hidden-count" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "item",
  props: {
    deletion: {},
    path: {}
  },
  setup(__props) {
    const props = __props;
    const loading = ref("");
    const item = computed(
      () => findChildItem(props.deletion.item, props.path).child
    );
    const friendlyTitle = computed(() => friendlyFolderName(item.value.title));
    const deletedAt = computed(() => props.deletion.deleted_at.toLocaleString());
    const tooltip = computed(() => {
      const t = `${item.value.title}
`;
      if (props.deletion.deleted_from) {
        return `${t}Deleted at ${deletedAt.value} from "${props.deletion.deleted_from.title}"`;
      } else {
        return `${t}Deleted at ${deletedAt.value}`;
      }
    });
    async function run(what, f) {
      if (loading.value !== "") return;
      loading.value = what;
      try {
        await the.model.attempt(f);
      } finally {
        loading.value = "";
      }
    }
    const restore = () => run("Restoring", () => the.model.undelete(props.deletion, props.path));
    const remove = () => run(
      "Deleting Forever",
      () => the.model.deleted_items.drop(props.deletion.key, props.path)
    );
    return (_ctx, _cache) => {
      const _component_Item = resolveComponent("Item", true);
      return openBlock(), createElementBlock(Fragment, null, [
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          _cache[0] || (_cache[0] = createBaseVNode("span", { class: "forest-icon icon spinner size-icon" }, null, -1)),
          createBaseVNode("span", _hoisted_2$1, toDisplayString(loading.value) + "...", 1)
        ])) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass({
            "forest-item": true,
            folder: "children" in item.value,
            selectable: true,
            deleted: true,
            "action-container": true
          })
        }, [
          createVNode(_sfc_main$2, {
            class: normalizeClass({
              "forest-icon": true
            }),
            defaultIcon: "url" in item.value ? "tab" : "folder",
            src: "favIconUrl" in item.value ? item.value.favIconUrl : void 0
          }, null, 8, ["defaultIcon", "src"]),
          "url" in item.value ? (openBlock(), createElementBlock("a", {
            key: 0,
            class: "forest-title",
            href: item.value.url,
            target: "_blank",
            title: tooltip.value
          }, [
            createBaseVNode("span", null, toDisplayString(item.value.title), 1)
          ], 8, _hoisted_3$1)) : (openBlock(), createElementBlock("span", {
            key: 1,
            class: "forest-title",
            title: tooltip.value
          }, toDisplayString(friendlyTitle.value), 9, _hoisted_4$1)),
          createVNode(ButtonBox, { class: "forest-toolbar" }, {
            default: withCtx(() => [
              createBaseVNode("a", {
                class: "action stash one",
                title: "Restore",
                onClick: withModifiers(restore, ["prevent", "stop"])
              }),
              createVNode(Menu, {
                summaryClass: "action remove last-toolbar-button",
                title: "Delete Forever"
              }, {
                default: withCtx(() => [
                  createBaseVNode("button", {
                    onClick: withModifiers(remove, ["prevent", "stop"])
                  }, _cache[1] || (_cache[1] = [
                    createBaseVNode("span", null, "Delete Forever", -1)
                  ]))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ], 2)),
        "children" in item.value ? (openBlock(), createElementBlock("ul", _hoisted_5$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(item.value.children, (_child, index) => {
            return openBlock(), createElementBlock("li", { key: index }, [
              createVNode(_component_Item, {
                deletion: props.deletion,
                path: [...props.path, index]
              }, null, 8, ["deletion", "path"])
            ]);
          }), 128)),
          item.value.filtered_count ? (openBlock(), createElementBlock("li", _hoisted_6$1, [
            createBaseVNode("div", _hoisted_7$1, [
              _cache[2] || (_cache[2] = createBaseVNode("span", { class: "forest-icon icon" }, null, -1)),
              createBaseVNode("span", _hoisted_8$1, " + " + toDisplayString(item.value.filtered_count) + " filtered ", 1)
            ])
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const date_formatter = new Intl.DateTimeFormat();
const _sfc_main = defineComponent({
  components: { LoadMore, DeletedItem: _sfc_main$1, ItemIcon: _sfc_main$2, OopsNotification, SearchInput: _sfc_main$3 },
  props: {
    state: required(Object)
  },
  data: () => ({
    search_text: ""
  }),
  computed: {
    record_groups() {
      const ret = [];
      let cutoff = this.startOfToday();
      let records = [];
      for (const r of this.state.entries) {
        while (r.deleted_at.valueOf() < cutoff.valueOf()) {
          if (records.length > 0) {
            ret.push({ title: cutoff.toLocaleDateString(), records });
          }
          records = [];
          cutoff = new Date(cutoff.valueOf() - 24 * 60 * 60 * 1e3);
        }
        records.push(r);
      }
      if (records.length > 0) {
        ret.push({ title: cutoff.toLocaleDateString(), records });
      }
      return ret;
    },
    search: {
      get() {
        return this.search_text;
      },
      set(t) {
        if (t !== this.search_text) {
          this.search_text = t;
          the.model.deleted_items.filter(this.item_filter);
        }
      }
    },
    text_matcher() {
      return textMatcher(this.search);
    },
    item_mapper() {
      const match = this.text_matcher;
      const mapitem = (item) => {
        if (match(item.title)) return item;
        if ("url" in item && match(item.url)) return item;
        if ("children" in item) {
          const mapped = {
            title: item.title,
            children: filterMap(item.children, mapitem)
          };
          if (mapped.children.length === 0) return void 0;
          mapped.filtered_count = item.children.length - mapped.children.length;
          return mapped;
        }
        return void 0;
      };
      return mapitem;
    },
    item_filter() {
      const mapitem = this.item_mapper;
      return (item) => mapitem(item) !== void 0;
    },
    filter_results() {
      if (!this.search) return this.record_groups;
      const mapitem = this.item_mapper;
      return filterMap(this.record_groups, (rg) => {
        const filtered = filterMap(rg.records, (r) => {
          const i = mapitem(r.item);
          if (i)
            return {
              key: r.key,
              deleted_at: r.deleted_at,
              item: i
            };
          return void 0;
        });
        if (filtered.length === 0) return void 0;
        return {
          title: rg.title,
          records: filtered
        };
      });
    },
    showCrashReport() {
      return the.model.options.showCrashReport.value;
    }
  },
  methods: {
    pageref,
    loadMore() {
      return the.model.deleted_items.loadMore();
    },
    startOfToday() {
      const d = /* @__PURE__ */ new Date();
      d.setMilliseconds(0);
      d.setSeconds(0);
      d.setMinutes(0);
      d.setHours(0);
      return d;
    },
    friendlyDay(d) {
      return date_formatter.format(d);
    }
  }
});
const _hoisted_1 = { class: "page action-container" };
const _hoisted_2 = ["href"];
const _hoisted_3 = { class: "forest one-column" };
const _hoisted_4 = { class: "forest-item" };
const _hoisted_5 = { class: "forest-title disabled" };
const _hoisted_6 = { class: "forest-children" };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = { key: 2 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_OopsNotification = resolveComponent("OopsNotification");
  const _component_search_input = resolveComponent("search-input");
  const _component_DeletedItem = resolveComponent("DeletedItem");
  const _component_LoadMore = resolveComponent("LoadMore");
  return openBlock(), createElementBlock("main", null, [
    createVNode(TransitionGroup, {
      tag: "aside",
      class: "notification-overlay",
      appear: "",
      name: "notification"
    }, {
      default: withCtx(() => [
        _ctx.showCrashReport ? (openBlock(), createBlock(_component_OopsNotification, { key: "oops" })) : createCommentVNode("", true)
      ]),
      _: 1
    }),
    createBaseVNode("header", _hoisted_1, [
      createBaseVNode("a", {
        class: "action back",
        title: "Back to Tab Stash",
        href: _ctx.pageref("stash-list.html")
      }, null, 8, _hoisted_2),
      createVNode(_component_search_input, {
        "aria-label": "Search Deleted Items",
        placeholder: "Search Deleted Items",
        modelValue: _ctx.search,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.search = $event)
      }, null, 8, ["modelValue"])
    ]),
    createBaseVNode("ul", _hoisted_3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filter_results, (group) => {
        return openBlock(), createElementBlock("li", {
          key: group.title,
          class: "folder"
        }, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("span", _hoisted_5, "Deleted " + toDisplayString(group.title), 1)
          ]),
          createBaseVNode("ul", _hoisted_6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(group.records, (rec) => {
              return openBlock(), createElementBlock("li", {
                key: rec.key
              }, [
                createVNode(_component_DeletedItem, {
                  deletion: rec,
                  path: []
                }, null, 8, ["deletion"])
              ]);
            }), 128))
          ])
        ]);
      }), 128))
    ]),
    createVNode(_component_LoadMore, {
      is: "footer",
      class: "page footer status-text",
      load: _ctx.loadMore,
      isFullyLoaded: _ctx.state.fullyLoaded
    }, {
      loading: withCtx(() => _cache[1] || (_cache[1] = [
        createBaseVNode("span", { class: "spinner size-2x-icon" }, null, -1)
      ])),
      "fully-loaded": withCtx(() => [
        _ctx.search && _ctx.state.entries.length === 0 ? (openBlock(), createElementBlock("span", _hoisted_7, " No matching items were found. Your item may have been deleted on another computer, or outside of Tab Stash entirely. ")) : _ctx.state.entries.length === 0 && _ctx.state.fullyLoaded ? (openBlock(), createElementBlock("span", _hoisted_8, " It doesn't look like you've deleted anything on this computer yet. ")) : (openBlock(), createElementBlock("span", _hoisted_9, " Didn't find what you're looking for? It may have been deleted on another computer, or outside of Tab Stash entirely. "))
      ]),
      _: 1
    }, 8, ["load", "isFullyLoaded"])
  ]);
}
const Main = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
launch(Main, async () => {
  await init();
  return {
    propsData: {
      state: the.model.deleted_items.state
    }
  };
});
