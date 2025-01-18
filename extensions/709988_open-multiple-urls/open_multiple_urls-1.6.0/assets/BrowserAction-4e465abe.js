import { _ as _export_sfc } from "./_plugin-vue_export-helper-8461c927.js";
import { r as reactive, b as browser, a as ref, o as onMounted, c as openBlock, d as createElementBlock, e as createBaseVNode, f as createTextVNode, t as toDisplayString, g as createCommentVNode, h as defineComponent, u as unref, F as Fragment, i as createVNode, j as createApp } from "./vendor-e74b1f13.js";
const browseraction = "";
var BrowserStorageKey = /* @__PURE__ */ ((BrowserStorageKey2) => {
  BrowserStorageKey2["urlList"] = "txt";
  BrowserStorageKey2["lazyload"] = "lazyload";
  BrowserStorageKey2["random"] = "random";
  BrowserStorageKey2["reverse"] = "reverse";
  BrowserStorageKey2["preserve"] = "preserve";
  BrowserStorageKey2["deduplicate"] = "deduplicate";
  return BrowserStorageKey2;
})(BrowserStorageKey || {});
const store = reactive({
  urlList: "",
  lazyLoadingChecked: false,
  loadInRandomOrderChecked: false,
  loadInReverseOrderChecked: false,
  preserveInputChecked: false,
  deduplicateURLsChecked: false,
  setUrlList(value) {
    this.urlList = value;
    if (store.preserveInputChecked) {
      browser.storage.local.set({ [BrowserStorageKey.urlList]: value });
    }
  },
  setLazyLoadingChecked(value) {
    this.lazyLoadingChecked = value;
    browser.storage.local.set({ [BrowserStorageKey.lazyload]: value });
  },
  setLoadInRandomOrderChecked(value) {
    this.loadInRandomOrderChecked = value;
    browser.storage.local.set({ [BrowserStorageKey.random]: value });
  },
  setLoadInReverseOrderChecked(value) {
    this.loadInReverseOrderChecked = value;
    browser.storage.local.set({ [BrowserStorageKey.reverse]: value });
  },
  setPreserveInputChecked(value) {
    this.preserveInputChecked = value;
    browser.storage.local.set({ [BrowserStorageKey.preserve]: value });
    browser.storage.local.set({ [BrowserStorageKey.urlList]: value ? store.urlList : "" });
  },
  setDeduplicateURLsChecked(value) {
    this.deduplicateURLsChecked = value;
    browser.storage.local.set({ [BrowserStorageKey.deduplicate]: value });
  }
});
const _sfc_main$3 = {
  computed: {
    store() {
      return store;
    }
  },
  setup() {
    const urlTextArea = ref(null);
    onMounted(() => {
      if (urlTextArea.value) {
        urlTextArea.value.select();
      }
    });
    return {
      urlTextArea
    };
  },
  methods: {
    handleUrlListInput(event) {
      store.setUrlList((event == null ? void 0 : event.target).value);
    }
  }
};
const _hoisted_1$3 = { id: "url-list-input" };
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("label", { for: "urls" }, "List of URLs / Text to extract URLs from:", -1);
const _hoisted_3$2 = ["value"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1$3, [
    _hoisted_2$3,
    createBaseVNode("textarea", {
      ref: "urlTextArea",
      id: "urls",
      wrap: "soft",
      tabindex: "1",
      value: $options.store.urlList,
      onInput: _cache[0] || (_cache[0] = (...args) => $options.handleUrlListInput && $options.handleUrlListInput(...args))
    }, null, 40, _hoisted_3$2)
  ]);
}
const UrlListInput = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1]]);
const shuffle = (a) => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};
const loadSites = (text, lazyloading, random, reverse, deduplicate) => {
  const urlschemes = ["http", "https", "file", "view-source"];
  let urls = getURLsFromText(text, deduplicate);
  if (reverse) {
    urls = urls.reverse();
  }
  if (random) {
    urls = shuffle(urls);
  }
  for (let i = 0; i < urls.length; i++) {
    let theurl = urls[i].trim();
    if (theurl !== "") {
      if (urlschemes.indexOf(theurl.split(":")[0]) === -1) {
        theurl = "http://" + theurl;
      }
      if (lazyloading && theurl.split(":")[0] !== "view-source" && theurl.split(":")[0] !== "file") {
        browser.tabs.create({
          url: browser.runtime.getURL("lazyloading.html#") + theurl,
          active: false
        });
      } else {
        browser.tabs.create({
          url: theurl,
          active: false
        });
      }
    }
  }
};
const getTabCount = (text, deduplicate) => {
  let tabCount = "0";
  if (text) {
    const urls = getURLsFromText(text, deduplicate);
    if (urls.length <= 5e3) {
      tabCount = String(urls.length);
    } else {
      tabCount = "> 5000";
    }
  }
  return tabCount;
};
const getURLsFromText = (text, deduplicate) => {
  const urlLineSplitRegex = /\r\n?|\n/g;
  const urls = text.split(urlLineSplitRegex).filter((line) => line.trim() !== "");
  return deduplicate ? Array.from(new Set(urls)) : urls;
};
const extractURLs = (text) => {
  let urls = "";
  let urlmatcharr;
  const urlregex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi;
  while ((urlmatcharr = urlregex.exec(text)) !== null) {
    const match = urlmatcharr[0];
    urls += match + "\n";
  }
  return urls;
};
const _sfc_main$2 = {
  methods: {
    openURLs() {
      loadSites(
        store.urlList,
        store.lazyLoadingChecked,
        store.loadInRandomOrderChecked,
        store.loadInReverseOrderChecked,
        store.deduplicateURLsChecked
      );
    },
    setUrlListInputData() {
      store.setUrlList(extractURLs(store.urlList));
    }
  },
  computed: {
    tabCount: function() {
      return getTabCount(store.urlList, store.deduplicateURLsChecked);
    }
  }
};
const _hoisted_1$2 = { id: "action-bar" };
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("strong", null, "Open URLs", -1);
const _hoisted_3$1 = [
  _hoisted_2$2
];
const _hoisted_4$1 = {
  key: 0,
  id: "tabcount"
};
const _hoisted_5$1 = { title: "Opening too many tabs at once may lead to long wait times or crash your browser." };
const _hoisted_6$1 = { id: "tabcount-number" };
const _hoisted_7$1 = { id: "tabcount-tab-label" };
const _hoisted_8$1 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", _hoisted_1$2, [
    createBaseVNode("button", {
      id: "extract",
      tabindex: "6",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.setUrlListInputData && $options.setUrlListInputData(...args))
    }, "Extract URLs from text"),
    createBaseVNode("button", {
      id: "open",
      tabindex: "2",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.openURLs && $options.openURLs(...args))
    }, _hoisted_3$1),
    $options.tabCount !== "0" ? (openBlock(), createElementBlock("span", _hoisted_4$1, [
      createBaseVNode("abbr", _hoisted_5$1, [
        createTextVNode(" ⓘ "),
        createBaseVNode("span", null, [
          createTextVNode(" will open "),
          createBaseVNode("span", _hoisted_6$1, toDisplayString($options.tabCount), 1),
          createTextVNode(" new "),
          createBaseVNode("span", _hoisted_7$1, [
            createTextVNode("tab"),
            $options.tabCount !== "1" ? (openBlock(), createElementBlock("span", _hoisted_8$1, "s")) : createCommentVNode("", true)
          ])
        ])
      ])
    ])) : createCommentVNode("", true)
  ]);
}
const ActionBar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
const _hoisted_1$1 = { id: "option-bar" };
const _hoisted_2$1 = { class: "checkbox" };
const _hoisted_3 = ["checked"];
const _hoisted_4 = { class: "checkbox" };
const _hoisted_5 = ["checked"];
const _hoisted_6 = { class: "checkbox" };
const _hoisted_7 = ["checked"];
const _hoisted_8 = { class: "checkbox" };
const _hoisted_9 = ["checked"];
const _hoisted_10 = { class: "checkbox" };
const _hoisted_11 = ["checked"];
const __default__ = {
  methods: {
    checkLazyLoading(event) {
      this.$nextTick(() => {
        store.setLazyLoadingChecked((event == null ? void 0 : event.target).checked);
      });
    },
    checkLoadInRandomOrder(event) {
      this.$nextTick(() => {
        store.setLoadInRandomOrderChecked((event == null ? void 0 : event.target).checked);
      });
    },
    checkLoadInReverseOrder(event) {
      this.$nextTick(() => {
        store.setLoadInReverseOrderChecked((event == null ? void 0 : event.target).checked);
      });
    },
    checkPreserveInput(event) {
      this.$nextTick(() => {
        store.setPreserveInputChecked((event == null ? void 0 : event.target).checked);
      });
    },
    checkDeduplicateURLs(event) {
      this.$nextTick(() => {
        store.setDeduplicateURLsChecked((event == null ? void 0 : event.target).checked);
      });
    }
  }
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "OptionBar",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("section", _hoisted_1$1, [
          createBaseVNode("label", _hoisted_2$1, [
            createBaseVNode("input", {
              type: "checkbox",
              id: "lazyLoad",
              tabindex: "3",
              checked: unref(store).lazyLoadingChecked,
              onChange: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => _ctx.checkLazyLoading && _ctx.checkLazyLoading(...args))
            }, null, 40, _hoisted_3),
            createTextVNode(" Do not load tabs until selected")
          ]),
          createBaseVNode("label", _hoisted_4, [
            createBaseVNode("input", {
              type: "checkbox",
              id: "random",
              tabindex: "4",
              checked: unref(store).loadInRandomOrderChecked,
              onChange: _cache[1] || (_cache[1] = //@ts-ignore
              (...args) => _ctx.checkLoadInRandomOrder && _ctx.checkLoadInRandomOrder(...args))
            }, null, 40, _hoisted_5),
            createTextVNode(" Load in random order")
          ]),
          createBaseVNode("label", _hoisted_6, [
            createBaseVNode("input", {
              type: "checkbox",
              id: "reverse",
              tabindex: "4",
              checked: unref(store).loadInReverseOrderChecked,
              onChange: _cache[2] || (_cache[2] = //@ts-ignore
              (...args) => _ctx.checkLoadInReverseOrder && _ctx.checkLoadInReverseOrder(...args))
            }, null, 40, _hoisted_7),
            createTextVNode(" Load in reverse order")
          ]),
          createBaseVNode("label", _hoisted_8, [
            createBaseVNode("input", {
              type: "checkbox",
              id: "deduplicate",
              tabindex: "5",
              checked: unref(store).deduplicateURLsChecked,
              onChange: _cache[3] || (_cache[3] = //@ts-ignore
              (...args) => _ctx.checkDeduplicateURLs && _ctx.checkDeduplicateURLs(...args))
            }, null, 40, _hoisted_9),
            createTextVNode(" Ignore duplicate URLs")
          ])
        ]),
        createBaseVNode("section", null, [
          createBaseVNode("label", _hoisted_10, [
            createBaseVNode("input", {
              type: "checkbox",
              id: "preserve",
              tabindex: "5",
              checked: unref(store).preserveInputChecked,
              onChange: _cache[4] || (_cache[4] = //@ts-ignore
              (...args) => _ctx.checkPreserveInput && _ctx.checkPreserveInput(...args))
            }, null, 40, _hoisted_11),
            createTextVNode(" Preserve input")
          ])
        ])
      ], 64);
    };
  }
});
const _hoisted_1 = { key: 0 };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("hr", null, null, -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BrowserAction",
  setup(__props) {
    const isStoredValuesLoaded = ref(false);
    Promise.all([
      browser.storage.local.get(BrowserStorageKey.urlList),
      browser.storage.local.get(BrowserStorageKey.lazyload),
      browser.storage.local.get(BrowserStorageKey.random),
      browser.storage.local.get(BrowserStorageKey.reverse),
      browser.storage.local.get(BrowserStorageKey.preserve),
      browser.storage.local.get(BrowserStorageKey.deduplicate)
    ]).then((data) => {
      store.urlList = data[0][BrowserStorageKey.urlList] ?? "";
      store.lazyLoadingChecked = data[1][BrowserStorageKey.lazyload] ?? false;
      store.loadInRandomOrderChecked = data[2][BrowserStorageKey.random] ?? false;
      store.loadInReverseOrderChecked = data[3][BrowserStorageKey.reverse] ?? false;
      store.preserveInputChecked = data[4][BrowserStorageKey.preserve] ?? false;
      store.deduplicateURLsChecked = data[5][BrowserStorageKey.deduplicate] ?? false;
      isStoredValuesLoaded.value = true;
    });
    return (_ctx, _cache) => {
      return isStoredValuesLoaded.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(UrlListInput),
        createVNode(ActionBar),
        _hoisted_2,
        createVNode(_sfc_main$1)
      ])) : createCommentVNode("", true);
    };
  }
});
createApp(_sfc_main).mount("#app");
//# sourceMappingURL=BrowserAction-4e465abe.js.map
