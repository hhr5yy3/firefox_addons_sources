var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as SvelteComponent, i as init, s as safe_not_equal, ag as register, ab as TYPES, e as element, I as create_component, a as space, b as attr, g as insert, J as mount_component, h as append, z as transition_in, C as transition_out, j as detach, K as destroy_component, E as compute_rest_props, G as assign, H as exclude_internal_props, Z as set_attributes, _ as toggle_class, $ as action_destroyer, a0 as get_spread_update, t as text, r as set_data, af as get_spread_object, Y as createEventDispatcher, a1 as bubble, a6 as binding_callbacks, v as create_slot, w as update_slot_base, x as get_all_dirty_from_scope, y as get_slot_changes, l as listen, p as prevent_default, X as run_all, av as base, aa as onMount, n as noop, aj as construct_svelte_component, B as group_outros, D as check_outros, q as getContext, a2 as createFieldStore, m as component_subscribe, am as onDestroy, W as subscribe, f as set_style, ap as update_keyed_each, as as outro_and_destroy_block, a5 as empty, k as destroy_each, R as Model, ax as setContext, T as C, b7 as loadLang } from "./sieve.0422c872.js";
import { T, s as serviceProxy } from "./service.04921d45.js";
import { F as FieldWrapper, a as MultiSelectMenu, M as Menu, C as Cross, I as InputEdit, A as Accordion } from "./Accordion.3fd5a551.js";
var selector = "";
class Tailwind extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, null, safe_not_equal, {});
  }
}
class SelectorType extends TYPES.text {
}
__publicField(SelectorType, "validators", []);
register("selector", SelectorType);
function create_default_slot$2(ctx) {
  let textarea;
  let textarea_class_value;
  let mounted;
  let dispose;
  let textarea_levels = [
    {
      class: textarea_class_value = ctx[3] + " w-100"
    },
    { rows: "1" },
    ctx[2]
  ];
  let textarea_data = {};
  for (let i = 0; i < textarea_levels.length; i += 1) {
    textarea_data = assign(textarea_data, textarea_levels[i]);
  }
  return {
    c() {
      textarea = element("textarea");
      set_attributes(textarea, textarea_data);
      toggle_class(textarea, "is-invalid", ctx[5]);
    },
    m(target, anchor) {
      insert(target, textarea, anchor);
      if (textarea.autofocus)
        textarea.focus();
      if (!mounted) {
        dispose = action_destroyer(ctx[4].call(null, textarea));
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
        dirty & 8 && textarea_class_value !== (textarea_class_value = ctx2[3] + " w-100") && { class: textarea_class_value },
        { rows: "1" },
        dirty & 4 && ctx2[2]
      ]));
      toggle_class(textarea, "is-invalid", ctx2[5]);
    },
    d(detaching) {
      if (detaching)
        detach(textarea);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block$5(ctx) {
  let p;
  let t;
  return {
    c() {
      p = element("p");
      t = text(ctx[1]);
      attr(p, "class", "help");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t);
    },
    p(ctx2, dirty) {
      if (dirty & 2)
        set_data(t, ctx2[1]);
    },
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_fragment$a(ctx) {
  let div;
  let fieldwrapper;
  let t;
  let current;
  fieldwrapper = new FieldWrapper({
    props: {
      field: ctx[0],
      $$slots: {
        default: [
          create_default_slot$2,
          ({ inputClasses, action, showError }) => ({ 3: inputClasses, 4: action, 5: showError }),
          ({ inputClasses, action, showError }) => (inputClasses ? 8 : 0) | (action ? 16 : 0) | (showError ? 32 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  let if_block = !!ctx[1] && create_if_block$5(ctx);
  return {
    c() {
      div = element("div");
      create_component(fieldwrapper.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      attr(div, "class", "flex flex-column flex-grow-1");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(fieldwrapper, div, null);
      append(div, t);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const fieldwrapper_changes = {};
      if (dirty & 1)
        fieldwrapper_changes.field = ctx2[0];
      if (dirty & 108) {
        fieldwrapper_changes.$$scope = { dirty, ctx: ctx2 };
      }
      fieldwrapper.$set(fieldwrapper_changes);
      if (!!ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$5(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(fieldwrapper.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(fieldwrapper.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(fieldwrapper);
      if (if_block)
        if_block.d();
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  const omit_props_names = ["field", "help"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { field } = $$props;
  let { help } = $$props;
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("field" in $$new_props)
      $$invalidate(0, field = $$new_props.field);
    if ("help" in $$new_props)
      $$invalidate(1, help = $$new_props.help);
  };
  return [field, help, $$restProps];
}
class MultilineInputEdit extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, { field: 0, help: 1 });
  }
}
const get_icon_slot_changes = (dirty) => ({});
const get_icon_slot_context = (ctx) => ({});
const get_label_slot_changes = (dirty) => ({});
const get_label_slot_context = (ctx) => ({});
const get_bottom_slot_changes = (dirty) => ({});
const get_bottom_slot_context = (ctx) => ({});
function create_icon_slot(ctx) {
  let current;
  const icon_slot_template = ctx[7].icon;
  const icon_slot = create_slot(icon_slot_template, ctx, ctx[12], get_icon_slot_context);
  return {
    c() {
      if (icon_slot)
        icon_slot.c();
    },
    m(target, anchor) {
      if (icon_slot) {
        icon_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & 4096)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            ctx2[12],
            !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(icon_slot_template, ctx2[12], dirty, get_icon_slot_changes),
            get_icon_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(icon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      current = false;
    },
    d(detaching) {
      if (icon_slot)
        icon_slot.d(detaching);
    }
  };
}
function create_label_slot$1(ctx) {
  let current;
  const label_slot_template = ctx[7].label;
  const label_slot = create_slot(label_slot_template, ctx, ctx[12], get_label_slot_context);
  return {
    c() {
      if (label_slot)
        label_slot.c();
    },
    m(target, anchor) {
      if (label_slot) {
        label_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (label_slot) {
        if (label_slot.p && (!current || dirty & 4096)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            ctx2[12],
            !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(label_slot_template, ctx2[12], dirty, get_label_slot_changes),
            get_label_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      current = false;
    },
    d(detaching) {
      if (label_slot)
        label_slot.d(detaching);
    }
  };
}
function create_top_slot(ctx) {
  let li;
  let div;
  let input_1;
  let mounted;
  let dispose;
  return {
    c() {
      li = element("li");
      div = element("div");
      input_1 = element("input");
      attr(input_1, "type", "text");
      attr(input_1, "class", "mx-2 flex-grow w-100");
      attr(input_1, "placeholder", ctx[0]);
      attr(div, "class", "flex");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, div);
      append(div, input_1);
      ctx[9](input_1);
      if (!mounted) {
        dispose = [
          listen(input_1, "input", ctx[10]),
          listen(div, "click", prevent_default(ctx[8]))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & 1) {
        attr(input_1, "placeholder", ctx2[0]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(li);
      ctx[9](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_bottom_slot$1(ctx) {
  let current;
  const bottom_slot_template = ctx[7].bottom;
  const bottom_slot = create_slot(bottom_slot_template, ctx, ctx[12], get_bottom_slot_context);
  return {
    c() {
      if (bottom_slot)
        bottom_slot.c();
    },
    m(target, anchor) {
      if (bottom_slot) {
        bottom_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (bottom_slot) {
        if (bottom_slot.p && (!current || dirty & 4096)) {
          update_slot_base(
            bottom_slot,
            bottom_slot_template,
            ctx2,
            ctx2[12],
            !current ? get_all_dirty_from_scope(ctx2[12]) : get_slot_changes(bottom_slot_template, ctx2[12], dirty, get_bottom_slot_changes),
            get_bottom_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(bottom_slot, local);
      current = true;
    },
    o(local) {
      transition_out(bottom_slot, local);
      current = false;
    },
    d(detaching) {
      if (bottom_slot)
        bottom_slot.d(detaching);
    }
  };
}
function create_fragment$9(ctx) {
  let multiselectmenu;
  let current;
  const multiselectmenu_spread_levels = [{ items: ctx[1] }, ctx[6], { ids: ctx[2] }];
  let multiselectmenu_props = {
    $$slots: {
      bottom: [create_bottom_slot$1],
      top: [create_top_slot],
      label: [create_label_slot$1],
      icon: [create_icon_slot]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < multiselectmenu_spread_levels.length; i += 1) {
    multiselectmenu_props = assign(multiselectmenu_props, multiselectmenu_spread_levels[i]);
  }
  multiselectmenu = new MultiSelectMenu({ props: multiselectmenu_props });
  multiselectmenu.$on("open", ctx[5]);
  multiselectmenu.$on("change", ctx[11]);
  return {
    c() {
      create_component(multiselectmenu.$$.fragment);
    },
    m(target, anchor) {
      mount_component(multiselectmenu, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const multiselectmenu_changes = dirty & 70 ? get_spread_update(multiselectmenu_spread_levels, [
        dirty & 2 && { items: ctx2[1] },
        dirty & 64 && get_spread_object(ctx2[6]),
        dirty & 4 && { ids: ctx2[2] }
      ]) : {};
      if (dirty & 4105) {
        multiselectmenu_changes.$$scope = { dirty, ctx: ctx2 };
      }
      multiselectmenu.$set(multiselectmenu_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(multiselectmenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(multiselectmenu.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(multiselectmenu, detaching);
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  const omit_props_names = ["placeHolder", "items", "ids"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { placeHolder = "Search" } = $$props;
  let { items } = $$props;
  let { ids } = $$props;
  let input;
  const dispatch = createEventDispatcher();
  function focus() {
    setTimeout(() => input.focus(), 100);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(3, input);
    });
  }
  const input_handler = (e) => dispatch("search", e.target.value.trim());
  function change_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("placeHolder" in $$new_props)
      $$invalidate(0, placeHolder = $$new_props.placeHolder);
    if ("items" in $$new_props)
      $$invalidate(1, items = $$new_props.items);
    if ("ids" in $$new_props)
      $$invalidate(2, ids = $$new_props.ids);
    if ("$$scope" in $$new_props)
      $$invalidate(12, $$scope = $$new_props.$$scope);
  };
  return [
    placeHolder,
    items,
    ids,
    input,
    dispatch,
    focus,
    $$restProps,
    slots,
    click_handler,
    input_1_binding,
    input_handler,
    change_handler,
    $$scope
  ];
}
class SearchableMultiSelectMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, { placeHolder: 0, items: 1, ids: 2 });
  }
}
const _ = window._;
const FieldOption = base.Model.extend({
  defaults: {
    "show": true
  },
  initialize: function(options) {
    FieldOption.__super__.initialize.call(this, options);
    this.set("id", `${this.get("type")}-${this.get("name")}`);
  },
  blacklistedJSONFields: ["id", "show", "selected"],
  toJSON: function(options) {
    return _.omit(_.clone(this.attributes), this.blacklistedJSONFields);
  }
});
const FieldOptions = base.Collection.extend({
  model: FieldOption
});
function create_label_slot(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(ctx[2]);
      attr(div, "class", "truncate mw5-m mr1");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t, ctx2[2]);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_bottom_slot(ctx) {
  let li;
  return {
    c() {
      li = element("li");
      attr(li, "class", "divider");
    },
    m(target, anchor) {
      insert(target, li, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_fragment$8(ctx) {
  let searchablemultiselectmenu;
  let current;
  const searchablemultiselectmenu_spread_levels = [
    { getSectionName },
    { ids: ctx[1] },
    { placeHolder: "Search fields to monitor" },
    { items: ctx[3] },
    { class: "h-100" },
    { allowNull: false },
    ctx[6],
    { dropDownClass: ctx[0] }
  ];
  let searchablemultiselectmenu_props = {
    $$slots: {
      bottom: [create_bottom_slot],
      label: [create_label_slot]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < searchablemultiselectmenu_spread_levels.length; i += 1) {
    searchablemultiselectmenu_props = assign(searchablemultiselectmenu_props, searchablemultiselectmenu_spread_levels[i]);
  }
  searchablemultiselectmenu = new SearchableMultiSelectMenu({ props: searchablemultiselectmenu_props });
  searchablemultiselectmenu.$on("search", ctx[4]);
  searchablemultiselectmenu.$on("change", ctx[5]);
  return {
    c() {
      create_component(searchablemultiselectmenu.$$.fragment);
    },
    m(target, anchor) {
      mount_component(searchablemultiselectmenu, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const searchablemultiselectmenu_changes = dirty & 75 ? get_spread_update(searchablemultiselectmenu_spread_levels, [
        dirty & 0 && { getSectionName },
        dirty & 2 && { ids: ctx2[1] },
        searchablemultiselectmenu_spread_levels[2],
        dirty & 8 && { items: ctx2[3] },
        searchablemultiselectmenu_spread_levels[4],
        searchablemultiselectmenu_spread_levels[5],
        dirty & 64 && get_spread_object(ctx2[6]),
        dirty & 1 && { dropDownClass: ctx2[0] }
      ]) : {};
      if (dirty & 32772) {
        searchablemultiselectmenu_changes.$$scope = { dirty, ctx: ctx2 };
      }
      searchablemultiselectmenu.$set(searchablemultiselectmenu_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(searchablemultiselectmenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(searchablemultiselectmenu.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(searchablemultiselectmenu, detaching);
    }
  };
}
function getSectionName(item) {
  return item.get("type");
}
function instance$8($$self, $$props, $$invalidate) {
  const omit_props_names = ["selectorID", "allFields", "onChange", "fields", "dropDownClass"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { selectorID } = $$props;
  let { allFields } = $$props;
  let { onChange } = $$props;
  let { fields } = $$props;
  let { dropDownClass = "dropdown-menu-end" } = $$props;
  let ids = [];
  let label;
  let allItems = new FieldOptions();
  let items = allItems.models;
  function initializeItems() {
    if (!allFields) {
      return;
    }
    const pushSelectedFields = (sf) => {
      const item = allItems.get(`${sf.type}-${sf.name}`);
      if (!item) {
        allItems.push(new FieldOption({ type: sf.type, name: sf.name }));
      }
      ids.push(`${sf.type}-${sf.name}`);
    };
    allItems.reset();
    allItems.push(new FieldOption({ name: "text", type: `builtin` }));
    fields == null ? void 0 : fields.filter((si) => si.type === "builtin").forEach(pushSelectedFields);
    allFields.filter((f) => f.type === "attribute").forEach((f) => {
      allItems.push(new FieldOption({ type: f.type, name: f.name }));
    });
    fields == null ? void 0 : fields.filter((si) => si.type === "attribute").forEach(pushSelectedFields);
    allFields.filter((f) => f.type === "property").forEach((f) => {
      allItems.push(new FieldOption({ type: f.type, name: f.name }));
    });
    fields == null ? void 0 : fields.filter((si) => si.type === "property").forEach(pushSelectedFields);
    if (!fields) {
      allItems.at(0).set("selected", true);
      $$invalidate(3, items = allItems.models);
      notify();
    } else {
      $$invalidate(3, items = allItems.models);
      updateLabel();
    }
  }
  function onSearch(e) {
    let phrase = e.detail.toLowerCase().trim();
    $$invalidate(3, items = allItems.filter((ai) => {
      return ai.get("name").toLowerCase().includes(phrase);
    }));
  }
  function onItemChange(e) {
    $$invalidate(1, ids = e.detail);
    notify();
  }
  function notify() {
    if (ids.length === 0) {
      $$invalidate(1, ids = [allItems.at(0).get("id")]);
    }
    onChange(
      allItems.filter((i) => {
        return ids.includes(i.get("id"));
      }).map((i) => {
        return i.toJSON();
      }),
      selectorID
    );
    updateLabel();
  }
  function updateLabel() {
    const selectedItems = allItems.filter((item) => ids.includes(item.get("id"))).map((item) => item.get("name"));
    $$invalidate(2, label = selectedItems ? selectedItems.join(", ") : "<None>");
  }
  onMount(() => {
  });
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("selectorID" in $$new_props)
      $$invalidate(7, selectorID = $$new_props.selectorID);
    if ("allFields" in $$new_props)
      $$invalidate(8, allFields = $$new_props.allFields);
    if ("onChange" in $$new_props)
      $$invalidate(9, onChange = $$new_props.onChange);
    if ("fields" in $$new_props)
      $$invalidate(10, fields = $$new_props.fields);
    if ("dropDownClass" in $$new_props)
      $$invalidate(0, dropDownClass = $$new_props.dropDownClass);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 256) {
      allFields && initializeItems();
    }
  };
  return [
    dropDownClass,
    ids,
    label,
    items,
    onSearch,
    onItemChange,
    $$restProps,
    selectorID,
    allFields,
    onChange,
    fields
  ];
}
class FieldSelector extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      selectorID: 7,
      allFields: 8,
      onChange: 9,
      fields: 10,
      dropDownClass: 0
    });
  }
}
function create_if_block_1$1(ctx) {
  let fieldselector;
  let current;
  fieldselector = new FieldSelector({
    props: {
      class: "h-100",
      allFields: ctx[2],
      fields: ctx[3],
      onChange: ctx[11]
    }
  });
  return {
    c() {
      create_component(fieldselector.$$.fragment);
    },
    m(target, anchor) {
      mount_component(fieldselector, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const fieldselector_changes = {};
      if (dirty & 4)
        fieldselector_changes.allFields = ctx2[2];
      if (dirty & 8)
        fieldselector_changes.fields = ctx2[3];
      if (dirty & 1)
        fieldselector_changes.onChange = ctx2[11];
      fieldselector.$set(fieldselector_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(fieldselector.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(fieldselector.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(fieldselector, detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = `${ctx[7].js.help}`;
      attr(p, "class", "help");
    },
    m(target, anchor) {
      insert(target, p, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_fragment$7(ctx) {
  let div2;
  let div1;
  let div0;
  let menu;
  let t0;
  let switch_instance;
  let t1;
  let t2;
  let button;
  let cross;
  let t3;
  let current;
  let mounted;
  let dispose;
  menu = new Menu({
    props: {
      allowNull: false,
      id: ctx[4].type,
      items: Object.entries(ctx[7]).map(func),
      actionClass: "btn btn-default",
      style: "width: 140px"
    }
  });
  menu.$on("select", ctx[8]);
  var switch_value = ctx[7][ctx[5]].input;
  function switch_props(ctx2) {
    return {
      props: {
        field: ctx2[6],
        placeholder: ctx2[7][ctx2[5]].label
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  let if_block0 = ctx[1] == "INCLUDE" && create_if_block_1$1(ctx);
  cross = new Cross({ props: { style: "width: 16px" } });
  let if_block1 = ctx[5] == "js" && create_if_block$4(ctx);
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      create_component(menu.$$.fragment);
      t0 = space();
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      button = element("button");
      create_component(cross.$$.fragment);
      t3 = space();
      if (if_block1)
        if_block1.c();
      attr(div0, "class", "input-group");
      attr(button, "class", "btn btn-outline-danger ms-1 rounded-1");
      attr(div1, "class", "d-flex flex-row");
      attr(div2, "class", "d-flex flex-column flex-grow-1");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div1);
      append(div1, div0);
      mount_component(menu, div0, null);
      append(div0, t0);
      if (switch_instance)
        mount_component(switch_instance, div0, null);
      append(div0, t1);
      if (if_block0)
        if_block0.m(div0, null);
      append(div1, t2);
      append(div1, button);
      mount_component(cross, button, null);
      append(div2, t3);
      if (if_block1)
        if_block1.m(div2, null);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", prevent_default(ctx[9]));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const menu_changes = {};
      if (dirty & 16)
        menu_changes.id = ctx2[4].type;
      menu.$set(menu_changes);
      if (switch_value !== (switch_value = ctx2[7][ctx2[5]].input)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div0, t1);
        } else {
          switch_instance = null;
        }
      }
      if (ctx2[1] == "INCLUDE") {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div0, null);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[5] == "js")
        if_block1.p(ctx2, dirty);
    },
    i(local) {
      if (current)
        return;
      transition_in(menu.$$.fragment, local);
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      transition_in(if_block0);
      transition_in(cross.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menu.$$.fragment, local);
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      transition_out(if_block0);
      transition_out(cross.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      destroy_component(menu);
      if (switch_instance)
        destroy_component(switch_instance);
      if (if_block0)
        if_block0.d();
      destroy_component(cross);
      if (if_block1)
        if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
const func = ([id, def]) => ({ id, name: def.label });
function instance$7($$self, $$props, $$invalidate) {
  let $model, $$unsubscribe_model = noop, $$subscribe_model = () => ($$unsubscribe_model(), $$unsubscribe_model = subscribe(model, ($$value) => $$invalidate(4, $model = $$value)), model);
  let $expression;
  $$self.$$.on_destroy.push(() => $$unsubscribe_model());
  let { model } = $$props;
  $$subscribe_model();
  let { op } = $$props;
  let CMD = getContext("CMD");
  let type = model.get("type");
  const expression = createFieldStore(
    { type: "selector", required: true },
    model.get("expr")
  );
  component_subscribe($$self, expression, (value) => $$invalidate(10, $expression = value));
  const locatorDef = {
    css: {
      label: T("l_css_selector"),
      input: InputEdit
    },
    js: {
      label: T("l_js"),
      help: T("h_js"),
      input: MultilineInputEdit
    },
    xpath: { label: T("l_xpath"), input: InputEdit }
  };
  let allFields;
  let fields;
  model.on("change:allFields", updateAllFields);
  model.on("change:fields", updateFields);
  model.on("change:expr", updateExpression);
  onDestroy(() => {
    model.off("change:allFields", updateAllFields);
    model.off("change:fields", updateFields);
    model.off("change:expr", updateExpression);
  });
  function onTypeChange(e) {
    CMD.setType(model, e.detail);
  }
  function updateExpression() {
    const expr = $model.expr;
    if ($expression !== expr) {
      expression.set(expr);
    }
  }
  function updateModel(expr) {
    if ($model.expr !== expr) {
      CMD.setExpr(model, expr);
    }
  }
  function updateAllFields() {
    $$invalidate(2, allFields = model.get("allFields"));
  }
  function updateFields() {
    $$invalidate(3, fields = model.get("fields"));
  }
  function removeLocator() {
    CMD.del(model);
  }
  const func_1 = (fields2) => {
    model.set("fields", fields2);
  };
  $$self.$$set = ($$props2) => {
    if ("model" in $$props2)
      $$subscribe_model($$invalidate(0, model = $$props2.model));
    if ("op" in $$props2)
      $$invalidate(1, op = $$props2.op);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1024) {
      updateModel($expression);
    }
  };
  return [
    model,
    op,
    allFields,
    fields,
    $model,
    type,
    expression,
    locatorDef,
    onTypeChange,
    removeLocator,
    $expression,
    func_1
  ];
}
class SieveLocator extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, { model: 0, op: 1 });
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  return child_ctx;
}
function create_if_block$3(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = `${T("l_none")}`;
      attr(div, "class", "info");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_each_block$1(key_1, ctx) {
  let first;
  let sievelocator;
  let current;
  sievelocator = new SieveLocator({
    props: {
      model: ctx[6],
      op: ctx[1]
    }
  });
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(sievelocator.$$.fragment);
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      mount_component(sievelocator, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const sievelocator_changes = {};
      if (dirty & 4)
        sievelocator_changes.model = ctx[6];
      if (dirty & 2)
        sievelocator_changes.op = ctx[1];
      sievelocator.$set(sievelocator_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(sievelocator.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sievelocator.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(first);
      destroy_component(sievelocator, detaching);
    }
  };
}
function create_fragment$6(ctx) {
  let t0;
  let div1;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let t1;
  let div0;
  let button;
  let cross;
  let t2;
  let t3_value = T("a_add") + "";
  let t3;
  let current;
  let mounted;
  let dispose;
  let if_block = !ctx[2].length && create_if_block$3();
  let each_value = ctx[2].models;
  const get_key = (ctx2) => ctx2[6].cid;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$1(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
  }
  cross = new Cross({
    props: {
      style: "width: 12px; transform: rotate(45deg)"
    }
  });
  return {
    c() {
      if (if_block)
        if_block.c();
      t0 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t1 = space();
      div0 = element("div");
      button = element("button");
      create_component(cross.$$.fragment);
      t2 = space();
      t3 = text(t3_value);
      attr(button, "class", "btn btn-default btn-sm w-[100px]");
      set_style(button, "--bs-btn-padding-y", ".1rem");
      attr(div1, "class", "d-flex flex-column pa2 gap-2");
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t0, anchor);
      insert(target, div1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      append(div1, t1);
      append(div1, div0);
      append(div0, button);
      mount_component(cross, button, null);
      append(button, t2);
      append(button, t3);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", prevent_default(ctx[3]));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (!ctx2[2].length) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$3();
          if_block.c();
          if_block.m(t0.parentNode, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & 6) {
        each_value = ctx2[2].models;
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div1, outro_and_destroy_block, create_each_block$1, t1, get_each_context$1);
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(cross.$$.fragment, local);
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(cross.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      destroy_component(cross);
      mounted = false;
      dispose();
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let $locators, $$unsubscribe_locators = noop, $$subscribe_locators = () => ($$unsubscribe_locators(), $$unsubscribe_locators = subscribe(locators, ($$value) => $$invalidate(2, $locators = $$value)), locators);
  $$self.$$.on_destroy.push(() => $$unsubscribe_locators());
  let { locators } = $$props;
  $$subscribe_locators();
  let { index } = $$props;
  let { op } = $$props;
  let CMD = getContext("CMD");
  function onAdd() {
    CMD.add(index, op);
  }
  $$self.$$set = ($$props2) => {
    if ("locators" in $$props2)
      $$subscribe_locators($$invalidate(0, locators = $$props2.locators));
    if ("index" in $$props2)
      $$invalidate(4, index = $$props2.index);
    if ("op" in $$props2)
      $$invalidate(1, op = $$props2.op);
  };
  return [locators, op, $locators, onAdd, index];
}
class SieveLocators extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { locators: 0, index: 4, op: 1 });
  }
}
function create_default_slot_1(ctx) {
  let sievelocators;
  let current;
  sievelocators = new SieveLocators({
    props: {
      locators: ctx[4],
      index: ctx[3],
      op: "INCLUDE"
    }
  });
  return {
    c() {
      create_component(sievelocators.$$.fragment);
    },
    m(target, anchor) {
      mount_component(sievelocators, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(sievelocators.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sievelocators.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(sievelocators, detaching);
    }
  };
}
function create_header_slot_1(ctx) {
  let div;
  let t0_value = T("l_el_selected") + "";
  let t0;
  let t1;
  let span;
  let t2_value = ctx[1].length + "";
  let t2;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      span = element("span");
      t2 = text(t2_value);
      attr(span, "class", "badge rounded-pill text-bg-primary");
      attr(div, "slot", "header");
      attr(div, "class", "d-flex items-center gap-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
      append(div, span);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t2_value !== (t2_value = ctx2[1].length + ""))
        set_data(t2, t2_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_subheader_slot_1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = `frame: ${ctx[3]}`;
      attr(div, "slot", "subheader");
      attr(div, "class", "d-flex items-center gap-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_default_slot$1(ctx) {
  let sievelocators;
  let current;
  sievelocators = new SieveLocators({
    props: {
      locators: ctx[5],
      index: ctx[3],
      op: "EXCLUDE"
    }
  });
  return {
    c() {
      create_component(sievelocators.$$.fragment);
    },
    m(target, anchor) {
      mount_component(sievelocators, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(sievelocators.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sievelocators.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(sievelocators, detaching);
    }
  };
}
function create_header_slot$1(ctx) {
  let div;
  let t0_value = T("l_el_deselected") + "";
  let t0;
  let t1;
  let span;
  let t2_value = ctx[2].length + "";
  let t2;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      span = element("span");
      t2 = text(t2_value);
      attr(span, "class", "badge rounded-pill text-bg-danger");
      attr(div, "slot", "header");
      attr(div, "class", "d-flex items-center gap-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
      append(div, span);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t2_value !== (t2_value = ctx2[2].length + ""))
        set_data(t2, t2_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_subheader_slot(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = `frame: ${ctx[3]}`;
      attr(div, "slot", "subheader");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$5(ctx) {
  let accordion0;
  let t0;
  let accordion1;
  let t1;
  let div;
  let current;
  accordion0 = new Accordion({
    props: {
      id: "locator-include-" + ctx[3],
      show: true,
      $$slots: {
        subheader: [create_subheader_slot_1],
        header: [create_header_slot_1],
        default: [create_default_slot_1]
      },
      $$scope: { ctx }
    }
  });
  accordion1 = new Accordion({
    props: {
      id: "locator-exclude-" + ctx[3],
      $$slots: {
        subheader: [create_subheader_slot],
        header: [create_header_slot$1],
        default: [create_default_slot$1]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(accordion0.$$.fragment);
      t0 = space();
      create_component(accordion1.$$.fragment);
      t1 = space();
      div = element("div");
      attr(div, "class", "mt-3");
    },
    m(target, anchor) {
      mount_component(accordion0, target, anchor);
      insert(target, t0, anchor);
      mount_component(accordion1, target, anchor);
      insert(target, t1, anchor);
      insert(target, div, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const accordion0_changes = {};
      if (dirty & 258) {
        accordion0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      accordion0.$set(accordion0_changes);
      const accordion1_changes = {};
      if (dirty & 260) {
        accordion1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      accordion1.$set(accordion1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(accordion0.$$.fragment, local);
      transition_in(accordion1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(accordion0.$$.fragment, local);
      transition_out(accordion1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(accordion0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(accordion1, detaching);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let $model, $$unsubscribe_model = noop, $$subscribe_model = () => ($$unsubscribe_model(), $$unsubscribe_model = subscribe(model, ($$value) => $$invalidate(6, $model = $$value)), model);
  let $includes;
  let $excludes;
  $$self.$$.on_destroy.push(() => $$unsubscribe_model());
  let { model } = $$props;
  $$subscribe_model();
  const { index, includes, excludes } = $model;
  component_subscribe($$self, includes, (value) => $$invalidate(1, $includes = value));
  component_subscribe($$self, excludes, (value) => $$invalidate(2, $excludes = value));
  getContext("CMD");
  $$self.$$set = ($$props2) => {
    if ("model" in $$props2)
      $$subscribe_model($$invalidate(0, model = $$props2.model));
  };
  return [model, $includes, $excludes, index, includes, excludes];
}
class SieveConfigFrame extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { model: 0 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let sieveconfigframe;
  let current;
  sieveconfigframe = new SieveConfigFrame({ props: { model: ctx[4] } });
  return {
    c() {
      create_component(sieveconfigframe.$$.fragment);
    },
    m(target, anchor) {
      mount_component(sieveconfigframe, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const sieveconfigframe_changes = {};
      if (dirty & 1)
        sieveconfigframe_changes.model = ctx2[4];
      sieveconfigframe.$set(sieveconfigframe_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(sieveconfigframe.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sieveconfigframe.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(sieveconfigframe, detaching);
    }
  };
}
function create_fragment$4(ctx) {
  let div;
  let current;
  let each_value = ctx[0].models;
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let div_levels = [ctx[2]];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        each_value = ctx2[0].models;
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
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [dirty & 4 && ctx2[2]]));
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
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  const omit_props_names = ["model"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $frames;
  let { model } = $$props;
  let frames = model.get("frames");
  component_subscribe($$self, frames, (value) => $$invalidate(0, $frames = value));
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("model" in $$new_props)
      $$invalidate(3, model = $$new_props.model);
  };
  return [$frames, frames, $$restProps, model];
}
class SieveConfigPage extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { model: 3 });
  }
}
function create_fragment$3(ctx) {
  let div1;
  let div0;
  let inputedit0;
  let t;
  let inputedit1;
  let current;
  inputedit0 = new InputEdit({
    props: {
      field: ctx[0],
      placeholder: "regular expression"
    }
  });
  inputedit1 = new InputEdit({
    props: {
      field: ctx[1],
      placeholder: "flags"
    }
  });
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      create_component(inputedit0.$$.fragment);
      t = space();
      create_component(inputedit1.$$.fragment);
      attr(div0, "class", "input-group");
      attr(div1, "class", "d-flex flex-column");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      mount_component(inputedit0, div0, null);
      append(div0, t);
      mount_component(inputedit1, div0, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(inputedit0.$$.fragment, local);
      transition_in(inputedit1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(inputedit0.$$.fragment, local);
      transition_out(inputedit1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      destroy_component(inputedit0);
      destroy_component(inputedit1);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  var _a;
  let $flags;
  let $expr;
  let { model } = $$props;
  let regexp = (_a = model.get("regexp")) != null ? _a : { expr: "", flags: "gim" };
  let expr = createFieldStore({ type: "text" }, regexp.expr);
  component_subscribe($$self, expr, (value) => $$invalidate(4, $expr = value));
  let flags = createFieldStore({ type: "text" }, regexp.flags);
  component_subscribe($$self, flags, (value) => $$invalidate(3, $flags = value));
  $$self.$$set = ($$props2) => {
    if ("model" in $$props2)
      $$invalidate(2, model = $$props2.model);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 28) {
      {
        model.set("regexp", { expr: $expr, flags: $flags });
      }
    }
  };
  return [expr, flags, model, $flags, $expr];
}
class RegexEdit extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { model: 2 });
  }
}
function create_default_slot(ctx) {
  let regexedit;
  let current;
  regexedit = new RegexEdit({ props: { model: ctx[0] } });
  return {
    c() {
      create_component(regexedit.$$.fragment);
    },
    m(target, anchor) {
      mount_component(regexedit, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const regexedit_changes = {};
      if (dirty & 1)
        regexedit_changes.model = ctx2[0];
      regexedit.$set(regexedit_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(regexedit.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(regexedit.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(regexedit, detaching);
    }
  };
}
function create_else_block$1(ctx) {
  let t;
  return {
    c() {
      t = text("- <not set>");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block$2(ctx) {
  var _a;
  let t0;
  let t1_value = ((_a = ctx[3].regexp) == null ? void 0 : _a.expr) + "";
  let t1;
  return {
    c() {
      t0 = text("- ");
      t1 = text(t1_value);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
    },
    p(ctx2, dirty) {
      var _a2;
      if (dirty & 8 && t1_value !== (t1_value = ((_a2 = ctx2[3].regexp) == null ? void 0 : _a2.expr) + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
    }
  };
}
function create_header_slot(ctx) {
  let div;
  let t;
  function select_block_type(ctx2, dirty) {
    var _a;
    if ((_a = ctx2[3].regexp) == null ? void 0 : _a.expr)
      return create_if_block$2;
    return create_else_block$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      t = text("Regex Text Filter \n        ");
      if_block.c();
      attr(div, "slot", "header");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
      if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block.d();
    }
  };
}
function create_fragment$2(ctx) {
  let div3;
  let div1;
  let div0;
  let t1;
  let sieveconfigpage;
  let t2;
  let div2;
  let textarea;
  let t3;
  let accordion;
  let current;
  sieveconfigpage = new SieveConfigPage({
    props: {
      model: ctx[1],
      style: "min-height: 300px;"
    }
  });
  accordion = new Accordion({
    props: {
      id: "vs-regex",
      show: false,
      $$slots: {
        header: [create_header_slot],
        default: [create_default_slot]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      div0.textContent = `${T("m_vs_help")}`;
      t1 = space();
      create_component(sieveconfigpage.$$.fragment);
      t2 = space();
      div2 = element("div");
      textarea = element("textarea");
      t3 = space();
      create_component(accordion.$$.fragment);
      attr(div0, "class", "alert alert-info small");
      set_style(div0, "padding", "4px 12px");
      set_style(div0, "margin-bottom", "0");
      attr(div1, "class", "flex-auto overflow-y-scroll");
      attr(textarea, "class", "form-control flex-auto");
      attr(textarea, "placeholder", T("m_vs_sel_preview"));
      textarea.value = ctx[2];
      attr(div2, "class", "w-30 bl b--silver flex flex-column");
      attr(div3, "class", "flex");
      set_style(div3, "height", "calc(100vh - 34px)");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div1);
      append(div1, div0);
      append(div1, t1);
      mount_component(sieveconfigpage, div1, null);
      append(div3, t2);
      append(div3, div2);
      append(div2, textarea);
      append(div2, t3);
      mount_component(accordion, div2, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const sieveconfigpage_changes = {};
      if (dirty & 2)
        sieveconfigpage_changes.model = ctx2[1];
      sieveconfigpage.$set(sieveconfigpage_changes);
      if (!current || dirty & 4) {
        textarea.value = ctx2[2];
      }
      const accordion_changes = {};
      if (dirty & 25) {
        accordion_changes.$$scope = { dirty, ctx: ctx2 };
      }
      accordion.$set(accordion_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(sieveconfigpage.$$.fragment, local);
      transition_in(accordion.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sieveconfigpage.$$.fragment, local);
      transition_out(accordion.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div3);
      destroy_component(sieveconfigpage);
      destroy_component(accordion);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $config, $$unsubscribe_config = noop, $$subscribe_config = () => ($$unsubscribe_config(), $$unsubscribe_config = subscribe(config, ($$value) => $$invalidate(3, $config = $$value)), config);
  $$self.$$.on_destroy.push(() => $$unsubscribe_config());
  let { config } = $$props;
  $$subscribe_config();
  let { page } = $$props;
  let { previewText } = $$props;
  $$self.$$set = ($$props2) => {
    if ("config" in $$props2)
      $$subscribe_config($$invalidate(0, config = $$props2.config));
    if ("page" in $$props2)
      $$invalidate(1, page = $$props2.page);
    if ("previewText" in $$props2)
      $$invalidate(2, previewText = $$props2.previewText);
  };
  return [config, page, previewText, $config];
}
class HTML extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { config: 0, page: 1, previewText: 2 });
  }
}
function create_if_block_1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "flex-auto bg-dark");
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
function create_if_block$1(ctx) {
  let htmlconfig;
  let current;
  htmlconfig = new HTML({
    props: {
      page: ctx[3],
      config: ctx[4],
      previewText: ctx[2]
    }
  });
  return {
    c() {
      create_component(htmlconfig.$$.fragment);
    },
    m(target, anchor) {
      mount_component(htmlconfig, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const htmlconfig_changes = {};
      if (dirty[0] & 4)
        htmlconfig_changes.previewText = ctx2[2];
      htmlconfig.$set(htmlconfig_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(htmlconfig.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(htmlconfig.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(htmlconfig, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let button0;
  let i0;
  let t0;
  let t1_value = T("a_select_elements") + "";
  let t1;
  let t2;
  let t3;
  let button1;
  let i1;
  let t4;
  let t5_value = T("a_save_selections") + "";
  let t5;
  let t6;
  let button2;
  let i2;
  let t7;
  let button3;
  let i3;
  let t8;
  let if_block1_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block0 = ctx[1] && create_if_block_1();
  let if_block1 = ctx[1] && ctx[3] && create_if_block$1(ctx);
  return {
    c() {
      div = element("div");
      button0 = element("button");
      i0 = element("i");
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      if (if_block0)
        if_block0.c();
      t3 = space();
      button1 = element("button");
      i1 = element("i");
      t4 = space();
      t5 = text(t5_value);
      t6 = space();
      button2 = element("button");
      i2 = element("i");
      t7 = space();
      button3 = element("button");
      i3 = element("i");
      t8 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      attr(i0, "class", "fa");
      toggle_class(i0, "fa-play", !ctx[0]);
      toggle_class(i0, "fa-pause", ctx[0]);
      attr(button0, "class", "btn btn-primary rounded-0");
      toggle_class(button0, "flex-1", !ctx[1]);
      attr(i1, "class", "fa fa-save");
      attr(button1, "class", "btn btn-default rounded-0");
      attr(i2, "class", "fa");
      toggle_class(i2, "fa-expand", !ctx[1]);
      toggle_class(i2, "fa-compress", ctx[1]);
      attr(button2, "class", "btn btn-default rounded-0");
      attr(button2, "title", T("a_expand"));
      attr(i3, "class", "fa fa-times");
      attr(button3, "class", "btn btn-default rounded-0");
      attr(button3, "title", T("a_close"));
      attr(div, "class", "d-flex");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button0);
      append(button0, i0);
      append(button0, t0);
      append(button0, t1);
      append(div, t2);
      if (if_block0)
        if_block0.m(div, null);
      append(div, t3);
      append(div, button1);
      append(button1, i1);
      append(button1, t4);
      append(button1, t5);
      append(div, t6);
      append(div, button2);
      append(button2, i2);
      append(div, t7);
      append(div, button3);
      append(button3, i3);
      insert(target, t8, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button0, "click", ctx[8]),
          listen(button1, "click", ctx[6]),
          listen(button2, "click", ctx[7]),
          listen(button3, "click", ctx[5])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty[0] & 1) {
        toggle_class(i0, "fa-play", !ctx2[0]);
      }
      if (!current || dirty[0] & 1) {
        toggle_class(i0, "fa-pause", ctx2[0]);
      }
      if (!current || dirty[0] & 2) {
        toggle_class(button0, "flex-1", !ctx2[1]);
      }
      if (ctx2[1]) {
        if (if_block0)
          ;
        else {
          if_block0 = create_if_block_1();
          if_block0.c();
          if_block0.m(div, t3);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!current || dirty[0] & 2) {
        toggle_class(i2, "fa-expand", !ctx2[1]);
      }
      if (!current || dirty[0] & 2) {
        toggle_class(i2, "fa-compress", ctx2[1]);
      }
      if (ctx2[1] && ctx2[3]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
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
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block0)
        if_block0.d();
      if (detaching)
        detach(t8);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
const MSG_EVENT = 2;
const MSG_REQUEST = 3;
const MSG_RESPONSE = 4;
function instance$1($$self, $$props, $$invalidate) {
  let $page;
  let { on = true } = $$props;
  const _2 = window._;
  const ID = ((x) => (prefix = "$") => "$" + x++)(1);
  const PORT_INDEX = [];
  const responseHandlers = {};
  let expanded = false;
  let page = new Model.Page({}, { parse: true });
  component_subscribe($$self, page, (value) => $$invalidate(14, $page = value));
  let savedSieve;
  let savedConfig;
  let savedPages;
  let savedCurrentpage;
  let previewText = "Initializing...";
  const config = new Model.SieveConfigHTML({ selections: new Model.Pages([page]) });
  const port = chrome.runtime.connect({ name: "selector:{}" });
  port.onMessage.addListener(function(msg2) {
    let { type, data } = msg2;
    switch (type) {
      case MSG_EVENT:
        onPortEvent(data.type, data.event);
        break;
      case MSG_RESPONSE:
        onPortResponse(msg2);
        break;
      default:
        console.warn("Unhandled msg type: ", msg2);
    }
  });
  setContext("CMD", {
    async add(frameIndex, op = "INCLUDE") {
      await portRequest(frameIndex, {
        path: "picker_select_new",
        data: {
          id: ID(),
          op,
          locator: {
            type: "xpath",
            expr: "//enter-your-selector-here"
          }
        }
      });
    },
    async del(locator) {
      const frame = locator.collection.frame;
      await portRequest(frame.get("index"), {
        path: "picker_select_call",
        data: { id: locator.id, method: "close" }
      });
    },
    async setExpr(locator, expr) {
      const frame = locator.collection.frame;
      await portRequest(frame.get("index"), {
        path: "picker_select_call",
        data: {
          id: locator.id,
          method: "setLocator",
          args: [{ type: locator.get("type"), expr }]
        }
      });
    },
    async setType(locator, type) {
      const frame = locator.collection.frame;
      await portRequest(frame.get("index"), {
        path: "picker_select_call",
        data: {
          id: locator.id,
          method: "setLocatorType",
          args: [type]
        }
      });
    }
  });
  function onPortEvent(type, event) {
    switch (type) {
      case "init":
        $$invalidate(2, previewText = "Page loaded...");
        savedSieve = new Model.Sieve(event.model, { parse: true }), savedConfig = savedSieve.get("config"), savedPages = savedConfig == null ? void 0 : savedConfig.get("selections"), savedConfig && config.set("regexp", savedConfig.get("regexp"));
        $$invalidate(0, on = !!event.state.selectorOn);
        $$invalidate(1, expanded = !!event.state.expanded);
        break;
      case "loader:load":
        onLoadPort(event);
        break;
      case "loader:reset":
        $$invalidate(2, previewText = "");
        onLoaderReset(event);
        break;
      case "loader:port:select:close":
        onSelectClose(event);
        break;
      case "loader:port:select:display":
        onSelectDisplay(event);
        break;
      case "loader:port:select:new":
        onSelectNew(event);
        break;
      default:
        console.warn("Unhandled event type: ", type);
    }
  }
  function onPortResponse({ _id, err, data }) {
    let handler = responseHandlers[_id];
    if (handler) {
      delete responseHandlers[_id];
      handler(err, data);
    } else {
      console.error("Unhandled response: ", msg);
    }
  }
  port.onDisconnect.addListener(function() {
  });
  onMount(() => {
    config.on("change:regexp", updatePreview);
  });
  async function close() {
    await Promise.allSettled(PORT_INDEX.map(portReset));
    $$invalidate(0, on = false);
    sendEvent("close");
  }
  async function save() {
    if (config.isEmpty()) {
      showMsg("Please select elements to monitor before saving selections.");
      return;
    }
    savedSieve.set({
      uri: $page.uri,
      config,
      content_type: C.TYPE_HTML
    });
    const modelJSON = savedSieve.toJSON();
    await Promise.allSettled(PORT_INDEX.map(portReset));
    $$invalidate(0, on = false);
    sendEvent("save", modelJSON);
  }
  async function onLoadPort(event) {
    const index = event.index;
    const savedFrame = savedCurrentpage == null ? void 0 : savedCurrentpage.get("frames").findWhere({ index });
    PORT_INDEX.push(index);
    await portRequest(index, {
      path: "require",
      data: ["picker", "pickerui"]
    });
    if (savedFrame) {
      showVisualSelections(savedFrame);
    }
    portSetMode(index);
  }
  function onLoaderReset(event) {
    page.reset();
    page.set("uri", event.uri);
    PORT_INDEX.splice(0);
    savedCurrentpage = savedPages && savedPages.at(0);
  }
  async function onLocatorChange(locator, options) {
    if (options && options.source === "picker")
      return;
    const frame = locator.collection.frame;
    await portRequest(frame.get("index"), {
      path: "picker_select_call",
      data: {
        method: "setLocator",
        id: locator.id,
        args: [_2.pick(locator.attributes, "expr", "type")]
      }
    });
    updatePreview();
  }
  function onSelectClose(event) {
    page.removeLocator(event.index, event.id);
    updatePreview();
  }
  function onSelectDisplay(event) {
    const locator = page.getLocator(event.index, event.id);
    const attrs = _2.extend({ id: event.id, allFields: event.allFields }, event.locator);
    if (!_2.isEqual(attrs, locator.attributes)) {
      locator.set(attrs, { source: "picker" });
      updatePreview();
    }
  }
  function onSelectNew(event) {
    const attrs = { id: event.id, ...event.locator };
    const locator = page.addLocator({ index: event.index, uri: event.uri }, event.op, attrs);
    Backbone.listenTo(locator, "change", onLocatorChange);
  }
  function portRequest(portSelector, data) {
    return sendRequest("loader/request", { portSelector, data });
  }
  async function portReset(portIndex) {
    await portRequest(portIndex, { path: "picker_reset" });
  }
  async function portSetMode(portIndex) {
    await portRequest(portIndex, {
      path: "picker_setMode",
      data: on ? "SELECT" : "NOOP"
    });
    if (on && portIndex == 0) {
      showMsg("Selector is on. Click elements on page that you would like to monitor for changes.");
    }
  }
  function portSetModeForAll(_mode) {
    for (let index of PORT_INDEX) {
      portSetMode(index);
    }
  }
  function sendEvent(type, event) {
    port.postMessage({ type: MSG_EVENT, data: { type, event } });
  }
  function sendRequest(path, data) {
    return new Promise((resolve, reject) => {
      const _id = ID();
      responseHandlers[_id] = (err, data2) => {
        err ? reject(err) : resolve(data2);
      };
      port.postMessage({ type: MSG_REQUEST, _id, path, data });
    });
  }
  function sendUIState(expanded2) {
    let data = { expanded: expanded2 };
    window.parent.postMessage({ type: "show", data }, "*");
    sendEvent("uistate", data);
  }
  function showMsg(msg2) {
    return portRequest(0, {
      path: "showMsg",
      data: { msg: msg2, hideAfter: 6e3 }
    });
  }
  function showVisualSelections(savedFrame) {
    const index = savedFrame.get("index");
    const includes = savedFrame.get("includes").models;
    const excludes = savedFrame.get("excludes").models;
    includes.map((model) => portRequest(index, {
      path: "picker_select_new",
      data: {
        id: model.id,
        locator: model.toJSON(),
        op: "INCLUDE"
      }
    }));
    excludes.map((model) => portRequest(index, {
      path: "picker_select_new",
      data: {
        id: model.id,
        locator: model.toJSON(),
        op: "EXCLUDE"
      }
    }));
  }
  function toggleExpanded() {
    $$invalidate(1, expanded = !expanded);
  }
  function toggleSelector() {
    $$invalidate(0, on = !on);
  }
  async function updatePreview() {
    if (!page)
      return;
    $$invalidate(2, previewText = "Loading...");
    try {
      let results = await Promise.all(page.get("frames").map((frame) => portRequest(frame.get("index"), {
        path: "filterHTMLAndGetData",
        data: {
          includes: frame.get("includes").toJSON(),
          excludes: frame.get("excludes").toJSON()
        }
      })));
      const re = config.get("regexp");
      let text2 = results.map((r) => r.text).join("");
      if (re && re.expr) {
        const matches = text2.match(new RegExp(re.expr, re.flags || ""));
        if (matches && matches.length > 0) {
          text2 = matches.join(" ");
        } else {
          text2 = "";
        }
      }
      $$invalidate(2, previewText = text2);
    } catch (e) {
      console.error("error while updating preview", e);
      $$invalidate(2, previewText = "Error: " + (e.message || e.msg || e.toString()));
    }
  }
  $$self.$$set = ($$props2) => {
    if ("on" in $$props2)
      $$invalidate(0, on = $$props2.on);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 2) {
      sendUIState(expanded);
    }
    if ($$self.$$.dirty[0] & 1) {
      portSetModeForAll();
    }
  };
  return [
    on,
    expanded,
    previewText,
    page,
    config,
    close,
    save,
    toggleExpanded,
    toggleSelector
  ];
}
class HTMLSelector extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { on: 0 }, null, [-1, -1]);
  }
}
function create_else_block(ctx) {
  let t;
  return {
    c() {
      t = text("Loading...");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block(ctx) {
  let htmlselector;
  let current;
  htmlselector = new HTMLSelector({});
  return {
    c() {
      create_component(htmlselector.$$.fragment);
    },
    m(target, anchor) {
      mount_component(htmlselector, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(htmlselector.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(htmlselector.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(htmlselector, detaching);
    }
  };
}
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block;
  let t;
  let tailwind;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  tailwind = new Tailwind({});
  return {
    c() {
      if_block.c();
      t = space();
      create_component(tailwind.$$.fragment);
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, t, anchor);
      mount_component(tailwind, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index !== previous_block_index) {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        }
        transition_in(if_block, 1);
        if_block.m(t.parentNode, t);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(tailwind.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(tailwind.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(t);
      destroy_component(tailwind, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let loaded = false;
  onMount(async () => {
    await syncUser();
    $$invalidate(0, loaded = true);
  });
  async function syncUser() {
    let user;
    try {
      user = await serviceProxy.store.UserStore.findOne({ id: await serviceProxy.auth.getId() });
      let locale = (user ? user.locale : await serviceProxy.store.Prefs.get("locale")) || "en-US";
      await loadLang(locale);
    } catch (e) {
      await loadLang("en-US");
    }
  }
  return [loaded];
}
class AppHTMLSelector extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { AppHTMLSelector as default };
