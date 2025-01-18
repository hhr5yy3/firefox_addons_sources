var Xt = Object.defineProperty;
var Wt = (o, t, e) => t in o ? Xt(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var A = (o, t, e) => Wt(o, typeof t != "symbol" ? t + "" : t, e);
import { I as Zt } from "./esm-index-C1muFETj.js";
const Et = {
  CLICK: "click",
  SUBMIT: "submit",
  REQUEST: "request"
}, l = {
  UNAVAILABLE: "unavailable",
  STOP: "stop",
  SUCCESS: "success",
  FAIL: "fail",
  PAUSE: "pause",
  PROCESS: "process",
  INIT: "init",
  STARTING: "starting",
  FINISHING: "finishing",
  RESTORING: "restoring"
}, te = {
  REMOVING: "removing",
  APPLYING: "applying"
}, L = {
  PRERUN: "PRERUN",
  RUN: "RUN",
  POSTRUN: "POSTRUN",
  RESULT: "RESULT"
}, W = [
  "get",
  "head",
  "post",
  "delete",
  "options",
  "put",
  "patch",
  "trace"
], G = {
  APPLY_COUPON: "applyCoupon",
  REMOVE_COUPON: "removeCoupon",
  UNLOCK: "unlock"
}, j = [
  "couponAdded",
  "hasAppliedCoupon",
  "couponsCleared"
];
function ee(o) {
  return o.nodeType === Node.DOCUMENT_FRAGMENT_NODE || o.nodeType === Node.DOCUMENT_NODE;
}
function ut(o, t) {
  const e = o.parentNode;
  return e && e.host && e.nodeType === 11 ? e.host : e === t ? null : e;
}
function se(o, t, e) {
  return (s) => {
    let i = t, n = s, r = !1;
    for (; n && !ee(n); ) {
      let a = !0;
      if (o[i].length === 1)
        a = n.matches(o[i]);
      else {
        const c = [].concat(o[i]).reverse();
        let u = n;
        for (const p of c) {
          if (!u || !u.matches(p)) {
            a = !1;
            break;
          }
          u = ut(u, e);
        }
      }
      if (a && i === 0) {
        r = !0;
        break;
      }
      a && (i -= 1), n = ut(n, e);
    }
    return r;
  };
}
function Y(o, t) {
  return o.match(/\\?.|^$/g).reduce((e, s) => (s === '"' && !e.sQuote ? (e.quote ^= 1, e.a[e.a.length - 1] += s) : s === "'" && !e.quote ? (e.sQuote ^= 1, e.a[e.a.length - 1] += s) : !e.quote && !e.sQuote && s === t ? e.a.push("") : e.a[e.a.length - 1] += s, e), { a: [""] }).a;
}
function oe(o = null, t, e = null) {
  let s = [];
  if (e)
    s = e;
  else {
    const i = function(n) {
      for (let r = 0; r < n.length; r++) {
        const a = n[r];
        s.push(a), a.shadowRoot && i(a.shadowRoot.querySelectorAll("*"));
      }
    };
    t.shadowRoot && i(t.shadowRoot.querySelectorAll("*")), i(t.querySelectorAll("*"));
  }
  return o ? s.filter((i) => i.matches(o)) : s;
}
function ie(o, t, e, s = null) {
  return e.querySelector(o), !document.head.createShadowRoot && !document.head.attachShadow ? e.querySelectorAll(o) : Y(o, ",").reduce((i, n) => {
    const r = Y(n.replace(/^\s+/g, "").replace(/\s*([>+~]+)\s*/g, "$1"), " ").filter((d) => !!d).map((d) => Y(d, ">")), a = r.length - 1, c = r[a][r[a].length - 1], u = oe(c, e, s), p = se(r, a, e);
    return i = i.concat(u.filter(p)), i;
  }, []);
}
function Z(o, t = document, e = null) {
  return ie(o, !0, t, e);
}
const ne = {
  Error: "Error",
  Ok: "Ok"
}, h = (o, ...t) => {
  sessionStorage.debug && console[o](...t);
}, P = (o) => new Promise((t) => setTimeout(t, o)), x = (o, t = {}) => {
  const {
    from: e,
    to: s,
    match: i,
    matchIndex: n = 0,
    flags: r = "i"
  } = t;
  if (!o)
    return o;
  let a = `${o}`;
  if (i)
    try {
      const c = new RegExp(i, r), u = a.match(c);
      u && u[n] && (a = u[n]);
    } catch (c) {
      h("log", "error in transformByRx", t, c);
    }
  if (e && s)
    try {
      const c = new RegExp(e, "gi");
      a = a.replace(c, s);
    } catch (c) {
      h("log", "error in transformByRx", t, c);
    }
  return a;
}, M = (o) => JSON.parse(sessionStorage.getItem(o)), pt = (o, t) => sessionStorage.getItem(`CAA-${t}`) ? JSON.parse(sessionStorage.getItem(`CAA-${t}`))[o] : null, _ = (o) => {
  if (!o)
    return !0;
  const t = global.getComputedStyle(o);
  return t.display === "none" || o.getAttribute("type") === "hidden" || o.clientHeight === 0 && o.clientWidth === 0 || t.opacity === 0 || t.visibility === "hidden" || (o.parentElement ? _(o.parentElement) : !1);
}, re = (o, t) => {
  if (!o)
    return !0;
  const e = t.replace(/['"]/g, "");
  return o.innerText.includes(e) || o.innerHTML.includes(e);
}, H = (o) => o && o.selector || o || null, O = (o, t = document) => {
  const e = H(o);
  if (!e)
    return [];
  const s = (a) => ["first", "visible", "last", "contains"].includes(a), i = {}, n = e.replace(/:([-a-z]+)(?:\((.*)\))?/, (a, c, u) => s(c) ? (i[c] = u === void 0 ? !0 : u, "") : a), r = Array.from(Z(n, t));
  return i.visible ? r.filter((a) => !_(a)) : i.first ? r.slice(0, 1) : i.last ? r.slice(r.length - 1, r.length) : i.contains ? r.filter((a) => re(a, i.contains)) : r;
}, y = (o, t = "", e = document) => {
  if (!o)
    return null;
  const s = o.replace(/%promo/, t && t.code || ""), i = O(s, e);
  return i && i.length > 0 ? i[0] : null;
}, ae = (o = []) => {
  for (const t of [].concat(o))
    sessionStorage.removeItem(t);
}, tt = ({ type: o, key: t }, e) => {
  let s = null;
  const i = {
    bubbles: !0,
    cancelable: !0,
    view: window,
    ctrlKey: !1,
    altKey: !1,
    shiftKey: !1,
    metaKey: !1
  }, n = [
    "click",
    "dblclick",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "scroll"
  ], r = ["keydown", "keypress", "keyup", "focusin"], a = ["change", "focus", "blur", "select", "submit", "input"];
  if (n.includes(o)) {
    const c = {
      detail: 1,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      button: 0,
      relatedTarget: null
    };
    s = new MouseEvent(o, Object.assign(c, i));
  } else if (r.includes(o)) {
    const c = {
      key: t,
      code: 0
    };
    s = new KeyboardEvent(o, Object.assign(c, i));
  } else
    a.includes(o) && (s = document.createEvent("HTMLEvents"), s.initEvent(o, !0, !0));
  e.dispatchEvent(s);
};
function et(o) {
  const t = document.cookie.match(
    new RegExp(`(?:^|; )${o.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`)
  );
  return t ? t[1] : void 0;
}
const C = (o, t) => {
  if (!o)
    return o;
  let e = `${o}`;
  e.toString().includes(",") && !e.toString().includes(".") && (e = e.toString().replace(",", ".")), t && (e = x(e, t)), e = e.replace(/^\$|^€/gim, "").replace("€", "").replace("$", "").replace(/[.,]+$/, "").replace(/[^\d.,\n]/gim, "").replace(/\n/gim, "").trim(), e = e.substr(e.length - 3).match(/,|\./g) ? e : e.replace(/,|\./g, "");
  const s = e.indexOf(","), i = e.indexOf(".");
  return s > i ? e = e.replace(".", "").replace(",", ".") : (s < i || i < 0) && (e = e.replace(",", "")), parseFloat(e) || void 0;
}, ot = (o, t, e) => {
  const s = (n) => {
    const r = [" & ", ", PIN: "].find((a) => n.indexOf(a) > 0);
    return r ? n.split(r)[0] : n;
  }, i = /^%\w+$/;
  if (o && typeof o == "string") {
    let n = `${o}`;
    if (Array.isArray(e) && e.length)
      for (const { key: r, value: a } of e)
        if (i.test(r)) {
          const c = new RegExp(r, "g");
          n = n.replace(c, a);
        } else
          for (let c = -1; n.includes(r) && n.lastIndexOf(r) > c; )
            c = n.indexOf(r), n = n.replace(r, a);
    for (const r of Object.keys(document.location))
      if (typeof document.location[r] == "string") {
        const a = new RegExp(`%${r}`, "g");
        n = n.replace(a, document.location[r]);
      }
    return n.replace(/%promo/g, t || "").replace(/%pin/g, s(t || "")).replace(/%timestamp/g, Date.now().toString());
  }
  if (o && typeof o == "object") {
    const n = JSON.parse(JSON.stringify(o));
    return Object.keys(n).reduce((r, a) => ({
      ...r,
      [a]: ot(n[a], t, e)
    }), {});
  }
  return o;
}, w = (o = "") => new DOMParser().parseFromString(o, "text/html"), f = (o = {}, t = document.body) => {
  h("log", "getAmount()", o);
  let e = t;
  if (!o)
    return h("error", {
      result: ne.Error,
      message: "rule is not found",
      functionName: "getAmount()"
    }), !1;
  if (typeof e == "string" && (e = w(e)), typeof o == "string") {
    const s = y(o, "", e);
    return h("log", "node", s, s && s.innerText), s && C(s.innerText);
  }
  if (typeof o == "object") {
    const { from: s, to: i, match: n } = o, r = (s && i || n) && o;
    if (o.rx) {
      const a = new RegExp(o.rx, "g"), c = String(e).trim(), u = [];
      let p = a.exec(c);
      for (; p !== null; )
        u.push(p[1]), p = a.exec(c);
      if (u.length)
        return C(u.length === 1 ? u[0] : u, r);
    }
    if (o.path || o.field) {
      const a = (o.path || o.field).split(".");
      let c = e;
      for (; a.length > 0; )
        c = c[a.shift()];
      return C(c, r);
    }
    if (o.selector) {
      const a = y(o.selector, "", e);
      return a ? C(a.innerText, r) : 0;
    }
    if (r && typeof t == "string")
      return C(t, r);
  }
  return 0;
}, st = ({ waitFor: o, waitUntil: t }) => {
  const e = Array.isArray(o) ? o : [o], s = Array.isArray(t) ? t : [t], i = e.map((a) => y(a)), n = s.map((a) => y(a));
  let r = !1;
  if (o) {
    let a = !1;
    for (const c of i)
      if (!_(c)) {
        a = !0;
        break;
      }
    r = a;
  }
  if (t && !r) {
    let a = !1;
    for (const c of n)
      if (_(c))
        a = !0;
      else {
        a = !1;
        break;
      }
    r = a;
  }
  return r;
}, ce = ({
  waitFor: o,
  waitUntil: t,
  total: e,
  totalAmount: s
}, i) => {
  const n = document.body;
  return new Promise((r) => {
    if (st({ waitFor: o, waitUntil: t }))
      r(!0);
    else {
      const a = new MutationObserver(() => {
        let c = !1;
        const u = f(e);
        c = u && u !== s;
        const p = st({ waitFor: o, waitUntil: t });
        (!i && c || p) && (a.disconnect(), r(!0));
      });
      a.observe(n, {
        attributes: !0,
        childList: !0,
        subtree: !0
      }), setTimeout(() => {
        a.disconnect(), r(!0);
      }, i || i === 0 ? i : 5e3);
    }
  });
}, ue = () => {
  const o = /* @__PURE__ */ new Map(), t = [
    "alert",
    "confirm",
    "prompt"
  ];
  for (const e of t)
    o.set(e, window[e]), Object.defineProperty(window, e, {
      value: console.log,
      writable: !0,
      configurable: !0
    });
  return () => {
    for (const e of o.keys())
      window[e] = o.get(e);
  };
}, it = (o) => o && o.parentNode ? it(o.parentNode) : o, pe = (o, t = document.documentElement) => {
  if (!t || !o)
    throw new Error("no selector or no target in getNestedElementFromNode");
  if (t instanceof HTMLDocument || t instanceof HTMLHtmlElement) {
    const i = O(o, t);
    if (!i || !i.length)
      throw new Error("couldn't find element by selector");
    return i;
  }
  if (!(t instanceof HTMLElement))
    throw new Error("target isn't html element in getNestedElementFromNode");
  const e = it(t), s = O(o, e).filter((i) => t.contains(i));
  if (!s || !s.length)
    throw new Error("couldn't find element by selector");
  return s;
}, lt = (o, t = document.documentElement) => pe(o, t)[0], xt = (o, t) => {
  try {
    return lt(o, t);
  } catch {
    const e = it(t);
    return lt(o, e);
  }
}, U = (o, t = document) => {
  if (!o)
    throw new Error("no config");
  if (typeof o == "string")
    return U({ selector: o }, t);
  const { selector: e, attribute: s } = o;
  let i;
  try {
    i = xt(e, t);
  } catch {
    i = y(e);
  }
  if (!i)
    throw new Error(`can't get element. selector: ${e}`);
  if (s)
    return s === "innerText" ? i.innerText : i.getAttribute(s);
  switch (i.tagName) {
    case "A":
      return i.getAttribute("href");
    case "INPUT":
      return i.getAttribute("value");
    default:
      return i.innerText || i.content || i.value;
  }
}, Rt = (o, t = document) => typeof o == "object" ? U(o, t) : o, Pt = (o) => W.includes(o), le = async () => {
  const o = await (await fetch(location.href)).text();
  return w(o);
}, V = ({ remove: o, apply: t }) => {
  if (!o || !t)
    return !1;
  const e = [].concat(o), s = [].concat(t), i = e.find(({ url: a }) => typeof a == "object"), n = s[s.length - 1].type.toLowerCase(), r = Pt(n) || n === "submit";
  return i && r;
}, S = (o, t, e = "//") => t.split(e).reduce((s, i) => s && s[i], o);
async function It() {
  return /(comp|inter|loaded)/.test(document.readyState) ? Promise.resolve() : new Promise((o) => document.addEventListener("DOMContentLoaded", o));
}
const he = (o) => {
  const t = window.location.href;
  return (o || []).find(({ url: e }) => {
    const s = Array.isArray(e) ? e : [e];
    let i = !1;
    try {
      i = !!s.find((n) => {
        const r = new RegExp(n, "ig");
        return t.indexOf(n) >= 0 || r.test(t);
      });
    } catch {
      i = !1;
    }
    return i;
  });
}, de = ({ controls: o, requiredFields: t = [] }) => [
  ...t,
  H(o.total)
  // TODO: implement checking for input or it's replacement
  // getSelector(controls.promo),
].every((e) => y(e)), Nt = (o = {}) => new Promise((t, e) => {
  const { controls: s, requiredFields: i = [] } = o;
  if (!s)
    e();
  else {
    const n = setInterval(() => {
      de({ controls: s, requiredFields: i }) && (clearInterval(n), t());
    }, 300);
  }
}), fe = (o, t, e) => e.length ? !!e.find((s) => s[t] === o) : e[t] === o, ge = (o = []) => {
  const t = [];
  for (const e of o) {
    if (!e || !e.params || !e.params.length)
      continue;
    let s = localStorage.getItem(e.name);
    if (s) {
      e.type === "json" && (s = JSON.parse(s));
      for (const { path: i, key: n } of e.params) {
        let r = null;
        if (i) {
          const a = S(s, i);
          a && (r = {
            key: n,
            value: a
          });
        } else
          r = {
            key: n,
            value: s
          };
        r && t.push(r);
      }
    }
  }
  return t;
}, ve = (o, t, { endTimeout: e, intervalTimeout: s } = {}) => {
  const i = document.createElement("script"), n = `pageData_${Math.random().toFixed(2) * 1e3}`;
  return i.textContent = o.replace(/%key/gim, n), document.head.appendChild(i), new Promise((r) => {
    let a;
    const c = setInterval(() => {
      if (sessionStorage[n]) {
        const u = JSON.stringify(sessionStorage[n] || {});
        a && clearTimeout(a), clearInterval(c), delete sessionStorage[n], document.head.removeChild(i), r(u);
      }
    }, s || 500);
    a = setTimeout(() => {
      c && clearInterval(c), delete sessionStorage[n], document.head.removeChild(i), r(!1);
    }, e || 4e3);
  });
}, Lt = (o) => {
  const t = `sessionStorage.%key = JSON.stringify(window.${o});`;
  return ve(t);
}, me = async (o, t = document) => {
  if (!o || !o.length)
    return {};
  const e = {};
  for (const s of o) {
    if (s.selector)
      try {
        const i = U(s, t);
        i && (e[s.key] = i);
      } catch {
      }
    if (s.variable) {
      const i = await Lt(s.variable);
      if (i)
        try {
          if (e[s.key] = JSON.parse(i), typeof e[s.key] == "string")
            try {
              e[s.key] = JSON.parse(e[s.key]);
            } catch (n) {
              h("log", "error", n);
            }
        } catch (n) {
          h("log", "catch parse variable", n), e[s.key] = i;
        }
    }
  }
  return e;
}, ht = (o, t) => o ? typeof o == "string" ? o : { ...t, ...o } : "", Ut = (o, t = document) => {
  if (!o)
    throw new Error("no config");
  return x(U(o, t), o);
}, q = (o, t, e = document) => {
  if (!o)
    throw new Error("no config in checkCouponSuccess");
  const s = Ut(o, e);
  return o.extractable || o.from ? s.toLowerCase() === t.toLowerCase() : !!s;
}, Ce = async ({
  coupon: o,
  response: t,
  previousCouponPrice: e,
  xhr: s,
  action: i,
  total: n
}) => {
  let r;
  const a = i, c = {
    code: o.code,
    total: e
  };
  if (s ? r = Promise.resolve(t) : r = await t.text(), a.response.discount ? (c.discount = f(
    a.response.discount,
    r
  ), c.total = n - c.discount) : (c.total = f(
    a.response.total,
    r
  ), c.discount = parseFloat((n - c.total).toFixed(2))), c.wasValidated = !1, i.couponValidation) {
    const u = i.couponValidation;
    if (u)
      try {
        const p = w(r), d = q(u, c.code, p);
        c.wasValidated = d, c.invalidated = !d;
      } catch {
        c.invalidated = !0;
      }
  }
  return c;
}, ye = async ({
  coupon: o,
  response: t,
  action: e,
  total: s,
  previousCouponPrice: i
}) => {
  let n = await t.clone().json();
  const r = e, a = { ...o };
  let c = s, u = null, p = null;
  if (r.response.findProperty) {
    const {
      path: d,
      fieldValue: g,
      field: m,
      errorValidation: b
    } = r.response.findProperty;
    n[b] ? n = { amount: s } : n = S(n, d).find(
      (E) => {
        const k = S(E, m);
        return k === g || k === ot(g, o.code);
      }
    );
  }
  if (r.response.path)
    if (r.response.selector) {
      const d = S(
        n,
        r.response.path
      );
      if (d && r.response.selector) {
        const g = w(d);
        c = f(r.response.selector, g) || s;
      }
    } else
      c = C(
        S(n, r.response.path),
        r.response
      ) || s;
  else
    c = s;
  if (r.response.total && (c = C(
    S(n, r.response.total) || s,
    r.response
  )), c && c < s && (u = s - c), r.response.discount)
    if (typeof r.response.discount == "string")
      u = S(
        n,
        r.response.discount
      );
    else {
      const { type: d } = r.response.discount;
      (!d || d && d === "number") && (u = S(
        n,
        r.response.discount.path
      )), u && (u = C(u, r.response.discount));
    }
  return u || (u = s - c, i && Number(i) === c && (u = 0)), r.couponValidation ? (p = S(
    n,
    r.couponValidation.path
  ), fe(
    a.code,
    r.couponValidation.field,
    p
  ) ? (a.wasValidated = !0, a.invalidated = !1) : (a.total = s, a.discount = 0, a.wasValidated = !1, a.invalidated = !0, r.success = !1, h("log", `coupon ${a.code} hasn't passed validation`))) : a.wasValidated = !1, a.total = c, a.discount = u, a;
}, be = async ({
  coupon: o,
  response: t,
  xhr: e,
  action: s,
  previousCouponPrice: i,
  config: n,
  total: r,
  cacheResponse: a
}) => {
  let c;
  const u = s, p = { ...o };
  e ? c = Promise.resolve(t) : c = await t.text(), u.response.discount ? (p.discount = f(u.response.discount, c), p.total = r - p.discount, p.hasGift = !!f(u.response.gift, c)) : (p.total = f(u.response.total, c), p.hasGift = !!f(u.response.gift, c), i && Number(i) === p.total && (!n.remove || n.stack) ? p.discount = 0 : p.discount = parseFloat((r - p.total).toFixed(2)));
  const d = w(c);
  a && (p.htmlCache = d);
  const g = s.couponValidation;
  if (g)
    try {
      const m = q(g, p.code, d);
      p.wasValidated = m, p.invalidated = !m;
    } catch {
      p.invalidated = !0, h("log", "not validated");
    }
  return p;
}, Se = (o) => !!document.querySelector(o), we = ({ doc: o = document, controls: t, code: e }) => {
  if (!t)
    return null;
  const [s, i] = [t.total, t.discount].map((r) => f(r, o) || 0), n = t.gift ? Se(t.gift) : !1;
  return {
    total: s,
    discount: i,
    code: e,
    hasGift: n
  };
}, dt = (o) => ({ giftCoupons: o.filter(({ hasGift: t }) => t) }), Ae = (o, t = {}, e, s, i) => {
  const n = w(o), { controls: r } = e, a = f(r.total, n), c = f(t.discount, n) || f(r.discount, n);
  return {
    total: a || i,
    discount: c || 0,
    code: s
  };
}, Te = async ({
  coupon: o,
  response: t,
  action: e,
  xhr: s,
  previousCouponPrice: i,
  total: n,
  config: r,
  cacheResponse: a
}) => {
  let c = { ...o };
  if (!t || !t.status || t.status >= 300 || !e.response || !o)
    return h("log", "error", "Response status is not ok", t.status, t), {
      ...c,
      total: n,
      discount: 0,
      invalidated: !0
    };
  const u = e.response && e.response.type;
  if (u)
    switch (u) {
      case "string":
        c = await Ce({
          coupon: o,
          response: t,
          xhr: s,
          action: e,
          previousCouponPrice: i,
          total: n
        }), h("log", "parsedCoupon string", c);
        break;
      case "json":
        c = await ye({
          coupon: o,
          response: t,
          action: e,
          previousCouponPrice: i,
          total: n
        }), h("log", "parsedCoupon json", c);
        break;
      case "html":
        c = await be({
          coupon: o,
          response: t,
          xhr: s,
          action: e,
          previousCouponPrice: i,
          config: r,
          total: n,
          cacheResponse: a
        }), h("log", "parsedCoupon html", c);
        break;
      default:
        if (c.total = f(r.controls.total), i && Number(i) === c.total && (!r.remove || !r.remove.length) ? c.discount = 0 : c.discount = parseFloat(
          (n - c.total).toFixed(2)
        ), r.controls.errorMessage && (Number(c.discount) || 0) === 0) {
          const p = y(r.controls.errorMessage);
          h("log", "errorMessage", p), p && (c.errorMessage = p.innerText);
        }
        break;
    }
  return c;
}, ft = (o) => {
  let t = 0, e = -1;
  return o.forEach(({ discount: s, success: i }, n) => {
    s > t && (t = s, e = n), !t && i && e < 0 && (e = n);
  }), e > -1 ? {
    status: l.SUCCESS,
    bestIndex: e,
    savings: parseFloat(t)
  } : {
    status: l.FAIL
  };
}, Oe = async (o = [], t = document) => {
  const e = [], s = new URLSearchParams(document.location.href);
  for (const i of o) {
    const {
      key: n,
      selector: r,
      attribute: a,
      variable: c,
      cookie: u,
      queryParam: p,
      urlPart: d
    } = i;
    if (r)
      try {
        const g = U({ attribute: a, selector: r }, t);
        e.push({ key: n, value: x(g, i) });
      } catch {
      }
    else {
      if (c) {
        const g = await Lt(c);
        if (g) {
          let m;
          try {
            if (m = JSON.parse(g) || g, typeof m == "string")
              try {
                m = JSON.parse(m) || m;
              } catch (b) {
                h("log", "error", b);
              }
          } catch (b) {
            h("log", "catch parse variable", b), m = g;
          }
          e.push({ key: n, value: x(m, i) });
        }
      }
      if (u) {
        const g = x(et(u), i);
        g && e.push({
          key: n,
          value: g
        });
      }
      if (p) {
        const g = s.get(p);
        g && e.push({
          key: n,
          value: g
        });
      }
      if (d) {
        const g = x(location[d], i);
        e.push({
          key: n,
          value: g
        });
      }
    }
  }
  return e;
}, ke = (o, t) => {
  let e = 0;
  const s = [];
  for (const {
    discount: i,
    total: n,
    code: r,
    success: a
  } of o) {
    let c = i;
    !c && n && n < t && (c = t - n), (c || a) && (e += c, s.push({
      discount: i,
      total: n,
      code: r,
      success: a
    }));
  }
  return {
    savings: e,
    successCoupons: s,
    status: s.length ? l.SUCCESS : l.FAIL
  };
}, Ee = (o, t, {
  stack: e,
  previousCouponPrice: s,
  previousDiscount: i = 0
}) => {
  const {
    discount: n,
    total: r,
    code: a,
    wasValidated: c,
    invalidated: u,
    hasGift: p
  } = o;
  if (!e) {
    const b = t > r ? t - r : 0, E = Math.max(b, n), k = E > 0 ? E : 0;
    return {
      code: a,
      discount: u ? 0 : k,
      success: !u && !!(k || c),
      wasValidated: c,
      hasGift: p
    };
  }
  const d = r < s ? s - r : 0, g = i < n ? n - i : 0, m = Math.max(d, g, 0);
  return {
    code: a,
    discount: u ? 0 : m,
    success: !u && !!(m || c),
    wasValidated: c,
    hasGift: p
  };
}, Dt = (o, t, e = void 0) => {
  const s = y(t);
  if (!t || !s)
    throw new Error(`no element found for selector: ${t}`);
  return tt({ type: "focus" }, s), s.value = o, s.setAttribute("value", o), (e || ["change", "input", "keyup"]).forEach((i) => tt({ type: i }, s)), P(0);
}, Ft = (o, t, e = {}) => {
  const { leading: s } = e;
  let i = s ? 0 : Date.now(), n, r;
  const a = (...c) => {
    i + t > Date.now() ? (n && clearTimeout(n), r = c, n = setTimeout(() => {
      a(...c);
    }, i + t - Date.now())) : (i = Date.now(), o(...c));
  };
  return a.force = () => {
    i = Date.now(), n && clearTimeout(n), o(...r);
  }, a;
}, xe = (o) => {
  const { status: t, timeStamp: e } = o || {};
  return !!(e && e + 3e4 > Date.now() && t);
}, Re = (o) => {
  const t = [];
  for (const e of o)
    e.code && !t.find(({ code: s }) => e.code === s) && t.push(e);
  return t;
}, jt = (o, t) => async (...e) => {
  try {
    await o();
  } catch (i) {
    h("error", "error awaiting pause", i);
  }
  const s = await t(...e);
  try {
    await o();
  } catch (i) {
    h("error", "error awaiting pause", i);
  }
  return s;
};
class nt {
  constructor() {
    this.getState = this.getState.bind(this), this.setSteps([]), this.state = !1, this.isRunning = !1, this.pausePromise = !1;
  }
  /**
   * Terminate execution
   *
   * @return {Promise<void>}
   */
  async stop() {
    this.stopped = !0;
    try {
      await this.isRunning;
    } finally {
      h("log", "execution terminated");
    }
  }
  /**
   * process new actions and controls it's behaviour.
   *
   * @param action {Object}
   */
  setRunningAction(t) {
    this.runningAction = t, t && (this.pausePromise && t.pause(this.pausePromise), this.stopped && t.stop());
  }
  /**
   * @param pausePromise {Promise|boolean}
   */
  async pause(t = !1) {
    if (this.pausePromise = t, this.isRunning)
      try {
        await this.isRunning.pause(t);
      } catch (e) {
        h("error", "error pausing StepIterator", e);
      }
  }
  setSteps(t = []) {
    this.steps = new Set(t);
  }
  /**
   * get current step name
   *
   * @return {this.state}
   */
  getState() {
    return this.state;
  }
  /**
   * Set current state of action
   * will be invoked before executing a step
   *
   * @param stepName {string}
   */
  setState(t) {
    this.state = t;
  }
  clearState() {
    this.state = null;
  }
  /**
   * @return {[function<Promise<*>>]}
   */
  getValidSteps() {
    const t = [];
    for (const e of this.steps.values())
      if (this[e] && typeof this[e] == "function") {
        const s = jt(() => this.pausePromise, async (...i) => {
          this.steps.delete(e), this.setState(e), this.isRunning = s;
          const n = await this[e](...i);
          return this.clearState(), this.isRunning = null, n;
        });
        s.stepName = e, t.push(s);
      }
    return t;
  }
  /**
   * command to execute iterations.
   * @param continueFrom
   *
   * @return {Promise<void>}
   */
  async execute(t) {
    let e = !!t;
    for (const s of this.getValidSteps()) {
      if (this.stopped)
        break;
      if (e && t === s.stepName) {
        e = !1;
        continue;
      }
      e || await s();
    }
    this.clearState();
  }
}
const {
  CLICK: Pe,
  REQUEST: Ie
} = Et;
class Ne {
  /**
   *
   * @param ruleConfig
   * @param controls
   * @param code
   * @param pageData
   * @param forceClick
   * @param doc
   *
   * @return {Rule}
   */
  constructor(t, { controls: e }, s, i, n, r = document) {
    this.rawRule = t, this.doc = r, this.code = s, this.pageData = i, this.controls = e, this.isReady = !1, this.forceClick = n;
  }
  /**
   * Parse config and prepare data
   *
   * @return {Promise<void>}
   */
  async setFromConfig() {
    if (this.isReady)
      return;
    const t = this.rawRule;
    if (this.setType(t), !this.isClick) {
      this.setMethod(t);
      const {
        contentType: s,
        requiredBodyData: i,
        requiredHeadersData: n,
        data: r,
        headers: a,
        form: c
      } = t;
      this.setUrl(t);
      const u = this.formData(t), p = {};
      s && (p["Content-Type"] = s);
      const d = c && c.submitForm || this.isSubmit, [g, m] = [i, n].map(await me), b = d ? u : ht(
        this.substitute(r || u),
        g
      ), E = this.substitute(
        ht(a || p, m)
      ), k = t.type.toLowerCase() !== "submit" && c && !c.submitForm;
      this.body = k ? Object.keys(b).map(
        (ct) => `${encodeURIComponent(ct)}=${encodeURIComponent(b[ct])}`
      ).join("&") : b, this.headers = E, this.xhr = t.xhr || t.form && t.form.submitForm, this.setResponse(t);
    }
    t.submit && (this.submit = this.substitute(t.submit)), this.setCouponValidation();
    const e = { ...t };
    [
      "contentType",
      "requiredBodyData",
      "requiredHeadersData",
      "data",
      "form"
    ].forEach((s) => {
      delete e[s];
    }), Object.keys(e).forEach((s) => {
      this[s] || (this[s] = e[s]);
    }), this.isReady = !0;
  }
  /**
   * Set action type
   *
   * @param type
   * @param submit {string?} - selector to click
   */
  setType({ type: t, submit: e }) {
    this.type = this.forceClick && e ? Pe : t.toLowerCase(), this.actionMethod = W.includes(this.type) ? Ie : this.type;
  }
  /**
   * set coupon validation rule
   */
  setCouponValidation() {
    this.isClick ? this.couponValidation = this.rawRule.couponValidation || this.controls.coupon : this.couponValidation = this.rawRule.couponValidation;
  }
  /**
   * set type for fetch request
   *
   * @param form
   */
  setMethod({ form: t }) {
    if (this.isSubmit) {
      const e = y(t, "", this.doc);
      this.method = e.getAttribute("method") || "POST";
    } else
      this.method = this.type;
  }
  /**
   * set url for request
   * @param url
   * @param form
   */
  setUrl({ url: t, form: e }) {
    if (!this.isClick)
      if (!t && e && typeof e == "string") {
        const s = y(e, "", this.doc);
        try {
          this.url = s.url || s.getAttribute("action");
        } catch {
          h("error", "can't get url from form");
        }
      } else
        this.url = Rt(this.substitute(t));
  }
  /**
   * @return {boolean}
   */
  get isSubmit() {
    return this.type === "submit";
  }
  get isRequest() {
    return W.includes(this.type);
  }
  get isClick() {
    return this.type === "click";
  }
  substitute(t) {
    return ot(t, this.code, this.pageData);
  }
  /**
   * Parse data from page to use as body/query in request
   *
   * @param rule
   * @return {{}|FormData}
   */
  formData(t) {
    if (t.form) {
      const e = this.isSubmit ? t.form : t.form.selector, s = y(e), i = s ? new FormData(s) : null;
      if (i) {
        const n = {}, r = this.isSubmit || t.form.submitForm, a = this.isSubmit ? t.data : t.form.data, { getAllData: c, formData: u } = t.form;
        if (c)
          for (const p of i.keys()) {
            const d = i.get(p);
            n[p] = d || "";
          }
        if (u && u.forEach((p) => {
          const d = u.get(p);
          d && (n[p] = d);
        }), a && !r && a.forEach(({ key: p, value: d }) => {
          p && d && (n[p] = this.substitute(d));
        }), r) {
          if (a) {
            let p;
            if (Array.isArray(a))
              p = a;
            else {
              const d = Object.keys(a);
              d.includes("key") && d.includes("value") ? p = [].concat(a) : (p = [], d.forEach((g) => {
                p.push({ key: g, value: a[g] });
              }));
            }
            p.forEach(({ key: d, value: g }) => {
              d && g && i.set(d, this.substitute(g));
            });
          }
          return i;
        }
        return n;
      }
    }
    return {};
  }
  setResponse({ response: t }) {
    if (t)
      if (t.type === "html") {
        const e = {
          total: this.controls.total,
          discount: this.controls.discount,
          gift: this.controls.gift
        };
        this.response = this.substitute({
          ...e,
          ...t
        });
      } else
        this.response = this.substitute(t);
    else if (this.isSubmit) {
      this.response = { type: "html" };
      const { discount: e, total: s, gift: i } = this.controls;
      e && (this.response.discount = this.substitute(e)), s && (this.response.total = s), i && (this.response.gift = i);
    }
  }
}
class N {
  constructor({
    config: t,
    rules: e,
    code: s,
    forceClick: i = !1
  }, n = document) {
    this.config = t, this.rawRules = [].concat(e), this.code = s, this.doc = n, this.forceClick = i;
  }
  [Symbol.asyncIterator]() {
    const t = [...this.rawRules];
    return {
      /**
       * rule for each step
       * @return {Promise<{done: boolean, value: Rule}|{done: boolean}>}
       */
      next: async () => {
        if (!t.length)
          return { done: !0 };
        const e = t.shift(), s = await N.acquireAdditionalData({
          cookie: this.config.cookie || e.cookie,
          localStorageData: this.config.localStorageData || e.localStorageData,
          requiredContentData: [
            ...e.requiredContentData || [],
            ...this.config.requiredContentData || []
          ]
        }, this.doc), i = new Ne(
          e,
          this.config,
          this.code,
          s,
          this.forceClick,
          this.doc
        );
        return await i.setFromConfig(), {
          done: !1,
          value: i
        };
      }
    };
  }
  /**
   * @async
   * @public
   *
   * get data from cookie, localStorage, dom
   *
   * @param cookie
   * @param localStorageData
   * @param requiredContentData
   * @param doc
   * @return {Promise<[{key: string, value: *}]>}
   */
  static async acquireAdditionalData({
    cookie: t,
    localStorageData: e,
    requiredContentData: s
  }, i = document) {
    let n = [];
    if (t && et(t.key) && n.push({
      key: "%cookieValue",
      value: et(t.key)
    }), e && (n = n.concat(ge(e))), s) {
      const r = await Oe(s, i);
      n = n.concat(r);
    }
    return n;
  }
}
const {
  PRERUN: gt,
  RUN: vt,
  POSTRUN: mt,
  RESULT: Ct
} = L;
let Le = class extends nt {
  constructor() {
    super(), this.setSteps([gt, vt, mt, Ct]);
  }
  [gt]() {
    h("log", "executing prerun action");
  }
  [vt]() {
    h("log", "executing run action");
  }
  [mt]() {
    h("log", "executing postrun action");
  }
  [Ct]() {
    h("log", "executing result action");
  }
  /**
   *
   * @param cache
   * @return {Promise<{}>}
   */
  async execute(o = {}) {
    const { name: t } = o;
    let e = !!t, s = o;
    for (const i of this.getValidSteps()) {
      if (this.stopped)
        break;
      if (e && t === i.stepName) {
        e = !1;
        continue;
      }
      e || (s = await i(s));
    }
    return s;
  }
};
const {
  PRERUN: Ue
} = L;
class rt extends Le {
  constructor({
    rule: t,
    code: e,
    previousTotal: s
  }) {
    super(), this.action = t, this.code = e, this.previousTotal = s;
  }
  async [Ue]() {
    try {
      const t = this.action.controls.promo, e = this.action.controls.inputEvents;
      await Dt(this.code, t, e);
    } catch (t) {
      h("error", "can't type code", t);
    }
  }
  /**
   *
   * @return {{name: string}}
   */
  getState() {
    return { name: this.state };
  }
}
const {
  RUN: De,
  POSTRUN: Fe,
  RESULT: je
} = L;
class Me extends rt {
  constructor(t) {
    super(t);
    const { config: e, cacheResponse: s } = t;
    this.cacheResponse = s, this.config = e;
  }
  async [De]() {
    const { action: t } = this, e = t.url;
    return e ? (await fetch(e, {
      method: t.method,
      body: new URLSearchParams(t.body),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })).text() : !1;
  }
  async [Fe](t) {
    return this.action.postTimeout && await P(this.action.postTimeout), t;
  }
  async [je](t) {
    const e = await Ae(
      t,
      this.action.response,
      this.config,
      this.code,
      this.previousTotal
    ), s = this.action.couponValidation;
    try {
      e.wasValidated = s && q(s, this.code, w(t));
    } catch {
      h("log", "unchecked results");
    }
    return this.cacheResponse && e ? {
      ...e,
      htmlCache: w(t)
    } : e;
  }
}
const {
  RUN: _e,
  POSTRUN: He,
  RESULT: Ve
} = L;
class $e extends rt {
  async [_e]() {
    const { submit: t } = this.action, e = y(t);
    if (!e)
      throw new Error(`click event: No element - ${t}`);
    return ["mouseover", "mousedown", "focusin", "click", "mouseup", "focus"].forEach((s) => tt({ type: s }, e)), P(0);
  }
  async [He]() {
    const { controls: t } = this.action, e = f(t.total) || this.total, { waitFor: s, waitUntil: i, timeout: n } = this.action;
    await ce(
      {
        waitFor: s,
        waitUntil: i,
        total: t.total,
        totalAmount: e
      },
      n
    );
  }
  [Ve]() {
    const t = we({
      code: this.code,
      controls: this.action.controls
    }), e = this.action.couponValidation;
    if (e)
      try {
        const s = q(e, this.code);
        t.wasValidated = s, t.invalidated = !s;
      } catch (s) {
        h("error", "result invalidated ", s), t.invalidated = !0;
      }
    return t;
  }
}
const {
  RUN: Ge,
  POSTRUN: qe,
  RESULT: Be
} = L;
class $ extends rt {
  constructor(t) {
    super(t);
    const {
      cacheResponse: e,
      total: s,
      config: i,
      cache: n
    } = t;
    this.config = i, this.cacheResponse = e, this.cache = n, this.total = s;
  }
  async [Ge]() {
    const { action: t } = this;
    let e;
    try {
      e = Rt(t.url);
    } catch {
    }
    const s = {
      method: t.type,
      body: t.body,
      headers: t.headers,
      dataType: t.response ? t.response.type : null
    };
    return this.stopped ? !1 : $.smartFetch(e, s, t.xhr);
  }
  async [qe](t) {
    const { action: e } = this;
    if (e.postTimeout && await P(e.postTimeout), e.response) {
      if (e.response.requireParams && e.response.requireParams.length > 0) {
        const n = await t.json();
        return $.validateResponse(e.response, n);
      }
      if (this.stopped)
        return !1;
      const s = e.response.url;
      let i;
      return s && (i = s && await fetch(s)), i || t;
    }
    return t;
  }
  async [Be](t) {
    if (this.action.response)
      return Te({
        coupon: { code: this.code },
        response: t,
        action: this.action,
        xhr: this.action.xhr,
        previousCouponPrice: this.previousTotal,
        total: this.total,
        config: this.config,
        cacheResponse: this.cacheResponse
      });
    if (this.cacheResponse) {
      const e = await t.text();
      return {
        htmlCache: w(e)
      };
    }
    return !1;
  }
  /**
   * Perform request considering options and request type
   *
   * @param url {string} - request url
   * @param options {object|RequestInit} - request options
   * @param xhr {boolean} - flag to use XMLHttpRequest instead of fetch (preserve FormData body)
   *
   * @return {Promise<Response>|Promise<unknown>}
   */
  static smartFetch(t, e, s) {
    if (s)
      return new Promise((r, a) => {
        const c = new XMLHttpRequest();
        c.open(e.method, t, !1), e.headers && Object.entries(e.headers).forEach(([u, p]) => {
          c.setRequestHeader(u, p);
        }), c.onload = (u) => r(u.currentTarget.responseText), c.onerror = (u) => a(u), c.send(e.body || void 0);
      });
    let i = `${t}`;
    const n = { ...e };
    return ["post", "put"].includes(e.method.toLowerCase()) || (e.body && (i += `?${Object.entries(e.body).map(([r, a]) => a && `${r}=${a}`).filter((r) => r).join("&")}`), delete n.body), n.body && typeof n.body == "object" && (n.body = JSON.stringify(n.body)), fetch(i, n);
  }
  /**
   * @param resp {ResponseConfig}
   * @param responseData {Object} - response json object
   *
   * @return boolean
   */
  static validateResponse(t, e) {
    const { requireParams: s } = t;
    if (!s)
      return !0;
    if (e) {
      for (const i of s)
        if (S(e, i.path).toString() === i.value.toString())
          return !0;
    }
    return !1;
  }
}
const {
  CLICK: Je,
  SUBMIT: Ke,
  REQUEST: ze
} = Et, Ye = {
  [Ke]: Me,
  [ze]: $,
  [Je]: $e
};
class Qe {
  /**
   * @param type {string} - type of action to execute
   * @param props {{
   *   rule: Rule,
   *   code: string,
   *   previousTotal: number,
   *   cacheResponse: boolean?,
   *   total: number?,
   *   config: object?,
   *   cache: Document?,
   * }} - Data for passing to action
   */
  constructor(t, e) {
    return new Ye[t](e);
  }
}
const { APPLY_COUPON: Q, REMOVE_COUPON: yt } = G;
class B extends nt {
  constructor({
    code: t = "",
    config: e,
    previousCouponPrice: s,
    status: i,
    total: n,
    forceClick: r = !1
  }) {
    super(), this.code = t, this.config = e, this.status = i, this.previousCouponPrice = s, this.total = n, this.stepType = null, this.setSteps([Q, yt]), this.stepResult = Q, this.state = {}, this.forceClick = r;
  }
  /**
   * @public
   *
   * get current coupon execution state
   *
   * @return {{
   *  name: string?,
   *  stepState: {
   *    name: string?,
   *  }?,
   *  result: any?,
   * }}
   */
  getState() {
    const t = super.getState();
    return t.stepState = this.runningAction.getState(), t.result = this.result, t;
  }
  /**
   * @override
   *
   * @param stepName {string}
   */
  setState(t) {
    this.state.name = t;
  }
  /**
   * @override
   */
  clearState() {
    this.state = {};
  }
  /**
   * @public
   *
   * @param cache {{
   *  name: string?,
   *  result: object?,
   *  stepState: *?,
   *  }?}
   * @return {Promise<*>}
   */
  async execute(t) {
    const { name: e, result: s, stepState: i } = t || {}, n = async (a, c) => {
      try {
        const u = await a(c);
        a.stepName === this.stepResult && (this.result = u);
      } catch (u) {
        h("error", "error executing action in CouponStep", u);
      }
    };
    let r = !!e;
    for (const a of this.getValidSteps()) {
      if (this.stopped)
        break;
      if (r && e === a.stepName) {
        i && await n(a, i), r = !1;
        continue;
      }
      r || await n(a);
    }
    return this.clearState(), this.result || s;
  }
  /**
   * @public
   *
   * Execute action
   *
   * @param rule {Rule}
   * @param cacheResponse {boolean?}
   * @param actionCache {*?}
   *
   * @return {function(): Promise}
   */
  action(t, e, s) {
    const i = {
      code: this.code,
      previousTotal: this.previousCouponPrice,
      config: this.config,
      // applying: this.stepType === Step.APPLYING,
      total: this.total,
      cacheResponse: e,
      rule: t
    }, n = new Qe(t.actionMethod, i);
    return this.setRunningAction(n), n.execute(s);
  }
  /**
   * @private
   *
   * Detect if next action need to save response from server
   *
   * @return {boolean}
   */
  preserveResponse() {
    return this.status === l.STARTING || V(this.config) && this.stepType === te.APPLYING;
  }
  async [Q](t) {
    const e = this.config.controls.promo, s = this.config.controls.inputEvents;
    try {
      await Dt(this.code, e, s);
    } catch (a) {
      h("error", "can't type code", a);
    }
    const { apply: i } = this.config;
    if (!i)
      throw new Error("no apply config");
    const n = new N({
      config: this.config,
      rules: i,
      code: this.code,
      // TODO: it is better to detect it in caa itself
      forceClick: this.forceClick
    });
    let r;
    for await (const a of n)
      try {
        r = await this.action(a, V(this.config), t);
      } catch (c) {
        h("log", "error applying coupon", c);
      }
    return r;
  }
  async [yt](t) {
    const { remove: e } = this.config;
    if (!e)
      throw new Error("no remove config");
    if (this.status === l.FINISHING)
      throw new Error("Applying success coupon. Pass through");
    [].concat(e).forEach(({ pseudoData: n }) => {
      n && (this.code = n);
    });
    const s = new N({
      config: this.config,
      rules: e,
      code: this.code,
      // TODO: it is better to detect it in caa itself
      forceClick: this.forceClick
    });
    let i;
    for await (const n of s)
      try {
        const r = await this.action(n, this.preserveResponse(), t);
        this.preserveResponse() && (i = r && r.htmlCache);
      } catch {
        h("log", "error removing coupon");
      } finally {
      }
    return i;
  }
  async stop() {
    try {
      this.runningAction && await this.runningAction.stop();
    } catch (t) {
      h("error", "can't stop step execution ", t);
    }
    return super.stop();
  }
}
const { APPLY_COUPON: Xe } = G;
class Mt extends B {
  constructor(...t) {
    super(...t), this.setSteps([Xe]);
  }
}
const { REMOVE_COUPON: bt } = G;
class D extends B {
  constructor(...t) {
    super(...t), this.setSteps([bt]), this.stepResult = bt;
  }
}
const { UNLOCK: St } = G;
class We extends B {
  constructor(t) {
    super(t), this.setSteps([St]);
  }
  async [St]() {
    const { unlock: t } = this.config;
    if (!t)
      throw new Error("no unlock config");
    const e = new N({
      config: this.config,
      rules: t
    });
    let s;
    for await (const i of e) {
      const { waitFor: n, waitUntil: r } = i;
      if (n || r)
        st({ waitFor: n, waitUntil: r }) || (s = await this.action(i, V(this.config)));
      else
        try {
          s = await this.action(i, V(this.config));
        } catch (a) {
          h("log", "error unlocking", a);
        }
    }
    return s;
  }
}
class _t extends nt {
  /**
   *
   * @param initialCoupons {[{code: string}]} - coupons to restore
   * @param total {number} - initial total
   * @param config {{}} - config to use for applying coupon
   * @param forceCaaCoupons {boolean} - flag to prioritise caa coupons disregarding initial discount
   * @param initialDiscount {number} - discount amount of initial coupons
   * @param presumableResult {{
   *   stackCoupons: {code: string, discount?: number, total?: number}[],
   *   success: boolean,
   *   initialCoupons: {code: string, removed: boolean, added: boolean, initial: *}[],
   * } | CAAResult} - precalculated caa result
   */
  constructor({
    initialCoupons: t = [],
    total: e,
    config: s,
    forceCaaCoupons: i,
    initialDiscount: n
  } = {}) {
    super(), this.initialCoupons = t, this.setSteps(["applySuccessResult", "restore"]), this.index = 0, this.config = s, this.total = e, this.forceCaaCoupons = i, this.initialDiscount = n;
  }
  /**
   * @async
   *
   * @param config {Object}
   * @param cache {Object?}
   * @return {Promise<*>}
   */
  async action(t, e) {
    const s = new Mt(t);
    this.setRunningAction(s), await s.execute(e), this.setRunningAction(null);
  }
  /**
   * @param cache {Object?}
   * @throws throw if this method wasn't implemented by descendant
   *
   * @return {Promise<void>}
   */
  restore(t) {
    throw new Error(`Unimplemented method invoked ${t}`);
  }
  /**
   * @async
   *
   * Apply provided coupons exposing the current appliance index
   *
   * @param coupons {[{code: string}]}
   * @param cache {object?}
   * @return {Promise<void>}
   */
  async applyCoupons(t, e) {
    const s = {
      config: this.config,
      forceClick: !0
    };
    if (e) {
      const i = t[this.index].code;
      await this.action({
        ...s,
        code: i
      }, e), this.index += 1;
    }
    for (let i = this.index; i < t.length && !this.stopped; i++) {
      this.index = i;
      const n = t[i].code;
      await this.action({
        ...s,
        code: n
      });
    }
  }
  /**
   * @override
   *
   * Prepare serialized state in json format
   *
   * @return {this.state}
   */
  getState() {
    return {
      name: super.getState(),
      stepState: this.runningAction.getState(),
      index: this.index
    };
  }
  /**
   *
   * @param cache
   * @return {Promise<{
   *   caaSavings: number,
   *   success: boolean,
   *   bestCoupon: {code: string}?,
   * }>}
   */
  async execute(t) {
    const { name: e, stepState: s, index: i } = t || {};
    let n = !!e;
    for (const r of this.getValidSteps()) {
      if (this.stopped)
        break;
      if (n && e === r.stepName) {
        this.index = i || 0, s && await r(s), n = !1;
        continue;
      }
      n || (this.index = 0, await r());
    }
    return this.getResult();
  }
  /**
   * @return {{
   *   caaSavings: number,
   *   success: boolean,
   *   bestCoupon: {code: string}?,
   * }}
   */
  getResult() {
    throw new Error("Unimplemented method invoked");
  }
}
class Ze extends _t {
  constructor(t) {
    super(t);
    const {
      forceCaaCoupons: e,
      initialDiscount: s,
      presumableResult: i,
      giftCouponsApplicable: n
    } = t, {
      bestCoupon: r,
      caaSavings: a,
      success: c,
      giftCoupons: u
    } = i;
    if (c) {
      const p = u.length && u[0];
      this.bestCoupon = !a && n ? p : r, this.caaSavings = a, this.hasGift = n && this.bestCoupon ? this.bestCoupon.hasGift : !1, this.savings = a;
    }
    !c && s && e && (this.forceCaaCoupons = !1, this.savings = s), this.success = c;
  }
  /**
   * @override
   * @param cache {Object?}
   *
   * Restore cached coupons if initial discount was better and caa coupons wasn't forced.
   *
   * @return {Promise<void>}
   */
  restore(t) {
    return !this.forceCaaCoupons && (this.caaSavings || 0) < this.initialDiscount ? this.applyCoupons(this.initialCoupons, t) : Promise.resolve();
  }
  /**
   * @private
   *
   * @param bestCoupon
   * @param cache
   * @return {Promise<void>}
   */
  async applyBestCoupon(t = this.bestCoupon, e) {
    await this.action({
      config: this.config,
      code: t.code,
      forceClick: !0
    }, e);
  }
  /**
   * apply valid coupons
   *
   * @private
   * @param cache {object?}
   * @return {Promise<void>}
   */
  async applySuccessResult(t) {
    this.success && (this.forceCaaCoupons || this.caaSavings > this.initialDiscount) && await this.applyBestCoupon(this.bestCoupon, t);
  }
  /**
   * @override
   *
   * Form appliance result
   *
   * @return {{caaSavings: number?, bestCoupon: {code: string}?, success: boolean}}
   */
  getResult() {
    let t = { success: !!this.success, savings: this.savings || 0 };
    return this.success && (t = {
      ...t,
      caaSavings: this.caaSavings,
      bestCoupon: this.bestCoupon,
      hasGift: this.hasGift
    }), t;
  }
}
class ts extends _t {
  constructor(t) {
    super(t);
    const {
      presumableResult: e
    } = t, {
      stackCoupons: s,
      success: i,
      initialCoupons: n
    } = e;
    this.stackCoupons = s, this.initialCoupons = n, this.success = i;
  }
  /**
   * @override
   * @param cache {Object?}
   *
   * Restore cached coupons if initial discount was better and caa coupons wasn't forced.
   *
   * @return {Promise<void>}
   */
  async restore(t) {
    await this.applyCoupons(this.initialCoupons, t);
    let e = 0;
    try {
      e = f(this.config.controls.discount) || 0;
    } catch {
    }
    this.savings = e || this.total - f(this.config.controls.total);
  }
  /**
   * apply valid coupons
   *
   * @private
   * @param cache {object?}
   * @return {Promise<void>}
   */
  async applySuccessResult(t) {
    if (this.success) {
      await this.applyCoupons(this.stackCoupons, t);
      let e = 0;
      try {
        e = f(this.config.controls.discount) || 0;
      } catch {
      }
      this.caaSavings = e || this.total - f(this.config.controls.total);
    }
  }
  /**
   * @override
   *
   * Form appliance result
   *
   * @return {{caaSavings: number, bestCoupon: {code: string}?, success: boolean}}
   */
  getResult() {
    return {
      caaSavings: this.caaSavings,
      success: !!this.success
    };
  }
}
class es {
  /**
   * @param arg {{
   *   initialCoupons: [{code: string}],
   *   appliedCoupons: [AppliedCoupon],
   *   total: number,
   *   config: Object
   *   forceCaaCoupons: boolean,
   *   initialDiscount: number,
   * }}
   *
   * @return {StackCoupons|SingleCoupon}
   */
  constructor(t) {
    return t.config.stack ? new ts(t) : new Ze(t);
  }
}
function ss(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var at = { exports: {} }, R = typeof Reflect == "object" ? Reflect : null, wt = R && typeof R.apply == "function" ? R.apply : function(o, t, e) {
  return Function.prototype.apply.call(o, t, e);
}, F;
R && typeof R.ownKeys == "function" ? F = R.ownKeys : Object.getOwnPropertySymbols ? F = function(o) {
  return Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o));
} : F = function(o) {
  return Object.getOwnPropertyNames(o);
};
function os(o) {
  console && console.warn && console.warn(o);
}
var Ht = Number.isNaN || function(o) {
  return o !== o;
};
function v() {
  v.init.call(this);
}
at.exports = v;
at.exports.once = as;
v.EventEmitter = v;
v.prototype._events = void 0;
v.prototype._eventsCount = 0;
v.prototype._maxListeners = void 0;
var At = 10;
function J(o) {
  if (typeof o != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof o);
}
Object.defineProperty(v, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return At;
  },
  set: function(o) {
    if (typeof o != "number" || o < 0 || Ht(o))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + o + ".");
    At = o;
  }
});
v.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
v.prototype.setMaxListeners = function(o) {
  if (typeof o != "number" || o < 0 || Ht(o))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + o + ".");
  return this._maxListeners = o, this;
};
function Vt(o) {
  return o._maxListeners === void 0 ? v.defaultMaxListeners : o._maxListeners;
}
v.prototype.getMaxListeners = function() {
  return Vt(this);
};
v.prototype.emit = function(o) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t.push(arguments[e]);
  var s = o === "error", i = this._events;
  if (i !== void 0)
    s = s && i.error === void 0;
  else if (!s)
    return !1;
  if (s) {
    var n;
    if (t.length > 0 && (n = t[0]), n instanceof Error)
      throw n;
    var r = new Error("Unhandled error." + (n ? " (" + n.message + ")" : ""));
    throw r.context = n, r;
  }
  var a = i[o];
  if (a === void 0)
    return !1;
  if (typeof a == "function")
    wt(a, this, t);
  else
    for (var c = a.length, u = Jt(a, c), e = 0; e < c; ++e)
      wt(u[e], this, t);
  return !0;
};
function $t(o, t, e, s) {
  var i, n, r;
  if (J(e), n = o._events, n === void 0 ? (n = o._events = /* @__PURE__ */ Object.create(null), o._eventsCount = 0) : (n.newListener !== void 0 && (o.emit(
    "newListener",
    t,
    e.listener ? e.listener : e
  ), n = o._events), r = n[t]), r === void 0)
    r = n[t] = e, ++o._eventsCount;
  else if (typeof r == "function" ? r = n[t] = s ? [e, r] : [r, e] : s ? r.unshift(e) : r.push(e), i = Vt(o), i > 0 && r.length > i && !r.warned) {
    r.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + r.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = o, a.type = t, a.count = r.length, os(a);
  }
  return o;
}
v.prototype.addListener = function(o, t) {
  return $t(this, o, t, !1);
};
v.prototype.on = v.prototype.addListener;
v.prototype.prependListener = function(o, t) {
  return $t(this, o, t, !0);
};
function is() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Gt(o, t, e) {
  var s = { fired: !1, wrapFn: void 0, target: o, type: t, listener: e }, i = is.bind(s);
  return i.listener = e, s.wrapFn = i, i;
}
v.prototype.once = function(o, t) {
  return J(t), this.on(o, Gt(this, o, t)), this;
};
v.prototype.prependOnceListener = function(o, t) {
  return J(t), this.prependListener(o, Gt(this, o, t)), this;
};
v.prototype.removeListener = function(o, t) {
  var e, s, i, n, r;
  if (J(t), s = this._events, s === void 0)
    return this;
  if (e = s[o], e === void 0)
    return this;
  if (e === t || e.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[o], s.removeListener && this.emit("removeListener", o, e.listener || t));
  else if (typeof e != "function") {
    for (i = -1, n = e.length - 1; n >= 0; n--)
      if (e[n] === t || e[n].listener === t) {
        r = e[n].listener, i = n;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? e.shift() : ns(e, i), e.length === 1 && (s[o] = e[0]), s.removeListener !== void 0 && this.emit("removeListener", o, r || t);
  }
  return this;
};
v.prototype.off = v.prototype.removeListener;
v.prototype.removeAllListeners = function(o) {
  var t, e, s;
  if (e = this._events, e === void 0)
    return this;
  if (e.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : e[o] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete e[o]), this;
  if (arguments.length === 0) {
    var i = Object.keys(e), n;
    for (s = 0; s < i.length; ++s)
      n = i[s], n !== "removeListener" && this.removeAllListeners(n);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = e[o], typeof t == "function")
    this.removeListener(o, t);
  else if (t !== void 0)
    for (s = t.length - 1; s >= 0; s--)
      this.removeListener(o, t[s]);
  return this;
};
function qt(o, t, e) {
  var s = o._events;
  if (s === void 0)
    return [];
  var i = s[t];
  return i === void 0 ? [] : typeof i == "function" ? e ? [i.listener || i] : [i] : e ? rs(i) : Jt(i, i.length);
}
v.prototype.listeners = function(o) {
  return qt(this, o, !0);
};
v.prototype.rawListeners = function(o) {
  return qt(this, o, !1);
};
v.listenerCount = function(o, t) {
  return typeof o.listenerCount == "function" ? o.listenerCount(t) : Bt.call(o, t);
};
v.prototype.listenerCount = Bt;
function Bt(o) {
  var t = this._events;
  if (t !== void 0) {
    var e = t[o];
    if (typeof e == "function")
      return 1;
    if (e !== void 0)
      return e.length;
  }
  return 0;
}
v.prototype.eventNames = function() {
  return this._eventsCount > 0 ? F(this._events) : [];
};
function Jt(o, t) {
  for (var e = new Array(t), s = 0; s < t; ++s)
    e[s] = o[s];
  return e;
}
function ns(o, t) {
  for (; t + 1 < o.length; t++)
    o[t] = o[t + 1];
  o.pop();
}
function rs(o) {
  for (var t = new Array(o.length), e = 0; e < t.length; ++e)
    t[e] = o[e].listener || o[e];
  return t;
}
function as(o, t) {
  return new Promise(function(e, s) {
    function i(r) {
      o.removeListener(t, n), s(r);
    }
    function n() {
      typeof o.removeListener == "function" && o.removeListener("error", i), e([].slice.call(arguments));
    }
    Kt(o, t, n, { once: !0 }), t !== "error" && cs(o, i, { once: !0 });
  });
}
function cs(o, t, e) {
  typeof o.on == "function" && Kt(o, "error", t, e);
}
function Kt(o, t, e, s) {
  if (typeof o.on == "function")
    s.once ? o.once(t, e) : o.on(t, e);
  else if (typeof o.addEventListener == "function")
    o.addEventListener(t, function i(n) {
      s.once && o.removeEventListener(t, i), e(n);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof o);
}
var us = at.exports;
const K = /* @__PURE__ */ ss(us);
class z extends K {
  /**
   * @public
   * @abstract
   * Start tracking elements on the page.
   */
  startObserving() {
    throw new Error("method startObserving should be overwritten");
  }
  /**
   * @public
   * @abstract
   * Stop tracking elements on the page.
   */
  stopObserving() {
    throw new Error("method stopObserving should be overwritten");
  }
}
class T extends z {
  constructor(t = {}) {
    super(), this.config = null, this.id = t.id, this.observer = null, this.listenersTimeout = {}, this.caaStarted = !1, this.state = {
      couponCode: null,
      total: null,
      clicked: !1
    };
  }
  async init() {
    await It(), await this.checkCachedInfo(), this.startObserver(), this.checkFields();
  }
  async checkCachedInfo() {
    const t = !!pt("status", this.id);
    if (!this.config || t || this.caaStarted)
      return T.clearStorage(), !1;
    const e = M("couponsScraper");
    return !e || !e.applied ? (T.clearStorage(), !1) : (await Nt(this.config), setTimeout(() => {
      const s = C(f(this.config.controls.total)), i = f(this.config.controls.discount), { couponCode: n, total: r } = e;
      if (T.clearStorage(), !n || Number.isNaN(Number(r)) || !s)
        return;
      let a = i && typeof i != "object" && C(i) || r - (s || 0);
      a < 0 && (a = 0), this.dispatchEvent(
        {
          couponCode: n,
          discount: a
        }
      );
    }, 3e3), !0);
  }
  startObserver() {
    !this.observer && document.body instanceof Node && (this.observer = new MutationObserver(() => this.checkFields()), this.observer.observe(document.body, {
      childList: !0,
      subtree: !0
    }));
  }
  saveState() {
    sessionStorage.couponsScraper = JSON.stringify(this.state);
  }
  static clearStorage() {
    sessionStorage.removeItem("couponsScraper");
  }
  dispatchEvent(t) {
    t && t.couponCode && t.discount && this.emit("userCouponApplied", {
      coupon: t.couponCode.toLowerCase(),
      discount: t.discount
    }), T.clearStorage(), this.checking = !1;
  }
  eventHandler(t, e = null) {
    const s = !!pt("status", this.id);
    if (s || this.caaStarted)
      return T.clearStorage(), !1;
    if (!this.promo || !this.promo.length)
      return !1;
    const i = t.target.getAttribute("caa-scraper") || 0, n = e || this.promo[i].value;
    return n ? (this.state.couponCode = n, this.state.clicked = !0, this.state.applied = !0, this.saveState(), setTimeout(() => {
      if (s || this.caaStarted)
        return T.clearStorage(), !1;
      const r = f(this.config.controls.discount), a = C(f(this.config.controls.total));
      let c = r && typeof r != "object" && C(r) !== this.state.discount ? C(r) : this.state.total - (a || 0);
      return c < 0 && (c = 0), this.state.total = a, this.state.discount = c, this.saveState(), this.dispatchEvent(
        {
          couponCode: this.state.couponCode,
          discount: c ? Number.parseFloat(c).toFixed(2) : 0
        }
      ), this.state.clicked = !1, this.checking = !1, this.state.couponCode = null, !0;
    }, this.state.timeout || 5e3), !0) : !1;
  }
  clickListener(t) {
    this.eventHandler(t);
  }
  keyListener(t) {
    if (t.which === 13 || t.keyCode === 13) {
      const e = t.target.value;
      this.eventHandler(t, e);
    }
  }
  checkFields() {
    if (!this.config || !this.config.controls || this.checking || this.state.clicked)
      return !1;
    const t = Z(this.config.controls.promo);
    this.promo = t;
    const e = f(this.config.controls.total);
    if (!e || !this.promo || this.promo.length === 0)
      return !1;
    const s = this.promo[0].value;
    s && (this.state.couponCode = s);
    const i = f(this.config.controls.discount);
    if (this.state.timeout = 0, Array.isArray(this.config.apply))
      this.config.apply.forEach(({ timeout: r, type: a }) => {
        this.state.timeout += a.toLowerCase() === "click" ? r : 0;
      });
    else {
      const { timeout: r, type: a } = this.config.apply;
      this.state.timeout = a.toLowerCase() === "click" ? r : 5e3;
    }
    const n = this.getAllSubmits([].concat(this.config.apply));
    return !n || n.length === 0 ? !1 : (this.state.total = C(e) || 0, i && (this.state.discount = C(i) || 0), this.saveState(), n.forEach((r) => {
      this.setListenersToElements(r, "mousedown", this.clickListener.bind(this));
    }), this.setListenersToElements(t, "keydown", this.keyListener.bind(this)), !0);
  }
  setListenersToElements(t = [], e = "click", s = () => {
  }) {
    this.listenersTimeout[e] && clearTimeout(this.listenersTimeout[e]), t.forEach((i, n) => {
      i.getAttribute("caa-scraper") || (i.removeEventListener(e, (r) => s(r)), i.setAttribute("caa-scraper", n), i.addEventListener(e, (r) => s(r)));
    }), this.listenersTimeout[e] = setTimeout(() => {
      t.forEach((i, n) => {
        i.removeEventListener(e, (r) => s(r)), i.setAttribute("caa-scraper", n), i.addEventListener(e, (r) => s(r));
      });
    }, 2500);
  }
  getAllSubmits(t = []) {
    const e = [];
    return t.forEach((s) => {
      const i = Z(s.submit);
      i.length && e.push(i);
    }), e;
  }
}
class ps extends z {
  constructor() {
    super(), this.initialProps = {}, this.isObserving = !1;
  }
  startObserving() {
    if (!this.isObserving) {
      this.isObserving = !0;
      let t = location.href;
      const e = window.history;
      for (const s of Object.keys(e))
        typeof e[s] == "function" && (this.initialProps[s] = e[s], e[s] = (...i) => {
          this.initialProps[s].call(e, ...i), t !== location.href && (t = location.href, this.emit("urlChanged"));
        });
    }
  }
  stopObserving() {
    if (this.isObserving) {
      this.isObserving = !1;
      const t = window.history;
      for (const e of Object.keys(this.initialProps))
        t[e] = this.initialProps[e];
    }
  }
}
class ls extends z {
  constructor() {
    super(), this.interval = null;
  }
  startObserving() {
    if (!this.interval) {
      let t = location.href;
      const e = () => {
        t !== location.href && (t = location.href, this.emit("urlChanged"));
      };
      e(), this.interval = setInterval(e, 2e3);
    }
  }
  stopObserving() {
    this.interval && (clearInterval(this.interval), this.interval = null);
  }
}
class hs {
  /**
   * @param monkeyPatchHistory {boolean} - rewrite history methods to emit url changes.
   *    If false, just checks url every 2 seconds or so.
   *
   * @return {HistoryObserver|UrlObserver}
   */
  constructor({ monkeyPatchHistory: t = !1 }) {
    return t && window.history ? new ps() : new ls();
  }
}
const ds = (o) => {
  if (o && typeof o == "object") {
    const {
      from: t,
      to: e,
      match: s,
      extractable: i
    } = o;
    return !!(t || e || s || i);
  }
  return !1;
};
class zt extends K {
  /**
   * @param config {{}} - config from json
   */
  constructor(t) {
    super(), this.rawConfig = t, this.config = t.controls.coupon, this.available = !!this.config, this.extractable = ds(this.config), this.available && (this.coupons = this.getCouponsFromPage(), this.cartNode = document.documentElement);
  }
  /**
   * get coupons html elements
   *
   * @return {{el: HTMLElement}[]}
   */
  getCouponsFromPage() {
    return O(this.config).map((t) => ({ el: t }));
  }
  /**
   * Emit events if coupons state has changed
   */
  observer() {
    const t = this.getCouponsFromPage();
    !this.coupons.length && t.length && this.emit("hasAppliedCoupon"), this.coupons.length && !t.length && this.emit("couponsCleared"), this.coupons = t;
  }
  /**
   * Start observing coupons on current page
   */
  startObserving() {
    this.available && (this.cartObserver || (this.cartObserver = new MutationObserver(Ft(() => {
      this.observer();
    }, 500))), h("log", "start observing cart"), this.cartObserver.observe(this.cartNode, {
      childList: !0,
      subtree: !0
    }));
  }
  /**
   * Stop coupons observation
   */
  stopObserving() {
    this.available && this.cartObserver && (h("log", "stop cart observing"), this.cartObserver.disconnect());
  }
  /**
   * change saved total for coupons
   * @param total
   */
  setTotal(t) {
    this.total = t;
  }
  updateCouponInfo() {
    h("warn", "can't update info for not extractable coupon");
  }
  /**
   * get State to save to sessionStorage
   *
   * @return {object|null}
   */
  getState() {
    return h("log", "can't save coupons"), null;
  }
  /**
   * Check if coupons can be restored
   *
   * @return {boolean}
   */
  canRestoreCoupons() {
    return !1;
  }
  /**
   * placeholder for discount calculation
   *
   * @return {number}
   */
  getDiscount() {
    return 0;
  }
  /**
   *
   * @return {*[]}
   */
  getCoupons() {
    return this.coupons || [];
  }
  /**
   *
   * @return {*[]}
   */
  getExistingCoupons() {
    return this.getCoupons().filter((t) => !t.removed);
  }
  /**
   * check if coupons are available
   *
   * @return {boolean}
   */
  isAvailable() {
    return this.available;
  }
  /**
   * Set discount to a coupon
   * @param code {string} - code to identify coupon
   * @param discount {number} - discount amount to set
   */
  setDiscountByCode(t, e) {
    h("log", `can't detect coupons ${t} ${e}`);
  }
}
class X {
  /**
   *
   * @param code {string}
   * @param removed {boolean}
   * @param initial {boolean}
   * @param added {boolean}
   * @param discount {number?}
   * @param removeRules {{submit: string?}|[{submit: string?}]?}
   * @param node {HTMLElement | HTMLHtmlElement}
   */
  constructor({
    code: t,
    removed: e,
    initial: s,
    added: i,
    discount: n
  }, r, a = document.documentElement) {
    if (this.code = t, this.isTracking = !1, this.isTrusted = !1, this.removed = e, this.inital = s, this.added = i, this.discount = n, this.couponNode = a, r) {
      const c = Array.isArray(r) ? r[0] : r;
      this.submitSelector = c.submit, this.setObserveTarget(a);
    }
  }
  /**
   * @param node {HTMLElement?} - coupon node
   */
  setObserveTarget(t = this.couponNode) {
    if (this.submitSelector)
      try {
        this.removeTrigger = xt(this.submitSelector, t);
      } catch (e) {
        h("warn", e);
      }
  }
  /**
   * start listening clicks on target.
   * might be useful in future to detect competitive CAA
   */
  trackEvents() {
    this.removeTrigger && !this.isTracking && (this.listener = ({ isTrusted: t }) => {
      this.isTrusted = t;
    }, this.removeTrigger.addEventListener("click", this.listener), this.removeTrigger.addEventListener("mousedown", this.listener), this.isTracking = !0);
  }
  stopEventsTracking() {
    this.removeTrigger && this.isTracking && (this.removeTrigger.removeEventListener("click", this.listener), this.removeTrigger.removeEventListener("mousedown", this.listener), this.isTracking = !1);
  }
  setState({ removed: t, added: e, initial: s }) {
    t && (this.removed = !0, this.added = !1), e && (this.removed = !1, this.added = !0), s && (this.inital = !0);
  }
  setRemovedState() {
    this.setState({ removed: !0 }), this.stopEventsTracking();
  }
  setDiscount(t) {
    this.discount = Number(t);
  }
  resetObserveTarget(t) {
    this.isTracking ? (this.stopEventsTracking(), this.couponNode = t, this.setObserveTarget(t), this.trackEvents()) : (this.couponNode = t, this.setObserveTarget(t));
  }
  serialize() {
    const t = {
      code: this.code,
      added: this.added,
      initial: this.initial,
      removed: this.removed
    };
    return this.hasOwnProperty("discount") && (t.discount = this.discount), t;
  }
}
class fs extends zt {
  constructor(t, e = {}) {
    super(t);
    const {
      coupons: s,
      total: i,
      actionState: n
    } = e;
    if (this.removeConfig = t.remove, this.total = i || 0, this.available) {
      const r = this.getCouponsFromPage();
      s ? this.coupons = s.map((a) => new X(a, t.remove)) : this.coupons = r && r.length ? r.map(({ code: a, el: c }) => new X({
        code: a,
        initial: !0
      }, t.remove, c)) : [], this.cachedAction = n;
    }
  }
  getCouponsFromPage() {
    const t = this.config;
    return O(t).map((e) => {
      try {
        const s = Ut(t, e);
        return s ? { code: s, el: e } : !1;
      } catch {
        return !1;
      }
    }).filter((e) => e);
  }
  /**
   * parse existing coupons to detect difference and update discount of coupons
   * @override
   *
   * @param updatedTotal {number}
   */
  updateCouponInfo(t) {
    const e = this.getCouponsFromPage(), s = this.coupons.filter((i) => !i.removed);
    if (e.length < s.length) {
      const i = s.find(
        (n) => !e.find((r) => n.code === r.code) && typeof n.discount != "number"
      );
      if (i) {
        const n = s.reduce(
          (c, { discount: u }) => u ? c + u : c,
          0
        ), r = t - (this.total + n), a = this.coupons.findIndex((c) => c.code === i.code);
        this.coupons[a].setDiscount(r);
      }
    } else if (e.length > this.coupons.length) {
      const i = e.find(({ code: n }) => !this.coupons.find((r) => r.code === n));
      if (i) {
        const n = this.total - t;
        this.coupons.push({ ...i, discount: n }), this.total = t;
      }
    }
  }
  observer() {
    const t = this.getCouponsFromPage(), e = this.coupons.filter((i) => !i.removed && i.couponNode), s = t.find(({ code: i }) => !e.find((n) => n.code === i));
    if (t.length !== e.length || s) {
      const i = this.coupons.find((a) => !t.find((c) => c.code === a.code) && !a.removed);
      i && i.setRemovedState(), this.coupons.filter(({ couponNode: a, code: c }) => {
        const u = t.find((p) => p.code === c);
        return u && u.el !== a;
      }).forEach((a) => {
        const c = t.find(({ code: u }) => u === a.code).el;
        a.resetObserveTarget(c);
      });
      const n = t.find(({ code: a }) => !this.coupons.find((c) => c.code === a));
      if (n) {
        const a = new X({
          code: n.code,
          added: !0
        }, this.removeConfig, n.el);
        a.trackEvents(), this.coupons.push(a), this.emit("couponAdded", a.code);
      }
      const r = this.coupons.filter(({ removed: a }) => !a);
      !e.length && r.length && this.emit("hasAppliedCoupon", this.coupons.map(({ code: a }) => ({ code: a }))), e.length && !r.length && this.emit("couponsCleared");
    }
  }
  /**
   *
   * @return {{code: string, removed: boolean, added: boolean, initial: *}[]}
   */
  getCoupons() {
    return this.coupons.map((t) => t.serialize());
  }
  /**
   * serialize current observer state
   * @return {{
   *    total: number,
   *    coupons: {code: string, removed: boolean, added: boolean, initial: *}[],
   * }|null}
   */
  getState() {
    return this.available ? {
      total: this.total,
      coupons: this.getCoupons()
    } : null;
  }
  /**
   * @override
   * @return {boolean}
   */
  canRestoreCoupons() {
    return !!(this.coupons && this.coupons.length && this.total);
  }
  /**
   * calculate discount for all coupons that were removed by current caa instance
   * @return {number}
   */
  getDiscount() {
    return this.coupons.reduce((t, { discount: e, removed: s }) => typeof e == "number" && !s ? t + e : t, 0);
  }
  /**
   * @override
   * Set discount to a coupon
   * @param code {string} - code to identify coupon
   * @param discount {number} - discount amount to set
   */
  setDiscountByCode(t, e) {
    const s = this.coupons.find((i) => i.code === t);
    s && s.setDiscount(e);
  }
}
let gs = class {
  /**
   * @param config {{controls: {coupon: string | object | undefined}}}
   * @param args
   * @return {BaseObserver|AdvanceObserver}
   */
  constructor(o, ...t) {
    const { from: e, extractable: s } = o.controls.coupon || {};
    return e || s ? new fs(o, ...t) : new zt(o);
  }
};
class vs extends z {
  constructor(t) {
    super();
    const e = t.controls.total;
    this.total = f(e, document.documentElement);
    const s = Ft(() => {
      const i = f(e, document.documentElement);
      i !== this.total && (this.total = i, this.emit("totalChanged", i));
    }, 1e3);
    this.observerCallback = s, this.observer = new MutationObserver(s), this.isObserving = !1;
  }
  startObserving() {
    this.isObserving || (this.observerCallback(), this.observer.observe(document.documentElement, {
      childList: !0,
      subtree: !0
    }), this.isObserving = !0);
  }
  stopObserving() {
    this.observer.disconnect(), this.isObserving = !1;
  }
}
class Tt extends K {
  constructor(t, { couponsCache: e = {} } = {}) {
    super(), this.couponsObserver = new gs(t, e), this.totalObserver = new vs(t), this.exposeEvents();
  }
  /**
   * @private
   */
  exposeEvents() {
    j.forEach((t) => {
      this.couponsObserver.on(t, (...e) => {
        this.emit(t, ...e);
      });
    }), this.totalObserver.on("totalChanged", (t) => {
      this.emit("totalChanged", t);
    }), this.availableEvents = [...j, "totalChanged"];
  }
  /**
   *
   * @param exposeExistingCoupons {boolean?} - emit existing coupons, if this flag is true
   */
  startObserving(t) {
    this.totalObserver.startObserving(), this.couponsObserver.startObserving();
    const e = this.getCoupons();
    t && e.length && this.emit("hasAppliedCoupon", e);
  }
  stopObserving() {
    this.totalObserver.stopObserving(), this.couponsObserver.stopObserving();
  }
  /**
   * Check if coupons could be controlled and saved
   * @return {boolean}
   */
  couponsAvailable() {
    return this.couponsObserver.isAvailable();
  }
  /**
   * Update total to calculate coupon discount
   * @param total {number} - total amount
   */
  setCouponsTotal(t) {
    this.couponsObserver.setTotal(t);
  }
  updateCouponInfo(t) {
    this.couponsObserver.updateCouponInfo(t);
  }
  /**
   * get current coupons from the page
   * @return {{code: string, removed: boolean, added: boolean, initial: *}[]}
   */
  getCoupons() {
    return this.couponsObserver.getExistingCoupons();
  }
  /**
   * Get summarized discount for all saved coupons
   *
   * @return {number}
   */
  getCouponsDiscount() {
    return this.couponsObserver.getDiscount();
  }
  /**
   * check if coupon codes are available.
   *
   * @return {boolean}
   */
  canExtractCouponCodes() {
    return this.couponsObserver.extractable;
  }
  /**
   * get state in json format. Can be used to restore it later.
   * @return {{
   *    total: number,
   *    coupons: {code: string, removed: boolean, added: boolean, initial: *}[],
   * }}
   */
  serializeCouponsState() {
    return this.couponsObserver.getState();
  }
}
class Ot {
  /**
   * @param total {number} -- price without any coupons
   * @param cache {[object]?} -- saved result of coupons applying in case of page reloading
   */
  constructor(t, e = []) {
    this.state = e.map((s) => {
      const i = s;
      return i.discount = Number(s.discount), i;
    }), this.total = t;
  }
  /**
   * @private
   * @param el {AppliedCoupon}
   */
  push(t) {
    this.state.push(t);
  }
  /**
   * @param results {[AppliedCoupon]}
   */
  pushStack(t) {
    this.state = this.state.concat(t);
  }
  /**
   * @param newTotal
   *
   * recalculate discount for validated applied coupons
   */
  resetTotal(t) {
    const e = t - this.total;
    this.state = this.state.map((s) => {
      const i = s;
      return s.wasValidated && (i.discount = s.discount + e), i;
    });
  }
  /**
   * @private
   * @return {AppliedCoupon[]}
   */
  getState() {
    return this.state;
  }
}
class ms extends K {
  constructor() {
    super(), [
      "status",
      "result",
      "processIndex",
      "stepType"
    ].forEach((t) => this.defineObservedProperty(t));
  }
  /**
   * Define a property to observe
   * @param name {string} - property name to observer
   */
  defineObservedProperty(t) {
    Object.defineProperty(this, t, {
      get: () => this[`_${t}`],
      set: (e) => {
        this[`_${t}`] !== e && (this[`_${t}`] = e, this.emit(`update:${t}`, e));
      }
    });
  }
  /**
   * @param config {RemoveStepConfig}
   * @return {Promise<*>}
   */
  remove(t) {
    const e = new D(t);
    this.runningAction = e;
    const s = e.execute();
    return s.finally(() => {
      this.runningAction = null;
    }), s;
  }
  /**
   * @param config {ApplyStepConfig}
   * @param cache {object?}
   *
   * @return {Promise<*>}
   */
  apply(t, e) {
    const s = new Mt(t), i = s.execute(e);
    return this.runningAction = s, i.finally(() => {
      this.runningAction = null;
    }), i;
  }
  /**
   * unlock input on the page
   *
   * @param config {BaseStepConfig}
   * @return {Promise<void>}
   */
  async unlock(t) {
    await new We(t).execute();
  }
  /**
   *
   * @param currentTotal {number?}
   * @return {CAAState}
   */
  getDefaultState(t = 0) {
    return {
      processIndex: 0,
      status: l.INIT,
      total: t || 0,
      appliedCoupons: new Ot(t),
      previousCouponPrice: 0,
      previousDiscount: 0,
      result: null,
      bestCoupon: null,
      stackIndex: null
    };
  }
  /**
   * Get CAA state from session storage
   *
   * @param key {string}
   * @return {CAAState}
   */
  getStateFromCache(t) {
    const e = M(t) || {}, s = this.getDefaultState(e.total);
    return {
      processIndex: Number(e.processIndex),
      status: e.status,
      total: Number(e.total),
      // stepType: cache.stepType, // TODO: check it. might be required
      previousCouponPrice: Number(e.previousCouponPrice),
      previousDiscount: Number(e.previousDiscount),
      appliedCoupons: new Ot(Number(e.total), e.appliedCoupons || []),
      // TODO: consider creating class for result
      result: e.result ? {
        ...e.result,
        savings: Number(e.result.savings)
      } : s.result,
      bestCoupon: e.bestCoupon || s.bestCoupon,
      stackIndex: e.stackIndex || s.stackIndex
    };
  }
  /**
   * get current caa state
   *
   * @return {CAAState}
   */
  getCurrentState() {
    return {
      processIndex: this.processIndex,
      status: this.status,
      total: this.total,
      appliedCoupons: this.appliedCoupons,
      previousCouponPrice: this.previousCouponPrice,
      previousDiscount: this.previousDiscount,
      result: this.result,
      bestCoupon: this.bestCoupon,
      stackIndex: this.stackIndex
    };
  }
  /**
   * @public
   * @param key {string} - CAA key to use for saving state to session storage
   */
  cacheState(t) {
    const e = this.getCurrentState();
    sessionStorage.setItem(t, JSON.stringify({ ...e, timeStamp: Date.now() }));
  }
}
const Cs = "@rmn-fr/coupon-applier", ys = "2.2.3", bs = "Fork of @softomate/caa-module, cf. https://bitbucket.org/toolbarstudio/caa-ecosystem_caa-module (upstream) / https://github.com/rmn-france/npm-besttoolbars-coupon-applier (read-only copy of upstream)", Ss = "ISC", ws = "module", As = "dist/coupon-applier.js", Ts = "coupon-applier.d.ts", Os = [
  "dist"
], ks = {
  type: "git",
  url: "https://github.com/rmn-france/npm-coupon-applier"
}, Es = {
  access: "restricted",
  registry: "https://nexus.rmn-fr.io/repository/npm_rmn/"
}, xs = {
  dev: "vite",
  build: "vite build",
  preview: "vite preview"
}, Rs = {
  vite: "^5.2.0"
}, Ps = {
  events: "3.3.0"
}, Yt = {
  name: Cs,
  version: ys,
  description: bs,
  license: Ss,
  type: ws,
  module: As,
  types: Ts,
  files: Os,
  repository: ks,
  publishConfig: Es,
  scripts: xs,
  devDependencies: Rs,
  dependencies: Ps
};
let kt = !0, I;
class Qt extends ms {
  /**
   * @param {{
   *    id: (number|string),
   *    savePreviousDiscount: boolean=,
   *    configs: [Object],
   *    coupons: [{code: string}],
   *    monkeyPatchHistory: boolean=false,
   *    forceCaaCoupons: boolean=true,
   *    giftCouponsApplicable: boolean=false,
   * }} options
   *    id: Uniq id to use for saving state into Session Storage
   *    savePreviousDiscount: flag to turn on/off discount saving after first coupon removal
   *    configs: Array of available config.
   *    coupons: Array of coupons to apply.
   *    monkeyPatchHistory: rewrite all methods of 'history' object
   *      considers a bad manner, ignorance and might insecure.
   *    forceCaaCoupons: apply provided coupons if initial coupons had better discount.
   *    giftCouponsApplicable: allow to apply gift coupons in the finalize
   */
  constructor(t = {}) {
    if (super(), kt)
      kt = !1;
    else
      throw new Error("Only single instance of CAA is allowed");
    if (!t.id)
      throw new Error("'id' is required property for the first argument of the CAA constructor");
    this.version = Yt.version, this.id = t.id, this.forceCaaCoupons = t.hasOwnProperty("forceCaaCoupons") ? t.forceCaaCoupons : !0, this.giftCouponsApplicable = t.giftCouponsApplicable, this.stopReason = null, this.disregardPreviousDiscount = !t.savePreviousDiscount, this.coupons = Re(t.coupons), this.scraper = new T({ id: t.id });
    const e = () => {
      const i = he(t.configs);
      if (!(i && this.config && [].concat(i.url)[0] === [].concat(this.config.url)[0]))
        if (this.config = i, this.config) {
          const n = xe(M(`CAA-${this.id}`));
          (n || this.stopReason && this.status) && (I = n, this.init()), this.stopReason && (this.stopReason = null), this.status && this.status !== l.PROCESS && (this.status = null);
        } else {
          this.stopReason = "noConfig", this.status = l.UNAVAILABLE;
          try {
            this.stopObserving();
          } catch {
          }
        }
    };
    e();
    const s = new hs({
      monkeyPatchHistory: t.monkeyPatchHistory
    });
    s.startObserving(), s.on("urlChanged", () => {
      e();
    }), this.scraper.on("userCouponApplied", (i) => {
      this.emit("userCouponApplied", i);
    });
  }
  async init() {
    if (!this.config)
      throw new Error("to init caa config is required");
    try {
      await Nt(this.config);
    } catch {
      h("log", "no controls in the config");
    }
    this.initCouponsScraper(), (!this.status || this.stopReason) && await this.setInitState();
  }
  initCouponsScraper() {
    this.scraper.config = this.config, this.scraper.init();
  }
  isApplying() {
    return [
      l.PROCESS,
      l.STARTING,
      l.FINISHING,
      l.RESTORING
    ].includes(this.status);
  }
  setRunningAction(t) {
    if (this.runningAction = t, t)
      switch (this.status) {
        case l.PAUSE:
          t.pause(this.isPaused);
          break;
        case l.STOP:
          t.stop();
          break;
      }
  }
  /**
   * set initial state for CAA
   * @param {boolean} isReload - if need to set status starting instead of init
   */
  async setInitState(t = !1) {
    const e = f(this.config.controls.total), s = `CAA-${this.id}`, i = super.getStateFromCache(s), n = {
      ...super.getDefaultState(e),
      status: l[t ? "STARTING" : "INIT"]
    }, r = I ? i : n, a = [];
    for (const c of Object.keys(r))
      I && this.hasOwnProperty(c) ? (this[`_${c}`] = r[c], a.push(c)) : this[c] = r[c];
    if (I) {
      this.status === l.SUCCESS && this.clearStorage();
      const c = M(s) || {}, {
        couponsCache: u,
        runningAction: p
      } = c;
      this.pageObserver = new Tt(this.config, {
        couponsCache: u
      }), [l.STARTING, l.PROCESS, l.FINISHING].includes(this.status) && (await It(), await this.unlock()), this.status === l.FINISHING && (this.finalize(p), this.clearStorage()), [l.STARTING, l.PROCESS].includes(this.status) && this.process(p);
    } else
      this.pageObserver = new Tt(this.config), this.clearStorage(), this.startObserving();
    await P(0), a.forEach((c) => {
      this[`_${c}`] === r[c] && this.emit(`update:${c}`, this[c]);
    });
  }
  /**
   * @override
   */
  saveState() {
    super.cacheState(`CAA-${this.id}`);
  }
  /**
   * @private
   * Start listening for page events
   */
  startObserving() {
    [...j, "totalChanged"].forEach((t) => {
      this.pageObserver.on(t, (...e) => {
        this.emit(t, ...e);
      });
    }), this.pageObserver.startObserving(!0), this.status === l.INIT && this.pageObserver.on("totalChanged", (t) => {
      t && (this.total = t);
    });
  }
  /**
   * @private
   * Remove all page listeners
   */
  stopObserving() {
    this.pageObserver.stopObserving(), [...j, "totalChanged"].forEach((t) => {
      this.pageObserver.removeAllListeners(t);
    });
  }
  /**
   * clear session storage and reinit CAA
   * @param {boolean} force - if need to reinit CAA
   */
  async reset(t = !0) {
    return this.stopReason ? !1 : (await this.stop(), this.clearStorage(), I = !1, t && this.setInitState(), !0);
  }
  /**
   * restart CAA without INIT status
   */
  async reload() {
    await this.setInitState(!0);
  }
  clearStorage() {
    ae(`CAA-${this.id}`);
  }
  /**
   *
   * @return {{
   *    stackCoupons,
   *    stackIndex: (number|null),
   *    couponsCache: *,
   *    appliedCoupons: ApplyCoupon[],
   *    result: (null|{savings: number, bestCoupon?: {code: string}}),
   *    runningAction: {name?: string, stepState?: {name?: string}, result?: any},
   *    previousCouponPrice: number,
   *    total: number,
   *    processIndex: number,
   *    bestCoupon: ({code: string}|null),
   *    coupons: [{code: string}],
   *    previousDiscount: number,
   *    config: *,
   *    status: Status,
   * }}
   */
  getCurrentState() {
    const t = super.getCurrentState(), {
      coupons: e,
      config: s,
      appliedCoupons: i,
      pageObserver: n,
      runningAction: r,
      stackCoupons: a
    } = this;
    return {
      ...t,
      coupons: e,
      config: s,
      appliedCoupons: i.getState(),
      couponsCache: n.serializeCouponsState(),
      runningAction: r && r.getState(),
      stackCoupons: a
    };
  }
  /**
   * @private
   * @return {{
   *  previousCouponPrice: number,
   *  total: (boolean|*|number),
   *  code: *,
   *  previousDiscount: number,
   *  config: *,
   *  status: (Status|string|null)
   * }}
   */
  getSharedConfig() {
    return {
      code: this.coupons[this.processIndex] ? this.coupons[this.processIndex].code : "",
      config: this.config,
      status: this.status,
      previousCouponPrice: this.previousCouponPrice,
      total: this.total,
      previousDiscount: this.previousDiscount,
      forceClick: [l.STARTING, l.FINISHING].includes(this.status)
    };
  }
  /**
   * @private
   *
   * remove coupon
   *
   * @return {Promise<*>}
   */
  // TODO: consider renaming  it. Override  isn't compatible.
  removeCoupon() {
    return super.remove(this.getSharedConfig());
  }
  /**
   * @public
   * @async
   *
   * @param forceClick
   * @return {Promise<*>}
   */
  removeExistingCoupon(t = !1) {
    const e = {
      ...this.getSharedConfig(),
      forceClick: t,
      code: ""
    };
    return super.remove(e);
  }
  /**
   * @private
   * @async
   *
   * @param processIndex {number}
   * @param coupons {[{code: string}]}
   * @param cache {Object?}
   *
   * @return {Promise<boolean|*>}
   */
  applyCoupon(t = this.processIndex, e = this.coupons, s) {
    const i = e[t] ? e[t].code : "";
    return super.apply({
      ...this.getSharedConfig(),
      code: i
    }, s);
  }
  async unlock() {
    await super.unlock(this.getSharedConfig());
  }
  /**
   * Remove coupons considering coupon codes
   * @throws if coupons config can't extract coupons from page
   * @return {Promise<*>}
   */
  async removeCouponsByCodes() {
    if (!this.pageObserver.couponsAvailable())
      throw new Error("observer can't get coupon codes");
    const t = this.pageObserver.getCoupons(), { coupon: e, total: s } = this.config.controls;
    let i = O(H(e)), n;
    for (; i.length !== 0; ) {
      for (let a = 0; a < i.length; a += 1) {
        const c = this.pageObserver.canExtractCouponCodes() && t[a] && t[a].code ? t[a].code : "", u = {
          ...this.getSharedConfig(),
          code: c
        };
        n = await new D(u).execute();
        const p = f(s, n), d = f(s);
        this.pageObserver.updateCouponInfo(p || d);
      }
      const r = O(H(e));
      if (r.length === i.length)
        break;
      i = r;
    }
    return n;
  }
  /**
   * Remove coupons
   * @return {Promise<*>}
   */
  async persistentRemove() {
    if (!this.config.remove)
      return !1;
    let t;
    const e = {
      ...this.getSharedConfig(),
      code: ""
    };
    if (this.config.stack) {
      const s = (n) => [].concat(n).reduce((r, { submit: a }) => a && !r.find((c) => c === a) ? r.concat(a) : r, []).reduce((r, a) => [r, ...O(a)], []);
      let i = s(this.config.remove);
      for (; i.length; ) {
        t = await new D(e).execute();
        const n = s(this.config.remove);
        if (n.length < i.length)
          i = n;
        else
          break;
      }
    } else
      t = await new D(e).execute();
    return t;
  }
  /**
   * @private
   *
   * Run before main process. Remove existing coupon and update total, if needed.
   * Mutes alerts and enables status caching
   *
   * @return {Promise<function(...[*]=)>} - function to restore alerts and disable status caching.
   */
  async preRun() {
    const t = ue(), e = () => {
      this.saveState();
    };
    window.addEventListener("unload", e);
    let s = null;
    if (this.status === l.INIT && (this.status = l.STARTING, await this.unlock(), this.disregardPreviousDiscount && (this.pageObserver.couponsAvailable() ? s = await this.removeCouponsByCodes() : s = await this.persistentRemove())), this.status === l.STARTING) {
      let i = f(this.config.controls.total);
      if (this.processIndex === 0 && this.disregardPreviousDiscount) {
        const n = [].concat(this.config.remove);
        if (this.config.remove && n.find(({ type: r }) => Pt(r) || r === "submit") && s && s instanceof HTMLDocument) {
          const r = f(this.config.controls.total, s);
          if (r)
            i = r;
          else {
            const a = await le(), c = f(this.config.controls.total, a);
            c && (i = c);
          }
        }
        this.total = i;
      }
    }
    return () => {
      try {
        t();
      } catch (i) {
        h("error", "error restoring blockers", i);
      }
      window.removeEventListener("unload", e);
    };
  }
  /**
   * @private
   *
   * Apply coupon, remove it and save result
   *
   * @param cache
   * @return {Promise<void>}
   */
  async couponStep(t) {
    await this.isPaused;
    const e = new B({
      ...this.getSharedConfig(),
      code: this.coupons[this.processIndex].code
    });
    this.setRunningAction(e);
    const s = await e.execute(t);
    this.setRunningAction(null), !this.config.remove && !this.config.stack && s && s.total > this.total && (this.total = s.total, this.appliedCoupons.resetTotal(s.total));
    const i = Ee(
      // add default result to handle errors from server
      {
        code: this.coupons[this.processIndex].code,
        discount: 0,
        total: this.total,
        wasValidated: !1,
        ...s || {}
      },
      this.total,
      {
        stack: this.config.stack,
        previousCouponPrice: this.previousCouponPrice || this.total,
        previousDiscount: this.previousDiscount
      }
    );
    h("log", "raw result:", s), h("log", "calculated result:", i), this.emit("couponChecked", i), this.appliedCoupons.push(i);
    const {
      discount: n,
      total: r
    } = s || {};
    n && (this.previousDiscount = n), r && (this.previousCouponPrice = r), await Promise.all([this.isPaused, P(0)]);
  }
  /**
   * @private
   *
   * Apply coupons
   *
   * @return {Promise<void>}
   */
  async run(t) {
    if (this.status === l.STARTING && (this.status = l.PROCESS), this.status === l.PROCESS) {
      if (t)
        if (await this.couponStep(t), this.processIndex < this.coupons.length - 1)
          this.processIndex += 1;
        else
          return;
      if (this.config.parallel) {
        const e = await Promise.all(
          this.coupons.map((s, i) => this.applyCoupon(i))
        );
        this.appliedCoupons.pushStack(e);
      } else
        for (let e = this.processIndex; e < this.coupons.length && (this.processIndex !== e && (this.processIndex = e), this.status !== l.STOP); e++)
          await this.couponStep();
    }
  }
  /**
   * @public
   * @async
   *
   * Start CAA execution
   *
   * @param state {*?} - cached state
   * @return {Promise<unknown> | Promise<void>}
   */
  process(t) {
    if (this.isRunning)
      throw new Error("CAA is already in process");
    this.scraper.caaStarted = !0, this.pageObserver.stopObserving();
    const e = jt(() => this.isPaused, async (s) => {
      this.stopObserving();
      const i = await this.preRun();
      await this.run(s), this.status === l.PROCESS && await this.finalize(), this.config.refresh && this.status === l.SUCCESS ? document.location.reload() : (this.clearStorage(), i());
    })(t);
    return this.isRunning = e, e.finally(() => {
      this.isRunning = !1;
    });
  }
  /**
   * @public
   * @async
   *
   * stops CAA execution. Resolves after finishing running action.
   *
   * @return {Promise<boolean>}
   */
  async stop() {
    if (this.status = l.STOP, this.runningAction)
      try {
        await this.runningAction.stop();
      } catch {
      }
    return this.isPaused && await this.unpause(), await this.isRunning, this.scraper.caaStarted = !1, !0;
  }
  /**
   * Pause CAA
   *
   * @param force {boolean} - Should pause running action or pause after
   * @return {Promise<CouponApplier.unpause>}
   */
  async pause(t = !1) {
    if (this.isPaused)
      throw new Error("Caa is already paused");
    return this.previousStatus = this.status, this.status = l.PAUSE, this.isPaused = new Promise((e) => {
      this.unpauseAction = e;
    }), t && this.runningAction && await this.runningAction.pause(this.isPaused), this.unpause;
  }
  /**
   * Resume CAA progress
   *
   * @return {Promise<void>}
   */
  async unpause() {
    this.unpauseAction && this.unpauseAction(), await this.isPaused, this.status = this.status === l.PAUSE ? this.previousStatus : this.status, delete this.previousStatus, this.isPaused = !1;
  }
  /**
   * Calculate result for single coupon
   * @private
   * @throws if coupons can stack or if caa hasn't finished applying coupons
   * @return {{success: boolean}}
   */
  singleCouponPresumableResult() {
    if (this.config.stack)
      throw new Error("can't calculate result for stack coupons");
    const t = this.isPaused ? this.previousStatus : this.status;
    if (![l.SUCCESS, l.FINISHING, l.FAIL].includes(t))
      throw new Error("caa hasn't applied all the coupons yet");
    const e = this.appliedCoupons.getState(), { giftCoupons: s } = dt(e), i = this.pageObserver.getCouponsDiscount() || 0, { bestIndex: n, savings: r } = ft(e), a = n > -1, c = this.forceCaaCoupons ? a || !!s.length && this.giftCouponsApplicable : a && r >= i || !!s.length && this.giftCouponsApplicable, u = { success: c };
    return c && (u.bestCoupon = e[n], u.caaSavings = r, u.giftCoupons = s), u;
  }
  /**
   * Calculate result for stacking coupons
   * @private
   * @throws if coupons don't stack or if caa hasn't finished applying coupons
   * @return {{
   *    stackCoupons: {code: string, discount?: number, total?: number}[],
   *    success: boolean,
   *    initialCoupons: {code: string, removed: boolean, added: boolean, initial: *}[]
   * }}
   */
  stackCouponsPresumableResult() {
    if (!this.config.stack)
      throw new Error("can't calculate result for single coupon");
    const t = this.isPaused ? this.previousStatus : this.status;
    if (![l.SUCCESS, l.FINISHING, l.FAIL].includes(t))
      throw new Error("caa hasn't applied all the coupons yet");
    const e = this.appliedCoupons.getState(), s = this.total, { successCoupons: i } = ke(e, s);
    let n = this.pageObserver.getCoupons(), r = i;
    return this.forceCaaCoupons ? n = n.filter(({ code: a }) => !i.find((c) => c.code === a)) : r = i.filter(({ code: a }) => !n.find((c) => c.code === a)), {
      success: !!(r && r.length),
      stackCoupons: r,
      initialCoupons: n
    };
  }
  /**
   * @public
   * @throws if coupons can stack or if caa hasn't finished applying coupons
   *
   * @return {CAAResult}
   */
  getPresumableResult() {
    if (this.result)
      return this.result;
    const t = this.isPaused ? this.previousStatus : this.status;
    if (![l.SUCCESS, l.FINISHING, l.FAIL].includes(t))
      throw new Error("caa hasn't applied all the coupons yet");
    const {
      success: e,
      bestCoupon: s,
      caaSavings: i
    } = this.presumableResult();
    return this.config.stack || !e ? { success: e } : { success: e, bestCoupon: s, caaSavings: i };
  }
  async checkGifts() {
    const t = this.appliedCoupons.getState(), { giftCoupons: e } = dt(t), { bestIndex: s } = ft(t);
    !t[s] && e.length && (this.giftCoupon = e[0]);
  }
  /**
   * @private
   * @return {{
   *    stackCoupons: {code: string, discount?: number, total?: number}[]?,
   *    success: boolean,
   *    initialCoupons: {code: string, removed: boolean, added: boolean, initial: *}[]?,
   * } | CAAResult}
   */
  presumableResult() {
    return this.config.stack ? this.stackCouponsPresumableResult() : this.singleCouponPresumableResult();
  }
  /**
   * @private
   *
   * @param cache
   * @return {Promise<void>}
   */
  async finalize(t) {
    this.status === l.PROCESS && (this.status = l.FINISHING);
    const e = new es({
      initialCoupons: this.pageObserver.getCoupons(),
      total: this.total,
      config: this.config,
      giftCoupon: this.giftCoupon,
      presumableResult: this.presumableResult(),
      forceCaaCoupons: this.forceCaaCoupons,
      giftCouponsApplicable: this.giftCouponsApplicable,
      initialDiscount: this.pageObserver.getCouponsDiscount() || 0
    });
    this.setRunningAction(e);
    const s = await e.execute(t);
    if (this.setRunningAction(null), this.scraper.caaStarted = !1, this.status !== l.FINISHING)
      return;
    let i = 0;
    try {
      i = f(this.config.controls.discount) || 0;
    } catch {
    }
    i || (i = this.total - f(this.config.controls.total)), s.success && s.bestCoupon && (this.bestCoupon = s.bestCoupon), this.config.refresh && s.success ? (this._result = {
      ...s,
      savings: i || s.savings
    }, await this.isPaused, this._status = s.success ? l.SUCCESS : l.FAIL) : (this.result = {
      ...s,
      savings: i || s.savings
    }, await this.isPaused, this.status = s.success ? l.SUCCESS : l.FAIL);
  }
}
Qt.version = Yt.version;
class Ls {
  constructor(t, e) {
    A(this, "eventBus", null);
    A(this, "couponApplier");
    A(this, "businessService");
    A(this, "offerRevealService");
    A(this, "offers", []);
    A(this, "couponApplierConfig");
    A(this, "bestCoupon");
    this.businessService = t, this.offerRevealService = e;
  }
  getPublishTarget() {
    return this.eventBus;
  }
  setPublishTarget(t) {
    this.eventBus = t;
  }
  /**
   * Init a new instance of the CAA
   * @param couponApplierConfig
   * @param offers
   */
  async init(t, e) {
    var n;
    if (this.couponApplierConfig !== void 0 && this.couponApplierConfig.id !== t.id) {
      location.reload();
      return;
    }
    if (this.couponApplierConfig = t, this.offers = e.filter((r) => r.codeType !== void 0), this.couponApplier == null) {
      if (this.offers.length === 0)
        return;
      this.couponApplier = new Qt({
        id: "poulpeo",
        configs: [t],
        coupons: this.offers.map((r) => ({ code: r.code })),
        savePreviousDiscount: !1
      });
    } else
      this.couponApplier.coupons = this.offers.map((r) => ({
        code: r.code
      }));
    this.initListeners();
    const s = this.getCurrentTestTestedCouponList(), i = s.length - 1;
    if (i >= 0 && s[i] && ((n = this.eventBus) == null || n.publish({
      type: "couponApplierCouponTested",
      details: {
        coupon: s[i],
        testedCoupons: s
      }
    })), ["unavailable", "stop"].includes(this.couponApplier.status) || (await this.couponApplier.init(), this.onCouponApplierShoppingCartTotalUpdateDetection(0)), localStorage.getItem("start-coupon-applier-on-page-load") === "true") {
      if (localStorage.removeItem("start-coupon-applier-on-page-load"), ["unavailable"].includes(this.couponApplier.status))
        return;
      this.startTest().catch(console.error);
    }
  }
  /**
   * Starts the Coupon applier and drops a cookie
   */
  async startTest() {
    var t;
    if (((t = this.couponApplierConfig) == null ? void 0 : t.storeID) === void 0)
      throw new Error("Can't start test. coupon applier config is invalid");
    if (console.debug("CouponApplierService", "startTest"), await this.businessService.dropCookie({
      merchantId: +this.couponApplierConfig.storeID
    }), await this.revealSingleUseOffers(), this.trackEvent("start").catch(console.error), this.couponApplier.status !== "init") {
      await this.couponApplier.clearStorage(), localStorage.setItem("start-coupon-applier-on-page-load", "true"), location.reload();
      return;
    }
    this.clearCurrentTestTestedCouponList(), this.clearCurrentTestShoppingCartTotalHistory(), this.updateCurrentTestShoppingCartTotalHistory(), this.bestCoupon = void 0, await this.couponApplier.process(), this.updateCurrentTestShoppingCartTotalHistory();
  }
  async revealSingleUseOffers() {
    var n;
    const t = await this.offerRevealService.revealOffers(
      this.offers
    ), e = this.offers.map((r) => r.code).join(","), s = t.map((r) => r.code).join(",");
    e !== s && (this.offers = t.filter((r) => r.codeType !== void 0), this.couponApplier.coupons = this.offers.filter((r) => r.code !== "").map((r) => ({ code: r.code })), (n = this.eventBus) == null || n.publish({
      type: "couponApplierCouponsUpdated",
      details: { coupons: this.couponApplier.coupons }
    }));
  }
  /**
   * Stop the CAA test
   */
  async stopTest() {
    var t;
    console.debug("CouponApplierService", "Asking the coupon applier to stop"), this.trackEvent("cancel").catch(console.error), await this.couponApplier.reset(!1), (t = this.eventBus) == null || t.publish({
      type: "couponApplierStopped",
      details: {
        status: "stop"
      }
    }), this.clearCurrentTestTestedCouponList(), this.clearCurrentTestShoppingCartTotalHistory();
  }
  getCurrentTestTestedCouponList() {
    const t = sessionStorage.getItem(
      "coupon-applier-current-test-tested-coupon-list"
    );
    if (t !== null)
      try {
        const e = JSON.parse(t);
        if (Array.isArray(e))
          return e;
      } catch {
      }
    return [];
  }
  getCurrentTestShoppingCartTotalHistory() {
    const t = sessionStorage.getItem(
      "coupon-applier-current-test-shopping-cart-total-history"
    );
    if (t !== null)
      try {
        const e = JSON.parse(t);
        if (e != null && typeof e == "object" && "currentShoppingCartTotal" in e && "initialShoppingCartTotal" in e && "maxShoppingCartTotal" in e && "minShoppingCartTotal" in e)
          return e;
      } catch {
      }
    return {
      currentShoppingCartTotal: void 0,
      initialShoppingCartTotal: void 0,
      maxShoppingCartTotal: void 0,
      minShoppingCartTotal: void 0
    };
  }
  addToCurrentTestTestedCouponList(t) {
    const e = [
      ...this.getCurrentTestTestedCouponList(),
      t
    ];
    return sessionStorage.setItem(
      "coupon-applier-current-test-tested-coupon-list",
      JSON.stringify(e)
    ), e;
  }
  clearCurrentTestTestedCouponList() {
    sessionStorage.removeItem("coupon-applier-current-test-tested-coupon-list");
  }
  updateCurrentTestShoppingCartTotalHistory() {
    var n, r;
    const t = Zt(
      (n = this.couponApplierConfig) == null ? void 0 : n.controls.total
    ), e = this.getCurrentTestShoppingCartTotalHistory(), s = JSON.stringify(e);
    e.initialShoppingCartTotal = e.initialShoppingCartTotal ?? t, e.currentShoppingCartTotal = t, e.minShoppingCartTotal = Math.min(
      t,
      e.minShoppingCartTotal ?? t
    ), e.maxShoppingCartTotal = Math.max(
      t,
      e.maxShoppingCartTotal ?? t
    );
    const i = JSON.stringify(e);
    s !== i && (sessionStorage.setItem(
      "coupon-applier-current-test-shopping-cart-total-history",
      JSON.stringify(e)
    ), (r = this.eventBus) == null || r.publish({
      type: "couponApplierShoppingCartTotalUpdated",
      details: e
    }));
  }
  clearCurrentTestShoppingCartTotalHistory() {
    sessionStorage.removeItem(
      "coupon-applier-current-test-shopping-cart-total-history"
    );
  }
  /**
   * Handles coupon applier 'status' property update events
   */
  onCouponApplierStatusPropertyUpdate(t) {
    var i;
    if (console.debug(
      "CouponApplierService",
      "onCouponApplierStatusPropertyUpdate",
      t
    ), ["init", "success", "fail"].includes(t)) {
      const n = t === "init" ? "show" : t;
      this.trackEvent(n).catch(console.error);
    }
    const e = this.couponApplier.previousStatus, s = t === "pause" ? e ?? "init" : t;
    (i = this.eventBus) == null || i.publish({
      type: "couponApplierStatusUpdated",
      details: {
        status: s
      }
    });
  }
  /**
   * Handles coupon applier 'processIndex' property update events
   */
  onCouponApplierProcessIndexPropertyUpdate(t) {
    var s;
    console.debug(
      "CouponApplierService",
      "onCouponApplierProcessIndexPropertyUpdate",
      t
    ), this.couponApplier.coupons[t] !== void 0 && ((s = this.eventBus) == null || s.publish({
      type: "couponApplierProcessIndexUpdated",
      details: {
        currentIndex: t
      }
    }));
  }
  /**
   * Handles coupon applier 'result' property update events
   */
  onCouponApplierResultPropertyUpdate(t) {
    var s;
    if (console.debug(
      "CouponApplierService",
      "onCouponApplierResultPropertyUpdate",
      t
    ), !t || !t.success || !t.bestCoupon)
      return;
    const e = t.bestCoupon;
    if (!this.offers.some((i) => i.code === e.code)) {
      console.error(
        new Error(`No offer associated with code ${e.code} was found`)
      );
      return;
    }
    this.bestCoupon = {
      coupon: e.code,
      discount: e.discount
    }, (s = this.eventBus) == null || s.publish({
      type: "couponApplierSucceeded",
      details: {
        bestCoupon: this.bestCoupon
      }
    }), this.updateCurrentTestShoppingCartTotalHistory();
  }
  /**
   * Handles coupon applier shopping cart total update detection events
   */
  onCouponApplierShoppingCartTotalUpdateDetection(t) {
    console.debug(
      "CouponApplierService",
      "onCouponApplierShoppingCartTotalUpdateDetection",
      t
    ), this.updateCurrentTestShoppingCartTotalHistory();
  }
  onCouponApplierCouponTest(t) {
    var e;
    console.debug(
      "CouponApplierService",
      "onCouponApplierCouponTest",
      t
    ), (e = this.eventBus) == null || e.publish({
      type: "couponApplierCouponTested",
      details: {
        coupon: t,
        testedCoupons: this.addToCurrentTestTestedCouponList(t)
      }
    }), this.updateCurrentTestShoppingCartTotalHistory();
  }
  /**
   * Attaches event listeners to the coupon applier
   */
  initListeners() {
    this.couponApplier.on(
      "update:status",
      this.onCouponApplierStatusPropertyUpdate.bind(this)
    ), this.couponApplier.on(
      "update:processIndex",
      this.onCouponApplierProcessIndexPropertyUpdate.bind(this)
    ), this.couponApplier.on(
      "update:result",
      this.onCouponApplierResultPropertyUpdate.bind(this)
    ), this.couponApplier.on(
      "totalChanged",
      this.onCouponApplierShoppingCartTotalUpdateDetection.bind(this)
    ), this.couponApplier.on(
      "couponChecked",
      this.onCouponApplierCouponTest.bind(this)
    ), this.couponApplier.on(
      "userCouponApplied",
      (t) => {
        console.debug("Coupon Applier Event", "userCouponApplied", t);
      }
    );
  }
  async trackEvent(t) {
    var e, s, i, n;
    return this.businessService.sendCouponApplierTrackingEvent({
      category: t,
      couponApplierVersion: this.couponApplier.version,
      couponApplierConfigId: (e = this.couponApplierConfig) == null ? void 0 : e.id,
      couponApplierConfigStoreId: (s = this.couponApplierConfig) == null ? void 0 : s.storeID,
      bestCouponCode: (i = this.bestCoupon) == null ? void 0 : i.coupon,
      // this.couponApplier._result.bestCoupon.code,
      bestCouponDiscount: (n = this.bestCoupon) == null ? void 0 : n.discount,
      // this.couponApplier._result.bestCoupon.discount,
      shoppingCartTotal: this.couponApplier.total
    });
  }
}
content;
export {
  Ls as CouponApplierService
};
content;
