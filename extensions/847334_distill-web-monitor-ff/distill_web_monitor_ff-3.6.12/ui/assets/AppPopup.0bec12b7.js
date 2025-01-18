import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, t as text, a as space, b as attr, g as insert, h as append, l as listen, ay as is_function, r as set_data, n as noop, j as detach, X as run_all, T as C, c as src_url_equal, _ as toggle_class, p as prevent_default, W as subscribe, a3 as handle_promise, I as create_component, a5 as empty, J as mount_component, $ as action_destroyer, a4 as update_await_block_branch, z as transition_in, B as group_outros, C as transition_out, D as check_outros, K as destroy_component, q as getContext, Y as createEventDispatcher, R as Model, m as component_subscribe, aa as onMount, am as onDestroy, A as Api, ap as update_keyed_each, as as outro_and_destroy_block, aC as flush, f as set_style, b5 as Self, aA as get_store_value, aF as location, b4 as replace, ax as setContext, U as Msg, b7 as loadLang, a6 as binding_callbacks, at as Router } from "./sieve.0422c872.js";
import { S as SPRINTF, b as Selector, c as checkSieveConstraint, M as ModelLabel, u as updateTeam, e as updateRoute } from "./label.d933b3ec.js";
import { s as serviceProxy, T } from "./service.04921d45.js";
function wrap(args) {
  if (!args) {
    throw Error("Parameter args is required");
  }
  if (!args.component == !args.asyncComponent) {
    throw Error("One and only one of component and asyncComponent is required");
  }
  if (args.component) {
    args.asyncComponent = () => Promise.resolve(args.component);
  }
  if (typeof args.asyncComponent != "function") {
    throw Error("Parameter asyncComponent must be a function");
  }
  if (args.conditions) {
    if (!Array.isArray(args.conditions)) {
      args.conditions = [args.conditions];
    }
    for (let i = 0; i < args.conditions.length; i++) {
      if (!args.conditions[i] || typeof args.conditions[i] != "function") {
        throw Error("Invalid parameter conditions[" + i + "]");
      }
    }
  }
  if (args.loadingComponent) {
    args.asyncComponent.loading = args.loadingComponent;
    args.asyncComponent.loadingParams = args.loadingParams || void 0;
  }
  const obj = {
    component: args.asyncComponent,
    userData: args.userData,
    conditions: args.conditions && args.conditions.length ? args.conditions : void 0,
    props: args.props && Object.keys(args.props).length ? args.props : {},
    _sveltesparouter: true
  };
  return obj;
}
var popup = "";
var SieveLimit_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let div1;
  let div0;
  let t0_value = SPRINTF("m_monitor_constraint_1", ctx[0], ctx[1]) + "";
  let t0;
  let t1;
  let t2_value = SPRINTF("m_monitor_constraint_2") + "";
  let t2;
  let t3;
  let ul;
  let li0;
  let a0;
  let i0;
  let t4;
  let t5_value = SPRINTF("a_go_to_watchlist") + "";
  let t5;
  let t6;
  let t7_value = SPRINTF("m_monitor_constraint_3") + "";
  let t7;
  let t8;
  let li1;
  let a1;
  let i1;
  let t9;
  let t10_value = SPRINTF("a_go_to_billing") + "";
  let t10;
  let t11;
  let t12_value = SPRINTF("m_monitor_constraint_4") + "";
  let t12;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      t2 = text(t2_value);
      t3 = space();
      ul = element("ul");
      li0 = element("li");
      a0 = element("a");
      i0 = element("i");
      t4 = space();
      t5 = text(t5_value);
      t6 = text(" : ");
      t7 = text(t7_value);
      t8 = space();
      li1 = element("li");
      a1 = element("a");
      i1 = element("i");
      t9 = space();
      t10 = text(t10_value);
      t11 = text(": ");
      t12 = text(t12_value);
      attr(i0, "class", "fa fa-link");
      attr(a0, "href", "/ui/inbox.html");
      attr(i1, "class", "fa fa-link");
      attr(a1, "href", serviceProxy.CFG.URL.APP + "#/settings/billing/");
      attr(div0, "class", "alert alert-danger");
      attr(div1, "class", "xmonitor-limit svelte-rpyckn");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, t0);
      append(div0, t1);
      append(div0, t2);
      append(div0, t3);
      append(div0, ul);
      append(ul, li0);
      append(li0, a0);
      append(a0, i0);
      append(a0, t4);
      append(a0, t5);
      append(a0, t6);
      append(a0, t7);
      append(ul, t8);
      append(ul, li1);
      append(li1, a1);
      append(a1, i1);
      append(a1, t9);
      append(a1, t10);
      append(a1, t11);
      append(a1, t12);
      if (!mounted) {
        dispose = [
          listen(a0, "click", function() {
            if (is_function(ctx[2]))
              ctx[2].apply(this, arguments);
          }),
          listen(a1, "click", function() {
            if (is_function(ctx[2]))
              ctx[2].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (dirty & 3 && t0_value !== (t0_value = SPRINTF("m_monitor_constraint_1", ctx[0], ctx[1]) + ""))
        set_data(t0, t0_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div1);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { count } = $$props;
  let { limit } = $$props;
  let { openURL } = $$props;
  $$self.$$set = ($$props2) => {
    if ("count" in $$props2)
      $$invalidate(0, count = $$props2.count);
    if ("limit" in $$props2)
      $$invalidate(1, limit = $$props2.limit);
    if ("openURL" in $$props2)
      $$invalidate(2, openURL = $$props2.openURL);
  };
  return [count, limit, openURL];
}
class SieveLimit extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { count: 0, limit: 1, openURL: 2 });
  }
}
var PopupSieveItem_svelte_svelte_type_style_lang = "";
function create_if_block_2$1(ctx) {
  let t;
  return {
    c() {
      t = text("(deleted)");
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
function create_else_block$2(ctx) {
  let div;
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[4].text)
      return create_if_block_1$1;
    return create_else_block_1$1;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "small");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block) {
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
function create_if_block$2(ctx) {
  let div;
  let t0_value = (ctx[4].err.code || "EUNKNOWN") + "";
  let t0;
  let t1;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = text(" error encountered");
      attr(div, "class", "small error");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && t0_value !== (t0_value = (ctx2[4].err.code || "EUNKNOWN") + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_else_block_1$1(ctx) {
  let t;
  return {
    c() {
      t = text("There is no preview yet");
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
function create_if_block_1$1(ctx) {
  let t_value = ctx[4].text + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 16 && t_value !== (t_value = ctx2[4].text + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$2(ctx) {
  let li5;
  let a0;
  let img;
  let img_src_value;
  let t0;
  let div1;
  let div0;
  let t1;
  let t2_value = ctx[4].name + "";
  let t2;
  let t3;
  let a0_href_value;
  let t4;
  let div2;
  let button;
  let t5;
  let ul;
  let li0;
  let a1;
  let t7;
  let li1;
  let a2;
  let t9;
  let li2;
  let a3;
  let t11;
  let li3;
  let t12;
  let li4;
  let a4;
  let mounted;
  let dispose;
  let if_block0 = ctx[4].state == C.STATE_DISCARD && create_if_block_2$1();
  function select_block_type(ctx2, dirty) {
    if (ctx2[4].err)
      return create_if_block$2;
    return create_else_block$2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  return {
    c() {
      li5 = element("li");
      a0 = element("a");
      img = element("img");
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      if (if_block0)
        if_block0.c();
      t1 = space();
      t2 = text(t2_value);
      t3 = space();
      if_block1.c();
      t4 = space();
      div2 = element("div");
      button = element("button");
      button.innerHTML = `<i class="fa fa-ellipsis-h"></i>`;
      t5 = space();
      ul = element("ul");
      li0 = element("li");
      a1 = element("a");
      a1.textContent = "Mark as Read";
      t7 = space();
      li1 = element("li");
      a2 = element("a");
      a2.textContent = "Show Change History";
      t9 = space();
      li2 = element("li");
      a3 = element("a");
      a3.textContent = "Check for changes";
      t11 = space();
      li3 = element("li");
      t12 = space();
      li4 = element("li");
      a4 = element("a");
      a4.textContent = "Move to Trash";
      attr(img, "width", "16");
      attr(img, "height", "16");
      attr(img, "class", "mt-4");
      if (!src_url_equal(img.src, img_src_value = serviceProxy.CFG.URL.APP + "/v1/getfavicon?url=" + escape(ctx[6])))
        attr(img, "src", img_src_value);
      attr(img, "loading", "lazy");
      attr(div0, "class", "xtitle nowrap xellipsis pb-1");
      attr(div1, "class", "flex-grow p-3");
      attr(a0, "href", a0_href_value = ctx[4].uri);
      attr(a0, "class", "xitem flex pl-2 hover:bg-gray-100 no-underline hover:no-underline");
      toggle_class(a0, "xread", ctx[5]);
      attr(button, "class", "btn btn-default btn-sm px-2 svelte-1jheeq8");
      attr(button, "data-bs-toggle", "dropdown");
      attr(a1, "class", "dropdown-item");
      attr(a1, "href", "#");
      toggle_class(li0, "disabled", ctx[5]);
      attr(a2, "class", "dropdown-item");
      attr(a2, "href", "#");
      attr(a3, "class", "dropdown-item");
      attr(a3, "href", "#");
      toggle_class(li2, "disabled", ctx[4].client_id !== ctx[3]);
      attr(li3, "class", "divider");
      attr(a4, "class", "dropdown-item");
      attr(a4, "href", "#");
      attr(ul, "class", "dropdown-menu dropdown-menu-right");
      attr(div2, "class", "xoverflow absolute top-0 right-2 dropdown svelte-1jheeq8");
      attr(li5, "class", "relative svelte-1jheeq8");
    },
    m(target, anchor) {
      insert(target, li5, anchor);
      append(li5, a0);
      append(a0, img);
      append(a0, t0);
      append(a0, div1);
      append(div1, div0);
      if (if_block0)
        if_block0.m(div0, null);
      append(div0, t1);
      append(div0, t2);
      append(div1, t3);
      if_block1.m(div1, null);
      append(li5, t4);
      append(li5, div2);
      append(div2, button);
      append(div2, t5);
      append(div2, ul);
      append(ul, li0);
      append(li0, a1);
      append(ul, t7);
      append(ul, li1);
      append(li1, a2);
      append(ul, t9);
      append(ul, li2);
      append(li2, a3);
      append(ul, t11);
      append(ul, li3);
      append(ul, t12);
      append(ul, li4);
      append(li4, a4);
      if (!mounted) {
        dispose = [
          listen(a0, "click", prevent_default(ctx[8])),
          listen(a1, "click", prevent_default(ctx[9])),
          listen(a2, "click", prevent_default(ctx[10])),
          listen(a3, "click", prevent_default(ctx[11])),
          listen(a4, "click", prevent_default(ctx[12]))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 64 && !src_url_equal(img.src, img_src_value = serviceProxy.CFG.URL.APP + "/v1/getfavicon?url=" + escape(ctx2[6]))) {
        attr(img, "src", img_src_value);
      }
      if (ctx2[4].state == C.STATE_DISCARD) {
        if (if_block0)
          ;
        else {
          if_block0 = create_if_block_2$1();
          if_block0.c();
          if_block0.m(div0, t1);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & 16 && t2_value !== (t2_value = ctx2[4].name + ""))
        set_data(t2, t2_value);
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div1, null);
        }
      }
      if (dirty & 16 && a0_href_value !== (a0_href_value = ctx2[4].uri)) {
        attr(a0, "href", a0_href_value);
      }
      if (dirty & 32) {
        toggle_class(a0, "xread", ctx2[5]);
      }
      if (dirty & 32) {
        toggle_class(li0, "disabled", ctx2[5]);
      }
      if (dirty & 24) {
        toggle_class(li2, "disabled", ctx2[4].client_id !== ctx2[3]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(li5);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $sieve, $$unsubscribe_sieve = noop, $$subscribe_sieve = () => ($$unsubscribe_sieve(), $$unsubscribe_sieve = subscribe(sieve, ($$value) => $$invalidate(4, $sieve = $$value)), sieve);
  $$self.$$.on_destroy.push(() => $$unsubscribe_sieve());
  let { sieve } = $$props;
  $$subscribe_sieve();
  let { openAndMarkRead } = $$props;
  let { openChangeHistory } = $$props;
  let { currentClientId } = $$props;
  let id = $sieve.id;
  let isRead = $sieve && sieve.isRead();
  let host = "";
  try {
    host = "//" + new URL($sieve.uri).host;
  } catch (e) {
  }
  const click_handler = (e) => openAndMarkRead(id);
  const click_handler_1 = (e) => sieve.markRead();
  const click_handler_2 = (e) => openChangeHistory(id);
  const click_handler_3 = (e) => serviceProxy.service.checkNow([id]);
  const click_handler_4 = (e) => sieve.moveToTrash();
  $$self.$$set = ($$props2) => {
    if ("sieve" in $$props2)
      $$subscribe_sieve($$invalidate(0, sieve = $$props2.sieve));
    if ("openAndMarkRead" in $$props2)
      $$invalidate(1, openAndMarkRead = $$props2.openAndMarkRead);
    if ("openChangeHistory" in $$props2)
      $$invalidate(2, openChangeHistory = $$props2.openChangeHistory);
    if ("currentClientId" in $$props2)
      $$invalidate(3, currentClientId = $$props2.currentClientId);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 17) {
      {
        $$invalidate(5, isRead = $sieve && sieve.isRead());
      }
    }
  };
  return [
    sieve,
    openAndMarkRead,
    openChangeHistory,
    currentClientId,
    $sieve,
    isRead,
    host,
    id,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4
  ];
}
class PopupSieveItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      sieve: 0,
      openAndMarkRead: 1,
      openChangeHistory: 2,
      currentClientId: 3
    });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[36] = list[i];
  return child_ctx;
}
function create_if_block_2(ctx) {
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      a.textContent = "Enable Monitoring";
      attr(a, "class", "xnav-a error");
      attr(a, "href", "#");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (!mounted) {
        dispose = listen(a, "click", ctx[19]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_1(ctx) {
  let t;
  return {
    c() {
      t = text("Feed not found in page");
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
function create_if_block_1(ctx) {
  let t_value = T("a_monitor_feed") + "";
  let t;
  return {
    c() {
      t = text(t_value);
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
function create_catch_block(ctx) {
  return {
    c: noop,
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
  };
}
function create_then_block(ctx) {
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let current;
  let each_value = ctx[8].models;
  const get_key = (ctx2) => ctx2[36].id;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  let each_1_else = null;
  if (!each_value.length) {
    each_1_else = create_else_block$1(ctx);
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
      if (each_1_else) {
        each_1_else.c();
      }
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      if (each_1_else) {
        each_1_else.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 229636) {
        each_value = ctx2[8].models;
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block, each_1_anchor, get_each_context);
        check_outros();
        if (!each_value.length && each_1_else) {
          each_1_else.p(ctx2, dirty);
        } else if (!each_value.length) {
          each_1_else = create_else_block$1(ctx2);
          each_1_else.c();
          each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
        } else if (each_1_else) {
          each_1_else.d(1);
          each_1_else = null;
        }
      }
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
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
      if (detaching)
        detach(each_1_anchor);
      if (each_1_else)
        each_1_else.d(detaching);
    }
  };
}
function create_else_block$1(ctx) {
  let div;
  let t0_value = T("m_popup_empty") + "";
  let t0;
  let t1;
  let a;
  let t2_value = T("l_get_started") + "";
  let t2;
  let t3;
  let t4;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      a = element("a");
      t2 = text(t2_value);
      t3 = text(" with Web Monitoring");
      t4 = space();
      attr(a, "class", "block");
      attr(a, "href", serviceProxy.CFG.URL.WELCOME);
      attr(div, "class", "p-2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
      append(div, a);
      append(a, t2);
      append(a, t3);
      append(div, t4);
      if (!mounted) {
        dispose = listen(a, "click", ctx[17]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block(key_1, ctx) {
  let first;
  let popupsieveitem;
  let current;
  popupsieveitem = new PopupSieveItem({
    props: {
      currentClientId: ctx[2],
      sieve: ctx[36],
      openAndMarkRead: ctx[15],
      openChangeHistory: ctx[16]
    }
  });
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(popupsieveitem.$$.fragment);
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      mount_component(popupsieveitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const popupsieveitem_changes = {};
      if (dirty[0] & 4)
        popupsieveitem_changes.currentClientId = ctx[2];
      if (dirty[0] & 256)
        popupsieveitem_changes.sieve = ctx[36];
      popupsieveitem.$set(popupsieveitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(popupsieveitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(popupsieveitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(first);
      destroy_component(popupsieveitem, detaching);
    }
  };
}
function create_pending_block(ctx) {
  let t;
  return {
    c() {
      t = text("Loading...");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block$1(ctx) {
  let sievelimit;
  let current;
  sievelimit = new SieveLimit({
    props: {
      count: ctx[5],
      limit: ctx[6],
      openURL: ctx[17]
    }
  });
  return {
    c() {
      create_component(sievelimit.$$.fragment);
    },
    m(target, anchor) {
      mount_component(sievelimit, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const sievelimit_changes = {};
      if (dirty[0] & 32)
        sievelimit_changes.count = ctx2[5];
      if (dirty[0] & 64)
        sievelimit_changes.limit = ctx2[6];
      sievelimit.$set(sievelimit_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(sievelimit.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sievelimit.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(sievelimit, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let div8;
  let div7;
  let div1;
  let watchlistselector;
  let t0;
  let div0;
  let t1;
  let t2;
  let a0;
  let t3_value = T("a_go_to_watchlist") + "";
  let t3;
  let t4;
  let div6;
  let div2;
  let button0;
  let i0;
  let t5;
  let t6_value = T("a_monitor_page_elements") + "";
  let t6;
  let t7;
  let button1;
  let t8;
  let ul0;
  let li0;
  let a1;
  let i1;
  let t9;
  let t10;
  let li1;
  let a2;
  let i2;
  let t11;
  let t12_value = T("a_monitor_page_elements") + "";
  let t12;
  let t13;
  let li2;
  let a3;
  let i3;
  let t14;
  let t15_value = T("a_monitor_page") + "";
  let t15;
  let t16;
  let div3;
  let t17;
  let div5;
  let button2;
  let i4;
  let t18;
  let button3;
  let i5;
  let t19;
  let div4;
  let button4;
  let t20;
  let ul1;
  let li3;
  let a4;
  let t22;
  let li4;
  let a5;
  let t23;
  let t24_value = ctx[3] ? "OFF" : "ON";
  let t24;
  let t25;
  let ul2;
  let t26;
  let if_block2_anchor;
  let current;
  let mounted;
  let dispose;
  watchlistselector = new Selector({
    props: {
      openURL: ctx[17],
      showWatchlist: ctx[0],
      team: ctx[1]
    }
  });
  let if_block0 = !ctx[3] && create_if_block_2(ctx);
  function select_block_type(ctx2, dirty) {
    if (ctx2[7])
      return create_if_block_1;
    return create_else_block_1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block,
    blocks: [, , ,]
  };
  handle_promise(ctx[9].fetchPromise, info);
  let if_block2 = ctx[4] && create_if_block$1(ctx);
  return {
    c() {
      div8 = element("div");
      div7 = element("div");
      div1 = element("div");
      create_component(watchlistselector.$$.fragment);
      t0 = space();
      div0 = element("div");
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      a0 = element("a");
      t3 = text(t3_value);
      t4 = space();
      div6 = element("div");
      div2 = element("div");
      button0 = element("button");
      i0 = element("i");
      t5 = space();
      t6 = text(t6_value);
      t7 = space();
      button1 = element("button");
      t8 = space();
      ul0 = element("ul");
      li0 = element("li");
      a1 = element("a");
      i1 = element("i");
      t9 = space();
      if_block1.c();
      t10 = space();
      li1 = element("li");
      a2 = element("a");
      i2 = element("i");
      t11 = space();
      t12 = text(t12_value);
      t13 = space();
      li2 = element("li");
      a3 = element("a");
      i3 = element("i");
      t14 = space();
      t15 = text(t15_value);
      t16 = space();
      div3 = element("div");
      t17 = space();
      div5 = element("div");
      button2 = element("button");
      i4 = element("i");
      t18 = space();
      button3 = element("button");
      i5 = element("i");
      t19 = space();
      div4 = element("div");
      button4 = element("button");
      t20 = space();
      ul1 = element("ul");
      li3 = element("li");
      a4 = element("a");
      a4.textContent = `${T("a_check_changes_all")}`;
      t22 = space();
      li4 = element("li");
      a5 = element("a");
      t23 = text("Turn local monitoring ");
      t24 = text(t24_value);
      t25 = space();
      ul2 = element("ul");
      info.block.c();
      t26 = space();
      if (if_block2)
        if_block2.c();
      if_block2_anchor = empty();
      attr(div0, "class", "flex-grow");
      attr(a0, "class", "xnav-a");
      attr(a0, "href", serviceProxy.CFG.URL.WATCHLIST);
      attr(div1, "class", "d-flex items-stretch shadow-sm");
      attr(i0, "class", "fa fa-add fa-plus fa-cross mr-2");
      attr(button0, "class", "btn btn-success btn-sm text-left");
      attr(button1, "class", "btn btn-success ml-1 btn-sm dropdown-toggle border-start");
      attr(button1, "data-bs-toggle", "dropdown");
      attr(i1, "class", "fa fa-rss mr-1");
      attr(a1, "href", "#");
      attr(a1, "class", "dropdown-item");
      toggle_class(a1, "disabled", !ctx[7]);
      attr(i2, "class", "fa fa-crop mr-1");
      attr(a2, "href", "#");
      attr(a2, "class", "dropdown-item");
      attr(i3, "class", "fa fa-file-o mr-1");
      attr(a3, "href", "#");
      attr(a3, "class", "dropdown-item");
      attr(ul0, "class", "dropdown-menu");
      attr(div2, "class", "btn-group");
      attr(div3, "class", "flex-grow");
      attr(i4, "class", "fa fa-check");
      attr(button2, "class", "btn btn-default btn-sm");
      attr(button2, "title", T("a_mark_read"));
      attr(i5, "class", "fa fa-external-link");
      attr(button3, "class", "btn btn-default btn-sm");
      attr(button3, "title", T("a_open_unread_in_tab"));
      attr(button4, "class", "btn btn-default btn-sm dropdown-toggle");
      attr(button4, "data-bs-toggle", "dropdown");
      attr(a4, "href", "#");
      attr(a4, "class", "dropdown-item");
      attr(a5, "href", "#");
      attr(a5, "class", "dropdown-item");
      attr(ul1, "class", "dropdown-menu dropdown-menu-right");
      attr(div4, "class", "btn-group");
      attr(div4, "role", "group");
      attr(div5, "class", "btn-group");
      attr(div6, "class", "d-flex align-items-center p-3");
      attr(div7, "class", "bg-gray-100 shadow-sm z-10");
      attr(ul2, "class", "list-group flex-grow overflow-x-hidden");
      attr(div8, "class", "flex flex-column fixed top-0 left-0 right-0 bottom-0");
    },
    m(target, anchor) {
      insert(target, div8, anchor);
      append(div8, div7);
      append(div7, div1);
      mount_component(watchlistselector, div1, null);
      append(div1, t0);
      append(div1, div0);
      append(div1, t1);
      if (if_block0)
        if_block0.m(div1, null);
      append(div1, t2);
      append(div1, a0);
      append(a0, t3);
      append(div7, t4);
      append(div7, div6);
      append(div6, div2);
      append(div2, button0);
      append(button0, i0);
      append(button0, t5);
      append(button0, t6);
      append(div2, t7);
      append(div2, button1);
      append(div2, t8);
      append(div2, ul0);
      append(ul0, li0);
      append(li0, a1);
      append(a1, i1);
      append(a1, t9);
      if_block1.m(a1, null);
      append(ul0, t10);
      append(ul0, li1);
      append(li1, a2);
      append(a2, i2);
      append(a2, t11);
      append(a2, t12);
      append(ul0, t13);
      append(ul0, li2);
      append(li2, a3);
      append(a3, i3);
      append(a3, t14);
      append(a3, t15);
      append(div6, t16);
      append(div6, div3);
      append(div6, t17);
      append(div6, div5);
      append(div5, button2);
      append(button2, i4);
      append(div5, t18);
      append(div5, button3);
      append(button3, i5);
      append(div5, t19);
      append(div5, div4);
      append(div4, button4);
      append(div4, t20);
      append(div4, ul1);
      append(ul1, li3);
      append(li3, a4);
      append(ul1, t22);
      append(ul1, li4);
      append(li4, a5);
      append(a5, t23);
      append(a5, t24);
      append(div8, t25);
      append(div8, ul2);
      info.block.m(ul2, info.anchor = null);
      info.mount = () => ul2;
      info.anchor = null;
      insert(target, t26, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert(target, if_block2_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(a0, "click", ctx[18]),
          listen(button0, "click", ctx[13]),
          listen(a1, "click", ctx[14]),
          listen(a2, "click", ctx[13]),
          listen(a3, "click", ctx[20]),
          listen(button2, "click", ctx[11]),
          listen(button3, "click", ctx[12]),
          listen(a4, "click", ctx[10]),
          listen(a5, "click", ctx[19]),
          action_destroyer(clickInterceptor.call(null, div8))
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const watchlistselector_changes = {};
      if (dirty[0] & 2)
        watchlistselector_changes.team = ctx[1];
      watchlistselector.$set(watchlistselector_changes);
      if (!ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_2(ctx);
          if_block0.c();
          if_block0.m(div1, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
        if_block1.p(ctx, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx);
        if (if_block1) {
          if_block1.c();
          if_block1.m(a1, null);
        }
      }
      if (!current || dirty[0] & 128) {
        toggle_class(a1, "disabled", !ctx[7]);
      }
      if ((!current || dirty[0] & 8) && t24_value !== (t24_value = ctx[3] ? "OFF" : "ON"))
        set_data(t24, t24_value);
      update_await_block_branch(info, ctx, dirty);
      if (ctx[4]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
          if (dirty[0] & 16) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$1(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(watchlistselector.$$.fragment, local);
      transition_in(info.block);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(watchlistselector.$$.fragment, local);
      for (let i = 0; i < 3; i += 1) {
        const block = info.blocks[i];
        transition_out(block);
      }
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div8);
      destroy_component(watchlistselector);
      if (if_block0)
        if_block0.d();
      if_block1.d();
      info.block.d();
      info.token = null;
      info = null;
      if (detaching)
        detach(t26);
      if (if_block2)
        if_block2.d(detaching);
      if (detaching)
        detach(if_block2_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
function preventDefault(e) {
  if (e.target.tagName === "A" && e.target.href) {
    let url = new URL(e.target.href);
    if (url.hash === "") {
      e.preventDefault();
    }
  }
}
function clickInterceptor(el) {
  el.addEventListener("click", preventDefault);
  return {
    destroy() {
      el.removeEventListener("click", preventDefault);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $sieves;
  let { tab } = $$props;
  let { hidePopup: hidePopup2 } = $$props;
  let labels = getContext("labels");
  getContext("user");
  let identityId;
  let currentClientId;
  const SCRIPT_NFEED = `document.querySelectorAll('[type="application/rss+xml"],[type="application/atom+xml"]').length`;
  createEventDispatcher();
  const pConstraint = checkSieveConstraint(1);
  let isActive;
  let isOverLimit = false;
  let count = 0;
  let limit = 5;
  let hasFeed = false;
  let loader;
  const sieves = new Model.Sieves(
    null,
    {
      comparator: (model) => {
        return -new Date(model.get("ts_data"));
      }
    }
  );
  component_subscribe($$self, sieves, (value) => $$invalidate(8, $sieves = value));
  fetchCurrentClientId();
  fetchAll();
  onMount(async () => {
    window.onunload = destroy;
    $$invalidate(3, isActive = await serviceProxy.isActive());
    if (!/^http/.exec(tab.url)) {
      return;
    }
    findFeeds();
    loader = await serviceProxy.createLoader({
      type: "tab",
      info: { tabId: tab.id },
      pageMods: ["locator"]
    });
  });
  async function close2() {
    await destroy();
    hidePopup2();
  }
  async function destroy() {
    loader && await loader.destroy();
  }
  onDestroy(async () => {
    loader && await loader.destroy();
    loader = null;
    $$invalidate(21, tab = null);
  });
  async function checkAllForChanges() {
    let res = await serviceProxy.store.SieveStore.find({ state: 40, client_id: currentClientId }, { only: ["id"], limit: 1e3 });
    await serviceProxy.service.checkNow(_.pluck(res.data, "id"));
    _.delay(checkWorkerState, 2e3);
    async function checkWorkerState() {
      if (await serviceProxy.Scheduler.isBusy()) {
        _.delay(checkWorkerState, 2e3);
      }
    }
  }
  async function checkIfCanAdd() {
    let constraint;
    try {
      constraint = await pConstraint;
    } catch (e) {
      console.error(e);
      constraint = { isOverLimit: false };
    }
    $$invalidate(4, isOverLimit = constraint.isOverLimit);
    $$invalidate(5, count = constraint.count);
    $$invalidate(6, limit = constraint.limit);
    return !isOverLimit;
  }
  function findFeeds() {
    try {
      chrome.tabs.executeScript(tab.id, { allFrames: false, code: SCRIPT_NFEED }, function(results) {
        $$invalidate(7, hasFeed = results && results[0] > 0);
      });
    } catch (e) {
    }
  }
  async function fetchCurrentClientId() {
    $$invalidate(2, currentClientId = await serviceProxy.store.Prefs.get("client.id"));
  }
  function fetchAll() {
    return Promise.all([
      labels.fetch(),
      sieves.fetch({
        data: {
          "state.in": [40, 45],
          _opt: {
            limit: 40,
            order: ["-ts_data"],
            only: [
              "id",
              "name",
              "uri",
              "tags",
              "text",
              "ts_data",
              "ts_view",
              "err",
              "client_id"
            ]
          }
        }
      })
    ]);
  }
  async function markAllRead() {
    for (let sieve of sieves.models) {
      await sieve.markRead();
    }
  }
  async function openAllAndMarkRead() {
    await sieves.fetch({
      data: {
        "state.in": [40, 45],
        "ts_view.lt": { type: "field", name: "ts_data" },
        _opt: { order: ["-ts_data"], only: ["id", "uri"] }
      }
    });
    for (let sieve of sieves.models) {
      await sieve.markRead();
      await serviceProxy.service.showURL(sieve.get("uri"), { openInBlank: false });
    }
    close2();
  }
  async function openElementSelector() {
    if (await checkIfCanAdd()) {
      close2();
      serviceProxy.openSelector({ identityId });
    }
  }
  async function openFeedSelector() {
    if (await checkIfCanAdd()) {
      try {
        await serviceProxy.addFeedForTab({ identityId });
        _.delay(close2, 50);
      } catch (e) {
        alert(e.msg || e.message);
      }
    }
  }
  async function openAndMarkRead(id) {
    let sieve = sieves.get(id);
    await serviceProxy.service.showURL(sieve.get("uri"));
    await sieve.markRead();
    close2();
  }
  async function openChangeHistory(id) {
    await serviceProxy.service.showInInbox(id, identityId);
    close2();
  }
  function openURL(e) {
    e.preventDefault();
    chrome.tabs.create({ url: e.target.href }, close2);
  }
  async function gotoWatchlist() {
    await serviceProxy.service.showWatchlist(identityId);
    close2();
  }
  function showMinilist(_iid) {
    $$invalidate(1, identityId = _iid);
    Api.setIdentityId(identityId);
    fetchAll();
  }
  async function toggleService(btn) {
    await serviceProxy.service.toggleService();
    $$invalidate(3, isActive = await serviceProxy.isActive());
  }
  async function watchTab() {
    if (await checkIfCanAdd()) {
      close2();
      await serviceProxy.watchTab({ identityId });
    }
  }
  $$self.$$set = ($$props2) => {
    if ("tab" in $$props2)
      $$invalidate(21, tab = $$props2.tab);
    if ("hidePopup" in $$props2)
      $$invalidate(22, hidePopup2 = $$props2.hidePopup);
  };
  return [
    showMinilist,
    identityId,
    currentClientId,
    isActive,
    isOverLimit,
    count,
    limit,
    hasFeed,
    $sieves,
    sieves,
    checkAllForChanges,
    markAllRead,
    openAllAndMarkRead,
    openElementSelector,
    openFeedSelector,
    openAndMarkRead,
    openChangeHistory,
    openURL,
    gotoWatchlist,
    toggleService,
    watchTab,
    tab,
    hidePopup2
  ];
}
class Popup extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { tab: 21, hidePopup: 22, showMinilist: 0 }, null, [-1, -1]);
  }
  get showMinilist() {
    return this.$$.ctx[0];
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
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block(ctx) {
  let router;
  let current;
  router = new Router({ props: { routes: ctx[2] } });
  router.$on("routeLoaded", ctx[3]);
  return {
    c() {
      create_component(router.$$.fragment);
    },
    m(target, anchor) {
      mount_component(router, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const router_changes = {};
      if (dirty & 4)
        router_changes.routes = ctx2[2];
      router.$set(router_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(router.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(router.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(router, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let t2;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
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
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span class="xmsg">Loading</span> 
  <span style="display:none;" class="xerror"></span>`;
      t2 = space();
      if_block.c();
      if_block_anchor = empty();
      attr(div, "class", "container-fluid xmsgbox");
      set_style(div, "width", "100%");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      ctx[6](div);
      insert(target, t2, anchor);
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
      if (detaching)
        detach(div);
      ctx[6](null);
      if (detaching)
        detach(t2);
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function hidePopup() {
  close();
}
function instance($$self, $$props, $$invalidate) {
  let { labels = new ModelLabel.Labels() } = $$props;
  let { user = new Self() } = $$props;
  let tab;
  let loaded = false;
  let elMsg;
  let routes;
  if (get_store_value(location) === "/") {
    replace("/w/0/list/all");
  }
  setContext("api", Api.api);
  setContext("labels", labels);
  setContext("user", user);
  onMount(async () => {
    Msg.bind(elMsg);
    await syncUser();
    if (!await serviceProxy.auth.isReady()) {
      showLogin();
    }
    chrome.tabs.query({ currentWindow: true, active: true }, ([_tab]) => {
      tab = _tab;
      $$invalidate(2, routes = {
        "/w/:team/:module/:prefix": wrap({
          component: Popup,
          props: { tab, hidePopup }
        })
      });
      $$invalidate(0, loaded = true);
    });
  });
  async function routeLoaded(event) {
    var _a, _b, _c, _d;
    const team = (_c = (_b = (_a = event.detail) == null ? void 0 : _a.params) == null ? void 0 : _b.team) != null ? _c : "0";
    const routeName = (_d = event.detail) == null ? void 0 : _d.route;
    updateTeam(team);
    updateRoute(routeName);
  }
  async function syncUser() {
    let tUser = await serviceProxy.store.UserStore.findOne({ id: await serviceProxy.auth.getId() });
    tUser && user.fetch().catch(async (e) => {
      console.error("syncing user", e);
      tUser && user.set(tUser);
    });
    labels.fetch();
    let locale = tUser ? tUser.locale : await serviceProxy.store.Prefs.get("locale");
    await loadLang(locale || "en-US");
  }
  async function showLogin() {
    chrome.tabs.query({ url: serviceProxy.CFG.URL.AUTH + "/*" }, async ([tab2, ...rest]) => {
      let url = serviceProxy.CFG.URL.LOGIN;
      if (tab2) {
        chrome.tabs.update(tab2.id, { active: true, url });
      } else {
        chrome.tabs.create({ url });
      }
      hidePopup();
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      elMsg = $$value;
      $$invalidate(1, elMsg);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("labels" in $$props2)
      $$invalidate(4, labels = $$props2.labels);
    if ("user" in $$props2)
      $$invalidate(5, user = $$props2.user);
  };
  return [loaded, elMsg, routes, routeLoaded, labels, user, div_binding];
}
class AppPopup extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { labels: 4, user: 5 });
  }
  get labels() {
    return this.$$.ctx[4];
  }
  set labels(labels) {
    this.$$set({ labels });
    flush();
  }
  get user() {
    return this.$$.ctx[5];
  }
  set user(user) {
    this.$$set({ user });
    flush();
  }
}
export { AppPopup as default };
