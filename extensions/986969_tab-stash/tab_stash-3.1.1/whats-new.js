import { d as defineComponent, o as openBlock, b as createElementBlock, n as normalizeClass, t as toDisplayString, h as createCommentVNode, e as createBaseVNode, E as renderSlot, s as createTextVNode, F as Fragment, g as renderList, j as required, al as cmpVersions, i as withModifiers, p as pageref, a as resolveComponent, f as createVNode, w as withCtx, q as launch, af as resolveNamed, M as Model, u as browser } from "./assets/launch-vue.js";
import { _ as _export_sfc } from "./assets/_plugin-vue_export-helper.js";
function coerceArray(i) {
  if (i instanceof Array) return i;
  return [i];
}
const _sfc_main$2 = defineComponent({
  props: {
    v: String,
    // v is for "verb"
    subtext: String,
    issue: [Array, Number],
    pr: [Array, Number],
    thanks: [Array, String]
  },
  computed: {
    verbClass() {
      if (!this.v) return "";
      return this.v.toLowerCase().replace(":", "").replace(" ", "-");
    },
    emoji() {
      switch (this.verbClass) {
        case "new":
        case "added":
          return "🚀";
        case "improved":
          return "👍";
        case "fixed":
          return "✅";
        case "removed":
          return "❌";
        case "new-experiment":
        case "experiment-released":
          return "🧪";
        default:
          return "";
      }
    },
    links() {
      const links = [];
      const issues = coerceArray(this.issue || []);
      const prs = coerceArray(this.pr || []);
      const thanks = coerceArray(this.thanks || []);
      links.push(
        ...issues.map((i) => ({
          text: `#${i}`,
          href: `https://github.com/josh-berry/tab-stash/issues/${i}`
        }))
      );
      links.push(
        ...prs.map((pr) => ({
          text: `pr#${pr}`,
          href: `https://github.com/josh-berry/tab-stash/pull/${pr}`
        }))
      );
      links.push(
        ...thanks.map((thx) => ({
          text: `🙏 ${thx}`,
          href: `https://github.com/${thx}`
        }))
      );
      return links;
    }
  }
});
const _hoisted_1$2 = ["title"];
const _hoisted_2$1 = { key: 1 };
const _hoisted_3$1 = {
  key: 2,
  class: "issue"
};
const _hoisted_4 = ["href"];
const _hoisted_5 = { key: 0 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", { title: _ctx.subtext }, [
    _ctx.v ? (openBlock(), createElementBlock("span", {
      key: 0,
      class: normalizeClass({ [_ctx.verbClass]: true })
    }, toDisplayString(_ctx.emoji ? `${_ctx.emoji} ` : "") + toDisplayString(_ctx.v), 3)) : createCommentVNode("", true),
    _ctx.v ? (openBlock(), createElementBlock("span", _hoisted_2$1, " ")) : createCommentVNode("", true),
    createBaseVNode("span", null, [
      renderSlot(_ctx.$slots, "default")
    ]),
    _ctx.links.length > 0 ? (openBlock(), createElementBlock("span", _hoisted_3$1, [
      _cache[0] || (_cache[0] = createTextVNode(" [")),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.links, (l, idx) => {
        return openBlock(), createElementBlock("span", {
          key: l.text
        }, [
          createBaseVNode("a", {
            href: l.href
          }, toDisplayString(l.text), 9, _hoisted_4),
          idx < _ctx.links.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_5, ", ")) : createCommentVNode("", true)
        ]);
      }), 128)),
      _cache[1] || (_cache[1] = createTextVNode("] "))
    ])) : createCommentVNode("", true)
  ], 8, _hoisted_1$2);
}
const L = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = defineComponent({
  props: { v: required(String) },
  inject: ["last_notified_version"],
  data: () => ({ collapsed: void 0 }),
  computed: {
    is_collapsed() {
      const version = this.last_notified_version;
      if (this.collapsed !== void 0) return this.collapsed;
      return version !== void 0 && cmpVersions(this.v, version) <= 0;
    }
  }
});
const _hoisted_1$1 = { class: "forest-title" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", null, [
    createBaseVNode("div", {
      class: normalizeClass({
        "forest-item": true,
        "action-container": true,
        collapsed: _ctx.is_collapsed
      })
    }, [
      createBaseVNode("span", _hoisted_1$1, "Version " + toDisplayString(_ctx.v), 1),
      createBaseVNode("a", {
        class: normalizeClass({
          action: true,
          "forest-collapse": true,
          collapse: !_ctx.is_collapsed,
          expand: _ctx.is_collapsed
        }),
        onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.collapsed = !_ctx.is_collapsed, ["prevent", "stop"]))
      }, null, 2)
    ], 2),
    createBaseVNode("ul", {
      class: normalizeClass({
        "forest-children": true,
        "version-changes": true,
        collapsed: _ctx.is_collapsed
      })
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)
  ]);
}
const Version = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = defineComponent({
  components: { Version, L },
  methods: { pageref }
});
const _hoisted_1 = { class: "page action-container" };
const _hoisted_2 = ["href"];
const _hoisted_3 = { class: "forest one-column" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_L = resolveComponent("L");
  const _component_Version = resolveComponent("Version");
  return openBlock(), createElementBlock("main", null, [
    createBaseVNode("header", _hoisted_1, [
      createBaseVNode("a", {
        class: "action back",
        title: "Back to Tab Stash",
        href: _ctx.pageref("stash-list.html")
      }, null, 8, _hoisted_2),
      _cache[0] || (_cache[0] = createBaseVNode("h1", null, "What's New in Tab Stash", -1))
    ]),
    createBaseVNode("ul", _hoisted_3, [
      createVNode(_component_Version, { v: "3.1.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            v: "Fixed:",
            issue: 369
          }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createTextVNode("When stashing the active tab, an adjacent tab is now chosen as the new active tab, instead of a random tab elsewhere in the window.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            subtext: "I feel like it might be possible to build an entire career out of making drag-and-drop work well. It seems to be incredibly finicky and hard to get right.",
            issue: 524
          }, {
            default: withCtx(() => _cache[2] || (_cache[2] = [
              createTextVNode("an issue preventing drag-and-drop into an empty folder at the end of a group, and made the drag-and-drop experience a little smoother in general.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            subtext: "We just keep loading and loading and loading and loading and",
            issue: 533
          }, {
            default: withCtx(() => _cache[3] || (_cache[3] = [
              createTextVNode("a rare issue that could lead to high CPU usage when first opening the Tab Stash UI.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            subtext: "Tab Stash is probably not affected, but I pulled in the fix anyway out of an abundance of caution.",
            pr: 536
          }, {
            default: withCtx(() => _cache[4] || (_cache[4] = [
              createTextVNode("a security issue in one of Tab Stash's dependencies.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            issue: 537
          }, {
            default: withCtx(() => _cache[5] || (_cache[5] = [
              createTextVNode("a crash that could happen when closing and then opening a tab very quickly.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "3.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            v: "Improved",
            issue: [97, 508]
          }, {
            default: withCtx(() => _cache[6] || (_cache[6] = [
              createTextVNode("performance in many areas of Tab Stash, especially when first loading the UI.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed:",
            issue: 520
          }, {
            default: withCtx(() => _cache[7] || (_cache[7] = [
              createTextVNode("The Tab Stash icon was blurry when Tab Stash was not pinned to the Firefox toolbar. A higher-resolution version of the icon is now available for the browser to use in this situation.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "",
            issue: 403
          }, {
            default: withCtx(() => _cache[8] || (_cache[8] = [
              createBaseVNode("em", null, [
                createTextVNode("If you'd like, you can now leave me a tip on my "),
                createBaseVNode("a", { href: "https://github.com/sponsors/josh-berry" }, "GitHub Sponsor"),
                createTextVNode(" page. Tab Stash is 100% free and open source, so there's no obligation, just my gratitude. 🙇")
              ], -1)
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "3.0.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            v: "Fixed",
            issue: 417
          }, {
            default: withCtx(() => _cache[9] || (_cache[9] = [
              createTextVNode("an issue that might cause Tab Stash to crash on startup if Firefox's bookmarks database is corrupt.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed:",
            issue: 445
          }, {
            default: withCtx(() => _cache[10] || (_cache[10] = [
              createTextVNode('"Close unstashed tabs" no longer closes pinned tabs by mistake.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed:",
            issue: 449
          }, {
            default: withCtx(() => _cache[11] || (_cache[11] = [
              createTextVNode("Drag-and-drop while holding the Option key now copies tabs instead of moving them.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            issue: 425
          }, {
            default: withCtx(() => _cache[12] || (_cache[12] = [
              createTextVNode("an issue that would leave hidden tabs open by mistake, even if the tab was removed from the stash.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Improved" }, {
            default: withCtx(() => _cache[13] || (_cache[13] = [
              createTextVNode("performance of drag-and-drop between folders in large stashes.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "3.0" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            v: "New:",
            issue: 14
          }, {
            default: withCtx(() => _cache[14] || (_cache[14] = [
              createTextVNode("Tab Stash now supports sub-groups! You can even nest sub-groups as deeply as you want, so those complicated research projects are easier to tackle.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Experiment Released:",
            issue: 115
          }, {
            default: withCtx(() => _cache[15] || (_cache[15] = [
              createTextVNode("The popup view is now stable! You can now configure the Tab Stash toolbar button to show your stashed tabs in a popup.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "New:",
            issue: 252
          }, {
            default: withCtx(() => _cache[16] || (_cache[16] = [
              createTextVNode("Tab Stash's styling now fits better with the new Firefox design. This includes all-new icons, refreshed colors, and other visual touches to give Tab Stash a more modern look and feel.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "New:",
            issue: 123
          }, {
            default: withCtx(() => _cache[17] || (_cache[17] = [
              createTextVNode("New users are now prompted to set important preferences, such as toolbar button behavior, when they first try to use Tab Stash.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Added",
            issue: 163,
            pr: 372,
            thanks: "samca2"
          }, {
            default: withCtx(() => _cache[18] || (_cache[18] = [
              createTextVNode("an option to show new groups collapsed by default.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Added",
            issue: 284
          }, {
            default: withCtx(() => _cache[19] || (_cache[19] = [
              createTextVNode("a menu option to close stashed tabs in a particular group.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Improved:",
            issue: 90,
            pr: 378,
            thanks: "samca2"
          }, {
            default: withCtx(() => _cache[20] || (_cache[20] = [
              createTextVNode("Hidden tabs which are playing audio are no longer automatically unloaded, so you can keep listening to music that's playing in your stashed tabs.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Improved:",
            issue: 317
          }, {
            default: withCtx(() => _cache[21] || (_cache[21] = [
              createTextVNode("The option to delete a group is now hidden inside a menu, making it harder to delete something by accident.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Improved:",
            issue: 266
          }, {
            default: withCtx(() => _cache[22] || (_cache[22] = [
              createTextVNode(`Limited the width of the "Unstashed Tabs"/"Open Tabs" box so it's easier to use.`)
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            issue: 371
          }, {
            default: withCtx(() => _cache[23] || (_cache[23] = [
              createTextVNode('a crash that occurs when pasting raw HTML into the "Import" box.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            issue: 338
          }, {
            default: withCtx(() => _cache[24] || (_cache[24] = [
              createTextVNode("a crash that occurs when closing a tab that has Firefox's developer tools open.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            issue: 321
          }, {
            default: withCtx(() => _cache[25] || (_cache[25] = [
              createTextVNode("an issue that in rare cases causes a crash and a zombie/non-existent tab to appear in Tab Stash's UI if Firefox sends incorrect information to Tab Stash.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            issue: 377
          }, {
            default: withCtx(() => _cache[26] || (_cache[26] = [
              createTextVNode("an issue that prevented groups from being deleted when Tab Stash is set as the user's homepage.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.12.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            v: "Improved",
            issue: 335
          }, {
            default: withCtx(() => _cache[27] || (_cache[27] = [
              createTextVNode("loading of website icons to avoid crashes when your system is running slowly.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            v: "Fixed",
            issue: 308
          }, {
            default: withCtx(() => _cache[28] || (_cache[28] = [
              createTextVNode("the color of the Tab Stash tab's icon when in dark mode.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.12.0.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[29] || (_cache[29] = [
              createTextVNode("a packaging issue preventing upload to Mozilla.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.12" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 268,
            v: "Added"
          }, {
            default: withCtx(() => _cache[30] || (_cache[30] = [
              createTextVNode("a confirmation before closing lots of open tabs.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 299,
            v: "Added"
          }, {
            default: withCtx(() => _cache[31] || (_cache[31] = [
              createTextVNode("a button to clear the search box.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 109,
            v: "Added"
          }, {
            default: withCtx(() => _cache[32] || (_cache[32] = [
              createTextVNode("an option to the importer to skip loading titles and icons. If loading is skipped, the importer will try to auto-detect page titles where possible.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 125,
            v: "Experiment Released:"
          }, {
            default: withCtx(() => _cache[33] || (_cache[33] = [
              createTextVNode("Container tabs now have small colored bars showing which container the tab belongs to.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 298,
            v: "Improved"
          }, {
            default: withCtx(() => _cache[34] || (_cache[34] = [
              createTextVNode("the process of restoring tabs. Tabs are auto-loaded once again, but slowly so as to avoid overwhelming your computer. There is a new setting to revert to the previous behavior of loading tabs lazily if you still run into performance issues.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Improved" }, {
            default: withCtx(() => _cache[35] || (_cache[35] = [
              createTextVNode("reliability and performance of importing tabs and updating website icons. Tab Stash will now load tabs in parallel based on how many cores are available on your computer, and will retry failed tabs a few times before giving up.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[36] || (_cache[36] = [
              createTextVNode("a crash that occurred on rare occasions when saving website icons to the cache.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 306,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[37] || (_cache[37] = [
              createTextVNode("an issue where the importer would sometimes detect invalid characters as being part of URLs.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.11.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 295,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[38] || (_cache[38] = [
              createTextVNode("an issue that prevented drag-and-drop of two consecutive items in the same stash.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 293,
            v: "Fixed:"
          }, {
            default: withCtx(() => _cache[39] || (_cache[39] = [
              createTextVNode("When dragging a single tab out of the stash and back into the window, actually restore the tab instead of deleting it.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[40] || (_cache[40] = [
              createTextVNode("an issue that occasionally caused tabs to be restored in the wrong position. When dragging tabs out of the stash and back into the window, they are now placed in the correct position relative to other open tabs.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.11.0.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[41] || (_cache[41] = [
              createTextVNode("a build issue identified by Mozilla during review.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.11" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 168,
            pr: 258,
            thanks: "sleak75",
            v: "New:"
          }, {
            default: withCtx(() => _cache[42] || (_cache[42] = [
              createTextVNode('Rename stashed tabs by clicking the "Edit" icon.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 185,
            pr: 221,
            thanks: "KerfuffleV2",
            v: "New:"
          }, {
            default: withCtx(() => _cache[43] || (_cache[43] = [
              createTextVNode("Show stats about each group of stashed tabs by hovering over the stash name.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 116,
            v: "Experiment Released:"
          }, {
            default: withCtx(() => _cache[44] || (_cache[44] = [
              createTextVNode('Click the "Unstashed Tabs" heading to toggle between showing all open/unpinned tabs and just unstashed tabs.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 125,
            pr: 219,
            thanks: "KerfuffleV2",
            v: "New Experiment:"
          }, {
            default: withCtx(() => _cache[45] || (_cache[45] = [
              createTextVNode("Show a colorized marker for tabs which belong to a container.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 215,
            pr: 216,
            thanks: "KerfuffleV2",
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[46] || (_cache[46] = [
              createTextVNode("Middle-clicking an open tab will now close it, and middle-clicking a closed tab will now open it.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 129,
            v: "Improved"
          }, {
            default: withCtx(() => _cache[47] || (_cache[47] = [
              createTextVNode("performance when unstashing large numbers of tabs, by lazily loading them only when activated.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 46,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[48] || (_cache[48] = [
              createTextVNode("Tab Stash will no longer create duplicate tabs when moving into a stash if a tab already exists in that stash.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            pr: 225,
            thanks: "KerfuffleV2",
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[49] || (_cache[49] = [
              createTextVNode("Display an animation while a tab is being loaded.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            pr: 220,
            thanks: "KerfuffleV2",
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[50] || (_cache[50] = [
              createTextVNode("Tabs which are unloaded now appear dimmed.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 240,
            pr: 241,
            thanks: "KerfuffleV2",
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[51] || (_cache[51] = [
              createTextVNode("an issue that may cause high CPU usage when the stash is completely empty.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: [228, 272],
            pr: [233, 237, 241],
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[52] || (_cache[52] = [
              createTextVNode("various small issues related to drag-and-drop, UI styling/behavior, and performance.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.10.3" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 214,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[53] || (_cache[53] = [
              createTextVNode('a crash that may occur if website icons take too long to load when first opening the UI. ("NanoTimeoutError")')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 223,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[54] || (_cache[54] = [
              createTextVNode('a crash that may occur if the Tab Stash UI loses contact with the Tab Stash background page. ("Disconnected" error)')
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.10.2" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            subtext: `If you find that your laptop isn't keeping your lap as warm as it used to after this update, may I recommend a cat instead?  Replacing your laptop with a cat can reduce your power bill, since cats are solar-powered.  Cats also send fewer notifications and are easier to pet.`,
            issue: 172,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[55] || (_cache[55] = [
              createTextVNode("Processing and cleanup of deleted items now uses much less CPU.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 201,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[56] || (_cache[56] = [
              createTextVNode('The "safety net" added in v2.10.1 will now use much less CPU if it is invoked repeatedly. Also, if a crash occurs, a (hopefully) helpful error message will be displayed to help with troubleshooting.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `Are you REALLY SURE you wanted to delete those tabs?  You are?  Well, I don't believe you.`,
            issue: 181,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[57] || (_cache[57] = [
              createTextVNode("an issue that could prevent loading website icons or deleting stashed tabs in some situations.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: [179, 190],
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[58] || (_cache[58] = [
              createTextVNode("an issue causing stashed or imported tabs to be added to a recently-created group by mistake. Stashing or importing multiple tabs at once will now create a new group as expected.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 204,
            v: "Fixed:"
          }, {
            default: withCtx(() => _cache[59] || (_cache[59] = [
              createTextVNode("Import will now ignore invalid URLs and empty groups without crashing.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 210,
            v: "Fixed:"
          }, {
            default: withCtx(() => _cache[60] || (_cache[60] = [
              createTextVNode('The collapsed state of "Unstashed Tabs" will no longer be forgotten on browser restart (or once a day).')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 188,
            v: "Removed:"
          }, {
            default: withCtx(() => _cache[61] || (_cache[61] = [
              createTextVNode("Tab Stash will no longer restore tabs that were recently-closed. Recent versions of Firefox introduced a bug which made this functionality restore the wrong tab at times. (This feature is still available as an experimental feature for those who want to continue using it.)")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.10.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, { v: "Improved:" }, {
            default: withCtx(() => _cache[62] || (_cache[62] = [
              createTextVNode(`Added a "safety net" which reloads the browser data used to display the UI if the UI detects that it's gotten out of sync with the browser.`)
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[63] || (_cache[63] = [
              createTextVNode("an issue which would sometimes cause Tab Stash to lose track of the focused window, preventing the UI from opening.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[64] || (_cache[64] = [
              createTextVNode("an issue that would in some cases cause Tab Stash to lose track of tabs that are moved between windows.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed:" }, {
            default: withCtx(() => _cache[65] || (_cache[65] = [
              createTextVNode("Restoring a tab that's already open in another window will no longer move the tab from the other window into the current one. A new tab will be created instead.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.10" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 57,
            v: "New:"
          }, {
            default: withCtx(() => _cache[66] || (_cache[66] = [
              createTextVNode("Select and move multiple tabs at once using drag-and-drop or the new selection menu. Click on a tab's icon to get started!")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "New:" }, {
            default: withCtx(() => _cache[67] || (_cache[67] = [
              createTextVNode(`If you want to see which tabs in a particular group don't match your search, click the "+ N Filtered" label to show all tabs in that group.`)
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 118,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[68] || (_cache[68] = [
              createTextVNode("Group names are now searched along with tab titles and URLs. If you have a lot of groups, it's now easier to find the one you're looking for.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 160,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[69] || (_cache[69] = [
              createTextVNode(`"Delete" buttons are now shown even on collapsed groups. Now that Tab Stash can un-delete items, there's no reason to hide the "delete" buttons anymore since a mistake is easy to fix.`)
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Improved" }, {
            default: withCtx(() => _cache[70] || (_cache[70] = [
              createTextVNode("the aesthetics of the UI in various small ways (most notably, a default icon is now shown for tabs that don't have one).")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `Tab Stash now uses Vue 3, and a number of off-the-shelf components were replaced with custom implementations to make the code cleaner, simpler and faster. There is also a completely rewritten model and a LOT more automated tests.`,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[71] || (_cache[71] = [
              createTextVNode("Lots of behind-the-scenes improvements to pave the way for new features and better performance.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 122,
            v: "Fixed:"
          }, {
            default: withCtx(() => _cache[72] || (_cache[72] = [
              createTextVNode("Tab Stash no longer stashes new/blank tabs. This also means that, if we are asked to stash tabs when only a new tab is open, we won't create a group with just a single, lonely new tab.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.9" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 108,
            v: "New:"
          }, {
            default: withCtx(() => _cache[73] || (_cache[73] = [
              createTextVNode("Force Tab Stash to use either light or dark colors from the options page, so you can use Tab Stash with any browser theme and the colors won't clash.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 13,
            v: "New:"
          }, {
            default: withCtx(() => _cache[74] || (_cache[74] = [
              createTextVNode('Switch between "compact" and "normal" spacing and fonts from the options page, so you can see more of your stashes at once.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `If you ever get lost, don't panic.  Just ask the nearest Internet cat for directions.  You probably won't get a helpful response—you're talking to a cat, after all—but you'll feel better for having tried.`,
            issue: 89,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[75] || (_cache[75] = [
              createTextVNode("The active tab is now marked, so you can always see where you are.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `I'm genuinely grateful for all the feedback—both positive and negative—I've gotten over the last 2.5 years of building Tab Stash.  It's been constructive and inspiring, and you've all been marvelous to work with.`
          }, {
            default: withCtx(() => _cache[76] || (_cache[76] = [
              createBaseVNode("b", null, "Tab Stash is now part of Mozilla's Recommended Extensions program!", -1),
              createTextVNode(" Thank you to everyone who's helped make Tab Stash better—whether that's leaving a review, filing a bug report, or even sending in patches. It wouldn't have been possible without you!")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.8.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, null, {
            default: withCtx(() => _cache[77] || (_cache[77] = [
              createTextVNode("Changed build parameters as requested by Mozilla.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[78] || (_cache[78] = [
              createTextVNode("an issue loading settings that were set to invalid values (e.g. due to manual editing of the settings object).")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.8" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 21,
            v: "New:"
          }, {
            default: withCtx(() => _cache[79] || (_cache[79] = [
              createTextVNode(`The behavior of the Tab Stash button in your browser's toolbar can now be customized. Choose "Options..." from the Tab Stash menu to change the setting.`)
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 64,
            v: "New:"
          }, {
            default: withCtx(() => _cache[80] || (_cache[80] = [
              createTextVNode("Allow all URLs (except URLs to Tab Stash itself) to be stashed and restored. Privileged URLs which cannot be opened by Tab Stash will instead show an intermediate page to make it easy to open the URL manually.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 101,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[81] || (_cache[81] = [
              createTextVNode("In the full-page UI, allow tabs to be dropped anywhere inside the folder box, not just immediately after the last tab in the list.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 103,
            v: "Fixed:"
          }, {
            default: withCtx(() => _cache[82] || (_cache[82] = [
              createTextVNode('Occasionally, when Tab Stash is first installed, it may create two root "Tab Stash" folders, causing a warning in the UI. This can happen if the UI is opened before the extension has finished starting up. We now detect and remove the extra folder.')
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.7.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, { v: "Fixed:" }, {
            default: withCtx(() => _cache[83] || (_cache[83] = [
              createTextVNode("During import, sites that take too long to load may be imported with missing titles and/or icons. We now wait longer, and measure time-to-load in a smarter way that is less likely to lead to premature timeouts.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.7" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            subtext: `Unlike the plastic in the oceans, your deleted tabs will eventually decompose, turning back into bits.  Studies suggest about two-thirds of all bits are consumed by the most common life-form on the Internet—cats.`,
            issue: 20,
            v: "New:"
          }, {
            default: withCtx(() => _cache[84] || (_cache[84] = [
              createTextVNode('Tab Stash now remembers deleted items for a period of time (180 days by default). Deleted items are saved locally on each computer and can be found in the "Deleted Items" menu in the stash UI.')
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "New:" }, {
            default: withCtx(() => _cache[85] || (_cache[85] = [
              createTextVNode('A "close all stashed tabs" button was added to the "Unstashed Tabs" toolbar.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 67,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[86] || (_cache[86] = [
              createTextVNode("The import and export dialogs have some additional help text and polishing to make them easier to use.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `If it falls off, simply turn it over, moisten, and gently press it back into place.  Start from the center and work toward the edges to avoid wrinkling.`,
            issue: 69,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[87] || (_cache[87] = [
              createTextVNode("The search box now sticks to the top of the page when you scroll, so it's always visible.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 71,
            v: "Improved:"
          }, {
            default: withCtx(() => _cache[88] || (_cache[88] = [
              createTextVNode("The main menu icon has been changed to use a standard menu symbol, rather than the Tab Stash logo.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Improved:" }, {
            default: withCtx(() => _cache[89] || (_cache[89] = [
              createTextVNode('Lots of "behind-the-scenes" changes have been made to improve general stability and prepare for upcoming features.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 91,
            v: "Fixed:"
          }, {
            default: withCtx(() => _cache[90] || (_cache[90] = [
              createTextVNode("If Multi-Account Containers was installed and a URL set to auto-open in a container were imported, the import process would freeze. Import now works correctly with Multi-Account Containers and other Firefox tab-container extensions.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.6" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: [11, 17],
            v: "Added"
          }, {
            default: withCtx(() => _cache[91] || (_cache[91] = [
              createTextVNode("import and export for a variety of formats, including OneTab and Markdown.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Added" }, {
            default: withCtx(() => _cache[92] || (_cache[92] = [
              createTextVNode("a main menu with easy access to import/export, options, help, and a new command to fetch missing website icons.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `All icons are stored six feet/two meters apart.  Icons without a mask will not be permitted in the alpha channel.`,
            issue: 47,
            v: "Improved"
          }, {
            default: withCtx(() => _cache[93] || (_cache[93] = [
              createTextVNode("caching of website icons. Icons are now stored per page, fixing incorrect icons for Google Drive and other sites which use multiple icons. "),
              createBaseVNode("strong", null, 'Tab Stash now requires "unlimited local storage" permissions', -1),
              createTextVNode(" to ensure we have space to store all those icons.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: [41, 49],
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[94] || (_cache[94] = [
              createTextVNode('a rare issue that might cause Tab Stash to stop displaying your stashes if a Firefox sync conflict occurs, or a duplicate "Tab Stash" folder exists. We now detect situations that might lead to this problem and warn/guide you through resolving it.')
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.5" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            subtext: "Oooooh, spooookyyy~",
            issue: 16,
            v: "Added"
          }, {
            default: withCtx(() => _cache[95] || (_cache[95] = [
              createTextVNode("support for dark mode. To use Tab Stash's dark theme, you must have dark mode turned on in your system settings (not just in the browser). Firefox will then automatically select the appropriate color scheme.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Improved" }, {
            default: withCtx(() => _cache[96] || (_cache[96] = [
              createTextVNode("behavior when stashing single tabs. If the top-most stash wasn't created recently, Tab Stash will create a new one for you rather than adding to the old one.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 37,
            v: "Improved"
          }, {
            default: withCtx(() => _cache[97] || (_cache[97] = [
              createTextVNode("behavior when restoring tabs. We no longer close the Tab Stash tab just because you clicked on something in your stash; we leave it open in the background instead.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 34,
            v: "Improved"
          }, {
            default: withCtx(() => _cache[98] || (_cache[98] = [
              createTextVNode("the UI's appearance in small ways, including the color of the Tab Stash icon, which is now neutral so it is visible in both dark and light themes.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[99] || (_cache[99] = [
              createTextVNode('an issue preventing the "Close all open tabs" button from working correctly in newer versions of Firefox.')
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `Sorry for the inconvenience. :/`,
            issue: 31,
            v: "Removed"
          }, {
            default: withCtx(() => _cache[100] || (_cache[100] = [
              createTextVNode("the bookmark de-duplication feature. There is a bug in which de-duplication may remove bookmarks which are not duplicates if multiple stashes are in progress. This bug happens very rarely, but is serious enough I've decided to remove the feature until a solution can be found.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.4" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 24,
            v: "Added"
          }, {
            default: withCtx(() => _cache[101] || (_cache[101] = [
              createTextVNode("support for stashing tabs which are in Reader View. Due to Firefox security restrictions, there are some caveats:")
            ])),
            _: 1
          }),
          _cache[107] || (_cache[107] = createBaseVNode("ul", null, [
            createBaseVNode("li", null, ' The "Stash this tab" icon will not appear in the address bar for Reader View pages. You can instead use the right-click menu to stash individual Reader View tabs. '),
            createBaseVNode("li", null, " Tab Stash cannot restore tabs directly to Reader View, so if a tab is no longer available (e.g. it was closed and removed from Firefox's cache), we will restore it to the normal website view. ")
          ], -1)),
          createVNode(_component_L, {
            issue: 2,
            v: "Added"
          }, {
            default: withCtx(() => _cache[102] || (_cache[102] = [
              createTextVNode("a record of which groups are visible and which are collapsed. If you collapse a group, we will now remember that, and we won't show you its contents again unless you ask (even if you restart your browser).")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `Icons are locally-sourced from websites using only sustainable fetching practices.  Certified 100% inorganic, non-GMO, gluten-free.`,
            issue: 3,
            v: "Improved"
          }, {
            default: withCtx(() => _cache[103] || (_cache[103] = [
              createTextVNode("your privacy by replacing the Google icon service with a local cache of website icons. Note that "),
              createBaseVNode("b", null, "some of your website icons will go missing", -1),
              createTextVNode(" until you visit the site and the cache can be populated—this is normal.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 25,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[104] || (_cache[104] = [
              createTextVNode("an issue causing Tab Stash to mistakenly close a tab that was just opened if multiple tabs are restored in quick succession.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 27,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[105] || (_cache[105] = [
              createTextVNode("an issue in which Tab Stash mistakenly allows stashing tabs with local files ("),
              createBaseVNode("code", null, "file:///...", -1),
              createTextVNode(" URLs). Tab Stash cannot restore these tabs due to Firefox security restrictions, so we now treat them as system tabs which aren't stashable.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 28,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[106] || (_cache[106] = [
              createTextVNode("an issue where some tabs would be restored to the wrong window if you quickly switch windows while a restore is happening. We will now ensure all tabs appear in the correct window even if it's no longer active.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.3.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            subtext: `This bug got introduced in 2.3 because, ironically, I made some changes to try to catch more issues like this before they made it into a release.`,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[108] || (_cache[108] = [
              createTextVNode('an issue preventing the sidebar from opening after stashing tabs when the (default) option "'),
              createBaseVNode("em", null, "Automatically show your stashed tabs in the sidebar", -1),
              createTextVNode(`" is chosen. The tabs would get saved correctly, but you'd have no idea where they went because the sidebar wouldn't open.`)
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.3" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            issue: 6,
            v: "Added"
          }, {
            default: withCtx(() => _cache[109] || (_cache[109] = [
              createTextVNode("the ability to stash multiple selected tabs at once in "),
              createBaseVNode("a", { href: "https://www.mozilla.org/en-US/firefox/64.0/releasenotes/" }, "Firefox 64", -1),
              createTextVNode(' and newer. Just Ctrl/Cmd- or Shift-click on the tabs you want to stash, and then click any "stash" button.')
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Added" }, {
            default: withCtx(() => _cache[110] || (_cache[110] = [
              createTextVNode(`the ability to manage collapsed groups in the sidebar. When you hover over a collapsed group, the group's "Stash..." and "Open..." buttons will now appear.`)
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Improved" }, {
            default: withCtx(() => _cache[111] || (_cache[111] = [
              createTextVNode("the ordering of context-menu items to put more commonly-used items first.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 8,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[112] || (_cache[112] = [
              createTextVNode("a poor interaction between Tab Stash and Firefox Sync that would occasionally cause stashed tabs to get mis-filed so they no longer appear in the stash. To recover any missing tabs, see:")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[113] || (_cache[113] = [
              createTextVNode(`an issue where the "Close all open tabs" button wasn't respecting the "hide" vs. "close" stashed tabs setting.`)
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.2.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            subtext: "Fun fact: This bug was caused by a single-letter typo.",
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[114] || (_cache[114] = [
              createTextVNode("an issue preventing Tab Stash from closing hidden tabs associated with bookmarks that were deleted from the stash.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: "Fun fact: This bug was caused by the SAME single-letter typo.",
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[115] || (_cache[115] = [
              createTextVNode("an issue preventing Tab Stash from unloading old hidden tabs correctly.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `Yep... this one too. (If you really want to know, a 'T' was capitalized when it should have been lowercase.)`,
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[116] || (_cache[116] = [
              createTextVNode("an issue preventing Tab Stash from automatically deleting empty folders in the stash.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            issue: 4,
            subtext: "This bug was caused by a whole WORD being wrong.",
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[117] || (_cache[117] = [
              createTextVNode("an issue where the option to close instead of hide stashed tabs wasn't being respected.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: "(Imagine the chaos if it had been an entire line of code.)",
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[118] || (_cache[118] = [
              createTextVNode("an issue that in some cases would cause the stash list to become unresponsive after restoring a tab that was recently closed.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.2" }, {
        default: withCtx(() => [
          createVNode(_component_L, { v: "Added" }, {
            default: withCtx(() => _cache[119] || (_cache[119] = [
              createTextVNode("options to control whether tabs are hidden or closed when they are stashed.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Added" }, {
            default: withCtx(() => _cache[120] || (_cache[120] = [
              createTextVNode("advanced options to adjust how aggressively Tab Stash unloads hidden tabs that haven't been used recently.")
            ])),
            _: 1
          }),
          createVNode(_component_L, {
            subtext: `I kept collapsing groups, forgetting they were collapsed, and then wondering where all my tabs went.  Now I know—they were lost at sea in the Disclosure Triangle.`,
            v: "Improved"
          }, {
            default: withCtx(() => _cache[121] || (_cache[121] = [
              createTextVNode(" the styling of collapsed groups in the tab view, to make them more visually-distinct from folders that are not collapsed.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[122] || (_cache[122] = [
              createTextVNode("a conflict with keyboard shortcuts on Windows and Linux. The new keyboard shortcuts are as follows:")
            ])),
            _: 1
          }),
          _cache[124] || (_cache[124] = createBaseVNode("ul", null, [
            createBaseVNode("li", null, [
              createTextVNode("Show stashed tabs in sidebar: "),
              createBaseVNode("em", null, "Ctrl+Alt+S")
            ]),
            createBaseVNode("li", null, [
              createTextVNode("Stash all open tabs: "),
              createBaseVNode("em", null, "Ctrl+Alt+T")
            ]),
            createBaseVNode("li", null, [
              createTextVNode("Stash the active tab: "),
              createBaseVNode("em", null, "Ctrl+Alt+W")
            ])
          ], -1)),
          createVNode(_component_L, {
            subtext: "So narrow you couldn't park a motorcycle in it.",
            v: "Fixed"
          }, {
            default: withCtx(() => _cache[123] || (_cache[123] = [
              createTextVNode(" an issue where the search box wouldn't fit inside the sidebar if the sidebar was really narrow.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.1" }, {
        default: withCtx(() => [
          createVNode(_component_L, {
            subtext: `"Users" means you. Thank you for reading this. You are awesome.`,
            v: "Added"
          }, {
            default: withCtx(() => _cache[125] || (_cache[125] = [
              createTextVNode(` a "What's New?" page and unobtrusive notification to let users know when new features are available. `)
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[126] || (_cache[126] = [
              createTextVNode("an issue where the sidebar may not open automatically when stashing tabs.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[127] || (_cache[127] = [
              createTextVNode("an issue that prevents the list of unstashed tabs from updating when a tab is torn off into a new window.")
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "2.0" }, {
        default: withCtx(() => [
          createVNode(_component_L, { v: "Added" }, {
            default: withCtx(() => _cache[128] || (_cache[128] = [
              createTextVNode('a new "stashed tabs" tab which presents your stash in a full-window, multi-column view.')
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Added" }, {
            default: withCtx(() => _cache[129] || (_cache[129] = [
              createTextVNode("a preference to choose whether to automatically open the sidebar or the tab view when stashing tabs.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Added" }, {
            default: withCtx(() => _cache[130] || (_cache[130] = [
              createTextVNode('a search box. Search your stash by clicking on the "Search ..." label at the top of the stash view.')
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Added" }, {
            default: withCtx(() => _cache[131] || (_cache[131] = [
              createTextVNode("keyboard shortcuts. Re-open stashed tabs and groups in the background by Ctrl+ or Cmd+clicking the tab/folder.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Improved" }, {
            default: withCtx(() => _cache[132] || (_cache[132] = [
              createTextVNode("the aesthetics of the stashed-tabs view.")
            ])),
            _: 1
          }),
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[133] || (_cache[133] = [
              createTextVNode('stashing of pinned tabs if explicitly requested (by clicking a "Stash This Tab" button).')
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "1.0" }, {
        default: withCtx(() => [
          createVNode(_component_L, { v: "Fixed" }, {
            default: withCtx(() => _cache[134] || (_cache[134] = [
              createTextVNode('various bugs, mostly pertaining to display or updating issues in the "Stashed Tabs" sidebar.')
            ])),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(_component_Version, { v: "0.9" }, {
        default: withCtx(() => _cache[135] || (_cache[135] = [
          createBaseVNode("li", null, "Initial experimental release", -1)
        ])),
        _: 1
      })
    ])
  ]);
}
const Main = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
launch(Main, async () => {
  const r = await resolveNamed({
    options: Model.live(),
    extn: browser.management.getSelf()
  });
  globalThis.options = r.options;
  const version = r.options.local.state.last_notified_version == r.extn.version ? void 0 : r.options.local.state.last_notified_version;
  r.options.local.set({ last_notified_version: r.extn.version });
  return {
    provide: {
      last_notified_version: version
    },
    propsData: {}
  };
});
