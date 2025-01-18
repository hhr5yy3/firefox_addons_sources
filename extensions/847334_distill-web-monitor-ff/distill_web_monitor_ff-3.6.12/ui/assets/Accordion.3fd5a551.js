import { S as SvelteComponent, i as init, s as safe_not_equal, v as create_slot, e as element, b as attr, _ as toggle_class, g as insert, h as append, l as listen, w as update_slot_base, x as get_all_dirty_from_scope, y as get_slot_changes, z as transition_in, C as transition_out, j as detach, Y as createEventDispatcher, a as space, $ as action_destroyer, B as group_outros, D as check_outros, X as run_all, E as compute_rest_props, F as compute_slots, G as assign, H as exclude_internal_props, a5 as empty, ap as update_keyed_each, as as outro_and_destroy_block, Z as set_attributes, p as prevent_default, a0 as get_spread_update, I as create_component, J as mount_component, K as destroy_component, t as text, r as set_data, m as component_subscribe, n as noop, W as subscribe, a1 as bubble, f as set_style, k as destroy_each, aA as get_store_value, az as svg_element, aQ as set_svg_attributes } from "./sieve.0422c872.js";
function create_fragment$8(ctx) {
  let li;
  let a;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  return {
    c() {
      li = element("li");
      a = element("a");
      if (default_slot)
        default_slot.c();
      attr(a, "class", "dropdown-item");
      attr(a, "href", ctx[2]);
      attr(a, "style", ctx[3]);
      toggle_class(a, "active", ctx[0]);
      toggle_class(li, "selected", ctx[0]);
      toggle_class(li, "disabled", ctx[1]);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      if (default_slot) {
        default_slot.m(a, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(a, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[5],
            !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(default_slot_template, ctx2[5], dirty, null),
            null
          );
        }
      }
      if (!current || dirty & 4) {
        attr(a, "href", ctx2[2]);
      }
      if (!current || dirty & 8) {
        attr(a, "style", ctx2[3]);
      }
      if (!current || dirty & 1) {
        toggle_class(a, "active", ctx2[0]);
      }
      if (!current || dirty & 1) {
        toggle_class(li, "selected", ctx2[0]);
      }
      if (!current || dirty & 2) {
        toggle_class(li, "disabled", ctx2[1]);
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
        detach(li);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { selected } = $$props;
  let { disabled } = $$props;
  let { href = "#" } = $$props;
  let { menuItemStyle = "" } = $$props;
  const dispatch = createEventDispatcher();
  function onClick(e) {
    if (href === "#" || disabled) {
      e.preventDefault();
    }
    if (!disabled) {
      dispatch("click", e);
    }
  }
  $$self.$$set = ($$props2) => {
    if ("selected" in $$props2)
      $$invalidate(0, selected = $$props2.selected);
    if ("disabled" in $$props2)
      $$invalidate(1, disabled = $$props2.disabled);
    if ("href" in $$props2)
      $$invalidate(2, href = $$props2.href);
    if ("menuItemStyle" in $$props2)
      $$invalidate(3, menuItemStyle = $$props2.menuItemStyle);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [selected, disabled, href, menuItemStyle, onClick, $$scope, slots];
}
class MenuItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      selected: 0,
      disabled: 1,
      href: 2,
      menuItemStyle: 3
    });
  }
}
function clickOutside(node) {
  const handleClick = (event) => {
    if (!node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent("outclick"));
    }
  };
  document.addEventListener("click", handleClick, true);
  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  };
}
function keypressEscape(node) {
  const handleKey = (event) => {
    if (event.key == "Escape") {
      node.dispatchEvent(new CustomEvent("escape"));
    }
  };
  document.body.addEventListener("keydown", handleKey, true);
  return {
    destroy() {
      document.body.removeEventListener("keydown", handleKey, true);
    }
  };
}
const get_bottom_slot_changes$1 = (dirty) => ({});
const get_bottom_slot_context$1 = (ctx) => ({ close: ctx[15] });
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[28] = list[i];
  return child_ctx;
}
const get_default_slot_changes$1 = (dirty) => ({});
const get_default_slot_context$1 = (ctx) => ({ close: ctx[15] });
const get_top_slot_changes$1 = (dirty) => ({});
const get_top_slot_context$1 = (ctx) => ({ close: ctx[15] });
const get_action_slot_changes = (dirty) => ({});
const get_action_slot_context = (ctx) => ({
  onClick: ctx[14],
  close: ctx[15]
});
const get_label_slot_changes$1 = (dirty) => ({});
const get_label_slot_context$1 = (ctx) => ({ close: ctx[15] });
const get_label_pre_slot_changes = (dirty) => ({});
const get_label_pre_slot_context = (ctx) => ({ close: ctx[15] });
const get_icon_slot_changes$1 = (dirty) => ({});
const get_icon_slot_context$1 = (ctx) => ({ close: ctx[15] });
function create_else_block(ctx) {
  let current;
  const action_slot_template = ctx[19].action;
  const action_slot = create_slot(action_slot_template, ctx, ctx[23], get_action_slot_context);
  return {
    c() {
      if (action_slot)
        action_slot.c();
    },
    m(target, anchor) {
      if (action_slot) {
        action_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (action_slot) {
        if (action_slot.p && (!current || dirty & 8388608)) {
          update_slot_base(
            action_slot,
            action_slot_template,
            ctx2,
            ctx2[23],
            !current ? get_all_dirty_from_scope(ctx2[23]) : get_slot_changes(action_slot_template, ctx2[23], dirty, get_action_slot_changes),
            get_action_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(action_slot, local);
      current = true;
    },
    o(local) {
      transition_out(action_slot, local);
      current = false;
    },
    d(detaching) {
      if (action_slot)
        action_slot.d(detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let a;
  let t0;
  let t1;
  let a_class_value;
  let current;
  let mounted;
  let dispose;
  const icon_slot_template = ctx[19].icon;
  const icon_slot = create_slot(icon_slot_template, ctx, ctx[23], get_icon_slot_context$1);
  const label_pre_slot_template = ctx[19]["label-pre"];
  const label_pre_slot = create_slot(label_pre_slot_template, ctx, ctx[23], get_label_pre_slot_context);
  const label_slot_template = ctx[19].label;
  const label_slot = create_slot(label_slot_template, ctx, ctx[23], get_label_slot_context$1);
  const label_slot_or_fallback = label_slot || fallback_block_1$1(ctx);
  let a_levels = [
    { href: "#" },
    {
      class: a_class_value = "px-2 gap-2 " + ctx[4]
    },
    ctx[18],
    { "data-bs-toggle": "dropdown" }
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      if (icon_slot)
        icon_slot.c();
      t0 = space();
      if (label_pre_slot)
        label_pre_slot.c();
      t1 = space();
      if (label_slot_or_fallback)
        label_slot_or_fallback.c();
      set_attributes(a, a_data);
      toggle_class(a, "show", ctx[1]);
      toggle_class(a, "dropdown-toggle", ctx[11]);
      toggle_class(a, "disabled", ctx[10]);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (icon_slot) {
        icon_slot.m(a, null);
      }
      append(a, t0);
      if (label_pre_slot) {
        label_pre_slot.m(a, null);
      }
      append(a, t1);
      if (label_slot_or_fallback) {
        label_slot_or_fallback.m(a, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(a, "click", prevent_default(ctx[14]));
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & 8388608)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            ctx2[23],
            !current ? get_all_dirty_from_scope(ctx2[23]) : get_slot_changes(icon_slot_template, ctx2[23], dirty, get_icon_slot_changes$1),
            get_icon_slot_context$1
          );
        }
      }
      if (label_pre_slot) {
        if (label_pre_slot.p && (!current || dirty & 8388608)) {
          update_slot_base(
            label_pre_slot,
            label_pre_slot_template,
            ctx2,
            ctx2[23],
            !current ? get_all_dirty_from_scope(ctx2[23]) : get_slot_changes(label_pre_slot_template, ctx2[23], dirty, get_label_pre_slot_changes),
            get_label_pre_slot_context
          );
        }
      }
      if (label_slot) {
        if (label_slot.p && (!current || dirty & 8388608)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            ctx2[23],
            !current ? get_all_dirty_from_scope(ctx2[23]) : get_slot_changes(label_slot_template, ctx2[23], dirty, get_label_slot_changes$1),
            get_label_slot_context$1
          );
        }
      } else {
        if (label_slot_or_fallback && label_slot_or_fallback.p && (!current || dirty & 8192)) {
          label_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        { href: "#" },
        (!current || dirty & 16 && a_class_value !== (a_class_value = "px-2 gap-2 " + ctx2[4])) && { class: a_class_value },
        dirty & 262144 && ctx2[18],
        { "data-bs-toggle": "dropdown" }
      ]));
      toggle_class(a, "show", ctx2[1]);
      toggle_class(a, "dropdown-toggle", ctx2[11]);
      toggle_class(a, "disabled", ctx2[10]);
    },
    i(local) {
      if (current)
        return;
      transition_in(icon_slot, local);
      transition_in(label_pre_slot, local);
      transition_in(label_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      transition_out(label_pre_slot, local);
      transition_out(label_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(a);
      if (icon_slot)
        icon_slot.d(detaching);
      if (label_pre_slot)
        label_pre_slot.d(detaching);
      if (label_slot_or_fallback)
        label_slot_or_fallback.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function fallback_block_1$1(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(ctx[13]);
      attr(span, "class", "flex-1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & 8192)
        set_data(t, ctx2[13]);
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create_if_block$3(ctx) {
  let t0;
  let t1;
  let current;
  const top_slot_template = ctx[19].top;
  const top_slot = create_slot(top_slot_template, ctx, ctx[23], get_top_slot_context$1);
  const default_slot_template = ctx[19].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[23], get_default_slot_context$1);
  const default_slot_or_fallback = default_slot || fallback_block$1(ctx);
  const bottom_slot_template = ctx[19].bottom;
  const bottom_slot = create_slot(bottom_slot_template, ctx, ctx[23], get_bottom_slot_context$1);
  return {
    c() {
      if (top_slot)
        top_slot.c();
      t0 = space();
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      t1 = space();
      if (bottom_slot)
        bottom_slot.c();
    },
    m(target, anchor) {
      if (top_slot) {
        top_slot.m(target, anchor);
      }
      insert(target, t0, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(target, anchor);
      }
      insert(target, t1, anchor);
      if (bottom_slot) {
        bottom_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (top_slot) {
        if (top_slot.p && (!current || dirty & 8388608)) {
          update_slot_base(
            top_slot,
            top_slot_template,
            ctx2,
            ctx2[23],
            !current ? get_all_dirty_from_scope(ctx2[23]) : get_slot_changes(top_slot_template, ctx2[23], dirty, get_top_slot_changes$1),
            get_top_slot_context$1
          );
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 8388608)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[23],
            !current ? get_all_dirty_from_scope(ctx2[23]) : get_slot_changes(default_slot_template, ctx2[23], dirty, get_default_slot_changes$1),
            get_default_slot_context$1
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & 525)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
      if (bottom_slot) {
        if (bottom_slot.p && (!current || dirty & 8388608)) {
          update_slot_base(
            bottom_slot,
            bottom_slot_template,
            ctx2,
            ctx2[23],
            !current ? get_all_dirty_from_scope(ctx2[23]) : get_slot_changes(bottom_slot_template, ctx2[23], dirty, get_bottom_slot_changes$1),
            get_bottom_slot_context$1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(top_slot, local);
      transition_in(default_slot_or_fallback, local);
      transition_in(bottom_slot, local);
      current = true;
    },
    o(local) {
      transition_out(top_slot, local);
      transition_out(default_slot_or_fallback, local);
      transition_out(bottom_slot, local);
      current = false;
    },
    d(detaching) {
      if (top_slot)
        top_slot.d(detaching);
      if (detaching)
        detach(t0);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      if (detaching)
        detach(t1);
      if (bottom_slot)
        bottom_slot.d(detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let menuitem;
  let current;
  menuitem = new MenuItem({
    props: {
      selected: !ctx[0],
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  menuitem.$on("click", ctx[20]);
  return {
    c() {
      create_component(menuitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(menuitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const menuitem_changes = {};
      if (dirty & 1)
        menuitem_changes.selected = !ctx2[0];
      if (dirty & 8389120) {
        menuitem_changes.$$scope = { dirty, ctx: ctx2 };
      }
      menuitem.$set(menuitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(menuitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(menuitem, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[9]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 512)
        set_data(t, ctx2[9]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot$2(ctx) {
  let t0_value = ctx[28].name + "";
  let t0;
  let t1;
  return {
    c() {
      t0 = text(t0_value);
      t1 = space();
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && t0_value !== (t0_value = ctx2[28].name + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
    }
  };
}
function create_each_block$1(key_1, ctx) {
  let first;
  let menuitem;
  let current;
  function click_handler_1(...args) {
    return ctx[21](ctx[28], ...args);
  }
  menuitem = new MenuItem({
    props: {
      selected: ctx[0] == ctx[28].id,
      disabled: ctx[28].disabled,
      $$slots: { default: [create_default_slot$2] },
      $$scope: { ctx }
    }
  });
  menuitem.$on("click", click_handler_1);
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(menuitem.$$.fragment);
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      mount_component(menuitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const menuitem_changes = {};
      if (dirty & 5)
        menuitem_changes.selected = ctx[0] == ctx[28].id;
      if (dirty & 4)
        menuitem_changes.disabled = ctx[28].disabled;
      if (dirty & 8388612) {
        menuitem_changes.$$scope = { dirty, ctx };
      }
      menuitem.$set(menuitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(menuitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(first);
      destroy_component(menuitem, detaching);
    }
  };
}
function fallback_block$1(ctx) {
  let t;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let current;
  let if_block = ctx[3] && create_if_block_1$1(ctx);
  let each_value = ctx[2];
  const get_key = (ctx2) => ctx2[28].id;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$1(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
  }
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[3]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty & 65541) {
        each_value = ctx2[2];
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$1, each_1_anchor, get_each_context$1);
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_fragment$7(ctx) {
  let div;
  let current_block_type_index;
  let if_block0;
  let t;
  let ul;
  let ul_class_value;
  let div_class_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_2, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!ctx2[17].action)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = ctx[1] && create_if_block$3(ctx);
  return {
    c() {
      div = element("div");
      if_block0.c();
      t = space();
      ul = element("ul");
      if (if_block1)
        if_block1.c();
      attr(ul, "class", ul_class_value = "dropdown-menu " + ctx[5]);
      attr(ul, "style", ctx[6]);
      toggle_class(ul, "show", ctx[1]);
      attr(div, "class", div_class_value = "dropdown cursor-pointer " + ctx[12]);
      attr(div, "title", ctx[8]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      append(div, t);
      append(div, ul);
      if (if_block1)
        if_block1.m(ul, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(ul, "click", ctx[22]),
          action_destroyer(clickOutside.call(null, div)),
          action_destroyer(keypressEscape.call(null, div)),
          listen(div, "outclick", ctx[15]),
          listen(div, "escape", ctx[15])
        ];
        mounted = true;
      }
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
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
          if_block0.p(ctx2, dirty);
        }
        transition_in(if_block0, 1);
        if_block0.m(div, t);
      }
      if (ctx2[1]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$3(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(ul, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty & 32 && ul_class_value !== (ul_class_value = "dropdown-menu " + ctx2[5])) {
        attr(ul, "class", ul_class_value);
      }
      if (!current || dirty & 64) {
        attr(ul, "style", ctx2[6]);
      }
      if (!current || dirty & 34) {
        toggle_class(ul, "show", ctx2[1]);
      }
      if (!current || dirty & 4096 && div_class_value !== (div_class_value = "dropdown cursor-pointer " + ctx2[12])) {
        attr(div, "class", div_class_value);
      }
      if (!current || dirty & 256) {
        attr(div, "title", ctx2[8]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_blocks[current_block_type_index].d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "id",
    "items",
    "allowNull",
    "actionClass",
    "dropDownClass",
    "dropDownStyle",
    "toggle",
    "title",
    "defaultActionLabel",
    "disabled",
    "showToggleButton",
    "class",
    "show"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { id = null } = $$props;
  let { items } = $$props;
  let { allowNull = true } = $$props;
  let { actionClass = "" } = $$props;
  let { dropDownClass = "" } = $$props;
  let { dropDownStyle = "" } = $$props;
  let { toggle = true } = $$props;
  let { title = "" } = $$props;
  let { defaultActionLabel = "<None>" } = $$props;
  let { disabled = false } = $$props;
  let { showToggleButton = true } = $$props;
  let { class: clazz = "" } = $$props;
  let dispatch = createEventDispatcher();
  let { show = false } = $$props;
  let selectedItem;
  selectedItem = getSelectedItem();
  let label;
  function getLabel() {
    return !id ? defaultActionLabel : (selectedItem == null ? void 0 : selectedItem.name) || "<NA>";
  }
  function getSelectedItem() {
    let item = items == null ? void 0 : items.find((item2) => item2.id === id);
    if (item) {
      return item;
    }
    if (id && (selectedItem == null ? void 0 : selectedItem.id) == id) {
      return selectedItem;
    }
  }
  function onClick() {
    if (disabled) {
      $$invalidate(1, show = false);
      return;
    }
    $$invalidate(1, show = !show);
    dispatch(show ? "open" : "close");
  }
  function close() {
    $$invalidate(1, show = false);
    dispatch("close");
  }
  function onSelect(_id) {
    $$invalidate(0, id = _id);
    dispatch("select", id);
    close();
  }
  const click_handler = (e) => onSelect(null);
  const click_handler_1 = (item, e) => {
    if (item.disabled) {
      e.stopPropagation();
      return;
    }
    onSelect(item.id);
  };
  const click_handler_2 = () => toggle && close();
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(18, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("id" in $$new_props)
      $$invalidate(0, id = $$new_props.id);
    if ("items" in $$new_props)
      $$invalidate(2, items = $$new_props.items);
    if ("allowNull" in $$new_props)
      $$invalidate(3, allowNull = $$new_props.allowNull);
    if ("actionClass" in $$new_props)
      $$invalidate(4, actionClass = $$new_props.actionClass);
    if ("dropDownClass" in $$new_props)
      $$invalidate(5, dropDownClass = $$new_props.dropDownClass);
    if ("dropDownStyle" in $$new_props)
      $$invalidate(6, dropDownStyle = $$new_props.dropDownStyle);
    if ("toggle" in $$new_props)
      $$invalidate(7, toggle = $$new_props.toggle);
    if ("title" in $$new_props)
      $$invalidate(8, title = $$new_props.title);
    if ("defaultActionLabel" in $$new_props)
      $$invalidate(9, defaultActionLabel = $$new_props.defaultActionLabel);
    if ("disabled" in $$new_props)
      $$invalidate(10, disabled = $$new_props.disabled);
    if ("showToggleButton" in $$new_props)
      $$invalidate(11, showToggleButton = $$new_props.showToggleButton);
    if ("class" in $$new_props)
      $$invalidate(12, clazz = $$new_props.class);
    if ("show" in $$new_props)
      $$invalidate(1, show = $$new_props.show);
    if ("$$scope" in $$new_props)
      $$invalidate(23, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 5) {
      selectedItem = getSelectedItem();
    }
    if ($$self.$$.dirty & 5) {
      $$invalidate(13, label = getLabel());
    }
  };
  return [
    id,
    show,
    items,
    allowNull,
    actionClass,
    dropDownClass,
    dropDownStyle,
    toggle,
    title,
    defaultActionLabel,
    disabled,
    showToggleButton,
    clazz,
    label,
    onClick,
    close,
    onSelect,
    $$slots,
    $$restProps,
    slots,
    click_handler,
    click_handler_1,
    click_handler_2,
    $$scope
  ];
}
class Menu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      id: 0,
      items: 2,
      allowNull: 3,
      actionClass: 4,
      dropDownClass: 5,
      dropDownStyle: 6,
      toggle: 7,
      title: 8,
      defaultActionLabel: 9,
      disabled: 10,
      showToggleButton: 11,
      class: 12,
      show: 1
    });
  }
}
const get_error_slot_changes = (dirty) => ({
  showError: dirty & 16,
  inputClasses: dirty & 4,
  inputProps: dirty & 8
});
const get_error_slot_context = (ctx) => ({
  action: ctx[8],
  showError: ctx[4],
  inputClasses: "form-control " + ctx[2],
  inputProps: ctx[3]
});
const get_default_slot_changes = (dirty) => ({
  showError: dirty & 16,
  inputClasses: dirty & 4,
  inputProps: dirty & 8
});
const get_default_slot_context = (ctx) => ({
  action: ctx[8],
  showError: ctx[4],
  inputClasses: "form-control " + ctx[2],
  inputProps: ctx[3]
});
function fallback_block_1(ctx) {
  let input;
  let input_class_value;
  let mounted;
  let dispose;
  let input_levels = [
    { type: ctx[1] },
    {
      class: input_class_value = "form-control " + ctx[2]
    },
    ctx[3]
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
      toggle_class(input, "is-invalid", ctx[4]);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      if (!mounted) {
        dispose = [
          listen(input, "beforeinput", ctx[12]),
          listen(input, "blur", ctx[13]),
          listen(input, "change", ctx[14]),
          listen(input, "input", ctx[15]),
          action_destroyer(ctx[8].call(null, input))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty & 2 && { type: ctx2[1] },
        dirty & 4 && input_class_value !== (input_class_value = "form-control " + ctx2[2]) && { class: input_class_value },
        dirty & 8 && ctx2[3]
      ]));
      toggle_class(input, "is-invalid", ctx2[4]);
    },
    d(detaching) {
      if (detaching)
        detach(input);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block$2(ctx) {
  let current;
  const error_slot_template = ctx[11].error;
  const error_slot = create_slot(error_slot_template, ctx, ctx[10], get_error_slot_context);
  const error_slot_or_fallback = error_slot || fallback_block(ctx);
  return {
    c() {
      if (error_slot_or_fallback)
        error_slot_or_fallback.c();
    },
    m(target, anchor) {
      if (error_slot_or_fallback) {
        error_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (error_slot) {
        if (error_slot.p && (!current || dirty & 1052)) {
          update_slot_base(
            error_slot,
            error_slot_template,
            ctx2,
            ctx2[10],
            !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(error_slot_template, ctx2[10], dirty, get_error_slot_changes),
            get_error_slot_context
          );
        }
      } else {
        if (error_slot_or_fallback && error_slot_or_fallback.p && (!current || dirty & 32)) {
          error_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(error_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(error_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (error_slot_or_fallback)
        error_slot_or_fallback.d(detaching);
    }
  };
}
function fallback_block(ctx) {
  let div;
  let t_value = ctx[5].message + "";
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "invalid-tooltip");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & 32 && t_value !== (t_value = ctx2[5].message + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$6(ctx) {
  let div;
  let t;
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[10], get_default_slot_context);
  const default_slot_or_fallback = default_slot || fallback_block_1(ctx);
  let if_block = ctx[4] && create_if_block$2(ctx);
  return {
    c() {
      div = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      t = space();
      if (if_block)
        if_block.c();
      attr(div, "class", "form-control p-0 border-0 input-group has-validation");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div, null);
      }
      append(div, t);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1052)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[10],
            !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(default_slot_template, ctx2[10], dirty, get_default_slot_changes),
            get_default_slot_context
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & 30)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
      if (ctx2[4]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
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
      transition_in(default_slot_or_fallback, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      if (if_block)
        if_block.d();
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let $field, $$unsubscribe_field = noop, $$subscribe_field = () => ($$unsubscribe_field(), $$unsubscribe_field = subscribe(field, ($$value) => $$invalidate(16, $field = $$value)), field);
  let $showError;
  let $error;
  $$self.$$.on_destroy.push(() => $$unsubscribe_field());
  let { $$slots: slots = {}, $$scope } = $$props;
  let { field } = $$props;
  $$subscribe_field();
  let { formatOptions = {} } = $$props;
  let { inputType = "text" } = $$props;
  let { inputClasses = "" } = $$props;
  let { inputProps = {} } = $$props;
  const { format, deformat } = field.typeDef;
  const { error, showError } = field;
  component_subscribe($$self, error, (value) => $$invalidate(5, $error = value));
  component_subscribe($$self, showError, (value) => $$invalidate(4, $showError = value));
  function set(formattedValue, options = formatOptions) {
    try {
      const parsedValue = deformat(formattedValue, options);
      field.set(parsedValue);
    } catch (e) {
      field.error.set({ message: e.message });
    }
  }
  function get() {
    return format($field, formatOptions);
  }
  function action(el) {
    let inputChanged = false;
    const _unsubscribe = field.subscribe((_2) => {
      if (inputChanged) {
        inputChanged = false;
        return;
      }
      el.value = get();
    });
    function onInput(e) {
      inputChanged = true;
      set(e.target.value);
    }
    function onTouch(e) {
      field.setTouched(true);
    }
    el.addEventListener("input", onInput);
    el.addEventListener("beforeinput", onTouch, { once: true });
    el.addEventListener("focusout", onTouch, { once: true });
    return {
      destroy: () => {
        el.removeEventListener("input", onInput);
        el.removeEventListener("beforeinput", onTouch);
        el.removeEventListener("focusout", onTouch);
        _unsubscribe();
      }
    };
  }
  function beforeinput_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("field" in $$props2)
      $$subscribe_field($$invalidate(0, field = $$props2.field));
    if ("formatOptions" in $$props2)
      $$invalidate(9, formatOptions = $$props2.formatOptions);
    if ("inputType" in $$props2)
      $$invalidate(1, inputType = $$props2.inputType);
    if ("inputClasses" in $$props2)
      $$invalidate(2, inputClasses = $$props2.inputClasses);
    if ("inputProps" in $$props2)
      $$invalidate(3, inputProps = $$props2.inputProps);
    if ("$$scope" in $$props2)
      $$invalidate(10, $$scope = $$props2.$$scope);
  };
  return [
    field,
    inputType,
    inputClasses,
    inputProps,
    $showError,
    $error,
    error,
    showError,
    action,
    formatOptions,
    $$scope,
    slots,
    beforeinput_handler,
    blur_handler,
    change_handler,
    input_handler
  ];
}
class FieldWrapper extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      field: 0,
      formatOptions: 9,
      inputType: 1,
      inputClasses: 2,
      inputProps: 3
    });
  }
}
function create_if_block$1(ctx) {
  let p;
  let t;
  return {
    c() {
      p = element("p");
      t = text(ctx[2]);
      attr(p, "class", "help");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t, ctx2[2]);
    },
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_fragment$5(ctx) {
  let fieldwrapper;
  let t;
  let if_block_anchor;
  let current;
  fieldwrapper = new FieldWrapper({
    props: {
      field: ctx[1],
      inputType: ctx[3],
      inputClasses: ctx[0],
      inputProps: ctx[4]
    }
  });
  fieldwrapper.$on("beforeinput", ctx[5]);
  fieldwrapper.$on("blur", ctx[6]);
  fieldwrapper.$on("change", ctx[7]);
  fieldwrapper.$on("input", ctx[8]);
  let if_block = !!ctx[2] && create_if_block$1(ctx);
  return {
    c() {
      create_component(fieldwrapper.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(fieldwrapper, target, anchor);
      insert(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const fieldwrapper_changes = {};
      if (dirty & 2)
        fieldwrapper_changes.field = ctx2[1];
      if (dirty & 1)
        fieldwrapper_changes.inputClasses = ctx2[0];
      if (dirty & 16)
        fieldwrapper_changes.inputProps = ctx2[4];
      fieldwrapper.$set(fieldwrapper_changes);
      if (!!ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
      destroy_component(fieldwrapper, detaching);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  const omit_props_names = ["classes", "field", "help"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { classes = "" } = $$props;
  let { field } = $$props;
  let { help = "" } = $$props;
  let inputType = field.def.type === "int" || field.def.type === "ranged:int" ? "number" : "text";
  function beforeinput_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function change_handler(event) {
    bubble.call(this, $$self, event);
  }
  function input_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("classes" in $$new_props)
      $$invalidate(0, classes = $$new_props.classes);
    if ("field" in $$new_props)
      $$invalidate(1, field = $$new_props.field);
    if ("help" in $$new_props)
      $$invalidate(2, help = $$new_props.help);
  };
  return [
    classes,
    field,
    help,
    inputType,
    $$restProps,
    beforeinput_handler,
    blur_handler,
    change_handler,
    input_handler
  ];
}
class InputEdit extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { classes: 0, field: 1, help: 2 });
  }
}
function create_fragment$4(ctx) {
  let li;
  let t;
  return {
    c() {
      li = element("li");
      t = text(ctx[0]);
      attr(li, "class", "dropdown-header ttu");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, t);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t, ctx2[0]);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { name } = $$props;
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2)
      $$invalidate(0, name = $$props2.name);
  };
  return [name];
}
class MenuHeaderItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { name: 0 });
  }
}
function create_default_slot$1(ctx) {
  let div1;
  let span;
  let input;
  let t0;
  let div0;
  let t1_value = (ctx[2].label || ctx[2].name) + "";
  let t1;
  return {
    c() {
      div1 = element("div");
      span = element("span");
      input = element("input");
      t0 = space();
      div0 = element("div");
      t1 = text(t1_value);
      attr(input, "type", "checkbox");
      set_style(input, "vertical-align", "top");
      set_style(input, "margin", "0 4px");
      input.checked = ctx[1];
      attr(span, "class", "pa1 pb0");
      attr(div0, "class", "ml1");
      attr(div1, "class", "flex");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, span);
      append(span, input);
      append(div1, t0);
      append(div1, div0);
      append(div0, t1);
    },
    p(ctx2, dirty) {
      if (dirty & 2) {
        input.checked = ctx2[1];
      }
      if (dirty & 4 && t1_value !== (t1_value = (ctx2[2].label || ctx2[2].name) + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach(div1);
    }
  };
}
function create_fragment$3(ctx) {
  let menuitem;
  let current;
  menuitem = new MenuItem({
    props: {
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  menuitem.$on("click", ctx[3]);
  return {
    c() {
      create_component(menuitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(menuitem, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const menuitem_changes = {};
      if (dirty & 22) {
        menuitem_changes.$$scope = { dirty, ctx: ctx2 };
      }
      menuitem.$set(menuitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(menuitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(menuitem, detaching);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let $item, $$unsubscribe_item = noop, $$subscribe_item = () => ($$unsubscribe_item(), $$unsubscribe_item = subscribe(item, ($$value) => $$invalidate(2, $item = $$value)), item);
  $$self.$$.on_destroy.push(() => $$unsubscribe_item());
  let { item } = $$props;
  $$subscribe_item();
  let { checked = false } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("item" in $$props2)
      $$subscribe_item($$invalidate(0, item = $$props2.item));
    if ("checked" in $$props2)
      $$invalidate(1, checked = $$props2.checked);
  };
  return [item, checked, $item, click_handler];
}
class CheckableMenuItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { item: 0, checked: 1 });
  }
}
var MultiSelectMenu_svelte_svelte_type_style_lang = "";
const get_bottom_slot_changes = (dirty) => ({});
const get_bottom_slot_context = (ctx) => ({});
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[21] = list[i];
  child_ctx[23] = i;
  return child_ctx;
}
const get_top_slot_changes = (dirty) => ({});
const get_top_slot_context = (ctx) => ({});
const get_label_slot_changes = (dirty) => ({});
const get_label_slot_context = (ctx) => ({});
const get_icon_slot_changes = (dirty) => ({});
const get_icon_slot_context = (ctx) => ({});
function create_if_block_1(ctx) {
  let menuitem;
  let current;
  menuitem = new MenuItem({
    props: {
      selected: false,
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  menuitem.$on("click", ctx[15]);
  return {
    c() {
      create_component(menuitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(menuitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const menuitem_changes = {};
      if (dirty & 131072) {
        menuitem_changes.$$scope = { dirty, ctx: ctx2 };
      }
      menuitem.$set(menuitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(menuitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(menuitem, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let t;
  return {
    c() {
      t = text("None (Default)");
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
function create_if_block(ctx) {
  let menuheaderitem;
  let current;
  menuheaderitem = new MenuHeaderItem({
    props: {
      name: ctx[5](ctx[21])
    }
  });
  return {
    c() {
      create_component(menuheaderitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(menuheaderitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const menuheaderitem_changes = {};
      if (dirty & 33)
        menuheaderitem_changes.name = ctx2[5](ctx2[21]);
      menuheaderitem.$set(menuheaderitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(menuheaderitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menuheaderitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(menuheaderitem, detaching);
    }
  };
}
function create_key_block(ctx) {
  let checkablemenuitem;
  let current;
  function click_handler_1(...args) {
    return ctx[16](ctx[21], ...args);
  }
  checkablemenuitem = new CheckableMenuItem({
    props: {
      item: ctx[21],
      checked: ctx[1].includes(ctx[4](ctx[21]).id)
    }
  });
  checkablemenuitem.$on("click", click_handler_1);
  return {
    c() {
      create_component(checkablemenuitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(checkablemenuitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const checkablemenuitem_changes = {};
      if (dirty & 1)
        checkablemenuitem_changes.item = ctx[21];
      if (dirty & 19)
        checkablemenuitem_changes.checked = ctx[1].includes(ctx[4](ctx[21]).id);
      checkablemenuitem.$set(checkablemenuitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(checkablemenuitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(checkablemenuitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(checkablemenuitem, detaching);
    }
  };
}
function create_each_block(ctx) {
  let show_if = ctx[12](ctx[21], ctx[23]);
  let t;
  let previous_key = ctx[1];
  let key_block_anchor;
  let current;
  let if_block = show_if && create_if_block(ctx);
  let key_block = create_key_block(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      key_block.c();
      key_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t, anchor);
      key_block.m(target, anchor);
      insert(target, key_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 1)
        show_if = ctx2[12](ctx2[21], ctx2[23]);
      if (show_if) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty & 2 && safe_not_equal(previous_key, previous_key = ctx2[1])) {
        group_outros();
        transition_out(key_block, 1, 1, noop);
        check_outros();
        key_block = create_key_block(ctx2);
        key_block.c();
        transition_in(key_block, 1);
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(key_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(key_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t);
      if (detaching)
        detach(key_block_anchor);
      key_block.d(detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  let a;
  let t0;
  let t1;
  let span;
  let a_href_value;
  let a_class_value;
  let t2;
  let ul;
  let t3;
  let t4;
  let t5;
  let ul_class_value;
  let current;
  let mounted;
  let dispose;
  const icon_slot_template = ctx[14].icon;
  const icon_slot = create_slot(icon_slot_template, ctx, ctx[17], get_icon_slot_context);
  const label_slot_template = ctx[14].label;
  const label_slot = create_slot(label_slot_template, ctx, ctx[17], get_label_slot_context);
  let a_levels = [
    { href: a_href_value = "#" },
    {
      class: a_class_value = "d-flex btn btn-default btn-sm items-center dropdown-toggle " + ctx[6]
    },
    ctx[13],
    { "data-bs-toggle": "dropdown" },
    { "aria-expanded": "false" },
    { style: "width: min-content;" }
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  const top_slot_template = ctx[14].top;
  const top_slot = create_slot(top_slot_template, ctx, ctx[17], get_top_slot_context);
  let if_block = ctx[2] && create_if_block_1(ctx);
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  const bottom_slot_template = ctx[14].bottom;
  const bottom_slot = create_slot(bottom_slot_template, ctx, ctx[17], get_bottom_slot_context);
  return {
    c() {
      div = element("div");
      a = element("a");
      if (icon_slot)
        icon_slot.c();
      t0 = space();
      if (label_slot)
        label_slot.c();
      t1 = space();
      span = element("span");
      t2 = space();
      ul = element("ul");
      if (top_slot)
        top_slot.c();
      t3 = space();
      if (if_block)
        if_block.c();
      t4 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t5 = space();
      if (bottom_slot)
        bottom_slot.c();
      attr(span, "class", "caret");
      set_attributes(a, a_data);
      toggle_class(a, "show", ctx[7]);
      toggle_class(a, "svelte-n7c86q", true);
      attr(ul, "class", ul_class_value = "dropdown-menu max-w-[200px] " + ctx[3] + " svelte-n7c86q");
      toggle_class(ul, "show", ctx[7]);
      attr(div, "class", "dropdown");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, a);
      if (icon_slot) {
        icon_slot.m(a, null);
      }
      append(a, t0);
      if (label_slot) {
        label_slot.m(a, null);
      }
      append(a, t1);
      append(a, span);
      append(div, t2);
      append(div, ul);
      if (top_slot) {
        top_slot.m(ul, null);
      }
      append(ul, t3);
      if (if_block)
        if_block.m(ul, null);
      append(ul, t4);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      append(ul, t5);
      if (bottom_slot) {
        bottom_slot.m(ul, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(a, "click", prevent_default(ctx[8])),
          action_destroyer(clickOutside.call(null, div)),
          action_destroyer(keypressEscape.call(null, div)),
          listen(div, "outclick", ctx[9]),
          listen(div, "escape", ctx[9])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & 131072)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            ctx2[17],
            !current ? get_all_dirty_from_scope(ctx2[17]) : get_slot_changes(icon_slot_template, ctx2[17], dirty, get_icon_slot_changes),
            get_icon_slot_context
          );
        }
      }
      if (label_slot) {
        if (label_slot.p && (!current || dirty & 131072)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            ctx2[17],
            !current ? get_all_dirty_from_scope(ctx2[17]) : get_slot_changes(label_slot_template, ctx2[17], dirty, get_label_slot_changes),
            get_label_slot_context
          );
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        { href: a_href_value },
        (!current || dirty & 64 && a_class_value !== (a_class_value = "d-flex btn btn-default btn-sm items-center dropdown-toggle " + ctx2[6])) && { class: a_class_value },
        dirty & 8192 && ctx2[13],
        { "data-bs-toggle": "dropdown" },
        { "aria-expanded": "false" },
        { style: "width: min-content;" }
      ]));
      toggle_class(a, "show", ctx2[7]);
      toggle_class(a, "svelte-n7c86q", true);
      if (top_slot) {
        if (top_slot.p && (!current || dirty & 131072)) {
          update_slot_base(
            top_slot,
            top_slot_template,
            ctx2,
            ctx2[17],
            !current ? get_all_dirty_from_scope(ctx2[17]) : get_slot_changes(top_slot_template, ctx2[17], dirty, get_top_slot_changes),
            get_top_slot_context
          );
        }
      }
      if (ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(ul, t4);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty & 5171) {
        each_value = ctx2[0];
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
            each_blocks[i].m(ul, t5);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (bottom_slot) {
        if (bottom_slot.p && (!current || dirty & 131072)) {
          update_slot_base(
            bottom_slot,
            bottom_slot_template,
            ctx2,
            ctx2[17],
            !current ? get_all_dirty_from_scope(ctx2[17]) : get_slot_changes(bottom_slot_template, ctx2[17], dirty, get_bottom_slot_changes),
            get_bottom_slot_context
          );
        }
      }
      if (!current || dirty & 8 && ul_class_value !== (ul_class_value = "dropdown-menu max-w-[200px] " + ctx2[3] + " svelte-n7c86q")) {
        attr(ul, "class", ul_class_value);
      }
      if (!current || dirty & 136) {
        toggle_class(ul, "show", ctx2[7]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(icon_slot, local);
      transition_in(label_slot, local);
      transition_in(top_slot, local);
      transition_in(if_block);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(bottom_slot, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      transition_out(label_slot, local);
      transition_out(top_slot, local);
      transition_out(if_block);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(bottom_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (icon_slot)
        icon_slot.d(detaching);
      if (label_slot)
        label_slot.d(detaching);
      if (top_slot)
        top_slot.d(detaching);
      if (if_block)
        if_block.d();
      destroy_each(each_blocks, detaching);
      if (bottom_slot)
        bottom_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  const omit_props_names = ["ids", "items", "allowNull", "dropDownClass", "get", "getSectionName", "class"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { ids = [] } = $$props;
  let { items } = $$props;
  let { allowNull = true } = $$props;
  let { dropDownClass = "" } = $$props;
  let { get = get_store_value } = $$props;
  let { getSectionName = () => {
    return null;
  } } = $$props;
  let { class: clazz = "" } = $$props;
  let dispatch = createEventDispatcher();
  let show = false;
  let lastSectionName;
  function onClick() {
    $$invalidate(7, show = !show);
    dispatch(show ? "open" : "close");
  }
  function close() {
    $$invalidate(7, show = false);
    dispatch("close");
  }
  function onClickItem(_id) {
    let checked = ids.includes(_id);
    onSelect(checked ? _.without(ids, _id) : [...ids, _id]);
  }
  function onSelect(_ids) {
    $$invalidate(1, ids = _ids);
    $$invalidate(0, items);
    dispatch("change", ids);
    close();
  }
  function shouldCreateSectionHeader(item, i) {
    if (i === 0) {
      lastSectionName = void 0;
    }
    const currentSectionName = getSectionName(item);
    if (!currentSectionName) {
      return false;
    }
    if (lastSectionName === currentSectionName) {
      return false;
    } else {
      lastSectionName = currentSectionName;
      return true;
    }
  }
  const click_handler = (e) => onSelect([]);
  const click_handler_1 = (item, e) => onClickItem(get(item).id);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(13, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("ids" in $$new_props)
      $$invalidate(1, ids = $$new_props.ids);
    if ("items" in $$new_props)
      $$invalidate(0, items = $$new_props.items);
    if ("allowNull" in $$new_props)
      $$invalidate(2, allowNull = $$new_props.allowNull);
    if ("dropDownClass" in $$new_props)
      $$invalidate(3, dropDownClass = $$new_props.dropDownClass);
    if ("get" in $$new_props)
      $$invalidate(4, get = $$new_props.get);
    if ("getSectionName" in $$new_props)
      $$invalidate(5, getSectionName = $$new_props.getSectionName);
    if ("class" in $$new_props)
      $$invalidate(6, clazz = $$new_props.class);
    if ("$$scope" in $$new_props)
      $$invalidate(17, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      lastSectionName = void 0;
    }
  };
  return [
    items,
    ids,
    allowNull,
    dropDownClass,
    get,
    getSectionName,
    clazz,
    show,
    onClick,
    close,
    onClickItem,
    onSelect,
    shouldCreateSectionHeader,
    $$restProps,
    slots,
    click_handler,
    click_handler_1,
    $$scope
  ];
}
class MultiSelectMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      ids: 1,
      items: 0,
      allowNull: 2,
      dropDownClass: 3,
      get: 4,
      getSectionName: 5,
      class: 6
    });
  }
}
function create_fragment$1(ctx) {
  let svg;
  let path;
  let svg_levels = [
    { xmlns: "http://www.w3.org/2000/svg" },
    { fill: "none" },
    { viewBox: "0 0 24 24" },
    { stroke: "currentColor" },
    ctx[0]
  ];
  let svg_data = {};
  for (let i = 0; i < svg_levels.length; i += 1) {
    svg_data = assign(svg_data, svg_levels[i]);
  }
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-linejoin", "round");
      attr(path, "stroke-width", "2");
      attr(path, "d", "M6 18L18 6M6 6l12 12");
      set_svg_attributes(svg, svg_data);
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
    },
    p(ctx2, [dirty]) {
      set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
        { xmlns: "http://www.w3.org/2000/svg" },
        { fill: "none" },
        { viewBox: "0 0 24 24" },
        { stroke: "currentColor" },
        dirty & 1 && ctx2[0]
      ]));
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  const omit_props_names = [];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
  };
  return [$$restProps];
}
class Cross extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
const get_subheader_slot_changes = (dirty) => ({});
const get_subheader_slot_context = (ctx) => ({});
const get_header_slot_changes = (dirty) => ({});
const get_header_slot_context = (ctx) => ({});
function create_fragment(ctx) {
  let div5;
  let div4;
  let h5;
  let button;
  let div1;
  let t0;
  let div0;
  let t1;
  let t2;
  let div3;
  let div2;
  let div5_class_value;
  let current;
  const header_slot_template = ctx[6].header;
  const header_slot = create_slot(header_slot_template, ctx, ctx[5], get_header_slot_context);
  const subheader_slot_template = ctx[6].subheader;
  const subheader_slot = create_slot(subheader_slot_template, ctx, ctx[5], get_subheader_slot_context);
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  return {
    c() {
      div5 = element("div");
      div4 = element("div");
      h5 = element("h5");
      button = element("button");
      div1 = element("div");
      if (header_slot)
        header_slot.c();
      t0 = space();
      div0 = element("div");
      t1 = space();
      if (subheader_slot)
        subheader_slot.c();
      t2 = space();
      div3 = element("div");
      div2 = element("div");
      if (default_slot)
        default_slot.c();
      attr(div0, "class", "flex-grow-1");
      attr(div1, "class", "d-flex small ms-3 w-100");
      attr(button, "class", "accordion-button");
      attr(button, "data-bs-toggle", "collapse");
      attr(button, "data-bs-target", "#" + ctx[3]);
      toggle_class(button, "collapsed", !ctx[0]);
      attr(h5, "class", "accordion-header");
      attr(div2, "class", "accordion-body");
      set_style(div2, "--bs-accordion-body-padding-x", "0");
      set_style(div2, "--bs-accordion-body-padding-y", "0");
      attr(div3, "id", ctx[3]);
      attr(div3, "class", "accordion-collapse collapse");
      attr(div3, "data-bs-parent", "#" + ctx[2]);
      toggle_class(div3, "show", ctx[0]);
      attr(div4, "class", "accordion-item");
      attr(div5, "class", div5_class_value = "accordion xaccordion-arrow-left " + ctx[1]);
      attr(div5, "id", ctx[2]);
    },
    m(target, anchor) {
      insert(target, div5, anchor);
      append(div5, div4);
      append(div4, h5);
      append(h5, button);
      append(button, div1);
      if (header_slot) {
        header_slot.m(div1, null);
      }
      append(div1, t0);
      append(div1, div0);
      append(div1, t1);
      if (subheader_slot) {
        subheader_slot.m(div1, null);
      }
      append(div4, t2);
      append(div4, div3);
      append(div3, div2);
      if (default_slot) {
        default_slot.m(div2, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (header_slot) {
        if (header_slot.p && (!current || dirty & 32)) {
          update_slot_base(
            header_slot,
            header_slot_template,
            ctx2,
            ctx2[5],
            !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(header_slot_template, ctx2[5], dirty, get_header_slot_changes),
            get_header_slot_context
          );
        }
      }
      if (subheader_slot) {
        if (subheader_slot.p && (!current || dirty & 32)) {
          update_slot_base(
            subheader_slot,
            subheader_slot_template,
            ctx2,
            ctx2[5],
            !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(subheader_slot_template, ctx2[5], dirty, get_subheader_slot_changes),
            get_subheader_slot_context
          );
        }
      }
      if (!current || dirty & 1) {
        toggle_class(button, "collapsed", !ctx2[0]);
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[5],
            !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(default_slot_template, ctx2[5], dirty, null),
            null
          );
        }
      }
      if (!current || dirty & 1) {
        toggle_class(div3, "show", ctx2[0]);
      }
      if (!current || dirty & 2 && div5_class_value !== (div5_class_value = "accordion xaccordion-arrow-left " + ctx2[1])) {
        attr(div5, "class", div5_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(header_slot, local);
      transition_in(subheader_slot, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(header_slot, local);
      transition_out(subheader_slot, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div5);
      if (header_slot)
        header_slot.d(detaching);
      if (subheader_slot)
        subheader_slot.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { id } = $$props;
  let { show = false } = $$props;
  let { class: clazz = "" } = $$props;
  const accordionId = "accordion-" + id;
  const collapseId = "collapse-" + id;
  $$self.$$set = ($$props2) => {
    if ("id" in $$props2)
      $$invalidate(4, id = $$props2.id);
    if ("show" in $$props2)
      $$invalidate(0, show = $$props2.show);
    if ("class" in $$props2)
      $$invalidate(1, clazz = $$props2.class);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [show, clazz, accordionId, collapseId, id, $$scope, slots];
}
class Accordion extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { id: 4, show: 0, class: 1 });
  }
}
export { Accordion as A, Cross as C, FieldWrapper as F, InputEdit as I, Menu as M, MultiSelectMenu as a, MenuItem as b, clickOutside as c };
